// PI check of the identity  d^2/dT^2 [ I - sum_{i<j} sigma_ij d_ij ] = (1/2) sum |V|^2 + H
// with I = (1/2) sum |X_i|^2 and H = (1/2) sum|V|^2 + sum (sigma/d)(1 - ddot^2/2), K=c_f=1,
// evaluated algebraically at random six-member states using the validated overnight instrument.
import { makeParams, packState, solveAccelerations, pairKinematics } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';
let seed = 20261005; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const q = [1, -1, 1, -1, 1, -1];
const P = makeParams({ q, lambda: -0.5, mu: 1, K: 1, cf: 1 });
let worst = 0;
for (let trial = 0; trial < 200; trial++) {
  const members = q.map(qq => ({ x: [rnd()*4-2, rnd()*4-2, rnd()*4-2], v: [rnd()*2-1, rnd()*2-1, rnd()*2-1], q: qq }));
  const y = packState(members); const N = 6;
  const sol = solveAccelerations(y, P); const A = sol.A ?? sol.a ?? sol;
  let T = 0, H = 0, XA = 0, Sdd = 0;
  for (let i = 0; i < N; i++) { for (let a = 0; a < 3; a++) { T += 0.5 * y[3*N+3*i+a]**2; XA += y[3*i+a] * A[3*i+a]; } }
  H += T;
  for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) {
    const { r, e, rdot, wperp2 } = pairKinematics(y, N, i, j);
    const s = P.sigma[i*N+j];
    H += s / r * (1 - rdot*rdot/2);
    const rdd = e[0]*(A[3*i]-A[3*j]) + e[1]*(A[3*i+1]-A[3*j+1]) + e[2]*(A[3*i+2]-A[3*j+2]) + wperp2 / r;
    Sdd += s * rdd;
  }
  const lhs = 2*T + XA - Sdd;   // Iddot - sum sigma ddot(d)
  const rhs = T + H;
  worst = Math.max(worst, Math.abs(lhs - rhs) / Math.max(1, Math.abs(rhs)));
}
console.log('identity Gddot = T + H : worst relative residual over 200 random states =', worst);
// hexagon balance check (PI pre-computation c6 = 5/4 - 1/sqrt3)
const c6 = 1.25 - 1/Math.sqrt(3);
for (const rho of [0.3, 1, 3]) {
  const Om = Math.sqrt(c6 / rho**3);
  const mem = []; for (let k = 0; k < 6; k++) { const th = k*Math.PI/3; mem.push({ x: [rho*Math.cos(th), rho*Math.sin(th), 0], v: [-Om*rho*Math.sin(th), Om*rho*Math.cos(th), 0], q: (k%2===0)?1:-1 }); }
  const y = packState(mem); const sol = solveAccelerations(y, P); const A = sol.A ?? sol.a ?? sol;
  let res = 0; for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) res = Math.max(res, Math.abs(A[3*i+a] + Om*Om*y[3*i+a]));
  console.log('hexagon rho', rho, 'Omega^2', Om*Om, 'max|A+Om^2 X|/(Om^2 rho)', res/(Om*Om*rho), 'det', sol.det ?? sol.logAbsDet ?? '');
}
