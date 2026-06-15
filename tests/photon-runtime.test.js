import test from "node:test";
import assert from "node:assert/strict";

import {
  PHOTON_CONTROL_RANGES,
  PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER,
  PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ,
  PHOTON_LAYER_SPEED_RATIO_TARGETS,
  createDefaultPhotonState,
  getPhotonLayerEnabled,
  getPhotonLayerAngleRadians,
  getPhotonLayerRadiusBounds,
  getPhotonFrequencyExponent,
  getPhotonFrequencyFromExponent,
  getPhotonPairSeparationFromLog10Ratio,
  getPhotonSeparationLog10Ratio,
  getPhotonSeparationReferenceRadius,
  getPhotonLayerTangentialSpeedRatio,
  getPhotonMiddleCycleBounds,
  getPhotonRunDuration,
  normalizePhotonState,
  setPhotonLayerValue,
} from "../src/apps/photon/PhotonStateRuntime.js";
import {
  PHOTON_NAMED_PRESETS,
  createPhotonPresetState,
} from "../src/apps/photon/PhotonPresetRuntime.js";
import {
  getPhotonControlZeroPositionPercent,
  getPhotonControlZeroSnapThreshold,
  getPhotonPlaybackSpeedMultiplier,
  getPhotonPlaybackSpeedSliderValue,
  getPhotonSeparationLog10RatioFromParts,
  getPhotonSeparationLogTick,
  getPhotonSeparationLogTicks,
  snapPhotonSeparationLogTick,
  snapPhotonControlValueToZero,
  snapPhotonPhaseDegrees,
  snapPhotonRangeControlValue,
} from "../src/apps/photon/PhotonControlsRuntime.js";
import {
  buildPhotonArchitrinoSourceRefs,
  buildPhotonDerivedPolarizationTrace,
  buildPhotonPlotSamples,
  computePhotonDelayedEmissionField,
  computePhotonFormulaSummary,
  computePhotonObserverField,
  fitPhotonPolarizationFromSamples,
  solvePhotonCausalRoots,
} from "../src/apps/photon/PhotonFormulaRuntime.js";
import {
  computePhotonDiagnostics,
  getPhotonDiagnosticRows,
} from "../src/apps/photon/PhotonDiagnosticsRuntime.js";
import {
  advancePhotonModelTime,
  getPhotonRuntimeTimes,
  shouldHandlePhotonSpaceToggle,
} from "../src/apps/photon/PhotonRuntime.js";
import {
  computePhotonStageLayout,
  getPhotonFieldPlotSampleCount,
  isPhotonPlotSampleInForwardGap,
} from "../src/apps/photon/PhotonSwarmVisualRuntime.js";

function assertNear(actual, expected, epsilon = 1e-12) {
  assert.ok(Math.abs(actual - expected) < epsilon, `${actual} should be near ${expected}`);
}

function buildSyntheticPolarizationSamples({ ampY = 1, ampZ = 0, phaseLag = 0, count = 144 } = {}) {
  return Array.from({ length: count }, (_, index) => {
    const progress = index / count;
    const phase = Math.PI * 2 * progress;
    return {
      progress,
      phase,
      ey: ampY * Math.cos(phase),
      ez: ampZ * Math.cos(phase + phaseLag),
    };
  });
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
    ["I", "M", "O"].map((layerId) => state.pair.left.layers[layerId].frequencyHz),
    ["I", "M", "O"].map((layerId) => PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ[layerId])
  );
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => state.pair.right.layers[layerId].frequencyHz),
    ["I", "M", "O"].map((layerId) => PHOTON_DEFAULT_LAYER_FREQUENCIES_HZ[layerId])
  );
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      assertNear(
        getPhotonLayerTangentialSpeedRatio(state, swarmId, layerId),
        PHOTON_LAYER_SPEED_RATIO_TARGETS[layerId]
      );
    });
  });
  assert.deepEqual(state.measurement.virtualObserver, { x: 0, y: 0, z: 0 });
  assert.equal(state.measurement.emissionSpeedCf, 1);
  assert.deepEqual(state.polarization, { analyzerAngleDeg: 0 });
  assert.equal(state.view.rawPolarizationVisible, true);
  assert.equal(state.pair.pairSeparation, getPhotonSeparationReferenceRadius(state));
  assert.equal(getPhotonSeparationLog10Ratio(state), 0);
  assert.deepEqual(
    ["left", "right"].flatMap((swarmId) =>
      ["I", "M", "O"].map((layerId) => getPhotonLayerEnabled(state, swarmId, layerId))
    ),
    [true, true, true, true, true, true]
  );
});

