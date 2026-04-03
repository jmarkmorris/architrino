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
    assert.equal(
      result.mappings.length >= expectedProductCount,
      true,
      `${requestPath} should emit enough mappings to resolve each product`
    );
    assert.equal(result.operators.length >= 1, true, `${requestPath} should use generated associate operators`);
    assert.equal(
      result.operators.some(
        (operator) => operator.origin === "solve-generated" && operator.type === "associate"
      ),
      true,
      `${requestPath} should expose generated associate operators through the contract`
    );
    assert.equal(
      result.steps.some(
        (step) =>
          ["associate", "dissociate"].includes(step.kind) &&
          (String(step.ruleFamily ?? "").startsWith("weak-") ||
            String(step.ruleFamily ?? "").startsWith("dissociate-meson-"))
      ),
      true,
      `${requestPath} should solve through the generic weak or meson provenance path`
    );
    assert.equal(
      result.participants.some(
        (participant) =>
          participant.origin === "solve-generated-intermediate" &&
          participant.side === "center" &&
          ["noether_core", "free_architrinos"].includes(participant.templateId)
      ),
      true,
      `${requestPath} should synthesize solve-generated center provenance participants`
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
  assert.equal(result.operators.length, 2);
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.side === "center" &&
        participant.templateId === "noether_core"
    ),
    true
  );
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.templateId === "free_architrinos"
    ),
    true
  );
});

test("external solve-reaction CLI closes an authored charged-kaon decay request while preserving strange-quark provenance", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-decay"), true);
  assert.equal(result.operators.length, 2);
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.templateId === "down_quark" &&
        String(participant.label ?? "").includes("Strange Quark")
    ),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to pion plus neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_to_pion_pair",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(result.operators.length, 1);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-pion-decay"), true);
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

test("external solve-reaction CLI closes radiative charged-kaon leptonic decay through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_radiative_muon_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
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
        createAuthoredParticipant({
          id: "product_photon_authored",
          side: "product",
          templateId: "photon",
          label: "Photon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-decay-radiative"), true);
});

test("external solve-reaction CLI closes charged kaon to neutral pion plus electron-neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_neutral_pion_electron_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-neutral-pion-electron-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to two positive pions and one negative pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_three_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_a_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_b_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-three-pion-decay"), true);
});

test("external solve-reaction CLI closes charged kaon to two neutral pions plus positron-neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_two_neutral_pions_electron_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_a_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_b_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-neutral-pion-pair-electron-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to positive pion plus three photons through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_pion_three_photon_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_photon_a_authored",
          side: "product",
          templateId: "photon",
          label: "Photon",
        }),
        createAuthoredParticipant({
          id: "product_photon_b_authored",
          side: "product",
          templateId: "photon",
          label: "Photon",
        }),
        createAuthoredParticipant({
          id: "product_photon_c_authored",
          side: "product",
          templateId: "photon",
          label: "Photon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-pion-three-photon-decay"), true);
});

test("external solve-reaction CLI closes charged kaon to negative pion plus anti-muon and positron through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_same_sign_mixed_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-pion-same-sign-mixed-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to pion pair plus positron-neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_pion_pair_electron_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-pion-pair-electron-decay"), true);
});

test("external solve-reaction CLI closes charged kaon to two positive pions plus muon and anti-neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_two_positive_pions_muon_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_a_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_b_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "anti",
          label: "Anti Muon Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-double-positive-pion-muon-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to neutral pion, negative pion, and two positrons through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_neutral_pion_same_sign_electron_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_a_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_b_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
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
  assert.equal(
    result.steps.some(
      (step) => step.ruleFamily === "weak-meson-charged-kaon-neutral-pion-pion-same-sign-electron-pair-decay"
    ),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to muon plus electron neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_muon_electron_neutrino_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-muon-electron-neutrino-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to muon plus anti electron neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_muon_anti_electron_neutrino_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "anti",
          label: "Anti Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-muon-anti-electron-neutrino-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to neutral pion, positron, and anti electron neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_neutral_pion_electron_antineutrino_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "anti",
          label: "Anti Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-neutral-pion-electron-antineutrino-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to muon-neutrino plus electron pair through the meson provenance path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_muon_neutrino_electron_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
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
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Electron",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-decay-electron-pair"), true);
  assert.equal(result.steps.some((step) => step.diagnosticLabels?.includes("meson-constituent-provenance")), true);
});

