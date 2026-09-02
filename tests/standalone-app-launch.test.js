import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  getStandaloneAppPathForScene,
  isPublicProductSceneSearchEntry,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";
import {
  APPLICATIONS_SCENE_PATH,
  STANDALONE_APP_HOME_HREF,
  STANDALONE_APP_HOME_RETURN_STORAGE_KEY,
  STANDALONE_SITE_HOME_HREF,
  consumeStandaloneAppHomeReturn,
  navigateStandaloneAppHome,
  recordStandaloneAppHomeReturn,
  resolveStandaloneAppHomeHref,
  resolveStandaloneSiteHomeHref,
} from "../src/apps/navigator/StandaloneAppHomeRuntime.js";
import {
  GLOBAL_SCENE_GRAPH_MANIFEST_PATH,
  TEXTBOOK_TOC_SCENE_PATH,
  resolveStandaloneGlobalSceneHref,
  resolveStandaloneGlobalSearchHref,
} from "../src/apps/navigator/StandaloneAppSceneSearchRuntime.js";
import { createSceneSearchRuntime } from "../src/runtime/SceneSearchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function createSessionStorageMock() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

test("standalone app scene mappings resolve to standalone app paths", () => {
  assert.equal(getStandaloneAppPathForScene("assembly-explorer"), "borg-library.html");
  assert.equal(getStandaloneAppPathForScene("causal-delay-feedback"), "causal-delay-feedback.html");
  assert.equal(getStandaloneAppPathForScene("equation-mapping"), "equation-mapping.html");
  assert.equal(getStandaloneAppPathForScene("greek-letter-match"), "greek-letter-match.html");
  assert.equal(getStandaloneAppPathForScene("lattice-lab"), "lattice-lab.html");
  assert.equal(getStandaloneAppPathForScene("topo"), "topo.html");
  assert.equal(getStandaloneAppPathForScene("animator"), "animator.html");
  assert.equal(getStandaloneAppPathForScene("borg"), "borg-library.html");
  assert.equal(getStandaloneAppPathForScene("braid-search"), "braid-search.html");
  assert.equal(
    getStandaloneAppPathForScene("archie__brand_visual_identity"),
    "brand-visual-identity.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/assembly_explorer.json"),
    "borg-library.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/causal_delay_feedback.json"),
    "causal-delay-feedback.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/equation_mapping.json"),
    "equation-mapping.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/greek_letter_match.json"),
    "greek-letter-match.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/lattice_lab.json"),
    "lattice-lab.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/topo.json"),
    "topo.html"
  );
  assert.equal(getStandaloneAppPathForScene("content/scenes/archie/animator.json"), "animator.html");
  assert.equal(getStandaloneAppPathForScene("content/scenes/archie/borg.json"), "borg-library.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/braid_search.json"),
    "braid-search.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/brand_visual_identity.json"),
    "brand-visual-identity.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/assembly_explorer.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fassembly_explorer.json"
    ),
    "http://127.0.0.1:5173/borg-library.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/causal_delay_feedback.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fcausal_delay_feedback.json"
    ),
    "http://127.0.0.1:5173/causal-delay-feedback.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/equation_mapping.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fequation_mapping.json"
    ),
    "http://127.0.0.1:5173/equation-mapping.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/lattice_lab.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Flattice_lab.json"
    ),
    "http://127.0.0.1:5173/lattice-lab.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/topo.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Ftopo.json"
    ),
    "http://127.0.0.1:5173/topo.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/animator.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fanimator.json"
    ),
    "http://127.0.0.1:5173/animator.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/borg.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fborg.json"
    ),
    "http://127.0.0.1:5173/borg-library.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/braid_search.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fbraid_search.json"
    ),
    "http://127.0.0.1:5173/braid-search.html"
  );
});

test("brand visual reference keeps direct launch routing outside product discovery", () => {
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/brand_visual_identity.json"),
    "brand-visual-identity.html",
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/brand_visual_identity.json",
      "http://127.0.0.1:5173/index.html",
    ),
    "http://127.0.0.1:5173/brand-visual-identity.html",
  );
  assert.equal(
    isPublicProductSceneSearchEntry({
      id: "archie__brand_visual_identity",
      path: "content/scenes/archie/brand_visual_identity.json",
    }),
    false,
  );

  for (const scenePath of ["content/scenes/archie/applications.json"]) {
    assert.doesNotMatch(readRepoFile(scenePath), /brand[_-]visual[_-](?:identity|reference)/iu);
  }
});

