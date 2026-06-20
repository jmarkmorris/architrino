#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";

const ARTIFACT_ID = "emission_shell_broad_phase_v0_default_promotion_v1";
const DEFAULT_ITERATIONS = 5;
const rootDir = process.cwd();
const wasmDir = path.join(rootDir, ".tmp", "solver-build", "wasm");
const wasmLoaderPath = path.join(wasmDir, "architrino_solver_wasm_smoke.mjs");
const reportPath = path.join(
  rootDir,
  ".tmp",
  "solver-default-promotion",
  `${ARTIFACT_ID}.json`
);
const benchmarkReportPath = path.join(
  rootDir,
  ".tmp",
  "solver-build",
  "benchmark",
  "solver-benchmark-report.json"
);

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printUsage(0);
}

const iterations = options.iterations ?? DEFAULT_ITERATIONS;
const createWasmModule = await loadWasmModuleFactory();
const client = createSolverAppBridgeClient({
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});

await client.init({
  appId: "animator",
  apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
  requestedCapabilities: ["pathHistory", "sharedGeometry"],
  storagePolicy: {
    target: "caller-buffer",
    durable: false,
    maxBytes: 256 * 1024 * 1024,
  },
  threadingPolicy: {
    mode: "single-thread",
    deterministic: true,
  },
});

const nativeStressGate = readNativeStressGate();
const interactive = await runEnvelope(client, envelopeConfig("interactive_preview_small_v0"), iterations);
const background = await runEnvelope(client, envelopeConfig("background_validation_large_v0"), iterations);
await client.dispose();

const envelopeResults = [interactive, background];
const defaultEligibleEnvelopes = envelopeResults.filter((result) => result.passed).map((result) => result.envelopeId);
const promotionStatus =
  nativeStressGate.passed && defaultEligibleEnvelopes.length > 0
    ? "eligible_for_declared_envelope_default"
    : "not_promoted";
const report = {
  schema: "solver-default-promotion-report.v1",
  artifactId: ARTIFACT_ID,
  generatedAt: new Date().toISOString(),
  promotionStatus,
  defaultStrategyChanged: false,
  strategy: "emission_shell_broad_phase_v0",
  executionPath: "native_c_abi_indexed_v0",
  packetExecutionPath: "packet_merge",
  iterations,
  runtime: {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
  },
  hardware: {
    osType: os.type(),
    osRelease: os.release(),
    cpuCount: os.cpus().length,
    totalMemoryBytes: os.totalmem(),
  },
  nativeStressGate,
  envelopes: envelopeResults,
  decision: {
    defaultEligibleEnvelopes,
    blockedEnvelopes: envelopeResults.filter((result) => !result.passed).map((result) => result.envelopeId),
    reason:
      defaultEligibleEnvelopes.length > 0
        ? "declared app-facing packet gate and p95 budget passed for at least one envelope"
        : "no declared envelope passed every default-promotion gate",
  },
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `emission-shell default promotion artifact=${ARTIFACT_ID} status=${promotionStatus} envelopes=${defaultEligibleEnvelopes.join(
    ","
  ) || "none"} report=${path.relative(rootDir, reportPath)}`
);

function parseArgs(rawArgs) {
  const parsed = {
    help: false,
    iterations: undefined,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--iterations") {
      const nextValue = rawArgs[index + 1];
      if (!nextValue || nextValue.startsWith("--")) {
        console.error("--iterations requires a positive integer");
        printUsage(2);
      }
      parsed.iterations = parsePositiveInteger(nextValue, "--iterations");
      index += 1;
    } else if (arg.startsWith("--iterations=")) {
      parsed.iterations = parsePositiveInteger(arg.slice("--iterations=".length), "--iterations");
    } else {
      console.error(`Unknown argument: ${arg}`);
      printUsage(2);
    }
  }
  return parsed;
}

function parsePositiveInteger(value, label) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    console.error(`${label} requires a positive integer`);
    printUsage(2);
  }
  return parsed;
}

async function loadWasmModuleFactory() {
  if (!fs.existsSync(wasmLoaderPath)) {
    throw new Error(
      `${path.relative(rootDir, wasmLoaderPath)} is missing; run node scripts/build-solver-smoke.mjs wasm first`
    );
  }
  const { default: factory } = await import(pathToFileURL(wasmLoaderPath).href);
  return factory;
}

