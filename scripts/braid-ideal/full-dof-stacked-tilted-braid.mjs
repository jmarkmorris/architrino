#!/usr/bin/env node

// Section 97: one config-driven production-root evaluator for the flat-stack /
// tilted-spindle continuum. The central runtime is imported and never changed.

import { fileURLToPath } from "node:url";
import {
  solveMovingCircularSameSourceCausalRoots,
  solveMovingCircularSourceCausalRoots,
} from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { axisPencilSpectrum } from "./kapitza-flutter-stabilization.mjs";
import { braidNetZTorque, gyroscopicTiltAnalysisFull } from "./spindle-support-ratio-targeted-search.mjs";
import { movingPhaseMatchedStackedRingsBraid } from "./moving-phase-matched-stacked-rings-braid.mjs";
import { FULL_DOF_STACKED_TILTED_FIXTURE as DEFAULT_FIXTURE } from "./full-dof-stacked-tilted-braid-fixture.mjs";

export const FULL_DOF_STACKED_TILTED_SCHEMA = "full_dof_stacked_tilted_braid.v0";
export const FULL_DOF_STACKED_TILTED_SPEC = "reference/priorities/braid-archive/braid-ideal/full-dof-stacked-tilted-braid-spec.md";
const TAU = 2 * Math.PI;
const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, s) => a.map((v) => s * v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norm = (a) => Math.hypot(...a);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const clone = (x) => structuredClone(x);

function rotateX(v, a) { const c = Math.cos(a), s = Math.sin(a); return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]]; }
function rotateY(v, a) { const c = Math.cos(a), s = Math.sin(a); return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]]; }
function rotateXY(v, ax, ay) { return rotateY(rotateX(v, ax), ay); }

export function normalizeFullDofConfig(config, fixture = DEFAULT_FIXTURE) {
  if (!config || !Array.isArray(config.rings) || config.rings.length < 1) throw new Error("config.rings must contain at least one ring");
  const ids = new Set();
  const rings = config.rings.map((r, i) => {
    const id = String(r.id ?? `R${i + 1}`);
    if (ids.has(id)) throw new Error(`duplicate ring id: ${id}`);
    ids.add(id);
    const row = {
      id, radius: Number(r.radius), omega: Number(r.omega), tilt: Number(r.tilt ?? 0), z: Number(r.z ?? 0),
      phase: Number(r.phase ?? 0), sense: Math.sign(Number(r.sense ?? 1)) || 1,
      polarity: Math.sign(Number(r.polarity ?? 1)) || 1, chargeCount: Number(r.chargeCount ?? 2),
      eccentricity: Number(r.eccentricity ?? 0), breathingAmplitude: Number(r.breathingAmplitude ?? 0),
      axisMisalignment: Number(r.axisMisalignment ?? 0), axialModeAmplitude: Number(r.axialModeAmplitude ?? 0),
      strength: Number(r.strength ?? 1), auxiliary: Boolean(r.auxiliary),
    };
    if (!(row.radius > 0) || !(Math.abs(row.omega) > 0)) throw new Error(`ring ${id} requires positive radius and nonzero omega`);
    return row;
  });
  return {
    id: String(config.id ?? "full_dof_point"), fieldSpeed: Number(config.fieldSpeed ?? fixture.fieldSpeed),
    drift: Number(config.drift ?? 0), rings,
    delayWindow: Number(config.delayWindow ?? fixture.delayWindow),
    couplingFit: config.couplingFit ?? "radial",
    controlFamily: config.controlFamily ?? null,
    payload: { type: "none", position: "middle_gap", internalConfig: "on_axis_column", spinning: false, ...(config.payload ?? {}) },
    sea: { enabled: false, density: 0, cadence: 0.5, spacing: 2, orientationLag: 0, ...(config.sea ?? {}) },
    handedness: Number(config.handedness ?? 1), includeSelfHits: config.includeSelfHits ?? true,
    axialOrder: config.axialOrder ?? rings.map((r) => r.id), speedRegime: config.speedRegime ?? "mixed",
  };
}

function payloadZ(config) {
  const sorted = [...config.rings].sort((a, b) => a.z - b.z);
  if (config.payload.position === "inner_gap") return (sorted[0].z + sorted[1].z) / 2;
  if (config.payload.position === "outer_gap") return (sorted.at(-1).z + sorted.at(-2).z) / 2;
  if (typeof config.payload.position === "number") return Number(config.payload.position);
  return sorted.reduce((s, r) => s + r.z, 0) / sorted.length;
}

function interactionRings(config) {
  const rows = config.rings.map((r, i) => ({ ...r, primaryRingIndex: i }));
  if (config.payload.type !== "none") {
    const typeRows = {
      electron_6epsilon: { chargeCount: 6, strength: 0.35 },
      down_type_mixed: { chargeCount: 3, strength: 0.45 },
      neutrino_near_photon: { chargeCount: 2, strength: 0.2 },
    };
    const shape = typeRows[config.payload.type] ?? typeRows.neutrino_near_photon;
    const baseOmega = config.rings.reduce((s, r) => s + Math.abs(r.omega), 0) / config.rings.length;
    const internal = config.payload.internalConfig;
    rows.push({
      id: `payload:${config.payload.type}`, radius: internal === "on_axis_column" ? 0.08 : internal === "exposed_shielded_triad" ? 0.28 : 0.2,
      omega: config.payload.spinning ? baseOmega : 0.05, tilt: internal === "exposed_shielded_triad" ? Math.PI / 5 : 0,
      z: payloadZ(config), phase: Number(config.payload.phase ?? 0), sense: Number(config.payload.sense ?? 1), polarity: -1,
      eccentricity: 0, breathingAmplitude: 0, axisMisalignment: 0, axialModeAmplitude: 0,
      ...shape, auxiliary: true, primaryRingIndex: -1,
    });
  }
  if (config.sea.enabled && config.sea.density > 0) rows.push({
    id: "ambient_sea_probe", radius: Math.max(0.2, Number(config.sea.spacing)), omega: Math.max(0.05, Math.abs(Number(config.sea.cadence))),
    tilt: Number(config.sea.orientationLag), z: 0, phase: Number(config.sea.orientationLag), sense: 1,
    polarity: Number(config.sea.polarity ?? 1), chargeCount: 3, strength: Number(config.sea.density),
    eccentricity: 0, breathingAmplitude: 0, axisMisalignment: Number(config.sea.orientationLag), axialModeAmplitude: 0,
    auxiliary: true, primaryRingIndex: -1,
  });
  return rows;
}

export function buildFullDofSites(config, fixture = DEFAULT_FIXTURE) {
  const c = normalizeFullDofConfig(config, fixture);
  return interactionRings(c).flatMap((ring) => Array.from({ length: ring.chargeCount }, (_, siteOrdinal) => {
    const offset = (TAU * siteOrdinal) / ring.chargeCount;
    const sign = ring.chargeCount === 2 ? (siteOrdinal === 0 ? 1 : -1) : Math.cos(offset);
    const polaritySign = siteOrdinal % 2 === 0 ? 1 : -1;
    return {
      id: `${ring.id}:${siteOrdinal + 1}`, ringIndex: ring.primaryRingIndex, dynamicRingIndex: ring.primaryRingIndex,
      auxiliary: ring.auxiliary, siteOrdinal, siteCount: ring.chargeCount, ring, sign,
      polarity: ring.polarity * polaritySign, strength: ring.strength ?? 1,
      rho: ring.radius * Math.cos(ring.tilt), zLocal: sign * ring.radius * Math.sin(ring.tilt),
      basePhase: ring.phase + offset,
    };
  }));
}

function unpack(q, n) { return { x: q.slice(0, n), y: q.slice(n, 2 * n) }; }

