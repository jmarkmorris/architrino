const defaultAnimatorViewportDisplayState = Object.freeze({
  showTransportPath: true,
  showCameraGuides: true,
  showLabels: true,
  showHistoryTraces: true,
  showEnvelopes: true,
});

export function createAnimatorViewportDisplayRuntime(options = {}) {
  const bindings = Array.isArray(options.bindings) ? options.bindings : [];
  const state = {
    ...defaultAnimatorViewportDisplayState,
    ...(options.initialState && typeof options.initialState === "object"
      ? options.initialState
      : {}),
  };

  function isFlagEnabled(key) {
    return state[key] !== false;
  }

  function setFlag(key, value) {
    state[key] = !!value;
    return state[key];
  }

  function toggleFlag(key) {
    return setFlag(key, !isFlagEnabled(key));
  }

  function updateToggleState() {
    bindings.forEach(({ button, key, label }) => {
      if (!button) {
        return;
      }
      const isOn = isFlagEnabled(key);
      button.setAttribute("aria-pressed", isOn ? "true" : "false");
      button.classList.toggle("is-active", isOn);
      button.textContent = label;
    });
  }

  return {
    state,
    isFlagEnabled,
    setFlag,
    toggleFlag,
    updateToggleState,
  };
}
