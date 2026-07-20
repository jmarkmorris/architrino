export const ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA =
  "animator-field-shell-event-stream-package.v1";
export const ANIMATOR_FIELD_SHELL_CADENCE_DESCRIPTOR_SCHEMA =
  "animator-field-shell-cadence-descriptor.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT = "field_shell_events.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_STORE_SCHEMA = "path_event_store.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA =
  "animator-field-shell-event-stream-manifest.v1";
export const ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA =
  "animator-field-shell-transmitter-source-history.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_NATIVE_FILE_MANIFEST_SCHEMA =
  "solver-native-file-stream-manifest.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_SCHEMA = "solver-stream-index.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_SIDECAR_SCHEMA =
  "solver-stream-index-sidecar.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES = 160;
export const ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_ROW_SIZE_BYTES = 64;

const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_INTERVAL_SECONDS = 0.25;
const DEFAULT_LIFETIME_SECONDS = 1.6;
const DEFAULT_NATIVE_FILE_STREAM_BASE_PATH = ".tmp/solver-streams";
const MIN_INTERVAL_SECONDS = 0.001;
const MIN_FIELD_SPEED = 0.000001;

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizePositiveNumber(value, fallback, min = 0) {
  const number = normalizeNumber(value, fallback);
  return number > min ? number : fallback;
}

function normalizeVector(value = {}) {
  if (Array.isArray(value)) {
    return {
      x: normalizeNumber(value[0], 0),
      y: normalizeNumber(value[1], 0),
      z: normalizeNumber(value[2], 0),
    };
  }
  const source = value && typeof value === "object" ? value : {};
  return {
    x: normalizeNumber(source.x, 0),
    y: normalizeNumber(source.y, 0),
    z: normalizeNumber(source.z, 0),
  };
}

function vectorTriplet(vector) {
  const normalized = normalizeVector(vector);
  return [normalized.x, normalized.y, normalized.z];
}

function idPart(value, fallback = "x") {
  const text = normalizeString(value, fallback)
    .replace(/[^a-z0-9_]+/giu, "_")
    .replace(/^_+|_+$/gu, "");
  return text || fallback;
}

function timeIdPart(value) {
  return normalizeNumber(value, 0)
    .toFixed(6)
    .replace(/0+$/u, "")
    .replace(/\.$/u, "")
    .replace(/[^0-9a-z]+/giu, "_");
}

function normalizeTimeWindow(input = {}) {
  const timeWindow =
    input.timeWindow && typeof input.timeWindow === "object" ? input.timeWindow : input;
  const start = normalizeNumber(timeWindow.start, 0);
  const end = normalizeNumber(timeWindow.end, start);
  return {
    start,
    end: end >= start ? end : start,
  };
}

function normalizeStoragePolicy(storagePolicy, byteLength = 0) {
  if (storagePolicy && typeof storagePolicy === "object") {
    if (storagePolicy.target === "native-file") {
      if (storagePolicy.durable !== true) {
        throw new Error("field-shell native-file storage must be durable");
      }
      return {
        target: "native-file",
        durable: true,
        maxBytes: Math.max(0, Math.floor(normalizeNumber(storagePolicy.maxBytes, byteLength))),
        ...(storagePolicy.basePath ? { basePath: normalizeString(storagePolicy.basePath) } : {}),
      };
    }
    return {
      target: "caller-buffer",
      durable: false,
      maxBytes: Math.max(0, Math.floor(normalizeNumber(storagePolicy.maxBytes, byteLength))),
    };
  }
  return {
    target: "caller-buffer",
    durable: false,
    maxBytes: byteLength,
  };
}

function normalizeSample(sample = {}, index = 0, fallbackFieldSpeed = DEFAULT_FIELD_SPEED) {
  const transmitterId = normalizeString(
    sample.transmitterId ?? sample.transmitter ?? sample.id,
    `transmitter_${index + 1}`
  );
  const metadata = sample.metadata && typeof sample.metadata === "object" ? sample.metadata : {};
  return {
    id: normalizeString(sample.id, transmitterId),
    transmitterId,
    receiverId: normalizeString(sample.receiverId ?? sample.receiver, transmitterId),
    time: normalizeNumber(sample.time ?? sample.emissionTime ?? sample.tEmit, 0),
    sampleIndex: Math.max(0, Math.floor(normalizeNumber(sample.sampleIndex, index))),
    position: normalizeVector(sample.position ?? sample.emissionPosition),
    sign: Math.sign(normalizeNumber(sample.sign ?? sample.polarity, 0)),
    fieldSpeed: Math.max(
      MIN_FIELD_SPEED,
      normalizePositiveNumber(sample.fieldSpeed, fallbackFieldSpeed, 0)
    ),
    metadata,
  };
}

function getMotionEntries(source = {}) {
  return Array.isArray(source?.motion)
    ? source.motion
    : source?.motion
      ? [source.motion]
      : [];
}

