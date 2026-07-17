#!/usr/bin/env node

import { performance } from "node:perf_hooks";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import { createBorgEomShadowRunner } from "../../src/apps/borg/BorgEomShadowRunner.js";
import { BORG_DATASET_MANIFEST_V1 } from "../../src/apps/borg/BorgAppManifest.js";
import {
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "../../src/apps/borg/BorgInitialConditions.js";

const binaryPath = process.argv[2];
const options = parseOptions(process.argv.slice(3));
const chunkCount = positiveInteger(options.chunks, 20);
if (!binaryPath) {
  throw new Error(
    "usage: profile-borg-incremental-chunks.mjs <eom_borg_shadow_cli> " +
    "[--chunks=N] [--seed=N] [--chunk-duration=H] [--initial-step=H] " +
    "[--minimum-step=H] [--maximum-step=H] [--adaptive-growth=true|false] " +
    "[--root-tolerance=E] [--position-tolerance=E] " +
    "[--velocity-tolerance=E] [--maximum-mpfr-bits=N] " +
    "[--event-max-cells=N] [--far-field-enclosure-fraction=F]",
  );
}

const manifest = BORG_DATASET_MANIFEST_V1;
const chunkDuration = positiveNumber(options["chunk-duration"], 0.05);
const sampleInterval = 0.01;
const seedIndex = nonnegativeInteger(options.seed, 0);
const initialStep = positiveToken(options["initial-step"], "0.05");
const minimumStep = positiveToken(options["minimum-step"], "0.0001");
const maximumStep = positiveToken(options["maximum-step"], "0.05");
const useAdaptiveStepGrowth = booleanOption(options["adaptive-growth"], true);
const eventMaxCells = positiveInteger(options["event-max-cells"], 200000);
const maximumMpfrBits = positiveInteger(options["maximum-mpfr-bits"], 512);
const rootTolerance = positiveToken(options["root-tolerance"], "1e-3");
const positionTolerance = positiveToken(options["position-tolerance"], "1e-2");
const velocityTolerance = positiveToken(options["velocity-tolerance"], "1e-2");
const farFieldEnclosureFraction = fractionToken(
  options["far-field-enclosure-fraction"],
  "0.25",
);
const includeChunks = !booleanOption(options["summary-only"], false);
const endpointRows = createBorgSeededInitialConditionRows({
  manifest,
  seedIndex,
  config: createBorgInitialConditionConfig(manifest.initialConditions),
});
const historyDepth = calculateBorgInertialHistoryDepth(endpointRows, {
  fieldSpeed: manifest.simulationEnvelope.fieldSpeed,
  sampleInterval,
  maximumSeparation: Math.sqrt(3) * manifest.simulationEnvelope.sideLength,
});
const initialSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
  historyStartTime: -historyDepth,
  historyEndTime: 0,
  sampleInterval,
  minimumPairSeparation: manifest.initialConditions.minimumPairSeparation,
});

