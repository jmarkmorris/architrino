import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";

import { canonicalStringify } from "../../src/apps/borg/BorgCertifiedBudgets.js";

const BORG_EOM_REQUEST_SCHEMA = "eom_borg_shadow_request/v1";
const BORG_EOM_CONTRACT_ID = "eom_evolution_contract/v1";
const BORG_EOM_MODEL_BINDING_ID = "master_eom_binding/v1";

export const BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION =
  "borg-native-eom-process-client.v8";
export const BORG_NATIVE_EOM_PROTOCOL_MAGIC = "EOM_BORG_NATIVE_V9";

export function createBorgNativeEomProcessClient({
  binaryPath,
  binaryArgs = [],
  timeoutMs = 120000,
} = {}) {
  if (typeof binaryPath !== "string" || binaryPath.length === 0) {
    throw new TypeError("Borg EOM process client requires binaryPath.");
  }
  if (!Array.isArray(binaryArgs) || binaryArgs.some(
    (argument) => typeof argument !== "string" || argument.length === 0,
  )) {
    throw new TypeError("Borg EOM process client binaryArgs must be strings.");
  }
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

  const client = Object.freeze({
    schema: BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION,
    protocolMagic: binaryProtocolMagic,
    get workerPid() {
      return worker?.pid ?? null;
    },
    async evolveRetainedHistories(request) {
      const requestGeneration = cancellationGeneration;
      const execute = () => {
        if (requestGeneration !== cancellationGeneration) {
          throw new Error("EOM worker request was cancelled before execution.");
        }
        return executePersistentRequest(request);
      };
      const responsePromise = requestQueue.then(execute, execute);
      requestQueue = responsePromise.catch(() => undefined);
      const response = await responsePromise;
      const merged = mergePublishedExtensions(request, response);
      if (request.runGrade === "certified" &&
          merged?.status === "completed" && Array.isArray(merged.histories)) {
        wireHistoryCache = merged.histories;
        wireHistoryCacheGeneration = workerGeneration;
      } else {
        // The server discards its incremental snapshot/history cache after a
        // halted request. Mirror that state so a later request cannot send a
        // suffix against a prefix the worker no longer owns.
        wireHistoryCache = null;
        wireHistoryCacheGeneration = 0;
      }
      return merged;
    },
    async dispose() {
      cancellationGeneration += 1;
      terminateWorker(new Error("EOM worker was cancelled."));
    },
  });
  return client;

  function ensureWorker() {
    if (worker && worker.exitCode == null && !worker.killed) {
      return;
    }
    const generation = ++workerGeneration;
    wireHistoryCache = null;
    wireHistoryCacheGeneration = 0;
    responseBuffer = "";
    errorBuffer = "";
    worker = spawn(binaryPath, ["borg-shadow-server-v0", ...binaryArgs], {
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
    wireHistoryCache = null;
    wireHistoryCacheGeneration = 0;
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
    wireHistoryCache = null;
    wireHistoryCacheGeneration = 0;
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
  }
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
    ]),
  ];
  const cachedByPath = new Map(
    Array.isArray(cachedHistories)
      ? cachedHistories.map((history) => [String(history.pathId), history])
      : [],
  );
  request.histories.forEach((history) => {
    if (!Array.isArray(history.segments) || history.segments.length === 0) {
      throw new TypeError(`EOM path ${history.pathId} lacks retained segments.`);
    }
    const cached = cachedByPath.get(String(history.pathId));
    let cachedPrefixCount = 0;
    if (cached && historiesShareExactPrefix(cached, history)) {
      cachedPrefixCount = cached.segments.length;
    }
    const appendedSegments = history.segments.slice(cachedPrefixCount);
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
    [request.resourceEnvelope.memoryBudgetBytes, allocations.resources.requestMemoryBytes, "memoryBudgetBytes"],
  ];
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
