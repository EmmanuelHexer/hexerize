import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { client, urlFor } from "../sanity/client";
import { blogPostBySlugQuery, relatedPostsQuery } from "../sanity/queries";
import type { BlogPost as BlogPostType, BlogListItem } from "../sanity/types";
import PortableTextRenderer from "../Components/Blog/PortableTextRenderer";
import BlogCard from "../Components/Blog/BlogCard";
import Breadcrumbs from "../Components/Breadcrumbs";
import ReadingProgress from "../Components/Blog/ReadingProgress";
import CTASection from "../Components/Blog/CTASection";
import Comments from "../Components/Blog/Comments";
import BlogPostSkeleton from "../Components/Blog/BlogPostSkeleton";
import { useSEO } from "../hooks/useSEO";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogListItem[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        // Fetch post data
        const postData = await client.fetch(blogPostBySlugQuery, { slug });

        if (postData) {
          setPost(postData);

          // Fetch related posts in background
          const categoryIds = postData.categories?.map((cat: any) => cat._id) || [];
          if (categoryIds.length > 0) {
            const relatedData = await client.fetch(relatedPostsQuery, {
              postId: postData._id,
              categories: categoryIds,
            });
            setRelatedPosts(relatedData || []);
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    // Reset state when slug changes
    setPost(null);
    setRelatedPosts([]);
    fetchPost();
  }, [slug]);

  // Dynamic SEO with Article structured data
  useSEO({
    title: post?.title || "Blog Post",
    description: post?.excerpt || "",
    ogImage: post?.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined,
    ogUrl: `https://hexerize.com/blog/${slug}`,
    canonical: `https://hexerize.com/blog/${slug}`,
    ogType: "article",
    structuredData: post ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.mainImage ? [
        urlFor(post.mainImage).width(1200).height(1200).url(), // 1x1
        urlFor(post.mainImage).width(1200).height(900).url(),  // 4x3
        urlFor(post.mainImage).width(1200).height(675).url()   // 16x9
      ] : undefined,
      "datePublished": post.publishedAt,
      "dateModified": post._updatedAt || post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author?.name || "Hexerize",
        "url": "https://hexerize.com",
        ...(post.author?.image && {
          "image": {
            "@type": "ImageObject",
            "url": urlFor(post.author.image).width(200).url()
          }
        })
      },
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
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://hexerize.com/blog/${slug}`
      },
      ...(post.estimatedReadingTime && {
        "timeRequired": `PT${post.estimatedReadingTime}M`
      }),
      ...(post.categories && post.categories.length > 0 && {
        "articleSection": post.categories.map(cat => cat.title),
        "keywords": post.categories.map(cat => cat.title).join(", ")
      }),
      "inLanguage": "en-US",
      "isAccessibleForFree": true
    } : undefined
  });

  // Show skeleton while loading
  if (loading || !post) {
    return <BlogPostSkeleton />;
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <ReadingProgress />
      {/* Hero Section with Featured Image */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", url: "https://hexerize.com" },
              { name: "Blog", url: "https://hexerize.com/blog" },
              { name: post.title, url: `https://hexerize.com/blog/${slug}` },
            ]}
          />

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm text-blue-400 text-sm font-medium rounded-lg border border-blue-500/30"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-gray-400 mb-8">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(48).height(48).url()}
                    alt={`Author photo of ${post.author.name}`}
                    className="w-12 h-12 rounded-full border-2 border-blue-500/30"
                    width="48"
                    height="48"
                    loading="eager"
                  />
                )}
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Written by</p>
                  <p className="text-white font-medium text-sm sm:text-base">{post.author.name}</p>
                </div>
              </div>
            )}

            {/* Date & Reading Time Combined */}
            <div className="flex items-center gap-3 flex-wrap text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <i className="ri-calendar-line text-blue-400"></i>
                <span>{formattedDate}</span>
              </div>

              {post.estimatedReadingTime && (
                <>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-blue-400"></i>
                    <span>{post.estimatedReadingTime} min read</span>
                  </div>
                </>
              )}

              {/* Last Updated Indicator for Content Freshness */}
              {post._updatedAt && new Date(post._updatedAt).getTime() > new Date(post.publishedAt).getTime() + (24 * 60 * 60 * 1000) && (
                <>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                    <i className="ri-refresh-line text-blue-400"></i>
                    <span className="text-blue-300 text-xs sm:text-sm font-medium">
                      Updated {new Date(post._updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/20">
              <img
                src={urlFor(post.mainImage).width(1200).url()}
                alt={post.mainImage.alt || `${post.title} - Featured image for ${post.categories?.[0]?.title || 'blog post'} on Hexerize`}
                className="w-full h-auto object-contain rounded-2xl block"
                width="1200"
                height="675"
                loading="eager"
                itemProp="image"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <article className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 pb-8 border-b border-blue-500/20 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Main Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <PortableTextRenderer value={post.body} />
          </div>

          {/* Enhanced Author Bio with E-E-A-T Signals */}
          {post.author && (
            <div className="mt-16 p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-lg" itemScope itemType="https://schema.org/Person">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <i className="ri-user-star-line text-blue-400"></i>
                About the Author
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(120).height(120).url()}
                    alt={`${post.author.name} - Author at Hexerize`}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-blue-500/40 shadow-lg flex-shrink-0"
                    width="120"
                    height="120"
                    loading="lazy"
                    itemProp="image"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                    <div>
                      <p className="text-white font-bold text-xl mb-1" itemProp="name">
                        {post.author.name}
                      </p>
                      <p className="text-blue-400 text-sm font-medium mb-2" itemProp="jobTitle">
                        Senior Web Developer & Digital Strategist
                      </p>
                    </div>
                  </div>

                  {post.author.bio && (
                    <p className="text-gray-300 leading-relaxed mb-4" itemProp="description">
                      {post.author.bio}
                    </p>
                  )}

                  {/* Credentials & Expertise Indicators */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 rounded-lg text-sm text-blue-300">
                      <i className="ri-code-s-slash-line"></i>
                      7+ Years Experience
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 rounded-lg text-sm text-blue-300">
                      <i className="ri-article-line"></i>
                      50+ Articles Published
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 rounded-lg text-sm text-blue-300">
                      <i className="ri-award-line"></i>
                      Web Development Expert
                    </span>
                  </div>

                  {/* Professional Links */}
                  <div className="flex gap-3">
                    <a
                      href="https://hexerize.com/about"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-700/50 hover:bg-blue-600/20 border border-slate-600/50 hover:border-blue-500/40 rounded-lg text-sm text-gray-300 hover:text-blue-300 transition-all"
                      rel="author"
                    >
                      <i className="ri-information-line"></i>
                      Full Profile
                    </a>
                    <a
                      href="https://hexerize.com/blog"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-700/50 hover:bg-blue-600/20 border border-slate-600/50 hover:border-blue-500/40 rounded-lg text-sm text-gray-300 hover:text-blue-300 transition-all"
                    >
                      <i className="ri-article-line"></i>
                      More Articles
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-12 flex items-center gap-4 flex-wrap">
            <span className="text-gray-400 font-medium">Share this post:</span>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleCopyLink}
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-all relative group"
                aria-label="Copy link"
              >
                {copySuccess ? (
                  <i className="ri-check-line text-lg text-green-400"></i>
                ) : (
                  <i className="ri-link text-lg"></i>
                )}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {copySuccess ? "Copied!" : "Copy link"}
                </span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(
                  `https://hexerize.com/blog/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"
                aria-label="Share on Twitter"
              >
                <i className="ri-twitter-x-line text-lg"></i>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `https://hexerize.com/blog/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"
                aria-label="Share on LinkedIn"
              >
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://hexerize.com/blog/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"
                aria-label="Share on Facebook"
              >
                <i className="ri-facebook-fill text-lg"></i>
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <CTASection />

          {/* Comments Section */}
          {slug && <Comments slug={slug} />}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
              <i className="ri-article-line text-blue-400"></i>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog Button */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            <i className="ri-arrow-left-line"></i>
            Back to All Posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
