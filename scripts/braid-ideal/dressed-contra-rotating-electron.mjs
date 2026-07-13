#!/usr/bin/env node

// Section 95: seed-grade assembled electron candidate. The Section 93
// contra-rotating pro/anti rows and the six-electrino payload share one
// production-root force/torque record. The central solver is imported only;
// its implementation is not changed.

import { fileURLToPath } from "node:url";

import { solveMovingCircularSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { axisPencilSpectrum } from "./kapitza-flutter-stabilization.mjs";
import {
  buildPairSites,
  contraRotatingCrossCouplingCompletion,
  exactCircularSource,
  exactRoots,
  forceFromRoots,
  jointPencilFromCrossCouplingReport,
  measureCrossRows,
  siteState,
} from "./contra-rotating-pro-anti-cross-coupling.mjs";
import {
  SCHEMA as SECTION_89_SCHEMA,
  fallbackCoRotatingShell,
  lagrangeDressedElectronPilot,
} from "./lagrange-dressed-electron-native-pilot.mjs";
import { gyroscopicTiltAnalysisFull } from "./spindle-support-ratio-targeted-search.mjs";
import { DRESSED_CONTRA_ROTATING_ELECTRON_FIXTURE } from "./dressed-contra-rotating-electron-fixture.mjs";

export const DRESSED_CONTRA_ROTATING_ELECTRON_SCHEMA = "dressed_contra_rotating_electron.v0";
export const DRESSED_CONTRA_ROTATING_ELECTRON_SPEC = "reference/priorities/braid-ideal/dressed-contra-rotating-electron-spec.md";

const TAU = 2 * Math.PI;
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, s) => a.map((v) => s * v);
const norm = (a) => Math.hypot(...a);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));

function rotateX(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
}
function rotateY(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
}
function rotateXY(v, ax, ay) { return rotateY(rotateX(v, ax), ay); }
function axisRateVelocity(p, axRate, ayRate) {
  return add(scale(cross([0, 1, 0], p), ayRate), scale(cross([1, 0, 0], p), axRate));
}
function commonAxis(q = Array(12).fill(0), qDot = Array(12).fill(0), dt = 0) {
  const xIdx = [0, 1, 2, 6, 7, 8], yIdx = [3, 4, 5, 9, 10, 11];
  const mean = (idx, row) => idx.reduce((s, i) => s + row[i], 0) / idx.length;
  return {
    ax: mean(xIdx, q) + dt * mean(xIdx, qDot),
    ay: mean(yIdx, q) + dt * mean(yIdx, qDot),
    axRate: mean(xIdx, qDot),
    ayRate: mean(yIdx, qDot),
  };
}

function sanitizeParams(kind, params, separation) {
  const pocket = Math.max(0.08, separation / 2 - 0.04);
  if (kind === "spinless_column") {
    const z = params.map((v) => Math.max(0.025, Math.min(pocket, Math.abs(v)))).sort((a, b) => a - b);
    for (let i = 1; i < z.length; i++) z[i] = Math.max(z[i], Math.min(pocket, z[i - 1] + 0.035));
    return z;
  }
  return [
    Math.max(0.04, Math.min(0.7, params[0])),
    Math.max(0, Math.min(pocket, Math.abs(params[1]))),
    ((params[2] % (TAU / 3)) + TAU / 3) % (TAU / 3),
  ];
}

export function buildPocketPayload({ kind, params, omega, separation }) {
  const p = sanitizeParams(kind, params, separation);
  if (kind === "spinless_column") {
    const zs = [-p[2], -p[1], -p[0], p[0], p[1], p[2]];
    return zs.map((z, index) => ({ id: `payload:column:${index}`, payload: true, polarity: -1, rho: 0, z, basePhase: 0, sense: 0, omega }));
  }
  const [rho, halfSplit, offset] = p;
  const rows = [];
  for (const [triad, z] of [[0, -halfSplit], [1, halfSplit]]) for (let k = 0; k < 3; k++) {
    rows.push({
      id: `payload:ring:${triad}:${k}`,
      payload: true,
      polarity: -1,
      rho,
      z,
      basePhase: offset + triad * Math.PI / 3 + k * TAU / 3,
      sense: 1,
      omega,
    });
  }
  return rows;
}

