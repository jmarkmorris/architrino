import test from "node:test";
import assert from "node:assert/strict";

import {
  PHOTON_CONTROL_RANGES,
  PHOTON_LAYER_SPEED_RATIO_TARGETS,
  createDefaultPhotonState,
  getPhotonLayerEnabled,
  getPhotonLayerAngleRadians,
  getPhotonLayerTangentialSpeedRatio,
  getPhotonMiddleCycleBounds,
  getPhotonRunDuration,
  normalizePhotonState,
  parsePhotonStateJson,
  serializePhotonState,
} from "../src/apps/photon/PhotonStateRuntime.js";
import {
  getPhotonControlZeroPositionPercent,
  getPhotonControlZeroSnapThreshold,
  snapPhotonControlValueToZero,
} from "../src/apps/photon/PhotonControlsRuntime.js";
import {
  buildPhotonArchitrinoSourceRefs,
  buildPhotonPlotSamples,
  computePhotonDelayedEmissionField,
  computePhotonFormulaSummary,
  computePhotonObserverField,
} from "../src/apps/photon/PhotonFormulaRuntime.js";
import {
  computePhotonDiagnostics,
  getPhotonDiagnosticRows,
} from "../src/apps/photon/PhotonDiagnosticsRuntime.js";
import { shouldHandlePhotonSpaceToggle } from "../src/apps/photon/PhotonRuntime.js";
import { computePhotonStageLayout } from "../src/apps/photon/PhotonSwarmVisualRuntime.js";

function assertNear(actual, expected, epsilon = 1e-12) {
  assert.ok(Math.abs(actual - expected) < epsilon, `${actual} should be near ${expected}`);
}

test("default photon state encodes trailing and leading swarm convention", () => {
  const state = createDefaultPhotonState();

  assert.equal(state.pair.left.role, "trailing");
  assert.equal(state.pair.left.direction, "ccw");
  assert.equal(state.pair.right.role, "leading");
  assert.equal(state.pair.right.direction, "cw");
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => state.pair.left.layers[layerId].phaseDeg),
    [0, 0, 0]
  );
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => state.pair.left.layers[layerId].radius),
    [0.9, 1.26, 1.62]
  );
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      assertNear(
        getPhotonLayerTangentialSpeedRatio(state, swarmId, layerId),
        PHOTON_LAYER_SPEED_RATIO_TARGETS[layerId]
      );
    });
  });
  assert.deepEqual(state.measurement.testPoint, { x: 6, y: 0, z: 0 });
  assert.equal(state.measurement.emissionSpeedCf, 1);
  assert.deepEqual(
    ["left", "right"].flatMap((swarmId) =>
      ["I", "M", "O"].map((layerId) => getPhotonLayerEnabled(state, swarmId, layerId))
    ),
    [true, true, true, true, true, true]
  );
});

test("photon middle cycle spans the middle of the three-cycle E-B plot", () => {
  const state = createDefaultPhotonState();
  const runDuration = getPhotonRunDuration(state);
  const bounds = getPhotonMiddleCycleBounds(state);
  const referenceFrequency = state.pair.left.layers.M.frequencyHz;

  assertNear(runDuration, 3 / referenceFrequency);
  assertNear(bounds.start, runDuration / 3);
  assertNear(bounds.end, (runDuration * 2) / 3);
});

test("left swarm angles advance counter-clockwise while right swarm angles advance clockwise", () => {
  const state = createDefaultPhotonState();
  const leftStart = getPhotonLayerAngleRadians(state, "left", "I", 0);
  const leftLater = getPhotonLayerAngleRadians(state, "left", "I", 1);
  const rightStart = getPhotonLayerAngleRadians(state, "right", "I", 0);
  const rightLater = getPhotonLayerAngleRadians(state, "right", "I", 1);

  assert.ok(leftLater > leftStart);
  assert.ok(rightLater < rightStart);
});

test("default observer field is computed from delayed architrino emissions", () => {
  const state = createDefaultPhotonState();
  const field = computePhotonObserverField(state, 0);

  assert.equal(field.sourceMode, "delayed_architrino_emissions");
  assert.equal(field.sourceCount, 12);
  assert.equal(field.contributions.length, 12);
  assert.ok(Number.isFinite(field.electric.y));
  assert.ok(Number.isFinite(field.electric.z));
  assert.ok(Number.isFinite(field.comparisonB.z));
  assert.ok(Number.isFinite(field.analyzer.passMeasure));
  assert.ok(field.averageDelay > 0);
  assertNear(field.maxSourceSpeedRatio, PHOTON_LAYER_SPEED_RATIO_TARGETS.I);
  assert.ok(field.delaySolveGapMax >= 0);
});

