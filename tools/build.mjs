#!/usr/bin/env node
/*
 * Generates the static pages that depend on js/data.js:
 *   <id>/index.html      one page per service, served at <site>/<id>/
 *   404.html             "page not found" page for GitHub Pages
 *   sitemap.xml, robots.txt
 *   the business info (JSON-LD) block inside index.html
 *
 * Run after editing js/data.js or the shared parts of index.html:
 *   node tools/build.mjs
 * No dependencies — just Node 18+.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, content) => {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), content);
};

// Load the browser scripts in a sandbox to reuse the same data and artwork.
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(read('js/data.js'), sandbox);
vm.runInContext(read('js/scenes.js'), sandbox);
const S = sandbox.window.SITE;
const ART = sandbox.window.ART;
const B = S.business;

const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const siteUrl = (B.siteUrl || '').replace(/\/?$/, '/');
const basePath = siteUrl ? new URL(siteUrl).pathname : '/';
const tel = 'tel:' + B.phone.replace(/[^\d+]/g, '');
const money = (n) => '$' + (n < 10 && n % 1 ? n.toFixed(2) : Math.round(n).toLocaleString('en-US'));
const unitShort = (s) => s.unit === 'hours' ? 'hr' : s.unit === 'windows' ? 'window' : s.unit.split(' of ')[0];

/* ---------- Pull shared blocks out of index.html ---------- */
const index = read('index.html');
const block = (re, name) => {
  const m = index.match(re);
  if (!m) throw new Error(`Could not find ${name} in index.html`);
  return m[0];
};
const section = (id) => block(new RegExp(`<section[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?</section>`), `section #${id}`);
const shared = {
  topbar: block(/<div class="topbar">[\s\S]*?\n {2}<\/div>/, 'top bar'),
  header: block(/<header class="site-header"[\s\S]*?<\/header>/, 'header'),
  footer: block(/<footer class="site-footer">[\s\S]*?<\/footer>/, 'footer'),
  mobileBar: block(/<div class="mobile-bar">[\s\S]*?<\/div>/, 'mobile bar'),
  dialog: block(/<dialog id="review-dialog"[\s\S]*?<\/dialog>/, 'review dialog'),
  toast: block(/<div class="toast"[^>]*><\/div>/, 'toast'),
  estimate: section('estimate'),
  projects: section('projects'),
  reviews: section('reviews'),
  cta: block(/<section class="cta-banner">[\s\S]*?<\/section>/, 'CTA banner'),
  faq: section('faq'),
  contact: section('contact')
};

// Fill in business details so pages read correctly before (or without) JavaScript.
const fillBindings = (html) => html
  .replace(/<(\w+)([^>]*) data-bind="(\w+)"([^>]*)><\/\1>/g, (_, tag, a, key, b) => `<${tag}${a} data-bind="${key}"${b}>${esc(B[key] ?? '')}</${tag}>`)
  .replace(/data-bind-href="tel" href="#"/g, `data-bind-href="tel" href="${tel}"`)
  .replace(/data-bind-href="mailto" href="#"/g, `data-bind-href="mailto" href="mailto:${esc(B.email)}"`);

// On sub-pages, point "#section" links at the home page unless the section exists on this page.
const fixLinks = (html) => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  return html.replace(/href="#([\w-]+)"/g, (m, id) => (ids.has(id) ? m : `href="../index.html#${id}"`));
};

/* ---------- Structured data for search engines ---------- */
const businessLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: B.name,
  description: B.tagline,
  telephone: B.phone,
  email: B.email,
  address: B.address,
  areaServed: B.serviceArea,
  openingHours: B.hours,
  ...(siteUrl && { url: siteUrl }),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Home improvement services',
    itemListElement: S.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.blurb, ...(siteUrl && { url: `${siteUrl}${s.id}/` }) }
    }))
  }
};
const ldScript = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

const indexOut = index.replace(
  /<!-- build:jsonld -->[\s\S]*?<!-- \/build:jsonld -->/,
  `<!-- build:jsonld -->\n  ${siteUrl ? `<link rel="canonical" href="${siteUrl}">\n  ` : ''}${ldScript(businessLd).replace(/\n/g, '\n  ')}\n  <!-- /build:jsonld -->`
);
if (indexOut === index && !index.includes('<!-- build:jsonld -->')) throw new Error('index.html is missing the <!-- build:jsonld --> marker');
write('index.html', indexOut);

