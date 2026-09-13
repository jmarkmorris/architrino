import { knownHashAnswers as admittedKnownHashAnswers } from '../scripts/equation-mapping/controlled-fixture-records.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CONTEXT, NS, sha256, validate } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { inspectCurrentSources, changesBetween } from '../scripts/equation-mapping/current-source-transition.mjs';

const raw = x => Buffer.from(JSON.stringify(x));
const knownHashes = admittedKnownHashAnswers("tests/option-b-current-source-transition.test.mjs");
function fixture(t) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'b-transition-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (p, bytes) => fs.writeFileSync(path.join(root, p), bytes);
  const roles = [['entry.mjs', 'admission'], ['launcher.mjs', 'launcher'], ['worker.mjs', 'current-source'], ['reference.py', 'independent-reference'], ['control.py', 'scientific-control'], ['contract.md', 'scientific-contract'], ['reader.mjs', 'manifest-reader'], ['resources.md', 'resource-plan']];
  const sources = roles.map(([p, role], i) => ({ '@id': NS + 'known-' + i, '@type': 'Source', revisionId: 'one', role, binding: { path: p, selector: { kind: 'whole' }, contract: 'fixed-byte-selection/v1', sha256: sha256('abc') } }));
  for (const [p] of roles) write(p, 'abc');
  const edges = sources.slice(1).map((s, i) => ({ '@id': NS + 'edge-' + i, '@type': 'Relationship', revisionId: 'one', kind: 'checks', from: sources[0]['@id'], fromRevision: 'one', to: s['@id'], toRevision: 'one', role: 'known admission' }));
  edges.push({ ...edges[0], '@id': NS + 'dependency', kind: 'dependsOn' });
  const before = { '@context': CONTEXT, schemaVersion: 'current-source-manifest/v1', scope: 'known-current-operation', repository: 'https://github.com/jmarkmorris/architrino.git', baseline: { commit: '1'.repeat(40), entry: 'entry.mjs', authority: 'operator-directed-existing-A-transfer' }, revisionId: 'one', '@graph': [...sources, ...edges] };
  const accepted = { schema: 'accepted-current-source-baseline/v1', historicalProof: { path: 'history.json', sha256: sha256('historical abc proof') }, profiles: [{ name: 'known', manifestPath: 'map.json', manifestRaw: raw(before).toString(), historicalEvidenceBindings: [], operationalRefreshEligibility: [{ path: 'worker.mjs', role: 'current-source', rationale: 'Hand-authored operational worker known case' }] }] };
  write('history.json', 'historical abc proof');
  let after = structuredClone(before);
  const review = { schema: 'reviewed-current-source-transition/v1', predecessorSha256: sha256(raw(accepted)), reviewReference: 'independent hand-authored known abc case', profiles: [{ name: 'known', manifestPath: 'map.json', sha256: sha256(raw(after)), changes: [] }] };
  function save() { write('accepted.json', raw(accepted)); write('transition.json', raw(review)); write('map.json', raw(after)); }
  const options = () => ({ root, requiredProfiles: ['known'], acceptedBaseline: 'accepted.json', acceptedBaselineSha256: sha256(raw(accepted)), transition: 'transition.json', transitionSha256: sha256(raw(review)) });
  const run = (extra = {}) => { save(); return inspectCurrentSources({ ...options(), ...extra }); };
  function selectChange() { review.profiles[0].sha256 = sha256(raw(after)); review.profiles[0].changes = changesBetween(before, after); }
  function advanceWorker() {
    after['@graph'][2].revisionId = 'two'; after['@graph'][9].toRevision = 'two'; after['@graph'][9].revisionId = 'two';
  }
  return { root, write, before, after, accepted, review, options, save, run, selectChange, advanceWorker };
}

