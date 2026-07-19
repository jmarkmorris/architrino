import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgAppManifest.js";
import {
  BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL,
  BORG_EOM_SHADOW_RUN_SOURCE,
  createBorgContinuousRetainedHistories,
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
  createBorgEomShadowRunner,
  trimBorgRetainedHistories,
} from "../src/apps/borg/BorgEomShadowRunner.js";
import {
  BORG_NATIVE_EOM_PROTOCOL_MAGIC,
  createBorgNativeEomProcessClient,
  encodeNativeRequest,
} from "../scripts/eom/BorgNativeEomProcessClient.mjs";
import { createBorgEomHttpClient } from "../src/apps/borg/BorgEomHttpClient.js";
import {
  BORG_ACCEPTED_SEED_HISTORY_CLAIM_LEVEL,
  BORG_ACCEPTED_SEED_HISTORY_PROVENANCE,
  BORG_PRESCRIBED_INITIAL_HISTORY_CLAIM_LEVEL,
  BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE,
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgPrescribedLinearHistoryRows,
  createBorgSeededInitialConditionRows,
} from "../src/apps/borg/BorgInitialConditions.js";
import {
  BORG_DEFAULT_RUNTIME_MODE,
  BORG_RECORD_REPLAY_RUNTIME_MODE,
  bootBorgApp,
  createBorgStartupSeedIndex,
  resolveBorgRuntimeMode,
} from "../src/apps/borg/BorgBootstrap.js";
import {
  createBorgPlacementPolicy,
} from "../src/apps/borg/BorgInteractiveDefaults.js";
import {
  BORG_CERTIFIED_BUDGET_PRESETS,
} from "../src/apps/borg/BorgCertifiedBudgets.js";

const trajectoryFrames = createBorgPrescribedLinearHistoryRows(
  createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 17,
    config: {
      electrinoCount: 3,
      positrinoCount: 3,
      randomVelocityMaxComponentMagnitude: 0.042,
      randomVelocityMinSpeed: 0.0144,
    },
  }),
  { historyStartTime: 0, historyEndTime: 10 },
);