export function fullDofSiteState(site, config, t, { q = [], qDot = [], referenceTime = 0 } = {}) {
  const n = config.rings.length, a = unpack(q.length ? q : Array(2 * n).fill(0), n), ad = unpack(qDot.length ? qDot : Array(2 * n).fill(0), n);
  const idx = site.dynamicRingIndex;
  const ax = (idx >= 0 ? a.x[idx] + ad.x[idx] * (t - referenceTime) : 0);
  const ay = (idx >= 0 ? a.y[idx] + ad.y[idx] * (t - referenceTime) : 0);
  const axRate = idx >= 0 ? ad.x[idx] : 0, ayRate = idx >= 0 ? ad.y[idx] : 0;
  const w = config.handedness * site.ring.sense * site.ring.omega;
  const angle = w * t + site.basePhase;
  const e = site.ring.eccentricity, b = site.ring.breathingAmplitude, axial = site.ring.axialModeAmplitude;
  const breathing = 1 + b * Math.cos(2 * angle), breathingDot = -2 * w * b * Math.sin(2 * angle);
  const rx = site.rho * (1 + e), ry = site.rho * (1 - e);
  const raw = [rx * breathing * Math.cos(angle), ry * breathing * Math.sin(angle), site.zLocal + axial * Math.cos(angle)];
  const rawVelocity = [
    rx * (breathingDot * Math.cos(angle) - breathing * w * Math.sin(angle)),
    ry * (breathingDot * Math.sin(angle) + breathing * w * Math.cos(angle)),
    -axial * w * Math.sin(angle),
  ];
  const baseRaw = rotateX(raw, site.ring.axisMisalignment), baseVelocity = rotateX(rawVelocity, site.ring.axisMisalignment);
  const local = rotateXY(baseRaw, ax, ay);
  const rotatedVelocity = rotateXY(baseVelocity, ax, ay);
  const rateVelocity = add(scale(cross([1, 0, 0], local), axRate), scale(cross([0, 1, 0], local), ayRate));
  const center = [0, 0, site.ring.z + config.drift * t];
  const axx = -rx * w * w * ((1 + b / 2) * Math.cos(angle) + (9 * b / 2) * Math.cos(3 * angle));
  const ayy = -ry * w * w * ((1 - b / 2) * Math.sin(angle) + (9 * b / 2) * Math.sin(3 * angle));
  const azz = -axial * w * w * Math.cos(angle);
  const requiredAcceleration = rotateXY(rotateX([axx, ayy, azz], site.ring.axisMisalignment), ax, ay);
  return {
    position: add(center, local), velocity: add([0, 0, config.drift], add(rotatedVelocity, rateVelocity)), center,
    requiredAcceleration, arm: local,
  };
}

function circularSource(site, config, q = []) {
  const n = config.rings.length, a = unpack(q.length ? q : Array(2 * n).fill(0), n), idx = site.dynamicRingIndex;
  const ax = idx >= 0 ? a.x[idx] : 0, ay = idx >= 0 ? a.y[idx] : 0;
  const rx = site.rho * (1 + site.ring.eccentricity), ry = site.rho * (1 - site.ring.eccentricity);
  const U = rotateXY(rotateX([rx * Math.cos(site.basePhase), ry * Math.sin(site.basePhase), 0], site.ring.axisMisalignment), ax, ay);
  const V = rotateXY(rotateX([-rx * Math.sin(site.basePhase), ry * Math.cos(site.basePhase), 0], site.ring.axisMisalignment), ax, ay);
  const zOffset = rotateXY(rotateX([0, 0, site.zLocal], site.ring.axisMisalignment), ax, ay);
  return {
    centerAtEpoch: { x: zOffset[0], y: zOffset[1], z: site.ring.z + zOffset[2] },
    centerVelocity: { x: 0, y: 0, z: config.drift },
    radiusU: { x: U[0], y: U[1], z: U[2] }, radiusV: { x: V[0], y: V[1], z: V[2] },
    angularVelocity: config.handedness * site.ring.sense * site.ring.omega, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: 0,
  };
}

function needsSegmentedHistory(site) {
  return Math.abs(site.ring.breathingAmplitude) > 0 || Math.abs(site.ring.axialModeAmplitude) > 0;
}

function receiverRow(state, t) { return { startTime: t, positionAtStart: { x: state.position[0], y: state.position[1], z: state.position[2] }, velocity: { x: state.velocity[0], y: state.velocity[1], z: state.velocity[2] } }; }

function exactRoots(sourceSite, receiverState, config, t, q, fixture, self) {
  const source = circularSource(sourceSite, config, q);
  if (self) return solveMovingCircularSameSourceCausalRoots({
    source, hitTime: t, signalSpeed: config.fieldSpeed, sourceStartTime: t - config.delayWindow, sourceEndTime: t,
    minimumDelay: fixture.minimumSelfDelay, rootTolerance: 1e-12, scanSubdivisions: fixture.scanSubdivisions, maxRoots: 32,
  }).roots ?? [];
  return solveMovingCircularSourceCausalRoots({
    source, receiver: receiverRow(receiverState, t), hitTime: t, signalSpeed: config.fieldSpeed,
    sourceStartTime: t - config.delayWindow, sourceEndTime: t - 1e-9, rootTolerance: 1e-12,
    scanSubdivisions: fixture.scanSubdivisions, maxRoots: 32,
  }).roots ?? [];
}

function retainedLinearRoots(sourceSite, receiverState, config, t, q, qDot, fixture) {
  const roots = [], start = t - config.delayWindow, count = fixture.retainedSegmentCount, h = config.delayWindow / count;
  const stateAt = (te) => fullDofSiteState(sourceSite, config, te, { q, qDot, referenceTime: t });
  const residual = (te) => norm(sub(receiverState.position, stateAt(te).position)) - config.fieldSpeed * (t - te);
  let g0 = residual(start);
  for (let k = 0; k < count; k++) {
    const lo = start + k * h, hi = lo + h, g1 = residual(hi);
    if ((g0 <= 0) !== (g1 <= 0) || Math.min(Math.abs(g0), Math.abs(g1)) < 1e-4) {
      const st = stateAt(lo);
      const found = solveMovingCircularSourceCausalRoots({
        source: { centerAtEpoch: { x: st.position[0], y: st.position[1], z: st.position[2] }, centerVelocity: { x: st.velocity[0], y: st.velocity[1], z: st.velocity[2] }, radiusU: { x: 0, y: 0, z: 0 }, radiusV: { x: 0, y: 0, z: 0 }, angularVelocity: 0, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: lo },
        receiver: receiverRow(receiverState, t), hitTime: t, signalSpeed: config.fieldSpeed, sourceStartTime: lo,
        sourceEndTime: Math.min(hi, t - 1e-9), rootTolerance: 1e-12, scanSubdivisions: 8, maxRoots: 4,
      });
      roots.push(...(found.roots ?? []));
    }
    g0 = g1;
  }
  roots.sort((a, b) => a.emissionTime - b.emissionTime);
  return roots.filter((r, i) => i === 0 || Math.abs(r.emissionTime - roots[i - 1].emissionTime) > 1e-7);
}

function rootForce(roots, receiverPolarity, sourcePolarity, soft, receiverStrength = 1, sourceStrength = 1) {
  const force = [0, 0, 0]; let maxRootResidual = 0, minDistance = Infinity;
  for (const root of roots) {
    if (!(root.distance > 1e-8)) continue;
    const direction = [(root.receiverPoint.x - root.sourcePoint.x) / root.distance, (root.receiverPoint.y - root.sourcePoint.y) / root.distance, (root.receiverPoint.z - root.sourcePoint.z) / root.distance];
    const Ds = root.sourceNormalDenominator, Dt = root.receiverNormalNumerator;
    const weight = receiverStrength * sourceStrength * receiverPolarity * sourcePolarity * (Dt * Ds) / (Ds * Ds + soft * soft) / (root.distance ** 2);
    for (let c = 0; c < 3; c++) force[c] += weight * direction[c];
    maxRootResidual = Math.max(maxRootResidual, Math.abs(root.residual ?? 0)); minDistance = Math.min(minDistance, root.distance);
  }
  return { force, maxRootResidual, minDistance };
}

function compositePeriod(config) {
  const slow = Math.min(...config.rings.map((r) => Math.abs(r.omega)));
  return TAU / slow;
}

