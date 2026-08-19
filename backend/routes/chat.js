const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const { dbconnect, collectionNameObj } = require("../config/db");

const router = express.Router();
const upload = multer();

// Get messages by roomId
router.get("/:roomId", async (req, res) => {
  try {
    const messagesCollection = dbconnect(collectionNameObj.Messages);
    const messages = await messagesCollection.find({ roomId: req.params.roomId }).toArray();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save text message
router.post("/send", async (req, res) => {
  try {
    const { roomId, senderId, receiverId, message, messageType } = req.body;
    
    const newMessage = {
      roomId,
      senderId,
      receiverId,
      message,
      messageType: messageType || "text",
      seen: false,
      createdAt: new Date()
    };

    const messagesCollection = dbconnect(collectionNameObj.Messages);
    await messagesCollection.insertOne(newMessage);
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload and save voice message
router.post("/voice", upload.single("audio"), async (req, res) => {
  try {
    const { roomId, senderId, receiverId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "voice_messages" }, // Changed to auto to ensure audio support
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: error.message });
        }
        console.log("Cloudinary upload success:", result.secure_url);

        const newMessage = {
          roomId,
          senderId,
          receiverId,
          message: result.secure_url,
          messageType: "voice",
          seen: false,
          createdAt: new Date()
        };

        const messagesCollection = dbconnect(collectionNameObj.Messages);
        await messagesCollection.insertOne(newMessage);
        
        res.json({ success: true, message: newMessage });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
