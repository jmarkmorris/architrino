#!/usr/bin/env node
// Spherical curvature coverage instrument (wave 10 copy of the frozen wave-9 instrument: identical code except the CELLS list and output file names). Owner: coverage specialist, exclusive prefix
// spherical-curvature-claude-coverage-*. Single-threaded, foreground, no evolution integrator.
//
// Law: canonical per-hit acceleration A_ij = K*sigma*r^-2*(c_f/|D_t|)*rhat summed over every admitted
// causal root of every transmitter (including positive-delay self roots). Selected surface motion
// X'' = P A - (|v|^2/R) n. The radial interaction component n.A is DISCARDED and only reported.
// c_f = 1, K = 1. Prescribed histories are input, never motion.
//
// Usage: node spherical-curvature-claude-coverage-instrument.mjs controls|cells|all [outdir]

import fs from "node:fs";
import path from "node:path";

const CF = 1.0;
const K_DEFAULT = 1.0;

// ---------- vector helpers ----------
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.sqrt(dot(a, a));
const unit = (a) => { const n = norm(a); if (n === 0) throw new Error("zero vector"); return scale(a, 1 / n); };
const projT = (n, a) => sub(a, scale(n, dot(n, a))); // tangent projection P_n a
const rotAbout = (axis, ang, x) => { // Rodrigues rotation of x about unit axis
  const c = Math.cos(ang), s = Math.sin(ang);
  return add(add(scale(x, c), scale(cross(axis, x), s)), scale(axis, dot(axis, x) * (1 - c)));
};

// ---------- history families ----------
// s = T c_f / R. theta(s) is the great-circle angle from the release position along t0.
// H1: theta = 0 for s <= -1/4; theta = nu * s (1+4s)^3 for -1/4 <= s <= 0; prescribed extension nu*s for s > 0 (diagnostic only).
// H2: theta = nu * s for all s (uniform great circle, prescribed).
function theta(family, nu, s, cubic = 0, quad = 0, L = 0.25, badRelease = 1) {
  if (family === "H1L") {
    if (s <= -L) return { th: 0, dth: 0, ddth: 0 };
    if (s >= 0) return { th: nu * badRelease * s, dth: nu * badRelease, ddth: 0 };
    const u = 1 + s / L;
    return { th: nu * badRelease * s * u ** 3, dth: nu * badRelease * u * u * (4 * u - 3), ddth: nu * badRelease * (12 * u * u - 6 * u) / L };   // corrected in wave 5: theta'' = nu (12u^2 - 6u)/L, release value 6 nu / L (the wave-4 code had a spurious factor 4)
  }
  if (family === "H2") return { th: nu * s, dth: nu, ddth: 0 };
  if (family === "H1X") { // H1 past, prescribed cubic-speed extension theta = nu s + cubic s^3 for s > 0 (diagnostic input only)
    if (s >= 0) return { th: nu * s + quad * s * s + cubic * s ** 3, dth: nu + 2 * quad * s + 3 * cubic * s * s, ddth: 2 * quad + 6 * cubic * s };
    return theta("H1", nu, s);
  }
  if (family === "H1") {
    if (s <= -0.25) return { th: 0, dth: 0, ddth: 0 };
    if (s >= 0) return { th: nu * s, dth: nu, ddth: 0 }; // prescribed extension, diagnostic only
    const u = 1 + 4 * s;
    return { th: nu * (u ** 4 - u ** 3) / 4, dth: nu * u * u * (4 * u - 3), ddth: 4 * nu * (12 * u * u - 6 * u) };
  }
  throw new Error("unknown family " + family);
}
// member: {q, n0, t0, nu (release speed / c_f), family}
function hist(m, T, R) {
  const s = T * CF / R;
  if (m.family === "RIGID") { const X = scale(rotAbout(m.rigidAxis, m.omega * s, m.n0), R); const V = scale(cross(m.rigidAxis, X), CF * m.omega / R); return { X, V, speed: norm(V) }; }
  const { th, dth } = theta(m.family, m.nu, s, m.cubic || 0, m.quad || 0, m.L || 0.25, m.badRelease || 1);
  const c = Math.cos(th), si = Math.sin(th);
  const X = scale(add(scale(m.n0, c), scale(m.t0, si)), R);
  const V = scale(add(scale(m.n0, -si), scale(m.t0, c)), CF * dth);
  return { X, V, speed: Math.abs(CF * dth) };
}

