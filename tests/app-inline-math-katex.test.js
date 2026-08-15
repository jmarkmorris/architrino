import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const REPO_ROOT = new URL("../", import.meta.url);
const APP_PAGES = [
  "causal-delay-feedback.html",
  "lattice-lab.html",
  "topo.html",
  "borg.html",
];
const APP_SOURCES = [
  "src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js",
  "src/apps/causal-delay-feedback/CausalDelayFeedbackRootsMode.js",
  "src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js",
  "src/apps/causal-delay-feedback/CausalDelayFeedbackStoryMode.js",
  "src/apps/lattice-lab/LatticeLabCase.js",
  "src/apps/lattice-lab/LatticeLabLedgerPresentation.js",
  "src/apps/lattice-lab/LatticeLabRuntime.js",
  "src/apps/topo/TopoInteractionContractRuntime.js",
  "src/apps/borg/BorgAppRuntime.js",
  "src/apps/borg/BorgAssemblyViewControls.js",
];

test("audited app pages load the vendored KaTeX runtime", async () => {
  const pages = await Promise.all(
    APP_PAGES.map(async (path) => [
      path,
      await readFile(new URL(path, REPO_ROOT), "utf8"),
    ]),
  );

  pages.forEach(([path, source]) => {
    assert.match(source, /katex\/katex\.min\.css/u, path);
    assert.match(source, /katex\/katex\.min\.js/u, path);
  });
});

test("audited app surfaces contain no Unicode math substitutions", async () => {
  const paths = [...APP_PAGES, ...APP_SOURCES];
  const sources = await Promise.all(
    paths.map(async (path) => [
      path,
      await readFile(new URL(path, REPO_ROOT), "utf8"),
    ]),
  );
  const substitutions = /[\u03b2\u03ba\u0394\u03b5\u1d63\u209c\u2091\u00b2\u00b3\u221a\u27e8\u27e9]|4\u03c0/u;

  sources.forEach(([path, source]) => {
    assert.doesNotMatch(source, substitutions, path);
  });
});
