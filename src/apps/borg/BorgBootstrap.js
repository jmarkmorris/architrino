import { mountBorgApp } from "./BorgAppRuntime.js";
import { createBorgEomHttpClient } from "./BorgEomHttpClient.js";
import { BORG_DATASET_MANIFEST_V1 } from "./BorgFixtureData.js";
import {
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "./BorgInitialConditions.js";

export const BORG_DEFAULT_RUNTIME_MODE = "eom-shadow";
export const BORG_RECORD_REPLAY_RUNTIME_MODE = "eom-record-replay";
export const BORG_EOM_MIGRATION_PATH_COUNT = 8;

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
  const endpointRows = Object.freeze(
    fullPopulationEndpointRows.slice(0, BORG_EOM_MIGRATION_PATH_COUNT),
  );
  const activeInitialConditionConfig = Object.freeze({
    ...initialConditionConfig,
    electrinoCount: endpointRows.filter((row) => row.stateFlags === 2).length,
    positrinoCount: endpointRows.filter((row) => row.stateFlags === 1).length,
  });
  const sampleInterval = 0.01;
  const historyDepth = calculateBorgInertialHistoryDepth(endpointRows, {
    fieldSpeed: manifest.simulationEnvelope?.fieldSpeed ?? 1,
    sampleInterval,
  });
  const initialEomSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: eomStartTime - historyDepth,
    historyEndTime: eomStartTime,
  });
  return mountApp({
    manifest,
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
      pathCount: BORG_EOM_MIGRATION_PATH_COUNT,
      chunkDuration: 0.01,
      sampleInterval,
      initialStep: "0.01",
      minimumStep: "0.01",
      rootTolerance: "1e-3",
      accelerationTolerance: "1e-1",
      positionTolerance: "1e-2",
      velocityTolerance: "1e-2",
      correctionTolerance: "1e-1",
      threadCount: 4,
    },
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
