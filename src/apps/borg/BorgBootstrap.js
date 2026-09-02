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
import { loadBorgScientificStatus } from "./BorgScientificStatus.mjs";
import { loadBorgPlatonicRelationships } from "./BorgPlatonicRelationships.mjs";
import { describeLibraryRecord } from "./library/BorgLibraryDescriptors.mjs";
import { LIBRARY_FACETS } from "./library/BorgLibraryQuery.mjs";
import {
  BORG_SELECTION_STATUS,
  resolveBorgSelectionRequest,
  resolveBorgLibraryReturnHref,
  resolveBraidSearchReturnHref,
} from "../shared/BorgSelectionNavigation.mjs";
import {
  ANIMATOR_BORG_HANDOFF_QUERY,
  ANIMATOR_BORG_HANDOFF_QUERY_VALUE,
  receiveAnimatorPrescribedSceneHandoff,
} from "../shared/AnimatorBorgHandoffTransport.mjs";

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
  receiveAnimatorHandoff = receiveAnimatorPrescribedSceneHandoff,
  windowLike = globalThis.window,
} = {}) {
  const query = new URLSearchParams(search);
  const runtimeMode = resolveBorgRuntimeMode(query);
  const returnHref = resolveBraidSearchReturnHref(
    query.get("returnTo"),
    locationLike,
  );
  const libraryReturnHref = resolveBorgLibraryReturnHref(
    query.get("libraryReturnTo"),
    locationLike,
  );
  const braidRecordNavigation = createBorgAssemblyRecordNavigation({
    catalog: assemblyRecordCatalog,
    selectedAssemblyId: query.get("assemblyId"),
    returnTo: returnHref,
    libraryReturnTo: libraryReturnHref,
    locationLike,
    historyLike,
    fetchLike,
  });
  let assemblyViewSession = null;
  let eomRecordReplay = null;
  let selectedCatalogEntry = null;
  let selectedRecordSha256 = null;
  if (runtimeMode === BORG_RECORD_REPLAY_RUNTIME_MODE) {
    const animatorHandoffRequested =
      query.get(ANIMATOR_BORG_HANDOFF_QUERY) === ANIMATOR_BORG_HANDOFF_QUERY_VALUE;
    let records;
    let scientificStatus = null;
    let platonicRelationships = null;
    let librarySummary = null;
    let sourceUrls = [];
    if (animatorHandoffRequested) {
      const handoff = await receiveAnimatorHandoff({ windowLike });
      records = [handoff.record];
      selectedRecordSha256 = handoff.recordSha256;
      librarySummary = createAnimatorPrescribedSceneSummary(handoff);
    } else {
      const selection = resolveBorgSelectionRequest(
        query,
        assemblyRecordCatalog.entries,
      );
      if (selection.status === BORG_SELECTION_STATUS.MISSING) {
        throw new RangeError(selection.reason);
      }
      if (selection.status === BORG_SELECTION_STATUS.STALE) {
        throw new RangeError(selection.reason);
      }
      if (selection.status !== BORG_SELECTION_STATUS.VALID) {
        throw new TypeError(selection.reason);
      }
      const entry = selection.entry;
      const recordSha256 = selection.recordSha256;
      selectedCatalogEntry = entry;
      selectedRecordSha256 = recordSha256;
      records = [await fetchBorgRecord(fetchLike, entry, "assembly-view record", recordSha256)];
      [scientificStatus, platonicRelationships] = await Promise.all([
        loadBorgScientificStatus({
          fetchLike,
          coordinates: records[0].provenance?.prescribedGeometry?.coordinates,
          identity: entry,
        }),
        loadBorgPlatonicRelationships({ fetchLike, identity: entry }),
      ]);
      librarySummary = createBorgWorkbenchRecordSummary({
        record: records[0],
        catalogEntry: entry,
        recordSha256,
        platonicRelationships,
      });
      sourceUrls = [entry.recordUrl];
    }
    assemblyViewSession = createBorgAssemblyViewSession(records);
    eomRecordReplay = {
      record: records[0],
      records,
      sourceUrls: Object.freeze(sourceUrls),
      librarySummary,
      scientificStatus,
      platonicRelationships,
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
    libraryNavigation: Object.freeze({
      href: libraryReturnHref ?? buildBorgLibrarySelectionHref(
        selectedCatalogEntry,
        selectedRecordSha256,
      ),
      label: "Back to Borg Library",
    }),
    returnNavigation: returnHref
      ? Object.freeze({ href: returnHref, label: "Return to Braid Search" })
      : null,
  });
}

export function createBorgWorkbenchRecordSummary({
  record,
  catalogEntry,
  recordSha256 = null,
  platonicRelationships = null,
}) {
  const described = describeLibraryRecord(
    record,
    catalogEntry,
    recordSha256,
  ).summary;
  const facets = {
    ...described.facets,
    platonicRelationship:
      platonicRelationships?.values ?? described.facets.platonicRelationship,
  };
  return Object.freeze({
    label: described.label,
    assemblyId: described.assemblyId,
    modelRevisionSha256: described.modelRevisionSha256,
    description: described.description,
    facets: Object.freeze(Object.entries(LIBRARY_FACETS).map(([key, definition]) =>
      Object.freeze({
        key,
        label: definition.label,
        value: [].concat(facets[key] ?? "unavailable")
          .map((value) => borgWorkbenchFacetLabel(key, value))
          .join(", "),
      }))),
  });
}

export function createAnimatorPrescribedSceneSummary(handoff) {
  const record = handoff.record;
  return Object.freeze({
    label: record.title ?? record.provenance?.prescribedGeometry?.sourceSceneId ?? "Animator prescribed scene",
    assemblyId: record.assemblyId,
    modelRevisionSha256: record.modelRevisionSha256,
    description:
      "Animator-authored prescribed motion. Record-only replay; this is not EOM-evolved evidence.",
    facets: Object.freeze([]),
  });
}

function borgWorkbenchFacetLabel(key, value) {
  if (key === "circleOccupancy" && value === "mixed") {
    return "Both occupancy types";
  }
  return LIBRARY_FACETS[key].options.find(([option]) => option === value)?.[1] ??
    (value === "unavailable" ? "Not assigned" : String(value));
}

export function createBorgAssemblyRecordNavigation({
  catalog = BORG_ASSEMBLY_RECORD_CATALOG,
  selectedAssemblyId = null,
  returnTo = null,
  libraryReturnTo = null,
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
    const query = new URLSearchParams({
      assemblyId: entry.assemblyId,
      modelRevisionSha256: entry.modelRevisionSha256,
    });
    if (returnTo) query.set("returnTo", returnTo);
    if (libraryReturnTo) query.set("libraryReturnTo", libraryReturnTo);
    return `borg.html?${query}`;
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

function buildBorgLibrarySelectionHref(entry, recordSha256 = null) {
  if (!entry) return "./borg-library.html";
  const query = new URLSearchParams({
    assemblyId: entry.assemblyId,
    modelRevisionSha256: entry.modelRevisionSha256,
  });
  if (recordSha256) query.set("recordSha256", recordSha256);
  return `./borg-library.html?${query}`;
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
  if (
    query.get("assemblyId") ||
    query.get("modelRevisionSha256") ||
    query.get("recordSha256") ||
    query.get(ANIMATOR_BORG_HANDOFF_QUERY) === ANIMATOR_BORG_HANDOFF_QUERY_VALUE
  ) {
    return BORG_RECORD_REPLAY_RUNTIME_MODE;
  }
  return BORG_DEFAULT_RUNTIME_MODE;
}

function queryPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}
