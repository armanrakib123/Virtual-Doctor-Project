
"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  PhoneIncoming,
  Loader2,
  Video,
  ShieldCheck,
  Stethoscope,
  MessageCircle,
  PhoneCall,
  PhoneOff,
  UserRound,
  Activity,
  LockKeyhole,
  Wifi,
} from "lucide-react";

import { useWebRTC } from "../../../hooks/useWebRTC";
import VideoPlayer from "../../../Components/VideoPlayer";
import CallControls from "../../../Components/CallControls";
import ChatPanel from "../../../Components/ChatPanel";

export default function RoomPage({ params }) {
  // Next.js 15+ params unwrap
  const { roomId } = use(params);

  const router = useRouter();
  const { data: session, status } = useSession();

  const [role, setRole] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // User identity
  const userId =
    session?.user?.email || `guest_${Math.floor(Math.random() * 100000)}`;

  const userName =
    session?.user?.name ||
    (role === "doctor" ? "Doctor" : "Patient");

  /*
  =====================================================
  USER ROLE
  =====================================================
  */

  useEffect(() => {
    if (status === "authenticated") {
      setRole(session?.user?.role || "patient");
    }

    if (status === "unauthenticated") {
      setRole("patient");
    }
  }, [status, session]);

  /*
  =====================================================
  WEBRTC HOOK
  =====================================================
  */

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
    rejectCall,
  } = useWebRTC(roomId, userId, role);

  /*
  =====================================================
  INITIALIZE ROOM
  =====================================================
  */

  useEffect(() => {
    if (!role) return;

    joinRoom();
    initWebRTC();

    return () => {
      // Cleanup is handled inside WebRTC hook if implemented
    };
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
  =====================================================
  LOADING SCREEN
  =====================================================
  */

  if (status === "loading" || !role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-4">
        <div className="w-full max-w-md text-center">

          {/* Logo */}

          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/20">
            <Stethoscope className="h-12 w-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Virtual
            <span className="text-cyan-400">Doc</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Connecting you to secure healthcare
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-cyan-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">
              Preparing your consultation...
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            Secure healthcare connection
          </div>

        </div>
      </div>
    );
  }

  /*
  =====================================================
  CALL STATUS TEXT
  =====================================================
  */

  const getStatusText = () => {
    switch (callStatus) {
      case "calling":
        return "Calling patient...";

      case "ringing":
        return role === "doctor"
          ? "Waiting for patient..."
          : "Incoming consultation call";

      case "connected":
        return "Consultation in progress";

      case "ended":
        return "Consultation ended";

      default:
        return "Ready for consultation";
    }
  };

  /*
  =====================================================
  MAIN UI
  =====================================================
  */

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-slate-950 text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative flex min-w-0 flex-1 flex-col">


        {/* =====================================================
            TOP NAVBAR
        ====================================================== */}

        <header className="relative z-30 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

          {/* BRAND */}

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

              <Stethoscope className="h-6 w-6 text-white" />

            </div>


            <div>

              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Virtual
                <span className="text-cyan-400">Doc</span>
              </h1>

              <p className="hidden text-xs text-slate-400 sm:block">
                Healthcare Video Consultation
              </p>

            </div>

          </div>


          {/* CENTER STATUS */}

          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 md:flex">

            <div
              className={`h-2.5 w-2.5 rounded-full ${
                callStatus === "connected"
                  ? "bg-green-400 animate-pulse"
                  : "bg-yellow-400"
              }`}
            />

            <span className="text-sm font-medium text-slate-300">
              {getStatusText()}
            </span>

          </div>


          {/* RIGHT INFO */}

          <div className="flex items-center gap-3">

            {/* Connection */}

            <div className="hidden items-center gap-2 text-xs text-green-400 sm:flex">

              <Wifi className="h-4 w-4" />

              <span>Secure</span>

            </div>


            {/* User */}

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20">

                <UserRound className="h-4 w-4 text-cyan-300" />

              </div>


              <div className="hidden text-left sm:block">

                <p className="max-w-[120px] truncate text-sm font-semibold">
                  {userName}
                </p>

                <p className="text-[10px] uppercase tracking-wider text-cyan-400">
                  {role}
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* =====================================================
            MOBILE STATUS
        ====================================================== */}

        <div className="flex items-center justify-center gap-2 border-b border-white/5 bg-slate-900 px-4 py-2 text-xs md:hidden">

          <div
            className={`h-2 w-2 rounded-full ${
              callStatus === "connected"
                ? "bg-green-400 animate-pulse"
                : "bg-yellow-400"
            }`}
          />

          <span className="text-slate-400">
            {getStatusText()}
          </span>

        </div>


        {/* =====================================================
            VIDEO AREA
        ====================================================== */}

        <section className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-5 lg:p-6">


          {/* Remote Video */}

          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl lg:rounded-3xl">

            <VideoPlayer
              stream={remoteStream}
              isLocal={false}
              name={role === "doctor" ? "Patient" : "Doctor"}
              isMuted={!remoteMicOn}
              isCameraOff={!remoteCameraOn}
            />


            {/* Remote User Waiting Overlay */}

            {!remoteStream && callStatus !== "connected" && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">

                <div className="relative mb-6">

                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />

                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10">

                    <UserRound className="h-10 w-10 text-cyan-400" />

                  </div>

                </div>


                <h2 className="text-xl font-bold text-white">

                  {role === "doctor"
                    ? "Waiting for Patient"
                    : "Waiting for Doctor"}

                </h2>


                <p className="mt-2 text-center text-sm text-slate-400">

                  Your secure VirtualDoc consultation room is ready.

                </p>

              </div>
            )}


            {/* Secure Badge */}

            <div className="absolute left-4 top-4 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs backdrop-blur-md sm:flex">

              <LockKeyhole className="h-3.5 w-3.5 text-green-400" />

              <span className="text-slate-200">
                Secure Consultation
              </span>

            </div>


            {/* Call Status Badge */}

            <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs backdrop-blur-md">

              <Activity className="h-3.5 w-3.5 text-cyan-400" />

              <span className="hidden text-slate-200 sm:inline">
                {callStatus === "connected"
                  ? "Live"
                  : "Online"}
              </span>

            </div>

          </div>


          {/* =====================================================
              LOCAL VIDEO PIP
          ====================================================== */}

          <div className="absolute bottom-24 right-5 z-30 w-28 overflow-hidden rounded-xl border-2 border-white/20 bg-black shadow-2xl sm:bottom-28 sm:right-8 sm:w-40 lg:w-52">

            <VideoPlayer
              stream={localStream}
              isLocal={true}
              name="You"
              isMuted={!isMicOn}
              isCameraOff={!isCameraOn}
            />

          </div>


          {/* =====================================================
              DOCTOR CALL BUTTON
          ====================================================== */}

          <AnimatePresence>

            {callStatus === "idle" && role === "doctor" && (

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
              >

                <button
                  onClick={initiateCall}
                  className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-bold text-white shadow-2xl shadow-cyan-500/30 transition hover:scale-105 active:scale-95"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">

                    <PhoneCall className="h-5 w-5" />

                  </div>

                  <div className="text-left">

                    <p className="text-base">
                      Start Consultation
                    </p>

                    <p className="text-xs font-normal text-white/70">
                      Call your patient securely
                    </p>

                  </div>

                </button>

              </motion.div>

            )}

          </AnimatePresence>


          {/* =====================================================
              CALL CONTROLS
          ====================================================== */}

          <div className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2">

            <CallControls
              isCameraOn={isCameraOn}
              isMicOn={isMicOn}
              isScreenSharing={isScreenSharing}

              toggleCamera={toggleCamera}
              toggleMic={toggleMic}
              toggleScreenShare={toggleScreenShare}

              endCall={() => {
                endCall();
                router.push("/");
              }}

              toggleChat={() => setIsChatOpen(!isChatOpen)}
              isChatOpen={isChatOpen}
            />

          </div>

        </section>


        {/* =====================================================
            FOOTER INFO
        ====================================================== */}

        <footer className="hidden items-center justify-center gap-2 border-t border-white/5 bg-slate-950/80 py-2 text-[11px] text-slate-500 sm:flex">

          <ShieldCheck className="h-3.5 w-3.5 text-green-400" />

          <span>
            VirtualDoc Secure Healthcare Consultation
          </span>

          <span className="mx-1 text-slate-700">•</span>

          <span>Room: {roomId}</span>

        </footer>

      </div>


      {/* =====================================================
          CHAT PANEL
      ====================================================== */}

      <AnimatePresence>

        {isChatOpen && (

          <ChatPanel
            roomId={roomId}
            userId={userId}
            onClose={() => setIsChatOpen(false)}
          />

        )}

      </AnimatePresence>


      {/* =====================================================
          INCOMING CALL MODAL
      ====================================================== */}

      <AnimatePresence>

        {callStatus === "ringing" && role === "patient" && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              scale: 0.85,
            }}

            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          >

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center shadow-2xl">


              {/* Animated Icon */}

              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">

                <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30">

                  <PhoneIncoming className="h-9 w-9 text-white" />

                </div>

              </div>


              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400">

                VirtualDoc Consultation

              </p>


              <h2 className="text-2xl font-bold text-white">

                Incoming Call

              </h2>


              <p className="mt-3 leading-6 text-slate-400">

                Your doctor is calling you for your scheduled
                healthcare consultation.

              </p>


              {/* Buttons */}

              <div className="mt-8 grid grid-cols-2 gap-4">


                {/* DECLINE */}

                <button
                  onClick={rejectCall}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-red-500/10 p-4 text-red-400 transition hover:bg-red-500 hover:text-white"
                >

                  <PhoneOff className="h-6 w-6" />

                  <span className="font-semibold">
                    Decline
                  </span>

                </button>


                {/* ACCEPT */}

                <button
                  onClick={acceptCall}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-green-500 p-4 text-white shadow-lg shadow-green-500/20 transition hover:scale-[1.03] hover:bg-green-600"
                >

                  <PhoneIncoming className="h-6 w-6" />

                  <span className="font-semibold">
                    Accept
                  </span>

                </button>

              </div>


              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">

                <ShieldCheck className="h-4 w-4 text-green-400" />

                Secure VirtualDoc Connection

              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
          CALL ENDED SCREEN
      ====================================================== */}

      <AnimatePresence>

        {callStatus === "ended" && (

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xl"
          >

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-10 text-center shadow-2xl">


              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">

                <PhoneOff className="h-10 w-10 text-red-400" />

              </div>


              <h2 className="text-3xl font-bold text-white">

                Consultation Ended

              </h2>


              <p className="mt-3 leading-6 text-slate-400">

                Your VirtualDoc healthcare consultation has ended.
                Thank you for using VirtualDoc.

              </p>


              <button
                onClick={() => router.push("/")}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >

                Return to VirtualDoc

              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
}

