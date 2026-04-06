import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionSolverRequestDocument } from "../src/apps/reaction/ReactionSolverRequestExportRuntime.js";
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
    binarySelections: {},
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

function createOperatorParticipant({
  id,
  templateId = "associate",
  label = "Associate",
  operatorLaneIndex = 1,
  operatorSlotIndex = 0,
  isSolveGenerated = false,
}) {
  return {
    id,
    side: "operator",
    templateId,
    label,
    operatorLaneIndex,
    operatorSlotIndex,
    surfaceRowIndex: operatorSlotIndex,
    isSolveGenerated,
    hierarchy: [
      {
        id: `${id}_root`,
        label,
        renderMode: "operator-tile",
        children: [],
      },
    ],
  };
}

function buildNodeKey(participant, node) {
  return `${participant.id}::${node.id}`;
}

test("solver request exporter emits an authored-only solver-request document", () => {
  const centerCore = createParticipant({
    id: "center_core_authored",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Pro Noether Core",
  });
  centerCore.surfaceColumn = "center-assembly";
  const reactantNeutron = createParticipant({
    id: "reactant_neutron_manual",
    side: "reactant",
    templateId: "neutron",
    label: "Neutron",
  });
  reactantNeutron.isDissociatedComposite = true;
  const reactantHiggsAuto = createParticipant({
    id: "reactant_higgs_auto",
    side: "reactant",
    templateId: "noether_quad",
    label: "Noether Quad",
  });
  reactantHiggsAuto.isAutoDissociatedComposite = true;
  const productElectron = createParticipant({
    id: "product_electron_authored",
    side: "product",
    templateId: "electron",
    polarity: "pro",
    label: "Electron",
  });
  const authoredOperator = createOperatorParticipant({
    id: "operator_associate_authored",
    operatorLaneIndex: 1,
    operatorSlotIndex: 2,
  });
  const solveGeneratedOperator = createOperatorParticipant({
    id: "operator_associate_solve_generated",
    operatorLaneIndex: 1,
    operatorSlotIndex: 3,
    isSolveGenerated: true,
  });
  const snapshot = {
    participants: [
      centerCore,
      reactantNeutron,
      reactantHiggsAuto,
      productElectron,
      authoredOperator,
      solveGeneratedOperator,
    ],
    mappings: [
      {
        id: "mapping_authored_1",
        sourceKey: buildNodeKey(reactantNeutron, reactantNeutron.hierarchy[0]),
        sourceRole: "reactant",
        targetKey: buildNodeKey(authoredOperator, authoredOperator.hierarchy[0]),
        targetRole: "operator-input",
      },
      {
        id: "mapping_authored_2",
        sourceKey: buildNodeKey(authoredOperator, authoredOperator.hierarchy[0]),
        sourceRole: "operator-output",
        targetKey: buildNodeKey(productElectron, productElectron.hierarchy[0]),
        targetRole: "product",
      },
      {
        id: "mapping_solve_generated_ignored",
        sourceKey: buildNodeKey(solveGeneratedOperator, solveGeneratedOperator.hierarchy[0]),
        sourceRole: "operator-output",
        targetKey: buildNodeKey(productElectron, productElectron.hierarchy[0]),
        targetRole: "product",
      },
    ],
  };

  const request = buildReactionSolverRequestDocument({
    requestId: "reaction_authored_request",
    origin: {
      sourceKind: "reaction",
      sourceDocumentId: "reaction:solver-ui",
      title: "Authored Reaction Solve",
    },
    snapshot,
    resolveBinaryChoiceInventory,
  });
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const errors = validateAgainstSchema(request, schema);

  assert.deepEqual(errors, []);
  assert.equal(request.participants.length, 4);
  assert.deepEqual(
    request.participants
      .filter((participant) => participant.side === "center")
      .map((participant) => participant.centerUsage),
    ["optional"]
  );
  assert.deepEqual(request.manualOperators.map((operator) => operator.id), [
    "operator_associate_authored",
  ]);
  assert.equal(request.manualOperators[0].inputs.length, 1);
  assert.equal(request.manualOperators[0].outputs.length, 1);
  assert.deepEqual(
    request.manualMappings.map((mapping) => mapping.id),
    ["mapping_authored_1", "mapping_authored_2"]
  );
  assert(request.manualMappings.every((mapping) => mapping.kind === "operator-path"));
  assert(request.manualMappings.every((mapping) => mapping.viaOperatorId === "operator_associate_authored"));
  assert.deepEqual(request.dissociation.manuallyOpenedParticipantIds, ["reactant_neutron_manual"]);
  assert.deepEqual(request.dissociation.manuallyOpenedNodeIds, []);
});

