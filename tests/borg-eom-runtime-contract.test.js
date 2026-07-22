import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  validateBorgManifest,
} from "../src/apps/borg/BorgAppManifest.js";
import {
  appendBorgFrameRows,
  appendBorgFrameRowsInPlace,
  appendBorgFrameSets,
  appendBorgFrameSetsInPlace,
  createBorgFrameSetsFromRows,
  mergeBorgFrameRows,
} from "../src/apps/borg/BorgFrameRows.js";
import {
  BORG_PRESCRIBED_PATH_TRAIL_COLOR,
  calculateBorgOrthographicFrustum,
  createBorgParticleStyles,
  createDefaultEomShadowRunnerOptions,
  formatBorgTimelineTime,
} from "../src/apps/borg/BorgAppRuntime.js";
import {
  BORG_PRESCRIBED_DISPLAY_OVERSAMPLE_FACTOR,
  BORG_EOM_RECORD_REPLAY_RUNNER_VERSION,
  BORG_EOM_RECORD_REPLAY_RUN_SOURCE,
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
    positionErrors: ["0", "0", "0"],
    velocityErrors: ["0", "0", "0"],
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

test("prescribed orbital trails are neutral purple while endpoint colors retain polarity", () => {
  const frames = [
    { pathKey: 1, stateFlags: 1 },
    { pathKey: 2, stateFlags: 2 },
  ];
  const prescribed = createBorgParticleStyles(frames, { prescribedGeometry: true });
  assert.equal(prescribed.get(1).pathColor, BORG_PRESCRIBED_PATH_TRAIL_COLOR);
  assert.equal(prescribed.get(2).pathColor, BORG_PRESCRIBED_PATH_TRAIL_COLOR);
  assert.notEqual(prescribed.get(1).color, prescribed.get(2).color);

  const evolved = createBorgParticleStyles(frames);
  assert.notEqual(evolved.get(1).pathColor, evolved.get(2).pathColor);
});

test("Borg timeline uses a fixed-width hours-minutes-seconds clock", () => {
  assert.equal(formatBorgTimelineTime(0), "00:00:00.0");
  assert.equal(formatBorgTimelineTime(59.94), "00:00:59.9");
  assert.equal(formatBorgTimelineTime(59.96), "00:01:00.0");
  assert.equal(formatBorgTimelineTime(119.4), "00:01:59.4");
  assert.equal(formatBorgTimelineTime(3661.28), "01:01:01.3");
  assert.equal(formatBorgTimelineTime(Number.NaN), "--:--:--.-");
});

test("Borg selected certified budget atomically owns its step controller", () => {
  const eomClient = {};
  const resolved = createDefaultEomShadowRunnerOptions(
    {
      eomShadowRunner: {
        eomClient,
        startTime: 0,
        targetDuration: 1,
        runDuration: 1,
        chunkDuration: 0.05,
        initialStep: "0.025",
        minimumStep: "0.0001",
        maximumStep: "0.025",
      },
    },
    { effectiveTargetDuration: 1, effectiveChunkDuration: 0.05 },
    null,
    BORG_DATASET_MANIFEST_V1,
    { stepHeight: 0.0125, minimumStep: 0.0002 },
  );

  assert.equal(resolved.eomClient, eomClient);
  assert.equal(resolved.initialStep, "0.05");
  assert.equal(resolved.maximumStep, "0.05");
  assert.equal(resolved.minimumStep, "0.0001");
  assert.equal(resolved.useAdaptiveStepGrowth, true);
  assert.equal(resolved.runGrade, "display");
});

test("Borg app manifest is design-owned policy and passes validation", () => {
  validateBorgManifest({
    manifest: BORG_DATASET_MANIFEST_V1,
    surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
  });

  const manifest = BORG_DATASET_MANIFEST_V1;
  assert.equal(manifest.schema, "borg-dataset-manifest.v1");
  assert.equal(manifest.manifestId, BORG_APP_SURFACE_DESIGN_V1.sourceManifest.manifestId);
  assert.equal(
    manifest.population.architrinoCount,
    manifest.initialConditions.electrinoCount + manifest.initialConditions.positrinoCount,
  );
  assert.equal(
    manifest.initialConditions.initialLinePolicy,
    "seeded-random-simulation-envelope",
  );
  assert.equal(manifest.initialConditions.minimumPairSeparation, 0.2);
  assert.equal(manifest.initialConditions.velocityPolicy, "seeded-random-small-3d");
  assert.equal(manifest.initialConditions.positrinoCharge, 1);
  assert.equal(manifest.initialConditions.electrinoCharge, -1);
  assert.equal(manifest.simulationEnvelope.kind, "sphere");
  assert.equal(manifest.simulationEnvelope.outerRadius, 0.5);
  assert.equal(manifest.simulationEnvelope.centralBallRadius, undefined);
  assert.equal(manifest.simulationEnvelope.radialBufferMargin, undefined);
  assert.equal(manifest.simulationEnvelope.sideLength, undefined);
  assert.equal(manifest.simulationEnvelope.centralVolume, undefined);
  assert.equal(manifest.simulationEnvelope.faceBufferMargin, undefined);
  assert.equal(manifest.population.countDerivation, undefined);

  const invalidRadiusManifest = structuredClone(manifest);
  invalidRadiusManifest.simulationEnvelope.outerRadius = 0;
  assert.throws(
    () => validateBorgManifest({
      manifest: invalidRadiusManifest,
      surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
    }),
    /outer radius is not positive/,
  );

});

test("Borg uses the canonical unit field speed", () => {
  assert.equal(BORG_DATASET_MANIFEST_V1.simulationEnvelope.fieldSpeed, 1);
  assert.equal(
    BORG_DATASET_MANIFEST_V1.simulationEnvelope.wakeHorizon,
    BORG_DATASET_MANIFEST_V1.simulationEnvelope.fieldSpeed *
      BORG_DATASET_MANIFEST_V1.simulationEnvelope.historyDepth,
  );

  const noncanonicalManifest = structuredClone(BORG_DATASET_MANIFEST_V1);
  noncanonicalManifest.simulationEnvelope.fieldSpeed = 3;
  assert.throws(
    () => validateBorgManifest({
      manifest: noncanonicalManifest,
      surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
    }),
    /field speed is not canonical/,
  );
});

test("Borg ships no stored trajectory data; runs are computed from seeded initial conditions", () => {
  // Borg ships no stored trajectory data; all frames come from EOM runs. The
  // manifest carries only declared policy, never computed frames.
  const manifest = BORG_DATASET_MANIFEST_V1;
  assert.equal(manifest.currentStateFrames, undefined);
  assert.equal(manifest.trajectoryRecord, undefined);
  assert.equal(manifest.sourceBridgeRun, undefined);
  assert.equal(manifest.nativeMasterEquationProbe, undefined);

  const manifestSource = readFileSync(
    new URL("../src/apps/borg/BorgAppManifest.js", import.meta.url),
    "utf8",
  );
  // The module the browser blocks on must stay small: policy only, no rows.
  assert.ok(
    manifestSource.length < 64 * 1024,
    `BorgAppManifest.js is ${manifestSource.length} bytes; it must carry policy, not data`,
  );
  assert.doesNotMatch(manifestSource, /"frameCount"/);
  assert.doesNotMatch(manifestSource, /"currentStateFrames"/);
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
  const appendedFrames = appendBorgFrameRows(firstChunk.frames, secondChunk.frames);
  const appendedFrameSets = appendBorgFrameSets(
    createBorgFrameSetsFromRows(firstChunk.frames),
    secondChunk.frames,
  );
  assert.deepEqual(appendedFrames, mergedFrames);
  assert.deepEqual(appendedFrameSets, frameSets);
  const appendedFramesInPlace = [...firstChunk.frames];
  const appendedFrameSetsInPlace = createBorgFrameSetsFromRows(firstChunk.frames);
  assert.equal(
    appendBorgFrameRowsInPlace(appendedFramesInPlace, secondChunk.frames),
    appendedFramesInPlace,
  );
  assert.equal(
    appendBorgFrameSetsInPlace(appendedFrameSetsInPlace, secondChunk.frames),
    appendedFrameSetsInPlace,
  );
  assert.deepEqual(appendedFramesInPlace, mergedFrames);
  assert.deepEqual(appendedFrameSetsInPlace, frameSets);
  assert.deepEqual(frameSets.map((frameSet) => frameSet.frameIndex), [0, 1, 2, 3]);
  assert.equal(frameSets.at(-1).frames.length, 2);
  assert.equal(runner.canComputeNextChunk(), false);

  await runner.dispose();
});

test("Borg display-oversamples prescribed cubic records by four without changing the record", async () => {
  const record = JSON.parse(readFileSync(new URL(
    "../content/assets/borg/records/family-a-a1-general.assembly-view-record.v0.json",
    import.meta.url,
  )));
  const recordSampleInterval = record.window.sampleInterval;
  const runner = createBorgEomRecordReplayRunner(record, {
    targetDuration: recordSampleInterval,
    chunkDuration: recordSampleInterval,
  });

  assert.equal(runner.config.recordSampleInterval, recordSampleInterval);
  assert.equal(
    runner.config.displayOversampleFactor,
    BORG_PRESCRIBED_DISPLAY_OVERSAMPLE_FACTOR,
  );
  assert.equal(
    runner.config.sampleInterval,
    recordSampleInterval / BORG_PRESCRIBED_DISPLAY_OVERSAMPLE_FACTOR,
  );
  assert.equal(record.window.sampleInterval, recordSampleInterval);

  const chunk = await runner.computeNextChunk();
  assert.deepEqual(
    [...new Set(chunk.frames.map((frame) => frame.time))],
    [0, 0.0125, 0.025, 0.0375, 0.05],
  );
  assert.equal(chunk.frames.length, 5 * record.worldlines.length);
  assert.ok(chunk.frames.every((frame) => frame.valueAuthority === "recorded-eom-output"));
  await runner.dispose();
});

test("Borg record replay never upgrades authority from producer-asserted evidence status", async () => {
  const runner = createBorgEomRecordReplayRunner(
    createBorgEomRecordFixture({ evidenceStatus: "canonical" }),
    { targetDuration: 0.6, chunkDuration: 0.6, sampleInterval: 0.2 },
  );
  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.evidenceStatus, "canonical");
  assert.equal(chunk.frames[0].valueAuthority, "recorded-eom-output");
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
      createBorgEomRecordFixture({ contractId: "foreign-contract/v1" }),
    ),
    /requires contractId eom_evolution_contract\/v0/,
  );
  const ungraded = createBorgEomRecordFixture();
  delete ungraded.claimLevel;
  assert.throws(() => createBorgEomRecordReplayRunner(ungraded), /claim grade/);
});

