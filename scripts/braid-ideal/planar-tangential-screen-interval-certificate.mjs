// Priority-only interval certificate for the planar tangential anti-damping screen.
// Executes the directed-rounding certification whose target band and burdens are
// stated in the Interval Certification Home section of
// reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md:
//   c1 * beta <= Phi_tan(beta) <= c2 * beta  for all beta in [betaLo, betaHi],
// on the exact planar rotating channel of
// scripts/braid-ideal/axis-neutral-rotating-wave-residual-scan.mjs
// (rho = 1, c_f = 1, kappa = 1, zero softening, receiver-normal over source-normal
// branch weight exactly as implemented there - the scan applies no Jacobian floor;
// this certificate certifies the same function and reports the beta range where a
// J_f floor would provably never engage).
//
// Rounding model (declared, conservative): every arithmetic operation's interval is
// widened outward by PAD_REL relative plus PAD_MIN absolute; sin/cos results are
// additionally widened by PAD_TRIG absolute and clamped to [-1, 1]. PAD_TRIG exceeds
// documented faithful-libm error bounds for the argument range [-2*pi, 2*pi] by more
// than two orders of magnitude, and PAD_REL exceeds the half-ulp IEEE-754 rounding
// error by roughly three orders of magnitude. The certificate is rigorous conditional
// on this rounding model; it makes no other numerical assumption.
//
// Fail-closed: this certificate never authorizes a retained branch, an admissible
// spectrum row, accepted evidence, or score movement.

import { fileURLToPath } from "node:url";

export const SCHEMA = "planar_tangential_screen_interval_certificate.v1";
export const PROOF_PACKET_REF =
  "priority-proof-packet:reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md";

const PAD_REL = 1e-13;
const PAD_TRIG = 1e-12;
const PAD_MIN = 1e-300;
const D2R_LO = Math.PI / 180 - 1e-17;
const D2R_HI = Math.PI / 180 + 1e-17;
const PI = { lo: Math.PI - 5e-16, hi: Math.PI + 5e-16 };

// Sources relative to the receiver at phase 0 on the planar hexagon:
// same-polarity partners at 120/240 degrees (polarity product +1),
// opposite-polarity partners at 60/180/300 degrees (polarity product -1).
const SOURCES = [
  { psiDeg: 120, sign: +1 },
  { psiDeg: 240, sign: +1 },
  { psiDeg: 60, sign: -1 },
  { psiDeg: 180, sign: -1 },
  { psiDeg: 300, sign: -1 },
];

// ---------- outward-rounded interval arithmetic ----------

function widen(lo, hi) {
  const pad = PAD_REL * Math.max(Math.abs(lo), Math.abs(hi)) + PAD_MIN;
  return { lo: lo - pad, hi: hi + pad };
}

function cleanNumber(value) {
  return Number.isFinite(value) ? Number(value.toPrecision(15)) : value;
}

export function iv(lo, hi = lo) {
  if (!(lo <= hi)) throw new TypeError(`invalid interval [${lo}, ${hi}]`);
  return { lo, hi };
}

const iAdd = (a, b) => widen(a.lo + b.lo, a.hi + b.hi);
const iSub = (a, b) => widen(a.lo - b.hi, a.hi - b.lo);
const iNeg = (a) => ({ lo: -a.hi, hi: -a.lo });

function iMul(a, b) {
  const p = [a.lo * b.lo, a.lo * b.hi, a.hi * b.lo, a.hi * b.hi];
  return widen(Math.min(...p), Math.max(...p));
}

function iDiv(a, b) {
  if (b.lo <= 0 && b.hi >= 0) throw new RangeError("interval division by interval containing zero");
  const p = [a.lo / b.lo, a.lo / b.hi, a.hi / b.lo, a.hi / b.hi];
  return widen(Math.min(...p), Math.max(...p));
}

function iSqrt(a) {
  if (a.lo < 0) throw new RangeError("interval sqrt of interval containing negative values");
  return widen(Math.sqrt(a.lo), Math.sqrt(a.hi));
}

const iAbs = (a) =>
  a.lo >= 0 ? a : a.hi <= 0 ? iNeg(a) : { lo: 0, hi: Math.max(-a.lo, a.hi) };

