import {
  createComposerDefaultCoreSpec,
  sanitizeComposerEntityId,
  sanitizeComposerId,
} from "./ComposerDraftScaffoldRuntime.js";

const REACTION_FLOW_SCHEMA = "reaction-flow/v1";
const COMPOSER_IMPORT_RESULT_SCHEMA = "composer-import-result/v1";
const COLUMN_X_BY_LAYOUT = Object.freeze({
  left: -5.2,
  center: 0,
  right: 5.2,
});
const ROW_SPACING = 2.6;
const COLUMN_SPREAD_X = 2.5;

function normalizeString(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function normalizeNonNegativeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function roundNumber(value, digits = 3) {
  return Number(Number(value ?? 0).toFixed(digits));
}

function buildIssueCollector(target) {
  return (code, message, path = "") => {
    target.push(
      Object.fromEntries(
        Object.entries({
          code: normalizeString(code, "import-note"),
          message: normalizeString(message, "Composer normalized the imported reaction flow."),
          path: normalizeString(path, ""),
        }).filter(([, value]) => value !== "")
      )
    );
  };
}

function allocateUniqueId(rawValue, fallback, usedIds) {
  const baseId = sanitizeComposerEntityId(rawValue, fallback);
  let candidate = baseId;
  let suffix = 2;
  while (usedIds.has(candidate)) {
    candidate = `${baseId}_${suffix}`;
    suffix += 1;
  }
  usedIds.add(candidate);
  return candidate;
}

function inferStageAction(stage = {}) {
  const haystack = `${stage?.id ?? ""} ${stage?.label ?? ""}`.trim().toLowerCase();
  if (haystack.includes("setup") || haystack.includes("incoming")) {
    return "setup";
  }
  if (haystack.includes("dissociate") || haystack.includes("disassembly")) {
    return "dissociate";
  }
  if (haystack.includes("associate") || haystack.includes("reassembly") || haystack.includes("stabil")) {
    return "associate";
  }
  return "mapping";
}

function normalizeParticipantLayout(participant = {}) {
  const layout = participant?.layout ?? {};
  const lane = Math.max(1, Math.round(Number(layout.lane ?? 0) || 0));
  const column =
    normalizeString(layout.column, "") ||
    (lane === 1 ? "left" : lane === 5 ? "right" : "center");
  return {
    column:
      column === "left" || column === "right" || column === "center"
        ? column
        : "center",
    row: Math.max(0, Math.round(Number(layout.row ?? 0) || 0)),
  };
}

function getParticipantLane(participant = {}) {
  return Math.max(1, Math.round(Number(participant?.layout?.lane ?? 0) || 0));
}

function isSolveGeneratedParticipant(participant = {}) {
  const tags = Array.isArray(participant?.tags) ? participant.tags : [];
  return participant?.state?.solveGenerated === true || tags.includes("solve-generated");
}

function isComposerBoundaryParticipant(participant = {}) {
  const side = normalizeString(participant?.side, "");
  const lane = getParticipantLane(participant);
  if (side === "reactant") {
    return lane === 1 && isSolveGeneratedParticipant(participant) === false;
  }
  if (side === "product") {
    return lane === 5 && isSolveGeneratedParticipant(participant) === false;
  }
  return false;
}

function buildStageRecords(reactionFlow = {}) {
  const sourceStages = Array.isArray(reactionFlow?.stages) ? reactionFlow.stages : [];
  if (!sourceStages.length) {
    return [
      {
        id: "stage_1",
        label: "Imported Reaction",
        order: 0,
        start: 0,
        end: 1,
        action: "mapping",
      },
    ];
  }
  return sourceStages
    .map((stage, index) => {
      const timing = stage?.timing ?? {};
      const startMs = normalizeNonNegativeNumber(timing.startMs, 0);
      const endMs = normalizeNonNegativeNumber(timing.endMs, startMs);
      return {
        id: normalizeString(stage?.id, `stage_${index + 1}`),
        label: normalizeString(stage?.label, `Stage ${index + 1}`),
        order: Math.max(0, Math.round(Number(stage?.order ?? index) || index)),
        start: roundNumber(startMs / 1000),
        end: roundNumber(Math.max(endMs, startMs) / 1000),
        action: inferStageAction(stage),
      };
    })
    .sort((left, right) => {
      if (left.order !== right.order) {
        return left.order - right.order;
      }
      if (left.start !== right.start) {
        return left.start - right.start;
      }
      return left.id.localeCompare(right.id);
    });
}

function collectParticipantAnchorIds(reactionFlow = {}) {
  const anchorsByParticipantId = new Map();
  const addAnchor = (participantId, anchorId) => {
    const normalizedParticipantId = normalizeString(participantId, "");
    const normalizedAnchorId = normalizeString(anchorId, "");
    if (!normalizedParticipantId || !normalizedAnchorId) {
      return;
    }
    if (!anchorsByParticipantId.has(normalizedParticipantId)) {
      anchorsByParticipantId.set(normalizedParticipantId, new Set());
    }
    anchorsByParticipantId.get(normalizedParticipantId).add(normalizedAnchorId);
  };

  const mappings = Array.isArray(reactionFlow?.mappings) ? reactionFlow.mappings : [];
  mappings.forEach((mapping) => {
    addAnchor(mapping?.from?.participantId, mapping?.from?.anchorId);
    addAnchor(mapping?.to?.participantId, mapping?.to?.anchorId);
  });

  const operators = Array.isArray(reactionFlow?.operators) ? reactionFlow.operators : [];
  operators.forEach((operator) => {
    const inputs = Array.isArray(operator?.inputs) ? operator.inputs : [];
    const outputs = Array.isArray(operator?.outputs) ? operator.outputs : [];
    inputs.forEach((endpoint) => {
      addAnchor(endpoint?.participantId, endpoint?.anchorId);
    });
    outputs.forEach((endpoint) => {
      addAnchor(endpoint?.participantId, endpoint?.anchorId);
    });
  });

  return anchorsByParticipantId;
}

function buildParticipantIdMaps(participants = []) {
  const usedAssemblyIds = new Set();
  const participantIdToAssemblyId = new Map();
  const assemblyIdToParticipantId = new Map();
  participants.forEach((participant, index) => {
    const participantId = normalizeString(participant?.id, "");
    if (!participantId) {
      return;
    }
    const assemblyId = allocateUniqueId(
      participantId,
      `assembly_${index + 1}`,
      usedAssemblyIds
    );
    participantIdToAssemblyId.set(participantId, assemblyId);
    assemblyIdToParticipantId.set(assemblyId, participantId);
  });
  return {
    participantIdToAssemblyId,
    assemblyIdToParticipantId,
  };
}

function buildParticipantMemberMaps(participants = [], anchorsByParticipantId = new Map()) {
  const memberMaps = new Map();
  participants.forEach((participant, index) => {
    const participantId = normalizeString(participant?.id, "");
    if (!participantId) {
      return;
    }
    const usedMemberIds = new Set();
    const anchorIdToMemberId = new Map();
    const anchorIds = [
      ...(anchorsByParticipantId.get(participantId) ?? new Set()),
    ];
    if (!anchorIds.length) {
      anchorIds.push("root");
    }
    anchorIds.forEach((anchorId, anchorIndex) => {
      anchorIdToMemberId.set(
        anchorId,
        allocateUniqueId(anchorId, `member_${anchorIndex + 1}`, usedMemberIds)
      );
    });
    memberMaps.set(participantId, anchorIdToMemberId);
  });
  return memberMaps;
}

function buildColumnRowOffsets(participants = []) {
  const maxRowByColumn = new Map();
  participants.forEach((participant) => {
    const layout = normalizeParticipantLayout(participant);
    maxRowByColumn.set(
      layout.column,
      Math.max(layout.row, maxRowByColumn.get(layout.column) ?? 0)
    );
  });
  return maxRowByColumn;
}

function computeImportedAssemblyPosition(layout, maxRowByColumn = new Map()) {
  const maxRow = maxRowByColumn.get(layout.column) ?? layout.row;
  const centeredRowOffset = layout.row - maxRow / 2;
  if (layout.column === "left") {
    return [
      roundNumber(COLUMN_X_BY_LAYOUT.left + centeredRowOffset * COLUMN_SPREAD_X),
      0,
      0,
    ];
  }
  if (layout.column === "right") {
    return [
      roundNumber(COLUMN_X_BY_LAYOUT.right + centeredRowOffset * COLUMN_SPREAD_X),
      0,
      0,
    ];
  }
  return [
    COLUMN_X_BY_LAYOUT.center,
    roundNumber((maxRow / 2 - layout.row) * ROW_SPACING),
    0,
  ];
}

function buildAssemblyDrafts({
  participants = [],
  participantIdToAssemblyId = new Map(),
  memberMaps = new Map(),
}) {
  const maxRowByColumn = buildColumnRowOffsets(participants);
  return participants.map((participant, index) => {
    const participantId = normalizeString(participant?.id, "");
    const assemblyId = participantIdToAssemblyId.get(participantId) ?? `assembly_${index + 1}`;
    const layout = normalizeParticipantLayout(participant);
    const position = computeImportedAssemblyPosition(layout, maxRowByColumn);
    const members = [...(memberMaps.get(participantId)?.values() ?? ["root"])];
    const tags = Array.isArray(participant?.tags) ? participant.tags : [];
    const looksComposite =
      tags.includes("composite") ||
      tags.includes("center-assembly") ||
      members.length > 1;

    return {
      id: assemblyId,
      name: normalizeString(participant?.label, assemblyId),
      role: normalizeString(participant?.structureKey, participant?.side ?? "assembly"),
      sceneRole: "assembly",
      parentId: "",
      position,
      members,
      subassemblies: [],
      pathPoints: [],
      pathInterpolate: "spline",
      pathClosed: false,
      historyTraceEnabled: false,
      envelopeEnabled: looksComposite,
      core: createComposerDefaultCoreSpec(assemblyId),
      metadata: {
        importedParticipantId: participantId,
        importedSide: normalizeString(participant?.side, "intermediate"),
        importedStructureKey: normalizeString(participant?.structureKey, ""),
        importedTags: tags,
        importedLayout: layout,
      },
    };
  });
}

function buildTransferTime(mapping = {}, stageById = new Map()) {
  const stageId = normalizeString(mapping?.stageId, "");
  if (!stageId || !stageById.has(stageId)) {
    return null;
  }
  const stage = stageById.get(stageId);
  return roundNumber((stage.start + stage.end) / 2);
}

function buildParticipantIncomingMappings(mappings = []) {
  const incomingByParticipantId = new Map();
  mappings.forEach((mapping) => {
    const participantId = normalizeString(mapping?.to?.participantId, "");
    if (!participantId) {
      return;
    }
    const existingMappings = incomingByParticipantId.get(participantId) ?? [];
    existingMappings.push(mapping);
    incomingByParticipantId.set(participantId, existingMappings);
  });
  return incomingByParticipantId;
}

function buildParticipantCatalog(reactionFlow = {}) {
  const participants = Array.isArray(reactionFlow?.participants) ? reactionFlow.participants : [];
  const operators = Array.isArray(reactionFlow?.operators) ? reactionFlow.operators : [];
  const participantById = new Map(participants.map((participant) => [normalizeString(participant?.id, ""), participant]));
  const operatorById = new Map(operators.map((operator) => [normalizeString(operator?.id, ""), operator]));
  return {
    participantById,
    operatorById,
  };
}

function collectBoundarySourcesForTargetParticipant(
  startParticipantId = "",
  {
    incomingByParticipantId = new Map(),
    participantById = new Map(),
    boundarySourceIds = new Set(),
  } = {}
) {
  const sourceRecords = new Map();
  const visitedParticipantIds = new Set();
  const pendingParticipantIds = [normalizeString(startParticipantId, "")].filter(Boolean);

  while (pendingParticipantIds.length) {
    const currentParticipantId = pendingParticipantIds.pop();
    if (!currentParticipantId || visitedParticipantIds.has(currentParticipantId)) {
      continue;
    }
    visitedParticipantIds.add(currentParticipantId);
    const incomingMappings = incomingByParticipantId.get(currentParticipantId) ?? [];
    incomingMappings.forEach((mapping) => {
      const sourceParticipantId = normalizeString(mapping?.from?.participantId, "");
      if (!sourceParticipantId) {
        return;
      }
      if (boundarySourceIds.has(sourceParticipantId)) {
        if (!sourceRecords.has(sourceParticipantId)) {
          sourceRecords.set(sourceParticipantId, {
            participantId: sourceParticipantId,
            anchorId: normalizeString(mapping?.from?.anchorId, "root"),
          });
        }
        return;
      }
      const sourceParticipant = participantById.get(sourceParticipantId) ?? null;
      if (sourceParticipant && getParticipantLane(sourceParticipant) === 1) {
        return;
      }
      pendingParticipantIds.push(sourceParticipantId);
    });
  }

  return sourceRecords;
}

function buildTransfers({
  reactionFlow = {},
  importedParticipants = [],
  participantIdToAssemblyId = new Map(),
  memberMaps = new Map(),
  stageById = new Map(),
  addFallback = () => {},
}) {
  const mappings = Array.isArray(reactionFlow?.mappings) ? reactionFlow.mappings : [];
  const { participantById } = buildParticipantCatalog(reactionFlow);
  const incomingByParticipantId = buildParticipantIncomingMappings(mappings);
  const boundarySourceIds = new Set(
    importedParticipants
      .filter((participant) => normalizeString(participant?.side, "") === "reactant")
      .map((participant) => normalizeString(participant?.id, ""))
      .filter(Boolean)
  );
  const boundaryTargets = importedParticipants.filter(
    (participant) => normalizeString(participant?.side, "") === "product"
  );
  const usedTransferIds = new Set();
  const transferStageIds = new Map();
  const transfers = [];

  boundaryTargets.forEach((targetParticipant, targetIndex) => {
    const targetParticipantId = normalizeString(targetParticipant?.id, "");
    const targetAssemblyId = participantIdToAssemblyId.get(targetParticipantId) ?? "";
    if (!targetParticipantId || !targetAssemblyId) {
      return;
    }
    const incomingMappings = incomingByParticipantId.get(targetParticipantId) ?? [];
    if (!incomingMappings.length) {
      return;
    }

    const sourceRecordsByParticipantId = new Map();
    incomingMappings.forEach((targetMapping) => {
      const upstreamParticipantId = normalizeString(targetMapping?.from?.participantId, "");
      const upstreamSourceRecords = collectBoundarySourcesForTargetParticipant(upstreamParticipantId, {
        incomingByParticipantId,
        participantById,
        boundarySourceIds,
      });
      upstreamSourceRecords.forEach((sourceRecord, sourceParticipantId) => {
        if (!sourceRecordsByParticipantId.has(sourceParticipantId)) {
          sourceRecordsByParticipantId.set(sourceParticipantId, {
            ...sourceRecord,
            targetMapping,
          });
        }
      });
    });

    if (!sourceRecordsByParticipantId.size && boundarySourceIds.size === 1) {
      const [sourceParticipantId] = [...boundarySourceIds];
      sourceRecordsByParticipantId.set(sourceParticipantId, {
        participantId: sourceParticipantId,
        anchorId: "root",
        targetMapping: incomingMappings[0],
      });
      addFallback(
        "five-lane-source-collapsed",
        "Composer collapsed a lane-1 helper branch back to the primary imported reactant.",
        `participants[${targetIndex}]`
      );
    }

    sourceRecordsByParticipantId.forEach((sourceRecord, sourceIndex) => {
      const sourceParticipantId = normalizeString(sourceRecord?.participantId, "");
      const sourceAssemblyId = participantIdToAssemblyId.get(sourceParticipantId) ?? "";
      const sourceMemberId =
        memberMaps.get(sourceParticipantId)?.get(sourceRecord?.anchorId) ??
        [...(memberMaps.get(sourceParticipantId)?.values() ?? [])][0] ??
        "";
      const targetMemberId =
        memberMaps.get(targetParticipantId)?.get(sourceRecord?.targetMapping?.to?.anchorId) ??
        [...(memberMaps.get(targetParticipantId)?.values() ?? [])][0] ??
        "";
      if (!sourceAssemblyId || !targetAssemblyId || !sourceMemberId || !targetMemberId) {
        return;
      }
      const transferId = allocateUniqueId(
        sourceRecord?.targetMapping?.id,
        `transfer_${targetIndex + 1}_${sourceIndex + 1}`,
        usedTransferIds
      );
      const stageId = normalizeString(sourceRecord?.targetMapping?.stageId, "");
      if (stageId) {
        transferStageIds.set(transferId, stageId);
      }
      transfers.push({
        id: transferId,
        source: {
          assemblyId: sourceAssemblyId,
          memberId: sourceMemberId,
        },
        target: {
          assemblyId: targetAssemblyId,
          memberId: targetMemberId,
        },
        t: buildTransferTime(sourceRecord?.targetMapping, stageById),
      });
    });
  });

  return {
    transfers,
    transferStageIds,
  };
}

function buildReactionStages(stageRecords = [], transferIds = [], transferStageIds = new Map()) {
  return stageRecords.map((stage) => ({
    id: stage.id,
    action: stage.action,
    start: stage.start,
    end: stage.end,
    transferIds: transferIds.filter((transferId) => transferStageIds.get(transferId) === stage.id),
  }));
}

function buildMarkers(stageRecords = []) {
  return stageRecords.map((stage, index) => ({
    id: sanitizeComposerEntityId(`marker_${stage.id}`, `marker_${index + 1}`),
    t: stage.start,
    end: stage.end,
    kind: "graphic",
    label: stage.label,
  }));
}

function buildCameraShots({
  stageRecords = [],
  initialFramingTargets = [],
  participantIdToAssemblyId = new Map(),
  addFallback = () => {},
}) {
  const requiredAssemblyIds = initialFramingTargets
    .map((participantId) => participantIdToAssemblyId.get(participantId) ?? "")
    .filter(Boolean);
  if (!requiredAssemblyIds.length) {
    return [];
  }
  const sceneStart = stageRecords[0]?.start ?? 0;
  const sceneEnd = stageRecords[stageRecords.length - 1]?.end ?? Math.max(1, sceneStart + 1);
  addFallback(
    "observer-hints-normalized",
    "Composer normalized the reaction framing hints into its observer model.",
    "hints.initialFramingTargets"
  );
  return [
    {
      id: "shot_imported_reaction",
      kind: "static",
      timing: {
        start: sceneStart,
        fadeIn: 0,
        hold: Math.max(0, roundNumber(sceneEnd - sceneStart)),
        fadeOut: 0,
      },
      framing: {
        preset: "medium",
        autoscale: "keep_required",
        defaultAssemblyPolicy: "optional",
        requiredAssemblyIds,
        optionalAssemblyIds: [],
      },
    },
  ];
}

export function importReactionFlowToComposerDraft(reactionFlow = {}, options = {}) {
  if (normalizeString(reactionFlow?.schema, "") !== REACTION_FLOW_SCHEMA) {
    throw new Error(`Unsupported reaction handoff schema: ${normalizeString(reactionFlow?.schema, "unknown")}`);
  }

  const warnings = [];
  const rejectedFeatures = [];
  const fallbacks = [];
  const addWarning = buildIssueCollector(warnings);
  const addRejectedFeature = buildIssueCollector(rejectedFeatures);
  const addFallback = buildIssueCollector(fallbacks);
  const nowIso = typeof options?.nowIso === "function" ? options.nowIso : () => new Date().toISOString();

  const allParticipants = Array.isArray(reactionFlow?.participants) ? reactionFlow.participants : [];
  if (!allParticipants.length) {
    throw new Error("Reaction handoff did not include any participants.");
  }
  const participants = allParticipants.filter((participant) => isComposerBoundaryParticipant(participant));
  if (!participants.length) {
    throw new Error("Reaction handoff did not include any importable reactant or product participants.");
  }

  const stageRecords = buildStageRecords(reactionFlow);
  const stageById = new Map(stageRecords.map((stage) => [stage.id, stage]));
  const { participantIdToAssemblyId } = buildParticipantIdMaps(participants);
  const memberMaps = buildParticipantMemberMaps(participants, collectParticipantAnchorIds(reactionFlow));
  const assembliesDraft = buildAssemblyDrafts({
    participants,
    participantIdToAssemblyId,
    memberMaps,
  });
  const { transfers, transferStageIds } = buildTransfers({
    reactionFlow,
    importedParticipants: participants,
    participantIdToAssemblyId,
    memberMaps,
    stageById,
    addFallback,
  });
  const reactionStages = buildReactionStages(stageRecords, transfers.map((transfer) => transfer.id), transferStageIds);
  const sceneStart = stageRecords[0]?.start ?? 0;
  const sceneEnd = stageRecords[stageRecords.length - 1]?.end ?? Math.max(sceneStart + 1, 1);
  const initialFramingTargets = Array.isArray(reactionFlow?.hints?.initialFramingTargets)
    ? reactionFlow.hints.initialFramingTargets
    : [];
  const cameraShots = buildCameraShots({
    stageRecords,
    initialFramingTargets,
    participantIdToAssemblyId,
    addFallback,
  });

  if (Array.isArray(reactionFlow?.operators) && reactionFlow.operators.length) {
    addFallback(
      "operator-runtime-normalized",
      "Composer preserved operator provenance in imported reaction metadata rather than instantiating operator runtime objects.",
      "operators"
    );
  }

  const sceneId = sanitizeComposerId(
    reactionFlow?.hints?.suggestedSceneId ?? reactionFlow?.reactionId ?? reactionFlow?.title ?? "composer_scene"
  );
  const reactionId = normalizeString(reactionFlow?.reactionId, "reaction_import");
  const reactionTitle = normalizeString(reactionFlow?.title, "Imported Reaction");
  const reactionParticipants = participants
    .map((participant) => {
      const participantId = normalizeString(participant?.id, "");
      const assemblyId = participantIdToAssemblyId.get(participantId) ?? "";
      if (!assemblyId) {
        return null;
      }
      return {
        assembly: assemblyId,
        role: normalizeString(participant?.side, "intermediate"),
      };
    })
    .filter(Boolean);
  const markers = buildMarkers(stageRecords);

  const importResult = {
    schema: COMPOSER_IMPORT_RESULT_SCHEMA,
    sourceSchema: REACTION_FLOW_SCHEMA,
    importedReactionId: reactionId,
    sceneId,
    warnings,
    rejectedFeatures,
    fallbacks,
  };

  const metadata = {
    importedReactionFlow: {
      importedAt: nowIso(),
      sourceSchema: REACTION_FLOW_SCHEMA,
      importedReactionId: reactionId,
      title: reactionTitle,
      sourceDocumentIds: Array.isArray(reactionFlow?.provenance?.sourceDocumentIds)
        ? reactionFlow.provenance.sourceDocumentIds
        : [],
      semanticTags: Array.isArray(reactionFlow?.hints?.semanticTags)
        ? reactionFlow.hints.semanticTags
        : [],
      operators: Array.isArray(reactionFlow?.operators) ? reactionFlow.operators : [],
      importResult,
    },
  };

  const draftState = {
    id: sceneId,
    name: reactionTitle,
    assembliesDraft,
    time: {
      timeBase: "seconds",
      start: sceneStart,
      end: Math.max(sceneEnd, sceneStart + 1),
      playbackRate: 1,
      loop: false,
    },
    markers,
    pauses: [],
    timeWarps: [],
    transfers,
    reactions: [
      {
        id: sanitizeComposerEntityId(reactionId, "reaction_1"),
        label: reactionTitle,
        start: sceneStart,
        end: Math.max(sceneEnd, sceneStart + 1),
        transferIds: transfers.map((transfer) => transfer.id),
        stages: reactionStages,
        participants: reactionParticipants,
      },
    ],
    overlays: [],
    cameraWaypoints: [],
    cameraShots,
    metadata,
    transferListRaw: null,
    pauseListRaw: "",
    warpListRaw: "",
    markerListRaw: "",
    selectedPointIndex: null,
    diagnostics: {},
  };

  return {
    draftState,
    importResult,
  };
}

export function summarizeComposerReactionImport(importResult = {}) {
  const warnings = Array.isArray(importResult?.warnings) ? importResult.warnings.length : 0;
  const rejectedFeatures = Array.isArray(importResult?.rejectedFeatures)
    ? importResult.rejectedFeatures.length
    : 0;
  const fallbacks = Array.isArray(importResult?.fallbacks) ? importResult.fallbacks.length : 0;
  const summary = [`Imported ${normalizeString(importResult?.importedReactionId, "reaction handoff")}`];
  const notes = [];
  if (fallbacks > 0) {
    notes.push(`${fallbacks} fallback${fallbacks === 1 ? "" : "s"}`);
  }
  if (warnings > 0) {
    notes.push(`${warnings} warning${warnings === 1 ? "" : "s"}`);
  }
  if (rejectedFeatures > 0) {
    notes.push(`${rejectedFeatures} rejected feature${rejectedFeatures === 1 ? "" : "s"}`);
  }
  if (notes.length) {
    summary.push(`with ${notes.join(", ")}`);
  }
  return `${summary.join(" ")}.`;
}
