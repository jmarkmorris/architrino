import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "./ReactionStructureDescriptorRuntime.js";

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
      Math.round(Number(inventory?.electrinoCount ?? inventory?.electrino ?? 0) || 0)
    ),
    positrinoCount: Math.max(
      0,
      Math.round(Number(inventory?.positrinoCount ?? inventory?.positrino ?? 0) || 0)
    ),
  };
}

function flattenDescriptorNodes(rootNode = null, parentId = "") {
  if (!rootNode?.id || !rootNode?.templateId) {
    return [];
  }
  const nodeRecord = {
    id: String(rootNode.id),
    templateId: String(rootNode.templateId),
    label: normalizeText(rootNode.label) || String(rootNode.templateId),
    inventory: toLedgerCounts(rootNode.inventory),
  };
  if (parentId) {
    nodeRecord.parentId = parentId;
  }
  if (rootNode.family) {
    nodeRecord.family = String(rootNode.family);
  }
  if (rootNode.polarity) {
    nodeRecord.polarity = String(rootNode.polarity);
  }
  if (Array.isArray(rootNode.children) && rootNode.children.length) {
    nodeRecord.isComposite = true;
  } else if (typeof rootNode.isComposite === "boolean") {
    nodeRecord.isComposite = rootNode.isComposite;
  }
  return [
    nodeRecord,
    ...(
      Array.isArray(rootNode.children)
        ? rootNode.children.flatMap((childNode) =>
            flattenDescriptorNodes(childNode, String(rootNode.id))
          )
        : []
    ),
  ];
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
  return "";
}

function buildParticipantOrigin(entry = null) {
  if (entry?.isCenterAssembly) {
    return "authored-center";
  }
  if (entry?.participant?.side === "product") {
    return "authored-product";
  }
  return "authored-reactant";
}

function serializeSolveStateParticipant(entry = null) {
  const participant = entry?.participant ?? null;
  const rootNode = entry?.rootNode ?? null;
  if (!participant?.id || !rootNode?.id) {
    return null;
  }
  return {
    id: String(participant.id),
    origin: buildParticipantOrigin(entry),
    side: entry?.isCenterAssembly ? "center" : String(participant.side ?? "reactant"),
    templateId: String(participant.templateId ?? rootNode.templateId ?? "participant"),
    label: normalizeText(participant.label) || normalizeText(rootNode.label) || String(participant.templateId),
    ...(detectParticipantFamily(participant) ? { family: detectParticipantFamily(participant) } : {}),
    ...(participant.polarity ? { polarity: String(participant.polarity) } : {}),
    isComposite: Array.isArray(rootNode.children) && rootNode.children.length > 0,
    inventory: toLedgerCounts(rootNode.inventory),
    rootNodeId: String(rootNode.id),
    nodes: flattenDescriptorNodes(rootNode),
  };
}

function buildRecognizedBosonLabel(templateId = "") {
  if (normalizeLowerText(templateId) === "w_minus_boson") {
    return "W- Boson";
  }
  if (normalizeLowerText(templateId) === "w_plus_boson") {
    return "W+ Boson";
  }
  if (normalizeLowerText(templateId) === "z_boson") {
    return "Z Boson";
  }
  return normalizeText(templateId) || "Boson";
}

