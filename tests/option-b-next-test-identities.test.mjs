import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, mkdtempSync, copyFileSync, writeFileSync, rmSync, renameSync, realpathSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { captureNextTestIdentities, loadNextTestIdentities, NEXT_TEST_PROFILE, NEXT_TEST_MANIFEST, NEXT_TEST_PAYLOAD, NEXT_TEST_SELECTION } from './support/option-b-next-test-identities.mjs';

import { decode, validate, sha256 } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { compareSourceManifests } from '../scripts/equation-mapping/current-source-impact.mjs';

const raw = value => Buffer.from(JSON.stringify(value));
const known = () => ({ schema: 'option-b-next-test-identities/v1', authority: 'operator-directed-exact-expectation-transfer', originCommit: '1'.repeat(40), claimBoundary: 'Independent synthetic shape control, no scientific claim', consumers: { 'tests/known.mjs': { sourceSha256: '2'.repeat(64), expectations: [{ role: 'historical-fixture', meaning: 'Hand-authored known literal', sha256: '3'.repeat(64) }] } } });

test('FIRST independent known shape captures the exact supplied immutable primitive', () => {
  const source = known(), bytes = raw(source), captured = captureNextTestIdentities(bytes, 'tests/known.mjs', 1);
  assert.deepEqual(captured, ['3'.repeat(64)]); assert.ok(Object.isFrozen(captured));
  source.consumers['tests/known.mjs'].expectations[0].sha256 = '4'.repeat(64); bytes.fill(0);
  assert.deepEqual(captured, ['3'.repeat(64)]);
  assert.throws(() => { captured[0] = '4'.repeat(64); }, TypeError);
});

test('closed metadata, consumer, expectation row, types and cardinality fail closed', () => {
  const changes = [
    r => r.extra = true, r => delete r.authority, r => r.schema += '/unknown', r => r.originCommit = 1,
    r => r.consumers = [], r => r.consumers = {}, r => r.consumers['tests/known.mjs'].extra = true,
    r => r.consumers['tests/known.mjs'].sourceSha256 = '', r => r.consumers['tests/known.mjs'].expectations = [],
    r => r.consumers['tests/known.mjs'].expectations[0].extra = true,
    r => r.consumers['tests/known.mjs'].expectations[0].role = 'self-approved',
    r => r.consumers['tests/known.mjs'].expectations[0].meaning = '',
  ];
  for (const value of ['', null, 1, {}, 'A'.repeat(64), '3'.repeat(63), '3'.repeat(65)]) changes.push(r => r.consumers['tests/known.mjs'].expectations[0].sha256 = value);
  for (const change of changes) { const record = known(); change(record); assert.throws(() => captureNextTestIdentities(raw(record), 'tests/known.mjs', 1)); }
  for (const count of [0, 2, -1, NaN, '1']) assert.throws(() => captureNextTestIdentities(raw(known()), 'tests/known.mjs', count));
  assert.throws(() => captureNextTestIdentities(raw(known()), 'tests/absent.mjs', 1), /Missing test consumer/);
  assert.throws(() => captureNextTestIdentities(Buffer.from('{"schema":1,"schema":2}'), 'tests/known.mjs', 1), /Duplicate JSON key/);
});

