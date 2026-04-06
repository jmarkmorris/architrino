import { createReactionBinarySelectionRuntime } from "./ReactionBinarySelectionRuntime.js";
import { getReactionCanonicalLabel } from "./ReactionLabelCatalogRuntime.js";
import { buildReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import {
  buildReactionStructureDescriptorTree,
  findReactionStructureDescriptorNode,
} from "./ReactionStructureDescriptorRuntime.js";
import {
  getReactionParticipantPlacementClass,
  isReactionObjectPlacementAllowed,
  normalizeReactionObjectPolarity,
  supportsReactionObjectPolarity,
} from "./ReactionObjectRegistryRuntime.js";

const SOLVER_RESULT_SCHEMA = "solver-result/v1";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function buildTagList(values = []) {
  return [...new Set(values.map((value) => normalizeText(value)).filter(Boolean))];
}

function supportsParticipantPolarity(templateId = "") {
  return supportsReactionObjectPolarity(templateId);
}

function normalizeParticipantPolarity(polarity = "") {
  return normalizeReactionObjectPolarity(polarity);
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

function resolveParticipantDisplayLabel(resultParticipant = {}, templateId = "", polarity = "") {
  const explicitLabel = normalizeText(resultParticipant?.label);
  if (explicitLabel) {
    return explicitLabel;
  }
  return getReactionCanonicalLabel(templateId, {
    polarity,
  });
}

function buildNodeRecordIndex(resultParticipant = {}) {
  return new Map(
    (Array.isArray(resultParticipant?.nodes) ? resultParticipant.nodes : [])
      .filter((node) => normalizeText(node?.id))
      .map((node) => [normalizeText(node.id), node])
  );
}

function applyBinarySelectionsFromResultParticipant(
  participant = null,
  resultParticipant = {},
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
  const nodeRecordIndex = buildNodeRecordIndex(resultParticipant);
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
      const resultNode = nodeRecordIndex.get(normalizeText(slotNode?.id));
      if (!resultNode) {
        return;
      }
      const matchedChoiceId =
        visibleChoiceIds.find((choiceId) =>
          ledgersEqual(getBinaryChoiceInventory(choiceId), resultNode?.inventory)
        ) ?? "";
      if (matchedChoiceId) {
        nextSelections[slotNode.id] = matchedChoiceId;
      }
    });
  });
  participant.binarySelections = nextSelections;
  return participant;
}

function buildIndexedRecords(records = [], recordIdKey = "id", recordLabel = "record") {
  const index = new Map();
  (Array.isArray(records) ? records : []).forEach((record) => {
    const recordId = normalizeText(record?.[recordIdKey]);
    if (!recordId) {
      throw new Error(`Solver result ${recordLabel} is missing ${recordIdKey}.`);
    }
    if (index.has(recordId)) {
      throw new Error(`Solver result ${recordLabel} ${recordId} is duplicated.`);
    }
    index.set(recordId, record);
  });
  return index;
}

function validateIndexedCoverage(index = new Map(), knownIds = new Set(), recordLabel = "record") {
  index.forEach((_, recordId) => {
    if (!knownIds.has(recordId)) {
      throw new Error(`Solver result ${recordLabel} ${recordId} does not match any returned object.`);
    }
  });
}

function buildOperatorAnchorIdIndex(result = {}) {
  const anchorIdByOperatorId = new Map();
  const operatorIds = new Set(
    (Array.isArray(result?.operators) ? result.operators : [])
      .map((operator) => normalizeText(operator?.id))
      .filter(Boolean)
  );

  function rememberAnchor(operatorId = "", anchorId = "") {
    const normalizedOperatorId = normalizeText(operatorId);
    const normalizedAnchorId = normalizeText(anchorId);
    if (!normalizedOperatorId || !normalizedAnchorId) {
      return;
    }
    const existingAnchorId = anchorIdByOperatorId.get(normalizedOperatorId);
    if (existingAnchorId && existingAnchorId !== normalizedAnchorId) {
      throw new Error(
        `Solver result operator ${normalizedOperatorId} uses inconsistent anchor ids (${existingAnchorId}, ${normalizedAnchorId}).`
      );
    }
    anchorIdByOperatorId.set(normalizedOperatorId, normalizedAnchorId);
  }

  (Array.isArray(result?.operators) ? result.operators : []).forEach((operator) => {
    const operatorId = normalizeText(operator?.id);
    (Array.isArray(operator?.inputs) ? operator.inputs : []).forEach((endpoint) => {
      if (operatorIds.has(normalizeText(endpoint?.participantId))) {
        rememberAnchor(endpoint?.participantId, endpoint?.anchorId);
      }
    });
    (Array.isArray(operator?.outputs) ? operator.outputs : []).forEach((endpoint) => {
      if (operatorIds.has(normalizeText(endpoint?.participantId))) {
        rememberAnchor(endpoint?.participantId, endpoint?.anchorId);
      }
    });
    if (!anchorIdByOperatorId.has(operatorId)) {
      anchorIdByOperatorId.set(operatorId, "root");
    }
  });

  (Array.isArray(result?.mappings) ? result.mappings : []).forEach((mapping) => {
    if (operatorIds.has(normalizeText(mapping?.from?.participantId))) {
      rememberAnchor(mapping?.from?.participantId, mapping?.from?.anchorId);
    }
    if (operatorIds.has(normalizeText(mapping?.to?.participantId))) {
      rememberAnchor(mapping?.to?.participantId, mapping?.to?.anchorId);
    }
  });

  return anchorIdByOperatorId;
}