test("external solve-reaction CLI closes charged kaon to positron-neutrino plus muon pair through the meson provenance path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_electron_neutrino_muon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-electron-decay-muon-pair"), true);
  assert.equal(result.steps.some((step) => step.diagnosticLabels?.includes("meson-constituent-provenance")), true);
});

test("external solve-reaction CLI closes charged kaon to positive pion plus two electron pairs through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_pion_double_electron_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_a_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_a_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Electron",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_b_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_b_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Electron",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-pion-double-electron-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to pion-neutral-pion mixed lepton pair through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_pion_neutral_pion_electron_muon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-pion-neutral-pion-electron-muon-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged kaon to three neutral pions plus positron-neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_kaon_triple_neutral_pion_electron_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k_plus_authored",
          side: "reactant",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({ id: "product_pi_zero_1", side: "product", templateId: "upi0", label: "Neutral Pion" }),
        createAuthoredParticipant({ id: "product_pi_zero_2", side: "product", templateId: "upi0", label: "Neutral Pion" }),
        createAuthoredParticipant({ id: "product_pi_zero_3", side: "product", templateId: "upi0", label: "Neutral Pion" }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-kaon-triple-neutral-pion-electron-decay"),
    true
  );
});

test("external solve-reaction CLI keeps neutral kaon identities distinct", () => {
  const exactRequest = buildReactionSolverRequestDocument({
    requestId: "authored_k0_exact_identity",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k0_authored",
          side: "reactant",
          templateId: "dk0",
          label: "Neutral Kaon (d anti-s)",
        }),
        createAuthoredParticipant({
          id: "product_k0_authored",
          side: "product",
          templateId: "dk0",
          label: "Neutral Kaon (d anti-s)",
        }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });
  const swappedRequest = buildReactionSolverRequestDocument({
    requestId: "authored_k0_identity_swap",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_k0_authored",
          side: "reactant",
          templateId: "dk0",
          label: "Neutral Kaon (d anti-s)",
        }),
        createAuthoredParticipant({
          id: "product_sk0_authored",
          side: "product",
          templateId: "sk0",
          label: "Neutral Kaon (s anti-d)",
        }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });

  const exactResult = runSolveReactionCli(exactRequest);
  const swappedResult = runSolveReactionCli(swappedRequest);

  assert.equal(
    exactResult.steps.some((step) => step.ruleFamily === "exact-identical-participant"),
    true
  );
  assert.equal(swappedResult.summary.outcome, "no-solution");
  assert.equal(swappedResult.summary.exact, false);
});

test("external solve-reaction CLI closes an authored charged-b decay request while preserving bottom-quark provenance", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-muon-decay"), true);
  assert.equal(result.operators.length, 2);
  assert.equal(
    result.participants.some(
      (participant) =>
        participant.origin === "solve-generated-intermediate" &&
        participant.templateId === "down_quark" &&
        String(participant.label ?? "").includes("Bottom Quark")
    ),
    true
  );
});

test("external solve-reaction CLI closes charged B to pion plus neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_to_pion_pair",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(result.operators.length, 1);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-pion-decay"), true);
});

test("external solve-reaction CLI closes charged B to kaon plus neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_to_kaon_pion",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_k_plus_authored",
          side: "product",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(result.operators.length, 1);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-kaon-pion-decay"), true);
});

