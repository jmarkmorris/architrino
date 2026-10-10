// Claude's independent first-front census for the two-target lattice history. Exact integer arithmetic; imports nothing.
// Pulse centres E = {(0,0,0),(1,0,0)}; pulse emitted from time -11/8; an environmental label p can first change at sqrt(m_p) - 11/8,
// where m_p = min{|p-e|^2 : e in E, |p-e|^2 >= 2}. Count labels p not in E with m_p <= floor((H + 11/8)^2), i.e. sqrt(m_p) <= H + 11/8.
function count(numer, denom) { // H + 11/8 = numer/denom exactly; condition m * denom^2 <= numer^2
  const lim2n = BigInt(numer) * BigInt(numer), d2 = BigInt(denom) * BigInt(denom); let c = 0; const R = Math.ceil(numer / denom) + 2;
  for (let x = -R; x <= R + 1; x++) for (let y = -R; y <= R; y++) for (let z = -R; z <= R; z++) {
    if (y === 0 && z === 0 && (x === 0 || x === 1)) continue;
    const a = x * x + y * y + z * z, b = (x - 1) * (x - 1) + y * y + z * z; let m = Infinity; if (a >= 2) m = Math.min(m, a); if (b >= 2) m = Math.min(m, b);
    if (BigInt(m) * d2 <= lim2n) c++;
  } return c;
}
// known case first, by hand: H = 17/16 - nothing... use a hand-countable horizon: sqrt(m) <= sqrt(2), i.e. m <= 2.
// Labels with m_p = 2: face-diagonal neighbours of either centre, excluding the centres themselves; unit neighbours of one centre
// that are at squared distance >= 2 from the other also count if that distance is 2. By hand: 12 + 12 - (shared ones) ...
// simpler exact control: brute-force with a different formulation (floating sqrt with a margin) must agree at every horizon below.
function countFloat(H) { let c = 0; const lim = H + 11 / 8; const R = Math.ceil(lim) + 2;
  for (let x = -R; x <= R + 1; x++) for (let y = -R; y <= R; y++) for (let z = -R; z <= R; z++) {
    if (y === 0 && z === 0 && (x === 0 || x === 1)) continue; let m = Infinity;
    for (const ex of [0, 1]) { const d = (x - ex) ** 2 + y * y + z * z; if (d >= 2) m = Math.min(m, d); }
    if (Math.sqrt(m) <= lim + 1e-12) c++; } return c; }
// hand control: horizon with H + 11/8 = sqrt-free value 1.5 => m <= 2 (m=2 only). Around one centre there are 12 sites at squared
// distance 2; the two families overlap in the 4 sites (0,+-1,... no: |p|^2=2 and |p-e1|^2=2 needs x=1/2, impossible) => no overlap,
// but sites at squared distance 2 from one centre and 1 from the other are still counted (their m is 2). Total 24.
{ const c1 = count(3, 2), c2 = countFloat(1.5 - 11 / 8); const ok = c1 === 24 && c2 === 24; console.log(`hand control m<=2 (expect 24): ${c1} ${c2} ${ok ? 'PASS' : 'FAIL'}`); if (!ok) { console.log('control failed; targets not run'); process.exit(1); } }
const rows = [['2', 2, 1, 206], ['9/4', 9, 4, 246], ['13/4', 13, 4, 504], ['15/4', 15, 4, 674], ['17/4', 17, 4, 834], ['19/4', 19, 4, 1068], ['5', 5, 1, 1172], ['81/16', 81, 16, 1276], ['11/2', 11, 2, 1500]];
for (const [label, n, d, expectEnv] of rows) { const numer = 8 * n + 11 * d, denom = 8 * d; const c = count(numer, denom); console.log(`H=${label}: environmental labels ${c} (float route ${countFloat(n / d)}), source states ${expectEnv} environmental + 2 targets = ${expectEnv + 2}: ${c === expectEnv ? 'MATCH' : 'differs by ' + (c - expectEnv)}`); }
// source ceiling 4.92 = 123/25: first-front labels (source says 1142 labels, targets included)
console.log('source ceiling 123/25:', count(8 * 123 + 11 * 25, 8 * 25), '+ 2 targets =', count(8 * 123 + 11 * 25, 8 * 25) + 2, '(source: 1142)');
