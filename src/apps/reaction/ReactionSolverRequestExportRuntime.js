import { classifyReactionNode } from "./ReactionStructureMappingRuntime.js";
import { findReactionStructureDescriptorNode } from "./ReactionStructureDescriptorRuntime.js";
import { parseReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { deriveStructureClassification } from "../../domain/structure/StructureClassification.js";
import {
  getReactionParticipantFamilyTag,
  inferReactionGenerationFromLabel,
  getReactionParticipantPlacementClass,
  isReactionObjectPlacementAllowed,
} from "./ReactionObjectRegistryRuntime.js";

const DEFAULT_POLICY = Object.freeze({
  recruitmentMode: "forbid",
  lateBosonCollapseMode: "allow-exact",
  weakChannelMode: "v1-core-provenance-only",
  carryThroughMode: "exact-first",
});

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function toLedgerCounts(inventory = null) {
  return {
    electrinoCount: Math.max(
      0,
      Math.round(
        Number(
          inventory?.electrinoCount ??
            inventory?.electrino ??
            0
        ) || 0
      )
    ),
    positrinoCount: Math.max(
      0,
      Math.round(
        Number(
          inventory?.positrinoCount ??
            inventory?.positrino ??
            0
        ) || 0
      )
    ),
  };
}

function buildTagList(values = []) {
  return [...new Set(values.map((value) => normalizeText(value)).filter(Boolean))];
}

function buildInventoryRecord(inventory = null, flags = []) {
  const normalizedFlags = buildTagList(flags);
  const counts = toLedgerCounts(inventory);
  return normalizedFlags.length ? { ...counts, flags: normalizedFlags } : counts;
}

function inferGenerationFromLabel(templateId = "", label = "") {
  return inferReactionGenerationFromLabel(templateId, label);
}

function inferGenerationFromStructure(participant = null) {
  const derived = deriveStructureClassification(participant?.structure ?? null);
  const generation = derived?.classification?.generation;
  return Number.isInteger(generation) && generation > 0 ? String(generation) : "";
}

function buildParticipantInventoryFlags(participant = null, templateId = "", node = null, parentId = "") {
  const normalizedTemplateId = normalizeLowerText(templateId);
  if (!normalizedTemplateId) {
    return [];
  }
  const rootGeneration =
    !parentId && participant ? inferGenerationFromStructure(participant) : "";
  const generation =
    inferGenerationFromLabel(normalizedTemplateId, normalizeText(node?.label)) ||
    inferGenerationFromLabel(normalizedTemplateId, normalizeText(participant?.label)) ||
    inferGenerationFromLabel(normalizedTemplateId, normalizeText(participant?.baseLabel)) ||
    rootGeneration;
  return buildTagList([
    generation ? `generation:${generation}` : "",
    normalizedTemplateId === "electron" ? "charged-lepton" : "",
    normalizedTemplateId === "neutrino" ? "neutrino" : "",
  ]);
}

function detectParticipantFamily(participant = null) {
  return getReactionParticipantFamilyTag(participant?.templateId);
}

function normalizeParticipantSide(participant = null) {
  const placementClass = getReactionParticipantPlacementClass(participant);
  if (placementClass === "center") {
    return "center";
  }
  if (placementClass === "product") {
    return "product";
  }
  return "reactant";
}

function buildParticipantPlacementRecord(participant = null) {
  return {
    placementClass: getReactionParticipantPlacementClass(participant),
    row: Math.max(0, Math.round(Number(participant?.surfaceRowIndex ?? 0) || 0)),
  };
}

function isOperatorParticipant(participant = null) {
  return participant?.side === "operator";
}

function isSolveGeneratedParticipant(participant = null) {
  return Boolean(participant?.isSolveGenerated);
}

function findHierarchyNodeById(participant = null, nodeId = "") {
  const normalizedNodeId = normalizeText(nodeId);
  if (!normalizedNodeId) {
    return null;
  }
  const rootNode = Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] ?? null : null;
  if (normalizeText(rootNode?.id) === normalizedNodeId) {
    return rootNode;
  }
  return findReactionStructureDescriptorNode(participant?.hierarchy, normalizedNodeId) ?? null;
}

