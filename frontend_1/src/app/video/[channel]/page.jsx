"use client";

import React, { use, useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;

export default function VideoConsultationPage({ params }) {
  const { channel } =  use(params);
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [localTracks, setLocalTracks] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await fetch(`/api/agora-token?channelName=${channel}`);
      const data = await res.json();

      await client.join(APP_ID, channel, data.token, data.uid);

      const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks([micTrack, camTrack]);

      camTrack.play(localRef.current);
      await client.publish([micTrack, camTrack]);

      setJoined(true);

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          user.videoTrack.play(remoteRef.current);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user) => {
        if (remoteRef.current) remoteRef.current.innerHTML = "";
      });
    };

    init();

    return () => {
      if (joined) {
        localTracks.forEach((track) => track.stop() && track.close());
        client.leave();
      }
    };
  }, [client, channel, joined, localTracks]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Video Consultation Room</h2>
      <div className="flex gap-4">
        <div ref={localRef} className="w-64 h-48 bg-black rounded-xl"></div>
        <div ref={remoteRef} className="w-64 h-48 bg-gray-700 rounded-xl"></div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => localTracks[1]?.setEnabled(false)}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Turn Off Camera
        </button>
        <button
          onClick={() => localTracks[0]?.setEnabled(false)}
          className="bg-yellow-500 px-4 py-2 rounded-lg"
        >
          Mute Mic
        </button>
      </div>
    </div>
  );
}