test("Borg mounts EOM idle by default and reserves automatic compute for explicit shadow mode", async () => {
  const eomClient = { async evolveRetainedHistories() {} };
  const defaultMounts = [];
  const defaultResult = await bootBorgApp({
    search: "",
    startupSeedIndex: 101,
    createEomClient: () => eomClient,
    mountApp(options) {
      defaultMounts.push(options);
      return "default-eom-mounted";
    },
  });

  assert.equal(resolveBorgRuntimeMode(""), BORG_DEFAULT_RUNTIME_MODE);
  assert.equal(defaultResult, "default-eom-mounted");
  assert.equal(defaultMounts.length, 1);
  assert.equal(defaultMounts[0].autoStartEom, false);
  assert.equal(defaultMounts[0].manifest.simulationEnvelope.kind, "sphere");
  assert.equal(defaultMounts[0].manifest.simulationEnvelope.outerRadius, 0.5);
  assert.equal(defaultMounts[0].manifest.simulationEnvelope.centralBallRadius, undefined);
  assert.equal(defaultMounts[0].manifest.simulationEnvelope.radialBufferMargin, undefined);
  assert.equal(defaultMounts[0].manifest.modelControls.coupling, 0.05);
  assert.equal(defaultMounts[0].eomShadowRunner.coupling, "0.0005");
  assert.equal(defaultMounts[0].eomShadowRunner.simulationOuterRadius, 0.5);
  assert.equal(defaultMounts[0].eomShadowRunner.chunkDuration, 0.3);
  assert.equal(defaultMounts[0].eomShadowRunner.initialStep, "0.05");
  assert.equal(defaultMounts[0].eomShadowRunner.minimumStep, "0.0001");
  assert.equal(defaultMounts[0].eomShadowRunner.maximumStep, "0.05");
  assert.equal(defaultMounts[0].eomShadowRunner.useAdaptiveStepGrowth, true);
  assert.equal(defaultMounts[0].eomShadowRunner.certifiedBudgetId, "research-certified-v1");
  assert.deepEqual(defaultMounts[0].manifest.simulationEnvelope.center, {
    x: 0.5,
    y: 0.5,
    z: 0.5,
  });
  assert.equal(defaultMounts[0].initialEomSeed.rows.length, 6 * 2);
  assert.equal(defaultMounts[0].initialEomSeed.endpointRows.length, 6);
  assert.equal(defaultMounts[0].initialEomSeed.certificate.accepted, true);
  assert.equal(defaultMounts[0].initialEomSeed.certificate.eomOutput, false);
  assert.equal(defaultMounts[0].initialEomSeed.certificate.canonicalEomEvidence, false);
  assert.equal(defaultMounts[0].initialEomSeed.certificate.geometryCertificate.accepted, true);
  const displayPlacement = createBorgPlacementPolicy(
    BORG_DATASET_MANIFEST_V1,
    6,
  );
  assert.equal(
    defaultMounts[0].initialEomSeed.certificate.geometryCertificate.requiredMinimumSeparation,
    displayPlacement.minimumPairSeparation,
  );
  assert.equal(defaultMounts[0].eomShadowRunner.eomClient, eomClient);
  assert.equal(defaultMounts[0].eomShadowRunner.pathCount, 6);
  assert.equal(defaultMounts[0].eomShadowRunner.startTime, 0);
  assert.equal(
    defaultMounts[0].eomShadowRunner.historyDepth,
    calculateBorgInertialHistoryDepth(defaultMounts[0].initialEomSeed.endpointRows, {
      maximumSeparation: 1,
    }),
  );
  assert.ok(defaultMounts[0].eomShadowRunner.historyDepth > 1);
  assert.ok(defaultMounts[0].eomShadowRunner.historyDepth < 1.1);
  assert.equal(
    defaultMounts[0].manifest.simulationEnvelope.historyDepth,
    defaultMounts[0].eomShadowRunner.historyDepth,
  );
  assert.equal(
    defaultMounts[0].manifest.simulationEnvelope.wakeHorizon,
    defaultMounts[0].eomShadowRunner.historyDepth,
  );
  defaultMounts[0].initialEomSeed.endpointRows.forEach((row) => {
    assert.ok(Math.hypot(
      row.position.x - 0.5,
      row.position.y - 0.5,
      row.position.z - 0.5,
    ) <= 0.5 + 1e-12);
  });
  assert.equal(defaultMounts[0].eomShadowRunner.targetDuration, 60);
  assert.equal(defaultMounts[0].eomShadowRunner.runDuration, 60);
  assert.deepEqual(defaultMounts[0].initialConditionConfig, {
    electrinoCount: 3,
    positrinoCount: 3,
    randomVelocityMaxComponentMagnitude: 0,
    randomVelocityMinSpeed: 0,
  });
  assert.equal(
    defaultMounts[0].initialEomSeed.endpointRows.every((row) =>
      Object.values(row.velocity).every((value) => value === 0)),
    true,
  );
  assert.deepEqual(
    defaultMounts[0].initialEomSeed.endpointRows.map((row) => row.pathKey),
    Array.from({ length: 6 }, (unused, index) => 1001 + index),
  );

  const explicitShadowMounts = [];
  await bootBorgApp({
    search: "?eom=shadow",
    startupSeedIndex: 101,
    createEomClient: () => eomClient,
    mountApp(options) {
      explicitShadowMounts.push(options);
      return "explicit-shadow-mounted";
    },
  });
  assert.equal(explicitShadowMounts.length, 1);
  assert.equal(explicitShadowMounts[0].autoStartEom, true);


  const record = {
    contractId: "eom_evolution_contract/v0",
    runId: "borg-boot-record-run",
    claimLevel: "evolved-record",
    histories: [],
  };
  const recordMounts = [];
  const fetchCalls = [];
  const recordResult = await bootBorgApp({
    search: "?eomRecord=https://example.test/run.json",
    fetchLike: async (url) => {
      fetchCalls.push(url);
      return { ok: true, async json() { return record; } };
    },
    mountApp(options) {
      recordMounts.push(options);
      return "record-replay-mounted";
    },
  });

  assert.equal(
    resolveBorgRuntimeMode("?eomRecord=https://example.test/run.json"),
    BORG_RECORD_REPLAY_RUNTIME_MODE,
  );
  assert.equal(recordResult, "record-replay-mounted");
  assert.deepEqual(fetchCalls, ["https://example.test/run.json"]);
  assert.equal(recordMounts.length, 1);
  assert.equal(recordMounts[0].eomRecordReplay.record, record);
  assert.equal(recordMounts[0].eomShadowRunner, undefined);

  await assert.rejects(
    bootBorgApp({
      search: "?eomRecord=https://example.test/missing.json",
      fetchLike: async () => ({ ok: false, status: 404 }),
      mountApp() {
        throw new Error("must not mount on a failed record fetch");
      },
    }),
    /Borg EOM record fetch failed \(404\)/,
  );
});

test("Borg startup seed is randomized but remains injectable for deterministic controls", async () => {
  const generated = createBorgStartupSeedIndex({
    getRandomValues(values) {
      values[0] = 0xdecafbad;
      return values;
    },
  });
  assert.equal(generated, 0xdecafbad);

  const mounts = [];
  for (const startupSeedIndex of [101, 202]) {
    await bootBorgApp({
      startupSeedIndex,
      createEomClient: () => ({ async evolveRetainedHistories() {} }),
      mountApp(options) {
        mounts.push(options);
        return options;
      },
    });
  }
  assert.deepEqual(mounts.map((mount) => mount.initialDistributionSeedIndex), [101, 202]);
  assert.notDeepEqual(
    mounts[0].initialEomSeed.endpointRows.map((row) => row.position),
    mounts[1].initialEomSeed.endpointRows.map((row) => row.position),
  );
});

