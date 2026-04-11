import {
  getPdgsolvePdgeditAssemblyRecipe,
  getPdgsolvePdgeditOperatorRecipe,
  normalizePdgsolvePdgeditRecipeCatalog,
} from "./PdgsolvePdgeditRecipeCatalogRuntime.js";
import {
  createPdgeditLibraryManifestEntry,
  normalizePdgeditLibraryManifest,
} from "../pdgedit/PdgeditLibraryManifestRuntime.js";
import {
  PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY,
  createPdgeditLaunchPayload,
} from "../pdgedit/PdgeditLaunchPayloadRuntime.js";

export const PDGSOLVE_PDGEDIT_DURABLE_DOCUMENT_LIBRARY_PATH = "content/contracts/examples/pdgedit";
export const PDGSOLVE_PDGEDIT_DURABLE_MANIFEST_PATH = "content/contracts/examples/pdgedit/manifest.v1.json";
export const PDGSOLVE_PDGEDIT_LAUNCH_APP_PATH = "./pdgedit.html";

const REACTANT_ASSEMBLIES_STAGE = "reactantAssemblies";
const REACTANT_SIDE_OPERATORS_STAGE = "reactantSideOperators";
const INTERMEDIATE_ASSEMBLIES_STAGE = "intermediateAssemblies";
const PRODUCT_SIDE_OPERATORS_STAGE = "productSideOperators";
const PRODUCT_ASSEMBLIES_STAGE = "productAssemblies";

const ASSEMBLY_X_BY_STAGE = Object.freeze({
  [REACTANT_ASSEMBLIES_STAGE]: 2,
  [INTERMEDIATE_ASSEMBLIES_STAGE]: 9,
  [PRODUCT_ASSEMBLIES_STAGE]: 16,
});

const OPERATOR_X_BY_STAGE = Object.freeze({
  [REACTANT_SIDE_OPERATORS_STAGE]: 7,
  [PRODUCT_SIDE_OPERATORS_STAGE]: 14,
});

const ROLE_BY_STAGE = Object.freeze({
  [REACTANT_ASSEMBLIES_STAGE]: "reactant",
  [INTERMEDIATE_ASSEMBLIES_STAGE]: "intermediate",
  [PRODUCT_ASSEMBLIES_STAGE]: "product",
});

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatTitleToken(value = "") {
  return normalizeText(value)
    .replace(/^pdgsolve_problem_/, "")
    .split(/[._-]+/g)
    .filter(Boolean)
    .map((token) => `${token.slice(0, 1).toUpperCase()}${token.slice(1)}`)
    .join(" ");
}

function normalizePathSlug(value = "") {
  const normalized = normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return normalized || "pdgsolve_pdgedit_publication";
}

function resolveLaunchHref(pdgeditHref = PDGSOLVE_PDGEDIT_LAUNCH_APP_PATH, windowLike = globalThis.window) {
  const href = normalizeText(pdgeditHref) || PDGSOLVE_PDGEDIT_LAUNCH_APP_PATH;
  const baseHref = normalizeText(windowLike?.location?.href) || "http://localhost/";
  try {
    return new URL(href, baseHref).href;
  } catch {
    return href;
  }
}

function normalizeUnit(unit = {}) {
  return {
    id: normalizeText(unit?.id),
    kind: normalizeText(unit?.kind),
    stage: normalizeText(unit?.stage),
    recipeId: normalizeText(unit?.recipeId),
    occurrenceKey: normalizeText(unit?.occurrenceKey),
    title: normalizeText(unit?.title),
    anchorRow: Number.isInteger(Number(unit?.anchorRow)) ? Number(unit.anchorRow) : 0,
  };
}

function normalizeEdge(edge = {}) {
  return {
    id: normalizeText(edge?.id),
    fromUnitId: normalizeText(edge?.fromUnitId),
    fromPortId: normalizeText(edge?.fromPortId),
    toUnitId: normalizeText(edge?.toUnitId),
    toPortId: normalizeText(edge?.toPortId),
  };
}

