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
        !dropdownRef.current.contains(e.target)
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
      className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
        showMenu
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-[color:var(--body-background)]/80 backdrop-blur-md" />

      {/* MENU PANEL */}
      <div
        ref={dropdownRef}
        className={`relative z-50 rounded-b-xl shadow-lg mx-auto w-[95%] max-w-md py-6 px-6 mt-[72px] transition-transform duration-300 bg-[color:var(--card-background)]`}
      >
        <ul className="flex flex-col gap-4 text-base font-semibold text-[color:var(--body-color)]">
          {navLinks.map(({ label, linkPath }) => (
            <li key={linkPath}>
              <NavLink
                to={linkPath}
                onClick={() => {
                  setShowMenu(false);
                  window.scrollTo(0, 0);
                }}
                className={({ isActive }) =>
                  `block w-full px-4 py-3 rounded-lg text-center transition-all duration-300 transform hover:scale-[1.02] ${
                    isActive
                      ? "bg-[color:var(--link-color)]/10 text-[color:var(--link-color)]"
                      : "text-[color:var(--body-color)] hover:bg-[color:var(--link-color)]/10 hover:text-[color:var(--link-color)]"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Explore Button - Mobile Only */}
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="bg-[color:var(--accent-color)] hover:brightness-110 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            Explore
            <img
              src={assets.rightArrow}
              alt="arrow"
              className="ml-2 w-4 filter brightness-0 invert"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
