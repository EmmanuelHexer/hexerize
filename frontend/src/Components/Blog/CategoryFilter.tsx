import { Category } from "../../sanity/types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            selectedCategory === null
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-slate-800/50 text-gray-300 border border-blue-500/20 hover:border-blue-500/50"
          }`}
        >
          All Posts
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelectCategory(category._id)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              selectedCategory === category._id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-800/50 text-gray-300 border border-blue-500/20 hover:border-blue-500/50"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
