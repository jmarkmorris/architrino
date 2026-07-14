import { spawn } from "node:child_process";

export const BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION =
  "borg-native-eom-process-client.v0";

export function createBorgNativeEomProcessClient({ binaryPath, timeoutMs = 120000 } = {}) {
  if (typeof binaryPath !== "string" || binaryPath.length === 0) {
    throw new TypeError("Borg native EOM process client requires binaryPath.");
  }
  return Object.freeze({
    schema: BORG_NATIVE_EOM_PROCESS_CLIENT_VERSION,
    async evolveRetainedHistories(request) {
      const protocol = encodeNativeRequest(request);
      const response = await executeNativeRequest(binaryPath, protocol, timeoutMs);
      return mergePublishedExtensions(request, response);
    },
    async dispose() {},
  });
}

export function encodeNativeRequest(request) {
  if (request?.contractId !== "eom_evolution_contract/v0" ||
      !Array.isArray(request.histories) || request.histories.length === 0) {
    throw new TypeError("Native EOM process request lacks the EOM contract or histories.");
  }
  const controls = request.numericalControls ?? {};
  const model = request.modelControls ?? {};
  const lines = [
    "EOM_BORG_NATIVE_V0",
    tabRecord([
      "RUN",
      request.runId,
      request.absoluteTimeInterval.start,
      request.absoluteTimeInterval.end,
      controls.initialStep,
      controls.minimumStep,
      model.fieldSpeed,
      model.coupling,
      controls.rootTolerance,
      controls.accelerationTolerance,
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

function tabRecord(fields) {
  return fields.map((field) => {
    const value = String(field);
    if (value.length === 0 || /[\t\r\n]/u.test(value)) {
      throw new TypeError("Native EOM protocol fields must be nonempty single-line tokens.");
    }
    return value;
  }).join("\t");
}

function executeNativeRequest(binaryPath, protocol, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(binaryPath, ["borg-shadow-v0"], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      finish(new Error(`Native EOM process timed out after ${timeoutMs} ms.`));
    }, timeoutMs);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", finish);
    child.on("close", (code, signal) => {
      if (code !== 0) {
        finish(new Error(
          `Native EOM process failed (${signal ?? code}): ${stderr.trim() || "no diagnostic"}`,
        ));
        return;
      }
      try {
        finish(null, JSON.parse(stdout));
      } catch (error) {
        finish(new Error(`Native EOM process emitted invalid JSON: ${error.message}`));
      }
    });
    child.stdin.end(protocol);

    function finish(error, value) {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeout);
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    }
  });
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
      throw new Error("Native EOM response reordered or omitted a path extension.");
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
