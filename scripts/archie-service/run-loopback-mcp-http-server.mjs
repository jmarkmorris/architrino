#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createLoopbackStreamableHttpAdapter,
  createLoopbackRollbackFixture,
  createStaticBearerAuthorizer,
  LOOPBACK_DEFAULT_ALLOWED_ORIGIN,
} from "../../src/archie-service/mcp/loopback-streamable-http-adapter.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const contract = readJson("tests/archie-service/fixtures/mcp/mcp-remote-deployment-contract.v1.json");
const activeSnapshot = readJson(contract.snapshotPublication.candidatePath);
const rollbackSnapshot = createLoopbackRollbackFixture(activeSnapshot);
const token = process.env.ARCHITRINO_MCP_LOCAL_TOKEN;
const allowedOrigin = process.env.ARCHITRINO_MCP_LOCAL_ALLOWED_ORIGIN ?? LOOPBACK_DEFAULT_ALLOWED_ORIGIN;
const port = parsePort(readArgument("--port") ?? "0");

if (typeof token !== "string" || token.length < 16) {
  fail("set ARCHITRINO_MCP_LOCAL_TOKEN to a local bearer token containing at least 16 characters");
}

const adapter = createLoopbackStreamableHttpAdapter({
  contract,
  activeSnapshot,
  rollbackSnapshot,
  authorize: createStaticBearerAuthorizer({ token }),
  allowedOrigins: [allowedOrigin],
  logKey: crypto.randomBytes(32),
});

try {
  await adapter.listen({ port });
} catch (error) {
  fail(`startup failed: ${error.message}`);
}

const startedAt = Date.now();
const heartbeat = setInterval(() => {
  const snapshot = adapter.activeSnapshotIdentity();
  adapter.emitOperationalEvent("server_heartbeat", {
    duration_ms: Date.now() - startedAt,
    snapshot_id: snapshot.snapshot_id,
    snapshot_sha256: snapshot.snapshot_sha256,
  });
}, 30000);

process.once("SIGINT", () => void shutdown(0));
process.once("SIGTERM", () => void shutdown(0));

async function shutdown(exitCode) {
  clearInterval(heartbeat);
  try {
    await adapter.close();
  } finally {
    process.exit(exitCode);
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function readArgument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function parsePort(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) {
    fail("--port must be an integer in 0..65535");
  }
  return parsed;
}

function fail(message) {
  process.stderr.write(`Architrino loopback MCP HTTP server failed: ${message}\n`);
  process.exit(1);
}
