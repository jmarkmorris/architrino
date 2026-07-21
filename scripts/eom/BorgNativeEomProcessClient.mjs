import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { statSync } from "node:fs";
import { mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { canonicalStringify } from "../../src/apps/borg/BorgCertifiedBudgets.js";
import {
  BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA,
  createBorgDisplayHostMemoryEnvelope,
} from "../../src/apps/borg/BorgDisplayHostMemoryEnvelope.js";
import {
  BORG_CAUSAL_HISTORY_RETENTION_POLICY,
  BORG_CAUSAL_HISTORY_RETENTION_SCHEMA,
  applyBorgCausalHistoryRetention,
} from "../../src/apps/borg/BorgCausalHistoryRetention.js";

const BORG_EOM_REQUEST_SCHEMA = "eom_borg_shadow_request/v1";
const BORG_EOM_CONTRACT_ID = "eom_evolution_contract/v1";
const BORG_EOM_MODEL_BINDING_ID = "master_eom_binding/v1";
const BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA =
  "borg-eom-http-history-prefix/v1";

export const BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION =
  "borg-native-eom-process-client.v10";
export const BORG_NATIVE_EOM_PROTOCOL_MAGIC = "EOM_BORG_NATIVE_V10";

export function createBorgNativeEomProcessClient({
  binaryPath,
  binaryArgs = [],
  timeoutMs = 120000,
  returnDisplayHistoryExtensions = false,
  workerResidentMemoryReader = readWorkerResidentBytes,
  historyTempRoot = join(
    tmpdir(),
    "architrino-eom-exact-history-borg-worker",
  ),
  historyDiskLimitBytes = 1024 ** 4,
} = {}) {
  if (typeof binaryPath !== "string" || binaryPath.length === 0) {
    throw new TypeError("Borg EOM process client requires binaryPath.");
  }
  if (!Array.isArray(binaryArgs) || binaryArgs.some(
    (argument) => typeof argument !== "string" || argument.length === 0,
  )) {
    throw new TypeError("Borg EOM process client binaryArgs must be strings.");
  }
  if (typeof workerResidentMemoryReader !== "function") {
    throw new TypeError(
      "Borg EOM process client workerResidentMemoryReader must be a function.",
    );
  }
  if (typeof historyTempRoot !== "string" || historyTempRoot.length === 0 ||
      !Number.isSafeInteger(historyDiskLimitBytes) ||
      historyDiskLimitBytes <= 0 || historyDiskLimitBytes > 1024 ** 4) {
    throw new TypeError(
      "Borg EOM exact-history storage requires a temporary root and a limit no larger than one TiB.",
    );
  }
  cleanHistoryTempRoot();
  const binaryProtocolMagic = queryBorgNativeEomProtocolMagic(binaryPath);
  if (binaryProtocolMagic !== BORG_NATIVE_EOM_PROTOCOL_MAGIC) {
    throw new Error(
      "Borg EOM protocol mismatch: " +
      `dev server encoder=${BORG_NATIVE_EOM_PROTOCOL_MAGIC}; ` +
      `binary parser=${binaryProtocolMagic}. ` +
      "the dev server is running older code than the binary it just built — " +
      "restart the dev server.",
    );
  }
  let worker = null;
  let workerGeneration = 0;
  let responseBuffer = "";
  let errorBuffer = "";
  let activeRequest = null;
  let requestQueue = Promise.resolve();
  let cancellationGeneration = 0;
  let wireHistoryCache = null;
  let wireHistoryCacheGeneration = 0;
  let wireHistoryCacheRevision = 0;
  let wireHistoryCacheToken = null;
  let workerBinarySignature = null;
  let lastMemoryEstimateBytes = 0;

  const client = Object.freeze({
    schema: BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION,
    protocolMagic: binaryProtocolMagic,
    get workerPid() {
      return worker?.pid ?? null;
    },
    get workerResidentBytes() {
      const value = Number(workerResidentMemoryReader(worker?.pid));
      return Number.isSafeInteger(value) && value >= 0 ? value : 0;
    },
    get lastMemoryEstimateBytes() {
      return lastMemoryEstimateBytes;
    },
    async evolveRetainedHistories(request) {
      const requestGeneration = cancellationGeneration;
      let requestTransport = null;
      const execute = () => {
        if (requestGeneration !== cancellationGeneration) {
          throw new Error("EOM worker request was cancelled before execution.");
        }
        requestTransport = readDisplayHistoryTransport(request, {
          cachedHistories: wireHistoryCache,
          cacheToken: wireHistoryCacheToken,
        });
        return executePersistentRequest(request);
      };
      const responsePromise = requestQueue.then(execute, execute);
      requestQueue = responsePromise.then(
        () => undefined,
        () => undefined,
      );
      const response = await responsePromise;
      const responseMemoryEstimate = Number(response?.memoryEstimateBytes);
      if (Number.isSafeInteger(responseMemoryEstimate) &&
          responseMemoryEstimate >= 0) {
        lastMemoryEstimateBytes = responseMemoryEstimate;
      }
      let merged = null;
      if (returnDisplayHistoryExtensions && request.runGrade === "display") {
        if (response?.status === "completed") {
          if (!requestTransport) {
            wireHistoryCache = historyCacheSummary(request.histories);
          }
          appendDisplayHistoryCacheSummary(
            wireHistoryCache,
            requestTransport ? request.histories : null,
            response,
          );
          applyDisplayHistoryRetirementSummary(
            wireHistoryCache,
            response.causalHistoryRetention ?? null,
          );
        }
      } else {
        const inputHistories = requestTransport
          ? appendHistorySegments(wireHistoryCache, request.histories)
          : request.histories;
        merged = mergePublishedExtensions(
          { ...request, histories: inputHistories },
          response,
        );
        if (Array.isArray(merged?.histories)) {
          merged = Object.freeze({
            ...merged,
            histories: applyBorgCausalHistoryRetention(
              merged.histories,
              response.causalHistoryRetention ?? null,
            ),
          });
        }
        if (merged?.status === "completed" && Array.isArray(merged.histories)) {
          wireHistoryCache = mutableHistoryCache(merged.histories);
        }
      }
      if (response?.status === "completed" && Array.isArray(wireHistoryCache)) {
        wireHistoryCacheGeneration = workerGeneration;
        wireHistoryCacheRevision += 1;
        wireHistoryCacheToken = [
          "borg-eom-history-cache",
          workerGeneration,
          wireHistoryCacheRevision,
        ].join(":");
      } else {
        // The server discards its incremental snapshot/history cache after a
        // halted request. Mirror that state so a later request cannot send a
        // suffix against a prefix the worker no longer owns.
        wireHistoryCache = null;
        wireHistoryCacheGeneration = 0;
        wireHistoryCacheToken = null;
      }
      if (returnDisplayHistoryExtensions && request.runGrade === "display") {
        return Object.freeze({
          ...response,
          historyTransport: wireHistoryCacheToken == null
            ? null
            : Object.freeze({
                schema: BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA,
                cacheToken: wireHistoryCacheToken,
                segmentCounts: Object.freeze(wireHistoryCache.map(
                  historySegmentCount,
                )),
              }),
        });
      }
      return merged;
    },
    async dispose() {
      cancellationGeneration += 1;
      terminateWorker(new Error("EOM worker was cancelled."));
    },
    async releaseRun() {
      cancellationGeneration += 1;
      terminateWorker(new Error("EOM run completed."));
    },
  });
  return client;

  function ensureWorker() {
    if (worker && worker.exitCode == null && !worker.killed) {
      const currentBinarySignature = readBinarySignature(binaryPath);
      if (currentBinarySignature === workerBinarySignature) {
        return;
      }
      terminateWorker(
        new Error("EOM worker executable changed; restarting current binary."),
      );
    }
    const generation = ++workerGeneration;
    wireHistoryCache = null;
    wireHistoryCacheGeneration = 0;
    wireHistoryCacheToken = null;
    lastMemoryEstimateBytes = 0;
    responseBuffer = "";
    errorBuffer = "";
    workerBinarySignature = readBinarySignature(binaryPath);
    cleanHistoryTempRoot();
    mkdirSync(historyTempRoot, { recursive: true });
    const effectiveBinaryArgs = [
      ...binaryArgs.filter((argument) =>
        !argument.startsWith("--history-temp-root=") &&
        !argument.startsWith("--history-disk-limit-bytes=")),
      `--history-temp-root=${historyTempRoot}`,
      `--history-disk-limit-bytes=${historyDiskLimitBytes}`,
    ];
    worker = spawn(binaryPath, ["borg-shadow-server-v0", ...effectiveBinaryArgs], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    worker.stdout.setEncoding("utf8");
    worker.stderr.setEncoding("utf8");
    // Cancelling a browser request can close the worker's stdin while a queued
    // write is settling. Consume that stream error and route it through the
    // same generation guard as process errors instead of letting EPIPE crash
    // the local development server.
    worker.stdin.on("error", (error) => failWorkerGeneration(generation, error));
    worker.stdout.on("data", (chunk) => receiveWorkerOutput(generation, chunk));
    worker.stderr.on("data", (chunk) => {
      if (generation !== workerGeneration) {
        return;
      }
      errorBuffer = `${errorBuffer}${chunk}`.slice(-65536);
    });
    worker.on("error", (error) => failWorkerGeneration(generation, error));
    worker.on("close", (code, signal) => {
      if (generation !== workerGeneration) {
        return;
      }
      const diagnostic = errorBuffer.trim() || "no diagnostic";
      failWorkerGeneration(
        generation,
        new Error(`EOM worker exited (${signal ?? code}): ${diagnostic}`),
      );
    });
  }

  function executePersistentRequest(request) {
    ensureWorker();
    const protocol = encodeNativeRequest(request, {
      cachedHistories: wireHistoryCacheGeneration === workerGeneration
        ? wireHistoryCache
        : null,
    });
    return new Promise((resolve, reject) => {
      if (activeRequest) {
        reject(new Error("EOM worker already has an active request."));
        return;
      }
      const timeout = setTimeout(() => {
        const error = new Error(`EOM process timed out after ${timeoutMs} ms.`);
        error.code = request.runGrade === "certified"
          ? "certified_execution_timeout"
          : "display_execution_timeout";
        error.timeoutMs = timeoutMs;
        terminateWorker(error);
      }, timeoutMs);
      activeRequest = { resolve, reject, timeout };
      worker.stdin.write(protocol, (error) => {
        if (error && activeRequest) {
          terminateWorker(error);
        }
      });
    });
  }

  function receiveWorkerOutput(generation, chunk) {
    if (generation !== workerGeneration) {
      return;
    }
    responseBuffer += chunk;
    const newline = responseBuffer.indexOf("\n");
    if (newline < 0 || !activeRequest) {
      return;
    }
    const line = responseBuffer.slice(0, newline);
    responseBuffer = responseBuffer.slice(newline + 1);
    const pending = activeRequest;
    activeRequest = null;
    clearTimeout(pending.timeout);
    try {
      pending.resolve(JSON.parse(line));
    } catch (error) {
      terminateWorker(
        new Error(`EOM process emitted invalid JSON: ${error.message}`),
      );
      pending.reject(error);
    }
  }

  function failWorkerGeneration(generation, error) {
    if (generation !== workerGeneration) {
      return;
    }
    const pending = activeRequest;
    activeRequest = null;
    worker = null;
    workerBinarySignature = null;
    wireHistoryCache = null;
    wireHistoryCacheGeneration = 0;
    wireHistoryCacheToken = null;
    lastMemoryEstimateBytes = 0;
    cleanHistoryTempRoot();
    if (pending) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
  }

  function terminateWorker(error) {
    const pending = activeRequest;
    activeRequest = null;
    const current = worker;
    worker = null;
    workerBinarySignature = null;
    wireHistoryCache = null;
    wireHistoryCacheGeneration = 0;
    wireHistoryCacheToken = null;
    lastMemoryEstimateBytes = 0;
    ++workerGeneration;
    responseBuffer = "";
    errorBuffer = "";
    if (pending) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
    if (current && current.exitCode == null && !current.killed) {
      current.kill("SIGKILL");
    }
    cleanHistoryTempRoot();
  }

  function cleanHistoryTempRoot() {
    rmSync(historyTempRoot, { recursive: true, force: true });
  }
}

function readBinarySignature(binaryPath) {
  const stats = statSync(binaryPath);
  return `${stats.dev}:${stats.ino}:${stats.size}:${stats.mtimeMs}`;
}

function readWorkerResidentBytes(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) {
    return 0;
  }
  const sample = spawnSync("ps", ["-o", "rss=", "-p", String(pid)], {
    encoding: "utf8",
  });
  if (sample.error || sample.status !== 0) {
    return 0;
  }
  const residentKibibytes = Number.parseInt(String(sample.stdout).trim(), 10);
  return Number.isSafeInteger(residentKibibytes) && residentKibibytes >= 0
    ? residentKibibytes * 1024
    : 0;
}

export function encodeNativeRequest(request, { cachedHistories = null } = {}) {
  if (request?.schema !== BORG_EOM_REQUEST_SCHEMA ||
      request?.contractId !== BORG_EOM_CONTRACT_ID ||
      !Array.isArray(request.contractAmendmentIds) ||
      request.contractAmendmentIds.length !== 0 ||
      request.modelBindingId !== BORG_EOM_MODEL_BINDING_ID) {
    throw new TypeError(
      "EOM process request does not match the live request, evolution, and model-binding contracts.",
    );
  }
  if (!Array.isArray(request.histories) || request.histories.length === 0) {
    throw new TypeError("EOM process request lacks retained histories.");
  }
  if (!["certified", "display"].includes(request.runGrade)) {
    throw new TypeError("EOM process request requires runGrade certified or display.");
  }
  const controls = request.numericalControls ?? {};
  const model = request.modelControls ?? {};
  const certifiedBudget = request.certifiedBudget;
  const allocations = certifiedBudget?.allocations;
  if (controls.maximumStep == null ||
      controls.farFieldEnclosureFraction == null ||
      model.coreScale == null ||
      allocations?.schema == null ||
      certifiedBudget?.presetId == null ||
      certifiedBudget?.allocationHash == null ||
      certifiedBudget?.allocationCanonicalJson == null ||
      request.resourceEnvelope?.memoryBudgetBytes == null ||
      typeof controls.useAdaptiveStepGrowth !== "boolean") {
    throw new TypeError(
      "EOM process request must explicitly supply maximumStep, " +
      "useAdaptiveStepGrowth, farFieldEnclosureFraction, coreScale, " +
      "certifiedBudget, and memoryBudgetBytes.",
    );
  }
  assertCertifiedBudgetRequestMatchesAllocations(
    request,
    controls,
    model,
    allocations,
  );
  const canonicalAllocations = canonicalStringify(allocations);
  const allocationHash = createHash("sha256")
    .update(canonicalAllocations)
    .digest("hex");
  if (certifiedBudget.allocationCanonicalJson !== canonicalAllocations ||
      certifiedBudget.allocationHash !== allocationHash) {
    throw new RangeError(
      "EOM process request certified-budget hash does not match its canonical allocations.",
    );
  }
  const lines = [
    BORG_NATIVE_EOM_PROTOCOL_MAGIC,
    tabRecord([
      "RUN",
      request.runId,
      request.absoluteTimeInterval.start,
      request.absoluteTimeInterval.end,
      controls.initialStep,
      controls.minimumStep,
      controls.maximumStep,
      controls.useAdaptiveStepGrowth ? "1" : "0",
      model.fieldSpeed,
      model.coupling,
      model.coreScale,
      controls.rootTolerance,
      controls.accelerationTolerance,
      controls.farFieldEnclosureFraction,
      controls.positionTolerance,
      controls.velocityTolerance,
      controls.correctionTolerance,
      controls.threadCount,
      request.resourceEnvelope.memoryBudgetBytes,
      allocations.schema,
      certifiedBudget.presetId,
      certifiedBudget.allocationHash,
      certifiedBudget.allocationCanonicalJson,
      allocations.topLevel.positionIncrement,
      allocations.topLevel.velocityIncrement,
      allocations.ordinary.transmitterFactorFloor,
      allocations.finiteWidth.causalWidth,
      allocations.finiteWidth.receiverImpulseTotal,
      allocations.finiteWidth.receiverPositionMomentTotal,
      allocations.finiteWidth.independentOverlap,
      allocations.finiteWidth.rowFractions.quadrature,
      allocations.finiteWidth.rowFractions.causalWidthRegulator,
      allocations.finiteWidth.rowFractions.coreRegulator,
      allocations.finiteWidth.rowFractions.finiteWidthStateNumerical,
      allocations.finiteWidth.rowFractions.amendment1RegulatorMatching,
      allocations.finiteWidth.regulatorRefinementRatio,
      allocations.finiteWidth.regulatorLevels,
      allocations.precision.difficultRowInitialBits,
      allocations.precision.difficultRowMaximumBits,
      allocations.resources.rootMaximumDepth,
      allocations.resources.rootMaximumCells,
      allocations.resources.quadratureMaximumDepth,
      allocations.resources.quadratureMaximumCells,
      allocations.resources.eventMaximumDepth,
      allocations.resources.eventMaximumCells,
      allocations.resources.correctionIterations,
      allocations.resources.maximumStepAttempts,
      allocations.resources.maximumRejectedSteps,
      allocations.ordinary.chartPolicy,
      allocations.precision.deterministicReduction,
      allocations.precision.roundingMode,
      allocations.finiteWidth.receiverAllocationRule,
      allocations.ordinary.quadratureTolerance,
      request.runGrade,
      request.histories.length,
      request.resourceEnvelope.causalHistoryRetention?.policy ?? "none",
      ...(request.resourceEnvelope.causalHistoryRetention?.center ?? ["0", "0", "0"]),
      request.resourceEnvelope.causalHistoryRetention?.radius ?? "0",
    ]),
  ];
  const cachedByPath = new Map(
    Array.isArray(cachedHistories)
      ? cachedHistories.map((history) => [String(history.pathId), history])
      : [],
  );
  const transport = request.historyTransport;
  if (transport != null &&
      (transport.schema !== BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA ||
       !Array.isArray(transport.cachedPrefixCounts) ||
       transport.cachedPrefixCounts.length !== request.histories.length)) {
    throw new TypeError("EOM history-prefix transport is malformed.");
  }
  request.histories.forEach((history, pathIndex) => {
    if (!Array.isArray(history.segments) ||
        (history.segments.length === 0 && transport == null)) {
      throw new TypeError(`EOM path ${history.pathId} lacks retained segments.`);
    }
    const cached = cachedByPath.get(String(history.pathId));
    let cachedPrefixCount = 0;
    if (transport != null) {
      cachedPrefixCount = Number(transport.cachedPrefixCounts[pathIndex]);
      if (!Number.isSafeInteger(cachedPrefixCount) || cachedPrefixCount <= 0 ||
          !cached || historySegmentCount(cached) !== cachedPrefixCount ||
          String(cached.charge) !== String(history.charge)) {
        throw displayHistoryCacheMiss();
      }
    } else if (cached && historiesShareExactPrefix(cached, history)) {
      cachedPrefixCount = cached.segments.length;
    }
    const appendedSegments = transport == null
      ? history.segments.slice(cachedPrefixCount)
      : history.segments;
    lines.push(tabRecord([
      "PATH",
      history.pathId,
      history.charge,
      history.stateFlags ?? 0,
      cachedPrefixCount,
      appendedSegments.length,
    ]));
    appendedSegments.forEach((segment) => {
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3) {
        throw new TypeError(`EOM path ${history.pathId} has invalid cubic coefficients.`);
      }
      lines.push(tabRecord([
        "SEG",
        segment.startTime,
        segment.endTime,
        ...segment.coefficients.flat(),
        ...requiredAxisErrors(segment.positionErrors, "positionErrors"),
        ...requiredAxisErrors(segment.velocityErrors, "velocityErrors"),
      ]));
    });
  });
  lines.push("END");
  return `${lines.join("\n")}\n`;
}

