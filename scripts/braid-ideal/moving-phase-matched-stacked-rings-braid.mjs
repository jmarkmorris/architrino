#!/usr/bin/env node

// Section 96: moving phase-matched stacked planar rings. All delayed-force
// and tilt-rate rows are returned by the production causal-root API. The
// central solver is imported only and is not modified.

import { fileURLToPath } from "node:url";

import { solveMovingCircularSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { axisPencilSpectrum } from "./kapitza-flutter-stabilization.mjs";
import { MOVING_PHASE_MATCHED_STACKED_RINGS_FIXTURE as DEFAULT_FIXTURE } from "./moving-phase-matched-stacked-rings-fixture.mjs";

export const MOVING_PHASE_MATCHED_STACKED_RINGS_SCHEMA = "moving_phase_matched_stacked_rings_braid.v0";
export const MOVING_PHASE_MATCHED_STACKED_RINGS_SPEC = "reference/priorities/braid-archive/braid-ideal/moving-phase-matched-stacked-rings-braid-spec.md";

const TAU = 2 * Math.PI;
const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, s) => a.map((v) => s * v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norm = (a) => Math.hypot(...a);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

function rotateX(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
}
function rotateY(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]];
}
function rotateXY(v, ax, ay) { return rotateY(rotateX(v, ax), ay); }
function tiltRateVelocity(p, axRate, ayRate) {
  return add(scale(cross([1, 0, 0], p), axRate), scale(cross([0, 1, 0], p), ayRate));
}

function permutations(rows) {
  if (rows.length <= 1) return [rows];
  return rows.flatMap((row, i) => permutations(rows.filter((_, j) => i !== j)).map((tail) => [row, ...tail]));
}

export function buildStackGeometry({ order, innerRatio, outerRatio, u, spacingBranches = ["difference", "difference"], fixture = DEFAULT_FIXTURE }) {
  const middleRadius = fixture.fieldSpeed / fixture.omega;
  const radii = { I: innerRatio * middleRadius, M: middleRadius, O: outerRatio * middleRadius };
  const phase = { [order[0]]: 0 };
  const z = { [order[0]]: 0 };
  const gaps = [];
  for (let i = 0; i < order.length - 1; i++) {
    const source = order[i], receiver = order[i + 1];
    const spacingBranch = spacingBranches[i];
    const transverseWakeDistance = spacingBranch === "sum" ? radii[receiver] + radii[source] : Math.abs(radii[receiver] - radii[source]);
    const delay = transverseWakeDistance / fixture.fieldSpeed;
    const axialGap = u * delay;
    phase[receiver] = phase[source] - fixture.omega * delay + (spacingBranch === "sum" ? Math.PI : 0);
    z[receiver] = z[source] - axialGap;
    gaps.push({ source, receiver, spacingBranch, transverseWakeDistance, delay, axialGap, machRatio: transverseWakeDistance > 0 ? axialGap / transverseWakeDistance : 0 });
  }
  const zMean = Object.values(z).reduce((s, v) => s + v, 0) / 3;
  for (const layer of Object.keys(z)) z[layer] -= zMean;
  const rings = order.map((layer, axialIndex) => ({ layer, axialIndex, radius: radii[layer], phase: phase[layer], z: z[layer] }));
  return { order: [...order], u, omega: fixture.omega, fieldSpeed: fixture.fieldSpeed, rings, gaps };
}

export function buildStackSites(geometry) {
  return geometry.rings.flatMap((ring, ringIndex) => [
    { id: `${ring.layer}:positrino`, ringIndex, layer: ring.layer, polarity: 1, radius: ring.radius, basePhase: ring.phase, z: ring.z },
    { id: `${ring.layer}:electrino`, ringIndex, layer: ring.layer, polarity: -1, radius: ring.radius, basePhase: ring.phase + Math.PI, z: ring.z },
  ]);
}

function unpackTilts(q = Array(6).fill(0)) {
  return { x: q.slice(0, 3), y: q.slice(3, 6) };
}

