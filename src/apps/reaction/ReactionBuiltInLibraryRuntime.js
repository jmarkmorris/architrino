import { createReactionBinarySelectionRuntime } from "./ReactionBinarySelectionRuntime.js";
import {
  getReactionCanonicalBaseLabel,
  getReactionCanonicalLabel,
} from "./ReactionLabelCatalogRuntime.js";
import { buildReactionNodeKey } from "./ReactionNodeKeyRuntime.js";
import { buildReactionParticipantStructure } from "./ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "./ReactionStructureDescriptorRuntime.js";
import { buildReactionLibraryExportOverrides } from "./ReactionFlowLibrarySupportRuntime.js";

const REACTION_FLOW_SCHEMA = "reaction-flow/v1";
const DEFAULT_OPERATOR_LANE_INDEX = 1;
const FREE_NEUTRON_BETA_DOCUMENT_PATH =
  "../../../content/contracts/examples/reaction-flow/free_neutron_beta.v1.json";
const MUON_DECAY_DOCUMENT_PATH =
  "../../../content/contracts/examples/reaction-flow/muon_decay.v1.json";
const CHARGED_PION_TO_MUON_NEUTRINO_DOCUMENT_PATH =
  "../../../content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json";

export const REACTION_BUILTIN_LIBRARY_ENTRIES = Object.freeze([
  Object.freeze({
    id: "free_neutron_beta",
    title: "Free neutron beta decay",
    description: "Known solved free neutron beta decay reaction-flow fixture.",
    documentPath: FREE_NEUTRON_BETA_DOCUMENT_PATH,
    isDefault: true,
  }),
  Object.freeze({
    id: "muon_decay",
    title: "Muon decay",
    description: "Accepted PDG-backed solved muon decay library entry.",
    documentPath: MUON_DECAY_DOCUMENT_PATH,
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

function supportsParticipantPolarity(templateId = "") {
  return new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark", "fermion_gen1"]).has(
    normalizeLowerText(templateId)
  );
}

function normalizeParticipantPolarity(polarity = "") {
  return normalizeLowerText(polarity) === "anti" ? "anti" : "pro";
}

function normalizeNonNegativeInteger(value, fallback = 0) {
  return Math.max(0, Math.round(Number(value) || fallback));
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
      ? structureKey.slice(5)
      : structureKey;
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
  const baseLabel = getReactionCanonicalLabel(templateId, {
    polarity,
    fallbackLabel:
      normalizeText(documentParticipant?.label) ||
      normalizeText(documentParticipant?.structureKey) ||
      "Participant",
  });
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
  const documentParticipantsById = options?.documentParticipantsById ?? new Map();
  const operatorIndex = normalizeNonNegativeInteger(options?.operatorIndex);
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
    operatorLaneIndex: inferOperatorLaneIndex(operator, operatorIndex),
    operatorSlotIndex: 0,
    surfaceRowIndex: inferOperatorSurfaceRowIndex(operator, documentParticipantsById),
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

function buildParticipantRole(participant = {}) {
  return participant?.side === "product" ? "product" : "reactant";
}

function buildDocumentOperatorsById(operators = []) {
  return new Map(
    operators
      .filter((operator) => normalizeText(operator?.id))
      .map((operator) => [normalizeText(operator.id), operator])
  );
}

function buildSnapshotMappingsFromReactionFlowDocument(
  document = {},
  options = {}
) {
  const participantsById = options?.participantsById ?? new Map();
  const documentOperatorsById = buildDocumentOperatorsById(document?.operators);
  const importedOperatorsById = new Map(
    (Array.isArray(document?.operators) ? document.operators : [])
      .map((operator) => {
        const participant = participantsById.get(normalizeText(operator?.id)) ?? null;
        const operatorRootId = normalizeText(participant?.hierarchy?.[0]?.id) || "root";
        return [normalizeText(operator?.id), operatorRootId];
      })
      .filter((entry) => entry[0])
  );
  const snapshotMappings = [];
  const mappedOperatorIds = new Set();

  (Array.isArray(document?.mappings) ? document.mappings : []).forEach((mapping, mappingIndex) => {
    const operatorId = normalizeText(mapping?.viaOperatorId);
    if (!operatorId || !importedOperatorsById.has(operatorId)) {
      const sourceParticipant = participantsById.get(normalizeText(mapping?.from?.participantId)) ?? null;
      const targetParticipant = participantsById.get(normalizeText(mapping?.to?.participantId)) ?? null;
      if (!sourceParticipant || !targetParticipant) {
        return;
      }
      snapshotMappings.push({
        id: normalizeText(mapping?.id) || `reaction_flow_mapping_${mappingIndex + 1}`,
        sourceKey: buildReactionNodeKey(sourceParticipant.id, normalizeText(mapping?.from?.anchorId) || "root"),
        targetKey: buildReactionNodeKey(targetParticipant.id, normalizeText(mapping?.to?.anchorId) || "root"),
        sourceRole: buildParticipantRole(sourceParticipant),
        targetRole: buildParticipantRole(targetParticipant),
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      });
      return;
    }

    mappedOperatorIds.add(operatorId);
    const operatorRootId = importedOperatorsById.get(operatorId) || "root";
    const sourceParticipant = participantsById.get(normalizeText(mapping?.from?.participantId)) ?? null;
    const targetParticipant = participantsById.get(normalizeText(mapping?.to?.participantId)) ?? null;
    if (!sourceParticipant || !targetParticipant) {
      return;
    }
    const mappingId = normalizeText(mapping?.id) || `reaction_flow_mapping_${mappingIndex + 1}`;
    snapshotMappings.push(
      {
        id: `${mappingId}__input`,
        sourceKey: buildReactionNodeKey(sourceParticipant.id, normalizeText(mapping?.from?.anchorId) || "root"),
        targetKey: buildReactionNodeKey(operatorId, operatorRootId),
        sourceRole: buildParticipantRole(sourceParticipant),
        targetRole: "operator-input",
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      },
      {
        id: `${mappingId}__output`,
        sourceKey: buildReactionNodeKey(operatorId, operatorRootId),
        targetKey: buildReactionNodeKey(targetParticipant.id, normalizeText(mapping?.to?.anchorId) || "root"),
        sourceRole: "operator-output",
        targetRole: buildParticipantRole(targetParticipant),
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      }
    );
  });

  (Array.isArray(document?.operators) ? document.operators : []).forEach((operator, operatorIndex) => {
    const operatorId = normalizeText(operator?.id);
    if (!operatorId || mappedOperatorIds.has(operatorId) || !importedOperatorsById.has(operatorId)) {
      return;
    }
    const operatorRootId = importedOperatorsById.get(operatorId) || "root";
    (Array.isArray(operator?.inputs) ? operator.inputs : []).forEach((endpoint, endpointIndex) => {
      const sourceParticipant = participantsById.get(normalizeText(endpoint?.participantId)) ?? null;
      if (!sourceParticipant) {
        return;
      }
      snapshotMappings.push({
        id: `reaction_flow_operator_${operatorIndex + 1}_input_${endpointIndex + 1}`,
        sourceKey: buildReactionNodeKey(sourceParticipant.id, normalizeText(endpoint?.anchorId) || "root"),
        targetKey: buildReactionNodeKey(operatorId, operatorRootId),
        sourceRole: buildParticipantRole(sourceParticipant),
        targetRole: "operator-input",
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      });
    });
    (Array.isArray(operator?.outputs) ? operator.outputs : []).forEach((endpoint, endpointIndex) => {
      const targetParticipant = participantsById.get(normalizeText(endpoint?.participantId)) ?? null;
      if (!targetParticipant) {
        return;
      }
      snapshotMappings.push({
        id: `reaction_flow_operator_${operatorIndex + 1}_output_${endpointIndex + 1}`,
        sourceKey: buildReactionNodeKey(operatorId, operatorRootId),
        targetKey: buildReactionNodeKey(targetParticipant.id, normalizeText(endpoint?.anchorId) || "root"),
        sourceRole: "operator-output",
        targetRole: buildParticipantRole(targetParticipant),
        sourceAnchorInstanceIndex: null,
        targetAnchorInstanceIndex: null,
      });
    });
  });

  return snapshotMappings;
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
