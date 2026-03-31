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
  return String(entry?.participant?.templateId ?? "").trim().toLowerCase() === "noether_core";
}

function isPhotonProduct(entry = null) {
  return String(entry?.participant?.templateId ?? "").trim().toLowerCase() === "photon";
}

function haveOppositeCorePolarities(leftEntry = null, rightEntry = null) {
  const leftPolarity = String(leftEntry?.participant?.polarity ?? "").trim().toLowerCase();
  const rightPolarity = String(rightEntry?.participant?.polarity ?? "").trim().toLowerCase();
  return (
    (leftPolarity === "pro" && rightPolarity === "anti") ||
    (leftPolarity === "anti" && rightPolarity === "pro")
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
    leftReactantEntry.rootNode,
    { resolveBinaryChoiceInventory }
  );
  const rightSpec = classifyComposerReactionNode(
    rightReactantEntry.participant,
    rightReactantEntry.rootNode,
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

  const operatorRef = `associate:${leftReactantEntry.participant.id}:${rightReactantEntry.participant.id}:${productEntry.participant.id}`;
  const candidate = {
    type: "associate-photon",
    sourceParticipants: [leftReactantEntry.participant, rightReactantEntry.participant],
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
        sourceNode: leftReactantEntry.rootNode,
        sourceEndpoint: {
          participant: leftReactantEntry.participant,
          node: leftReactantEntry.rootNode,
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
        sourceNode: rightReactantEntry.rootNode,
        sourceEndpoint: {
          participant: rightReactantEntry.participant,
          node: rightReactantEntry.rootNode,
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
  candidate.score = scoreAssociatePhotonCandidate(candidate);
  return candidate;
}
