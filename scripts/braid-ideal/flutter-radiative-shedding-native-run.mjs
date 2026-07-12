// Section 94: native retained-history barrel release with a relative-tilt seed
// and retarded far-field angular-momentum-flux reconstruction.
//
// This is a priority-only diagnostic. It reuses the production retained-history
// release and the Section 82 canonical antisymmetric field
// E_anti = E_full - E_static. The unperturbed barrel is run in parallel so the
// tilt-sector flux is isolated by E = E_0 + delta E:
//   Phi_total = Phi_0 + Phi_cross + Phi_tilt.
// No retained branch or score movement is authorized by this script.

import { fileURLToPath } from "node:url";
import {
  DECLARED,
  FAIL_CLOSED,
  runRelease,
  rigidVelocity,
  selectTabledRow,
} from "./spindle-braid-native-retained-history-confirmation-run.mjs";
import {
  SELF_EQUILIBRATED_V5,
  certifiedCausalRoots,
} from "./spindle-support-ratio-targeted-search.mjs";
import { residuals } from "./spindle-braid-screw-drift-evaluator.mjs";

export const SCHEMA = "flutter_radiative_shedding_native_run.v0";
const TWO_PI = 2 * Math.PI;
const D = Math.PI / 180;

export function barrelGeometry() {
  const g = SELF_EQUILIBRATED_V5.geo;
  const rho = Math.cos(g.alphaM);
  const layers = [
    ["I", g.qI, g.alphaI, g.thetaI],
    ["M", 1, g.alphaM, (2 * Math.PI) / 3],
    ["O", g.qO, g.alphaO, g.thetaO],
  ].map(([name, R0, alpha0, theta]) => {
    const z = R0 * Math.sin(alpha0);
    const R = Math.hypot(rho, z);
    return { name, R, alpha: Math.atan2(z, rho), theta };
  });
  return {
    rho,
    omega: 1 / rho,
    layers,
    geo: {
      qI: layers[0].R,
      qO: layers[2].R,
      alphaI: layers[0].alpha,
      alphaM: layers[1].alpha,
      alphaO: layers[2].alpha,
      thetaI: layers[0].theta,
      thetaO: layers[2].theta,
    },
  };
}

function historyVelocityAt(history, tE) {
  if (tE <= 0 || history.ts.length === 0) return rigidVelocity(history.site, tE);
  const dt = DECLARED.timeStep;
  let k = Math.min(history.ts.length - 1, Math.max(0, Math.floor(tE / dt)));
  while (k > 0 && history.ts[k] > tE) k -= 1;
  while (k < history.ts.length - 1 && history.ts[k + 1] <= tE) k += 1;
  return history.vs[k];
}

function sourceRowsAt(X, tObs, run, scanN) {
  const rows = [];
  let rootsStable = true, maxResidual = 0, tangentRoots = 0, inactiveRootGaps = 0;
  const lastT = run.histories[0].ts.at(-1) ?? 0;
  const extent = Math.max(...run.histories.map((h) => h.maxRadiusSeen)) + 1;
  for (let j = 0; j < run.sites.length; j += 1) {
    const h = run.histories[j];
    const cert = certifiedCausalRoots(X, (te) => h.positionAt(te), tObs, {
      cf: DECLARED.fieldSpeed,
      scanN,
      refineFactor: 2,
      tol: 2e-8,
      jacobianFloor: 2e-4,
      windowLo: tObs - Math.hypot(...X) - extent,
      windowHi: Math.min(lastT, tObs - 1e-9),
    });
    rootsStable &&= cert.rootCountStable;
    maxResidual = Math.max(maxResidual, cert.maxResidual);
    tangentRoots += cert.tangentRoots.length;
    inactiveRootGaps += cert.inactiveRootGaps.length;
    for (const te of cert.roots) {
      const p = h.positionAt(te), v = historyVelocityAt(h, te);
      const dx = [X[0] - p[0], X[1] - p[1], X[2] - p[2]];
      const r = Math.hypot(...dx);
      if (!(r > 0)) continue;
      const rh = dx.map((x) => x / r);
      const Ds = DECLARED.fieldSpeed - (v[0] * rh[0] + v[1] * rh[1] + v[2] * rh[2]);
      rows.push({ pol: run.sites[j].pol, r, rh, Ds });
    }
  }
  return { rows, rootsStable, maxResidual, tangentRoots, inactiveRootGaps };
}

function antiField(rows, soft, kappa) {
  const E = [0, 0, 0];
  for (const q of rows) {
    const full = q.Ds / (q.Ds * q.Ds + soft * soft);
    const stat = 1 / (1 + soft * soft);
    const w = kappa * q.pol * (full - stat) / (q.r * q.r);
    for (let c = 0; c < 3; c += 1) E[c] += w * q.rh[c];
  }
  return E;
}

