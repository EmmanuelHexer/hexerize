const Blog = () => {
  return (
    <div
      className={` bg-[color:var(--card-background)] h-[100vh]  transition-all duration-700 ease-in-out overflow-y-auto`}
    >
      <div className="flex flex-col md:flex-row px-10 py-10 md:py-15 justify-between items-center p-4">
        <p className="md:text-5xl mb-4 md:mb-0 text-3xl capitalize font-extrabold  leading-tight tracking-tight text-[color:var(--accent-color)] animate-slide-up">
          Map your Success
        </p>
        <button className="animate-slide-up px-6  text-white hover:brightness-110 bg-[color:var(--accent-color)]  rounded-full shadow-xl ring-2 ring-[color:var(--accent-color)]/30 hover:ring-[color:var(--accent-color)]/50 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[color:var(--accent-color)]/40 animate-slide-up overflow-hidden  py-4 duration-400 cursor-pointer  font-semibold">
          Discover More
        </button>
      </div>
      <hr className="text-gray-200 mt-4" />
      <div className="flex flex-col md:flex-row mt-25 gap-4 px-10">
        <div className="text-center md:text-start">
          <p className="text-8xl font-semibold text-gray-400 mb-10">01</p>
          <p className=" text-lg mb-5 capitalize text-[color:var(--body-color)]/70 font-semibold ">
            get started
          </p>
          <p className="text-[color:var(--body-color)]/70 text-base md:text-lg ">
            With our intuitive setup, you’re up and running in minutes.
          </p>
        </div>{" "}
        <div className="text-center md:text-start">
          <p className="text-8xl font-semibold text-gray-400 mb-10">02</p>
          <p className=" text-lg mb-5 text-[color:var(--body-color)]/70 capitalize font-semibold">
            Customize and Configure
          </p>
          <p className="text-[color:var(--body-color)]/70 text-base md:text-lg ">
            Adapt Area to your specific requirements and preferences.
          </p>
        </div>{" "}
        <div className="text-center md:text-start">
          <p className="text-8xl font-semibold text-gray-400 mb-10">03</p>
          <p className=" text-lg mb-5 capitalize text-[color:var(--body-color)]/70 font-semibold">
            Grow Your Business
          </p>
          <p className="text-[color:var(--body-color)]/70 text-base md:text-lg ">
            Make informed decisions to exceed your goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
