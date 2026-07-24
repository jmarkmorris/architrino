import {
  applyBorgCausalHistoryRetention,
} from "./BorgCausalHistoryRetention.js";

export const BORG_EOM_HTTP_CLIENT_VERSION = "borg-eom-http-client.v0";
export const BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA =
  "borg-eom-http-history-prefix/v1";
export const BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT =
  "certified_execution_timeout";

export function createBorgEomHttpClient({
  endpoint = "/api/eom/borg-shadow/v0",
  fetchImpl = globalThis.fetch,
  timeoutMs,
  certifiedTimeoutMs = timeoutMs ?? 180000,
  displayTimeoutMs = timeoutMs ?? 60000,
  releaseTimeoutMs = 10000,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new TypeError("Borg EOM HTTP client requires fetch.");
  }
  const activeControllers = new Set();
  let displayHistoryCache = null;
  return Object.freeze({
    schema: BORG_EOM_HTTP_CLIENT_VERSION,
    async evolveRetainedHistories(request) {
      const controller = new AbortController();
      const requestTimeoutMs = request?.runGrade === "certified"
        ? certifiedTimeoutMs
        : displayTimeoutMs;
      activeControllers.add(controller);
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, requestTimeoutMs);
      try {
        let wireRequest = createDisplayHistoryPrefixRequest(
          request,
          displayHistoryCache,
        );
        let payload;
        try {
          payload = await postRequest(wireRequest, controller.signal);
        } catch (error) {
          if (wireRequest !== request &&
              error?.code === "display_history_cache_miss") {
            displayHistoryCache = null;
            const lost = new Error(
              "The worker-owned exact Display history store was lost; restart this run.",
            );
            lost.code = "display_exact_history_store_lost";
            throw lost;
          }
          throw error;
        }
        const unretired = mergeDisplayHistoryExtensions(request, payload);
        const merged = request?.runGrade === "display" &&
            Array.isArray(unretired?.histories)
          ? Object.freeze({
              ...unretired,
              histories: boundDisplayClientHistories(
                applyBorgCausalHistoryRetention(
                  unretired.histories,
                  payload.causalHistoryRetention ?? null,
                ),
                request.absoluteTimeInterval?.start,
              ),
            })
          : unretired;
        if (request?.runGrade === "display" &&
            merged?.status === "completed" &&
            Array.isArray(merged.histories) &&
            validHistoryTransport(payload.historyTransport, merged.histories)) {
          displayHistoryCache = Object.freeze({
            cacheToken: payload.historyTransport.cacheToken,
            coverageEnd: String(merged.histories[0].coverageEnd),
            paths: Object.freeze(merged.histories.map((history, index) =>
              Object.freeze({
                pathId: history.pathId,
                charge: history.charge,
                segmentCount: Number(payload.historyTransport.segmentCounts[index]),
              }))),
          });
        } else {
          displayHistoryCache = null;
        }
        return merged;
      } catch (error) {
        if (error?.name === "AbortError") {
          const requestError = new Error(
            timedOut
              ? `Borg EOM service timed out after ${requestTimeoutMs} ms.`
              : "Borg EOM service request was cancelled.",
          );
          if (timedOut) {
            requestError.code = request?.runGrade === "certified"
              ? BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT
              : "display_execution_timeout";
            requestError.timeoutMs = requestTimeoutMs;
          }
          throw requestError;
        }
        throw error;
      } finally {
        clearTimeout(timeout);
        activeControllers.delete(controller);
      }
    },
    async dispose() {
      activeControllers.forEach((controller) => controller.abort());
      activeControllers.clear();
      displayHistoryCache = null;
      await releaseRemoteRun();
    },
    async releaseRun() {
      displayHistoryCache = null;
      await releaseRemoteRun();
    },
  });

  async function postRequest(wireRequest, signal) {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wireRequest),
      signal,
    });
    const responseText = await response.text();
    let payload;
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = { error: responseText || `HTTP ${response.status}` };
    }
    if (!response.ok) {
      const error = new Error(
        payload?.error ?? `Borg EOM service returned HTTP ${response.status}.`,
      );
      error.httpStatus = response.status;
      error.retryable = response.status >= 500 || response.status === 408 ||
        response.status === 429;
      if (typeof payload?.code === "string") {
        error.code = payload.code;
      }
      throw error;
    }
    return payload;
  }

  async function releaseRemoteRun() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), releaseTimeoutMs);
    try {
      await fetchImpl(endpoint, {
        method: "DELETE",
        signal: controller.signal,
      });
    } catch {
      // If the local service is already gone, its worker is gone as well.
    } finally {
      clearTimeout(timeout);
    }
  }
}