function buildRecognizedBosonParticipant(recognition = {}, index = 0) {
  const templateId = normalizeText(recognition?.templateId);
  if (!templateId) {
    return null;
  }
  const participantId = `recognized:${templateId}:${index + 1}`;
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${participantId}_structure`,
    label: buildRecognizedBosonLabel(templateId),
    polarity: "pro",
  });
  const hierarchy = buildReactionStructureDescriptorTree(structure.root);
  const rootNode = hierarchy[0] ?? null;
  if (!rootNode?.id) {
    return null;
  }
  return {
    participant: {
      id: participantId,
      templateId,
      label: buildRecognizedBosonLabel(templateId),
      side: "center",
    },
    record: {
      id: participantId,
      origin: "solve-generated-intermediate",
      side: "center",
      templateId,
      label: buildRecognizedBosonLabel(templateId),
      ...(detectParticipantFamily({ templateId }) ? { family: detectParticipantFamily({ templateId }) } : {}),
      isComposite: Array.isArray(rootNode.children) && rootNode.children.length > 0,
      inventory: toLedgerCounts(rootNode.inventory),
      rootNodeId: String(rootNode.id),
      nodes: flattenDescriptorNodes(rootNode),
      tags: ["late-boson-collapse"],
    },
  };
}

function hasNonZeroLedger(ledger = null) {
  const normalizedLedger = toLedgerCounts(ledger);
  return normalizedLedger.electrinoCount > 0 || normalizedLedger.positrinoCount > 0;
}

function getRecognizedBosonLedgerDecrement(templateId = "") {
  const normalizedTemplateId = normalizeLowerText(templateId);
  if (normalizedTemplateId === "w_minus_boson") {
    return {
      electrinoCount: 6,
      positrinoCount: 0,
    };
  }
  if (normalizedTemplateId === "w_plus_boson") {
    return {
      electrinoCount: 0,
      positrinoCount: 6,
    };
  }
  return {
    electrinoCount: 0,
    positrinoCount: 0,
  };
}

function canApplyLedgerDecrement(availableLedger = null, decrement = null) {
  const available = toLedgerCounts(availableLedger);
  const required = toLedgerCounts(decrement);
  return (
    available.electrinoCount >= required.electrinoCount &&
    available.positrinoCount >= required.positrinoCount
  );
}

function subtractLedgerCounts(availableLedger = null, decrement = null) {
  const available = toLedgerCounts(availableLedger);
  const required = toLedgerCounts(decrement);
  return {
    electrinoCount: Math.max(0, available.electrinoCount - required.electrinoCount),
    positrinoCount: Math.max(0, available.positrinoCount - required.positrinoCount),
  };
}

function formatFreeArchitrinoLedgerLabel(ledger = null) {
  const normalizedLedger = toLedgerCounts(ledger);
  return `Free Architrinos ${normalizedLedger.electrinoCount}:${normalizedLedger.positrinoCount}@`;
}

function buildRemainingFreeArchitrinoParticipant(options = {}) {
  const sourceParticipantId = normalizeText(options?.sourceParticipantId);
  const sourceParticipantRecord = options?.sourceParticipantRecord ?? null;
  const sourceStepId = normalizeText(options?.sourceStepId);
  const sequenceIndex = Math.max(0, Number(options?.sequenceIndex ?? 0) || 0);
  const remainingLedger = toLedgerCounts(options?.remainingLedger);
  if (!sourceParticipantId || !sourceStepId || !hasNonZeroLedger(remainingLedger)) {
    return null;
  }
  const participantId = `recognized:free_architrinos_remaining:${sourceParticipantId}:${sequenceIndex + 1}`;
  const rootNodeId = `${participantId}_root`;
  return {
    id: participantId,
    origin: "solve-generated-intermediate",
    sourceParticipantId,
    sourceStepId,
    side: normalizeText(sourceParticipantRecord?.side) || "center",
    templateId: "free_architrinos",
    label: formatFreeArchitrinoLedgerLabel(remainingLedger),
    family: "free-architrinos",
    isComposite: false,
    inventory: remainingLedger,
    rootNodeId,
    nodes: [
      {
        id: rootNodeId,
        templateId: "free_architrinos",
        label: formatFreeArchitrinoLedgerLabel(remainingLedger),
        family: "free-architrinos",
        inventory: remainingLedger,
      },
    ],
    tags: ["late-boson-collapse-remaining-ledger"],
  };
}

function buildParticipantRecordIndex(participants = []) {
  return new Map(
    (Array.isArray(participants) ? participants : [])
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );
}

function resolveRecognitionSourceParticipantIds(recognition = {}) {
  return Array.isArray(recognition?.sourceParticipantIds)
    ? recognition.sourceParticipantIds.map((value) => normalizeText(value)).filter(Boolean)
    : [];
}

function getRecognitionFreeArchitrinoLedger(recognition = {}, fallbackLedger = null) {
  const recognitionLedger = toLedgerCounts(recognition?.sourcePattern?.freeArchitrinoLedger);
  if (hasNonZeroLedger(recognitionLedger)) {
    return recognitionLedger;
  }
  return toLedgerCounts(fallbackLedger);
}

function buildRecognizedBosonArtifacts(plan = {}, solveState = {}, authoredParticipants = []) {
  const unresolvedReactantCount = Array.isArray(plan?.unresolvedReactants) ? plan.unresolvedReactants.length : 0;
  const unresolvedTargetCount = Array.isArray(plan?.unresolvedProducts) ? plan.unresolvedProducts.length : 0;
  if (unresolvedReactantCount > 0 || unresolvedTargetCount > 0) {
    return {
      participants: [],
      steps: [],
    };
  }
  const participantIndex = buildParticipantRecordIndex(authoredParticipants);
  const centerParticipantIds = new Set(
    (Array.isArray(solveState?.centerAssemblies) ? solveState.centerAssemblies : [])
      .map((entry) => normalizeText(entry?.participant?.id))
      .filter(Boolean)
  );
  const recognizedCenterBosons = Array.isArray(plan?.recognizedCenterBosons)
    ? plan.recognizedCenterBosons
    : [];
  const activeFreeLedgerStateBySourceId = new Map();
  const producedParticipants = [];
  const collapseSteps = [];

  recognizedCenterBosons.forEach((recognition) => {
    const sourceParticipantIds = resolveRecognitionSourceParticipantIds(recognition);
    if (
      !sourceParticipantIds.length ||
      sourceParticipantIds.some((participantId) => !centerParticipantIds.has(participantId))
    ) {
      return;
    }

    const stepIndex = collapseSteps.length;
    const stepId = `step_collapse_boson_${stepIndex + 1}`;
    const bosonParticipant = buildRecognizedBosonParticipant(recognition, stepIndex);
    const bosonParticipantId = normalizeText(bosonParticipant?.record?.id);
    const bosonTemplateId = normalizeText(recognition?.templateId);
    const ledgerDecrement = getRecognizedBosonLedgerDecrement(bosonTemplateId);
    const freeSourceParticipantId =
      sourceParticipantIds.find(
        (participantId) =>
          normalizeLowerText(participantIndex.get(participantId)?.templateId) === "free_architrinos"
      ) ?? "";

    let remainingLedgerParticipant = null;
    let consumedParticipantIds = [...sourceParticipantIds];

    if (hasNonZeroLedger(ledgerDecrement)) {
      const sourceParticipantRecord = participantIndex.get(freeSourceParticipantId) ?? null;
      if (!sourceParticipantRecord) {
        return;
      }
      const currentFreeLedgerState = activeFreeLedgerStateBySourceId.get(freeSourceParticipantId) ?? null;
      const availableLedger = currentFreeLedgerState
        ? toLedgerCounts(currentFreeLedgerState.inventory)
        : getRecognitionFreeArchitrinoLedger(recognition, sourceParticipantRecord?.inventory);
      if (!canApplyLedgerDecrement(availableLedger, ledgerDecrement)) {
        return;
      }
      const activeFreeParticipantId =
        normalizeText(currentFreeLedgerState?.participantId) || freeSourceParticipantId;
      if (!activeFreeParticipantId) {
        return;
      }
      consumedParticipantIds = sourceParticipantIds.map((participantId) =>
        participantId === freeSourceParticipantId ? activeFreeParticipantId : participantId
      );
      const remainingLedger = subtractLedgerCounts(availableLedger, ledgerDecrement);
      if (hasNonZeroLedger(remainingLedger)) {
        remainingLedgerParticipant = buildRemainingFreeArchitrinoParticipant({
          sourceParticipantId: freeSourceParticipantId,
          sourceParticipantRecord,
          sourceStepId: stepId,
          remainingLedger,
          sequenceIndex: stepIndex,
        });
        if (!remainingLedgerParticipant) {
          return;
        }
        activeFreeLedgerStateBySourceId.set(freeSourceParticipantId, {
          participantId: remainingLedgerParticipant.id,
          inventory: remainingLedger,
        });
      } else {
        activeFreeLedgerStateBySourceId.set(freeSourceParticipantId, {
          participantId: "",
          inventory: remainingLedger,
        });
      }
    }

    const producedParticipantIds = [];
    if (bosonParticipant?.record) {
      producedParticipants.push(bosonParticipant.record);
      participantIndex.set(normalizeText(bosonParticipant.record.id), bosonParticipant.record);
      if (bosonParticipantId) {
        producedParticipantIds.push(bosonParticipantId);
      }
    }
    if (remainingLedgerParticipant) {
      producedParticipants.push(remainingLedgerParticipant);
      participantIndex.set(normalizeText(remainingLedgerParticipant.id), remainingLedgerParticipant);
      producedParticipantIds.push(remainingLedgerParticipant.id);
    }

    collapseSteps.push({
      stepId,
      kind: "collapse-boson",
      ruleFamily: normalizeText(recognition?.kind) || "late-center-exact",
      consumedParticipantIds,
      producedParticipantIds,
      resolvedTargetIds: [normalizeText(recognition?.targetParticipantId)].filter(Boolean),
      mappingIds: [],
      operatorIds: [],
      diagnosticLabels: [bosonTemplateId].filter(Boolean),
    });
  });

  return {
    participants: producedParticipants,
    steps: collapseSteps,
  };
}

function buildEndpointFromMappingSide(mapping = {}, side = "source") {
  const endpoint = side === "source" ? mapping?.sourceEndpoint : mapping?.targetEndpoint;
  const participant = endpoint?.participant ?? (side === "source" ? mapping?.sourceParticipant : mapping?.targetParticipant);
  const node = endpoint?.node ?? (side === "source" ? mapping?.sourceNode : mapping?.targetNode);
  const participantId = normalizeText(
    endpoint?.participantRef ?? endpoint?.participantId ?? participant?.id
  );
  const anchorId = normalizeText(endpoint?.anchorId ?? node?.id ?? "root") || "root";
  const role = normalizeText(endpoint?.role ?? (side === "source" ? mapping?.sourceRole : mapping?.targetRole));
  return participantId && anchorId && role
    ? {
        participantId,
        anchorId,
        role,
      }
    : null;
}

function buildMappingKind(mapping = {}) {
  const sourceRole = normalizeLowerText(mapping?.sourceEndpoint?.role ?? mapping?.sourceRole);
  const targetRole = normalizeLowerText(mapping?.targetEndpoint?.role ?? mapping?.targetRole);
  if (sourceRole.startsWith("operator") || targetRole.startsWith("operator")) {
    return "operator-path";
  }
  const sourceParticipantId = normalizeText(mapping?.sourceParticipant?.id);
  const sourceNodeId = normalizeText(mapping?.sourceNode?.id);
  const sourceRootId = normalizeText(mapping?.sourceParticipant?.hierarchy?.[0]?.id);
  if (sourceParticipantId && sourceNodeId && sourceRootId && sourceNodeId !== sourceRootId) {
    return "fragment";
  }
  return "direct";
}

function buildMappingProvenanceMode(mapping = {}) {
  const kind = buildMappingKind(mapping);
  if (kind === "operator-path") {
    return "operator-mediated";
  }
  return "direct-conservative";
}

function buildMappingLedger(mapping = {}) {
  return toLedgerCounts(
    mapping?.targetNode?.inventory ?? mapping?.sourceNode?.inventory ?? mapping?.evaluation?.targetSpec?.inventory
  );
}

function serializeMappings(plan = {}) {
  const selectedMappings = Array.isArray(plan?.selectedMappings) ? plan.selectedMappings : [];
  return selectedMappings.map((mapping, index) => {
    const from = buildEndpointFromMappingSide(mapping, "source");
    const to = buildEndpointFromMappingSide(mapping, "target");
    const viaOperatorId =
      normalizeText(mapping?.sourceEndpoint?.participantRef) ||
      normalizeText(mapping?.targetEndpoint?.participantRef);
    return {
      id: `map_${index + 1}`,
      kind: buildMappingKind(mapping),
      from,
      to,
      ...(viaOperatorId ? { viaOperatorId } : {}),
      provenanceMode: buildMappingProvenanceMode(mapping),
      conservedLedger: buildMappingLedger(mapping),
    };
  });
}

function serializeOperators(plan = {}) {
  const participantAdditions = Array.isArray(plan?.participantAdditions) ? plan.participantAdditions : [];
  return participantAdditions
    .filter((addition) => addition?.kind === "operator" && normalizeText(addition?.ref))
    .map((addition) => {
      const operatorId = normalizeText(addition.ref);
      const relatedMappings = (Array.isArray(plan?.selectedMappings) ? plan.selectedMappings : []).filter(
        (mapping) =>
          normalizeText(mapping?.sourceEndpoint?.participantRef) === operatorId ||
          normalizeText(mapping?.targetEndpoint?.participantRef) === operatorId
      );
      return {
        id: operatorId,
        type: normalizeLowerText(addition.templateId) || "associate",
        origin: "solve-generated",
        label: normalizeText(addition.templateId) || "Operator",
        inputs: relatedMappings
          .filter((mapping) => normalizeText(mapping?.targetEndpoint?.participantRef) === operatorId)
          .map((mapping) => buildEndpointFromMappingSide(mapping, "source"))
          .filter(Boolean),
        outputs: relatedMappings
          .filter((mapping) => normalizeText(mapping?.sourceEndpoint?.participantRef) === operatorId)
          .map((mapping) => buildEndpointFromMappingSide(mapping, "target"))
          .filter(Boolean),
      };
    });
}

function buildAssociateSteps(plan = {}, serializedMappings = [], operators = []) {
  const operatorIds = new Set(operators.map((entry) => String(entry?.id ?? "")));
  const selectedAssociateCandidates = Array.isArray(plan?.selectedAssociateCandidates)
    ? plan.selectedAssociateCandidates
    : [];
  return selectedAssociateCandidates.map((candidate, index) => {
    const candidateOperatorIds = (Array.isArray(candidate?.participantAdditions) ? candidate.participantAdditions : [])
      .map((entry) => normalizeText(entry?.ref))
      .filter((operatorId) => operatorIds.has(operatorId));
    const mappingIds = serializedMappings
      .filter((mapping) => candidateOperatorIds.includes(String(mapping?.viaOperatorId ?? "")))
      .map((mapping) => mapping.id);
    const consumedParticipantIds = (Array.isArray(candidate?.sourceEntries) ? candidate.sourceEntries : [])
      .map((entry) => normalizeText(entry?.participant?.id))
      .filter(Boolean);
    return {
      stepId: `step_associate_${index + 1}`,
      kind: "associate",
      ruleFamily: normalizeText(candidate?.type) || "associate",
      consumedParticipantIds,
      producedParticipantIds: [],
      resolvedTargetIds: [normalizeText(candidate?.targetParticipant?.id)].filter(Boolean),
      mappingIds,
      operatorIds: candidateOperatorIds,
    };
  });
}

function buildDirectSteps(plan = {}, serializedMappings = []) {
  const directCandidates = [
    ...(Array.isArray(plan?.selectedCandidates) ? plan.selectedCandidates : []),
    ...(Array.isArray(plan?.selectedFragmentCandidates) ? plan.selectedFragmentCandidates : []),
    ...(Array.isArray(plan?.selectedPartialCandidates) ? plan.selectedPartialCandidates : []),
    ...(Array.isArray(plan?.selectedProductChildCandidates) ? plan.selectedProductChildCandidates : []),
  ];
  return directCandidates.map((candidate, index) => {
    const targetParticipantId = normalizeText(candidate?.targetParticipant?.id);
    const sourceParticipantIds = [
      normalizeText(candidate?.sourceParticipant?.id),
      ...(
        Array.isArray(candidate?.sourceParticipants)
          ? candidate.sourceParticipants.map((participant) => normalizeText(participant?.id))
          : []
      ),
    ].filter(Boolean);
    const mappingIds = serializedMappings
      .filter((mapping) => normalizeText(mapping?.to?.participantId) === targetParticipantId)
      .map((mapping) => mapping.id);
    return {
      stepId: `step_direct_${index + 1}`,
      kind:
        normalizeLowerText(candidate?.type) === "composite-carry-through" ? "carry-through" : "direct-map",
      ruleFamily: normalizeText(candidate?.type) || "direct",
      consumedParticipantIds: [...new Set(sourceParticipantIds)],
      producedParticipantIds: [],
      resolvedTargetIds: [targetParticipantId].filter(Boolean),
      mappingIds,
      operatorIds: [],
    };
  });
}

function buildResidue(plan = {}) {
  const unresolvedTargetIds = (Array.isArray(plan?.unresolvedProducts) ? plan.unresolvedProducts : [])
    .map((entry) => normalizeText(entry?.participant?.id))
    .filter(Boolean);
  const unusedSourceIds = (Array.isArray(plan?.residue?.source) ? plan.residue.source : [])
    .map((entry) => normalizeText(entry?.participantId))
    .filter(Boolean);
  const sourceInventory = (Array.isArray(plan?.residue?.source) ? plan.residue.source : []).reduce(
    (inventory, entry) => ({
      electrinoCount: inventory.electrinoCount + Number(entry?.inventory?.electrinoCount ?? 0),
      positrinoCount: inventory.positrinoCount + Number(entry?.inventory?.positrinoCount ?? 0),
    }),
    { electrinoCount: 0, positrinoCount: 0 }
  );
  const targetInventory = (Array.isArray(plan?.residue?.target) ? plan.residue.target : []).reduce(
    (inventory, entry) => ({
      electrinoCount: inventory.electrinoCount + Number(entry?.inventory?.electrinoCount ?? 0),
      positrinoCount: inventory.positrinoCount + Number(entry?.inventory?.positrinoCount ?? 0),
    }),
    { electrinoCount: 0, positrinoCount: 0 }
  );
  return {
    unresolvedTargetIds,
    unusedSourceIds,
    sourceInventory,
    targetInventory,
    unsupportedNotes: [],
  };
}

export function buildReactionSolverResultDocument(options = {}) {
  const request = options?.request ?? {};
  const solveState = options?.solveState ?? {};
  const plan = options?.plan ?? {};
  const resultId =
    normalizeText(options?.resultId) ||
    `${normalizeText(request?.requestId) || "solver_request"}_result`;
  const requestId = normalizeText(request?.requestId) || "solver_request";

  const authoredParticipants = [
    ...(Array.isArray(solveState?.reactants) ? solveState.reactants : []),
    ...(Array.isArray(solveState?.centerAssemblies) ? solveState.centerAssemblies : []),
    ...(Array.isArray(solveState?.products) ? solveState.products : []),
  ]
    .map(serializeSolveStateParticipant)
    .filter(Boolean);
  const recognizedBosonArtifacts = buildRecognizedBosonArtifacts(plan, solveState, authoredParticipants);
  const participants = [
    ...authoredParticipants,
    ...recognizedBosonArtifacts.participants,
  ];
  const mappings = serializeMappings(plan);
  const operators = serializeOperators(plan);
  const steps = [
    ...buildDirectSteps(plan, mappings),
    ...buildAssociateSteps(plan, mappings, operators),
    ...recognizedBosonArtifacts.steps,
  ];
  const unresolvedTargetCount = Array.isArray(plan?.unresolvedProducts) ? plan.unresolvedProducts.length : 0;
  const exact = unresolvedTargetCount === 0;

  return {
    schema: "solver-result/v1",
    resultId,
    request: {
      schema: "solver-request/v1",
      requestId,
    },
    summary: {
      outcome: exact ? "exact" : "partial",
      exact,
      selectedPlanId: `plan_${requestId}`,
      unresolvedTargetCount,
      ambiguityCount: 0,
      unsupportedCount: 0,
    },
    participants,
    steps,
    mappings,
    operators,
    dissociation: {
      openedParticipantIds: [],
      autoDissociatedParticipantIds: Array.isArray(plan?.dissociation?.autoDissociatedParticipantIds)
        ? plan.dissociation.autoDissociatedParticipantIds.map((value) => String(value))
        : [],
      releasedParticipantIds: [],
      notes: [],
    },
    placement: {
      operatorPlacements: (Array.isArray(plan?.participantAdditions) ? plan.participantAdditions : [])
        .filter((addition) => addition?.kind === "operator" && normalizeText(addition?.ref))
        .map((addition) => ({
          operatorId: normalizeText(addition.ref),
          lane: Math.max(0, Number(addition?.operatorLaneIndex ?? 0) || 0),
          row: Math.max(0, Number(addition?.operatorRowIndex ?? addition?.operatorSlotIndex ?? 0) || 0),
          slot: Math.max(0, Number(addition?.operatorSlotIndex ?? addition?.operatorRowIndex ?? 0) || 0),
        })),
    },
    residue: buildResidue(plan),
    diagnostics: [],
  };
}
