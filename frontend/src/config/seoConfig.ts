interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "Hexerize",
    description:
      "More than a web design agency — we're a digital innovation company. We help businesses grow through modern websites, branding, and digital strategies while building our own ecosystem of platforms and apps.",
    canonical: "https://hexerize.com/",
  },

  about: {
    title: "About Hexerize",
    description:
      "Learn about Hexerize's journey as a digital innovation company. Discover our mission to transform businesses through cutting-edge web development, branding, and strategic digital solutions.",
    canonical: "https://hexerize.com/about",
  },

  services: {
    title: "Digital Services",
    description:
      "Comprehensive digital services including modern website development, digital branding, mobile app development, and strategic consulting. Transform your business with Hexerize's expert solutions.",
    keywords:
      "web development services, digital branding, app development, UI/UX design, digital consulting, website design, mobile development",
    canonical: "https://hexerize.com/services",
  },

  projects: {
    title: "Our Work",
    description:
      "Explore Hexerize's portfolio of successful digital innovation projects. From e-commerce platforms to AI-powered applications, see how we've transformed businesses worldwide.",
    keywords:
      "portfolio, digital projects, web development work, app development portfolio, digital innovation examples",
    canonical: "https://hexerize.com/projects",
  },

  blog: {
    title: "Digital Innovation Blog",
    description:
      "Stay updated with the latest in digital innovation, web development trends, and technology insights. Expert articles on modern development practices and digital strategies.",
    keywords:
      "digital innovation blog, web development articles, technology insights, development trends, programming tutorials",
    canonical: "https://hexerize.com/blog",
  },

  contact: {
    title: "Contact",
    description:
      "Ready to transform your business? Contact Hexerize for a free consultation. Get expert digital solutions including web development, branding, and strategic consulting.",
    keywords:
      "contact digital agency, web development consultation, digital innovation contact, get quote",
    canonical: "https://hexerize.com/contact",
  },
};
