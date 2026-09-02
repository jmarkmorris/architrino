const standaloneAppPathBySceneToken = Object.freeze({
  "assembly-explorer": "borg-library.html",
  "causal-delay-feedback": "causal-delay-feedback.html",
  "equation-mapping": "equation-mapping.html",
  "greek-letter-match": "greek-letter-match.html",
  "lattice-lab": "lattice-lab.html",
  topo: "topo.html",
  animator: "animator.html",
  archie__ideal_braid: "ideal-braid.html",
  archie__photon: "photon.html",
  archie__website_stats: "website-stats.html",
  archie__brand_visual_identity: "brand-visual-identity.html",
  "braid-search": "braid-search.html",
  borg: "borg-library.html",
  "content/scenes/archie/animator.json": "animator.html",
  "content/scenes/archie/assembly_explorer.json": "borg-library.html",
  "content/scenes/archie/borg.json": "borg-library.html",
  "content/scenes/archie/braid_search.json": "braid-search.html",
  "content/scenes/archie/causal_delay_feedback.json": "causal-delay-feedback.html",
  "content/scenes/archie/equation_mapping.json": "equation-mapping.html",
  "content/scenes/archie/greek_letter_match.json": "greek-letter-match.html",
  "content/scenes/archie/lattice_lab.json": "lattice-lab.html",
  "content/scenes/archie/topo.json": "topo.html",
  "content/scenes/archie/molecule.json": "molecule.html",
  "content/scenes/archie/website_stats.json": "website-stats.html",
  "content/scenes/archie/brand_visual_identity.json": "brand-visual-identity.html",
  "content/scenes/chemistry/molecule.json": "molecule.html",
  molecule: "molecule.html",
});

// Direct-route resolution is transport, not product classification. These
// operational or developer surfaces remain launchable without entering the
// reader-facing product search catalogue.
const nonProductSceneTokens = new Set([
  "assembly-explorer",
  "content/scenes/archie/assembly_explorer.json",
  "aaa-core",
  "aaa_core",
  "app-aaa-core",
  "archie__aaa_core",
  "content/scenes/archie/aaa_core.json",
  "braid-search",
  "content/scenes/archie/braid_search.json",
  "archie__website_stats",
  "content/scenes/archie/website_stats.json",
  "archie__brand_visual_identity",
  "content/scenes/archie/brand_visual_identity.json",
  "archie__ui_guidelines",
  "content/scenes/archie/ui_guidelines.json",
]);

export function getStandaloneAppPathForScene(sceneToken = "") {
  const normalizedSceneToken = String(sceneToken ?? "").trim();
  return standaloneAppPathBySceneToken[normalizedSceneToken] ?? null;
}

export function isPublicProductSceneSearchEntry(entry = {}) {
  const tokens = [entry?.id, entry?.path]
    .map((token) => String(token ?? "").trim())
    .filter(Boolean);
  return tokens.every((token) => !nonProductSceneTokens.has(token));
}

export function resolveStandaloneAppHrefForScene(sceneToken = "", currentHref = "") {
  const relativePath = getStandaloneAppPathForScene(sceneToken);
  if (!relativePath) {
    return null;
  }

  const baseHref = String(currentHref ?? "").trim() || "http://localhost/";
  return new URL(relativePath, baseHref).href;
}
