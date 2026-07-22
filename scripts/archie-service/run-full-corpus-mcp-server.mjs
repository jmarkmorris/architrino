#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import {
  createMcpSession,
  jsonRpcError,
  MCP_FULL_CORPUS_SERVER_NAME,
  MCP_FULL_CORPUS_SERVER_VERSION,
} from "../../src/archie-service/mcp/fixture-stdio-adapter.mjs";
import {
  FULL_CORPUS_SNAPSHOT_PATH,
  FULL_CORPUS_VISIBILITY_POLICY_VERSION,
} from "../../src/archie-service/source-index/full-corpus-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const snapshotPath = path.join(rootDir, FULL_CORPUS_SNAPSHOT_PATH);

let snapshot;
try {
  snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
} catch (error) {
  process.stderr.write(`Architrino full-corpus MCP startup failed: ${error.message}\n`);
  process.exit(1);
}

let session;
try {
  session = createMcpSession({
    snapshot,
    accessScope: "public",
    expectedVisibilityPolicyVersion: FULL_CORPUS_VISIBILITY_POLICY_VERSION,
    serverInfo: {
      name: MCP_FULL_CORPUS_SERVER_NAME,
      title: "Architrino Full Corpus MCP",
      version: MCP_FULL_CORPUS_SERVER_VERSION,
      description: "Read-only local MCP adapter over one validated full-corpus Architrino snapshot.",
    },
  });
} catch (error) {
  process.stderr.write(`Architrino full-corpus MCP snapshot rejected: ${error.message}\n`);
  process.exit(1);
}

const lines = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
lines.on("line", (line) => {
  let message;
  try {
    message = JSON.parse(line);
  } catch (error) {
    process.stdout.write(
      `${JSON.stringify(jsonRpcError(null, -32700, "Parse error", { detail: error.message }))}\n`
    );
    return;
  }
  let response;
  try {
    response = session.handle(message);
  } catch (error) {
    response = jsonRpcError(message.id ?? null, -32603, "Internal error", { detail: error.message });
  }
  if (response !== null) process.stdout.write(`${JSON.stringify(response)}\n`);
});