function normalizePublicationGraph(graph = {}) {
  return {
    schema: normalizeText(graph?.schema),
    units: Array.isArray(graph?.units) ? graph.units.map(normalizeUnit).filter((unit) => unit.id) : [],
    edges: Array.isArray(graph?.edges) ? graph.edges.map(normalizeEdge).filter((edge) => edge.id) : [],
  };
}

function getUnitEndpointIds(unit, portId, catalog) {
  if (unit.kind === "operator") {
    return [unit.id];
  }
  const recipe = getPdgsolvePdgeditAssemblyRecipe(unit.recipeId, catalog);
  if (!recipe) {
    throw new Error(`Unknown pdgsolve pdgedit assembly recipe: ${unit.recipeId}`);
  }
  const rowIndices = recipe.ports[normalizeText(portId)] ?? [];
  if (!rowIndices.length) {
    throw new Error(`Assembly recipe ${unit.recipeId} does not define port ${portId}`);
  }
  return rowIndices.map((rowIndex) => `${unit.id}.row.${rowIndex}`);
}

function buildAssemblyRecords(graph, catalog) {
  return graph.units
    .filter((unit) => unit.kind === "assembly")
    .flatMap((unit) => {
      const recipe = getPdgsolvePdgeditAssemblyRecipe(unit.recipeId, catalog);
      if (!recipe) {
        throw new Error(`Unknown pdgsolve pdgedit assembly recipe: ${unit.recipeId}`);
      }
      const role = ROLE_BY_STAGE[unit.stage];
      const x = ASSEMBLY_X_BY_STAGE[unit.stage];
      if (!role || x === undefined) {
        throw new Error(`Unsupported assembly stage for publication: ${unit.stage}`);
      }
      return recipe.rows.map((tiles, index) => ({
        id: `${unit.id}.row.${index + 1}`,
        type: recipe.pdgeditRowTypes[index] || recipe.pdgeditType,
        x,
        y: unit.anchorRow + index,
        title: recipe.rowTitles[index] || `${unit.title} Row ${index + 1}`,
        role,
        tiles,
      }));
    });
}

function getEdgeAssemblyCountSource(edge, side, unitById, catalog) {
  const unitId = side === "from" ? edge.fromUnitId : edge.toUnitId;
  const portId = side === "from" ? edge.fromPortId : edge.toPortId;
  const unit = unitById.get(unitId);
  if (unit?.kind !== "assembly") {
    return null;
  }
  const recipe = getPdgsolvePdgeditAssemblyRecipe(unit.recipeId, catalog);
  if (!recipe) {
    throw new Error(`Unknown pdgsolve pdgedit assembly recipe: ${unit.recipeId}`);
  }
  return {
    unit,
    edge,
    portId,
    counts: recipe.portPrimitiveCounts?.[portId] ?? recipe.primitiveCounts,
  };
}

function getOperatorAssemblyCountSources(operatorUnit, graph, unitById, catalog) {
  const incoming = [];
  const outgoing = [];
  graph.edges.forEach((edge) => {
    if (edge.toUnitId === operatorUnit.id) {
      const source = getEdgeAssemblyCountSource(edge, "from", unitById, catalog);
      if (source) {
        incoming.push(source);
      }
    }
    if (edge.fromUnitId === operatorUnit.id) {
      const source = getEdgeAssemblyCountSource(edge, "to", unitById, catalog);
      if (source) {
        outgoing.push(source);
      }
    }
  });
  return { incoming, outgoing };
}

function requireSingleOperatorCountSource(operatorUnit, sources, direction) {
  if (sources.length !== 1) {
    throw new Error(
      `Publication operator ${operatorUnit.id} expected exactly one ${direction} assembly count source and found ${sources.length}`
    );
  }
  return sources[0];
}

