import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { assets } from "../assets/assets";

const About = () => {
  // SEO for About page
  useSEO(seoConfig.about);
  const navigate = useNavigate();

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
        "Visionary entrepreneur and full-stack developer who conceptualized the Hexerize ecosystem. Passionate about building innovative digital solutions that solve real-world problems and drive business growth.",
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
        "Brilliant full-stack developer and technical architect who brings cutting-edge solutions to life. Specializes in both frontend and backend development, system design, and emerging technologies.",
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
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  About <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Hexerize</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Founded by two passionate young developers, Hexerize is a
                  digital innovation company building the future of technology.
                  We create cutting-edge solutions for clients while developing
                  our own ecosystem of revolutionary platforms and applications.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-indigo-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-indigo-400">
                      Innovation Driven
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-indigo-500/20">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-indigo-400">
                      Tech Innovators
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-indigo-500/20">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-indigo-400">
                      Ecosystem Builders
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
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
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl opacity-20 text-indigo-400"><i className="ri-star-line"></i></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft"></div>
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
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center text-6xl overflow-hidden group-hover:scale-105 transition-transform duration-300 text-indigo-400">
                      {member.image && typeof member.image === 'string' && member.image.includes('/api/placeholder') ? (
                        <i className="ri-user-line"></i>
                      ) : member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="ri-user-line"></i>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity status-indicator"></div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-indigo-400 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Skills</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20"
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