function trigClamp(lo, hi) {
  return { lo: Math.max(-1, lo - PAD_TRIG), hi: Math.min(1, hi + PAD_TRIG) };
}

function iSin(a) {
  if (a.hi - a.lo >= 2 * Math.PI) return { lo: -1, hi: 1 };
  let lo = Math.min(Math.sin(a.lo), Math.sin(a.hi));
  let hi = Math.max(Math.sin(a.lo), Math.sin(a.hi));
  // interior extrema at pi/2 + k*pi
  const kMin = Math.ceil((a.lo - Math.PI / 2) / Math.PI - 1e-9);
  const kMax = Math.floor((a.hi - Math.PI / 2) / Math.PI + 1e-9);
  for (let k = kMin; k <= kMax; k += 1) {
    const x = Math.PI / 2 + k * Math.PI;
    if (x >= a.lo - 1e-9 && x <= a.hi + 1e-9) {
      if (((k % 2) + 2) % 2 === 0) hi = 1;
      else lo = -1;
    }
  }
  return trigClamp(lo, hi);
}

function iCos(a) {
  return iSin(iAdd(a, iDiv(PI, iv(2))));
}

// ---------- planar rotating-channel residual, interval form ----------

function psiInterval(psiDeg) {
  return { lo: psiDeg * D2R_LO, hi: psiDeg * D2R_HI };
}

// separation minus lag: G(s) = 2*|sin((psi - beta*s)/2)| - s, evaluated for the
// whole beta box at a scalar lag s. Strictly decreasing in s with |G'| >= 1 - betaHi.
function lagResidual(psi, beta, s) {
  const del = iSub(psi, iMul(beta, iv(s)));
  const sinHalf = iSin(iDiv(del, iv(2)));
  return iSub(iMul(iv(2), iAbs(sinHalf)), iv(s));
}

// Certified enclosure of the unique causal lag for one directed pair over a beta box.
// Bisection with interval sign tests; every retained sign test is conservative, so the
// returned [lo, hi] contains the causal lag for every beta in the box. When a midpoint
// sign test is indeterminate, the bracket is contracted through the transversality
// bound: G is strictly decreasing with |dG/ds| >= 1 - betaHi under (S), so a residual
// enclosure [gLo, gHi] straddling zero at s = m still pins the lag inside
// [m + gLo/(1 - betaHi), m + gHi/(1 - betaHi)] for every beta in the box.
export function causalLagEnclosure(psi, beta) {
  if (!(beta.hi < 1)) return null;
  let a = 1e-9;
  let b = 4;
  const gA = lagResidual(psi, beta, a);
  const gB = lagResidual(psi, beta, b);
  if (!(gA.lo > 0) || !(gB.hi < 0)) return null;
  const slopeFloor = 1 - beta.hi;
  for (let i = 0; i < 200; i += 1) {
    const m = (a + b) / 2;
    const g = lagResidual(psi, beta, m);
    if (g.lo > 0) a = m;
    else if (g.hi < 0) b = m;
    else {
      a = Math.max(a, m + g.lo / slopeFloor);
      b = Math.min(b, m + g.hi / slopeFloor);
      break;
    }
    if (b - a <= 4e-12) break;
  }
  return { lo: a, hi: b };
}