test('FIRST known literal abc checkpoint and independently stated operational replacement pass', t => {
  assert.equal(knownHashes.schema, 'known-hash-answers/v1');
  assert.equal(sha256('abc'), knownHashes.sha256.abc);
  const f = fixture(t);
  assert.equal(f.run().profiles.known.sources, 8);
  f.after['@graph'][2].binding.sha256 = sha256('abcd');
  f.advanceWorker();
  f.write('worker.mjs', 'abcd');
  f.review.profiles[0].sha256 = sha256(raw(f.after));
  // Independent expected delta; do not derive the positive expectation with
  // the implementation under test.
  f.review.profiles[0].changes = [
    { pointer: '/@graph/2/binding/sha256', before: sha256('abc'), after: sha256('abcd') },
    { pointer: '/@graph/2/revisionId', before: 'one', after: 'two' },
    { pointer: '/@graph/9/revisionId', before: 'one', after: 'two' },
    { pointer: '/@graph/9/toRevision', before: 'one', after: 'two' },
  ];
  assert.equal(f.run().profiles.known.reviewedChanges, 4);
});

test('later generic profile and B-to-B-to-B checkpoint need no A history execution', t => {
  const f = fixture(t);
  f.accepted.profiles[0].name = f.review.profiles[0].name = 'later-family';
  f.review.predecessorSha256 = sha256(raw(f.accepted));
  assert.equal(f.run({ requiredProfiles: ['later-family'] }).profiles['later-family'].sourceConsistency, 'pass');
  f.after['@graph'][2].binding.sha256 = sha256('next'); f.write('worker.mjs', 'next'); f.advanceWorker(); f.selectChange();
  assert.equal(f.run({ requiredProfiles: ['later-family'] }).profiles['later-family'].reviewedChanges, 4);
  f.accepted.profiles[0].manifestRaw = raw(f.after).toString();
  f.review.predecessorSha256 = sha256(raw(f.accepted)); f.review.profiles[0].changes = [];
  assert.equal(f.run({ requiredProfiles: ['later-family'] }).profiles['later-family'].reviewedChanges, 0);
});

test('external selection omissions, wrong digests and predecessor substitution reject', t => {
  const f = fixture(t);
  for (const key of ['acceptedBaselineSha256', 'transitionSha256']) {
    assert.throws(() => f.run({ [key]: undefined }), /External digest/);
    assert.throws(() => f.run({ [key]: '0'.repeat(64) }), /Stale binding/);
  }
  f.review.predecessorSha256 = '0'.repeat(64);
  assert.throws(() => f.run(), /Wrong accepted predecessor/);
});

test('reviewed source revision updates require current relationship endpoints', t => {
  const f = fixture(t);
  f.after['@graph'][2].revisionId = 'two';
  f.after['@graph'][9].toRevision = 'two';
  f.after['@graph'][9].revisionId = 'two';
  f.after.revisionId = 'two';
  f.review.profiles[0].sha256 = sha256(raw(f.after));
  f.review.profiles[0].changes = [
    { pointer: '/@graph/2/revisionId', before: 'one', after: 'two' },
    { pointer: '/@graph/9/revisionId', before: 'one', after: 'two' },
    { pointer: '/@graph/9/toRevision', before: 'one', after: 'two' },
    { pointer: '/revisionId', before: 'one', after: 'two' },
  ];
  assert.equal(f.run().profiles.known.reviewedChanges, 4);
  f.after['@graph'][9].toRevision = 'one'; f.review.profiles[0].sha256 = sha256(raw(f.after));
  assert.throws(() => f.run(), /stale endpoint/);
});

test('closed records, duplicate profiles, dangling checks and widened authority reject', t => {
  const f = fixture(t);
  f.review.approved = true; assert.throws(() => f.run(), /record fields/); delete f.review.approved;
  f.accepted.profiles.push(f.accepted.profiles[0]); f.review.predecessorSha256 = sha256(raw(f.accepted));
  assert.throws(() => f.run(), /census/); f.accepted.profiles.pop(); f.review.predecessorSha256 = sha256(raw(f.accepted));
  f.review.reviewReference = ''; assert.throws(() => f.run(), /Review reference/); f.review.reviewReference = 'known';
  f.after['@graph'][8].to = NS + 'absent'; f.review.profiles[0].sha256 = sha256(raw(f.after));
  assert.throws(() => f.run(), /endpoint/);
});