function requiredAxisErrors(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new TypeError(`EOM segment ${label} must contain three axis tokens.`);
  }
  return value.map((token) => String(token));
}

function assertCertifiedBudgetRequestMatchesAllocations(
  request,
  controls,
  model,
  allocations,
) {
  const hostEnvelope = request.hostMemoryEnvelope;
  const causalRetention = request.resourceEnvelope?.causalHistoryRetention;
  if (causalRetention != null &&
      (request.runGrade !== "display" ||
       causalRetention.schema !== BORG_CAUSAL_HISTORY_RETENTION_SCHEMA ||
       causalRetention.policy !== BORG_CAUSAL_HISTORY_RETENTION_POLICY ||
       causalRetention.receiverDomain !==
         "all-requested-receiver-events-inside-envelope" ||
       causalRetention.outsideReceiverPolicy !==
         "preserve-exact-history-no-retirement" ||
       !Array.isArray(causalRetention.center) ||
       causalRetention.center.length !== 3 ||
       causalRetention.center.some((value) => !Number.isFinite(Number(value))) ||
       !(Number(causalRetention.radius) > 0))) {
    throw new RangeError(
      "EOM causal-history retention requires a valid Display receiver envelope.",
    );
  }
  const usesHostDisplayEnvelope = request.runGrade === "display" &&
    hostEnvelope?.schema === BORG_DISPLAY_HOST_MEMORY_ENVELOPE_SCHEMA;
  if (hostEnvelope != null && !usesHostDisplayEnvelope) {
    throw new RangeError(
      "EOM host-memory envelope is permitted only for Display grade.",
    );
  }
  if (usesHostDisplayEnvelope) {
    const expectedHostEnvelope = createBorgDisplayHostMemoryEnvelope({
      hostTotalMemoryBytes: hostEnvelope.hostTotalMemoryBytes,
      hostAvailableMemoryBytes: hostEnvelope.hostAvailableMemoryBytes,
      workerResidentBytes: hostEnvelope.workerResidentBytes,
      previousMemoryEstimateBytes: hostEnvelope.previousMemoryEstimateBytes,
    });
    if (hostEnvelope.admitted !== true ||
        canonicalStringify(hostEnvelope) !==
          canonicalStringify(expectedHostEnvelope) ||
        Number(request.resourceEnvelope.memoryBudgetBytes) !==
          hostEnvelope.requestMemoryBudgetBytes) {
      throw new RangeError(
        "EOM Display host-memory envelope does not match its request budget.",
      );
    }
  }
  const expected = [
    [controls.minimumStep, allocations.controller.minimumStep, "minimumStep"],
    [controls.maximumStep, allocations.controller.maximumStep, "maximumStep"],
    [controls.useAdaptiveStepGrowth, allocations.controller.adaptiveGrowth, "adaptiveGrowth"],
    [controls.rootTolerance, allocations.ordinary.rootTimeEnclosure, "rootTolerance"],
    [controls.accelerationTolerance, allocations.ordinary.accelerationEnclosure, "accelerationTolerance"],
    [controls.farFieldEnclosureFraction, allocations.ordinary.farFieldEnclosureFraction, "farFieldEnclosureFraction"],
    [controls.positionTolerance, allocations.ordinary.acceptedStepPosition, "positionTolerance"],
    [controls.velocityTolerance, allocations.ordinary.acceptedStepVelocity, "velocityTolerance"],
    [controls.correctionTolerance, allocations.ordinary.correctionAccelerationResidual, "correctionTolerance"],
    [controls.threadCount, allocations.resources.workerThreads, "threadCount"],
    [model.coreScale, allocations.finiteWidth.coreScale, "coreScale"],
  ];
  if (!usesHostDisplayEnvelope) {
    expected.push([
      request.resourceEnvelope.memoryBudgetBytes,
      allocations.resources.requestMemoryBytes,
      "memoryBudgetBytes",
    ]);
  }
  for (const [actual, allocation, label] of expected) {
    const matches = typeof allocation === "boolean"
      ? actual === allocation
      : Number(actual) === Number(allocation);
    if (!matches) {
      throw new RangeError(
        `EOM process request ${label} does not match its certified budget allocation.`,
      );
    }
  }
}