test("external solve-reaction CLI closes charged B to neutral kaon plus charged pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_to_neutral_kaon_pion",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_dk0_authored",
          side: "product",
          templateId: "dk0",
          label: "Neutral Kaon (d anti-s)",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
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
  assert.equal(result.operators.length, 1);
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-neutral-kaon-pion-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged B to neutral pion plus electron-neutrino through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_neutral_pion_electron_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_neutrino_authored",
          side: "product",
          templateId: "neutrino",
          polarity: "pro",
          label: "Pro Electron Neutrino",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-neutral-pion-electron-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged B to charged pion plus electron pair through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_pion_electron_pair",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Electron",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-pion-electron-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged B to kaon pair plus charged pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_kaon_pair_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_k_plus_authored",
          side: "product",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_k_minus_authored",
          side: "product",
          templateId: "k_minus",
          label: "Negative Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-kaon-pair-pion-decay"), true);
});

test("external solve-reaction CLI closes charged B to anti-kaon plus kaon plus neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_strange_neutral_kaon_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_sk0_authored",
          side: "product",
          templateId: "sk0",
          label: "Neutral Kaon (s anti-d)",
        }),
        createAuthoredParticipant({
          id: "product_k_plus_authored",
          side: "product",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-strange-neutral-kaon-neutral-pion-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged B to two positive pions, one negative pion, and one neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_double_positive_pion_neutral_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_a_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_b_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-double-positive-pion-neutral-pion-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged B to muon-neutrino plus muon pair through the meson provenance path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_muon_neutrino_muon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_a_authored",
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
        createAuthoredParticipant({
          id: "product_anti_muon_b_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-muon-decay-muon-pair"), true);
  assert.equal(result.steps.some((step) => step.diagnosticLabels?.includes("meson-constituent-provenance")), true);
});

test("external solve-reaction CLI closes charged B to kaon-pion-pion plus muon pair through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_kaon_three_body_muon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_k_plus_authored",
          side: "product",
          templateId: "k_plus",
          label: "Positive Kaon",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-kaon-three-body-muon-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged B to proton-antiproton plus charged pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_baryon_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "pro",
          label: "Proton",
        }),
        createAuthoredParticipant({
          id: "product_anti_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "anti",
          label: "Anti Proton",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-baryon-pion-decay"), true);
});

test("external solve-reaction CLI closes charged B to proton-antiproton plus charged kaon through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_baryon_kaon_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "pro",
          label: "Proton",
        }),
        createAuthoredParticipant({
          id: "product_anti_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "anti",
          label: "Anti Proton",
        }),
        createAuthoredParticipant({
          id: "product_k_plus_authored",
          side: "product",
          templateId: "k_plus",
          label: "Positive Kaon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-baryon-kaon-decay"), true);
});

test("external solve-reaction CLI closes charged B to proton, anti-neutron, and neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_charged_b_baryon_antineutron_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_b_plus_authored",
          side: "reactant",
          templateId: "b_plus",
          label: "Positive B Meson",
        }),
        createAuthoredParticipant({
          id: "product_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "pro",
          label: "Proton",
        }),
        createAuthoredParticipant({
          id: "product_anti_neutron_authored",
          side: "product",
          templateId: "neutron",
          polarity: "anti",
          label: "Anti Neutron",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-charged-b-baryon-anti-neutron-pion-decay"),
    true
  );
});

test("external solve-reaction CLI keeps neutral b meson identities distinct", () => {
  const exactRequest = buildReactionSolverRequestDocument({
    requestId: "authored_b0_exact_identity",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_db0_authored",
          side: "product",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });
  const swappedRequest = buildReactionSolverRequestDocument({
    requestId: "authored_b0_identity_swap",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_bb0_authored",
          side: "product",
          templateId: "bB0",
          label: "Neutral B Meson (b anti-d)",
        }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });

  const exactResult = runSolveReactionCli(exactRequest);
  const swappedResult = runSolveReactionCli(swappedRequest);

  assert.equal(
    exactResult.steps.some((step) => step.ruleFamily === "exact-identical-participant"),
    true
  );
  assert.equal(swappedResult.summary.outcome, "no-solution");
  assert.equal(swappedResult.summary.exact, false);
});

