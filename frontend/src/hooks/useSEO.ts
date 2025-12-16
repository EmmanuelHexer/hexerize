import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = "website",
  ogImage = "https://hexerize.com/opengraph-image.png",
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  noIndex = false,
  noFollow = false,
}: SEOProps) => {
  useEffect(() => {
    // Update document title with better formatting
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      if (!content) return;

      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;

      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        if (isProperty) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Robots meta tag
    const robotsContent = [
      noIndex ? 'noindex' : 'index',
      noFollow ? 'nofollow' : 'follow'
    ].join(', ');
    updateMetaTag('robots', robotsContent);

    // Open Graph meta tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    if (ogUrl || canonical) {
      updateMetaTag('og:url', ogUrl || canonical, true);
    }
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `${title} - Hexerize`, true);
    updateMetaTag('og:site_name', 'Hexerize', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@hexerize');
    updateMetaTag('twitter:creator', '@hexerize');
    updateMetaTag('twitter:title', twitterTitle || title);
    updateMetaTag('twitter:description', twitterDescription || description);
    updateMetaTag('twitter:image', twitterImage || ogImage);
    updateMetaTag('twitter:image:alt', `${title} - Hexerize`);
    if (canonical) {
      updateMetaTag('twitter:url', canonical);
    }

    // Additional SEO meta tags
    updateMetaTag('author', 'Hexerize');
    updateMetaTag('publisher', 'Hexerize');
    updateMetaTag('theme-color', '#31408f');
    updateMetaTag('application-name', 'Hexerize');

    // Canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Preconnect to external domains for performance
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net'
    ];

    preconnectDomains.forEach(domain => {
      if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
        const preconnectLink = document.createElement('link');
        preconnectLink.rel = 'preconnect';
        preconnectLink.href = domain;
        if (domain.includes('gstatic')) {
          preconnectLink.crossOrigin = 'anonymous';
        }
        document.head.appendChild(preconnectLink);
      }
    });

    // Add structured data if provided
    if (structuredData) {
      const scriptId = 'page-structured-data';
      const existingScript = document.getElementById(scriptId);

      if (existingScript) {
        existingScript.textContent = JSON.stringify(structuredData);
      } else {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }

    // Cleanup function to remove page-specific structured data
    return () => {
      const pageScript = document.getElementById('page-structured-data');
      if (pageScript) {
        pageScript.remove();
      }
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogType, ogImage, twitterTitle, twitterDescription, twitterImage, structuredData, noIndex, noFollow]);
};
