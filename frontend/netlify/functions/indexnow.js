/**
 * Netlify Function: IndexNow Submission
 *
 * Automatically submits URLs to IndexNow API for instant indexing
 * on Bing, DuckDuckGo, Yandex, and other participating search engines.
 *
 * Triggered after successful builds to notify search engines of new/updated content.
 */

const https = require('https');

// Your IndexNow API Key
const INDEXNOW_KEY = '34202a6136cc99d4081dcd6ac98aa3319aabe06b4db88c7e0dce6c6b12627072';

// Your site URL
const SITE_URL = 'https://hexerize.com';

/**
 * Submit URLs to IndexNow API
 * @param {string[]} urls - Array of URLs to submit
 * @returns {Promise<object>} Response from IndexNow
 */
async function submitToIndexNow(urls) {
  // IndexNow API endpoint (using Bing's endpoint)
  const indexNowUrl = 'api.indexnow.org';

  // Prepare the request body
  const requestBody = JSON.stringify({
    host: 'hexerize.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: indexNowUrl,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('IndexNow Response Status:', res.statusCode);
        console.log('IndexNow Response:', data);

        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve({
            success: true,
            statusCode: res.statusCode,
            message: 'URLs submitted successfully to IndexNow',
            submittedUrls: urls
          });
        } else {
          resolve({
            success: false,
            statusCode: res.statusCode,
            message: 'IndexNow submission completed with non-200 status',
            response: data
          });
        }
      });
    });

    req.on('error', (error) => {
      console.error('IndexNow Error:', error);
      reject(error);
    });

    req.write(requestBody);
    req.end();
  });
}

/**
 * Netlify Function Handler
 */
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');
    const urls = body.urls || [];

    // Validate URLs
    if (!Array.isArray(urls) || urls.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Invalid request. Provide an array of URLs.',
          example: { urls: ['https://hexerize.com/blog/post-slug'] }
        })
      };
    }

    // Limit to 10,000 URLs per request (IndexNow limit)
    if (urls.length > 10000) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Too many URLs. Maximum 10,000 URLs per request.'
        })
      };
    }

    console.log(`📤 Submitting ${urls.length} URLs to IndexNow...`);
    console.log('URLs:', urls);

    // Submit to IndexNow
    const result = await submitToIndexNow(urls);

    console.log('✅ IndexNow submission complete:', result);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: `Successfully submitted ${urls.length} URLs to IndexNow`,
        details: result,
        searchEngines: [
          'Bing',
          'DuckDuckGo',
          'Yandex',
          'Naver',
          'Seznam.cz',
          'Yep'
        ]
      })
    };

  } catch (error) {
    console.error('❌ Error in IndexNow function:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
