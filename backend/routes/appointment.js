const express = require("express");
const { dbconnect, collectionNameObj } = require("../config/db");
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET all appointments for a user email
router.get("/", async (req, res) => {
  try {
    const { email } = req.query; // Expecting email as query param from frontend Next-Auth session
    if (!email) return res.json([]);

    const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    const result = await bookingCollection.find({ email }).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new appointment
router.post("/", async (req, res) => {
  try {
    const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    const { doctorId, date, timeSlot, email } = req.body;
    
    // Application-level validation for double booking
    const existingBooking = await bookingCollection.findOne({ doctorId, date, timeSlot });
    if (existingBooking) {
        return res.status(409).json({ success: false, message: "This time slot is already booked." });
    }

    const result = await bookingCollection.insertOne({ ...req.body, status: 'Pending', createdAt: new Date() });
    res.json({ success: true, result, message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    const singleBooking = await bookingCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!singleBooking) return res.status(404).json({ error: "Booking not found" });
    res.json(singleBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update appointment by ID
router.patch("/:id", async (req, res) => {
  try {
    const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    const { date, phone, address } = req.body;
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { date, phone, address } };

    const result = await bookingCollection.updateOne(filter, updateDoc);
    if (result.matchedCount === 0) return res.status(404).json({ error: "Booking not found" });

    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete appointment by ID
router.delete("/:id", async (req, res) => {
  try {
    const bookingCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    const { email } = req.body; // Needs to verify ownership
    const query = { _id: new ObjectId(req.params.id) };

    const currentBooking = await bookingCollection.findOne(query);
    if (!currentBooking) return res.status(404).json({ error: "Booking not found" });

    if (email === currentBooking.email) {
      const deleteResponse = await bookingCollection.deleteOne(query);
      res.json(deleteResponse);
    } else {
      res.status(403).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