test("photon plot duration spans three middle-layer cycles", () => {
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

test("default observer field is computed from Virtual Observer branch sums", () => {
  const state = createDefaultPhotonState();
  const field = computePhotonObserverField(state, 0);

  assert.equal(field.sourceMode, "virtual_observer_branch_sum");
  assert.equal(field.sourceCount, 12);
  assert.equal(field.rootCount, field.contributions.length);
  assert.ok(field.rootCount >= field.sourceCount);
  assert.ok(Number.isFinite(field.electric.y));
  assert.ok(Number.isFinite(field.electric.z));
  assert.ok(Number.isFinite(field.comparisonB.z));
  assert.ok(Number.isFinite(field.receiverAcceleration.x));
  assert.ok(Number.isFinite(field.analyzer.fraction));
  assert.ok(field.averageDelay > 0);
  assertNear(field.maxSourceSpeedRatio, PHOTON_LAYER_SPEED_RATIO_TARGETS.I);
  assert.ok(field.delaySolveGapMax >= 0);
  assert.ok(field.jacobianAbsMin > 0);
  assert.equal(field.unstableSourceCount, 0);

  const diagnosticRowList = getPhotonDiagnosticRows(state, 0, computePhotonFormulaSummary(state, 0));
  const diagnosticRows = new Map(diagnosticRowList);
  assert.equal(diagnosticRows.get("Delay status"), "stable");
  assert.equal(
    diagnosticRowList.find(([label]) => label === "Max source v/c_f")?.[2],
    "info"
  );
  assert.equal(
    diagnosticRowList.find(([label]) => label === "Delay status")?.[2],
    "good"
  );
});

test("disabled binaries are removed from branch-sum sources", () => {
  const state = createDefaultPhotonState();
  state.pair.left.layers.M.enabled = false;
  const refs = buildPhotonArchitrinoSourceRefs(state);
  const field = computePhotonDelayedEmissionField(state, 0.25);

  assert.equal(refs.length, 10);
  assert.equal(field.sourceCount, 10);
  assert.equal(field.rootCount, field.contributions.length);
  assert.equal(
    field.contributions.some(
      (contribution) => contribution.kinematics.swarmId === "left" && contribution.kinematics.layerId === "M"
    ),
    false
  );
});

test("all disabled binaries produce zero branch-sum field", () => {
  const state = createDefaultPhotonState();
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = false;
    });
  });
  const field = computePhotonDelayedEmissionField(state, 0.5);

  assert.equal(field.sourceCount, 0);
  assert.equal(field.rootCount, 0);
  assert.deepEqual(field.electric, { x: 0, y: 0, z: 0 });
  assert.deepEqual(field.comparisonB, { x: 0, y: 0, z: 0 });
  assert.equal(field.maxSourceSpeedRatio, 0);
  assert.equal(field.delaySolveGapMax, 0);
  assert.equal(field.unstableSourceCount, 0);
  assert.equal(field.unresolvedSourceCount, 0);
});

