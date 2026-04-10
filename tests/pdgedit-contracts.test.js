import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  getPdgeditLibraryManifestEntryById,
  normalizePdgeditLibraryManifest,
  selectDefaultPdgeditLibraryManifestEntry,
} from "../src/apps/pdgedit/PdgeditLibraryManifestRuntime.js";
import { loadPdgeditContractBootstrapSeed } from "../src/apps/pdgedit/PdgeditBootstrapRuntime.js";
import { normalizePdgeditTemplateCatalog } from "../src/apps/pdgedit/PdgeditTemplateCatalogRuntime.js";
import { normalizePdgeditTileCatalog } from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import {
  getPdgeditDocumentAssemblyRows,
  validatePdgeditDocumentTilePayload,
} from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";
import { normalizePdgeditReviewGroupCatalog } from "../src/apps/pdgedit/PdgeditReviewGroupCatalogRuntime.js";

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

  if (typeof schema.minItems === "number" && Array.isArray(value) && value.length < schema.minItems) {
    errors.push(`${path}: expected array length >= ${schema.minItems}`);
  }

  if (typeof schema.maxItems === "number" && Array.isArray(value) && value.length > schema.maxItems) {
    errors.push(`${path}: expected array length <= ${schema.maxItems}`);
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

const PDGEDIT_EXAMPLE_PATHS = [
  "content/contracts/examples/pdgedit/pdgsolve_boundary_augmentation_recipe_coverage.v1.json",
  "content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json",
  "content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
  "content/contracts/examples/pdgedit/unbound_architrinos.v1.json",
  "content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json",
  "content/contracts/examples/pdgedit/proton_to_photon_stack.v1.json",
];

const PDGEDIT_MANIFEST_PATH = "content/contracts/examples/pdgedit/manifest.v1.json";

test("pdgedit example documents match the versioned pdgedit schema", () => {
  const schema = readJson("src/contracts/pdgedit/v1/schema.json");

  PDGEDIT_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    const errors = validateAgainstSchema(example, schema);
    assert.deepEqual(errors, [], `${examplePath} schema mismatch`);
  });
});

test("pdgedit manifest fixture matches the versioned manifest schema", () => {
  const schema = readJson("src/contracts/pdgedit-library-manifest/v1/schema.json");
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const errors = validateAgainstSchema(manifest, schema);

  assert.deepEqual(errors, [], "pdgedit manifest schema mismatch");
});

test("pdgedit example assemblies use exact four-tile payloads drawn from the shared tile catalog", () => {
  const catalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));

  PDGEDIT_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    const errors = validatePdgeditDocumentTilePayload(example, catalog);
    assert.deepEqual(errors, [], `${examplePath} tile payload drifted`);
  });
});

test("pdgedit document assembly rows come directly from tiles instead of semantic inference", () => {
  const assemblyTiles = [
    "pro-up-quark",
    "binary-full-br-rr",
    "binary-full-br-br",
    "binary-full-br-rr",
  ];

  const rows = getPdgeditDocumentAssemblyRows({
    schema: "pdgedit/v1",
    assemblies: [
      {
        id: "assembly_1",
        type: "not-the-display-source",
        x: 2,
        y: 0,
        title: "This title should not rebuild the row",
        role: "reactant",
        tiles: assemblyTiles,
      },
    ],
    operators: [],
    links: [],
    compositeLabels: [],
  });

  assert.deepEqual(rows, [
    {
      id: "assembly_1",
      x: 2,
      y: 0,
      role: "reactant",
      tiles: assemblyTiles,
    },
  ]);
});

test("pdgedit example links and composite labels stay within the explicit boundary model", () => {
  PDGEDIT_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    const objectIds = new Set([
      ...example.assemblies.map((record) => record.id),
      ...example.operators.map((record) => record.id),
    ]);

    example.links.forEach((link) => {
      assert.equal(objectIds.has(link.endpointA), true, `${examplePath} link endpointA missing: ${link.id}`);
      assert.equal(objectIds.has(link.endpointB), true, `${examplePath} link endpointB missing: ${link.id}`);
    });

    example.compositeLabels.forEach((label) => {
      assert.equal(
        label.rowStart <= label.rowEnd,
        true,
        `${examplePath} composite label row span inverted: ${label.id}`
      );
    });
  });
});

test("the solver-published free neutron beta pdgedit document uses the normalized unit, edge, and label id vocabulary", () => {
  const example = readJson("content/contracts/examples/pdgedit/pdgsolve_free_neutron_beta_exact.v1.json");

  assert.equal(
    example.assemblies.every((assembly) => assembly.id.startsWith("unit_") && assembly.id.includes(".row.")),
    true
  );
  assert.equal(example.operators.every((operator) => operator.id.startsWith("unit_")), true);
  assert.equal(example.links.every((link) => link.id.startsWith("edge_")), true);
  assert.equal(example.compositeLabels.every((label) => label.id.startsWith("label.")), true);
});

test("pdgedit examples include at least one explicit assembly payload for every current four-tile review row", () => {
  const coveredRows = new Set();
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const allReviewRows = [
    ...reviewGroups.specialGroups,
    ...reviewGroups.singleRowGroups,
    ...reviewGroups.quarkColorGroups,
    ...reviewGroups.compositeGroups,
  ].flatMap((group) => group.rows.map((row) => JSON.stringify(row)));

  PDGEDIT_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    example.assemblies.forEach((assembly) => {
      coveredRows.add(JSON.stringify(assembly.tiles));
    });
  });

  const missingRows = allReviewRows.filter((row) => !coveredRows.has(row));
  assert.deepEqual(missingRows, []);
});

