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
      document.querySelectorAll(".scroll-fade-in").forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
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
            <div className="border border-[color:var(--accent-color)]/20 rounded-2xl p-7 bg-[color:var(--card-background)]/40">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
