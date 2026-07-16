#!/usr/bin/env node

import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import {
  createBorgContinuousRetainedHistories,
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
  createBorgEomShadowRunner,
} from "../../src/apps/borg/BorgEomShadowRunner.js";
import { BORG_DATASET_MANIFEST_V1 } from "../../src/apps/borg/BorgFixtureData.js";
import {
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "../../src/apps/borg/BorgInitialConditions.js";

const binaryPath = process.argv[2];
if (!binaryPath) {
  throw new Error(
    "usage: run-borg-post-burn-in-refinement-ladder.mjs <eom_borg_shadow_cli> [--history-depth=<time>] [--burn-in-chunk=<time>] [--burn-in-step=<time>] [--burn-in-minimum-step=<time>] [--output=<path>] [--seed-only]",
  );
}

const manifest = BORG_DATASET_MANIFEST_V1;
const pathCount = manifest.population.architrinoCount;
const historyDepth = optionalPositiveArgument(
  "--history-depth=",
  manifest.simulationEnvelope.historyDepth,
);
const seedOnly = process.argv.includes("--seed-only");
const outputPath = optionalStringArgument("--output=");
const burnInStart = 0;
const burnInEnd = historyDepth;
const atomicChunk = 0.01;
const burnInChunkDuration = optionalPositiveArgument(
  "--burn-in-chunk=",
  atomicChunk,
);
const burnInInitialStep = optionalPositiveArgument(
  "--burn-in-step=",
  atomicChunk,
);
const burnInMinimumStep = optionalPositiveArgument(
  "--burn-in-minimum-step=",
  burnInInitialStep,
);
const strictCases = Object.freeze([
  Object.freeze({ id: "h", step: "0.01", threadCount: 1 }),
  Object.freeze({ id: "h_over_2", step: "0.005", threadCount: 1 }),
  Object.freeze({ id: "h_over_4", step: "0.0025", threadCount: 1 }),
  Object.freeze({ id: "h_over_4_threads_4", step: "0.0025", threadCount: 4 }),
]);

const endpointRows = createBorgSeededInitialConditionRows({
  manifest,
  seedIndex: 0,
  config: createBorgInitialConditionConfig(manifest.initialConditions),
});
const seed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
  historyStartTime: burnInStart - historyDepth,
  historyEndTime: burnInStart,
  sampleInterval: atomicChunk,
});
const seedHistories = createBorgContinuousRetainedHistories(seed.rows, manifest, {
  historyStartTime: burnInStart - historyDepth,
  historyEndTime: burnInStart,
  expectedPathCount: pathCount,
});
const client = createBorgNativeEomProcessClient({
  binaryPath,
  timeoutMs: 600000,
});

const runStartedAt = performance.now();
let seedCutControl;
let burnIn;
let postBurnInStrictLadder;
try {
  seedCutControl = await runStrictLadder(seedHistories, burnInStart);
  burnIn = seedOnly
    ? Object.freeze({ status: "not_run_seed_only" })
    : await runBurnIn();
  postBurnInStrictLadder = burnIn.status === "completed"
    ? await runStrictLadder(burnIn.histories, burnInEnd)
    : Object.freeze({
        status: seedOnly
          ? "not_run_seed_only"
          : "not_run_no_eom_only_checkpoint",
        reason: seedOnly
          ? "The diagnostic was explicitly limited to the seed-cut ladder."
          : `The 16-path burn-in halted before the complete memory horizon, so no EOM-only retained history exists at T=${burnInEnd}.`,
      });
} finally {
  await client.dispose();
}

const evidence = {
  schema: "eom_borg_post_burn_in_refinement_ladder_evidence/v0",
  date: new Date().toISOString(),
  authority: "executable_adjudication_not_canonical_eom_evidence",
  binaryPath,
  manifestId: manifest.manifestId,
  pathCount,
  orderedPairsPerSnapshot: pathCount * pathCount,
  offDiagonalOrderedPairsPerSnapshot: pathCount * (pathCount - 1),
  seedCertificate: seed.certificate,
  seedHistorySha256: sha256(seedHistories),
  requestedBurnIn: {
    interval: [burnInStart, burnInEnd],
    historyDepth,
    atomicChunk,
    transportChunkDuration: burnInChunkDuration,
    numericalControls: coarseBurnInControls(),
  },
  seedCutStrictControl: seedCutControl,
  burnIn: summarizeBurnIn(burnIn),
  postBurnInStrictLadder,
  adjudication: adjudicate(seedCutControl, burnIn, postBurnInStrictLadder),
  totalWallSeconds: (performance.now() - runStartedAt) / 1000,
};

