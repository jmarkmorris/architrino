import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { buildReactionSolverRequestDocument } from "../src/apps/reaction/ReactionSolverRequestExportRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";
import { createReactionBinaryInventoryRuntime } from "../src/apps/reaction/ReactionBinaryInventoryRuntime.js";
import { createReactionBinarySelectionRuntime } from "../src/apps/reaction/ReactionBinarySelectionRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function runSolveReactionCli(requestOrPath) {
  const args = ["scripts/solve-reaction.mjs"];
  const options = {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  };
  if (typeof requestOrPath === "string") {
    args.push(requestOrPath);
  } else {
    options.input = JSON.stringify(requestOrPath);
  }
  return JSON.parse(execFileSync(process.execPath, args, options));
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
const selectionRuntime = createReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});
const inventoryRuntime = createReactionBinaryInventoryRuntime({
  getBinaryChoiceInventory: selectionRuntime.getBinaryChoiceInventory,
  getResolvedBinarySelectionMap: selectionRuntime.getResolvedBinarySelectionMap,
  resolveBinarySelectorGroup: selectionRuntime.resolveBinarySelectorGroup,
});

function createAuthoredParticipant({ id, side, templateId, polarity = "", label }) {
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
  participant.binarySelections = selectionRuntime.getInitialParticipantBinarySelections(participant);
  return participant;
}

function summarizeResult(result) {
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

test("external solve-reaction CLI preserves the supported golden corpus summaries", () => {
  const corpus = readJson("content/contracts/examples/solver-corpus/v1/index.json");
  const resultSchema = readJson("src/contracts/solver-result/v1/schema.json");

  corpus.cases.forEach((entry) => {
    const result = runSolveReactionCli(entry.requestPath);
    assert.deepEqual(validateAgainstSchema(result, resultSchema), [], `${entry.id} result schema mismatch`);
    assert.deepEqual(summarizeResult(result), entry.expectedResult, `${entry.id} external solver summary drifted`);
  });
});

test("external solve-reaction CLI closes the supported PDG weak-channel request set exactly", () => {
  const resultSchema = readJson("src/contracts/solver-result/v1/schema.json");
  const requestPaths = [
    "content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/muon_decay.live-pdg.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/radiative_free_neutron_beta_decay.live-pdg.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/radiative_muon_decay.live-pdg.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/muon_decay_with_electron_positron_pair.live-pdg.solver-request.v1.json",
    "content/contracts/examples/pdg/v1/generated/muon_to_electron_photon.live-pdg.solver-request.v1.json",
  ];

  requestPaths.forEach((requestPath) => {
    const request = readJson(requestPath);
    const expectedProductCount = request.participants.filter((participant) => participant.side === "product").length;
    const result = runSolveReactionCli(requestPath);
    assert.deepEqual(validateAgainstSchema(result, resultSchema), [], `${requestPath} result schema mismatch`);
    assert.equal(result.summary.outcome, "exact", `${requestPath} should close exactly`);
    assert.equal(result.summary.exact, true, `${requestPath} should report exact closure`);
    assert.equal(result.summary.unresolvedTargetCount, 0, `${requestPath} should have no unresolved targets`);
    assert.deepEqual(result.residue.unresolvedTargetIds, [], `${requestPath} should have no unresolved residue`);
    assert.equal(result.mappings.length, expectedProductCount + 1, `${requestPath} should add one weak-channel input mapping plus one mapping per product`);
    assert.equal(result.operators.length, 1, `${requestPath} should use one generated weak-channel operator`);
    assert.equal(
      result.operators.some(
        (operator) => operator.origin === "solve-generated" && operator.type === "associate"
      ),
      true,
      `${requestPath} should expose the generic weak operator through the contract`
    );
    assert.equal(
      result.steps.some(
        (step) =>
          step.kind === "associate" &&
          String(step.ruleFamily ?? "").startsWith("weak-")
      ),
      true,
      `${requestPath} should solve through a generic weak-channel rule family`
    );
    assert.equal(
      result.participants.some(
        (participant) =>
          participant.origin === "solve-generated-intermediate" &&
          participant.side === "center" &&
          participant.templateId === "noether_core"
      ),
      true,
      `${requestPath} should synthesize an implicit weak center`
    );
  });
});

test("external solve-reaction CLI closes generic proton radiative weak channels through the same operator-plus-center path", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "proton_to_positron_photon",
    participants: [
      {
        id: "reactant_proton_1",
        side: "reactant",
        templateId: "proton",
        label: "Proton",
        family: "baryon",
        polarity: "pro",
        isComposite: true,
        inventory: { electrinoCount: 6, positrinoCount: 6, flags: ["pdg-id:p", "pdg-name:p"] },
        rootNodeId: "reactant_proton_1/root",
        nodes: [
          {
            id: "reactant_proton_1/root",
            templateId: "proton",
            label: "Proton",
            family: "baryon",
            polarity: "pro",
            isComposite: true,
            inventory: { electrinoCount: 6, positrinoCount: 6, flags: ["pdg-id:p", "pdg-name:p"] },
          },
        ],
      },
      {
        id: "product_positron_1",
        side: "product",
        templateId: "electron",
        label: "Anti Electron",
        family: "lepton",
        polarity: "anti",
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:1", "charged-lepton", "pdg-id:e+", "pdg-name:e+"],
        },
        rootNodeId: "product_positron_1/root",
        nodes: [
          {
            id: "product_positron_1/root",
            templateId: "electron",
            label: "Anti Electron",
            family: "lepton",
            polarity: "anti",
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:1", "charged-lepton", "pdg-id:e+", "pdg-name:e+"],
            },
          },
        ],
      },
      {
        id: "product_photon_1",
        side: "product",
        templateId: "photon",
        label: "Photon",
        family: "boson",
        isComposite: true,
        inventory: { electrinoCount: 6, positrinoCount: 6, flags: ["pdg-id:gamma", "pdg-name:gamma"] },
        rootNodeId: "product_photon_1/root",
        nodes: [
          {
            id: "product_photon_1/root",
            templateId: "photon",
            label: "Photon",
            family: "boson",
            isComposite: true,
            inventory: { electrinoCount: 6, positrinoCount: 6, flags: ["pdg-id:gamma", "pdg-name:gamma"] },
          },
        ],
      },
    ],
    manualOperators: [],
    manualMappings: [],
    dissociation: {
      manuallyOpenedParticipantIds: [],
      manuallyOpenedNodeIds: [],
      preserveManualState: true,
    },
    policy: {
      recruitmentMode: "forbid",
      lateBosonCollapseMode: "allow-exact",
      weakChannelMode: "v1-core-provenance-only",
      carryThroughMode: "exact-first",
    },
  };

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.outcome, "exact");
  assert.equal(result.summary.exact, true);
  assert.equal(result.operators.length, 1);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-baryon-radiative-conversion"), true);
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.side === "center" &&
        participant.templateId === "noether_core"
    ),
    true
  );
});

