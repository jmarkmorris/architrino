import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  buildPreparedRequest,
  buildStationaryHistories,
  summarizeResponse,
} from "../scripts/eom/run-stella-octangula-short-release.mjs";

const staticSpec = JSON.parse(readFileSync(new URL(
  "../reference/priorities/braid-program/configurations/stella-octangula-static-assembly.v3.json",
  import.meta.url,
), "utf8"));

function declaration() {
  return {
    packetId: "stella-octangula-short-release-test-v1",
    scientificConditions: {
      historyStart: "-2",
      releaseTime: "0",
      endTime: "0.01",
      effectiveStrength: "1",
      chargeMagnitude: "1",
      coupling: "1",
    },
    historyEvidence: [{ role: "test-only", path: "fixture.json", sha256: "a".repeat(64) }],
    operationalLimits: {
      wallSeconds: 30,
      heartbeatSeconds: 5,
      aggregateRssBytes: 1073741824,
      rssSampleIntervalSeconds: 1,
      logBytes: 16777216,
      outputBytes: 268435456,
      diskMinimumBytes: 1073741824,
    },
    stoppingRules: {
      maximumCenterResidual: 1e-8,
      maximumTangentialSpeed: 1e-8,
      radialReversalTolerance: 1e-12,
      minimumPairSeparation: 0.55,
    },
  };
}

test("short-release preparation carries eight exact stationary histories and no future", () => {
  const d = declaration();
  const histories = buildStationaryHistories(staticSpec, d);
  assert.equal(histories.length, 8);
  assert.equal(new Set(histories.map((row) => row.sourceFingerprint)).size, 8);
  for (const history of histories) {
    assert.equal(history.segments.length, 1);
    assert.equal(history.segments[0].startTime, "-2");
    assert.equal(history.segments[0].endTime, "0");
    assert.ok(history.segments[0].coefficients.every((axis) =>
      axis.slice(1).every((coefficient) => coefficient === "0")));
  }

  const prepared = buildPreparedRequest(staticSpec, d, {
    id: "fine",
    role: "primary",
    step: "0.0025",
  });
  assert.equal(prepared.status, "mechanically-prepared-not-authorized");
  assert.deepEqual(prepared.transportRequest.absoluteTimeInterval, { start: "0", end: "0.01" });
  assert.equal(prepared.transportRequest.histories.length, 8);
  assert.equal(prepared.transportRequest.modelControls.fieldSpeed, "1");
  assert.equal(prepared.transportRequest.modelControls.coupling, "1");
  assert.equal(prepared.transportRequest.modelControls.futurePathPolicy, "prohibited");
  assert.equal(prepared.transportRequest.numericalControls.initialStep, "0.0025");
  assert.equal(prepared.transportRequest.numericalControls.useAdaptiveStepGrowth, false);
});

test("short-release response summary distinguishes inward radial motion from turning", () => {
  const d = declaration();
  const histories = buildStationaryHistories(staticSpec, d).map((history) => {
    const position = history.segments[0].coefficients.map((axis) => Number(axis[0]));
    return {
      pathId: history.pathId,
      charge: history.polarity,
      stateFlags: 0,
      segments: [
        ...history.segments,
        {
          startTime: "0",
          endTime: "0.01",
          coefficients: position.map((coordinate) => [
            String(coordinate),
            "0",
            String(-2.5219178085318643 * coordinate),
            "0",
          ]),
          positionErrors: ["0", "0", "0"],
          velocityErrors: ["0", "0", "0"],
        },
      ],
    };
  });
  const summary = summarizeResponse({
    status: "completed",
    evidenceStatus: "conditional",
    claimGrade: "measured",
    acceptedEndTime: "0.01",
    acceptedStepCount: 1,
    rejectedStepCount: 0,
    histories,
  }, d);
  assert.equal(summary.stoppingEvent, null);
  assert.ok(summary.finalFrame.maximumRadius < 0.5);
  assert.ok(summary.finalFrame.maximumRadialVelocity < 0);
  assert.ok(summary.finalFrame.maximumTangentialSpeed < 1e-14);
});
