import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  validateBorgFixtureSnapshot,
} from "../src/apps/borg/BorgFixtureData.js";
import {
  loadBorgFixtureTrajectory,
  loadBorgFixtureTrajectoryFrames,
} from "../src/apps/borg/BorgFixtureTrajectory.js";
import {
  createBorgFrameSetsFromRows,
  mergeBorgFrameRows,
} from "../src/apps/borg/BorgFrameRows.js";
import {
  BORG_EOM_RECORD_REPLAY_RUNNER_VERSION,
  BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
  createBorgEomRecordReplayRunner,
} from "../src/apps/borg/BorgEomRecordReplayRunner.js";

const MASTER_EQUATION_SOLVER_MODE = "native-fixed-parameter-master-equation";
const NEXT_MASTER_EQUATION_BURDEN = "migrate-borg-through-certified-eom-shadow-run";
const ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES = new Set([
  "ok",
  "native_capability_missing",
  "native_solver_pending",
]);
const ALLOWED_NATIVE_MASTER_EQUATION_STATUSES = new Set([
  "native-fixed-parameter-master-equation",
  "native-fixture-capability-missing",
  "native-fixture-solver-pending",
]);
const ALLOWED_MASTER_EQUATION_FAILURE_CODES = new Set([
  "none",
  "native_master_equation_fixture_missing",
  "native_master_equation_solver_pending",
]);

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

function createBorgEomRecordFixture(overrides = {}) {
  return {
    contractId: "eom_evolution_contract/v0",
    runId: "borg-record-replay-fixture-run",
    claimLevel: "evolved-record",
    absoluteTimeInterval: { start: "0", end: "0.6" },
    provenance: { engineId: "eom-solver" },
    histories: [
      {
        pathId: "1",
        pathKey: 1,
        charge: "1",
        stateFlags: 1,
        coverageStart: "0",
        coverageEnd: "0.6",
        segments: [inertialSegment(0, 0.6, [1, 2, 3], [0.5, 0, -0.25])],
      },
      {
        pathId: "2",
        pathKey: 2,
        charge: "-1",
        stateFlags: 2,
        coverageStart: "0",
        coverageEnd: "0.6",
        segments: [inertialSegment(0, 0.6, [-1, 0, 0], [0, 0.5, 0])],
      },
    ],
    ...overrides,
  };
}

test("Borg path history is on and visible by default", () => {
  assert.ok(BORG_APP_SURFACE_DESIGN_V1.firstViewport.defaultVisibleLayers.includes("path-history"));
  assert.ok(!BORG_APP_SURFACE_DESIGN_V1.firstViewport.defaultHiddenLayers.includes("path-history"));
  assert.equal(
    BORG_APP_SURFACE_DESIGN_V1.layerStrip.find((entry) => entry.layer === "path-history")?.state,
    "on",
  );
});

test("Borg stored compatibility fixture preserves the non-EOM quarantine", async () => {
  // The bridge-era fixture writer was retired with the zombie-solver. The
  // stored fixture module and trajectory asset are frozen compatibility data
  // and must keep their quarantine labels verbatim.
  const module = readFileSync(
    new URL("../src/apps/borg/BorgFixtureData.js", import.meta.url),
    "utf8",
  );
  const trajectory = await loadBorgFixtureTrajectory();

  assert.doesNotMatch(module, /"canonicalEomEvidence": true/);
  assert.doesNotMatch(module, /"eomEvidenceStatus": "native_master_equation_fixed_parameter_evidence"/);
  assert.match(module, /"canonicalEomEvidence": false/);
  assert.match(module, /"eomEvidenceStatus": "non_eom_compatibility_output"/);
  assert.match(module, /"productionSolver": "central-solver-compatibility-output"/);
  assert.match(module, /"eomMigrationStatus": "shadow-adapter-available-promotion-gated"/);
  assert.equal(trajectory.canonicalEomEvidence, false);
  assert.equal(trajectory.eomEvidenceStatus, "non_eom_compatibility_output");
  assert.equal(trajectory.currentStateFrames.length, 24_016);
});

