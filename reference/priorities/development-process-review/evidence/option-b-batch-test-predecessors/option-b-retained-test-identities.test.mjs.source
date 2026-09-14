import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, mkdtempSync, copyFileSync, writeFileSync, rmSync, renameSync, realpathSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { captureRetainedTestIdentities, retainedConsumers, loadRetainedTestIdentities, RETAINED_TEST_MANIFEST, RETAINED_TEST_PAYLOAD, RETAINED_TEST_SELECTION } from './support/option-b-retained-test-identities.mjs';
import { decode, validate, sha256 } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { compareSourceManifests } from '../scripts/equation-mapping/current-source-impact.mjs';

const raw = value => Buffer.from(JSON.stringify(value));
const consumer = 'tests/mermaid-markdown-runtime.test.js';
const known = () => ({
  schema: 'option-b-retained-test-identities/v1', authority: 'operator-directed-exact-expectation-transfer',
  roleOwner: 'records/roles.json', originCommit: '1'.repeat(40), claimBoundary: 'Hand-authored schema example; no scientific claim',
  f5PreparationSelection: { consumer: 'tests/known.mjs', path: 'records/map.jsonld', sha256: '2'.repeat(64), role: 'Explicit selection', acceptanceReference: 'records/review.md' },
  mermaid: { consumer: 'tests/known.mjs', role: 'Vendor expectation', runtimeSha256: '3'.repeat(64), licenseSha256: '4'.repeat(64), packageIntegrity: 'sha512-' + 'A'.repeat(86) + '==' },
  orthogonalWeave: { consumer: 'tests/known.mjs', role: 'Fixed seed', modelRevisionSha256: '5'.repeat(64) },
  byConsumer: { 'tests/known.mjs': { role: 'Historical result', algorithm: 'SHA-256', encoding: 'lowercase hexadecimal', sha256: ['6'.repeat(64)] } },
});

test('FIRST hand-authored record preserves distinct roles values and deep immutability', () => {
  const record = known(), bytes = raw(record), captured = captureRetainedTestIdentities(bytes, 'tests/known.mjs');
  assert.deepEqual(captured, record); assert.ok(Object.isFrozen(captured.byConsumer['tests/known.mjs'].sha256));
  record.mermaid.role = 'changed'; bytes.fill(0);
  assert.equal(captured.mermaid.role, 'Vendor expectation');
  assert.throws(() => { captured.byConsumer['tests/known.mjs'].sha256[0] = '7'.repeat(64); }, TypeError);
});

test('closed schema duplicate keys malformed identities and absent consumers reject', () => {
  const changes = [r => r.extra = true, r => delete r.authority, r => r.schema += '/unknown', r => r.originCommit = 1,
    r => r.roleOwner = '../unsafe', r => r.byConsumer = [], r => r.byConsumer = {},
    r => r.byConsumer['tests/known.mjs'].sha256 = [], r => r.byConsumer['tests/known.mjs'].algorithm = 'SHA-1',
    r => r.byConsumer['tests/known.mjs'].encoding = 'base64', r => r.byConsumer['tests/known.mjs'].role = '',
    r => r.mermaid.packageIntegrity = 'sha512-short', r => r.f5PreparationSelection.consumer = 'src/not-test.js',
  ];
  for (const field of ['mermaid', 'orthogonalWeave', 'f5PreparationSelection']) changes.push(r => r[field].extra = true);
  for (const value of ['', null, 1, {}, 'A'.repeat(64), '3'.repeat(63), '3'.repeat(65)]) {
    changes.push(r => r.mermaid.runtimeSha256 = value, r => r.byConsumer['tests/known.mjs'].sha256[0] = value);
  }
  for (const change of changes) { const record = known(); change(record); assert.throws(() => captureRetainedTestIdentities(raw(record), 'tests/known.mjs')); }
  assert.throws(() => captureRetainedTestIdentities(raw(known()), 'tests/absent.mjs'), /Missing test consumer/);
  assert.throws(() => captureRetainedTestIdentities(Buffer.from('{"schema":1,"schema":2}'), 'tests/known.mjs'), /Duplicate JSON key/);
});

function selectedFixture(t) {
  const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'retained-test-identities-graph-')));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const selection = decode(readFileSync(RETAINED_TEST_SELECTION));
  const accepted = decode(readFileSync(selection.acceptedBaseline));
  const graph = decode(readFileSync(RETAINED_TEST_MANIFEST));
  const paths = new Set([RETAINED_TEST_SELECTION, selection.acceptedBaseline, selection.transition, accepted.historicalProof.path,
    RETAINED_TEST_MANIFEST, ...graph['@graph'].filter(row => row.binding).map(row => row.binding.path)]);
  for (const p of paths) { mkdirSync(path.dirname(path.join(root, p)), { recursive: true }); copyFileSync(p, path.join(root, p)); }
  const run = (overrides = {}) => loadRetainedTestIdentities({ root, selection, consumer, ...overrides });
  return { root, selection, graph, run };
}