test("Borg orthographic camera fits the limiting viewport dimension without depth scaling", () => {
  assert.deepEqual(
    calculateBorgOrthographicFrustum({
      envelopeWorldRadius: 2,
      margin: 1.5,
      aspect: 2,
    }),
    { left: -6, right: 6, top: 3, bottom: -3 },
  );
  assert.deepEqual(
    calculateBorgOrthographicFrustum({
      envelopeWorldRadius: 2,
      margin: 1.5,
      aspect: 0.5,
    }),
    { left: -3, right: 3, top: 6, bottom: -6 },
  );
  assert.throws(
    () => calculateBorgOrthographicFrustum({
      envelopeWorldRadius: 3,
      margin: 1.5,
      aspect: 0,
    }),
    /viewport aspect must be positive and finite/,
  );
});

test("Borg path-history renderer joins replay rows without visual smoothing curves", () => {
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
  // Prescribed cubic records may be sampled more densely before reaching this
  // renderer. The renderer itself still joins those evaluated rows directly.
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
  assert.doesNotMatch(runtimeSource, /PLAYBACK_SPEED_PRESETS|playbackSpeedPresetById/);
  assert.match(runtimeSource, /requestedRate: BORG_MAX_REALTIME_PLAYBACK_RATE/);
  assert.match(runtimeSource, /BOUNDARY_SHELL_LATITUDE_COUNT = 25/);
  assert.match(runtimeSource, /BOUNDARY_SHELL_LONGITUDE_COUNT = 48/);
  assert.match(runtimeSource, /ENVELOPE_GUIDE_COLOR = 0xcbd0c8/);
  assert.match(runtimeSource, /ENVELOPE_GUIDE_OPACITY = 0\.88/);
  assert.match(runtimeSource, /new THREE\.OrthographicCamera\(/);
  assert.doesNotMatch(runtimeSource, /new THREE\.PerspectiveCamera\(/);
  assert.match(runtimeSource, /calculateBorgOrthographicFrustum/);
  assert.match(runtimeSource, /new THREE\.Points\(/);
  assert.equal((runtimeSource.match(/boundaryShellGroup\.add\(\s*createBoundaryShellPoints\(\{/g) ?? []).length, 1);
  assert.doesNotMatch(runtimeSource, /centralBallGroup/);
  assert.doesNotMatch(runtimeSource, /\["xy", "xz", "yz"\]/);
  assert.doesNotMatch(runtimeSource, /new THREE\.LineLoop/);
  assert.doesNotMatch(runtimeSource, /createEnvelopeGreatCircles/);
  assert.match(runtimeSource, /function fitCameraToEnvelope\(margin\)/);
  assert.match(
    runtimeSource,
    /activeEnvelopeRadius\(\) \*\s*activeWorldUnitsPerSolverUnit\(\)/,
  );
  assert.doesNotMatch(runtimeSource, /\bworldUnitsPerSolverUnit\b/);
  assert.match(runtimeSource, /DEFAULT_CAMERA_FIT_MARGIN = 1\.43/);
  assert.match(runtimeSource, /DEFAULT_PATH_TRAIL_DURATION = 30/);
  assert.match(runtimeSource, /PATH_TRAIL_DURATIONS = Object\.freeze\(\[30, 60, 90, 180, 360\]\)/);
  assert.doesNotMatch(runtimeSource, /centralBallRadius|radialBufferMargin/);
  assert.doesNotMatch(runtimeSource, /BORG_DISPLAY_RUN_GRADE/);
  assert.doesNotMatch(runtimeSource, /borgNdcPositionIsOutsideScreen/);
  assert.doesNotMatch(htmlSource, /borg-status-stack|borg-native-status|borg-manifest-status/);
  assert.doesNotMatch(runtimeSource, /nativeStatus|manifestStatus|STATUS_LABEL/);
  assert.match(runtimeSource, /dom\.sourceProvenance\.hidden = replayActive;/);
  assert.doesNotMatch(runtimeSource, /SphereGeometry/);
  assert.doesNotMatch(runtimeSource, /BoxGeometry/);
  assert.doesNotMatch(runtimeSource, /PLAYBACK_MS_PER_NATIVE_STEP/);
  assert.match(runtimeSource, /RUN_CONTROL_PRESETS/);
  assert.match(runtimeSource, /live-forever/);
  assert.match(runtimeSource, /live-60s/);
  assert.match(runtimeSource, /live-300s/);
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
  assert.doesNotMatch(runtimeSource, /toggleRunDurationMode/);
  assert.doesNotMatch(runtimeSource, /startDynamicNativeRunnerIfNeeded/);
  assert.match(runtimeSource, /dom\.playButton\.disabled = frameSets\.length < 2 && !\(/);
  assert.match(
    runtimeSource,
    /if \(replayActive && state\.replayDisplayMode !== "animated"\) \{\s*setReplayDisplayMode\("animated"\);/,
  );
  assert.doesNotMatch(htmlSource, /id="borg-replay-display-mode"/);
  assert.match(
    runtimeSource,
    /dom\.newDistributionButton\.hidden = replayActive \|\| activePrescribedDisplayBranch != null;/,
  );
  assert.match(
    htmlSource,
    /\.borg-timeline \.borg-icon-button\[hidden\],[\s\S]*\.borg-eom-authority\[hidden\] \{\s*display: none;/,
  );
  assert.match(runtimeSource, /assemblyViewScene\.setPathVisible\(pathGroup\.visible\);/);
  assert.match(runtimeSource, /"diagnostics",\s*\]\);/);
  assert.match(htmlSource, /grid-template-columns: 620px minmax\(0, 1fr\);/);
  assert.match(
    runtimeSource,
    /if \(autoStartEom\) \{\s*if \(replayActive\) \{\s*startRunAndPlayback\(\);\s*\} else \{\s*startDynamicNativeRunner\(\);/,
  );
  assert.match(runtimeSource, /applyLiveRunRetentionIfNeeded/);
  assert.match(runtimeSource, /compactedPathHistory/);
  assert.match(runtimeSource, /switchRunControlPreset/);
  assert.match(runtimeSource, /startNewDistributionRun/);
  // The only frame sources are the live EOM shadow runner, recorded EOM
  // dataset replay, and the accepted seed's endpoint rows. No stored
  // pre-computed run ships with the app.
  assert.match(runtimeSource, /createBorgEomRecordReplayRunner/);
  assert.match(runtimeSource, /createBorgEomShadowRunner/);
  assert.doesNotMatch(runtimeSource, /BorgDynamicNativeRunner/);
  assert.doesNotMatch(runtimeSource, /loadBorgFixtureTrajectoryFrames/);
  assert.doesNotMatch(runtimeSource, /restoreFixtureRun/);
  assert.match(runtimeSource, /appendBorgFrameRowsInPlace/);
  assert.match(runtimeSource, /appendBorgFrameSetsInPlace/);
  assert.match(runtimeSource, /const firstReplayRows = Boolean/);
  assert.match(runtimeSource, /if \(firstReplayRows\) \{\s*rebuildParticleObjects\(\);/);
  assert.match(
    runtimeSource,
    /function activeEnvelopeCenter\(\)[\s\S]*provenance\.prescribedGeometry\?\.responseCenter \?\?\s*manifest\.simulationEnvelope\.center/,
  );
  assert.match(
    runtimeSource,
    /function activeEnvelopeRadius\(\)[\s\S]*prescribedGeometry\?\.sphericalEnvelopeRadius/,
  );
  assert.match(
    runtimeSource,
    /appendBorgFrameRowsInPlace\(currentFrames, chunk\.frames\);[\s\S]*appendBorgFrameSetsInPlace\(frameSets, chunk\.frames\);/,
  );
  assert.doesNotMatch(runtimeSource, /setTimeout\(\s*\(\) => ensureDynamicFramesAhead/);
  assert.match(runtimeSource, /getBorgPlaybackRefillDecision/);
  assert.match(runtimeSource, /Playback pace/);
  assert.doesNotMatch(runtimeSource, /Playback Slow|Playback Normal|Playback Fast/);
  assert.doesNotMatch(runtimeSource, /label: "Realtime"/);
  assert.match(runtimeSource, /function formatActiveTimelineLabel\(time\) \{\s*return formatTimelineLabel\(time\);\s*\}/);
  assert.match(runtimeSource, /createBorgAcceptedInertialSeedHistory/);
  assert.match(runtimeSource, /appendedFrameRows = Array\.isArray\(chunk\.frames\)/);
  assert.doesNotMatch(htmlSource, /M9\.8 6\.2a6\.8/);
  assert.match(htmlSource, /id="borg-start-frame-button"/);
  assert.match(htmlSource, /id="borg-new-distribution-button"/);
  assert.match(htmlSource, /id="borg-run-duration-button"/);
  assert.doesNotMatch(htmlSource, /id="borg-eom-path-count"/);
  assert.doesNotMatch(htmlSource, /id="borg-eom-duration"/);
  assert.match(htmlSource, /id="borg-coupling"[^>]*value="0\.005"/);
  assert.match(htmlSource, /id="borg-step-height"[^>]*value="0\.025"/);
  assert.match(htmlSource, /id="borg-minimum-step"[^>]*value="0\.0001"/);
  assert.match(
    htmlSource,
    /κ coupling[\s\S]*class="borg-step-control-group"[\s\S]*Step height[\s\S]*Adaptive minimum/,
  );
  assert.match(htmlSource, /Max per-axis speed relative to c<sub>f<\/sub> = 1/);
  assert.match(htmlSource, /Minimum total speed relative to c<sub>f<\/sub> = 1/);
  assert.match(
    htmlSource,
    /id="borg-eom-controls"[\s\S]*id="borg-initial-condition-form"[\s\S]*id="borg-initial-condition-fields"/,
  );
  assert.doesNotMatch(htmlSource, /<section[^>]*aria-label="Initial condition fields"/);
  assert.match(htmlSource, /id="borg-eom-history-status"/);
  assert.match(htmlSource, /id="borg-eom-authority"[^>]*data-grade="display"/);
  assert.match(htmlSource, /id="borg-eom-authority-label"[^>]*>Run grade</);
  assert.match(
    htmlSource,
    /id="borg-eom-run-grade"[^>]*class="borg-radio-group"[\s\S]*type="radio" name="borg-eom-run-grade" value="display" checked[\s\S]*Display grade[\s\S]*type="radio" name="borg-eom-run-grade" value="certified"[\s\S]*Claim grade/,
  );
  assert.doesNotMatch(htmlSource, /<select id="borg-eom-run-grade"/);
  assert.match(htmlSource, /id="borg-eom-authority-detail"/);
  assert.match(htmlSource, /\.borg-eom-authority\[data-grade="display"\]/);
  assert.doesNotMatch(htmlSource, /id="borg-eom-stop-button"/);
  assert.doesNotMatch(htmlSource, /id="borg-eom-restart-button"/);
  assert.doesNotMatch(htmlSource, /id="borg-apply-initial-condition"/);
  assert.match(htmlSource, /id="borg-eom-progress"[^>]*value="0"[^>]*hidden/);
  assert.match(htmlSource, /<details id="borg-initial-condition-drawer" class="borg-control-drawer" open>\s*<summary>Initial conditions<\/summary>/);
  assert.match(htmlSource, /class="borg-control-drawer"[\s\S]*<summary>Run status<\/summary>/);
  assert.match(htmlSource, /Initial history[\s\S]*Exact inertial polynomial/);
  assert.match(htmlSource, /Forward evolution[\s\S]*EOM chunks after T=0/);
  assert.match(htmlSource, /id="borg-run-duration-button"[\s\S]*value="live-60s">1 min<[\s\S]*value="live-300s">5 min<[\s\S]*value="live-forever" selected>No limit</);
  assert.match(
    htmlSource,
    /id="borg-history-duration"[\s\S]*value="30" selected>Trail 30 s<[\s\S]*value="60">Trail 60 s<[\s\S]*value="90">Trail 90 s<[\s\S]*value="180">Trail 180 s<[\s\S]*value="360">Trail 360 s</,
  );
  assert.match(htmlSource, /id="borg-time-range"[\s\S]*id="borg-run-duration-button"[\s\S]*id="borg-history-duration"[\s\S]*id="borg-time-output"/);
  assert.doesNotMatch(htmlSource, /id="borg-playback-speed"|aria-label="Playback pace"/);
  assert.match(htmlSource, /id="borg-time-output"[^>]*>T 00:00:00\.0<\/output>/);
  assert.doesNotMatch(runtimeSource, /historyDuration\.hidden/);
  assert.match(runtimeSource, /normalizePathTrailDuration/);
  assert.match(runtimeSource, /duration: state\.pathTrailDuration/);
  assert.match(runtimeSource, /dom\.eomProgress\.hidden = forever/);
  assert.match(runtimeSource, /runtimeControls\.coupling \?\? configured\.coupling/);
  assert.match(runtimeSource, /initialStep: certifiedBudget\.allocations\.controller\.initialStep/);
  assert.match(runtimeSource, /minimumStep: certifiedBudget\.allocations\.controller\.minimumStep/);
  assert.match(runtimeSource, /maximumStep: certifiedBudget\.allocations\.controller\.maximumStep/);
  assert.match(runtimeSource, /forward EOM chunks/);
  assert.match(runtimeSource, /state\.eomRunGrade === BORG_EOM_RUN_GRADE_DISPLAY/);
  assert.match(runtimeSource, /point-projected input history at T=0/);
  assert.match(runtimeSource, /It never changes to display grade/);
  assert.match(runtimeSource, /runtimeControls\.runGrade \?\? configured\.runGrade/);
  assert.doesNotMatch(runtimeSource, /Claim grade through T=/);
  assert.match(
    runtimeSource,
    /function formatTimelineLabel\([\s\S]*?return `T \$\{formatBorgTimelineTime\(time\)\}`;/,
  );
  assert.doesNotMatch(runtimeSource, /return `solver t /);
  assert.doesNotMatch(pathTrailsSource, /runGrade|displayGrade|claim-ready/u);
  assert.match(runtimeSource, /Exact polynomial causal seed history \(C1 inertial\)/);
  assert.match(runtimeSource, /Causal seed-history depth/);
  assert.match(runtimeSource, /EOM retained-history start/);
  assert.match(runtimeSource, /close-pair threshold εc/);
  assert.match(
    runtimeSource,
    /function startRunAndPlayback\(\)[\s\S]*beginPlaybackPrefill\(firstChunk, generation\)/,
  );
  assert.match(
    runtimeSource,
    /function startRunAndPlayback\(\) \{\s*state\.playbackRequested = true;\s*setPlayButtonPresentation\(true\);/,
  );
  assert.match(runtimeSource, /state\.playing \|\| state\.playbackRequested/);
  assert.match(runtimeSource, /"aria-busy",\s*state\.playbackRequested && !state\.playing/);
  assert.match(
    runtimeSource,
    /function prefillPlaybackBuffer[\s\S]*BORG_PLAYBACK_PREFILL_MAX_WALL_MS[\s\S]*startPlayback\(\{ prefillComplete: true \}\)/,
  );
  assert.match(
    runtimeSource,
    /state\.playbackRequested &&\s*!state\.playing &&\s*!state\.playbackPrefillPromise &&\s*frameSets\.length >= 2[\s\S]*startPlayback\(\{ prefillComplete: true \}\)/,
  );
  assert.match(runtimeSource, /selected; press Play to run/);
  assert.match(runtimeSource, /scheduleInitialConditionReset/);
  assert.match(runtimeSource, /applyInitialConditionResetNow/);
  assert.match(runtimeSource, /startNewDistributionRun\(\{ advanceSeed: true, autoStart: false \}\)/);
  assert.match(runtimeSource, /if \(isEomSimulationActive\(\) && !state\.dynamicRunner\) \{\s*startRunAndPlayback\(\);/);
  assert.match(
    htmlSource,
    /id="borg-starting-geometry"[^>]*class="borg-radio-group"[\s\S]*Starting geometry[\s\S]*type="radio" name="borg-starting-geometry" value="random" checked[\s\S]*Random architrinos/,
  );
  assert.doesNotMatch(htmlSource, /<select id="borg-starting-geometry"/);
  assert.match(runtimeSource, /appendBorgRadioChoice[\s\S]*catalogEntry\.label/);
  assert.match(runtimeSource, /setBorgRadioGroupValue\(dom\.startingGeometry, activeStartingGeometryId\)/);
  assert.match(htmlSource, /\.borg-radio-choice[\s\S]*font-size: 12px/);
  assert.match(runtimeSource, /navigation\.load\(nextId\)/);
  assert.doesNotMatch(htmlSource, /Open prescribed geometry workspace/);
  assert.match(
    htmlSource,
    /id="borg-starting-geometry"[\s\S]*id="borg-eom-authority"[\s\S]*id="borg-assembly-view-controls"/,
  );
  assert.match(htmlSource, /id="borg-start-prescribed-display"[^>]*>Continue with Display simulation<\/button>/);
  assert.match(runtimeSource, /createBorgPrescribedDisplayBranch/);
  assert.match(runtimeSource, /simulationWorkspaceSnapshots/);
  assert.match(runtimeSource, /let currentFrames = replayActive \? \[\] : \[\.\.\.initialDisplayRows\];/);
  assert.match(runtimeSource, /if \(!replayActive && activePrescribedDisplayBranch == null\)/);
  assert.match(runtimeSource, /Selected history cut: T=\$\{cut\.toFixed\(3\)\}/);
  assert.doesNotMatch(runtimeSource, /Start display simulation from T=/);
  assert.doesNotMatch(htmlSource, /borg-replay-strobe|borg-replay-loop-period/);
  assert.doesNotMatch(runtimeSource, /replayStrobe|replayLoop|resolveBorgAssemblyViewStrobeTime/);
  assert.match(htmlSource, /id="borg-replay-export"[^>]*>Export image<\/button>[\s\S]*id="borg-replay-export-animation"[^>]*disabled[^>]*>Export animation<\/button>/);
  assert.match(runtimeSource, /dom\.runDurationButton\.hidden = replayActive;/);
  assert.doesNotMatch(runtimeSource, /Recorded coverage|recorded-coverage/);
  assert.match(runtimeSource, /"Prescribed geometry · display-only"/);
  assert.match(runtimeSource, /"Prescribed geometry · Display simulation"/);
  assert.match(
    runtimeSource,
    /nextFromSetIndex >= frameSets\.length - 1[\s\S]*newestFrameSet[\s\S]*applyFrameSet\(newestFrameSet[\s\S]*playbackFromSetIndex = newestSetIndex/,
  );
  assert.doesNotMatch(htmlSource, /id="borg-run-source"/);
  assert.doesNotMatch(htmlSource, /id="borg-playback-speed"/);
  assert.match(
    htmlSource,
    /id="borg-diagnostics-toggle"[\s\S]*aria-label="Show diagnostics"[\s\S]*aria-pressed="false"/,
  );
  assert.match(
    htmlSource,
    /id="borg-diagnostics-panel"[\s\S]*aria-hidden="true"[\s\S]*inert/,
  );
  assert.match(runtimeSource, /refreshDiagnosticsPanel\(\)[\s\S]*diagnosticsPanelController\.renderIfOpen\(\)/);
  assert.match(runtimeSource, /calculateBorgPolarityDiagnostics/);
  assert.match(runtimeSource, /electrinos outside sphere now/);
  assert.match(runtimeSource, /positrinos escaped by time/);
  assert.match(runtimeSource, /all same-polarity close fraction/);
  assert.match(runtimeSource, /opposite-polarity close fraction/);
  assert.match(
    htmlSource,
    /class="borg-viewport-toolbar"[\s\S]*id="borg-layer-strip"[\s\S]*class="borg-solver-banner-slot"[\s\S]*id="borg-solver-banner"[\s\S]*id="borg-reset-view-button"/,
  );
  assert.match(
    htmlSource,
    /#borg-solver-banner \{[\s\S]*height: 32px;[\s\S]*text-overflow: ellipsis;[\s\S]*white-space: nowrap;/,
  );
  assert.match(
    htmlSource,
    /\.borg-solver-banner-slot \{[\s\S]*min-width: 0;[\s\S]*height: 32px;/,
  );
  assert.match(
    htmlSource,
    /\.borg-camera-drawer \{[\s\S]*position: relative;[\s\S]*\.borg-camera-controls \{[\s\S]*grid-template-columns: repeat\(3, 32px\);/,
  );
  assert.match(htmlSource, /\.borg-viewport-chip \{[\s\S]*border-radius: 6px;/);
  assert.match(htmlSource, /\.borg-replay-grid \{[\s\S]*align-items: end;/);
  assert.match(
    htmlSource,
    /\.borg-camera-controls \.borg-icon-button \{[\s\S]*width: 32px;[\s\S]*min-width: 32px;[\s\S]*padding: 0;/,
  );
  assert.match(runtimeSource, /banner\.textContent = detail \? `\$\{message\} — \$\{detail\}` : message;/);
});

test("Borg surface keeps EOM-native layer policy and fail-closed authority", () => {
  const surfaceDesign = BORG_APP_SURFACE_DESIGN_V1;
  assert.equal(surfaceDesign.authorityMap.centralBallAcceleration, undefined);
  assert.equal(surfaceDesign.noAuthorityPromotions, true);

  const pathHistoryLayer = surfaceDesign.layerStrip.find((layer) => layer.layer === "path-history");
  assert.equal(pathHistoryLayer.displayTransform, "adjacent-native-row-line-segments");
  assert.equal(pathHistoryLayer.smoothingPolicy, "none");

  const wakeLayer = surfaceDesign.layerStrip.find((layer) => layer.layer === "wake-streams");
  assert.equal(wakeLayer.state, "disabled");
  assert.equal(wakeLayer.valueAuthority, "fail-closed-value");
  const shellLayer = surfaceDesign.layerStrip.find((layer) => layer.layer === "boundary-shell-status");
  assert.equal(shellLayer.state, "contextual-disabled");
  assert.equal(shellLayer.valueAuthority, "fail-closed-value");
});

test("Borg prescribed-geometry provenance presents source-carried braid taxonomy", () => {
  const assemblyViewControlsSource = readFileSync(
    new URL("../src/apps/borg/BorgAssemblyViewControls.js", import.meta.url),
    "utf8",
  );
  assert.match(assemblyViewControlsSource, /\["Braid family", taxonomy\.familyLabel\]/);
  assert.match(assemblyViewControlsSource, /\["Candidate", taxonomy\.displayLabel\]/);
  assert.match(assemblyViewControlsSource, /\["Member definition", `\$\{taxonomy\.memberId\} — \$\{taxonomy\.memberLabel\}`\]/);
  assert.match(assemblyViewControlsSource, /\["Instantiation", taxonomy\.instantiationLabel\]/);
  assert.match(assemblyViewControlsSource, /\["Canon source", taxonomy\.canonSource\]/);
});

function uniqueFrameIndexes(frames) {
  return [...new Set(frames.map((frame) => frame.frameIndex))];
}
