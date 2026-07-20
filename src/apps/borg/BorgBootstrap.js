import { mountBorgApp } from "./BorgAppRuntime.js";
import { createBorgEomHttpClient } from "./BorgEomHttpClient.js";
import { BORG_DATASET_MANIFEST_V1 } from "./BorgAppManifest.js";
import {
  BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  getBorgCertifiedBudgetPreset,
} from "./BorgCertifiedBudgets.js";
import {
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgSeededInitialConditionRows,
} from "./BorgInitialConditions.js";
import {
  createBorgInteractiveDefaults,
  createBorgPlacementPolicy,
} from "./BorgInteractiveDefaults.js";
import { createBorgAssemblyViewSession } from "./BorgAssemblyViewSession.js";

export const BORG_DEFAULT_RUNTIME_MODE = "eom-shadow";
export const BORG_RECORD_REPLAY_RUNTIME_MODE = "eom-record-replay";

export async function bootBorgApp({
  search = globalThis.location?.search ?? "",
  mountApp = mountBorgApp,
  createEomClient = createBorgEomHttpClient,
  manifest = BORG_DATASET_MANIFEST_V1,
  fetchLike = globalThis.fetch,
  startupSeedIndex = createBorgStartupSeedIndex(),
} = {}) {
  const query = new URLSearchParams(search);
  const runtimeMode = resolveBorgRuntimeMode(query);
  if (runtimeMode === BORG_RECORD_REPLAY_RUNTIME_MODE) {
    const recordUrls = query.getAll("eomRecord");
    const records = await Promise.all(recordUrls.map(async (recordUrl) => {
      const response = await fetchLike(recordUrl);
      if (!response?.ok) {
        throw new Error(
          `Borg assembly-view record fetch failed (${response?.status ?? "no response"}): ${recordUrl}`,
        );
      }
      return response.json();
    }));
    const assemblyViewSession = createBorgAssemblyViewSession(records);
    return mountApp({
      manifest,
      assemblyViewSession,
      eomRecordReplay: {
        record: records[0],
        records,
        sourceUrls: Object.freeze([...recordUrls]),
      },
    });
  }

  const eomStartTime = 0;
  const eomDuration = queryPositiveNumber(query.get("eomDuration"), 60);
  if (!Number.isSafeInteger(startupSeedIndex) || startupSeedIndex < 0) {
    throw new TypeError("Borg startup seed index must be a nonnegative safe integer.");
  }
  const interactiveDefaults = createBorgInteractiveDefaults(manifest);
  const certifiedBudget = getBorgCertifiedBudgetPreset(
    query.get("certifiedBudget") ?? BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  );
  const initialConditionConfig = interactiveDefaults.initialConditionConfig;
  const displayPlacement = createBorgPlacementPolicy(
    manifest,
    initialConditionConfig.electrinoCount + initialConditionConfig.positrinoCount,
  );
  const fullPopulationEndpointRows = createBorgSeededInitialConditionRows({
    manifest,
    seedIndex: startupSeedIndex,
    config: initialConditionConfig,
    seedingRadius: displayPlacement.seedingRadius,
    minimumPairSeparation: displayPlacement.minimumPairSeparation,
  });
  const endpointRows = fullPopulationEndpointRows;
  const activeInitialConditionConfig = Object.freeze({
    ...initialConditionConfig,
    electrinoCount: endpointRows.filter((row) => row.stateFlags === 2).length,
    positrinoCount: endpointRows.filter((row) => row.stateFlags === 1).length,
  });
  const sampleInterval = 0.01;
  const causalHistoryDepth = calculateBorgInertialHistoryDepth(endpointRows, {
    fieldSpeed: manifest.simulationEnvelope?.fieldSpeed ?? 1,
    sampleInterval,
    maximumSeparation: 2 * displayPlacement.seedingRadius,
  });
  // Only the causal past is prescribed. Forward EOM segments are appended
  // after T=0 and form the separately evolving retained history.
  const seedHistoryDepth = causalHistoryDepth;
  const runtimeManifest = createManifestWithHistoryDepth(
    manifest,
    seedHistoryDepth,
  );
  const initialEomSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: eomStartTime - seedHistoryDepth,
    historyEndTime: eomStartTime,
    minimumPairSeparation: displayPlacement.minimumPairSeparation,
  });
  return mountApp({
    manifest: runtimeManifest,
    initialEomSeed,
    initialDistributionSeedIndex: startupSeedIndex,
    initialConditionConfig: activeInitialConditionConfig,
    // Ordinary Borg startup must stay interactive. The long retained-history
    // evolution is an explicit diagnostic action, not page-load work.
    autoStartEom: query.get("eom") === "shadow",
    eomShadowRunner: {
      eomClient: createEomClient(),
      startTime: eomStartTime,
      targetDuration: eomStartTime + eomDuration,
      runDuration: eomDuration,
      historyDepth: seedHistoryDepth,
      certifiedBudgetId: certifiedBudget.id,
      pathCount: endpointRows.length,
      // Batch six 0.05 certified steps per process round trip. This keeps the
      // EOM solver's numerical step unchanged while avoiding protocol cost on
      // every rendered sample interval.
      chunkDuration: 0.3,
      sampleInterval,
      initialStep: certifiedBudget.allocations.controller.initialStep,
      minimumStep: certifiedBudget.allocations.controller.minimumStep,
      maximumStep: certifiedBudget.allocations.controller.maximumStep,
      useAdaptiveStepGrowth: true,
      simulationOuterRadius: displayPlacement.seedingRadius,
      coupling: String(interactiveDefaults.coupling),
    },
  });
}

export function createBorgStartupSeedIndex(cryptoLike = globalThis.crypto) {
  if (cryptoLike && typeof cryptoLike.getRandomValues === "function") {
    const values = new Uint32Array(1);
    cryptoLike.getRandomValues(values);
    return values[0];
  }
  return Math.floor(Math.random() * 0x100000000);
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
