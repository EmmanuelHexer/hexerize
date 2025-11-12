import { Link } from "react-router-dom";
import { urlFor } from "../../sanity/client";
import { BlogListItem } from "../../sanity/types";

interface BlogCardProps {
  post: BlogListItem;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/blog/${post.slug.current}`}
      className={`group block bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 ${
        featured ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).width(800).height(450).url()}
            alt={post.mainImage.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1.5">
            <i className="ri-star-fill"></i>
            Featured
          </div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 right-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category._id}
                className="px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-blue-400 text-xs font-medium rounded-lg border border-blue-500/30"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3
          className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-3">
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <img
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-500/30"
                  />
                )}
                <span className="font-medium text-gray-300">
                  {post.author.name}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Date */}
            <span className="flex items-center gap-1.5">
              <i className="ri-calendar-line text-blue-400"></i>
              {formattedDate}
            </span>

            {/* Reading time */}
            {post.estimatedReadingTime && (
              <span className="flex items-center gap-1.5">
                <i className="ri-time-line text-blue-400"></i>
                {post.estimatedReadingTime} min
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
