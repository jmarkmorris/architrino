import {
  classifyComposerReactionNode,
  evaluateComposerReactionMappingCandidate,
} from "./ComposerReactionStructureMappingRuntime.js";

function normalizeText(value = "") {
  return String(value ?? "").trim().toLowerCase();
}

function compareText(left = "", right = "") {
  return String(left ?? "").localeCompare(String(right ?? ""));
}

function createEmptyInventory() {
  return {
    proCore: 0,
    antiCore: 0,
    electrino: 0,
    positrino: 0,
  };
}

function normalizeInventory(inventory = null) {
  const normalized = createEmptyInventory();
  Object.keys(normalized).forEach((key) => {
    normalized[key] = Math.max(0, Number(inventory?.[key] ?? 0));
  });
  return normalized;
}

function addInventories(left = null, right = null) {
  const sum = createEmptyInventory();
  const leftInventory = normalizeInventory(left);
  const rightInventory = normalizeInventory(right);
  Object.keys(sum).forEach((key) => {
    sum[key] = leftInventory[key] + rightInventory[key];
  });
  return sum;
}

function inventoriesEqual(left = null, right = null) {
  const leftInventory = normalizeInventory(left);
  const rightInventory = normalizeInventory(right);
  return Object.keys(leftInventory).every((key) => leftInventory[key] === rightInventory[key]);
}

function inventoryFitsWithin(limitInventory = null, candidateInventory = null) {
  const limit = normalizeInventory(limitInventory);
  const candidate = normalizeInventory(candidateInventory);
  return Object.keys(limit).every((key) => candidate[key] <= limit[key]);
}

function isNoetherCoreReactant(entry = null) {
  return (
    String(entry?.sourceNode?.templateId ?? entry?.rootNode?.templateId ?? entry?.participant?.templateId ?? "")
      .trim()
      .toLowerCase() === "noether_core"
  );
}

function isFreeArchitrinosReactant(entry = null) {
  return (
    String(entry?.sourceNode?.templateId ?? entry?.rootNode?.templateId ?? entry?.participant?.templateId ?? "")
      .trim()
      .toLowerCase() === "free_architrinos"
  );
}

function isPhotonProduct(entry = null) {
  return String(entry?.participant?.templateId ?? "").trim().toLowerCase() === "photon";
}

function isCompositeAssociateProduct(entry = null) {
  if (!entry?.participant || !entry?.rootNode) {
    return false;
  }
  if (isPhotonProduct(entry)) {
    return false;
  }
  return (
    Array.isArray(entry.rootNode.children) &&
    entry.rootNode.children.some((childNode) => childNode?.id && childNode?.templateId)
  );
}

function isStandaloneAssociateProduct(entry = null) {
  return (
    !!entry?.participant &&
    !!entry?.rootNode &&
    !isPhotonProduct(entry) &&
    !isCompositeAssociateProduct(entry)
  );
}

function getLedgerFromInventory(inventory = null) {
  const normalizedInventory = normalizeInventory(inventory);
  return {
    electrino: normalizedInventory.electrino,
    positrino: normalizedInventory.positrino,
  };
}

function ledgersEqual(leftInventory = null, rightInventory = null) {
  const leftLedger = getLedgerFromInventory(leftInventory);
  const rightLedger = getLedgerFromInventory(rightInventory);
  return (
    leftLedger.electrino === rightLedger.electrino &&
    leftLedger.positrino === rightLedger.positrino
  );
}

function isSameSourceParticipant(leftEntry = null, rightEntry = null) {
  return String(leftEntry?.participant?.id ?? "") === String(rightEntry?.participant?.id ?? "");
}

function haveOppositeCorePolarities(leftEntry = null, rightEntry = null) {
  const leftPolarity = String(
    leftEntry?.sourceNode?.polarity ?? leftEntry?.rootNode?.polarity ?? leftEntry?.participant?.polarity ?? ""
  )
    .trim()
    .toLowerCase();
  const rightPolarity = String(
    rightEntry?.sourceNode?.polarity ?? rightEntry?.rootNode?.polarity ?? rightEntry?.participant?.polarity ?? ""
  )
    .trim()
    .toLowerCase();
  return (
    (leftPolarity === "pro" && rightPolarity === "anti") ||
    (leftPolarity === "anti" && rightPolarity === "pro")
  );
}

