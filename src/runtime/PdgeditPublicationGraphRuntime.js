import {
  getPdgeditAssemblyStageXForRole,
  getPdgeditOperatorStageXForSide,
} from "../apps/pdgedit/PdgeditSurfaceGeometryRuntime.js";
import { resolvePdgeditCompositeLabelText } from "../apps/pdgedit/PdgeditCompositeLabelRuntime.js";
import { prepareAcceptedPdgeditDocument } from "./PdgeditAcceptedDocumentRuntime.js";

const PDGEDIT_DOCUMENT_SCHEMA = "pdgedit/v1";
const PDGSOLVE_PUBLICATION_GRAPH_SCHEMA = "pdgsolve-publication-graph/v2";

const ASSEMBLY_ROLE_BY_STAGE = Object.freeze({
  reactantAssemblies: "reactant",
  intermediateAssemblies: "intermediate",
  productAssemblies: "product",
});

const OPERATOR_SIDE_BY_STAGE = Object.freeze({
  reactantSideOperators: "reactant",
  productSideOperators: "product",
});

const COMPOSITE_LABEL_SEQUENCE_SPECS = Object.freeze([
  {
    type: "noether-quad-composite",
    recipeSequence: ["pro_noether_core", "anti_noether_core", "pro_noether_core", "anti_noether_core"],
  },
  {
    type: "pro-proton-composite",
    recipeSequence: ["pro_up_quark", "pro_up_quark", "pro_down_quark"],
  },
  {
    type: "anti-proton-composite",
    recipeSequence: ["anti_up_quark", "anti_up_quark", "anti_down_quark"],
  },
  {
    type: "pro-neutron-composite",
    recipeSequence: ["pro_down_quark", "pro_up_quark", "pro_down_quark"],
  },
  {
    type: "anti-neutron-composite",
    recipeSequence: ["anti_down_quark", "anti_up_quark", "anti_down_quark"],
  },
  {
    type: "positive-pion-composite",
    recipeSequence: ["pro_up_quark", "anti_down_quark"],
  },
  {
    type: "negative-pion-composite",
    recipeSequence: ["pro_down_quark", "anti_up_quark"],
  },
  {
    type: "neutral-pion-u-composite",
    recipeSequence: ["pro_up_quark", "anti_up_quark"],
  },
  {
    type: "neutral-pion-d-composite",
    recipeSequence: ["pro_down_quark", "anti_down_quark"],
  },
  {
    type: "positive-kaon-composite",
    recipeSequence: ["pro_up_quark", "anti_strange_quark"],
  },
  {
    type: "negative-kaon-composite",
    recipeSequence: ["pro_strange_quark", "anti_up_quark"],
  },
  {
    type: "neutral-kaon-d-composite",
    recipeSequence: ["pro_down_quark", "anti_strange_quark"],
  },
  {
    type: "neutral-kaon-s-composite",
    recipeSequence: ["pro_strange_quark", "anti_down_quark"],
  },
  {
    type: "positive-b-meson-composite",
    recipeSequence: ["pro_up_quark", "anti_bottom_quark"],
  },
  {
    type: "negative-b-meson-composite",
    recipeSequence: ["pro_bottom_quark", "anti_up_quark"],
  },
  {
    type: "neutral-b-meson-d-composite",
    recipeSequence: ["pro_down_quark", "anti_bottom_quark"],
  },
  {
    type: "neutral-b-meson-b-composite",
    recipeSequence: ["pro_bottom_quark", "anti_down_quark"],
  },
]);

