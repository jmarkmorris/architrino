const HUD_TOOLTIP_TARGET_SELECTOR = "button[aria-label]";
const HUD_TOOLTIP_SHOW_DELAY_MS = 120;

function getTooltipLabel(target) {
  if (!target || typeof target.getAttribute !== "function") {
    return "";
  }
  return (
    target.getAttribute("data-tooltip") ||
    target.getAttribute("aria-label") ||
    ""
  ).trim();
}

function isElementHidden(target) {
  if (!target) {
    return true;
  }
  if (target.hidden || target.getAttribute?.("aria-hidden") === "true") {
    return true;
  }
  return target.classList?.contains("is-hidden") === true;
}

export function createSceneHudTooltipRuntime({
  documentRef = typeof document !== "undefined" ? document : null,
  windowRef = typeof window !== "undefined" ? window : null,
  sceneHudTools,
  showHoverTooltip,
  hideHoverTooltip,
}) {
  let activeTarget = null;
  let showTimeoutId = null;
  let tooltipVisible = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  function clearShowTimeout() {
    if (!showTimeoutId || !windowRef?.clearTimeout) {
      showTimeoutId = null;
      return;
    }
    windowRef.clearTimeout(showTimeoutId);
    showTimeoutId = null;
  }

  function resolveTarget(node) {
    const target = node?.closest?.(HUD_TOOLTIP_TARGET_SELECTOR);
    if (!target || !sceneHudTools?.contains?.(target) || isElementHidden(target)) {
      return null;
    }
    return getTooltipLabel(target) ? target : null;
  }

  function suppressNativeTitleTooltip(target) {
    if (!target || typeof target.setAttribute !== "function") {
      return;
    }
    target.setAttribute("title", "");
    target.querySelectorAll?.("[title]").forEach((node) => {
      node.setAttribute("title", "");
    });
  }

  function suppressNativeTitleTooltips() {
    sceneHudTools
      ?.querySelectorAll?.(HUD_TOOLTIP_TARGET_SELECTOR)
      .forEach((target) => {
        suppressNativeTitleTooltip(target);
      });
  }

  function resolveTargetAtPoint(x, y) {
    if (!documentRef?.elementFromPoint) {
      return null;
    }
    return resolveTarget(documentRef.elementFromPoint(x, y));
  }

  function clearActiveTarget() {
    activeTarget?.removeAttribute?.("aria-describedby");
    activeTarget = null;
  }

  function hideTooltip() {
    clearShowTimeout();
    clearActiveTarget();
    tooltipVisible = false;
    if (typeof hideHoverTooltip === "function") {
      hideHoverTooltip();
    }
  }

  function showTooltip(target, x, y) {
    const label = getTooltipLabel(target);
    if (!label || typeof showHoverTooltip !== "function") {
      return;
    }
    activeTarget = target;
    activeTarget.setAttribute?.("aria-describedby", "hover-tooltip");
    tooltipVisible = true;
    showHoverTooltip(label, x, y, {
      variant: "hud",
      minTop: 8,
    });
  }

  function showTooltipFromElement(target) {
    const rect = target?.getBoundingClientRect?.();
    if (!rect) {
      return;
    }
    showTooltip(target, rect.left + rect.width / 2, rect.bottom);
  }

  function scheduleElementTooltip(target) {
    clearShowTimeout();
    if (!windowRef?.setTimeout) {
      showTooltipFromElement(target);
      return;
    }
    showTimeoutId = windowRef.setTimeout(() => {
      showTimeoutId = null;
      if (activeTarget === target) {
        showTooltipFromElement(target);
      }
    }, HUD_TOOLTIP_SHOW_DELAY_MS);
  }

  function schedulePointerTooltip(target, x, y) {
    clearShowTimeout();
    if (!windowRef?.setTimeout) {
      showTooltip(target, x, y);
      return;
    }
    showTimeoutId = windowRef.setTimeout(() => {
      showTimeoutId = null;
      if (activeTarget === target) {
        showTooltip(target, lastPointerX, lastPointerY);
      }
    }, HUD_TOOLTIP_SHOW_DELAY_MS);
  }

  function setPointerTarget(target, x, y) {
    if (!target) {
      hideTooltip();
      return;
    }
    lastPointerX = x;
    lastPointerY = y;
    if (activeTarget !== target) {
      clearActiveTarget();
      activeTarget = target;
      tooltipVisible = false;
      schedulePointerTooltip(target, x, y);
      return;
    }
    if (tooltipVisible) {
      showTooltip(target, x, y);
    }
  }

  function handlePointerMove(event) {
    setPointerTarget(resolveTargetAtPoint(event.clientX, event.clientY), event.clientX, event.clientY);
  }

  function handleFocusIn(event) {
    const target = resolveTarget(event.target);
    if (!target) {
      return;
    }
    clearShowTimeout();
    clearActiveTarget();
    activeTarget = target;
    tooltipVisible = false;
    scheduleElementTooltip(target);
  }

  function handleFocusOut(event) {
    if (event.target === activeTarget) {
      hideTooltip();
    }
  }

  function handlePointerDown(event) {
    if (!resolveTargetAtPoint(event.clientX, event.clientY)) {
      hideTooltip();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && activeTarget) {
      hideTooltip();
    }
  }

  function wireListeners() {
    if (!documentRef || !sceneHudTools) {
      return;
    }
    suppressNativeTitleTooltips();
    documentRef.addEventListener("pointermove", handlePointerMove, true);
    documentRef.addEventListener("pointerdown", handlePointerDown, true);
    documentRef.addEventListener("focusin", handleFocusIn, true);
    documentRef.addEventListener("focusout", handleFocusOut, true);
    windowRef?.addEventListener?.("keydown", handleKeyDown);
  }

  return {
    wireListeners,
  };
}