test("outer-only default stays below field speed and has a stable branch solve", () => {
  const state = createDefaultPhotonState();
  state.measurement.virtualObserver = { x: 0, y: 4, z: 0 };
  ["left", "right"].forEach((swarmId) => {
    ["I", "M"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = false;
    });
    state.pair[swarmId].layers.O.phaseDeg = 0;
  });
  const field = computePhotonDelayedEmissionField(state, 3);
  const formulaSummary = computePhotonFormulaSummary(state, 3);
  const diagnostics = computePhotonDiagnostics(state, 3, formulaSummary);
  const diagnosticRowList = getPhotonDiagnosticRows(state, 3, formulaSummary);
  const diagnosticRows = new Map(diagnosticRowList);

  assert.equal(field.sourceCount, 4);
  assert.equal(field.rootCount, field.contributions.length);
  assert.ok(field.maxSourceSpeedRatio < 1);
  assert.ok(field.delaySolveGapMax < 0.01);
  assert.ok(field.jacobianAbsMin > 0);
  assert.equal(field.unresolvedSourceCount, 0);
  assert.equal(field.unstableSourceCount, 0);
  assert.equal(diagnostics.maxSourceSpeedRatio < 1, true);
  assert.equal(diagnosticRows.get("Delay status"), "stable");
  assert.equal(
    diagnosticRowList.find(([label]) => label === "Delay status")?.[2],
    "good"
  );
  assert.equal(
    diagnosticRowList.find(([label]) => label === "Missed sources")?.[2],
    "great"
  );
});

test("outer-only super field speed settings stay stable when causal roots are clean", () => {
  const state = createDefaultPhotonState();
  state.measurement.virtualObserver = { x: 0, y: 4, z: 0 };
  ["left", "right"].forEach((swarmId) => {
    ["I", "M"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].enabled = false;
    });
    state.pair[swarmId].layers.O.frequencyHz = 16;
    state.pair[swarmId].layers.O.phaseDeg = 0;
  });
  const field = computePhotonDelayedEmissionField(state, 3);
  const diagnosticRowList = getPhotonDiagnosticRows(state, 3, computePhotonFormulaSummary(state, 3));
  const diagnosticRows = new Map(diagnosticRowList);

  assert.equal(field.sourceCount, 4);
  assert.ok(field.rootCount >= field.sourceCount);
  assert.ok(field.maxSourceSpeedRatio > 1);
  assert.equal(field.unstableSourceCount, 0);
  assert.equal(diagnosticRows.get("Delay status"), "stable");
  assert.equal(
    diagnosticRowList.find(([label]) => label === "Max source v/c_f")?.[2],
    "info"
  );
  assert.equal(
    diagnosticRowList.find(([label]) => label === "Delay status")?.[2],
    "good"
  );
});

test("moving the Virtual Observer changes the branch-sum field", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonDelayedEmissionField(state, 0.75);
  state.measurement.virtualObserver.x = 2.75;
  state.measurement.virtualObserver.y = 1.4;
  const moved = computePhotonDelayedEmissionField(state, 0.75);

  assert.notEqual(base.electric.y.toFixed(8), moved.electric.y.toFixed(8));
  assert.notEqual(base.averageDelay.toFixed(8), moved.averageDelay.toFixed(8));
});

test("causal-root solver returns branch roots with Jacobian-weighted contributions", () => {
  const state = createDefaultPhotonState();
  const sourceRef = { swarmId: "left", layerId: "O", chargeType: "positrino" };
  const roots = solvePhotonCausalRoots(state, sourceRef, 0.75);
  const field = computePhotonDelayedEmissionField(state, 0.75);

  assert.ok(roots.length >= 1);
  roots.forEach((root) => {
    assert.ok(Math.abs(root.residual) < 1e-4);
    assert.ok(root.delay > 0);
  });
  assert.ok(field.contributions.every((contribution) => Number.isFinite(contribution.jacobianWeight)));
  assert.ok(field.contributions.every((contribution) => contribution.jacobianWeight > 0));
});

test("large Sep/r still uses the full causal-root scanner", () => {
  const state = createDefaultPhotonState();
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(
    state,
    PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.max
  );
  const sourceRef = { swarmId: "left", layerId: "O", chargeType: "positrino" };
  const roots = solvePhotonCausalRoots(state, sourceRef, 0.75);

  assert.ok(roots.length >= 1);
  roots.forEach((root) => {
    assert.equal("solveMode" in root, false);
    assert.ok(Math.abs(root.residual) < 1e-4);
  });
});