test("AAA Core remains a headless platform outside public product discovery", () => {
  for (const sceneToken of [
    "aaa-core",
    "aaa_core",
    "app-aaa-core",
    "archie__aaa_core",
    "content/scenes/archie/aaa_core.json",
  ]) {
    assert.equal(getStandaloneAppPathForScene(sceneToken), null);
    assert.equal(isPublicProductSceneSearchEntry({id: sceneToken, path: sceneToken}), false);
  }

  for (const scenePath of ["content/scenes/archie/applications.json"]) {
    assert.doesNotMatch(readRepoFile(scenePath), /(?:aaa[_-]?core|app-aaa-core)/iu);
  }
});

test("UI Guidelines remains shared standards documentation, not a product application", () => {
  assert.equal(getStandaloneAppPathForScene("archie__ui_guidelines"), null);
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/ui_guidelines.json"),
    null,
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/ui_guidelines.json",
      "http://127.0.0.1:5173/index.html",
    ),
    null,
  );

  for (const scenePath of ["content/scenes/archie/applications.json"]) {
    assert.doesNotMatch(readRepoFile(scenePath), /ui[_-]?guidelines/iu);
  }

  const userInterfaceScene = JSON.parse(
    readRepoFile("content/scenes/archie/user_interface.json"),
  );
  const guidelinesScene = JSON.parse(
    readRepoFile("content/scenes/archie/ui_guidelines.json"),
  );
  const guidelinesGuide = readRepoFile(
    "content/markdown/aaa/archie/ui-guidelines.md",
  );
  const navigationGuide = readRepoFile(
    "content/markdown/aaa/archie/navigation-and-controls.md",
  );
  const sharedTokens = readRepoFile("ui-tokens.css");
  assert.deepEqual(
    userInterfaceScene.scene.children.find((child) => child.nodeId === "ui_guidelines"),
    {
      nodeId: "ui_guidelines",
      scenePath: "content/scenes/archie/ui_guidelines.json",
    },
  );
  assert.deepEqual(
    userInterfaceScene.objects
      .filter((object) => object.id === "ui_guidelines")
      .map(({ labelSubtitle, labelBadge }) => ({ labelSubtitle, labelBadge })),
    [{ labelSubtitle: "Shared application standards", labelBadge: "doc" }],
  );
  assert.equal(guidelinesScene.scene.type, "Scene-Markdown-View");
  assert.equal(
    guidelinesScene.scene.source.path,
    "content/markdown/aaa/archie/ui-guidelines.md",
  );
  assert.match(guidelinesGuide, /It governs applications; it is not itself a product application/u);
  assert.match(guidelinesGuide, /Reusable implementation values belong in `ui-tokens\.css`/u);
  assert.match(navigationGuide, /UI Guidelines.*own the shared interface standards/iu);
  assert.match(sharedTokens, /--ui-font-family:\s*"Helvetica Neue", Arial, sans-serif;/u);
  assert.equal(
    isPublicProductSceneSearchEntry({
      id: "archie__ui_guidelines",
      path: "content/scenes/archie/ui_guidelines.json",
    }),
    false,
  );
});

test("standalone app home href returns to the Applications scene", () => {
  assert.equal(APPLICATIONS_SCENE_PATH, "content/scenes/archie/applications.json");
  assert.equal(
    STANDALONE_APP_HOME_HREF,
    "./index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json"
  );
  assert.equal(
    resolveStandaloneAppHomeHref("http://127.0.0.1:5173/photon.html"),
    "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json"
  );
});

test("standalone site home href resolves the actual root homepage without the Applications hash", () => {
  assert.equal(STANDALONE_SITE_HOME_HREF, "./index.html");
  assert.equal(
    resolveStandaloneSiteHomeHref(
      "http://127.0.0.1:5173/causal-delay-feedback.html?replay=mock",
    ),
    "http://127.0.0.1:5173/index.html",
  );
});

test("standalone global search uses the canonical scene graph and main-app navigation contract", () => {
  assert.equal(GLOBAL_SCENE_GRAPH_MANIFEST_PATH, "content/graph/scene_graph.json");
  assert.equal(
    resolveStandaloneGlobalSearchHref(
      "content/scenes/archie/causal_delay_feedback.json",
      "http://127.0.0.1:5173/causal-delay-feedback.html?replay=mock",
    ),
    "http://127.0.0.1:5173/causal-delay-feedback.html",
  );
  assert.equal(
    resolveStandaloneGlobalSearchHref(
      "content/scenes/architrino_assembly_architecture.json",
      "http://127.0.0.1:5173/causal-delay-feedback.html?replay=mock",
    ),
    "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchitrino_assembly_architecture.json",
  );
});

