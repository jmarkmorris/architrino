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
const roles = new Set(['known-answer', 'historical-fixture', 'fixed-scientific-source', 'fixed-scientific-control', 'fixed-operational-control', 'fixed-contract', 'fixed-embedded-bridge']);

export function captureNextTestIdentities(raw, consumer, count) {
  const record = decode(raw);
  fields(record, 'schema authority originCommit claimBoundary consumers');
  assert.equal(record.schema, 'option-b-next-test-identities/v1');
  assert.equal(record.authority, 'operator-directed-exact-expectation-transfer');
  assert.match(record.originCommit, /^[a-f0-9]{40}$/u); text(record.claimBoundary);
  assert.ok(record.consumers && typeof record.consumers === 'object' && !Array.isArray(record.consumers) && Object.keys(record.consumers).length, 'Nonempty consumer census required');
  for (const [name, value] of Object.entries(record.consumers)) {
    safePath(name); assert.ok(name.startsWith('tests/'), 'Test consumer path required');
    fields(value, 'sourceSha256 expectations'); hash(value.sourceSha256);
    assert.ok(Array.isArray(value.expectations) && value.expectations.length, 'Nonempty expectations required');
    for (const expected of value.expectations) {
      fields(expected, 'role meaning sha256'); assert.ok(roles.has(expected.role), 'Unknown expectation role');
      text(expected.meaning); hash(expected.sha256);
    }
  }
  assert.ok(Number.isSafeInteger(count) && count > 0, 'Positive exact expectation count required');
  assert.ok(Object.hasOwn(record.consumers, consumer), 'Missing test consumer');
  const expectations = record.consumers[consumer].expectations;
  assert.equal(expectations.length, count, 'Exact expectation count differs');
  return Object.freeze(expectations.map(row => row.sha256));
}

export const NEXT_TEST_PROFILE = 'next-test-identities';
export const NEXT_TEST_MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-next-test-sources.jsonld';
export const NEXT_TEST_PAYLOAD = 'tests/fixtures/option-b-next-test-identities.json';
export const NEXT_TEST_SELECTION = 'reference/priorities/development-process-review/contracts/option-b-next-test-selection.json';
const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));

export function loadNextTestIdentities({ root = repositoryRoot, selection, consumer, count, beforeFinalCheck } = {}) {
  fields(selection, 'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  let values;
  inspectCurrentSources({ root, ...selection, requiredProfiles: [NEXT_TEST_PROFILE], beforeFinalCheck: () => {
    const captures = captureSet(root);
    const transition = decode(captures.capture(selection.transition, selection.transitionSha256));
    const selected = transition.profiles.find(row => row.name === NEXT_TEST_PROFILE);
    assert.equal(selected.manifestPath, NEXT_TEST_MANIFEST, 'Exact test manifest required');
    const document = decode(captures.capture(NEXT_TEST_MANIFEST, selected.sha256));
    assert.equal(document.scope, NEXT_TEST_PROFILE, 'Exact test scope required');
    const graph = validate(document);
    const sources = [...graph.sources.values()];
    const payload = sources.find(row => row.binding.path === NEXT_TEST_PAYLOAD);
    assert.equal(payload?.role, 'scientific-control', 'Protected expectation payload required');
    assert.ok(sources.some(row => row.binding.path === consumer && row.role === 'scientific-control'), 'Selected consumer source required');
    values = captureNextTestIdentities(captures.capture(NEXT_TEST_PAYLOAD, payload.binding.sha256), consumer, count);
    beforeFinalCheck?.();
    captures.check();
  } });
  return values;
}

let selected;
export function nextTestIdentities(consumer, count) {
  // Keep this module generation's external selection. Do not calculate an
  // expected digest from candidate bytes or adopt a later edited selection.
  selected ??= decode(readFileSync(new URL('../../' + NEXT_TEST_SELECTION, import.meta.url)));
  return loadNextTestIdentities({ selection: selected, consumer, count });
}
