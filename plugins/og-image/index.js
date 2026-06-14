// Docusaurus plugin: generates per-page dynamic Open Graph images (1200x630)
// and injects og:image / twitter:image / image:alt + dimensions into every
// built HTML page. Also injects JSON-LD structured data.
//
// Rendering engine: @napi-rs/canvas (node-canvas, HarfBuzz shaping) — chosen
// over Satori because the site is fully Arabic and Satori does not reliably
// shape RTL Arabic glyphs. (Takumi, requested in the brief, is a Nuxt-only
// renderer and is not available for Docusaurus.)
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const SITE_URL = 'https://uqucc-majors.sb.sa';
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Decode a few HTML entities we expect in <title>.
function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

// Recursively collect every *.html file in a directory.
function collectHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function getMeta(html, attr, value) {
  const re = new RegExp(
    `<meta[^>]*${attr}="${value}"[^>]*content="([^"]*)"[^>]*>`,
    'i'
  );
  const m = html.match(re);
  return m ? decodeEntities(m[1]) : null;
}

function getCanonical(html) {
  const m = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i);
  return m ? m[1] : null;
}

module.exports = function ogImagePlugin() {
  return {
    name: 'og-image-plugin',

    async postBuild({ outDir, routesPaths }) {
      // Lazy-require the renderer so the canvas native module is only loaded
      // during the build step.
      const { renderOgImage } = require('./render');

      const ogDir = path.join(outDir, 'img', 'og');
      fs.mkdirSync(ogDir, { recursive: true });

      const htmlFiles = collectHtmlFiles(outDir).filter(
        (f) => !f.endsWith('404.html')
      );

      let generated = 0;
      for (const file of htmlFiles) {
        let html = fs.readFileSync(file, 'utf8');

        const rawTitle = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
        const ogTitle = getMeta(html, 'property', 'og:title');
        const ogType = getMeta(html, 'property', 'og:type');
        const ogDescription =
          getMeta(html, 'property', 'og:description') ||
          getMeta(html, 'name', 'description');
        const canonical = getCanonical(html);
        if (!canonical) continue;

        // Title used on the image: prefer the post title without the site suffix.
        let imageTitle = decodeEntities(ogTitle || rawTitle || 'تخصصات الحاسب');
        imageTitle = imageTitle.replace(/\s*\|\s*تخصصات الحاسب\s*$/, '').trim();

        // Deterministic filename so rebuilds are stable / cacheable.
        const hash = crypto
          .createHash('sha1')
          .update(canonical)
          .digest('hex')
          .slice(0, 16);
        const fileName = `${hash}.png`;
        const outPath = path.join(ogDir, fileName);

        if (!fs.existsSync(outPath)) {
          const buf = await renderOgImage(imageTitle);
          fs.writeFileSync(outPath, buf);
        }
        generated++;

        const imageUrl = `${SITE_URL}/img/og/${fileName}`;
        const alt = imageTitle.replace(/"/g, '&quot;');

        const ogTags = [
          `<meta data-rh="true" property="og:image" content="${imageUrl}">`,
          `<meta data-rh="true" property="og:image:width" content="${OG_WIDTH}">`,
          `<meta data-rh="true" property="og:image:height" content="${OG_HEIGHT}">`,
          `<meta data-rh="true" property="og:image:type" content="image/png">`,
          `<meta data-rh="true" property="og:image:alt" content="${alt}">`,
          `<meta data-rh="true" name="twitter:image" content="${imageUrl}">`,
          `<meta data-rh="true" name="twitter:image:alt" content="${alt}">`,
        ].join('');

        const publishedTime = getMeta(html, 'property', 'article:published_time');
        const modifiedTime = getMeta(html, 'property', 'article:modified_time');

        // JSON-LD structured data.
        const jsonLd = buildJsonLd({
          html,
          canonical,
          imageUrl,
          ogType,
          title: imageTitle,
          description: ogDescription,
          publishedTime,
          modifiedTime,
        });

        // Remove any pre-existing (default) image tags so we don't duplicate.
        html = html
          .replace(/<meta[^>]*property="og:image(:[a-z]+)?"[^>]*>/gi, '')
          .replace(/<meta[^>]*name="twitter:image(:[a-z]+)?"[^>]*>/gi, '');

        const inject = ogTags + jsonLd;
        html = html.replace('</head>', inject + '</head>');
        fs.writeFileSync(file, html);
      }

      console.log(
        `[og-image-plugin] generated ${generated} OG images into ${path.relative(
          outDir,
          ogDir
        )}`
      );
    },
  };
};

function buildJsonLd({
  canonical,
  imageUrl,
  ogType,
  title,
  description,
  publishedTime,
  modifiedTime,
}) {
  const org = {
    '@type': 'Organization',
    name: 'تخصصات الحاسب',
    url: SITE_URL,
    logo: `${SITE_URL}/img/android-chrome-512x512.png`,
  };

  const graph = [];

  if (ogType === 'article') {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description || undefined,
      image: imageUrl,
      inLanguage: 'ar',
      datePublished: publishedTime || undefined,
      dateModified: modifiedTime || publishedTime || undefined,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      url: canonical,
      author: { '@type': 'Organization', name: 'تخصصات الحاسب' },
      publisher: org,
    });
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'الرئيسية',
          item: SITE_URL + '/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'تجارب الطلاب',
          item: SITE_URL + '/blog',
        },
        { '@type': 'ListItem', position: 3, name: title, item: canonical },
      ],
    });
  } else {
    // Home / listing / docs pages.
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'تخصصات الحاسب',
      url: SITE_URL,
      inLanguage: 'ar',
      description: description || undefined,
      publisher: org,
    });
    graph.push({ '@context': 'https://schema.org', ...org });
  }

  return graph
    .map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
    )
    .join('');
}
