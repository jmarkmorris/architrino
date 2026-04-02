import { applyReactionSolveLayout } from "./ReactionSolveLayoutRuntime.js";
import {
  buildReactionSolvePlan,
  describeReactionSolvePlan,
} from "./ReactionSolveProposalRuntime.js";
import { buildReactionSolveState } from "./ReactionSolveStateRuntime.js";
import { buildReactionSolverRequestDocument } from "./ReactionSolverRequestExportRuntime.js";
import { buildReactionSnapshotFromSolverRequest } from "./ReactionSolverRequestAdapterRuntime.js";
import { buildReactionSolverResultDocument } from "./ReactionSolverResultExportRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function buildInternalNodeKey(participantId = "", nodeId = "") {
  return `${participantId}:${nodeId}`;
}

function isCenterAssemblyParticipant(participant = null) {
  return participant?.side === "reactant" && participant?.surfaceColumn === "center-assembly";
}

function isOperatorParticipant(participant = null) {
  return participant?.side === "operator";
}

export function solveReactionSolverRequestInProcess(request = {}, options = {}) {
  const snapshot = buildReactionSnapshotFromSolverRequest(request);
  const solveState = buildReactionSolveState({
    participants: snapshot.participants,
    mappings: snapshot.mappings,
    buildNodeKey:
      typeof options?.buildNodeKey === "function" ? options.buildNodeKey : buildInternalNodeKey,
    isCenterAssemblyParticipant,
    isOperatorParticipant,
  });
  const plan = buildReactionSolvePlan({
    solveState,
    buildNodeKey:
      typeof options?.buildNodeKey === "function" ? options.buildNodeKey : buildInternalNodeKey,
    resolveBinaryChoiceInventory:
      typeof options?.resolveBinaryChoiceInventory === "function"
        ? options.resolveBinaryChoiceInventory
        : null,
  });
  const laidOutPlan = applyReactionSolveLayout({
    plan,
    solveState,
  });
  const result = buildReactionSolverResultDocument({
    request,
    solveState,
    plan: laidOutPlan,
    resultId:
      normalizeText(options?.resultId) || `${normalizeText(request?.requestId) || "solver_request"}_result`,
  });
  return {
    request,
    result,
    solveState,
    plan: laidOutPlan,
    planDescription: describeReactionSolvePlan(laidOutPlan),
    unresolvedReactantCount: Array.isArray(laidOutPlan?.unresolvedReactants)
      ? laidOutPlan.unresolvedReactants.length
      : 0,
    unresolvedTargetCount: Array.isArray(laidOutPlan?.unresolvedProducts)
      ? laidOutPlan.unresolvedProducts.length
      : 0,
  };
}

export function solveReactionSnapshotInProcess(snapshot = {}, options = {}) {
  const request = buildReactionSolverRequestDocument({
    snapshot,
    requestId:
      normalizeText(options?.requestId) || "reaction_solver_request",
    origin:
      options?.origin === undefined
        ? {
            sourceKind: "reaction",
            sourceDocumentId: "reaction_solver_ui",
            title: "Reaction Solver Canvas",
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
  return solveReactionSolverRequestInProcess(request, options);
}
