export const ANIMATOR_SIMULATION_FRAME_BUFFER_SCHEMA_VERSION = "0.1.0";
export const ANIMATOR_SIMULATION_FRAME_BUFFER_KIND = "animator.simulation.frame-buffer";

const FRAME_VECTOR_DIMENSIONS = 3;
const PARTICLE_SCALAR_COUNT = 3;

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function vectorFromSample(value) {
  const source = Array.isArray(value) ? value : [];
  return Array.from({ length: FRAME_VECTOR_DIMENSIONS }, (_entry, index) =>
    normalizeNumber(source[index], 0)
  );
}

function collectParticleIds(dataset = {}) {
  const ids = new Set();
  if (Array.isArray(dataset?.particles)) {
    dataset.particles.forEach((particle) => {
      const id = normalizeString(particle?.id, "");
      if (id) ids.add(id);
    });
  }
  if (Array.isArray(dataset?.frames)) {
    dataset.frames.forEach((frame) => {
      if (!Array.isArray(frame?.particles)) return;
      frame.particles.forEach((particle) => {
        const id = normalizeString(particle?.id, "");
        if (id) ids.add(id);
      });
    });
  }
  return [...ids];
}

function getFrameParticleById(frame = {}, particleId = "") {
  if (!Array.isArray(frame?.particles) || !particleId) {
    return null;
  }
  return frame.particles.find((particle) => particle?.id === particleId) ?? null;
}

function bufferOffset(frameIndex, particleIndex, componentCount, particleCount) {
  return (frameIndex * particleCount + particleIndex) * componentCount;
}

export function stripAnimatorSimulationDatasetFrames(dataset = {}) {
  return {
    ...dataset,
    frames: [],
  };
}

export function createAnimatorSimulationFrameBuffer(dataset = {}, options = {}) {
  const frames = Array.isArray(dataset?.frames) ? dataset.frames : [];
  const particleIds = collectParticleIds(dataset);
  const frameCount = frames.length;
  const particleCount = particleIds.length;
  const ArrayCtor = options.ArrayCtor ?? Float64Array;
  const times = new ArrayCtor(frameCount);
  const positions = new ArrayCtor(frameCount * particleCount * FRAME_VECTOR_DIMENSIONS);
  const velocities = new ArrayCtor(frameCount * particleCount * FRAME_VECTOR_DIMENSIONS);
  const particleScalars = new ArrayCtor(frameCount * particleCount * PARTICLE_SCALAR_COUNT);
  const frameDiagnostics = frames.map((frame) =>
    frame?.diagnostics && typeof frame.diagnostics === "object"
      ? { ...frame.diagnostics }
      : {}
  );

  frames.forEach((frame, frameIndex) => {
    times[frameIndex] = normalizeNumber(frame?.t, frameIndex);
    particleIds.forEach((particleId, particleIndex) => {
      const particle = getFrameParticleById(frame, particleId);
      const vectorIndex = bufferOffset(
        frameIndex,
        particleIndex,
        FRAME_VECTOR_DIMENSIONS,
        particleCount
      );
      const scalarIndex = bufferOffset(
        frameIndex,
        particleIndex,
        PARTICLE_SCALAR_COUNT,
        particleCount
      );
      const position = vectorFromSample(particle?.position);
      const velocity = vectorFromSample(particle?.velocity);
      for (let component = 0; component < FRAME_VECTOR_DIMENSIONS; component += 1) {
        positions[vectorIndex + component] = position[component];
        velocities[vectorIndex + component] = velocity[component];
      }
      particleScalars[scalarIndex] = normalizeNumber(particle?.phase, 0);
      particleScalars[scalarIndex + 1] = normalizeNumber(particle?.radialVelocity, 0);
      particleScalars[scalarIndex + 2] = normalizeNumber(particle?.angularVelocity, 0);
    });
  });

  return {
    schemaVersion: ANIMATOR_SIMULATION_FRAME_BUFFER_SCHEMA_VERSION,
    kind: ANIMATOR_SIMULATION_FRAME_BUFFER_KIND,
    frameCount,
    particleCount,
    dimensions: FRAME_VECTOR_DIMENSIONS,
    particleScalarCount: PARTICLE_SCALAR_COUNT,
    particleIds,
    times,
    positions,
    velocities,
    particleScalars,
    frameDiagnostics,
  };
}