test('payload remains exact and all consumer changes are solely import admission', () => {
  const proof = decode(readFileSync('reference/priorities/development-process-review/evidence/option-b-retained-test-graph-transfer.json'));
  // Check the inverse on a hand-authored source before real consumers.
  const inverse = (source, name, p, quote) => source.replace(`import { retainedTestIdentities } from './support/option-b-retained-test-identities.mjs';\nconst ${name} = retainedTestIdentities(${JSON.stringify(p)});`, `import ${name} from ${quote}./fixtures/option-b-retained-test-identities.json${quote} with { type: ${quote}json${quote} };`);
  assert.equal(inverse("import { retainedTestIdentities } from './support/option-b-retained-test-identities.mjs';\nconst x = retainedTestIdentities(\"tests/x.js\");\nassertion;", 'x', 'tests/x.js', "'"), "import x from './fixtures/option-b-retained-test-identities.json' with { type: 'json' };\nassertion;");
  const payload = readFileSync(RETAINED_TEST_PAYLOAD), record = decode(payload);
  assert.deepEqual(retainedConsumers(record), proof.consumers);
  assert.deepEqual(payload, execFileSync('git', ['show', proof.originCommit + ':' + RETAINED_TEST_PAYLOAD]));
  for (const p of proof.consumers) {
    const original = execFileSync('git', ['show', proof.originCommit + ':' + p], { encoding: 'utf8' });
    assert.equal(sha256(original), proof.originalBindings.find(row => row.path === p).sha256);
    const quote = original.includes('import optionBIdentities from') ? "'" : '"';
    const name = quote === "'" ? 'optionBIdentities' : 'identities';
    assert.equal(inverse(readFileSync(p, 'utf8'), name, p, quote), original, p);
    assert.deepEqual(loadRetainedTestIdentities({ selection: decode(readFileSync(RETAINED_TEST_SELECTION)), consumer: p }), record);
  }
});

test('actual Mermaid consumer passes before missing wrong or changed selection rejects before tests', t => {
  const { root } = selectedFixture(t), fixturePath = path.join(root, RETAINED_TEST_PAYLOAD), payload = readFileSync(fixturePath);
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
  // One actual runtime control is sufficient for the admission boundary;
  // all vendor/runtime assertions run in the separate complete consumer suite.
  const run = () => spawnSync(process.execPath, ['--test', '--test-reporter=tap', '--test-name-pattern=Mermaid configuration', consumer], { cwd: root, env, encoding: 'utf8', timeout: 5000 });
  const positive = run(); assert.equal(positive.error, undefined); assert.equal(positive.status, 0, positive.stdout + positive.stderr);
  assert.match(positive.stdout, /ok 1 - Mermaid configuration/);
  const reject = pattern => { const result = run(); assert.equal(result.error, undefined); assert.equal(result.status, 1, result.stdout + result.stderr); assert.match(result.stdout + result.stderr, pattern); assert.doesNotMatch(result.stdout, /ok 1 - Mermaid configuration/); };
  for (const change of [r => r.mermaid.runtimeSha256 = '', r => r.byConsumer[Object.keys(r.byConsumer)[0]].role = 'current-source']) {
    const record = decode(payload); change(record); writeFileSync(fixturePath, JSON.stringify(record)); reject(/Stale binding/); writeFileSync(fixturePath, payload);
  }
  const selectionPath = path.join(root, RETAINED_TEST_SELECTION), bytes = readFileSync(selectionPath);
  renameSync(selectionPath, selectionPath + '.absent'); reject(/ENOENT/); renameSync(selectionPath + '.absent', selectionPath);
  const wrong = decode(bytes); wrong.transitionSha256 = '0'.repeat(64); writeFileSync(selectionPath, JSON.stringify(wrong)); reject(/Stale binding/);
  writeFileSync(selectionPath, bytes); assert.equal(run().status, 0);
});

