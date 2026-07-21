#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import {
  createFixtureMcpSession,
  jsonRpcError,
} from "../../src/archie-service/mcp/fixture-stdio-adapter.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const snapshotPath = path.join(
  rootDir,
  "tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json"
);

let snapshot;
try {
  snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
} catch (error) {
  process.stderr.write(`Architrino fixture MCP startup failed: ${error.message}\n`);
  process.exit(1);
}

let session;
try {
  session = createFixtureMcpSession({ snapshot, accessScope: "public" });
} catch (error) {
  process.stderr.write(`Architrino fixture MCP snapshot rejected: ${error.message}\n`);
  process.exit(1);
}

const lines = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });

lines.on("line", (line) => {
  let message;
  try {
    message = JSON.parse(line);
  } catch (error) {
    process.stdout.write(`${JSON.stringify(jsonRpcError(null, -32700, "Parse error", { detail: error.message }))}\n`);
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
