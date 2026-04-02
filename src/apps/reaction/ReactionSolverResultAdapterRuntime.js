function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeOperatorPlacementRecord(record = {}) {
  const operatorId = normalizeText(record?.operatorId);
  if (!operatorId) {
    return null;
  }
  return {
    operatorId,
    lane: Math.max(0, Math.round(Number(record?.lane) || 0)),
    row: Math.max(0, Math.round(Number(record?.row) || 0)),
    slot: Math.max(0, Math.round(Number(record?.slot) || 0)),
  };
}

function normalizeProjectionEndpoint(
  endpoint = {},
  solveGeneratedOperatorIds = new Set()
) {
  const participantId = normalizeText(endpoint?.participantId);
  if (!participantId) {
    return null;
  }
  const normalizedEndpoint = {
    role: endpoint?.role,
    anchorInstanceIndex: endpoint?.anchorInstanceIndex ?? null,
  };
  if (solveGeneratedOperatorIds.has(participantId)) {
    normalizedEndpoint.participantRef = participantId;
    normalizedEndpoint.anchorId = normalizeText(endpoint?.anchorId);
    return normalizedEndpoint;
  }
  normalizedEndpoint.participantId = participantId;
  normalizedEndpoint.anchorId = normalizeText(endpoint?.anchorId);
  return normalizedEndpoint;
}

export function buildReactionSolveProjectionPlanFromSolverResult(result = {}) {
  const operators = Array.isArray(result?.operators) ? result.operators : [];
  const operatorPlacements = Array.isArray(result?.placement?.operatorPlacements)
    ? result.placement.operatorPlacements
    : [];
  const placementByOperatorId = new Map(
    operatorPlacements
      .map((record) => normalizeOperatorPlacementRecord(record))
      .filter(Boolean)
      .map((record) => [record.operatorId, record])
  );
  const solveGeneratedOperators = operators.filter(
    (operator) =>
      normalizeText(operator?.id) && normalizeText(operator?.origin) === "solve-generated"
  );
  const solveGeneratedOperatorIds = new Set(
    solveGeneratedOperators.map((operator) => normalizeText(operator.id))
  );
  const autoDissociatedParticipantIds = Array.isArray(
    result?.dissociation?.autoDissociatedParticipantIds
  )
    ? result.dissociation.autoDissociatedParticipantIds
        .map((participantId) => normalizeText(participantId))
        .filter(Boolean)
    : [];

  return {
    participantAdditions: solveGeneratedOperators.map((operator) => {
      const operatorId = normalizeText(operator.id);
      const placement = placementByOperatorId.get(operatorId) ?? null;
      return {
        ref: operatorId,
        kind: "operator",
        templateId: normalizeText(operator.type),
        operatorLaneIndex: placement?.lane ?? 0,
        operatorRowIndex: placement?.row ?? 0,
        operatorSlotIndex: placement?.slot ?? placement?.row ?? 0,
      };
    }),
    dissociatedCompositeParticipants: autoDissociatedParticipantIds,
    dissociation: {
      autoDissociatedParticipantIds,
    },
    selectedMappings: (Array.isArray(result?.mappings) ? result.mappings : [])
      .map((mapping) => {
        const sourceEndpoint = normalizeProjectionEndpoint(
          mapping?.from,
          solveGeneratedOperatorIds
        );
        const targetEndpoint = normalizeProjectionEndpoint(
          mapping?.to,
          solveGeneratedOperatorIds
        );
        if (!sourceEndpoint || !targetEndpoint) {
          return null;
        }
        return {
          sourceEndpoint,
          targetEndpoint,
        };
      })
      .filter(Boolean),
  };
}
