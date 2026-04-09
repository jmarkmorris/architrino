import { parseReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import {
  getReactionObjectConnectorPolicy,
  getReactionParticipantPlacementClass,
} from "./ReactionObjectRegistryRuntime.js";
import {
  getReactionSnapshotLaneNumber,
  isAdjacentReactionLaneProgress,
} from "./ReactionFlowLaneRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function countSnapshotEndpointMappings(mappings = [], participantId = "", role = "", endpointKey = "source") {
  const normalizedParticipantId = normalizeText(participantId);
  const normalizedRole = normalizeLowerText(role);
  if (!normalizedParticipantId || !normalizedRole) {
    return 0;
  }
  const mappingKey = endpointKey === "target" ? "targetKey" : "sourceKey";
  const roleKey = endpointKey === "target" ? "targetRole" : "sourceRole";
  return (Array.isArray(mappings) ? mappings : []).reduce((count, mapping) => {
    const endpointParticipantId = normalizeText(parseReactionNodeKey(mapping?.[mappingKey]).participantId);
    return endpointParticipantId === normalizedParticipantId &&
      normalizeLowerText(mapping?.[roleKey]) === normalizedRole
      ? count + 1
      : count;
  }, 0);
}

function hasErrorDiagnostics(diagnostics = []) {
  return (Array.isArray(diagnostics) ? diagnostics : []).some(
    (diagnostic) => normalizeLowerText(diagnostic?.severity) === "error"
  );
}

export function buildReactionSurfaceValidation(snapshot = {}) {
  const participants = Array.isArray(snapshot?.participants) ? snapshot.participants : [];
  const mappings = Array.isArray(snapshot?.mappings) ? snapshot.mappings : [];
  const diagnostics = [];
  const participantsById = new Map(
    participants
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );

  mappings.forEach((mapping) => {
    const sourceParticipantId = normalizeText(parseReactionNodeKey(mapping?.sourceKey).participantId);
    const targetParticipantId = normalizeText(parseReactionNodeKey(mapping?.targetKey).participantId);
    const sourceParticipant = participantsById.get(sourceParticipantId) ?? null;
    const targetParticipant = participantsById.get(targetParticipantId) ?? null;
    if (!sourceParticipant || !targetParticipant) {
      return;
    }
    const sourceLane = getReactionSnapshotLaneNumber(sourceParticipant);
    const targetLane = getReactionSnapshotLaneNumber(targetParticipant);
    if (!isAdjacentReactionLaneProgress(sourceLane, targetLane)) {
      diagnostics.push({
        code: "lane-skip",
        severity: "error",
        message: `Mapping ${normalizeText(mapping?.id) || "(missing id)"} skips lanes: ${sourceLane} -> ${targetLane}.`,
        path: "mappings",
      });
    }
  });

  participants
    .filter((participant) => participant?.side !== "operator")
    .forEach((participant) => {
      const participantId = normalizeText(participant?.id);
      const placementClass = getReactionParticipantPlacementClass(participant);
      const connectorPolicy = getReactionObjectConnectorPolicy(participant?.templateId, placementClass);
      if (!participantId || !connectorPolicy) {
        return;
      }
      const inputRole = normalizeLowerText(connectorPolicy?.inputRole);
      const outputRole = normalizeLowerText(connectorPolicy?.outputRole);
      if (inputRole && countSnapshotEndpointMappings(mappings, participantId, inputRole, "target") < 1) {
        diagnostics.push({
          code: "connector-required-open",
          severity: "error",
          message: `Participant ${participantId} leaves required ${inputRole} input open in ${placementClass} placement.`,
          path: "participants",
        });
      }
      if (outputRole && countSnapshotEndpointMappings(mappings, participantId, outputRole, "source") < 1) {
        diagnostics.push({
          code: "connector-required-open",
          severity: "error",
          message: `Participant ${participantId} leaves required ${outputRole} output open in ${placementClass} placement.`,
          path: "participants",
        });
      }
    });

  participants
    .filter((participant) => participant?.side === "operator")
    .forEach((participant) => {
      const operatorId = normalizeText(participant?.id);
      if (!operatorId) {
        return;
      }
      if (countSnapshotEndpointMappings(mappings, operatorId, "operator-input", "target") < 1) {
        diagnostics.push({
          code: "connector-required-open",
          severity: "error",
          message: `Operator ${operatorId} leaves required operator-input open.`,
          path: "operators",
        });
      }
      if (countSnapshotEndpointMappings(mappings, operatorId, "operator-output", "source") < 1) {
        diagnostics.push({
          code: "connector-required-open",
          severity: "error",
          message: `Operator ${operatorId} leaves required operator-output open.`,
          path: "operators",
        });
      }
    });

  const firstError = diagnostics.find(
    (diagnostic) => normalizeLowerText(diagnostic?.severity) === "error"
  );
  return {
    valid: !hasErrorDiagnostics(diagnostics),
    diagnostics,
    message: normalizeText(firstError?.message),
  };
}
