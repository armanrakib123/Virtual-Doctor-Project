import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MicOff, VideoOff } from 'lucide-react';

export default function VideoPlayer({ stream, isLocal, name, isMuted, isCameraOff }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex justify-center items-center ${isLocal ? 'h-48 w-64 absolute bottom-4 right-4 z-10' : 'w-full h-full'}`}
    >
      {stream && !isCameraOff ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl text-gray-400 font-bold mb-4">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="text-sm font-medium">{isCameraOff ? 'Camera Off' : 'Connecting...'}</span>
        </div>
      )}

      {/* Overlay controls indicators */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-xs font-semibold">
          {name || (isLocal ? 'You' : 'Remote')}
        </div>
        {isMuted && (
          <div className="p-1 bg-red-500/80 backdrop-blur-md rounded-lg text-white">
            <MicOff size={14} />
          </div>
        )}
        {isCameraOff && (
          <div className="p-1 bg-red-500/80 backdrop-blur-md rounded-lg text-white">
            <VideoOff size={14} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