const COMPOSITE_LABEL_OCCURRENCE_SPECS = Object.freeze([
  {
    canonicalId: "photon",
    type: "photon-composite",
    recipeSequence: ["pro_noether_core", "anti_noether_core"],
  },
  {
    canonicalId: "noether_pair",
    type: "noether-pair-composite",
    recipeSequence: ["pro_noether_core", "anti_noether_core"],
  },
  {
    canonicalId: "proton",
    type: "pro-proton-composite",
    recipeSequence: ["pro_up_quark", "pro_up_quark", "pro_down_quark"],
  },
  {
    canonicalId: "anti_proton",
    type: "anti-proton-composite",
    recipeSequence: ["anti_up_quark", "anti_up_quark", "anti_down_quark"],
  },
  {
    canonicalId: "neutron",
    type: "pro-neutron-composite",
    recipeSequence: ["pro_down_quark", "pro_up_quark", "pro_down_quark"],
  },
  {
    canonicalId: "anti_neutron",
    type: "anti-neutron-composite",
    recipeSequence: ["anti_down_quark", "anti_up_quark", "anti_down_quark"],
  },
  {
    canonicalId: "positive_pion",
    type: "positive-pion-composite",
    recipeSequence: ["pro_up_quark", "anti_down_quark"],
  },
  {
    canonicalId: "negative_pion",
    type: "negative-pion-composite",
    recipeSequence: ["pro_down_quark", "anti_up_quark"],
  },
  {
    canonicalId: "positive_kaon",
    type: "positive-kaon-composite",
    recipeSequence: ["pro_up_quark", "anti_strange_quark"],
  },
  {
    canonicalId: "negative_kaon",
    type: "negative-kaon-composite",
    recipeSequence: ["pro_strange_quark", "anti_up_quark"],
  },
  {
    canonicalId: "neutral_kaon",
    type: "neutral-kaon-d-composite",
    recipeSequence: ["pro_down_quark", "anti_strange_quark"],
  },
  {
    canonicalId: "anti_neutral_kaon",
    type: "neutral-kaon-s-composite",
    recipeSequence: ["pro_strange_quark", "anti_down_quark"],
  },
  {
    canonicalId: "positive_b_meson",
    type: "positive-b-meson-composite",
    recipeSequence: ["pro_up_quark", "anti_bottom_quark"],
  },
  {
    canonicalId: "negative_b_meson",
    type: "negative-b-meson-composite",
    recipeSequence: ["pro_bottom_quark", "anti_up_quark"],
  },
  {
    canonicalId: "neutral_b_meson",
    type: "neutral-b-meson-d-composite",
    recipeSequence: ["pro_down_quark", "anti_bottom_quark"],
  },
  {
    canonicalId: "anti_neutral_b_meson",
    type: "neutral-b-meson-b-composite",
    recipeSequence: ["pro_bottom_quark", "anti_down_quark"],
  },
]);

const COMPOSITE_LABEL_OCCURRENCE_SPEC_BY_CANONICAL_ID = new Map(
  COMPOSITE_LABEL_OCCURRENCE_SPECS.map((spec) => [spec.canonicalId, spec])
);

const COMPOSITE_LABEL_OCCURRENCE_ROLE_BY_SIDE = Object.freeze({
  left: "reactant",
  right: "product",
});

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function normalizePrimitiveCounts(rawCounts) {
  if (!rawCounts || typeof rawCounts !== "object") {
    return null;
  }
  const electrinoCount = normalizeInteger(rawCounts.electrinoCount, -1);
  const positrinoCount = normalizeInteger(rawCounts.positrinoCount, -1);
  if (electrinoCount < 0 || positrinoCount < 0) {
    return null;
  }
  return { electrinoCount, positrinoCount };
}

function normalizeCompositeRecipeId(recipeId = "") {
  const normalizedRecipeId = normalizeText(recipeId);
  if (normalizedRecipeId.endsWith("_III")) {
    return normalizedRecipeId.slice(0, -4);
  }
  if (normalizedRecipeId.endsWith("_II")) {
    return normalizedRecipeId.slice(0, -3);
  }
  if (normalizedRecipeId.endsWith("_I")) {
    return normalizedRecipeId.slice(0, -2);
  }
  return normalizedRecipeId;
}

function normalizeCompositeRowRecord(rowRecord = {}) {
  return {
    recipeId: normalizeCompositeRecipeId(rowRecord?.recipeId),
    occurrenceKey: normalizeText(rowRecord?.occurrenceKey),
  };
}

function parseCompositeOccurrenceKey(occurrenceKey = "") {
  const match = /^(reactant|product)_(.+)_(\d+)\.row\.(\d+)$/u.exec(normalizeText(occurrenceKey));
  if (!match) {
    return null;
  }
  return {
    role: match[1],
    canonicalId: match[2],
    occurrenceIndex: normalizeInteger(match[3], 0),
    rowNumber: normalizeInteger(match[4], 0),
    baseKey: `${match[1]}_${match[2]}_${match[3]}`,
  };
}

