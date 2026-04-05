import { createReactionBinarySelectionRuntime } from "./ReactionBinarySelectionRuntime.js";
import {
  getReactionCanonicalBaseLabel,
  getReactionCanonicalLabel,
} from "./ReactionLabelCatalogRuntime.js";
import { buildReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { findReactionStructureDescriptorNode } from "./ReactionStructureDescriptorRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "./ReactionStructureDescriptorRuntime.js";
import { buildReactionLibraryExportOverrides } from "./ReactionFlowLibrarySupportRuntime.js";
import {
  getReactionObjectConnectorPolicy,
  getReactionParticipantPlacementClass,
  isReactionObjectPlacementAllowed,
  normalizeReactionObjectPolarity,
  normalizeReactionObjectTemplateId,
  supportsReactionObjectPolarity,
} from "./ReactionObjectRegistryRuntime.js";

const REACTION_FLOW_SCHEMA = "reaction-flow/v1";
const DEFAULT_OPERATOR_LANE_INDEX = 1;
const REACTION_BUILTIN_LIBRARY_CACHE_BUSTER = "2026-04-05-reaction-library-v2";
const FREE_NEUTRON_BETA_DOCUMENT_PATH =
  "../../../content/contracts/examples/reaction-flow/free_neutron_beta.v1.json";
const MUON_DECAY_DOCUMENT_PATH =
  "../../../content/contracts/examples/reaction-flow/muon_decay.v1.json";
const CHARGED_PION_TO_MUON_NEUTRINO_DOCUMENT_PATH =
  "../../../content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json";

export const REACTION_BUILTIN_LIBRARY_ENTRIES = Object.freeze([
  Object.freeze({
    id: "muon_decay",
    title: "Muon decay",
    description: "Accepted PDG-backed solved muon decay library entry.",
    documentPath: MUON_DECAY_DOCUMENT_PATH,
    isDefault: true,
  }),
  Object.freeze({
    id: "free_neutron_beta",
    title: "Free neutron beta decay",
    description: "Accepted PDG-backed solved free neutron beta decay library entry.",
    documentPath: FREE_NEUTRON_BETA_DOCUMENT_PATH,
  }),
  Object.freeze({
    id: "charged_pion_to_muon_neutrino",
    title: "Charged pion to muon neutrino",
    description: "Accepted PDG-backed solved charged pion decay library entry.",
    documentPath: CHARGED_PION_TO_MUON_NEUTRINO_DOCUMENT_PATH,
  }),
]);

export const DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID =
  REACTION_BUILTIN_LIBRARY_ENTRIES.find((entry) => entry.isDefault)?.id ??
  REACTION_BUILTIN_LIBRARY_ENTRIES[0]?.id ??
  "";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function normalizeLowerText(value = "") {
  return normalizeText(value).toLowerCase();
}

function buildTagList(values = []) {
  return [...new Set(values.map((value) => normalizeText(value)).filter(Boolean))];
}

function resolveImportedParticipantLabel(documentParticipant = {}, templateId = "", polarity = "") {
  const explicitLabel = normalizeText(documentParticipant?.label);
  if (explicitLabel) {
    return explicitLabel;
  }
  return getReactionCanonicalLabel(templateId, {
    polarity,
  });
}

function supportsParticipantPolarity(templateId = "") {
  return supportsReactionObjectPolarity(templateId);
}

function normalizeParticipantPolarity(polarity = "") {
  return normalizeReactionObjectPolarity(polarity);
}

function normalizeNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.round(Number(value) || fallback));
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

function getBuiltInReactionLibraryEntry(entryId = "") {
  return (
    REACTION_BUILTIN_LIBRARY_ENTRIES.find((entry) => entry.id === normalizeText(entryId)) ??
    null
  );
}

function resolveBuiltInEntry(entryId = "") {
  const resolvedEntryId = normalizeText(entryId) || DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID;
  const entry = getBuiltInReactionLibraryEntry(resolvedEntryId);
  if (!entry) {
    throw new Error(`Unknown built-in reaction library entry: ${resolvedEntryId || "(empty)"}`);
  }
  return entry;
}

