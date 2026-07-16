// Cross-hit hinge coexistence diagnostic.
//
// Closure goal (2026-07-08): on a two-frequency (inner-binary + outer-shell)
// configuration, are the two necessary conditions for a cross-hit click absorber
// simultaneously satisfiable, or mutually exclusive?
//   (A) enough clicks:      N_click >= 2*pi*c1*beta_out  (~18*beta_out; spec Sec 8)
//   (B) amplitude straddle:  A_ij = v_j . rhat_ij actually reaches c_f
//                            (requires the inner source rim fraction beta_in >= 1)
// evaluated over admissible inner rim fraction beta_in.
//
// Method: build 3 outer sites (radius R_out, frequency w_out) and 3 inner sites
// (radius R_in = q R_out, frequency w_in = r w_out). The pump acts on the OUTER
// channel, so the absorber must click on OUTER receivers; count crossings of the
// alignment scalar A_ij through c_f for directed pairs (receiver outer, source
// inner) over one outer rotation. Same-shell pairs share one frequency and give a
// time-constant A_ij (spec Section 8 Result 1), so they contribute nothing and are
// excluded. Per realized crossing we also measure the local chord L and rate
// |dA/dt| and evaluate the spec Section 2.2 finite impulse as an indicative total.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "cross_hit_hinge_coexistence_diagnostic.v0";
export const SPEC_PACKET_REF =
  "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";

export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false,
  acceptedSameLevelBranchClaim: false,
  retainedBranch: null,
  scoreMovement: "no_score_increase",
  acceptedSeedPathCertificate: false,
  authority: "priority_only_diagnostic_not_accepted_evidence",
});

const cf = 1;
const C1 = 2.881;
const TWO_PI_C1 = 2 * Math.PI * C1; // ~18.10

function pos(s, t) { const a = s.w * t + s.phi; return [s.R * Math.cos(a), s.R * Math.sin(a)]; }
function vel(s, t) { const a = s.w * t + s.phi; return [-s.R * s.w * Math.sin(a), s.R * s.w * Math.cos(a)]; }
function align(recv, src, t) {
  const pi = pos(recv, t), pj = pos(src, t);
  const d = [pi[0] - pj[0], pi[1] - pj[1]];
  const L = Math.hypot(d[0], d[1]);
  if (L < 1e-9) return null;
  const vj = vel(src, t);
  return { A: (vj[0] * d[0] + vj[1] * d[1]) / L, sep: L };
}

// Measure realized clicks and indicative impulse for a two-shell config.
export function measure({ r = 2.5, q = 0.44, betaOut = 0.98, Rout = 1, kappa = 1, chi = 1, samples = 60000 } = {}) {
  const wout = (betaOut * cf) / Rout;
  const Rin = q * Rout;
  const win = r * wout;
  const betaIn = (win * Rin) / cf; // = r*betaOut*q
  const outer = [0, 1, 2].map((k) => ({ R: Rout, w: wout, phi: (2 * Math.PI * k) / 3 }));
  const inner = [0, 1, 2].map((k) => ({ R: Rin, w: win, phi: (2 * Math.PI * k) / 3 + 0.2 }));
  const tRot = (2 * Math.PI) / wout;
  const dt = tRot / samples;
  const mu0 = Rout; // pair-persistence scale
  let nClick = 0, straddlePairs = 0, totalImpulse = 0;
  let maxAreached = -Infinity;
  for (const recv of outer) {
    for (const src of inner) {
      let prev = null, prevT = null, pairCross = 0;
      for (let sN = 0; sN <= samples; sN++) {
        const t = sN * dt;
        const al = align(recv, src, t);
        if (al === null) { prev = null; continue; }
        maxAreached = Math.max(maxAreached, al.A);
        if (prev !== null) {
          const f0 = prev.A - cf, f1 = al.A - cf;
          if (f0 === 0 || (f0 < 0) !== (f1 < 0)) {
            pairCross += 1;
            const L = al.sep;
            const dAdt = Math.abs((al.A - prev.A) / (t - prevT)); // fold rate |d D_s/dt|
            if (dAdt > 1e-9) {
              // spec Section 2.2 finite impulse |Dp| = chi*kappa*rc^-2*sqrt(2*mu0/a)
              totalImpulse += (chi * kappa) / (L * L) * Math.sqrt((2 * mu0) / dAdt);
            }
          }
        }
        prev = al; prevT = t;
      }
      nClick += pairCross;
      if (pairCross > 0) straddlePairs += 1;
    }
  }
  const pumpPerRotation = TWO_PI_C1 * kappa / (cf * cf * Rout); // beta-independent
  const nClickRequired = TWO_PI_C1 * betaOut;
  const totalDbeta = totalImpulse / cf;
  return {
    r, q, betaOut, betaIn, Rout, Rin, wout, win,
    nClick, straddlePairs, maxAreached,
    amplitudeStraddles: maxAreached >= cf,
    nClickRequired, clearsClickCount: nClick >= nClickRequired,
    pumpPerRotation, totalDbeta, clearsImpulse: totalDbeta >= pumpPerRotation,
    coexists: nClick >= nClickRequired && maxAreached >= cf,
  };
}

