#!/usr/bin/env node

// Section 99: seed-grade planar free-particle assemblies. The evaluated object
// is always the complete pro/anti pair, with an explicit six-electrino payload
// for the electron and an explicitly labeled ambient-sea proxy. The central
// causal-root runtime is imported and is never modified.

import { fileURLToPath } from "node:url";

import { solveMovingCircularSourceCausalRoots } from "../../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { axisPencilSpectrum } from "./kapitza-flutter-stabilization.mjs";
import { contraRotatingProAntiPairInstrument } from "./contra-rotating-pro-anti-pair-instrument.mjs";
import { contraRotatingCrossCouplingCompletion } from "./contra-rotating-pro-anti-cross-coupling.mjs";
import { dressedContraRotatingElectronCompletion } from "./dressed-contra-rotating-electron.mjs";
import { PLANAR_ASSEMBLED_FREE_PARTICLE_FIXTURE as DEFAULT_FIXTURE } from "./planar-assembled-free-particle-fixture.mjs";

export const PLANAR_ASSEMBLED_FREE_PARTICLE_SCHEMA = "planar_assembled_free_particle.v0";
export const PLANAR_ASSEMBLED_FREE_PARTICLE_SPEC = "reference/priorities/braid-ideal/planar-assembled-free-particle-spec.md";

const TAU = 2 * Math.PI;
const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const scale = (a, s) => a.map((v) => s * v);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const norm = (a) => Math.hypot(...a);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const clone = (x) => structuredClone(x);

function rotateX(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]];
}

function wrapPhase(x) { return ((x % TAU) + TAU) % TAU; }

export function section99PairConfiguration(index, fixture = DEFAULT_FIXTURE) {
  const f = fixture.pairFactors;
  const pick = (rows, stride = 1) => rows[Math.floor(index / stride) % rows.length];
  const radiusScale = pick(f.radiusScales);
  const omegaScale = pick(f.omegaScales, 2);
  const stackScale = pick(f.stackScales, 4);
  const relativePhase = pick(f.phases, 2);
  const pocketWidth = pick(f.pocketWidths, 3);
  const occupancy = pick(f.occupancies, 5);
  const polarityPattern = pick(f.polarityPatterns, 7);
  const ordering = pick(f.orderings, 6);
  const sea = clone(pick(f.sea, 1));
  const proRings = fixture.baseRings.map((r, i) => ({ ...r, radius: r.radius * radiusScale[i], omega: r.omega * omegaScale[i], z: r.z * stackScale }));
  const antiRings = fixture.baseRings.map((r, i) => ({ ...r, radius: r.radius * radiusScale[2 - i], omega: r.omega * omegaScale[2 - i], z: -r.z * stackScale }));
  return {
    id: `pair-${index}`,
    object: "photon",
    drift: 0,
    fieldSpeed: fixture.fieldSpeed,
    relativePhase,
    pocketWidth,
    occupancy: [...occupancy],
    polarityPattern: [...polarityPattern],
    ordering,
    proRings,
    antiRings,
    sea,
    tilt: 0,
    payload: null,
  };
}

function payloadVariants(fixture = DEFAULT_FIXTURE) {
  const rows = [];
  for (const scaleFactor of fixture.electron.payloadScaleFactors) {
    for (const [arrangement, modes] of Object.entries(fixture.electron.payloadModes)) {
      for (const mode of modes) rows.push({ arrangement, mode, scaleFactor });
    }
  }
  return rows;
}

function payloadCoordinateNames(payload) {
  if (!payload) return [];
  if (payload.arrangement === "column") return ["payload_inner_z", "payload_middle_z", "payload_outer_z"];
  if (payload.arrangement === "ring") return ["payload_radius", "payload_axial_position", "payload_phase"];
  if (payload.arrangement === "octahedron") return ["payload_radius", "payload_axial_scale", "payload_phase"];
  return ["payload_radius", "payload_half_split", "payload_phase"];
}

export function section99CoordinateNames(config) {
  return [
    "relative_phase", "pocket_width",
    "R_pro_I", "R_pro_M", "R_pro_O", "R_anti_I", "R_anti_M", "R_anti_O",
    ...payloadCoordinateNames(config.payload),
  ];
}

function coordinateState(config, q = []) {
  const c = clone(config), x = Array(section99CoordinateNames(c).length).fill(0).map((_, i) => Number(q[i] ?? 0));
  c.relativePhase = wrapPhase(c.relativePhase + x[0]);
  c.pocketWidth = Math.max(0.35, c.pocketWidth + x[1]);
  for (let i = 0; i < 3; i++) c.proRings[i].radius = Math.max(0.08, c.proRings[i].radius + x[2 + i]);
  for (let i = 0; i < 3; i++) c.antiRings[i].radius = Math.max(0.08, c.antiRings[i].radius + x[5 + i]);
  if (c.payload) c.payload.coordinateOffsets = x.slice(8);
  return c;
}

