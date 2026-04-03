function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function isNodeExecutionRuntime() {
  return Boolean(globalThis.process?.versions?.node);
}

export function isLegacyReactionSolverExecution(execution = null) {
  return normalizeLowerText(execution?.mode) === "in-process";
}

export function shouldAllowLegacyReactionSolverExecution(options = {}) {
  if (typeof options?.allowLegacyInProcessSolver === "boolean") {
    return options.allowLegacyInProcessSolver;
  }
  return isNodeExecutionRuntime();
}

export function buildReactionSolverExecutionStatusNote(execution = null) {
  if (isLegacyReactionSolverExecution(execution)) {
    return "Legacy in-process solver bridge remains active for this solve.";
  }
  return "";
}
