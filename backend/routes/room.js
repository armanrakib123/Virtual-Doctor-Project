const express = require("express");
const { dbconnect, collectionNameObj } = require("../config/db");
const { ObjectId } = require("mongodb");

const router = express.Router();

// Get room details
router.get("/:roomId", async (req, res) => {
  try {
    const videoRoomsCollection = dbconnect(collectionNameObj.VideoRooms);
    const room = await videoRoomsCollection.findOne({ roomId: req.params.roomId });
    
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new room for an appointment (if it doesn't exist)
router.post("/create", async (req, res) => {
  try {
    const { appointmentId, doctorId, patientId } = req.body;
    
    if (!appointmentId || !doctorId || !patientId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const roomId = `room_${appointmentId}`;
    const videoRoomsCollection = dbconnect(collectionNameObj.VideoRooms);
    
    let room = await videoRoomsCollection.findOne({ roomId });
    
    if (!room) {
      const newRoom = {
        roomId,
        appointmentId,
        doctorId,
        patientId,
        status: "waiting",
        startedAt: null,
        endedAt: null,
        createdAt: new Date()
      };
      await videoRoomsCollection.insertOne(newRoom);
      room = newRoom;
    }
    
    // Update the appointment with roomId
    const appointmentsCollection = dbconnect(collectionNameObj.VD_Appointment_Booking);
    await appointmentsCollection.updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: { roomId, status: "confirmed" } }
    );

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
