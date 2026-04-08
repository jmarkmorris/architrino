import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import {
  buildReactionStructureDescriptorTree,
  findReactionStructureDescriptorNode,
} from "./ReactionStructureDescriptorRuntime.js";
import {
  REACTION_FLOW_LANE,
  getReactionSnapshotLaneNumber,
  isAdjacentReactionLaneProgress,
} from "./ReactionFlowLaneRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function cloneValue(value) {
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function normalizeAnchorInstanceIndex(anchorInstanceIndex = null) {
  if (
    anchorInstanceIndex === null ||
    anchorInstanceIndex === undefined ||
    anchorInstanceIndex === ""
  ) {
    return null;
  }
  const normalized = Number(anchorInstanceIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : null;
}

function buildParticipantsById(participants = []) {
  return new Map(
    (Array.isArray(participants) ? participants : [])
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );
}

function getRootNodeId(participant = {}) {
  return normalizeText(participant?.hierarchy?.[0]?.id) || "root";
}

function getNodeIdFromNodeKey(nodeKey = "") {
  const [, ...rest] = normalizeText(nodeKey).split("::");
  return rest.join("::");
}

function getParticipantRow(participant = {}) {
  return Math.max(0, Math.round(Number(participant?.surfaceRowIndex ?? 0) || 0));
}

function getCenterOutputAnchorInstanceIndex(participant = {}) {
  return normalizeText(participant?.templateId) === "unbound_architrinos" ? 1 : 1;
}

function createPassThruOperatorParticipant(participantId = "", operatorLaneIndex = 0, row = 0, slot = 0) {
  const structure = buildReactionParticipantStructure("pass_thru", {
    id: `${participantId}_root`,
    label: "Pass Thru",
  });
  return {
    id: participantId,
    side: "operator",
    templateId: "pass_thru",
    label: "Pass Thru",
    provenanceId: `flow-migration-operator:${participantId}`,
    tags: ["operator", "pass_thru", "solve-generated", "flow-migration"],
    operatorLaneIndex,
    operatorSlotIndex: slot,
    surfaceRowIndex: row,
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    isSolveGenerated: true,
  };
}

function resolveCarryIdentity(sourceParticipant = {}, sourceKey = "") {
  const rootNodeId = getRootNodeId(sourceParticipant);
  const sourceNodeId = getNodeIdFromNodeKey(sourceKey);
  const sourceNode =
    sourceNodeId && sourceNodeId !== rootNodeId
      ? findReactionStructureDescriptorNode(sourceParticipant?.hierarchy, sourceNodeId)
      : sourceParticipant?.hierarchy?.[0] ?? null;
  return {
    templateId: normalizeText(sourceNode?.templateId) || normalizeText(sourceParticipant?.templateId),
    label:
      normalizeText(sourceNode?.label) ||
      normalizeText(sourceParticipant?.label) ||
      normalizeText(sourceParticipant?.templateId) ||
      "Participant",
    baseLabel:
      normalizeText(sourceNode?.label) ||
      normalizeText(sourceParticipant?.baseLabel) ||
      normalizeText(sourceParticipant?.label) ||
      normalizeText(sourceParticipant?.templateId) ||
      "Participant",
    polarity: normalizeText(sourceNode?.polarity) || normalizeText(sourceParticipant?.polarity),
  };
}

function createCenterCarryParticipant(sourceParticipant = {}, sourceKey = "", participantId = "", row = 0) {
  const identity = resolveCarryIdentity(sourceParticipant, sourceKey);
  const structure = buildReactionParticipantStructure(identity.templateId, {
    id: `${participantId}_root`,
    label: identity.label,
    polarity: identity.polarity,
  });
  return {
    id: participantId,
    side: "reactant",
    surfaceColumn: "center-assembly",
    centerUsage: "optional",
    templateId: identity.templateId,
    polarity: identity.polarity,
    baseLabel: identity.baseLabel,
    label: identity.label,
    provenanceId: `flow-migration-participant:${participantId}`,
    tags: [
      ...(Array.isArray(sourceParticipant?.tags) ? sourceParticipant.tags : []),
      "center-assembly",
      "solve-generated",
      "flow-migration",
    ],
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: cloneValue(sourceParticipant?.binarySelections ?? {}),
    surfaceRowIndex: row,
    isSolveGenerated: true,
  };
}

function createMappingRecord({
  id,
  sourceKey,
  sourceRole,
  sourceAnchorInstanceIndex = null,
  targetKey,
  targetRole,
  targetAnchorInstanceIndex = null,
} = {}) {
  return {
    id,
    sourceKey,
    sourceRole,
    sourceAnchorInstanceIndex: normalizeAnchorInstanceIndex(sourceAnchorInstanceIndex),
    targetKey,
    targetRole,
    targetAnchorInstanceIndex: normalizeAnchorInstanceIndex(targetAnchorInstanceIndex),
  };
}

export function normalizeReactionSnapshotToStrictFiveLane(snapshot = {}) {
  const participants = cloneValue(Array.isArray(snapshot?.participants) ? snapshot.participants : []);
  const mappings = Array.isArray(snapshot?.mappings) ? snapshot.mappings : [];
  const migratedParticipants = [...participants];
  const migratedMappings = [];
  const participantsById = buildParticipantsById(migratedParticipants);
  let nextSyntheticParticipantId = 1;
  let nextSyntheticOperatorId = 1;
  const nextOperatorSlotByLaneIndex = new Map(
    migratedParticipants
      .filter((participant) => participant?.side === "operator")
      .map((participant) => [
        Number(participant?.operatorLaneIndex ?? 0),
        Math.max(
          Number(participant?.operatorSlotIndex ?? 0) + 1,
          Number(participant?.operatorSlotIndex ?? 0) + 1
        ),
      ])
  );

  function getNextOperatorSlot(laneIndex = 0) {
    const currentValue = nextOperatorSlotByLaneIndex.get(laneIndex) ?? 0;
    nextOperatorSlotByLaneIndex.set(laneIndex, currentValue + 1);
    return currentValue;
  }

  function addCenterCarryParticipant(sourceParticipant = {}, sourceKey = "", row = 0) {
    const participantId = `flow_migration_center_${nextSyntheticParticipantId++}`;
    const participant = createCenterCarryParticipant(sourceParticipant, sourceKey, participantId, row);
    migratedParticipants.push(participant);
    participantsById.set(participantId, participant);
    return participant;
  }

  function addPassThruOperator(laneIndex = 0, row = 0) {
    const operatorId = `flow_migration_pass_thru_${nextSyntheticOperatorId++}`;
    const operator = createPassThruOperatorParticipant(
      operatorId,
      laneIndex,
      row,
      getNextOperatorSlot(laneIndex)
    );
    migratedParticipants.push(operator);
    participantsById.set(operatorId, operator);
    return operator;
  }

  function pushMapping(baseId = "", suffix = "", fromEndpoint = {}, toEndpoint = {}) {
    migratedMappings.push(
      createMappingRecord({
        id: `${normalizeText(baseId) || "flow_migration"}${suffix ? `_${suffix}` : ""}`,
        sourceKey: fromEndpoint.key,
        sourceRole: fromEndpoint.role,
        sourceAnchorInstanceIndex: fromEndpoint.anchorInstanceIndex,
        targetKey: toEndpoint.key,
        targetRole: toEndpoint.role,
        targetAnchorInstanceIndex: toEndpoint.anchorInstanceIndex,
      })
    );
  }

  mappings.forEach((mapping, mappingIndex) => {
    const sourceParticipantId = normalizeText(mapping?.sourceKey).split("::")[0];
    const targetParticipantId = normalizeText(mapping?.targetKey).split("::")[0];
    const sourceParticipant = participantsById.get(sourceParticipantId) ?? null;
    const targetParticipant = participantsById.get(targetParticipantId) ?? null;
    if (!sourceParticipant || !targetParticipant) {
      return;
    }
    const sourceLane = getReactionSnapshotLaneNumber(sourceParticipant);
    const targetLane = getReactionSnapshotLaneNumber(targetParticipant);
    if (isAdjacentReactionLaneProgress(sourceLane, targetLane)) {
      migratedMappings.push(cloneValue(mapping));
      return;
    }

    const baseId = normalizeText(mapping?.id) || `flow_migration_${mappingIndex + 1}`;
    const bridgeRow = Math.min(getParticipantRow(sourceParticipant), getParticipantRow(targetParticipant));
    let currentEndpoint = {
      key: mapping.sourceKey,
      role: mapping.sourceRole,
      anchorInstanceIndex: mapping?.sourceAnchorInstanceIndex ?? null,
      participant: sourceParticipant,
      lane: sourceLane,
    };

    if (currentEndpoint.lane < REACTION_FLOW_LANE.LEFT_OPERATOR && targetLane > REACTION_FLOW_LANE.LEFT_OPERATOR) {
      const leftPassThru = addPassThruOperator(0, bridgeRow);
      pushMapping(baseId, "lane2_in", currentEndpoint, {
        key: `${leftPassThru.id}::${getRootNodeId(leftPassThru)}`,
        role: "operator-input",
        anchorInstanceIndex: 0,
      });
      currentEndpoint = {
        key: `${leftPassThru.id}::${getRootNodeId(leftPassThru)}`,
        role: "operator-output",
        anchorInstanceIndex: 0,
        participant: leftPassThru,
        lane: REACTION_FLOW_LANE.LEFT_OPERATOR,
      };
    }

    if (currentEndpoint.lane < REACTION_FLOW_LANE.CENTER && targetLane > REACTION_FLOW_LANE.CENTER) {
      const carryParticipant = addCenterCarryParticipant(sourceParticipant, mapping.sourceKey, bridgeRow);
      pushMapping(baseId, "lane3", currentEndpoint, {
        key: `${carryParticipant.id}::${getRootNodeId(carryParticipant)}`,
        role: "center",
        anchorInstanceIndex: 0,
      });
      currentEndpoint = {
        key: `${carryParticipant.id}::${getRootNodeId(carryParticipant)}`,
        role: "center",
        anchorInstanceIndex: getCenterOutputAnchorInstanceIndex(carryParticipant),
        participant: carryParticipant,
        lane: REACTION_FLOW_LANE.CENTER,
      };
    }

    if (currentEndpoint.lane < REACTION_FLOW_LANE.RIGHT_OPERATOR && targetLane > REACTION_FLOW_LANE.RIGHT_OPERATOR) {
      const rightPassThru = addPassThruOperator(1, bridgeRow);
      pushMapping(baseId, "lane4_in", currentEndpoint, {
        key: `${rightPassThru.id}::${getRootNodeId(rightPassThru)}`,
        role: "operator-input",
        anchorInstanceIndex: 0,
      });
      currentEndpoint = {
        key: `${rightPassThru.id}::${getRootNodeId(rightPassThru)}`,
        role: "operator-output",
        anchorInstanceIndex: 0,
        participant: rightPassThru,
        lane: REACTION_FLOW_LANE.RIGHT_OPERATOR,
      };
    }

    pushMapping(baseId, "final", currentEndpoint, {
      key: mapping.targetKey,
      role: mapping.targetRole,
      anchorInstanceIndex: mapping?.targetAnchorInstanceIndex ?? null,
    });
  });

  return {
    participants: migratedParticipants,
    mappings: migratedMappings,
  };
}