test("public product scene search filters non-product entries", () => {
  const appended = [];
  const sceneSearchResults = {
    set innerHTML(_value) {
      appended.length = 0;
    },
    appendChild(item) {
      appended.push(item);
    },
  };
  const documentRef = {
    createElement() {
      return {
        addEventListener() {},
      };
    },
  };
  const sceneIndexService = {
    getSearchEntries() {
      return [
        {
          id: "braid-search",
          name: "Braid Search",
          path: "content/scenes/archie/braid_search.json",
          nodeType: "scene",
        },
        {
          id: "equation-mapping",
          name: "Equation Mapping",
          path: "content/scenes/archie/equation_mapping.json",
          nodeType: "scene",
        },
        {
          id: "archie__website_stats",
          name: "Website Statistics — Operations",
          path: "content/scenes/archie/website_stats.json",
          nodeType: "scene",
        },
        {
          id: "archie__operations",
          name: "Archie Operations",
          path: "content/scenes/archie/operations.json",
          nodeType: "scene",
        },
      ];
    },
  };
  const runtime = createSceneSearchRuntime({
    sceneSearchResults,
    sceneIndexService,
    getCurrentLevel: () => null,
    navigationStack: [],
    searchBackStack: [],
    jumpToScene() {},
    documentRef,
    isSearchEntryVisible: isPublicProductSceneSearchEntry,
  });

  runtime.updateSearchResults("braid");
  assert.equal(appended.length, 0);
  runtime.updateSearchResults("equation");
  assert.equal(appended.length, 1);
  assert.equal(appended[0].textContent, "Equation Mapping");
  runtime.updateSearchResults("website");
  assert.equal(appended.length, 0);
  runtime.updateSearchResults("operations");
  assert.equal(appended.length, 1);
  assert.equal(appended[0].textContent, "Archie Operations");
});

test("standalone global TOC resolves the canonical textbook TOC scene", () => {
  assert.equal(TEXTBOOK_TOC_SCENE_PATH, "content/scenes/archie/textbook_toc.json");
  assert.equal(
    resolveStandaloneGlobalSceneHref(
      TEXTBOOK_TOC_SCENE_PATH,
      "http://127.0.0.1:5173/causal-delay-feedback.html?replay=mock",
    ),
    "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Ftextbook_toc.json",
  );
});

test("standalone app home navigation records a one-shot return href", () => {
  const assigned = [];
  const windowLike = {
    location: {
      href: "http://127.0.0.1:5173/photon.html",
      assign: (href) => assigned.push(href),
    },
    sessionStorage: createSessionStorageMock(),
  };
  const homeHref = resolveStandaloneAppHomeHref(windowLike.location.href);

  assert.equal(
    navigateStandaloneAppHome(windowLike.location, homeHref, {
      windowLike,
    }),
    true
  );
  assert.deepEqual(assigned, [homeHref]);
  assert.notEqual(
    windowLike.sessionStorage.getItem(STANDALONE_APP_HOME_RETURN_STORAGE_KEY),
    null
  );
  assert.deepEqual(consumeStandaloneAppHomeReturn(windowLike), {
    href: windowLike.location.href,
  });
  assert.equal(
    windowLike.sessionStorage.getItem(STANDALONE_APP_HOME_RETURN_STORAGE_KEY),
    null
  );
});

test("standalone app home return storage rejects cross-origin hrefs", () => {
  const windowLike = {
    location: {
      href: "http://127.0.0.1:5173/photon.html",
    },
    sessionStorage: createSessionStorageMock(),
  };

  assert.equal(
    recordStandaloneAppHomeReturn(windowLike, "https://example.com/photon.html"),
    false
  );
  assert.equal(consumeStandaloneAppHomeReturn(windowLike), null);
});