test('known admitted selection precedes missing wrong malformed stale and substituted-file controls',t=>{
  const f=selectedFixture(t),expected=f.run();assert.equal(expected.schema,'option-b-retained-test-identities/v1');assert.ok(Object.isFrozen(expected));
  for(const selection of [undefined,{}, {...f.selection,extra:true}, {...f.selection,acceptedBaselineSha256:'0'.repeat(64)}, {...f.selection,transitionSha256:'0'.repeat(64)}])assert.throws(()=>f.run({selection}));
  assert.throws(()=>f.run({consumer:'tests/not-selected.js'}),/Selected consumer/);
  for(const p of [RETAINED_TEST_PAYLOAD,'tests/support/option-b-retained-test-identities.mjs','tests/mermaid-markdown-runtime.test.js']){
    const file=path.join(f.root,p),bytes=readFileSync(file);
    writeFileSync(file,Buffer.concat([bytes,Buffer.from(' ')]));assert.throws(()=>f.run(),/Stale binding/);writeFileSync(file,bytes);
    renameSync(file,file+'.absent');assert.throws(()=>f.run());renameSync(file+'.absent',file);
    renameSync(file,file+'.real');symlinkSync(file+'.real',file);assert.throws(()=>f.run(),/symlink/);rmSync(file);renameSync(file+'.real',file);
  }
  assert.deepEqual(f.run(),expected);
  assert.throws(()=>f.run({beforeFinalCheck:()=>{const file=path.join(f.root,RETAINED_TEST_PAYLOAD);copyFileSync(file,file+'.new');renameSync(file+'.new',file);}}),/Original identity replaced/);
  assert.deepEqual(expected,f.run()); // Earlier returned primitives are immutable.
});

test('protected payload consumer census and relationships cannot be refreshed by a selected transition',t=>{
  const f=selectedFixture(t);assert.equal(f.run().schema,'option-b-retained-test-identities/v1');
  const mapFile=path.join(f.root,RETAINED_TEST_MANIFEST),transitionFile=path.join(f.root,f.selection.transition);
  const mapBytes=readFileSync(mapFile),transitionBytes=readFileSync(transitionFile);
  const payloadId=f.graph['@graph'].find(r=>r.binding?.path===RETAINED_TEST_PAYLOAD)['@id'];
  for(const change of [
    map=>map['@graph'].splice(map['@graph'].findIndex(r=>r.kind==='dependsOn'),1),
    map=>{const r=map['@graph'].find(r=>r['@id']===payloadId);r.role='current-source';r.revisionId+='-role';},
    map=>{const r=map['@graph'].find(r=>r['@id']===payloadId);r.binding.sha256='0'.repeat(64);r.revisionId+='-refresh';for(const e of map['@graph'].filter(e=>e.to===payloadId)){e.toRevision=r.revisionId;e.revisionId+='-refresh';}},
    map=>{const id=map['@graph'].find(r=>r.binding?.path==='tests/mermaid-markdown-runtime.test.js')['@id'];map['@graph']=map['@graph'].filter(r=>r['@id']!==id&&r.from!==id&&r.to!==id);},
  ]){
    const candidate=decode(mapBytes);change(candidate);candidate.revisionId+='-candidate';writeFileSync(mapFile,JSON.stringify(candidate));
    const transition=decode(transitionBytes);transition.profiles[0].sha256=sha256(readFileSync(mapFile));writeFileSync(transitionFile,JSON.stringify(transition));
    assert.throws(()=>f.run({selection:{...f.selection,transitionSha256:sha256(readFileSync(transitionFile))}}));
    writeFileSync(mapFile,mapBytes);writeFileSync(transitionFile,transitionBytes);
  }
  assert.equal(f.run().schema,'option-b-retained-test-identities/v1');
});

test('standard graph query carries payload changes and removed edges to every declared consumer',async()=>{
  const before=decode(readFileSync(RETAINED_TEST_MANIFEST)),graph=validate(before),record=decode(readFileSync(RETAINED_TEST_PAYLOAD));
  assert.equal((await compareSourceManifests(before,before)).status,'unchanged');
  const payload=[...graph.sources.values()].find(r=>r.binding.path===RETAINED_TEST_PAYLOAD);
  const reader=[...graph.sources.values()].find(r=>r.role==='admission');
  for(const p of retainedConsumers(record)){
    const consumer=[...graph.sources.values()].find(r=>r.binding.path===p);assert.equal(consumer.role,'scientific-control');
    for(const dependency of [payload,reader])assert.ok(graph.edges.some(e=>e.kind==='dependsOn'&&e.from===consumer['@id']&&e.to===dependency['@id']));
  }
  const after=structuredClone(before),changed=after['@graph'].find(r=>r['@id']===payload['@id']);
  changed.revisionId+='-new';changed.binding.sha256='0'.repeat(64);after.revisionId+='-new';
  for(const e of after['@graph'].filter(r=>r.to===changed['@id'])){e.toRevision=changed.revisionId;e.revisionId+='-new';}
  after['@graph']=after['@graph'].filter(r=>!(r.kind==='dependsOn'&&r.to===changed['@id']));
  const impact=await compareSourceManifests(before,after);
  assert.equal(impact.status,'review-required');assert.ok(impact.removed.length);
  for(const p of retainedConsumers(record))assert.ok(impact.affected.includes([...graph.sources.values()].find(r=>r.binding.path===p)['@id']));
  assert.ok(impact.selectedChecks.includes(reader['@id']));
});
