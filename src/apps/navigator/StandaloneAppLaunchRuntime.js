const standaloneScenePathById = Object.freeze({
  reaction_designer: "./reaction.html",
});

export function getStandaloneAppPathForScene(sceneId = "") {
  const normalizedSceneId = String(sceneId ?? "").trim();
  return standaloneScenePathById[normalizedSceneId] ?? null;
}

export function resolveStandaloneAppHrefForScene(sceneId = "", currentHref = "") {
  const relativePath = getStandaloneAppPathForScene(sceneId);
  if (!relativePath) {
    return null;
  }

  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  return new URL(relativePath, baseHref).href;
}