test("standalone app home controls avoid bare index navigation", () => {
  const appRuntimes = [
    "src/apps/equation-mapping/EquationMappingRuntime.js",
    "src/apps/photon/PhotonRuntime.js",
    "src/apps/molecule/MoleculeRuntime.js",
    "src/apps/website-stats/WebsiteStatsRuntime.js",
    "src/apps/animator/AnimatorAppModeRuntime.js",
    "src/apps/braid-search/BraidSearchRuntime.js",
    "src/apps/pdgedit/PdgeditAppModeRuntime.js",
    "src/apps/pdgedit/PdgeditAppRuntime.js",
    "src/apps/ideal-braid/IdealBraidRuntime.js",
  ];

  for (const runtimePath of appRuntimes) {
    const runtime = readRepoFile(runtimePath);
    assert.equal(runtime.includes('assign?.("./index.html")'), false, runtimePath);
    assert.equal(runtime.includes('homeHref = "./index.html"'), false, runtimePath);
    assert.equal(runtime.includes('NAVIGATOR_HREF = "./index.html"'), false, runtimePath);
    assert.equal(runtime.includes('createNavLink("./index.html", "Home")'), false, runtimePath);
  }
});

test("Applications scene does not expose Assembly Explorer", () => {
  const applicationsScene = JSON.parse(readRepoFile("content/scenes/archie/applications.json"));

  assert.equal(
    applicationsScene.scene.children.some((child) => child.nodeId === "assembly_explorer"),
    false
  );
  assert.equal(
    applicationsScene.objects.some((object) => object.id === "assembly_explorer"),
    false
  );
  assert.equal(isPublicProductSceneSearchEntry({
    id: "assembly-explorer",
    path: "content/scenes/archie/assembly_explorer.json",
  }), false);
});

test("Website Statistics is an Archie Operations utility, not a product application", () => {
  const applicationsScene = JSON.parse(readRepoFile("content/scenes/archie/applications.json"));
  const projectScene = JSON.parse(readRepoFile("content/scenes/archie/project.json"));
  const operationsScene = JSON.parse(readRepoFile("content/scenes/archie/operations.json"));

  assert.equal(
    applicationsScene.scene.children.some((child) => child.nodeId === "website_stats"),
    false
  );
  assert.equal(
    applicationsScene.objects.some((object) => object.id === "website_stats"),
    false
  );
  assert.equal(
    projectScene.scene.children.some(
      (child) =>
        child.nodeId === "operations" &&
        child.scenePath === "content/scenes/archie/operations.json"
    ),
    true
  );
  assert.equal(
    projectScene.scene.children.some((child) => child.nodeId === "website_stats"),
    false
  );
  assert.equal(operationsScene.scene.id, "archie__operations");
  assert.equal(operationsScene.scene.title, "Archie Operations");
  assert.equal(
    operationsScene.scene.children.some(
      (child) =>
        child.nodeId === "website_stats" &&
        child.scenePath === "content/scenes/archie/website_stats.json"
    ),
    true
  );
  assert.equal(
    operationsScene.objects.some(
      (object) =>
        object.id === "website_stats" &&
        object.labelSubtitle === "Public operations utility"
    ),
    true
  );
});

test("Applications scene exposes Equation Mapping as a standalone app scene", () => {
  const applicationsScene = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const equationMappingScene = JSON.parse(readRepoFile("content/scenes/archie/equation_mapping.json"));

  assert.equal(equationMappingScene.scene.id, "equation-mapping");
  assert.equal(equationMappingScene.scene.title, "Equation Mapping");
  assert.equal(
    applicationsScene.scene.children.some(
      (child) =>
        child.nodeId === "equation_mapping" && child.scenePath === "content/scenes/archie/equation_mapping.json"
    ),
    true
  );
  assert.equal(
    applicationsScene.objects.some((object) => object.id === "equation_mapping" && object.labelTitle === "Equation Mapping"),
    true
  );
});

test("Applications scene exposes It's Greek to Me! as a standalone app scene", () => {
  const applicationsScene = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const greekMatchScene = JSON.parse(readRepoFile("content/scenes/archie/greek_letter_match.json"));

  assert.equal(greekMatchScene.scene.id, "greek-letter-match");
  assert.equal(greekMatchScene.scene.title, "It's Greek to Me!");
  assert.equal(
    applicationsScene.scene.children.some(
      (child) =>
        child.nodeId === "greek_letter_match" &&
        child.scenePath === "content/scenes/archie/greek_letter_match.json"
    ),
    true
  );
  assert.equal(
    applicationsScene.objects.some(
      (object) =>
        object.id === "greek_letter_match" &&
        object.labelTitle === "It's Greek to Me!" &&
        object.labelSubtitle === "Alpha to Omega"
    ),
    true
  );
});