test("Borg EOM accepts individual polarity counts through a continuous prescribed initial history", () => {
  const endpointRows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 3,
    config: {
      electrinoCount: 1,
      positrinoCount: 1,
      randomVelocityMaxComponentMagnitude: 0.02,
      randomVelocityMinSpeed: 0.01,
    },
  });
  const frameRows = createBorgPrescribedLinearHistoryRows(endpointRows, {
    historyStartTime: 118,
    historyEndTime: 300,
  });
  const histories = createBorgContinuousRetainedHistories(
    frameRows,
    BORG_DATASET_MANIFEST_V1,
    {
      historyStartTime: 118,
      historyEndTime: 300,
      expectedPathCount: 2,
    },
  );

  assert.equal(histories.length, 2);
  assert.equal(histories[0].coverageStart, "118");
  assert.equal(histories[0].coverageEnd, "300");
  assert.equal(histories[0].segments.length, 1);
  assert.equal(histories[0].sourceProvenance, BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE);
  assert.equal(histories[0].sourceClaimLevel, BORG_PRESCRIBED_INITIAL_HISTORY_CLAIM_LEVEL);
});

test("Borg computes artificial-history depth from causal separation and transmitter speed", () => {
  const rows = [
    {
      pathKey: 1,
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
    },
    {
      pathKey: 2,
      position: { x: 3, y: 0, z: 0 },
      velocity: { x: 0.5, y: 0, z: 0 },
    },
  ];
  assert.equal(calculateBorgInertialHistoryDepth(rows), 6.01);
  assert.equal(
    calculateBorgInertialHistoryDepth(rows, { maximumSeparation: 4 }),
    8.01,
  );
  assert.throws(
    () => calculateBorgInertialHistoryDepth([{
      pathKey: 3,
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
    }]),
    /requires sub-field transmitter speed/,
  );
});

test("Borg EOM migration uses canonical field speed and the declared memory depth", () => {
  const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
    startTime: 300,
    targetDuration: 300.2,
    sampleInterval: 0.2,
  });
  const expectedGeometricDelayBound = 1;

  assert.equal(config.fieldSpeed, 1);
  assert.equal(config.geometricDelayBound, expectedGeometricDelayBound);
  assert.equal(config.historyDepth, 10);
  assert.equal(config.initialStep, "0.05");
  assert.equal(config.maximumStep, "0.05");
  assert.equal(config.useAdaptiveStepGrowth, true);
  assert.equal(config.farFieldEnclosureFraction, "0.25");
  assert.equal(config.coreScale, 0.2);
  assert.ok(Math.abs(config.historyStartTime - (300 - config.historyDepth)) < 1e-12);
  assert.throws(
    () => createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
      startTime: 0,
      targetDuration: 0.2,
      maximumStep: "0.025",
    }),
    /maximumStep is fixed by the selected certified budget/,
  );

  const expandedPopulationConfig = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
    startTime: 0,
    targetDuration: 0.01,
    pathCount: 32,
  });
  assert.equal(expandedPopulationConfig.pathCount, 32);

  const fallbackConfig = createBorgEomShadowRunConfig({
    simulationEnvelope: { outerRadius: 50, sampleInterval: 0.2 },
    population: { architrinoCount: 1 },
    trajectoryRecord: { historyStartTime: 0, historyEndTime: 300 },
  }, {
    targetDuration: 300.2,
  });
  assert.equal(fallbackConfig.fieldSpeed, 1);
});

test("Borg certified-budget hashes identify the complete canonical allocations", () => {
  for (const preset of BORG_CERTIFIED_BUDGET_PRESETS) {
    assert.equal(
      createHash("sha256")
        .update(preset.allocationCanonicalJson)
        .digest("hex"),
      preset.allocationHash,
    );
  }
});

test("Borg EOM migration imports a complete continuous past, never a state-only start", () => {
  const histories = createBorgContinuousRetainedHistories(
    trajectoryFrames,
    BORG_DATASET_MANIFEST_V1,
    { historyEndTime: 10 },
  );

  assert.equal(histories.length, 6);
  for (const history of histories) {
    assert.equal(history.coverageStart, "0");
    assert.equal(history.coverageEnd, "10");
    assert.equal(history.segments.length, 1);
    assert.equal(history.interpolation, "piecewise-cubic-hermite/v0");
    assert.equal(history.sourceProvenance, BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE);
    assert.equal(history.sourceClaimLevel, BORG_PRESCRIBED_INITIAL_HISTORY_CLAIM_LEVEL);
  }

  assert.throws(
    () =>
      createBorgContinuousRetainedHistories(
        trajectoryFrames.filter((row) => row.time === 0),
        BORG_DATASET_MANIFEST_V1,
        { historyEndTime: 0 },
      ),
    /lacks continuous retained history/,
  );
});

