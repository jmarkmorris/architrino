import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { createPdgeditLibraryManifestEntry } from "../src/apps/pdgedit/PdgeditLibraryManifestRuntime.js";
import { normalizePdgeditTileCatalog } from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import { validatePdgeditDocumentTilePayload } from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";
import { PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY } from "../src/apps/pdgedit/PdgeditLaunchPayloadRuntime.js";
import { buildPdgsolveAcceptanceRecord } from "../src/apps/pdgsolve/PdgsolveAcceptanceRuntime.js";
import { PDGSOLVE_ASSEMBLY_LEDGER_BY_ID } from "../src/apps/pdgsolve/PdgsolveAssemblyLedgerRuntime.js";
import {
  buildPdgsolvePdgeditLaunchPayload,
  buildPdgsolvePdgeditPackage,
  buildPdgsolvePdgeditPackageFromAcceptance,
  buildPdgeditDocumentFromPdgsolvePublicationGraph,
  launchPdgeditFromPdgsolveAcceptance,
  publishPdgsolveAcceptanceToPdgeditLibrary,
  upsertPdgeditLibraryManifestEntryForPdgsolvePublication,
} from "../src/apps/pdgsolve/PdgsolvePdgeditPublicationRuntime.js";
import { normalizePdgsolvePdgeditRecipeCatalog } from "../src/apps/pdgsolve/PdgsolvePdgeditRecipeCatalogRuntime.js";
import { solvePdgsolveRequest } from "../src/apps/pdgsolve/PdgsolveSolveRuntime.js";

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

test("pdgsolve publication recipes project the solver primitive ledger", () => {
  const rawRecipeCatalog = readJson("src/apps/pdgsolve/pdgsolve-pdgedit-recipes.v1.json");
  const rawAssemblyRecipeById = new Map(rawRecipeCatalog.assemblyRecipes.map((recipe) => [recipe.id, recipe]));

  Object.entries(PDGSOLVE_ASSEMBLY_LEDGER_BY_ID).forEach(([assemblyId, ledger]) => {
    const rawRecipe = rawAssemblyRecipeById.get(ledger.recipeId);
    const normalizedRecipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get(ledger.recipeId);

    assert.ok(rawRecipe, `${assemblyId} raw publication recipe missing`);
    assert.ok(normalizedRecipe, `${assemblyId} normalized publication recipe missing`);
    assert.deepEqual(rawRecipe.primitiveCounts, ledger.counts, `${assemblyId} raw recipe ledger drifted`);
    assert.deepEqual(normalizedRecipe.primitiveCounts, ledger.counts, `${assemblyId} normalized recipe ledger drifted`);
  });
});

test("pdgsolve publication recipe catalog excludes downstream composite assembly recipes", () => {
  const removedRecipeIds = [
    "pdgsolve.pdgedit.neutron.v1",
    "pdgsolve.pdgedit.proton.v1",
    "pdgsolve.pdgedit.noether_pair.v1",
    "pdgsolve.pdgedit.2h.v1",
    "pdgsolve.pdgedit.4h.v1",
  ];

  removedRecipeIds.forEach((recipeId) => {
    assert.equal(pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.has(recipeId), false, `${recipeId} should be absent`);
  });
  assert.equal(
    pdgsolvePdgeditRecipeCatalog.assemblyRecipes.every((recipe) => !recipe.pdgeditType.endsWith("-composite")),
    true
  );
});

test("pdgsolve request test cases match the versioned pdgsolve-request schema", () => {
  pdgsolveCorpus.cases.forEach((entry) => {
    const request = readJson(entry.requestPath);
    const errors = validateAgainstSchema(request, pdgsolveRequestSchema);

    assert.deepEqual(errors, [], `${entry.requestPath} schema mismatch`);
    assert.equal(request.schema, "pdgsolve-request/v1");
    assert.equal(request.requestId, entry.id);
    assert.equal(request.source.kind, "test_case");
  });
});

test("pdgsolve-request/v1 admits only explicit request-side assemblies in reactants and products", () => {
  const expectedAssemblyIds = [
    "electron",
    "electron_antineutrino",
    "pro_down_quark",
    "pro_up_quark",
  ];

  assert.deepEqual(
    pdgsolveRequestSchema.properties.reactants.items.properties.assemblyId.enum,
    expectedAssemblyIds
  );
  assert.deepEqual(
    pdgsolveRequestSchema.properties.products.items.properties.assemblyId.enum,
    expectedAssemblyIds
  );
});