const serializedEvidence = `${JSON.stringify(evidence, null, 2)}\n`;
if (outputPath) {
  await writeFile(outputPath, serializedEvidence, "utf8");
  process.stderr.write(`evidence written path=${outputPath}\n`);
} else {
  process.stdout.write(serializedEvidence);
}

async function runBurnIn() {
  const runner = createBorgEomShadowRunner(manifest, {
    eomClient: client,
    initialFrameRows: seed.rows,
    pathCount,
    startTime: burnInStart,
    targetDuration: burnInEnd + burnInChunkDuration,
    historyDepth,
    burnInDuration: historyDepth,
    chunkDuration: burnInChunkDuration,
    sampleInterval: atomicChunk,
    ...coarseBurnInControls(),
  });
  const startedAt = performance.now();
  let lastGoodHistories = seedHistories;
  let completedChunks = 0;
  const acceptedChunkRows = [];
  try {
    while (!runner.burnInComplete) {
      const chunkStartedAt = performance.now();
      const chunk = await runner.computeNextChunk();
      completedChunks += 1;
      lastGoodHistories = chunk.histories;
      acceptedChunkRows.push({
        chunkIndex: chunk.chunkIndex,
        startTime: chunk.startTime,
        endTime: chunk.endTime,
        wallSeconds: (performance.now() - chunkStartedAt) / 1000,
        rootFailureCount: countRootFailures(chunk.diagnostics),
      });
      if (completedChunks % 5 === 0 || chunk.burnInComplete) {
        process.stderr.write(
          `burn-in heartbeat chunks=${completedChunks} time=${chunk.endTime} wallSeconds=${((performance.now() - startedAt) / 1000).toFixed(3)}\n`,
        );
      }
    }
    return Object.freeze({
      status: "completed",
      completedChunks,
      acceptedEndTime: runner.nextStartTime,
      wallSeconds: (performance.now() - startedAt) / 1000,
      histories: lastGoodHistories,
      historySha256: sha256(lastGoodHistories),
      allHistoriesEomOutput: lastGoodHistories.every(
        (history) => history.sourceIsEomOutput === true,
      ),
      seedSegmentsRetained: lastGoodHistories.some((history) =>
        history.segments.some((segment) => Number(segment.startTime) < burnInStart),
      ),
      acceptedChunkRows,
    });
  } catch (error) {
    return Object.freeze({
      status: "failed_closed",
      completedChunks,
      acceptedEndTime: runner.nextStartTime,
      wallSeconds: (performance.now() - startedAt) / 1000,
      lastGoodHistorySha256: sha256(lastGoodHistories),
      failureCode: error.code ?? "eom_shadow_run_failed",
      haltCode: error.eomResponse?.haltCode ?? null,
      acceptedStepCountInFailedChunk: error.eomResponse?.acceptedStepCount ?? null,
      rejectedStepCountInFailedChunk: error.eomResponse?.rejectedStepCount ?? null,
      failedChunkDiagnostics: summarizeDiagnostics(
        error.eomResponse?.diagnostics ?? [],
      ),
      acceptedChunkRows,
      histories: lastGoodHistories,
    });
  }
}