function matchCompositeOccurrenceLabel(rowRecords = [], startIndex = 0, side = "left") {
  const firstRow = rowRecords[startIndex];
  const firstOccurrence = parseCompositeOccurrenceKey(firstRow?.occurrenceKey);
  if (!firstOccurrence) {
    return null;
  }
  const expectedRole = COMPOSITE_LABEL_OCCURRENCE_ROLE_BY_SIDE[normalizeText(side)] ?? "";
  if (expectedRole && firstOccurrence.role !== expectedRole) {
    return null;
  }
  const occurrenceSpec = COMPOSITE_LABEL_OCCURRENCE_SPEC_BY_CANONICAL_ID.get(firstOccurrence.canonicalId);
  if (!occurrenceSpec) {
    return null;
  }
  for (let offset = 0; offset < occurrenceSpec.recipeSequence.length; offset += 1) {
    const rowRecord = rowRecords[startIndex + offset];
    const occurrence = parseCompositeOccurrenceKey(rowRecord?.occurrenceKey);
    if (!rowRecord || !occurrence || occurrence.baseKey !== firstOccurrence.baseKey || occurrence.rowNumber !== offset + 1) {
      return null;
    }
    if (normalizeCompositeRecipeId(rowRecord.recipeId) !== occurrenceSpec.recipeSequence[offset]) {
      return null;
    }
  }
  const nextOccurrence = parseCompositeOccurrenceKey(rowRecords[startIndex + occurrenceSpec.recipeSequence.length]?.occurrenceKey);
  if (nextOccurrence?.baseKey === firstOccurrence.baseKey) {
    return null;
  }
  return {
    id: `label.${normalizeText(side)}.${occurrenceSpec.type.replace(/-composite$/u, "")}.${firstOccurrence.baseKey}`,
    type: occurrenceSpec.type,
    rowEnd: startIndex + occurrenceSpec.recipeSequence.length - 1,
  };
}

function buildUnitsById(publicationGraph = {}) {
  return new Map(
    (Array.isArray(publicationGraph?.units) ? publicationGraph.units : [])
      .filter((unit) => normalizeText(unit?.id))
      .map((unit) => [normalizeText(unit.id), unit])
  );
}

function buildAdjacencyMaps(publicationGraph = {}) {
  const incomingByUnitId = new Map();
  const outgoingByUnitId = new Map();

  function append(map, key, value) {
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(value);
  }

  (Array.isArray(publicationGraph?.edges) ? publicationGraph.edges : []).forEach((edge) => {
    const fromUnitId = normalizeText(edge?.fromUnitId);
    const toUnitId = normalizeText(edge?.toUnitId);
    if (!fromUnitId || !toUnitId) {
      return;
    }
    append(outgoingByUnitId, fromUnitId, toUnitId);
    append(incomingByUnitId, toUnitId, fromUnitId);
  });

  return {
    incomingByUnitId,
    outgoingByUnitId,
  };
}

function getAssemblyUnitCounts(unit = {}) {
  if (normalizeText(unit?.kind) !== "assembly") {
    return null;
  }
  const hasElectrinoCount = Object.prototype.hasOwnProperty.call(unit, "electrinoCount");
  const hasPositrinoCount = Object.prototype.hasOwnProperty.call(unit, "positrinoCount");
  if (!hasElectrinoCount && !hasPositrinoCount) {
    return null;
  }
  return {
    electrinoCount: normalizeInteger(unit?.electrinoCount, 0),
    positrinoCount: normalizeInteger(unit?.positrinoCount, 0),
  };
}

function hasNonZeroPrimitiveCounts(counts = null) {
  return Boolean(
    counts &&
      (normalizeInteger(counts?.electrinoCount, 0) !== 0 || normalizeInteger(counts?.positrinoCount, 0) !== 0)
  );
}

function sumAssemblyCounts(units = []) {
  let foundAny = false;
  const totals = {
    electrinoCount: 0,
    positrinoCount: 0,
  };
  units.forEach((unit) => {
    const counts = getAssemblyUnitCounts(unit);
    if (!counts) {
      return;
    }
    foundAny = true;
    totals.electrinoCount += counts.electrinoCount;
    totals.positrinoCount += counts.positrinoCount;
  });
  return foundAny ? totals : null;
}

