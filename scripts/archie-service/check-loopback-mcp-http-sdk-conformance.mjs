#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  createLoopbackStreamableHttpAdapter,
  createLoopbackRollbackFixture,
  createStaticBearerAuthorizer,
  LOOPBACK_DEFAULT_ALLOWED_ORIGIN,
} from "../../src/archie-service/mcp/loopback-streamable-http-adapter.mjs";

const sdkRoot = readArgument("--sdk-root");
if (!sdkRoot) {
  fail("Usage: node scripts/archie-service/check-loopback-mcp-http-sdk-conformance.mjs --sdk-root <installed @modelcontextprotocol/sdk directory>");
}

const packageJson = readAbsoluteJson(path.join(sdkRoot, "package.json"));
requireCondition(packageJson.name === "@modelcontextprotocol/sdk", "SDK root is not @modelcontextprotocol/sdk");
const [{ Client }, { StreamableHTTPClientTransport }] = await Promise.all([
  import(pathToFileURL(path.join(sdkRoot, "dist/esm/client/index.js"))),
  import(pathToFileURL(path.join(sdkRoot, "dist/esm/client/streamableHttp.js"))),
]);

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const contract = readJson("tests/archie-service/fixtures/mcp/mcp-remote-deployment-contract.v1.json");
const activeSnapshot = readJson(contract.snapshotPublication.candidatePath);
const rollbackSnapshot = createLoopbackRollbackFixture(activeSnapshot);
const token = "loopback-sdk-fixture-token-v1";
const events = [];
const adapter = createLoopbackStreamableHttpAdapter({
  contract,
  activeSnapshot,
  rollbackSnapshot,
  authorize: createStaticBearerAuthorizer({ token, principalId: "official-sdk-fixture" }),
  allowedOrigins: [LOOPBACK_DEFAULT_ALLOWED_ORIGIN],
  logKey: crypto.randomBytes(32),
  logSink: (event) => events.push(event),
});
const address = await adapter.listen({ port: 0 });
const endpoint = new URL(`${address.url}/mcp`);
const transport = new StreamableHTTPClientTransport(endpoint, {
  requestInit: { headers: { Authorization: `Bearer ${token}` } },
});
const client = new Client({ name: "architrino-http-sdk-conformance", version: "1.0.0" }, { capabilities: {} });
const calls = [];

try {
  await client.connect(transport);
  requireCondition(client.getServerVersion()?.name === "architrino-full-corpus-mcp", "SDK received the wrong server identity");
  requireCondition(Boolean(client.getServerCapabilities()?.tools), "SDK did not negotiate tools");
  requireCondition(transport.sessionId === undefined, "stateless server unexpectedly assigned a session id");

  const listed = await client.listTools();
  const toolNames = listed.tools.map((tool) => tool.name);
  requireCondition(JSON.stringify(toolNames) === JSON.stringify(["search", "read", "topics", "neighbors", "walk"]), `unexpected tools: ${toolNames.join(", ")}`);

  const topics = await call("topics", {});
  const firstTopic = topics.structuredContent?.result?.records?.[0];
  requireCondition(typeof firstTopic?.sourceId === "string", "topics omitted an addressable source id");
  await call("search", { query: "Architrino" });
  await call("read", { topicOrRoute: firstTopic.sourceId });
  await call("neighbors", { topicOrRoute: firstTopic.sourceId });
  await call("walk", { topicOrRoute: firstTopic.sourceId, maxDepth: 2 });

  const missing = await client.callTool({ name: "read", arguments: { topicOrRoute: "missing-http-sdk-topic" } });
  requireCondition(missing.isError === true, "missing read did not return a tool-level error");
  requireCondition(missing.structuredContent?.error?.code === "SOURCE_NOT_FOUND", "missing read returned the wrong code");
  await client.ping();
  requireCondition(adapter.readiness().ready === true, "loopback readiness was not green after SDK calls");

  const serializedEvents = JSON.stringify(events);
  requireCondition(!serializedEvents.includes(token), "safe logs exposed the bearer token");
  requireCondition(!serializedEvents.includes("Architrino"), "safe logs exposed query text");

  process.stdout.write(`${JSON.stringify({
    schema: "archie-mcp-http-sdk-conformance-result/v1",
    status: "passed",
    sdk: { package: packageJson.name, version: packageJson.version },
    transport: "streamable_http",
    bindAddress: address.host,
    sessionMode: "stateless",
    server: client.getServerVersion(),
    snapshot: {
      snapshotId: activeSnapshot.snapshotId,
      snapshotSha256: activeSnapshot.snapshotSha256,
    },
    tools: toolNames,
    calls,
    missingRead: { isError: missing.isError, code: missing.structuredContent.error.code },
    ping: "passed",
    readiness: "ready",
    safeLogEvents: events.length,
    persistentClientConfigurationChanged: false,
  }, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`Architrino MCP HTTP SDK conformance failed: ${error.message}\n`);
  process.exitCode = 1;
} finally {
  await client.close().catch(() => {});
  await adapter.close().catch(() => {});
}

async function call(name, args) {
  const result = await client.callTool({ name, arguments: args });
  requireCondition(result.isError !== true, `${name} returned a tool-level error`);
  requireCondition(result.structuredContent?.schema === "archie-mcp-tool-response/v1", `${name} omitted the typed response`);
  requireCondition(result.structuredContent.status === "ok", `${name} returned ${result.structuredContent.status}`);
  calls.push({ name, status: result.structuredContent.status });
  return result;
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function readAbsoluteJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function fail(message) {
  process.stderr.write(`Architrino MCP HTTP SDK conformance failed: ${message}\n`);
  process.exit(1);
}