function envelopeConfig(envelopeId) {
  if (envelopeId === "interactive_preview_small_v0") {
    return {
      envelopeId,
      p95BudgetMs: 100,
      maxPathCount: 256,
      maxTimeSlabCount: 128,
      maxPacketCount: 4,
      minBruteForcePairs: 256 * 256,
      minIndexedCandidates: 1,
      scenarios: [
        {
          name: "interactive-256-clustered",
          pathCount: 256,
          timeSlabCount: 128,
          maxCandidates: 8_192,
          spatialCellSize: 0.5,
          receiverOffset: 0.02,
          densitySpacing: 0.08,
          clustered: true,
          allowSameSource: true,
        },
      ],
    };
  }
  if (envelopeId === "background_validation_large_v0") {
    return {
      envelopeId,
      p95BudgetMs: 5000,
      maxPathCount: 2048,
      maxTimeSlabCount: 256,
      maxPacketCount: 20,
      minBruteForcePairs: 5_000_000,
      minIndexedCandidates: 20_000,
      scenarios: [
        {
          name: "native-16-sparse",
          pathCount: 16,
          timeSlabCount: 32,
          maxCandidates: 1_024,
          spatialCellSize: 0.5,
          receiverOffset: 0.025,
          densitySpacing: 0.55,
          clustered: false,
          allowSameSource: false,
        },
        {
          name: "native-64-clustered",
          pathCount: 64,
          timeSlabCount: 32,
          maxCandidates: 2_048,
          spatialCellSize: 0.5,
          receiverOffset: 0.025,
          densitySpacing: 0.18,
          clustered: true,
          allowSameSource: true,
        },
        {
          name: "native-256-clustered",
          pathCount: 256,
          timeSlabCount: 128,
          maxCandidates: 8_192,
          spatialCellSize: 0.5,
          receiverOffset: 0.02,
          densitySpacing: 0.08,
          clustered: true,
          allowSameSource: true,
        },
        {
          name: "native-1024-wide",
          pathCount: 1024,
          timeSlabCount: 128,
          maxCandidates: 16_384,
          spatialCellSize: 0.5,
          receiverOffset: 0.02,
          densitySpacing: 0.32,
          clustered: false,
          allowSameSource: true,
        },
        {
          name: "native-2048-clustered",
          pathCount: 2048,
          timeSlabCount: 256,
          maxCandidates: 32_768,
          spatialCellSize: 0.5,
          receiverOffset: 0.006,
          densitySpacing: 0.06,
          clustered: true,
          allowSameSource: true,
        },
      ],
    };
  }
  throw new Error(`unknown envelope ${envelopeId}`);
}