test("external solve-reaction CLI closes an authored charged-pion decay request exported from Reaction structures", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_pi_plus_authored",
          side: "reactant",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Muon Neutrino",
        }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.outcome, "exact");
  assert.equal(result.summary.exact, true);
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-pion-decay"), true);
  assert.equal(result.operators.length, 1);
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.side === "center" &&
        participant.templateId === "noether_core"
    ),
    true
  );
});

test("external solve-reaction CLI closes generic muon trilepton weak channels through the same operator-plus-center path", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "muon_to_three_electrons",
    participants: [
      {
        id: "reactant_muon_1",
        side: "reactant",
        templateId: "electron",
        label: "Pro Muon",
        family: "lepton",
        polarity: "pro",
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:2", "charged-lepton", "pdg-id:mu-", "pdg-name:mu-"],
        },
        rootNodeId: "reactant_muon_1/root",
        nodes: [
          {
            id: "reactant_muon_1/root",
            templateId: "electron",
            label: "Pro Muon",
            family: "lepton",
            polarity: "pro",
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:2", "charged-lepton", "pdg-id:mu-", "pdg-name:mu-"],
            },
          },
        ],
      },
      ...[
        ["product_electron_a", "Pro Electron", "pro"],
        ["product_positron_b", "Anti Electron", "anti"],
        ["product_electron_c", "Pro Electron", "pro"],
      ].map(([id, label, polarity]) => ({
        id,
        side: "product",
        templateId: "electron",
        label,
        family: "lepton",
        polarity,
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: [
            "generation:1",
            "charged-lepton",
            polarity === "anti" ? "pdg-id:e+" : "pdg-id:e-",
            polarity === "anti" ? "pdg-name:e+" : "pdg-name:e-",
          ],
        },
        rootNodeId: `${id}/root`,
        nodes: [
          {
            id: `${id}/root`,
            templateId: "electron",
            label,
            family: "lepton",
            polarity,
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: [
                "generation:1",
                "charged-lepton",
                polarity === "anti" ? "pdg-id:e+" : "pdg-id:e-",
                polarity === "anti" ? "pdg-name:e+" : "pdg-name:e-",
              ],
            },
          },
        ],
      })),
    ],
    manualOperators: [],
    manualMappings: [],
    dissociation: {
      manuallyOpenedParticipantIds: [],
      manuallyOpenedNodeIds: [],
      preserveManualState: true,
    },
    policy: {
      recruitmentMode: "forbid",
      lateBosonCollapseMode: "allow-exact",
      weakChannelMode: "v1-core-provenance-only",
      carryThroughMode: "exact-first",
    },
  };

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.outcome, "exact");
  assert.equal(result.summary.exact, true);
  assert.equal(result.operators.length, 1);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-lepton-trilepton-conversion"), true);
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.side === "center" &&
        participant.templateId === "noether_core"
    ),
    true
  );
});

