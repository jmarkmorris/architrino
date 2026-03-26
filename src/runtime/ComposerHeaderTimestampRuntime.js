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

export function createComposerHeaderTimestampRuntime({ element, now = () => new Date() } = {}) {
  let updateTimerId = null;

  function render() {
    if (!element) {
      return;
    }
    element.textContent = formatComposerHeaderTimestamp(now());
  }

  function scheduleNextUpdate() {
    if (!element) {
      return;
    }
    const currentTime = now();
    const msUntilNextMinute =
      (60 - currentTime.getSeconds()) * 1000 - currentTime.getMilliseconds();
    updateTimerId = window.setTimeout(() => {
      render();
      scheduleNextUpdate();
    }, Math.max(msUntilNextMinute, 0));
  }

  function init() {
    render();
    scheduleNextUpdate();
  }

  function dispose() {
    if (updateTimerId !== null) {
      window.clearTimeout(updateTimerId);
      updateTimerId = null;
    }
  }

  return {
    init,
    dispose,
  };
}