function selectOperatorCountSource(operatorUnit, recipe, graph, unitById, catalog) {
  const sources = getOperatorAssemblyCountSources(operatorUnit, graph, unitById, catalog);
  if (recipe.pdgsolveOperatorType === "dissociate") {
    return requireSingleOperatorCountSource(operatorUnit, sources.incoming, "incoming");
  }
  if (recipe.pdgsolveOperatorType === "associate") {
    return requireSingleOperatorCountSource(operatorUnit, sources.outgoing, "outgoing");
  }
  if (sources.incoming.length === 1) {
    return sources.incoming[0];
  }
  if (sources.outgoing.length === 1) {
    return sources.outgoing[0];
  }
  throw new Error(`Publication operator ${operatorUnit.id} needs one assembly count source`);
}

function buildOperatorRecords(graph, catalog) {
  const unitById = new Map(graph.units.map((unit) => [unit.id, unit]));
  return graph.units
    .filter((unit) => unit.kind === "operator")
    .map((unit) => {
      const recipe = getPdgsolvePdgeditOperatorRecipe(unit.recipeId, catalog);
      if (!recipe) {
        throw new Error(`Unknown pdgsolve pdgedit operator recipe: ${unit.recipeId}`);
      }
      const x = OPERATOR_X_BY_STAGE[unit.stage];
      if (x === undefined) {
        throw new Error(`Unsupported operator stage for publication: ${unit.stage}`);
      }
      const countSource = selectOperatorCountSource(unit, recipe, graph, unitById, catalog);
      const counts = countSource.counts;
      return {
        id: unit.id,
        type: recipe.pdgeditType,
        x,
        y: unit.anchorRow,
        title: recipe.title,
        positrinoCount: counts.positrinoCount,
        electrinoCount: counts.electrinoCount,
      };
    });
}

function buildLinkRecords(graph, catalog) {
  return graph.edges.flatMap((edge) => {
    const fromUnit = graph.units.find((unit) => unit.id === edge.fromUnitId);
    const toUnit = graph.units.find((unit) => unit.id === edge.toUnitId);
    if (!fromUnit || !toUnit) {
      throw new Error(`Publication edge ${edge.id} references missing unit(s)`);
    }
    const fromEndpointIds = getUnitEndpointIds(fromUnit, edge.fromPortId, catalog);
    const toEndpointIds = getUnitEndpointIds(toUnit, edge.toPortId, catalog);
    if (fromEndpointIds.length > 1 && toEndpointIds.length > 1 && fromEndpointIds.length !== toEndpointIds.length) {
      throw new Error(`Publication edge ${edge.id} expands to mismatched endpoint counts`);
    }
    if (fromEndpointIds.length === 1 && toEndpointIds.length === 1) {
      return [
        {
          id: edge.id,
          endpointA: fromEndpointIds[0],
          endpointB: toEndpointIds[0],
        },
      ];
    }
    const linkCount = Math.max(fromEndpointIds.length, toEndpointIds.length);
    return Array.from({ length: linkCount }, (_, index) => ({
      id: `${edge.id}.link.${index + 1}`,
      endpointA: fromEndpointIds[Math.min(index, fromEndpointIds.length - 1)],
      endpointB: toEndpointIds[Math.min(index, toEndpointIds.length - 1)],
    }));
  });
}

function buildCompositeLabels() {
  return [];
}

export function buildPdgeditDocumentFromPdgsolvePublicationGraph(graph = {}, recipeCatalog = null) {
  const normalizedGraph = normalizePublicationGraph(graph);
  const normalizedCatalog = normalizePdgsolvePdgeditRecipeCatalog(recipeCatalog ?? undefined);
  return {
    schema: "pdgedit/v1",
    assemblies: buildAssemblyRecords(normalizedGraph, normalizedCatalog),
    operators: buildOperatorRecords(normalizedGraph, normalizedCatalog),
    links: buildLinkRecords(normalizedGraph, normalizedCatalog),
    compositeLabels: buildCompositeLabels(normalizedGraph, normalizedCatalog),
  };
}

