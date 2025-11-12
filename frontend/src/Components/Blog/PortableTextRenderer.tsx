import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../../sanity/client";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-white mb-5 mt-7">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-white mb-3 mt-5">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-300 mb-4 leading-relaxed text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-slate-800/30 rounded-r-lg">
        <p className="text-gray-300 italic text-lg">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300 text-lg ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300 text-lg ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-blue-300">{children}</em>,
    code: ({ children }) => (
      <code className="bg-slate-800 text-blue-400 px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-400 hover:text-blue-300 underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog image"}
            className="w-full rounded-2xl border border-blue-500/20"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-center text-gray-400 text-sm mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="bg-slate-950 border border-blue-500/20 rounded-xl p-6 overflow-x-auto my-6">
          <code className="text-blue-300 font-mono text-sm leading-relaxed">
            {value.code}
          </code>
        </pre>
      );
    },
  },
};

interface PortableTextRendererProps {
  value: any[];
}

const PortableTextRenderer = ({ value }: PortableTextRendererProps) => {
  return <PortableText value={value} components={components} />;
};

export default PortableTextRenderer;
