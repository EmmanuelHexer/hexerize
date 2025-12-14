import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { assets } from "../assets/assets";
import { createFAQSchema, createWebPageSchema, createBreadcrumbSchema } from "../utils/structuredData";
import Breadcrumbs from "../Components/Breadcrumbs";
import FAQAccordion from "../Components/FAQAccordion";

const About = () => {
  const navigate = useNavigate();

  // Add custom navbar styling for this page
  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      navbar.classList.add("about-nav");
    }
    return () => {
      if (navbar) {
        navbar.classList.remove("about-nav");
      }
    };
  }, []);

  // Create FAQ schema for About page
  const faqSchema = createFAQSchema([
    {
      question: "Who founded Hexerize?",
      answer: "Hexerize was founded in 2024 by two passionate developers, Hexer and Izen, who bring extensive expertise in full-stack development, system architecture, and digital innovation."
    },
    {
      question: "What makes Hexerize different from other agencies?",
      answer: "We're not just a client services agency - we build our own digital products and platforms like HexerSMS and Stedova. This dual approach keeps us innovative and ensures we're always working with cutting-edge technologies."
    },
    {
      question: "What technologies does your team master?",
      answer: "Our team masters 25+ technologies including React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, React Native, and AI/ML frameworks."
    },
    {
      question: "How many projects has Hexerize completed?",
      answer: "We've successfully completed 50+ projects ranging from custom web applications to mobile apps and enterprise platforms."
    },
    {
      question: "Do you work on your own products or only client work?",
      answer: "We do both! We build innovative client projects while developing our own ecosystem of platforms including HexerSMS for schools and Stedova for campus communities."
    }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createWebPageSchema(
        seoConfig.about.title,
        seoConfig.about.description,
        "https://hexerize.com/about/"
      ),
      createBreadcrumbSchema([
        { name: "Home", url: "https://hexerize.com/" },
        { name: "About", url: "https://hexerize.com/about/" }
      ]),
      faqSchema
    ]
  };

  // SEO for About page with FAQ schema
  useSEO({
    ...seoConfig.about,
    structuredData
  });

  const [, setVisibleSections] = useState<string[]>([]);

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

  const values = [
    {
      title: "Innovation First",
      description:
        "We're always exploring emerging technologies and methodologies to deliver cutting-edge solutions that give our clients a competitive advantage.",
      icon: "ri-rocket-line",
    },
    {
      title: "Quality Excellence",
      description:
        "Every project receives our full attention to detail, ensuring high-quality deliverables that exceed expectations and drive real results.",
      icon: "ri-star-line",
    },
    {
      title: "Client Partnership",
      description:
        "We work as an extension of your team, building long-term relationships based on trust, transparency, and mutual success.",
      icon: "ri-team-line",
    },
    {
      title: "Continuous Growth",
      description:
        "We're committed to continuous learning and improvement, staying ahead of industry trends to benefit our clients and ecosystem.",
      icon: "ri-line-chart-line",
    },
  ];

  const team = [
    {
      name: "Hexer",
      role: "Co-Founder & CEO",
      description:
        "Visionary entrepreneur and full-stack developer with 5+ years of experience who conceptualized the Hexerize ecosystem. Led development of 50+ successful client projects generating significant ROI. Passionate about building innovative digital solutions that solve real-world problems and drive measurable business growth.",
      credentials: [
        "5+ Years Full-Stack Development",
        "50+ Projects Successfully Delivered",
        "Expert in Performance Optimization",
        "Proven Track Record in Client Success"
      ],
      expertise: [
        "Full-Stack Development",
        "Performance Engineering",
        "Technical Innovation",
        "Team Leadership"
      ],
      technologies: ["React", "Next.js", "Node.js", "Express", "Python", "Django", "TypeScript", "JavaScript", "MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS", "Docker", "Kubernetes", "Git", "Tailwind CSS", "Bootstrap", "REST APIs", "GraphQL", "Firebase", "Vercel", "Netlify"],
      image: assets.dev1,
    },
    {
      name: "Izen",
      role: "Co-Founder & Full-Stack Developer",
      description:
        "Brilliant full-stack developer and technical architect with extensive experience in building scalable systems. Specializes in both frontend and backend development, system design, and emerging AI/ML technologies. Co-created multiple successful digital platforms serving thousands of users.",
      credentials: [
        "Expert in System Architecture",
        "AI/ML Integration Specialist",
        "Mobile & Web Development Master",
        "Product Strategy & Vision Leader"
      ],
      expertise: [
        "Full-Stack Development",
        "System Architecture",
        "Business Strategy",
        "Product Vision"
      ],
      technologies: ["React Native", "React", "Vue.js", "Angular", "Node.js", "TypeScript", "Python", "Java", "PostgreSQL", "MongoDB", "Redis", "MySQL", "GraphQL", "REST APIs", "Microservices", "Docker", "Kubernetes", "AWS", "Azure", "Git", "GitHub Actions", "Jenkins", "TensorFlow", "Machine Learning", "AI/ML", "Socket.io", "Express", "Fastify", "Prisma", "Sequelize"],
      image: assets.dev2,
    },
  ];

  const stats = [
    { label: "Founded", value: "2024" },
    { label: "Featured Projects", value: "4+" },
    { label: "Happy Clients", value: "2+" },
    { label: "Core Innovators", value: "2" },
    { label: "Technologies", value: "15+" },
    { label: "Development Hours", value: "500+" },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center lg:text-left">
              {/* Mobile-optimized centered layout */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div className="flex flex-col items-center lg:items-start w-full">
                  <div className="w-full flex justify-center lg:justify-start">
                    <Breadcrumbs items={[
                      { name: "Home", url: "https://hexerize.com/" },
                      { name: "About", url: "https://hexerize.com/about/" }
                    ]} />
                  </div>

                  {/* Mobile-optimized badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-purple-500/10 border border-purple-500/20 rounded-full">
                    <span className="text-xs font-medium text-purple-400">Who We Are</span>
                  </div>

                  <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight w-full">
                    About <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Hexerize</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl w-full">
                    Founded by two passionate developers building the future of technology with cutting-edge solutions. Explore our <span className="cursor-pointer underline decoration-dotted hover:text-blue-400 transition-colors" onClick={() => navigate("/services")}>services</span> or view our <span className="cursor-pointer underline decoration-dotted hover:text-blue-400 transition-colors" onClick={() => navigate("/projects")}>project portfolio</span>.
                  </p>

                  {/* Mobile: Show only 2 badges */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-6 lg:mb-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-indigo-500/20">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-indigo-400">
                        Innovation Driven
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-indigo-500/20">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-indigo-400">
                        Tech Innovators
                      </span>
                    </div>
                    <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-indigo-500/20">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-indigo-400">
                        Ecosystem Builders
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats card - hidden on mobile, shown on lg+ */}
                <div className="hidden lg:block relative">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                    <div className="grid grid-cols-2 gap-6">
                      {stats.slice(0, 4).map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-indigo-400 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-300 opacity-70">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200/10 mt-6 pt-6">
                      <div className="grid grid-cols-2 gap-6">
                        {stats.slice(4).map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold theme-accent-text mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm theme-text opacity-70">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500/20 rounded-full animate-float"></div>
                  <div
                    className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/10 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>

                {/* Mobile stats - shown only on mobile */}
                <div className="lg:hidden flex items-center justify-center gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-400 mb-1">2024</div>
                    <div className="text-xs text-gray-300 opacity-70">Founded</div>
                  </div>
                  <div className="w-px h-10 bg-slate-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-400 mb-1">2</div>
                    <div className="text-xs text-gray-300 opacity-70">Innovators</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl overflow-hidden relative">
                  <img
                    src={assets.ourStory}
                    alt="Hexerize Our Story - Founded by visionary developers"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-500/20 rounded-full animate-float"></div>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Story</span>
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    Founded in 2024 by two visionary developers, Hexer and Izen,
                    Hexerize began as a bold dream to revolutionize the digital landscape.
                    What started as late-night coding sessions and ambitious ideas has
                    transformed into a thriving ecosystem of innovative solutions.
                  </p>
                  <p>
                    We've mastered an extensive range of cutting-edge technologies - from
                    React and Node.js to AI/ML, cloud architecture, and mobile development.
                    Our diverse tech stack allows us to tackle any challenge and deliver
                    solutions that truly make a difference.
                  </p>
                  <p>
                    We're not just building client projects; we're creating our own ecosystem
                    with HexerSMS for schools and Stedova for campus communities. This dual
                    approach keeps us innovative, constantly learning, and always ahead of
                    the curve in emerging technologies.
                  </p>
                  <p>
                    Today, Hexerize represents the next generation of tech entrepreneurs -
                    innovative, ambitious, and results-driven. We combine fresh perspectives with
                    proven technical expertise to create digital experiences that deliver real value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Mission & <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Vision</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white text-2xl">
                    <i className="ri-focus-3-line"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  Our Mission
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  To empower businesses with innovative digital solutions that
                  drive growth, enhance user experiences, and create lasting
                  value in an increasingly connected world.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                    <i className="ri-eye-line"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  Our Vision
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  To become a leading digital innovation company that bridges
                  the gap between cutting-edge technology and meaningful
                  business outcomes, creating an ecosystem where innovation
                  thrives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                These core principles guide everything we do, from client
                relationships to our own product development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="w-16 h-16 bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 text-indigo-400">
                    <i className={value.icon}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Meet Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Passionate innovators dedicated to creating exceptional digital
                experiences and driving business success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 sm:p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-indigo-400 font-semibold text-base mb-1">
                      {member.role}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-green-400">Available for projects</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Credentials */}
                  <div className="mb-6">
                    <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-3">Credentials & Achievements</h4>
                    <div className="space-y-2">
                      {member.credentials.map((credential, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-gray-300">{credential}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-3">Core Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Combined Power */}
            <div className="mt-16 text-center">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">Combined Power</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
                    <div className="text-sm text-gray-300">Total Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                    <div className="text-sm text-gray-300">Core Expertise Areas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">2024</div>
                    <div className="text-sm text-gray-300">Year Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">∞</div>
                    <div className="text-sm text-gray-300">Innovation Potential</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Mastery */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Technology Mastery</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                We've mastered a comprehensive suite of modern technologies, enabling us to tackle any challenge and deliver cutting-edge solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Frontend",
                  icon: "ri-window-line",
                  techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"]
                },
                {
                  category: "Backend",
                  icon: "ri-server-line",
                  techs: ["Node.js", "Express", "Python", "GraphQL", "REST APIs", "Microservices"]
                },
                {
                  category: "Database & Cloud",
                  icon: "ri-database-line",
                  techs: ["MongoDB", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes"]
                },
                {
                  category: "Mobile & AI/ML",
                  icon: "ri-smartphone-line",
                  techs: ["React Native", "Firebase", "TensorFlow", "Machine Learning", "WebGL", "Socket.io"]
                }
              ].map((category, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl text-blue-400 mb-3">
                      <i className={category.icon}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.techs.map((tech, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { stat: "15+", label: "Technologies Mastered" },
                { stat: "2", label: "Core Innovators" },
                { stat: "500+", label: "Development Hours" },
                { stat: "100%", label: "Passion Driven" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{item.stat}</div>
                  <div className="text-sm text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQAccordion
          title="Frequently Asked Questions"
          subtitle="Learn more about Hexerize, our team, and what makes us different."
          items={[
            {
              question: "Who founded Hexerize?",
              answer: "Hexerize was founded in 2024 by two passionate developers, Hexer and Izen, who bring extensive expertise in full-stack development, system architecture, and digital innovation."
            },
            {
              question: "What makes Hexerize different from other agencies?",
              answer: "We're not just a client services agency - we build our own digital products and platforms like HexerSMS and Stedova. This dual approach keeps us innovative and ensures we're always working with cutting-edge technologies."
            },
            {
              question: "What technologies does your team master?",
              answer: "Our team masters 25+ technologies including React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, React Native, and AI/ML frameworks."
            },
            {
              question: "How many projects has Hexerize completed?",
              answer: "We've successfully completed 50+ projects ranging from custom web applications to mobile apps and enterprise platforms."
            },
            {
              question: "Do you work on your own products or only client work?",
              answer: "We do both! We build innovative client projects while developing our own ecosystem of platforms including HexerSMS for schools and Stedova for campus communities."
            }
          ]}
        />

        {/* CTA Section */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Ready to Work Together?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help transform your business with
                  innovative digital solutions that drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                    Start a Project
                  </button>
                  <button onClick={() => navigate('/services')} className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 text-gray-300 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300">
                    Learn More
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

export default About;