export function measureFullDofRecord({ config, q = [], qDot = [], dynamicRateRecord = false, cycleSamples, fixture = DEFAULT_FIXTURE } = {}) {
  const c = normalizeFullDofConfig(config, fixture), sites = buildFullDofSites(c, fixture), n = c.rings.length;
  const samples = cycleSamples ?? fixture.cycleSamples, period = compositePeriod(c);
  const forceBySite = sites.map(() => [0, 0, 0]), torqueByRing = c.rings.map(() => [0, 0, 0]);
  const requiredBySite = sites.map(() => [0, 0, 0]);
  const radialForceByRing = c.rings.map(() => 0), requiredRadialByRing = c.rings.map(() => 0);
  let fullFitNumerator = 0, fullFitDenominator = 0, fullFitRequiredNorm = 0, totalAxialTorque = 0;
  let rootCount = 0, selfRootCount = 0, maxRootResidual = 0, minDistance = Infinity;
  for (let sample = 0; sample < samples; sample++) {
    const t = sample * period / samples, opts = { q, qDot, referenceTime: dynamicRateRecord ? t : 0 };
    const states = sites.map((s) => fullDofSiteState(s, c, t, opts));
    for (let i = 0; i < sites.length; i++) {
      const rec = sites[i], state = states[i], Fi = [0, 0, 0];
      for (let j = 0; j < sites.length; j++) {
        const self = i === j;
        const totalSpeed = norm(state.velocity);
        if (self && (!c.includeSelfHits || totalSpeed < c.fieldSpeed)) continue;
        const roots = dynamicRateRecord || needsSegmentedHistory(sites[j])
          ? retainedLinearRoots(sites[j], state, c, t, q, qDot, fixture)
          : exactRoots(sites[j], state, c, t, q, fixture, self);
        const row = rootForce(roots, rec.polarity, sites[j].polarity, fixture.soft, rec.strength, sites[j].strength);
        rootCount += roots.length; if (self) selfRootCount += roots.length;
        maxRootResidual = Math.max(maxRootResidual, row.maxRootResidual); minDistance = Math.min(minDistance, row.minDistance);
        for (let k = 0; k < 3; k++) Fi[k] += row.force[k] / samples;
      }
      for (let k = 0; k < 3; k++) { forceBySite[i][k] += Fi[k]; requiredBySite[i][k] += state.requiredAcceleration[k] / samples; }
      if (!rec.auxiliary && rec.siteOrdinal === 0) {
        const instantaneousForce = scale(Fi, samples);
        fullFitNumerator += dot(instantaneousForce, state.requiredAcceleration) / samples;
        fullFitDenominator += dot(instantaneousForce, instantaneousForce) / samples;
        fullFitRequiredNorm += dot(state.requiredAcceleration, state.requiredAcceleration) / samples;
      }
      const requiredMagnitude = norm(state.requiredAcceleration);
      if (!rec.auxiliary) {
        const outward = requiredMagnitude > 0 ? scale(state.requiredAcceleration, -1 / requiredMagnitude) : [0, 0, 0];
        radialForceByRing[rec.ringIndex] += dot(Fi, outward) / rec.siteCount;
        requiredRadialByRing[rec.ringIndex] += -requiredMagnitude / (rec.siteCount * samples);
      }
      const Ti = cross(rec.auxiliary ? state.position : state.arm, Fi);
      totalAxialTorque += Ti[2];
      if (!rec.auxiliary) for (let k = 0; k < 3; k++) torqueByRing[rec.ringIndex][k] += Ti[k];
    }
  }
  return { config: c, forceBySite, requiredBySite, radialForceByRing, requiredRadialByRing, fullFitNumerator, fullFitDenominator, fullFitRequiredNorm, torqueByRing, totalAxialTorque, rootCount, selfRootCount, maxRootResidual, minDistance, recordKind: dynamicRateRecord || sites.some(needsSegmentedHistory) ? "production_retained_linear_segments" : "production_moving_circular_roots" };
}

export function summarizeFullDofRecord(record) {
  const representative = record.config.couplingFit === "full_representative";
  const raw = record.radialForceByRing, required = record.requiredRadialByRing;
  const den = representative ? record.fullFitDenominator : dot(raw, raw);
  const numerator = representative ? record.fullFitNumerator : dot(raw, required);
  const coupling = den > 0 ? numerator / den : 0;
  const residual = raw.map((v, i) => coupling * v - required[i]);
  const relativeClosureResidual = representative
    ? Math.sqrt(Math.max(0, coupling * coupling * den - 2 * coupling * numerator + record.fullFitRequiredNorm) / Math.max(1e-30, record.fullFitRequiredNorm))
    : norm(residual) / Math.max(1e-15, norm(required));
  const axialPump = coupling * record.totalAxialTorque;
  return { coupling, relativeClosureResidual, residual, axialPump };
}

export function fullDofStability({ config, coupling, fixture = DEFAULT_FIXTURE, pencilMode = null } = {}) {
  const c = normalizeFullDofConfig(config, fixture), n = c.rings.length, dim = 2 * n, K = zeros(dim), D = zeros(dim);
  const selectedPencilMode = pencilMode ?? (c.controlFamily ? "control" : "gyroscopic_family");
  if (selectedPencilMode === "control" && c.controlFamily === "section_96") {
    const r = movingPhaseMatchedStackedRingsBraid().stability;
    return { leadingRe: r.leadingRe, leadingIm: r.leadingIm, flutterLeadingRe: r.leadingUnstableComplex?.re ?? null, flutterLeadingIm: Math.abs(r.leadingUnstableComplex?.im ?? 0), unstableCount: r.unstableComplexCount, stableOrMarginal: r.stableOrMarginal, numericalSecondOrderWeights: r.normalizedSecondOrderWeights, quotient: null, dkResidual: r.dkResidual, controlBackend: "section_96_production_root_pencil" };
  }
  if (selectedPencilMode === "control" && c.controlFamily === "tilted_spindle") {
    const r = gyroscopicTiltAnalysisFull({});
    return { leadingRe: r.maxGrowthRate, leadingIm: r.leading?.im ? Math.abs(r.leading.im) : 2.41245971901678, flutterLeadingRe: r.maxGrowthRate, flutterLeadingIm: r.leading?.im ? Math.abs(r.leading.im) : 2.41245971901678, unstableCount: 1, stableOrMarginal: r.maxGrowthRate <= fixture.gates.leadingGrowth, numericalSecondOrderWeights: r.pencilMatrices.mass.map((row, i) => row[i]), quotient: r.quotient ?? null, dkResidual: r.dkResidual ?? null, controlBackend: "tilted_spindle_full_gyroscopic_axis_pencil" };
  }
  const torque = (r) => [...r.torqueByRing.map((v) => coupling * v[0]), ...r.torqueByRing.map((v) => coupling * v[1])];
  for (let j = 0; j < dim; j++) {
    const qp = Array(dim).fill(0), qm = Array(dim).fill(0); qp[j] = fixture.tiltStep; qm[j] = -fixture.tiltStep;
    const p = torque(measureFullDofRecord({ config: c, q: qp, cycleSamples: fixture.derivativeCycleSamples, fixture }));
    const m = torque(measureFullDofRecord({ config: c, q: qm, cycleSamples: fixture.derivativeCycleSamples, fixture }));
    for (let i = 0; i < dim; i++) K[i][j] = (p[i] - m[i]) / (2 * fixture.tiltStep);
    const rp = Array(dim).fill(0), rm = Array(dim).fill(0); rp[j] = fixture.tiltRateStep; rm[j] = -fixture.tiltRateStep;
    const dp = torque(measureFullDofRecord({ config: c, qDot: rp, dynamicRateRecord: true, cycleSamples: fixture.rateCycleSamples, fixture }));
    const dm = torque(measureFullDofRecord({ config: c, qDot: rm, dynamicRateRecord: true, cycleSamples: fixture.rateCycleSamples, fixture }));
    for (let i = 0; i < dim; i++) D[i][j] = (dp[i] - dm[i]) / (2 * fixture.tiltRateStep);
  }
  const mass = zeros(dim), velocity = zeros(dim), stiffness = zeros(dim);
  const integrationWeightScale = selectedPencilMode === "coarse_no_gyro" ? 2 : 1;
  const baseline = measureFullDofRecord({ config: c, cycleSamples: fixture.derivativeCycleSamples, fixture });
  c.rings.forEach((r, i) => {
    const rho = r.radius * Math.cos(r.tilt), z = r.radius * Math.sin(r.tilt);
    const weight = integrationWeightScale * (rho * rho + 2 * z * z);
    mass[i][i] = weight; mass[i + n][i + n] = weight;
    if (selectedPencilMode === "gyroscopic_family") {
      const spinTransport = 2 * rho * rho * c.handedness * r.sense * r.omega;
      const pumpCirculatory = coupling * baseline.torqueByRing[i][2];
      velocity[i][i + n] += spinTransport;
      velocity[i + n][i] -= spinTransport;
      stiffness[i][i + n] += pumpCirculatory;
      stiffness[i + n][i] -= pumpCirculatory;
    }
  });
  for (let i = 0; i < dim; i++) for (let j = 0; j < dim; j++) { velocity[i][j] -= D[i][j]; stiffness[i][j] -= K[i][j]; }
  const spectrum = axisPencilSpectrum({ mass, velocity, stiffness });
  const unstable = spectrum.quotient.filter((r) => r.re > fixture.gates.leadingGrowth);
  const flutter = unstable.filter((r) => Math.abs(r.im) > 1e-5).sort((a, b) => b.re - a.re)[0] ?? null;
  return { leadingRe: spectrum.leading.re, leadingIm: Math.abs(spectrum.leading.im), flutterLeadingRe: flutter?.re ?? null, flutterLeadingIm: Math.abs(flutter?.im ?? 0), unstableCount: unstable.length, stableOrMarginal: spectrum.leading.re <= fixture.gates.leadingGrowth, numericalSecondOrderWeights: mass.map((r, i) => r[i]), quotient: spectrum.quotient, dkResidual: spectrum.dkResidual, pencilMode: selectedPencilMode, pencilFooting: selectedPencilMode === "gyroscopic_family" ? "generalized_G_plus_Gamma_minus_measured_rate_and_static_blocks" : "coarse_no_gyroscopic_or_pump_circulatory_blocks", cornerComparable: false, claimLevel: "coarse_generalized_screen_due_to_declared_specialized_corner_discrepancy" };
}

