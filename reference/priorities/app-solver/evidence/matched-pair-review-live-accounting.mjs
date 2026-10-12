import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Independent review of reported debits, not an enclosure/root oracle.
function decimal(s) {
  const m = /^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(s);
  assert(m, 'decimal token');
  const p = Number(m[4] ?? 0) - (m[3]?.length ?? 0);
  const n = BigInt(m[2] + (m[3] ?? '')) * (m[1] === '-' ? -1n : 1n);
  return p >= 0 ? [n * 10n ** BigInt(p), 1n] : [n, 10n ** BigInt(-p)];
}
function binary(x) {
  assert(Number.isFinite(x) && x >= 0);
  if (x === 0) return [0n, 1n];
  const d = new DataView(new ArrayBuffer(8));
  d.setFloat64(0, x);
  const bits = d.getBigUint64(0), e = Number((bits >> 52n) & 2047n);
  const m = (bits & ((1n << 52n) - 1n)) + (e ? 1n << 52n : 0n);
  const p = e ? e - 1075 : -1074;
  return p >= 0 ? [m << BigInt(p), 1n] : [m, 1n << BigInt(-p)];
}
const add = (a, b) => [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];
const mul = (a, b) => [a[0] * b[0], a[1] * b[1]];
const le = (a, b) => a[0] * b[1] <= b[0] * a[1];
function check(s) {
  if (s.status !== 'certified_complete') return false;
  const allocation = mul(decimal(s.far_field_enclosure_fraction), decimal(s.acceleration_tolerance));
  assert(le(binary(s.enclosed_error_width_max_receiver), allocation), 'receiver budget exceeded');
  let groups = [0n, 1n];
  for (const g of s.groups) {
    // The fixture retains declined candidate diagnostics as well as owners.
    // A declined candidate contributes no debit even when its trial width is
    // recorded for the admission decision.
    if (g.status === 'declined') continue;
    if (g.status === 'certified_absent') assert.equal(g.emitted_width, 0);
    else {
      assert.equal(g.status, 'certified_enclosed');
      assert(le(binary(g.emitted_width), binary(g.admission_width_threshold)), 'group budget exceeded');
      groups = add(groups, binary(g.emitted_width));
    }
  }
  assert(le(groups, binary(s.enclosed_error_width_total)), 'group debit missing from total');
  return true;
}

// Known pass and deliberately escaping budget/debit before any target read.
const known = {status: 'certified_complete', far_field_enclosure_fraction: '0.5', acceleration_tolerance: '0.125', enclosed_error_width_max_receiver: 1 / 64, enclosed_error_width_total: 1 / 64, groups: [{status: 'certified_enclosed', emitted_width: 1 / 64, admission_width_threshold: 1 / 32}]};
assert.equal(check(known), true);
assert.equal(check({...known, groups: [...known.groups, {status: 'declined', emitted_width: 1}]}), true);
assert.throws(() => check({...known, enclosed_error_width_max_receiver: 1 / 8}), /receiver budget exceeded/);
assert.throws(() => check({...known, enclosed_error_width_total: 0}), /group debit missing/);
assert(le(binary(Number.MIN_VALUE), decimal('1e-323')));
assert(le(decimal('0.015625'), binary(1 / 64)) && le(binary(1 / 64), decimal('0.015625')));
console.log('Known accounting controls passed BEFORE target reads: exact 1/64 debit, escaping receiver budget and missing debit refused, subnormal conversion checked.');
const [input, output] = process.argv.slice(2);
assert(input && output);
const bytes = fs.readFileSync(input);
const rows = bytes.toString('utf8').trim().split('\n').map(JSON.parse);
let accepted = 0;
for (const row of rows) accepted += Number(check(row));
const receipt = {recordedAt: new Date().toISOString(), input, inputHash: createHash('sha256').update(bytes).digest('hex'), rows: rows.length, acceptedChecked: accepted, incompleteUnaccepted: rows.length - accepted, knownCasesPassedBeforeTarget: true};
fs.writeFileSync(output, JSON.stringify(receipt, null, 2) + '\n', {flag: 'wx'});
console.log(JSON.stringify(receipt));
