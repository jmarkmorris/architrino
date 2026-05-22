import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  ARTIFACT_SCHEMA,
  buildArtifact,
  orderedDistinctPairs,
  validateArtifact,
} from "../scripts/neutral-swarm/finite-mode-artifact.mjs";

test("neutral swarm finite-mode artifact records six neutral sites and all ordered distinct pairs", () => {
  const artifact = buildArtifact();
  const errors = validateArtifact(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-swarm-finite-mode-artifact/v1");
  assert.equal(artifact.packet_id, "neutral_swarm_finite_mode_search");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.site_inventory.sites.length, 6);
  assert.deepEqual(artifact.site_inventory.polarity_balance, {
    positive: 3,
    negative: 3,
    q_core_units: 0,
  });
  assert.equal(artifact.branch_scope.pair_policy.ordered_distinct_pairs.length, 30);
  assert.equal(new Set(artifact.branch_scope.pair_policy.ordered_distinct_pairs.map((pair) => `${pair.receiver}->${pair.source}`)).size, 30);
  assert.equal(artifact.branch_scope.pair_policy.ordered_distinct_pairs.every((pair) => pair.receiver !== pair.source), true);
  assert.equal(artifact.result.search, "search_open");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("neutral swarm finite-mode ordered-pair helper is deterministic", () => {
  assert.deepEqual(
    orderedDistinctPairs().slice(0, 6),
    [
      { receiver: 1, source: 2, force_sign: 1, source_relation: "repulsive" },
      { receiver: 1, source: 3, force_sign: 1, source_relation: "repulsive" },
      { receiver: 1, source: 4, force_sign: -1, source_relation: "attractive" },
      { receiver: 1, source: 5, force_sign: -1, source_relation: "attractive" },
      { receiver: 1, source: 6, force_sign: -1, source_relation: "attractive" },
      { receiver: 2, source: 1, force_sign: 1, source_relation: "repulsive" },
    ]
  );
});

test("neutral swarm finite-mode CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-swarm-artifact-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(new URL("../scripts/neutral-swarm/finite-mode-artifact.mjs", import.meta.url));

  execFileSync(process.execPath, [scriptPath, "--out", artifactPath, "--pretty"], { encoding: "utf8" });

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateArtifact(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.pair_count, 30);
  assert.equal(validation.result.search, "search_open");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, ARTIFACT_SCHEMA.artifact_schema);
});
