// Reviewer-authored exact rational affine controls. No production solver imports.
// Run known controls before writing any target fixture; keep this reference frozen.
import assert from 'node:assert/strict';
import fs from 'node:fs';

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
}
class Q {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    this.n = n / g; this.d = d / g;
  }
  static token(s) {
    const match = /^(-?)(\d+)(?:\.(\d+))?$/.exec(s);
    if (!match) throw new Error('unsupported exact decimal token');
    const fraction = match[3] ?? '';
    return new Q((match[1] === '-' ? -1n : 1n) * BigInt(match[2] + fraction), 10n ** BigInt(fraction.length));
  }
  add(b) { return new Q(this.n * b.d + b.n * this.d, this.d * b.d); }
  sub(b) { return new Q(this.n * b.d - b.n * this.d, this.d * b.d); }
  mul(b) { return new Q(this.n * b.n, this.d * b.d); }
  div(b) { return new Q(this.n * b.d, this.d * b.n); }
  neg() { return new Q(-this.n, this.d); }
  abs() { return new Q(this.n < 0n ? -this.n : this.n, this.d); }
  cmp(b) { const d = this.n * b.d - b.n * this.d; return d < 0n ? -1 : d > 0n ? 1 : 0; }
  toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
}
const zero = new Q(0n), one = new Q(1n);
const q = s => Q.token(s);

function row(receiver, source, lower, upper) {
  const d = q(source.p).sub(q(receiver.p));
  const u = q(source.u);
  if (u.abs().cmp(one) >= 0) throw new Error('reference requires strictly sub-wake affine histories');
  if (receiver.id === source.id) {
    assert.equal(d.cmp(zero), 0);
    return { receiver: receiver.id, source: source.id, disposition: 'coincident_self_endpoint_excluded', root: '0', accelerationZ: '0' };
  }
  if (d.cmp(zero) === 0) throw new Error('distinct coincident paths not admitted');
  const sign = new Q(BigInt(d.cmp(zero)));
  const D = one.add(sign.mul(u));
  const distance = d.abs().div(D);
  const root = distance.neg();
  const emissionDisplacement = d.add(u.mul(root));
  assert.equal(emissionDisplacement.abs().cmp(distance), 0, 'unsquared causal residual');
  assert.equal(emissionDisplacement.cmp(zero), Number(sign.n), 'source remains on its root ray');
  const lowerCmp = root.cmp(lower), upperCmp = root.cmp(upper);
  const disposition = lowerCmp < 0 || upperCmp > 0 ? 'absent' : lowerCmp === 0 ? 'lower_boundary' : upperCmp === 0 ? 'upper_boundary' : 'present';
  const acceleration = sign.neg().mul(q(receiver.charge)).mul(q(source.charge)).mul(D).div(d.mul(d));
  return {
    receiver: receiver.id, source: source.id, disposition,
    root: root.toString(), transmitterFactor: D.toString(),
    distance: distance.toString(), accelerationZ: disposition === 'absent' ? '0' : acceleration.toString(),
  };
}

// Exact known cases are recorded before target population evaluation.
const receiver = { id: 'known-receiver', p: '0', u: '0', charge: '1' };
const knownStatic = row(receiver, { id: 'known-source', p: '2', u: '0', charge: '1' }, q('-10'), zero);
assert.equal(knownStatic.root, '-2');
assert.equal(knownStatic.accelerationZ, '-1/4');
const knownMoving = row(receiver, { id: 'known-moving-source', p: '2', u: '0.5', charge: '1' }, q('-10'), zero);
assert.equal(knownMoving.root, '-4/3');
assert.equal(knownMoving.accelerationZ, '-3/8');
const knownReversed = row(receiver, { id: 'known-reversed-source', p: '-2', u: '-0.5', charge: '-1' }, q('-10'), zero);
assert.equal(knownReversed.root, '-4/3');
assert.equal(knownReversed.accelerationZ, '-3/8');
const knownFraction = q('-0.125').add(q('0.375'));
assert.equal(knownFraction.toString(), '1/4');
console.log('Known controls passed before targets: static root -2/kernel -1/4; moving root -4/3/kernel -3/8; reversed polarity/geometry; exact decimal arithmetic.');

const fixtures = [
  { id: 'static-complete', lower: '-20', paths: [
    { id: 'receiver', p: '0', u: '0', charge: '1' },
    { id: 'plus', p: '10', u: '0', charge: '1' },
    { id: 'minus', p: '10.1', u: '0', charge: '-1' },
  ] },
  { id: 'affine-complete', lower: '-200', paths: [
    { id: 'receiver', p: '0', u: '0', charge: '1' },
    { id: 'plus', p: '100', u: '0.01', charge: '1' },
    { id: 'minus', p: '100.1', u: '0.03', charge: '-1' },
  ] },
  { id: 'mixed-root-window', lower: '-10.05', paths: [
    { id: 'receiver', p: '0', u: '0', charge: '1' },
    { id: 'plus', p: '10', u: '0', charge: '1' },
    { id: 'minus', p: '10.1', u: '0', charge: '-1' },
  ] },
  { id: 'lower-boundary-root', lower: '-10.1', paths: [
    { id: 'receiver', p: '0', u: '0', charge: '1' },
    { id: 'plus', p: '10', u: '0', charge: '1' },
    { id: 'minus', p: '10.1', u: '0', charge: '-1' },
  ] },
];
const records = fixtures.map(f => {
  const rows = f.paths.flatMap(r => f.paths.map(s => row(r, s, q(f.lower), zero)));
  const receiverTotals = f.paths.map(r => {
    const members = rows.filter(x => x.receiver === r.id);
    const total = members.reduce((sum, x) => {
      const [n, d = '1'] = x.accelerationZ.split('/');
      return sum.add(new Q(n, d));
    }, zero);
    return { receiver: r.id, acceleration: ['0', '0', total.toString()] };
  });
  return { ...f, fieldSpeed: '1', coupling: '1', receptionTime: '0', upper: '0', rows, receiverTotals };
});
assert.equal(records[0].rows.length, 9);
assert.deepEqual(records[2].rows.filter(x => x.receiver === 'receiver').map(x => x.disposition), ['coincident_self_endpoint_excluded', 'present', 'absent']);
assert.equal(records[3].rows.find(x => x.receiver === 'receiver' && x.source === 'minus').disposition, 'lower_boundary');

const out = {
  schema: 'eom_matched_pair_reviewer_affine_controls/v1',
  claim: 'exact algebraic canonical acceleration for prescribed affine histories; no evolved-state or cost claim',
  boundaryConvention: 'closed retained window for nonself roots; grouped strict-interior admission must decline boundary cases',
  knownControlsPassedBeforeTargets: true,
  fixtures: records,
};
const output = process.argv[2];
if (output) {
  fs.writeFileSync(output, JSON.stringify(out, null, 2) + '\n', { flag: 'wx' });
  console.log(`Wrote ${records.length} independently evaluated fixtures with ${records.reduce((n, x) => n + x.rows.length, 0)} logical rows to ${output}.`);
} else {
  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
}
