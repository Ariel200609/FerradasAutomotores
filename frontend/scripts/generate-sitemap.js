import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import sanity config from project
const sanityClient = createClient({
  projectId: 'fq2dvp1o', // Updated to match src/lib/sanity.ts
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Static routes mapping from routeHelper.ts
const routeMap = {
  2: '/vehiculo/amarokv6',
  3: '/vehiculo/focus',
  5: '/vehiculo/fastback',
  6: '/vehiculo/maverik',
  7: '/vehiculo/t-cross',
  8: '/vehiculo/hilux', 
  9: '/vehiculo/amarok-highline',
  10: '/vehiculo/hiluxsrv',
  11: '/vehiculo/raptor',
  12: '/vehiculo/ecosport',
  13: '/vehiculo/up',
  14: '/vehiculo/amarokv6',
  15: '/vehiculo/frontier',
  16: '/vehiculo/hilux-srx-gris',
  17: '/vehiculo/oroch',
  18: '/vehiculo/307',
  19: '/vehiculo/mustang',
  20: '/vehiculo/amarok-highline-g2',
  21: '/vehiculo/amarok-black-style-g2',
  22: '/vehiculo/amarok-comfortline-g2',
  23: '/vehiculo/t-cross-bitono',
  24: '/vehiculo/taos',
  25: '/vehiculo/polo-track',
  26: '/vehiculo/hilux-4x4-at',
  27: '/vehiculo/hilux-srv-roja',
  28: '/vehiculo/hilux-sr-4x4-mt',
  29: '/vehiculo/hilux-DX', 
  30: '/vehiculo/hilux-dx-cs',
  31: '/vehiculo/hilux-srx-0km',
  32: '/vehiculo/bronco',
  33: '/vehiculo/ranger-xs',
  34: '/vehiculo/ranger-black-edition',
  35: '/vehiculo/ranger-limited-v6',
  36: '/vehiculo/toro-270-vulcano',
  37: '/vehiculo/ram-rampage',
};

async function generateSitemap() {
  console.log('Generando sitemap...');
  
  const siteUrl = 'https://ferradasautomotores.com';
  
  // Core routes
  const urls = [
    { loc: '/', priority: 1.0 },
    { loc: '/vehiculos', priority: 0.9 },
    { loc: '/consultar', priority: 0.8 },
    { loc: '/comparar', priority: 0.7 },
    { loc: '/contact', priority: 0.7 },
  ];

  try {
    // Fetch all vehicles from Sanity
    const query = `*[_type == "vehicle"]{ id, slug, _updatedAt }`;
    const vehicles = await sanityClient.fetch(query);

    vehicles.forEach((vehicle) => {
      let route = '';
      
      // If it has a static ID and exists in map
      if (vehicle.slug?.current && vehicle.slug.current.startsWith('static-')) {
        const staticId = parseInt(vehicle.slug.current.replace('static-', ''));
        if (routeMap[staticId]) {
          route = routeMap[staticId];
        }
      } else if (vehicle.id && routeMap[vehicle.id]) {
        route = routeMap[vehicle.id];
      } 
      // If it's a dynamic sanity vehicle
      else if (vehicle.slug?.current) {
        route = `/vehiculo/sanity/${vehicle.slug.current}`;
      }

      if (route) {
        // Prevent duplicates
        if (!urls.find(u => u.loc === route)) {
          urls.push({
            loc: route,
            priority: 0.8,
            lastmod: vehicle._updatedAt ? vehicle._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0]
          });
        }
      }
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const publicPath = path.join(__dirname, '../public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemapContent);
    console.log(`✅ Sitemap generado exitosamente con ${urls.length} URLs.`);
  } catch (error) {
    console.error('Error generando sitemap:', error);
  }
}

generateSitemap();
