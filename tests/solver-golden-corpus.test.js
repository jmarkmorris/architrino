import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionSolveState } from "../src/apps/reaction/ReactionSolveStateRuntime.js";
import { buildReactionSolvePlan } from "../src/apps/reaction/ReactionSolveProposalRuntime.js";
import { applyReactionSolveLayout } from "../src/apps/reaction/ReactionSolveLayoutRuntime.js";
import { applyReactionSolvePlan } from "../src/apps/reaction/ReactionSolveProjectionRuntime.js";
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

function createParticipant({ id, side, templateId, polarity = "pro", label = templateId, surfaceRowIndex = 0 }) {
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
    surfaceRowIndex,
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
}

function buildSolveState(participants) {
  return buildReactionSolveState({
    participants,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    isCenterAssemblyParticipant: (participant) => participant?.surfaceColumn === "center-assembly",
  });
}

function buildRuntimeParticipants(caseId) {
  if (caseId === "direct_core_pairs") {
    return [
      createParticipant({
        id: "reactant_pro_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "pro",
        label: "Pro Noether core",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "reactant_anti_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "anti",
        label: "Anti Noether core",
        surfaceRowIndex: 1,
      }),
      createParticipant({
        id: "product_anti_core",
        side: "product",
        templateId: "noether_core",
        polarity: "anti",
        label: "Anti Noether core",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "product_pro_core",
        side: "product",
        templateId: "noether_core",
        polarity: "pro",
        label: "Pro Noether core",
        surfaceRowIndex: 1,
      }),
    ];
  }

  if (caseId === "fragment_down_quark") {
    return [
      createParticipant({
        id: "reactant_neutron",
        side: "reactant",
        templateId: "neutron",
        label: "Neutron",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "product_proton",
        side: "product",
        templateId: "proton",
        label: "Proton",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "product_down_quark",
        side: "product",
        templateId: "down_quark",
        polarity: "pro",
        label: "Down Quark",
        surfaceRowIndex: 1,
      }),
    ];
  }

  if (caseId === "associate_photon") {
    return [
      createParticipant({
        id: "reactant_pro_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "pro",
        label: "Pro Noether core",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "reactant_anti_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "anti",
        label: "Anti Noether core",
        surfaceRowIndex: 1,
      }),
      createParticipant({
        id: "product_photon",
        side: "product",
        templateId: "photon",
        label: "Photon",
        surfaceRowIndex: 0,
      }),
    ];
  }

  if (caseId === "center_neutrino_assembly") {
    const centerNoetherCore = {
      ...createParticipant({
        id: "center_noether_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "pro",
        label: "Pro Noether Core",
        surfaceRowIndex: 0,
      }),
      surfaceColumn: "center-assembly",
    };
    const centerFreeArchitrinos = {
      ...createParticipant({
        id: "center_free_architrinos",
        side: "reactant",
        templateId: "free_architrinos",
        label: "Free Architrinos",
        surfaceRowIndex: 1,
      }),
      surfaceColumn: "center-assembly",
    };
    setParticipantBinarySelectionsBySlotCode(centerFreeArchitrinos, {
      I: "pe",
      M: "pe",
      O: "pe",
    });
    return [
      centerNoetherCore,
      centerFreeArchitrinos,
      createParticipant({
        id: "product_neutrino",
        side: "product",
        templateId: "neutrino",
        polarity: "pro",
        label: "Pro Electron Neutrino",
        surfaceRowIndex: 0,
      }),
    ];
  }

  if (caseId === "higgs_two_photons") {
    return [
      createParticipant({
        id: "reactant_higgs",
        side: "reactant",
        templateId: "noether_quad",
        label: "Noether Quad",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "product_photon_a",
        side: "product",
        templateId: "photon",
        label: "Photon A",
        surfaceRowIndex: 0,
      }),
      createParticipant({
        id: "product_photon_b",
        side: "product",
        templateId: "photon",
        label: "Photon B",
        surfaceRowIndex: 2,
      }),
    ];
  }

  throw new Error(`Unknown runtime case: ${caseId}`);
}

function deriveOutcome(plan) {
  const unresolvedTargetCount = Array.isArray(plan?.unresolvedProducts) ? plan.unresolvedProducts.length : 0;
  const mappingCount = Array.isArray(plan?.selectedMappings) ? plan.selectedMappings.length : 0;
  if (unresolvedTargetCount === 0 && mappingCount > 0) {
    return "exact";
  }
  if (mappingCount > 0) {
    return "partial";
  }
  return "no-solution";
}

function summarizeResultFixture(result) {
  return {
    outcome: result?.summary?.outcome ?? "",
    mappingCount: Array.isArray(result?.mappings) ? result.mappings.length : 0,
    operatorTemplates: (Array.isArray(result?.operators) ? result.operators : []).map((entry) => entry.type),
    unresolvedTargetIds: Array.isArray(result?.residue?.unresolvedTargetIds)
      ? result.residue.unresolvedTargetIds
      : [],
    autoDissociatedParticipantIds: Array.isArray(result?.dissociation?.autoDissociatedParticipantIds)
      ? result.dissociation.autoDissociatedParticipantIds
      : [],
    layoutOperatorSlots: (Array.isArray(result?.placement?.operatorPlacements)
      ? result.placement.operatorPlacements
      : []
    )
      .map((entry) => Number(entry?.slot ?? 0))
      .sort((left, right) => left - right),
  };
}

