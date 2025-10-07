import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import Breadcrumbs from "../Components/Breadcrumbs";

const Blog = () => {
  // SEO for Blog page
  useSEO(seoConfig.blog);
  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-100">
        {/* Coming Soon Hero Section */}
        <section className="relative pt-16 sm:pt-24 md:pt-32 pb-20 overflow-hidden min-h-screen flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Breadcrumbs items={[
              { name: "Home", url: "https://hexerize.com" },
              { name: "Blog", url: "https://hexerize.com/blog" }
            ]} />

            {/* Animated Background Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 sm:w-80 sm:h-80 bg-blue-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

            <div className="relative z-10">
              {/* Status Badge */}
              <div className="inline-block py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm mb-6 sm:mb-8">
                <span className="flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span className="text-blue-400 font-medium">Coming Soon</span>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Blog</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                Insights, tutorials, and industry knowledge to help you succeed in the digital world.
                <br className="hidden sm:block" />
                <span className="text-blue-400 font-medium">Stay tuned for amazing content!</span>
              </p>

              {/* Newsletter Signup */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto mb-8 sm:mb-12">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Get Notified When We Launch
                </h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base">
                  Be the first to know when our blog goes live with exclusive content and insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
                    Notify Me
                  </button>
                </div>
              </div>

              {/* What to Expect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                <div className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-lightbulb-line text-2xl sm:text-3xl text-blue-400"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Industry Insights</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Latest trends and innovations in digital technology</p>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-code-line text-2xl sm:text-3xl text-blue-400"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Technical Tutorials</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Step-by-step guides and development tips</p>
                </div>

                <div className="text-center group sm:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-rocket-line text-2xl sm:text-3xl text-blue-400"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Success Stories</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Real case studies and project showcases</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