function sub(a, b) { return a.map((x, i) => x - b[i]); }
function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function fluxForField(cells, pick) {
  const Phi = [0, 0, 0];
  for (const cell of cells) {
    const E = pick(cell);
    const Er = E[0] * cell.rHat[0] + E[1] * cell.rHat[1] + E[2] * cell.rHat[2];
    const torque = cross(cell.X, E.map((x) => Er * x));
    for (let c = 0; c < 3; c += 1) Phi[c] += torque[c] * cell.dA;
  }
  return Phi;
}

export function retardedFluxSlice({ baseRun, tiltRun, sourceTime, radius, softSweep, kappa, Ntheta, Nphi, scanN }) {
  const cells = [];
  let rootsStable = true, maxResidual = 0, tangentRoots = 0, inactiveRootGaps = 0;
  const tObs = radius + sourceTime;
  for (let it = 0; it < Ntheta; it += 1) {
    const ct = -1 + (2 * (it + 0.5)) / Ntheta;
    const st = Math.sqrt(Math.max(0, 1 - ct * ct));
    for (let ip = 0; ip < Nphi; ip += 1) {
      const ph = (2 * Math.PI * (ip + 0.5)) / Nphi;
      const rHat = [st * Math.cos(ph), st * Math.sin(ph), ct];
      const X = rHat.map((x) => radius * x);
      const b = sourceRowsAt(X, tObs, baseRun, scanN);
      const q = sourceRowsAt(X, tObs, tiltRun, scanN);
      rootsStable &&= b.rootsStable && q.rootsStable;
      maxResidual = Math.max(maxResidual, b.maxResidual, q.maxResidual);
      tangentRoots += b.tangentRoots + q.tangentRoots;
      inactiveRootGaps += b.inactiveRootGaps + q.inactiveRootGaps;
      cells.push({ X, rHat, dA: radius * radius * (2 / Ntheta) * (2 * Math.PI / Nphi), baseRows: b.rows, tiltRows: q.rows });
    }
  }
  const sweep = softSweep.map((soft) => {
    for (const cell of cells) {
      cell.E0 = antiField(cell.baseRows, soft, kappa);
      cell.E = antiField(cell.tiltRows, soft, kappa);
      cell.dE = sub(cell.E, cell.E0);
    }
    const baseline = fluxForField(cells, (c) => c.E0);
    const total = fluxForField(cells, (c) => c.E);
    const pureTilt = fluxForField(cells, (c) => c.dE);
    const crossTerm = sub(sub(total, baseline), pureTilt);
    const isolated = sub(total, baseline);
    return { soft, baseline, crossTerm, pureTilt, isolated, total };
  });
  return { radius, sourceTime, observationTime: tObs, sweep, rootsStable, maxResidual, tangentRoots, inactiveRootGaps };
}

function summarizeAmplitude(run, stride = 200) {
  const rows = run.diag.filter((_, i) => i % stride === 0 || i === run.diag.length - 1).map((r) => ({
    t: r.t,
    rotations: r.t / TWO_PI,
    tiltDeg: r.axisRow.axisTiltDeg,
    azimuthDeg: r.axisRow.axisAzimuthDeg,
    omegaFit: r.axisRow.omegaFit,
    betaMax: Math.max(r.betaI, r.betaM, r.betaO),
    maxShapeDeviation: r.maxShapeDeviation,
  }));
  const tilts = rows.map((r) => r.tiltDeg).filter(Number.isFinite);
  return {
    rows,
    maxTiltDeg: Math.max(...tilts),
    finalTiltDeg: tilts.at(-1),
    finalOmegaFit: rows.at(-1)?.omegaFit ?? null,
    finalMaxShapeDeviation: rows.at(-1)?.maxShapeDeviation ?? null,
    halted: run.halted,
  };
}

function logSlope(rows, value) {
  const valid = rows.map((r) => [Math.log(r.radius), Math.log(value(r))]).filter(([, y]) => Number.isFinite(y));
  if (valid.length < 2) return null;
  const mx = valid.reduce((a, r) => a + r[0], 0) / valid.length;
  const my = valid.reduce((a, r) => a + r[1], 0) / valid.length;
  let xy = 0, xx = 0;
  for (const [x, y] of valid) { xy += (x - mx) * (y - my); xx += (x - mx) ** 2; }
  return xy / xx;
}