// ---------- preparation validator ----------
function validatePreparation(m, R, opts = {}) {
  const out = { checks: [], pass: true };
  const rec = (name, ok, detail) => { out.checks.push({ name, ok, detail }); if (!ok) out.pass = false; };
  rec("release tangent orthogonal to position", Math.abs(dot(m.n0, m.t0)) < 1e-12, dot(m.n0, m.t0));
  rec("unit n0", Math.abs(norm(m.n0) - 1) < 1e-12, norm(m.n0));
  rec("unit t0", Math.abs(norm(m.t0) - 1) < 1e-12, norm(m.t0));
  let maxRadial = 0, maxNormErr = 0;
  for (let k = 0; k <= 200; k++) {
    const s = -0.5 + 0.6 * k / 200; const T = s * R / CF;
    const { X, V } = hist(m, T, R);
    maxNormErr = Math.max(maxNormErr, Math.abs(norm(X) - R));
    maxRadial = Math.max(maxRadial, Math.abs(dot(X, V)) / R);
  }
  rec("|X| = R on samples s in [-0.5, 0.1]", maxNormErr < 1e-12, maxNormErr);
  rec("velocity tangent (|n.V|) on samples", maxRadial < 1e-12, maxRadial);
  const rel = hist(m, 0, R);
  rec("release velocity = v t0", norm(sub(rel.V, scale(m.t0, m.nu * CF))) < 1e-12, rel.V);
  if (m.family === "RIGID") {
    const h0 = hist(m, 0, R); const expected = scale(cross(m.rigidAxis, scale(m.n0, R)), CF * m.omega / R);
    rec("rigid rotation: release velocity = omega axis x X", norm(sub(h0.V, expected)) < 1e-12, h0.V);
    rec("rigid rotation: speed = omega sin(angle to axis) * c_f", Math.abs(h0.speed - CF * m.omega * Math.sqrt(1 - dot(m.rigidAxis, m.n0) ** 2)) < 1e-12, h0.speed);
  }
  if (m.family === "H1L") {
    const L = m.L || 0.25; const mid = hist(m, -0.5 * L * R / CF, R);
    rec("nonzero displacement inside preparation (s=-L/2)", norm(sub(mid.X, scale(m.n0, R))) > 1e-6 * R * Math.abs(m.nu), norm(sub(mid.X, scale(m.n0, R))));
    const seam = theta("H1L", m.nu, -L + 1e-9, 0, 0, L);
    rec("C^2 seam at s=-L (theta, theta', theta'' -> 0)", Math.abs(seam.th) < 1e-15 && Math.abs(seam.dth) < 1e-12 && Math.abs(seam.ddth) < 1e-6, seam);
  }
  if (m.family === "H1" || m.family === "H1X") {
    const mid = hist(m, -0.125 * R / CF, R);
    rec("nonzero displacement inside preparation (s=-1/8)", m.nu === 0 || norm(sub(mid.X, scale(m.n0, R))) > 1e-6 * R * Math.abs(m.nu), norm(sub(mid.X, scale(m.n0, R))));
    const seam = theta("H1", m.nu, -0.25 + 1e-9);
    rec("C^2 seam at s=-1/4 (theta, theta', theta'' -> 0)", Math.abs(seam.th) < 1e-15 && Math.abs(seam.dth) < 1e-12 && Math.abs(seam.ddth) < 1e-6, seam);
    // finite-difference check of the stated speed profile: numeric derivative of theta vs dth
    let maxD = 0;
    for (let k = 1; k < 100; k++) { const s = -0.25 + 0.25 * k / 100, h = 1e-6;
      const num = (theta("H1", m.nu, s + h).th - theta("H1", m.nu, s - h).th) / (2 * h);
      maxD = Math.max(maxD, Math.abs(num - theta("H1", m.nu, s).dth)); }
    rec("theta' matches finite difference of theta", maxD < 1e-7, maxD);
  }
  return out;
}

// ---------- root census ----------
// f(tau) = tau - |X_i(T) - X_j(T - tau)| / c_f on (0, tauMax]. Fine scan + bisection.
function rootCensus(members, i, j, T, R, opts = {}) {
  const N = opts.scanN ?? 20000;
  const margin = opts.margin ?? 0.5 * R;
  const tauMax = 2 * R / CF + margin;
  const tauMin = i === j ? (opts.selfEps ?? 1e-3 * R) : 1e-12; // self: (0, 1e-3 R] is covered analytically (chord < arc <= c_f tau for speed <= c_f), see selfRootExclusion
  const Xi = hist(members[i], T, R).X;
  const f = (tau) => tau - norm(sub(Xi, hist(members[j], T - tau, R).X)) / CF;
  const roots = [];
  let prevTau = tauMin, prevF = f(tauMin);
  let minAbsF = Math.abs(prevF);
  for (let k = 1; k <= N; k++) {
    const tau = tauMin + (tauMax - tauMin) * k / N;
    const fv = f(tau);
    minAbsF = Math.min(minAbsF, Math.abs(fv));
    if (fv === 0) { roots.push(tau); }
    else if (prevF < 0 && fv > 0 || prevF > 0 && fv < 0) {
      let a = prevTau, b = tau, fa = prevF;
      for (let it = 0; it < 200; it++) { const m = 0.5 * (a + b); const fm = f(m); if (fm === 0) { a = b = m; break; } if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else { b = m; } if (b - a < 1e-15) break; }
      roots.push(0.5 * (a + b));
    }
    prevTau = tau; prevF = fv;
  }
  if (opts.omitLast && roots.length) roots.pop(); // negative control only
  const hits = roots.map((tau) => {
    const Tt = T - tau;
    const hj = hist(members[j], Tt, R);
    const rvec = sub(Xi, hj.X); const r = norm(rvec); const rhat = scale(rvec, 1 / r);
    const Dt = CF - dot(hj.V, rhat);
    const sigma = Math.sign(members[i].q * members[j].q);
    const Kij = opts.K ?? K_DEFAULT;
    const mag = Kij * sigma / (r * r) * (CF / Math.abs(Dt));
    return { tau, Tt, r, Dt, sigma, speedT: hj.speed, A: scale(rhat, mag), residual: f(tau) };
  });
  return { i, j, count: roots.length, hits, minAbsF, tauMax, tauMin, scanN: N, selfRootExclusion: i === j ? "derived: on the sphere the chord |X(T)-X(T-tau)| is strictly less than the arc length, which is <= v_max tau <= c_f tau for prescribed speed <= c_f; hence no positive-delay self root exists for v <= c_f; the scan on [tauMin, tauMax] is a consistency check only" : undefined };
}

