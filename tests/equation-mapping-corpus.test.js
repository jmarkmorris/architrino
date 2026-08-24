import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildEquationMappingCorpus } from "../scripts/build-equation-mapping-corpus.mjs";
import {
  EQUATION_MAPPING_CORPUS_REGISTRY_SCHEMA,
  loadEquationMappingCorpusRecords,
  normalizeEquationMappingCorpusPayload,
} from "../src/apps/equation-mapping/EquationMappingCorpusLoader.js";
import {
  createEquationMappingDocuments,
  createEquationMappingRegistryApi,
} from "../src/apps/equation-mapping/EquationMappingRegistry.js";
import { EquationMappingRuntime } from "../src/apps/equation-mapping/EquationMappingRuntime.js";

const payload = JSON.parse(
  readFileSync(new URL("../content/generated/equation-mapping/corpus-equations.json", import.meta.url), "utf8")
);
const repoRoot = fileURLToPath(new URL("..", import.meta.url));

function listMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listMarkdownFiles(entryPath)
      : entryPath.endsWith(".md")
        ? [entryPath]
        : [];
  });
}

test("generated equation registry covers every corpus display equation", () => {
  const result = buildEquationMappingCorpus({
    rootDir: new URL("..", import.meta.url).pathname,
    mode: "check",
  });

  assert.equal(result.errors.length, 0);
  assert.equal(result.files, 198);
  assert.equal(result.equations, 4587);
  assert.equal(result.promoted, 23);
  assert.equal(result.symbolDefinitions, 29590);
});

test("every equation registry record is addressable, sourced, and symbol-defined", () => {
  const normalized = normalizeEquationMappingCorpusPayload(payload);
  const semanticIds = new Set(normalized.records.map((record) => record.semanticId));

  assert.equal(normalized.schema, EQUATION_MAPPING_CORPUS_REGISTRY_SCHEMA);
  assert.equal(normalized.records.length, 4587);
  assert.equal(semanticIds.size, normalized.records.length);
  assert.equal(normalized.records.filter((record) => record.promoted).length, 23);
  assert.equal(normalized.records.every((record) => record.source.sourcePath && record.source.sourceHeading), true);
  assert.equal(
    normalized.records.every((record) =>
      record.symbols.every((symbol) => symbol.tex && symbol.definition && symbol.scope && symbol.definitionSource)
    ),
    true
  );
});

test("corpus loader and public registry expose basic direct equation pages", async () => {
  const records = await loadEquationMappingCorpusRecords(async () => ({
    ok: true,
    async json() {
      return payload;
    },
  }));
  const api = createEquationMappingRegistryApi({ corpusRecords: records });
  const basicRecord = records.find((record) => !record.promoted);
  const page = api.get(basicRecord.semanticId);

  assert.equal(api.list().length, 4587);
  assert.equal(page.semanticId, basicRecord.semanticId);
  assert.equal(page.promoted, false);
  assert.equal(page.source.sourcePath, basicRecord.source.sourcePath);
  assert.equal(page.symbols.length, basicRecord.symbols.length);
  assert.equal(api.href(basicRecord.semanticId), `equation-mapping.html#${basicRecord.semanticId}`);
});

test("promotion changes carousel membership but not baseline equation access", () => {
  const documents = createEquationMappingDocuments(payload.records);
  const basicDocument = documents.find((document) => !document.promoted);
  const runtime = new EquationMappingRuntime({
    documents,
    initialDocumentId: basicDocument.id,
    document: {},
    window: {},
  });

  assert.equal(documents.length, 4587);
  assert.equal(runtime.getVisibleDocumentList().length, 4587);
  assert.equal(runtime.getCarouselDocumentList().length, 23);
  assert.equal(runtime.activeDocument.id, basicDocument.id);
  assert.equal(runtime.activeDocument.source.sourcePath, basicDocument.source.sourcePath);
  assert.equal(runtime.getDocumentByOffset(1), null);
});

test("hash navigation synchronizes an already-open equation page", () => {
  const documents = createEquationMappingDocuments(payload.records);
  const basicDocument = documents.find((document) => !document.promoted);
  const windowLike = { location: { hash: `#${basicDocument.id}` } };
  const runtime = new EquationMappingRuntime({
    documents,
    initialDocumentId: "causal-wake-per-hit-law",
    document: {},
    window: windowLike,
  });
  runtime.render = () => {};

  assert.equal(runtime.activeDocument.promoted, true);
  assert.equal(runtime.syncActiveDocumentFromLocation(), true);
  assert.equal(runtime.activeDocument.id, basicDocument.id);
  assert.equal(runtime.activeDocument.promoted, false);
});

test("every Equation Mapping link shipped in the iOS package has a public app route", () => {
  const packageRoot = path.join(repoRoot, "apps/ios/ArchitrinoReader/GeneratedTextbookPackage");
  const equationIds = new Set();
  listMarkdownFiles(packageRoot).forEach((markdownPath) => {
    const source = readFileSync(markdownPath, "utf8");
    for (const match of source.matchAll(/equation-mapping\.html#([^)\s]+)/gu)) {
      equationIds.add(decodeURIComponent(match[1]));
    }
  });
  const linkBundle = JSON.parse(readFileSync(path.join(packageRoot, "textbook_bundle_links.json"), "utf8"));
  const publicEquationIds = new Set(
    linkBundle.links
      .map((entry) => entry.targetBundlePath)
      .filter((target) => String(target).startsWith("https://architrino.com/equation-mapping.html#"))
      .map((target) => decodeURIComponent(target.split("#")[1]))
  );

  assert.equal(equationIds.size, 4543);
  assert.equal(publicEquationIds.size, equationIds.size);
  assert.deepEqual([...equationIds].filter((id) => !publicEquationIds.has(id)), []);
});
