// Test expectations only; no subject imports, source digest calculation or launch.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { decode, safePath } from '../../scripts/equation-mapping/current-source-manifest.mjs';

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

let capturedRaw;
export function nextTestIdentities(consumer, count) {
  // Capture once in this module generation. Later file or parsed-record edits
  // cannot alter the primitive expectations already supplied to a consumer.
  capturedRaw ??= readFileSync(new URL('../fixtures/option-b-next-test-identities.json', import.meta.url));
  return captureNextTestIdentities(capturedRaw, consumer, count);
}
