// Renders a 1200x630 branded Open Graph image with correct Arabic (RTL) text
// shaping using @napi-rs/canvas + bundled Noto Kufi Arabic fonts.
//
// We use node canvas (HarfBuzz-backed shaping) rather than Satori because the
// site is fully Arabic, and Satori does not reliably shape/join Arabic glyphs.
const path = require('path');
const fs = require('fs');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');

const FONT_BOLD = path.join(__dirname, 'fonts', 'NotoKufiArabic-Bold.ttf');
const FONT_REGULAR = path.join(__dirname, 'fonts', 'NotoKufiArabic-Regular.ttf');
const FONT_LATIN = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');
const FONT_LATIN_BOLD = path.join(__dirname, 'fonts', 'DejaVuSans-Bold.ttf');
const LOGO = path.join(__dirname, 'assets', 'logo.png');

// Font stacks: Arabic primary, Latin fallback (for Latin chars / domain).
const STACK_BOLD = 'OGKufiBold, OGLatinBold';
const STACK_REGULAR = 'OGKufi, OGLatin';

let fontsRegistered = false;
function registerFonts() {
  if (fontsRegistered) return;
  if (fs.existsSync(FONT_BOLD)) GlobalFonts.registerFromPath(FONT_BOLD, 'OGKufiBold');
  if (fs.existsSync(FONT_REGULAR)) GlobalFonts.registerFromPath(FONT_REGULAR, 'OGKufi');
  if (fs.existsSync(FONT_LATIN)) GlobalFonts.registerFromPath(FONT_LATIN, 'OGLatin');
  if (fs.existsSync(FONT_LATIN_BOLD)) GlobalFonts.registerFromPath(FONT_LATIN_BOLD, 'OGLatinBold');
  fontsRegistered = true;
}

const WIDTH = 1200;
const HEIGHT = 630;
const BRAND = 'تخصصات الحاسب';
const SITE = 'uqucc-majors.sb.sa';

// Wrap RTL text into lines that fit a max width.
function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? current + ' ' + word : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function renderOgImage(title) {
  registerFonts();
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background gradient (dark brand palette).
  const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  grad.addColorStop(0, '#0a0a23');
  grad.addColorStop(1, '#141452');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Accent bar on the right (RTL leading edge).
  ctx.fillStyle = '#4f8cff';
  ctx.fillRect(WIDTH - 16, 0, 16, HEIGHT);

  ctx.direction = 'rtl';
  ctx.textAlign = 'right';
  const rightEdge = WIDTH - 90;
  const maxTextWidth = WIDTH - 180;

  // Brand label (top).
  ctx.fillStyle = '#9fb8ff';
  ctx.font = `36px ${STACK_REGULAR}`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(BRAND, rightEdge, 110);

  // Title (center block, wrapped). Normalise dash variants to a spaced dash so
  // they render with the Latin fallback rather than tofu.
  const cleanTitle = (title || BRAND)
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  ctx.fillStyle = '#ffffff';
  let fontSize = 76;
  let lines = [];
  // Shrink font until it fits within max 4 lines.
  for (; fontSize >= 44; fontSize -= 4) {
    ctx.font = `${fontSize}px ${STACK_BOLD}`;
    lines = wrapText(ctx, cleanTitle, maxTextWidth);
    if (lines.length <= 4) break;
  }
  ctx.font = `${fontSize}px ${STACK_BOLD}`;
  const lineHeight = fontSize * 1.4;
  const blockHeight = lines.length * lineHeight;
  let y = (HEIGHT - blockHeight) / 2 + fontSize;
  for (const line of lines) {
    ctx.fillText(line, rightEdge, y);
    y += lineHeight;
  }

  // Footer (site URL, LTR domain anchored to the left).
  ctx.direction = 'ltr';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9fb8ff';
  ctx.font = `30px ${STACK_REGULAR}`;
  ctx.fillText(SITE, 90, HEIGHT - 70);

  // Logo (bottom-right).
  if (fs.existsSync(LOGO)) {
    try {
      const logo = await loadImage(LOGO);
      const size = 96;
      ctx.drawImage(logo, rightEdge - size, HEIGHT - 70 - size + 24, size, size);
    } catch (e) {
      // non-fatal
    }
  }

  return canvas.encode('png');
}

module.exports = { renderOgImage, WIDTH, HEIGHT };
