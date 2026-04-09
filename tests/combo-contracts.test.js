import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { normalizeXyzzyTileCatalog } from "../src/apps/xyzzy/XyzzyTileCatalogRuntime.js";
import { normalizeXyzzyReviewGroupCatalog } from "../src/apps/xyzzy/XyzzyReviewGroupCatalogRuntime.js";
import { validateXyzzyDocumentTilePayload } from "../src/apps/xyzzy/XyzzyDocumentRuntime.js";
import { buildComboXyzzyPackage, buildXyzzyDocumentFromComboPublicationGraph } from "../src/apps/combo/ComboXyzzyPublicationRuntime.js";
import { normalizeComboXyzzyRecipeCatalog } from "../src/apps/combo/ComboXyzzyRecipeCatalogRuntime.js";

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
  if (expectedType === "null") {
    return value === null;
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

  if (typeof schema.minItems === "number" && Array.isArray(value) && value.length < schema.minItems) {
    errors.push(`${path}: expected array length >= ${schema.minItems}`);
  }

  if (typeof schema.maxItems === "number" && Array.isArray(value) && value.length > schema.maxItems) {
    errors.push(`${path}: expected array length <= ${schema.maxItems}`);
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

const comboCorpus = readJson("content/contracts/examples/combo-corpus/v1/index.json");
const comboRequestSchema = readJson("src/contracts/combo-request/v1/schema.json");
const comboResultSchema = readJson("src/contracts/combo-result/v1/schema.json");
const comboAcceptanceSchema = readJson("src/contracts/combo-acceptance/v1/schema.json");
const comboPublicationGraphSchema = readJson("src/contracts/combo-publication-graph/v1/schema.json");
const comboXyzzyPackageSchema = readJson("src/contracts/combo-xyzzy-package/v1/schema.json");
const xyzzySchema = readJson("src/contracts/xyzzy/v1/schema.json");
const comboXyzzyRecipeCatalog = normalizeComboXyzzyRecipeCatalog(
  readJson("src/apps/combo/combo-xyzzy-recipes.v1.json")
);

test("combo request fixtures match the versioned combo-request schema", () => {
  comboCorpus.cases.forEach((entry) => {
    const request = readJson(entry.requestPath);
    const errors = validateAgainstSchema(request, comboRequestSchema);

    assert.deepEqual(errors, [], `${entry.requestPath} schema mismatch`);
    assert.equal(request.schema, "combo-request/v1");
    assert.equal(request.requestId, entry.id);
    assert.equal(request.source.kind, "fixture");
  });
});

test("combo result fixtures match the versioned combo-result schema and corpus expectations", () => {
  comboCorpus.cases.forEach((entry) => {
    const result = readJson(entry.resultPath);
    const errors = validateAgainstSchema(result, comboResultSchema);
    const bestFamily = result.optionFamilies.find((family) => family.familyId === result.bestFamilyId);

    assert.deepEqual(errors, [], `${entry.resultPath} schema mismatch`);
    assert.ok(bestFamily, `${entry.id} best family missing`);
    assert.equal(result.searchStatus, entry.expectedSummary.searchStatus, `${entry.id} search status drifted`);
    assert.equal(bestFamily.kind, entry.expectedSummary.bestFamilyKind, `${entry.id} best family kind drifted`);
    assert.equal(
      bestFamily.publicationReady,
      entry.expectedSummary.publicationReady,
      `${entry.id} publication gate drifted`
    );
    assert.deepEqual(
      result.diagnostics.map((diagnostic) => diagnostic.id),
      entry.expectedSummary.diagnosticIds,
      `${entry.id} top-level diagnostic drifted`
    );
  });
});

test("combo result fixtures preserve the four concrete v1 expectations frozen in combo.md", () => {
  const exactResult = readJson("content/contracts/examples/combo-result/free_neutron_beta_exact_result.v1.json");
  const supportDisallowedResult = readJson(
    "content/contracts/examples/combo-result/free_neutron_beta_support_disallowed_result.v1.json"
  );
  const primitiveImbalanceResult = readJson(
    "content/contracts/examples/combo-result/primitive_imbalance_neutron_to_proton_result.v1.json"
  );
  const passThruResult = readJson("content/contracts/examples/combo-result/pass_thru_neutron_result.v1.json");

  assert.equal(exactResult.optionFamilies[0].publicationReady, true);
  assert.equal(exactResult.optionFamilies[0].score.auxiliaryBurden, 0);

  assert.equal(supportDisallowedResult.searchStatus, "unsupported");
  assert.equal(
    supportDisallowedResult.diagnostics.some(
      (diagnostic) => diagnostic.id === "combo.normalization.support_required.noether_pair"
    ),
    true
  );

  assert.deepEqual(primitiveImbalanceResult.diagnostics[0].payload, {
    augmentation: {
      left: "none",
      right: "none",
    },
    deltaE: 3,
    deltaP: -3,
  });

  assert.equal(passThruResult.optionFamilies[0].score.nonIdentityOperatorCount, 0);
  assert.equal(passThruResult.optionFamilies[0].score.dissociationCount, 0);
  assert.equal(passThruResult.optionFamilies[0].score.ambiguityPenalty, 0);
});

test("combo beta acceptance, publication graph, package, and xyzzy document stay aligned", () => {
  const result = readJson("content/contracts/examples/combo-result/free_neutron_beta_exact_result.v1.json");
  const graph = readJson("content/contracts/examples/combo-publication-graph/free_neutron_beta_exact.v1.json");
  const acceptance = readJson("content/contracts/examples/combo-acceptance/free_neutron_beta_exact.v1.json");
  const packageFixture = readJson(
    "content/contracts/examples/combo-xyzzy-package/free_neutron_beta_exact_durable.v1.json"
  );
  const xyzzyDocument = readJson("content/contracts/examples/xyzzy/combo_free_neutron_beta_exact.v1.json");

  assert.deepEqual(validateAgainstSchema(graph, comboPublicationGraphSchema), [], "publication graph schema drifted");
  assert.deepEqual(validateAgainstSchema(acceptance, comboAcceptanceSchema), [], "acceptance schema drifted");
  assert.deepEqual(validateAgainstSchema(packageFixture, comboXyzzyPackageSchema), [], "package schema drifted");
  assert.deepEqual(validateAgainstSchema(xyzzyDocument, xyzzySchema), [], "xyzzy document schema drifted");

  assert.deepEqual(result.optionFamilies[0].canonicalCandidate.solveGraph, graph);
  assert.deepEqual(acceptance.lockedSolveGraph, graph);
  assert.equal(packageFixture.sourceAcceptanceDigest, acceptance.resultDigest);
  assert.equal(
    packageFixture.manifestEntry.documentPath,
    "content/contracts/examples/xyzzy/combo_free_neutron_beta_exact.v1.json"
  );
  assert.equal(
    fs.existsSync(new URL("../content/contracts/examples/xyzzy/combo_free_neutron_beta_exact.v1.json", import.meta.url)),
    true
  );
  assert.deepEqual(packageFixture.xyzzyDocument, xyzzyDocument);
});

test("combo beta xyzzy publication regression keeps the fixed band layout and valid tile payloads", () => {
  const xyzzyDocument = readJson("content/contracts/examples/xyzzy/combo_free_neutron_beta_exact.v1.json");
  const catalog = normalizeXyzzyTileCatalog(readJson("src/apps/xyzzy/xyzzy-tiles.json"));
  const errors = validateXyzzyDocumentTilePayload(xyzzyDocument, catalog);
  const reactantRows = xyzzyDocument.assemblies.filter((assembly) => assembly.role === "reactant");
  const intermediateRows = xyzzyDocument.assemblies.filter((assembly) => assembly.role === "intermediate");
  const productRows = xyzzyDocument.assemblies.filter((assembly) => assembly.role === "product");
  const dissociateOperators = xyzzyDocument.operators.filter((operator) => operator.type === "dissociate");
  const passThruOperators = xyzzyDocument.operators.filter((operator) => operator.type === "pass-thru");

  assert.deepEqual(errors, [], "xyzzy tile payload drifted");
  assert.equal(reactantRows.every((assembly) => assembly.x === 2), true);
  assert.equal(intermediateRows.every((assembly) => assembly.x === 9), true);
  assert.equal(productRows.every((assembly) => assembly.x === 16), true);
  assert.equal(dissociateOperators.every((operator) => operator.x === 7), true);
  assert.equal(passThruOperators.every((operator) => operator.x === 14), true);
  assert.deepEqual(
    reactantRows.map((assembly) => assembly.y),
    [0, 1, 2, 3, 4],
    "reactant rows should pack contiguously"
  );
  assert.deepEqual(
    intermediateRows.map((assembly) => assembly.y),
    [0, 1, 2, 3, 4],
    "intermediate rows should pack contiguously"
  );
  assert.deepEqual(
    productRows.map((assembly) => assembly.y),
    [0, 1, 2, 3, 4],
    "product rows should pack contiguously"
  );
  assert.deepEqual(
    xyzzyDocument.compositeLabels.map((label) => [label.side, label.text, label.rowStart, label.rowEnd]),
    [
      ["left", "Neutron", 0, 2],
      ["left", "Noether Pair", 3, 4],
      ["right", "Proton", 0, 2],
      ["right", "Pro Electron", 3, 3],
      ["right", "Anti Electron Neutrino", 4, 4],
    ]
  );
});

test("combo xyzzy recipe catalog admits 2h and 4h as explicit publication recipes without collapsing them into support assemblies", () => {
  const twoHRecipe = comboXyzzyRecipeCatalog.assemblyRecipeById.get("combo.xyzzy.2h.v1");
  const fourHRecipe = comboXyzzyRecipeCatalog.assemblyRecipeById.get("combo.xyzzy.4h.v1");
  const noetherPairRecipe = comboXyzzyRecipeCatalog.assemblyRecipeById.get("combo.xyzzy.noether_pair.v1");

  assert.ok(twoHRecipe);
  assert.ok(fourHRecipe);
  assert.ok(noetherPairRecipe);
  assert.equal(twoHRecipe.comboAssemblyId, "2h");
  assert.equal(fourHRecipe.comboAssemblyId, "4h");
  assert.equal(twoHRecipe.xyzzyType, "noether-pair-assembly");
  assert.equal(fourHRecipe.xyzzyType, "noether-quad-assembly");
  assert.equal(twoHRecipe.boundaryLabelText, "2H");
  assert.equal(fourHRecipe.boundaryLabelText, "4H");
  assert.equal(noetherPairRecipe.boundaryLabelText, "Noether Pair");
  assert.notEqual(twoHRecipe.id, noetherPairRecipe.id);
  assert.notDeepEqual(twoHRecipe.rowTitles, noetherPairRecipe.rowTitles);
});

test("combo 2h and 4h recipes reuse the canonical Xyzzy Noether row payloads while keeping distinct labels", () => {
  const reviewGroups = normalizeXyzzyReviewGroupCatalog(readJson("src/apps/xyzzy/xyzzy-review-groups.json"));
  const noetherPairRows = reviewGroups.compositeGroups.find((group) => group.key === "noether-pair")?.rows;
  const noetherQuadRows = reviewGroups.compositeGroups.find((group) => group.key === "noether-quad")?.rows;
  const twoHRecipe = comboXyzzyRecipeCatalog.assemblyRecipeById.get("combo.xyzzy.2h.v1");
  const fourHRecipe = comboXyzzyRecipeCatalog.assemblyRecipeById.get("combo.xyzzy.4h.v1");

  assert.deepEqual(twoHRecipe.rows, noetherPairRows);
  assert.deepEqual(fourHRecipe.rows, noetherQuadRows);
  assert.deepEqual(twoHRecipe.rowTitles, ["2H Row 1", "2H Row 2"]);
  assert.deepEqual(fourHRecipe.rowTitles, ["4H Row 1", "4H Row 2", "4H Row 3", "4H Row 4"]);
});

test("every recipeId used by combo publication-graph fixtures is admitted in the Combo Xyzzy recipe catalog", () => {
  const graphPaths = [
    "content/contracts/examples/combo-publication-graph/free_neutron_beta_exact.v1.json",
    "content/contracts/examples/combo-publication-graph/boundary_augmentation_recipe_coverage.v1.json",
  ];

  graphPaths.forEach((graphPath) => {
    const graph = readJson(graphPath);
    graph.units.forEach((unit) => {
      const hasAssemblyRecipe = comboXyzzyRecipeCatalog.assemblyRecipeById.has(unit.recipeId);
      const hasOperatorRecipe = comboXyzzyRecipeCatalog.operatorRecipeById.has(unit.recipeId);
      assert.equal(
        hasAssemblyRecipe || hasOperatorRecipe,
        true,
        `${graphPath} references unknown recipe ${unit.recipeId}`
      );
    });
  });
});

test("combo publication runtime builds the expected boundary-augmentation xyzzy document", () => {
  const graph = readJson("content/contracts/examples/combo-publication-graph/boundary_augmentation_recipe_coverage.v1.json");
  const expectedXyzzyDocument = readJson("content/contracts/examples/xyzzy/combo_boundary_augmentation_recipe_coverage.v1.json");
  const builtDocument = buildXyzzyDocumentFromComboPublicationGraph(graph, comboXyzzyRecipeCatalog);
  const tileCatalog = normalizeXyzzyTileCatalog(readJson("src/apps/xyzzy/xyzzy-tiles.json"));

  assert.deepEqual(validateAgainstSchema(builtDocument, xyzzySchema), [], "boundary xyzzy schema drifted");
  assert.deepEqual(validateXyzzyDocumentTilePayload(builtDocument, tileCatalog), [], "boundary xyzzy tile drifted");
  assert.deepEqual(builtDocument, expectedXyzzyDocument);
});

test("combo publication runtime builds the expected durable package for boundary augmentations", () => {
  const graph = readJson("content/contracts/examples/combo-publication-graph/boundary_augmentation_recipe_coverage.v1.json");
  const expectedPackage = readJson(
    "content/contracts/examples/combo-xyzzy-package/boundary_augmentation_recipe_coverage_durable.v1.json"
  );
  const builtPackage = buildComboXyzzyPackage({
    sourceAcceptanceDigest: "combo_boundary_augmentation_recipe_coverage::v1",
    publicationMode: "durable",
    documentId: "combo_boundary_augmentation_recipe_coverage",
    documentTitle: "Boundary augmentation recipe coverage",
    graph,
    recipeCatalog: comboXyzzyRecipeCatalog,
    durableDocumentPath: "content/contracts/examples/xyzzy/combo_boundary_augmentation_recipe_coverage.v1.json",
  });

  assert.deepEqual(validateAgainstSchema(builtPackage, comboXyzzyPackageSchema), [], "boundary package schema drifted");
  assert.deepEqual(builtPackage, expectedPackage);
});

test("combo publication runtime builds the expected beta xyzzy document from the accepted publication graph", () => {
  const graph = readJson("content/contracts/examples/combo-publication-graph/free_neutron_beta_exact.v1.json");
  const expectedXyzzyDocument = readJson("content/contracts/examples/xyzzy/combo_free_neutron_beta_exact.v1.json");
  const builtDocument = buildXyzzyDocumentFromComboPublicationGraph(graph, comboXyzzyRecipeCatalog);
  const tileCatalog = normalizeXyzzyTileCatalog(readJson("src/apps/xyzzy/xyzzy-tiles.json"));

  assert.deepEqual(validateAgainstSchema(builtDocument, xyzzySchema), [], "beta xyzzy schema drifted");
  assert.deepEqual(validateXyzzyDocumentTilePayload(builtDocument, tileCatalog), [], "beta xyzzy tile drifted");
  assert.deepEqual(builtDocument, expectedXyzzyDocument);
});

test("combo publication runtime builds the expected durable beta package from the accepted publication graph", () => {
  const graph = readJson("content/contracts/examples/combo-publication-graph/free_neutron_beta_exact.v1.json");
  const expectedPackage = readJson("content/contracts/examples/combo-xyzzy-package/free_neutron_beta_exact_durable.v1.json");
  const builtPackage = buildComboXyzzyPackage({
    sourceAcceptanceDigest: "combo_problem_free_neutron_beta_exact::family.beta.exact.v1::v1",
    publicationMode: "durable",
    documentId: "combo_problem_free_neutron_beta_exact--family.beta.exact.v1",
    documentTitle: "Free neutron beta exact",
    graph,
    recipeCatalog: comboXyzzyRecipeCatalog,
    durableDocumentPath: "content/contracts/examples/xyzzy/combo_free_neutron_beta_exact.v1.json",
  });

  assert.deepEqual(validateAgainstSchema(builtPackage, comboXyzzyPackageSchema), [], "beta package schema drifted");
  assert.deepEqual(builtPackage, expectedPackage);
});
