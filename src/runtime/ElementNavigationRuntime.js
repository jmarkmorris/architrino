import {
  extractElementSymbolFromScene,
  isElementScene,
} from "../services/SceneCapabilitiesService.js";

export function createElementNavigationRuntime({
  buttons,
  mini,
  chromeRuntime,
  periodicTableDataPath,
  elementScenePathPattern,
  periodicTableService,
  sceneGraphManifestService,
  getCurrentLevel,
  isTransitionActive,
  closeDetailPanel,
  hideHoverTooltip,
  jumpToScene,
  fetchImpl,
  isSearchOpen,
  isEditingTextInput,
  windowObj = window,
}) {
  const directionByKey = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };

  const state = {
    ready: false,
    loadingPromise: null,
    navigationInFlight: false,
    elementBySymbol: new Map(),
    symbolByCoordinate: new Map(),
    rowColumnsByY: new Map(),
    columnRowsByX: new Map(),
    scenePathBySymbol: new Map(),
    miniCellBySymbol: new Map(),
    miniHudBuilt: false,
    updateToken: 0,
  };

  function normalizeElementSymbol(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function isElementSceneLevel(level = getCurrentLevel?.()) {
    return isElementScene(level);
  }

  function extractElementSymbolFromLevel(level = getCurrentLevel?.()) {
    const sceneId = normalizeElementSymbol(
      extractElementSymbolFromScene(level, { scenePathPattern: elementScenePathPattern })
    );
    if (sceneId && state.elementBySymbol.has(sceneId)) {
      return sceneId;
    }
    return sceneId || null;
  }

  async function ensureData() {
    if (state.ready) {
      return true;
    }
    if (state.loadingPromise) {
      return state.loadingPromise;
    }
    state.loadingPromise = (async () => {
      const periodicTable = await periodicTableService.ensure(
        (...args) => fetchImpl(...args),
        periodicTableDataPath
      );
      if (!Array.isArray(periodicTable?.elements)) {
        return false;
      }

      const rowColumnsByY = new Map();
      const columnRowsByX = new Map();
      state.elementBySymbol.clear();
      state.symbolByCoordinate.clear();
      state.rowColumnsByY.clear();
      state.columnRowsByX.clear();
      state.scenePathBySymbol.clear();
      state.miniCellBySymbol.clear();
      state.miniHudBuilt = false;

      periodicTable.elements.forEach((element) => {
        const symbol = normalizeElementSymbol(element?.symbol);
        const x = Number(element?.xpos);
        const y = Number(element?.ypos);
        if (!symbol || !Number.isFinite(x) || !Number.isFinite(y)) {
          return;
        }
        state.elementBySymbol.set(symbol, { symbol, x, y });
        state.symbolByCoordinate.set(`${x},${y}`, symbol);
        if (!rowColumnsByY.has(y)) {
          rowColumnsByY.set(y, new Set());
        }
        if (!columnRowsByX.has(x)) {
          columnRowsByX.set(x, new Set());
        }
        rowColumnsByY.get(y).add(x);
        columnRowsByX.get(x).add(y);
      });

      rowColumnsByY.forEach((columns, y) => {
        state.rowColumnsByY.set(y, [...columns].sort((a, b) => a - b));
      });
      columnRowsByX.forEach((rows, x) => {
        state.columnRowsByX.set(x, [...rows].sort((a, b) => a - b));
      });

      const scenePathEntries = await Promise.all(
        [...state.elementBySymbol.keys()].map(async (symbol) => {
          let scenePath = null;
          if (
            sceneGraphManifestService &&
            typeof sceneGraphManifestService.resolvePeriodicElementScenePath === "function"
          ) {
            scenePath = await sceneGraphManifestService.resolvePeriodicElementScenePath(symbol);
          }
          if (!scenePath) {
            scenePath = `content/scenes/elements/${symbol}.json`;
          }
          return [symbol, scenePath];
        })
      );
      scenePathEntries.forEach(([symbol, scenePath]) => {
        state.scenePathBySymbol.set(symbol, scenePath);
      });

      state.ready = true;
      return true;
    })()
      .catch((error) => {
        console.warn("[ElementNavigation] Failed to initialize", error);
        state.ready = false;
        return false;
      })
      .finally(() => {
        state.loadingPromise = null;
      });
    return state.loadingPromise;
  }

  function getWrappedNeighbor(values, currentValue, direction) {
    if (!Array.isArray(values) || values.length <= 1) {
      return null;
    }
    const currentIndex = values.indexOf(currentValue);
    if (currentIndex < 0) {
      return null;
    }
    if (direction === "up" || direction === "left") {
      return currentIndex > 0 ? values[currentIndex - 1] : values[values.length - 1];
    }
    if (direction === "down" || direction === "right") {
      return currentIndex < values.length - 1 ? values[currentIndex + 1] : values[0];
    }
    return null;
  }

  function resolveNeighborSymbol(symbol, direction) {
    const normalizedSymbol = normalizeElementSymbol(symbol);
    const current = state.elementBySymbol.get(normalizedSymbol);
    if (!current) {
      return null;
    }
    if (direction === "left" || direction === "right") {
      const rowColumns = state.rowColumnsByY.get(current.y);
      const targetX = getWrappedNeighbor(rowColumns, current.x, direction);
      if (!Number.isFinite(targetX)) {
        return null;
      }
      return state.symbolByCoordinate.get(`${targetX},${current.y}`) ?? null;
    }
    if (direction === "up" || direction === "down") {
      const columnRows = state.columnRowsByX.get(current.x);
      const targetY = getWrappedNeighbor(columnRows, current.y, direction);
      if (!Number.isFinite(targetY)) {
        return null;
      }
      return state.symbolByCoordinate.get(`${current.x},${targetY}`) ?? null;
    }
    return null;
  }

  function resolveDirectionalTargets(symbol) {
    return {
      up: resolveNeighborSymbol(symbol, "up"),
      down: resolveNeighborSymbol(symbol, "down"),
      left: resolveNeighborSymbol(symbol, "left"),
      right: resolveNeighborSymbol(symbol, "right"),
    };
  }

  function setButtonTarget(direction, targetSymbol) {
    chromeRuntime.setNavButtonTarget(direction, targetSymbol, {
      transitionActive: isTransitionActive?.(),
      navigationInFlight: state.navigationInFlight,
    });
  }

  async function updateUi() {
    const isElementScene = isElementSceneLevel();
    const updateToken = ++state.updateToken;
    chromeRuntime.updateOverlayVisibility(isElementScene);
    if (!isElementScene) {
      chromeRuntime.clearMiniHighlights(state);
      Object.keys(buttons).forEach((direction) => setButtonTarget(direction, null));
      return;
    }

    const ready = await ensureData();
    if (updateToken !== state.updateToken) {
      return;
    }
    if (!ready) {
      chromeRuntime.clearMiniHighlights(state);
      Object.keys(buttons).forEach((direction) => setButtonTarget(direction, null));
      return;
    }

    chromeRuntime.buildMiniHud(state);
    chromeRuntime.clearMiniHighlights(state);

    const currentSymbol = extractElementSymbolFromLevel();
    if (!currentSymbol) {
      Object.keys(buttons).forEach((direction) => setButtonTarget(direction, null));
      return;
    }

    chromeRuntime.markCurrentSymbol(state, currentSymbol);
    const directionalTargets = resolveDirectionalTargets(currentSymbol);
    Object.entries(directionalTargets).forEach(([direction, targetSymbol]) => {
      setButtonTarget(direction, targetSymbol);
    });
    chromeRuntime.markDirectionalTargets(state, directionalTargets);
  }

  async function navigateToSymbol(targetSymbol) {
    if (
      !targetSymbol ||
      isTransitionActive?.() ||
      state.navigationInFlight === true ||
      !isElementSceneLevel()
    ) {
      return false;
    }
    state.navigationInFlight = true;
    updateUi();
    try {
      const ready = await ensureData();
      if (!ready || isTransitionActive?.() || !isElementSceneLevel()) {
        return false;
      }
      const normalizedSymbol = normalizeElementSymbol(targetSymbol);
      const targetPath = state.scenePathBySymbol.get(normalizedSymbol);
      if (!targetPath || targetPath === getCurrentLevel?.()?.id) {
        return false;
      }
      closeDetailPanel?.();
      hideHoverTooltip?.();
      await jumpToScene(targetPath, { mode: "jump" });
      return true;
    } finally {
      state.navigationInFlight = false;
      updateUi();
    }
  }

  async function navigateByDirection(direction) {
    if (
      !direction ||
      isTransitionActive?.() ||
      state.navigationInFlight === true ||
      !isElementSceneLevel()
    ) {
      return false;
    }
    const ready = await ensureData();
    if (!ready || isTransitionActive?.() || !isElementSceneLevel()) {
      return false;
    }
    const currentSymbol = extractElementSymbolFromLevel();
    if (!currentSymbol) {
      return false;
    }
    const targetSymbol = resolveNeighborSymbol(currentSymbol, direction);
    if (!targetSymbol) {
      return false;
    }
    return await navigateToSymbol(targetSymbol);
  }

  function wireControls() {
    Object.entries(buttons).forEach(([direction, button]) => {
      if (!button) {
        return;
      }
      button.addEventListener("click", async () => {
        const handled = await navigateByDirection(direction);
        if (handled) {
          updateUi();
        }
      });
    });

    if (mini) {
      mini.addEventListener("click", async (event) => {
        if (!isElementSceneLevel() || isTransitionActive?.()) {
          return;
        }
        const targetSymbol = chromeRuntime.resolveNearestMiniCellSymbolFromPoint(
          event.clientX,
          event.clientY,
          state
        );
        if (!targetSymbol) {
          return;
        }
        await navigateToSymbol(targetSymbol);
      });
    }

    windowObj.addEventListener("keydown", async (event) => {
      const direction = directionByKey[event.key];
      if (!direction) {
        return;
      }
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (isEditingTextInput?.(event.target)) {
        return;
      }
      if (isSearchOpen?.()) {
        return;
      }
      const handled = await navigateByDirection(direction);
      if (handled) {
        event.preventDefault();
      }
    });
  }

  return {
    ensureData,
    isElementSceneLevel,
    navigateToSymbol,
    updateUi,
    wireControls,
  };
}
