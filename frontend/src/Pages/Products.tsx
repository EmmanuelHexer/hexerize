import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import Breadcrumbs from "../Components/Breadcrumbs";

const Products = () => {
  useSEO(seoConfig.products);
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => [...prev, entry.target.id]);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".scroll-fade-in");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      id: "piazam",
      title: "Piazam",
      tagline: "Online shopping for Ghana.",
      description:
        "An e-commerce platform built around how Ghanaians buy and sell. Launching in 2026.",
      tech: ["React", "Node.js", "PostgreSQL"],
      status: "Launching soon",
    },
    {
      id: "hexersms",
      title: "HexerSMS",
      tagline: "School management for Ghanaian schools.",
      description:
        "Student records, attendance tracking, gradebook, and a parent portal. Built for primary and junior high schools in Ghana.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In development",
    },
    {
      id: "stedova",
      title: "Stedova",
      tagline: "A campus social platform.",
      description:
        "Lecturer discovery, social feeds, real-time chat, and an integrated marketplace for Ghanaian university students.",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io"],
      status: "In development",
    },
  ];

  return (
    <div className="min-h-screen text-gray-100">
      {/* Hero Section */}
      <section className="relative py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="sr-only">
            <Breadcrumbs items={[
              { name: "Home", url: "https://hexerize.com/" },
              { name: "Products", url: "https://hexerize.com/products/" }
            ]} />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
            Products
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
            What we make and what we're building next.
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="divide-y divide-slate-800/80">
            {products.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className={`scroll-fade-in py-12 md:py-16 first:pt-0 last:pb-0 ${
                  visibleSections.includes(product.id) ? "visible" : ""
                }`}
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500 mb-3">
                  <span className="text-blue-400">{product.status}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                  {product.title}
                </h2>

                <p className="text-base md:text-lg text-gray-200 mb-3 leading-relaxed max-w-2xl">
                  {product.tagline}
                </p>

                <p className="text-base text-gray-400 mb-6 leading-relaxed max-w-2xl">
                  {product.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {product.tech.map((tech, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-300 px-3 py-1 border border-slate-700/70 rounded-full"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Past work */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Past work
          </h2>
          <p className="text-base text-gray-400 leading-relaxed max-w-2xl">
            We took on a couple of client projects in 2024 to fund the company.
            Both are delivered. The future is products.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Want early access?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Reach out and we'll let you know when each product opens up.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/contact/")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              Get in touch
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
    </div>
  );
};

export default Products;
