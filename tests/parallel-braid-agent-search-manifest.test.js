import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildParallelBraidAgentLaunchPlan,
  validateParallelBraidAgentSearchManifest,
  writeLaunchPlanOnce,
} from "../src/prescribed-path-analysis/ParallelBraidAgentSearch.mjs";
import {
  DEFAULT_MANIFEST_PATH,
  checkParallelBraidAgentSearch,
  readParallelBraidAgentSearchManifest,
} from "../scripts/eom/prepare-parallel-braid-agent-search.mjs";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("parallel braid manifest binds current sources and exposes only H1/H2 search", () => {
  const result = checkParallelBraidAgentSearch();
  assert.equal(result.readyLaneCount, 10);
  assert.equal(result.dependencyGatedLaneCount, 2);
  assert.equal(result.waveCount, 2);
  assert.deepEqual(
    result.waves.map((wave) => [wave.agentCount, wave.aggregateWorkerThreads]),
    [[8, 6], [2, 2]],
  );
});

test("launch plan gives every ready lane a unique report-only prompt and output", () => {
  const manifest = readParallelBraidAgentSearchManifest();
  const plan = buildParallelBraidAgentLaunchPlan(manifest);
  const lanes = plan.waves.flatMap((wave) => wave.lanes);
  assert.equal(new Set(lanes.map((lane) => lane.laneId)).size, lanes.length);
  assert.equal(
    new Set(lanes.map((lane) => lane.outputDirectory)).size,
    lanes.length,
  );
  assert.equal(
    lanes.every((lane) =>
      lane.prompt.includes("Do not run H3 root search") &&
      lane.prompt.includes("Do not edit repository files") &&
      lane.prompt.includes("Missing output is incomplete coverage")),
    true,
  );
});

test("manifest rejects unit drift, output collision, and premature H3 readiness", () => {
  const manifest = readParallelBraidAgentSearchManifest();
  const unitDrift = clone(manifest);
  unitDrift.normalizedUnits.fieldSpeed = 4;
  assert.throws(
    () => validateParallelBraidAgentSearchManifest(unitDrift, { verifyFiles: false }),
    /normalized c_f=1/u,
  );

  const collision = clone(manifest);
  collision.lanes[1].outputDirectory = collision.lanes[0].outputDirectory;
  assert.throws(
    () => validateParallelBraidAgentSearchManifest(collision, { verifyFiles: false }),
    /unique campaign output directory|reuses output directory/u,
  );

  const premature = clone(manifest);
  premature.lanes.find((lane) => lane.laneId === "f5-h3-root-restart").status = "ready";
  assert.throws(
    () => validateParallelBraidAgentSearchManifest(premature, { verifyFiles: false }),
    /ready but has unresolved dependencies/u,
  );
});

test("launch plan publication is create-exclusive", () => {
  const manifest = JSON.parse(readFileSync(DEFAULT_MANIFEST_PATH, "utf8"));
  const plan = buildParallelBraidAgentLaunchPlan(manifest);
  const directory = mkdtempSync(path.join(tmpdir(), "parallel-braid-plan-"));
  const output = path.join(directory, "launch-plan.v1.json");
  assert.equal(writeLaunchPlanOnce(output, plan), output);
  assert.throws(() => writeLaunchPlanOnce(output, plan), /already exists/u);
});

test("compact Monte Carlo CLI rejects shared or missing output paths before work", () => {
  const missing = spawnSync(
    process.execPath,
    ["scripts/eom/run-compact-monte-carlo.mjs", "--members", "A1"],
    { cwd: process.cwd(), encoding: "utf8" },
  );
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /--output is required/u);

  const directory = mkdtempSync(path.join(tmpdir(), "compact-output-"));
  const existing = path.join(directory, "result.json");
  writeLaunchPlanOnce(existing, { occupied: true });
  const collision = spawnSync(
    process.execPath,
    [
      "scripts/eom/run-compact-monte-carlo.mjs",
      "--members", "A1",
      "--output", existing,
    ],
    { cwd: process.cwd(), encoding: "utf8" },
  );
  assert.notEqual(collision.status, 0);
  assert.match(collision.stderr, /already exists/u);
});
