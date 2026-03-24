import {
  classifyComposerReactionNode,
  evaluateComposerReactionMappingCandidate,
} from "./ComposerReactionStructureMappingRuntime.js";
import { buildReactionParticipantStructure } from "./ComposerReactionStructureBridgeRuntime.js";
import { buildReactionSolverHierarchyFromStructure } from "./ComposerReactionStructureHierarchyRuntime.js";
import {
  findReactionBinarySelectorGroup,
  getReactionBinarySelectorGroups,
} from "./ComposerReactionStructureSelectionRuntime.js";
import {
  getNoetherCoreSlotBinaryPresence,
} from "../domain/structure/StructureClassification.js";
import {
  cloneStructureNode,
  getStructureNodeChildren,
  getStructureTrait,
  STRUCTURE_CLASSIFICATION_FAMILIES,
  STRUCTURE_KINDS,
} from "../domain/structure/StructureSchema.js";
import { findStructureNodeById, mapStructure } from "../domain/structure/StructureTraversal.js";
import { clearNoetherCoreSlotOccupant } from "../domain/structure/StructureTransforms.js";
import { validateStructureTree } from "../domain/structure/StructureValidation.js";

const solverTemplateMeta = Object.freeze({
  noether_core: { shortLabel: "NC", accent: "#a259ff" },
  higgs_cluster: { shortLabel: "HC", accent: "#a259ff" },
  neutron: { shortLabel: "N", accent: "#a259ff" },
  proton: { shortLabel: "P", accent: "#ff5a4a" },
  transmute: { shortLabel: "T", accent: "#a259ff" },
  electron: { shortLabel: "e-", accent: "#2d8cff" },
  neutrino: { shortLabel: "𝜈", accent: "#a259ff" },
  down_quark: { shortLabel: "d", accent: "#4a78ff" },
  up_quark: { shortLabel: "u", accent: "#ff5a4a" },
  fermion_gen1: { shortLabel: "F1", accent: "#c2d5ff" },
});

const binaryPersonalityChoices = Object.freeze([
  { id: "ee", label: "e/e", top: "electrino", bottom: "electrino", accent: "#2f6fff" },
  { id: "ep", label: "e/p", top: "electrino", bottom: "positrino", accent: "#9a47d1" },
  { id: "pe", label: "p/e", top: "positrino", bottom: "electrino", accent: "#9a47d1" },
  { id: "pp", label: "p/p", top: "positrino", bottom: "positrino", accent: "#ff4a1f" },
]);
const defaultBinaryPersonalityChoiceId = "pe";
const reducedBinaryPersonalityChoiceIds = Object.freeze(["ee", "pe", "pp"]);
const binaryChoiceKindById = Object.freeze({
  ee: "negative",
  ep: "neutral",
  pe: "neutral",
  pp: "positive",
});
const invertedBinaryChoiceIdById = Object.freeze({
  ee: "pp",
  ep: "pe",
  pe: "ep",
  pp: "ee",
});
const binarySlotRankByCode = Object.freeze({
  I: 0,
  M: 1,
  O: 2,
});
const binarySelectorTemplateRules = Object.freeze({
  default: Object.freeze({
    visibleChoiceIds: reducedBinaryPersonalityChoiceIds,
    defaultBySlot: Object.freeze({
      I: "pe",
      M: "pe",
      O: "pe",
    }),
  }),
  electron: Object.freeze({
    visibleChoiceIds: Object.freeze(["ee"]),
    defaultBySlot: Object.freeze({
      I: "ee",
      M: "ee",
      O: "ee",
    }),
  }),
  neutrino: Object.freeze({
    visibleChoiceIds: Object.freeze(["pe"]),
    defaultBySlot: Object.freeze({
      I: "pe",
      M: "pe",
      O: "pe",
    }),
  }),
  up_quark: Object.freeze({
    visibleChoiceIds: Object.freeze(["pe", "pp"]),
    allowedCountPatterns: Object.freeze([
      Object.freeze({
        neutral: 1,
        positive: 2,
      }),
    ]),
    defaultBySlot: Object.freeze({
      I: "pp",
      M: "pe",
      O: "pp",
    }),
  }),
  down_quark: Object.freeze({
    visibleChoiceIds: Object.freeze(["ee", "pe", "pp"]),
    allowedCountPatterns: Object.freeze([
      Object.freeze({
        negative: 1,
        neutral: 2,
      }),
      Object.freeze({
        negative: 2,
        positive: 1,
      }),
    ]),
    defaultBySlot: Object.freeze({
      I: "pe",
      M: "ee",
      O: "pe",
    }),
  }),
});

const participantPolarityTemplateIds = new Set([
  "noether_core",
  "electron",
  "neutrino",
  "down_quark",
  "up_quark",
  "fermion_gen1",
]);

const templatePickerOrder = Object.freeze([
  "proton",
  "up_quark",
  "higgs_cluster",
  "neutron",
  "neutrino",
  "noether_core",
  "down_quark",
  "electron",
]);

function dedupeTemplateEntries(templateMenuRows = [], extraEntries = []) {
  const entries = [];
  const seen = new Set();
  const allEntries = [
    ...templateMenuRows.flatMap((row) => (Array.isArray(row) ? row : [])),
    { template: "neutron", label: "Neutron" },
    { template: "proton", label: "Proton" },
    { template: "neutrino", label: "Neutrino", initialPolarity: "pro" },
    ...extraEntries,
  ];
  allEntries.forEach((entry) => {
    const template = String(entry?.template ?? "").trim();
    const initialPolarity = supportsParticipantPolarity(template)
      ? normalizeParticipantPolarity(entry?.initialPolarity)
      : "";
    const entryKey = `${template}::${initialPolarity}`;
    if (!template || seen.has(entryKey)) {
      return;
    }
    seen.add(entryKey);
    entries.push({
      template,
      label: String(entry?.label ?? template).trim() || template,
      initialPolarity,
    });
  });
  return entries;
}

function sortTemplatePickerEntries(entries = []) {
  return [...entries].sort((left, right) => {
    const leftTemplate = String(left?.template ?? "").trim().toLowerCase();
    const rightTemplate = String(right?.template ?? "").trim().toLowerCase();
    const leftIndex = templatePickerOrder.indexOf(leftTemplate);
    const rightIndex = templatePickerOrder.indexOf(rightTemplate);
    const leftRank = leftIndex >= 0 ? leftIndex : Number.MAX_SAFE_INTEGER;
    const rightRank = rightIndex >= 0 ? rightIndex : Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return String(left?.label ?? "").localeCompare(String(right?.label ?? ""));
  });
}

function createBinaryBranch(
  id,
  label,
  { withPersonality = true, slotCode = "", renderMode = "" } = {}
) {
  const resolvedRenderMode =
    renderMode || (withPersonality ? "binary-selector" : "");
  return {
    id,
    label,
    renderMode: resolvedRenderMode,
    slotCode: String(slotCode || "").trim().toUpperCase(),
    children: withPersonality
      ? [
          {
            id: `${id}/binary`,
            label: "inner binary",
            children: [],
            inventory: { electrino: 1, positrino: 1 },
          },
          {
            id: `${id}/personality_1`,
            label: "electrino personality architrino",
            children: [],
            inventory: { electrino: 1 },
            provenanceMode: "guessed",
          },
          {
            id: `${id}/personality_2`,
            label: "positrino personality architrino",
            children: [],
            inventory: { positrino: 1 },
            provenanceMode: "guessed",
          },
        ]
      : [
          {
            id: `${id}/binary`,
            label: "binary",
            children: [],
            inventory: { electrino: 1, positrino: 1 },
          },
        ],
  };
}

function createProAntiCoreBranch(id) {
  return {
    id,
    label: "Pro/anti core",
    children: [
      {
        id: `${id}/pro_core`,
        label: "Pro core",
        children: [],
        inventory: { proCore: 1 },
      },
      {
        id: `${id}/anti_core`,
        label: "Anti core",
        children: [],
        inventory: { antiCore: 1 },
      },
    ],
  };
}

function createCoreLeaf(id, label, inventory) {
  return {
    id,
    label,
    children: [],
    inventory,
  };
}

function createNoetherCoreBranch(
  id,
  label,
  { anti = false, inventory = null, showSlotHeader = true } = {}
) {
  return {
    id,
    label,
    renderMode: "noether-core-grid",
    inventory: inventory ?? (anti ? { antiCore: 1 } : { proCore: 1 }),
    showSlotHeader,
    children: [
      createBinaryBranch(`${id}/inner`, "inner binary", {
        withPersonality: false,
        slotCode: "I",
        renderMode: "binary-bare",
      }),
      createBinaryBranch(`${id}/middle`, "middle binary", {
        withPersonality: false,
        slotCode: "M",
        renderMode: "binary-bare",
      }),
      createBinaryBranch(`${id}/outer`, "outer binary", {
        withPersonality: false,
        slotCode: "O",
        renderMode: "binary-bare",
      }),
    ],
  };
}

function createBinarySelectorGroupBranch(id, label, templateId, options = {}) {
  const { binaryLabelPrefix = "" } = options;
  return {
    id,
    label,
    templateId,
    renderMode: "binary-selector-grid",
    children: [
      createBinaryBranch(
        `${id}/inner`,
        `${binaryLabelPrefix}inner binary with personality`.trim(),
        { slotCode: "I" }
      ),
      createBinaryBranch(
        `${id}/middle`,
        `${binaryLabelPrefix}middle binary with personality`.trim(),
        { slotCode: "M" }
      ),
      createBinaryBranch(
        `${id}/outer`,
        `${binaryLabelPrefix}outer binary with personality`.trim(),
        { slotCode: "O" }
      ),
    ],
  };
}

function supportsParticipantPolarity(templateId) {
  return participantPolarityTemplateIds.has(String(templateId ?? "").trim().toLowerCase());
}

function normalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
}

function stripLeadingParticipantPolarity(label = "") {
  return String(label ?? "").trim().replace(/^(pro|anti)\s+/i, "") || String(label ?? "").trim();
}

function formatParticipantLabel(baseLabel = "", templateId = "", polarity = "") {
  const cleanedBaseLabel = stripLeadingParticipantPolarity(baseLabel) || "?";
  if (!supportsParticipantPolarity(templateId)) {
    return cleanedBaseLabel;
  }
  return `${normalizeParticipantPolarity(polarity)} ${cleanedBaseLabel}`;
}

function buildParticipantStructure(participantId, templateId, baseLabel, polarity = "") {
  const structureId = `${participantId}__structure`;
  return buildReactionParticipantStructure(templateId, {
    id: structureId,
    label: formatParticipantLabel(baseLabel, templateId, polarity),
    polarity,
  });
}

function buildParticipantHierarchy(structureRoot, fallbackHierarchy = []) {
  const derivedHierarchy = buildReactionSolverHierarchyFromStructure(structureRoot);
  return Array.isArray(derivedHierarchy) && derivedHierarchy.length
    ? derivedHierarchy
    : Array.isArray(fallbackHierarchy)
      ? fallbackHierarchy
      : [];
}

function inferTemplateIdFromStructure(structureRoot) {
  if (!structureRoot) {
    return "noether_core";
  }
  const structureKind = String(structureRoot?.kind ?? "").trim();
  const structureSpecies = String(structureRoot?.species ?? "").trim().toLowerCase();
  const family = String(structureRoot?.classification?.family ?? "").trim();
  if (structureKind === STRUCTURE_KINDS.NOETHER_CORE) {
    return "noether_core";
  }
  if (structureSpecies === "higgs_cluster") {
    return "higgs_cluster";
  }
  if (structureSpecies === "proton") {
    return "proton";
  }
  if (structureSpecies === "neutron") {
    return "neutron";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON) {
    return "electron";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO) {
    return "neutrino";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK) {
    return "up_quark";
  }
  if (family === STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK) {
    return "down_quark";
  }
  return structureSpecies || "noether_core";
}

function inferParticipantPolarityFromStructure(structureRoot) {
  const polarity = String(getStructureTrait(structureRoot, "polarity", "")).trim().toLowerCase();
  return polarity === "anti" ? "anti" : "pro";
}

function formatStructureSpeciesLabel(species = "") {
  const normalizedSpecies = String(species ?? "").trim().toLowerCase();
  if (!normalizedSpecies) {
    return "";
  }
  const explicitLabels = {
    noether_core: "Noether Core",
    higgs_cluster: "Higgs Cluster",
    electron_neutrino: "Electron Neutrino",
    muon_neutrino: "Muon Neutrino",
    tau_neutrino: "Tau Neutrino",
    up_quark: "Up Quark",
    charm_quark: "Charm Quark",
    top_quark: "Top Quark",
    down_quark: "Down Quark",
    strange_quark: "Strange Quark",
    bottom_quark: "Bottom Quark",
  };
  if (explicitLabels[normalizedSpecies]) {
    return explicitLabels[normalizedSpecies];
  }
  return normalizedSpecies
    .split("_")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase?.() + word.slice(1))
    .join(" ");
}

function inferParticipantBaseLabelFromStructure(structureRoot) {
  const speciesLabel = formatStructureSpeciesLabel(structureRoot?.species);
  if (speciesLabel) {
    return speciesLabel;
  }
  return String(structureRoot?.label ?? structureRoot?.species ?? "Structure").trim() || "Structure";
}

function syncParticipantHierarchyForPolarity(participant) {
  if (!participant || !supportsParticipantPolarity(participant.templateId)) {
    return;
  }
  const polarity = normalizeParticipantPolarity(participant.polarity);
  const topNode = Array.isArray(participant.hierarchy) ? participant.hierarchy[0] ?? null : null;
  if (!topNode) {
    return;
  }
  topNode.label = `${polarity} Noether core`;
  topNode.inventory = polarity === "anti" ? { antiCore: 1 } : { proCore: 1 };
}

function buildHierarchyForTemplate(templateId, label) {
  const normalizedTemplate = String(templateId ?? "").trim().toLowerCase();
  if (normalizedTemplate === "higgs_cluster") {
    return [
      {
        id: "root",
        label: "Higgs cluster",
        renderMode: "assembly-cluster-grid",
        children: [
          createNoetherCoreBranch("root/pro_core_1", "Pro core"),
          createNoetherCoreBranch("root/anti_core_1", "Anti core", {
            anti: true,
          }),
          createNoetherCoreBranch("root/pro_core_2", "Pro core"),
          createNoetherCoreBranch("root/anti_core_2", "Anti core", {
            anti: true,
          }),
        ],
      },
    ];
  }
  if (normalizedTemplate === "neutron") {
    return [
      {
        id: "root",
        label: "Neutron",
        renderMode: "assembly-cluster-grid",
        children: [
          createBinarySelectorGroupBranch("root/down_1", "Down quark", "down_quark"),
          createBinarySelectorGroupBranch("root/up_1", "Up quark", "up_quark"),
          createBinarySelectorGroupBranch("root/down_2", "Down quark", "down_quark"),
        ],
      },
    ];
  }
  if (normalizedTemplate === "proton") {
    return [
      {
        id: "root",
        label: "Proton",
        renderMode: "assembly-cluster-grid",
        children: [
          createBinarySelectorGroupBranch("root/up_1", "Up quark", "up_quark"),
          createBinarySelectorGroupBranch("root/down_1", "Down quark", "down_quark"),
          createBinarySelectorGroupBranch("root/up_2", "Up quark", "up_quark"),
        ],
      },
    ];
  }
  if (normalizedTemplate === "electron") {
    return [createBinarySelectorGroupBranch("root", "pro Noether core", "electron")];
  }
  if (normalizedTemplate === "neutrino") {
    return [
      createBinarySelectorGroupBranch("root", "pro Noether core", "neutrino", {
        binaryLabelPrefix: "neutral ",
      }),
    ];
  }
  if (normalizedTemplate === "noether_core") {
    return [
      {
        id: "root",
        label: "pro Noether core",
        renderMode: "noether-core-grid",
        children: [
          createBinaryBranch("root/inner", "inner binary", {
            withPersonality: false,
            slotCode: "I",
            renderMode: "binary-bare",
          }),
          createBinaryBranch("root/middle", "middle binary", {
            withPersonality: false,
            slotCode: "M",
            renderMode: "binary-bare",
          }),
          createBinaryBranch("root/outer", "outer binary", {
            withPersonality: false,
            slotCode: "O",
            renderMode: "binary-bare",
          }),
        ],
      },
    ];
  }
  if (normalizedTemplate === "up_quark" || normalizedTemplate === "down_quark") {
    return [createBinarySelectorGroupBranch("root", "pro Noether core", normalizedTemplate)];
  }
  return [
    createBinarySelectorGroupBranch("root", "pro/anti Noether core", normalizedTemplate),
  ];
}

