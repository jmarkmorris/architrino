import { getReactionCanonicalBaseLabel } from "./ReactionLabelCatalogRuntime.js";
import { buildReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "./ReactionStructureDescriptorRuntime.js";
import { buildReactionSnapshotFromSolverRequest } from "./ReactionSolverRequestAdapterRuntime.js";
import { applyReactionSolvePlan } from "./ReactionSolveProjectionRuntime.js";
import { buildReactionFlowDocument } from "./ReactionFlowExportRuntime.js";
import { buildReactionLibraryCandidateFromDocument } from "./ReactionLibraryCandidateRuntime.js";
import { supportsReactionObjectPolarity } from "./ReactionObjectRegistryRuntime.js";

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

function getParticipantRootNode(participant = null) {
  return participant?.hierarchy?.[0] ?? null;
}

function createOperatorParticipantFactory(snapshot = {}) {
  return function createOperatorParticipant(templateId = "associate", operatorLaneIndex = 1, options = {}) {
    const operatorId =
      normalizeText(options?.participantId) ||
      `solve_generated_operator_${(Array.isArray(snapshot?.participants) ? snapshot.participants.length : 0) + 1}`;
    const label = getReactionCanonicalBaseLabel(templateId, {
      fallbackLabel: normalizeText(templateId) || "Operator",
    });
    const structure = buildReactionParticipantStructure(templateId, {
      id: `${operatorId}_root`,
      label,
    });
    const participant = {
      id: operatorId,
      side: "operator",
      templateId: normalizeText(templateId) || "associate",
      label,
      provenanceId: `solver-result-operator:${operatorId}`,
      operatorLaneIndex: Math.max(0, Math.round(Number(operatorLaneIndex) || 0)),
      operatorSlotIndex: Math.max(0, Math.round(Number(options?.operatorSlotIndex ?? 0) || 0)),
      surfaceRowIndex: 0,
      isSolveGenerated: Boolean(options?.isSolveGenerated),
      structure: structure.root,
      structureValidation: structure.validation,
      hierarchy: buildReactionStructureDescriptorTree(structure.root),
      tags: ["solve-generated"],
    };
    snapshot.participants = [...(Array.isArray(snapshot?.participants) ? snapshot.participants : []), participant];
    return participant;
  };
}

function createSolveGeneratedParticipantFactory(snapshot = {}) {
  return function createSolveGeneratedParticipant(addition = {}) {
    const participantId = normalizeText(addition?.ref);
    const templateId = normalizeText(addition?.templateId) || "particle";
    const polarity = normalizeText(addition?.polarity).toLowerCase() === "anti" ? "anti" : "pro";
    const resultParticipant = addition?.participant ?? {};
    const rootNodeId = normalizeText(resultParticipant?.rootNodeId) || `${participantId}_structure`;
    const label = normalizeText(addition?.label) || getReactionCanonicalBaseLabel(templateId, {
      fallbackLabel: "Participant",
    });
    const structure = buildReactionParticipantStructure(templateId, {
      id: rootNodeId,
      label,
      polarity,
    });
    const placementClass = normalizeLowerText(addition?.placementClass);
    const participant = {
      id: participantId,
      side: placementClass === "product" ? "product" : "reactant",
      ...(placementClass === "center" ? { surfaceColumn: "center-assembly" } : {}),
      templateId,
      polarity: supportsReactionObjectPolarity(templateId) ? polarity : "",
      label,
      baseLabel: label,
      provenanceId: `solver-result-participant:${participantId}`,
      surfaceRowIndex: Math.max(0, Math.round(Number(addition?.surfaceRowIndex ?? 0) || 0)),
      isSolveGenerated: true,
      structure: structure.root,
      structureValidation: structure.validation,
      hierarchy: buildReactionStructureDescriptorTree(structure.root),
      tags: Array.isArray(addition?.tags) ? [...addition.tags] : [],
    };
    snapshot.participants = [...(Array.isArray(snapshot?.participants) ? snapshot.participants : []), participant];
    return participant;
  };
}

function applyParticipantPlacement(snapshot = {}, participantId = "", placementClass = "reactant", row = 0) {
  const participants = Array.isArray(snapshot?.participants) ? snapshot.participants : [];
  const participant =
    participants.find((entry) => normalizeText(entry?.id) === normalizeText(participantId)) ?? null;
  if (!participant) {
    return false;
  }
  const normalizedPlacementClass = normalizeLowerText(placementClass);
  if (normalizedPlacementClass === "center") {
    participant.side = "reactant";
    participant.surfaceColumn = "center-assembly";
  } else if (normalizedPlacementClass === "product") {
    participant.side = "product";
    delete participant.surfaceColumn;
  } else {
    participant.side = "reactant";
    delete participant.surfaceColumn;
  }
  participant.surfaceRowIndex = Math.max(0, Math.round(Number(row) || 0));
  return true;
}

function addOrReplaceSnapshotMapping(snapshot = {}, sourceKey = "", sourceRole = "", targetKey = "", targetRole = "", mappingOptions = {}) {
  const mappings = Array.isArray(snapshot?.mappings) ? snapshot.mappings : [];
  const mappingId = `mapping_${mappings.length + 1}`;
  mappings.push({
    id: mappingId,
    sourceKey,
    sourceRole,
    targetKey,
    targetRole,
    sourceAnchorInstanceIndex: mappingOptions.sourceAnchorInstanceIndex ?? null,
    targetAnchorInstanceIndex: mappingOptions.targetAnchorInstanceIndex ?? null,
  });
  snapshot.mappings = mappings;
  return mappingId;
}

function markParticipantAutoDissociated(participant = null) {
  if (!participant || participant.isAutoDissociatedComposite) {
    return false;
  }
  participant.isAutoDissociatedComposite = true;
  return true;
}

export function buildAcceptedReactionLibraryCandidateFromSolverArtifacts(options = {}) {
  const request = options?.request ?? {};
  const result = options?.result ?? {};
  const reviewCandidate = options?.reviewCandidate ?? null;
  if (result?.summary?.exact !== true || resultHasErrorDiagnostics(result)) {
    throw new Error(
      "Accepted reaction library generation requires an exact solver result with no error diagnostics."
    );
  }
  const snapshot = buildReactionSnapshotFromSolverRequest(request);
  applyReactionSolvePlan({
    result,
    plan: options?.plan,
    participants: snapshot.participants,
    getParticipantById: (participantId) =>
      snapshot.participants.find((participant) => participant.id === participantId) ?? null,
    getParticipantRootNode,
    buildNodeKey: buildReactionNodeKey,
    createOperatorParticipant: createOperatorParticipantFactory(snapshot),
    createSolveGeneratedParticipant: createSolveGeneratedParticipantFactory(snapshot),
    applyParticipantPlacement: (participantId, placementClass, row) =>
      applyParticipantPlacement(snapshot, participantId, placementClass, row),
    addOrReplaceMapping: (sourceKey, sourceRole, targetKey, targetRole, mappingOptions = {}) =>
      addOrReplaceSnapshotMapping(snapshot, sourceKey, sourceRole, targetKey, targetRole, mappingOptions),
    markParticipantAutoDissociated,
  });

  const exportOverrides = reviewCandidate?.exportOverrides ?? {};
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
    review: {
      status: "accepted",
      acceptedAt: normalizeText(options?.acceptedAt) || new Date().toISOString(),
    },
    snapshot,
  });

  return buildReactionLibraryCandidateFromDocument(document, {
    entryId: options?.entryId,
    description: options?.description,
  });
}
