import {
  buildPdgsolveAssemblyCountKey,
  buildPdgsolveProblemId,
  countPdgsolveAssemblies,
  normalizePdgsolveRequest,
} from "./PdgsolveRequestRuntime.js";
import {
  getPdgsolveAssemblyAllowedLanes,
  getPdgsolveAssemblyLedgerCounts,
  getPdgsolveAssemblyLedgerRecipeId,
  getPdgsolveAssemblyLedgerReviewLabel,
  getPdgsolveAssemblyLedgerTitle,
  isPdgsolveAssemblyAllowedInLane,
  isPdgsolveAssemblyLedgerId,
} from "./PdgsolveAssemblyLedgerRuntime.js";

const INVALID_BOUNDARY_ROLE_FAMILY_ID = "family.request.invalid_boundary_role.v1";
const INVALID_BOUNDARY_ROLE_CANDIDATE_ID = "candidate.request.invalid_boundary_role.v1";
const PASS_THRU_EXACT_FAMILY_ID = "family.pass_thru.exact.v1";
const PASS_THRU_EXACT_CANDIDATE_ID = "candidate.pass_thru.exact.v1";
const UNMAPPED_REQUEST_FAMILY_ID = "family.unmapped_request.v1";
const UNMAPPED_REQUEST_CANDIDATE_ID = "candidate.unmapped_request.v1";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatTitleToken(value = "") {
  return normalizeText(value)
    .split(/[_-]+/u)
    .filter(Boolean)
    .map((token) => `${token.slice(0, 1).toUpperCase()}${token.slice(1)}`)
    .join(" ");
}

function getAssemblyTitle(assemblyId = "", title = "") {
  return normalizeText(title) || getPdgsolveAssemblyLedgerTitle(assemblyId) || formatTitleToken(assemblyId);
}

function getAssemblyRecipeId(assemblyId = "") {
  return getPdgsolveAssemblyLedgerRecipeId(assemblyId) || `pdgsolve.pdgedit.${assemblyId}.v1`;
}

function getAssemblyPrimitiveCounts(assemblyId = "") {
  return getPdgsolveAssemblyLedgerCounts(assemblyId);
}

function isAdmittedAssemblyId(assemblyId = "") {
  return isPdgsolveAssemblyLedgerId(normalizeText(assemblyId));
}

function allRecordsUseAdmittedAssemblies(records = [], lane = 0) {
  return (Array.isArray(records) ? records : []).every((record) => {
    const assemblyId = normalizeText(record?.assemblyId);
    if (!assemblyId || !isAdmittedAssemblyId(assemblyId)) {
      return false;
    }
    return lane > 0 ? isPdgsolveAssemblyAllowedInLane(assemblyId, lane) : true;
  });
}