function payloadState(site, t, { q = Array(12).fill(0), qDot = Array(12).fill(0), referenceTime = 0 } = {}) {
  const axis = commonAxis(q, qDot, t - referenceTime);
  const angle = site.basePhase + site.sense * site.omega * t;
  const local0 = [site.rho * Math.cos(angle), site.rho * Math.sin(angle), site.z];
  const velocity0 = [-site.rho * site.sense * site.omega * Math.sin(angle), site.rho * site.sense * site.omega * Math.cos(angle), 0];
  const local = rotateXY(local0, axis.ax, axis.ay);
  return {
    position: local,
    velocity: add(rotateXY(velocity0, axis.ax, axis.ay), axisRateVelocity(local, axis.axRate, axis.ayRate)),
    center: [0, 0, 0],
  };
}

function payloadCircularSource(site, q = Array(12).fill(0)) {
  const axis = commonAxis(q);
  const axial = rotateXY([0, 0, site.z], axis.ax, axis.ay);
  const U = rotateXY([site.rho * Math.cos(site.basePhase), site.rho * Math.sin(site.basePhase), 0], axis.ax, axis.ay);
  const V = rotateXY([-site.rho * Math.sin(site.basePhase), site.rho * Math.cos(site.basePhase), 0], axis.ax, axis.ay);
  return {
    centerAtEpoch: { x: axial[0], y: axial[1], z: axial[2] },
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

function retainedRoots({ stateAt, receiverState, t, fixture }) {
  const roots = [], start = t - fixture.delayWindow;
  const h = fixture.delayWindow / fixture.retainedSegmentCount;
  const residual = (te) => norm(sub(receiverState.position, stateAt(te).position)) - (t - te);
  let g0 = residual(start);
  for (let k = 0; k < fixture.retainedSegmentCount; k++) {
    const lo = start + k * h, hi = lo + h, g1 = residual(hi);
    if ((g0 <= 0) !== (g1 <= 0) || Math.min(Math.abs(g0), Math.abs(g1)) < 1e-4) {
      const st = stateAt(lo);
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

function siteStateAt(site, t, options) { return site.payload ? payloadState(site, t, options) : siteState(site, t, options); }
function sourceAt(site, q) { return site.payload ? payloadCircularSource(site, q) : exactCircularSource(site, q); }

export function measurePayloadRecord({
  separation,
  phase,
  payload,
  q = Array(12).fill(0),
  qDot = Array(12).fill(0),
  dynamicRateRecord = false,
  torqueOnly = false,
  cycleSamples,
  fixture = DRESSED_CONTRA_ROTATING_ELECTRON_FIXTURE,
} = {}) {
  const base = gyroscopicTiltAnalysisFull({ Nt: 4 });
  const period = TAU / base.omega, samples = cycleSamples ?? fixture.cycleSamples;
  const scaffold = buildPairSites({ separation, phase, omega: base.omega });
  const all = [...scaffold, ...payload];
  const forceByBraid = [[0, 0, 0], [0, 0, 0]];
  const torqueByBraid = [[0, 0, 0], [0, 0, 0]];
  const torqueByLayer = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => [0, 0, 0]));
  const payloadEffectiveForce = payload.map(() => [0, 0, 0]);
  const payloadEffectiveForceBody = payload.map(() => [0, 0, 0]);
  let rootCount = 0, minDistance = Infinity, maxRootResidual = 0;
  for (let sample = 0; sample < samples; sample++) {
    const t = sample * period / samples;
    const options = { q, qDot, referenceTime: dynamicRateRecord ? t : 0 };
    const states = all.map((site) => siteStateAt(site, t, options));
    for (let i = 0; i < all.length; i++) {
      const rec = all[i];
      if (torqueOnly && rec.payload) continue;
      const recState = states[i], Fi = [0, 0, 0];
      for (let j = 0; j < all.length; j++) {
        const src = all[j];
        if (i === j) continue;
        if (!rec.payload && !src.payload) continue;
        const roots = dynamicRateRecord
          ? retainedRoots({ stateAt: (te) => siteStateAt(src, te, options), receiverState: recState, t, fixture })
          : exactRoots({ source: sourceAt(src, q), receiverState: recState, t, fixture });
        const row = forceFromRoots({ roots, receiverState: recState, receiverPolarity: rec.polarity, sourcePolarity: src.polarity, soft: fixture.soft });
        rootCount += roots.length;
        minDistance = Math.min(minDistance, row.minDistance);
        maxRootResidual = Math.max(maxRootResidual, row.maxRootResidual);
        for (let c = 0; c < 3; c++) Fi[c] += base.kappaStar * row.force[c] / samples;
      }
      if (rec.payload) {
        const p = payload.indexOf(rec), angle = rec.basePhase + rec.sense * rec.omega * t;
        const required = [-rec.rho * (rec.sense * rec.omega) ** 2 * Math.cos(angle), -rec.rho * (rec.sense * rec.omega) ** 2 * Math.sin(angle), 0];
        const effective = Fi.map((v, c) => v - required[c] / samples);
        for (let c = 0; c < 3; c++) payloadEffectiveForce[p][c] += effective[c];
        payloadEffectiveForceBody[p][0] += effective[0] * Math.cos(angle) + effective[1] * Math.sin(angle);
        payloadEffectiveForceBody[p][1] += -effective[0] * Math.sin(angle) + effective[1] * Math.cos(angle);
        payloadEffectiveForceBody[p][2] += effective[2];
      } else {
        for (let c = 0; c < 3; c++) forceByBraid[rec.braid][c] += Fi[c];
        const Ti = cross(sub(recState.position, recState.center), Fi);
        for (let c = 0; c < 3; c++) {
          torqueByBraid[rec.braid][c] += Ti[c];
          torqueByLayer[rec.braid][rec.layerIndex][c] += Ti[c];
        }
      }
    }
  }
  return {
    forceByBraid, torqueByBraid, torqueByLayer, payloadEffectiveForce, payloadEffectiveForceBody,
    rootCount, minDistance, maxRootResidual,
    recordKind: dynamicRateRecord ? "production_retained_linear_segments" : "production_moving_circular_roots",
  };
}

function generalizedPayloadForce(kind, payload, record) {
  if (kind === "spinless_column") {
    return [0, 1, 2].map((i) => record.payloadEffectiveForce[5 - i][2] - record.payloadEffectiveForce[i][2]);
  }
  let radial = 0, split = 0, tangential = 0;
  for (let i = 0; i < payload.length; i++) {
    const p = payload[i], f = record.payloadEffectiveForceBody[i];
    radial += f[0];
    tangential += f[1];
    split += Math.sign(p.z || (i < 3 ? -1 : 1)) * f[2];
  }
  return [radial / 6, split / 6, tangential / 6];
}

function solve3(A, b) {
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < 3; c++) {
    let p = c;
    for (let r = c + 1; r < 3; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-10) return null;
    [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c]; for (let j = c; j < 4; j++) M[c][j] /= d;
    for (let r = 0; r < 3; r++) if (r !== c) { const f = M[r][c]; for (let j = c; j < 4; j++) M[r][j] -= f * M[c][j]; }
  }
  return M.map((row) => row[3]);
}

function symmetricEigenvalues(A) {
  const M = A.map((row, i) => row.map((v, j) => 0.5 * (v + A[j][i])));
  for (let sweep = 0; sweep < 30; sweep++) {
    let p = 0, q = 1;
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if (Math.abs(M[i][j]) > Math.abs(M[p][q])) [p, q] = [i, j];
    if (Math.abs(M[p][q]) < 1e-12) break;
    const phi = 0.5 * Math.atan2(2 * M[p][q], M[q][q] - M[p][p]), c = Math.cos(phi), s = Math.sin(phi);
    const R = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; R[p][p] = c; R[q][q] = c; R[p][q] = s; R[q][p] = -s;
    const next = zeros(3);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) next[i][j] += R[a][i] * M[a][b] * R[b][j];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) M[i][j] = next[i][j];
  }
  return [M[0][0], M[1][1], M[2][2]].sort((a, b) => b - a);
}

