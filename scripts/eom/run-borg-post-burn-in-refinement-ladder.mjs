#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, rename, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import {
  createBorgContinuousRetainedHistories,
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
  BORG_EOM_BURN_IN_HISTORY_CLAIM_LEVEL,
  BORG_EOM_BURN_IN_HISTORY_PROVENANCE,
  trimBorgRetainedHistories,
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
    "usage: run-borg-post-burn-in-refinement-ladder.mjs <eom_borg_shadow_cli> [--path-count=<count>] [--history-depth=<time>] [--burn-in-chunk=<time>] [--burn-in-step=<time>] [--burn-in-minimum-step=<time>] [--burn-in-root-tolerance=<time>] [--maximum-mpfr-bits=<bits>] [--quadrature-max-depth=<count>] [--quadrature-max-cells=<count>] [--checkpoint=<path>] [--resume=<path>] [--output=<path>] [--seed-only]",
  );
}

const manifest = BORG_DATASET_MANIFEST_V1;
const manifestPathCount = manifest.population.architrinoCount;
const pathCount = optionalPositiveIntegerArgument("--path-count=", manifestPathCount);
if (pathCount > manifestPathCount) {
  throw new RangeError(
    `--path-count cannot exceed the manifest population of ${manifestPathCount}.`,
  );
}
const historyDepth = optionalPositiveArgument(
  "--history-depth=",
  manifest.simulationEnvelope.historyDepth,
);
const seedOnly = process.argv.includes("--seed-only");
const outputPath = optionalStringArgument("--output=");
const resumePath = optionalStringArgument("--resume=");
const checkpointPath = optionalStringArgument("--checkpoint=") ?? resumePath;
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
const burnInRootTolerance = optionalPositiveArgument(
  "--burn-in-root-tolerance=",
  1e-3,
);
const maximumMpfrBits = optionalPositiveIntegerArgument("--maximum-mpfr-bits=", 512);
const quadratureMaxDepth = optionalPositiveIntegerArgument("--quadrature-max-depth=", 32);
const quadratureMaxCells = optionalPositiveIntegerArgument("--quadrature-max-cells=", 200000);
const strictCases = Object.freeze([
  Object.freeze({ id: "h", step: "0.01", threadCount: 1 }),
  Object.freeze({ id: "h_over_2", step: "0.005", threadCount: 1 }),
  Object.freeze({ id: "h_over_4", step: "0.0025", threadCount: 1 }),
  Object.freeze({ id: "h_over_4_threads_4", step: "0.0025", threadCount: 4 }),
]);