async function runEnvelope(client, config, iterations) {
  const preparedScenarios = [];
  for (let scenarioIndex = 0; scenarioIndex < config.scenarios.length; scenarioIndex += 1) {
    preparedScenarios.push(await prepareScenario(client, config, config.scenarios[scenarioIndex], scenarioIndex));
  }

  const warmup = await runEnvelopePacketBatch(client, preparedScenarios);
  assertEnvelopeEquality(preparedScenarios, warmup);

  const timings = [];
  const iterationsDetail = [];
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const started = performance.now();
    const result = await runEnvelopePacketBatch(client, preparedScenarios);
    const elapsedMs = performance.now() - started;
    assertEnvelopeEquality(preparedScenarios, result);
    timings.push(elapsedMs);
    iterationsDetail.push({
      iteration: iteration + 1,
      elapsedMs,
      candidateCount: result.candidateCount,
      packetCount: result.packetCount,
    });
  }

  const p95Ms = percentile(timings, 0.95);
  const totals = preparedScenarios.reduce(
    (acc, prepared) => {
      acc.bruteForcePairs += prepared.bruteForceReplayPairCount;
      acc.indexedPairTests += prepared.direct.pairCount;
      acc.directCandidates += prepared.direct.candidateCount;
      acc.packetCount += prepared.packetPlan.packetCount;
      acc.chunkReplayRows += prepared.rowCount;
      return acc;
    },
    { bruteForcePairs: 0, indexedPairTests: 0, directCandidates: 0, packetCount: 0, chunkReplayRows: 0 }
  );
  const packetGatePassed =
    preparedScenarios.every((prepared) => prepared.equality.matched) &&
    preparedScenarios.every((prepared) => prepared.packetResultRefs.matched) &&
    preparedScenarios.every((prepared) => !prepared.direct.truncated && !prepared.lastPacketResult?.truncated) &&
    preparedScenarios.every((prepared) => prepared.direct.scanSummary.executionPath === "native_c_abi_indexed_v0") &&
    warmup.packetExecutionPath === "packet_merge";
  const budgetPassed = p95Ms <= config.p95BudgetMs;
  const envelopePassed =
    packetGatePassed &&
    budgetPassed &&
    totals.bruteForcePairs >= config.minBruteForcePairs &&
    totals.directCandidates >= config.minIndexedCandidates &&
    totals.packetCount <= config.maxPacketCount &&
    Math.max(...config.scenarios.map((scenario) => scenario.pathCount)) <= config.maxPathCount &&
    Math.max(...config.scenarios.map((scenario) => scenario.timeSlabCount)) <= config.maxTimeSlabCount;

  return {
    envelopeId: config.envelopeId,
    status: envelopePassed ? "pass" : "fail",
    passed: envelopePassed,
    p95BudgetMs: config.p95BudgetMs,
    p95Ms,
    timingsMs: timings,
    iterations: iterationsDetail,
    totals,
    packetGate: {
      passed: packetGatePassed,
      packetExecutionPath: warmup.packetExecutionPath,
      directExecutionPath: "native_c_abi_indexed_v0",
      equalityMismatches: preparedScenarios
        .filter((prepared) => !prepared.equality.matched)
        .map((prepared) => ({ scenario: prepared.scenario.name, ...prepared.equality })),
    },
    budgetGate: {
      passed: budgetPassed,
      p95Ms,
      p95BudgetMs: config.p95BudgetMs,
    },
    scenarios: preparedScenarios.map((prepared) => ({
      name: prepared.scenario.name,
      pathCount: prepared.scenario.pathCount,
      timeSlabCount: prepared.scenario.timeSlabCount,
      streamId: prepared.streamId,
      rowCount: prepared.rowCount,
      rowsPerChunk: prepared.rowsPerChunk,
      packetCount: prepared.packetPlan.packetCount,
      bruteForceReplayPairCount: prepared.bruteForceReplayPairCount,
      directCandidateCount: prepared.direct.candidateCount,
      directPairCount: prepared.direct.pairCount,
      packetCandidateCount: prepared.lastPacketResult?.candidateCount ?? null,
      packetPairCount: prepared.lastPacketResult?.pairCount ?? null,
      directTruncated: prepared.direct.truncated,
      packetTruncated: prepared.lastPacketResult?.truncated ?? null,
      equality: prepared.equality,
      packetResultRefs: prepared.packetResultRefs,
    })),
  };
}

async function prepareScenario(client, config, scenario, scenarioIndex) {
  const runId = `${ARTIFACT_ID}:${config.envelopeId}:${scenario.name}`;
  const streamId = `${config.envelopeId}-${scenarioIndex}`;
  const { sourceRows, receiverRows } = makeEmissionV0Rows(scenario, 8000 + scenarioIndex * 100000, 9000 + scenarioIndex * 100000);
  const pathRows = [...sourceRows, ...receiverRows];
  const rowsPerChunk = Math.max(1, Math.floor(scenario.pathCount / 2));
  const bruteForceReplayPairCount = countBruteForceReplayPairs(sourceRows, receiverRows, scenario.allowSameSource);
  await client.createPathHistoryStreamF64({
    runId,
    streamId,
    pathRows,
    rowsPerChunk,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: pathRows.length * 128,
    },
  });

  const sourceChunkIndices = [0, 1];
  const receiverChunkIndices = [2, 3];
  const commonRequest = {
    streamId,
    signalSpeed: 1,
    tolerance: 1e-9,
    maxCandidates: scenario.maxCandidates,
    sourceChunkIndices,
    receiverChunkIndices,
    allowSamePath: scenario.allowSameSource,
    workerCount: 2,
    indexOptions: {
      strategy: "emission_shell_broad_phase_v0",
      timeSlabCount: scenario.timeSlabCount,
      spatialCellSize: scenario.spatialCellSize,
    },
    timeRange: { start: 0, end: 1 },
  };
  const direct = await client.queryEmissionShellCandidatesF64(commonRequest);
  if (direct.scanSummary.executionPath !== "native_c_abi_indexed_v0") {
    throw new Error(`${scenario.name} direct query did not use native_c_abi_indexed_v0`);
  }
  const packetPlan = await client.planPathHistoryWorkPackets({
    runId,
    modelId: "emission-shell-broad-phase-v0-default-promotion",
    precisionPath: "scaled_f64_strict",
    streamId,
    sourceChunkIndices,
    receiverChunkIndices,
    maxPacketCount: 4,
    includeSameChunk: false,
    expectedOutputs: ["emission_shell_candidate.v1", "emission_shell_narrow_phase.v1"],
    timeRange: { start: 0, end: 1 },
  });
  if (packetPlan.packetCount !== 4 || packetPlan.truncated) {
    throw new Error(`${scenario.name} expected four non-truncated packets, got ${packetPlan.packetCount}`);
  }
  const prepared = {
    scenario,
    streamId,
    rowCount: pathRows.length,
    rowsPerChunk,
    bruteForceReplayPairCount,
    direct,
    packetPlan,
    commonRequest,
    equality: { matched: false, reason: "not_run" },
    packetResultRefs: { matched: false, reason: "not_run" },
    lastPacketResult: null,
  };
  return prepared;
}

