#!/usr/bin/env node
// Section 13 adjudication (independent reference lane, 2026-10-05): certified enclosures for the
// persistence runs WP-1, WP-2, WP-3 computed from each run's RECORDED initial state (case files),
// using the fixed reference module and the withheld module's pairStateInvariants (both read-only),
// then compared with the subject's located turning radii, periods, apsidal angles and sampled suprema.
// Also: Theorem 2.1 spot checks along the fixed reduced-ODE evaluator (floating, measured).
// Known cases run and are printed first.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as R from '../../../../reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-independent-reference.mjs';
import * as W from '../../../../reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-independent-reference-withheld.mjs';
const { I, rat, add, sub, mul, div, sqr, isqrt, scale, mid, width, FROZEN, lawConstants, boundOrbit, reducedOdeEvolve, singularCoefficient } = R;
const root = '/sessions/upbeat-blissful-allen/mnt/architrino/';
const sha = (p) => createHash('sha256').update(readFileSync(root + p)).digest('hex');
const L = lawConstants(FROZEN(-1));
const out = { generatedUtc: new Date().toISOString(), node: process.version, fixedSources: {
  reference: sha('reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-independent-reference.mjs'),
  withheld: sha('reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-independent-reference-withheld.mjs') }, known: [], targets: {}, spot: [] };
