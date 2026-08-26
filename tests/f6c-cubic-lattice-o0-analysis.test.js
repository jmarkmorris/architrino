import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  analyzeO0Directory,
  analyzeO0ReleaseDirectory,
  analyzeO0ReplicationLadder,
} from "../scripts/mapping-electromagnetism/f6c-cubic-lattice-o0-analysis.mjs";

function writeJsonLines(filePath, rows) {
  fs.writeFileSync(filePath, `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`);
}

test("O0 analyzer rejects a finite crop when one sublattice splits", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "f6c-o0-analysis-"));
  const ids = ["g000+", "g001-", "g010-", "g011+", "g100-", "g101+", "g110+", "g111-"];
  fs.writeFileSync(path.join(directory, "run-manifest.json"), JSON.stringify({
    runId: "fixture",
    seedFamily: "f6c-cubic-lattice-o0-v1",
    population: 8,
    status: "running",
    acceptedEndTime: "0.1",
    requestedEndTime: 2 * Math.PI,
    releaseRootClearance: "certified_complete",
    modelFingerprint: "fixture-model",
    seeds: ids.map((pathId) => ({ pathId })),
    f6cCubicLatticeCoordinate: {
      spacing: 1,
      boundaryStatus: "finite_replicated_diagnostic",
    },
  }));
  fs.writeFileSync(path.join(directory, "release-acceleration.json"), JSON.stringify({
    status: "certified_complete",
    rootCertificates: Array.from({ length: 64 }, () => ({
      status: "certified_complete",
    })),
  }));
  writeJsonLines(path.join(directory, "census.jsonl"), [{
    time: "0.1",
    maxSpeed: 0.06,
    minPairDistanceInChunk: 0.89,
    engine: {
      status: "completed",
      rejectedSteps: 0,
      minimumTransmitterFactorMagnitude: 0.95,
      maximumRootMultiplicity: 1,
    },
  }]);
  const frames = ids.flatMap((pathId, index) => {
    const digits = /^g([01])([01])([01])/u.exec(pathId).slice(1).map(Number);
    const position = digits.map((value) => value - 0.5);
    const polarity = pathId.endsWith("+") ? 1 : -1;
    position[0] += polarity * 0.05;
    if (pathId === "g011+") position[2] += 1e-3;
    return [{
      pathKey: index + 1,
      frameIndex: 1,
      time: 0.1,
      position: { x: position[0], y: position[1], z: position[2] },
    }];
  });
  writeJsonLines(path.join(directory, "frames.jsonl"), frames);

  const result = analyzeO0Directory(directory);
  assert.equal(result.decision, "background_rejected");
  assert.equal(result.guards.translationSublatticeSymmetry, false);
  assert.equal(
    result.onePeriodHistoryReturn,
    "not_evaluated_background_rejected_before_period",
  );
  assert.equal(result.responseRows, "not_run");
});

function writeReleaseFixture(side, accelerationScale) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "f6c-o0-release-"));
  const seeds = [];
  const receiverAccelerations = [];
  for (let gx = 0; gx < side; gx += 1) {
    for (let gy = 0; gy < side; gy += 1) {
      for (let gz = 0; gz < side; gz += 1) {
        const polarity = (gx + gy + gz) % 2 === 0 ? "+" : "-";
        const coordinate = side === 2
          ? `${gx}${gy}${gz}`
          : `${gx}_${gy}_${gz}`;
        const pathId = `g${coordinate}${polarity}`;
        seeds.push({ pathId });
        const value = accelerationScale * (gx - (side - 1) / 2);
        receiverAccelerations.push({
          pathId,
          acceleration: [
            { lower: value - 1e-12, upper: value + 1e-12 },
            { lower: -1e-12, upper: 1e-12 },
            { lower: -1e-12, upper: 1e-12 },
          ],
        });
      }
    }
  }
  const population = side ** 3;
  fs.writeFileSync(path.join(directory, "run-manifest.json"), JSON.stringify({
    runId: `fixture-n${side}`,
    seedFamily: "f6c-cubic-lattice-o0-v1",
    population,
    modelFingerprint: "fixture-model",
    seeds,
    f6cCubicLatticeCoordinate: {
      spacing: 1,
      latticeSide: side,
      boundaryStatus: "finite_replicated_diagnostic",
    },
  }));
  fs.writeFileSync(path.join(directory, "release-acceleration.json"), JSON.stringify({
    status: "certified_complete",
    minimumTransmitterFactorMagnitude: 0.9,
    rootCertificates: Array.from({ length: population ** 2 }, () => ({
      status: "certified_complete",
    })),
    receiverAccelerations,
  }));
  return directory;
}

test("release analyzer certifies central-core acceleration splitting", () => {
  const directory = writeReleaseFixture(4, 1e-3);
  const result = analyzeO0ReleaseDirectory(directory);
  assert.equal(result.latticeSide, 4);
  assert.equal(result.releaseRootRows, 4096);
  assert.equal(result.decision, "release_split_certified");
  assert.ok(
    result.measurements.centralCoreNormalizedAccelerationLeakageLower > 1e-4,
  );
});

test("replication ladder keeps finite suppression separate from removal", () => {
  const directories = [
    writeReleaseFixture(2, 3e-3),
    writeReleaseFixture(4, 2e-3),
    writeReleaseFixture(6, 1e-3),
  ];
  const result = analyzeO0ReplicationLadder(directories);
  assert.equal(result.complete, true);
  assert.equal(result.boundedBoundarySuppressionTrend, true);
  assert.equal(result.decision, "declared_ladder_did_not_remove_release_split");
  assert.equal(result.infiniteMediumClaim, "excluded_no_exterior_tail_envelope");
  assert.equal(result.responseRows, "not_run");
});