async function runStrictLadder(histories, startTime) {
  const results = [];
  for (const control of strictCases) {
    const config = createBorgEomShadowRunConfig(manifest, {
      pathCount,
      startTime,
      targetDuration: startTime + atomicChunk,
      historyDepth,
      burnInDuration: historyDepth,
      chunkDuration: atomicChunk,
      sampleInterval: atomicChunk,
      initialStep: control.step,
      minimumStep: control.step,
      rootTolerance: "1e-8",
      accelerationTolerance: "1e-8",
      positionTolerance: "1e-8",
      velocityTolerance: "1e-8",
      correctionTolerance: "1e-8",
      threadCount: control.threadCount,
    });
    const request = createBorgEomShadowRequest({
      manifest,
      config,
      histories,
      chunkIndex: 0,
      startTime,
      endTime: startTime + atomicChunk,
    });
    const startedAt = performance.now();
    const response = await client.evolveRetainedHistories(request);
    results.push(Object.freeze({
      ...control,
      status: response.status,
      evidenceStatus: response.evidenceStatus,
      acceptedEndTime: response.acceptedEndTime,
      acceptedStepCount: response.acceptedStepCount,
      rejectedStepCount: response.rejectedStepCount,
      haltCode: response.haltCode || null,
      wallSeconds: (performance.now() - startedAt) / 1000,
      workerPid: client.workerPid,
      historiesSha256: Array.isArray(response.histories)
        ? sha256(response.histories)
        : null,
      endpoint: response.status === "completed"
        ? response.histories.map((history) => evaluateEndpoint(history, startTime + atomicChunk))
        : null,
      diagnostics: summarizeDiagnostics(response.diagnostics ?? []),
    }));
  }
  const refinementDeltas = results[0].endpoint
    ? results.slice(1, 3).filter((result) => result.endpoint).map((result) => ({
        left: results[0].id,
        right: result.id,
        maximumStateDelta: maximumStateDelta(results[0].endpoint, result.endpoint),
      }))
    : [];
  const deterministicThreadParity = Boolean(
    results[2].historiesSha256 &&
      results[2].historiesSha256 === results[3].historiesSha256,
  );
  const persistentNativeWorker = new Set(
    results.map((result) => result.workerPid),
  ).size === 1;
  return Object.freeze({
    status: results.every((result) => result.status === "completed")
      ? "completed"
      : "failed_closed",
    interval: [startTime, startTime + atomicChunk],
    rootTolerance: "1e-8",
    cases: results,
    refinementDeltas,
    deterministicThreadParity,
    persistentNativeWorker,
    strictControlPassed:
      results.every((result) => result.status === "completed") &&
      refinementDeltas.length === 2 &&
      refinementDeltas.every((row) => row.maximumStateDelta <= 1e-8) &&
      deterministicThreadParity &&
      persistentNativeWorker,
  });
}

function coarseBurnInControls() {
  return Object.freeze({
    initialStep: String(burnInInitialStep),
    minimumStep: String(burnInMinimumStep),
    rootTolerance: "1e-3",
    accelerationTolerance: "1e-1",
    positionTolerance: "1e-2",
    velocityTolerance: "1e-2",
    correctionTolerance: "1e-1",
    threadCount: 4,
  });
}

function summarizeBurnIn(result) {
  const { histories: _histories, ...summary } = result;
  return summary;
}

function adjudicate(seedControl, burnInResult, postBurnInResult) {
  const oldFailureAtSeedCut = seedControl.cases.some((control) =>
    control.diagnostics.some((diagnostic) =>
      diagnostic.stepFailures.some((step) =>
        step.rootFailureCounts.numeric_precision_limit_exhausted === 240),
    ),
  );
  if (burnInResult.status === "not_run_seed_only") {
    return Object.freeze({
      requestedPostBurnInQuestion: "not_run_seed_only",
      formerPrecisionFailureAtSeedCut: oldFailureAtSeedCut
        ? "reproduced"
        : "not_observed",
      conclusion:
        "The diagnostic was explicitly limited to the strict seed-cut ladder.",
    });
  }
  if (burnInResult.status !== "completed") {
    return Object.freeze({
      requestedPostBurnInQuestion: "not_reached",
      formerPrecisionFailureAtSeedCut: oldFailureAtSeedCut
        ? "reproduced"
        : "not_observed",
      firstCurrentBlocker: burnInResult.failedChunkDiagnostics
        .flatMap((diagnostic) => diagnostic.stepFailures)
        .at(-1)?.failureCode ?? burnInResult.failureCode,
      conclusion:
        "The requested T=10 strict ladder cannot run because the 16-path EOM burn-in fails closed before it produces an EOM-only retained-history checkpoint.",
      falsifier:
        "A 16-path burn-in that reaches T=10 with no seed segment would create the checkpoint needed to rerun the requested strict ladder.",
    });
  }
  return Object.freeze({
    requestedPostBurnInQuestion: postBurnInResult.strictControlPassed
      ? "passed"
      : "failed",
    formerPrecisionFailureAtSeedCut: oldFailureAtSeedCut
      ? "reproduced"
      : "not_observed",
    conclusion: postBurnInResult.strictControlPassed
      ? "The strict 16-path ladder passes from the EOM-only post-burn-in history."
      : "The strict 16-path ladder fails from the EOM-only post-burn-in history.",
  });
}