export function evaluateFullDofPoint({ config, includeStability = true, fixture = DEFAULT_FIXTURE, pencilMode = null } = {}) {
  const record = measureFullDofRecord({ config, fixture }), summary = summarizeFullDofRecord(record);
  const stability = includeStability ? fullDofStability({ config: record.config, coupling: summary.coupling, fixture, pencilMode }) : null;
  const gates = {
    bind: summary.coupling > 0 && summary.relativeClosureResidual <= fixture.gates.bindResidual,
    pumpFree: Math.abs(summary.axialPump) <= fixture.gates.pump,
    flutterFree: stability ? stability.stableOrMarginal : null,
  };
  const J = summary.relativeClosureResidual + fixture.objectiveWeights.pump * Math.abs(summary.axialPump) + (stability ? fixture.objectiveWeights.flutter * Math.max(0, stability.leadingRe) : 0);
  return { config: record.config, record: { rootCount: record.rootCount, selfRootCount: record.selfRootCount, maxRootResidual: record.maxRootResidual, minDistance: record.minDistance, recordKind: record.recordKind }, binding: { coupling: summary.coupling, relativeClosureResidual: summary.relativeClosureResidual }, pump: { netSecularAxialTorque: summary.axialPump }, stability, gates: { ...gates, closes: gates.bind && gates.pumpFree && gates.flutterFree }, objective: J };
}

function quickScore(config, fixture) { return evaluateFullDofPoint({ config, includeStability: false, fixture }); }
function candidateKey(c) { return c.rings.map((r) => [r.radius, r.omega, r.tilt, r.z, r.phase, r.sense].map((v) => Number(v).toFixed(8)).join(",")).join(";"); }

export function stagedFullDofSearch({ fixture = DEFAULT_FIXTURE } = {}) {
  const evaluated = new Map(), stageRows = [];
  const visit = (config, stage) => {
    const c = normalizeFullDofConfig(config, fixture), key = candidateKey(c);
    if (!evaluated.has(key)) evaluated.set(key, { stage, result: quickScore(c, fixture) });
    return evaluated.get(key).result;
  };
  let seeds = [clone(fixture.spindleControl), clone(fixture.flatControl)];
  seeds.forEach((s) => { s.includeSelfHits = true; s.couplingFit = "radial"; delete s.controlFamily; visit(s, "seed"); });
  const best = () => [...evaluated.values()].sort((a, b) => a.result.objective - b.result.objective)[0].result.config;
  const stageSummary = (stage) => {
    const row = [...evaluated.values()].sort((a, b) => a.result.objective - b.result.objective)[0].result;
    stageRows.push({ stage, evaluated: evaluated.size, screeningBest: { bindResidual: row.binding.relativeClosureResidual, pump: row.pump.netSecularAxialTorque, objectiveWithoutFlutter: row.objective } });
  };
  // Stage A: independent ring cadence; exhaustive 3^3 multipliers about each corner.
  for (const seed of seeds) for (const a of fixture.search.frequencyMultipliers) for (const b of fixture.search.frequencyMultipliers) for (const d of fixture.search.frequencyMultipliers) {
    const c = clone(seed); [a, b, d].forEach((m, i) => c.rings[i].omega *= m); visit(c, "per_ring_frequency");
  }
  stageSummary("per_ring_frequency");
  // Stage B: free each phase independently about the current best.
  for (let pass = 0; pass < fixture.search.localPasses; pass++) for (let i = 0; i < 3; i++) {
    const base = clone(best()); for (const dphi of fixture.search.phaseOffsets) { const c = clone(base); c.rings[i].phase += dphi; visit(c, "free_phase"); }
  }
  stageSummary("free_phase");
  // Stage C: interpolate each ring's tilt across the flat-to-spindle interval.
  for (let i = 0; i < 3; i++) {
    const base = clone(best()), target = fixture.spindleControl.rings[i].tilt;
    for (const f of fixture.search.tiltFractions) { const c = clone(base); c.rings[i].tilt = f * target; visit(c, "tilt_continuum"); }
  }
  stageSummary("tilt_continuum");
  // Stage D: selected-ring supra-field rows; same-source roots become active.
  for (let i = 0; i < 3; i++) for (const ratio of fixture.search.supraSpeedRatios) {
    const c = clone(best()), rho = Math.abs(c.rings[i].radius * Math.cos(c.rings[i].tilt));
    c.rings[i].omega = Math.sqrt(Math.max(0, (ratio * c.fieldSpeed) ** 2 - c.drift ** 2)) / Math.max(1e-9, rho);
    visit(c, "supra_field");
  }
  stageSummary("supra_field");
  // Stage E: deterministic pseudo-random restarts over the already opened axes.
  let randomState = 0x97a5;
  const random = () => { randomState = (1664525 * randomState + 1013904223) >>> 0; return randomState / 2 ** 32; };
  for (let k = 0; k < fixture.search.randomRestarts; k++) {
    const c = clone(k % 2 ? fixture.flatControl : fixture.spindleControl);
    c.includeSelfHits = true; c.couplingFit = "radial"; delete c.controlFamily;
    c.rings.forEach((r, i) => {
      r.omega *= 0.6 + 0.8 * random();
      r.phase += (2 * random() - 1) * Math.PI;
      r.tilt = fixture.spindleControl.rings[i].tilt * random();
    });
    visit(c, "random_restart");
  }
  stageSummary("random_restart");
  const shortlist = [...evaluated.values()].sort((a, b) => a.result.objective - b.result.objective).slice(0, fixture.search.shortlistSize);
  const fullyScored = shortlist.map((row) => ({ stage: row.stage, result: evaluateFullDofPoint({ config: row.result.config, fixture }) })).sort((a, b) => a.result.objective - b.result.objective);
  const persistentBlockers = [
    fullyScored.every((r) => !r.result.gates.bind) ? "bind" : null,
    fullyScored.every((r) => !r.result.gates.pumpFree) ? "pump" : null,
    fullyScored.every((r) => !r.result.gates.flutterFree) ? "flutter" : null,
  ].filter(Boolean);
  const supraRows = [...evaluated.values()].filter((r) => r.stage === "supra_field");
  return {
    evaluatedPointCount: evaluated.size, stageRows, best: fullyScored[0], shortlist: fullyScored,
    persistentBlockersOnFullyScoredShortlist: persistentBlockers,
    supraFieldSelfHitWitness: { rows: supraRows.length, rowsWithSelfRoots: supraRows.filter((r) => r.result.record.selfRootCount > 0).length, maxSelfRootCount: Math.max(0, ...supraRows.map((r) => r.result.record.selfRootCount)) },
    coverage: {
      seeds: ["tilted_spindle_control", "section_96_flat_stack_control"],
      perRingFrequency: { multipliers: fixture.search.frequencyMultipliers, combinationsPerSeed: fixture.search.frequencyMultipliers.length ** 3 },
      freePhase: { offsets: fixture.search.phaseOffsets, rings: 3, localPasses: fixture.search.localPasses },
      tiltContinuum: { fractionsOfSpindleTilt: fixture.search.tiltFractions, rings: 3 },
      supraField: { selectedOneRingAtATime: true, totalSiteSpeedRatios: fixture.search.supraSpeedRatios },
      randomRestarts: { count: fixture.search.randomRestarts, seed: "0x97a5", frequencyMultiplierRange: [0.6, 1.4], phaseOffsetRange: [-Math.PI, Math.PI], tiltFractionRange: [0, 1] },
      unswept: ["simultaneous six-ring pro/anti optimization", "payload internal configurations", "eccentricity and breathing", "tumble", "non-rigid axial modes", "three-charge rings", "ambient-sea response", "continuous global optimization beyond the declared local grids"],
    },
  };
}

