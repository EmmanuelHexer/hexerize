import { useState, useEffect } from "react";
import { Sun, Moon } from "../assets/assets.js";

const DarkMode = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
  };

  // Set default dark mode on component mount
  useEffect(() => {
    setDarkMode();
  }, []);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setLightMode(); // Now checked means light mode
      setIsDark(false); // Updates state
    } else {
      setDarkMode(); // Unchecked means dark mode (default)
      setIsDark(true);
    }
  };

  return (
    <div className="mr-4">
      <label
        htmlFor="darkmode-toggle"
        className={`relative w-[60px] h-[30px] inline-block rounded-full transition-all duration-500 cursor-pointer shadow-lg border-2 ${
          isDark
            ? "bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600"
            : "bg-gradient-to-r from-sky-200 to-blue-300 border-blue-200"
        }`}
      >
        <input
          type="checkbox"
          id="darkmode-toggle"
          checked={!isDark} // Invert logic - checked means light mode
          onChange={toggleTheme}
          className="sr-only peer"
        />

        {/* Toggle Circle */}
        <span
          className={`absolute top-[1px] left-[1px] w-[26px] h-[26px] rounded-full transition-all duration-500 ease-in-out shadow-xl flex items-center justify-center transform ${
            isDark
              ? "translate-x-0 bg-gradient-to-br from-slate-600 to-slate-700 rotate-0" // Dark mode - slider on left
              : "translate-x-[28px] bg-gradient-to-br from-yellow-300 to-orange-400 rotate-180" // Light mode - slider on right
          }`}
        >
          <img
            src={isDark ? Moon : Sun}
            className="w-[14px] h-[14px] transition-all duration-500 transform"
            alt={isDark ? "Dark mode" : "Light mode"}
          />
        </span>

        {/* Background Icons with Glow Effect */}
        <div className={`absolute top-[6px] left-[8px] transition-all duration-500 ${
          isDark ? "opacity-40 scale-90" : "opacity-20 scale-75"
        }`}>
          <img src={Moon} alt="Moon icon for dark mode toggle" className="w-[12px] h-[12px]" />
        </div>

        <div className={`absolute top-[6px] right-[8px] transition-all duration-500 ${
          isDark ? "opacity-20 scale-75" : "opacity-40 scale-90"
        }`}>
          <img src={Sun} alt="Sun icon for light mode toggle" className="w-[12px] h-[12px]" />
        </div>
      </label>
    </div>
  );
};

export default DarkMode;
