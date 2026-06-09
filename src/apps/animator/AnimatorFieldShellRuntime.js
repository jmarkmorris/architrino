export const DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS = Object.freeze({
  fieldSpeed: 1,
  fadeInSeconds: 0.08,
  fadeOutSeconds: 0.8,
  lifetimeSeconds: 1.6,
  continuousAgeOpacityHalfLifeSeconds: 1.1,
  opacityScale: 1,
  minVisibleRadius: 0.002,
});

const positiveShellColor = "#ff8796";
const negativeShellColor = "#78a8ff";
const neutralShellColor = "#ffffff";

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function normalizeVector(value = []) {
  const source = Array.isArray(value) ? value : [];
  return [
    normalizeNumber(source[0], 0),
    normalizeNumber(source[1], 0),
    normalizeNumber(source[2], 0),
  ];
}

function getShellStyle(shell = {}) {
  return shell?.style && typeof shell.style === "object" ? shell.style : {};
}

function getShellMetadata(shell = {}) {
  return shell?.metadata && typeof shell.metadata === "object" ? shell.metadata : {};
}

function isContinuousExpansionShell(shell = {}) {
  const metadata = getShellMetadata(shell);
  return !!(
    shell.continuousExpansion ??
    metadata.continuousExpansion ??
    metadata.motionSource === "solver-derived"
  );
}

export function isAnimatorContinuousExpansionFieldShell(shell = {}) {
  return isContinuousExpansionShell(shell);
}

function getContinuousExpansionOpacityScale(ageSeconds = 0, options = {}) {
  const halfLife = Math.max(
    0.001,
    normalizeNumber(
      options.continuousAgeOpacityHalfLifeSeconds,
      DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.continuousAgeOpacityHalfLifeSeconds
    )
  );
  const normalizedAge = Math.max(0, ageSeconds) / halfLife;
  return 1 / (1 + normalizedAge * normalizedAge);
}

export function getAnimatorFieldShellColor(shell = {}) {
  const styleColor = getShellStyle(shell).color ?? shell.color;
  if (typeof styleColor === "string" && styleColor.trim()) {
    return styleColor;
  }
  const sign = normalizeNumber(shell.sign ?? shell.polarity, 0);
  if (sign > 0) {
    return positiveShellColor;
  }
  if (sign < 0) {
    return negativeShellColor;
  }
  return neutralShellColor;
}

export function getAnimatorFieldShellSign(shell = {}, dataset = {}) {
  const explicitSign = normalizeNumber(shell.sign ?? shell.polarity, 0);
  if (explicitSign !== 0) {
    return Math.sign(explicitSign);
  }
  const emitterId = normalizeString(shell.emitterId ?? shell.emitter);
  if (!emitterId) {
    return 0;
  }
  const particle = Array.isArray(dataset?.particles)
    ? dataset.particles.find((candidate) => normalizeString(candidate?.id) === emitterId)
    : null;
  const particleSign = normalizeNumber(particle?.polarity ?? particle?.sign ?? particle?.q, 0);
  return particleSign === 0 ? 0 : Math.sign(particleSign);
}

