#!/usr/bin/env node
// Explicit-use storage preparation. Never removes or overwrites source evidence.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
import { isDeepStrictEqual } from 'node:util';
import assert from 'node:assert/strict';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const EVIDENCE = 'reference/priorities/master-equation-closure/noether-sea-research/evidence/';
const SCHEMA = 'architrino/audit-pair-bundle.v1';
const LIMIT = 128 * 1024 * 1024;
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const lines = bytes => {
  let n = 0;
  for (const b of bytes) if (b === 10) n++;
  return n + (bytes.length && bytes.at(-1) !== 10 ? 1 : 0);
};
const identity = (name, bytes) => ({ path: name, bytes: bytes.length, lines: lines(bytes), sha256: sha(bytes) });
function validateName(name, companion = false) {
  assert.equal(typeof name, 'string', 'path must be a string');
  const suffix = companion ? '\\.json\\.consistency\\.json' : '\\.json';
  assert.ok(name.startsWith(EVIDENCE) && new RegExp(`^spherical-six-pole-(post-turn|path-continuation)-claude-review-audit10-[A-Za-z0-9-]+${suffix}$`).test(name.slice(EVIDENCE.length)), 'unexpected evidence path');
}
function check(bytes, expected) {
  assert.ok(Number.isSafeInteger(expected.bytes) && expected.bytes >= 0 && expected.bytes <= LIMIT, 'invalid byte size');
  assert.deepEqual(identity(expected.path, bytes), expected, `original identity mismatch: ${expected.path}`);
}
function from64(value) {
  assert.equal(typeof value, 'string', 'base64 must be a string');
  const bytes = Buffer.from(value, 'base64');
  assert.equal(bytes.toString('base64'), value, 'noncanonical base64');
  return bytes;
}
export function encodePair(base, companion, auditPath) {
  validateName(auditPath);
  let prefix = 0, suffix = 0;
  while (prefix < Math.min(base.length, companion.length) && base[prefix] === companion[prefix]) prefix++;
  while (suffix < Math.min(base.length, companion.length) - prefix && base[base.length - 1 - suffix] === companion[companion.length - 1 - suffix]) suffix++;
  return {
    audit: identity(auditPath, base), consistency: identity(`${auditPath}.consistency.json`, companion),
    base64: base.toString('base64'),
    edit: { offset: prefix, remove: base.length - prefix - suffix, insertBase64: companion.subarray(prefix, companion.length - suffix).toString('base64') },
  };
}
export function decodePair(pair) {
  validateName(pair.audit.path); validateName(pair.consistency.path, true);
  assert.equal(pair.consistency.path, `${pair.audit.path}.consistency.json`, 'pair paths do not correspond');
  const base = from64(pair.base64); check(base, pair.audit);
  const { offset, remove, insertBase64 } = pair.edit;
  assert.ok(Number.isSafeInteger(offset) && offset >= 0 && offset <= base.length, 'invalid edit offset');
  assert.ok(Number.isSafeInteger(remove) && remove >= 0 && remove <= base.length - offset, 'invalid edit length');
  const insert = from64(insertBase64);
  assert.ok(base.length - remove + insert.length <= LIMIT, 'decoded companion exceeds limit');
  const companion = Buffer.concat([base.subarray(0, offset), insert, base.subarray(offset + remove)]);
  check(companion, pair.consistency);
  return [{ identity: pair.audit, bytes: base }, { identity: pair.consistency, bytes: companion }];
}
export function knownCases() {
  const name = `${EVIDENCE}spherical-six-pole-post-turn-claude-review-audit10-known.json`;
  for (const [a, b] of [['abcXYZdef', 'abc123def'], ['', 'x'], ['x', ''], ['same', 'same'], ['{"x":"α"}\n', '{"x":"α","frozen_consistency":true}\n']]) {
    const pair = encodePair(Buffer.from(a), Buffer.from(b), name);
    const decoded = decodePair(pair);
    assert.equal(decoded[0].bytes.toString(), a); assert.equal(decoded[1].bytes.toString(), b);
  }
  const pair = encodePair(Buffer.from('abcXYZdef'), Buffer.from('abc123def'), name);
  assert.deepEqual(pair.edit, { offset: 3, remove: 3, insertBase64: 'MTIz' });
  assert.throws(() => decodePair({ ...pair, base64: Buffer.from('bad').toString('base64') }), /identity mismatch/);
  assert.throws(() => decodePair({ ...pair, edit: { ...pair.edit, offset: -1 } }), /offset/);
  assert.throws(() => decodePair({ ...pair, edit: { ...pair.edit, remove: 999 } }), /length/);
  assert.throws(() => decodePair({ ...pair, edit: { ...pair.edit, insertBase64: 'YmFk' } }), /identity mismatch/);
  assert.throws(() => decodePair({ ...pair, audit: { ...pair.audit, path: '../outside' } }), /path/);
  assert.throws(() => from64('not base64!'), /base64/);
  assert.equal(sha('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  assert.equal(lines(Buffer.from('a\nb')), 2);
  assert.equal(lines(Buffer.from('a\n')), 1);
  assert.equal(lines(Buffer.alloc(0)), 0);
  console.log('Known byte-edit, empty/identical/UTF-8, line-count, SHA and corruption/path controls PASS before target reads.');
}
function readBundle(bundleFile, manifestFile) {
  const compressed = fs.readFileSync(bundleFile), manifest = JSON.parse(fs.readFileSync(manifestFile));
  assert.equal(manifest.schema, SCHEMA);
  assert.deepEqual({ bytes: compressed.length, sha256: sha(compressed) }, manifest.bundle, 'bundle identity mismatch');
  const envelope = JSON.parse(gunzipSync(compressed, { maxOutputLength: LIMIT }));
  assert.equal(envelope.schema, SCHEMA);
  assert.ok(Array.isArray(envelope.pairs) && envelope.pairs.length > 0 && envelope.pairs.length <= 100, 'invalid pair count');
  const restored = envelope.pairs.flatMap(decodePair);
  assert.equal(new Set(restored.map(r => r.identity.path)).size, restored.length, 'duplicate original paths');
  assert.deepEqual(restored.map(r => r.identity), manifest.originals, 'manifest originals mismatch');
  return { manifest, restored };
}
function freshDirectory(dir) {
  // Parent may exist; the destination itself must be new. Never extract over a checkout.
  assert.notEqual(path.resolve(dir), ROOT, 'cannot restore over repository root');
  fs.mkdirSync(dir, { recursive: false });
}
function prepare(scopeFile, out, sourceRoot = ROOT) {
  const scopeBytes = fs.readFileSync(scopeFile), scope = JSON.parse(scopeBytes);
  assert.equal(scope.schema, 'architrino/audit-pair-scope.v1');
  assert.equal(scope.pairs.length, 7, 'this preparation requires exactly seven selected pairs');
  for (const frozen of scope.frozenManifests) assert.equal(sha(fs.readFileSync(path.join(ROOT, frozen.path))), frozen.sha256, 'frozen manifest changed');
  const pairs = scope.pairs.map(p => {
    validateName(p.audit.path); validateName(p.consistency.path, true);
    const a = fs.readFileSync(path.join(sourceRoot, p.audit.path)), b = fs.readFileSync(path.join(sourceRoot, p.consistency.path));
    check(a, p.audit); check(b, p.consistency);
    const audit = JSON.parse(a), consistency = JSON.parse(b);
    const { frozen_consistency: extra, ...shared } = consistency;
    assert.ok(extra && isDeepStrictEqual(audit, shared), 'companion differs beyond frozen_consistency');
    return encodePair(a, b, p.audit.path);
  });
  const originals = pairs.flatMap(p => [p.audit, p.consistency]);
  assert.equal(new Set(originals.map(p => p.path)).size, 14);
  const raw = Buffer.from(JSON.stringify({ schema: SCHEMA, pairs }));
  assert.ok(raw.length <= LIMIT);
  const compressed = gzipSync(raw, { level: 9 });
  const logicalBytes = originals.reduce((s, p) => s + p.bytes, 0);
  const retainedPayloadBytes = pairs.reduce((s, p) => s + p.audit.bytes + from64(p.edit.insertBase64).length, 0);
  const manifest = {
    schema: SCHEMA, scope: { path: path.relative(ROOT, scopeFile), sha256: sha(scopeBytes) },
    bundle: { bytes: compressed.length, sha256: sha(compressed) }, originals,
    totals: { originalFiles: originals.length, logicalBytes, retainedPayloadBytes, byteEditReduction: logicalBytes - retainedPayloadBytes },
    frozenManifests: scope.frozenManifests,
  };
  freshDirectory(out);
  fs.writeFileSync(path.join(out, 'audit-pairs.json.gz'), compressed, { flag: 'wx' });
  fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
  readBundle(path.join(out, 'audit-pairs.json.gz'), path.join(out, 'manifest.json'));
  console.log(JSON.stringify({ ...manifest.totals, bundle: manifest.bundle, manifestBytes: fs.statSync(path.join(out, 'manifest.json')).size }));
}
function verify(bundle, manifest, compareRoot) {
  const result = readBundle(bundle, manifest);
  if (compareRoot) for (const r of result.restored) assert.ok(r.bytes.equals(fs.readFileSync(path.join(compareRoot, r.identity.path))), `byte comparison failed: ${r.identity.path}`);
  console.log(JSON.stringify({ originalFiles: result.restored.length, verifiedHashes: true, comparedToOriginalFiles: Boolean(compareRoot) }));
}
function restore(bundle, manifest, out) {
  const { restored } = readBundle(bundle, manifest); // All checks complete before any destination write.
  freshDirectory(out);
  for (const r of restored) {
    const target = path.join(out, r.identity.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, r.bytes, { flag: 'wx' });
  }
  console.log(JSON.stringify({ restoredFiles: restored.length, destination: out }));
}
function main(args) {
  const [command, ...rest] = args;
  if (command === '--known-only') { assert.equal(rest.length, 0); knownCases(); return; }
  const opts = {};
  for (let i = 0; i < rest.length; i += 2) {
    assert.ok(rest[i]?.startsWith('--') && rest[i + 1] && !rest[i + 1].startsWith('--') && !Object.hasOwn(opts, rest[i]), 'invalid or repeated option');
    opts[rest[i]] = path.resolve(rest[i + 1]);
  }
  const allowed = { prepare: ['--scope', '--out', '--source-root'], verify: ['--bundle', '--manifest', '--compare-root'], restore: ['--bundle', '--manifest', '--out'] }[command];
  assert.ok(allowed, 'Use prepare --scope FILE --out NEW_DIR [--source-root ROOT] | verify --bundle FILE --manifest FILE [--compare-root ROOT] | restore --bundle FILE --manifest FILE --out NEW_DIR | --known-only');
  assert.ok(Object.keys(opts).every(k => allowed.includes(k)) && allowed.filter(k => k !== '--compare-root' && k !== '--source-root').every(k => opts[k]), 'missing or unknown option');
  knownCases();
  if (command === 'prepare') prepare(opts['--scope'], opts['--out'], opts['--source-root']);
  if (command === 'verify') verify(opts['--bundle'], opts['--manifest'], opts['--compare-root']);
  if (command === 'restore') restore(opts['--bundle'], opts['--manifest'], opts['--out']);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
