import { writeFileSync, mkdirSync, readFileSync, cpSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  }
];

console.log('🚀 Generating static HTML files for each route...');

routes.forEach(route => {
  // Replace meta tags with route-specific values
  let html = baseHTML;

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace description
  html = html.replace(
    /<meta name="description" content=".*?"\/>/,
    `<meta name="description" content="${route.description}"/>`
  );

  // Add canonical tag
  html = html.replace(
    /<!-- Canonical URL - Dynamically set by React useSEO hook -->/,
    `<link rel="canonical" href="${route.canonical}"/>`
  );

  // Create directory if needed
  const dirPath = `${__dirname}/../dist/${route.path}`;
  mkdirSync(dirPath, { recursive: true });

  // Write index.html to the route directory
  writeFileSync(`${dirPath}/index.html`, html);
  console.log(`✅ Generated: /${route.path}/index.html`);
});

console.log('✨ All route HTML files generated successfully!');