test("Borg fixture preserves central-solver output with explicit non-EOM provenance", () => {
  validateBorgFixtureSnapshot({
    manifest: BORG_DATASET_MANIFEST_V1,
    surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
  });

  const manifest = BORG_DATASET_MANIFEST_V1;
  const source = manifest.sourceBridgeRun;

  assert.equal(source.executionPath, "native_c_abi");
  assert.equal(source.runKind, "masterEquation");
  assert.equal(source.solverMode, MASTER_EQUATION_SOLVER_MODE);
  assert.equal(source.motionLaw, "architrino-master-equation-v1");
  assert.equal(source.fixedPhysicalParameterSetId, "borg-fixed-physical-parameters.v1");
  assert.equal(source.fixedPhysicalParameterAuthority, "manifest-declared-fixed-parameter-contract");
  assert.equal(source.visualTuningStatus, "not-visual-tuned");
  assert.equal(source.visualBehaviorAuthority, "native-output-only");
  assert.equal(source.pairAccelerationScale, undefined);
  assert.equal(ALLOWED_NATIVE_MASTER_EQUATION_STATUSES.has(source.nativeMasterEquationStatus), true);
  assert.equal(ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(source.nativeMasterEquationProbeStatusCode), true);
  assert.equal(
    ALLOWED_MASTER_EQUATION_FAILURE_CODES.has(source.nativeMasterEquationProbeFirstFailureCode),
    true,
  );
  assert.equal(source.masterEquationFallbackDecision, "native-master-equation-selected");
  assert.equal(source.canonicalEomEvidence, false);
  assert.equal(source.eomEvidenceStatus, "non_eom_compatibility_output");
  assert.equal(source.nextSolverBurden, NEXT_MASTER_EQUATION_BURDEN);

  const probe = manifest.nativeMasterEquationProbe;
  assert.equal(probe.runKind, "masterEquation");
  assert.equal(ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(probe.statusCode), true);
  assert.equal(["native_c_abi", "native_c_abi_missing", "native_c_abi_pending"].includes(probe.executionPath), true);
  assert.equal(ALLOWED_MASTER_EQUATION_FAILURE_CODES.has(probe.firstFailureCode), true);
  assert.equal(probe.requiredNativeExport, "architrino_solver_integrate_master_equation_motion_f64");
  assert.equal(probe.fallbackDecision, "native-master-equation-selected");
  assert.equal(probe.fallbackRunKind, null);
  assert.equal(probe.valueAuthority, "authoritative-solver-output");
  assert.equal(probe.canonicalEomEvidence, false);
  assert.equal(probe.eomEvidenceStatus, "non_eom_compatibility_output");
});

test("Borg uses the canonical unit field speed", () => {
  assert.equal(BORG_DATASET_MANIFEST_V1.simulationEnvelope.fieldSpeed, 1);
  assert.equal(BORG_DATASET_MANIFEST_V1.simulationEnvelope.historyDepth, 10);
  assert.equal(BORG_DATASET_MANIFEST_V1.simulationEnvelope.wakeHorizon, 10);

  const noncanonicalManifest = structuredClone(BORG_DATASET_MANIFEST_V1);
  noncanonicalManifest.simulationEnvelope.fieldSpeed = 3;
  assert.throws(
    () => validateBorgFixtureSnapshot({
      manifest: noncanonicalManifest,
      surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
    }),
    /field speed is not canonical/,
  );
});

test("Borg native master-equation frame data carries non-linear path evidence", async () => {
  // The curvature evidence lives in the recorded trajectory asset, which the
  // browser no longer parses on first paint. The rows are unchanged.
  const trajectoryFrames = await loadBorgFixtureTrajectoryFrames();
  const maxDeviation = maxNativeFrameDeviationFromPathLine(trajectoryFrames);
  assert.ok(
    maxDeviation > 1,
    `native fixed-parameter master-equation paths must show solver-owned curvature; max deviation ${maxDeviation}`,
  );
});

