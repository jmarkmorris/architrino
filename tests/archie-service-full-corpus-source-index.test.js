import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  FULL_CORPUS_SNAPSHOT_PATH,
  buildFullCorpusSnapshot,
  enumerateFullCorpusBuildInput,
} from "../src/archie-service/source-index/full-corpus-v1.mjs";
import {
  buildSourceIndexSnapshot,
  validateSourceIndexSnapshot,
} from "../src/archie-service/source-index/snapshot-v1.mjs";
import { assertSnapshotBundle } from "../src/archie-service/mcp/fixture-stdio-adapter.mjs";
import { executeMcpTool } from "../src/archie-service/mcp/tool-contract-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(rootDir, FULL_CORPUS_SNAPSHOT_PATH);
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

test("full-corpus enumeration covers every declared authored Markdown document", () => {
  const input = enumerateFullCorpusBuildInput({ rootDir });
  const markdownFiles = JSON.parse(
    fs.readFileSync(path.join(rootDir, "content/markdown/markdown_index.json"), "utf8")
  ).files;
  assert.ok(markdownFiles.length >= 150);
  for (const sourcePath of markdownFiles) {
    const documents = input.sourceRecords.filter(
      (record) => record.sourcePath === sourcePath && record.sectionAnchor === null
    );
    assert.equal(documents.length, 1, sourcePath);
  }
  assert.equal(input.sourceRecords.some((record) => record.sourceClass === "priority_material"), false);
  assert.ok(input.sourceRecords.some((record) => record.sourceClass === "generated_reading_copy"));
  assert.ok(input.sourceRecords.some((record) => record.sourceClass === "scene_route"));
});

test("full-corpus snapshot is deterministic and input-order invariant", () => {
  const first = buildFullCorpusSnapshot({ rootDir });
  const second = buildFullCorpusSnapshot({ rootDir });
  assert.equal(first.snapshot.snapshotSha256, second.snapshot.snapshotSha256);
  assert.deepEqual(first.snapshot, snapshot);

  const reordered = structuredClone(first.input);
  reordered.sourceRecords.reverse();
  reordered.graphEdges.reverse();
  reordered.metadataRecords.reverse();
  const reorderedSnapshot = buildSourceIndexSnapshot({ rootDir, input: reordered });
  assert.equal(reorderedSnapshot.snapshotSha256, first.snapshot.snapshotSha256);
});

test("full-corpus check mode does not modify the stored snapshot", () => {
  const before = fs.statSync(snapshotPath);
  const run = spawnSync(
    process.execPath,
    ["scripts/archie-service/build-full-corpus-source-index.mjs", "--check"],
    { cwd: rootDir, encoding: "utf8", timeout: 15000 }
  );
  const after = fs.statSync(snapshotPath);
  assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
  assert.equal(after.mtimeMs, before.mtimeMs);
  assert.equal(after.size, before.size);
});

test("full-corpus snapshot preserves independent extraction and authority invariants", () => {
  assert.equal(validateSourceIndexSnapshot({ rootDir, snapshot }), true);
  assert.equal(assertSnapshotBundle(snapshot), true);
  assert.match(snapshot.repositoryRef, /^local-source-state:[a-f0-9]{64}$/);
  assert.equal(snapshot.sourceRecordCountByClass.priority_material, 0);
  assert.equal(snapshot.sourceRecordCountByClass.external_prior_physics, 0);

  const searchById = new Map(snapshot.views.search.records.map((record) => [record.sourceId, record]));
  for (const record of snapshot.views.search.records) {
    if (!["generated_reading_copy", "scene_route"].includes(record.sourceClass)) continue;
    assert.equal(searchById.get(record.canonicalParent)?.sourceClass, "published_corpus", record.sourceId);
  }

  const sectionId =
    "source.published-corpus.content.markdown.aaa.foundations.ontology.section.purpose-and-scope";
  const sourceText = fs.readFileSync(
    path.join(rootDir, "content/markdown/aaa/foundations/ontology.md"),
    "utf8"
  );
  const start = sourceText.indexOf("## Purpose and Scope");
  const next = sourceText.indexOf("\n## ", start + 1);
  const independentlySelected = sourceText.slice(start, next < 0 ? sourceText.length : next).trimEnd() + "\n";
  const content = snapshot.views.content.records.find((record) => record.sourceId === sectionId);
  assert.equal(content.content, independentlySelected);

  const equation = snapshot.views.metadata.records.find(
    (record) => record.sourceId === sectionId && record.kind === "equation"
  );
  assert.ok(equation.tex.startsWith("$$\n"));
  assert.ok(equation.tex.endsWith("\n$$"));
  assert.ok(sourceText.includes(equation.tex));
  const figure = snapshot.views.metadata.records.find(
    (record) =>
      record.sourceId ===
        "source.app-guide.content.markdown.aaa.archie.about.the.webapp.section.open-architrino" &&
      record.kind === "figure"
  );
  assert.equal(figure.altText, "Architrino logo and QR code for architrino.com");
  assert.ok(fs.existsSync(path.join(rootDir, figure.assetPath)));
});