export function controlReproduction({ fixture = DEFAULT_FIXTURE } = {}) {
  const flatKnown = movingPhaseMatchedStackedRingsBraid();
  const spindlePump = braidNetZTorque({}), spindleFlutter = gyroscopicTiltAnalysisFull({});
  const flatGeneral = evaluateFullDofPoint({ config: fixture.flatControl, includeStability: true, fixture });
  const spindleGeneral = evaluateFullDofPoint({ config: fixture.spindleControl, includeStability: true, fixture });
  const flatNoFamily = clone(fixture.flatControl), spindleNoFamily = clone(fixture.spindleControl);
  delete flatNoFamily.controlFamily; delete spindleNoFamily.controlFamily;
  const flatCoarse = evaluateFullDofPoint({ config: flatNoFamily, fixture, pencilMode: "coarse_no_gyro" });
  const spindleCoarse = evaluateFullDofPoint({ config: spindleNoFamily, fixture, pencilMode: "coarse_no_gyro" });
  const flatCorrected = evaluateFullDofPoint({ config: flatNoFamily, fixture, pencilMode: "gyroscopic_family" });
  const spindleCorrected = evaluateFullDofPoint({ config: spindleNoFamily, fixture, pencilMode: "gyroscopic_family" });
  const regressionPasses = (actual, expected) => Math.abs(actual.leadingRe - expected.leadingRe) < 1e-12
    && Math.abs(actual.flutterLeadingRe - expected.flutterLeadingRe) < 1e-12 && actual.unstableCount === expected.unstableCount;
  return {
    flat: { generalized: flatGeneral, anchor: { bindResidual: flatKnown.binding.relativeClosureResidual, pump: flatKnown.pump.netSecularAxialTorque, flutter: flatKnown.stability.leadingUnstableComplex?.re ?? flatKnown.stability.leadingRe }, expected: { bindResidual: 0.049, pump: 13.4, flutter: 0.74 }, passes: Math.abs(flatGeneral.binding.relativeClosureResidual - flatKnown.binding.relativeClosureResidual) < 1e-9 && Math.abs(flatGeneral.pump.netSecularAxialTorque - flatKnown.pump.netSecularAxialTorque) < 1e-9 && Math.abs(flatGeneral.stability.flutterLeadingRe - flatKnown.stability.leadingUnstableComplex.re) < 1e-9 },
    spindle: { generalized: spindleGeneral, anchor: { pump: spindlePump.net, flutter: spindleFlutter.maxGrowthRate, radialBasin: spindleFlutter.radialBasin ?? null }, expected: { pump: 0.424, flutter: 0.199 }, passes: Math.abs(spindleGeneral.pump.netSecularAxialTorque - spindlePump.net) < 1e-9 && Math.abs(spindleGeneral.stability.flutterLeadingRe - spindleFlutter.maxGrowthRate) < 1e-9 },
    generalizedPencilKnownAnswers: {
      spindle: { actual: spindleCoarse.stability, expected: fixture.generalizedPencilKnownAnswers.spindle, passes: regressionPasses(spindleCoarse.stability, fixture.generalizedPencilKnownAnswers.spindle) },
      flat: { actual: flatCoarse.stability, expected: fixture.generalizedPencilKnownAnswers.flat, passes: regressionPasses(flatCoarse.stability, fixture.generalizedPencilKnownAnswers.flat) },
    },
    correctedSearchPencil: {
      spindle: spindleCorrected.stability,
      flat: flatCorrected.stability,
      cornerDiscrepancy: {
        spindleValidatedLeadingRe: spindleFlutter.maxGrowthRate,
        spindleCoarseLeadingRe: spindleCoarse.stability.leadingRe,
        spindleCorrectedLeadingRe: spindleCorrected.stability.leadingRe,
        correctedMinusValidated: spindleCorrected.stability.leadingRe - spindleFlutter.maxGrowthRate,
        comparableClaim: "shared_gyroscopic_G_and_pump_Gamma_structure_but_not_numerically_interchangeable_with_the_specialized_spindle_pencil",
      },
    },
  };
}

function lcg(seed) {
  let state = seed >>> 0;
  return () => { state = (1664525 * state + 1013904223) >>> 0; return state / 2 ** 32; };
}

function clamp(x, [lo, hi]) { return Math.max(lo, Math.min(hi, x)); }
function wrapPhase(x) { return ((x + Math.PI) % TAU + TAU) % TAU - Math.PI; }
function permutations3(rows) { return rows.flatMap((a, i) => rows.filter((_, j) => j !== i).flatMap((b) => rows.filter((x) => x !== a && x !== b).map((c) => [a, b, c]))); }

function vectorFromConfig(config) {
  return config.rings.flatMap((r) => [r.radius, r.z, Math.abs(r.omega), r.phase, r.tilt]);
}

function applyDiscreteBranch(config, branch, fixture) {
  const c = clone(config), byId = new Map(c.rings.map((r) => [r.id, r]));
  const orderedZ = c.rings.map((r) => r.z).sort((a, b) => a - b);
  branch.order.forEach((id, i) => { if (byId.has(id)) byId.get(id).z = orderedZ[i]; });
  c.rings.forEach((r, i) => { r.sense = branch.senses[i]; r.polarity = branch.polarities[i]; });
  c.axialOrder = branch.order; c.speedRegime = branch.speedRegime; c.handedness = branch.handedness;
  const target = { sub: 0.78, field: 1, supra: 1.16 }[branch.speedRegime];
  c.drift = Math.min(target * 0.2, 0.25);
  const maxSpeed = Math.max(...c.rings.map((r) => Math.hypot(r.omega * r.radius * Math.cos(r.tilt), c.drift)));
  const factor = target / Math.max(1e-9, maxSpeed);
  c.rings.forEach((r) => { r.omega = clamp(Math.abs(r.omega) * factor, fixture.section98.omegaRange); });
  c.includeSelfHits = true; c.couplingFit = "radial"; delete c.controlFamily;
  return c;
}

function configFromVector(vector, template, branch, fixture) {
  const c = clone(template);
  c.rings.forEach((r, i) => {
    const o = 5 * i;
    r.radius = clamp(vector[o], fixture.section98.radiusRange);
    r.z = clamp(vector[o + 1], fixture.section98.axialRange);
    r.omega = clamp(Math.abs(vector[o + 2]), fixture.section98.omegaRange);
    r.phase = wrapPhase(vector[o + 3]);
    r.tilt = clamp(vector[o + 4], fixture.section98.tiltRange);
  });
  const meanZ = c.rings.reduce((s, r) => s + r.z, 0) / c.rings.length;
  c.rings.forEach((r) => { r.z -= meanZ; });
  return applyDiscreteBranch(c, branch, fixture);
}

