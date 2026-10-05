// Independent expected answers were frozen in the Moore mathematical reference
// (5fa6d8a2f5376a454c1b4a031010f4e923f2a7e191aa7add89db3e6eeae06afc)
// before reading the subject. This checker was authored after that disclosure.
// Run --known first and record the pass before --check. No trajectory is run.
import assert from 'node:assert/strict';

function arithmeticKnown() {
  const mv = (a, x) => a.map(r => r.reduce((s, v, j) => s + v * x[j], 0));
  assert.deepEqual(mv([[0, 0], [0, -0.5]], [100, 3]), [0, -1.5]);
  assert.deepEqual(mv([[-0.25, 0], [0, 0]], [100, 3]), [-25, 0]);
  assert.deepEqual(mv([[0, 0], [0, 0.5]], [1000, 4]), [0, 2]);
  assert.equal(Math.min(0.5, 0 + 0.5 * 1) * 3, 1.5);
  assert.equal(4 + 3 * 1 + 0.5, 7.5);
  assert.equal(Math.min(6, 7.5), 6);
  return { passed: true, scope: 'independent dyadic matrix and cap controls; no subject imports' };
}

async function check() {
  const dir = './';
  const { Q, G } = await import(dir + 'maxwell-shaped-overnight-grid-interval.mjs');
  const subject = await import(dir + 'maxwell-e-first-event-neutral-component-source-v2.mjs');
  const { neutralFrame } = await import(dir + 'maxwell-e-first-event-neutral-nominal-receiver-coefficients.mjs');
  const box = a => a.map(r => r.map(G.of));
  const z = [0, 0], zero = box([[0, 0], [0, 0]]);
  const contains = (x, v) => assert(x.lo.cmp(v) <= 0 && x.hi.cmp(v) >= 0);
  const matrix = (a, expected) => a.forEach((r, i) => r.forEach((x, j) => contains(x, expected[i][j])));
  const upper = (x, expected) => {
    assert(x.cmp(expected) >= 0, 'encloses independently derived answer');
    assert(x.sub(expected).cmp('0.000000000000000001') < 0, 'sharp on this exact control');
  };
  const src = Object.fromEntries(Object.entries({ r: 0, ur: 100, ut: 3, ar: 1000, at: 4 }).map(([k, v]) => [k, Q.of(v)]));
  const axis = { receiver: [new G(1), new G(0)], source: [new G(1), new G(0)] };
  const geo = [Q.of(0), Q.of(0), Q.of(0)];
  const staticFrame = neutralFrame([2, 0], z, z, z, z);
  matrix(staticFrame.q.Fv, [[0, 0], [0, '-1/2']]);
  matrix(staticFrame.H.Fv, [['-1/4', 0], [0, 0]]);
  matrix(staticFrame.H.Fa, [[0, 0], [0, 0]]);
  const q = subject.projected(staticFrame.q, axis, src, geo, 0, 0, 0, 100);
  const h = subject.projected(staticFrame.H, axis, src, geo, 0, 0, 0, 100);
  upper(q.components[0], 0); upper(q.components[1], '3/2'); upper(q.norm, '3/2');
  upper(h.components[0], 25); upper(h.components[1], 0); upper(h.norm, 25);
  const moving = neutralFrame([2, 0], z, z, z, ['1/3', 0]);
  matrix(moving.H.Fa, [[0, 0], [0, '1/6']]);
  const onlyA = { ...src, ur: Q.of(0), ut: Q.of(0) };
  const ha = subject.projected(moving.H, axis, onlyA, geo, 0, 0, 0, 100);
  upper(ha.components[1], '2/3');
  const e = { clock: { n: [new G(1), new G(0)] }, offset: { Fv: zero, Fa: box([[0, 0], [0, '1/2']]) }, Cx: Q.of(0) };
  const ae = subject.physical(e, [1, 0], [1, 0], src, geo, 0, 0, 0, 100);
  upper(ae.components[0], 0); upper(ae.components[1], 2);
  const angular = subject.projected({ Fv: box([[0, 0], [0, '-1/2']]), Fa: zero }, axis, { ...onlyA, ur: Q.of(3), ar: Q.of(0), at: Q.of(0) }, geo, 1, 0, 0, 100);
  upper(angular.components[1], '3/2');
  const rotation = subject.projected({ Fv: box([[0, 0], [0, '-1/2']]), Fa: zero }, axis, { ...onlyA, ar: Q.of(0), at: Q.of(0) }, [Q.of(0), Q.of(2), Q.of(0)], '1/4', 0, 0, 100);
  upper(rotation.components[1], '1/4');
  const cap = subject.physical(e, [1, 0], [1, 0], src, geo, 0, 0, 0, '1/10');
  assert.equal(cap.components[1].toString(), '1/10');
  const velocity = subject.velocity(4, 1, [new G(3), new G(0)], [Q.of('1/2'), Q.of(0)], 6);
  assert(velocity[0].cmp(6) === 0 && velocity[1].cmp(4) === 0);
  return { passed: true, scope: 'independent exact controls only; no target trajectory or complete-row audit', cases: ['static physical q/H derivatives and projected source V', 'nonzero receiving projection retains delayed H acceleration', 'physical E delayed acceleration with arbitrary radial error', 'source-axis angular inflation', 'nominal-vector angular rotation', 'safe old norm cap', 'physical receiving velocity conversion'] };
}

if (process.argv.includes('--known')) console.log(JSON.stringify(arithmeticKnown()));
else if (process.argv.includes('--check')) console.log(JSON.stringify(await check()));
else throw new Error('Choose --known before --check; no default target run.');