export function stackSiteState(site, geometry, t, { q = Array(6).fill(0), qDot = Array(6).fill(0), referenceTime = 0 } = {}) {
  const a = unpackTilts(q), ad = unpackTilts(qDot), dt = t - referenceTime;
  const ax = a.x[site.ringIndex] + ad.x[site.ringIndex] * dt;
  const ay = a.y[site.ringIndex] + ad.y[site.ringIndex] * dt;
  const angle = geometry.omega * t + site.basePhase;
  const local0 = [site.radius * Math.cos(angle), site.radius * Math.sin(angle), 0];
  const velocity0 = [-site.radius * geometry.omega * Math.sin(angle), site.radius * geometry.omega * Math.cos(angle), 0];
  const local = rotateXY(local0, ax, ay);
  const center = [0, 0, site.z + geometry.u * t];
  return {
    position: add(center, local),
    velocity: add([0, 0, geometry.u], add(rotateXY(velocity0, ax, ay), tiltRateVelocity(local, ad.x[site.ringIndex], ad.y[site.ringIndex]))),
    center,
    radial: scale(local, 1 / site.radius),
  };
}

function circularSource(site, geometry, q = Array(6).fill(0)) {
  const a = unpackTilts(q), ax = a.x[site.ringIndex], ay = a.y[site.ringIndex];
  const U = rotateXY([site.radius * Math.cos(site.basePhase), site.radius * Math.sin(site.basePhase), 0], ax, ay);
  const V = rotateXY([-site.radius * Math.sin(site.basePhase), site.radius * Math.cos(site.basePhase), 0], ax, ay);
  return {
    centerAtEpoch: { x: 0, y: 0, z: site.z },
    centerVelocity: { x: 0, y: 0, z: geometry.u },
    radiusU: { x: U[0], y: U[1], z: U[2] },
    radiusV: { x: V[0], y: V[1], z: V[2] },
    angularVelocity: geometry.omega,
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

function exactRoots({ source, receiverState, t, fixture }) {
  return solveMovingCircularSourceCausalRoots({
    source,
    receiver: receiverRow(receiverState, t),
    hitTime: t,
    signalSpeed: fixture.fieldSpeed,
    sourceStartTime: t - fixture.delayWindow,
    sourceEndTime: t - 1e-9,
    rootTolerance: 1e-12,
    scanSubdivisions: fixture.scanSubdivisions,
    maxRoots: 32,
  }).roots ?? [];
}

function retainedLinearRoots({ sourceSite, receiverState, geometry, t, q, qDot, fixture }) {
  const roots = [], start = t - fixture.delayWindow, count = fixture.retainedSegmentCount;
  const h = fixture.delayWindow / count;
  const stateAt = (te) => stackSiteState(sourceSite, geometry, te, { q, qDot, referenceTime: t });
  const residual = (te) => norm(sub(receiverState.position, stateAt(te).position)) - fixture.fieldSpeed * (t - te);
  let g0 = residual(start);
  for (let k = 0; k < count; k++) {
    const lo = start + k * h, hi = lo + h, g1 = residual(hi);
    if ((g0 <= 0) !== (g1 <= 0) || Math.min(Math.abs(g0), Math.abs(g1)) < 1e-4) {
      const st = stateAt(lo);
      const found = solveMovingCircularSourceCausalRoots({
        source: {
          centerAtEpoch: { x: st.position[0], y: st.position[1], z: st.position[2] },
          centerVelocity: { x: st.velocity[0], y: st.velocity[1], z: st.velocity[2] },
          radiusU: { x: 0, y: 0, z: 0 }, radiusV: { x: 0, y: 0, z: 0 },
          angularVelocity: 0, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: lo,
        },
        receiver: receiverRow(receiverState, t), hitTime: t, signalSpeed: fixture.fieldSpeed,
        sourceStartTime: lo, sourceEndTime: Math.min(hi, t - 1e-9), rootTolerance: 1e-12,
        scanSubdivisions: 8, maxRoots: 4,
      });
      roots.push(...(found.roots ?? []));
    }
    g0 = g1;
  }
  roots.sort((a, b) => a.emissionTime - b.emissionTime);
  return roots.filter((root, i) => i === 0 || Math.abs(root.emissionTime - roots[i - 1].emissionTime) > 1e-7);
}

function forceFromRoots({ roots, receiverState, receiverPolarity, sourcePolarity, soft }) {
  const force = [0, 0, 0];
  let minDistance = Infinity, maxRootResidual = 0;
  for (const root of roots) {
    if (!(root.distance > 1e-8)) continue;
    const direction = [
      (root.receiverPoint.x - root.sourcePoint.x) / root.distance,
      (root.receiverPoint.y - root.sourcePoint.y) / root.distance,
      (root.receiverPoint.z - root.sourcePoint.z) / root.distance,
    ];
    const branch = (root.receiverNormalNumerator * root.sourceNormalDenominator) / (root.sourceNormalDenominator ** 2 + soft ** 2);
    const weight = receiverPolarity * sourcePolarity * branch / (root.distance ** 2);
    for (let c = 0; c < 3; c++) force[c] += weight * direction[c];
    minDistance = Math.min(minDistance, root.distance);
    maxRootResidual = Math.max(maxRootResidual, Math.abs(root.residual ?? 0));
  }
  return { force, minDistance, maxRootResidual };
}

export function measureStackRecord({ geometry, q = Array(6).fill(0), qDot = Array(6).fill(0), dynamicRateRecord = false, cycleSamples, fixture = DEFAULT_FIXTURE } = {}) {
  const sites = buildStackSites(geometry), samples = cycleSamples ?? fixture.cycleSamples, period = TAU / geometry.omega;
  const forceBySite = sites.map(() => [0, 0, 0]);
  const torqueByRing = geometry.rings.map(() => [0, 0, 0]);
  const radialForceByRing = geometry.rings.map(() => 0);
  const selfBinaryRadialByRing = geometry.rings.map(() => 0);
  const neighborRadialByRing = geometry.rings.map(() => 0);
  let rootCount = 0, minDistance = Infinity, maxRootResidual = 0;
  for (let sample = 0; sample < samples; sample++) {
    const t = sample * period / samples;
    const options = { q, qDot, referenceTime: dynamicRateRecord ? t : 0 };
    const states = sites.map((site) => stackSiteState(site, geometry, t, options));
    for (let i = 0; i < sites.length; i++) {
      const rec = sites[i], recState = states[i], Fi = [0, 0, 0];
      for (let j = 0; j < sites.length; j++) {
        if (i === j) continue;
        const roots = dynamicRateRecord
          ? retainedLinearRoots({ sourceSite: sites[j], receiverState: recState, geometry, t, q, qDot, fixture })
          : exactRoots({ source: circularSource(sites[j], geometry, q), receiverState: recState, t, fixture });
        const row = forceFromRoots({ roots, receiverState: recState, receiverPolarity: rec.polarity, sourcePolarity: sites[j].polarity, soft: fixture.soft });
        rootCount += roots.length;
        minDistance = Math.min(minDistance, row.minDistance);
        maxRootResidual = Math.max(maxRootResidual, row.maxRootResidual);
        for (let c = 0; c < 3; c++) Fi[c] += row.force[c] / samples;
        const radialContribution = dot(row.force, recState.radial) / (2 * samples);
        if (sites[j].ringIndex === rec.ringIndex) selfBinaryRadialByRing[rec.ringIndex] += radialContribution;
        else neighborRadialByRing[rec.ringIndex] += radialContribution;
      }
      for (let c = 0; c < 3; c++) forceBySite[i][c] += Fi[c];
      radialForceByRing[rec.ringIndex] += dot(Fi, recState.radial) / 2;
      const arm = sub(recState.position, recState.center), Ti = cross(arm, Fi);
      for (let c = 0; c < 3; c++) torqueByRing[rec.ringIndex][c] += Ti[c];
    }
  }
  return { forceBySite, torqueByRing, radialForceByRing, selfBinaryRadialByRing, neighborRadialByRing, rootCount, minDistance, maxRootResidual, recordKind: dynamicRateRecord ? "production_retained_linear_segments" : "production_moving_circular_roots" };
}

function bindingSummary(geometry, record) {
  const rawRadial = [...record.radialForceByRing];
  const requiredRadial = geometry.rings.map((ring) => -(geometry.omega ** 2) * ring.radius);
  const denominator = rawRadial.reduce((s, v) => s + v * v, 0);
  const coupling = denominator > 0 ? rawRadial.reduce((s, v, i) => s + v * requiredRadial[i], 0) / denominator : 0;
  const residual = rawRadial.map((v, i) => coupling * v - requiredRadial[i]);
  const closureResidual = norm(residual);
  const relativeClosureResidual = closureResidual / Math.max(1e-15, norm(requiredRadial));
  const axialPump = coupling * record.torqueByRing.reduce((s, row) => s + row[2], 0);
  return { rawRadial, selfBinaryRadial: record.selfBinaryRadialByRing, neighborRadial: record.neighborRadialByRing, requiredRadial, coupling, residual, closureResidual, relativeClosureResidual, axialPump };
}

function phaseMatchRows(geometry, fixture) {
  const sites = buildStackSites(geometry);
  return geometry.gaps.map((gap) => {
    const sourceSite = sites.find((site) => site.layer === gap.source && site.polarity === 1);
    const receiverSite = sites.find((site) => site.layer === gap.receiver && site.polarity === 1);
    const receiverState = stackSiteState(receiverSite, geometry, 0);
    const roots = exactRoots({ source: circularSource(sourceSite, geometry), receiverState, t: 0, fixture });
    const selected = [...roots].sort((a, b) => Math.abs(a.delay - gap.delay) - Math.abs(b.delay - gap.delay))[0];
    const axialLineComponent = selected ? selected.receiverPoint.z - selected.sourcePoint.z : Infinity;
    const direction = selected ? [
      (selected.receiverPoint.x - selected.sourcePoint.x) / selected.distance,
      (selected.receiverPoint.y - selected.sourcePoint.y) / selected.distance,
      (selected.receiverPoint.z - selected.sourcePoint.z) / selected.distance,
    ] : [Infinity, Infinity, Infinity];
    const arm = sub(receiverState.position, receiverState.center);
    return {
      ...gap,
      rootCount: roots.length,
      selectedDelay: selected?.delay ?? null,
      selectedRootResidual: selected?.residual ?? null,
      axialLineComponent,
      selectedAxialTorqueGeometry: cross(arm, direction)[2],
      transverseOnly: Math.abs(axialLineComponent) <= fixture.phaseMatchAxialTolerance,
    };
  });
}

function candidateRows(fixture) {
  const rows = [];
  const spacingRows = fixture.spacingBranches.flatMap((first) => fixture.spacingBranches.map((second) => [first, second]));
  for (const order of permutations(["I", "M", "O"])) for (const innerRatio of fixture.innerRadiusRatios) for (const outerRatio of fixture.outerRadiusRatios) for (const u of fixture.velocityGrid) for (const spacingBranches of spacingRows) {
    const geometry = buildStackGeometry({ order, innerRatio, outerRatio, u, spacingBranches, fixture });
    const record = measureStackRecord({ geometry, fixture });
    const binding = bindingSummary(geometry, record);
    const phaseMatch = phaseMatchRows(geometry, fixture);
    rows.push({ geometry, record, binding, phaseMatch, allPhaseMatched: phaseMatch.every((row) => row.transverseOnly) });
  }
  rows.sort((a, b) => {
    const aPenalty = a.binding.coupling > 0 ? 0 : 1000;
    const bPenalty = b.binding.coupling > 0 ? 0 : 1000;
    return (aPenalty + a.binding.relativeClosureResidual) - (bPenalty + b.binding.relativeClosureResidual);
  });
  return rows;
}

function refineBinding(seed, fixture) {
  const middleRadius = fixture.fieldSpeed / fixture.omega;
  const order = seed.geometry.order;
  const spacingBranches = seed.geometry.gaps.map((gap) => gap.spacingBranch);
  let params = [
    seed.geometry.rings.find((ring) => ring.layer === "I").radius / middleRadius,
    seed.geometry.rings.find((ring) => ring.layer === "O").radius / middleRadius,
    seed.geometry.u,
  ];
  const history = [];
  const evaluate = ([innerRatio, outerRatio, u]) => {
    const clean = [
      Math.max(0.5, Math.min(0.99, innerRatio)),
      Math.max(1.01, Math.min(1.6, outerRatio)),
      Math.max(0.05, Math.min(0.95, u)),
    ];
    const geometry = buildStackGeometry({ order, innerRatio: clean[0], outerRatio: clean[1], u: clean[2], spacingBranches, fixture });
    const record = measureStackRecord({ geometry, fixture });
    const binding = bindingSummary(geometry, record);
    const phaseMatch = phaseMatchRows(geometry, fixture);
    return { params: clean, geometry, record, binding, phaseMatch, allPhaseMatched: phaseMatch.every((row) => row.transverseOnly) };
  };
  let current = evaluate(params);
  for (const step of [0.1, 0.05, 0.025, 0.0125, 0.00625, 0.003125, 0.0015625, 0.00078125]) {
    let best = current;
    for (const di of [-step, 0, step]) for (const dO of [-step, 0, step]) for (const du of [-step, 0, step]) {
      const trial = evaluate([current.params[0] + di, current.params[1] + dO, current.params[2] + du]);
      const trialScore = (trial.binding.coupling > 0 ? 0 : 1000) + trial.binding.relativeClosureResidual;
      const bestScore = (best.binding.coupling > 0 ? 0 : 1000) + best.binding.relativeClosureResidual;
      if (trialScore < bestScore) best = trial;
    }
    current = best;
    history.push({ step, params: current.params, coupling: current.binding.coupling, relativeClosureResidual: current.binding.relativeClosureResidual, axialPump: current.binding.axialPump });
  }
  return { ...current, history };
}

function stabilitySpectrum(candidate, fixture) {
  const n = 6, K = zeros(n), D = zeros(n), h = fixture.tiltStep, hd = fixture.tiltRateStep;
  const torqueVector = (record) => [
    ...record.torqueByRing.map((row) => candidate.binding.coupling * row[0]),
    ...record.torqueByRing.map((row) => candidate.binding.coupling * row[1]),
  ];
  for (let j = 0; j < n; j++) {
    const qp = Array(n).fill(0), qm = Array(n).fill(0); qp[j] = h; qm[j] = -h;
    const plus = torqueVector(measureStackRecord({ geometry: candidate.geometry, q: qp, cycleSamples: fixture.derivativeCycleSamples, fixture }));
    const minus = torqueVector(measureStackRecord({ geometry: candidate.geometry, q: qm, cycleSamples: fixture.derivativeCycleSamples, fixture }));
    for (let i = 0; i < n; i++) K[i][j] = (plus[i] - minus[i]) / (2 * h);
    const rp = Array(n).fill(0), rm = Array(n).fill(0); rp[j] = hd; rm[j] = -hd;
    const ratePlus = torqueVector(measureStackRecord({ geometry: candidate.geometry, qDot: rp, dynamicRateRecord: true, cycleSamples: fixture.rateCycleSamples, fixture }));
    const rateMinus = torqueVector(measureStackRecord({ geometry: candidate.geometry, qDot: rm, dynamicRateRecord: true, cycleSamples: fixture.rateCycleSamples, fixture }));
    for (let i = 0; i < n; i++) D[i][j] = (ratePlus[i] - rateMinus[i]) / (2 * hd);
  }
  const weights = candidate.geometry.rings.map((ring) => 2 * ring.radius ** 2);
  const mass = zeros(n), velocity = zeros(n), stiffness = zeros(n);
  for (let i = 0; i < n; i++) mass[i][i] = weights[i % 3];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { velocity[i][j] = -D[i][j]; stiffness[i][j] = -K[i][j]; }
  const spectrum = axisPencilSpectrum({ mass, velocity, stiffness });
  const unstableComplex = spectrum.quotient.filter((row) => row.re > fixture.marginalGrowthTolerance && Math.abs(row.im) > fixture.flutterImaginaryTolerance);
  unstableComplex.sort((a, b) => b.re - a.re);
  const xBlock = K.slice(0, 3).map((row) => row.slice(0, 3));
  const yBlock = K.slice(3, 6).map((row) => row.slice(3, 6));
  const axisSymmetryResidual = Math.max(...xBlock.flatMap((row, i) => row.map((v, j) => Math.abs(v - yBlock[i][j]))));
  const stiffnessScale = Math.max(1e-15, ...K.flat().map(Math.abs));
  const leading = spectrum.leading;
  return {
    normalizedSecondOrderWeights: weights,
    staticTorqueJacobian: K,
    rateTorqueJacobian: D,
    leadingRe: leading.re,
    leadingIm: Math.abs(leading.im),
    pencilResidual: leading.pencilResidual,
    dkResidual: spectrum.dkResidual,
    axisSymmetryResidual,
    relativeAxisSymmetryResidual: axisSymmetryResidual / stiffnessScale,
    unstableComplexCount: unstableComplex.length,
    leadingUnstableComplex: unstableComplex[0] ?? null,
    flutterAbsent: unstableComplex.length === 0,
    stableOrMarginal: Number.isFinite(leading.re) && leading.re <= fixture.marginalGrowthTolerance,
  };
}

function regressionControls(candidate, fixture) {
  const best = candidate.geometry;
  const inner = best.rings.find((ring) => ring.layer === "I").radius / (fixture.fieldSpeed / fixture.omega);
  const outer = best.rings.find((ring) => ring.layer === "O").radius / (fixture.fieldSpeed / fixture.omega);
  const atRest = buildStackGeometry({ order: best.order, innerRatio: inner, outerRatio: outer, u: 0, spacingBranches: best.gaps.map((gap) => gap.spacingBranch), fixture });
  const singleRing = { ...best, rings: [best.rings.find((ring) => ring.layer === "M")], gaps: [] };
  const singleRecord = measureStackRecord({ geometry: singleRing, fixture });
  const singleBinding = bindingSummary(singleRing, singleRecord);
  return {
    atRestAxialGaps: atRest.gaps.map((row) => row.axialGap),
    atRestRecoversNestedLimit: atRest.gaps.every((row) => row.axialGap === 0),
    singleFlatBinaryRootCount: singleRecord.rootCount,
    singleFlatBinaryHasFiniteRadialSupport: Number.isFinite(singleBinding.rawRadial[0]) && singleBinding.rawRadial[0] < 0,
  };
}

export function movingPhaseMatchedStackedRingsBraid({ fixture = DEFAULT_FIXTURE } = {}) {
  const rows = candidateRows(fixture), selected = refineBinding(rows[0], fixture);
  const stability = stabilitySpectrum(selected, fixture);
  const bindingCloses = selected.allPhaseMatched && selected.binding.coupling > 0 && selected.binding.relativeClosureResidual <= fixture.bindingRelativeTolerance;
  const pumpFree = Math.abs(selected.binding.axialPump) <= fixture.pumpTolerance;
  const flutterFree = stability.flutterAbsent && stability.stableOrMarginal;
  const phase1Closes = bindingCloses && pumpFree && flutterFree;
  const firstFailedGate = !bindingCloses ? "single_stack_binding" : !pumpFree ? "single_stack_axial_pump" : !flutterFree ? "single_stack_tilt_spectrum" : null;
  const velocitySweep = fixture.velocityGrid.map((u) => {
    const atU = rows.filter((row) => row.geometry.u === u).sort((a, b) => a.binding.relativeClosureResidual - b.binding.relativeClosureResidual)[0];
    return {
      u,
      order: atU.geometry.order,
      axialGaps: atU.geometry.gaps.map((gap) => gap.axialGap),
      transverseWakeDistances: atU.geometry.gaps.map((gap) => gap.transverseWakeDistance),
      machRatios: atU.geometry.gaps.map((gap) => gap.machRatio),
      relativeClosureResidual: atU.binding.relativeClosureResidual,
      axialPump: atU.binding.axialPump,
    };
  });
  return {
    schema: MOVING_PHASE_MATCHED_STACKED_RINGS_SCHEMA,
    spec: MOVING_PHASE_MATCHED_STACKED_RINGS_SPEC,
    claimLevel: "seed_grade_force_balance_geometry_diagnostic_stability_void_non_equilibrium",
    recoveryAdjudication: {
      forceBalancePreconditionPasses: bindingCloses,
      stabilityClaimStatus: bindingCloses ? "candidate_requires_independent_dynamical_confirmation" : "retired_void_non_equilibrium",
      survivingClaimScope: "mach_geometry_force_balance_pump_and_non_bind_only",
    },
    sharedRecord: {
      staticRows: "AbsoluteHistoryRootRuntime moving-circular production roots",
      rateRows: "AbsoluteHistoryRootRuntime retained linear-segment production roots",
      centralSolverTouched: false,
    },
    search: { rowCount: rows.length, selectedOrder: selected.geometry.order, selectedGeometry: selected.geometry, bindingRefinement: selected.history, bestRows: rows.slice(0, 8).map((row) => ({ order: row.geometry.order, spacingBranches: row.geometry.gaps.map((gap) => gap.spacingBranch), u: row.geometry.u, radii: row.geometry.rings.map((ring) => ring.radius), coupling: row.binding.coupling, relativeClosureResidual: row.binding.relativeClosureResidual, axialPump: row.binding.axialPump })) },
    phaseMatch: { rows: selected.phaseMatch, transverseOnly: selected.allPhaseMatched },
    binding: selected.binding,
    pump: { netSecularAxialTorque: selected.binding.axialPump, pumpFree },
    stability,
    velocitySweep,
    lorentzTension: "the imposed Mach geometry makes each axial gap grow linearly with u; it does not reproduce Lorentz axial contraction and therefore leaves a kinematic tension rather than a derived Lorentz law",
    controls: regressionControls(selected, fixture),
    phase1: { bindingCloses, pumpFree, flutterFree, closes: phase1Closes, firstFailedGate },
    phase2: phase1Closes
      ? { gated: false, status: "required_but_not_yet_adjudicated" }
      : { gated: true, status: "not_run_because_phase_1_failed", firstFailedGate },
    decision: phase1Closes
      ? "single_stack_closes_proceed_to_two_ray_pro_anti_pair"
      : "single_stack_fails_seed_gate_no_pair_run_no_release",
    releaseGate: { nativeRetainedHistoryReleaseAuthorized: false },
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) process.stdout.write(`${JSON.stringify(movingPhaseMatchedStackedRingsBraid(), null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