function countBruteForceReplayPairs(sourceRows, receiverRows, allowSamePath) {
  const total = sourceRows.length * receiverRows.length;
  if (allowSamePath) {
    return total;
  }
  const receiverPathKeyCounts = new Map();
  for (const receiver of receiverRows) {
    receiverPathKeyCounts.set(receiver.pathKey, (receiverPathKeyCounts.get(receiver.pathKey) ?? 0) + 1);
  }
  let samePathPairs = 0;
  for (const source of sourceRows) {
    samePathPairs += receiverPathKeyCounts.get(source.pathKey) ?? 0;
  }
  return total - samePathPairs;
}

async function runEnvelopePacketBatch(client, preparedScenarios) {
  let candidateCount = 0;
  let packetCount = 0;
  let pairCount = 0;
  let packetExecutionPath = "packet_merge";
  for (const prepared of preparedScenarios) {
    const response = await client.queryEmissionShellCandidatePacketsF64({
      ...prepared.commonRequest,
      maxCandidatesPerPacket: prepared.commonRequest.maxCandidates,
      packets: [...prepared.packetPlan.packets].reverse(),
    });
    prepared.lastPacketResult = response;
    prepared.equality = compareCandidateSets(prepared.direct.candidates, response.candidates);
    prepared.packetResultRefs = comparePacketResultRefs(response, prepared.packetPlan.packets);
    candidateCount += response.candidateCount;
    pairCount += response.pairCount;
    packetCount += response.packetResults.length;
    packetExecutionPath = response.scanSummary.executionPath;
  }
  return {
    candidateCount,
    pairCount,
    packetCount,
    packetExecutionPath,
  };
}

function assertEnvelopeEquality(preparedScenarios, result) {
  if (result.packetExecutionPath !== "packet_merge") {
    throw new Error(`packet batch did not merge through packet_merge: ${result.packetExecutionPath}`);
  }
  for (const prepared of preparedScenarios) {
    if (!prepared.equality.matched) {
      throw new Error(`${prepared.scenario.name} packet/direct candidate mismatch: ${JSON.stringify(prepared.equality)}`);
    }
    if (prepared.lastPacketResult?.packetResults?.length !== prepared.packetPlan.packetCount) {
      throw new Error(`${prepared.scenario.name} packet result count mismatch`);
    }
    if (prepared.direct.truncated || prepared.lastPacketResult?.truncated) {
      throw new Error(`${prepared.scenario.name} truncated before completing the declared stress envelope`);
    }
    if (!prepared.packetResultRefs.matched) {
      throw new Error(
        `${prepared.scenario.name} packet result ref mismatch: ${JSON.stringify(prepared.packetResultRefs)}`
      );
    }
  }
}

function makeEmissionV0Rows(scenario, sourcePathKeyBase, receiverPathKeyBase) {
  const sourceRows = [];
  const receiverRows = [];
  for (let index = 0; index < scenario.pathCount; index += 1) {
    sourceRows.push(makeEmissionV0Row(scenario, index, sourcePathKeyBase, receiverPathKeyBase, false));
    receiverRows.push(makeEmissionV0Row(scenario, index, sourcePathKeyBase, receiverPathKeyBase, true));
  }
  return { sourceRows, receiverRows };
}

