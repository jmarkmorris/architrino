import {
  buildPdgsolveAssemblyCountKey,
  buildPdgsolveProblemId,
  countPdgsolveAssemblies,
  normalizePdgsolveRequest,
} from "./PdgsolveRequestRuntime.js";
import {
  getPdgsolveAssemblyAllowedStages,
  getPdgsolveAssemblyLedgerCounts,
  getPdgsolveAssemblyLedgerRecipeId,
  getPdgsolveAssemblyLedgerReviewLabel,
  getPdgsolveAssemblyLedgerTitle,
  isPdgsolveAssemblyAllowedInStage,
  isPdgsolveAssemblyLedgerId,
} from "./PdgsolveAssemblyLedgerRuntime.js";
import { PDGSOLVE_STAGE_IDS } from "./PdgsolveStageRuntime.js";

const INVALID_BOUNDARY_ROLE_FAMILY_ID = "family.request.invalid_boundary_role.v1";
const INVALID_BOUNDARY_ROLE_CANDIDATE_ID = "candidate.request.invalid_boundary_role.v1";
const PASS_THRU_EXACT_FAMILY_ID = "family.pass_thru.exact.v1";
const PASS_THRU_EXACT_CANDIDATE_ID = "candidate.pass_thru.exact.v1";
const NO_EXACT_CLOSURE_FAMILY_ID = "family.no_exact_closure.v1";
const NO_EXACT_CLOSURE_CANDIDATE_ID = "candidate.no_exact_closure.v1";

const {
  REACTANT_ASSEMBLIES,
  REACTANT_SIDE_OPERATORS,
  INTERMEDIATE_ASSEMBLIES,
  PRODUCT_SIDE_OPERATORS,
  PRODUCT_ASSEMBLIES,
} = PDGSOLVE_STAGE_IDS;

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

function buildOccurrenceKey(stageId = "", assemblyId = "", ordinal = 0) {
  return `${normalizeText(stageId)}.${normalizeText(assemblyId)}#${Math.max(0, Number(ordinal) || 0)}`;
}

function buildPassThruOperatorOccurrenceKey(stageId = "", occurrence = {}) {
  return `${normalizeText(stageId)}.pass_thru.${normalizeText(occurrence?.assemblyId)}#${Math.max(
    0,
    Number(occurrence?.ordinal) || 0
  )}`;
}

function buildPassThruChoiceId(stageId = "", occurrence = {}) {
  return `${normalizeText(stageId)}_pass_thru_${normalizeText(occurrence?.assemblyId)}_${Math.max(
    0,
    Number(occurrence?.ordinal) || 0
  )}`;
}

