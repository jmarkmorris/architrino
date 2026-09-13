import { knownHashAnswers as admittedKnownHashAnswers } from '../scripts/equation-mapping/controlled-fixture-records.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import dispatchThroughCodex from '../scripts/agent-dispatch-codex.cjs';
import { beginSession, recordOutgoing, recordHostResult, collectSession, incomingRecords, receiveFileSession, collectFileSession } from '../scripts/agent-dispatch-session.mjs';

const marker = '00000000-0000-4000-8000-000000000000';
const userRow = text => JSON.stringify({ type: 'response_item', timestamp: '2026-09-13T03:00:00Z', payload: { type: 'message', role: 'user', id: 'received-item', content: [{ type: 'input_text', text }] } }) + '\n';
const json = file => JSON.parse(fs.readFileSync(file, 'utf8'));
function setup(t, body = 'Read only. Preserve Aé🧪 and quote \' and $(not-a-command).') {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dispatch-session-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'source.md'), 'abc');
  const receiverLog = path.join(root, 'receiver.jsonl'), senderLog = path.join(root, 'sender.jsonl');
  fs.writeFileSync(receiverLog, JSON.stringify({ type: 'session_meta', payload: { id: 'receiver', cli_version: 'test' } }) + '\n');
  fs.writeFileSync(senderLog, JSON.stringify({ type: 'session_meta', payload: { id: 'sender', cli_version: 'test' } }) + '\n');
  const requestPath = path.join(root, 'request.json'), bundlePath = path.join(root, 'bundle');
  fs.writeFileSync(requestPath, JSON.stringify({ root, body, sources: [{ path: 'source.md' }] }));
  return { root, requestPath, bundlePath, threadId: 'receiver', senderLog, receiverLog };
}
function toolsFor(f, mutate = value => value, { skip = false, error = false } = {}) {
  const calls = [];
  return { calls,
    exec_command: async ({ cmd }) => {
      const r = spawnSync('bash', ['-c', cmd], { encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
      return { exit_code: r.status, output: r.stdout || r.stderr };
    },
    mcp__codex_app__send_message_to_thread: async args => {
      calls.push(args);
      if (!skip) fs.appendFileSync(f.receiverLog, userRow(mutate(args.prompt)));
      return { isError: error, content: [] };
    },
  };
}

test('known incoming record before capture: only raw user message and hand-counted UTF-8 bytes', () => {
  const text = `Dispatch-ID: ${marker}\nAé🧪`;
  const raw = Buffer.from(userRow(text));
  const found = incomingRecords(raw, marker);
  assert.equal(found.length, 1); assert.equal(found[0].text, text); assert.equal(found[0].itemId, 'received-item');
  assert.equal(Buffer.from('Aé🧪').length, 7); // 1 + 2 + 4, independently hand-counted.
  assert.equal(incomingRecords(Buffer.from(userRow(text).replace('"role":"user"', '"role":"assistant"')), marker).length, 0);
  assert.equal(incomingRecords(Buffer.from(userRow(text).slice(0, -1)), marker).length, 0);
});
test('concrete host adapter records prepared, actual outgoing, raw incoming and correlation', async t => {
  const f = setup(t); const tools = toolsFor(f);
  const result = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
  assert.equal(result.status, 'verified'); assert.equal(tools.calls.length, 1);
  assert.equal(json(path.join(f.bundlePath, 'outgoing.json')).prompt, tools.calls[0].prompt);
  assert.equal(fs.readFileSync(path.join(f.bundlePath, 'incoming.txt'), 'utf8'), tools.calls[0].prompt);
  assert.equal(result.receivedItem.id, 'received-item'); assert.equal(result.prepared.bytes, result.incoming.bytes);
  assert.equal(result.receiver.cliVersion, 'test');
  assert.equal(fs.statSync(path.join(f.bundlePath, 'request.json')).mode & 0o777, 0o600);
  const replay = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
  assert.equal(replay.verified, false); assert.equal(tools.calls.length, 1);
});
test('host-path truncation, substitution, insertion and Unicode change retain evidence', async t => {
  for (const mutate of [s => s.slice(0, -1), s => s.replace('Read only.', 'Read Only.'), s => s + 'x', s => s.replace('é', 'e')]) {
    const f = setup(t); const tools = toolsFor(f, mutate);
    const result = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
    assert.equal(result.status, 'receiver-mismatch'); assert.equal(result.verified, false);
    assert.equal(result.preparedVsOutgoing.equal, true); assert.equal(result.outgoingVsIncoming.equal, false);
    assert(fs.existsSync(path.join(f.bundlePath, 'incoming-record.jsonl')));
  }
});
test('missing, uncorrelated, duplicate and incomplete receiver data cannot pass', async t => {
  for (const variant of ['missing', 'marker-lost', 'duplicate', 'incomplete']) {
    const f = setup(t); const tools = toolsFor(f, s => s, { skip: true });
    const send = tools.mcp__codex_app__send_message_to_thread;
    tools.mcp__codex_app__send_message_to_thread = async args => {
      const result = await send(args);
      if (variant === 'marker-lost') fs.appendFileSync(f.receiverLog, userRow(args.prompt.replace('Dispatch-ID:', 'Dispatch-ID?')));
      if (variant === 'duplicate') fs.appendFileSync(f.receiverLog, userRow(args.prompt).repeat(2));
      if (variant === 'incomplete') fs.appendFileSync(f.receiverLog, userRow(args.prompt).slice(0, -1));
      return result;
    };
    const report = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
    assert.equal(report.status, 'unverified'); assert(fs.existsSync(path.join(f.bundlePath, 'receiver-window.jsonl')));
  }
});
test('failed host acknowledgment remains unverified even when delivery is observed', async t => {
  const f = setup(t); const report = await dispatchThroughCodex({ tools: toolsFor(f, s => s, { error: true }), ...f, waitMs: 0 });
  assert.equal(report.status, 'unverified'); assert.equal(report.outgoingVsIncoming.equal, true);
});
test('invalid hash retains original request and never invokes actual sender', async t => {
  const f = setup(t); const request = json(f.requestPath); request.sources[0].expectedSha256 = 'a'.repeat(63);
  fs.writeFileSync(f.requestPath, JSON.stringify(request));
  const tools = toolsFor(f); const report = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
  assert.equal(report.verified, false); assert.equal(tools.calls.length, 0);
  assert.equal(json(path.join(f.bundlePath, 'request.json')).sources[0].expectedSha256.length, 63);
  assert.equal(json(path.join(f.bundlePath, 'report.json')).status, 'rejected-before-send');
});
test('outgoing corruption is captured and rejected before host send', t => {
  const f = setup(t); const begin = beginSession(f.requestPath, f.bundlePath, f);
  begin.arguments.prompt += 'corruption';
  assert.throws(() => recordOutgoing(f.bundlePath, begin.arguments), /differs/);
  assert.equal(json(path.join(f.bundlePath, 'outgoing.json')).prompt, begin.arguments.prompt);
  assert.equal(json(path.join(f.bundlePath, 'report.json')).status, 'rejected-before-send');
});
test('truncated command output cannot reach host sender', async t => {
  const f = setup(t); const tools = toolsFor(f); const exec = tools.exec_command;
  let first = true;
  tools.exec_command = async args => { const r = await exec(args); if (first) { first = false; r.output = r.output.slice(0, 40); } return r; };
  const report = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
  assert.equal(report.verified, false); assert.equal(tools.calls.length, 0);
  assert(fs.existsSync(path.join(f.bundlePath, 'report.json')));
});
test('delayed canonical receiver row is collected; source changes do not erase historical delivery evidence', async t => {
  const f = setup(t); const begin = beginSession(f.requestPath, f.bundlePath, f);
  recordOutgoing(f.bundlePath, begin.arguments); recordHostResult(f.bundlePath, { result: { isError: false } });
  fs.writeFileSync(path.join(f.root, 'source.md'), 'later change');
  setTimeout(() => fs.appendFileSync(f.receiverLog, userRow(begin.arguments.prompt)), 20);
  const result = await collectSession(f.bundlePath, 1000);
  assert.equal(result.status, 'verified');
});
test('wrong receiver, log rotation and malformed JSON never establish delivery', async t => {
  const f = setup(t);
  assert.throws(() => beginSession(f.requestPath, f.bundlePath, { ...f, threadId: 'other' }), /identity/);
  for (const mode of ['rotated', 'malformed']) {
    const x = setup(t); const b = beginSession(x.requestPath, x.bundlePath, x);
    recordOutgoing(x.bundlePath, b.arguments); recordHostResult(x.bundlePath, { result: {} });
    if (mode === 'rotated') fs.writeFileSync(x.receiverLog, '');
    else fs.appendFileSync(x.receiverLog, '{bad json}\n');
    assert.equal((await collectSession(x.bundlePath, 0)).status, 'unverified');
    if (mode === 'malformed') assert.equal(fs.readFileSync(path.join(x.bundlePath, 'receiver-window.jsonl'), 'utf8'), '{bad json}\n');
  }
});
test('native file adapter measures receiver bytes but never certifies encrypted transport', async t => {
  const f = setup(t); beginSession(f.requestPath, f.bundlePath, { ...f, native: true });
  const receipt = receiveFileSession(f.bundlePath, f.receiverLog);
  assert.equal(receipt.payloadVerified, true);
  assert.equal(receipt.transportVerified, false);
  const result = await collectFileSession(f.bundlePath, 0);
  assert.equal(result.status, 'payload-verified-transport-unverified');
  assert.equal(result.verified, false); assert.equal(result.preparedVsReceiver.equal, true);
  assert.equal(result.preparedVsReceiver.expectedBytes, receipt.payload.bytes);
});
test('native file adapter rejects changed source or body and missing/wrong receivers', async t => {
  for (const mode of ['source', 'body', 'receiver', 'missing']) {
    const f = setup(t); beginSession(f.requestPath, f.bundlePath, { ...f, native: true });
    if (mode === 'missing') { assert.equal((await collectFileSession(f.bundlePath, 0)).status, 'unverified'); continue; }
    if (mode === 'source') fs.writeFileSync(path.join(f.root, 'source.md'), 'bad');
    if (mode === 'body') { const p = json(path.join(f.bundlePath, 'packet.json')); p.message += 'bad'; fs.writeFileSync(path.join(f.bundlePath, 'packet.json'), JSON.stringify(p)); }
    assert.throws(() => receiveFileSession(f.bundlePath, mode === 'receiver' ? f.senderLog : f.receiverLog));
    assert.equal(json(path.join(f.bundlePath, 'report.json')).status, 'rejected-at-receiver');
  }
});
test('malformed UTF-8 and multipart content cannot masquerade as a complete message', () => {
  assert.throws(() => incomingRecords(Buffer.from([0xff, 10]), marker));
  const row = JSON.parse(userRow(`Dispatch-ID: ${marker}`)); row.payload.content.push({ type: 'input_text', text: 'extra' });
  assert.throws(() => incomingRecords(Buffer.from(JSON.stringify(row) + '\n'), marker), /ambiguous/);
  row.payload.content.pop(); row.payload.content.push({ type: 'encrypted_content', encrypted_content: 'opaque' });
  assert.throws(() => incomingRecords(Buffer.from(JSON.stringify(row) + '\n'), marker), /opaque/);
});
test('same-ID log replacement and same-inode prefix rewrite are rejected', async t => {
  for (const replace of [true, false]) {
    const f = setup(t); fs.appendFileSync(f.receiverLog, '{"before":"original"}\n');
    const b = beginSession(f.requestPath, f.bundlePath, f); recordOutgoing(f.bundlePath, b.arguments); recordHostResult(f.bundlePath, { result: {} });
    const changed = fs.readFileSync(f.receiverLog, 'utf8').replace('original', 'modified') + userRow(b.arguments.prompt);
    if (replace) { fs.renameSync(f.receiverLog, f.receiverLog + '.old'); fs.writeFileSync(f.receiverLog, changed); }
    else fs.writeFileSync(f.receiverLog, changed);
    const report = await collectSession(f.bundlePath, 0); assert.equal(report.status, 'unverified');
    assert.match(report.error, replace ? /identity/ : /prefix/);
  }
});
test('late file receiver cannot execute after collector timeout', async t => {
  const f = setup(t); beginSession(f.requestPath, f.bundlePath, { ...f, native: true });
  assert.equal((await collectFileSession(f.bundlePath, 0)).status, 'unverified');
  assert.throws(() => receiveFileSession(f.bundlePath, f.receiverLog), /finalized/);
  assert.equal(fs.existsSync(path.join(f.bundlePath, 'receiver-file-receipt.json')), false);
});
test('source mismatch evidence retains actual digest and byte count', async t => {
  const f = setup(t); const r = json(f.requestPath); r.sources[0].expectedSha256 = '0'.repeat(64); fs.writeFileSync(f.requestPath, JSON.stringify(r));
  const report = await dispatchThroughCodex({ tools: toolsFor(f), ...f, waitMs: 0 }); assert.equal(report.verified, false);
  const saved = json(path.join(f.bundlePath, 'report.json'));
  const known = admittedKnownHashAnswers("tests/agent-dispatch-session.test.mjs").sha256.abc;
  assert.equal(saved.details.actualSha256, known); assert.equal(saved.details.actualBytes, 3); assert.equal(saved.details.expectedSha256, '0'.repeat(64));
});
test('resumed tool output is assembled exactly before calling sender', async t => {
  const f = setup(t); const tools = toolsFor(f); const exec = tools.exec_command;
  let pending;
  tools.exec_command = async args => { const r = await exec(args); pending = { ...r, output: r.output.slice(0, 0) + r.output.slice(20) }; return { session_id: 1, output: r.output.slice(0, 20) }; };
  tools.write_stdin = async () => pending;
  const report = await dispatchThroughCodex({ tools, ...f, waitMs: 0 });
  assert.equal(report.status, 'verified'); assert.equal(tools.calls.length, 1);
});
