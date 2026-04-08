import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { normalizeXyzzyTileCatalog } from "../src/apps/xyzzy/XyzzyTileCatalogRuntime.js";
import {
  getXyzzyDocumentAssemblyRows,
  validateXyzzyDocumentTilePayload,
} from "../src/apps/xyzzy/XyzzyDocumentRuntime.js";
import { normalizeXyzzyReviewGroupCatalog } from "../src/apps/xyzzy/XyzzyReviewGroupCatalogRuntime.js";

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

const XYZZY_EXAMPLE_PATHS = [
  "content/contracts/examples/xyzzy/four_tile_family_coverage.v1.json",
  "content/contracts/examples/xyzzy/free_neutron_beta_decay.v1.json",
  "content/contracts/examples/xyzzy/unbound_architrinos.v1.json",
  "content/contracts/examples/xyzzy/pass_thru_up_quark.v1.json",
  "content/contracts/examples/xyzzy/proton_to_photon_stack.v1.json",
];

const XYZZY_MANIFEST_PATH = "content/contracts/examples/xyzzy/manifest.v1.json";

test("xyzzy example documents match the versioned xyzzy schema", () => {
  const schema = readJson("src/contracts/xyzzy/v1/schema.json");

  XYZZY_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    const errors = validateAgainstSchema(example, schema);
    assert.deepEqual(errors, [], `${examplePath} schema mismatch`);
  });
});

test("xyzzy example assemblies use exact four-tile payloads drawn from the shared tile catalog", () => {
  const catalog = normalizeXyzzyTileCatalog(readJson("src/apps/xyzzy/xyzzy-tiles.json"));

  XYZZY_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    const errors = validateXyzzyDocumentTilePayload(example, catalog);
    assert.deepEqual(errors, [], `${examplePath} tile payload drifted`);
  });
});

test("xyzzy document assembly rows come directly from tiles instead of semantic inference", () => {
  const assemblyTiles = [
    "pro-up-quark",
    "binary-full-br-rr",
    "binary-full-br-br",
    "binary-full-br-rr",
  ];

  const rows = getXyzzyDocumentAssemblyRows({
    schema: "xyzzy/v1",
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

test("xyzzy example links and composite labels stay within the explicit boundary model", () => {
  XYZZY_EXAMPLE_PATHS.forEach((examplePath) => {
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

test("xyzzy examples include at least one explicit assembly payload for every current four-tile review row", () => {
  const coveredRows = new Set();
  const reviewGroups = normalizeXyzzyReviewGroupCatalog(readJson("src/apps/xyzzy/xyzzy-review-groups.json"));
  const allReviewRows = [
    ...reviewGroups.specialGroups,
    ...reviewGroups.singleRowGroups,
    ...reviewGroups.quarkColorGroups,
    ...reviewGroups.compositeGroups,
  ].flatMap((group) => group.rows.map((row) => JSON.stringify(row)));

  XYZZY_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    example.assemblies.forEach((assembly) => {
      coveredRows.add(JSON.stringify(assembly.tiles));
    });
  });

  const missingRows = allReviewRows.filter((row) => !coveredRows.has(row));
  assert.deepEqual(missingRows, []);
});

test("xyzzy manifest defaults to the canonical free neutron beta decay document", () => {
  const manifest = readJson(XYZZY_MANIFEST_PATH);
  assert.equal(manifest.schema, "xyzzy-library-manifest/v1");
  assert.equal(manifest.defaultEntryId, "free_neutron_beta_decay");
  assert.deepEqual(Object.keys(manifest).sort(), ["defaultEntryId", "entries", "schema"]);

  const defaultEntry = manifest.entries.find((entry) => entry.id === manifest.defaultEntryId);
  assert.ok(defaultEntry);
  assert.equal(defaultEntry.isDefault, true);
  assert.equal(
    defaultEntry.documentPath,
    "content/contracts/examples/xyzzy/free_neutron_beta_decay.v1.json"
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
