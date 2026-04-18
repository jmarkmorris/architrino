import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  buildPdgviewStagingContractFromPdgeditDocument,
} from "../src/apps/pdgview/PdgviewPdgeditImportRuntime.js";
import { normalizePdgeditTemplateCatalog } from "../src/apps/pdgedit/PdgeditTemplateCatalogRuntime.js";
import { buildPdgeditDocumentFromPublicationGraph } from "../src/runtime/PdgeditPublicationGraphRuntime.js";
import {
  resolvePdgviewViewportFramingState,
} from "../src/runtime/PdgviewViewportFramingRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function readText(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

function createSyntheticPassThruPdgeditDocument() {
  return {
    schema: "pdgedit/v1",
    assemblies: [
      {
        id: "reactant_up_quark",
        type: "pro-up-quark-assembly",
        x: 2,
        y: 0,
        title: "Input Up Quark",
        role: "reactant",
        tiles: ["pro-up-quark", "binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"],
      },
      {
        id: "intermediate_up_quark",
        type: "pro-up-quark-assembly",
        x: 9,
        y: 0,
        title: "Intermediate Up Quark",
        role: "intermediate",
        tiles: ["pro-up-quark", "binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"],
      },
      {
        id: "product_up_quark",
        type: "pro-up-quark-assembly",
        x: 16,
        y: 0,
        title: "Output Up Quark",
        role: "product",
        tiles: ["pro-up-quark", "binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"],
      },
    ],
    operators: [
      {
        id: "pass_thru_stage_1",
        type: "pass-thru",
        x: 7,
        y: 0,
        title: "Pass Thru",
        positrinoCount: 8,
        electrinoCount: 4,
      },
      {
        id: "pass_thru_stage_2",
        type: "pass-thru",
        x: 14,
        y: 0,
        title: "Pass Thru",
        positrinoCount: 8,
        electrinoCount: 4,
      },
    ],
    links: [
      { id: "edge_1", endpointA: "reactant_up_quark", endpointB: "pass_thru_stage_1" },
      { id: "edge_2", endpointA: "pass_thru_stage_1", endpointB: "intermediate_up_quark" },
      { id: "edge_3", endpointA: "intermediate_up_quark", endpointB: "pass_thru_stage_2" },
      { id: "edge_4", endpointA: "pass_thru_stage_2", endpointB: "product_up_quark" },
    ],
    compositeLabels: [],
  };
}

function createAssemblyPresentationResolver() {
  const templateCatalog = normalizePdgeditTemplateCatalog(
    readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json")
  );
  const typeByRecipeId = new Map([["pro_up_quark_I", "pro-up-quark-assembly"]]);

  return (recipeId) => {
    const type = typeByRecipeId.get(recipeId);
    const template = type ? templateCatalog.assemblyTemplateByType.get(type) : null;
    if (!template) {
      return null;
    }
    return {
      type: template.type,
      title: template.title,
      tiles: template.tiles,
    };
  };
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
  sourceDocumentId: "synthetic_pass_thru_chain",
  sourcePath: "content/contracts/generated/pdgedit/synthetic_pass_thru_chain.v1.json",
  title: "Synthetic pass thru chain",
});

test("pdgview builds the downstream staging contract from accepted pdgedit output", () => {
  const pdgeditDocument = createSyntheticPassThruPdgeditDocument();
  const stagingSchema = readJson("src/contracts/pdgview-staging/v1/schema.json");
  const builtStaging = buildPdgviewStagingContractFromPdgeditDocument(pdgeditDocument, stagingOptions);

  assert.deepEqual(validateAgainstSchema(builtStaging, stagingSchema), [], "pdgview staging schema drifted");
  assert.equal(builtStaging.source.schema, "pdgedit/v1");
  assert.equal(builtStaging.source.documentId, "synthetic_pass_thru_chain");
  assert.equal(builtStaging.source.title, "Synthetic pass thru chain");
  assert.equal(
    builtStaging.source.sourcePath,
    "content/contracts/generated/pdgedit/synthetic_pass_thru_chain.v1.json"
  );
  assert.equal(builtStaging.preview.objectCount, builtStaging.export.sceneDocument.assemblies.length);
  assert.equal(builtStaging.preview.linkCount, builtStaging.export.sceneDocument.transfers.length);
  assert.equal(builtStaging.preview.objectCount, 5);
  assert.equal(builtStaging.preview.linkCount, 4);
});