function receiverState(members, i, T, R, opts = {}) {
  const h = hist(members[i], T, R);
  const n = scale(h.X, 1 / R);
  let A = [0, 0, 0]; const pairs = [];
  let minDt = Infinity; let maxSpeedT = 0; let selfRoots = 0; let totalRoots = 0;
  for (let j = 0; j < members.length; j++) {
    const c = rootCensus(members, i, j, T, R, opts.omitPair && opts.omitPair[0] === i && opts.omitPair[1] === j ? { ...opts, omitLast: true } : opts);
    for (const hit of c.hits) { A = add(A, hit.A); minDt = Math.min(minDt, Math.abs(hit.Dt)); maxSpeedT = Math.max(maxSpeedT, hit.speedT); }
    if (j === i) selfRoots += c.count; totalRoots += c.count;
    pairs.push({ j, count: c.count, hits: c.hits.map((x) => ({ tau: x.tau, r: x.r, Dt: x.Dt, sigma: x.sigma, speedT: x.speedT, residual: x.residual })), minAbsF: c.minAbsF });
  }
  const PA = projT(n, A); const nA = dot(n, A); const vA = dot(h.V, A);
  const dspeed = h.speed > 0 ? vA / h.speed : null;
  let rigidRequired = null, rigidResidual = null;
  if (members[i].family === "RIGID") { const ax = members[i].rigidAxis; const w = CF * members[i].omega / R; const acc = scale(sub(h.X, scale(ax, dot(ax, h.X))), -w * w); rigidRequired = projT(n, acc); rigidResidual = sub(PA, rigidRequired); }
  return { i, q: members[i].q, X: h.X, V: h.V, speed: h.speed, A, PA, nA, vA, dspeed, selfRoots, rigidRequired, rigidResidual, partnerRoots: totalRoots - selfRoots, minAbsDt: minDt, maxTransmitterSpeedAtRoots: maxSpeedT, pairs, geometricTerm: scale(n, -(h.speed ** 2) / R) };
}

// ---------- geometries ----------
const OMEGA = unit([1, 1, 1]);
const Z = [0, 0, 1];
function geometry(name, opts = {}) {
  if (name === "G1") return { axis: OMEGA, members: [
    { q: +1, n0: [1, 0, 0] }, { q: +1, n0: [0, 1, 0] }, { q: +1, n0: [0, 0, 1] },
    { q: -1, n0: [-1, 0, 0] }, { q: -1, n0: [0, -1, 0] }, { q: -1, n0: [0, 0, -1] }] };
  if (name === "G6") { const tw = (opts.twistDeg ?? 50) * Math.PI / 180; const ms = []; for (let k = 0; k < 3; k++) ms.push({ q: +1, n0: [Math.cos(2 * k * Math.PI / 3), Math.sin(2 * k * Math.PI / 3), 0] }); for (let k = 0; k < 3; k++) ms.push({ q: -1, n0: [Math.cos(tw + 2 * k * Math.PI / 3), Math.sin(tw + 2 * k * Math.PI / 3), 0] }); return { axis: Z, declared: `twisted planar hexagon, electrinos at twist ${opts.twistDeg ?? 50} degrees`, members: ms }; }
  if (name === "G2") return { axis: Z, members: Array.from({ length: 6 }, (_, k) => ({ q: k % 2 === 0 ? +1 : -1, n0: [Math.cos(k * Math.PI / 3), Math.sin(k * Math.PI / 3), 0] })) };
  if (name === "G3") { const a0 = Math.PI / 6; const u = [Math.cos(a0), 0, Math.sin(a0)]; const ms = [];
    for (let k = 0; k < 3; k++) { const p = rotAbout(Z, 2 * k * Math.PI / 3, u); ms.push({ q: +1, n0: p }); }
    for (let k = 0; k < 3; k++) { const p = rotAbout(Z, 2 * k * Math.PI / 3, u); ms.push({ q: -1, n0: scale(p, -1) }); }
    return { axis: Z, members: ms }; }
  if (name === "G4") { const g = geometry("G1"); const ang = (opts.deg ?? 5) * Math.PI / 180; g.members[0].n0 = rotAbout(Z, ang, g.members[0].n0); g.declared = `member 0 (+x positrino) rotated by ${opts.deg ?? 5} degrees about +z`; return g; }
  if (name === "G5") { const rng = mulberry32(opts.seed ?? 20261011); let attempts = 0; const minSep = (opts.minSep ?? 0.3);
    for (;;) { attempts++; const pts = []; for (let k = 0; k < 6; k++) pts.push(randomUnit(rng));
      let ok = true; for (let a = 0; a < 6 && ok; a++) for (let b = a + 1; b < 6; b++) if (norm(sub(pts[a], pts[b])) < minSep) { ok = false; break; }
      if (ok) return { axis: OMEGA, seed: opts.seed ?? 20261011, attempts, minSepRule: `reject any placement with chord separation < ${minSep} R`, members: pts.map((p, k) => ({ q: k < 3 ? +1 : -1, n0: p })) };
      if (attempts > 10000) throw new Error("G5 rejection sampling failed"); } }
  throw new Error("unknown geometry " + name);
}
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function randomUnit(rng) { for (;;) { const v = [2 * rng() - 1, 2 * rng() - 1, 2 * rng() - 1]; const n = norm(v); if (n > 1e-3 && n <= 1) return scale(v, 1 / n); } }

