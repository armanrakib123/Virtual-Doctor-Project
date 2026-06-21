const express = require("express");
const { dbconnect, collectionNameObj } = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const patientCollection = dbconnect(collectionNameObj.Patient_Profile);
    const result = await patientCollection.insertOne(req.body);
    res.status(201).json({ success: true, message: "Patient profile saved successfully", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
