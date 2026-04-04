import { buildReactionSolverContractResponse } from "./ReactionSolverContractResponseRuntime.js";
import { buildReactionSolverRequestDocument } from "./ReactionSolverRequestExportRuntime.js";

const DEFAULT_BROWSER_REACTION_SOLVE_TIMEOUT_MS = 30000;

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function resolveReactionSolveEndpoint(windowLike = globalThis.window, endpoint = "") {
  const configuredEndpoint = normalizeText(endpoint);
  if (configuredEndpoint) {
    return configuredEndpoint;
  }
  const href = normalizeText(windowLike?.location?.href);
  if (!href) {
    return "";
  }
  try {
    return new URL("./api/reaction/solve", href).toString();
  } catch (_error) {
    return "";
  }
}

function resolveBrowserFetch(fetchImpl = null) {
  if (typeof fetchImpl === "function") {
    return fetchImpl;
  }
  if (typeof globalThis.fetch === "function") {
    return globalThis.fetch.bind(globalThis);
  }
  return null;
}

function readReactionSolveErrorMessage(responseText = "", status = 0) {
  try {
    const payload = JSON.parse(responseText);
    const message = normalizeText(payload?.error);
    if (message) {
      return message;
    }
  } catch (_error) {
    // Fall back to plain-text handling below.
  }
  return normalizeText(responseText) || `Reaction solve request failed (${status}).`;
}

function resolveReactionSolveTimeoutMs(options = {}) {
  const timeoutMs = Number(options?.timeoutMs);
  if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
    return Math.round(timeoutMs);
  }
  return DEFAULT_BROWSER_REACTION_SOLVE_TIMEOUT_MS;
}

function createReactionSolveTimeoutError(timeoutMs = DEFAULT_BROWSER_REACTION_SOLVE_TIMEOUT_MS) {
  const seconds = Math.max(1, Math.round(timeoutMs / 1000));
  return new Error(
    `Reaction solve timed out after ${seconds}s. The local solve bridge may be stalled.`
  );
}

function isAbortError(error = null) {
  return (
    String(error?.name ?? "").trim() === "AbortError" ||
    String(error?.code ?? "").trim() === "ABORT_ERR"
  );
}

async function requestBrowserReactionSolve(request = {}, options = {}) {
  const fetchImpl = resolveBrowserFetch(options?.fetchImpl);
  const endpoint = resolveReactionSolveEndpoint(options?.windowLike, options?.endpoint);
  if (typeof fetchImpl !== "function" || !endpoint) {
    throw new Error(
      "Browser Reaction solver bridge is unavailable. Start the local dev server with the solve API or inject a solveSnapshot bridge explicitly."
    );
  }
  const timeoutMs = resolveReactionSolveTimeoutMs(options);
  const abortController =
    typeof globalThis.AbortController === "function" ? new globalThis.AbortController() : null;
  const timeoutId =
    abortController && timeoutMs > 0
      ? globalThis.setTimeout(() => {
          abortController.abort(createReactionSolveTimeoutError(timeoutMs));
        }, timeoutMs)
      : null;
  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(request),
      signal: abortController?.signal,
    });
  } catch (error) {
    if (isAbortError(error)) {
      throw createReactionSolveTimeoutError(timeoutMs);
    }
    throw error;
  } finally {
    if (timeoutId) {
      globalThis.clearTimeout(timeoutId);
    }
  }
  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(readReactionSolveErrorMessage(responseText, response.status));
  }
  return {
    result: JSON.parse(responseText),
    execution: {
      mode: "external",
      target: "browser-http",
      endpoint,
    },
  };
}

export function createBrowserReactionSolveSnapshot(options = {}) {
  return async function solveReactionSnapshotInBrowser(snapshot = {}, solveOptions = {}) {
    const request = buildReactionSolverRequestDocument({
      snapshot,
      requestId:
        normalizeText(solveOptions?.requestId) || "reaction_canvas_request",
      origin:
        solveOptions?.origin === undefined
          ? {
              sourceKind: "reaction",
              sourceDocumentId: "reaction_canvas_ui",
              title: "Reaction Canvas",
            }
          : solveOptions?.origin,
      resolveBinaryChoiceInventory:
        typeof solveOptions?.resolveBinaryChoiceInventory === "function"
          ? solveOptions.resolveBinaryChoiceInventory
          : null,
      getCenterUsage:
        typeof solveOptions?.getCenterUsage === "function" ? solveOptions.getCenterUsage : null,
      policy: solveOptions?.policy,
    });
    const solved = await requestBrowserReactionSolve(request, options);
    return buildReactionSolverContractResponse(request, solved.result, {
      execution: solved.execution,
    });
  };
}

export { resolveReactionSolveEndpoint };
