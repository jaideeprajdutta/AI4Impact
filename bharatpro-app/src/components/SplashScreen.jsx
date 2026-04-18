import { useState, useEffect, useRef } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fallback timer in case video doesn't fire 'ended' event
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 6000); // Max 6 seconds

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 8000); // Extra time for smooth transition
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-[#000] flex items-center justify-center transition-opacity duration-1000 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* The Intro Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleComplete}
          className="w-full h-full object-contain md:scale-110"
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtle overlay to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 pointer-events-none" />
      </div>
    </div>
  );
}
