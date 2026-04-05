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

function normalizeParticipantPlacementRecord(record = {}) {
  const participantId = normalizeText(record?.participantId);
  const placementClass = normalizeText(record?.placementClass).toLowerCase();
  if (!participantId || !["reactant", "center", "product"].includes(placementClass)) {
    return null;
  }
  return {
    participantId,
    placementClass,
    row: Math.max(0, Math.round(Number(record?.row) || 0)),
  };
}

function normalizeProjectionEndpoint(
  endpoint = {},
  solveGeneratedOperatorIds = new Set()
) {
  const participantId = normalizeText(endpoint?.participantId);
  const participantRef = normalizeText(endpoint?.participantRef);
  if (participantRef) {
    return {
      participantRef,
      anchorId: normalizeText(endpoint?.anchorId),
      role: endpoint?.role,
      anchorInstanceIndex: endpoint?.anchorInstanceIndex ?? null,
    };
  }
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
  const participantPlacements = Array.isArray(result?.placement?.participantPlacements)
    ? result.placement.participantPlacements
    : [];
  const operators = Array.isArray(result?.operators) ? result.operators : [];
  const operatorPlacements = Array.isArray(result?.placement?.operatorPlacements)
    ? result.placement.operatorPlacements
    : [];
  const placementByParticipantId = new Map(
    participantPlacements
      .map((record) => normalizeParticipantPlacementRecord(record))
      .filter(Boolean)
      .map((record) => [record.participantId, record])
  );
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
  const solveGeneratedParticipants = (Array.isArray(result?.participants) ? result.participants : []).filter(
    (participant) =>
      normalizeText(participant?.id) &&
      !["authored-reactant", "authored-product", "authored-center"].includes(
        normalizeText(participant?.origin)
      )
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
    participantAdditions: [
      ...solveGeneratedParticipants.map((participant) => {
        const participantId = normalizeText(participant.id);
        const placement = placementByParticipantId.get(participantId) ?? null;
        return {
          ref: participantId,
          kind: "participant",
          templateId: normalizeText(participant?.templateId),
          label: normalizeText(participant?.label),
          polarity: normalizeText(participant?.polarity),
          placementClass:
            placement?.placementClass ??
            (normalizeText(participant?.side) === "center"
              ? "center"
              : normalizeText(participant?.side) === "product"
                ? "product"
                : "reactant"),
          surfaceRowIndex: placement?.row ?? 0,
          tags: Array.isArray(participant?.tags) ? [...participant.tags] : [],
          participant: {
            ...participant,
          },
        };
      }),
      ...solveGeneratedOperators.map((operator) => {
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
    ],
    participantPlacements: participantPlacements
      .map((record) => normalizeParticipantPlacementRecord(record))
      .filter(Boolean),
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