test("external solve-reaction CLI closes neutral B to neutral pion plus electron pair through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_pion_electron_pair",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Electron",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-pion-electron-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to radiative electron pair through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_radiative_electron_pair",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_anti_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Electron",
        }),
        createAuthoredParticipant({
          id: "product_pro_electron_authored",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Electron",
        }),
        createAuthoredParticipant({
          id: "product_photon_authored",
          side: "product",
          templateId: "photon",
          label: "Photon",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-electron-pair-decay-radiative"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to two muon pairs through the meson provenance path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_double_muon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_1",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_1",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
        }),
        createAuthoredParticipant({
          id: "product_anti_muon_2",
          side: "product",
          templateId: "electron",
          polarity: "anti",
          label: "Anti Muon",
        }),
        createAuthoredParticipant({
          id: "product_pro_muon_2",
          side: "product",
          templateId: "electron",
          polarity: "pro",
          label: "Pro Muon",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-double-muon-pair-decay"), true);
  assert.equal(result.steps.some((step) => step.diagnosticLabels?.includes("meson-constituent-provenance")), true);
});

test("external solve-reaction CLI closes neutral B to proton-antiproton through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_baryon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "pro",
          label: "Proton",
        }),
        createAuthoredParticipant({
          id: "product_anti_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "anti",
          label: "Anti Proton",
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
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-baryon-pair-decay"), true);
});

test("external solve-reaction CLI closes neutral B to proton-antiproton plus neutral kaon through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_baryon_pair_neutral_kaon_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "pro",
          label: "Proton",
        }),
        createAuthoredParticipant({
          id: "product_anti_proton_authored",
          side: "product",
          templateId: "proton",
          polarity: "anti",
          label: "Anti Proton",
        }),
        createAuthoredParticipant({
          id: "product_dk0_authored",
          side: "product",
          templateId: "dk0",
          label: "Neutral Kaon (d anti-s)",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-baryon-pair-neutral-kaon-decay"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to double proton-antiproton pair through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_double_baryon_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({ id: "product_proton_1", side: "product", templateId: "proton", polarity: "pro", label: "Proton" }),
        createAuthoredParticipant({ id: "product_anti_proton_2", side: "product", templateId: "proton", polarity: "anti", label: "Anti Proton" }),
        createAuthoredParticipant({ id: "product_proton_3", side: "product", templateId: "proton", polarity: "pro", label: "Proton" }),
        createAuthoredParticipant({ id: "product_anti_proton_4", side: "product", templateId: "proton", polarity: "anti", label: "Anti Proton" }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.outcome, "exact");
  assert.equal(result.summary.exact, true);
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-double-baryon-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to neutral kaon plus neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_neutral_kaon_neutral_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_dk0_authored",
          side: "product",
          templateId: "dk0",
          label: "Neutral Kaon (d anti-s)",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-neutral-kaon-neutral-pion-decay"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to pion pair plus two neutral pions through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_pion_pair_neutral_pion_pair_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_a_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_b_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-pion-pair-neutral-pion-pair-decay"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to two positive pions, two negative pions, and one neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_double_positive_double_negative_neutral_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_a_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_plus_b_authored",
          side: "product",
          templateId: "pi_plus",
          label: "Positive Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_a_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_minus_b_authored",
          side: "product",
          templateId: "pi_minus",
          label: "Negative Pion",
        }),
        createAuthoredParticipant({
          id: "product_pi_zero_authored",
          side: "product",
          templateId: "upi0",
          label: "Neutral Pion",
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
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-double-positive-double-negative-neutral-pion-decay"),
    true
  );
});

