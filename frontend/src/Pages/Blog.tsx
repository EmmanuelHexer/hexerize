import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import Breadcrumbs from "../Components/Breadcrumbs";
import { useState, useEffect } from "react";
import { client } from "../sanity/client";
import { blogPostsQuery, categoriesQuery } from "../sanity/queries";
import type { BlogListItem, Category } from "../sanity/types";
import BlogCard from "../Components/Blog/BlogCard";
import CategoryFilter from "../Components/Blog/CategoryFilter";
import SearchBar from "../Components/Blog/SearchBar";

const Blog = () => {
  const [posts, setPosts] = useState<BlogListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(9); // Show 9 posts initially
  const POSTS_PER_PAGE = 9;

  // Fetch blog posts and categories from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          client.fetch(blogPostsQuery),
          client.fetch(categoriesQuery),
        ]);
        setPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // SEO with ItemList structured data for blog listing
  useSEO({
    ...seoConfig.blog,
    structuredData: posts.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Hexerize Blog",
      "description": seoConfig.blog.description,
      "url": "https://hexerize.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Hexerize",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hexerize.com/hexerize-logo-512.png",
          "width": 512,
          "height": 512
        }
      },
      "blogPost": posts.slice(0, 10).map((post) => ({
        "@type": "BlogPosting",
        "@id": `https://hexerize.com/blog/${post.slug.current}`,
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.publishedAt,
        "author": {
          "@type": "Person",
          "name": post.author?.name || "Hexerize"
        },
        "url": `https://hexerize.com/blog/${post.slug.current}`
      }))
    } : undefined
  });

  // Filter posts based on category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      !selectedCategory ||
      post.categories?.some((cat) => cat._id === selectedCategory);
    const matchesSearch =
      !searchQuery ||
      (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Pagination for regular posts
  const displayedPosts = regularPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < regularPosts.length;

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
  };

  // Reset visible posts when filters change
  useEffect(() => {
    setVisiblePosts(POSTS_PER_PAGE);
  }, [selectedCategory, searchQuery]);

  // Show coming soon page if no posts (only after loading)
  if (!loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <section className="relative pt-16 sm:pt-24 md:pt-32 pb-20 overflow-hidden min-h-screen flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Breadcrumbs
              items={[
                { name: "Home", url: "https://hexerize.com" },
                { name: "Blog", url: "https://hexerize.com/blog" },
              ]}
            />

            <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute bottom-20 right-10 w-40 h-40 sm:w-80 sm:h-80 bg-blue-600/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>

            <div className="relative z-10">
              <div className="inline-block py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm mb-6 sm:mb-8">
                <span className="flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span className="text-blue-400 font-medium">Coming Soon</span>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                Insights, tutorials, and industry knowledge to help you succeed
                in the digital world.
                <br className="hidden sm:block" />
                <span className="text-blue-400 font-medium">
                  Stay tuned for amazing content!
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                <div className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-lightbulb-line text-2xl sm:text-3xl text-blue-400"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Industry Insights
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Latest trends and innovations in digital technology
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-code-line text-2xl sm:text-3xl text-blue-400"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Technical Tutorials
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Step-by-step guides and development tips
                  </p>
                </div>

                <div className="text-center group sm:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className="ri-rocket-line text-2xl sm:text-3xl text-blue-400"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Success Stories
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Real case studies and project showcases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Breadcrumbs
            items={[
              { name: "Home", url: "https://hexerize.com" },
              { name: "Blog", url: "https://hexerize.com/blog" },
            ]}
          />

          <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 sm:w-80 sm:h-80 bg-blue-600/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Insights, tutorials, and industry knowledge to help you succeed in
              the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Only show content when we have posts */}
          {posts.length > 0 && (
            <>
              {/* Search Bar */}
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {/* Category Filter */}
              {categories.length > 0 && (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              )}

              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <i className="ri-star-fill text-blue-400"></i>
                    Featured Posts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post._id} post={post} featured />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  {featuredPosts.length > 0 && (
                    <h2 className="text-2xl font-bold text-white mb-6">
                      All Articles
                    </h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedPosts.map((post) => (
                      <BlogCard key={post._id} post={post} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMorePosts && (
                    <div className="text-center mt-12">
                      <button
                        onClick={handleLoadMore}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30"
                      >
                        <i className="ri-arrow-down-line text-lg"></i>
                        Load More Posts
                        <span className="text-sm opacity-80">
                          ({regularPosts.length - visiblePosts} remaining)
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* No results message */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <i className="ri-search-line text-6xl text-gray-600 mb-4"></i>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
