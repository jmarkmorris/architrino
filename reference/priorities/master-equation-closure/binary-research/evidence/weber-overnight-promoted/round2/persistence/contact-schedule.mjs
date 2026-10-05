// Item 4 of weber-overnight-persistence.md: verify on WB-6 that the step restriction h <= theta * r / sup|rdot| guarantees contact capture
// at rtol 1e-10, where the single-hmax run stepped over r = 0. The instrument is used unchanged through its module export runCase;
// the schedule is imposed manually by restarting the same spec from the located state at r = r_k/2 with hmax halved (a staged run).
// Known case first: the single-hmax run at rtol 1e-10 must reproduce the recorded step-over (no contact event, pass through r = 0).
import fs from 'node:fs';
import path from 'node:path';
import { runCase } from '../../../../reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-pair-instrument.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const base = { coefficients: { lambda: -0.5, mu: 1, K: 1, cf: 1 }, candidate: 'auto', condition: 'exact', events: { rContact: 1e-6, rEscape: 1000, detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10, contact: { stop: true }, escape: { stop: true }, obstruction: { stop: true }, speed: { record: true, stop: false }, turning: { record: true, floor: 1e-9 } } };
const members0 = [{ x: [1.25, 0, 0], v: [0, 0, 0], q: 1 }, { x: [-1.25, 0, 0], v: [0, 0, 0], q: -1 }];
const out = { date: new Date().toISOString(), case: 'WB-6: opposite polarity, radial release from rest at x=2.5', rtol: 1e-10 };

// K: single hmax = 0.05 at rtol 1e-10 (the preregistered refinement setting): expected step-over of the contact window
{
  const r = runCase({ ...base, name: 'WB-6-refine-known', members: members0, integrator: { method: 'gbs', rtol: 1e-10, atol: 1e-14, hmax: 0.05 }, tEnd: 6 });
  const contact = r.events.filter(e => e.kind === 'contact'), turning = r.events.filter(e => e.kind === 'turning');
  out.knownCase = { termination: r.termination, contactEvents: contact.length, turningEvents: turning.map(t => ({ t: t.t, r: t.r })), rMinSteps: r.pairs[0].rMin, steps: r.steps, pass: contact.length === 0 && turning.length >= 1 && turning[0].r < 1e-12 };
  console.log('known (single hmax 0.05): contact events', contact.length, 'turning at', JSON.stringify(turning.map(t => [t.t, t.r])), out.knownCase.pass ? 'PASS (step-over reproduced)' : 'FAIL');
}
// T: staged schedule with theta = 0.5 and sup|rdot| = sqrt2 (the derived contact-speed bound): hmax_k = theta * r_k / sqrt2
{
  const theta = 0.5, W = Math.SQRT2; let members = members0.map(m => ({ x: m.x.slice(), v: m.v.slice(), q: m.q })), t = 0, rk = 2.5, stages = [];
  let final = null;
  for (let s = 0; s < 60; s++) {
    const target = Math.max(rk / 2, 1e-6), hmax = theta * rk / W, last = target <= 1e-6;
    const r = runCase({ ...base, name: `WB-6-stage-${s}`, members, integrator: { method: 'gbs', rtol: 1e-10, atol: 1e-14, hmax }, events: { ...base.events, rContact: target }, tEnd: 6 - t });
    const rFinal = Math.hypot(r.final.x[0] - r.final.x[3], r.final.x[1] - r.final.x[4], r.final.x[2] - r.final.x[5]);
    const rdot = ((r.final.x[0] - r.final.x[3]) * (r.final.v[0] - r.final.v[3]) + (r.final.x[1] - r.final.x[4]) * (r.final.v[1] - r.final.v[4]) + (r.final.x[2] - r.final.x[5]) * (r.final.v[2] - r.final.v[5])) / rFinal;
    stages.push({ stage: s, rStart: rk, hmax, stopTarget: target, termination: r.termination.reason, tStop: t + r.termination.t, rStop: rFinal, rdotStop: rdot, steps: r.steps, maxStepOverR: null });
    t += r.termination.t;
    if (r.termination.reason !== 'contact') { final = { ok: false, reason: `stage ${s} ended by ${r.termination.reason}` }; break; }
    members = [{ x: r.final.x.slice(0, 3), v: r.final.v.slice(0, 3), q: 1 }, { x: r.final.x.slice(3, 6), v: r.final.v.slice(3, 6), q: -1 }];
    rk = rFinal;
    if (last) { final = { ok: true, tContact: t, rContact: rFinal, rdotContact: rdot, individualSpeed: Math.hypot(...r.final.v.slice(0, 3)) }; break; }
  }
  out.schedule = { theta, supRdot: W, rule: 'hmax_k = theta * r_k / sqrt2 on the stage starting at separation r_k, stage ends when r = r_k/2 (located as a measuring stop), final stage stops at r = 1e-6', stages, final };
  const expected = { tContactEvent_rtol1e12: 4.7599204969, tZero_extrapolated: 4.7599212040, relSpeed: Math.SQRT2 };
  out.comparison = final && final.ok ? { tContactMinusFineRun: final.tContact - expected.tContactEvent_rtol1e12, rdotPlusSqrt2: final.rdotContact + Math.SQRT2, expected } : { expected };
  console.log('staged schedule:', JSON.stringify(final), 'stages', stages.length, 'comparison', JSON.stringify(out.comparison));
}
fs.writeFileSync(path.join(HERE, 'contact-schedule.out.json'), JSON.stringify(out, null, 2) + '\n');
