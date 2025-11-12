import Giscus from "@giscus/react";

interface CommentsProps {
  slug: string;
}

const Comments = ({ slug }: CommentsProps) => {
  return (
    <div className="mt-16 pt-12 border-t border-blue-500/20">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <i className="ri-chat-3-line text-blue-400"></i>
        Comments & Discussion
      </h3>

      <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
        <Giscus
          id="comments"
          repo="YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"
          repoId="YOUR_REPO_ID"
          category="Blog Comments"
          categoryId="YOUR_CATEGORY_ID"
          mapping="pathname"
          term={slug}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="transparent_dark"
          lang="en"
          loading="lazy"
        />
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Sign in with GitHub to join the discussion
      </p>
    </div>
  );
};

export default Comments;
