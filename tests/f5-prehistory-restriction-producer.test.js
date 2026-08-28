import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { restrictPrehistory, SOURCE_PATH, SOURCE_SHA256 } from '../scripts/eom/prepare-f5-prehistory-restriction.mjs';

const script = fileURLToPath(new URL('../scripts/eom/prepare-f5-prehistory-restriction.mjs', import.meta.url));
function fixture() {
  const segments = Array.from({ length: 1032 }, (_, index) => ({
    index, tStart: index === 0 ? '-1' : `synthetic-${index}`,
    tEnd: `synthetic-${index + 1}`,
    coefficients: [['1.00', '-0', '2e-40', '0E-195'], ['1', '2', '3', '4'], ['-1', '0', '0', '0']],
    positionErrors: ['1e-10', '2e-10', '3e-10'], velocityErrors: ['4e-7', '5e-7', '6e-7'],
  }));
  segments[49].tEnd = segments[50].tStart = '-0.0003104827209370331';
  segments[50].tEnd = '0.019683307624644097';
  return {
    normalizedFieldSpeed: '1', retainedInterval: ['-1', '19.63359163663986'],
    maximumSegmentStep: '0.02', positionWidth: '1.528724905003159e-10', velocityWidth: '2.866983034112353e-7',
    members: Array.from({ length: 12 }, (_, index) => ({ index, constituentId: `test-${index}`, worldlineId: `path-${index}`,
      polarity: index % 2 ? -1 : 1, historyId: `original-${index}`, historyFingerprint: `old-${index}`, segments: structuredClone(segments) })),
  };
}

test('mechanical restriction preserves every selected token except twelve final endpoints', () => {
  const original = fixture();
  const before = JSON.stringify(original);
  const result = restrictPrehistory(original);
  assert.equal(JSON.stringify(original), before);
  assert.equal(result.schema, 'braid-program/f5-prehistory-restriction.v1');
  assert.deepEqual(result.sourceFullManifest, { path: SOURCE_PATH, sha256: SOURCE_SHA256 });
  assert.deepEqual(result.retainedInterval, ['-1', '0']);
  assert.equal(result.members.length, 12);
  for (const [i, member] of result.members.entries()) {
    assert.equal(member.segments.length, 51);
    for (const [j, segment] of member.segments.entries()) {
      const expected = structuredClone(original.members[i].segments[j]);
      if (j === 50) expected.tEnd = '0';
      assert.deepEqual(segment, expected);
    }
    assert.deepEqual(member.originalHistory, { historyId: `original-${i}`, historyFingerprint: `old-${i}` });
    assert(!Object.hasOwn(member, 'historyId'));
    assert(!Object.hasOwn(member, 'historyFingerprint'));
  }
  assert(!Object.hasOwn(result, 'accepted'));
  assert(!Object.hasOwn(result, 'coupling'));
  assert(!Object.hasOwn(result, 'initialState'));
  result.members[0].segments[0].coefficients[0][0] = 'changed';
  assert.equal(JSON.stringify(original), before);
});

test('fixed header, identity, census, continuity and crossing mismatches fail', () => {
  for (const mutate of [
    f => { f.normalizedFieldSpeed = '2'; }, f => { f.retainedInterval[1] = '20'; },
    f => { f.positionWidth = '1e-9'; }, f => { f.velocityWidth = '1e-6'; },
    f => { f.maximumSegmentStep = '0.03'; }, f => { f.members.pop(); },
    f => { f.members[0].index = 1; }, f => { f.members[0].segments.pop(); },
    f => { f.members[0].segments[0].index = 1; }, f => { f.members[0].segments[1].tStart = 'gap'; },
    f => { f.members[0].segments[50].tEnd = '0'; },
    f => { f.members[0].segments[49].tEnd = f.members[0].segments[50].tStart = '-0.1'; },
  ]) {
    const full = fixture(); mutate(full);
    assert.throws(() => restrictPrehistory(full));
  }
});

test('CLI rejects existing output and dangling symlink without reading or transforming actual input', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'f5-prefix-producer-controls-'));
  const existing = path.join(dir, 'existing.json');
  const link = path.join(dir, 'dangling.json');
  try {
    fs.writeFileSync(existing, 'preserve');
    fs.symlinkSync(path.join(dir, 'absent.json'), link);
    for (const output of [existing, link]) {
      const r = spawnSync(process.execPath, [script, '--out', output], { encoding: 'utf8', timeout: 2000 });
      assert.equal(r.status, 1); assert.equal(r.stdout, '');
      assert.equal(JSON.parse(r.stderr).accepted, false);
    }
    assert.equal(fs.readFileSync(existing, 'utf8'), 'preserve');
    assert.equal(fs.readlinkSync(link), path.join(dir, 'absent.json'));
    assert(!fs.existsSync(path.join(dir, 'absent.json')));
  } finally { fs.unlinkSync(link); fs.unlinkSync(existing); fs.rmdirSync(dir); }
});

test('CLI rejects unsupported arguments without output', () => {
  for (const args of [[], ['--out'], ['--source', 'other'], ['--out', 'x', '--force']]) {
    const r = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', timeout: 2000 });
    assert.equal(r.status, 1); assert.equal(r.stdout, '');
    assert.equal(JSON.parse(r.stderr).completed, false);
  }
});
