#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { canonicalJson } from "../../src/archie-service/source-index/snapshot-v1.mjs";
import {
  MCP_FIXTURE_SERVER_NAME,
  MCP_PROTOCOL_VERSION,
} from "../../src/archie-service/mcp/fixture-stdio-adapter.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const mode = args.length === 1 ? args[0] : null;
const fixturePath = "tests/archie-service/fixtures/mcp/mcp-stdio-smoke.v1.json";
const snapshotPath = "tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json";
const corePath = "src/archie-service/mcp/fixture-stdio-adapter.mjs";
const launcherPath = "scripts/archie-service/run-fixture-mcp-server.mjs";

if (!["--check", "--write"].includes(mode)) {
  fail("Usage: node scripts/archie-service/check-fixture-mcp-server.mjs --check|--write");
}

const fixture = readJson(fixturePath);
const failures = [];
if (fixture.schema !== "archie-mcp-stdio-smoke/v1") failures.push("stdio smoke fixture has unexpected schema");
if (fixture.protocolVersion !== MCP_PROTOCOL_VERSION) failures.push("stdio smoke protocol version does not match adapter");
if (canonicalJson(fixture.serverCommand) !== canonicalJson(["node", launcherPath])) {
  failures.push("stdio smoke server command is not the owned fixture launcher");
}

const snapshotStatBefore = fs.statSync(path.join(rootDir, snapshotPath));
const input = fixture.cases.map((testCase) => JSON.stringify(testCase.message)).join("\n") + "\n";
const run = spawnSync(process.execPath, [launcherPath], {
  cwd: rootDir,
  input,
  encoding: "utf8",
  timeout: 5000,
  maxBuffer: 2 * 1024 * 1024,
});
const snapshotStatAfter = fs.statSync(path.join(rootDir, snapshotPath));

if (run.status !== 0) failures.push(`fixture MCP process exited ${run.status}: ${run.stderr.trim()}`);
if (run.stderr !== "") failures.push(`fixture MCP wrote unexpected stderr: ${run.stderr.trim()}`);
if (snapshotStatBefore.mtimeMs !== snapshotStatAfter.mtimeMs || snapshotStatBefore.size !== snapshotStatAfter.size) {
  failures.push("fixture MCP changed its snapshot artifact");
}

const responseLines = run.stdout.trim() === "" ? [] : run.stdout.trimEnd().split("\n");
const responses = [];
for (const [index, line] of responseLines.entries()) {
  try {
    responses.push(JSON.parse(line));
  } catch (error) {
    failures.push(`stdout line ${index + 1} is not one JSON-RPC message: ${error.message}`);
  }
}

const responseById = new Map(responses.map((response) => [String(response.id), response]));
const written = structuredClone(fixture);
for (const testCase of written.cases) {
  const hasId = Object.prototype.hasOwnProperty.call(testCase.message, "id");
  testCase.expectedResponse = hasId ? responseById.get(String(testCase.message.id)) ?? null : null;
}

if (mode === "--write") {
  fs.writeFileSync(path.join(rootDir, fixturePath), `${JSON.stringify(written, null, 2)}\n`);
  fixture.cases = written.cases;
}

const expectedResponseCount = fixture.cases.filter((testCase) =>
  Object.prototype.hasOwnProperty.call(testCase.message, "id")
).length;
if (responses.length !== expectedResponseCount) {
  failures.push(`expected ${expectedResponseCount} JSON-RPC responses, received ${responses.length}`);
}

for (const testCase of fixture.cases) {
  const hasId = Object.prototype.hasOwnProperty.call(testCase.message, "id");
  const actual = hasId ? responseById.get(String(testCase.message.id)) ?? null : null;
  if (canonicalJson(actual) !== canonicalJson(testCase.expectedResponse)) {
    failures.push(`${testCase.caseId}: stdio response drift`);
  }
}

validateSemanticEvidence();
validateStaticBoundaries();

