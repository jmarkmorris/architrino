import { buildPdgeditDocumentFromPdgsolvePublicationGraph } from "./PdgsolvePdgeditPublicationRuntime.js";
import { normalizePdgsolvePolicy } from "./PdgsolveRequestRuntime.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function selectPdgsolveResultFamily(result = {}, familyId = "") {
  const normalizedFamilyId = normalizeText(familyId);
  const families = Array.isArray(result?.optionFamilies) ? result.optionFamilies : [];
  if (normalizedFamilyId) {
    return families.find((family) => family.familyId === normalizedFamilyId) ?? null;
  }
  return families.find((family) => family.familyId === result?.bestFamilyId) ?? families[0] ?? null;
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
      .flatMap((diagnostic) => {
        const addedOccurrenceIds = Array.isArray(diagnostic?.payload?.addedOccurrenceIds)
          ? diagnostic.payload.addedOccurrenceIds
          : [diagnostic?.payload?.addedOccurrenceId];
        return addedOccurrenceIds.map((occurrenceId) => normalizeText(occurrenceId));
      })
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
    lockedReactantAssemblies: cloneJson(family.reactantAssemblies ?? []),
    lockedReactantSideOperators: cloneJson(family.reactantSideOperators ?? []),
    lockedIntermediateAssemblies: cloneJson(family.intermediateAssemblies ?? []),
    lockedProductSideOperators: cloneJson(family.productSideOperators ?? []),
    lockedProductAssemblies: cloneJson(family.productAssemblies ?? []),
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
