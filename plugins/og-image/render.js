// Renders a 1200x630 branded Open Graph image that matches the live site's
// dark theme ("تخصصات الحاسب"): a near-black warm-stone canvas, a faint dotted
// glow + circuit motif, the cream/gold logo lockup, a subtle category pill, and
// the dynamic page title in IBM Plex Sans Arabic. A dedicated `home` variant
// renders the brand hero used for the site root.
//
// Uses @napi-rs/canvas (HarfBuzz shaping) so Arabic RTL text joins correctly
// (Satori does not shape Arabic reliably).
const path = require('path');
const fs = require('fs');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');

const FONTS = path.join(__dirname, 'fonts');
// Cream/gold lockup suited to a dark canvas (mirrors the site's dark navbar logo).
const LOGO_LOCKUP = path.join(__dirname, 'assets', 'logo-lockup-dark.png');

// Dark theme palette — sourced from src/css/custom.css html[data-theme='dark'].
const BG = '#0c0a09'; // --ifm-background-color
const SURFACE = '#1c1917'; // --ifm-background-surface-color
const SURFACE_2 = '#292524'; // --ifm-color-emphasis-200 (badge bg)
const BORDER = '#44403c'; // --ifm-color-emphasis-300
const INK = '#f5f5f4'; // near-white heading text
const INK_SOFT = '#d6d3d1'; // --ifm-color-emphasis-700
const MUTED = '#a8a29e'; // --site-text-muted
const GOLD = '#D6B15B'; // brand accent (logo gold)

const STACK_BOLD = 'PlexArBold, OGLatinBold';
const STACK_SEMI = 'PlexArSemi, OGLatin';
const STACK_MED = 'PlexArMed, OGLatin';

let fontsRegistered = false;
function registerFonts() {
  if (fontsRegistered) return;
  const reg = (file, family) => {
    const p = path.join(FONTS, file);
    if (fs.existsSync(p)) GlobalFonts.registerFromPath(p, family);
  };
  reg('IBMPlexSansArabic-Bold.ttf', 'PlexArBold');
  reg('IBMPlexSansArabic-SemiBold.ttf', 'PlexArSemi');
  reg('IBMPlexSansArabic-Medium.ttf', 'PlexArMed');
  reg('IBMPlexSansArabic-Regular.ttf', 'PlexArReg');
  reg('DejaVuSans.ttf', 'OGLatin');
  reg('DejaVuSans-Bold.ttf', 'OGLatinBold');
  fontsRegistered = true;
}

const WIDTH = 1200;
const HEIGHT = 630;
const SITE = 'uqucc-majors.sb.sa';
const TAGLINE = 'دليلك المختصر لاختيار تخصصك في كلية الحاسبات';

function routePath(ctx, pts, color, width) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
  ctx.restore();
}

