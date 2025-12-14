import { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const LoadingSpinner = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Only show loader after a delay - most loads should be faster than this
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 150); // Show loader only if loading takes longer than 150ms

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything if loading is fast
  if (!showLoader) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[color:var(--card-background)] flex items-center justify-center">
      <div className="animate-pulse-scale">
        <img
          src={assets.darkLogo}
          alt="Hexerize Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      <style>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.85);
            opacity: 0.7;
          }
        }

        .animate-pulse-scale {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;