import React, { useEffect, useState } from 'react';
let hasShownLoadingInThisPageLoad = false;

export default function LoadingScreen({ onLoadingComplete = () => { } }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!hasShownLoadingInThisPageLoad) {
      setShouldShow(true);
      hasShownLoadingInThisPageLoad = true;
    } else {
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!shouldShow) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        const next = Math.min(100, prev + Math.random() * 15);
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [shouldShow, onLoadingComplete]);

  useEffect(() => {
    if (!shouldShow) return;
    const txtInterval = setInterval(() => {
      setLoadingText(prev => (prev === 'Loading...' ? 'Loading' : prev + '.'));
    }, 500);
    return () => clearInterval(txtInterval);
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className="loading-backdrop">
      <div className="relative text-center text-white px-6">

        <div className="mb-8 animate-fadeIn">
          <div className=''>
            <div className="text-2xl font-bold text-gray-300 pb-2">Welcome</div>
            <div className='flex justify-center items-center' style={{ objectFit: 'contain' }}>
              <div className="flex gap-1 btn-ghost text-3xl">
                <div className='w-16'><img src="/Assets/Stethoscope.png" alt="Stethoscope_icon" /></div>
                <span className="font-bold pt-4 text-4xl">Virtual<span className="text-cyan-600">Doc</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[300px] mx-auto mb-4 animate-fadeIn">
          <div className="loading-progress-track">
            <div className="loading-progress-fill" style={{ width: `${Math.floor(progress)}%` }} />
          </div>
          <div className="mt-2 text-teal-glow font-medium">{Math.floor(progress)}%</div>
        </div>

        <div className="text-sm text-slate-400 mt-2 animate-fadeIn">{loadingText}</div>

        <div className="pointer-events-none absolute -top-24 left-1/2 transform -translate-x-1/2 w-[400px] h-[200px]">
          <div className="absolute top-[20%] left-[10%]">
            <div className="floating-dot" style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute top-[60%] left-[80%]">
            <div className="floating-dot" style={{ animationDelay: '0.9s' }} />
          </div>
          <div className="absolute top-[40%] left-[20%]">
            <div className="floating-dot" style={{ animationDelay: '1.3s' }} />
          </div>
          <div className="absolute top-[80%] left-[70%]">
            <div className="floating-dot" style={{ animationDelay: '2s' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
