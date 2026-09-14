import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {loadBatchTestIdentities, BATCH_MANIFEST, BATCH_SELECTION, BATCH_PAYLOAD} from '../scripts/equation-mapping/batch-test-records.mjs';
import {loadRetainedTestIdentities, RETAINED_TEST_MANIFEST, RETAINED_TEST_SELECTION} from './support/option-b-retained-test-identities.mjs';
import {decode, validate, sha256} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {changesBetween} from '../scripts/equation-mapping/current-source-transition.mjs';

function fixture(t, manifest, selectionPath) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(), 'batch-dependent-selection-')));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  const selection = decode(fs.readFileSync(selectionPath));
  const accepted = decode(fs.readFileSync(selection.acceptedBaseline));
  const graph = decode(fs.readFileSync(manifest));
  const paths = new Set([selectionPath, manifest, selection.acceptedBaseline, selection.transition, accepted.historicalProof.path,
    ...[...validate(graph).sources.values()].map(row => row.binding.path)]);
  const copy = p => {fs.mkdirSync(path.dirname(path.join(root, p)), {recursive: true}); fs.copyFileSync(p, path.join(root, p));};
  for (const p of paths) copy(p);
  if (!fs.existsSync(path.join(root, 'package.json'))) fs.writeFileSync(path.join(root, 'package.json'), '{"type":"module"}');
  return {root, selection, graph, copy};
}

const nodeConsumer = 'tests/compact-configuration-sweep-analyzer.test.js';
test('actual Node consumer passes before missing or stale selection rejects its first control', t => {
  const f = fixture(t, BATCH_MANIFEST, BATCH_SELECTION);
  f.copy('scripts/eom/analyze-compact-configuration-sweep.mjs');
  const env = {...process.env}; delete env.NODE_TEST_CONTEXT;
  const run = () => spawnSync(process.execPath, ['--test', '--test-reporter=tap', '--test-name-pattern=^analyzer retains null-score', nodeConsumer],
    {cwd: f.root, env, encoding: 'utf8', timeout: 30000});
  let result = run(); assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /ok \d+ - analyzer retains null-score/u);
  const selectedPath = path.join(f.root, BATCH_SELECTION), original = fs.readFileSync(selectedPath);
  fs.renameSync(selectedPath, selectedPath + '.absent');
  result = run(); assert.notEqual(result.status, 0); assert.doesNotMatch(result.stdout, /ok \d+ - analyzer retains null-score/u);
  fs.renameSync(selectedPath + '.absent', selectedPath);
  const wrong = decode(original); wrong.transitionSha256 = '0'.repeat(64); fs.writeFileSync(selectedPath, JSON.stringify(wrong));
  result = run(); assert.notEqual(result.status, 0); assert.doesNotMatch(result.stdout, /ok \d+ - analyzer retains null-score/u);
  fs.writeFileSync(selectedPath, original); assert.equal(run().status, 0);
});

function reviseSource(graph, source) {
  source.revisionId += '-candidate'; graph.revisionId += '-candidate';
  for (const edge of graph['@graph'].filter(row => row.from === source['@id'] || row.to === source['@id'])) {
    if (edge.from === source['@id']) edge.fromRevision = source.revisionId;
    if (edge.to === source['@id']) edge.toRevision = source.revisionId;
    edge.revisionId += '-candidate';
  }
}

