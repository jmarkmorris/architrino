// Exact historical test expectations, admitted through the selected B graph.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { decode, validate } from '../../scripts/equation-mapping/current-source-manifest.mjs';
import { captureSet, inspectCurrentSources } from '../../scripts/equation-mapping/current-source-transition.mjs';

export const profile = 'f6c-cached-test-identities';
export const manifestPath = 'reference/priorities/development-process-review/contracts/option-b-f6c-test-sources.jsonld';
export const payloadPath = 'tests/fixtures/option-b-f6c-test-identities.json';
export const selectionPath = 'reference/priorities/development-process-review/contracts/option-b-f6c-test-selection.json';
const root = fileURLToPath(new URL('../../', import.meta.url));
const fields = (o, names) => assert.deepEqual(Object.keys(o ?? {}).sort(), names.split(' ').sort());

export function captureF6cTestIdentities(raw, consumer, count) {
  const record = decode(raw);
  fields(record, 'schema authority originCommit claimBoundary consumers');
  assert.equal(record.schema, 'option-b-f6c-test-identities/v1');
  assert.equal(record.authority, 'operator-directed-exact-expectation-transfer');
  assert.match(record.originCommit, /^[a-f0-9]{40}$/u);
  assert.ok(typeof record.claimBoundary === 'string' && record.claimBoundary.trim());
  assert.deepEqual(Object.keys(record.consumers).sort(), [
    'tests/f6c-cached-root-cover-full.test.js', 'tests/f6c-cached-root-cover-pilot-launcher.test.js',
  ]);
  for (const entry of Object.values(record.consumers)) {
    fields(entry, 'sourceSha256 values'); assert.match(entry.sourceSha256, /^[a-f0-9]{64}$/u);
    assert.ok(Array.isArray(entry.values) && entry.values.length);
    for (const value of entry.values) assert.ok(typeof value === 'string' && /[a-f0-9]{64}/u.test(value), 'Hash-bearing original string required');
  }
  assert.ok(Object.hasOwn(record.consumers, consumer), 'Missing consumer');
  assert.ok(Number.isSafeInteger(count) && count > 0);
  assert.equal(record.consumers[consumer].values.length, count, 'Exact string census required');
  return Object.freeze([...record.consumers[consumer].values]);
}

export function loadF6cTestIdentities({ root: repository = root, selection, consumer, count, beforeFinalCheck } = {}) {
  fields(selection, 'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  let values;
  inspectCurrentSources({ root: repository, ...selection, requiredProfiles: [profile], beforeFinalCheck: () => {
  const captures = captureSet(repository);
  const transition = decode(captures.capture(selection.transition, selection.transitionSha256));
  const selected = transition.profiles.find(p => p.name === profile);
  assert.equal(selected.manifestPath, manifestPath);
  const graph = validate(decode(captures.capture(manifestPath, selected.sha256)));
  const payload = [...graph.sources.values()].find(row => row.binding.path === payloadPath);
  assert.equal(payload?.role, 'scientific-control', 'Protected payload required');
  values = captureF6cTestIdentities(captures.capture(payloadPath, payload.binding.sha256), consumer, count);
  beforeFinalCheck?.();
  captures.check();
  } });
  return values;
}

export function f6cTestIdentities(consumer, count) {
  const selection = decode(readFileSync(new URL('../../' + selectionPath, import.meta.url)));
  return loadF6cTestIdentities({ selection, consumer, count });
}

// Historical construction expectations and current launch acceptance have
// different owners. Use the existing five-profile selection for the latter.
export function selectedLaunchBindings(profileName) {
  const selectionFile = 'reference/priorities/development-process-review/contracts/option-b-five-profile-selection.json';
  const { schema, ...selection } = decode(readFileSync(new URL('../../' + selectionFile, import.meta.url)));
  assert.equal(schema, 'current-source-acceptance-selection/v1');
  let result;
  inspectCurrentSources({ root, ...selection,
    requiredProfiles: ['prescribed-response','f6c-acceleration','root-cover','cached-root-cover','cached-root-cover-full'],
    beforeFinalCheck: () => {
      const captures = captureSet(root);
      const accepted = decode(captures.capture(selection.acceptedBaseline, selection.acceptedBaselineSha256));
      const transition = decode(captures.capture(selection.transition, selection.transitionSha256));
      const selected = transition.profiles.find(p => p.name === profileName);
      assert.ok(selected, 'Missing launch profile');
      const graph = validate(decode(captures.capture(selected.manifestPath, selected.sha256)));
      const sourceBindings = [...graph.sources.values()].filter(r => !['admission','launcher','manifest-reader'].includes(r.role)).map(r => [r.binding.path,r.binding.sha256]);
      const retained = accepted.profiles.find(p => p.name === profileName).historicalEvidenceBindings.map(r => [r.path,r.sha256]);
      result = Object.freeze(Object.fromEntries([...sourceBindings,...retained]));
      captures.check();
    },
  });
  return result;
}