test('actual external record matches each consumer fixed count without importing subjects', () => {
  const bytes = readFileSync(new URL('./fixtures/option-b-next-test-identities.json', import.meta.url));
  const record = JSON.parse(bytes);
  for (const [consumer, entry] of Object.entries(record.consumers)) {
    const source = readFileSync(new URL('../' + consumer, import.meta.url), 'utf8');
    const call = /const NEXT_TEST_SHA = nextTestIdentities\(("[^"]+"), (\d+)\);/u.exec(source);
    assert.ok(call, consumer); assert.equal(JSON.parse(call[1]), consumer);
    const selected = loadNextTestIdentities({ selection: decode(readFileSync(NEXT_TEST_SELECTION)), consumer, count: Number(call[2]) });
    assert.deepEqual(selected, entry.expectations.map(row => row.sha256));
  }
});

test('actual closure consumer requires selection and rejects malformed fixture before controls run', t => {
  const {root} = selectedFixture(t);
  const record = JSON.parse(readFileSync(NEXT_TEST_PAYLOAD));
  const fixturePath = path.join(root, NEXT_TEST_PAYLOAD);
  const originalPayload = readFileSync(fixturePath);
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
  const run = () => spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'tests/f6c-bounded-operation-closure.test.js'], { cwd: root, env, encoding: 'utf8', timeout: 3000 });
  const positive = run();
  assert.equal(positive.error, undefined); assert.equal(positive.status, 0, positive.stdout + positive.stderr);
  assert.match(positive.stdout, /literal positive: external closure/);
  record.consumers['tests/f6c-bounded-operation-closure.test.js'].expectations[0].sha256 = '';
  writeFileSync(fixturePath, JSON.stringify(record));
  const result = run();
  assert.equal(result.error, undefined); assert.equal(result.status, 1, result.stdout + result.stderr); assert.equal(result.signal, null);
  assert.match(result.stdout + result.stderr, /Stale binding/);
  assert.doesNotMatch(result.stdout, /literal positive: external closure/);
  writeFileSync(fixturePath,originalPayload);
  const selectionPath=path.join(root,NEXT_TEST_SELECTION),selectionBytes=readFileSync(selectionPath);
  renameSync(selectionPath,selectionPath+'.absent');
  const missing=run();assert.equal(missing.status,1);assert.match(missing.stdout+missing.stderr,/ENOENT/);assert.doesNotMatch(missing.stdout,/literal positive: external closure/);
  renameSync(selectionPath+'.absent',selectionPath);
  const wrong=decode(selectionBytes);wrong.transitionSha256='0'.repeat(64);writeFileSync(selectionPath,JSON.stringify(wrong));
  const rejected=run();assert.equal(rejected.status,1);assert.match(rejected.stdout+rejected.stderr,/Stale binding/);assert.doesNotMatch(rejected.stdout,/literal positive: external closure/);
  writeFileSync(selectionPath,selectionBytes);assert.equal(run().status,0);
});

// Copy the selected closure without executing its scientific consumers.
function selectedFixture(t) {
  const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'next-test-identities-graph-')));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const selection = decode(readFileSync(NEXT_TEST_SELECTION));
  const accepted = decode(readFileSync(selection.acceptedBaseline));
  const graph = decode(readFileSync(NEXT_TEST_MANIFEST));
  const paths = new Set([NEXT_TEST_SELECTION, selection.acceptedBaseline, selection.transition, accepted.historicalProof.path,
    NEXT_TEST_MANIFEST, ...graph['@graph'].filter(row => row.binding).map(row => row.binding.path)]);
  for (const p of paths) {
    mkdirSync(path.dirname(path.join(root,p)), {recursive:true}); copyFileSync(p,path.join(root,p));
  }
  const run = (overrides = {}) => loadNextTestIdentities({root,selection,consumer:'tests/f6c-bounded-operation-closure.test.js',count:1,...overrides});
  return {root,selection,graph,run};
}

test('original payload consumer sources and shape validator remain exact against retained Git', () => {
  const proof = decode(readFileSync('reference/priorities/development-process-review/evidence/option-b-next-test-graph-transfer.json'));
  const unchanged = proof.originalBindings.filter(row => row.path === NEXT_TEST_PAYLOAD || decode(readFileSync(NEXT_TEST_PAYLOAD)).consumers[row.path]);
  for (const row of unchanged) {
    const original = execFileSync('git',['show',proof.originCommit+':'+row.path]);
    assert.equal(sha256(original),row.sha256); assert.deepEqual(readFileSync(row.path),original);
  }
  // A known delimiter case establishes the bounded function extractor first.
  const extract = source => source.split('export function captureNextTestIdentities')[1].split('\nlet capturedRaw;')[0].trimEnd();
  assert.equal(extract('export function captureNextTestIdentities(x) { return x; }\nlet capturedRaw;'), '(x) { return x; }');
  const originalHelper = execFileSync('git',['show',proof.originCommit+':tests/support/option-b-next-test-identities.mjs'],{encoding:'utf8'});
  const old = proof.originalBindings.find(row=>row.path==='tests/support/option-b-next-test-identities.mjs');
  assert.equal(sha256(originalHelper),old.sha256);
  assert.equal(captureNextTestIdentities.toString(),'function captureNextTestIdentities'+extract(originalHelper));
});