export function relaxPocketPayload({ kind, separation, phase, fixture = DRESSED_CONTRA_ROTATING_ELECTRON_FIXTURE } = {}) {
  const base = gyroscopicTiltAnalysisFull({ Nt: 4 });
  const fallback = fallbackCoRotatingShell({ ringZ: 0 });
  let params = kind === "spinless_column"
    ? [...fixture.columnSeed]
    : [Math.min(0.55, fallback.ringRadius), fixture.ringSeed.halfSplit, fixture.ringSeed.phaseOffset];
  params = sanitizeParams(kind, params, separation);
  const history = [];
  const evaluate = (trial) => {
    const clean = sanitizeParams(kind, trial, separation);
    const payload = buildPocketPayload({ kind, params: clean, omega: base.omega, separation });
    const record = measurePayloadRecord({ separation, phase, payload, fixture });
    return { params: clean, payload, record, residual: generalizedPayloadForce(kind, payload, record) };
  };
  let current = evaluate(params);
  for (let iteration = 0; iteration < fixture.payloadRelaxIterations; iteration++) {
    const before = norm(current.residual), J = zeros(3), h = fixture.payloadParameterStep;
    for (let j = 0; j < 3; j++) {
      const pp = [...current.params], pm = [...current.params]; pp[j] += h; pm[j] -= h;
      const rp = evaluate(pp).residual, rm = evaluate(pm).residual;
      for (let i = 0; i < 3; i++) J[i][j] = (rp[i] - rm[i]) / (2 * h);
    }
    history.push({ iteration, params: current.params, residual: current.residual, residualNorm: before, forceJacobian: J });
    if (before <= fixture.payloadForceTolerance) break;
    const delta = solve3(J, scale(current.residual, -1));
    if (!delta) break;
    let accepted = current;
    for (const step of [1, 0.5, 0.25, 0.125]) {
      const trial = evaluate(current.params.map((v, i) => v + step * delta[i]));
      if (norm(trial.residual) < norm(accepted.residual)) accepted = trial;
    }
    if (accepted === current) break;
    current = accepted;
  }
  const h = fixture.payloadParameterStep, J = zeros(3);
  for (let j = 0; j < 3; j++) {
    const pp = [...current.params], pm = [...current.params]; pp[j] += h; pm[j] -= h;
    const rp = evaluate(pp).residual, rm = evaluate(pm).residual;
    for (let i = 0; i < 3; i++) J[i][j] = (rp[i] - rm[i]) / (2 * h);
  }
  const eigen = symmetricEigenvalues(J);
  const stable = eigen.every((v) => v < -fixture.payloadHessianTolerance);
  return {
    kind,
    declaredAnsatz: kind === "spinless_column" ? "six-electrino symmetric spinless pocket column" : "two co-rotating exposed/shielded electrino triads",
    params: current.params,
    configuration: current.payload.map((p) => ({ rho: p.rho, z: p.z, phase: p.basePhase, sense: p.sense })),
    classification: kind === "spinless_column" ? "column" : "exposed_shielded_triad_split",
    history,
    generalizedResidual: current.residual,
    generalizedResidualNorm: norm(current.residual),
    symmetricForceJacobian: J.map((row, i) => row.map((v, j) => 0.5 * (v + J[j][i]))),
    symmetricForceJacobianEigenvalues: eigen,
    stable,
    converged: norm(current.residual) <= fixture.payloadForceTolerance,
    productionRecord: {
      kind: current.record.recordKind,
      rootCount: current.record.rootCount,
      maxRootResidual: current.record.maxRootResidual,
      minDistance: current.record.minDistance,
    },
    payload: current.payload,
  };
}

