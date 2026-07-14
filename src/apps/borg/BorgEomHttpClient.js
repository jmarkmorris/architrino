export const BORG_EOM_HTTP_CLIENT_VERSION = "borg-eom-http-client.v0";

export function createBorgEomHttpClient({
  endpoint = "/api/eom/borg-shadow/v0",
  fetchImpl = globalThis.fetch,
  timeoutMs = 180000,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new TypeError("Borg EOM HTTP client requires fetch.");
  }
  return Object.freeze({
    schema: BORG_EOM_HTTP_CLIENT_VERSION,
    async evolveRetainedHistories(request) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
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
          throw new Error(`Borg EOM service timed out after ${timeoutMs} ms.`);
        }
        throw error;
      } finally {
        clearTimeout(timeout);
      }
    },
    async dispose() {},
  });
}