function historiesShareExactPrefix(cached, current) {
  if (!Array.isArray(cached?.segments) ||
      cached.segments.length > current.segments.length ||
      String(cached.pathId) !== String(current.pathId) ||
      String(cached.charge) !== String(current.charge)) {
    return false;
  }
  return cached.segments.every((segment, index) =>
    JSON.stringify(segment) === JSON.stringify(current.segments[index]));
}

function readDisplayHistoryTransport(
  request,
  { cachedHistories, cacheToken },
) {
  const transport = request?.historyTransport;
  if (transport == null) {
    return null;
  }
  if (request.runGrade !== "display" ||
      transport.schema !== BORG_EOM_HTTP_HISTORY_TRANSPORT_SCHEMA ||
      typeof transport.cacheToken !== "string" ||
      transport.cacheToken !== cacheToken ||
      !Array.isArray(cachedHistories) ||
      !Array.isArray(transport.cachedPrefixCounts) ||
      transport.cachedPrefixCounts.length !== request.histories?.length ||
      cachedHistories.length !== request.histories?.length) {
    throw displayHistoryCacheMiss();
  }
  request.histories.forEach((history, index) => {
    const cached = cachedHistories[index];
    if (String(history.pathId) !== String(cached?.pathId) ||
        String(history.charge) !== String(cached?.charge) ||
        Number(transport.cachedPrefixCounts[index]) !== historySegmentCount(cached)) {
      throw displayHistoryCacheMiss();
    }
  });
  return transport;
}

