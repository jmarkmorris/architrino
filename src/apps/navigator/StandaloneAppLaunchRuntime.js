const standaloneAppPathBySceneToken = Object.freeze({
  "assembly-explorer": "assembly-explorer.html",
  "causal-delay-feedback": "causal-delay-feedback.html",
  animator: "animator.html",
  archie__ideal_braid: "ideal-braid.html",
  archie__photon: "photon.html",
  archie__website_stats: "website-stats.html",
  borg: "borg.html",
  "content/scenes/archie/animator.json": "animator.html",
  "content/scenes/archie/assembly_explorer.json": "assembly-explorer.html",
  "content/scenes/archie/borg.json": "borg.html",
  "content/scenes/archie/causal_delay_feedback.json": "causal-delay-feedback.html",
  "content/scenes/archie/molecule.json": "molecule.html",
  "content/scenes/archie/website_stats.json": "website-stats.html",
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
