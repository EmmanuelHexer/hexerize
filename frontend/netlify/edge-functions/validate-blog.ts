/**
 * Netlify Edge Function: Blog Post Validator
 *
 * Purpose: Validate blog post URLs and return proper HTTP 404 status
 *          for non-existent blog posts to fix Google Search Console soft 404 errors
 *
 * How it works:
 * 1. Intercepts all /blog/* requests
 * 2. Fetches the sitemap.xml to get valid blog post slugs
 * 3. If slug exists in sitemap -> allows request (200 status)
 * 4. If slug doesn't exist -> returns 404.html with 404 status
 *
 * This fixes the soft 404 issue where non-existent blog posts were
 * returning 200 status codes, wasting Google's crawl budget.
 */

import type { Context } from "https://edge.netlify.com";

// Cache valid slugs for 5 minutes to avoid repeated sitemap fetches
let cachedSlugs: string[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Fetch valid blog slugs from sitemap.xml
 */
async function getValidBlogSlugs(siteUrl: string): Promise<string[]> {
  const now = Date.now();

  // Return cached slugs if still valid
  if (cachedSlugs && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedSlugs;
  }

  try {
    // Fetch sitemap from the deployed site
    const sitemapUrl = `${siteUrl}/sitemap.xml`;
    const response = await fetch(sitemapUrl);

    if (!response.ok) {
      console.error(`Failed to fetch sitemap: ${response.status}`);
      return [];
    }

    const xml = await response.text();

    // Extract blog post URLs using regex
    // Matches: <loc>https://hexerize.com/blog/SLUG</loc>
    const blogUrlPattern = /<loc>https:\/\/hexerize\.com\/blog\/([^<]+)<\/loc>/g;
    const matches = [...xml.matchAll(blogUrlPattern)];

    // Extract slugs from matches
    const slugs = matches.map(match => match[1]);

    // Update cache
    cachedSlugs = slugs;
    cacheTimestamp = now;

    console.log(`Fetched ${slugs.length} valid blog slugs from sitemap`);
    return slugs;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}

/**
 * Main edge function handler
 */
export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Only process blog post routes (/blog/slug)
  // Let /blog (listing page) pass through
  if (path === '/blog' || path === '/blog/') {
    return context.next();
  }

  // Check if this is a blog post route
  if (path.startsWith('/blog/')) {
    // Extract slug from path
    const slug = path.replace('/blog/', '').replace(/\/$/, '');

    // Don't validate if it's empty (already handled above)
    if (!slug) {
      return context.next();
    }

    // Get site URL from request
    const siteUrl = `${url.protocol}//${url.host}`;

    // Fetch valid blog slugs
    const validSlugs = await getValidBlogSlugs(siteUrl);

    // Check if this slug is valid
    const isValidSlug = validSlugs.includes(slug);

    if (isValidSlug) {
      // Valid blog post - let it through (React Router will render it)
      console.log(`✅ Valid blog post: /blog/${slug}`);
      return context.next();
    } else {
      // Invalid blog post - return 404
      console.log(`❌ Invalid blog post: /blog/${slug} - Returning 404`);

      // Fetch the 404.html page
      const notFoundUrl = `${siteUrl}/404.html`;
      const notFoundResponse = await fetch(notFoundUrl);
      const notFoundHtml = await notFoundResponse.text();

      // Return 404 with proper status code
      return new Response(notFoundHtml, {
        status: 404,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Robots-Tag': 'noindex'
        }
      });
    }
  }

  // Not a blog route - pass through
  return context.next();
};

// Configuration: Apply this function to all /blog/* routes
export const config = {
  path: "/blog/*",
  // Exclude the blog listing page
  excludedPath: "/blog"
};
