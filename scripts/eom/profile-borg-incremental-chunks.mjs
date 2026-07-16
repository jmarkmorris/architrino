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
const chunkCount = positiveInteger(process.argv[3], 20);
if (!binaryPath) {
  throw new Error(
    "usage: profile-borg-incremental-chunks.mjs <eom_borg_shadow_cli> [chunk-count]",
  );
}

const manifest = BORG_DATASET_MANIFEST_V1;
const chunkDuration = 0.05;
const sampleInterval = 0.01;
const endpointRows = createBorgSeededInitialConditionRows({
  manifest,
  seedIndex: 0,
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
  timeoutMs: 180000,
});
const nativeChunks = [];
const measuredClient = {
  async evolveRetainedHistories(request) {
    const wallStart = performance.now();
    const response = await processClient.evolveRetainedHistories(request);
    const finalRootAccounting = response.stepFailures?.at(-1)?.rootAccounting ?? [];
    nativeChunks.push({
      chunkIndex: nativeChunks.length,
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
      ...response.timing,
    });
    process.stderr.write(
      `[borg-profile] chunk=${nativeChunks.length}/${chunkCount} ` +
      `t=${response.acceptedEndTime} native=${response.timing.totalWallSeconds}s ` +
      `reevaluated=${response.timing.rootReevaluatedCells}\n`,
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
  startTime: 0,
  historyDepth,
  targetDuration: Number((chunkCount * chunkDuration).toFixed(12)),
  chunkDuration,
  sampleInterval,
  initialStep: "0.01",
  minimumStep: "0.0001",
  rootTolerance: "1e-3",
  accelerationTolerance: "1e-1",
  positionTolerance: "1e-2",
  velocityTolerance: "1e-2",
  correctionTolerance: "1e-1",
  coupling: String(manifest.modelControls.coupling),
  threadCount: 4,
});

try {
  while (runner.canComputeNextChunk()) {
    await runner.computeNextChunk();
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
  chunks: nativeChunks,
}, null, 2)}\n`);

function positiveInteger(token, fallback) {
  const value = Number(token);
  return Number.isInteger(value) && value > 0 ? value : fallback;
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
