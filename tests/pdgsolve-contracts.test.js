import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function isTypeMatch(value, expectedType) {
  if (expectedType === "null") {
    return value === null;
  }
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

function resolveSchema(schema, rootSchema) {
  if (!schema || typeof schema !== "object" || typeof schema.$ref !== "string") {
    return schema;
  }
  const reference = schema.$ref;
  if (!reference.startsWith("#/")) {
    throw new Error(`Unsupported schema ref: ${reference}`);
  }
  return reference
    .slice(2)
    .split("/")
    .reduce((current, key) => current?.[key], rootSchema);
}

function validateAgainstSchema(value, schema, rootSchema = schema, path = "$", errors = []) {
  const resolvedSchema = resolveSchema(schema, rootSchema);
  if (!resolvedSchema || typeof resolvedSchema !== "object") {
    return errors;
  }

  if (Array.isArray(resolvedSchema.anyOf)) {
    const branchErrors = resolvedSchema.anyOf.map((branch) => {
      const nextErrors = [];
      validateAgainstSchema(value, branch, rootSchema, path, nextErrors);
      return nextErrors;
    });
    if (!branchErrors.some((candidateErrors) => candidateErrors.length === 0)) {
      errors.push(`${path}: value did not match any allowed schema branch`);
    }
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(resolvedSchema, "const") && value !== resolvedSchema.const) {
    errors.push(`${path}: expected constant ${JSON.stringify(resolvedSchema.const)}`);
    return errors;
  }

  if (Array.isArray(resolvedSchema.enum) && !resolvedSchema.enum.includes(value)) {
    errors.push(
      `${path}: expected one of ${resolvedSchema.enum.map((item) => JSON.stringify(item)).join(", ")}`
    );
  }

  if (resolvedSchema.type) {
    const allowedTypes = Array.isArray(resolvedSchema.type) ? resolvedSchema.type : [resolvedSchema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${path}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (
    typeof resolvedSchema.minLength === "number" &&
    typeof value === "string" &&
    value.length < resolvedSchema.minLength
  ) {
    errors.push(`${path}: expected string length >= ${resolvedSchema.minLength}`);
  }

  if (typeof resolvedSchema.minimum === "number" && typeof value === "number" && value < resolvedSchema.minimum) {
    errors.push(`${path}: expected number >= ${resolvedSchema.minimum}`);
  }

  if (
    typeof resolvedSchema.minItems === "number" &&
    Array.isArray(value) &&
    value.length < resolvedSchema.minItems
  ) {
    errors.push(`${path}: expected array length >= ${resolvedSchema.minItems}`);
  }

  if (
    typeof resolvedSchema.maxItems === "number" &&
    Array.isArray(value) &&
    value.length > resolvedSchema.maxItems
  ) {
    errors.push(`${path}: expected array length <= ${resolvedSchema.maxItems}`);
  }

  if (
    value !== null &&
    (resolvedSchema.type === "object" ||
      (Array.isArray(resolvedSchema.type) && resolvedSchema.type.includes("object")))
  ) {
    const properties = resolvedSchema.properties ?? {};
    const required = resolvedSchema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${path}: missing required property ${key}`);
      }
    }
    if (resolvedSchema.additionalProperties === false) {
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
      validateAgainstSchema(value[key], childSchema, rootSchema, `${path}.${key}`, errors);
    }
  }

  if (
    Array.isArray(value) &&
    (resolvedSchema.type === "array" ||
      (Array.isArray(resolvedSchema.type) && resolvedSchema.type.includes("array")))
  ) {
    const itemSchema = resolvedSchema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, rootSchema, `${path}[${index}]`, errors);
      });
    }
  }

  return errors;
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256Digest(value) {
  return `sha256:${crypto.createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}

test("pdgsolve vertical-slice example contracts match their schemas", () => {
  const requestSchema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const resultSchema = readJson("src/contracts/pdgsolve-result/v1/schema.json");
  const acceptanceSchema = readJson("src/contracts/pdgsolve-acceptance/v1/schema.json");
  const packageSchema = readJson("src/contracts/pdgsolve-pdgedit-package/v1/schema.json");

  const request = readJson("content/contracts/examples/pdgsolve-request/v1/free_neutron_beta_decay.v1.json");
  const result = readJson("content/contracts/examples/pdgsolve-result/v1/free_neutron_beta_exact.v1.json");
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/v1/free_neutron_beta_exact.v1.json");
  const pdgeditPackage = readJson("content/contracts/examples/pdgsolve-pdgedit-package/v1/free_neutron_beta_exact.v1.json");

  assert.deepEqual(validateAgainstSchema(request, requestSchema), [], "request schema drifted");
  assert.deepEqual(validateAgainstSchema(result, resultSchema), [], "result schema drifted");
  assert.deepEqual(validateAgainstSchema(acceptance, acceptanceSchema), [], "acceptance schema drifted");
  assert.deepEqual(validateAgainstSchema(pdgeditPackage, packageSchema), [], "pdgedit package schema drifted");
});

test("pdgsolve vertical-slice example relationships stay locked", () => {
  const request = readJson("content/contracts/examples/pdgsolve-request/v1/free_neutron_beta_decay.v1.json");
  const result = readJson("content/contracts/examples/pdgsolve-result/v1/free_neutron_beta_exact.v1.json");
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/v1/free_neutron_beta_exact.v1.json");
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const pdgeditPackage = readJson("content/contracts/examples/pdgsolve-pdgedit-package/v1/free_neutron_beta_exact.v1.json");
  const corpusIndex = readJson("content/contracts/examples/pdgsolve-corpus/v1/index.json");

  assert.equal(request.requestId, "free_neutron_beta_decay");
  assert.equal(result.problemId, "pdgsolve_problem_free_neutron_beta_exact");
  assert.equal(result.bestFamilyId, "family.beta.exact.v1");
  assert.equal(acceptance.problemId, result.problemId);
  assert.equal(acceptance.familyId, result.bestFamilyId);
  assert.equal(acceptance.resultDigest, sha256Digest(result));
  assert.equal(pdgeditPackage.documentId, "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1");
  assert.equal(pdgeditPackage.documentTitle, "Free neutron beta exact");
  assert.deepEqual(pdgeditPackage.pdgeditDocument, pdgeditDocument);
  assert.equal(corpusIndex.cases.some((record) => record.caseId === "free_neutron_beta_exact"), true);
});
