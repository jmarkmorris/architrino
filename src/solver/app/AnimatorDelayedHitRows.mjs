export const ANIMATOR_DELAYED_HIT_ROWS_SCHEMA = "animator-delayed-hit-rows.v1";
export const ANIMATOR_DELAYED_HIT_ROW_LAYOUT = "delayed_hit_events.v1";

const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_TOLERANCE = 0.001;
const DEFAULT_MAX_ITERATIONS = 64;
const MIN_FIELD_SPEED = 0.000001;
const MIN_HIT_DELAY = 1e-9;
const SMALL_JACOBIAN = 1e-12;

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizePositiveNumber(value, fallback = DEFAULT_FIELD_SPEED, min = 0) {
  const number = normalizeNumber(value, fallback);
  return number > min ? number : fallback;
}

function normalizeNonnegativeNumber(value, fallback = 0) {
  const number = normalizeNumber(value, fallback);
  return number >= 0 ? number : fallback;
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

function vectorSubtract(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function vectorScale(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale,
  };
}

function vectorDot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function vectorNorm(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function unitVector(vector, distance = vectorNorm(vector)) {
  if (!(distance > 0)) {
    return { x: 0, y: 0, z: 0 };
  }
  return vectorScale(vector, 1 / distance);
}

function normalizePathSample(sample = {}) {
  const time = normalizeNumber(sample.time ?? sample.t, 0);
  return {
    time,
    position: normalizeVector(sample.position),
  };
}

function interpolatePathSample(from, to, alpha) {
  const start = normalizePathSample(from);
  const end = normalizePathSample(to);
  return {
    time: start.time + (end.time - start.time) * alpha,
    position: {
      x: start.position.x + (end.position.x - start.position.x) * alpha,
      y: start.position.y + (end.position.y - start.position.y) * alpha,
      z: start.position.z + (end.position.z - start.position.z) * alpha,
    },
  };
}

function segmentVelocity(fromSample, toSample) {
  const from = normalizePathSample(fromSample);
  const to = normalizePathSample(toSample);
  const dt = to.time - from.time;
  if (!(dt > 0)) {
    return { x: 0, y: 0, z: 0 };
  }
  return vectorScale(vectorSubtract(to.position, from.position), 1 / dt);
}

function emissionShellResidual(emissionPosition, sample, fieldSpeed, emissionTime) {
  const normalized = normalizePathSample(sample);
  return (
    vectorNorm(vectorSubtract(normalized.position, emissionPosition)) -
    Math.max(0, fieldSpeed * (normalized.time - emissionTime))
  );
}

function solveEmissionShellPathSegmentHit(
  emissionPosition,
  fromSample,
  toSample,
  fieldSpeed,
  emissionTime,
  options = {}
) {
  const tolerance = normalizeNonnegativeNumber(options.tolerance, DEFAULT_TOLERANCE);
  const maxIterations = Math.max(
    1,
    Math.floor(normalizeNumber(options.maxIterations, DEFAULT_MAX_ITERATIONS))
  );
  let low = {
    sample: normalizePathSample(fromSample),
    residual: emissionShellResidual(emissionPosition, fromSample, fieldSpeed, emissionTime),
  };
  let high = {
    sample: normalizePathSample(toSample),
    residual: emissionShellResidual(emissionPosition, toSample, fieldSpeed, emissionTime),
  };

  if (Math.abs(low.residual) <= tolerance) {
    return { hit: true, sample: low.sample, residual: low.residual, iterations: 0 };
  }
  if (Math.abs(high.residual) <= tolerance) {
    return { hit: true, sample: high.sample, residual: high.residual, iterations: 0 };
  }
  if (low.residual * high.residual > 0) {
    return { hit: false, sample: null, residual: Math.min(Math.abs(low.residual), Math.abs(high.residual)), iterations: 0 };
  }

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const midpoint = interpolatePathSample(low.sample, high.sample, 0.5);
    const midpointResidual = emissionShellResidual(
      emissionPosition,
      midpoint,
      fieldSpeed,
      emissionTime
    );
    if (Math.abs(midpointResidual) <= tolerance) {
      return {
        hit: true,
        sample: midpoint,
        residual: midpointResidual,
        iterations: iteration,
      };
    }
    if (low.residual * midpointResidual <= 0) {
      high = { sample: midpoint, residual: midpointResidual };
    } else {
      low = { sample: midpoint, residual: midpointResidual };
    }
  }

  const midpoint = interpolatePathSample(low.sample, high.sample, 0.5);
  return {
    hit: true,
    sample: midpoint,
    residual: emissionShellResidual(emissionPosition, midpoint, fieldSpeed, emissionTime),
    iterations: maxIterations,
  };
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

function createDelayedHitRow({
  emission,
  emissionIndex,
  receiverTrack,
  receiverId,
  receiverVelocity,
  intersection,
  fieldSpeed,
  emissionTime,
  emissionPosition,
  rowIndex,
  options,
}) {
  const receiverPosition = normalizeVector(intersection.sample.position);
  const displacement = vectorSubtract(receiverPosition, emissionPosition);
  const distance = vectorNorm(displacement);
  const unitDirection = unitVector(displacement, distance);
  const radialReceiverSpeed = vectorDot(receiverVelocity, unitDirection);
  const jacobian = 1 - radialReceiverSpeed / fieldSpeed;
  const strength = Math.abs(jacobian) > SMALL_JACOBIAN ? 1 / Math.abs(jacobian) : 0;
  const displayStrength = distance > 0 ? 1 / (distance * distance) : 0;
  const emitterId = normalizeString(emission?.emitterId ?? emission?.id, "");
  const branchId = `path_history_${idPart(emitterId, "source")}_to_${idPart(receiverId, "receiver")}_${emissionIndex}`;

  return {
    id: `solver_path_hit_${idPart(emitterId, "source")}_to_${idPart(receiverId, "receiver")}_t${timeIdPart(emissionTime)}_${emissionIndex}`,
    eventId: rowIndex,
    rootId: rowIndex,
    statusCode: 0,
    emitterId,
    receiverId,
    branchId,
    emissionTime,
    hitTime: normalizeNumber(intersection.sample.time, emissionTime),
    distance,
    jacobian,
    strength,
    emissionPoint: emissionPosition,
    receiverPoint: receiverPosition,
    unitDirection,
    metadata: {
      source: "solver-owned-emission-shell-path-row",
      rowLayout: ANIMATOR_DELAYED_HIT_ROW_LAYOUT,
      emissionIndex,
      receiverTrackId: receiverId,
      residual: intersection.residual,
      iterationCount: intersection.iterations,
      fieldSpeed,
      radialReceiverSpeed,
      displayStrength,
      ...(emission?.metadata && typeof emission.metadata === "object"
        ? { emissionMetadata: { ...emission.metadata } }
        : {}),
      ...(receiverTrack?.metadata && typeof receiverTrack.metadata === "object"
        ? { receiverMetadata: { ...receiverTrack.metadata } }
        : {}),
      ...(options.metadata && typeof options.metadata === "object" ? options.metadata : {}),
    },
  };
}

export function createAnimatorDelayedHitRowsFromPathSamples(
  emissionSamples = [],
  receiverTracks = [],
  options = {}
) {
  const emissions = Array.isArray(emissionSamples) ? emissionSamples.filter(Boolean) : [];
  const tracks = Array.isArray(receiverTracks) ? receiverTracks.filter(Boolean) : [];
  const allowSelfHits = options.allowSelfHits === true;
  const maxHits = Math.max(0, Math.floor(normalizeNumber(options.maxHits, Infinity)));
  const fallbackFieldSpeed = Math.max(
    MIN_FIELD_SPEED,
    normalizePositiveNumber(options.fieldSpeed, DEFAULT_FIELD_SPEED, 0)
  );
  const tolerance = normalizeNonnegativeNumber(options.tolerance, DEFAULT_TOLERANCE);
  const maxIterations = Math.max(
    1,
    Math.floor(normalizeNumber(options.maxIterations, DEFAULT_MAX_ITERATIONS))
  );
  const rows = [];

  emissions.forEach((emission, emissionIndex) => {
    if (rows.length >= maxHits) {
      return;
    }
    const emitterId = normalizeString(emission?.emitterId ?? emission?.id, "");
    const emissionTime = normalizeNumber(emission?.time ?? emission?.emissionTime, 0);
    const emissionPosition = normalizeVector(emission?.position ?? emission?.emissionPosition);
    const fieldSpeed = Math.max(
      MIN_FIELD_SPEED,
      normalizePositiveNumber(emission?.fieldSpeed, fallbackFieldSpeed, 0)
    );

    tracks.forEach((track) => {
      if (rows.length >= maxHits) {
        return;
      }
      const receiverId = normalizeString(track?.receiverId ?? track?.id, "");
      if (!receiverId || (!allowSelfHits && receiverId === emitterId)) {
        return;
      }
      const samples = Array.isArray(track?.samples)
        ? track.samples
            .filter((sample) => Number(sample?.time ?? sample?.t) >= emissionTime - MIN_HIT_DELAY)
            .map(normalizePathSample)
            .sort((left, right) => left.time - right.time)
        : [];
      if (samples.length < 2) {
        return;
      }

      let previous = samples[0];
      let previousResidual = emissionShellResidual(
        emissionPosition,
        previous,
        fieldSpeed,
        emissionTime
      );
      for (let sampleIndex = 1; sampleIndex < samples.length; sampleIndex += 1) {
        const current = samples[sampleIndex];
        const currentResidual = emissionShellResidual(
          emissionPosition,
          current,
          fieldSpeed,
          emissionTime
        );
        const bracketed =
          Math.abs(currentResidual) <= tolerance ||
          previousResidual * currentResidual <= 0;
        if (!bracketed) {
          previous = current;
          previousResidual = currentResidual;
          continue;
        }

        const intersection = solveEmissionShellPathSegmentHit(
          emissionPosition,
          previous,
          current,
          fieldSpeed,
          emissionTime,
          { tolerance, maxIterations }
        );
        if (!intersection.hit || !intersection.sample) {
          previous = current;
          previousResidual = currentResidual;
          continue;
        }
        const hitTime = normalizeNumber(intersection.sample.time, emissionTime);
        if (hitTime <= emissionTime + MIN_HIT_DELAY) {
          return;
        }

        rows.push(
          createDelayedHitRow({
            emission,
            emissionIndex,
            receiverTrack: track,
            receiverId,
            receiverVelocity: segmentVelocity(previous, current),
            intersection,
            fieldSpeed,
            emissionTime,
            emissionPosition,
            rowIndex: rows.length,
            options,
          })
        );
        return;
      }
    });
  });

  return {
    schema: ANIMATOR_DELAYED_HIT_ROWS_SCHEMA,
    rowLayout: ANIMATOR_DELAYED_HIT_ROW_LAYOUT,
    rowCount: rows.length,
    rows,
    status: {
      code: "ok",
      severity: "ok",
      message: "Animator delayed-hit rows computed by solver-owned path geometry",
      recoverable: true,
    },
  };
}