test("Borg fixture trajectory record matches the manifest that describes it", async () => {
  const trajectory = await loadBorgFixtureTrajectory();
  const record = BORG_DATASET_MANIFEST_V1.trajectoryRecord;

  assert.equal(trajectory.schema, "borg-fixture-trajectory.v1");
  assert.equal(trajectory.currentStateFrames.length, record.frameCount);
  assert.equal(trajectory.currentStateFrames.length, BORG_DATASET_MANIFEST_V1.sourceBridgeRun.frameCount);
  assert.equal(trajectory.trajectoryFrameIds.length, record.trajectoryFrameIdCount);
  assert.equal(trajectory.historyEndTime, record.historyEndTime);

  // The seed rows the browser does parse must be the frameIndex-0 slice of the
  // record, not a separately maintained copy that could drift from it.
  assert.deepEqual(
    BORG_DATASET_MANIFEST_V1.currentStateFrames,
    trajectory.currentStateFrames.filter((row) => Number(row.frameIndex) === 0),
  );
  assert.equal(BORG_DATASET_MANIFEST_V1.currentStateFrames.length, record.seedFrameCount);

  // The record carries the same evidence grade as the run that produced it.
  // Central-solver output is not canonical EOM evidence.
  assert.equal(trajectory.canonicalEomEvidence, false);
  assert.equal(record.canonicalEomEvidence, false);
  assert.equal(trajectory.eomEvidenceStatus, "non_eom_compatibility_output");
});

test("Borg first paint does not parse the recorded trajectory", () => {
  const fixtureSource = readFileSync(
    new URL("../src/apps/borg/BorgFixtureData.js", import.meta.url),
    "utf8",
  );
  // The whole point of the split: the module the browser blocks on must stay
  // small. It previously carried 24k inline frame rows at ~11 MB.
  assert.ok(
    fixtureSource.length < 512 * 1024,
    `BorgFixtureData.js is ${fixtureSource.length} bytes; the trajectory belongs in its own asset`,
  );
  assert.equal(BORG_DATASET_MANIFEST_V1.currentStateAndFrameSources.trajectoryFrameIds, undefined);
});

test("Borg record replay chunks carry recorded frames with record provenance", async () => {
  const runner = createBorgEomRecordReplayRunner(createBorgEomRecordFixture(), {
    targetDuration: 0.6,
    chunkDuration: 0.4,
    sampleInterval: 0.2,
  });

  assert.equal(runner.schema, BORG_EOM_RECORD_REPLAY_RUNNER_VERSION);
  assert.equal(runner.config.runSource, BORG_EOM_RECORD_REPLAY_RUN_SOURCE);
  assert.equal(runner.config.runId, "borg-record-replay-fixture-run");
  assert.equal(runner.config.engineId, "eom-solver");
  assert.equal(runner.config.claimGrade, "evolved-record");

  const firstChunk = await runner.computeNextChunk();
  assert.equal(firstChunk.source, BORG_EOM_RECORD_REPLAY_RUN_SOURCE);
  assert.equal(firstChunk.statusCode, "ok");
  assert.equal(firstChunk.runId, "borg-record-replay-fixture-run");
  assert.equal(firstChunk.claimGrade, "evolved-record");
  assert.deepEqual(uniqueFrameIndexes(firstChunk.frames), [0, 1, 2]);
  // Closed form: the record is inertial, position = x0 + v * t.
  const path1AtHalf = firstChunk.frames.find(
    (frame) => frame.pathKey === 1 && frame.frameIndex === 1,
  );
  assert.ok(Math.abs(path1AtHalf.position.x - 1.1) < 1e-12);
  assert.ok(Math.abs(path1AtHalf.position.z - 2.95) < 1e-12);
  assert.equal(path1AtHalf.stateFlags, 1);
  assert.equal(path1AtHalf.runSource, BORG_EOM_RECORD_REPLAY_RUN_SOURCE);
  // No evidenceStatus on the record: replay output is recorded, not canonical.
  assert.equal(path1AtHalf.valueAuthority, "recorded-eom-output");

  const secondChunk = await runner.computeNextChunk();
  assert.deepEqual(uniqueFrameIndexes(secondChunk.frames), [2, 3]);

  const mergedFrames = mergeBorgFrameRows(firstChunk.frames, secondChunk.frames);
  const frameSets = createBorgFrameSetsFromRows(mergedFrames);
  assert.deepEqual(frameSets.map((frameSet) => frameSet.frameIndex), [0, 1, 2, 3]);
  assert.equal(frameSets.at(-1).frames.length, 2);
  assert.equal(runner.canComputeNextChunk(), false);

  await runner.dispose();
});

