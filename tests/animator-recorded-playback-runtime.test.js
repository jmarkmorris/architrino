import test from "node:test";
import assert from "node:assert/strict";

import { summarizeAnimatorRecordedPlayback } from "../src/apps/animator/AnimatorRecordedPlaybackRuntime.js";

test("Animator recorded playback summary states the computation boundary before load", () => {
  const summary = summarizeAnimatorRecordedPlayback({ metadata: {} });
  assert.equal(summary.hasDataset, false);
  assert.deepEqual(summary.rows, [
    ["Recorded output", "none loaded"],
    ["Computation", "Borg / EOM solver only"],
  ]);
});

test("Animator recorded playback summary reports pinned provenance", () => {
  const summary = summarizeAnimatorRecordedPlayback({
    metadata: {
      simulationDataset: {
        kind: "animator.simulation.dataset",
        id: "accepted-output",
        provenance: {
          engineId: "eom-solver",
          engineVersion: "build-v1",
          runId: "run-1",
          claimGrade: "evolved-record",
          evidenceStatus: "canonical",
          recordSha256: "abc123",
        },
        frames: [{ index: 0 }],
        simulation: { halt: { status: "completed" } },
      },
    },
  });

  assert.equal(summary.hasDataset, true);
  assert.deepEqual(summary.rows.find(([label]) => label === "Run"), ["Run", "run-1"]);
  assert.deepEqual(summary.rows.find(([label]) => label === "Status"), ["Status", "completed"]);
});