// Saturation check: is the impulse total roughly frequency-ratio-independent at
// fixed (q, betaOut) once beta_in >= 1? (analytic prediction: total ~ r-independent
// if fold curvature a ~ source centripetal accel; grows ~sqrt(r) if a ~ |dA/dt|.)
export function ratioScan({ q = 0.44, betaOut = 0.98, ratios = [1.5, 2, 3, 4, 6, 8] } = {}) {
  return ratios.map((r) => {
    const m = measure({ r, q, betaOut });
    return { r, betaIn: m.betaIn, nClick: m.nClick, totalDbeta: m.totalDbeta, clearsClickCount: m.clearsClickCount, straddles: m.amplitudeStraddles };
  });
}

// Radius-ratio scan: find where the click count / impulse clears the pump, and the
// beta_in cost there, at a ratio large enough that beta_in >= 1.
export function radiusScan({ betaOut = 0.98, qs = [0.2, 0.3, 0.44, 0.6, 0.8], ratioFor = (q) => Math.max(2.5, 1.2 / q) } = {}) {
  return qs.map((q) => {
    const r = ratioFor(q);
    const m = measure({ r, q, betaOut });
    return { q, r, betaIn: m.betaIn, nClick: m.nClick, nClickRequired: m.nClickRequired, clearsClickCount: m.clearsClickCount, totalDbeta: m.totalDbeta, pump: m.pumpPerRotation, clearsImpulse: m.clearsImpulse, straddles: m.amplitudeStraddles };
  });
}

// Coexistence map: for near-ceiling beta_out, search (r,q) for the region where
// both necessary conditions hold, and report the minimum admissible beta_in.
export function coexistenceMap({ betaOut = 0.98 } = {}) {
  const rs = [1.5, 2, 2.5, 3, 4, 6];
  const qs = [0.2, 0.3, 0.4, 0.5, 0.6, 0.75];
  const hits = [];
  for (const r of rs) for (const q of qs) {
    const m = measure({ r, q, betaOut });
    if (m.coexists) hits.push({ r, q, betaIn: m.betaIn, nClick: m.nClick, totalDbeta: m.totalDbeta, clearsImpulse: m.clearsImpulse });
  }
  const minBetaIn = hits.length ? Math.min(...hits.map((h) => h.betaIn)) : null;
  return { betaOut, coexistenceRegionNonEmpty: hits.length > 0, hitCount: hits.length, minAdmissibleBetaIn: minBetaIn, hits };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA,
    specPacketRef: SPEC_PACKET_REF,
    referencePoint: measure({}),
    ratioScan: ratioScan({}),
    radiusScan: radiusScan({}),
    coexistenceMap: coexistenceMap({}),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const pretty = process.argv.includes("--pretty");
  process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n");
}
