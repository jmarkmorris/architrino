import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  chmodSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgAppManifest.js";
import {
  BORG_EOM_ACCEPTED_INITIAL_HISTORY_EVOLUTION_CLAIM_LEVEL,
  BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT,
  BORG_EOM_CONTRACT_ID,
  BORG_EOM_MODEL_BINDING_ID,
  BORG_EOM_REQUEST_SCHEMA,
  BORG_EOM_SHADOW_RUN_SOURCE,
  createBorgContinuousRetainedHistories,
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
  createBorgEomShadowRunner,
} from "../src/apps/borg/BorgEomShadowRunner.js";
import {
  BORG_NATIVE_EOM_PROTOCOL_MAGIC,
  createBorgNativeEomProcessClient,
  encodeNativeRequest,
} from "../scripts/eom/BorgNativeEomProcessClient.mjs";
import {
  BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
  createBorgEomHttpClient,
} from "../src/apps/borg/BorgEomHttpClient.js";
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
import {
  BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA,
  BORG_DISPLAY_HOST_MEMORY_POLICY_ID,
  createBorgDisplayHostMemoryEnvelope,
} from "../src/apps/borg/BorgDisplayHostMemoryEnvelope.js";
import {
  BORG_CAUSAL_HISTORY_RETENTION_POLICY,
  BORG_CAUSAL_HISTORY_RETENTION_SCHEMA,
} from "../src/apps/borg/BorgCausalHistoryRetention.js";

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

function createAssemblyViewBootRecord(runId = "borg-boot-record-run") {
  return {
    schema: "assembly-view-record.v0",
    provenance: {
      engineId: "eom-solver",
      engineVersion: "boot-fixture-v1",
      runId,
      claimGrade: "chart-hypothesis",
      evidenceStatus: "display-only",
      generatingSpec: "tests/borg-eom-migration.test.js",
      date: "2026-07-20",
    },
    window: { start: 0, end: 1, delayHorizon: 1, sampleInterval: 0.5 },
    worldlines: [{
      id: "source-a",
      polarity: 1,
      coverageStart: 0,
      coverageEnd: 1,
      interpolation: "exact-inertial-polynomial/v1",
      segments: [{
        startTime: 0,
        endTime: 1,
        coefficients: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        positionError: 0,
        velocityError: 0,
      }],
    }],
    binaries: [],
    ansatz: [],
    events: [],
  };
}

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
  assert.equal(defaultMounts[0].eomShadowRunner.eomClientFactory(), eomClient);
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


  const record = createAssemblyViewBootRecord();
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
  assert.deepEqual(recordMounts[0].eomRecordReplay.records, [record]);
  assert.equal(recordMounts[0].assemblyViewSession.selectedSourceId, "borg-boot-record-run");
  assert.equal(
    typeof recordMounts[0].eomShadowRunner.eomClientFactory,
    "function",
    "the one-screen workbench retains a lazy simulation capability",
  );
  assert.equal(recordMounts[0].autoStartEom, true);

  const comparisonMounts = [];
  await bootBorgApp({
    search:
      "?eomRecord=https://example.test/chart.json&eomRecord=https://example.test/evolved.json",
    createEomClient() {
      throw new Error("record replay must never construct the live EOM client");
    },
    fetchLike: async (url) => ({
      ok: true,
      async json() {
        return createAssemblyViewBootRecord(
          url.includes("chart") ? "chart-direct-record" : "evolved-direct-record",
        );
      },
    }),
    mountApp(options) {
      comparisonMounts.push(options);
      return options;
    },
  });
  assert.deepEqual(
    comparisonMounts[0].assemblyViewSession.records.map((entry) => entry.sourceId),
    ["chart-direct-record", "evolved-direct-record"],
  );
  assert.deepEqual(comparisonMounts[0].eomRecordReplay.sourceUrls, [
    "https://example.test/chart.json",
    "https://example.test/evolved.json",
  ]);

  await assert.rejects(
    bootBorgApp({
      search: "?eomRecord=https://example.test/missing.json",
      fetchLike: async () => ({ ok: false, status: 404 }),
      mountApp() {
        throw new Error("must not mount on a failed record fetch");
      },
    }),
    /Borg assembly-view record fetch failed \(404\)/,
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
  assert.equal(
    config.minimumHistoryDepth,
    config.geometricDelayBound + config.historySafetyMargin,
  );
  assert.throws(
    () => createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
      startTime: 0,
      targetDuration: 0.2,
      historyDepth: 1,
      historySafetyMargin: 0.05,
    }),
    /must cover the geometric delay bound .* plus safety margin/,
  );
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
    simulationEnvelope: {
      outerRadius: 50,
      sampleInterval: 0.2,
      historyDepth: 105,
    },
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

