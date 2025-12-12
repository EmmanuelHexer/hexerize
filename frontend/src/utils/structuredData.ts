// Structured data utilities for SEO

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hexerize.com/#organization",
  "name": "Hexerize",
  "alternateName": "Hexerize Digital Innovation",
  "url": "https://hexerize.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://hexerize.com/hexerize-logo-512.png",
    "width": 512,
    "height": 512
  },
  "description": "Innovative digital solutions that transform businesses. We create modern websites, powerful apps, and strategic digital experiences that drive real growth and success.",
  "foundingDate": "2024",
  "industry": "Digital Innovation & Web Development",
  "serviceArea": "Worldwide",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://linkedin.com/company/hexerize",
    "https://twitter.com/hexerize",
    "https://github.com/hexerize"
  ]
});

export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://hexerize.com/#website",
  "url": "https://hexerize.com",
  "name": "Hexerize - Digital Innovation Company",
  "description": "Innovative digital solutions that transform businesses. We create modern websites, powerful apps, and strategic digital experiences that drive real growth and success.",
  "publisher": {
    "@id": "https://hexerize.com/#organization"
  }
  // SearchAction removed - deprecated by Google Nov 2024
});

export const createWebPageSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": url,
  "name": title,
  "description": description,
  "isPartOf": {
    "@id": "https://hexerize.com/#website"
  },
  "about": {
    "@id": "https://hexerize.com/#organization"
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0]
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => {
    const isLast = index === items.length - 1;
    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      // Last item should not have 'item' property per Google guidelines
      ...(isLast ? {} : { "item": item.url })
    };
  })
});

export const createServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Digital Innovation Services",
  "description": "Comprehensive digital services including modern website development, digital branding, mobile app development, and strategic consulting.",
  "provider": {
    "@id": "https://hexerize.com/#organization"
  },
  "serviceType": "Digital Innovation & Web Development",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Modern Website Development",
          "description": "Custom, responsive websites built with cutting-edge technologies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Branding",
          "description": "Complete brand identity and digital presence strategy"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "App Development",
          "description": "Custom mobile and web applications"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Strategy",
          "description": "Comprehensive digital transformation consulting"
        }
      }
    ]
  }
});

export const createPersonSchema = (name: string, role: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": name,
  "jobTitle": role,
  "description": description,
  "worksFor": {
    "@id": "https://hexerize.com/#organization"
  },
  "url": "https://hexerize.com/about"
});

export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hexerize.com/#organization",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const createContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://hexerize.com/contact",
  "name": "Contact Hexerize - Start Your Digital Innovation Project",
  "description": "Ready to transform your business? Contact Hexerize for a free consultation.",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://hexerize.com/#organization"
  }
});

// SiteNavigationElement - CRITICAL for Google Sitelinks
export const createSiteNavigationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Services",
      "description": "Comprehensive digital services and solutions",
      "url": "https://hexerize.com/services"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Projects",
      "description": "Our portfolio of successful digital projects",
      "url": "https://hexerize.com/projects"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Smart Cards & Rings",
      "description": "Premium NFC smart business cards and rings",
      "url": "https://hexerize.com/smart-cards"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Blog",
      "description": "Latest insights on web development and digital innovation",
      "url": "https://hexerize.com/blog"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "About Us",
      "description": "Learn about Hexerize and our mission",
      "url": "https://hexerize.com/about"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Contact",
      "description": "Get in touch with our team",
      "url": "https://hexerize.com/contact"
    }
  ]
});