test("external solve-reaction CLI preserves authored manual operators, mappings, and placement hints", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "manual_passthrough",
    participants: [
      {
        id: "reactant_core",
        side: "reactant",
        templateId: "noether_core",
        label: "Pro Noether core",
        family: "noether-core",
        polarity: "pro",
        isComposite: false,
        inventory: { electrinoCount: 3, positrinoCount: 3 },
        rootNodeId: "reactant_core_root",
        nodes: [
          {
            id: "reactant_core_root",
            templateId: "noether_core",
            label: "Pro Noether core",
            family: "noether-core",
            polarity: "pro",
            isComposite: false,
            inventory: { electrinoCount: 3, positrinoCount: 3 },
          },
        ],
      },
      {
        id: "product_core",
        side: "product",
        templateId: "noether_core",
        label: "Pro Noether core",
        family: "noether-core",
        polarity: "pro",
        isComposite: false,
        inventory: { electrinoCount: 3, positrinoCount: 3 },
        rootNodeId: "product_core_root",
        nodes: [
          {
            id: "product_core_root",
            templateId: "noether_core",
            label: "Pro Noether core",
            family: "noether-core",
            polarity: "pro",
            isComposite: false,
            inventory: { electrinoCount: 3, positrinoCount: 3 },
          },
        ],
      },
    ],
    manualOperators: [
      {
        id: "operator_associate_authored",
        type: "associate",
        label: "Associate",
        inputs: [
          {
            participantId: "reactant_core",
            anchorId: "reactant_core_root",
            role: "reactant",
          },
        ],
        outputs: [
          {
            participantId: "product_core",
            anchorId: "product_core_root",
            role: "product",
          },
        ],
        placement: {
          lane: 1,
          row: 5,
          slot: 5,
        },
      },
    ],
    manualMappings: [
      {
        id: "mapping_manual_in",
        kind: "operator-path",
        from: {
          participantId: "reactant_core",
          anchorId: "reactant_core_root",
          role: "reactant",
        },
        to: {
          participantId: "operator_associate_authored",
          anchorId: "root",
          role: "operator-input",
        },
        viaOperatorId: "operator_associate_authored",
        provenanceMode: "manual-authored",
        conservedLedger: {
          electrinoCount: 3,
          positrinoCount: 3,
        },
      },
      {
        id: "mapping_manual_out",
        kind: "operator-path",
        from: {
          participantId: "operator_associate_authored",
          anchorId: "root",
          role: "operator-output",
        },
        to: {
          participantId: "product_core",
          anchorId: "product_core_root",
          role: "product",
        },
        viaOperatorId: "operator_associate_authored",
        provenanceMode: "manual-authored",
        conservedLedger: {
          electrinoCount: 3,
          positrinoCount: 3,
        },
      },
    ],
    dissociation: {
      manuallyOpenedParticipantIds: [],
      manuallyOpenedNodeIds: [],
      preserveManualState: true,
    },
    policy: {
      recruitmentMode: "forbid",
      lateBosonCollapseMode: "allow-exact",
      weakChannelMode: "v1-core-provenance-only",
      carryThroughMode: "exact-first",
    },
  };

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.exact, true);
  assert.equal(result.operators.some((operator) => operator.id === "operator_associate_authored" && operator.origin === "manual"), true);
  assert.equal(result.mappings.some((mapping) => mapping.id === "mapping_manual_in" && mapping.provenanceMode === "operator-mediated"), true);
  assert.equal(result.mappings.some((mapping) => mapping.id === "mapping_manual_out" && mapping.provenanceMode === "operator-mediated"), true);
  assert.equal(
    result.placement.operatorPlacements.some(
      (placement) =>
        placement.operatorId === "operator_associate_authored" &&
        placement.lane === 1 &&
        placement.row === 5 &&
        placement.slot === 5
    ),
    true
  );
});

