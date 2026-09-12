#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { decode, validate, sha256 } from './current-source-manifest.mjs';

export const BASELINE = 'reference/priorities/development-process-review/contracts/option-b-root-cover-baseline.json';
export const MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-root-cover-sources.jsonld';
export const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
export const PROFILES = Object.freeze({
  'root-cover': { manifest: MANIFEST, baseline: BASELINE, entry: 'scripts/eom/run-f6c-root-cover-pilot.mjs', launcher: 'scripts/eom/launch-f6c-root-cover-pilot.mjs', scope: 'f6c-root-cover-pilot-current-source' },
  'cached-root-cover': { manifest: 'reference/priorities/development-process-review/contracts/option-b-cached-root-cover-sources.jsonld', baseline: 'reference/priorities/development-process-review/contracts/option-b-cached-root-cover-baseline.json', entry: 'scripts/eom/run-f6c-cached-root-cover-pilot.mjs', launcher: 'scripts/eom/launch-f6c-cached-root-cover-pilot.mjs', scope: 'f6c-cached-root-cover-pilot-current-source' },
  'cached-root-cover-full': { manifest: 'reference/priorities/development-process-review/contracts/option-b-cached-root-cover-full-sources.jsonld', baseline: 'reference/priorities/development-process-review/contracts/option-b-cached-root-cover-full-baseline.json', entry: 'scripts/eom/run-f6c-cached-root-cover-full.mjs', launcher: 'scripts/eom/launch-f6c-cached-root-cover-full.mjs', scope: 'f6c-cached-root-cover-full-current-source', retainedRepositoryEvidence: ['reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json'] },
});

// Restricted extraction of the retained A map, without executing historical code.
export function extractLegacyPins(source) {
  const constants = Object.fromEntries([...source.matchAll(/export const (\w+) = "([^"]+)";/g)].map(m => [m[1], m[2]]));
  const block = source.match(/export const PINS = Object.freeze\(\{([\s\S]*?)\n\}\);/);
  assert.ok(block, 'Retained A map absent'); const pins = {};
  for (const line of block[1].split('\n').filter(x => x.trim())) {
    const m = /^\s*(?:\[(\w+)\]|"([^"]+)"): "([a-f0-9]{64})",\s*$/u.exec(line);
    assert.ok(m, 'Unsupported retained A binding syntax'); const name = m[1] ? constants[m[1]] : m[2];
    assert.ok(name && !Object.hasOwn(pins, name), 'Missing/duplicate retained A path'); pins[name] = m[3];
  }
  assert.ok(Object.keys(pins).length, 'Empty retained A coverage'); return pins;
}
export function inspectTransfer({ root = ROOT, profile = 'root-cover', manifestRaw, baseline } = {}) {
  assert.ok(Object.hasOwn(PROFILES, profile), 'Unknown transfer profile');
  const selected = PROFILES[profile];
  manifestRaw ??= fs.readFileSync(path.join(root, selected.manifest));
  baseline ??= JSON.parse(fs.readFileSync(path.join(root, selected.baseline)));
  // Known parser case runs before accessing Git history or target records.
  const known = 'export const A = "a";\nexport const PINS = Object.freeze({\n [A]: "' + '1'.repeat(64) + '",\n "b": "' + '2'.repeat(64) + '",\n});';
  assert.deepEqual(extractLegacyPins(known), { a: '1'.repeat(64), b: '2'.repeat(64) });
  const document = decode(manifestRaw), graph = validate(document);
  assert.equal(baseline.schema, 'current-source-transfer-baseline/v1');
  assert.equal(document.repository, baseline.repository); assert.equal(document.scope, baseline.scope);
  assert.equal(document.scope, selected.scope, 'Cross-profile source map');
  assert.deepEqual(document.baseline, { commit: baseline.commit, entry: baseline.entry, authority: baseline.authority });
  assert.match(baseline.commit, /^[a-f0-9]{40}$/u); assert.equal(baseline.entry, selected.entry);
  const legacyRaw = execFileSync('git', ['show', `${baseline.commit}:${baseline.entry}`], { cwd: root, maxBuffer: 1024 ** 2 });
  const legacy = extractLegacyPins(legacyRaw.toString());
  assert.equal(new Set(baseline.bindings.map(b => b.path)).size, baseline.bindings.length, 'Duplicate baseline binding');
  assert.deepEqual(Object.fromEntries(baseline.bindings.map(b => [b.path, b.sha256])), legacy, 'Baseline differs from retained A bytes');
  const category = p => p.startsWith('.local-data/') ? 'scientific-evidence-retained' : selected.retainedRepositoryEvidence?.includes(p) ? 'historical-evidence-retained' : 'current-repository-binding-transfer';
  for (const binding of baseline.bindings) assert.equal(binding.category, category(binding.path), 'Incorrect binding disposition');
  const transferred = [...graph.sources.values()].filter(r => !['admission', 'launcher', 'manifest-reader'].includes(r.role));
  const expected = Object.fromEntries(Object.entries(legacy).filter(([p]) => category(p) === 'current-repository-binding-transfer'));
  assert.deepEqual(Object.fromEntries(transferred.map(r => [r.binding.path, r.binding.sha256])), expected, 'Transfer changes or omits an A source identity');
  const composition = [...graph.sources.values()].filter(r => ['admission', 'launcher', 'manifest-reader'].includes(r.role));
  assert.deepEqual(composition.map(r => [r.role, r.binding.path]).sort(), [
    ['admission', baseline.entry], ['launcher', selected.launcher], ['manifest-reader', 'scripts/equation-mapping/current-source-manifest.mjs'],
  ].sort(), 'Exact composition required');
  for (const row of graph.sources.values()) {
    const filename = path.join(root, row.binding.path);
    assert.equal(fs.realpathSync(filename), path.resolve(filename), 'Source symlink');
    assert.equal(sha256(fs.readFileSync(filename)), row.binding.sha256, `Stale binding: ${row.binding.path}`);
  }
  return { scope: document.scope, sourceConsistency: 'pass', launchAuthorization: 'requires externally selected manifest digest and existing launch authorization', baselineCommit: baseline.commit, retainedEntrySha256: sha256(legacyRaw), manifestSha256: sha256(manifestRaw), transferred: transferred.length, retainedEvidence: Object.keys(legacy).length - transferred.length, sources: graph.sources.size, relationships: graph.edges.length };
}
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { assert.equal(process.argv.length, 2, 'No implicit refresh or approval options'); console.log(JSON.stringify(Object.fromEntries(Object.keys(PROFILES).map(profile => [profile, inspectTransfer({ profile })])), null, 2)); }
  catch (error) { console.error('[option-b-current-source] ' + error.message); process.exitCode = 1; }
}
