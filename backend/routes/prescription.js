const express = require("express");
const { dbconnect, collectionNameObj } = require("../config/db");
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET prescriptions for a patient or appointment
router.get("/", async (req, res) => {
  try {
    const { patientId, appointmentId } = req.query;
    const query = {};
    if (patientId) query.patientId = patientId;
    if (appointmentId) query.appointmentId = appointmentId;

    const prescriptionCollection = dbconnect(collectionNameObj.Prescriptions);
    const result = await prescriptionCollection.find(query).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new prescription
router.post("/", async (req, res) => {
  try {
    const prescriptionCollection = dbconnect(collectionNameObj.Prescriptions);
    
    const { appointmentId, doctorId, patientId, diagnosis, medicines, instructions, followUpDate } = req.body;
    
    if (!appointmentId || !doctorId || !patientId || !medicines) {
        return res.status(400).json({ success: false, message: "Missing required prescription fields" });
    }

    const prescription = {
        appointmentId,
        doctorId,
        patientId,
        diagnosis,
        medicines, // array of { name, dosage, frequency, duration }
        instructions,
        followUpDate,
        createdAt: new Date()
    };

    const result = await prescriptionCollection.insertOne(prescription);
    res.json({ success: true, result, message: "Prescription created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
