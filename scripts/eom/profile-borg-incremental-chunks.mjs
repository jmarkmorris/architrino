#!/usr/bin/env node

import { performance } from "node:perf_hooks";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import { createBorgEomShadowRunner } from "../../src/apps/borg/BorgEomShadowRunner.js";
import {
  BORG_DEFAULT_CERTIFIED_BUDGET_ID,
  getBorgCertifiedBudgetPreset,
} from "../../src/apps/borg/BorgCertifiedBudgets.js";
import { BORG_DATASET_MANIFEST_V1 } from "../../src/apps/borg/BorgAppManifest.js";
import {
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "../../src/apps/borg/BorgInitialConditions.js";
import {
  BORG_INTERACTIVE_DEFAULTS_V1,
  createBorgPlacementPolicy,
} from "../../src/apps/borg/BorgInteractiveDefaults.js";

const binaryPath = process.argv[2];
const options = parseOptions(process.argv.slice(3));
const chunkCount = positiveInteger(options.chunks, 20);
if (!binaryPath) {
  throw new Error(
    "usage: profile-borg-incremental-chunks.mjs <eom_borg_shadow_cli> " +
    "[--chunks=N] [--seed=N] [--chunk-duration=H] " +
    "[--electrinos=N] [--positrinos=N] " +
    "[--coupling=K] [--max-per-axis-speed=V] [--history-depth=H] " +
    "[--certified-budget-id=ID]",
  );
}

const manifest = BORG_DATASET_MANIFEST_V1;
const chunkDuration = positiveNumber(options["chunk-duration"], 0.3);
const sampleInterval = 0.01;
const seedIndex = nonnegativeInteger(options.seed, 0);
const certifiedBudget = getBorgCertifiedBudgetPreset(
  options["certified-budget-id"] ?? BORG_DEFAULT_CERTIFIED_BUDGET_ID,
);
const budgetAllocations = certifiedBudget.allocations;
const initialStep = budgetAllocations.controller.initialStep;
const minimumStep = budgetAllocations.controller.minimumStep;
const maximumStep = budgetAllocations.controller.maximumStep;
const useAdaptiveStepGrowth = budgetAllocations.controller.adaptiveGrowth;
const eventMaxCells = budgetAllocations.resources.eventMaximumCells;
const maximumMpfrBits = budgetAllocations.precision.difficultRowMaximumBits;
const rootTolerance = budgetAllocations.ordinary.rootTimeEnclosure;
const accelerationTolerance = budgetAllocations.ordinary.accelerationEnclosure;
const positionTolerance = budgetAllocations.ordinary.acceptedStepPosition;
const velocityTolerance = budgetAllocations.ordinary.acceptedStepVelocity;
const correctionTolerance =
  budgetAllocations.ordinary.correctionAccelerationResidual;
const farFieldEnclosureFraction =
  budgetAllocations.ordinary.farFieldEnclosureFraction;
const coupling = String(positiveNumber(
  options.coupling,
  BORG_INTERACTIVE_DEFAULTS_V1.coupling,
));
const coreScale = Number(budgetAllocations.finiteWidth.coreScale);
const memoryBudgetBytes = budgetAllocations.resources.requestMemoryBytes;
const budgetId = certifiedBudget.id;
const budgetAllocationHash = certifiedBudget.allocationHash;
const includeChunks = !booleanOption(options["summary-only"], false);
const aggregateOnly = booleanOption(options["aggregate-only"], false);
const includeRegulatorCertificates = !booleanOption(
  options["omit-regulators"],
  false,
);
const summarizeStateCertificates = booleanOption(
  options["state-summary"],
  false,
);
const initialConditionConfig = createBorgInitialConditionConfig({
  ...manifest.initialConditions,
  electrinoCount: nonnegativeInteger(
    options.electrinos,
    manifest.initialConditions.electrinoCount,
  ),
  positrinoCount: nonnegativeInteger(
    options.positrinos,
    manifest.initialConditions.positrinoCount,
  ),
  randomVelocityMaxComponentMagnitude: positiveNumber(
    options["max-per-axis-speed"],
    manifest.initialConditions.randomVelocityMaxComponentMagnitude,
  ),
});
const placement = createBorgPlacementPolicy(
  manifest,
  initialConditionConfig.electrinoCount + initialConditionConfig.positrinoCount,
);
const endpointRows = createBorgSeededInitialConditionRows({
  manifest,
  seedIndex,
  config: initialConditionConfig,
  seedingRadius: placement.seedingRadius,
  minimumPairSeparation: placement.minimumPairSeparation,
});
const causalHistoryDepth = calculateBorgInertialHistoryDepth(endpointRows, {
  fieldSpeed: manifest.simulationEnvelope.fieldSpeed,
  sampleInterval,
  maximumSeparation: 2 * manifest.simulationEnvelope.outerRadius,
});
const historyDepth = options["history-depth"] == null
  ? Number((causalHistoryDepth + chunkCount * chunkDuration).toFixed(12))
  : positiveNumber(options["history-depth"], causalHistoryDepth);
const initialSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
  historyStartTime: -historyDepth,
  historyEndTime: 0,
  sampleInterval,
  minimumPairSeparation: placement.minimumPairSeparation,
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
    const regulatorEventVisitedCells = regulatorCertificates.reduce(
      (certificateTotal, certificate) => certificateTotal +
        (certificate.series ?? []).reduce(
          (seriesTotal, series) => seriesTotal +
            (series.levels ?? []).reduce(
              (levelTotal, level) =>
                levelTotal + Number(level.visitedCells ?? 0),
              0,
            ),
          0,
        ),
      0,
    );
    const regulatorLevelEvaluationCount = regulatorCertificates.reduce(
      (certificateTotal, certificate) => certificateTotal +
        (certificate.series ?? []).reduce(
          (seriesTotal, series) => seriesTotal +
            (series.levels?.length ?? 0),
          0,
        ),
      0,
    );
    const finiteWidthStateCertificates = (response.stepFailures ?? []).flatMap(
      (step) =>
        (step.finiteWidthStateCertificates ?? []).map((certificate) => ({
          stepStatus: step.status,
          attemptedStart: step.attemptedStart,
          attemptedEnd: step.attemptedEnd,
          causticContractRow: step.causticContractRow,
          ...certificate,
        })),
    );
    const endpointSegmentErrors = (response.histories ?? []).map((history) => {
      const segment = history.segments?.at(-1);
      return {
        pathId: history.pathId,
        positionError: Number(segment?.positionError ?? 0),
        velocityError: Number(segment?.velocityError ?? 0),
        positionErrors: (segment?.positionErrors ?? []).map(Number),
        velocityErrors: (segment?.velocityErrors ?? []).map(Number),
      };
    });
    nativeChunks.push({
      chunkIndex: nativeChunks.length,
      status: response.status,
      haltCode: response.haltCode,
      diagnosticDetail: response.diagnosticDetail ?? null,
      acceptedEndTime: Number(response.acceptedEndTime),
      acceptedStepCount: response.acceptedStepCount,
      rejectedStepCount: response.rejectedStepCount,
      controllerStepSize: Number(response.controllerStepSize),
      claimGrade: response.claimGrade,
      memoryBudgetBytes: response.memoryBudgetBytes,
      memoryEstimateBytes: response.memoryEstimateBytes,
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
        correctionResidual: step.correctionResidual,
        correctionRetryScale: step.correctionRetryScale,
      })),
      terminalFailure: finalStepFailure == null ? null : {
        failureCode: finalStepFailure.failureCode,
        causticContractRow: finalStepFailure.causticContractRow,
        causticRegulatorLevel: finalStepFailure.causticRegulatorLevel,
        correctionResidual: finalStepFailure.correctionResidual,
        correctionRetryScale: finalStepFailure.correctionRetryScale,
        rootFailures: finalStepFailure.rootFailures,
        regulatorFailures: finalStepFailure.regulatorFailures,
      },
      precisionEscalatedRootCertificates: finalRootAccounting.filter(
        (row) => row.roots?.some((root) => root.precisionBits > 53),
      ),
      regulatorCertificates,
      regulatorEventVisitedCells,
      regulatorLevelEvaluationCount,
      finiteWidthStateCertificates,
      endpointSegmentErrors,
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
  certifiedBudgetId: certifiedBudget.id,
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
  accelerationTolerance,
  farFieldEnclosureFraction,
  positionTolerance,
  velocityTolerance,
  correctionTolerance,
  coupling,
  coreScale,
  memoryBudgetBytes,
  threadCount: 4,
});

