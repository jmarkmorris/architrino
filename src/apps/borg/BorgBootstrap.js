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
import { BORG_BRAID_RECORD_CATALOG } from "./BorgBraidRecordCatalog.js";

export const BORG_DEFAULT_RUNTIME_MODE = "eom-shadow";
export const BORG_RECORD_REPLAY_RUNTIME_MODE = "eom-record-replay";

export async function bootBorgApp({
  search = globalThis.location?.search ?? "",
  mountApp = mountBorgApp,
  createEomClient = createBorgEomHttpClient,
  manifest = BORG_DATASET_MANIFEST_V1,
  fetchLike = globalThis.fetch,
  locationLike = globalThis.location,
  historyLike = globalThis.history,
  braidRecordCatalog = BORG_BRAID_RECORD_CATALOG,
  startupSeedIndex = createBorgStartupSeedIndex(),
} = {}) {
  const query = new URLSearchParams(search);
  const runtimeMode = resolveBorgRuntimeMode(query);
  const braidRecordNavigation = createBorgBraidRecordNavigation({
    catalog: braidRecordCatalog,
    selectedRecordUrls: query.getAll("eomRecord"),
    locationLike,
    historyLike,
    fetchLike,
  });
  let assemblyViewSession = null;
  let eomRecordReplay = null;
  if (runtimeMode === BORG_RECORD_REPLAY_RUNTIME_MODE) {
    const recordUrls = query.getAll("eomRecord");
    const records = await Promise.all(recordUrls.map((recordUrl) =>
      fetchBorgRecord(fetchLike, recordUrl, "assembly-view record")));
    assemblyViewSession = createBorgAssemblyViewSession(records);
    eomRecordReplay = {
      record: records[0],
      records,
      sourceUrls: Object.freeze([...recordUrls]),
    };
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
  const activeInitialConditionConfig = Object.freeze({
    ...initialConditionConfig,
    electrinoCount: fullPopulationEndpointRows.filter(
      (row) => row.stateFlags === 2,
    ).length,
    positrinoCount: fullPopulationEndpointRows.filter(
      (row) => row.stateFlags === 1,
    ).length,
  });
  const sampleInterval = 0.01;
  const causalHistoryDepth = calculateBorgInertialHistoryDepth(
    fullPopulationEndpointRows,
    {
    fieldSpeed: manifest.simulationEnvelope?.fieldSpeed ?? 1,
    sampleInterval,
    maximumSeparation: 2 * displayPlacement.seedingRadius,
    },
  );
  // Only the causal past is prescribed. Forward EOM segments are appended
  // after T=0 and form the separately evolving retained history.
  const seedHistoryDepth = causalHistoryDepth;
  const runtimeManifest = createManifestWithHistoryDepth(
    manifest,
    seedHistoryDepth,
  );
  const initialEomSeed = await createBorgAcceptedInertialSeedHistory(
    fullPopulationEndpointRows,
    {
    historyStartTime: eomStartTime - seedHistoryDepth,
    historyEndTime: eomStartTime,
    minimumPairSeparation: displayPlacement.minimumPairSeparation,
    },
  );
  return mountApp({
    manifest: runtimeManifest,
    initialEomSeed,
    initialDistributionSeedIndex: startupSeedIndex,
    initialConditionConfig: activeInitialConditionConfig,
    // Ordinary Borg startup must stay interactive. The long retained-history
    // evolution is an explicit diagnostic action, not page-load work.
    autoStartEom:
      runtimeMode === BORG_RECORD_REPLAY_RUNTIME_MODE || query.get("eom") === "shadow",
    eomShadowRunner: {
      eomClientFactory: createEomClient,
      startTime: eomStartTime,
      targetDuration: eomStartTime + eomDuration,
      runDuration: eomDuration,
      historyDepth: seedHistoryDepth,
      certifiedBudgetId: certifiedBudget.id,
      pathCount: fullPopulationEndpointRows.length,
      // Batch six 0.05 EOM steps per process round trip. The selected run
      // grade stays fixed while protocol traffic remains below render cadence.
      chunkDuration: 0.3,
      sampleInterval,
      initialStep: certifiedBudget.allocations.controller.initialStep,
      minimumStep: certifiedBudget.allocations.controller.minimumStep,
      maximumStep: certifiedBudget.allocations.controller.maximumStep,
      useAdaptiveStepGrowth: true,
      simulationOuterRadius: displayPlacement.seedingRadius,
      coupling: String(interactiveDefaults.coupling),
    },
    assemblyViewSession,
    eomRecordReplay,
    braidRecordNavigation,
  });
}

export function createBorgBraidRecordNavigation({
  catalog = BORG_BRAID_RECORD_CATALOG,
  selectedRecordUrls = [],
  locationLike = globalThis.location,
  historyLike = globalThis.history,
  fetchLike = globalThis.fetch,
} = {}) {
  const entries = catalog?.entries;
  if (!Array.isArray(entries)) {
    throw new TypeError("Borg braid record navigation requires a validated catalog.");
  }
  const selectedRecordId = entries.find((entry) =>
    selectedRecordUrls.includes(entry.recordUrl)
  )?.id ?? null;

  function buildUrl(recordId) {
    const entry = entries.find((candidate) => candidate.id === recordId);
    if (!entry) {
      throw new RangeError(`Borg braid record catalog has no entry ${String(recordId)}.`);
    }
    return `borg.html?eomRecord=${encodeURIComponent(entry.recordUrl)}`;
  }

  function navigate(recordId) {
    const url = buildUrl(recordId);
    if (typeof locationLike?.assign !== "function") {
      throw new TypeError("Borg braid record navigation requires location.assign().");
    }
    locationLike.assign(url);
    return url;
  }

  async function load(recordId) {
    const entry = entries.find((candidate) => candidate.id === recordId);
    if (!entry) {
      throw new RangeError(`Borg braid catalog has no record ${String(recordId)}.`);
    }
    if (typeof fetchLike !== "function") {
      throw new TypeError("Borg braid record loading requires fetch().");
    }
    return fetchBorgRecord(fetchLike, entry.recordUrl, "prescribed geometry");
  }

  function persistSelection(recordId) {
    const url = buildUrl(recordId);
    if (typeof historyLike?.replaceState !== "function") {
      return false;
    }
    historyLike.replaceState(null, "", url);
    return true;
  }

  return Object.freeze({
    catalog,
    selectedRecordId,
    buildUrl,
    navigate,
    load,
    persistSelection,
  });
}

async function fetchBorgRecord(fetchLike, recordUrl, label) {
  if (typeof fetchLike !== "function") {
    throw new TypeError(`Borg ${label} loading requires fetch().`);
  }
  const response = await fetchLike(recordUrl);
  if (!response?.ok) {
    throw new Error(
      `Borg ${label} fetch failed (${response?.status ?? "no response"}): ${recordUrl}`,
    );
  }
  return response.json();
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
