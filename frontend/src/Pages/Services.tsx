import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { createWebPageSchema, createBreadcrumbSchema, createServiceSchema, createFAQSchema } from "../utils/structuredData";
import Breadcrumbs from "../Components/Breadcrumbs";
import Testimonials from "../Components/Testimonials";

const Services = () => {
  const navigate = useNavigate();

  // Create structured data for services page
  const faqSchema = createFAQSchema([
    {
      question: "What services do you offer?",
      answer: "Modern website development, digital branding, custom app development, and digital strategy consulting — full-stack work with React, Next.js, Node.js, Python, and the modern cloud."
    },
    {
      question: "How long does a typical project take?",
      answer: "Most projects ship in 4-12 weeks depending on scope. You'll get a detailed timeline during the discovery phase before any code is written."
    },
    {
      question: "What technologies do you work with?",
      answer: "React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and modern cloud architectures. We pick the stack that fits the problem, not the other way around."
    }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createServiceSchema(),
      createWebPageSchema(
        seoConfig.services.title,
        seoConfig.services.description,
        "https://hexerize.com/services/"
      ),
      createBreadcrumbSchema([
        { name: "Home", url: "https://hexerize.com/" },
        { name: "Services", url: "https://hexerize.com/services/" }
      ]),
      faqSchema
    ]
  };

  // SEO for Services page
  useSEO({
    ...seoConfig.services,
    structuredData
  });

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

  const services = [
    {
      id: "web-development",
      title: "Modern Website Development",
      description:
        "Custom, responsive websites built with cutting-edge technologies. From concept to deployment, we create digital experiences that drive results.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Foundation",
        "Modern Frameworks",
      ],
    },
    {
      id: "digital-branding",
      title: "Digital Branding & Identity",
      description:
        "Complete brand transformation for the digital age. We create cohesive brand experiences that resonate across all digital touchpoints.",
      features: [
        "Brand Strategy",
        "Visual Identity",
        "Digital Guidelines",
        "Asset Creation",
      ],
    },
    {
      id: "app-development",
      title: "Custom App Development",
      description:
        "Native and web applications that solve real problems. We build scalable solutions that grow with your business.",
      features: [
        "Cross-Platform",
        "Scalable Architecture",
        "User-Centric Design",
        "Performance Focused",
      ],
    },
    {
      id: "digital-strategy",
      title: "Digital Strategy & Consulting",
      description:
        "Comprehensive digital transformation roadmaps. We help businesses navigate the digital landscape with strategic insights and actionable plans.",
      features: [
        "Market Analysis",
        "Tech Stack Planning",
        "Growth Strategies",
        "ROI Optimization",
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen text-gray-100">
        {/* Hero Section */}
        <section className="relative py-10 md:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            {/* Breadcrumbs hidden visually but kept in DOM for SEO/screen readers */}
            <div className="sr-only">
              <Breadcrumbs items={[
                { name: "Home", url: "https://hexerize.com/" },
                { name: "Services", url: "https://hexerize.com/services/" }
              ]} />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
              Services
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
              We build websites, apps, and digital products. See{" "}
              <span
                className="cursor-pointer text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 transition-colors"
                onClick={() => navigate("/projects/")}
              >
                our recent work
              </span>{" "}
              or{" "}
              <span
                className="cursor-pointer text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 transition-colors"
                onClick={() => navigate("/about/")}
              >
                meet the team
              </span>
              .
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-12 md:py-16 border-t border-slate-700/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-slate-800/80">
              {services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className={`scroll-fade-in py-12 md:py-16 first:pt-0 last:pb-0 ${
                    visibleSections.includes(service.id) ? "visible" : ""
                  }`}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-300 px-3 py-1 border border-slate-700/70 rounded-full"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials testimonials={[
          {
            name: "Brediyie Team",
            role: "Founder",
            company: "Brediyie",
            content: "Hexerize transformed our online presence with a stunning, high-performance website. Their attention to detail and technical expertise exceeded our expectations. The site loads incredibly fast and has significantly improved our customer engagement.",
            rating: 5,
            project: "E-commerce Website Development"
          },
          {
            name: "Millyis Cuisine",
            role: "Owner",
            company: "Millyis Cuisine Restaurant",
            content: "Working with Hexerize was an absolute pleasure. They built us a beautiful restaurant website that perfectly captures our brand. Our online orders have increased by 40% since launch, and customers constantly compliment the user experience.",
            rating: 5,
            project: "Restaurant Website & Online Ordering System"
          }
        ]} />

        {/* FAQ Section */}
        <section className="py-12 md:py-16 border-t border-slate-700/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              Frequently asked
            </h2>

            <div className="space-y-3">
              {[
                {
                  question: "What services do you offer?",
                  answer: "Modern website development, digital branding, custom app development, and digital strategy consulting — full-stack work with React, Next.js, Node.js, Python, and the modern cloud."
                },
                {
                  question: "How long does a typical project take?",
                  answer: "Most projects ship in 4-12 weeks depending on scope. You'll get a detailed timeline during the discovery phase before any code is written."
                },
                {
                  question: "What technologies do you work with?",
                  answer: "React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and modern cloud architectures. We pick the stack that fits the problem, not the other way around."
                }
              ].map((faq, index) => (
                <details key={index} className="border border-slate-700/60 rounded-xl px-5 py-4 group open:bg-slate-800/30 transition-colors">
                  <summary className="flex justify-between items-center cursor-pointer text-white font-medium list-none gap-4">
                    <span>{faq.question}</span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 border-t border-slate-700/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Tell us what you're building. We'll get back within a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/contact/')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                Start a project
              </button>
              <button
                onClick={() => navigate('/projects/')}
                className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
              >
                See our work
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
