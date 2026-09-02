export const ASSEMBLY_VIEW_RECORD_FRAME_SCHEMA = "assembly-view-record-frame.v1";
export const ASSEMBLY_VIEW_VECTOR_OVERLAYS_SCHEMA = "assembly-view-vector-overlays.v1";
export const ASSEMBLY_VIEW_COLLECTION_SCHEMA = "assembly-view-collection.v1";

const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const ASSEMBLY_ID_PATTERN = /^asm-[a-f0-9]{32}$/;

export function createNormalizedAssemblyViewRecordCarriers({
  fieldSpeed = 1,
  vectors = [],
} = {}) {
  return Object.freeze({
    frame: Object.freeze({
      schema: ASSEMBLY_VIEW_RECORD_FRAME_SCHEMA,
      frameId: "euclidean-void-absolute-time.normalized-cf1.v1",
      timeUnit: "normalized-absolute-time",
      lengthUnit: "normalized-coupling-length",
      fieldSpeed,
      toComparison: Object.freeze({
        timeScale: 1,
        timeOffset: 0,
        lengthScale: 1,
      }),
    }),
    vectorOverlays: Object.freeze({
      schema: ASSEMBLY_VIEW_VECTOR_OVERLAYS_SCHEMA,
      vectors: Object.freeze(vectors.map((row) => Object.freeze(structuredClone(row)))),
    }),
  });
}

export function validateAssemblyViewRecordCarriers(record, { required = false } = {}) {
  if (record?.recordFrame == null || record?.vectorOverlays == null) {
    if (required) {
      throw new TypeError(
        "assembly-view-record.v0 requires recordFrame and vectorOverlays carriers for comparison-capable replay.",
      );
    }
    return Object.freeze({
      available: false,
      frame: null,
      vectorOverlays: Object.freeze([]),
      reason: "The sealed record predates assembly-view-record-frame.v1 carriers.",
    });
  }
  const frame = validateFrame(record.recordFrame);
  const vectorOverlays = validateVectorOverlays(record.vectorOverlays, record.worldlines ?? []);
  return Object.freeze({
    available: true,
    frame,
    vectorOverlays,
    reason: null,
  });
}

export function assessAssemblyViewRecordFrameCompatibility(left, right) {
  const leftCarriers = left?.recordCarriers ?? validateAssemblyViewRecordCarriers(left?.rawRecord ?? left ?? {});
  const rightCarriers = right?.recordCarriers ?? validateAssemblyViewRecordCarriers(right?.rawRecord ?? right ?? {});
  if (!leftCarriers.available || !rightCarriers.available) {
    return Object.freeze({
      compatible: false,
      code: "missing-ratified-comparison-transforms",
      leftAvailable: leftCarriers.available,
      rightAvailable: rightCarriers.available,
    });
  }
  const leftFrame = leftCarriers.frame;
  const rightFrame = rightCarriers.frame;
  if (leftFrame.frameId !== rightFrame.frameId) {
    return Object.freeze({
      compatible: false,
      code: "comparison-frame-mismatch",
      leftFrameId: leftFrame.frameId,
      rightFrameId: rightFrame.frameId,
    });
  }
  const leftCanonicalFieldSpeed = canonicalFieldSpeed(leftFrame);
  const rightCanonicalFieldSpeed = canonicalFieldSpeed(rightFrame);
  const tolerance = 1e-12 * Math.max(1, Math.abs(leftCanonicalFieldSpeed), Math.abs(rightCanonicalFieldSpeed));
  if (Math.abs(leftCanonicalFieldSpeed - rightCanonicalFieldSpeed) > tolerance) {
    return Object.freeze({
      compatible: false,
      code: "comparison-field-speed-mismatch",
      leftCanonicalFieldSpeed,
      rightCanonicalFieldSpeed,
    });
  }
  return Object.freeze({
    compatible: true,
    code: "declared-comparison-transform-compatible",
    frameId: leftFrame.frameId,
    canonicalFieldSpeed: leftCanonicalFieldSpeed,
    leftTransform: leftFrame.toComparison,
    rightTransform: rightFrame.toComparison,
  });
}

