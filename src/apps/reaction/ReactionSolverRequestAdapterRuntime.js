import { createReactionBinarySelectionRuntime } from "./ReactionBinarySelectionRuntime.js";
import { getReactionCanonicalLabel } from "./ReactionLabelCatalogRuntime.js";
import { buildReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import {
  buildReactionStructureDescriptorTree,
  getReactionStructureTrackSlotCodes,
} from "./ReactionStructureDescriptorRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function supportsParticipantPolarity(templateId = "") {
  return new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark", "fermion_gen1"]).has(
    normalizeLowerText(templateId)
  );
}

function normalizeParticipantPolarity(polarity = "") {
  return normalizeLowerText(polarity) === "anti" ? "anti" : "pro";
}

function buildTagList(values = []) {
  return [...new Set(values.map((value) => normalizeText(value)).filter(Boolean))];
}

function resolveParticipantDisplayLabel(requestParticipant = {}, templateId = "", polarity = "") {
  const explicitLabel = normalizeText(requestParticipant?.label);
  if (explicitLabel) {
    return explicitLabel;
  }
  return getReactionCanonicalLabel(templateId, {
    polarity,
  });
}

function toLedgerCounts(inventory = null) {
  return {
    electrinoCount: Math.max(
      0,
      Math.round(Number(inventory?.electrinoCount ?? inventory?.electrino ?? 0) || 0)
    ),
    positrinoCount: Math.max(
      0,
      Math.round(Number(inventory?.positrinoCount ?? inventory?.positrino ?? 0) || 0)
    ),
  };
}

function ledgersEqual(left = null, right = null) {
  const normalizedLeft = toLedgerCounts(left);
  const normalizedRight = toLedgerCounts(right);
  return (
    normalizedLeft.electrinoCount === normalizedRight.electrinoCount &&
    normalizedLeft.positrinoCount === normalizedRight.positrinoCount
  );
}

function buildNodeRecordIndex(requestParticipant = {}) {
  return new Map(
    (Array.isArray(requestParticipant?.nodes) ? requestParticipant.nodes : [])
      .filter((node) => normalizeText(node?.id))
      .map((node) => [normalizeText(node.id), node])
  );
}

function buildOperatorAnchorIdIndex(request = {}) {
  const anchorIdByOperatorId = new Map();
  (Array.isArray(request?.manualMappings) ? request.manualMappings : []).forEach((mapping) => {
    const fromParticipantId = normalizeText(mapping?.from?.participantId);
    const toParticipantId = normalizeText(mapping?.to?.participantId);
    if (
      normalizeLowerText(mapping?.from?.role).startsWith("operator") &&
      fromParticipantId &&
      !anchorIdByOperatorId.has(fromParticipantId)
    ) {
      anchorIdByOperatorId.set(fromParticipantId, normalizeText(mapping?.from?.anchorId) || "root");
    }
    if (
      normalizeLowerText(mapping?.to?.role).startsWith("operator") &&
      toParticipantId &&
      !anchorIdByOperatorId.has(toParticipantId)
    ) {
      anchorIdByOperatorId.set(toParticipantId, normalizeText(mapping?.to?.anchorId) || "root");
    }
  });
  return anchorIdByOperatorId;
}

function applyBinarySelectionsFromRequestParticipant(
  participant = null,
  requestParticipant = {},
  binarySelectionRuntime = {}
) {
  if (!participant) {
    return participant;
  }
  const {
    getBinaryChoiceInventory = () => ({ electrino: 0, positrino: 0 }),
    getBinarySelectorRuleForParticipant = () => ({ visibleChoiceIds: [] }),
    getBinarySelectorNodes = () => [],
    getParticipantBinarySelectorGroups = () => [],
    getInitialParticipantBinarySelections = () => ({}),
  } = binarySelectionRuntime;
  const nodeRecordIndex = buildNodeRecordIndex(requestParticipant);
  const nextSelections = {
    ...getInitialParticipantBinarySelections(participant),
  };
  const binaryGroups = getParticipantBinarySelectorGroups(participant);
  binaryGroups.forEach((groupNode) => {
    const slotNodes = getBinarySelectorNodes(participant, groupNode);
    const visibleChoiceIds = Array.isArray(
      getBinarySelectorRuleForParticipant(participant)?.visibleChoiceIds
    )
      ? getBinarySelectorRuleForParticipant(participant).visibleChoiceIds
      : [];
    slotNodes.forEach((slotNode) => {
      const requestNode = nodeRecordIndex.get(normalizeText(slotNode?.id));
      if (!requestNode) {
        return;
      }
      const matchedChoiceId =
        visibleChoiceIds.find((choiceId) =>
          ledgersEqual(getBinaryChoiceInventory(choiceId), requestNode?.inventory)
        ) ?? "";
      if (matchedChoiceId) {
        nextSelections[slotNode.id] = matchedChoiceId;
      }
    });
  });
  participant.binarySelections = nextSelections;
  return participant;
}

