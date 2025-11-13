import { createClient } from '@sanity/client';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sanity client configuration
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'rk22x3lt',
  dataset: 'production',
  apiVersion: '2025-01-12',
  useCdn: false,
  perspective: 'published',
});

// Fetch all blog posts
async function generateSitemap() {
  try {
    console.log('🚀 Generating dynamic sitemap...');

    // Fetch all published blog posts
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }
    `);

    console.log(`📝 Found ${posts.length} blog posts`);

    // Static pages (only loc and lastmod - Google/Bing ignore changefreq and priority in 2025)
    const staticPages = [
      {
        loc: 'https://hexerize.com',
        lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      },
      {
        loc: 'https://hexerize.com/services',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: 'https://hexerize.com/projects',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: 'https://hexerize.com/about',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: 'https://hexerize.com/smart-cards',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: 'https://hexerize.com/blog',
        lastmod: new Date().toISOString().split('T')[0],
      },
      {
        loc: 'https://hexerize.com/contact',
        lastmod: new Date().toISOString().split('T')[0],
      },
    ];

    // Dynamic blog post pages (accurate lastmod from Sanity)
    const blogPages = posts.map((post) => ({
      loc: `https://hexerize.com/blog/${post.slug}`,
      lastmod: (post._updatedAt || post.publishedAt).split('T')[0], // YYYY-MM-DD format
    }));

    // Combine all pages
    const allPages = [...staticPages, ...blogPages];

    // Generate XML (2025 best practices: only loc and lastmod - Google/Bing ignore changefreq and priority)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

    // Write sitemap to public folder
    const sitemapPath = join(__dirname, '../public/sitemap.xml');
    writeFileSync(sitemapPath, xml.trim());

    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${allPages.length} (${staticPages.length} static + ${blogPages.length} blog posts)`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
