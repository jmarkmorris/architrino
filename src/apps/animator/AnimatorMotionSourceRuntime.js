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

function isSolverDerivedMotionSource(value) {
  const source = normalizeSource(value);
  return source === "solver-derived" || source === "simulation" || source === "simulation.frames";
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
      isSolverDerivedMotionSource(assembly?.metadata?.motionSource) ||
      getMotionEntries(assembly).some((motion) => normalizeSource(motion?.type).startsWith("simulation."))
  );
  const hasSolverPath = paths.some((path) =>
    isSolverDerivedMotionSource(path?.metadata?.motionSource)
  );
  const hasSolverTrace = historyTraces.some(
    (trace) =>
      isSolverDerivedMotionSource(trace?.kind) ||
      isSolverDerivedMotionSource(trace?.source?.type)
  );
  const hasAuthoredMotion = assemblies.some((assembly) =>
    getMotionEntries(assembly).some(
      (motion) =>
        motion?.type === "path.transport" &&
        !isSolverDerivedMotionSource(assembly?.metadata?.motionSource)
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
