import freeNeutronBetaExactResultJson from "../../../content/contracts/examples/pdgsolve-result/free_neutron_beta_exact_result.v1.json" with { type: "json" };
import freeNeutronBetaSupportDisallowedResultJson from "../../../content/contracts/examples/pdgsolve-result/free_neutron_beta_support_disallowed_result.v1.json" with { type: "json" };
import passThruNeutronResultJson from "../../../content/contracts/examples/pdgsolve-result/pass_thru_neutron_result.v1.json" with { type: "json" };
import primitiveImbalanceNeutronToProtonResultJson from "../../../content/contracts/examples/pdgsolve-result/primitive_imbalance_neutron_to_proton_result.v1.json" with { type: "json" };

import {
  buildPdgsolveAssemblyCountKey,
  buildPdgsolveProblemId,
  countPdgsolveAssemblies,
  normalizePdgsolveRequest,
} from "./PdgsolveRequestRuntime.js";

const BETA_PRODUCT_KEY = "electron:1|electron_antineutrino:1|pro_down_quark:1|pro_up_quark:2";
const NEUTRON_ROW_KEY = "pro_down_quark:2|pro_up_quark:1";
const NEUTRON_ROWS_WITH_CORE_SUPPORT_KEY =
  "anti_noether_core:2|pro_down_quark:2|pro_noether_core:2|pro_up_quark:1";
