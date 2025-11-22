"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function LiveChat({ chatId, userType }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join-room", chatId);

    // receive messages
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receive-message");
  }, []);

  const sendMessage = async () => {
    if (!message) return;

    const newMsg = {
      sender: userType,
      text: message,
      timestamp: new Date(),
    };

    // send to socket
    socket.emit("send-message", {
      chatId,
      message: newMsg,
    });

    // save in DB
    await fetch("/api/chat/save", {
      method: "POST",
      body: JSON.stringify({ chatId, message: newMsg }),
    });

    setMessage("");
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-3 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded ${
              m.sender === userType
                ? "bg-blue-600 text-white ml-auto"
                : "bg-white text-black mr-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex mt-3 gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded border"
          placeholder="Write message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
