import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, MessageSquare } from 'lucide-react';

export default function CallControls({ 
  isCameraOn, 
  isMicOn, 
  isScreenSharing, 
  toggleCamera, 
  toggleMic, 
  toggleScreenShare, 
  endCall,
  toggleChat,
  isChatOpen
}) {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur-xl p-4 rounded-full border border-gray-800 shadow-2xl z-20"
    >
      <ControlButton 
        isActive={isMicOn} 
        activeIcon={<Mic size={20} />} 
        inactiveIcon={<MicOff size={20} />} 
        onClick={toggleMic} 
        activeClass="bg-gray-700 hover:bg-gray-600"
        inactiveClass="bg-red-500 hover:bg-red-600 text-white"
        label="Microphone"
      />
      
      <ControlButton 
        isActive={isCameraOn} 
        activeIcon={<Video size={20} />} 
        inactiveIcon={<VideoOff size={20} />} 
        onClick={toggleCamera} 
        activeClass="bg-gray-700 hover:bg-gray-600"
        inactiveClass="bg-red-500 hover:bg-red-600 text-white"
        label="Camera"
      />

      <ControlButton 
        isActive={isScreenSharing} 
        activeIcon={<MonitorUp size={20} className="text-blue-400" />} 
        inactiveIcon={<MonitorUp size={20} />} 
        onClick={toggleScreenShare} 
        activeClass="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50"
        inactiveClass="bg-gray-700 hover:bg-gray-600"
        label="Screen Share"
      />

      <ControlButton 
        isActive={isChatOpen} 
        activeIcon={<MessageSquare size={20} className="text-blue-400" />} 
        inactiveIcon={<MessageSquare size={20} />} 
        onClick={toggleChat} 
        activeClass="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50"
        inactiveClass="bg-gray-700 hover:bg-gray-600"
        label="Chat"
      />

      <div className="w-px h-8 bg-gray-700 mx-2" />

      <button
        onClick={endCall}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-105 tooltip"
        data-tip="End Call"
      >
        <PhoneOff size={24} />
      </button>
    </motion.div>
  );
}

function ControlButton({ isActive, activeIcon, inactiveIcon, onClick, activeClass, inactiveClass, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 tooltip ${isActive ? activeClass : inactiveClass}`}
      data-tip={label}
    >
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );
}
