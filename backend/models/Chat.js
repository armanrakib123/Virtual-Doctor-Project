// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   sender: String, 
//   text: String,
//   timestamp: { type: Date, default: Date.now },
// });

// const chatSchema = new mongoose.Schema({
//   chatId: String,
//   messages: [messageSchema],
// });

// export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);


import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  roomId: { type: String, required: true, index: true },
  senderId: { type: String, required: true },
  senderRole: { type: String }, // "doctor" or "patient"
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
