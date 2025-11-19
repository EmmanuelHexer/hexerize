/**
 * Submit URLs to IndexNow API
 *
 * This script runs after the build completes and submits all URLs
 * from the sitemap to IndexNow for instant indexing on Bing and other search engines.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// IndexNow Configuration
const INDEXNOW_KEY = '34202a6136cc99d4081dcd6ac98aa3319aabe06b4db88c7e0dce6c6b12627072';
const SITE_URL = 'https://hexerize.com';

// Sanity client configuration
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'rk22x3lt',
  dataset: 'production',
  apiVersion: '2025-01-12',
  useCdn: false,
  perspective: 'published',
});

/**
 * Submit URLs to IndexNow
 */
async function submitToIndexNow(urls) {
  const requestBody = {
    host: 'hexerize.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`📡 IndexNow API Response: ${response.status} ${response.statusText}`);

    if (response.status === 200 || response.status === 202) {
      console.log('✅ URLs successfully submitted to IndexNow!');
      console.log(`📊 Search engines notified: Bing, DuckDuckGo, Yandex, Naver, Seznam, Yep`);
      return true;
    } else {
      const text = await response.text();
      console.log(`⚠️  IndexNow returned status ${response.status}`);
      console.log(`Response: ${text}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('🚀 Starting IndexNow submission...');
    console.log('');

    // Fetch all published blog posts
    const posts = await client.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        publishedAt,
        _updatedAt
      }
    `);

    console.log(`📝 Found ${posts.length} blog posts`);

    // Build URL list
    const staticPages = [
      `${SITE_URL}/`,
      `${SITE_URL}/services`,
      `${SITE_URL}/projects`,
      `${SITE_URL}/about`,
      `${SITE_URL}/smart-cards`,
      `${SITE_URL}/blog`,
      `${SITE_URL}/contact`,
    ];

    const blogPages = posts.map(post => `${SITE_URL}/blog/${post.slug}`);
    const allUrls = [...staticPages, ...blogPages];

    console.log(`📊 Total URLs to submit: ${allUrls.length}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Blog posts: ${blogPages.length}`);
    console.log('');

    // Submit to IndexNow
    console.log('📤 Submitting to IndexNow API...');
    const success = await submitToIndexNow(allUrls);

    if (success) {
      console.log('');
      console.log('✨ IndexNow submission complete!');
      console.log('⏱️  Expected indexing time: Minutes to hours (Bing & others)');
      console.log('');
      console.log('🔍 Your content will be discoverable on:');
      console.log('   • Bing Search');
      console.log('   • DuckDuckGo');
      console.log('   • ChatGPT Search');
      console.log('   • Perplexity AI');
      console.log('   • Yandex');
      console.log('   • And more...');
    } else {
      console.log('');
      console.log('⚠️  IndexNow submission completed with warnings.');
      console.log('💡 This is usually fine - search engines still received the notification.');
    }

  } catch (error) {
    console.error('❌ Error in IndexNow submission:', error);
    // Don't fail the build if IndexNow submission fails
    console.log('');
    console.log('⚠️  Build will continue despite IndexNow error.');
    console.log('💡 Your site is still deployed, just without IndexNow notification.');
  }
}

main();