function displayHistoryCacheMiss() {
  const error = new Error(
    "Display history prefix does not match the live EOM worker cache.",
  );
  error.code = "display_history_cache_miss";
  return error;
}

function appendHistorySegments(cachedHistories, suffixHistories) {
  return cachedHistories.map((cached, index) => {
    const suffix = suffixHistories[index];
    if (String(cached.pathId) !== String(suffix?.pathId) ||
        !Array.isArray(suffix?.segments)) {
      throw displayHistoryCacheMiss();
    }
    return {
      ...cached,
      ...suffix,
      segments: [...cached.segments, ...suffix.segments],
    };
  });
}

function mutableHistoryCache(histories) {
  return histories.map((history) => ({
    ...history,
    segments: [...history.segments],
  }));
}

function historySegmentCount(history) {
  const summarized = Number(history?.segmentCount);
  if (Number.isSafeInteger(summarized) && summarized >= 0) {
    return summarized;
  }
  return Array.isArray(history?.segments) ? history.segments.length : -1;
}

function historyCacheSummary(histories) {
  return histories.map((history) => ({
    pathId: history.pathId,
    charge: history.charge,
    stateFlags: history.stateFlags ?? 0,
    segmentCount: history.segments.length,
  }));
}

function appendDisplayHistoryCacheSummary(cache, suffixHistories, response) {
  if (!Array.isArray(cache) ||
      !Array.isArray(response?.publishedExtensions) ||
      response.publishedExtensions.length !== cache.length ||
      (suffixHistories != null && suffixHistories.length !== cache.length)) {
    throw new Error("EOM response omitted the Display history extension domain.");
  }
  cache.forEach((history, index) => {
    const suffix = suffixHistories?.[index];
    const extension = response.publishedExtensions[index];
    if (String(extension?.pathId) !== String(history.pathId) ||
        (suffix != null && String(suffix.pathId) !== String(history.pathId)) ||
        !Array.isArray(extension?.segments) ||
        (suffix != null && !Array.isArray(suffix.segments))) {
      throw new Error("EOM response reordered or omitted a Display path extension.");
    }
    history.segmentCount +=
      (suffix?.segments.length ?? 0) + extension.segments.length;
  });
}

