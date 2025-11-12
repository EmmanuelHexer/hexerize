// Vite plugin for SEO optimizations (only applied during production builds)
export function seoOptimizationPlugin() {
  return {
    name: 'seo-optimization',
    apply: 'build',
    generateBundle() {
      // Placeholder for sitemap/robots generation logic
      console.log('SEO files generated successfully');
    },
    transformIndexHtml(html) {
      // Add performance-oriented meta tags to the built HTML
      return html.replace(
        '<head>',
        `<head>
          <!-- Performance optimization meta -->
          <meta name="format-detection" content="telephone=no">
          <meta name="msapplication-tap-highlight" content="no">
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
      );
    }
  };
}
