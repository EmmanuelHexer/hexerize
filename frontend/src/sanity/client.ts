import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'rk22x3lt',
  dataset: 'production',
  useCdn: false, // Disabled CDN to avoid CORS issues during development
  apiVersion: '2025-01-12',
  perspective: 'published',
});

// Helper function for generating image URLs from Sanity image references
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
