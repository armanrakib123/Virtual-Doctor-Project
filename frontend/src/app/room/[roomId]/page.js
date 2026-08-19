'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { PhoneIncoming, Loader2 } from 'lucide-react';
import { useWebRTC } from '../../../hooks/useWebRTC';
import VideoPlayer from '../../../Components/VideoPlayer';
import CallControls from '../../../Components/CallControls';
import ChatPanel from '../../../Components/ChatPanel';

export default function RoomPage({ params }) {
  // Use React.use() to unwrap params per Next.js 15
  const { roomId } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [role, setRole] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // We assume patient/doctor id is their email or a unique id from session
  const userId = session?.user?.email || `user_${Math.floor(Math.random() * 10000)}`;

  useEffect(() => {
    // In a real scenario, you'd fetch the role from the backend / user profile.
    // For now, we assume userType is stored in session if available, else default to patient
    if (status === 'authenticated') {
      const userRole = session?.user?.role || 'patient'; // Ensure your NextAuth session provides role
      setRole(userRole);
    } else if (status === 'unauthenticated') {
      // For testing without auth
      setRole('patient');
    }
  }, [status, session]);

  const {
    localStream,
    remoteStream,
    isCameraOn,
    isMicOn,
    isScreenSharing,
    callStatus,
    remoteCameraOn,
    remoteMicOn,
    initWebRTC,
    toggleCamera,
    toggleMic,
    toggleScreenShare,
    endCall,
    joinRoom,
    initiateCall,
    acceptCall,
    rejectCall
  } = useWebRTC(roomId, userId, role);

  useEffect(() => {
    if (role) {
      joinRoom();
      // Only initialize local media stream when we enter the room
      initWebRTC();
    }
  }, [role]); // eslint-disable-line

  if (status === 'loading' || !role) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-950 overflow-hidden flex">
      {/* Main Video Area */}
      <div className="flex-1 relative flex flex-col items-center justify-center">
        {/* Remote Video or Placeholder */}
        <div className="absolute inset-0 p-4">
          <VideoPlayer 
            stream={remoteStream} 
            isLocal={false} 
            name="Remote User"
            isMuted={!remoteMicOn}
            isCameraOff={!remoteCameraOn}
          />
        </div>

        {/* Local Video Picture-in-Picture */}
        <VideoPlayer 
          stream={localStream} 
          isLocal={true} 
          name="You"
          isMuted={!isMicOn}
          isCameraOff={!isCameraOn}
        />

        {/* Call Controls overlay */}
        <CallControls 
          isCameraOn={isCameraOn}
          isMicOn={isMicOn}
          isScreenSharing={isScreenSharing}
          toggleCamera={toggleCamera}
          toggleMic={toggleMic}
          toggleScreenShare={toggleScreenShare}
          endCall={() => {
            endCall();
            router.push('/');
          }}
          toggleChat={() => setIsChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
        />
        
        {/* Initiate Call Button (for Doctor) - Only visible when idle */}
        {callStatus === 'idle' && role === 'doctor' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button 
              onClick={initiateCall}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg shadow-blue-500/50 flex items-center gap-2 animate-bounce"
            >
              <PhoneIncoming size={20} />
              Call Patient
            </button>
          </div>
        )}

        {/* Incoming Call Overlay */}
        <AnimatePresence>
          {callStatus === 'ringing' && role === 'patient' && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-800 z-50 flex flex-col items-center text-center"
             >
               <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                 <PhoneIncoming size={32} className="text-blue-500" />
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">Incoming Call</h2>
               <p className="text-gray-400 mb-8">Doctor is calling you for the consultation.</p>
               
               <div className="flex gap-4">
                 <button 
                   onClick={rejectCall}
                   className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
                 >
                   Decline
                 </button>
                 <button 
                   onClick={acceptCall}
                   className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-colors"
                 >
                   Accept
                 </button>
               </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Call Ended state */}
        <AnimatePresence>
          {callStatus === 'ended' && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-gray-950/90 z-50 flex flex-col items-center justify-center backdrop-blur-md"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Call Ended</h2>
              <button 
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Slide-out Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <ChatPanel 
            roomId={roomId} 
            userId={userId} 
            onClose={() => setIsChatOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
