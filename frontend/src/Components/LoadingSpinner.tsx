import { useState, useEffect } from 'react';

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
      <div className="flex flex-col items-center gap-4">
        {/* Minimal, Professional Loading Animation */}
        <div className="relative">
          <div className="w-8 h-8 border-2 border-[color:var(--accent-color)]/20 rounded-full"></div>
          <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-[color:var(--accent-color)] rounded-full animate-spin"></div>
        </div>

        {/* Subtle Loading Text */}
        <div className="text-center">
          <p className="text-sm text-[color:var(--body-color)]/60 font-medium">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;