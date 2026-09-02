import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import * as THREE from "../vendor/three/three.module.js";
import {
  BINARY_FIELD_SPEED_RATIOS,
  solveCircularSelfHitSpanRowsWithPrescribedPathAnalysis,
} from "../src/apps/ideal-braid/IdealBraidPathPotentialProfile.js";
import {
  computePotentialSamplesWithPrescribedPathAnalysis,
  createIdealBraidPotentialSamplesRunRequest,
  IDEAL_BRAID_POTENTIAL_SOFTENING,
} from "../src/apps/ideal-braid/IdealBraidAnalysisAdapters.js";
import {
  IDEAL_BRAID_SURFACE_SOLVER_FAILURE_BACKOFF_MS,
  createIdealBraidSurfaceSolverScheduler,
} from "../src/apps/ideal-braid/IdealBraidSurfaceSolverScheduler.js";
import {
  computeAssemblyMomentumContractionMatrix,
  computeLorentzAlignedOrbitBasis,
  computeLorentzState,
  createIdealBraidMarkdownRuntime,
  createSurfaceSamples,
  createIdealBraidModel,
  mountIdealBraid,
  getOrbitPathTintProfile,
  navigateIdealBraidHome,
} from "../src/apps/ideal-braid/IdealBraidRuntime.js";
import {
  bootstrapIdealBraid,
} from "../src/apps/ideal-braid/main.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

test("Coincident-Midpoint Three-Axis Circular Lorentz Geometry model preserves stable ids and exposes indexed labels", () => {
  const model = createIdealBraidModel({ THREE });

  assert.equal(model.binaries.length, 3);
  assert.equal(model.architrinos.length, 6);
  assert.deepEqual(
    model.binaries.map((binary) => binary.id),
    ["inner", "middle", "outer"]
  );
  assert.deepEqual(
    model.binaries.map((binary) => binary.label),
    ["Binary 1", "Binary 2", "Binary 3"]
  );
  assert.deepEqual(
    model.binaries.map((binary) => binary.fieldSpeedRegime),
    ["faster", "field speed", "slower"]
  );
  assert.equal(model.fieldSpeed, model.binaries[1].speed);
  model.binaries.forEach((binary) => {
    assert.ok(Math.abs(binary.fieldSpeedRatio - binary.speed / model.fieldSpeed) < 1e-12);
    assert.ok(
      Math.abs(binary.fieldSpeedRatio - BINARY_FIELD_SPEED_RATIOS[binary.id]) < 1e-12
    );
  });
  assert.ok(Math.abs(model.binaries[0].fieldSpeedRatio - 1.1538461538461537) < 1e-12);
  assert.ok(Math.abs(model.binaries[2].fieldSpeedRatio - 0.7912087912087912) < 1e-12);
  assert.deepEqual(
    model.architrinos.map((architrino) => architrino.chargeType).slice(0, 2),
    ["positrino", "electrino"]
  );
});

test("standalone Coincident-Midpoint Three-Axis Circular Lorentz Geometry home navigation returns to the main webapp", () => {
  const assigned = [];
  const locationLike = {
    assign: (href) => assigned.push(href),
  };

  assert.equal(navigateIdealBraidHome(locationLike), true);
  assert.deepEqual(assigned, ["./index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json"]);
  assert.equal(navigateIdealBraidHome(locationLike, ""), false);
});

test("surface sample poles align with assembly momentum", () => {
  const samples = createSurfaceSamples(THREE);
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const firstPole = samples[0].unit;
  const lastPole = samples[samples.length - 1].unit;

  assert.ok(firstPole.distanceTo(assemblyMomentum) < 1e-12);
  assert.ok(lastPole.distanceTo(assemblyMomentum.clone().multiplyScalar(-1)) < 1e-12);
  assert.equal(samples.length, 2 + 23 * 48);
  assert.equal(
    samples.filter((sample) => sample.unit.distanceTo(firstPole) < 1e-12).length,
    1
  );
  assert.equal(
    samples.filter((sample) => sample.unit.distanceTo(lastPole) < 1e-12).length,
    1
  );
});

