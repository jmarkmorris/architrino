import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

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

test("reaction flow example matches the versioned reaction-flow schema", () => {
  const schema = readJson("src/contracts/reaction-flow/v1/schema.json");
  const example = readJson("content/contracts/examples/reaction-flow/free_neutron_beta.v1.json");
  const errors = validateAgainstSchema(example, schema);

  assert.deepEqual(errors, []);
});

test("composer import result example matches the versioned import-result schema", () => {
  const schema = readJson("src/contracts/composer-import-result/v1/schema.json");
  const example = readJson("content/contracts/examples/composer-import-result/free_neutron_beta_import.v1.json");
  const errors = validateAgainstSchema(example, schema);

  assert.deepEqual(errors, []);
});

test("composer import result fixture consumes the reaction-flow contract explicitly", () => {
  const reactionFlow = readJson("content/contracts/examples/reaction-flow/free_neutron_beta.v1.json");
  const importResult = readJson(
    "content/contracts/examples/composer-import-result/free_neutron_beta_import.v1.json"
  );

  assert.equal(importResult.sourceSchema, reactionFlow.schema);
  assert.equal(importResult.importedReactionId, reactionFlow.reactionId);
  assert.equal(importResult.sceneId, reactionFlow.hints.suggestedSceneId);
});

test("solver request example matches the versioned solver-request schema", () => {
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const example = readJson("content/contracts/examples/solver-request/carry_through_neutron.v1.json");
  const errors = validateAgainstSchema(example, schema);

  assert.deepEqual(errors, []);
});

test("pdg-seeded solver request example matches the versioned solver-request schema", () => {
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const example = readJson("content/contracts/examples/solver-request/pdg_seeded_center_neutrino.v1.json");
  const errors = validateAgainstSchema(example, schema);

  assert.deepEqual(errors, []);
  assert.equal(example.origin.sourceKind, "pdg-ingest");
  assert.equal(example.manualOperators.length, 0);
  assert.equal(example.manualMappings.length, 0);
});

test("solver request contract rejects raw PDG payload leakage inside normalized participants", () => {
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const example = readJson("content/contracts/examples/solver-request/pdg_seeded_center_neutrino.v1.json");
  example.participants[0].pdg = {
    pdgid: "S043",
    description: "Raw PDG object should stay outside normalized solver participants",
  };
  const errors = validateAgainstSchema(example, schema);

  assert.ok(errors.some((error) => error.includes("$.participants[0]: unexpected property pdg")));
});

test("solver result example matches the versioned solver-result schema", () => {
  const schema = readJson("src/contracts/solver-result/v1/schema.json");
  const example = readJson("content/contracts/examples/solver-result/carry_through_neutron_result.v1.json");
  const errors = validateAgainstSchema(example, schema);

  assert.deepEqual(errors, []);
});

test("solver result fixture points back to the solver request contract explicitly", () => {
  const request = readJson("content/contracts/examples/solver-request/carry_through_neutron.v1.json");
  const result = readJson("content/contracts/examples/solver-result/carry_through_neutron_result.v1.json");

  assert.equal(result.request.schema, request.schema);
  assert.equal(result.request.requestId, request.requestId);
});
