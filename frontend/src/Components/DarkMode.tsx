import { useState } from "react";
import { Sun, Moon } from "../assets/assets.js";

const DarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
  };

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setDarkMode(); // Applies the theme to the document
      setIsDark(true); // Updates state
    } else {
      setLightMode();
      setIsDark(false);
    }
  };

  return (
    <div className="mr-4 mt-2">
      <label
        htmlFor="darkmode-toggle"
        className={`relative w-[70px] h-[34px] inline-block rounded-full transition duration-300 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.3)] cursor-pointer ${
          isDark
            ? "bg-neutral-800"
            : "bg-gradient-to-br from-yellow-100 to-yellow-300"
        }`}
      >
        <input
          type="checkbox"
          id="darkmode-toggle"
          checked={isDark}
          onChange={toggleTheme}
          className="sr-only peer"
        />

        {/* Toggle Circle */}
        <span
          className={`absolute top-[3px] left-[3px] w-[28px] h-[28px] rounded-full transition-all duration-300 shadow-[2px_2px_8px_rgba(0,0,0,0.3)] bg-white border border-white/30 flex items-center justify-center ${
            isDark
              ? "translate-x-[34px] bg-gray-700"
              : "translate-x-0 bg-yellow-400"
          }`}
        >
          <img
            src={isDark ? Moon : Sun}
            className="w-[16px] h-[16px]"
            alt="mode icon"
          />
        </span>

        {/* Sun icon (left) */}
        <img
          src={Sun}
          alt="sun"
          className={`absolute top-[8px] left-[10px] w-[16px] transition-opacity duration-300 ${
            isDark ? "opacity-30" : "opacity-100"
          }`}
        />

        {/* Moon icon (right) */}
        <img
          src={Moon}
          alt="moon"
          className={`absolute top-[8px] left-[44px] w-[16px] transition-opacity duration-300 ${
            isDark ? "opacity-100" : "opacity-30"
          }`}
        />
      </label>
    </div>
  );
};

export default DarkMode;
