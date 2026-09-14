// Original test expectations admitted by the existing selected B graph engine.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {captureSet, inspectCurrentSources} from './current-source-transition.mjs';
import {decode, validate, safePath} from './current-source-manifest.mjs';
export const BATCH_PROFILE = 'batch-test-records';
export const BATCH_MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-batch-test-sources.jsonld';
export const BATCH_SELECTION = 'reference/priorities/development-process-review/contracts/option-b-batch-test-selection.json';
export const BATCH_ORIGINALS = 'tests/fixtures/option-b-batch-test-original-sources.json';
export const BATCH_PAYLOAD = 'tests/fixtures/option-b-batch-test-identities.json';
const root = fileURLToPath(new URL('../../', import.meta.url));
const fields = (value, names) => {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Object required');
  assert.deepEqual(Object.keys(value).sort(), names.split(' ').sort(), 'Closed record required');
};
export function captureBatchIdentities(raw, consumer) {
  const data = decode(raw);
  fields(data, 'schema algorithm role byConsumer');
  assert.equal(data.schema, 'option-b-batch-test-identities/v1');
  assert.equal(data.algorithm, 'SHA-256');
  assert.equal(data.role, 'original-test-expectations-preserve-individual-applicability');
  assert.ok(data.byConsumer && typeof data.byConsumer === 'object' && !Array.isArray(data.byConsumer));
  for (const [p, values] of Object.entries(data.byConsumer)) {
    safePath(p); assert.ok(p.startsWith('tests/'), 'Test consumer required');
    assert.ok(Array.isArray(values) && values.length > 0, 'Nonempty identity list required');
    for (const value of values) assert.ok(typeof value === 'string' && /^[a-f0-9]{64}$/u.test(value), 'Malformed identity');
  }
  assert.ok(Object.hasOwn(data.byConsumer, consumer), 'Missing selected consumer');
  return Object.freeze([...data.byConsumer[consumer]]);
}
export function loadBatchTestIdentities({root: directory = root, selection, consumer, originalSource, beforeFinalCheck} = {}) {
  fields(selection, 'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  let values;
  inspectCurrentSources({root: directory, ...selection, requiredProfiles: [BATCH_PROFILE], beforeFinalCheck: () => {
    const captured = captureSet(directory);
    const transition = decode(captured.capture(selection.transition, selection.transitionSha256));
    const profile = transition.profiles.find(row => row.name === BATCH_PROFILE);
    assert.equal(profile.manifestPath, BATCH_MANIFEST);
    const document = decode(captured.capture(BATCH_MANIFEST, profile.sha256));
    assert.equal(document.scope, BATCH_PROFILE);
    const graph = validate(document), sources = [...graph.sources.values()];
    const record = sources.find(row => row.binding.path === BATCH_PAYLOAD);
    const caller = sources.find(row => row.binding.path === consumer);
    assert.equal(record?.role, 'scientific-control', 'Protected expectations required');
    assert.equal(caller?.role, 'scientific-control', 'Protected test consumer required');
    assert.ok(caller && graph.edges.some(e => e.kind === 'dependsOn' && e.from === caller['@id'] && e.to === record['@id']), 'Selected direct consumer required');
    const raw = captured.capture(BATCH_PAYLOAD, record.binding.sha256);
    values = captureBatchIdentities(raw, consumer);
    const payload = decode(raw);
    for (const p of Object.keys(payload.byConsumer)) {
      const owner = sources.find(row => row.binding.path === p);
      assert.ok(owner && graph.edges.some(e => e.kind === 'dependsOn' && e.from === owner['@id'] && e.to === record['@id']), 'Complete consumer census required');
    }
    if (originalSource !== undefined) {
      safePath(originalSource);
      assert.ok(Object.hasOwn(payload.byConsumer, originalSource), 'Original target must be a selected test');
      const target = sources.find(row => row.binding.path === originalSource);
      assert.equal(target?.role, 'scientific-control');
      const historical = sources.find(row => row.binding.path === BATCH_ORIGINALS);
      assert.equal(historical?.role, 'scientific-control');
      assert.ok(graph.edges.some(e => e.kind === 'dependsOn' && e.from === caller['@id'] && e.to === historical['@id']), 'Historical consumer dependency required');
      const record = decode(captured.capture(BATCH_ORIGINALS, historical.binding.sha256));
      fields(record, 'schema role sources');
      assert.equal(record.schema, 'option-b-batch-test-original-sources/v1');
      assert.equal(record.role, 'historical-original-test-controls-not-current-source');
      assert.equal(typeof record.sources?.[originalSource], 'string', 'Original source required');
      const current = new TextDecoder('utf-8', {fatal: true}).decode(captured.capture(originalSource, target.binding.sha256));
      values = Object.freeze({original: record.sources[originalSource], current});
    }
    beforeFinalCheck?.(); captured.check();
  }});
  return values;
}
let selection;
export function batchTestIdentities(url) {
  selection ??= decode(fs.readFileSync(path.join(root, BATCH_SELECTION)));
  const consumer = path.relative(root, fileURLToPath(url)).split(path.sep).join('/');
  return loadBatchTestIdentities({selection, consumer});
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const request = decode(fs.readFileSync(0)); fields(request, Object.hasOwn(request, 'originalSource') ? 'root selection consumer originalSource' : 'root selection consumer');
  process.stdout.write(JSON.stringify(loadBatchTestIdentities(request)));
}

export function batchTestSources(url, originalSource) {
  selection ??= decode(fs.readFileSync(path.join(root, BATCH_SELECTION)));
  const consumer = path.relative(root, fileURLToPath(url)).split(path.sep).join('/');
  return loadBatchTestIdentities({selection, consumer, originalSource});
}