test('candidate and edited transition cannot approve themselves under original selections', t => {
  const f = fixture(t); f.save(); const selected = f.options();
  f.after['@graph'][2].binding.sha256 = sha256('next'); f.write('worker.mjs', 'next'); f.advanceWorker(); f.selectChange(); f.save();
  assert.throws(() => inspectCurrentSources(selected), /Stale binding: transition/);
  f.review.profiles[0].changes = [];
  assert.throws(() => f.run(), /Unreviewed/);
});

for (const index of [3, 4, 5, 6, 7]) test('protected role cannot refresh even in selected transition: row ' + index, t => {
  const f = fixture(t); f.after['@graph'][index].binding.sha256 = sha256('next');
  f.after['@graph'][index].revisionId = 'two';
  f.after['@graph'][index + 7].toRevision = 'two'; f.after['@graph'][index + 7].revisionId = 'two'; f.selectChange();
  assert.throws(() => f.run(), /Protected scientific/);
});

test('hash changes and relationship endpoint changes cannot reuse revisions', t => {
  const f = fixture(t); f.after['@graph'][2].binding.sha256 = sha256('next'); f.selectChange();
  assert.throws(() => f.run(), /Revision reuse/);
  f.advanceWorker(); f.after['@graph'][9].revisionId = 'one'; f.selectChange();
  assert.throws(() => f.run(), /Revision reuse/);
});

test('eligibility defaults deny current-source hashes and revision-only changes', t => {
  const f = fixture(t); f.accepted.profiles[0].operationalRefreshEligibility = [];
  f.review.predecessorSha256 = sha256(raw(f.accepted));
  assert.equal(f.run().profiles.known.sourceConsistency, 'pass');
  f.advanceWorker(); f.selectChange(); assert.throws(() => f.run(), /not eligible: worker/);
  f.after['@graph'][2].binding.sha256 = sha256('next'); f.selectChange();
  assert.throws(() => f.run(), /not eligible: worker/);
});

test('eligibility is closed, unique, predecessor-resolved and cannot grant protected roles', t => {
  const f = fixture(t), original = structuredClone(f.accepted.profiles[0].operationalRefreshEligibility);
  for (const grant of [
    { path: 'missing.mjs', role: 'current-source', rationale: 'unknown' },
    { path: 'worker.mjs', role: 'launcher', rationale: 'wrong role' },
    { path: 'worker.mjs', role: 'current-source', rationale: '' },
    { path: 'worker.mjs', role: 'current-source', rationale: 'extra', approved: true },
    { path: 'reference.py', role: 'independent-reference', rationale: 'forbidden' },
  ]) {
    f.accepted.profiles[0].operationalRefreshEligibility = [grant]; f.review.predecessorSha256 = sha256(raw(f.accepted));
    assert.throws(() => f.run());
  }
  f.accepted.profiles[0].operationalRefreshEligibility = [...original, ...original]; f.review.predecessorSha256 = sha256(raw(f.accepted));
  assert.throws(() => f.run(), /Duplicate operational eligibility/);
  delete f.accepted.profiles[0].operationalRefreshEligibility; f.review.predecessorSha256 = sha256(raw(f.accepted));
  assert.throws(() => f.run(), /record fields/);
});

test('changed checkpoint eligibility fails under original selection before missing target is read', t => {
  const f = fixture(t); f.save(); const original = f.options();
  f.accepted.profiles[0].operationalRefreshEligibility.push({ path: 'entry.mjs', role: 'admission', rationale: 'unselected grant' });
  f.save(); fs.unlinkSync(path.join(f.root, 'map.json'));
  assert.throws(() => inspectCurrentSources(original), /Stale binding: accepted.json/);
});