function createParticipantFromRequestRecord(
  requestParticipant = {},
  options = {}
) {
  const binarySelectionRuntime = options?.binarySelectionRuntime ?? {};
  const side = normalizeLowerText(requestParticipant?.side);
  const templateId = normalizeText(requestParticipant?.templateId);
  const polarity = supportsParticipantPolarity(requestParticipant?.templateId)
    ? normalizeParticipantPolarity(requestParticipant?.polarity)
    : "";
  const canonicalLabel = resolveParticipantDisplayLabel(requestParticipant, templateId, polarity);
  const structure = buildReactionParticipantStructure(templateId, {
    id: normalizeText(requestParticipant?.rootNodeId) || `${normalizeText(requestParticipant?.id)}_structure`,
    label: canonicalLabel,
    polarity,
  });
  const participant = {
    id: normalizeText(requestParticipant?.id),
    side: side === "product" ? "product" : "reactant",
    templateId,
    polarity,
    baseLabel: canonicalLabel,
    label: canonicalLabel,
    provenanceId: `solver-request-participant:${normalizeText(requestParticipant?.id)}`,
    tags: buildTagList([
      ...(Array.isArray(requestParticipant?.tags) ? requestParticipant.tags : []),
      ...(Array.isArray(requestParticipant?.inventory?.flags) ? requestParticipant.inventory.flags : []),
    ]),
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: {},
    ...(side === "center"
      ? {
          surfaceColumn: "center-assembly",
          centerUsage: normalizeLowerText(requestParticipant?.centerUsage) || "optional",
        }
      : {}),
  };
  return applyBinarySelectionsFromRequestParticipant(
    participant,
    requestParticipant,
    binarySelectionRuntime
  );
}

function createOperatorParticipantFromRequestRecord(
  requestOperator = {},
  options = {}
) {
  const anchorIdByOperatorId = options?.anchorIdByOperatorId ?? new Map();
  const operatorId = normalizeText(requestOperator?.id);
  const rootNodeId = anchorIdByOperatorId.get(operatorId) || "root";
  return {
    id: operatorId,
    side: "operator",
    templateId: normalizeLowerText(requestOperator?.type) || "associate",
    label: normalizeText(requestOperator?.label) || normalizeText(requestOperator?.type) || "Operator",
    provenanceId: `solver-request-operator:${operatorId}`,
    tags: buildTagList(Array.isArray(requestOperator?.tags) ? requestOperator.tags : []),
    operatorLaneIndex: Math.max(0, Math.round(Number(requestOperator?.placement?.lane ?? 0) || 0)),
    operatorSlotIndex: Math.max(0, Math.round(Number(requestOperator?.placement?.slot ?? 0) || 0)),
    surfaceRowIndex: Math.max(0, Math.round(Number(requestOperator?.placement?.row ?? 0) || 0)),
    hierarchy: [
      {
        id: rootNodeId,
        label: normalizeText(requestOperator?.label) || normalizeText(requestOperator?.type) || "Operator",
        templateId: normalizeLowerText(requestOperator?.type) || "associate",
        renderMode: "operator-tile",
        children: [],
      },
    ],
  };
}

function buildParticipantsById(participants = []) {
  return new Map(
    (Array.isArray(participants) ? participants : [])
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );
}

function buildMappingsFromRequest(request = {}, participantsById = new Map()) {
  return (Array.isArray(request?.manualMappings) ? request.manualMappings : [])
    .map((mapping) => {
      const fromParticipantId = normalizeText(mapping?.from?.participantId);
      const toParticipantId = normalizeText(mapping?.to?.participantId);
      if (!fromParticipantId || !toParticipantId) {
        return null;
      }
      const sourceParticipant = participantsById.get(fromParticipantId) ?? null;
      const targetParticipant = participantsById.get(toParticipantId) ?? null;
      if (!sourceParticipant || !targetParticipant) {
        return null;
      }
      return {
        id: normalizeText(mapping?.id),
        sourceKey: buildReactionNodeKey(fromParticipantId, normalizeText(mapping?.from?.anchorId) || "root"),
        targetKey: buildReactionNodeKey(toParticipantId, normalizeText(mapping?.to?.anchorId) || "root"),
        sourceRole: normalizeText(mapping?.from?.role),
        targetRole: normalizeText(mapping?.to?.role),
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      };
    })
    .filter(Boolean);
}

export function buildReactionSnapshotFromSolverRequest(request = {}) {
  const binarySelectionRuntime = createReactionBinarySelectionRuntime({
    supportsParticipantPolarity,
    normalizeParticipantPolarity,
  });
  const requestParticipants = Array.isArray(request?.participants) ? request.participants : [];
  const requestOperators = Array.isArray(request?.manualOperators) ? request.manualOperators : [];
  const anchorIdByOperatorId = buildOperatorAnchorIdIndex(request);
  const participants = [
    ...requestParticipants.map((participant) =>
      createParticipantFromRequestRecord(participant, {
        binarySelectionRuntime,
      })
    ),
    ...requestOperators.map((operator) =>
      createOperatorParticipantFromRequestRecord(operator, {
        anchorIdByOperatorId,
      })
    ),
  ].filter(Boolean);
  const participantsById = buildParticipantsById(participants);
  const mappings = buildMappingsFromRequest(request, participantsById);
  (Array.isArray(request?.dissociation?.manuallyOpenedParticipantIds)
    ? request.dissociation.manuallyOpenedParticipantIds
    : []
  ).forEach((participantId) => {
    const participant = participantsById.get(normalizeText(participantId));
    if (participant && participant.side === "reactant") {
      participant.isDissociatedComposite = true;
      participant.isAutoDissociatedComposite = false;
    }
  });
  return {
    participants,
    mappings,
  };
}

export function inferBinarySelectionsBySlotCodeFromSolverRequestParticipant(requestParticipant = {}) {
  const trackSlotCodes = getReactionStructureTrackSlotCodes("reactant");
  const slotCodeByNodeId = new Map();
  (Array.isArray(requestParticipant?.nodes) ? requestParticipant.nodes : []).forEach((node) => {
    const nodeId = normalizeText(node?.id);
    if (!nodeId) {
      return;
    }
    const matchedSlotCode =
      trackSlotCodes.find((slotCode) => nodeId.endsWith(`/${slotCode.toLowerCase()}`)) ?? "";
    if (matchedSlotCode) {
      slotCodeByNodeId.set(nodeId, matchedSlotCode);
    }
  });
  return Object.fromEntries(slotCodeByNodeId);
}
