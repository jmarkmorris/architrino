import { buildPdgeditDocumentFromPdgsolvePublicationGraph } from "./PdgsolvePdgeditPublicationRuntime.js";
import { normalizePdgsolvePolicy } from "./PdgsolveRequestRuntime.js";
import { selectPdgsolveResultFamily } from "./PdgsolveSolveRuntime.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

export function normalizePdgsolveAcceptanceRecord(record = {}) {
  return cloneJson(record ?? {});
}

export async function loadPdgsolveAcceptanceRecord({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgsolve acceptance loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgsolve acceptance: ${response.status} ${response.statusText}`);
  }
  return normalizePdgsolveAcceptanceRecord(await response.json());
}

function buildLockedNormalizationSummary(result = {}) {
  const diagnostics = Array.isArray(result?.diagnostics)
    ? result.diagnostics.filter((diagnostic) => normalizeText(diagnostic?.phase) === "normalization")
    : [];
  return {
    addedSupportOccurrences: diagnostics
      .map((diagnostic) => normalizeText(diagnostic?.payload?.addedOccurrenceId))
      .filter(Boolean),
    diagnostics: cloneJson(diagnostics),
  };
}

export function buildPdgsolveAcceptanceRecord({
  request = {},
  result = {},
  familyId = "",
} = {}) {
  const family = selectPdgsolveResultFamily(result, familyId);
  if (!family) {
    throw new Error("pdgsolve acceptance requires a selected family.");
  }
  if (!family.publicationReady || !family?.canonicalCandidate?.solveGraph) {
    throw new Error(`pdgsolve family ${family.familyId} is not publication ready.`);
  }
  const normalizedFamilyId = normalizeText(family.familyId);
  return {
    schema: "pdgsolve-acceptance/v1",
    problemId: normalizeText(result?.problemId),
    familyId: normalizedFamilyId,
    resultDigest: `${normalizeText(result?.problemId)}::${normalizedFamilyId}::v1`,
    acceptedScore: cloneJson(family.score),
    acceptedDiagnostics: cloneJson(family.diagnostics ?? []),
    acceptedState: "accepted",
    lockedNormalizationSummary: buildLockedNormalizationSummary(result),
    lockedPolicySummary: normalizePdgsolvePolicy(request?.policy),
    lockedLaneInventories: cloneJson(family.laneInventories),
    lockedLane2Operators: cloneJson(family.lane2Operators ?? []),
    lockedLane4Operators: cloneJson(family.lane4Operators ?? []),
    lockedProvenanceSummary: cloneJson(family.provenanceSummary),
    lockedSolveGraph: cloneJson(family.canonicalCandidate.solveGraph),
  };
}

export function buildPdgeditPreviewFromPdgsolveAcceptance(acceptance = {}) {
  if (normalizeText(acceptance?.schema) !== "pdgsolve-acceptance/v1" || !acceptance?.lockedSolveGraph) {
    return null;
  }
  return buildPdgeditDocumentFromPdgsolvePublicationGraph(acceptance.lockedSolveGraph);
}
