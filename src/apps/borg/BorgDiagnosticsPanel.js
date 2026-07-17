export function createBorgDiagnosticsPanelController({
  panel,
  toggleButton,
  render,
}) {
  if (!panel || !toggleButton || typeof render !== "function") {
    throw new Error("Borg diagnostics panel requires its panel, toggle, and render function");
  }

  let open = false;

  function syncPresentation() {
    const label = open ? "Hide diagnostics" : "Show diagnostics";
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    if (open) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
    toggleButton.classList.toggle("is-active", open);
    toggleButton.setAttribute("aria-label", label);
    toggleButton.setAttribute("aria-pressed", String(open));
    toggleButton.title = label;
  }

  function setOpen(nextOpen) {
    open = Boolean(nextOpen);
    syncPresentation();
    if (open) {
      render();
    }
    return open;
  }

  function toggle() {
    return setOpen(!open);
  }

  function renderIfOpen() {
    if (!open) {
      return false;
    }
    render();
    return true;
  }

  function dispose() {
    toggleButton.removeEventListener("click", toggle);
  }

  toggleButton.addEventListener("click", toggle);
  syncPresentation();

  return Object.freeze({
    isOpen: () => open,
    setOpen,
    toggle,
    renderIfOpen,
    dispose,
  });
}
