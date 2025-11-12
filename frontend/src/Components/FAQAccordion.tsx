import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

const FAQAccordion = ({ items, title, subtitle }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 border-t border-blue-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {title.split(" ").map((word, i, arr) => {
                  // Make last 1-2 words gradient
                  const isGradient = i >= arr.length - 2;
                  return isGradient ? (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  );
                })}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/40"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer group"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white pr-4 group-hover:text-blue-400 transition-colors">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "rotate-180 bg-blue-600/30"
                        : "group-hover:bg-blue-600/30"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-blue-500/20">
                    <p className="mt-4 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand All Button (Optional) */}
        {items.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setOpenIndex(openIndex === null ? 0 : null)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              {openIndex === null ? "Expand All" : "Collapse All"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
