function resolveSceneMeta(sceneDataOrMeta = null) {
  if (!sceneDataOrMeta || typeof sceneDataOrMeta !== "object") {
    return null;
  }
  if (sceneDataOrMeta.scene && typeof sceneDataOrMeta.scene === "object") {
    return sceneDataOrMeta.scene;
  }
  return sceneDataOrMeta;
}

export function isSceneHiddenFromMainApp(sceneDataOrMeta = null) {
  const sceneMeta = resolveSceneMeta(sceneDataOrMeta);
  if (!sceneMeta) {
    return false;
  }
  if (sceneMeta.mainAppHidden === true) {
    return true;
  }
  if (sceneMeta.mainApp && typeof sceneMeta.mainApp === "object") {
    return sceneMeta.mainApp.hidden === true;
  }
  return false;
}

export function isSceneVisibleInMainApp(sceneDataOrMeta = null) {
  return !isSceneHiddenFromMainApp(sceneDataOrMeta);
}
