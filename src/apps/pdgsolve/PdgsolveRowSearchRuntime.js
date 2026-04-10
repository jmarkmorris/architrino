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
import {
  BETA_ACTIVE_DISSOCIATE_LAW,
  BETA_ASSOCIATE_LAWS,
  FERMION_DECOMPOSITION_LAW_TABLE_ID,
  getPdgsolveFermionDecompositionResidueRows,
  getPdgsolveFermionResidueRow,
  isPdgsolveFermionResidueRow,
} from "./PdgsolveFermionDecompositionRuntime.js";

const BETA_PRODUCT_KEY = "electron:1|electron_antineutrino:1|pro_down_quark:1|pro_up_quark:2";
const NEUTRON_ROW_KEY = "pro_down_quark:2|pro_up_quark:1";
const NEUTRON_ROWS_WITH_CORE_SUPPORT_KEY =
  "anti_noether_core:2|pro_down_quark:2|pro_noether_core:2|pro_up_quark:1";
const PROTON_ROW_KEY = "pro_down_quark:1|pro_up_quark:2";
const ALLOW_IMPLIED_NOETHER_CORE_SUPPORT = "allow-implied-noether-core-support";
const BETA_EXACT_FAMILY_ID = "family.beta.fermion_decomposition.v1";
const BETA_EXACT_CANDIDATE_ID = "candidate.beta.fermion_decomposition.v1";
const BETA_SUPPORT_REQUIRED_FAMILY_ID = "family.beta.support_required.v1";
const BETA_SUPPORT_REQUIRED_CANDIDATE_ID = "candidate.beta.support_required.v1";
const INVALID_BOUNDARY_ROLE_FAMILY_ID = "family.request.invalid_lane_role.v1";
const INVALID_BOUNDARY_ROLE_CANDIDATE_ID = "candidate.request.invalid_lane_role.v1";

const BETA_SUPPORT_ROWS = Object.freeze([
  { rowAssemblyId: "pro_noether_core", count: 2 },
  { rowAssemblyId: "anti_noether_core", count: 2 },
]);

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