function getProductPhotonChildByPolarity(productEntry = null, polarity = "") {
  const normalizedPolarity = String(polarity ?? "").trim().toLowerCase();
  const childNodes = Array.isArray(productEntry?.rootNode?.children) ? productEntry.rootNode.children : [];
  return (
    childNodes.find(
      (childNode) => String(childNode?.polarity ?? "").trim().toLowerCase() === normalizedPolarity
    ) ?? null
  );
}

function getProductChildNodes(productEntry = null) {
  return Array.isArray(productEntry?.rootNode?.children)
    ? productEntry.rootNode.children.filter((childNode) => childNode?.id)
    : [];
}

function createSourceEntryIdentity(sourceEntry = null) {
  return String(sourceEntry?.sourceFragmentKey ?? sourceEntry?.sourceNodeKey ?? "");
}

function scoreAssociatePair(sourceNode = null, targetNode = null, evaluation = null) {
  let score = 0;
  if (sourceNode?.templateId === targetNode?.templateId) {
    score += 100;
  }
  if (normalizeText(sourceNode?.label) === normalizeText(targetNode?.label)) {
    score += 20;
  }
  if (evaluation?.provenanceMode === "direct") {
    score += 5;
  }
  return score;
}

function compareAssociateAssignments(left = null, right = null) {
  const targetTemplateDelta = compareText(left?.targetNode?.templateId, right?.targetNode?.templateId);
  if (targetTemplateDelta !== 0) {
    return targetTemplateDelta;
  }
  const targetIdDelta = compareText(left?.targetNode?.id, right?.targetNode?.id);
  if (targetIdDelta !== 0) {
    return targetIdDelta;
  }
  const sourceTemplateDelta = compareText(left?.sourceNode?.templateId, right?.sourceNode?.templateId);
  if (sourceTemplateDelta !== 0) {
    return sourceTemplateDelta;
  }
  return compareText(createSourceEntryIdentity(left?.sourceEntry), createSourceEntryIdentity(right?.sourceEntry));
}

function compareAssociateSourceEntries(left = null, right = null) {
  const wholeParticipantDelta =
    Number(Boolean(right?.consumesWholeParticipant)) - Number(Boolean(left?.consumesWholeParticipant));
  if (wholeParticipantDelta !== 0) {
    return wholeParticipantDelta;
  }
  return compareText(createSourceEntryIdentity(left), createSourceEntryIdentity(right));
}

function scoreAssociatePhotonCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  return 3000 + Number(candidate.operatorCount ?? 0) * -50;
}

function scoreAssociateCompositeCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  return (
    3200 +
    Number(candidate.matchedTargetNodeCount ?? 0) * 100 +
    Number(candidate.pairScoreTotal ?? 0) +
    Number(candidate.operatorCount ?? 0) * -50
  );
}

function scoreAssociateStandaloneCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  return (
    2600 +
    Number(candidate.pairScoreTotal ?? 0) +
    Number(candidate.operatorCount ?? 0) * -50
  );
}