function circularSite({ id, center, radius, phase, omega, tilt = 0, polarity, chargeUnits, dynamic = true, strength = 1, family, braid = null, ring = null }) {
  const U = rotateX([radius * Math.cos(phase), radius * Math.sin(phase), 0], tilt);
  const V = rotateX([-radius * Math.sin(phase), radius * Math.cos(phase), 0], tilt);
  return { id, center, U, V, omega, polarity, chargeUnits, dynamic, strength, family, braid, ring };
}

function braidSites(config, braid) {
  const pro = braid === "pro", rings = pro ? config.proRings : config.antiRings;
  const proLeads = config.ordering === "pro_pocket_anti";
  const centerZ = (pro === proLeads ? -1 : 1) * config.pocketWidth / 2;
  const phaseOffset = pro ? 0 : config.relativePhase;
  const sense = pro ? 1 : -1;
  const rows = [];
  for (let ringIndex = 0; ringIndex < 3; ringIndex++) {
    const ring = rings[ringIndex], count = config.occupancy[ringIndex], orientation = config.polarityPattern[ringIndex];
    for (let k = 0; k < count; k++) {
      const ordinalSign = k % 2 === 0 ? 1 : -1;
      const proPolarity = orientation * ordinalSign;
      const polarity = pro ? proPolarity : -proPolarity;
      rows.push(circularSite({
        id: `${braid}:${ring.id}:${k}`,
        center: [0, 0, centerZ + ring.z],
        radius: ring.radius,
        phase: ring.phase + phaseOffset + TAU * k / count,
        omega: sense * ring.omega,
        tilt: config.tilt,
        polarity,
        chargeUnits: polarity,
        family: "braid",
        braid,
        ring: ring.id,
      }));
    }
  }
  return rows;
}

function payloadSense(payload, baseOmega) {
  if (payload.mode === "co_rotating") return baseOmega;
  if (payload.mode === "counter_rotating") return -baseOmega;
  return 0;
}

export function buildSection99Payload(config) {
  if (!config.payload) return [];
  const payload = config.payload, o = payload.coordinateOffsets ?? [0, 0, 0];
  const baseOmega = config.proRings.reduce((s, r) => s + Math.abs(r.omega), 0) / 3;
  const w = payloadSense(payload, baseOmega), scaleFactor = payload.scaleFactor;
  const rows = [];
  const addPayload = (id, center, radius, phase, omega = w) => rows.push(circularSite({
    id: `payload:${id}`, center, radius, phase, omega, polarity: -1, chargeUnits: -1,
    family: "payload", dynamic: true,
  }));
  if (payload.arrangement === "column") {
    const z = [0.08, 0.2, 0.34].map((v, i) => Math.max(0.025, v * scaleFactor + Number(o[i] ?? 0))).sort((a, b) => a - b);
    for (let i = 0; i < 3; i++) { addPayload(`column:-${i}`, [0, 0, -z[2 - i]], 0, 0, 0); addPayload(`column:+${i}`, [0, 0, z[2 - i]], 0, 0, 0); }
  } else if (payload.arrangement === "ring") {
    const radius = Math.max(0.04, 0.3 * scaleFactor + Number(o[0] ?? 0));
    const z = Number(o[1] ?? 0), phase = Number(o[2] ?? 0);
    for (let k = 0; k < 6; k++) addPayload(`ring:${k}`, [0, 0, z], radius, phase + TAU * k / 6);
  } else if (payload.arrangement === "octahedron") {
    const radius = Math.max(0.04, 0.26 * scaleFactor + Number(o[0] ?? 0));
    const axial = Math.max(0.04, 0.26 * scaleFactor + Number(o[1] ?? 0)), phase = Number(o[2] ?? 0);
    for (let k = 0; k < 4; k++) addPayload(`octa:eq:${k}`, [0, 0, 0], radius, phase + TAU * k / 4);
    addPayload("octa:z-", [0, 0, -axial], 0, 0, 0); addPayload("octa:z+", [0, 0, axial], 0, 0, 0);
  } else {
    const radius = Math.max(0.04, 0.28 * scaleFactor + Number(o[0] ?? 0));
    const split = Math.max(0, 0.16 * scaleFactor + Number(o[1] ?? 0)), phase = Number(o[2] ?? 0);
    for (let triad = 0; triad < 2; triad++) for (let k = 0; k < 3; k++) {
      addPayload(`tri:${triad}:${k}`, [0, 0, triad ? split : -split], radius, phase + triad * Math.PI / 3 + TAU * k / 3);
    }
  }
  return rows;
}

function seaProxySites(config) {
  if (!config.sea.enabled || !(config.sea.density > 0)) return [];
  const rows = [];
  for (let k = 0; k < 3; k++) rows.push(circularSite({
    id: `sea:${k}`, center: [0, 0, 0], radius: config.sea.spacing,
    phase: config.sea.orientationLag + TAU * k / 3, omega: config.sea.cadence,
    polarity: k % 2 === 0 ? 1 : -1, chargeUnits: 0, dynamic: false,
    strength: config.sea.density, family: "sea_proxy",
  }));
  return rows;
}

