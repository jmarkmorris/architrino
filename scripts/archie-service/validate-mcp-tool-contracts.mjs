#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  MCP_TOOL_CONTRACT_SCHEMA,
  MCP_TOOL_LIMITS,
  MCP_TOOL_NEGATIVE_SUITE_SCHEMA,
  assertMcpToolPair,
  executeMcpTool,
} from "../../src/archie-service/mcp/tool-contract-v1.mjs";
import { canonicalJson } from "../../src/archie-service/source-index/snapshot-v1.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const mode = args.length === 1 ? args[0] : null;
const contractPath = "tests/archie-service/fixtures/mcp/mcp-tool-contract.v1.json";
const negativePath = "tests/archie-service/fixtures/mcp/mcp-tool-negative-suite.v1.json";
const snapshotPath = "tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json";

if (!["--check", "--write"].includes(mode)) {
  fail("Usage: node scripts/archie-service/validate-mcp-tool-contracts.mjs --check|--write");
}

const snapshot = readJson(snapshotPath);
const contract = readJson(contractPath);
const negativeSuite = readJson(negativePath);
const failures = [];

if (contract.schema !== MCP_TOOL_CONTRACT_SCHEMA) failures.push("MCP tool contract has unexpected schema");
if (contract.snapshotId !== snapshot.snapshotId) failures.push("MCP tool contract snapshotId does not match snapshot");
if (negativeSuite.schema !== MCP_TOOL_NEGATIVE_SUITE_SCHEMA) failures.push("MCP tool negative suite has unexpected schema");

const expectedLimits = {
  maxQueryChars: MCP_TOOL_LIMITS.maxQueryChars,
  maxIdentifierChars: MCP_TOOL_LIMITS.maxIdentifierChars,
  maxItems: MCP_TOOL_LIMITS.search.maxItems,
  minReadContentChars: MCP_TOOL_LIMITS.read.minContentChars,
  maxReadContentChars: MCP_TOOL_LIMITS.read.maxContentChars,
  maxResponseBytes: MCP_TOOL_LIMITS.maxResponseBytes,
};
if (canonicalJson(contract.limits) !== canonicalJson(expectedLimits)) {
  failures.push("MCP tool contract limits do not match the executable limits");
}

const cases = contract.cases ?? [];
const caseById = new Map();
for (const testCase of cases) {
  if (caseById.has(testCase.caseId)) {
    failures.push(`duplicate MCP tool case ${testCase.caseId}`);
    continue;
  }
  caseById.set(testCase.caseId, testCase);
}

if (mode === "--write") {
  const written = structuredClone(contract);
  for (const testCase of written.cases) {
    testCase.expectedResponse = executeMcpTool({
      snapshot,
      request: testCase.request,
      accessScope: testCase.accessScope,
    });
  }
  fs.writeFileSync(path.join(rootDir, contractPath), `${JSON.stringify(written, null, 2)}\n`);
  contract.cases = written.cases;
  caseById.clear();
  for (const testCase of contract.cases) caseById.set(testCase.caseId, testCase);
}

for (const testCase of contract.cases ?? []) {
  try {
    assertMcpToolPair({
      snapshot,
      request: testCase.request,
      response: testCase.expectedResponse,
      accessScope: testCase.accessScope,
    });
  } catch (error) {
    failures.push(error.message);
  }
}

validateNegativeSuite();
validatePaginationContinuations();

if (failures.length > 0) {
  console.error(`Archie MCP tool-contract check failed with ${failures.length} error(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const action = mode === "--write" ? "write passed" : "check passed";
console.log(
  `Archie MCP tool-contract ${action}: ${contract.contractId}, ${contract.cases.length} positive case(s), ${negativeSuite.cases.length} fail-closed case(s), four bounded tools`
);

function validateNegativeSuite() {
  const seen = new Set();
  for (const testCase of negativeSuite.cases ?? []) {
    if (seen.has(testCase.caseId)) {
      failures.push(`duplicate MCP tool negative case ${testCase.caseId}`);
      continue;
    }
    seen.add(testCase.caseId);
    const baseCase = caseById.get(testCase.baseCaseId);
    if (!baseCase) {
      failures.push(`${testCase.caseId}: missing base case ${testCase.baseCaseId}`);
      continue;
    }
    const request = structuredClone(baseCase.request);
    const subjectSnapshot = structuredClone(snapshot);
    if (testCase.requestMutation) applyMutation(request, testCase.requestMutation);
    if (testCase.snapshotMutation) applyMutation(subjectSnapshot, testCase.snapshotMutation);
    const response = executeMcpTool({
      snapshot: subjectSnapshot,
      request,
      accessScope: testCase.accessScope,
    });
    if (response.status !== testCase.expectedStatus) {
      failures.push(
        `${testCase.caseId}: expected status ${testCase.expectedStatus}, received ${response.status}`
      );
    }
    if (response.error?.code !== testCase.expectedErrorCode) {
      failures.push(
        `${testCase.caseId}: expected error ${testCase.expectedErrorCode}, received ${response.error?.code}`
      );
    }
    if (response.result !== null || response.page !== null) {
      failures.push(`${testCase.caseId}: fail-closed response must not return result or page data`);
    }
  }
}

function validatePaginationContinuations() {
  for (const caseId of [
    "mcp-search-public-first-page-001",
    "mcp-read-public-truncated-001",
    "mcp-topics-public-first-page-001",
    "mcp-neighbors-public-first-page-001",
  ]) {
    const firstCase = caseById.get(caseId);
    if (!firstCase) continue;
    const cursor = firstCase.expectedResponse?.page?.nextCursor;
    if (!cursor) {
      failures.push(`${caseId}: expected a bounded first page with nextCursor`);
      continue;
    }
    const request = structuredClone(firstCase.request);
    request.requestId = `${request.requestId}-continuation`;
    request.arguments.cursor = cursor;
    const continuation = executeMcpTool({
      snapshot,
      request,
      accessScope: firstCase.accessScope,
    });
    if (continuation.status !== "ok") {
      failures.push(`${caseId}: nextCursor did not resume successfully`);
      continue;
    }
    const expectedOffset = firstCase.expectedResponse.page.returned;
    if (request.tool === "read" && continuation.result.contentOffset !== expectedOffset) {
      failures.push(`${caseId}: read cursor did not resume at character ${expectedOffset}`);
    }
    if (request.tool !== "read") {
      const firstReturned = firstCase.expectedResponse.page.returned;
      const continuedFirst = continuation.result.records?.[0];
      if (!continuedFirst) {
        failures.push(`${caseId}: continuation returned no record after first ${firstReturned}`);
      }
    }
  }
}

function applyMutation(subject, mutation) {
  if (mutation.operation !== "set") throw new Error(`unsupported mutation ${mutation.operation}`);
  let target = subject;
  for (const part of mutation.path.slice(0, -1)) {
    if (target?.[part] === undefined) throw new Error(`mutation path missing at ${String(part)}`);
    target = target[part];
  }
  target[mutation.path.at(-1)] = mutation.value;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