test("Borg Display host memory keeps a proportional Mac reserve and admits available growth", () => {
  const gibibyte = 1024 ** 3;
  const envelope = createBorgDisplayHostMemoryEnvelope({
    hostTotalMemoryBytes: 64 * gibibyte,
    hostAvailableMemoryBytes: 32 * gibibyte,
    workerResidentBytes: 128 * 1024 ** 2,
    previousMemoryEstimateBytes: 256 * 1024 ** 2,
  });
  const expectedReserve = Math.ceil(64 * gibibyte * 0.2);

  assert.equal(envelope.schema, BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA);
  assert.equal(envelope.policyId, BORG_DISPLAY_HOST_MEMORY_POLICY_ID);
  assert.equal(envelope.admitted, true);
  assert.equal(envelope.hostReserveBytes, expectedReserve);
  assert.equal(
    envelope.workerResidentLimitBytes,
    envelope.workerResidentBytes + envelope.availableGrowthBytes,
  );
  assert.equal(
    envelope.requestMemoryBudgetBytes,
    envelope.previousMemoryEstimateBytes +
      envelope.hostAvailableMemoryBytes - expectedReserve,
  );
  assert.ok(envelope.requestMemoryBudgetBytes > 64 * 1024 ** 2);

  const pressured = createBorgDisplayHostMemoryEnvelope({
    hostTotalMemoryBytes: 8 * gibibyte,
    hostAvailableMemoryBytes: 2 * gibibyte,
    workerResidentBytes: 96 * 1024 ** 2,
    previousMemoryEstimateBytes: 128 * 1024 ** 2,
  });
  assert.equal(pressured.hostReserveBytes, 2 * gibibyte);
  assert.equal(pressured.availableGrowthBytes, 0);
  assert.equal(pressured.admitted, false);
  assert.equal(pressured.requestMemoryBudgetBytes, 128 * 1024 ** 2);
});

test("Borg live contract and certified-budget records match the runtime identities", () => {
  const bindingRecord = readFileSync(new URL(
    "../reference/priorities/app-solver/contracts/master-eom-binding-v1.md",
    import.meta.url,
  ), "utf8");
  const contractRecord = readFileSync(new URL(
    "../reference/priorities/app-solver/contracts/evolution-contract-v1.md",
    import.meta.url,
  ), "utf8");
  const budgetLedger = readFileSync(new URL(
    "../reference/priorities/app-solver/contracts/certified-error-budget-ledger.md",
    import.meta.url,
  ), "utf8");
  const masterEquation = readFileSync(new URL(
    "../content/markdown/aaa/dynamics/master-equation.md",
    import.meta.url,
  ));
  const sourceHash = bindingRecord.match(
    /Source snapshot SHA-256: `([0-9a-f]{64})`/u,
  )?.[1];

  assert.equal(
    sourceHash,
    createHash("sha256").update(masterEquation).digest("hex"),
  );
  assert.equal(contractRecord.includes(`\`${BORG_EOM_REQUEST_SCHEMA}\``), true);
  assert.equal(contractRecord.includes(`\`${BORG_EOM_CONTRACT_ID}\``), true);
  assert.equal(contractRecord.includes(`\`${BORG_EOM_MODEL_BINDING_ID}\``), true);
  for (const preset of BORG_CERTIFIED_BUDGET_PRESETS) {
    assert.equal(budgetLedger.includes(`\`${preset.id}\``), true);
    assert.equal(budgetLedger.includes(`\`${preset.allocationHash}\``), true);
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
  assert.equal(request.schema, BORG_EOM_REQUEST_SCHEMA);
  assert.equal(request.contractId, BORG_EOM_CONTRACT_ID);
  assert.deepEqual(request.contractAmendmentIds, []);
  assert.equal(request.modelBindingId, BORG_EOM_MODEL_BINDING_ID);
  assert.equal(request.claimLevel, "eom-forward-evolution-request");
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

test("Borg EOM runner preserves a numerically equal seed-history cut token", async () => {
  const requests = [];
  const histories = createBorgContinuousRetainedHistories(
    trajectoryFrames,
    BORG_DATASET_MANIFEST_V1,
    { historyEndTime: 10 },
  ).map((history) => ({
    ...history,
    coverageEnd: "10.0",
    segments: history.segments.map((segment, index, segments) =>
      index + 1 === segments.length
        ? { ...segment, endTime: "10.0" }
        : segment),
  }));
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "executable_architecture_evidence");
      },
    },
    initialRetainedHistories: histories,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await runner.computeNextChunk();
  assert.equal(requests[0].absoluteTimeInterval.start, "10.0");
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

test("Borg display grade starts directly from point-projected input history", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "display-only");
      },
    },
    runGrade: "display",
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 30.4,
    chunkDuration: 10.2,
    sampleInterval: 0.2,
    historyDepth: 10,
  });

  const first = await runner.computeNextChunk();
  const second = await runner.computeNextChunk();

  assert.equal(requests[0].runGrade, "display");
  assert.equal(requests[0].absoluteTimeInterval.start, "10");
  assert.ok(requests[0].histories.every((history) =>
    history.sourceClaimLevel === "display-only" &&
    history.sourceAcceptedInitialDatum === false &&
    history.segments.every((segment) =>
      segment.positionErrors.every((error) => error === "0") &&
      segment.velocityErrors.every((error) => error === "0")
    )
  ));
  assert.equal(requests[1].runGrade, "display");
  assert.equal(requests[1].absoluteTimeInterval.start, "20.2");
  assert.equal(
    requests[1].histories[0].coverageStart,
    requests[0].histories[0].coverageStart,
  );
  assert.equal(first.activeRunGrade, "display");
  assert.equal(second.activeRunGrade, "display");
  assert.equal(first.transitionedToDisplayGrade, false);
  assert.equal(first.displayGradeBoundary, null);
  assert.equal(first.displayHistoryProjectionCount, 1);
  assert.equal(first.retainedHistoryPolicy, "append-only-display-grade-point-history");
  assert.equal(first.promotionEligible, false);
  assert.equal(second.endTime, 30.4);
});

