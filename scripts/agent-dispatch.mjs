import { createHash, randomUUID } from 'node:crypto';
import { readFileSync, realpathSync, openSync, closeSync, fstatSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Local operational limit, not a statement about any provider's capacity.
export const MAX_MESSAGE_BYTES = 1024 * 1024;
const schema = 'architrino-agent-dispatch/v2';
const fail = (message, details) => { const error = new Error(message); if (details) error.details = details; throw error; };
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function requireHash(value) {
  if (typeof value !== 'string' || value.length !== 64 || !/^[0-9a-f]{64}$/.test(value)) fail('SHA-256 must be exactly 64 lowercase hexadecimal characters', { received: value, type: typeof value, characters: typeof value === 'string' ? value.length : null });
  return value;
}
function text(value, label) {
  if (typeof value !== 'string' || !value.length || !value.isWellFormed()) fail(`${label} must be nonempty well-formed Unicode text`);
  return value;
}
function source(root, name) {
  text(name, 'source path');
  if (path.isAbsolute(name) || name.includes('\\') || name.split('/').some(p => !p || p === '.' || p === '..')) fail('source path must be canonical and relative');
  const resolved = realpathSync(path.join(root, name));
  const relative = path.relative(root, resolved);
  if (relative.startsWith('..' + path.sep) || relative === '..' || path.isAbsolute(relative)) fail('source escapes repository root');
  const fd = openSync(resolved, 'r');
  try {
    const before = fstatSync(fd, { bigint: true });
    if (!before.isFile()) fail('source must be a regular file');
    const bytes = readFileSync(fd);
    const after = fstatSync(fd, { bigint: true });
    const named = statSync(resolved, { bigint: true });
    if (before.size !== after.size || before.mtimeNs !== after.mtimeNs || before.ctimeNs !== after.ctimeNs || named.ino !== after.ino || named.dev !== after.dev || realpathSync(path.join(root, name)) !== resolved) fail('source changed during read');
    return { path: name, bytes: bytes.length, sha256: sha256(bytes) };
  } finally { closeSync(fd); }
}
function messageFor(body, sources, dispatchId) {
  if (typeof dispatchId !== 'string' || dispatchId.length !== 36 || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(dispatchId)) fail('invalid dispatch identifier');
  const message = `Dispatch-ID: ${dispatchId}\n${body}\n\nMachine-computed dispatch baseline (UTF-8 JSON):\n${JSON.stringify(sources)}\nVerify these source identities before editing; stop on a mismatch.\n`;
  if (Buffer.byteLength(message, 'utf8') > MAX_MESSAGE_BYTES) fail('dispatch exceeds local UTF-8 byte limit');
  return message;
}
export function prepareDispatch({ root, body, sources, dispatchId = randomUUID() }) {
  root = realpathSync(root);
  text(body, 'body');
  if (!Array.isArray(sources) || !sources.length) fail('sources must be a nonempty array');
  const seen = new Set();
  const records = sources.map(item => {
    if (!item || typeof item !== 'object' || Object.keys(item).some(k => !['path', 'expectedSha256'].includes(k))) fail('invalid source specification');
    if (seen.has(item.path)) fail('duplicate source');
    seen.add(item.path);
    if (Object.hasOwn(item, 'expectedSha256')) requireHash(item.expectedSha256);
    const record = source(root, item.path);
    if (Object.hasOwn(item, 'expectedSha256') && record.sha256 !== item.expectedSha256) fail(`source hash mismatch: ${item.path}`, { path: item.path, expectedSha256: item.expectedSha256, actualSha256: record.sha256, actualBytes: record.bytes });
    return record;
  });
  const message = messageFor(body, records, dispatchId);
  return { schema, dispatchId, root, body, sources: records, message, messageBytes: Buffer.byteLength(message), messageSha256: sha256(Buffer.from(message, 'utf8')) };
}
export function verifyRetainedDispatch(packet) {
  if (!packet || packet.schema !== schema) fail('unsupported dispatch schema');
  requireHash(packet.messageSha256);
  if (!Array.isArray(packet.sources) || !packet.sources.length) fail('missing source records');
  for (const row of packet.sources) {
    requireHash(row?.sha256);
    if (!Number.isSafeInteger(row.bytes) || row.bytes < 0) fail('invalid source byte count');
  }
  text(packet.body, 'body');
  const message = messageFor(packet.body, packet.sources, packet.dispatchId);
  if (message !== packet.message || Buffer.byteLength(message) !== packet.messageBytes || sha256(Buffer.from(message)) !== packet.messageSha256) fail('dispatch payload mismatch');
  return packet;
}
export function verifyDispatch(packet) {
  verifyRetainedDispatch(packet);
  const fresh = prepareDispatch({ root: packet.root, body: packet.body, dispatchId: packet.dispatchId, sources: packet.sources.map(row => ({ path: row.path, expectedSha256: row.sha256 })) });
  if (fresh.root !== packet.root || JSON.stringify(fresh.sources) !== JSON.stringify(packet.sources)) fail('source record mismatch');
  if (fresh.message !== packet.message || fresh.messageBytes !== packet.messageBytes || fresh.messageSha256 !== packet.messageSha256) fail('dispatch payload mismatch');
  return fresh;
}
// The callback receives the verified primitive string, never a mutable packet.
// No await or caller callback occurs between verification and send invocation.
export function sendDispatch(packet, send) {
  if (typeof send !== 'function') fail('send callback required');
  const verified = verifyDispatch(packet);
  return send(verified.message);
}
export function compareReceived(packet, receivedBytes) {
  // Historical comparison deliberately does not require today's source bytes.
  verifyRetainedDispatch(packet);
  const expected = Buffer.from(packet.message, 'utf8');
  if (expected.length !== packet.messageBytes || sha256(expected) !== packet.messageSha256) fail('invalid retained payload identity');
  if (!Buffer.isBuffer(receivedBytes)) fail('received payload must be raw bytes');
  let first = 0;
  while (first < expected.length && first < receivedBytes.length && expected[first] === receivedBytes[first]) first++;
  const equal = expected.equals(receivedBytes);
  return { equal, expectedBytes: expected.length, receivedBytes: receivedBytes.length, expectedSha256: packet.messageSha256, receivedSha256: sha256(receivedBytes), firstDifferentByte: equal ? null : first, expectedByte: equal ? null : (expected[first] ?? null), receivedByte: equal ? null : (receivedBytes[first] ?? null) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const [mode, input, output, ...extra] = process.argv.slice(2);
    if (extra.length || !input || !['prepare', 'verify', 'compare'].includes(mode) || (mode !== 'verify' && !output) || (mode === 'verify' && output)) fail('usage: agent-dispatch.mjs prepare request.json packet.json | verify packet.json | compare packet.json received.txt');
    const packet = JSON.parse(readFileSync(input, 'utf8'));
    if (mode === 'prepare') {
      const result = prepareDispatch(packet);
      writeFileSync(output, JSON.stringify(result, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
      console.log(JSON.stringify({ packet: path.resolve(output), messageBytes: result.messageBytes, messageSha256: result.messageSha256 }));
    } else if (mode === 'verify') {
      console.log(JSON.stringify(verifyDispatch(packet)));
    } else {
      const result = compareReceived(packet, readFileSync(output));
      console.log(JSON.stringify(result));
      if (!result.equal) process.exitCode = 1;
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