export function createAssociatePhotonCandidate(options = {}) {
  const leftReactantEntry = options.leftReactantEntry ?? null;
  const rightReactantEntry = options.rightReactantEntry ?? null;
  const productEntry = options.productEntry ?? null;
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;
  if (
    !isNoetherCoreReactant(leftReactantEntry) ||
    !isNoetherCoreReactant(rightReactantEntry) ||
    !isPhotonProduct(productEntry) ||
    !haveOppositeCorePolarities(leftReactantEntry, rightReactantEntry)
  ) {
    return null;
  }

  const leftSpec = classifyComposerReactionNode(
    leftReactantEntry.participant,
    leftReactantEntry.sourceNode ?? leftReactantEntry.rootNode,
    { resolveBinaryChoiceInventory }
  );
  const rightSpec = classifyComposerReactionNode(
    rightReactantEntry.participant,
    rightReactantEntry.sourceNode ?? rightReactantEntry.rootNode,
    { resolveBinaryChoiceInventory }
  );
  const productSpec = classifyComposerReactionNode(
    productEntry.participant,
    productEntry.rootNode,
    { resolveBinaryChoiceInventory }
  );
  if (!leftSpec?.hasInventory || !rightSpec?.hasInventory || !productSpec?.hasInventory) {
    return null;
  }
  if (!inventoriesEqual(addInventories(leftSpec.inventory, rightSpec.inventory), productSpec.inventory)) {
    return null;
  }
  const proTargetNode = getProductPhotonChildByPolarity(productEntry, "pro");
  const antiTargetNode = getProductPhotonChildByPolarity(productEntry, "anti");
  if (!proTargetNode?.id || !antiTargetNode?.id) {
    return null;
  }

  const leftSourceNode = leftReactantEntry.sourceNode ?? leftReactantEntry.rootNode ?? null;
  const rightSourceNode = rightReactantEntry.sourceNode ?? rightReactantEntry.rootNode ?? null;
  if (!leftSourceNode?.id || !rightSourceNode?.id) {
    return null;
  }
  const operatorRef = `associate:${leftReactantEntry.participant.id}:${leftSourceNode.id}:${rightReactantEntry.participant.id}:${rightSourceNode.id}:${productEntry.participant.id}`;
  const candidate = {
    type: "associate-photon",
    sourceParticipant: leftReactantEntry.participant,
    sourceParticipants: [leftReactantEntry.participant, rightReactantEntry.participant],
    sourceEntries: [leftReactantEntry, rightReactantEntry],
    targetParticipant: productEntry.participant,
    productResolutionKind: "associated",
    operatorCount: 1,
    participantAdditions: [
      {
        ref: operatorRef,
        kind: "operator",
        templateId: "associate",
        operatorLaneIndex: 1,
      },
    ],
    mappings: [
      {
        sourceParticipant: leftReactantEntry.participant,
        sourceNode: leftSourceNode,
        sourceEndpoint: {
          participant: leftReactantEntry.participant,
          node: leftSourceNode,
          role: "reactant",
        },
        targetEndpoint: {
          participantRef: operatorRef,
          role: "operator-input",
          anchorInstanceIndex: 0,
        },
      },
      {
        sourceParticipant: rightReactantEntry.participant,
        sourceNode: rightSourceNode,
        sourceEndpoint: {
          participant: rightReactantEntry.participant,
          node: rightSourceNode,
          role: "reactant",
        },
        targetEndpoint: {
          participantRef: operatorRef,
          role: "operator-input",
          anchorInstanceIndex: 0,
        },
      },
      {
        targetParticipant: productEntry.participant,
        targetNode: proTargetNode,
        sourceEndpoint: {
          participantRef: operatorRef,
          role: "operator-output",
          anchorInstanceIndex: 0,
        },
        targetEndpoint: {
          participant: productEntry.participant,
          node: proTargetNode,
          role: "product",
        },
      },
      {
        targetParticipant: productEntry.participant,
        targetNode: antiTargetNode,
        sourceEndpoint: {
          participantRef: operatorRef,
          role: "operator-output",
          anchorInstanceIndex: 0,
        },
        targetEndpoint: {
          participant: productEntry.participant,
          node: antiTargetNode,
          role: "product",
        },
      },
    ],
  };
  candidate.score = scoreAssociatePhotonCandidate(candidate);
  return candidate;
}

