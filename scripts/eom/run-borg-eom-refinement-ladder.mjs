#!/usr/bin/env node

import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";

import { createBorgNativeEomProcessClient } from "./BorgNativeEomProcessClient.mjs";
import {
  createBorgContinuousRetainedHistories,
  createBorgEomShadowRequest,
  createBorgEomShadowRunConfig,
} from "../../src/apps/borg/BorgEomShadowRunner.js";
import { BORG_DATASET_MANIFEST_V1 } from "../../src/apps/borg/BorgAppManifest.js";
import { canonicalStringify } from "../../src/apps/borg/BorgCertifiedBudgets.js";
import {
  calculateBorgInertialHistoryDepth,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgSeededInitialConditionRows,
} from "../../src/apps/borg/BorgInitialConditions.js";

const binaryPath = process.argv[2];
if (!binaryPath) {
  throw new Error(
    "usage: run-borg-eom-refinement-ladder.mjs <eom_borg_shadow_cli> [path-count]",
  );
}

const manifest = BORG_DATASET_MANIFEST_V1;
const pathCount = boundedPathCount(
  process.argv[3],
  manifest.population.architrinoCount,
);
// Borg policy: construct a certified artificial retained history for the
// seeded initial condition and run the EOM forward from T=0.
const startTime = 0;
const duration = 0.01;
const endTime = startTime + duration;
const seededEndpointRows = createBorgSeededInitialConditionRows({
  manifest,
  seedIndex: 0,
  config: createBorgInitialConditionConfig(manifest.initialConditions),
});
const endpointRows = seededEndpointRows.slice(0, pathCount);
const envelopeDiameter = 2 * manifest.simulationEnvelope.outerRadius;
const historyDepth = calculateBorgInertialHistoryDepth(endpointRows, {
  fieldSpeed: manifest.simulationEnvelope?.fieldSpeed ?? 1,
  sampleInterval: duration,
  maximumSeparation: envelopeDiameter,
  safetyMargin: Math.max(duration * 2, envelopeDiameter * 0.05),
});
const initialSeed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
  historyStartTime: startTime - historyDepth,
  historyEndTime: startTime,
  sampleInterval: duration,
});
const initialFrameRows = initialSeed.rows;
const baseConfig = createBorgEomShadowRunConfig(manifest, {
  pathCount,
  startTime,
  historyDepth,
  targetDuration: endTime,
  chunkDuration: duration,
  sampleInterval: duration,
});
const initialHistories = createBorgContinuousRetainedHistories(
  initialFrameRows,
  manifest,
  {
    historyStartTime: -historyDepth,
    historyEndTime: startTime,
    expectedPathCount: pathCount,
    sourceProvenance: initialSeed.certificate.construction,
    sourceClaimLevel: initialSeed.certificate.acceptanceScope,
  },
);
const client = createBorgNativeEomProcessClient({ binaryPath, timeoutMs: 180000 });
const cases = [
  { id: "h", step: "0.01", threadCount: 1 },
  { id: "h_over_2", step: "0.005", threadCount: 1 },
  { id: "h_over_4", step: "0.0025", threadCount: 1 },
  { id: "h_over_4_threads_4", step: "0.0025", threadCount: 4 },
];

