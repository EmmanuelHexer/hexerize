// Global type declarations

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        [key: string]: any;
      }
    ) => void;
  }
}

// Performance API extensions
interface PerformanceNavigationTiming extends PerformanceEntry {
  requestStart: number;
  responseStart: number;
  fetchStart: number;
}

export {};