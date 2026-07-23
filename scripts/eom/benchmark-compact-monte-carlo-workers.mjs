#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from "node:worker_threads";

import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  COMPACT_MONTE_CARLO_SAMPLER_ID,
  createCompactCoverageProtocol,
  evaluateCompactMonteCarloCase,
} from "../../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPOSITORY_ROOT = path.resolve(import.meta.dirname, "../..");
const REPORT_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-worker-benchmark.v1";
const IMPLEMENTATION_FILES = Object.freeze([
  "scripts/eom/benchmark-compact-monte-carlo-workers.mjs",
  "src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs",
  "src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs",
  "src/prescribed-path-analysis/B1StreamingReductions.mjs",
  "src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs",
  "src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs",
  "scripts/eom/generate-prescribed-braid-record.mjs",
]);

function fail(message) {
  throw new Error(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function parsePositiveInteger(value, label, fallback) {
  if (value == null) return fallback;
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0) {
    fail(`${label} must be a nonnegative safe integer.`);
  }
  return number;
}

function parseArguments(argv) {
  const values = new Map();
  let help = false;
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--help") {
      help = true;
      continue;
    }
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      fail(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const workerCounts = (values.get("--workers") ?? "1,2,4")
    .split(",")
    .map((value) => parsePositiveInteger(value, "--workers", null))
    .filter((value) => value > 0);
  if (workerCounts.length === 0) fail("--workers selected no worker counts.");
  const casesPerMember = parsePositiveInteger(
    values.get("--cases-per-member"),
    "--cases-per-member",
    3,
  );
  if (casesPerMember < 1) fail("--cases-per-member must be positive.");
  return {
    help,
    workerCounts,
    warmups: parsePositiveInteger(values.get("--warmups"), "--warmups", 1),
    repetitions: parsePositiveInteger(
      values.get("--repetitions"),
      "--repetitions",
      3,
    ),
    casesPerMember,
    seed:
      values.get("--seed") ??
      "compact-monte-carlo-worker-benchmark-20260723-v1",
    memberIds: (values.get("--members") ?? "A1.2,B1.3,C5")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    registryPath: path.resolve(
      values.get("--registry") ??
        DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
    ),
    outputPath: path.resolve(
      values.get("--output") ??
        ".local-data/braid-analysis/performance/" +
          "compact-monte-carlo-workers-1-2-4.v1.json",
    ),
  };
}

function printHelp() {
  console.log([
    "Usage:",
    "  node scripts/eom/benchmark-compact-monte-carlo-workers.mjs",
    "    [--workers 1,2,4]",
    "    [--members A1.2,B1.3,C5]",
    "    [--cases-per-member 3]",
    "    [--seed token]",
    "    [--warmups 1]",
    "    [--repetitions 3]",
    "    [--registry path]",
    "    [--output report.json]",
    "",
    "The benchmark is diagnostic prescribed-path analysis only. It retains no",
    "raw packets, performs no independent acceptance, evolves no path, invokes",
    "no EOM solver, and publishes no database.",
  ].join("\n"));
}

function implementationIdentity() {
  const files = IMPLEMENTATION_FILES.map((relativePath) => {
    const bytes = readFileSync(path.join(REPOSITORY_ROOT, relativePath));
    return {
      path: relativePath,
      sha256: sha256(bytes),
      bytes: bytes.length,
    };
  });
  const digest = createHash("sha256");
  for (const file of files) {
    digest.update(`${file.path}\0${file.sha256}\0${file.bytes}\0`);
  }
  return {
    runtime: process.version,
    platform: `${process.platform}/${process.arch}`,
    files,
    implementationHash: digest.digest("hex"),
  };
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function taskExecutionKey(seed, candidateId, sampleOrdinal) {
  return sha256(
    Buffer.from(
      `${seed}\0${candidateId}\0${sampleOrdinal}\0execution-order`,
    ),
  );
}

function compactIdentityRow(row) {
  return {
    caseId: row.caseId,
    familyId: row.familyId,
    memberId: row.memberId,
    candidateId: row.candidateId,
    sampleOrdinal: row.sampleOrdinal,
    sampledSpecHash: row.exactRerunInstruction.sampledSpecHash,
    exactSourceHash: row.exactRerunInstruction.exactSourceHash,
    protocolHash: row.exactRerunInstruction.protocolHash,
    scoreHash: row.scoreHash,
    caseHash: row.caseHash,
    statusCode: row.evaluationStatus?.code ?? row.score?.status?.code,
    reasonCode: row.evaluationStatus?.reasonCode ?? null,
    retainedCaseBytes: row.measuredCost.retainedCaseBytes,
    wallSeconds: row.measuredCost.wallSeconds,
    analyticalEvaluationSeconds:
      row.measuredCost.analyticalEvaluationSeconds,
  };
}

function outputDigest(rows) {
  const digest = createHash("sha256");
  for (const row of [...rows].sort((left, right) =>
    left.caseId.localeCompare(right.caseId))) {
    digest.update(
      `${row.caseId}\0${row.sampledSpecHash}\0${row.exactSourceHash}\0` +
      `${row.protocolHash}\0${row.scoreHash}\0${row.caseHash}\0`,
    );
  }
  return digest.digest("hex");
}

function workerRun(data) {
  const rows = [];
  for (const task of data.tasks) {
    const row = evaluateCompactMonteCarloCase({
      candidate: task.candidate,
      protocol: data.protocol,
      seed: data.seed,
      sampleOrdinal: task.sampleOrdinal,
      implementationIdentity: data.implementationIdentity,
    });
    const compact = compactIdentityRow(row);
    rows.push(compact);
    parentPort?.postMessage({
      type: "case-complete",
      workerIndex: data.workerIndex,
      caseId: compact.caseId,
      wallSeconds: compact.wallSeconds,
    });
  }
  return rows;
}

function partitionTasks(tasks, workerCount) {
  const count = Math.min(workerCount, tasks.length);
  const partitions = Array.from({ length: count }, () => []);
  tasks.forEach((task, index) => {
    partitions[index % count].push(task);
  });
  return partitions;
}

async function oneRun({
  tasks,
  protocol,
  seed,
  requestedWorkerCount,
  identity,
  label,
}) {
  const before = implementationIdentity();
  if (before.implementationHash !== identity.implementationHash) {
    fail(
      `implementation changed from ${identity.implementationHash} to ` +
        `${before.implementationHash} before ${label}.`,
    );
  }
  const partitions = partitionTasks(tasks, requestedWorkerCount);
  const cpuStarted = process.cpuUsage();
  const wallStarted = performance.now();
  let peakRssBytes = process.memoryUsage().rss;
  const rssTimer = setInterval(() => {
    peakRssBytes = Math.max(peakRssBytes, process.memoryUsage().rss);
  }, 50);
  let completedCases = 0;
  try {
    const workerRows = await Promise.all(partitions.map((partition, workerIndex) =>
      new Promise((resolve, reject) => {
        const worker = new Worker(SCRIPT_PATH, {
          workerData: {
            kind: "compact-worker",
            workerIndex,
            tasks: partition,
            protocol,
            seed,
            implementationIdentity: identity,
          },
        });
        worker.on("message", (message) => {
          if (message.type === "case-complete") {
            completedCases += 1;
            process.stderr.write(
              `[heartbeat] phase=compact-worker-run label=${label} ` +
              `workers=${partitions.length} completed=${completedCases}/` +
              `${tasks.length} case=${message.caseId} ` +
              `elapsed=${((performance.now() - wallStarted) / 1_000).toFixed(1)}s\n`,
            );
          } else if (message.type === "result") {
            resolve(message.rows);
          } else if (message.type === "error") {
            reject(new Error(message.error));
          }
        });
        worker.on("error", reject);
        worker.on("exit", (code) => {
          if (code !== 0) {
            reject(new Error(`compact worker ${workerIndex} exited ${code}.`));
          }
        });
      })));
    const wallSeconds = (performance.now() - wallStarted) / 1_000;
    const cpu = process.cpuUsage(cpuStarted);
    peakRssBytes = Math.max(peakRssBytes, process.memoryUsage().rss);
    const rows = workerRows.flat().sort((left, right) =>
      left.caseId.localeCompare(right.caseId));
    const after = implementationIdentity();
    if (after.implementationHash !== identity.implementationHash) {
      fail(
        `implementation changed from ${identity.implementationHash} to ` +
          `${after.implementationHash} during ${label}.`,
      );
    }
    return {
      label,
      requestedWorkerCount,
      workerCount: partitions.length,
      taskCountsByWorker: partitions.map((partition) => partition.length),
      wallSeconds,
      userCpuSeconds: cpu.user / 1_000_000,
      systemCpuSeconds: cpu.system / 1_000_000,
      cpuCoreEquivalent:
        (cpu.user + cpu.system) / 1_000_000 / wallSeconds,
      peakRssBytes,
      outputHash: outputDigest(rows),
      rows,
    };
  } finally {
    clearInterval(rssTimer);
  }
}

function summarize(runs, serialMedian) {
  const wall = runs.map((run) => run.wallSeconds);
  const cpu = runs.map((run) => run.userCpuSeconds + run.systemCpuSeconds);
  const cores = runs.map((run) => run.cpuCoreEquivalent);
  const rss = runs.map((run) => run.peakRssBytes);
  const wallMedian = median(wall);
  const workerCount = runs[0].workerCount;
  const speedup = serialMedian == null ? 1 : serialMedian / wallMedian;
  const amdahlSerialFraction = workerCount === 1
    ? null
    : Math.max(
      0,
      Math.min(1, (workerCount / speedup - 1) / (workerCount - 1)),
    );
  return {
    repetitions: runs.length,
    wallSeconds: {
      median: wallMedian,
      minimum: Math.min(...wall),
      maximum: Math.max(...wall),
      individual: wall,
    },
    cpuSeconds: {
      median: median(cpu),
      minimum: Math.min(...cpu),
      maximum: Math.max(...cpu),
      individual: cpu,
    },
    cpuCoreEquivalent: {
      median: median(cores),
      minimum: Math.min(...cores),
      maximum: Math.max(...cores),
      individual: cores,
    },
    peakRssBytes: {
      median: median(rss),
      minimum: Math.min(...rss),
      maximum: Math.max(...rss),
      individual: rss,
    },
    speedupVsSerialMedian: speedup,
    parallelEfficiency: speedup / workerCount,
    amdahlSerialFraction,
    casesPerSecond: runs[0].rows.length / wallMedian,
    retainedCaseBytes: {
      medianPerCase: median(runs[0].rows.map((row) => row.retainedCaseBytes)),
      total: runs[0].rows.reduce(
        (sum, row) => sum + row.retainedCaseBytes,
        0,
      ),
    },
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const loaded = loadAllCandidateCampaignRegistry(options.registryPath);
  const requestedMembers = new Set(options.memberIds);
  const selected = loaded.candidates
    .filter((candidate) =>
      requestedMembers.has(candidate.declaration.memberId))
    .map((candidate) => ({
      declaration: candidate.declaration,
      spec: candidate.spec,
    }));
  const selectedIds = new Set(
    selected.map((candidate) => candidate.declaration.memberId),
  );
  const missing = options.memberIds.filter((memberId) => !selectedIds.has(memberId));
  if (missing.length > 0) {
    fail(`unknown selected members: ${missing.join(", ")}.`);
  }
  const protocol = createCompactCoverageProtocol(loaded.protocol);
  const tasks = selected.flatMap((candidate) =>
    Array.from({ length: options.casesPerMember }, (_, sampleOrdinal) => ({
      candidate,
      sampleOrdinal,
      executionKey: taskExecutionKey(
        options.seed,
        candidate.declaration.candidateId,
        sampleOrdinal,
      ),
    }))).sort((left, right) =>
      left.executionKey.localeCompare(right.executionKey));
  const identity = implementationIdentity();
  const inputDigest = createHash("sha256");
  inputDigest.update(loaded.registryBytes);
  inputDigest.update(loaded.protocolBytes);
  inputDigest.update(options.seed);
  for (const task of tasks) {
    inputDigest.update(
      `${task.candidate.declaration.candidateId}\0${task.sampleOrdinal}\0`,
    );
    inputDigest.update(
      Buffer.from(JSON.stringify(task.candidate.spec)),
    );
  }
  const report = {
    schema: REPORT_SCHEMA,
    startedAt: new Date().toISOString(),
    sourceBoundary: {
      productionDatabaseRead: false,
      productionDatabaseWritten: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      independentAcceptancePerformed: false,
      evidenceDisposition: "diagnostic-only",
    },
    runtimeContext: {
      runtime: process.version,
      platform: process.platform,
      architecture: process.arch,
      cpuCount: (await import("node:os")).cpus().length,
    },
    fixture: {
      fixtureHash: inputDigest.digest("hex"),
      registryHash: loaded.registryHash,
      methodologySha256: loaded.methodologySha256,
      protocolHash: sha256(loaded.protocolBytes),
      compactProtocolHash: sha256(Buffer.from(JSON.stringify(protocol))),
      implementationIdentity: identity,
      samplerId: COMPACT_MONTE_CARLO_SAMPLER_ID,
      seed: options.seed,
      members: options.memberIds,
      casesPerMember: options.casesPerMember,
      caseCount: tasks.length,
      scheduling: "seeded execution order with static round-robin partitions",
    },
    warmups: options.warmups,
    repetitions: options.repetitions,
    experiments: [],
    equivalence: null,
  };
  let referenceOutputHash = null;
  let serialMedian = null;
  let completedRuns = 0;
  const totalRuns =
    options.workerCounts.length * (options.warmups + options.repetitions);
  const matrixStarted = performance.now();
  for (const requestedWorkerCount of options.workerCounts) {
    for (let index = 0; index < options.warmups; index += 1) {
      const warmup = await oneRun({
        tasks,
        protocol,
        seed: options.seed,
        requestedWorkerCount,
        identity,
        label: `workers-${requestedWorkerCount}-warmup-${index + 1}`,
      });
      if (referenceOutputHash == null) referenceOutputHash = warmup.outputHash;
      if (warmup.outputHash !== referenceOutputHash) {
        fail("compact warm-up output differs from the exact reference.");
      }
      completedRuns += 1;
      process.stderr.write(
        `[heartbeat] phase=compact-worker-matrix workers=${requestedWorkerCount} ` +
        `repetition=warmup-${index + 1} completed=${completedRuns}/` +
        `${totalRuns} elapsed=` +
        `${((performance.now() - matrixStarted) / 1_000).toFixed(1)}s ` +
        `output=${options.outputPath}\n`,
      );
    }
    const runs = [];
    for (let index = 0; index < options.repetitions; index += 1) {
      const run = await oneRun({
        tasks,
        protocol,
        seed: options.seed,
        requestedWorkerCount,
        identity,
        label: `workers-${requestedWorkerCount}-run-${index + 1}`,
      });
      if (referenceOutputHash == null) referenceOutputHash = run.outputHash;
      if (run.outputHash !== referenceOutputHash) {
        fail(
          `compact output ${run.outputHash} differs from ` +
            `${referenceOutputHash}.`,
        );
      }
      runs.push(run);
      completedRuns += 1;
      process.stderr.write(
        `[heartbeat] phase=compact-worker-matrix workers=${requestedWorkerCount} ` +
        `repetition=${index + 1} completed=${completedRuns}/${totalRuns} ` +
        `elapsed=${((performance.now() - matrixStarted) / 1_000).toFixed(1)}s ` +
        `output=${options.outputPath}\n`,
      );
    }
    const summary = summarize(runs, serialMedian);
    if (requestedWorkerCount === 1) serialMedian = summary.wallSeconds.median;
    report.experiments.push({
      requestedWorkerCount,
      workerCount: runs[0].workerCount,
      summary,
      runs,
    });
  }
  report.completedAt = new Date().toISOString();
  report.equivalence = {
    outputHash: referenceOutputHash,
    identicalAcrossWarmupsRepetitionsAndWorkerCounts: true,
    comparedFields: [
      "caseId",
      "sampledSpecHash",
      "exactSourceHash",
      "protocolHash",
      "scoreHash",
      "caseHash",
    ],
  };
  mkdirSync(path.dirname(options.outputPath), { recursive: true });
  writeFileSync(options.outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    outputPath: options.outputPath,
    fixtureHash: report.fixture.fixtureHash,
    implementationHash: identity.implementationHash,
    outputHash: referenceOutputHash,
    experiments: report.experiments.map((experiment) => ({
      workers: experiment.workerCount,
      wallSeconds: experiment.summary.wallSeconds,
      speedup: experiment.summary.speedupVsSerialMedian,
      efficiency: experiment.summary.parallelEfficiency,
      amdahlSerialFraction: experiment.summary.amdahlSerialFraction,
    })),
  }, null, 2));
}

if (!isMainThread && workerData?.kind === "compact-worker") {
  try {
    parentPort?.postMessage({
      type: "result",
      rows: workerRun(workerData),
    });
  } catch (error) {
    parentPort?.postMessage({
      type: "error",
      error: error?.stack ?? String(error),
    });
  }
} else if (isMainThread) {
  await main();
}
