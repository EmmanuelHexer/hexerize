interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "Hexerize",
    description: "An ecosystem of our own platforms, applied with product-level rigor, delivers secure, scalable, high-performance websites, apps, and digital experiences for clients, driving real growth.",
    canonical: "https://hexerize.com",
  },

  about: {
    title: "About Us | Hexerize Digital Innovation",
    description:
      "Discover how Hexerize helps businesses thrive online. Learn about our mission to transform companies through cutting-edge web development, branding, and strategic digital solutions.",
    canonical: "https://hexerize.com/about",
  },

  services: {
    title: "Our Digital Services | Hexerize",
    description:
      "Get comprehensive digital solutions: modern website development, digital branding, mobile app development, and strategic consulting. Transform your business with Hexerize today.",
    keywords:
      "web development services, digital branding, app development, UI/UX design, digital consulting, website design, mobile development",
    canonical: "https://hexerize.com/services",
  },

  projects: {
    title: "Our Portfolio | Hexerize Success Stories",
    description:
      "See how we've transformed businesses worldwide. Explore Hexerize's portfolio of successful digital projects - from e-commerce platforms to AI-powered applications.",
    keywords:
      "portfolio, digital projects, web development work, app development portfolio, digital innovation examples",
    canonical: "https://hexerize.com/projects",
  },

  blog: {
    title: "Digital Innovation Insights | Hexerize Blog",
    description:
      "Stay ahead with expert insights on digital innovation, web development trends, and cutting-edge technology. Learn modern development practices and digital strategies.",
    keywords:
      "digital innovation blog, web development articles, technology insights, development trends, programming tutorials",
    canonical: "https://hexerize.com/blog",
  },

  contact: {
    title: "Get In Touch | Hexerize - Free Consultation",
    description:
      "Transform your business today! Contact Hexerize for a free consultation on web development, branding, and strategic digital solutions. Let's build your success together.",
    keywords:
      "contact digital agency, web development consultation, digital innovation contact, get quote",
    canonical: "https://hexerize.com/contact",
  },
};