function getPrimitiveMismatch(leftOccurrences = [], rightOccurrences = []) {
  const delta = getPrimitiveDelta(leftOccurrences, rightOccurrences);
  return Math.abs(delta.deltaE) + Math.abs(delta.deltaP);
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

function occurrenceCountsByAssembly(occurrences = []) {
  const counts = new Map();
  occurrences.forEach((occurrence) => {
    counts.set(occurrence.assemblyId, (counts.get(occurrence.assemblyId) ?? 0) + 1);
  });
  return counts;
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

function createSupportOccurrence(assemblyId = "", ordinal = 1, anchorRow = 0) {
  return {
    assemblyId,
    title: getAssemblyTitle(assemblyId),
    occurrenceKey: `lane1.${assemblyId}#${ordinal}`,
    ordinal,
    anchorRow,
  };
}

function appendImpliedBetaSupportRows(lane1Occurrences = []) {
  const counts = occurrenceCountsByAssembly(lane1Occurrences);
  const nextOccurrences = [...lane1Occurrences];
  const orderedSupportIds = [
    "pro_noether_core",
    "anti_noether_core",
    "pro_noether_core",
    "anti_noether_core",
  ];
  orderedSupportIds.forEach((assemblyId) => {
    const ordinal = (counts.get(assemblyId) ?? 0) + 1;
    counts.set(assemblyId, ordinal);
    nextOccurrences.push(createSupportOccurrence(assemblyId, ordinal, nextOccurrences.length));
  });
  return nextOccurrences;
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

function makeAssociateChoice({
  id = "",
  lawId = "",
  inputOccurrenceKeys = [],
  outputOccurrenceKey = "",
} = {}) {
  return {
    id,
    type: "associate",
    lawId,
    inputOccurrenceKeys: [...inputOccurrenceKeys],
    outputOccurrenceKeys: [outputOccurrenceKey],
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

function makeOutputModel(occurrence = {}, provenanceClass = "mixed", supportSourceRows = [], ambiguous = true) {
  return {
    occurrenceKey: occurrence.occurrenceKey,
    provenanceClass,
    supportSourceRows: cloneJson(supportSourceRows),
    ambiguous,
  };
}

function getSupportAddedDiagnostic(request = {}, supportOccurrences = []) {
  return {
    id: "pdgsolve.normalization.support_added.noether_core_rows",
    phase: "normalization",
    message:
      "Normalization added implied Noether-core support rows: two pro Noether core rows and two anti Noether core rows.",
    blocking: false,
    payload: {
      requestId: normalizeText(request?.requestId),
      addedOccurrenceIds: supportOccurrences.map((occurrence) => occurrence.occurrenceKey),
      requiredSupportRows: cloneJson(BETA_SUPPORT_ROWS),
    },
  };
}

function getSupportRequiredDiagnostic(request = {}) {
  return {
    id: "pdgsolve.normalization.support_required.noether_core_rows",
    phase: "normalization",
    message: "Beta-family exact closure requires explicit or policy-allowed Noether-core support rows.",
    blocking: true,
    payload: {
      requestId: normalizeText(request?.requestId),
      policyMode: "explicit-only",
      requiredSupportRows: cloneJson(BETA_SUPPORT_ROWS),
      lawTableId: FERMION_DECOMPOSITION_LAW_TABLE_ID,
    },
  };
}

function getInvalidLaneRoleDiagnostic(request = {}, occurrence = {}, lane = 0) {
  return {
    id: "pdgsolve.request.invalid_lane_role",
    phase: "request",
    message:
      "The request uses a solver-native row in a boundary lane where that row family is not admitted.",
    blocking: true,
    payload: {
      requestId: normalizeText(request?.requestId),
      assemblyId: normalizeText(occurrence?.assemblyId),
      reviewLabel:
        getPdgsolveAssemblyLedgerReviewLabel(occurrence?.assemblyId) || getAssemblyTitle(occurrence?.assemblyId, occurrence?.title),
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
  const diagnostic = getInvalidLaneRoleDiagnostic(request, violation.occurrence, violation.lane);
  const lane1 = countPdgsolveAssemblies(request.reactants);
  const lane5 = countPdgsolveAssemblies(request.products);
  const provenanceSummary = {
    summaryText:
      "The request stops before search because at least one solver-native row is being asked to enter through a boundary lane where that row family is forbidden.",
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
      lane1,
      lane3: [],
      lane5,
    },
    lane2Operators: [],
    lane4Operators: [],
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

function buildPrimitiveImbalanceResult(request = {}) {
  const lane1 = createOccurrences(request.reactants, 1);
  const lane3 = createOccurrences(request.reactants, 3);
  const lane5 = createOccurrences(request.products, 5);
  const delta = getPrimitiveDelta(lane1, lane5);
  const diagnostic = {
    id: "pdgsolve.search.primitive_imbalance",
    phase: "search",
    message: `The retained branch has a primitive imbalance of ${delta.deltaE >= 0 ? "+" : ""}${delta.deltaE} Electrinos and ${delta.deltaP >= 0 ? "+" : ""}${delta.deltaP} Positrinos.`,
    blocking: true,
    payload: {
      augmentation: {
        left: "none",
        right: "none",
      },
      deltaE: delta.deltaE,
      deltaP: delta.deltaP,
    },
  };
  const retainedDiagnostic = {
    id: "pdgsolve.search.non_exact_candidate_retained",
    phase: "search",
    message:
      "The best retained family is partial because the row-level request remains primitively imbalanced.",
    blocking: false,
    payload: {
      familyId: "family.primitive_imbalance.row_level.v1",
      failureMode: "primitive_imbalance",
    },
  };
  const lane2Operators = lane1.map((occurrence) =>
    makePassThruChoice({
      id: `lane2_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`,
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: `lane3.${occurrence.assemblyId}#${occurrence.ordinal}`,
    })
  );
  const provenanceSummary = {
    summaryText:
      "The retained partial branch carries the reactant rows through to lane 3, but the requested product rows cannot close without violating the primitive balance.",
    outputs: lane5.map((occurrence) => makeOutputModel(occurrence)),
  };
  const family = makeFamily({
    familyId: "family.primitive_imbalance.row_level.v1",
    kind: "partial",
    score: {
      exactness: 1,
      primitiveMismatch: Math.abs(delta.deltaE) + Math.abs(delta.deltaP),
      middleMismatch: 2,
      auxiliaryBurden: 0,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 1,
      tieBreakKey:
        "none|none|lane2:pass-thru,pass-thru,pass-thru|lane4:none|lane3:pro_down_quark,pro_down_quark,pro_up_quark|rho:primitive_imbalance",
    },
    laneInventories: {
      lane1: countOccurrences(lane1),
      lane3: countOccurrences(lane3),
      lane5: countOccurrences(lane5),
    },
    lane2Operators,
    lane4Operators: [],
    provenanceSummary,
    diagnostics: [retainedDiagnostic],
    rawBranchCount: 1,
    publicationReady: false,
    candidateId: "candidate.primitive_imbalance.row_level.v1",
    solveGraph: null,
  });
  return makeReviewResult({
    problemId: buildPdgsolveProblemId(request),
    family,
    diagnostics: [diagnostic],
  });
}

function makeGenericPassThruUnitId(lane = 2, occurrence = {}) {
  return `unit_lane${lane}_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`;
}

function buildPassThruResult(request = {}) {
  const lane1 = createOccurrences(request.reactants, 1);
  const lane3 = createOccurrences(request.reactants, 3);
  const lane5 = createOccurrences(request.products, 5);
  const lane2Operators = lane1.map((occurrence) =>
    makePassThruChoice({
      id: `lane2_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`,
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: `lane3.${occurrence.assemblyId}#${occurrence.ordinal}`,
    })
  );
  const lane4Operators = lane3.map((occurrence) =>
    makePassThruChoice({
      id: `lane4_pass_thru_${occurrence.assemblyId}_${occurrence.ordinal}`,
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: `lane5.${occurrence.assemblyId}#${occurrence.ordinal}`,
    })
  );
  const provenanceSummary = {
    summaryText: "Each row carries through unchanged from lane 1 to lane 5.",
    outputs: lane5.map((occurrence) => makeOutputModel(occurrence, "pass_thru", [], false)),
  };
  const graph = buildPassThruPublicationGraph({ lane1, lane3, lane5 });
  const family = makeFamily({
    familyId: "family.pass_thru.rows.v1",
    kind: "exact",
    score: {
      exactness: 0,
      primitiveMismatch: 0,
      middleMismatch: 0,
      auxiliaryBurden: 0,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 0,
      tieBreakKey:
        "none|none|lane2:pass-thru,pass-thru,pass-thru|lane4:pass-thru,pass-thru,pass-thru|lane3:pro_down_quark,pro_down_quark,pro_up_quark|rho:pass_thru",
    },
    laneInventories: {
      lane1: countOccurrences(lane1),
      lane3: countOccurrences(lane3),
      lane5: countOccurrences(lane5),
    },
    lane2Operators,
    lane4Operators,
    provenanceSummary,
    diagnostics: [],
    rawBranchCount: 1,
    publicationReady: true,
    candidateId: "candidate.pass_thru.rows.v1",
    solveGraph: graph,
  });
  return makeReviewResult({
    problemId: buildPdgsolveProblemId(request),
    family,
    diagnostics: [],
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

function buildBetaSupportRequiredResult(request = {}) {
  const lane1 = createOccurrences(request.reactants, 1);
  const lane5 = createOccurrences(request.products, 5);
  const diagnostic = getSupportRequiredDiagnostic(request);
  const provenanceSummary = {
    summaryText:
      "The beta-family request remains review-only because the admitted fermion decomposition laws require two pro Noether core rows and two anti Noether core rows in lane 1.",
    outputs: lane5.map((occurrence) => makeOutputModel(occurrence)),
  };
  const family = makeFamily({
    familyId: BETA_SUPPORT_REQUIRED_FAMILY_ID,
    kind: "unsupported",
    score: {
      exactness: 1,
      primitiveMismatch: getPrimitiveMismatch(lane1, lane5),
      middleMismatch: 3,
      auxiliaryBurden: 2,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 2,
      tieBreakKey: "none|none|lane2:none|lane4:none|lane3:none|rho:support_required",
    },
    laneInventories: {
      lane1: countOccurrences(lane1),
      lane3: [],
      lane5: countOccurrences(lane5),
    },
    lane2Operators: [],
    lane4Operators: [],
    provenanceSummary,
    diagnostics: [diagnostic],
    rawBranchCount: 0,
    publicationReady: false,
    candidateId: BETA_SUPPORT_REQUIRED_CANDIDATE_ID,
    solveGraph: null,
  });
  return makeReviewResult({
    problemId: buildPdgsolveProblemId(request),
    family,
    diagnostics: [diagnostic],
  });
}

function buildBetaLane3Records() {
  return [
    { assemblyId: "pro_down_quark", title: "Pro Down Quark" },
    { assemblyId: "pro_up_quark", title: "Pro Up Quark" },
    { assemblyId: "unbound_architrino_residue_e4_p8", title: "Unbound Architrino Residue 4E/8P" },
    { assemblyId: "unbound_architrino_residue_e9_p3", title: "Unbound Architrino Residue 9E/3P" },
    { assemblyId: "unbound_architrino_residue_e6_p6", title: "Unbound Architrino Residue 6E/6P" },
  ];
}

function findOccurrenceByKey(occurrences = [], occurrenceKey = "") {
  return occurrences.find((occurrence) => occurrence.occurrenceKey === occurrenceKey) ?? null;
}

function buildBetaFermionDecompositionPublicationGraph({ lane1 = [], lane3 = [], lane5 = [] } = {}) {
  const lane1Units = lane1.map((occurrence, index) => makeAssemblyUnit(occurrence, 1, index));
  const lane3Units = lane3.map((occurrence, index) => makeAssemblyUnit(occurrence, 3, index));
  const lane5Units = lane5.map((occurrence, index) => makeAssemblyUnit(occurrence, 5, index));

  const lane2PassThroughOccurrences = [
    findOccurrenceByKey(lane1, "lane1.pro_down_quark#1"),
    findOccurrenceByKey(lane1, "lane1.pro_up_quark#1"),
  ].filter(Boolean);
  const lane2PassThroughUnits = lane2PassThroughOccurrences.map((occurrence) =>
    makeOperator({
      id: makeGenericPassThruUnitId(2, occurrence),
      lane: 2,
      occurrenceKey: `lane2.pass_thru.${occurrence.assemblyId}#${occurrence.ordinal}`,
      title: "Pass Thru",
      anchorRow: occurrence.anchorRow,
    })
  );
  const lane2DissociateUnit = makeOperator({
    id: "unit_lane2_fermion_decomposition_dissociate",
    lane: 2,
    recipeId: "pdgsolve.pdgedit.operator.dissociate.v1",
    occurrenceKey: `lane2.${BETA_ACTIVE_DISSOCIATE_LAW.id}#1`,
    title: "Dissociate",
    anchorRow: 2,
  });

  const lane4Units = [
    makeOperator({
      id: "unit_lane4_pass_thru_pro_up_quark_1",
      lane: 4,
      occurrenceKey: "lane4.pass_thru.pro_up_quark#1",
      title: "Pass Thru",
      anchorRow: 0,
    }),
    makeOperator({
      id: "unit_lane4_pass_thru_pro_down_quark_1",
      lane: 4,
      occurrenceKey: "lane4.pass_thru.pro_down_quark#1",
      title: "Pass Thru",
      anchorRow: 1,
    }),
    makeOperator({
      id: "unit_lane4_associate_unbound_architrino_residue_e4_p8_1",
      lane: 4,
      recipeId: "pdgsolve.pdgedit.operator.associate.v1",
      occurrenceKey: `lane4.${BETA_ASSOCIATE_LAWS[0].id}#1`,
      title: "Associate",
      anchorRow: 2,
    }),
    makeOperator({
      id: "unit_lane4_associate_unbound_architrino_residue_e9_p3_1",
      lane: 4,
      recipeId: "pdgsolve.pdgedit.operator.associate.v1",
      occurrenceKey: `lane4.${BETA_ASSOCIATE_LAWS[1].id}#1`,
      title: "Associate",
      anchorRow: 3,
    }),
    makeOperator({
      id: "unit_lane4_associate_unbound_architrino_residue_e6_p6_1",
      lane: 4,
      recipeId: "pdgsolve.pdgedit.operator.associate.v1",
      occurrenceKey: `lane4.${BETA_ASSOCIATE_LAWS[2].id}#1`,
      title: "Associate",
      anchorRow: 4,
    }),
  ];

  const unitByOccurrenceKey = new Map(
    [...lane1Units, ...lane3Units, ...lane5Units].map((unit) => [unit.occurrenceKey, unit])
  );
  const lane2PassThroughUnitByInputKey = new Map(
    lane2PassThroughOccurrences.map((occurrence, index) => [occurrence.occurrenceKey, lane2PassThroughUnits[index]])
  );
  const lane4UnitByInputKey = new Map([
    ["lane3.pro_up_quark#1", lane4Units[0]],
    ["lane3.pro_down_quark#1", lane4Units[1]],
    ["lane3.unbound_architrino_residue_e4_p8#1", lane4Units[2]],
    ["lane3.unbound_architrino_residue_e9_p3#1", lane4Units[3]],
    ["lane3.unbound_architrino_residue_e6_p6#1", lane4Units[4]],
  ]);

  const edges = [];

  lane2PassThroughOccurrences.forEach((occurrence) => {
    const lane1Unit = unitByOccurrenceKey.get(occurrence.occurrenceKey);
    const lane2Unit = lane2PassThroughUnitByInputKey.get(occurrence.occurrenceKey);
    const lane3Unit = unitByOccurrenceKey.get(`lane3.${occurrence.assemblyId}#${occurrence.ordinal}`);
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

  const activeInput = unitByOccurrenceKey.get("lane1.pro_down_quark#2");
  edges.push({
    id: "edge_lane1_pro_down_quark_2_to_fermion_decomposition_dissociate",
    fromUnitId: activeInput.id,
    fromPortId: "output",
    toUnitId: lane2DissociateUnit.id,
    toPortId: "input",
  });

  [
    "lane3.unbound_architrino_residue_e4_p8#1",
    "lane3.unbound_architrino_residue_e9_p3#1",
    "lane3.unbound_architrino_residue_e6_p6#1",
  ].forEach((occurrenceKey) => {
    const lane3Unit = unitByOccurrenceKey.get(occurrenceKey);
    const suffix = normalizeText(occurrenceKey).replace(/^lane3\./u, "").replace(/[#.]/gu, "_");
    edges.push({
      id: `edge_fermion_decomposition_dissociate_to_${suffix}`,
      fromUnitId: lane2DissociateUnit.id,
      fromPortId: "output",
      toUnitId: lane3Unit.id,
      toPortId: "input",
    });
  });

  [
    "lane3.pro_up_quark#1",
    "lane3.pro_down_quark#1",
    "lane3.unbound_architrino_residue_e4_p8#1",
    "lane3.unbound_architrino_residue_e9_p3#1",
    "lane3.unbound_architrino_residue_e6_p6#1",
  ].forEach((occurrenceKey) => {
    const lane3Unit = unitByOccurrenceKey.get(occurrenceKey);
    const lane4Unit = lane4UnitByInputKey.get(occurrenceKey);
    const outputAssemblyId =
      occurrenceKey === "lane3.pro_up_quark#1"
        ? "lane5.pro_up_quark#1"
        : occurrenceKey === "lane3.pro_down_quark#1"
          ? "lane5.pro_down_quark#1"
          : occurrenceKey === "lane3.unbound_architrino_residue_e4_p8#1"
            ? "lane5.pro_up_quark#2"
            : occurrenceKey === "lane3.unbound_architrino_residue_e9_p3#1"
              ? "lane5.electron#1"
              : "lane5.electron_antineutrino#1";
    const lane5Unit = unitByOccurrenceKey.get(outputAssemblyId);
    const suffix = normalizeText(occurrenceKey).replace(/^lane3\./u, "").replace(/[#.]/gu, "_");
    const operatorKind = lane4Unit.recipeId === "pdgsolve.pdgedit.operator.associate.v1" ? "associate" : "pass_thru";
    edges.push({
      id: `edge_${suffix}_to_lane4_${operatorKind}`,
      fromUnitId: lane3Unit.id,
      fromPortId: "output",
      toUnitId: lane4Unit.id,
      toPortId: "input",
    });
    edges.push({
      id: `edge_lane4_${operatorKind}_to_${normalizeText(outputAssemblyId).replace(/^lane5\./u, "").replace(/[#.]/gu, "_")}`,
      fromUnitId: lane4Unit.id,
      fromPortId: "output",
      toUnitId: lane5Unit.id,
      toPortId: "input",
    });
  });

  return {
    schema: "pdgsolve-publication-graph/v1",
    units: [...lane1Units, ...lane2PassThroughUnits, lane2DissociateUnit, ...lane3Units, ...lane4Units, ...lane5Units],
    edges,
  };
}

function buildBetaExactResult(request = {}, { impliedSupport = false } = {}) {
  const baseLane1 = createOccurrences(request.reactants, 1);
  const lane1 = impliedSupport ? appendImpliedBetaSupportRows(baseLane1) : baseLane1;
  const lane3 = createOccurrences(buildBetaLane3Records(), 3);
  const lane5 = createOccurrences(request.products, 5);
  const supportOccurrences = lane1.filter(
    (occurrence) => occurrence.assemblyId === "pro_noether_core" || occurrence.assemblyId === "anti_noether_core"
  );
  const normalizationDiagnostics = impliedSupport ? [getSupportAddedDiagnostic(request, supportOccurrences)] : [];

  const lane2Operators = [
    makePassThruChoice({
      id: "lane2_pass_thru_pro_down_quark_1",
      inputOccurrenceKey: "lane1.pro_down_quark#1",
      outputOccurrenceKey: "lane3.pro_down_quark#1",
    }),
    makePassThruChoice({
      id: "lane2_pass_thru_pro_up_quark_1",
      inputOccurrenceKey: "lane1.pro_up_quark#1",
      outputOccurrenceKey: "lane3.pro_up_quark#1",
    }),
    {
      id: "lane2_fermion_decomposition_dissociate",
      type: "dissociate",
      lawId: BETA_ACTIVE_DISSOCIATE_LAW.id,
      requiredSupportRows: cloneJson(BETA_ACTIVE_DISSOCIATE_LAW.requiredSupportRows),
      inputOccurrenceKeys: ["lane1.pro_down_quark#2"],
      outputOccurrenceKeys: [
        "lane3.unbound_architrino_residue_e4_p8#1",
        "lane3.unbound_architrino_residue_e9_p3#1",
        "lane3.unbound_architrino_residue_e6_p6#1",
      ],
    },
  ];

  const lane4Operators = [
    makePassThruChoice({
      id: "lane4_pass_thru_pro_up_quark_1",
      inputOccurrenceKey: "lane3.pro_up_quark#1",
      outputOccurrenceKey: "lane5.pro_up_quark#1",
    }),
    makePassThruChoice({
      id: "lane4_pass_thru_pro_down_quark_1",
      inputOccurrenceKey: "lane3.pro_down_quark#1",
      outputOccurrenceKey: "lane5.pro_down_quark#1",
    }),
    makeAssociateChoice({
      id: "lane4_associate_unbound_architrino_residue_e4_p8_1",
      lawId: BETA_ASSOCIATE_LAWS[0].id,
      inputOccurrenceKeys: ["lane3.unbound_architrino_residue_e4_p8#1"],
      outputOccurrenceKey: "lane5.pro_up_quark#2",
    }),
    makeAssociateChoice({
      id: "lane4_associate_unbound_architrino_residue_e9_p3_1",
      lawId: BETA_ASSOCIATE_LAWS[1].id,
      inputOccurrenceKeys: ["lane3.unbound_architrino_residue_e9_p3#1"],
      outputOccurrenceKey: "lane5.electron#1",
    }),
    makeAssociateChoice({
      id: "lane4_associate_unbound_architrino_residue_e6_p6_1",
      lawId: BETA_ASSOCIATE_LAWS[2].id,
      inputOccurrenceKeys: ["lane3.unbound_architrino_residue_e6_p6#1"],
      outputOccurrenceKey: "lane5.electron_antineutrino#1",
    }),
  ];

  const provenanceSummary = {
    summaryText:
      "The spectator pro-down-quark and pro-up-quark rows pass through, while the active pro-down-quark row dissociates through admitted unbound architrino residue rows that then associate into one pro-up-quark row, one electron row, and one electron-antineutrino row.",
    outputs: [
      makeOutputModel(findOccurrenceByKey(lane5, "lane5.pro_up_quark#1"), "pass_thru", [], false),
      makeOutputModel(findOccurrenceByKey(lane5, "lane5.pro_down_quark#1"), "pass_thru", [], false),
      makeOutputModel(findOccurrenceByKey(lane5, "lane5.pro_up_quark#2"), "active_rewrite", [], false),
      makeOutputModel(findOccurrenceByKey(lane5, "lane5.electron#1"), "support_derived", BETA_SUPPORT_ROWS, false),
      makeOutputModel(
        findOccurrenceByKey(lane5, "lane5.electron_antineutrino#1"),
        "support_derived",
        BETA_SUPPORT_ROWS,
        false
      ),
    ],
  };

  const graph = buildBetaFermionDecompositionPublicationGraph({ lane1, lane3, lane5 });
  const family = makeFamily({
    familyId: BETA_EXACT_FAMILY_ID,
    kind: "exact",
    score: {
      exactness: 0,
      primitiveMismatch: 0,
      middleMismatch: 0,
      auxiliaryBurden: 2,
      nonIdentityOperatorCount: 4,
      dissociationCount: 1,
      ambiguityPenalty: 0,
      tieBreakKey:
        "none|none|lane2:pass-thru,pass-thru,dissociate(row.fermion_decomposition)|lane4:pass-thru,pass-thru,associate,associate,associate|lane3:pro_down_quark,pro_up_quark,residue_e4_p8,residue_e9_p3,residue_e6_p6|rho:pro_up_quark=pass_thru,pro_down_quark=pass_thru,pro_up_quark=active,electron=support,electron_antineutrino=support",
    },
    laneInventories: {
      lane1: countOccurrences(lane1),
      lane3: countOccurrences(lane3),
      lane5: countOccurrences(lane5),
    },
    lane2Operators,
    lane4Operators,
    provenanceSummary,
    diagnostics: [],
    rawBranchCount: 1,
    publicationReady: true,
    candidateId: BETA_EXACT_CANDIDATE_ID,
    solveGraph: graph,
  });

  return makeReviewResult({
    problemId: buildPdgsolveProblemId(request),
    family,
    diagnostics: normalizationDiagnostics,
  });
}

function buildUnmappedResult(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const lane1 = countPdgsolveAssemblies(normalizedRequest.reactants);
  const lane5 = countPdgsolveAssemblies(normalizedRequest.products);
  const outputs = createOccurrences(normalizedRequest.products, 5).map((occurrence) => makeOutputModel(occurrence));
  const diagnostic = {
    id: "pdgsolve.search.unmapped_request",
    phase: "search",
    message: "No deterministic pdgsolve v1 family is admitted for this request yet.",
    blocking: true,
    payload: {
      requestId: normalizedRequest.requestId,
      reactants: lane1,
      products: lane5,
    },
  };
  const provenanceSummary = {
    summaryText:
      "The request does not yet land inside an admitted pdgsolve law family, so the review surface can only preserve the input/output inventory and the blocking diagnostic.",
    outputs,
  };
  const family = makeFamily({
    familyId: "family.unmapped_request.v1",
    kind: "unsupported",
    score: {
      exactness: 1,
      primitiveMismatch: 999,
      middleMismatch: 999,
      auxiliaryBurden: 999,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 1,
      tieBreakKey: "none|none|lane2:none|lane4:none|lane3:none|rho:unmapped_request",
    },
    laneInventories: {
      lane1,
      lane3: [],
      lane5,
    },
    lane2Operators: [],
    lane4Operators: [],
    provenanceSummary,
    diagnostics: [diagnostic],
    rawBranchCount: 0,
    publicationReady: false,
    candidateId: "candidate.unmapped_request.v1",
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
  const supportMode = normalizeText(normalizedRequest?.policy?.betaSupportMode);

  if (productKey === BETA_PRODUCT_KEY) {
    if (reactantKey === NEUTRON_ROWS_WITH_CORE_SUPPORT_KEY) {
      return "beta_fermion_decomposition_exact_explicit_support";
    }
    if (reactantKey === NEUTRON_ROW_KEY && supportMode === ALLOW_IMPLIED_NOETHER_CORE_SUPPORT) {
      return "beta_fermion_decomposition_exact_implied_support";
    }
    if (reactantKey === NEUTRON_ROW_KEY && supportMode === "explicit-only") {
      return "beta_support_required";
    }
  }

  if (reactantKey === NEUTRON_ROW_KEY && productKey === PROTON_ROW_KEY) {
    return "primitive_imbalance_neutron_to_proton";
  }

  if (
    reactantKey === productKey &&
    reactantKey &&
    allRecordsUseAdmittedAssemblies(normalizedRequest.reactants, 1) &&
    allRecordsUseAdmittedAssemblies(normalizedRequest.products, 5)
  ) {
    return "pass_thru_rows";
  }

  return "unmapped_request";
}

export function solvePdgsolveRowSearch(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const invalidBoundaryRole = findInvalidBoundaryRole(normalizedRequest);
  if (invalidBoundaryRole) {
    return buildInvalidBoundaryRoleResult(normalizedRequest, invalidBoundaryRole);
  }

  switch (classifyPdgsolveRequestScenario(normalizedRequest)) {
    case "beta_fermion_decomposition_exact_implied_support":
      return buildBetaExactResult(normalizedRequest, { impliedSupport: true });
    case "beta_fermion_decomposition_exact_explicit_support":
      return buildBetaExactResult(normalizedRequest, { impliedSupport: false });
    case "beta_support_required":
      return buildBetaSupportRequiredResult(normalizedRequest);
    case "primitive_imbalance_neutron_to_proton":
      return buildPrimitiveImbalanceResult(normalizedRequest);
    case "pass_thru_rows":
      return buildPassThruResult(normalizedRequest);
    default:
      return buildUnmappedResult(normalizedRequest);
  }
}

export function getPdgsolveResidueReviewModel() {
  return getPdgsolveFermionDecompositionResidueRows().map((residue) => ({
    assemblyId: residue.assemblyId,
    reviewLabel: residue.reviewLabel,
    displayLabel: residue.displayLabel,
    primitiveCounts: {
      electrinoCount: residue.electrinoCount,
      positrinoCount: residue.positrinoCount,
    },
    allowedLanes: [...residue.allowedLanes],
    publicationRecipeId: residue.publicationRecipeId,
    associatesToAssemblyId: residue.associatesToAssemblyId,
  }));
}

export function describePdgsolveResidueRow(assemblyId = "") {
  const residue = getPdgsolveFermionResidueRow(assemblyId);
  if (!residue) {
    return null;
  }
  return {
    ...residue,
    primitiveCounts: {
      electrinoCount: residue.electrinoCount,
      positrinoCount: residue.positrinoCount,
    },
  };
}

export function isPdgsolveResidueAssemblyId(assemblyId = "") {
  return isPdgsolveFermionResidueRow(assemblyId);
}
