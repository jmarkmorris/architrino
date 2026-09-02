export const BORG_PRESCRIBED_DISPLAY_FRAME_FIXED = "fixed";
export const BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING = "co-translating";

const DISPLAY_FRAMES = new Set([
  BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
  BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
]);

/**
 * Resolve the source-carried common translation used only by Borg's display.
 *
 * The prescribed braid emitter defines centerAtEpoch at absolute T=0 and
 * writes every retained segment in the fixed frame. This adapter never
 * estimates motion from samples and never mutates the sealed record.
 */
export function resolveBorgPrescribedTranslation(entry) {
  const recordId = String(entry?.sourceId ?? entry?.rawRecord?.sourceId ?? "");
  const provenance = entry?.dataset?.provenance;
  if (provenance?.engineId !== "prescribed-geometry") {
    return unavailable(
      recordId,
      "not-prescribed-geometry",
      "The selected record is not a prescribed-geometry record.",
    );
  }
  const assemblyPlacement = provenance.prescribedGeometry?.coordinates?.geometry
    ?.assemblyPlacement;
  if (!assemblyPlacement || typeof assemblyPlacement !== "object" ||
      Array.isArray(assemblyPlacement)) {
    return unavailable(
      recordId,
      "missing-assembly-placement",
      "Missing carrier: provenance.prescribedGeometry.coordinates.geometry.assemblyPlacement.",
    );
  }
  const centerAtEpoch = readVectorArray(assemblyPlacement.centerAtEpoch);
  if (!centerAtEpoch) {
    return unavailable(
      recordId,
      "missing-assembly-placement-center-at-epoch",
      "Missing carrier: provenance.prescribedGeometry.coordinates.geometry.assemblyPlacement.centerAtEpoch.",
    );
  }
  const velocity = readVectorArray(assemblyPlacement.velocity);
  if (!velocity) {
    return unavailable(
      recordId,
      "missing-assembly-placement-velocity",
      "Missing carrier: provenance.prescribedGeometry.coordinates.geometry.assemblyPlacement.velocity.",
    );
  }
  const speed = Math.hypot(velocity.x, velocity.y, velocity.z);
  return Object.freeze({
    available: true,
    recordId,
    epochTime: 0,
    centerAtEpoch: Object.freeze(centerAtEpoch),
    velocity: Object.freeze(velocity),
    speed,
    stationary: speed === 0,
    source:
      "provenance.prescribedGeometry.coordinates.geometry.assemblyPlacement.centerAtEpoch/velocity",
    message: speed === 0
      ? "The source carries a zero common translation; fixed and co-translating views coincide."
      : "The co-translating view subtracts only the source-carried common translation.",
  });
}

export function assertBorgPrescribedDisplayFrame(frame) {
  if (!DISPLAY_FRAMES.has(frame)) {
    throw new TypeError(
      `Borg prescribed display frame must be ${[...DISPLAY_FRAMES].join(" or ")}.`,
    );
  }
  return frame;
}

export function applyBorgPrescribedDisplayFrame(
  position,
  time,
  translation,
  frame = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
) {
  const displayFrame = assertBorgPrescribedDisplayFrame(frame);
  const source = finiteVector(position, "prescribed display position");
  const absoluteTime = finiteNumber(time, "prescribed display time");
  if (displayFrame === BORG_PRESCRIBED_DISPLAY_FRAME_FIXED) {
    return source;
  }
  if (!translation?.available) {
    throw new TypeError(
      translation?.message ??
      "Co-translating display requires a source-carried common translation.",
    );
  }
  const elapsed = absoluteTime - translation.epochTime;
  return Object.freeze({
    x: source.x - translation.velocity.x * elapsed,
    y: source.y - translation.velocity.y * elapsed,
    z: source.z - translation.velocity.z * elapsed,
  });
}

export function applyBorgPrescribedVelocityFrame(
  velocity,
  translation,
  frame = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
) {
  const displayFrame = assertBorgPrescribedDisplayFrame(frame);
  const source = finiteVector(velocity, "prescribed display velocity");
  if (displayFrame === BORG_PRESCRIBED_DISPLAY_FRAME_FIXED) {
    return source;
  }
  if (!translation?.available) {
    throw new TypeError(
      translation?.message ??
      "Co-translating display requires a source-carried common translation.",
    );
  }
  return Object.freeze({
    x: source.x - translation.velocity.x,
    y: source.y - translation.velocity.y,
    z: source.z - translation.velocity.z,
  });
}

export function borgPrescribedDisplayFrameReadout({
  frame,
  time,
  translation,
}) {
  const displayFrame = assertBorgPrescribedDisplayFrame(frame);
  const absoluteTime = finiteNumber(time, "prescribed display readout time");
  const suffix = displayFrame === BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING
    ? translation?.stationary
      ? " · source translation is zero"
      : " · source-carried translation subtracted"
    : " · sealed fixed-frame coordinates";
  return `T=${formatExact(absoluteTime)} · ${displayFrame}${suffix}`;
}

function unavailable(recordId, code, message) {
  return Object.freeze({
    available: false,
    recordId,
    code,
    epochTime: null,
    centerAtEpoch: null,
    velocity: null,
    speed: null,
    stationary: null,
    source: null,
    message,
  });
}

function readVectorArray(value) {
  if (!Array.isArray(value) || value.length !== 3) {
    return null;
  }
  const [x, y, z] = value.map(Number);
  if (![x, y, z].every(Number.isFinite)) {
    return null;
  }
  return { x, y, z };
}

function finiteVector(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an {x,y,z} vector.`);
  }
  return Object.freeze({
    x: finiteNumber(value.x, `${label}.x`),
    y: finiteNumber(value.y, `${label}.y`),
    z: finiteNumber(value.z, `${label}.z`),
  });
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be finite.`);
  }
  return number;
}

function formatExact(value) {
  return Number(value.toPrecision(15)).toString();
}