function getSceneTimeWindow(documentData = {}) {
  const sceneTime = documentData?.scene?.time ?? {};
  const start = normalizeNumber(sceneTime.start, 0);
  const end = normalizeNumber(sceneTime.end, Math.max(24, start + 1));
  return {
    start,
    end: end > start ? end : start + 1,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getPlaybackRateAtTime(documentData, timeSeconds) {
  const timeWarps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const activeWarp = timeWarps.find((warp) => timeSeconds >= warp.start && timeSeconds < warp.end);
  return normalizeNumber(activeWarp?.rate, 1) || 1;
}

function getMotionRateAtTime(documentData, timeSeconds) {
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const activePause = pauses.find((pause) => {
    const start = normalizeNumber(pause?.start, 0);
    const duration = Math.max(0, normalizeNumber(pause?.duration, 0) || 0);
    return timeSeconds >= start && timeSeconds < start + duration;
  });
  return activePause ? 0 : getPlaybackRateAtTime(documentData, timeSeconds);
}

function getIntegratedMotionTime(documentData, timeSeconds) {
  const timeWindow = getSceneTimeWindow(documentData);
  const targetTime = clamp(normalizeNumber(timeSeconds, 0), timeWindow.start, timeWindow.end);
  if (targetTime <= timeWindow.start) {
    return 0;
  }
  const pauses = Array.isArray(documentData?.scene?.pauses) ? documentData.scene.pauses : [];
  const warps = Array.isArray(documentData?.scene?.timeWarps) ? documentData.scene.timeWarps : [];
  const boundaries = new Set([timeWindow.start, targetTime]);
  pauses.forEach((pause) => {
    const start = clamp(normalizeNumber(pause?.start, 0), timeWindow.start, targetTime);
    const end = clamp(start + Math.max(0, normalizeNumber(pause?.duration, 0) || 0), timeWindow.start, targetTime);
    boundaries.add(start);
    boundaries.add(end);
  });
  warps.forEach((warp) => {
    boundaries.add(clamp(normalizeNumber(warp?.start, 0), timeWindow.start, targetTime));
    boundaries.add(clamp(normalizeNumber(warp?.end, 0), timeWindow.start, targetTime));
  });
  const sortedBoundaries = [...boundaries].sort((left, right) => left - right);
  let total = 0;
  for (let index = 0; index < sortedBoundaries.length - 1; index += 1) {
    const start = sortedBoundaries[index];
    const end = sortedBoundaries[index + 1];
    if (!(end > start)) {
      continue;
    }
    total += (end - start) * getMotionRateAtTime(documentData, start + (end - start) * 0.5);
  }
  return total;
}

function getTotalMotionDuration(documentData) {
  const timeWindow = getSceneTimeWindow(documentData);
  return Math.max(0.0001, getIntegratedMotionTime(documentData, timeWindow.end));
}

function getMotionSamplingState(documentData = {}, playbackTime = 0) {
  const motionTime = getIntegratedMotionTime(documentData, playbackTime);
  const totalMotionDuration = getTotalMotionDuration(documentData);
  return {
    motionTime,
    normalizedSceneT: totalMotionDuration > 0 ? clamp(motionTime / totalMotionDuration, 0, 1) : 0,
  };
}

function vectorFromValue(value = {}) {
  if (Array.isArray(value)) {
    return {
      x: normalizeNumber(value[0], 0),
      y: normalizeNumber(value[1], 0),
      z: normalizeNumber(value[2], 0),
    };
  }
  return normalizeVector(value);
}

function vectorAdd(left, right) {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z,
  };
}

function vectorScale(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale,
  };
}

function vectorCross(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function vectorLengthSq(vector) {
  return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
}

function vectorNormalize(vector, fallback = { x: 0, y: 1, z: 0 }) {
  const length = Math.sqrt(vectorLengthSq(vector));
  return length > 0.0000001 ? vectorScale(vector, 1 / length) : { ...fallback };
}

function vectorLerp(left, right, t) {
  return {
    x: left.x + (right.x - left.x) * t,
    y: left.y + (right.y - left.y) * t,
    z: left.z + (right.z - left.z) * t,
  };
}

function vectorToTriplet(vector) {
  return [vector.x, vector.y, vector.z];
}

function catmullRomPoint(p0, p1, p2, p3, t, tension = 0.5) {
  const t2 = t * t;
  const t3 = t2 * t;
  const v0 = vectorScale({ x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z }, tension);
  const v1 = vectorScale({ x: p3.x - p1.x, y: p3.y - p1.y, z: p3.z - p1.z }, tension);
  return {
    x: (2 * p1.x - 2 * p2.x + v0.x + v1.x) * t3 +
      (-3 * p1.x + 3 * p2.x - 2 * v0.x - v1.x) * t2 +
      v0.x * t +
      p1.x,
    y: (2 * p1.y - 2 * p2.y + v0.y + v1.y) * t3 +
      (-3 * p1.y + 3 * p2.y - 2 * v0.y - v1.y) * t2 +
      v0.y * t +
      p1.y,
    z: (2 * p1.z - 2 * p2.z + v0.z + v1.z) * t3 +
      (-3 * p1.z + 3 * p2.z - 2 * v0.z - v1.z) * t2 +
      v0.z * t +
      p1.z,
  };
}

function samplePointAt(points, normalizedT, options = {}) {
  if (!Array.isArray(points) || !points.length) {
    return { x: 0, y: 0, z: 0 };
  }
  const source = points.map(vectorFromValue);
  if (source.length === 1) {
    return source[0];
  }
  const clamped = clamp(normalizeNumber(normalizedT, 0), 0, 1);
  const closed = !!options.closed;
  if ((options.interpolate ?? "spline") !== "linear" && source.length > 2) {
    const scaled = clamped * (closed ? source.length : source.length - 1);
    const baseIndex = Math.min(source.length - 1, Math.floor(scaled));
    const localT = scaled - baseIndex;
    const indexFor = (index) => {
      if (closed) {
        return (index + source.length) % source.length;
      }
      return clamp(index, 0, source.length - 1);
    };
    return catmullRomPoint(
      source[indexFor(baseIndex - 1)],
      source[indexFor(baseIndex)],
      source[indexFor(baseIndex + 1)],
      source[indexFor(baseIndex + 2)],
      baseIndex >= source.length - 1 && !closed ? 1 : localT
    );
  }
  const linearSource = closed ? [...source, source[0]] : source;
  const scaled = clamped * (linearSource.length - 1);
  const baseIndex = Math.floor(scaled);
  const nextIndex = Math.min(linearSource.length - 1, baseIndex + 1);
  return vectorLerp(linearSource[baseIndex], linearSource[nextIndex], scaled - baseIndex);
}

function computeAssemblyBasePosition(assembly, index, count, pathById) {
  const transformPosition = assembly?.transform?.position;
  const hasParent = !!assembly?.parentId;
  const hasExplicitTransformPosition =
    Array.isArray(transformPosition) &&
    transformPosition.length >= 3 &&
    (transformPosition.some((value) => normalizeNumber(value, 0) !== 0) || hasParent);
  if (hasExplicitTransformPosition) {
    return vectorFromValue(transformPosition);
  }
  const transportMotion = getMotionEntries(assembly).find((motion) => motion?.type === "path.transport");
  if (transportMotion?.pathId && pathById.has(transportMotion.pathId)) {
    const path = pathById.get(transportMotion.pathId);
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (points.length) {
      return vectorFromValue(points[0]);
    }
  }
  if (count <= 1) {
    return { x: 0, y: 0, z: 0 };
  }
  const angle = (index / count) * Math.PI * 2;
  const radius = 1.6 + count * 0.08;
  return { x: Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius };
}

function normalizeMotionSourceKind(value) {
  const source = normalizeString(value, "").toLowerCase();
  if (source === "solver-derived" || source === "simulation" || source === "simulation.frames") {
    return "solver-derived";
  }
  if (source === "authored" || source === "manual" || source === "path.transport") {
    return "authored";
  }
  if (source === "mixed") {
    return "mixed";
  }
  return "";
}

function getPathOwnerAssemblyId(path) {
  return path?.metadata?.ownerAssemblyId ?? path?.ownerAssemblyId ?? null;
}

function getPathMotionSourceKind(path = {}) {
  const explicitSource = normalizeMotionSourceKind(path?.metadata?.motionSource);
  if (explicitSource) {
    return explicitSource;
  }
  const kind = normalizeString(path?.kind, "").toLowerCase();
  if (kind.startsWith("simulation.") || kind.includes("solver")) {
    return "solver-derived";
  }
  const points = path?.payload?.points ?? path?.points;
  return Array.isArray(points) && points.length ? "authored" : "static";
}

function getAssemblyMotionSourceKind(assembly = {}) {
  const explicitSource = normalizeMotionSourceKind(assembly?.metadata?.motionSource);
  const motions = getMotionEntries(assembly);
  const hasSimulationFrameMotion = motions.some((motion) =>
    normalizeString(motion?.type, "").toLowerCase().startsWith("simulation.")
  );
  const hasAuthoredTransportMotion = motions.some((motion) => motion?.type === "path.transport");
  if (explicitSource === "mixed" || (hasSimulationFrameMotion && hasAuthoredTransportMotion)) {
    return "mixed";
  }
  if (explicitSource === "solver-derived" || hasSimulationFrameMotion) {
    return "solver-derived";
  }
  if (explicitSource === "authored" || hasAuthoredTransportMotion) {
    return "authored";
  }
  return "static";
}

function getDocumentAssemblyById(assemblies, assemblyId) {
  return assemblies.find((assembly) => assembly?.id === assemblyId) ?? null;
}

function getDocumentPathSourceKind(path, assemblies) {
  if (!path) {
    return "static";
  }
  const ownerAssembly = getDocumentAssemblyById(assemblies, getPathOwnerAssemblyId(path));
  const pathSourceKind = getPathMotionSourceKind(path);
  const assemblySourceKind = getAssemblyMotionSourceKind(ownerAssembly);
  if (pathSourceKind !== "static") {
    return pathSourceKind;
  }
  if (assemblySourceKind === "solver-derived") {
    return "solver-derived";
  }
  if (assemblySourceKind === "authored") {
    return "authored";
  }
  return pathSourceKind;
}

function getSimulationFrameMotion(assembly = {}) {
  return getMotionEntries(assembly).find((motion) => motion?.type === "simulation.frame") ?? null;
}

function getSimulationParticleId(source = {}, assembly = {}) {
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

function getSimulationTimeForMotion(timeSeconds, motion = {}) {
  return normalizeNumber(timeSeconds, 0) * (normalizeNumber(motion?.timeScale, 1) || 1) +
    normalizeNumber(motion?.timeOffset, 0);
}

function getSortedFrames(dataset) {
  return Array.isArray(dataset?.frames)
    ? [...dataset.frames]
        .filter((frame) => Number.isFinite(Number(frame?.t)))
        .sort((left, right) => Number(left.t) - Number(right.t))
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
      return { from, to, alpha: (time - start) / Math.max(0.000001, end - start) };
    }
  }
  return { from: lastFrame, to: lastFrame, alpha: 0 };
}

