import {
  buildReactionSnapshotFromReactionFlowDocument,
} from "./ReactionBuiltInLibraryRuntime.js";
import { buildReactionLibraryExportOverrides } from "./ReactionFlowLibrarySupportRuntime.js";

const REACTION_FLOW_SCHEMA = "reaction-flow/v1";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function sanitizeToken(value = "", fallback = "reaction_library") {
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

function buildLibraryDescription(document = {}) {
  const reviewInput = document?.provenance?.reviewInput ?? {};
  const sourceKind = normalizeText(reviewInput?.origin?.sourceKind);
  const sourceTitle = normalizeText(reviewInput?.origin?.title);
  const reviewStatus = normalizeText(document?.review?.status);
  if (sourceKind === "pdg-ingest" && sourceTitle) {
    return `Accepted PDG-backed solved reaction for ${sourceTitle}.`;
  }
  if (sourceKind === "pdg-ingest") {
    return "Accepted PDG-backed solved reaction.";
  }
  if (reviewStatus === "accepted") {
    return "Accepted solved reaction-flow library entry.";
  }
  return "Reaction-flow library entry.";
}

function buildCanonicalLibraryEntry(document = {}, options = {}) {
  const reactionId = normalizeText(document?.reactionId) || "reaction_flow";
  const title = normalizeText(document?.title) || "Reaction Flow";
  const semanticTags = buildTagList(document?.hints?.semanticTags);
  const primaryTag = semanticTags[0] ? sanitizeToken(semanticTags[0], "") : "";
  const suffix = primaryTag ? `_${primaryTag}` : "";
  return {
    id:
      normalizeText(options?.entryId) ||
      `library_${sanitizeToken(reactionId, "reaction_flow")}${suffix}`,
    title,
    description: normalizeText(options?.description) || buildLibraryDescription(document),
    reactionId,
    sourceDocumentIds: buildTagList(document?.provenance?.sourceDocumentIds),
    semanticTags,
    reviewStatus: normalizeText(document?.review?.status) || "draft",
    acceptedAt: normalizeText(document?.review?.acceptedAt),
  };
}

export function buildReactionLibraryCandidateFromDocument(document = {}, options = {}) {
  if (normalizeText(document?.schema) !== REACTION_FLOW_SCHEMA) {
    throw new Error("Reaction library candidate build expects reaction-flow/v1 input.");
  }
  return {
    entry: buildCanonicalLibraryEntry(document, options),
    document,
    snapshot: buildReactionSnapshotFromReactionFlowDocument(document),
    exportOverrides: buildReactionLibraryExportOverrides(document),
  };
}
