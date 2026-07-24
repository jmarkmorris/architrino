export const BORG_HISTORICAL_RELEASE_BUDGET_MANIFEST_VERSION =
  "borg-release-budget-manifest.v1";
export const BORG_RELEASE_BUDGET_DISPOSITION_VERSION =
  "borg-release-budget-disposition.v1";

export const BORG_RELEASE_BUDGET_DISPOSITION_V1 = Object.freeze({
  schema: BORG_RELEASE_BUDGET_DISPOSITION_VERSION,
  dispositionId: "borg-release-budget-disposition-2026-07-24-eom-v1",
  sourceManifestId: "borg-release-budget-manifest-2026-07-01-iab-v1",
  sourceManifestSchema: BORG_HISTORICAL_RELEASE_BUDGET_MANIFEST_VERSION,
  claimLevel: "developer-test-surface-budget-disposition",
  valueAuthority: "historical-browser-runtime-measurement-disposition",
  status: "superseded-non-eom-measurement",
  appliesToCurrentEomSurface: false,
  sourceSweepArtifactId: "borg-preset-calibration-sweep-2026-07-01-iab-v1",
  sourceSweepSchema: "borg-preset-calibration-sweep.v1",
  browserSurface: "Codex in-app browser",
  legacySolverContract: Object.freeze({
    appId: "borg",
    runKind: "masterEquation",
    motionAuthority: "non-eom-display-only",
    disposition:
      "Historical measurement from the deleted pre-EOM solver path; not reusable as an EOM runtime ceiling.",
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
  currentEomReleaseBudgetCeilings: null,
  observedHistoricalExtrema: Object.freeze({
    maxChunkWallTimeMs: 85.1,
    minAppendRowsPerSecond: 24260,
    maxChunkWorkerMemoryBytes: 737400,
    maxChunkHeapGrowthBytes: 4225000,
    minTargetDurationLimit: 510.108382,
    maxTargetDurationLimit: 2988,
    maxMeasuredChunkDuration: 50,
  }),
  separatedDeploymentBudgetStatus: Object.freeze({
    historicalBrowserHeapGrowth: "measured-by-legacy-release-sweep",
    historicalWorkerMemory: "measured-by-legacy-release-sweep",
    historicalFrameAppendRate: "measured-by-legacy-release-sweep",
    historicalChunkWallTime: "measured-by-legacy-release-sweep",
    bundleSizeBytes: "not-measured-by-this-disposition",
    staticAssetTransferBytes: "not-measured-by-this-disposition",
    githubPagesBandwidthEstimate: "not-measured-by-this-disposition",
    gpuMemoryBudget: "not-measured-by-this-disposition",
    browserStorageBudget: "not-measured-by-this-disposition",
    actionsArtifactBudget: "not-measured-by-this-disposition",
    eomSolverThroughput: "not-measured-by-this-disposition",
  }),
  releaseDecision: Object.freeze({
    status: "not-applicable-to-current-eom-surface",
    defaultPolicy:
      "Do not apply this legacy sweep to EOM runs. Calibrate current limits only from measured EOM chunks.",
    claimBoundary:
      "This disposition preserves the deleted solver measurement as history. It establishes no current EOM runtime ceiling or physics claim.",
  }),
});

export function validateBorgReleaseBudgetDisposition(
  disposition = BORG_RELEASE_BUDGET_DISPOSITION_V1,
) {
  const failures = [];
  if (disposition?.schema !== BORG_RELEASE_BUDGET_DISPOSITION_VERSION) {
    failures.push("schema");
  }
  if (disposition?.sourceManifestSchema !==
      BORG_HISTORICAL_RELEASE_BUDGET_MANIFEST_VERSION) {
    failures.push("sourceManifestSchema");
  }
  if (disposition?.status !== "superseded-non-eom-measurement") {
    failures.push("status");
  }
  if (disposition?.claimLevel !== "developer-test-surface-budget-disposition") {
    failures.push("claimLevel");
  }
  if (disposition?.valueAuthority !==
      "historical-browser-runtime-measurement-disposition") {
    failures.push("valueAuthority");
  }
  if (
    disposition?.legacySolverContract?.motionAuthority !==
      "non-eom-display-only" ||
    disposition?.appliesToCurrentEomSurface !== false
  ) {
    failures.push("legacySolverContract/applicability");
  }
  if (disposition?.sampleMatrix?.sampleCount !== 9) {
    failures.push("sampleMatrix.sampleCount");
  }
  if (disposition?.currentEomReleaseBudgetCeilings !== null) {
    failures.push("currentEomReleaseBudgetCeilings");
  }
  if (disposition?.releaseDecision?.status !==
      "not-applicable-to-current-eom-surface") {
    failures.push("releaseDecision.status");
  }
  if (failures.length > 0) {
    throw new Error(
      `Invalid ${BORG_RELEASE_BUDGET_DISPOSITION_VERSION}: ${failures.join(", ")}`,
    );
  }
  return true;
}