export function buildPdgsolvePdgeditPackage({
  sourceAcceptanceDigest = "",
  publicationMode = "launch",
  documentId = "",
  documentTitle = "",
  graph = {},
  recipeCatalog = null,
  durableDocumentPath = "",
} = {}) {
  const pdgeditDocument = buildPdgeditDocumentFromPdgsolvePublicationGraph(graph, recipeCatalog);
  const normalizedMode = normalizeText(publicationMode) === "durable" ? "durable" : "launch";
  return {
    schema: "pdgsolve-pdgedit-package/v1",
    sourceAcceptanceDigest: normalizeText(sourceAcceptanceDigest),
    publicationMode: normalizedMode,
    documentId: normalizeText(documentId),
    documentTitle: normalizeText(documentTitle),
    pdgeditDocument,
    manifestEntry:
      normalizedMode === "durable"
        ? createPdgeditLibraryManifestEntry({
            id: normalizeText(documentId),
            title: normalizeText(documentTitle),
            displayTitle: normalizeText(documentTitle),
            documentPath: normalizeText(durableDocumentPath),
          })
      : null,
  };
}

export function normalizePdgsolveAcceptanceForPdgeditPublication(acceptance = {}) {
  const normalizedAcceptance = cloneJson(acceptance ?? {});
  if (normalizeText(normalizedAcceptance?.schema) !== "pdgsolve-acceptance/v1") {
    throw new Error("pdgsolve pdgedit publication requires a pdgsolve-acceptance/v1 record.");
  }
  if (normalizeText(normalizedAcceptance?.acceptedState) !== "accepted") {
    throw new Error("pdgsolve pdgedit publication requires an accepted record.");
  }
  if (!normalizeText(normalizedAcceptance?.problemId) || !normalizeText(normalizedAcceptance?.familyId)) {
    throw new Error("pdgsolve pdgedit publication requires a locked problem id and family id.");
  }
  if (!normalizeText(normalizedAcceptance?.resultDigest)) {
    throw new Error("pdgsolve pdgedit publication requires a source acceptance digest.");
  }
  if (normalizeText(normalizedAcceptance?.lockedSolveGraph?.schema) !== "pdgsolve-publication-graph/v1") {
    throw new Error("pdgsolve pdgedit publication requires a locked publication graph.");
  }
  return normalizedAcceptance;
}

export function buildPdgsolvePdgeditDocumentId(acceptance = {}) {
  const normalizedAcceptance = normalizePdgsolveAcceptanceForPdgeditPublication(acceptance);
  return `${normalizeText(normalizedAcceptance.problemId)}--${normalizeText(normalizedAcceptance.familyId)}`;
}

export function buildPdgsolvePdgeditDocumentTitle(acceptance = {}) {
  const normalizedAcceptance = normalizePdgsolveAcceptanceForPdgeditPublication(acceptance);
  return formatTitleToken(normalizedAcceptance.problemId) || normalizeText(normalizedAcceptance.problemId);
}

export function buildPdgsolvePdgeditDurableDocumentPath({
  documentId = "",
  durableDocumentLibraryPath = PDGSOLVE_PDGEDIT_DURABLE_DOCUMENT_LIBRARY_PATH,
} = {}) {
  return `${normalizeText(durableDocumentLibraryPath) || PDGSOLVE_PDGEDIT_DURABLE_DOCUMENT_LIBRARY_PATH}/${normalizePathSlug(documentId)}.v1.json`;
}