test("pdgsolve runtime results match the versioned pdgsolve-result schema and corpus expectations", () => {
  pdgsolveCorpus.cases.forEach((entry) => {
    const request = readJson(entry.requestPath);
    const result = solvePdgsolveRequest(request);
    const errors = validateAgainstSchema(result, pdgsolveResultSchema);
    const bestFamily = result.optionFamilies.find((family) => family.familyId === result.bestFamilyId);

    assert.deepEqual(errors, [], `${entry.id} runtime result schema mismatch`);
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

test("pdgsolve computed results preserve the four concrete v1 expectations in pdgsolve.md", () => {
  const betaLawUnsupportedResult = solvePdgsolveRequest(
    readJson("content/contracts/examples/pdgsolve-request/free_neutron_beta_exact.v1.json")
  );
  const supportDisallowedResult = solvePdgsolveRequest(
    readJson("content/contracts/examples/pdgsolve-request/free_neutron_beta_support_disallowed.v1.json")
  );
  const primitiveImbalanceResult = solvePdgsolveRequest(
    readJson("content/contracts/examples/pdgsolve-request/primitive_imbalance_neutron_to_proton.v1.json")
  );
  const passThruResult = solvePdgsolveRequest(readJson("content/contracts/examples/pdgsolve-request/pass_thru_neutron.v1.json"));

  assert.equal(betaLawUnsupportedResult.searchStatus, "exact_available");
  assert.equal(betaLawUnsupportedResult.bestFamilyId, "family.beta.fermion_decomposition.v1");
  assert.equal(betaLawUnsupportedResult.optionFamilies[0].publicationReady, true);
  assert.equal(betaLawUnsupportedResult.optionFamilies[0].score.auxiliaryBurden, 2);
  assert.deepEqual(
    betaLawUnsupportedResult.diagnostics.map((diagnostic) => diagnostic.id),
    ["pdgsolve.normalization.support_added.noether_core_rows"]
  );
  assert.equal(
    betaLawUnsupportedResult.optionFamilies[0].laneInventories.lane3.some(
      (record) => record.assemblyId === "unbound_architrino_residue_e9_p3"
    ),
    true
  );

  assert.equal(supportDisallowedResult.searchStatus, "unsupported");
  assert.equal(
    supportDisallowedResult.diagnostics.some(
      (diagnostic) => diagnostic.id === "pdgsolve.normalization.support_required.noether_core_rows"
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

test("pdgsolve solver runtime does not import result test cases", () => {
  const solveRuntimeSource = fs.readFileSync(
    new URL("../src/apps/pdgsolve/PdgsolveSolveRuntime.js", import.meta.url),
    "utf8"
  );
  const rowSearchSource = fs.readFileSync(
    new URL("../src/apps/pdgsolve/PdgsolveRowSearchRuntime.js", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(solveRuntimeSource, /content\/contracts\/examples\/pdgsolve-result/);
  assert.doesNotMatch(rowSearchSource, /content\/contracts\/examples\/pdgsolve-result/);
});

test("pdgsolve beta acceptance, publication graph, package, and pdgedit document stay aligned", () => {
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const graph = acceptance.lockedSolveGraph;
  const packageTestCase = readJson(
    "content/contracts/examples/pdgsolve-pdgedit-package/free_neutron_beta_exact_durable.v1.json"
  );
  const pdgeditDocument = buildPdgeditDocumentFromPdgsolvePublicationGraph(graph, pdgsolvePdgeditRecipeCatalog);
  const publicationPackage = buildPdgsolvePdgeditPackage({
    sourceAcceptanceDigest: acceptance.resultDigest,
    publicationMode: "durable",
    documentId: "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1",
    documentTitle: "Free neutron beta exact",
    graph,
    recipeCatalog: pdgsolvePdgeditRecipeCatalog,
    durableDocumentPath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
  });

  assert.deepEqual(validateAgainstSchema(graph, pdgsolvePublicationGraphSchema), [], "publication graph schema drifted");
  assert.deepEqual(validateAgainstSchema(acceptance, pdgsolveAcceptanceSchema), [], "acceptance schema drifted");
  assert.deepEqual(validateAgainstSchema(publicationPackage, pdgsolvePdgeditPackageSchema), [], "package schema drifted");
  assert.deepEqual(validateAgainstSchema(pdgeditDocument, pdgeditSchema), [], "pdgedit document schema drifted");

  assert.deepEqual(acceptance.lockedSolveGraph, graph);
  assert.equal(publicationPackage.sourceAcceptanceDigest, acceptance.resultDigest);
  assert.equal(
    publicationPackage.manifestEntry.documentPath,
    "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json"
  );
  assert.equal(
    fs.existsSync(new URL("../content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json", import.meta.url)),
    true
  );
  assert.deepEqual(
    validateAgainstSchema(
      {
        schema: "pdgedit-library-manifest/v1",
        defaultEntryId: publicationPackage.manifestEntry.id,
        entries: [{ ...publicationPackage.manifestEntry, isDefault: true }],
      },
      pdgeditLibraryManifestSchema
    ),
    [],
    "beta package manifest entry drifted from pdgedit manifest contract"
  );
  assert.equal(packageTestCase.manifestEntry.documentPath, publicationPackage.manifestEntry.documentPath);
});

test("legacy beta pdgedit publication regression keeps the fixed band layout and valid tile payloads", () => {
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const catalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const errors = validatePdgeditDocumentTilePayload(pdgeditDocument, catalog);
  const reactantRows = pdgeditDocument.assemblies.filter((assembly) => assembly.role === "reactant");
  const intermediateRows = pdgeditDocument.assemblies.filter((assembly) => assembly.role === "intermediate");
  const productRows = pdgeditDocument.assemblies.filter((assembly) => assembly.role === "product");
  const dissociateOperators = pdgeditDocument.operators.filter((operator) => operator.type === "dissociate");
  const lane2PassThruOperators = pdgeditDocument.operators.filter(
    (operator) => operator.type === "pass-thru" && operator.id.startsWith("unit_lane2_")
  );
  const lane4PassThruOperators = pdgeditDocument.operators.filter(
    (operator) => operator.type === "pass-thru" && operator.id.startsWith("unit_lane4_")
  );

  assert.deepEqual(errors, [], "pdgedit tile payload drifted");
  assert.equal(reactantRows.every((assembly) => assembly.x === 2), true);
  assert.equal(intermediateRows.every((assembly) => assembly.x === 9), true);
  assert.equal(productRows.every((assembly) => assembly.x === 16), true);
  assert.equal(dissociateOperators.every((operator) => operator.x === 7), true);
  assert.equal(lane2PassThruOperators.every((operator) => operator.x === 7), true);
  assert.equal(lane4PassThruOperators.every((operator) => operator.x === 14), true);
  assert.deepEqual(
    reactantRows.map((assembly) => assembly.y),
    [0, 1, 2, 3, 4, 5, 6],
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
  assert.deepEqual(pdgeditDocument.compositeLabels, []);
  assert.deepEqual(
    pdgeditDocument.links.filter((link) => link.endpointB === "unit_lane2_beta_dissociate"),
    [
      {
        id: "edge_lane1_pro_down_quark_2_to_beta_dissociate",
        endpointA: "unit_lane1_pro_down_quark_2.row.1",
        endpointB: "unit_lane2_beta_dissociate",
      },
    ],
    "dissociate must have one incoming 4-tile assembly row link"
  );
  assert.deepEqual(dissociateOperators[0], {
    id: "unit_lane2_beta_dissociate",
    type: "dissociate",
    x: 7,
    y: 2,
    title: "Dissociate",
    positrinoCount: 5,
    electrinoCount: 7,
  });
  assert.deepEqual(
    pdgeditDocument.operators.map((operator) => ({
      id: operator.id,
      positrinoCount: operator.positrinoCount,
      electrinoCount: operator.electrinoCount,
    })),
    [
      { id: "unit_lane2_pass_thru_pro_down_quark_1", positrinoCount: 5, electrinoCount: 7 },
      { id: "unit_lane2_pass_thru_pro_up_quark_1", positrinoCount: 8, electrinoCount: 4 },
      { id: "unit_lane2_beta_dissociate", positrinoCount: 5, electrinoCount: 7 },
      { id: "unit_lane4_pass_thru_pro_down_quark_1", positrinoCount: 5, electrinoCount: 7 },
      { id: "unit_lane4_pass_thru_pro_up_quark_1", positrinoCount: 8, electrinoCount: 4 },
      { id: "unit_lane4_pass_thru_pro_up_quark_2", positrinoCount: 8, electrinoCount: 4 },
      { id: "unit_lane4_pass_thru_electron_1", positrinoCount: 3, electrinoCount: 9 },
      { id: "unit_lane4_pass_thru_electron_antineutrino_1", positrinoCount: 6, electrinoCount: 6 },
    ],
    "published operator counts should match the accepted carrier rows"
  );
});

test("admitted fermion-decomposition beta solving publishes residue rows with admitted recipes", () => {
  const request = readJson("content/contracts/examples/pdgsolve-request/free_neutron_beta_exact.v1.json");
  const result = solvePdgsolveRequest(request);
  const acceptance = buildPdgsolveAcceptanceRecord({
    request,
    result,
    familyId: result.bestFamilyId,
  });
  const builtDocument = buildPdgeditDocumentFromPdgsolvePublicationGraph(
    acceptance.lockedSolveGraph,
    pdgsolvePdgeditRecipeCatalog
  );
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));

  assert.equal(result.bestFamilyId, "family.beta.fermion_decomposition.v1");
  assert.deepEqual(validateAgainstSchema(acceptance, pdgsolveAcceptanceSchema), [], "exact beta acceptance drifted");
  assert.deepEqual(validateAgainstSchema(builtDocument, pdgeditSchema), [], "exact beta pdgedit schema drifted");
  assert.deepEqual(validatePdgeditDocumentTilePayload(builtDocument, tileCatalog), [], "exact beta residue tile drifted");
  assert.deepEqual(
    builtDocument.assemblies
      .filter((assembly) => assembly.role === "intermediate")
      .map((assembly) => assembly.type),
    [
      "pro-down-quark-assembly",
      "pro-up-quark-assembly",
      "unbound-architrino-residue-e4-p8-assembly",
      "unbound-architrino-residue-e9-p3-assembly",
      "unbound-architrino-residue-e6-p6-assembly",
    ]
  );
  assert.deepEqual(
    builtDocument.operators
      .filter((operator) => operator.type === "associate")
      .map((operator) => ({
        id: operator.id,
        positrinoCount: operator.positrinoCount,
        electrinoCount: operator.electrinoCount,
      })),
    [
      {
        id: "unit_lane4_associate_unbound_architrino_residue_e4_p8_1",
        positrinoCount: 8,
        electrinoCount: 4,
      },
      {
        id: "unit_lane4_associate_unbound_architrino_residue_e9_p3_1",
        positrinoCount: 3,
        electrinoCount: 9,
      },
      {
        id: "unit_lane4_associate_unbound_architrino_residue_e6_p6_1",
        positrinoCount: 6,
        electrinoCount: 6,
      },
    ]
  );
});

test("pdgsolve pdgedit recipe catalog admits the fermion-decomposition residue rows with solver-ledger counts", () => {
  const residueRecipeIds = [
    "pdgsolve.pdgedit.unbound_architrino_residue_e4_p8.v1",
    "pdgsolve.pdgedit.unbound_architrino_residue_e6_p6.v1",
    "pdgsolve.pdgedit.unbound_architrino_residue_e9_p3.v1",
  ];

  residueRecipeIds.forEach((recipeId) => {
    const recipe = pdgsolvePdgeditRecipeCatalog.assemblyRecipeById.get(recipeId);
    assert.ok(recipe, `${recipeId} missing`);
    assert.equal(recipe.rows.length, 1);
    assert.equal(recipe.ports.input[0], 1);
    assert.equal(recipe.ports.output[0], 1);
    assert.deepEqual(recipe.primitiveCounts, PDGSOLVE_ASSEMBLY_LEDGER_BY_ID[recipe.pdgsolveAssemblyId].counts);
  });
});

test("every recipeId used by pdgsolve publication-graph test cases is admitted in the pdgsolve pdgedit recipe catalog", () => {
  const graphPaths = [
    "content/contracts/examples/pdgsolve-publication-graph/free_neutron_beta_exact.v1.json",
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

test("pdgsolve publication runtime publishes only from an accepted record into one pdgedit document and one manifest entry", async () => {
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const manifest = readJson("content/contracts/examples/pdgedit/manifest.v1.json");
  const expectedDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const documentWrites = [];
  const manifestWrites = [];

  const publication = await publishPdgsolveAcceptanceToPdgeditLibrary({
    acceptance,
    manifest,
    documentId: "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1",
    documentTitle: "Free neutron beta exact",
    durableDocumentPath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
    documentWriter: async (write) => {
      documentWrites.push(write);
    },
    manifestWriter: async (write) => {
      manifestWrites.push(write);
    },
  });

  assert.equal(publication.publicationMode, "durable");
  assert.equal(documentWrites.length, 1);
  assert.equal(manifestWrites.length, 1);
  assert.equal(documentWrites[0].path, "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  assert.deepEqual(documentWrites[0].document, expectedDocument);
  assert.equal(manifestWrites[0].path, "content/contracts/examples/pdgedit/manifest.v1.json");
  assert.equal(
    manifestWrites[0].manifest.entries.filter(
      (entry) => entry.id === "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1"
    ).length,
    1
  );
  assert.deepEqual(
    manifestWrites[0].manifest.entries.find(
      (entry) => entry.id === "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1"
    ),
    publication.package.manifestEntry
  );
});

test("pdgsolve publication manifest upsert replaces the matching durable entry instead of duplicating it", () => {
  const manifest = {
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "old_entry",
    entries: [
      {
        id: "old_entry",
        title: "Old entry",
        displayTitle: "Old entry",
        documentPath: "content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json",
        isDefault: true,
      },
      {
        id: "published_entry",
        title: "Stale published entry",
        displayTitle: "Stale published entry",
        documentPath: "content/contracts/examples/pdgedit/stale.v1.json",
      },
    ],
  };

  const updatedManifest = upsertPdgeditLibraryManifestEntryForPdgsolvePublication(manifest, {
    id: "published_entry",
    title: "Published entry",
    displayTitle: "Published entry",
    documentPath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
  });

  assert.equal(updatedManifest.entries.length, 2);
  assert.equal(
    updatedManifest.entries.filter((entry) => entry.id === "published_entry").length,
    1
  );
  assert.deepEqual(updatedManifest.entries[1], {
    id: "published_entry",
    title: "Published entry",
    displayTitle: "Published entry",
    documentPath: "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
  });
  assert.equal(updatedManifest.defaultEntryId, "old_entry");
  assert.equal(updatedManifest.entries[0].isDefault, true);
});

test("pdgsolve launch publication stores the exact accepted pdgedit document and opens pdgedit", () => {
  const acceptance = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const expectedDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");
  const storageData = new Map();
  let assignedHref = "";
  const storage = {
    setItem(key, value) {
      storageData.set(key, value);
    },
  };
  const windowLike = {
    location: {
      href: "http://127.0.0.1:5173/pdgsolve.html",
      assign(href) {
        assignedHref = href;
      },
    },
  };

  const launch = launchPdgeditFromPdgsolveAcceptance({
    acceptance,
    storage,
    windowLike,
    documentId: "pdgsolve_problem_free_neutron_beta_exact--family.beta.exact.v1",
    documentTitle: "Free neutron beta exact",
  });
  const payload = JSON.parse(storageData.get(PDGEDIT_LAUNCH_PAYLOAD_STORAGE_KEY));

  assert.equal(launch.publicationMode, "launch");
  assert.equal(launch.href, "http://127.0.0.1:5173/pdgedit.html");
  assert.equal(assignedHref, "http://127.0.0.1:5173/pdgedit.html");
  assert.equal(payload.schema, "pdgedit-launch/v1");
  assert.equal(payload.sourceKind, "pdgsolve");
  assert.equal(payload.sourceReference, acceptance.resultDigest);
  assert.deepEqual(payload.pdgeditDocument, expectedDocument);
});

test("pdgsolve publication refuses arbitrary pdgedit documents as reverse solver input", () => {
  const pdgeditDocument = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");

  assert.throws(
    () => buildPdgsolvePdgeditPackageFromAcceptance({ acceptance: pdgeditDocument }),
    /pdgsolve-acceptance\/v1/
  );
  assert.throws(
    () => buildPdgsolvePdgeditLaunchPayload({ acceptance: pdgeditDocument }),
    /pdgsolve-acceptance\/v1/
  );
});
