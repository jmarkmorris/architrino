import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  analyzeAdaptiveSiteLocalReleaseDirectory,
  analyzeAdaptiveSiteLocalReleaseLadder,
} from "../scripts/mapping-electromagnetism/adaptive-cubic-site-local-release-analysis.mjs";

function localFrame(gx, gy, gz) {
  const sx = gx % 2 === 0 ? 1 : -1;
  const sy = gy % 2 === 0 ? 1 : -1;
  const sz = gz % 2 === 0 ? 1 : -1;
  return {
    frameP: [sy / Math.sqrt(2), -sx / Math.sqrt(2), 0],
    frameQ: [sx * sz / Math.sqrt(6), sy * sz / Math.sqrt(6), -2 / Math.sqrt(6)],
    frameNormal: [sx / Math.sqrt(3), sy / Math.sqrt(3), sz / Math.sqrt(3)],
  };
}

function writeFixture(side, residual) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "site-local-release-"));
  const seeds = [];
  const receiverAccelerations = [];
  for (let gx = 0; gx < side; gx += 1) {
    for (let gy = 0; gy < side; gy += 1) {
      for (let gz = 0; gz < side; gz += 1) {
        const positive = (gx + gy + gz) % 2 === 0;
        const coordinate = side === 2
          ? `${gx}${gy}${gz}`
          : `${gx}_${gy}_${gz}`;
        const pathId = `g${coordinate}${positive ? "+" : "-"}`;
        const frame = localFrame(gx, gy, gz);
        const phase = positive ? 0 : Math.PI;
        const expected = frame.frameP.map((value, axis) =>
          -0.05 * (value * Math.cos(phase) +
            frame.frameQ[axis] * Math.sin(phase)));
        seeds.push({ pathId, phase, ...frame });
        receiverAccelerations.push({
          pathId,
          acceleration: expected.map((value, axis) => ({
            lower: value + (axis === 0 ? residual : 0) - 1e-13,
            upper: value + (axis === 0 ? residual : 0) + 1e-13,
          })),
        });
      }
    }
  }
  const population = side ** 3;
  fs.writeFileSync(path.join(directory, "run-manifest.json"), JSON.stringify({
    runId: `site-local-n${side}`,
    modelFingerprint: "fixture",
    seedFamily: "f6c-cubic-site-local-v1",
    population,
    adaptiveCubicMediumCoordinate: {
      spacing: 1,
      orbitRadius: 0.05,
      angularRate: 1,
      orientationField: "tetrahedral-parity-v1",
      boundaryStatus: "finite_replicated_diagnostic",
      latticeSide: side,
    },
    seeds,
  }));
  fs.writeFileSync(path.join(directory, "release-acceleration.json"), JSON.stringify({
    schema: "f6c_cubic_site_local_release_acceleration/v0",
    status: "certified_complete",
    minimumTransmitterFactorMagnitude: 0.9,
    rootCertificates: Array.from({ length: population ** 2 }, () => ({
      status: "certified_complete",
    })),
    receiverAccelerations,
  }));
  return directory;
}

test("site-local analyzer certifies the exact second-rank orientation census", () => {
  const result = analyzeAdaptiveSiteLocalReleaseDirectory(writeFixture(2, 0));
  assert.equal(result.guards.exactSecondRankOrientationCensus, true);
  assert.ok(result.measurements.maximumOrientationSecondMomentError < 1e-15);
  assert.equal(result.decision, "site_local_circular_release_match_certified");
});

test("site-local analyzer rejects a certified nonzero EOM release residual", () => {
  const result = analyzeAdaptiveSiteLocalReleaseDirectory(writeFixture(4, 1e-3));
  assert.equal(result.decision, "site_local_circular_history_rejected_at_release");
  assert.ok(result.measurements.maximumNormalizedReleaseResidualLower > 9e-4);
  assert.equal(result.propagationRows, "not_run");
  assert.equal(result.physicalReceiverRows, "not_run");
});

test("site-local ladder requires every declared rung before adjudication", () => {
  const incomplete = analyzeAdaptiveSiteLocalReleaseLadder([
    writeFixture(2, 1e-3),
    writeFixture(4, 1e-3),
  ]);
  assert.equal(incomplete.decision, "declared_ladder_incomplete");
  const complete = analyzeAdaptiveSiteLocalReleaseLadder([
    writeFixture(2, 1e-3),
    writeFixture(4, 1e-3),
    writeFixture(6, 1e-3),
  ]);
  assert.equal(
    complete.decision,
    "site_local_circular_history_rejected_across_declared_ladder",
  );
});
