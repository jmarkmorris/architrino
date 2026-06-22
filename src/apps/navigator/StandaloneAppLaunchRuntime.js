const standaloneAppPathBySceneToken = Object.freeze({
  "assembly-explorer": "assembly-explorer.html",
  "causal-delay-feedback": "causal-delay-feedback.html",
  archie__ideal_braid: "ideal-braid.html",
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