function makeEmissionV0Row(scenario, index, sourcePathKeyBase, receiverPathKeyBase, receiver) {
  const totalTime = 1.0;
  const timeStep = totalTime / scenario.timeSlabCount;
  const timeSlab = index % scenario.timeSlabCount;
  const receiverLag = receiver ? timeStep * 0.2 : 0.0;
  const startTime = timeSlab * timeStep + receiverLag;
  const duration = timeStep * 0.7;
  const gridWidth = scenario.clustered ? 16 : 32;
  const clusterShift = scenario.clustered ? ((Math.floor(index / 64) % 4) * 0.65) : 0.0;
  const x = (index % gridWidth) * scenario.densitySpacing + clusterShift + (receiver ? scenario.receiverOffset : 0.0);
  const y =
    (Math.floor(index / gridWidth) % gridWidth) * scenario.densitySpacing +
    clusterShift * 0.5 +
    (receiver ? scenario.receiverOffset * 0.5 : 0.0);
  const speedRatios = [0.25, 0.98, 1.0, 1.25, 0.75];
  const speedRatio = speedRatios[index % speedRatios.length];
  const sameSourceSeed = receiver && scenario.allowSameSource && index % 13 === 0;
  const pathKey = sameSourceSeed
    ? sourcePathKeyBase + index
    : (receiver ? receiverPathKeyBase : sourcePathKeyBase) + index;
  const stateFlags = (index % 5 === 2 ? 1 : 0) | (sameSourceSeed ? 2 : 0);
  return {
    pathKey,
    segmentIndex: index,
    startTime,
    endTime: startTime + duration,
    start: { x, y, z: 0 },
    velocity: { x: speedRatio, y: 0, z: 0 },
    errorBound: 1e-9,
    stateFlags,
  };
}

function compareCandidateSets(directCandidates, packetCandidates) {
  const direct = candidateMultiset(directCandidates);
  const packet = candidateMultiset(packetCandidates);
  const missing = [];
  const extra = [];
  for (const [key, count] of direct.entries()) {
    const packetCount = packet.get(key) ?? 0;
    if (packetCount !== count) {
      missing.push({ key, expected: count, actual: packetCount });
    }
  }
  for (const [key, count] of packet.entries()) {
    const directCount = direct.get(key) ?? 0;
    if (directCount !== count) {
      extra.push({ key, expected: directCount, actual: count });
    }
  }
  return {
    matched: missing.length === 0 && extra.length === 0,
    orderedKeysMatched: orderedCandidateKeys(directCandidates).join("|") === orderedCandidateKeys(packetCandidates).join("|"),
    directCount: directCandidates.length,
    packetCount: packetCandidates.length,
    missingCount: missing.length,
    extraCount: extra.length,
    firstMissing: missing[0] ?? null,
    firstExtra: extra[0] ?? null,
  };
}

function comparePacketResultRefs(response, packets) {
  const expectedPackets = [...packets].sort(comparePacketHeaders);
  const actualPacketIds = response.packetResults.map((result) => result.packetId);
  const expectedPacketIds = expectedPackets.map((packet) => packet.packetId);
  let candidateRowOffset = 0;
  let narrowPhaseRowOffset = 0;
  const mismatches = [];
  for (let index = 0; index < expectedPackets.length; index += 1) {
    const packet = expectedPackets[index];
    const result = response.packetResults[index];
    if (!result) {
      mismatches.push({ index, reason: "missing_result", expectedPacketId: packet.packetId });
      continue;
    }
    if (
      result.packetId !== packet.packetId ||
      result.mergeOrder !== packet.mergeOrder ||
      result.mergeKey !== packet.mergeKey
    ) {
      mismatches.push({
        index,
        reason: "metadata_mismatch",
        expected: { packetId: packet.packetId, mergeOrder: packet.mergeOrder, mergeKey: packet.mergeKey },
        actual: { packetId: result.packetId, mergeOrder: result.mergeOrder, mergeKey: result.mergeKey },
      });
    }
    const candidateOutput = result.outputs.find((output) => output.layout === "emission_shell_candidate.v1");
    const narrowPhaseOutput = result.outputs.find((output) => output.layout === "emission_shell_narrow_phase.v1");
    if (!candidateOutput || !narrowPhaseOutput) {
      mismatches.push({ index, reason: "missing_output_ref", packetId: result.packetId });
      continue;
    }
    if (candidateOutput.rowOffset !== candidateRowOffset) {
      mismatches.push({
        index,
        reason: "candidate_row_offset_mismatch",
        expected: candidateRowOffset,
        actual: candidateOutput.rowOffset,
      });
    }
    if (narrowPhaseOutput.rowOffset !== narrowPhaseRowOffset) {
      mismatches.push({
        index,
        reason: "narrow_phase_row_offset_mismatch",
        expected: narrowPhaseRowOffset,
        actual: narrowPhaseOutput.rowOffset,
      });
    }
    candidateRowOffset += candidateOutput.rowCount;
    narrowPhaseRowOffset += narrowPhaseOutput.rowCount;
  }
  const candidateBuffer = response.buffers.find((buffer) => buffer.layout === "emission_shell_candidate.v1");
  const narrowPhaseBuffer = response.buffers.find((buffer) => buffer.layout === "emission_shell_narrow_phase.v1");
  if (!candidateBuffer || candidateRowOffset !== candidateBuffer.rowCount) {
    mismatches.push({
      reason: "candidate_row_span_mismatch",
      expected: candidateBuffer?.rowCount ?? null,
      actual: candidateRowOffset,
    });
  }
  if (!narrowPhaseBuffer || narrowPhaseRowOffset !== narrowPhaseBuffer.rowCount) {
    mismatches.push({
      reason: "narrow_phase_row_span_mismatch",
      expected: narrowPhaseBuffer?.rowCount ?? null,
      actual: narrowPhaseRowOffset,
    });
  }
  return {
    matched: mismatches.length === 0,
    submittedOutOfMergeOrder: [...packets].reverse().map((packet) => packet.packetId).join(",") !== expectedPacketIds.join(","),
    expectedPacketIds,
    actualPacketIds,
    candidateRowSpan: candidateRowOffset,
    narrowPhaseRowSpan: narrowPhaseRowOffset,
    mismatchCount: mismatches.length,
    firstMismatch: mismatches[0] ?? null,
  };
}

