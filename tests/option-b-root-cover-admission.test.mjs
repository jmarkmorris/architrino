import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { sha256 } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { inspectCurrentSources, PROFILES, ROOT } from '../scripts/equation-mapping/check-current-source-maps.mjs';
import selection from '../reference/priorities/development-process-review/contracts/option-b-five-profile-selection.json' with { type: 'json' };
const {schema,...B_SELECTION}=selection;
assert.equal(schema,'current-source-acceptance-selection/v1');
const acceptedRaw=fs.readFileSync(path.join(ROOT,B_SELECTION.acceptedBaseline));
assert.equal(sha256(acceptedRaw),B_SELECTION.acceptedBaselineSha256);
const ACCEPTED=JSON.parse(acceptedRaw);
const inspectB=(root=ROOT)=>inspectCurrentSources({root,...B_SELECTION,requiredProfiles:Object.keys(PROFILES)});
test('required admission coverage retains exactly the five original profiles',()=>{
  assert.deepEqual(Object.keys(PROFILES).sort(),['cached-root-cover','cached-root-cover-full','f6c-acceleration','prescribed-response','root-cover']);
});
for (const [profile, selected] of Object.entries(PROFILES)) {
const R = await import('../' + selected.entry), { runFileWorker } = await import('../' + (profile === 'f6c-acceleration' ? 'scripts/eom/launch-prescribed-response-pilot.mjs' : selected.launcher));
const MANIFEST = selected.manifest;
const expectedSources = { 'root-cover': 18, 'cached-root-cover': 25, 'cached-root-cover-full': 26, 'prescribed-response': 15, 'f6c-acceleration': 16 }[profile];
const expectedEvidence = ['cached-root-cover-full','f6c-acceleration'].includes(profile) ? 11 : profile === 'prescribed-response' ? 9 : 3;
const scenario = (name, fn) => test(profile + ': ' + name, fn);

const raw = fs.readFileSync(path.join(ROOT, MANIFEST)), digest = sha256(raw), map = JSON.parse(raw);
scenario('B preserves the accepted source census and fixed evidence', async () => {
  const report = inspectB().profiles[profile]; assert.equal(report.sources, expectedSources);
  const admitted = await R.initializeSourceBindings(ROOT, digest);
  assert.equal(admitted.sources.length, expectedSources); assert.equal(admitted.sourceMap.sha256, digest);
  assert.equal(Object.keys(R.EVIDENCE_PINS).length, expectedEvidence);
  const retained = ACCEPTED.profiles.find(row=>row.name===profile).historicalEvidenceBindings;
  assert.equal(retained.length,expectedEvidence);
  assert.deepEqual(R.EVIDENCE_PINS, Object.fromEntries(retained.map(b => [b.path, b.sha256])));
  assert.equal(Object.hasOwn(R, 'PINS'), false);
  const plan = { resourcePlan: { path: R.RESOURCE_PLAN, sha256: R.SOURCE_BINDINGS[R.RESOURCE_PLAN] }, comparisonContract: { subjectSourceBindings: [], runtimeBindings: [] }, operationalBindings: [], controlBindings: [] };
  if(profile === 'prescribed-response')Object.assign(plan,{originalBindings:retained.map(b=>({path:path.join(ROOT,b.path),sha256:b.sha256,bytes:1})),runtimeBindings:[]});
  if(profile === 'f6c-acceleration')Object.assign(plan,{historicalInputs:[],consumer:{path:R.CONSUMER,sha256:R.SOURCE_BINDINGS[R.CONSUMER]},controls:{path:R.CONSUMER_TESTS,sha256:R.SOURCE_BINDINGS[R.CONSUMER_TESTS]},rangeVerifier:{path:R.CHECKER,sha256:R.SOURCE_BINDINGS[R.CHECKER]},declarationInput:{path:R.DECLARATION,sha256:R.SOURCE_BINDINGS[R.DECLARATION]},runtimeBindings:[]});
  const closure = R.planBindings(plan, ROOT);
  for (const record of retained) assert.ok(closure.some(b => b.path === path.join(ROOT, record.path) && b.sha256 === record.sha256));
  for (const record of [admitted.sourceMap, ...admitted.sources]) assert.ok(closure.some(b => b.path === record.path && b.sha256 === record.sha256));
  assert.throws(() => R.planBindings({ ...plan, operationalBindings: [{ path: profile === 'prescribed-response' ? path.join(ROOT,R.ENTRY) : R.ENTRY, sha256: '0'.repeat(64) }] }, ROOT), /conflicting/);
  for (const [name, expected] of Object.entries(R.SOURCE_BINDINGS).filter(([name]) => !Object.hasOwn(R.EVIDENCE_PINS,name))) {
    const filename = path.join(ROOT, name), bytes = fs.readFileSync(filename).length;
    R.checkBindings([{ path: filename, sha256: expected, bytes }]);
    assert.throws(() => R.checkBindings([{ path: filename, sha256: '0'.repeat(64), bytes }]));
  }
});
function fixture(t) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'option-b-admission-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const paths=new Set([B_SELECTION.acceptedBaseline,B_SELECTION.transition,ACCEPTED.historicalProof.path]);
  for(const selectedProfile of ACCEPTED.profiles){paths.add(selectedProfile.manifestPath);for(const row of JSON.parse(selectedProfile.manifestRaw)['@graph'])if(row.binding)paths.add(row.binding.path);}
  for (const p of paths) {
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
  await assert.rejects(runFileWorker(job, entry, 5000, new AbortController().signal), /hash differs|generation\/hash differs|changed input\/hash/);
});
scenario('stale source, missing source, reader substitution and wrong digest cannot initialize', async t => {
  const root = fixture(t);
  await assert.rejects(R.initializeSourceBindings(root, undefined), /digest required/);
  await assert.rejects(R.initializeSourceBindings(root, '0'.repeat(64)), /hash differs|generation\/hash differs|changed input\/hash/);
  for (const relative of [R.CONSUMER, R.COMPARISON ?? R.CHECKER ?? R.PUBLISHER, 'scripts/equation-mapping/current-source-manifest.mjs']) {
    const filename = path.join(root, relative), original = fs.readFileSync(filename);
    fs.appendFileSync(filename, '\n'); await assert.rejects(R.initializeSourceBindings(root, digest), /hash differs|generation\/hash differs|changed input\/hash/);
    fs.writeFileSync(filename, original); fs.unlinkSync(filename); await assert.rejects(R.initializeSourceBindings(root, digest)); fs.writeFileSync(filename, original);
  }
  assert.equal(R.SOURCE_BINDINGS, undefined, 'failed initialization cannot reuse prior bindings');
});
scenario('graph changes cannot inherit either launch or reviewed B transition identity', async t => {
  const root = fixture(t);
  for (const mutate of [m => m['@graph'].pop(), m => m['@graph'][0].role = 'scientific-control', m => m['@graph'].push(m['@graph'][0]), m => m['@graph'][0].binding.selector.kind = 'literal']) {
    const changed = structuredClone(map); mutate(changed); const candidate = Buffer.from(JSON.stringify(changed));
    fs.writeFileSync(path.join(root, MANIFEST), candidate);
    await assert.rejects(R.initializeSourceBindings(root, digest), /hash differs|generation\/hash differs|changed input\/hash/);
  }
  const changed = structuredClone(map); changed['@graph'][0].binding.sha256 = '0'.repeat(64);
  fs.writeFileSync(path.join(root,MANIFEST),JSON.stringify(changed));
  assert.throws(() => inspectB(root), /Stale binding/);
});
scenario('actual launch and stage CLIs reject untrusted map before process/scientific dispatch', () => {
  const hashes = p => sha256(fs.readFileSync(path.join(ROOT, p)));
  const launchArgs = [path.join(ROOT, R.LAUNCHER), '--out', 'unused', '--plan', path.join(ROOT,'missing-plan'), '--plan-sha256', '1'.repeat(64), '--entry-sha256', hashes(R.ENTRY), '--launcher-sha256', hashes(R.LAUNCHER), '--source-map-sha256', '0'.repeat(64)];
  if(profile === 'f6c-acceleration')launchArgs.push('--python','/synthetic/python','--git-binary','/usr/bin/git');
  const launch = spawnSync(process.execPath, launchArgs, { cwd: ROOT, encoding: 'utf8', timeout: 5000 });
  assert.equal(launch.status, 1); assert.match(launch.stderr, /hash differs|generation\/hash differs|changed input\/hash/); assert.doesNotMatch(launch.stderr, /missing-plan/);
  const stageArgs = [path.join(ROOT, R.ENTRY), '--plan', path.join(ROOT,'missing-plan'), '--plan-sha256', '1'.repeat(64), '--entry-sha256', hashes(R.ENTRY), '--launcher-sha256', hashes(R.LAUNCHER), '--stage', 'consumer', '--out', 'unused', '--deadline-ns', '1', '--manifest-sha256', 'none', '--source-map-sha256', '0'.repeat(64)];
  if(profile === 'prescribed-response'){stageArgs[stageArgs.indexOf('--manifest-sha256')]='--publication-job-sha256';}
  if(profile === 'f6c-acceleration'){stageArgs[stageArgs.indexOf('--manifest-sha256')]='--candidate-sha256';stageArgs.push('--python','/synthetic/python','--git-binary','/usr/bin/git');}
  const stage = spawnSync(process.execPath, stageArgs, { cwd: ROOT, encoding: 'utf8', timeout: 5000 });
  assert.equal(stage.status, 1); assert.match(stage.stderr, /hash differs|generation\/hash differs|changed input\/hash/); assert.doesNotMatch(stage.stderr, /missing-plan/);
  for (const args of [launchArgs, stageArgs]) {
    const selectedArgs = [...args]; selectedArgs[selectedArgs.indexOf('--source-map-sha256') + 1] = digest;
    const admitted = spawnSync(process.execPath, selectedArgs, { cwd: ROOT, encoding: 'utf8', timeout: 5000 });
    assert.equal(admitted.status, 1); assert.match(admitted.stderr, /missing-plan/); assert.doesNotMatch(admitted.stderr, /hash differs|generation\/hash differs|changed input\/hash/);
  }
});

