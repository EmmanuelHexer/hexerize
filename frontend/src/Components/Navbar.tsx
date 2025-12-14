import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

import { navLinks } from "../../Utilities/NavLinks";

// React Router v6+ uses function form for className

const Navbar = () => {
  const { showMenu, setShowMenu } = useAppContext();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full h-[60px] md:h-[80px] z-50 theme-card backdrop-blur-md shadow-md px-4 py-3 md:px-8 md:py-5 flex justify-between items-center transition-all duration-300">
      <div
        onClick={() => {
          navigate("/");
          setShowMenu(false);
        }}
        className="cursor-pointer"
      >
        <img
          src={assets.darkLogo}
          alt="Hexerize Logo"
          className="w-28 md:w-32 md:h-auto rounded-md hover:scale-105 transition-transform duration-300"
        />
      </div>
      <nav className="hidden lg:flex space-x-10 text-base font-medium theme-text ml-[100px]">
        {navLinks.map(({ label, linkPath }) => {
          const path = linkPath;
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative group hover:theme-accent-text transition-colors duration-300 ${
                  isActive ? "theme-accent-text" : ""
                }`
              }
            >
              {label}
              <span
                className={`absolute left-0 bottom-[-4px] w-full h-0.5 theme-accent-bg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  window.location.pathname === path ? "scale-x-100" : ""
                }`}
              ></span>
            </NavLink>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex item-center h-full m-auto">
          {/* <DarkMode /> */}
          <a
            href="/projects/"
            className="relative theme-accent-bg hover:brightness-110 text-white text-sm md:text-base font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group items-center overflow-hidden hidden lg:flex"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">Explore</span>
            <img
              src={assets.rightArrow}
              alt="Navigation arrow icon"
              className="ml-2 w-4 filter brightness-0 invert transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
        <button
          className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-[color:var(--accent-color)]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-color)]/50 z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          aria-label={showMenu ? "Close menu" : "Open menu"}
          aria-expanded={showMenu}
        >
          <div className="hamburger-icon">
            <span
              className={`hamburger-line line-1 ${showMenu ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line line-2 ${showMenu ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line line-3 ${showMenu ? "active" : ""}`}
            ></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
