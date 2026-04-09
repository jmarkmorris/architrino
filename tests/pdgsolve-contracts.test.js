import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { createPdgeditLibraryManifestEntry } from "../src/apps/pdgedit/PdgeditLibraryManifestRuntime.js";
import { normalizePdgeditTileCatalog } from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import { normalizePdgeditReviewGroupCatalog } from "../src/apps/pdgedit/PdgeditReviewGroupCatalogRuntime.js";
import { validatePdgeditDocumentTilePayload } from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";
import { buildPdgsolvePdgeditPackage, buildPdgeditDocumentFromPdgsolvePublicationGraph } from "../src/apps/pdgsolve/PdgsolvePdgeditPublicationRuntime.js";
import { normalizePdgsolvePdgeditRecipeCatalog } from "../src/apps/pdgsolve/PdgsolvePdgeditRecipeCatalogRuntime.js";

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

const pdgsolveCorpus = readJson("content/contracts/examples/pdgsolve-corpus/v1/index.json");
const pdgsolveRequestSchema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
const pdgsolveResultSchema = readJson("src/contracts/pdgsolve-result/v1/schema.json");
const pdgsolveAcceptanceSchema = readJson("src/contracts/pdgsolve-acceptance/v1/schema.json");
const pdgsolvePublicationGraphSchema = readJson("src/contracts/pdgsolve-publication-graph/v1/schema.json");
const pdgsolvePdgeditPackageSchema = readJson("src/contracts/pdgsolve-pdgedit-package/v1/schema.json");
const pdgeditLibraryManifestSchema = readJson("src/contracts/pdgedit-library-manifest/v1/schema.json");
const pdgeditSchema = readJson("src/contracts/pdgedit/v1/schema.json");
const pdgsolvePdgeditRecipeCatalog = normalizePdgsolvePdgeditRecipeCatalog(
  readJson("src/apps/pdgsolve/pdgsolve-pdgedit-recipes.v1.json")
);

test("pdgsolve request fixtures match the versioned pdgsolve-request schema", () => {
  pdgsolveCorpus.cases.forEach((entry) => {
    const request = readJson(entry.requestPath);
    const errors = validateAgainstSchema(request, pdgsolveRequestSchema);

    assert.deepEqual(errors, [], `${entry.requestPath} schema mismatch`);
    assert.equal(request.schema, "pdgsolve-request/v1");
    assert.equal(request.requestId, entry.id);
    assert.equal(request.source.kind, "fixture");
  });
});

