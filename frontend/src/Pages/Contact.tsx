import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { createFAQSchema, createContactPageSchema } from "../utils/structuredData";
import Breadcrumbs from "../Components/Breadcrumbs";

const Contact = () => {
  // Add custom navbar styling for this page
  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      navbar.classList.add("contact-nav");
    }
    return () => {
      if (navbar) {
        navbar.classList.remove("contact-nav");
      }
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".scroll-fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Create FAQ schema matching visible content on this page
  const faqSchema = createFAQSchema([
    {
      question: "How long does a typical project take?",
      answer: "Most projects range from 4-12 weeks depending on complexity."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we provide maintenance and support packages for all our projects."
    },
    {
      question: "Can you work with existing teams?",
      answer: "Absolutely! We often collaborate with in-house teams as an extension."
    }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createContactPageSchema(),
      faqSchema
    ]
  };

  // SEO for Contact page with FAQ structured data
  useSEO({
    ...seoConfig.contact,
    structuredData
  });

  const contactMethods = [
    {
      title: "Email",
      value: "Coming Soon",
      icon: "ri-mail-line",
      description: "Drop us a line anytime",
    },
    {
      title: "Phone",
      value: "+233 0553130196",
      icon: "ri-phone-line",
      description: "Call us during business hours",
    },
    {
      title: "Location",
      value: "Ghana",
      icon: "ri-map-pin-line",
      description: "Visit our office",
    },
    {
      title: "Response Time",
      value: "< 24 hours",
      icon: "ri-time-line",
      description: "We're quick to respond",
    },
  ];

  // Form options removed as form is currently disabled
  // Available for future form implementation

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-100 transition-all duration-700 ease-in-out">
        {/* Animated Background Particles */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="particle" style={{ left: "10%", top: "20%", animationDelay: "0s", width: "6px", height: "6px" }}></div>
          <div className="particle" style={{ left: "80%", top: "30%", animationDelay: "2s", width: "8px", height: "8px" }}></div>
          <div className="particle" style={{ left: "20%", top: "70%", animationDelay: "4s", width: "5px", height: "5px" }}></div>
          <div className="particle" style={{ left: "70%", top: "60%", animationDelay: "6s", width: "7px", height: "7px" }}></div>
          <div className="particle" style={{ left: "50%", top: "40%", animationDelay: "3s", width: "6px", height: "6px" }}></div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
          {/* Background Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[color:var(--accent-color)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center">
              <Breadcrumbs items={[
                { name: "Home", url: "https://hexerize.com" },
                { name: "Contact", url: "https://hexerize.com/contact" }
              ]} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 rounded-full bg-[color:var(--accent-color)]/10 border border-[color:var(--accent-color)]/30 text-sm font-semibold text-[color:var(--accent-color)] tracking-wider">
                  <span className="flex items-center gap-2 justify-center">
                    <span className="h-2 w-2 rounded-full bg-green-400 status-indicator"></span>
                    READY TO HELP
                  </span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[color:var(--heading-color)] mb-6 leading-tight tracking-tight"
              >
                Let's Start a{" "}
                <span className="text-gradient-animated">Conversation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-[color:var(--body-color)]/70 max-w-3xl mx-auto leading-relaxed"
              >
                Ready to transform your digital presence? Let's discuss your vision and create something extraordinary together.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="relative py-8 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Main contact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[color:var(--accent-color)]/30 transition-all duration-500"
            >
              {/* Background glow effect */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[color:var(--accent-color)]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                {/* Contact grid */}
                <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                  {/* Left column - Main contact */}
                  <div className="space-y-10">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-sm font-semibold text-[color:var(--body-color)]/50 uppercase tracking-wider mb-4">
                          Email Us
                        </h3>
                        <a
                          href="mailto:Emmanuelhexer@gmail.com"
                          className="group/link inline-flex items-center gap-3 text-xl md:text-2xl font-bold text-[color:var(--heading-color)] hover:text-[color:var(--accent-color)] transition-colors duration-300"
                        >
                          <svg className="w-7 h-7 text-[color:var(--accent-color)] group-hover/link:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Emmanuelhexer@gmail.com
                        </a>
                        <p className="text-[color:var(--body-color)]/60 mt-3 leading-relaxed">
                          Drop us a line anytime
                        </p>
                      </motion.div>
                    </div>

                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-sm font-semibold text-[color:var(--body-color)]/50 uppercase tracking-wider mb-4">
                          Call Us
                        </h3>
                        <a
                          href="tel:+233553130196"
                          className="group/link inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-[color:var(--heading-color)] hover:text-[color:var(--accent-color)] transition-colors duration-300"
                        >
                          <svg className="w-7 h-7 text-[color:var(--accent-color)] group-hover/link:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          +233 553 130 196
                        </a>
                        <p className="text-[color:var(--body-color)]/60 mt-3 leading-relaxed">
                          Mon-Fri from 8am to 5pm
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right column - Additional info */}
                  <div className="space-y-10">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-sm font-semibold text-[color:var(--body-color)]/50 uppercase tracking-wider mb-4">
                          Location
                        </h3>
                        <div className="inline-flex items-start gap-3 text-2xl md:text-3xl font-bold text-[color:var(--heading-color)]">
                          <svg className="w-7 h-7 text-[color:var(--accent-color)] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Ghana</span>
                        </div>
                        <p className="text-[color:var(--body-color)]/60 mt-3 leading-relaxed">
                          Serving clients nationwide
                        </p>
                      </motion.div>
                    </div>

                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-sm font-semibold text-[color:var(--body-color)]/50 uppercase tracking-wider mb-4">
                          Response Time
                        </h3>
                        <div className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-[color:var(--heading-color)]">
                          <svg className="w-7 h-7 text-[color:var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          &lt; 24 hours
                        </div>
                        <p className="text-[color:var(--body-color)]/60 mt-3 leading-relaxed">
                          We're quick to respond
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Bottom note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="text-[color:var(--body-color)]/60 leading-relaxed">
                    Have a project in mind? We'd love to hear about it. Get in touch and let's create something extraordinary together.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us & FAQ Section */}
        <section className="relative pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="scroll-fade-in h-full"
              >
                <div className="h-full bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-[color:var(--accent-color)]/20 rounded-3xl p-10 hover:border-[color:var(--accent-color)]/40 transition-all duration-500 relative overflow-hidden group">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-[color:var(--accent-color)] to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-[color:var(--heading-color)]">
                        Why Choose <span className="text-gradient-animated">Hexerize?</span>
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          title: "Fast Response",
                          description: "We respond to all inquiries within 24 hours",
                          icon: "ri-flashlight-line",
                        },
                        {
                          title: "Expert Team",
                          description: "Experienced professionals across all digital disciplines",
                          icon: "ri-team-line",
                        },
                        {
                          title: "Proven Results",
                          description: "150+ successful projects and growing",
                          icon: "ri-line-chart-line",
                        },
                        {
                          title: "End-to-End Service",
                          description: "From strategy to deployment and beyond",
                          icon: "ri-refresh-line",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                          className="flex gap-5 items-start p-4 rounded-2xl hover:bg-[color:var(--accent-color)]/5 transition-all duration-300"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-[color:var(--accent-color)]/20 to-blue-600/20 border border-[color:var(--accent-color)]/30 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                            <i className={`${item.icon} text-[color:var(--accent-color)]`}></i>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-[color:var(--heading-color)] mb-2">
                              {item.title}
                            </h4>
                            <p className="text-[color:var(--body-color)]/70 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="scroll-fade-in space-y-8"
              >
                {/* FAQ */}
                <div className="h-full bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-[color:var(--accent-color)]/20 rounded-3xl p-10 hover:border-[color:var(--accent-color)]/40 transition-all duration-500 relative overflow-hidden group">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-[color:var(--heading-color)]">
                        Quick <span className="text-gradient-animated">FAQ</span>
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          question: "How long does a typical project take?",
                          answer: "Most projects range from 4-12 weeks depending on complexity.",
                        },
                        {
                          question: "Do you offer ongoing support?",
                          answer: "Yes, we provide maintenance and support packages for all our projects.",
                        },
                        {
                          question: "Can you work with existing teams?",
                          answer: "Absolutely! We often collaborate with in-house teams as an extension.",
                        },
                      ].map((faq, index) => {
                        const FAQItem = () => {
                          const [isOpen, setIsOpen] = useState(false);
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="bg-gradient-to-br from-gray-800/40 to-black/40 border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
                            >
                              <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full flex justify-between items-center p-5 text-left cursor-pointer group"
                              >
                                <span className="text-base font-bold text-[color:var(--heading-color)] pr-4 group-hover:text-[color:var(--accent-color)] transition-colors">
                                  {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-blue-600/30' : 'group-hover:bg-blue-600/30'}`}>
                                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </button>
                              <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                <div className="px-5 pb-5">
                                  <div className="pt-3 border-t border-blue-500/20">
                                    <p className="text-[color:var(--body-color)]/70 leading-relaxed">{faq.answer}</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        };
                        return <FAQItem key={index} />;
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
