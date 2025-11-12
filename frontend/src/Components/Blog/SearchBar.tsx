interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-6 py-4 pl-14 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
        />
        <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-blue-400"></i>
      </div>
    </div>
  );
};

export default SearchBar;