test("full potential is the prescribed-path analysis six-emission superposition", async () => {
  const model = createIdealBraidModel({ THREE });
  const samplePoint = new THREE.Vector3(1.8, -0.4, 0.65);
  const observationTime = 1.35;
  const runRequest = createIdealBraidPotentialSamplesRunRequest(
    [samplePoint],
    model,
    observationTime,
    {
      fieldSpeed: model.fieldSpeed,
      requestId: "ideal_potential_samples_request",
      runId: "ideal_potential_samples_run",
      datasetId: "ideal_potential_samples_dataset",
    }
  );
  const expectedPotentials = model.architrinos.map((architrino, index) =>
    architrino.q * (index + 1) * 0.25
  );
  runRequest.config.geometryRequest.delayedPotentials.forEach((row) => {
    assert.equal(row.fieldSpeed, model.fieldSpeed);
    assert.equal(row.softening, IDEAL_BRAID_POTENTIAL_SOFTENING);
  });
  const manualTotal = expectedPotentials.reduce((sum, potential) => sum + potential, 0);
  const snapshot = await computePotentialSamplesWithPrescribedPathAnalysis(
    [samplePoint],
    model,
    observationTime,
    {
      runRequest,
      async runPrescribedPathAnalysis(request) {
        assert.equal(request.requestId, "ideal_potential_samples_request");
        assert.equal(request.config.geometryRequest.delayedPotentials.length, 6);
        return createPotentialSamplesRunHandle(request, expectedPotentials);
      },
    }
  );

  assert.equal(snapshot.analysisId, "prescribed-path-analysis");
  assert.equal(snapshot.runId, "ideal_potential_samples_run");
  assert.ok(Math.abs(snapshot.samplePotentials[0] - manualTotal) < 1e-12);
  assert.equal(snapshot.contributionsBySample[0].length, 6);
});

test("Lorentz energy ledger separates rest, movement, and total energy", () => {
  const beta = 0.6;
  const state = computeLorentzState(beta, 1.62);

  assert.equal(state.restMass, 1);
  assert.equal(state.restEnergy, 1);
  assert.ok(Math.abs(state.gamma - 1.25) < 1e-12);
  assert.ok(Math.abs(state.restEnergyShareFactor - 0.8) < 1e-12);
  assert.ok(Math.abs(state.movementEnergy - 0.25) < 1e-12);
  assert.ok(Math.abs(state.movementMassEquivalent - 0.25) < 1e-12);
  assert.ok(Math.abs(state.totalEnergy - 1.25) < 1e-12);
  assert.ok(Math.abs(state.totalMassEquivalent - 1.25) < 1e-12);
});

test("Lorentz energy ledger treats beta equals one as a limit state", () => {
  const state = computeLorentzState(1, 1.62);

  assert.equal(state.restEnergyShareFactor, 0);
  assert.equal(state.lengthRatio, 0);
  assert.equal(state.gamma, Infinity);
  assert.equal(state.movementEnergy, Infinity);
  assert.equal(state.movementMassEquivalent, Infinity);
  assert.equal(state.totalEnergy, Infinity);
  assert.equal(state.totalMassEquivalent, Infinity);
});

test("Lorentz alignment tilts binary angular momentum normals toward assembly momentum", () => {
  const model = createIdealBraidModel({ THREE });
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const restState = computeLorentzState(0, 1.62);
  const limitState = computeLorentzState(1, 1.62);
  const movingState = computeLorentzState(0.8, 1.62);

  model.binaries.forEach((binary) => {
    const restBasis = computeLorentzAlignedOrbitBasis(THREE, binary.restBasis, restState);
    const movingBasis = computeLorentzAlignedOrbitBasis(THREE, binary.restBasis, movingState);
    const limitBasis = computeLorentzAlignedOrbitBasis(THREE, binary.restBasis, limitState);

    assert.ok(restBasis.normal.distanceTo(binary.restBasis.normal) < 1e-12);
    assert.ok(
      movingBasis.normal.dot(assemblyMomentum) > binary.restBasis.normal.dot(assemblyMomentum)
    );
    assert.ok(limitBasis.normal.distanceTo(assemblyMomentum) < 1e-12);
  });
});

