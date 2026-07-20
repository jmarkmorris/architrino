import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";
import {
  APPLICATIONS_SCENE_PATH,
  STANDALONE_APP_HOME_HREF,
  STANDALONE_APP_HOME_RETURN_STORAGE_KEY,
  consumeStandaloneAppHomeReturn,
  navigateStandaloneAppHome,
  recordStandaloneAppHomeReturn,
  resolveStandaloneAppHomeHref,
} from "../src/apps/navigator/StandaloneAppHomeRuntime.js";

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

test("work-in-progress public app scenes resolve to standalone app paths", () => {
  assert.equal(getStandaloneAppPathForScene("assembly-explorer"), "assembly-explorer.html");
  assert.equal(getStandaloneAppPathForScene("causal-delay-feedback"), "causal-delay-feedback.html");
  assert.equal(getStandaloneAppPathForScene("equation-mapping"), "equation-mapping.html");
  assert.equal(getStandaloneAppPathForScene("greek-letter-match"), "greek-letter-match.html");
  assert.equal(getStandaloneAppPathForScene("animator"), "animator.html");
  assert.equal(getStandaloneAppPathForScene("borg"), "borg.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/assembly_explorer.json"),
    "assembly-explorer.html"
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
  assert.equal(getStandaloneAppPathForScene("content/scenes/archie/animator.json"), "animator.html");
  assert.equal(getStandaloneAppPathForScene("content/scenes/archie/borg.json"), "borg.html");
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/assembly_explorer.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Fassembly_explorer.json"
    ),
    "http://127.0.0.1:5173/assembly-explorer.html"
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
    "http://127.0.0.1:5173/borg.html"
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
    "src/apps/assembly-explorer/AssemblyConfigurationExplorerRuntime.js",
    "src/apps/equation-mapping/EquationMappingRuntime.js",
    "src/apps/photon/PhotonRuntime.js",
    "src/apps/molecule/MoleculeRuntime.js",
    "src/apps/website-stats/WebsiteStatsRuntime.js",
    "src/apps/animator/AnimatorAppModeRuntime.js",
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

test("Applications scene exposes Equation Mapping as a standalone app scene", () => {
  const applicationsScene = JSON.parse(readRepoFile("content/scenes/archie/applications.json"));
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
  const applicationsScene = JSON.parse(readRepoFile("content/scenes/archie/applications.json"));
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

test("pdgedit scene no longer resolves to a standalone app path from the main webapp", () => {
  assert.equal(getStandaloneAppPathForScene("pdgedit"), null);
});

test("Ideal Braid scene resolves to the standalone app path", () => {
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

test("Website Stats scene resolves to the standalone app path", () => {
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