const PROTON_ROW_KEY = "pro_down_quark:1|pro_up_quark:2";
const ALLOW_IMPLIED_NOETHER_CORE_SUPPORT = "allow-implied-noether-core-support";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function patchRequestIdDeep(value, nextRequestId) {
  if (Array.isArray(value)) {
    value.forEach((entry) => patchRequestIdDeep(entry, nextRequestId));
    return value;
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  Object.entries(value).forEach(([key, nestedValue]) => {
    if (key === "requestId" && typeof nestedValue === "string") {
      value[key] = nextRequestId;
      return;
    }
    patchRequestIdDeep(nestedValue, nextRequestId);
  });
  return value;
}

function patchResultTemplate(template, request) {
  const nextResult = cloneJson(template);
  nextResult.problemId = buildPdgsolveProblemId(request);
  nextResult.acceptedFamilyId = null;
  if (nextResult?.review) {
    nextResult.review.acceptedFamilyId = null;
    nextResult.review.acceptedRecord = null;
  }
  patchRequestIdDeep(nextResult, normalizeText(request?.requestId));
  return nextResult;
}

function clearNormalizationDiagnostics(result) {
  result.diagnostics = (Array.isArray(result?.diagnostics) ? result.diagnostics : []).filter(
    (diagnostic) => normalizeText(diagnostic?.phase) !== "normalization"
  );
  if (result?.review) {
    result.review.blockingDiagnostics = (Array.isArray(result.review.blockingDiagnostics)
      ? result.review.blockingDiagnostics
      : []
    ).filter((diagnostic) => normalizeText(diagnostic?.phase) !== "normalization");
  }
  return result;
}

function buildOutputOccurrenceModels(products = []) {
  const outputs = [];
  const counts = new Map();
  (Array.isArray(products) ? products : []).forEach((product) => {
    const assemblyId = normalizeText(product?.assemblyId);
    if (!assemblyId) {
      return;
    }
    const count = (counts.get(assemblyId) ?? 0) + 1;
    counts.set(assemblyId, count);
    outputs.push({
      occurrenceKey: `lane5.${assemblyId}#${count}`,
      provenanceClass: "mixed",
      supportSourceRows: [],
      ambiguous: true,
    });
  });
  return outputs;
}

function buildUnmappedResult(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const lane1 = countPdgsolveAssemblies(normalizedRequest.reactants);
  const lane5 = countPdgsolveAssemblies(normalizedRequest.products);
  const outputs = buildOutputOccurrenceModels(normalizedRequest.products);
  const diagnostic = {
    id: "pdgsolve.search.unmapped_request",
    phase: "search",
    message: "No deterministic pdgsolve v1 family is frozen for this request yet.",
    blocking: true,
    payload: {
      requestId: normalizedRequest.requestId,
      reactants: lane1,
      products: lane5,
    },
  };
  return {
    schema: "pdgsolve-result/v1",
    problemId: buildPdgsolveProblemId(normalizedRequest),
    searchStatus: "unsupported",
    bestFamilyId: "family.unmapped_request.v1",
    acceptedFamilyId: null,
    diagnostics: [diagnostic],
    optionFamilies: [
      {
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
        augmentation: {
          left: "none",
          right: "none",
        },
        laneInventories: {
          lane1,
          lane3: [],
          lane5,
        },
        lane2Operators: [],
        lane4Operators: [],
        provenanceSummary: {
          summaryText:
            "The request does not yet land inside a frozen pdgsolve v1 family, so the review surface can only preserve the input/output inventory and the blocking diagnostic.",
          outputs,
        },
        diagnostics: [diagnostic],
        rawBranchCount: 0,
        publicationReady: false,
        canonicalCandidate: {
          candidateId: "candidate.unmapped_request.v1",
          exact: false,
          laneInventories: {
            lane1,
            lane3: [],
            lane5,
          },
          lane2Operators: [],
          lane4Operators: [],
          provenanceSummary: {
            summaryText:
              "The request does not yet land inside a frozen pdgsolve v1 family, so no publication graph can be emitted.",
            outputs,
          },
          solveGraph: null,
        },
      },
    ],
    review: {
      schema: "pdgsolve-review-state/v1",
      state: "review_ready",
      selectedFamilyId: "family.unmapped_request.v1",
      acceptedFamilyId: null,
      acceptedRecord: null,
      blockingDiagnostics: [diagnostic],
    },
    publication: null,
  };
}

export function classifyPdgsolveRequestScenario(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  const reactantKey = buildPdgsolveAssemblyCountKey(normalizedRequest.reactants);
  const productKey = buildPdgsolveAssemblyCountKey(normalizedRequest.products);
  const supportMode = normalizeText(normalizedRequest?.policy?.betaSupportMode);

  if (productKey === BETA_PRODUCT_KEY) {
    if (reactantKey === NEUTRON_ROWS_WITH_CORE_SUPPORT_KEY) {
      return "beta_exact_explicit_support";
    }
    if (reactantKey === NEUTRON_ROW_KEY && supportMode === ALLOW_IMPLIED_NOETHER_CORE_SUPPORT) {
      return "beta_exact_implied_support";
    }
    if (reactantKey === NEUTRON_ROW_KEY && supportMode === "explicit-only") {
      return "beta_support_required";
    }
  }

  if (reactantKey === NEUTRON_ROW_KEY && productKey === PROTON_ROW_KEY) {
    return "primitive_imbalance_neutron_to_proton";
  }

  if (reactantKey === NEUTRON_ROW_KEY && productKey === NEUTRON_ROW_KEY) {
    return "pass_thru_neutron";
  }

  return "unmapped_request";
}

export function solvePdgsolveRequest(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  switch (classifyPdgsolveRequestScenario(normalizedRequest)) {
    case "beta_exact_implied_support":
      return patchResultTemplate(freeNeutronBetaExactResultJson, normalizedRequest);
    case "beta_exact_explicit_support": {
      const result = patchResultTemplate(freeNeutronBetaExactResultJson, normalizedRequest);
      clearNormalizationDiagnostics(result);
      return result;
    }
    case "beta_support_required":
      return patchResultTemplate(freeNeutronBetaSupportDisallowedResultJson, normalizedRequest);
    case "primitive_imbalance_neutron_to_proton":
      return patchResultTemplate(primitiveImbalanceNeutronToProtonResultJson, normalizedRequest);
    case "pass_thru_neutron":
      return patchResultTemplate(passThruNeutronResultJson, normalizedRequest);
    default:
      return buildUnmappedResult(normalizedRequest);
  }
}

export function selectPdgsolveResultFamily(result = {}, familyId = "") {
  const normalizedFamilyId = normalizeText(familyId);
  const families = Array.isArray(result?.optionFamilies) ? result.optionFamilies : [];
  if (normalizedFamilyId) {
    return families.find((family) => family.familyId === normalizedFamilyId) ?? null;
  }
  return families.find((family) => family.familyId === result?.bestFamilyId) ?? families[0] ?? null;
}