function sampleSimulationParticleAtTime(dataset, particleId, timeSeconds) {
  const bounds = getBoundingFrames(getSortedFrames(dataset), timeSeconds);
  if (!bounds) {
    return null;
  }
  const fromParticle = getFrameParticle(bounds.from, particleId);
  const toParticle = getFrameParticle(bounds.to, particleId);
  const fallbackParticle = fromParticle ?? toParticle;
  if (!fallbackParticle) {
    return null;
  }
  const fromPosition = vectorFromValue((fromParticle ?? fallbackParticle).position);
  const toPosition = vectorFromValue((toParticle ?? fallbackParticle).position);
  return {
    t: timeSeconds,
    position: vectorToTriplet(vectorLerp(fromPosition, toPosition, bounds.alpha)),
  };
}

function getSimulationDatasetTimeWindow(dataset) {
  const explicitStart = Number(dataset?.simulation?.time?.start);
  const explicitEnd = Number(dataset?.simulation?.time?.end);
  if (Number.isFinite(explicitStart) && Number.isFinite(explicitEnd) && explicitEnd > explicitStart) {
    return { start: explicitStart, end: explicitEnd };
  }
  const frameTimes = getSortedFrames(dataset).map((frame) => Number(frame.t));
  return frameTimes.length >= 2
    ? { start: frameTimes[0], end: frameTimes[frameTimes.length - 1] }
    : { start: 0, end: 1 };
}

function getSimulationDatasetProgress(dataset, timeSeconds) {
  const timeWindow = getSimulationDatasetTimeWindow(dataset);
  return clamp((normalizeNumber(timeSeconds, 0) - timeWindow.start) /
    Math.max(0.000001, timeWindow.end - timeWindow.start), 0, 1);
}

function getSolverPathForAssembly(paths = [], assemblies = [], assemblyId = null, particleId = "") {
  const normalizedParticleId = normalizeString(particleId, "");
  return (
    paths.find((path) => {
      if (getDocumentPathSourceKind(path, assemblies) !== "solver-derived") {
        return false;
      }
      if (assemblyId && getPathOwnerAssemblyId(path) === assemblyId) {
        return true;
      }
      return normalizedParticleId &&
        normalizeString(path?.metadata?.simulationParticleId, "") === normalizedParticleId;
    }) ?? null
  );
}