export function validateAssemblyViewCollectionManifest(manifest) {
  if (manifest?.schema !== ASSEMBLY_VIEW_COLLECTION_SCHEMA) {
    throw new TypeError(`assembly-view collection requires schema ${ASSEMBLY_VIEW_COLLECTION_SCHEMA}.`);
  }
  concreteString(manifest.collectionId, "collectionId");
  concreteString(manifest.title, "title");
  if (!Array.isArray(manifest.records) || manifest.records.length === 0) {
    throw new TypeError("assembly-view collection requires a nonempty records array.");
  }
  const sourceIds = new Set();
  const rows = manifest.records.map((row, sourceIndex) => {
    const sourceId = concreteString(row?.sourceId, `records[${sourceIndex}].sourceId`);
    if (sourceIds.has(sourceId)) {
      throw new TypeError(`assembly-view collection sourceId ${sourceId} is duplicated.`);
    }
    sourceIds.add(sourceId);
    if (!ASSEMBLY_ID_PATTERN.test(row?.assemblyId ?? "")) {
      throw new TypeError(`assembly-view collection records[${sourceIndex}].assemblyId is invalid.`);
    }
    for (const field of ["modelRevisionSha256", "recordSha256"]) {
      if (!SHA256_PATTERN.test(row?.[field] ?? "")) {
        throw new TypeError(`assembly-view collection records[${sourceIndex}].${field} is invalid.`);
      }
    }
    const recordUrl = concreteString(row?.recordUrl, `records[${sourceIndex}].recordUrl`);
    return Object.freeze({
      sourceIndex,
      sourceId,
      assemblyId: row.assemblyId,
      modelRevisionSha256: row.modelRevisionSha256,
      recordSha256: row.recordSha256,
      recordUrl,
    });
  });
  return Object.freeze({
    schema: ASSEMBLY_VIEW_COLLECTION_SCHEMA,
    collectionId: manifest.collectionId,
    title: manifest.title,
    authorityBoundary: manifest.authorityBoundary ?? null,
    records: Object.freeze(rows),
  });
}

function validateFrame(frame) {
  if (frame?.schema !== ASSEMBLY_VIEW_RECORD_FRAME_SCHEMA) {
    throw new TypeError(`recordFrame requires schema ${ASSEMBLY_VIEW_RECORD_FRAME_SCHEMA}.`);
  }
  const frameId = concreteString(frame.frameId, "recordFrame.frameId");
  const timeUnit = concreteString(frame.timeUnit, "recordFrame.timeUnit");
  const lengthUnit = concreteString(frame.lengthUnit, "recordFrame.lengthUnit");
  const fieldSpeed = positive(frame.fieldSpeed, "recordFrame.fieldSpeed");
  const timeScale = positive(frame.toComparison?.timeScale, "recordFrame.toComparison.timeScale");
  const timeOffset = finite(frame.toComparison?.timeOffset, "recordFrame.toComparison.timeOffset");
  const lengthScale = positive(frame.toComparison?.lengthScale, "recordFrame.toComparison.lengthScale");
  return Object.freeze({
    schema: ASSEMBLY_VIEW_RECORD_FRAME_SCHEMA,
    frameId,
    timeUnit,
    lengthUnit,
    fieldSpeed,
    toComparison: Object.freeze({ timeScale, timeOffset, lengthScale }),
  });
}

function validateVectorOverlays(carrier, worldlines) {
  if (carrier?.schema !== ASSEMBLY_VIEW_VECTOR_OVERLAYS_SCHEMA) {
    throw new TypeError(`vectorOverlays requires schema ${ASSEMBLY_VIEW_VECTOR_OVERLAYS_SCHEMA}.`);
  }
  if (!Array.isArray(carrier.vectors)) {
    throw new TypeError("vectorOverlays.vectors must be an array.");
  }
  const worldlineIds = new Set(worldlines.map((row) => String(row.id ?? row.pathId)));
  const ids = new Set();
  return Object.freeze(carrier.vectors.map((row, index) => {
    const id = concreteString(row?.id, `vectorOverlays.vectors[${index}].id`);
    if (ids.has(id)) throw new TypeError(`vector overlay id ${id} is duplicated.`);
    ids.add(id);
    if (!["kinematic-spin", "polarity-dipole"].includes(row.kind)) {
      throw new TypeError(`vector overlay ${id} has unsupported kind ${String(row.kind)}.`);
    }
    const members = Array.isArray(row.worldlineIds) ? row.worldlineIds.map(String) : [];
    if (members.length === 0 || members.some((member) => !worldlineIds.has(member))) {
      throw new TypeError(`vector overlay ${id} must reference declared worldlines.`);
    }
    const vector = vector3(row.vector, `vectorOverlays.vectors[${index}].vector`);
    const source = concreteString(row.source, `vectorOverlays.vectors[${index}].source`);
    return Object.freeze({ id, kind: row.kind, worldlineIds: Object.freeze(members), vector, source });
  }));
}

function canonicalFieldSpeed(frame) {
  return frame.fieldSpeed * frame.toComparison.lengthScale / frame.toComparison.timeScale;
}

function vector3(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object vector.`);
  }
  return Object.freeze({
    x: finite(value.x, `${label}.x`),
    y: finite(value.y, `${label}.y`),
    z: finite(value.z, `${label}.z`),
  });
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0 || value === "unspecified") {
    throw new TypeError(`${label} must be concrete.`);
  }
  return value;
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positive(value, label) {
  const number = finite(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}
