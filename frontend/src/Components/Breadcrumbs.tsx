import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    const path = url.replace("https://hexerize.com", "") || "/";
    navigate(path);
  };

  // Add BreadcrumbList structured data
  useEffect(() => {
    const scriptId = "breadcrumb-structured-data";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => {
        const isLast = index === items.length - 1;
        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          // Last item should not have 'item' property per Google guidelines
          ...(isLast ? {} : { "item": item.url })
        };
      })
    };

    if (script) {
      script.textContent = JSON.stringify(breadcrumbSchema);
    } else {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const displayName = isLast && item.name.length > 30
            ? item.name.substring(0, 30) + '...'
            : item.name;

          return (
            <li key={index} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {index > 0 && (
                <span className="text-gray-600" aria-hidden="true">
                  {">"}
                </span>
              )}
              {isLast ? (
                <span className="text-gray-300 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page" itemProp="name" title={item.name}>
                  {displayName}
                </span>
              ) : (
                <button
                  onClick={() => handleNavigate(item.url)}
                  className="hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </button>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
