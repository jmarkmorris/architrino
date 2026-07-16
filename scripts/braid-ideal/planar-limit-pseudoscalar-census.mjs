// Planar-limit pseudoscalar census for the tabled nested-tilted spindle family.
//
// Closure goal (operator, 2026-07-14): in the planar limit of the tabled spindle
// family, compute the polarity-signed quadrupole Q = sum_l sigma_l X_l X_l^T and
// test whether any pseudoscalar contraction against S or the cap azimuthal offset
// survives p -> 0. One nonzero contraction kills brainstorming Entry 40.
//
// WHAT THIS INSTRUMENT IS. A moment census on PRESCRIBED rigid geometry. It
// integrates nothing and evolves nothing, so it is not touched by the central-solver
// quarantine (reference/priorities/app-solver/central-solver-independent-audit-2026-07-12.md).
// It can establish geometric-moment facts about a prescribed configuration and
// NOTHING about whether that configuration is retained. Claim level of its output:
// measured (exact arithmetic on a closed-form geometry), scoped to the census.
//
// GEOMETRY PROVENANCE. The site table comes from buildBraid in
// rigid-tilted-nested-braid-evaluator.mjs, authored separately from this file.
// Site (a,sgn) sits at sgn * R_a * n_a(t) with
//   n_a(t) = (cos a_a cos(w t + th_a), cos a_a sin(w t + th_a), sin a_a),
// polarity pol = sgn. Planar limit = alpha_a -> 0 for every layer, which puts every
// architrino at z = 0.
//
// EVIDENCE INDEPENDENCE. Per AGENTS.md, agreement is evidence only between
// independent sides. Three sides are run here and they are NOT the same code path:
//   (1) BRUTE: generic tensor contraction over the site table, no closed form used.
//   (2) CLOSED FORM: hand-derived expressions (see derivations below), an
//       independent analytic reference in the sense AGENTS.md requires.
//   (3) THEOREM: the sigma_h mirror argument, which predicts the planar-limit answer
//       a priori for ANY radii/phases/stagger. Sides (1) and (2) are checked against
//       each other; side (3) is checked against side (1) on RANDOMIZED geometry,
//       which is what makes it more than a restatement of the family.
//
// CLOSED FORMS DERIVED BY HAND (side 2). With pol = sgn and antipodal sites, each
// layer contributes twice its "+" site, because sgn^k * sgn = sgn^(k+1):
//   dipole      p     = sum_l pol_l X_l          = 2 sum_a R_a n_a
//   quadrupole  Q     = sum_l pol_l X_l X_l^T    = 0 IDENTICALLY (see below)
//   octupole    M3    = sum_l pol_l X_l^{(x)3}   = 2 sum_a R_a^3 n_a^{(x)3}
// Q vanishes identically because X X^T is EVEN in X while pol is ODD under the
// antipodal swap: the two sites of a layer contribute (+1)(+R n)(+R n)^T and
// (-1)(-R n)(-R n)^T = -R^2 n n^T, which cancel exactly. This is a property of
// antipodal neutral binaries, independent of the planar limit.

import { buildBraid } from "./rigid-tilted-nested-braid-evaluator.mjs";

export const SCHEMA = "planar_limit_pseudoscalar_census.v1";
export const ENTRY_REF = "reference/priorities/braid-archive/braid-ideal/brainstorming.md#entry-40";

// ---------------------------------------------------------------- site positions
// Per the buildBraid parameterization documented in the evaluator header.
function sitePos(s, t, w) {
  const a = w * t + s.th;
  const ca = Math.cos(s.alpha);
  return [
    s.sgn * s.R * ca * Math.cos(a),
    s.sgn * s.R * ca * Math.sin(a),
    s.sgn * s.R * Math.sin(s.alpha),
  ];
}

// ------------------------------------------------------- side 1: BRUTE contraction
// Generic polarity-signed moment of rank k: M^(k)_{i1..ik} = sum_l pol_l X_i1..X_ik.
// Returned flat, indexed by base-3 digits, so no rank-specific code is involved.
export function signedMoment(sites, t, w, rank) {
  const n = 3 ** rank;
  const M = new Array(n).fill(0);
  for (const s of sites) {
    const X = sitePos(s, t, w);
    for (let idx = 0; idx < n; idx++) {
      let prod = s.pol;
      let r = idx;
      for (let d = 0; d < rank; d++) {
        prod *= X[r % 3];
        r = Math.floor(r / 3);
      }
      M[idx] += prod;
    }
  }
  return M;
}

// Contract a rank-k moment with k copies of a vector: M(v,v,..,v).
function contractAll(M, rank, v) {
  const n = 3 ** rank;
  let acc = 0;
  for (let idx = 0; idx < n; idx++) {
    let w = M[idx];
    let r = idx;
    for (let d = 0; d < rank; d++) {
      w *= v[r % 3];
      r = Math.floor(r / 3);
    }
    acc += w;
  }
  return acc;
}

function matIdx(i, j) {
  return i + 3 * j;
}

