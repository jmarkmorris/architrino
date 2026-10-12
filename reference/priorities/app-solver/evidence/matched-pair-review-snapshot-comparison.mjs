import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

// Output adapter only. The frozen separately authored affine oracle supplies
// mathematical answers; this file never imports production code or computes
// the canonical kernel from the implementation being reviewed.
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const expectedHash = 'cdcea43040a01f2711502f294f29415fcdf73ac038025b72f3e831636d8ed5a2';
function rational(token) {
  assert.match(token, /^-?\d+(?:\/\d+)?$/);
  const [n, d = '1'] = token.split('/');
  assert(BigInt(d) > 0n);
  return [BigInt(n), BigInt(d)];
}
function compare(a, b) {
  const delta = a[0] * b[1] - b[0] * a[1];
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}
function binary64(value) {
  assert(Number.isFinite(value), 'nonfinite interval endpoint');
  if (value === 0) return [0n, 1n];
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value, false);
  const bits = view.getBigUint64(0, false);
  const negative = (bits >> 63n) !== 0n;
  const exponent = Number((bits >> 52n) & 2047n);
  const fraction = bits & ((1n << 52n) - 1n);
  const mantissa = exponent === 0 ? fraction : (1n << 52n) + fraction;
  const shift = exponent === 0 ? -1074 : exponent - 1023 - 52;
  const signed = negative ? -mantissa : mantissa;
  return shift >= 0 ? [signed << BigInt(shift), 1n] : [signed, 1n << BigInt(-shift)];
}
function contains(interval, exact) {
  assert(Array.isArray(interval) && interval.length === 2);
  const lower = binary64(interval[0]);
  const upper = binary64(interval[1]);
  assert(compare(lower, upper) <= 0, 'reversed interval');
  return compare(lower, exact) <= 0 && compare(exact, upper) <= 0;
}
function checkSnapshot(reference, actual) {
  const ids = reference.paths.map(path => path.id);
  const n = ids.length;
  assert.equal(actual.logical_ordered_pairs, n * n, 'logical source count');
  assert.equal(actual.pairs.length, n * n, 'full logical matrix');
  const pairs = new Set();
  const groups = new Map();
  for (const pair of actual.pairs) {
    assert(ids.includes(pair.receiver) && ids.includes(pair.source), 'foreign identity');
    const key = JSON.stringify([pair.receiver, pair.source]);
    assert(!pairs.has(key), 'duplicate logical source slot');
    pairs.add(key);
    if (pair.chart === 'matched_pair_enclosure') {
      assert.equal(pair.root_schema, 'eom_native_matched_pair_member_marker/v1');
      assert.equal(pair.root_count, 0, 'group marker carries isolated roots');
      assert.equal(pair.root_free_complement, 0, 'group marker claims root-free complement');
      assert.equal(pair.rows.length, 1);
      const row = pair.rows[0];
      assert(row.accumulation_group, 'missing group reference');
      const owner = JSON.stringify([pair.receiver, row.accumulation_group]);
      const members = groups.get(owner) ?? [];
      members.push({pair, row});
      groups.set(owner, members);
    }
  }
  for (const members of groups.values()) {
    assert.equal(members.length, 2, 'group must own two logical members');
    assert.notEqual(members[0].pair.source, members[1].pair.source);
    const followers = members.filter(member => member.row.acceptance_status === 'matched_pair_group_reduction_identity');
    assert.equal(followers.length, 1, 'exactly one reduction identity');
    for (const interval of followers[0].row.acceleration) assert.deepEqual(interval, [0, 0]);
    const physical = members.filter(member => member !== followers[0]);
    assert(['consumed_certified_matched_pair_group', 'consumed_certified_matched_pair_absence'].includes(physical[0].row.acceptance_status));
    const expectedMembers = reference.rows.filter(row =>
      row.receiver === members[0].pair.receiver && members.some(member => member.pair.source === row.source));
    assert.equal(expectedMembers.length, 2);
    assert(!expectedMembers.some(row => row.disposition.includes('boundary')), 'boundary group admitted');
    assert.equal(expectedMembers[0].disposition, expectedMembers[1].disposition, 'mixed membership grouped');
  }
  if (actual.policy === 'disabled') assert.equal(groups.size, 0, 'disabled route groups sources');
  if (actual.status !== 'certified_complete' || actual.acceleration_status !== 'certified_complete') {
    return {case: actual.case, acceptedForContainment: false, status: actual.status,
      accelerationStatus: actual.acceleration_status, reason: 'output does not certify a complete acceleration'};
  }
  assert.equal(actual.unresolved_pairs, 0);
  assert.equal(actual.exact_pairs + actual.excluded_pairs + actual.enclosed_pairs, n * n);
  assert.equal(actual.receiver_totals.length, n);
  const receivers = new Set();
  for (const total of actual.receiver_totals) {
    assert(ids.includes(total.receiver) && !receivers.has(total.receiver), 'duplicate/foreign receiver total');
    receivers.add(total.receiver);
    const expected = reference.receiverTotals.find(row => row.receiver === total.receiver);
    assert(expected, 'missing reference receiver');
    assert.equal(total.acceleration.length, 3);
    assert.equal(expected.acceleration.length, 3);
    const exact = expected.acceleration;
    total.acceleration.forEach((interval, component) => {
      assert(contains(interval, rational(exact[component])),
        `${actual.case}: receiver ${total.receiver} component ${component} misses exact ${exact[component]}`);
    });
  }
  return {case: actual.case, acceptedForContainment: true, receiverTotalsChecked: n, logicalPairsChecked: n * n, groupsChecked: groups.size};
}

