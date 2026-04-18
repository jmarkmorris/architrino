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
  normalizePdgeditDocument,
  preparePdgeditDocumentForDisplay,
  validatePdgeditDocumentTilePayload,
} from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";
import { createPdgeditLaunchPayload } from "../src/apps/pdgedit/PdgeditLaunchPayloadRuntime.js";
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

const PDGEDIT_EXAMPLE_PATHS = ["content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json"];
const FOUR_TILE_FAMILY_COVERAGE_PATH = "content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json";

const PDGEDIT_MANIFEST_PATH = "content/contracts/examples/pdgedit/manifest.v1.json";

test("pdgedit example documents match the versioned pdgedit schema", () => {
  const schema = readJson("src/contracts/pdgedit/v1/schema.json");

  PDGEDIT_EXAMPLE_PATHS.forEach((examplePath) => {
    const example = readJson(examplePath);
    const errors = validateAgainstSchema(example, schema);
    assert.deepEqual(errors, [], `${examplePath} schema mismatch`);
  });
});

test("pdgedit manifest test case matches the versioned manifest schema", () => {
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

    example.assemblies.forEach((assembly) => {
      assert.equal(
        assembly.type.endsWith("-composite"),
        false,
        `${examplePath} assembly row uses composite type: ${assembly.id}`
      );
    });

    example.compositeLabels.forEach((label) => {
      assert.equal(
        label.type.endsWith("-composite"),
        true,
        `${examplePath} composite label missing composite type suffix: ${label.id}`
      );
      assert.equal(
        label.rowStart <= label.rowEnd,
        true,
        `${examplePath} composite label row span inverted: ${label.id}`
      );
    });
  });
});

test("pdgedit examples include at least one explicit assembly payload for every current single-row four-tile review row", () => {
  const coveredRows = new Set();
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const allReviewRows = [
    ...reviewGroups.specialGroups,
    ...reviewGroups.singleRowGroups,
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
  assert.equal(manifest.defaultEntryId, "four_tile_family_coverage");
  assert.deepEqual(Object.keys(manifest).sort(), ["defaultEntryId", "entries", "schema"]);

  const defaultEntry = getPdgeditLibraryManifestEntryById(normalizedManifest, normalizedManifest.defaultEntryId);
  assert.ok(defaultEntry);
  assert.equal(defaultEntry.isDefault, true);
  assert.equal(defaultEntry.documentPath, FOUR_TILE_FAMILY_COVERAGE_PATH);

  manifest.entries.forEach((entry) => {
    assert.deepEqual(
      Object.keys(entry).sort(),
      entry.isDefault
        ? ["displayTitle", "documentPath", "id", "isDefault", "sourceKind", "title"]
        : ["displayTitle", "documentPath", "id", "sourceKind", "title"]
    );
    assert.equal(typeof entry.id, "string");
    assert.equal(typeof entry.title, "string");
    assert.equal(typeof entry.displayTitle, "string");
    assert.equal(["example", "exact", "unsolved"].includes(entry.sourceKind), true);
    assert.equal(typeof entry.documentPath, "string");
    assert.equal(entry.documentPath.endsWith(".v1.json"), true);
    assert.equal(fs.existsSync(new URL(`../${entry.documentPath}`, import.meta.url)), true, entry.documentPath);
  });
});

test("pdgedit manifest selection prefers the declared default, then the first entry", () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const selectedFromTestCase = selectDefaultPdgeditLibraryManifestEntry(manifest);
  const selectedFromDeclaredDefault = selectDefaultPdgeditLibraryManifestEntry({
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "secondary_document",
    entries: [
      {
        id: "primary_document",
        title: "Primary document",
        displayTitle: "Primary document",
        sourceKind: "example",
        documentPath: FOUR_TILE_FAMILY_COVERAGE_PATH,
      },
      {
        id: "secondary_document",
        title: "Secondary document",
        displayTitle: "Secondary document",
        sourceKind: "example",
        documentPath: FOUR_TILE_FAMILY_COVERAGE_PATH,
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
        sourceKind: "example",
        documentPath: FOUR_TILE_FAMILY_COVERAGE_PATH,
      },
      {
        id: "second_document",
        title: "Second document",
        displayTitle: "Second document",
        sourceKind: "example",
        documentPath: FOUR_TILE_FAMILY_COVERAGE_PATH,
      },
    ],
  });

  assert.equal(selectedFromTestCase?.id, "four_tile_family_coverage");
  assert.equal(selectedFromDeclaredDefault?.id, "secondary_document");
  assert.equal(selectedFromFirstEntry?.id, "first_document");
});

test("pdgedit library manifest preserves unsolved live entries as a distinct source kind", () => {
  const normalizedManifest = normalizePdgeditLibraryManifest({
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "review_reference_unsolved",
    entries: [
      {
        id: "review_reference_unsolved",
        title: "Review: reference unsolved",
        displayTitle: "Review: reference unsolved",
        sourceKind: "unsolved",
        documentPath: ".tmp/pdgsolve/pdgedit/documents/0001_reference_unsolved.pdgedit.v1.json",
      },
    ],
  });

  assert.equal(normalizedManifest.entries[0]?.sourceKind, "unsolved");
});

