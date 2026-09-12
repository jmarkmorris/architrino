import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { sha256 } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { inspectTransfer, PROFILES, ROOT } from '../scripts/equation-mapping/check-current-source-maps.mjs';
for (const [profile, selected] of Object.entries(PROFILES)) {
const R = await import('../' + selected.entry), { runFileWorker } = await import('../' + selected.launcher);
const MANIFEST = selected.manifest;
const expectedSources = { 'root-cover': 18, 'cached-root-cover': 25, 'cached-root-cover-full': 26 }[profile];
const expectedEvidence = profile === 'cached-root-cover-full' ? 11 : 3;
const scenario = (name, fn) => test(profile + ': ' + name, fn);

const raw = fs.readFileSync(path.join(ROOT, MANIFEST)), digest = sha256(raw), map = JSON.parse(raw);
scenario('B covers all retained A current-source bindings and keeps fixed evidence', async () => {
  const report = inspectTransfer({ profile }); assert.equal(report.transferred, expectedSources - 3); assert.equal(report.retainedEvidence, expectedEvidence);
  const admitted = await R.initializeSourceBindings(ROOT, digest);
  assert.equal(admitted.sources.length, expectedSources); assert.equal(admitted.sourceMap.sha256, digest);
  assert.equal(Object.keys(R.EVIDENCE_PINS).length, expectedEvidence);
  const baseline = JSON.parse(fs.readFileSync(path.join(ROOT, selected.baseline)));
  const retained = baseline.bindings.filter(b => b.category !== 'current-repository-binding-transfer');
  assert.deepEqual(R.EVIDENCE_PINS, Object.fromEntries(retained.map(b => [b.path, b.sha256])));
  assert.equal(Object.hasOwn(R, 'PINS'), false);
  const plan = { resourcePlan: { path: R.RESOURCE_PLAN, sha256: R.SOURCE_BINDINGS[R.RESOURCE_PLAN] }, comparisonContract: { subjectSourceBindings: [], runtimeBindings: [] }, operationalBindings: [], controlBindings: [] };
  const closure = R.planBindings(plan, ROOT);
  for (const record of retained) assert.ok(closure.some(b => b.path === path.join(ROOT, record.path) && b.sha256 === record.sha256));
  for (const record of [admitted.sourceMap, ...admitted.sources]) assert.ok(closure.some(b => b.path === record.path && b.sha256 === record.sha256));
  assert.throws(() => R.planBindings({ ...plan, operationalBindings: [{ path: R.ENTRY, sha256: '0'.repeat(64) }] }, ROOT), /conflicting/);
  for (const [name, expected] of Object.entries(R.SOURCE_BINDINGS).filter(([name]) => !name.startsWith('.local-data/'))) {
    const filename = path.join(ROOT, name), bytes = fs.readFileSync(filename).length;
    R.checkBindings([{ path: filename, sha256: expected, bytes }]);
    assert.throws(() => R.checkBindings([{ path: filename, sha256: '0'.repeat(64), bytes }]));
  }
});
function fixture(t) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-admission-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const p of [MANIFEST, ...map['@graph'].filter(r => r.binding).map(r => r.binding.path)]) {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true }); fs.copyFileSync(path.join(ROOT, p), path.join(root, p));
  }
  return root;
}
scenario('captured entry admits B and worker recheck rejects changed manifest bytes', async t => {
  const root = fixture(t), entry = fs.readFileSync(path.join(ROOT, R.ENTRY));
  const captured = await import('data:text/javascript;base64,' + entry.toString('base64'));
  const admitted = await captured.initializeSourceBindings(root, digest);
  const job = { kind: 'recheck', root, sourceMapSha256: digest, sources: [admitted.sourceMap, ...admitted.sources], deadlineNanoseconds: String(process.hrtime.bigint() + 10000000000n) };
  assert.equal((await runFileWorker(job, entry, 5000, new AbortController().signal)).length, expectedSources + 1);
  fs.appendFileSync(path.join(root, MANIFEST), '\n');
  await assert.rejects(runFileWorker(job, entry, 5000, new AbortController().signal), /hash differs/);
});
scenario('stale source, missing source, reader substitution and wrong digest cannot initialize', async t => {
  const root = fixture(t);
  await assert.rejects(R.initializeSourceBindings(root, undefined), /digest required/);
  await assert.rejects(R.initializeSourceBindings(root, '0'.repeat(64)), /hash differs/);
  for (const relative of [R.CONSUMER, R.COMPARISON, 'scripts/equation-mapping/current-source-manifest.mjs']) {
    const filename = path.join(root, relative), original = fs.readFileSync(filename);
    fs.appendFileSync(filename, '\n'); await assert.rejects(R.initializeSourceBindings(root, digest), /hash differs/);
    fs.writeFileSync(filename, original); fs.unlinkSync(filename); await assert.rejects(R.initializeSourceBindings(root, digest)); fs.writeFileSync(filename, original);
  }
  assert.equal(R.SOURCE_BINDINGS, undefined, 'failed initialization cannot reuse prior bindings');
});
scenario('graph changes cannot inherit the supplied manifest identity; transfer checker retains old obligations', async t => {
  const root = fixture(t);
  for (const mutate of [m => m['@graph'].pop(), m => m['@graph'][0].role = 'scientific-control', m => m['@graph'].push(m['@graph'][0]), m => m['@graph'][0].binding.selector.kind = 'literal']) {
    const changed = structuredClone(map); mutate(changed); const candidate = Buffer.from(JSON.stringify(changed));
    fs.writeFileSync(path.join(root, MANIFEST), candidate);
    await assert.rejects(R.initializeSourceBindings(root, digest), /hash differs/);
  }
  const changed = structuredClone(map); changed['@graph'][0].binding.sha256 = '0'.repeat(64);
  assert.throws(() => inspectTransfer({ profile, manifestRaw: Buffer.from(JSON.stringify(changed)) }), /Transfer changes/);
});
scenario('actual launch and stage CLIs reject untrusted map before process/scientific dispatch', () => {
  const hashes = p => sha256(fs.readFileSync(path.join(ROOT, p)));
  const launchArgs = [path.join(ROOT, R.LAUNCHER), '--out', 'unused', '--plan', 'missing-plan', '--plan-sha256', '1'.repeat(64), '--entry-sha256', hashes(R.ENTRY), '--launcher-sha256', hashes(R.LAUNCHER), '--source-map-sha256', '0'.repeat(64)];
  const launch = spawnSync(process.execPath, launchArgs, { cwd: ROOT, encoding: 'utf8', timeout: 5000 });
  assert.equal(launch.status, 1); assert.match(launch.stderr, /hash differs/); assert.doesNotMatch(launch.stderr, /missing-plan/);
  const stageArgs = [path.join(ROOT, R.ENTRY), '--plan', 'missing-plan', '--plan-sha256', '1'.repeat(64), '--entry-sha256', hashes(R.ENTRY), '--launcher-sha256', hashes(R.LAUNCHER), '--stage', 'consumer', '--out', 'unused', '--deadline-ns', '1', '--manifest-sha256', 'none', '--source-map-sha256', '0'.repeat(64)];
  const stage = spawnSync(process.execPath, stageArgs, { cwd: ROOT, encoding: 'utf8', timeout: 5000 });
  assert.equal(stage.status, 1); assert.match(stage.stderr, /hash differs/); assert.doesNotMatch(stage.stderr, /missing-plan/);
  for (const args of [launchArgs, stageArgs]) {
    const selectedArgs = [...args]; selectedArgs[selectedArgs.length - 1] = digest;
    const admitted = spawnSync(process.execPath, selectedArgs, { cwd: ROOT, encoding: 'utf8', timeout: 5000 });
    assert.equal(admitted.status, 1); assert.match(admitted.stderr, /missing-plan/); assert.doesNotMatch(admitted.stderr, /hash differs/);
  }
});