function buildParticipantFromResultRecord(resultParticipant = {}, placement = {}, options = {}) {
  const binarySelectionRuntime = options?.binarySelectionRuntime ?? {};
  const participantId = normalizeText(resultParticipant?.id);
  const templateId = normalizeText(resultParticipant?.templateId);
  const polarity = supportsParticipantPolarity(templateId)
    ? normalizeParticipantPolarity(resultParticipant?.polarity)
    : "";
  const label = resolveParticipantDisplayLabel(resultParticipant, templateId, polarity);
  const rootNodeId =
    normalizeText(resultParticipant?.rootNodeId) || `${participantId || "solver_result"}_structure`;
  const structure = buildReactionParticipantStructure(templateId, {
    id: rootNodeId,
    label,
    polarity,
  });
  const normalizedPlacementClass = normalizeLowerText(placement?.placementClass);
  const participant = {
    id: participantId,
    side: normalizedPlacementClass === "product" ? "product" : "reactant",
    ...(normalizedPlacementClass === "center"
      ? {
          surfaceColumn: "center-assembly",
          centerUsage: "optional",
        }
      : {}),
    templateId,
    polarity: supportsParticipantPolarity(templateId) ? polarity : "",
    baseLabel: label,
    label,
    provenanceId: `solver-result-participant:${participantId}`,
    tags: buildTagList(resultParticipant?.tags),
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: {},
    surfaceRowIndex: Math.max(0, Math.round(Number(placement?.row ?? 0) || 0)),
    isSolveGenerated: !normalizeLowerText(resultParticipant?.origin).startsWith("authored-"),
  };
  if (!isReactionObjectPlacementAllowed(participant.templateId, getReactionParticipantPlacementClass(participant))) {
    throw new Error(
      `Solver result participant ${participant.id || "(missing id)"} uses invalid placement ${getReactionParticipantPlacementClass(participant)} for ${participant.templateId}.`
    );
  }
  return applyBinarySelectionsFromResultParticipant(
    participant,
    resultParticipant,
    binarySelectionRuntime
  );
}

function buildOperatorFromResultRecord(resultOperator = {}, placement = {}, options = {}) {
  const operatorId = normalizeText(resultOperator?.id);
  const rootNodeId = normalizeText(options?.anchorIdByOperatorId?.get(operatorId)) || "root";
  const templateId = normalizeLowerText(resultOperator?.type) || "associate";
  const label = normalizeText(resultOperator?.label) || templateId || "Operator";
  const structure = buildReactionParticipantStructure(templateId, {
    id: rootNodeId,
    label,
  });
  return {
    id: operatorId,
    side: "operator",
    templateId,
    label,
    provenanceId: `solver-result-operator:${operatorId}`,
    tags: buildTagList(resultOperator?.tags),
    operatorLaneIndex: Math.max(0, Math.round(Number(placement?.lane ?? 0) || 0)),
    operatorSlotIndex: Math.max(0, Math.round(Number(placement?.slot ?? 0) || 0)),
    surfaceRowIndex: Math.max(0, Math.round(Number(placement?.row ?? 0) || 0)),
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    isSolveGenerated: normalizeLowerText(resultOperator?.origin) === "solve-generated",
  };
}

function buildParticipantsById(participants = []) {
  return new Map(
    (Array.isArray(participants) ? participants : [])
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );
}

function assertAnchorExists(participant = null, anchorId = "") {
  const normalizedAnchorId = normalizeText(anchorId);
  if (!participant || !normalizedAnchorId) {
    throw new Error("Solver result mapping endpoint is missing participant or anchor identity.");
  }
  const rootNode = participant?.hierarchy?.[0] ?? null;
  if (normalizeText(rootNode?.id) === normalizedAnchorId) {
    return;
  }
  if (findReactionStructureDescriptorNode(participant?.hierarchy, normalizedAnchorId)) {
    return;
  }
  throw new Error(
    `Solver result endpoint ${normalizedAnchorId} does not exist on participant ${normalizeText(participant?.id) || "(missing id)"}.`
  );
}

