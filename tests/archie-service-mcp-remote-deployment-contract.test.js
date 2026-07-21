import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyFixtureMutation,
  validateMcpRemoteDeploymentContract,
} from "../src/archie-service/mcp/remote-deployment-contract-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contract = readJson("tests/archie-service/fixtures/mcp/mcp-remote-deployment-contract.v1.json");
const negativeSuite = readJson("tests/archie-service/fixtures/mcp/mcp-remote-deployment-negative-suite.v1.json");
const candidateSnapshot = readJson(contract.snapshotPublication.candidatePath);

test("remote deployment contract is valid but deliberately not remote-ready", () => {
  assert.deepEqual(validateMcpRemoteDeploymentContract({ contract, candidateSnapshot }), []);
  assert.equal(contract.deploymentState, "fixture_only");
  assert.equal(contract.remoteReady, false);
  assert.equal(contract.publicDeploymentAuthorized, false);
  assert.equal(contract.host, null);
});

test("remote deployment negative fixtures fail with their named gate", () => {
  for (const testCase of negativeSuite.cases) {
    const mutated = applyFixtureMutation(contract, testCase.path, testCase.value);
    const codes = validateMcpRemoteDeploymentContract({ contract: mutated, candidateSnapshot }).map((error) => error.code);
    assert.ok(codes.includes(testCase.expectedCode), `${testCase.caseId}: ${codes.join(", ")}`);
  }
});

test("candidate snapshot identity and freshness are enforced", () => {
  const altered = structuredClone(candidateSnapshot);
  altered.snapshotSha256 = "0".repeat(64);
  const codes = validateMcpRemoteDeploymentContract({ contract, candidateSnapshot: altered }).map((error) => error.code);
  assert.ok(codes.includes("SNAPSHOT_IDENTITY_MISMATCH"));
});

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}
