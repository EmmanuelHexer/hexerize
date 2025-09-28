import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const About = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => [...prev, entry.target.id]);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-fade-in');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      title: "Innovation First",
      description: "We're always exploring emerging technologies and methodologies to deliver cutting-edge solutions that give our clients a competitive advantage.",
      icon: "🚀"
    },
    {
      title: "Quality Excellence",
      description: "Every project receives our full attention to detail, ensuring high-quality deliverables that exceed expectations and drive real results.",
      icon: "⭐"
    },
    {
      title: "Client Partnership",
      description: "We work as an extension of your team, building long-term relationships based on trust, transparency, and mutual success.",
      icon: "🤝"
    },
    {
      title: "Continuous Growth",
      description: "We're committed to continuous learning and improvement, staying ahead of industry trends to benefit our clients and ecosystem.",
      icon: "📈"
    }
  ];

  const team = [
    {
      name: "Alex Thompson",
      role: "Founder & CEO",
      description: "Full-stack developer with 8+ years of experience in building scalable digital solutions. Passionate about innovation and business growth.",
      expertise: ["Strategic Planning", "Full-Stack Development", "Business Growth"],
      image: "/api/placeholder/300/300"
    },
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      description: "Creative designer specializing in user experience and brand identity. Focused on creating meaningful digital experiences that connect with users.",
      expertise: ["UI/UX Design", "Brand Identity", "User Research"],
      image: "/api/placeholder/300/300"
    },
    {
      name: "Marcus Rodriguez",
      role: "Technical Director",
      description: "Software architect with expertise in modern web technologies and scalable system design. Ensures technical excellence in every project.",
      expertise: ["System Architecture", "DevOps", "Performance Optimization"],
      image: "/api/placeholder/300/300"
    }
  ];

  const stats = [
    { label: "Founded", value: "2024" },
    { label: "Projects Delivered", value: "150+" },
    { label: "Happy Clients", value: "50+" },
    { label: "Team Members", value: "12+" },
    { label: "Countries Served", value: "15+" },
    { label: "Lines of Code", value: "1M+" }
  ];

  return (
    <>
      <Helmet>
        <title>About Hexerize - Digital Innovation Company | Our Story & Mission</title>
        <meta name="description" content="Learn about Hexerize's mission to transform businesses through digital innovation. Discover our story, values, and commitment to building meaningful digital experiences and ecosystems." />
        <meta name="keywords" content="about hexerize, digital innovation company, our story, mission, values, team, digital transformation, business growth" />
        <link rel="canonical" href="https://hexerize.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Hexerize - Digital Innovation Company | Our Story & Mission" />
        <meta property="og:description" content="Learn about Hexerize's mission to transform businesses through digital innovation. Discover our story, values, and commitment to building meaningful digital experiences." />
        <meta property="og:url" content="https://hexerize.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="About Hexerize - Digital Innovation Company | Our Story & Mission" />
        <meta name="twitter:description" content="Learn about Hexerize's mission to transform businesses through digital innovation and meaningful digital experiences." />
      </Helmet>

      <div className="min-h-screen theme-bg theme-text">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold theme-heading mb-6 animate-fade-in">
                  About <span className="text-gradient-animated">Hexerize</span>
                </h1>
                <p className="text-xl theme-text mb-8 leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
                  We're more than a web design agency — we're a digital innovation company. We help businesses grow online through modern websites, branding, and digital strategies while building our own ecosystem of platforms and apps.
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 theme-card rounded-full border border-indigo-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full status-indicator"></div>
                    <span className="text-sm font-medium theme-accent-text">Innovation Driven</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 theme-card rounded-full border border-indigo-500/20">
                    <div className="w-2 h-2 bg-blue-500 rounded-full status-indicator"></div>
                    <span className="text-sm font-medium theme-accent-text">Client Focused</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="theme-card border border-gray-200/10 rounded-2xl p-8 hover-lift">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.slice(0, 4).map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold theme-accent-text mb-1">{stat.value}</div>
                        <div className="text-sm theme-text opacity-70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200/10 mt-6 pt-6">
                    <div className="grid grid-cols-2 gap-6">
                      {stats.slice(4).map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold theme-accent-text mb-1">{stat.value}</div>
                          <div className="text-sm theme-text opacity-70">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500/20 rounded-full animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 border-t border-gray-200/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl opacity-20">🌟</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-500/20 rounded-full animate-float"></div>
              </div>

              <div>
                <h2 className="text-4xl font-bold theme-heading mb-6">
                  Our <span className="text-gradient-animated">Story</span>
                </h2>
                <div className="space-y-6 theme-text leading-relaxed">
                  <p>
                    Founded in 2024, Hexerize emerged from a simple belief: businesses deserve digital solutions that not only look great but drive real growth. What started as a passion project has evolved into a comprehensive digital innovation company.
                  </p>
                  <p>
                    Unlike traditional agencies that focus solely on client work, we're building our own ecosystem of platforms and apps. This dual approach keeps us at the forefront of innovation, constantly pushing boundaries and exploring new possibilities.
                  </p>
                  <p>
                    Today, we work with businesses of all sizes, from startups taking their first digital steps to established companies undergoing complete digital transformation. Our goal remains the same: create meaningful, impactful digital experiences that drive real results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold theme-heading mb-6">
                Mission & <span className="text-gradient-animated">Vision</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="theme-card border border-indigo-500/20 rounded-3xl p-8 hover-lift">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                    🎯
                  </div>
                </div>
                <h3 className="text-2xl font-bold theme-heading mb-4 text-center">Our Mission</h3>
                <p className="theme-text leading-relaxed text-center">
                  To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting value in an increasingly connected world.
                </p>
              </div>

              <div className="theme-card border border-indigo-500/20 rounded-3xl p-8 hover-lift">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                    🔮
                  </div>
                </div>
                <h3 className="text-2xl font-bold theme-heading mb-4 text-center">Our Vision</h3>
                <p className="theme-text leading-relaxed text-center">
                  To become a leading digital innovation company that bridges the gap between cutting-edge technology and meaningful business outcomes, creating an ecosystem where innovation thrives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 border-t border-gray-200/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold theme-heading mb-6">
                Our <span className="text-gradient-animated">Values</span>
              </h2>
              <p className="text-lg theme-text max-w-2xl mx-auto">
                These core principles guide everything we do, from client relationships to our own product development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="w-16 h-16 theme-card border border-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold theme-heading mb-3">{value.title}</h3>
                    <p className="theme-text leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold theme-heading mb-6">
                Meet Our <span className="text-gradient-animated">Team</span>
              </h2>
              <p className="text-lg theme-text max-w-2xl mx-auto">
                Passionate innovators dedicated to creating exceptional digital experiences and driving business success.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center text-6xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      👤
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity status-indicator"></div>
                  </div>

                  <h3 className="text-xl font-semibold theme-heading mb-2">{member.name}</h3>
                  <p className="theme-accent-text font-medium mb-4">{member.role}</p>
                  <p className="theme-text text-sm mb-6 leading-relaxed">{member.description}</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs bg-indigo-500/10 theme-accent-text rounded-full border border-indigo-500/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-gray-200/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="theme-card border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold theme-heading mb-6">
                  Ready to Work Together?
                </h2>
                <p className="text-lg theme-text mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help transform your business with innovative digital solutions that drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 animate-glow">
                    Start a Project
                  </button>
                  <button className="px-8 py-4 theme-card border border-indigo-500/20 theme-text rounded-xl font-semibold hover-lift">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Background elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-500/10 rounded-full animate-float"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/10 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
