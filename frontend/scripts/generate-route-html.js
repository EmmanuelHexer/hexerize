import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

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

// Read the base index.html from dist
const baseHTML = readFileSync(`${__dirname}/../dist/index.html`, 'utf-8');

// Define all static routes with their SEO data
const routes = [
  {
    path: 'services',
    title: 'Services | Hexerize',
    description: 'Professional web development, mobile apps, digital branding, and strategic consulting services. Custom solutions tailored to your business needs. Free consultation available.',
    canonical: 'https://hexerize.com/services'
  },
  {
    path: 'projects',
    title: 'Projects | Hexerize',
    description: 'Explore successful digital projects and case studies. See our work in e-commerce platforms, AI-powered applications, custom web solutions, and mobile apps. Real results, real impact.',
    canonical: 'https://hexerize.com/projects'
  },
  {
    path: 'about',
    title: 'About | Hexerize',
    description: 'Meet the team behind innovative digital solutions. Learn how Hexerize combines cutting-edge technology, creative design, and strategic thinking to transform businesses globally.',
    canonical: 'https://hexerize.com/about'
  },
  {
    path: 'contact',
    title: 'Contact | Hexerize',
    description: 'Ready to transform your business? Contact Hexerize for a free consultation. Expert web development, mobile apps, and digital strategy. Available worldwide. Let\'s start your project today.',
    canonical: 'https://hexerize.com/contact'
  },
  {
    path: 'smart-cards',
    title: 'Smart Cards | Hexerize',
    description: 'Transform your networking with Hexerize Smart Business Cards & Rings in Ghana. Share your digital presence with a tap. Premium NFC solutions from GHS 350. No app required, instant share, lifetime updates.',
    canonical: 'https://hexerize.com/smart-cards'
  },
  {
    path: 'blog',
    title: 'Blog | Hexerize',
    description: 'Expert insights on digital innovation, web development trends, and cutting-edge technology. Learn modern development practices and strategies.',
    canonical: 'https://hexerize.com/blog'
  }
];

// Helper function to escape special characters for regex
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to generate route HTML
function generateRouteHTML(route) {
  let html = baseHTML;

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace title meta tag first (before description to avoid conflicts)
  html = html.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/>/,
    `<meta name="title" content="${route.title}"/>`
  );

  // Replace description (handle multiline attributes)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"[^>]*>/,
    `<meta name="description" content="${route.description}"/>`
  );

  // Replace keywords if provided (for blog posts with categories)
  if (route.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"[^>]*>/,
      `<meta name="keywords" content="${route.keywords}"/>`
    );
  }

  // Add canonical tag
  html = html.replace(
    /<!-- Canonical URL - Dynamically set by React useSEO hook -->/,
    `<link rel="canonical" href="${route.canonical}"/>`
  );

  // Update Open Graph tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"[^>]*>/,
    `<meta property="og:url" content="${route.canonical}"/>`
  );

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"[^>]*>/,
    `<meta property="og:title" content="${route.title}"/>`
  );

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"[^>]*>/,
    `<meta property="og:description" content="${route.description}"/>`
  );

  // Update Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"[^>]*>/,
    `<meta name="twitter:url" content="${route.canonical}"/>`
  );

  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"[^>]*>/,
    `<meta name="twitter:title" content="${route.title}"/>`
  );

  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"[^>]*>/,
    `<meta name="twitter:description" content="${route.description}"/>`
  );

  // Add article type for blog posts
  if (route.isArticle) {
    html = html.replace(
      /<meta\s+property="og:type"\s+content="website"\s*\/>/,
      `<meta property="og:type" content="article"/>`
    );

    // Update OG image to use featured image if available
    if (route.ogImage) {
      html = html.replace(
        /<meta\s+property="og:image"\s+content="[^"]*"[^>]*>/,
        `<meta property="og:image" content="${route.ogImage}"/>`
      );

      // Update Twitter image too
      html = html.replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"[^>]*>/,
        `<meta name="twitter:image" content="${route.ogImage}"/>`
      );
    }

    // Add article:published_time, article:modified_time, and article:section/tag
    if (route.publishedTime) {
      let articleTimeTags = `
    <meta property="article:published_time" content="${route.publishedTime}"/>
    <meta property="article:modified_time" content="${route.modifiedTime || route.publishedTime}"/>`;

      // Add article:section for primary category and article:tag for all categories
      if (route.categories && route.categories.length > 0) {
        articleTimeTags += `
    <meta property="article:section" content="${route.categories[0]}"/>`;

        // Add article:tag for each category
        route.categories.forEach(category => {
          articleTimeTags += `
    <meta property="article:tag" content="${category}"/>`;
        });
      }

      html = html.replace(
        /<meta property="og:type" content="article"\/>/,
        `<meta property="og:type" content="article"/>${articleTimeTags}`
      );
    }

    // Add article structured data if provided
    if (route.structuredData) {
      html = html.replace(
        /<script type="application\/ld\+json">/,
        `<script type="application/ld+json">\n${JSON.stringify(route.structuredData, null, 2)}\n</script>\n    <script type="application/ld+json">`
      );
    }

    // Add breadcrumb structured data if provided
    if (route.breadcrumb) {
      html = html.replace(
        /<script type="application\/ld\+json">/,
        `<script type="application/ld+json">\n${JSON.stringify(route.breadcrumb, null, 2)}\n</script>\n    <script type="application/ld+json">`
      );
    }
  }

  return html;
}

