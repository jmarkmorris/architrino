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

export const SCHEMA = "planar_tangential_screen_interval_certificate.v0";
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
export function residualEnclosure(beta) {
  let tan = iv(0);
  let rad = iv(0);
  let minSourceNormalLo = Infinity;
  let maxLagWidth = 0;
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
  }
  return { tangential: tan, radial: rad, minSourceNormalLo, maxLagWidth };
}

// ---------- adaptive certification over the declared beta interval ----------

export function certify({
  betaLo = 0.02,
  betaHi = 0.985,
  maxBoxes = 500000,
  minWidth = 1e-8,
  ratioTol = 0.02,
} = {}) {
  const stack = [[betaLo, betaHi]];
  const failures = [];
  let boxes = 0;
  let c1 = Infinity;
  let c2 = -Infinity;
  let radialHiMax = -Infinity;
  let minSourceNormalLo = Infinity;
  let maxLagWidth = 0;
  let minWidthUsed = Infinity;
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
  }
  const certified = failures.length === 0;
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
