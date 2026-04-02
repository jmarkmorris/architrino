import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionSolveState } from "../src/apps/reaction/ReactionSolveStateRuntime.js";
import { buildReactionSolvePlan } from "../src/apps/reaction/ReactionSolveProposalRuntime.js";
import { buildReactionSolverResultDocument } from "../src/apps/reaction/ReactionSolverResultExportRuntime.js";
import { createReactionBinaryInventoryRuntime } from "../src/apps/reaction/ReactionBinaryInventoryRuntime.js";
import { createReactionBinarySelectionRuntime } from "../src/apps/reaction/ReactionBinarySelectionRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function isTypeMatch(value, expectedType) {
  if (expectedType === "array") {
    return Array.isArray(value);
  }
  if (expectedType === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  if (expectedType === "integer") {
    return Number.isInteger(value);
  }
  if (expectedType === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }
  return typeof value === expectedType;
}

function validateAgainstSchema(value, schema, path = "$", errors = []) {
  if (!schema || typeof schema !== "object") {
    return errors;
  }
  if (Object.prototype.hasOwnProperty.call(schema, "const") && value !== schema.const) {
    errors.push(`${path}: expected constant ${JSON.stringify(schema.const)}`);
    return errors;
  }
  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(`${path}: expected one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`);
  }
  if (schema.type) {
    const allowedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${path}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }
  if (typeof schema.minLength === "number" && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${path}: expected string length >= ${schema.minLength}`);
  }
  if (typeof schema.minimum === "number" && typeof value === "number" && value < schema.minimum) {
    errors.push(`${path}: expected number >= ${schema.minimum}`);
  }
  if (schema.type === "object" || (Array.isArray(schema.type) && schema.type.includes("object"))) {
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${path}: missing required property ${key}`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${path}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      validateAgainstSchema(value[key], childSchema, `${path}.${key}`, errors);
    }
  }
  if (schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array"))) {
    const itemSchema = schema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, `${path}[${index}]`, errors);
      });
    }
  }
  return errors;
}

const supportsParticipantPolarity = (templateId) =>
  new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark", "fermion_gen1"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
const normalizeParticipantPolarity = (polarity) =>
  String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
const {
  getBinaryChoiceInventory,
  getInitialParticipantBinarySelections,
  getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup,
} = createReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});
const { resolveBinaryChoiceInventory } = createReactionBinaryInventoryRuntime({
  getBinaryChoiceInventory,
  getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup,
});

