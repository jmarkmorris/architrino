export const ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION = "0.1.0";
export const ANIMATOR_SIMULATION_DATASET_KIND = "animator.simulation.dataset";

function normalizeString(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeVector(value, dimensions = 3) {
  const source = Array.isArray(value) ? value : [];
  return Array.from({ length: dimensions }, (_entry, index) =>
    normalizeNumber(source[index], 0)
  );
}

function normalizeParticle(rawParticle = {}, index = 0) {
  const id = normalizeString(rawParticle.id, `particle_${index + 1}`);
  return {
    id,
    label: normalizeString(rawParticle.label, id),
    polarity: normalizeNumber(rawParticle.polarity ?? rawParticle.q, 0),
    chargeType: normalizeString(rawParticle.chargeType, ""),
    initial: {
      position: normalizeVector(rawParticle.initial?.position ?? rawParticle.position),
      velocity: normalizeVector(rawParticle.initial?.velocity ?? rawParticle.velocity),
    },
    style:
      rawParticle.style && typeof rawParticle.style === "object"
        ? { ...rawParticle.style }
        : {},
  };
}

function normalizeFrameParticle(rawParticle = {}, fallbackId = "") {
  return {
    id: normalizeString(rawParticle.id, fallbackId),
    position: normalizeVector(rawParticle.position),
    velocity: normalizeVector(rawParticle.velocity),
    phase: normalizeNumber(rawParticle.phase, 0),
    radialVelocity: normalizeNumber(
      rawParticle.radialVelocity ?? rawParticle.radial_velocity,
      0
    ),
    angularVelocity: normalizeNumber(
      rawParticle.angularVelocity ?? rawParticle.angular_velocity,
      0
    ),
  };
}

function normalizeFrame(rawFrame = {}, index = 0) {
  const rawParticles = Array.isArray(rawFrame.particles) ? rawFrame.particles : [];
  return {
    index,
    t: normalizeNumber(rawFrame.t ?? rawFrame.time, index),
    particles: rawParticles.map((particle, particleIndex) =>
      normalizeFrameParticle(particle, `particle_${particleIndex + 1}`)
    ),
    diagnostics:
      rawFrame.diagnostics && typeof rawFrame.diagnostics === "object"
        ? { ...rawFrame.diagnostics }
        : {},
  };
}

function normalizeFieldShell(rawShell = {}, index = 0) {
  return {
    id: normalizeString(rawShell.id, `field_shell_${index + 1}`),
    emitterId: normalizeString(rawShell.emitterId ?? rawShell.emitter, ""),
    emissionTime: normalizeNumber(rawShell.emissionTime ?? rawShell.tEmit, 0),
    displayTime: normalizeNumber(rawShell.displayTime ?? rawShell.t, 0),
    emissionPosition: normalizeVector(rawShell.emissionPosition ?? rawShell.position),
    radius: normalizeNumber(rawShell.radius, 0),
    sign: normalizeNumber(rawShell.sign ?? rawShell.polarity, 0),
    strength: normalizeNumber(rawShell.strength, 0),
    fieldSpeed: normalizeNumber(rawShell.fieldSpeed ?? rawShell.cf ?? rawShell.speed, 0),
    branchId: normalizeString(rawShell.branchId, ""),
    style:
      rawShell.style && typeof rawShell.style === "object"
        ? { ...rawShell.style }
        : {},
    metadata:
      rawShell.metadata && typeof rawShell.metadata === "object"
        ? { ...rawShell.metadata }
        : {},
  };
}

function normalizeDelayedHit(rawHit = {}, index = 0) {
  return {
    id: normalizeString(rawHit.id, `delayed_hit_${index + 1}`),
    emitterId: normalizeString(rawHit.emitterId ?? rawHit.emitter, ""),
    receiverId: normalizeString(rawHit.receiverId ?? rawHit.receiver, ""),
    hitTime: normalizeNumber(rawHit.hitTime ?? rawHit.t, 0),
    emissionTime: normalizeNumber(rawHit.emissionTime ?? rawHit.tEmit, 0),
    emitterEmissionPosition: normalizeVector(
      rawHit.emitterEmissionPosition ?? rawHit.emissionPosition
    ),
    receiverPosition: normalizeVector(rawHit.receiverPosition),
    strength: normalizeNumber(rawHit.strength, 0),
    branchId: normalizeString(rawHit.branchId, ""),
    jacobian: normalizeNumber(rawHit.jacobian, 0),
    status: normalizeString(rawHit.status, "recorded"),
  };
}

function normalizeTime(rawTime = {}) {
  const start = normalizeNumber(rawTime.start, 0);
  const end = normalizeNumber(rawTime.end, start);
  return {
    start,
    end: end > start ? end : start,
    dt: normalizeNumber(rawTime.dt, 0),
    sampleStride: Math.max(1, Math.round(normalizeNumber(rawTime.sampleStride, 1))),
  };
}

export function normalizeAnimatorSimulationDataset(rawDataset = {}) {
  const dataset = rawDataset && typeof rawDataset === "object" ? rawDataset : {};
  const rawSimulation =
    dataset.simulation && typeof dataset.simulation === "object"
      ? dataset.simulation
      : {};
  return {
    schemaVersion:
      normalizeString(dataset.schemaVersion, ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION),
    kind: normalizeString(dataset.kind, ANIMATOR_SIMULATION_DATASET_KIND),
    id: normalizeString(dataset.id, "animator_simulation_dataset"),
    claimLevel: normalizeString(dataset.claimLevel, "fixture"),
    provenance:
      dataset.provenance && typeof dataset.provenance === "object"
        ? { ...dataset.provenance }
        : {},
    simulation: {
      mode: normalizeString(rawSimulation.mode, "planar-2d"),
      dimensions: Math.max(2, Math.round(normalizeNumber(rawSimulation.dimensions, 2))),
      units: normalizeString(rawSimulation.units, "relative"),
      time: normalizeTime(rawSimulation.time),
      solver:
        rawSimulation.solver && typeof rawSimulation.solver === "object"
          ? { ...rawSimulation.solver }
          : {},
      halt:
        rawSimulation.halt && typeof rawSimulation.halt === "object"
          ? { ...rawSimulation.halt }
          : { status: "not-run" },
    },
    particles: Array.isArray(dataset.particles)
      ? dataset.particles.map((particle, index) => normalizeParticle(particle, index))
      : [],
    frames: Array.isArray(dataset.frames)
      ? dataset.frames.map((frame, index) => normalizeFrame(frame, index))
      : [],
    fieldShells: Array.isArray(dataset.fieldShells)
      ? dataset.fieldShells.map((shell, index) => normalizeFieldShell(shell, index))
      : [],
    delayedHits: Array.isArray(dataset.delayedHits)
      ? dataset.delayedHits.map((hit, index) => normalizeDelayedHit(hit, index))
      : [],
    diagnostics:
      dataset.diagnostics && typeof dataset.diagnostics === "object"
        ? { ...dataset.diagnostics }
        : {},
  };
}

export function isAnimatorSimulationDataset(value) {
  return !!(
    value &&
    typeof value === "object" &&
    normalizeString(value.kind, "") === ANIMATOR_SIMULATION_DATASET_KIND &&
    Array.isArray(value.frames)
  );
}
