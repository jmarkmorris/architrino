#!/usr/bin/env node
// weber-binding-sphere-f0-c3.mjs — the hexagon's rotating-frame spectrum restricted to the C3-symmetric subspace.
// The C3 operation is the rotation by 120 degrees about z combined with the member shift k -> k+2 (same polarity).
// Its fixed subspace is 12-dimensional: the states of members 0 and 1 determine members 2..5.  The F3 shooting
// stratum 'c3' lives in this subspace, so its stability is what decides whether the shooting can hold the hexagon.
// The restricted Jacobian is S^T J S with S the orthonormal basis of the fixed subspace (J commutes with the
// symmetry, so the subspace is invariant).  Also computed: the complementary (symmetry-breaking) spectrum.
import path from 'node:path';
import { COEFF, HEX_Q, HERE, params, utc, log, writeJson, hexagon, hexagonOmega, classifyEigenvalues } from './weber-binding-sphere-instrument.mjs';
import { jacobian, eigenvalues, rotatingDerivative, packState, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

const RECEIPT = path.join(HERE, 'weber-binding-sphere-f0-c3.json');
const P = params(HEX_Q), rec = { subject: 'hexagon rotating-frame spectrum restricted to the C3-symmetric subspace', started: utc(), radii: [] };
const rotz = (a, v) => [Math.cos(a) * v[0] - Math.sin(a) * v[1], Math.sin(a) * v[0] + Math.cos(a) * v[1], v[2]];
for (const rho of [0.3, 0.67265, 1, 3]) {
  const Om = hexagonOmega(rho), X = hexagon(rho), y = packState(X.map((x, i) => ({ x, v: [0, 0, 0], q: HEX_Q[i] })));
  const F = yy => rotatingDerivative(yy, P, [0, 0, Om]), { J, errEst } = jacobian(F, y, { step: 1e-4 });
  // basis of the fixed subspace: for each of members 0,1 and each of position/velocity and each component a,
  // the vector with unit entry at member m (= 0 or 1) component a and its rotated copies at members m+2, m+4
  const S = [];
  for (const blk of [0, 18]) for (const m of [0, 1]) for (let a = 0; a < 3; a++) {
    const vec = new Float64Array(36); const e = [0, 0, 0]; e[a] = 1;
    for (let k = 0; k < 3; k++) { const r = rotz(2 * Math.PI * k / 3, e); for (let c = 0; c < 3; c++) vec[blk + 3 * (m + 2 * k) + c] = r[c] / Math.sqrt(3); }
    S.push(vec);
  }
  // invariance check: J S lies in span(S)
  const JS = S.map(s => { const out = new Float64Array(36); for (let i = 0; i < 36; i++) { let acc = 0; for (let j = 0; j < 36; j++) acc += J[i][j] * s[j]; out[i] = acc; } return out; });
  let leak = 0; const Jr = S.map(() => new Float64Array(12));
  for (let a = 0; a < 12; a++) { const proj = new Float64Array(36); for (let b = 0; b < 12; b++) { let d = 0; for (let i = 0; i < 36; i++) d += S[b][i] * JS[a][i]; Jr[b][a] = d; for (let i = 0; i < 36; i++) proj[i] += d * S[b][i]; } for (let i = 0; i < 36; i++) leak = Math.max(leak, Math.abs(JS[a][i] - proj[i])); }
  const eig = eigenvalues(Jr.map(r => Array.from(r))).sort((u, v) => u.im - v.im || u.re - v.re);
  const cls = classifyEigenvalues(eig, Om);
  rec.radii.push({ rho, Omega: Om, jacobianErrorEstimate: errEst, invarianceLeak: leak, c3Sector: { eigenvalues: eig, classes: cls, maxRealPart: cls.maxRealPart, growthOverOmega: cls.growthOverOmega } });
  log(`rho=${rho}: C3-sector spectrum max Re/Omega = ${cls.growthOverOmega.toFixed(6)} (leak ${leak.toExponential(1)}); eigenvalues ${eig.map(z => z.re.toFixed(5) + (z.im >= 0 ? '+' : '') + z.im.toFixed(5) + 'i').join(' ')}`);
}
rec.finished = utc();
writeJson(RECEIPT, rec);
log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}`);