function countOccurrences(occurrences = []) {
  const counts = new Map();
  occurrences.forEach((occurrence) => {
    const assemblyId = normalizeText(occurrence?.assemblyId);
    if (!assemblyId) {
      return;
    }
    counts.set(assemblyId, (counts.get(assemblyId) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([assemblyId, count]) => ({ assemblyId, count }))
    .sort((left, right) => left.assemblyId.localeCompare(right.assemblyId));
}

function createOccurrences(records = [], lane = 1) {
  const counts = new Map();
  return (Array.isArray(records) ? records : []).map((record, index) => {
    const assemblyId = normalizeText(record?.assemblyId);
    const ordinal = (counts.get(assemblyId) ?? 0) + 1;
    counts.set(assemblyId, ordinal);
    return {
      assemblyId,
      title: getAssemblyTitle(assemblyId, record?.title),
      occurrenceKey: `lane${lane}.${assemblyId}#${ordinal}`,
      ordinal,
      anchorRow: index,
    };
  });
}

function unitIdForOccurrence(occurrence = {}) {
  return `unit_${normalizeText(occurrence.occurrenceKey).replace(/[.#]/gu, "_")}`;
}

function makeAssemblyUnit(occurrence = {}, lane = 1, anchorRow = occurrence.anchorRow) {
  return {
    id: unitIdForOccurrence(occurrence),
    kind: "assembly",
    lane,
    recipeId: getAssemblyRecipeId(occurrence.assemblyId),
    occurrenceKey: occurrence.occurrenceKey,
    title: getAssemblyTitle(occurrence.assemblyId, occurrence.title),
    anchorRow,
  };
}

function makeOperator({
  id = "",
  lane = 2,
  recipeId = "pdgsolve.pdgedit.operator.pass_thru.v1",
  occurrenceKey = "",
  title = "Pass Thru",
  anchorRow = 0,
} = {}) {
  return {
    id,
    kind: "operator",
    lane,
    recipeId,
    occurrenceKey,
    title,
    anchorRow,
  };
}

function makePassThruChoice({
  id = "",
  inputOccurrenceKey = "",
  outputOccurrenceKey = "",
} = {}) {
  return {
    id,
    type: "pass-thru",
    lawId: null,
    inputOccurrenceKeys: [inputOccurrenceKey],
    outputOccurrenceKeys: [outputOccurrenceKey],
  };
}

function makeOutputModel(occurrence = {}, provenanceClass = "mixed", spontaneousSources = [], ambiguous = true) {
  return {
    occurrenceKey: occurrence.occurrenceKey,
    provenanceClass,
    spontaneousSources: cloneJson(spontaneousSources),
    ambiguous,
  };
}

function makeFamily({
  familyId = "",
  kind = "unsupported",
  score = {},
  laneInventories = {},
  lane2Operators = [],
  lane4Operators = [],
  provenanceSummary = {},
  diagnostics = [],
  rawBranchCount = 0,
  publicationReady = false,
  candidateId = "",
  solveGraph = null,
} = {}) {
  const normalizedLaneInventories = {
    lane1: laneInventories.lane1 ?? [],
    lane3: laneInventories.lane3 ?? [],
    lane5: laneInventories.lane5 ?? [],
  };
  return {
    familyId,
    kind,
    score,
    augmentation: {
      left: "none",
      right: "none",
    },
    laneInventories: normalizedLaneInventories,
    lane2Operators,
    lane4Operators,
    provenanceSummary,
    diagnostics,
    rawBranchCount,
    publicationReady,
    canonicalCandidate: {
      candidateId,
      exact: kind === "exact",
      laneInventories: cloneJson(normalizedLaneInventories),
      lane2Operators: cloneJson(lane2Operators),
      lane4Operators: cloneJson(lane4Operators),
      provenanceSummary: cloneJson(provenanceSummary),
      solveGraph,
    },
  };
}

function makeReviewResult({ problemId = "", family = {}, diagnostics = [] } = {}) {
  return {
    schema: "pdgsolve-result/v1",
    problemId,
    searchStatus:
      family.kind === "exact"
        ? "exact_available"
        : family.kind === "partial"
          ? "partial_only"
          : "unsupported",
    bestFamilyId: family.familyId,
    acceptedFamilyId: null,
    diagnostics,
    optionFamilies: [family],
    review: {
      schema: "pdgsolve-review-state/v1",
      state: "review_ready",
      selectedFamilyId: family.familyId,
      acceptedFamilyId: null,
      acceptedRecord: null,
      blockingDiagnostics: diagnostics.filter((diagnostic) => diagnostic.blocking),
    },
    publication: null,
  };
}

function getPrimitiveTotals(occurrences = []) {
  return occurrences.reduce(
    (totals, occurrence) => {
      const counts = getAssemblyPrimitiveCounts(occurrence.assemblyId);
      totals.electrinoCount += counts.electrinoCount;
      totals.positrinoCount += counts.positrinoCount;
      return totals;
    },
    { electrinoCount: 0, positrinoCount: 0 }
  );
}

function getPrimitiveDelta(leftOccurrences = [], rightOccurrences = []) {
  const left = getPrimitiveTotals(leftOccurrences);
  const right = getPrimitiveTotals(rightOccurrences);
  return {
    deltaE: left.electrinoCount - right.electrinoCount,
    deltaP: left.positrinoCount - right.positrinoCount,
  };
}

function makeGenericPassThruUnitId(lane = 2, occurrence = {}) {
  return `unit_lane${lane}_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`;
}

function getInvalidBoundaryRoleDiagnostic(request = {}, occurrence = {}, lane = 0) {
  return {
    id: "pdgsolve.request.invalid_boundary_role",
    phase: "request",
    message:
      "The request uses an assembly in a boundary role where that assembly family is not admitted.",
    blocking: true,
    payload: {
      requestId: normalizeText(request?.requestId),
      assemblyId: normalizeText(occurrence?.assemblyId),
      reviewLabel:
        getPdgsolveAssemblyLedgerReviewLabel(occurrence?.assemblyId) ||
        getAssemblyTitle(occurrence?.assemblyId, occurrence?.title),
      attemptedLane: lane,
      allowedLanes: getPdgsolveAssemblyAllowedLanes(occurrence?.assemblyId),
    },
  };
}

function findInvalidBoundaryRole(request = {}) {
  const reactants = Array.isArray(request?.reactants) ? request.reactants : [];
  const products = Array.isArray(request?.products) ? request.products : [];
  for (const occurrence of reactants) {
    if (isAdmittedAssemblyId(occurrence?.assemblyId) && !isPdgsolveAssemblyAllowedInLane(occurrence?.assemblyId, 1)) {
      return { occurrence, lane: 1 };
    }
  }
  for (const occurrence of products) {
    if (isAdmittedAssemblyId(occurrence?.assemblyId) && !isPdgsolveAssemblyAllowedInLane(occurrence?.assemblyId, 5)) {
      return { occurrence, lane: 5 };
    }
  }
  return null;
}

function buildInvalidBoundaryRoleResult(request = {}, violation = {}) {
  const diagnostic = getInvalidBoundaryRoleDiagnostic(request, violation.occurrence, violation.lane);
  const reactantAssemblies = countPdgsolveAssemblies(request.reactants);
  const productAssemblies = countPdgsolveAssemblies(request.products);
  const provenanceSummary = {
    summaryText:
      "The request stops before search because at least one boundary assembly is not admitted in that boundary role.",
    outputs: createOccurrences(request.products, 5).map((occurrence) => makeOutputModel(occurrence)),
  };
  const family = makeFamily({
    familyId: INVALID_BOUNDARY_ROLE_FAMILY_ID,
    kind: "unsupported",
    score: {
      exactness: 1,
      primitiveMismatch: 999,
      middleMismatch: 999,
      auxiliaryBurden: 999,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 1,
      tieBreakKey: "none|none|lane2:none|lane4:none|lane3:none|rho:invalid_boundary_role",
    },
    laneInventories: {
      lane1: reactantAssemblies,
      lane3: [],
      lane5: productAssemblies,
    },
    provenanceSummary,
    diagnostics: [diagnostic],
    rawBranchCount: 0,
    publicationReady: false,
    candidateId: INVALID_BOUNDARY_ROLE_CANDIDATE_ID,
    solveGraph: null,
  });
  return makeReviewResult({
    problemId: buildPdgsolveProblemId(request),
    family,
    diagnostics: [diagnostic],
  });
}

function buildPassThruPublicationGraph({ lane1 = [], lane3 = [], lane5 = [] } = {}) {
  const lane1Units = lane1.map((occurrence, index) => makeAssemblyUnit(occurrence, 1, index));
  const lane2Units = lane1.map((occurrence) =>
    makeOperator({
      id: makeGenericPassThruUnitId(2, occurrence),
      lane: 2,
      occurrenceKey: `lane2.pass_thru.${occurrence.assemblyId}#${occurrence.ordinal}`,
      title: "Pass Thru",
      anchorRow: occurrence.anchorRow,
    })
  );
  const lane3Units = lane3.map((occurrence, index) => makeAssemblyUnit(occurrence, 3, index));
  const lane4Units = lane3.map((occurrence) =>
    makeOperator({
      id: makeGenericPassThruUnitId(4, occurrence),
      lane: 4,
      occurrenceKey: `lane4.pass_thru.${occurrence.assemblyId}#${occurrence.ordinal}`,
      title: "Pass Thru",
      anchorRow: occurrence.anchorRow,
    })
  );
  const lane5Units = lane5.map((occurrence, index) => makeAssemblyUnit(occurrence, 5, index));
  const lane1UnitByKey = new Map(lane1Units.map((unit) => [unit.occurrenceKey, unit]));
  const lane3UnitByKey = new Map(lane3Units.map((unit) => [unit.occurrenceKey, unit]));
  const lane5UnitByKey = new Map(lane5Units.map((unit) => [unit.occurrenceKey, unit]));
  const lane2UnitByLane1Key = new Map(lane1.map((occurrence, index) => [occurrence.occurrenceKey, lane2Units[index]]));
  const lane4UnitByLane3Key = new Map(lane3.map((occurrence, index) => [occurrence.occurrenceKey, lane4Units[index]]));
  const edges = [];

  lane1.forEach((occurrence) => {
    const lane1Unit = lane1UnitByKey.get(occurrence.occurrenceKey);
    const lane2Unit = lane2UnitByLane1Key.get(occurrence.occurrenceKey);
    const lane3Key = `lane3.${occurrence.assemblyId}#${occurrence.ordinal}`;
    const lane3Unit = lane3UnitByKey.get(lane3Key);
    edges.push({
      id: `edge_lane1_${occurrence.assemblyId}_${occurrence.ordinal}_to_lane2_pass_thru`,
      fromUnitId: lane1Unit.id,
      fromPortId: "output",
      toUnitId: lane2Unit.id,
      toPortId: "input",
    });
    edges.push({
      id: `edge_lane2_pass_thru_to_lane3_${occurrence.assemblyId}_${occurrence.ordinal}`,
      fromUnitId: lane2Unit.id,
      fromPortId: "output",
      toUnitId: lane3Unit.id,
      toPortId: "input",
    });
  });

  lane3.forEach((occurrence) => {
    const lane3Unit = lane3UnitByKey.get(occurrence.occurrenceKey);
    const lane4Unit = lane4UnitByLane3Key.get(occurrence.occurrenceKey);
    const lane5Unit = lane5UnitByKey.get(`lane5.${occurrence.assemblyId}#${occurrence.ordinal}`);
    edges.push({
      id: `edge_lane3_${occurrence.assemblyId}_${occurrence.ordinal}_to_lane4_pass_thru`,
      fromUnitId: lane3Unit.id,
      fromPortId: "output",
      toUnitId: lane4Unit.id,
      toPortId: "input",
    });
    edges.push({
      id: `edge_lane4_pass_thru_to_lane5_${occurrence.assemblyId}_${occurrence.ordinal}`,
      fromUnitId: lane4Unit.id,
      fromPortId: "output",
      toUnitId: lane5Unit.id,
      toPortId: "input",
    });
  });

  return {
    schema: "pdgsolve-publication-graph/v1",
    units: [...lane1Units, ...lane2Units, ...lane3Units, ...lane4Units, ...lane5Units],
    edges,
  };
}

function buildPassThruResult(request = {}) {
  const reactantAssemblies = createOccurrences(request.reactants, 1);
  const intermediateAssemblies = createOccurrences(request.reactants, 3);
  const productAssemblies = createOccurrences(request.products, 5);
  const lane2Operators = reactantAssemblies.map((occurrence) =>
    makePassThruChoice({
      id: `lane2_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`,
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: `lane3.${occurrence.assemblyId}#${occurrence.ordinal}`,
    })
  );
  const lane4Operators = intermediateAssemblies.map((occurrence) =>
    makePassThruChoice({
      id: `lane4_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`,
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: `lane5.${occurrence.assemblyId}#${occurrence.ordinal}`,
    })
  );
  const provenanceSummary = {
    summaryText: "Each reactant assembly carries through unchanged to the requested product assembly.",
    outputs: productAssemblies.map((occurrence) => makeOutputModel(occurrence, "pass_thru", [], false)),
  };
  const graph = buildPassThruPublicationGraph({
    lane1: reactantAssemblies,
    lane3: intermediateAssemblies,
    lane5: productAssemblies,
  });
  const family = makeFamily({
    familyId: PASS_THRU_EXACT_FAMILY_ID,
    kind: "exact",
    score: {
      exactness: 0,
      primitiveMismatch: 0,
      middleMismatch: 0,
      auxiliaryBurden: 0,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 0,
      tieBreakKey: `none|none|lane2:pass-thru(${reactantAssemblies.length})|lane4:pass-thru(${intermediateAssemblies.length})|lane3:${buildPdgsolveAssemblyCountKey(
        request.reactants
      )}|rho:pass_thru`,
    },
    laneInventories: {
      lane1: countOccurrences(reactantAssemblies),
      lane3: countOccurrences(intermediateAssemblies),
      lane5: countOccurrences(productAssemblies),
    },
    lane2Operators,
    lane4Operators,
    provenanceSummary,
    diagnostics: [],
    rawBranchCount: 1,
    publicationReady: true,
    candidateId: PASS_THRU_EXACT_CANDIDATE_ID,
    solveGraph: graph,
  });
  return makeReviewResult({
    problemId: buildPdgsolveProblemId(request),
    family,
    diagnostics: [],
  });
}

function buildUnmappedResult(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const reactantAssemblies = countPdgsolveAssemblies(normalizedRequest.reactants);
  const productAssemblies = countPdgsolveAssemblies(normalizedRequest.products);
  const reactantOccurrences = createOccurrences(normalizedRequest.reactants, 1);
  const productOccurrences = createOccurrences(normalizedRequest.products, 5);
  const delta = getPrimitiveDelta(reactantOccurrences, productOccurrences);
  const diagnostic = {
    id: "pdgsolve.search.unmapped_request",
    phase: "search",
    message: "No admitted deterministic pdgsolve family matches this request yet.",
    blocking: true,
    payload: {
      requestId: normalizedRequest.requestId,
      reactants: reactantAssemblies,
      products: productAssemblies,
      primitiveDelta: delta,
    },
  };
  const provenanceSummary = {
    summaryText:
      "The request does not yet land inside an admitted pdgsolve law family, so the review surface preserves only the requested boundary assemblies and the blocking diagnostic.",
    outputs: productOccurrences.map((occurrence) => makeOutputModel(occurrence)),
  };
  const family = makeFamily({
    familyId: UNMAPPED_REQUEST_FAMILY_ID,
    kind: "unsupported",
    score: {
      exactness: 1,
      primitiveMismatch: Math.abs(delta.deltaE) + Math.abs(delta.deltaP),
      middleMismatch: 999,
      auxiliaryBurden: 999,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 1,
      tieBreakKey: "none|none|lane2:none|lane4:none|lane3:none|rho:unmapped_request",
    },
    laneInventories: {
      lane1: reactantAssemblies,
      lane3: [],
      lane5: productAssemblies,
    },
    lane2Operators: [],
    lane4Operators: [],
    provenanceSummary,
    diagnostics: [diagnostic],
    rawBranchCount: 0,
    publicationReady: false,
    candidateId: UNMAPPED_REQUEST_CANDIDATE_ID,
    solveGraph: null,
  });
  return makeReviewResult({
    problemId: buildPdgsolveProblemId(normalizedRequest),
    family,
    diagnostics: [diagnostic],
  });
}

export function classifyPdgsolveRequestScenario(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const reactantKey = buildPdgsolveAssemblyCountKey(normalizedRequest.reactants);
  const productKey = buildPdgsolveAssemblyCountKey(normalizedRequest.products);

  if (
    reactantKey &&
    reactantKey === productKey &&
    allRecordsUseAdmittedAssemblies(normalizedRequest.reactants, 1) &&
    allRecordsUseAdmittedAssemblies(normalizedRequest.products, 5)
  ) {
    return "pass_thru_exact";
  }

  return "unmapped_request";
}

export function solvePdgsolveSearch(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const invalidBoundaryRole = findInvalidBoundaryRole(normalizedRequest);
  if (invalidBoundaryRole) {
    return buildInvalidBoundaryRoleResult(normalizedRequest, invalidBoundaryRole);
  }

  switch (classifyPdgsolveRequestScenario(normalizedRequest)) {
    case "pass_thru_exact":
      return buildPassThruResult(normalizedRequest);
    default:
      return buildUnmappedResult(normalizedRequest);
  }
}