function allRecordsUseAdmittedAssemblies(records = [], stageId = "") {
  return (Array.isArray(records) ? records : []).every((record) => {
    const assemblyId = normalizeText(record?.assemblyId);
    if (!assemblyId || !isAdmittedAssemblyId(assemblyId)) {
      return false;
    }
    return stageId ? isPdgsolveAssemblyAllowedInStage(assemblyId, stageId) : true;
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

function createOccurrences(records = [], stageId = REACTANT_ASSEMBLIES) {
  const counts = new Map();
  return (Array.isArray(records) ? records : []).map((record, index) => {
    const assemblyId = normalizeText(record?.assemblyId);
    const ordinal = (counts.get(assemblyId) ?? 0) + 1;
    counts.set(assemblyId, ordinal);
    return {
      assemblyId,
      title: getAssemblyTitle(assemblyId, record?.title),
      occurrenceKey: buildOccurrenceKey(stageId, assemblyId, ordinal),
      ordinal,
      anchorRow: index,
    };
  });
}

function unitIdForOccurrence(occurrence = {}) {
  return `unit_${normalizeText(occurrence.occurrenceKey).replace(/[.#]/gu, "_")}`;
}

function makeAssemblyUnit(occurrence = {}, stage = REACTANT_ASSEMBLIES, anchorRow = occurrence.anchorRow) {
  return {
    id: unitIdForOccurrence(occurrence),
    kind: "assembly",
    stage,
    recipeId: getAssemblyRecipeId(occurrence.assemblyId),
    occurrenceKey: occurrence.occurrenceKey,
    title: getAssemblyTitle(occurrence.assemblyId, occurrence.title),
    anchorRow,
  };
}

function makeOperator({
  id = "",
  stage = REACTANT_SIDE_OPERATORS,
  recipeId = "pdgsolve.pdgedit.operator.pass_thru.v1",
  occurrenceKey = "",
  title = "Pass Thru",
  anchorRow = 0,
} = {}) {
  return {
    id,
    kind: "operator",
    stage,
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
  kind = "no_exact_closure",
  score = {},
  reactantAssemblies = [],
  reactantSideOperators = [],
  intermediateAssemblies = [],
  productSideOperators = [],
  productAssemblies = [],
  provenanceSummary = {},
  diagnostics = [],
  rawBranchCount = 0,
  publicationReady = false,
  candidateId = "",
  solveGraph = null,
} = {}) {
  return {
    familyId,
    kind,
    score,
    augmentation: {
      reactantSide: "none",
      productSide: "none",
    },
    reactantAssemblies,
    reactantSideOperators,
    intermediateAssemblies,
    productSideOperators,
    productAssemblies,
    provenanceSummary,
    diagnostics,
    rawBranchCount,
    publicationReady,
    canonicalCandidate: {
      candidateId,
      exact: kind === "exact",
      reactantAssemblies: cloneJson(reactantAssemblies),
      reactantSideOperators: cloneJson(reactantSideOperators),
      intermediateAssemblies: cloneJson(intermediateAssemblies),
      productSideOperators: cloneJson(productSideOperators),
      productAssemblies: cloneJson(productAssemblies),
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
          : "no_exact_closure",
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

function getPrimitiveDelta(reactantOccurrences = [], productOccurrences = []) {
  const reactants = getPrimitiveTotals(reactantOccurrences);
  const products = getPrimitiveTotals(productOccurrences);
  return {
    deltaE: reactants.electrinoCount - products.electrinoCount,
    deltaP: reactants.positrinoCount - products.positrinoCount,
  };
}

function makeGenericPassThruUnitId(stageId = REACTANT_SIDE_OPERATORS, occurrence = {}) {
  return `unit_${normalizeText(stageId)}_pass_thru_${normalizeText(occurrence?.assemblyId)}_${Math.max(
    0,
    Number(occurrence?.ordinal) || 0
  )}`;
}

function getInvalidBoundaryRoleDiagnostic(request = {}, occurrence = {}, stageId = "") {
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
      attemptedStage: stageId,
      allowedStages: getPdgsolveAssemblyAllowedStages(occurrence?.assemblyId),
    },
  };
}

function findInvalidBoundaryRole(request = {}) {
  const reactants = Array.isArray(request?.reactants) ? request.reactants : [];
  const products = Array.isArray(request?.products) ? request.products : [];
  for (const occurrence of reactants) {
    if (
      isAdmittedAssemblyId(occurrence?.assemblyId) &&
      !isPdgsolveAssemblyAllowedInStage(occurrence?.assemblyId, REACTANT_ASSEMBLIES)
    ) {
      return { occurrence, stage: REACTANT_ASSEMBLIES };
    }
  }
  for (const occurrence of products) {
    if (
      isAdmittedAssemblyId(occurrence?.assemblyId) &&
      !isPdgsolveAssemblyAllowedInStage(occurrence?.assemblyId, PRODUCT_ASSEMBLIES)
    ) {
      return { occurrence, stage: PRODUCT_ASSEMBLIES };
    }
  }
  return null;
}

function buildInvalidBoundaryRoleResult(request = {}, violation = {}) {
  const diagnostic = getInvalidBoundaryRoleDiagnostic(request, violation.occurrence, violation.stage);
  const reactantAssemblies = countPdgsolveAssemblies(request.reactants);
  const productAssemblies = countPdgsolveAssemblies(request.products);
  const provenanceSummary = {
    summaryText:
      "The request stops before search because at least one boundary assembly is not admitted in that boundary role.",
    outputs: createOccurrences(request.products, PRODUCT_ASSEMBLIES).map((occurrence) => makeOutputModel(occurrence)),
  };
  const family = makeFamily({
    familyId: INVALID_BOUNDARY_ROLE_FAMILY_ID,
    kind: "no_exact_closure",
    score: {
      exactness: 1,
      primitiveMismatch: 999,
      middleMismatch: 999,
      auxiliaryBurden: 999,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 1,
      tieBreakKey:
        "none|none|reactantSideOperators:none|productSideOperators:none|intermediateAssemblies:none|rho:invalid_boundary_role",
    },
    reactantAssemblies,
    reactantSideOperators: [],
    intermediateAssemblies: [],
    productSideOperators: [],
    productAssemblies,
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

function buildPassThruPublicationGraph({
  reactantAssemblies = [],
  intermediateAssemblies = [],
  productAssemblies = [],
} = {}) {
  const reactantAssemblyUnits = reactantAssemblies.map((occurrence, index) =>
    makeAssemblyUnit(occurrence, REACTANT_ASSEMBLIES, index)
  );
  const reactantSideOperatorUnits = reactantAssemblies.map((occurrence) =>
    makeOperator({
      id: makeGenericPassThruUnitId(REACTANT_SIDE_OPERATORS, occurrence),
      stage: REACTANT_SIDE_OPERATORS,
      occurrenceKey: buildPassThruOperatorOccurrenceKey(REACTANT_SIDE_OPERATORS, occurrence),
      title: "Pass Thru",
      anchorRow: occurrence.anchorRow,
    })
  );
  const intermediateAssemblyUnits = intermediateAssemblies.map((occurrence, index) =>
    makeAssemblyUnit(occurrence, INTERMEDIATE_ASSEMBLIES, index)
  );
  const productSideOperatorUnits = intermediateAssemblies.map((occurrence) =>
    makeOperator({
      id: makeGenericPassThruUnitId(PRODUCT_SIDE_OPERATORS, occurrence),
      stage: PRODUCT_SIDE_OPERATORS,
      occurrenceKey: buildPassThruOperatorOccurrenceKey(PRODUCT_SIDE_OPERATORS, occurrence),
      title: "Pass Thru",
      anchorRow: occurrence.anchorRow,
    })
  );
  const productAssemblyUnits = productAssemblies.map((occurrence, index) =>
    makeAssemblyUnit(occurrence, PRODUCT_ASSEMBLIES, index)
  );

  const reactantAssemblyUnitByKey = new Map(reactantAssemblyUnits.map((unit) => [unit.occurrenceKey, unit]));
  const intermediateAssemblyUnitByKey = new Map(
    intermediateAssemblyUnits.map((unit) => [unit.occurrenceKey, unit])
  );
  const productAssemblyUnitByKey = new Map(productAssemblyUnits.map((unit) => [unit.occurrenceKey, unit]));
  const reactantSideOperatorUnitByReactantKey = new Map(
    reactantAssemblies.map((occurrence, index) => [occurrence.occurrenceKey, reactantSideOperatorUnits[index]])
  );
  const productSideOperatorUnitByIntermediateKey = new Map(
    intermediateAssemblies.map((occurrence, index) => [occurrence.occurrenceKey, productSideOperatorUnits[index]])
  );
  const edges = [];

  reactantAssemblies.forEach((occurrence) => {
    const reactantAssemblyUnit = reactantAssemblyUnitByKey.get(occurrence.occurrenceKey);
    const reactantSideOperatorUnit = reactantSideOperatorUnitByReactantKey.get(occurrence.occurrenceKey);
    const intermediateAssemblyKey = buildOccurrenceKey(
      INTERMEDIATE_ASSEMBLIES,
      occurrence.assemblyId,
      occurrence.ordinal
    );
    const intermediateAssemblyUnit = intermediateAssemblyUnitByKey.get(intermediateAssemblyKey);
    edges.push({
      id: `edge_reactantAssemblies_${occurrence.assemblyId}_${occurrence.ordinal}_to_reactantSideOperators_pass_thru`,
      fromUnitId: reactantAssemblyUnit.id,
      fromPortId: "output",
      toUnitId: reactantSideOperatorUnit.id,
      toPortId: "input",
    });
    edges.push({
      id: `edge_reactantSideOperators_pass_thru_to_intermediateAssemblies_${occurrence.assemblyId}_${occurrence.ordinal}`,
      fromUnitId: reactantSideOperatorUnit.id,
      fromPortId: "output",
      toUnitId: intermediateAssemblyUnit.id,
      toPortId: "input",
    });
  });

  intermediateAssemblies.forEach((occurrence) => {
    const intermediateAssemblyUnit = intermediateAssemblyUnitByKey.get(occurrence.occurrenceKey);
    const productSideOperatorUnit = productSideOperatorUnitByIntermediateKey.get(occurrence.occurrenceKey);
    const productAssemblyKey = buildOccurrenceKey(PRODUCT_ASSEMBLIES, occurrence.assemblyId, occurrence.ordinal);
    const productAssemblyUnit = productAssemblyUnitByKey.get(productAssemblyKey);
    edges.push({
      id: `edge_intermediateAssemblies_${occurrence.assemblyId}_${occurrence.ordinal}_to_productSideOperators_pass_thru`,
      fromUnitId: intermediateAssemblyUnit.id,
      fromPortId: "output",
      toUnitId: productSideOperatorUnit.id,
      toPortId: "input",
    });
    edges.push({
      id: `edge_productSideOperators_pass_thru_to_productAssemblies_${occurrence.assemblyId}_${occurrence.ordinal}`,
      fromUnitId: productSideOperatorUnit.id,
      fromPortId: "output",
      toUnitId: productAssemblyUnit.id,
      toPortId: "input",
    });
  });

  return {
    schema: "pdgsolve-publication-graph/v1",
    units: [
      ...reactantAssemblyUnits,
      ...reactantSideOperatorUnits,
      ...intermediateAssemblyUnits,
      ...productSideOperatorUnits,
      ...productAssemblyUnits,
    ],
    edges,
  };
}

function buildPassThruResult(request = {}) {
  const reactantOccurrences = createOccurrences(request.reactants, REACTANT_ASSEMBLIES);
  const intermediateOccurrences = createOccurrences(request.reactants, INTERMEDIATE_ASSEMBLIES);
  const productOccurrences = createOccurrences(request.products, PRODUCT_ASSEMBLIES);
  const reactantSideOperators = reactantOccurrences.map((occurrence) =>
    makePassThruChoice({
      id: buildPassThruChoiceId(REACTANT_SIDE_OPERATORS, occurrence),
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: buildOccurrenceKey(INTERMEDIATE_ASSEMBLIES, occurrence.assemblyId, occurrence.ordinal),
    })
  );
  const productSideOperators = intermediateOccurrences.map((occurrence) =>
    makePassThruChoice({
      id: buildPassThruChoiceId(PRODUCT_SIDE_OPERATORS, occurrence),
      inputOccurrenceKey: occurrence.occurrenceKey,
      outputOccurrenceKey: buildOccurrenceKey(PRODUCT_ASSEMBLIES, occurrence.assemblyId, occurrence.ordinal),
    })
  );
  const provenanceSummary = {
    summaryText: "Each reactant assembly carries through unchanged to the requested product assembly.",
    outputs: productOccurrences.map((occurrence) => makeOutputModel(occurrence, "pass_thru", [], false)),
  };
  const graph = buildPassThruPublicationGraph({
    reactantAssemblies: reactantOccurrences,
    intermediateAssemblies: intermediateOccurrences,
    productAssemblies: productOccurrences,
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
      tieBreakKey: `none|none|reactantSideOperators:pass-thru(${reactantOccurrences.length})|productSideOperators:pass-thru(${intermediateOccurrences.length})|intermediateAssemblies:${buildPdgsolveAssemblyCountKey(
        request.reactants
      )}|rho:pass_thru`,
    },
    reactantAssemblies: countOccurrences(reactantOccurrences),
    reactantSideOperators,
    intermediateAssemblies: countOccurrences(intermediateOccurrences),
    productSideOperators,
    productAssemblies: countOccurrences(productOccurrences),
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

function buildNoExactClosureResult(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const reactantAssemblies = countPdgsolveAssemblies(normalizedRequest.reactants);
  const productAssemblies = countPdgsolveAssemblies(normalizedRequest.products);
  const reactantOccurrences = createOccurrences(normalizedRequest.reactants, REACTANT_ASSEMBLIES);
  const productOccurrences = createOccurrences(normalizedRequest.products, PRODUCT_ASSEMBLIES);
  const delta = getPrimitiveDelta(reactantOccurrences, productOccurrences);
  const diagnostic = {
    id: "pdgsolve.search.no_exact_closure",
    phase: "search",
    message: "No admitted deterministic pdgsolve family closes this request exactly.",
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
      "The request does not yet close inside an admitted pdgsolve law family, so the review surface preserves only the requested boundary assemblies and the blocking diagnostic.",
    outputs: productOccurrences.map((occurrence) => makeOutputModel(occurrence)),
  };
  const family = makeFamily({
    familyId: NO_EXACT_CLOSURE_FAMILY_ID,
    kind: "no_exact_closure",
    score: {
      exactness: 1,
      primitiveMismatch: Math.abs(delta.deltaE) + Math.abs(delta.deltaP),
      middleMismatch: 999,
      auxiliaryBurden: 999,
      nonIdentityOperatorCount: 0,
      dissociationCount: 0,
      ambiguityPenalty: 1,
      tieBreakKey:
        "none|none|reactantSideOperators:none|productSideOperators:none|intermediateAssemblies:none|rho:no_exact_closure",
    },
    reactantAssemblies,
    reactantSideOperators: [],
    intermediateAssemblies: [],
    productSideOperators: [],
    productAssemblies,
    provenanceSummary,
    diagnostics: [diagnostic],
    rawBranchCount: 0,
    publicationReady: false,
    candidateId: NO_EXACT_CLOSURE_CANDIDATE_ID,
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
    allRecordsUseAdmittedAssemblies(normalizedRequest.reactants, REACTANT_ASSEMBLIES) &&
    allRecordsUseAdmittedAssemblies(normalizedRequest.products, PRODUCT_ASSEMBLIES)
  ) {
    return "pass_thru_exact";
  }

  return "no_exact_closure";
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
      return buildNoExactClosureResult(normalizedRequest);
  }
}