test("pdgsolve result fixtures match the versioned pdgsolve-result schema and corpus expectations", () => {
  pdgsolveCorpus.cases.forEach((entry) => {
    const result = readJson(entry.resultPath);
    const errors = validateAgainstSchema(result, pdgsolveResultSchema);
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

test("pdgsolve result fixtures preserve the four concrete v1 expectations frozen in pdgsolve.md", () => {
  const exactResult = readJson("content/contracts/examples/pdgsolve-result/free_neutron_beta_exact_result.v1.json");
  const supportDisallowedResult = readJson(
    "content/contracts/examples/pdgsolve-result/free_neutron_beta_support_disallowed_result.v1.json"
  );
  const primitiveImbalanceResult = readJson(
    "content/contracts/examples/pdgsolve-result/primitive_imbalance_neutron_to_proton_result.v1.json"
  );
  const passThruResult = readJson("content/contracts/examples/pdgsolve-result/pass_thru_neutron_result.v1.json");

  assert.equal(exactResult.optionFamilies[0].publicationReady, true);
  assert.equal(exactResult.optionFamilies[0].score.auxiliaryBurden, 0);

  assert.equal(supportDisallowedResult.searchStatus, "unsupported");
  assert.equal(
    supportDisallowedResult.diagnostics.some(
      (diagnostic) => diagnostic.id === "pdgsolve.normalization.support_required.noether_pair"
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

test("pdgsolve beta acceptance, publication graph, package, and pdgedit document stay aligned", () => {
  const result = readJson("content/contracts/examples/pdgsolve-result/free_neutron_beta_exact_result.v1.json");
  const graph = readJson("content/contracts/examples/pdgsolve-publication-graph/free_neutron_beta_exact.v1.json");
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const packageFixture = readJson(
    "content/contracts/examples/pdgsolve-pdgedit-package/free_neutron_beta_exact_durable.v1.json"
  );
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");

  assert.deepEqual(validateAgainstSchema(graph, pdgsolvePublicationGraphSchema), [], "publication graph schema drifted");
  assert.deepEqual(validateAgainstSchema(acceptance, pdgsolveAcceptanceSchema), [], "acceptance schema drifted");
  assert.deepEqual(validateAgainstSchema(packageFixture, pdgsolvePdgeditPackageSchema), [], "package schema drifted");
  assert.deepEqual(validateAgainstSchema(pdgeditDocument, pdgeditSchema), [], "pdgedit document schema drifted");

  assert.deepEqual(result.optionFamilies[0].canonicalCandidate.solveGraph, graph);
  assert.deepEqual(acceptance.lockedSolveGraph, graph);
  assert.equal(packageFixture.sourceAcceptanceDigest, acceptance.resultDigest);
  assert.equal(
    packageFixture.manifestEntry.documentPath,
    "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json"
  );
  assert.equal(
    fs.existsSync(new URL("../content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json", import.meta.url)),
    true
  );
  assert.deepEqual(packageFixture.pdgeditDocument, pdgeditDocument);
  assert.deepEqual(
    validateAgainstSchema(
      {
        schema: "pdgedit-library-manifest/v1",
        defaultEntryId: packageFixture.manifestEntry.id,
        entries: [{ ...packageFixture.manifestEntry, isDefault: true }],
      },
      pdgeditLibraryManifestSchema
    ),
    [],
    "beta package manifest entry drifted from pdgedit manifest contract"
  );
});

test("pdgsolve beta pdgedit publication regression keeps the fixed band layout and valid tile payloads", () => {
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const catalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const errors = validatePdgeditDocumentTilePayload(pdgeditDocument, catalog);
  const reactantRows = pdgeditDocument.assemblies.filter((assembly) => assembly.role === "reactant");
  const intermediateRows = pdgeditDocument.assemblies.filter((assembly) => assembly.role === "intermediate");
  const productRows = pdgeditDocument.assemblies.filter((assembly) => assembly.role === "product");
  const dissociateOperators = pdgeditDocument.operators.filter((operator) => operator.type === "dissociate");
  const passThruOperators = pdgeditDocument.operators.filter((operator) => operator.type === "pass-thru");

  assert.deepEqual(errors, [], "pdgedit tile payload drifted");
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
    pdgeditDocument.compositeLabels.map((label) => [label.side, label.text, label.rowStart, label.rowEnd]),
    [
      ["left", "Neutron", 0, 2],
      ["left", "Noether Pair", 3, 4],
      ["right", "Proton", 0, 2],
      ["right", "Pro Electron", 3, 3],
      ["right", "Anti Electron Neutrino", 4, 4],
    ]
  );
});

test("pdgsolve pdgedit recipe catalog admits 2h and 4h as explicit publication recipes without collapsing them into support assemblies", () => {
  const twoHRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get("pdgsolve.pdgedit.2h.v1");
  const fourHRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get("pdgsolve.pdgedit.4h.v1");
  const noetherPairRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get("pdgsolve.pdgedit.noether_pair.v1");

  assert.ok(twoHRecipe);
  assert.ok(fourHRecipe);
  assert.ok(noetherPairRecipe);
  assert.equal(twoHRecipe.pdgsolveAssemblyId, "2h");
  assert.equal(fourHRecipe.pdgsolveAssemblyId, "4h");
  assert.equal(twoHRecipe.pdgeditType, "noether-pair-assembly");
  assert.equal(fourHRecipe.pdgeditType, "noether-quad-assembly");
  assert.equal(twoHRecipe.boundaryLabelText, "2H");
  assert.equal(fourHRecipe.boundaryLabelText, "4H");
  assert.equal(noetherPairRecipe.boundaryLabelText, "Noether Pair");
  assert.notEqual(twoHRecipe.id, noetherPairRecipe.id);
  assert.notDeepEqual(twoHRecipe.rowTitles, noetherPairRecipe.rowTitles);
});

test("pdgsolve 2h and 4h recipes reuse the canonical Pdgedit Noether row payloads while keeping distinct labels", () => {
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const noetherPairRows = reviewGroups.compositeGroups.find((group) => group.key === "noether-pair")?.rows;
  const noetherQuadRows = reviewGroups.compositeGroups.find((group) => group.key === "noether-quad")?.rows;
  const twoHRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get("pdgsolve.pdgedit.2h.v1");
  const fourHRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get("pdgsolve.pdgedit.4h.v1");

  assert.deepEqual(twoHRecipe.rows, noetherPairRows);
  assert.deepEqual(fourHRecipe.rows, noetherQuadRows);
  assert.deepEqual(twoHRecipe.rowTitles, ["2H Row 1", "2H Row 2"]);
  assert.deepEqual(fourHRecipe.rowTitles, ["4H Row 1", "4H Row 2", "4H Row 3", "4H Row 4"]);
});

test("every recipeId used by pdgsolve publication-graph fixtures is admitted in the pdgsolve pdgedit recipe catalog", () => {
  const graphPaths = [
    "content/contracts/examples/pdgsolve-publication-graph/free_neutron_beta_exact.v1.json",
    "content/contracts/examples/pdgsolve-publication-graph/boundary_augmentation_recipe_coverage.v1.json",
  ];

  graphPaths.forEach((graphPath) => {
    const graph = readJson(graphPath);
    graph.units.forEach((unit) => {
      const hasAssemblyRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.has(unit.recipeId);
      const hasOperatorRecipe = pdgsolvePdgeditRecipeCatalog.operatorRecipeById.has(unit.recipeId);
      assert.equal(
        hasAssemblyRecipe || hasOperatorRecipe,
        true,
        `${graphPath} references unknown recipe ${unit.recipeId}`
      );
    });
  });
});

test("pdgsolve publication runtime builds the expected boundary-augmentation pdgedit document", () => {
  const graph = readJson("content/contracts/examples/pdgsolve-publication-graph/boundary_augmentation_recipe_coverage.v1.json");
  const expectedPdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_boundary_augmentation_recipe_coverage.v1.json");
  const builtDocument = buildPdgeditDocumentFromPdgsolvePublicationGraph(graph, pdgsolvePdgeditRecipeCatalog);
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));

  assert.deepEqual(validateAgainstSchema(builtDocument, pdgeditSchema), [], "boundary pdgedit schema drifted");
  assert.deepEqual(validatePdgeditDocumentTilePayload(builtDocument, tileCatalog), [], "boundary pdgedit tile drifted");
  assert.deepEqual(builtDocument, expectedPdgeditDocument);
});

test("pdgsolve publication runtime builds the expected durable package for boundary augmentations", () => {
  const graph = readJson("content/contracts/examples/pdgsolve-publication-graph/boundary_augmentation_recipe_coverage.v1.json");
  const expectedPackage = readJson(
    "content/contracts/examples/pdgsolve-pdgedit-package/boundary_augmentation_recipe_coverage_durable.v1.json"
  );
  const builtPackage = buildPdgsolvePdgeditPackage({
    sourceAcceptanceDigest: "pdgsolve_boundary_augmentation_recipe_coverage::v1",
    publicationMode: "durable",
    documentId: "pdgsolve_boundary_augmentation_recipe_coverage",
    documentTitle: "Boundary augmentation recipe coverage",
    graph,
    recipeCatalog: pdgsolvePdgeditRecipeCatalog,
    durableDocumentPath: "content/contracts/examples/pdgedit/pdgsolve_boundary_augmentation_recipe_coverage.v1.json",
  });

  assert.deepEqual(validateAgainstSchema(builtPackage, pdgsolvePdgeditPackageSchema), [], "boundary package schema drifted");
  assert.deepEqual(builtPackage, expectedPackage);
  assert.deepEqual(
    builtPackage.manifestEntry,
    createPdgeditLibraryManifestEntry({
      id: "pdgsolve_boundary_augmentation_recipe_coverage",
      title: "Boundary augmentation recipe coverage",
      displayTitle: "Boundary augmentation recipe coverage",
      documentPath: "content/contracts/examples/pdgedit/pdgsolve_boundary_augmentation_recipe_coverage.v1.json",
    })
  );
});

test("pdgsolve publication runtime builds the expected beta pdgedit document from the accepted publication graph", () => {
  const graph = readJson("content/contracts/examples/pdgsolve-publication-graph/free_neutron_beta_exact.v1.json");
  const expectedPdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const builtDocument = buildPdgeditDocumentFromPdgsolvePublicationGraph(graph, pdgsolvePdgeditRecipeCatalog);
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));

  assert.deepEqual(validateAgainstSchema(builtDocument, pdgeditSchema), [], "beta pdgedit schema drifted");
  assert.deepEqual(validatePdgeditDocumentTilePayload(builtDocument, tileCatalog), [], "beta pdgedit tile drifted");
  assert.deepEqual(builtDocument, expectedPdgeditDocument);
});

test("pdgsolve publication runtime builds the expected durable beta package from the accepted publication graph", () => {
  const graph = readJson("content/contracts/examples/pdgsolve-publication-graph/free_neutron_beta_exact.v1.json");
  const expectedPackage = readJson("content/contracts/examples/pdgsolve-pdgedit-package/free_neutron_beta_exact_durable.v1.json");
  const builtPackage = buildPdgsolvePdgeditPackage({
    sourceAcceptanceDigest: "pdgsolve_problem_free_neutron_beta_exact::family.beta.exact.v1::v1",
    publicationMode: "durable",
    documentId: "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1",
    documentTitle: "Free neutron beta exact",
    graph,
    recipeCatalog: pdgsolvePdgeditRecipeCatalog,
    durableDocumentPath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
  });

  assert.deepEqual(validateAgainstSchema(builtPackage, pdgsolvePdgeditPackageSchema), [], "beta package schema drifted");
  assert.deepEqual(builtPackage, expectedPackage);
  assert.deepEqual(
    builtPackage.manifestEntry,
    createPdgeditLibraryManifestEntry({
      id: "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1",
      title: "Free neutron beta exact",
      displayTitle: "Free neutron beta exact",
      documentPath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
    })
  );
});