function resolveAssemblyCenterAtMotionTime(assembly, index, context, stack = new Set()) {
  if (!assembly?.id) {
    return { x: 0, y: 0, z: 0 };
  }
  if (context.centers.has(assembly.id)) {
    return { ...context.centers.get(assembly.id) };
  }
  if (stack.has(assembly.id)) {
    return computeAssemblyBasePosition(assembly, index, context.assemblies.length, context.pathById);
  }
  stack.add(assembly.id);
  const transportMotion = getMotionEntries(assembly).find((motion) => motion?.type === "path.transport");
  const simulationFrameMotion = getSimulationFrameMotion(assembly);
  let center = computeAssemblyBasePosition(assembly, index, context.assemblies.length, context.pathById);
  const simulationParticleId = getSimulationParticleId(simulationFrameMotion, assembly);
  if (context.simulationDataset && simulationFrameMotion && simulationParticleId) {
    const simulationTime = getSimulationTimeForMotion(context.motionTime, simulationFrameMotion);
    const solverPath = getSolverPathForAssembly(context.paths, context.assemblies, assembly.id, simulationParticleId);
    const solverPathPoints = Array.isArray(solverPath?.payload?.points) ? solverPath.payload.points : [];
    if (solverPathPoints.length) {
      center = samplePointAt(solverPathPoints, getSimulationDatasetProgress(context.simulationDataset, simulationTime), {
        interpolate: solverPath?.payload?.interpolate ?? "spline",
        closed: !!solverPath?.payload?.closed,
      });
    } else {
      const simulationSample = sampleSimulationParticleAtTime(
        context.simulationDataset,
        simulationParticleId,
        simulationTime
      );
      if (simulationSample?.position) {
        center = vectorFromValue(simulationSample.position);
      }
    }
  } else if (transportMotion?.pathId && context.pathById.has(transportMotion.pathId)) {
    const path = context.pathById.get(transportMotion.pathId);
    const points = Array.isArray(path?.payload?.points) ? path.payload.points : [];
    if (points.length) {
      center = samplePointAt(points, clamp(
        context.normalizedSceneT * (normalizeNumber(transportMotion.speed, 1) || 1) +
          normalizeNumber(transportMotion.phase, 0),
        0,
        1
      ), {
        interpolate: path?.payload?.interpolate ?? "spline",
        closed: !!path?.payload?.closed,
      });
    }
  }
  const parentId = assembly?.parentId;
  if (parentId && context.assemblyById.has(parentId)) {
    const parentAssembly = context.assemblyById.get(parentId);
    const parentIndex = context.assemblies.findIndex((candidate) => candidate?.id === parentId);
    if (parentAssembly && parentIndex !== -1) {
      center = vectorAdd(center, resolveAssemblyCenterAtMotionTime(parentAssembly, parentIndex, context, stack));
    }
  }
  context.centers.set(assembly.id, { ...center });
  stack.delete(assembly.id);
  return center;
}

function getOrbitBasis(motion) {
  const normal = vectorNormalize(Array.isArray(motion?.planeNormal)
    ? vectorFromValue(motion.planeNormal)
    : { x: 0, y: 1, z: 0 });
  const reference = Math.abs(normal.y) < 0.9 ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 };
  const u = vectorNormalize(vectorCross(reference, normal), { x: 1, y: 0, z: 0 });
  const v = vectorNormalize(vectorCross(normal, u), { x: 0, y: 0, z: 1 });
  return { normal, u, v };
}

function getOrbitOffsetAtTime(motion, chargeType, timeSeconds) {
  const radius = normalizeNumber(motion?.radius, 0.65);
  const frequency = normalizeNumber(motion?.frequencyHz, 0.25);
  const phase = normalizeNumber(motion?.phase, 0);
  const direction = motion?.direction === "cw" ? -1 : 1;
  const phaseOffset = chargeType === "electrino" ? Math.PI : 0;
  const angle = phase + phaseOffset + direction * timeSeconds * Math.PI * 2 * frequency;
  const { u, v } = getOrbitBasis(motion);
  return vectorAdd(vectorScale(u, Math.cos(angle) * radius), vectorScale(v, Math.sin(angle) * radius));
}

function getMemberId(member, index = 0) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return normalizeString(member.id ?? member.name, `member_${index + 1}`);
  }
  return normalizeString(member, `member_${index + 1}`);
}

function findCoreMemberId(members, chargeType, binaryIndex) {
  const targetPrefix = chargeType === "electrino" ? "electrino" : "positrino";
  const targetSuffix = String(binaryIndex + 1);
  const candidates = Array.isArray(members) ? members : [];
  const exactMatch = candidates.find((member, memberIndex) => {
    const normalized = getMemberId(member, memberIndex).trim().toLowerCase();
    return normalized === `${targetPrefix}_${targetSuffix}` || normalized === `${targetPrefix}${targetSuffix}`;
  });
  if (exactMatch) {
    return getMemberId(exactMatch, candidates.indexOf(exactMatch));
  }
  const prefixMatches = candidates
    .map((member, memberIndex) => getMemberId(member, memberIndex))
    .filter((memberId) => memberId.trim().toLowerCase().startsWith(targetPrefix));
  return prefixMatches[binaryIndex] ?? null;
}

function resolveTransmitterHistory(descriptor = {}, fallbackFieldSpeed = DEFAULT_FIELD_SPEED) {
  const transmitterHistory = descriptor.transmitterHistory;
  if (transmitterHistory && typeof transmitterHistory === "object") {
    return transmitterHistory.schema === ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA &&
      Array.isArray(transmitterHistory.samples)
      ? transmitterHistory
      : createAnimatorFieldShellTransmitterHistory({
          ...transmitterHistory,
          fieldSpeed: transmitterHistory.fieldSpeed ?? fallbackFieldSpeed,
        });
  }
  return null;
}

function createFieldShellEventRow(sample, rowIndex, descriptor, options) {
  const fieldSpeed = Math.max(
    MIN_FIELD_SPEED,
    normalizePositiveNumber(sample.fieldSpeed, descriptor.fieldSpeed, 0)
  );
  const lifetimeSeconds = normalizePositiveNumber(
    descriptor.lifetimeSeconds,
    DEFAULT_LIFETIME_SECONDS,
    0
  );
  const displayTime = sample.time + lifetimeSeconds;
  const radiusAtDisplay = fieldSpeed * lifetimeSeconds;
  const cadenceIntervalSeconds = normalizePositiveNumber(
    descriptor.cadence.intervalSeconds,
    DEFAULT_INTERVAL_SECONDS,
    0
  );
  const id = `field_shell_event_${idPart(sample.transmitterId, "transmitter")}_t${timeIdPart(sample.time)}_${rowIndex}`;

  return {
    id,
    eventId: rowIndex,
    rowLayout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
    eventClass: "field_shell_emitted",
    streamId: descriptor.streamId,
    transmitterId: sample.transmitterId,
    emissionTime: sample.time,
    emissionPoint: sample.position,
    fieldSpeed,
    sign: sample.sign,
    strength: normalizePositiveNumber(sample.strength, 1, 0),
    cadenceIndex: sample.sampleIndex,
    cadenceIntervalSeconds,
    displayTime,
    radiusAtDisplay,
    statusCode: 0,
    metadata: {
      source: "solver-owned-field-shell-event-row",
      streamId: descriptor.streamId,
      streamSchema: ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA,
      manifestSchema: ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA,
      rowLayout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
      cadenceDescriptorSchema: ANIMATOR_FIELD_SHELL_CADENCE_DESCRIPTOR_SCHEMA,
      continuousExpansion: true,
      fixedEmissionPosition: true,
      emissionIntervalSeconds: cadenceIntervalSeconds,
      ...(sample.metadata && typeof sample.metadata === "object" ? sample.metadata : {}),
      ...(options.metadata && typeof options.metadata === "object" ? options.metadata : {}),
    },
  };
}

