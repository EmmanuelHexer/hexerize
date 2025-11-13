import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface BlogCardSkeletonProps {
  featured?: boolean;
}

const BlogCardSkeleton = ({ featured = false }: BlogCardSkeletonProps) => {
  return (
    <div
      className={`block bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden ${
        featured ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Image skeleton */}
      <div className="relative overflow-hidden aspect-video">
        <Skeleton
          height="100%"
          baseColor="#1e293b"
          highlightColor="#334155"
          className="w-full h-full"
        />
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="mb-3">
          <Skeleton
            count={2}
            baseColor="#1e293b"
            highlightColor="#334155"
            className={featured ? "text-2xl md:text-3xl" : "text-xl"}
          />
        </div>

        {/* Excerpt skeleton */}
        <div className="mb-4">
          <Skeleton
            count={3}
            baseColor="#1e293b"
            highlightColor="#334155"
          />
        </div>

        {/* Meta skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton
              circle
              width={32}
              height={32}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
            <Skeleton
              width={100}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton
              width={80}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
            <Skeleton
              width={60}
              baseColor="#1e293b"
              highlightColor="#334155"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
