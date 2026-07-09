// Discrete-event orbit integrator (item 24 step 2b; spec Section 35).
//
// The Section 34 event study reduced the click to a converged EVENT MAP: at the
// rail, a click absorbs a finite momentum quantum q along the velocity (the
// discreteness stand-in for the stratum / h_act ledger scale) and delivers a
// radial kick by the measured lever law ratio(vr) = A + B*vr (A = 0.013,
// B = 1.02; inward when the site moves outward). Between events the site coasts
// sub-rail under the modeled partner channel only (pump along velocity
// a_p = kappa*c1*beta/r^2; radial support fraction s of centripetal need).
// Question: does the eccentric limit cycle RECTIFY (clicks clustered on the
// outward phase harvesting inward kicks) into a confined orbit at s < 1, and at
// what breathing amplitude and click cadence? The continuum sliding limit
// (q -> 0) provably escapes at constant outward drift; discreteness is the
// candidate rectifier under test.
// Reduced reference model. NOT evidence; fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "spindle_rail_discrete_event_orbit_integrator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_reduced_reference_integrator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

export function integrateDiscreteOrbit({
  kappa = 0.315, c1 = 2.881, support = 0.76,
  ratioA = 0.013, ratioB = 1.02,
  q = 0.01, // click momentum quantum (stratum / h_act stand-in)
  r0 = 1, beta0 = 0.97, vr0 = 0, dt = 5e-4, duration = 200,
} = {}) {
  let r = r0, vr = vr0, vphi = Math.sqrt(Math.max(beta0 * beta0 - vr0 * vr0, 0)) * cf;
  const n = Math.round(duration / dt);
  let clicks = 0, clickVrSum = 0, radialImpulseSum = 0;
  const rec = { t: [], r: [], beta: [], vr: [] };
  const sampleEvery = Math.max(1, Math.round(0.05 / dt));
  let phase = 0;
  for (let k = 0; k < n; k++) {
    const beta = Math.hypot(vr, vphi) / cf;
    // discrete click(s): while at/above the rail, absorb one quantum per event
    let b = beta, guard = 0;
    while (b >= 1 && guard < 200) {
      const ratio = ratioA + ratioB * vr;
      // impulse: -q along velocity, -ratio*q along radial-out
      const ux = vr / b, uy = vphi / b; // velocity direction in (r, phi) components
      vr -= q * ux + ratio * q;
      vphi -= q * uy;
      clicks++; clickVrSum += vr; radialImpulseSum += -ratio * q;
      b = Math.hypot(vr, vphi) / cf; guard++;
    }
    const beta2 = Math.hypot(vr, vphi) / cf;
    const aP = (kappa * c1 * beta2) / (r * r);
    const Fr = (vphi * vphi) / r - (support * beta2 * beta2 * cf * cf) / r + (aP * vr) / (beta2 || 1e-12);
    const Fphi = (aP * vphi) / (beta2 || 1e-12) - (vr * vphi) / r;
    vr += Fr * dt; vphi += Fphi * dt;
    r += vr * dt; phase += (vphi / r) * dt;
    if (k % sampleEvery === 0) { rec.t.push(k * dt); rec.r.push(r); rec.beta.push(beta2); rec.vr.push(vr); }
    if (r > 5 || r < 0.1) break; // escape/collapse guard
  }
  const i0 = Math.floor(rec.t.length * 0.5);
  const tail = (a) => a.slice(i0);
  const mean = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
  const rT = tail(rec.r), vrT = tail(rec.vr), betaT = tail(rec.beta);
  const rotations = phase / (2 * Math.PI);
  return {
    params: { kappa, c1, support, q, dt, duration },
    escaped: r > 5, collapsed: r < 0.1, tEnd: rec.t[rec.t.length - 1],
    rEnd: r, rMeanTail: mean(rT), rMinTail: Math.min(...rT), rMaxTail: Math.max(...rT),
    breathingAmpTail: (Math.max(...rT) - Math.min(...rT)) / 2,
    vrMeanTail: mean(vrT), betaMeanTail: mean(betaT),
    rDriftPerRotation: rotations > 0.5 ? (rT[rT.length - 1] - rT[0]) / (rotations * (rT.length / rec.r.length)) : null,
    clicks, clicksPerRotation: rotations > 0 ? clicks / rotations : null,
    meanClickVr: clicks ? clickVrSum / clicks : null,
    rotations,
    series: rec,
  };
}

export function diagnosticReport() {
  const { series, ...s } = integrateDiscreteOrbit({ duration: 60 });
  return { schema: SCHEMA, specPacketRef: SPEC_PACKET_REF, smoke: s, ...FAIL_CLOSED };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  process.stdout.write(JSON.stringify(diagnosticReport(), null, process.argv.includes("--pretty") ? 2 : 0) + "\n");
}