test("assembly momentum contraction preserves the final shared orbit plane", () => {
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const limitState = computeLorentzState(1, 1.62);
  const contraction = computeAssemblyMomentumContractionMatrix(THREE, limitState);
  const collapsedMomentum = assemblyMomentum.clone().applyMatrix4(contraction);
  const inPlane = new THREE.Vector3(1, -1, 0).normalize();
  const contractedInPlane = inPlane.clone().applyMatrix4(contraction);

  assert.ok(collapsedMomentum.length() < 1e-10);
  assert.ok(contractedInPlane.distanceTo(inPlane) < 1e-10);
});

test("orbit path tint profiles distinguish inner middle and outer binaries", () => {
  const model = createIdealBraidModel({ THREE });
  const [inner, middle, outer] = model.binaries.map((binary) => getOrbitPathTintProfile(binary));

  assert.equal(middle.regime, "field speed");
  assert.equal(inner.regime, "faster");
  assert.equal(outer.regime, "slower");
  assert.equal(middle.forwardSpan, 0);
  assert.ok(middle.backwardSpan > 0);
  assert.ok(middle.backwardGain > 1);
  assert.ok(middle.wakeWidthScale > 1.4);
  assert.equal(inner.forwardSpan, 0);
  assert.ok(inner.backwardSpan > inner.forwardSpan);
  assert.ok(inner.backwardGain > 0.8);
  assert.ok(inner.backwardGain < middle.backwardGain);
  assert.ok(inner.falloff > middle.falloff);
  assert.ok(inner.wakeWidthScale > 1);
  assert.ok(inner.wakeWidthScale < middle.wakeWidthScale);
  assert.ok(outer.forwardSpan > outer.backwardSpan);
  assert.ok(outer.forwardWidthScale < 1);
  assert.ok(outer.wakeWidthScale > 2);
});

test("super-field profile expands from a cached prescribed circular self-hit row", () => {
  const model = createIdealBraidModel({ THREE });
  const innerBinary = model.binaries[0];
  const expectedSpan = 2.053476582744672;
  const pendingProfile = getOrbitPathTintProfile(innerBinary);
  const cachedProfile = getOrbitPathTintProfile({
    ...innerBinary,
    solverSelfHitSpan: expectedSpan,
  });

  assert.equal(pendingProfile.analysisProfileStatus, "pending-analysis-row");
  assert.equal(pendingProfile.selfHitSpan, 0);
  assert.ok(Math.abs(cachedProfile.selfHitSpan - expectedSpan) < 1e-12);
});

test("real prescribed-path analysis converges the super-field circular self-hit span", async () => {
  const [row] = await solveCircularSelfHitSpanRowsWithPrescribedPathAnalysis([1.2], {
    runId: "ideal-self-hit-real-integration",
  });
  assert.equal(row.analysisId, "prescribed-path-analysis");
  assert.equal(row.runId, "ideal-self-hit-real-integration");
  assert.equal(row.resultKind, "root_solved");
  assert.equal(row.rootFound, true);
  assert.equal(row.iterations, 31);
  assert.ok(Math.abs(row.span - 2.053476582744672) < 1e-12);
  assert.ok(Math.abs(row.residual) <= 1e-12);
});

test("Coincident-Midpoint Three-Axis Circular Lorentz Geometry circular self-hit spans can be batched through the prescribed-path analysis", async () => {
  const ratios = [1.2, 1.01, 0.8];
  const spans = [2.053476582744672, 0, 0];
  const rows = await solveCircularSelfHitSpanRowsWithPrescribedPathAnalysis(ratios, {
    requestId: "ideal_self_hit_batch_request",
    runId: "ideal_self_hit_batch_run",
    datasetId: "ideal_self_hit_batch_dataset",
    async runPrescribedPathAnalysis(request) {
      assert.equal(request.requestId, "ideal_self_hit_batch_request");
      assert.equal(request.config.geometryRequest.circularSelfHitSpans.length, 3);
      assert.equal(request.config.geometryRequest.circularSelfHitSpans[0].maxIterations, 48);
      return createSelfHitRunHandle(request, spans);
    },
  });

  assert.equal(rows.length, 3);
  assert.equal(rows[0].runId, "ideal_self_hit_batch_run");
  assert.equal(rows[0].rootFound, true);
  assert.equal(rows[1].rootFound, false);
  assert.equal(rows[2].rootFound, false);
  assert.ok(Math.abs(rows[0].span - spans[0]) < 1e-12);
});