function createParticipant({ id, side, templateId, polarity = "pro", label = templateId }) {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${id}_structure`,
    label,
    polarity,
  });
  const participant = {
    id,
    side,
    templateId,
    polarity,
    baseLabel: label,
    label,
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
  };
  participant.binarySelections = getInitialParticipantBinarySelections(participant);
  return participant;
}

function setParticipantBinarySelectionsBySlotCode(participant, selectionsBySlotCode = {}) {
  const rootNode = participant?.hierarchy?.[0] ?? null;
  const slotNodes = Array.isArray(rootNode?.children) ? rootNode.children : [];
  slotNodes.forEach((slotNode) => {
    const slotCode = String(slotNode?.slotCode ?? "").trim().toUpperCase();
    const choiceId = selectionsBySlotCode[slotCode];
    if (choiceId) {
      participant.binarySelections[slotNode.id] = choiceId;
    }
  });
  return participant;
}

function buildSolveState(participants) {
  return buildReactionSolveState({
    participants,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    isCenterAssemblyParticipant: (participant) => participant?.surfaceColumn === "center-assembly",
  });
}

function createAggregateLedgerParticipant({
  id,
  side = "reactant",
  electrinoCount = 0,
  positrinoCount = 0,
  label = "Free Architrinos",
}) {
  return {
    id,
    side,
    templateId: "free_architrinos",
    baseLabel: label,
    label,
    hierarchy: [
      {
        id: `${id}_structure`,
        templateId: "free_architrinos",
        label,
        inventory: {
          electrinoCount,
          positrinoCount,
        },
        children: [],
      },
    ],
  };
}

function createRecognizedCollapsePlan({
  sourceEntries = [],
  targetParticipant = null,
  recognition = null,
  unresolvedProducts = [],
}) {
  const operatorRef = `associate:${sourceEntries.map((entry) => entry?.participant?.id ?? "").join(":")}:${targetParticipant?.id ?? "target"}`;
  const candidate = {
    type: "associate-standalone",
    sourceEntries,
    targetParticipant,
    participantAdditions: [
      {
        ref: operatorRef,
        kind: "operator",
        templateId: "associate",
        operatorLaneIndex: 1,
      },
    ],
  };
  return {
    selectedAssociateCandidates: [candidate],
    participantAdditions: [...candidate.participantAdditions],
    selectedMappings: [],
    recognizedCenterBosons: recognition ? [recognition] : [],
    unresolvedReactants: [],
    unresolvedProducts,
    dissociation: {
      autoDissociatedParticipantIds: [],
    },
    residue: {
      source: [],
      target: [],
    },
  };
}

test("solver result exporter emits a collapse-boson step and participant for an exact W- recognition", () => {
  const centerCore = createParticipant({
    id: "center_core_w_minus",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  centerCore.surfaceColumn = "center-assembly";
  const centerFreeArchitrinos = setParticipantBinarySelectionsBySlotCode(
    createParticipant({
      id: "center_free_architrinos_w_minus",
      side: "reactant",
      templateId: "free_architrinos",
      label: "Free Architrinos",
    }),
    { I: "ee", M: "ee", O: "ee" }
  );
  centerFreeArchitrinos.surfaceColumn = "center-assembly";
  const productElectron = createParticipant({
    id: "product_electron_w_minus",
    side: "product",
    templateId: "electron",
    polarity: "pro",
    label: "Electron",
  });

  const solveState = buildSolveState([centerCore, centerFreeArchitrinos, productElectron]);
  const plan = buildReactionSolvePlan({
    solveState,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });
  const result = buildReactionSolverResultDocument({
    request: {
      requestId: "center_w_minus_recognition",
    },
    solveState,
    plan,
  });
  const schema = readJson("src/contracts/solver-result/v1/schema.json");
  const errors = validateAgainstSchema(result, schema);

  assert.deepEqual(errors, []);
  assert.deepEqual(
    result.steps.map((step) => step.kind),
    ["associate", "collapse-boson"]
  );
  assert.ok(
    result.steps.some(
      (step) =>
        step.kind === "collapse-boson" &&
        step.ruleFamily === "late-center-exact" &&
        step.producedParticipantIds.length === 1
    )
  );
  assert.ok(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.templateId === "w_minus_boson"
    )
  );
});

test("solver result exporter rewrites aggregate Free Architrinos residue after a recognized W- collapse", () => {
  const centerCore = createParticipant({
    id: "center_core_w_minus_aggregate",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  centerCore.surfaceColumn = "center-assembly";
  const centerFreeArchitrinos = createAggregateLedgerParticipant({
    id: "center_free_architrinos_w_minus_aggregate",
    electrinoCount: 11,
    positrinoCount: 7,
  });
  centerFreeArchitrinos.surfaceColumn = "center-assembly";
  const productElectron = createParticipant({
    id: "product_electron_w_minus_aggregate",
    side: "product",
    templateId: "electron",
    polarity: "pro",
    label: "Electron",
  });
  const solveState = buildSolveState([centerCore, centerFreeArchitrinos, productElectron]);
  const plan = createRecognizedCollapsePlan({
    sourceEntries: [
      { participant: centerCore, rootNode: centerCore.hierarchy[0], sourceNode: centerCore.hierarchy[0] },
      {
        participant: centerFreeArchitrinos,
        rootNode: centerFreeArchitrinos.hierarchy[0],
        sourceNode: centerFreeArchitrinos.hierarchy[0],
      },
    ],
    targetParticipant: productElectron,
    recognition: {
      kind: "late-center-exact",
      templateId: "w_minus_boson",
      targetParticipantId: "product_electron_w_minus_aggregate",
      targetTemplateId: "electron",
      sourceParticipantIds: [
        "center_core_w_minus_aggregate",
        "center_free_architrinos_w_minus_aggregate",
      ],
      sourceNodeIds: [
        "center_core_w_minus_aggregate_structure",
        "center_free_architrinos_w_minus_aggregate_structure",
      ],
      sourcePattern: {
        corePolarities: ["pro"],
        freeArchitrinoLedger: {
          electrino: 11,
          positrino: 7,
        },
      },
    },
  });

  const result = buildReactionSolverResultDocument({
    request: {
      requestId: "center_w_minus_aggregate_recognition",
    },
    solveState,
    plan,
  });
  const schema = readJson("src/contracts/solver-result/v1/schema.json");
  const errors = validateAgainstSchema(result, schema);
  const collapseStep = result.steps.find((step) => step.kind === "collapse-boson");
  const remainingLedgerParticipants = result.participants.filter(
    (participant) =>
      participant.templateId === "free_architrinos" &&
      participant.origin === "solve-generated-intermediate"
  );

  assert.deepEqual(errors, []);
  assert.ok(collapseStep);
  assert.equal(collapseStep.producedParticipantIds.length, 2);
  assert.deepEqual(collapseStep.consumedParticipantIds, [
    "center_core_w_minus_aggregate",
    "center_free_architrinos_w_minus_aggregate",
  ]);
  assert.deepEqual(
    remainingLedgerParticipants.map((participant) => participant.inventory),
    [{ electrinoCount: 5, positrinoCount: 7 }]
  );
  assert.deepEqual(
    remainingLedgerParticipants.map((participant) => participant.sourceParticipantId),
    ["center_free_architrinos_w_minus_aggregate"]
  );
});

test("solver result exporter suppresses recognized boson emission for unresolved or non-center closures", () => {
  const centerCore = createParticipant({
    id: "center_core_partial_recognition",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  centerCore.surfaceColumn = "center-assembly";
  const centerFreeArchitrinos = createAggregateLedgerParticipant({
    id: "center_free_architrinos_partial_recognition",
    electrinoCount: 11,
    positrinoCount: 7,
  });
  centerFreeArchitrinos.surfaceColumn = "center-assembly";
  const productElectron = createParticipant({
    id: "product_electron_partial_recognition",
    side: "product",
    templateId: "electron",
    polarity: "pro",
    label: "Electron",
  });
  const partialSolveState = buildSolveState([centerCore, centerFreeArchitrinos, productElectron]);
  const partialResult = buildReactionSolverResultDocument({
    request: {
      requestId: "partial_recognition_suppressed",
    },
    solveState: partialSolveState,
    plan: createRecognizedCollapsePlan({
      sourceEntries: [
        { participant: centerCore, rootNode: centerCore.hierarchy[0], sourceNode: centerCore.hierarchy[0] },
        {
          participant: centerFreeArchitrinos,
          rootNode: centerFreeArchitrinos.hierarchy[0],
          sourceNode: centerFreeArchitrinos.hierarchy[0],
        },
      ],
      targetParticipant: productElectron,
      unresolvedProducts: [{ participant: productElectron }],
      recognition: {
        kind: "late-center-exact",
        templateId: "w_minus_boson",
        targetParticipantId: "product_electron_partial_recognition",
        sourceParticipantIds: [
          "center_core_partial_recognition",
          "center_free_architrinos_partial_recognition",
        ],
        sourcePattern: {
          corePolarities: ["pro"],
          freeArchitrinoLedger: {
            electrino: 11,
            positrino: 7,
          },
        },
      },
    }),
  });

  const reactantCore = createParticipant({
    id: "reactant_core_non_center_recognition",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  const reactantFreeArchitrinos = createAggregateLedgerParticipant({
    id: "reactant_free_architrinos_non_center_recognition",
    electrinoCount: 11,
    positrinoCount: 7,
  });
  const exactProductElectron = createParticipant({
    id: "product_electron_non_center_recognition",
    side: "product",
    templateId: "electron",
    polarity: "pro",
    label: "Electron",
  });
  const nonCenterSolveState = buildSolveState([
    reactantCore,
    reactantFreeArchitrinos,
    exactProductElectron,
  ]);
  const nonCenterResult = buildReactionSolverResultDocument({
    request: {
      requestId: "non_center_recognition_suppressed",
    },
    solveState: nonCenterSolveState,
    plan: createRecognizedCollapsePlan({
      sourceEntries: [
        { participant: reactantCore, rootNode: reactantCore.hierarchy[0], sourceNode: reactantCore.hierarchy[0] },
        {
          participant: reactantFreeArchitrinos,
          rootNode: reactantFreeArchitrinos.hierarchy[0],
          sourceNode: reactantFreeArchitrinos.hierarchy[0],
        },
      ],
      targetParticipant: exactProductElectron,
      recognition: {
        kind: "late-center-exact",
        templateId: "w_minus_boson",
        targetParticipantId: "product_electron_non_center_recognition",
        sourceParticipantIds: [
          "reactant_core_non_center_recognition",
          "reactant_free_architrinos_non_center_recognition",
        ],
        sourcePattern: {
          corePolarities: ["pro"],
          freeArchitrinoLedger: {
            electrino: 11,
            positrino: 7,
          },
        },
      },
    }),
  });

  assert.equal(partialResult.steps.some((step) => step.kind === "collapse-boson"), false);
  assert.equal(
    partialResult.participants.some(
      (participant) => participant.origin === "solve-generated-intermediate"
    ),
    false
  );
  assert.equal(nonCenterResult.steps.some((step) => step.kind === "collapse-boson"), false);
  assert.equal(
    nonCenterResult.participants.some(
      (participant) => participant.origin === "solve-generated-intermediate"
    ),
    false
  );
});

test("solver result exporter emits multiple disjoint collapse-boson steps for one exact closure", () => {
  const centerProCore = createParticipant({
    id: "center_pro_core_z",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  centerProCore.surfaceColumn = "center-assembly";
  const centerAntiCore = createParticipant({
    id: "center_anti_core_z",
    side: "reactant",
    templateId: "noether_core",
    polarity: "anti",
    label: "Noether core",
  });
  centerAntiCore.surfaceColumn = "center-assembly";
  const centerCoreWMinus = createParticipant({
    id: "center_core_w_minus",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Noether core",
  });
  centerCoreWMinus.surfaceColumn = "center-assembly";
  const centerFreeArchitrinos = setParticipantBinarySelectionsBySlotCode(
    createParticipant({
      id: "center_free_architrinos_w_minus",
      side: "reactant",
      templateId: "free_architrinos",
      label: "Free Architrinos",
    }),
    { I: "ee", M: "ee", O: "ee" }
  );
  centerFreeArchitrinos.surfaceColumn = "center-assembly";
  const productPhoton = createParticipant({
    id: "product_photon_z",
    side: "product",
    templateId: "photon",
    label: "Photon",
  });
  const productElectron = createParticipant({
    id: "product_electron_w_minus",
    side: "product",
    templateId: "electron",
    polarity: "pro",
    label: "Electron",
  });

  const solveState = buildSolveState([
    centerProCore,
    centerAntiCore,
    centerCoreWMinus,
    centerFreeArchitrinos,
    productPhoton,
    productElectron,
  ]);
  const plan = buildReactionSolvePlan({
    solveState,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });
  const result = buildReactionSolverResultDocument({
    request: {
      requestId: "center_multiple_boson_recognition",
    },
    solveState,
    plan,
  });

  assert.equal(plan.recognizedCenterBosonCount, 2);
  assert.equal(result.steps.filter((step) => step.kind === "collapse-boson").length, 2);
  assert.deepEqual(
    result.participants
      .filter((participant) => participant.origin === "solve-generated-intermediate")
      .map((participant) => participant.templateId)
      .sort(),
    ["w_minus_boson", "z_boson"]
  );
});
