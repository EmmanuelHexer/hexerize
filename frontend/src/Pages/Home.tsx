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

  return (
    <div className="min-h-screen text-gray-100">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            We build the software Ghana needs.
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto mb-10">
            An independent software company from Kumasi, founded in 2024 by
            Hexer and Izen. Building for the long term.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/products/")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              See our products
            </button>
            <button
              onClick={() => navigate("/contact/")}
              className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
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