export function getAnimatorFieldShellEmitterPath(fieldShell = {}, dataset = {}, paths = [], options = {}) {
  const pathList = Array.isArray(paths) ? paths.filter(Boolean) : [];
  if (!pathList.length) {
    return null;
  }
  const isEligiblePath =
    typeof options.isEligiblePath === "function" ? options.isEligiblePath : () => true;
  const getPathParticleId =
    typeof options.getPathParticleId === "function"
      ? options.getPathParticleId
      : (path) => path?.metadata?.simulationParticleId ?? path?.simulationParticleId ?? "";
  const getPathOwnerAssemblyId =
    typeof options.getPathOwnerAssemblyId === "function"
      ? options.getPathOwnerAssemblyId
      : (path) => path?.metadata?.ownerAssemblyId ?? path?.ownerAssemblyId ?? "";
  const getPathSign =
    typeof options.getPathSign === "function" ? options.getPathSign : () => 0;
  const candidates = pathList.filter((path) => isEligiblePath(path));
  if (!candidates.length) {
    return null;
  }

  const emitterId = normalizeString(fieldShell.emitterId ?? fieldShell.emitter);
  const exactParticlePath = emitterId
    ? candidates.find((path) => normalizeString(getPathParticleId(path)) === emitterId)
    : null;
  if (exactParticlePath) {
    return exactParticlePath;
  }

  const ownerAssemblyId = normalizeString(
    fieldShell?.metadata?.ownerAssemblyId ?? fieldShell?.assemblyId
  );
  const ownerPath = ownerAssemblyId
    ? candidates.find((path) => normalizeString(getPathOwnerAssemblyId(path)) === ownerAssemblyId)
    : null;
  if (ownerPath) {
    return ownerPath;
  }

  const shellSign = getAnimatorFieldShellSign(fieldShell, dataset);
  if (shellSign !== 0) {
    const signMatches = candidates.filter((path) => Math.sign(getPathSign(path)) === shellSign);
    if (signMatches.length === 1) {
      return signMatches[0];
    }
    if (signMatches.length > 1 && emitterId) {
      const sameSignParticleIds = Array.isArray(dataset?.particles)
        ? dataset.particles
            .filter((particle) => {
              const particleSign = normalizeNumber(
                particle?.polarity ?? particle?.sign ?? particle?.q,
                0
              );
              return Math.sign(particleSign) === shellSign;
            })
            .map((particle) => normalizeString(particle?.id))
        : [];
      const signIndex = sameSignParticleIds.indexOf(emitterId);
      if (signIndex >= 0) {
        return signMatches[signIndex % signMatches.length] ?? signMatches[0];
      }
    }
  }

  if (emitterId && Array.isArray(dataset?.particles)) {
    const particleIndex = dataset.particles.findIndex(
      (particle) => normalizeString(particle?.id) === emitterId
    );
    if (particleIndex >= 0) {
      return candidates[particleIndex % candidates.length] ?? null;
    }
  }

  return null;
}

export function createAnimatorFieldShellInstance(baseShell = {}, instance = {}) {
  const instanceId = normalizeString(instance.id, "instance");
  const baseId = normalizeString(baseShell.id, "field_shell");
  const emitterId = normalizeString(instance.emitterId, baseShell.emitterId ?? baseShell.emitter);
  const sign = normalizeNumber(instance.sign, getAnimatorFieldShellSign(baseShell));
  return {
    ...baseShell,
    id: `${baseId}_${instanceId}`,
    emitterId,
    emissionPosition: normalizeVector(instance.emissionPosition ?? baseShell.emissionPosition ?? baseShell.position),
    sign,
    metadata: {
      ...(baseShell.metadata && typeof baseShell.metadata === "object" ? baseShell.metadata : {}),
      ...(instance.metadata && typeof instance.metadata === "object" ? instance.metadata : {}),
      sourceFieldShellId: baseId,
      sourceEmitterId: normalizeString(baseShell.emitterId ?? baseShell.emitter),
      fixedEmissionPosition: true,
    },
  };
}

export function getAnimatorFieldShellFieldSpeed(shell = {}, dataset = {}, options = {}) {
  const explicitSpeed = normalizeNumber(shell.fieldSpeed ?? shell.speed, 0);
  if (explicitSpeed > 0) {
    return explicitSpeed;
  }
  const displayTime = normalizeNumber(shell.displayTime, NaN);
  const emissionTime = normalizeNumber(shell.emissionTime, 0);
  const radius = normalizeNumber(shell.radius, 0);
  if (Number.isFinite(displayTime) && displayTime > emissionTime && radius > 0) {
    return radius / (displayTime - emissionTime);
  }
  const datasetSpeed = normalizeNumber(
    dataset?.simulation?.fieldSpeed ??
      dataset?.simulation?.cf ??
      dataset?.simulation?.solver?.cf,
    0
  );
  if (datasetSpeed > 0) {
    return datasetSpeed;
  }
  return normalizeNumber(options.fieldSpeed, DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.fieldSpeed) || 1;
}