function objectivePrime(result, fixture) {
  const invalidCouplingPenalty = result.binding.coupling > 0 ? 0 : 10;
  const collisionPenalty = result.record.minDistance >= 0.03 ? 0 : 10 * (0.03 - result.record.minDistance);
  return result.binding.relativeClosureResidual
    + fixture.objectiveWeights.flutter * Math.max(0, result.stability.leadingRe)
    + invalidCouplingPenalty + collisionPenalty;
}

function nelderMeadBranch({ seedConfig, branch, fixture, evaluationFixture }) {
  const base = vectorFromConfig(applyDiscreteBranch(seedConfig, branch, fixture));
  const ranges = [fixture.section98.radiusRange, fixture.section98.axialRange, fixture.section98.omegaRange, fixture.section98.phaseRange, fixture.section98.tiltRange];
  let evaluationCount = 0;
  const evaluateVector = (vector) => {
    const config = configFromVector(vector, seedConfig, branch, fixture);
    const result = evaluateFullDofPoint({ config, fixture: evaluationFixture, pencilMode: "gyroscopic_family" });
    evaluationCount += 1;
    return { vector, config, result, score: objectivePrime(result, fixture) };
  };
  let simplex = [evaluateVector(base)];
  for (let j = 0; j < base.length; j++) {
    const v = [...base], range = ranges[j % 5];
    v[j] += 0.08 * (range[1] - range[0]);
    simplex.push(evaluateVector(v));
  }
  for (let iteration = 0; iteration < fixture.section98.nelderMeadIterations; iteration++) {
    simplex.sort((a, b) => a.score - b.score);
    const worst = simplex.at(-1), secondWorst = simplex.at(-2);
    const centroid = Array(base.length).fill(0);
    for (const row of simplex.slice(0, -1)) for (let j = 0; j < centroid.length; j++) centroid[j] += row.vector[j] / base.length;
    const reflectedVector = centroid.map((x, j) => x + (x - worst.vector[j]));
    const reflected = evaluateVector(reflectedVector);
    if (reflected.score < simplex[0].score) {
      const expanded = evaluateVector(centroid.map((x, j) => x + 2 * (reflectedVector[j] - x)));
      simplex[simplex.length - 1] = expanded.score < reflected.score ? expanded : reflected;
    } else if (reflected.score < secondWorst.score) simplex[simplex.length - 1] = reflected;
    else {
      const contracted = evaluateVector(centroid.map((x, j) => x + 0.5 * (worst.vector[j] - x)));
      if (contracted.score < worst.score) simplex[simplex.length - 1] = contracted;
      else {
        const anchor = simplex[0];
        simplex = [anchor, ...simplex.slice(1).map((row) => evaluateVector(row.vector.map((x, j) => anchor.vector[j] + 0.5 * (x - anchor.vector[j]))))];
      }
    }
  }
  simplex.sort((a, b) => a.score - b.score);
  return { branch, best: simplex[0], evaluationCount };
}

function branchSchedule(fixture) {
  const orders = permutations3(["I", "M", "O"]);
  const signRows = Array.from({ length: 8 }, (_, mask) => [0, 1, 2].map((i) => (mask & (1 << i)) ? -1 : 1));
  const regimes = ["sub", "field", "supra"];
  return Array.from({ length: fixture.section98.optimizerBranches }, (_, i) => ({
    id: i, order: orders[i % orders.length], senses: signRows[i % signRows.length],
    polarities: signRows[(3 * i + 1) % signRows.length], speedRegime: regimes[i % regimes.length],
    handedness: i % 2 ? -1 : 1,
  }));
}

export function jointContinuousTripleOptimization({ fixture = DEFAULT_FIXTURE } = {}) {
  const branches = branchSchedule(fixture), random = lcg(fixture.section98.optimizerSeed);
  const evaluationFixture = { ...fixture, cycleSamples: 2, derivativeCycleSamples: 1, rateCycleSamples: 1, scanSubdivisions: 96, retainedSegmentCount: 48 };
  const cornerSeeds = [fixture.spindleControl, fixture.flatControl];
  const runs = branches.map((branch, i) => {
    const seed = clone(cornerSeeds[i % 2]); delete seed.controlFamily;
    if (i >= 2) seed.rings.forEach((r) => {
      r.radius = clamp(r.radius * (0.7 + 0.6 * random()), fixture.section98.radiusRange);
      r.z = clamp(r.z + (2 * random() - 1), fixture.section98.axialRange);
      r.omega = clamp(Math.abs(r.omega) * (0.7 + 0.6 * random()), fixture.section98.omegaRange);
      r.phase = wrapPhase(r.phase + (2 * random() - 1) * Math.PI);
      r.tilt = clamp(r.tilt + (2 * random() - 1) * 0.5, fixture.section98.tiltRange);
    });
    return nelderMeadBranch({ seedConfig: seed, branch, fixture, evaluationFixture });
  });
  const coarse = runs.map((r) => ({ ...r, score: r.best.score })).sort((a, b) => a.score - b.score);
  const standardFinalists = coarse.slice(0, 6).map((row) => {
    const result = evaluateFullDofPoint({ config: row.best.config, fixture, pencilMode: "gyroscopic_family" });
    return { branch: row.branch, config: row.best.config, result, score: objectivePrime(result, fixture), coarseScore: row.score };
  }).sort((a, b) => a.score - b.score);
  const candidate = standardFinalists[0];
  const convergence = fixture.section98.convergenceSamples.map((samples) => {
    const sampleFixture = { ...fixture, cycleSamples: samples, derivativeCycleSamples: samples, rateCycleSamples: samples };
    const result = evaluateFullDofPoint({ config: candidate.config, fixture: sampleFixture, pencilMode: "gyroscopic_family" });
    return { samples, binding: result.binding, pump: result.pump, stability: { leadingRe: result.stability.leadingRe, flutterLeadingRe: result.stability.flutterLeadingRe, unstableCount: result.stability.unstableCount }, gates: { bind: result.gates.bind, flutterFree: result.gates.flutterFree }, objectivePrime: objectivePrime(result, fixture), record: result.record };
  });
  const accepted = convergence.at(-1), triplePasses = accepted.gates.bind && accepted.gates.flutterFree;
  return {
    schema: "joint_continuous_triple_optimization.v0", objective: "J_prime=epsilon_bind+w*max(0,Re_lambda_lead)",
    optimizer: "bounded_nelder_mead", seed: `0x${fixture.section98.optimizerSeed.toString(16)}`,
    branches: branches.length, evaluations: runs.reduce((s, r) => s + r.evaluationCount, 0),
    growthFloorAcrossCoarseBranchMinima: Math.min(...coarse.map((r) => r.best.result.stability.leadingRe)),
    nonpositiveGrowthBranchMinima: coarse.filter((r) => r.best.result.stability.leadingRe <= fixture.gates.leadingGrowth).length,
    continuousCoordinates: ["R_i", "z_i", "omega_i", "phi_i", "alpha_i"],
    discreteCoverage: { orders: [...new Set(branches.map((b) => b.order.join("-")))], senses: [...new Set(branches.map((b) => b.senses.join(",")))], polarities: [...new Set(branches.map((b) => b.polarities.join(",")))], speedRegimes: [...new Set(branches.map((b) => b.speedRegime))], handedness: [-1, 1], fullCartesianProductExhausted: false },
    standardFinalists, coarseBranchMinima: coarse.map((r) => ({ branch: r.branch, score: r.score, bindResidual: r.best.result.binding.relativeClosureResidual, leadingRe: r.best.result.stability.leadingRe })),
    convergence, accepted, triplePasses,
    decision: triplePasses ? "binding_flutter_free_triple_found_proceed_to_pair" : "no_binding_flutter_free_triple_in_declared_joint_optimization",
  };
}

function mean(rows, pick) {
  const values = rows.map(pick).filter(Number.isFinite);
  return values.length ? values.reduce((s, x) => s + x, 0) / values.length : null;
}
function correlation(rows, x, y) {
  const finite = rows.filter((r) => Number.isFinite(x(r)) && Number.isFinite(y(r)));
  const mx = mean(finite, x), my = mean(finite, y); let num = 0, dx = 0, dy = 0;
  for (const row of finite) { const a = x(row) - mx, b = y(row) - my; num += a * b; dx += a * a; dy += b * b; }
  return dx > 0 && dy > 0 ? num / Math.sqrt(dx * dy) : 0;
}

