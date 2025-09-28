import { assets } from "../assets/assets";
import { useEffect } from "react";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";

const Home = () => {
  // SEO for Home page
  useSEO(seoConfig.home);

  useEffect(() => {
    // Particle Effect
    const createParticles = () => {
      const container = document.getElementById('particles-container');
      if (!container) return;

      // Clear existing particles
      container.innerHTML = '';

      const particleCount = window.innerWidth > 768 ? 15 : 8;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

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
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // Observe all scroll-fade-in elements
      document.querySelectorAll('.scroll-fade-in').forEach(el => {
        observer.observe(el);
      });
    };

    // Magnetic hover effect
    const initMagneticHover = () => {
      document.querySelectorAll('.magnetic-hover').forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = htmlElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const moveX = x * 0.1;
          const moveY = y * 0.1;

          htmlElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        htmlElement.addEventListener('mouseleave', () => {
          htmlElement.style.transform = 'translate(0px, 0px)';
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

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div className="bg-[color:var(--card-background)] transition-all duration-700 ease-in-out home-container">
      {/* Hero Section */}
      <section className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div id="particles-container" className="absolute inset-0 z-0"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-[color:var(--accent-color)]/20 rounded-full blur-3xl animate-float z-0"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[color:var(--accent-color)]/10 rounded-full blur-3xl animate-float z-0" style={{animationDelay: '2s'}}></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-12 items-center w-full max-w-7xl relative z-10 py-4 sm:py-8 lg:py-0">
          {/* Left Column - Text Content */}
          <div className="space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-6 scroll-fade-in text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-block py-2 px-4 rounded-full bg-[color:var(--accent-color)]/10 border border-[color:var(--accent-color)]/30 text-sm">
              <span className="flex items-center justify-center lg:justify-start gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 status-indicator"></span>
                <span className="text-[color:var(--accent-color)] font-medium">Available for New Projects</span>
              </span>
            </div>

            <div>
              <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 mb-4 tracking-wider">
                Digital Innovation Company
              </p>

              <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight tracking-tight text-[color:var(--heading-color)] tiny-phone-header tiny-phone-mb">
                We Build The<br/>
                <span className="text-gradient-animated">
                  Digital Future
                </span>
              </h1>
            </div>

            <p className="text-[color:var(--body-color)]/70 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-[50ch] mx-auto lg:mx-0 tiny-phone-text">
              Innovative digital solutions that transform businesses. We create modern websites, powerful apps, and strategic digital experiences that drive real growth and success.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 items-center justify-center lg:justify-start tiny-phone-spacing small-phone-spacing">
              <a
                href="#contact"
                className="magnetic-hover group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 animate-glow w-full sm:w-fit tiny-phone-buttons small-phone-buttons"
              >
                <span>Start Your Project</span>
                <img
                  src={assets.whiteArrow}
                  alt="Start project with Hexerize arrow icon"
                  className="w-4 md:w-5 transition-transform duration-300 transform group-hover:translate-x-1 brightness-0 invert"
                />
              </a>

              <a
                href="#portfolio"
                className="magnetic-hover inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-[color:var(--accent-color)] bg-transparent border border-[color:var(--accent-color)]/30 hover:bg-[color:var(--accent-color)]/10 hover:border-[color:var(--accent-color)] rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-fit tiny-phone-buttons small-phone-buttons"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                View Our Work
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full status-indicator"></div>
                <span className="text-[color:var(--body-color)]/70 font-medium text-sm sm:text-base">50+ Successful Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full status-indicator" style={{animationDelay: '1s'}}></div>
                <span className="text-[color:var(--body-color)]/70 font-medium text-sm sm:text-base">5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full status-indicator" style={{animationDelay: '2s'}}></div>
                <span className="text-[color:var(--body-color)]/70 font-medium text-sm sm:text-base">Global Clients</span>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Visual Element */}
          <div className="relative scroll-fade-in max-w-lg mx-auto lg:ml-auto mt-8 lg:mt-0">
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
                    <span className="text-[color:var(--heading-color)] font-bold text-base sm:text-lg">Innovation Dashboard</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-[color:var(--accent-color)] to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-br from-[color:var(--accent-color)]/10 to-[color:var(--accent-color)]/5 rounded-xl p-4 sm:p-5 border border-[color:var(--accent-color)]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[color:var(--accent-color)]/10 rounded-full transform translate-x-6 -translate-y-6"></div>
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[color:var(--accent-color)] to-blue-500 bg-clip-text text-transparent mb-2">150+</div>
                    <div className="text-xs sm:text-sm text-[color:var(--body-color)]/70 font-medium">Projects</div>
                  </div>
                  <div className="bg-gradient-to-br from-[color:var(--accent-color)]/10 to-[color:var(--accent-color)]/5 rounded-xl p-4 sm:p-5 border border-[color:var(--accent-color)]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[color:var(--accent-color)]/10 rounded-full transform translate-x-6 -translate-y-6"></div>
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[color:var(--accent-color)] to-blue-500 bg-clip-text text-transparent mb-2">99%</div>
                    <div className="text-xs sm:text-sm text-[color:var(--body-color)]/70 font-medium">Success Rate</div>
                  </div>
                </div>

                {/* Enhanced Progress Indicators */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-[color:var(--body-color)]/80 font-medium text-sm sm:text-base">Digital Innovation</span>
                      <span className="text-[color:var(--accent-color)] font-bold text-base sm:text-lg">97%</span>
                    </div>
                    <div className="w-full bg-[color:var(--body-color)]/10 rounded-full h-2 sm:h-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent-color)]/20 to-transparent rounded-full"></div>
                      <div className="bg-gradient-to-r from-[color:var(--accent-color)] to-blue-500 h-2 sm:h-3 rounded-full shadow-lg transition-all duration-1000 ease-out" style={{width: '97%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-[color:var(--body-color)]/80 font-medium text-sm sm:text-base">Client Satisfaction</span>
                      <span className="text-[color:var(--accent-color)] font-bold text-base sm:text-lg">99%</span>
                    </div>
                    <div className="w-full bg-[color:var(--body-color)]/10 rounded-full h-2 sm:h-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent-color)]/20 to-transparent rounded-full"></div>
                      <div className="bg-gradient-to-r from-emerald-500 to-[color:var(--accent-color)] h-2 sm:h-3 rounded-full shadow-lg transition-all duration-1000 ease-out" style={{width: '99%', animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting Tech Icons */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-60 h-60 sm:w-80 sm:h-80">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[color:var(--accent-color)]/20 border border-[color:var(--accent-color)]/40 rounded-lg flex items-center justify-center tech-orbit">
                      <svg className="w-4 h-4 text-[color:var(--accent-color)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-[color:var(--accent-color)]/20 border border-[color:var(--accent-color)]/40 rounded-lg flex items-center justify-center tech-orbit" style={{animationDelay: '10s'}}>
                      <svg className="w-4 h-4 text-[color:var(--accent-color)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[color:var(--accent-color)]/20 border border-[color:var(--accent-color)]/40 rounded-lg flex items-center justify-center tech-orbit" style={{animationDelay: '5s'}}>
                      <svg className="w-4 h-4 text-[color:var(--accent-color)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[color:var(--accent-color)]/20 border border-[color:var(--accent-color)]/40 rounded-lg flex items-center justify-center tech-orbit" style={{animationDelay: '15s'}}>
                      <svg className="w-4 h-4 text-[color:var(--accent-color)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2h6v2H7V4zm0 4h6v2H7V8zm0 4h6v2H7v-2z" clipRule="evenodd" />
                      </svg>
                    </div>
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