import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  buildPdgviewStagingContractFromPdgeditDocument,
} from "../src/apps/pdgview/PdgviewPdgeditImportRuntime.js";
import {
  resolvePdgviewViewportFramingState,
} from "../src/runtime/PdgviewViewportFramingRuntime.js";
import { solvePdgsolveRequest } from "../src/apps/pdgsolve/PdgsolveSolveRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
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

  if (
    value !== null &&
    (schema.type === "object" || (Array.isArray(schema.type) && schema.type.includes("object")))
  ) {
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

  if (Array.isArray(value) && (schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array")))) {
    const itemSchema = schema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, `${path}[${index}]`, errors);
      });
    }
  }

  return errors;
}

const stagingOptions = Object.freeze({
  sourceDocumentId: "pdgsolve_free_neutron_beta_exact",
  sourcePath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
  title: "Free neutron beta exact",
});

test("pdgview builds the downstream staging contract from accepted pdgedit output", () => {
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const stagingSchema = readJson("src/contracts/pdgview-staging/v1/schema.json");
  const expectedStaging = readJson("content/contracts/examples/pdgview-staging/pdgsolve_free_neutron_beta_exact.v1.json");
  const builtStaging = buildPdgviewStagingContractFromPdgeditDocument(pdgeditDocument, stagingOptions);

  assert.deepEqual(validateAgainstSchema(builtStaging, stagingSchema), [], "pdgview staging schema drifted");
  assert.deepEqual(builtStaging, expectedStaging);
  assert.equal(builtStaging.source.schema, "pdgedit/v1");
  assert.equal(builtStaging.preview.objectCount, builtStaging.export.sceneDocument.assemblies.length);
  assert.equal(builtStaging.preview.linkCount, builtStaging.export.sceneDocument.transfers.length);
});

test("pdgview staging preserves observer framing from the accepted pdgedit assembly roles", () => {
  const expectedStaging = readJson("content/contracts/examples/pdgview-staging/pdgsolve_free_neutron_beta_exact.v1.json");
  const framingState = resolvePdgviewViewportFramingState(expectedStaging.export.sceneDocument, 4, {
    start: 0,
    end: 24,
  });
  const requiredAssemblyIds = [...framingState.requiredAssemblyIds].sort();
  const expectedRequiredAssemblyIds = [...expectedStaging.observerFraming.requiredAssemblyIds].sort();

  assert.deepEqual(requiredAssemblyIds, expectedRequiredAssemblyIds);
  assert.equal(framingState.framing.preset, "wide");
  assert.equal(expectedStaging.observerFraming.requiredAssemblyIds.includes("unit_lane1_pro_noether_core_1row1"), true);
  assert.equal(
    expectedStaging.draftState.assembliesDraft.some(
      (draft) =>
        draft.name === "Pro Noether Core" &&
        draft.metadata?.source?.objectId === "unit_lane1_pro_noether_core_1.row.1"
    ),
    true
  );
});

test("pdgview staging fixture preserves the published beta data chain while live solving is law-gated", () => {
  const pdgfeedRequest = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.pdgsolve-request.v1.json");
  const pdgsolveResult = solvePdgsolveRequest(pdgfeedRequest);
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const publicationPackage = readJson("content/contracts/examples/pdgsolve-pdgedit-package/free_neutron_beta_exact_durable.v1.json");
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const pdgviewStaging = readJson("content/contracts/examples/pdgview-staging/pdgsolve_free_neutron_beta_exact.v1.json");

  assert.equal(pdgfeedRequest.source.kind, "pdgfeed");
  assert.equal(pdgsolveResult.bestFamilyId, "family.beta.fermion_decomposition_unsupported.v1");
  assert.equal(pdgsolveResult.review.blockingDiagnostics[0].id, "pdgsolve.search.unsupported_law_family");
  assert.equal(publicationPackage.sourceAcceptanceDigest, acceptance.resultDigest);
  assert.deepEqual(publicationPackage.pdgeditDocument, pdgeditDocument);
  assert.equal(pdgviewStaging.source.schema, pdgeditDocument.schema);
  assert.equal(pdgviewStaging.source.documentId, "pdgsolve_free_neutron_beta_exact");
  assert.equal(pdgviewStaging.export.sceneDocument.metadata.sourceContract.upstreamSchema, "pdgedit/v1");
});

test("pdgview pdgedit import runtime stays on the data side of the app boundary", () => {
  const runtimeSource = readText("src/apps/pdgview/PdgviewPdgeditImportRuntime.js");

  assert.doesNotMatch(runtimeSource, /from\s+["']\.\.\/pdgedit\//);
  assert.doesNotMatch(runtimeSource, /from\s+["']\.\.\/pdgsolve\//);
});
