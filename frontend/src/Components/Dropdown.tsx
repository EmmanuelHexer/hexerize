import { NavLink } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
const Dropdown = () => {
  const { showMenu } = useAppContext();
  return (
    <div>
      <div
        className={
          !showMenu
            ? "absolute md:hidden -translate-y-50  transform  left-0 w-full transition-all duration-600 ease-in-out z-20 bg-gray-800 text-white p-4 "
            : "absolute shadow-2xl translate-y-16 left-0  w-full z-20 bg-slate-700 text-white p-4 transition-all duration-600 ease-in-out"
        }
      >
        <ul className="flex flex-col text-xs font-bold items-center uppercase space-y-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : "hover:text-slate-300"
            }
            to={"/about"}
          >
            <a href="">About</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : "hover:text-slate-300"
            }
            to={"/companies"}
          >
            <a href="">Companies</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : "hover:text-slate-300"
            }
            to={"/how-it-works"}
          >
            <a href="">How It Works</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : "hover:text-slate-300"
            }
            to={"/careers"}
          >
            <a href="">Careers</a>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-4 text-slate-400 transition duration-300"
                : "hover:text-slate-300"
            }
            to={"/community"}
          >
            <a href="">Community</a>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