function getTemplateMeta(templateId, label = "") {
  const normalized = String(templateId ?? "").trim().toLowerCase();
  const entry = solverTemplateMeta[normalized] ?? null;
  if (entry) {
    return entry;
  }
  const words = String(label || normalized || "?")
    .split(/\s+/)
    .filter(Boolean);
  const shortLabel = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase?.() ?? "")
    .join("")
    .slice(0, 3);
  return {
    shortLabel: shortLabel || "?",
    accent: "#9fb0e1",
  };
}

function getParticipantCardMeta(participant = null) {
  const baseMeta = getTemplateMeta(participant?.templateId, participant?.label);
  const polarity = normalizeParticipantPolarity(participant?.polarity);
  const templateId = String(participant?.templateId ?? "").trim().toLowerCase();
  if (templateId === "neutron") {
    return {
      ...baseMeta,
      accent: "#a259ff",
    };
  }
  if (templateId === "electron" || templateId === "down_quark") {
    return {
      ...baseMeta,
      accent: polarity === "anti" ? "#ff5a4a" : "#2d8cff",
    };
  }
  if (templateId === "up_quark") {
    return {
      ...baseMeta,
      accent: polarity === "anti" ? "#2d8cff" : "#ff5a4a",
    };
  }
  return baseMeta;
}

function getDefaultParticipantBaseLabel(templateId = "", fallbackLabel = "") {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  if (normalizedTemplateId === "noether_core") {
    return "Noether core";
  }
  if (normalizedTemplateId === "up_quark") {
    return "Up Quark";
  }
  if (normalizedTemplateId === "down_quark") {
    return "Down Quark";
  }
  if (normalizedTemplateId === "electron") {
    return "Electron";
  }
  if (normalizedTemplateId === "neutrino") {
    return "Neutrino";
  }
  if (normalizedTemplateId === "proton") {
    return "Proton";
  }
  if (normalizedTemplateId === "transmute") {
    return "Transmute";
  }
  if (normalizedTemplateId === "neutron") {
    return "Neutron";
  }
  if (normalizedTemplateId === "higgs_cluster") {
    return "Higgs cluster";
  }
  return String(fallbackLabel || normalizedTemplateId || "?").trim() || "?";
}

