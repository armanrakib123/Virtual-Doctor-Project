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
const add_doctor = async (req, res) => {
    try {
        const { name, expertise, image,date,email,password,desc,contact,ammount} = req.body;
        console.log(name, expertise, image,date,email,password,desc,contact,ammount);
        if (!name | !image | !expertise | !date | !email | !password | !desc | !contact | !ammount) {
            return res.status(204).json({ message: "incomplete content" });
        } else {
            const db_doctor = await doctor.findOne({ name,email });
            if (!db_doctor) {
                const hashed_password = await bcryptjs.hash(password, 8);
                await doctor.create({ name, image, expertise, date, email, password:hashed_password, desc, contact ,ammount});
                await cacheService.delPattern('cache:/api/admin/*'); // Clear admin cache
                await cacheService.delPattern('cache:/api/doctor*'); // Clear public doctor cache
                return res.status(200).json({ message: "doctor added" });
            }
            return res.status(409).json({ message: "doctor already exists" });
        }

    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

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

        const all_appointments = await appointments.find().populate("user").populate("doctor");
        console.log(all_appointments)
        if (!all_appointments) {
            return res
                .status(401)
                .json({ message: "no appointments found" });
        } else {
            return res.json({ all_appointments });
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });
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
        const doctorsCount = await doctor.countDocuments();
        const appointmentsCount = await appointments.countDocuments();
        const patientsCount = await mongoose.connection.db.collection('users').countDocuments({ role: 'Patient' });
        
        const latestAppointments = await appointments.find({}).sort({ date: -1 }).limit(5).populate('doctor').populate('user');
        
        const dashData = {
            doctors: doctorsCount,
            appointments: appointmentsCount,
            patients: patientsCount,
            latestAppointments
        };
        
        res.json({ success: true, dashData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Routes
router.post("/add-doctor", add_doctor);
router.delete("/delete-doctor/:id", delete_doctor);
router.get("/appointments", cacheMiddleware('cache'), all_appointments);
router.put("/update-appointment", update_appointment);
router.get("/user-query", cacheMiddleware('cache'), user_query);
router.get("/ambulance-service", cacheMiddleware('cache', 86400), ambulance_service);
router.get("/appointments/:id", cacheMiddleware('cache'), single_appointments);

// Endpoints required by the Vite React Admin Dashboard
router.post("/all-doctors", all_doctors); // React calls it as POST in context
router.post("/change-availability", change_availability);
router.post("/cancel-appointment", cancel_appointment);
router.get("/dashboard", cacheMiddleware('cache', 60), admin_dashboard);

module.exports = router;