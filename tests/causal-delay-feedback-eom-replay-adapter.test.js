import test from "node:test";
import assert from "node:assert/strict";

// The causal-delay-feedback app replays recorded EOM datasets only. These
// tests pin the EOM replay adapter contract.
import {
  EOM_REPLAY_ADAPTER,
  EOM_REPLAY_DATASET_SOURCE,
  EOM_REPLAY_MAX_FRAME_COUNT,
  EOM_REPLAY_MAX_HISTORY_DEPTH,
  createCausalDelayFeedbackEomReplayAdapter,
  normalizeCausalDelayFeedbackEomReplay,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackEomReplayAdapter.js";
import {
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackDisplayContract.js";
import {
  createEomHistoryDataset,
} from "../src/apps/shared/EomHistoryDataset.mjs";
import {
  createEomRecordFixture,
  inertialSegment,
} from "./helpers/causal-delay-feedback-eom-fixture.js";

const SPACE_MARGIN = (TIME_AXIS_BASELINE_Y - SPACE_AXIS_TOP_Y) * 0.06;
const CANVAS_TOP = SPACE_AXIS_TOP_Y + SPACE_MARGIN;
const CANVAS_BOTTOM = TIME_AXIS_BASELINE_Y - SPACE_MARGIN;

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
  assert.equal(dataset.runId, "cdf-runtime-eom-fixture");
  assert.equal(dataset.engineId, "eom-solver");
  assert.equal(dataset.claimGrade, "evolved-record");
  assert.equal(dataset.eomProvenance.claimGrade, "evolved-record");
  assert.equal(dataset.eomProvenance.evidenceStatus, "canonical");
  assert.equal(dataset.eomWorldlineRoles.positrino, "10");
  assert.equal(dataset.eomWorldlineRoles.electrino, "20");
  assert.equal(dataset.preset.id, "accepted_tight_bright");
  assert.deepEqual(dataset.wakeLinks, []);
  assert.deepEqual(dataset.causalEvaluation, {
    enabled: false,
    reason: "record_has_no_delayed_hit_rows",
  });
  assert.equal(dataset.physicalPaths.positrino[0].t, 0);
  assert.equal(dataset.physicalPaths.positrino.at(-1).t, 2);
  assert.equal(dataset.physicalPaths.positrino[0].y, 2);
  assert.equal(dataset.physicalPaths.positrino.at(-1).y, 3);

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

test("eom replay adapter rejects ambiguous automatic worldline roles", async () => {
  const record = createEomRecordFixture();
  record.histories.push({
    ...record.histories[0],
    pathId: "30",
    pathKey: 30,
  });
  const adapter = createCausalDelayFeedbackEomReplayAdapter({ record });
  await assert.rejects(
    adapter.createReplayAsync({}),
    /exactly one positive-polarity and one negative-polarity/u,
  );
});

test("eom replay adapter validates explicit role polarity and identity", async () => {
  const adapter = createCausalDelayFeedbackEomReplayAdapter({
    record: createEomRecordFixture(),
  });
  await assert.rejects(
    adapter.createReplayAsync({
      requestOptions: {
        positrinoWorldlineId: "20",
        electrinoWorldlineId: "10",
      },
    }),
    /role overrides must select positive polarity/u,
  );
  await assert.rejects(
    adapter.createReplayAsync({
      requestOptions: {
        positrinoWorldlineId: "10",
        electrinoWorldlineId: "10",
      },
    }),
    /two distinct worldline roles/u,
  );
});

test("eom replay adapter rejects allocation counts above the declared bounds", () => {
  assert.throws(
    () => normalizeCausalDelayFeedbackEomReplay(createEomRecordFixture(), {
      requestOptions: { frameCount: EOM_REPLAY_MAX_FRAME_COUNT + 1 },
    }),
    /frameCount must not exceed/u,
  );
  assert.throws(
    () => normalizeCausalDelayFeedbackEomReplay(createEomRecordFixture(), {
      requestOptions: { historyDepth: EOM_REPLAY_MAX_HISTORY_DEPTH + 1 },
    }),
    /historyDepth must not exceed/u,
  );
});

test("eom replay adapter does not advance without both polarities", async () => {
  const record = createEomRecordFixture();
  record.histories = [record.histories[0]];
  const adapter = createCausalDelayFeedbackEomReplayAdapter({ record });
  await assert.rejects(
    adapter.createReplayAsync({}),
    /one positive-polarity and one negative-polarity worldline/,
  );
});

test("eom replay adapter does not advance without a record", async () => {
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

test("shared EOM history dataset does not advance on foreign contract ids", () => {
  assert.throws(
    () => createEomHistoryDataset(createEomRecordFixture({ contractId: "solver-app-bridge/v2" })),
    /requires contractId eom_evolution_contract\/v0/,
  );
});

test("shared EOM history dataset does not advance without a claim grade", () => {
  const record = createEomRecordFixture();
  delete record.claimLevel;
  assert.throws(() => createEomHistoryDataset(record), /claim grade/);
});

test("shared EOM history dataset does not advance on non-contiguous segments", () => {
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
