import { NavLink } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
const Dropdown = () => {
  const { showMenu, setShowMenu } = useAppContext();
  console.log("Dropdown rendered", showMenu);

  return (
    <div
      className={`h-full w-[90%] bg-slate-700 text-white 
          border-r-2 border-slate-400 shadow-2xl md:hidden 
      fixed top-0 left-0 z-30 flex flex-col items-center justify-center
          ${showMenu ? "animate-slide-in " : "animate-slide-out"}
        `}
    >
      <ul className="flex flex-col text-xs font-bold items-center justify-center uppercase h-[90%] space-y-5">
        <NavLink
          onClick={() => {
            setShowMenu(!showMenu);
            scrollTo(0, 0);
          }}
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300 border-2 px-4 py-2 rounded-md"
          }
        >
          About
        </NavLink>
        <NavLink
          onClick={() => {
            setShowMenu(!showMenu);
            scrollTo(0, 0);
          }}
          to="/companies"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300 border-2 px-4 py-2 rounded-md"
          }
        >
          Companies
        </NavLink>
        <NavLink
          onClick={() => {
            setShowMenu(!showMenu);
            scrollTo(0, 0);
          }}
          to="/how-it-works"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300 border-2 px-4 py-2 rounded-md"
          }
        >
          How It Works
        </NavLink>
        <NavLink
          onClick={() => {
            setShowMenu(!showMenu);
            scrollTo(0, 0);
          }}
          to="/careers"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300 border-2 px-4 py-2 rounded-md"
          }
        >
          Careers
        </NavLink>
        <NavLink
          onClick={() => {
            setShowMenu(!showMenu);
            scrollTo(0, 0);
          }}
          to="/community"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300 border-2 px-4 py-2 rounded-md"
          }
        >
          Community
        </NavLink>
      </ul>
    </div>
  );
};

export default Dropdown;
