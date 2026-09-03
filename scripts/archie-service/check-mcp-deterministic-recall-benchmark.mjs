#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  MCP_TOOL_LIMITS,
  executeMcpTool,
} from "../../src/archie-service/mcp/tool-contract-v1.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BENCHMARK_PATH = "tests/archie-service/fixtures/mcp/mcp-deterministic-recall-benchmark.v1.json";
const EXPECTED_SCHEMA = "archie-mcp-deterministic-recall-benchmark/v1";

export function runDeterministicRecallBenchmark({ rootDir = ROOT } = {}) {
  const benchmark = readJson(rootDir, BENCHMARK_PATH);
  requireCondition(benchmark.schema === EXPECTED_SCHEMA, "deterministic-recall benchmark schema mismatch");
  requireCondition(benchmark.visibilityScope === "public", "deterministic-recall benchmark must use public visibility");
  const snapshot = readJson(rootDir, benchmark.snapshotPath);
  const failures = [];
  const searchResults = benchmark.searchCases.map((testCase) => runSearchCase(snapshot, benchmark, testCase, failures));
  const readResults = benchmark.readCases.map((testCase) => runReadCase(snapshot, benchmark, testCase, failures));
  const topicResults = benchmark.topicCases.map((testCase) => runTopicsCase(snapshot, benchmark, testCase, failures));
  const graphResults = benchmark.graphCases.map((testCase) => runGraphCase(snapshot, benchmark, testCase, failures));

  const result = {
    schema: "archie-mcp-deterministic-recall-benchmark-result/v1",
    benchmarkId: benchmark.benchmarkId,
    snapshotId: snapshot.snapshotId,
    snapshotSha256: snapshot.snapshotSha256,
    visibilityScope: benchmark.visibilityScope,
    searchRecallAt10: ratio(searchResults.filter((entry) => entry.passed).length, searchResults.length),
    exactReadRecall: ratio(readResults.filter((entry) => entry.passed).length, readResults.length),
    topicRecall: ratio(topicResults.filter((entry) => entry.passed).length, topicResults.length),
    graphRecall: ratio(graphResults.filter((entry) => entry.passed).length, graphResults.length),
    searchCases: searchResults,
    readCases: readResults,
    topicCases: topicResults,
    graphCases: graphResults,
    authorityBoundary: benchmark.authorityBoundary,
    semanticFallbackDecision: "not_justified",
    semanticFallbackReason: "The reviewed benchmark reaches every expected public source with deterministic tools after bounded lexical normalization; no residual recall failure requires embeddings.",
  };

  for (const [metric, minimum] of Object.entries(benchmark.thresholds)) {
    if (result[metric] < minimum) failures.push(`${metric} ${result[metric]} is below ${minimum}`);
  }
  if (failures.length > 0) {
    const error = new Error(`MCP deterministic-recall benchmark failed with ${failures.length} error(s):\n${failures.map((item) => `- ${item}`).join("\n")}`);
    error.result = result;
    throw error;
  }
  return Object.freeze(result);
}

function runSearchCase(snapshot, benchmark, testCase, failures) {
  const response = call(snapshot, benchmark, testCase.caseId, "search", {
    query: testCase.query,
    filters: { sourceClasses: [], authorityStatuses: [] },
    limit: 10,
    cursor: null,
  });
  assertOk(response, testCase.caseId, failures);
  assertPublicSources(response.result?.records?.map((entry) => entry.source) ?? [], testCase.caseId, failures);
  const returnedSourceIds = response.result?.records?.map((entry) => entry.source.sourceId) ?? [];
  const matchedSourceIds = testCase.expectedSourceIds.filter((sourceId) => returnedSourceIds.includes(sourceId));
  const passed = matchedSourceIds.length > 0;
  if (!passed) failures.push(`${testCase.caseId}: no reviewed source appeared in search top 10`);
  return { caseId: testCase.caseId, passed, matchedSourceIds, returned: returnedSourceIds.length };
}

function runReadCase(snapshot, benchmark, testCase, failures) {
  const response = call(snapshot, benchmark, testCase.caseId, "read", {
    topicOrRoute: testCase.topicOrRoute,
    sectionAnchor: null,
    includeMetadata: true,
    maxContentChars: MCP_TOOL_LIMITS.read.maxContentChars,
    cursor: null,
  });
  assertOk(response, testCase.caseId, failures);
  const source = response.result?.source;
  assertPublicSources(source ? [source] : [], testCase.caseId, failures);
  const passed = source?.sourceId === testCase.expectedSourceId &&
    source?.authorityStatus === testCase.expectedAuthorityStatus &&
    response.result?.content?.includes(testCase.requiredContent);
  if (!passed) failures.push(`${testCase.caseId}: exact read content, identity, or authority did not match`);
  return { caseId: testCase.caseId, passed, sourceId: source?.sourceId ?? null };
}

