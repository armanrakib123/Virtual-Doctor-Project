"use client";
import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function Loading({ onComplete }) {
  const [showApp, setShowApp] = useState(false);

  const handleComplete = () => {
    setShowApp(true);
    if (onComplete) onComplete();
  };

  return (
    <div>
      {!showApp && <LoadingScreen onLoadingComplete={handleComplete} />}
    </div>
  );
}
