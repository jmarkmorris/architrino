import { spawn, spawnSync } from "node:child_process";

export const BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION =
  "borg-native-eom-process-client.v3";
export const BORG_NATIVE_EOM_PROTOCOL_MAGIC = "EOM_BORG_NATIVE_V4";

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

  const client = Object.freeze({
    schema: BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION,
    protocolMagic: binaryProtocolMagic,
    get workerPid() {
      return worker?.pid ?? null;
    },
    async evolveRetainedHistories(request) {
      const protocol = encodeNativeRequest(request);
      const requestGeneration = cancellationGeneration;
      const execute = () => {
        if (requestGeneration !== cancellationGeneration) {
          throw new Error("EOM worker request was cancelled before execution.");
        }
        return executePersistentRequest(protocol);
      };
      const responsePromise = requestQueue.then(execute, execute);
      requestQueue = responsePromise.catch(() => undefined);
      const response = await responsePromise;
      return mergePublishedExtensions(request, response);
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

  function executePersistentRequest(protocol) {
    ensureWorker();
    return new Promise((resolve, reject) => {
      if (activeRequest) {
        reject(new Error("EOM worker already has an active request."));
        return;
      }
      const timeout = setTimeout(() => {
        terminateWorker(new Error(`EOM process timed out after ${timeoutMs} ms.`));
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

export function encodeNativeRequest(request) {
  if (request?.contractId !== "eom_evolution_contract/v0" ||
      !Array.isArray(request.histories) || request.histories.length === 0) {
    throw new TypeError("EOM process request lacks the EOM contract or histories.");
  }
  const controls = request.numericalControls ?? {};
  const model = request.modelControls ?? {};
  const provenance = request.provenance ?? {};
  if (controls.maximumStep == null ||
      controls.farFieldEnclosureFraction == null ||
      typeof controls.useAdaptiveStepGrowth !== "boolean" ||
      !["certified", "display"].includes(controls.runGrade) ||
      !Number.isInteger(provenance.causticWarningCount) ||
      provenance.causticWarningCount < 0 ||
      !Array.isArray(provenance.causticWarningPairs) ||
      (provenance.causticWarningCount === 0) !==
        (provenance.firstCausticWarningTime == null) ||
      (provenance.causticWarningCount === 0) !==
        (provenance.causticWarningPairs.length === 0)) {
    throw new TypeError(
      "EOM process request must explicitly supply maximumStep, " +
      "useAdaptiveStepGrowth, farFieldEnclosureFraction, runGrade, and " +
      "cumulative caustic warning provenance.",
    );
  }
  if (controls.runGrade === "certified" && provenance.causticWarningCount !== 0) {
    throw new TypeError("Certified EOM requests cannot carry display-grade warnings.");
  }
  const warningPairToken = provenance.causticWarningPairs.length === 0
    ? "none"
    : provenance.causticWarningPairs.map((pair) => {
        if (!Array.isArray(pair) || pair.length !== 2 ||
            pair.some((pathId) => typeof pathId !== "string" ||
              pathId.length === 0 || /[,;\t\r\n]/u.test(pathId))) {
          throw new TypeError("EOM caustic warning pairs require two protocol-safe path ids.");
        }
        return `${pair[0]},${pair[1]}`;
      }).join(";");
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
      controls.runGrade,
      provenance.causticWarningCount,
      provenance.firstCausticWarningTime ?? "none",
      warningPairToken,
      model.fieldSpeed,
      model.coupling,
      controls.rootTolerance,
      controls.accelerationTolerance,
      controls.farFieldEnclosureFraction,
      controls.positionTolerance,
      controls.velocityTolerance,
      controls.correctionTolerance,
      controls.threadCount,
      request.histories.length,
    ]),
  ];
  request.histories.forEach((history) => {
    if (!Array.isArray(history.segments) || history.segments.length === 0) {
      throw new TypeError(`EOM path ${history.pathId} lacks retained segments.`);
    }
    lines.push(tabRecord([
      "PATH",
      history.pathId,
      history.charge,
      history.stateFlags ?? 0,
      history.segments.length,
    ]));
    history.segments.forEach((segment) => {
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3) {
        throw new TypeError(`EOM path ${history.pathId} has invalid cubic coefficients.`);
      }
      lines.push(tabRecord([
        "SEG",
        segment.startTime,
        segment.endTime,
        ...segment.coefficients.flat(),
        segment.positionError,
        segment.velocityError,
      ]));
    });
  });
  lines.push("END");
  return `${lines.join("\n")}\n`;
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
    if (response.causticWarningCount > 0 && extension.segments.some(
      (segment) => segment.claimGrade !== "uncertified-through-encounters",
    )) {
      throw new Error("Warned EOM response omitted its segment claim marker.");
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
        causticWarnings: response.causticWarnings ?? [],
      }),
    ]),
  });
}
