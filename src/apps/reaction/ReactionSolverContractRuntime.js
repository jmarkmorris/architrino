import { buildReactionSolverRequestDocument } from "./ReactionSolverRequestExportRuntime.js";
import { buildReactionSolverContractResponse } from "./ReactionSolverContractResponseRuntime.js";
import {
  canExecuteExternalReactionSolver,
  executeExternalReactionSolverRequest,
} from "./ReactionSolverExternalRuntime.js";
import { solveReactionSolverRequestInProcess } from "./ReactionSolverInProcessRuntime.js";
import { shouldAllowLegacyReactionSolverExecution } from "./ReactionSolverExecutionRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

export function solveReactionSolverRequest(request = {}, options = {}) {
  if (canExecuteExternalReactionSolver(options)) {
    const externalSolve = executeExternalReactionSolverRequest(request, options);
    return buildReactionSolverContractResponse(request, externalSolve.result, {
      execution: externalSolve.execution,
    });
  }
  if (!shouldAllowLegacyReactionSolverExecution(options)) {
    throw new Error(
      "External Reaction solver is unavailable in this runtime. Configure an external solver bridge instead of using the legacy in-process planner."
    );
  }
  const inProcessSolve = solveReactionSolverRequestInProcess(request, options);
  return {
    ...inProcessSolve,
    execution: {
      mode: "in-process",
      target: "legacy-in-process-bridge",
      fallback: true,
    },
  };
}

export function solveReactionSnapshot(snapshot = {}, options = {}) {
  const request = buildReactionSolverRequestDocument({
    snapshot,
    requestId:
      normalizeText(options?.requestId) || "reaction_canvas_request",
    origin:
      options?.origin === undefined
        ? {
            sourceKind: "reaction",
            sourceDocumentId: "reaction_canvas_ui",
            title: "Reaction Canvas",
          }
        : options?.origin,
    resolveBinaryChoiceInventory:
      typeof options?.resolveBinaryChoiceInventory === "function"
        ? options.resolveBinaryChoiceInventory
        : null,
    getCenterUsage:
      typeof options?.getCenterUsage === "function" ? options.getCenterUsage : null,
    policy: options?.policy,
  });
  return solveReactionSolverRequest(request, options);
}