const processClient = createBorgNativeEomProcessClient({
  binaryPath,
  binaryArgs: [
    `--event-max-cells=${eventMaxCells}`,
    `--maximum-mpfr-bits=${maximumMpfrBits}`,
  ],
  timeoutMs: 600000,
});
const nativeChunks = [];
const measuredClient = {
  async evolveRetainedHistories(request) {
    const wallStart = performance.now();
    const response = await processClient.evolveRetainedHistories(request);
    const finalRootAccounting = response.stepFailures?.at(-1)?.rootAccounting ?? [];
    const finalStepFailure = response.stepFailures?.at(-1) ?? null;
    const regulatorCertificates = (response.stepFailures ?? []).flatMap((step) =>
      (step.regulatorFailures ?? []).map((certificate) => ({
        stepStatus: step.status,
        attemptedStart: step.attemptedStart,
        attemptedEnd: step.attemptedEnd,
        causticContractRow: step.causticContractRow,
        ...certificate,
      })),
    );
    nativeChunks.push({
      chunkIndex: nativeChunks.length,
      status: response.status,
      haltCode: response.haltCode,
      acceptedEndTime: Number(response.acceptedEndTime),
      acceptedStepCount: response.acceptedStepCount,
      rejectedStepCount: response.rejectedStepCount,
      controllerStepSize: Number(response.controllerStepSize),
      traversalEnclosedPairs: finalStepFailure?.traversalEnclosedPairs ?? 0,
      enclosedErrorWidthTotal: finalStepFailure?.enclosedErrorWidthTotal ?? 0,
      enclosedErrorWidthMaxReceiver:
        finalStepFailure?.enclosedErrorWidthMaxReceiver ?? 0,
      startTime: Number(request.absoluteTimeInterval.start),
      endTime: Number(request.absoluteTimeInterval.end),
      outerWallSeconds: (performance.now() - wallStart) / 1000,
      incrementalStartReused: response.incrementalChunkStartSnapshotReused,
      stableNegativePrefixPairCount: finalRootAccounting.filter(
        (row) => row.stableNegativePrefixCertified,
      ).length,
      incrementalPrefixReusePairCount: finalRootAccounting.filter(
        (row) => row.incrementalPrefixReuseCount > 0,
      ).length,
      attemptedSteps: (response.stepFailures ?? []).map((step) => ({
        status: step.status,
        failureCode: step.failureCode,
        attemptedStart: Number(step.attemptedStart),
        attemptedEnd: Number(step.attemptedEnd),
      })),
      terminalFailure: finalStepFailure == null ? null : {
        failureCode: finalStepFailure.failureCode,
        causticContractRow: finalStepFailure.causticContractRow,
        causticRegulatorLevel: finalStepFailure.causticRegulatorLevel,
        correctionResidual: finalStepFailure.correctionResidual,
        rootFailures: finalStepFailure.rootFailures,
        regulatorFailures: finalStepFailure.regulatorFailures,
      },
      precisionEscalatedRootCertificates: finalRootAccounting.filter(
        (row) => row.roots?.some((root) => root.precisionBits > 53),
      ),
      regulatorCertificates,
      ...response.timing,
    });
    process.stderr.write(
      `[borg-profile] chunk=${nativeChunks.length}/${chunkCount} ` +
      `t=${response.acceptedEndTime} native=${response.timing.totalWallSeconds}s ` +
      `reevaluated=${response.timing.rootReevaluatedCells}` +
      (regulatorCertificates.length > 0
        ? ` regulators=${regulatorCertificates.length}`
        : "") +
      "\n",
    );
    return response;
  },
  dispose: () => processClient.dispose(),
};
const runner = createBorgEomShadowRunner(manifest, {
  eomClient: measuredClient,
  initialFrameRows: initialSeed.rows,
  initialHistoryProvenance: initialSeed.provenance,
  initialHistoryClaimLevel: initialSeed.claimLevel,
  pathCount: endpointRows.length,
  seedIndex,
  startTime: 0,
  historyDepth,
  targetDuration: Number((chunkCount * chunkDuration).toFixed(12)),
  chunkDuration,
  sampleInterval,
  initialStep,
  minimumStep,
  maximumStep,
  useAdaptiveStepGrowth,
  rootTolerance,
  accelerationTolerance: "1e-1",
  farFieldEnclosureFraction,
  positionTolerance,
  velocityTolerance,
  correctionTolerance: "1e-1",
  coupling: String(manifest.modelControls.coupling),
  threadCount: 4,
});

let runFailure = null;
try {
  while (runner.canComputeNextChunk()) {
    try {
      await runner.computeNextChunk();
    } catch (error) {
      runFailure = {
        code: error.code ?? "eom_shadow_run_failed",
        acceptedEndTime: Number(error.eomResponse?.acceptedEndTime),
      };
      break;
    }
  }
} finally {
  await runner.dispose();
}

const warmChunks = nativeChunks.slice(1);
const warmTimes = warmChunks.map((chunk) => chunk.totalWallSeconds);
const mean = average(warmTimes);
const slope = linearSlope(
  warmChunks.map((chunk) => chunk.endTime),
  warmTimes,
);
const relativeSlopePerSimulatedUnit = mean > 0 ? slope / mean : 0;
const lateHalf = warmTimes.slice(Math.floor(warmTimes.length / 2));
const earlyHalf = warmTimes.slice(0, Math.max(1, Math.floor(warmTimes.length / 2)));
const earlyMedian = median(earlyHalf);
const lateMedian = median(lateHalf);
const lateToEarlyMedianRatio = earlyMedian > 0 ? lateMedian / earlyMedian : null;
const ordinaryChunks = warmChunks.filter((chunk) => chunk.rootMpfrPairCount === 0);
const steadyOrdinaryChunks = ordinaryChunks.slice(-Math.min(6, ordinaryChunks.length));
const steadyTimes = steadyOrdinaryChunks.map((chunk) => chunk.totalWallSeconds);
const steadySplit = Math.max(1, Math.floor(steadyTimes.length / 2));
const steadyEarlyMedian = median(steadyTimes.slice(0, steadySplit));
const steadyLateMedian = median(steadyTimes.slice(steadySplit));
const steadyLateToEarlyMedianRatio = steadyEarlyMedian > 0
  ? steadyLateMedian / steadyEarlyMedian
  : null;
const steadyRelativeSlopePerChunk = average(steadyTimes) > 0
  ? linearSlope(
      steadyOrdinaryChunks.map((chunk) => chunk.chunkIndex),
      steadyTimes,
    ) / average(steadyTimes)
  : 0;
const ordinarySteadyChunksApproximatelyFlat =
  steadyOrdinaryChunks.length >= 6 &&
  steadyLateToEarlyMedianRatio <= 1.25 &&
  Math.abs(steadyRelativeSlopePerChunk) <= 0.05;

