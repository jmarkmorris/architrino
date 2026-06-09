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
  const source = Array.isArray(value) ? value : [];
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

function vectorDistance(from, to) {
  const a = normalizeVector(from);
  const b = normalizeVector(to);
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
}

function residualToExpandingShell(emissionPosition, sample, fieldSpeed, emissionTime) {
  const time = normalizeNumber(sample?.time ?? sample?.t, emissionTime);
  return (
    vectorDistance(emissionPosition, sample?.position) -
    Math.max(0, fieldSpeed * (time - emissionTime))
  );
}

function interpolateSample(from, to, alpha) {
  const startTime = normalizeNumber(from?.time ?? from?.t, 0);
  const endTime = normalizeNumber(to?.time ?? to?.t, startTime);
  return {
    time: startTime + (endTime - startTime) * alpha,
    position: interpolateVector(from?.position, to?.position, alpha),
  };
}

function findShellPathIntersection(emission, fromSample, toSample, options = {}) {
  const emissionTime = normalizeNumber(emission?.time ?? emission?.emissionTime, 0);
  const emissionPosition = normalizeVector(emission?.position ?? emission?.emissionPosition);
  const fieldSpeed = Math.max(
    0.000001,
    normalizeNumber(emission?.fieldSpeed, normalizeNumber(options.fieldSpeed, 1))
  );
  const tolerance = Math.max(0, normalizeNumber(options.tolerance, 0.001));
  let low = {
    sample: fromSample,
    residual: residualToExpandingShell(emissionPosition, fromSample, fieldSpeed, emissionTime),
  };
  let high = {
    sample: toSample,
    residual: residualToExpandingShell(emissionPosition, toSample, fieldSpeed, emissionTime),
  };
  if (Math.abs(low.residual) <= tolerance) {
    return low.sample;
  }
  if (Math.abs(high.residual) <= tolerance) {
    return high.sample;
  }
  if (low.residual * high.residual > 0) {
    return null;
  }
  for (let index = 0; index < 24; index += 1) {
    const midpoint = interpolateSample(low.sample, high.sample, 0.5);
    const midpointResidual = residualToExpandingShell(
      emissionPosition,
      midpoint,
      fieldSpeed,
      emissionTime
    );
    if (Math.abs(midpointResidual) <= tolerance) {
      return midpoint;
    }
    if (low.residual * midpointResidual <= 0) {
      high = { sample: midpoint, residual: midpointResidual };
    } else {
      low = { sample: midpoint, residual: midpointResidual };
    }
  }
  return interpolateSample(low.sample, high.sample, 0.5);
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
  const sourcePosition = normalizeVector(
    hit.emitterEmissionPosition ?? hit.emissionPosition ?? hit.sourcePosition
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
  const connectorEndPosition = interpolateVector(sourcePosition, receiverPosition, travelProgress);
  const receiverVisibility = time >= hitTime - activeWindowSeconds ? 1 : 0.36;

  return {
    id: normalizeString(hit.id, ""),
    sourcePosition,
    receiverPosition,
    connectorEndPosition,
    travelProgress,
    emissionTime,
    hitTime,
    active,
    visible,
    opacity,
    connectorOpacity: opacity,
    sourceOpacity: opacity,
    receiverOpacity: visible ? clamp(opacity * receiverVisibility, 0.12, 1) : 0,
    markerScale: active ? 1.35 : 1,
  };
}

export function createAnimatorDelayedHitTableRows(dataset = {}, timeSeconds = 0) {
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
      emitterId: normalizeString(hit.emitterId ?? hit.emitter, ""),
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

export function createAnimatorDelayedHitsFromPathSamples(
  emissionSamples = [],
  receiverTracks = [],
  options = {}
) {
  const emissions = Array.isArray(emissionSamples) ? emissionSamples.filter(Boolean) : [];
  const tracks = Array.isArray(receiverTracks) ? receiverTracks.filter(Boolean) : [];
  const allowSelfHits = options.allowSelfHits === true;
  const maxHits = Math.max(0, Math.floor(normalizeNumber(options.maxHits, Infinity)));
  const fallbackFieldSpeed = Math.max(0.000001, normalizeNumber(options.fieldSpeed, 1));
  const hits = [];

  emissions.forEach((emission, emissionIndex) => {
    if (hits.length >= maxHits) {
      return;
    }
    const emitterId = normalizeString(emission?.emitterId ?? emission?.id, "");
    const emissionTime = normalizeNumber(emission?.time ?? emission?.emissionTime, 0);
    const emissionPosition = normalizeVector(emission?.position ?? emission?.emissionPosition);
    const fieldSpeed = Math.max(
      0.000001,
      normalizeNumber(emission?.fieldSpeed, fallbackFieldSpeed)
    );

    tracks.forEach((track) => {
      if (hits.length >= maxHits) {
        return;
      }
      const receiverId = normalizeString(track?.receiverId ?? track?.id, "");
      if (!receiverId || (!allowSelfHits && receiverId === emitterId)) {
        return;
      }
      const samples = Array.isArray(track?.samples)
        ? track.samples
            .filter((sample) => Number(sample?.time ?? sample?.t) >= emissionTime - 1e-9)
            .sort((a, b) => Number(a?.time ?? a?.t) - Number(b?.time ?? b?.t))
        : [];
      if (samples.length < 2) {
        return;
      }
      let previous = samples[0];
      let previousResidual = residualToExpandingShell(
        emissionPosition,
        previous,
        fieldSpeed,
        emissionTime
      );
      for (let sampleIndex = 1; sampleIndex < samples.length; sampleIndex += 1) {
        const current = samples[sampleIndex];
        const currentResidual = residualToExpandingShell(
          emissionPosition,
          current,
          fieldSpeed,
          emissionTime
        );
        const bracketed =
          Math.abs(currentResidual) <= normalizeNumber(options.tolerance, 0.001) ||
          previousResidual * currentResidual <= 0;
        if (!bracketed) {
          previous = current;
          previousResidual = currentResidual;
          continue;
        }
        const intersection = findShellPathIntersection(emission, previous, current, {
          ...options,
          fieldSpeed,
        });
        if (!intersection) {
          previous = current;
          previousResidual = currentResidual;
          continue;
        }
        const hitTime = normalizeNumber(intersection.time, emissionTime);
        if (hitTime <= emissionTime + 1e-9) {
          return;
        }
        const receiverPosition = normalizeVector(intersection.position);
        const distance = vectorDistance(emissionPosition, receiverPosition);
        hits.push({
          id: `path_hit_${idPart(emitterId, "source")}_to_${idPart(receiverId, "receiver")}_t${timeIdPart(emissionTime)}_${emissionIndex}`,
          emitterId,
          receiverId,
          hitTime,
          emissionTime,
          emitterEmissionPosition: emissionPosition,
          receiverPosition,
          strength: distance > 0 ? 1 / (distance * distance) : 0,
          branchId: `path_history_${idPart(emitterId, "source")}_to_${idPart(receiverId, "receiver")}_${emissionIndex}`,
          jacobian: 1,
          status: normalizeString(options.status, "path-history"),
          metadata: {
            source: "path-history-shell-intersection",
            emissionIndex,
            receiverTrackId: receiverId,
            distance,
            fieldSpeed,
            ...(emission?.metadata && typeof emission.metadata === "object"
              ? { emissionMetadata: { ...emission.metadata } }
              : {}),
            ...(track?.metadata && typeof track.metadata === "object"
              ? { receiverMetadata: { ...track.metadata } }
              : {}),
          },
        });
        return;
      }
    });
  });

  return hits;
}
