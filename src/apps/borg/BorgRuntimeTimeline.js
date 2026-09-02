import { BORG_MAX_VISUAL_CATCH_UP_FRAME_SETS } from "./BorgLivePlaybackController.js";

const VELOCITY_RAY_MINIMUM_VISIBLE_LENGTH = 0.22;
const VELOCITY_RAY_LOG_SCALE = 0.88;

export function interpolateBorgFrameSetInto(
  fromFrameSet,
  toFrameSet,
  progress,
  target,
  toFramesByPathKey,
) {
  target.frameIndex = progress < 0.5
    ? fromFrameSet.frameIndex
    : toFrameSet.frameIndex;
  target.time = lerp(fromFrameSet.time, toFrameSet.time, progress);
  target.frames.length = fromFrameSet.frames.length;
  fromFrameSet.frames.forEach((fromFrame, index) => {
    const toFrame = toFramesByPathKey?.get(fromFrame.pathKey) ?? fromFrame;
    const row = target.frames[index] ?? {
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    };
    row.pathKey = fromFrame.pathKey;
    row.frameIndex = progress < 0.5 ? fromFrame.frameIndex : toFrame.frameIndex;
    row.time = lerp(
      fromFrame.time ?? fromFrameSet.time,
      toFrame.time ?? toFrameSet.time,
      progress,
    );
    interpolateVectorInto(
      row.position,
      fromFrame.position,
      toFrame.position,
      progress,
    );
    interpolateVectorInto(
      row.velocity,
      fromFrame.velocity,
      toFrame.velocity,
      progress,
    );
    row.errorBound = Math.max(
      fromFrame.errorBound ?? 0,
      toFrame.errorBound ?? 0,
    );
    row.stateFlags = fromFrame.stateFlags ?? toFrame.stateFlags ?? 0;
    row.sourceWorldlineId =
      fromFrame.sourceWorldlineId ?? toFrame.sourceWorldlineId ?? null;
    target.frames[index] = row;
  });
  return target;
}