test("disabled binaries are removed from delayed emission sources", () => {
  const state = createDefaultPhotonState();
  state.pair.left.layers.M.enabled = false;
  const refs = buildPhotonArchitrinoSourceRefs(state);
  const field = computePhotonDelayedEmissionField(state, 0.25);

  assert.equal(refs.length, 10);
  assert.equal(field.sourceCount, 10);
  assert.equal(field.contributions.length, 10);
  assert.equal(
    field.contributions.some(
      (contribution) => contribution.kinematics.swarmId === "left" && contribution.kinematics.layerId === "M"
    ),
    false
  );
});

test("all disabled binaries produce zero delayed field", () => {
  const state = createDefaultPhotonState();
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = false;
    });
  });
  const field = computePhotonDelayedEmissionField(state, 0.5);

  assert.equal(field.sourceCount, 0);
  assert.deepEqual(field.electric, { x: 0, y: 0, z: 0 });
  assert.deepEqual(field.comparisonB, { x: 0, y: 0, z: 0 });
  assert.equal(field.maxSourceSpeedRatio, 0);
  assert.equal(field.delaySolveGapMax, 0);
  assert.equal(field.unstableSourceCount, 0);
});

test("outer-only default stays below field speed and has a stable delay solve", () => {
  const state = createDefaultPhotonState();
  state.measurement.testPoint = { x: 0, y: 4, z: 0 };
  state.measurement.nearFieldWeight = 0.09;
  state.measurement.fieldGain = 1;
  ["left", "right"].forEach((swarmId) => {
    ["I", "M"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = false;
    });
    state.pair[swarmId].layers.O.phaseDeg = 0;
  });
  const field = computePhotonDelayedEmissionField(state, 3);
  const diagnostics = computePhotonDiagnostics(state, 3, computePhotonFormulaSummary(state, 3));
  const diagnosticRows = new Map(getPhotonDiagnosticRows(state, 3, computePhotonFormulaSummary(state, 3)));

  assert.equal(field.sourceCount, 4);
  assert.ok(field.maxSourceSpeedRatio < 1);
  assert.ok(field.delaySolveGapMax < 0.01);
  assert.equal(field.unstableSourceCount, 0);
  assert.equal(diagnostics.maxSourceSpeedRatio < 1, true);
  assert.equal(diagnosticRows.get("Delay status"), "stable");
});

test("outer-only super field speed settings report unstable delay solve", () => {
  const state = createDefaultPhotonState();
  state.measurement.testPoint = { x: 0, y: 4, z: 0 };
  ["left", "right"].forEach((swarmId) => {
    ["I", "M"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = false;
    });
    state.pair[swarmId].layers.O.frequencyHz = 0.16;
    state.pair[swarmId].layers.O.phaseDeg = 0;
  });
  const field = computePhotonDelayedEmissionField(state, 3);
  const diagnosticRows = new Map(getPhotonDiagnosticRows(state, 3, computePhotonFormulaSummary(state, 3)));

  assert.equal(field.sourceCount, 4);
  assert.ok(field.maxSourceSpeedRatio > 1);
  assert.ok(field.unstableSourceCount > 0);
  assert.equal(diagnosticRows.get("Delay status"), "unstable");
});

test("moving the measurement test point changes the delayed emission field", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonDelayedEmissionField(state, 0.75);
  state.measurement.testPoint.x = 2.75;
  state.measurement.testPoint.y = 1.4;
  const moved = computePhotonDelayedEmissionField(state, 0.75);

  assert.notEqual(base.electric.y.toFixed(8), moved.electric.y.toFixed(8));
  assert.notEqual(base.averageDelay.toFixed(8), moved.averageDelay.toFixed(8));
});

test("plot samples expose middle-cycle guide bounds and active left-to-right trace", () => {
  const state = createDefaultPhotonState();
  const plot = buildPhotonPlotSamples(state, getPhotonRunDuration(state) / 2, 30);

  assert.equal(plot.samples[0].active, true);
  assert.equal(plot.samples.at(-1).active, false);
  assert.ok(Math.abs(plot.middleCycle.start - plot.runDuration / 3) < 1e-12);
  assert.ok(Math.abs(plot.middleCycle.end - (plot.runDuration * 2) / 3) < 1e-12);
  assert.ok(plot.amplitudeScale > 0);
  assert.deepEqual(
    Object.keys(plot.samples[0]).filter((key) => /^[eb][yz]$/.test(key)).sort(),
    ["by", "bz", "ey", "ez"]
  );
  assert.deepEqual(
    Object.keys(plot.samples[0]).filter((key) => /^[eb][uv]$/.test(key)),
    []
  );
});

