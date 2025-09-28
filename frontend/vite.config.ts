import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// @ts-ignore - Custom plugin without types
import { seoOptimizationPlugin } from "./vite-seo-plugin.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seoOptimizationPlugin()
  ],
  build: {
    // Optimize for better performance and caching
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons']
        },
        // Better file naming for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Enable source maps for better debugging (only in dev)
    sourcemap: true,
    // Minimize bundle size
    minify: 'terser',
    // Increase chunk size warning limit for better optimization
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true
  },
  server: {
    // Add CORS headers
    cors: true,
    // Fix WebSocket HMR issues
    hmr: {
      clientPort: undefined, // Let Vite auto-detect
      host: 'localhost'
    },
    // Watch configuration to prevent issues
    watch: {
      usePolling: false,
      interval: 100
    },
    // Better caching headers for development
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'react-icons'
    ],
    // Force pre-bundling of these packages
    force: false,
    // Exclude problematic packages
    exclude: []
  },
  // Better module resolution
  resolve: {
    // Prevent duplication of dependencies
    dedupe: ['react', 'react-dom'],
    // Better extension resolution
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
});
