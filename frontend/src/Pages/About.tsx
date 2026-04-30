import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { seoConfig } from "../config/seoConfig";
import { assets } from "../assets/assets";
import { createFAQSchema, createWebPageSchema, createBreadcrumbSchema } from "../utils/structuredData";
import Breadcrumbs from "../Components/Breadcrumbs";

const About = () => {
  const navigate = useNavigate();

  // Create FAQ schema for About page
  const faqSchema = createFAQSchema([
    {
      question: "Who founded Hexerize?",
      answer: "Hexerize was founded in 2024 by two passionate developers, Hexer and Izen, who bring extensive expertise in full-stack development, system architecture, and digital innovation."
    },
    {
      question: "What makes Hexerize different from other agencies?",
      answer: "We're not just a client services agency - we build our own digital products and platforms like HexerSMS and Stedova. This dual approach keeps us innovative and ensures we're always working with cutting-edge technologies."
    },
    {
      question: "What technologies does your team master?",
      answer: "Our team masters 25+ technologies including React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, React Native, and AI/ML frameworks."
    },
    {
      question: "How many projects has Hexerize completed?",
      answer: "We've successfully completed 50+ projects ranging from custom web applications to mobile apps and enterprise platforms."
    },
    {
      question: "Do you work on your own products or only client work?",
      answer: "We do both! We build innovative client projects while developing our own ecosystem of platforms including HexerSMS for schools and Stedova for campus communities."
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

  // SEO for About page with FAQ schema
  useSEO({
    ...seoConfig.about,
    structuredData
  });

  const values = [
    {
      title: "Innovation First",
      description:
        "We're always exploring emerging technologies and methodologies to deliver cutting-edge solutions that give our clients a competitive advantage.",
      icon: "ri-rocket-line",
    },
    {
      title: "Quality Excellence",
      description:
        "Every project receives our full attention to detail, ensuring high-quality deliverables that exceed expectations and drive real results.",
      icon: "ri-star-line",
    },
    {
      title: "Client Partnership",
      description:
        "We work as an extension of your team, building long-term relationships based on trust, transparency, and mutual success.",
      icon: "ri-team-line",
    },
    {
      title: "Continuous Growth",
      description:
        "We're committed to continuous learning and improvement, staying ahead of industry trends to benefit our clients and ecosystem.",
      icon: "ri-line-chart-line",
    },
  ];

  const team = [
    {
      name: "Hexer",
      role: "Co-Founder & CEO",
      description:
        "Full-stack developer and visionary who conceptualized the Hexerize ecosystem. Leads project delivery and product direction.",
      expertise: ["Full-Stack Development", "Performance Engineering", "Team Leadership"],
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
          {/* Breadcrumbs hidden visually but kept in DOM for SEO/screen readers */}
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
            Founded in 2024 by two developers building modern websites, apps, and our own products.
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
              alt="Hexerize — founded by Hexer and Izen in 2024"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Founded in 2024 by Hexer and Izen, Hexerize started as late-night
              coding sessions and ambitious ideas. It's grown into a small studio
              that ships modern websites, apps, and our own products.
            </p>
            <p>
              We work across React, Node.js, Python, AI/ML, cloud, and mobile —
              picking the right stack for the problem rather than the other way
              around.
            </p>
            <p>
              Alongside client work we build our own ecosystem: HexerSMS for
              schools and Stedova for campus communities. Building products keeps
              us sharp on the same technologies we ship to clients.
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
                Empower businesses with digital solutions that drive growth and
                create lasting value.
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Vision</h3>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                Bridge cutting-edge technology and meaningful business outcomes —
                building an ecosystem where innovation thrives.
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
                answer: "Hexer and Izen — two developers with experience in full-stack development, system architecture, and digital innovation. Founded in 2024."
              },
              {
                question: "What makes Hexerize different?",
                answer: "We don't just do client services — we build our own products like HexerSMS and Stedova. The dual approach keeps us working with cutting-edge tech every day."
              },
              {
                question: "Do you work on your own products or only client work?",
                answer: "Both. We ship client projects while building our own ecosystem of platforms including HexerSMS for schools and Stedova for campus communities."
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
            Have a project in mind?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Tell us what you're building. We'll get back within a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/contact/')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
            >
              Start a project
            </button>
            <button
              onClick={() => navigate('/services/')}
              className="px-6 py-3 border border-slate-600 hover:border-slate-500 text-gray-200 rounded-lg font-medium transition-colors"
            >
              See our services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