test("Borg record replay marks canonical records with canonical value authority", async () => {
  const runner = createBorgEomRecordReplayRunner(
    createBorgEomRecordFixture({ evidenceStatus: "canonical" }),
    { targetDuration: 0.6, chunkDuration: 0.6, sampleInterval: 0.2 },
  );
  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.evidenceStatus, "canonical");
  assert.equal(chunk.frames[0].valueAuthority, "canonical-eom-output");
  await runner.dispose();
});

test("Borg record replay never extends past recorded coverage", async () => {
  // The recorded window is a hard ceiling: a replay runner is not a solver and
  // must refuse to synthesize frames the engine never evolved.
  const runner = createBorgEomRecordReplayRunner(createBorgEomRecordFixture(), {
    targetDuration: Number.POSITIVE_INFINITY,
    chunkDuration: 0.4,
    sampleInterval: 0.2,
  });

  assert.equal(runner.targetDuration, 0.6);
  runner.setRunLimits({ targetDuration: Number.POSITIVE_INFINITY, chunkDuration: 0.4 });
  assert.equal(runner.targetDuration, 0.6);

  await runner.computeNextChunk();
  const finalChunk = await runner.computeNextChunk();
  assert.equal(finalChunk.endTime, 0.6);
  assert.equal(runner.canComputeNextChunk(), false);

  const completeChunk = await runner.computeNextChunk();
  assert.equal(completeChunk.statusCode, "complete");
  assert.deepEqual(completeChunk.frames, []);

  await runner.dispose();
});

test("Borg record replay applies measured target and chunk limits within the window", async () => {
  const runner = createBorgEomRecordReplayRunner(createBorgEomRecordFixture(), {
    targetDuration: 0.6,
    chunkDuration: 0.4,
    sampleInterval: 0.2,
  });

  runner.setRunLimits({ targetDuration: 0.4, chunkDuration: 0.2 });
  assert.equal(runner.targetDuration, 0.4);
  assert.equal(runner.chunkDuration, 0.2);

  const chunkEndTimes = [];
  while (runner.canComputeNextChunk()) {
    chunkEndTimes.push((await runner.computeNextChunk()).endTime);
  }
  assert.deepEqual(chunkEndTimes, [0.2, 0.4]);

  await runner.dispose();
});

test("Borg record replay fails closed on foreign or ungraded records", () => {
  assert.throws(
    () => createBorgEomRecordReplayRunner(
      createBorgEomRecordFixture({ contractId: "solver-app-bridge/v1" }),
    ),
    /requires contractId eom_evolution_contract\/v0/,
  );
  const ungraded = createBorgEomRecordFixture();
  delete ungraded.claimLevel;
  assert.throws(() => createBorgEomRecordReplayRunner(ungraded), /claim grade/);
});

