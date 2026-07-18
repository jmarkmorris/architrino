export const BORG_DISPLAY_TRACK_POSITION_LIMIT = 0.05;

export function evaluateBorgDisplayTrackAgreement({
  coarseFrames,
  refinedFrames,
  envelopeRadius,
  limit = BORG_DISPLAY_TRACK_POSITION_LIMIT,
} = {}) {
  if (!Array.isArray(coarseFrames) || coarseFrames.length === 0 ||
      !Array.isArray(refinedFrames) || refinedFrames.length === 0) {
    throw new TypeError(
      "Borg display track agreement requires coarse and refined frames.",
    );
  }
  const radius = Number(envelopeRadius);
  const numericLimit = Number(limit);
  if (!(radius > 0) || !(numericLimit > 0)) {
    throw new RangeError(
      "Borg display track agreement requires a positive radius and limit.",
    );
  }
  const refinedByKey = new Map(
    refinedFrames.map((frame) => [frameKey(frame), frame]),
  );
  let maximumPositionDelta = 0;
  let maximumRow = null;
  for (const coarse of coarseFrames) {
    const refined = refinedByKey.get(frameKey(coarse));
    if (!refined) {
      throw new Error(
        "Borg display track agreement requires matching path/time samples.",
      );
    }
    const delta = positionDistance(coarse.position, refined.position);
    if (delta > maximumPositionDelta) {
      maximumPositionDelta = delta;
      maximumRow = Object.freeze({
        pathKey: coarse.pathKey,
        time: coarse.time,
      });
    }
  }
  const normalizedMaximumPositionDelta = maximumPositionDelta / radius;
  return Object.freeze({
    schema: "borg_display_track_agreement/v0",
    claimLevel: "preset-step-height-comparison-not-evidence",
    matchedFrameCount: coarseFrames.length,
    envelopeRadius: radius,
    limit: numericLimit,
    maximumPositionDelta,
    normalizedMaximumPositionDelta,
    maximumRow,
    accepted: normalizedMaximumPositionDelta <= numericLimit,
    status: normalizedMaximumPositionDelta <= numericLimit
      ? "within-preset-target"
      : "outside-preset-target",
  });
}

function frameKey(frame) {
  const pathKey = String(frame?.pathKey);
  const time = Number(frame?.time);
  if (pathKey.length === 0 || !Number.isFinite(time)) {
    throw new TypeError(
      "Borg display track agreement frames require pathKey and finite time.",
    );
  }
  return `${pathKey}\u0000${time}`;
}

function positionDistance(left, right) {
  const values = [left?.x, left?.y, left?.z, right?.x, right?.y, right?.z]
    .map(Number);
  if (!values.every(Number.isFinite)) {
    throw new TypeError(
      "Borg display track agreement frames require finite positions.",
    );
  }
  return Math.hypot(
    values[0] - values[3],
    values[1] - values[4],
    values[2] - values[5],
  );
}
