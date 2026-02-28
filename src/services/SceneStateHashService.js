export function createSceneStateHashService(deps = {}) {
  const rootScenePath = deps.rootScenePath;
  const getNavigationStack =
    typeof deps.getNavigationStack === "function" ? deps.getNavigationStack : () => [];
  const locationRef = deps.locationRef ?? (typeof window !== "undefined" ? window.location : null);
  const historyRef = deps.historyRef ?? (typeof window !== "undefined" ? window.history : null);

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

  function syncSceneHash(scenePath) {
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
    if (locationRef.hash === nextHash) {
      return;
    }
    const nextUrl = `${locationRef.pathname}${locationRef.search}${nextHash}`;
    historyRef.replaceState(historyRef.state, "", nextUrl);
  }

  return {
    getSceneStateFromHash,
    syncSceneHash,
  };
}
