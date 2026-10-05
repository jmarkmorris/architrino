import { reducedOdeEvolve } from '../../../../reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-independent-reference.mjs';
const W = (s) => ({ sigma: s, lambda: -0.5, mu: 1 });
// B11: sigma=+1 inside r_c, receding, C<2: r0=1, rdot=+1.6 -> C = 2.56*(1-2) + 4 = 1.44. Expect r -> 2^- with |rdot| -> inf; closed form time = int_1^2 sqrt((2-r)/(4-1.44 r)) dr
{
  const run = reducedOdeEvolve(W(1), { r: 1, rdot: 1.6, h: 0 }, { dt: 1e-6, maxSteps: 5e6, event: (y) => y[0] - 1.999, maxEvents: 1 });
  const e = run.events[0];
  // crude quadrature of the closed-form time to r = 1.999
  let t = 0; const N = 2e6; for (let k = 0; k < N; k++) { const r = 1 + (0.999) * (k + 0.5) / N; t += Math.sqrt((2 - r) / (4 - 1.44 * r)) * 0.999 / N; }
  console.log('B11 sigma=+1 r0=1 rdot=+1.6 (C=1.44): reached r=1.999 at t=', e.t, 'rdot=', e.y[1], '| level formula rdot=', Math.sqrt((4 - 1.44 * 1.999) / (2 - 1.999)), '| midpoint-rule time', t);
}
// B9: sigma=+1 inside r_c, receding, C>2: r0=1, rdot=+0.5 -> C = 0.25*(-1)+4 = 3.75, turn at 4/C = 1.0667 then contact
{
  const run = reducedOdeEvolve(W(1), { r: 1, rdot: 0.5, h: 0 }, { dt: 1e-5, maxSteps: 5e6, event: (y) => y[1], maxEvents: 1 });
  console.log('B9 sigma=+1 r0=1 rdot=+0.5 (C=3.75): turning event at r=', run.events[0].y[0], 'expected 4/3.75 =', 4 / 3.75, 't=', run.events[0].t);
}
// A4: sigma=-1 receding with C=0: r0=1, rdot=sqrt(4/3) -> escapes, rdot^2 = 4/(r+2); time 1->10 = ((12)^{1.5}-(3)^{1.5})/3
{
  const run = reducedOdeEvolve(W(-1), { r: 1, rdot: Math.sqrt(4 / 3), h: 0 }, { dt: 1e-4, maxSteps: 5e6, event: (y) => y[0] - 10, maxEvents: 1 });
  const e = run.events[0];
  console.log('A4 sigma=-1 r0=1 C=0: reached r=10 at t=', e.t, 'closed form', (12 ** 1.5 - 3 ** 1.5) / 3, 'rdot=', e.y[1], 'level', Math.sqrt(4 / 12));
}
// A7: sigma=-1 receding with C>2: r0=1, rdot=+1.5 -> C = 2.25*3 - 4 = 2.75: speed increases toward sqrt(2.75)
{
  const run = reducedOdeEvolve(W(-1), { r: 1, rdot: 1.5, h: 0 }, { dt: 1e-4, maxSteps: 5e6, event: (y) => y[0] - 50, maxEvents: 1 });
  console.log('A7 sigma=-1 r0=1 rdot=1.5 (C=2.75): at r=50 rdot=', run.events[0].y[1], ' level formula', Math.sqrt((2.75 * 50 + 4) / 52), ' asymptote', Math.sqrt(2.75), ' (started at 1.5: increasing)');
}
// B7: sigma=+1 outside r_c receding with C>2: r0=3, rdot=+2 -> C = 4*(1/3)+4/3 = 8/3 : speed decreases toward sqrt(8/3)=1.633
{
  const run = reducedOdeEvolve(W(1), { r: 3, rdot: 2, h: 0 }, { dt: 1e-4, maxSteps: 5e6, event: (y) => y[0] - 50, maxEvents: 1 });
  console.log('B7 sigma=+1 r0=3 rdot=+2 (C=8/3): at r=50 rdot=', run.events[0].y[1], ' level formula', Math.sqrt(((8 / 3) * 50 - 4) / 48), ' asymptote', Math.sqrt(8 / 3), ' (started at 2: decreasing, no turn)');
}