// Interval evaluation of the tangential and radial residual over one beta box,
// mirroring rotatingWaveResiduals(0, beta) of the sampled scan term by term.
// Also returns per-partner certified floors consumed by the Lemma T transfer
// coefficients: root distance lo, source-normal lo, branch-weight hi.
export function residualEnclosure(beta) {
  let tan = iv(0);
  let rad = iv(0);
  let minSourceNormalLo = Infinity;
  let maxLagWidth = 0;
  const perSource = [];
  for (const src of SOURCES) {
    const psi = psiInterval(src.psiDeg);
    const lagBox = causalLagEnclosure(psi, beta);
    if (lagBox == null) return null;
    maxLagWidth = Math.max(maxLagWidth, lagBox.hi - lagBox.lo);
    const lag = iv(lagBox.lo, lagBox.hi);
    const del = iSub(psi, iMul(beta, lag));
    const c = iCos(del);
    const s = iSin(del);
    // receiver at (1, 0) in the (e_r, e_t) plane frame; source at (cos del, sin del)
    const dx = iSub(iv(1), c);
    const dy = iNeg(s);
    const dist2 = iAdd(iMul(dx, dx), iMul(dy, dy));
    const dist = iSqrt(dist2);
    if (!(dist.lo > 0)) return null;
    // v_src = beta * (-sin del, cos del); v_rec = beta * (0, 1)
    const vSrcDotD = iMul(beta, iAdd(iMul(iNeg(s), dx), iMul(c, dy)));
    const vRecDotD = iMul(beta, dy);
    const sourceNormal = iSub(iv(1), iDiv(vSrcDotD, dist));
    const receiverNormal = iSub(iv(1), iDiv(vRecDotD, dist));
    if (!(sourceNormal.lo > 0)) return null;
    minSourceNormalLo = Math.min(minSourceNormalLo, sourceNormal.lo);
    const weight = iDiv(iAbs(receiverNormal), sourceNormal);
    const dist3 = iMul(dist2, dist);
    const scale = iDiv(iMul(iv(src.sign), weight), dist3);
    tan = iAdd(tan, iMul(scale, dy));
    rad = iAdd(rad, iMul(scale, dx));
    perSource.push({
      psiDeg: src.psiDeg,
      distLo: dist.lo,
      sourceNormalLo: sourceNormal.lo,
      weightHi: weight.hi,
    });
  }
  return { tangential: tan, radial: rad, minSourceNormalLo, maxLagWidth, perSource };
}

// ---------- Lemma T transfer coefficients (see the proof packet) ----------
//
// Evaluates, for one accepted beta box, the certified coefficients L_x, L_v of the
// rigid-to-released transfer bound T = L_x*delta + L_v*nu, plus the certified tube
// radius (delta = nu, theta = 1/2) inside which Corollary T's unconditional clock
// runs. Every input is a certified floor from the box enclosure; every formula step
// is the corresponding packet step T1-T8, evaluated in the conservative direction.
export function transferCoefficientsFromBox(b1, b2, enclosure, nuCoeffCap) {
  const dCoeff = 2 / (1 - b2); // D = dCoeff * delta   (T1-T2)
  const speedHi = b2 + nuCoeffCap; // actual-speed cap used in T5 products
  let LxRows = 0;
  let LvRows = 0;
  let capDelta = Infinity;
  for (const p of enclosure.perSource) {
    const dLo = p.distLo;
    const S = p.sourceNormalLo;
    const dHatCoeff = (2 * dCoeff) / dLo; // |Delta dHat| <= dHatCoeff * delta   (T3)
    const nuSrcDelta = (2 * b2 * b2) / (1 - b2); // nu_s = nu + nuSrcDelta * delta  (T4)
    // T5: E_rec, E_src as (deltaCoeff, nuCoeff) pairs
    const eRecX = speedHi * dHatCoeff;
    const eRecV = 1;
    const eSrcX = nuSrcDelta + speedHi * dHatCoeff;
    const eSrcV = 1;
    // T6: |Delta W| <= (2/S) E_rec + (2 (1+b2) / S^2) E_src
    const wRec = 2 / S;
    const wSrc = (2 * (1 + b2)) / (S * S);
    const dWX = wRec * eRecX + wSrc * eSrcX;
    const dWV = wRec * eRecV + wSrc * eSrcV;
    // T7: |Delta row| <= (2/dLo^2) |Delta W| + (16 W+ / dLo^3) D
    const rowX = (2 * dWX) / (dLo * dLo) + (16 * p.weightHi * dCoeff) / (dLo * dLo * dLo);
    const rowV = (2 * dWV) / (dLo * dLo);
    LxRows += rowX;
    LvRows += rowV;
    // applicability caps (A): D <= dLo/4 and E_src <= S/2 at delta = nu
    capDelta = Math.min(capDelta, dLo / (4 * dCoeff), S / (2 * (eSrcX + eSrcV)));
  }
  // T8 projection: |Phi| bound and velocity-direction shift 2 nu / beta
  const radAbsHi = Math.max(Math.abs(enclosure.radial.lo), Math.abs(enclosure.radial.hi));
  const phiNormHi = Math.sqrt(enclosure.tangential.hi ** 2 + radAbsHi ** 2);
  const Lx = LxRows;
  const Lv = LvRows + (2 * phiNormHi) / b1;
  // Corollary T tube at theta = 1/2, delta = nu, with the actual rim fraction
  // beta' >= betaLo - nu folded into the margin condition:
  // (Lx + Lv + c1 + (1/2) c1) * delta <= (1/2) c1 * betaLo
  const c1Box = enclosure.tangential.lo / b2;
  const tubeMargin = (0.5 * c1Box * b1) / (Lx + Lv + 1.5 * c1Box);
  const tubeRadius = Math.min(tubeMargin, capDelta, nuCoeffCap);
  return { Lx, Lv, c1Box, tubeRadius, capDelta };
}

