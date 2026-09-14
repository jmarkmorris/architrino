#!/usr/bin/env node
/** Data-only restriction of one frozen F5 manifest. No EOM request or proof. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const SOURCE_PATH = '.local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/prepared-20260827-v1/history-manifest.json';
export const SOURCE_SHA256 = '5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725';
const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const MAX_SOURCE_BYTES = 128 * 1024 * 1024;
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const select = (value, keys) => Object.fromEntries(keys.map(key => [key, structuredClone(value[key])]));
const identity = stat => [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs];

/** Pure mechanical transform, deliberately not an independent conformance check. */
export function restrictPrehistory(full) {
  assert.equal(full.normalizedFieldSpeed, '1');
  assert.deepEqual(full.retainedInterval, ['-1', '19.63359163663986']);
  assert.equal(full.maximumSegmentStep, '0.02');
  assert.equal(full.positionWidth, '1.528724905003159e-10');
  assert.equal(full.velocityWidth, '2.866983034112353e-7');
  assert.equal(full.members.length, 12);
  const members = full.members.map((original, index) => {
    assert.equal(original.index, index);
    assert.equal(original.segments.length, 1032);
    const segments = original.segments.slice(0, 51).map((segment, segmentIndex) => {
      assert.equal(segment.index, segmentIndex);
      assert.equal(segment.tStart, segmentIndex === 0 ? '-1' : original.segments[segmentIndex - 1].tEnd);
      return select(segment, ['index', 'tStart', 'tEnd', 'coefficients', 'positionErrors', 'velocityErrors']);
    });
    assert.equal(segments[50].tStart, '-0.0003104827209370331');
    assert.equal(segments[50].tEnd, '0.019683307624644097');
    segments[50].tEnd = '0';
    return {
      ...select(original, ['index', 'constituentId', 'worldlineId', 'polarity']),
      originalHistory: select(original, ['historyId', 'historyFingerprint']),
      segments,
    };
  });
  return {
    schema: 'braid-program/f5-prehistory-restriction.v1',
    sourceFullManifest: { path: SOURCE_PATH, sha256: SOURCE_SHA256 },
    normalizedFieldSpeed: '1', retainedInterval: ['-1', '0'], releaseTime: '0',
    ...select(full, ['maximumSegmentStep', 'positionWidth', 'velocityWidth']),
    members,
  };
}

/** A same-handle, bounded byte capture; source identity is not execution authority. */
function capture(filename, expected) {
  const fd = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NONBLOCK | (fs.constants.O_NOFOLLOW ?? 0));
  try {
    const before = fs.fstatSync(fd, { bigint: true });
    assert(before.isFile() && before.size <= BigInt(MAX_SOURCE_BYTES), 'bounded regular source required');
    const read = () => {
      const bytes = Buffer.alloc(Number(before.size));
      let offset = 0;
      while (offset < bytes.length) {
        const length = fs.readSync(fd, bytes, offset, bytes.length - offset, offset);
        assert(length > 0, 'source truncated');
        offset += length;
      }
      assert.deepEqual(identity(fs.fstatSync(fd, { bigint: true })), identity(before), 'source changed');
      assert.deepEqual(identity(fs.lstatSync(filename, { bigint: true })), identity(before), 'source replaced');
      assert.equal(digest(bytes), expected, 'frozen source SHA-256 differs');
      return bytes;
    };
    const bytes = read();
    return { bytes, recheck: () => assert.deepEqual(read(), bytes), close: () => fs.closeSync(fd) };
  } catch (error) {
    fs.closeSync(fd);
    throw error;
  }
}

export function main(args = process.argv.slice(2)) {
  assert(args.length === 2 && args[0] === '--out', 'usage: prepare-f5-prehistory-restriction.mjs --out NEW_FILE');
  const began = performance.now();
  const output = path.resolve(args[1]);
  assert(fs.statSync(path.dirname(output)).isDirectory(), 'existing output directory required');
  // lstat rejects dangling symlinks too. The exclusive open remains decisive.
  try { fs.lstatSync(output); assert.fail('output already exists'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const source = capture(path.join(ROOT, SOURCE_PATH), SOURCE_SHA256);
  let bytes;
  try {
    bytes = Buffer.from(`${JSON.stringify(restrictPrehistory(JSON.parse(source.bytes)), null, 2)}\n`);
    source.recheck();
    const fd = fs.openSync(output, 'wx', 0o600);
    try { fs.writeFileSync(fd, bytes); fs.fsyncSync(fd); }
    finally { fs.closeSync(fd); }
    assert.deepEqual(fs.readFileSync(output), bytes, 'output bytes differ');
    source.recheck();
  } finally { source.close(); }
  const result = {
    completed: true, accepted: false, authority: 'data-only; independent restriction verification still required',
    source: { path: SOURCE_PATH, sha256: SOURCE_SHA256 },
    output: { path: output, sha256: digest(bytes), bytes: bytes.length },
    memberCount: 12, segmentCount: 612, clippedSegmentCount: 12,
    elapsedSeconds: (performance.now() - began) / 1000,
    rootsEvaluated: false, eomExecuted: false, evolutionAuthorized: false,
    currentHistoryFingerprintEstablished: false,
  };
  console.log(JSON.stringify(result));
  return result;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); }
  catch (error) { console.error(JSON.stringify({ completed: false, accepted: false, failure: error.message })); process.exitCode = 1; }
}
