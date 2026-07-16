import test from "node:test";
import assert from "node:assert/strict";

import {
  ASSEMBLY_VIEW_RECORD_SCHEMA,
  createEomHistoryDataset,
} from "../src/apps/shared/EomHistoryDataset.mjs";
import {
  convertBorgTrajectoryToAssemblyViewRecord,
} from "../scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs";
import {
  createBorgEomRecordReplayRunner,
} from "../src/apps/borg/BorgEomRecordReplayRunner.js";

function inertialSegment(startTime, endTime, position, velocity) {
  return {
    startTime: String(startTime),
    endTime: String(endTime),
    coefficients: [
      [String(position[0]), String(velocity[0]), "0", "0"],
      [String(position[1]), String(velocity[1]), "0", "0"],
      [String(position[2]), String(velocity[2]), "0", "0"],
    ],
    positionError: "0",
    velocityError: "0",
  };
}

function createAssemblyViewRecordFixture(overrides = {}) {
  return {
    schema: ASSEMBLY_VIEW_RECORD_SCHEMA,
    provenance: {
      engineId: "eom-solver",
      runId: "assembly-view-fixture-run",
      claimGrade: "evolved-record",
      evidenceStatus: "executable_architecture_evidence",
      generatingSpec: "reference/priorities/braid-program/campaigns/example-campaign.md",
      date: "2026-07-16",
    },
    window: { start: 0, end: 2, delayHorizon: 10, sampleInterval: 0.2 },
    worldlines: [
      {
        id: "1",
        pathKey: 1,
        polarity: 1,
        stateFlags: 1,
        coverageStart: "0",
        coverageEnd: "2",
        interpolation: "exact-inertial-polynomial/v1",
        segments: [inertialSegment(0, 2, [1, 2, 3], [0.5, 0, -0.25])],
        samples: [{ t: 0, position: { x: 1, y: 2, z: 3 } }],
      },
      {
        id: "2",
        pathKey: 2,
        polarity: -1,
        stateFlags: 2,
        coverageStart: "0",
        coverageEnd: "2",
        interpolation: "exact-inertial-polynomial/v1",
        segments: [inertialSegment(0, 2, [-1, 0, 0], [0, 0.5, 0])],
      },
    ],
    events: [{ kind: "example-event", time: 1, worldlineId: "1" }],
    ...overrides,
  };
}

function createBorgTrajectoryFixture() {
  // Two paths sampled from exact inertial motion at t = 0, 0.5, 1 so the
  // Hermite reconstruction must reproduce the closed form exactly (an
  // inertial path is a degenerate cubic).
  const rows = [];
  [0, 0.5, 1].forEach((time, frameIndex) => {
    rows.push({
      pathKey: 1,
      frameIndex,
      time,
      position: { x: 1 + 0.5 * time, y: 2, z: 3 - 0.25 * time },
      velocity: { x: 0.5, y: 0, z: -0.25 },
      errorBound: 1e-12,
      stateFlags: 1,
    });
    rows.push({
      pathKey: 2,
      frameIndex,
      time,
      position: { x: -1, y: 0.5 * time, z: 0 },
      velocity: { x: 0, y: 0.5, z: 0 },
      errorBound: 1e-12,
      stateFlags: 2,
    });
  });
  return {
    schema: "borg-fixture-trajectory.v1",
    runId: "harness-demo-run",
    claimLevel: "developer-test",
    recordAuthority: "eom-native-coupled-evolution",
    canonicalEomEvidence: false,
    eomEvidenceStatus: "executable_architecture_evidence",
    sampleInterval: 0.5,
    historyStartTime: 0,
    historyEndTime: 1,
    currentStateFrames: rows,
  };
}

test("shared adapter ingests assembly-view-record.v0 with full provenance", () => {
  const dataset = createEomHistoryDataset(createAssemblyViewRecordFixture());

  assert.equal(dataset.sourceSchema, ASSEMBLY_VIEW_RECORD_SCHEMA);
  assert.equal(dataset.provenance.runId, "assembly-view-fixture-run");
  assert.equal(dataset.provenance.claimGrade, "evolved-record");
  assert.equal(dataset.provenance.evidenceStatus, "executable_architecture_evidence");
  assert.equal(
    dataset.provenance.generatingSpec,
    "reference/priorities/braid-program/campaigns/example-campaign.md",
  );
  assert.equal(dataset.window.start, 0);
  assert.equal(dataset.window.end, 2);
  assert.equal(dataset.window.delayHorizon, 10);
  assert.equal(dataset.worldlines.length, 2);
  assert.equal(dataset.worldlines[0].polarity, 1);
  assert.equal(dataset.worldlines[1].polarity, -1);
  assert.equal(dataset.events.length, 1);
  assert.equal(dataset.worldlines[0].samples.length, 1);

  const state = dataset.evaluateWorldline("1", 2);
  assert.ok(Math.abs(state.position.x - 2) < 1e-12);
  assert.ok(Math.abs(state.position.z - 2.5) < 1e-12);
});