test("external solve-reaction CLI counts authored manual mappings toward resolved products and residue accounting", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "manual_resolution_only",
    participants: [
      {
        id: "reactant_neutron_manual",
        side: "reactant",
        templateId: "neutron",
        label: "Neutron",
        family: "baryon",
        polarity: "pro",
        isComposite: true,
        inventory: { electrinoCount: 6, positrinoCount: 6 },
        rootNodeId: "reactant_neutron_manual_root",
        nodes: [
          {
            id: "reactant_neutron_manual_root",
            templateId: "neutron",
            label: "Neutron",
            family: "baryon",
            polarity: "pro",
            isComposite: true,
            inventory: { electrinoCount: 6, positrinoCount: 6 },
          },
        ],
      },
      {
        id: "product_proton_manual",
        side: "product",
        templateId: "proton",
        label: "Proton",
        family: "baryon",
        polarity: "pro",
        isComposite: true,
        inventory: { electrinoCount: 6, positrinoCount: 6 },
        rootNodeId: "product_proton_manual_root",
        nodes: [
          {
            id: "product_proton_manual_root",
            templateId: "proton",
            label: "Proton",
            family: "baryon",
            polarity: "pro",
            isComposite: true,
            inventory: { electrinoCount: 6, positrinoCount: 6 },
          },
        ],
      },
    ],
    manualOperators: [],
    manualMappings: [
      {
        id: "mapping_manual_direct",
        kind: "direct",
        from: {
          participantId: "reactant_neutron_manual",
          anchorId: "reactant_neutron_manual_root",
          role: "reactant",
        },
        to: {
          participantId: "product_proton_manual",
          anchorId: "product_proton_manual_root",
          role: "product",
        },
        provenanceMode: "manual-authored",
        conservedLedger: {
          electrinoCount: 6,
          positrinoCount: 6,
        },
      },
    ],
    dissociation: {
      manuallyOpenedParticipantIds: [],
      manuallyOpenedNodeIds: [],
      preserveManualState: true,
    },
    policy: {
      recruitmentMode: "forbid",
      lateBosonCollapseMode: "allow-exact",
      weakChannelMode: "v1-core-provenance-only",
      carryThroughMode: "exact-first",
    },
  };

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.outcome, "exact");
  assert.equal(result.summary.exact, true);
  assert.deepEqual(result.residue.unresolvedTargetIds, []);
  assert.deepEqual(result.residue.unusedSourceIds, []);
  assert.equal(result.mappings.some((mapping) => mapping.id === "mapping_manual_direct"), true);
});

test("external solve-reaction CLI preserves manual dissociation separately from auto dissociation", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "manual_dissociation_passthrough",
    participants: [
      {
        id: "reactant_higgs_manual_open",
        side: "reactant",
        templateId: "higgs_cluster",
        label: "Higgs Cluster",
        family: "boson",
        isComposite: true,
        inventory: { electrinoCount: 12, positrinoCount: 12 },
        rootNodeId: "reactant_higgs_manual_open_root",
        nodes: [
          {
            id: "reactant_higgs_manual_open_root",
            templateId: "higgs_cluster",
            label: "Higgs Cluster",
            family: "boson",
            isComposite: true,
            inventory: { electrinoCount: 12, positrinoCount: 12 },
          },
          {
            id: "reactant_higgs_manual_open_root/core_pro_1",
            parentId: "reactant_higgs_manual_open_root",
            templateId: "noether_core",
            label: "Pro Noether core",
            family: "noether-core",
            polarity: "pro",
            isComposite: false,
            inventory: { electrinoCount: 3, positrinoCount: 3 },
          },
        ],
      },
      {
        id: "product_downstream",
        side: "product",
        templateId: "down_quark",
        label: "Down Quark",
        family: "quark",
        polarity: "pro",
        isComposite: false,
        inventory: { electrinoCount: 2, positrinoCount: 2 },
        rootNodeId: "product_downstream_root",
        nodes: [
          {
            id: "product_downstream_root",
            templateId: "down_quark",
            label: "Down Quark",
            family: "quark",
            polarity: "pro",
            isComposite: false,
            inventory: { electrinoCount: 2, positrinoCount: 2 },
          },
        ],
      },
    ],
    manualOperators: [],
    manualMappings: [],
    dissociation: {
      manuallyOpenedParticipantIds: ["reactant_higgs_manual_open"],
      manuallyOpenedNodeIds: [],
      preserveManualState: true,
    },
    policy: {
      recruitmentMode: "forbid",
      lateBosonCollapseMode: "allow-exact",
      weakChannelMode: "v1-core-provenance-only",
      carryThroughMode: "exact-first",
    },
  };

  const result = runSolveReactionCli(request);

  assert.deepEqual(result.dissociation.openedParticipantIds, ["reactant_higgs_manual_open"]);
  assert.deepEqual(result.dissociation.autoDissociatedParticipantIds, []);
});
