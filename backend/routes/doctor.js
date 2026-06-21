const express = require("express");
const { dbconnect, collectionNameObj } = require("../config/db");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = dbconnect(collectionNameObj.All_Doctor_Collection);
    const data = await db.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = dbconnect(collectionNameObj.All_Doctor_Collection);
    const data = await db.findOne({ _id: new ObjectId(req.params.id) });
    if (!data) return res.status(404).json({ success: false, message: "Doctor not found" });
    
    data._id = data._id.toString();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const doctorCollection = dbconnect(collectionNameObj.All_Doctor_Collection);
    const result = await doctorCollection.insertOne(req.body);
    res.status(201).json({ success: true, message: "Doctor profile saved successfully", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
