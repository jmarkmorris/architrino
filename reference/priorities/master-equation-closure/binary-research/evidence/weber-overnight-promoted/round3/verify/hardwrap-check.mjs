// Heuristic hard-wrap detector: consecutive non-empty lines where BOTH are plain prose
// (not list items, table rows, headings, math delimiters/display math, code fences/code, blockquotes, html, link-ref defs).
import fs from 'node:fs';
const isStructural = (l) => /^\s*$/.test(l) || /^\s*([-*+]|\d+[.)])\s/.test(l) || /^\s*\|/.test(l) || /^\s*#{1,6}\s/.test(l) || /^\s*\$\$/.test(l) || /^\s*(```|~~~)/.test(l) || /^\s*>/.test(l) || /^\s*</.test(l) || /^\s*\[[^\]]+\]:\s/.test(l) || /^\s*\\(tag|begin|end)/.test(l) || /^\s{4,}/.test(l) || /^\s*(\*\*|__)?(Status|Claim grade)/.test(l) === false && false;
let total = 0;
for (const f of process.argv.slice(2)) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  let inFence = false, inMath = false, hits = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const a = lines[i], b = lines[i + 1];
    if (/^\s*(```|~~~)/.test(a)) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (/^\s*\$\$/.test(a)) { const n = (a.match(/\$\$/g) || []).length; if (n % 2 === 1) inMath = !inMath; continue; }
    if (inMath) continue;
    if (isStructural(a) || isStructural(b)) continue;
    // a and b both plain prose, consecutive: suspected hard wrap
    hits.push(i + 1);
  }
  total += hits.length;
  console.log(`${f}: ${hits.length} suspected hard-wrap pairs${hits.length ? ' at lines ' + hits.slice(0, 20).join(',') : ''}`);
}
console.log('TOTAL', total);
