#!/usr/bin/env node

// Section 93: same-record cross-braid completion for the contra-rotating
// pro/anti pair.  Static rows use the production moving-circular root solver.
// Tilt-rate rows use the production retained-history linear-segment policy:
// local sampling only brackets a segment and every retained root is returned
// by solveMovingCircularSourceCausalRoots on that segment.

import { fileURLToPath } from "node:url";

import { solveMovingCircularSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { axisPencilSpectrum } from "./kapitza-flutter-stabilization.mjs";
import {
  SELF_EQUILIBRATED_V5,
  braidNetZTorque,
  gyroscopicTiltAnalysisFull,
} from "./spindle-support-ratio-targeted-search.mjs";
import { contraRotatingProAntiPairInstrument } from "./contra-rotating-pro-anti-pair-instrument.mjs";
import { CONTRA_ROTATING_CROSS_COUPLING_FIXTURE } from "./contra-rotating-pro-anti-cross-coupling-fixture.mjs";

export const CONTRA_ROTATING_CROSS_COUPLING_SCHEMA = "contra_rotating_pro_anti_cross_coupling.v0";
export const CONTRA_ROTATING_CROSS_COUPLING_SPEC = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md#93-contra-rotating-pair-cross-coupling-completion-2026-07-12";

const TAU = 2 * Math.PI;
const LAYERS = Object.freeze(["I", "M", "O"]);
const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, s) => a.map((v) => s * v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norm = (a) => Math.hypot(...a);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const matVec = (A, x) => A.map((r) => dot(r, x));
const blockDiag = (A, B) => Array.from({ length: A.length + B.length }, (_, i) =>
  Array.from({ length: A.length + B.length }, (_, j) => i < A.length && j < A.length ? A[i][j] : i >= A.length && j >= A.length ? B[i - A.length][j - A.length] : 0));

function rotateX(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
}
function rotateY(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
}
function rotateXY(v, ax, ay) { return rotateY(rotateX(v, ax), ay); }
function axisRateVelocity(pRotated, axRate, ayRate) {
  return add(scale(cross([0, 1, 0], pRotated), ayRate), scale(cross([1, 0, 0], pRotated), axRate));
}

function geometryRows() {
  const g = SELF_EQUILIBRATED_V5.geo;
  return [
    { name: "I", R: g.qI, alpha: g.alphaI, theta: g.thetaI },
    { name: "M", R: 1, alpha: g.alphaM, theta: TAU / 3 },
    { name: "O", R: g.qO, alpha: g.alphaO, theta: g.thetaO },
  ];
}

function conjugateMatrix(A) {
  const sign = [1, 1, 1, -1, -1, -1];
  return A.map((r, i) => r.map((v, j) => sign[i] * v * sign[j]));
}

export function buildPairSites({ separation, phase, omega }) {
  const sites = [];
  for (const braid of [0, 1]) {
    const sense = braid === 0 ? 1 : -1;
    const centerZ = braid === 0 ? -separation / 2 : separation / 2;
    const phaseOffset = braid === 0 ? 0 : phase;
    for (const [layerIndex, L] of geometryRows().entries()) {
      for (const sgn of [1, -1]) {
        sites.push({
          id: `${braid === 0 ? "pro" : "anti"}:${L.name}${sgn > 0 ? "+" : "-"}`,
          braid,
          layer: L.name,
          layerIndex,
          sense,
          centerZ,
          rho: sgn * L.R * Math.cos(L.alpha),
          zLocal: sgn * L.R * Math.sin(L.alpha),
          basePhase: L.theta + phaseOffset + (sgn < 0 ? Math.PI : 0),
          polarity: braid === 0 ? sgn : -sgn,
          omega,
        });
      }
    }
  }
  return sites;
}

function unpackCoordinates(q = Array(12).fill(0)) {
  return {
    x: [q.slice(0, 3), q.slice(6, 9)],
    y: [q.slice(3, 6), q.slice(9, 12)],
  };
}

export function siteState(site, t, { q = Array(12).fill(0), qDot = Array(12).fill(0), referenceTime = 0 } = {}) {
  const a = unpackCoordinates(q), ad = unpackCoordinates(qDot);
  const dt = t - referenceTime;
  const ax = a.x[site.braid][site.layerIndex] + ad.x[site.braid][site.layerIndex] * dt;
  const ay = a.y[site.braid][site.layerIndex] + ad.y[site.braid][site.layerIndex] * dt;
  const axRate = ad.x[site.braid][site.layerIndex], ayRate = ad.y[site.braid][site.layerIndex];
  const allAx = [...a.x[0], ...a.x[1]], allAy = [...a.y[0], ...a.y[1]];
  const allAxRate = [...ad.x[0], ...ad.x[1]], allAyRate = [...ad.y[0], ...ad.y[1]];
  const centerAx = allAx.reduce((s, v) => s + v, 0) / 6 + allAxRate.reduce((s, v) => s + v, 0) * dt / 6;
  const centerAy = allAy.reduce((s, v) => s + v, 0) / 6 + allAyRate.reduce((s, v) => s + v, 0) * dt / 6;
  const centerAxRate = allAxRate.reduce((s, v) => s + v, 0) / 6;
  const centerAyRate = allAyRate.reduce((s, v) => s + v, 0) / 6;
  const angle = site.sense * site.omega * t + site.basePhase;
  const local0 = [site.rho * Math.cos(angle), site.rho * Math.sin(angle), site.zLocal];
  const localV0 = [-site.rho * site.sense * site.omega * Math.sin(angle), site.rho * site.sense * site.omega * Math.cos(angle), 0];
  const local = rotateXY(local0, ax, ay);
  const localVelocity = add(rotateXY(localV0, ax, ay), axisRateVelocity(local, axRate, ayRate));
  const center0 = [0, 0, site.centerZ];
  const center = rotateXY(center0, centerAx, centerAy);
  const centerVelocity = axisRateVelocity(center, centerAxRate, centerAyRate);
  return { position: add(center, local), velocity: add(centerVelocity, localVelocity), center };
}

export function exactCircularSource(site, q) {
  const a = unpackCoordinates(q);
  const allAx = [...a.x[0], ...a.x[1]], allAy = [...a.y[0], ...a.y[1]];
  const centerAx = allAx.reduce((s, v) => s + v, 0) / 6;
  const centerAy = allAy.reduce((s, v) => s + v, 0) / 6;
  const center = rotateXY([0, 0, site.centerZ], centerAx, centerAy);
  const ax = a.x[site.braid][site.layerIndex], ay = a.y[site.braid][site.layerIndex];
  const axial = rotateXY([0, 0, site.zLocal], ax, ay);
  const U = rotateXY([site.rho * Math.cos(site.basePhase), site.rho * Math.sin(site.basePhase), 0], ax, ay);
  const V = rotateXY([-site.rho * Math.sin(site.basePhase), site.rho * Math.cos(site.basePhase), 0], ax, ay);
  return {
    centerAtEpoch: { x: center[0] + axial[0], y: center[1] + axial[1], z: center[2] + axial[2] },
    centerVelocity: { x: 0, y: 0, z: 0 },
    radiusU: { x: U[0], y: U[1], z: U[2] },
    radiusV: { x: V[0], y: V[1], z: V[2] },
    angularVelocity: site.sense * site.omega,
    angularAcceleration: 0,
    phaseAtEpoch: 0,
    epochTime: 0,
  };
}

function receiverRow(state, t) {
  return {
    startTime: t,
    positionAtStart: { x: state.position[0], y: state.position[1], z: state.position[2] },
    velocity: { x: state.velocity[0], y: state.velocity[1], z: state.velocity[2] },
  };
}

export function exactRoots({ source, receiverState, t, fixture }) {
  return solveMovingCircularSourceCausalRoots({
    source,
    receiver: receiverRow(receiverState, t),
    hitTime: t,
    signalSpeed: 1,
    sourceStartTime: t - fixture.delayWindow,
    sourceEndTime: t - 1e-9,
    rootTolerance: 1e-12,
    scanSubdivisions: fixture.scanSubdivisions,
    maxRoots: 32,
  }).roots ?? [];
}

function retainedLinearRoots({ sourceSite, receiverState, t, qDot, fixture }) {
  const roots = [];
  const start = t - fixture.delayWindow, count = fixture.retainedSegmentCount;
  const h = fixture.delayWindow / count;
  const residual = (te) => norm(sub(receiverState.position, siteState(sourceSite, te, { qDot, referenceTime: t }).position)) - (t - te);
  let g0 = residual(start);
  for (let k = 0; k < count; k++) {
    const lo = start + k * h, hi = lo + h;
    const g1 = residual(hi);
    if ((g0 <= 0) !== (g1 <= 0) || Math.min(Math.abs(g0), Math.abs(g1)) < 1e-4) {
      const st = siteState(sourceSite, lo, { qDot, referenceTime: t });
      const result = solveMovingCircularSourceCausalRoots({
        source: {
          centerAtEpoch: { x: st.position[0], y: st.position[1], z: st.position[2] },
          centerVelocity: { x: st.velocity[0], y: st.velocity[1], z: st.velocity[2] },
          radiusU: { x: 0, y: 0, z: 0 }, radiusV: { x: 0, y: 0, z: 0 },
          angularVelocity: 0, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: lo,
        },
        receiver: receiverRow(receiverState, t), hitTime: t, signalSpeed: 1,
        sourceStartTime: lo, sourceEndTime: Math.min(hi, t - 1e-9),
        rootTolerance: 1e-12, scanSubdivisions: 8, maxRoots: 4,
      });
      roots.push(...(result.roots ?? []));
    }
    g0 = g1;
  }
  roots.sort((a, b) => a.emissionTime - b.emissionTime);
  return roots.filter((r, i) => i === 0 || Math.abs(r.emissionTime - roots[i - 1].emissionTime) > 1e-7);
}

export function forceFromRoots({ roots, receiverState, receiverPolarity, sourcePolarity, soft }) {
  const force = [0, 0, 0];
  let minDistance = Infinity;
  let maxRootResidual = 0;
  for (const root of roots) {
    const r = root.distance;
    if (!(r > 1e-8)) continue;
    minDistance = Math.min(minDistance, r);
    maxRootResidual = Math.max(maxRootResidual, Math.abs(root.residual ?? 0));
    const direction = [
      (root.receiverPoint.x - root.sourcePoint.x) / r,
      (root.receiverPoint.y - root.sourcePoint.y) / r,
      (root.receiverPoint.z - root.sourcePoint.z) / r,
    ];
    const Ds = root.sourceNormalDenominator, Dt = root.receiverNormalNumerator;
    const branch = (Dt * Ds) / (Ds * Ds + soft * soft);
    const weight = receiverPolarity * sourcePolarity * branch / (r * r);
    for (let c = 0; c < 3; c++) force[c] += weight * direction[c];
  }
  return { force, minDistance, maxRootResidual };
}

export function measureCrossRows({
  separation,
  phase,
  q = Array(12).fill(0),
  qDot = Array(12).fill(0),
  dynamicRateRecord = false,
  cycleSamples = CONTRA_ROTATING_CROSS_COUPLING_FIXTURE.cycleSamples,
  fixture = CONTRA_ROTATING_CROSS_COUPLING_FIXTURE,
} = {}) {
  const base = gyroscopicTiltAnalysisFull({ Nt: 4 });
  const omega = base.omega, period = TAU / omega, kappa = base.kappaStar;
  const sites = buildPairSites({ separation, phase, omega });
  const forceByBraid = [[0, 0, 0], [0, 0, 0]];
  const torqueByBraid = [[0, 0, 0], [0, 0, 0]];
  const torqueByLayer = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => [0, 0, 0]));
  let rootCount = 0, minDistance = Infinity, maxRootResidual = 0;
  for (let sample = 0; sample < cycleSamples; sample++) {
    const t = (sample / cycleSamples) * period;
    const states = sites.map((site) => siteState(site, t, { q, qDot, referenceTime: dynamicRateRecord ? t : 0 }));
    for (let i = 0; i < sites.length; i++) {
      const rec = sites[i], recState = states[i];
      const Fi = [0, 0, 0];
      for (let j = 0; j < sites.length; j++) {
        const src = sites[j];
        if (src.braid === rec.braid) continue;
        const roots = dynamicRateRecord
          ? retainedLinearRoots({ sourceSite: src, receiverState: recState, t, qDot, fixture })
          : exactRoots({ source: exactCircularSource(src, q), receiverState: recState, t, fixture });
        const row = forceFromRoots({ roots, receiverState: recState, receiverPolarity: rec.polarity, sourcePolarity: src.polarity, soft: fixture.soft });
        rootCount += roots.length;
        minDistance = Math.min(minDistance, row.minDistance);
        maxRootResidual = Math.max(maxRootResidual, row.maxRootResidual);
        for (let c = 0; c < 3; c++) Fi[c] += kappa * row.force[c] / cycleSamples;
      }
      for (let c = 0; c < 3; c++) forceByBraid[rec.braid][c] += Fi[c];
      const arm = sub(recState.position, recState.center);
      const Ti = cross(arm, Fi);
      for (let c = 0; c < 3; c++) {
        torqueByBraid[rec.braid][c] += Ti[c];
        torqueByLayer[rec.braid][rec.layerIndex][c] += Ti[c];
      }
    }
  }
  return {
    separation, phase, forceByBraid, torqueByBraid, torqueByLayer,
    rootCount, minDistance, maxRootResidual,
    recordKind: dynamicRateRecord ? "production_retained_linear_segments" : "production_moving_circular_roots",
  };
}

