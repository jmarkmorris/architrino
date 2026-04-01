import {
  findReactionBinarySelectorGroup,
  getReactionBinarySelectorGroups,
} from "./ReactionStructureSelectionRuntime.js";

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
  w_minus_boson: Object.freeze({
    visibleChoiceIds: Object.freeze(["ee"]),
    defaultBySlot: Object.freeze({
      I: "ee",
      M: "ee",
      O: "ee",
    }),
  }),
  w_plus_boson: Object.freeze({
    visibleChoiceIds: Object.freeze(["pp"]),
    defaultBySlot: Object.freeze({
      I: "pp",
      M: "pp",
      O: "pp",
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
  z_boson: Object.freeze({
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

function defaultNormalizeParticipantPolarity(polarity) {
  return String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
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

export function getBinaryPersonalityChoice(choiceId) {
  return (
    binaryPersonalityChoices.find((choice) => choice.id === choiceId) ??
    binaryPersonalityChoices.find((choice) => choice.id === defaultBinaryPersonalityChoiceId) ??
    binaryPersonalityChoices[0]
  );
}

export function getBinaryChoiceKind(choiceId) {
  return binaryChoiceKindById[choiceId] ?? "neutral";
}

export function getBinaryChoiceInventory(choiceId) {
  const normalizedChoiceId = String(choiceId ?? "").trim().toLowerCase();
  if (normalizedChoiceId === "ee") {
    return { electrino: 3, positrino: 1 };
  }
  if (normalizedChoiceId === "pp") {
    return { electrino: 1, positrino: 3 };
  }
  return { electrino: 2, positrino: 2 };
}

function getBinarySelectorTemplateRule(templateId = "") {
  const normalizedTemplateId = String(templateId ?? "").trim().toLowerCase();
  return (
    binarySelectorTemplateRules[normalizedTemplateId] ??
    binarySelectorTemplateRules.default
  );
}

export function invertBinaryChoiceId(choiceId) {
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

export function createReactionBinarySelectionRuntime(options = {}) {
  const supportsParticipantPolarity =
    typeof options.supportsParticipantPolarity === "function"
      ? options.supportsParticipantPolarity
      : () => false;
  const normalizeParticipantPolarity =
    typeof options.normalizeParticipantPolarity === "function"
      ? options.normalizeParticipantPolarity
      : defaultNormalizeParticipantPolarity;

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

  function getParticipantBinarySelectorGroups(participant) {
    return getReactionBinarySelectorGroups(participant?.structure).map((groupNode) => ({
      ...groupNode,
      slotNodes: sortBinarySelectorNodes(groupNode?.slotNodes ?? []),
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
    return findReactionBinarySelectorGroup(participant?.structure, explicitId);
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
    const structureGroups = getParticipantBinarySelectorGroups(participant);
    if (structureGroups.length) {
      return sortBinarySelectorNodes(structureGroups.flatMap((group) => group.slotNodes ?? []));
    }
    return [];
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
      const choiceIds = node.id === pinnedNodeId ? [pinnedChoiceId] : rule.visibleChoiceIds;
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

  return {
    binaryAssignmentsMatch,
    getAllowedBinaryChoiceIds,
    getBinaryChoiceInventory,
    getBinaryPersonalityChoice,
    getBinarySelectorNodes,
    getBinarySelectorRuleForParticipant,
    getFallbackBinarySelections,
    getInitialParticipantBinarySelections,
    getParticipantBinarySelectorGroups,
    getResolvedBinarySelectionMap,
    findBestBinarySelectionAssignment,
    enumerateValidBinarySelectionAssignments,
    pickBestBinaryAssignmentCandidate,
    resolveBinarySelectorGroup,
  };
}
