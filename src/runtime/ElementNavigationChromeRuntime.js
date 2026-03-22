export function createElementNavigationChromeRuntime({
  elementNavOverlay,
  elementNavMini,
  elementNavButtons,
}) {
  function updateOverlayVisibility(isElementScene) {
    if (!elementNavOverlay) {
      return;
    }
    elementNavOverlay.classList.toggle("is-open", !!isElementScene);
    elementNavOverlay.setAttribute("aria-hidden", isElementScene ? "false" : "true");
    elementNavOverlay.inert = !isElementScene;
  }

  function buildMiniHud(state) {
    if (!elementNavMini || !state?.ready || state.miniHudBuilt) {
      return;
    }
    elementNavMini.innerHTML = "";
    state.miniCellBySymbol.clear();
    const fragment = document.createDocumentFragment();
    const orderedElements = [...state.elementBySymbol.values()].sort((a, b) => {
      if (a.y !== b.y) {
        return a.y - b.y;
      }
      if (a.x !== b.x) {
        return a.x - b.x;
      }
      return a.symbol.localeCompare(b.symbol);
    });
    orderedElements.forEach((element) => {
      const cell = document.createElement("div");
      cell.className = "element-nav-mini-cell";
      cell.style.gridColumn = String(element.x);
      cell.style.gridRow = String(element.y);
      cell.dataset.symbol = element.symbol;
      cell.setAttribute("aria-hidden", "true");
      fragment.appendChild(cell);
      state.miniCellBySymbol.set(element.symbol, cell);
    });
    elementNavMini.appendChild(fragment);
    state.miniHudBuilt = true;
  }

  function clearMiniHighlights(state) {
    state?.miniCellBySymbol?.forEach((cell) => {
      cell.classList.remove("is-current");
      cell.classList.remove("is-neighbor");
      cell.classList.remove("is-neighbor-up");
      cell.classList.remove("is-neighbor-down");
      cell.classList.remove("is-neighbor-left");
      cell.classList.remove("is-neighbor-right");
      cell.replaceChildren();
    });
  }

  function addMiniDirectionIndicator(cell, direction) {
    if (!(cell instanceof HTMLElement) || !direction) {
      return;
    }
    const directionClass = `is-neighbor-${direction}`;
    cell.classList.add("is-neighbor", directionClass);
    if (cell.querySelector(`.element-nav-mini-indicator.dir-${direction}`)) {
      return;
    }
    const indicator = document.createElement("span");
    indicator.className = `element-nav-mini-indicator dir-${direction}`;
    indicator.setAttribute("aria-hidden", "true");
    cell.appendChild(indicator);
  }

  function setNavButtonTarget(direction, targetSymbol, options = {}) {
    const button = elementNavButtons?.[direction];
    if (!button) {
      return;
    }
    const canNavigate =
      !!targetSymbol &&
      !options.transitionActive &&
      options.navigationInFlight !== true;
    button.disabled = !canNavigate;
    button.dataset.targetSymbol = targetSymbol ?? "";
  }

  function markCurrentSymbol(state, currentSymbol) {
    const currentCell = currentSymbol ? state?.miniCellBySymbol?.get(currentSymbol) : null;
    if (currentCell) {
      currentCell.classList.add("is-current");
    }
  }

  function markDirectionalTargets(state, directionalTargets = {}) {
    Object.entries(directionalTargets).forEach(([direction, targetSymbol]) => {
      const targetCell = targetSymbol ? state?.miniCellBySymbol?.get(targetSymbol) : null;
      if (targetCell) {
        addMiniDirectionIndicator(targetCell, direction);
      }
    });
  }

  function resolveNearestMiniCellSymbolFromPoint(clientX, clientY, state) {
    if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) {
      return null;
    }
    let nearestSymbol = null;
    let nearestDistanceSq = Number.POSITIVE_INFINITY;
    state?.miniCellBySymbol?.forEach((cell, symbol) => {
      if (!(cell instanceof HTMLElement)) {
        return;
      }
      const rect = cell.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;
      const dx = centerX - clientX;
      const dy = centerY - clientY;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq < nearestDistanceSq) {
        nearestDistanceSq = distanceSq;
        nearestSymbol = symbol;
      }
    });
    return nearestSymbol;
  }

  return {
    addMiniDirectionIndicator,
    buildMiniHud,
    clearMiniHighlights,
    markCurrentSymbol,
    markDirectionalTargets,
    resolveNearestMiniCellSymbolFromPoint,
    setNavButtonTarget,
    updateOverlayVisibility,
  };
}