function summarizeDressedCell(baseRow, payloadRow, intrinsicPump) {
  const torque = [0, 1].map((b) => add(baseRow.torqueByBraid[b], payloadRow.torqueByBraid[b]));
  const force = [0, 1].map((b) => add(baseRow.forceByBraid[b], payloadRow.forceByBraid[b]));
  const totalPump = [intrinsicPump + torque[0][2], -intrinsicPump + torque[1][2]];
  const relativePhaseTorque = totalPump[1] - totalPump[0];
  const relativeAxialForce = force[1][2] - force[0][2];
  const commonAxialForce = force[1][2] + force[0][2];
  return {
    separation: baseRow.separation, phase: baseRow.phase, forceByBraid: force, torqueByBraid: torque,
    totalPump, relativePhaseTorque, relativeAxialForce, commonAxialForce,
    pumpResidual: Math.max(...totalPump.map(Math.abs)),
    lockResidual: Math.hypot(relativePhaseTorque, relativeAxialForce, commonAxialForce),
    minDistance: Math.min(baseRow.minDistance, payloadRow.minDistance),
    rootCount: baseRow.rootCount + payloadRow.rootCount,
    payloadRecord: payloadRow,
  };
}

function dressedCell({ separation, phase, payload, intrinsicPump, fixture }) {
  const baseRow = measureCrossRows({ separation, phase, fixture: { ...fixture, cycleSamples: fixture.cycleSamples } });
  const payloadRow = measurePayloadRecord({ separation, phase, payload, fixture });
  return summarizeDressedCell(baseRow, payloadRow, intrinsicPump);
}

