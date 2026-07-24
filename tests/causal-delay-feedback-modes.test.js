import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  createCanonicalLearnerState,
  createPredictionChoices,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCausalHistory.js";
import { sampleTimedPath } from "../src/apps/causal-delay-feedback/CausalDelayFeedbackTimedPath.js";
import {
  createBranchLabView,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackBranchLabMode.js";
import {
  createCausalHistoryLedger,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackHistoryMode.js";
import {
  CAUSAL_DELAY_FEEDBACK_MODES,
  CausalDelayFeedbackModeController,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js";
import {
  createSelfHitScenarios,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackRootsMode.js";
import {
  createPredictionView,
  createStoryScene,
  createStoryView,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackStoryMode.js";
import {
  createMockCausalDelayReplayDataset,
  getDistance,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
import {
  createWakeDisplayGeometry,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackWakeRenderer.js";

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
  assert.equal(view.root?.id, state.selectedRootId);
  assert.equal(view.reciprocalRoot?.id, state.selectedReciprocalRootId);
  assert.ok(Number.isFinite(view.root?.emissionTime));
  assert.ok(Number.isFinite(view.reciprocalRoot?.emissionTime));
  assert.equal(view.root?.receiverTime, state.receiverTime);
  assert.equal(view.reciprocalRoot?.receiverTime, state.receiverTime);
  assert.match(view.summary, /Two causal relationships/u);
  assert.match(view.summary, /Tᵣ=/u);
});

test("Story stages five distinct scenes and both reception spheres intersect their receivers", () => {
  const state = createState();
  const scenes = Array.from({ length: 5 }, (_unused, storyStep) => {
    state.storyStep = storyStep;
    return createStoryScene(state);
  });
  assert.deepEqual(scenes.map((scene) => scene.id), [
    "meet",
    "emission",
    "travel",
    "reception",
    "meaning",
  ]);
  assert.equal(new Set(scenes.slice(0, 4).map((scene) => scene.displayTime)).size, 4);
  assert.deepEqual(
    scenes.map((scene) => [
      scene.showWake,
      scene.showTransmissionGhost,
      scene.showCausalLine,
      scene.showReceptionMarker,
    ]),
    [
      [false, false, false, false],
      [true, true, false, false],
      [true, true, false, false],
      [true, true, false, true],
      [true, true, true, true],
    ],
  );
  const receptionScene = scenes[3];
  assert.equal(receptionScene.interactions.length, 2);
  receptionScene.interactions.forEach((interaction) => {
    const receiverAtReception = sampleTimedPath(
      state.paths[interaction.receiverId],
      receptionScene.displayTime,
    );
    assert.deepEqual(receiverAtReception, interaction.root.reception);
    const geometry = createWakeDisplayGeometry(
      interaction.root,
      receptionScene.displayTime,
    );
    assert.ok(
      Math.abs(
        geometry.radius - getDistance(interaction.root.emission, interaction.root.reception),
      ) < STORY_INTERSECTION_TOLERANCE,
    );
  });
  const travelScene = scenes[2];
  travelScene.interactions.forEach((interaction) => {
    const geometry = createWakeDisplayGeometry(interaction.root, travelScene.displayTime);
    assert.ok(
      geometry.radius < getDistance(interaction.root.emission, interaction.root.reception),
    );
  });
});

test("representative Story paths stay wavy without crossing", () => {
  const state = createState();
  assert.equal(state.paths.positrino.length, state.paths.electrino.length);
  state.paths.positrino.forEach((positrinoPoint, index) => {
    const electrinoPoint = state.paths.electrino[index];
    assert.ok(positrinoPoint.y - electrinoPoint.y > 100);
  });
});

test("Prediction choices are generated from the canonical root evaluator", () => {
  const state = createState();
  const choices = createPredictionChoices(state);
  assert.equal(choices.length, 3);
  assert.equal(choices.filter((choice) => choice.correct).length, 1);
  const correct = choices.find((choice) => choice.correct);
  const root = state.roots.find((candidate) => candidate.id === state.selectedRootId);
  assert.equal(correct.emissionTime, root.emissionTime);
  assert.deepEqual(correct.point, root.emission);
  assert.notEqual(choices.indexOf(correct), 1);
  assert.deepEqual(createPredictionChoices(state), choices);
  assert.match(createPredictionView(state).explanation, /same causal-root evaluator/u);
});

test("Prediction preserves incorrect-answer explanation and retry", () => {
  const state = createState();
  const incorrect = createPredictionChoices(state).find((choice) => !choice.correct);
  state.selectedPredictionId = incorrect.id;
  state.predictionState = "incorrect";
  const view = createPredictionView(state);
  assert.equal(view.selected.id, incorrect.id);
  assert.match(view.explanation, /Try another/u);
  assert.equal(view.choices.some((choice) => choice.correct), true);
});

test("Prediction keeps one correct choice when the root lies at path coverage start", () => {
  const root = {
    id: "boundary-root",
    emissionTime: 0,
    receiverTime: 0.5,
    delay: 0.5,
    emission: { t: 0, x: 0, y: 0 },
  };
  const state = {
    roots: [root],
    acceptedBranchRows: [root],
    selectedRootId: root.id,
    sourceId: "positrino",
    receiverTime: 0.5,
    paths: {
      positrino: [
        { t: 0, x: 0, y: 0 },
        { t: 1, x: 1, y: 0 },
      ],
    },
  };

  const choices = createPredictionChoices(state);

  assert.equal(choices.length, 3);
  assert.equal(new Set(choices.map((choice) => choice.emissionTime)).size, 3);
  assert.equal(choices.filter((choice) => choice.correct).length, 1);
});

test("guided progression requires the evaluator-backed correct Prediction answer", () => {
  const state = createState();
  state.mode = "prediction";
  const controller = new CausalDelayFeedbackModeController({ state });
  controller.goNext();
  assert.equal(state.mode, "prediction");
  const correct = createPredictionChoices(state).find((choice) => choice.correct);
  controller.selectPrediction(correct.id);
  controller.goNext();
  assert.equal(state.mode, "history");
  controller.setMode("sandbox");
  controller.setMode("prediction");
  assert.equal(state.predictionState, "correct");
  assert.equal(state.selectedPredictionId, correct.id);
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
});

test("page exposes semantic journey controls and one text-equivalent canvas summary", async () => {
  const html = await readFile(new URL("causal-delay-feedback.html", REPO_ROOT), "utf8");
  for (const id of [
    "causal-delay-feedback-mode-tabs",
    "causal-delay-feedback-lesson-panel",
    "causal-delay-feedback-guided-back",
    "causal-delay-feedback-guided-play",
    "causal-delay-feedback-guided-next",
    "causal-delay-feedback-guided-replay",
    "causal-delay-feedback-guided-sandbox",
    "causal-delay-feedback-canvas-summary",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`, "u"));
  }
  assert.match(html, /aria-describedby="causal-delay-feedback-canvas-summary"/u);
  assert.match(html, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(html, /@media \(forced-colors: active\)/u);
  assert.doesNotMatch(html, /causal-delay-feedback-journey-provenance/u);
});

test("learner journey stays one app with no separate Roots route", async () => {
  const [html, main, controller] = await Promise.all([
    readFile(new URL("causal-delay-feedback.html", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/main.js", REPO_ROOT), "utf8"),
    readFile(new URL("src/apps/causal-delay-feedback/CausalDelayFeedbackModeController.js", REPO_ROOT), "utf8"),
  ]);
  assert.doesNotMatch(`${html}\n${main}\n${controller}`, /roots\.html/iu);
  assert.match(controller, /\{ id: "roots", label: "Roots"/u);
  assert.match(controller, /\{ id: "sandbox", label: "Sandbox"/u);
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
});