scenario('manifests selected for every other profile cannot authorize this entry', async t => {
  const root = fixture(t);
  for (const other of Object.values(PROFILES).filter(p => p.scope !== selected.scope)) {
  const otherRaw = fs.readFileSync(path.join(ROOT, other.manifest));
  fs.writeFileSync(path.join(root, MANIFEST), otherRaw);
  await assert.rejects(R.initializeSourceBindings(root, sha256(otherRaw)), /Wrong manifest scope/);
  assert.throws(() => inspectB(root), /Stale binding/);
  }
});
}

test('full profile retains its saved pilot plan as historical evidence regardless of directory', t => {
  const selected = PROFILES['cached-root-cover-full'];
  const baseline = ACCEPTED.profiles.find(row=>row.name==='cached-root-cover-full');
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, selected.manifest)));
  const savedPlan = 'reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json';
  assert.equal(baseline.historicalEvidenceBindings.find(b => b.path === savedPlan).category, 'historical-evidence-retained');
  assert.equal(map['@graph'].some(r => r.binding?.path === savedPlan), false);
  const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'b-retained-evidence-')));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const changed=structuredClone(ACCEPTED);
  changed.profiles.find(row=>row.name==='cached-root-cover-full').historicalEvidenceBindings.find(b=>b.path===savedPlan).category='current-repository-binding-transfer';
  const target=path.join(root,B_SELECTION.acceptedBaseline);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify(changed));
  assert.throws(()=>inspectB(root),/Stale binding/);
});