test("surface scheduler uses the model field speed, documented softening, and no probe column", async () => {
  const model = createIdealBraidModel({ THREE });
  const samplePoints = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 1, 0),
  ];
  const requests = [];
  const snapshots = [];
  const scheduler = createIdealBraidSurfaceSolverScheduler({
    model,
    getStateKey: () => "state-a",
    getModelTime: () => 0.25,
    getSamplePoints: () => samplePoints,
    nowMs: () => 0,
    onSnapshot: (snapshot) => snapshots.push(snapshot),
    prescribedPathAnalysisOptions: {
      async runPrescribedPathAnalysis(request) {
        requests.push(request);
        return createPotentialSamplesRunHandle(
          request,
          request.config.geometryRequest.delayedPotentials.map(() => 0)
        );
      },
    },
  });

  assert.equal(scheduler.schedule({ force: true }), true);
  await flushAsyncWork();

  assert.equal(requests.length, 1);
  assert.equal(requests[0].config.geometryRequest.delayedPotentials.length, 12);
  requests[0].config.geometryRequest.delayedPotentials.forEach((row) => {
    assert.equal(row.fieldSpeed, model.fieldSpeed);
    assert.equal(row.softening, IDEAL_BRAID_POTENTIAL_SOFTENING);
  });
  assert.equal(snapshots.length, 1);
  assert.equal(snapshots[0].surfacePotentials.length, samplePoints.length);
  assert.equal("samplePotential" in snapshots[0], false);
});

test("surface scheduler reports failures and enforces retry backoff across state changes", async () => {
  const model = createIdealBraidModel({ THREE });
  let now = 0;
  let stateKey = "state-a";
  let callCount = 0;
  const errors = [];
  const scheduler = createIdealBraidSurfaceSolverScheduler({
    model,
    getStateKey: () => stateKey,
    getModelTime: () => 0,
    getSamplePoints: () => [new THREE.Vector3(1, 0, 0)],
    nowMs: () => now,
    onError: (error) => errors.push(error),
    prescribedPathAnalysisOptions: {
      async runPrescribedPathAnalysis() {
        callCount += 1;
        throw new Error("analysis offline");
      },
    },
  });

  assert.equal(scheduler.schedule({ force: true }), true);
  await flushAsyncWork();
  assert.equal(callCount, 1);
  assert.equal(errors.length, 1);

  stateKey = "state-b";
  scheduler.clearForStateChange();
  now = IDEAL_BRAID_SURFACE_SOLVER_FAILURE_BACKOFF_MS - 1;
  assert.equal(scheduler.schedule(), false);
  assert.equal(callCount, 1);

  now = IDEAL_BRAID_SURFACE_SOLVER_FAILURE_BACKOFF_MS + 1;
  assert.equal(scheduler.schedule(), true);
  await flushAsyncWork();
  assert.equal(callCount, 2);
});