// The full census of scalars this configuration can form from its polarity-signed
// moments and the spin axis S, tagged by (C,P) character. Only P-ODD entries are
// pseudoscalars and therefore chirality candidates.
//   p.S            : rank-1 moment . axial S   -> P-odd, C-odd  => PSEUDOSCALAR (this is chi)
//   S.Q.S, tr Q    : rank-2 moment              -> P-EVEN       => not a chirality
//   M3(S,S,S)      : rank-3 moment . 3 axial S  -> P-odd, C-odd => PSEUDOSCALAR
//   (p x S).?      : vanishes, p and S both axial-aligned on the channel
export function census(cfg = {}, { t = 0 } = {}) {
  const braid = buildBraid(cfg);
  const { sites, omega } = braid;
  const S = [0, 0, 1]; // spin axis: the rigid rotation axis of the family

  const M1 = signedMoment(sites, t, omega, 1);
  const M2 = signedMoment(sites, t, omega, 2);
  const M3 = signedMoment(sites, t, omega, 3);

  const pDotS = contractAll(M1, 1, S);
  const pTransverse = Math.hypot(M1[0], M1[1]);
  const SQS = contractAll(M2, 2, S);
  const trQ = M2[matIdx(0, 0)] + M2[matIdx(1, 1)] + M2[matIdx(2, 2)];
  const QmaxAbs = Math.max(...M2.map(Math.abs));
  const M3SSS = contractAll(M3, 3, S);
  const M3maxAbs = Math.max(...M3.map(Math.abs));

  return {
    omega,
    // --- P-ODD: the only chirality candidates ---
    pseudoscalars: {
      pDotS, // chi = sign(p.S)
      M3SSS, // first surviving pseudoscalar if p -> 0
    },
    // --- P-EVEN: cannot carry chirality at any magnitude ---
    parityEven: { SQS, trQ, QmaxAbs },
    diagnostics: { pTransverse, M3maxAbs },
  };
}