function summarizeCell(row, intrinsicPump) {
  const totalPump = [intrinsicPump + row.torqueByBraid[0][2], -intrinsicPump + row.torqueByBraid[1][2]];
  const relativePhaseTorque = totalPump[1] - totalPump[0];
  const relativeAxialForce = row.forceByBraid[1][2] - row.forceByBraid[0][2];
  const commonAxialForce = row.forceByBraid[1][2] + row.forceByBraid[0][2];
  const pumpResidual = Math.max(...totalPump.map(Math.abs));
  const lockResidual = Math.hypot(relativePhaseTorque, relativeAxialForce, commonAxialForce);
  return { ...row, totalPump, relativePhaseTorque, relativeAxialForce, commonAxialForce, pumpResidual, lockResidual };
}

function scanGeometry({ fixture, intrinsicPump }) {
  const rows = [];
  for (const separation of fixture.separationGrid) for (const phase of fixture.phaseGrid) {
    rows.push(summarizeCell(measureCrossRows({ separation, phase, fixture }), intrinsicPump));
  }
  rows.sort((a, b) => (a.lockResidual + a.pumpResidual) - (b.lockResidual + b.pumpResidual));
  return rows;
}

function refineCoupledEquilibrium(grid, intrinsicPump, fixture) {
  const admissible = grid.filter((r) => r.minDistance >= fixture.collisionFloor);
  let current = [...admissible].sort((a, b) =>
    Math.hypot(a.totalPump[0], a.relativeAxialForce) - Math.hypot(b.totalPump[0], b.relativeAxialForce))[0];
  const evalAt = (separation, phase) => summarizeCell(measureCrossRows({ separation, phase, fixture }), intrinsicPump);
  const history = [];
  const wrap = (phase) => ((phase % TAU) + TAU) % TAU;
  const minSeparation = Math.min(...fixture.separationGrid), maxSeparation = Math.max(...fixture.separationGrid);
  for (let iteration = 0; iteration < 7; iteration++) {
    const hPhase = 0.015, hSeparation = 0.015;
    const pp = evalAt(current.separation, wrap(current.phase + hPhase));
    const pm = evalAt(current.separation, wrap(current.phase - hPhase));
    const zp = evalAt(Math.min(maxSeparation, current.separation + hSeparation), current.phase);
    const zm = evalAt(Math.max(minSeparation, current.separation - hSeparation), current.phase);
    const J = [
      [(pp.totalPump[0] - pm.totalPump[0]) / (2 * hPhase), (zp.totalPump[0] - zm.totalPump[0]) / (2 * hSeparation)],
      [(pp.relativeAxialForce - pm.relativeAxialForce) / (2 * hPhase), (zp.relativeAxialForce - zm.relativeAxialForce) / (2 * hSeparation)],
    ];
    const det = J[0][0] * J[1][1] - J[0][1] * J[1][0];
    const before = Math.hypot(current.totalPump[0], current.relativeAxialForce);
    history.push({ iteration, separation: current.separation, phase: current.phase, residual: before, jacobian: J, minDistance: current.minDistance });
    if (before < Math.min(fixture.pumpTolerance, fixture.forceTolerance) / 10 || Math.abs(det) < 1e-10) break;
    const rhs = [-current.totalPump[0], -current.relativeAxialForce];
    const deltaPhase = (rhs[0] * J[1][1] - J[0][1] * rhs[1]) / det;
    const deltaSeparation = (J[0][0] * rhs[1] - rhs[0] * J[1][0]) / det;
    let accepted = current;
    for (const step of [1, 0.5, 0.25, 0.125]) {
      const trial = evalAt(
        Math.max(minSeparation, Math.min(maxSeparation, current.separation + step * deltaSeparation)),
        wrap(current.phase + step * deltaPhase),
      );
      const after = Math.hypot(trial.totalPump[0], trial.relativeAxialForce);
      if (trial.minDistance >= fixture.collisionFloor && after < Math.hypot(accepted.totalPump[0], accepted.relativeAxialForce)) accepted = trial;
    }
    if (accepted === current) break;
    current = accepted;
  }
  return { seed: history[0], history, candidate: current, converged: Math.abs(current.totalPump[0]) <= fixture.pumpTolerance && Math.abs(current.relativeAxialForce) <= fixture.forceTolerance };
}

