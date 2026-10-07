// Kernel of the collocation Jacobian at the hexagon (unconstrained stratum): eigenvalues of J^T J and the harmonic/axis content of the null vectors.
// Usage: node weber-binding-sphere-mc-hexagon-kernel.mjs <M> <stage>
import * as L from './weber-binding-sphere-mc-lib.mjs';
function jacobiEig(A, n) { const a = Float64Array.from(A), V = new Float64Array(n * n); for (let i = 0; i < n; i++) V[i * n + i] = 1;
  for (let sweep = 0; sweep < 60; sweep++) { let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i * n + j] ** 2; if (off < 1e-40) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) { const apq = a[p * n + q]; if (Math.abs(apq) < 1e-300) continue; const th = (a[q * n + q] - a[p * n + p]) / (2 * apq), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = a[k * n + p], akq = a[k * n + q]; a[k * n + p] = c * akp - s * akq; a[k * n + q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = a[p * n + k], aqk = a[q * n + k]; a[p * n + k] = c * apk - s * aqk; a[q * n + k] = s * apk + c * aqk; }
      for (let k = 0; k < n; k++) { const vkp = V[k * n + p], vkq = V[k * n + q]; V[k * n + p] = c * vkp - s * vkq; V[k * n + q] = s * vkp + c * vkq; } } }
  return { w: Array.from({ length: n }, (_, i) => a[i * n + i]), V }; }
const M = Number(process.argv[2] ?? 3), stage = Number(process.argv[3] ?? 1), R = 1, B = L.stratumBasis(6, M), prob = L.makeProblem({ q: L.Q6, M, Nc: 4 * M + 4, R, stage, B, norm: 'meanRadius' });
const p = new Float64Array(prob.np), c = L.hexagonCoefficients(M, R); p.set(L.toReduced(B, c)); p[prob.iOmega] = L.hexagonOmega(R); if (stage === 2) p[prob.iV] = L.hexagonOmega(R);
const e = prob.evaluate(p, true), np = prob.np, N = new Float64Array(np * np);
for (let i = 0; i < prob.nrows; i++) for (let a = 0; a < np; a++) { const ja = e.J[i * np + a]; if (ja) for (let b = 0; b < np; b++) N[a * np + b] += ja * e.J[i * np + b]; }
const { w, V } = jacobiEig(N, np), order = w.map((x, i) => [x, i]).sort((x, y) => x[0] - y[0]);
console.log('stage', stage, 'M', M, 'np', np, 'smallest eigenvalues of J^T J:', order.slice(0, 12).map(x => x[0].toExponential(2)).join(' '));
// describe null vectors beyond gauge: project out gauge tangents, report harmonic/axis content
const gauges = L.gaugeTangents(c, 6, M).map(t => L.toReduced(B, t));
for (const [val, i] of order.slice(0, 8)) { if (val > 1e-10) break; const vec = Float64Array.from({ length: prob.nred }, (_, k) => V[k * np + i]); const full = L.toFull(B, vec);
  let gproj = 0; for (const g of gauges) { let d = 0, nn = 0; for (let k = 0; k < prob.nred; k++) { d += g[k] * vec[k]; nn += g[k] * g[k]; } gproj += d * d / nn; }
  const content = {}; for (let ii = 0; ii < 6; ii++) for (let s = 0; s < L.nBasis(M); s++) for (let a = 0; a < 3; a++) { const key = `m${Math.ceil(s / 2)}${'xyz'[a]}`; content[key] = (content[key] ?? 0) + full[L.idx(M, ii, s, a)] ** 2; }
  console.log('eig', val.toExponential(2), 'gaugeFraction', gproj.toFixed(3), 'omegaComp', V[prob.iOmega * np + i].toFixed(3), Object.entries(content).filter(([, v]) => v > 1e-4).map(([k, v]) => k + ':' + v.toFixed(3)).join(' ')); }