test("pdgedit library manifest preserves live picker probability and residue metadata", () => {
  const normalizedManifest = normalizePdgeditLibraryManifest({
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "mu_minus_s004_1",
    entries: [
      {
        id: "mu_minus_s004_1",
        title: "mu- decay mode 1",
        displayTitle: "mu- decay mode 1",
        sourceKind: "exact",
        documentPath: ".tmp/pdgsolve/pdgedit/documents/0001_mu_minus_s004_1.pdgedit.v1.json",
        branchingProbability: 0.999877,
        productUnboundArchitrinoCounts: {
          electrinoCount: 0,
          positrinoCount: 0,
        },
      },
    ],
  });

  assert.equal(normalizedManifest.entries[0]?.branchingProbability, 0.999877);
  assert.deepEqual(normalizedManifest.entries[0]?.productUnboundArchitrinoCounts, {
    electrinoCount: 0,
    positrinoCount: 0,
  });
});

test("pdgedit main bootstrap seed stays contract-first and separate from the review harness", async () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const liveManifest = { schema: "pdgedit-library-manifest/v1", defaultEntryId: "", entries: [] };
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
            return url.includes("/.tmp/pdgsolve/pdgedit/") ? liveManifest : manifest;
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
    new URL("../.tmp/pdgsolve/pdgedit/manifest.v1.json", import.meta.url).href,
    "https://architrino.local/content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
    FOUR_TILE_FAMILY_COVERAGE_PATH,
  ]);
  assert.deepEqual(loadedManifest, normalizePdgeditLibraryManifest(manifest));
  assert.deepEqual(loadedTileCatalog, normalizePdgeditTileCatalog(tileCatalog));
  assert.deepEqual(templateCatalog, normalizePdgeditTemplateCatalog(templateSource));
  assert.equal(selectedEntry?.id, "four_tile_family_coverage");
  assert.equal(source.includes("PdgeditTileReviewAppRuntime"), false);
  assert.equal(source.includes("createPdgeditAppRuntime"), true);
});

test("pdgedit bootstrap opens an explicit launch payload without reconstructing solver data", async () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const liveManifest = { schema: "pdgedit-library-manifest/v1", defaultEntryId: "", entries: [] };
  const tileCatalog = readJson("src/apps/pdgedit/pdgedit-tiles.json");
  const templateSource = readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json");
  const launchedDocument = readJson(FOUR_TILE_FAMILY_COVERAGE_PATH);
  const launchPayload = createPdgeditLaunchPayload({
    sourceKind: "developer",
    sourceReference: "reference:four_tile_family_coverage",
    documentId: "four_tile_family_coverage_launch",
    documentTitle: "Four tile family coverage launch",
    pdgeditDocument: launchedDocument,
  });
  const fetchCalls = [];
  const bootstrap = await loadPdgeditContractBootstrapSeed({
    manifestUrl: "https://architrino.local/content/contracts/examples/pdgedit/manifest.v1.json",
    tileCatalogUrl: "https://architrino.local/src/apps/pdgedit/pdgedit-tiles.json",
    templateCatalogUrl:
      "https://architrino.local/content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
    launchPayload,
    fetchImpl: async (url) => {
      fetchCalls.push(url);
      return {
        ok: true,
        json: async () => {
          if (url.endsWith("manifest.v1.json")) {
            return url.includes("/.tmp/pdgsolve/pdgedit/") ? liveManifest : manifest;
          }
          if (url.endsWith("pdgedit-tiles.json")) {
            return tileCatalog;
          }
          if (url.endsWith("four_tile_family_coverage.v1.json")) {
            return templateSource;
          }
          throw new Error(`unexpected document fetch ${url}`);
        },
      };
    },
  });

  assert.deepEqual(fetchCalls, [
    "https://architrino.local/src/apps/pdgedit/pdgedit-tiles.json",
    "https://architrino.local/content/contracts/examples/pdgedit/manifest.v1.json",
    new URL("../.tmp/pdgsolve/pdgedit/manifest.v1.json", import.meta.url).href,
    "https://architrino.local/content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
  ]);
  assert.equal(bootstrap.selectedEntry.id, "four_tile_family_coverage_launch");
  assert.equal(bootstrap.selectedEntry.displayTitle, "Four tile family coverage launch");
  assert.equal(bootstrap.selectedEntry.documentPath, "");
  assert.deepEqual(bootstrap.document, preparePdgeditDocumentForDisplay(launchedDocument));
  assert.deepEqual(bootstrap.launchPayload, launchPayload);
});