function refineDressedLock({ seed, payload, intrinsicPump, fixture }) {
  let current = dressedCell({ separation: seed.separation, phase: seed.phase, payload, intrinsicPump, fixture });
  const history = [];
  for (let iteration = 0; iteration < 4; iteration++) {
    const hp = fixture.lockPhaseStep, hz = fixture.lockSeparationStep;
    const pp = dressedCell({ separation: current.separation, phase: current.phase + hp, payload, intrinsicPump, fixture });
    const pm = dressedCell({ separation: current.separation, phase: current.phase - hp, payload, intrinsicPump, fixture });
    const zp = dressedCell({ separation: current.separation + hz, phase: current.phase, payload, intrinsicPump, fixture });
    const zm = dressedCell({ separation: Math.max(0.35, current.separation - hz), phase: current.phase, payload, intrinsicPump, fixture });
    const J = [
      [(pp.totalPump[0] - pm.totalPump[0]) / (2 * hp), (zp.totalPump[0] - zm.totalPump[0]) / (2 * hz)],
      [(pp.relativeAxialForce - pm.relativeAxialForce) / (2 * hp), (zp.relativeAxialForce - zm.relativeAxialForce) / (2 * hz)],
    ];
    const det = J[0][0] * J[1][1] - J[0][1] * J[1][0], before = Math.hypot(current.totalPump[0], current.relativeAxialForce);
    history.push({ iteration, separation: current.separation, phase: current.phase, residual: before, jacobian: J });
    if (before < Math.min(fixture.pumpTolerance, fixture.forceTolerance) / 10 || Math.abs(det) < 1e-10) break;
    const rhs = [-current.totalPump[0], -current.relativeAxialForce];
    const dp = (rhs[0] * J[1][1] - J[0][1] * rhs[1]) / det;
    const dz = (J[0][0] * rhs[1] - rhs[0] * J[1][0]) / det;
    let accepted = current;
    for (const step of [1, 0.5, 0.25, 0.125]) {
      const trial = dressedCell({ separation: Math.max(0.35, Math.min(3, current.separation + step * dz)), phase: current.phase + step * dp, payload, intrinsicPump, fixture });
      if (Math.hypot(trial.totalPump[0], trial.relativeAxialForce) < Math.hypot(accepted.totalPump[0], accepted.relativeAxialForce)) accepted = trial;
    }
    if (accepted === current) break;
    current = accepted;
  }
  return { candidate: current, history };
}

function lockJacobian({ candidate, payload, intrinsicPump, fixture }) {
  const hp = fixture.lockPhaseStep, hz = fixture.lockSeparationStep;
  const at = (z, p) => dressedCell({ separation: z, phase: p, payload, intrinsicPump, fixture });
  const pp = at(candidate.separation, candidate.phase + hp), pm = at(candidate.separation, candidate.phase - hp);
  const zp = at(candidate.separation + hz, candidate.phase), zm = at(candidate.separation - hz, candidate.phase);
  const J = [
    [(pp.relativePhaseTorque - pm.relativePhaseTorque) / (2 * hp), (zp.relativePhaseTorque - zm.relativePhaseTorque) / (2 * hz)],
    [(pp.relativeAxialForce - pm.relativeAxialForce) / (2 * hp), (zp.relativeAxialForce - zm.relativeAxialForce) / (2 * hz)],
  ];
  const tr = J[0][0] + J[1][1], det = J[0][0] * J[1][1] - J[0][1] * J[1][0], disc = tr * tr - 4 * det;
  const eigen = disc >= 0
    ? [{ re: (tr + Math.sqrt(disc)) / 2, im: 0 }, { re: (tr - Math.sqrt(disc)) / 2, im: 0 }]
    : [{ re: tr / 2, im: Math.sqrt(-disc) / 2 }, { re: tr / 2, im: -Math.sqrt(-disc) / 2 }];
  return { jacobian: J, eigen, restoring: eigen.every((e) => e.re < 0) };
}