const fullPopulationEndpointRows = createBorgSeededInitialConditionRows({
  manifest,
  seedIndex: 0,
  config: createBorgInitialConditionConfig(manifest.initialConditions),
});
const endpointRows = Object.freeze(fullPopulationEndpointRows.slice(0, pathCount));
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
  binaryArgs: [
    `--maximum-mpfr-bits=${maximumMpfrBits}`,
    `--quadrature-max-depth=${quadratureMaxDepth}`,
    `--quadrature-max-cells=${quadratureMaxCells}`,
  ],
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
          : `The ${pathCount}-path burn-in halted before the complete memory horizon, so no EOM-only retained history exists at T=${burnInEnd}.`,
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
  populationSelection: {
    route: "deterministic_manifest_seed_path_prefix",
    pathIds: endpointRows.map((row) => String(row.pathKey)),
  },
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
    maximumMpfrBits,
    quadratureMaxDepth,
    quadratureMaxCells,
    checkpointPath,
    resumePath,
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
  const config = createBorgEomShadowRunConfig(manifest, {
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
  let nextStartTime = burnInStart;
  let acceptedChunkRows = [];
  let resumedFromCheckpoint = false;
  try {
    if (resumePath) {
      const checkpoint = JSON.parse(await readFile(resumePath, "utf8"));
      validateBurnInCheckpoint(checkpoint);
      lastGoodHistories = Object.freeze(checkpoint.histories);
      completedChunks = checkpoint.completedChunks;
      nextStartTime = checkpoint.nextStartTime;
      acceptedChunkRows = checkpoint.acceptedChunkRows;
      resumedFromCheckpoint = true;
      process.stderr.write(
        `burn-in resume chunks=${completedChunks} time=${nextStartTime} path=${resumePath}\n`,
      );
    }
    while (nextStartTime < burnInEnd) {
      const chunkStartedAt = performance.now();
      const startTime = nextStartTime;
      const endTime = Math.min(
        burnInEnd,
        roundTime(startTime + burnInChunkDuration),
      );
      const request = createBorgEomShadowRequest({
        manifest,
        config,
        histories: lastGoodHistories,
        chunkIndex: completedChunks,
        startTime,
        endTime,
      });
      const response = await client.evolveRetainedHistories(request);
      if (response.status !== "completed") {
        await writeBurnInCheckpoint({
          histories: lastGoodHistories,
          completedChunks,
          nextStartTime,
          acceptedChunkRows,
        });
        return failedBurnInResult({
          response,
          completedChunks,
          nextStartTime,
          lastGoodHistories,
          acceptedChunkRows,
          startedAt,
          resumedFromCheckpoint,
        });
      }
      completedChunks += 1;
      nextStartTime = endTime;
      lastGoodHistories = response.histories;
      acceptedChunkRows.push({
        chunkIndex: completedChunks - 1,
        startTime,
        endTime,
        initialStep: config.initialStep,
        minimumStep: config.minimumStep,
        rootTolerance: config.rootTolerance,
        transportChunkDuration: burnInChunkDuration,
        wallSeconds: (performance.now() - chunkStartedAt) / 1000,
        acceptedStepCount: response.acceptedStepCount,
        rejectedStepCount: response.rejectedStepCount,
        rootFailureCount: countRootFailures(response.diagnostics),
      });
      if (completedChunks % 5 === 0 || nextStartTime >= burnInEnd) {
        await writeBurnInCheckpoint({
          histories: lastGoodHistories,
          completedChunks,
          nextStartTime,
          acceptedChunkRows,
        });
        process.stderr.write(
          `burn-in heartbeat chunks=${completedChunks} time=${endTime} wallSeconds=${((performance.now() - startedAt) / 1000).toFixed(3)}\n`,
        );
      }
    }
    lastGoodHistories = markCompletedBurnInHistories(
      trimBorgRetainedHistories(lastGoodHistories, {
        coverageStart: roundTime(burnInEnd - historyDepth),
      }),
    );
    await writeBurnInCheckpoint({
      histories: lastGoodHistories,
      completedChunks,
      nextStartTime,
      acceptedChunkRows,
      completed: true,
    });
    return Object.freeze({
      status: "completed",
      completedChunks,
      acceptedEndTime: nextStartTime,
      wallSeconds: (performance.now() - startedAt) / 1000,
      histories: lastGoodHistories,
      historySha256: sha256(lastGoodHistories),
      allHistoriesEomOutput: lastGoodHistories.every(
        (history) => history.sourceIsEomOutput === true,
      ),
      seedSegmentsRetained: lastGoodHistories.some((history) =>
        history.segments.some((segment) => Number(segment.startTime) < burnInStart),
      ),
      resumedFromCheckpoint,
      checkpointPath,
      acceptedChunkRows,
    });
  } catch (error) {
    return Object.freeze({
      status: "failed_closed",
      completedChunks,
      acceptedEndTime: nextStartTime,
      wallSeconds: (performance.now() - startedAt) / 1000,
      lastGoodHistorySha256: sha256(lastGoodHistories),
      failureCode: error.code ?? "eom_shadow_run_failed",
      haltCode: error.eomResponse?.haltCode ?? null,
      acceptedStepCountInFailedChunk: error.eomResponse?.acceptedStepCount ?? null,
      rejectedStepCountInFailedChunk: error.eomResponse?.rejectedStepCount ?? null,
      failedChunkDiagnostics: summarizeDiagnostics(
        error.eomResponse?.diagnostics ?? [],
      ),
      resumedFromCheckpoint,
      checkpointPath,
      acceptedChunkRows,
      histories: lastGoodHistories,
    });
  }
}

function failedBurnInResult({
  response,
  completedChunks,
  nextStartTime,
  lastGoodHistories,
  acceptedChunkRows,
  startedAt,
  resumedFromCheckpoint,
}) {
  return Object.freeze({
    status: "failed_closed",
    completedChunks,
    acceptedEndTime: nextStartTime,
    wallSeconds: (performance.now() - startedAt) / 1000,
    lastGoodHistorySha256: sha256(lastGoodHistories),
    failureCode: response.failureCode ?? response.haltCode ?? "eom_shadow_run_failed",
    haltCode: response.haltCode ?? null,
    acceptedStepCountInFailedChunk: response.acceptedStepCount ?? null,
    rejectedStepCountInFailedChunk: response.rejectedStepCount ?? null,
    failedChunkDiagnostics: summarizeDiagnostics(response.diagnostics ?? []),
    resumedFromCheckpoint,
    checkpointPath,
    acceptedChunkRows,
    histories: lastGoodHistories,
  });
}

async function writeBurnInCheckpoint({
  histories,
  completedChunks,
  nextStartTime,
  acceptedChunkRows,
  completed = false,
}) {
  if (!checkpointPath) {
    return;
  }
  const checkpoint = {
    schema: "eom_borg_post_burn_in_checkpoint/v0",
    manifestId: manifest.manifestId,
    pathCount,
    historyDepth,
    burnInStart,
    burnInEnd,
    seedHistorySha256: sha256(seedHistories),
    completed,
    completedChunks,
    nextStartTime,
    acceptedChunkRows,
    histories,
  };
  const temporaryPath = `${checkpointPath}.tmp-${process.pid}`;
  await writeFile(temporaryPath, `${JSON.stringify(checkpoint)}\n`, "utf8");
  await rename(temporaryPath, checkpointPath);
}

function validateBurnInCheckpoint(checkpoint) {
  const valid =
    checkpoint?.schema === "eom_borg_post_burn_in_checkpoint/v0" &&
    checkpoint.manifestId === manifest.manifestId &&
    checkpoint.pathCount === pathCount &&
    checkpoint.historyDepth === historyDepth &&
    checkpoint.burnInStart === burnInStart &&
    checkpoint.burnInEnd === burnInEnd &&
    checkpoint.seedHistorySha256 === sha256(seedHistories) &&
    Number.isFinite(checkpoint.nextStartTime) &&
    checkpoint.nextStartTime >= burnInStart &&
    checkpoint.nextStartTime <= burnInEnd &&
    Array.isArray(checkpoint.histories) &&
    checkpoint.histories.length === pathCount &&
    checkpoint.histories.every(
      (history) => Number(history.coverageEnd) === checkpoint.nextStartTime,
    ) &&
    Array.isArray(checkpoint.acceptedChunkRows);
  if (!valid) {
    throw new Error("Borg EOM burn-in checkpoint does not match this refinement request.");
  }
}

function markCompletedBurnInHistories(histories) {
  return Object.freeze(histories.map((history) => Object.freeze({
    ...history,
    sourceProvenance: BORG_EOM_BURN_IN_HISTORY_PROVENANCE,
    sourceClaimLevel: BORG_EOM_BURN_IN_HISTORY_CLAIM_LEVEL,
    sourceAcceptedInitialDatum: false,
    sourceIsEomOutput: true,
  })));
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
    rootTolerance: String(burnInRootTolerance),
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
        step.rootFailureCounts.numeric_precision_limit_exhausted ===
          pathCount * (pathCount - 1)),
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
        `The requested T=${burnInEnd} strict ladder cannot run because the ${pathCount}-path EOM burn-in fails closed before it produces an EOM-only retained-history checkpoint.`,
      falsifier:
        `A ${pathCount}-path burn-in that reaches T=${burnInEnd} with no seed segment would create the checkpoint needed to rerun the requested strict ladder.`,
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
      ? `The strict ${pathCount}-path ladder passes from the EOM-only post-burn-in history.`
      : `The strict ${pathCount}-path ladder fails from the EOM-only post-burn-in history.`,
  });
}

function optionalPositiveIntegerArgument(prefix, fallback) {
  const value = optionalPositiveArgument(prefix, fallback);
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`${prefix.slice(0, -1)} must be a positive whole number.`);
  }
  return value;
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

function roundTime(value) {
  return Number(value.toPrecision(15));
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
        accelerationFailures: step.accelerationFailures ?? [],
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