function serializeParticipantNodes(participant = null, resolveBinaryChoiceInventory = null) {
  const rootNode = Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] ?? null : null;
  if (!rootNode?.id) {
    return [];
  }

  function visit(node = null, parentId = "") {
    if (!node?.id) {
      return [];
    }
    const spec = classifyReactionNode(participant, node, {
      resolveBinaryChoiceInventory,
    });
    const inferredTemplateId =
      normalizeText(node.templateId) ||
      (!parentId ? normalizeText(participant?.templateId) : "");
    if (!inferredTemplateId) {
      return [];
    }
    const record = {
      id: normalizeText(node.id),
      templateId: inferredTemplateId,
      label:
        (!parentId ? normalizeText(participant?.label) : "") ||
        normalizeText(node.label) ||
        inferredTemplateId,
      inventory: buildInventoryRecord(
        spec?.inventory,
        buildParticipantInventoryFlags(participant, inferredTemplateId, node, parentId)
      ),
    };
    const family =
      normalizeText(node.family) || detectParticipantFamily({ templateId: inferredTemplateId });
    if (parentId) {
      record.parentId = parentId;
    }
    if (family) {
      record.family = family;
    }
    const recordPolarity =
      (!parentId ? normalizeText(participant?.polarity) : "") || normalizeText(node.polarity);
    if (recordPolarity) {
      record.polarity = recordPolarity;
    }
    if (Array.isArray(node.children) && node.children.length) {
      record.isComposite = true;
    } else if (typeof node.isComposite === "boolean") {
      record.isComposite = node.isComposite;
    }
    const tags = buildTagList([
      parentId ? "" : "root",
      node?.hasBinary === false ? "aggregate-ledger" : "",
      spec?.provenanceMode === "guessed" ? "guessed-ledger" : "",
    ]);
    if (tags.length) {
      record.tags = tags;
    }
    return [
      record,
      ...(
        Array.isArray(node.children)
          ? node.children.flatMap((childNode) => visit(childNode, record.id))
          : []
      ),
    ];
  }

  return visit(rootNode);
}

function serializeParticipantRecord(participant = null, resolveBinaryChoiceInventory = null, options = {}) {
  if (!participant || isOperatorParticipant(participant) || isSolveGeneratedParticipant(participant)) {
    return null;
  }
  const rootNode = Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] ?? null : null;
  if (!rootNode?.id) {
    return null;
  }
  const rootSpec = classifyReactionNode(participant, rootNode, {
    resolveBinaryChoiceInventory,
  });
  const side = normalizeParticipantSide(participant);
  const nodes = serializeParticipantNodes(participant, resolveBinaryChoiceInventory);
  const family = detectParticipantFamily(participant);
  const tags = buildTagList([
    "authored",
    side === "center" ? "center-assembly" : "",
    participant?.isDissociatedComposite ? "manual-dissociated" : "",
    participant?.isAutoDissociatedComposite ? "auto-dissociated" : "",
  ]);
  if (!isReactionObjectPlacementAllowed(participant?.templateId, side)) {
    throw new Error(
      `Solver request export cannot place ${normalizeText(participant?.id) || "(missing id)"} as ${side} for ${normalizeText(participant?.templateId) || "(missing template)"}.`
    );
  }
  return {
    id: normalizeText(participant.id),
    side,
    placement: buildParticipantPlacementRecord(participant),
    ...(side === "center"
      ? {
          centerUsage:
            normalizeText(
              typeof options.getCenterUsage === "function"
                ? options.getCenterUsage(participant)
                : participant?.centerUsage
            ) || "optional",
        }
      : {}),
    templateId: normalizeText(participant.templateId) || "participant",
    label: normalizeText(participant.label) || normalizeText(participant.templateId) || "Participant",
    ...(family ? { family } : {}),
    ...(normalizeText(participant.polarity) ? { polarity: normalizeText(participant.polarity) } : {}),
    isComposite: Array.isArray(rootNode.children) && rootNode.children.length > 0,
    inventory: buildInventoryRecord(
      rootSpec?.inventory,
      buildParticipantInventoryFlags(participant, normalizeText(participant.templateId), rootNode, "")
    ),
    rootNodeId: normalizeText(rootNode.id),
    nodes,
    ...(tags.length ? { tags } : {}),
  };
}

function buildParticipantIndex(participants = []) {
  return new Map(
    (Array.isArray(participants) ? participants : [])
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );
}

function parseMappingEndpoint(nodeKey = "", role = "", participantsById = new Map()) {
  const parsed = parseReactionNodeKey(nodeKey);
  const participantId = normalizeText(parsed?.participantId);
  const anchorId = normalizeText(parsed?.nodeId);
  if (!participantId || !anchorId) {
    return null;
  }
  const participant = participantsById.get(participantId) ?? null;
  return {
    participantId,
    anchorId,
    role: normalizeText(role),
    participant,
    node: findHierarchyNodeById(participant, anchorId),
  };
}