function comparePacketHeaders(left, right) {
  if (left.mergeKey !== right.mergeKey) {
    return left.mergeKey < right.mergeKey ? -1 : 1;
  }
  if (left.mergeOrder !== right.mergeOrder) {
    return left.mergeOrder - right.mergeOrder;
  }
  if (left.packetId === right.packetId) {
    return 0;
  }
  return left.packetId < right.packetId ? -1 : 1;
}

function orderedCandidateKeys(candidates) {
  return candidates.map((candidate) =>
    [
      candidate.sourcePathKey,
      candidate.receiverPathKey,
      candidate.sourceSegmentIndex,
      candidate.receiverSegmentIndex,
    ].join(":")
  );
}

function candidateMultiset(candidates) {
  const counts = new Map();
  for (const candidate of candidates) {
    const key = [
      candidate.sourcePathKey,
      candidate.receiverPathKey,
      candidate.sourceSegmentIndex,
      candidate.receiverSegmentIndex,
    ].join(":");
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function percentile(values, q) {
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.max(0, Math.ceil(sorted.length * q) - 1);
  return sorted[index];
}

function readNativeStressGate() {
  if (!fs.existsSync(benchmarkReportPath)) {
    return {
      passed: false,
      status: "missing_report",
      reportPath: path.relative(rootDir, benchmarkReportPath),
    };
  }
  const report = JSON.parse(fs.readFileSync(benchmarkReportPath, "utf8"));
  const benchmarkCase = report.cases?.find((item) => item.name === "emission-shell-broad-phase-v0");
  const metrics = benchmarkCase?.metrics ?? {};
  const passed =
    report.status === "ok" &&
    benchmarkCase &&
    metrics.path_count_max >= 2048 &&
    metrics.time_slab_max >= 256 &&
    metrics.brute_force_pairs >= 5_000_000 &&
    metrics.indexed_candidates >= 20_000 &&
    metrics.missing_oracle_candidates === 0 &&
    metrics.work_packet_missing_candidates === 0 &&
    metrics.work_packet_extra_candidates === 0 &&
    metrics.work_packet_merge_order_mismatches === 0;
  return {
    passed: Boolean(passed),
    status: passed ? "pass" : "fail",
    reportPath: path.relative(rootDir, benchmarkReportPath),
    metrics: {
      pathCountMax: metrics.path_count_max ?? null,
      timeSlabMax: metrics.time_slab_max ?? null,
      bruteForcePairs: metrics.brute_force_pairs ?? null,
      indexedCandidates: metrics.indexed_candidates ?? null,
      missingOracleCandidates: metrics.missing_oracle_candidates ?? null,
      workPacketMissingCandidates: metrics.work_packet_missing_candidates ?? null,
      workPacketExtraCandidates: metrics.work_packet_extra_candidates ?? null,
      workPacketMergeOrderMismatches: metrics.work_packet_merge_order_mismatches ?? null,
    },
  };
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/check-emission-shell-default-promotion-v1.mjs [--iterations N]");
  console.log("  Writes .tmp/solver-default-promotion/emission_shell_broad_phase_v0_default_promotion_v1.json.");
  console.log("  Reports envelope default eligibility without changing app bridge defaults.");
  process.exit(exitCode);
}
