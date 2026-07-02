#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  FixtureResponseSelectionError,
  selectFixtureResponse,
} from "../../src/archie-service/http/fixture-response-selector.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const contractPath = "tests/archie-service/fixtures/endpoints/endpoint-response-contracts.v1.json";
const failures = [];

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/check-fixture-service-stub.mjs --check");
}

const contract = readJson(contractPath);
const endpointCases = contract.endpointResponses ?? [];

for (const endpointCase of endpointCases) {
  validateSelection(endpointCase);
}
validateMissingRequestFixtureFailure();
validateUnknownEndpointFailure();

if (failures.length > 0) {
  console.error(`Archie fixture service stub check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie fixture service stub check passed: ${endpointCases.length} endpoint selection(s), side effects disabled`
);

function validateSelection(endpointCase) {
  let selection;
  try {
    selection = selectFixtureResponse({
      endpointId: endpointCase.endpointId,
      requestFixture: endpointCase.requestFixture,
      rootDir,
    });
  } catch (error) {
    failures.push(`${endpointCase.caseId}: selector threw ${error.message}`);
    return;
  }

  const label = endpointCase.caseId;
  if (selection.caseId !== endpointCase.caseId) {
    failures.push(`${label}: selected case ${selection.caseId}`);
  }
  if (selection.responseFixture !== endpointCase.responseFixture) {
    failures.push(`${label}: selected response fixture ${selection.responseFixture}`);
  }
  if (selection.responseSchema !== endpointCase.expectedSchema) {
    failures.push(`${label}: selected schema ${selection.responseSchema}`);
  }
  if (selection.response?.schema !== endpointCase.expectedSchema) {
    failures.push(`${label}: loaded response schema ${selection.response?.schema}`);
  }
  if (selection.responseKind !== endpointCase.responseKind) {
    failures.push(`${label}: selected response kind ${selection.responseKind}`);
  }
  if (selection.expectedDisposition !== endpointCase.expectedDisposition) {
    failures.push(`${label}: selected disposition ${selection.expectedDisposition}`);
  }
  if (selection.requestFixture !== endpointCase.requestFixture) {
    failures.push(`${label}: selected request fixture ${selection.requestFixture}`);
  }

  for (const [key, value] of Object.entries(selection.sideEffects)) {
    if (value !== false) {
      failures.push(`${label}: side effect ${key} must be disabled`);
    }
  }
}

function validateUnknownEndpointFailure() {
  try {
    selectFixtureResponse({
      endpointId: "POST /answers/{manifest_id}/actions/confirm",
      rootDir,
    });
    failures.push("unknown endpoint selection unexpectedly passed");
  } catch (error) {
    if (!(error instanceof FixtureResponseSelectionError)) {
      failures.push(`unknown endpoint selection threw unexpected error type: ${error.message}`);
      return;
    }
    if (error.details?.code !== "unknown_endpoint") {
      failures.push(`unknown endpoint selection returned code ${error.details?.code}`);
    }
  }
}

function validateMissingRequestFixtureFailure() {
  try {
    selectFixtureResponse({
      endpointId: "POST /answers",
      rootDir,
    });
    failures.push("missing request fixture selection unexpectedly passed");
  } catch (error) {
    if (!(error instanceof FixtureResponseSelectionError)) {
      failures.push(`missing request fixture selection threw unexpected error type: ${error.message}`);
      return;
    }
    if (error.details?.code !== "ambiguous_endpoint") {
      failures.push(`missing request fixture selection returned code ${error.details?.code}`);
    }
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