test('transition record cannot introduce eligibility', t => {
  const f = fixture(t); f.review.profiles[0].operationalRefreshEligibility = f.accepted.profiles[0].operationalRefreshEligibility;
  assert.throws(() => f.run(), /record fields/);
});

for (const [name, mutate] of [
  ['role reclassification', f => { f.after['@graph'][2].role = 'launcher'; }],
  ['worker substitution', f => { f.after['@graph'][2].binding.path = 'other.mjs'; }],
  ['stage substitution', f => { f.after['@graph'][0].binding.path = 'other-entry.mjs'; }],
  ['scope', f => { f.after.scope = 'another'; }],
  ['historical ancestry', f => { f.after.baseline.commit = '2'.repeat(40); }],
  ['edge deletion', f => { f.after['@graph'].pop(); }],
  ['source deletion', f => { f.after['@graph'].splice(2, 1); }],
  ['source addition', f => { f.after['@graph'].push({ ...f.after['@graph'][2], '@id': NS + 'extra', binding: { ...f.after['@graph'][2].binding, path: 'extra.mjs' } }); }],
  ['edge role change', f => { f.after['@graph'][8].role = 'weaker check'; }],
]) test('reject ' + name, t => {
  const f = fixture(t); mutate(f); f.review.profiles[0].sha256 = sha256(raw(f.after));
  assert.throws(() => f.run());
});

test('exact profile census and path cannot be narrowed by either external record', t => {
  const f = fixture(t);
  assert.throws(() => f.run({ requiredProfiles: [] }), /census/);
  assert.throws(() => f.run({ requiredProfiles: ['known', 'missing'] }), /census/);
  f.review.profiles[0].manifestPath = 'other.json'; assert.throws(() => f.run(), /map path/);
  f.review.profiles = []; assert.throws(() => f.run(), /census/);
});

test('stale source, extraneous change, duplicate JSON and symlink reject', t => {
  const f = fixture(t); f.write('worker.mjs', 'stale'); assert.throws(() => f.run(), /Stale binding/);
  f.write('worker.mjs', 'abc'); f.review.profiles[0].changes = [{ pointer: '/revisionId', before: 'one', after: 'two' }];
  assert.throws(() => f.run(), /extraneous/); f.review.profiles[0].changes = []; f.save();
  const duplicate = Buffer.from('{"schema":"one","schema":"two"}'); f.write('transition.json', duplicate);
  assert.throws(() => inspectCurrentSources({ ...f.options(), transitionSha256: sha256(duplicate) }), /Duplicate/);
  fs.renameSync(path.join(f.root, 'worker.mjs'), path.join(f.root, 'real.mjs'));
  fs.symlinkSync('real.mjs', path.join(f.root, 'worker.mjs')); assert.throws(() => f.run(), /symlink/);
});

for (const p of ['accepted.json', 'transition.json', 'history.json', 'map.json', 'entry.mjs', 'worker.mjs']) test('final check rejects original same-byte replacement: ' + p, t => {
  const f = fixture(t);
  assert.throws(() => f.run({ beforeFinalCheck() {
    const target = path.join(f.root, p); fs.writeFileSync(target + '.replacement', fs.readFileSync(target)); fs.renameSync(target + '.replacement', target);
  } }), /Original identity replaced/);
});

test('CLI has no ambient selection or refresh fallback', () => {
  for (const args of [[], ['--refresh'], ['--approved', 'true']]) {
    const r = spawnSync(process.execPath, ['scripts/equation-mapping/check-current-source-maps.mjs', ...args], { encoding: 'utf8' });
    assert.equal(r.status, 1); assert.equal(r.stdout, ''); assert.match(r.stderr, /external/i);
  }
});

