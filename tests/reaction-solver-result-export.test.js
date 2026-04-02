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
