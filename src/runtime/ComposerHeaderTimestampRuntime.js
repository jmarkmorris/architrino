function normalizeDate(value) {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (Number.isFinite(parsed.getTime())) {
      return parsed;
    }
  }
  return null;
}

function formatComposerHeaderTimestampValue(value) {
  const date = normalizeDate(value);
  if (!date) {
    return null;
  }
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function formatComposerHeaderTimestamp(signature, lastChangedAt = null) {
  if (signature && typeof signature === "object") {
    const generatedAt = formatComposerHeaderTimestampValue(signature.generatedAt);
    if (generatedAt) {
      return generatedAt;
    }
  }
  return formatComposerHeaderTimestampValue(lastChangedAt);
}

export function createComposerHeaderTimestampRuntime({
  element,
  lastChangedAt = null,
  signatureUrl = null,
  refreshIntervalMs = 15000,
} = {}) {
  let refreshIntervalId = null;
  let signaturePollingEnabled = true;

  function renderFallback() {
    if (!element) {
      return;
    }
    element.textContent =
      formatComposerHeaderTimestamp(null, lastChangedAt) ?? "timestamp unavailable";
  }

  async function refreshSignature() {
    if (!element) {
      return;
    }
    if (!signaturePollingEnabled) {
      renderFallback();
      return;
    }
    if (typeof signatureUrl !== "string" || !signatureUrl.trim()) {
      renderFallback();
      return;
    }
    try {
      const cacheBustedUrl = new URL(signatureUrl, window.location.href);
      cacheBustedUrl.searchParams.set("t", String(Date.now()));
      const response = await fetch(cacheBustedUrl, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`signature fetch failed: ${response.status}`);
      }
      const signature = await response.json();
      const formattedTimestamp = formatComposerHeaderTimestamp(signature, lastChangedAt);
      element.textContent = formattedTimestamp ?? "timestamp unavailable";
    } catch (_error) {
      signaturePollingEnabled = false;
      if (refreshIntervalId !== null) {
        window.clearInterval(refreshIntervalId);
        refreshIntervalId = null;
      }
      renderFallback();
    }
  }

  function init() {
    renderFallback();
    void refreshSignature();
    if (
      typeof signatureUrl === "string"
      && signatureUrl.trim()
      && Number.isFinite(refreshIntervalMs)
      && refreshIntervalMs > 0
    ) {
      refreshIntervalId = window.setInterval(() => {
        void refreshSignature();
      }, refreshIntervalMs);
    }
  }

  function dispose() {
    if (refreshIntervalId !== null) {
      window.clearInterval(refreshIntervalId);
      refreshIntervalId = null;
    }
  }

  return {
    init,
    dispose,
  };
}

export const __TEST_ONLY__ = Object.freeze({
  formatComposerHeaderTimestampValue,
  formatComposerHeaderTimestamp,
});