let runFailure = null;
let endpointFrames = [];
try {
  while (runner.canComputeNextChunk()) {
    try {
      const chunk = await runner.computeNextChunk();
      if (nativeChunks.length > 0) {
        nativeChunks.at(-1).frameCount = chunk.frames.length;
      }
      endpointFrames = chunk.frames.filter(
        (frame) => Number(frame.time) === Number(chunk.endTime),
      );
      if (chunk.terminalHalt) {
        runFailure = {
          code: chunk.terminalHalt.code,
          message: `failed candidate rejected after certified prefix through T=${chunk.endTime}`,
          acceptedEndTime: Number(chunk.endTime),
        };
        break;
      }
    } catch (error) {
      runFailure = {
        code: error.code ?? "eom_shadow_run_failed",
        message: error.message,
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
const completedSimulatedDuration = nativeChunks.length === 0
  ? 0
  : Math.max(0, nativeChunks.at(-1).acceptedEndTime - nativeChunks[0].startTime);
const nativeTotalWallSeconds = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.totalWallSeconds,
  0,
);
const outerTotalWallSeconds = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.outerWallSeconds,
  0,
);
const rootBatchWallSeconds = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.rootBatchWallSeconds,
  0,
);
const historyCopyHashWallSeconds = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.historyCopyHashWallSeconds,
  0,
);
const correctionWallSeconds = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.correctionWallSeconds,
  0,
);
const timingFieldTotals = Object.fromEntries(
  [
    "snapshotTotalWallSeconds",
    "snapshotCount",
    "historyWindowWallSeconds",
    "traversalWallSeconds",
    "rootBatchWallSeconds",
    "rootBinary64CpuSeconds",
    "rootPairCount",
    "rootReevaluatedCells",
    "rootWarmExcludedCells",
    "rootMpfrCpuSeconds",
    "rootMpfrPairCount",
    "rootMpfrAttemptCount",
    "rootMpfrEscalationCpuSeconds",
    "rootMpfrEscalationAttemptCount",
    "accelerationWallSeconds",
    "finiteWidthExecutionUnionWallSeconds",
    "sharpExecutionUnionWallSeconds",
    "finiteWidthSharpOverlapWallSeconds",
    "accelerationWorkerIdleOrchestrationWallSeconds",
    "accelerationPrecisionEscalationWorkerSeconds",
    "accelerationPrecisionEscalationAttemptCount",
    "regulatorLadderWallSeconds",
    "commonDomainWallSeconds",
    "historyCopyHashWallSeconds",
    "correctionWallSeconds",
    "reusedStartSnapshotCount",
    "recertificationWallSeconds",
    "rejectionWallSeconds",
  ].map((field) => [
    field,
    nativeChunks.reduce((sum, chunk) => sum + Number(chunk[field] ?? 0), 0),
  ]),
);
const nativeChunkWallTimes = nativeChunks.map((chunk) => chunk.totalWallSeconds);
const outerChunkWallTimes = nativeChunks.map((chunk) => chunk.outerWallSeconds);
const acceptedStepTotal = nativeChunks.reduce(
  (sum, chunk) => sum + Number(chunk.acceptedStepCount ?? 0),
  0,
);
const rejectedStepTotal = nativeChunks.reduce(
  (sum, chunk) => sum + Number(chunk.rejectedStepCount ?? 0),
  0,
);
const regulatorEventVisitedCellsTotal = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.regulatorEventVisitedCells,
  0,
);
const regulatorLevelEvaluationCountTotal = nativeChunks.reduce(
  (sum, chunk) => sum + chunk.regulatorLevelEvaluationCount,
  0,
);
const attemptedHeights = nativeChunks.flatMap((chunk) =>
  chunk.attemptedSteps.map((step) =>
    Math.max(0, step.attemptedEnd - step.attemptedStart),
  ),
);