test("external solve-reaction CLI closes neutral B to three positive pions, three negative pions, and one neutral pion through the generic meson path", () => {
  const request = buildReactionSolverRequestDocument({
    requestId: "authored_neutral_b_triple_pion_pair_neutral_pion_decay",
    snapshot: {
      participants: [
        createAuthoredParticipant({
          id: "reactant_db0_authored",
          side: "reactant",
          templateId: "dB0",
          label: "Neutral B Meson (d anti-b)",
        }),
        createAuthoredParticipant({ id: "product_pi_plus_1", side: "product", templateId: "pi_plus", label: "Positive Pion" }),
        createAuthoredParticipant({ id: "product_pi_plus_2", side: "product", templateId: "pi_plus", label: "Positive Pion" }),
        createAuthoredParticipant({ id: "product_pi_plus_3", side: "product", templateId: "pi_plus", label: "Positive Pion" }),
        createAuthoredParticipant({ id: "product_pi_minus_1", side: "product", templateId: "pi_minus", label: "Negative Pion" }),
        createAuthoredParticipant({ id: "product_pi_minus_2", side: "product", templateId: "pi_minus", label: "Negative Pion" }),
        createAuthoredParticipant({ id: "product_pi_minus_3", side: "product", templateId: "pi_minus", label: "Negative Pion" }),
        createAuthoredParticipant({ id: "product_pi_zero_authored", side: "product", templateId: "upi0", label: "Neutral Pion" }),
      ],
      mappings: [],
    },
    resolveBinaryChoiceInventory: inventoryRuntime.resolveBinaryChoiceInventory,
  });

  const result = runSolveReactionCli(request);

  assert.equal(result.summary.outcome, "exact");
  assert.equal(result.summary.exact, true);
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "weak-meson-neutral-b-triple-pion-pair-neutral-pion-decay"),
    true
  );
});

test("external solve-reaction CLI closes charged pion to positron plus electron neutrino through the generic meson path", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "charged_pion_to_positron_electron_neutrino",
    participants: [
      {
        id: "reactant_pi_plus_1",
        side: "reactant",
        templateId: "pi_plus",
        label: "Positive Pion",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 11,
          positrinoCount: 13,
          flags: ["pdg-id:pi+", "pdg-name:pi+"],
        },
        rootNodeId: "reactant_pi_plus_1/root",
        nodes: [
          {
            id: "reactant_pi_plus_1/root",
            templateId: "pi_plus",
            label: "Positive Pion",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 11,
              positrinoCount: 13,
              flags: ["pdg-id:pi+", "pdg-name:pi+"],
            },
          },
        ],
      },
      {
        id: "product_anti_electron_1",
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
        rootNodeId: "product_anti_electron_1/root",
        nodes: [
          {
            id: "product_anti_electron_1/root",
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
        id: "product_pro_electron_neutrino_2",
        side: "product",
        templateId: "neutrino",
        label: "Pro Electron Neutrino",
        family: "lepton",
        polarity: "pro",
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:1", "neutrino", "pdg-id:nu_e", "pdg-name:nu_e"],
        },
        rootNodeId: "product_pro_electron_neutrino_2/root",
        nodes: [
          {
            id: "product_pro_electron_neutrino_2/root",
            templateId: "neutrino",
            label: "Pro Electron Neutrino",
            family: "lepton",
            polarity: "pro",
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:1", "neutrino", "pdg-id:nu_e", "pdg-name:nu_e"],
            },
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
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "weak-meson-charged-pion-electron-decay"), true);
  assert.equal(result.operators.length, 2);
  assert.equal(
    result.steps.some((step) => step.ruleFamily === "dissociate-meson-constituents"),
    true
  );
  assert.equal(
    result.participants.some((participant) => participant.templateId === "free_architrinos"),
    true
  );
});

test("external solve-reaction CLI closes neutral pion to two photons through the generic meson path", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "neutral_pion_to_two_photons",
    participants: [
      {
        id: "reactant_pi0_1",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 8,
          positrinoCount: 16,
          flags: ["pdg-id:pi0", "pdg-name:pi0"],
        },
        rootNodeId: "reactant_pi0_1/root",
        nodes: [
          {
            id: "reactant_pi0_1/root",
            templateId: "upi0",
            label: "Neutral Pion",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 8,
              positrinoCount: 16,
              flags: ["pdg-id:pi0", "pdg-name:pi0"],
            },
          },
        ],
      },
      ...["product_gamma_1", "product_gamma_2"].map((id) => ({
        id,
        side: "product",
        templateId: "photon",
        label: "Photon",
        family: "boson",
        isComposite: true,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["pdg-id:gamma", "pdg-name:gamma"],
        },
        rootNodeId: `${id}/root`,
        nodes: [
          {
            id: `${id}/root`,
            templateId: "photon",
            label: "Photon",
            family: "boson",
            isComposite: true,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["pdg-id:gamma", "pdg-name:gamma"],
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
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "meson-neutral-pion-two-photon-decay"), true);
  assert.equal(result.operators.length, 1);
});

