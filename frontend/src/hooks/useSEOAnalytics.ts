import { useEffect } from 'react';

interface SEOAnalyticsData {
  page: string;
  title: string;
  description: string;
  keywords?: string;
  loadTime: number;
  userAgent: string;
  referrer: string;
  timestamp: string;
}

export const useSEOAnalytics = (pageData: { page: string; title: string; description: string; keywords?: string }) => {
  useEffect(() => {
    // Skip analytics on mobile for better performance
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }
    const startTime = performance.now();

    const trackSEOMetrics = () => {
      const loadTime = performance.now() - startTime;

      const analyticsData: SEOAnalyticsData = {
        ...pageData,
        loadTime,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
      };

      // Send to Google Analytics 4 if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_title: pageData.title,
          page_location: window.location.href,
          content_group1: pageData.page,
          custom_parameter_description_length: pageData.description.length,
          custom_parameter_has_keywords: !!pageData.keywords
        });

        // Track SEO-specific metrics
        (window as any).gtag('event', 'seo_metrics', {
          event_category: 'SEO',
          page_title_length: pageData.title.length,
          meta_description_length: pageData.description.length,
          has_keywords: !!pageData.keywords,
          load_time: Math.round(loadTime)
        });
      }

      // Send to custom analytics endpoint
      sendToCustomAnalytics(analyticsData);

    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackSEOMetrics();
    } else {
      window.addEventListener('load', trackSEOMetrics);
      return () => window.removeEventListener('load', trackSEOMetrics);
    }
  }, [pageData]);
};

const sendToCustomAnalytics = async (_data: SEOAnalyticsData) => {
  // Analytics endpoint disabled for development
  // Replace with actual analytics service when available
};

// Commented out - available for future SEO validation features
// const validateSEOBestPractices = (pageData: { title: string; description: string; keywords?: string }) => {
//   const issues: string[] = [];

//   // Title validation
//   if (pageData.title.length < 30) {
//     issues.push('Title too short (recommended: 30-60 characters)');
//   } else if (pageData.title.length > 60) {
//     issues.push('Title too long (recommended: 30-60 characters)');
//   }

//   // Description validation
//   if (pageData.description.length < 120) {
//     issues.push('Meta description too short (recommended: 120-160 characters)');
//   } else if (pageData.description.length > 160) {
//     issues.push('Meta description too long (recommended: 120-160 characters)');
//   }

//   // Keywords validation
//   if (pageData.keywords) {
//     const keywordCount = pageData.keywords.split(',').length;
//     if (keywordCount > 10) {
//       issues.push('Too many keywords (recommended: 5-10 keywords)');
//     }
//   }

//   // Check for duplicates
//   const titleWords = pageData.title.toLowerCase().split(' ');
//   const descriptionWords = pageData.description.toLowerCase().split(' ');
//   const commonWords = titleWords.filter(word =>
//     descriptionWords.includes(word) && word.length > 3
//   );

//   if (commonWords.length === 0) {
//     issues.push('No common keywords between title and description');
//   }
// };

// Hook for tracking search engine bot visits
export const useBotDetection = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const bots = [
      'googlebot',
      'bingbot',
      'slurp', // Yahoo
      'duckduckbot',
      'baiduspider',
      'yandexbot',
      'facebookexternalhit',
      'twitterbot',
      'linkedinbot',
      'whatsapp',
      'telegrambot'
    ];

    const detectedBot = bots.find(bot => userAgent.includes(bot));

    if (detectedBot) {
      // Track bot visits
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'bot_visit', {
          event_category: 'SEO',
          event_label: detectedBot,
          page_location: window.location.href
        });
      }

    }
  }, []);
};

// Hook for tracking Core Web Vitals impact on SEO
export const useCoreWebVitalsSEO = () => {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // Track LCP for SEO
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;

        let rating = 'good';
        if (lcp > 4000) rating = 'poor';
        else if (lcp > 2500) rating = 'needs improvement';

        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lcp_seo_impact', {
            event_category: 'SEO',
            lcp_value: Math.round(lcp),
            lcp_rating: rating,
            page_location: window.location.href
          });
        }
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      return () => lcpObserver.disconnect();
    }
  }, []);
};