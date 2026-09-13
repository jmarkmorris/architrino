import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { prepareDispatch, verifyDispatch, verifyRetainedDispatch, compareReceived, sha256 } from './agent-dispatch.mjs';

const write = (dir, name, value) => fs.writeFileSync(path.join(dir, name), typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
const read = (dir, name) => JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
const timestamp = () => new Date().toISOString();
const identity = bytes => ({ bytes: bytes.length, sha256: sha256(bytes) });
function logIdentity(file) {
  const fd = fs.openSync(file, 'r');
  try {
    const buf = Buffer.alloc(1024 * 1024);
    const count = fs.readSync(fd, buf, 0, buf.length, 0);
    const end = buf.subarray(0, count).indexOf(10);
    if (end < 0) throw new Error('session metadata line unavailable');
    const row = JSON.parse(buf.subarray(0, end).toString('utf8'));
    if (row.type !== 'session_meta' || typeof row.payload.id !== 'string') throw new Error('invalid session metadata');
    const stat = fs.fstatSync(fd, { bigint: true });
    return { id: row.payload.id, cliVersion: row.payload.cli_version ?? null, originator: row.payload.originator ?? null, path: fs.realpathSync(file), dev: String(stat.dev), ino: String(stat.ino) };
  } finally { fs.closeSync(fd); }
}
function failure(dir, status, error) {
  const report = { status, timestamp: timestamp(), error: String(error.message ?? error), details: error.details ?? null, verified: false };
  if (fs.existsSync(path.join(dir, 'report.json'))) return { ...report, existingReportStatus: read(dir, 'report.json').status };
  write(dir, 'report.json', report);
  return report;
}
function logOffset(file) {
  const fd = fs.openSync(file, 'r');
  try {
    const size = fs.fstatSync(fd).size;
    const start = Math.max(0, size - 1024 * 1024);
    const tail = Buffer.alloc(size - start);
    fs.readSync(fd, tail, 0, tail.length, start);
    const last = tail.lastIndexOf(10);
    if (last < 0) throw new Error('receiver log has no complete recent line');
    return start + last + 1;
  } finally { fs.closeSync(fd); }
}
function prefixDigest(fd, length) {
  const hash = createHash('sha256'), buffer = Buffer.alloc(Math.min(length, 65536));
  let offset = 0;
  while (offset < length) {
    const n = fs.readSync(fd, buffer, 0, Math.min(buffer.length, length - offset), offset);
    if (!n) throw new Error('receiver log prefix was truncated');
    hash.update(buffer.subarray(0, n)); offset += n;
  }
  return hash.digest('hex');
}
export function beginSession(requestFile, dir, { threadId, senderLog, receiverLog, native = false }) {
  // Parent directory is operator-selected local evidence storage. Existing bundles are immutable.
  fs.mkdirSync(dir, { mode: 0o700 });
  try {
    const raw = fs.readFileSync(requestFile);
    write(dir, 'request.json', raw);
    const request = JSON.parse(raw.toString('utf8'));
    const sender = logIdentity(senderLog), receiver = logIdentity(receiverLog);
    if (receiver.id !== threadId || sender.id === receiver.id) throw new Error('receiver identity mismatch or self-dispatch');
    const packet = prepareDispatch(request);
    const host = { tool: native ? 'collaboration.followup_task' : 'mcp__codex_app__send_message_to_thread', threadId, sender, receiver, receiverOffset: logOffset(receiver.path), startedAt: timestamp(), nodeVersion: process.version, platform: process.platform };
    const fd = fs.openSync(receiver.path, 'r');
    try { host.receiverPrefixSha256 = prefixDigest(fd, host.receiverOffset); }
    finally { fs.closeSync(fd); }
    write(dir, 'packet.json', packet);
    write(dir, 'prepared.txt', packet.message);
    write(dir, 'host.json', host);
    return { dispatchId: packet.dispatchId, arguments: { threadId, prompt: packet.message } };
  } catch (error) { failure(dir, 'rejected-before-send', error); throw error; }
}
export function recordOutgoing(dir, args) {
  try {
    write(dir, 'outgoing.json', args);
    if (fs.existsSync(path.join(dir, 'report.json'))) throw new Error('dispatch already finalized');
    const packet = verifyDispatch(read(dir, 'packet.json'));
    const host = read(dir, 'host.json');
    if (Object.keys(args).sort().join(',') !== 'prompt,threadId' || args.threadId !== host.threadId || typeof args.prompt !== 'string') throw new Error('invalid outgoing arguments');
    write(dir, 'outgoing.txt', args.prompt);
    const result = compareReceived(packet, Buffer.from(args.prompt));
    if (!result.equal) throw new Error('outgoing message differs from prepared message');
    write(dir, 'send-boundary.json', { dispatchId: packet.dispatchId, timestamp: timestamp(), ...identity(Buffer.from(args.prompt)) });
    return { ready: true, dispatchId: packet.dispatchId };
  } catch (error) { failure(dir, 'rejected-before-send', error); throw error; }
}
export function recordHostResult(dir, result) { write(dir, 'host-result.json', result); }

// Only canonical incoming user-message records count, never echoes, tool output or summaries.
export function incomingRecords(raw, dispatchId) {
  const complete = raw.subarray(0, raw.lastIndexOf(10) + 1);
  const lines = new TextDecoder('utf-8', { fatal: true }).decode(complete).split('\n');
  lines.pop(); // A final non-newline-terminated row may still be in flight.
  const messages = [];
  for (const [index, line] of lines.entries()) {
    if (!line.trim()) continue;
    const row = JSON.parse(line);
    if (row.type !== 'response_item' || row.payload?.type !== 'message' || row.payload.role !== 'user') continue;
    const content = row.payload.content;
    if (!Array.isArray(content)) continue;
    const texts = content.filter(c => c.type === 'input_text' || c.type === 'text').map(c => c.text);
    if (texts.some(t => typeof t === 'string' && t.includes(`Dispatch-ID: ${dispatchId}`))) {
      if (content.length !== 1 || texts.length !== 1 || typeof texts[0] !== 'string' || !texts[0].isWellFormed()) throw new Error('ambiguous, opaque or malformed incoming message');
      messages.push({ text: texts[0], raw: line + '\n', timestamp: row.timestamp, itemId: row.payload.id ?? null, relativeLine: index + 1 });
    }
  }
  return messages;
}
function readDelta(host) {
  const meta = logIdentity(host.receiver.path);
  if (meta.id !== host.threadId || meta.dev !== host.receiver.dev || meta.ino !== host.receiver.ino) throw new Error('receiver log identity changed');
  const fd = fs.openSync(host.receiver.path, 'r');
  try {
    const size = fs.fstatSync(fd).size;
    const length = size - host.receiverOffset;
    if (length < 0 || length > 8 * 1024 * 1024) throw new Error('receiver log rotated or capture exceeds 8 MiB bound');
    if (prefixDigest(fd, host.receiverOffset) !== host.receiverPrefixSha256) throw new Error('receiver log prefix changed');
    const bytes = Buffer.alloc(length);
    const readCount = fs.readSync(fd, bytes, 0, length, host.receiverOffset);
    return bytes.subarray(0, readCount);
  } finally { fs.closeSync(fd); }
}
export async function collectSession(dir, waitMs = 15000) {
  if (!Number.isInteger(waitMs) || waitMs < 0 || waitMs > 60000) throw new Error('capture wait must be 0..60000 ms');
  if (fs.existsSync(path.join(dir, 'report.json'))) return read(dir, 'report.json');
  const deadline = Date.now() + waitMs;
  let lastDelta;
  try {
    const packet = verifyRetainedDispatch(read(dir, 'packet.json'));
    const host = read(dir, 'host.json');
    const args = read(dir, 'outgoing.json');
    const prepared = Buffer.from(packet.message), outgoing = Buffer.from(args.prompt);
    let delta, found;
    do {
      delta = readDelta(host); lastDelta = delta;
      found = incomingRecords(delta, packet.dispatchId);
      if (found.length || Date.now() >= deadline) break;
      await new Promise(resolve => setTimeout(resolve, Math.min(250, deadline - Date.now())));
    } while (true);
    const result = { dispatchId: packet.dispatchId, timestamp: timestamp(), verified: false, status: 'unverified', sender: host.sender, receiver: host.receiver, receiverOffset: host.receiverOffset, prepared: identity(prepared), outgoing: identity(outgoing), preparedVsOutgoing: compareReceived(packet, outgoing), reason: null };
    if (found.length !== 1) {
      result.reason = found.length ? 'multiple matching incoming messages' : 'no correlated incoming message within capture window';
      // The bounded delta preserves evidence even if corruption removed the identifier.
      write(dir, 'receiver-window.jsonl', delta);
    } else {
      const incoming = Buffer.from(found[0].text, 'utf8');
      write(dir, 'incoming.txt', incoming);
      write(dir, 'incoming-record.jsonl', found[0].raw);
      result.incoming = identity(incoming);
      result.receivedItem = { id: found[0].itemId, timestamp: found[0].timestamp, relativeLine: found[0].relativeLine };
      result.preparedVsIncoming = compareReceived(packet, incoming);
      result.outgoingVsIncoming = { equal: outgoing.equals(incoming), firstDifferentByte: firstDifference(outgoing, incoming) };
      result.status = !result.preparedVsOutgoing.equal ? 'sender-mismatch' : !result.outgoingVsIncoming.equal ? 'receiver-mismatch' : 'verified';
      result.verified = result.status === 'verified';
    }
    const ack = read(dir, 'host-result.json');
    if (ack.error || ack.result?.isError) { result.status = 'unverified'; result.verified = false; result.reason = 'host reported an error; delivery comparisons retained'; }
    write(dir, 'report.json', result);
    return result;
  } catch (error) {
    if (lastDelta && !fs.existsSync(path.join(dir, 'receiver-window.jsonl'))) write(dir, 'receiver-window.jsonl', lastDelta);
    return failure(dir, 'unverified', error);
  }
}

// V2 collaboration does not expose a programmatic plaintext send/receive boundary.
// Transfer the task and hashes by retained file; record this as payload verification,
// never upgrade it to verified transport based on model echoes or ciphertext.
export function receiveFileSession(dir, receiverLog) {
  try {
    if (fs.existsSync(path.join(dir, 'report.json'))) throw new Error('dispatch already finalized');
    const host = read(dir, 'host.json');
    if (host.tool !== 'collaboration.followup_task') throw new Error('not a native file dispatch');
    const receiver = logIdentity(receiverLog);
    if (receiver.id !== host.threadId || receiver.path !== host.receiver.path) throw new Error('wrong file receiver');
    const raw = fs.readFileSync(path.join(dir, 'packet.json'));
    write(dir, 'receiver-packet.json', raw);
    const packet = verifyDispatch(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(raw)));
    const prepared = fs.readFileSync(path.join(dir, 'prepared.txt'));
    if (!prepared.equals(Buffer.from(packet.message))) throw new Error('file payload differs from prepared message');
    write(dir, 'receiver-payload.txt', packet.message);
    const receipt = { dispatchId: packet.dispatchId, timestamp: timestamp(), receiver, payloadVerified: true, payload: identity(Buffer.from(packet.message)), packetFile: identity(raw), sources: packet.sources, transportVerified: false };
    write(dir, 'receiver-file-receipt.json', receipt);
    return { ...receipt, message: packet.message };
  } catch (error) { failure(dir, 'rejected-at-receiver', error); throw error; }
}
export async function collectFileSession(dir, waitMs = 15000) {
  if (!Number.isInteger(waitMs) || waitMs < 0 || waitMs > 60000) throw new Error('capture wait must be 0..60000 ms');
  const deadline = Date.now() + waitMs;
  do {
    if (fs.existsSync(path.join(dir, 'report.json'))) return read(dir, 'report.json');
    if (fs.existsSync(path.join(dir, 'receiver-file-receipt.json'))) break;
    if (Date.now() >= deadline) return failure(dir, 'unverified', 'no receiver file receipt within capture window');
    await new Promise(resolve => setTimeout(resolve, Math.min(250, deadline - Date.now())));
  } while (true);
  try {
    const host = read(dir, 'host.json');
    const packet = verifyRetainedDispatch(read(dir, 'packet.json'));
    const receipt = read(dir, 'receiver-file-receipt.json');
    const actual = fs.readFileSync(path.join(dir, 'receiver-payload.txt'));
    const receiverPacket = fs.readFileSync(path.join(dir, 'receiver-packet.json'));
    const receivedPacket = verifyRetainedDispatch(JSON.parse(receiverPacket.toString('utf8')));
    const comparison = compareReceived(packet, actual);
    if (receipt.dispatchId !== packet.dispatchId || receipt.receiver.id !== host.threadId || receipt.payload.sha256 !== sha256(actual) || receipt.payload.bytes !== actual.length || receipt.packetFile.sha256 !== sha256(receiverPacket) || receipt.packetFile.bytes !== receiverPacket.length || receivedPacket.message !== packet.message || JSON.stringify(receipt.sources) !== JSON.stringify(packet.sources)) throw new Error('receiver receipt mismatch');
    const delta = readDelta(host); write(dir, 'receiver-window.jsonl', delta);
    const report = { status: comparison.equal ? 'payload-verified-transport-unverified' : 'receiver-mismatch', verified: false, payloadVerified: comparison.equal, dispatchId: packet.dispatchId, timestamp: timestamp(), preparedVsReceiver: comparison, receiver: host.receiver, sender: host.sender, reason: 'native collaboration plaintext tool arguments and incoming agent-message contents are not exposed by this host; retained-file payload only', receiverReceipt: receipt };
    write(dir, 'report.json', report); return report;
  } catch (error) { return failure(dir, 'unverified', error); }
}
function firstDifference(a, b) {
  if (a.equals(b)) return null;
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const [mode, dir, ...args] = process.argv.slice(2);
    let result;
    if (mode === 'begin' && args.length === 4) result = beginSession(args[0], dir, { threadId: args[1], senderLog: args[2], receiverLog: args[3] });
    else if (mode === 'begin-native' && args.length === 4) result = beginSession(args[0], dir, { threadId: args[1], senderLog: args[2], receiverLog: args[3], native: true });
    else if (mode === 'receive-file' && args.length === 1) result = receiveFileSession(dir, args[0]);
    else if (mode === 'collect-file' && args.length <= 1) result = await collectFileSession(dir, args.length ? Number(args[0]) : 15000);
    else if (mode === 'outgoing' && args.length === 1) result = recordOutgoing(dir, JSON.parse(args[0]));
    else if (mode === 'result' && args.length === 1) { recordHostResult(dir, JSON.parse(args[0])); result = { recorded: true }; }
    else if (mode === 'fail' && args.length === 1) result = failure(dir, 'unverified', args[0]);
    else if (mode === 'collect' && args.length <= 1) result = await collectSession(dir, args.length ? Number(args[0]) : 15000);
    else throw new Error('usage: agent-dispatch-session.mjs begin bundle request threadId senderLog receiverLog | outgoing/result bundle json | collect bundle [waitMs] | fail bundle error');
    console.log(JSON.stringify(result));
    if (result?.verified === false && mode !== 'fail') process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
