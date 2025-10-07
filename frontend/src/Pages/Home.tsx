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
} from "../utils/structuredData";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiMongodb } from "react-icons/si";

const Home = () => {
  const navigate = useNavigate();

  // Create comprehensive structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createWebsiteSchema(),
      createWebPageSchema(
        seoConfig.home.title,
        seoConfig.home.description,
        "https://hexerize.com",
      ),
      createBreadcrumbSchema([{ name: "Home", url: "https://hexerize.com" }]),
    ],
  };

  // SEO for Home page with structured data
  useSEO({
    ...seoConfig.home,
    structuredData,
  });

  // Performance and SEO monitoring
  usePerformanceMonitoring("home");
  useSEOAnalytics({
    page: "home",
    title: seoConfig.home.title,
    description: seoConfig.home.description,
  });
  useBotDetection();
  useCoreWebVitalsSEO();

  useEffect(() => {
    // Particle Effect (desktop only for mobile performance)
    const createParticles = () => {
      if (window.innerWidth < 768) return; // Skip particles on mobile
      const container = document.getElementById("particles-container");
      if (!container) return;

      // Clear existing particles
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

    // Scroll animations
    const initScrollAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      // Observe all scroll-fade-in elements
      document.querySelectorAll(".scroll-fade-in").forEach((el) => {
        observer.observe(el);
      });
    };

    // Magnetic hover effect (desktop only for performance)
    const initMagneticHover = () => {
      if (window.innerWidth < 1024) return; // Skip on mobile/tablet
      document.querySelectorAll(".magnetic-hover").forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = htmlElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const moveX = x * 0.1;
          const moveY = y * 0.1;

          htmlElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        htmlElement.addEventListener("mouseleave", () => {
          htmlElement.style.transform = "translate(0px, 0px)";
        });
      });
    };

    // Initialize everything
    const timer = setTimeout(() => {
      createParticles();
      initScrollAnimations();
      initMagneticHover();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-[color:var(--card-background)] transition-all duration-700 ease-in-out overflow-hidden h-[calc(100vh-60px)] md:h-[calc(100vh-80px)]">
        {/* Hero Section */}
        <section className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div id="particles-container" className="absolute inset-0 z-0"></div>

          {/* Mobile-Only Floating Language Icons */}
          <div className="lg:hidden absolute inset-0 z-5 pointer-events-none">
            {/* React Icon - Top Left */}
            <div className="absolute top-20 left-6 w-10 h-10 bg-[#61DAFB]/5 backdrop-blur-sm border border-[#61DAFB]/15 rounded-xl flex items-center justify-center animate-slide-up-float opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <FaReact className="w-6 h-6 text-[#61DAFB] opacity-50" />
            </div>

            {/* JavaScript Icon - Top Right */}
            <div className="absolute top-24 right-8 w-10 h-10 bg-[#F7DF1E]/5 backdrop-blur-sm border border-[#F7DF1E]/15 rounded-xl flex items-center justify-center animate-slide-up-float opacity-0" style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
              <SiJavascript className="w-6 h-6 text-[#F7DF1E] opacity-50" />
            </div>

            {/* TypeScript Icon - Top Middle */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#3178C6]/5 backdrop-blur-sm border border-[#3178C6]/15 rounded-xl flex items-center justify-center animate-slide-up-float opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              <SiTypescript className="w-6 h-6 text-[#3178C6] opacity-50" />
            </div>

            {/* Node.js Icon - Bottom Middle */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#339933]/5 backdrop-blur-sm border border-[#339933]/15 rounded-xl flex items-center justify-center animate-slide-up-float opacity-0" style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}>
              <FaNodeJs className="w-6 h-6 text-[#339933] opacity-50" />
            </div>

            {/* Python Icon - Bottom Left */}
            <div className="absolute bottom-28 left-8 w-10 h-10 bg-[#3776AB]/5 backdrop-blur-sm border border-[#3776AB]/15 rounded-xl flex items-center justify-center animate-slide-up-float opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
              <FaPython className="w-6 h-6 text-[#3776AB] opacity-50" />
            </div>

            {/* MongoDB Icon - Bottom Right */}
            <div className="absolute bottom-24 right-4 w-10 h-10 bg-[#47A248]/5 backdrop-blur-sm border border-[#47A248]/15 rounded-xl flex items-center justify-center animate-slide-up-float opacity-0" style={{ animationDelay: "0.95s", animationFillMode: "forwards" }}>
              <SiMongodb className="w-6 h-6 text-[#47A248] opacity-50" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-12 items-center w-full max-w-7xl relative z-10 py-4 sm:py-8 lg:py-0">
            {/* Left Column - Text Content */}
            <div className="space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-6 scroll-fade-in text-center lg:text-left">
              {/* Status Badge */}
              <div className="inline-block py-2 px-4 rounded-full bg-[color:var(--accent-color)]/10 border border-[color:var(--accent-color)]/30 text-sm tiny-phone-badge">
                <span className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 status-indicator"></span>
                  <span className="text-[color:var(--accent-color)] font-medium">
                    <span className="hidden tiny-phone-show">Open for Projects</span>
                    <span className="tiny-phone-hide">Available for New Projects</span>
                  </span>
                </span>
              </div>

              <div>
                <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 mb-4 tracking-wider">
                  Digital Innovation Company
                </p>

                <h1 className="font-extrabold text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight tracking-tight text-[color:var(--heading-color)] tiny-phone-header tiny-phone-mb">
                  We Build The
                  <br />
                  <span className="text-gradient-animated">Digital Future</span>
                </h1>
              </div>

              <p className="text-[color:var(--body-color)]/70 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-[50ch] mx-auto lg:mx-0 tiny-phone-text">
                {/* iPhone 5 version - shorter */}
                <span className="hidden tiny-phone-show">
                  <span className="cursor-pointer underline decoration-dotted hover:text-[color:var(--accent-color)] transition-colors" onClick={() => navigate("/about")}>We</span> build innovative <span className="cursor-pointer underline decoration-dotted hover:text-[color:var(--accent-color)] transition-colors" onClick={() => navigate("/services")}>websites and apps</span> that transform businesses and drive real growth.
                </span>
                {/* Larger screens version - full text */}
                <span className="tiny-phone-hide">
                  Innovative <span className="cursor-pointer underline decoration-dotted hover:text-[color:var(--accent-color)] transition-colors" onClick={() => navigate("/services")}>digital solutions</span> that transform businesses. We
                  create modern websites, powerful apps, and strategic digital
                  experiences that drive real growth and success. <span className="cursor-pointer underline decoration-dotted hover:text-[color:var(--accent-color)] transition-colors" onClick={() => navigate("/about")}>Learn more about our team</span>.
                </span>
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center lg:justify-start tiny-phone-spacing small-phone-spacing">
                <button
                  onClick={() => navigate("/contact")}
                  className="magnetic-hover group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 animate-glow w-full sm:w-fit tiny-phone-buttons small-phone-buttons"
                >
                  <span>Start Your Project</span>
                  <img
                    src={assets.whiteArrow}
                    alt="Arrow icon - Start your web development project with Hexerize"
                    className="w-4 md:w-5 transition-transform duration-300 transform group-hover:translate-x-1 brightness-0 invert"
                  />
                </button>

                <button
                  onClick={() => navigate("/projects")}
                  className="magnetic-hover inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-[color:var(--accent-color)] bg-transparent border border-[color:var(--accent-color)]/30 hover:bg-[color:var(--accent-color)]/10 hover:border-[color:var(--accent-color)] rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-fit tiny-phone-buttons small-phone-buttons"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View Our Work
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 justify-center lg:justify-start">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full status-indicator"></div>
                  <span className="text-[color:var(--body-color)]/70 font-medium text-sm sm:text-base">
                    50+ Successful Projects
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 bg-blue-400 rounded-full status-indicator"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span className="text-[color:var(--body-color)]/70 font-medium text-sm sm:text-base">
                    5+ Years Experience
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 bg-purple-400 rounded-full status-indicator"
                    style={{ animationDelay: "2s" }}
                  ></div>
                  <span className="text-[color:var(--body-color)]/70 font-medium text-sm sm:text-base">
                    Global Clients
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Professional Visual Element */}
            <div className="relative scroll-fade-in max-w-lg mx-auto lg:ml-auto mt-8 lg:mt-0 hidden lg:block">
              {/* Main Visual Container */}
              <div className="relative">
                {/* Enhanced Glowing Background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[color:var(--accent-color)]/30 via-[color:var(--accent-color)]/10 to-transparent rounded-3xl blur-2xl animate-pulse-soft"></div>

                {/* Main Content Card */}
                <div className="relative z-10 bg-[color:var(--card-background)]/90 backdrop-blur-lg border border-[color:var(--accent-color)]/30 rounded-3xl p-6 sm:p-8 shadow-2xl hover-lift">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-[color:var(--heading-color)] font-bold text-base sm:text-lg">
                        Innovation Dashboard
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-[color:var(--accent-color)] to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-gradient-to-br from-[color:var(--accent-color)]/10 to-[color:var(--accent-color)]/5 rounded-xl p-4 sm:p-5 border border-[color:var(--accent-color)]/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-[color:var(--accent-color)]/10 rounded-full transform translate-x-6 -translate-y-6"></div>
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[color:var(--accent-color)] to-blue-500 bg-clip-text text-transparent mb-2">
                        150+
                      </div>
                      <div className="text-xs sm:text-sm text-[color:var(--body-color)]/70 font-medium">
                        Projects
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[color:var(--accent-color)]/10 to-[color:var(--accent-color)]/5 rounded-xl p-4 sm:p-5 border border-[color:var(--accent-color)]/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-[color:var(--accent-color)]/10 rounded-full transform translate-x-6 -translate-y-6"></div>
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[color:var(--accent-color)] to-blue-500 bg-clip-text text-transparent mb-2">
                        99%
                      </div>
                      <div className="text-xs sm:text-sm text-[color:var(--body-color)]/70 font-medium">
                        Success Rate
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress Indicators */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-[color:var(--body-color)]/80 font-medium text-sm sm:text-base">
                          Digital Innovation
                        </span>
                        <span className="text-[color:var(--accent-color)] font-bold text-base sm:text-lg">
                          97%
                        </span>
                      </div>
                      <div className="w-full bg-[color:var(--body-color)]/10 rounded-full h-2 sm:h-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent-color)]/20 to-transparent rounded-full"></div>
                        <div
                          className="bg-gradient-to-r from-[color:var(--accent-color)] to-blue-500 h-2 sm:h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                          style={{ width: "97%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-[color:var(--body-color)]/80 font-medium text-sm sm:text-base">
                          Client Satisfaction
                        </span>
                        <span className="text-[color:var(--accent-color)] font-bold text-base sm:text-lg">
                          99%
                        </span>
                      </div>
                      <div className="w-full bg-[color:var(--body-color)]/10 rounded-full h-2 sm:h-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent-color)]/20 to-transparent rounded-full"></div>
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-[color:var(--accent-color)] h-2 sm:h-3 rounded-full shadow-lg transition-all duration-1000 ease-out"
                          style={{ width: "99%", animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Language Icons */}
                <div
                  className="absolute inset-0 pointer-events-none"
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
                    {/* React Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#61DAFB]/20 border border-[#61DAFB]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "0s" }}
                    >
                      <FaReact className="w-8 h-8 text-[#61DAFB]" />
                    </div>

                    {/* JavaScript Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#F7DF1E]/20 border border-[#F7DF1E]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "2.5s" }}
                    >
                      <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />
                    </div>

                    {/* Node.js Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#339933]/20 border border-[#339933]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "5s" }}
                    >
                      <FaNodeJs className="w-8 h-8 text-[#339933]" />
                    </div>

                    {/* TypeScript Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#3178C6]/20 border border-[#3178C6]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "7.5s" }}
                    >
                      <SiTypescript className="w-8 h-8 text-[#3178C6]" />
                    </div>

                    {/* Python Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#3776AB]/20 border border-[#3776AB]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "10s" }}
                    >
                      <FaPython className="w-8 h-8 text-[#3776AB]" />
                    </div>

                    {/* MongoDB Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#47A248]/20 border border-[#47A248]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "12.5s" }}
                    >
                      <SiMongodb className="w-8 h-8 text-[#47A248]" />
                    </div>

                    {/* Docker Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#2496ED]/20 border border-[#2496ED]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "15s" }}
                    >
                      <FaDocker className="w-8 h-8 text-[#2496ED]" />
                    </div>

                    {/* AWS Icon */}
                    <div
                      className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#FF9900]/20 border border-[#FF9900]/50 rounded-xl flex items-center justify-center tech-orbit shadow-lg"
                      style={{ animationDelay: "17.5s" }}
                    >
                      <FaAws className="w-8 h-8 text-[#FF9900]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <span className="bg-[color:var(--card-background)]/80 backdrop-blur-sm py-2 px-4 rounded-full text-sm border border-[color:var(--accent-color)]/20 flex items-center gap-2 hover-lift text-[color:var(--heading-color)]">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  React
                </span>
                <span className="bg-[color:var(--card-background)]/80 backdrop-blur-sm py-2 px-4 rounded-full text-sm border border-[color:var(--accent-color)]/20 flex items-center gap-2 hover-lift text-[color:var(--heading-color)]">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Node.js
                </span>
                <span className="bg-[color:var(--card-background)]/80 backdrop-blur-sm py-2 px-4 rounded-full text-sm border border-[color:var(--accent-color)]/20 flex items-center gap-2 hover-lift text-[color:var(--heading-color)]">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  AI/ML
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
