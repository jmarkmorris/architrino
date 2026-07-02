import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("work-in-progress public app scenes resolve to standalone app paths", () => {
  assert.equal(getStandaloneAppPathForScene("assembly-explorer"), "assembly-explorer.html");
  assert.equal(getStandaloneAppPathForScene("causal-delay-feedback"), "causal-delay-feedback.html");
  assert.equal(getStandaloneAppPathForScene("equation-mapping"), "equation-mapping.html");
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
  const animatorEntrypoint = readRepoFile("src/apps/animator/main.js");
  const pdgeditEntrypoint = readRepoFile("src/apps/pdgedit/main.js");

  assert.match(
    rootEntrypoint,
    /^import "\.\/src\/apps\/architrino\/ArchitrinoSceneAppRuntime\.js(?:\?[^"]*)?";$/
  );
  assert.equal(animatorEntrypoint.includes("../../../app.js"), false);
  assert.equal(animatorEntrypoint.includes("../architrino/ArchitrinoSceneAppRuntime.js"), true);
  assert.equal(pdgeditEntrypoint.includes("../../../app.js"), false);
});
