const DEFAULT_FRAMING_PRESET = "medium";
const DEFAULT_AUTOSCALE_MODE = "keep_required";
const DEFAULT_ASSEMBLY_POLICY = "optional";

function normalizeAssemblyIdList(value) {
  const source = Array.isArray(value) ? value : [];
  return source
    .map((entry) => String(entry ?? "").trim())
    .filter(Boolean);
}

function toVector3(source) {
  return {
    x: Number(source?.x ?? source?.[0] ?? 0) || 0,
    y: Number(source?.y ?? source?.[1] ?? 0) || 0,
    z: Number(source?.z ?? source?.[2] ?? 0) || 0,
  };
}

function addVec3(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function subVec3(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function scaleVec3(vector, scalar) {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar,
  };
}

function lengthVec3(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalizeVec3(vector, fallback = { x: 0, y: 0, z: -1 }) {
  const magnitude = lengthVec3(vector);
  if (magnitude <= 0.000001) {
    return { ...fallback };
  }
  return scaleVec3(vector, 1 / magnitude);
}

export function normalizeAnimatorViewportFraming(rawFraming) {
  if (typeof rawFraming === "string") {
    return {
      preset: rawFraming || DEFAULT_FRAMING_PRESET,
      autoscale: DEFAULT_AUTOSCALE_MODE,
      defaultAssemblyPolicy: DEFAULT_ASSEMBLY_POLICY,
      requiredAssemblyIds: [],
      optionalAssemblyIds: [],
    };
  }
  const source = rawFraming && typeof rawFraming === "object" ? rawFraming : {};
  return {
    preset: String(source.preset ?? source.kind ?? source.mode ?? DEFAULT_FRAMING_PRESET).trim() || DEFAULT_FRAMING_PRESET,
    autoscale:
      String(source.autoscale ?? source.autoscaleMode ?? DEFAULT_AUTOSCALE_MODE).trim() ||
      DEFAULT_AUTOSCALE_MODE,
    defaultAssemblyPolicy:
      String(source.defaultAssemblyPolicy ?? DEFAULT_ASSEMBLY_POLICY).trim() || DEFAULT_ASSEMBLY_POLICY,
    requiredAssemblyIds: normalizeAssemblyIdList(source.requiredAssemblyIds ?? source.keepInViewAssemblies),
    optionalAssemblyIds: normalizeAssemblyIdList(
      source.optionalAssemblyIds ?? source.allowOffscreenAssemblyIds ?? source.mayLeaveViewportAssemblies
    ),
  };
}

export function resolveAnimatorShotInterval(shot, timeWindow) {
  const timing = shot?.timing ?? {};
  const start = Number(timing.start ?? timeWindow.start);
  const fadeIn = Math.max(0, Number(timing.fadeIn ?? 0));
  const hold = Math.max(0, Number(timing.hold ?? 0));
  const fadeOut = Math.max(0, Number(timing.fadeOut ?? 0));
  const end = start + fadeIn + hold + fadeOut;
  return {
    start,
    end: Math.max(start, end),
  };
}

export function normalizeAnimatorCameraShots(rawCameraShots, cameraPathId, start, end) {
  const source = Array.isArray(rawCameraShots) && rawCameraShots.length
    ? rawCameraShots
    : cameraPathId
      ? [
          {
            id: "shot_main",
            timing: {
              start,
              fadeIn: 0,
              hold: Math.max(0, end - start),
              fadeOut: 0,
            },
            cameraPath: cameraPathId,
            kind: "follow",
            framing: DEFAULT_FRAMING_PRESET,
          },
        ]
      : [];

  return source.map((shot, index) => ({
    ...shot,
    id: String(shot?.id ?? `shot_${index + 1}`).trim() || `shot_${index + 1}`,
    framing: normalizeAnimatorViewportFraming(shot?.framing),
  }));
}

export function getAnimatorActiveCameraShot(documentData, timeSeconds, timeWindow) {
  const shots = Array.isArray(documentData?.cameraShots) ? documentData.cameraShots : [];
  const resolvedWindow =
    timeWindow && typeof timeWindow === "object"
      ? timeWindow
      : {
          start: Number(documentData?.scene?.time?.start ?? 0),
          end: Number(documentData?.scene?.time?.end ?? 24),
        };
  return (
    shots.find((shot) => {
      const interval = resolveAnimatorShotInterval(shot, resolvedWindow);
      return timeSeconds >= interval.start && timeSeconds <= interval.end;
    }) ?? null
  );
}

export function getAnimatorActiveCameraPathId(documentData, timeSeconds, timeWindow) {
  const activeShot = getAnimatorActiveCameraShot(documentData, timeSeconds, timeWindow);
  if (activeShot?.cameraPath) {
    return activeShot.cameraPath;
  }
  const explicitPathId = String(documentData?.scene?.view?.activeCameraPath ?? "").trim();
  if (explicitPathId) {
    return explicitPathId;
  }
  const cameraPaths = Array.isArray(documentData?.cameraPaths) ? documentData.cameraPaths : [];
  return cameraPaths[0]?.id ?? null;
}

export function getAnimatorAssemblyViewportPolicy(assembly) {
  const viewport =
    assembly?.view?.viewport ??
    assembly?.metadata?.viewport ??
    null;
  const explicitPolicy = String(
    viewport?.policy ??
      viewport?.framingPolicy ??
      viewport?.participation ??
      ""
  )
    .trim()
    .toLowerCase();
  if (explicitPolicy === "required" || explicitPolicy === "keep_in_view" || explicitPolicy === "keep-in-view") {
    return "required";
  }
  if (explicitPolicy === "optional" || explicitPolicy === "allow_offscreen" || explicitPolicy === "allow-offscreen") {
    return "optional";
  }
  if (viewport?.keepInView === true) {
    return "required";
  }
  if (viewport?.allowOffscreen === true) {
    return "optional";
  }
  return DEFAULT_ASSEMBLY_POLICY;
}

export function resolveAnimatorViewportFramingState(documentData, timeSeconds, timeWindow) {
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const activeShot = getAnimatorActiveCameraShot(documentData, timeSeconds, timeWindow);
  const framing = normalizeAnimatorViewportFraming(activeShot?.framing);
  const requiredAssemblyIds = new Set();
  const optionalAssemblyIds = new Set();

  assemblies.forEach((assembly) => {
    const assemblyId = String(assembly?.id ?? "").trim();
    if (!assemblyId) {
      return;
    }
    if (getAnimatorAssemblyViewportPolicy(assembly) === "required") {
      requiredAssemblyIds.add(assemblyId);
    } else {
      optionalAssemblyIds.add(assemblyId);
    }
  });

  if (framing.defaultAssemblyPolicy === "required") {
    optionalAssemblyIds.forEach((assemblyId) => {
      requiredAssemblyIds.add(assemblyId);
    });
    optionalAssemblyIds.clear();
  }

  framing.requiredAssemblyIds.forEach((assemblyId) => {
    requiredAssemblyIds.add(assemblyId);
    optionalAssemblyIds.delete(assemblyId);
  });
  framing.optionalAssemblyIds.forEach((assemblyId) => {
    requiredAssemblyIds.delete(assemblyId);
    optionalAssemblyIds.add(assemblyId);
  });

  return {
    shot: activeShot,
    cameraPathId: getAnimatorActiveCameraPathId(documentData, timeSeconds, timeWindow),
    framing,
    requiredAssemblyIds: [...requiredAssemblyIds],
    optionalAssemblyIds: [...optionalAssemblyIds],
  };
}

export function getAnimatorViewportAutoscaleTargetIds(state, allAssemblyIds = []) {
  const mode = String(state?.framing?.autoscale ?? DEFAULT_AUTOSCALE_MODE)
    .trim()
    .toLowerCase();
  if (mode === "manual" || mode === "off" || mode === "disabled") {
    return [];
  }

  const requiredIds = Array.isArray(state?.requiredAssemblyIds) ? state.requiredAssemblyIds.filter(Boolean) : [];
  if (requiredIds.length) {
    return [...new Set(requiredIds)];
  }

  return [];
}

export function computeAnimatorViewportAutoscaleCameraState({
  cameraState,
  targetSpheres,
  verticalFovDegrees = 45,
  aspect = 1,
  padding = 1.15,
  onlyExpand = true,
} = {}) {
  const sourceTargets = Array.isArray(targetSpheres)
    ? targetSpheres.filter((target) => Number(target?.radius ?? 0) >= 0)
    : [];
  if (!cameraState || sourceTargets.length === 0) {
    return null;
  }

  const position = toVector3(cameraState.position);
  const lookAt = toVector3(cameraState.lookAt);
  const forward = normalizeVec3(subVec3(lookAt, position));

  const centroid = scaleVec3(
    sourceTargets.reduce((sum, target) => addVec3(sum, toVector3(target?.center)), { x: 0, y: 0, z: 0 }),
    1 / sourceTargets.length
  );

  const combinedRadius = sourceTargets.reduce((maxRadius, target) => {
    const center = toVector3(target?.center);
    const radius = Math.max(0, Number(target?.radius ?? 0) || 0);
    return Math.max(maxRadius, lengthVec3(subVec3(center, centroid)) + radius);
  }, 0);

  if (!(combinedRadius > 0)) {
    return {
      position,
      lookAt: centroid,
      targetCenter: centroid,
      fittedRadius: 0,
      requiredDistance: lengthVec3(subVec3(lookAt, position)),
      targetIds: sourceTargets.map((target) => String(target?.id ?? "").trim()).filter(Boolean),
    };
  }

  const verticalHalfFov = (Math.max(1, Number(verticalFovDegrees) || 45) * Math.PI) / 360;
  const safeAspect = Math.max(0.2, Number(aspect) || 1);
  const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * safeAspect);
  const limitingHalfFov = Math.max(0.01, Math.min(verticalHalfFov, horizontalHalfFov));
  const requiredDistance = (combinedRadius * Math.max(1, Number(padding) || 1.15)) / Math.tan(limitingHalfFov);
  const currentDistance = lengthVec3(subVec3(lookAt, position));
  const finalDistance =
    onlyExpand && Number.isFinite(currentDistance) && currentDistance > 0
      ? Math.max(currentDistance, requiredDistance)
      : requiredDistance;
  const nextLookAt = centroid;
  const nextPosition = subVec3(nextLookAt, scaleVec3(forward, finalDistance));

  return {
    position: nextPosition,
    lookAt: nextLookAt,
    targetCenter: centroid,
    fittedRadius: combinedRadius,
    requiredDistance,
    targetIds: sourceTargets.map((target) => String(target?.id ?? "").trim()).filter(Boolean),
  };
}

export function formatAnimatorViewportFramingSummary(state) {
  const requiredCount = Array.isArray(state?.requiredAssemblyIds) ? state.requiredAssemblyIds.length : 0;
  const optionalCount = Array.isArray(state?.optionalAssemblyIds) ? state.optionalAssemblyIds.length : 0;
  const preset = state?.framing?.preset ?? DEFAULT_FRAMING_PRESET;
  const autoscale = state?.framing?.autoscale ?? DEFAULT_AUTOSCALE_MODE;
  return `${requiredCount} required • ${optionalCount} optional • ${preset} • ${autoscale}`;
}
