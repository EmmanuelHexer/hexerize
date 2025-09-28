import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Projects = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const projects = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Revolution",
      category: "web",
      client: "TechMart Solutions",
      description: "Complete digital transformation of a traditional retail business into a modern e-commerce powerhouse.",
      challenge: "Legacy systems, poor mobile experience, 70% cart abandonment rate",
      solution: "Modern React-based platform with AI-powered recommendations and seamless checkout",
      results: ["300% increase in conversions", "85% reduction in cart abandonment", "50% faster page load times"],
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      image: "/api/placeholder/600/400",
      year: "2024",
      duration: "4 months"
    },
    {
      id: "fintech-app",
      title: "FinanceFlow Mobile",
      category: "app",
      client: "FinanceFlow Inc",
      description: "Revolutionary mobile banking app that simplifies personal finance management for millennials.",
      challenge: "Complex financial data visualization, security concerns, user adoption",
      solution: "Intuitive React Native app with advanced analytics and bank-grade security",
      results: ["500K+ downloads in 6 months", "4.8/5 app store rating", "40% user retention increase"],
      tech: ["React Native", "TypeScript", "Firebase", "Plaid API", "Biometric Auth"],
      image: "/api/placeholder/600/400",
      year: "2024",
      duration: "6 months"
    },
    {
      id: "healthcare-portal",
      title: "MedConnect Portal",
      category: "web",
      client: "HealthCare United",
      description: "Comprehensive patient portal connecting doctors, patients, and healthcare providers seamlessly.",
      challenge: "HIPAA compliance, complex workflows, legacy system integration",
      solution: "Secure, scalable portal with telemedicine capabilities and real-time communication",
      results: ["90% patient satisfaction", "60% reduction in admin tasks", "HIPAA compliant infrastructure"],
      tech: ["Vue.js", "Python", "PostgreSQL", "WebRTC", "Docker"],
      image: "/api/placeholder/600/400",
      year: "2023",
      duration: "8 months"
    },
    {
      id: "ai-analytics",
      title: "DataInsight AI",
      category: "platform",
      client: "Analytics Pro",
      description: "AI-powered business intelligence platform that transforms raw data into actionable insights.",
      challenge: "Complex data processing, real-time analytics, scalability requirements",
      solution: "Cloud-native platform with machine learning algorithms and intuitive dashboards",
      results: ["75% faster decision making", "10x data processing speed", "Enterprise ready scaling"],
      tech: ["Python", "TensorFlow", "Kubernetes", "Apache Kafka", "React"],
      image: "/api/placeholder/600/400",
      year: "2024",
      duration: "10 months"
    },
    {
      id: "social-platform",
      title: "ConnectHub Social",
      category: "app",
      client: "ConnectHub LLC",
      description: "Next-generation social platform focusing on meaningful connections and community building.",
      challenge: "User engagement, content moderation, real-time messaging at scale",
      solution: "Progressive web app with AI moderation and advanced networking features",
      results: ["1M+ active users", "200% engagement increase", "99.9% uptime"],
      tech: ["Next.js", "Socket.io", "Redis", "OpenAI API", "Vercel"],
      image: "/api/placeholder/600/400",
      year: "2023",
      duration: "12 months"
    },
    {
      id: "edu-platform",
      title: "EduLearn Academy",
      category: "platform",
      client: "EduLearn Technologies",
      description: "Interactive learning platform revolutionizing online education with gamification and AI tutoring.",
      challenge: "Student engagement, personalized learning paths, assessment automation",
      solution: "Adaptive learning platform with AI tutors and comprehensive progress tracking",
      results: ["95% course completion rate", "4x learning efficiency", "Global classroom reach"],
      tech: ["Angular", "Node.js", "MongoDB", "WebGL", "ML.js"],
      image: "/api/placeholder/600/400",
      year: "2024",
      duration: "7 months"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
    { id: 'app', label: 'Mobile Apps', count: projects.filter(p => p.category === 'app').length },
    { id: 'platform', label: 'Platforms', count: projects.filter(p => p.category === 'platform').length }
  ];

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Our Projects - Hexerize | Digital Innovation Portfolio & Case Studies</title>
        <meta name="description" content="Explore Hexerize's portfolio of innovative digital projects, websites, apps, and digital solutions. See how we help businesses transform and grow through cutting-edge technology." />
        <meta name="keywords" content="digital projects, portfolio, case studies, web development projects, app development, digital innovation, client work, business transformation" />
        <link rel="canonical" href="https://hexerize.com/projects" />

        {/* Open Graph */}
        <meta property="og:title" content="Our Projects - Hexerize | Digital Innovation Portfolio & Case Studies" />
        <meta property="og:description" content="Explore Hexerize's portfolio of innovative digital projects, websites, apps, and digital solutions. See how we help businesses transform and grow." />
        <meta property="og:url" content="https://hexerize.com/projects" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:title" content="Our Projects - Hexerize | Digital Innovation Portfolio & Case Studies" />
        <meta name="twitter:description" content="Explore Hexerize's portfolio of innovative digital projects, websites, apps, and digital solutions." />
      </Helmet>

      <div className="min-h-screen theme-bg theme-text">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold theme-heading mb-6 animate-fade-in">
                Our <span className="text-gradient-animated">Projects</span>
              </h1>
              <p className="text-xl theme-text max-w-3xl mx-auto mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
                Real stories of digital transformation. See how we've helped businesses innovate, grow, and succeed in the digital landscape.
              </p>
              <div className="flex items-center justify-center gap-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="text-center">
                  <div className="text-3xl font-bold theme-accent-text">150+</div>
                  <div className="text-sm theme-text opacity-70">Projects Completed</div>
                </div>
                <div className="w-px h-12 theme-text opacity-20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold theme-accent-text">50+</div>
                  <div className="text-sm theme-text opacity-70">Happy Clients</div>
                </div>
                <div className="w-px h-12 theme-text opacity-20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold theme-accent-text">95%</div>
                  <div className="text-sm theme-text opacity-70">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-12 border-b border-gray-200/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      : 'theme-card border border-indigo-500/20 theme-text hover-lift'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-20">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  id={project.id}
                  className={`scroll-fade-in ${visibleSections.includes(project.id) ? 'visible' : ''} grid lg:grid-cols-5 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Project Image/Visual */}
                  <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:col-start-3' : ''}`}>
                    <div className="relative group">
                      <div className="theme-card border border-gray-200/10 rounded-2xl p-8 hover-lift">
                        <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl opacity-20">🚀</div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft"></div>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs bg-indigo-500/10 theme-accent-text rounded-full border border-indigo-500/20">
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-3 py-1 text-xs theme-text opacity-50 rounded-full">
                              +{project.tech.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Project Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 theme-card rounded-xl border border-indigo-500/10">
                            <div className="text-sm theme-text opacity-70 mb-1">Duration</div>
                            <div className="font-semibold theme-accent-text">{project.duration}</div>
                          </div>
                          <div className="text-center p-4 theme-card rounded-xl border border-indigo-500/10">
                            <div className="text-sm theme-text opacity-70 mb-1">Year</div>
                            <div className="font-semibold theme-accent-text">{project.year}</div>
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500/20 rounded-full animate-float"></div>
                      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse-soft"></div>
                      <span className="text-sm uppercase tracking-wide theme-accent-text font-semibold">
                        {project.client}
                      </span>
                    </div>

                    <h2 className="text-4xl font-bold theme-heading mb-6">
                      {project.title}
                    </h2>

                    <p className="text-lg theme-text mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Challenge & Solution */}
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="text-sm font-semibold theme-accent-text mb-2 uppercase tracking-wide">Challenge</h3>
                        <p className="theme-text text-sm leading-relaxed">{project.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold theme-accent-text mb-2 uppercase tracking-wide">Solution</h3>
                        <p className="theme-text text-sm leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-3 mb-8">
                      <h3 className="text-sm font-semibold theme-accent-text uppercase tracking-wide">Key Results</h3>
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full status-indicator"></div>
                          <span className="text-sm theme-text">{result}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                      View Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 border-t border-gray-200/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold theme-heading mb-6">
                Our <span className="text-gradient-animated">Process</span>
              </h2>
              <p className="text-lg theme-text max-w-2xl mx-auto">
                Every successful project follows our proven methodology, ensuring exceptional results and client satisfaction.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Understanding your business, goals, and challenges through comprehensive research and analysis."
                },
                {
                  step: "02",
                  title: "Strategy",
                  description: "Crafting a detailed roadmap with clear objectives, timelines, and success metrics."
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Bringing your vision to life with cutting-edge technology and best practices."
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "Deploying your solution and providing ongoing support for continued success."
                }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto theme-card border border-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg font-bold theme-accent-text">{item.step}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold theme-heading mb-3">{item.title}</h3>
                  <p className="theme-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="theme-card border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold theme-heading mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg theme-text mb-8 max-w-2xl mx-auto">
                  Join our growing list of successful clients. Let's transform your business with innovative digital solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 animate-glow">
                    Start Your Project
                  </button>
                  <button className="px-8 py-4 theme-card border border-indigo-500/20 theme-text rounded-xl font-semibold hover-lift">
                    Schedule Consultation
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

export default Projects;