process.stdout.write(`${JSON.stringify({
  schema: "borg_incremental_chunk_profile/v1",
  claimLevel: "measured_current_binary",
  pathCount: endpointRows.length,
  coupling: Number(coupling),
  coreScale,
  memoryBudgetBytes,
  budgetProvenance: {
    budgetId,
    completeAllocations: budgetAllocations,
    allocationHashAlgorithm: "sha256/canonical-json-v0",
    allocationHash: budgetAllocationHash,
    closeEncounterBudgetSelection: "ratified-run-selected",
  },
  initialConditionConfig,
  placement,
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
    accelerationTolerance,
    positionTolerance,
    velocityTolerance,
    correctionTolerance,
    farFieldEnclosureFraction,
  },
  status: runFailure == null ? "completed" : "halted",
  haltCode: runFailure?.code ?? null,
  haltMessage: runFailure?.message ?? null,
  acceptedEndTime: runFailure?.acceptedEndTime ?? nativeChunks.at(-1)?.acceptedEndTime ?? 0,
  completedSimulatedDuration,
  nativeTotalWallSeconds,
  nativeSimulatedSecondsPerWallSecond: nativeTotalWallSeconds > 0
    ? completedSimulatedDuration / nativeTotalWallSeconds
    : null,
  outerTotalWallSeconds,
  outerSimulatedSecondsPerWallSecond: outerTotalWallSeconds > 0
    ? completedSimulatedDuration / outerTotalWallSeconds
    : null,
  timingTotals: {
    ...timingFieldTotals,
    rootBatchWallSeconds,
    historyCopyHashWallSeconds,
    correctionWallSeconds,
    nestedTimingWarning:
      "correction, snapshot, root, acceleration, history-copy, recertification, " +
      "regulator, common-domain, and rejection fields overlap and must not be " +
      "summed as disjoint wall time",
    processProtocolAndMergeWallSeconds: Math.max(
      0,
      outerTotalWallSeconds - nativeTotalWallSeconds,
    ),
  },
  chunkWallTime: {
    nativeMedianSeconds: median(nativeChunkWallTimes),
    nativeP95Seconds: percentile(nativeChunkWallTimes, 0.95),
    nativeMaximumSeconds: maximum(nativeChunkWallTimes),
    outerMedianSeconds: median(outerChunkWallTimes),
    outerP95Seconds: percentile(outerChunkWallTimes, 0.95),
    outerMaximumSeconds: maximum(outerChunkWallTimes),
  },
  steps: {
    accepted: acceptedStepTotal,
    rejected: rejectedStepTotal,
    regulatorEventVisitedCells: regulatorEventVisitedCellsTotal,
    regulatorLevelEvaluations: regulatorLevelEvaluationCountTotal,
    attemptedHeightDistribution: histogram(attemptedHeights),
    correctionRetryCount: nativeChunks.reduce(
      (sum, chunk) => sum + chunk.attemptedSteps.filter(
        (step) => step.failureCode === "coupled_correction_failed",
      ).length,
      0,
    ),
  },
  wallTimeShares: wallTimeShares(timingFieldTotals, nativeTotalWallSeconds),
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
  maximumMemoryEstimateBytes: Math.max(
    0,
    ...nativeChunks.map((chunk) => chunk.memoryEstimateBytes ?? 0),
  ),
  endpointFrames: endpointFrames.map((frame) => ({
    pathKey: frame.pathKey,
    time: frame.time,
    position: frame.position,
    velocity: frame.velocity,
    errorBound: frame.errorBound,
  })),
  precisionEscalationChunks: warmChunks
    .filter((chunk) => chunk.rootMpfrPairCount > 0)
    .map((chunk) => ({
      chunkIndex: chunk.chunkIndex,
      interval: [chunk.startTime, chunk.endTime],
      rootMpfrPairCount: chunk.rootMpfrPairCount,
      totalWallSeconds: chunk.totalWallSeconds,
    })),
  chunks: aggregateOnly
    ? []
    : includeChunks ? nativeChunks : summarizeChunks(nativeChunks),
}, null, 2)}\n`);