const results = [];
try {
  for (const control of cases) {
    const allocations = structuredClone(
      baseConfig.certifiedBudget.allocations,
    );
    allocations.controller = {
      initialStep: control.step,
      minimumStep: control.step,
      maximumStep: control.step,
      adaptiveGrowth: false,
    };
    allocations.resources = {
      ...allocations.resources,
      workerThreads: control.threadCount,
    };
    const allocationCanonicalJson = canonicalStringify(allocations);
    const config = {
      ...baseConfig,
      runId: `borg-eom-refinement-${control.id}`,
      initialStep: control.step,
      minimumStep: control.step,
      maximumStep: control.step,
      useAdaptiveStepGrowth: false,
      threadCount: control.threadCount,
      certifiedBudget: {
        id: `refinement-control-${control.id}-v1`,
        label: `Refinement control ${control.id}`,
        allocations,
        allocationCanonicalJson,
        allocationHash: createHash("sha256")
          .update(allocationCanonicalJson)
          .digest("hex"),
      },
    };
    const request = createBorgEomShadowRequest({
      manifest,
      config,
      histories: initialHistories,
      chunkIndex: 0,
      startTime,
      endTime,
    });
    const startedAt = performance.now();
    try {
      const chunk = await client.evolveRetainedHistories(request);
      results.push({
        ...control,
        status: chunk.status,
        evidenceStatus: chunk.evidenceStatus,
        wallTimeMs: performance.now() - startedAt,
        workerPid: client.workerPid,
        histories: chunk.histories,
        endpoint: chunk.histories.map((history) => evaluateEndpoint(history, endTime)),
        diagnostics: summarizeDiagnostics(chunk.diagnostics),
      });
    } catch (error) {
      results.push({
        ...control,
        status: "failed_closed",
        evidenceStatus: error.eomResponse?.evidenceStatus ?? "failed",
        wallTimeMs: performance.now() - startedAt,
        workerPid: client.workerPid,
        failureCode: error.code ?? "eom_shadow_run_failed",
        histories: null,
        endpoint: null,
        diagnostics: summarizeDiagnostics(error.eomResponse?.diagnostics ?? []),
      });
    }
  }
} finally {
  await client.dispose();
}

const base = results[0];
const refinementDeltas = base.endpoint
  ? results.slice(1, 3).filter((result) => result.endpoint).map((result) => ({
      left: base.id,
      right: result.id,
      maximumStateDelta: maximumStateDelta(base.endpoint, result.endpoint),
    }))
  : [];
const threadParity = Boolean(
  results[2].histories &&
    results[3].histories &&
    JSON.stringify(results[2].histories) === JSON.stringify(results[3].histories),
);
const persistentWorker = new Set(results.map((result) => result.workerPid)).size === 1;
const strictControlPassed =
  results.every((result) => result.status === "completed") &&
  refinementDeltas.length === 2 &&
  refinementDeltas.every((row) => row.maximumStateDelta <= 1e-8) &&
  threadParity &&
  persistentWorker;

process.stdout.write(`${JSON.stringify({
  schema: "eom_borg_refinement_ladder_evidence/v1",
  authority: pathCount === manifest.population.architrinoCount
    ? "strict_full_population_attempt"
    : "strict_population_subset_control_only",
  pathCount,
  fullBorgPathCount: manifest.population.architrinoCount,
  interval: [startTime, endTime],
  rootTolerance: baseConfig.rootTolerance,
  cases: results.map(({ histories: _histories, endpoint, ...result }) => ({
    ...result,
    endpoint,
  })),
  refinementDeltas,
  deterministicThreadParity: threadParity,
  persistentNativeWorker: persistentWorker,
  strictControlPassed,
  borgMigrationAuthorized: false,
  blockers: [
    ...(pathCount < manifest.population.architrinoCount
      ? [`the strict ladder covers ${pathCount} of ${manifest.population.architrinoCount} Borg histories`]
      : strictControlPassed
        ? []
        : ["the full-population strict ladder failed closed; inspect the case diagnostics"]),
    "the initial retained history is an app-authored accepted inertial datum, not EOM-produced history",
    "the million-path, GPU, distributed-history, and full Borg performance gates remain open",
    "the native response remains executable architecture evidence rather than canonical evidence",
  ],
}, null, 2)}\n`);

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

function summarizeDiagnostics(diagnostics) {
  return diagnostics.map((diagnostic) => ({
    ...diagnostic,
    stepFailures: (diagnostic.stepFailures ?? []).map((step) => {
      const rootFailures = step.rootFailures ?? [];
      const failureCounts = {};
      rootFailures.forEach((row) => {
        const key = row.failureCode || row.status || "unspecified";
        failureCounts[key] = (failureCounts[key] ?? 0) + 1;
      });
      return {
        ...step,
        rootFailures: undefined,
        rootFailureCount: rootFailures.length,
        rootFailureCounts: failureCounts,
        rootFailureSample: rootFailures.slice(0, 8),
      };
    }),
  }));
}

function boundedPathCount(value, maximum) {
  if (value === undefined) {
    return 1;
  }
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > maximum) {
    throw new RangeError(`path-count must be an integer from 1 through ${maximum}`);
  }
  return number;
}
