import test from "node:test";
import assert from "node:assert/strict";

// The causal-delay-feedback app replays recorded EOM datasets only. These
// tests pin the EOM replay adapter contract.
import {
  EOM_REPLAY_ADAPTER,
  EOM_REPLAY_DATASET_SOURCE,
  createCausalDelayFeedbackEomReplayAdapter,
  normalizeCausalDelayFeedbackEomReplay,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackEomReplayAdapter.js";
import {
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
import {
  EOM_EVOLUTION_CONTRACT_ID,
  createEomHistoryDataset,
} from "../src/apps/shared/EomHistoryDataset.mjs";

const SPACE_MARGIN = (TIME_AXIS_BASELINE_Y - SPACE_AXIS_TOP_Y) * 0.06;
const CANVAS_TOP = SPACE_AXIS_TOP_Y + SPACE_MARGIN;
const CANVAS_BOTTOM = TIME_AXIS_BASELINE_Y - SPACE_MARGIN;

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

function createEomRecordFixture(overrides = {}) {
  return {
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    runId: "cdf-eom-fixture-run",
    claimLevel: "evolved-record",
    evidenceStatus: "canonical",
    absoluteTimeInterval: { start: "0", end: "2" },
    provenance: { engineId: "eom-solver" },
    histories: [
      {
        pathId: "10",
        pathKey: 10,
        charge: "1",
        stateFlags: 1,
        coverageStart: "0",
        coverageEnd: "2",
        segments: [inertialSegment(0, 2, [5, 2, 0], [0, 0.5, 0])],
      },
      {
        pathId: "20",
        pathKey: 20,
        charge: "-1",
        stateFlags: 2,
        coverageStart: "0",
        coverageEnd: "2",
        segments: [inertialSegment(0, 2, [5, 0, 0], [0, 0.5, 0])],
      },
    ],
    ...overrides,
  };
}

test("eom replay adapter normalizes a recorded dataset into the runtime replay shape", async () => {
  const adapter = createCausalDelayFeedbackEomReplayAdapter({
    record: createEomRecordFixture(),
  });
  assert.equal(adapter.id, EOM_REPLAY_ADAPTER);

  const dataset = await adapter.createReplayAsync({
    presetId: "accepted_tight_bright",
    requestOptions: { frameCount: 5 },
  });

  assert.equal(dataset.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.runId, "cdf-eom-fixture-run");
  assert.equal(dataset.engineId, "eom-solver");
  assert.equal(dataset.claimGrade, "evolved-record");
  assert.equal(dataset.eomProvenance.claimGrade, "evolved-record");
  assert.equal(dataset.eomProvenance.evidenceStatus, "canonical");
  assert.equal(dataset.eomWorldlineRoles.positrino, "10");
  assert.equal(dataset.eomWorldlineRoles.electrino, "20");
  assert.equal(dataset.preset.id, "accepted_tight_bright");
  assert.deepEqual(dataset.wakeLinks, []);

  assert.equal(dataset.paths.positrino.length, 5);
  assert.equal(dataset.paths.electrino.length, 5);
  assert.equal(dataset.frames.length, 5);
  assert.equal(dataset.frames[0].t, 0);
  assert.equal(dataset.frames.at(-1).t, 1);
  assert.equal(dataset.frames[2].positrino, dataset.paths.positrino[2]);

  // Time maps linearly onto the canvas time axis.
  assert.ok(Math.abs(dataset.paths.positrino[0].x - PATH_TIME_START_X) < 1e-9);
  assert.ok(Math.abs(dataset.paths.positrino.at(-1).x - PATH_TIME_END_X) < 1e-9);

  // The varying record axis is y; recorded space extremes hit the fitted band.
  // Positrino spans y in [2, 3] (max at end), electrino [0, 1]; global max 3 → canvas top.
  assert.ok(Math.abs(dataset.paths.positrino.at(-1).y - CANVAS_TOP) < 1e-6);
  assert.ok(Math.abs(dataset.paths.electrino[0].y - CANVAS_BOTTOM) < 1e-6);
  assert.equal(dataset.displayProjection.rule, "time_space_canvas_fit/v1");
  assert.equal(dataset.displayProjection.spaceAxis, "y");

  assert.equal(dataset.initialConditions.positrino.polarity, "positive");
  assert.equal(dataset.initialConditions.electrino.polarity, "negative");
  assert.equal(dataset.initialConditions.positrino.ax, 0);
});

test("eom replay retained-history points span the trail with mock-compatible semantics", async () => {
  const adapter = createCausalDelayFeedbackEomReplayAdapter({
    record: createEomRecordFixture(),
  });
  const dataset = await adapter.createReplayAsync({
    requestOptions: { frameCount: 9, historyDepth: 4 },
  });

  const points = dataset.history.positrino;
  assert.equal(points.length, 4);
  assert.equal(points[0].state, "older");
  assert.equal(points.at(-1).state, "newer");
  assert.equal(points[1].state, "active");
  assert.equal(points[0].depth, 1);
  assert.equal(points.at(-1).depth, 4);
  assert.equal(points.at(-1).weight, 1);
  assert.equal(points[0].t, 0);
  assert.equal(points.at(-1).t, 1);
  assert.equal(points[0].kind, "positrino");
  assert.equal(dataset.history.electrino.at(-1).kind, "electrino");
});

test("eom replay adapter honors explicit worldline role overrides", async () => {
  const record = createEomRecordFixture();
  const adapter = createCausalDelayFeedbackEomReplayAdapter({ record });
  const dataset = await adapter.createReplayAsync({
    requestOptions: {
      frameCount: 3,
      positrinoWorldlineId: "10",
      electrinoWorldlineId: "20",
      spaceAxis: "y",
    },
  });
  assert.equal(dataset.eomWorldlineRoles.positrino, "10");
  assert.equal(dataset.displayProjection.spaceAxis, "y");
});

test("eom replay adapter fails closed without both polarities", async () => {
  const record = createEomRecordFixture();
  record.histories = [record.histories[0]];
  const adapter = createCausalDelayFeedbackEomReplayAdapter({ record });
  await assert.rejects(
    adapter.createReplayAsync({}),
    /one positive-polarity and one negative-polarity worldline/,
  );
});

test("eom replay adapter fails closed without a record", async () => {
  const adapter = createCausalDelayFeedbackEomReplayAdapter({});
  await assert.rejects(
    adapter.createReplayAsync({}),
    /requires a recorded eom_evolution_contract\/v0 dataset/,
  );
});

test("eom replay adapter rejects canvas-edit recompute requests", async () => {
  const adapter = createCausalDelayFeedbackEomReplayAdapter({
    record: createEomRecordFixture(),
  });
  await assert.rejects(
    adapter.createReplayAsync({
      requestOptions: {
        replayDataset: { draftPreview: { reason: "path_line_drag_preview" } },
      },
    }),
    /recorded solver output; canvas edits cannot be recomputed/,
  );
});

test("eom replay adapter resolves records through an async loader", async () => {
  let loaderCalls = 0;
  const adapter = createCausalDelayFeedbackEomReplayAdapter({
    async loadEomRecord(context) {
      loaderCalls += 1;
      assert.equal(context.presetId, "thin_fronts");
      return createEomRecordFixture();
    },
  });
  const dataset = await adapter.createReplayAsync({
    presetId: "thin_fronts",
    requestOptions: { frameCount: 3 },
  });
  assert.equal(loaderCalls, 1);
  assert.equal(dataset.preset.id, "thin_fronts");
});

test("shared EOM history dataset fails closed on foreign contract ids", () => {
  assert.throws(
    () => createEomHistoryDataset(createEomRecordFixture({ contractId: "solver-app-bridge/v2" })),
    /requires contractId eom_evolution_contract\/v0/,
  );
});

test("shared EOM history dataset fails closed without a claim grade", () => {
  const record = createEomRecordFixture();
  delete record.claimLevel;
  assert.throws(() => createEomHistoryDataset(record), /claim grade/);
});

test("shared EOM history dataset fails closed on non-contiguous segments", () => {
  const record = createEomRecordFixture();
  record.histories[0].segments = [
    inertialSegment(0, 0.5, [5, 2, 0], [0, 0.5, 0]),
    inertialSegment(0.75, 2, [5, 2.375, 0], [0, 0.5, 0]),
  ];
  assert.throws(() => createEomHistoryDataset(record), /not contiguous/);
});

test("shared EOM history dataset refuses evaluation outside recorded coverage", () => {
  const dataset = createEomHistoryDataset(createEomRecordFixture());
  assert.throws(() => dataset.evaluateWorldline("10", 5), /does not cover display time/);
  const state = dataset.evaluateWorldline("10", 2);
  assert.ok(Math.abs(state.position.y - 3) < 1e-12);
  assert.ok(Math.abs(state.velocity.y - 0.5) < 1e-12);
});

test("normalizeCausalDelayFeedbackEomReplay accepts a pre-built shared dataset", () => {
  const shared = createEomHistoryDataset(createEomRecordFixture());
  const dataset = normalizeCausalDelayFeedbackEomReplay(shared, {
    requestOptions: { frameCount: 3 },
  });
  assert.equal(dataset.datasetSource, EOM_REPLAY_DATASET_SOURCE);
  assert.equal(dataset.frames.length, 3);
});
