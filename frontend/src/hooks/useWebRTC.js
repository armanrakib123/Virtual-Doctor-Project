import { useEffect, useRef, useState, useCallback } from 'react';
import { getSocket } from '../utils/socket';

const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

export const useWebRTC = (roomId, userId, role) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // idle, ringing, connected, ended
  const [remoteCameraOn, setRemoteCameraOn] = useState(true);
  const [remoteMicOn, setRemoteMicOn] = useState(true);

  const peerConnectionRef = useRef(null);
  const socketRef = useRef(getSocket());

  // Initialize WebRTC
  const initWebRTC = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      peerConnectionRef.current = new RTCPeerConnection(iceServers);
      
      // Add local tracks to peer connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('ice-candidate', { roomId, candidate: event.candidate });
        }
      };
      
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      return null;
    }
  }, [roomId]);

  useEffect(() => {
    const socket = socketRef.current;
    
    // Listen for incoming call (usually Doctor receives this)
    socket.on('incoming-call', () => {
      setCallStatus('ringing');
    });

    socket.on('accept-call', async () => {
      setCallStatus('connected');
      // Caller (Patient) creates offer
      if (role === 'patient') {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket.emit('offer', { roomId, offer });
      }
    });

    socket.on('reject-call', () => {
      setCallStatus('ended');
      // alert('Call was rejected');
    });

    socket.on('offer', async ({ offer }) => {
      if (peerConnectionRef.current.signalingState !== 'stable') return;
      
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit('answer', { roomId, answer });
    });

    socket.on('answer', async ({ answer }) => {
      if (peerConnectionRef.current.signalingState === 'stable') return;
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async ({ candidate }) => {
      try {
        if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (e) {
        console.error('Error adding received ice candidate', e);
      }
    });

    socket.on('end-call', () => {
      setCallStatus('ended');
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      setRemoteStream(null);
    });

    // Remote toggles
    socket.on('toggle-camera', ({ isCameraOn }) => setRemoteCameraOn(isCameraOn));
    socket.on('toggle-mic', ({ isMicOn }) => setRemoteMicOn(isMicOn));
    socket.on('start-screen-share', () => { /* Handle remote screen share UI update if needed */ });
    socket.on('stop-screen-share', () => { /* Handle remote screen share UI update if needed */ });

    return () => {
      socket.off('incoming-call');
      socket.off('accept-call');
      socket.off('reject-call');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('end-call');
      socket.off('toggle-camera');
      socket.off('toggle-mic');
      socket.off('start-screen-share');
      socket.off('stop-screen-share');
    };
  }, [roomId, role]);

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
        socketRef.current.emit('toggle-camera', { roomId, isCameraOn: videoTrack.enabled });
      }
    }
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
        socketRef.current.emit('toggle-mic', { roomId, isMicOn: audioTrack.enabled });
      }
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        
        const videoSender = peerConnectionRef.current.getSenders().find(s => s.track.kind === 'video');
        if (videoSender) {
          videoSender.replaceTrack(screenTrack);
        }
        
        // Update local stream to show screen share
        const newLocalStream = new MediaStream([screenTrack, localStream.getAudioTracks()[0]]);
        setLocalStream(newLocalStream);
        setIsScreenSharing(true);
        socketRef.current.emit('start-screen-share', { roomId });

        screenTrack.onended = () => {
          stopScreenShare();
        };
      } catch (error) {
        console.error('Error sharing screen:', error);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoTrack = videoStream.getVideoTracks()[0];
    
    const videoSender = peerConnectionRef.current.getSenders().find(s => s.track?.kind === 'video');
    if (videoSender) {
      videoSender.replaceTrack(videoTrack);
    }
    
    const newLocalStream = new MediaStream([videoTrack, localStream.getAudioTracks()[0]]);
    setLocalStream(newLocalStream);
    setIsScreenSharing(false);
    socketRef.current.emit('stop-screen-share', { roomId });
  };

  const endCall = () => {
    socketRef.current.emit('end-call', { roomId });
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    localStream?.getTracks().forEach(track => track.stop());
    setCallStatus('ended');
    setLocalStream(null);
    setRemoteStream(null);
  };

  // Setup function to join room
  const joinRoom = () => {
    socketRef.current.emit('join-room', { roomId, userId, role });
  };

  const initiateCall = () => {
    socketRef.current.emit('incoming-call', { roomId, userId, role });
  };
  
  const acceptCall = () => {
    socketRef.current.emit('accept-call', { roomId });
  };

  const rejectCall = () => {
    socketRef.current.emit('reject-call', { roomId });
  };

  return {
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
    rejectCall,
    socket: socketRef.current
  };
};
