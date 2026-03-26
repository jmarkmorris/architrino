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

export function createComposerHeaderTimestampRuntime({
  element,
  lastChangedAt = null,
} = {}) {
  const resolvedDate =
    lastChangedAt instanceof Date
      ? lastChangedAt
      : typeof lastChangedAt === "string" || typeof lastChangedAt === "number"
        ? new Date(lastChangedAt)
        : null;

  function render() {
    if (!element) {
      return;
    }
    element.textContent = resolvedDate && Number.isFinite(resolvedDate.getTime())
      ? formatComposerHeaderTimestamp(resolvedDate)
      : "timestamp unavailable";
  }

  function init() {
    render();
  }

  function dispose() {
    if (!element) {
      return;
    }
  }

  return {
    init,
    dispose,
  };
}
