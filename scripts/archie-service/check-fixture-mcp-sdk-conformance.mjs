#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const sdkRoot = readArgument("--sdk-root");
if (!sdkRoot) {
  fail("Usage: node scripts/archie-service/check-fixture-mcp-sdk-conformance.mjs --sdk-root <installed @modelcontextprotocol/sdk directory>");
}

const packageJsonPath = path.join(sdkRoot, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
requireCondition(packageJson.name === "@modelcontextprotocol/sdk", "SDK root is not @modelcontextprotocol/sdk");

const [{ Client }, { StdioClientTransport }] = await Promise.all([
  import(pathToFileURL(path.join(sdkRoot, "dist/esm/client/index.js"))),
  import(pathToFileURL(path.join(sdkRoot, "dist/esm/client/stdio.js"))),
]);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const launcher = path.join(repoRoot, "scripts/archie-service/run-fixture-mcp-server.mjs");
const client = new Client({ name: "architrino-sdk-conformance", version: "1.0.0" }, { capabilities: {} });
const transport = new StdioClientTransport({ command: process.execPath, args: [launcher], cwd: "/tmp", stderr: "pipe" });
const stderrChunks = [];
transport.stderr?.on("data", (chunk) => stderrChunks.push(String(chunk)));

const calls = [];
try {
  await client.connect(transport);
  const serverVersion = client.getServerVersion();
  const capabilities = client.getServerCapabilities();
  requireCondition(serverVersion?.name === "architrino-fixture-mcp", "SDK received the wrong server identity");
  requireCondition(Boolean(capabilities?.tools), "SDK did not negotiate the tools capability");

  const listed = await client.listTools();
  const toolNames = listed.tools.map((tool) => tool.name);
  requireCondition(
    JSON.stringify(toolNames) === JSON.stringify(["search", "read", "topics", "neighbors"]),
    `SDK discovered unexpected tools: ${toolNames.join(", ")}`
  );

  const topics = await call("topics", {});
  const firstTopic = topics.structuredContent?.result?.records?.[0];
  requireCondition(typeof firstTopic?.sourceId === "string", "topics did not return an addressable source id");
  await call("search", { query: "Architrino" });
  await call("read", { topicOrRoute: firstTopic.sourceId });
  await call("neighbors", { topicOrRoute: firstTopic.sourceId });

  const missing = await client.callTool({ name: "read", arguments: { topicOrRoute: "missing-sdk-topic" } });
  requireCondition(missing.isError === true, "missing read did not return a tool-level error");
  requireCondition(missing.structuredContent?.error?.code === "SOURCE_NOT_FOUND", "missing read returned the wrong error code");
  await client.ping();

  process.stdout.write(`${JSON.stringify({
    schema: "archie-mcp-sdk-conformance-result/v1",
    status: "passed",
    sdk: { package: packageJson.name, version: packageJson.version },
    server: serverVersion,
    tools: toolNames,
    calls,
    missingRead: { isError: missing.isError, code: missing.structuredContent.error.code },
    ping: "passed",
  }, null, 2)}\n`);
} catch (error) {
  const stderr = stderrChunks.join("").trim();
  process.stderr.write(`Archie fixture MCP SDK conformance failed: ${error.message}${stderr ? `\nserver stderr:\n${stderr}` : ""}\n`);
  process.exitCode = 1;
} finally {
  await client.close().catch(() => {});
}

async function call(name, args) {
  const result = await client.callTool({ name, arguments: args });
  requireCondition(result.isError !== true, `${name} returned a tool-level error`);
  requireCondition(result.structuredContent?.schema === "archie-mcp-tool-response/v1", `${name} omitted the typed response`);
  requireCondition(result.structuredContent.status === "ok", `${name} returned a non-ok status`);
  calls.push({ name, status: result.structuredContent.status });
  return result;
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function fail(message) {
  process.stderr.write(`Archie fixture MCP SDK conformance failed: ${message}\n`);
  process.exit(1);
}
