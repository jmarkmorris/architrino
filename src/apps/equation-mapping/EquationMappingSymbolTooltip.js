let nextTooltipId = 0;

// One DOM tooltip per symbol strip. The caller supplies the same inline-math
// renderer used by source excerpts and equation comments.
export function createEquationMappingSymbolTooltip({ document, strip, renderText }) {
  const tooltip = document.createElement("div");
  tooltip.id = `equation-mapping-symbol-tooltip-${++nextTooltipId}`;
  tooltip.className = "equation-mapping-symbol-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  strip.append(tooltip);
  let active = null;
  let hovered = null;
  let focused = null;

  function show(entry) {
    active?.button.removeAttribute("aria-describedby");
    active = entry;
    tooltip.hidden = !entry;
    if (!entry) return;
    tooltip.replaceChildren();
    renderText(tooltip, entry.definition);
    entry.button.setAttribute("aria-describedby", tooltip.id);

    const stripRect = strip.getBoundingClientRect();
    const buttonRect = entry.button.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewport = document.documentElement;
    const left = Math.max(8, Math.min(
      buttonRect.left + (buttonRect.width - tooltipRect.width) / 2,
      viewport.clientWidth - tooltipRect.width - 8
    ));
    const above = buttonRect.bottom + tooltipRect.height + 16 > viewport.clientHeight;
    const top = above
      ? Math.max(8, buttonRect.top - tooltipRect.height - 8)
      : buttonRect.bottom + 8;
    tooltip.dataset.placement = above ? "above" : "below";
    tooltip.style.left = `${left - stripRect.left}px`;
    tooltip.style.top = `${top - stripRect.top}px`;
  }

  function hide() {
    hovered = null;
    focused = null;
    show(null);
  }

  tooltip.addEventListener("pointerleave", (event) => {
    if (active?.button.contains(event.relatedTarget)) return;
    hovered = null;
    show(focused);
  });

  return {
    hide,
    bind(button, definition) {
      const entry = { button, definition };
      // Native title tooltips must not compete with the math-aware tooltip.
      button.removeAttribute("title");
      button.addEventListener("pointerenter", () => {
        hovered = entry;
        show(entry);
      });
      button.addEventListener("pointerleave", (event) => {
        if (tooltip.contains(event.relatedTarget)) return;
        hovered = null;
        show(focused);
      });
      button.addEventListener("focus", () => {
        focused = entry;
        show(hovered ?? entry);
      });
      button.addEventListener("blur", () => {
        focused = null;
        show(hovered);
      });
    },
  };
}