test("plot samples expose full trace data with a small forward now gap", () => {
  const state = createDefaultPhotonState();
  const plot = buildPhotonPlotSamples(state, getPhotonRunDuration(state) / 2, 30);

  assert.ok(plot.amplitudeScale > 0);
  assert.equal(getPhotonFieldPlotSampleCount(200), 360);
  assert.equal(getPhotonFieldPlotSampleCount(933), 700);
  assert.equal(getPhotonFieldPlotSampleCount(2000), 900);
  assert.equal(isPhotonPlotSampleInForwardGap(0.1, 0, 0.15), true);
  assert.equal(isPhotonPlotSampleInForwardGap(0.2, 0, 0.15), false);
  assert.equal(isPhotonPlotSampleInForwardGap(0.04, 0.94, 0.15), true);
  assert.equal(isPhotonPlotSampleInForwardGap(0.4, 0.94, 0.15), false);
  assert.deepEqual(
    Object.keys(plot.samples[0]).filter((key) => /^[eb][yz]$/.test(key)).sort(),
    ["ey", "ez"]
  );
  assert.deepEqual(
    Object.keys(plot.samples[0]).filter((key) => /^[eb][uv]$/.test(key)),
    []
  );
});

test("photon stage keeps face-on swarm spacing fixed while side view separation changes", () => {
  const state = createDefaultPhotonState();
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(state, -6);
  const base = computePhotonStageLayout(state, 933, 466);
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(
    state,
    PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.min
  );
  const nearCoLocated = computePhotonStageLayout(state, 933, 466);
  state.pair.pairSeparation = getPhotonPairSeparationFromLog10Ratio(
    state,
    PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.max
  );
  const separated = computePhotonStageLayout(state, 933, 466);

  assert.equal(base.faceLeftX, separated.faceLeftX);
  assert.equal(base.faceRightX, separated.faceRightX);
  assert.equal(PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.min, -10);
  assert.equal(PHOTON_CONTROL_RANGES.pairSeparationLog10Ratio.max, 5);
  assert.ok(
    nearCoLocated.sideRightX - nearCoLocated.sideLeftX < base.sideRightX - base.sideLeftX
  );
  assert.ok(nearCoLocated.sideRightX - nearCoLocated.sideLeftX > 0);
  assert.equal(base.translationOriginX, (base.sideLeftX + base.sideRightX) / 2);
  assert.ok(base.translationAxisStartX >= base.faceRightX + base.sideHalfHeight);
  assert.ok(base.translationAxisStartX < base.sideLeftX);
  assert.equal(
    nearCoLocated.translationOriginX,
    (nearCoLocated.sideLeftX + nearCoLocated.sideRightX) / 2
  );
  assert.ok(nearCoLocated.translationAxisStartX >= nearCoLocated.faceRightX + nearCoLocated.sideHalfHeight);
  assert.ok(nearCoLocated.translationAxisStartX < nearCoLocated.sideLeftX);
  assert.equal(separated.translationOriginX, (separated.sideLeftX + separated.sideRightX) / 2);
  assert.ok(separated.translationAxisStartX >= separated.faceRightX + separated.sideHalfHeight);
  assert.ok(separated.translationAxisStartX < separated.sideLeftX);
  assert.ok(
    separated.sideRightX - separated.sideLeftX > base.sideRightX - base.sideLeftX
  );
});

