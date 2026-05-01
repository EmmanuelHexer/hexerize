import { assets } from "../assets/assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { usePerformanceMonitoring } from "../hooks/usePerformanceMonitoring";
import {
  useSEOAnalytics,
  useBotDetection,
  useCoreWebVitalsSEO,
} from "../hooks/useSEOAnalytics";
import { seoConfig } from "../config/seoConfig";
import {
  createOrganizationSchema,
  createWebsiteSchema,
  createWebPageSchema,
  createBreadcrumbSchema,
  createSiteNavigationSchema,
} from "../utils/structuredData";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiMongodb } from "react-icons/si";

const Home = () => {
  const navigate = useNavigate();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createWebsiteSchema(),
      createWebPageSchema(
        seoConfig.home.title,
        seoConfig.home.description,
        "https://hexerize.com/",
      ),
      createBreadcrumbSchema([{ name: "Home", url: "https://hexerize.com/" }]),
      createSiteNavigationSchema(),
    ],
  };

  useSEO({
    ...seoConfig.home,
    structuredData,
  });

  usePerformanceMonitoring("home");
  useSEOAnalytics({
    page: "home",
    title: seoConfig.home.title,
    description: seoConfig.home.description,
  });
  useBotDetection();
  useCoreWebVitalsSEO();

  useEffect(() => {
    const createParticles = () => {
      if (window.innerWidth < 768) return;
      const container = document.getElementById("particles-container");
      if (!container) return;
      container.innerHTML = "";
      const particleCount = 15;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        const size = Math.random() * 8 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity.toString();
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        container.appendChild(particle);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const timer = setTimeout(() => {
      createParticles();
      document.querySelectorAll(".scroll-fade-in").forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    const handleResize = () => {
      createParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const products = [
    {
      name: "Piazam",
      tagline: "Online shopping for Ghana.",
      status: "Launching 2026",
      featured: true,
    },
    {
      name: "HexerSMS",
      tagline: "School management for Ghanaian schools.",
      status: "In development",
      featured: false,
    },
    {
      name: "Stedova",
      tagline: "A campus social platform.",
      status: "In development",
      featured: false,
    },
  ];

  return (
    <div className="bg-[color:var(--body-background)] transition-all duration-700 ease-in-out overflow-hidden h-[calc(100vh-60px)] md:h-[calc(100vh-80px)]">
      <section className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Particle background (desktop) */}
        <div id="particles-container" className="absolute inset-0 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center w-full max-w-7xl relative z-10 py-4 sm:py-8 lg:py-0">
          {/* Left Column - Text */}
          <div className="space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-6 scroll-fade-in text-center lg:text-left">
            <div>
              <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 mb-4 tracking-wider">
                Software Company From Ghana
              </p>

              <h1 className="font-extrabold text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight tracking-tight text-[color:var(--heading-color)] tiny-phone-header tiny-phone-mb lg:max-w-none">
                We build the software
                <br />
                <span className="text-gradient-animated">Ghana needs.</span>
              </h1>
            </div>

            <p className="text-[color:var(--body-color)]/70 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-[60ch] mx-auto lg:mx-0 tiny-phone-text">
              Hexerize is an independent software company from Kumasi, Ghana.
              Building products for the long term, starting with Piazam,
              HexerSMS, and Stedova.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center lg:justify-start tiny-phone-spacing small-phone-spacing">
              <button
                onClick={() => navigate("/products/")}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 rounded-full transition-colors duration-200 w-full sm:w-fit tiny-phone-buttons small-phone-buttons"
              >
                <span>See our products</span>
                <img
                  src={assets.whiteArrow}
                  alt="Arrow icon"
                  className="w-4 md:w-5 transition-transform duration-200 transform group-hover:translate-x-1 brightness-0 invert"
                />
              </button>

              <button
                onClick={() => navigate("/contact/")}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-[color:var(--accent-color)] bg-transparent border border-[color:var(--accent-color)]/30 hover:bg-[color:var(--accent-color)]/10 hover:border-[color:var(--accent-color)] rounded-full transition-colors duration-200 w-full sm:w-fit tiny-phone-buttons small-phone-buttons"
              >
                Get in touch
              </button>
            </div>
          </div>

          {/* Right Column - Currently Building */}
          <div className="relative scroll-fade-in max-w-md mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0 hidden lg:block w-full">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[color:var(--accent-color)]/30 via-[color:var(--accent-color)]/10 to-transparent rounded-3xl blur-2xl animate-pulse-soft"></div>

              {/* Card */}
              <div className="relative z-10 border border-[color:var(--accent-color)]/30 rounded-2xl p-7 bg-[color:var(--card-background)]/90 backdrop-blur-lg shadow-2xl">
                <div className="flex items-baseline justify-between mb-5 pb-5 border-b border-[color:var(--accent-color)]/10">
                  <h2 className="text-xs uppercase tracking-widest text-[color:var(--body-color)]/60 font-semibold">
                    Currently building
                  </h2>
                  <span className="text-xs text-[color:var(--body-color)]/40 font-medium">
                    Three products
                  </span>
                </div>

                <ul className="divide-y divide-[color:var(--accent-color)]/10">
                  {products.map((product) => (
                    <li
                      key={product.name}
                      className="py-5 first:pt-0 last:pb-0 cursor-pointer group"
                      onClick={() => navigate("/products/")}
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <span className="text-xl font-bold text-[color:var(--heading-color)] tracking-tight group-hover:text-[color:var(--accent-color)] transition-colors duration-200">
                          {product.name}
                        </span>
                        <span
                          className={`text-xs font-medium flex-shrink-0 ${
                            product.featured
                              ? "text-[color:var(--accent-color)]"
                              : "text-[color:var(--body-color)]/50"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <p className="text-sm text-[color:var(--body-color)]/60 leading-relaxed">
                        {product.tagline}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-5 border-t border-[color:var(--accent-color)]/10">
                  <button
                    onClick={() => navigate("/products/")}
                    className="text-sm text-[color:var(--accent-color)] font-medium hover:underline"
                  >
                    See all products →
                  </button>
                </div>
              </div>

              {/* Orbiting tech icons */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  left: "-100px",
                  right: "-100px",
                  top: "-100px",
                  bottom: "-100px",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    top: "47%",
                    left: "45%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#61DAFB]/20 border border-[#61DAFB]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "0s" }}
                  >
                    <FaReact className="w-8 h-8 text-[#61DAFB]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#F7DF1E]/20 border border-[#F7DF1E]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "2.5s" }}
                  >
                    <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#339933]/20 border border-[#339933]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "5s" }}
                  >
                    <FaNodeJs className="w-8 h-8 text-[#339933]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#3178C6]/20 border border-[#3178C6]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "7.5s" }}
                  >
                    <SiTypescript className="w-8 h-8 text-[#3178C6]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#3776AB]/20 border border-[#3776AB]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "10s" }}
                  >
                    <FaPython className="w-8 h-8 text-[#3776AB]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#47A248]/20 border border-[#47A248]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "12.5s" }}
                  >
                    <SiMongodb className="w-8 h-8 text-[#47A248]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#2496ED]/20 border border-[#2496ED]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "15s" }}
                  >
                    <FaDocker className="w-8 h-8 text-[#2496ED]" />
                  </div>
                  <div
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#FF9900]/20 border border-[#FF9900]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                    style={{ animationDelay: "17.5s" }}
                  >
                    <FaAws className="w-8 h-8 text-[#FF9900]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
