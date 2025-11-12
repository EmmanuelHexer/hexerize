import { useState, useEffect } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      setProgress(scrollPercentage);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initialize on mount

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 backdrop-blur-sm z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 transition-all duration-150 ease-out shadow-lg shadow-blue-500/50"
        style={{ width: `${progress}%` }}
      >
        {/* Glowing effect */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-blue-300/80 to-transparent blur-sm"></div>
      </div>
    </div>
  );
};

export default ReadingProgress;