function buildConservedLedger(mapping = {}, sourceEndpoint = null, targetEndpoint = null, resolveBinaryChoiceInventory = null) {
  const endpointWithInventory =
    targetEndpoint?.participant && targetEndpoint?.node
      ? targetEndpoint
      : sourceEndpoint?.participant && sourceEndpoint?.node
        ? sourceEndpoint
        : null;
  const spec = endpointWithInventory
    ? classifyReactionNode(endpointWithInventory.participant, endpointWithInventory.node, {
        resolveBinaryChoiceInventory,
      })
    : null;
  return toLedgerCounts(spec?.inventory);
}

function buildManualOperators(participants = [], mappings = [], participantsById = new Map()) {
  const authoredOperators = (Array.isArray(participants) ? participants : []).filter(
    (participant) => isOperatorParticipant(participant) && !isSolveGeneratedParticipant(participant)
  );
  return authoredOperators.map((participant) => {
    const operatorId = normalizeText(participant.id);
    const inputs = (Array.isArray(mappings) ? mappings : [])
      .map((mapping) => ({
        mapping,
        source: parseMappingEndpoint(mapping?.sourceKey, mapping?.sourceRole, participantsById),
        target: parseMappingEndpoint(mapping?.targetKey, mapping?.targetRole, participantsById),
      }))
      .filter(
        ({ source, target }) =>
          normalizeText(target?.participantId) === operatorId &&
          normalizeText(target?.role) === "operator-input" &&
          source?.participant &&
          !isSolveGeneratedParticipant(source.participant)
      )
      .map(({ mapping, source }) => ({
        participantId: source.participantId,
        anchorId: source.anchorId,
        role: source.role,
        ...(mapping?.targetAnchorInstanceIndex !== null &&
        mapping?.targetAnchorInstanceIndex !== undefined
          ? { anchorInstanceIndex: mapping.targetAnchorInstanceIndex }
          : {}),
      }));
    const outputs = (Array.isArray(mappings) ? mappings : [])
      .map((mapping) => ({
        mapping,
        source: parseMappingEndpoint(mapping?.sourceKey, mapping?.sourceRole, participantsById),
        target: parseMappingEndpoint(mapping?.targetKey, mapping?.targetRole, participantsById),
      }))
      .filter(
        ({ source, target }) =>
          normalizeText(source?.participantId) === operatorId &&
          normalizeText(source?.role) === "operator-output" &&
          target?.participant &&
          !isSolveGeneratedParticipant(target.participant)
      )
      .map(({ mapping, target }) => ({
        participantId: target.participantId,
        anchorId: target.anchorId,
        role: target.role,
        ...(mapping?.sourceAnchorInstanceIndex !== null &&
        mapping?.sourceAnchorInstanceIndex !== undefined
          ? { anchorInstanceIndex: mapping.sourceAnchorInstanceIndex }
          : {}),
      }));
    const placement = {
      lane: Math.max(0, Math.round(Number(participant?.operatorLaneIndex ?? 0) || 0)),
      row: Math.max(
        0,
        Math.round(Number(participant?.surfaceRowIndex ?? participant?.operatorSlotIndex ?? 0) || 0)
      ),
      slot: Math.max(0, Math.round(Number(participant?.operatorSlotIndex ?? 0) || 0)),
    };
    return {
      id: operatorId,
      type: normalizeLowerText(participant?.templateId) || "associate",
      ...(normalizeText(participant?.label) ? { label: normalizeText(participant.label) } : {}),
      inputs,
      outputs,
      placement,
    };
  });
}