test("full-corpus reads support exact route anchors, pagination, and Unicode code points", () => {
  const direct = call("read", {
    topicOrRoute: "source.published-corpus.content.markdown.aaa.foundations.ontology",
    sectionAnchor: null,
    maxContentChars: 256,
    cursor: null,
    includeMetadata: false,
  });
  assert.equal(direct.status, "ok");

  const anchored = call("read", {
    topicOrRoute: "content/markdown/aaa/foundations/ontology.md",
    sectionAnchor: "purpose-and-scope",
    maxContentChars: 256,
    cursor: null,
    includeMetadata: true,
  });
  assert.equal(anchored.status, "ok");
  assert.equal(anchored.result.source.sectionAnchor, "purpose-and-scope");
  const missingAnchor = call("read", {
    topicOrRoute: "content/markdown/aaa/foundations/ontology.md",
    sectionAnchor: "missing-anchor",
    maxContentChars: 256,
    cursor: null,
    includeMetadata: false,
  });
  assert.equal(missingAnchor.status, "not_found");

  const firstTopics = call("topics", {
    filters: { sourceClasses: [], authorityStatuses: [] },
    limit: 1,
    cursor: null,
  });
  const secondTopics = call("topics", {
    filters: { sourceClasses: [], authorityStatuses: [] },
    limit: 1,
    cursor: firstTopics.page.nextCursor,
  });
  assert.equal(firstTopics.page.truncated, true);
  assert.notEqual(
    firstTopics.result.records[0].sourceId,
    secondTopics.result.records[0].sourceId
  );

  const wrongScopeCursor = call("search", {
    query: "Ontology",
    filters: { sourceClasses: [], authorityStatuses: [] },
    limit: 1,
    cursor: firstTopics.page.nextCursor,
  });
  assert.equal(wrongScopeCursor.status, "invalid_cursor");

  const unicodeId =
    "source.published-corpus.content.markdown.aaa.philosophy.history.theory.bridges.weak.mixing.ckm.section.geometric-picture-of-ckm";
  const unicodeContent = snapshot.views.content.records.find((record) => record.sourceId === unicodeId).content;
  const unicodeOffset = Array.from(unicodeContent).findIndex((character) => character === "𝒪");
  assert.ok(unicodeOffset >= 256 && unicodeOffset <= 8000);
  const first = call("read", {
    topicOrRoute: unicodeId,
    sectionAnchor: null,
    maxContentChars: unicodeOffset,
    cursor: null,
    includeMetadata: false,
  });
  assert.equal(Array.from(first.result.content).length, unicodeOffset);
  assert.equal(first.page.truncated, true);
  const second = call("read", {
    topicOrRoute: unicodeId,
    sectionAnchor: null,
    maxContentChars: unicodeOffset,
    cursor: first.page.nextCursor,
    includeMetadata: false,
  });
  assert.equal(Array.from(second.result.content)[0], "𝒪");
});

test("full-corpus negative inputs and altered bundles fail closed", () => {
  const input = enumerateFullCorpusBuildInput({ rootDir });
  input.sourceRecords.push(structuredClone(input.sourceRecords[0]));
  assert.throws(() => buildSourceIndexSnapshot({ rootDir, input }), /duplicate source record/);

  const tampered = structuredClone(snapshot);
  tampered.views.search.records[0].authorityStatus = "primary";
  assert.throws(() => assertSnapshotBundle(tampered), /search view hash mismatch/);
});

function call(tool, argumentsValue) {
  return executeMcpTool({
    snapshot,
    accessScope: "public",
    request: {
      schema: "archie-mcp-tool-request/v1",
      requestId: `test-${tool}`,
      tool,
      snapshotId: snapshot.snapshotId,
      visibilityScope: "public",
      arguments: argumentsValue,
    },
  });
}
