export function createSceneStateHashService(deps = {}) {
  const sceneHistoryStateKey = "architrinoSceneHistory";
  const rootScenePath = deps.rootScenePath;
  const getNavigationStack =
    typeof deps.getNavigationStack === "function" ? deps.getNavigationStack : () => [];
  const locationRef = deps.locationRef ?? (typeof window !== "undefined" ? window.location : null);
  const historyRef = deps.historyRef ?? (typeof window !== "undefined" ? window.history : null);
  let currentHistoryIndex = resolveHistoryIndex(historyRef?.state);

  function resolveHistoryIndex(state) {
    const value = state?.[sceneHistoryStateKey]?.index;
    return Number.isSafeInteger(value) ? value : 0;
  }

  function cloneNavigationStack(entries) {
    if (!Array.isArray(entries)) {
      return [];
    }
    return entries
      .filter((entry) => entry && entry.levelId && entry.focusNodeId)
      .map((entry) => ({
        levelId: entry.levelId,
        focusNodeId: entry.focusNodeId,
      }));
  }

  function getSceneStateFromHash() {
    if (!locationRef) {
      return { scenePath: null, parentLevelId: null, parentFocusNodeId: null };
    }
    const rawHash = String(locationRef.hash || "").replace(/^#/, "");
    if (!rawHash) {
      return { scenePath: null, parentLevelId: null, parentFocusNodeId: null };
    }
    const params = new URLSearchParams(rawHash);
    const sceneParam = params.get("scene");
    const parentLevelId = params.get("parent");
    const parentFocusNodeId = params.get("focus");
    if (sceneParam) {
      return {
        scenePath: sceneParam,
        parentLevelId,
        parentFocusNodeId,
      };
    }
    let scenePath = rawHash;
    try {
      scenePath = decodeURIComponent(rawHash);
    } catch (_error) {
      scenePath = rawHash;
    }
    return { scenePath, parentLevelId: null, parentFocusNodeId: null };
  }

  function getSceneStateFromHistoryState(state) {
    const sceneState = state?.[sceneHistoryStateKey];
    if (!sceneState || typeof sceneState !== "object") {
      return null;
    }
    return {
      scenePath: sceneState.scenePath ?? null,
      parentLevelId: sceneState.parentLevelId ?? null,
      parentFocusNodeId: sceneState.parentFocusNodeId ?? null,
      navigationStack: cloneNavigationStack(sceneState.navigationStack),
      historyIndex: Number.isSafeInteger(sceneState.index) ? sceneState.index : null,
    };
  }

  function buildStatePayload(normalizedScenePath) {
    const navigationStack = normalizedScenePath ? cloneNavigationStack(getNavigationStack()) : [];
    const parent = navigationStack[navigationStack.length - 1];
    return {
      scenePath: normalizedScenePath || rootScenePath || null,
      parentLevelId: parent?.levelId ?? null,
      parentFocusNodeId: parent?.focusNodeId ?? null,
      navigationStack,
      index: currentHistoryIndex,
    };
  }

  function buildHistoryState(normalizedScenePath) {
    const existingState =
      historyRef?.state && typeof historyRef.state === "object" ? historyRef.state : {};
    return {
      ...existingState,
      [sceneHistoryStateKey]: buildStatePayload(normalizedScenePath),
    };
  }

  function syncSceneHash(scenePath, options = {}) {
    if (!locationRef || !historyRef) {
      return;
    }
    const normalized =
      typeof scenePath === "string" && scenePath && scenePath !== rootScenePath
        ? scenePath
        : "";
    const params = new URLSearchParams();
    if (normalized) {
      params.set("scene", normalized);
      const navigationStack = getNavigationStack();
      const parent = navigationStack[navigationStack.length - 1];
      if (parent?.levelId && parent?.focusNodeId) {
        params.set("parent", parent.levelId);
        params.set("focus", parent.focusNodeId);
      }
    }
    const serialized = params.toString();
    const nextHash = serialized ? `#${serialized}` : "";
    const nextUrl = `${locationRef.pathname}${locationRef.search}${nextHash}`;
    const shouldPush =
      options.historyMode === "push" &&
      locationRef.hash !== nextHash &&
      typeof historyRef.pushState === "function";
    if (shouldPush) {
      currentHistoryIndex += 1;
    }
    const nextState = buildHistoryState(normalized);
    if (shouldPush) {
      historyRef.pushState(nextState, "", nextUrl);
      return;
    }
    historyRef.replaceState(nextState, "", nextUrl);
  }

  function getCurrentHistoryIndex() {
    return currentHistoryIndex;
  }

  function setCurrentHistoryIndex(index) {
    if (Number.isSafeInteger(index)) {
      currentHistoryIndex = index;
    }
  }

  return {
    getSceneStateFromHash,
    getSceneStateFromHistoryState,
    syncSceneHash,
    getCurrentHistoryIndex,
    setCurrentHistoryIndex,
  };
}