test("pdgview staging preserves observer framing from the accepted pdgedit assembly roles", () => {
  const builtStaging = buildPdgviewStagingContractFromPdgeditDocument(
    createSyntheticPassThruPdgeditDocument(),
    stagingOptions
  );
  const framingState = resolvePdgviewViewportFramingState(builtStaging.export.sceneDocument, 4, {
    start: 0,
    end: 24,
  });
  const requiredAssemblyIds = [...framingState.requiredAssemblyIds].sort();
  const expectedRequiredAssemblyIds = [...builtStaging.observerFraming.requiredAssemblyIds].sort();

  assert.deepEqual(requiredAssemblyIds, expectedRequiredAssemblyIds);
  assert.equal(framingState.framing.preset, "wide");
  assert.equal(builtStaging.observerFraming.requiredAssemblyIds.includes("reactant_up_quark"), true);
  assert.equal(builtStaging.observerFraming.requiredAssemblyIds.includes("product_up_quark"), true);
  assert.equal(builtStaging.observerFraming.requiredAssemblyIds.includes("intermediate_up_quark"), false);
  assert.equal(
    builtStaging.draftState.assembliesDraft.some(
      (draft) =>
        draft.name === "Output Up Quark" &&
        draft.metadata?.source?.objectId === "product_up_quark"
    ),
    true
  );
});

test("pdgview staging still accepts pdgedit documents derived from publication graphs", () => {
  const publicationGraph = {
    schema: "pdgsolve-publication-graph/v2",
    units: [
      {
        id: "reactant_up_quark",
        kind: "assembly",
        stage: "reactantAssemblies",
        recipeId: "pro_up_quark_I",
        occurrenceKey: "reactant_up_quark",
        title: "Input Up Quark",
        electrinoCount: 4,
        positrinoCount: 8,
      },
      {
        id: "pass_thru_stage_1",
        kind: "operator",
        stage: "reactantSideOperators",
        recipeId: "pass-thru",
        occurrenceKey: "pass_thru_stage_1",
        title: "Pass Thru",
        lawId: null,
      },
      {
        id: "intermediate_up_quark",
        kind: "assembly",
        stage: "intermediateAssemblies",
        recipeId: "pro_up_quark_I",
        occurrenceKey: "intermediate_up_quark",
        title: "Intermediate Up Quark",
        electrinoCount: 4,
        positrinoCount: 8,
      },
      {
        id: "pass_thru_stage_2",
        kind: "operator",
        stage: "productSideOperators",
        recipeId: "pass-thru",
        occurrenceKey: "pass_thru_stage_2",
        title: "Pass Thru",
        lawId: null,
      },
      {
        id: "product_up_quark",
        kind: "assembly",
        stage: "productAssemblies",
        recipeId: "pro_up_quark_I",
        occurrenceKey: "product_up_quark",
        title: "Output Up Quark",
        electrinoCount: 4,
        positrinoCount: 8,
      },
    ],
    edges: [
      { id: "edge_1", fromUnitId: "reactant_up_quark", fromPortId: "output", toUnitId: "pass_thru_stage_1", toPortId: "input_1" },
      { id: "edge_2", fromUnitId: "pass_thru_stage_1", fromPortId: "output_1", toUnitId: "intermediate_up_quark", toPortId: "input" },
      { id: "edge_3", fromUnitId: "intermediate_up_quark", fromPortId: "output", toUnitId: "pass_thru_stage_2", toPortId: "input_1" },
      { id: "edge_4", fromUnitId: "pass_thru_stage_2", fromPortId: "output_1", toUnitId: "product_up_quark", toPortId: "input" },
    ],
  };
  const stagingSchema = readJson("src/contracts/pdgview-staging/v1/schema.json");
  const pdgeditDocument = buildPdgeditDocumentFromPublicationGraph(publicationGraph, {
    resolveAssemblyPresentation: createAssemblyPresentationResolver(),
  });
  const builtStaging = buildPdgviewStagingContractFromPdgeditDocument(pdgeditDocument, stagingOptions);

  assert.deepEqual(validateAgainstSchema(builtStaging, stagingSchema), []);
  assert.equal(builtStaging.source.schema, "pdgedit/v1");
  assert.equal(builtStaging.preview.objectCount, 5);
  assert.equal(builtStaging.preview.linkCount, 4);
});

test("pdgview pdgedit import runtime stays on the data side of the app boundary", () => {
  const runtimeSource = readText("src/apps/pdgview/PdgviewPdgeditImportRuntime.js");

  assert.doesNotMatch(runtimeSource, /from\s+["']\.\.\/pdgedit\//);
  assert.doesNotMatch(runtimeSource, /from\s+["']\.\.\/pdgsolve\//);
});