test("external solve-reaction CLI closes neutral pion to electron-positron through the generic meson path", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "neutral_pion_to_electron_pair",
    participants: [
      {
        id: "reactant_pi0_1",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 8,
          positrinoCount: 16,
          flags: ["pdg-id:pi0", "pdg-name:pi0"],
        },
        rootNodeId: "reactant_pi0_1/root",
        nodes: [
          {
            id: "reactant_pi0_1/root",
            templateId: "upi0",
            label: "Neutral Pion",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 8,
              positrinoCount: 16,
              flags: ["pdg-id:pi0", "pdg-name:pi0"],
            },
          },
        ],
      },
      {
        id: "product_positron_1",
        side: "product",
        templateId: "electron",
        label: "Positron",
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
            label: "Positron",
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
        id: "product_electron_2",
        side: "product",
        templateId: "electron",
        label: "Electron",
        family: "lepton",
        polarity: "pro",
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:1", "charged-lepton", "pdg-id:e-", "pdg-name:e-"],
        },
        rootNodeId: "product_electron_2/root",
        nodes: [
          {
            id: "product_electron_2/root",
            templateId: "electron",
            label: "Electron",
            family: "lepton",
            polarity: "pro",
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:1", "charged-lepton", "pdg-id:e-", "pdg-name:e-"],
            },
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
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "meson-neutral-pion-electron-pair-decay"), true);
  assert.equal(result.operators.length, 2);
  assert.equal(
    result.participants.some((participant) => participant.templateId === "free_architrinos"),
    true
  );
});

test("external solve-reaction CLI closes neutral pion to electron-neutrino pair through the generic meson path", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "neutral_pion_to_electron_neutrino_pair",
    participants: [
      {
        id: "reactant_pi0_1",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 8,
          positrinoCount: 16,
          flags: ["pdg-id:pi0", "pdg-name:pi0"],
        },
        rootNodeId: "reactant_pi0_1/root",
        nodes: [
          {
            id: "reactant_pi0_1/root",
            templateId: "upi0",
            label: "Neutral Pion",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 8,
              positrinoCount: 16,
              flags: ["pdg-id:pi0", "pdg-name:pi0"],
            },
          },
        ],
      },
      {
        id: "product_nu_e_1",
        side: "product",
        templateId: "neutrino",
        label: "Electron Neutrino",
        family: "lepton",
        polarity: "pro",
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:1", "neutrino", "pdg-id:nu_e", "pdg-name:nu_e"],
        },
        rootNodeId: "product_nu_e_1/root",
        nodes: [
          {
            id: "product_nu_e_1/root",
            templateId: "neutrino",
            label: "Electron Neutrino",
            family: "lepton",
            polarity: "pro",
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:1", "neutrino", "pdg-id:nu_e", "pdg-name:nu_e"],
            },
          },
        ],
      },
      {
        id: "product_anti_nu_e_2",
        side: "product",
        templateId: "neutrino",
        label: "Anti Electron Neutrino",
        family: "lepton",
        polarity: "anti",
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:1", "neutrino", "pdg-id:nubar_e", "pdg-name:anti-nu_e"],
        },
        rootNodeId: "product_anti_nu_e_2/root",
        nodes: [
          {
            id: "product_anti_nu_e_2/root",
            templateId: "neutrino",
            label: "Anti Electron Neutrino",
            family: "lepton",
            polarity: "anti",
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:1", "neutrino", "pdg-id:nubar_e", "pdg-name:anti-nu_e"],
            },
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
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "meson-neutral-pion-neutrino-pair-decay"), true);
  assert.equal(result.operators.length, 2);
  assert.equal(
    result.participants.some((participant) => participant.templateId === "free_architrinos"),
    true
  );
});