function applyDisplayHistoryRetirementSummary(cache, certificate) {
  if (certificate == null) return;
  if (!Array.isArray(certificate.paths) ||
      certificate.paths.length !== cache.length) {
    throw new Error("EOM causal-history retirement omitted a cached path.");
  }
  cache.forEach((history, index) => {
    const row = certificate.paths[index];
    const retained = Number(row?.retainedSegmentCount);
    if (String(row?.pathId) !== String(history.pathId) ||
        !Number.isSafeInteger(retained) || retained <= 0 ||
        retained > history.segmentCount) {
      throw new Error("EOM causal-history retirement is inconsistent with the worker cache.");
    }
    history.segmentCount = retained;
  });
}

function appendDisplayHistoryCache(cache, suffixHistories, response) {
  if (!Array.isArray(cache) ||
      !Array.isArray(response?.publishedExtensions) ||
      response.publishedExtensions.length !== cache.length ||
      (suffixHistories != null && suffixHistories.length !== cache.length)) {
    throw new Error("EOM response omitted the Display history extension domain.");
  }
  cache.forEach((history, index) => {
    const suffix = suffixHistories?.[index];
    const extension = response.publishedExtensions[index];
    if (String(extension?.pathId) !== String(history.pathId) ||
        (suffix != null && String(suffix.pathId) !== String(history.pathId)) ||
        !Array.isArray(extension?.segments) ||
        (suffix != null && !Array.isArray(suffix.segments))) {
      throw new Error("EOM response reordered or omitted a Display path extension.");
    }
    if (suffix != null) {
      history.segments.push(...suffix.segments);
    }
    history.segments.push(...extension.segments);
    history.coverageEnd = response.acceptedEndTime;
  });
}

