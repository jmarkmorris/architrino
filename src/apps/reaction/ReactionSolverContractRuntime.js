import { buildReactionSolverRequestDocument } from "./ReactionSolverRequestExportRuntime.js";
import { buildReactionSolverContractResponse } from "./ReactionSolverContractResponseRuntime.js";
import {
  canExecuteExternalReactionSolver,
  executeExternalReactionSolverRequest,
} from "./ReactionSolverExternalRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

export function solveReactionSolverRequest(request = {}, options = {}) {
  if (!canExecuteExternalReactionSolver(options)) {
    throw new Error(
      "External Reaction solver is unavailable in this runtime. Configure an external solver bridge."
    );
  }
  const externalSolve = executeExternalReactionSolverRequest(request, options);
  return buildReactionSolverContractResponse(request, externalSolve.result, {
    execution: externalSolve.execution,
  });
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
