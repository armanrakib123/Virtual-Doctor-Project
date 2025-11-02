// "use client";
// import React from 'react'
// import { useState } from 'react'
// import LoadingScreen from './LoadingScreen';



// export default function Loading() {
//     const [showApp, setShowApp] = useState(false)

//     return (
//         <div>
//             {!showApp && (
//                 <LoadingScreen onLoadingComplete={() => setShowApp(true)} />
//             )}
//         </div>
//     )
// }

"use client";
import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function Loading({ onComplete }) {
  const [showApp, setShowApp] = useState(false);

  const handleComplete = () => {
    setShowApp(true);
    if (onComplete) onComplete(); // 🔥 tell parent (RootLayout) loading is done
  };

  return (
    <div>
      {!showApp && <LoadingScreen onLoadingComplete={handleComplete} />}
    </div>
  );
}
