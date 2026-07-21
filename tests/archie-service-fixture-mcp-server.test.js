import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  assertFixtureSnapshotBundle,
  createFixtureMcpSession,
  MCP_PROTOCOL_VERSION,
} from "../src/archie-service/mcp/fixture-stdio-adapter.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshot = readJson("tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json");

test("fixture MCP snapshot bundle verifies without source-repository reads", () => {
  assert.equal(assertFixtureSnapshotBundle(snapshot), true);
  const tampered = structuredClone(snapshot);
  tampered.views.content.records[0].content += "tamper";
  assert.throws(() => assertFixtureSnapshotBundle(tampered), /content view hash mismatch/);
});

test("fixture MCP lifecycle blocks tools until initialized notification", () => {
  const session = createFixtureMcpSession({ snapshot });
  const beforeInitialize = session.handle({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} });
  assert.equal(beforeInitialize.error.code, -32002);
  const initialize = session.handle({
    jsonrpc: "2.0",
    id: 2,
    method: "initialize",
    params: {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: "unit-client", version: "0.1.0" },
    },
  });
  assert.equal(initialize.result.protocolVersion, MCP_PROTOCOL_VERSION);
  const beforeNotification = session.handle({ jsonrpc: "2.0", id: 3, method: "tools/list", params: {} });
  assert.equal(beforeNotification.error.code, -32002);
  assert.equal(session.handle({ jsonrpc: "2.0", method: "notifications/initialized" }), null);
  const afterNotification = session.handle({
    jsonrpc: "2.0",
    id: 4,
    method: "tools/list",
    params: { _meta: { progressToken: "codex-list" } },
  });
  assert.deepEqual(afterNotification.result.tools.map((tool) => tool.name), ["search", "read", "topics", "neighbors"]);

  const toolCallWithMetadata = session.handle({
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: {
      name: "topics",
      arguments: {},
      _meta: { progressToken: "codex-call" },
    },
  });
  assert.equal(toolCallWithMetadata.result.structuredContent.status, "ok");

  const forbiddenTaskCall = session.handle({
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: { name: "topics", arguments: {}, task: { ttl: 1000 } },
  });
  assert.equal(forbiddenTaskCall.error.code, -32602);

  const malformedListMetadata = session.handle({
    jsonrpc: "2.0",
    id: 7,
    method: "tools/list",
    params: { _meta: "not-an-object" },
  });
  assert.equal(malformedListMetadata.error.code, -32602);

  const malformedCallMetadata = session.handle({
    jsonrpc: "2.0",
    id: 8,
    method: "tools/call",
    params: { name: "topics", arguments: {}, _meta: [] },
  });
  assert.equal(malformedCallMetadata.error.code, -32602);
});

test("fixture MCP stdio process completes the owned local smoke transcript", () => {
  const result = spawnSync("node", ["scripts/archie-service/check-fixture-mcp-server.mjs", "--check"], {
    cwd: rootDir,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie fixture MCP check passed/);
});

test("fixture MCP launcher resolves its snapshot outside the repository working directory", () => {
  const launcher = path.join(rootDir, "scripts/archie-service/run-fixture-mcp-server.mjs");
  const messages = [
    {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: { name: "outside-cwd-client", version: "0.1.0" },
      },
    },
    { jsonrpc: "2.0", method: "notifications/initialized" },
    { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
  ];
  const result = spawnSync("node", [launcher], {
    cwd: "/tmp",
    input: messages.map((message) => JSON.stringify(message)).join("\n") + "\n",
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const responses = result.stdout.trim().split("\n").map((line) => JSON.parse(line));
  assert.equal(responses[0].result.protocolVersion, MCP_PROTOCOL_VERSION);
  assert.deepEqual(responses[1].result.tools.map((tool) => tool.name), ["search", "read", "topics", "neighbors"]);
});

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}