function fluxSummary(flux, softSweep) {
  return flux.map((timeRows) => {
    const bySoft = softSweep.map((soft, k) => {
      const rows = timeRows.map((r) => {
        const q = r.sweep[k];
        return {
          radius: r.radius,
          isolated: q.isolated,
          isolatedTransverse: Math.hypot(q.isolated[0], q.isolated[1]),
          isolatedNorm: Math.hypot(...q.isolated),
          pureTiltNorm: Math.hypot(...q.pureTilt),
        };
      });
      return {
        soft,
        rows,
        isolatedTransverseSlope: logSlope(rows, (r) => r.isolatedTransverse),
        isolatedNormSlope: logSlope(rows, (r) => r.isolatedNorm),
        outerIsolatedNorm: rows.at(-1).isolatedNorm,
      };
    });
    const outer = bySoft.map((r) => r.outerIsolatedNorm).filter((x) => x > 0);
    return {
      sourceTime: timeRows[0].sourceTime,
      bySoft,
      outerRegulatorRatio: Math.max(...outer) / Math.min(...outer),
    };
  });
}

export function runFlutterRadiativeShedding({
  rotations = 3,
  tiltDeg = 0.1,
  dt = null,
  nativeSoft = null,
  radii = [12, 16, 24, 32],
  softSweep = [0.08, 0.04, 0.02],
  Ntheta = 6,
  Nphi = 12,
  scanN = 96,
  measureFlux = true,
} = {}) {
  selectTabledRow(7);
  if (dt != null) DECLARED.timeStep = dt;
  if (nativeSoft != null) DECLARED.soft = nativeSoft;
  const barrel = barrelGeometry();
  DECLARED.layers = barrel.layers;
  DECLARED.omega = barrel.omega;
  DECLARED.staticPairSea.enabled = false;
  DECLARED.bareGate.enabled = false;
  DECLARED.row8.enabled = false;
  DECLARED.memoryWindowRotations = Math.max(DECLARED.memoryWindowRotations, 8);
  const kappa = residuals({ u: 0, cTrans: 1, geo: barrel.geo }, { soft: DECLARED.soft }).kappaStar;
  const baseRun = runRelease({ rotations, kappa, recordRotations: [] });
  const tiltRun = runRelease({
    rotations,
    kappa,
    recordRotations: [],
    tiltPerturbation: { axis: "x", layerAngles: { I: tiltDeg * D, M: -tiltDeg * D, O: 0 } },
  });
  const commonEnd = Math.min(baseRun.diag.at(-1)?.t ?? 0, tiltRun.diag.at(-1)?.t ?? 0);
  const sourceTimes = [0.2, 0.5, 0.8].map((f) => f * commonEnd).filter((t) => t > 0);
  const flux = measureFlux ? sourceTimes.map((sourceTime) => radii.map((radius) => retardedFluxSlice({
    baseRun, tiltRun, sourceTime, radius, softSweep, kappa, Ntheta, Nphi, scanN,
  }))) : [];
  const amplitude = summarizeAmplitude(tiltRun);
  const boundedLimitCycle = !tiltRun.halted && amplitude.maxTiltDeg < 30 &&
    amplitude.finalTiltDeg < amplitude.maxTiltDeg && amplitude.finalMaxShapeDeviation < 1 && amplitude.finalOmegaFit > 0.5 * barrel.omega;
  const summarizedFlux = measureFlux ? fluxSummary(flux, softSweep) : [];
  const finalSlice = sourceTimes.at(-1);
  const outerRadius = radii.at(-1);
  const resolutionWitness = measureFlux ? retardedFluxSlice({
    baseRun, tiltRun, sourceTime: finalSlice, radius: outerRadius,
    softSweep: [softSweep.at(-1)], kappa,
    Ntheta: Ntheta * 2, Nphi: Nphi * 2, scanN,
  }) : null;
  const coarseOuter = measureFlux ? flux.at(-1).at(-1).sweep.at(-1).isolated : null;
  const fineOuter = measureFlux ? resolutionWitness.sweep[0].isolated : null;
  const coarseNorm = measureFlux ? Math.hypot(...coarseOuter) : null;
  const fineNorm = measureFlux ? Math.hypot(...fineOuter) : null;
  const tightRows = measureFlux ? flux.flatMap((timeRows) => timeRows.map((r) => r.sweep.at(-1).isolated)) : [];
  const maxIsolatedTransverseFlux = measureFlux ? Math.max(...tightRows.map((p) => Math.hypot(p[0], p[1]))) : null;
  const tightSlopes = measureFlux
    ? summarizedFlux.map((r) => r.bySoft.at(-1).isolatedTransverseSlope)
    : [];
  const surfaceRadiative = measureFlux && tightSlopes.length > 0 && tightSlopes.every((s) => Math.abs(s) < 0.3);
  const surfaceBound = measureFlux && tightSlopes.length > 0 && tightSlopes.every((s) => s < -0.6);
  const quadratureConverged = measureFlux && coarseNorm > 0 && fineNorm / coarseNorm < 3;
  const regulatorConverged = measureFlux && summarizedFlux.every((r) => r.outerRegulatorRatio < 3);
  const convergentOutgoingPhiInfinity = surfaceRadiative && quadratureConverged && regulatorConverged;
  const radiativeEquilibrium = boundedLimitCycle && convergentOutgoingPhiInfinity;
  return {
    schema: SCHEMA,
    declaration: {
      seed: "all_rail_barrel_height_preserving_from_SELF_EQUILIBRATED_V5",
      perturbation: `release_instant_relative_layer_tilt_I_plus_M_minus_${tiltDeg}_deg`,
      canonicalChannel: "E_anti=E_full-E_static_from_Wrec",
      fluxDecomposition: "Phi_total=Phi_baseline+Phi_cross+Phi_pure_tilt; isolated_nutation=Phi_total-Phi_baseline",
      radii, softSweep, Ntheta, Nphi, scanN, dt: DECLARED.timeStep, nativeSoft: DECLARED.soft,
    },
    barrel: { rho: barrel.rho, omega: barrel.omega, layers: barrel.layers, kappa },
    amplitude,
    control: summarizeAmplitude(baseRun),
    flux,
    fluxSummary: summarizedFlux,
    fluxDecision: {
      tightRegulatorTransverseSlopes: tightSlopes,
      surfaceRadiative,
      surfaceBound,
      quadratureConverged,
      regulatorConverged,
      convergentOutgoingPhiInfinity,
    },
    convergence: {
      allRootCountsStable: measureFlux ? flux.flat().every((r) => r.rootsStable) : null,
      maxRootResidual: measureFlux ? Math.max(...flux.flat().map((r) => r.maxResidual)) : null,
      tangentRootsDetected: measureFlux ? flux.flat().reduce((a, r) => a + r.tangentRoots, 0) : null,
      inactiveRootGaps: measureFlux ? flux.flat().reduce((a, r) => a + r.inactiveRootGaps, 0) : null,
      maxIsolatedTransverseFluxAtTightestRegulator: maxIsolatedTransverseFlux,
      outerSurfaceQuadratureWitness: measureFlux ? {
        sourceTime: finalSlice,
        radius: outerRadius,
        coarse: { Ntheta, Nphi, isolated: coarseOuter, norm: coarseNorm },
        fine: { Ntheta: Ntheta * 2, Nphi: Nphi * 2, isolated: fineOuter, norm: fineNorm },
        normRatio: coarseNorm > 0 ? fineNorm / coarseNorm : null,
      } : null,
    },
    decision: radiativeEquilibrium
      ? "MAKE_OR_BREAK_YES_bounded_limit_cycle_with_convergent_outgoing_Phi_infinity"
      : boundedLimitCycle
        ? "NO_bounded_motion_without_convergent_outgoing_Phi_infinity_radiation_reaction_not_established"
        : "NO_NATIVE_BARREL_RELEASE_DIVERGES_OR_FAILS_TO_SETTLE_radiative_equilibrium_not_observed",
    boundedLimitCycle,
    radiativeEquilibrium,
    ...FAIL_CLOSED,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (name, fallback) => {
    const p = `--${name}=`;
    const raw = process.argv.find((x) => x.startsWith(p));
    return raw ? Number(raw.slice(p.length)) : fallback;
  };
  const out = runFlutterRadiativeShedding({
    rotations: arg("rotations", 3),
    tiltDeg: arg("tilt-deg", 0.1),
    dt: arg("dt", null),
    nativeSoft: arg("native-soft", null),
    Ntheta: arg("ntheta", 6),
    Nphi: arg("nphi", 12),
    scanN: arg("scan-n", 96),
    measureFlux: !process.argv.includes("--no-flux"),
  });
  const rendered = process.argv.includes("--summary") ? {
    schema: out.schema,
    declaration: out.declaration,
    barrel: out.barrel,
    amplitude: out.amplitude,
    control: out.control,
    fluxSummary: out.fluxSummary,
    fluxDecision: out.fluxDecision,
    convergence: out.convergence,
    decision: out.decision,
    boundedLimitCycle: out.boundedLimitCycle,
    radiativeEquilibrium: out.radiativeEquilibrium,
    retainedBranchClaim: out.retainedBranchClaim,
    scoreMovement: out.scoreMovement,
  } : out;
  process.stdout.write(`${JSON.stringify(rendered, null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
}
