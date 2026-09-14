import { knownHashAnswers as admittedKnownHashAnswers } from '../scripts/equation-mapping/controlled-fixture-records.mjs';
const knownHashes = admittedKnownHashAnswers("tests/f5-current-build-admission.test.js");
const ABC_SHA = knownHashes.sha256.abc;
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkBinding, validateAdmission, executionCopy } from '../scripts/eom/run-current-f5-enclosed-root.mjs';
import { API_SUBJECT_BINDINGS } from '../scripts/eom/run-f5-enclosed-root.mjs';
test('binding instrument accepts known SHA256 abc and rejects changed bytes', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'f5-admission-'));
  try {
    writeFileSync(path.join(root, 'known'), 'abc');
    const binding = { path: 'known', sha256: ABC_SHA, bytes: 3 };
    assert.equal(checkBinding(binding, root).path, path.join(root, 'known'));
    writeFileSync(path.join(root, 'known'), 'abd');
    assert.throws(() => checkBinding(binding, root), /changed/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
test('current execution uses exact captured bytes inside the explicit root', () => {
  const original = { path: '/producer/binary', sha256: 'a'.repeat(64), bytes: 42 };
  assert.equal(executionCopy(original, { ...original, path: '/execution/build/binary' }, '/execution').path, 'build/binary');
  assert.throws(() => executionCopy(original, original, '/execution'), /inside/);
  assert.throws(() => executionCopy(original, { ...original, path: '/execution/binary', bytes: 43 }, '/execution'), /differs/);
});
test('admission keeps original API census and rejects unreviewed arithmetic changes', () => {
  const record = { schema: 'braid-program/f5-current-build-admission.v1', accepted: true, buildRoot: '/tmp',
    originalApiBindings: API_SUBJECT_BINDINGS, currentApiBindings: API_SUBJECT_BINDINGS.map(x => ({ ...x })), evidence: [{}] };
  assert.doesNotThrow(() => validateAdmission(record));
  record.currentApiBindings[2].sha256 = '0'.repeat(64);
  assert.throws(() => validateAdmission(record), /arithmetic source/);
  assert.throws(() => validateAdmission({ ...record, accepted: false }), /independent/);
});
