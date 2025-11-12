import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="my-16 p-8 sm:p-12 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent backdrop-blur-sm border border-blue-500/30 rounded-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 text-center">
        <div className="inline-block py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm mb-6">
          <span className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-blue-400 font-medium">Ready to Start?</span>
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Need Help With Your Project?
        </h3>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's turn your vision into reality. Get in touch with our team for a free consultation.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"
          >
            <i className="ri-mail-line text-lg"></i>
            Get In Touch
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 text-white rounded-xl font-semibold hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
          >
            <i className="ri-service-line text-lg"></i>
            View Our Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