// ---------- velocity patterns (unit tangent directions t0) ----------
function velocityPattern(name, geom, opts = {}) {
  const ms = geom.members; const axis = geom.axis; const notes = [];
  const setT = (m, dir) => { const t = projT(m.n0, dir); if (norm(t) < 1e-3) throw new Error("zero tangent projection"); m.t0 = unit(t); };
  if (name === "V1") { notes.push(`common rotation about axis ${axis.map((x) => x.toFixed(6))}: t0 = unit(axis x n0)`); for (const m of ms) setT(m, cross(axis, m.n0)); }
  else if (name === "V2") { notes.push("pole-directed: t0 = unit(P_n e), e = sign(n.axis) axis (each member toward the axis pole on its own side; the two poles are opposite)"); for (const m of ms) { const sg = Math.sign(dot(m.n0, axis)) || 1; setT(m, scale(axis, sg)); } }
  else if (name === "V2R") { notes.push("reversed cap: t0 = unit(P_n e), e = -sign(n.axis) axis (each member toward the other polarity's cap; the negative of the six-pole plan pattern 2)"); for (const m of ms) { const sg = Math.sign(dot(m.n0, axis)) || 1; setT(m, scale(axis, -sg)); } }
  else if (name === "V4P") { notes.push("copied caps (reviewer V4'): own-cap V2 directions for the positrinos, copied without sign change to the antipodal electrinos; every member moves toward the positrino cap +w"); for (let k = 0; k < 3; k++) { const sg = Math.sign(dot(ms[k].n0, axis)) || 1; setT(ms[k], scale(axis, sg)); ms[k + 3].t0 = ms[k].t0; if (Math.abs(dot(ms[k + 3].n0, ms[k + 3].t0)) > 1e-12) throw new Error("V4P requires antipodal pairs"); } }
  else if (name === "V5R") { notes.push("reviewer V5 'toward own cap', interpreted here as the complement of V4P: every member toward the electrino cap -w (t0 = unit(P_n(-w)))"); for (const m of ms) setT(m, scale(axis, -1)); }
  else if (name === "V3") { notes.push("copied antipodal: V1 for members 0..2, then t0(-n) = t0(n) for the antipodes 3..5"); for (let k = 0; k < 3; k++) { setT(ms[k], cross(axis, ms[k].n0)); ms[k + 3].t0 = ms[k].t0; if (Math.abs(dot(ms[k + 3].n0, ms[k + 3].t0)) > 1e-12) throw new Error("V3 requires antipodal pairs"); } }
  else if (name === "V4") { notes.push("balanced counter-motion (declared, G1 only): opposite-polarity nearest-neighbour pairs (+x,-y), (+y,-z), (+z,-x) move toward each other along their shared quarter great circle; sum of velocities is zero");
    const pairs = [[0, 4], [1, 5], [2, 3]]; for (const [a, b] of pairs) { setT(ms[a], ms[b].n0); setT(ms[b], ms[a].n0); } }
  else if (name === "V5") { const deg = opts.deg ?? 10; notes.push(`V1 with member 0 direction rotated by ${deg} degrees about its own normal`); for (const m of ms) setT(m, cross(axis, m.n0)); ms[0].t0 = unit(rotAbout(ms[0].n0, deg * Math.PI / 180, ms[0].t0)); }
  else if (name === "V6") { const seed = opts.seed ?? 20261011; const rng = mulberry32(seed + 1); let rejected = 0; notes.push(`seeded random tangent directions, seed ${seed + 1} (mulberry32); a draw with |P_n r| < 1e-3 is rejected and redrawn`);
    for (const m of ms) { for (;;) { const r = randomUnit(rng); const t = projT(m.n0, r); if (norm(t) < 1e-3) { rejected++; continue; } m.t0 = unit(t); break; } } notes.push(`rejected draws: ${rejected}`); }
  else throw new Error("unknown pattern " + name);
  return notes;
}

// ---------- cell evaluation ----------
function buildCell(cell) {
  const geom = geometry(cell.G, cell.geomOpts || {});
  const notes = velocityPattern(cell.V, geom, cell.velOpts || {});
  for (const m of geom.members) { m.nu = cell.v / CF; m.family = cell.H; m.cubic = cell.cubic || 0; m.quad = cell.quad || 0; m.L = cell.L || 0.25; m.badRelease = cell.badRelease || 1; if (cell.H === "RIGID") { m.rigidAxis = unit(cell.rigidAxis); m.omega = cell.omega; m.t0 = unit(cross(m.rigidAxis, m.n0)); m.nu = norm(cross(m.rigidAxis, m.n0)) * cell.omega; } }
  return { geom, notes };
}
function evaluateCell(cell, opts = {}) {
  const { geom, notes } = buildCell(cell);
  const R = cell.R; const members = geom.members;
  const prep = members.map((m) => validatePreparation(m, R));
  const sampleS = cell.sampleS ?? [-0.2, -0.1, 0, 0.05, 0.1];
  const samples = [];
  for (const s of sampleS) {
    const T = s * R / CF;
    const recs = members.map((_, i) => receiverState(members, i, T, R, opts));
    const ds = recs.map((r) => r.dspeed);
    const dsValid = ds.filter((x) => x !== null);
    const spread = dsValid.length ? Math.max(...dsValid) - Math.min(...dsValid) : null;
    const scaleRef = Math.max(1, ...recs.map((r) => norm(r.A)), ...dsValid.map(Math.abs));
    const partnerCounts = recs.map((r) => r.partnerRoots);
    const selfCounts = recs.map((r) => r.selfRoots);
    const minDt = Math.min(...recs.map((r) => r.minAbsDt));
    // certificate: strict sub-wake bound. Emission window speeds are bounded by nu (H1, H2 profiles have |theta'| <= nu);
    // for s > 0 samples the prescribed extension also moves at nu. Certified iff nu < 1 (f' >= 1 - nu > 0).
    const certified = cell.v / CF < 1;
    samples.push({ s, T, receivers: recs, speedDerivatives: ds, speedDerivativeSpread: spread, speedSplitVerdict: spread === null ? "n/a (zero speed)" : (spread <= 1e-9 * scaleRef ? "equal (spread <= 1e-9 x max(1,|A|))" : "split"),
      partnerRootCounts: partnerCounts, selfRootCounts: selfCounts, expectedPartnerCountIfCertified: members.length - 1,
      censusCertificate: certified ? "certified: v < c_f, f'(tau) >= 1 - v/c_f > 0 on the scanned window, scan of (0, 2R/c_f + margin] exhaustive" : "UNCERTIFIED by the uniform monotonicity bound (v = c_f); scan census is measured only",
      censusComplete: partnerCounts.every((c) => c === members.length - 1) && selfCounts.every((c) => c === 0), minAbsDt: minDt, minLeadingDelay: Math.min(...recs.flatMap((r) => r.pairs.filter((p) => p.j !== r.i).flatMap((p) => p.hits.map((h) => h.tau)))) });
  }
  return { cell, geometry: { name: cell.G, axis: geom.axis, declared: geom.declared, seed: geom.seed, attempts: geom.attempts, minSepRule: geom.minSepRule, members: members.map((m) => ({ q: m.q, n0: m.n0, t0: m.t0 })) }, patternNotes: notes,
    preparationValidation: prep.map((p) => p.pass), preparationDetails: prep, g: (opts.K ?? K_DEFAULT) / (R * CF * CF), f0: cell.v / (2 * Math.PI * R), samples };
}

