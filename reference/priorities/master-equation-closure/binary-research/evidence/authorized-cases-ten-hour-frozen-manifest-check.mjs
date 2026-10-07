import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

// Byte identity only: these two explicit manifests are not a mathematical oracle.
const manifests = [
  'reference/priorities/master-equation-closure/binary-research/analysis/authorized-cases-ten-hour-c-spiral-final-manifest.md',
  'reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-ten-hour-d-followup-n02-closure.md',
];
const local = '.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/coordinator-review';
const knownPath = path.join(local, 'frozen-manifest-known-v1.json');
const sha = x => crypto.createHash('sha256').update(x).digest('hex');
const self = sha(fs.readFileSync(new URL(import.meta.url)));

function extract(text) {
  const rows = [];
  let fence = null;
  for (const [index, line] of text.split('\n').entries()) {
    const mark = line.match(/^\s*(`{3,}|~{3,})/);
    if (mark) {
      if (!fence) fence = mark[1][0];
      else if (fence === mark[1][0]) fence = null;
      continue;
    }
    if (fence || !line.startsWith('|')) continue;
    const hashes = [...line.matchAll(/`([a-f0-9]{64})`/g)];
    if (!hashes.length) continue;
    assert.equal(hashes.length, 1, `ambiguous digest at line ${index + 1}`);
    const links = [...line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
    const literal = [...line.matchAll(/`(\.local-data\/[^`]+)`/g)];
    assert.equal(links.length + literal.length, 1, `ambiguous path at line ${index + 1}`);
    rows.push({ line: index + 1, target: links[0]?.[1] ?? literal[0][1], rootRelative: !links.length, expected: hashes[0][1] });
  }
  return rows;
}

if (process.argv[2] === '--known') {
  assert.equal(sha('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const hash = sha('abc');
  const fixture = `| [Subject](a.md) | \`${hash}\` |\n| Assessment | [Review](b.md): \`${hash}\` |\n| \`.local-data/c.json\` | \`${hash}\` |\n\`\`\`\n| [Ignored](no.md) | \`${hash}\` |\n\`\`\`\n`;
  const rows = extract(fixture);
  assert.deepEqual(rows.map(x => [x.target, x.rootRelative]), [['a.md', false], ['b.md', false], ['.local-data/c.json', true]]);
  assert.throws(() => extract(`| [a](a.md) [b](b.md) | \`${hash}\` |`));
  assert.equal(sha('abd') === hash, false);
  fs.mkdirSync(local, { recursive: true });
  assert(!fs.existsSync(knownPath), 'known receipt already exists');
  const result = { passed: true, instrumentSha256: self, utc: new Date().toISOString(), controls: ['standard SHA-256 abc', 'both manifest table forms', 'repository-root local receipt path', 'fenced example excluded', 'ambiguous row rejected', 'changed bytes rejected'] };
  fs.writeFileSync(knownPath, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
} else {
  assert.equal(process.argv[2], '--target');
  const known = JSON.parse(fs.readFileSync(knownPath));
  assert(known.passed && known.instrumentSha256 === self);
  const output = [];
  for (const manifest of manifests) {
    const data = fs.readFileSync(manifest);
    const entries = extract(data.toString()).map(row => {
      const target = row.rootRelative ? row.target : path.normalize(path.join(path.dirname(manifest), row.target));
      const actual = sha(fs.readFileSync(target));
      assert.equal(actual, row.expected, `changed frozen target ${target}`);
      return { ...row, target, actual, matched: true };
    });
    assert(entries.length > 0);
    output.push({ manifest, manifestSha256: sha(data), entries });
  }
  console.log(JSON.stringify({ passed: true, utc: new Date().toISOString(), instrumentSha256: self, scope: 'Exact hash entries in the two named C/D manifests; byte identity only, not all repository files or mathematical truth.', entryCount: output.reduce((n, x) => n + x.entries.length, 0), manifests: output }, null, 2));
}