test("guide links open their target document and reset/focus the markdown panel", async (t) => {
  const originalFetch = globalThis.fetch;
  const fetched = [];
  globalThis.fetch = async (path) => {
    fetched.push(String(path));
    return {
      ok: true,
      async text() {
        return "# Document";
      },
    };
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const markdownPanel = createFakeElement("markdown-panel");
  const markdownTitle = createFakeElement("markdown-title");
  const markdownContent = createFakeElement("markdown-content");
  const markdownBody = createFakeElement("markdown-body");
  const runtime = createIdealBraidMarkdownRuntime({
    documentLike: { title: "Coincident-Midpoint Three-Axis Circular Lorentz Geometry" },
    windowLike: {},
    markdownPanel,
    markdownTitle,
    markdownContent,
    markdownBody,
    markdownLayoutToggle: createFakeElement("markdown-layout-toggle"),
  });

  await runtime.showMarkdownPanel({
    name: "Coincident-Midpoint Three-Axis Circular Lorentz Geometry Guide",
    markdownPath: "content/markdown/aaa/archie/ideal-braid-guide.md",
    markdownColumns: 1,
  });
  markdownContent.scrollTop = 420;
  const link = {
    getAttribute: () => "../spacetime/lorentz-kinematics.md",
  };
  await markdownBody.dispatch("click", {
    defaultPrevented: false,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    preventDefault() {},
    target: {
      closest(selector) {
        return selector === "a[href]" ? link : null;
      },
    },
  });

  assert.equal(fetched.length, 2);
  assert.match(fetched[1], /content\/markdown\/aaa\/spacetime\/lorentz-kinematics\.md/);
  assert.equal(markdownTitle.textContent, "Lorentz Kinematics");
  assert.equal(markdownContent.scrollTop, 0);
  assert.equal(markdownContent.focused, true);
  assert.equal(markdownPanel.classList.contains("is-open"), true);
});

test("bootstrap failure produces a visible Coincident-Midpoint Three-Axis Circular Lorentz Geometry error banner", () => {
  const appElement = createFakeElement("ideal-braid-app");
  appElement.prepend = (child) => {
    appElement.prepended = child;
  };
  const documentLike = {
    getElementById: () => appElement,
    createElement: () => createFakeElement("ideal-braid-boot-error"),
  };
  const windowLike = {};
  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    const runtime = bootstrapIdealBraid({
      documentLike,
      windowLike,
      mount() {
        throw new Error("WebGL unavailable");
      },
    });
    assert.equal(runtime, null);
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(windowLike.__ARCHITRINO_IDEAL_BRAID_BOOT_ERROR__, "WebGL unavailable");
  assert.equal(appElement.prepended.id, "ideal-braid-boot-error");
  assert.match(appElement.prepended.textContent, /WebGL unavailable/);
});

test("mount smoke test binds the authored DOM and destroy releases listeners and scene assets", () => {
  const harness = createIdealBraidMountHarness();
  const runtime = mountIdealBraid({
    documentLike: harness.documentLike,
    windowLike: harness.windowLike,
    createRenderer: () => harness.renderer,
    ResizeObserver: harness.ResizeObserver,
    prescribedPathAnalysisOptions: {
      async runPrescribedPathAnalysis(request) {
        if (request.config.geometryRequest.circularSelfHitSpans) {
          return createSelfHitRunHandle(request, [2.053476582744672, 0, 0]);
        }
        return createPotentialSamplesRunHandle(
          request,
          request.config.geometryRequest.delayedPotentials.map(() => 0)
        );
      },
    },
  });

  assert.equal(runtime.architrinoGroup.parent, runtime.coreFrame);
  assert.equal(runtime.sphereContents.children.includes(runtime.architrinoGroup), false);
  assert.ok(harness.listenerCount() >= 20);
  let geometryDisposeCount = 0;
  let materialDisposeCount = 0;
  runtime.architrinoGroup.children[0].geometry.addEventListener(
    "dispose",
    () => {
      geometryDisposeCount += 1;
    }
  );
  runtime.architrinoGroup.children[0].material.addEventListener(
    "dispose",
    () => {
      materialDisposeCount += 1;
    }
  );

  runtime.destroy();
  runtime.destroy();

  assert.equal(harness.listenerCount(), 0);
  assert.equal(harness.resizeObserver.disconnected, true);
  assert.equal(harness.renderer.disposed, true);
  assert.equal(harness.windowLike.cancelledAnimationFrame, 1);
  assert.equal(geometryDisposeCount, 1);
  assert.equal(materialDisposeCount, 1);
});

function createSelfHitRunHandle(runRequest, spanOrSpans) {
  const requests = runRequest.config.geometryRequest.circularSelfHitSpans;
  const spans = Array.isArray(spanOrSpans) ? spanOrSpans : requests.map(() => spanOrSpans);
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        circularSelfHitSpans: requests.map((request, index) => {
          const span = spans[index] ?? 0;
          const rootFound = span > 0;
          return {
            itemIndex: index,
            statusCode: 0,
            fieldSpeedRatio: request.fieldSpeedRatio,
            fieldSpeedTolerance: request.fieldSpeedTolerance ?? 0.015,
            regime: request.fieldSpeedRatio > 1.015 ? "super_field" : "sub_or_field",
            resultKind: rootFound ? "root_solved" : "below_threshold",
            span,
            rootFound,
            bracketLow: span,
            bracketHigh: span,
            residual: 0,
            iterations: request.maxIterations ?? 48,
          };
        }),
      },
      status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    },
  };
}