test("Borg EOM shadow runner sends retained histories and derives frames only from published histories", async () => {
  const requests = [];
  const eomClient = {
    async evolveRetainedHistories(request) {
      requests.push(request);
      return createFakeEomResponse(request, "executable_architecture_evidence");
    },
  };
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
    threadCount: 4,
  });

  const chunk = await runner.computeNextChunk();
  const request = requests[0];
  assert.equal(request.contractId, "eom_evolution_contract/v1");
  assert.deepEqual(request.contractAmendmentIds, []);
  assert.equal(request.claimLevel, "migration-shadow");
  assert.deepEqual(request.absoluteTimeInterval, { start: "10", end: "10.2" });
  assert.equal(request.histories.length, 6);
  assert.equal(request.histories[0].coverageEnd, "10");
  assert.equal(request.numericalControls.threadCount, 4);
  assert.equal(request.numericalControls.initialStep, "0.05");
  assert.equal(request.numericalControls.maximumStep, "0.05");
  assert.equal(request.numericalControls.useAdaptiveStepGrowth, true);
  assert.equal(request.numericalControls.farFieldEnclosureFraction, "0.25");
  assert.equal(request.modelControls.selfPairs, "included-except-coincident-endpoint");
  assert.equal(request.modelControls.futurePathPolicy, "prohibited");
  assert.equal(request.modelControls.fieldSpeed, "1");
  assert.equal(request.modelControls.coreScale, "0.2");
  assert.equal("initialStates" in request, false);
  assert.equal("futurePaths" in request, false);

  assert.equal(chunk.source, BORG_EOM_SHADOW_RUN_SOURCE);
  assert.equal(chunk.coreScale, 0.2);
  assert.equal(chunk.retainedHistoryStart, 0);
  assert.equal(chunk.retainedHistoryEnd, 10.2);
  assert.equal(chunk.retainedHistoryPolicy, "rolling-certified-history-window");
  assert.equal(chunk.phase, "live");
  assert.equal(chunk.statusCode, "ok");
  assert.equal(chunk.evidenceStatus, "executable_architecture_evidence");
  assert.equal(chunk.promotionEligible, false);
  assert.equal(chunk.frames.length, 12);
  assert.equal(chunk.frames.every((frame) => frame.runSource === BORG_EOM_SHADOW_RUN_SOURCE), true);
  assert.equal(
    chunk.frames.every((frame) => frame.valueAuthority === "eom-shadow-output"),
    true,
  );
  assert.equal(chunk.histories.every((history) => history.coverageEnd === "10.2"), true);
});

test("Borg EOM requests preserve the native checkpoint's exact decimal cut time", () => {
  const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
    startTime: 32.40999999999992,
    targetDuration: 32.42,
  });
  const histories = createBorgContinuousRetainedHistories(
    trajectoryFrames,
    BORG_DATASET_MANIFEST_V1,
    { historyEndTime: 10 },
  ).map((history) => ({
    ...history,
    coverageEnd: "32.409999999999918",
  }));
  const request = createBorgEomShadowRequest({
    manifest: BORG_DATASET_MANIFEST_V1,
    config,
    histories,
    chunkIndex: 0,
    startTime: histories[0].coverageEnd,
    endTime: 32.42,
  });

  assert.equal(request.absoluteTimeInterval.start, "32.409999999999918");
});

test("Borg EOM carries the controller height across atomic chunks", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return {
          ...createFakeEomResponse(request, "executable_architecture_evidence"),
          controllerStepSize: requests.length === 1 ? "0.025" : "0.05",
        };
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.4,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
  });

  const first = await runner.computeNextChunk();
  const second = await runner.computeNextChunk();

  assert.equal(requests[0].numericalControls.initialStep, "0.05");
  assert.equal(first.controllerStepSize, "0.025");
  assert.equal(requests[1].numericalControls.initialStep, "0.025");
  assert.equal(second.controllerStepSize, "0.05");
  assert.equal(requests[1].numericalControls.maximumStep, "0.05");
  assert.equal(requests[1].numericalControls.useAdaptiveStepGrowth, true);
});

test("Borg EOM shadow runner supports a deterministic retained-history population subset", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "executable_architecture_evidence");
      },
    },
    pathCount: 4,
    initialFrameRows: trajectoryFrames.filter((row) => Number(row.pathKey) <= 1004),
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
  });
  const chunk = await runner.computeNextChunk();
  assert.equal(requests[0].histories.length, 4);
  assert.deepEqual(requests[0].histories.map((history) => history.pathId), ["1001", "1002", "1003", "1004"]);
  assert.equal(chunk.frames.length, 8);
});