function queryBorgNativeEomProtocolMagic(binaryPath) {
  const query = spawnSync(binaryPath, ["print-protocol-version"], {
    encoding: "utf8",
  });
  if (query.error) {
    throw new Error(
      `Could not query Borg EOM binary protocol: ${query.error.message}`,
    );
  }
  if (query.status !== 0) {
    const diagnostic = String(query.stderr || query.stdout || "no diagnostic").trim();
    throw new Error(
      `Borg EOM binary protocol query failed (${query.signal ?? query.status}): ${diagnostic}`,
    );
  }
  return String(query.stdout).trim();
}

function tabRecord(fields) {
  return fields.map((field) => {
    const value = String(field);
    if (value.length === 0 || /[\t\r\n]/u.test(value)) {
      throw new TypeError("EOM protocol fields must be nonempty single-line tokens.");
    }
    return value;
  }).join("\t");
}

function mergePublishedExtensions(request, response) {
  if (!Array.isArray(response?.publishedExtensions) ||
      response.publishedExtensions.length !== request.histories.length) {
    return response;
  }
  const histories = request.histories.map((history, index) => {
    const extension = response.publishedExtensions[index];
    if (String(extension.pathId) !== String(history.pathId) ||
        !Array.isArray(extension.segments)) {
      throw new Error("EOM response reordered or omitted a path extension.");
    }
    return Object.freeze({
      ...history,
      coverageEnd: response.acceptedEndTime,
      segments: Object.freeze([...history.segments, ...extension.segments]),
    });
  });
  return Object.freeze({
    ...response,
    histories: Object.freeze(histories),
    diagnostics: Object.freeze([
      Object.freeze({
        code: response.status === "completed" ? "native_eom_completed" : response.haltCode,
        acceptedStepCount: response.acceptedStepCount,
        rejectedStepCount: response.rejectedStepCount,
        stepFailures: response.stepFailures ?? [],
      }),
    ]),
  });
}