function createStreamDescriptor({
  streamId,
  rows,
  byteLength,
  timeRange,
  storagePolicy,
  metadata,
  availableRanges,
}) {
  return {
    streamId,
    manifestVersion: "solver-stream-manifest.v1",
    indexLayout: "stream_index.v1",
    availableRanges: Array.isArray(availableRanges)
      ? availableRanges
      : rows.length
      ? [{
          timeRange,
          frameRange: { start: 0, end: rows.length - 1 },
          byteRange: { start: 0, end: byteLength },
        }]
      : [],
    storagePolicy,
    metadata: {
      schema: "solver-path-history-stream-metadata.v1",
      precisionPath: metadata.precisionPath ?? "event_root_focused",
      numericType: metadata.numericType ?? "f64",
      numericChart: metadata.numericChart ?? "absolute_f64",
      valueAuthority: metadata.valueAuthority ?? "authoritative",
      appBufferAuthority: metadata.appBufferAuthority ?? "display-only",
      claimLevel: metadata.claimLevel ?? "interactive-preview",
      units: metadata.units ?? "solver-time",
      coordinateFrame: metadata.coordinateFrame ?? "animator-scene-frame",
      scaleNormalization: metadata.scaleNormalization ?? "none",
      interpolationRule: metadata.interpolationRule ?? "field-shell-event-cadence",
      provenance: metadata.provenance ?? { source: "animator-field-shell-event-stream" },
      diagnostics: Array.isArray(metadata.diagnostics) ? metadata.diagnostics : [],
    },
  };
}

function createEventStore(streamId, rows) {
  return {
    schema: ANIMATOR_FIELD_SHELL_EVENT_STORE_SCHEMA,
    streamId,
    eventClass: "field_shell_emitted",
    eventCount: rows.length,
    events: rows.map((row, index) => ({
      sequence: index,
      eventTime: row.emissionTime,
      eventId: row.id,
      eventClass: row.eventClass,
      affectedIds: [row.transmitterId],
      rowLayout: row.rowLayout,
      statusCode: row.statusCode,
      checksumScope: "field-shell-event-row",
    })),
  };
}

function createManifest({ stream, rows, cadence, eventStore, byteLength }) {
  return {
    schema: ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA,
    streamId: stream.streamId,
    manifestVersion: stream.manifestVersion,
    rowLayout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
    rowCount: rows.length,
    byteLength,
    cadence,
    stream,
    eventStore,
    summary: {
      rowCount: rows.length,
      eventCount: rows.length,
      timeRange: rows.length
        ? {
            start: Math.min(...rows.map((row) => row.emissionTime)),
            end: Math.max(...rows.map((row) => row.emissionTime)),
          }
        : { start: 0, end: 0 },
      transmitterCount: new Set(rows.map((row) => row.transmitterId)).size,
      storageTarget: stream.storagePolicy.target,
      durable: stream.storagePolicy.durable === true,
    },
  };
}

function requireNativeFileStorageModules() {
  const fs = globalThis.process?.getBuiltinModule?.("fs");
  const path = globalThis.process?.getBuiltinModule?.("path");
  if (!fs || !path) {
    throw new Error("native-file stream storage is not available in this runtime");
  }
  return { fs, path };
}

function getNativeProcessCwd() {
  return typeof globalThis.process?.cwd === "function" ? globalThis.process.cwd() : ".";
}

function sanitizeStoragePathSegment(value) {
  const sanitized = String(value).replace(/[^A-Za-z0-9._-]+/gu, "_").replace(/^_+|_+$/gu, "");
  return sanitized || "stream";
}

function prepareNativeFileStreamStorage(streamId, storagePolicy) {
  const { fs, path } = requireNativeFileStorageModules();
  const basePath = path.resolve(
    storagePolicy.basePath ?? path.join(getNativeProcessCwd(), DEFAULT_NATIVE_FILE_STREAM_BASE_PATH)
  );
  const streamPath = path.join(basePath, sanitizeStoragePathSegment(streamId));
  fs.rmSync(streamPath, { recursive: true, force: true });
  fs.mkdirSync(streamPath, { recursive: true });
  return {
    fs,
    path,
    basePath,
    streamPath,
    indexPath: path.join(streamPath, "stream-index.stream_index.v1.bin"),
    manifestPath: path.join(streamPath, "stream-manifest.json"),
  };
}

