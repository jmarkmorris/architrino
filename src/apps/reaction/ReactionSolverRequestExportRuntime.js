import { classifyReactionNode } from "./ReactionStructureMappingRuntime.js";
import { findReactionStructureDescriptorNode } from "./ReactionStructureDescriptorRuntime.js";
import { parseReactionNodeKey } from "./ReactionNodeKeyRuntime.js";

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

function detectParticipantFamily(participant = null) {
  const templateId = normalizeLowerText(participant?.templateId);
  if (templateId.includes("noether_core")) {
    return "noether-core";
  }
  if (templateId.includes("photon") || templateId.includes("boson")) {
    return "boson";
  }
  if (templateId.includes("architrino")) {
    return "free-architrinos";
  }
  if (templateId.includes("neutrino") || templateId.includes("electron")) {
    return "lepton";
  }
  if (templateId.includes("quark")) {
    return "quark";
  }
  if (templateId.includes("pi")) {
    return "meson";
  }
  if (templateId.includes("neutron") || templateId.includes("proton")) {
    return "baryon";
  }
  return "";
}

function normalizeParticipantSide(participant = null) {
  if (participant?.surfaceColumn === "center-assembly") {
    return "center";
  }
  if (participant?.side === "product") {
    return "product";
  }
  return "reactant";
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
    if (!node?.id || !node?.templateId) {
      return [];
    }
    const spec = classifyReactionNode(participant, node, {
      resolveBinaryChoiceInventory,
    });
    const record = {
      id: normalizeText(node.id),
      templateId: normalizeText(node.templateId),
      label: normalizeText(node.label) || normalizeText(node.templateId),
      inventory: toLedgerCounts(spec?.inventory),
    };
    const family = normalizeText(node.family) || detectParticipantFamily({ templateId: node.templateId });
    if (parentId) {
      record.parentId = parentId;
    }
    if (family) {
      record.family = family;
    }
    if (normalizeText(node.polarity)) {
      record.polarity = normalizeText(node.polarity);
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
  return {
    id: normalizeText(participant.id),
    side,
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
    inventory: toLedgerCounts(rootSpec?.inventory),
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
      .map(({ source }) => ({
        participantId: source.participantId,
        anchorId: source.anchorId,
        role: source.role,
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
      .map(({ target }) => ({
        participantId: target.participantId,
        anchorId: target.anchorId,
        role: target.role,
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
        },
        to: {
          participantId: targetEndpoint.participantId,
          anchorId: targetEndpoint.anchorId,
          role: targetEndpoint.role,
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
