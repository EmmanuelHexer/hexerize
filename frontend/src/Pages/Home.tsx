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
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    client
      .fetch<LatestPost[]>(latestPostsQuery)
      .then((data) => {
        setLatestPosts(data || []);
        setPostsLoaded(true);
      })
      .catch(() => {
        setLatestPosts([]);
        setPostsLoaded(true);
      });
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

  const inMotion = [
    { label: "In development", value: "3 products" },
    { label: "First launches", value: "From 2026" },
    { label: "Built in", value: "Kumasi, Ghana" },
  ];

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

  const founders = [
    { name: "Hexer", role: "Co-founder" },
    { name: "Izen", role: "Co-founder" },
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

      {/* In motion */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
            <h2 className="text-xs uppercase tracking-widest text-gray-500">
              In motion
            </h2>
            <button
              onClick={() => navigate("/products/")}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              What we're building →
            </button>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-x-8">
            {inMotion.map((item) => (
              <div key={item.label}>
                <dt className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  {item.label}
                </dt>
                <dd className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Identity */}
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

      {/* From Kumasi */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6">
            From Kumasi
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
            Two founders, building from Kumasi for Ghana. Same people you'll
            talk to if you reach out.
          </p>
          <ul className="divide-y divide-slate-800/80">
            {founders.map((f) => (
              <li
                key={f.name}
                className="py-4 first:pt-0 last:pb-0 flex items-baseline justify-between gap-4"
              >
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {f.name}
                </span>
                <span className="text-sm text-gray-400">{f.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest writing */}
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
          {latestPosts.length > 0 ? (
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
          ) : postsLoaded ? (
            <p className="text-base text-gray-400 leading-relaxed">
              First notes coming soon.
            </p>
          ) : null}
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Get in touch.
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
            Early access, feedback, or just hello. We reply within a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hexerise@gmail.com"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-center"
            >
              hexerise@gmail.com
            </a>
            <button
              onClick={() => navigate("/contact/")}
              className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
            >
              All contact details
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