function createPotentialSamplesRunHandle(runRequest, potentials) {
  const requests = runRequest.config.geometryRequest.delayedPotentials;
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        delayedPotentials: requests.map((request, index) => ({
          itemIndex: index,
          statusCode: 0,
          tau: 0.25 + index * 0.01,
          emissionTime: request.observationTime - 0.25 - index * 0.01,
          emissionPoint: { x: 0, y: 0, z: 0 },
          displacement: { x: 0, y: 0, z: 0 },
          distance: 1,
          denominator: 1,
          potential: potentials[index] ?? 0,
          kappa: 1,
          iterations: request.iterations,
          usedCausalDenominator: request.useCausalDenominator === true,
        })),
      },
      status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    },
  };
}

function flushAsyncWork() {
  return new Promise((resolve) => setImmediate(resolve));
}

function createFakeClassList() {
  const classes = new Set();
  return {
    add(...tokens) {
      tokens.forEach((token) => classes.add(token));
    },
    remove(...tokens) {
      tokens.forEach((token) => classes.delete(token));
    },
    toggle(token, force) {
      const shouldAdd = typeof force === "boolean" ? force : !classes.has(token);
      if (shouldAdd) {
        classes.add(token);
      } else {
        classes.delete(token);
      }
      return shouldAdd;
    },
    contains(token) {
      return classes.has(token);
    },
  };
}

function createFakeCanvasContext() {
  return {
    beginPath() {},
    clearRect() {},
    fill() {},
    fillRect() {},
    fillText() {},
    lineTo() {},
    moveTo() {},
    stroke() {},
    arc() {},
  };
}

function createFakeElement(id = "") {
  const attributes = new Map();
  const listeners = new Map();
  const element = {
    id,
    attributes,
    classList: createFakeClassList(),
    dataset: {},
    inert: false,
    innerHTML: "",
    scrollLeft: 0,
    scrollTop: 0,
    textContent: "",
    title: "",
    style: {
      setProperty() {},
    },
    value:
      id === "ideal-braid-radius-input"
        ? "1.62"
        : id === "ideal-braid-beta-input"
          ? "0"
          : id === "ideal-braid-speed-input"
            ? "1"
            : "",
    addEventListener(type, handler, options) {
      if (!listeners.has(type)) {
        listeners.set(type, new Set());
      }
      listeners.get(type).add(handler);
      options?.signal?.addEventListener?.(
        "abort",
        () => {
          listeners.get(type)?.delete(handler);
        },
        { once: true }
      );
    },
    dispatch(type, event) {
      const handlers = [...(listeners.get(type) ?? [])];
      return Promise.all(handlers.map((handler) => handler(event))).then((values) => values.at(-1));
    },
    focus() {
      element.focused = true;
    },
    getAttribute(key) {
      return attributes.get(key) ?? null;
    },
    setAttribute(key, value) {
      attributes.set(key, String(value));
    },
    removeAttribute(key) {
      attributes.delete(key);
    },
    getBoundingClientRect() {
      return { width: 960, height: 640 };
    },
    getContext(kind) {
      return kind === "2d" ? createFakeCanvasContext() : null;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    appendChild() {},
    contains() {
      return false;
    },
    setPointerCapture() {},
    releasePointerCapture() {},
    listenerCount() {
      return [...listeners.values()].reduce((sum, handlers) => sum + handlers.size, 0);
    },
  };
  return element;
}

function createIdealBraidMountHarness() {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  const authoredIds = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
  );
  const elements = new Map(
    [...authoredIds].map((id) => [id, createFakeElement(id)])
  );
  const documentEvents = createFakeElement("document");
  const windowEvents = createFakeElement("window");
  const documentLike = {
    title: "Coincident-Midpoint Three-Axis Circular Lorentz Geometry",
    activeElement: null,
    addEventListener: documentEvents.addEventListener,
    createElement: (tagName) => createFakeElement(tagName),
    querySelector(selector) {
      return selector.startsWith("#") ? elements.get(selector.slice(1)) ?? null : null;
    },
    getElementById(id) {
      return elements.get(id) ?? null;
    },
  };
  const renderer = {
    disposed: false,
    setPixelRatio() {},
    setClearColor() {},
    setSize() {},
    render() {},
    dispose() {
      renderer.disposed = true;
    },
  };
  const windowLike = {
    AbortController,
    addEventListener: windowEvents.addEventListener,
    devicePixelRatio: 2,
    history: {
      back() {},
      forward() {},
    },
    performance: { now: () => 0 },
    location: { assign() {} },
    requestAnimationFrame: () => 1,
    cancelAnimationFrame(id) {
      windowLike.cancelledAnimationFrame = id;
    },
  };
  let resizeObserver = null;
  class ResizeObserver {
    constructor(callback) {
      this.callback = callback;
      this.disconnected = false;
      resizeObserver = this;
    }
    observe() {}
    disconnect() {
      this.disconnected = true;
    }
  }
  return {
    documentLike,
    elements,
    listenerCount: () =>
      [...elements.values()].reduce((sum, element) => sum + element.listenerCount(), 0),
    renderer,
    ResizeObserver,
    get resizeObserver() {
      return resizeObserver;
    },
    windowLike,
  };
}

