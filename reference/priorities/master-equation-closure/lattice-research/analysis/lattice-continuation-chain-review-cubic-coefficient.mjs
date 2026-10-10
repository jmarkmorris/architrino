// Claude's check of the stationary-field cubic coefficient a in S_0(y) = a (y_i^3 - (3/2) y_i sum_{j!=i} y_j^2) + R(y)
// for the alternating unit cubic lattice with coupling g = 16. Imports nothing. Float arithmetic; a truncated sum, not an enclosure.
// Field on a receiver of polarity + displaced by y from anchor 0, from static sources at n != 0 with polarity (-1)^(n1+n2+n3):
// acceleration = g * sigma_n * (y - n)/|y - n|^3  (like polarities repel).
function field(y, N, g, sites) {
  let F = [0, 0, 0];
  const add = (n, s) => { const d = [y[0] - n[0], y[1] - n[1], y[2] - n[2]]; const r = Math.hypot(...d); const k = g * s / (r * r * r); F[0] += k * d[0]; F[1] += k * d[1]; F[2] += k * d[2]; };
  if (sites) { for (const [n, s] of sites) add(n, s); return F; }
  for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) for (let k = -N; k <= N; k++) { if (!i && !j && !k) continue; add([i, j, k], ((i + j + k) & 1) ? -1 : 1); }
  return F;
}
// known case first: two like sources at (+-1,0,0), g=1: F_x(eps,0,0) = -4 eps/(1-eps^2)^2 exactly
let ok = true;
for (const e of [0.01, 0.1]) { const F = field([e, 0, 0], 0, 1, [[[1, 0, 0], 1], [[-1, 0, 0], 1]]); const exact = -4 * e / (1 - e * e) ** 2; const pass = Math.abs(F[0] - exact) < 1e-13; console.log(`control eps=${e}: ${F[0]} exact ${exact} ${pass ? 'PASS' : 'FAIL'}`); ok = ok && pass; }
if (!ok) process.exit(1);
// second control: the field vanishes at the anchor by inversion symmetry
{ const F0 = field([0, 0, 0], 6, 16); const ok0 = F0.every(x => Math.abs(x) < 1e-12); console.log(`control: field at anchor, N=6: ${F0.map(x => x.toExponential(2)).join(' ')} ${ok0 ? 'PASS' : 'FAIL'}`); if (!ok0) { console.log('control failed; targets not run'); process.exit(1); } }
// target: a from F_x(eps,0,0) = a eps^3 + c5 eps^5 + ...; Richardson in eps removes the eps^5 term
for (const N of [8, 12, 16, 24]) {
  const A = e => field([e, 0, 0], N, 16)[0] / e ** 3;
  const a1 = A(0.04), a2 = A(0.02), a = (4 * a2 - a1) / 3;
  // the mixed term: F_x(eps,eps,0) should equal a (eps^3 - 1.5 eps^3) = -a eps^3/2
  const e = 0.02, Fm = field([e, e, 0], N, 16)[0] / e ** 3, Fm2 = field([2 * e, 2 * e, 0], N, 16)[0] / (2 * e) ** 3;
  console.log(`N=${N}: a(0.04)=${a1.toFixed(6)} a(0.02)=${a2.toFixed(6)} extrapolated a=${a.toFixed(6)} | F_x(e,e,0)/e^3 extrapolated=${((4 * Fm - Fm2) / 3).toFixed(6)} expected -a/2=${(-a / 2).toFixed(6)}`);
}
