#!/usr/bin/env node
// weber-binding-sphere-f0-sectors.mjs — the hexagon's rotating-frame spectrum resolved by sixfold character.
// The rotation by 60 degrees combined with the member shift k -> k+1 flips every polarity, so it is a symmetry of
// the law only when combined with the global polarity flip, which the law also has (sigma_ij = q_i q_j).  The
// linearized problem therefore decomposes into the real sectors k = 0, k = 3, k = 1 (+) 5 and k = 2 (+) 4 of the
// local-frame Fourier modes a_j = Re(A w^{jk}) (radial), b_j (tangential), c_j (axial), w = exp(2 pi i/6).
// Each sector's eigenvalues are those of the Jacobian projected on the sector's orthonormal basis; the projection
// leak measures the invariance.  Output: per radius, per sector, the eigenvalues and the largest real part.
import path from 'node:path';
import { COEFF, HEX_Q, HERE, params, utc, log, writeJson, hexagon, hexagonOmega, classifyEigenvalues } from './weber-binding-sphere-instrument.mjs';
import { jacobian, eigenvalues, rotatingDerivative, packState, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

const RECEIPT = path.join(HERE, 'weber-binding-sphere-f0-sectors.json');
const P = params(HEX_Q), rec = { subject: 'hexagon rotating-frame spectrum by sixfold character (local frames)', started: utc(), radii: [] };
function sectorBasis(k, real) {
  // real = 'cos' or 'sin' pattern across members for the pair of characters {k, 6-k}; k = 0 or 3 use cos only
  const vecs = [];
  for (const blk of [0, 18]) for (const comp of ['r', 't', 'z']) {
    const v = new Float64Array(36);
    for (let j = 0; j < 6; j++) {
      const th = j * Math.PI / 3, ph = 2 * Math.PI * j * k / 6, amp = real === 'cos' ? Math.cos(ph) : Math.sin(ph);
      const dir = comp === 'r' ? [Math.cos(th), Math.sin(th), 0] : comp === 't' ? [-Math.sin(th), Math.cos(th), 0] : [0, 0, 1];
      for (let c = 0; c < 3; c++) v[blk + 3 * j + c] = amp * dir[c];
    }
    let n = 0; for (const z of v) n += z * z; if (n > 1e-12) { for (let i = 0; i < 36; i++) v[i] /= Math.sqrt(n); vecs.push(v); }
  }
  return vecs;
}
for (const rho of [0.3, 0.67265, 1, 3]) {
  const Om = hexagonOmega(rho), X = hexagon(rho), y = packState(X.map((x, i) => ({ x, v: [0, 0, 0], q: HEX_Q[i] })));
  const F = yy => rotatingDerivative(yy, P, [0, 0, Om]), { J, errEst } = jacobian(F, y, { step: 1e-4 });
  const row = { rho, Omega: Om, jacobianErrorEstimate: errEst, sectors: [] };
  for (const [name, ks] of [['k=0', [[0, 'cos']]], ['k=3', [[3, 'cos']]], ['k=1+5', [[1, 'cos'], [1, 'sin']]], ['k=2+4', [[2, 'cos'], [2, 'sin']]]]) {
    let S = []; for (const [k, re] of ks) S = S.concat(sectorBasis(k, re));
    const JS = S.map(s => { const out = new Float64Array(36); for (let i = 0; i < 36; i++) { let acc = 0; for (let j = 0; j < 36; j++) acc += J[i][j] * s[j]; out[i] = acc; } return out; });
    const n = S.length, Jr = Array.from({ length: n }, () => new Array(n).fill(0)); let leak = 0;
    for (let a = 0; a < n; a++) { const proj = new Float64Array(36); for (let b = 0; b < n; b++) { let d = 0; for (let i = 0; i < 36; i++) d += S[b][i] * JS[a][i]; Jr[b][a] = d; for (let i = 0; i < 36; i++) proj[i] += d * S[b][i]; } for (let i = 0; i < 36; i++) leak = Math.max(leak, Math.abs(JS[a][i] - proj[i])); }
    const eig = eigenvalues(Jr).sort((u, v) => u.im - v.im || u.re - v.re), cls = classifyEigenvalues(eig, Om);
    const inPlane = eig.filter(z => true); // axial/in-plane split is reported through the full-spectrum tables; here the sector as a whole
    row.sectors.push({ name, dimension: n, invarianceLeak: leak, eigenvalues: eig, classes: cls, maxRealPartOverOmega: cls.growthOverOmega });
    log(`rho=${rho} ${name} (dim ${n}, leak ${leak.toExponential(1)}): max Re/Omega ${cls.growthOverOmega.toFixed(5)}; ${eig.map(z => z.re.toFixed(4) + (z.im >= 0 ? '+' : '') + z.im.toFixed(4) + 'i').join(' ')}`);
  }
  rec.radii.push(row);
}
rec.finished = utc();
writeJson(RECEIPT, rec);
log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}`);
