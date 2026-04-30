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
    canonical: 'https://hexerize.com/services/'
  },
  {
    path: 'projects',
    title: 'Projects | Hexerize',
    description: 'Explore successful digital projects and case studies. See our work in e-commerce platforms, AI-powered applications, custom web solutions, and mobile apps. Real results, real impact.',
    canonical: 'https://hexerize.com/projects/'
  },
  {
    path: 'about',
    title: 'About | Hexerize',
    description: 'Meet the team behind innovative digital solutions. Learn how Hexerize combines cutting-edge technology, creative design, and strategic thinking to transform businesses globally.',
    canonical: 'https://hexerize.com/about/'
  },
  {
    path: 'contact',
    title: 'Contact | Hexerize',
    description: 'Ready to transform your business? Contact Hexerize for a free consultation. Expert web development, mobile apps, and digital strategy. Available worldwide. Let\'s start your project today.',
    canonical: 'https://hexerize.com/contact/'
  },
  {
    path: 'blog',
    title: 'Blog | Hexerize',
    description: 'Expert insights on digital innovation, web development trends, and cutting-edge technology. Learn modern development practices and strategies.',
    canonical: 'https://hexerize.com/blog/'
  }
];

// Helper function to escape special characters for regex
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Escape for HTML attributes / text content
function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Escape for embedding inside JSON string literals (used in JSON-LD <script>)
function escapeJsonString(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// Convert Sanity Portable Text blocks to plain text (for description fallback)
function portableTextToPlainText(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .filter(block => block && block._type === 'block')
    .map(block =>
      (block.children || [])
        .filter(child => child._type === 'span')
        .map(span => span.text || '')
        .join('')
    )
    .filter(text => text.trim().length > 0)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Render first N paragraphs of body as static HTML for crawler indexing
function renderBodyParagraphs(blocks, maxParagraphs = 4) {
  if (!blocks || !Array.isArray(blocks)) return '';
  const paragraphs = blocks
    .filter(block => block && block._type === 'block' && (!block.style || block.style === 'normal'))
    .map(block =>
      (block.children || [])
        .filter(child => child._type === 'span')
        .map(span => escapeAttr(span.text || ''))
        .join('')
        .trim()
    )
    .filter(text => text.length > 0)
    .slice(0, maxParagraphs);
  return paragraphs.map(p => `<p style="margin:0 0 16px;">${p}</p>`).join('');
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

  // Replace canonical tag (remove comment and existing canonical)
  html = html.replace(
    /<!-- Canonical URL - Dynamically set by React useSEO hook -->\s*<link rel="canonical" href="[^"]*"\s*\/>/,
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

  // CRITICAL FIX: Update WebPage structured data URL
  // This fixes "Duplicate, Google chose different canonical than user" error
  html = html.replace(
    /"@type":\s*"WebPage",\s*"@id":\s*"https:\/\/hexerize\.com\/#webpage",\s*"url":\s*"https:\/\/hexerize\.com\/"/,
    `"@type": "WebPage",\n            "@id": "${route.canonical}#webpage",\n            "url": "${route.canonical}"`
  );

  // Also update WebPage name and description in structured data
  html = html.replace(
    /("@type":\s*"WebPage"[\s\S]*?"name":\s*)"[^"]*"/,
    `$1"${escapeJsonString(route.title)}"`
  );

  html = html.replace(
    /("@type":\s*"WebPage"[\s\S]*?"description":\s*)"[^"]*"/,
    `$1"${escapeJsonString(route.description)}"`
  );

  // For blog posts, override the stale 2024-01-01/2025-01-01 dates baked
  // into the WebPage schema with the actual post timestamps
  if (route.publishedTime) {
    const pubDate = String(route.publishedTime).split('T')[0];
    const modDate = String(route.modifiedTime || route.publishedTime).split('T')[0];
    html = html.replace(
      /("@type":\s*"WebPage"[\s\S]*?"datePublished":\s*)"[^"]*"/,
      `$1"${pubDate}"`
    );
    html = html.replace(
      /("@type":\s*"WebPage"[\s\S]*?"dateModified":\s*)"[^"]*"/,
      `$1"${modDate}"`
    );
  }

  // Inline article content into <div id="root"> so crawlers see real content
  // before JS executes. React's createRoot() will replace this on hydration.
  if (route.isArticle && route.inlineContent) {
    html = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${route.inlineContent}</div>`
    );
  }

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

      // CRITICAL: WhatsApp/Facebook fall back to og:image:secure_url if og:image
      // is unsupported (e.g. WebP). Keep them in sync with the post image.
      html = html.replace(
        /<meta\s+property="og:image:secure_url"\s+content="[^"]*"[^>]*>/,
        `<meta property="og:image:secure_url" content="${route.ogImage}"/>`
      );

      // og:image:type must match the actual image MIME (we force JPEG for posts)
      html = html.replace(
        /<meta\s+property="og:image:type"\s+content="[^"]*"[^>]*>/,
        `<meta property="og:image:type" content="${route.ogImageType || 'image/jpeg'}"/>`
      );

      // og:image:alt and twitter:image:alt — use post title, not the generic site alt
      const altText = escapeAttr(route.title);
      html = html.replace(
        /<meta\s+property="og:image:alt"\s+content="[^"]*"[^>]*>/,
        `<meta property="og:image:alt" content="${altText}"/>`
      );
      html = html.replace(
        /<meta\s+name="twitter:image:alt"\s+content="[^"]*"[^>]*>/,
        `<meta name="twitter:image:alt" content="${altText}"/>`
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
        body,
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
      // Build a real description: prefer excerpt, fall back to body plain text,
      // last resort is title. Never use the generic placeholder string.
      const bodyText = portableTextToPlainText(post.body);
      const rawDescription =
        (post.excerpt && post.excerpt.trim().length > 0)
          ? post.excerpt.trim()
          : (bodyText.length > 0
              ? bodyText
              : `${post.title} - Read on Hexerize Blog`);
      const description = rawDescription.length > 155
        ? rawDescription.substring(0, 152).trim() + '...'
        : rawDescription;

      // Force JPEG for og:image — WhatsApp does not reliably render WebP previews.
      // The visible page image (rendered by React) can stay WebP via auto=format.
      const ogImage = post.mainImage
        ? `${post.mainImage}?w=1200&h=630&fit=crop&fm=jpg&q=85`
        : 'https://hexerize.com/opengraph-image.png';

      // Article schema image — force JPEG for consistent crawler rendering.
      // Use 1600px to match the page's displayed featured image (retina-friendly).
      const articleImage = post.mainImage
        ? `${post.mainImage}?w=1600&fm=jpg&q=85`
        : null;

      // Extract keywords from categories
      const keywords = post.categories && post.categories.length > 0
        ? post.categories.join(', ')
        : 'web development, programming, technology';

      // Static fallback content that gets rendered into <div id="root"> so that
      // crawlers (and users in the brief pre-JS window) see real article content
      const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';
      const authorName = post.author?.name || 'Hexerize';
      const readingMinutes = post.estimatedReadingTime ? ` &middot; ${post.estimatedReadingTime} min read` : '';
      const bodyParagraphs = renderBodyParagraphs(post.body);
      // Wrap in a full-width dark wrapper that matches the real page's
      // bg-slate-900 so static→React transition has no background-color jump
      // or "narrow column on body color" weirdness.
      const inlineContent = `<div style="background:#0f172a;min-height:100vh;color:#f9fafb;font-family:system-ui,-apple-system,sans-serif;line-height:1.6;"><article style="max-width:768px;margin:0 auto;padding:96px 20px 48px;"><nav style="font-size:14px;color:#9ca3af;margin-bottom:24px;"><a href="/" style="color:#38bdf8;text-decoration:none;">Home</a><span style="margin:0 8px;">/</span><a href="/blog/" style="color:#38bdf8;text-decoration:none;">Blog</a></nav><h1 style="font-size:36px;font-weight:700;line-height:1.2;margin:0 0 16px;color:#ffffff;">${escapeAttr(post.title)}</h1><p style="font-size:14px;color:#9ca3af;margin:0 0 32px;">By ${escapeAttr(authorName)} &middot; ${escapeAttr(formattedDate)}${readingMinutes}</p>${post.mainImage ? `<img src="${ogImage}" alt="${escapeAttr(post.title)}" width="1200" height="630" style="width:100%;height:auto;border-radius:8px;margin:0 0 32px;display:block;" />` : ''}<p style="font-size:18px;color:#d1d5db;margin:0 0 32px;">${escapeAttr(description)}</p><div style="font-size:16px;color:#e5e7eb;">${bodyParagraphs}</div></article></div>`;

      const route = {
        path: `blog/${post.slug}`,
        title: `${post.title} | Hexerize Blog`,
        description: description,
        canonical: `https://hexerize.com/blog/${post.slug}/`,
        isArticle: true,
        ogImage: ogImage,
        ogImageType: 'image/jpeg',
        inlineContent: inlineContent,
        publishedTime: post.publishedAt,
        modifiedTime: post._updatedAt || post.publishedAt,
        keywords: keywords,
        categories: post.categories || [],
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": description,
          "image": articleImage ? [articleImage] : undefined,
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
            "@id": `https://hexerize.com/blog/${post.slug}/`
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
              "item": "https://hexerize.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://hexerize.com/blog/"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": post.title,
              "item": `https://hexerize.com/blog/${post.slug}/`
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
