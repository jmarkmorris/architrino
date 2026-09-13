// Admission for authored known answers and historical transport expectations.
// Graph integrity does not establish mathematical or scientific acceptance.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { captureSet, inspectCurrentSources } from './current-source-transition.mjs';
import { decode, validate } from './current-source-manifest.mjs';

export const FIXTURE_PROFILE = 'controlled-fixture-records';
export const FIXTURE_MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-controlled-fixture-sources.jsonld';
export const FIXTURE_SELECTION = 'reference/priorities/development-process-review/contracts/option-b-controlled-fixture-selection.json';
export const KNOWN_PAYLOAD = 'scripts/equation-mapping/fixtures/known-hash-answers.json';
export const PRIOR_PAYLOAD = 'tests/fixtures/option-b-python-transport-identities.json';
const root = fileURLToPath(new URL('../../', import.meta.url));
const fields = (value, names) => {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Object required');
  assert.deepEqual(Object.keys(value).sort(), names.split(' ').sort(), 'Closed selection required');
};
const freeze = value => {
  if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
};

export function loadControlledFixture({ root: directory = root, selection, consumer, payload = KNOWN_PAYLOAD, beforeFinalCheck } = {}) {
  fields(selection, 'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  assert.ok([KNOWN_PAYLOAD, PRIOR_PAYLOAD].includes(payload), 'Known fixture path required');
  let bytes;
  inspectCurrentSources({ root: directory, ...selection, requiredProfiles: [FIXTURE_PROFILE], beforeFinalCheck: () => {
    const captures = captureSet(directory);
    const transition = decode(captures.capture(selection.transition, selection.transitionSha256));
    const profile = transition.profiles.find(row => row.name === FIXTURE_PROFILE);
    assert.equal(profile.manifestPath, FIXTURE_MANIFEST, 'Exact fixture manifest required');
    const document = decode(captures.capture(FIXTURE_MANIFEST, profile.sha256));
    assert.equal(document.scope, FIXTURE_PROFILE);
    const graph = validate(document), sources = [...graph.sources.values()];
    const record = sources.find(row => row.binding.path === payload);
    const caller = sources.find(row => row.binding.path === consumer);
    assert.equal(record?.role, 'scientific-control', 'Protected fixture required');
    assert.ok(caller && graph.edges.some(edge => edge.kind === 'dependsOn' && edge.from === caller['@id'] && edge.to === record['@id']), 'Selected fixture consumer required');
    bytes = captures.capture(payload, record.binding.sha256);
    beforeFinalCheck?.(); captures.check();
  } });
  return bytes;
}

let selected;
export function knownHashAnswers(consumer) {
  selected ??= decode(fs.readFileSync(path.join(root, FIXTURE_SELECTION)));
  return freeze(decode(loadControlledFixture({ selection: selected, consumer })));
}

// Python passes its module-generation selection explicitly. Return the bytes
// already captured by admission, never reopen the payload after checking it.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const request = decode(fs.readFileSync(0));
  fields(request, 'root selection consumer payload');
  process.stdout.write(loadControlledFixture(request));
}

// Inventory for callers retaining a complete admitted input closure. Admission
// remains loadControlledFixture; this census never grants acceptance itself.
export function controlledFixturePaths(directory = root) {
  const selection = decode(fs.readFileSync(path.join(directory, FIXTURE_SELECTION)));
  const accepted = decode(fs.readFileSync(path.join(directory, selection.acceptedBaseline)));
  const graph = validate(decode(fs.readFileSync(path.join(directory, FIXTURE_MANIFEST))));
  return [...new Set([FIXTURE_SELECTION, selection.acceptedBaseline, selection.transition,
    accepted.historicalProof.path, FIXTURE_MANIFEST, ...[...graph.sources.values()].map(row => row.binding.path)])];
}