// Known cases must finish before reading any real target.
assert.equal(compare(binary64(0.5), rational('1/2')), 0);
assert.equal(compare(binary64(-0.25), rational('-1/4')), 0);
assert.equal(compare(binary64(Number.MIN_VALUE), [1n, 1n << 1074n]), 0);
assert.equal(compare(binary64(0.1), rational('1/10')), 1);
assert(contains([-0.25, -0.25], rational('-1/4')));
assert(!contains([-0.249, 0], rational('-1/4')));
const knownReference = {paths: [{id: 'known'}], rows: [], receiverTotals: [{receiver: 'known', acceleration: ['0', '0', '-1/4']}]};
const knownOutput = {case: 'known-kernel', policy: 'disabled', logical_ordered_pairs: 1,
  pairs: [{receiver: 'known', source: 'known', chart: 'sharp'}], status: 'certified_complete',
  acceleration_status: 'certified_complete', unresolved_pairs: 0, exact_pairs: 1, excluded_pairs: 0, enclosed_pairs: 0,
  receiver_totals: [{receiver: 'known', acceleration: [[0, 0], [0, 0], [-0.25, -0.25]]}]};
assert.equal(checkSnapshot(knownReference, knownOutput).acceptedForContainment, true);
assert.throws(() => checkSnapshot(knownReference, {...knownOutput, receiver_totals: []}), /receiver_totals|0 !== 1|Expected values/);
assert.throws(() => checkSnapshot(knownReference, {...knownOutput, pairs: [...knownOutput.pairs, ...knownOutput.pairs]}));
assert.throws(() => checkSnapshot(knownReference, {...knownOutput,
  receiver_totals: [{receiver: 'known', acceleration: [[0, 0], [0, 0], [-0.249, 0]]}]}), /misses exact/);
console.log('Known comparison controls passed BEFORE target reads: exact binary64 arithmetic, static -1/4 inclusion, escaped value, missing total and duplicated slot rejection.');
if (process.argv[2] !== '--known-only') {
  const [referencePath, targetPath, receiptPath] = process.argv.slice(2);
  assert(referencePath && targetPath && receiptPath, 'usage: comparison reference.json target.jsonl new-receipt.json');
  const referenceBytes = fs.readFileSync(referencePath);
  assert.equal(digest(referenceBytes), expectedHash, 'frozen independent reference changed');
  const reference = JSON.parse(referenceBytes);
  const targetBytes = fs.readFileSync(targetPath);
  const cases = targetBytes.toString('utf8').trim().split('\n').map(line => JSON.parse(line));
  const reports = cases.map(actual => {
    const match = /^reviewer\/([^/]+)\/(enabled|disabled)\/traversal=([01])$/.exec(actual.case);
    assert(match, 'unrecognized reviewer case identity');
    const fixture = reference.fixtures.find(item => item.id === match[1]);
    assert(fixture, 'unknown frozen fixture');
    assert.equal(actual.traversal, Number(match[3]));
    assert.equal(actual.policy === 'disabled', match[2] === 'disabled');
    return checkSnapshot(fixture, actual);
  });
  assert.equal(new Set(cases.map(actual => actual.case)).size, cases.length, 'duplicate case');
  const receipt = {schema: 'eom_matched_pair_reviewer_snapshot_comparison/v1',
    knownControlsPassedBeforeTargets: true, referencePath, referenceSha256: digest(referenceBytes),
    targetPath, targetSha256: digest(targetBytes), checkerSha256: digest(fs.readFileSync(new URL(import.meta.url))),
    claim: 'exact prescribed-affine full-total inclusion and logical accounting on these output bytes; source qualification, input adapter and evolution reviewed separately',
    reports};
  fs.writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n', {flag: 'wx'});
  console.log(JSON.stringify({cases: reports.length, completeCases: reports.filter(row => row.acceptedForContainment).length,
    incompleteCases: reports.filter(row => !row.acceptedForContainment).length, receiptPath}));
}