test("assembly-view-record claim grades are the declared enum, fail-closed", () => {
  assert.throws(
    () => createEomHistoryDataset(createAssemblyViewRecordFixture({
      provenance: {
        engineId: "eom-solver",
        runId: "r",
        claimGrade: "solver-derived-diagnostic",
      },
    })),
    /claim grade must be one of chart-hypothesis\|evolved-record/,
  );
});

test("assembly-view-record worldlines without segments fail closed", () => {
  const record = createAssemblyViewRecordFixture();
  record.worldlines[0] = {
    ...record.worldlines[0],
    segments: [],
    samples: [{ t: 0, position: { x: 1, y: 2, z: 3 } }],
  };
  assert.throws(
    () => createEomHistoryDataset(record),
    /lacks retained segments; the state of a delay system is its history/,
  );
});

test("converter turns harness replay files into exact assembly-view records", () => {
  const record = convertBorgTrajectoryToAssemblyViewRecord(createBorgTrajectoryFixture(), {
    generatingSpec: "reference/priorities/eom-attractor-search/priorities.md",
    delayHorizon: 10,
    date: "2026-07-16",
  });

  assert.equal(record.schema, ASSEMBLY_VIEW_RECORD_SCHEMA);
  assert.equal(record.provenance.runId, "harness-demo-run");
  assert.equal(record.provenance.claimGrade, "evolved-record");
  // Conversion inherits, never upgrades, the source evidence status.
  assert.equal(record.provenance.evidenceStatus, "executable_architecture_evidence");
  assert.equal(record.provenance.conversion.sourceSchema, "borg-fixture-trajectory.v1");
  assert.equal(record.provenance.conversion.interpolation, "piecewise-cubic-hermite/v0");
  assert.equal(record.window.start, 0);
  assert.equal(record.window.end, 1);
  assert.equal(record.window.delayHorizon, 10);
  assert.equal(record.worldlines.length, 2);
  assert.equal(record.worldlines[0].polarity, 1);
  assert.equal(record.worldlines[1].polarity, -1);
  assert.equal(record.worldlines[0].segments.length, 2);

  // The record round-trips through the shared adapter, and the Hermite
  // reconstruction reproduces the inertial closed form exactly.
  const dataset = createEomHistoryDataset(record);
  const state = dataset.evaluateWorldline("1", 0.75);
  assert.ok(Math.abs(state.position.x - 1.375) < 1e-12);
  assert.ok(Math.abs(state.position.z - (3 - 0.1875)) < 1e-12);
  assert.ok(Math.abs(state.velocity.x - 0.5) < 1e-12);
});

test("converter fails closed on foreign schemas and undeclared polarity", () => {
  assert.throws(
    () => convertBorgTrajectoryToAssemblyViewRecord({ schema: "other.v1" }),
    /requires a borg-fixture-trajectory\.v1 replay/,
  );
  const undeclaredPolarity = createBorgTrajectoryFixture();
  undeclaredPolarity.currentStateFrames = undeclaredPolarity.currentStateFrames.map((row) => ({
    ...row,
    stateFlags: 0,
  }));
  assert.throws(
    () => convertBorgTrajectoryToAssemblyViewRecord(undeclaredPolarity),
    /requires a declared path polarity/,
  );
});

test("Borg record replay runner plays assembly-view records directly", async () => {
  const record = convertBorgTrajectoryToAssemblyViewRecord(createBorgTrajectoryFixture(), {
    date: "2026-07-16",
  });
  const runner = createBorgEomRecordReplayRunner(record, {
    targetDuration: 1,
    chunkDuration: 1,
    sampleInterval: 0.5,
  });

  assert.equal(runner.config.runId, "harness-demo-run");
  assert.equal(runner.config.claimGrade, "evolved-record");

  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.statusCode, "ok");
  assert.equal(chunk.frames.length, 6);
  const path2Final = chunk.frames.find(
    (frame) => frame.pathKey === 2 && frame.time === 1,
  );
  assert.ok(Math.abs(path2Final.position.y - 0.5) < 1e-12);
  assert.equal(path2Final.stateFlags, 2);
  assert.equal(path2Final.valueAuthority, "recorded-eom-output");
  assert.equal(runner.canComputeNextChunk(), false);

  await runner.dispose();
});
