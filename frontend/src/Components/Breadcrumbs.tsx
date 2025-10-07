import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-600" aria-hidden="true">
                /
              </span>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-300 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <button
                onClick={() => navigate(item.url.replace("https://hexerize.com", ""))}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