test("Borg path-history renderer uses native row segments, not visual smoothing curves", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/borg/BorgAppRuntime.js", import.meta.url),
    "utf8",
  );
  const nativeProcessClientSource = readFileSync(
    new URL("../scripts/eom/BorgNativeEomProcessClient.mjs", import.meta.url),
    "utf8",
  );
  const localDevServerSource = readFileSync(
    new URL("../scripts/dev/start-local-dev.mjs", import.meta.url),
    "utf8",
  );
  const htmlSource = readFileSync(new URL("../borg.html", import.meta.url), "utf8");
  // Trail rendering moved to BorgPathTrails.js; the no-smoothing guard follows
  // the code it guards.
  const pathTrailsSource = readFileSync(
    new URL("../src/apps/borg/BorgPathTrails.js", import.meta.url),
    "utf8",
  );

  assert.match(pathTrailsSource, /new THREE\.LineSegments/);
  assert.doesNotMatch(pathTrailsSource, /CatmullRomCurve3/);
  assert.doesNotMatch(pathTrailsSource, /TubeGeometry/);
  assert.doesNotMatch(runtimeSource, /CatmullRomCurve3/);
  assert.doesNotMatch(runtimeSource, /TubeGeometry/);
  assert.match(runtimeSource, /rebuildPathTrails/);
  assert.match(runtimeSource, /PLAYBACK_SPEED_PRESETS/);
  assert.doesNotMatch(runtimeSource, /PLAYBACK_MS_PER_NATIVE_STEP/);
  assert.match(runtimeSource, /RUN_CONTROL_PRESETS/);
  assert.match(runtimeSource, /live-forever/);
  assert.match(runtimeSource, /live-60s/);
  assert.match(nativeProcessClientSource, /worker\.stdin\.on\("error"/);
  assert.match(
    localDevServerSource,
    /const execute = \(\) => \{\s*client = getEomBorgClient\(\);/,
  );
  assert.match(runtimeSource, /borg-live-run-budget\.v1/);
  assert.match(runtimeSource, /BorgMeasuredRunPresets\.js/);
  assert.match(runtimeSource, /BorgLiveRunRetentionPolicy\.js/);
  assert.match(runtimeSource, /BorgReleaseBudgetManifest\.js/);
  assert.match(runtimeSource, /releaseBudgetManifest/);
  assert.match(runtimeSource, /releaseMaxChunk/);
  assert.match(runtimeSource, /measuredRunPresetCalibration/);
  assert.match(runtimeSource, /updateMeasuredRunPresetCalibration/);
  assert.match(runtimeSource, /effectiveTargetDuration/);
  assert.match(runtimeSource, /readLiveRunBudgetSnapshot/);
  assert.match(runtimeSource, /createBorgSeededInitialConditionRows/);
  assert.equal(runtimeSource.includes("Live 3000 / 20"), false);
  assert.match(runtimeSource, /toggleRunDurationMode/);
  assert.match(runtimeSource, /startDynamicNativeRunnerIfNeeded/);
  assert.match(runtimeSource, /if \(autoStartEom\) \{\s*startDynamicNativeRunner\(\);\s*\}/);
  assert.match(runtimeSource, /applyLiveRunRetentionIfNeeded/);
  assert.match(runtimeSource, /compactedPathHistory/);
  assert.match(runtimeSource, /switchRunControlPreset/);
  assert.match(runtimeSource, /startNewDistributionRun/);
  // The zombie-bridge path is retired: the only non-fixture sources are the
  // live EOM shadow runner and recorded EOM dataset replay.
  assert.match(runtimeSource, /createBorgEomRecordReplayRunner/);
  assert.match(runtimeSource, /createBorgEomShadowRunner/);
  assert.doesNotMatch(runtimeSource, /BorgDynamicNativeRunner/);
  assert.doesNotMatch(runtimeSource, /BorgSolverBridgeWorker/);
  assert.doesNotMatch(runtimeSource, /SolverAppBridge/);
  assert.doesNotMatch(runtimeSource, /central-solver-compatibility/);
  assert.match(runtimeSource, /mergeBorgFrameRows/);
  assert.match(
    runtimeSource,
    /currentFrames = replaceCurrentFrames[\s\S]*applyLiveRunRetentionIfNeeded\(\);[\s\S]*frameSets = createBorgFrameSetsFromRows\(currentFrames\);/,
  );
  assert.match(runtimeSource, /createBorgAcceptedInertialSeedHistory/);
  assert.match(runtimeSource, /appendedFrameRows = Array\.isArray\(chunk\.frames\)/);
  assert.doesNotMatch(htmlSource, /M9\.8 6\.2a6\.8/);
  assert.match(htmlSource, /id="borg-start-frame-button"/);
  assert.match(htmlSource, /id="borg-new-distribution-button"/);
  assert.match(htmlSource, /id="borg-run-duration-button"/);
  assert.doesNotMatch(htmlSource, /id="borg-eom-path-count"/);
  assert.match(htmlSource, /id="borg-eom-duration"[^>]*value="60"/);
  assert.match(
    htmlSource,
    /id="borg-eom-controls"[\s\S]*id="borg-initial-condition-form"[\s\S]*id="borg-initial-condition-fields"/,
  );
  assert.doesNotMatch(htmlSource, /<section[^>]*aria-label="Initial condition fields"/);
  assert.match(htmlSource, /id="borg-eom-history-status"/);
  assert.match(htmlSource, /id="borg-eom-stop-button"/);
  assert.match(htmlSource, /id="borg-eom-restart-button"/);
  assert.match(htmlSource, /id="borg-eom-restart-button"[^>]*>Start \/ restart<\/button>/);
  assert.match(htmlSource, /id="borg-eom-progress"[^>]*value="0"[^>]*hidden/);
  assert.match(htmlSource, /\.borg-eom-form \.borg-run-duration-button \{\s*align-self: end;/);
  assert.match(htmlSource, /Initial history[\s\S]*Exact inertial polynomial/);
  assert.match(htmlSource, /Forward evolution[\s\S]*EOM chunks after T=0/);
  assert.match(
    htmlSource,
    /id="borg-run-duration-button"[\s\S]*Finite duration \(s\)[\s\S]*Initial conditions[\s\S]*id="borg-eom-stop-button"[\s\S]*id="borg-eom-restart-button"[\s\S]*id="borg-apply-initial-condition"/,
  );
  assert.match(runtimeSource, /dom\.eomProgress\.hidden = forever/);
  assert.match(runtimeSource, /forward EOM chunks/);
  assert.match(runtimeSource, /Exact polynomial initial history \(C1 inertial\)/);
  assert.match(runtimeSource, /function startRunAndPlayback\(\)[\s\S]*firstChunk\.then[\s\S]*startPlayback\(\)/);
  assert.match(runtimeSource, /selected; press Start \/ restart to run/);
  assert.doesNotMatch(htmlSource, /id="borg-run-source"/);
  assert.match(htmlSource, /id="borg-playback-speed"/);
});

test("Borg surface advertises certified EOM shadow migration as the next build burden", () => {
  const surfaceDesign = BORG_APP_SURFACE_DESIGN_V1;
  assert.equal(surfaceDesign.sourceManifest.solverMode, MASTER_EQUATION_SOLVER_MODE);
  assert.equal(surfaceDesign.sourceManifest.visualTuningStatus, "not-visual-tuned");
  assert.equal(surfaceDesign.sourceManifest.visualBehaviorAuthority, "native-output-only");
  assert.equal(
    ALLOWED_NATIVE_MASTER_EQUATION_STATUSES.has(surfaceDesign.sourceManifest.nativeMasterEquationStatus),
    true,
  );
  assert.equal(
    ALLOWED_MASTER_EQUATION_PROBE_STATUS_CODES.has(
      surfaceDesign.sourceManifest.nativeMasterEquationProbe.statusCode,
    ),
    true,
  );
  assert.equal(
    surfaceDesign.sourceManifest.nativeMasterEquationProbe.fallbackDecision,
    "native-master-equation-selected",
  );
  assert.equal(surfaceDesign.sourceManifest.nextSolverBurden, NEXT_MASTER_EQUATION_BURDEN);
  assert.equal(surfaceDesign.nextBuildBurden, NEXT_MASTER_EQUATION_BURDEN);
  assert.equal(surfaceDesign.authorityMap.centralVolumeAcceleration, "fail-closed-value");

  const pathHistoryLayer = surfaceDesign.layerStrip.find((layer) => layer.layer === "path-history");
  assert.equal(pathHistoryLayer.displayTransform, "adjacent-native-row-line-segments");
  assert.equal(pathHistoryLayer.smoothingPolicy, "none");
});

function maxNativeFrameDeviationFromPathLine(frames) {
  const byPathKey = new Map();
  frames.forEach((frame) => {
    const pathFrames = byPathKey.get(frame.pathKey) ?? [];
    pathFrames.push(frame);
    byPathKey.set(frame.pathKey, pathFrames);
  });

  let maxDeviation = 0;
  byPathKey.forEach((pathFrames) => {
    pathFrames.sort((left, right) => left.time - right.time);
    const first = pathFrames[0];
    const last = pathFrames.at(-1);
    const duration = last.time - first.time;
    if (duration <= 0) {
      return;
    }
    const displacement = subtractVectors(last.position, first.position);
    pathFrames.forEach((frame) => {
      const progress = (frame.time - first.time) / duration;
      const expected = {
        x: first.position.x + displacement.x * progress,
        y: first.position.y + displacement.y * progress,
        z: first.position.z + displacement.z * progress,
      };
      maxDeviation = Math.max(maxDeviation, vectorDistance(frame.position, expected));
    });
  });
  return maxDeviation;
}

function uniqueFrameIndexes(frames) {
  return [...new Set(frames.map((frame) => frame.frameIndex))];
}

function subtractVectors(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function vectorDistance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}