export function buildSection99Sites(config, q = []) {
  const c = coordinateState(config, q);
  return [...braidSites(c, "pro"), ...braidSites(c, "anti"), ...buildSection99Payload(c), ...seaProxySites(c)];
}

function sitePosition(site, t, drift) {
  const c = Math.cos(site.omega * t), s = Math.sin(site.omega * t);
  return [site.center[0] + c * site.U[0] + s * site.V[0], site.center[1] + c * site.U[1] + s * site.V[1], site.center[2] + drift * t + c * site.U[2] + s * site.V[2]];
}

function analyticSiteState(site, t, drift) {
  const c = Math.cos(site.omega * t), s = Math.sin(site.omega * t);
  const radial = add(scale(site.U, c), scale(site.V, s));
  const velocity = add([0, 0, drift], scale(add(scale(site.U, -s), scale(site.V, c)), site.omega));
  return { position: add([site.center[0], site.center[1], site.center[2] + drift * t], radial), velocity, requiredAcceleration: scale(radial, -site.omega * site.omega) };
}

function siteById(config, id, q) { return buildSection99Sites(config, q).find((site) => site.id === id); }

function dynamicSiteState(config, id, t, q, qDot, referenceTime) {
  const qt = q.map((v, i) => v + qDot[i] * (t - referenceTime));
  const site = siteById(config, id, qt);
  const position = sitePosition(site, t, config.drift);
  const h = 1e-5;
  const at = (time) => {
    const qh = q.map((v, i) => v + qDot[i] * (time - referenceTime));
    return sitePosition(siteById(config, id, qh), time, config.drift);
  };
  const velocity = scale(sub(at(t + h), at(t - h)), 1 / (2 * h));
  return { position, velocity, requiredAcceleration: [0, 0, 0] };
}

function sourceFromSite(site, drift) {
  return {
    centerAtEpoch: { x: site.center[0], y: site.center[1], z: site.center[2] },
    centerVelocity: { x: 0, y: 0, z: drift },
    radiusU: { x: site.U[0], y: site.U[1], z: site.U[2] },
    radiusV: { x: site.V[0], y: site.V[1], z: site.V[2] },
    angularVelocity: site.omega, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: 0,
  };
}

function receiverRow(state, t) {
  return { startTime: t, positionAtStart: { x: state.position[0], y: state.position[1], z: state.position[2] }, velocity: { x: state.velocity[0], y: state.velocity[1], z: state.velocity[2] } };
}

function exactRoots(source, receiverState, config, t, fixture) {
  return solveMovingCircularSourceCausalRoots({
    source, receiver: receiverRow(receiverState, t), hitTime: t, signalSpeed: config.fieldSpeed,
    sourceStartTime: t - fixture.delayWindow, sourceEndTime: t - 1e-9,
    rootTolerance: 1e-12, scanSubdivisions: fixture.scanSubdivisions, maxRoots: 32,
  }).roots ?? [];
}

function retainedRoots(config, sourceId, receiverState, t, q, qDot, fixture) {
  const roots = [], start = t - fixture.delayWindow, count = fixture.retainedSegmentCount, h = fixture.delayWindow / count;
  const at = (te) => dynamicSiteState(config, sourceId, te, q, qDot, t);
  const residual = (te) => norm(sub(receiverState.position, at(te).position)) - config.fieldSpeed * (t - te);
  let g0 = residual(start);
  for (let k = 0; k < count; k++) {
    const lo = start + k * h, hi = lo + h, g1 = residual(hi);
    if ((g0 <= 0) !== (g1 <= 0) || Math.min(Math.abs(g0), Math.abs(g1)) < 1e-4) {
      const st = at(lo);
      const found = solveMovingCircularSourceCausalRoots({
        source: { centerAtEpoch: { x: st.position[0], y: st.position[1], z: st.position[2] }, centerVelocity: { x: st.velocity[0], y: st.velocity[1], z: st.velocity[2] }, radiusU: { x: 0, y: 0, z: 0 }, radiusV: { x: 0, y: 0, z: 0 }, angularVelocity: 0, angularAcceleration: 0, phaseAtEpoch: 0, epochTime: lo },
        receiver: receiverRow(receiverState, t), hitTime: t, signalSpeed: config.fieldSpeed,
        sourceStartTime: lo, sourceEndTime: Math.min(hi, t - 1e-9), rootTolerance: 1e-12, scanSubdivisions: 8, maxRoots: 4,
      });
      roots.push(...(found.roots ?? []));
    }
    g0 = g1;
  }
  roots.sort((a, b) => a.emissionTime - b.emissionTime);
  return roots.filter((r, i) => i === 0 || Math.abs(r.emissionTime - roots[i - 1].emissionTime) > 1e-7);
}