if (failures.length > 0) {
  console.error(`Archie fixture MCP check failed with ${failures.length} error(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const action = mode === "--write" ? "write passed" : "check passed";
console.log(
  `Archie fixture MCP ${action}: ${fixture.smokeId}, initialize + five tools listed and called + missing-source error + unknown-tool rejection + ping`
);

function validateSemanticEvidence() {
  const byCase = new Map(fixture.cases.map((testCase) => [testCase.caseId, testCase.expectedResponse]));
  const initialize = byCase.get("mcp-stdio-initialize-001")?.result;
  if (initialize?.protocolVersion !== MCP_PROTOCOL_VERSION) failures.push("initialize did not negotiate owned protocol version");
  if (initialize?.serverInfo?.name !== MCP_FIXTURE_SERVER_NAME) failures.push("initialize returned unexpected server identity");
  if (initialize?.capabilities?.tools?.listChanged !== false) failures.push("initialize must declare a static tool catalog");

  const tools = byCase.get("mcp-stdio-tools-list-001")?.result?.tools ?? [];
  if (canonicalJson(tools.map((tool) => tool.name)) !== canonicalJson(["search", "read", "topics", "neighbors", "walk"])) {
    failures.push("tools/list did not return the five bounded tools in stable order");
  }
  for (const tool of tools) {
    if (
      tool.annotations?.readOnlyHint !== true ||
      tool.annotations?.destructiveHint !== false ||
      tool.annotations?.openWorldHint !== false ||
      tool.execution?.taskSupport !== "forbidden"
    ) {
      failures.push(`${tool.name}: tool annotations do not preserve the local read-only boundary`);
    }
  }

  const search = byCase.get("mcp-stdio-search-call-001")?.result;
  if (search?.isError !== false || search?.structuredContent?.status !== "ok") {
    failures.push("search tools/call did not return a successful structured result");
  }
  if (search?.structuredContent?.result?.records?.[0]?.source?.sourceId !== "source.ontology-purpose") {
    failures.push("search tools/call did not preserve canonical-source preference");
  }
  if (search?.content?.[0]?.text !== JSON.stringify(search?.structuredContent)) {
    failures.push("search tools/call text fallback does not mirror structured content");
  }

  const read = byCase.get("mcp-stdio-read-call-001")?.result;
  if (read?.isError !== false || read?.structuredContent?.result?.kind !== "read") {
    failures.push("read tools/call did not return a successful structured result");
  }
  const topics = byCase.get("mcp-stdio-topics-call-001")?.result;
  if (topics?.isError !== false || topics?.structuredContent?.result?.kind !== "topics") {
    failures.push("topics tools/call did not return a successful structured result");
  }
  const neighbors = byCase.get("mcp-stdio-neighbors-call-001")?.result;
  if (neighbors?.isError !== false || neighbors?.structuredContent?.result?.kind !== "neighbors") {
    failures.push("neighbors tools/call did not return a successful structured result");
  }
  const walk = byCase.get("mcp-stdio-walk-call-001")?.result;
  if (walk?.isError !== false || walk?.structuredContent?.result?.kind !== "walk") {
    failures.push("walk tools/call did not return a successful structured result");
  }

  const missing = byCase.get("mcp-stdio-read-missing-call-001")?.result;
  if (missing?.isError !== true || missing?.structuredContent?.error?.code !== "SOURCE_NOT_FOUND") {
    failures.push("missing read did not return a tool execution error");
  }
  const unknown = byCase.get("mcp-stdio-unknown-tool-001")?.error;
  if (unknown?.code !== -32602) failures.push("unknown tool did not return JSON-RPC invalid params");
}

function validateStaticBoundaries() {
  const core = fs.readFileSync(path.join(rootDir, corePath), "utf8");
  const launcher = fs.readFileSync(path.join(rootDir, launcherPath), "utf8");
  for (const forbidden of ["node:fs", "node:http", "node:https", "node:net", "node:child_process", "fetch(", "writeFile", "appendFile"]) {
    if (core.includes(forbidden)) failures.push(`fixture MCP core contains forbidden runtime surface ${forbidden}`);
  }
  const launcherReads = launcher.match(/readFileSync/g) ?? [];
  if (launcherReads.length !== 1) failures.push("fixture MCP launcher must read exactly one snapshot file at startup");
  for (const forbidden of ["writeFile", "appendFile", "fetch(", "node:http", "node:https", "node:net", "node:child_process"]) {
    if (launcher.includes(forbidden)) failures.push(`fixture MCP launcher contains forbidden runtime surface ${forbidden}`);
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