test("photon face-on swarm scale is independent per swarm", () => {
  const state = createDefaultPhotonState();
  const base = computePhotonStageLayout(state, 933, 466);
  const leadingInnerRadius = state.pair.right.layers.I.radius;
  const leadingInnerPixelRadius = leadingInnerRadius * base.faceRightScale;

  setPhotonLayerValue(state, "left", "O", "radius", 1.4);
  const changed = computePhotonStageLayout(state, 933, 466);

  assert.equal(changed.faceRightScale, base.faceRightScale);
  assertNear(leadingInnerRadius * changed.faceRightScale, leadingInnerPixelRadius);
  assert.notEqual(changed.faceLeftScale, base.faceLeftScale);
  assert.ok(changed.faceLabelY > changed.centerY);
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

test("Virtual Observer slider zero helpers mark and snap near zero", () => {
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.virtualObserverX), 50);
  assert.equal(getPhotonControlZeroPositionPercent(PHOTON_CONTROL_RANGES.virtualObserverY), 50);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.virtualObserverX), 0.25);
  assert.equal(getPhotonControlZeroSnapThreshold(PHOTON_CONTROL_RANGES.virtualObserverY), 0.1);

  assert.equal(snapPhotonControlValueToZero(0.05, PHOTON_CONTROL_RANGES.virtualObserverX), 0);
  assert.equal(snapPhotonControlValueToZero(0.25, PHOTON_CONTROL_RANGES.virtualObserverX), 0);
  assert.equal(snapPhotonControlValueToZero(-0.25, PHOTON_CONTROL_RANGES.virtualObserverX), 0);
  assert.equal(snapPhotonControlValueToZero(0.3, PHOTON_CONTROL_RANGES.virtualObserverX), 0.3);
  assert.equal(snapPhotonControlValueToZero(-0.1, PHOTON_CONTROL_RANGES.virtualObserverY), 0);
  assert.equal(snapPhotonControlValueToZero(0.15, PHOTON_CONTROL_RANGES.virtualObserverZ), 0.15);
});

test("phase controls snap near 45 degree sticky spots", () => {
  assert.equal(snapPhotonPhaseDegrees(40), 45);
  assert.equal(snapPhotonPhaseDegrees(43), 45);
  assert.equal(snapPhotonPhaseDegrees(47), 45);
  assert.equal(snapPhotonPhaseDegrees(50), 45);
  assert.equal(snapPhotonPhaseDegrees(85), 90);
  assert.equal(snapPhotonPhaseDegrees(88), 90);
  assert.equal(snapPhotonPhaseDegrees(137), 135);
  assert.equal(snapPhotonPhaseDegrees(182), 180);
  assert.equal(snapPhotonPhaseDegrees(39), 39);
  assert.equal(snapPhotonPhaseDegrees(51), 51);
  assert.equal(snapPhotonPhaseDegrees(96), 96);
  assert.equal(
    snapPhotonRangeControlValue(43, PHOTON_CONTROL_RANGES.phaseDeg, {
      snapToPhaseDegrees: true,
    }),
    45
  );
});

test("playback speed slider centers the default multiplier", () => {
  assertNear(
    getPhotonPlaybackSpeedSliderValue(PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER),
    50,
    1e-12
  );
  assertNear(getPhotonPlaybackSpeedMultiplier(50), PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER, 1e-12);
  assertNear(getPhotonPlaybackSpeedMultiplier(0), PHOTON_CONTROL_RANGES.speedMultiplier.min, 1e-12);
  assertNear(getPhotonPlaybackSpeedMultiplier(100), PHOTON_CONTROL_RANGES.speedMultiplier.max, 1e-12);

  const state = createDefaultPhotonState();
  assertNear(state.time.speedMultiplier, PHOTON_DEFAULT_PLAYBACK_SPEED_MULTIPLIER);
  assertNear(state.pair.left.layers.I.frequencyHz * state.time.speedMultiplier, 0.8);
  assertNear(state.pair.left.layers.M.frequencyHz * state.time.speedMultiplier, 0.4);
  assertNear(state.pair.left.layers.O.frequencyHz * state.time.speedMultiplier, 0.2);
});