test('valid graph successors cannot refresh protected answers or remove consumer dependency coverage', t => {
  const f = fixture(t, BATCH_MANIFEST, BATCH_SELECTION);
  const run = selection => loadBatchTestIdentities({root: f.root, selection, consumer: nodeConsumer});
  const expected = run(f.selection); assert.ok(expected.length);
  const transition = decode(fs.readFileSync(path.join(f.root, f.selection.transition)));
  const mutations = [
    graph => {const row = graph['@graph'].find(r => r.binding?.path === BATCH_PAYLOAD); row.binding.sha256 = '0'.repeat(64); reviseSource(graph, row);},
    graph => {const caller = graph['@graph'].find(r => r.binding?.path === nodeConsumer), payload = graph['@graph'].find(r => r.binding?.path === BATCH_PAYLOAD); graph['@graph'] = graph['@graph'].filter(r => !(r.kind === 'dependsOn' && r.from === caller['@id'] && r.to === payload['@id'])); graph.revisionId += '-edge-removed';},
    graph => {const caller = graph['@graph'].find(r => r.binding?.path === nodeConsumer); graph['@graph'] = graph['@graph'].filter(r => r['@id'] !== caller['@id'] && r.from !== caller['@id'] && r.to !== caller['@id']); graph.revisionId += '-consumer-removed';},
  ];
  for (const [i, mutate] of mutations.entries()) {
    const candidate = structuredClone(f.graph); mutate(candidate); validate(candidate);
    const review = structuredClone(transition);
    // Structure removal has no expressible delta under this protocol. Even a
    // freshly selected transition digest must reject rather than waive it.
    review.profiles[0].changes = i === 0 ? changesBetween(f.graph, candidate) : [];
    fs.writeFileSync(path.join(f.root, BATCH_MANIFEST), JSON.stringify(candidate));
    review.profiles[0].sha256 = sha256(fs.readFileSync(path.join(f.root, BATCH_MANIFEST)));
    fs.writeFileSync(path.join(f.root, f.selection.transition), JSON.stringify(review));
    const selection = {...f.selection, transitionSha256: sha256(fs.readFileSync(path.join(f.root, f.selection.transition)))};
    assert.throws(() => run(selection), i === 0 ? /Protected scientific\/reference\/reader selection/u : /Coverage added or deleted/u);
  }
});

test('retained selected record branch rejects absent stale replaced and wrong-role dependencies', t => {
  const f = fixture(t, RETAINED_TEST_MANIFEST, RETAINED_TEST_SELECTION);
  const consumer = 'tests/f5-independent-interpolation-enclosure.test.js';
  const recordPath = 'reference/priorities/development-process-review/contracts/option-b-batch-test-operational-selection.json';
  const run = options => loadRetainedTestIdentities({root: f.root, selection: f.selection, consumer, recordPath, ...options});
  const expected = fs.readFileSync(recordPath); assert.deepEqual(run(), expected);
  assert.throws(() => run({recordPath: 'records/not-selected.json'}), /Protected selected record/u);
  const filename = path.join(f.root, recordPath);
  fs.renameSync(filename, filename + '.absent'); assert.throws(() => run()); fs.renameSync(filename + '.absent', filename);
  fs.appendFileSync(filename, ' '); assert.throws(() => run(), /Stale binding/u); fs.writeFileSync(filename, expected);
  assert.throws(() => run({beforeFinalCheck: () => {fs.copyFileSync(filename, filename + '.new'); fs.renameSync(filename + '.new', filename);}}), /Original identity replaced/u);
  assert.deepEqual(run(), expected);
  const graph = structuredClone(f.graph), row = graph['@graph'].find(r => r.binding?.path === recordPath);
  row.role = 'current-source'; reviseSource(graph, row); validate(graph);
  const review = decode(fs.readFileSync(path.join(f.root, f.selection.transition)));
  review.profiles[0].changes = changesBetween(f.graph, graph);
  fs.writeFileSync(path.join(f.root, RETAINED_TEST_MANIFEST), JSON.stringify(graph));
  review.profiles[0].sha256 = sha256(fs.readFileSync(path.join(f.root, RETAINED_TEST_MANIFEST)));
  fs.writeFileSync(path.join(f.root, f.selection.transition), JSON.stringify(review));
  assert.throws(() => run({selection: {...f.selection, transitionSha256: sha256(fs.readFileSync(path.join(f.root, f.selection.transition)))}}), /Protected scientific\/reference\/reader selection/u);
});
