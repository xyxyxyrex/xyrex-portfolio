const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const build = path.resolve(__dirname, '../build');
const origin = 'https://xyrex-portfolio.vercel.app';
const html = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const dom = new JSDOM(html); // Scripts are deliberately disabled: test the initial response.
const doc = dom.window.document;
const meta = (selector) => doc.querySelector(selector)?.content;
assert.equal(doc.documentElement.lang, 'en');
assert.equal(doc.title, 'Xyrex Dev | Web Developer & Creative Portfolio');
assert.match(meta('meta[name="description"]'), /Xyrex Kyle Salazar is a web developer/);
assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
assert.equal(doc.querySelector('link[rel="canonical"]').href, `${origin}/`);
assert.equal(meta('meta[property="og:url"]'), `${origin}/`);
assert.equal(meta('meta[property="og:title"]'), doc.title);
assert.equal(meta('meta[name="twitter:card"]'), 'summary_large_image');
assert(!/noindex/i.test(meta('meta[name="robots"]') || ''));
assert(!html.includes('%PUBLIC_URL%'), 'Unresolved public URL');
const app = doc.querySelector('#root[data-prerendered="true"]');
assert(app?.querySelector('main'), 'The main content must exist without JavaScript');
assert.equal(app.querySelectorAll('h1').length, 1);
assert.equal(app.querySelector('h1').textContent, 'Xyrex Kyle Salazar');
assert.match(app.textContent, /WEB DEVELOPER & CREATIVE/);
assert.match(app.textContent, /As Xyrex Dev, I build web and desktop applications/);
for (const id of ['home', 'about', 'projects', 'skills', 'contact']) {
  assert(app.querySelector(`#${id}`), `Missing section: ${id}`);
  assert(app.querySelector(`nav a[href="#${id}"]`), `Missing navigation link: ${id}`);
}
for (const title of ['Parity', 'SpotiTauri', 'Memora-AI', 'CareFind', 'Cléa', 'Design Projects']) {
  assert(app.textContent.includes(title), `Missing crawlable work: ${title}`);
}
assert(!app.querySelector('.hero-intro').getAttribute('style')?.includes('opacity:0'));
assert(!app.querySelector('.hero-portrait').getAttribute('style')?.includes('opacity:0'));
assert.equal(app.querySelectorAll('.project-sign').length, 11);
const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
const website = graph.find((item) => item['@type'] === 'WebSite');
const person = graph.find((item) => item['@type'] === 'Person');
const profile = graph.find((item) => item['@type'] === 'ProfilePage');
assert.equal(website.name, 'Xyrex');
assert.equal(website.alternateName, 'Xyrex Dev');
assert.equal(person.name, app.querySelector('h1').textContent);
assert.equal(profile.mainEntity['@id'], person['@id']);
assert(person.sameAs.includes('https://github.com/xyxyxyrex'));
assert.equal(meta('meta[property="og:image"]'), `${origin}/assets/xyrex-social.png`);
const png = fs.readFileSync(path.join(build, 'assets/xyrex-social.png'));
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
// All static local assets and all fragment destinations must resolve.
for (const element of doc.querySelectorAll('[src], link[href], a[href^="#"]')) {
  const value = element.getAttribute('src') || element.getAttribute('href');
  if (value.startsWith('#')) assert(doc.getElementById(value.slice(1)), `Broken fragment: ${value}`);
  if (value.startsWith('/') && !value.startsWith('//')) assert(fs.existsSync(path.join(build, decodeURIComponent(value))), `Missing asset: ${value}`);
}
const hero = app.querySelector('.hero-portrait img');
const preload = doc.querySelector('link[rel="preload"][as="image"]');
assert.equal(hero.getAttribute('srcset'), preload.getAttribute('imagesrcset'));
assert.equal(hero.getAttribute('sizes'), preload.getAttribute('imagesizes'));
for (const entry of hero.getAttribute('srcset').split(',')) {
  assert(fs.existsSync(path.join(build, entry.trim().split(' ')[0])));
}
const robots = fs.readFileSync(path.join(build, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(!/Disallow:\s*\/\s*$/m.test(robots));
const sitemap = new JSDOM(fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8'), { contentType: 'text/xml' });
assert.deepEqual([...sitemap.window.document.querySelectorAll('loc')].map((el) => el.textContent), [`${origin}/`]);
const manifest = JSON.parse(fs.readFileSync(path.join(build, 'manifest.json'), 'utf8'));
assert.equal(manifest.short_name, 'Xyrex');
for (const icon of manifest.icons) assert(fs.existsSync(path.join(build, icon.src)));
const notFound = new JSDOM(fs.readFileSync(path.join(build, '404.html'), 'utf8'));
assert.equal(notFound.window.document.querySelector('meta[name="robots"]').content, 'noindex');
assert(!fs.existsSync(path.join(build, '.prerender.cjs')), 'Never publish the server bundle');
dom.window.close();
sitemap.window.close();
notFound.window.close();
console.log('SEO checks passed: pre-rendered content, metadata, schema, images, navigation, sitemap, robots, icons, and 404 page.');
