import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  MCP_TOOL_LIMITS,
  executeMcpTool,
} from "../src/archie-service/mcp/tool-contract-v1.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshot = readJson("tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json");
const contract = readJson("tests/archie-service/fixtures/mcp/mcp-tool-contract.v1.json");

test("mcp-tool-contract/v1 fixtures match the pure snapshot query engine", () => {
  for (const testCase of contract.cases) {
    const actual = executeMcpTool({
      snapshot,
      request: testCase.request,
      accessScope: testCase.accessScope,
    });
    assert.deepEqual(actual, testCase.expectedResponse, testCase.caseId);
    assert.ok(Buffer.byteLength(JSON.stringify(actual)) <= MCP_TOOL_LIMITS.maxResponseBytes);
  }
});

test("public search prefers the authored canonical source over routing copies", () => {
  const testCase = contract.cases.find((entry) => entry.caseId === "mcp-search-public-first-page-001");
  assert.equal(testCase.expectedResponse.result.records[0].source.sourceId, "source.ontology-purpose");
  assert.equal(testCase.expectedResponse.result.records[0].source.authorityStatus, "primary");
});

test("read pagination resumes exact snapshot content without repository access", () => {
  const testCase = contract.cases.find((entry) => entry.caseId === "mcp-read-public-truncated-001");
  const request = structuredClone(testCase.request);
  request.requestId = "request-read-public-continuation-001";
  request.arguments.cursor = testCase.expectedResponse.page.nextCursor;
  const response = executeMcpTool({ snapshot, request, accessScope: "public" });
  assert.equal(response.status, "ok");
  assert.equal(response.result.contentOffset, 256);
  assert.equal(response.result.source.selectionSha256, snapshot.views.content.records.find(
    (entry) => entry.sourceId === "source.ontology-purpose"
  ).selectionSha256);
});

test("priority material is hidden publicly and labeled when operator-visible", () => {
  const publicCase = contract.cases.find((entry) => entry.caseId === "mcp-read-priority-public-excluded-001");
  const operatorCase = contract.cases.find((entry) => entry.caseId === "mcp-read-priority-operator-visible-001");
  assert.equal(publicCase.expectedResponse.status, "excluded_visibility");
  assert.equal(publicCase.expectedResponse.result, null);
  assert.equal(operatorCase.expectedResponse.status, "ok");
  assert.equal(operatorCase.expectedResponse.result.source.authorityStatus, "priority_only");
  assert.equal(operatorCase.expectedResponse.result.source.visibility, "development_status");
});

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}
