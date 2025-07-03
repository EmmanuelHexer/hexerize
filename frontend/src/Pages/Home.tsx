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

            <h1 className="capitalize font-extrabold text-4xl md:text-6xl mb-6 leading-tight tracking-tight text-[color:var(--accent-color)] animate-slide-up">
              Meet AI-powered <br className="hidden md:block" />
              visual development
            </h1>

            <p className="text-[color:var(--body-color)]/80 text-sm md:text-lg font-medium leading-relaxed max-w-[55ch] mx-auto mb-5 md:mb-10 animate-slide-up">
              The control you love, now supercharged by AI. <br />
              Build and scale apps without code — trusted by 5M+ developers and
              teams.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="#"
                className="relative group inline-flex items-center gap-2 px-10 py-2 md:py-4 text-lg font-semibold text-white bg-[color:var(--accent-color)] hover:brightness-110 rounded-full shadow-lg ring-2 ring-[color:var(--accent-color)]/30 hover:ring-[color:var(--accent-color)]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[color:var(--accent-color)]/40 animate-slide-up"
              >
                <span className="absolute inset-0 bg-[color:var(--accent-color)]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        <div className="w-full px-4 py-6 md:py-8 rounded-t-xl shadow-md text-white bg-[color:var(--accent-color)]">
          <div className="relative z-10 text-center max-w-6xl mx-auto">
            <p className="text-sm md:text-base font-semibold tracking-wide mb-5 text-white">
              Backed by real results
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-center">
              <div className="space-y-1">
                <h3 className="text-1xl md:text-4xl font-bold text-white">
                  5M+
                </h3>
                <p className="text-xs md:text-sm text-white">
                  Projects Deployed
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-1xl md:text-4xl font-bold text-white">
                  98%
                </h3>
                <p className="text-xs md:text-sm text-white">
                  Customer Satisfaction
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-1xl md:text-4xl font-bold text-white">
                  50+
                </h3>
                <p className="text-xs md:text-sm text-white">
                  Countries Reached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
