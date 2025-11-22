import { Server } from "socket.io";
import dbconnect from "@/lib/dbconnect";
import Chat from "@/models/Chat";

export async function GET(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io server...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("socket connected:", socket.id);

      socket.on("joinRoom", async ({ roomId, userId, role }) => {
        socket.join(roomId);
        socket.data.userId = userId;
        socket.data.role = role;
        console.log(`${userId} joined ${roomId}`);

        socket.to(roomId).emit("userJoined", { userId, role });
      });


      socket.on("sendMessage", async ({ roomId, senderId, senderRole, message }) => {

        try {
          await dbconnect(); 
          const chat = new Chat({ roomId, senderId, senderRole, message });
          await chat.save();

          io.to(roomId).emit("receiveMessage", {
            _id: chat._id,
            roomId,
            senderId,
            senderRole,
            message,
            createdAt: chat.createdAt
          });
        } catch (err) {
          console.error("save message error", err);
        }
      });

      socket.on("disconnect", () => {
        console.log("socket disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.io already running.");
  }
  return new Response("ok");
}
