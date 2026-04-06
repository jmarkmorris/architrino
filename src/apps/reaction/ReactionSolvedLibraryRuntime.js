import { buildReactionFlowDocument } from "./ReactionFlowExportRuntime.js";
import { buildReactionLibraryCandidateFromDocument } from "./ReactionLibraryCandidateRuntime.js";
import { buildReactionSnapshotFromSolverResult } from "./ReactionSolverResultAdapterRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function resultHasErrorDiagnostics(result = {}) {
  return (Array.isArray(result?.diagnostics) ? result.diagnostics : []).some(
    (diagnostic) => normalizeLowerText(diagnostic?.severity) === "error"
  );
}

function buildReactionLibraryCandidateFromSolvedResult(options = {}) {
  const result = options?.result ?? {};
  const reviewCandidate = options?.reviewCandidate ?? null;
  const exact = result?.summary?.exact === true && !resultHasErrorDiagnostics(result);
  const snapshot = buildReactionSnapshotFromSolverResult(result);
  const exportOverrides = reviewCandidate?.exportOverrides ?? {};
  const reviewStatus = normalizeLowerText(options?.reviewStatus) === "accepted" && exact ? "accepted" : "draft";
  const document = buildReactionFlowDocument({
    ...exportOverrides,
    reactionId: normalizeText(options?.reactionId) || exportOverrides.reactionId,
    title: normalizeText(options?.title) || exportOverrides.title,
    sourceDocumentIds: Array.isArray(options?.sourceDocumentIds)
      ? options.sourceDocumentIds
      : exportOverrides.sourceDocumentIds,
    semanticTags: Array.isArray(options?.semanticTags)
      ? options.semanticTags
      : exportOverrides.semanticTags,
    suggestedSceneId: normalizeText(options?.suggestedSceneId) || exportOverrides.suggestedSceneId,
    reviewInput: options?.reviewInput ?? reviewCandidate?.reviewInput,
    review:
      reviewStatus === "accepted"
        ? {
            status: "accepted",
            acceptedAt: normalizeText(options?.acceptedAt) || new Date().toISOString(),
          }
        : {
            status: "draft",
          },
    allowIncompleteSnapshot: options?.allowIncompleteSnapshot === true,
    snapshot,
  });

  return buildReactionLibraryCandidateFromDocument(document, {
    entryId: options?.entryId,
    description: options?.description,
  });
}

export function buildReactionLibraryCandidateFromSolverArtifacts(options = {}) {
  return buildReactionLibraryCandidateFromSolvedResult({
    ...options,
    reviewStatus:
      options?.reviewStatus !== undefined
        ? options.reviewStatus
        : options?.result?.summary?.exact === true && !resultHasErrorDiagnostics(options?.result)
          ? "accepted"
          : "draft",
  });
}

export function buildAcceptedReactionLibraryCandidateFromSolverArtifacts(options = {}) {
  const result = options?.result ?? {};
  if (result?.summary?.exact !== true || resultHasErrorDiagnostics(result)) {
    throw new Error(
      "Accepted reaction library generation requires an exact solver result with no error diagnostics."
    );
  }
  return buildReactionLibraryCandidateFromSolvedResult({
    ...options,
    reviewStatus: "accepted",
  });
}
