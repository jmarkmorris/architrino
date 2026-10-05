// Walk JSON receipts; for every key matching /sha256/i paired with a path-bearing sibling, compare to disk.
import fs from 'node:fs'; import crypto from 'node:crypto'; import path from 'node:path';
const root = process.cwd();
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const files = process.argv.slice(2);
let checked = 0, mismatches = [], unresolved = [], noHash = [];
function walk(obj, ctx, file) {
  if (Array.isArray(obj)) { obj.forEach(o => walk(o, ctx, file)); return; }
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj)) {
    if (/sha256/i.test(k) && typeof v === 'string' && /^[a-f0-9]{64}$/.test(v)) {
      // find sibling path
      let p = null;
      if (k === 'caseFileSHA256') p = obj.caseFile;
      else if (k === 'receiptSHA256') p = obj.receiptCopy;
      else if (k === 'instrumentSHA256') p = 'reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-pair-instrument.mjs';
      else if (k === 'sha256' && obj.path) p = obj.path;
      if (!p) { unresolved.push({ file, key: k, ctx, v }); continue; }
      checked++;
      const abs = path.resolve(root, p);
      if (!fs.existsSync(abs)) { mismatches.push({ file, key: k, path: p, expected: v, actual: 'FILE MISSING' }); continue; }
      const a = sha(abs); if (a !== v) mismatches.push({ file, key: k, path: p, expected: v, actual: a });
    } else if (/sha256/i.test(k) && v && typeof v === 'object' && !Array.isArray(v)) {
      // map basename -> hash (withheld receipts)
      for (const [name, h] of Object.entries(v)) {
        checked++;
        const abs = path.resolve(root, 'reference/priorities/master-equation-closure/binary-research/evidence', name);
        const a = fs.existsSync(abs) ? sha(abs) : 'FILE MISSING';
        if (a !== h) mismatches.push({ file, key: k + '.' + name, path: abs, expected: h, actual: a });
      }
    } else if (k === 'fixedSources' && v && typeof v === 'object') {
      const map = { reference: 'weber-overnight-independent-reference.mjs', withheld: 'weber-overnight-independent-reference-withheld.mjs' };
      for (const [name, h] of Object.entries(v)) { checked++; const abs = path.resolve(root, 'reference/priorities/master-equation-closure/binary-research/evidence', map[name] ?? name); const a = fs.existsSync(abs) ? sha(abs) : 'FILE MISSING'; if (a !== h) mismatches.push({ file, key: 'fixedSources.' + name, path: abs, expected: h, actual: a }); }
    } else walk(v, ctx + '.' + k, file);
  }
}
for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8'); const before = checked;
  walk(JSON.parse(txt), '', f);
  if (checked === before && !unresolved.some(u => u.file === f)) noHash.push(f);
  console.log(`${f}: ${checked - before} hash bindings checked`);
}
console.log('TOTAL checked', checked, 'mismatches', mismatches.length, 'unresolved', unresolved.length);
for (const m of mismatches) console.log('MISMATCH', JSON.stringify(m));
for (const u of unresolved) console.log('UNRESOLVED', JSON.stringify(u));
console.log('NO HASH RECORDED:', noHash.join(', '));