function resolveParticipantIdentity(documentParticipant = {}) {
  const structureKey = normalizeLowerText(documentParticipant?.structureKey);
  const normalizedTemplateId =
    structureKey.startsWith("anti_") && supportsParticipantPolarity(structureKey.slice(5))
      ? normalizeReactionObjectTemplateId(structureKey.slice(5))
      : normalizeReactionObjectTemplateId(structureKey);
  return {
    templateId: normalizedTemplateId || "particle",
    polarity:
      structureKey.startsWith("anti_") && supportsParticipantPolarity(normalizedTemplateId)
        ? "anti"
        : supportsParticipantPolarity(normalizedTemplateId)
          ? "pro"
          : "",
  };
}

function createParticipantFromReactionFlowDocumentRecord(documentParticipant = {}, options = {}) {
  const binarySelectionRuntime = options?.binarySelectionRuntime ?? {};
  const {
    getInitialParticipantBinarySelections = () => ({}),
  } = binarySelectionRuntime;
  const participantId = normalizeText(documentParticipant?.id);
  const { templateId, polarity } = resolveParticipantIdentity(documentParticipant);
  const baseLabel = resolveImportedParticipantLabel(documentParticipant, templateId, polarity);
  const isCenterAssembly =
    normalizeLowerText(documentParticipant?.side) === "intermediate" ||
    normalizeLowerText(documentParticipant?.layout?.column) === "center";
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${participantId || "reaction_flow_participant"}_structure`,
    label: baseLabel,
    polarity,
  });
  const participant = {
    id: participantId,
    side: normalizeLowerText(documentParticipant?.side) === "product" ? "product" : "reactant",
    templateId,
    polarity: supportsParticipantPolarity(templateId) ? normalizeParticipantPolarity(polarity) : "",
    baseLabel,
    label: baseLabel,
    provenanceId:
      normalizeText(documentParticipant?.provenanceId) || `reaction-flow-participant:${participantId}`,
    tags: buildTagList(documentParticipant?.tags),
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: {},
    surfaceRowIndex: normalizeNonNegativeInteger(documentParticipant?.layout?.row),
    ...(isCenterAssembly
      ? {
          surfaceColumn: "center-assembly",
          centerUsage: "optional",
        }
      : {}),
  };
  const normalizedDissociation = normalizeLowerText(documentParticipant?.state?.dissociation);
  if (normalizedDissociation === "manual-dissociated") {
    participant.isDissociatedComposite = true;
    participant.isAutoDissociatedComposite = false;
  } else if (normalizedDissociation === "auto-dissociated") {
    participant.isAutoDissociatedComposite = true;
  } else if (Array.isArray(documentParticipant?.tags)) {
    if (documentParticipant.tags.includes("manual-dissociated")) {
      participant.isDissociatedComposite = true;
      participant.isAutoDissociatedComposite = false;
    } else if (documentParticipant.tags.includes("auto-dissociated")) {
      participant.isAutoDissociatedComposite = true;
    }
  }
  if (documentParticipant?.state?.solveGenerated === true) {
    participant.isSolveGenerated = true;
  } else if (Array.isArray(documentParticipant?.tags) && documentParticipant.tags.includes("solve-generated")) {
    participant.isSolveGenerated = true;
  }
  if (documentParticipant?.state?.autoGenerated === true) {
    participant.isAutoGeneratedDissociateAssembly = true;
  }
  if (!isReactionObjectPlacementAllowed(participant.templateId, getReactionParticipantPlacementClass(participant))) {
    throw new Error(
      `Built-in reaction participant ${participant.id || "(missing id)"} uses invalid placement ${getReactionParticipantPlacementClass(participant)} for ${participant.templateId}.`
    );
  }
  participant.binarySelections = getInitialParticipantBinarySelections(participant);
  return participant;
}

function inferOperatorSurfaceRowIndex(operator = {}, documentParticipantsById = new Map()) {
  const connectedRows = [
    ...(Array.isArray(operator?.inputs) ? operator.inputs : []),
    ...(Array.isArray(operator?.outputs) ? operator.outputs : []),
  ]
    .map((endpoint) => documentParticipantsById.get(normalizeText(endpoint?.participantId))?.surfaceRowIndex)
    .filter((rowIndex) => Number.isInteger(rowIndex));
  return connectedRows.length ? Math.min(...connectedRows) : 0;
}

function inferOperatorLaneIndex(operator = {}, operatorIndex = 0) {
  const normalizedType = normalizeSupportedOperatorTemplateId(operator);
  if (normalizedType === "dissociate") {
    return 0;
  }
  if (normalizedType === "associate") {
    return 1;
  }
  return DEFAULT_OPERATOR_LANE_INDEX + normalizeNonNegativeInteger(operatorIndex) * 0;
}

function normalizeSupportedOperatorTemplateId(operator = {}) {
  const normalizedType = normalizeLowerText(operator?.type);
  if (normalizedType === "associate" || normalizedType === "dissociate") {
    return normalizedType;
  }
  const inputCount = Array.isArray(operator?.inputs) ? operator.inputs.length : 0;
  const outputCount = Array.isArray(operator?.outputs) ? operator.outputs.length : 0;
  if (inputCount <= 1 && outputCount >= 1) {
    return "dissociate";
  }
  if (inputCount >= 1 && outputCount <= 1) {
    return "associate";
  }
  return "associate";
}

function createOperatorParticipantFromReactionFlowDocumentRecord(
  operator = {},
  options = {}
) {
  const operatorId = normalizeText(operator?.id);
  const operatorType = normalizeSupportedOperatorTemplateId(operator);
  const operatorLabel = getReactionCanonicalBaseLabel(operatorType, {
    fallbackLabel:
      normalizeText(operator?.label) ||
      normalizeText(operator?.type) ||
      "Operator",
  });
  const operatorRootId = `${operatorId || "reaction_flow_operator"}_root`;
  const operatorIndex = normalizeNonNegativeInteger(options?.operatorIndex);
  const explicitLayout = operator?.layout && typeof operator.layout === "object" ? operator.layout : null;
  const structure = buildReactionParticipantStructure(operatorType, {
    id: operatorRootId,
    label: operatorLabel,
  });
  return {
    id: operatorId,
    side: "operator",
    templateId: operatorType,
    label: operatorLabel,
    provenanceId: `reaction-flow-operator:${operatorId}`,
    tags: buildTagList(operator?.tags),
    operatorLaneIndex: normalizeNonNegativeInteger(
      explicitLayout?.lane,
      inferOperatorLaneIndex(operator, operatorIndex)
    ),
    operatorSlotIndex: normalizeNonNegativeInteger(explicitLayout?.slot, 0),
    surfaceRowIndex: normalizeNonNegativeInteger(
      explicitLayout?.row,
      inferOperatorSurfaceRowIndex(operator, options?.documentParticipantsById ?? new Map())
    ),
    structure: structure.root,
    structureValidation: structure.validation,
    hierarchy: [
      {
        id: operatorRootId,
        label: operatorLabel,
        templateId: operatorType,
        renderMode: "operator-tile",
        children: [],
      },
    ],
  };
}

function buildParticipantsById(participants = []) {
  return new Map(
    participants
      .filter((participant) => normalizeText(participant?.id))
      .map((participant) => [normalizeText(participant.id), participant])
  );
}

function buildParticipantRole(participant = {}, direction = "output") {
  const placementClass = getReactionParticipantPlacementClass(participant);
  const connectorPolicy = getReactionObjectConnectorPolicy(participant?.templateId, placementClass);
  if (direction === "input") {
    return normalizeLowerText(connectorPolicy?.inputRole);
  }
  return normalizeLowerText(connectorPolicy?.outputRole);
}

function getParticipantLaneNumber(participant = {}) {
  if (participant?.side === "operator") {
    return normalizeNonNegativeInteger(participant?.operatorLaneIndex) === 0 ? 2 : 4;
  }
  const placementClass = getReactionParticipantPlacementClass(participant);
  if (placementClass === "center") {
    return 3;
  }
  if (placementClass === "product") {
    return 5;
  }
  return 1;
}

function resolveImportedParticipantAnchorId(participant = {}, anchorId = "") {
  const normalizedAnchorId = normalizeText(anchorId);
  const rootId = normalizeText(participant?.hierarchy?.[0]?.id) || "root";
  if (!normalizedAnchorId) {
    return rootId;
  }
  if (normalizedAnchorId === rootId) {
    return rootId;
  }
  if (findReactionStructureDescriptorNode(participant?.hierarchy, normalizedAnchorId)) {
    return normalizedAnchorId;
  }
  return rootId;
}

function normalizeDocumentEndpoint(endpoint = {}) {
  return {
    participantId: normalizeText(endpoint?.participantId),
    anchorId: normalizeText(endpoint?.anchorId),
    role: normalizeLowerText(endpoint?.role),
    anchorInstanceIndex: normalizeAnchorInstanceIndex(endpoint?.anchorInstanceIndex),
  };
}

function getExpectedDocumentEndpointRole(participant = {}, direction = "output") {
  if (participant?.side === "operator") {
    return direction === "input" ? "operator-input" : "operator-output";
  }
  return buildParticipantRole(participant, direction);
}

function validateDocumentEndpoint(endpoint = {}, participant = {}, direction = "output", mappingId = "") {
  const expectedRole = getExpectedDocumentEndpointRole(participant, direction);
  if (!expectedRole) {
    throw new Error(
      `Reaction flow mapping ${mappingId || "(missing id)"} cannot use ${direction} endpoint for ${participant?.id || "(missing participant)"} in lane ${getParticipantLaneNumber(participant)}.`
    );
  }
  if (endpoint.role !== expectedRole) {
    throw new Error(
      `Reaction flow mapping ${mappingId || "(missing id)"} uses ${endpoint.role || "(missing role)"} for ${participant?.id || "(missing participant)"} but expected ${expectedRole}.`
    );
  }

  const normalizedAnchorInstanceIndex = normalizeAnchorInstanceIndex(endpoint.anchorInstanceIndex);
  if (participant?.side === "operator") {
    if (normalizedAnchorInstanceIndex !== 0) {
      throw new Error(
        `Reaction flow mapping ${mappingId || "(missing id)"} must use anchorInstanceIndex 0 for operator ${participant?.id || "(missing participant)"}.`
      );
    }
    return;
  }

  const placementClass = getReactionParticipantPlacementClass(participant);
  if (placementClass !== "center") {
    return;
  }

  if (direction === "input") {
    if (normalizedAnchorInstanceIndex !== 0) {
      throw new Error(
        `Reaction flow mapping ${mappingId || "(missing id)"} must target center input anchorInstanceIndex 0 for ${participant?.id || "(missing participant)"}.`
      );
    }
    return;
  }

  if (normalizeReactionObjectTemplateId(participant?.templateId) === "free_architrinos") {
    if (normalizedAnchorInstanceIndex === null || normalizedAnchorInstanceIndex < 1) {
      throw new Error(
        `Reaction flow mapping ${mappingId || "(missing id)"} must use explicit free-architrinos output anchorInstanceIndex >= 1 for ${participant?.id || "(missing participant)"}.`
      );
    }
    return;
  }

  if (normalizedAnchorInstanceIndex !== 1) {
    throw new Error(
      `Reaction flow mapping ${mappingId || "(missing id)"} must use center output anchorInstanceIndex 1 for ${participant?.id || "(missing participant)"}.`
    );
  }
}

function buildSnapshotMappingsFromReactionFlowDocument(
  document = {},
  options = {}
) {
  const participantsById = options?.participantsById ?? new Map();
  return (Array.isArray(document?.mappings) ? document.mappings : []).map((mapping, mappingIndex) => {
    const mappingId = normalizeText(mapping?.id) || `reaction_flow_mapping_${mappingIndex + 1}`;
    const sourceEndpoint = normalizeDocumentEndpoint(mapping?.from);
    const targetEndpoint = normalizeDocumentEndpoint(mapping?.to);
    const sourceParticipant = participantsById.get(sourceEndpoint.participantId) ?? null;
    const targetParticipant = participantsById.get(targetEndpoint.participantId) ?? null;
    if (!sourceParticipant || !targetParticipant) {
      throw new Error(
        `Reaction flow mapping ${mappingId} references unknown participant(s): ${sourceEndpoint.participantId || "(missing source)"} -> ${targetEndpoint.participantId || "(missing target)"}`
      );
    }
    validateDocumentEndpoint(sourceEndpoint, sourceParticipant, "output", mappingId);
    validateDocumentEndpoint(targetEndpoint, targetParticipant, "input", mappingId);
    return {
      id: mappingId,
      sourceKey: buildReactionNodeKey(
        sourceParticipant.id,
        resolveImportedParticipantAnchorId(sourceParticipant, sourceEndpoint.anchorId)
      ),
      targetKey: buildReactionNodeKey(
        targetParticipant.id,
        resolveImportedParticipantAnchorId(targetParticipant, targetEndpoint.anchorId)
      ),
      sourceRole: sourceEndpoint.role,
      targetRole: targetEndpoint.role,
      sourceAnchorInstanceIndex: sourceEndpoint.anchorInstanceIndex,
      targetAnchorInstanceIndex: targetEndpoint.anchorInstanceIndex,
    };
  });
}

export function buildReactionSnapshotFromReactionFlowDocument(document = {}) {
  if (normalizeText(document?.schema) !== REACTION_FLOW_SCHEMA) {
    throw new Error("Reaction built-in library import expects reaction-flow/v1 input.");
  }
  const binarySelectionRuntime = createReactionBinarySelectionRuntime({
    supportsParticipantPolarity,
    normalizeParticipantPolarity,
  });
  const documentParticipants = (Array.isArray(document?.participants) ? document.participants : [])
    .map((participant) =>
      createParticipantFromReactionFlowDocumentRecord(participant, {
        binarySelectionRuntime,
      })
    )
    .filter(Boolean);
  const documentParticipantsById = buildParticipantsById(documentParticipants);
  const operatorParticipants = (Array.isArray(document?.operators) ? document.operators : [])
    .map((operator, operatorIndex) =>
      createOperatorParticipantFromReactionFlowDocumentRecord(operator, {
        operatorIndex,
        documentParticipantsById,
      })
    )
    .filter(Boolean);
  const participants = [...documentParticipants, ...operatorParticipants];
  const participantsById = buildParticipantsById(participants);
  return {
    participants,
    mappings: buildSnapshotMappingsFromReactionFlowDocument(document, {
      participantsById,
    }),
  };
}

async function loadJsonDocumentFromBuiltInEntry(entry = {}, options = {}) {
  const fetchImpl =
    typeof options?.fetchImpl === "function"
      ? options.fetchImpl
      : typeof globalThis.fetch === "function"
        ? globalThis.fetch.bind(globalThis)
        : null;
  if (typeof fetchImpl !== "function") {
    throw new Error("Built-in reaction library loading requires fetch().");
  }
  const documentUrl = new URL(entry.documentPath, options?.baseUrl ?? import.meta.url);
  if (!documentUrl.searchParams.has("v")) {
    documentUrl.searchParams.set("v", REACTION_BUILTIN_LIBRARY_CACHE_BUSTER);
  }
  const response = await fetchImpl(documentUrl);
  if (response?.ok === false) {
    throw new Error(`Built-in reaction library fetch failed for ${entry.id}.`);
  }
  const document = await response.json();
  if (normalizeText(document?.schema) !== REACTION_FLOW_SCHEMA) {
    throw new Error(`Built-in reaction library entry ${entry.id} is not reaction-flow/v1.`);
  }
  return document;
}

export async function loadReactionBuiltInLibraryEntry(entryId = "", options = {}) {
  const entry = resolveBuiltInEntry(entryId);
  const document = await loadJsonDocumentFromBuiltInEntry(entry, options);
  return {
    entry,
    document,
    snapshot: buildReactionSnapshotFromReactionFlowDocument(document),
    exportOverrides: buildReactionLibraryExportOverrides(document),
  };
}

export async function loadDefaultReactionBuiltInLibraryEntry(options = {}) {
  return loadReactionBuiltInLibraryEntry(DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID, options);
}
