import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Hero Section Skeleton */}
      <section className="relative pt-16 sm:pt-24 md:pt-32 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs skeleton */}
          <div className="mb-6">
            <Skeleton
              width={300}
              height={16}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>

          {/* Categories skeleton */}
          <div className="flex gap-2 mb-6">
            <Skeleton
              width={100}
              height={28}
              baseColor="#1e293b"
              highlightColor="#334155"
              borderRadius={8}
            />
            <Skeleton
              width={120}
              height={28}
              baseColor="#1e293b"
              highlightColor="#334155"
              borderRadius={8}
            />
          </div>

          {/* Title skeleton */}
          <div className="mb-6">
            <Skeleton
              count={2}
              height={48}
              baseColor="#1e293b"
              highlightColor="#334155"
              className="text-4xl sm:text-5xl md:text-6xl"
            />
          </div>

          {/* Meta Information skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
            {/* Author skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton
                circle
                width={48}
                height={48}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
              <div className="flex flex-col gap-1">
                <Skeleton
                  width={80}
                  height={12}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />
                <Skeleton
                  width={120}
                  height={16}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />
              </div>
            </div>

            {/* Date & Reading Time skeleton */}
            <div className="flex items-center gap-3 flex-wrap">
              <Skeleton
                width={150}
                height={20}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
              <Skeleton
                width={100}
                height={20}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
            </div>
          </div>

          {/* Featured Image skeleton */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 aspect-video">
            <Skeleton
              height="100%"
              baseColor="#1e293b"
              highlightColor="#334155"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Article Content Skeleton */}
      <article className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Excerpt skeleton */}
          <div className="mb-8 pb-8 border-b border-blue-500/20">
            <Skeleton
              count={3}
              height={24}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>

          {/* Main Content skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <Skeleton
                  count={4}
                  height={20}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                  className="mb-2"
                />
                {index % 3 === 0 && (
                  <div className="my-6">
                    <Skeleton
                      height={200}
                      baseColor="#1e293b"
                      highlightColor="#334155"
                      borderRadius={12}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Author Bio Skeleton */}
          <div className="mt-16 p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-blue-500/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton
                width={200}
                height={28}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton
                circle
                width={120}
                height={120}
                baseColor="#1e293b"
                highlightColor="#334155"
              />
              <div className="flex-1 space-y-3">
                <Skeleton
                  width={200}
                  height={24}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />
                <Skeleton
                  count={3}
                  height={16}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />
                <div className="flex gap-3">
                  <Skeleton
                    width={100}
                    height={32}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                    borderRadius={8}
                  />
                  <Skeleton
                    width={100}
                    height={32}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                    borderRadius={8}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons Skeleton */}
          <div className="mt-12 flex items-center gap-4">
            <Skeleton
              width={120}
              height={20}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  circle
                  width={40}
                  height={40}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Skeleton */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Skeleton
              width={200}
              height={32}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden"
              >
                <Skeleton
                  height={200}
                  baseColor="#1e293b"
                  highlightColor="#334155"
                />
                <div className="p-6 space-y-3">
                  <Skeleton
                    count={2}
                    height={20}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                  />
                  <Skeleton
                    count={2}
                    height={16}
                    baseColor="#1e293b"
                    highlightColor="#334155"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostSkeleton;