test("Borg EOM preserves the finite UI duration, supports Forever, and keeps its atomic chunk", () => {
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: { async evolveRetainedHistories() {} },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.1,
    chunkDuration: 0.01,
    sampleInterval: 0.01,
  });
  runner.setRunLimits({ targetDuration: 10.05, chunkDuration: 20 });
  assert.equal(runner.targetDuration, 10.1);
  assert.equal(runner.chunkDuration, 0.01);

  runner.setRunLimits({
    targetDuration: Number.POSITIVE_INFINITY,
    chunkDuration: 20,
  });
  assert.equal(runner.targetDuration, Number.POSITIVE_INFINITY);
  assert.equal(runner.chunkDuration, 0.01);
  assert.equal(runner.canComputeNextChunk(), true);
});

test("Borg promotion accepts canonical evolution from certified initial history", async () => {
  const eomClient = {
    async evolveRetainedHistories(request) {
      return createFakeEomResponse(request, "canonical");
    },
  };
  const endpointRows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 9,
    config: {
      electrinoCount: 1,
      positrinoCount: 1,
      randomVelocityMaxComponentMagnitude: 0.02,
      randomVelocityMinSpeed: 0.01,
    },
  });
  const seed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: -0.2,
    historyEndTime: 0,
    sampleInterval: 0.2,
    digest: async () => "promotion-seed-digest",
  });
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: seed.rows,
    pathCount: 2,
    startTime: 0,
    historyDepth: 0.2,
    targetDuration: 0.2,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
    acceptanceGate: {
      schema: "eom_acceptance_gate/v0",
      status: "passed",
      borgMigrationAuthorized: true,
    },
  });

  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.promotionEligible, true);
  assert.equal(chunk.initialHistoryAccepted, true);
  assert.equal(
    chunk.evolutionClaimLevel,
    BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL,
  );
  assert.equal(chunk.frames.every(
    (frame) => frame.valueAuthority ===
      "canonical-eom-output-conditioned-on-accepted-initial-history"
  ), true);
});

test("Borg publishes EOM evolution from accepted initial history at T=0", async () => {
  const endpointRows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 4,
    config: {
      electrinoCount: 1,
      positrinoCount: 1,
      randomVelocityMaxComponentMagnitude: 0.02,
      randomVelocityMinSpeed: 0.01,
    },
  });
  const seed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: -0.02,
    historyEndTime: 0,
    sampleInterval: 0.01,
    digest: async () => "seed-digest",
  });
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "executable_architecture_evidence");
      },
    },
    initialFrameRows: seed.rows,
    initialHistoryProvenance: BORG_ACCEPTED_SEED_HISTORY_PROVENANCE,
    initialHistoryClaimLevel: BORG_ACCEPTED_SEED_HISTORY_CLAIM_LEVEL,
    pathCount: 2,
    startTime: 0,
    historyDepth: 0.02,
    targetDuration: 0.03,
    chunkDuration: 0.01,
    sampleInterval: 0.01,
  });

  const first = await runner.computeNextChunk();
  const second = await runner.computeNextChunk();
  const live = await runner.computeNextChunk();

  assert.equal(first.phase, "live");
  assert.equal(first.frames.length > 0, true);
  assert.equal(first.initialHistoryAccepted, true);
  assert.equal(second.phase, "live");
  assert.equal(second.histories.every((history) => history.coverageStart === "0"), true);
  assert.equal(second.histories.every((history) => history.sourceAcceptedInitialDatum === true), true);
  assert.equal(second.histories.every((history) => history.sourceProvenance === BORG_ACCEPTED_SEED_HISTORY_PROVENANCE), true);
  assert.equal(second.histories.every((history) =>
    history.segments.every((segment) => Number(segment.startTime) >= 0)
  ), true);
  assert.equal(live.phase, "live");
  assert.equal(requests[0].provenance.importedHistoryIsAcceptedInitialDatum, true);
  assert.equal(requests[2].provenance.importedHistoryIsAcceptedInitialDatum, true);
});

test("Borg refuses to approximate a retained-history trim between segment boundaries", () => {
  assert.throws(
    () => trimBorgRetainedHistories([{
      pathId: "1001",
      segments: [{ startTime: "0", endTime: "1", coefficients: [] }],
    }], { coverageStart: 0.5 }),
    /does not align with an exact segment boundary/,
  );
});

test("Borg EOM shadow response rejects reordered or incomplete published histories", async () => {
  const eomClient = {
    async evolveRetainedHistories(request) {
      const response = createFakeEomResponse(request, "canonical");
      response.histories.reverse();
      return response;
    },
  };
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await assert.rejects(
    runner.computeNextChunk(),
    /incomplete or reordered histories/,
  );
});