function createDisplayHistoryPrefixRequest(request, cache) {
  if (request?.runGrade !== "display" ||
      !Array.isArray(request.histories) ||
      !Array.isArray(cache?.paths) ||
      typeof cache.cacheToken !== "string" ||
      String(request.histories[0]?.coverageEnd) !== cache.coverageEnd ||
      request.histories.length !== cache.paths.length ||
      !request.histories.every((history, index) =>
        String(history.pathId) === String(cache.paths[index]?.pathId) &&
        String(history.charge) === String(cache.paths[index]?.charge))) {
    return request;
  }
  return {
    ...request,
    histories: request.histories.map((history) => ({
      ...history,
      segments: [],
    })),
    historyTransport: {
      schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
      cacheToken: cache.cacheToken,
      cachedPrefixCounts: cache.paths.map((history) => history.segmentCount),
    },
  };
}

function mergeDisplayHistoryExtensions(request, response) {
  if (Array.isArray(response?.histories) ||
      !Array.isArray(response?.publishedExtensions) ||
      response.publishedExtensions.length !== request?.histories?.length) {
    return response;
  }
  const histories = request.histories.map((history, index) => {
    const extension = response.publishedExtensions[index];
    if (String(extension?.pathId) !== String(history.pathId) ||
        !Array.isArray(extension?.segments)) {
      throw new Error("EOM response reordered or omitted a path extension.");
    }
    return Object.freeze({
      ...history,
      coverageEnd: response.acceptedEndTime,
      segments: Object.freeze([...history.segments, ...extension.segments]),
    });
  });
  return Object.freeze({
    ...response,
    histories: Object.freeze(histories),
    diagnostics: Object.freeze([
      Object.freeze({
        code: response.status === "completed"
          ? "native_eom_completed"
          : response.haltCode,
        acceptedStepCount: response.acceptedStepCount,
        rejectedStepCount: response.rejectedStepCount,
        stepFailures: response.stepFailures ?? [],
      }),
    ]),
  });
}

function validHistoryTransport(transport, histories) {
  return transport?.schema === BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA &&
    typeof transport.cacheToken === "string" &&
    Array.isArray(transport.segmentCounts) &&
    transport.segmentCounts.length === histories.length &&
    transport.segmentCounts.every((value) =>
      Number.isSafeInteger(Number(value)) && Number(value) > 0);
}

function boundDisplayClientHistories(histories, requestedStartToken) {
  const requestedStart = Number(requestedStartToken);
  if (!Number.isFinite(requestedStart)) return histories;
  return Object.freeze(histories.map((history) => {
    const firstNeeded = history.segments.findIndex(
      (segment) => Number(segment.endTime) >= requestedStart,
    );
    const startIndex = firstNeeded < 0
      ? Math.max(0, history.segments.length - 1)
      : firstNeeded;
    if (startIndex === 0) {
      return Object.freeze({ ...history, serverExactHistory: true });
    }
    const segments = Object.freeze(history.segments.slice(startIndex));
    return Object.freeze({
      ...history,
      serverExactHistory: true,
      coverageStart: String(segments[0].startTime),
      segments,
    });
  }));
}