test("separation log ticks cover mantissas 1 through 9 for each decade", () => {
  const ticks = getPhotonSeparationLogTicks();

  assert.equal(ticks.length, 136);
  assert.deepEqual(
    ticks.slice(0, 9).map((tick) => tick.mantissa),
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  assert.equal(ticks[0].exponent, -10);
  assert.equal(ticks.at(-1).value, 5);
  assert.equal(ticks.at(-1).label, "10⁵");
  assertNear(snapPhotonSeparationLogTick(Math.log10(7.2e-9)), Math.log10(7e-9), 1e-12);
});

test("separation scientific-notation picker maps coefficient and decade to log ticks", () => {
  const logValue = getPhotonSeparationLog10RatioFromParts(7, -9);
  const tick = getPhotonSeparationLogTick(logValue);

  assert.equal(tick.mantissa, 7);
  assert.equal(tick.exponent, -9);
  assertNear(logValue, Math.log10(7e-9), 1e-12);
  assert.equal(getPhotonSeparationLog10RatioFromParts(9, 5), 5);
  assert.equal(getPhotonSeparationLogTick(5).mantissa, 1);
});

test("frequency controls use powers of two", () => {
  assert.equal(getPhotonFrequencyFromExponent(0), 1);
  assert.equal(getPhotonFrequencyFromExponent(1), 2);
  assert.equal(getPhotonFrequencyFromExponent(2), 4);
  assert.equal(getPhotonFrequencyFromExponent(3), 8);
  assert.equal(getPhotonFrequencyExponent(7), 3);

  const state = createDefaultPhotonState();
  setPhotonLayerValue(state, "right", "M", "frequencyHz", 3);
  assert.equal(state.pair.right.layers.M.frequencyHz, 4);
});

test("layer radius edits are scoped to the addressed swarm", () => {
  const state = createDefaultPhotonState();
  const leadingInnerRadius = state.pair.right.layers.I.radius;
  const allowedInnerRadius =
    (state.pair.left.layers.I.radius + state.pair.left.layers.M.radius) / 2;

  setPhotonLayerValue(state, "left", "I", "radius", allowedInnerRadius);

  assert.equal(state.pair.left.layers.I.radius, allowedInnerRadius);
  assert.equal(state.pair.right.layers.I.radius, leadingInnerRadius);
});

test("layer radius edits cannot pass neighboring orbits", () => {
  const state = createDefaultPhotonState();
  const left = state.pair.left.layers;
  const defaultI = left.I.radius;
  const defaultM = left.M.radius;
  const defaultO = left.O.radius;

  assert.deepEqual(getPhotonLayerRadiusBounds(state, "left", "I"), {
    min: PHOTON_CONTROL_RANGES.radius.min,
    max: defaultM,
  });
  assert.deepEqual(getPhotonLayerRadiusBounds(state, "left", "M"), {
    min: defaultI,
    max: defaultO,
  });
  assert.deepEqual(getPhotonLayerRadiusBounds(state, "left", "O"), {
    min: defaultM,
    max: PHOTON_CONTROL_RANGES.radius.max,
  });

  setPhotonLayerValue(state, "left", "I", "radius", defaultM + 1);
  assert.equal(left.I.radius, defaultM);
  assert.equal(left.M.radius, defaultM);
  assert.equal(left.O.radius, defaultO);

  setPhotonLayerValue(state, "left", "O", "radius", defaultM - 1);
  assert.equal(left.O.radius, defaultM);
  assert.equal(left.M.radius, defaultM);

  const right = state.pair.right.layers;
  const rightI = right.I.radius;
  const rightO = right.O.radius;
  setPhotonLayerValue(state, "right", "M", "radius", rightO + 1);
  assert.equal(right.M.radius, rightO);
  setPhotonLayerValue(state, "right", "M", "radius", rightI - 1);
  assert.equal(right.M.radius, rightI);
});

test("layer radius edits preserve absolute pair separation", () => {
  const state = createDefaultPhotonState();
  const originalSeparation = state.pair.pairSeparation;
  const allowedInnerRadius =
    (state.pair.left.layers.I.radius + state.pair.left.layers.M.radius) / 2;

  setPhotonLayerValue(state, "left", "I", "radius", allowedInnerRadius);

  assert.equal(state.pair.pairSeparation, originalSeparation);
});

test("named photon presets expose the required candidate configurations", () => {
  assert.deepEqual(
    PHOTON_NAMED_PRESETS.map((preset) => preset.id),
    [
      "balanced_contra_rotating_pair",
      "linear_polarization_candidate",
      "right_circular_candidate",
      "left_circular_candidate",
      "phase_offset_stress_test",
      "layer_radius_stress_test",
    ]
  );

  const balanced = createPhotonPresetState("balanced_contra_rotating_pair");
  assert.equal(balanced.pair.left.layers.I.frequencyHz, 4);
  assert.equal(balanced.pair.left.layers.M.frequencyHz, 2);
  assert.equal(balanced.pair.left.layers.O.frequencyHz, 1);
  assert.equal(balanced.pair.right.layers.O.enabled, true);

  const linear = createPhotonPresetState("linear_polarization_candidate");
  assert.deepEqual(
    ["I", "M", "O"].map((layerId) => getPhotonLayerEnabled(linear, "left", layerId)),
    [false, false, true]
  );
  assert.equal(computePhotonFormulaSummary(linear, 0).polarization.classification, "linear");

  const right = createPhotonPresetState("right_circular_candidate");
  const left = createPhotonPresetState("left_circular_candidate");
  assert.ok(computePhotonFormulaSummary(right, 0).polarization.normalizedStokes.s3 > 0);
  assert.ok(computePhotonFormulaSummary(left, 0).polarization.normalizedStokes.s3 < 0);

  const radiusStress = createPhotonPresetState("layer_radius_stress_test");
  assert.equal(radiusStress.pair.left.layers.I.radius, 0.02);
  assert.equal(radiusStress.pair.left.layers.M.radius, 0.16);
  assert.equal(radiusStress.pair.left.layers.O.radius, 0.32);
});

test("separation reference radius follows the largest enabled radius", () => {
  const state = createDefaultPhotonState();
  ["left", "right"].forEach((swarmId) => {
    ["I", "M", "O"].forEach((layerId) => {
      state.pair[swarmId].layers[layerId].radius = 0.2;
    });
  });

  assert.equal(getPhotonSeparationReferenceRadius(state), 0.2);
  assert.equal(getPhotonPairSeparationFromLog10Ratio(state, 0), 0.2);
});

test("photon state normalization preserves configured values", () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 45;
  state.pair.right.layers.M.frequencyHz = 7;
  state.pair.right.layers.O.enabled = false;
  state.measurement.virtualObserver.x = 5.25;
  state.measurement.virtualObserver.y = -1.5;
  state.view.rawPolarizationVisible = false;
  const normalized = normalizePhotonState(state);

  assert.equal(normalized.polarization.analyzerAngleDeg, 45);
  assert.equal(normalized.view.rawPolarizationVisible, false);
  assert.equal(normalized.pair.right.layers.M.frequencyHz, 8);
  assert.equal(normalized.pair.right.layers.O.enabled, false);
  assert.equal(normalized.measurement.virtualObserver.x, 5.25);
  assert.equal(normalized.measurement.virtualObserver.y, -1.5);
  assert.deepEqual(normalized, normalizePhotonState(normalized));
});