function fnv1a64ArrayBufferHex(buffer) {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) {
    hash ^= BigInt(byte);
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

function fnv1a64StringBigInt(value) {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const text = String(value ?? "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= BigInt(text.charCodeAt(index) & 0xff);
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash;
}

function safeUint64BigInt(value) {
  const number = Math.max(0, Math.trunc(normalizeNumber(value, 0)));
  return BigInt(number);
}

function writeVectorToView(view, offset, vector) {
  const normalized = normalizeVector(vector);
  view.setFloat64(offset, normalized.x, true);
  view.setFloat64(offset + 8, normalized.y, true);
  view.setFloat64(offset + 16, normalized.z, true);
}

function encodeFieldShellEventRowsV1(rows) {
  const buffer = new ArrayBuffer(rows.length * ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES);
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    const offset = index * ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES;
    view.setBigUint64(offset, safeUint64BigInt(row.eventId), true);
    view.setFloat64(offset + 8, normalizeNumber(row.emissionTime, 0), true);
    view.setUint32(offset + 16, Math.max(0, Math.trunc(normalizeNumber(row.statusCode, 0))), true);
    view.setInt32(offset + 20, Math.trunc(normalizeNumber(row.sign, 0)), true);
    writeVectorToView(view, offset + 24, row.emissionPoint);
    view.setFloat64(offset + 48, normalizeNumber(row.fieldSpeed, DEFAULT_FIELD_SPEED), true);
    view.setFloat64(offset + 56, normalizeNumber(row.radiusAtDisplay, 0), true);
    view.setFloat64(offset + 64, normalizeNumber(row.displayTime, row.emissionTime), true);
    view.setFloat64(offset + 72, normalizeNumber(row.cadenceIntervalSeconds, 0), true);
    view.setBigUint64(offset + 80, safeUint64BigInt(row.cadenceIndex), true);
    view.setBigUint64(offset + 88, fnv1a64StringBigInt(row.transmitterId), true);
    view.setFloat64(offset + 96, normalizeNumber(row.strength, 1), true);
    view.setFloat64(
      offset + 104,
      normalizeNumber(row.displayTime, row.emissionTime) - normalizeNumber(row.emissionTime, 0),
      true
    );
  });
  return buffer;
}

function encodeStreamIndexRowsV1(rows) {
  const buffer = new ArrayBuffer(rows.length * ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_ROW_SIZE_BYTES);
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    const offset = index * ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_ROW_SIZE_BYTES;
    view.setBigUint64(offset, safeUint64BigInt(row.pathKey), true);
    view.setBigUint64(offset + 8, safeUint64BigInt(row.chunkIndex), true);
    view.setBigUint64(offset + 16, safeUint64BigInt(row.rowOffset), true);
    view.setBigUint64(offset + 24, safeUint64BigInt(row.rowCount), true);
    view.setFloat64(offset + 32, row.timeRange.start, true);
    view.setFloat64(offset + 40, row.timeRange.end, true);
    view.setBigUint64(offset + 48, safeUint64BigInt(row.byteRange.start), true);
    view.setBigUint64(offset + 56, safeUint64BigInt(row.byteRange.end - row.byteRange.start), true);
  });
  return buffer;
}

function createBufferDescriptor(bufferId, rowCount, byteLength, checksum = "") {
  return {
    bufferId,
    layout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
    byteOffset: 0,
    byteLength,
    rowCount,
    rowSizeBytes: ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES,
    numericType: "f64",
    authority: "solver-owned-event-package",
    ...(checksum ? { checksum } : {}),
  };
}

function summarizeRows(rows, fallbackTimeRange) {
  if (!rows.length) {
    return {
      timeRange: { ...fallbackTimeRange },
      frameRange: { start: 0, end: 0 },
    };
  }
  const times = rows.map((row) => row.emissionTime);
  return {
    timeRange: {
      start: Math.min(...times),
      end: Math.max(...times),
    },
    frameRange: {
      start: rows[0].eventId,
      end: rows[rows.length - 1].eventId,
    },
  };
}

function writeNativeFileStreamChunk(storage, chunkIndex, descriptor, buffer) {
  const chunkName = `chunk-${String(chunkIndex).padStart(6, "0")}.${ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT}.bin`;
  const filePath = storage.path.join(storage.streamPath, chunkName);
  storage.fs.writeFileSync(filePath, new Uint8Array(buffer));
  return {
    ...descriptor,
    storageTarget: "native-file",
    filePath,
  };
}

function writeNativeFileStreamIndexSidecar(storage, index) {
  const buffer = encodeStreamIndexRowsV1(index.pathIndexRows);
  storage.fs.writeFileSync(storage.indexPath, new Uint8Array(buffer));
  return {
    schema: ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_SIDECAR_SCHEMA,
    indexLayout: "stream_index.v1",
    numericType: "f64",
    byteOrder: "little-endian",
    rowSizeBytes: ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_ROW_SIZE_BYTES,
    rowCount: index.pathIndexRows.length,
    byteLength: buffer.byteLength,
    filePath: storage.indexPath,
    checksum: fnv1a64ArrayBufferHex(buffer),
  };
}

function writeNativeFileStreamManifest(storage, stream, chunks, index, fieldShellEventManifest) {
  const nativeManifest = {
    schema: ANIMATOR_FIELD_SHELL_EVENT_NATIVE_FILE_MANIFEST_SCHEMA,
    stream,
    chunks,
    index,
    fieldShellEventManifest,
  };
  storage.fs.writeFileSync(storage.manifestPath, `${JSON.stringify(nativeManifest, null, 2)}\n`);
  return nativeManifest;
}

function createNativeFileStreamIndex(streamId, chunks, indexRows) {
  return {
    schema: ANIMATOR_FIELD_SHELL_EVENT_STREAM_INDEX_SCHEMA,
    streamId,
    indexLayout: "stream_index.v1",
    chunkCount: chunks.length,
    pathIndexRows: indexRows,
  };
}

function createNativeFieldShellEventStorage({ streamId, rows, fallbackTimeRange, storagePolicy, rowsPerChunk }) {
  const storage = prepareNativeFileStreamStorage(streamId, storagePolicy);
  const chunkSize = Math.max(
    1,
    Math.floor(normalizeNumber(rowsPerChunk, rows.length || 1))
  );
  const chunks = [];
  const availableRanges = [];
  const pathIndexRows = [];
  let byteOffset = 0;

  for (let offset = 0; offset < rows.length; offset += chunkSize) {
    const chunkRows = rows.slice(offset, offset + chunkSize);
    const buffer = encodeFieldShellEventRowsV1(chunkRows);
    const descriptor = createBufferDescriptor(
      `${streamId}:field-shell-event-chunk-${chunks.length}`,
      chunkRows.length,
      buffer.byteLength,
      fnv1a64ArrayBufferHex(buffer)
    );
    const storedDescriptor = writeNativeFileStreamChunk(storage, chunks.length, descriptor, buffer);
    const summary = summarizeRows(chunkRows, fallbackTimeRange);
    const range = {
      timeRange: summary.timeRange,
      frameRange: summary.frameRange,
      byteRange: { start: byteOffset, end: byteOffset + buffer.byteLength },
    };
    availableRanges.push(range);
    pathIndexRows.push({
      pathKey: 0,
      chunkIndex: chunks.length,
      rowOffset: 0,
      rowCount: chunkRows.length,
      timeRange: summary.timeRange,
      frameRange: summary.frameRange,
      byteRange: range.byteRange,
    });
    byteOffset += buffer.byteLength;
    chunks.push(storedDescriptor);
  }

  const storagePaths = {
    target: "native-file",
    durable: true,
    maxBytes: storagePolicy.maxBytes || byteOffset,
    basePath: storage.basePath,
    streamPath: storage.streamPath,
    indexPath: storage.indexPath,
    manifestPath: storage.manifestPath,
  };
  const index = createNativeFileStreamIndex(streamId, chunks, pathIndexRows);
  const sidecar = writeNativeFileStreamIndexSidecar(storage, index);
  return {
    storage,
    storagePolicy: storagePaths,
    chunks,
    availableRanges,
    index: {
      ...index,
      sidecar,
    },
    byteLength: byteOffset,
  };
}