// ---------- controls ----------
function runControls() {
  const out = { order: "controls run and recorded before the first target", items: [] };
  const rec = (name, pass, expected, got, note) => out.items.push({ name, pass, expected, got, note });
  // (i) two stationary opposite-polarity sources at distance d (antipodes on sphere R = d/2): |A| = K/d^2 attractive along chord, D_t = 1.
  { const d = 1.6, R = d / 2; const ms = [{ q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0, family: "H2" }, { q: -1, n0: [-1, 0, 0], t0: [0, 1, 0], nu: 0, family: "H2" }];
    const r0 = receiverState(ms, 0, 0, R); const exp = 1 / (d * d);
    rec("(i) stationary opposite polarities, distance d=1.6: |A|=K/d^2 attractive, D_t=1, delay=d, one partner root, no self root", Math.abs(norm(r0.A) - exp) < 1e-12 && r0.A[0] < 0 && Math.abs(r0.pairs[1].hits[0].Dt - 1) < 1e-12 && Math.abs(r0.pairs[1].hits[0].tau - d) < 1e-9 && r0.pairs[1].count === 1 && r0.pairs[0].count === 0, { mag: exp, direction: "toward -x", Dt: 1, tau: d }, { mag: norm(r0.A), A: r0.A, Dt: r0.pairs[1].hits[0].Dt, tau: r0.pairs[1].hits[0].tau, counts: [r0.pairs[0].count, r0.pairs[1].count] });
    const ms2 = [{ q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0, family: "H2" }, { q: +1, n0: [0, 1, 0], t0: [0, 0, 1], nu: 0, family: "H2" }];
    const R2 = 1; const d2 = Math.SQRT2; const r1 = receiverState(ms2, 0, 0, R2);
    rec("(i') stationary like polarities at chord sqrt2 (R=1): |A|=K/2 repulsive along chord away from the partner", Math.abs(norm(r1.A) - 1 / (d2 * d2)) < 1e-12 && dot(r1.A, unit(sub([1, 0, 0], [0, 1, 0]))) > 0 && Math.abs(norm(r1.A) - Math.abs(dot(r1.A, unit(sub([1, 0, 0], [0, 1, 0]))))) < 1e-12, { mag: 0.5, direction: "along (1,-1,0)/sqrt2" }, { mag: norm(r1.A), A: r1.A }); }
  // (ii) single stationary source, receiver moving directly away at speed v: root delay = d, D_t = 1 (source stationary), |A| = K/d^2.
  { const R = 0.7, d = 2 * R; for (const v of [0.5, 1.0]) {
    const ms = [{ q: -1, n0: [1, 0, 0], t0: [0, 1, 0], nu: v, family: "H2" }, { q: +1, n0: [-1, 0, 0], t0: [0, 1, 0], nu: 0, family: "H2" }];
    const r0 = receiverState(ms, 0, 0, R); const h = r0.pairs[1].hits[0];
    rec(`(ii) stationary source, receiver moving at v=${v} (H2 past): delay=d=${d}, D_t=1, |A|=K/d^2, receiver velocity absent from the multiplier, no self root`, Math.abs(h.tau - d) < 1e-9 && Math.abs(h.Dt - 1) < 1e-12 && Math.abs(norm(r0.A) - 1 / (d * d)) < 1e-12 && r0.pairs[0].count === 0 && r0.pairs[1].count === 1, { tau: d, Dt: 1, mag: 1 / (d * d), selfRoots: 0 }, { tau: h.tau, Dt: h.Dt, mag: norm(r0.A), selfRoots: r0.pairs[0].count, vA: r0.vA }); } }
  // (ii') moving source: receiver at +x stationary, source at -x moving at speed 1/2 along +y (H2). Independent check: D_t from the closed-form root geometry
  // the root tau solves tau = |X_i - X_j(-tau)|; we verify the instrument's root satisfies the equation to 1e-12 and D_t = 1 - V_j.rhat recomputed by hand.
  { const R = 1; const ms = [{ q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0, family: "H2" }, { q: -1, n0: [-1, 0, 0], t0: [0, 1, 0], nu: 0.5, family: "H2" }];
    const r0 = receiverState(ms, 0, 0, R); const h = r0.pairs[1].hits[0]; const th = -0.5 * h.tau; const Xj = [-Math.cos(th), Math.sin(th), 0]; const Vj = scale([Math.sin(th), Math.cos(th), 0], 0.5);
    const rv = sub([1, 0, 0], Xj); const rr = norm(rv); const Dt = 1 - dot(Vj, rv) / rr;
    rec("(ii') moving source at speed 1/2: root satisfies tau=|r| to 1e-12 (hand recomputation), D_t recomputed by hand matches, |A| = K/r^2/|D_t|", Math.abs(h.tau - rr) < 1e-12 && Math.abs(Dt - h.Dt) < 1e-12 && Math.abs(norm(r0.A) - 1 / (rr * rr) / Math.abs(Dt)) < 1e-12 && r0.pairs[1].count === 1, { tau: rr, Dt }, { tau: h.tau, Dt: h.Dt, mag: norm(r0.A), hand: 1 / (rr * rr) / Math.abs(Dt) }); }
  // (iii) zero-interaction great-circle residual: K=0, H2 at v=1/2 on R=1: P A = 0, and the geometric term matches the finite-difference acceleration of the prescribed path.
  { const R = 1; const m = { q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0.5, family: "H2" }; const ms = [m, { q: -1, n0: [0, 0, 1], t0: [1, 0, 0], nu: 0.5, family: "H2" }];
    const r0 = receiverState(ms, 0, 0, R, { K: 0 }); const hdt = 1e-4; const Xp = hist(m, hdt, R).X, X0 = hist(m, 0, R).X, Xm = hist(m, -hdt, R).X; const fd = scale(add(sub(Xp, X0), sub(Xm, X0)), 1 / (hdt * hdt));
    const expectedGeom = scale(m.n0, -0.25);
    rec("(iii) zero interaction (K=0): P A = 0 and finite-difference acceleration of the prescribed unit-sphere great circle at v=1/2 equals -(v^2/R) n = -X/4 (manuscript analytical control)", norm(r0.PA) === 0 && norm(r0.A) === 0 && norm(sub(fd, expectedGeom)) < 1e-6 && norm(sub(r0.geometricTerm, expectedGeom)) < 1e-12, { PA: [0, 0, 0], geom: expectedGeom }, { PA: r0.PA, fd, geometricTerm: r0.geometricTerm }); }
  // (iv) negative control: deliberately omit a root; the census count must mismatch the certified expected count.
  { const cell = { G: "G1", V: "V1", H: "H1", R: 1, v: 0.5, sampleS: [0] }; const ev = evaluateCell(cell, { omitPair: [0, 1] });
    const s0 = ev.samples[0]; const flagged = !s0.censusComplete && s0.partnerRootCounts[0] === 4;
    rec("(iv) negative: omitting the (0,1) root at A3-like cell v=1/2 is flagged (partner count 4 != 5 expected under certificate)", flagged, { partnerCount0: 4, censusComplete: false }, { partnerRootCounts: s0.partnerRootCounts, censusComplete: s0.censusComplete }); }
  // (v) preparation validator negative control: a radial release velocity must be rejected.
  { const bad = { q: +1, n0: [1, 0, 0], t0: [1, 0, 0], nu: 0.5, family: "H1" }; const v = validatePreparation(bad, 1);
    rec("(v) negative: preparation validator rejects a radial release velocity (t0 = n0)", v.pass === false && v.checks[0].ok === false, { pass: false }, { pass: v.pass, failing: v.checks.filter((c) => !c.ok).map((c) => c.name) }); }
  // (vi) preparation validator known case: H1 at v=1/2, R=1 passes all checks.
  { const good = { q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0.5, family: "H1" }; const v = validatePreparation(good, 1);
    rec("(vi) known: H1 preparation at v=1/2 passes tangent, unit-norm, release-derivative, nonzero-interior and C^2-seam checks", v.pass === true, { pass: true }, { pass: v.pass, checks: v.checks.map((c) => [c.name, c.ok]) }); }
  // (vii) sub-wake uniqueness sanity: at A3-like cell v=1/2 the census is complete (5 partner roots, 0 self) at s=0 and s=-0.2.
  { const ev = evaluateCell({ G: "G1", V: "V1", H: "H1", R: 1, v: 0.5, sampleS: [-0.2, 0] });
    rec("(vii) known: six poles H1 v=1/2 census complete at s=-0.2 and s=0 (5 partner roots each, 0 self roots), all delays <= 2R", ev.samples.every((s) => s.censusComplete) && ev.samples.every((s) => s.receivers.every((r) => r.pairs.every((p) => p.hits.every((h) => h.tau <= 2 + 1e-9)))), { complete: true }, { complete: ev.samples.map((s) => s.censusComplete), counts: ev.samples.map((s) => s.partnerRootCounts) }); }
  // (viii) H1L with L = 1/4 reproduces H1 exactly (theta, theta' at 400 sample points), (ix) negative: a wrong release derivative (0.9 nu) is rejected by the validator.
  { let maxd = 0; for (let k = 0; k <= 400; k++) { const sv = -0.3 + 0.4 * k / 400; const a = theta("H1", 0.5, sv), b = theta("H1L", 0.5, sv, 0, 0, 0.25); maxd = Math.max(maxd, Math.abs(a.th - b.th), Math.abs(a.dth - b.dth)); }
    rec("(viii) known: H1L with duration L = 1/4 reproduces H1 (theta and theta' at 400 points in s in [-0.3, 0.1])", maxd < 1e-15, { maxdiff: 0 }, { maxdiff: maxd }); }
  { const bad = { q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0.5, family: "H1L", L: 1, badRelease: 0.9 }; const v = validatePreparation(bad, 1);
    rec("(ix) negative: H1L with a wrong release derivative (0.9 nu) is rejected by the release-velocity check", v.pass === false && v.checks.some((c) => c.name.startsWith("release velocity") && !c.ok), { pass: false }, { pass: v.pass, failing: v.checks.filter((c) => !c.ok).map((c) => c.name) }); }
  { const good = { q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0.5, family: "H1L", L: 1 }; const v = validatePreparation(good, 1);
    rec("(x) known: H1L with L = 1 passes the validator (tangent, norm, release derivative, nonzero interior, C^2 seam at s = -1)", v.pass === true, { pass: true }, { pass: v.pass, checks: v.checks.map((c) => [c.name, c.ok]) }); }
  // (xi) known: the H1L release second derivative theta''(0-) equals 6 nu / L (24 nu at L = 1/4), checked against a finite difference of theta' (independent of the ddth formula); (xii) negative: a factor-four version must be rejected.
  { let ok = true; const got = {}; for (const [L, expect] of [[1, 6 * 0.5], [0.25, 24 * 0.5], [2, 3 * 0.5]]) { const h = 1e-6; const fd = (theta("H1L", 0.5, -h, 0, 0, L).dth - theta("H1L", 0.5, -3 * h, 0, 0, L).dth) / (2 * h); const code = theta("H1L", 0.5, -2 * h, 0, 0, L).ddth; got[L] = { fd, code, expect }; if (Math.abs(fd - expect) > 1e-4 * Math.abs(expect) || Math.abs(code - expect) > 1e-4 * Math.abs(expect)) ok = false; }
    rec("(xi) known: H1L theta''(0-) = 6 nu / L (24 nu at L = 1/4, 3 nu at L = 2) by finite difference of theta' and by the code's ddth", ok, { rule: "6 nu / L" }, got); }
  { const L = 1; const h = 1e-6; const fd = (theta("H1L", 0.5, -h, 0, 0, L).dth - theta("H1L", 0.5, -3 * h, 0, 0, L).dth) / (2 * h); const wrong = 4 * theta("H1L", 0.5, -2 * h, 0, 0, L).ddth;
    rec("(xii) negative: a factor-four theta'' (the wave-4 defect) is rejected against the finite difference of theta'", Math.abs(wrong - fd) > 1e-2, { fd }, { wrong }); }
  // (xiii) known: the RIGID family about e_z with omega = nu reproduces the H2 great-circle history of an equatorial member (position and velocity) at several times.
  { const a = { q: +1, n0: [1, 0, 0], t0: [0, 1, 0], nu: 0.5, family: "H2" }; const b = { q: +1, n0: [1, 0, 0], family: "RIGID", rigidAxis: [0, 0, 1], omega: 0.5, nu: 0.5, t0: [0, 1, 0] };
    let maxd = 0; for (const T of [-2, -1, -0.3, 0, 0.1]) { const ha = hist(a, T, 1), hb = hist(b, T, 1); maxd = Math.max(maxd, norm(sub(ha.X, hb.X)), norm(sub(ha.V, hb.V))); }
    rec("(xiii) known: RIGID about e_z at omega = 1/2 equals the H2 great-circle history for an equatorial member (max difference over five times)", maxd < 1e-12, { maxdiff: 0 }, { maxdiff: maxd }); }
  // (xiv) known: the twisted hexagon at twist 60 degrees is the regular alternating hexagon with P A = 0 at every member (stationary past).
  { const ev = evaluateCell({ G: "G6", V: "V1", H: "H1", R: 1, v: 0, geomOpts: { twistDeg: 60 }, sampleS: [0] }); const maxPA = Math.max(...ev.samples[0].receivers.map((r) => norm(r.PA)));
    rec("(xiv) known: twist 60 degrees at rest gives the regular alternating hexagon, max |P A| < 1e-12", maxPA < 1e-12, { maxPA: 0 }, { maxPA }); }
  out.allPass = out.items.every((x) => x.pass);
  return out;
}