test("external solve-reaction CLI materializes a Noether Pair supplement for neutral pion double-Dalitz closure", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "neutral_pion_double_dalitz",
    participants: [
      {
        id: "reactant_pi0_1",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 8,
          positrinoCount: 16,
          flags: ["pdg-id:pi0", "pdg-name:pi0"],
        },
        rootNodeId: "reactant_pi0_1/root",
        nodes: [
          {
            id: "reactant_pi0_1/root",
            templateId: "upi0",
            label: "Neutral Pion",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 8,
              positrinoCount: 16,
              flags: ["pdg-id:pi0", "pdg-name:pi0"],
            },
          },
        ],
      },
      ...[
        ["product_positron_1", "anti", "e+"],
        ["product_positron_2", "anti", "e+"],
        ["product_electron_3", "pro", "e-"],
        ["product_electron_4", "pro", "e-"],
      ].map(([id, polarity, pdgId]) => ({
        id,
        side: "product",
        templateId: "electron",
        label: pdgId === "e+" ? "Positron" : "Electron",
        family: "lepton",
        polarity,
        isComposite: false,
        inventory: {
          electrinoCount: 6,
          positrinoCount: 6,
          flags: ["generation:1", "charged-lepton", `pdg-id:${pdgId}`, `pdg-name:${pdgId}`],
        },
        rootNodeId: `${id}/root`,
        nodes: [
          {
            id: `${id}/root`,
            templateId: "electron",
            label: pdgId === "e+" ? "Positron" : "Electron",
            family: "lepton",
            polarity,
            isComposite: false,
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
              flags: ["generation:1", "charged-lepton", `pdg-id:${pdgId}`, `pdg-name:${pdgId}`],
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
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "meson-neutral-pion-double-dalitz-decay"), true);
  assert.equal(result.operators.length, 4);
  assert.equal(
    result.participants.some((participant) => participant.templateId === "noether_pair"),
    true
  );
  assert.equal(
    result.operators.some((operator) =>
      operator.inputs.some((input) => String(input.participantId ?? "").includes("_noether_pair_"))
    ),
    true
  );
});

test("external solve-reaction CLI treats upi0 and dpi0 as solver-equivalent neutral-pion forms", () => {
  const request = {
    schema: "solver-request/v1",
    requestId: "neutral_pion_equivalence",
    participants: [
      {
        id: "reactant_upi0",
        side: "reactant",
        templateId: "upi0",
        label: "Neutral Pion (u anti-u)",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 8,
          positrinoCount: 16,
        },
        rootNodeId: "reactant_upi0/root",
        nodes: [
          {
            id: "reactant_upi0/root",
            templateId: "upi0",
            label: "Neutral Pion (u anti-u)",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 8,
              positrinoCount: 16,
            },
          },
        ],
      },
      {
        id: "product_dpi0",
        side: "product",
        templateId: "dpi0",
        label: "Neutral Pion (d anti-d)",
        family: "meson",
        isComposite: true,
        inventory: {
          electrinoCount: 14,
          positrinoCount: 10,
        },
        rootNodeId: "product_dpi0/root",
        nodes: [
          {
            id: "product_dpi0/root",
            templateId: "dpi0",
            label: "Neutral Pion (d anti-d)",
            family: "meson",
            isComposite: true,
            inventory: {
              electrinoCount: 14,
              positrinoCount: 10,
            },
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
  assert.equal(result.summary.unresolvedTargetCount, 0);
  assert.equal(result.steps.some((step) => step.ruleFamily === "exact-identical-participant"), true);
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
        templateId: "noether_quad",
        label: "Noether Quad",
        family: "boson",
        isComposite: true,
        inventory: { electrinoCount: 12, positrinoCount: 12 },
        rootNodeId: "reactant_higgs_manual_open_root",
        nodes: [
          {
            id: "reactant_higgs_manual_open_root",
            templateId: "noether_quad",
            label: "Noether Quad",
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