function optionalPositiveArgument(prefix, fallback) {
  const argument = process.argv.find((value) => value.startsWith(prefix));
  if (argument == null) {
    return fallback;
  }
  const value = Number(argument.slice(prefix.length));
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${prefix.slice(0, -1)} must be a positive number.`);
  }
  return value;
}

function optionalStringArgument(prefix) {
  const argument = process.argv.find((value) => value.startsWith(prefix));
  if (argument == null) {
    return null;
  }
  const value = argument.slice(prefix.length).trim();
  if (!value) {
    throw new RangeError(`${prefix.slice(0, -1)} must not be empty.`);
  }
  return value;
}

function summarizeDiagnostics(diagnostics) {
  return diagnostics.map((diagnostic) => ({
    ...diagnostic,
    stepFailures: (diagnostic.stepFailures ?? []).map((step) => {
      const rootFailures = step.rootFailures ?? [];
      const rootFailureCounts = {};
      rootFailures.forEach((row) => {
        const key = row.failureCode || row.status || "unspecified";
        rootFailureCounts[key] = (rootFailureCounts[key] ?? 0) + 1;
      });
      return {
        status: step.status,
        failureCode: step.failureCode || null,
        attemptedStart: step.attemptedStart,
        attemptedEnd: step.attemptedEnd,
        pairSelectionRoute: step.pairSelectionRoute,
        traversalExcludedPairs: step.traversalExcludedPairs,
        traversalExactPairs: step.traversalExactPairs,
        rootFailureCount: rootFailures.length,
        rootFailureCounts,
        rootFailureSample: rootFailures.slice(0, 8),
        regulatorFailures: step.regulatorFailures ?? [],
      };
    }),
  }));
}

function countRootFailures(diagnostics) {
  return diagnostics.reduce(
    (total, diagnostic) => total + (diagnostic.stepFailures ?? []).reduce(
      (stepTotal, step) => stepTotal + (step.rootFailures?.length ?? 0),
      0,
    ),
    0,
  );
}

function evaluateEndpoint(history, time) {
  const segment = history.segments.find(
    (candidate, index) =>
      Number(candidate.startTime) <= time &&
      (time < Number(candidate.endTime) || index + 1 === history.segments.length),
  );
  if (!segment) {
    throw new Error(`history ${history.pathId} does not cover ${time}`);
  }
  const localTime = time - Number(segment.startTime);
  return {
    pathId: history.pathId,
    position: segment.coefficients.map((axis) => polynomial(axis, localTime)),
    velocity: segment.coefficients.map((axis) => derivative(axis, localTime)),
  };
}

function polynomial(coefficients, time) {
  const [c0, c1, c2, c3] = coefficients.map(Number);
  return c0 + time * (c1 + time * (c2 + time * c3));
}

function derivative(coefficients, time) {
  const [, c1, c2, c3] = coefficients.map(Number);
  return c1 + time * (2 * c2 + time * 3 * c3);
}

function maximumStateDelta(left, right) {
  let maximum = 0;
  for (let pathIndex = 0; pathIndex < left.length; pathIndex += 1) {
    for (const field of ["position", "velocity"]) {
      for (let axis = 0; axis < 3; axis += 1) {
        maximum = Math.max(
          maximum,
          Math.abs(left[pathIndex][field][axis] - right[pathIndex][field][axis]),
        );
      }
    }
  }
  return maximum;
}

function sha256(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
