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
    description:
      "Hexerize is a software company from Ghana. We build the software Ghana needs.",
    keywords: "hexerize, software company ghana, piazam, hexersms, stedova",
    canonical: "https://hexerize.com/",
    ogTitle: "Hexerize",
    ogDescription:
      "We build the software Ghana needs. A software company from Ghana, founded in 2024.",
  },

  about: {
    title: "About | Hexerize",
    description:
      "Hexerize is a software company from Ghana, founded in 2024 by Hexer and Izen. We build software products for the long term.",
    keywords: "about hexerize, software company ghana, hexer izen founders",
    canonical: "https://hexerize.com/about/",
    ogTitle: "About | Hexerize",
    ogDescription: "Hexerize is a software company from Ghana, founded in 2024 by Hexer and Izen.",
  },

  products: {
    title: "Products | Hexerize",
    description:
      "What Hexerize makes. Piazam for shopping, HexerSMS for schools, and Stedova for campus life. Software from Ghana.",
    keywords: "hexerize products, piazam, hexersms, stedova, online shopping ghana, school management ghana",
    canonical: "https://hexerize.com/products/",
    ogTitle: "Products | Hexerize",
    ogDescription: "Piazam, HexerSMS, Stedova. Software products by Hexerize. Built in Ghana.",
  },

  blog: {
    title: "Blog | Hexerize",
    description:
      "Notes on software, products, and the work of building Hexerize, a software company from Ghana.",
    keywords: "hexerize blog, software, product building, ghana tech",
    canonical: "https://hexerize.com/blog/",
    ogTitle: "Blog | Hexerize",
    ogDescription: "Notes on software, products, and the work of building Hexerize.",
  },

  contact: {
    title: "Contact | Hexerize",
    description:
      "Get in touch with Hexerize, a software company from Ghana. We reply within a day.",
    keywords: "contact hexerize, hexerize email, hexerize ghana",
    canonical: "https://hexerize.com/contact/",
    ogTitle: "Contact | Hexerize",
    ogDescription: "Get in touch with Hexerize. We reply within a day.",
  },
};