function torqueVector(row) {
  return [
    ...row.torqueByLayer[0].map((v) => v[0]), ...row.torqueByLayer[0].map((v) => v[1]),
    ...row.torqueByLayer[1].map((v) => v[0]), ...row.torqueByLayer[1].map((v) => v[1]),
  ];
}

function payloadAxisBlocks({ separation, phase, payload, fixture }) {
  const K = zeros(12), D = zeros(12), h = fixture.staticTiltStep, hd = fixture.tiltRateStep;
  for (let j = 0; j < 12; j++) {
    const qp = Array(12).fill(0), qm = Array(12).fill(0); qp[j] = h; qm[j] = -h;
    const p = measurePayloadRecord({ separation, phase, payload, q: qp, torqueOnly: true, cycleSamples: fixture.derivativeCycleSamples, fixture });
    const m = measurePayloadRecord({ separation, phase, payload, q: qm, torqueOnly: true, cycleSamples: fixture.derivativeCycleSamples, fixture });
    const pv = torqueVector(p), mv = torqueVector(m);
    for (let i = 0; i < 12; i++) K[i][j] = (pv[i] - mv[i]) / (2 * h);
    const rp = Array(12).fill(0), rm = Array(12).fill(0); rp[j] = hd; rm[j] = -hd;
    const dp = measurePayloadRecord({ separation, phase, payload, qDot: rp, dynamicRateRecord: true, torqueOnly: true, cycleSamples: fixture.rateCycleSamples, fixture });
    const dm = measurePayloadRecord({ separation, phase, payload, qDot: rm, dynamicRateRecord: true, torqueOnly: true, cycleSamples: fixture.rateCycleSamples, fixture });
    const dpv = torqueVector(dp), dmv = torqueVector(dm);
    for (let i = 0; i < 12; i++) D[i][j] = (dpv[i] - dmv[i]) / (2 * hd);
  }
  const baseline = measurePayloadRecord({ separation, phase, payload, torqueOnly: true, cycleSamples: fixture.derivativeCycleSamples, fixture });
  return { stiffnessTorqueBlock: K, rateTorqueBlock: D, baseline };
}

function addPayloadToJointPencil({ barePencil, blocks, payload }) {
  const inertial = barePencil.mass.map((r) => [...r]), velocity = barePencil.velocity.map((r) => [...r]), stiffness = barePencil.stiffness.map((r) => [...r]);
  const gamma = zeros(12);
  for (let braid = 0; braid < 2; braid++) for (let layer = 0; layer < 3; layer++) {
    const tau = blocks.baseline.torqueByLayer[braid][layer][2], offset = braid * 6;
    gamma[offset + layer][offset + 3 + layer] = tau;
    gamma[offset + 3 + layer][offset + layer] = -tau;
  }
  for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) {
    velocity[i][j] -= blocks.rateTorqueBlock[i][j];
    stiffness[i][j] += gamma[i][j] - blocks.stiffnessTorqueBlock[i][j];
  }
  const x = [0, 1, 2, 6, 7, 8], y = [3, 4, 5, 9, 10, 11], c = 1 / 6;
  const tiltWeight = payload.reduce((s, p) => s + p.rho * p.rho + 2 * p.z * p.z, 0);
  const payloadJ = payload.reduce((s, p) => s + 2 * p.rho * p.rho * p.sense * p.omega, 0);
  for (const a of x) for (const b of x) inertial[a][b] += tiltWeight * c * c;
  for (const a of y) for (const b of y) inertial[a][b] += tiltWeight * c * c;
  for (const a of x) for (const b of y) { velocity[a][b] += payloadJ * c * c; velocity[b][a] -= payloadJ * c * c; }
  return { pencil: { mass: inertial, velocity, stiffness }, tiltWeight, payloadJ };
}

function observables(payload) {
  let Lz = 0, muZ = 0;
  for (const p of payload) {
    const l = p.rho * p.rho * p.sense * p.omega;
    Lz += l; muZ += 0.5 * p.polarity * l;
  }
  const qUnits = payload.reduce((s, p) => s + p.polarity, 0);
  const qPer = qUnits / payload.length;
  const g = Math.abs(Lz) > 1e-12 ? muZ / ((qPer / 2) * Lz) : null;
  return { netChargeUnitsEpsilon: qUnits, netChargeInE: qUnits / 6, payloadMechanicalLz: Lz, magneticMomentZ: muZ, orbitalGFactorAnalog: g };
}

