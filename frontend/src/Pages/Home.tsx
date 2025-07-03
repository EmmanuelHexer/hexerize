import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import Dropdown from "../Components/Dropdown";

const Home = () => {
  const { showMenu } = useAppContext();
  return (
    <div
      className={` h-[100vh] translate-y-0  overflow-hidden relative transform ease-in-out transition-all duration-700`}
    >
      {showMenu && <Dropdown />}
      <div
        className={
          showMenu
            ? `blur-lg md:blur-none flex items-center justify-center h-[90%] p-4`
            : `blur-none flex items-center justify-center h-[90%] p-4`
        }
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #f3f4f6 80%, #f9a8d4)",
        }}
      >
        <div className=" text-center">
          <p className="uppercase font-bold mt-4 md:mt-0 text-gray-500 text-xs md:text-sm mb-2">
            ai-powered no code platform
          </p>
          <p className="capitalize font-bold text-3xl sm: md:text-5xl mb-4 md:mb-6">
            Meet AI-powered visual development
          </p>
          <p className="text-gray-600 text-sm md:text-base mb-10 font-semibold">
            The visual control you know and love, now superchangeable by AI.
            Bubble turns ideas into fully scalable apps-fast. <br /> Join
            5million+ builders designing,launching and scaling powerful
            businesses on Bubble.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {" "}
            <a
              href=""
              className="gap-2 md:w-2/5 group text-sm font-bold flex text-center items-center bg-blue-800 text-white px-7 py-5 capitalize whitespace-nowrap rounded-full hover:bg-indigo-500 transition duration-300"
            >
              start building for free{" "}
              <img
                className="w-6 group-hover:translate-x-30  duration-1600 group-hover:opacity-0"
                src={assets.whiteArrow}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0  w-full bg-gradient-to-l from-gray-800 to-blue-950 flex flex-col md:items-center items-start justify-center text-white p-2 md:p-8">
        <p className="font-semibold text-center md:text-lg text-sm mb-4">
          500+ Global Brands Run on Hexerize
        </p>
        <div className="flex flex-row flex-wrap md:items-center justify-evenly gap-4 md:p-4 p-2 items-start">
          <img className="md:w-34 w-28 mr-1 md:mr-6" src={assets.logo} alt="" />
          <img className="md:w-34 w-28 mr-1 md:mr-6" src={assets.logo} alt="" />
          <img className="md:w-34 w-28 mr-1 md:mr-6" src={assets.logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