test("Borg Display releases exactly the solver-cleared retained prefix", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        const response = createFakeEomResponse(request, "display-only");
        const paths = response.histories.map((history) => ({
          pathId: history.pathId,
          retiredPrefixCount: history.segments.length - 1,
          retainedSegmentCount: 1,
          retainedCoverageStart: String(history.segments.at(-1).startTime),
          clearedThroughTime: String(history.segments.at(-1).startTime),
        }));
        return {
          ...response,
          causalHistoryRetention: {
            schema: BORG_CAUSAL_HISTORY_RETENTION_SCHEMA,
            policy: BORG_CAUSAL_HISTORY_RETENTION_POLICY,
            receiverDomain: "all-requested-receiver-events-inside-envelope",
            outsideReceiverPolicy: "preserve-exact-history-no-retirement",
            receiverDomainStatus: "enclosed",
            center: ["0.5", "0.5", "0.5"],
            radius: "0.5",
            totalRetiredSegmentCount: paths.reduce(
              (sum, path) => sum + path.retiredPrefixCount,
              0,
            ),
            paths,
          },
        };
      },
    },
    runGrade: "display",
    causalHistoryRetention: true,
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.4,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
  });

  const first = await runner.computeNextChunk();
  const second = await runner.computeNextChunk();

  assert.equal(first.retainedHistoryPolicy,
    "solver-cleared-fixed-envelope-display-history");
  assert.equal(first.histories.every((history) => history.segments.length === 1), true);
  assert.equal(requests[1].histories.every((history) => history.segments.length === 1), true);
  assert.equal(requests[1].histories[0].coverageStart, "10");
  assert.equal(second.histories.every((history) => history.segments.length === 1), true);
  const runFields = encodeNativeRequest(requests[0]).split("\n")[1].split("\t");
  assert.deepEqual(runFields.slice(55), [
    BORG_CAUSAL_HISTORY_RETENTION_POLICY,
    "0.5",
    "0.5",
    "0.5",
    "0.5",
  ]);
});

test("Borg Display response accepts a self-consistent host memory envelope without changing Claim budget", async () => {
  const hostMemoryEnvelope = createBorgDisplayHostMemoryEnvelope({
    hostTotalMemoryBytes: 32 * 1024 ** 3,
    hostAvailableMemoryBytes: 16 * 1024 ** 3,
    workerResidentBytes: 96 * 1024 ** 2,
    previousMemoryEstimateBytes: 128 * 1024 ** 2,
  });
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        return createFakeEomResponse(request, "display-only", {
          hostMemoryEnvelope,
          memoryBudgetBytes: hostMemoryEnvelope.requestMemoryBudgetBytes,
        });
      },
    },
    runGrade: "display",
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });

  const chunk = await runner.computeNextChunk();
  assert.equal(
    chunk.memoryBudgetBytes,
    hostMemoryEnvelope.requestMemoryBudgetBytes,
  );
  assert.deepEqual(chunk.hostMemoryEnvelope, hostMemoryEnvelope);
  assert.equal(
    chunk.budgetProvenance.allocations.resources.requestMemoryBytes,
    64 * 1024 * 1024,
  );
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
    historyStartTime: -1.4,
    historyEndTime: 0,
    sampleInterval: 0.2,
    digest: async () => "promotion-seed-digest",
  });
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: seed.rows,
    pathCount: 2,
    startTime: 0,
    historyDepth: 1.4,
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
    historyStartTime: -1.05,
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
    historyDepth: 1.05,
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
  assert.equal(
    second.histories.every((history) => history.coverageStart === "-1.05"),
    true,
  );
  assert.equal(second.histories.every((history) => history.sourceAcceptedInitialDatum === true), true);
  assert.equal(second.histories.every((history) => history.sourceProvenance === BORG_ACCEPTED_SEED_HISTORY_PROVENANCE), true);
  assert.equal(
    second.frames.every((frame) => Number(frame.time) >= 0),
    true,
  );
  assert.equal(live.phase, "live");
  assert.equal(requests[0].provenance.importedHistoryIsAcceptedInitialDatum, true);
  assert.equal(requests[2].provenance.importedHistoryIsAcceptedInitialDatum, true);
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