test("pdgedit bootstrap merges the live exact-reaction manifest into the picker manifest", async () => {
  const manifest = readJson(PDGEDIT_MANIFEST_PATH);
  const liveManifest = {
    schema: "pdgedit-library-manifest/v1",
    defaultEntryId: "mu_minus_s004_1",
    entries: [
      {
        id: "mu_minus_s004_1",
        title: "mu- decay mode 1",
        displayTitle: "mu- decay mode 1",
        sourceKind: "exact",
        documentPath: ".tmp/pdgsolve/pdgedit/documents/0001_mu_minus_s004_1.pdgedit.v1.json",
        branchingProbability: 0.999877,
        productUnboundArchitrinoCounts: {
          electrinoCount: 0,
          positrinoCount: 0,
        },
        isDefault: true,
      },
    ],
  };
  const tileCatalog = readJson("src/apps/pdgedit/pdgedit-tiles.json");
  const templateSource = readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json");
  const bootstrap = await loadPdgeditContractBootstrapSeed({
    manifestUrl: "https://architrino.local/content/contracts/examples/pdgedit/manifest.v1.json",
    liveManifestUrl: "https://architrino.local/.tmp/pdgsolve/pdgedit/manifest.v1.json",
    tileCatalogUrl: "https://architrino.local/src/apps/pdgedit/pdgedit-tiles.json",
    templateCatalogUrl:
      "https://architrino.local/content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json",
    fetchImpl: async (url) => ({
      ok: true,
      status: 200,
      json: async () => {
        if (url.endsWith("pdgedit-tiles.json")) {
          return tileCatalog;
        }
        if (url.endsWith("four_tile_family_coverage.v1.json")) {
          return templateSource;
        }
        if (url.includes("/.tmp/pdgsolve/pdgedit/manifest.v1.json")) {
          return liveManifest;
        }
        if (url.endsWith("content/contracts/examples/pdgedit/manifest.v1.json")) {
          return manifest;
        }
        if (url.endsWith("four_tile_family_coverage.v1.json")) {
          return readJson(FOUR_TILE_FAMILY_COVERAGE_PATH);
        }
        throw new Error(`unexpected fetch ${url}`);
      },
    }),
  });

  assert.equal(bootstrap.manifest.entries.some((entry) => entry.id === "mu_minus_s004_1"), true);
  assert.equal(bootstrap.manifest.defaultEntryId, "four_tile_family_coverage");
  assert.equal(
    bootstrap.manifest.entries.find((entry) => entry.id === "mu_minus_s004_1")?.sourceKind,
    "exact"
  );
  assert.equal(
    bootstrap.manifest.entries.find((entry) => entry.id === "mu_minus_s004_1")?.branchingProbability,
    0.999877
  );
});

test("pdgedit standalone surface keeps the link overlay transparent while preserving link hit targets", () => {
  const htmlSource = fs.readFileSync(new URL("../pdgedit.html", import.meta.url), "utf8");
  const runtimeSource = fs.readFileSync(new URL("../src/apps/pdgedit/PdgeditAppRuntime.js", import.meta.url), "utf8");

  assert.equal(htmlSource.includes("#pdgedit-link-overlay"), true);
  assert.equal(htmlSource.includes("pointer-events: none;"), true);
  assert.equal(htmlSource.includes(".pdgedit-link-hit-target"), true);
  assert.equal(htmlSource.includes("pointer-events: stroke;"), true);
  assert.match(
    htmlSource,
    /#pdgedit-object-layer\s*\{\s*z-index:\s*4;\s*\}[\s\S]*#pdgedit-link-overlay\s*\{\s*z-index:\s*3;/u
  );
  assert.equal(runtimeSource.includes('hitPath.setAttribute("pointer-events", "stroke")'), true);
});

test("pdgedit document picker keeps a dedicated touch-scroll option list", () => {
  const htmlSource = fs.readFileSync(new URL("../pdgedit.html", import.meta.url), "utf8");
  const runtimeSource = fs.readFileSync(new URL("../src/apps/pdgedit/PdgeditAppRuntime.js", import.meta.url), "utf8");

  assert.match(
    htmlSource,
    /#pdgedit-document-panel\s*\{[\s\S]*display:\s*flex;[\s\S]*overflow:\s*hidden;[\s\S]*touch-action:\s*pan-y;/u
  );
  assert.match(
    htmlSource,
    /\.pdgedit-document-option-list\s*\{[\s\S]*overflow-y:\s*auto;[\s\S]*touch-action:\s*pan-y;/u
  );
  assert.equal(runtimeSource.includes('className = "pdgedit-document-option-list"'), true);
});

test("pdgedit document picker exposes Exact 0:0 and Probability filters for live reaction search", () => {
  const htmlSource = fs.readFileSync(new URL("../pdgedit.html", import.meta.url), "utf8");
  const runtimeSource = fs.readFileSync(new URL("../src/apps/pdgedit/PdgeditAppRuntime.js", import.meta.url), "utf8");

  assert.equal(htmlSource.includes('data-source-filter="exact-zero-residue"'), true);
  assert.equal(htmlSource.includes("Exact 0:0"), true);
  assert.equal(htmlSource.includes('data-source-filter="probability"'), true);
  assert.equal(htmlSource.includes("Probability"), true);
  assert.equal(runtimeSource.includes('value === "exact-zero-residue" || value === "probability"'), true);
  assert.equal(runtimeSource.includes("formatPdgeditBranchingProbability"), true);
});