export function createAssociateCompositeCandidate(options = {}) {
  const sourceEntries = Array.isArray(options.sourceEntries) ? options.sourceEntries.filter(Boolean) : [];
  const productEntry = options.productEntry ?? null;
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;
  if (!isCompositeAssociateProduct(productEntry)) {
    return null;
  }

  const productSpec = classifyComposerReactionNode(productEntry.participant, productEntry.rootNode, {
    resolveBinaryChoiceInventory,
  });
  if (!productSpec?.hasInventory) {
    return null;
  }

  const targetNodes = getProductChildNodes(productEntry);
  if (targetNodes.length < 2 || sourceEntries.length < targetNodes.length) {
    return null;
  }

  const pairOptionsByTargetIndex = targetNodes.map((targetNode, targetIndex) =>
    sourceEntries
      .map((sourceEntry, sourceIndex) => {
        const sourceParticipant = sourceEntry?.participant ?? null;
        const sourceNode = sourceEntry?.sourceNode ?? sourceEntry?.rootNode ?? null;
        if (!sourceParticipant || !sourceNode?.id) {
          return null;
        }
        const evaluation = evaluateComposerReactionMappingCandidate({
          sourceParticipant,
          sourceNode,
          targetParticipant: productEntry.participant,
          targetNode,
          resolveBinaryChoiceInventory,
        });
        if (!evaluation.allowed) {
          return null;
        }
        return {
          sourceEntry,
          sourceIndex,
          sourceParticipant,
          sourceNode,
          targetNode,
          targetIndex,
          evaluation,
          pairScore: scoreAssociatePair(sourceNode, targetNode, evaluation),
        };
      })
      .filter(Boolean)
      .sort((left, right) => {
        const scoreDelta = Number(right?.pairScore ?? 0) - Number(left?.pairScore ?? 0);
        if (scoreDelta !== 0) {
          return scoreDelta;
        }
        return compareAssociateSourceEntries(left?.sourceEntry, right?.sourceEntry);
      })
  );
  if (pairOptionsByTargetIndex.some((optionsForTarget) => !optionsForTarget.length)) {
    return null;
  }

  let bestPlan = null;

  function visit(
    targetIndex = 0,
    usedSourceIndexes = new Set(),
    currentAssignments = [],
    currentInventory = createEmptyInventory(),
    pairScoreTotal = 0
  ) {
    if (targetIndex >= targetNodes.length) {
      if (usedSourceIndexes.size < 2 || !inventoriesEqual(currentInventory, productSpec.inventory)) {
        return;
      }
      const selectedSourceEntries = [...new Set(currentAssignments.map((assignment) => assignment.sourceEntry))].sort(
        compareAssociateSourceEntries
      );
      const candidatePlan = {
        assignments: [...currentAssignments].sort(compareAssociateAssignments),
        sourceEntries: selectedSourceEntries,
        pairScoreTotal,
      };
      if (
        !bestPlan ||
        Number(candidatePlan.assignments.length) > Number(bestPlan.assignments.length) ||
        (candidatePlan.assignments.length === bestPlan.assignments.length &&
          (Number(candidatePlan.pairScoreTotal ?? 0) > Number(bestPlan.pairScoreTotal ?? 0) ||
            (candidatePlan.pairScoreTotal === bestPlan.pairScoreTotal &&
              compareText(
                candidatePlan.sourceEntries.map(createSourceEntryIdentity).join("|"),
                bestPlan.sourceEntries.map(createSourceEntryIdentity).join("|")
              ) < 0)))
      ) {
        bestPlan = candidatePlan;
      }
      return;
    }

    const remainingTargetCount = targetNodes.length - targetIndex;
    if (sourceEntries.length - usedSourceIndexes.size < remainingTargetCount) {
      return;
    }

    pairOptionsByTargetIndex[targetIndex].forEach((assignment) => {
      if (usedSourceIndexes.has(assignment.sourceIndex)) {
        return;
      }
      const sourceSpec = classifyComposerReactionNode(
        assignment.sourceParticipant,
        assignment.sourceNode,
        { resolveBinaryChoiceInventory }
      );
      if (!sourceSpec?.hasInventory) {
        return;
      }
      const nextInventory = addInventories(currentInventory, sourceSpec.inventory);
      if (!inventoryFitsWithin(productSpec.inventory, nextInventory)) {
        return;
      }
      usedSourceIndexes.add(assignment.sourceIndex);
      currentAssignments.push(assignment);
      visit(
        targetIndex + 1,
        usedSourceIndexes,
        currentAssignments,
        nextInventory,
        pairScoreTotal + Number(assignment.pairScore ?? 0)
      );
      currentAssignments.pop();
      usedSourceIndexes.delete(assignment.sourceIndex);
    });
  }

  visit();

  if (!bestPlan?.assignments?.length || bestPlan.assignments.length !== targetNodes.length) {
    return null;
  }

  const operatorRef = [
    "associate",
    ...bestPlan.sourceEntries.map((sourceEntry) =>
      `${String(sourceEntry?.participant?.id ?? "")}:${String(sourceEntry?.sourceNode?.id ?? "")}`
    ),
    String(productEntry.participant.id ?? ""),
  ].join(":");
  const mappings = [];
  bestPlan.sourceEntries.forEach((sourceEntry) => {
    const sourceNode = sourceEntry?.sourceNode ?? sourceEntry?.rootNode ?? null;
    mappings.push({
      sourceParticipant: sourceEntry.participant,
      sourceNode,
      sourceEndpoint: {
        participant: sourceEntry.participant,
        node: sourceNode,
        role: "reactant",
      },
      targetEndpoint: {
        participantRef: operatorRef,
        role: "operator-input",
        anchorInstanceIndex: 0,
      },
    });
  });
  bestPlan.assignments.forEach((assignment) => {
    mappings.push({
      targetParticipant: productEntry.participant,
      targetNode: assignment.targetNode,
      sourceEndpoint: {
        participantRef: operatorRef,
        role: "operator-output",
        anchorInstanceIndex: 0,
      },
      targetEndpoint: {
        participant: productEntry.participant,
        node: assignment.targetNode,
        role: "product",
      },
    });
  });

  const candidate = {
    type: "associate-composite",
    sourceParticipant: bestPlan.sourceEntries[0]?.participant ?? null,
    sourceParticipants: bestPlan.sourceEntries.map((sourceEntry) => sourceEntry.participant),
    sourceEntries: bestPlan.sourceEntries,
    targetParticipant: productEntry.participant,
    productResolutionKind: "associated",
    operatorCount: 1,
    pairScoreTotal: bestPlan.pairScoreTotal,
    matchedTargetNodeCount: bestPlan.assignments.length,
    participantAdditions: [
      {
        ref: operatorRef,
        kind: "operator",
        templateId: "associate",
        operatorLaneIndex: 1,
      },
    ],
    mappings,
  };
  candidate.score = scoreAssociateCompositeCandidate(candidate);
  return candidate;
}

