#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  applyFixtureMutation,
  validateMcpRemoteDeploymentContract,
} from "../../src/archie-service/mcp/remote-deployment-contract-v1.mjs";

const rootDir = process.cwd();
const contractPath = "tests/archie-service/fixtures/mcp/mcp-remote-deployment-contract.v1.json";
const negativePath = "tests/archie-service/fixtures/mcp/mcp-remote-deployment-negative-suite.v1.json";
const contract = readJson(contractPath);
const negativeSuite = readJson(negativePath);
const candidateSnapshot = readJson(contract.snapshotPublication.candidatePath);

const positiveErrors = validateMcpRemoteDeploymentContract({ contract, candidateSnapshot });
if (positiveErrors.length > 0) {
  fail(`positive fixture failed: ${positiveErrors.map(formatError).join("; ")}`);
}

if (negativeSuite.baseFixture !== contractPath) {
  fail(`negative suite points to ${negativeSuite.baseFixture}, expected ${contractPath}`);
}

const seenCaseIds = new Set();
for (const testCase of negativeSuite.cases) {
  if (seenCaseIds.has(testCase.caseId)) fail(`duplicate negative case id: ${testCase.caseId}`);
  seenCaseIds.add(testCase.caseId);
  const mutated = applyFixtureMutation(contract, testCase.path, testCase.value);
  const errors = validateMcpRemoteDeploymentContract({ contract: mutated, candidateSnapshot });
  if (!errors.some((error) => error.code === testCase.expectedCode)) {
    fail(`${testCase.caseId} did not produce ${testCase.expectedCode}; received ${errors.map(formatError).join("; ") || "no error"}`);
  }
}

process.stdout.write(
  `Architrino MCP remote deployment contract passed: fixture-only, remote-ready=false, ${negativeSuite.cases.length} case(s) with a Not advanced disposition\n`
);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function formatError(error) {
  return `${error.code}: ${error.message}`;
}

function fail(message) {
  process.stderr.write(`Architrino MCP remote deployment contract failed: ${message}\n`);
  process.exit(1);
}
