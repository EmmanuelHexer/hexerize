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
    title: "Hexerize — A software company",
    description: "Hexerize is a software company from Ghana. We make software products that solve real problems.",
    keywords: "hexerize, software company ghana, software products, hexersms, piazam, stedova",
    canonical: "https://hexerize.com/",
    ogTitle: "Hexerize — A software company",
    ogDescription: "Hexerize is a software company from Ghana. We make software products that solve real problems.",
  },

  about: {
    title: "About | Hexerize",
    description:
      "Hexerize is a software company from Ghana, founded in 2024 by Hexer and Izen. We make software products.",
    keywords: "about hexerize, software company ghana, hexer izen founders, software studio ghana",
    canonical: "https://hexerize.com/about/",
    ogTitle: "About | Hexerize",
    ogDescription: "Hexerize is a software company from Ghana, founded in 2024. We make software products.",
  },

  products: {
    title: "Products | Hexerize",
    description:
      "What Hexerize makes — HexerSMS for schools, Piazam for shopping, and Stedova for campus life. Software products built in Ghana.",
    keywords: "hexerize products, hexersms, piazam, stedova, software products ghana, school management ghana, online shopping ghana",
    canonical: "https://hexerize.com/products/",
    ogTitle: "Products | Hexerize",
    ogDescription: "Software products by Hexerize — HexerSMS, Piazam, Stedova. Built in Ghana.",
  },

  blog: {
    title: "Blog | Hexerize",
    description:
      "Notes on software, products, and the work of building Hexerize.",
    keywords: "hexerize blog, software development, product building, web development",
    canonical: "https://hexerize.com/blog/",
    ogTitle: "Blog | Hexerize",
    ogDescription: "Notes on software, products, and the work of building Hexerize.",
  },

  contact: {
    title: "Contact | Hexerize",
    description:
      "Get in touch with Hexerize. We reply within a day.",
    keywords: "contact hexerize, hexerize email, hexerize ghana",
    canonical: "https://hexerize.com/contact/",
    ogTitle: "Contact | Hexerize",
    ogDescription: "Get in touch with Hexerize. We reply within a day.",
  },
};
