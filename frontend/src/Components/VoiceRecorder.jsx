import { useState, useRef } from 'react';
import { Mic, Square, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VoiceRecorder({ onUpload, isUploading }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onUpload(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (isUploading) {
    return (
      <div className="p-2 bg-gray-800 rounded-full text-blue-400">
        <Loader className="animate-spin" size={20} />
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
      title={isRecording ? 'Stop Recording' : 'Record Voice'}
    >
      {isRecording ? <Square size={20} /> : <Mic size={20} />}
    </motion.button>
  );
}
