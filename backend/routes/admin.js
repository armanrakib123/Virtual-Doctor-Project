const express = require("express");
const router = express.Router();
const doctor = require("../models/doctor");
const mongoose = require("mongoose");
const appointments = require("../models/appointments");
const pquery = require("../models/patientmessage");
const ambulance = require("../models/Ambulance")
const bcryptjs = require('bcryptjs');
const cacheMiddleware = require('../middleware/cache.middleware');
const cacheService = require('../services/cache.service');
const jwt = require('jsonwebtoken');
const authAdmin = require('../middleware/authAdmin');
const upload = require('../middleware/multer');
const cloudinary = require('cloudinary').v2;

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_ACCESS_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const add_doctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address, expertise, image, date, desc, contact, ammount } = req.body;
        const imageFile = req.file;

        // Either use new Admin format or fallback to original format
        const finalName = name;
        const finalEmail = email;
        const finalPassword = password;
        
        if (!finalName || !finalEmail || !finalPassword) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const db_doctor = await doctor.findOne({ email: finalEmail });
        if (db_doctor) {
            return res.json({ success: false, message: "doctor already exists" });
        }

        const hashed_password = await bcryptjs.hash(finalPassword, 8);

        let imageUrl = image || '';
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
        }

        const doctorData = {
            name: finalName,
            email: finalEmail,
            image: imageUrl,
            password: hashed_password,
            speciality: speciality || expertise,
            expertise: expertise || speciality,
            degree: degree || '',
            experience: experience || '',
            about: about || desc,
            desc: desc || about,
            fees: fees || ammount,
            ammount: ammount || fees,
            address: address ? JSON.parse(address) : '',
            contact: contact || '',
            date: date || Date.now()
        };

        const newDoctor = new doctor(doctorData);
        await newDoctor.save();
        
        await cacheService.delPattern('cache:/api/admin/*'); // Clear admin cache
        await cacheService.delPattern('cache:/api/doctor*'); // Clear public doctor cache
        
        return res.json({ success: true, message: "Doctor Added" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

const delete_doctor = async (req, res) => {
    try {
        const _id = req.params.id;

        if (!_id) {
            return res.status(204).json({ message: "no id sent" });
        } else {
            const db_doctor = await doctor.findOne({ _id });
            if (db_doctor) {
                await doctor.deleteOne({ _id });
                await cacheService.delPattern('cache:/api/admin/*'); // Clear admin cache
                await cacheService.delPattern('cache:/api/doctor*'); // Clear public doctor cache
                return res.json({ message: "doctor deleted" });
            }
            return res.status(404).json({ message: "no doctor found found" });
        }

    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}
const user_query = async (req, res) => {
    try {
        const allQuery = await pquery.find({}).select("-__v ");
        return res.status(200).json(allQuery);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}




const ambulance_service = async (req, res) => {
    try {
        const get_ambulance = await ambulance.find({}).select("-__v ");
        return res.status(200).json(get_ambulance);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const update_appointment = async (req, res) => {
    try {
        const { _id, status, invoice } = req.body;
        if (!_id | !status | !invoice) {
            return res.status(202).json({ message: "incomplete-content" });
        } else {
            const appointment = await appointments.findOne({ _id });
            if (!appointment) {
                return res.status(401).json({ message: "no appointment exist" });
            } else {
                await appointments.findByIdAndUpdate({ _id }, { status, invoice });
                await cacheService.delPattern('cache:/api/admin/appointments*'); // Clear admin cache
                await cacheService.delPattern('cache:/api/Appointment_Update*'); // Clear other appointment caches
                return res.status(200).json({ message: "appointment updated" });
            }

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}



const all_appointments = async (req, res) => {
    try {
        const appointmentsList = await appointments.find().populate("user").populate("doctor");
        
        const mappedAppointments = appointmentsList.map(app => {
            const appObj = app.toObject();
            return {
                ...appObj,
                userData: appObj.user || { name: 'Unknown', image: '', dob: '2000-01-01' },
                docData: appObj.doctor || { name: 'Unknown', image: '' },
                slotDate: appObj.date || '',
                slotTime: appObj.timeSlot || '',
                amount: appObj.amount || (appObj.doctor && appObj.doctor.fees) || 0
            }
        });

        res.json({ success: true, appointments: mappedAppointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



const single_appointments = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)

        // const validId = mongoose.Types.ObjectId.isValid(id);

        const appointment = await appointments.findById(id).populate("doctor").populate("user");
        console.log(appointment)

        if (!appointment) {
            return res
                .status(401)
                .json({ message: "no appointments found" });
        } else {
            return res.json({ appointment });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const all_doctors = async (req, res) => {
    try {
        const doctors = await doctor.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const change_availability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctor.findById(docId);
        await doctor.findByIdAndUpdate(docId, { available: !docData.available });
        await cacheService.delPattern('cache:/api/admin/all-doctors*');
        await cacheService.delPattern('cache:/api/doctor*');
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const cancel_appointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await appointments.findByIdAndUpdate(appointmentId, { cancelled: true, status: 'Cancelled' });
        await cacheService.delPattern('cache:/api/admin/appointments*');
        await cacheService.delPattern('cache:/api/Appointment_Update*');
        res.json({ success: true, message: 'Appointment Cancelled' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const admin_dashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointmentsList = await appointments.find({}).populate("doctor")

        const mappedLatest = appointmentsList.reverse().slice(0, 5).map(app => {
            const appObj = app.toObject();
            return {
                ...appObj,
                docData: appObj.doctor || { name: 'Unknown', image: '' },
                slotDate: appObj.date || '',
                slotTime: appObj.timeSlot || ''
            };
        });

        const dashData = {
            doctors: doctors.length,
            appointments: appointmentsList.length,
            patients: users.length,
            latestAppointments: mappedLatest
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
};


// Routes
router.post("/login", loginAdmin);
router.post("/add-doctor", authAdmin, upload.single('image'), add_doctor);
router.delete("/delete-doctor/:id", authAdmin, delete_doctor);
router.get("/appointments", authAdmin, cacheMiddleware('cache'), all_appointments);
router.put("/update-appointment", authAdmin, update_appointment);
router.get("/user-query", authAdmin, cacheMiddleware('cache'), user_query);
router.get("/ambulance-service", authAdmin, cacheMiddleware('cache', 86400), ambulance_service);
router.get("/appointments/:id", authAdmin, cacheMiddleware('cache'), single_appointments);

// Endpoints required by the Vite React Admin Dashboard
router.post("/all-doctors", authAdmin, all_doctors); // React calls it as POST in context
router.post("/change-availability", authAdmin, change_availability);
router.post("/cancel-appointment", authAdmin, cancel_appointment);
router.get("/dashboard", authAdmin, cacheMiddleware('cache', 60), admin_dashboard);

module.exports = router;