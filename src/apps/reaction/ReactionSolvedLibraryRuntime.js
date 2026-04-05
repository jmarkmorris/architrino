import { getReactionCanonicalBaseLabel } from "./ReactionLabelCatalogRuntime.js";
import { buildReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "./ReactionStructureDescriptorRuntime.js";
import { buildReactionSnapshotFromSolverRequest } from "./ReactionSolverRequestAdapterRuntime.js";
import { applyReactionSolvePlan } from "./ReactionSolveProjectionRuntime.js";
import { buildReactionFlowDocument } from "./ReactionFlowExportRuntime.js";
import { buildReactionLibraryCandidateFromDocument } from "./ReactionLibraryCandidateRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function getParticipantRootNode(participant = null) {
  return participant?.hierarchy?.[0] ?? null;
}

function createOperatorParticipantFactory(snapshot = {}) {
  return function createOperatorParticipant(templateId = "associate", operatorLaneIndex = 1, options = {}) {
    const operatorId = `solve_generated_operator_${(Array.isArray(snapshot?.participants) ? snapshot.participants.length : 0) + 1}`;
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

function createGeneratedCenterParticipant(resultParticipant = {}) {
  const participantId = normalizeText(resultParticipant?.id);
  const templateId = normalizeText(resultParticipant?.templateId) || "particle";
  const polarity = normalizeText(resultParticipant?.polarity).toLowerCase() === "anti" ? "anti" : "pro";
  const rootNodeId = normalizeText(resultParticipant?.rootNodeId) || `${participantId}_structure`;
  const normalizedTags = Array.isArray(resultParticipant?.tags)
    ? resultParticipant.tags.map((tag) => normalizeLowerText(tag)).filter(Boolean)
    : [];
  const shouldRenderAsLeftReactant =
    templateId !== "free_architrinos" &&
    normalizedTags.some((tag) => tag.endsWith("-supplement"));
  const label = normalizeText(resultParticipant?.label) || getReactionCanonicalBaseLabel(templateId, {
    fallbackLabel: "Participant",
  });
  const structure = buildReactionParticipantStructure(templateId, {
    id: rootNodeId,
    label,
    polarity,
  });
  return {
    id: participantId,
    side: "reactant",
    ...(shouldRenderAsLeftReactant ? {} : { surfaceColumn: "center-assembly" }),
    templateId,
    polarity: ["electron", "neutrino", "up_quark", "down_quark", "noether_core"].includes(templateId)
      ? polarity
      : "",
    label,
    baseLabel: label,
    provenanceId: `solver-result-participant:${participantId}`,
    surfaceRowIndex: 0,
    isSolveGenerated: true,
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    tags: Array.isArray(resultParticipant?.tags) ? [...resultParticipant.tags] : [],
  };
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
  const snapshot = buildReactionSnapshotFromSolverRequest(request);
  const generatedCenterParticipants = (Array.isArray(result?.participants) ? result.participants : [])
    .filter(
      (participant) =>
        normalizeText(participant?.origin) === "solve-generated-intermediate" &&
        normalizeText(participant?.side) === "center"
    )
    .map((participant, index) => {
      const generatedParticipant = createGeneratedCenterParticipant(participant);
      generatedParticipant.surfaceRowIndex = index;
      return generatedParticipant;
    });
  snapshot.participants = [...snapshot.participants, ...generatedCenterParticipants];
  applyReactionSolvePlan({
    result,
    plan: options?.plan,
    participants: snapshot.participants,
    getParticipantById: (participantId) =>
      snapshot.participants.find((participant) => participant.id === participantId) ?? null,
    getParticipantRootNode,
    buildNodeKey: buildReactionNodeKey,
    createOperatorParticipant: createOperatorParticipantFactory(snapshot),
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
