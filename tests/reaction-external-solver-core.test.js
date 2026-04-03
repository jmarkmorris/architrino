import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

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
