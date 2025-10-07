interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: "Hexerize",
    description: "Innovative digital solutions that transform businesses. We create modern websites, powerful apps, and strategic digital experiences that drive real growth and success.",
    canonical: "https://hexerize.com",
  },

  about: {
    title: "About Us | Hexerize Digital Innovation",
    description:
      "Discover how Hexerize helps businesses thrive online through cutting-edge web development, branding, and strategic digital solutions.",
    canonical: "https://hexerize.com/about",
  },

  services: {
    title: "Our Digital Services | Hexerize",
    description:
      "Modern website development, digital branding, mobile app development, and strategic consulting. Transform your business with Hexerize.",
    canonical: "https://hexerize.com/services",
  },

  projects: {
    title: "Our Portfolio | Hexerize Success Stories",
    description:
      "Explore our portfolio of successful digital projects - from e-commerce platforms to AI-powered applications and custom web solutions.",
    canonical: "https://hexerize.com/projects",
  },

  blog: {
    title: "Digital Innovation Insights | Hexerize Blog",
    description:
      "Expert insights on digital innovation, web development trends, and cutting-edge technology. Learn modern development practices and strategies.",
    canonical: "https://hexerize.com/blog",
  },

  contact: {
    title: "Get In Touch | Hexerize - Free Consultation",
    description:
      "Contact Hexerize for a free consultation on web development, branding, and strategic digital solutions. Let's build your success together.",
    canonical: "https://hexerize.com/contact",
  },
};