test("Borg EOM fail-closed responses preserve native diagnostics", async () => {
  const diagnostics = [{ code: "minimum_step_exhausted", rootFailureCount: 240 }];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories() {
        return {
          status: "failed",
          haltCode: "minimum_step_exhausted",
          diagnostics,
        };
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await assert.rejects(runner.computeNextChunk(), (error) => {
    assert.equal(error.code, "minimum_step_exhausted");
    assert.deepEqual(error.eomResponse.diagnostics, diagnostics);
    return true;
  });
});

test("Borg displays an atomic certified prefix while rejecting the halted candidate", async () => {
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        const response = createFakeEomResponse(
          request, "failed", { endTime: "10.1" },
        );
        return {
          ...response,
          status: "halted",
          haltCode: "root_completeness_not_certified",
          allStepsAtomic: true,
          acceptedEndTime: "10.1",
        };
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
    sampleInterval: 0.05,
  });
  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.statusCode, "halted-prefix");
  assert.equal(chunk.endTime, 10.1);
  assert.equal(chunk.terminalHalt.failedCandidateRejected, true);
  assert.equal(chunk.terminalHalt.code, "root_completeness_not_certified");
  assert.equal(chunk.promotionEligible, false);
  assert.equal(chunk.frames.at(-1).time, 10.1);
  assert.equal(runner.canComputeNextChunk(), false);
});

test("Borg refuses to display a halted response without a nonempty atomic prefix", async () => {
  const makeRunner = ({ acceptedEndTime, allStepsAtomic }) =>
    createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
      eomClient: {
        async evolveRetainedHistories(request) {
          const response = createFakeEomResponse(
            request, "failed", { endTime: acceptedEndTime },
          );
          return {
            ...response,
            status: "halted",
            haltCode: "root_completeness_not_certified",
            allStepsAtomic,
            acceptedEndTime,
          };
        },
      },
      initialFrameRows: trajectoryFrames,
      startTime: 10,
      targetDuration: 10.2,
      chunkDuration: 0.2,
    });

  await assert.rejects(
    makeRunner({ acceptedEndTime: "10.1", allStepsAtomic: false })
      .computeNextChunk(),
    /failed closed: root_completeness_not_certified/u,
  );
  await assert.rejects(
    makeRunner({ acceptedEndTime: "10", allStepsAtomic: true })
      .computeNextChunk(),
    /failed closed: root_completeness_not_certified/u,
  );
});

test("Borg native process protocol carries the same continuous-history request", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "executable_architecture_evidence");
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await runner.computeNextChunk();
  const protocol = encodeNativeRequest(requests[0]);
  assert.equal(protocol.split("\n")[0], BORG_NATIVE_EOM_PROTOCOL_MAGIC);
  assert.match(protocol, /^EOM_BORG_NATIVE_V8\nRUN\t/u);
  const runFields = protocol.split("\n")[1].split("\t");
  assert.equal(runFields.length, 54);
  assert.equal(runFields[4], "0.05");
  assert.equal(runFields[6], "0.05");
  assert.equal(runFields[7], "1");
  assert.equal(runFields[10], "0.2");
  assert.equal(runFields[13], "0.25");
  assert.equal(runFields[18], String(64 * 1024 * 1024));
  assert.equal(runFields[19], "borg_certified_budget/v1");
  assert.equal(runFields[20], "research-certified-v1");
  assert.equal(runFields[21], requests[0].certifiedBudget.allocationHash);
  assert.equal(runFields[22], requests[0].certifiedBudget.allocationCanonicalJson);
  assert.equal(protocol.match(/^PATH\t/gmu)?.length, 6);
  assert.equal(protocol.match(/^SEG\t/gmu)?.length, 6);
  assert.match(protocol, /\nEND\n$/u);
  assert.equal(protocol.includes("initialStates"), false);
  assert.equal(protocol.includes("futurePaths"), false);

  const deltaProtocol = encodeNativeRequest(requests[0], {
    cachedHistories: requests[0].histories,
  });
  const deltaPathRows = deltaProtocol.split("\n")
    .filter((line) => line.startsWith("PATH\t"))
    .map((line) => line.split("\t"));
  assert.equal(deltaPathRows.length, 6);
  assert.equal(deltaPathRows.every((fields) => fields.length === 6), true);
  assert.equal(deltaPathRows.every((fields) => fields[4] === "1"), true);
  assert.equal(deltaPathRows.every((fields) => fields[5] === "0"), true);
  assert.equal(deltaProtocol.match(/^SEG\t/gmu), null);

  const alternateCoreRequest = {
    ...requests[0],
    modelControls: {
      ...requests[0].modelControls,
      coreScale: "0.125",
    },
  };
  assert.throws(
    () => encodeNativeRequest(alternateCoreRequest),
    /coreScale does not match its certified budget allocation/,
  );

  const fixedHeightRequest = {
    ...requests[0],
    numericalControls: {
      ...requests[0].numericalControls,
      maximumStep: requests[0].numericalControls.initialStep,
      useAdaptiveStepGrowth: false,
    },
  };
  assert.throws(
    () => encodeNativeRequest(fixedHeightRequest),
    /adaptiveGrowth does not match its certified budget allocation/,
  );

  const incompleteRequest = {
    ...requests[0],
    numericalControls: { ...requests[0].numericalControls },
  };
  delete incompleteRequest.numericalControls.maximumStep;
  assert.throws(
    () => encodeNativeRequest(incompleteRequest),
    /must explicitly supply maximumStep, useAdaptiveStepGrowth, farFieldEnclosureFraction, coreScale, certifiedBudget, and memoryBudgetBytes/,
  );
  incompleteRequest.numericalControls.maximumStep =
    requests[0].numericalControls.maximumStep;
  delete incompleteRequest.numericalControls.useAdaptiveStepGrowth;
  assert.throws(
    () => encodeNativeRequest(incompleteRequest),
    /must explicitly supply maximumStep, useAdaptiveStepGrowth, farFieldEnclosureFraction, coreScale, certifiedBudget, and memoryBudgetBytes/,
  );
  incompleteRequest.numericalControls.useAdaptiveStepGrowth =
    requests[0].numericalControls.useAdaptiveStepGrowth;
  delete incompleteRequest.numericalControls.farFieldEnclosureFraction;
  assert.throws(
    () => encodeNativeRequest(incompleteRequest),
    /must explicitly supply maximumStep, useAdaptiveStepGrowth, farFieldEnclosureFraction, coreScale, certifiedBudget, and memoryBudgetBytes/,
  );
});

