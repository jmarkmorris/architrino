import { BORG_MEASURED_RUN_PRESET_LIMITS } from "./BorgMeasuredRunPresets.js";

export const BORG_RELEASE_BUDGET_MANIFEST_VERSION = "borg-release-budget-manifest.v1";

export const BORG_RELEASE_BUDGET_MANIFEST_V1 = Object.freeze({
  schema: BORG_RELEASE_BUDGET_MANIFEST_VERSION,
  manifestId: "borg-release-budget-manifest-2026-07-01-iab-v1",
  claimLevel: "developer-test-surface-budget",
  valueAuthority: "measured-browser-runtime-budget",
  status: "release-ceilings-decided",
  sourceSweepArtifactId: "borg-preset-calibration-sweep-2026-07-01-iab-v1",
  sourceSweepSchema: "borg-preset-calibration-sweep.v1",
  browserSurface: "Codex in-app browser",
  nativeSolverContract: Object.freeze({
    appId: "borg",
    runKind: "masterEquation",
    motionAuthority: "non-eom-display-only",
    releaseBudgetAuthority: "browser runtime measurement only",
  }),
  sampleMatrix: Object.freeze({
    viewportCount: 3,
    presetCount: 3,
    sampleCount: 9,
  }),
  measuredFields: Object.freeze([
    "lastChunkWallTimeMs",
    "computedFrameRows",
    "appendedFrameRows",
    "frameAppendRateRowsPerSecond",
    "browserHeapGrowthBytes",
    "wasmWorkerMemoryEstimateBytes",
    "workerBudgetPressure",
    "targetDurationLimit",
    "chunkDurationLimit",
  ]),
  releaseBudgetCeilings: BORG_MEASURED_RUN_PRESET_LIMITS,
  observedExtrema: Object.freeze({
    maxChunkWallTimeMs: 85.1,
    minAppendRowsPerSecond: 24260,
    maxChunkWorkerMemoryBytes: 737400,
    maxChunkHeapGrowthBytes: 4225000,
    minTargetDurationLimit: 510.108382,
    maxTargetDurationLimit: 2988,
    maxMeasuredChunkDuration: 50,
  }),
  separatedDeploymentBudgetStatus: Object.freeze({
    liveRunBrowserHeapGrowth: "measured-by-release-sweep",
    liveRunWorkerMemory: "measured-by-release-sweep",
    liveRunFrameAppendRate: "measured-by-release-sweep",
    liveRunChunkWallTime: "measured-by-release-sweep",
    bundleSizeBytes: "not-measured-by-this-manifest",
    staticAssetTransferBytes: "not-measured-by-this-manifest",
    githubPagesBandwidthEstimate: "not-measured-by-this-manifest",
    gpuMemoryBudget: "not-measured-by-this-manifest",
    browserStorageBudget: "not-measured-by-this-manifest",
    actionsArtifactBudget: "not-measured-by-this-manifest",
    nativeSolverThroughput: "not-measured-by-this-manifest",
  }),
  releaseDecision: Object.freeze({
    status: "accepted-for-developer-test-release",
    defaultPolicy:
      "Use measured preset calibration at runtime and expose compact threshold authority in the deployment budget drawer.",
    chunkDurationDecision:
      "Do not exceed the measured 50 solver-time-unit chunk preset for this release budget.",
    claimBoundary:
      "This manifest decides Borg browser/runtime budget ceilings only. It does not upgrade central-volume acceleration, wake history, face-boundary replay, benign-noise status, or proof claim authority.",
  }),
});

const REQUIRED_RELEASE_CEILING_KEYS = Object.freeze([
  "maxChunkWallTimeMs",
  "minFrameAppendRateRowsPerSecond",
  "maxChunkWorkerMemoryBytes",
  "maxRunWorkerMemoryBytes",
  "maxChunkHeapGrowthBytes",
  "maxRunHeapGrowthBytes",
  "maxRunFrameRows",
  "minTargetDuration",
  "maxTargetDuration",
  "minChunkDuration",
  "maxChunkDuration",
]);

export function validateBorgReleaseBudgetManifest(
  manifest = BORG_RELEASE_BUDGET_MANIFEST_V1,
) {
  const failures = [];
  if (manifest?.schema !== BORG_RELEASE_BUDGET_MANIFEST_VERSION) {
    failures.push("schema");
  }
  if (manifest?.status !== "release-ceilings-decided") {
    failures.push("status");
  }
  if (manifest?.claimLevel !== "developer-test-surface-budget") {
    failures.push("claimLevel");
  }
  if (manifest?.valueAuthority !== "measured-browser-runtime-budget") {
    failures.push("valueAuthority");
  }
  if (
    manifest?.nativeSolverContract?.motionAuthority !==
    "non-eom-display-only"
  ) {
    failures.push("nativeSolverContract.motionAuthority");
  }
  if (manifest?.sampleMatrix?.sampleCount !== 9) {
    failures.push("sampleMatrix.sampleCount");
  }
  REQUIRED_RELEASE_CEILING_KEYS.forEach((key) => {
    if (manifest?.releaseBudgetCeilings?.[key] !== BORG_MEASURED_RUN_PRESET_LIMITS[key]) {
      failures.push(`releaseBudgetCeilings.${key}`);
    }
  });
  if (manifest?.releaseBudgetCeilings?.maxChunkDuration !== 50) {
    failures.push("releaseBudgetCeilings.maxChunkDuration");
  }
  if (manifest?.releaseDecision?.status !== "accepted-for-developer-test-release") {
    failures.push("releaseDecision.status");
  }
  if (failures.length > 0) {
    throw new Error(
      `Invalid ${BORG_RELEASE_BUDGET_MANIFEST_VERSION}: ${failures.join(", ")}`,
    );
  }
  return true;
}
