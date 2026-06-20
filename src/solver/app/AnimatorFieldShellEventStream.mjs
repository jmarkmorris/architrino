export const ANIMATOR_FIELD_SHELL_EVENT_STREAM_PACKAGE_SCHEMA =
  "animator-field-shell-event-stream-package.v1";
export const ANIMATOR_FIELD_SHELL_CADENCE_DESCRIPTOR_SCHEMA =
  "animator-field-shell-cadence-descriptor.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT = "field_shell_events.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_STORE_SCHEMA = "path_event_store.v1";
export const ANIMATOR_FIELD_SHELL_EVENT_MANIFEST_SCHEMA =
  "animator-field-shell-event-stream-manifest.v1";
export const ANIMATOR_FIELD_SHELL_EMITTER_SOURCE_HISTORY_SCHEMA =
  "animator-field-shell-emitter-source-history.v1";
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
  const emitterId = normalizeString(
    sample.emitterId ?? sample.emitter ?? sample.id,
    `emitter_${index + 1}`
  );
  const metadata = sample.metadata && typeof sample.metadata === "object" ? sample.metadata : {};
  return {
    id: normalizeString(sample.id, emitterId),
    emitterId,
    receiverId: normalizeString(sample.receiverId ?? sample.receiver, emitterId),
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
  const id = `field_shell_event_${idPart(sample.emitterId, "emitter")}_t${timeIdPart(sample.time)}_${rowIndex}`;

  return {
    id,
    eventId: rowIndex,
    rowLayout: ANIMATOR_FIELD_SHELL_EVENT_ROW_LAYOUT,
    eventClass: "field_shell_emitted",
    streamId: descriptor.streamId,
    emitterId: sample.emitterId,
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
      affectedIds: [row.emitterId],
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
      emitterCount: new Set(rows.map((row) => row.emitterId)).size,
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
    view.setBigUint64(offset + 88, fnv1a64StringBigInt(row.emitterId), true);
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
    id: `architrino_shell_${row.emitterId}_${row.cadenceIndex}`,
    emitterId: row.emitterId,
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
    emitterId: row.emitterId,
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
  const rows = (Array.isArray(descriptor.emitterSamples) ? descriptor.emitterSamples : [])
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