function derivativeLockRows(candidate, intrinsicPump, fixture) {
  const hp = 0.02, hz = 0.02;
  const evalAt = (separation, phase) => summarizeCell(measureCrossRows({ separation, phase, fixture }), intrinsicPump);
  const pp = evalAt(candidate.separation, candidate.phase + hp), pm = evalAt(candidate.separation, candidate.phase - hp);
  const zp = evalAt(candidate.separation + hz, candidate.phase), zm = evalAt(candidate.separation - hz, candidate.phase);
  const J = [
    [(pp.relativePhaseTorque - pm.relativePhaseTorque) / (2 * hp), (zp.relativePhaseTorque - zm.relativePhaseTorque) / (2 * hz)],
    [(pp.relativeAxialForce - pm.relativeAxialForce) / (2 * hp), (zp.relativeAxialForce - zm.relativeAxialForce) / (2 * hz)],
  ];
  const tr = J[0][0] + J[1][1], det = J[0][0] * J[1][1] - J[0][1] * J[1][0], disc = tr * tr - 4 * det;
  const eigen = disc >= 0
    ? [{ re: (tr + Math.sqrt(disc)) / 2, im: 0 }, { re: (tr - Math.sqrt(disc)) / 2, im: 0 }]
    : [{ re: tr / 2, im: Math.sqrt(-disc) / 2 }, { re: tr / 2, im: -Math.sqrt(-disc) / 2 }];
  return { jacobian: J, eigen, restoring: eigen.every((e) => e.re < 0), samples: { phasePlus: pp, phaseMinus: pm, separationPlus: zp, separationMinus: zm } };
}