process.stdout.write(`${JSON.stringify({
  schema: "borg_incremental_chunk_profile/v0",
  claimLevel: "measured_current_binary",
  pathCount: endpointRows.length,
  coupling: manifest.modelControls.coupling,
  historyDepth,
  chunkDuration,
  chunkCount,
  controller: {
    initialStep,
    minimumStep,
    maximumStep,
    useAdaptiveStepGrowth,
    eventMaxCells,
    maximumMpfrBits,
    rootTolerance,
    positionTolerance,
    velocityTolerance,
    farFieldEnclosureFraction,
  },
  status: runFailure == null ? "completed" : "halted",
  haltCode: runFailure?.code ?? null,
  acceptedEndTime: runFailure?.acceptedEndTime ?? nativeChunks.at(-1)?.acceptedEndTime ?? 0,
  allWarmChunkStartsReused: warmChunks.every((chunk) => chunk.incrementalStartReused),
  coldFirstChunkSeconds: nativeChunks[0]?.totalWallSeconds ?? null,
  warmMeanSeconds: mean,
  earlyWarmMedianSeconds: earlyMedian,
  lateWarmMedianSeconds: lateMedian,
  lateToEarlyMedianRatio,
  relativeSlopePerSimulatedUnit,
  ordinarySteadyWindow: steadyOrdinaryChunks.length > 0
    ? [steadyOrdinaryChunks[0].startTime, steadyOrdinaryChunks.at(-1).endTime]
    : null,
  ordinarySteadyEarlyMedianSeconds: steadyEarlyMedian,
  ordinarySteadyLateMedianSeconds: steadyLateMedian,
  ordinarySteadyLateToEarlyMedianRatio: steadyLateToEarlyMedianRatio,
  ordinarySteadyRelativeSlopePerChunk: steadyRelativeSlopePerChunk,
  ordinarySteadyChunksApproximatelyFlat,
  precisionEscalationChunks: warmChunks
    .filter((chunk) => chunk.rootMpfrPairCount > 0)
    .map((chunk) => ({
      chunkIndex: chunk.chunkIndex,
      interval: [chunk.startTime, chunk.endTime],
      rootMpfrPairCount: chunk.rootMpfrPairCount,
      totalWallSeconds: chunk.totalWallSeconds,
    })),
  chunks: includeChunks ? nativeChunks : summarizeChunks(nativeChunks),
}, null, 2)}\n`);

function summarizeChunks(chunks) {
  return chunks.map((chunk) => ({
    chunkIndex: chunk.chunkIndex,
    status: chunk.status,
    haltCode: chunk.haltCode,
    interval: [chunk.startTime, chunk.endTime],
    acceptedEndTime: chunk.acceptedEndTime,
    acceptedStepCount: chunk.acceptedStepCount,
    rejectedStepCount: chunk.rejectedStepCount,
    controllerStepSize: chunk.controllerStepSize,
    traversalEnclosedPairs: chunk.traversalEnclosedPairs,
    enclosedErrorWidthTotal: chunk.enclosedErrorWidthTotal,
    enclosedErrorWidthMaxReceiver: chunk.enclosedErrorWidthMaxReceiver,
    totalWallSeconds: chunk.totalWallSeconds,
    precisionEscalatedRootCertificates:
      chunk.status === "halted" ? chunk.precisionEscalatedRootCertificates : [],
    regulatorCertificates: chunk.regulatorCertificates,
    terminalFailure: chunk.status === "halted" ? chunk.terminalFailure : null,
  }));
}

function positiveInteger(token, fallback) {
  const value = Number(token);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function nonnegativeInteger(token, fallback) {
  const value = Number(token);
  return Number.isInteger(value) && value >= 0 ? value : fallback;
}

function positiveNumber(token, fallback) {
  const value = Number(token);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function positiveToken(token, fallback) {
  return positiveNumber(token, Number(fallback)).toString();
}

function fractionToken(token, fallback) {
  const value = Number(token ?? fallback);
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new Error(`invalid fraction option: ${token}`);
  }
  return String(value);
}

function booleanOption(token, fallback) {
  if (token == null) {
    return fallback;
  }
  if (token === "true") {
    return true;
  }
  if (token === "false") {
    return false;
  }
  throw new Error(`invalid boolean option: ${token}`);
}

function parseOptions(tokens) {
  const parsed = {};
  for (const token of tokens) {
    if (!token.startsWith("--") || !token.includes("=")) {
      throw new Error(`invalid option: ${token}`);
    }
    const separator = token.indexOf("=");
    parsed[token.slice(2, separator)] = token.slice(separator + 1);
  }
  return parsed;
}

function average(values) {
  return values.length > 0
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : 0;
}

function median(values) {
  if (values.length === 0) {
    return 0;
  }
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function linearSlope(xs, ys) {
  const meanX = average(xs);
  const meanY = average(ys);
  let numerator = 0;
  let denominator = 0;
  for (let index = 0; index < xs.length; index += 1) {
    numerator += (xs[index] - meanX) * (ys[index] - meanY);
    denominator += (xs[index] - meanX) ** 2;
  }
  return denominator > 0 ? numerator / denominator : 0;
}
