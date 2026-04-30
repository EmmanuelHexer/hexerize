import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { assets } from "../assets/assets";
import { createFAQSchema, createWebPageSchema, createBreadcrumbSchema } from "../utils/structuredData";
import Breadcrumbs from "../Components/Breadcrumbs";

const About = () => {
  const navigate = useNavigate();

  const faqSchema = createFAQSchema([
    {
      question: "Who founded Hexerize?",
      answer: "Hexer and Izen, two developers with experience in full-stack development, system architecture, and product engineering. Founded in 2024."
    },
    {
      question: "What does Hexerize make?",
      answer: "Software products. Right now we're building HexerSMS for schools, Piazam for shopping, and Stedova for campus life."
    },
    {
      question: "Are you taking on client work?",
      answer: "No. We're focused on our own products. Past client projects like Brediyie and Milly's Cuisine are still live, but client work funded the company's transition into product development."
    },
    {
      question: "Where is Hexerize based?",
      answer: "Ghana. That's where we are and who we build for."
    }
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      createWebPageSchema(
        seoConfig.about.title,
        seoConfig.about.description,
        "https://hexerize.com/about/"
      ),
      createBreadcrumbSchema([
        { name: "Home", url: "https://hexerize.com/" },
        { name: "About", url: "https://hexerize.com/about/" }
      ]),
      faqSchema
    ]
  };

  useSEO({
    ...seoConfig.about,
    structuredData
  });

  const values = [
    {
      title: "Build to last",
      description:
        "Software that holds up over years, not weeks. We invest in foundations that compound rather than features that decay.",
    },
    {
      title: "Start from use",
      description:
        "Every product starts from something we've watched not work in Ghana, not from a market we read about online.",
    },
    {
      title: "Ship and iterate",
      description:
        "Working software in users' hands beats perfect software in our heads. We ship early and keep improving.",
    },
    {
      title: "Stay sharp",
      description:
        "Continuous learning is the cost of building software that matters. We pick the right tools for the problem.",
    },
  ];

  const team = [
    {
      name: "Hexer",
      role: "Co-Founder & CEO",
      description:
        "Full-stack developer. Started Hexerize and leads product direction and engineering.",
      expertise: ["Full-Stack Development", "Performance Engineering", "Product Direction"],
    },
    {
      name: "Izen",
      role: "Co-Founder & Full-Stack Developer",
      description:
        "Full-stack developer and technical architect. Specializes in scalable systems, mobile, and AI/ML integration.",
      expertise: ["System Architecture", "Mobile & Web", "AI/ML Integration"],
    },
  ];

  return (
    <div className="min-h-screen text-gray-100">
      {/* Hero Section */}
      <section className="relative py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="sr-only">
            <Breadcrumbs items={[
              { name: "Home", url: "https://hexerize.com/" },
              { name: "About", url: "https://hexerize.com/about/" }
            ]} />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-tight">
            About
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
            Hexerize is a software company from Ghana, founded in 2024 by Hexer and Izen.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Our story
          </h2>
          <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 mb-8">
            <img
              src={assets.ourStory}
              alt="Hexerize, founded by Hexer and Izen in 2024"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Hexerize started in 2024 as late-night coding sessions and ambitious
              ideas between Hexer and Izen. The plan was simple: build software
              products people actually want to use.
            </p>
            <p>
              We work across React, Node.js, Python, AI/ML, cloud, and mobile,
              picking the right stack for the problem rather than the other way
              around.
            </p>
            <p>
              Our focus is our own products: HexerSMS for schools, Piazam for
              shopping, and Stedova for campus life. We took on client work early
              on (Brediyie, Milly's Cuisine) to fund the company while we built
              the things we really wanted to ship, and we're glad we did. But
              the future is products.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Mission</h3>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                Build software products people in Ghana use every day.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Vision</h3>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                A portfolio of software products that Ghana actually relies on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
            What we value
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {values.map((value, index) => (
              <div key={index}>
                <h3 className="text-base font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
            Team
          </h2>
          <div className="divide-y divide-slate-800/80">
            {team.map((member, index) => (
              <div key={index} className="py-8 first:pt-0 last:pb-0">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-300 leading-relaxed mb-4 max-w-2xl">
                  {member.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-300 px-3 py-1 border border-slate-700/70 rounded-full"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
                question: "Who founded Hexerize?",
                answer: "Hexer and Izen, two developers with experience in full-stack development, system architecture, and product engineering. Founded in 2024."
              },
              {
                question: "What does Hexerize make?",
                answer: "Software products. Right now we're building HexerSMS for schools, Piazam for shopping, and Stedova for campus life."
              },
              {
                question: "Are you taking on client work?",
                answer: "No. We're focused on our own products. Past client projects like Brediyie and Milly's Cuisine are still live, but client work funded the company's transition into product development."
              },
              {
                question: "Where is Hexerize based?",
                answer: "Ghana. That's where we are and who we build for."
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

      {/* CTA */}
      <section className="py-12 md:py-16 border-t border-slate-700/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Want to know more?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            See what we're building or get in touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/products/')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              See products
            </button>
            <button
              onClick={() => navigate('/contact/')}
              className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
