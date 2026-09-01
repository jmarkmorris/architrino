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
  BORG_ELECTRINO_STATE_FLAG,
  BORG_POSITRINO_STATE_FLAG,
} from "./BorgPolarityDiagnostics.js";
import {
  createBorgInteractiveDefaults,
  createBorgPlacementPolicy,
} from "./BorgInteractiveDefaults.js";
import { createBorgAssemblyViewSession } from "./BorgAssemblyViewSession.js";
import { BORG_ASSEMBLY_RECORD_CATALOG } from "./BorgAssemblyRecordCatalog.js";

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
  assemblyRecordCatalog = BORG_ASSEMBLY_RECORD_CATALOG,
  startupSeedIndex = createBorgStartupSeedIndex(),
} = {}) {
  const query = new URLSearchParams(search);
  const runtimeMode = resolveBorgRuntimeMode(query);
  const braidRecordNavigation = createBorgAssemblyRecordNavigation({
    catalog: assemblyRecordCatalog,
    selectedAssemblyId: query.get("assemblyId"),
    locationLike,
    historyLike,
    fetchLike,
  });
  let assemblyViewSession = null;
  let eomRecordReplay = null;
  if (runtimeMode === BORG_RECORD_REPLAY_RUNTIME_MODE) {
    const assemblyId = query.get("assemblyId");
    const modelRevisionSha256 = query.get("modelRevisionSha256");
    const recordSha256 = query.get("recordSha256");
    if (!/^asm-[a-f0-9]{32}$/.test(assemblyId ?? "") || !/^[a-f0-9]{64}$/.test(modelRevisionSha256 ?? "") ||
        (recordSha256 !== null && !/^[a-f0-9]{64}$/.test(recordSha256))) {
      throw new TypeError("Assembly replay requires a valid assemblyId and modelRevisionSha256; recordSha256, when present, must be a lowercase SHA-256 hash.");
    }
    const entry = assemblyRecordCatalog.entries.find((row) =>
      row.assemblyId === assemblyId && row.modelRevisionSha256 === modelRevisionSha256);
    if (!entry) throw new RangeError("The requested exact assembly is not in the current Borg catalog.");
    const records = [await fetchBorgRecord(fetchLike, entry, "assembly-view record", recordSha256)];
    assemblyViewSession = createBorgAssemblyViewSession(records);
    eomRecordReplay = {
      record: records[0],
      records,
      sourceUrls: Object.freeze([entry.recordUrl]),
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
      (row) => row.stateFlags === BORG_ELECTRINO_STATE_FLAG,
    ).length,
    positrinoCount: fullPopulationEndpointRows.filter(
      (row) => row.stateFlags === BORG_POSITRINO_STATE_FLAG,
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
      historySafetyMargin: sampleInterval,
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

export function createBorgAssemblyRecordNavigation({
  catalog = BORG_ASSEMBLY_RECORD_CATALOG,
  selectedAssemblyId = null,
  locationLike = globalThis.location,
  historyLike = globalThis.history,
  fetchLike = globalThis.fetch,
} = {}) {
  const entries = catalog?.entries;
  if (!Array.isArray(entries)) {
    throw new TypeError("Borg braid record navigation requires a validated catalog.");
  }
  const selectedRecordId = entries.find((entry) => entry.assemblyId === selectedAssemblyId)?.assemblyId ?? null;

  function buildUrl(assemblyId) {
    const entry = entries.find((candidate) => candidate.assemblyId === assemblyId);
    if (!entry) {
      throw new RangeError(`Borg assembly record catalog has no entry ${String(assemblyId)}.`);
    }
    return `borg.html?${new URLSearchParams({
      assemblyId: entry.assemblyId,
      modelRevisionSha256: entry.modelRevisionSha256,
    })}`;
  }

  function navigate(assemblyId) {
    const url = buildUrl(assemblyId);
    if (typeof locationLike?.assign !== "function") {
      throw new TypeError("Borg braid record navigation requires location.assign().");
    }
    locationLike.assign(url);
    return url;
  }

  async function load(assemblyId) {
    const entry = entries.find((candidate) => candidate.assemblyId === assemblyId);
    if (!entry) {
      throw new RangeError(`Borg assembly catalog has no record ${String(assemblyId)}.`);
    }
    if (typeof fetchLike !== "function") {
      throw new TypeError("Borg braid record loading requires fetch().");
    }
    return fetchBorgRecord(fetchLike, entry, "prescribed geometry");
  }

  function persistSelection(assemblyId) {
    const url = buildUrl(assemblyId);
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

async function fetchBorgRecord(fetchLike, entry, label, expectedSha256 = null) {
  if (typeof fetchLike !== "function") {
    throw new TypeError(`Borg ${label} loading requires fetch().`);
  }
  const response = await fetchLike(entry.recordUrl);
  if (!response?.ok) {
    throw new Error(
      `Borg ${label} fetch failed (${response?.status ?? "no response"}): ${entry.recordUrl}`,
    );
  }
  let record;
  if (expectedSha256 === null) record = await response.json();
  else {
    const bytes = await response.arrayBuffer();
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    const actual = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    if (actual !== expectedSha256) throw new Error("The selected Borg record changed. Return to the assembly library and select its current version; the saved hash was not retargeted.");
    record = JSON.parse(new TextDecoder().decode(bytes));
  }
  if (record.assemblyId !== entry.assemblyId || record.modelRevisionSha256 !== entry.modelRevisionSha256) {
    throw new Error("The loaded Borg record does not match the requested exact assembly identity.");
  }
  return record;
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
  if (query.get("assemblyId") || query.get("modelRevisionSha256") || query.get("recordSha256")) {
    return BORG_RECORD_REPLAY_RUNTIME_MODE;
  }
  return BORG_DEFAULT_RUNTIME_MODE;
}

function queryPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}