function randomFullDofConfig(index, random, fixture, { forceTiltZero = false } = {}) {
  const ranges = fixture.section98.randomRanges, base = clone(index % 2 ? fixture.flatControl : fixture.spindleControl);
  delete base.controlFamily; base.id = `section_98_random_${String(index).padStart(3, "0")}`;
  const order = permutations3(["I", "M", "O"])[Math.floor(random() * 6)];
  const zValues = Array.from({ length: 3 }, () => ranges.z[0] + random() * (ranges.z[1] - ranges.z[0])).sort((a, b) => a - b);
  const byId = new Map(base.rings.map((r) => [r.id, r]));
  order.forEach((id, i) => { byId.get(id).z = zValues[i]; });
  base.rings.forEach((r) => {
    const draw = (range) => range[0] + random() * (range[1] - range[0]);
    r.radius = draw(ranges.radius); r.omega = draw(ranges.omega); r.tilt = forceTiltZero ? 0 : draw(ranges.tilt); r.phase = draw(ranges.phase);
    r.sense = random() < 0.5 ? -1 : 1; r.polarity = random() < 0.5 ? -1 : 1; r.chargeCount = random() < 0.35 ? 3 : 2;
    r.eccentricity = draw(ranges.eccentricity); r.breathingAmplitude = draw(ranges.breathingAmplitude);
    r.axisMisalignment = draw(ranges.axisMisalignment); r.axialModeAmplitude = draw(ranges.axialModeAmplitude);
  });
  base.drift = ranges.drift[0] + random() * (ranges.drift[1] - ranges.drift[0]);
  base.axialOrder = order; base.handedness = random() < 0.5 ? -1 : 1;
  const regimes = ["sub", "field", "supra"]; base.speedRegime = regimes[index % regimes.length];
  const target = { sub: 0.75, field: 1, supra: 1.18 }[base.speedRegime];
  const maxSpeed = Math.max(...base.rings.map((r) => Math.hypot(r.omega * r.radius * Math.cos(r.tilt), base.drift)));
  const factor = target / Math.max(1e-9, maxSpeed); base.rings.forEach((r) => { r.omega = Math.max(0.05, r.omega * factor); });
  const payloadTypes = ["none", "electron_6epsilon", "down_type_mixed", "neutrino_near_photon"];
  const positions = ["inner_gap", "middle_gap", "outer_gap"], internal = ["on_axis_column", "co_rotating_ring", "exposed_shielded_triad"];
  base.payload = { type: payloadTypes[index % payloadTypes.length], position: positions[Math.floor(random() * positions.length)], internalConfig: internal[Math.floor(random() * internal.length)], spinning: random() < 0.5, phase: (2 * random() - 1) * Math.PI, sense: random() < 0.5 ? -1 : 1 };
  const seaEnabled = index % 2 === 0;
  base.sea = { enabled: seaEnabled, density: seaEnabled ? ranges.seaDensity[0] + random() * (ranges.seaDensity[1] - ranges.seaDensity[0]) : 0, cadence: ranges.seaCadence[0] + random() * (ranges.seaCadence[1] - ranges.seaCadence[0]), spacing: ranges.seaSpacing[0] + random() * (ranges.seaSpacing[1] - ranges.seaSpacing[0]), orientationLag: ranges.seaOrientationLag[0] + random() * (ranges.seaOrientationLag[1] - ranges.seaOrientationLag[0]), polarity: random() < 0.5 ? -1 : 1 };
  base.includeSelfHits = true; base.couplingFit = "radial";
  return base;
}

export function randomFullDofExploration({ fixture = DEFAULT_FIXTURE, points = fixture.section98.randomPoints, seed = fixture.section98.randomSeed, forceTiltZero = false, schema = "random_full_dof_exploration.v0" } = {}) {
  const random = lcg(seed);
  const evaluationFixture = { ...fixture, cycleSamples: 1, derivativeCycleSamples: 1, rateCycleSamples: 1, scanSubdivisions: 64, retainedSegmentCount: 24 };
  const rows = Array.from({ length: points }, (_, index) => {
    const config = randomFullDofConfig(index, random, fixture, { forceTiltZero });
    const result = evaluateFullDofPoint({ config, fixture: evaluationFixture, pencilMode: "gyroscopic_family" });
    const jointObjective = result.binding.relativeClosureResidual + Math.abs(result.pump.netSecularAxialTorque)
      + Math.max(0, result.stability.leadingRe) + (result.binding.coupling > 0 ? 0 : 10);
    return { index, config, result, jointObjective };
  });
  const by = (pick) => [...rows].filter((r) => Number.isFinite(pick(r))).sort((a, b) => pick(a) - pick(b))[0];
  const bestBinding = by((r) => r.result.binding.relativeClosureResidual), bestFlutter = by((r) => r.result.stability.leadingRe);
  const bestPump = by((r) => Math.abs(r.result.pump.netSecularAxialTorque)), bestJoint = by((r) => r.jointObjective);
  const convergenceFor = (row) => [1, 3, 6, 12, 24].map((samples) => {
    const sampleFixture = { ...fixture, cycleSamples: samples, derivativeCycleSamples: samples, rateCycleSamples: samples, scanSubdivisions: 96, retainedSegmentCount: 48 };
    const result = evaluateFullDofPoint({ config: row.config, fixture: sampleFixture, pencilMode: "gyroscopic_family" });
    return { samples, binding: result.binding, pump: result.pump, stability: { leadingRe: result.stability.leadingRe, flutterLeadingRe: result.stability.flutterLeadingRe, unstableCount: result.stability.unstableCount }, gates: result.gates, record: result.record };
  });
  const finiteSpectrumRows = rows.filter((r) => Number.isFinite(r.result.stability.leadingRe));
  const featureRows = [
    ["mean_eccentricity", (r) => mean(r.config.rings, (x) => x.eccentricity)],
    ["mean_breathing", (r) => mean(r.config.rings, (x) => x.breathingAmplitude)],
    ["mean_axis_misalignment", (r) => mean(r.config.rings, (x) => Math.abs(x.axisMisalignment))],
    ["mean_axial_mode", (r) => mean(r.config.rings, (x) => x.axialModeAmplitude)],
    ["three_charge_fraction", (r) => r.config.rings.filter((x) => x.chargeCount === 3).length / r.config.rings.length],
    ["sea_density", (r) => r.config.sea.density],
  ];
  const correlations = Object.fromEntries(featureRows.map(([name, pick]) => [name, {
    withBindResidual: correlation(rows, pick, (r) => r.result.binding.relativeClosureResidual),
    withLeadingRe: correlation(finiteSpectrumRows, pick, (r) => r.result.stability.leadingRe),
  }]));
  const summarizeWinner = (row) => ({ index: row.index, config: row.config, binding: row.result.binding, pump: row.result.pump, stability: { leadingRe: row.result.stability.leadingRe, flutterLeadingRe: row.result.stability.flutterLeadingRe, unstableCount: row.result.stability.unstableCount }, gates: row.result.gates, jointObjective: row.jointObjective });
  return {
    schema, seed: `0x${seed.toString(16)}`, points: rows.length, constraints: { allRingTiltsZero: forceTiltZero },
    distribution: { bind: rows.filter((r) => r.result.gates.bind).length, flutterFree: rows.filter((r) => r.result.gates.flutterFree).length, pumpFree: rows.filter((r) => r.result.gates.pumpFree).length, jointlyBindPumpFlutter: rows.filter((r) => r.result.gates.bind && r.result.gates.pumpFree && r.result.gates.flutterFree).length, finiteSpectrumScores: finiteSpectrumRows.length, failClosedNonfiniteSpectrumScores: rows.length - finiteSpectrumRows.length },
    best: { binding: summarizeWinner(bestBinding), flutter: summarizeWinner(bestFlutter), pump: summarizeWinner(bestPump), joint: summarizeWinner(bestJoint) },
    bestProbeConvergence: { binding: convergenceFor(bestBinding), flutter: convergenceFor(bestFlutter) },
    correlations,
    categorical: {
      sea: { enabledCount: rows.filter((r) => r.config.sea.enabled).length, meanLeadingReEnabled: mean(rows.filter((r) => r.config.sea.enabled), (r) => r.result.stability.leadingRe), meanLeadingReDisabled: mean(rows.filter((r) => !r.config.sea.enabled), (r) => r.result.stability.leadingRe) },
      threeCharge: { pointCount: rows.filter((r) => r.config.rings.some((x) => x.chargeCount === 3)).length, meanLeadingRe: mean(rows.filter((r) => r.config.rings.some((x) => x.chargeCount === 3)), (r) => r.result.stability.leadingRe) },
      payload: Object.fromEntries(["none", "electron_6epsilon", "down_type_mixed", "neutrino_near_photon"].map((type) => [type, { count: rows.filter((r) => r.config.payload.type === type).length, meanLeadingRe: mean(rows.filter((r) => r.config.payload.type === type), (r) => r.result.stability.leadingRe) }])),
    },
    coverage: {
      declaredRanges: fixture.section98.randomRanges,
      observedRanges: Object.fromEntries([
        ["radius", rows.flatMap((r) => r.config.rings.map((x) => x.radius))], ["omega", rows.flatMap((r) => r.config.rings.map((x) => x.omega))],
        ["tilt", rows.flatMap((r) => r.config.rings.map((x) => x.tilt))], ["z", rows.flatMap((r) => r.config.rings.map((x) => x.z))],
        ["phase", rows.flatMap((r) => r.config.rings.map((x) => x.phase))], ["eccentricity", rows.flatMap((r) => r.config.rings.map((x) => x.eccentricity))],
        ["breathingAmplitude", rows.flatMap((r) => r.config.rings.map((x) => x.breathingAmplitude))], ["axisMisalignment", rows.flatMap((r) => r.config.rings.map((x) => x.axisMisalignment))],
        ["axialModeAmplitude", rows.flatMap((r) => r.config.rings.map((x) => x.axialModeAmplitude))], ["drift", rows.map((r) => r.config.drift)],
        ["seaDensityEnabled", rows.filter((r) => r.config.sea.enabled).map((r) => r.config.sea.density)], ["seaCadence", rows.map((r) => r.config.sea.cadence)],
        ["seaSpacing", rows.map((r) => r.config.sea.spacing)], ["seaOrientationLag", rows.map((r) => r.config.sea.orientationLag)],
      ].map(([name, values]) => [name, [Math.min(...values), Math.max(...values)]])),
      discrete: { sense: [-1, 1], polarity: [-1, 1], chargeCount: [2, 3], handedness: [-1, 1], speedRegime: ["sub", "field", "supra"], axialOrdersObserved: [...new Set(rows.map((r) => r.config.axialOrder.join("-")))], payloadTypes: ["none", "electron_6epsilon", "down_type_mixed", "neutrino_near_photon"], payloadPositions: [...new Set(rows.map((r) => r.config.payload.position))], payloadInternalConfigs: [...new Set(rows.map((r) => r.config.payload.internalConfig))], seaEnabled: [false, true] },
      sampling: { cycleSamples: 1, derivativeCycleSamples: 1, rateCycleSamples: 1, retainedSegmentCount: 24, interpretation: "exploratory_complete_root_rows_at_coarse_sampling_not_release_grade" },
    },
  };
}

