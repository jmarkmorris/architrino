export const ANIMATOR_DELAYED_HIT_ROWS_SCHEMA = "animator-delayed-hit-rows.v1";
export const ANIMATOR_DELAYED_HIT_STREAM_DESCRIPTOR_SCHEMA =
  "animator-delayed-hit-stream-descriptors.v1";
export const ANIMATOR_DELAYED_HIT_ROW_LAYOUT = "delayed_hit_events.v1";
export const ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT = "path_segment.v1";

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

function pointAtPathSegmentTime(segment, time) {
  const dt = time - segment.startTime;
  return {
    x: segment.start.x + segment.velocity.x * dt,
    y: segment.start.y + segment.velocity.y * dt,
    z: segment.start.z + segment.velocity.z * dt,
  };
}

function samplePathSegment(segment, time) {
  return {
    time,
    position: pointAtPathSegmentTime(segment, time),
  };
}

function emissionShellResidualAtTime(emissionPosition, segment, time, fieldSpeed, emissionTime) {
  return (
    vectorNorm(vectorSubtract(pointAtPathSegmentTime(segment, time), emissionPosition)) -
    Math.max(0, fieldSpeed * (time - emissionTime))
  );
}

function solveEmissionShellPathSegmentHit(
  emissionPosition,
  segment,
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
    time: Math.max(segment.startTime, emissionTime),
    residual: 0,
  };
  let high = {
    time: segment.endTime,
    residual: 0,
  };
  if (high.time <= low.time + MIN_HIT_DELAY) {
    return { hit: false, sample: null, residual: 0, iterations: 0 };
  }
  low.residual = emissionShellResidualAtTime(
    emissionPosition,
    segment,
    low.time,
    fieldSpeed,
    emissionTime
  );
  high.residual = emissionShellResidualAtTime(
    emissionPosition,
    segment,
    high.time,
    fieldSpeed,
    emissionTime
  );

  if (Math.abs(low.residual) <= tolerance) {
    return {
      hit: true,
      sample: samplePathSegment(segment, low.time),
      residual: low.residual,
      iterations: 0,
      segment,
    };
  }
  if (Math.abs(high.residual) <= tolerance) {
    return {
      hit: true,
      sample: samplePathSegment(segment, high.time),
      residual: high.residual,
      iterations: 0,
      segment,
    };
  }
  if (low.residual * high.residual > 0) {
    return {
      hit: false,
      sample: null,
      residual: Math.min(Math.abs(low.residual), Math.abs(high.residual)),
      iterations: 0,
      segment,
    };
  }

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const midpointTime = (low.time + high.time) / 2;
    const midpointResidual = emissionShellResidualAtTime(
      emissionPosition,
      segment,
      midpointTime,
      fieldSpeed,
      emissionTime
    );
    if (Math.abs(midpointResidual) <= tolerance) {
      return {
        hit: true,
        sample: samplePathSegment(segment, midpointTime),
        residual: midpointResidual,
        iterations: iteration,
        segment,
      };
    }
    if (low.residual * midpointResidual <= 0) {
      high = { time: midpointTime, residual: midpointResidual };
    } else {
      low = { time: midpointTime, residual: midpointResidual };
    }
  }

  const midpointTime = (low.time + high.time) / 2;
  return {
    hit: true,
    sample: samplePathSegment(segment, midpointTime),
    residual: emissionShellResidualAtTime(
      emissionPosition,
      segment,
      midpointTime,
      fieldSpeed,
      emissionTime
    ),
    iterations: maxIterations,
    segment,
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

function normalizeEmissionEvent(event = {}, index = 0, fallbackFieldSpeed = DEFAULT_FIELD_SPEED) {
  const metadata = event.metadata && typeof event.metadata === "object" ? event.metadata : {};
  return {
    id: normalizeString(event.id, `emission_${index + 1}`),
    emitterId: normalizeString(event.emitterId ?? event.emitter ?? event.pathId, ""),
    emissionTime: normalizeNumber(event.emissionTime ?? event.time ?? event.tEmit, 0),
    emissionPoint: normalizeVector(
      event.emissionPoint ?? event.position ?? event.emissionPosition
    ),
    fieldSpeed: Math.max(
      MIN_FIELD_SPEED,
      normalizePositiveNumber(event.fieldSpeed, fallbackFieldSpeed, 0)
    ),
    metadata,
  };
}

function normalizePathSegmentDescriptor(segment = {}, index = 0, fallbackPathKey = index) {
  const startTime = normalizeNumber(segment.startTime, normalizeNumber(segment.timeStart, 0));
  const endTime = normalizeNumber(segment.endTime, normalizeNumber(segment.timeEnd, startTime));
  return {
    pathKey: normalizeNumber(segment.pathKey, fallbackPathKey),
    segmentIndex: normalizeNumber(segment.segmentIndex, index),
    startTime,
    endTime: endTime > startTime ? endTime : startTime,
    start: normalizeVector(segment.start ?? segment.positionAtStart ?? segment.position),
    velocity: normalizeVector(segment.velocity),
    errorBound: normalizeNonnegativeNumber(segment.errorBound, 0),
    stateFlags: normalizeNumber(segment.stateFlags, 0),
  };
}

function normalizeReceiverPathDescriptor(descriptor = {}, index = 0) {
  const receiverId = normalizeString(descriptor.receiverId ?? descriptor.id, `receiver_${index + 1}`);
  const pathKey = normalizeNumber(descriptor.pathKey, index + 1);
  const segments = (Array.isArray(descriptor.segments)
    ? descriptor.segments
    : Array.isArray(descriptor.pathRows)
      ? descriptor.pathRows
      : [])
    .map((segment, segmentIndex) =>
      normalizePathSegmentDescriptor(segment, segmentIndex, pathKey)
    )
    .filter((segment) => segment.endTime > segment.startTime)
    .sort((left, right) => left.startTime - right.startTime || left.segmentIndex - right.segmentIndex);
  const metadata = descriptor.metadata && typeof descriptor.metadata === "object"
    ? descriptor.metadata
    : {};
  return {
    id: normalizeString(descriptor.id, receiverId),
    receiverId,
    pathId: normalizeString(descriptor.pathId, receiverId),
    pathKey,
    streamId: normalizeString(descriptor.streamId, ""),
    layout: normalizeString(descriptor.layout ?? descriptor.rowLayout, ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT),
    source: normalizeString(descriptor.source, "streamRef"),
    segments,
    metadata,
  };
}

function createDelayedHitRow({
  emission,
  emissionIndex,
  receiverDescriptor,
  intersection,
  rowIndex,
  options,
}) {
  const receiverPosition = normalizeVector(intersection.sample.position);
  const emissionPosition = emission.emissionPoint;
  const displacement = vectorSubtract(receiverPosition, emissionPosition);
  const distance = vectorNorm(displacement);
  const unitDirection = unitVector(displacement, distance);
  const receiverRadialSpeedAtReception = vectorDot(intersection.segment.velocity, unitDirection);
  const transmitterRadialSpeedAtEmission = 0;
  const transmitterFactor = emission.fieldSpeed - transmitterRadialSpeedAtEmission;
  const receiverFactor = emission.fieldSpeed - receiverRadialSpeedAtReception;
  const receiverCrossingRatio = receiverFactor / emission.fieldSpeed;
  const rootPlayback = receiverFactor / transmitterFactor;
  const accelerationWeight = emission.fieldSpeed / Math.abs(transmitterFactor);
  const jacobian = transmitterFactor;
  const strength = Number.isFinite(accelerationWeight) && Math.abs(transmitterFactor) > SMALL_JACOBIAN
    ? accelerationWeight
    : 0;
  const displayStrength = distance > 0 ? 1 / (distance * distance) : 0;
  const emitterId = emission.emitterId;
  const receiverId = receiverDescriptor.receiverId;
  const branchId = `path_history_${idPart(emitterId, "source")}_to_${idPart(receiverId, "receiver")}_${emissionIndex}`;

  return {
    id: `solver_path_hit_${idPart(emitterId, "source")}_to_${idPart(receiverId, "receiver")}_t${timeIdPart(emission.emissionTime)}_${emissionIndex}`,
    eventId: rowIndex,
    rootId: rowIndex,
    statusCode: 0,
    emitterId,
    receiverId,
    branchId,
    emissionTime: emission.emissionTime,
    hitTime: normalizeNumber(intersection.sample.time, emission.emissionTime),
    distance,
    jacobian,
    strength,
    transmitterRadialSpeedAtEmission,
    receiverRadialSpeedAtReception,
    transmitterFactor,
    receiverFactor,
    receiverCrossingRatio,
    rootPlayback,
    accelerationWeight,
    causalFactorStatusCode: Number.isFinite(rootPlayback) ? 0 : 25,
    emissionPoint: emissionPosition,
    receiverPoint: receiverPosition,
    unitDirection,
    metadata: {
      source: "solver-owned-stream-descriptor-row",
      rowLayout: ANIMATOR_DELAYED_HIT_ROW_LAYOUT,
      descriptorSchema: ANIMATOR_DELAYED_HIT_STREAM_DESCRIPTOR_SCHEMA,
      emissionIndex,
      receiverPathId: receiverDescriptor.pathId,
      receiverPathKey: receiverDescriptor.pathKey,
      receiverStreamId: receiverDescriptor.streamId,
      receiverRowLayout: receiverDescriptor.layout,
      segmentIndex: intersection.segment.segmentIndex,
      residual: intersection.residual,
      iterationCount: intersection.iterations,
      fieldSpeed: emission.fieldSpeed,
      receiverRadialSpeedAtReception,
      displayStrength,
      ...(emission.metadata && typeof emission.metadata === "object"
        ? { emissionMetadata: { ...emission.metadata } }
        : {}),
      ...(receiverDescriptor.metadata && typeof receiverDescriptor.metadata === "object"
        ? { receiverMetadata: { ...receiverDescriptor.metadata } }
        : {}),
      ...(options.metadata && typeof options.metadata === "object" ? options.metadata : {}),
    },
  };
}

export function createAnimatorDelayedHitRowsFromStreamDescriptors(descriptor = {}, options = {}) {
  const fallbackFieldSpeed = Math.max(
    MIN_FIELD_SPEED,
    normalizePositiveNumber(
      descriptor.fieldSpeed ?? options.fieldSpeed,
      DEFAULT_FIELD_SPEED,
      0
    )
  );
  const emissionEvents = (Array.isArray(descriptor.emissionEvents)
    ? descriptor.emissionEvents
    : [])
    .filter(Boolean)
    .map((event, index) => normalizeEmissionEvent(event, index, fallbackFieldSpeed));
  const receiverPathDescriptors = (Array.isArray(descriptor.receiverPathDescriptors)
    ? descriptor.receiverPathDescriptors
    : Array.isArray(descriptor.receiverPaths)
      ? descriptor.receiverPaths
      : [])
    .filter(Boolean)
    .map(normalizeReceiverPathDescriptor);
  const allowSelfHits = options.allowSelfHits === true || descriptor.allowSelfHits === true;
  const maxHits = Math.max(
    0,
    Math.floor(normalizeNumber(options.maxHits ?? descriptor.maxHits, Infinity))
  );
  const tolerance = normalizeNonnegativeNumber(
    options.tolerance ?? descriptor.tolerance,
    DEFAULT_TOLERANCE
  );
  const maxIterations = Math.max(
    1,
    Math.floor(normalizeNumber(options.maxIterations ?? descriptor.maxIterations, DEFAULT_MAX_ITERATIONS))
  );
  const rows = [];

  emissionEvents.forEach((emission, emissionIndex) => {
    if (rows.length >= maxHits) {
      return;
    }
    receiverPathDescriptors.forEach((receiverDescriptor) => {
      if (rows.length >= maxHits) {
        return;
      }
      if (!allowSelfHits && receiverDescriptor.receiverId === emission.emitterId) {
        return;
      }
      const segments = receiverDescriptor.segments.filter(
        (segment) => segment.endTime >= emission.emissionTime - MIN_HIT_DELAY
      );
      for (const segment of segments) {
        const intersection = solveEmissionShellPathSegmentHit(
          emission.emissionPoint,
          segment,
          emission.fieldSpeed,
          emission.emissionTime,
          { tolerance, maxIterations }
        );
        if (!intersection.hit || !intersection.sample) {
          continue;
        }
        const hitTime = normalizeNumber(intersection.sample.time, emission.emissionTime);
        if (hitTime <= emission.emissionTime + MIN_HIT_DELAY) {
          continue;
        }
        rows.push(
          createDelayedHitRow({
            emission,
            emissionIndex,
            receiverDescriptor,
            intersection,
            rowIndex: rows.length,
            options,
          })
        );
        break;
      }
    });
  });

  return {
    schema: ANIMATOR_DELAYED_HIT_ROWS_SCHEMA,
    descriptorSchema: ANIMATOR_DELAYED_HIT_STREAM_DESCRIPTOR_SCHEMA,
    rowLayout: ANIMATOR_DELAYED_HIT_ROW_LAYOUT,
    receiverRowLayout: ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
    streamId: normalizeString(descriptor.streamId, ""),
    emissionEventCount: emissionEvents.length,
    receiverPathDescriptorCount: receiverPathDescriptors.length,
    receiverSegmentCount: receiverPathDescriptors.reduce(
      (total, receiver) => total + receiver.segments.length,
      0
    ),
    rowCount: rows.length,
    rows,
    status: {
      code: "ok",
      severity: "ok",
      message: "Animator delayed-hit rows computed from stream-backed solver descriptors",
      recoverable: true,
    },
  };
}
