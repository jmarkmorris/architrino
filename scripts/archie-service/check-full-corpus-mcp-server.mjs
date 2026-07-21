#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  MCP_FULL_CORPUS_SERVER_NAME,
  MCP_PROTOCOL_VERSION,
} from "../../src/archie-service/mcp/fixture-stdio-adapter.mjs";
import { FULL_CORPUS_SNAPSHOT_PATH } from "../../src/archie-service/source-index/full-corpus-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const launcher = path.join(rootDir, "scripts/archie-service/run-full-corpus-mcp-server.mjs");
const snapshotPath = path.join(rootDir, FULL_CORPUS_SNAPSHOT_PATH);
const ontologyId = "source.published-corpus.content.markdown.aaa.foundations.ontology";
const messages = [
  {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: "full-corpus-smoke", version: "1.0.0" },
    },
  },
  { jsonrpc: "2.0", method: "notifications/initialized" },
  { jsonrpc: "2.0", id: 2, method: "tools/list", params: { _meta: { progressToken: "list" } } },
  {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: { name: "search", arguments: { query: "Ontology", limit: 3 }, _meta: { progressToken: "search" } },
  },
  {
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "read",
      arguments: {
        topicOrRoute: "content/markdown/aaa/foundations/ontology.md",
        sectionAnchor: "purpose-and-scope",
        maxContentChars: 512,
      },
    },
  },
  { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "topics", arguments: { limit: 2 } } },
  {
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: { name: "neighbors", arguments: { topicOrRoute: ontologyId, edgeTypes: ["contains"], limit: 3 } },
  },
  {
    jsonrpc: "2.0",
    id: 7,
    method: "tools/call",
    params: { name: "read", arguments: { topicOrRoute: "missing-full-corpus-source" } },
  },
  {
    jsonrpc: "2.0",
    id: 8,
    method: "tools/call",
    params: { name: "topics", arguments: {}, task: { ttl: 1000 } },
  },
];

const before = fs.statSync(snapshotPath);
const run = spawnSync(process.execPath, [launcher], {
  cwd: "/tmp",
  input: messages.map((message) => JSON.stringify(message)).join("\n") + "\n",
  encoding: "utf8",
  timeout: 15000,
  maxBuffer: 4 * 1024 * 1024,
});
const after = fs.statSync(snapshotPath);
requireCondition(run.status === 0, `server exited ${run.status}: ${run.stderr.trim()}`);
requireCondition(run.stderr === "", `server wrote unexpected stderr: ${run.stderr.trim()}`);
requireCondition(before.mtimeMs === after.mtimeMs && before.size === after.size, "server changed its snapshot");

const responses = run.stdout.trimEnd().split("\n").map((line) => JSON.parse(line));
const byId = new Map(responses.map((response) => [response.id, response]));
requireCondition(responses.length === 8, `expected 8 responses, received ${responses.length}`);
requireCondition(byId.get(1)?.result?.serverInfo?.name === MCP_FULL_CORPUS_SERVER_NAME, "wrong server identity");
requireCondition(
  JSON.stringify(byId.get(2)?.result?.tools?.map((tool) => tool.name)) ===
    JSON.stringify(["search", "read", "topics", "neighbors"]),
  "tool catalog differs from V1"
);

const search = structured(byId.get(3));
requireCondition(search.status === "ok", "search failed");
requireCondition(search.result.records[0].source.sourceId === ontologyId, "search did not prefer authored ontology");
const read = structured(byId.get(4));
requireCondition(read.status === "ok", "route-and-anchor read failed");
requireCondition(read.result.source.sectionAnchor === "purpose-and-scope", "read returned the wrong section");
requireCondition(read.result.metadata.some((record) => record.kind === "equation"), "read omitted equation metadata");
const topics = structured(byId.get(5));
requireCondition(topics.status === "ok" && topics.page.truncated === true, "topics did not paginate full volume");
requireCondition(
  topics.result.records.every((record) => record.sourceClass !== "priority_material"),
  "public topics leaked priority material"
);
const neighbors = structured(byId.get(6));
requireCondition(
  neighbors.status === "ok" && neighbors.result.records.some((record) => record.edgeType === "contains"),
  "neighbors omitted declared containment"
);
const missing = structured(byId.get(7));
requireCondition(missing.status === "not_found" && missing.error.code === "SOURCE_NOT_FOUND", "missing read did not fail closed");
requireCondition(byId.get(8)?.error?.code === -32602, "task-augmented call was not rejected");

for (const response of responses) {
  requireCondition(Buffer.byteLength(JSON.stringify(response), "utf8") <= 32768, `response ${response.id} exceeded ceiling`);
}

validateStaticBoundary();
process.stdout.write(
  "Archie full-corpus MCP check passed: outside-cwd launch, four tools, authored preference, route-and-anchor read, metadata, pagination, neighbors, missing source, and task rejection\n"
);

function structured(response) {
  return response?.result?.structuredContent;
}

function validateStaticBoundary() {
  const corePath = path.join(rootDir, "src/archie-service/mcp/fixture-stdio-adapter.mjs");
  const core = fs.readFileSync(corePath, "utf8");
  const launcherSource = fs.readFileSync(launcher, "utf8");
  for (const forbidden of ["node:fs", "node:http", "node:https", "node:net", "node:child_process", "fetch(", "writeFile", "appendFile"]) {
    requireCondition(!core.includes(forbidden), `MCP request core contains forbidden surface ${forbidden}`);
  }
  requireCondition((launcherSource.match(/readFileSync/g) ?? []).length === 1, "launcher must read exactly one snapshot");
  for (const forbidden of ["writeFile", "appendFile", "fetch(", "node:http", "node:https", "node:net", "node:child_process"]) {
    requireCondition(!launcherSource.includes(forbidden), `launcher contains forbidden surface ${forbidden}`);
  }
}

function requireCondition(condition, message) {
  if (!condition) {
    process.stderr.write(`Archie full-corpus MCP check failed: ${message}\n`);
    process.exit(1);
  }
}