function summarizeChunks(chunks) {
  return chunks.map((chunk) => ({
    chunkIndex: chunk.chunkIndex,
    status: chunk.status,
    haltCode: chunk.haltCode,
    diagnosticDetail: chunk.diagnosticDetail,
    interval: [chunk.startTime, chunk.endTime],
    acceptedEndTime: chunk.acceptedEndTime,
    acceptedStepCount: chunk.acceptedStepCount,
    rejectedStepCount: chunk.rejectedStepCount,
    controllerStepSize: chunk.controllerStepSize,
    claimGrade: chunk.claimGrade,
    memoryBudgetBytes: chunk.memoryBudgetBytes,
    memoryEstimateBytes: chunk.memoryEstimateBytes,
    traversalEnclosedPairs: chunk.traversalEnclosedPairs,
    enclosedErrorWidthTotal: chunk.enclosedErrorWidthTotal,
    enclosedErrorWidthMaxReceiver: chunk.enclosedErrorWidthMaxReceiver,
    regulatorEventVisitedCells: chunk.regulatorEventVisitedCells,
    regulatorLevelEvaluationCount: chunk.regulatorLevelEvaluationCount,
    totalWallSeconds: chunk.totalWallSeconds,
    outerWallSeconds: chunk.outerWallSeconds,
    frameCount: chunk.frameCount,
    maximumEndpointPositionError: Math.max(
      0,
      ...chunk.endpointSegmentErrors.map((row) => row.positionError),
    ),
    maximumEndpointVelocityError: Math.max(
      0,
      ...chunk.endpointSegmentErrors.map((row) => row.velocityError),
    ),
    endpointSegmentErrors: chunk.endpointSegmentErrors,
    precisionEscalatedRootCertificates:
      chunk.status === "halted" ? chunk.precisionEscalatedRootCertificates : [],
    regulatorCertificates: includeRegulatorCertificates
      ? chunk.regulatorCertificates
      : [],
    finiteWidthStateCertificates: summarizeStateCertificates
      ? chunk.finiteWidthStateCertificates.map((certificate) => {
          const failedCommonDomain = certificate.commonDomains.find(
            (common) => common.status !== "certified_regulator_match",
          );
          return {
            stepStatus: certificate.stepStatus,
            attemptedStart: certificate.attemptedStart,
            attemptedEnd: certificate.attemptedEnd,
            causticContractRow: certificate.causticContractRow,
            receiverPathId: certificate.receiverPathId,
            sourcePathId: certificate.sourcePathId,
            status: certificate.status,
            failureCode: certificate.failureCode,
            endpointReconstructionPassed:
              certificate.endpointReconstructionPassed,
            commonDomainChartOverlapPassed:
              certificate.commonDomainChartOverlapPassed,
            exitPassed: certificate.exitPassed,
            failedCommonDomain: failedCommonDomain == null
              ? null
              : {
                  failureCode: failedCommonDomain.failureCode,
                  receptionLower: failedCommonDomain.receptionLower,
                  receptionUpper: failedCommonDomain.receptionUpper,
                  disjointComponent: failedCommonDomain.disjointComponent,
                  disjointWidth: failedCommonDomain.disjointWidth,
                  applicableRemainderBudget:
                    failedCommonDomain.applicableRemainderBudget,
                },
          };
        })
      : chunk.finiteWidthStateCertificates,
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

function maximum(values) {
  return values.length > 0 ? Math.max(...values) : null;
}

function percentile(values, fraction) {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.max(
    0,
    Math.min(sorted.length - 1, Math.ceil(fraction * sorted.length) - 1),
  );
  return sorted[index];
}

function histogram(values) {
  const counts = new Map();
  values.forEach((value) => {
    const token = value.toPrecision(12);
    counts.set(token, (counts.get(token) ?? 0) + 1);
  });
  return Object.fromEntries(
    [...counts.entries()].sort((left, right) => Number(left[0]) - Number(right[0])),
  );
}

function wallTimeShares(totals, denominator) {
  const wallFields = [
    "historyWindowWallSeconds",
    "traversalWallSeconds",
    "rootBatchWallSeconds",
    "accelerationWallSeconds",
    "finiteWidthExecutionUnionWallSeconds",
    "sharpExecutionUnionWallSeconds",
    "finiteWidthSharpOverlapWallSeconds",
    "accelerationWorkerIdleOrchestrationWallSeconds",
    "regulatorLadderWallSeconds",
    "commonDomainWallSeconds",
    "historyCopyHashWallSeconds",
    "correctionWallSeconds",
    "recertificationWallSeconds",
    "rejectionWallSeconds",
  ];
  return {
    denominator: "nativeTotalWallSeconds",
    additive: false,
    reason: "reported phase timers include nested and overlapping wall-time unions",
    shares: Object.fromEntries(wallFields.map((field) => [
      field,
      denominator > 0 ? Number(totals[field] ?? 0) / denominator : null,
    ])),
  };
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
