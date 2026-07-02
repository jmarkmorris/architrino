#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const schemaPath = "src/archie-service/contracts/v1/schema.json";
const fixtureRoot = "tests/archie-service/fixtures";

const schema = readJson(schemaPath);
const fixtures = listJsonFiles(path.join(rootDir, fixtureRoot));
const secretPatterns = [
  /sk-[A-Za-z0-9_-]{16,}/,
  /ghp_[A-Za-z0-9_]{16,}/,
  /github_pat_[A-Za-z0-9_]{16,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH |)?PRIVATE KEY-----/,
  /SECRET_VALUE_DO_NOT_USE/,
  /provider_secret_[A-Za-z0-9_-]+/,
];

if (fixtures.length === 0) {
  fail(`No Archie service fixture JSON files found under ${fixtureRoot}`);
}

const failures = [];

for (const fixturePath of fixtures) {
  const relativePath = path.relative(rootDir, fixturePath);
  const raw = fs.readFileSync(fixturePath, "utf8");
  for (const pattern of secretPatterns) {
    if (pattern.test(raw)) {
      failures.push(`${relativePath}: fixture contains a forbidden secret-like token`);
    }
  }

  let value;
  try {
    value = JSON.parse(raw);
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON: ${error.message}`);
    continue;
  }

  const errors = validateAgainstSchema(value, schema);
  for (const error of errors) {
    failures.push(`${relativePath}: ${error}`);
  }
}

if (failures.length > 0) {
  console.error(`Archie service contract validation failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Archie service contract validation passed: ${fixtures.length} fixture(s), 0 error(s)`);

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function validateAgainstSchema(value, currentSchema, rootSchema = currentSchema, pathLabel = "$", errors = []) {
  const resolvedSchema = resolveSchema(currentSchema, rootSchema);
  if (!resolvedSchema || typeof resolvedSchema !== "object") {
    return errors;
  }

  if (Array.isArray(resolvedSchema.oneOf)) {
    const branchErrors = resolvedSchema.oneOf.map((branch) => {
      const nextErrors = [];
      validateAgainstSchema(value, branch, rootSchema, pathLabel, nextErrors);
      return nextErrors;
    });
    const matches = branchErrors.filter((candidateErrors) => candidateErrors.length === 0);
    if (matches.length !== 1) {
      errors.push(`${pathLabel}: expected exactly one schema branch, matched ${matches.length}`);
    }
    return errors;
  }

  if (Array.isArray(resolvedSchema.anyOf)) {
    const branchErrors = resolvedSchema.anyOf.map((branch) => {
      const nextErrors = [];
      validateAgainstSchema(value, branch, rootSchema, pathLabel, nextErrors);
      return nextErrors;
    });
    if (!branchErrors.some((candidateErrors) => candidateErrors.length === 0)) {
      errors.push(`${pathLabel}: value did not match any allowed schema branch`);
    }
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(resolvedSchema, "const") && value !== resolvedSchema.const) {
    errors.push(`${pathLabel}: expected constant ${JSON.stringify(resolvedSchema.const)}`);
    return errors;
  }

  if (Array.isArray(resolvedSchema.enum) && !resolvedSchema.enum.includes(value)) {
    errors.push(
      `${pathLabel}: expected one of ${resolvedSchema.enum.map((item) => JSON.stringify(item)).join(", ")}`
    );
  }

  if (resolvedSchema.type) {
    const allowedTypes = Array.isArray(resolvedSchema.type) ? resolvedSchema.type : [resolvedSchema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${pathLabel}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (typeof resolvedSchema.minLength === "number" && typeof value === "string") {
    if (value.length < resolvedSchema.minLength) {
      errors.push(`${pathLabel}: expected string length >= ${resolvedSchema.minLength}`);
    }
  }

  if (typeof resolvedSchema.minimum === "number" && typeof value === "number") {
    if (value < resolvedSchema.minimum) {
      errors.push(`${pathLabel}: expected number >= ${resolvedSchema.minimum}`);
    }
  }

  if (typeof resolvedSchema.minItems === "number" && Array.isArray(value)) {
    if (value.length < resolvedSchema.minItems) {
      errors.push(`${pathLabel}: expected array length >= ${resolvedSchema.minItems}`);
    }
  }

  if (isObjectSchema(resolvedSchema) && value !== null && typeof value === "object" && !Array.isArray(value)) {
    validateObject(value, resolvedSchema, rootSchema, pathLabel, errors);
  }

  if (isArraySchema(resolvedSchema) && Array.isArray(value) && resolvedSchema.items) {
    value.forEach((item, index) => {
      validateAgainstSchema(item, resolvedSchema.items, rootSchema, `${pathLabel}[${index}]`, errors);
    });
  }

  return errors;
}

function resolveSchema(currentSchema, rootSchema) {
  if (!currentSchema || typeof currentSchema !== "object" || typeof currentSchema.$ref !== "string") {
    return currentSchema;
  }
  const reference = currentSchema.$ref;
  if (!reference.startsWith("#/")) {
    throw new Error(`Unsupported schema ref: ${reference}`);
  }
  return reference
    .slice(2)
    .split("/")
    .reduce((current, key) => current?.[key], rootSchema);
}

function validateObject(value, currentSchema, rootSchema, pathLabel, errors) {
  const properties = currentSchema.properties ?? {};
  const required = currentSchema.required ?? [];
  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      errors.push(`${pathLabel}: missing required property ${key}`);
    }
  }
  if (currentSchema.additionalProperties === false) {
    for (const key of Object.keys(value)) {
      if (!Object.prototype.hasOwnProperty.call(properties, key)) {
        errors.push(`${pathLabel}: unexpected property ${key}`);
      }
    }
  }
  for (const [key, childSchema] of Object.entries(properties)) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      continue;
    }
    validateAgainstSchema(value[key], childSchema, rootSchema, `${pathLabel}.${key}`, errors);
  }
}

function isObjectSchema(currentSchema) {
  if (currentSchema.type === "object") {
    return true;
  }
  return Array.isArray(currentSchema.type) && currentSchema.type.includes("object");
}

function isArraySchema(currentSchema) {
  if (currentSchema.type === "array") {
    return true;
  }
  return Array.isArray(currentSchema.type) && currentSchema.type.includes("array");
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