// Main function to generate all HTML files
async function generateAllHTML() {
  console.log('🚀 Generating static HTML files for each route...\n');

  // Generate static routes
  console.log('📄 Generating static pages...');
  routes.forEach(route => {
    const html = generateRouteHTML(route);

    // Create directory if needed
    const dirPath = `${__dirname}/../dist/${route.path}`;
    mkdirSync(dirPath, { recursive: true });

    // Write index.html to the route directory
    writeFileSync(`${dirPath}/index.html`, html);
    console.log(`✅ Generated: /${route.path}/index.html`);
  });

  // Fetch and generate blog posts
  try {
    console.log('\n📝 Fetching blog posts from Sanity...');
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        "slug": slug.current,
        title,
        excerpt,
        publishedAt,
        _updatedAt,
        "mainImage": mainImage.asset->url,
        "author": author->{
          name,
          "image": image.asset->url
        },
        "categories": categories[]->title,
        estimatedReadingTime
      }
    `);

    console.log(`📚 Found ${posts.length} blog posts\n`);
    console.log('📄 Generating blog post pages...');

    posts.forEach(post => {
      // Truncate description to 155 characters for SEO
      const description = post.excerpt && post.excerpt.length > 155
        ? post.excerpt.substring(0, 152) + '...'
        : (post.excerpt || 'Read this article on Hexerize blog.');

      // Generate OG image URL (1200x630 for optimal social sharing)
      const ogImage = post.mainImage
        ? `${post.mainImage}?w=1200&h=630&fit=crop&auto=format`
        : 'https://hexerize.com/opengraph-image.png';

      // Extract keywords from categories
      const keywords = post.categories && post.categories.length > 0
        ? post.categories.join(', ')
        : 'web development, programming, technology';

      const route = {
        path: `blog/${post.slug}`,
        title: `${post.title} | Hexerize Blog`,
        description: description,
        canonical: `https://hexerize.com/blog/${post.slug}`,
        isArticle: true,
        ogImage: ogImage,
        publishedTime: post.publishedAt,
        modifiedTime: post._updatedAt || post.publishedAt,
        keywords: keywords,
        categories: post.categories || [],
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.mainImage ? [post.mainImage] : undefined,
          "datePublished": post.publishedAt,
          "dateModified": post._updatedAt || post.publishedAt,
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Hexerize Team",
            "url": "https://hexerize.com/about",
            "jobTitle": "Senior Web Developer & Digital Strategist",
            "worksFor": {
              "@type": "Organization",
              "name": "Hexerize",
              "url": "https://hexerize.com"
            },
            ...(post.author?.image && {
              "image": {
                "@type": "ImageObject",
                "url": post.author.image
              }
            }),
            "sameAs": [
              "https://linkedin.com/company/hexerize",
              "https://twitter.com/hexerize",
              "https://github.com/hexerize"
            ]
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hexerize",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hexerize.com/hexerize-logo-512.png",
              "width": 512,
              "height": 512
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://hexerize.com/blog/${post.slug}`
          },
          "inLanguage": "en-US",
          "isAccessibleForFree": true
        },
        breadcrumb: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://hexerize.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://hexerize.com/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": post.title,
              "item": `https://hexerize.com/blog/${post.slug}`
            }
          ]
        }
      };

      const html = generateRouteHTML(route);

      // Create directory if needed
      const dirPath = `${__dirname}/../dist/blog/${post.slug}`;
      mkdirSync(dirPath, { recursive: true });

      // Write index.html to the route directory
      writeFileSync(`${dirPath}/index.html`, html);
      console.log(`✅ Generated: /blog/${post.slug}/index.html`);
    });

    console.log(`\n✨ All HTML files generated successfully!`);
    console.log(`📊 Total: ${routes.length} static pages + ${posts.length} blog posts = ${routes.length + posts.length} pages`);
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    console.log('⚠️  Continuing with static pages only...');
  }
}

// Run the generation
generateAllHTML();