function regressionFromBare(bare) {
  return {
    removingPayloadRecoversSection93Exactly:
      bare.selectedCell.separation === 1.419842173795055
      && Math.abs(bare.phaseAndAxialLock.eigen[0].re - 12.41165549) < 1e-8
      && Math.abs(bare.phaseAndAxialLock.eigen[1].re + 3.24327329) < 1e-8
      && Math.abs(bare.jointSpectrum.leadingRe - 5.30422826) < 1e-8,
    section93: {
      separation: bare.selectedCell.separation,
      phase: bare.selectedCell.phase,
      pump: bare.selectedCell.totalPump,
      lockEigenvalues: bare.phaseAndAxialLock.eigen,
      jointLeadingRe: bare.jointSpectrum.leadingRe,
    },
  };
}

export function dressedContraRotatingElectronCompletion({
  fixture = DRESSED_CONTRA_ROTATING_ELECTRON_FIXTURE,
  includePayload = true,
} = {}) {
  const bare = contraRotatingCrossCouplingCompletion();
  if (!includePayload) return { schema: DRESSED_CONTRA_ROTATING_ELECTRON_SCHEMA, includePayload: false, section93: bare };
  const relaxations = ["spinless_column", "co_rotating_pocket"].map((kind) => relaxPocketPayload({
    kind, separation: bare.selectedCell.separation, phase: bare.selectedCell.phase, fixture,
  }));
  const selected = [...relaxations].sort((a, b) => Number(b.stable && b.converged) - Number(a.stable && a.converged) || a.generalizedResidualNorm - b.generalizedResidualNorm)[0];
  const lockRefinement = refineDressedLock({ seed: bare.selectedCell, payload: selected.payload, intrinsicPump: bare.regression.singlePump, fixture });
  const candidate = lockRefinement.candidate;
  const lock = lockJacobian({ candidate, payload: selected.payload, intrinsicPump: bare.regression.singlePump, fixture });
  const blocks = payloadAxisBlocks({ separation: candidate.separation, phase: candidate.phase, payload: selected.payload, fixture });
  const barePencil = jointPencilFromCrossCouplingReport(bare);
  const dressedPencil = addPayloadToJointPencil({ barePencil, blocks, payload: selected.payload });
  const spectrum = axisPencilSpectrum(dressedPencil.pencil);
  const certifiedSpectrum = spectrum.quotient.filter((row) => Number.isFinite(row.re) && row.pencilResidual <= fixture.spectrumRootResidualTolerance);
  const certifiedLeading = certifiedSpectrum[0] ?? null;
  const obs = observables(selected.payload);
  const pairLocks = selected.stable && selected.converged && candidate.lockResidual <= fixture.forceTolerance && lock.restoring && candidate.minDistance >= fixture.collisionFloor;
  const pumpCloses = candidate.pumpResidual <= fixture.pumpTolerance;
  const spectrumCloses = certifiedLeading !== null && certifiedLeading.re <= fixture.marginalGrowthTolerance;
  const gatesClose = pairLocks && pumpCloses && spectrumCloses && obs.netChargeInE === -1;
  const single = lagrangeDressedElectronPilot({ Nt: 4, Ngrid: 800 });
  const firstFailedGate = !selected.converged || !selected.stable ? "payload_equilibrium" : !pairLocks ? "payload_dressed_phase_or_axial_lock" : !pumpCloses ? "payload_dressed_axial_pump" : !spectrumCloses ? "payload_dressed_joint_spectrum" : obs.netChargeInE !== -1 ? "net_charge" : null;
  return {
    schema: DRESSED_CONTRA_ROTATING_ELECTRON_SCHEMA,
    spec: DRESSED_CONTRA_ROTATING_ELECTRON_SPEC,
    claimLevel: "seed_grade_shared_record_dressed_pair_measurement_not_accepted_evidence",
    object: {
      leading: "spindle pro-braid, electrino-cap forward, sense +1",
      trailing: "C-conjugate anti-braid, positrino cap toward pocket, sense -1",
      pocket: "six electrinos between the same-polarity positrino caps",
      scaffoldArchitrinoCount: 12,
      payloadArchitrinoCount: 6,
    },
    sharedRecord: {
      section93StaticRows: bare.sharedRecord.staticRows,
      section93RateRows: bare.sharedRecord.rateRows,
      payloadStaticRows: "AbsoluteHistoryRootRuntime moving-circular production roots",
      payloadRateRows: "AbsoluteHistoryRootRuntime retained linear-segment production roots",
      composedOnOneForceTorqueRecord: true,
      centralSolverTouched: false,
    },
    payloadEquilibria: relaxations.map(({ payload: _payload, ...row }) => row),
    selectedPayload: { kind: selected.kind, classification: selected.classification, params: selected.params, configuration: selected.configuration },
    dressedLock: {
      conditionalOnFailedPayloadAnsatz: !selected.stable || !selected.converged,
      adjudicationEligible: selected.stable && selected.converged,
      candidate: {
        separation: candidate.separation, phase: candidate.phase, totalPump: candidate.totalPump,
        relativePhaseTorque: candidate.relativePhaseTorque, relativeAxialForce: candidate.relativeAxialForce,
        commonAxialForce: candidate.commonAxialForce, pumpResidual: candidate.pumpResidual,
        lockResidual: candidate.lockResidual, minDistance: candidate.minDistance,
      },
      refinement: lockRefinement.history,
      jacobian: lock.jacobian,
      eigen: lock.eigen,
      restoring: lock.restoring,
      bareEigen: bare.phaseAndAxialLock.eigen,
    },
    pumpWithPayload: {
      totalPump: candidate.totalPump,
      residual: candidate.pumpResidual,
      closes: pumpCloses,
      barePumpResidual: bare.selectedCell.pumpResidual,
    },
    jointSpectrumWithPayload: {
      conditionalOnFailedPayloadAnsatz: !selected.stable || !selected.converged,
      adjudicationEligible: selected.stable && selected.converged,
      leadingRe: certifiedLeading?.re ?? null,
      leadingIm: certifiedLeading ? Math.abs(certifiedLeading.im) : null,
      rawLeadingRe: spectrum.leading.re,
      rawLeadingPencilResidual: spectrum.leading.pencilResidual,
      rootResidualTolerance: fixture.spectrumRootResidualTolerance,
      quotient: spectrum.quotient,
      dkResidual: spectrum.dkResidual,
      closes: spectrumCloses,
      bareLeadingRe: bare.jointSpectrum.leadingRe,
      shiftFromBarePair: certifiedLeading ? certifiedLeading.re - bare.jointSpectrum.leadingRe : null,
      payloadTiltWeight: dressedPencil.tiltWeight,
      payloadGyroscopicJ: dressedPencil.payloadJ,
      maxAbsPayloadStaticEntry: Math.max(...blocks.stiffnessTorqueBlock.flat().map(Math.abs)),
      maxAbsPayloadRateEntry: Math.max(...blocks.rateTorqueBlock.flat().map(Math.abs)),
    },
    observables: obs,
    regressions: {
      ...regressionFromBare(bare),
      removingTrailingBraidDelegatesExactlyToSection89: single.schema === SECTION_89_SCHEMA,
      section89: {
        schema: single.schema,
        netChargeInE: single.gateD_emChannel.netChargeInE,
        payloadMagneticMomentZ: single.gateC_magneticMoment.payloadMagneticMomentZ,
        dressedFlutterGrowth: single.gateB_axisFlutter.dressedMaxGrowthRate,
        flutterOutcome: single.gateB_axisFlutter.verdict,
      },
    },
    gates: {
      payloadEquilibriumStable: selected.stable && selected.converged,
      pairLocks, pumpCloses, spectrumCloses, netChargeCloses: obs.netChargeInE === -1,
      gatesClose, firstFailedGate, nativeRetainedHistoryReleaseAuthorized: gatesClose,
    },
    decision: gatesClose
      ? "payload_stabilizes_lock_sinks_pump_and_closes_flutter_authorize_gated_native_release_for_adjudication"
      : pairLocks && pumpCloses
        ? "payload_stabilizes_lock_and_sinks_pump_but_flutter_survives_no_release"
        : "dressed_pair_fails_seed_gate_no_release",
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) process.stdout.write(`${JSON.stringify(dressedContraRotatingElectronCompletion(), null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
