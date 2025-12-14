import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { assets } from "../assets/assets";
import Breadcrumbs from "../Components/Breadcrumbs";

const Projects = () => {
  // SEO for Projects page
  useSEO(seoConfig.projects);
  const navigate = useNavigate();

  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Add custom navbar styling for this page
  useEffect(() => {
    const navbar = document.querySelector("header");
    if (navbar) {
      navbar.classList.add("projects-nav");
    }
    return () => {
      if (navbar) {
        navbar.classList.remove("projects-nav");
      }
    };
  }, []);

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
      id: "brediyie-platform",
      title: "Brediyie Digital Platform",
      category: "web",
      client: "Brediyie",
      description: "A comprehensive digital platform for Brediyie that streamlines business operations and enhances customer engagement through modern web technologies.",
      challenge: "Complex workflow management, data integration, user experience optimization",
      solution: "Modern React-based platform with intuitive design and seamless integrations",
      results: ["40% increase in operational efficiency", "Reduced processing time by 60%", "Enhanced user satisfaction"],
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      image: assets.project1,
      year: "2024",
      duration: "3 months",
      status: "completed",
      website: "brediyie.com"
    },
    {
      id: "millys-cuisine",
      title: "Milly's Cuisine Website",
      category: "web",
      client: "Milly's Cuisine",
      description: "An elegant restaurant website for Milly's Cuisine featuring menu displays, online reservations, and a seamless dining experience showcase.",
      challenge: "User interface complexity, performance optimization, mobile responsiveness",
      solution: "Responsive web application with modern UI/UX and optimized performance",
      results: ["Improved user engagement by 45%", "Faster load times", "Mobile-first design"],
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      image: assets.project2,
      year: "2024",
      duration: "4 months",
      status: "completed",
      website: "millyscuisine.com"
    },
    {
      id: "hexer-sms",
      title: "HexerSMS - School Management System",
      category: "platform",
      client: "Hexerize Internal Project",
      description: "A comprehensive school management system designed specifically for junior high and primary schools in Ghana, streamlining administrative tasks and enhancing educational experiences.",
      challenge: "Complex educational workflows, student data management, parent-teacher communication",
      solution: "Full-featured SMS with student records, attendance tracking, gradebook, and parent portal",
      results: ["Expected to serve 50+ schools", "Streamlined admin processes", "Enhanced parent engagement"],
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "Payment Integration"],
      image: "/api/placeholder/600/400",
      year: "2024",
      duration: "6 months",
      status: "coming-soon"
    },
    {
      id: "stedova-app",
      title: "Stedova - Campus Social Platform",
      category: "app",
      client: "Hexerize Internal Project",
      description: "A revolutionary campus platform for Ghanaian students featuring lecturer discovery, social feeds, chat functionality, and an integrated marketplace for buying and selling.",
      challenge: "Campus community building, secure transactions, real-time communication, lecturer verification",
      solution: "Mobile-first platform with social features, verified lecturer profiles, and secure marketplace",
      results: ["Targeting 10,000+ students", "Enhanced campus connections", "Safe trading environment"],
      tech: ["React Native", "Node.js", "Socket.io", "MongoDB", "Payment Gateway"],
      image: "/api/placeholder/600/400",
      year: "2024",
      duration: "8 months",
      status: "coming-soon"
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

      <div className="min-h-screen bg-slate-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 md:pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <Breadcrumbs items={[
                { name: "Home", url: "https://hexerize.com" },
                { name: "Projects", url: "https://hexerize.com/projects/" }
              ]} />

              {/* Mobile-optimized badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="text-xs font-medium text-green-400">Our Work</span>
              </div>

              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed">
                Real stories of digital transformation and innovation.
              </p>

              {/* Mobile: Show only 2 key stats */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-indigo-400 mb-1">4</div>
                  <div className="text-xs sm:text-sm text-gray-300 opacity-70">Featured</div>
                </div>
                <div className="w-px h-10 sm:h-10 md:h-12 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-indigo-400 mb-1">95%</div>
                  <div className="text-xs sm:text-sm text-gray-300 opacity-70">Success</div>
                </div>
                {/* Third stat hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:flex w-px h-10 md:h-12 bg-slate-700"></div>
                <div className="hidden sm:block text-center">
                  <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">2</div>
                  <div className="text-xs sm:text-sm text-gray-300 opacity-70">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-12 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 text-gray-300 hover:transform hover:-translate-y-1 transition-all duration-300'
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
                      <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                        <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                          {project.status === 'completed' && typeof project.image === 'string' && project.image.includes('/api/placeholder') ? (
                            <>
                              <div className="text-6xl opacity-20 text-indigo-400"><i className="ri-rocket-line"></i></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft"></div>
                            </>
                          ) : project.status === 'completed' ? (
                            <img
                              src={project.image}
                              alt={`${project.title} - ${project.description.substring(0, 80)} - Built by Hexerize`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <>
                              <div className="text-6xl opacity-20 text-indigo-400">
                                <i className={project.category === 'platform' ? 'ri-dashboard-line' : project.category === 'app' ? 'ri-smartphone-line' : 'ri-computer-line'}></i>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft"></div>
                              <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs text-blue-400 font-medium">
                                Coming Soon
                              </div>
                            </>
                          )}
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-3 py-1 text-xs text-gray-300 opacity-50 rounded-full">
                              +{project.tech.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Project Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-slate-700/50 rounded-xl border border-indigo-500/10">
                            <div className="text-sm text-gray-300 opacity-70 mb-1">Duration</div>
                            <div className="font-semibold text-indigo-400">{project.duration}</div>
                          </div>
                          <div className="text-center p-4 bg-slate-700/50 rounded-xl border border-indigo-500/10">
                            <div className="text-sm text-gray-300 opacity-70 mb-1">Year</div>
                            <div className="font-semibold text-indigo-400">{project.year}</div>
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500/20 rounded-full"></div>
                      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/10 rounded-full"></div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm uppercase tracking-wide text-indigo-400 font-semibold">
                          {project.client}
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'In Development'}
                      </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-6">
                      {project.title}
                    </h2>

                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Challenge & Solution */}
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2 uppercase tracking-wide">Challenge</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2 uppercase tracking-wide">Solution</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-3 mb-8">
                      <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">Key Results</h3>
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-sm text-gray-300">• {result}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {project.status === 'completed' ? (
                      <a href={`https://${project.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                        Visit Website
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/50 border border-blue-500/20 text-blue-400 rounded-xl font-semibold">
                        <i className="ri-time-line text-base"></i>
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 border-t border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
                    <div className="w-16 h-16 mx-auto bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg font-bold text-indigo-400">{item.step}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join our growing list of successful clients. Let's transform your business with innovative digital solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
                    Start Your Project
                  </button>
                  <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-slate-700/50 border border-indigo-500/20 text-gray-300 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300">
                    Schedule Consultation
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

export default Projects;
