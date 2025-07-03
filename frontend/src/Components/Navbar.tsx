import { useAppContext } from "../AppContext/AppContext.jsx";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { showMenu, setShowMenu } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex z-20 absolute w-full justify-between items-center px-4 py-4 md:py-6 md:px-6 bg-gradient-to-r from-gray-800 to-indigo-400 shadow-xl">
        <img
          onClick={() => {
            navigate("/");
            setShowMenu(false);
          }}
          className="md:w-30 w-28"
          src={assets.logo}
          alt=""
        />
        <ul className="hidden md:flex space-x-2 md:space-x-6 text-white uppercase font-semibold md:font-extrabold text-xs md:text-sm">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : ""
            }
            to={"/about"}
          >
            <a href="">About</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : ""
            }
            to={"/companies"}
          >
            <a href="">Companies</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : ""
            }
            to={"/how-it-works"}
          >
            <a href="">how it works</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : ""
            }
            to={"/careers"}
          >
            <a href="">careers</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : ""
            }
            to={"/community"}
          >
            <a href="">community</a>
          </NavLink>
        </ul>
        <div>
          <a
            href=""
            className="  gap-1 group text-sm font-bold flex text-center items-center bg-white text-gray-800 px-4 py-2 md:px-4 md:py-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Explore{" "}
            <img
              className="w-4 group-hover:translate-x-1 group-hover:transition-transform duration-300"
              src={assets.rightArrow}
              alt=""
            />
          </a>
        </div>{" "}
        <button
          className="md:hidden flex uppercase text-sm items-center text-white font-bold"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            className="h-8 w-10"
            src={showMenu ? assets.closeMenu : assets.openMenu}
            alt=""
          />
        </button>
      </div>
    </>
  );
};

export default Navbar;
