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

      <div className="min-h-screen text-gray-100">
        {/* Hero Section */}
        <section className="relative py-10 md:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            {/* Breadcrumbs hidden visually but kept in DOM for SEO/screen readers */}
            <div className="sr-only">
              <Breadcrumbs items={[
                { name: "Home", url: "https://hexerize.com/" },
                { name: "Projects", url: "https://hexerize.com/projects/" }
              ]} />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
              Projects
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
              Recent work and what we're building next.
            </p>
          </div>
        </section>

        {/* Filter Navigation */}
        <section className="py-6 border-t border-slate-700/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category.id
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-700/70 text-gray-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {category.label}
                  <span className="ml-1.5 opacity-60">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-slate-800/80">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  id={project.id}
                  className={`scroll-fade-in py-12 md:py-16 first:pt-0 last:pb-0 ${visibleSections.includes(project.id) ? 'visible' : ''}`}
                >
                  {/* Project Image */}
                  <div className="aspect-video rounded-xl overflow-hidden border border-slate-800 mb-6 bg-slate-900/40 flex items-center justify-center">
                    {project.status === 'completed' && typeof project.image === 'string' && !project.image.includes('/api/placeholder') ? (
                      <img
                        src={project.image}
                        alt={`${project.title} - Built by Hexerize`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-5xl opacity-30 text-blue-400">
                        <i className={project.category === 'platform' ? 'ri-dashboard-line' : project.category === 'app' ? 'ri-smartphone-line' : 'ri-computer-line'}></i>
                      </div>
                    )}
                  </div>

                  {/* Meta line */}
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500 mb-3">
                    <span>{project.client}</span>
                    <span className="opacity-50">·</span>
                    <span>{project.year}</span>
                    {project.status !== 'completed' && (
                      <>
                        <span className="opacity-50">·</span>
                        <span className="text-blue-400">In Development</span>
                      </>
                    )}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <ul className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <li key={idx} className="text-xs text-gray-300 px-3 py-1 border border-slate-700/70 rounded-full">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {project.status === 'completed' && project.website ? (
                    <a
                      href={`https://${project.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Visit {project.website}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : null}
                </article>
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
                onClick={() => navigate('/services/')}
                className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
              >
                See our services
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
