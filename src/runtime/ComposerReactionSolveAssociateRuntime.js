import { classifyComposerReactionNode } from "./ComposerReactionStructureMappingRuntime.js";

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

function isNoetherCoreReactant(entry = null) {
  return (
    String(entry?.sourceNode?.templateId ?? entry?.rootNode?.templateId ?? entry?.participant?.templateId ?? "")
      .trim()
      .toLowerCase() === "noether_core"
  );
}

function isPhotonProduct(entry = null) {
  return String(entry?.participant?.templateId ?? "").trim().toLowerCase() === "photon";
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

function scoreAssociatePhotonCandidate(candidate = null) {
  if (!candidate) {
    return Number.NEGATIVE_INFINITY;
  }
  return 3000 + Number(candidate.operatorCount ?? 0) * -50;
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
