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
const walkFixture = readJson("tests/archie-service/fixtures/mcp/mcp-walk-graph-suite.v1.json");

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

test("walk follows the fixture's breadth-first paths, suppresses cycles, and paginates deterministically", () => {
  const walkSnapshot = snapshotWithEdges(snapshot, walkFixture.graphEdges);
  const firstRequest = walkRequest(walkSnapshot, "walk-public-page-1", "public", walkFixture.publicRequest);
  const first = executeMcpTool({ snapshot: walkSnapshot, request: firstRequest, accessScope: "public" });
  assert.equal(first.status, "ok");
  assertWalkRecords(first.result.records, walkFixture.publicExpectedPages[0]);
  assert.equal(first.page.truncated, true);
  assert.ok(first.page.nextCursor);

  const secondRequest = structuredClone(firstRequest);
  secondRequest.requestId = "walk-public-page-2";
  secondRequest.arguments.cursor = first.page.nextCursor;
  const second = executeMcpTool({ snapshot: walkSnapshot, request: secondRequest, accessScope: "public" });
  assert.equal(second.status, "ok");
  assertWalkRecords(second.result.records, walkFixture.publicExpectedPages[1]);
  assert.equal(second.page.nextCursor, null);
  assert.equal(second.page.truncated, false);

  const allSourceIds = [...first.result.records, ...second.result.records].map((record) => record.source.sourceId);
  assert.equal(new Set(allSourceIds).size, allSourceIds.length);
  assert.ok(!allSourceIds.includes(first.result.origin.sourceId));
  for (const excludedSourceId of walkFixture.publicExcludedSourceIds) {
    assert.ok(!allSourceIds.includes(excludedSourceId));
  }
});

test("walk preserves operator-visible authority and excludes paths whose evidence is not public", () => {
  const walkSnapshot = snapshotWithEdges(snapshot, walkFixture.graphEdges);
  const publicRequest = walkRequest(walkSnapshot, "walk-public-authority", "public", walkFixture.operatorRequest);
  const publicResponse = executeMcpTool({ snapshot: walkSnapshot, request: publicRequest, accessScope: "public" });
  assert.equal(publicResponse.status, "ok");
  assert.ok(!publicResponse.result.records.some((record) => record.source.sourceId === "source.priority-mcp-contract"));

  const operatorRequest = walkRequest(walkSnapshot, "walk-operator-authority", "operator_developer", walkFixture.operatorRequest);
  const operatorResponse = executeMcpTool({ snapshot: walkSnapshot, request: operatorRequest, accessScope: "operator_developer" });
  assert.equal(operatorResponse.status, "ok");
  assertWalkRecords(operatorResponse.result.records, walkFixture.operatorExpectedRecords);
  const priority = operatorResponse.result.records.find((record) => record.source.sourceId === "source.priority-mcp-contract");
  assert.equal(priority.source.authorityStatus, "priority_only");
  assert.equal(priority.source.visibility, "development_status");
  assert.equal(priority.path.at(-1).evidenceSourceId, "source.priority-mcp-contract");
});

test("walk enforces depth, cursor scope, response, and traversal-node ceilings", () => {
  const walkSnapshot = snapshotWithEdges(snapshot, walkFixture.graphEdges);
  const invalidDepth = walkRequest(walkSnapshot, "walk-invalid-depth", "public", {
    ...walkFixture.publicRequest,
    maxDepth: MCP_TOOL_LIMITS.walk.maxDepth + 1,
  });
  const invalidDepthResponse = executeMcpTool({ snapshot: walkSnapshot, request: invalidDepth, accessScope: "public" });
  assert.equal(invalidDepthResponse.status, "invalid_request");

  const firstRequest = walkRequest(walkSnapshot, "walk-cursor-first", "public", walkFixture.publicRequest);
  const first = executeMcpTool({ snapshot: walkSnapshot, request: firstRequest, accessScope: "public" });
  const changedScope = structuredClone(firstRequest);
  changedScope.requestId = "walk-cursor-changed-scope";
  changedScope.arguments.maxDepth = 2;
  changedScope.arguments.cursor = first.page.nextCursor;
  const changedScopeResponse = executeMcpTool({ snapshot: walkSnapshot, request: changedScope, accessScope: "public" });
  assert.equal(changedScopeResponse.status, "invalid_cursor");
  assert.equal(changedScopeResponse.error.code, "CURSOR_SCOPE_MISMATCH");

  const largeSnapshot = syntheticStarSnapshot(snapshot, walkFixture.syntheticLimitCase.recordCount);
  const seen = [];
  let cursor = null;
  let finalResponse;
  do {
    const request = walkRequest(largeSnapshot, `walk-limit-page-${seen.length}`, "public", {
      topicOrRoute: "source.synthetic.origin",
      edgeTypes: ["related"],
      direction: "outgoing",
      maxDepth: 1,
      limit: MCP_TOOL_LIMITS.walk.maxItems,
      cursor,
    });
    finalResponse = executeMcpTool({ snapshot: largeSnapshot, request, accessScope: "public" });
    assert.equal(finalResponse.status, "ok");
    assert.ok(Buffer.byteLength(JSON.stringify(finalResponse)) <= MCP_TOOL_LIMITS.maxResponseBytes);
    seen.push(...finalResponse.result.records.map((record) => record.source.sourceId));
    cursor = finalResponse.page.nextCursor;
  } while (cursor);
  assert.equal(seen.length, walkFixture.syntheticLimitCase.expectedReturnedBeforePagination);
  assert.equal(new Set(seen).size, seen.length);
  assert.equal(finalResponse.result.traversalComplete, walkFixture.syntheticLimitCase.expectedTraversalComplete);
  assert.ok(finalResponse.page.truncationReasons.includes(walkFixture.syntheticLimitCase.expectedTruncationReason));
});

function walkRequest(subjectSnapshot, requestId, visibilityScope, args) {
  return {
    schema: "archie-mcp-tool-request/v1",
    requestId,
    tool: "walk",
    snapshotId: subjectSnapshot.snapshotId,
    visibilityScope,
    arguments: structuredClone(args),
  };
}

function snapshotWithEdges(subjectSnapshot, edges) {
  const result = structuredClone(subjectSnapshot);
  result.views.graph.edges = structuredClone(edges);
  return result;
}

function syntheticStarSnapshot(subjectSnapshot, recordCount) {
  const result = structuredClone(subjectSnapshot);
  const template = subjectSnapshot.views.search.records.find((record) => record.sourceId === "source.ontology-purpose");
  const origin = { ...structuredClone(template), sourceId: "source.synthetic.origin", route: "fixture:synthetic-origin" };
  const records = [origin];
  const edges = [];
  for (let index = 0; index < recordCount; index += 1) {
    const suffix = String(index).padStart(3, "0");
    const sourceId = `source.synthetic.${suffix}`;
    records.push({ ...structuredClone(template), sourceId, route: `fixture:synthetic-${suffix}` });
    edges.push({
      edgeId: `edge.synthetic.${suffix}`,
      from: origin.sourceId,
      to: sourceId,
      edgeType: "related",
      evidenceSourceId: origin.sourceId,
    });
  }
  result.views.search.records = records;
  result.views.graph.edges = edges;
  return result;
}

function assertWalkRecords(actual, expected) {
  assert.deepEqual(actual.map((record) => ({
    sourceId: record.source.sourceId,
    depth: record.depth,
    pathEdgeIds: record.path.map((step) => step.edgeId),
  })), expected);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}
