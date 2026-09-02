import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { buildManifest } from "../scripts/prescribed-path-analysis/build-regular-polarity-orbit-manifest.mjs";
import {
  produceKernelArtifact,
  produceProjectionShard,
  reduceProjectionShards,
} from "../scripts/prescribed-path-analysis/run-regular-polarity-shard.mjs";

test("fixed-speed shards consume one kernel and reduce to exact manifest coverage", () => {
  const directory = mkdtempSync(join(tmpdir(), "regular-polarity-shards-"));
  try {
    const manifestPath = join(directory, "manifest.json");
    writeFileSync(manifestPath, `${JSON.stringify(buildManifest({ minimumN: 2, maximumN: 2 }), null, 2)}\n`);
    const kernelPath = join(directory, "kernel.json");
    produceKernelArtifact({ n: 2, beta: 3.070356625390253, out: kernelPath });
    const shardPaths = Array.from({ length: 2 }, (_, index) => {
      const path = join(directory, `shard-${index}.json`);
      produceProjectionShard({ manifestPath, kernelPath, shardCount: 2, shardIndex: index, out: path });
      return path;
    });
    const reductionPath = join(directory, "reduction.json");
    reduceProjectionShards({ manifestPath, kernelPath, shardPaths, out: reductionPath });
    const reduction = JSON.parse(readFileSync(reductionPath));
    assert.deepEqual(reduction.completeness, {
      expectedRepresentatives: 2,
      receivedRepresentatives: 2,
      duplicateRepresentatives: 0,
      missingRepresentatives: 0,
      replayedProjections: 2,
      allPassed: true,
    });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
