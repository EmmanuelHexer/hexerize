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
import { useSEO } from "../hooks/useSEO";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogListItem[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
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
      }
    };

    // Reset state when slug changes
    setPost(null);
    setRelatedPosts([]);
    fetchPost();
  }, [slug]);

  // Dynamic SEO
  useSEO({
    title: post?.title || "Blog Post",
    description: post?.excerpt || "",
    ogImage: post?.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined,
    ogUrl: `https://hexerize.com/blog/${slug}`,
    canonical: `https://hexerize.com/blog/${slug}`,
  });

  // If no post yet, don't render anything (will show once loaded)
  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900">
        {/* Empty but with background - prevents layout shift */}
      </div>
    );
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
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-12">
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
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(48).height(48).url()}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full border-2 border-blue-500/30"
                  />
                )}
                <div>
                  <p className="text-sm text-gray-500">Written by</p>
                  <p className="text-white font-medium">{post.author.name}</p>
                </div>
              </div>
            )}

            {/* Date */}
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <p className="flex items-center gap-2">
                <i className="ri-calendar-line text-blue-400"></i>
                {formattedDate}
              </p>
            </div>

            {/* Reading Time */}
            {post.estimatedReadingTime && (
              <div>
                <p className="text-sm text-gray-500">Reading time</p>
                <p className="flex items-center gap-2">
                  <i className="ri-time-line text-blue-400"></i>
                  {post.estimatedReadingTime} min
                </p>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 mb-12">
              <img
                src={urlFor(post.mainImage).width(1200).height(500).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full h-auto object-cover max-h-[500px]"
                loading="eager"
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

          {/* Author Bio */}
          {post.author?.bio && (
            <div className="mt-16 p-8 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <i className="ri-user-line text-blue-400"></i>
                About the Author
              </h3>
              <div className="flex items-start gap-4">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full border-2 border-blue-500/30"
                  />
                )}
                <div>
                  <p className="text-white font-semibold text-lg mb-2">
                    {post.author.name}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {post.author.bio}
                  </p>
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