test("Borg EOM verification failed responses preserve native diagnostics", async () => {
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

test("Borg names the exact response provenance field that failed", async () => {
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        return {
          ...createFakeEomResponse(request, "executable_architecture_evidence"),
          claimGrade: "failed",
        };
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await assert.rejects(
    runner.computeNextChunk(),
    /inconsistent provenance: claimGrade expected executable_architecture_evidence/,
  );
});

test("Borg certified response firewall rejects a server-invented evidence status", async () => {
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        return createFakeEomResponse(request, "server-says-canonical-enough");
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await assert.rejects(
    runner.computeNextChunk(),
    /evidenceStatus expected one of canonical, executable_architecture_evidence/,
  );
});

test("Borg claim grade publishes only its accepted prefix and then stops", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        const response = createFakeEomResponse(
          request, "failed", { endTime: "10.149999999999999" },
        );
        return {
          ...response,
          status: "halted",
          haltCode: "root_completeness_not_certified",
          allStepsAtomic: true,
          acceptedEndTime: "10.149999999999999",
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
  assert.equal(chunk.endTime, 10.149999999999999);
  assert.equal(chunk.terminalHalt.failedCandidateRejected, true);
  assert.equal(chunk.terminalHalt.code, "root_completeness_not_certified");
  assert.equal(chunk.promotionEligible, false);
  assert.ok(chunk.histories.every((history) =>
    history.coverageEnd === "10.149999999999999" &&
    history.segments.at(-1).endTime === "10.149999999999999"
  ));
  assert.equal(chunk.runGrade, "certified");
  assert.equal(chunk.activeRunGrade, "certified");
  assert.equal(chunk.transitionedToDisplayGrade, false);
  assert.equal(chunk.displayGradeBoundary, null);
  assert.equal(chunk.displayHistoryProjectionCount, 0);
  assert.equal(runner.canComputeNextChunk(), false);
  assert.equal(requests[0].runGrade, "certified");
  assert.equal(requests.length, 1);
});

test("Borg halted off-lattice prefix keeps distinct frame indexes", async () => {
  const histories = createBorgContinuousRetainedHistories(
    trajectoryFrames,
    BORG_DATASET_MANIFEST_V1,
    { historyEndTime: 10 },
  ).map((history) => ({
    ...history,
    coverageEnd: "10.05",
    segments: history.segments.map((segment, index, segments) =>
      index + 1 === segments.length
        ? { ...segment, endTime: "10.05" }
        : segment),
  }));
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        return {
          ...createFakeEomResponse(request, "failed", {
            endTime: "10.200000000000001",
          }),
          status: "halted",
          haltCode: "root_completeness_not_certified",
          allStepsAtomic: true,
          acceptedEndTime: "10.200000000000001",
        };
      },
    },
    initialRetainedHistories: histories,
    startTime: 10.05,
    targetDuration: 10.25,
    chunkDuration: 0.2,
    sampleInterval: 0.1,
  });
  const chunk = await runner.computeNextChunk();
  const indexes = [...new Set(chunk.frames.map((frame) => frame.frameIndex))];
  assert.deepEqual(indexes, [101, 102, 103]);
});

test("Borg claim grade stops instead of changing grade after an execution timeout", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        const error = new Error("certified execution timed out");
        error.code = BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT;
        error.timeoutMs = 180000;
        throw error;
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
    sampleInterval: 0.05,
  });

  await assert.rejects(runner.computeNextChunk(), (error) => {
    assert.equal(error.code, BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT);
    assert.equal(error.timeoutMs, 180000);
    return true;
  });
  assert.equal(requests[0].runGrade, "certified");
  assert.equal(requests.length, 1);
  assert.equal(runner.runGrade, "certified");
  assert.equal(runner.canComputeNextChunk(), false);
});