// ---------- cell list (brief order) ----------
const CELLS = [
  // (1) D2 residual over one full rotation period 2 pi / omega = 4 pi = 12.566371 (dimensionless), 17 samples including both ends
  { id: "CH-D2-period", G: "G2", V: "V1", H: "RIGID", R: 1, v: 0.5, rigidAxis: [0.5, 0, 0.8660254037844386], omega: 0.5, sampleS: [0.0, 0.785398, 1.570796, 2.356194, 3.141593, 3.926991, 4.712389, 5.497787, 6.283185, 7.068583, 7.853982, 8.63938, 9.424778, 10.210176, 10.995574, 11.780972, 12.566371] },
];

function main() {
  const mode = process.argv[2] || "all"; const outdir = process.argv[3] || ".";
  if (mode === "summary") { summarize(process.argv[3], process.argv[4] || "."); return; }
  const blocks = (process.argv[4] || "").split(",").filter(Boolean);
  const t0 = Date.now();
  if (mode === "controls" || mode === "all") {
    const c = runControls();
    fs.writeFileSync(path.join(outdir, "spherical-curvature-claude-coverage-wave10-controls.json"), JSON.stringify(c, null, 1));
    console.log("controls:", c.allPass ? "ALL PASS" : "FAIL", c.items.map((x) => `${x.pass ? "pass" : "FAIL"} ${x.name}`).join("\n"));
    if (!c.allPass && mode === "all") { console.log("controls failed; targets not run"); process.exit(2); }
  }
  if (mode === "cells" || mode === "all") {
    const sel = blocks.length ? CELLS.filter((c) => blocks.some((b) => c.id === b || c.id.startsWith(b + "-"))) : CELLS;
    const results = [];
    for (const cell of sel) { const tc = Date.now(); const ev = evaluateCell(cell); ev.wallMs = Date.now() - tc; results.push(ev);
      const s0 = ev.samples.find((s) => s.s === 0);
      console.log(`${cell.id}: prep ${ev.preparationValidation.every(Boolean) ? "ok" : "FAIL"}; s=0 partner roots ${s0.partnerRootCounts.join("")} self ${s0.selfRootCounts.join("")}; ${s0.censusCertificate.split(":")[0]}; dspeed [${s0.speedDerivatives.map((x) => x === null ? "n/a" : x.toExponential(6)).join(", ")}]; verdict ${s0.speedSplitVerdict}; min|Dt| ${s0.minAbsDt.toExponential(3)}; ${ev.wallMs} ms`); }
    const fn = path.join(outdir, `spherical-curvature-claude-coverage-wave10-cells${blocks.length ? "-" + blocks.join("_") : ""}.json`);
    fs.writeFileSync(fn, JSON.stringify({ generated: new Date().toISOString(), law: "X'' = P A - (|v|^2/R) n; A canonical all-root; c_f=1; K=1; radial interaction discarded (reported as nA only)", results }, null, 0));
    console.log("wrote", fn);
  }
  console.log("total wall ms", Date.now() - t0);
}
// ---------- summary (compact evidence) ----------
function summarize(dir, outdir) {
  const files = fs.readdirSync(dir).filter((f) => /^spherical-curvature-claude-coverage-wave10-cells-.*\.json$/.test(f)).sort();
  const rows = []; const md = [];
  md.push("| Cell | G | V | H | R | v | g=K/R | f_0 | s | partner roots per receiver | self roots | certificate | min delay | min abs D_t | abs(P A) per member | n.A per member | d(speed)/dT per member | verdict | prep | grade |");
  md.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |");
  const f6 = (x) => x === null || x === undefined ? "n/a" : (Math.abs(x) < 1e-12 ? "0" : Number(x).toPrecision(6));
  for (const fn of files) { const d = JSON.parse(fs.readFileSync(path.join(dir, fn)));
    for (const r of d.results) { for (const s of r.samples) {
      const row = { id: r.cell.id, G: r.cell.G, V: r.cell.V, H: r.cell.H, R: r.cell.R, v: r.cell.v, g: r.g, f0: r.f0, s: s.s, T: s.T,
        partnerRootCounts: s.partnerRootCounts, selfRootCounts: s.selfRootCounts, certificate: s.censusCertificate.split(":")[0], censusComplete: s.censusComplete, minLeadingDelay: s.minLeadingDelay, minAbsDt: s.minAbsDt,
        members: s.receivers.map((rc) => ({ q: rc.q, X: rc.X, V: rc.V, speed: rc.speed, A: rc.A, PA: rc.PA, absPA: norm(rc.PA), nA: rc.nA, vA: rc.vA, dspeed: rc.dspeed, roots: rc.pairs.flatMap((p) => p.hits.map((h) => ({ j: p.j, tau: h.tau, r: h.r, Dt: h.Dt, sigma: h.sigma, speedT: h.speedT }))) })),
        speedDerivatives: s.speedDerivatives, spread: s.speedDerivativeSpread, verdict: s.speedSplitVerdict, prepPass: r.preparationValidation.every(Boolean), geometry: r.geometry, patternNotes: r.patternNotes, grade: "measured (coverage instrument; release-state and prescribed-history diagnostic only)", falsifier: "a missed causal root (count below the certified 5 partner roots), a root residual above 1e-12, a wrong D_t sign, a tangent check failure (n.V != 0 or |X| != R), or an independent evaluation of the per-hit sum differing from A beyond 1e-9" };
      rows.push(row);
      md.push(`| ${row.id} | ${row.G} | ${row.V} | ${row.H} | ${row.R} | ${row.v} | ${f6(row.g)} | ${f6(row.f0)} | ${row.s} | ${row.partnerRootCounts.join("")} | ${row.selfRootCounts.join("")} | ${row.certificate} | ${f6(row.minLeadingDelay)} | ${f6(row.minAbsDt)} | ${row.members.map((m) => f6(m.absPA)).join(", ")} | ${row.members.map((m) => f6(m.nA)).join(", ")} | ${row.speedDerivatives.map(f6).join(", ")} | ${row.verdict.split(" ")[0]} | ${row.prepPass ? "pass" : "FAIL"} | measured |`);
    } } }
  fs.writeFileSync(path.join(outdir, "spherical-curvature-claude-coverage-wave10-results.json"), JSON.stringify({ generated: new Date().toISOString(), law: "X'' = P A - (|v|^2/R) n; A canonical all-root; c_f=1; K=1; radial interaction discarded (reported as n.A only); prescribed histories are input, not motion", rows }, null, 0));
  fs.writeFileSync(path.join(outdir, "spherical-curvature-claude-coverage-wave10-table.md"), md.join("\n") + "\n");
  console.log("summary rows", rows.length);
}

main();