test('FIFO capture rejects without waiting for a writer, under a bounded child timeout', t => {
  const f = fixture(t);
  const fifo = path.join(f.root, 'untrusted.fifo');
  const made = spawnSync('mkfifo', [fifo], { encoding: 'utf8', timeout: 1000 });
  assert.equal(made.error, undefined); assert.equal(made.status, 0, made.stderr);
  const moduleURL = new URL('../scripts/equation-mapping/current-source-transition.mjs', import.meta.url).href;
  const script = `import assert from 'node:assert/strict';
    import { captureSet } from ${JSON.stringify(moduleURL)};
    const files = captureSet(process.argv[1]);
    assert.equal(files.capture('worker.mjs', process.argv[2]).toString(), 'abc');
    assert.throws(() => files.capture('untrusted.fifo', process.argv[2]), /must be regular/);
    console.log('FIFO rejected');`;
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', script, f.root, knownHashes.sha256.abc], { encoding: 'utf8', timeout: 1000, killSignal: 'SIGKILL' });
  assert.equal(result.error, undefined, 'Capture blocked before regular-file check');
  assert.equal(result.status, 0, result.stderr); assert.equal(result.signal, null);
  assert.equal(result.stdout.trim(), 'FIFO rejected');
});

// Actual inherited bindings are exercised only after the independent known
// fixture controls above. These tests copy metadata/source bytes, never launch
// the scientific sources or modify the repository's target maps/documents.
for (const scientificPath of [
  'reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md',
  'reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md',
]) test('actual inherited current-source scientific obligation remains fixed: ' + scientificPath, t => {
  const f = fixture(t), repo = fs.realpathSync(new URL('../', import.meta.url));
  const selected = JSON.parse(fs.readFileSync(new URL('../reference/priorities/development-process-review/contracts/option-b-five-profile-selection.json', import.meta.url)));
  const { schema, ...selection } = selected;
  assert.equal(schema, 'current-source-acceptance-selection/v1');
  const accepted = JSON.parse(fs.readFileSync(path.join(repo, selection.acceptedBaseline)));
  const review = JSON.parse(fs.readFileSync(path.join(repo, selection.transition)));
  const copyPaths = new Set([selection.acceptedBaseline, selection.transition, accepted.historicalProof.path]);
  for (const p of accepted.profiles) {
    copyPaths.add(p.manifestPath);
    for (const source of validate(JSON.parse(p.manifestRaw)).sources.values()) copyPaths.add(source.binding.path);
  }
  for (const p of copyPaths) { fs.mkdirSync(path.dirname(path.join(f.root, p)), { recursive: true }); fs.copyFileSync(path.join(repo, p), path.join(f.root, p)); }
  const options = { root: f.root, ...selection, requiredProfiles: accepted.profiles.map(p => p.name) };
  assert.equal(inspectCurrentSources(options).profiles['f6c-acceleration'].sourceConsistency, 'pass');
  const prior = accepted.profiles.find(p => p.name === 'f6c-acceleration');
  const before = JSON.parse(prior.manifestRaw), after = structuredClone(before);
  const source = after['@graph'].find(r => r['@type'] === 'Source' && r.binding.path === scientificPath);
  assert.equal(source.role, 'current-source');
  assert.ok(!prior.operationalRefreshEligibility.some(g => g.path === scientificPath));
  source.binding.sha256 = sha256('unapproved scientific successor'); source.revisionId += '/candidate';
  for (const edge of after['@graph'].filter(r => r['@type'] === 'Relationship' && (r.from === source['@id'] || r.to === source['@id']))) {
    if (edge.from === source['@id']) edge.fromRevision = source.revisionId;
    if (edge.to === source['@id']) edge.toRevision = source.revisionId;
    edge.revisionId += '/candidate';
  }
  validate(after); // The candidate is graph-valid, not rejected by stale revisions.
  const candidate = review.profiles.find(p => p.name === prior.name);
  candidate.sha256 = sha256(raw(after)); candidate.changes = changesBetween(before, after);
  fs.writeFileSync(path.join(f.root, prior.manifestPath), raw(after));
  fs.writeFileSync(path.join(f.root, selection.transition), raw(review));
  assert.throws(() => inspectCurrentSources({ ...options, transitionSha256: sha256(raw(review)) }), error => error.message === 'Operational refresh not eligible: ' + scientificPath);
});
