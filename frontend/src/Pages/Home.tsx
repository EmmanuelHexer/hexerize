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
    <div className="bg-[color:var(--body-background)] min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
          Hexerize is a software company.
        </h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto mb-10">
          We make software products. From Ghana.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/products/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            See our products
          </button>
          <button
            onClick={() => navigate("/about/")}
            className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
          >
            About us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
