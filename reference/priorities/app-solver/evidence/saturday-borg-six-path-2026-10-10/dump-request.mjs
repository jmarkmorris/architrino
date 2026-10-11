// Diagnostic only: rebuild the exact request of the frozen six-path ladder driver for the step-0.01 row
// (same builders, same arguments as scripts/eom/run-borg-eom-refinement-ladder.mjs) and print it.
import { createHash } from "node:crypto";
import { createBorgContinuousRetainedHistories, createBorgEomShadowRequest, createBorgEomShadowRunConfig } from "../../../src/apps/borg/BorgEomShadowRunner.js";
import { BORG_DATASET_MANIFEST_V1 } from "../../../src/apps/borg/BorgAppManifest.js";
import { canonicalStringify } from "../../../src/apps/borg/BorgCertifiedBudgets.js";
import { calculateBorgInertialHistoryDepth, createBorgAcceptedInertialSeedHistory, createBorgInitialConditionConfig, createBorgSeededInitialConditionRows } from "../../../src/apps/borg/BorgInitialConditions.js";
const manifest = BORG_DATASET_MANIFEST_V1;
const pathCount = 6, startTime = 0, duration = 0.01, endTime = 0.01;
const rows = createBorgSeededInitialConditionRows({ manifest, seedIndex: 0, config: createBorgInitialConditionConfig(manifest.initialConditions) }).slice(0, pathCount);
const envelopeDiameter = 2 * manifest.simulationEnvelope.outerRadius;
const historyDepth = calculateBorgInertialHistoryDepth(rows, { fieldSpeed: manifest.simulationEnvelope?.fieldSpeed ?? 1, sampleInterval: duration, maximumSeparation: envelopeDiameter, safetyMargin: Math.max(duration * 2, envelopeDiameter * 0.05) });
const seed = await createBorgAcceptedInertialSeedHistory(rows, { historyStartTime: startTime - historyDepth, historyEndTime: startTime, sampleInterval: duration });
const baseConfig = createBorgEomShadowRunConfig(manifest, { pathCount, startTime, historyDepth, targetDuration: endTime, chunkDuration: duration, sampleInterval: duration });
const histories = createBorgContinuousRetainedHistories(seed.rows, manifest, { historyStartTime: -historyDepth, historyEndTime: startTime, expectedPathCount: pathCount, sourceProvenance: seed.certificate.construction, sourceClaimLevel: seed.certificate.acceptanceScope });
const allocations = structuredClone(baseConfig.certifiedBudget.allocations);
allocations.controller = { initialStep: "0.01", minimumStep: "0.01", maximumStep: "0.01", adaptiveGrowth: false };
allocations.resources = { ...allocations.resources, workerThreads: 1 };
const allocationCanonicalJson = canonicalStringify(allocations);
const config = { ...baseConfig, runId: "borg-eom-refinement-h", initialStep: "0.01", minimumStep: "0.01", maximumStep: "0.01", useAdaptiveStepGrowth: false, threadCount: 1,
  certifiedBudget: { id: "refinement-control-h-v1", label: "Refinement control h", allocations, allocationCanonicalJson, allocationHash: createHash("sha256").update(allocationCanonicalJson).digest("hex") } };
const request = createBorgEomShadowRequest({ manifest, config, histories, chunkIndex: 0, startTime, endTime });
process.stdout.write(JSON.stringify({ historyDepth, endpointRows: rows, request, inputHistoriesSha256: createHash("sha256").update(canonicalStringify(histories)).digest("hex"), allocationHash: config.certifiedBudget.allocationHash }));