test("photon stage keeps face-on swarm spacing fixed while side view separation changes", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonStageLayout(state, 933, 466);
  state.pair.pairSeparation = PHOTON_CONTROL_RANGES.pairSeparation.min;
  const nearCoLocated = computePhotonStageLayout(state, 933, 466);
  state.pair.pairSeparation = PHOTON_CONTROL_RANGES.pairSeparation.max;
  const separated = computePhotonStageLayout(state, 933, 466);

  assert.equal(base.faceLeftX, separated.faceLeftX);
  assert.equal(base.faceRightX, separated.faceRightX);
  assert.equal(PHOTON_CONTROL_RANGES.pairSeparation.min, 0.05);
  assert.equal(PHOTON_CONTROL_RANGES.pairSeparation.max, 50);
  assert.ok(
    nearCoLocated.sideRightX - nearCoLocated.sideLeftX < base.sideRightX - base.sideLeftX
  );
  assert.ok(nearCoLocated.sideRightX - nearCoLocated.sideLeftX > 0);
  assert.equal(base.translationOriginX, (base.sideLeftX + base.sideRightX) / 2);
  assert.equal(
    nearCoLocated.translationOriginX,
    (nearCoLocated.sideLeftX + nearCoLocated.sideRightX) / 2
  );
  assert.equal(separated.translationOriginX, (separated.sideLeftX + separated.sideRightX) / 2);
  assert.ok(
    separated.sideRightX - separated.sideLeftX > base.sideRightX - base.sideLeftX
  );
});

test("photon side-view height follows the largest enabled binary", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonStageLayout(state, 933, 466);
  state.pair.left.layers.O.enabled = false;
  state.pair.right.layers.O.enabled = false;
  const withoutOuter = computePhotonStageLayout(state, 933, 466);

  assert.ok(base.sideHalfHeight > withoutOuter.sideHalfHeight);
  assert.ok(withoutOuter.sideHalfHeight > 0);
});

test("test point slider zero helpers mark and snap near zero", () => {
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.testPointX), 50);
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.testPointY), 50);
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.fieldGain), null);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.testPointX), 0.25);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.testPointY), 0.1);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.fieldGain), null);

  assert.equal(snapPhotonControlValueToZero(0.05, PHOTON_CONTROL_RANGES.testPointX), 0);
  assert.equal(snapPhotonControlValueToZero(0.25, PHOTON_CONTROL_RANGES.testPointX), 0);
  assert.equal(snapPhotonControlValueToZero(-0.25, PHOTON_CONTROL_RANGES.testPointX), 0);
  assert.equal(snapPhotonControlValueToZero(0.3, PHOTON_CONTROL_RANGES.testPointX), 0.3);
  assert.equal(snapPhotonControlValueToZero(-0.1, PHOTON_CONTROL_RANGES.testPointY), 0);
  assert.equal(snapPhotonControlValueToZero(0.15, PHOTON_CONTROL_RANGES.testPointZ), 0.15);
  assert.equal(snapPhotonControlValueToZero(0.05, PHOTON_CONTROL_RANGES.fieldGain), 0.05);
});

test("state JSON round trips through normalization", () => {
  const state = createDefaultPhotonState();
  state.polarization.linearAngleDeg = 45;
  state.pair.right.layers.M.frequencyHz = 0.39;
  state.pair.right.layers.O.enabled = false;
  state.measurement.testPoint.x = 5.25;
  state.measurement.testPoint.y = -1.5;
  const parsed = parsePhotonStateJson(serializePhotonState(state));

  assert.equal(parsed.polarization.linearAngleDeg, 45);
  assert.equal(parsed.pair.right.layers.M.frequencyHz, 0.39);
  assert.equal(parsed.pair.right.layers.O.enabled, false);
  assert.equal(parsed.measurement.testPoint.x, 5.25);
  assert.equal(parsed.measurement.testPoint.y, -1.5);
  assert.deepEqual(parsed, normalizePhotonState(parsed));
});

test("formula summary reports a Malus residual for the current analyzer setup", () => {
  const state = createDefaultPhotonState();
  state.polarization.linearAngleDeg = 30;
  state.polarization.analyzerAngleDeg = 60;
  const summary = computePhotonFormulaSummary(state, 0.5);

  assert.ok(Number.isFinite(summary.malusTarget));
  assert.ok(Number.isFinite(summary.malusResidual));
  assert.ok(Math.abs(summary.malusTarget - 0.75) < 1e-12);
});

test("spacebar playback shortcut ignores editable controls", () => {
  const baseEvent = {
    key: " ",
    code: "Space",
    defaultPrevented: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
  };

  assert.equal(shouldHandlePhotonSpaceToggle({ ...baseEvent, target: { tagName: "BODY" } }), true);

  for (const tagName of ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "OPTION"]) {
    assert.equal(
      shouldHandlePhotonSpaceToggle({ ...baseEvent, target: { tagName } }),
      false,
      tagName
    );
  }

  assert.equal(
    shouldHandlePhotonSpaceToggle({
      ...baseEvent,
      target: { tagName: "DIV", isContentEditable: true },
    }),
    false
  );
  assert.equal(
    shouldHandlePhotonSpaceToggle({ ...baseEvent, key: "Enter", code: "Enter" }),
    false
  );
});