export function randomNoTiltExploration({ fixture = DEFAULT_FIXTURE, points = fixture.section98.noTiltRandomPoints, seed = fixture.section98.noTiltRandomSeed } = {}) {
  return randomFullDofExploration({ fixture, points, seed, forceTiltZero: true, schema: "random_no_tilt_full_dof_exploration.v0" });
}

export function section98FullDofSearch({ fixture = DEFAULT_FIXTURE } = {}) {
  const controls = controlReproduction({ fixture });
  const jointOptimization = jointContinuousTripleOptimization({ fixture });
  const randomExploration = randomFullDofExploration({ fixture });
  const triplePasses = jointOptimization.triplePasses;
  const randomBindingAtCoarseSampling = randomExploration.distribution.bind > 0;
  const randomBindingAtConvergedSampling = randomExploration.bestProbeConvergence.binding.at(-1).gates.bind;
  const randomFlutterFreeAtConvergedSampling = randomExploration.bestProbeConvergence.flutter.at(-1).gates.flutterFree;
  return {
    schema: "full_dof_stacked_tilted_section_98.v0",
    spec: "reference/priorities/braid-archive/braid-ideal/full-dof-stacked-tilted-braid-section-98-spec.md",
    claimLevel: "seed_grade_joint_optimization_and_exploratory_full_dof_scan_not_a_retained_history_release",
    controls, jointOptimization, randomExploration,
    pair: triplePasses ? { gated: false, status: "generic_candidate_pair_adapter_required_before_section_93_replay" } : { gated: true, status: "not_run_because_no_converged_binding_flutter_free_triple" },
    payload: triplePasses ? { gated: false, status: "gated_on_pair_pump_lock_and_flutter" } : { gated: true, status: "not_run_because_single_triple_gate_failed" },
    evidence: {
      randomBindingAtCoarseSampling, randomBindingAtConvergedSampling, randomFlutterFreeAtConvergedSampling,
      generalizedPencilCornerComparable: false,
      reason: "the corrected generalized pencil carries the validated gyroscopic family blocks but retains a declared spindle corner discrepancy",
    },
    decision: !triplePasses && !randomBindingAtConvergedSampling && !randomFlutterFreeAtConvergedSampling
      ? "declared_searches_find_no_binding_flutter_free_isolated_triple_pivot_recommended_to_open_system_braid_plus_sea_frame"
      : triplePasses ? "flutter_wall_breached_proceed_to_pair_pump_lock_and_flutter" : "unexpected_full_dof_lead_requires_targeted_convergence_before_pivot",
    releaseGate: { nativeRetainedHistoryReleaseAuthorized: false }, retainedBranchClaim: false, scoreMovement: "no_score_increase",
  };
}

export function fullDofStackedTiltedBraid({ fixture = DEFAULT_FIXTURE, runSearch = true } = {}) {
  const controls = controlReproduction({ fixture });
  const search = runSearch ? stagedFullDofSearch({ fixture }) : null;
  const singlePasses = search?.best.result.gates.closes ?? false;
  return {
    schema: FULL_DOF_STACKED_TILTED_SCHEMA, spec: FULL_DOF_STACKED_TILTED_SPEC,
    claimLevel: "seed_grade_full_dof_production_root_search_not_a_retained_history_release",
    sharedRecord: { staticRows: "AbsoluteHistoryRootRuntime moving-circular production roots including enabled same-source roots", rateRows: "AbsoluteHistoryRootRuntime retained linear-segment production roots", centralSolverTouched: false },
    exposedButDefaultedOff: ["eccentricity", "breathingAmplitude", "axisMisalignment", "axialModeAmplitude", "chargeCount=3", "sea density/cadence/spacing/orientation-lag"],
    controls, search,
    pair: singlePasses ? { gated: false, status: "not_run_in_single_triple_search_packet" } : { gated: true, status: "not_run_because_no_single_triple_passed_all_gates" },
    payload: singlePasses ? { gated: false, status: "not_run_in_single_triple_search_packet" } : { gated: true, status: "not_run_because_no_single_triple_passed_all_gates" },
    decision: singlePasses ? "single_candidate_passes_seed_gates_authorize_pair_search_not_native_release" : "no_single_candidate_passes_declared_sweep_report_coverage_and_persistent_gate",
    releaseGate: { nativeRetainedHistoryReleaseAuthorized: false }, retainedBranchClaim: false, scoreMovement: "no_score_increase",
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) {
  const report = process.argv.includes("--section98-no-tilt-1000")
    ? randomNoTiltExploration()
    : process.argv.includes("--section98") ? section98FullDofSearch()
      : fullDofStackedTiltedBraid({ runSearch: !process.argv.includes("--controls-only") });
  process.stdout.write(`${JSON.stringify(report, null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
}
