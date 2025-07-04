import { assets } from "../assets/assets";

const Home = () => {
  return (
    <div className="bg-[color:var(--card-background)] transition-all duration-700 ease-in-out">
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
        }}
        className="flex flex-col justify-between sm-home-screen"
      >
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center p-4 pt-[16px] md:pt-[20px]">
          <div className="text-center w-full max-w-5xl backdrop-blur-md rounded-xl md:p-10 animate-fade-in text-[color:var(--body-color)]">
            <p className="uppercase font-semibold text-[11px] md:text-sm text-[color:var(--body-color)]/70 mb-3 tracking-normal animate-slide-up">
              AI-powered no-code platform
            </p>

            <h1 className="capitalize max-w-10xl font-extrabold text-4xl md:text-6xl mb-4 md:mb-6 leading-tight tracking-tight text-[color:var(--accent-color)] animate-slide-up drop-shadow-[2px_4px_1px_rgba(0,0,0,0.2)] ">
              Meet AI-powered visual development
            </h1>

            <p className="text-[color:var(--body-color)]/70 text-base md:text-lg font-medium leading-relaxed max-w-[55ch] mx-auto mb-4 md:mb-10 animate-slide-up drop-shadow-[1px_1px_0px_rgba(0,0,0,0.05)]">
              The control you love, now supercharged by AI. <br />
              Build and scale apps without code — trusted by 5M+ developers and
              teams.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="#"
                className="relative group inline-flex items-center gap-2 px-10 py-2 md:py-4 text-lg font-semibold text-white bg-[color:var(--accent-color)] hover:brightness-110 rounded-full shadow-xl ring-2 ring-[color:var(--accent-color)]/30 hover:ring-[color:var(--accent-color)]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[color:var(--accent-color)]/40 animate-slide-up overflow-hidden"
              >
                {/* Neon Glow Layer */}
                <span className="absolute -inset-px bg-[color:var(--accent-color)] blur-md opacity-25 group-hover:opacity-40 rounded-full transition duration-300" />

                {/* Glow Pulse Overlay */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-0 group-hover:opacity-10 transition duration-300" />

                {/* Light Flash on Hover */}
                <span className="absolute left-0 top-0 w-full h-full rounded-full bg-white/10 group-hover:animate-pulse-faint opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Text + Icon */}
                <span className="relative z-10">Start Building</span>
                <img
                  src={assets.whiteArrow}
                  alt="arrow"
                  className="relative z-10 w-5 transition-transform duration-300 transform group-hover:translate-x-1 brightness-0 invert"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Brand Strip */}
        <div className="w-full px-6 py-8 md:py-10 bg-gradient-to-r from-[#0f172a] via-[color:var(--accent-color)] to-[#0f172a] text-white rounded-t-3xl shadow-2xl overflow-hidden relative">
          <div className="relative z-10 text-center max-w-6xl mx-auto">
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase mb-2 md:mb-8 text-white/80">
              Backed by Real Results
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-8 text-center">
              {/* Stat 1 */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-1.5 md:p6 shadow-md hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                  5M+
                </h3>
                <p className="text-white/70 mt-2 text-sm md:text-base">
                  Projects Deployed
                </p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-1.5 md:p-6 shadow-md hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                  98%
                </h3>
                <p className="text-white/70 mt-2 text-sm md:text-base">
                  Customer Satisfaction
                </p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-1.5 md:p-6 shadow-md hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                  50+
                </h3>
                <p className="text-white/70 mt-2 text-sm md:text-base">
                  Countries Reached
                </p>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-[color:var(--accent-color)] opacity-10 blur-2xl pointer-events-none z-0" />
        </div>
      </div>
    </div>
  );
};

export default Home;
