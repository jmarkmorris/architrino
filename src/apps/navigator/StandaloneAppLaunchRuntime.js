const standaloneAppPathBySceneToken = Object.freeze({
  archie__ideal_swarm: "ideal-swarm.html",
  archie__photon: "photon.html",
  "content/scenes/archie/molecule.json": "molecule.html",
  "content/scenes/chemistry/molecule.json": "molecule.html",
  molecule: "molecule.html",
});

export function getStandaloneAppPathForScene(sceneToken = "") {
  const normalizedSceneToken = String(sceneToken ?? "").trim();
  return standaloneAppPathBySceneToken[normalizedSceneToken] ?? null;
}

export function resolveStandaloneAppHrefForScene(sceneToken = "", currentHref = "") {
  const relativePath = getStandaloneAppPathForScene(sceneToken);
  if (!relativePath) {
    return null;
  }

  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  return new URL(relativePath, baseHref).href;
}
