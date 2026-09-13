import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const rows = text => text.split('\n').flatMap((line, index) => line ? [{ line: index + 1, event: JSON.parse(line) }] : []);
const baseline = text => /had SHA-256 ([^;]*);/.exec(text)?.[1];
const valid = text => typeof text === 'string' && text.length === 64 && /^[0-9a-f]{64}$/.test(text);
function construct(code) {
  const raw = code.slice(code.indexOf('const assignments = [') + 'const assignments = '.length, code.indexOf(';\nconst prompt'));
  const assignments = JSON.parse(raw.replace(/\b(file|report|priority|hash):/g, '"$1":'));
  const template = /const prompt = a => `([\s\S]*?)`;\nconst results =/.exec(code)?.[1];
  assert(template !== undefined, 'missing exact template boundary');
  return assignments.map(a => ({ ...a, prompt: template.replace(/\$\{a\.(\w+)\}/g, (_, key) => { assert(Object.hasOwn(a, key)); return a[key]; }) }));
}
if (process.argv[2] === 'controls') {
  assert.equal(sha(Buffer.from('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const fixture = rows('{"payload":{"text":"had SHA-256 abcd;"}}\n\n{"payload":{"text":"none"}}\n');
  assert.equal(fixture[0].line, 1); assert.equal(fixture[1].line, 3);
  assert.equal(baseline(fixture[0].event.payload.text), 'abcd'); assert.equal(baseline('none'), undefined);
  assert.throws(() => rows('{bad json}'));
  assert(valid('a'.repeat(64)));
  for (const v of ['', 'a'.repeat(63), 'a'.repeat(65), 'g'.repeat(64), 'a'.repeat(64)+'\n', 'abcdef…', undefined]) assert(!valid(v));
  assert.equal(Buffer.byteLength('é🙂'), 6);
  const code = 'const assignments = [{file: "é.md", report: "r.md", priority: 7, hash: "abc"}];\nconst prompt = a => `P ${a.priority} ${a.file} had SHA-256 ${a.hash};`;\nconst results =';
  assert.equal(construct(code)[0].prompt, 'P 7 é.md had SHA-256 abc;');
  assert.throws(() => construct(code.replace('${a.file}', '${a.unknown}')));
  console.log('PASS before target: published abc SHA-256; JSONL positive/negative and line numbering; exact template interpolation; missing-key rejection; malformed and intentional abbreviated hashes; Unicode UTF-8 count.');
} else if (process.argv[2] === 'dispatch') {
  const localDir = '/Users/markmorris/.codex/sessions/2026/09/12';
  const coordinator = 'rollout-2026-09-12T08-22-35-01a09591-cbca-75c3-883b-5f8bd1f9efeb.jsonl';
  const parent = rows(fs.readFileSync(path.join(localDir, coordinator), 'utf8'));
  const codeRow = parent.find(r => r.line === 3692); assert.equal(codeRow.event.payload.type, 'custom_tool_call');
  const assignments = construct(codeRow.event.payload.input);
  const measuredRow = parent.find(r => r.line === 3687);
  const output = measuredRow.event.payload.item.stdout;
  const findings = assignments.map(a => {
    const measured = output.split('\n').find(line => line.endsWith('  '+a.file))?.split(' ')[0]; assert(valid(measured));
    const send = parent.find(r => r.event.payload.item?.type === 'CollabAgentToolCall' && r.event.payload.item.prompt === a.prompt); assert(send);
    const receiverId = send.event.payload.item.receiver_thread_ids[0];
    const receiverLog = fs.readdirSync(localDir).find(f => f.endsWith(receiverId+'.jsonl')); assert(receiverLog);
    const child = rows(fs.readFileSync(path.join(localDir, receiverLog), 'utf8'));
    const incoming = child.find(r => r.event.payload.type === 'message' && r.event.payload.role === 'user' && r.event.payload.content?.some(c => c.text?.startsWith('Complete the CRW-005 bounded corpus review and repair for priority '+a.priority+':'))); assert(incoming);
    const received = incoming.event.payload.content.find(c => c.text?.startsWith('Complete the CRW-005')).text;
    const gitBytes = execFileSync('git', ['show', '72847589ba73d0bf81d07ca5b27d98072659cee9:'+a.file]);
    return { priority:a.priority, path:a.file, measured, authored:a.hash, receivedHash:baseline(received), hashSyntaxValid:valid(a.hash), measuredEqualsAuthored:measured===a.hash, historicalGitSha256:sha(gitBytes), historicalGitBytes:gitBytes.length, sourceMatchesMeasurement:sha(gitBytes)===measured, constructedBytes:Buffer.byteLength(a.prompt), outgoingBytes:Buffer.byteLength(send.event.payload.item.prompt), incomingBytes:Buffer.byteLength(received), constructedSha256:sha(a.prompt), outgoingSha256:sha(send.event.payload.item.prompt), incomingSha256:sha(received), completeValuesEqual:a.prompt===received, measurement:{log:coordinator,line:measuredRow.line,time:measuredRow.event.timestamp}, construction:{log:coordinator,line:codeRow.line,time:codeRow.event.timestamp}, outgoing:{log:coordinator,line:send.line,time:send.event.timestamp,callId:send.event.payload.item.id}, incoming:{log:receiverLog,line:incoming.line,time:incoming.event.timestamp,receiverId} };
  });
  console.log(JSON.stringify({instrument:'inspect-dispatch.mjs dispatch', measuredAt:new Date().toISOString(), timezone:'Original event timestamps UTC; operator local EDT is UTC minus 4 hours.', findings},null,2));
} else throw new Error('Use controls first, retain its successful output, then dispatch.');
