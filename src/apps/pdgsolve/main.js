import { PDGSOLVE_APP_MODE } from "./PdgsolveAppModeRuntime.js";
import { createPdgsolveAppRuntime } from "./PdgsolveAppRuntime.js";

function readStandaloneSearchParam(windowLike, key) {
  const href = String(windowLike?.location?.href ?? "").trim();
  if (!href) {
    return "";
  }
  try {
    return new URL(href).searchParams.get(key) ?? "";
  } catch {
    return "";
  }
}

export function bootstrapPdgsolveApp({
  documentLike = globalThis.document,
  windowLike = globalThis.window,
  homeHref = "./index.html",
} = {}) {
  if (!documentLike) {
    throw new Error("pdgsolve bootstrap requires document.");
  }
  return createPdgsolveAppRuntime({
    documentLike,
    windowLike,
    appElement: documentLike.getElementById("pdgsolve-app"),
    requestSelectElement: documentLike.getElementById("pdgsolve-request-select"),
    requestFileInputElement: documentLike.getElementById("pdgsolve-request-file-input"),
    acceptanceFileInputElement: documentLike.getElementById("pdgsolve-acceptance-file-input"),
    loadRequestButtonElement: documentLike.getElementById("pdgsolve-load-request-button"),
    reopenAcceptanceButtonElement: documentLike.getElementById("pdgsolve-reopen-acceptance-button"),
    homeButtonElement: documentLike.getElementById("pdgsolve-home-button"),
    solveButtonElement: documentLike.getElementById("pdgsolve-solve-button"),
    acceptButtonElement: documentLike.getElementById("pdgsolve-accept-button"),
    launchPdgeditButtonElement: documentLike.getElementById("pdgsolve-launch-pdgedit-button"),
    requestSummaryElement: documentLike.getElementById("pdgsolve-request-summary"),
    diagnosticsElement: documentLike.getElementById("pdgsolve-diagnostics"),
    familyListElement: documentLike.getElementById("pdgsolve-family-list"),
    acceptedSummaryElement: documentLike.getElementById("pdgsolve-accepted-summary"),
    publicationPreviewElement: documentLike.getElementById("pdgsolve-publication-preview"),
    pdgfeedManifestUrl: readStandaloneSearchParam(windowLike, "pdgfeedManifest"),
    requestUrl: readStandaloneSearchParam(windowLike, "request"),
    acceptanceUrl: readStandaloneSearchParam(windowLike, "acceptance"),
    requestId: readStandaloneSearchParam(windowLike, "requestId"),
    homeHref,
  });
}

if (typeof window !== "undefined") {
  window.__ARCHITRINO_APP_MODE__ = PDGSOLVE_APP_MODE;
}

if (typeof document !== "undefined") {
  const runtime = bootstrapPdgsolveApp();
  if (typeof window !== "undefined") {
    window.__ARCHITRINO_PDGSOLVE_RUNTIME__ = runtime;
  }
  void runtime.init();
}