function getParticipantCardLabelLines(label = "", participant = null) {
  const words = String(label || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const normalizedTemplateId = String(participant?.templateId ?? "").trim().toLowerCase();
  if (
    normalizedTemplateId === "noether_core" &&
    words.length >= 3
  ) {
    const [polarityWord = "", secondWord = "", thirdWord = ""] = words;
    return [
      polarityWord ? polarityWord[0].toUpperCase() + polarityWord.slice(1).toLowerCase() : "?",
      secondWord ? secondWord[0].toUpperCase() + secondWord.slice(1).toLowerCase() : "",
      thirdWord ? thirdWord.toLowerCase() : "",
    ].filter(Boolean);
  }
  if (supportsParticipantPolarity(normalizedTemplateId) && words.length >= 2) {
    const [polarityWord = "", ...restWords] = words;
    return [
      polarityWord ? polarityWord[0].toUpperCase() + polarityWord.slice(1).toLowerCase() : "?",
      ...restWords.map((word) => word[0]?.toUpperCase?.() + word.slice(1).toLowerCase()),
    ].filter(Boolean);
  }
  if (words.length <= 1) {
    return [String(label || "").trim() || "?"];
  }
  if (words.length === 2) {
    return words;
  }
  return [words.slice(0, -1).join(" "), words.at(-1) ?? ""];
}

function buildNodeKey(participantId, nodeId) {
  return `${participantId}::${nodeId}`;
}

function parseNodeKey(nodeKey) {
  const [participantId = "", ...rest] = String(nodeKey ?? "").split("::");
  return {
    participantId,
    nodeId: rest.join("::"),
  };
}

function isSameOrAncestorPath(candidatePath, targetPath) {
  if (!candidatePath || !targetPath) {
    return false;
  }
  return targetPath === candidatePath || targetPath.startsWith(`${candidatePath}/`);
}

function nodeKeysConflict(leftKey, rightKey) {
  const left = parseNodeKey(leftKey);
  const right = parseNodeKey(rightKey);
  if (!left.participantId || !right.participantId || left.participantId !== right.participantId) {
    return false;
  }
  return (
    isSameOrAncestorPath(left.nodeId, right.nodeId) ||
    isSameOrAncestorPath(right.nodeId, left.nodeId)
  );
}

function countDescendants(node) {
  const children = Array.isArray(node?.children) ? node.children : [];
  return children.reduce((total, child) => total + 1 + countDescendants(child), 0);
}

function shouldRenderChildNodes(node) {
  return (
    node?.renderMode !== "binary-selector" &&
    node?.renderMode !== "binary-selector-grid" &&
    node?.renderMode !== "higgs-cluster-grid" &&
    node?.renderMode !== "assembly-cluster-grid" &&
    node?.renderMode !== "binary-bare"
  );
}

function getBinaryPersonalityChoice(choiceId) {
  return (
    binaryPersonalityChoices.find((choice) => choice.id === choiceId) ??
    binaryPersonalityChoices.find((choice) => choice.id === defaultBinaryPersonalityChoiceId) ??
    binaryPersonalityChoices[0]
  );
}

function getBinaryChoiceKind(choiceId) {
  return binaryChoiceKindById[choiceId] ?? "neutral";
}

function getBinaryChoiceInventory(choiceId) {
  const normalizedChoiceId = String(choiceId ?? "").trim().toLowerCase();
  if (normalizedChoiceId === "ee") {
    return { electrino: 3, positrino: 1 };
  }
  if (normalizedChoiceId === "pp") {
    return { electrino: 1, positrino: 3 };
  }
  return { electrino: 2, positrino: 2 };
}

function getBinarySelectorTemplateRule(templateId) {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  return (
    binarySelectorTemplateRules[normalizedTemplateId] ??
    binarySelectorTemplateRules.default
  );
}

function invertBinaryChoiceId(choiceId) {
  return invertedBinaryChoiceIdById[choiceId] ?? getBinaryPersonalityChoice(choiceId).id;
}

function invertBinaryChoiceKind(kind) {
  if (kind === "negative") {
    return "positive";
  }
  if (kind === "positive") {
    return "negative";
  }
  return "neutral";
}

function getBinarySelectorRuleForParticipant(participant) {
  const baseRule = getBinarySelectorTemplateRule(participant?.templateId);
  if (normalizeParticipantPolarity(participant?.polarity) !== "anti") {
    return baseRule;
  }
  return {
    ...baseRule,
    visibleChoiceIds: baseRule.visibleChoiceIds.map((choiceId) => invertBinaryChoiceId(choiceId)),
    allowedCountPatterns: Array.isArray(baseRule.allowedCountPatterns)
      ? baseRule.allowedCountPatterns.map((pattern) =>
          Object.fromEntries(
            Object.entries(pattern).map(([kind, count]) => [invertBinaryChoiceKind(kind), count])
          )
        )
      : baseRule.allowedCountPatterns,
    defaultBySlot: Object.fromEntries(
      Object.entries(baseRule.defaultBySlot ?? {}).map(([slotCode, choiceId]) => [
        slotCode,
        invertBinaryChoiceId(choiceId),
      ])
    ),
  };
}

function isQuarkTemplateId(templateId) {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  return normalizedTemplateId === "up_quark" || normalizedTemplateId === "down_quark";
}

function collectLegacyBinarySelectorNodes(nodes = [], bucket = []) {
  (Array.isArray(nodes) ? nodes : []).forEach((node) => {
    if (node?.renderMode === "binary-selector") {
      bucket.push(node);
    }
    collectLegacyBinarySelectorNodes(node?.children, bucket);
  });
  return bucket;
}

function collectLegacyBinarySelectorGroupNodes(nodes = [], bucket = []) {
  (Array.isArray(nodes) ? nodes : []).forEach((node) => {
    if (node?.renderMode === "binary-selector-grid") {
      bucket.push(node);
    }
    collectLegacyBinarySelectorGroupNodes(node?.children, bucket);
  });
  return bucket;
}

function findLegacyBinarySelectorGroupNode(nodes = [], targetNodeId = "", currentGroup = null) {
  for (const node of Array.isArray(nodes) ? nodes : []) {
    const nextGroup = node?.renderMode === "binary-selector-grid" ? node : currentGroup;
    if (node?.id === targetNodeId) {
      return nextGroup;
    }
    const childMatch = findLegacyBinarySelectorGroupNode(node?.children, targetNodeId, nextGroup);
    if (childMatch) {
      return childMatch;
    }
  }
  return null;
}

function sortBinarySelectorNodes(nodes = []) {
  return [...nodes].sort((left, right) => {
    const leftRank = binarySlotRankByCode[left?.slotCode] ?? Number.MAX_SAFE_INTEGER;
    const rightRank = binarySlotRankByCode[right?.slotCode] ?? Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return String(left?.id ?? "").localeCompare(String(right?.id ?? ""));
  });
}

function getParticipantBinarySelectorGroups(participant) {
  const structureGroups = getReactionBinarySelectorGroups(participant?.structure);
  if (structureGroups.length) {
    return structureGroups;
  }
  return collectLegacyBinarySelectorGroupNodes(participant?.hierarchy, []).map((groupNode) => ({
    id: groupNode.id,
    templateId: String(groupNode?.templateId ?? participant?.templateId ?? "").trim().toLowerCase(),
    slotNodes: sortBinarySelectorNodes(collectLegacyBinarySelectorNodes([groupNode], [])),
  }));
}

function resolveBinarySelectorGroup(participant, groupNodeOrNodeId = null) {
  const explicitId =
    typeof groupNodeOrNodeId === "string"
      ? groupNodeOrNodeId
      : String(groupNodeOrNodeId?.id ?? "").trim();
  if (!explicitId) {
    return null;
  }
  const structureGroup = findReactionBinarySelectorGroup(participant?.structure, explicitId);
  if (structureGroup) {
    return structureGroup;
  }
  return findLegacyBinarySelectorGroupNode(participant?.hierarchy, explicitId);
}

function getBinarySelectorTemplateIdForNode(participant, groupNode = null) {
  const groupRecord = resolveBinarySelectorGroup(participant, groupNode);
  return String(groupRecord?.templateId ?? participant?.templateId ?? "").trim().toLowerCase();
}

function getBinarySelectorNodes(participant, groupNode = null) {
  const groupRecord = groupNode ? resolveBinarySelectorGroup(participant, groupNode) : null;
  if (groupRecord?.slotNodes) {
    return sortBinarySelectorNodes(groupRecord.slotNodes);
  }
  if (groupRecord && !groupRecord.slotNodes) {
    return sortBinarySelectorNodes(collectLegacyBinarySelectorNodes([groupRecord], []));
  }
  const structureGroups = getParticipantBinarySelectorGroups(participant);
  if (structureGroups.length) {
    return sortBinarySelectorNodes(structureGroups.flatMap((group) => group.slotNodes ?? []));
  }
  return sortBinarySelectorNodes(collectLegacyBinarySelectorNodes(participant?.hierarchy, []));
}

function getDefaultBinaryChoiceIdForNode(participant, node, groupNode = null) {
  const rule = getBinarySelectorRuleForParticipant({
    ...participant,
    templateId: getBinarySelectorTemplateIdForNode(participant, groupNode),
  });
  const slotCode = String(node?.slotCode ?? "").trim().toUpperCase();
  const defaultChoiceId = rule.defaultBySlot?.[slotCode];
  if (defaultChoiceId && rule.visibleChoiceIds.includes(defaultChoiceId)) {
    return defaultChoiceId;
  }
  return (
    rule.visibleChoiceIds[0] ??
    reducedBinaryPersonalityChoiceIds[0] ??
    defaultBinaryPersonalityChoiceId
  );
}

function getFallbackBinarySelections(participant) {
  const selectionMap = {};
  getBinarySelectorNodes(participant).forEach((node) => {
    selectionMap[node.id] = getDefaultBinaryChoiceIdForNode(participant, node);
  });
  return selectionMap;
}

function countBinarySelectionKinds(selectionMap = {}, nodes = []) {
  const counts = {
    negative: 0,
    neutral: 0,
    positive: 0,
  };
  nodes.forEach((node) => {
    const choiceId = selectionMap[node.id];
    counts[getBinaryChoiceKind(choiceId)] += 1;
  });
  return counts;
}

function matchesAllowedBinarySelectionPatterns(selectionMap = {}, nodes = [], patterns = null) {
  if (!Array.isArray(patterns) || !patterns.length) {
    return true;
  }
  const actualCounts = countBinarySelectionKinds(selectionMap, nodes);
  return patterns.some((pattern) =>
    Object.entries(pattern).every(([kind, requiredCount]) => actualCounts[kind] === requiredCount)
  );
}

function scoreBinarySelectionAssignment({
  assignment,
  currentSelections,
  defaultSelections,
  pinnedNodeId = "",
}) {
  return Object.keys(assignment).reduce((score, nodeId) => {
    let nextScore = score;
    if (nodeId === pinnedNodeId) {
      nextScore += 1000;
    }
    if (assignment[nodeId] === currentSelections[nodeId]) {
      nextScore += 100;
    }
    if (assignment[nodeId] === defaultSelections[nodeId]) {
      nextScore += 10;
    }
    return nextScore;
  }, 0);
}

function findBestBinarySelectionAssignment(
  participant,
  groupNode = null,
  { pinnedNodeId = "", pinnedChoiceId = "" } = {}
) {
  const nodes = getBinarySelectorNodes(participant, groupNode);
  if (!nodes.length) {
    return {};
  }
  const rule = getBinarySelectorRuleForParticipant({
    ...participant,
    templateId: getBinarySelectorTemplateIdForNode(participant, groupNode),
  });
  const defaultSelections = Object.fromEntries(
    nodes.map((node) => [node.id, getDefaultBinaryChoiceIdForNode(participant, node, groupNode)])
  );
  const currentSelections = {};
  nodes.forEach((node) => {
    const currentChoiceId = participant?.binarySelections?.[node.id];
    currentSelections[node.id] = rule.visibleChoiceIds.includes(currentChoiceId)
      ? currentChoiceId
      : defaultSelections[node.id];
  });

  if (pinnedNodeId && !rule.visibleChoiceIds.includes(pinnedChoiceId)) {
    return null;
  }

  let bestAssignment = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  const draft = {};

  function visit(index) {
    if (index >= nodes.length) {
      if (!matchesAllowedBinarySelectionPatterns(draft, nodes, rule.allowedCountPatterns)) {
        return;
      }
      const score = scoreBinarySelectionAssignment({
        assignment: draft,
        currentSelections,
        defaultSelections,
        pinnedNodeId,
      });
      if (score > bestScore) {
        bestScore = score;
        bestAssignment = { ...draft };
      }
      return;
    }

    const node = nodes[index];
    const choiceIds =
      node.id === pinnedNodeId ? [pinnedChoiceId] : rule.visibleChoiceIds;
    choiceIds.forEach((choiceId) => {
      draft[node.id] = choiceId;
      visit(index + 1);
    });
    delete draft[node.id];
  }

  visit(0);
  return bestAssignment;
}

function getResolvedBinarySelectionMap(participant, groupNode = null) {
  return (
    findBestBinarySelectionAssignment(participant, groupNode) ??
    Object.fromEntries(
      getBinarySelectorNodes(participant, groupNode).map((node) => [
        node.id,
        getDefaultBinaryChoiceIdForNode(participant, node, groupNode),
      ])
    )
  );
}

function enumerateValidBinarySelectionAssignments(participant, groupNode = null) {
  const nodes = getBinarySelectorNodes(participant, groupNode);
  if (!nodes.length) {
    return [];
  }
  const rule = getBinarySelectorRuleForParticipant({
    ...participant,
    templateId: getBinarySelectorTemplateIdForNode(participant, groupNode),
  });
  const assignments = [];
  const draft = {};

  function visit(index) {
    if (index >= nodes.length) {
      if (matchesAllowedBinarySelectionPatterns(draft, nodes, rule.allowedCountPatterns)) {
        assignments.push({ ...draft });
      }
      return;
    }
    const node = nodes[index];
    rule.visibleChoiceIds.forEach((choiceId) => {
      draft[node.id] = choiceId;
      visit(index + 1);
    });
    delete draft[node.id];
  }

  visit(0);
  return assignments;
}

function binaryAssignmentsMatch(leftAssignment = {}, rightAssignment = {}, nodes = []) {
  return nodes.every((node) => leftAssignment[node.id] === rightAssignment[node.id]);
}

function pickBestBinaryAssignmentCandidate({
  participant,
  groupNode = null,
  assignments = [],
  currentSelections = {},
  pinnedNodeId = "",
}) {
  if (!assignments.length) {
    return null;
  }
  const defaultSelections = Object.fromEntries(
    getBinarySelectorNodes(participant, groupNode).map((node) => [
      node.id,
      getDefaultBinaryChoiceIdForNode(participant, node, groupNode),
    ])
  );
  return assignments.reduce((bestAssignment, assignment) => {
    if (!bestAssignment) {
      return assignment;
    }
    const bestScore = scoreBinarySelectionAssignment({
      assignment: bestAssignment,
      currentSelections,
      defaultSelections,
      pinnedNodeId,
    });
    const candidateScore = scoreBinarySelectionAssignment({
      assignment,
      currentSelections,
      defaultSelections,
      pinnedNodeId,
    });
    return candidateScore > bestScore ? assignment : bestAssignment;
  }, null);
}

function getAllowedBinaryChoiceIds(participant, node, groupNode = null) {
  const rule = getBinarySelectorRuleForParticipant({
    ...participant,
    templateId: getBinarySelectorTemplateIdForNode(participant, groupNode),
  });
  return rule.visibleChoiceIds.filter((choiceId) =>
    !!findBestBinarySelectionAssignment(participant, groupNode, {
      pinnedNodeId: node?.id,
      pinnedChoiceId: choiceId,
    })
  );
}

function getInitialParticipantBinarySelections(participant) {
  const groupNodes = getParticipantBinarySelectorGroups(participant);
  if (!groupNodes.length) {
    return {};
  }
  return Object.assign(
    {},
    ...groupNodes.map((groupNode) =>
      Object.fromEntries(
        getBinarySelectorNodes(participant, groupNode).map((node) => [
          node.id,
          getDefaultBinaryChoiceIdForNode(participant, node, groupNode),
        ])
      )
    )
  );
}

function visitHierarchyNodes(nodes = [], visitor = () => {}) {
  (Array.isArray(nodes) ? nodes : []).forEach((node) => {
    visitor(node);
    visitHierarchyNodes(node?.children, visitor);
  });
}

function findHierarchyNodeById(nodes = [], nodeId = "") {
  for (const node of Array.isArray(nodes) ? nodes : []) {
    if (node?.id === nodeId) {
      return node;
    }
    const childMatch = findHierarchyNodeById(node?.children, nodeId);
    if (childMatch) {
      return childMatch;
    }
  }
  return null;
}

function topLevelHierarchyHasRenderMode(nodes = [], renderMode = "") {
  return (Array.isArray(nodes) ? nodes : []).some((node) => node?.renderMode === renderMode);
}

function isCompositeGridRenderMode(renderMode = "") {
  return renderMode === "higgs-cluster-grid" || renderMode === "assembly-cluster-grid";
}

function getParticipantRootNode(participant) {
  return Array.isArray(participant?.hierarchy) ? participant.hierarchy[0] ?? null : null;
}

function getTransmuteNode(participant) {
  return participant?.templateId === "transmute" ? getParticipantRootNode(participant) : null;
}

function isCompositeParticipant(participant) {
  return isCompositeGridRenderMode(getParticipantRootNode(participant)?.renderMode ?? "");
}

function isReactantCompositeParticipant(participant) {
  return participant?.side === "reactant" && isCompositeParticipant(participant);
}

function isProductCompositeParticipant(participant) {
  return participant?.side === "product" && isCompositeParticipant(participant);
}

function isTransmuteParticipant(participant) {
  return participant?.side === "center" && String(participant?.templateId ?? "") === "transmute";
}

function isSingleMappingAnchorRole(role = "") {
  return role === "reactant" || role === "product";
}

function canStartMappingFromRole(role = "") {
  return role === "reactant" || role === "transmute-output";
}

function canTargetMappingRole(role = "") {
  return role === "product" || role === "transmute-input";
}

const transmuteCardHeightPx = 72;
const transmuteSlotStepPx = 108;
const transmuteSlotEdgePaddingPx = 18;

function getParticipantSideLabel(side = "", options = {}) {
  const label =
    side === "product" ? "product" : side === "center" ? "transmute tile" : "reactant";
  if (!options.capitalized) {
    return label;
  }
  return label[0]?.toUpperCase() + label.slice(1);
}

function createSvgElement(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function clampMenuPosition(clientX, clientY, menu, boundsElement) {
  if (!menu || !boundsElement) {
    return { left: clientX, top: clientY };
  }
  const bounds = boundsElement.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const maxLeft = bounds.right - menuRect.width - 12;
  const maxTop = bounds.bottom - menuRect.height - 12;
  return {
    left: Math.max(bounds.left + 12, Math.min(clientX, maxLeft)),
    top: Math.max(bounds.top + 12, Math.min(clientY, maxTop)),
  };
}

function readPersistedSolverActive(storage, storageKey) {
  if (!storage || !storageKey) {
    return false;
  }
  try {
    return storage.getItem(storageKey) === "true";
  } catch (_error) {
    return false;
  }
}

function persistSolverActive(storage, storageKey, active) {
  if (!storage || !storageKey) {
    return;
  }
  try {
    storage.setItem(storageKey, active ? "true" : "false");
  } catch (_error) {
    // Ignore storage failures and keep the solver working in-memory.
  }
}

export function createComposerReactionSolverUiRuntime(deps) {
  const {
    toggleButton,
    root,
    surface,
    reactantsColumn,
    productsColumn,
    mapHint,
    emptyState,
    mapSvg,
    menu,
    templateMenuRows = [],
    extraTemplateEntries = [],
    setStatus = () => {},
    closeExternalMenus = () => {},
    onActiveChange = () => {},
    storage = null,
    storageKey = "",
  } = deps;

  const centerColumn = root?.querySelector(".composer-reaction-solver-center") ?? null;
  const templateEntries = dedupeTemplateEntries(templateMenuRows, extraTemplateEntries);
  const sortedTemplateEntries = sortTemplatePickerEntries(templateEntries);
  const state = {
    active: false,
    nextParticipantId: 1,
    nextMappingId: 1,
    nextSplitGroupId: 1,
    participants: [],
    mappings: [],
    pendingSourceKey: "",
    pendingSourceRole: "",
    menuMode: "root",
    menuSide: "reactant",
    menuParticipantId: "",
    menuOpen: false,
    menuClientX: 0,
    menuClientY: 0,
    anchorRegistry: new Map(),
    dragParticipantId: "",
    dragPointerId: null,
    hoveredMappingIds: [],
  };

  let drawFrameId = 0;

  function findMappingsByNodeKey(nodeKey) {
    return state.mappings.filter(
      (mapping) => mapping.sourceKey === nodeKey || mapping.targetKey === nodeKey
    );
  }

  function findMappingByNodeKey(nodeKey) {
    return findMappingsByNodeKey(nodeKey)[0] ?? null;
  }

  function getMappingIdsForAnchor(nodeKey, role) {
    return state.mappings
      .filter(
        (mapping) =>
          (mapping.sourceKey === nodeKey && mapping.sourceRole === role) ||
          (mapping.targetKey === nodeKey && mapping.targetRole === role)
      )
      .map((mapping) => mapping.id);
  }

  function getMappedKeyForRole(mapping, role) {
    if (mapping.sourceRole === role) {
      return mapping.sourceKey;
    }
    if (mapping.targetRole === role) {
      return mapping.targetKey;
    }
    return "";
  }

  function getConflictingMappings(nodeKey, role) {
    return state.mappings.filter((mapping) => {
      const mappedKey = getMappedKeyForRole(mapping, role);
      return mappedKey ? nodeKeysConflict(mappedKey, nodeKey) : false;
    });
  }

  function findParticipantById(participantId) {
    return state.participants.find((participant) => participant?.id === participantId) ?? null;
  }

  function createParticipantRecord({
    side,
    templateId,
    label,
    hierarchy,
    structure = null,
    extraFields = {},
  }) {
    const resolvedTemplateId = templateId || inferTemplateIdFromStructure(structure?.root ?? structure);
    const resolvedBaseLabel = stripLeadingParticipantPolarity(
      label || inferParticipantBaseLabelFromStructure(structure?.root ?? structure)
    );
    const resolvedPolarity = supportsParticipantPolarity(resolvedTemplateId)
      ? normalizeParticipantPolarity(
          extraFields.polarity ?? inferParticipantPolarityFromStructure(structure?.root ?? structure)
        )
      : "";
    const participant = {
      id: `solver_participant_${state.nextParticipantId++}`,
      side,
      templateId: resolvedTemplateId,
      baseLabel: resolvedBaseLabel,
      polarity: resolvedPolarity,
      label: formatParticipantLabel(resolvedBaseLabel, resolvedTemplateId, resolvedPolarity),
      hierarchy: Array.isArray(hierarchy) ? hierarchy : [],
      binarySelections: {},
      ...extraFields,
    };
    const participantStructure = structure?.root
      ? {
          root: cloneStructureNode(structure.root),
          validation: structure.validation ?? validateStructureTree(structure.root),
        }
      : structure
        ? {
            root: cloneStructureNode(structure),
            validation: validateStructureTree(structure),
          }
        : buildParticipantStructure(
            participant.id,
            participant.templateId,
            participant.baseLabel,
            participant.polarity
          );
    participant.structure = participantStructure.root;
    participant.structureValidation = participantStructure.validation;
    participant.hierarchy = buildParticipantHierarchy(participantStructure.root, hierarchy);
    syncParticipantHierarchyForPolarity(participant);
    participant.binarySelections = getInitialParticipantBinarySelections(participant);
    return participant;
  }

  function getNodeContext(nodeKey) {
    if (!nodeKey) {
      return null;
    }
    const existingContext = state.anchorRegistry.get(nodeKey) ?? null;
    if (existingContext) {
      return existingContext;
    }
    return rebuildAnchorRegistry().get(nodeKey) ?? null;
  }

  function resolveBinaryChoiceInventory(participant, node, groupNode = null) {
    const choice = getBinaryPersonalitySelection(participant, node, groupNode);
    const baseInventory = getBinaryChoiceInventory(choice?.id);
    const slotName = String(node?.slotName ?? "").trim().toLowerCase() || ({
      I: "inner",
      M: "middle",
      O: "outer",
    }[String(node?.slotCode ?? "").trim().toUpperCase()] ?? "");
    const groupRecord = resolveBinarySelectorGroup(participant, groupNode ?? node);
    const structureNode = participant?.structure && groupRecord?.id
      ? findStructureNodeById(participant.structure, groupRecord.id)
      : null;
    const coreNode =
      structureNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
        ? structureNode
        : getStructureNodeChildren(structureNode).find(
            (childNode) => childNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
          ) ?? null;
    const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
    if (!slotName || binaryPresence[slotName] !== false) {
      return baseInventory;
    }
    return {
      electrino: Math.max(0, Number(baseInventory.electrino ?? 0) - 1),
      positrino: Math.max(0, Number(baseInventory.positrino ?? 0) - 1),
    };
  }

  function createAnchorContext(participant, node) {
    if (!participant || !node?.id) {
      return null;
    }
    return {
      participant,
      node,
      structureNode: participant.structure ? findStructureNodeById(participant.structure, node.id) : null,
    };
  }

  function rebuildAnchorRegistry() {
    const registry = new Map();
    state.participants.forEach((participant) => {
      visitHierarchyNodes(participant.hierarchy, (node) => {
        const nodeKey = buildNodeKey(participant.id, node.id);
        const context = createAnchorContext(participant, node);
        if (context) {
          registry.set(nodeKey, context);
        }
      });
      getParticipantBinarySelectorGroups(participant).forEach((groupNode) => {
        const groupKey = buildNodeKey(participant.id, groupNode.id);
        if (!registry.has(groupKey)) {
          const groupContext = createAnchorContext(participant, groupNode);
          if (groupContext) {
            registry.set(groupKey, groupContext);
          }
        }
        (Array.isArray(groupNode?.slotNodes) ? groupNode.slotNodes : []).forEach((slotNode) => {
          const slotKey = buildNodeKey(participant.id, slotNode.id);
          if (registry.has(slotKey)) {
            return;
          }
          const slotContext = createAnchorContext(participant, slotNode);
          if (slotContext) {
            registry.set(slotKey, slotContext);
          }
        });
      });
    });
    state.anchorRegistry = registry;
    return registry;
  }

  function createEmptyLedger() {
    return {
      electrino: 0,
      positrino: 0,
    };
  }

  function addLedgers(leftLedger = null, rightLedger = null) {
    return {
      electrino: Number(leftLedger?.electrino ?? 0) + Number(rightLedger?.electrino ?? 0),
      positrino: Number(leftLedger?.positrino ?? 0) + Number(rightLedger?.positrino ?? 0),
    };
  }

  function ledgerFitsWithin(limitLedger = null, candidateLedger = null) {
    const limit = createEmptyLedger();
    const candidate = createEmptyLedger();
    limit.electrino = Number(limitLedger?.electrino ?? 0);
    limit.positrino = Number(limitLedger?.positrino ?? 0);
    candidate.electrino = Number(candidateLedger?.electrino ?? 0);
    candidate.positrino = Number(candidateLedger?.positrino ?? 0);
    return (
      candidate.electrino <= limit.electrino &&
      candidate.positrino <= limit.positrino
    );
  }

  function ledgersMatch(leftLedger = null, rightLedger = null) {
    return (
      Number(leftLedger?.electrino ?? 0) === Number(rightLedger?.electrino ?? 0) &&
      Number(leftLedger?.positrino ?? 0) === Number(rightLedger?.positrino ?? 0)
    );
  }

  function hasLedger(ledger = null) {
    return Number(ledger?.electrino ?? 0) > 0 || Number(ledger?.positrino ?? 0) > 0;
  }

  function formatLedger(ledger = null) {
    const parts = [];
    const electrinoCount = Number(ledger?.electrino ?? 0);
    const positrinoCount = Number(ledger?.positrino ?? 0);
    if (electrinoCount) {
      parts.push(`${electrinoCount} electrino`);
    }
    if (positrinoCount) {
      parts.push(`${positrinoCount} positrino`);
    }
    return parts.join(" + ") || "empty ledger";
  }

  function getNodeLedger(nodeKey) {
    const context = getNodeContext(nodeKey);
    const spec = context
      ? classifyComposerReactionNode(context.participant, context.node, {
          resolveBinaryChoiceInventory,
        })
      : null;
    return spec?.inventory ?? createEmptyLedger();
  }

  function getTransmuteLedgerSummary(participantId) {
    const incomingMappings = state.mappings.filter((mapping) => {
      const { participantId: targetParticipantId } = parseNodeKey(mapping.targetKey);
      return targetParticipantId === participantId && mapping.targetRole === "transmute-input";
    });
    const outgoingMappings = state.mappings.filter((mapping) => {
      const { participantId: sourceParticipantId } = parseNodeKey(mapping.sourceKey);
      return sourceParticipantId === participantId && mapping.sourceRole === "transmute-output";
    });
    const incomingLedger = incomingMappings.reduce(
      (ledger, mapping) => addLedgers(ledger, getNodeLedger(mapping.sourceKey)),
      createEmptyLedger()
    );
    const outgoingLedger = outgoingMappings.reduce(
      (ledger, mapping) => addLedgers(ledger, getNodeLedger(mapping.targetKey)),
      createEmptyLedger()
    );
    return {
      incomingLedger,
      outgoingLedger,
      isBalanced: hasLedger(incomingLedger) && hasLedger(outgoingLedger) && ledgersMatch(incomingLedger, outgoingLedger),
    };
  }

  function isTransmuteParticipantBalanced(participantId) {
    return getTransmuteLedgerSummary(participantId).isBalanced;
  }

  function getAnchorAvailability(role, nodeKey) {
    const existingMappings = findMappingsByNodeKey(nodeKey);
    if (existingMappings.length && isSingleMappingAnchorRole(role)) {
      return { disabled: false, reason: "" };
    }
    const hasConflict = isSingleMappingAnchorRole(role) && getConflictingMappings(nodeKey, role).some((mapping) => {
      const mappedKey = getMappedKeyForRole(mapping, role);
      return mappedKey && mappedKey !== nodeKey;
    });
    if (hasConflict) {
      return {
        disabled: true,
        reason: "Blocked by an existing ancestor or descendant mapping.",
      };
    }
    if (canTargetMappingRole(role) && state.pendingSourceKey) {
      const sourceContext = getNodeContext(state.pendingSourceKey);
      const targetContext = getNodeContext(nodeKey);
      if (state.pendingSourceRole === "reactant" && role === "product") {
        const evaluation = evaluateComposerReactionMappingCandidate({
          sourceParticipant: sourceContext?.participant,
          sourceNode: sourceContext?.node,
          targetParticipant: targetContext?.participant,
          targetNode: targetContext?.node,
          resolveBinaryChoiceInventory,
        });
        if (!evaluation.allowed) {
          return {
            disabled: true,
            reason: evaluation.reason,
          };
        }
      }
      if (state.pendingSourceRole === "transmute-output" && role === "product") {
        const transmuteId = parseNodeKey(state.pendingSourceKey).participantId;
        const transmuteSummary = getTransmuteLedgerSummary(transmuteId);
        const candidateLedger = addLedgers(
          transmuteSummary.outgoingLedger,
          classifyComposerReactionNode(targetContext?.participant, targetContext?.node, {
            resolveBinaryChoiceInventory,
          })?.inventory
        );
        if (!hasLedger(transmuteSummary.incomingLedger)) {
          return {
            disabled: true,
            reason: "Add conservative reactant inputs to this Transmute tile first.",
          };
        }
        if (!ledgerFitsWithin(transmuteSummary.incomingLedger, candidateLedger)) {
          return {
            disabled: true,
            reason: `Transmute output would exceed its incoming ledger: ${formatLedger(transmuteSummary.incomingLedger)} available.`,
          };
        }
      }
      if (state.pendingSourceRole === "transmute-output" && role === "transmute-input") {
        return {
          disabled: true,
          reason: "Transmute outputs connect to product targets only.",
        };
      }
    }
    return { disabled: false, reason: "" };
  }

  function removeMappingById(mappingId) {
    const beforeCount = state.mappings.length;
    state.mappings = state.mappings.filter((mapping) => mapping.id !== mappingId);
    return beforeCount !== state.mappings.length;
  }

  function removeMappingsForParticipant(participantId) {
    const beforeCount = state.mappings.length;
    state.mappings = state.mappings.filter((mapping) => {
      const sourceParticipantId = parseNodeKey(mapping.sourceKey).participantId;
      const targetParticipantId = parseNodeKey(mapping.targetKey).participantId;
      return sourceParticipantId !== participantId && targetParticipantId !== participantId;
    });
    if (parseNodeKey(state.pendingSourceKey).participantId === participantId) {
      state.pendingSourceKey = "";
      state.pendingSourceRole = "";
    }
    state.hoveredMappingIds = state.hoveredMappingIds.filter((mappingId) =>
      state.mappings.some((mapping) => mapping.id === mappingId)
    );
    return beforeCount !== state.mappings.length;
  }

  function removeParticipantById(participantId) {
    const participant = findParticipantById(participantId);
    if (!participant) {
      return false;
    }
    state.participants = state.participants.filter(
      (entry) => String(entry?.id ?? "") !== participantId
    );
    removeMappingsForParticipant(participantId);
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} ${participant.label} removed from the reaction solver.`
    );
    return true;
  }

  function setParticipantPolarity(participantId, nextPolarity) {
    const participant = findParticipantById(participantId);
    if (!participant || !supportsParticipantPolarity(participant.templateId)) {
      return false;
    }
    const resolvedPolarity = normalizeParticipantPolarity(nextPolarity);
    if (participant.polarity === resolvedPolarity) {
      return false;
    }
    const currentSelections = getResolvedBinarySelectionMap(participant);
    participant.polarity = resolvedPolarity;
    syncParticipantHierarchyForPolarity(participant);
    removeMappingsForParticipant(participantId);
    participant.binarySelections = Object.fromEntries(
      Object.entries(currentSelections).map(([nodeId, choiceId]) => [
        nodeId,
        invertBinaryChoiceId(choiceId),
      ])
    );
    participant.label = formatParticipantLabel(
      participant.baseLabel ?? participant.label,
      participant.templateId,
      resolvedPolarity
    );
    const nextStructure = applyParticipantPolarityToStructure(
      participant.structure,
      resolvedPolarity
    );
    refreshParticipantFromStructure(participant, nextStructure, {
      preserveBinarySelections: true,
    });
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} ${participant.label} updated.`
    );
    return true;
  }

  function refreshParticipantFromStructure(participant, nextStructure, options = {}) {
    if (!participant || !nextStructure) {
      return false;
    }
    const resolvedStructure = cloneStructureNode(nextStructure);
    const resolvedTemplateId = inferTemplateIdFromStructure(resolvedStructure);
    const resolvedPolarity = supportsParticipantPolarity(resolvedTemplateId)
      ? inferParticipantPolarityFromStructure(resolvedStructure)
      : participant.polarity;
    const resolvedBaseLabel = inferParticipantBaseLabelFromStructure(resolvedStructure);

    participant.templateId = resolvedTemplateId;
    participant.polarity = resolvedPolarity;
    participant.baseLabel = resolvedBaseLabel;
    participant.label = formatParticipantLabel(
      resolvedBaseLabel,
      resolvedTemplateId,
      resolvedPolarity
    );
    participant.structure = resolvedStructure;
    participant.structureValidation = validateStructureTree(resolvedStructure);
    participant.hierarchy = buildParticipantHierarchy(
      resolvedStructure,
      options.fallbackHierarchy ?? participant.hierarchy
    );
    if (options.preserveBinarySelections !== true) {
      participant.binarySelections = getInitialParticipantBinarySelections(participant);
    }
    return true;
  }

  function applyParticipantPolarityToStructure(root, nextPolarity) {
    if (!root) {
      return null;
    }
    const resolvedPolarity = normalizeParticipantPolarity(nextPolarity);
    return mapStructure(root, (node, context) => {
      if (context.parent != null && node.kind !== STRUCTURE_KINDS.NOETHER_CORE) {
        return node;
      }
      return {
        ...node,
        traits: {
          ...(node.traits ?? {}),
          polarity: resolvedPolarity,
        },
      };
    });
  }

  function getParticipantPrimaryNoetherCore(participant) {
    if (!participant?.structure) {
      return null;
    }
    if (participant.structure.kind === STRUCTURE_KINDS.NOETHER_CORE) {
      return participant.structure;
    }
    return (
      getStructureNodeChildren(participant.structure).find(
        (childNode) => childNode?.kind === STRUCTURE_KINDS.NOETHER_CORE
      ) ?? null
    );
  }

  function getNextParticipantGenerationTrimAction(participant) {
    const family = String(participant?.structure?.classification?.family ?? "").trim();
    const supportedFamilies = new Set([
      STRUCTURE_CLASSIFICATION_FAMILIES.CHARGED_LEPTON,
      STRUCTURE_CLASSIFICATION_FAMILIES.NEUTRINO,
      STRUCTURE_CLASSIFICATION_FAMILIES.UP_TYPE_QUARK,
      STRUCTURE_CLASSIFICATION_FAMILIES.DOWN_TYPE_QUARK,
    ]);
    if (!supportedFamilies.has(family)) {
      return null;
    }
    const coreNode = getParticipantPrimaryNoetherCore(participant);
    const binaryPresence = getNoetherCoreSlotBinaryPresence(coreNode);
    if (binaryPresence.outer) {
      return {
        slotName: "outer",
        menuLabel: "Remove outer binary",
      };
    }
    if (binaryPresence.middle) {
      return {
        slotName: "middle",
        menuLabel: "Remove middle binary",
      };
    }
    return null;
  }

  function trimParticipantGenerationSlot(participantId, slotName) {
    const participant = findParticipantById(participantId);
    if (!participant?.structure) {
      return false;
    }
    const coreNode = getParticipantPrimaryNoetherCore(participant);
    if (!coreNode?.id) {
      return false;
    }
    const nextStructure = clearNoetherCoreSlotOccupant(
      participant.structure,
      coreNode.id,
      slotName
    );
    removeMappingsForParticipant(participantId);
    refreshParticipantFromStructure(participant, nextStructure, {
      preserveBinarySelections: true,
    });
    closeMenu();
    render();
    setStatus(
      `${getParticipantSideLabel(participant.side, { capitalized: true })} reclassified as ${participant.label}.`
    );
    return true;
  }

  function buildSplitParticipantsFromChildStructures(participant, childStructures = [], extraFieldsByIndex = () => ({})) {
    return (Array.isArray(childStructures) ? childStructures : []).map((childStructure, index) =>
      createParticipantRecord({
        side: participant.side,
        templateId: inferTemplateIdFromStructure(childStructure),
        label: inferParticipantBaseLabelFromStructure(childStructure),
        structure: childStructure,
        hierarchy: buildParticipantHierarchy(childStructure, []),
        extraFields: {
          polarity: inferParticipantPolarityFromStructure(childStructure),
          ...extraFieldsByIndex(childStructure, index),
        },
      })
    );
  }

  function splitHiggsParticipantById(participantId) {
    const participantIndex = state.participants.findIndex(
      (entry) => String(entry?.id ?? "") === participantId
    );
    const participant =
      participantIndex >= 0 ? state.participants[participantIndex] ?? null : null;
    if (!participant || participant.templateId !== "higgs_cluster") {
      return false;
    }

    const splitGroupId = `solver_split_group_${state.nextSplitGroupId++}`;
    const childStructures = getStructureNodeChildren(participant.structure);
    const replacementParticipants = buildSplitParticipantsFromChildStructures(
      participant,
      childStructures,
      (childStructure, index) => ({
        splitGroupId,
        splitOriginTemplateId: "higgs_cluster",
        splitOriginRole: inferParticipantPolarityFromStructure(childStructure),
        splitOriginIndex: index,
      })
    );
    if (!replacementParticipants.length) {
      return false;
    }

    state.participants.splice(participantIndex, 1, ...replacementParticipants);
    removeMappingsForParticipant(participantId);
    closeMenu();
    render();
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} Higgs cluster split into four core assemblies.`
    );
    return true;
  }

  function splitCompositeParticipantById(participantId) {
    const participant = findParticipantById(participantId);
    if (!participant) {
      return false;
    }
    if (participant.templateId === "higgs_cluster") {
      return splitHiggsParticipantById(participantId);
    }
    if (participant.templateId !== "neutron" && participant.templateId !== "proton") {
      return false;
    }

    const participantIndex = state.participants.findIndex(
      (entry) => String(entry?.id ?? "") === participantId
    );
    const splitGroupId = `solver_split_group_${state.nextSplitGroupId++}`;
    const childStructures = getStructureNodeChildren(participant.structure);
    const replacementParticipants = buildSplitParticipantsFromChildStructures(
      participant,
      childStructures,
      (_childStructure, index) => ({
        splitGroupId,
        splitOriginTemplateId: participant.templateId,
        splitOriginIndex: index,
      })
    );
    if (!replacementParticipants.length) {
      return false;
    }

    state.participants.splice(participantIndex, 1, ...replacementParticipants);
    removeMappingsForParticipant(participantId);
    closeMenu();
    render();
    setStatus(
      `${participant.side === "reactant" ? "Reactant" : "Product"} ${participant.label} split into constituent quarks.`
    );
    return true;
  }

  function addOrReplaceMapping(sourceKey, sourceRole, targetKey, targetRole) {
    state.mappings = state.mappings.filter((mapping) => {
      const sourceConflict = isSingleMappingAnchorRole(sourceRole)
        ? nodeKeysConflict(mapping.sourceKey, sourceKey) || nodeKeysConflict(mapping.targetKey, sourceKey)
        : false;
      const targetConflict = isSingleMappingAnchorRole(targetRole)
        ? nodeKeysConflict(mapping.sourceKey, targetKey) || nodeKeysConflict(mapping.targetKey, targetKey)
        : false;
      return !(sourceConflict || targetConflict);
    });
    state.mappings.push({
      id: `solver_mapping_${state.nextMappingId++}`,
      sourceKey,
      targetKey,
      sourceRole,
      targetRole,
    });
    state.hoveredMappingIds = [];
  }

  function clearPendingSource() {
    if (!state.pendingSourceKey) {
      return;
    }
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    render();
  }

  function getAnchorDisabled(role, nodeKey) {
    return getAnchorAvailability(role, nodeKey).disabled;
  }

  function countEligibleTargets() {
    if (!state.pendingSourceKey) {
      return 0;
    }
    let count = 0;
    state.participants
      .filter((participant) => participant.side === "product" || participant.side === "center")
      .forEach((participant) => {
        const visit = (nodes = []) => {
          nodes.forEach((node) => {
            const nodeKey = buildNodeKey(participant.id, node.id);
            if (participant.side === "product") {
              if (!getAnchorAvailability("product", nodeKey).disabled) {
                count += 1;
              }
            } else if (participant.side === "center") {
              const transmuteNode = getTransmuteNode(participant);
              if (transmuteNode && node.id === transmuteNode.id) {
                if (!getAnchorAvailability("transmute-input", nodeKey).disabled) {
                  count += 1;
                }
              }
            }
            if (shouldRenderChildNodes(node)) {
              visit(node.children);
            }
          });
        };
        visit(participant.hierarchy);
      });
    return count;
  }

  function getBinaryPersonalitySelection(participant, node, groupNode = null) {
    const selectionMap = getResolvedBinarySelectionMap(participant, groupNode);
    return getBinaryPersonalityChoice(selectionMap[node?.id]);
  }

  function setBinaryPersonalitySelection(participantId, nodeId, choiceId) {
    const participant = findParticipantById(participantId);
    if (!participant || !nodeId) {
      return;
    }
    const groupNode = resolveBinarySelectorGroup(participant, nodeId);
    const nextSelections =
      findBestBinarySelectionAssignment(participant, groupNode, {
        pinnedNodeId: nodeId,
        pinnedChoiceId: getBinaryPersonalityChoice(choiceId).id,
      }) ?? null;
    if (!nextSelections) {
      return;
    }
    participant.binarySelections = nextSelections;
    render();
  }

  function cycleQuarkBinaryPreset(participantId, nodeId) {
    const participant = findParticipantById(participantId);
    if (!participant || !nodeId) {
      return;
    }
    const groupNode = resolveBinarySelectorGroup(participant, nodeId);
    if (!groupNode || !isQuarkTemplateId(groupNode.templateId)) {
      return;
    }
    const nodes = getBinarySelectorNodes(participant, groupNode);
    const clickedNode = nodes.find((node) => node.id === nodeId);
    if (!clickedNode) {
      return;
    }
    const currentSelections = getResolvedBinarySelectionMap(participant, groupNode);
    const validAssignments = enumerateValidBinarySelectionAssignments(participant, groupNode);
    if (!validAssignments.length) {
      return;
    }

    const choiceCycle = getBinarySelectorRuleForParticipant({
      ...participant,
      templateId: groupNode.templateId,
    }).visibleChoiceIds
      .filter((choiceId) =>
        validAssignments.some((assignment) => assignment[clickedNode.id] === choiceId)
      );
    if (!choiceCycle.length) {
      return;
    }
    const currentChoiceId = currentSelections[clickedNode.id];
    const currentChoiceIndex = Math.max(0, choiceCycle.indexOf(currentChoiceId));
    const nextChoiceId = choiceCycle[(currentChoiceIndex + 1) % choiceCycle.length];
    const candidateAssignments = validAssignments.filter(
      (assignment) =>
        assignment[clickedNode.id] === nextChoiceId &&
        !binaryAssignmentsMatch(assignment, currentSelections, nodes)
    );
    const nextSelections = pickBestBinaryAssignmentCandidate({
      participant,
      groupNode,
      assignments: candidateAssignments,
      currentSelections,
      pinnedNodeId: clickedNode.id,
    });
    if (!nextSelections) {
      return;
    }
    participant.binarySelections = nextSelections;
    render();
  }

  function closeMenu() {
    if (!menu) {
      return;
    }
    state.menuOpen = false;
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = "";
  }

  function updateMenuPosition() {
    if (!state.menuOpen || !menu || !root) {
      return;
    }
    const { left, top } = clampMenuPosition(
      state.menuClientX,
      state.menuClientY,
      menu,
      root
    );
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function renderMenuTitle(text) {
    const title = document.createElement("div");
    title.className = "composer-reaction-solver-menu-title";
    title.textContent = text;
    menu.appendChild(title);
  }

  function renderMenuButton(text, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "composer-reaction-solver-menu-button";
    if (Array.isArray(options.extraClassNames)) {
      options.extraClassNames.filter(Boolean).forEach((className) => {
        button.classList.add(className);
      });
    }
    if (Array.isArray(options.lines) && options.lines.length) {
      options.lines.forEach((line) => {
        const lineElement = document.createElement("span");
        lineElement.className = "composer-reaction-solver-menu-button-line";
        lineElement.textContent = String(line ?? "");
        button.appendChild(lineElement);
      });
    } else {
      button.textContent = text;
    }
    button.disabled = !!options.disabled;
    if (options.kind) {
      button.dataset.kind = options.kind;
    }
    if (typeof options.onClick === "function") {
      button.addEventListener("click", options.onClick);
    }
    menu.appendChild(button);
    return button;
  }

  function openTemplatePicker(side) {
    state.menuMode = "template-picker";
    state.menuSide = side === "product" ? "product" : "reactant";
    state.menuParticipantId = "";
    renderMenu();
  }

  function openParticipantMenuAt(participantId, clientX, clientY) {
    if (!state.active || !menu || !findParticipantById(participantId)) {
      return;
    }
    closeExternalMenus();
    state.menuClientX = clientX;
    state.menuClientY = clientY;
    state.menuMode = "participant-actions";
    state.menuParticipantId = participantId;
    state.menuOpen = true;
    renderMenu();
  }

  function addParticipant(side, templateId, options = {}) {
    const templateEntry =
      templateEntries.find((entry) => entry.template === templateId) ??
      templateEntries[0] ??
      null;
    if (!templateEntry) {
      return;
    }
    const participantLabel =
      getDefaultParticipantBaseLabel(templateEntry.template, templateEntry.label);
    const participant = createParticipantRecord({
      side,
      templateId: templateEntry.template,
      label: participantLabel,
      hierarchy: buildHierarchyForTemplate(templateEntry.template, participantLabel),
      extraFields: {
        polarity: options.initialPolarity ?? templateEntry.initialPolarity ?? "",
      },
    });
    state.participants.push(participant);
    state.pendingSourceKey = "";
    closeMenu();
    render();
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver.`
    );
  }

  function createTransmuteHierarchy() {
    return [
      {
        id: "root",
        label: "Transmute",
        renderMode: "transmute-tile",
        children: [],
      },
    ];
  }

  function addTransmuteParticipant() {
    const participant = createParticipantRecord({
      side: "center",
      templateId: "transmute",
      label: "Transmute",
      hierarchy: createTransmuteHierarchy(),
      extraFields: {
        centerSlotIndex: 0,
        centerYRatio: 0.5,
      },
    });
    state.participants.push(participant);
    assignTransmuteParticipantToSlot(participant, getFirstAvailableTransmuteSlotIndex(participant.id));
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    closeMenu();
    render();
    setStatus("Transmute tile added to the reaction solver.");
  }

  function clearReactionCanvas() {
    if (!state.participants.length && !state.mappings.length && !state.pendingSourceKey) {
      closeMenu();
      render();
      setStatus("Reaction canvas is already clear.");
      return;
    }
    state.participants = [];
    state.mappings = [];
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    state.hoveredMappingIds = [];
    closeMenu();
    render();
    setStatus("Reaction canvas cleared.");
  }

  function applyHoveredRouteState() {
    if (!surface || !mapSvg) {
      return;
    }
    const hoveredMappingIds = new Set(state.hoveredMappingIds);
    const hasHoveredRoute = hoveredMappingIds.size > 0;

    surface
      .querySelectorAll(".composer-reaction-solver-anchor[data-anchor-key][data-anchor-side]")
      .forEach((anchor) => {
        const anchorKey = anchor.getAttribute("data-anchor-key") ?? "";
        const anchorRole = anchor.getAttribute("data-anchor-side") ?? "";
        const mappingIds = getMappingIdsForAnchor(anchorKey, anchorRole);
        const isMapped = mappingIds.length > 0;
        const isHighlighted =
          isMapped && mappingIds.some((mappingId) => hoveredMappingIds.has(mappingId));
        anchor.classList.toggle("is-route-highlighted", isHighlighted);
        anchor.classList.toggle(
          "is-route-dimmed",
          hasHoveredRoute && isMapped && !isHighlighted
        );
      });

    mapSvg.querySelectorAll(".composer-reaction-solver-path[data-mapping-id]").forEach((path) => {
      const mappingId = path.getAttribute("data-mapping-id") ?? "";
      const isHighlighted = hoveredMappingIds.has(mappingId);
      path.classList.toggle("is-route-highlighted", isHighlighted);
      path.classList.toggle("is-route-dimmed", hasHoveredRoute && !isHighlighted);
    });
  }

  function setHoveredMappingIds(mappingIds = []) {
    const nextIds = [...new Set(mappingIds.filter(Boolean))].sort();
    const currentIds = [...state.hoveredMappingIds].sort();
    if (
      nextIds.length === currentIds.length &&
      nextIds.every((mappingId, index) => mappingId === currentIds[index])
    ) {
      return;
    }
    state.hoveredMappingIds = nextIds;
    applyHoveredRouteState();
  }

  function renderMenu() {
    if (!menu) {
      return;
    }
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    menu.innerHTML = "";
    menu.dataset.menuMode = state.menuMode;
    if (state.menuMode === "template-picker") {
      renderMenuTitle(
        state.menuSide === "product" ? "Choose product" : "Choose reactant"
      );
      sortedTemplateEntries.forEach((entry) => {
        const itemButton = renderMenuButton(entry.label, {
          onClick: () =>
            addParticipant(state.menuSide, entry.template, {
              initialPolarity: entry.initialPolarity,
            }),
        });
        const meta = getTemplateMeta(entry.template, entry.label);
        itemButton.style.setProperty("--solver-entry-accent", meta.accent);
        itemButton.dataset.shortLabel = meta.shortLabel;
      });
      renderMenuButton("Back", {
        kind: "secondary",
        onClick: () => {
          state.menuMode = "root";
          state.menuParticipantId = "";
          renderMenu();
        },
      });
    } else if (state.menuMode === "participant-actions") {
      const participant = findParticipantById(state.menuParticipantId);
      if (!participant) {
        state.menuMode = "root";
        state.menuParticipantId = "";
        renderMenu();
        return;
      }
      renderMenuTitle(participant.label);
      if (
        participant.templateId === "higgs_cluster" ||
        participant.templateId === "neutron" ||
        participant.templateId === "proton"
      ) {
        renderMenuButton("Split assembly", {
          onClick: () => splitCompositeParticipantById(participant.id),
        });
      }
      const generationTrimAction = getNextParticipantGenerationTrimAction(participant);
      if (generationTrimAction) {
        renderMenuButton(generationTrimAction.menuLabel, {
          onClick: () => trimParticipantGenerationSlot(participant.id, generationTrimAction.slotName),
        });
      }
      if (supportsParticipantPolarity(participant.templateId)) {
        renderMenuButton(
          participant.polarity === "anti" ? "Make pro" : "Make anti",
          {
            onClick: () =>
              setParticipantPolarity(
                participant.id,
                participant.polarity === "anti" ? "pro" : "anti"
              ),
          }
        );
      }
      renderMenuButton(
        `Remove ${getParticipantSideLabel(participant.side)}`,
        {
          onClick: () => removeParticipantById(participant.id),
        }
      );
      renderMenuButton("Back", {
        kind: "secondary",
        onClick: () => {
          state.menuMode = "root";
          state.menuParticipantId = "";
          renderMenu();
        },
      });
    } else {
      renderMenuTitle("Reaction");
      renderMenuButton("Add reactant", {
        lines: ["Add", "Reactant"],
        extraClassNames: ["is-root-tile"],
        onClick: () => openTemplatePicker("reactant"),
      });
      renderMenuButton("Add product", {
        lines: ["Add", "Product"],
        extraClassNames: ["is-root-tile"],
        onClick: () => openTemplatePicker("product"),
      });
      renderMenuButton("Add transmute", {
        lines: ["Add", "Transmute"],
        extraClassNames: ["is-wide", "is-root-tile"],
        onClick: () => addTransmuteParticipant(),
      });
      renderMenuButton("Clear reaction canvas", {
        kind: "secondary",
        extraClassNames: ["is-wide"],
        disabled: !state.participants.length && !state.mappings.length && !state.pendingSourceKey,
        onClick: () => clearReactionCanvas(),
      });
      renderMenuButton("Auto solve (not yet implemented)", {
        disabled: true,
        extraClassNames: ["is-wide"],
      });
    }
    updateMenuPosition();
  }

  function openMenuAt(clientX, clientY) {
    if (!state.active || !menu) {
      return;
    }
    closeExternalMenus();
    state.menuClientX = clientX;
    state.menuClientY = clientY;
    state.menuMode = "root";
    state.menuParticipantId = "";
    state.menuOpen = true;
    renderMenu();
  }

  function setActive(nextValue, options = {}) {
    const { persist = true, announce = true } = options;
    const nextActive = !!nextValue;
    if (state.active === nextActive) {
      return;
    }
    state.active = nextActive;
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    closeMenu();
    closeExternalMenus();
    if (root) {
      root.classList.toggle("is-open", nextActive);
      root.setAttribute("aria-hidden", nextActive ? "false" : "true");
    }
    if (toggleButton) {
      toggleButton.classList.toggle("is-active", nextActive);
      toggleButton.setAttribute("aria-pressed", nextActive ? "true" : "false");
    }
    onActiveChange(nextActive);
    if (persist) {
      persistSolverActive(storage, storageKey, nextActive);
    }
    render();
    if (announce) {
      setStatus(
        nextActive
          ? "Reaction solver opened. Right-click the reaction canvas to add reactants, products, or a Transmute tile."
          : "Reaction solver closed."
      );
    }
  }

  function toggleActive() {
    setActive(!state.active);
  }

  function handleAnchorClick(role, nodeKey) {
    if (isSingleMappingAnchorRole(role)) {
      const existingMapping = findMappingByNodeKey(nodeKey);
      if (existingMapping) {
        state.pendingSourceKey = "";
        state.pendingSourceRole = "";
        if (removeMappingById(existingMapping.id)) {
          render();
          setStatus("Removed reaction mapping.");
        }
        return;
      }
    }

    const anchorAvailability = getAnchorAvailability(role, nodeKey);
    if (anchorAvailability.disabled) {
      if (anchorAvailability.reason) {
        setStatus(anchorAvailability.reason);
      }
      return;
    }

    if (canStartMappingFromRole(role)) {
      const isClearingPending =
        state.pendingSourceKey === nodeKey && state.pendingSourceRole === role;
      state.pendingSourceKey = isClearingPending ? "" : nodeKey;
      state.pendingSourceRole = isClearingPending ? "" : role;
      render();
      if (!state.pendingSourceKey) {
        setStatus(
          role === "transmute-output"
            ? "Transmute output anchor cleared."
            : "Reactant anchor cleared."
        );
        return;
      }
      const eligibleTargetCount = countEligibleTargets();
      if (role === "transmute-output") {
        setStatus(
          eligibleTargetCount
            ? "Transmute output selected. Conservative product targets remain active; incompatible targets are dimmed."
            : "Transmute output selected, but no conservative product targets are currently available."
        );
        return;
      }
      setStatus(
        eligibleTargetCount
          ? "Reactant anchor selected. Conservative product and Transmute targets remain active; incompatible targets are dimmed."
          : "Reactant anchor selected, but no conservative targets are currently available."
      );
      return;
    }

    if (!state.pendingSourceKey || !state.pendingSourceRole) {
      setStatus("Choose a reactant or Transmute output anchor first.");
      return;
    }

    if (
      state.pendingSourceRole === "reactant" &&
      role !== "product" &&
      role !== "transmute-input"
    ) {
      setStatus("Reactant anchors connect to products or to a Transmute input.");
      return;
    }
    if (state.pendingSourceRole === "transmute-output" && role !== "product") {
      setStatus("Transmute outputs connect to product anchors only.");
      return;
    }

    addOrReplaceMapping(state.pendingSourceKey, state.pendingSourceRole, nodeKey, role);
    state.pendingSourceKey = "";
    state.pendingSourceRole = "";
    render();
    setStatus(
      role === "transmute-input" ? "Reactant routed into Transmute." : "Reaction mapping added."
    );
  }

  function createBinaryGlyph(choice = null, options = {}) {
    const { showPersonality = true, showBinary = true } = options;
    const glyph = createSvgElement("svg");
    glyph.classList.add("composer-reaction-solver-binary-glyph");
    glyph.setAttribute("viewBox", "0 0 120 120");
    glyph.setAttribute("aria-hidden", "true");

    if (showBinary) {
      const orbit = createSvgElement("ellipse");
      orbit.classList.add("composer-reaction-solver-binary-glyph-orbit");
      orbit.setAttribute("cx", "60");
      orbit.setAttribute("cy", "60");
      orbit.setAttribute("rx", "38");
      orbit.setAttribute("ry", "13");
      glyph.appendChild(orbit);

      const axis = createSvgElement("line");
      axis.classList.add("composer-reaction-solver-binary-glyph-axis");
      axis.setAttribute("x1", "60");
      axis.setAttribute("y1", "18");
      axis.setAttribute("x2", "60");
      axis.setAttribute("y2", "102");
      glyph.appendChild(axis);

      const leftPole = createSvgElement("circle");
      leftPole.classList.add("composer-reaction-solver-binary-dot", "is-left", "is-electrino");
      leftPole.setAttribute("cx", "22");
      leftPole.setAttribute("cy", "60");
      leftPole.setAttribute("r", "8.5");
      glyph.appendChild(leftPole);

      const rightPole = createSvgElement("circle");
      rightPole.classList.add("composer-reaction-solver-binary-dot", "is-right", "is-positrino");
      rightPole.setAttribute("cx", "98");
      rightPole.setAttribute("cy", "60");
      rightPole.setAttribute("r", "8.5");
      glyph.appendChild(rightPole);
    }

    if (showPersonality && choice) {
      const topDot = createSvgElement("circle");
      topDot.classList.add("composer-reaction-solver-binary-dot", "is-top", `is-${choice.top}`);
      topDot.setAttribute("cx", "60");
      topDot.setAttribute("cy", "18");
      topDot.setAttribute("r", "7.8");
      glyph.appendChild(topDot);

      const bottomDot = createSvgElement("circle");
      bottomDot.classList.add("composer-reaction-solver-binary-dot", "is-bottom", `is-${choice.bottom}`);
      bottomDot.setAttribute("cx", "60");
      bottomDot.setAttribute("cy", "102");
      bottomDot.setAttribute("r", "7.8");
      glyph.appendChild(bottomDot);
    }

    return glyph;
  }

  function createBareBinaryContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector is-${participant.side}`;
    const slot = document.createElement("span");
    slot.className = "composer-reaction-solver-binary-slot";
    slot.textContent = node.slotCode || "?";
    const choices = document.createElement("div");
    choices.className = "composer-reaction-solver-binary-choices is-single";
    choices.style.setProperty("--binary-choice-columns", "1");

    const chip = document.createElement("div");
    chip.className = "composer-reaction-solver-binary-choice is-static";
    chip.style.setProperty("--binary-choice-accent", "#b889ff");
    chip.appendChild(createBinaryGlyph(null, { showPersonality: false }));
    choices.appendChild(chip);

    if (participant.side === "product") {
      wrapper.append(choices, slot);
    } else {
      wrapper.append(slot, choices);
    }
    return wrapper;
  }

  function createAnchorButton(participant, node, nodeKey, options = {}) {
    const { extraClassNames = [], anchorRole = participant.side } = options;
    const anchorAvailability = getAnchorAvailability(anchorRole, nodeKey);
    const mappings = findMappingsByNodeKey(nodeKey);
    const mapping = isSingleMappingAnchorRole(anchorRole) ? mappings[0] ?? null : null;
    const hasRoleMapping = isSingleMappingAnchorRole(anchorRole)
      ? !!mapping
      : mappings.some((entry) =>
          entry.sourceRole === anchorRole || entry.targetRole === anchorRole
        );
    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "composer-reaction-solver-anchor";
    extraClassNames
      .filter(Boolean)
      .forEach((className) => anchor.classList.add(className));
    anchor.dataset.anchorKey = nodeKey;
    anchor.dataset.anchorSide = anchorRole;
    anchor.setAttribute(
      "aria-label",
      `${anchorRole === "product" ? "Product" : anchorRole === "transmute-input" ? "Transmute input" : anchorRole === "transmute-output" ? "Transmute output" : "Reactant"} attach point for ${node.label}`
    );
    anchor.disabled = anchorAvailability.disabled;
    if (anchorAvailability.reason) {
      anchor.title = anchorAvailability.reason;
    }
    if (state.pendingSourceKey === nodeKey && state.pendingSourceRole === anchorRole) {
      anchor.classList.add("is-pending");
    }
    if (hasRoleMapping) {
      anchor.classList.add("is-mapped");
    }
    anchor.addEventListener("pointerenter", () =>
      setHoveredMappingIds(getMappingIdsForAnchor(nodeKey, anchorRole))
    );
    anchor.addEventListener("pointerleave", () => setHoveredMappingIds([]));
    anchor.addEventListener("click", () => handleAnchorClick(anchorRole, nodeKey));
    return anchor;
  }

  function getCoreBinaryNodes(node) {
    return (Array.isArray(node?.children) ? node.children : [])
      .filter((child) => child?.slotCode)
      .sort((left, right) => {
        const leftRank = binarySlotRankByCode[left?.slotCode] ?? Number.MAX_SAFE_INTEGER;
        const rightRank = binarySlotRankByCode[right?.slotCode] ?? Number.MAX_SAFE_INTEGER;
        if (leftRank !== rightRank) {
          return leftRank - rightRank;
        }
        return String(left?.id ?? "").localeCompare(String(right?.id ?? ""));
      });
  }

  function getRenderedSlotCodesForSide(side) {
    return side === "product" ? ["O", "M", "I"] : ["I", "M", "O"];
  }

  function getRenderedCoreBinarySlots(participant, node) {
    const nodesBySlotCode = new Map(
      getCoreBinaryNodes(node).map((childNode) => [
        String(childNode?.slotCode ?? "").trim().toUpperCase(),
        childNode,
      ])
    );
    return getRenderedSlotCodesForSide(participant?.side).map(
      (slotCode) => nodesBySlotCode.get(slotCode) ?? null
    );
  }

  function createBinaryChoicePlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "composer-reaction-solver-binary-choice is-static is-placeholder";
    placeholder.setAttribute("aria-hidden", "true");
    return placeholder;
  }

  function createInlineAnchorLane(participant, node, nodeKey) {
    const lane = document.createElement("div");
    lane.className = `composer-reaction-solver-inline-anchor-lane is-${participant.side}`;
    lane.appendChild(createAnchorButton(participant, node, nodeKey));
    return lane;
  }

  function createSideSlotHeader(side) {
    const header = document.createElement("div");
    header.className = `composer-reaction-solver-side-slot-header is-${side}`;
    getRenderedSlotCodesForSide(side).forEach((slotCode) => {
      const slot = document.createElement("span");
      slot.className = "composer-reaction-solver-side-slot-header-slot";
      slot.textContent = slotCode;
      header.appendChild(slot);
    });
    return header;
  }

  function createNoetherCoreGridSections(participant, node) {
    const tiles = document.createElement("div");
    tiles.className = "composer-reaction-solver-noether-core-grid-track";
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      if (!childNode) {
        tiles.appendChild(createBinaryChoicePlaceholder());
        return;
      }
      const nodeKey = buildNodeKey(participant.id, childNode.id);
      const choice =
        childNode.renderMode === "binary-bare"
          ? null
          : getBinaryPersonalitySelection(participant, childNode);
      const tile = createAnchorButton(participant, childNode, nodeKey, {
        extraClassNames: [
          "composer-reaction-solver-binary-choice",
          "composer-reaction-solver-binary-choice-is-anchor",
          "composer-reaction-solver-noether-core-grid-tile",
          "is-static",
        ],
      });
      tile.style.setProperty(
        "--binary-choice-accent",
        choice?.accent ?? "#b889ff"
      );
      tile.appendChild(
        createBinaryGlyph(choice, {
          showPersonality: childNode.renderMode !== "binary-bare",
          showBinary: childNode.hasBinary !== false,
        })
      );
      tiles.appendChild(tile);
    });
    return { tiles };
  }

  function createNoetherCoreGridContent(participant, node) {
    const nodeKey = buildNodeKey(participant.id, node.id);
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-noether-core-grid is-${participant.side}`;
    const { tiles } = createNoetherCoreGridSections(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-noether-core-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), tiles);
    } else {
      body.append(tiles, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.appendChild(body);
    return wrapper;
  }

  function createBinarySelectorGridTrack(participant, node) {
    const track = document.createElement("div");
    track.className = "composer-reaction-solver-binary-selector-grid-track";
    track.style.setProperty("--binary-choice-size", "72px");
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      const column = document.createElement("div");
      column.className = "composer-reaction-solver-binary-selector-column";
      if (!childNode) {
        column.classList.add("is-placeholder");
        track.appendChild(column);
        return;
      }
      const choices = document.createElement("div");
      choices.className = "composer-reaction-solver-binary-selector-grid-options";
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode, node);
      const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, childNode, node);

      allowedChoiceIds.forEach((choiceId) => {
        const choice = getBinaryPersonalityChoice(choiceId);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "composer-reaction-solver-binary-choice";
        button.dataset.choiceId = choice.id;
        button.style.setProperty("--binary-choice-accent", choice.accent);
        button.setAttribute("aria-label", `${childNode.label}: ${choice.label}`);
        button.title = choice.label;
        if (selectedChoice.id === choice.id) {
          button.classList.add("is-selected");
        } else {
          button.classList.add("is-dimmed");
        }
        button.appendChild(createBinaryGlyph(choice, { showBinary: childNode.hasBinary !== false }));
        button.addEventListener("click", () =>
          setBinaryPersonalitySelection(participant.id, childNode.id, choice.id)
        );
        choices.appendChild(button);
      });

      column.appendChild(choices);
      track.appendChild(column);
    });
    return track;
  }

  function createQuarkPresetRowTrack(participant, node) {
    const track = document.createElement("div");
    track.className = "composer-reaction-solver-binary-selector-grid-track";
    track.style.setProperty("--binary-choice-size", "72px");
    getRenderedCoreBinarySlots(participant, node).forEach((childNode) => {
      if (!childNode) {
        track.appendChild(createBinaryChoicePlaceholder());
        return;
      }
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode, node);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "composer-reaction-solver-binary-choice is-selected";
      button.dataset.choiceId = selectedChoice.id;
      button.style.setProperty("--binary-choice-accent", selectedChoice.accent);
      button.setAttribute("aria-label", `${childNode.label}: ${selectedChoice.label}`);
      button.title = `${childNode.label}: ${selectedChoice.label}`;
      button.appendChild(
        createBinaryGlyph(selectedChoice, { showBinary: childNode.hasBinary !== false })
      );
      button.addEventListener("click", () =>
        cycleQuarkBinaryPreset(participant.id, childNode.id)
      );
      track.appendChild(button);
    });
    return track;
  }

  function createBinarySelectorGridContent(participant, node) {
    if (isQuarkTemplateId(node.templateId ?? participant.templateId)) {
      return createQuarkPresetRowContent(participant, node);
    }
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const track = createBinarySelectorGridTrack(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-binary-selector-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), track);
    } else {
      body.append(track, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.appendChild(body);
    return wrapper;
  }

  function createQuarkPresetRowContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const track = createQuarkPresetRowTrack(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-binary-selector-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), track);
    } else {
      body.append(track, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.appendChild(body);
    return wrapper;
  }

  function createCompositeAssemblyRowTrack(participant, rowNode) {
    if (rowNode?.renderMode === "noether-core-grid") {
      return createNoetherCoreGridSections(participant, rowNode).tiles;
    }
    if (rowNode?.renderMode === "binary-selector-grid") {
      return isQuarkTemplateId(rowNode.templateId ?? participant.templateId)
        ? createQuarkPresetRowTrack(participant, rowNode)
        : createBinarySelectorGridTrack(participant, rowNode);
    }
    return document.createElement("div");
  }

  function createCompositeAssemblyRowCard(participant, rowNode) {
    const antiCoreCount = Number(rowNode?.inventory?.antiCore ?? 0);
    const inferredTemplateId =
      rowNode?.renderMode === "noether-core-grid"
        ? "noether_core"
        : String(rowNode?.templateId ?? "").trim().toLowerCase();
    const inferredPolarity =
      inferredTemplateId === "noether_core"
        ? Number.isFinite(antiCoreCount) && antiCoreCount > 0
          ? "anti"
          : "pro"
        : supportsParticipantPolarity(inferredTemplateId)
          ? "pro"
          : "";
    const baseLabel = getDefaultParticipantBaseLabel(inferredTemplateId, rowNode?.label);
    const cardParticipant = {
      templateId: inferredTemplateId,
      polarity: inferredPolarity,
      label:
        inferredTemplateId === "noether_core"
          ? String(rowNode?.label ?? baseLabel).trim() || baseLabel
          : supportsParticipantPolarity(inferredTemplateId)
            ? formatParticipantLabel(baseLabel, inferredTemplateId, inferredPolarity)
            : baseLabel,
    };
    const card = document.createElement("div");
    card.className = "composer-reaction-solver-particle composer-reaction-solver-composite-row-card";
    if (cardParticipant.polarity === "anti") {
      card.classList.add("is-anti-polarity");
    }
    const meta = getParticipantCardMeta(cardParticipant);
    card.style.setProperty("--solver-accent", meta.accent);
    const label = document.createElement("div");
    label.className = "composer-reaction-solver-particle-label";
    getParticipantCardLabelLines(cardParticipant.label, cardParticipant).forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "composer-reaction-solver-particle-label-line";
      lineElement.textContent = line;
      label.appendChild(lineElement);
    });
    card.appendChild(label);
    return card;
  }

  function createCompositeAssemblyRowBody(participant, rowNode) {
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-composite-row-body is-${participant.side}`;
    const card = createCompositeAssemblyRowCard(participant, rowNode);
    const track = createCompositeAssemblyRowTrack(participant, rowNode);
    const rowNodeKey = buildNodeKey(participant.id, rowNode.id);
    const selectorLane = document.createElement("div");
    selectorLane.className = `composer-reaction-solver-composite-row-selector-lane is-${participant.side}`;
    const selector = createAnchorButton(participant, rowNode, rowNodeKey, {
      extraClassNames: ["composer-reaction-solver-composite-row-anchor"],
    });
    selector.dataset.compositeParticipantId = participant.id;
    selector.dataset.compositeSourceKey = rowNodeKey;
    selectorLane.appendChild(selector);
    if (participant.side === "product") {
      body.append(selectorLane, track, card);
    } else {
      body.append(card, track, selectorLane);
    }
    return body;
  }

  function createCompositeAssemblyGridContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-higgs-cluster-grid is-${participant.side}`;
    const coreNodes = Array.isArray(node?.children) ? node.children : [];
    const rows = document.createElement("div");
    rows.className = "composer-reaction-solver-higgs-cluster-grid-rows";
    coreNodes.forEach((coreNode, index) => {
      const row = document.createElement("div");
      row.className = `composer-reaction-solver-higgs-cluster-grid-row is-${participant.side}`;
      const rowBody = createCompositeAssemblyRowBody(participant, coreNode);
      if (index === 0) {
        row.classList.add("has-selector");
      }
      row.appendChild(rowBody);
      rows.appendChild(row);
    });
    wrapper.appendChild(rows);
    return wrapper;
  }

  function createParticipantVisual(participant, options = {}) {
    const { extraClassNames = [] } = options;
    const visual = document.createElement("div");
    visual.className = "composer-reaction-solver-particle";
    extraClassNames.filter(Boolean).forEach((className) => visual.classList.add(className));
    if (participant.polarity === "anti") {
      visual.classList.add("is-anti-polarity");
    }
    const meta = getParticipantCardMeta(participant);
    visual.style.setProperty("--solver-accent", meta.accent);
    const visualLabel = document.createElement("div");
    visualLabel.className = "composer-reaction-solver-particle-label";
    getParticipantCardLabelLines(participant.label, participant).forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "composer-reaction-solver-particle-label-line";
      lineElement.textContent = line;
      visualLabel.appendChild(lineElement);
    });
    visual.appendChild(visualLabel);
    visual.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openParticipantMenuAt(participant.id, event.clientX, event.clientY);
    });
    return visual;
  }

  function getTransmuteCardTop(centerYRatio = 0.5) {
    return `${Math.max(0.08, Math.min(0.92, Number(centerYRatio) || 0.5)) * 100}%`;
  }

  function getCenterLaneFallbackSlotRatios(requiredCount = 1) {
    const fallbackCount = Math.max(1, requiredCount);
    const startRatio = 0.28;
    const stepRatio = 0.18;
    return Array.from({ length: fallbackCount }, (_, index) =>
      Math.max(0.08, Math.min(0.92, startRatio + index * stepRatio))
    );
  }

  function getTransmuteSlotRatios(requiredCount = 1) {
    if (!centerColumn) {
      return getCenterLaneFallbackSlotRatios(requiredCount);
    }
    const bounds = centerColumn.getBoundingClientRect();
    const height = Math.max(1, bounds.height);
    const minCenter = transmuteCardHeightPx / 2 + transmuteSlotEdgePaddingPx;
    const maxCenter = Math.max(minCenter, height - transmuteCardHeightPx / 2 - transmuteSlotEdgePaddingPx);

    const baseCenters = [
      ...surface.querySelectorAll(".composer-reaction-solver-participant:not(.is-center)"),
    ]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top + rect.height / 2 - bounds.top;
      })
      .filter((value) => Number.isFinite(value))
      .sort((left, right) => left - right)
      .reduce((centers, value) => {
        if (!centers.length || Math.abs(centers[centers.length - 1] - value) > 16) {
          centers.push(Math.max(minCenter, Math.min(maxCenter, value)));
        }
        return centers;
      }, []);

    if (!baseCenters.length) {
      return getCenterLaneFallbackSlotRatios(requiredCount);
    }

    const deltas = [];
    for (let index = 1; index < baseCenters.length; index += 1) {
      deltas.push(baseCenters[index] - baseCenters[index - 1]);
    }
    const sortedDeltas = deltas.filter((value) => value > 0).sort((left, right) => left - right);
    const derivedStep =
      sortedDeltas.length > 0
        ? sortedDeltas[Math.floor(sortedDeltas.length / 2)]
        : transmuteSlotStepPx;
    const slotStep = Math.max(64, derivedStep || transmuteSlotStepPx);
    const centers = [...baseCenters];

    while (centers.length < requiredCount) {
      const nextCenter = centers[centers.length - 1] + slotStep;
      if (nextCenter > maxCenter + 0.5) {
        break;
      }
      centers.push(nextCenter);
    }
    while (centers.length < requiredCount) {
      const previousCenter = centers[0] - slotStep;
      if (previousCenter < minCenter - 0.5) {
        break;
      }
      centers.unshift(previousCenter);
    }

    return centers.map((center) => center / height);
  }

  function getOccupiedTransmuteSlotIndexes(excludedParticipantId = "") {
    return new Set(
      state.participants
        .filter(
          (participant) =>
            isTransmuteParticipant(participant) && String(participant.id) !== String(excludedParticipantId)
        )
        .map((participant) => Number(participant.centerSlotIndex))
        .filter((slotIndex) => Number.isInteger(slotIndex) && slotIndex >= 0)
    );
  }

  function getFirstAvailableTransmuteSlotIndex(excludedParticipantId = "") {
    const occupied = getOccupiedTransmuteSlotIndexes(excludedParticipantId);
    let slotIndex = 0;
    while (occupied.has(slotIndex)) {
      slotIndex += 1;
    }
    return slotIndex;
  }

  function findNearestAvailableTransmuteSlotIndex(targetIndex, excludedParticipantId = "") {
    const occupied = getOccupiedTransmuteSlotIndexes(excludedParticipantId);
    const preferredIndex = Math.max(0, Math.round(Number(targetIndex) || 0));
    if (!occupied.has(preferredIndex)) {
      return preferredIndex;
    }
    for (let distance = 1; distance < 64; distance += 1) {
      const lowerIndex = preferredIndex - distance;
      const upperIndex = preferredIndex + distance;
      if (lowerIndex >= 0 && !occupied.has(lowerIndex)) {
        return lowerIndex;
      }
      if (!occupied.has(upperIndex)) {
        return upperIndex;
      }
    }
    return getFirstAvailableTransmuteSlotIndex(excludedParticipantId);
  }

  function assignTransmuteParticipantToSlot(participant, requestedSlotIndex) {
    if (!participant || !isTransmuteParticipant(participant)) {
      return;
    }
    const resolvedSlotIndex = findNearestAvailableTransmuteSlotIndex(
      requestedSlotIndex,
      participant.id
    );
    const slotRatios = getTransmuteSlotRatios(resolvedSlotIndex + 1);
    const resolvedRatio =
      slotRatios[resolvedSlotIndex] ??
      slotRatios[slotRatios.length - 1] ??
      getCenterLaneFallbackSlotRatios(resolvedSlotIndex + 1)[resolvedSlotIndex] ??
      0.5;
    participant.centerSlotIndex = resolvedSlotIndex;
    participant.centerYRatio = resolvedRatio;
  }

  function syncTransmuteCardPosition(participantId) {
    if (!surface) {
      return;
    }
    const participant = findParticipantById(participantId);
    const card = surface.querySelector(
      `.composer-reaction-solver-participant.is-center[data-participant-id="${CSS.escape(participantId)}"]`
    );
    if (!participant || !card) {
      return;
    }
    assignTransmuteParticipantToSlot(participant, participant.centerSlotIndex);
    card.style.top = getTransmuteCardTop(participant.centerYRatio);
  }

  function updateTransmuteDrag(clientY) {
    if (!state.dragParticipantId || !centerColumn) {
      return;
    }
    const participant = findParticipantById(state.dragParticipantId);
    if (!participant) {
      return;
    }
    const bounds = centerColumn.getBoundingClientRect();
    const height = Math.max(1, bounds.height);
    const targetRatio = Math.max(0.08, Math.min(0.92, (clientY - bounds.top) / height));
    const slotRatios = getTransmuteSlotRatios(
      Math.max(
        getFirstAvailableTransmuteSlotIndex(participant.id) + 1,
        state.participants.filter((entry) => isTransmuteParticipant(entry)).length + 2
      )
    );
    const nearestSlotIndex = slotRatios.reduce((bestIndex, ratio, index) => {
      if (bestIndex < 0) {
        return index;
      }
      return Math.abs(ratio - targetRatio) < Math.abs(slotRatios[bestIndex] - targetRatio)
        ? index
        : bestIndex;
    }, -1);
    const nextSlotIndex = findNearestAvailableTransmuteSlotIndex(
      nearestSlotIndex,
      participant.id
    );
    const nextRatio = slotRatios[nextSlotIndex] ?? participant.centerYRatio ?? 0.5;
    if (
      participant.centerSlotIndex === nextSlotIndex &&
      Math.abs((participant.centerYRatio ?? 0.5) - nextRatio) < 0.001
    ) {
      return;
    }
    participant.centerSlotIndex = nextSlotIndex;
    participant.centerYRatio = nextRatio;
    syncTransmuteCardPosition(participant.id);
    scheduleMappingDraw();
  }

  function stopTransmuteDrag() {
    if (!state.dragParticipantId || !surface) {
      state.dragParticipantId = "";
      state.dragPointerId = null;
      return;
    }
    const card = surface.querySelector(
      `.composer-reaction-solver-participant.is-center[data-participant-id="${CSS.escape(state.dragParticipantId)}"]`
    );
    if (card) {
      card.classList.remove("is-dragging");
    }
    state.dragParticipantId = "";
    state.dragPointerId = null;
  }

  function startTransmuteDrag(event, participantId) {
    if (event.button !== 0 || !centerColumn) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(".composer-reaction-solver-anchor")) {
      return;
    }
    state.dragParticipantId = participantId;
    state.dragPointerId = event.pointerId;
    const card = event.currentTarget;
    if (card instanceof HTMLElement) {
      card.classList.add("is-dragging");
      if (typeof card.setPointerCapture === "function") {
        try {
          card.setPointerCapture(event.pointerId);
        } catch (_error) {
          // Ignore capture failures and continue with document-level dragging.
        }
      }
    }
    updateTransmuteDrag(event.clientY);
    event.preventDefault();
  }

  function createCompositeVisualRail(participant) {
    const rootNode = getParticipantRootNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const rail = document.createElement("div");
    rail.className = "composer-reaction-solver-composite-visual-rail";

    const collector = document.createElement("span");
    collector.className = "composer-reaction-solver-anchor composer-reaction-solver-composite-collector";
    collector.dataset.compositeCollectorId = participant.id;
    collector.setAttribute("aria-hidden", "true");

    const visual = createParticipantVisual(participant);
    if (participant.side === "product" && rootNode && rootNodeKey) {
      const rootAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
        extraClassNames: ["composer-reaction-solver-composite-root-anchor"],
      });
      rail.append(rootAnchor, visual, collector);
      return rail;
    }
    rail.append(collector, visual);
    if (rootNode && rootNodeKey) {
      const rootAnchor = createAnchorButton(participant, rootNode, rootNodeKey, {
        extraClassNames: ["composer-reaction-solver-composite-root-anchor"],
      });
      rail.appendChild(rootAnchor);
    }
    return rail;
  }

  function createTransmuteParticipantCard(participant) {
    const card = document.createElement("article");
    card.className = "composer-reaction-solver-participant is-center is-transmute-participant";
    card.dataset.participantId = participant.id;
    card.style.top = getTransmuteCardTop(participant.centerYRatio);

    const rootNode = getTransmuteNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const inputAnchor = rootNode
      ? createAnchorButton(participant, rootNode, rootNodeKey, {
          anchorRole: "transmute-input",
          extraClassNames: ["composer-reaction-solver-transmute-anchor", "is-input"],
        })
      : null;
    const outputAnchor = rootNode
      ? createAnchorButton(participant, rootNode, rootNodeKey, {
          anchorRole: "transmute-output",
          extraClassNames: ["composer-reaction-solver-transmute-anchor", "is-output"],
        })
      : null;
    const visual = createParticipantVisual(participant, {
      extraClassNames: ["composer-reaction-solver-transmute-particle"],
    });
    const ledgerSummary = getTransmuteLedgerSummary(participant.id);
    [
      {
        className: "is-top-left is-positrino",
        count: ledgerSummary.incomingLedger.positrino,
        label: "ε+",
        title: "Incoming positrino count",
      },
      {
        className: "is-top-right is-positrino",
        count: ledgerSummary.outgoingLedger.positrino,
        label: "ε+",
        title: "Outgoing positrino count",
      },
      {
        className: "is-bottom-left is-electrino",
        count: ledgerSummary.incomingLedger.electrino,
        label: "ε-",
        title: "Incoming electrino count",
      },
      {
        className: "is-bottom-right is-electrino",
        count: ledgerSummary.outgoingLedger.electrino,
        label: "ε-",
        title: "Outgoing electrino count",
      },
    ].forEach((entry) => {
      const badge = document.createElement("span");
      badge.className = `composer-reaction-solver-transmute-ledger ${entry.className}`;
      badge.textContent = `${Number(entry.count ?? 0)} ${entry.label}`;
      badge.title = entry.title;
      visual.appendChild(badge);
    });
    if (!ledgerSummary.isBalanced) {
      card.classList.add("is-ineligible");
      visual.title = `Transmute remains dim until incoming and outgoing ledgers match. Incoming: ${formatLedger(
        ledgerSummary.incomingLedger
      )}. Outgoing: ${formatLedger(ledgerSummary.outgoingLedger)}.`;
    }
    if (state.dragParticipantId === participant.id) {
      card.classList.add("is-dragging");
    }
    card.append(inputAnchor, visual, outputAnchor);
    card.addEventListener("pointerdown", (event) => startTransmuteDrag(event, participant.id));
    return card;
  }

  function createBinarySelectorContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector is-${participant.side}`;
    const slot = document.createElement("span");
    slot.className = "composer-reaction-solver-binary-slot";
    slot.textContent = node.slotCode || "?";
    const choices = document.createElement("div");
    choices.className = "composer-reaction-solver-binary-choices";
    choices.style.setProperty(
      "--binary-choice-columns",
      String(reducedBinaryPersonalityChoiceIds.length)
    );
    const selectedChoice = getBinaryPersonalitySelection(participant, node);
    const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, node);

    allowedChoiceIds.forEach((choiceId) => {
      const choice = getBinaryPersonalityChoice(choiceId);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "composer-reaction-solver-binary-choice";
      button.dataset.choiceId = choice.id;
      button.style.setProperty("--binary-choice-accent", choice.accent);
      button.setAttribute(
        "aria-label",
        `${node.label}: ${choice.label}`
      );
      button.title = choice.label;
      if (selectedChoice.id === choice.id) {
        button.classList.add("is-selected");
      } else {
        button.classList.add("is-dimmed");
      }
      button.appendChild(createBinaryGlyph(choice, { showBinary: node.hasBinary !== false }));
      button.addEventListener("click", () =>
        setBinaryPersonalitySelection(participant.id, node.id, choice.id)
      );
      choices.appendChild(button);
    });

    if (participant.side === "product") {
      wrapper.append(choices, slot);
    } else {
      wrapper.append(slot, choices);
    }
    return wrapper;
  }

  function renderParticipantTreeRows(parent, participant, nodes, depth = 0) {
    if (!parent || !Array.isArray(nodes) || !nodes.length) {
      return;
    }
    nodes.forEach((node) => {
      const nodeKey = buildNodeKey(participant.id, node.id);
      const hasChildren = Array.isArray(node.children) && node.children.length > 0;
      const canRenderChildren = hasChildren && shouldRenderChildNodes(node);
      const rendersChildrenInline = node.renderMode === "noether-core-grid";
      const mapping = findMappingByNodeKey(nodeKey);
      const isCollapsed = !!mapping && canRenderChildren && !rendersChildrenInline;
      const hiddenDescendantCount = isCollapsed ? countDescendants(node) : 0;
      const anchorAvailability = getAnchorAvailability(participant.side, nodeKey);
      const row = document.createElement("div");
      row.className = "composer-reaction-solver-tree-row";
      row.style.setProperty("--solver-depth", String(depth));
      row.classList.add(`is-${participant.side}`);
      if (anchorAvailability.disabled) {
        row.classList.add("is-disabled");
        if (state.pendingSourceKey && participant.side === "product") {
          row.classList.add("is-ineligible");
        }
        if (anchorAvailability.reason) {
          row.title = anchorAvailability.reason;
        }
      }
      if (isCollapsed) {
        row.classList.add("is-collapsed");
      }
      const label = document.createElement("span");
      label.className = "composer-reaction-solver-tree-label";
      label.textContent = node.label;
      const content = document.createElement("div");
      content.className = "composer-reaction-solver-tree-content";
      content.style.setProperty("--solver-depth", String(depth));
      const usesInlineAnchor =
        node.renderMode === "noether-core-grid" ||
        node.renderMode === "binary-selector-grid" ||
        node.renderMode === "higgs-cluster-grid" ||
        node.renderMode === "assembly-cluster-grid";
      if (usesInlineAnchor) {
        row.classList.add("is-inline-anchor");
      }
      const anchor = usesInlineAnchor ? null : createAnchorButton(participant, node, nodeKey);
      const collapsedNote =
        hiddenDescendantCount > 0
          ? Object.assign(document.createElement("span"), {
              className: "composer-reaction-solver-tree-note",
              textContent: `${hiddenDescendantCount} hidden`,
            })
          : null;
      if (node.renderMode === "noether-core-grid") {
        row.classList.add("is-noether-core-grid");
        content.classList.add("is-noether-core-grid");
        content.appendChild(createNoetherCoreGridContent(participant, node));
      } else if (
        node.renderMode === "higgs-cluster-grid" ||
        node.renderMode === "assembly-cluster-grid"
      ) {
        row.classList.add("is-higgs-cluster-grid");
        content.classList.add("is-higgs-cluster-grid");
        content.appendChild(createCompositeAssemblyGridContent(participant, node));
      } else if (node.renderMode === "binary-selector-grid") {
        row.classList.add("is-binary-selector-grid");
        content.classList.add("is-binary-selector-grid");
        content.appendChild(createBinarySelectorGridContent(participant, node));
      } else if (node.renderMode === "binary-selector") {
        row.classList.add("is-binary-selector");
        content.appendChild(createBinarySelectorContent(participant, node));
      } else if (node.renderMode === "binary-bare") {
        row.classList.add("is-binary-selector");
        content.appendChild(createBareBinaryContent(participant, node));
      } else {
        content.appendChild(label);
        if (collapsedNote) {
          content.appendChild(collapsedNote);
        }
      }
      if (usesInlineAnchor) {
        row.appendChild(content);
      } else if (participant.side === "product") {
        row.append(anchor, content);
      } else {
        row.append(content, anchor);
      }
      parent.appendChild(row);
      if (canRenderChildren && !isCollapsed && !rendersChildrenInline) {
        renderParticipantTreeRows(parent, participant, node.children, depth + 1);
      }
    });
  }

  function renderParticipantCard(participant) {
    const card = document.createElement("article");
    card.className = `composer-reaction-solver-participant is-${participant.side}`;
    const rootNode = getParticipantRootNode(participant);
    const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
    const topLevelRenderMode = participant?.hierarchy?.[0]?.renderMode ?? "";
    const isComposite = isCompositeParticipant(participant);
    const isReactantComposite = isReactantCompositeParticipant(participant);
    const isProductComposite = isProductCompositeParticipant(participant);
    const rootAnchorAvailability =
      participant.side === "product" && rootNodeKey
        ? getAnchorAvailability(participant.side, rootNodeKey)
        : null;
    if (topLevelHierarchyHasRenderMode(participant.hierarchy, "noether-core-grid")) {
      card.classList.add("has-noether-core-grid");
    }
    if (
      topLevelRenderMode === "noether-core-grid" ||
      topLevelRenderMode === "binary-selector-grid" ||
      topLevelRenderMode === "higgs-cluster-grid" ||
      topLevelRenderMode === "assembly-cluster-grid"
    ) {
      card.classList.add("has-inline-field-header");
    }
    if (isComposite) {
      card.classList.add("is-composite-participant");
    }
    if (state.pendingSourceKey && participant.side === "product" && rootAnchorAvailability?.disabled) {
      card.classList.add("is-ineligible");
      if (rootAnchorAvailability.reason) {
        card.title = rootAnchorAvailability.reason;
      }
    }
    const visual = isComposite
      ? createCompositeVisualRail(participant)
      : createParticipantVisual(participant);

    const hierarchy = document.createElement("div");
    hierarchy.className = `composer-reaction-solver-tree is-${participant.side}`;
    renderParticipantTreeRows(hierarchy, participant, participant.hierarchy, 0);

    if (isProductComposite) {
      card.append(visual, hierarchy);
    } else if (participant.side === "product" || isReactantComposite) {
      card.append(hierarchy, visual);
    } else {
      card.append(visual, hierarchy);
    }
    return card;
  }

  function updateHint() {
    if (!mapHint || !emptyState) {
      return;
    }
    const hasParticipants = state.participants.length > 0;
    emptyState.hidden = hasParticipants;
    emptyState.setAttribute("aria-hidden", hasParticipants ? "true" : "false");
    if (!hasParticipants) {
      mapHint.textContent =
        "Right-click the reaction canvas to add reactants, products, or a transmute tile.";
      return;
    }
    if (state.pendingSourceKey) {
      mapHint.textContent =
        state.pendingSourceRole === "transmute-output"
          ? "transmute output selected. Conservative product targets remain active; incompatible targets are dimmed."
          : "Source anchor selected. Conservative product and transmute targets remain active; incompatible targets are dimmed.";
      return;
    }
    if (!state.mappings.length) {
      mapHint.textContent =
        "Choose a reactant anchor, then a product or transmute anchor, to author the first mapping.";
      return;
    }
    mapHint.textContent = `${state.mappings.length} mapping${state.mappings.length === 1 ? "" : "s"} authored. Click any mapped anchor to remove it.`;
  }

  function getElementCenterWithinSurface(element, bounds) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - bounds.left,
      y: rect.top + rect.height / 2 - bounds.top,
    };
  }

  function drawCompositeLinks(bounds) {
    state.participants
      .filter((participant) => isCompositeParticipant(participant))
      .forEach((participant) => {
        const rootNode = getParticipantRootNode(participant);
        const rootNodeKey = rootNode ? buildNodeKey(participant.id, rootNode.id) : "";
        const isIneligible =
          !!state.pendingSourceKey &&
          participant.side === "product" &&
          !!rootNodeKey &&
          getAnchorAvailability(participant.side, rootNodeKey).disabled;
        const collector = surface.querySelector(
          `.composer-reaction-solver-composite-collector[data-composite-collector-id="${CSS.escape(participant.id)}"]`
        );
        if (!collector) {
          return;
        }
        const targetPoint = getElementCenterWithinSurface(collector, bounds);
        const sourceAnchors = Array.from(
          surface.querySelectorAll(
            `.composer-reaction-solver-anchor[data-composite-participant-id="${CSS.escape(participant.id)}"][data-composite-source-key]`
          )
        );
        sourceAnchors.forEach((sourceAnchor) => {
          const sourcePoint = getElementCenterWithinSurface(sourceAnchor, bounds);
          const deltaX = Math.max(28, Math.abs(targetPoint.x - sourcePoint.x) * 0.55);
          const direction = targetPoint.x >= sourcePoint.x ? 1 : -1;
          const path = createSvgElement("path");
          path.setAttribute(
            "d",
            `M ${sourcePoint.x} ${sourcePoint.y} C ${sourcePoint.x + deltaX * direction} ${sourcePoint.y}, ${targetPoint.x - deltaX * 0.6 * direction} ${targetPoint.y}, ${targetPoint.x} ${targetPoint.y}`
          );
          path.setAttribute("class", "composer-reaction-solver-composite-link");
          if (isIneligible) {
            path.classList.add("is-ineligible");
          }
          mapSvg.appendChild(path);
        });
      });
  }

  function drawMappings() {
    drawFrameId = 0;
    if (!state.active || !surface || !mapSvg) {
      return;
    }
    const bounds = surface.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    mapSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    mapSvg.innerHTML = "";
    drawCompositeLinks(bounds);
    state.mappings.forEach((mapping) => {
      const sourceAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.sourceKey)}"][data-anchor-side="${CSS.escape(mapping.sourceRole)}"]`
      );
      const targetAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.targetKey)}"][data-anchor-side="${CSS.escape(mapping.targetRole)}"]`
      );
      if (!sourceAnchor || !targetAnchor) {
        return;
      }
      const sourceRect = sourceAnchor.getBoundingClientRect();
      const targetRect = targetAnchor.getBoundingClientRect();
      const startX = sourceRect.left + sourceRect.width / 2 - bounds.left;
      const startY = sourceRect.top + sourceRect.height / 2 - bounds.top;
      const endX = targetRect.left + targetRect.width / 2 - bounds.left;
      const endY = targetRect.top + targetRect.height / 2 - bounds.top;
      const deltaX = Math.max(96, Math.abs(endX - startX) * 0.35);
      const path = createSvgElement("path");
      path.setAttribute(
        "d",
        `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`
      );
      path.setAttribute("class", "composer-reaction-solver-path");
      path.dataset.mappingId = mapping.id;
      path.addEventListener("pointerenter", () => setHoveredMappingIds([mapping.id]));
      path.addEventListener("pointerleave", () => setHoveredMappingIds([]));
      mapSvg.appendChild(path);
    });
    applyHoveredRouteState();
  }

  function scheduleMappingDraw() {
    if (drawFrameId) {
      cancelAnimationFrame(drawFrameId);
    }
    drawFrameId = requestAnimationFrame(drawMappings);
  }

  function render() {
    if (!root || !reactantsColumn || !productsColumn || !centerColumn) {
      return;
    }
    root.classList.toggle("is-open", state.active);
    root.setAttribute("aria-hidden", state.active ? "false" : "true");
    reactantsColumn.innerHTML = "";
    centerColumn.innerHTML = "";
    productsColumn.innerHTML = "";
    if (!state.active) {
      if (mapSvg) {
        mapSvg.innerHTML = "";
      }
      state.anchorRegistry = new Map();
      state.hoveredMappingIds = [];
      return;
    }
    rebuildAnchorRegistry();
    const reactantParticipants = state.participants.filter(
      (participant) => participant.side === "reactant"
    );
    const productParticipants = state.participants.filter(
      (participant) => participant.side === "product"
    );
    const centerParticipants = state.participants.filter(
      (participant) => participant.side === "center"
    );
    if (reactantParticipants.length) {
      reactantsColumn.appendChild(createSideSlotHeader("reactant"));
    }
    reactantParticipants.forEach((participant) => {
      reactantsColumn.appendChild(renderParticipantCard(participant));
    });
    if (productParticipants.length) {
      productsColumn.appendChild(createSideSlotHeader("product"));
    }
    productParticipants.forEach((participant) => {
      productsColumn.appendChild(renderParticipantCard(participant));
    });
    centerParticipants.forEach((participant) => {
      assignTransmuteParticipantToSlot(participant, participant.centerSlotIndex);
      centerColumn.appendChild(createTransmuteParticipantCard(participant));
    });
    updateHint();
    scheduleMappingDraw();
  }

  function handleSurfaceContextMenu(event) {
    if (!state.active) {
      return;
    }
    event.preventDefault();
    openMenuAt(event.clientX, event.clientY);
  }

  function handleDocumentPointerDown(event) {
    if (!state.active || !state.menuOpen || !menu) {
      return;
    }
    if (menu.contains(event.target)) {
      return;
    }
    closeMenu();
  }

  function handleDocumentPointerMove(event) {
    if (!state.active || !state.dragParticipantId) {
      return;
    }
    if (state.dragPointerId !== null && event.pointerId !== state.dragPointerId) {
      return;
    }
    updateTransmuteDrag(event.clientY);
  }

  function handleDocumentPointerUp(event) {
    if (!state.active || !state.dragParticipantId) {
      return;
    }
    if (state.dragPointerId !== null && event.pointerId !== state.dragPointerId) {
      return;
    }
    stopTransmuteDrag();
  }

  function handleRootKeyDown(event) {
    if (!state.active) {
      return;
    }
    if (event.key === "Escape") {
      if (state.menuOpen) {
        closeMenu();
        return;
      }
      if (state.pendingSourceKey) {
        clearPendingSource();
      }
    }
  }

  function wireListeners() {
    if (toggleButton && !toggleButton.dataset.solverBound) {
      toggleButton.dataset.solverBound = "true";
      toggleButton.addEventListener("click", () => {
        toggleActive();
      });
    }
    if (root && !root.dataset.solverBound) {
      root.dataset.solverBound = "true";
      root.addEventListener("contextmenu", handleSurfaceContextMenu);
      root.addEventListener("keydown", handleRootKeyDown);
      root.addEventListener(
        "scroll",
        () => {
          if (state.active) {
            scheduleMappingDraw();
          }
        },
        true
      );
    }
    if (!document.body.dataset.composerReactionSolverDocumentBound) {
      document.body.dataset.composerReactionSolverDocumentBound = "true";
      document.addEventListener("pointerdown", handleDocumentPointerDown, true);
      document.addEventListener("pointermove", handleDocumentPointerMove, true);
      document.addEventListener("pointerup", handleDocumentPointerUp, true);
      document.addEventListener("pointercancel", handleDocumentPointerUp, true);
      window.addEventListener("resize", () => {
        if (state.active) {
          updateMenuPosition();
          scheduleMappingDraw();
        }
      });
    }
  }

  wireListeners();
  if (readPersistedSolverActive(storage, storageKey)) {
    setActive(true, { persist: false, announce: false });
  }
  render();

  return {
    isActive: () => state.active,
    setActive,
    toggleActive,
    closeMenu,
    render,
  };
}
