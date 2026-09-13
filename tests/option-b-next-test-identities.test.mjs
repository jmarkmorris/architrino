import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, mkdtempSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { captureNextTestIdentities } from './support/option-b-next-test-identities.mjs';

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
    const selected = captureNextTestIdentities(bytes, consumer, Number(call[2]));
    assert.deepEqual(selected, entry.expectations.map(row => row.sha256));
  }
});

test('malformed fixture rejects through the actual closure consumer before its controls run', t => {
  const root = mkdtempSync(path.join(tmpdir(), 'next-test-identities-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const p of [
    'tests/f6c-bounded-operation-closure.test.js',
    'tests/support/option-b-next-test-identities.mjs',
    'scripts/equation-mapping/current-source-manifest.mjs',
    'scripts/eom/verify-f6c-bounded-operation-closure.mjs',
  ]) {
    mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    copyFileSync(new URL('../' + p, import.meta.url), path.join(root, p));
  }
  const record = JSON.parse(readFileSync(new URL('./fixtures/option-b-next-test-identities.json', import.meta.url)));
  mkdirSync(path.join(root, 'tests/fixtures'), { recursive: true });
  const fixturePath = path.join(root, 'tests/fixtures/option-b-next-test-identities.json');
  writeFileSync(fixturePath, JSON.stringify(record));
  const env = { ...process.env }; delete env.NODE_TEST_CONTEXT;
  const run = () => spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'tests/f6c-bounded-operation-closure.test.js'], { cwd: root, env, encoding: 'utf8', timeout: 3000 });
  const positive = run();
  assert.equal(positive.error, undefined); assert.equal(positive.status, 0, positive.stdout + positive.stderr);
  assert.match(positive.stdout, /literal positive: external closure/);
  record.consumers['tests/f6c-bounded-operation-closure.test.js'].expectations[0].sha256 = '';
  writeFileSync(fixturePath, JSON.stringify(record));
  const result = run();
  assert.equal(result.error, undefined); assert.equal(result.status, 1, result.stdout + result.stderr); assert.equal(result.signal, null);
  assert.match(result.stdout + result.stderr, /Typed lowercase SHA-256 expectation required/);
  assert.doesNotMatch(result.stdout, /literal positive: external closure/);
});
