export const BORG_EOM_HTTP_CLIENT_VERSION = "borg-eom-http-client.v0";

export function createBorgEomHttpClient({
  endpoint = "/api/eom/borg-shadow/v0",
  fetchImpl = globalThis.fetch,
  timeoutMs = 180000,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new TypeError("Borg EOM HTTP client requires fetch.");
  }
  const activeControllers = new Set();
  return Object.freeze({
    schema: BORG_EOM_HTTP_CLIENT_VERSION,
    async evolveRetainedHistories(request) {
      const controller = new AbortController();
      activeControllers.add(controller);
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, timeoutMs);
      try {
        const response = await fetchImpl(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: controller.signal,
        });
        const responseText = await response.text();
        let payload;
        try {
          payload = JSON.parse(responseText);
        } catch {
          payload = { error: responseText || `HTTP ${response.status}` };
        }
        if (!response.ok) {
          throw new Error(
            payload?.error ?? `Borg EOM service returned HTTP ${response.status}.`,
          );
        }
        return payload;
      } catch (error) {
        if (error?.name === "AbortError") {
          const requestError = new Error(
            timedOut
              ? `Borg EOM service timed out after ${timeoutMs} ms.`
              : "Borg EOM service request was cancelled.",
          );
          if (timedOut) {
            requestError.code = request?.runGrade === "certified"
              ? "certified_execution_timeout"
              : "display_execution_timeout";
            requestError.timeoutMs = timeoutMs;
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
    },
  });
}
