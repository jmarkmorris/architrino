// Exact test expectations admitted through an externally selected B graph.
// No subject imports, scientific acceptance or launch authority.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { captureSet, inspectCurrentSources } from '../../scripts/equation-mapping/current-source-transition.mjs';
import { decode, safePath, validate } from '../../scripts/equation-mapping/current-source-manifest.mjs';

const fields = (value, keys) => {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Expectation record object required');
  assert.deepEqual(Object.keys(value).sort(), keys.split(' ').sort(), 'Closed expectation record required');
};
const hash = value => assert.ok(typeof value === 'string' && /^[a-f0-9]{64}$/u.test(value), 'Typed lowercase SHA-256 expectation required');
const text = value => assert.ok(typeof value === 'string' && value.trim(), 'Expectation attribution required');
const freeze = value => {
  if (value && typeof value === 'object') { for (const child of Object.values(value)) freeze(child); Object.freeze(value); }
  return value;
};
const testPath = value => { safePath(value); assert.ok(value.startsWith('tests/'), 'Test consumer path required'); };

export function retainedConsumers(record) {
  return [...new Set([record.mermaid.consumer, record.orthogonalWeave.consumer, record.f5PreparationSelection.consumer, ...Object.keys(record.byConsumer)])];
}

export function captureRetainedTestIdentities(raw, consumer) {
  const record = decode(raw);
  fields(record, 'schema authority roleOwner originCommit claimBoundary f5PreparationSelection mermaid orthogonalWeave byConsumer');
  assert.equal(record.schema, 'option-b-retained-test-identities/v1');
  assert.equal(record.authority, 'operator-directed-exact-expectation-transfer');
  safePath(record.roleOwner); assert.match(record.originCommit, /^[a-f0-9]{40}$/u); text(record.claimBoundary);
  fields(record.f5PreparationSelection, 'consumer path sha256 role acceptanceReference');
  testPath(record.f5PreparationSelection.consumer); safePath(record.f5PreparationSelection.path);
  hash(record.f5PreparationSelection.sha256); text(record.f5PreparationSelection.role); text(record.f5PreparationSelection.acceptanceReference);
  fields(record.mermaid, 'consumer role runtimeSha256 licenseSha256 packageIntegrity');
  testPath(record.mermaid.consumer); text(record.mermaid.role);
  hash(record.mermaid.runtimeSha256); hash(record.mermaid.licenseSha256);
  assert.match(record.mermaid.packageIntegrity, /^sha512-[A-Za-z0-9+/]{86}==$/u);
  fields(record.orthogonalWeave, 'consumer role modelRevisionSha256');
  testPath(record.orthogonalWeave.consumer); text(record.orthogonalWeave.role); hash(record.orthogonalWeave.modelRevisionSha256);
  assert.ok(record.byConsumer && typeof record.byConsumer === 'object' && !Array.isArray(record.byConsumer) && Object.keys(record.byConsumer).length, 'Nonempty consumer census required');
  for (const [name, entry] of Object.entries(record.byConsumer)) {
    testPath(name); fields(entry, 'role algorithm encoding sha256'); text(entry.role);
    assert.equal(entry.algorithm, 'SHA-256'); assert.equal(entry.encoding, 'lowercase hexadecimal');
    assert.ok(Array.isArray(entry.sha256) && entry.sha256.length, 'Nonempty expectations required'); entry.sha256.forEach(hash);
  }
  assert.ok(retainedConsumers(record).includes(consumer), 'Missing test consumer');
  // Roles are preserved as authored prose; selected payload bytes, not a new
  // reclassification vocabulary, authenticate their exact accepted meanings.
  return freeze(record);
}

export const RETAINED_TEST_PROFILE = 'retained-test-identities';
export const RETAINED_TEST_MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-retained-test-sources.jsonld';
export const RETAINED_TEST_PAYLOAD = 'tests/fixtures/option-b-retained-test-identities.json';
export const RETAINED_TEST_SELECTION = 'reference/priorities/development-process-review/contracts/option-b-retained-test-selection.json';
const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));

export function loadRetainedTestIdentities({ root = repositoryRoot, selection, consumer, beforeFinalCheck } = {}) {
  fields(selection, 'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  let values;
  inspectCurrentSources({ root, ...selection, requiredProfiles: [RETAINED_TEST_PROFILE], beforeFinalCheck: () => {
    const captures = captureSet(root);
    const transition = decode(captures.capture(selection.transition, selection.transitionSha256));
    const selected = transition.profiles.find(row => row.name === RETAINED_TEST_PROFILE);
    assert.equal(selected.manifestPath, RETAINED_TEST_MANIFEST, 'Exact test manifest required');
    const document = decode(captures.capture(RETAINED_TEST_MANIFEST, selected.sha256));
    assert.equal(document.scope, RETAINED_TEST_PROFILE, 'Exact test scope required');
    const graph = validate(document);
    const sources = [...graph.sources.values()];
    const payload = sources.find(row => row.binding.path === RETAINED_TEST_PAYLOAD);
    assert.equal(payload?.role, 'scientific-control', 'Protected expectation payload required');
    assert.ok(sources.some(row => row.binding.path === consumer && row.role === 'scientific-control'), 'Selected consumer source required');
    values = captureRetainedTestIdentities(captures.capture(RETAINED_TEST_PAYLOAD, payload.binding.sha256), consumer);
    beforeFinalCheck?.();
    captures.check();
  } });
  return values;
}

let selected;
export function retainedTestIdentities(consumer) {
  // Keep this module generation's external selection. Do not calculate an
  // expected digest from candidate bytes or adopt a later edited selection.
  selected ??= decode(readFileSync(new URL('../../' + RETAINED_TEST_SELECTION, import.meta.url)));
  return loadRetainedTestIdentities({ selection: selected, consumer });
}
