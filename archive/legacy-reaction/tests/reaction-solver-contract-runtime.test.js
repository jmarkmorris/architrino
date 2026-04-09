import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

import {
  solveReactionSnapshot,
  solveReactionSolverRequest,
} from "../src/apps/reaction/ReactionSolverContractRuntime.js";
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

test("contract solver runtime solves a versioned solver request into a versioned solver result", () => {
  const request = readJson("content/contracts/examples/solver-request/associate_photon.v1.json");
  const schema = readJson("src/contracts/solver-result/v1/schema.json");
  const { result, planDescription, unresolvedTargetCount } = solveReactionSolverRequest(request, {
    resolveBinaryChoiceInventory,
  });
  const errors = validateAgainstSchema(result, schema);

  assert.deepEqual(errors, []);
  assert.equal(result.request.requestId, "associate_photon");
  assert.equal(result.summary.exact, true);
  assert.equal(result.operators.length, 1);
  assert.equal(result.steps.some((step) => step.kind === "associate"), true);
  assert.equal(planDescription.includes("associated product"), true);
  assert.equal(unresolvedTargetCount, 0);
});

test("contract solver runtime uses the external solver path by default in node", () => {
  const request = readJson("content/contracts/examples/solver-request/associate_photon.v1.json");
  const schema = readJson("src/contracts/solver-result/v1/schema.json");
  const externalSolve = solveReactionSolverRequest(request);

  assert.equal(externalSolve.execution?.mode, "external");
  assert.deepEqual(validateAgainstSchema(externalSolve.result, schema), []);
  assert.equal(externalSolve.result.summary.exact, true);
  assert.equal(externalSolve.result.operators.length, 1);
  assert.equal(externalSolve.result.steps.some((step) => step.kind === "associate"), true);
});

test("contract solver runtime refuses solve requests when external solving is disabled", () => {
  const request = readJson("content/contracts/examples/solver-request/associate_photon.v1.json");

  assert.throws(
    () =>
      solveReactionSolverRequest(request, {
        useExternalSolver: false,
        resolveBinaryChoiceInventory,
      }),
    /External Reaction solver is unavailable in this runtime/
  );
});

test("contract solver runtime can round-trip a live snapshot through request and result contracts", () => {
  const reactantProCore = createParticipant({
    id: "reactant_pro_core_roundtrip",
    side: "reactant",
    templateId: "noether_core",
    polarity: "pro",
    label: "Pro Noether core",
  });
  const reactantAntiCore = createParticipant({
    id: "reactant_anti_core_roundtrip",
    side: "reactant",
    templateId: "noether_core",
    polarity: "anti",
    label: "Anti Noether core",
  });
  const productPhoton = createParticipant({
    id: "product_photon_roundtrip",
    side: "product",
    templateId: "photon",
    label: "Photon",
  });
  const requestSchema = readJson("src/contracts/solver-request/v1/schema.json");
  const resultSchema = readJson("src/contracts/solver-result/v1/schema.json");
  const solution = solveReactionSnapshot(
    {
      participants: [reactantProCore, reactantAntiCore, productPhoton],
      mappings: [],
    },
    {
      requestId: "roundtrip_photon",
      resolveBinaryChoiceInventory,
    }
  );

  assert.deepEqual(validateAgainstSchema(solution.request, requestSchema), []);
  assert.deepEqual(validateAgainstSchema(solution.result, resultSchema), []);
  assert.equal(solution.request.requestId, "roundtrip_photon");
  assert.equal(solution.result.request.requestId, "roundtrip_photon");
  assert.equal(solution.result.summary.exact, true);
  assert.equal(solution.execution?.mode, "external");
});

test("contract solver runtime preserves request provenance metadata inside the solver result", () => {
  const request = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json");
  const { result } = solveReactionSolverRequest(request);

  assert.deepEqual(result.request.origin, request.origin);
  assert.deepEqual(result.request.upstreamContext, request.upstreamContext);
});

test("solve-reaction script emits solver-result json from a solver-request fixture", () => {
  const stdout = execFileSync(
    process.execPath,
    [
      "scripts/solve-reaction.mjs",
      "content/contracts/examples/solver-request/associate_photon.v1.json",
    ],
    {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
    }
  );
  const result = JSON.parse(stdout);
  const schema = readJson("src/contracts/solver-result/v1/schema.json");

  assert.deepEqual(validateAgainstSchema(result, schema), []);
  assert.equal(result.request.requestId, "associate_photon");
  assert.equal(result.summary.exact, true);
});
