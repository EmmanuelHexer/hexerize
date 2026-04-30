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
      question: "What web development services do you offer?",
      answer: "We offer modern website development, digital branding, custom app development, and digital strategy consulting. Our services cover full-stack development with React, Node.js, Python, and more."
    },
    {
      question: "How long does a typical web development project take?",
      answer: "Projects typically range from 4-12 weeks depending on complexity. We provide detailed timelines during our discovery phase."
    },
    {
      question: "Do you work with startups or only established businesses?",
      answer: "We work with both startups and established businesses. Our flexible approach adapts to your company size and budget."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and modern cloud architectures."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer comprehensive maintenance and support packages to ensure your digital solutions continue performing optimally."
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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Services
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
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
            <div className="grid gap-16">
              {services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className={`scroll-fade-in ${
                    visibleSections.includes(service.id) ? "visible" : ""
                  }`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Hexerize */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Hexerize</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                We're not just another agency. We're your digital innovation
                partner, committed to building lasting success.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Innovation First",
                  description:
                    "We stay ahead of trends, implementing cutting-edge solutions that give you a competitive advantage.",
                  metric: "99.9%",
                  label: "Uptime",
                },
                {
                  title: "Results Driven",
                  description:
                    "Every decision is backed by data and focused on delivering measurable business outcomes.",
                  metric: "300%",
                  label: "Avg ROI",
                },
                {
                  title: "Partnership Approach",
                  description:
                    "We work as an extension of your team, providing ongoing support and strategic guidance.",
                  metric: "24/7",
                  label: "Support",
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-2xl font-bold text-indigo-400">
                        {item.metric}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <div className="text-sm text-indigo-400 font-medium">
                    {item.label}
                  </div>
                </div>
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
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Get answers to common questions about our services and process.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What web development services do you offer?",
                  answer: "We offer modern website development, digital branding, custom app development, and digital strategy consulting. Our services cover full-stack development with React, Node.js, Python, and more."
                },
                {
                  question: "How long does a typical web development project take?",
                  answer: "Projects typically range from 4-12 weeks depending on complexity. We provide detailed timelines during our discovery phase."
                },
                {
                  question: "Do you work with startups or only established businesses?",
                  answer: "We work with both startups and established businesses. Our flexible approach adapts to your company size and budget."
                },
                {
                  question: "What technologies do you specialize in?",
                  answer: "We specialize in React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, and modern cloud architectures."
                },
                {
                  question: "Do you provide ongoing support after launch?",
                  answer: "Yes, we offer comprehensive maintenance and support packages to ensure your digital solutions continue performing optimally."
                }
              ].map((faq, index) => (
                <details key={index} className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 group">
                  <summary className="flex justify-between items-center cursor-pointer text-white font-semibold text-lg list-none">
                    <span>{faq.question}</span>
                    <svg className="w-5 h-5 text-indigo-400 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-300 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's discuss how our comprehensive digital services can
                  accelerate your growth and create lasting impact in your
                  industry.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate('/contact/')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                    Start Your Project
                  </button>
                  <button onClick={() => navigate('/projects/')} className="px-8 py-4 bg-slate-700/50 border border-indigo-500/20 text-gray-300 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300">
                    View Our Work
                  </button>
                </div>
              </div>

              {/* Background elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-500/10 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
