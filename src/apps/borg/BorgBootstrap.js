import { mountBorgApp } from "./BorgAppRuntime.js";
import { createBorgEomHttpClient } from "./BorgEomHttpClient.js";
import { BORG_DATASET_MANIFEST_V1 } from "./BorgAppManifest.js";
import {
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "./BorgInitialConditions.js";

export const BORG_DEFAULT_RUNTIME_MODE = "eom-shadow";
export const BORG_RECORD_REPLAY_RUNTIME_MODE = "eom-record-replay";

export async function bootBorgApp({
  search = globalThis.location?.search ?? "",
  mountApp = mountBorgApp,
  createEomClient = createBorgEomHttpClient,
  manifest = BORG_DATASET_MANIFEST_V1,
  fetchLike = globalThis.fetch,
} = {}) {
  const query = new URLSearchParams(search);
  const runtimeMode = resolveBorgRuntimeMode(query);
  if (runtimeMode === BORG_RECORD_REPLAY_RUNTIME_MODE) {
    const recordUrl = query.get("eomRecord");
    const response = await fetchLike(recordUrl);
    if (!response?.ok) {
      throw new Error(
        `Borg EOM record fetch failed (${response?.status ?? "no response"}): ${recordUrl}`,
      );
    }
    const record = await response.json();
    return mountApp({
      manifest,
      eomRecordReplay: { record },
    });
  }

  const eomStartTime = 0;
  const eomDuration = queryPositiveNumber(query.get("eomDuration"), 60);
  const initialConditionConfig = createBorgInitialConditionConfig(manifest.initialConditions);
  const fullPopulationEndpointRows = createBorgSeededInitialConditionRows({
    manifest,
    seedIndex: 0,
    config: initialConditionConfig,
  });
  const endpointRows = fullPopulationEndpointRows;
  const activeInitialConditionConfig = Object.freeze({
    ...initialConditionConfig,
    electrinoCount: endpointRows.filter((row) => row.stateFlags === 2).length,
    positrinoCount: endpointRows.filter((row) => row.stateFlags === 1).length,
  });
  const sampleInterval = 0.01;
  const historyDepth = calculateBorgInertialHistoryDepth(endpointRows, {
    fieldSpeed: manifest.simulationEnvelope?.fieldSpeed ?? 1,
    sampleInterval,
    maximumSeparation: 2 * manifest.simulationEnvelope.outerRadius,
  });
  const runtimeManifest = createManifestWithHistoryDepth(manifest, historyDepth);
  const initialEomSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: eomStartTime - historyDepth,
    historyEndTime: eomStartTime,
    minimumPairSeparation: manifest.initialConditions.minimumPairSeparation,
  });
  return mountApp({
    manifest: runtimeManifest,
    initialEomSeed,
    initialConditionConfig: activeInitialConditionConfig,
    // Ordinary Borg startup must stay interactive. The long retained-history
    // evolution is an explicit diagnostic action, not page-load work.
    autoStartEom: query.get("eom") === "shadow",
    eomShadowRunner: {
      eomClient: createEomClient(),
      startTime: eomStartTime,
      targetDuration: eomStartTime + eomDuration,
      runDuration: eomDuration,
      historyDepth,
      pathCount: endpointRows.length,
      chunkDuration: 0.05,
      sampleInterval,
      // Operator-selected run-length preference (2026-07-16 three-seed
      // ladder): the 0.025 ceiling survives encounters longer than 0.05
      // (seed 1 completes t=2.0 at 0.025 but halts t=1.11 at 0.05) at
      // ~3x the smooth-phase chunk cost. Encounter rejections may shrink
      // to the unchanged floor; two consecutive accepted steps with
      // 1/8-budget headroom allow recovery to the ceiling.
      initialStep: "0.025",
      minimumStep: "0.0001",
      maximumStep: "0.025",
      useAdaptiveStepGrowth: true,
      runGrade: "display",
      rootTolerance: "1e-3",
      accelerationTolerance: "1e-1",
      farFieldEnclosureFraction: "0.25",
      positionTolerance: "1e-2",
      velocityTolerance: "1e-2",
      correctionTolerance: "1e-1",
      coupling: String(runtimeManifest.modelControls.coupling),
      threadCount: 4,
    },
  });
}

function createManifestWithHistoryDepth(manifest, historyDepth) {
  const fieldSpeed = manifest.simulationEnvelope?.fieldSpeed ?? 1;
  return Object.freeze({
    ...manifest,
    simulationEnvelope: Object.freeze({
      ...manifest.simulationEnvelope,
      historyDepth,
      wakeHorizon: fieldSpeed * historyDepth,
    }),
  });
}

export function resolveBorgRuntimeMode(queryOrSearch = "") {
  const query = queryOrSearch instanceof URLSearchParams
    ? queryOrSearch
    : new URLSearchParams(queryOrSearch);
  if (query.get("eomRecord")) {
    return BORG_RECORD_REPLAY_RUNTIME_MODE;
  }
  return BORG_DEFAULT_RUNTIME_MODE;
}

function queryPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}
