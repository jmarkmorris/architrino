// Compare reduced (E, ell) used by the predictions script with the full E and J_z of the six-dimensional functional at the launch states.
import { lagrangian, hessianH, circle } from '../../../reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-reduction-predictions.mjs';
import fs from 'node:fs';
const pred = JSON.parse(fs.readFileSync('/sessions/upbeat-blissful-allen/mnt/architrino/.tmp/darwin-overnight/reduction/predictions-output.json', 'utf8'));
function fullEJ(X, V, s) {
  const sigma = () => s; const v = V.flat(); const H = hessianH(X, sigma); const p = H.map((row) => row.reduce((a, h, j) => a + h * v[j], 0));
  const E = p.reduce((a, pi, i) => a + pi * v[i], 0) - lagrangian(X, V, sigma);
  const Jz = X.reduce((a, xi, i) => a + xi[0] * p[3 * i + 1] - xi[1] * p[3 * i], 0);
  return { E, Jz };
}
const out = {};
{ const u = pred.b_eccentric.individualSpeed; const r = fullEJ([[50, 0, 0], [-50, 0, 0]], [[0, u, 0], [0, -u, 0]], -1);
  out.b = { fullE: r.E, reducedE: pred.b_eccentric.energyLike, fullJz: r.Jz, reducedEll: pred.b_eccentric.angularMomentum }; }
{ const r = fullEJ([[50, 0, 0], [-50, 0, 0]], [[-0.05, 0, 0], [0.05, 0, 0]], 1); out.e = { fullE: r.E, reducedE: pred.e_headOnSame.energyLike }; }
{ const r = fullEJ([[50, 0, 0], [-50, 0, 0]], [[-0.02, 0, 0], [0.02, 0, 0]], -1); out.f = { fullE: r.E, reducedE: pred.f_headOnOpposite.energyLike }; }
{ const c = circle(100, true); const u = c.individualSpeed; const r = fullEJ([[50, 0, 0], [-50, 0, 0]], [[0, u, 0], [0, -u, 0]], -1);
  out.circle100 = { fullE: r.E, closedE: c.energyLike, fullJz: r.Jz, closedEll: c.angularMomentum }; }
console.log(JSON.stringify(out, null, 1));