function forceFromRoots(roots, receiver, source, soft) {
  const force = [0, 0, 0]; let minDistance = Infinity, maxRootResidual = 0;
  for (const root of roots) {
    if (!(root.distance > 1e-8)) continue;
    const d = [(root.receiverPoint.x - root.sourcePoint.x) / root.distance, (root.receiverPoint.y - root.sourcePoint.y) / root.distance, (root.receiverPoint.z - root.sourcePoint.z) / root.distance];
    const Ds = root.sourceNormalDenominator, Dt = root.receiverNormalNumerator;
    const weight = receiver.strength * source.strength * receiver.polarity * source.polarity * (Dt * Ds) / (Ds * Ds + soft * soft) / (root.distance ** 2);
    for (let c = 0; c < 3; c++) force[c] += weight * d[c];
    minDistance = Math.min(minDistance, root.distance); maxRootResidual = Math.max(maxRootResidual, Math.abs(root.residual ?? 0));
  }
  return { force, minDistance, maxRootResidual };
}

function coordinateTangents(config, q, t, dynamicIds, h) {
  const n = section99CoordinateNames(config).length, out = new Map();
  for (const id of dynamicIds) out.set(id, Array(n));
  for (let j = 0; j < n; j++) {
    const qp = [...q], qm = [...q]; qp[j] += h; qm[j] -= h;
    const plus = new Map(buildSection99Sites(config, qp).map((s) => [s.id, sitePosition(s, t, config.drift)]));
    const minus = new Map(buildSection99Sites(config, qm).map((s) => [s.id, sitePosition(s, t, config.drift)]));
    for (const id of dynamicIds) out.get(id)[j] = scale(sub(plus.get(id), minus.get(id)), 1 / (2 * h));
  }
  return out;
}

export function measureSection99Assembly({ config, q = [], qDot = [], fixedKappa = null, cycleSamples, fixture = DEFAULT_FIXTURE } = {}) {
  const names = section99CoordinateNames(config), n = names.length;
  const q0 = Array(n).fill(0).map((_, i) => Number(q[i] ?? 0)), qd = Array(n).fill(0).map((_, i) => Number(qDot[i] ?? 0));
  const dynamicRate = qd.some((v) => Math.abs(v) > 0);
  const sites0 = buildSection99Sites(config, q0), dynamicIds = sites0.filter((s) => s.dynamic).map((s) => s.id);
  const samples = cycleSamples ?? fixture.coarseCycleSamples;
  const nonzero = sites0.filter((s) => s.dynamic && Math.abs(s.omega) > 1e-8).map((s) => Math.abs(s.omega));
  const period = nonzero.length ? TAU / Math.min(...nonzero) : TAU;
  const sampleRows = [];
  let fitNumerator = 0, fitDenominator = 0, requiredNorm2 = 0, rootCount = 0, minDistance = Infinity, maxRootResidual = 0;
  for (let sample = 0; sample < samples; sample++) {
    const t = sample * period / samples;
    const sites = buildSection99Sites(config, q0), byId = new Map(sites.map((s) => [s.id, s]));
    const states = new Map(sites.map((s) => [s.id, dynamicRate ? dynamicSiteState(config, s.id, t, q0, qd, t) : analyticSiteState(s, t, config.drift)]));
    const forces = new Map(dynamicIds.map((id) => [id, [0, 0, 0]]));
    for (const recId of dynamicIds) {
      const rec = byId.get(recId), recState = states.get(recId), total = forces.get(recId);
      for (const src of sites) {
        if (src.id === recId) continue;
        const roots = dynamicRate ? retainedRoots(config, src.id, recState, t, q0, qd, fixture) : exactRoots(sourceFromSite(src, config.drift), recState, config, t, fixture);
        const row = forceFromRoots(roots, rec, src, fixture.soft);
        rootCount += roots.length; minDistance = Math.min(minDistance, row.minDistance); maxRootResidual = Math.max(maxRootResidual, row.maxRootResidual);
        for (let c = 0; c < 3; c++) total[c] += row.force[c];
      }
      const required = dynamicRate ? [0, 0, 0] : recState.requiredAcceleration;
      fitNumerator += dot(total, required); fitDenominator += dot(total, total); requiredNorm2 += dot(required, required);
    }
    sampleRows.push({ t, sites, byId, states, forces });
  }
  const kappaStar = fixedKappa ?? (fitDenominator > 1e-20 ? fitNumerator / fitDenominator : 0);
  const generalizedForce = Array(n).fill(0), integrationWeights = zeros(n);
  let residualNorm2 = 0, pump = 0;
  for (const row of sampleRows) {
    const tangents = coordinateTangents(config, q0, row.t, dynamicIds, fixture.coordinateStep);
    for (const id of dynamicIds) {
      const site = row.byId.get(id), state = row.states.get(id), required = dynamicRate ? [0, 0, 0] : state.requiredAcceleration;
      const residual = sub(scale(row.forces.get(id), kappaStar), required);
      residualNorm2 += dot(residual, residual) / samples;
      pump += cross(state.position, scale(row.forces.get(id), kappaStar))[2] / samples;
      for (let i = 0; i < n; i++) {
        const Ji = tangents.get(id)[i]; generalizedForce[i] += dot(residual, Ji) / samples;
        for (let j = 0; j < n; j++) integrationWeights[i][j] += dot(Ji, tangents.get(id)[j]) / samples;
      }
      void site;
    }
  }
  for (let i = 0; i < n; i++) integrationWeights[i][i] += 1e-6;
  const chargeUnits = sites0.filter((s) => s.dynamic).reduce((s, site) => s + site.chargeUnits, 0);
  return {
    config, coordinateNames: names, kappaStar,
    bindingResidual: Math.sqrt(residualNorm2 / Math.max(requiredNorm2 / samples, 1e-20)),
    axialPump: pump, generalizedForce, integrationWeights,
    charge: { unitsEpsilon: chargeUnits, inE: chargeUnits / 6 },
    record: { rootCount, minDistance, maxRootResidual, cycleSamples: samples, kind: dynamicRate ? "production_retained_linear_segments" : "production_moving_circular_roots" },
  };
}

