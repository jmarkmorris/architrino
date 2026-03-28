function formatComposerHeaderSignature(signature) {
  if (!signature || typeof signature !== "object") {
    return null;
  }
  return typeof signature.shortSha === "string" && signature.shortSha.trim()
    ? signature.shortSha.trim()
    : null;
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
    element.textContent = "signature unavailable";
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
      const formattedSignature = formatComposerHeaderSignature(signature);
      element.textContent = formattedSignature ?? "signature unavailable";
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
