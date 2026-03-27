const DEFAULT_FRAMING_PRESET = "medium";
const DEFAULT_AUTOSCALE_MODE = "manual";
const DEFAULT_ASSEMBLY_POLICY = "optional";

function normalizeAssemblyIdList(value) {
  const source = Array.isArray(value) ? value : [];
  return source
    .map((entry) => String(entry ?? "").trim())
    .filter(Boolean);
}

export function normalizeComposerViewportFraming(rawFraming) {
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

export function resolveComposerShotInterval(shot, timeWindow) {
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

export function normalizeComposerCameraShots(rawCameraShots, cameraPathId, start, end) {
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
    framing: normalizeComposerViewportFraming(shot?.framing),
  }));
}

export function getComposerActiveCameraShot(documentData, timeSeconds, timeWindow) {
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
      const interval = resolveComposerShotInterval(shot, resolvedWindow);
      return timeSeconds >= interval.start && timeSeconds <= interval.end;
    }) ?? null
  );
}

export function getComposerActiveCameraPathId(documentData, timeSeconds, timeWindow) {
  const activeShot = getComposerActiveCameraShot(documentData, timeSeconds, timeWindow);
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

export function getComposerAssemblyViewportPolicy(assembly) {
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

export function resolveComposerViewportFramingState(documentData, timeSeconds, timeWindow) {
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const activeShot = getComposerActiveCameraShot(documentData, timeSeconds, timeWindow);
  const framing = normalizeComposerViewportFraming(activeShot?.framing);
  const requiredAssemblyIds = new Set();
  const optionalAssemblyIds = new Set();

  assemblies.forEach((assembly) => {
    const assemblyId = String(assembly?.id ?? "").trim();
    if (!assemblyId) {
      return;
    }
    if (getComposerAssemblyViewportPolicy(assembly) === "required") {
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
    cameraPathId: getComposerActiveCameraPathId(documentData, timeSeconds, timeWindow),
    framing,
    requiredAssemblyIds: [...requiredAssemblyIds],
    optionalAssemblyIds: [...optionalAssemblyIds],
  };
}

export function formatComposerViewportFramingSummary(state) {
  const requiredCount = Array.isArray(state?.requiredAssemblyIds) ? state.requiredAssemblyIds.length : 0;
  const optionalCount = Array.isArray(state?.optionalAssemblyIds) ? state.optionalAssemblyIds.length : 0;
  const preset = state?.framing?.preset ?? DEFAULT_FRAMING_PRESET;
  const autoscale = state?.framing?.autoscale ?? DEFAULT_AUTOSCALE_MODE;
  return `${requiredCount} required • ${optionalCount} optional • ${preset} • ${autoscale}`;
}