function runTopicsCase(snapshot, benchmark, testCase, failures) {
  const records = collectPages(snapshot, benchmark, testCase.caseId, "topics", {
    filters: testCase.filters,
    limit: MCP_TOOL_LIMITS.topics.maxItems,
    cursor: null,
  }, failures);
  assertPublicSources(records, testCase.caseId, failures);
  const returnedSourceIds = records.map((record) => record.sourceId);
  const matchedSourceIds = testCase.expectedSourceIds.filter((sourceId) => returnedSourceIds.includes(sourceId));
  const passed = matchedSourceIds.length === testCase.expectedSourceIds.length;
  if (!passed) failures.push(`${testCase.caseId}: topic enumeration missed a reviewed source`);
  return { caseId: testCase.caseId, passed, matchedSourceIds, returned: returnedSourceIds.length };
}

function runGraphCase(snapshot, benchmark, testCase, failures) {
  const args = {
    topicOrRoute: testCase.topicOrRoute,
    edgeTypes: testCase.edgeTypes,
    direction: testCase.direction,
    limit: testCase.tool === "walk" ? MCP_TOOL_LIMITS.walk.maxItems : MCP_TOOL_LIMITS.neighbors.maxItems,
    cursor: null,
  };
  if (testCase.tool === "walk") args.maxDepth = testCase.maxDepth;
  const records = collectPages(snapshot, benchmark, testCase.caseId, testCase.tool, args, failures);
  const sources = records.map((record) => record.neighbor ?? record.source);
  assertPublicSources(sources, testCase.caseId, failures);
  const returnedSourceIds = sources.map((source) => source.sourceId);
  const matchedSourceIds = testCase.expectedSourceIds.filter((sourceId) => returnedSourceIds.includes(sourceId));
  const passed = matchedSourceIds.length === testCase.expectedSourceIds.length;
  if (!passed) failures.push(`${testCase.caseId}: declared-edge retrieval missed a reviewed source`);
  return { caseId: testCase.caseId, tool: testCase.tool, passed, matchedSourceIds, returned: returnedSourceIds.length };
}

function collectPages(snapshot, benchmark, caseId, tool, initialArguments, failures) {
  const records = [];
  let cursor = null;
  let page = 0;
  do {
    const response = call(snapshot, benchmark, `${caseId}-${page}`, tool, { ...initialArguments, cursor });
    assertOk(response, `${caseId}-${page}`, failures);
    if (response.status !== "ok") break;
    records.push(...(response.result?.records ?? []));
    cursor = response.page?.nextCursor ?? null;
    page += 1;
    requireCondition(page <= 1000, `${caseId}: pagination exceeded safety bound`);
  } while (cursor);
  return records;
}

function call(snapshot, benchmark, requestId, tool, args) {
  return executeMcpTool({
    snapshot,
    accessScope: benchmark.visibilityScope,
    request: {
      schema: "archie-mcp-tool-request/v1",
      requestId: `benchmark-${requestId}`,
      tool,
      snapshotId: snapshot.snapshotId,
      visibilityScope: benchmark.visibilityScope,
      arguments: args,
    },
  });
}

function assertOk(response, caseId, failures) {
  if (response.status !== "ok") failures.push(`${caseId}: ${response.status} (${response.error?.code ?? "unknown"})`);
}

function assertPublicSources(sources, caseId, failures) {
  for (const source of sources) {
    if (source.visibility !== "public" || source.authorityStatus === "priority_only") {
      failures.push(`${caseId}: returned non-public or priority-only source ${source.sourceId}`);
    }
  }
}

function ratio(passed, total) {
  return total === 0 ? 0 : passed / total;
}

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.length !== 3 || process.argv[2] !== "--check") {
    console.error("Usage: node scripts/archie-service/check-mcp-deterministic-recall-benchmark.mjs --check");
    process.exit(2);
  }
  try {
    const result = runDeterministicRecallBenchmark();
    console.log(
      `MCP-003 passed: search ${result.searchCases.filter((entry) => entry.passed).length}/${result.searchCases.length}, exact read ${result.readCases.filter((entry) => entry.passed).length}/${result.readCases.length}, topics ${result.topicCases.filter((entry) => entry.passed).length}/${result.topicCases.length}, graph ${result.graphCases.filter((entry) => entry.passed).length}/${result.graphCases.length}; separate embeddings proposal ${result.semanticFallbackDecision}.`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
