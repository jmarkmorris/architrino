import {
  ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
} from "./AnimatorDelayedHitRecords.mjs";
import {
  ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA,
  createAnimatorFieldShellTransmitterHistory,
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

function resolveTransmitterHistory(descriptor = {}, fallbackFieldSpeed = 1) {
  const transmitterHistory =
    descriptor.receiverTransmitterHistory ??
    descriptor.transmitterHistory ??
    descriptor.transmitterHistory;
  if (
    transmitterHistory?.schema === ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA &&
    Array.isArray(transmitterHistory.samples)
  ) {
    return transmitterHistory;
  }
  return createAnimatorFieldShellTransmitterHistory({
    ...(transmitterHistory && typeof transmitterHistory === "object" ? transmitterHistory : {}),
    documentData: descriptor.documentData ?? transmitterHistory?.documentData,
    simulationDataset: descriptor.simulationDataset ?? transmitterHistory?.simulationDataset,
    sampleTimes: descriptor.sampleTimes ?? transmitterHistory?.sampleTimes,
    timeWindow: descriptor.timeWindow ?? transmitterHistory?.timeWindow,
    fieldSpeed: descriptor.fieldSpeed ?? transmitterHistory?.fieldSpeed ?? fallbackFieldSpeed,
    sampleIntervalSeconds:
      descriptor.sampleIntervalSeconds ??
      transmitterHistory?.sampleIntervalSeconds ??
      descriptor.intervalSeconds ??
      transmitterHistory?.intervalSeconds,
    cadence: descriptor.cadence ?? transmitterHistory?.cadence,
    datasetId: descriptor.datasetId ?? transmitterHistory?.datasetId,
  });
}

function getSampleReceiverId(sample, index) {
  return normalizeString(
    sample.receiverId ?? sample.receiver ?? sample.transmitterId ?? sample.id,
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
    recordLayout: ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
    source: "streamRef",
    samples: [],
    metadata: {
      source: "solver-owned-receiver-path-descriptor",
      transmitterHistorySchema: metadata.transmitterHistorySchema ??
        ANIMATOR_FIELD_SHELL_TRANSMITTER_HISTORY_SCHEMA,
      motionSource: metadata.motionSource ?? "solver-derived",
      ownerAssemblyId: metadata.ownerAssemblyId ?? "",
      memberId: metadata.memberId ?? receiverId,
      chargeType: metadata.chargeType ?? "",
      binaryId: metadata.binaryId ?? "",
      sign: normalizeNumber(sample.sign, 0),
      transmitterScope: metadata.transmitterScope ?? "core-architrino",
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
  const transmitterHistory = resolveTransmitterHistory(descriptor, fallbackFieldSpeed);
  const datasetId = normalizeString(
    descriptor.datasetId ??
      transmitterHistory.metadata?.datasetId ??
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

  (Array.isArray(transmitterHistory.samples) ? transmitterHistory.samples : [])
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
    transmitterHistorySchema: transmitterHistory.schema,
    recordLayout: ANIMATOR_RECEIVER_PATH_DESCRIPTOR_LAYOUT,
    streamId,
    descriptorCount: receiverPathDescriptors.length,
    segmentCount,
    receiverPathDescriptors,
    transmitterHistory,
    metadata: {
      source: "solver-owned-receiver-path-descriptor-package",
      datasetId,
      transmitterSampleCount: transmitterHistory.sampleCount ?? transmitterHistory.samples?.length ?? 0,
    },
    status: {
      code: "ok",
      severity: "ok",
      message: "Animator receiver path descriptors packaged from solver-owned transmitter history",
      recoverable: true,
    },
  };
}