test("document and canvas titles use the facts-first public name", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  assert.match(html, /<title>Coincident-Midpoint Three-Axis Circular Lorentz Geometry<\/title>/);
  assert.doesNotMatch(html, /<title>A1 Lorentz Geometry<\/title>/);
  assert.match(
    html,
    /<div class="ideal-braid-title">Coincident-Midpoint Three-Axis Circular Lorentz Geometry<\/div>/,
  );
  assert.doesNotMatch(
    html,
    /<div class="ideal-braid-title">A1 Lorentz Geometry<\/div>/,
  );
});

test("Lorentz Geometry panels enforce a 12px minimum and render the field-speed subscript", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  const runtime = readFileSync(
    `${repoRoot}/src/apps/ideal-braid/IdealBraidRuntime.js`,
    "utf8",
  );
  const undersizedPixelFonts = [...html.matchAll(/font-size:\s*([0-9.]+)px/g)]
    .map((match) => Number(match[1]))
    .filter((fontSize) => fontSize < 12);
  assert.deepEqual(undersizedPixelFonts, []);
  assert.match(
    html,
    /\.ideal-braid-factor-card small\s*\{[^}]*font-size:\s*12px;/s,
  );
  assert.match(
    html,
    /<span class="ideal-braid-chart-label">&beta; = v \/ c<sub>f<\/sub><\/span>/,
  );
  assert.match(runtime, /stripContext\.font = "24px Helvetica Neue, Arial, sans-serif";/);
  assert.match(runtime, /const bottom = height - 30;/);
});

test("Lorentz Geometry omits dedicated Reset and Focus buttons while retaining canvas keyboard controls", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  const runtime = readFileSync(
    `${repoRoot}/src/apps/ideal-braid/IdealBraidRuntime.js`,
    "utf8",
  );
  assert.doesNotMatch(html, /id="ideal-braid-reset-button"/);
  assert.doesNotMatch(html, /id="ideal-braid-focus-button"/);
  assert.match(runtime, /event\.key\.toLowerCase\(\) === "r"/);
  assert.match(runtime, /canvas\.addEventListener\("pointerdown"/);
  assert.match(runtime, /canvas\.focus\(\);/);
  assert.match(runtime, /resetRotation\(\);/);
});

test("Lorentz Geometry places an icon-only play-pause control below the sphere", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  assert.match(
    html,
    /<button\s+id="ideal-braid-freeze-toggle"\s+class="ideal-braid-button ideal-braid-sphere-transport"/,
  );
  assert.doesNotMatch(html, /class="ideal-braid-control-label"/);
  const controlPanel = html.match(
    /<section class="ideal-braid-panel is-controls"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(controlPanel);
  assert.doesNotMatch(controlPanel, /id="ideal-braid-freeze-toggle"/);
});

