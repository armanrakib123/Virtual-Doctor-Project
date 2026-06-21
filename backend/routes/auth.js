const express = require("express");
const bcrypt = require("bcryptjs");
const { dbconnect, collectionNameObj } = require("../config/db");
// const { sendWelcomeEmail } = require("../utils/sendEmail"); // Ignoring email for a sec

const router = express.Router();

router.post("/register-doctor", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userCollection = dbconnect(collectionNameObj.VD_Doctor_Auth);

    if (!email || !password || !name) return res.status(400).json({ error: "All fields required" });

    const exists = await userCollection.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const doc = { name, email, password: hashed, role: "doctor", createdAt: new Date() };

    const result = await userCollection.insertOne(doc);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register-patient", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userCollection = dbconnect(collectionNameObj.VD_Patient_Auth);

    if (!email || !password || !name) return res.status(400).json({ error: "All fields required" });

    const exists = await userCollection.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const doc = { name, email, password: hashed, role: "patient", createdAt: new Date() };

    const result = await userCollection.insertOne(doc);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login-doctor", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCollection = dbconnect(collectionNameObj.VD_Doctor_Auth);
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ id: user._id, email: user.email, role: "doctor", name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login-patient", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCollection = dbconnect(collectionNameObj.VD_Patient_Auth);
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ id: user._id, email: user.email, role: "patient", name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { email, name, image, role } = req.body;
    const colName = role === "doctor" ? collectionNameObj.VD_Doctor_Auth : collectionNameObj.VD_Patient_Auth;
    const userCollection = dbconnect(colName);
    
    let user = await userCollection.findOne({ email });
    if (!user) {
        const doc = { email, name, image, provider: "google", role, createdAt: new Date() };
        await userCollection.insertOne(doc);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
