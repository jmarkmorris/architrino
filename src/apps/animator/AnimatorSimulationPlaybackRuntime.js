import { ANIMATOR_SIMULATION_DATASET_KIND } from "./AnimatorSimulationDatasetRuntime.js";

function normalizeString(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function vectorFromSample(value) {
  const source = Array.isArray(value) ? value : [];
  return [source[0] ?? 0, source[1] ?? 0, source[2] ?? 0].map((entry) =>
    normalizeNumber(entry, 0)
  );
}

function interpolateVector(from, to, alpha) {
  const a = vectorFromSample(from);
  const b = vectorFromSample(to);
  return a.map((value, index) => value + (b[index] - value) * alpha);
}

function interpolateNumber(from, to, alpha) {
  const a = normalizeNumber(from, 0);
  const b = normalizeNumber(to, a);
  return a + (b - a) * alpha;
}

function getSortedFrames(dataset) {
  return Array.isArray(dataset?.frames)
    ? [...dataset.frames]
        .filter((frame) => Number.isFinite(Number(frame?.t)))
        .sort((a, b) => Number(a.t) - Number(b.t))
    : [];
}

function getFrameParticle(frame, particleId) {
  const normalizedParticleId = normalizeString(particleId, "");
  if (!normalizedParticleId || !Array.isArray(frame?.particles)) {
    return null;
  }
  return frame.particles.find((particle) => particle?.id === normalizedParticleId) ?? null;
}

function getBoundingFrames(frames, timeSeconds) {
  if (!frames.length) {
    return null;
  }
  const time = normalizeNumber(timeSeconds, 0);
  if (time <= Number(frames[0].t)) {
    return { from: frames[0], to: frames[0], alpha: 0 };
  }
  const lastFrame = frames[frames.length - 1];
  if (time >= Number(lastFrame.t)) {
    return { from: lastFrame, to: lastFrame, alpha: 0 };
  }
  for (let index = 0; index < frames.length - 1; index += 1) {
    const from = frames[index];
    const to = frames[index + 1];
    const start = Number(from.t);
    const end = Number(to.t);
    if (time >= start && time <= end) {
      const duration = Math.max(0.000001, end - start);
      return {
        from,
        to,
        alpha: (time - start) / duration,
      };
    }
  }
  return { from: lastFrame, to: lastFrame, alpha: 0 };
}

function interpolateFrameParticle(fromParticle, toParticle, alpha, timeSeconds) {
  const fallbackParticle = fromParticle ?? toParticle;
  if (!fallbackParticle) {
    return null;
  }
  if (!fromParticle || !toParticle || alpha <= 0) {
    return {
      ...fallbackParticle,
      t: timeSeconds,
      position: vectorFromSample(fallbackParticle.position),
      velocity: vectorFromSample(fallbackParticle.velocity),
    };
  }
  if (alpha >= 1) {
    return {
      ...toParticle,
      t: timeSeconds,
      position: vectorFromSample(toParticle.position),
      velocity: vectorFromSample(toParticle.velocity),
    };
  }
  return {
    id: fromParticle.id,
    t: timeSeconds,
    position: interpolateVector(fromParticle.position, toParticle.position, alpha),
    velocity: interpolateVector(fromParticle.velocity, toParticle.velocity, alpha),
    phase: interpolateNumber(fromParticle.phase, toParticle.phase, alpha),
    radialVelocity: interpolateNumber(
      fromParticle.radialVelocity,
      toParticle.radialVelocity,
      alpha
    ),
    angularVelocity: interpolateNumber(
      fromParticle.angularVelocity,
      toParticle.angularVelocity,
      alpha
    ),
  };
}

export function getAnimatorSimulationDataset(documentData = {}) {
  const dataset = documentData?.metadata?.simulationDataset;
  if (
    !dataset ||
    typeof dataset !== "object" ||
    normalizeString(dataset.kind, "") !== ANIMATOR_SIMULATION_DATASET_KIND
  ) {
    return null;
  }
  return dataset;
}

export function getAnimatorSimulationFrameMotion(assembly = {}) {
  const motions = Array.isArray(assembly?.motion)
    ? assembly.motion
    : assembly?.motion
      ? [assembly.motion]
      : [];
  return motions.find((motion) => motion?.type === "simulation.frame") ?? null;
}

export function getAnimatorSimulationParticleId(source = {}, assembly = {}) {
  return normalizeString(
    source?.simulationParticleId ??
      source?.particleId ??
      source?.source?.simulationParticleId ??
      source?.source?.particleId ??
      source?.metadata?.simulationParticleId ??
      assembly?.metadata?.simulationParticleId,
    ""
  );
}

export function getAnimatorSimulationTimeForMotion(timeSeconds, motion = {}) {
  const timeScale = normalizeNumber(motion?.timeScale, 1) || 1;
  const timeOffset = normalizeNumber(motion?.timeOffset, 0);
  return normalizeNumber(timeSeconds, 0) * timeScale + timeOffset;
}

export function sampleAnimatorSimulationParticleAtTime(dataset, particleId, timeSeconds) {
  const frames = getSortedFrames(dataset);
  const bounds = getBoundingFrames(frames, timeSeconds);
  if (!bounds) {
    return null;
  }
  const fromParticle = getFrameParticle(bounds.from, particleId);
  const toParticle = getFrameParticle(bounds.to, particleId);
  const sample = interpolateFrameParticle(fromParticle, toParticle, bounds.alpha, timeSeconds);
  if (!sample) {
    return null;
  }
  return {
    ...sample,
    frame: {
      fromIndex: bounds.from.index,
      toIndex: bounds.to.index,
      fromTime: bounds.from.t,
      toTime: bounds.to.t,
      alpha: bounds.alpha,
    },
  };
}

export function sampleAnimatorSimulationDatasetAtTime(dataset, timeSeconds) {
  const frames = getSortedFrames(dataset);
  const bounds = getBoundingFrames(frames, timeSeconds);
  if (!bounds) {
    return null;
  }
  const particleIds = new Set([
    ...(Array.isArray(bounds.from?.particles)
      ? bounds.from.particles.map((particle) => particle?.id).filter(Boolean)
      : []),
    ...(Array.isArray(bounds.to?.particles)
      ? bounds.to.particles.map((particle) => particle?.id).filter(Boolean)
      : []),
  ]);
  const particles = [...particleIds]
    .map((particleId) => sampleAnimatorSimulationParticleAtTime(dataset, particleId, timeSeconds))
    .filter(Boolean);
  return {
    t: normalizeNumber(timeSeconds, 0),
    particles,
    diagnostics:
      bounds.alpha < 0.5
        ? { ...(bounds.from?.diagnostics ?? {}) }
        : { ...(bounds.to?.diagnostics ?? {}) },
    frame: {
      fromIndex: bounds.from.index,
      toIndex: bounds.to.index,
      fromTime: bounds.from.t,
      toTime: bounds.to.t,
      alpha: bounds.alpha,
    },
  };
}

export function sampleAnimatorSimulationParticleTrail(dataset, particleId, timeSeconds) {
  const frames = getSortedFrames(dataset);
  if (!frames.length) {
    return [];
  }
  const time = normalizeNumber(timeSeconds, 0);
  const points = [];
  frames.forEach((frame) => {
    if (Number(frame.t) > time) {
      return;
    }
    const particle = getFrameParticle(frame, particleId);
    if (particle) {
      points.push({
        t: Number(frame.t),
        position: vectorFromSample(particle.position),
      });
    }
  });
  const currentSample = sampleAnimatorSimulationParticleAtTime(dataset, particleId, time);
  const lastPoint = points[points.length - 1] ?? null;
  if (
    currentSample &&
    (!lastPoint || Math.abs(Number(lastPoint.t) - Number(currentSample.t)) > 0.000001)
  ) {
    points.push({
      t: Number(currentSample.t),
      position: vectorFromSample(currentSample.position),
    });
  }
  return points;
}