let fail = 0;
const rec = (arr, id, name, ok, detail) => { if (!ok) fail++; arr.push({ id, name, pass: ok, ...detail }); console.log(`${ok ? 'PASS' : 'FAIL'} ${id} ${name} ${JSON.stringify(detail)}`); };
const inside = (x, E) => x >= E[0] && x <= E[1];
const offset = (x, E) => (x < E[0] ? x - E[0] : x > E[1] ? x - E[1] : 0);
const iv = (v) => v.map((x) => I(x));
function enclose(members, orbit = true) {
  const [m1, m2] = members;
  const inv = W.pairStateInvariants(L, iv(m1.x), iv(m2.x), iv(m1.v), iv(m2.v));
  const bo = orbit ? boundOrbit(L, inv.C, inv.h, 128) : null;
  const sup = orbit ? W.absoluteSpeedSupremum(inv, bo) : null;
  const Dlo = orbit ? singularCoefficient(L, bo.rMax) : null, Dhi = orbit ? singularCoefficient(L, bo.rMin) : null;
  // excess Lambda = C/2 + k^2/(2h^2) = C/2 + 2/h^2 ; e = (h/k) sqrt(2 Lambda) = (h/2) sqrt(2 Lambda)
  const Lam = add(scale(inv.C, 0.5), div(I(2), inv.hSq));
  const e = mul(scale(inv.h, 0.5), isqrt((() => { const t = scale(Lam, 2); return I(Math.max(0, t[0]), Math.max(0, t[1])); })())); // Lambda >= 0 is derived; clamp rounding below zero
  const rh = scale(inv.hSq, 0.5);
  const rpL = div(rh, add(I(1), e)), raL = div(rh, sub(I(1), e)); // Theorem 2.1 form of the turning radii
  return { inv, bo, sup, D: [Dlo, Dhi], Lam, e, rh, rpL, raL };
}
const fmt = (a) => [a[0], a[1]];
// ---------------- known case: WB-5 exact preparation (Section 10.2): r_- = 243/119, r_+ = 3, C = -119/150
{
  const v = 0.9 * Math.sqrt(2 / 3) / 2;
  const E = enclose([{ x: [1.5, 0, 0], v: [0, v, 0] }, { x: [-1.5, 0, 0], v: [0, -v, 0] }]);
  rec(out.known, 'N1', 'WB-5 pericentre encloses 243/119', inside(243 / 119, E.bo.rMin) , { rMin: fmt(E.bo.rMin) });
  rec(out.known, 'N1b', 'WB-5 apocentre encloses 3', inside(3, E.bo.rMax), { rMax: fmt(E.bo.rMax) });
  rec(out.known, 'N1c', 'WB-5 C encloses -119/150', inside(-119 / 150, E.inv.C), { C: fmt(E.inv.C) });
  rec(out.known, 'N1d', 'WB-5 period/apsidal match Section 10.2 (23.80464654, 4.239830417)', Math.abs(mid(E.bo.period) - 23.80464654) < 1e-8 && Math.abs(mid(E.bo.apsidal) - 4.239830417) < 1e-9, { period: fmt(E.bo.period), apsidal: fmt(E.bo.apsidal) });
  rec(out.known, 'N1e', 'Theorem 2.1 radii r_h/(1±e) overlap the quadratic roots (WB-5, e encloses 0.19)', inside(0.19, E.e) && E.rpL[0] <= E.bo.rMin[1] && E.rpL[1] >= E.bo.rMin[0] && E.raL[0] <= E.bo.rMax[1] && E.raL[1] >= E.bo.rMax[0], { e: fmt(E.e), rpL: fmt(E.rpL), raL: fmt(E.raL) });
}
// ---------------- known case: unperturbed x=4 circle gives e enclosing 0 and Lambda enclosing 0
{
  const v = Math.sqrt(1 / 8);
  const E = enclose([{ x: [2, 0, 0], v: [0, v, 0] }, { x: [-2, 0, 0], v: [0, -v, 0] }], false);
  rec(out.known, 'N2', 'x=4 circle: Lambda encloses 0 with width < 1e-14 (first tolerance 1e-15 was below the rounding width 4e-15)', E.Lam[0] <= 0 && E.Lam[1] >= 0 && width(E.Lam) < 1e-14, { Lambda: fmt(E.Lam) });
}
if (fail) { console.log('known-case failure: abort'); process.exit(1); }
// ---------------- targets
const runs = JSON.parse(readFileSync(root + 'reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-persistence-runs.json', 'utf8'));
for (const id of ['WP-1', 'WP-2', 'WP-3']) {
  const cf = JSON.parse(readFileSync(root + `.local-data/master-equation-closure/weber-overnight/binary/persistence/cases/${id}-prereg.json`, 'utf8'));
  const E = enclose(cf.members);
  const c = runs.cases[id], p = c.prereg, ie = c.integrationError;
  const T = { initialState: cf.members.map((m) => ({ x: m.x, v: m.v })), enclosures: {
    h: fmt(E.inv.h), C: fmt(E.inv.C), epsilon: fmt(scale(E.inv.C, 0.5)), Lambda: fmt(E.Lam), e: fmt(E.e), rh: fmt(E.rh),
    rp: fmt(E.bo.rMin), ra: fmt(E.bo.rMax), rpTheorem: fmt(E.rpL), raTheorem: fmt(E.raL),
    radialPeriod: fmt(E.bo.period), apsidalAngle: fmt(E.bo.apsidal), precessionPerRadialPeriod: fmt(E.bo.precessionPerRadialPeriod),
    detRange: [fmt(E.D[0]), fmt(E.D[1])], centreSpeed: fmt(E.sup.centreSpeed), inPlaneProjection: fmt(E.sup.inPlaneProjection),
    supMemberSpeed: fmt(E.sup.supremumMemberSpeed), supMemberSpeedCentreRest: fmt(E.bo.individualSpeedMaxCentreAtRest), hhat: E.inv.hhat.map(fmt),
    trapezoidRemainder: E.bo.certificate }, comparison: {} };
  const cmp = (name, m, En, err) => { const off = offset(m, En); T.comparison[name] = { measured: m, enclosure: fmt(En), offset: off, withinSubjectEstimate: err === undefined ? null : Math.abs(off) <= err, subjectEstimate: err ?? null }; console.log(`${off === 0 ? 'INSIDE ' : 'OUTSIDE'} ${id} ${name}: ${m} vs [${En[0]}, ${En[1]}] offset ${off.toExponential(2)}${err !== undefined ? ' subject estimate ' + err.toExponential(2) + (Math.abs(off) <= err ? ' (within)' : ' (EXCEEDS)') : ''}`); };
  cmp('pericentre mean', p.pericentres.mean, E.bo.rMin, ie.maxTurningRadiusDiff);
  cmp('pericentre min', p.pericentres.min, E.bo.rMin, ie.maxTurningRadiusDiff);
  cmp('pericentre max', p.pericentres.max, E.bo.rMin, ie.maxTurningRadiusDiff);
  cmp('apocentre mean', p.apocentres.mean, E.bo.rMax, ie.maxTurningRadiusDiff);
  cmp('apocentre min', p.apocentres.min, E.bo.rMax, ie.maxTurningRadiusDiff);
  cmp('apocentre max', p.apocentres.max, E.bo.rMax, ie.maxTurningRadiusDiff);
  cmp('step-end rMin (expected >= rp)', p.rMinSteps, [E.bo.rMin[0], Infinity]);
  cmp('step-end rMax (expected <= ra)', p.rMaxSteps, [-Infinity, E.bo.rMax[1]]);
  cmp('radial period mean', p.radialPeriod.mean, E.bo.period, ie.meanRadialPeriodDiff);
  cmp('apsidal angle mean', p.apsidalAngle.mean, E.bo.apsidal, ie.meanApsidalAngleDiff);
  cmp('subject predicted rp', c.predicted.rp, E.bo.rMin);
  cmp('subject predicted ra', c.predicted.ra, E.bo.rMax);
  cmp('subject predicted radial period', c.predicted.radialPeriod, E.bo.period);
  cmp('subject predicted apsidal angle', c.predicted.apsidalAngle, E.bo.apsidal);
  cmp('subject predicted supremum speed (void frame)', c.predicted.supSpeedVoidFrame, E.sup.supremumMemberSpeed);
  cmp('sampled max speed (must be <= supremum)', p.maxSpeedSampled, [-Infinity, E.sup.supremumMemberSpeed[1]]);
  cmp('smallest |det M| (expected >= 1+2/ra)', p.minAbsDet, [E.D[0][0], Infinity]);
  cmp('smallest |det M| vs 1+2/ra enclosure', p.minAbsDet, E.D[0]);
  T.comparison.hhatMeasuredInitial = p.planeNormalInitial;
  T.comparison.hhatInside = p.planeNormalInitial.every((x, i) => inside(x, E.inv.hhat[i]));
  console.log(`${id} plane normal recorded ${JSON.stringify(p.planeNormalInitial)} inside hhat enclosure: ${T.comparison.hhatInside}`);
  out.targets[id] = T;
}
// ---------------- Theorem 2.1 spot checks with the fixed reduced-ODE evaluator (floating, measured)
// Perturbed states about circles at x=4 and x=1: random (r0, rdot0, h) near the circle; integrate ~6 radial
// periods; check r in [rp, ra], |rdot| <= k e/h, and that min/max r approach rp, ra.
{
  let seed = 20261005; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  const k = 2;
  for (const x of [4, 1]) {
    for (let j = 0; j < 4; j++) {
      const h0 = Math.sqrt(k * x); const h = h0 * (1 + 0.02 * (rnd() - 0.5)); const r0 = x * (1 + 0.03 * (rnd() - 0.5)); const rdot0 = 0.03 * (rnd() - 0.5) * Math.sqrt(k / x);
      const D = 1 + 2 / r0; const C = rdot0 * rdot0 * D + h * h / (r0 * r0) - 4 / r0; const Lam = C / 2 + k * k / (2 * h * h); const e = (h / k) * Math.sqrt(2 * Lam); const rh = h * h / k;
      const rp = rh / (1 + e), ra = rh / (1 - e), vb = k * e / h;
      const Tr = mid(boundOrbit(L, I(C), I(h)).period);
      let rmin = Infinity, rmax = -Infinity, vmax = 0; const dt = Tr / 4000; const nsteps = Math.round(6 * Tr / dt);
      reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1, K: 1, c: 1 }, { r: r0, rdot: rdot0, h }, { dt, maxSteps: nsteps, event: (y) => { rmin = Math.min(rmin, y[0]); rmax = Math.max(rmax, y[0]); vmax = Math.max(vmax, Math.abs(y[1])); return y[1]; } });
      const ok = rmin >= rp - 1e-9 && rmax <= ra + 1e-9 && vmax <= vb + 1e-9 && Math.abs(rmin - rp) < 1e-6 * rp && Math.abs(rmax - ra) < 1e-6 * ra;
      rec(out.spot, `S-x${x}-${j}`, 'Theorem 2.1 bounds hold along the fixed reduced-ODE evaluator and are attained', ok, { r0, rdot0, h, C, Lambda: Lam, e, rp, ra, rminOde: rmin, rmaxOde: rmax, rdotBound: vb, rdotMaxOde: vmax, periodsIntegrated: 6, dt });
    }
  }
}
// Theorem 2.2 item 3 counter-case: circle at x=1/2 (member speed exactly c_f, centre at rest). A perturbation that
// raises h to 1+eta AND moves the state to its new circle radius r_h = (1+eta)^2/2 with a small radial kick giving
// e = eta/2 (< eta) is an O(eta) perturbation of the boundary circle with e > 0 whose pericentre member speed
// (k/2h)(1+e) = (1+e)/(1+eta) is BELOW c_f. (A first version of this test perturbed h at fixed r = 1/2; that state is
// its own pericentre with speed (1+eta) > c_f and is not a counter-case; recorded as an instrument-log item.)
{
  const k = 2, c = 1;
  for (const eta of [1e-3, 1e-2]) {
    const h = 1 + eta; const rh = h * h / k; const e = eta / 2; const D = 1 + 2 / rh; const rdot0 = 2 * e / (h * Math.sqrt(D));
    const r0 = rh; const C = rdot0 * rdot0 * D + h * h / (r0 * r0) - 4 / r0; const Lam = C / 2 + k * k / (2 * h * h); const eChk = (h / k) * Math.sqrt(2 * Lam);
    const rp = rh / (1 + eChk); const vPeriMember = h / (2 * rp);
    const stateDist = Math.hypot(r0 - 0.5, rdot0, h / r0 - 1 / 0.5); // crude size of the perturbation in (r, rdot, tangential relative speed)
    rec(out.spot, `T22-${eta}`, 'boundary circle x=1/2: an O(eta) perturbation with e = eta/2 > 0 and h = 1+eta keeps the pericentre member speed below c_f (counter-case to "every perturbation with e>0")', vPeriMember < c && eChk > 0 && Math.abs(eChk - e) < 1e-9, { eta, h, r0, rdot0, C, e: eChk, rp, memberSpeedPericentre: vPeriMember, cf: c, perturbationSize: stateDist });
  }
}
// ---------------- WB-6 contact-schedule comparison against the fixed enclosures (Section 10.4)
{
  const r0 = rat(5, 2);
  const tc = W.timeFromRestTo(L, r0, I(0)).time; const t125 = W.timeFromRestTo(L, r0, rat(5, 4)).time; const t6 = W.timeFromRestTo(L, r0, I(1e-6));
  const C = R.invariantC(L, r0, I(0), I(0));
  const r6 = rat(1, 1e6); const v6 = isqrt(R.rdotSq(L, C, I(0), r6)); // level |rdot| at r = 1e-6
  // tail: time from r=1e-6 to contact on the level, by the closed form difference
  const tail = sub(tc, t6.time);
  const staged = runs.contactStepObligation.result.schedule; const fin = staged.final; const st0 = staged.stages[0];
  const fine = 4.759920496914469; // WB-6 rtol 1e-12 contact event time (target-runs machine summary)
  const stagedPlusTail = add(I(fin.tContact), tail); const finePlusTail = add(I(fine), tail);
  out.wb6 = { timeTo1em6Enclosure: fmt(t6.time), fineEventOffset: offset(fine, t6.time), stagedEventOffset: offset(fin.tContact, t6.time), relSpeedAt1em6Enclosure: fmt(t6.relSpeedAtR), fineRdotOffset: offset(1.4142129259781444, t6.relSpeedAtR), stagedRdotOffset: offset(-fin.rdotContact, t6.relSpeedAtR), contactEnclosure: fmt(tc), tail: fmt(tail), levelSpeedAt1em6: fmt(v6), stagedContact: fin.tContact, stagedPlusTail: fmt(stagedPlusTail), stagedOffset: offset(mid(stagedPlusTail), tc), finePlusTail: fmt(finePlusTail), fineOffset: offset(mid(finePlusTail), tc), stagedMinusFine: fin.tContact - fine, stagedRdot: fin.rdotContact, stage0Time: st0.tStop, stage0Enclosure: fmt(t125), stage0Offset: offset(st0.tStop, t125), stage0Rdot: st0.rdotStop, levelSpeedAt125: Math.sqrt(8 / 13) };
  console.log('WB-6 staged schedule:', JSON.stringify(out.wb6));
}
out.failures = fail;
const dir = root + '.local-data/master-equation-closure/weber-overnight/review'; mkdirSync(dir, { recursive: true });
writeFileSync(dir + '/persistence-adjudication-enclosures.json', JSON.stringify(out, null, 1));
console.log(`== ${fail} failing check(s); record ${dir}/persistence-adjudication-enclosures.json ==`);
process.exit(fail ? 1 : 0);