function getOperatorCountsFromPublicationGraph(operatorUnit = {}, unitsById = new Map(), adjacency = {}) {
  const operatorUnitId = normalizeText(operatorUnit?.id);
  const incomingUnits = (adjacency.incomingByUnitId?.get(operatorUnitId) ?? [])
    .map((unitId) => unitsById.get(unitId))
    .filter(Boolean);
  const outgoingUnits = (adjacency.outgoingByUnitId?.get(operatorUnitId) ?? [])
    .map((unitId) => unitsById.get(unitId))
    .filter(Boolean);
  const incomingTotals = sumAssemblyCounts(incomingUnits);
  const outgoingTotals = sumAssemblyCounts(outgoingUnits);
  const preferredTotals =
    normalizeText(operatorUnit?.stage) === "productSideOperators"
      ? hasNonZeroPrimitiveCounts(outgoingTotals)
        ? outgoingTotals
        : incomingTotals ?? outgoingTotals
      : hasNonZeroPrimitiveCounts(incomingTotals)
      ? incomingTotals
      : outgoingTotals ?? incomingTotals;
  return {
    positrinoCount: preferredTotals?.positrinoCount ?? 0,
    electrinoCount: preferredTotals?.electrinoCount ?? 0,
  };
}

function getResidueSampleCountsFromPublicationGraph(assemblyUnit = {}, unitsById = new Map(), adjacency = {}) {
  const explicitCounts = getAssemblyUnitCounts(assemblyUnit);
  if (hasNonZeroPrimitiveCounts(explicitCounts)) {
    return explicitCounts;
  }
  const assemblyUnitId = normalizeText(assemblyUnit?.id);
  const incomingOperatorUnits = (adjacency.incomingByUnitId?.get(assemblyUnitId) ?? [])
    .map((unitId) => unitsById.get(unitId))
    .filter((unit) => normalizeText(unit?.kind) === "operator");
  const incomingOperatorTotals = incomingOperatorUnits.reduce(
    (totals, operatorUnit) => {
      const counts = getOperatorCountsFromPublicationGraph(operatorUnit, unitsById, adjacency);
      totals.electrinoCount += counts.electrinoCount;
      totals.positrinoCount += counts.positrinoCount;
      return totals;
    },
    { electrinoCount: 0, positrinoCount: 0 }
  );
  if (hasNonZeroPrimitiveCounts(incomingOperatorTotals)) {
    return incomingOperatorTotals;
  }
  return explicitCounts ?? { electrinoCount: 0, positrinoCount: 0 };
}

function buildCompositeLabelsForSide(rowRecords = [], side = "left") {
  const normalizedSide = normalizeText(side);
  const normalizedRows = (Array.isArray(rowRecords) ? rowRecords : []).map(normalizeCompositeRowRecord);
  const normalizedRecipeIds = normalizedRows.map((rowRecord) => rowRecord.recipeId);
  const compositeLabels = [];
  let rowIndex = 0;
  while (rowIndex < normalizedRecipeIds.length) {
    const occurrenceMatch = matchCompositeOccurrenceLabel(normalizedRows, rowIndex, normalizedSide);
    if (occurrenceMatch) {
      compositeLabels.push({
        id: occurrenceMatch.id,
        type: occurrenceMatch.type,
        side: normalizedSide,
        text: resolvePdgeditCompositeLabelText(occurrenceMatch.type),
        rowStart: rowIndex,
        rowEnd: occurrenceMatch.rowEnd,
      });
      rowIndex = occurrenceMatch.rowEnd + 1;
      continue;
    }
    const match = COMPOSITE_LABEL_SEQUENCE_SPECS.find((spec) =>
      spec.recipeSequence.every((recipeId, offset) => normalizedRecipeIds[rowIndex + offset] === recipeId)
    );
    if (!match) {
      rowIndex += 1;
      continue;
    }
    compositeLabels.push({
      id: `label.${normalizedSide}.${match.type.replace(/-composite$/u, "")}.${rowIndex + 1}`,
      type: match.type,
      side: normalizedSide,
      text: resolvePdgeditCompositeLabelText(match.type),
      rowStart: rowIndex,
      rowEnd: rowIndex + match.recipeSequence.length - 1,
    });
    rowIndex += match.recipeSequence.length;
  }
  return compositeLabels;
}

function buildCompositeLabels(reactantRows = [], productRows = []) {
  return [
    ...buildCompositeLabelsForSide(reactantRows, "left"),
    ...buildCompositeLabelsForSide(productRows, "right"),
  ];
}

function resolveAssemblyPresentationPayload(unit = {}, resolver = null) {
  if (typeof resolver !== "function") {
    throw new Error("pdgedit publication-graph rendering requires resolveAssemblyPresentation().");
  }
  const presentation = resolver(normalizeText(unit?.recipeId), unit);
  const type = normalizeText(presentation?.type);
  const title = normalizeText(presentation?.title);
  const tiles = Array.isArray(presentation?.tiles)
    ? presentation.tiles.map((tile) => normalizeText(tile))
    : [];
  if (!type || tiles.length !== 4) {
    throw new Error(`Missing pdgedit assembly presentation for ${normalizeText(unit?.recipeId)}.`);
  }
  return {
    type,
    title,
    tiles,
  };
}

