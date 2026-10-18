/**
 * Rewrites root-relative URLs in dist/ to include the GitHub Pages base path.
 * Run AFTER `astro build` (only in CI — exits early when BASE_PATH is unset).
 * Idempotent: safe to run multiple times.
 *
 * Usage: BASE_PATH=/Kitchen-Appliances-Hub node scripts/fix-base-paths.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const BASE = (process.env.BASE_PATH || '').trim();
const DIST = process.env.DIST_DIR || 'dist';

if (!BASE || BASE === '/') {
  console.log('[fix-base-paths] BASE_PATH not set — nothing to do.');
  process.exit(0);
}

const SKIP = ['http://', 'https://', '//', 'mailto:', 'tel:', 'data:', '#'];

/** true when a root-relative URL still needs the base prefix */
function needsBase(url) {
  if (typeof url !== 'string' || !url.startsWith('/')) return false;
  if (url === BASE || url.startsWith(BASE + '/') || url.startsWith(BASE + '?') || url.startsWith(BASE + '#')) return false;
  return !SKIP.some((p) => url.startsWith(p));
}

/** prefix a URL, adding a trailing slash to extensionless routes (directory build) */
function prefix(url) {
  if (url === '/') return BASE + '/';
  const m = url.match(/^([^?#]*)([?#].*)?$/);
  const pathPart = m[1];
  const tail = m[2] || '';
  const hasExt = /\.[a-zA-Z0-9]+$/.test(pathPart);
  const slash = hasExt || pathPart.endsWith('/') ? '' : '/';
  return BASE.replace(/\s+$/, '') + pathPart + slash + tail;
}

/** href="/…" src="/…" action="/…" poster="/…" */
function rewriteAttrs(text) {
  return text.replace(/(\s(?:href|src|poster|action))=(["'])([^"']*)\2/g, (m, attr, q, url) =>
    needsBase(url) ? `${attr}=${q}${prefix(url)}${q}` : m
  );
}

/** srcset="url1 1x, url2 2x" (each candidate checked independently) */
function rewriteSrcset(text) {
  return text.replace(/(\ssrcset)=(["'])([^"']*)\2/g, (m, attr, q, val) => {
    const parts = val.split(',').map((part) => {
      const t = part.trim().split(/\s+/);
      if (t.length && needsBase(t[0])) t[0] = prefix(t[0]);
      return t.join(' ');
    });
    return `${attr}=${q}${parts.join(', ')}${q}`;
  });
}

/** url(/foo) in CSS */
function rewriteCssUrls(text) {
  return text.replace(/url\((\s*['"]?)(\/[^)'"]*)/g, (m, q, url) =>
    needsBase(url) ? `url(${q}${prefix(url)}` : m
  );
}

/** internal route string literals inside JavaScript (bundled or inline) */
const ROUTES = ['/products', '/collections', '/cart', '/favorites', '/search', '/about', '/contacts', '/faq'];
function rewriteJsStrings(text) {
  let out = text;
  for (const r of ROUTES) {
    out = out.replace(new RegExp('([\'"`])' + r + '(?=[/\'"`?#])', 'g'), (m, q) => q + BASE + r);
  }
  return out;
}

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let changed = 0;
if (!existsSync(DIST)) {
  console.error(`[fix-base-paths] ${DIST}/ not found — run "astro build" first.`);
  process.exit(1);
}

for (const file of walk(DIST)) {
  const ext = extname(file).toLowerCase();
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue; // binary asset
  }
  let out = text;
  if (ext === '.html') out = rewriteSrcset(rewriteAttrs(rewriteJsStrings(out)));
  else if (ext === '.css') out = rewriteCssUrls(out);
  else if (ext === '.js' || ext === '.mjs') out = rewriteJsStrings(out);
  if (out !== text) {
    writeFileSync(file, out);
    changed++;
  }
}

console.log(`[fix-base-paths] Rewrote ${changed} file(s) with base "${BASE}".`);
