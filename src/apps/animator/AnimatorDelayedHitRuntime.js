export const DEFAULT_ANIMATOR_DELAYED_HIT_OPTIONS = Object.freeze({
  fadeInSeconds: 0.08,
  fadeOutSeconds: 1.1,
  activeWindowSeconds: 0.28,
  baseOpacity: 0.46,
  strengthOpacityScale: 1.25,
});

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeVector(value = []) {
  const source = Array.isArray(value)
    ? value
    : value && typeof value === "object"
      ? [value.x, value.y, value.z]
      : [];
  return [
    normalizeNumber(source[0], 0),
    normalizeNumber(source[1], 0),
    normalizeNumber(source[2], 0),
  ];
}

function interpolateVector(from, to, alpha) {
  const start = normalizeVector(from);
  const end = normalizeVector(to);
  return start.map((value, index) => value + (end[index] - value) * alpha);
}

function formatSeconds(value) {
  return `${normalizeNumber(value, 0).toFixed(2)}s`;
}

function formatFixed(value, digits = 3, fallback = "") {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(digits) : fallback;
}

function getDelayedHits(dataset = {}) {
  return Array.isArray(dataset?.delayedHits) ? dataset.delayedHits.filter(Boolean) : [];
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

export function getAnimatorDelayedHitDiagnosticLabel(hit = {}) {
  const branchId = normalizeString(hit.branchId, normalizeString(hit.id, "hit"));
  const jacobian = formatFixed(hit.jacobian, 3, "n/a");
  return `${branchId} J=${jacobian}`;
}

export function getAnimatorDelayedHitRenderState(hit = {}, timeSeconds = 0, options = {}) {
  const time = normalizeNumber(timeSeconds, 0);
  const emissionTime = normalizeNumber(hit.emissionTime ?? hit.tEmit, 0);
  const hitTime = Math.max(
    emissionTime,
    normalizeNumber(hit.hitTime ?? hit.t, emissionTime)
  );
  const fadeInSeconds = Math.max(
    0,
    normalizeNumber(options.fadeInSeconds, DEFAULT_ANIMATOR_DELAYED_HIT_OPTIONS.fadeInSeconds)
  );
  const fadeOutSeconds = Math.max(
    0.001,
    normalizeNumber(options.fadeOutSeconds, DEFAULT_ANIMATOR_DELAYED_HIT_OPTIONS.fadeOutSeconds)
  );
  const activeWindowSeconds = Math.max(
    0.001,
    normalizeNumber(
      options.activeWindowSeconds,
      DEFAULT_ANIMATOR_DELAYED_HIT_OPTIONS.activeWindowSeconds
    )
  );
  const transmitterPosition = normalizeVector(
    hit.transmitterEmissionPosition ?? hit.emissionPosition ?? hit.transmitterPosition
  );
  const receiverPosition = normalizeVector(hit.receiverPosition ?? hit.targetPosition);
  const span = Math.max(0.000001, hitTime - emissionTime);
  const age = time - emissionTime;
  const afterHit = time - hitTime;
  const travelProgress = clamp(age / span, 0, 1);
  const fadeIn =
    age < 0
      ? 0
      : fadeInSeconds > 0
        ? clamp(0.35 + (age / fadeInSeconds) * 0.65, 0, 1)
        : 1;
  const fadeOut = afterHit > 0 ? clamp(1 - afterHit / fadeOutSeconds, 0, 1) : 1;
  const strength = Math.abs(normalizeNumber(hit.strength, 0));
  const baseOpacity = clamp(
    normalizeNumber(options.baseOpacity, DEFAULT_ANIMATOR_DELAYED_HIT_OPTIONS.baseOpacity) +
      strength *
        normalizeNumber(
          options.strengthOpacityScale,
          DEFAULT_ANIMATOR_DELAYED_HIT_OPTIONS.strengthOpacityScale
        ),
    0.34,
    0.92
  );
  const active = Math.abs(time - hitTime) <= activeWindowSeconds;
  const visible = time >= emissionTime && time <= hitTime + fadeOutSeconds && fadeIn * fadeOut > 0;
  const opacity = visible ? baseOpacity * fadeIn * fadeOut : 0;
  const connectorEndPosition = interpolateVector(transmitterPosition, receiverPosition, travelProgress);
  const receiverVisibility = time >= hitTime - activeWindowSeconds ? 1 : 0.36;

  return {
    id: normalizeString(hit.id, ""),
    transmitterPosition,
    receiverPosition,
    connectorEndPosition,
    travelProgress,
    emissionTime,
    hitTime,
    active,
    visible,
    opacity,
    connectorOpacity: opacity,
    transmitterOpacity: opacity,
    receiverOpacity: visible ? clamp(opacity * receiverVisibility, 0.12, 1) : 0,
    markerScale: active ? 1.35 : 1,
  };
}

export function createAnimatorDelayedHitTableRecords(dataset = {}, timeSeconds = 0) {
  const time = normalizeNumber(timeSeconds, 0);
  return getDelayedHits(dataset).map((hit, index) => {
    const renderState = getAnimatorDelayedHitRenderState(hit, time);
    const emissionTime = normalizeNumber(hit.emissionTime ?? hit.tEmit, 0);
    const hitTime = normalizeNumber(hit.hitTime ?? hit.t, emissionTime);
    const stateLabel =
      time < emissionTime
        ? "queued"
        : time < hitTime
          ? `${formatSeconds(hitTime - time)} to hit`
          : renderState.active
            ? "hitting"
            : `${formatSeconds(time - hitTime)} after hit`;
    return {
      id: normalizeString(hit.id, `delayed_hit_${index + 1}`),
      transmitterId: normalizeString(hit.transmitterId ?? hit.transmitter, ""),
      receiverId: normalizeString(hit.receiverId ?? hit.receiver, ""),
      branchId: normalizeString(hit.branchId, ""),
      jacobianLabel: formatFixed(hit.jacobian, 3, "n/a"),
      strengthLabel: formatFixed(hit.strength, 3, "n/a"),
      emissionTimeLabel: formatSeconds(emissionTime),
      hitTimeLabel: formatSeconds(hitTime),
      status: normalizeString(hit.status, "recorded"),
      stateLabel,
      active: renderState.active,
      visible: renderState.visible,
    };
  });
}

export function createAnimatorDelayedHitsFromSolverRecords(recordsOrResponse = [], options = {}) {
  const records = Array.isArray(recordsOrResponse)
    ? recordsOrResponse
    : Array.isArray(recordsOrResponse?.records)
      ? recordsOrResponse.records
      : [];
  return records.filter(Boolean).map((record, index) => {
    const metadata = record.metadata && typeof record.metadata === "object" ? record.metadata : {};
    const transmitterId = normalizeString(record.transmitterId ?? record.transmitter, `transmitter_${index + 1}`);
    const receiverId = normalizeString(record.receiverId ?? record.receiver, `receiver_${index + 1}`);
    const emissionTime = normalizeNumber(record.emissionTime ?? record.tEmit, 0);
    const hitTime = normalizeNumber(record.hitTime ?? record.t, emissionTime);
    const displayStrength = normalizeNumber(
      metadata.displayStrength,
      normalizeNumber(record.displayStrength, normalizeNumber(record.strength, 0))
    );
    return {
      id: normalizeString(
        record.id,
        `solver_path_hit_${idPart(transmitterId, "transmitter")}_to_${idPart(receiverId, "receiver")}_t${timeIdPart(emissionTime)}_${index}`
      ),
      transmitterId,
      receiverId,
      hitTime,
      emissionTime,
      transmitterEmissionPosition: normalizeVector(record.emissionPoint ?? record.transmitterEmissionPosition),
      receiverPosition: normalizeVector(record.receiverPoint ?? record.receiverPosition),
      strength: displayStrength,
      branchId: normalizeString(
        record.branchId,
        `solver_path_history_${idPart(transmitterId, "transmitter")}_to_${idPart(receiverId, "receiver")}_${index}`
      ),
      jacobian: normalizeNumber(record.jacobian, 0),
      transmitterRadialSpeedAtEmission: normalizeNumber(record.transmitterRadialSpeedAtEmission, 0),
      receiverRadialSpeedAtReception: normalizeNumber(record.receiverRadialSpeedAtReception, 0),
      transmitterFactor: normalizeNumber(record.transmitterFactor, 0),
      receiverFactor: normalizeNumber(record.receiverFactor, 0),
      receiverCrossingRatio: normalizeNumber(record.receiverCrossingRatio, 0),
      rootPlayback: normalizeNumber(record.rootPlayback, 0),
      accelerationWeight: normalizeNumber(record.accelerationWeight, 0),
      causalFactorStatusCode: normalizeNumber(record.causalFactorStatusCode, 0),
      status: normalizeString(options.status ?? record.status, "solver-owned-record"),
      metadata: {
        ...metadata,
        source: normalizeString(metadata.source, "solver-owned-delayed-hit-record"),
        recordLayout: normalizeString(metadata.recordLayout, "delayed_hit_events.v1"),
        eventId: normalizeNumber(record.eventId, index),
        rootId: normalizeNumber(record.rootId, index),
        statusCode: normalizeNumber(record.statusCode, 0),
        solverAccelerationWeight: normalizeNumber(record.accelerationWeight, 0),
        unitDirection: normalizeVector(record.unitDirection),
      },
    };
  });
}
