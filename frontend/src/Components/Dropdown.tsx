import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { navLinks } from "../../Utilities/NavLinks";

const Dropdown = () => {
  const { showMenu, setShowMenu } = useAppContext();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target) &&
        !(e.target as Element).closest('button[aria-label*="menu"]')
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [showMenu, setShowMenu]);

  return (
    <div
      className={`fixed top-[60px] md:top-[80px] left-0 w-full z-40 lg:hidden transition-all duration-500 ease-out mobile-menu-height ${
        showMenu
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-[-100%] opacity-0 pointer-events-none"
      }`}
      onClick={() => setShowMenu(false)}
    >
      {/* FULL SCREEN MENU PANEL */}
      <div
        ref={dropdownRef}
        className="w-full h-full bg-[color:var(--card-background)]/95 backdrop-blur-xl border-t border-[color:var(--accent-color)]/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Links */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <ul className="flex flex-col gap-3 text-lg font-semibold text-[color:var(--body-color)]">
          {navLinks.map(({ label, linkPath }) => (
            <li key={linkPath}>
              <NavLink
                to={linkPath}
                onClick={() => {
                  setShowMenu(false);
                  window.scrollTo(0, 0);
                }}
                className={({ isActive }) =>
                  `block w-full px-6 py-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-lg ${
                    isActive
                      ? "bg-gradient-to-r from-[color:var(--accent-color)]/20 to-[color:var(--accent-color)]/10 text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/30 shadow-md"
                      : "text-[color:var(--body-color)] hover:bg-[color:var(--accent-color)]/10 hover:text-[color:var(--accent-color)] border border-transparent"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          </ul>
        </div>

        {/* Enhanced Explore Button - Mobile Only */}
        <div className="p-6 flex justify-center">
          <a
            href="/projects"
            className="bg-gradient-to-r from-[color:var(--accent-color)] to-blue-600 hover:from-[color:var(--accent-color)]/90 hover:to-blue-600/90 text-white font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center group relative overflow-hidden text-base"
            onClick={() => setShowMenu(false)}
          >
            <span className="relative z-10">Get Started</span>
            <img
              src={assets.rightArrow}
              alt="arrow"
              className="ml-3 w-4 filter brightness-0 invert transition-transform duration-300 group-hover:translate-x-1 relative z-10"
            />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