test('known admitted selection precedes missing wrong malformed stale and substituted-file controls',t=>{
  const f=selectedFixture(t),expected=f.run();assert.equal(expected.length,1);assert.ok(Object.isFrozen(expected));
  for(const selection of [undefined,{}, {...f.selection,extra:true}, {...f.selection,acceptedBaselineSha256:'0'.repeat(64)}, {...f.selection,transitionSha256:'0'.repeat(64)}])assert.throws(()=>f.run({selection}));
  assert.throws(()=>f.run({consumer:'tests/not-selected.js'}),/Selected consumer/);
  for(const p of [NEXT_TEST_PAYLOAD,'tests/support/option-b-next-test-identities.mjs','tests/f6c-bounded-operation-closure.test.js']){
    const file=path.join(f.root,p),bytes=readFileSync(file);
    writeFileSync(file,Buffer.concat([bytes,Buffer.from(' ')]));assert.throws(()=>f.run(),/Stale binding/);writeFileSync(file,bytes);
    renameSync(file,file+'.absent');assert.throws(()=>f.run());renameSync(file+'.absent',file);
    renameSync(file,file+'.real');symlinkSync(file+'.real',file);assert.throws(()=>f.run(),/symlink/);rmSync(file);renameSync(file+'.real',file);
  }
  assert.deepEqual(f.run(),expected);
  assert.throws(()=>f.run({beforeFinalCheck:()=>{const file=path.join(f.root,NEXT_TEST_PAYLOAD);copyFileSync(file,file+'.new');renameSync(file+'.new',file);}}),/Original identity replaced/);
  assert.deepEqual(expected,f.run()); // Earlier returned primitives are immutable.
});

test('protected payload consumer census and relationships cannot be refreshed by a selected transition',t=>{
  const f=selectedFixture(t);assert.equal(f.run().length,1);
  const mapFile=path.join(f.root,NEXT_TEST_MANIFEST),transitionFile=path.join(f.root,f.selection.transition);
  const mapBytes=readFileSync(mapFile),transitionBytes=readFileSync(transitionFile);
  const payloadId=f.graph['@graph'].find(r=>r.binding?.path===NEXT_TEST_PAYLOAD)['@id'];
  for(const change of [
    map=>map['@graph'].splice(map['@graph'].findIndex(r=>r.kind==='dependsOn'),1),
    map=>{const r=map['@graph'].find(r=>r['@id']===payloadId);r.role='current-source';r.revisionId+='-role';},
    map=>{const r=map['@graph'].find(r=>r['@id']===payloadId);r.binding.sha256='0'.repeat(64);r.revisionId+='-refresh';for(const e of map['@graph'].filter(e=>e.to===payloadId)){e.toRevision=r.revisionId;e.revisionId+='-refresh';}},
    map=>{const id=map['@graph'].find(r=>r.binding?.path==='tests/f6c-bounded-operation-closure.test.js')['@id'];map['@graph']=map['@graph'].filter(r=>r['@id']!==id&&r.from!==id&&r.to!==id);},
  ]){
    const candidate=decode(mapBytes);change(candidate);candidate.revisionId+='-candidate';writeFileSync(mapFile,JSON.stringify(candidate));
    const transition=decode(transitionBytes);transition.profiles[0].sha256=sha256(readFileSync(mapFile));writeFileSync(transitionFile,JSON.stringify(transition));
    assert.throws(()=>f.run({selection:{...f.selection,transitionSha256:sha256(readFileSync(transitionFile))}}));
    writeFileSync(mapFile,mapBytes);writeFileSync(transitionFile,transitionBytes);
  }
  assert.equal(f.run().length,1);
});

test('standard graph query carries payload changes and removed edges to every declared consumer',async()=>{
  const before=decode(readFileSync(NEXT_TEST_MANIFEST)),graph=validate(before),record=decode(readFileSync(NEXT_TEST_PAYLOAD));
  assert.equal((await compareSourceManifests(before,before)).status,'unchanged');
  const payload=[...graph.sources.values()].find(r=>r.binding.path===NEXT_TEST_PAYLOAD);
  const reader=[...graph.sources.values()].find(r=>r.role==='admission');
  for(const p of Object.keys(record.consumers)){
    const consumer=[...graph.sources.values()].find(r=>r.binding.path===p);assert.equal(consumer.role,'scientific-control');
    for(const dependency of [payload,reader])assert.ok(graph.edges.some(e=>e.kind==='dependsOn'&&e.from===consumer['@id']&&e.to===dependency['@id']));
  }
  const after=structuredClone(before),changed=after['@graph'].find(r=>r['@id']===payload['@id']);
  changed.revisionId+='-new';changed.binding.sha256='0'.repeat(64);after.revisionId+='-new';
  for(const e of after['@graph'].filter(r=>r.to===changed['@id'])){e.toRevision=changed.revisionId;e.revisionId+='-new';}
  after['@graph']=after['@graph'].filter(r=>!(r.kind==='dependsOn'&&r.to===changed['@id']));
  const impact=await compareSourceManifests(before,after);
  assert.equal(impact.status,'review-required');assert.ok(impact.removed.length);
  for(const p of Object.keys(record.consumers))assert.ok(impact.affected.includes([...graph.sources.values()].find(r=>r.binding.path===p)['@id']));
  assert.ok(impact.selectedChecks.includes(reader['@id']));
});