test("Borg native client rejects protocol skew with a restart instruction", () => {
  const fixtureDirectory = mkdtempSync(join(tmpdir(), "borg-eom-protocol-skew-"));
  const fixtureBinary = join(fixtureDirectory, "mismatched-eom-binary");
  try {
    writeFileSync(
      fixtureBinary,
      "#!/bin/sh\nprintf 'EOM_BORG_NATIVE_V999\\n'\n",
      "utf8",
    );
    chmodSync(fixtureBinary, 0o755);
    assert.throws(
      () => createBorgNativeEomProcessClient({ binaryPath: fixtureBinary }),
      (error) => {
        assert.match(error.message, /dev server encoder=EOM_BORG_NATIVE_V8/u);
        assert.match(error.message, /binary parser=EOM_BORG_NATIVE_V999/u);
        assert.match(
          error.message,
          /the dev server is running older code than the binary it just built — restart the dev server\./u,
        );
        return true;
      },
    );
  } finally {
    rmSync(fixtureDirectory, { recursive: true, force: true });
  }
});

test("Borg native client clears its history prefix after a halted request", async () => {
  const fixtureDirectory = mkdtempSync(join(tmpdir(), "borg-eom-cache-reset-"));
  const fixtureBinary = join(fixtureDirectory, "cache-reset-eom-binary.mjs");
  const fixtureSource = `#!/usr/bin/env node
if (process.argv[2] === "print-protocol-version") {
  process.stdout.write("EOM_BORG_NATIVE_V8\\n");
  process.exit(0);
}
let buffer = "";
let requestCount = 0;
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  while (buffer.includes("\\nEND\\n")) {
    const boundary = buffer.indexOf("\\nEND\\n") + 5;
    const request = buffer.slice(0, boundary);
    buffer = buffer.slice(boundary);
    requestCount += 1;
    const lines = request.trim().split("\\n");
    const run = lines.find((line) => line.startsWith("RUN\\t")).split("\\t");
    const paths = lines.filter((line) => line.startsWith("PATH\\t"));
    const prefixes = paths.map((line) => Number(line.split("\\t")[4]));
    const halted = requestCount === 2;
    const extensions = paths.map((line) => {
      const pathId = line.split("\\t")[1];
      const segments = halted ? [] : [{
        startTime: run[2], endTime: run[3],
        coefficients: [["0","0","0","0"],["0","0","0","0"],["0","0","0","0"]],
        positionErrors: ["0", "0", "0"], velocityErrors: ["0", "0", "0"],
      }];
      return { pathId, stateFlags: 0, segments };
    });
    process.stdout.write(JSON.stringify({
      schema: "eom_borg_native_response/v0",
      status: halted ? "halted" : "completed",
      haltCode: halted ? "memory_budget_exhausted" : "",
      acceptedEndTime: halted ? run[2] : run[3],
      acceptedStepCount: halted ? 0 : 1,
      rejectedStepCount: 0,
      budgetProvenance: {
        schema: run[19], presetId: run[20], allocationHash: run[21],
        allocationCanonicalJson: run[22], allocations: JSON.parse(run[22]),
      },
      observedMaximumCachedPrefix: Math.max(...prefixes),
      publishedExtensions: extensions,
    }) + "\\n");
  }
});
`;
  try {
    writeFileSync(fixtureBinary, fixtureSource, "utf8");
    chmodSync(fixtureBinary, 0o755);
    const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
      startTime: 10,
      targetDuration: 10.1,
      chunkDuration: 0.1,
    });
    const initialHistories = createBorgContinuousRetainedHistories(
      trajectoryFrames,
      BORG_DATASET_MANIFEST_V1,
      { historyEndTime: 10 },
    );
    const firstRequest = createBorgEomShadowRequest({
      manifest: BORG_DATASET_MANIFEST_V1,
      config,
      histories: initialHistories,
      chunkIndex: 0,
      startTime: 10,
      endTime: 10.1,
    });
    const client = createBorgNativeEomProcessClient({
      binaryPath: fixtureBinary,
    });
    const first = await client.evolveRetainedHistories(firstRequest);
    const secondRequest = createBorgEomShadowRequest({
      manifest: BORG_DATASET_MANIFEST_V1,
      config,
      histories: first.histories,
      chunkIndex: 1,
      startTime: 10.1,
      endTime: 10.2,
    });
    const halted = await client.evolveRetainedHistories(secondRequest);
    const recovered = await client.evolveRetainedHistories(secondRequest);
    assert.equal(halted.status, "halted");
    assert.ok(halted.observedMaximumCachedPrefix > 0);
    assert.equal(recovered.status, "completed");
    assert.equal(recovered.observedMaximumCachedPrefix, 0);
    await client.dispose();
  } finally {
    rmSync(fixtureDirectory, { recursive: true, force: true });
  }
});

