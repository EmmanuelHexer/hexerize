import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { createFAQSchema, createContactPageSchema } from "../utils/structuredData";
import Breadcrumbs from "../Components/Breadcrumbs";

const Contact = () => {
  // Create FAQ schema matching visible content on this page
  const faqSchema = createFAQSchema([
    {
      question: "How long does a typical project take?",
      answer: "Most projects range from 4-12 weeks depending on complexity."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we provide maintenance and support packages for all our projects."
    },
    {
      question: "Can you work with existing teams?",
      answer: "Absolutely! We often collaborate with in-house teams as an extension."
    }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createContactPageSchema(),
      faqSchema
    ]
  };

  // SEO for Contact page with FAQ structured data
  useSEO({
    ...seoConfig.contact,
    structuredData
  });

  return (
    <div className="min-h-screen text-gray-100">
      {/* Hero Section */}
      <section className="relative py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumbs hidden visually but kept in DOM for SEO/screen readers */}
          <div className="sr-only">
            <Breadcrumbs items={[
              { name: "Home", url: "https://hexerize.com/" },
              { name: "Contact", url: "https://hexerize.com/contact/" }
            ]} />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
            Get in touch
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
            Tell us what you're building. We reply within a day.
          </p>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <dl className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <dt className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</dt>
              <dd>
                <a
                  href="mailto:Emmanuelhexer@gmail.com"
                  className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-colors break-all"
                >
                  Emmanuelhexer@gmail.com
                </a>
                <p className="text-sm text-gray-400 mt-2">Drop a line anytime.</p>
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</dt>
              <dd>
                <a
                  href="tel:+233553130196"
                  className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-colors"
                >
                  +233 553 130 196
                </a>
                <p className="text-sm text-gray-400 mt-2">Mon-Fri, 8am to 5pm.</p>
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-widest text-gray-500 mb-2">Location</dt>
              <dd>
                <p className="text-xl md:text-2xl font-bold text-white">Ghana</p>
                <p className="text-sm text-gray-400 mt-2">Serving clients nationwide.</p>
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-widest text-gray-500 mb-2">Response time</dt>
              <dd>
                <p className="text-xl md:text-2xl font-bold text-white">&lt; 24 hours</p>
                <p className="text-sm text-gray-400 mt-2">Usually faster.</p>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
            Frequently asked
          </h2>
          <div className="space-y-3">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Most projects range from 4-12 weeks depending on complexity."
              },
              {
                question: "Do you offer ongoing support?",
                answer: "Yes, we provide maintenance and support packages for all our projects."
              },
              {
                question: "Can you work with existing teams?",
                answer: "Absolutely. We often collaborate with in-house teams as an extension."
              }
            ].map((faq, index) => (
              <details key={index} className="border border-slate-700/60 rounded-xl px-5 py-4 group open:bg-slate-800/30 transition-colors">
                <summary className="flex justify-between items-center cursor-pointer text-white font-medium list-none gap-4">
                  <span>{faq.question}</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
