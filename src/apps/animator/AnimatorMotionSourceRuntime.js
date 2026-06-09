function normalizeString(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function normalizeSource(value) {
  return normalizeString(value, "").toLowerCase();
}

function getMotionEntries(assembly = {}) {
  return Array.isArray(assembly?.motion)
    ? assembly.motion
    : assembly?.motion
      ? [assembly.motion]
      : [];
}

export function normalizeAnimatorMotionSourceKind(value) {
  const source = normalizeSource(value);
  if (source === "solver-derived" || source === "simulation" || source === "simulation.frames") {
    return "solver-derived";
  }
  if (source === "authored" || source === "manual" || source === "path.transport") {
    return "authored";
  }
  if (source === "mixed") {
    return "mixed";
  }
  return "";
}

export function isAnimatorSolverDerivedMotionSource(value) {
  return normalizeAnimatorMotionSourceKind(value) === "solver-derived";
}

export function combineAnimatorMotionSourceKinds(sourceKinds = []) {
  const normalized = sourceKinds
    .map((kind) => normalizeAnimatorMotionSourceKind(kind) || normalizeSource(kind))
    .filter(Boolean);
  const hasSolver = normalized.includes("solver-derived");
  const hasAuthored = normalized.includes("authored");
  if (hasSolver && hasAuthored) {
    return "mixed";
  }
  if (hasSolver) {
    return "solver-derived";
  }
  if (hasAuthored) {
    return "authored";
  }
  return "static";
}

export function getAnimatorAssemblyMotionSourceKind(assembly = {}) {
  const explicitSource = normalizeAnimatorMotionSourceKind(assembly?.metadata?.motionSource);
  const motions = getMotionEntries(assembly);
  const hasSimulationFrameMotion = motions.some((motion) =>
    normalizeSource(motion?.type).startsWith("simulation.")
  );
  const hasAuthoredTransportMotion = motions.some((motion) => motion?.type === "path.transport");
  if (explicitSource === "mixed" || (hasSimulationFrameMotion && hasAuthoredTransportMotion)) {
    return "mixed";
  }
  if (explicitSource === "solver-derived" || hasSimulationFrameMotion) {
    return "solver-derived";
  }
  if (explicitSource === "authored" || hasAuthoredTransportMotion) {
    return "authored";
  }
  return "static";
}

export function getAnimatorPathMotionSourceKind(path = {}) {
  const explicitSource = normalizeAnimatorMotionSourceKind(path?.metadata?.motionSource);
  if (explicitSource) {
    return explicitSource;
  }
  const kind = normalizeSource(path?.kind);
  if (kind.startsWith("simulation.") || kind.includes("solver")) {
    return "solver-derived";
  }
  const points = path?.payload?.points ?? path?.points;
  return Array.isArray(points) && points.length ? "authored" : "static";
}

export function getAnimatorHistoryTraceMotionSourceKind(historyTrace = {}) {
  return combineAnimatorMotionSourceKinds([
    normalizeAnimatorMotionSourceKind(historyTrace?.kind),
    normalizeAnimatorMotionSourceKind(historyTrace?.source?.type),
  ]);
}

export function isAnimatorMotionSourceVisible(sourceKind = "static", displayState = {}) {
  const normalized = normalizeAnimatorMotionSourceKind(sourceKind) || normalizeSource(sourceKind);
  if (normalized === "mixed") {
    return displayState.showSolverMotion !== false || displayState.showAuthoredMotion !== false;
  }
  if (normalized === "solver-derived") {
    return displayState.showSolverMotion !== false;
  }
  if (normalized === "authored") {
    return displayState.showAuthoredMotion !== false;
  }
  return true;
}

export function summarizeAnimatorMotionSources(documentData = {}) {
  const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
  const paths = Array.isArray(documentData?.paths) ? documentData.paths : [];
  const historyTraces = Array.isArray(documentData?.historyTraces)
    ? documentData.historyTraces
    : [];
  const dataset = documentData?.metadata?.simulationDataset ?? null;
  const hasSimulationDataset = !!(dataset && typeof dataset === "object");
  const hasSolverAssembly = assemblies.some(
    (assembly) =>
      isAnimatorSolverDerivedMotionSource(assembly?.metadata?.motionSource) ||
      getMotionEntries(assembly).some((motion) => normalizeSource(motion?.type).startsWith("simulation."))
  );
  const hasSolverPath = paths.some((path) =>
    isAnimatorSolverDerivedMotionSource(path?.metadata?.motionSource)
  );
  const hasSolverTrace = historyTraces.some(
    (trace) =>
      isAnimatorSolverDerivedMotionSource(trace?.kind) ||
      isAnimatorSolverDerivedMotionSource(trace?.source?.type)
  );
  const hasAuthoredMotion = assemblies.some((assembly) =>
    getMotionEntries(assembly).some(
      (motion) =>
        motion?.type === "path.transport" &&
        !isAnimatorSolverDerivedMotionSource(assembly?.metadata?.motionSource)
    )
  );
  const hasSolverMotion =
    hasSimulationDataset || hasSolverAssembly || hasSolverPath || hasSolverTrace;
  const sourceKind =
    hasSolverMotion && hasAuthoredMotion
      ? "mixed"
      : hasSolverMotion
        ? "solver-derived"
        : hasAuthoredMotion
          ? "authored"
          : "static";
  const claimLevel = normalizeString(dataset?.claimLevel ?? documentData?.metadata?.claimLevel, "");
  const engineId = normalizeString(dataset?.provenance?.engine?.id, "");

  return {
    sourceKind,
    label:
      sourceKind === "mixed"
        ? "Motion: Mixed"
        : sourceKind === "solver-derived"
          ? "Motion: Solver-derived"
          : sourceKind === "authored"
            ? "Motion: Authored"
            : "Motion: Static",
    detail: [
      claimLevel ? `Claim: ${claimLevel}` : "",
      engineId ? `Engine: ${engineId}` : "",
    ]
      .filter(Boolean)
      .join(" | "),
    hasSimulationDataset,
    hasSolverMotion,
    hasAuthoredMotion,
  };
}
