import test from "node:test";
import assert from "node:assert/strict";

import {
  createPdgLiveArtifactRuntime,
  isPdgLiveArtifactRequestPath,
  isPdgLiveArtifactSourcePath,
} from "../scripts/dev/PdgLiveArtifactRuntime.mjs";

test("PDG live artifact runtime recognizes generated request paths", () => {
  assert.equal(isPdgLiveArtifactRequestPath("/.tmp/pdgsolve/pdgedit/manifest.v1.json"), true);
  assert.equal(isPdgLiveArtifactRequestPath("/stats/pdgfeed.summary.pdg_reactions.md"), true);
  assert.equal(
    isPdgLiveArtifactRequestPath(
      "/content/contracts/examples/pdg/v1/generated/supported_reaction_primitive_deltas.v1.csv"
    ),
    true
  );
  assert.equal(isPdgLiveArtifactRequestPath("/index.html"), false);
});

test("PDG live artifact runtime recognizes source paths that invalidate generated artifacts", () => {
  assert.equal(isPdgLiveArtifactSourcePath("scripts/pdg/pdgfeed_runtime.py"), true);
  assert.equal(isPdgLiveArtifactSourcePath("src/apps/pdgedit/PdgeditAppRuntime.js"), true);
  assert.equal(isPdgLiveArtifactSourcePath("README.md"), false);
});

test("PDG live artifact runtime refreshes once until a relevant source change marks outputs dirty again", async () => {
  const refreshCalls = [];
  const runtime = createPdgLiveArtifactRuntime({
    watchRelativePaths: [],
    refreshDebounceMs: 1_000,
    execFileImpl(_command, _args, _options, callback) {
      refreshCalls.push("refresh");
      callback(null, "stats/pdgfeed.summary.pdg_reactions.md\n", "");
    },
  });

  await runtime.ensureFreshForRequest("/stats/pdgfeed.summary.pdg_reactions.md");
  await runtime.ensureFreshForRequest("/stats/pdgfeed.summary.pdg_reactions.md");
  assert.equal(refreshCalls.length, 1);

  assert.equal(runtime.handleSourcePathChange("scripts/pdg/pdgfeed_runtime.py"), true);
  await runtime.ensureFreshForRequest("/stats/pdgfeed.summary.pdg_reactions.md");
  assert.equal(refreshCalls.length, 2);

  await runtime.ensureFreshForRequest("/index.html");
  assert.equal(refreshCalls.length, 2);

  runtime.close();
});
