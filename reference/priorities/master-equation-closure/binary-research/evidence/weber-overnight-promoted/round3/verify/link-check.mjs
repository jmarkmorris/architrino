#!/usr/bin/env node
// Relative Markdown link checker. Skips fenced code blocks and inline code spans.
// Checks file existence and, for #anchors, heading existence by GitHub-style slug.
// Usage: node link-check.mjs <file.md> [--lines A-B] ...
import fs from 'node:fs';
import path from 'node:path';

function githubSlug(heading) {
  let s = heading.trim();
  // strip trailing {#id} style? GitHub does not; keep simple
  s = s.replace(/<[^>]+>/g, '');            // html tags
  s = s.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1'); // links -> text
  s = s.replace(/[`*_~]/g, '');              // emphasis / code markers
  s = s.toLowerCase();
  s = s.replace(/[^\p{L}\p{N}\s\-]/gu, '');  // drop punctuation except hyphen and space
  s = s.replace(/\s/g, '-');
  return s;
}

function headingSlugs(mdText) {
  const slugs = new Map();
  const lines = mdText.split('\n');
  let inFence = false;
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    let base = githubSlug(m[2]);
    let slug = base;
    let n = slugs.get(base) ?? 0;
    if (n > 0) slug = `${base}-${n}`;
    slugs.set(base, n + 1);
    slugs.set('__final__' + slug, true);
  }
  return slugs;
}
function hasSlug(slugs, slug) { return slugs.has('__final__' + slug); }

function stripInlineCode(line) {
  // remove `code` spans (handle double backticks too)
  return line.replace(/(`+)[^`]*?\1/g, (m) => ' '.repeat(m.length));
}

const slugCache = new Map();
function slugsFor(file) {
  if (!slugCache.has(file)) slugCache.set(file, headingSlugs(fs.readFileSync(file, 'utf8')));
  return slugCache.get(file);
}

export function checkFile(file, range) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const broken = [];
  let total = 0;
  let inFence = false;
  const [lo, hi] = range ?? [1, lines.length];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const ln = i + 1;
    if (ln < lo || ln > hi) continue;
    const line = stripInlineCode(raw);
    const re = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let m;
    while ((m = re.exec(line))) {
      let target = m[1];
      if (/^(https?:|mailto:|ftp:)/i.test(target)) continue;
      if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
      total++;
      let [p, anchor] = target.split('#');
      p = decodeURIComponent(p);
      let resolved;
      if (p === '') resolved = file;
      else resolved = path.resolve(path.dirname(file), p);
      if (!fs.existsSync(resolved)) { broken.push({ file, line: ln, target, reason: 'missing file' }); continue; }
      if (anchor !== undefined && anchor !== '') {
        if (!/\.md$/i.test(resolved)) continue;
        const slugs = slugsFor(resolved);
        if (!hasSlug(slugs, anchor.toLowerCase())) broken.push({ file, line: ln, target, reason: 'missing anchor' });
      }
    }
  }
  return { total, broken };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let grandTotal = 0; const all = [];
  for (let i = 0; i < args.length; i++) {
    const f = args[i];
    let range;
    if (args[i + 1] === '--lines') { const [a, b] = args[i + 2].split('-').map(Number); range = [a, b]; i += 2; }
    const r = checkFile(path.resolve(f), range);
    grandTotal += r.total; all.push(...r.broken);
    console.log(`${f}${range ? ` [lines ${range[0]}-${range[1]}]` : ''}: ${r.total} relative links, ${r.broken.length} broken`);
  }
  for (const b of all) console.log(`  BROKEN ${b.file}:${b.line} -> ${b.target} (${b.reason})`);
  console.log(`TOTAL ${grandTotal} relative links checked, ${all.length} broken`);
  process.exit(all.length ? 1 : 0);
}
