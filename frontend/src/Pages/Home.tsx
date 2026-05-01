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

  return (
    <div className="overflow-hidden h-[calc(100vh-60px)] md:h-[calc(100vh-80px)]">
      <section className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="scroll-fade-in text-center max-w-3xl mx-auto py-4 sm:py-8 lg:py-0 space-y-3 sm:space-y-5 md:space-y-6">
          <p className="uppercase font-semibold text-xs md:text-sm text-[color:var(--body-color)]/70 tracking-wider">
            Software Company From Ghana
          </p>

          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-[color:var(--heading-color)] tiny-phone-header tiny-phone-mb">
            We build the software
            <br />
            <span className="text-gradient-animated">Ghana needs.</span>
          </h1>

          <p className="text-[color:var(--body-color)]/70 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-[60ch] mx-auto tiny-phone-text">
            Hexerize is an independent software company from Kumasi, Ghana.
            Building products for the long term, starting with Piazam, HexerSMS,
            and Stedova.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-center pt-2 tiny-phone-spacing small-phone-spacing">
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
      </section>
    </div>
  );
};

export default Home;
