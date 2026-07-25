import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  createCanonicalLearnerState,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCausalHistory.js";
import { sampleTimedPath } from "../src/apps/causal-delay-feedback/CausalDelayFeedbackTimedPath.js";
import {
  createBranchLabView,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackBranchLabMode.js";
import {
  createCausalHistoryLedger,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackHistoryMode.js";
import {
  CausalDelayFeedbackModeController,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js";
import {
  CAUSAL_DELAY_FEEDBACK_MODES,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackModes.js";
import {
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_BASELINE_Y,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackDisplayContract.js";
import {
  createSelfHitScenarios,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackRootsMode.js";
import {
  STORY_MOTION_SPEED_FRACTIONS,
  STORY_RELATIONSHIP_DESCRIPTIONS,
  STORY_SYNTHESIS_DISPLAY_MAPPING,
  STORY_WAKE_DISPLAY_RATE_SCALE,
  createStoryMotionWakeComparisonFixture,
  createStoryScene,
  createStorySampledWakeFronts,
  createStorySynthesisPlayback,
  createStoryView,
  getEarliestCommonStoryArcTime,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackStoryMode.js";
import {
  createMockCausalDelayReplayDataset,
  getDistance,
  getPathPoint,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
const REPO_ROOT = new URL("../", import.meta.url);
const STORY_INTERSECTION_TOLERANCE = 5e-5;

function createState(presetId) {
  return createCanonicalLearnerState(createMockCausalDelayReplayDataset(presetId), {
    receiverTime: 0.62,
    mode: "story",
  });
}

test("all learner modes preserve one canonical state object and its geometry references", () => {
  const state = createState();
  const paths = state.paths;
  const retainedHistory = state.retainedHistory;
  const selectedRootId = state.selectedRootId;
  const selectedReciprocalRootId = state.selectedReciprocalRootId;
  const branchIds = [...state.acceptedBranchRows, ...state.rejectedBranchRows].map((row) => row.id);
  const controller = new CausalDelayFeedbackModeController({ state });

  for (const mode of CAUSAL_DELAY_FEEDBACK_MODES) {
    assert.equal(controller.setMode(mode.id), true);
    assert.equal(controller.state, state);
    assert.equal(controller.state.paths, paths);
    assert.equal(controller.state.retainedHistory, retainedHistory);
    assert.equal(controller.state.selectedRootId, selectedRootId);
    assert.equal(controller.state.selectedReciprocalRootId, selectedReciprocalRootId);
    assert.deepEqual(
      [...controller.state.acceptedBranchRows, ...controller.state.rejectedBranchRows]
        .map((row) => row.id),
      branchIds,
    );
  }
  assert.equal(controller.setMode("story"), true);
  assert.equal(controller.state, state);
  assert.equal(controller.state.selectedRootId, selectedRootId);
  assert.equal(controller.state.selectedReciprocalRootId, selectedReciprocalRootId);
});

test("Story reads both reciprocal roots selected by the shared learner state", () => {
  const state = createState();
  const view = createStoryView(state);
  assert.equal(view.title, "Meet the Electrino and Positrino Transceivers");
  assert.equal(
    view.body,
    "Each architrino transmits continuously at a constant rate. The solid white dot on each body marks its current emission point. Earlier transmission points remain visible as wake history. Each full circle is a two-dimensional view of an expanding spherical wake. Wakes emitted earlier have had longer to expand, so they have a larger radius.",
  );
  assert.equal(view.root?.id, state.selectedRootId);
  assert.equal(view.reciprocalRoot?.id, state.selectedReciprocalRootId);
  assert.ok(Number.isFinite(view.root?.emissionTime));
  assert.ok(Number.isFinite(view.reciprocalRoot?.emissionTime));
  assert.equal(view.root?.receiverTime, state.receiverTime);
  assert.equal(view.reciprocalRoot?.receiverTime, state.receiverTime);
  assert.match(view.summary, /Two causal relationships/u);
  assert.match(view.summary, /Tᵣ=/u);
  assert.equal(view.relationshipDescriptions, STORY_RELATIONSHIP_DESCRIPTIONS);
  assert.deepEqual(view.relationshipDescriptions, [
    {
      label: "Relationship One",
      description: "Electrino transmitter → Positrino receiver",
    },
    {
      label: "Relationship Two",
      description: "Positrino transmitter → Electrino receiver",
    },
  ]);
  state.storyStep = 1;
  const emissionView = createStoryView(state);
  assert.equal(
    emissionView.title,
    "Wakes Received Now Were Transmitted in the Past",
  );
  assert.equal(
    emissionView.body,
    "Wakes arriving at a receiver now were transmitted earlier in the transmitter’s path history. The fading red and blue arcs show where the transmissions arriving now were emitted. The white dot marks where that wake was transmitted. By the time the wake is received, both architrinos have moved on from their earlier positions.",
  );
});

test("five lessons share one teaching sequence and wake-display rate", () => {
  const state = createState();
  const scenes = Array.from({ length: 5 }, (_unused, storyStep) => {
    state.storyStep = storyStep;
    return createStoryScene(state);
  });
  assert.deepEqual(scenes.map((scene) => scene.id), [
    "meet",
    "emission",
    "meaning",
    "motion",
    "forward-buildup",
  ]);
  const sharedPathStart = Math.max(
    state.paths.positrino[0].t,
    state.paths.electrino[0].t,
  );
  const sharedPathEnd = Math.min(
    state.paths.positrino.at(-1).t,
    state.paths.electrino.at(-1).t,
  );
  assert.equal(scenes[0].playbackStartTime, sharedPathStart);
  const handoffTime = sharedPathStart + (sharedPathEnd - sharedPathStart) * 0.5;
  const synthesisEndTime =
    sharedPathStart + (sharedPathEnd - sharedPathStart) * (5 / 6);
  assert.ok(Math.abs(scenes[2].playbackStartTime - handoffTime) < 1e-12);
  assert.equal(scenes[3].playbackStartTime, 0);
  assert.equal(scenes[0].playbackEndTime, sharedPathEnd);
  assert.equal(scenes[0].displayTime, sharedPathStart);
  const fixedBodyTime = handoffTime;
  const earliestCommonArcTime = getEarliestCommonStoryArcTime(state, {
    playbackStartTime: sharedPathStart,
    playbackEndTime: sharedPathEnd,
  });
  assert.equal(scenes[1].displayTime, earliestCommonArcTime);
  assert.equal(scenes[1].playbackStartTime, earliestCommonArcTime);
  assert.equal(scenes[1].playbackEndTime, fixedBodyTime);
  assert.equal(scenes[1].pausePathProgress, 0.5);
  assert.equal(scenes[1].autoPauseProgress, 1);
  assert.ok(earliestCommonArcTime > sharedPathStart);
  assert.ok(earliestCommonArcTime < fixedBodyTime);
  assert.equal(
    scenes[1].playbackDurationSeconds,
    scenes[0].playbackDurationSeconds *
      ((fixedBodyTime - earliestCommonArcTime) / (sharedPathEnd - sharedPathStart)),
  );
  assert.equal(scenes[2].fixedBodyTime, undefined);
  assert.ok(Math.abs(scenes[2].playbackEndTime - synthesisEndTime) < 1e-12);
  assert.equal(scenes[2].displayTime, handoffTime);
  assert.deepEqual(
    scenes.map((scene) => [
      scene.showWake,
      scene.showTransmissionGhost,
      scene.showCausalLine,
      scene.showReceptionMarker,
    ]),
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ],
  );
  assert.equal(scenes[0].showSampledWakeHistory, true);
  assert.equal(scenes[0].playbackDurationSeconds, 28.125);
  assert.equal(scenes[0].wakeDisplayRateScale, STORY_WAKE_DISPLAY_RATE_SCALE);
  assert.equal(scenes[0].wakeDisplayTimeScale, 1);
  assert.equal(scenes[1].showSampledWakeHistory, false);
  assert.ok(scenes.slice(1, 4).every((scene) => scene.showSampledWakeHistory === false));
  assert.ok(scenes.every(
    (scene) => scene.wakeDisplayRateScale === STORY_WAKE_DISPLAY_RATE_SCALE,
  ));
  assert.equal(scenes[2].showSynthesisMotion, true);
  assert.equal(scenes[2].showSynthesisWakeCircles, true);
  assert.equal(scenes[3].showMotionWakeComparison, true);
  assert.equal(scenes[4].showForwardWakeBuildup, true);
  assert.equal(scenes[4].showSampledWakeHistory, true);
  assert.equal(scenes[4].playbackStartTime, sharedPathStart);
  assert.equal(scenes[4].displayTime, sharedPathStart);
  assert.deepEqual(
    createStorySampledWakeFronts(state, scenes[4], scenes[4].playbackStartTime),
    [],
  );
  assert.deepEqual(
    createStorySampledWakeFronts(state, scenes[0], scenes[0].playbackStartTime),
    [],
  );
  const midpointFronts = createStorySampledWakeFronts(
    state,
    scenes[0],
    scenes[0].playbackStartTime +
      (scenes[0].playbackEndTime - scenes[0].playbackStartTime) * 0.5,
  );
  assert.equal(midpointFronts.length, 40);
  scenes[0].interactions.forEach((interaction) => {
    const transmitterFronts = midpointFronts.filter(
      (front) => front.transmitterId === interaction.transmitterId,
    );
    assert.equal(transmitterFronts.length, 20);
    assert.ok(
      transmitterFronts.slice(0, -1).every(
        (front, index) => front.radius > transmitterFronts[index + 1].radius,
      ),
    );
    assert.ok(transmitterFronts.every((front) => front.guideTarget));
    assert.ok(
      transmitterFronts.every(
        (front) => Math.abs(front.displayAge - front.age) < 1e-12,
      ),
    );
  });
  const endFronts = createStorySampledWakeFronts(
    state,
    scenes[0],
    scenes[0].playbackEndTime,
  );
  scenes[0].interactions.forEach((interaction) => {
    const transmitterFronts = endFronts.filter(
      (front) => front.transmitterId === interaction.transmitterId,
    );
    assert.equal(transmitterFronts.length, 40);
    assert.equal(new Set(transmitterFronts.map((front) => front.id)).size, 40);
    assert.equal(
      new Set(transmitterFronts.map((front) => front.emissionTime.toFixed(12))).size,
      40,
    );
    const gaps = transmitterFronts.slice(1).map(
      (front, index) => front.emissionTime - transmitterFronts[index].emissionTime,
    );
    assert.ok(gaps.every((gap) => Math.abs(gap - 0.025) <= 1e-12));
    const displayGapSeconds =
      scenes[0].playbackDurationSeconds * (gaps[0] /
        (scenes[0].playbackEndTime - scenes[0].playbackStartTime));
    assert.ok(Math.abs(displayGapSeconds - 0.703125) <= 1e-12);
    const causalFront = transmitterFronts.find((front) => front.causalReception);
    assert.equal(causalFront.emissionTime, interaction.root.emissionTime);
    const receptionFront = createStorySampledWakeFronts(
      state,
      scenes[0],
      state.receiverTime,
    ).find((front) => front.id === causalFront.id);
    assert.ok(Math.abs(receptionFront.eventProgress - 1) < 1e-12);
    assert.ok(
      Math.abs(
        receptionFront.radius -
          getDistance(receptionFront.center, receptionFront.guideTarget),
      ) < STORY_INTERSECTION_TOLERANCE,
    );
  });
  for (let progressIndex = 1; progressIndex <= 20; progressIndex += 1) {
    const replayTime =
      scenes[0].playbackStartTime +
      (scenes[0].playbackEndTime - scenes[0].playbackStartTime) *
        (progressIndex / 20);
    const fronts = createStorySampledWakeFronts(state, scenes[0], replayTime);
    fronts.forEach((front) => {
      const currentTransmitter = sampleTimedPath(
        state.paths[front.transmitterId],
        replayTime,
      );
      assert.ok(
        getDistance(front.center, currentTransmitter) <=
          front.radius + STORY_INTERSECTION_TOLERANCE,
      );
    });
  }
  state.storyStep = 2;
  const synthesisView = createStoryView(state);
  assert.equal(synthesisView.stepCount, 5);
  assert.equal(synthesisView.title, "Two Reciprocal Causal Relationships");
  assert.match(synthesisView.body, /full circle/u);
  assert.match(synthesisView.body, /matching fading red or blue arc/u);
  assert.doesNotMatch(synthesisView.body, /aligns each journey by progress/u);
});

test("Story 3 maps each body from its own transmission to its later reception", () => {
  const state = createState();
  state.storyStep = 2;
  const scene = createStoryScene(state);
  const start = createStorySynthesisPlayback(state, scene.interactions, 0);
  const middle = createStorySynthesisPlayback(state, scene.interactions, 0.5);
  const end = createStorySynthesisPlayback(state, scene.interactions, 1);

  assert.equal(start.displayMapping, STORY_SYNTHESIS_DISPLAY_MAPPING);
  assert.match(start.evidenceBoundary, /not asserted to be simultaneous/u);
  assert.equal(start.events.length, 2);
  for (const kind of ["positrino", "electrino"]) {
    const outgoing = scene.interactions.find(
      (interaction) => interaction.transmitterId === kind,
    );
    const incoming = scene.interactions.find(
      (interaction) => interaction.receiverId === kind,
    );
    assert.deepEqual(start.bodies[kind].point, {
      ...outgoing.root.emission,
      t: outgoing.root.emissionTime,
    });
    assert.deepEqual(end.bodies[kind].point, {
      ...incoming.root.reception,
      t: incoming.root.receiverTime,
    });
    assert.ok(middle.bodies[kind].pathTime > start.bodies[kind].pathTime);
    assert.ok(middle.bodies[kind].pathTime < end.bodies[kind].pathTime);
  }
  start.events.forEach((event) => {
    const interaction = scene.interactions.find(
      (candidate) => candidate.transmitterId === event.sourceKind,
    );
    assert.deepEqual(event.source, {
      ...interaction.root.emission,
      t: interaction.root.emissionTime,
    });
    assert.deepEqual(event.receiver, {
      ...interaction.root.reception,
      t: interaction.root.receiverTime,
    });
    assert.ok(Math.abs(event.rootResidual) < STORY_INTERSECTION_TOLERANCE);
  });
});

test("Story 4 comparison uses evaluator-backed constant-speed wake geometry", () => {
  const state = createState();
  state.storyStep = 3;
  const fixture = createStoryMotionWakeComparisonFixture(state, 0.6);
  assert.deepEqual(
    fixture.comparisons.map((comparison) => comparison.speedFraction),
    STORY_MOTION_SPEED_FRACTIONS,
  );
  assert.equal(fixture.signalSpeed, 1);
  assert.ok(fixture.maximumResidual < 1e-12);
  assert.deepEqual(
    fixture.comparisons.map((comparison) =>
      comparison.fronts.map((front) => front.emissionTime)),
    Array.from({ length: STORY_MOTION_SPEED_FRACTIONS.length }, () =>
      [...fixture.emissionTimes]),
  );
  const frontReaches = fixture.comparisons.map((comparison) => comparison.frontReach);
  const rearReaches = fixture.comparisons.map((comparison) => comparison.rearReach);
  assert.ok(frontReaches.every(
    (reach, index) => index === 0 || reach < frontReaches[index - 1],
  ));
  assert.ok(rearReaches.every(
    (reach, index) => index === 0 || reach > rearReaches[index - 1],
  ));
  fixture.comparisons.forEach((comparison) => {
    assert.equal(
      comparison.currentSource.y,
      (SPACE_AXIS_TOP_Y + TIME_AXIS_BASELINE_Y) * 0.5,
    );
    comparison.fronts.forEach((front) => {
      assert.equal(front.center.y, comparison.currentSource.y);
      assert.equal(front.frontPoint.y, comparison.currentSource.y);
      assert.equal(front.rearPoint.y, comparison.currentSource.y);
      assert.ok(
        getDistance(front.center, comparison.currentSource) <=
          front.radius + STORY_INTERSECTION_TOLERANCE,
      );
    });
  });
  const midpointFixture = createStoryMotionWakeComparisonFixture(state, 0.36);
  assert.deepEqual(
    midpointFixture.comparisons.map((comparison) => comparison.currentSource.x),
    [470, 960, 1450],
  );
  assert.ok(midpointFixture.maximumResidual < 1e-12);
});

test("representative paired paths stay gently wavy and converge monotonically", () => {
  const state = createState();
  assert.equal(state.paths.positrino.length, state.paths.electrino.length);
  let previousSeparation = Number.POSITIVE_INFINITY;
  state.paths.positrino.forEach((positrinoPoint, index) => {
    const electrinoPoint = state.paths.electrino[index];
    const separation = electrinoPoint.y - positrinoPoint.y;
    assert.ok(separation > 0);
    assert.ok(separation < previousSeparation);
    previousSeparation = separation;
  });
  const startSeparation =
    state.paths.electrino[0].y - state.paths.positrino[0].y;
  const endSeparation =
    state.paths.electrino.at(-1).y - state.paths.positrino.at(-1).y;
  assert.equal(startSeparation, 450);
  assert.equal(endSeparation, 225);
  const countTurns = (kind) => {
    let previousDirection = 0;
    let turns = 0;
    for (let index = 1; index <= 200; index += 1) {
      const previous = getPathPoint(kind, (index - 1) / 200);
      const current = getPathPoint(kind, index / 200);
      const direction = Math.sign(current.y - previous.y);
      if (direction !== 0 && previousDirection !== 0 && direction !== previousDirection) {
        turns += 1;
      }
      if (direction !== 0) {
        previousDirection = direction;
      }
    }
    return turns;
  };
  assert.ok(countTurns("positrino") >= 4);
  assert.ok(countTurns("electrino") >= 4);
});

test("guided progression follows all lessons and ends in Laboratory", () => {
  const state = createState();
  state.storyStep = 3;
  const controller = new CausalDelayFeedbackModeController({ state });
  controller.goNext();
  assert.equal(state.mode, "story");
  assert.equal(state.storyStep, 4);
  controller.goNext();
  assert.equal(state.mode, "sandbox");
  assert.deepEqual(
    CAUSAL_DELAY_FEEDBACK_MODES.map((mode) => mode.id),
    ["story", "sandbox"],
  );
  controller.goBack();
  assert.equal(state.mode, "story");
  assert.equal(state.storyStep, 4);
  assert.equal(controller.setMode("prediction"), false);
  assert.equal(controller.setMode("history"), false);
  assert.equal(controller.setMode("roots"), false);
  assert.equal(controller.setMode("self-hit"), false);
  assert.equal(controller.setMode("branch-lab"), false);
});

test("changing Story steps clears the prior scene's pause-resume presentation", () => {
  const state = createState();
  state.storyStep = 0;
  state.playback.playing = false;
  state.playback.resumable = true;
  state.playback.completed = false;
  const controller = new CausalDelayFeedbackModeController({ state });
  controller.render = () => {};

  controller.goNext();

  assert.equal(state.storyStep, 1);
  assert.equal(state.playback.playing, false);
  assert.equal(state.playback.resumable, false);
  assert.equal(state.playback.completed, false);
});

test("First frame resets the current lesson without returning to Lesson One", () => {
  const state = createState();
  state.storyStep = 1;
  let replayedStep = null;
  const controller = new CausalDelayFeedbackModeController({
    state,
    onReplay: (nextState) => {
      replayedStep = nextState.storyStep;
    },
  });
  controller.render = () => {};

  controller.handleClick({
    target: {
      closest(selector) {
        return selector === "[data-guided-action]"
          ? { dataset: { guidedAction: "first-frame" } }
          : null;
      },
    },
  });

  assert.equal(state.storyStep, 1);
  assert.equal(replayedStep, 1);
});

test("Story 4 speed selector updates the shared learner state", () => {
  const state = createState();
  state.storyStep = 3;
  state.playback.playing = true;
  state.playback.resumable = true;
  state.playback.completed = true;
  let changedSpeed = null;
  const controller = new CausalDelayFeedbackModeController({
    state,
    onStateChange: (nextState) => {
      changedSpeed = nextState.storyMotionSpeedFraction;
    },
  });
  controller.renderStory = () => {};
  controller.updateCanvasSummary = () => {};

  controller.handleClick({
    target: {
      closest(selector) {
        return selector === "[data-story-speed]"
          ? { dataset: { storySpeed: "0.9" } }
          : null;
      },
    },
  });

  assert.equal(state.storyMotionSpeedFraction, 0.9);
  assert.equal(changedSpeed, 0.9);
  assert.equal(state.playback.playing, false);
  assert.equal(state.playback.resumable, false);
  assert.equal(state.playback.completed, false);
});

test("learner authority labels keep representative EOM and unavailable providers distinct", () => {
  const representative = createState();
  const eomDataset = {
    ...createMockCausalDelayReplayDataset(),
    datasetSource: "eom_history_replay",
    solverIntegrationPath: "eom_replay_adapter",
    causalEvaluation: {
      enabled: false,
      reason: "record_has_no_delayed_hit_rows",
    },
  };
  const unavailableDataset = {
    ...createMockCausalDelayReplayDataset(),
    datasetSource: "unavailable_provider",
    solverIntegrationPath: "unavailable_provider",
  };
  const eom = createCanonicalLearnerState(eomDataset);
  const unavailable = createCanonicalLearnerState(unavailableDataset, {
    loadState: "fallback",
    loadError: new Error("provider unavailable"),
  });
  assert.equal(representative.replay.label, "representative mock replay");
  assert.equal(eom.replay.label, "EOM record replay");
  assert.equal(eom.roots.length, 0);
  assert.equal(eom.causalEvaluationAvailable, false);
  assert.equal(unavailable.replay.label, "unavailable provider");
  assert.equal("constrainedBoundaryReplay" in unavailable.replay, false);
  assert.equal("strongerPhysicalSolver" in unavailable.replay, false);
});

test("Path History maps the selected root to the same emission row", () => {
  const state = createState();
  const rows = createCausalHistoryLedger(state);
  const selected = rows.find((row) => row.selected);
  assert.equal(selected.rootId, state.selectedRootId);
  assert.equal(selected.state, "selected root history");
  assert.equal(selected.emissionTime, state.emissionTime);
});

test("Branch Lab vector sum consumes exactly the accepted displayed rows", () => {
  const state = createState("contrast_stress");
  state.acceptedBranchRows = [
    {
      id: "accepted-a",
      ordinal: 1,
      accepted: true,
      reason: "accepted_simple_root",
      rootKind: "pair_hit",
      emissionTime: 0.2,
      acceleration: { x: 1.5, y: -0.5 },
    },
    {
      id: "accepted-b",
      ordinal: 2,
      accepted: true,
      reason: "accepted_simple_root",
      rootKind: "pair_hit",
      emissionTime: 0.3,
      acceleration: { x: -0.25, y: 0.75 },
    },
  ];
  state.rejectedBranchRows = [{
    id: "rejected",
    ordinal: 3,
    accepted: false,
    reason: "transversality_floor_failed",
    rootKind: "pair_hit",
    emissionTime: 0.4,
    acceleration: { x: 8, y: 8 },
  }];
  const view = createBranchLabView(state);
  assert.ok(view.acceptedRows.length > 0);
  assert.ok(view.rejectedRows.length > 0);
  assert.deepEqual(view.sourceRows, view.acceptedRows.map((row) => row.id));
  const expected = view.acceptedRows.reduce(
    (sum, row) => ({ x: sum.x + row.acceleration.x, y: sum.y + row.acceleration.y }),
    { x: 0, y: 0 },
  );
  assert.deepEqual(view.vectorSum, expected);
});

test("Branch Lab filters preserve stable rows and reasons while changing the displayed sum", () => {
  const state = createState("contrast_stress");
  state.acceptedBranchRows = [{
    id: "accepted",
    ordinal: 1,
    accepted: true,
    reason: "accepted_simple_root",
    rootKind: "pair_hit",
    emissionTime: 0.2,
    acceleration: { x: 1, y: 0 },
  }];
  state.rejectedBranchRows = [{
    id: "unavailable",
    ordinal: 2,
    accepted: false,
    reason: "tangent_root_unresolved",
    rootKind: "pair_hit",
    emissionTime: 0.4,
    acceleration: null,
  }];
  const unfiltered = createBranchLabView(state);
  const filtered = createBranchLabView(state, {
    historyAgeLimit: Number.POSITIVE_INFINITY,
    minimumContribution: unfiltered.acceptedRows[0].magnitude + 1,
    rootKind: "all",
    transversalityFloor: 0,
  });
  assert.deepEqual(filtered.rows.map((row) => row.id), unfiltered.rows.map((row) => row.id));
  assert.deepEqual(filtered.rows.map((row) => row.color), unfiltered.rows.map((row) => row.color));
  assert.ok(filtered.filteredRows.length > 0);
  assert.ok(filtered.rows.every((row) => row.reason));
  assert.ok(filtered.allRejectedRows.every((row) => row.reason));
  assert.deepEqual(filtered.sourceRows, filtered.acceptedRows.map((row) => row.id));
  assert.notDeepEqual(filtered.vectorSum, unfiltered.vectorSum);
});

test("Branch Lab never derives acceleration from emission-reception displacement", () => {
  const state = createState();
  state.acceptedBranchRows = [{
    id: "missing-acceleration",
    ordinal: 1,
    accepted: true,
    reason: "accepted_simple_root",
    rootKind: "pair_hit",
    emissionTime: 0.2,
    emission: { x: 0, y: 0 },
    reception: { x: 3, y: 4 },
  }];
  state.rejectedBranchRows = [];

  const view = createBranchLabView(state);

  assert.equal(view.acceptedRows.length, 0);
  assert.equal(view.rows[0].accelerationAvailable, false);
  assert.equal(view.rows[0].filterReason, "acceleration unavailable");
  assert.deepEqual(view.vectorSum, { x: 0, y: 0 });
});

test("Self-Hit keeps absent unresolved active and failed-floor states distinct", () => {
  const scenarios = createSelfHitScenarios();
  const states = new Map(scenarios.map((scenario) => [scenario.id, scenario.state]));
  assert.equal(states.get("sub_cf"), "absent");
  assert.equal(states.get("threshold"), "unresolved");
  assert.equal(states.get("tangent"), "tangent");
  assert.equal(states.get("super_cf_curved"), "active");
  assert.equal(states.get("failed_floor"), "failed-floor");
  scenarios.forEach((scenario) => {
    scenario.roots.forEach((root) => {
      assert.equal(root.sourceId, "self");
      assert.equal(root.receiverId, "self");
    });
  });
});

test("page exposes semantic journey controls and one text-equivalent canvas summary", async () => {
  const html = await readFile(new URL("causal-delay-feedback.html", REPO_ROOT), "utf8");
  for (const id of [
    "causal-delay-feedback-mode-tabs",
    "causal-delay-feedback-lesson-panel",
    "causal-delay-feedback-guided-back",
    "causal-delay-feedback-guided-first-frame",
    "causal-delay-feedback-guided-play",
    "causal-delay-feedback-guided-next",
    "causal-delay-feedback-canvas-summary",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`, "u"));
  }
  assert.match(html, /aria-describedby="causal-delay-feedback-canvas-summary"/u);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(html, /@media \(forced-colors: active\)/u);
  assert.match(html, /\.causal-journey\[data-mode="story"\] \.causal-lesson-panel/u);
  assert.match(html, /aria-label="Lesson table of contents"/u);
  assert.doesNotMatch(html, /id="causal-delay-feedback-guided-replay"/u);
  assert.doesNotMatch(html, /causal-delay-feedback-journey-provenance/u);
  assert.doesNotMatch(html, /data-guided-action="sandbox"/u);
});

test("Story canvas omits redundant headings and the retired learner surfaces", async () => {
  const runtime = await readFile(
    new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js", REPO_ROOT),
    "utf8",
  );
  assert.doesNotMatch(runtime, /drawSceneHeading\(ctx, `STORY/u);
  assert.match(runtime, /drawSceneHeading\(ctx, `ROOTS/u);
  assert.doesNotMatch(runtime, /`SELF-HIT ·/u);
  assert.doesNotMatch(runtime, /`BRANCH LAB ·/u);
  assert.match(runtime, /drawFieldSpeedCompressionScene/u);
});

test("learner journey stays one app with no separate Roots route", async () => {
  const [html, main, controller, modes] = await Promise.all([
    readFile(new URL("causal-delay-feedback.html", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/main.js", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackModes.js", REPO_ROOT), "utf8"),
  ]);
  assert.doesNotMatch(`${html}\n${main}\n${controller}\n${modes}`, /roots\.html/iu);
  assert.doesNotMatch(modes, /\{ id: "history"/u);
  assert.doesNotMatch(modes, /\{ id: "roots"/u);
  assert.doesNotMatch(modes, /\{ id: "self-hit"/u);
  assert.match(modes, /\{ id: "sandbox", label: "Laboratory"/u);
});

test("new learner-facing copy remains acceleration-first", async () => {
  const learnerSources = await Promise.all([
    "CausalDelayFeedbackModeController.js",
    "CausalDelayFeedbackStoryMode.js",
    "CausalDelayFeedbackHistoryMode.js",
    "CausalDelayFeedbackRootsMode.js",
    "CausalDelayFeedbackBranchLabMode.js",
  ].map((file) => readFile(new URL(`src/apps/causal-delay-feedback/${file}`, REPO_ROOT), "utf8")));
  const domainSources = await Promise.all([
    "CausalDelayFeedbackRuntime.js",
    "CausalDelayFeedbackCausalHistory.js",
    "CausalDelayFeedbackReplayAdapter.js",
    "CausalDelayFeedbackEomReplayAdapter.js",
    "CausalDelayFeedbackModeController.js",
    "CausalDelayFeedbackStoryMode.js",
    "CausalDelayFeedbackHistoryMode.js",
    "CausalDelayFeedbackRootsMode.js",
    "CausalDelayFeedbackBranchLabMode.js",
    "CausalDelayFeedbackWakeRenderer.js",
  ].map((file) => readFile(new URL(`src/apps/causal-delay-feedback/${file}`, REPO_ROOT), "utf8")));
  const learnerStrings =
    learnerSources.join("\n").match(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/gu)?.join("\n") ?? "";
  const authoredStrings =
    domainSources.join("\n").match(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/gu)?.join("\n") ?? "";
  assert.doesNotMatch(authoredStrings, /\bforce(?:s|d)?\b/iu);
  assert.match(authoredStrings, /\bacceleration\b/iu);
  assert.doesNotMatch(authoredStrings, /\bmass\b/iu);
  assert.doesNotMatch(authoredStrings, new RegExp("\\breta" + "rd(?:ed|ation)?\\b", "iu"));
  assert.doesNotMatch(learnerStrings, /\bsource(?:'s)?\b/iu);
  assert.doesNotMatch(learnerStrings, /T_[tr]/u);
  assert.doesNotMatch(learnerStrings, /C_F/u);
  assert.match(learnerStrings, /C_f/u);
});
