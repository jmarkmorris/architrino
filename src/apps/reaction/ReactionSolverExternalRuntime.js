function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeCliArgs(values = []) {
  return (Array.isArray(values) ? values : [])
    .map((value) => normalizeText(value))
    .filter(Boolean);
}

function getBuiltinNodeModule(moduleId = "") {
  const getBuiltinModule = globalThis.process?.getBuiltinModule;
  if (typeof getBuiltinModule !== "function") {
    return null;
  }
  return getBuiltinModule(moduleId) ?? null;
}

function isNodeExecutionAvailable() {
  return Boolean(globalThis.process?.versions?.node);
}

function resolveDefaultExternalSolverArgs() {
  const urlModule = getBuiltinNodeModule("node:url");
  const fileURLToPath = urlModule?.fileURLToPath;
  if (typeof fileURLToPath !== "function") {
    return [];
  }
  return [fileURLToPath(new URL("../../../scripts/solve-reaction.mjs", import.meta.url))];
}

function normalizeExternalSolverResponse(response = null) {
  if (response && typeof response === "object" && response.result && response.execution) {
    return response;
  }
  if (response && typeof response === "object" && response.result) {
    return {
      result: response.result,
      execution: response.execution ?? null,
    };
  }
  return {
    result: response,
    execution: null,
  };
}

function resolveExternalSolverTimeoutMs(options = {}) {
  const timeoutMs = Number(options?.externalSolverTimeoutMs);
  return Number.isFinite(timeoutMs) && timeoutMs > 0 ? Math.round(timeoutMs) : 30000;
}

export function canExecuteExternalReactionSolver(options = {}) {
  if (options?.useExternalSolver === false) {
    return false;
  }
  if (typeof options?.executeExternalSolverRequest === "function") {
    return true;
  }
  return (
    isNodeExecutionAvailable() &&
    typeof globalThis.process?.execPath === "string" &&
    globalThis.process.execPath.length > 0 &&
    typeof getBuiltinNodeModule("node:child_process")?.execFileSync === "function"
  );
}

export function executeExternalReactionSolverRequest(request = {}, options = {}) {
  if (typeof options?.executeExternalSolverRequest === "function") {
    const injectedResponse = normalizeExternalSolverResponse(
      options.executeExternalSolverRequest(request, options)
    );
    return {
      result: injectedResponse.result,
      execution: injectedResponse.execution ?? {
        mode: "external",
        target: "injected",
      },
    };
  }

  const childProcess = getBuiltinNodeModule("node:child_process");
  if (typeof childProcess?.execFileSync !== "function" || !isNodeExecutionAvailable()) {
    throw new Error("External Reaction solver execution is unavailable in this runtime.");
  }

  const command =
    normalizeText(options?.externalSolverCommand) || normalizeText(globalThis.process?.execPath);
  const args = normalizeCliArgs(options?.externalSolverArgs);
  const resolvedArgs = args.length ? args : resolveDefaultExternalSolverArgs();
  if (!command || !resolvedArgs.length) {
    throw new Error("External Reaction solver command is not configured.");
  }

  const stdout = childProcess.execFileSync(command, resolvedArgs, {
    cwd: normalizeText(options?.externalSolverCwd) || undefined,
    encoding: "utf8",
    input: JSON.stringify(request),
    maxBuffer: Number(options?.externalSolverMaxBuffer ?? 16 * 1024 * 1024),
    timeout: resolveExternalSolverTimeoutMs(options),
  });
  return {
    result: JSON.parse(stdout),
    execution: {
      mode: "external",
      target: command,
      args: resolvedArgs,
    },
  };
}
