import { NavLink } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
const Dropdown = () => {
  const { showMenu } = useAppContext();
  console.log("Dropdown rendered", showMenu);

  return (
    <div
      className={`h-full  w-[90%] bg-slate-700 text-white 
          border-r-2 border-slate-400 shadow-2xl md:hidden 
         transform transition-transform duration-300 
          ${
            showMenu
              ? "translate-x-0 opacity-100 "
              : "-translate-x-full opacity-0"
          }
        `}
    >
      <ul className="flex flex-col text-xs font-bold items-center justify-center uppercase h-[90%] space-y-5">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300"
          }
        >
          Companies
        </NavLink>
        <NavLink
          to="/how-it-works"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300"
          }
        >
          How It Works
        </NavLink>
        <NavLink
          to="/careers"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300"
          }
        >
          Careers
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-4 text-slate-400 transition duration-300"
              : "hover:text-slate-300"
          }
        >
          Community
        </NavLink>
      </ul>
    </div>
  );
};

export default Dropdown;