// Convenience evaluation at a single beta (narrow box), for tests and audits.
export function transferBoundAt(beta, { nuCoeffCap = 0.005 } = {}) {
  const b1 = beta - 1e-9;
  const b2 = beta + 1e-9;
  const enclosure = residualEnclosure(iv(b1, b2));
  if (enclosure == null) return null;
  return {
    enclosure,
    ...transferCoefficientsFromBox(b1, b2, enclosure, nuCoeffCap),
  };
}

// ---------- static FCC-sea along-velocity screen (Corollary S) ----------
//
// The sh0sea aligned FCC nearest-neighbor shell, held static, is placed around the
// axis-neutral rotating braid and its along-velocity (tangential) wake contribution is
// certified. Sources are held static (source Jacobian 1), so causal delay does not move
// them and the wake is the instantaneous inverse-square kernel modulated by the moving
// receiver-normal factor 1 - v_rec.dHat. On the rotating channel v_rec = beta * tHat, so
// the sea along-velocity projection decomposes exactly as
//
//   Pi_T^sea(beta, phi) = c0(phi) - beta * Q(phi),
//
// both beta-independent geometric sums over rotation phase phi. c0 is a static
// orientation-locking torque (odd about the C3-symmetric phases; exact zero cyclic
// average, so it transacts no net tangential action over a rotation period). Q is the
// velocity-linear along-velocity coefficient - the sea's only candidate anti-damping /
// damping channel. The absorber question against the certified pump band c1*beta <=
// Phi_tan reduces to whether Q(phi) can reach the pump slope c1: if certified
// sup_phi |Q| < c1, the sea cannot cancel the pump and the (S)-failure clock survives
// screening (sea-screened clock corollary). Chart: octahedral seed (the sh0sea object,
// reproduces the recorded release-instant Pi_R = -0.2833 at beta -> 0); the decision is
// chart- and orientation-order robust (sampled sup|Q| <= 0.28 for octahedral/planar
// seed and aligned/conjugate/paired-antiphase order alike).