function dotGrid(ctx, x, y, cols, rows, gap, r, color) {
  ctx.save();
  ctx.fillStyle = color;
  for (let c = 0; c < cols; c++) {
    for (let rr = 0; rr < rows; rr++) {
      ctx.beginPath();
      ctx.arc(x + c * gap, y + rr * gap, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

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

// Paints the shared dark canvas: warm-near-black fill, an even dotted glow
// (mirrors the Hero .glow), and faint circuit traces in the corners.
function paintBackground(ctx) {
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Even dotted texture, like the homepage hero glow (rgba(255,255,255,0.04)).
  ctx.save();
  ctx.fillStyle = 'rgba(245,245,244,0.045)';
  for (let y = 26; y < HEIGHT; y += 26) {
    for (let x = 26; x < WIDTH; x += 26) {
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // Faint circuit motif (top-left + bottom-right) — brand texture in light ink.
  const faint = 'rgba(245,245,244,0.10)';
  routePath(ctx, [[-20, 60], [150, 60], [185, 95], [300, 95]], faint, 4);
  routePath(ctx, [[-20, 120], [90, 120], [120, 150], [360, 150], [395, 115], [470, 115]], faint, 4);
  const ring = (x, y, color) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };
  ring(300, 95, faint);
  ring(470, 115, faint);
  dotGrid(ctx, 55, 150, 3, 3, 22, 4.5, 'rgba(214,177,91,0.55)');

  routePath(ctx, [[1240, 500], [1090, 500], [1055, 535], [930, 535]], faint, 4);
  dotGrid(ctx, 1095, 560, 4, 3, 16, 3.5, 'rgba(214,177,91,0.4)');
}

// Draws the cream/gold logo lockup with its top-right corner at (right, top),
// scaled to the given height. Returns the drawn width (0 if missing).
async function drawLockup(ctx, right, top, height) {
  if (!fs.existsSync(LOGO_LOCKUP)) return 0;
  try {
    const logo = await loadImage(LOGO_LOCKUP);
    const w = (logo.width / logo.height) * height;
    ctx.drawImage(logo, right - w, top, w, height);
    return w;
  } catch (e) {
    return 0;
  }
}

// Bottom-left footer: a stone globe disc + the site domain (LTR).
function drawFooter(ctx) {
  const gcx = 96;
  const gcy = HEIGHT - 70;
  ctx.save();
  ctx.fillStyle = SURFACE_2;
  ctx.beginPath();
  ctx.arc(gcx, gcy, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(gcx, gcy, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(gcx, gcy, 6, 14, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(gcx - 14, gcy);
  ctx.lineTo(gcx + 14, gcy);
  ctx.stroke();
  ctx.restore();

  ctx.direction = 'ltr';
  ctx.textAlign = 'left';
  ctx.fillStyle = MUTED;
  ctx.font = `30px ${STACK_MED}`;
  ctx.fillText(SITE, gcx + 38, gcy + 10);
}

// Brand hero used for the site root: centered logo lockup + tagline.
async function renderHome(ctx) {
  // Centered logo lockup (includes the brand tagline beneath the wordmark).
  if (fs.existsSync(LOGO_LOCKUP)) {
    try {
      const logo = await loadImage(LOGO_LOCKUP);
      const h = 188;
      const w = (logo.width / logo.height) * h;
      ctx.drawImage(logo, (WIDTH - w) / 2, 150, w, h);
    } catch (e) {
      /* non-fatal */
    }
  }

  // Gold accent rule with terminal dots, centered under the lockup.
  const ay = 396;
  ctx.save();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2 - 90, ay);
  ctx.lineTo(WIDTH / 2 + 90, ay);
  ctx.stroke();
  ctx.fillStyle = GOLD;
  [-90, 90].forEach((dx) => {
    ctx.beginPath();
    ctx.arc(WIDTH / 2 + dx, ay, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // Descriptive subtitle, centered.
  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = INK_SOFT;
  ctx.font = `36px ${STACK_MED}`;
  ctx.fillText(TAGLINE, WIDTH / 2, 470);

  drawFooter(ctx);
}

// Standard per-page layout: logo (top-right), category pill, wrapped title.
async function renderPage(ctx, title, eyebrow) {
  await drawLockup(ctx, 1128, 60, 92);

  const rightEdge = 1128;
  const titleRight = 1128;

  // --- category pill (right-aligned) — subtle stone surface, gold glyph ---
  ctx.direction = 'rtl';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `30px ${STACK_SEMI}`;
  const pillText = eyebrow;
  const tw = ctx.measureText(pillText).width;
  const padX = 28;
  const barsW = 34;
  const pillH = 56;
  const pillW = tw + padX * 2 + barsW;
  const pillY = 196;
  const pillX = rightEdge - pillW;
  const r = pillH / 2;
  ctx.save();
  ctx.fillStyle = SURFACE_2;
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pillX + r, pillY);
  ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, r);
  ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, r);
  ctx.arcTo(pillX, pillY + pillH, pillX, pillY, r);
  ctx.arcTo(pillX, pillY, pillX + pillW, pillY, r);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = INK;
  ctx.fillText(pillText, rightEdge - padX, pillY + pillH / 2 + 10);
  // ascending bar-chart glyph (gold) at the leading (left) side of the pill
  ctx.save();
  ctx.fillStyle = GOLD;
  const bx = pillX + padX - 2;
  const bb = pillY + pillH - 18;
  [10, 17, 24].forEach((bh, i) => {
    ctx.fillRect(bx + i * 9, bb - bh, 6, bh);
  });
  ctx.restore();

  // thin divider under the pill
  ctx.save();
  ctx.strokeStyle = 'rgba(245,245,244,0.14)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rightEdge, pillY + pillH + 26);
  ctx.lineTo(560, pillY + pillH + 26);
  ctx.stroke();
  ctx.restore();

  // --- title (right-aligned RTL) sized to fit a fixed vertical band ---
  const clean = (title || 'تخصصات الحاسب').replace(/[‐-―]/g, '-').replace(/\s+/g, ' ').trim();
  const maxTextWidth = 920;
  const bandTop = 300;
  const bandBottom = 548;
  const bandH = bandBottom - bandTop;
  let fontSize = 64;
  let lines = [];
  for (; fontSize >= 38; fontSize -= 2) {
    ctx.font = `${fontSize}px ${STACK_BOLD}`;
    lines = wrapText(ctx, clean, maxTextWidth);
    if (lines.length <= 4 && lines.length * fontSize * 1.3 <= bandH) break;
  }
  if (lines.length > 4) lines = lines.slice(0, 4);
  ctx.font = `${fontSize}px ${STACK_BOLD}`;
  ctx.fillStyle = INK;
  const lineHeight = fontSize * 1.3;
  const blockH = lines.length * lineHeight;
  let y = bandTop + fontSize + Math.max(0, (bandH - blockH) / 2);
  for (const line of lines) {
    ctx.fillText(line, titleRight, y);
    y += lineHeight;
  }

  // gold underline accent with a dot at the (left) terminus
  const underY = y - lineHeight + 30;
  ctx.save();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(titleRight, underY);
  ctx.lineTo(titleRight - 200, underY);
  ctx.stroke();
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(titleRight - 200, underY, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  drawFooter(ctx);
}

async function renderOgImage(title, opts = {}) {
  registerFonts();
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  paintBackground(ctx);

  if (opts.variant === 'home') {
    await renderHome(ctx);
  } else {
    await renderPage(ctx, title, opts.eyebrow || 'دليل التخصصات');
  }

  return canvas.encode('png');
}

module.exports = { renderOgImage, WIDTH, HEIGHT };