function rowToFieldShell(row) {
  return {
    id: `architrino_shell_${row.transmitterId}_${row.cadenceIndex}`,
    transmitterId: row.transmitterId,
    emissionTime: row.emissionTime,
    displayTime: row.displayTime,
    emissionPosition: vectorTriplet(row.emissionPoint),
    radius: row.radiusAtDisplay,
    sign: row.sign,
    strength: row.strength,
    fieldSpeed: row.fieldSpeed,
    branchId: `architrino_shell_event_${row.cadenceIndex}`,
    metadata: {
      ...row.metadata,
      source: "solver-owned-field-shell-event-stream",
      fieldShellEventId: row.id,
      fieldShellEventStreamId: row.streamId,
    },
  };
}

function rowToEmissionEvent(row) {
  return {
    id: row.id,
    transmitterId: row.transmitterId,
    emissionTime: row.emissionTime,
    emissionPoint: vectorTriplet(row.emissionPoint),
    fieldSpeed: row.fieldSpeed,
    metadata: {
      ...row.metadata,
      source: "solver-owned-field-shell-event-stream",
      fieldShellEventId: row.id,
      fieldShellEventStreamId: row.streamId,
    },
  };
}

export function createAnimatorFieldShellTransmitterHistory(descriptor = {}) {
  const documentData = descriptor.documentData ?? descriptor.document ?? {};
  const simulationDataset = descriptor.simulationDataset ?? null;
  const timeWindow = normalizeTimeWindow(descriptor.timeWindow ?? getSceneTimeWindow(documentData));
  const sampleTimes = Array.isArray(descriptor.sampleTimes)
    ? descriptor.sampleTimes.map((time) => normalizeNumber(time, timeWindow.start))
    : createAnimatorFieldShellCadenceTimes({
        timeWindow,
        intervalSeconds: descriptor.intervalSeconds ?? descriptor.cadence?.intervalSeconds,
      });
  const fieldSpeed = Math.max(
    MIN_FIELD_SPEED,
    normalizePositiveNumber(descriptor.fieldSpeed, DEFAULT_FIELD_SPEED, 0)
  );
  const sampleIntervalSeconds = normalizePositiveNumber(
    descriptor.sampleIntervalSeconds ?? descriptor.intervalSeconds ?? descriptor.cadence?.intervalSeconds,
    DEFAULT_INTERVAL_SECONDS,
    0
  );
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const pathById = new Map(paths.map((path) => [path.id, path]));
  const assemblyById = new Map(assemblies.map((assembly) => [assembly.id, assembly]));
  const samples = [];

  sampleTimes.forEach((sampleTime, sampleIndex) => {
    const { motionTime, normalizedSceneT } = getMotionSamplingState(documentData, sampleTime);
    const context = {
      assemblies,
      assemblyById,
      paths,
      pathById,
      simulationDataset,
      motionTime,
      normalizedSceneT,
      centers: new Map(),
    };
    assemblies.forEach((assembly, assemblyIndex) => {
      const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries : [];
      if (!binaries.length) {
        return;
      }
      const assemblyCenter = resolveAssemblyCenterAtMotionTime(assembly, assemblyIndex, context);
      binaries.forEach((binary, binaryIndex) => {
        if (binary?.motion?.type !== "orbit.circular") {
          return;
        }
        [
          { chargeType: "positrino", sign: 1 },
          { chargeType: "electrino", sign: -1 },
        ].forEach(({ chargeType, sign }) => {
          const memberId = findCoreMemberId(assembly.members, chargeType, binaryIndex);
          if (!memberId) {
            return;
          }
          const position = vectorAdd(
            assemblyCenter,
            getOrbitOffsetAtTime(binary.motion, chargeType, motionTime)
          );
          samples.push({
            id: `${assembly.id}_${memberId}`,
            transmitterId: `${assembly.id}_${memberId}`,
            receiverId: `${assembly.id}_${memberId}`,
            time: sampleTime,
            sampleIndex,
            position: vectorToTriplet(position),
            sign,
            fieldSpeed,
            metadata: {
              transmitterHistorySchema: ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA,
              motionSource: "solver-derived",
              ownerAssemblyId: assembly.id,
              memberId,
              chargeType,
              binaryId: binary?.id ?? "",
              transmitterScope: "core-architrino",
              sampleIntervalSeconds,
            },
          });
        });
      });
    });
  });

  return {
    schema: ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA,
    timeWindow,
    sampleTimes,
    sampleIntervalSeconds,
    fieldSpeed,
    sampleCount: samples.length,
    samples,
    metadata: {
      source: "solver-owned-field-shell-transmitter-source-history",
      datasetId: normalizeString(simulationDataset?.id ?? descriptor.datasetId, ""),
      assemblyCount: assemblies.length,
      pathCount: paths.length,
    },
  };
}

export function createAnimatorFieldShellCadenceTimes(descriptor = {}) {
  const timeWindow = normalizeTimeWindow(descriptor);
  const intervalSeconds = Math.max(
    MIN_INTERVAL_SECONDS,
    normalizePositiveNumber(
      descriptor.intervalSeconds ?? descriptor.cadence?.intervalSeconds,
      DEFAULT_INTERVAL_SECONDS,
      0
    )
  );
  const maxEvents = Math.max(
    1,
    Math.floor(normalizeNumber(descriptor.maxEvents, Number.POSITIVE_INFINITY))
  );
  const times = [];
  for (let index = 0; index < maxEvents; index += 1) {
    const time = timeWindow.start + intervalSeconds * index;
    if (time > timeWindow.end + 1e-9) {
      break;
    }
    times.push(Number(time.toFixed(9)));
  }
  return times.length ? times : [timeWindow.start];
}

