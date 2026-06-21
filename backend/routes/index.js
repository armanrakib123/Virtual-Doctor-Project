const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

router.use("/auth", require("./auth"));
router.use("/doctor", require("./doctor"));
router.use("/patient", require("./patient"));
router.use("/Appointment_Update", require("./appointment"));

// Chat API route for saving messages to DB if any
router.post("/chat/save", async (req, res) => {
  try {
    const { dbconnect, collectionNameObj } = require("../config/db");
    const chatCollection = dbconnect(collectionNameObj.Live_chat);
    const result = await chatCollection.insertOne(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
