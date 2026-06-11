export const DEFAULT_ANIMATOR_TRAIL_LIFETIME_SECONDS = 6;
export const DEFAULT_ANIMATOR_TRAIL_OPACITY_SCALE = 1;
export const DEFAULT_ANIMATOR_TRAIL_FADE_FLOOR = 0.12;

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizePosition(value) {
  if (Array.isArray(value)) {
    return [
      normalizeNumber(value[0], 0),
      normalizeNumber(value[1], 0),
      normalizeNumber(value[2], 0),
    ];
  }
  if (value && typeof value === "object") {
    return [
      normalizeNumber(value.x, 0),
      normalizeNumber(value.y, 0),
      normalizeNumber(value.z, 0),
    ];
  }
  return [0, 0, 0];
}

function interpolatePosition(from, to, alpha) {
  const left = normalizePosition(from);
  const right = normalizePosition(to);
  return left.map((value, index) => value + (right[index] - value) * alpha);
}

function createTimedSample(sample = {}) {
  const time = normalizeNumber(sample.t ?? sample.time, Number.NaN);
  if (!Number.isFinite(time)) {
    return null;
  }
  return {
    ...sample,
    t: time,
    position: normalizePosition(sample.position),
  };
}

function getSortedTimedSamples(samples = []) {
  return (Array.isArray(samples) ? samples : [])
    .map((sample) => createTimedSample(sample))
    .filter(Boolean)
    .sort((left, right) => left.t - right.t);
}

function sampleAtTime(samples = [], timeSeconds = 0) {
  const time = normalizeNumber(timeSeconds, 0);
  if (!samples.length || time < samples[0].t || time > samples[samples.length - 1].t) {
    return null;
  }
  const exact = samples.find((sample) => Math.abs(sample.t - time) <= 0.000001);
  if (exact) {
    return { ...exact, t: time };
  }
  for (let index = 0; index < samples.length - 1; index += 1) {
    const from = samples[index];
    const to = samples[index + 1];
    if (time < from.t || time > to.t) {
      continue;
    }
    const duration = Math.max(0.000001, to.t - from.t);
    const alpha = clampNumber((time - from.t) / duration, 0, 1);
    return {
      t: time,
      position: interpolatePosition(from.position, to.position, alpha),
    };
  }
  return null;
}

function appendUniqueSample(samples, sample) {
  if (!sample) {
    return;
  }
  const previous = samples[samples.length - 1] ?? null;
  if (previous && Math.abs(previous.t - sample.t) <= 0.000001) {
    samples[samples.length - 1] = sample;
    return;
  }
  samples.push(sample);
}

export function normalizeAnimatorTrailControls(rawControls = {}) {
  const controls = rawControls && typeof rawControls === "object" ? rawControls : {};
  return {
    opacityScale: clampNumber(
      normalizeNumber(controls.opacityScale ?? controls.opacity, DEFAULT_ANIMATOR_TRAIL_OPACITY_SCALE),
      0,
      1
    ),
    lifetimeSeconds: clampNumber(
      normalizeNumber(
        controls.lifetimeSeconds ?? controls.lifetime,
        DEFAULT_ANIMATOR_TRAIL_LIFETIME_SECONDS
      ),
      0.25,
      60
    ),
    diagnosticEmphasis: controls.diagnosticEmphasis !== false,
    fadeFloor: clampNumber(
      normalizeNumber(controls.fadeFloor, DEFAULT_ANIMATOR_TRAIL_FADE_FLOOR),
      0,
      0.95
    ),
  };
}

export function createAnimatorTimedTrailSamples(points = [], timeWindow = {}) {
  const source = Array.isArray(points) ? points : [];
  if (!source.length) {
    return [];
  }
  const start = normalizeNumber(timeWindow.start, 0);
  const end = normalizeNumber(timeWindow.end, start);
  const duration = Math.max(0, end - start);
  const denominator = Math.max(1, source.length - 1);
  return source.map((point, index) => ({
    t: start + duration * (index / denominator),
    position: normalizePosition(point),
  }));
}

export function createAnimatorFadeableTrailSamples(samples = [], timeSeconds = 0, controls = {}) {
  const sortedSamples = getSortedTimedSamples(samples);
  if (!sortedSamples.length) {
    return [];
  }
  const normalizedControls = normalizeAnimatorTrailControls(controls);
  const time = normalizeNumber(timeSeconds, 0);
  const lifetimeSeconds = normalizedControls.lifetimeSeconds;
  const startTime = time - lifetimeSeconds;
  const visible = [];
  appendUniqueSample(visible, sampleAtTime(sortedSamples, startTime));
  sortedSamples.forEach((sample) => {
    if (sample.t < startTime || sample.t > time) {
      return;
    }
    appendUniqueSample(visible, sample);
  });
  appendUniqueSample(visible, sampleAtTime(sortedSamples, time));
  return visible.map((sample) => {
    const age = clampNumber(time - sample.t, 0, lifetimeSeconds);
    const rawFade = 1 - age / Math.max(0.000001, lifetimeSeconds);
    return {
      ...sample,
      fade: clampNumber(rawFade, normalizedControls.fadeFloor, 1),
    };
  });
}

export function getAnimatorTrailMaterialOpacity(historyTrace = {}, controls = {}) {
  const style = historyTrace?.style && typeof historyTrace.style === "object" ? historyTrace.style : {};
  const normalizedControls = normalizeAnimatorTrailControls(controls);
  const baseOpacity = clampNumber(normalizeNumber(style.opacity, 0.42), 0, 1);
  const emphasisScale =
    normalizedControls.diagnosticEmphasis && historyTrace?.kind === "solver-derived"
      ? clampNumber(normalizeNumber(style.diagnosticOpacityScale, 1.18), 1, 1.75)
      : 1;
  return clampNumber(baseOpacity * normalizedControls.opacityScale * emphasisScale, 0, 1);
}
