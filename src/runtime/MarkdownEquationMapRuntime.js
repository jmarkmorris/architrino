import { createEquationMappingLaunchHref, EQUATION_RETURN_PARAM } from "./EquationMappingNavigation.js";

// Operator-requested one-equation trial. Remove this restriction only after
// approval of the global migration; remove the module if the trial is rejected.
export const EQUATION_MAP_TRIAL = Object.freeze({
  sourcePath: "content/markdown/aaa/philosophy-history/one-nature-many-theories.md",
  semanticId: "corpus-equation-9a8a84e6187eb564",
});

export function createMarkdownEquationMapRuntime({ markdownBody, documentLike, getWindow }) {
  let returnRow = null;
  let restored = false;

  function decorate(sourcePath, sourceSection = null) {
    returnRow = null;
    restored = false;
    if (sourcePath !== EQUATION_MAP_TRIAL.sourcePath || !documentLike?.createElement) return;
    const semanticId = EQUATION_MAP_TRIAL.semanticId;
    for (const link of markdownBody?.querySelectorAll?.("a[href]") ?? []) {
      const rawHref = link.getAttribute("href");
      const paragraph = link.parentElement;
      const equation = paragraph?.previousElementSibling;
      if (rawHref !== `../../../../equation-mapping.html#${semanticId}` ||
          paragraph?.tagName !== "P" || paragraph.childElementCount !== 1 ||
          paragraph.textContent.trim() !== link.textContent.trim() ||
          !equation?.classList.contains("markdown-math-block")) continue;

      const row = documentLike.createElement("div");
      row.className = "markdown-equation-map-row";
      row.id = semanticId;
      const action = documentLike.createElement("span");
      action.className = "markdown-equation-map-action";
      const tooltip = documentLike.createElement("span");
      tooltip.className = "markdown-equation-map-tooltip";
      tooltip.id = `${semanticId}-tooltip`;
      tooltip.setAttribute("role", "tooltip");
      tooltip.textContent = "View in Equation Mapping";
      link.className = "markdown-equation-map-link";
      link.textContent = "View →";
      link.setAttribute("aria-label", "View in Equation Mapping");
      link.setAttribute("aria-describedby", tooltip.id);
      const updateHref = () => {
        const currentHref = getWindow()?.location?.href;
        if (currentHref) link.href = createEquationMappingLaunchHref({ currentHref, semanticId, sourcePath, sourceSection });
      };
      updateHref();
      // Refresh after scene routing settles, including modified/middle clicks.
      for (const event of ["pointerdown", "focus", "click", "contextmenu"]) link.addEventListener(event, updateHref);
      const resetTooltip = () => { delete action.dataset.tooltipDismissed; };
      action.addEventListener("pointerenter", resetTooltip);
      link.addEventListener("focus", resetTooltip);
      link.addEventListener("keydown", (event) => {
        if (event.key === "Escape") action.dataset.tooltipDismissed = "true";
      });
      equation.replaceWith(row);
      action.append(link, tooltip);
      row.append(equation, action);
      paragraph.remove();
      returnRow = row;
      break;
    }
  }

  function restoreReturnPosition() {
    if (!returnRow || restored || !returnRow.querySelector(".is-rendered")) return;
    const windowLike = getWindow();
    const requested = new URLSearchParams(windowLike?.location?.search ?? "").get(EQUATION_RETURN_PARAM);
    if (requested !== returnRow.id) return;
    restored = true;
    const row = returnRow;
    windowLike.requestAnimationFrame(() => {
      if (returnRow !== row || !row.isConnected) return;
      row.scrollIntoView({ block: "center", behavior: "instant" });
      row.querySelector("a")?.focus({ preventScroll: true });
    });
  }

  return { decorate, restoreReturnPosition };
}