test("Lorentz Geometry uses one widened left panel and hides its equation subsection in compact layouts", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  assert.match(
    html,
    /\.ideal-braid-panel\.is-upper-left\s*\{[^}]*width:\s*340px;/s,
  );
  assert.doesNotMatch(html, /class="ideal-braid-panel is-lower-left"/);
  const unifiedPanel = html.match(
    /<section class="ideal-braid-panel is-upper-left"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(unifiedPanel);
  assert.match(unifiedPanel, /<h2>Lorentz Map<\/h2>/);
  assert.match(unifiedPanel, /<h2>Noether Braid Equations<\/h2>/);
  assert.match(
    html,
    /@media \(max-width: 900px\), \(max-height: 680px\)[\s\S]*?\.ideal-braid-equation-section\s*\{[^}]*display:\s*none;/s,
  );
  assert.match(
    html,
    /@media \(max-width: 900px\), \(max-height: 680px\)[\s\S]*?\.ideal-braid-factor-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\);/s,
  );
});

test("Lorentz Geometry stacks information and controls in a scrollable left rail", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  assert.match(
    html,
    /\.ideal-braid-left-rail\s*\{[^}]*width:\s*340px;[^}]*overflow-y:\s*auto;/s,
  );
  assert.match(
    html,
    /@media \(max-width: 900px\), \(max-height: 680px\)[\s\S]*?\.ideal-braid-left-rail\s*\{[^}]*bottom:\s*206px;/s,
  );
  const rail = html.match(
    /<div\s+class="ideal-braid-left-rail"[\s\S]*?<\/div>\s*<section class="ideal-braid-panel is-lower-right"/,
  )?.[0];
  assert.ok(rail);
  const informationIndex = rail.indexOf(
    'class="ideal-braid-panel is-upper-left"',
  );
  const controlsIndex = rail.indexOf(
    'class="ideal-braid-panel is-controls"',
  );
  assert.ok(informationIndex >= 0);
  assert.ok(controlsIndex > informationIndex);
});

test("Lorentz Geometry selector text matches the Controls heading size", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  assert.match(
    html,
    /\.ideal-braid-panel h2\s*\{[^}]*font-size:\s*13px;/s,
  );
  assert.match(
    html,
    /\.ideal-braid-geometry-picker select\s*\{[^}]*font-size:\s*13px;/s,
  );
  assert.match(
    html,
    /@media \(max-width: 900px\), \(max-height: 680px\)[\s\S]*?\.ideal-braid-panel h2\s*\{[^}]*font-size:\s*12px;[\s\S]*?\.ideal-braid-geometry-picker label,\s*\.ideal-braid-geometry-picker select\s*\{[^}]*font-size:\s*12px;/s,
  );
});

test("Lorentz Geometry uses the shared standalone navigation strip and no panel home button", () => {
  const html = readFileSync(`${repoRoot}/ideal-braid.html`, "utf8");
  const causalHtml = readFileSync(
    `${repoRoot}/causal-delay-feedback.html`,
    "utf8",
  );
  const runtime = readFileSync(
    `${repoRoot}/src/apps/ideal-braid/IdealBraidRuntime.js`,
    "utf8",
  );
  const sharedStylesheet =
    "./src/apps/navigator/standalone-app-navigation.css";

  assert.match(html, new RegExp(sharedStylesheet.replaceAll(".", "\\.")));
  assert.match(causalHtml, new RegExp(sharedStylesheet.replaceAll(".", "\\.")));
  for (const id of [
    "textbook-toc-button",
    "nav-up",
    "nav-forward",
    "home-button",
    "scene-search-toggle",
    "scene-search-panel",
    "scene-search-input",
    "scene-search-results",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(html, /id="ideal-braid-home-button"/);
  const controlsPanel = html.match(
    /<section class="ideal-braid-panel is-controls"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(controlsPanel);
  assert.doesNotMatch(controlsPanel, /aria-label="Go to home"/);
  assert.match(runtime, /createStandaloneAppSceneSearchRuntime/);
  assert.match(runtime, /TEXTBOOK_TOC_SCENE_PATH/);
  assert.match(runtime, /windowLike\?\.history\?\.back\?\.\(\)/);
  assert.match(runtime, /windowLike\?\.history\?\.forward\?\.\(\)/);
});