test("formula summary reports a derived branch-sum polarization fit", () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 60;
  const summary = computePhotonFormulaSummary(state, 0.5);

  assert.ok(["weak", "linear", "right_circular", "left_circular", "elliptical"].includes(
    summary.polarization.classification
  ));
  assert.ok(Number.isFinite(summary.polarization.amplitudes.y));
  assert.ok(Number.isFinite(summary.polarization.amplitudes.z));
  assert.ok(Number.isFinite(summary.polarization.phaseLagDeg));
  assert.ok(Number.isFinite(summary.analyzerTarget));
  assert.ok(Number.isFinite(summary.fitResidual));
  assert.ok(summary.fitResidual >= 0);
  assert.ok(Number.isFinite(summary.analyzerResidual));
});

test("polarization fitter classifies a one-axis branch-sum signal as linear", () => {
  const fit = fitPhotonPolarizationFromSamples(buildSyntheticPolarizationSamples({ ampY: 1, ampZ: 0 }));

  assert.equal(fit.classification, "linear");
  assertNear(fit.amplitudes.y, 1, 1e-12);
  assertNear(fit.amplitudes.z, 0, 1e-12);
  assertNear(fit.fitResidual, 0, 1e-12);
  assert.equal(fit.phaseLagDefined, false);
});

