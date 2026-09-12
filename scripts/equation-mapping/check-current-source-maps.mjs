#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { decode, validate, sha256 } from './current-source-manifest.mjs';
import { extractRoleBindings } from './legacy-role-bindings.mjs';

export const BASELINE = 'reference/priorities/development-process-review/contracts/option-b-root-cover-baseline.json';
export const MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-root-cover-sources.jsonld';
export const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
export const CIRCULAR_SUCCESSOR = Object.freeze({
  path: 'scripts/eom/launch-subfield-circular-root-pilot.mjs',
  previous: '71974054ddce7fc29b8464b9a7a63f8fbb04ee5b425dc997df4d40b2804341aa',
  manifest: 'reference/priorities/development-process-review/contracts/option-b-circular-sources.jsonld',
  scope: 'subfield-circular-current-operation',
  entry: 'scripts/eom/run-current-subfield-circular-root-pilot.mjs',
});

// Checker-first interface: only this operational helper may select a reviewed
// successor. Historical A values and every scientific/reference binding remain
// exact. This checks consistency, never authorizes a launch or scientific result.
export function circularSuccessor(raw, previous, readSource) {
  assert.equal(previous, CIRCULAR_SUCCESSOR.previous, 'Original circular helper identity differs');
  const document = decode(raw), graph = validate(document);
  assert.equal(document.scope, CIRCULAR_SUCCESSOR.scope, 'Circular successor scope differs');
  assert.equal(document.baseline.entry, CIRCULAR_SUCCESSOR.entry, 'Circular successor baseline entry differs');
  const rows = [...graph.sources.values()];
  assert.equal(rows.find(row => row.role === 'admission')?.binding.path, CIRCULAR_SUCCESSOR.entry, 'Circular successor admission differs');
  const launchers = rows.filter(row => row.role === 'launcher');
  assert.equal(launchers.length, 1, 'One circular successor launcher required');
  assert.equal(launchers[0].binding.path, CIRCULAR_SUCCESSOR.path, 'Circular successor path differs');
  const readers = rows.filter(row => row.role === 'manifest-reader');
  assert.equal(readers.length, 1, 'One circular successor reader required');
  assert.equal(readers[0].binding.path, 'scripts/equation-mapping/current-source-manifest.mjs', 'Circular successor reader differs');
  for (const row of rows) assert.equal(sha256(readSource(row.binding.path)), row.binding.sha256, `Stale successor binding: ${row.binding.path}`);
  return launchers[0].binding.sha256;
}
export const PROFILES = Object.freeze({
  'prescribed-response': { manifest: 'reference/priorities/development-process-review/contracts/option-b-prescribed-response-sources.jsonld', baseline: 'reference/priorities/development-process-review/contracts/option-b-prescribed-response-baseline.json', entry: 'scripts/eom/run-prescribed-response-pilot.mjs', launcher: 'scripts/eom/launch-prescribed-response-pilot.mjs', scope: 'prescribed-response-pilot-current-source', roleTable: 'ORIGINALS', retainedRepositoryEvidence: ['reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json', 'reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json', 'reference/priorities/braid-program/evidence/2026-08-27-prescribed-acceleration-response-predeclaration.md'] },
  'f6c-acceleration': { manifest: 'reference/priorities/development-process-review/contracts/option-b-f6c-acceleration-sources.jsonld', baseline: 'reference/priorities/development-process-review/contracts/option-b-f6c-acceleration-baseline.json', entry: 'scripts/eom/run-f6c-acceleration-pilot.mjs', launcher: 'scripts/eom/launch-f6c-acceleration-pilot.mjs', scope: 'f6c-acceleration-pilot-current-source', roleTable: 'FIXED', migratedHelper: 'prescribed-response', retainedRepositoryEvidence: ['reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md', 'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md'] },
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
  const legacy = selected.roleTable ? extractRoleBindings(legacyRaw.toString(), selected.roleTable) : extractLegacyPins(legacyRaw.toString());
  assert.equal(new Set(baseline.bindings.map(b => b.path)).size, baseline.bindings.length, 'Duplicate baseline binding');
  assert.deepEqual(Object.fromEntries(baseline.bindings.map(b => [b.path, b.sha256])), legacy, 'Baseline differs from retained A bytes');
  const category = p => p.startsWith('.local-data/') ? 'scientific-evidence-retained' : selected.retainedRepositoryEvidence?.includes(p) ? 'historical-evidence-retained' : 'current-repository-binding-transfer';
  for (const binding of baseline.bindings) assert.equal(binding.category, category(binding.path), 'Incorrect binding disposition');
  const transferred = [...graph.sources.values()].filter(r => !['admission', 'launcher', 'manifest-reader'].includes(r.role));
  const expected = Object.fromEntries(Object.entries(legacy).filter(([p]) => category(p) === 'current-repository-binding-transfer'));
  // The prescribed launcher is also an acceleration helper. Its migration is
  // an explicit operational successor, not permission to refresh scientific inputs.
  if (selected.migratedHelper) {
    const helper = PROFILES[selected.migratedHelper];
    const helperMap = validate(decode(fs.readFileSync(path.join(root, helper.manifest))));
    const identity = [...helperMap.sources.values()].find(r => r.role === 'launcher');
    assert.equal(identity.binding.path, helper.launcher);
    assert.equal(expected[helper.launcher], '05cd35574276841795077ea28a2b6d6e47534379184f7164a9dafe473e156a7f');
    expected[helper.launcher] = identity.binding.sha256;
  }
  if (Object.hasOwn(expected, CIRCULAR_SUCCESSOR.path)) {
    // An unchanged inherited helper needs no successor. A changed selection
    // requires the separate circular map; deleting it cannot grant fallback.
    const actual = transferred.find(row => row.binding.path === CIRCULAR_SUCCESSOR.path)?.binding.sha256;
    if (actual !== expected[CIRCULAR_SUCCESSOR.path]) {
      expected[CIRCULAR_SUCCESSOR.path] = circularSuccessor(
        fs.readFileSync(path.join(root, CIRCULAR_SUCCESSOR.manifest)), expected[CIRCULAR_SUCCESSOR.path],
        relative => { const filename = path.join(root, relative); assert.equal(fs.realpathSync(filename), filename, 'Successor source symlink'); return fs.readFileSync(filename); });
    }
  }
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
