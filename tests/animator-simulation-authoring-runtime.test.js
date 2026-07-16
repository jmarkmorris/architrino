import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_ANIMATOR_SIMULATION_AUTHORING_DRAFT,
  applyAnimatorSimulationAuthoringDraftToDocument,
  buildAnimatorSimulationAuthoringWorkerPayload,
  createAnimatorSimulationAuthoringDraft,
  summarizeAnimatorSimulationAuthoringDataset,
} from "../src/apps/animator/AnimatorSimulationAuthoringRuntime.js";
import { ANIMATOR_SOLVER_BRIDGE_ENGINE_ID } from "../src/apps/animator/AnimatorSimulationAuthoringRuntime.js";

const BASE_DOCUMENT = Object.freeze({
  scene: {
    id: "authoring_scene",
    mode: "planar-2d",
    time: { start: 2, end: 8, loop: false },
  },
  metadata: {
    simulationDataset: {
      kind: "animator.simulation.dataset",
      id: "fixture_dataset",
      claimLevel: "fixture-only",
      simulation: {
        mode: "planar-2d",
        dimensions: 2,
        time: { start: 0, end: 6, dt: 0.25, sampleStride: 2 },
        solver: { id: "static-fixture", cf: 1 },
        halt: { status: "not-run" },
      },
      particles: [{ id: "p0" }, { id: "p1" }],
      frames: [{ t: 0 }, { t: 0.25 }],
      fieldShells: [{ id: "shell_1" }],
      delayedHits: [{ id: "hit_1" }],
      diagnostics: {},
    },
  },
});

const DEFAULT_SOLVER_BRIDGE_CONFIG = Object.freeze({
  enabled: true,
  precisionPath: "auto",
  streamTarget: "caller-buffer",
  deterministic: true,
  threadingMode: "single-thread",
  rowsPerChunk: 256,
});

test("simulation authoring draft reads scene timing and dataset context", () => {
  const draft = createAnimatorSimulationAuthoringDraft(BASE_DOCUMENT);

  assert.equal(draft.duration, 6);
  assert.equal(draft.loop, false);
  assert.equal(draft.dt, 0.01);
  assert.equal(draft.stride, 10);
  assert.equal(draft.particles, 6);
  assert.equal(draft.cf, 1);
  assert.equal(draft.claimLevel, "solver-derived-diagnostic");
  assert.equal(draft.datasetId, "authoring_scene_worker_dataset");
  assert.equal(draft.solverEngine, ANIMATOR_SOLVER_BRIDGE_ENGINE_ID);
  assert.deepEqual(draft.solverBridge, DEFAULT_SOLVER_BRIDGE_CONFIG);
  assert.deepEqual(
    DEFAULT_ANIMATOR_SIMULATION_AUTHORING_DRAFT.solverBridge,
    DEFAULT_SOLVER_BRIDGE_CONFIG
  );
});

test("simulation authoring draft applies worker config and preserves existing metadata", () => {
  const nextDocument = applyAnimatorSimulationAuthoringDraftToDocument(BASE_DOCUMENT, {
    duration: "12",
    loop: true,
    steps: "2400",
    dt: "0.005",
    stride: "12",
    particles: "8",
    radius: "2.5",
    radialSpeed: "-0.1",
    tangentialSpeed: "0.7",
    driftX: "0.02",
    driftY: "-0.03",
    cf: "1.5",
    kappa: "0.04",
    historyMode: "deep",
    rootHaltPolicy: "partner",
    datasetId: "custom_dataset",
    claimLevel: "solver-derived-test",
  });

  assert.equal(nextDocument.scene.time.start, 2);
  assert.equal(nextDocument.scene.time.end, 14);
  assert.equal(nextDocument.scene.time.loop, true);
  assert.equal(nextDocument.metadata.simulationDataset.id, "fixture_dataset");
  assert.deepEqual(nextDocument.metadata.simulationWorker.config, {
    steps: 2400,
    dt: 0.005,
    stride: 12,
    particles: 8,
    radius: 2.5,
    radialSpeed: -0.1,
    tangentialSpeed: 0.7,
    driftX: 0.02,
    driftY: -0.03,
    cf: 1.5,
    kappa: 0.04,
    shellK: 0,
    historyMode: "deep",
    rootHaltPolicy: "partner",
    solverEngine: ANIMATOR_SOLVER_BRIDGE_ENGINE_ID,
    solverBridge: DEFAULT_SOLVER_BRIDGE_CONFIG,
  });
  assert.deepEqual(nextDocument.metadata.simulationWorker.datasetOptions, {
    id: "custom_dataset",
    claimLevel: "solver-derived-test",
  });
});

