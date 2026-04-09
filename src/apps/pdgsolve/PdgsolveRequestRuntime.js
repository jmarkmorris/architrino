function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBoolean(value) {
  return value === true;
}

function normalizeRequestParty(record = {}) {
  return {
    id: normalizeText(record?.id),
    assemblyId: normalizeText(record?.assemblyId),
    title: normalizeText(record?.title),
  };
}

export function normalizePdgsolvePolicy(policy = {}) {
  const allowedBoundaryAugmentations = Array.isArray(policy?.allowedBoundaryAugmentations)
    ? [...new Set(policy.allowedBoundaryAugmentations.map((value) => normalizeText(value)).filter(Boolean))]
    : [];
  return {
    betaSupportMode: normalizeText(policy?.betaSupportMode) || "allow-implied-noether-pair",
    exactClosureRequired: normalizeBoolean(policy?.exactClosureRequired),
    allowedBoundaryAugmentations: allowedBoundaryAugmentations.length ? allowedBoundaryAugmentations : ["none"],
  };
}

export function normalizePdgsolveRequest(rawRequest = {}) {
  return {
    schema: normalizeText(rawRequest?.schema) || "pdgsolve-request/v1",
    requestId: normalizeText(rawRequest?.requestId),
    source: {
      kind: normalizeText(rawRequest?.source?.kind) || "developer",
      title: normalizeText(rawRequest?.source?.title),
      sourceDocumentId: normalizeText(rawRequest?.source?.sourceDocumentId),
    },
    reactants: Array.isArray(rawRequest?.reactants)
      ? rawRequest.reactants.map((record) => normalizeRequestParty(record)).filter((record) => record.assemblyId)
      : [],
    products: Array.isArray(rawRequest?.products)
      ? rawRequest.products.map((record) => normalizeRequestParty(record)).filter((record) => record.assemblyId)
      : [],
    policy: normalizePdgsolvePolicy(rawRequest?.policy),
  };
}

export async function loadPdgsolveRequest({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgsolve request loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgsolve request: ${response.status} ${response.statusText}`);
  }
  return normalizePdgsolveRequest(await response.json());
}

export function countPdgsolveAssemblies(records = []) {
  const counts = new Map();
  (Array.isArray(records) ? records : []).forEach((record) => {
    const assemblyId = normalizeText(record?.assemblyId);
    if (!assemblyId) {
      return;
    }
    counts.set(assemblyId, (counts.get(assemblyId) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([assemblyId, count]) => ({ assemblyId, count }))
    .sort((left, right) => left.assemblyId.localeCompare(right.assemblyId));
}

export function buildPdgsolveAssemblyCountKey(records = []) {
  return countPdgsolveAssemblies(records)
    .map((record) => `${record.assemblyId}:${record.count}`)
    .join("|");
}

export function buildPdgsolveProblemId(request = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  return `pdgsolve_problem_${normalizedRequest.requestId || "request"}`;
}