function measureCrossAxisBlocks(candidate, fixture) {
  const K = zeros(12), D = zeros(12);
  const h = fixture.staticTiltStep, hd = fixture.tiltRateStep;
  const torqueVector = (row) => [
    ...row.torqueByLayer[0].map((v) => v[0]), ...row.torqueByLayer[0].map((v) => v[1]),
    ...row.torqueByLayer[1].map((v) => v[0]), ...row.torqueByLayer[1].map((v) => v[1]),
  ];
  for (let j = 0; j < 12; j++) {
    const qp = Array(12).fill(0), qm = Array(12).fill(0); qp[j] = h; qm[j] = -h;
    const p = measureCrossRows({ separation: candidate.separation, phase: candidate.phase, q: qp, cycleSamples: fixture.derivativeCycleSamples, fixture });
    const m = measureCrossRows({ separation: candidate.separation, phase: candidate.phase, q: qm, cycleSamples: fixture.derivativeCycleSamples, fixture });
    const pv = torqueVector(p), mv = torqueVector(m);
    for (let i = 0; i < 12; i++) K[i][j] = (pv[i] - mv[i]) / (2 * h);

    const rp = Array(12).fill(0), rm = Array(12).fill(0); rp[j] = hd; rm[j] = -hd;
    const dp = measureCrossRows({ separation: candidate.separation, phase: candidate.phase, qDot: rp, dynamicRateRecord: true, cycleSamples: fixture.rateCycleSamples, fixture });
    const dm = measureCrossRows({ separation: candidate.separation, phase: candidate.phase, qDot: rm, dynamicRateRecord: true, cycleSamples: fixture.rateCycleSamples, fixture });
    const dpv = torqueVector(dp), dmv = torqueVector(dm);
    for (let i = 0; i < 12; i++) D[i][j] = (dpv[i] - dmv[i]) / (2 * hd);
  }
  const baseline = measureCrossRows({ separation: candidate.separation, phase: candidate.phase, cycleSamples: fixture.derivativeCycleSamples, fixture });
  return { stiffnessTorqueBlock: K, rateTorqueBlock: D, baseline };
}

