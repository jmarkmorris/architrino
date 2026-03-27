function formatComposerHeaderTimestamp(date) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(date);
  const day = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${weekday} ${month} ${day} ${time}`;
}

function resolveComposerHeaderDate(value) {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    return new Date(value);
  }
  return null;
}

function formatComposerHeaderSignature(signature) {
  if (!signature || typeof signature !== "object") {
    return null;
  }
  const resolvedDate = resolveComposerHeaderDate(signature.generatedAt);
  const segments = [];
  if (typeof signature.shortSha === "string" && signature.shortSha.trim()) {
    segments.push(signature.shortSha.trim());
  }
  if (typeof signature.dirty === "boolean") {
    segments.push(signature.dirty ? "dirty" : "clean");
  }
  if (resolvedDate && Number.isFinite(resolvedDate.getTime())) {
    segments.push(formatComposerHeaderTimestamp(resolvedDate));
  }
  return segments.length > 0 ? segments.join(" · ") : null;
}

export function createComposerHeaderTimestampRuntime({
  element,
  lastChangedAt = null,
  signatureUrl = null,
  refreshIntervalMs = 15000,
} = {}) {
  const resolvedDate = resolveComposerHeaderDate(lastChangedAt);
  let refreshIntervalId = null;

  function renderFallback() {
    if (!element) {
      return;
    }
    element.textContent = resolvedDate && Number.isFinite(resolvedDate.getTime())
      ? formatComposerHeaderTimestamp(resolvedDate)
      : "signature unavailable";
  }

  async function refreshSignature() {
    if (!element) {
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
