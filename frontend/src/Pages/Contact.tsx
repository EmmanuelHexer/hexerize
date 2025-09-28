import { useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";

const Contact = () => {
  // SEO for Contact page
  useSEO(seoConfig.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Thank you for your message! We'll get back to you within 24 hours.",
      );
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
      });
    }, 2000);
  };

  const contactMethods = [
    {
      title: "Email",
      value: "hello@hexerize.com",
      icon: "ri-mail-line",
      description: "Drop us a line anytime",
    },
    {
      title: "Phone",
      value: "+1 (555) 123-4567",
      icon: "ri-phone-line",
      description: "Call us during business hours",
    },
    {
      title: "Location",
      value: "San Francisco, CA",
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

  const services = [
    "Web Development",
    "Mobile App Development",
    "Digital Branding",
    "E-commerce Solutions",
    "Digital Strategy",
    "Custom Software",
    "UI/UX Design",
    "Other",
  ];

  const budgets = [
    "Under $10k",
    "$10k - $25k",
    "$25k - $50k",
    "$50k - $100k",
    "$100k+",
    "Let's discuss",
  ];

  const timelines = [
    "ASAP",
    "1-2 months",
    "3-6 months",
    "6+ months",
    "Flexible",
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get In <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12"
              >
                Ready to transform your business? Let's discuss your project and
                explore how we can create innovative digital solutions that
                drive real results.
              </p>
              <div
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">
                    &lt; 24h
                  </div>
                  <div className="text-sm text-gray-300 opacity-70">
                    Response Time
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">
                    Free
                  </div>
                  <div className="text-sm text-gray-300 opacity-70">
                    Consultation
                  </div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">
                    100%
                  </div>
                  <div className="text-sm text-gray-300 opacity-70">
                    Confidential
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-4 gap-6 mb-20">
              {contactMethods.map((method, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 text-indigo-400">
                    <i className={method.icon}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-indigo-400 font-medium mb-1">
                    {method.value}
                  </p>
                  <p className="text-sm text-gray-300 opacity-70">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="theme-card border border-gray-200/10 rounded-3xl p-8 hover-lift">
                  <h2 className="text-2xl sm:text-3xl font-bold theme-heading mb-6 sm:mb-8">
                    Start Your Project
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium theme-text mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                          Service Needed *
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors"
                        >
                          <option value="">Select budget</option>
                          {budgets.map((budget, index) => (
                            <option key={index} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2">
                          Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline, index) => (
                            <option key={index} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium theme-text mb-2">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 theme-card border border-gray-200/20 rounded-xl theme-text focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your project goals, challenges, and any specific requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending Message..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-8">
                {/* Why Choose Us */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Why Choose Hexerize?
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Fast Response",
                        description:
                          "We respond to all inquiries within 24 hours",
                        icon: "ri-flashlight-line",
                      },
                      {
                        title: "Expert Team",
                        description:
                          "Experienced professionals across all digital disciplines",
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
                      <div key={index} className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-700/50 border border-indigo-500/20 rounded-xl flex items-center justify-center text-lg text-indigo-400">
                          <i className={item.icon}></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-300 opacity-70">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Quick FAQ
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        question: "How long does a typical project take?",
                        answer:
                          "Most projects range from 4-12 weeks depending on complexity.",
                      },
                      {
                        question: "Do you offer ongoing support?",
                        answer:
                          "Yes, we provide maintenance and support packages for all our projects.",
                      },
                      {
                        question: "Can you work with existing teams?",
                        answer:
                          "Absolutely! We often collaborate with in-house teams as an extension.",
                      },
                    ].map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-white mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-gray-300 opacity-70 mb-4">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-8 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Prefer to talk directly?
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Schedule a free 30-minute consultation call to discuss
                      your project.
                    </p>
                    <button className="px-6 py-3 bg-slate-700/50 border border-indigo-500/20 text-gray-300 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300">
                      Schedule Call
                    </button>
                  </div>

                  {/* Background elements */}
                  <div className="absolute top-2 right-2 w-12 h-12 bg-indigo-500/10 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 bg-purple-500/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
