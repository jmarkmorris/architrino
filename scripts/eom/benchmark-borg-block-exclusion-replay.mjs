#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import {
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
} from "../../src/apps/borg/BorgEomShadowRunner.js";
import { BORG_DATASET_MANIFEST_V1 } from "../../src/apps/borg/BorgFixtureData.js";

const binaryPath = process.argv[2];
const checkpointPath = process.argv[3];
const outputPath = process.argv[4];
if (!binaryPath || !checkpointPath || !outputPath) {
  throw new Error(
    "usage: benchmark-borg-block-exclusion-replay.mjs <eom_borg_shadow_cli> <checkpoint.json> <output.json> [--repetitions=N] [--material-speedup=N]",
  );
}

const repetitions = positiveIntegerArgument("--repetitions=", 5);
const materialSpeedupThreshold = positiveNumberArgument("--material-speedup=", 1.1);
const checkpointBytes = await readFile(checkpointPath);
const checkpoint = JSON.parse(checkpointBytes.toString("utf8"));
validateCheckpoint(checkpoint);

const startTime = String(checkpoint.histories[0].coverageEnd);
const endTime = String(Number((Number(startTime) + 0.01).toPrecision(15)));
const config = createBorgEomShadowRunConfig(BORG_DATASET_MANIFEST_V1, {
  pathCount: 8,
  startTime: Number(startTime),
  targetDuration: Number(endTime),
  historyDepth: 90,
  burnInDuration: 90,
  chunkDuration: 0.01,
  sampleInterval: 0.01,
  initialStep: "0.01",
  minimumStep: "0.01",
  rootTolerance: "1e-8",
  accelerationTolerance: "1e-8",
  positionTolerance: "1e-8",
  velocityTolerance: "1e-8",
  correctionTolerance: "1e-8",
  threadCount: 4,
});
const request = createBorgEomShadowRequest({
  manifest: BORG_DATASET_MANIFEST_V1,
  config,
  histories: checkpoint.histories,
  chunkIndex: 0,
  startTime,
  endTime,
});
const commonBinaryArgs = Object.freeze([
  "--maximum-mpfr-bits=512",
  "--quadrature-max-depth=32",
  "--quadrature-max-cells=200000",
]);
const modes = Object.freeze({
  baseline: Object.freeze({
    id: "exhaustive_exact_pair_batch",
    binaryArgs: Object.freeze([
      ...commonBinaryArgs,
      "--disable-certified-traversal",
    ]),
  }),
  block: Object.freeze({
    id: "recursive_block_exclusion_pair_leaf",
    binaryArgs: Object.freeze([
      ...commonBinaryArgs,
      "--traversal-exact-tile-pair-limit=1",
    ]),
  }),
});

const runs = [];
for (let repetition = 0; repetition < repetitions; repetition += 1) {
  const order = repetition % 2 === 0
    ? ["baseline", "block"]
    : ["block", "baseline"];
  for (const mode of order) {
    process.stderr.write(
      `borg-block-ab heartbeat repetition=${repetition + 1}/${repetitions} mode=${mode} start=${startTime} end=${endTime}\n`,
    );
    runs.push(await runReplay(mode, repetition));
  }
}

const pairs = [];
for (let repetition = 0; repetition < repetitions; repetition += 1) {
  const baseline = runs.find(
    (run) => run.repetition === repetition && run.mode === "baseline",
  );
  const block = runs.find(
    (run) => run.repetition === repetition && run.mode === "block",
  );
  pairs.push(Object.freeze({
    repetition: repetition + 1,
    historiesByteIdentical:
      baseline.historiesSerialized === block.historiesSerialized,
    rootAccountingByteIdentical:
      baseline.rootAccountingSerialized === block.rootAccountingSerialized,
    acceptedStepCountEqual:
      baseline.acceptedStepCount === block.acceptedStepCount,
    rejectedStepCountEqual:
      baseline.rejectedStepCount === block.rejectedStepCount,
    statusEqual: baseline.status === block.status,
    solverWallSpeedup:
      baseline.solverTotalWallSeconds / block.solverTotalWallSeconds,
    outerWallSpeedup: baseline.outerWallSeconds / block.outerWallSeconds,
  }));
}

const publicRuns = runs.map(({ historiesSerialized, rootAccountingSerialized, ...run }) => run);
const solverSpeedups = pairs.map((pair) => pair.solverWallSpeedup);
const outerSpeedups = pairs.map((pair) => pair.outerWallSpeedup);
const allEquivalent = pairs.every(
  (pair) => pair.historiesByteIdentical &&
    pair.rootAccountingByteIdentical &&
    pair.acceptedStepCountEqual &&
    pair.rejectedStepCountEqual &&
    pair.statusEqual,
);
const blockRuns = publicRuns.filter((run) => run.mode === "block");
const routeExercised = blockRuns.every(
  (run) => run.pairSelectionRoute === "certified_moving_history_traversal" &&
    run.traversalVisitedNodes > 1 &&
    run.traversalExcludedPairs > 0 &&
    run.traversalUnresolvedPairs === 0 &&
    run.traversalCoverageDisjointComplete,
);
const completeAccounting = publicRuns.every(
  (run) => run.rootCertificateCount === 64 &&
    run.rootAccountingCount === 64 &&
    run.traversalLogicalPairs === 64 &&
    run.traversalExcludedPairs + run.traversalExactPairs === 64 &&
    run.traversalUnresolvedPairs === 0 &&
    run.traversalCoverageDisjointComplete,
);
const medianSolverSpeedup = median(solverSpeedups);
const meanSolverSpeedup = mean(solverSpeedups);
const materialSpeedup =
  medianSolverSpeedup >= materialSpeedupThreshold &&
  meanSolverSpeedup >= materialSpeedupThreshold;