test("Borg keeps memory and engine failures as hard stops", async () => {
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        const response = createFakeEomResponse(
          request, "failed", { endTime: "10.1" },
        );
        return {
          ...response,
          status: "halted",
          haltCode: "memory_budget_exhausted",
          allStepsAtomic: true,
          acceptedEndTime: "10.1",
        };
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.statusCode, "halted-prefix");
  assert.equal(chunk.activeRunGrade, "certified");
  assert.equal(chunk.transitionedToDisplayGrade, false);
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
  assert.match(protocol, /^EOM_BORG_NATIVE_V10\nRUN\t/u);
  const runFields = protocol.split("\n")[1].split("\t");
  assert.equal(runFields.length, 60);
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
  assert.equal(runFields[53], "certified");
  assert.equal(runFields[54], "6");
  assert.deepEqual(runFields.slice(55), ["none", "0", "0", "0", "0"]);
  assert.equal(protocol.match(/^PATH\t/gmu)?.length, 6);
  assert.equal(protocol.match(/^SEG\t/gmu)?.length, 6);
  assert.match(protocol, /\nEND\n$/u);
  assert.equal(protocol.includes("initialStates"), false);
  assert.equal(protocol.includes("futurePaths"), false);

  const displayHostEnvelope = createBorgDisplayHostMemoryEnvelope({
    hostTotalMemoryBytes: 32 * 1024 ** 3,
    hostAvailableMemoryBytes: 16 * 1024 ** 3,
    workerResidentBytes: 128 * 1024 ** 2,
    previousMemoryEstimateBytes: 64 * 1024 ** 2,
  });
  const displayHostRequest = {
    ...requests[0],
    runGrade: "display",
    resourceEnvelope: {
      ...requests[0].resourceEnvelope,
      memoryBudgetBytes: displayHostEnvelope.requestMemoryBudgetBytes,
    },
    hostMemoryEnvelope: displayHostEnvelope,
  };
  const displayHostRunFields = encodeNativeRequest(displayHostRequest)
    .split("\n")[1]
    .split("\t");
  assert.equal(displayHostRunFields[18], String(
    displayHostEnvelope.requestMemoryBudgetBytes,
  ));
  assert.equal(displayHostRunFields[53], "display");
  assert.throws(
    () => encodeNativeRequest({
      ...displayHostRequest,
      runGrade: "certified",
    }),
    /permitted only for Display grade/u,
  );
  assert.throws(
    () => encodeNativeRequest({
      ...displayHostRequest,
      resourceEnvelope: {
        ...displayHostRequest.resourceEnvelope,
        memoryBudgetBytes: displayHostEnvelope.requestMemoryBudgetBytes + 1,
      },
    }),
    /does not match its request budget/u,
  );

  assert.throws(
    () => encodeNativeRequest({
      ...requests[0],
      modelBindingId: "master_eom_binding/v0",
    }),
    /does not match the live request, evolution, and model-binding contracts/,
  );
  assert.throws(
    () => encodeNativeRequest({
      ...requests[0],
      certifiedBudget: {
        ...requests[0].certifiedBudget,
        allocationHash: "0".repeat(64),
      },
    }),
    /certified-budget hash does not match its canonical allocations/,
  );

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
        assert.match(error.message, /dev server encoder=EOM_BORG_NATIVE_V10/u);
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

test("Borg native clients own separate exact-history temporary roots", async () => {
  const fixtureDirectory = mkdtempSync(join(tmpdir(), "borg-eom-history-owner-"));
  const fixtureBinary = join(fixtureDirectory, "history-owner-eom-binary.mjs");
  const fixtureSource = `#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
if (process.argv[2] === "print-protocol-version") {
  process.stdout.write("EOM_BORG_NATIVE_V10\\n");
  process.exit(0);
}
const rootArgument = process.argv.find((argument) =>
  argument.startsWith("--history-temp-root="));
const historyTempRoot = rootArgument.slice("--history-temp-root=".length);
mkdirSync(historyTempRoot, { recursive: true });
const marker = join(historyTempRoot, "worker-owner");
writeFileSync(marker, String(process.pid), "utf8");
let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  while (buffer.includes("\\nEND\\n")) {
    const boundary = buffer.indexOf("\\nEND\\n") + 5;
    const request = buffer.slice(0, boundary);
    buffer = buffer.slice(boundary);
    const lines = request.trim().split("\\n");
    const run = lines.find((line) => line.startsWith("RUN\\t")).split("\\t");
    const paths = lines.filter((line) => line.startsWith("PATH\\t"));
    process.stdout.write(JSON.stringify({
      status: "completed",
      acceptedEndTime: run[3],
      historyTempRoot,
      markerOwned: existsSync(marker) &&
        readFileSync(marker, "utf8") === String(process.pid),
      publishedExtensions: paths.map((line) => ({
        pathId: line.split("\\t")[1],
        segments: [],
      })),
    }) + "\\n");
  }
});
`;
  let firstClient = null;
  let secondClient = null;
  try {
    writeFileSync(fixtureBinary, fixtureSource, "utf8");
    chmodSync(fixtureBinary, 0o755);
    const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
      startTime: 10,
      targetDuration: 10.2,
      chunkDuration: 0.1,
    });
    const histories = createBorgContinuousRetainedHistories(
      trajectoryFrames,
      BORG_DATASET_MANIFEST_V1,
      { historyEndTime: 10 },
    );
    const request = createBorgEomShadowRequest({
      manifest: BORG_DATASET_MANIFEST_V1,
      config,
      histories,
      chunkIndex: 0,
      startTime: 10,
      endTime: 10.1,
    });
    firstClient = createBorgNativeEomProcessClient({ binaryPath: fixtureBinary });
    const first = await firstClient.evolveRetainedHistories(request);
    secondClient = createBorgNativeEomProcessClient({ binaryPath: fixtureBinary });
    const second = await secondClient.evolveRetainedHistories({
      ...request,
      requestId: "history-owner-second",
      runId: "history-owner-second",
    });
    const firstAfterSecondStarted = await firstClient.evolveRetainedHistories({
      ...request,
      requestId: "history-owner-first-again",
    });

    assert.notEqual(first.historyTempRoot, second.historyTempRoot);
    assert.equal(first.markerOwned, true);
    assert.equal(second.markerOwned, true);
    assert.equal(firstAfterSecondStarted.markerOwned, true);
  } finally {
    await firstClient?.dispose();
    await secondClient?.dispose();
    rmSync(fixtureDirectory, { recursive: true, force: true });
  }
});

test("Borg native client restarts a persistent worker when its executable changes", async () => {
  const fixtureDirectory = mkdtempSync(join(tmpdir(), "borg-eom-binary-refresh-"));
  const fixtureBinary = join(fixtureDirectory, "refreshable-eom-binary.mjs");
  const fixtureSource = (marker) => `#!/usr/bin/env node
if (process.argv[2] === "print-protocol-version") {
  process.stdout.write("EOM_BORG_NATIVE_V10\\n");
  process.exit(0);
}
let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  while (buffer.includes("\\nEND\\n")) {
    const boundary = buffer.indexOf("\\nEND\\n") + 5;
    const request = buffer.slice(0, boundary);
    buffer = buffer.slice(boundary);
    const lines = request.trim().split("\\n");
    const run = lines.find((line) => line.startsWith("RUN\\t")).split("\\t");
    const paths = lines.filter((line) => line.startsWith("PATH\\t"));
    process.stdout.write(JSON.stringify({
      status: "completed",
      acceptedEndTime: run[3],
      binaryMarker: ${JSON.stringify(marker)},
      publishedExtensions: paths.map((line) => ({
        pathId: line.split("\\t")[1],
        segments: [],
      })),
    }) + "\\n");
  }
});
`;
  try {
    writeFileSync(fixtureBinary, fixtureSource("first"), "utf8");
    chmodSync(fixtureBinary, 0o755);
    const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
      startTime: 10,
      targetDuration: 10.2,
      chunkDuration: 0.1,
    });
    const histories = createBorgContinuousRetainedHistories(
      trajectoryFrames,
      BORG_DATASET_MANIFEST_V1,
      { historyEndTime: 10 },
    );
    const request = createBorgEomShadowRequest({
      manifest: BORG_DATASET_MANIFEST_V1,
      config,
      histories,
      chunkIndex: 0,
      startTime: 10,
      endTime: 10.1,
    });
    const client = createBorgNativeEomProcessClient({ binaryPath: fixtureBinary });
    const first = await client.evolveRetainedHistories(request);
    writeFileSync(fixtureBinary, fixtureSource("replacement"), "utf8");
    chmodSync(fixtureBinary, 0o755);
    const replacement = await client.evolveRetainedHistories(request);

    assert.equal(first.binaryMarker, "first");
    assert.equal(replacement.binaryMarker, "replacement");
    await client.dispose();
  } finally {
    rmSync(fixtureDirectory, { recursive: true, force: true });
  }
});