export function getAnimatorFieldShellRadiusAtTime(
  shell = {},
  timeSeconds = 0,
  dataset = {},
  options = {}
) {
  const time = normalizeNumber(timeSeconds, 0);
  const emissionTime = normalizeNumber(shell.emissionTime, 0);
  const age = time - emissionTime;
  if (age < 0) {
    return 0;
  }
  return Math.max(0, age * getAnimatorFieldShellFieldSpeed(shell, dataset, options));
}

export function getAnimatorFieldShellBaseOpacity(shell = {}) {
  const styleOpacity = normalizeNumber(getShellStyle(shell).opacity ?? shell.opacity, NaN);
  if (Number.isFinite(styleOpacity)) {
    return Math.max(0, Math.min(1, styleOpacity));
  }
  const strength = Math.abs(normalizeNumber(shell.strength, 0));
  return Math.max(0.035, Math.min(0.16, 0.045 + strength * 0.14));
}

export function getAnimatorFieldShellOpacityAtTime(
  shell = {},
  timeSeconds = 0,
  dataset = {},
  options = {}
) {
  const time = normalizeNumber(timeSeconds, 0);
  const emissionTime = normalizeNumber(shell.emissionTime, 0);
  const age = time - emissionTime;
  if (age < 0) {
    return 0;
  }
  const fadeInSeconds = Math.max(
    0,
    normalizeNumber(options.fadeInSeconds, DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.fadeInSeconds)
  );
  const fadeOutSeconds = Math.max(
    0.001,
    normalizeNumber(options.fadeOutSeconds, DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.fadeOutSeconds)
  );
  const fallbackLifetime = Math.max(
    0.001,
    normalizeNumber(options.lifetimeSeconds, DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.lifetimeSeconds)
  );
  const fadeIn = fadeInSeconds > 0 ? Math.min(1, age / fadeInSeconds) : 1;
  const opacityScale = Math.max(
    0,
    normalizeNumber(options.opacityScale, DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.opacityScale)
  );
  if (isContinuousExpansionShell(shell)) {
    const ageOpacityScale = getContinuousExpansionOpacityScale(age, options);
    return Math.max(
      0,
      Math.min(1, getAnimatorFieldShellBaseOpacity(shell) * fadeIn * ageOpacityScale * opacityScale)
    );
  }
  const displayTime = normalizeNumber(shell.displayTime, emissionTime + fallbackLifetime);
  const fadeOutStart = Math.max(emissionTime, displayTime);
  const visibleUntil = fadeOutStart + fadeOutSeconds;
  if (time > visibleUntil) {
    return 0;
  }
  const fadeOut = time > fadeOutStart ? Math.max(0, 1 - (time - fadeOutStart) / fadeOutSeconds) : 1;
  return Math.max(0, Math.min(1, getAnimatorFieldShellBaseOpacity(shell) * fadeIn * fadeOut * opacityScale));
}

export function getAnimatorFieldShellRenderState(
  shell = {},
  timeSeconds = 0,
  dataset = {},
  options = {}
) {
  const radius = getAnimatorFieldShellRadiusAtTime(shell, timeSeconds, dataset, options);
  const opacity = getAnimatorFieldShellOpacityAtTime(shell, timeSeconds, dataset, options);
  const minVisibleRadius = Math.max(
    0,
    normalizeNumber(options.minVisibleRadius, DEFAULT_ANIMATOR_FIELD_SHELL_OPTIONS.minVisibleRadius)
  );
  return {
    id: shell.id ?? "",
    center: normalizeVector(options.centerOverride ?? shell.emissionPosition ?? shell.position),
    radius,
    color: getAnimatorFieldShellColor(shell),
    opacity,
    visible: radius >= minVisibleRadius && opacity > 0,
  };
}