export function buildPdgsolvePdgeditPackageFromAcceptance({
  acceptance = {},
  publicationMode = "launch",
  documentId = "",
  documentTitle = "",
  durableDocumentPath = "",
  durableDocumentLibraryPath = PDGSOLVE_PDGEDIT_DURABLE_DOCUMENT_LIBRARY_PATH,
  recipeCatalog = null,
} = {}) {
  const normalizedAcceptance = normalizePdgsolveAcceptanceForPdgeditPublication(acceptance);
  const normalizedMode = normalizeText(publicationMode) === "durable" ? "durable" : "launch";
  const normalizedDocumentId = normalizeText(documentId) || buildPdgsolvePdgeditDocumentId(normalizedAcceptance);
  const normalizedDocumentTitle = normalizeText(documentTitle) || buildPdgsolvePdgeditDocumentTitle(normalizedAcceptance);
  const normalizedDurableDocumentPath =
    normalizedMode === "durable"
      ? normalizeText(durableDocumentPath) ||
        buildPdgsolvePdgeditDurableDocumentPath({
          documentId: normalizedDocumentId,
          durableDocumentLibraryPath,
        })
      : "";

  return buildPdgsolvePdgeditPackage({
    sourceAcceptanceDigest: normalizedAcceptance.resultDigest,
    publicationMode: normalizedMode,
    documentId: normalizedDocumentId,
    documentTitle: normalizedDocumentTitle,
    graph: normalizedAcceptance.lockedSolveGraph,
    recipeCatalog,
    durableDocumentPath: normalizedDurableDocumentPath,
  });
}

export function upsertPdgeditLibraryManifestEntryForPdgsolvePublication(
  manifest = {},
  manifestEntry = {},
  { makeDefault = false } = {}
) {
  const normalizedManifest = normalizePdgeditLibraryManifest(manifest);
  const existingEntry =
    normalizedManifest.entries.find((entry) => entry.id === normalizeText(manifestEntry?.id)) ?? null;
  const nextEntry = createPdgeditLibraryManifestEntry({
    id: manifestEntry?.id,
    title: manifestEntry?.title,
    displayTitle: manifestEntry?.displayTitle,
    documentPath: manifestEntry?.documentPath,
    isDefault: makeDefault || existingEntry?.isDefault === true || manifestEntry?.isDefault === true,
  });
  if (!nextEntry.id || !nextEntry.documentPath) {
    throw new Error("pdgsolve durable publication requires a manifest entry id and document path.");
  }

  const entries = [];
  let didReplace = false;
  normalizedManifest.entries.forEach((entry) => {
    if (entry.id === nextEntry.id) {
      entries.push(nextEntry);
      didReplace = true;
      return;
    }
    if (makeDefault && entry.isDefault) {
      const { isDefault, ...entryWithoutDefault } = entry;
      entries.push(entryWithoutDefault);
      return;
    }
    entries.push(entry);
  });
  if (!didReplace) {
    entries.push(nextEntry);
  }

  return {
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: makeDefault ? nextEntry.id : normalizedManifest.defaultEntryId,
    entries,
  };
}

export async function publishPdgsolveAcceptanceToPdgeditLibrary({
  acceptance = {},
  manifest = {},
  documentWriter,
  manifestWriter,
  manifestPath = PDGSOLVE_PDGEDIT_DURABLE_MANIFEST_PATH,
  makeDefault = false,
  documentId = "",
  documentTitle = "",
  durableDocumentPath = "",
  durableDocumentLibraryPath = PDGSOLVE_PDGEDIT_DURABLE_DOCUMENT_LIBRARY_PATH,
  recipeCatalog = null,
} = {}) {
  if (typeof documentWriter !== "function") {
    throw new Error("pdgsolve durable publication requires a document writer.");
  }
  if (typeof manifestWriter !== "function") {
    throw new Error("pdgsolve durable publication requires a manifest writer.");
  }

  const pdgeditPackage = buildPdgsolvePdgeditPackageFromAcceptance({
    acceptance,
    publicationMode: "durable",
    documentId,
    documentTitle,
    durableDocumentPath,
    durableDocumentLibraryPath,
    recipeCatalog,
  });
  const updatedManifest = upsertPdgeditLibraryManifestEntryForPdgsolvePublication(
    manifest,
    pdgeditPackage.manifestEntry,
    { makeDefault }
  );

  await documentWriter({
    path: pdgeditPackage.manifestEntry.documentPath,
    document: cloneJson(pdgeditPackage.pdgeditDocument),
    package: cloneJson(pdgeditPackage),
  });
  await manifestWriter({
    path: normalizeText(manifestPath) || PDGSOLVE_PDGEDIT_DURABLE_MANIFEST_PATH,
    manifest: cloneJson(updatedManifest),
    manifestEntry: cloneJson(pdgeditPackage.manifestEntry),
    package: cloneJson(pdgeditPackage),
  });

  return {
    schema: "pdgsolve-pdgedit-publication/v1",
    publicationState: "published",
    publicationMode: "durable",
    sourceAcceptanceDigest: pdgeditPackage.sourceAcceptanceDigest,
    documentId: pdgeditPackage.documentId,
    documentTitle: pdgeditPackage.documentTitle,
    documentPath: pdgeditPackage.manifestEntry.documentPath,
    manifestPath: normalizeText(manifestPath) || PDGSOLVE_PDGEDIT_DURABLE_MANIFEST_PATH,
    package: pdgeditPackage,
    manifest: updatedManifest,
  };
}