test("solver request exporter derives canonical ledgers and fragment mappings from live structure state", () => {
  const centerFreeArchitrinos = setParticipantBinarySelectionsBySlotCode(
    createParticipant({
      id: "center_free_architrinos_ledger",
      side: "reactant",
      templateId: "free_architrinos",
      label: "Free Architrinos",
    }),
    { I: "ee", M: "ee", O: "ee" }
  );
  centerFreeArchitrinos.surfaceColumn = "center-assembly";
  const reactantNeutron = createParticipant({
    id: "reactant_neutron_fragment",
    side: "reactant",
    templateId: "neutron",
    label: "Neutron",
  });
  reactantNeutron.isDissociatedComposite = true;
  const productDownQuark = createParticipant({
    id: "product_down_quark_fragment",
    side: "product",
    templateId: "down_quark",
    polarity: "pro",
    label: "Down Quark",
  });
  const neutronChildNode = reactantNeutron.hierarchy[0]?.children?.find(
    (childNode) => childNode?.templateId === "down_quark"
  );
  assert.ok(neutronChildNode);

  const request = buildReactionSolverRequestDocument({
    requestId: "reaction_fragment_request",
    snapshot: {
      participants: [centerFreeArchitrinos, reactantNeutron, productDownQuark],
      mappings: [
        {
          id: "mapping_fragment_1",
          sourceKey: buildNodeKey(reactantNeutron, neutronChildNode),
          sourceRole: "reactant",
          targetKey: buildNodeKey(productDownQuark, productDownQuark.hierarchy[0]),
          targetRole: "product",
        },
      ],
    },
    resolveBinaryChoiceInventory,
  });
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const errors = validateAgainstSchema(request, schema);
  const freeArchitrinoParticipant = request.participants.find(
    (participant) => participant.id === "center_free_architrinos_ledger"
  );

  assert.deepEqual(errors, []);
  assert.deepEqual(freeArchitrinoParticipant.inventory, {
    electrinoCount: 6,
    positrinoCount: 0,
  });
  assert.equal(
    request.manualMappings.find((mapping) => mapping.id === "mapping_fragment_1")?.kind,
    "fragment"
  );
  assert.deepEqual(
    request.manualMappings.find((mapping) => mapping.id === "mapping_fragment_1")?.conservedLedger,
    {
      electrinoCount: 7,
      positrinoCount: 5,
    }
  );
});

test("solver request exporter preserves authored muon-family flags and root polarity metadata", () => {
  const antiMuon = createParticipant({
    id: "product_anti_muon_authored",
    side: "product",
    templateId: "electron",
    polarity: "anti",
    label: "Anti Muon",
  });
  const muonNeutrino = createParticipant({
    id: "product_muon_neutrino_authored",
    side: "product",
    templateId: "neutrino",
    polarity: "pro",
    label: "Pro Muon Neutrino",
  });

  const request = buildReactionSolverRequestDocument({
    requestId: "reaction_muon_family_flags",
    snapshot: {
      participants: [antiMuon, muonNeutrino],
      mappings: [],
    },
    resolveBinaryChoiceInventory,
  });
  const antiMuonRecord = request.participants.find(
    (participant) => participant.id === "product_anti_muon_authored"
  );
  const muonNeutrinoRecord = request.participants.find(
    (participant) => participant.id === "product_muon_neutrino_authored"
  );

  assert.equal(antiMuonRecord?.polarity, "anti");
  assert.equal(antiMuonRecord?.nodes[0]?.polarity, "anti");
  assert.equal(antiMuonRecord?.nodes[0]?.label, "Anti Muon");
  assert.deepEqual(antiMuonRecord?.inventory?.flags, ["generation:2", "charged-lepton"]);
  assert.deepEqual(antiMuonRecord?.nodes[0]?.inventory?.flags, ["generation:2", "charged-lepton"]);

  assert.equal(muonNeutrinoRecord?.polarity, "pro");
  assert.equal(muonNeutrinoRecord?.nodes[0]?.polarity, "pro");
  assert.equal(muonNeutrinoRecord?.nodes[0]?.label, "Pro Muon Neutrino");
  assert.deepEqual(muonNeutrinoRecord?.inventory?.flags, ["generation:2", "neutrino"]);
  assert.deepEqual(muonNeutrinoRecord?.nodes[0]?.inventory?.flags, ["generation:2", "neutrino"]);
});
