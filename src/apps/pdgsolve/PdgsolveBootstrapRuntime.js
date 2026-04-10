import pdgsolveCorpusJson from "../../../content/contracts/examples/pdgsolve-corpus/v1/index.json" with { type: "json" };
import freeNeutronBetaExactRequestJson from "../../../content/contracts/examples/pdgsolve-request/free_neutron_beta_exact.v1.json" with { type: "json" };
import freeNeutronBetaSupportDisallowedRequestJson from "../../../content/contracts/examples/pdgsolve-request/free_neutron_beta_support_disallowed.v1.json" with { type: "json" };
import passThruNeutronRequestJson from "../../../content/contracts/examples/pdgsolve-request/pass_thru_neutron.v1.json" with { type: "json" };
import primitiveImbalanceNeutronToProtonRequestJson from "../../../content/contracts/examples/pdgsolve-request/primitive_imbalance_neutron_to_proton.v1.json" with { type: "json" };
import fixturePdgfeedRequestJson from "../../../content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.pdgsolve-request.v1.json" with { type: "json" };
import livePdgfeedRequestJson from "../../../content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.pdgsolve-request.v1.json" with { type: "json" };

import { loadPdgsolveAcceptanceRecord } from "./PdgsolveAcceptanceRuntime.js";
import { loadPdgsolveRequest, normalizePdgsolveRequest } from "./PdgsolveRequestRuntime.js";

const builtinRequestJsonById = Object.freeze({
  free_neutron_beta_exact: freeNeutronBetaExactRequestJson,
  free_neutron_beta_support_disallowed: freeNeutronBetaSupportDisallowedRequestJson,
  primitive_imbalance_neutron_to_proton: primitiveImbalanceNeutronToProtonRequestJson,
  pass_thru_neutron: passThruNeutronRequestJson,
});

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function stringifyScalar(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function createPdgsolveRequestEntry({
  id = "",
  title = "",
  subtitle = "",
  request = {},
  sourceKind = "",
} = {}) {
  const normalizedRequest = normalizePdgsolveRequest(request);
  return {
    id: normalizeText(id) || normalizedRequest.requestId,
    title: normalizeText(title) || normalizedRequest.source.title || normalizedRequest.requestId,
    subtitle: normalizeText(subtitle),
    sourceKind: normalizeText(sourceKind) || normalizedRequest.source.kind,
    request: normalizedRequest,
  };
}

function buildBuiltinFixtureEntries() {
  const corpusCases = Array.isArray(pdgsolveCorpusJson?.cases) ? pdgsolveCorpusJson.cases : [];
  return corpusCases
    .map((entry) => {
      const request = builtinRequestJsonById[normalizeText(entry?.id)];
      if (!request) {
        return null;
      }
      return createPdgsolveRequestEntry({
        id: `fixture:${entry.id}`,
        title: normalizeText(entry?.label),
        subtitle: "Built-in v1 corpus request",
        sourceKind: "fixture",
        request,
      });
    })
    .filter(Boolean);
}

function buildBuiltinPdgfeedEntries() {
  return [
    createPdgsolveRequestEntry({
      id: "pdgfeed:fixture:free_neutron_beta_decay",
      title: "PDGfeed fixture export: Free neutron beta decay",
      subtitle: "Generated pdgsolve request from the fixture feed path",
      sourceKind: "pdgfeed",
      request: fixturePdgfeedRequestJson,
    }),
    createPdgsolveRequestEntry({
      id: "pdgfeed:live:free_neutron_beta_decay",
      title: "PDGfeed live export: Free neutron beta decay",
      subtitle: "Generated pdgsolve request from the live PDG feed path",
      sourceKind: "pdgfeed",
      request: livePdgfeedRequestJson,
    }),
  ];
}

async function loadPdgfeedManifestEntries({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl = "",
} = {}) {
  const resolvedUrl = normalizeText(specUrl);
  if (!resolvedUrl) {
    return [];
  }
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgfeed manifest loading requires fetch().");
  }
  const response = await fetchImpl(resolvedUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgfeed manifest: ${response.status} ${response.statusText}`);
  }
  const manifest = await response.json();
  return (Array.isArray(manifest?.entries) ? manifest.entries : [])
    .map((entry) =>
      createPdgsolveRequestEntry({
        id: `pdgfeed-manifest:${stringifyScalar(entry?.batchId) || stringifyScalar(entry?.caseId)}`,
        title: normalizeText(entry?.title) || normalizeText(entry?.pdgsolveRequest?.source?.title),
        subtitle:
          normalizeText(entry?.channelDescription) ||
          normalizeText(entry?.branchingDisplay) ||
          "Imported from pdgfeed manifest",
        sourceKind: "pdgfeed",
        request: entry?.pdgsolveRequest,
      })
    )
    .filter((entry) => entry.request.requestId);
}

function dedupeRequestEntries(entries = []) {
  const byId = new Map();
  entries.forEach((entry) => {
    if (!entry?.id || !entry?.request?.requestId) {
      return;
    }
    byId.set(entry.id, entry);
  });
  return [...byId.values()];
}

export function getDefaultPdgsolveBootstrapEntries() {
  return dedupeRequestEntries([...buildBuiltinFixtureEntries(), ...buildBuiltinPdgfeedEntries()]);
}

export async function loadPdgsolveBootstrapSeed({
  fetchImpl = typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  pdgfeedManifestUrl = "",
  requestUrl = "",
  acceptanceUrl = "",
  requestId = "",
} = {}) {
  const requestEntries = [...getDefaultPdgsolveBootstrapEntries()];
  if (normalizeText(pdgfeedManifestUrl)) {
    requestEntries.push(
      ...(await loadPdgfeedManifestEntries({
        fetchImpl,
        specUrl: pdgfeedManifestUrl,
      }))
    );
  }

  let selectedRequestEntry = null;
  const normalizedRequestId = normalizeText(requestId);
  if (normalizeText(requestUrl)) {
    const request = await loadPdgsolveRequest({
      fetchImpl,
      specUrl: requestUrl,
    });
    selectedRequestEntry = createPdgsolveRequestEntry({
      id: `request-url:${request.requestId || "loaded"}`,
      title: request.source.title || request.requestId,
      subtitle: requestUrl,
      sourceKind: request.source.kind || "developer",
      request,
    });
    requestEntries.unshift(selectedRequestEntry);
  } else if (normalizedRequestId) {
    selectedRequestEntry =
      requestEntries.find(
        (entry) =>
          entry.id === normalizedRequestId ||
          entry.request.requestId === normalizedRequestId
      ) ?? null;
  }

  const reopenedAcceptance = normalizeText(acceptanceUrl)
    ? await loadPdgsolveAcceptanceRecord({
        fetchImpl,
        specUrl: acceptanceUrl,
      })
    : null;

  return {
    requestEntries: dedupeRequestEntries(requestEntries),
    selectedRequestEntry: selectedRequestEntry ?? requestEntries[0] ?? null,
    reopenedAcceptance: reopenedAcceptance ? cloneJson(reopenedAcceptance) : null,
  };
}