const longBurnInMayResume =
  allEquivalent && routeExercised && completeAccounting && materialSpeedup;

const evidence = {
  schema: "eom_borg_block_exclusion_matched_replay/v0",
  date: new Date().toISOString(),
  authority: "executable_performance_and_equivalence_diagnostic",
  binaryPath,
  binarySha256: sha256(await readFile(binaryPath)),
  checkpointPath,
  checkpointSha256: sha256(checkpointBytes),
  checkpointTime: checkpoint.nextStartTime,
  interval: [startTime, endTime],
  fixedControls: {
    step: "0.01",
    minimumStep: "0.01",
    rootTolerance: "1e-8",
    accelerationTolerance: "1e-8",
    positionTolerance: "1e-8",
    velocityTolerance: "1e-8",
    correctionTolerance: "1e-8",
    threadCount: 4,
    maximumMpfrBits: 512,
  },
  modes,
  repetitions,
  materialSpeedupThreshold,
  runs: publicRuns,
  matchedPairs: pairs,
  summary: {
    allEquivalent,
    routeExercised,
    completeAccounting,
    solverSpeedups,
    outerSpeedups,
    meanSolverSpeedup,
    medianSolverSpeedup,
    meanOuterSpeedup: mean(outerSpeedups),
    medianOuterSpeedup: median(outerSpeedups),
    materialSpeedup,
    longBurnInMayResume,
  },
  falsifier:
    "Any history or complete-root-accounting difference, unresolved membership, absent certified exclusion, or median/mean solver speedup below the declared material threshold keeps the long burn-in paused.",
};
await writeFile(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
process.stderr.write(
  `borg-block-ab complete output=${outputPath} resume=${longBurnInMayResume}\n`,
);

async function runReplay(mode, repetition) {
  const selected = modes[mode];
  const client = createBorgNativeEomProcessClient({
    binaryPath,
    binaryArgs: selected.binaryArgs,
    timeoutMs: 600000,
  });
  const startedAt = performance.now();
  try {
    const response = await client.evolveRetainedHistories(request);
    const outerWallSeconds = (performance.now() - startedAt) / 1000;
    const step = response.stepFailures?.[0];
    if (!step || !Array.isArray(step.rootAccounting)) {
      throw new Error(`${mode} replay omitted complete step/root accounting.`);
    }
    const rootAccounting = [...step.rootAccounting].sort((left, right) =>
      `${left.receiverPathId}/${left.sourcePathId}`.localeCompare(
        `${right.receiverPathId}/${right.sourcePathId}`,
      )
    );
    const historiesSerialized = JSON.stringify(response.histories);
    const rootAccountingSerialized = JSON.stringify(rootAccounting);
    return Object.freeze({
      mode,
      modeId: selected.id,
      repetition,
      status: response.status,
      haltCode: response.haltCode,
      acceptedEndTime: response.acceptedEndTime,
      acceptedStepCount: response.acceptedStepCount,
      rejectedStepCount: response.rejectedStepCount,
      pairSelectionRoute: step.pairSelectionRoute,
      traversalLogicalPairs: step.traversalLogicalPairs,
      traversalExcludedPairs: step.traversalExcludedPairs,
      traversalExactPairs: step.traversalExactPairs,
      traversalUnresolvedPairs: step.traversalUnresolvedPairs,
      traversalVisitedNodes: step.traversalVisitedNodes,
      traversalCoverageDisjointComplete:
        step.traversalCoverageDisjointComplete,
      rootCertificateCount: step.rootCertificateCount,
      rootAccountingCount: rootAccounting.length,
      historiesSha256: sha256(historiesSerialized),
      rootAccountingSha256: sha256(rootAccountingSerialized),
      solverTotalWallSeconds: response.timing?.totalWallSeconds,
      solverTraversalWallSeconds: response.timing?.traversalWallSeconds,
      solverExactRootBatchWallSeconds: response.timing?.rootBatchWallSeconds,
      solverRootPairCount: response.timing?.rootPairCount,
      solverRootReevaluatedCells: response.timing?.rootReevaluatedCells,
      solverRootMpfrPairCount: response.timing?.rootMpfrPairCount,
      outerWallSeconds,
      historiesSerialized,
      rootAccountingSerialized,
    });
  } finally {
    await client.dispose();
  }
}

function validateCheckpoint(value) {
  const valid =
    value?.schema === "eom_borg_post_burn_in_checkpoint/v0" &&
    value.pathCount === 8 &&
    value.historyDepth === 90 &&
    value.completed === false &&
    Number(value.nextStartTime) === 34.4940624999999 &&
    Array.isArray(value.histories) &&
    value.histories.length === 8 &&
    value.histories.every(
      (history) => Number(history.coverageEnd) === Number(value.nextStartTime),
    );
  if (!valid) {
    throw new Error("A/B replay requires the saved strict T=34.4940625 checkpoint.");
  }
}

function positiveIntegerArgument(prefix, fallback) {
  const value = positiveNumberArgument(prefix, fallback);
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`${prefix.slice(0, -1)} must be a positive integer.`);
  }
  return value;
}

function positiveNumberArgument(prefix, fallback) {
  const argument = process.argv.find((value) => value.startsWith(prefix));
  const value = argument == null ? fallback : Number(argument.slice(prefix.length));
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${prefix.slice(0, -1)} must be positive.`);
  }
  return value;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function mean(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}