function symmetricEigenvalues(A) {
  const n = A.length, M = A.map((row, i) => row.map((v, j) => 0.5 * (v + A[j][i])));
  for (let sweep = 0; sweep < 80 * n * n; sweep++) {
    let p = 0, q = n > 1 ? 1 : 0, best = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.abs(M[i][j]) > best) { best = Math.abs(M[i][j]); p = i; q = j; }
    if (best < 1e-11 || n === 1) break;
    const theta = 0.5 * Math.atan2(2 * M[p][q], M[q][q] - M[p][p]), c = Math.cos(theta), s = Math.sin(theta);
    for (let k = 0; k < n; k++) if (k !== p && k !== q) {
      const mkp = M[k][p], mkq = M[k][q];
      M[k][p] = M[p][k] = c * mkp - s * mkq; M[k][q] = M[q][k] = s * mkp + c * mkq;
    }
    const app = M[p][p], aqq = M[q][q], apq = M[p][q];
    M[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    M[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq; M[p][q] = M[q][p] = 0;
  }
  return M.map((row, i) => row[i]).sort((a, b) => b - a);
}

export function analyzeSection99Assembly({ config, fixture = DEFAULT_FIXTURE } = {}) {
  const baseline = measureSection99Assembly({ config, cycleSamples: fixture.derivativeCycleSamples, fixture });
  const n = baseline.coordinateNames.length, h = fixture.coordinateStep, hd = fixture.rateStep;
  const K = zeros(n), D = zeros(n);
  for (let j = 0; j < n; j++) {
    const qp = Array(n).fill(0), qm = Array(n).fill(0); qp[j] = h; qm[j] = -h;
    const p = measureSection99Assembly({ config, q: qp, fixedKappa: baseline.kappaStar, cycleSamples: fixture.derivativeCycleSamples, fixture });
    const m = measureSection99Assembly({ config, q: qm, fixedKappa: baseline.kappaStar, cycleSamples: fixture.derivativeCycleSamples, fixture });
    for (let i = 0; i < n; i++) K[i][j] = (p.generalizedForce[i] - m.generalizedForce[i]) / (2 * h);
    const rp = Array(n).fill(0), rm = Array(n).fill(0); rp[j] = hd; rm[j] = -hd;
    const dp = measureSection99Assembly({ config, qDot: rp, fixedKappa: baseline.kappaStar, cycleSamples: fixture.derivativeCycleSamples, fixture });
    const dm = measureSection99Assembly({ config, qDot: rm, fixedKappa: baseline.kappaStar, cycleSamples: fixture.derivativeCycleSamples, fixture });
    for (let i = 0; i < n; i++) D[i][j] = (dp.generalizedForce[i] - dm.generalizedForce[i]) / (2 * hd);
  }
  const pencil = { mass: baseline.integrationWeights, velocity: D.map((row) => row.map((v) => -v)), stiffness: K.map((row) => row.map((v) => -v)) };
  const spectrum = axisPencilSpectrum(pencil);
  const physicalLeading = spectrum.all[0];
  const lockJ = [[K[0][0], K[0][1]], [K[1][0], K[1][1]]];
  const lockEigenvalues = symmetricEigenvalues(lockJ);
  const lockResidual = Math.hypot(baseline.generalizedForce[0], baseline.generalizedForce[1]);
  const gates = {
    bind: baseline.kappaStar > 0 && baseline.bindingResidual <= fixture.gates.bindResidual,
    pumpCancel: Math.abs(baseline.axialPump) <= fixture.gates.pump,
    lock: lockResidual <= fixture.gates.lockResidual && lockEigenvalues.every((v) => v < 0),
    stable: Number.isFinite(physicalLeading.re) && physicalLeading.re <= fixture.gates.leadingGrowth,
    charge: Math.abs(baseline.charge.inE - (config.object === "electron" ? -1 : 0)) <= fixture.gates.charge,
    collisionFree: baseline.record.minDistance >= fixture.collisionFloor,
    rootConverged: baseline.record.maxRootResidual <= 1e-9,
  };
  gates.fullAssemblyPass = Object.values(gates).every(Boolean);
  return {
    baseline,
    lock: { residual: lockResidual, jacobian: lockJ, symmetricEigenvalues: lockEigenvalues, restoringWell: lockEigenvalues.every((v) => v < 0) },
    pencil: { dimension: n, coordinateNames: baseline.coordinateNames, staticJacobian: K, rateJacobian: D, numericalIntegrationWeights: baseline.integrationWeights, leadingRe: physicalLeading.re, leadingIm: Math.abs(physicalLeading.im), roots: spectrum.all, dkResidual: spectrum.dkResidual },
    gates,
  };
}

export function planarPencilAnalyticAnchor({ fixture = DEFAULT_FIXTURE } = {}) {
  const R = fixture.analyticAnchor.radius, d = fixture.analyticAnchor.separation;
  const far = Math.sqrt(d * d + 4 * R * R);
  const hessian = 2 * R * R * (1 / d ** 3 + 1 / far ** 3);
  const integrationWeight = 2 * R * R;
  const expectedFrequency = Math.sqrt(hessian / integrationWeight);
  const spectrum = axisPencilSpectrum({ mass: [[1, 0], [0, integrationWeight]], velocity: [[0, 0], [0, 0]], stiffness: [[0, 0], [0, hessian]] });
  const actualFrequency = Math.abs(spectrum.leading.im);
  return {
    geometry: "two conjugate binary rings at fixed separation; relative phase coordinate",
    potential: "V(phi)=2[-1/sqrt(d^2+4R^2 sin^2(phi/2))+1/sqrt(d^2+4R^2 cos^2(phi/2))]",
    analyticHessian: hessian, numericalIntegrationWeight: integrationWeight,
    expectedEigenvalues: [{ re: 0, im: expectedFrequency }, { re: 0, im: -expectedFrequency }],
    actualLeading: spectrum.leading,
    error: Math.abs(actualFrequency - expectedFrequency),
    passes: Math.abs(actualFrequency - expectedFrequency) <= fixture.analyticAnchor.tolerance && Math.abs(spectrum.leading.re) <= fixture.analyticAnchor.tolerance,
  };
}

function objective(row) {
  return row.bindingResidual + Math.abs(row.axialPump) + (row.kappaStar > 0 ? 0 : 100) + (row.record.minDistance >= DEFAULT_FIXTURE.collisionFloor ? 0 : 100);
}

function coarseSearch(fixture) {
  const photonRows = [];
  for (let pairIndex = 0; pairIndex < fixture.photon.pairConfigurations; pairIndex++) for (const drift of fixture.photon.drifts) {
    const config = section99PairConfiguration(pairIndex, fixture); config.object = "photon"; config.drift = drift;
    const row = measureSection99Assembly({ config, fixture });
    photonRows.push({ pairIndex, drift, config, row, objective: objective(row) });
  }
  const variants = payloadVariants(fixture), electronRows = [];
  for (let pairIndex = 0; pairIndex < fixture.electron.pairConfigurations; pairIndex++) for (const payload of variants) for (const drift of fixture.electron.drifts) {
    const config = section99PairConfiguration(pairIndex, fixture); config.object = "electron"; config.drift = drift; config.payload = clone(payload);
    const row = measureSection99Assembly({ config, fixture });
    electronRows.push({ pairIndex, payload, drift, config, row, objective: objective(row) });
  }
  return { photonRows, electronRows, payloadVariants: variants };
}

function selectSameBranch(search, fixture) {
  const photonScores = Array.from({ length: fixture.photon.pairConfigurations }, (_, pairIndex) => ({
    pairIndex,
    score: search.photonRows.filter((r) => r.pairIndex === pairIndex && r.drift > 0).reduce((s, r) => s + r.objective, 0),
  })).sort((a, b) => a.score - b.score);
  const photonPairIndex = photonScores[0].pairIndex;
  const electronRest = search.electronRows.filter((r) => r.drift === 0).sort((a, b) => a.objective - b.objective)[0];
  return {
    photon: fixture.photon.drifts.map((drift) => clone(search.photonRows.find((r) => r.pairIndex === photonPairIndex && r.drift === drift).config)),
    electron: fixture.electron.drifts.map((drift) => {
      const c = clone(electronRest.config); c.drift = drift; return c;
    }),
    photonPairIndex,
    electronSeed: { pairIndex: electronRest.pairIndex, payload: electronRest.payload },
  };
}

function coverage(search, fixture) {
  const uniq = (rows) => [...new Set(rows)];
  const all = [...search.photonRows, ...search.electronRows];
  return {
    photon: { evaluatedConfigurations: search.photonRows.length, pairConfigurations: fixture.photon.pairConfigurations, speeds: fixture.photon.drifts, payloadArrangements: ["none"] },
    electron: { evaluatedConfigurations: search.electronRows.length, pairConfigurations: fixture.electron.pairConfigurations, speeds: fixture.electron.drifts, payloadVariants: search.payloadVariants.length, payloadArrangements: uniq(search.payloadVariants.map((p) => p.arrangement)), payloadModes: uniq(search.payloadVariants.map((p) => p.mode)), payloadScaleFactors: fixture.electron.payloadScaleFactors },
    shared: {
      occupancies: uniq(all.map((r) => r.config.occupancy.join("-"))),
      polarityPatterns: uniq(all.map((r) => r.config.polarityPattern.join("-"))),
      proRadiusTriples: uniq(all.map((r) => r.config.proRings.map((x) => x.radius).join("-"))),
      antiRadiusTriples: uniq(all.map((r) => r.config.antiRings.map((x) => x.radius).join("-"))),
      proOmegaTriples: uniq(all.map((r) => r.config.proRings.map((x) => x.omega).join("-"))),
      antiOmegaTriples: uniq(all.map((r) => r.config.antiRings.map((x) => x.omega).join("-"))),
      proRingZTriples: uniq(all.map((r) => r.config.proRings.map((x) => x.z).join("-"))),
      antiRingZTriples: uniq(all.map((r) => r.config.antiRings.map((x) => x.z).join("-"))),
      relativePhases: uniq(all.map((r) => r.config.relativePhase)), pocketWidths: uniq(all.map((r) => r.config.pocketWidth)),
      seaSettings: uniq(all.map((r) => r.config.sea.enabled ? `proxy:${r.config.sea.density}:${r.config.sea.cadence}:${r.config.sea.spacing}:${r.config.sea.orientationLag}` : "off")),
      primaryTilt: 0, confirmatoryTilts: fixture.tiltSweep,
      orderings: uniq(all.map((r) => r.config.ordering)),
      notExercised: ["full Cartesian product of all pair factors", "constitutive Noether sea", "explicit cap degree of freedom", "exact u=c_f endpoint", "native retained-history release"],
    },
  };
}

function samplingReplay(config, fixture) {
  return fixture.samplingLadder.map((cycleSamples) => {
    const r = measureSection99Assembly({ config, cycleSamples, fixture });
    return { cycleSamples, kappaStar: r.kappaStar, bindingResidual: r.bindingResidual, axialPump: r.axialPump, rootCount: r.record.rootCount, maxRootResidual: r.record.maxRootResidual, minDistance: r.record.minDistance };
  });
}

function tiltReplay(config, fixture) {
  const cycleSamples = fixture.samplingLadder.at(-2);
  return fixture.tiltSweep.map((tilt) => {
    const c = clone(config); c.tilt = tilt;
    const r = measureSection99Assembly({ config: c, cycleSamples, fixture });
    return { tilt, cycleSamples, objective: objective(r), bindingResidual: r.bindingResidual, axialPump: r.axialPump, kappaStar: r.kappaStar };
  });
}

function controls(fixture) {
  const s92 = contraRotatingProAntiPairInstrument();
  const s93 = contraRotatingCrossCouplingCompletion();
  const s95 = dressedContraRotatingElectronCompletion();
  const tol = fixture.controlsTolerance;
  const rows = {
    section92: { freePairGrowth: s92.jointFlutter.freePair.leadingRe, hardLockGrowth: s92.jointFlutter.hardLockCounterfactual.leadingRe, passes: Math.abs(s92.jointFlutter.freePair.leadingRe - 0.19885688497216406) <= tol && Math.abs(s92.jointFlutter.hardLockCounterfactual.leadingRe - 0.19629953398461314) <= tol },
    section93: { separation: s93.selectedCell.separation, phase: s93.selectedCell.phase, leadingRe: s93.jointSpectrum.leadingRe, passes: Math.abs(s93.selectedCell.separation - 1.419842173795055) <= tol && Math.abs(s93.selectedCell.phase - 3.8435815410366416) <= tol && Math.abs(s93.jointSpectrum.leadingRe - 5.30422826) <= tol },
    section95: { chargeInE: s95.observables.netChargeInE, leadingRe: s95.jointSpectrumWithPayload.leadingRe, decision: s95.decision, passes: s95.observables.netChargeInE === -1 && s95.decision === "dressed_pair_fails_seed_gate_no_release" },
  };
  return { ...rows, allPass: Object.values(rows).every((r) => r.passes) };
}

export function planarAssembledFreeParticleCompletion({ fixture = DEFAULT_FIXTURE, includeControls = true } = {}) {
  const anchor = planarPencilAnalyticAnchor({ fixture });
  const search = coarseSearch(fixture), selected = selectSameBranch(search, fixture);
  const photonContinuation = selected.photon.map((config) => ({ drift: config.drift, analysis: analyzeSection99Assembly({ config, fixture }) }));
  const electronContinuation = selected.electron.map((config) => ({ drift: config.drift, analysis: analyzeSection99Assembly({ config, fixture }) }));
  const controlRows = includeControls ? controls(fixture) : null;
  const anchorAndControlsPass = anchor.passes && (!controlRows || controlRows.allPass);
  const photonRest = photonContinuation.find((r) => r.drift === 0);
  const photonNear = photonContinuation.filter((r) => r.drift > 0);
  const photonRecovered = anchorAndControlsPass && photonNear.every((r) => r.analysis.gates.fullAssemblyPass) && !photonRest.analysis.gates.fullAssemblyPass;
  const electronRecovered = anchorAndControlsPass && electronContinuation.every((r) => r.analysis.gates.fullAssemblyPass);
  const photonBest = [...search.photonRows].sort((a, b) => a.objective - b.objective)[0];
  const electronBest = [...search.electronRows].sort((a, b) => a.objective - b.objective)[0];
  const photonTilt = tiltReplay(photonBest.config, fixture), electronTilt = tiltReplay(electronBest.config, fixture);
  const planarPreferred = Math.min(...photonTilt.filter((r) => r.tilt !== 0).map((r) => r.objective)) >= photonTilt.find((r) => r.tilt === 0).objective
    && Math.min(...electronTilt.filter((r) => r.tilt !== 0).map((r) => r.objective)) >= electronTilt.find((r) => r.tilt === 0).objective;
  return {
    schema: PLANAR_ASSEMBLED_FREE_PARTICLE_SCHEMA,
    spec: PLANAR_ASSEMBLED_FREE_PARTICLE_SPEC,
    claimLevel: "seed_grade_full_assembly_production_root_screen_no_retained_branch_acceptance",
    object: { isolatedTripleGate: false, primaryTilt: 0, explicitCapDegreeOfFreedom: false, photon: "neutral planar contra-rotating pro/anti pair with no payload", electron: "same pair plus six explicit electrino worldlines" },
    sharedRecord: { staticRows: "AbsoluteHistoryRootRuntime moving-circular production roots", rateRows: "AbsoluteHistoryRootRuntime retained linear-segment production roots", centralSolverTouched: false, sea: "exploratory single-ring ambient proxy; not a constitutive Noether sea" },
    validation: { instantaneousSymmetricPlanarAnchor: anchor, controls: controlRows, magnitudesAdjudicationEligible: anchorAndControlsPass },
    coverage: coverage(search, fixture),
    selectedSameBranches: { photonPairIndex: selected.photonPairIndex, electronSeed: selected.electronSeed },
    photon: {
      continuation: photonContinuation.map((r) => ({ drift: r.drift, kappaStar: r.analysis.baseline.kappaStar, bindingResidual: r.analysis.baseline.bindingResidual, pump: r.analysis.baseline.axialPump, chargeInE: r.analysis.baseline.charge.inE, lock: r.analysis.lock, leadingRe: r.analysis.pencil.leadingRe, gates: r.analysis.gates })),
      restBranchStable: photonRest.analysis.gates.fullAssemblyPass,
      selectsFieldSpeedLimit: photonNear.every((r) => r.analysis.gates.fullAssemblyPass) && !photonRest.analysis.gates.fullAssemblyPass,
      samplingReplay: samplingReplay(photonBest.config, fixture),
      bestCoarse: { pairIndex: photonBest.pairIndex, drift: photonBest.drift, objective: photonBest.objective, kappaStar: photonBest.row.kappaStar, bindingResidual: photonBest.row.bindingResidual, pump: photonBest.row.axialPump },
      recovered: photonRecovered,
    },
    electron: {
      continuation: electronContinuation.map((r) => ({ drift: r.drift, payload: r.analysis.baseline.config.payload, kappaStar: r.analysis.baseline.kappaStar, bindingResidual: r.analysis.baseline.bindingResidual, pump: r.analysis.baseline.axialPump, chargeInE: r.analysis.baseline.charge.inE, lock: r.analysis.lock, leadingRe: r.analysis.pencil.leadingRe, gates: r.analysis.gates })),
      sameRestBranchBoosted: true,
      samplingReplay: samplingReplay(electronBest.config, fixture),
      bestCoarse: { pairIndex: electronBest.pairIndex, payload: electronBest.payload, drift: electronBest.drift, objective: electronBest.objective, kappaStar: electronBest.row.kappaStar, bindingResidual: electronBest.row.bindingResidual, pump: electronBest.row.axialPump },
      recovered: electronRecovered,
    },
    planarityTest: { photon: photonTilt, electron: electronTilt, planarPreferred, interpretation: planarPreferred ? "nonzero tilt did not improve the declared coarse objective" : "a nonzero tilt improved the declared coarse objective; no-tilt assumption needs correction", capClaimAuthorized: false },
    gates: { photonRecovered, electronRecovered, nativeRetainedHistoryReleaseAuthorized: photonRecovered || electronRecovered, fullAssemblyOnly: true },
    chiralityBoundary: "The cap-free planar model does not adjudicate chi=sign(p dot S), because its cap dipole p is absent.",
    seaBoundary: "A proxy-sea null does not adjudicate the constitutive Noether sea law.",
    decision: photonRecovered && electronRecovered ? "photon_and_electron_recovered_as_seed_grade_planar_assemblies" : photonRecovered ? "photon_recovered_electron_not_recovered" : electronRecovered ? "electron_recovered_photon_not_recovered" : "neither_planar_assembly_closes_in_declared_geometry_payload_and_proxy_sea_coverage",
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) process.stdout.write(`${JSON.stringify(planarAssembledFreeParticleCompletion(), null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
