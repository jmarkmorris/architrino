import { evaluateComposerReactionMappingCandidate } from "./ComposerReactionRulesRuntime.js";

const solverTemplateMeta = Object.freeze({
  noether_core: { shortLabel: "NC", accent: "#a259ff" },
  higgs_cluster: { shortLabel: "HC", accent: "#a259ff" },
  electron: { shortLabel: "e-", accent: "#2d8cff" },
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

function dedupeTemplateEntries(templateMenuRows = [], extraEntries = []) {
  const entries = [];
  const seen = new Set();
  const allEntries = [
    ...templateMenuRows.flatMap((row) => (Array.isArray(row) ? row : [])),
    ...extraEntries,
  ];
  allEntries.forEach((entry) => {
    const template = String(entry?.template ?? "").trim();
    if (!template || seen.has(template)) {
      return;
    }
    seen.add(template);
    entries.push({
      template,
      label: String(entry?.label ?? template).trim() || template,
    });
  });
  return entries;
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

function buildHierarchyForTemplate(templateId, label) {
  const normalizedTemplate = String(templateId ?? "").trim().toLowerCase();
  if (normalizedTemplate === "higgs_cluster") {
    return [
      {
        id: "root",
        label: "Higgs cluster",
        renderMode: "higgs-cluster-grid",
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
  if (normalizedTemplate === "electron") {
    return [
      {
        id: "root",
        label: "pro Noether core",
        renderMode: "binary-selector-grid",
        children: [
          createBinaryBranch("root/inner", "inner binary with personality", { slotCode: "I" }),
          createBinaryBranch("root/middle", "middle binary with personality", { slotCode: "M" }),
          createBinaryBranch("root/outer", "outer binary with personality", { slotCode: "O" }),
        ],
      },
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
    return [
      {
        id: "root",
        label: "pro Noether core",
        renderMode: "binary-selector-grid",
        children: [
          createBinaryBranch("root/inner", "inner binary with personality", { slotCode: "I" }),
          createBinaryBranch("root/middle", "middle binary with personality", { slotCode: "M" }),
          createBinaryBranch("root/outer", "outer binary with personality", { slotCode: "O" }),
        ],
      },
    ];
  }
  return [
    {
      id: "root",
      label: "pro/anti Noether core",
      renderMode: "binary-selector-grid",
      children: [
        createBinaryBranch("root/inner", "inner binary with personality", { slotCode: "I" }),
        createBinaryBranch("root/middle", "middle binary with personality", { slotCode: "M" }),
        createBinaryBranch("root/outer", "outer binary with personality", { slotCode: "O" }),
      ],
    },
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

function getParticipantCardLabelLines(label = "") {
  const words = String(label || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
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

function getBinarySelectorTemplateRule(templateId) {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  return (
    binarySelectorTemplateRules[normalizedTemplateId] ??
    binarySelectorTemplateRules.default
  );
}

function collectBinarySelectorNodes(nodes = [], bucket = []) {
  (Array.isArray(nodes) ? nodes : []).forEach((node) => {
    if (node?.renderMode === "binary-selector") {
      bucket.push(node);
    }
    collectBinarySelectorNodes(node?.children, bucket);
  });
  return bucket;
}

function getBinarySelectorNodes(participant) {
  return collectBinarySelectorNodes(participant?.hierarchy, []).sort((left, right) => {
    const leftRank = binarySlotRankByCode[left?.slotCode] ?? Number.MAX_SAFE_INTEGER;
    const rightRank = binarySlotRankByCode[right?.slotCode] ?? Number.MAX_SAFE_INTEGER;
    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    return String(left?.id ?? "").localeCompare(String(right?.id ?? ""));
  });
}

function getDefaultBinaryChoiceIdForNode(participant, node) {
  const rule = getBinarySelectorTemplateRule(participant?.templateId);
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
  { pinnedNodeId = "", pinnedChoiceId = "" } = {}
) {
  const nodes = getBinarySelectorNodes(participant);
  if (!nodes.length) {
    return {};
  }
  const rule = getBinarySelectorTemplateRule(participant?.templateId);
  const defaultSelections = getFallbackBinarySelections(participant);
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

function getAllowedBinaryChoiceIds(participant, node) {
  const rule = getBinarySelectorTemplateRule(participant?.templateId);
  return rule.visibleChoiceIds.filter((choiceId) =>
    !!findBestBinarySelectionAssignment(participant, {
      pinnedNodeId: node?.id,
      pinnedChoiceId: choiceId,
    })
  );
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

  const templateEntries = dedupeTemplateEntries(templateMenuRows, extraTemplateEntries);
  const state = {
    active: false,
    nextParticipantId: 1,
    nextMappingId: 1,
    participants: [],
    mappings: [],
    pendingSourceKey: "",
    menuMode: "root",
    menuSide: "reactant",
    menuOpen: false,
    menuClientX: 0,
    menuClientY: 0,
  };

  let drawFrameId = 0;

  function findMappingByNodeKey(nodeKey) {
    return (
      state.mappings.find(
        (mapping) => mapping.sourceKey === nodeKey || mapping.targetKey === nodeKey
      ) ?? null
    );
  }

  function getMappedKeyForSide(mapping, side) {
    return side === "reactant" ? mapping.sourceKey : mapping.targetKey;
  }

  function getConflictingMappings(nodeKey, side) {
    return state.mappings.filter((mapping) => {
      const mappedKey = getMappedKeyForSide(mapping, side);
      return mappedKey ? nodeKeysConflict(mappedKey, nodeKey) : false;
    });
  }

  function findParticipantById(participantId) {
    return state.participants.find((participant) => participant?.id === participantId) ?? null;
  }

  function getNodeContext(nodeKey) {
    const { participantId, nodeId } = parseNodeKey(nodeKey);
    const participant = findParticipantById(participantId);
    const node = participant ? findHierarchyNodeById(participant.hierarchy, nodeId) : null;
    if (!participant || !node) {
      return null;
    }
    return { participant, node };
  }

  function getAnchorAvailability(side, nodeKey) {
    if (findMappingByNodeKey(nodeKey)) {
      return { disabled: false, reason: "" };
    }
    const hasConflict = getConflictingMappings(nodeKey, side).some((mapping) => {
      const mappedKey = getMappedKeyForSide(mapping, side);
      return mappedKey && mappedKey !== nodeKey;
    });
    if (hasConflict) {
      return {
        disabled: true,
        reason: "Blocked by an existing ancestor or descendant mapping.",
      };
    }
    if (side === "product" && state.pendingSourceKey) {
      const sourceContext = getNodeContext(state.pendingSourceKey);
      const targetContext = getNodeContext(nodeKey);
      const evaluation = evaluateComposerReactionMappingCandidate({
        sourceParticipant: sourceContext?.participant,
        sourceNode: sourceContext?.node,
        targetParticipant: targetContext?.participant,
        targetNode: targetContext?.node,
      });
      if (!evaluation.allowed) {
        return {
          disabled: true,
          reason: evaluation.reason,
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

  function addOrReplaceMapping(sourceKey, targetKey) {
    state.mappings = state.mappings.filter((mapping) => {
      return !(
        nodeKeysConflict(mapping.sourceKey, sourceKey) ||
        nodeKeysConflict(mapping.targetKey, targetKey)
      );
    });
    state.mappings.push({
      id: `solver_mapping_${state.nextMappingId++}`,
      sourceKey,
      targetKey,
    });
  }

  function clearPendingSource() {
    if (!state.pendingSourceKey) {
      return;
    }
    state.pendingSourceKey = "";
    render();
  }

  function getAnchorDisabled(side, nodeKey) {
    return getAnchorAvailability(side, nodeKey).disabled;
  }

  function countEligibleProductTargets() {
    if (!state.pendingSourceKey) {
      return 0;
    }
    let count = 0;
    state.participants
      .filter((participant) => participant.side === "product")
      .forEach((participant) => {
        const visit = (nodes = []) => {
          nodes.forEach((node) => {
            const nodeKey = buildNodeKey(participant.id, node.id);
            if (!getAnchorAvailability("product", nodeKey).disabled) {
              count += 1;
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

  function getBinaryPersonalitySelection(participant, node) {
    const selectionMap =
      findBestBinarySelectionAssignment(participant) ??
      getFallbackBinarySelections(participant);
    return getBinaryPersonalityChoice(selectionMap[node?.id]);
  }

  function setBinaryPersonalitySelection(participantId, nodeId, choiceId) {
    const participant = findParticipantById(participantId);
    if (!participant || !nodeId) {
      return;
    }
    const nextSelections =
      findBestBinarySelectionAssignment(participant, {
        pinnedNodeId: nodeId,
        pinnedChoiceId: getBinaryPersonalityChoice(choiceId).id,
      }) ?? null;
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
    button.textContent = text;
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
    renderMenu();
  }

  function addParticipant(side, templateId) {
    const templateEntry =
      templateEntries.find((entry) => entry.template === templateId) ??
      templateEntries[0] ??
      null;
    if (!templateEntry) {
      return;
    }
    const participantLabel =
      templateEntry.template === "higgs_cluster"
        ? "Higgs cluster"
        : templateEntry.template === "noether_core"
          ? "Noether core"
          : templateEntry.label;
    const participant = {
      id: `solver_participant_${state.nextParticipantId++}`,
      side,
      templateId: templateEntry.template,
      label: participantLabel,
      hierarchy: buildHierarchyForTemplate(templateEntry.template, participantLabel),
      binarySelections: {},
    };
    participant.binarySelections =
      findBestBinarySelectionAssignment(participant) ??
      getFallbackBinarySelections(participant);
    state.participants.push(participant);
    state.pendingSourceKey = "";
    closeMenu();
    render();
    setStatus(
      `${side === "reactant" ? "Reactant" : "Product"} ${participant.label} added to the reaction solver.`
    );
  }

  function renderMenu() {
    if (!menu) {
      return;
    }
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    menu.innerHTML = "";
    if (state.menuMode === "template-picker") {
      renderMenuTitle(
        state.menuSide === "product" ? "Choose product" : "Choose reactant"
      );
      templateEntries.forEach((entry) => {
        const itemButton = renderMenuButton(entry.label, {
          onClick: () => addParticipant(state.menuSide, entry.template),
        });
        const meta = getTemplateMeta(entry.template, entry.label);
        itemButton.style.setProperty("--solver-entry-accent", meta.accent);
        itemButton.dataset.shortLabel = meta.shortLabel;
      });
      renderMenuButton("Back", {
        kind: "secondary",
        onClick: () => {
          state.menuMode = "root";
          renderMenu();
        },
      });
    } else {
      renderMenuTitle("Reaction");
      renderMenuButton("Add reactant", {
        onClick: () => openTemplatePicker("reactant"),
      });
      renderMenuButton("Add product", {
        onClick: () => openTemplatePicker("product"),
      });
      renderMenuButton("Auto solve (not yet implemented)", {
        disabled: true,
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
          ? "Reaction solver opened. Right-click the 2D canvas to add reactants or products."
          : "Reaction solver closed."
      );
    }
  }

  function toggleActive() {
    setActive(!state.active);
  }

  function handleAnchorClick(side, nodeKey) {
    const existingMapping = findMappingByNodeKey(nodeKey);
    if (existingMapping) {
      state.pendingSourceKey = "";
      if (removeMappingById(existingMapping.id)) {
        render();
        setStatus("Removed reaction mapping.");
      }
      return;
    }
    if (getAnchorDisabled(side, nodeKey)) {
      return;
    }
    if (side === "reactant") {
      state.pendingSourceKey = state.pendingSourceKey === nodeKey ? "" : nodeKey;
      render();
      if (state.pendingSourceKey) {
        const eligibleProductCount = countEligibleProductTargets();
        setStatus(
          eligibleProductCount
            ? "Reactant attach point selected. Conservative product targets remain active; incompatible targets are grayed out."
            : "Reactant attach point selected, but no conservative product targets are currently available."
        );
      } else {
        setStatus("Reactant attach point cleared.");
      }
      return;
    }
    if (!state.pendingSourceKey) {
      setStatus("Choose a reactant attach point first.");
      return;
    }
    addOrReplaceMapping(state.pendingSourceKey, nodeKey);
    state.pendingSourceKey = "";
    render();
    setStatus("Reaction mapping added.");
  }

  function createBinaryGlyph(choice = null, options = {}) {
    const { showPersonality = true } = options;
    const glyph = createSvgElement("svg");
    glyph.classList.add("composer-reaction-solver-binary-glyph");
    glyph.setAttribute("viewBox", "0 0 120 120");
    glyph.setAttribute("aria-hidden", "true");

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
    const { extraClassNames = [] } = options;
    const anchorAvailability = getAnchorAvailability(participant.side, nodeKey);
    const mapping = findMappingByNodeKey(nodeKey);
    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "composer-reaction-solver-anchor";
    extraClassNames
      .filter(Boolean)
      .forEach((className) => anchor.classList.add(className));
    anchor.dataset.anchorKey = nodeKey;
    anchor.dataset.anchorSide = participant.side;
    anchor.setAttribute(
      "aria-label",
      `${participant.side === "product" ? "Product" : "Reactant"} attach point for ${node.label}`
    );
    anchor.disabled = anchorAvailability.disabled;
    if (anchorAvailability.reason) {
      anchor.title = anchorAvailability.reason;
    }
    if (state.pendingSourceKey === nodeKey) {
      anchor.classList.add("is-pending");
    }
    if (mapping) {
      anchor.classList.add("is-mapped");
    }
    anchor.addEventListener("click", () => handleAnchorClick(participant.side, nodeKey));
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

  function createInlineAnchorLane(participant, node, nodeKey) {
    const lane = document.createElement("div");
    lane.className = `composer-reaction-solver-inline-anchor-lane is-${participant.side}`;
    lane.appendChild(createAnchorButton(participant, node, nodeKey));
    return lane;
  }

  function createNoetherCoreGridSections(participant, node) {
    const slots = document.createElement("div");
    slots.className = "composer-reaction-solver-noether-core-grid-slots";
    const tiles = document.createElement("div");
    tiles.className = "composer-reaction-solver-noether-core-grid-track";
    getCoreBinaryNodes(node).forEach((childNode) => {
      const nodeKey = buildNodeKey(participant.id, childNode.id);
      const slot = document.createElement("span");
      slot.className = "composer-reaction-solver-noether-core-grid-slot";
      slot.textContent = childNode.slotCode || "?";
      slots.appendChild(slot);

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
        })
      );
      tiles.appendChild(tile);
    });
    return { slots, tiles };
  }

  function createNoetherCoreGridContent(participant, node) {
    const nodeKey = buildNodeKey(participant.id, node.id);
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-noether-core-grid is-${participant.side}`;
    const { slots, tiles } = createNoetherCoreGridSections(participant, node);
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-noether-core-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), tiles);
    } else {
      body.append(tiles, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.append(slots, body);
    return wrapper;
  }

  function createBinarySelectorGridContent(participant, node) {
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-binary-selector-grid is-${participant.side}`;
    const nodeKey = buildNodeKey(participant.id, node.id);
    const slots = document.createElement("div");
    slots.className = "composer-reaction-solver-binary-selector-grid-slots";
    const track = document.createElement("div");
    track.className = "composer-reaction-solver-binary-selector-grid-track";
    getCoreBinaryNodes(node).forEach((childNode) => {
      const column = document.createElement("div");
      column.className = "composer-reaction-solver-binary-selector-column";

      const slot = document.createElement("span");
      slot.className = "composer-reaction-solver-binary-selector-grid-slot";
      slot.textContent = childNode.slotCode || "?";
      slots.appendChild(slot);
      const choices = document.createElement("div");
      choices.className = "composer-reaction-solver-binary-selector-grid-options";
      const selectedChoice = getBinaryPersonalitySelection(participant, childNode);
      const allowedChoiceIds = getAllowedBinaryChoiceIds(participant, childNode);

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
        button.appendChild(createBinaryGlyph(choice));
        button.addEventListener("click", () =>
          setBinaryPersonalitySelection(participant.id, childNode.id, choice.id)
        );
        choices.appendChild(button);
      });

      column.appendChild(choices);
      track.appendChild(column);
    });
    const body = document.createElement("div");
    body.className = `composer-reaction-solver-binary-selector-grid-body is-${participant.side}`;
    if (participant.side === "product") {
      body.append(createInlineAnchorLane(participant, node, nodeKey), track);
    } else {
      body.append(track, createInlineAnchorLane(participant, node, nodeKey));
    }
    wrapper.append(slots, body);
    return wrapper;
  }

  function createHiggsClusterGridContent(participant, node) {
    const nodeKey = buildNodeKey(participant.id, node.id);
    const wrapper = document.createElement("div");
    wrapper.className = `composer-reaction-solver-higgs-cluster-grid is-${participant.side}`;
    const coreNodes = Array.isArray(node?.children) ? node.children : [];
    const firstCore = coreNodes[0] ?? null;
    if (firstCore) {
      const { slots } = createNoetherCoreGridSections(participant, firstCore);
      wrapper.appendChild(slots);
    }
    const rows = document.createElement("div");
    rows.className = "composer-reaction-solver-higgs-cluster-grid-rows";
    coreNodes.forEach((coreNode, index) => {
      const row = document.createElement("div");
      row.className = `composer-reaction-solver-higgs-cluster-grid-row is-${participant.side}`;
      const { tiles } = createNoetherCoreGridSections(participant, coreNode);
      if (index === 0) {
        row.classList.add("has-selector");
        if (participant.side === "product") {
          row.append(createInlineAnchorLane(participant, node, nodeKey), tiles);
        } else {
          row.append(tiles, createInlineAnchorLane(participant, node, nodeKey));
        }
      } else {
        row.appendChild(tiles);
      }
      rows.appendChild(row);
    });
    wrapper.appendChild(rows);
    return wrapper;
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
      button.appendChild(createBinaryGlyph(choice));
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
        node.renderMode === "higgs-cluster-grid";
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
      } else if (node.renderMode === "higgs-cluster-grid") {
        row.classList.add("is-higgs-cluster-grid");
        content.classList.add("is-higgs-cluster-grid");
        content.appendChild(createHiggsClusterGridContent(participant, node));
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
    const topLevelRenderMode = participant?.hierarchy?.[0]?.renderMode ?? "";
    if (topLevelHierarchyHasRenderMode(participant.hierarchy, "noether-core-grid")) {
      card.classList.add("has-noether-core-grid");
    }
    if (
      topLevelRenderMode === "noether-core-grid" ||
      topLevelRenderMode === "binary-selector-grid" ||
      topLevelRenderMode === "higgs-cluster-grid"
    ) {
      card.classList.add("has-inline-field-header");
    }
    const visual = document.createElement("div");
    visual.className = "composer-reaction-solver-particle";
    const meta = getTemplateMeta(participant.templateId, participant.label);
    visual.style.setProperty("--solver-accent", meta.accent);
    const visualLabel = document.createElement("div");
    visualLabel.className = "composer-reaction-solver-particle-label";
    getParticipantCardLabelLines(participant.label).forEach((line) => {
      const lineElement = document.createElement("span");
      lineElement.className = "composer-reaction-solver-particle-label-line";
      lineElement.textContent = line;
      visualLabel.appendChild(lineElement);
    });
    visual.appendChild(visualLabel);

    const hierarchy = document.createElement("div");
    hierarchy.className = `composer-reaction-solver-tree is-${participant.side}`;
    renderParticipantTreeRows(hierarchy, participant, participant.hierarchy, 0);

    if (participant.side === "product") {
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
    const centerPanel = mapHint.parentElement ?? null;
    const hasParticipants = state.participants.length > 0;
    emptyState.hidden = hasParticipants;
    emptyState.setAttribute("aria-hidden", hasParticipants ? "true" : "false");
    if (centerPanel) {
      centerPanel.hidden = !hasParticipants;
      centerPanel.setAttribute("aria-hidden", hasParticipants ? "false" : "true");
    }
    if (!hasParticipants) {
      return;
    }
    if (state.pendingSourceKey) {
      mapHint.textContent =
        "Reactant anchor selected. Conservative product targets remain active; incompatible targets are grayed out.";
      return;
    }
    if (!state.mappings.length) {
      mapHint.textContent = "Click a reactant anchor, then a product anchor, to draw the first mapping.";
      return;
    }
    mapHint.textContent = `${state.mappings.length} mapping${state.mappings.length === 1 ? "" : "s"} authored. Click a mapped anchor to remove it.`;
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
    state.mappings.forEach((mapping) => {
      const sourceAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.sourceKey)}"]`
      );
      const targetAnchor = surface.querySelector(
        `.composer-reaction-solver-anchor[data-anchor-key="${CSS.escape(mapping.targetKey)}"]`
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
      mapSvg.appendChild(path);
    });
  }

  function scheduleMappingDraw() {
    if (drawFrameId) {
      cancelAnimationFrame(drawFrameId);
    }
    drawFrameId = requestAnimationFrame(drawMappings);
  }

  function render() {
    if (!root || !reactantsColumn || !productsColumn) {
      return;
    }
    root.classList.toggle("is-open", state.active);
    root.setAttribute("aria-hidden", state.active ? "false" : "true");
    reactantsColumn.innerHTML = "";
    productsColumn.innerHTML = "";
    if (!state.active) {
      if (mapSvg) {
        mapSvg.innerHTML = "";
      }
      return;
    }
    state.participants
      .filter((participant) => participant.side === "reactant")
      .forEach((participant) => {
        reactantsColumn.appendChild(renderParticipantCard(participant));
      });
    state.participants
      .filter((participant) => participant.side === "product")
      .forEach((participant) => {
        productsColumn.appendChild(renderParticipantCard(participant));
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