test("Borg native client clears its history prefix after a halted request", async () => {
  const fixtureDirectory = mkdtempSync(join(tmpdir(), "borg-eom-cache-reset-"));
  const fixtureBinary = join(fixtureDirectory, "cache-reset-eom-binary.mjs");
  const fixtureSource = `#!/usr/bin/env node
if (process.argv[2] === "print-protocol-version") {
  process.stdout.write("EOM_BORG_NATIVE_V10\\n");
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

test("Borg server process client forwards a validated Display prefix without segment retransmission", async () => {
  const fixtureDirectory = mkdtempSync(join(tmpdir(), "borg-eom-display-prefix-"));
  const fixtureBinary = join(fixtureDirectory, "display-prefix-eom-binary.mjs");
  const fixtureSource = `#!/usr/bin/env node
if (process.argv[2] === "print-protocol-version") {
  process.stdout.write("EOM_BORG_NATIVE_V10\\n");
  process.exit(0);
}
let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  while (buffer.includes("\\nEND\\n")) {
    const boundary = buffer.indexOf("\\nEND\\n") + 5;
    const request = buffer.slice(0, boundary);
    buffer = buffer.slice(boundary);
    const lines = request.trim().split("\\n");
    const run = lines.find((line) => line.startsWith("RUN\\t")).split("\\t");
    const paths = lines.filter((line) => line.startsWith("PATH\\t"));
    const prefixes = paths.map((line) => Number(line.split("\\t")[4]));
    process.stdout.write(JSON.stringify({
      status: "completed",
      acceptedEndTime: run[3],
      observedMaximumCachedPrefix: Math.max(...prefixes),
      publishedExtensions: paths.map((line) => ({
        pathId: line.split("\\t")[1],
        segments: [],
      })),
    }) + "\\n");
  }
});
`;
  try {
    writeFileSync(fixtureBinary, fixtureSource, "utf8");
    chmodSync(fixtureBinary, 0o755);
    const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
      startTime: 10,
      targetDuration: 10.2,
      chunkDuration: 0.1,
    });
    const histories = createBorgContinuousRetainedHistories(
      trajectoryFrames,
      BORG_DATASET_MANIFEST_V1,
      { historyEndTime: 10 },
    );
    const firstRequest = createBorgEomShadowRequest({
      manifest: BORG_DATASET_MANIFEST_V1,
      config,
      histories,
      chunkIndex: 0,
      startTime: 10,
      endTime: 10.1,
      runGrade: "display",
    });
    const client = createBorgNativeEomProcessClient({
      binaryPath: fixtureBinary,
      returnDisplayHistoryExtensions: true,
      workerResidentMemoryReader: (pid) => pid == null ? 0 : 128 * 1024 ** 2,
    });
    assert.equal(client.workerResidentBytes, 0);
    const first = await client.evolveRetainedHistories(firstRequest);
    assert.ok(client.workerResidentBytes > 0);
    const second = await client.evolveRetainedHistories({
      ...firstRequest,
      requestId: "display-prefix-1",
      runId: "display-prefix-1",
      absoluteTimeInterval: { start: "10.1", end: "10.2" },
      histories: firstRequest.histories.map((history) => ({
        ...history,
        coverageEnd: "10.1",
        segments: [],
      })),
      historyTransport: {
        schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
        cacheToken: first.historyTransport.cacheToken,
        cachedPrefixCounts: first.historyTransport.segmentCounts,
      },
    });

    assert.equal(first.observedMaximumCachedPrefix, 0);
    assert.ok(second.observedMaximumCachedPrefix > 0);
    assert.equal(second.histories, undefined);
    assert.deepEqual(second.historyTransport.segmentCounts, [1, 1, 1, 1, 1, 1]);
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

test("Borg browser EOM client sends only a validated cached prefix after the first Display increment", async () => {
  const calls = [];
  const segment = (startTime, endTime) => ({
    startTime,
    endTime,
    coefficients: Array.from({ length: 3 }, () => ["0", "0", "0", "0"]),
    positionErrors: ["0", "0", "0"],
    velocityErrors: ["0", "0", "0"],
  });
  const responses = [
    {
      status: "completed",
      acceptedEndTime: "0.1",
      publishedExtensions: [{ pathId: "p", segments: [segment("0", "0.1")] }],
      historyTransport: {
        schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
        cacheToken: "cache:1",
        segmentCounts: [2],
      },
    },
    {
      status: "completed",
      acceptedEndTime: "0.2",
      publishedExtensions: [{ pathId: "p", segments: [segment("0.1", "0.2")] }],
      historyTransport: {
        schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
        cacheToken: "cache:2",
        segmentCounts: [3],
      },
    },
  ];
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      calls.push(JSON.parse(init.body));
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify(responses.shift());
        },
      };
    },
  });
  const initialRequest = {
    runGrade: "display",
    histories: [{
      pathId: "p",
      charge: "1",
      coverageStart: "-1",
      coverageEnd: "0",
      segments: [segment("-1", "0")],
    }],
  };
  const first = await client.evolveRetainedHistories(initialRequest);
  const second = await client.evolveRetainedHistories({
    ...initialRequest,
    histories: first.histories,
  });

  assert.equal(calls[0].historyTransport, undefined);
  assert.equal(calls[0].histories[0].segments.length, 1);
  assert.equal(calls[1].historyTransport.cacheToken, "cache:1");
  assert.deepEqual(calls[1].historyTransport.cachedPrefixCounts, [2]);
  assert.deepEqual(calls[1].histories[0].segments, []);
  assert.equal(second.histories[0].segments.length, 3);
  assert.deepEqual(second.histories[0].segments, [
    segment("-1", "0"),
    segment("0", "0.1"),
    segment("0.1", "0.2"),
  ]);
});

test("Borg browser EOM client preserves full certified history across chunk two", async () => {
  const calls = [];
  const segment = (startTime, endTime) => ({
    startTime,
    endTime,
    coefficients: Array.from({ length: 3 }, () => ["0", "0", "0", "0"]),
    positionErrors: ["0", "0", "0"],
    velocityErrors: ["0", "0", "0"],
  });
  const responses = [
    {
      status: "completed",
      acceptedEndTime: "0.1",
      histories: [{
        pathId: "p",
        charge: "1",
        coverageStart: "-1",
        coverageEnd: "0.1",
        segments: [segment("-1", "0"), segment("0", "0.1")],
      }],
      causalHistoryRetention: {
        paths: [{
          pathId: "p",
          retainedCoverageStart: "0",
        }],
      },
    },
    {
      status: "completed",
      acceptedEndTime: "0.2",
      histories: [{
        pathId: "p",
        charge: "1",
        coverageStart: "-1",
        coverageEnd: "0.2",
        segments: [
          segment("-1", "0"),
          segment("0", "0.1"),
          segment("0.1", "0.2"),
        ],
      }],
    },
  ];
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      calls.push(JSON.parse(init.body));
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify(responses.shift());
        },
      };
    },
  });
  const request = {
    runGrade: "certified",
    absoluteTimeInterval: { start: "0", end: "0.1" },
    histories: [{
      pathId: "p",
      charge: "1",
      coverageStart: "-1",
      coverageEnd: "0",
      segments: [segment("-1", "0")],
    }],
  };
  const first = await client.evolveRetainedHistories(request);
  const second = await client.evolveRetainedHistories({
    ...request,
    absoluteTimeInterval: { start: "0.1", end: "0.2" },
    histories: first.histories,
  });

  assert.equal(first.histories[0].coverageStart, "-1");
  assert.equal(first.histories[0].serverExactHistory, undefined);
  assert.equal(calls[1].histories[0].segments.length, 2);
  assert.equal(second.histories[0].segments.length, 3);
});

test("Borg browser EOM cache releases a solver-cleared prefix before the next increment", async () => {
  const calls = [];
  const segment = (startTime, endTime) => ({
    startTime,
    endTime,
    coefficients: Array.from({ length: 3 }, () => ["0", "0", "0", "0"]),
    positionErrors: ["0", "0", "0"],
    velocityErrors: ["0", "0", "0"],
  });
  const retention = (retainedCoverageStart) => ({
    schema: BORG_CAUSAL_HISTORY_RETENTION_SCHEMA,
    policy: BORG_CAUSAL_HISTORY_RETENTION_POLICY,
    totalRetiredSegmentCount: 1,
    paths: [{
      pathId: "p",
      retiredPrefixCount: 1,
      retainedSegmentCount: 1,
      retainedCoverageStart,
      clearedThroughTime: retainedCoverageStart,
    }],
  });
  const responses = [
    {
      status: "completed",
      acceptedEndTime: "0.1",
      publishedExtensions: [{ pathId: "p", segments: [segment("0", "0.1")] }],
      causalHistoryRetention: retention("0"),
      historyTransport: {
        schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
        cacheToken: "bounded:1",
        segmentCounts: [1],
      },
    },
    {
      status: "completed",
      acceptedEndTime: "0.2",
      publishedExtensions: [{ pathId: "p", segments: [segment("0.1", "0.2")] }],
      causalHistoryRetention: retention("0.1"),
      historyTransport: {
        schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
        cacheToken: "bounded:2",
        segmentCounts: [1],
      },
    },
  ];
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      calls.push(JSON.parse(init.body));
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify(responses.shift());
        },
      };
    },
  });
  const initialRequest = {
    runGrade: "display",
    histories: [{
      pathId: "p",
      charge: "1",
      coverageStart: "-1",
      coverageEnd: "0",
      segments: [segment("-1", "0")],
    }],
  };
  const first = await client.evolveRetainedHistories(initialRequest);
  const second = await client.evolveRetainedHistories({
    ...initialRequest,
    histories: first.histories,
  });

  assert.equal(first.histories[0].coverageStart, "0");
  assert.equal(first.histories[0].segments.length, 1);
  assert.deepEqual(calls[1].historyTransport.cachedPrefixCounts, [1]);
  assert.deepEqual(calls[1].histories[0].segments, []);
  assert.equal(second.histories[0].coverageStart, "0.1");
  assert.deepEqual(second.histories[0].segments, [segment("0.1", "0.2")]);
});

test("Borg browser keeps a bounded Display window while the worker prefix grows", async () => {
  const calls = [];
  const segment = (startTime, endTime) => ({
    startTime,
    endTime,
    coefficients: Array.from({ length: 3 }, () => ["0", "0", "0", "0"]),
    positionErrors: ["0", "0", "0"],
    velocityErrors: ["0", "0", "0"],
  });
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      const body = JSON.parse(init.body);
      calls.push(body);
      const start = Number(body.absoluteTimeInterval.start);
      const end = Number(body.absoluteTimeInterval.end);
      const prefix = body.historyTransport?.cachedPrefixCounts?.[0] ??
        body.histories[0].segments.length;
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify({
            status: "completed",
            acceptedEndTime: String(end),
            publishedExtensions: [{
              pathId: "p",
              segments: [segment(String(start), String(end))],
            }],
            historyTransport: {
              schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
              cacheToken: `cache:${calls.length}`,
              segmentCounts: [prefix + 1],
            },
          });
        },
      };
    },
  });
  let histories = [{
    pathId: "p",
    charge: "1",
    coverageStart: "-1",
    coverageEnd: "0",
    segments: [segment("-1", "0")],
  }];
  for (let increment = 0; increment < 100; increment += 1) {
    const start = increment / 10;
    const end = (increment + 1) / 10;
    const response = await client.evolveRetainedHistories({
      runGrade: "display",
      absoluteTimeInterval: { start: String(start), end: String(end) },
      histories,
    });
    histories = response.histories;
    assert.equal(histories[0].serverExactHistory, true);
    assert.ok(histories[0].segments.length <= 2);
  }
  assert.equal(calls.length, 100);
  assert.equal(calls[99].histories[0].segments.length, 0);
  assert.deepEqual(calls[99].historyTransport.cachedPrefixCounts, [100]);
});

test("Borg browser EOM client stops if its worker-owned exact history is lost", async () => {
  const calls = [];
  let responseIndex = 0;
  const history = {
    pathId: "p",
    charge: "1",
    segments: [{
      startTime: "-1",
      endTime: "0",
      coefficients: Array.from({ length: 3 }, () => ["0", "0", "0", "0"]),
      positionErrors: ["0", "0", "0"],
      velocityErrors: ["0", "0", "0"],
    }],
  };
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      const body = JSON.parse(init.body);
      calls.push(body);
      responseIndex += 1;
      if (responseIndex === 2) {
        return {
          ok: false,
          status: 500,
          async text() {
            return JSON.stringify({
              error: "stale",
              code: "display_history_cache_miss",
            });
          },
        };
      }
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify({
            status: "completed",
            acceptedEndTime: "0",
            publishedExtensions: [{ pathId: "p", segments: [] }],
            historyTransport: {
              schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
              cacheToken: `cache:${responseIndex}`,
              segmentCounts: [1],
            },
          });
        },
      };
    },
  });
  const request = { runGrade: "display", histories: [history] };
  const first = await client.evolveRetainedHistories(request);
  await assert.rejects(
    client.evolveRetainedHistories({ ...request, histories: first.histories }),
    (error) => error?.code === "display_exact_history_store_lost",
  );

  assert.equal(calls.length, 2);
  assert.equal(calls[1].histories[0].segments.length, 0);
});

test("disposing the Borg browser EOM client aborts an active native request", async () => {
  let postSignal;
  let deleteCalled = false;
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      if (init.method === "DELETE") {
        deleteCalled = true;
        return { ok: true, status: 204 };
      }
      postSignal = init.signal;
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
  const rejection = assert.rejects(pending, /cancelled/u);
  await client.dispose();
  assert.equal(postSignal.aborted, true);
  assert.equal(deleteCalled, true);
  await rejection;
});

test("Borg browser EOM client reports a certified request timeout without changing grade", async () => {
  const client = createBorgEomHttpClient({
    timeoutMs: 1,
    fetchImpl: async (_endpoint, init) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      }),
  });
  await assert.rejects(
    client.evolveRetainedHistories({ runGrade: "certified" }),
    (error) => {
      assert.equal(error.code, BORG_EOM_CERTIFIED_EXECUTION_TIMEOUT);
      assert.equal(error.timeoutMs, 1);
      return true;
    },
  );
});

test("Borg browser EOM client classifies HTTP failures without retrying evolution", async () => {
  let callCount = 0;
  const client = createBorgEomHttpClient({
    fetchImpl: async () => {
      callCount += 1;
      return {
        ok: false,
        status: 503,
        async text() {
          return JSON.stringify({
            code: "service_unavailable",
            error: "EOM worker unavailable",
          });
        },
      };
    },
  });
  await assert.rejects(
    client.evolveRetainedHistories({ runGrade: "display" }),
    (error) => {
      assert.equal(error.code, "service_unavailable");
      assert.equal(error.httpStatus, 503);
      assert.equal(error.retryable, true);
      return true;
    },
  );
  assert.equal(callCount, 1);
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
    memoryBudgetBytes:
      options.memoryBudgetBytes ?? request.resourceEnvelope.memoryBudgetBytes,
    memoryEstimateBytes: 1,
    hostMemoryEnvelope: options.hostMemoryEnvelope ?? null,
    causalHistoryRetention: options.causalHistoryRetention ?? null,
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