export function getAnimatorSimulationFrameBufferTransferList(frameBuffer = {}) {
  return [frameBuffer.times, frameBuffer.positions, frameBuffer.velocities, frameBuffer.particleScalars]
    .map((array) => array?.buffer)
    .filter((buffer, index, buffers) =>
      buffer instanceof ArrayBuffer && buffers.indexOf(buffer) === index
    );
}

export function summarizeAnimatorSimulationFrameBuffer(frameBuffer = {}) {
  const buffers = getAnimatorSimulationFrameBufferTransferList(frameBuffer);
  return {
    kind: frameBuffer.kind ?? ANIMATOR_SIMULATION_FRAME_BUFFER_KIND,
    schemaVersion:
      frameBuffer.schemaVersion ?? ANIMATOR_SIMULATION_FRAME_BUFFER_SCHEMA_VERSION,
    frameCount: Math.max(0, Math.round(normalizeNumber(frameBuffer.frameCount, 0))),
    particleCount: Math.max(0, Math.round(normalizeNumber(frameBuffer.particleCount, 0))),
    dimensions: Math.max(0, Math.round(normalizeNumber(frameBuffer.dimensions, 0))),
    byteLength: buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0),
  };
}

export function hydrateAnimatorSimulationDatasetFromFrameBuffer(
  datasetSkeleton = {},
  frameBuffer = {}
) {
  const particleIds = Array.isArray(frameBuffer?.particleIds) ? frameBuffer.particleIds : [];
  const frameCount = Math.max(0, Math.round(normalizeNumber(frameBuffer?.frameCount, 0)));
  const particleCount = Math.max(0, Math.round(normalizeNumber(frameBuffer?.particleCount, 0)));
  const dimensions = Math.max(1, Math.round(normalizeNumber(frameBuffer?.dimensions, 3)));
  const particleScalarCount = Math.max(
    0,
    Math.round(normalizeNumber(frameBuffer?.particleScalarCount, PARTICLE_SCALAR_COUNT))
  );
  const times = frameBuffer?.times ?? [];
  const positions = frameBuffer?.positions ?? [];
  const velocities = frameBuffer?.velocities ?? [];
  const particleScalars = frameBuffer?.particleScalars ?? [];
  const frameDiagnostics = Array.isArray(frameBuffer?.frameDiagnostics)
    ? frameBuffer.frameDiagnostics
    : [];

  const frames = Array.from({ length: frameCount }, (_entry, frameIndex) => ({
    index: frameIndex,
    t: normalizeNumber(times[frameIndex], frameIndex),
    particles: particleIds.slice(0, particleCount).map((particleId, particleIndex) => {
      const vectorIndex = bufferOffset(frameIndex, particleIndex, dimensions, particleCount);
      const scalarIndex = bufferOffset(
        frameIndex,
        particleIndex,
        particleScalarCount,
        particleCount
      );
      return {
        id: particleId,
        position: Array.from({ length: dimensions }, (_component, component) =>
          normalizeNumber(positions[vectorIndex + component], 0)
        ),
        velocity: Array.from({ length: dimensions }, (_component, component) =>
          normalizeNumber(velocities[vectorIndex + component], 0)
        ),
        phase: normalizeNumber(particleScalars[scalarIndex], 0),
        radialVelocity: normalizeNumber(particleScalars[scalarIndex + 1], 0),
        angularVelocity: normalizeNumber(particleScalars[scalarIndex + 2], 0),
      };
    }),
    diagnostics:
      frameDiagnostics[frameIndex] && typeof frameDiagnostics[frameIndex] === "object"
        ? { ...frameDiagnostics[frameIndex] }
        : {},
  }));

  return {
    ...datasetSkeleton,
    frames,
  };
}