export function buildPdgeditDocumentFromPublicationGraph(
  publicationGraph = {},
  {
    resolveAssemblyPresentation = null,
    prepareForDisplay = true,
  } = {}
) {
  if (normalizeText(publicationGraph?.schema) !== PDGSOLVE_PUBLICATION_GRAPH_SCHEMA) {
    throw new Error(
      `pdgedit publication-graph rendering requires ${PDGSOLVE_PUBLICATION_GRAPH_SCHEMA}.`
    );
  }

  const unitsById = buildUnitsById(publicationGraph);
  const adjacency = buildAdjacencyMaps(publicationGraph);
  const nextRowByStage = new Map();
  const assemblies = [];
  const operators = [];
  const compositeLabelRowsByRole = {
    reactant: [],
    product: [],
  };

  (Array.isArray(publicationGraph?.units) ? publicationGraph.units : []).forEach((unit) => {
    const kind = normalizeText(unit?.kind);
    const stage = normalizeText(unit?.stage);
    const y = nextRowByStage.get(stage) ?? 0;
    nextRowByStage.set(stage, y + 1);

    if (kind === "assembly" && ASSEMBLY_ROLE_BY_STAGE[stage]) {
      const role = ASSEMBLY_ROLE_BY_STAGE[stage];
      const presentation = resolveAssemblyPresentationPayload(unit, resolveAssemblyPresentation);
      const counts = getAssemblyUnitCounts(unit) ?? { electrinoCount: 0, positrinoCount: 0 };
      const residueCounts =
        normalizeText(unit?.recipeId) === "unbound_architrinos_residue"
          ? getResidueSampleCountsFromPublicationGraph(unit, unitsById, adjacency)
          : null;
      assemblies.push({
        id: normalizeText(unit?.id),
        type: presentation.type,
        x: getPdgeditAssemblyStageXForRole(role),
        y,
        title: normalizeText(unit?.title) || presentation.title || presentation.type,
        role,
        tiles: [...presentation.tiles],
        primitiveCounts: {
          electrinoCount: residueCounts?.electrinoCount ?? counts.electrinoCount,
          positrinoCount: residueCounts?.positrinoCount ?? counts.positrinoCount,
        },
        ...(normalizeText(unit?.recipeId) === "unbound_architrinos_residue"
          ? {
              sampleCounts: {
                topCount: String(residueCounts?.electrinoCount ?? counts.electrinoCount),
                bottomCount: String(residueCounts?.positrinoCount ?? counts.positrinoCount),
              },
            }
          : {}),
      });
      if (role === "reactant" || role === "product") {
        compositeLabelRowsByRole[role].push({
          recipeId: normalizeText(unit?.recipeId),
          occurrenceKey: normalizeText(unit?.occurrenceKey),
        });
      }
      return;
    }

    if (kind === "operator" && OPERATOR_SIDE_BY_STAGE[stage]) {
      const counts = getOperatorCountsFromPublicationGraph(unit, unitsById, adjacency);
      operators.push({
        id: normalizeText(unit?.id),
        type: normalizeText(unit?.recipeId),
        x: getPdgeditOperatorStageXForSide(OPERATOR_SIDE_BY_STAGE[stage]),
        y,
        title: normalizeText(unit?.title),
        positrinoCount: counts.positrinoCount,
        electrinoCount: counts.electrinoCount,
      });
    }
  });

  const document = {
    schema: PDGEDIT_DOCUMENT_SCHEMA,
    assemblies,
    operators,
    links: (Array.isArray(publicationGraph?.edges) ? publicationGraph.edges : []).map((edge) => ({
      id: `edge_${normalizeText(edge?.id)}`,
      endpointA: normalizeText(edge?.fromUnitId),
      endpointB: normalizeText(edge?.toUnitId),
      ...(normalizePrimitiveCounts(edge?.primitiveCounts)
        ? { primitiveCounts: normalizePrimitiveCounts(edge?.primitiveCounts) }
        : {}),
    })),
    compositeLabels: buildCompositeLabels(compositeLabelRowsByRole.reactant, compositeLabelRowsByRole.product),
  };

  return prepareForDisplay ? prepareAcceptedPdgeditDocument(document) : document;
}
