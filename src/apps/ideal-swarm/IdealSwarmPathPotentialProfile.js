const QUARTER_TURN = Math.PI / 2;
const NO_FORWARD_SPAN = 0;
const FIELD_SPEED_TOLERANCE = 0.015;
const SELF_HIT_SOLVE_ITERATIONS = 28;
const DEFAULT_PATH_SPEED_PRODUCTS = Object.freeze({
  inner: 0.5 * 0.42,
  middle: 0.7 * 0.26,
  outer: 0.9 * 0.16,
});

export const BINARY_FIELD_SPEED_RATIOS = Object.freeze({
  inner: DEFAULT_PATH_SPEED_PRODUCTS.inner / DEFAULT_PATH_SPEED_PRODUCTS.middle,
  middle: 1,
  outer: DEFAULT_PATH_SPEED_PRODUCTS.outer / DEFAULT_PATH_SPEED_PRODUCTS.middle,
});

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerpNumber(start, end, progress) {
  return start + (end - start) * progress;
}

function normalizeFieldSpeedRatio(value) {
  const ratio = Number(value);
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
}

function getBinaryId(binaryOrId) {
  return typeof binaryOrId === "string" ? binaryOrId : binaryOrId?.id;
}

export function getBinaryFieldSpeedRatio(binaryOrId) {
  const explicitRatio =
    typeof binaryOrId === "object" && binaryOrId ? binaryOrId.fieldSpeedRatio : undefined;
  return normalizeFieldSpeedRatio(
    explicitRatio ?? BINARY_FIELD_SPEED_RATIOS[getBinaryId(binaryOrId)]
  );
}

export function getFieldSpeedRegimeLabel(fieldSpeedRatio) {
  const ratio = normalizeFieldSpeedRatio(fieldSpeedRatio);
  if (ratio < 1 - FIELD_SPEED_TOLERANCE) {
    return "slower";
  }
  if (ratio > 1 + FIELD_SPEED_TOLERANCE) {
    return "faster";
  }
  return "field speed";
}

export function solveCircularSelfHitSpan(fieldSpeedRatio) {
  const ratio = normalizeFieldSpeedRatio(fieldSpeedRatio);
  if (ratio <= 1 + FIELD_SPEED_TOLERANCE) {
    return 0;
  }

  function residual(angle) {
    return 2 * Math.sin(angle / 2) - angle / ratio;
  }

  const maxAngle = Math.PI * 1.96;
  const step = Math.PI / 72;
  let low = step;
  let high = maxAngle;
  let foundHigh = false;
  let previousAngle = low;
  let previousValue = residual(previousAngle);

  for (let angle = low + step; angle <= maxAngle; angle += step) {
    const value = residual(angle);
    if (previousValue > 0 && value <= 0) {
      low = previousAngle;
      high = angle;
      foundHigh = true;
      break;
    }
    previousAngle = angle;
    previousValue = value;
  }

  if (!foundHigh) {
    return Math.PI;
  }

  for (let index = 0; index < SELF_HIT_SOLVE_ITERATIONS; index += 1) {
    const middle = (low + high) / 2;
    if (residual(middle) > 0) {
      low = middle;
    } else {
      high = middle;
    }
  }

  return (low + high) / 2;
}

function createSubFieldProfile(fieldSpeedRatio) {
  const subProgress = clampNumber((1 - fieldSpeedRatio) / 0.3, 0, 1);
  return {
    fieldSpeedRatio,
    regime: getFieldSpeedRegimeLabel(fieldSpeedRatio),
    forwardSpan: QUARTER_TURN,
    backwardSpan: lerpNumber(QUARTER_TURN, Math.PI / 6, subProgress),
    falloff: lerpNumber(0.95, 1.05, subProgress),
    forwardGain: lerpNumber(1.12, 1, subProgress),
    backwardGain: lerpNumber(1.05, 0.72, subProgress),
    forwardWidthScale: lerpNumber(1, 0.58, subProgress),
    wakeWidthScale: lerpNumber(1.2, 2.65, subProgress),
    selfHitSpan: 0,
  };
}

function createFieldSpeedProfile() {
  return {
    fieldSpeedRatio: 1,
    regime: "field speed",
    forwardSpan: NO_FORWARD_SPAN,
    backwardSpan: QUARTER_TURN,
    falloff: 0.78,
    forwardGain: 0,
    backwardGain: 1.35,
    forwardWidthScale: 1,
    wakeWidthScale: 1.52,
    selfHitSpan: 0,
  };
}

function createSuperFieldProfile(fieldSpeedRatio) {
  const superProgress = clampNumber((fieldSpeedRatio - 1) / 0.35, 0, 1);
  const selfHitSpan = solveCircularSelfHitSpan(fieldSpeedRatio);
  return {
    fieldSpeedRatio,
    regime: getFieldSpeedRegimeLabel(fieldSpeedRatio),
    forwardSpan: NO_FORWARD_SPAN,
    backwardSpan: clampNumber(selfHitSpan, QUARTER_TURN, Math.PI * 0.92),
    falloff: lerpNumber(0.85, 0.72, superProgress),
    forwardGain: 0,
    backwardGain: lerpNumber(0.78, 0.9, superProgress),
    forwardWidthScale: 1,
    wakeWidthScale: lerpNumber(1.05, 1.26, superProgress),
    selfHitSpan,
  };
}

export function getOrbitPathTintProfile(binaryOrId) {
  const fieldSpeedRatio = getBinaryFieldSpeedRatio(binaryOrId);
  if (fieldSpeedRatio < 1 - FIELD_SPEED_TOLERANCE) {
    return createSubFieldProfile(fieldSpeedRatio);
  }
  if (fieldSpeedRatio > 1 + FIELD_SPEED_TOLERANCE) {
    return createSuperFieldProfile(fieldSpeedRatio);
  }
  return createFieldSpeedProfile();
}

export function getOrbitPathBranchGain(profile, travelSign) {
  return travelSign > 0 ? profile.forwardGain : profile.backwardGain;
}