test("polarization fitter classifies equal quadrature amplitudes as circular", () => {
  const fit = fitPhotonPolarizationFromSamples(
    buildSyntheticPolarizationSamples({ ampY: 1, ampZ: 1, phaseLag: -Math.PI / 2 })
  );

  assert.equal(fit.classification, "right_circular");
  assertNear(fit.amplitudes.y, 1, 1e-12);
  assertNear(fit.amplitudes.z, 1, 1e-12);
  assertNear(fit.phaseLag, -Math.PI / 2, 1e-12);
  assertNear(fit.fitResidual, 0, 1e-12);
  assert.equal(fit.phaseLagDefined, true);
  assertNear(fit.analyzerFractionTarget, 0.5, 1e-12);
});

test("polarization fitter classifies unequal quadrature amplitudes as elliptical", () => {
  const fit = fitPhotonPolarizationFromSamples(
    buildSyntheticPolarizationSamples({ ampY: 1, ampZ: 0.5, phaseLag: -Math.PI / 3 })
  );

  assert.equal(fit.classification, "elliptical");
  assertNear(fit.amplitudes.y, 1, 1e-12);
  assertNear(fit.amplitudes.z, 0.5, 1e-12);
  assertNear(fit.fitResidual, 0, 1e-12);
});

test("derived branch-sum polarization trace uses the fitted current field", () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 17;
  const trace = buildPhotonDerivedPolarizationTrace(state, 0.5, 48);

  assert.ok(trace.rawSamples.length >= 48);
  assert.ok(["weak", "linear", "right_circular", "left_circular", "elliptical"].includes(
    trace.classification
  ));
  assertNear(trace.current.ey, trace.fittedCurrent.ey, 1e-12);
  assertNear(trace.current.ez, trace.fittedCurrent.ez, 1e-12);
});

test("derived polarization inset trace is centered on the oscillating component", () => {
  const state = createDefaultPhotonState();
  const trace = buildPhotonDerivedPolarizationTrace(state, 0, 144);
  const eyValues = trace.samples.map((sample) => sample.ey);
  const ezValues = trace.samples.map((sample) => sample.ez);
  const eyMidpoint = (Math.min(...eyValues) + Math.max(...eyValues)) / 2;
  const ezMidpoint = (Math.min(...ezValues) + Math.max(...ezValues)) / 2;

  assert.ok(Math.abs(trace.components.y.dc) > 1);
  assertNear(eyMidpoint, 0, 1e-9);
  assertNear(ezMidpoint, 0, 1e-9);
});

test("derived polarization ellipse fit stays stable while the current point advances", () => {
  const state = createDefaultPhotonState();
  state.polarization.analyzerAngleDeg = 17;
  const first = buildPhotonDerivedPolarizationTrace(state, 0.5, 48);
  const second = buildPhotonDerivedPolarizationTrace(state, 1.25, 48);

  assertNear(first.scale, second.scale, 1e-12);
  assertNear(first.amplitudes.y, second.amplitudes.y, 1e-12);
  assertNear(first.amplitudes.z, second.amplitudes.z, 1e-12);
  assertNear(first.samples[12].ey, second.samples[12].ey, 1e-12);
  assertNear(first.samples[12].ez, second.samples[12].ez, 1e-12);
  assert.notEqual(first.currentProgress.toFixed(6), second.currentProgress.toFixed(6));
});

test("photon animation keeps swarm time continuous while plot time wraps", () => {
  const state = createDefaultPhotonState();
  const runDuration = getPhotonRunDuration(state);
  const modelTime = advancePhotonModelTime(0, runDuration + 0.25, 1);
  const times = getPhotonRuntimeTimes(state, modelTime);

  assert.ok(times.modelTime > runDuration);
  assertNear(times.modelTime, runDuration + 0.25, 1e-12);
  assertNear(times.displayTime, 0.25, 1e-12);
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
