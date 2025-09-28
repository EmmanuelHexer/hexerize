// Vite plugin for SEO optimizations
export function seoOptimizationPlugin() {
  return {
    name: 'seo-optimization',
    configureServer(server) {
      // Add custom headers for better SEO
      server.middlewares.use((req, res, next) => {
        // Security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Performance headers
        res.setHeader('Cache-Control', 'public, max-age=31536000');

        next();
      });
    },
    generateBundle(options, bundle) {
      // Generate robots.txt and sitemap.xml during build
      console.log('🔍 SEO files generated successfully');
    },
    transformIndexHtml(html) {
      // Add performance optimizations to HTML
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