test("Borg browser EOM client posts the retained-history contract to the local native endpoint", async () => {
  const calls = [];
  const client = createBorgEomHttpClient({
    fetchImpl: async (endpoint, init) => {
      calls.push({ endpoint, init });
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify({ status: "completed", histories: [] });
        },
      };
    },
  });
  const request = { contractId: "eom_evolution_contract/v1", histories: [{ pathId: "p" }] };
  const response = await client.evolveRetainedHistories(request);
  assert.equal(response.status, "completed");
  assert.equal(calls[0].endpoint, "/api/eom/borg-shadow/v0");
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].init.body), request);
});

test("disposing the Borg browser EOM client aborts an active native request", async () => {
  let signal;
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      signal = init.signal;
      return new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      });
    },
  });
  const pending = client.evolveRetainedHistories({ histories: [] });
  await client.dispose();
  assert.equal(signal.aborted, true);
  await assert.rejects(pending, /cancelled/u);
});

function createFakeEomResponse(request, evidenceStatus, options = {}) {
  const endTime = options.endTime ?? request.absoluteTimeInterval.end;
  return {
    status: "completed",
    acceptedEndTime: endTime,
    allStepsAtomic: true,
    evidenceStatus,
    claimGrade: evidenceStatus,
    coreScale: request.modelControls.coreScale,
    memoryBudgetBytes: request.resourceEnvelope.memoryBudgetBytes,
    memoryEstimateBytes: 1,
    budgetProvenance: {
      schema: request.certifiedBudget.schema,
      presetId: request.certifiedBudget.presetId,
      allocationHash: request.certifiedBudget.allocationHash,
      allocationCanonicalJson: request.certifiedBudget.allocationCanonicalJson,
      allocations: request.certifiedBudget.allocations,
    },
    controllerStepSize: request.numericalControls.initialStep,
    histories: request.histories.map((history) => {
      const startTime = history.coverageEnd;
      const state = evaluateHistory(history, Number(startTime));
      const duration = Number(endTime) - Number(startTime);
      return {
        ...history,
        coverageEnd: endTime,
        segments: [
          ...history.segments,
          {
            startTime,
            endTime,
            coefficients: ["x", "y", "z"].map((axis) => [
              String(state.position[axis]),
              String(state.velocity[axis]),
              "0",
              "0",
            ]),
            positionErrors: Array(3).fill(String(duration * 1e-14)),
            velocityErrors: Array(3).fill(String(duration * 1e-14)),
            evidenceStatus,
            claimGrade: evidenceStatus,
          },
        ],
      };
    }),
    diagnostics: [],
  };
}

function evaluateHistory(history, time) {
  const segment = history.segments.find(
    (candidate, index) =>
      Number(candidate.startTime) <= time &&
      (time < Number(candidate.endTime) || index + 1 === history.segments.length),
  );
  const localTime = time - Number(segment.startTime);
  const position = {};
  const velocity = {};
  ["x", "y", "z"].forEach((axis, axisIndex) => {
    const [c0, c1, c2, c3] = segment.coefficients[axisIndex].map(Number);
    position[axis] = c0 + localTime * (c1 + localTime * (c2 + localTime * c3));
    velocity[axis] = c1 + localTime * (2 * c2 + localTime * 3 * c3);
  });
  return { position, velocity };
}