export function buildPdgsolvePdgeditLaunchPayload({
  acceptance = {},
  documentId = "",
  documentTitle = "",
  recipeCatalog = null,
} = {}) {
  const pdgeditPackage = buildPdgsolvePdgeditPackageFromAcceptance({
    acceptance,
    publicationMode: "launch",
    documentId,
    documentTitle,
    recipeCatalog,
  });
  return {
    package: pdgeditPackage,
    payload: createPdgeditLaunchPayload({
      sourceKind: "pdgsolve",
      sourceReference: pdgeditPackage.sourceAcceptanceDigest,
      documentId: pdgeditPackage.documentId,
      documentTitle: pdgeditPackage.documentTitle,
      pdgeditDocument: pdgeditPackage.pdgeditDocument,
    }),
  };
}

export function writePdgsolvePdgeditLaunchPayload({
  acceptance = {},
  storage = globalThis.window?.sessionStorage ?? null,
  storageKey = PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY,
  documentId = "",
  documentTitle = "",
  recipeCatalog = null,
} = {}) {
  if (typeof storage?.setItem !== "function") {
    throw new Error("pdgsolve pdgedit launch requires writable browser storage.");
  }
  const launch = buildPdgsolvePdgeditLaunchPayload({
    acceptance,
    documentId,
    documentTitle,
    recipeCatalog,
  });
  storage.setItem(normalizeText(storageKey) || PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY, JSON.stringify(launch.payload));
  return {
    schema: "pdgsolve-pdgedit-publication/v1",
    publicationState: "published",
    publicationMode: "launch",
    sourceAcceptanceDigest: launch.package.sourceAcceptanceDigest,
    documentId: launch.package.documentId,
    documentTitle: launch.package.documentTitle,
    storageKey: normalizeText(storageKey) || PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY,
    package: launch.package,
    payload: launch.payload,
  };
}

export function launchPdgeditFromPdgsolveAcceptance({
  acceptance = {},
  storage = globalThis.window?.sessionStorage ?? null,
  storageKey = PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY,
  windowLike = globalThis.window,
  pdgeditHref = PDGSOLVE_PDGEDIT_LAUNCH_APP_PATH,
  documentId = "",
  documentTitle = "",
  recipeCatalog = null,
} = {}) {
  const publication = writePdgsolvePdgeditLaunchPayload({
    acceptance,
    storage,
    storageKey,
    documentId,
    documentTitle,
    recipeCatalog,
  });
  const href = resolveLaunchHref(pdgeditHref, windowLike);
  if (typeof windowLike?.location?.assign === "function") {
    windowLike.location.assign(href);
  } else if (typeof windowLike?.open === "function") {
    windowLike.open(href, "_self");
  }
  return {
    ...publication,
    href,
  };
}
