import { createEquationMappingLaunchHref, EQUATION_RETURN_PARAM } from "./EquationMappingNavigation.js";

const EQUATION_MAPPING_SOURCE_LABEL = "View →";
const EQUATION_MAPPING_SOURCE_HREF = /^(?:\.\.\/)+equation-mapping\.html#([a-z0-9][a-z0-9._~-]*)$/iu;

export function resolveEquationMappingSemanticId(rawHref) {
  if (typeof rawHref !== "string") return null;
  return rawHref.match(EQUATION_MAPPING_SOURCE_HREF)?.[1] ?? null;
}

export function createMarkdownEquationMapRuntime({ markdownBody, documentLike, getWindow }) {
  let returnRows = new Map();
  let restoredSemanticId = null;

  function decorate(sourcePath, sourceSection = null) {
    returnRows = new Map();
    restoredSemanticId = null;
    if (!sourcePath || !documentLike?.createElement) return 0;
    for (const link of markdownBody?.querySelectorAll?.("a[href]") ?? []) {
      const rawHref = link.getAttribute("href");
      const semanticId = resolveEquationMappingSemanticId(rawHref);
      const paragraph = link.parentElement;
      const equation = paragraph?.previousElementSibling;
      const paragraphText = paragraph?.textContent.trim() ?? "";
      if (!semanticId || link.textContent.trim() !== EQUATION_MAPPING_SOURCE_LABEL ||
          paragraph?.tagName !== "P" || paragraph.children?.[0] !== link ||
          !paragraphText.startsWith(EQUATION_MAPPING_SOURCE_LABEL) ||
          !equation?.classList.contains("markdown-math-block")) continue;
      const linkOnlyParagraph = paragraphText === EQUATION_MAPPING_SOURCE_LABEL;

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
      link.textContent = EQUATION_MAPPING_SOURCE_LABEL;
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
      if (linkOnlyParagraph) paragraph.remove();
      returnRows.set(semanticId, row);
    }
    return returnRows.size;
  }

  function restoreReturnPosition() {
    const windowLike = getWindow();
    const requested = new URLSearchParams(windowLike?.location?.search ?? "").get(EQUATION_RETURN_PARAM);
    const row = returnRows.get(requested);
    if (!row || restoredSemanticId === requested || !row.querySelector(".is-rendered")) return;
    restoredSemanticId = requested;
    windowLike.requestAnimationFrame(() => {
      if (returnRows.get(requested) !== row || !row.isConnected) return;
      row.scrollIntoView({ block: "center", behavior: "instant" });
      row.querySelector("a")?.focus({ preventScroll: true });
    });
  }

  return { decorate, restoreReturnPosition };
}