test("simulation authoring worker payload normalizes invalid choices fail-closed to defaults", () => {
  const payload = buildAnimatorSimulationAuthoringWorkerPayload(
    {
      duration: 4,
      steps: 0,
      dt: -1,
      stride: 0,
      particles: 0,
      cf: 0,
      historyMode: "unknown",
      rootHaltPolicy: "unknown",
    },
    BASE_DOCUMENT
  );

  assert.equal(payload.config.steps, 400);
  assert.equal(payload.config.dt, 0.01);
  assert.equal(payload.config.stride, 10);
  assert.equal(payload.config.particles, 6);
  assert.equal(payload.config.cf, 1);
  assert.equal(payload.config.historyMode, "adaptive");
  assert.equal(payload.config.rootHaltPolicy, "all");
  assert.equal(payload.config.solverEngine, ANIMATOR_SOLVER_BRIDGE_ENGINE_ID);
  assert.deepEqual(payload.config.solverBridge, DEFAULT_SOLVER_BRIDGE_CONFIG);
});

test("simulation authoring worker payload can configure the simulation stream source", () => {
  const motionRequest = {
    pathKey: 7,
    segment: {
      startTime: 0,
      endTime: 1,
      positionAtStart: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
    },
    startTime: 0,
    endTime: 1,
    step: 0.25,
  };
  const payload = buildAnimatorSimulationAuthoringWorkerPayload(
    {
      solverEngine: "solver-app-bridge",
      solverBridge: {
        enabled: true,
        precisionPath: "scaled_f64_strict",
        streamTarget: "caller-buffer",
        deterministic: true,
        motionRequest,
      },
    },
    BASE_DOCUMENT
  );

  assert.equal(payload.config.solverEngine, ANIMATOR_SOLVER_BRIDGE_ENGINE_ID);
  assert.deepEqual(payload.config.solverBridge, {
    ...DEFAULT_SOLVER_BRIDGE_CONFIG,
    enabled: true,
    precisionPath: "scaled_f64_strict",
    streamTarget: "caller-buffer",
    deterministic: true,
    motionRequest,
  });
});

test("simulation authoring worker payload keeps the simulation stream source enabled", () => {
  const payload = buildAnimatorSimulationAuthoringWorkerPayload(
    {
      solverBridge: { enabled: false },
    },
    BASE_DOCUMENT
  );

  assert.equal(payload.config.solverEngine, ANIMATOR_SOLVER_BRIDGE_ENGINE_ID);
  assert.deepEqual(payload.config.solverBridge, DEFAULT_SOLVER_BRIDGE_CONFIG);
});

test("simulation authoring summary reports active dataset diagnostics", () => {
  const summary = summarizeAnimatorSimulationAuthoringDataset(BASE_DOCUMENT);

  assert.equal(summary.hasDataset, true);
  assert.deepEqual(summary.rows.slice(0, 5), [
    ["Dataset", "fixture_dataset"],
    ["Claim", "fixture-only"],
    ["Mode", "planar-2d / 2D"],
    ["Time", "0.00s - 6.00s"],
    ["Frames", "2"],
  ]);
  assert.ok(summary.rows.some(([label, value]) => label === "Delayed Hits" && value === "1"));
});
