import {
  getPdgsolvePdgeditAssemblyRecipe,
  getPdgsolvePdgeditOperatorRecipe,
  normalizePdgsolvePdgeditRecipeCatalog,
} from "./PdgsolvePdgeditRecipeCatalogRuntime.js";
import { createPdgeditLibraryManifestEntry } from "../pdgedit/PdgeditLibraryManifestRuntime.js";

const ASSEMBLY_X_BY_LANE = Object.freeze({
  1: 2,
  3: 9,
  5: 16,
});

const OPERATOR_X_BY_LANE = Object.freeze({
  2: 7,
  4: 14,
});

const ROLE_BY_LANE = Object.freeze({
  1: "reactant",
  3: "intermediate",
  5: "product",
});

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function normalizeUnit(unit = {}) {
  return {
    id: normalizeText(unit?.id),
    kind: normalizeText(unit?.kind),
    lane: normalizeInteger(unit?.lane, 0),
    recipeId: normalizeText(unit?.recipeId),
    occurrenceKey: normalizeText(unit?.occurrenceKey),
    title: normalizeText(unit?.title),
    anchorRow: normalizeInteger(unit?.anchorRow, 0),
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
      const role = ROLE_BY_LANE[unit.lane];
      const x = ASSEMBLY_X_BY_LANE[unit.lane];
      if (!role || x === undefined) {
        throw new Error(`Unsupported assembly lane for publication: ${unit.lane}`);
      }
      return recipe.rows.map((tiles, index) => ({
        id: `${unit.id}.row.${index + 1}`,
        type: recipe.pdgeditType,
        x,
        y: unit.anchorRow + index,
        title: recipe.rowTitles[index] || `${unit.title} Row ${index + 1}`,
        role,
        tiles,
      }));
    });
}

function sumPrimitiveCounts(units, catalog) {
  return units.reduce(
    (totals, unit) => {
      const recipe = getPdgsolvePdgeditAssemblyRecipe(unit.recipeId, catalog);
      if (!recipe) {
        throw new Error(`Unknown pdgsolve pdgedit assembly recipe: ${unit.recipeId}`);
      }
      totals.electrinoCount += recipe.primitiveCounts.electrinoCount;
      totals.positrinoCount += recipe.primitiveCounts.positrinoCount;
      return totals;
    },
    { electrinoCount: 0, positrinoCount: 0 }
  );
}

function getAdjacentAssemblyUnits(operatorUnit, graph, unitById) {
  const incomingAssemblies = [];
  const outgoingAssemblies = [];
  graph.edges.forEach((edge) => {
    if (edge.toUnitId === operatorUnit.id) {
      const sourceUnit = unitById.get(edge.fromUnitId);
      if (sourceUnit?.kind === "assembly") {
        incomingAssemblies.push(sourceUnit);
      }
    }
    if (edge.fromUnitId === operatorUnit.id) {
      const targetUnit = unitById.get(edge.toUnitId);
      if (targetUnit?.kind === "assembly") {
        outgoingAssemblies.push(targetUnit);
      }
    }
  });
  const dedupeById = (units) => [...new Map(units.map((unit) => [unit.id, unit])).values()];
  return {
    incoming: dedupeById(incomingAssemblies),
    outgoing: dedupeById(outgoingAssemblies),
  };
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
      const x = OPERATOR_X_BY_LANE[unit.lane];
      if (x === undefined) {
        throw new Error(`Unsupported operator lane for publication: ${unit.lane}`);
      }
      const adjacentUnits = getAdjacentAssemblyUnits(unit, graph, unitById);
      const sourceUnits = adjacentUnits.incoming.length ? adjacentUnits.incoming : adjacentUnits.outgoing;
      const counts = sumPrimitiveCounts(sourceUnits, catalog);
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

function buildCompositeLabels(graph, catalog) {
  return graph.units
    .filter((unit) => unit.kind === "assembly" && (unit.lane === 1 || unit.lane === 5))
    .map((unit) => {
      const recipe = getPdgsolvePdgeditAssemblyRecipe(unit.recipeId, catalog);
      if (!recipe) {
        throw new Error(`Unknown pdgsolve pdgedit assembly recipe: ${unit.recipeId}`);
      }
      return {
        id: `label.${unit.id}`,
        side: unit.lane === 1 ? "left" : "right",
        text: recipe.boundaryLabelText,
        rowStart: unit.anchorRow,
        rowEnd: unit.anchorRow + recipe.rows.length - 1,
      };
    });
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