function serializeManualMappings(mappings = [], participantsById = new Map(), resolveBinaryChoiceInventory = null) {
  const operatorIds = new Set(
    [...participantsById.values()]
      .filter((participant) => isOperatorParticipant(participant) && !isSolveGeneratedParticipant(participant))
      .map((participant) => normalizeText(participant.id))
  );
  return (Array.isArray(mappings) ? mappings : [])
    .map((mapping, index) => {
      const sourceEndpoint = parseMappingEndpoint(mapping?.sourceKey, mapping?.sourceRole, participantsById);
      const targetEndpoint = parseMappingEndpoint(mapping?.targetKey, mapping?.targetRole, participantsById);
      if (!sourceEndpoint || !targetEndpoint) {
        return null;
      }
      if (
        (sourceEndpoint.participant && isSolveGeneratedParticipant(sourceEndpoint.participant)) ||
        (targetEndpoint.participant && isSolveGeneratedParticipant(targetEndpoint.participant))
      ) {
        return null;
      }
      const sourceIsOperator = operatorIds.has(sourceEndpoint.participantId);
      const targetIsOperator = operatorIds.has(targetEndpoint.participantId);
      const kind =
        sourceIsOperator || targetIsOperator
          ? "operator-path"
          : sourceEndpoint.anchorId !== normalizeText(sourceEndpoint.participant?.hierarchy?.[0]?.id)
            ? "fragment"
            : "direct";
      const viaOperatorId =
        targetIsOperator
          ? targetEndpoint.participantId
          : sourceIsOperator
            ? sourceEndpoint.participantId
            : "";
      return {
        id: normalizeText(mapping?.id) || `manual_map_${index + 1}`,
        kind,
        from: {
          participantId: sourceEndpoint.participantId,
          anchorId: sourceEndpoint.anchorId,
          role: sourceEndpoint.role,
          ...(mapping?.sourceAnchorInstanceIndex !== null &&
          mapping?.sourceAnchorInstanceIndex !== undefined
            ? { anchorInstanceIndex: mapping.sourceAnchorInstanceIndex }
            : {}),
        },
        to: {
          participantId: targetEndpoint.participantId,
          anchorId: targetEndpoint.anchorId,
          role: targetEndpoint.role,
          ...(mapping?.targetAnchorInstanceIndex !== null &&
          mapping?.targetAnchorInstanceIndex !== undefined
            ? { anchorInstanceIndex: mapping.targetAnchorInstanceIndex }
            : {}),
        },
        ...(viaOperatorId ? { viaOperatorId } : {}),
        provenanceMode: "manual-authored",
        conservedLedger: buildConservedLedger(
          mapping,
          sourceEndpoint,
          targetEndpoint,
          resolveBinaryChoiceInventory
        ),
      };
    })
    .filter(Boolean);
}

function buildDissociationRecord(participants = []) {
  const manuallyOpenedParticipantIds = (Array.isArray(participants) ? participants : [])
    .filter((participant) => !isOperatorParticipant(participant) && Boolean(participant?.isDissociatedComposite))
    .map((participant) => normalizeText(participant.id))
    .filter(Boolean);
  return {
    manuallyOpenedParticipantIds,
    manuallyOpenedNodeIds: [],
    preserveManualState: true,
  };
}

function buildPolicyRecord(overrides = {}) {
  return {
    ...DEFAULT_POLICY,
    ...Object.fromEntries(
      Object.entries(overrides ?? {}).filter(([, value]) => value !== undefined && value !== null)
    ),
  };
}

export function buildReactionSolverRequestDocument(options = {}) {
  const snapshot = options?.snapshot ?? {};
  const participants = Array.isArray(snapshot?.participants) ? snapshot.participants : [];
  const mappings = Array.isArray(snapshot?.mappings) ? snapshot.mappings : [];
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;
  const requestId = normalizeText(options?.requestId) || "reaction_solver_request";
  const origin =
    options?.origin === null
      ? undefined
      : {
          sourceKind: normalizeText(options?.origin?.sourceKind) || "reaction",
          ...(normalizeText(options?.origin?.sourceDocumentId)
            ? { sourceDocumentId: normalizeText(options.origin.sourceDocumentId) }
            : {}),
          ...(normalizeText(options?.origin?.title) ? { title: normalizeText(options.origin.title) } : {}),
        };
  const participantRecords = participants
    .map((participant) =>
      serializeParticipantRecord(participant, resolveBinaryChoiceInventory, {
        getCenterUsage: options?.getCenterUsage,
      })
    )
    .filter(Boolean);
  const participantsById = buildParticipantIndex(participants);

  return {
    schema: "solver-request/v1",
    requestId,
    ...(origin ? { origin } : {}),
    participants: participantRecords,
    manualOperators: buildManualOperators(participants, mappings, participantsById),
    manualMappings: serializeManualMappings(mappings, participantsById, resolveBinaryChoiceInventory),
    dissociation: buildDissociationRecord(participants),
    policy: buildPolicyRecord(options?.policy),
  };
}

export function createReactionSolverRequestExportRuntime(options = {}) {
  const getSnapshot =
    typeof options?.getSnapshot === "function"
      ? options.getSnapshot
      : () => ({ participants: [], mappings: [] });

  return {
    exportDocument(overrides = {}) {
      return buildReactionSolverRequestDocument({
        ...options,
        ...overrides,
        snapshot: getSnapshot(),
      });
    },
  };
}