export function assembleJointPencil({ crossBlocks, includeStatic = true, includeRate = true }) {
  const pro = gyroscopicTiltAnalysisFull({});
  const anti = {
    mass: conjugateMatrix(pro.pencilMatrices.mass),
    velocity: conjugateMatrix(pro.pencilMatrices.velocity),
    stiffness: conjugateMatrix(pro.pencilMatrices.stiffness),
  };
  const mass = blockDiag(pro.pencilMatrices.mass, anti.mass);
  const velocity = blockDiag(pro.pencilMatrices.velocity, anti.velocity);
  const stiffness = blockDiag(pro.pencilMatrices.stiffness, anti.stiffness);
  const gammaCross = zeros(12);
  for (let braid = 0; braid < 2; braid++) for (let layer = 0; layer < 3; layer++) {
    const tau = crossBlocks.baseline.torqueByLayer[braid][layer][2];
    const offset = braid * 6;
    gammaCross[offset + layer][offset + 3 + layer] = tau;
    gammaCross[offset + 3 + layer][offset + layer] = -tau;
  }
  for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) {
    if (includeRate) velocity[i][j] -= crossBlocks.rateTorqueBlock[i][j];
    if (includeStatic) stiffness[i][j] += gammaCross[i][j] - crossBlocks.stiffnessTorqueBlock[i][j];
  }
  return { mass, velocity, stiffness };
}

