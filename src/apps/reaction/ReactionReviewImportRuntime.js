import { buildReactionSnapshotFromSolverRequest } from "./ReactionSolverRequestAdapterRuntime.js";

const SOLVER_REQUEST_SCHEMA = "solver-request/v1";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function sanitizeToken(value = "", fallback = "reaction_review") {
  return (
    normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || fallback
  );
}

function buildTagList(values = []) {
  return [...new Set(values.map((value) => normalizeText(value)).filter(Boolean))];
}

function buildReviewInput(request = {}) {
  const requestId = normalizeText(request?.requestId) || "solver_request";
  const sourceKind = normalizeText(request?.origin?.sourceKind) || "cli";
  const sourceDocumentId =
    normalizeText(request?.origin?.sourceDocumentId) || `solver-request:${requestId}`;
  const title = normalizeText(request?.origin?.title);
  return {
    schema: SOLVER_REQUEST_SCHEMA,
    requestId,
    origin: Object.fromEntries(
      Object.entries({
        sourceKind,
        sourceDocumentId,
        title,
      }).filter(([, value]) => value !== "")
    ),
  };
}

export function buildReactionReviewCandidateFromSolverRequest(request = {}) {
  if (normalizeText(request?.schema) !== SOLVER_REQUEST_SCHEMA) {
    throw new Error("Reaction review import expects solver-request/v1 input.");
  }

  const reviewInput = buildReviewInput(request);
  const requestId = reviewInput.requestId;
  const sourceKind = normalizeText(reviewInput?.origin?.sourceKind);
  const reactionId = `reaction_review_${sanitizeToken(requestId, "solver_request")}`;
  const requestTitle = normalizeText(reviewInput?.origin?.title);
  const reviewTitle = requestTitle ? `Reaction Review: ${requestTitle}` : "Reaction Review";

  return {
    snapshot: buildReactionSnapshotFromSolverRequest(request),
    reviewInput,
    exportOverrides: {
      reactionId,
      title: reviewTitle,
      sourceDocumentIds: [reviewInput.origin.sourceDocumentId],
      semanticTags: buildTagList([
        "reaction-review",
        "solver-request-import",
        sourceKind,
        sourceKind === "pdg-ingest" ? "pdg-review" : "",
      ]),
      suggestedSceneId: `${reactionId}_scene`,
      reviewInput,
    },
  };
}
