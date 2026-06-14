// Renders a 1200x630 branded Open Graph image matching the "تخصصات الحاسب"
// brand: cream canvas, faint circuit-path motif, the git-branch brand mark,
// the composited logo lockup, a gold category pill, and the dynamic post title
// in IBM Plex Sans Arabic. Uses @napi-rs/canvas (HarfBuzz shaping) so Arabic
// RTL text joins correctly (Satori does not shape Arabic reliably).
const path = require('path');
const fs = require('fs');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');

const FONTS = path.join(__dirname, 'fonts');
const LOGO_LOCKUP = path.join(__dirname, 'assets', 'logo-lockup.png');

// Brand palette
const GREEN = '#0E3B38';
const GOLD = '#D6B15B';
const CREAM = '#FBF7F0';

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

// Draw the git-branch brand mark in a `size` box with top-left at (x, y).
// Geometry mirrors static/img/brand-mark.svg (viewBox 0 0 64 64).
function drawMark(ctx, x, y, size, green, gold) {
  const s = size / 64;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = green;
  ctx.lineWidth = 5.5;
  ctx.beginPath();
  ctx.moveTo(36.5, 19);
  ctx.bezierCurveTo(39, 28, 43, 34, 44, 45.5);
  ctx.stroke();
  ctx.strokeStyle = gold;
  ctx.beginPath();
  ctx.moveTo(40.5, 30);
  ctx.bezierCurveTo(33, 39, 28, 44, 25, 44.6);
  ctx.stroke();
  ctx.lineWidth = 5;
  const ring = (rx, ry, col) => {
    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.arc(rx, ry, 6.3, 0, Math.PI * 2);
    ctx.stroke();
  };
  ring(36, 12.6, green);
  ring(44.6, 51.6, green);
  ring(18.8, 44.8, gold);
  ctx.restore();
}

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

async function renderOgImage(title, opts = {}) {
  registerFonts();
  const eyebrow = opts.eyebrow || 'دليل التخصصات';
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Cream canvas
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // --- faint circuit motif (top-left) ---
  const faintGreen = 'rgba(14,59,56,0.10)';
  routePath(ctx, [[-20, 60], [150, 60], [185, 95], [300, 95]], faintGreen, 4);
  routePath(ctx, [[-20, 120], [90, 120], [120, 150], [360, 150], [395, 115], [470, 115]], faintGreen, 4);
  const faintRing = (x, y) => {
    ctx.save();
    ctx.strokeStyle = faintGreen;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };
  faintRing(300, 95);
  faintRing(470, 115);
  dotGrid(ctx, 55, 150, 3, 3, 22, 4.5, GOLD);

  // faint motif bottom-right (subtle texture)
  routePath(ctx, [[1240, 500], [1090, 500], [1055, 535], [930, 535]], faintGreen, 4);
  dotGrid(ctx, 1095, 560, 4, 3, 16, 3.5, 'rgba(214,177,91,0.45)');

  // --- logo lockup (top-right, green-on-transparent) — the single logo ---
  if (fs.existsSync(LOGO_LOCKUP)) {
    try {
      const logo = await loadImage(LOGO_LOCKUP);
      const h = 96;
      const w = (logo.width / logo.height) * h;
      ctx.drawImage(logo, WIDTH - 72 - w, 60, w, h);
    } catch (e) {
      /* non-fatal */
    }
  }

  const rightEdge = 1128; // page right margin for logo / pill / divider
  const titleRight = 1128; // title right-aligns to the margin (no mark on the right now)

  // --- gold category pill (right-aligned) ---
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
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.moveTo(pillX + r, pillY);
  ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, r);
  ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, r);
  ctx.arcTo(pillX, pillY + pillH, pillX, pillY, r);
  ctx.arcTo(pillX, pillY, pillX + pillW, pillY, r);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = GREEN;
  ctx.fillText(pillText, rightEdge - padX, pillY + pillH / 2 + 10);
  // ascending bar-chart glyph at the leading (left) side inside the pill
  ctx.save();
  ctx.fillStyle = GREEN;
  const bx = pillX + padX - 2;
  const bb = pillY + pillH - 18;
  [10, 17, 24].forEach((bh, i) => {
    ctx.fillRect(bx + i * 9, bb - bh, 6, bh);
  });
  ctx.restore();

  // thin divider under the pill
  ctx.save();
  ctx.strokeStyle = 'rgba(14,59,56,0.18)';
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
  ctx.fillStyle = GREEN;
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

  // --- footer: globe disc + domain (bottom-left, LTR) ---
  const gcx = 96;
  const gcy = HEIGHT - 70;
  ctx.save();
  ctx.fillStyle = GREEN;
  ctx.beginPath();
  ctx.arc(gcx, gcy, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = CREAM;
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
  ctx.fillStyle = GREEN;
  ctx.font = `30px ${STACK_MED}`;
  ctx.fillText(SITE, gcx + 38, gcy + 10);

  return canvas.encode('png');
}

module.exports = { renderOgImage, WIDTH, HEIGHT };