export function jointPencilFromCrossCouplingReport(report, options = {}) {
  return assembleJointPencil({
    crossBlocks: {
      stiffnessTorqueBlock: report.measuredCrossBlocks.stiffnessTorqueBlock,
      rateTorqueBlock: report.measuredCrossBlocks.rateTorqueBlock,
      baseline: { torqueByLayer: report.measuredCrossBlocks.baselineCrossTorqueByLayer },
    },
    ...options,
  });
}

export function contraRotatingCrossCouplingCompletion({ fixture = CONTRA_ROTATING_CROSS_COUPLING_FIXTURE } = {}) {
  const intrinsic = braidNetZTorque({});
  const single = gyroscopicTiltAnalysisFull({});
  const section92 = contraRotatingProAntiPairInstrument();
  const grid = scanGeometry({ fixture, intrinsicPump: intrinsic.net });
  const equilibriumRefinement = refineCoupledEquilibrium(grid, intrinsic.net, fixture);
  const candidate = equilibriumRefinement.candidate;
  const minimumPumpRow = [...grid].sort((a, b) => a.pumpResidual - b.pumpResidual)[0];
  const minimumLockRow = [...grid].sort((a, b) => a.lockResidual - b.lockResidual)[0];
  const crossTorqueRange = [
    Math.min(...grid.map((r) => r.torqueByBraid[0][2])),
    Math.max(...grid.map((r) => r.torqueByBraid[0][2])),
  ];
  const lockDerivatives = derivativeLockRows(candidate, intrinsic.net, fixture);
  const crossBlocks = measureCrossAxisBlocks(candidate, fixture);
  const jointPencil = assembleJointPencil({ crossBlocks });
  const spectrum = axisPencilSpectrum(jointPencil);
  const staticOnlySpectrum = axisPencilSpectrum(assembleJointPencil({ crossBlocks, includeRate: false }));
  const rateOnlySpectrum = axisPencilSpectrum(assembleJointPencil({ crossBlocks, includeStatic: false }));
  const pairLocks = candidate.lockResidual <= fixture.forceTolerance && lockDerivatives.restoring && candidate.minDistance >= fixture.collisionFloor;
  const pumpCloses = candidate.pumpResidual <= fixture.pumpTolerance;
  const spectrumCloses = Number.isFinite(spectrum.leading.re) && spectrum.leading.re <= fixture.marginalGrowthTolerance;
  const gatesClose = pairLocks && pumpCloses && spectrumCloses;
  const firstFailedGate = !pairLocks ? "native_phase_or_axial_lock" : !pumpCloses ? "net_axial_pump_with_cross_torque" : !spectrumCloses ? "joint_quotient_spectrum" : null;
  return {
    schema: CONTRA_ROTATING_CROSS_COUPLING_SCHEMA,
    spec: CONTRA_ROTATING_CROSS_COUPLING_SPEC,
    claimLevel: "seed_grade_same_record_cross_braid_production_root_measurement_not_a_release",
    regression: {
      singlePump: intrinsic.net,
      singleFlutterGrowth: single.maxGrowthRate,
      removingPartnerRecoversSingleBraid: Math.abs(intrinsic.net - 0.42403002923413363) < 1e-12 && Math.abs(single.maxGrowthRate - 0.19885688497216406) < 1e-12,
      section92: { freePairGrowth: section92.jointFlutter.freePair.leadingRe, hardLockGrowth: section92.jointFlutter.hardLockCounterfactual.leadingRe },
    },
    sharedRecord: {
      staticRows: "AbsoluteHistoryRootRuntime moving-circular production roots",
      rateRows: "AbsoluteHistoryRootRuntime retained linear-segment production roots",
      centralSolverTouched: false,
    },
    geometryScan: { rowCount: grid.length,
      crossTorqueOnProRange: crossTorqueRange,
      minimumPumpRow: { separation: minimumPumpRow.separation, phase: minimumPumpRow.phase, pumpResidual: minimumPumpRow.pumpResidual, lockResidual: minimumPumpRow.lockResidual, crossTorque: minimumPumpRow.torqueByBraid[0][2] },
      minimumLockRow: { separation: minimumLockRow.separation, phase: minimumLockRow.phase, pumpResidual: minimumLockRow.pumpResidual, lockResidual: minimumLockRow.lockResidual, crossTorque: minimumLockRow.torqueByBraid[0][2] },
      anyCoarseCellClosesPump: grid.some((r) => r.pumpResidual <= fixture.pumpTolerance),
      anyCoarseCellClosesForceRows: grid.some((r) => r.lockResidual <= fixture.forceTolerance),
      bestRows: grid.slice(0, 8).map((r) => ({
      separation: r.separation, phase: r.phase, crossTorque: r.torqueByBraid.map((t) => t[2]), totalPump: r.totalPump,
      relativePhaseTorque: r.relativePhaseTorque, relativeAxialForce: r.relativeAxialForce, commonAxialForce: r.commonAxialForce,
      pumpResidual: r.pumpResidual, lockResidual: r.lockResidual, minDistance: r.minDistance,
    })) },
    selectedCell: candidate,
    equilibriumRefinement,
    phaseAndAxialLock: lockDerivatives,
    measuredCrossBlocks: {
      stiffnessTorqueBlock: crossBlocks.stiffnessTorqueBlock,
      rateTorqueBlock: crossBlocks.rateTorqueBlock,
      baselineCrossTorqueByLayer: crossBlocks.baseline.torqueByLayer,
      maxAbsStiffnessEntry: Math.max(...crossBlocks.stiffnessTorqueBlock.flat().map(Math.abs)),
      maxAbsRateEntry: Math.max(...crossBlocks.rateTorqueBlock.flat().map(Math.abs)),
    },
    jointSpectrum: {
      leadingRe: spectrum.leading.re,
      leadingIm: Math.abs(spectrum.leading.im),
      shiftFromSingle: spectrum.leading.re - single.maxGrowthRate,
      quotient: spectrum.quotient,
      dkResidual: spectrum.dkResidual,
      spectrumCloses,
      decomposition: {
        staticCrossOnlyLeadingRe: staticOnlySpectrum.leading.re,
        staticCrossOnlyLeadingIm: Math.abs(staticOnlySpectrum.leading.im),
        rateCrossOnlyLeadingRe: rateOnlySpectrum.leading.re,
        rateCrossOnlyLeadingIm: Math.abs(rateOnlySpectrum.leading.im),
      },
    },
    gates: { pairLocks, pumpCloses, spectrumCloses, gatesClose, firstFailedGate, nativeRetainedHistoryReleaseAuthorized: gatesClose },
    decision: gatesClose
      ? "measured_pair_locks_self_sinks_and_closes_joint_spectrum_authorize_gated_native_release"
      : pairLocks && pumpCloses
        ? "measured_pair_locks_and_self_sinks_but_flutter_survives_hand_flutter_to_internal_flex_route_no_release"
        : !pairLocks
          ? "measured_cross_pair_fails_native_lock_no_release"
          : "measured_cross_torque_spoils_zero_pump_no_release",
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) process.stdout.write(`${JSON.stringify(contraRotatingCrossCouplingCompletion(), null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