// ------------------------------------------------- side 2: CLOSED-FORM reference
// Independent analytic expressions, derived by hand in the header, evaluated
// WITHOUT touching signedMoment/contractAll.
export function closedForm(cfg = {}, { t = 0 } = {}) {
  const { qI = 0.5, qO = 1.6, alphaI = 0, alphaM = 0, alphaO = 0, betaM = 1.0,
    phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = cfg;
  const RM = 1;
  const omega = (betaM * 1) / (RM * Math.cos(alphaM));
  const layers = [
    { R: qI * RM, alpha: alphaI, th: phases[0] },
    { R: RM, alpha: alphaM, th: phases[1] },
    { R: qO * RM, alpha: alphaO, th: phases[2] },
  ];
  let pz = 0, px = 0, py = 0, m3zzz = 0;
  for (const L of layers) {
    const phi = omega * t + L.th;
    const sa = Math.sin(L.alpha), ca = Math.cos(L.alpha);
    pz += 2 * L.R * sa;
    px += 2 * L.R * ca * Math.cos(phi);
    py += 2 * L.R * ca * Math.sin(phi);
    m3zzz += 2 * L.R ** 3 * sa ** 3;
  }
  // Q vanishes identically for antipodal pol=sgn binaries (header derivation).
  return { pDotS: pz, pTransverse: Math.hypot(px, py), M3SSS: m3zzz, QpredictedZero: 0 };
}

// ------------------------------------------------------- side 3: sigma_h THEOREM
// THEOREM. In the exact planar limit (alpha_a = 0 for all a) every architrino has
// z = 0 for all time, and every velocity has v_z = 0. The reflection
// sigma_h : (x,y,z) -> (x,y,-z) therefore fixes every position, every velocity,
// every polarity, AND the spin axis S (an axial vector along the mirror normal is
// preserved: S_z -> det(R) * R_zz * S_z = (-1)(-1) S_z = +S_z). So sigma_h is an
// exact symmetry of the whole planar history, not just of one snapshot.
// sigma_h is IMPROPER. Every pseudoscalar is odd under improper operations. A
// pseudoscalar that is invariant under a symmetry of the configuration and odd
// under that same operation must equal its own negative, hence ZERO -- at every
// moment order, for any radii, any phases, any cap azimuthal offset.
// The theorem's reach: it is about the geometry+history being coplanar. It says
// nothing about whether the planar branch is RETAINED.
//
// This function does not compute the prediction; it states it. The randomized test
// below is what gives it teeth.
export const THEOREM_PREDICTION = Object.freeze({
  planarLimitAllPseudoscalarsVanish: true,
  reason: "sigma_h is an improper symmetry of the coplanar configuration, including S",
  scope: "geometric moments of prescribed coplanar geometry; says nothing about retention",
});

// Randomized adversarial test of the theorem: throw generic radii, tilts, phases,
// and an explicit cap azimuthal offset at the census and check that (a) away from
// the plane the pseudoscalars are generically NONZERO (the instrument can see
// chirality at all -- a live-wire check), and (b) at alpha = 0 they vanish for
// EVERY draw regardless of stagger.
export function randomizedTheoremTest({ draws = 400, seed = 20260714 } = {}) {
  let s = seed;
  const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;

  let maxPlanarPseudoscalar = 0;
  let minTiltedPseudoscalar = Infinity;
  let liveWireDraws = 0;
  let maxPlanarQ = 0;

  for (let d = 0; d < draws; d++) {
    const qI = 0.2 + 1.4 * rnd();
    const qO = 0.2 + 2.4 * rnd();
    // Explicit cap azimuthal offset: a generic stagger, NOT the balanced 120 deg.
    const offset = 2 * Math.PI * rnd();
    const phases = [2 * Math.PI * rnd(), 2 * Math.PI * rnd(), 2 * Math.PI * rnd() + offset];
    const t = 10 * rnd();

    const planar = census({ qI, qO, alphaI: 0, alphaM: 0, alphaO: 0, phases }, { t });
    maxPlanarPseudoscalar = Math.max(
      maxPlanarPseudoscalar,
      Math.abs(planar.pseudoscalars.pDotS),
      Math.abs(planar.pseudoscalars.M3SSS),
    );
    maxPlanarQ = Math.max(maxPlanarQ, planar.parityEven.QmaxAbs);

    // Tilted control: the instrument must SEE a pseudoscalar when one exists.
    const aI = 0.15 + 1.2 * rnd();
    const aO = 0.15 + 1.2 * rnd();
    const tilted = census({ qI, qO, alphaI: aI, alphaM: 0, alphaO: aO, phases }, { t });
    const tp = Math.abs(tilted.pseudoscalars.pDotS);
    if (tp > 1e-6) {
      liveWireDraws++;
      minTiltedPseudoscalar = Math.min(minTiltedPseudoscalar, tp);
    }
  }

  return {
    draws,
    maxPlanarPseudoscalar,
    maxPlanarQ,
    liveWireDraws,
    minTiltedPseudoscalar,
    theoremHolds: maxPlanarPseudoscalar < 1e-12,
    instrumentIsLive: liveWireDraws > draws * 0.9,
  };
}

// Parity check: brute census vs hand-derived closed form on generic tilted geometry.
export function parityCheck({ draws = 200, seed = 987654321 } = {}) {
  let s = seed;
  const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
  let worst = 0;
  for (let d = 0; d < draws; d++) {
    const cfg = {
      qI: 0.2 + 1.4 * rnd(),
      qO: 0.2 + 2.4 * rnd(),
      alphaI: -1.2 + 2.4 * rnd(),
      alphaM: 0,
      alphaO: -1.2 + 2.4 * rnd(),
      phases: [2 * Math.PI * rnd(), 2 * Math.PI * rnd(), 2 * Math.PI * rnd()],
    };
    const t = 10 * rnd();
    const b = census(cfg, { t });
    const c = closedForm(cfg, { t });
    worst = Math.max(
      worst,
      Math.abs(b.pseudoscalars.pDotS - c.pDotS),
      Math.abs(b.pseudoscalars.M3SSS - c.M3SSS),
      Math.abs(b.diagnostics.pTransverse - c.pTransverse),
      b.parityEven.QmaxAbs, // closed form predicts Q == 0 identically
    );
  }
  return { draws, worstAbsDiff: worst, agrees: worst < 1e-12 };
}

// Scaling law: how the pseudoscalars approach zero as the family flattens.
// Reports the fitted exponent of |pseudoscalar| ~ alpha^n as alpha -> 0.
export function flatteningScaling({ qI = 0.5, qO = 1.6, alphas = [0.4, 0.2, 0.1, 0.05, 0.025] } = {}) {
  const rows = alphas.map((a) => {
    const c = census({ qI, qO, alphaI: a, alphaM: 0, alphaO: a });
    return {
      alpha: a,
      pDotS: c.pseudoscalars.pDotS,
      M3SSS: c.pseudoscalars.M3SSS,
      chiSign: Math.sign(c.pseudoscalars.pDotS),
    };
  });
  const slope = (key) => {
    const a = rows.map((r) => Math.log(r.alpha));
    const y = rows.map((r) => Math.log(Math.abs(r[key])));
    const n = a.length;
    const ma = a.reduce((x, z) => x + z, 0) / n;
    const my = y.reduce((x, z) => x + z, 0) / n;
    let num = 0, den = 0;
    for (let i = 0; i < n; i++) { num += (a[i] - ma) * (y[i] - my); den += (a[i] - ma) ** 2; }
    return num / den;
  };
  return { rows, exponentPDotS: slope("pDotS"), exponentM3SSS: slope("M3SSS") };
}

export function report() {
  return {
    schema: SCHEMA,
    entryRef: ENTRY_REF,
    theorem: THEOREM_PREDICTION,
    parityCheck: parityCheck(),
    randomizedTheoremTest: randomizedTheoremTest(),
    flatteningScaling: flatteningScaling(),
    tabledChampion: census({ qI: 0.5, qO: 1.6, alphaI: 0.4, alphaM: 0, alphaO: 0.9 }),
    tabledPlanar: census({ qI: 0.5, qO: 1.6, alphaI: 0, alphaM: 0, alphaO: 0 }),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(report(), null, 2));
}
