const fs = require('fs');
const path = require('path');

// URL de production - à adapter avec ton vrai domaine
const SITE_URL = 'https://thomaspretre.fr';

const albumsPath = path.join(__dirname, '../src/data/albums.js');
const albumsContent = fs.readFileSync(albumsPath, 'utf-8');

// Un album a "title" juste après son "id" (une photo a "src"), ce qui exclut les ids de photos
const idMatches = [...albumsContent.matchAll(/"id":\s*"([^"]+)",\s*"title":/g)];
const albumIds = [...new Set(idMatches.map(m => m[1]))];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/gallery', priority: '0.9', changefreq: 'weekly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
];

const albumPages = albumIds.map(id => ({
  url: `/gallery/${encodeURIComponent(id)}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allPages = [...staticPages, ...albumPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap généré avec ${allPages.length} URLs → public/sitemap.xml`);
console.log(`   Albums détectés : ${albumIds.join(', ')}`);