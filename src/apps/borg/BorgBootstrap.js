import { mountBorgApp } from "./BorgAppRuntime.js";
import { createBorgEomHttpClient } from "./BorgEomHttpClient.js";
import { BORG_DATASET_MANIFEST_V1 } from "./BorgFixtureData.js";
import {
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "./BorgInitialConditions.js";

export const BORG_DEFAULT_RUNTIME_MODE = "eom-shadow";
export const BORG_COMPATIBILITY_RUNTIME_MODE = "central-solver-compatibility";

export async function bootBorgApp({
  search = globalThis.location?.search ?? "",
  mountApp = mountBorgApp,
  createEomClient = createBorgEomHttpClient,
  manifest = BORG_DATASET_MANIFEST_V1,
} = {}) {
  const query = new URLSearchParams(search);
  if (resolveBorgRuntimeMode(query) === BORG_COMPATIBILITY_RUNTIME_MODE) {
    return mountApp({});
  }

  const eomStartTime = 0;
  const eomDuration = queryPositiveNumber(query.get("eomDuration"), 60);
  const historyDepth = Number(manifest.simulationEnvelope?.historyDepth ?? 10);
  const initialConditionConfig = createBorgInitialConditionConfig(manifest.initialConditions);
  const endpointRows = createBorgSeededInitialConditionRows({
    manifest,
    seedIndex: 0,
    config: initialConditionConfig,
  });
  const initialEomSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: eomStartTime - historyDepth,
    historyEndTime: eomStartTime,
  });
  return mountApp({
    manifest,
    initialEomSeed,
    eomShadowRunner: {
      eomClient: createEomClient(),
      startTime: eomStartTime,
      targetDuration: eomStartTime + historyDepth + eomDuration,
      runDuration: eomDuration,
      burnInDuration: historyDepth,
      historyDepth,
      pathCount: 16,
      chunkDuration: 0.01,
      sampleInterval: 0.01,
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
  return query.get("eom") === "compatibility"
    ? BORG_COMPATIBILITY_RUNTIME_MODE
    : BORG_DEFAULT_RUNTIME_MODE;
}

function queryPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}