export function formatBorgTimelineTime(value) {
  if (!Number.isFinite(value)) {
    return "--:--:--.-";
  }
  const totalTenths = Math.round(Math.abs(value) * 10);
  const sign = value < 0 && totalTenths > 0 ? "-" : "";
  const hours = Math.floor(totalTenths / 36000);
  const minutes = Math.floor((totalTenths % 36000) / 600);
  const seconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${sign}${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}.${tenths}`;
}

export function getBorgTimelineRangePresentation({
  frameIndexes,
  activeFrameIndex,
  isForever,
  isPlaying,
}) {
  if (!Array.isArray(frameIndexes) || frameIndexes.length === 0) {
    return Object.freeze({
      min: 0,
      max: 0,
      value: 0,
      disabled: true,
      mode: "empty",
      title: "No recorded frame is available.",
    });
  }
  if (isForever && isPlaying) {
    return Object.freeze({
      min: 0,
      max: 100,
      value: 50,
      disabled: true,
      mode: "live-follow",
      title: "Following live playback. Pause to scrub buffered frames.",
    });
  }
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  frameIndexes.forEach((frameIndex) => {
    min = Math.min(min, frameIndex);
    max = Math.max(max, frameIndex);
  });
  return Object.freeze({
    min,
    max,
    value: clampBorgValue(activeFrameIndex, min, max),
    disabled: false,
    mode: isForever ? "live-buffer" : "finite-run",
    title: isForever
      ? "Buffered-frame scrubber; a no-limit run has no finite completion percentage."
      : "Run progress and frame scrubber.",
  });
}

export function getBorgPlaybackReanchor(frameSets, activeFrameIndex) {
  if (!Array.isArray(frameSets) || frameSets.length === 0) {
    return Object.freeze({
      fromSetIndex: 0,
      toSetIndex: 0,
      fromFrameIndex: null,
      toFrameIndex: null,
    });
  }
  let activeSetIndex = frameSets.findIndex(
    (frameSet) => Number(frameSet?.frameIndex) === Number(activeFrameIndex),
  );
  if (activeSetIndex < 0) {
    activeSetIndex = frameSets.findIndex(
      (frameSet) => Number(frameSet?.frameIndex) > Number(activeFrameIndex),
    );
  }
  if (activeSetIndex < 0) {
    activeSetIndex = frameSets.length - 1;
  }
  const fromSetIndex = frameSets.length < 2
    ? 0
    : Math.min(activeSetIndex, frameSets.length - 2);
  const toSetIndex = Math.min(fromSetIndex + 1, frameSets.length - 1);
  return Object.freeze({
    fromSetIndex,
    toSetIndex,
    fromFrameIndex: frameSets[fromSetIndex]?.frameIndex ?? null,
    toFrameIndex: frameSets[toSetIndex]?.frameIndex ?? null,
  });
}

export function getBorgBufferedPlaybackAdvance({
  rawProgress,
  fromSetIndex,
  frameSetCount,
}) {
  const requestedAdvance = Math.max(0, Math.floor(Number(rawProgress) || 0));
  const availableAdvance = Math.max(
    0,
    Number(frameSetCount) - 1 - Number(fromSetIndex),
  );
  return Math.min(
    requestedAdvance,
    availableAdvance,
    BORG_MAX_VISUAL_CATCH_UP_FRAME_SETS,
  );
}

export function calculateBorgOrthographicFrustum({
  envelopeWorldRadius,
  margin,
  aspect,
}) {
  const numericRadius = Number(envelopeWorldRadius);
  const numericMargin = Number(margin);
  const numericAspect = Number(aspect);
  if (!Number.isFinite(numericRadius) || numericRadius <= 0) {
    throw new TypeError("Borg orthographic envelope radius must be positive and finite.");
  }
  if (!Number.isFinite(numericMargin) || numericMargin <= 0) {
    throw new TypeError("Borg orthographic camera-fit margin must be positive and finite.");
  }
  if (!Number.isFinite(numericAspect) || numericAspect <= 0) {
    throw new TypeError("Borg orthographic viewport aspect must be positive and finite.");
  }
  const limitingDimensionScale = Math.min(1, numericAspect);
  const halfHeight = (numericRadius * numericMargin) / limitingDimensionScale;
  const halfWidth = halfHeight * numericAspect;
  return Object.freeze({
    left: -halfWidth,
    right: halfWidth,
    top: halfHeight,
    bottom: -halfHeight,
  });
}

export function getBorgVelocityRayLength(speed) {
  const numericSpeed = Number(speed);
  if (!Number.isFinite(numericSpeed) || numericSpeed <= 0) {
    return 0;
  }
  // Display-grade evolution commonly begins with very small nonzero speeds.
  // Preserve the logarithmic magnitude cue while keeping the direction visible.
  return VELOCITY_RAY_MINIMUM_VISIBLE_LENGTH +
    Math.log10(1 + numericSpeed) * VELOCITY_RAY_LOG_SCALE;
}

export function clampBorgValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function formatBorgNumber(value) {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  if (Math.abs(value) >= 1000 || (Math.abs(value) > 0 && Math.abs(value) < 0.001)) {
    return value.toExponential(3);
  }
  return Number(value.toFixed(6)).toString();
}

export function getBorgVectorLength(vector) {
  return Math.hypot(vector?.x ?? 0, vector?.y ?? 0, vector?.z ?? 0);
}

function interpolateVectorInto(target, fromVector, toVector, progress) {
  target.x = lerp(fromVector?.x ?? 0, toVector?.x ?? 0, progress);
  target.y = lerp(fromVector?.y ?? 0, toVector?.y ?? 0, progress);
  target.z = lerp(fromVector?.z ?? 0, toVector?.z ?? 0, progress);
  return target;
}

function lerp(fromValue, toValue, progress) {
  return fromValue + (toValue - fromValue) * progress;
}