export function createAssociateStandaloneCandidate(options = {}) {
  const sourceEntries = Array.isArray(options.sourceEntries) ? options.sourceEntries.filter(Boolean) : [];
  const productEntry = options.productEntry ?? null;
  const resolveBinaryChoiceInventory =
    typeof options.resolveBinaryChoiceInventory === "function"
      ? options.resolveBinaryChoiceInventory
      : null;
  if (!isStandaloneAssociateProduct(productEntry) || sourceEntries.length < 2) {
    return null;
  }

  const productSpec = classifyComposerReactionNode(productEntry.participant, productEntry.rootNode, {
    resolveBinaryChoiceInventory,
  });
  if (!productSpec?.hasInventory) {
    return null;
  }

  const noetherCoreEntries = sourceEntries.filter(isNoetherCoreReactant);
  const freeArchitrinoEntries = sourceEntries.filter(isFreeArchitrinosReactant);
  if (!noetherCoreEntries.length || !freeArchitrinoEntries.length) {
    return null;
  }

  let bestCandidate = null;
  noetherCoreEntries.forEach((coreEntry) => {
    freeArchitrinoEntries.forEach((freeEntry) => {
      if (isSameSourceParticipant(coreEntry, freeEntry)) {
        return;
      }
      const coreSourceNode = coreEntry?.sourceNode ?? coreEntry?.rootNode ?? null;
      const freeSourceNode = freeEntry?.sourceNode ?? freeEntry?.rootNode ?? null;
      if (!coreSourceNode?.id || !freeSourceNode?.id) {
        return;
      }
      const coreSpec = classifyComposerReactionNode(coreEntry.participant, coreSourceNode, {
        resolveBinaryChoiceInventory,
      });
      const freeSpec = classifyComposerReactionNode(freeEntry.participant, freeSourceNode, {
        resolveBinaryChoiceInventory,
      });
      if (!coreSpec?.hasInventory || !freeSpec?.hasInventory) {
        return;
      }
      const corePolarity = normalizeText(
        coreSourceNode?.polarity ?? coreEntry?.participant?.polarity ?? ""
      );
      const targetPolarity = normalizeText(productEntry?.participant?.polarity ?? "");
      if (targetPolarity && corePolarity && corePolarity !== targetPolarity) {
        return;
      }
      const combinedInventory = addInventories(coreSpec.inventory, freeSpec.inventory);
      if (!ledgersEqual(combinedInventory, productSpec.inventory)) {
        return;
      }
      const operatorRef = [
        "associate",
        String(coreEntry?.participant?.id ?? ""),
        String(coreSourceNode.id ?? ""),
        String(freeEntry?.participant?.id ?? ""),
        String(freeSourceNode.id ?? ""),
        String(productEntry?.participant?.id ?? ""),
      ].join(":");
      const pairScoreTotal =
        scoreAssociatePair(coreSourceNode, productEntry.rootNode, {
          provenanceMode: coreSpec.provenanceMode,
        }) +
        scoreAssociatePair(freeSourceNode, productEntry.rootNode, {
          provenanceMode: freeSpec.provenanceMode,
        });
      const candidate = {
        type: "associate-standalone",
        sourceParticipant: coreEntry.participant,
        sourceParticipants: [coreEntry.participant, freeEntry.participant],
        sourceEntries: [coreEntry, freeEntry].sort(compareAssociateSourceEntries),
        targetParticipant: productEntry.participant,
        productResolutionKind: "associated",
        operatorCount: 1,
        pairScoreTotal,
        matchedTargetNodeCount: 1,
        participantAdditions: [
          {
            ref: operatorRef,
            kind: "operator",
            templateId: "associate",
            operatorLaneIndex: 1,
          },
        ],
        mappings: [
          {
            sourceParticipant: coreEntry.participant,
            sourceNode: coreSourceNode,
            sourceEndpoint: {
              participant: coreEntry.participant,
              node: coreSourceNode,
              role: "reactant",
            },
            targetEndpoint: {
              participantRef: operatorRef,
              role: "operator-input",
              anchorInstanceIndex: 0,
            },
          },
          {
            sourceParticipant: freeEntry.participant,
            sourceNode: freeSourceNode,
            sourceEndpoint: {
              participant: freeEntry.participant,
              node: freeSourceNode,
              role: "reactant",
            },
            targetEndpoint: {
              participantRef: operatorRef,
              role: "operator-input",
              anchorInstanceIndex: 0,
            },
          },
          {
            targetParticipant: productEntry.participant,
            targetNode: productEntry.rootNode,
            sourceEndpoint: {
              participantRef: operatorRef,
              role: "operator-output",
              anchorInstanceIndex: 0,
            },
            targetEndpoint: {
              participant: productEntry.participant,
              node: productEntry.rootNode,
              role: "product",
            },
          },
        ],
      };
      candidate.score = scoreAssociateStandaloneCandidate(candidate);
      if (
        !bestCandidate ||
        Number(candidate.pairScoreTotal ?? 0) > Number(bestCandidate.pairScoreTotal ?? 0) ||
        (
          Number(candidate.pairScoreTotal ?? 0) === Number(bestCandidate.pairScoreTotal ?? 0) &&
          compareText(
            candidate.sourceEntries.map(createSourceEntryIdentity).join("|"),
            bestCandidate.sourceEntries.map(createSourceEntryIdentity).join("|")
          ) < 0
        )
      ) {
        bestCandidate = candidate;
      }
    });
  });
  return bestCandidate;
}
