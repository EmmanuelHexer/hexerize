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
    "url": "https://hexerize.com/HexerizeLogo.png",
    "width": 200,
    "height": 200
  },
  "description": "Digital innovation company helping businesses grow through modern websites, branding, and digital strategies while building our own ecosystem of platforms and apps.",
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
  "description": "More than a web design agency — we're a digital innovation company helping businesses grow through modern websites, branding, and digital strategies.",
  "publisher": {
    "@id": "https://hexerize.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hexerize.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
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
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
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