const SEA_A_FCC = 4.25;
const SEA_SQ3 = Math.sqrt(3);
const NHAT = [1 / SEA_SQ3, 1 / SEA_SQ3, 1 / SEA_SQ3];
const SEA_RIM_R2 = 2 / 3; // |nHat x y|^2 for a unit octahedral site (exact)
const OCTA_SITES = [
  { p: [1, 0, 0], q: 1 },
  { p: [0, 1, 0], q: 1 },
  { p: [0, 0, 1], q: 1 },
  { p: [-1, 0, 0], q: -1 },
  { p: [0, -1, 0], q: -1 },
  { p: [0, 0, -1], q: -1 },
];
const FCC_NEAREST_DIRS = [
  [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
  [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1],
  [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
];

const cross3 = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot3f = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function buildSeaSources(aFcc, orientation = "aligned") {
  const sources = [];
  FCC_NEAREST_DIRS.forEach((d, j) => {
    const center = [(d[0] * aFcc) / 2, (d[1] * aFcc) / 2, (d[2] * aFcc) / 2];
    const sign = orientation === "conjugate" ? -1 : 1;
    for (const site of OCTA_SITES) {
      sources.push({ p: [center[0] + site.p[0], center[1] + site.p[1], center[2] + site.p[2]], q: site.q * sign });
    }
  });
  return sources;
}

// Rigid rotation about NHAT: y(phi) = C1 cos phi + C2 sin phi + C3, with C1,C2,C3 and
// nHat x y = kC1 cos + kC2 sin + kC3 all constant per receiver site.
function seaReceiverConsts(v) {
  const kv = dot3f(NHAT, v);
  // Rodrigues about NHAT: y(phi) = vPerp cos phi + (NHAT x v) sin phi + (NHAT.v) NHAT.
  const C1 = [v[0] - kv * NHAT[0], v[1] - kv * NHAT[1], v[2] - kv * NHAT[2]];
  const C2 = cross3(NHAT, v);
  const C3 = [NHAT[0] * kv, NHAT[1] * kv, NHAT[2] * kv];
  return { C1, C2, C3, kC1: cross3(NHAT, C1), kC2: cross3(NHAT, C2), kC3: cross3(NHAT, C3) };
}

function iVecFromConsts(C1, C2, C3, cph, sph) {
  return [0, 1, 2].map((i) =>
    iAdd(iAdd(iMul(iv(C1[i]), cph), iMul(iv(C2[i]), sph)), iv(C3[i]))
  );
}

const iDot3v = (a, b) => iAdd(iAdd(iMul(a[0], b[0]), iMul(a[1], b[1])), iMul(a[2], b[2]));

// Enclosure of Q(phi) and c0(phi) over a rotation-phase box, receiver sites rotating
// through the static sea. Every operation is the outward-rounded interval arithmetic
// above; the static sea distances stay well away from zero so no division is indeterminate.
export function seaEnclosure(aFcc, phiBox, orientation = "aligned") {
  const sources = buildSeaSources(aFcc, orientation);
  const cph = iCos(phiBox);
  const sph = iSin(phiBox);
  let Q = iv(0);
  let c0 = iv(0);
  let minDist2Lo = Infinity;
  for (const rc of OCTA_SITES) {
    const K = seaReceiverConsts(rc.p);
    const y = iVecFromConsts(K.C1, K.C2, K.C3, cph, sph);
    const ky = iVecFromConsts(K.kC1, K.kC2, K.kC3, cph, sph);
    for (const s of sources) {
      const d = [iSub(y[0], iv(s.p[0])), iSub(y[1], iv(s.p[1])), iSub(y[2], iv(s.p[2]))];
      const kyd = iDot3v(ky, d);
      const d2 = iAdd(iAdd(iMul(d[0], d[0]), iMul(d[1], d[1])), iMul(d[2], d[2]));
      if (!(d2.lo > 0)) return null;
      minDist2Lo = Math.min(minDist2Lo, d2.lo);
      const q = rc.q * s.q;
      // Q term = q * (nHat x y . d)^2 / (rimR2 * (d.d)^2)
      const qTerm = iDiv(iMul(kyd, kyd), iMul(iv(SEA_RIM_R2), iMul(d2, d2)));
      Q = iAdd(Q, iMul(iv(q), qTerm));
      // c0 term = q * (nHat x y . d) / (sqrt(rimR2) * (d.d)^{3/2})
      const d3 = iMul(d2, iSqrt(d2));
      const c0Term = iDiv(kyd, iMul(iv(Math.sqrt(SEA_RIM_R2)), d3));
      c0 = iAdd(c0, iMul(iv(q), c0Term));
    }
  }
  return { Q: iDiv(Q, iv(6)), c0: iDiv(c0, iv(6)), minDist2Lo };
}

// Sampled float witness of c0's exact zero cyclic average and oddness about phi=0
// (the reflection-symmetry derivation), plus the sampled true sup|Q|.
function seaFloatWitness(aFcc, orientation = "aligned") {
  const sources = buildSeaSources(aFcc, orientation);
  const N = 720;
  const T = (2 * Math.PI) / 3;
  const geom = (phi) => {
    const c = Math.cos(phi), sn = Math.sin(phi);
    let Q = 0, c0 = 0;
    for (const rc of OCTA_SITES) {
      const K = seaReceiverConsts(rc.p);
      const y = [0, 1, 2].map((i) => K.C1[i] * c + K.C2[i] * sn + K.C3[i]);
      const ky = [0, 1, 2].map((i) => K.kC1[i] * c + K.kC2[i] * sn + K.kC3[i]);
      for (const s of sources) {
        const d = [y[0] - s.p[0], y[1] - s.p[1], y[2] - s.p[2]];
        const d2 = dot3f(d, d);
        const kyd = dot3f(ky, d);
        const q = rc.q * s.q;
        Q += (q * kyd * kyd) / (SEA_RIM_R2 * d2 * d2);
        c0 += (q * kyd) / (Math.sqrt(SEA_RIM_R2) * Math.pow(d2, 1.5));
      }
    }
    return { Q: Q / 6, c0: c0 / 6 };
  };
  let c0Sum = 0, qSupSample = 0, qMean = 0, oddErr = 0;
  for (let i = 0; i < N; i += 1) {
    const g = geom((i / N) * T);
    c0Sum += g.c0;
    qMean += g.Q;
    qSupSample = Math.max(qSupSample, Math.abs(g.Q));
  }
  for (let i = 1; i < 60; i += 1) {
    oddErr = Math.max(oddErr, Math.abs(geom((i * Math.PI) / 180).c0 + geom((-i * Math.PI) / 180).c0));
  }
  // Release-instant radial projection Pi_R (beta=0, phi=0): validates against the recorded
  // sh0sea dipole wake-sum row. The recorded value uses the sh0sea kernel softening 0.05;
  // this certificate's declared kernel is zero-softening. Both are reported.
  const releaseRadial = (soft) => {
    let piR = 0;
    for (const rc of OCTA_SITES) {
      const rHat = rc.p; // unit octahedral site at phi=0
      let a = [0, 0, 0];
      for (const s of sources) {
        const d = [rHat[0] - s.p[0], rHat[1] - s.p[1], rHat[2] - s.p[2]];
        const dist = Math.sqrt(dot3f(d, d) + soft * soft);
        const coef = (rc.q * s.q) / (dist * dist * dist);
        a = [a[0] + coef * d[0], a[1] + coef * d[1], a[2] + coef * d[2]];
      }
      piR += dot3f(rHat, a);
    }
    return piR / OCTA_SITES.length;
  };
  return {
    c0CyclicMean: cleanNumber(c0Sum / N),
    c0OddnessError: cleanNumber(oddErr),
    qCyclicMean: cleanNumber(qMean / N),
    qSupSampled: cleanNumber(qSupSample),
    piRReleaseZeroSoftening: cleanNumber(releaseRadial(0)),
    piRReleaseSh0seaSoftening: cleanNumber(releaseRadial(0.05)),
  };
}

// Adaptive certification of sup_phi |Q| over one rotation period, then the non-absorber
// decision against the certified pump slope pumpC1.
export function certifySea({
  aFcc = SEA_A_FCC,
  orientation = "aligned",
  qTol = 0.01,
  maxBoxes = 200000,
  pumpC1 = null,
} = {}) {
  const T = (2 * Math.PI) / 3;
  const stack = [[0, T]];
  let qLo = Infinity;
  let qHi = -Infinity;
  let c0AbsHi = 0;
  let minDist2Lo = Infinity;
  let boxes = 0;
  let failed = false;
  while (stack.length > 0) {
    if (boxes >= maxBoxes) { failed = true; break; }
    const [a, b] = stack.pop();
    const r = seaEnclosure(aFcc, iv(a, b), orientation);
    if (r == null) { failed = true; break; }
    if (r.Q.hi - r.Q.lo > qTol && b - a > 1e-6) {
      const m = (a + b) / 2;
      stack.push([a, m], [m, b]);
      continue;
    }
    boxes += 1;
    qLo = Math.min(qLo, r.Q.lo);
    qHi = Math.max(qHi, r.Q.hi);
    c0AbsHi = Math.max(c0AbsHi, Math.abs(r.c0.lo), Math.abs(r.c0.hi));
    minDist2Lo = Math.min(minDist2Lo, r.minDist2Lo);
  }
  const qSupCertified = failed ? Infinity : Math.max(Math.abs(qLo), Math.abs(qHi));
  const witness = seaFloatWitness(aFcc, orientation);
  const decisive = !failed && pumpC1 != null && qSupCertified < pumpC1;
  return {
    statement:
      "static aligned FCC sea along-velocity coefficient certified sup_phi |Q| < pump slope c1: the sea cannot cancel the certified tangential pump at any rotation phase (sea-screened clock corollary)",
    a_fcc: aFcc,
    orientation,
    chart: "octahedral_seed_rotating_about_(1,1,1)_over_static_fcc_shell",
    exact_decomposition: "Pi_T_sea(beta,phi) = c0(phi) - beta*Q(phi); c0 beta-independent static torque, Q beta-independent velocity-linear coefficient",
    certified: !failed,
    qEnclosure: failed ? null : { lo: cleanNumber(qLo), hi: cleanNumber(qHi) },
    qSupCertified: failed ? null : cleanNumber(qSupCertified),
    c0AbsCertifiedUpperBound: failed ? null : cleanNumber(c0AbsHi),
    minSeaDistanceCertifiedLowerBound: failed ? null : cleanNumber(Math.sqrt(minDist2Lo)),
    boxes,
    pumpC1,
    seaAbsorbsPump: decisive ? false : null,
    nonAbsorberMargin: decisive ? cleanNumber(pumpC1 - qSupCertified) : null,
    c0ZeroCyclicAverage: {
      statement:
        "c0(phi) is odd about the C3-symmetric phases, so its rotation-cycle average vanishes exactly and it transacts no net tangential action (derivation; witnessed to float precision)",
      c0CyclicMeanWitness: witness.c0CyclicMean,
      c0OddnessErrorWitness: witness.c0OddnessError,
    },
    qCyclicMeanWitness: witness.qCyclicMean,
    qSupSampledWitness: witness.qSupSampled,
    releaseInstantRadialWitness: {
      statement: "at beta->0 the octahedral chart reproduces the recorded sh0sea release-instant radial projection",
      recorded_Pi_R_a_fcc_4p25: -0.2833417889031177,
      Pi_R_sh0sea_softening_0p05: witness.piRReleaseSh0seaSoftening,
      Pi_R_zero_softening: witness.piRReleaseZeroSoftening,
    },
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

// ---------- adaptive certification over the declared beta interval ----------

export function certify({
  betaLo = 0.02,
  betaHi = 0.985,
  maxBoxes = 500000,
  minWidth = 1e-8,
  ratioTol = 0.004,
  nuCoeffCap = 0.005,
} = {}) {
  const stack = [[betaLo, betaHi]];
  const failures = [];
  const betaMarks = [0.05, 0.1, 0.25, 0.5, 0.75, 0.9];
  const tubeAtMarks = new Map();
  let boxes = 0;
  let c1 = Infinity;
  let c2 = -Infinity;
  let radialHiMax = -Infinity;
  let minSourceNormalLo = Infinity;
  let maxLagWidth = 0;
  let minWidthUsed = Infinity;
  let tubeMin = Infinity;
  let tubeMinBeta = null;
  const partnerDistFloors = new Map();
  while (stack.length > 0) {
    if (boxes >= maxBoxes) {
      failures.push({ reason: "max_box_budget_exhausted", remaining: stack.length });
      break;
    }
    const [b1, b2] = stack.pop();
    const beta = iv(b1, b2);
    const r = residualEnclosure(beta);
    // A box is accepted only when the tangential enclosure is strictly positive,
    // the radial enclosure is strictly negative, and the tangential enclosure is
    // tight to the declared relative tolerance, so the aggregated band is sharp.
    const ok =
      r != null &&
      r.tangential.lo > 0 &&
      r.radial.hi < 0 &&
      r.tangential.hi - r.tangential.lo <= ratioTol * r.tangential.lo;
    if (!ok) {
      if (b2 - b1 > minWidth) {
        const mid = (b1 + b2) / 2;
        stack.push([b1, mid], [mid, b2]);
        continue;
      }
      failures.push({ reason: "unresolvable_box", betaBox: [b1, b2] });
      continue;
    }
    boxes += 1;
    minWidthUsed = Math.min(minWidthUsed, b2 - b1);
    c1 = Math.min(c1, r.tangential.lo / b2);
    c2 = Math.max(c2, r.tangential.hi / b1);
    radialHiMax = Math.max(radialHiMax, r.radial.hi);
    minSourceNormalLo = Math.min(minSourceNormalLo, r.minSourceNormalLo);
    maxLagWidth = Math.max(maxLagWidth, r.maxLagWidth);
    for (const p of r.perSource) {
      const prev = partnerDistFloors.get(p.psiDeg);
      if (prev == null || p.distLo < prev) partnerDistFloors.set(p.psiDeg, p.distLo);
    }
    const transfer = transferCoefficientsFromBox(b1, b2, r, nuCoeffCap);
    if (transfer.tubeRadius < tubeMin) {
      tubeMin = transfer.tubeRadius;
      tubeMinBeta = (b1 + b2) / 2;
    }
    for (const mark of betaMarks) {
      if (b1 <= mark && mark <= b2) {
        const prev = tubeAtMarks.get(mark);
        if (
          prev == null ||
          transfer.tubeRadius < prev.tubeRadius
        ) {
          tubeAtMarks.set(mark, {
            beta: mark,
            tubeRadius: cleanNumber(transfer.tubeRadius),
            Lx: cleanNumber(transfer.Lx),
            Lv: cleanNumber(transfer.Lv),
          });
        }
      }
    }
  }
  const certified = failures.length === 0;
  const seaScreen = certifySea({ pumpC1: certified ? c1 : null });
  return {
    schema: SCHEMA,
    proofPacketRef: PROOF_PACKET_REF,
    claim_level:
      "priority_only_interval_certificate_conditional_on_declared_rounding_model_not_retained_branch_evidence",
    kernel: {
      field_speed: 1,
      coupling: 1,
      softening: 0,
      weights: "receiver_normal_over_source_normal_unfloored_exactly_as_sampled_scan",
    },
    roundingModel: {
      pad_rel: PAD_REL,
      pad_trig_abs: PAD_TRIG,
      pad_min_abs: PAD_MIN,
      statement:
        "outward widening per operation; sin/cos additionally widened by pad_trig_abs and clamped to [-1,1]; rigorous conditional on faithful-libm sin/cos error below pad_trig_abs on [-2*pi, 2*pi]",
    },
    betaInterval: [betaLo, betaHi],
    ratioTol,
    certified,
    certifiedBand: certified
      ? {
          statement: "c1 * beta <= Phi_tan(beta) <= c2 * beta for all beta in betaInterval",
          c1,
          c2,
        }
      : null,
    certifiedRadialSign: certified
      ? {
          statement: "Phi_rad(beta) < 0 for all beta in betaInterval",
          holds: radialHiMax < 0 && boxes > 0,
          radialUpperBound: radialHiMax,
        }
      : null,
    rootTopology: {
      statement:
        "each directed pair has exactly one causal lag on the sub-field-speed channel; |dG/ds| >= 1 - betaHi",
      transversalityFloor: 1 - betaHi,
      rootCountCap: 1,
      maxLagEnclosureWidth: maxLagWidth,
    },
    floorEngagement: {
      minSourceNormalCertifiedLowerBound: minSourceNormalLo,
      jacobianFloorNeverEngagesFor:
        minSourceNormalLo >= 0.05 ? "entire betaInterval at J_f = 0.05" : "not certified for the full betaInterval at J_f = 0.05",
    },
    transferLemma: certified
      ? {
          statement:
            "Lemma T / Corollary T of the proof packet: inside the certified tube (delta = nu <= tubeRadius, per-box), a released row's along-velocity wake force stays within T = Lx*delta + Lv*nu of the rigid screen and the (S)-failure clock runs unconditionally at theta = 1/2",
          theta: 0.5,
          nuCoefficientCap: nuCoeffCap,
          tubeRadiusMin: cleanNumber(tubeMin),
          tubeRadiusMinBeta: cleanNumber(tubeMinBeta),
          tubeAtBetaMarks: [...tubeAtMarks.values()],
          perPartnerRootDistanceFloors: Object.fromEntries(
            [...partnerDistFloors.entries()].map(([psiDeg, dLo]) => [psiDeg, cleanNumber(dLo)])
          ),
        }
      : null,
    seaScreen,
    boxes,
    minBoxWidth: minWidthUsed,
    failures,
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

// ---------- CLI ----------

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--pretty") out.pretty = true;
    else if (arg === "--beta-lo") out.betaLo = Number(argv[++i]);
    else if (arg === "--beta-hi") out.betaHi = Number(argv[++i]);
    else if (arg === "--max-boxes") out.maxBoxes = Number(argv[++i]);
    else throw new TypeError(`Unknown argument: ${arg}`);
  }
  return out;
}

function runCli() {
  const options = parseArgs(process.argv.slice(2));
  const result = certify(options);
  console.log(JSON.stringify(result, null, options.pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) runCli();
