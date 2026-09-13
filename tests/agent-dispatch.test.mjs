import { knownHashAnswers as admittedKnownHashAnswers } from '../scripts/equation-mapping/controlled-fixture-records.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { prepareDispatch, verifyDispatch, sendDispatch, compareReceived, requireHash, sha256, MAX_MESSAGE_BYTES } from '../scripts/agent-dispatch.mjs';

const known = admittedKnownHashAnswers("tests/agent-dispatch.test.mjs").sha256.abc;
const cli = new URL('../scripts/agent-dispatch.mjs', import.meta.url).pathname;
function fixture(t) {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'agent-dispatch-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'chapter.md'), 'abc');
  return { root, body: 'Review chapter. Preserve café and 🧪.', sources: [{ path: 'chapter.md' }] };
}

test('independent published abc SHA-256 vector', () => assert.equal(sha256(Buffer.from('abc')), known));
test('hash syntax rejects terminal newlines without normalizing input', () => {
  assert.equal(requireHash(known), known);
  for (const value of ['', 'a'.repeat(63), 'a'.repeat(65), 'g'.repeat(64), known + '\n', known + '\r\n', ' ' + known, null, 42]) assert.throws(() => requireHash(value), /exactly 64/);
});
test('machine baseline, UTF-8 byte counts, and callback preserve exact message', t => {
  const request = fixture(t); const packet = prepareDispatch(request);
  assert.equal(packet.sources[0].sha256, known); assert.equal(packet.sources[0].bytes, 3);
  assert.equal(packet.messageBytes, Buffer.byteLength(packet.message));
  assert(packet.messageBytes > packet.message.length);
  let calls = 0;
  sendDispatch(packet, message => { calls++; assert.equal(message, packet.message); });
  assert.equal(calls, 1);
  assert.equal(compareReceived(packet, Buffer.from(packet.message)).equal, true);
});
test('empty, short, long, nonhex, uppercase, wrong type and wrong valid-length hashes fail before send', t => {
  const request = fixture(t);
  for (const value of ['', 'a', 'a'.repeat(63), 'a'.repeat(65), 'a'.repeat(1024), 'g'.repeat(64), known.toUpperCase(), null, 42, '0'.repeat(64), known + '\n']) {
    assert.throws(() => prepareDispatch({ ...request, sources: [{ path: 'chapter.md', expectedSha256: value }] }));
    const packet = prepareDispatch(request); packet.sources[0].sha256 = value;
    let calls = 0; assert.throws(() => sendDispatch(packet, () => calls++)); assert.equal(calls, 0);
  }
});
test('source changes, removals, and packet mutations cannot invoke sender', t => {
  const request = fixture(t); const packet = prepareDispatch(request);
  for (const mutate of [p => p.message += 'x', p => p.body += 'x', p => p.messageBytes++, p => p.messageSha256 = '0'.repeat(64), p => p.sources[0].bytes++, p => p.sources = []]) {
    const altered = structuredClone(packet); mutate(altered);
    assert.throws(() => sendDispatch(altered, () => assert.fail('must not send')));
  }
  fs.writeFileSync(path.join(request.root, 'chapter.md'), 'abd');
  assert.throws(() => sendDispatch(packet, () => assert.fail('must not send')), /hash mismatch/);
  fs.unlinkSync(path.join(request.root, 'chapter.md'));
  assert.throws(() => verifyDispatch(packet));
});
test('invalid paths, duplicate inputs and ambiguous source fields fail', t => {
  const r = fixture(t);
  for (const name of ['', '../chapter.md', '/chapter.md', './chapter.md', 'x/../chapter.md']) assert.throws(() => prepareDispatch({ ...r, sources: [{ path: name }] }));
  assert.throws(() => prepareDispatch({ ...r, sources: [...r.sources, ...r.sources] }));
  assert.throws(() => prepareDispatch({ ...r, sources: [{ path: 'chapter.md', hash: known }] }));
  const outside = fixture(t);
  fs.symlinkSync(outside.root, path.join(r.root, 'outside'));
  assert.throws(() => prepareDispatch({ ...r, sources: [{ path: 'outside/chapter.md' }] }), /escapes/);
});
test('local payload byte boundary and malformed Unicode', t => {
  const r = fixture(t); const overhead = prepareDispatch({ ...r, body: 'x' }).messageBytes - 1;
  assert.equal(prepareDispatch({ ...r, body: 'x'.repeat(MAX_MESSAGE_BYTES - overhead) }).messageBytes, MAX_MESSAGE_BYTES);
  assert.throws(() => prepareDispatch({ ...r, body: 'x'.repeat(MAX_MESSAGE_BYTES - overhead + 1) }), /byte limit/);
  assert.throws(() => prepareDispatch({ ...r, body: 'x'.repeat(MAX_MESSAGE_BYTES - overhead - 1) + 'é' }), /byte limit/);
  assert.throws(() => prepareDispatch({ ...r, body: '\ud800' }), /Unicode/);
  assert.throws(() => prepareDispatch({ ...r, body: '' }));
});
test('a later source mismatch blocks the complete dispatch', t => {
  const r = fixture(t);
  fs.writeFileSync(path.join(r.root, 'second.md'), 'abc');
  const p = prepareDispatch({ ...r, sources: [...r.sources, { path: 'second.md' }] });
  fs.writeFileSync(path.join(r.root, 'second.md'), 'bad');
  assert.throws(() => sendDispatch(p, () => assert.fail('must not send')), /second.md/);
});
test('receipt comparison locates deletion, insertion, substitution and UTF-8 differences', t => {
  const p = prepareDispatch(fixture(t)); const b = Buffer.from(p.message);
  for (const [received, offset] of [[b.subarray(0, b.length - 1), b.length - 1], [Buffer.concat([b, Buffer.from('x')]), b.length], [Buffer.concat([Buffer.from('X'), b.subarray(1)]), 0], [Buffer.alloc(0), 0]]) {
    const result = compareReceived(p, received); assert.equal(result.equal, false); assert.equal(result.firstDifferentByte, offset); assert.equal(result.receivedBytes, received.length);
  }
  const offset = b.indexOf(Buffer.from('é'));
  assert.equal(compareReceived(p, Buffer.from(p.message.replace('é', 'e'))).firstDifferentByte, offset);
});
test('CLI retains exclusive packet, verifies, rejects mismatch, and compares raw received bytes', t => {
  const r = fixture(t); const request = path.join(r.root, 'request.json'); const packet = path.join(r.root, 'packet.json'); const received = path.join(r.root, 'received.txt');
  fs.writeFileSync(request, JSON.stringify(r));
  execFileSync(process.execPath, [cli, 'prepare', request, packet]);
  assert.notEqual(spawnSync(process.execPath, [cli, 'prepare', request, packet]).status, 0);
  const p = JSON.parse(execFileSync(process.execPath, [cli, 'verify', packet], { encoding: 'utf8' }));
  fs.writeFileSync(received, p.message); execFileSync(process.execPath, [cli, 'compare', packet, received]);
  fs.appendFileSync(received, 'x'); assert.equal(spawnSync(process.execPath, [cli, 'compare', packet, received]).status, 1);
  fs.writeFileSync(path.join(r.root, 'chapter.md'), 'changed');
  const failed = spawnSync(process.execPath, [cli, 'verify', packet], { encoding: 'utf8' }); assert.equal(failed.status, 1); assert.equal(failed.stdout, '');
});