test("Braid Search keeps its direct developer route without public Applications discovery", () => {
  const applicationsScene = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const braidSearchScene = JSON.parse(readRepoFile("content/scenes/archie/braid_search.json"));

  assert.equal(braidSearchScene.scene.id, "braid-search");
  assert.equal(braidSearchScene.scene.title, "Braid Search");
  assert.equal(
    applicationsScene.scene.children.some(
      (child) =>
        child.nodeId === "braid_search" &&
        child.scenePath === "content/scenes/archie/braid_search.json"
    ),
    false
  );
  assert.equal(
    applicationsScene.objects.some(
      (object) =>
        object.id === "braid_search" &&
        object.labelTitle === "Braid Search"
    ),
    false
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/braid_search.json"),
    "braid-search.html"
  );
  assert.equal(
    isPublicProductSceneSearchEntry({
      id: "braid-search",
      path: "content/scenes/archie/braid_search.json",
    }),
    false,
  );
  assert.equal(
    isPublicProductSceneSearchEntry({
      id: "equation-mapping",
      path: "content/scenes/archie/equation_mapping.json",
    }),
    true,
  );
  assert.equal(
    isPublicProductSceneSearchEntry({
      id: "archie__website_stats",
      path: "content/scenes/archie/website_stats.json",
    }),
    false,
  );
});

test("pdgedit scene no longer resolves to a standalone app path from the main webapp", () => {
  assert.equal(getStandaloneAppPathForScene("pdgedit"), null);
});

test("Lorentz Geometry display name preserves the ideal-braid scene and route contracts", () => {
  const applicationsScene = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  assert.equal(
    applicationsScene.objects.find((object) => object.id === "ideal_braid")?.labelTitle,
    "Lorentz Geometry"
  );
  assert.equal(getStandaloneAppPathForScene("archie__ideal_braid"), "ideal-braid.html");
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "archie__ideal_braid",
      "http://127.0.0.1:5174/index.html#scene=content/scenes/archie/ideal_braid.json"
    ),
    "http://127.0.0.1:5174/ideal-braid.html"
  );
});

test("Molecule scene ids and paths resolve to the standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene("molecule"), "molecule.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/molecule.json"),
    "molecule.html"
  );
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/chemistry/molecule.json"),
    "molecule.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/chemistry/molecule.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Fchemistry%2Fmolecule.json"
    ),
    "http://127.0.0.1:5173/molecule.html"
  );
});

test("Website Statistics keeps its direct operations route without public search discovery", () => {
  assert.equal(getStandaloneAppPathForScene("archie__website_stats"), "website-stats.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/website_stats.json"),
    "website-stats.html"
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "archie__website_stats",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fwebsite_stats.json"
    ),
    "http://127.0.0.1:5173/website-stats.html"
  );
  assert.equal(
    isPublicProductSceneSearchEntry({
      id: "archie__website_stats",
      path: "content/scenes/archie/website_stats.json",
    }),
    false
  );
});

test("unknown scene ids do not resolve to a standalone app path", () => {
  assert.equal(getStandaloneAppPathForScene(""), null);
  assert.equal(getStandaloneAppPathForScene("pdgedit"), null);
  assert.equal(getStandaloneAppPathForScene("pdgsolve"), null);
  assert.equal(getStandaloneAppPathForScene("not_a_scene"), null);
});

test("archived PDG edit scenes no longer resolve to standalone launch hrefs from the main webapp", () => {
  assert.equal(
    resolveStandaloneAppHrefForScene("pdgedit", "http://127.0.0.1:5173/index.html"),
    null
  );
});

test("standalone app entrypoints stay outside root app.js", () => {
  const rootEntrypoint = readRepoFile("app.js").trim();
  const architrinoSceneRuntime = readRepoFile(
    "src/apps/architrino/ArchitrinoSceneAppRuntime.js"
  );
  const animatorEntrypoint = readRepoFile("src/apps/animator/main.js");
  const pdgeditEntrypoint = readRepoFile("src/apps/pdgedit/main.js");

  assert.match(
    rootEntrypoint,
    /^import "\.\/src\/apps\/architrino\/ArchitrinoSceneAppRuntime\.js(?:\?[^"]*)?";$/
  );
  assert.equal(
    architrinoSceneRuntime.includes("createAnimatorDelayedHitsFromSolverRecords"),
    true
  );
  assert.equal(
    architrinoSceneRuntime.includes("createAnimatorDelayedHitsFromSolverRows"),
    false
  );
  assert.equal(animatorEntrypoint.includes("../../../app.js"), false);
  assert.equal(animatorEntrypoint.includes("../architrino/ArchitrinoSceneAppRuntime.js"), true);
  assert.equal(pdgeditEntrypoint.includes("../../../app.js"), false);
});