function buildMappingsFromResult(result = {}, participantsById = new Map()) {
  return (Array.isArray(result?.mappings) ? result.mappings : [])
    .map((mapping) => {
      const sourceParticipantId = normalizeText(mapping?.from?.participantId);
      const targetParticipantId = normalizeText(mapping?.to?.participantId);
      const sourceAnchorId = normalizeText(mapping?.from?.anchorId);
      const targetAnchorId = normalizeText(mapping?.to?.anchorId);
      if (!sourceParticipantId || !targetParticipantId || !sourceAnchorId || !targetAnchorId) {
        throw new Error("Solver result mapping is missing explicit endpoint identity.");
      }
      const sourceParticipant = participantsById.get(sourceParticipantId) ?? null;
      const targetParticipant = participantsById.get(targetParticipantId) ?? null;
      if (!sourceParticipant || !targetParticipant) {
        throw new Error(
          `Solver result mapping ${normalizeText(mapping?.id) || "(missing id)"} references an unknown participant.`
        );
      }
      assertAnchorExists(sourceParticipant, sourceAnchorId);
      assertAnchorExists(targetParticipant, targetAnchorId);
      return {
        id: normalizeText(mapping?.id) || `solver_result_mapping_${sourceParticipantId}_${targetParticipantId}`,
        sourceKey: buildReactionNodeKey(sourceParticipantId, sourceAnchorId),
        targetKey: buildReactionNodeKey(targetParticipantId, targetAnchorId),
        sourceRole: normalizeText(mapping?.from?.role),
        targetRole: normalizeText(mapping?.to?.role),
        sourceAnchorInstanceIndex: mapping?.from?.anchorInstanceIndex ?? null,
        targetAnchorInstanceIndex: mapping?.to?.anchorInstanceIndex ?? null,
      };
    })
    .filter(Boolean);
}

export function buildReactionSnapshotFromSolverResult(result = {}) {
  if (normalizeText(result?.schema) !== SOLVER_RESULT_SCHEMA) {
    throw new Error("Reaction solver result import expects solver-result/v1 input.");
  }

  const binarySelectionRuntime = createReactionBinarySelectionRuntime({
    supportsParticipantPolarity,
    normalizeParticipantPolarity,
  });
  const resultParticipants = Array.isArray(result?.participants) ? result.participants : [];
  const resultOperators = Array.isArray(result?.operators) ? result.operators : [];
  const participantPlacements = buildIndexedRecords(
    result?.placement?.participantPlacements,
    "participantId",
    "participant placement"
  );
  const operatorPlacements = buildIndexedRecords(
    result?.placement?.operatorPlacements,
    "operatorId",
    "operator placement"
  );
  const participantIds = new Set(resultParticipants.map((participant) => normalizeText(participant?.id)).filter(Boolean));
  const operatorIds = new Set(resultOperators.map((operator) => normalizeText(operator?.id)).filter(Boolean));
  validateIndexedCoverage(participantPlacements, participantIds, "participant placement");
  validateIndexedCoverage(operatorPlacements, operatorIds, "operator placement");

  const operatorAnchorIdById = buildOperatorAnchorIdIndex(result);
  const participants = [
    ...resultParticipants.map((resultParticipant) => {
      const participantId = normalizeText(resultParticipant?.id);
      const placement = participantPlacements.get(participantId) ?? null;
      if (!placement) {
        throw new Error(`Solver result is missing placement for participant ${participantId || "(missing id)"}.`);
      }
      return buildParticipantFromResultRecord(resultParticipant, placement, {
        binarySelectionRuntime,
      });
    }),
    ...resultOperators.map((resultOperator) => {
      const operatorId = normalizeText(resultOperator?.id);
      const placement = operatorPlacements.get(operatorId) ?? null;
      if (!placement) {
        throw new Error(`Solver result is missing placement for operator ${operatorId || "(missing id)"}.`);
      }
      return buildOperatorFromResultRecord(resultOperator, placement, {
        anchorIdByOperatorId: operatorAnchorIdById,
      });
    }),
  ];

  const participantsById = buildParticipantsById(participants);
  (Array.isArray(result?.dissociation?.openedParticipantIds)
    ? result.dissociation.openedParticipantIds
    : []
  ).forEach((participantId) => {
    const participant = participantsById.get(normalizeText(participantId));
    if (participant) {
      participant.isDissociatedComposite = true;
      participant.isAutoDissociatedComposite = false;
    }
  });
  (Array.isArray(result?.dissociation?.autoDissociatedParticipantIds)
    ? result.dissociation.autoDissociatedParticipantIds
    : []
  ).forEach((participantId) => {
    const participant = participantsById.get(normalizeText(participantId));
    if (participant && !participant.isDissociatedComposite) {
      participant.isAutoDissociatedComposite = true;
    }
  });

  return {
    participants,
    mappings: buildMappingsFromResult(result, participantsById),
  };
}
