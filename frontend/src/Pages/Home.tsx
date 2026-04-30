import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { usePerformanceMonitoring } from "../hooks/usePerformanceMonitoring";
import {
  useSEOAnalytics,
  useBotDetection,
  useCoreWebVitalsSEO,
} from "../hooks/useSEOAnalytics";
import { seoConfig } from "../config/seoConfig";
import { client } from "../sanity/client";
import { latestPostsQuery } from "../sanity/queries";
import {
  createOrganizationSchema,
  createWebsiteSchema,
  createWebPageSchema,
  createBreadcrumbSchema,
  createSiteNavigationSchema,
} from "../utils/structuredData";

interface LatestPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState<LatestPost[]>([]);

  useEffect(() => {
    client
      .fetch<LatestPost[]>(latestPostsQuery)
      .then((data) => setLatestPosts(data || []))
      .catch(() => setLatestPosts([]));
  }, []);

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

  const principles = [
    {
      title: "Build to last.",
      body: "Software that holds up over years, not weeks. We invest in foundations that compound, not features that decay.",
    },
    {
      title: "Start from use.",
      body: "Every product begins from something we've watched not work in Ghana, not a market we read about online.",
    },
    {
      title: "Ship and keep improving.",
      body: "Working software in users' hands beats perfect software in our heads. We ship early and keep going.",
    },
  ];

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen text-gray-100">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            We build the software Ghana needs.
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto mb-10">
            Founded in 2024. Here for the long term.
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
      </section>

      {/* What we are */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Hexerize is a software company. We pick problems we've watched up
            close in Ghana and build products around them. New products keep
            coming. The old ones aren't going anywhere.
          </p>
        </div>
      </section>

      {/* How we work */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
            How we work
          </h2>
          <div className="space-y-6">
            {principles.map((p) => (
              <div key={p.title}>
                <h3 className="text-base font-semibold text-white mb-1">
                  {p.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed max-w-2xl">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <section className="py-12 md:py-16 border-t border-slate-700/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
              <h2 className="text-xs uppercase tracking-widest text-gray-500">
                Latest writing
              </h2>
              <button
                onClick={() => navigate("/blog/")}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                See all →
              </button>
            </div>
            <ul className="divide-y divide-slate-800/80">
              {latestPosts.map((post) => (
                <li key={post._id} className="py-4 first:pt-0 last:pb-0">
                  <a
                    href={`/blog/${post.slug.current}/`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${post.slug.current}/`);
                    }}
                    className="flex items-baseline justify-between gap-4 group"
                  >
                    <span className="text-base md:text-lg text-gray-200 group-hover:text-blue-300 transition-colors">
                      {post.title}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatDate(post.publishedAt)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Footer note */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base md:text-lg text-gray-300 mb-3">
            Want to know when something ships?
          </p>
          <button
            onClick={() => navigate("/contact/")}
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-base md:text-lg"
          >
            Get in touch →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
