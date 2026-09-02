const OWNED_KEYS = Object.freeze([
  "view",
  "candidateDisposition",
  "assemblyId",
  "modelRevisionSha256",
  "sourceSlug",
  "caseConfiguration",
  "caseSample",
  "caseQuery",
  "casePage",
  "selectedCase",
]);

export function readBraidSearchRouteState(search = "") {
  const query = new URLSearchParams(search);
  const page = Number(query.get("casePage"));
  return Object.freeze({
    viewId: query.get("view") ?? "funnel",
    filters: Object.freeze({
      candidateDisposition: query.get("candidateDisposition") ?? "all",
      assemblyId: query.get("assemblyId") ?? "all",
      modelRevisionSha256: query.get("modelRevisionSha256"),
      sourceSlug: query.get("sourceSlug") ?? "all",
    }),
    caseConfigurationId: query.get("caseConfiguration") ?? "all",
    caseSampleOrdinal: query.get("caseSample") ?? "all",
    caseQuery: query.get("caseQuery") ?? "",
    casePage: Number.isSafeInteger(page) && page >= 0 ? page : 0,
    selectedCaseKey: query.get("selectedCase"),
  });
}

export function buildBraidSearchRouteHref(
  state,
  locationLike = globalThis.location,
) {
  const url = new URL(locationLike?.href ?? "http://localhost/braid-search.html");
  OWNED_KEYS.forEach((key) => url.searchParams.delete(key));
  setNondefault(url.searchParams, "view", state.viewId, "funnel");
  setNondefault(
    url.searchParams,
    "candidateDisposition",
    state.filters.candidateDisposition,
    "all",
  );
  setNondefault(url.searchParams, "assemblyId", state.filters.assemblyId, "all");
  setNondefault(
    url.searchParams,
    "modelRevisionSha256",
    state.filters.modelRevisionSha256,
    null,
  );
  setNondefault(url.searchParams, "sourceSlug", state.filters.sourceSlug, "all");
  setNondefault(
    url.searchParams,
    "caseConfiguration",
    state.caseConfigurationId,
    "all",
  );
  setNondefault(url.searchParams, "caseSample", state.caseSampleOrdinal, "all");
  setNondefault(url.searchParams, "caseQuery", state.caseQuery, "");
  setNondefault(url.searchParams, "casePage", state.casePage, 0);
  setNondefault(url.searchParams, "selectedCase", state.selectedCaseKey, null);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function persistBraidSearchRouteState(
  state,
  locationLike = globalThis.location,
  historyLike = globalThis.history,
) {
  const href = buildBraidSearchRouteHref(state, locationLike);
  if (typeof historyLike?.replaceState === "function") {
    historyLike.replaceState(null, "", href);
  }
  return href;
}

function setNondefault(query, key, value, fallback) {
  if (value !== null && value !== undefined && value !== fallback) {
    query.set(key, String(value));
  }
}