function summarizeRuntimeCase(caseId) {
  const participants = buildRuntimeParticipants(caseId);
  const solveState = buildSolveState(participants);
  const plan = buildReactionSolvePlan({
    solveState,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    resolveBinaryChoiceInventory,
  });
  const laidOutPlan = applyReactionSolveLayout({
    solveState,
    plan,
  });

  let operatorCount = 0;
  const projection = applyReactionSolvePlan({
    plan: laidOutPlan,
    createOperatorParticipant: (templateId, operatorLaneIndex, options = {}) => {
      operatorCount += 1;
      return {
        id: `operator_${operatorCount}`,
        templateId,
        operatorLaneIndex,
        operatorSlotIndex: options.operatorSlotIndex ?? null,
        isSolveGenerated: options.isSolveGenerated ?? false,
        hierarchy: [{ id: `operator_${operatorCount}_root` }],
      };
    },
    getParticipantRootNode: (participant) => participant?.hierarchy?.[0] ?? null,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    addOrReplaceMapping: () => `mapping_${Math.random()}`,
    markParticipantAutoDissociated: (participant) => {
      if (participant?.isAutoDissociatedComposite) {
        return false;
      }
      participant.isAutoDissociatedComposite = true;
      return true;
    },
  });

  return {
    outcome: deriveOutcome(plan),
    directProductCount: Number(plan?.directProductCount ?? 0),
    compositeProductCount: Number(plan?.compositeProductCount ?? 0),
    associatedProductCount: Number(plan?.associatedProductCount ?? 0),
    partialCompositeProductCount: Number(plan?.partialCompositeProductCount ?? 0),
    mappingCount: Array.isArray(plan?.selectedMappings) ? plan.selectedMappings.length : 0,
    operatorTemplates: (Array.isArray(plan?.participantAdditions) ? plan.participantAdditions : []).map(
      (entry) => entry.templateId
    ),
    unresolvedProductIds: (Array.isArray(plan?.unresolvedProducts) ? plan.unresolvedProducts : []).map(
      (entry) => entry?.participant?.id
    ),
    autoDissociatedParticipantIds: (
      Array.isArray(plan?.dissociatedCompositeParticipants) ? plan.dissociatedCompositeParticipants : []
    )
      .map((participant) => participant?.id)
      .filter(Boolean),
    layoutOperatorSlots: (
      Array.isArray(laidOutPlan?.participantAdditions) ? laidOutPlan.participantAdditions : []
    )
      .map((entry) => Number(entry?.operatorSlotIndex ?? 0))
      .sort((left, right) => left - right),
    projection: {
      addedOperatorCount: Array.isArray(projection?.addedParticipants) ? projection.addedParticipants.length : 0,
      appliedMappingCount: Array.isArray(projection?.appliedMappingIds) ? projection.appliedMappingIds.length : 0,
      markedDissociatedParticipantIds: Array.isArray(projection?.markedDissociatedParticipantIds)
        ? projection.markedDissociatedParticipantIds
        : [],
    },
  };
}

test("solver golden corpus fixtures validate against the versioned schemas", () => {
  const corpus = readJson("content/contracts/examples/solver-corpus/v1/index.json");
  const requestSchema = readJson("src/contracts/solver-request/v1/schema.json");
  const resultSchema = readJson("src/contracts/solver-result/v1/schema.json");

  assert.equal(corpus.schema, "solver-golden-corpus/v1");
  assert.ok(Array.isArray(corpus.cases));
  assert.ok(corpus.cases.length >= 5);

  corpus.cases.forEach((entry) => {
    const request = readJson(entry.requestPath);
    const result = readJson(entry.resultPath);

    assert.deepEqual(validateAgainstSchema(request, requestSchema), [], `${entry.id} request schema mismatch`);
    assert.deepEqual(validateAgainstSchema(result, resultSchema), [], `${entry.id} result schema mismatch`);
    assert.equal(result.request.requestId, request.requestId, `${entry.id} request/result ids drifted`);
  });
});

test("solver golden corpus result fixtures preserve the frozen supported coverage summaries", () => {
  const corpus = readJson("content/contracts/examples/solver-corpus/v1/index.json");

  corpus.cases.forEach((entry) => {
    const result = readJson(entry.resultPath);
    assert.deepEqual(
      summarizeResultFixture(result),
      entry.expectedResult,
      `${entry.id} result fixture summary drifted`
    );
  });
});

test("solver golden corpus runtime summaries still match the frozen JS acceptance bar", () => {
  const corpus = readJson("content/contracts/examples/solver-corpus/v1/index.json");

  corpus.cases.forEach((entry) => {
    assert.deepEqual(
      summarizeRuntimeCase(entry.runtimeCase),
      entry.expectedRuntime,
      `${entry.id} runtime summary drifted`
    );
  });
});
