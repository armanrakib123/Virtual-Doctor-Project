const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

router.use("/auth", require("./auth"));
router.use("/doctor", require("./doctor"));
router.use("/patient", require("./patient"));
router.use("/Appointment_Update", require("./appointment"));

router.use("/room", require("./room"));
router.use("/chat", require("./chat"));

module.exports = router;
