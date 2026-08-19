import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import VoiceRecorder from './VoiceRecorder';
import { getSocket } from '../utils/socket';

export default function ChatPanel({ roomId, userId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = getSocket();

  useEffect(() => {
    // Fetch previous messages
    fetch(`http://localhost:5000/api/chat/${roomId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(err => console.error("Error fetching messages:", err));

    // Listen for new messages
    const handleReceiveMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
    };
    
    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };
  }, [roomId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const msgData = {
      roomId,
      senderId: userId,
      message: newMessage,
      messageType: 'text'
    };

    socket.emit('send-message', msgData);

    try {
      await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
    } catch (error) {
      console.error('Failed to save message to DB', error);
    }
    
    setNewMessage('');
  };

  const uploadVoiceMessage = async (audioBlob) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice_message.webm');
    formData.append('roomId', roomId);
    formData.append('senderId', userId);

    try {
      const res = await fetch('http://localhost:5000/api/chat/voice', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        socket.emit('send-message', data.message);
      }
    } catch (error) {
      console.error('Failed to upload voice message', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="w-80 h-full bg-gray-900 border-l border-gray-800 flex flex-col shadow-2xl z-30 relative"
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur">
        <h3 className="font-semibold text-gray-100">Room Chat</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        <AnimatePresence>
          {messages.map((msg, i) => {
            const isMe = msg.senderId === userId;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="text-xs text-gray-500 mb-1 px-1">
                  {isMe ? 'You' : 'Remote'}
                </div>
                {msg.messageType === 'voice' ? (
                  <audio controls src={msg.message} className="max-w-[200px] h-10" />
                ) : (
                  <div className={`px-4 py-2 rounded-2xl max-w-[85%] break-words ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                    {msg.message}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-800 bg-gray-900/50 backdrop-blur">
        <form onSubmit={sendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
          {newMessage.trim() ? (
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
            >
              <Send size={18} />
            </button>
          ) : (
            <VoiceRecorder onUpload={uploadVoiceMessage} isUploading={isUploading} />
          )}
        </form>
      </div>
    </motion.div>
  );
}
