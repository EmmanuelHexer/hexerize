import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

const NotFound = () => {
  const navigate = useNavigate();

  // SEO for 404 page
  useSEO({
    title: "404 | Hexerize",
    description: "The page you're looking for doesn't exist. Discover Hexerize's digital innovation services including web development, branding, and app development.",
    canonical: "https://hexerize.com/404",
  });

  useEffect(() => {
    // Set proper HTTP status code for SEO
    if (typeof window !== 'undefined') {
      // Track 404 for analytics without console logging
    }
  }, []);

  const popularPages = [
    { name: "Home", path: "/", description: "Discover our digital innovation company" },
    { name: "Services", path: "/services/", description: "Web development, branding & app development" },
    { name: "Projects", path: "/projects/", description: "View our portfolio of successful projects" },
    { name: "About", path: "/about/", description: "Learn about our team and mission" },
    { name: "Contact", path: "/contact/", description: "Get in touch for your next project" },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--card-background)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-[color:var(--accent-color)]/20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[color:var(--accent-color)]/10 rounded-full animate-pulse border border-[color:var(--accent-color)]/30 flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-[color:var(--accent-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[color:var(--heading-color)] mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-[color:var(--body-color)]/70 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void.
            But don't worry – let's get you back on track to discover our innovative solutions.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[color:var(--accent-color)] hover:bg-[color:var(--accent-color)]/90 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[color:var(--accent-color)]/30 hover:bg-[color:var(--accent-color)]/10 text-[color:var(--accent-color)] rounded-xl font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Popular Pages */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-[color:var(--heading-color)] mb-6">
            Or explore these popular pages:
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularPages.map((page, index) => (
              <button
                key={index}
                onClick={() => navigate(page.path)}
                className="group p-4 bg-[color:var(--card-background)]/50 border border-[color:var(--accent-color)]/20 rounded-xl hover:bg-[color:var(--accent-color)]/5 hover:border-[color:var(--accent-color)]/40 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[color:var(--accent-color)] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  <h4 className="font-semibold text-[color:var(--heading-color)] group-hover:text-[color:var(--accent-color)] transition-colors duration-300">
                    {page.name}
                  </h4>
                </div>
                <p className="text-sm text-[color:var(--body-color)]/60 group-hover:text-[color:var(--body-color)]/80 transition-colors duration-300">
                  {page.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 pt-8 border-t border-[color:var(--accent-color)]/20">
          <p className="text-[color:var(--body-color)]/60 mb-4">
            Looking for something specific?
          </p>
          <button
            onClick={() => navigate('/contact/')}
            className="inline-flex items-center gap-2 text-[color:var(--accent-color)] hover:text-[color:var(--accent-color)]/80 font-medium transition-colors duration-300"
          >
            Contact us for help
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;