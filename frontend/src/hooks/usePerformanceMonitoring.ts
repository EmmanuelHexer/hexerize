import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export const usePerformanceMonitoring = (pageName: string) => {
  useEffect(() => {
    // Function to get Core Web Vitals
    const getCLS = (onPerfEntry: (metric: PerformanceMetrics) => void) => {
      let clsValue = 0;
      let clsEntries: any[] = [];

      const entryHandler = (list: any) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = clsEntries[0];
            const lastSessionEntry = clsEntries[clsEntries.length - 1];

            if (!firstSessionEntry ||
                entry.startTime - lastSessionEntry.startTime > 1000 ||
                entry.startTime - firstSessionEntry.startTime > 5000) {
              clsEntries = [entry];
            } else {
              clsEntries.push(entry);
            }

            clsValue = clsEntries.reduce((sum, entry) => sum + entry.value, 0);
          }
        }
        onPerfEntry({ cls: clsValue });
      };

      try {
        const observer = new PerformanceObserver(entryHandler);
        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // Layout-shift not supported in this browser
      }
    };

    const getFCP = (onPerfEntry: (metric: PerformanceMetrics) => void) => {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              onPerfEntry({ fcp: entry.startTime });
            }
          }
        });
        observer.observe({ type: 'paint', buffered: true });
      } catch (e) {
        // Paint not supported in this browser
      }
    };

    const getLCP = (onPerfEntry: (metric: PerformanceMetrics) => void) => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          onPerfEntry({ lcp: lastEntry.startTime });
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported in this browser
      }
    };

    const getFID = (onPerfEntry: (metric: PerformanceMetrics) => void) => {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as any; // Type assertion for FID entry
            if (fidEntry.processingStart) {
              onPerfEntry({ fid: fidEntry.processingStart - entry.startTime });
            }
          }
        });
        observer.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // FID not supported in this browser
      }
    };

    const getTTFB = (onPerfEntry: (metric: PerformanceMetrics) => void) => {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0] as PerformanceNavigationTiming;
        onPerfEntry({ ttfb: nav.responseStart - nav.requestStart });
      }
    };

    const reportMetrics = (metrics: PerformanceMetrics) => {

      // Send to analytics service (replace with your analytics service)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        Object.entries(metrics).forEach(([key, value]) => {
          if (value !== undefined) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Performance',
              event_label: key.toUpperCase(),
              value: Math.round(value),
              custom_parameter_page: pageName
            });
          }
        });
      }

      // Analytics endpoint disabled for development
      // Replace with actual analytics service when available
    };

    // Check if browser supports the APIs
    if ('PerformanceObserver' in window) {
      getCLS(reportMetrics);
      getFCP(reportMetrics);
      getLCP(reportMetrics);
      getFID(reportMetrics);
      getTTFB(reportMetrics);
    }

    // Report basic timing metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.timing;
        // const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        // const domContentLoadTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

        reportMetrics({
          ttfb: perfData.responseStart - perfData.fetchStart
        });

      }, 0);
    });

  }, [pageName]);
};

// Hook for measuring custom performance metrics
export const useCustomMetric = (metricName: string, startTime?: number) => {
  useEffect(() => {
    if (startTime) {
      const endTime = performance.now();
      const duration = endTime - startTime;


      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'custom_metric', {
          event_category: 'Performance',
          event_label: metricName,
          value: Math.round(duration)
        });
      }
    }
  }, [metricName, startTime]);
};