scenario('manifests selected for every other profile cannot authorize this entry', async t => {
  const root = fixture(t);
  for (const other of Object.values(PROFILES).filter(p => p.scope !== selected.scope)) {
  const otherRaw = fs.readFileSync(path.join(ROOT, other.manifest));
  fs.writeFileSync(path.join(root, MANIFEST), otherRaw);
  await assert.rejects(R.initializeSourceBindings(root, sha256(otherRaw)), /Wrong manifest scope/);
  assert.throws(() => inspectTransfer({ profile, manifestRaw: otherRaw }), /scope|profile|equal/i);
  }
});
}

test('full profile retains its saved pilot plan as historical evidence regardless of directory', () => {
  const selected = PROFILES['cached-root-cover-full'];
  const baseline = JSON.parse(fs.readFileSync(path.join(ROOT, selected.baseline)));
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, selected.manifest)));
  const savedPlan = 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json';
  assert.equal(baseline.bindings.find(b => b.path === savedPlan).category, 'historical-evidence-retained');
  assert.equal(map['@graph'].some(r => r.binding?.path === savedPlan), false);
  baseline.bindings.find(b => b.path === savedPlan).category = 'current-repository-binding-transfer';
  assert.throws(() => inspectTransfer({ profile: 'cached-root-cover-full', baseline }), /Incorrect binding disposition/);
});