test("pdgedit manifest defaults to its declared starter document", () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const normalizedManifest = normalizePdgeditLibraryManifest(manifest);
  assert.equal(manifest.schema, "pdgedit-library-manifest/v1");
  assert.equal(manifest.defaultEntryId, "pass_thru_up_quark");
  assert.deepEqual(Object.keys(manifest).sort(), ["defaultEntryId", "entries", "schema"]);

  const defaultEntry = getPdgeditLibraryManifestEntryById(normalizedManifest, normalizedManifest.defaultEntryId);
  assert.ok(defaultEntry);
  assert.equal(defaultEntry.isDefault, true);
  assert.equal(
    defaultEntry.documentPath,
    "content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json"
  );

  manifest.entries.forEach((entry) => {
    assert.deepEqual(
      Object.keys(entry).sort(),
      entry.isDefault
        ? ["displayTitle", "documentPath", "id", "isDefault", "title"]
        : ["displayTitle", "documentPath", "id", "title"]
    );
    assert.equal(typeof entry.id, "string");
    assert.equal(typeof entry.title, "string");
    assert.equal(typeof entry.displayTitle, "string");
    assert.equal(typeof entry.documentPath, "string");
    assert.equal(entry.documentPath.endsWith(".v1.json"), true);
    assert.equal(fs.existsSync(new URL(`../${entry.documentPath}`, import.meta.url)), true, entry.documentPath);
  });
});

test("pdgedit manifest selection prefers the declared default, then the first entry", () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const selectedFromFixture = selectDefaultPdgeditLibraryManifestEntry(manifest);
  const selectedFromDeclaredDefault = selectDefaultPdgeditLibraryManifestEntry({
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "secondary_document",
    entries: [
      {
        id: "primary_document",
        title: "Primary document",
        displayTitle: "Primary document",
        documentPath: "content/contracts/examples/pdgedit/proton_to_photon_stack.v1.json",
      },
      {
        id: "secondary_document",
        title: "Secondary document",
        displayTitle: "Secondary document",
        documentPath: "content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json",
        isDefault: true,
      },
    ],
  });
  const selectedFromFirstEntry = selectDefaultPdgeditLibraryManifestEntry({
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "",
    entries: [
      {
        id: "first_document",
        title: "First document",
        displayTitle: "First document",
        documentPath: "content/contracts/examples/pdgedit/proton_to_photon_stack.v1.json",
      },
      {
        id: "second_document",
        title: "Second document",
        displayTitle: "Second document",
        documentPath: "content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json",
      },
    ],
  });

  assert.equal(selectedFromFixture?.id, "pass_thru_up_quark");
  assert.equal(selectedFromDeclaredDefault?.id, "secondary_document");
  assert.equal(selectedFromFirstEntry?.id, "first_document");
});

test("pdgedit main bootstrap seed stays contract-first and separate from the review harness", async () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const tileCatalog = readJson("src/apps/pdgedit/pdgedit-tiles.json");
  const templateSource = readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json");
  const fetchCalls = [];
  const source = fs.readFileSync(new URL("../src/apps/pdgedit/main.js", import.meta.url), "utf8");
  const { manifest: loadedManifest, tileCatalog: loadedTileCatalog, templateCatalog, selectedEntry } =
    await loadPdgeditContractBootstrapSeed({
    manifestUrl: "https://architrino.local/content/contracts/examples/pdgedit/manifest.v1.json",
    tileCatalogUrl: "https://architrino.local/src/apps/pdgedit/pdgedit-tiles.json",
    templateCatalogUrl:
      "https://architrino.local/content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
    fetchImpl: async (url) => {
      fetchCalls.push(url);
      return {
        ok: true,
        json: async () => {
          if (url.endsWith("manifest.v1.json")) {
            return manifest;
          }
          if (url.endsWith("pdgedit-tiles.json")) {
            return tileCatalog;
          }
          if (url.endsWith("four_tile_family_coverage.v1.json")) {
            return templateSource;
          }
          const entry = manifest.entries.find((record) => url.endsWith(record.documentPath.split("/").pop()));
          return readJson(entry.documentPath);
        },
      };
    },
  });

  assert.deepEqual(fetchCalls, [
    "https://architrino.local/src/apps/pdgedit/pdgedit-tiles.json",
    "https://architrino.local/content/contracts/examples/pdgedit/manifest.v1.json",
    "https://architrino.local/content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
    "content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json",
  ]);
  assert.deepEqual(loadedManifest, normalizePdgeditLibraryManifest(manifest));
  assert.deepEqual(loadedTileCatalog, normalizePdgeditTileCatalog(tileCatalog));
  assert.deepEqual(templateCatalog, normalizePdgeditTemplateCatalog(templateSource));
  assert.equal(selectedEntry?.id, "pass_thru_up_quark");
  assert.equal(source.includes("PdgeditTileReviewAppRuntime"), false);
  assert.equal(source.includes("createPdgeditAppRuntime"), true);
});
