import {
  ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
} from "./AnimatorDelayedHitRows.mjs";
import {
  ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA,
  createAnimatorFieldShellEmitterSourceHistory,
} from "./AnimatorFieldShellEventStream.mjs";

export const ANIMATOR_RECEIVER_PATH_DESCRIPTOR_PACKAGE_SCHEMA =
  "animator-receiver-path-descriptor-package.v1";

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
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

function normalizePositiveNumber(value, fallback, min = 0) {
  const number = normalizeNumber(value, fallback);
  return number > min ? number : fallback;
}

function resolveSourceHistory(descriptor = {}, fallbackFieldSpeed = 1) {
  const sourceHistory =
    descriptor.receiverSourceHistory ??
    descriptor.emitterSourceHistory ??
    descriptor.sourceHistory;
  if (
    sourceHistory?.schema === ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA &&
    Array.isArray(sourceHistory.samples)
  ) {
    return sourceHistory;
  }
  return createAnimatorFieldShellEmitterSourceHistory({
    ...(sourceHistory && typeof sourceHistory === "object" ? sourceHistory : {}),
    documentData: descriptor.documentData ?? sourceHistory?.documentData,
    simulationDataset: descriptor.simulationDataset ?? sourceHistory?.simulationDataset,
    sampleTimes: descriptor.sampleTimes ?? sourceHistory?.sampleTimes,
    timeWindow: descriptor.timeWindow ?? sourceHistory?.timeWindow,
    fieldSpeed: descriptor.fieldSpeed ?? sourceHistory?.fieldSpeed ?? fallbackFieldSpeed,
    sampleIntervalSeconds:
      descriptor.sampleIntervalSeconds ??
      sourceHistory?.sampleIntervalSeconds ??
      descriptor.intervalSeconds ??
      sourceHistory?.intervalSeconds,
    cadence: descriptor.cadence ?? sourceHistory?.cadence,
    datasetId: descriptor.datasetId ?? sourceHistory?.datasetId,
  });
}

function getSampleReceiverId(sample, index) {
  return normalizeString(
    sample.receiverId ?? sample.receiver ?? sample.emitterId ?? sample.id,
    `receiver_${index + 1}`
  );
}

function createDescriptorState(sample, receiverId, pathKey, streamId) {
  const metadata = sample.metadata && typeof sample.metadata === "object" ? sample.metadata : {};
  return {
    id: receiverId,
    pathId: receiverId,
    receiverId,
    pathKey,
    streamId,
    rowLayout: ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
    source: "streamRef",
    samples: [],
    metadata: {
      source: "solver-owned-receiver-path-descriptor",
      sourceHistorySchema: metadata.sourceHistorySchema ??
        ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA,
      motionSource: metadata.motionSource ?? "solver-derived",
      ownerAssemblyId: metadata.ownerAssemblyId ?? "",
      memberId: metadata.memberId ?? receiverId,
      chargeType: metadata.chargeType ?? "",
      binaryId: metadata.binaryId ?? "",
      sign: normalizeNumber(sample.sign, 0),
      emitterScope: metadata.emitterScope ?? "core-architrino",
      streamSource: "animator-architrino-path-history",
    },
  };
}

function sampleToPoint(sample) {
  return {
    time: normalizeNumber(sample.time ?? sample.emissionTime, 0),
    position: normalizeVector(sample.position ?? sample.emissionPosition),
  };
}

function createPathSegments(samples, pathKey) {
  const sortedSamples = [...samples].sort((left, right) => left.time - right.time);
  const segments = [];
  for (let index = 1; index < sortedSamples.length; index += 1) {
    const previous = sortedSamples[index - 1];
    const current = sortedSamples[index];
    if (!(current.time > previous.time)) {
      continue;
    }
    const dt = current.time - previous.time;
    segments.push({
      pathKey,
      segmentIndex: segments.length,
      startTime: previous.time,
      endTime: current.time,
      start: { ...previous.position },
      velocity: {
        x: (current.position.x - previous.position.x) / dt,
        y: (current.position.y - previous.position.y) / dt,
        z: (current.position.z - previous.position.z) / dt,
      },
      errorBound: 0,
      stateFlags: 0,
    });
  }
  return segments;
}

export function createAnimatorReceiverPathDescriptorPackage(descriptor = {}, options = {}) {
  const fallbackFieldSpeed = normalizePositiveNumber(
    descriptor.fieldSpeed ?? options.fieldSpeed,
    1,
    0
  );
  const sourceHistory = resolveSourceHistory(descriptor, fallbackFieldSpeed);
  const datasetId = normalizeString(
    descriptor.datasetId ??
      sourceHistory.metadata?.datasetId ??
      descriptor.simulationDataset?.id,
    "animator"
  );
  const streamId = normalizeString(
    descriptor.streamId ?? descriptor.pathHistoryStreamId,
    `${datasetId}:architrino-path-history`
  );
  const pathKeyStart = Math.max(
    1,
    Math.floor(normalizeNumber(descriptor.pathKeyStart ?? options.pathKeyStart, 1))
  );
  const descriptorByReceiverId = new Map();

  (Array.isArray(sourceHistory.samples) ? sourceHistory.samples : [])
    .filter(Boolean)
    .forEach((sample, sampleIndex) => {
      const receiverId = getSampleReceiverId(sample, sampleIndex);
      if (!descriptorByReceiverId.has(receiverId)) {
        descriptorByReceiverId.set(
          receiverId,
          createDescriptorState(
            sample,
            receiverId,
            pathKeyStart + descriptorByReceiverId.size,
            streamId
          )
        );
      }
      descriptorByReceiverId.get(receiverId).samples.push(sampleToPoint(sample));
    });

  const receiverPathDescriptors = [...descriptorByReceiverId.values()]
    .map((state) => {
      const segments = createPathSegments(state.samples, state.pathKey);
      const { samples: _samples, ...descriptorState } = state;
      return {
        ...descriptorState,
        segments,
      };
    })
    .filter((receiverDescriptor) => receiverDescriptor.segments.length > 0);

  const segmentCount = receiverPathDescriptors.reduce(
    (total, receiverDescriptor) => total + receiverDescriptor.segments.length,
    0
  );

  return {
    schema: ANIMATOR_RECEIVER_PATH_DESCRIPTOR_PACKAGE_SCHEMA,
    sourceHistorySchema: sourceHistory.schema,
    rowLayout: ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
    streamId,
    descriptorCount: receiverPathDescriptors.length,
    segmentCount,
    receiverPathDescriptors,
    sourceHistory,
    metadata: {
      source: "solver-owned-receiver-path-descriptor-package",
      datasetId,
      sourceSampleCount: sourceHistory.sampleCount ?? sourceHistory.samples?.length ?? 0,
    },
    status: {
      code: "ok",
      severity: "ok",
      message: "Animator receiver path descriptors packaged from solver-owned transmitter history",
      recoverable: true,
    },
  };
}
