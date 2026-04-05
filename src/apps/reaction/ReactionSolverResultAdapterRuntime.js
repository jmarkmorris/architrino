function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function buildSynthesizedDissociateOperatorId(stepId = "", index = 0) {
  const normalizedStepId = normalizeText(stepId);
  return normalizedStepId
    ? `dissociate:${normalizedStepId}`
    : `dissociate:solve_step:${index + 1}`;
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
  const steps = Array.isArray(result?.steps) ? result.steps : [];
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
  const synthesizedDissociateOperators = steps
    .map((step, index) => {
      if (normalizeText(step?.kind) !== "dissociate") {
        return null;
      }
      const consumedParticipantIds = Array.isArray(step?.consumedParticipantIds)
        ? step.consumedParticipantIds.map((participantId) => normalizeText(participantId)).filter(Boolean)
        : [];
      const producedParticipantIds = Array.isArray(step?.producedParticipantIds)
        ? step.producedParticipantIds.map((participantId) => normalizeText(participantId)).filter(Boolean)
        : [];
      if (consumedParticipantIds.length === 0 || producedParticipantIds.length === 0) {
        return null;
      }
      const operatorId = buildSynthesizedDissociateOperatorId(step?.stepId, index);
      return {
        id: operatorId,
        type: "dissociate",
        origin: "solve-generated",
        placement: {
          lane: 0,
          row: index * 2 + 1,
          slot: index * 2 + 1,
        },
        consumedParticipantIds,
        producedParticipantIds,
      };
    })
    .filter(Boolean);
  const solveGeneratedOperatorIds = new Set(
    [...solveGeneratedOperators, ...synthesizedDissociateOperators].map((operator) => normalizeText(operator.id))
  );
  const autoDissociatedParticipantIds = Array.isArray(
    result?.dissociation?.autoDissociatedParticipantIds
  )
    ? result.dissociation.autoDissociatedParticipantIds
        .map((participantId) => normalizeText(participantId))
        .filter(Boolean)
    : [];

  return {
    participantAdditions: [...solveGeneratedOperators, ...synthesizedDissociateOperators].map((operator) => {
      const operatorId = normalizeText(operator.id);
      const placement = placementByOperatorId.get(operatorId) ?? operator.placement ?? null;
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
    selectedMappings: [
      ...(Array.isArray(result?.mappings) ? result.mappings : []),
      ...synthesizedDissociateOperators.flatMap((operator) => [
        ...operator.consumedParticipantIds.map((participantId) => ({
          from: {
            participantId,
            anchorId: "",
            role: "reactant",
          },
          to: {
            participantId: operator.id,
            anchorId: "",
            role: "operator-input",
          },
        })),
        ...operator.producedParticipantIds.map((participantId) => ({
          from: {
            participantId: operator.id,
            anchorId: "",
            role: "operator-output",
          },
          to: {
            participantId,
            anchorId: "",
            role: "reactant",
          },
        })),
      ]),
    ]
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