export function createAnimatorFieldShellEventNativeFileStoragePolicy(options = {}) {
  return normalizeStoragePolicy(
    {
      target: "native-file",
      durable: true,
      maxBytes: options.maxBytes ?? 0,
      ...(options.basePath ? { basePath: options.basePath } : {}),
    },
    0
  );
}

export function createAnimatorFieldShellEventStreamPackage(descriptor = {}, options = {}) {
  const timeWindow = normalizeTimeWindow(descriptor.timeWindow ?? descriptor);
  const cadence = {
    schema: ANIMATOR_FIELD_SHELL_CADENCE_DESCRIPTOR_SCHEMA,
    timeWindow,
    intervalSeconds: Math.max(
      MIN_INTERVAL_SECONDS,
      normalizePositiveNumber(
        descriptor.cadence?.intervalSeconds ?? descriptor.intervalSeconds,
        DEFAULT_INTERVAL_SECONDS,
        0
      )
    ),
  };
  cadence.times = createAnimatorFieldShellCadenceTimes(cadence);
  const streamId = normalizeString(
    descriptor.streamId,
    `${normalizeString(descriptor.runId ?? descriptor.datasetId, "animator")}:field-shell-events`
  );
  const fieldSpeed = Math.max(
    MIN_FIELD_SPEED,
    normalizePositiveNumber(descriptor.fieldSpeed ?? options.fieldSpeed, DEFAULT_FIELD_SPEED, 0)
  );
  const lifetimeSeconds = normalizePositiveNumber(
    descriptor.lifetimeSeconds ?? options.lifetimeSeconds,
    DEFAULT_LIFETIME_SECONDS,
    0
  );
  const streamDescriptor = {
    streamId,
    fieldSpeed,
    lifetimeSeconds,
    cadence,
  };
  const transmitterHistory = resolveTransmitterHistory(descriptor, fieldSpeed);
  const transmitterSamples = Array.isArray(descriptor.transmitterSamples)
    ? descriptor.transmitterSamples
    : Array.isArray(transmitterHistory?.samples)
      ? transmitterHistory.samples
      : [];
  const rows = transmitterSamples
    .filter(Boolean)
    .map((sample, index) => normalizeSample(sample, index, fieldSpeed))
    .filter((sample) => sample.time >= timeWindow.start - 1e-9 && sample.time <= timeWindow.end + 1e-9)
    .map((sample, index) =>
      createFieldShellEventRow(sample, index, streamDescriptor, options)
    );
  const byteLength = rows.length * ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES;
  const rowTimes = rows.map((row) => row.emissionTime);
  const timeRange = rows.length
    ? { start: Math.min(...rowTimes), end: Math.max(...rowTimes) }
    : { start: timeWindow.start, end: timeWindow.start };
  const requestedStoragePolicy = normalizeStoragePolicy(descriptor.storagePolicy, byteLength);
  if (requestedStoragePolicy.maxBytes > 0 && byteLength > requestedStoragePolicy.maxBytes) {
    throw new Error("field-shell event stream exceeds storage budget");
  }
  const nativeStorage = requestedStoragePolicy.target === "native-file"
    ? createNativeFieldShellEventStorage({
        streamId,
        rows,
        fallbackTimeRange: timeRange,
        storagePolicy: requestedStoragePolicy,
        rowsPerChunk: descriptor.rowsPerChunk ?? options.rowsPerChunk,
      })
    : null;
  const callerBuffer = nativeStorage ? null : encodeFieldShellEventRowsV1(rows);
  const buffers = nativeStorage
    ? nativeStorage.chunks
    : [
        createBufferDescriptor(
          `${streamId}:field-shell-event-chunk-0`,
          rows.length,
          callerBuffer.byteLength,
          fnv1a64ArrayBufferHex(callerBuffer)
        ),
      ];
  const storagePolicy = nativeStorage ? nativeStorage.storagePolicy : requestedStoragePolicy;
  const stream = createStreamDescriptor({
    streamId,
    rows,
    byteLength: nativeStorage ? nativeStorage.byteLength : byteLength,
    timeRange,
    storagePolicy,
    availableRanges: nativeStorage ? nativeStorage.availableRanges : null,
    metadata: descriptor.metadata && typeof descriptor.metadata === "object" ? descriptor.metadata : {},
  });
  const eventStore = createEventStore(streamId, rows);
  const manifest = createManifest({
    stream,
    rows,
    cadence,
    eventStore,
    byteLength: nativeStorage ? nativeStorage.byteLength : byteLength,
  });
  const nativeFileManifest = nativeStorage
    ? writeNativeFileStreamManifest(
        nativeStorage.storage,
        stream,
        buffers,
        nativeStorage.index,
        manifest
      )
    : null;
  const buffer = {
    bufferId: `${streamId}:field-shell-events`,
    layout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
    byteOffset: 0,
    byteLength: nativeStorage ? nativeStorage.byteLength : byteLength,
    rowCount: rows.length,
    rowSizeBytes: ANIMATOR_FIELD_SHELL_EVENT_ROW_SIZE_BYTES,
    numericType: "f64",
    authority: "solver-owned-event-package",
    storageTarget: storagePolicy.target,
    ...(buffers.length === 1 && buffers[0].checksum ? { checksum: buffers[0].checksum } : {}),
    ...(buffers.length === 1 && buffers[0].filePath ? { filePath: buffers[0].filePath } : {}),
    ...(nativeFileManifest ? { manifestPath: storagePolicy.manifestPath } : {}),
  };

  return {
    schema: ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA,
    rowLayout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
    streamId,
    cadence,
    stream,
    manifest,
    nativeFileManifest,
    transmitterHistory,
    eventStore,
    buffer,
    buffers,
    index: nativeStorage ? nativeStorage.index : null,
    rowCount: rows.length,
    rows,
    fieldShells: rows.map(rowToFieldShell),
    emissionEvents: rows.map(rowToEmissionEvent),
    status: {
      code: "ok",
      severity: "ok",
      message: nativeStorage
        ? "Animator field-shell events packaged as a durable native-file stream"
        : "Animator field-shell events packaged as a solver-owned stream descriptor",
      recoverable: true,
    },
  };
}
