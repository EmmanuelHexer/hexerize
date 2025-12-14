interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "Hexerize",
    description: "Transform your business with innovative digital solutions. Expert web development, mobile apps, and strategic digital experiences that drive growth. Get your free consultation today.",
    keywords: "web development agency, digital innovation, custom web applications, mobile app development, digital transformation, website design, software development, digital strategy, tech consulting",
    canonical: "https://hexerize.com",
    ogTitle: "Hexerize",
    ogDescription: "Award-winning digital agency specializing in modern web development, mobile apps, and strategic digital solutions. Let's build your success together.",
  },

  about: {
    title: "About | Hexerize",
    description:
      "Meet the team behind innovative digital solutions. Learn how Hexerize combines cutting-edge technology, creative design, and strategic thinking to transform businesses globally.",
    keywords: "about hexerize, digital agency team, web development experts, software engineers, tech innovation company, digital transformation specialists",
    canonical: "https://hexerize.com/about/",
    ogTitle: "About | Hexerize",
    ogDescription: "Passionate about building exceptional digital experiences. Discover our story, values, and commitment to transforming businesses through technology.",
  },

  services: {
    title: "Services | Hexerize",
    description:
      "Professional web development, mobile apps, digital branding, and strategic consulting services. Custom solutions tailored to your business needs. Free consultation available.",
    keywords: "web development services, mobile app development, digital branding, custom software, e-commerce development, API development, cloud solutions, digital consulting, UI/UX design",
    canonical: "https://hexerize.com/services/",
    ogTitle: "Services | Hexerize",
    ogDescription: "Comprehensive digital services including modern website development, mobile apps, branding, and strategic consulting. Transform your business today.",
  },

  projects: {
    title: "Projects | Hexerize",
    description:
      "Explore successful digital projects and case studies. See our work in e-commerce platforms, AI-powered applications, custom web solutions, and mobile apps. Real results, real impact.",
    keywords: "portfolio, case studies, web development projects, mobile app examples, digital transformation success stories, client work, project showcase",
    canonical: "https://hexerize.com/projects/",
    ogTitle: "Projects | Hexerize",
    ogDescription: "Browse our portfolio of award-winning digital projects. From startups to enterprises, see how we've transformed businesses through innovative technology.",
  },

  blog: {
    title: "Blog | Hexerize",
    description:
      "Expert insights on digital innovation, web development trends, and cutting-edge technology. Learn modern development practices and strategies.",
    keywords: "web development blog, digital innovation, software engineering, modern web development, React tutorials, TypeScript guides, tech insights, development best practices, SEO optimization, digital transformation",
    canonical: "https://hexerize.com/blog/",
    ogTitle: "Blog | Hexerize",
    ogDescription: "Stay ahead with expert web development tutorials, digital innovation strategies, and modern tech insights. Learn best practices for building successful digital products.",
  },

  contact: {
    title: "Contact | Hexerize",
    description:
      "Ready to transform your business? Contact Hexerize for a free consultation. Expert web development, mobile apps, and digital strategy. Available worldwide. Let's start your project today.",
    keywords: "contact hexerize, free consultation, web development quote, project inquiry, digital agency contact, get started, request quote, hire developers",
    canonical: "https://hexerize.com/contact/",
    ogTitle: "Contact | Hexerize",
    ogDescription: "Get in touch for a free consultation. We're ready to discuss your web development, mobile app, or digital transformation project. Let's build something amazing together.",
  },
};




