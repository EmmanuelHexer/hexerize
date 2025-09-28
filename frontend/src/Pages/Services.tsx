import { useEffect, useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";

const Services = () => {
  // SEO for Services page
  useSEO(seoConfig.services);

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
      metrics: "95% faster load times",
      process: [
        "Discovery & Strategy",
        "Design & Prototyping",
        "Development & Testing",
        "Launch & Optimization",
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
      metrics: "3x brand recognition",
      process: [
        "Brand Audit",
        "Strategy Development",
        "Visual Design",
        "Implementation",
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
      metrics: "2x user engagement",
      process: [
        "Requirements Analysis",
        "Architecture Design",
        "Development",
        "Testing & Launch",
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
      metrics: "5x business growth",
      process: [
        "Business Assessment",
        "Strategy Formation",
        "Implementation Planning",
        "Performance Tracking",
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Services</span>
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12"
              >
                Comprehensive digital solutions that transform businesses and
                create lasting impact in the digital ecosystem.
              </p>
              <div
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">
                    150+
                  </div>
                  <div className="text-sm text-gray-300 opacity-70">
                    Projects Delivered
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">
                    98%
                  </div>
                  <div className="text-sm text-gray-300 opacity-70">
                    Client Satisfaction
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">
                    24/7
                  </div>
                  <div className="text-sm text-gray-300 opacity-70">
                    Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid gap-20">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`scroll-fade-in ${
                    visibleSections.includes(service.id) ? "visible" : ""
                  } grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full animate-pulse-soft"></div>
                      <span className="text-sm uppercase tracking-wide text-indigo-400 font-semibold">
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 theme-card rounded-full border border-indigo-500/20">
                      <div className="w-2 h-2 bg-green-500 rounded-full status-indicator"></div>
                      <span className="text-sm font-medium text-indigo-400">
                        {service.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <div className="relative">
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-6">
                          Our Process
                        </h3>
                        <div className="space-y-4">
                          {service.process.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                                {idx + 1}
                              </div>
                              <span className="text-gray-300">{step}</span>
                            </div>
                          ))}
                        </div>

                        {/* Progress indicator */}
                        <div className="mt-8 pt-6 border-t border-gray-200/10">
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span>Process Efficiency</span>
                            <span>92%</span>
                          </div>
                          <div className="w-full bg-gray-200/20 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500/20 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
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
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity status-indicator"></div>
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
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                    Start Your Project
                  </button>
                  <button className="px-8 py-4 bg-slate-700/50 border border-indigo-500/20 text-gray-300 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300">
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