/* ---------- Service pages ---------- */
const head = ({ title, description, path, extra = '' }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta name="theme-color" content="#315c49">${siteUrl ? `\n  <link rel="canonical" href="${siteUrl}${path}">` : ''}
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M16 3 3 14h4v14h18V14h4z' fill='%23315c49'/%3E%3Crect x='13' y='18' width='6' height='10' fill='%23dd7656'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">${extra}
</head>`;

const fallbackScene = { roofing: 'exterior', siding: 'exterior', windows: 'room', basement: 'room', handyman: 'room' };
const categoryLabel = { outdoor: 'Outdoor living', painting: 'Painting', remodeling: 'Remodeling', interior: 'Interior', exterior: 'Exterior' };

function servicePage(s) {
  const d = (S.serviceDetails || {})[s.id] || {};
  const project = S.projects.find((p) => p.service === s.id);
  const media = d.photo
    ? `<img src="../${esc(d.photo)}" alt="${esc(s.name)} by ${esc(B.name)}">`
    : ART.scene(project ? project.scene : fallbackScene[s.id] || 'room', true);
  const firstTier = Object.values(s.tiers)[0];
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: d.intro || s.blurb,
    areaServed: B.serviceArea,
    provider: { '@type': 'HomeAndConstructionBusiness', name: B.name, telephone: B.phone, address: B.address },
    offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: firstTier[0], description: `Starting at ${money(firstTier[0])} per ${unitShort(s)}` }
  };

  const main = `
    <section class="svc-hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="container svc-hero-inner">
        <div class="svc-hero-copy">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span aria-hidden="true">/</span><a href="../index.html#services">Services</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.name)}</span></nav>
          <p class="eyebrow">${esc(categoryLabel[s.category] || 'Services')} · ${esc(B.serviceArea[0])} &amp; nearby</p>
          <h1>${esc(s.name)}</h1>
          <p class="lead">${esc(d.intro || s.blurb)}</p>
          <ul class="hero-points">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
          <div class="hero-actions">
            <a class="btn btn-accent btn-lg" href="#estimate">Estimate my project</a>
            <a class="btn btn-ghost btn-lg" data-bind-href="tel" href="#"><span>Call <span data-bind="phone"></span></span></a>
          </div>
        </div>
        <div class="svc-media">
          ${media}
          <div class="svc-badge"><span class="service-icon">${ART.icon(s.icon)}</span><div><strong>From ${money(firstTier[0])}/${unitShort(s)}</strong><small>Free on-site quote</small></div></div>
        </div>
      </div>
    </section>

    <section class="section" id="included">
      <div class="container included-layout">
        <div>
          <p class="eyebrow">What's included</p>
          <h2>Everything handled, start to finish</h2>
          <ul class="included-list">${(d.included || s.bullets).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        </div>
        <aside class="price-card">
          <h3>Typical pricing</h3>
          <table>
            <thead><tr><th scope="col">Level</th><th scope="col">Per ${esc(unitShort(s))}</th></tr></thead>
            <tbody>${Object.entries(s.tiers).map(([name, [lo, hi]]) => `<tr><th scope="row">${esc(name)}<small>${esc(s.tierNotes[name] || '')}</small></th><td>${money(lo)}–${money(hi)}</td></tr>`).join('')}</tbody>
          </table>
          ${d.timeline ? `<p class="timeline"><strong>Timeline:</strong> ${esc(d.timeline)}</p>` : ''}
          <a class="btn btn-primary btn-block" href="#estimate">Build my estimate</a>
        </aside>
      </div>
    </section>

    ${shared.estimate}

    ${shared.projects}

    ${shared.reviews}

    ${shared.cta}

    ${shared.faq}

    ${shared.contact}

    <section class="section" id="services">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">More services</p>
          <h2>Explore our other services</h2>
        </div>
        <div class="service-grid" id="service-grid"></div>
      </div>
    </section>`;

  const html = `${head({
    title: `${s.name} | ${B.name}`,
    description: `${s.blurb} Serving ${B.serviceArea.slice(0, 4).join(', ')} and nearby. Get an instant estimate.`,
    path: `${s.id}/`,
    extra: `\n  ${ldScript(serviceLd).replace(/\n/g, '\n  ')}`
  })}
<body data-service="${s.id}" data-base="../">
  <!-- Generated by tools/build.mjs from js/data.js and index.html. Edit those, then re-run the build. -->
  <a class="skip-link" href="#main">Skip to content</a>

  ${shared.topbar}

  ${shared.header}

  <main id="main">${main}
  </main>

  ${shared.footer}

  ${shared.mobileBar}

  ${shared.dialog}

  ${shared.toast}

  <script src="../js/data.js"></script>
  <script src="../js/scenes.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
`;
  return fillBindings(fixLinks(html))
    .replace(/(href|src)="(css|js|images)\//g, '$1="../$2/')
    .replace(/<a class="brand([^"]*)" href="#top"/g, '<a class="brand$1" href="../index.html"');
}

// Each service gets its own folder so its address is <site>/<id>/.
const reserved = new Set(['css', 'js', 'images', 'tools', 'services', '.github', 'node_modules']);
const generated = (dir) => { try { return read(join(dir, 'index.html')).includes('Generated by tools/build.mjs'); } catch { return false; } };
S.services.forEach((s) => {
  if (!/^[a-z0-9-]+$/.test(s.id) || reserved.has(s.id)) throw new Error(`Service id "${s.id}" can't be used as a folder name`);
});
// Remove pages from services that were renamed or deleted, and the old services/ folder layout
readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && generated(d.name))
  .forEach((d) => rmSync(join(root, d.name), { recursive: true, force: true }));
rmSync(join(root, 'services'), { recursive: true, force: true });
S.services.forEach((s) => write(`${s.id}/index.html`, servicePage(s)));

/* ---------- 404 page ---------- */
write('404.html', fillBindings(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found | ${esc(B.name)}</title>
  <meta name="robots" content="noindex">
  <base href="${basePath}">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main class="not-found">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container">
      <p class="eyebrow">Error 404</p>
      <h1>This page is under renovation.</h1>
      <p class="lead">We couldn't find the page you were looking for. Try one of these instead:</p>
      <div class="hero-actions">
        <a class="btn btn-accent btn-lg" href="index.html">Go to the home page</a>
        <a class="btn btn-ghost btn-lg" href="index.html#estimate">Get an estimate</a>
        <a class="btn btn-ghost btn-lg" data-bind-href="tel" href="#"><span>Call <span data-bind="phone"></span></span></a>
      </div>
      <ul class="chips">${S.services.map((s) => `<li><a href="${s.id}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
  </main>
</body>
</html>
`));

/* ---------- Sitemap & robots ---------- */
if (siteUrl) {
  const urls = ['', ...S.services.map((s) => `${s.id}/`)];
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteUrl}${u}</loc></url>`).join('\n')}
</urlset>
`);
}
write('robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}sitemap.xml\n` : ''}`);

console.log(`Built ${S.services.length} service pages, 404.html, ${siteUrl ? 'sitemap.xml, ' : ''}robots.txt`);
