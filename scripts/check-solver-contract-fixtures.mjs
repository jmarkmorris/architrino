#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const schemaPath = "src/contracts/solver-app-bridge/v1/schema.json";
const requestPath = "src/solver/fixtures/causal-roots-f64-smoke.request.json";
const batchResponsePath = "src/solver/fixtures/causal-root-batch-f64-smoke.response.json";
const responsePath = "src/solver/fixtures/roots-and-hits-f64-smoke.response.json";

const schema = readJson(schemaPath);
const request = readJson(requestPath);
const batchResponse = readJson(batchResponsePath);
const response = readJson(responsePath);

assert(schema.$id === "https://architrino.local/contracts/solver-app-bridge/v1/schema.json", "schema id mismatch");
assert(schema.$defs?.causalRootsF64Request, "request schema missing");
assert(schema.$defs?.rootLedgerDetailF64Request, "root-ledger detail request schema missing");
assert(schema.$defs?.rootLedgerDetailF64Response, "root-ledger detail response schema missing");
assert(schema.$defs?.rootLedgerDetailF64, "root-ledger detail row schema missing");
assert(schema.$defs?.precisionDiagnosticF64Request, "precision diagnostic request schema missing");
assert(schema.$defs?.precisionDiagnosticF64Response, "precision diagnostic response schema missing");
assert(schema.$defs?.precisionPathId, "precision path schema missing");
assert(schema.$defs?.numericTypeId, "numeric type schema missing");
assert(schema.$defs?.numericSerializationDescriptor, "numeric serialization descriptor schema missing");
assert(schema.$defs?.numericSerializationContract, "numeric serialization contract schema missing");
assert(schema.$defs?.magnitudeSummary, "magnitude summary schema missing");
assert(schema.$defs?.causalRootBatchF64Request, "batch request schema missing");
assert(schema.$defs?.causalRootBatchF64Response, "batch response schema missing");
assert(schema.$defs?.linearMotionSampleF64Request, "motion sample request schema missing");
assert(schema.$defs?.linearMotionSampleF64Response, "motion sample response schema missing");
assert(schema.$defs?.phaseAtHitF64Request, "phase-at-hit request schema missing");
assert(schema.$defs?.phaseAtHitF64Response, "phase-at-hit response schema missing");
assert(schema.$defs?.sharedGeometryF64Request, "shared geometry request schema missing");
assert(schema.$defs?.sharedGeometryF64Response, "shared geometry response schema missing");
assert(schema.$defs?.assemblyMembershipEventsF64Request, "assembly membership events request schema missing");
assert(schema.$defs?.assemblyMembershipEventsF64Response, "assembly membership events response schema missing");
assert(schema.$defs?.assemblyMembershipF64, "assembly membership row schema missing");
assert(schema.$defs?.assemblyEventF64, "assembly event row schema missing");
assert(schema.$defs?.buildSpaceTimeIndexF64Request, "space-time index build request schema missing");
assert(schema.$defs?.querySpaceTimeIndexF64Request, "space-time index query request schema missing");
assert(schema.$defs?.spaceTimeIndexF64Response, "space-time index response schema missing");
assert(schema.$defs?.pathHistoryRowF64, "path-history row schema missing");
assert(schema.$defs?.assemblyStateF64, "assembly state row schema missing");
assert(schema.$defs?.spaceTimeIndexRowF64, "space-time index row schema missing");
assert(schema.$defs?.workPacketHeader, "work packet header schema missing");
assert(schema.$defs?.workPacketBufferRef, "work packet buffer ref schema missing");
assert(schema.$defs?.rootsAndHitsF64Response, "response schema missing");
assert(schema.$defs?.bufferDescriptor, "buffer descriptor schema missing");
assert(schema.$defs?.streamDescriptor, "stream descriptor schema missing");
assertCoreBinaryLayouts([
  "frame_buffer.v1",
  "path_segment.v1",
  "assembly_state.v1",
  "assembly_membership.v1",
  "assembly_hierarchy.v1",
  "assembly_events.v1",
  "path_chunk.v1",
  "root_ledger.v1",
  "root_ledger_detail.v1",
  "delayed_hit_events.v1",
  "phase_at_hit.v1",
  "spacetime_index.v1",
  "stream_index.v1",
]);
assertNumericTypes(["f64", "scaled_i64", "interval_f64_pair", "decimal128", "mp_limb_block"]);

validateRequestEnvelope(request);
validateBatchResponseEnvelope(batchResponse);
validateResponseEnvelope(response);

console.log("solver contract fixtures check passed.");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function validateRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "request schema tag mismatch");
  assert(value.kind === "causal-roots-f64-request", "request kind mismatch");
  assertNonemptyString(value.requestId, "request id");
  const requestValue = value.request;
  assertSegment(requestValue.source, "source");
  assertSegment(requestValue.receiver, "receiver");
  assertPositiveFinite(requestValue.signalSpeed, "signal speed");
  assertFinite(requestValue.hitTime, "hit time");
  assertPositiveFinite(requestValue.rootTolerance, "root tolerance");
  assertPositiveInteger(requestValue.maxIterations, "max iterations");
  assertPositiveInteger(requestValue.scanSubdivisions, "scan subdivisions");
  assertPositiveInteger(requestValue.maxRoots, "max roots");
  assertPositiveInteger(requestValue.maxHits, "max hits");
}

function validateBatchResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "batch response schema tag mismatch");
  assert(value.kind === "causal-root-batch-f64-response", "batch response kind mismatch");
  assertNonemptyString(value.requestId, "batch response request id");
  const responseValue = value.response;
  assert(Array.isArray(responseValue.items), "batch items must be an array");
  assert(Array.isArray(responseValue.roots), "batch roots must be an array");
  assert(responseValue.items.length === 2, "batch response must contain two item rows");
  assert(responseValue.roots.length === 2, "batch response must contain two roots");
  assert(responseValue.items[0].itemIndex === 0, "first batch item index mismatch");
  assert(responseValue.items[0].rootOffset === 0, "first batch root offset mismatch");
  assert(responseValue.items[0].rootCount === 1, "first batch root count mismatch");
  assert(responseValue.items[1].itemIndex === 1, "second batch item index mismatch");
  assert(responseValue.items[1].rootOffset === 1, "second batch root offset mismatch");
  assert(responseValue.items[1].rootCount === 1, "second batch root count mismatch");
  assertClose(responseValue.items[0].roots[0].distance, 10, "first batch root distance");
  assertClose(responseValue.items[1].roots[0].distance, 6, "second batch root distance");
  assertBuffer(responseValue.buffers[0], "batch-root-ledger", "root_ledger.v1", 224, 2);
  assert(responseValue.status.code === "ok", "batch status code mismatch");
}

function validateResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "response schema tag mismatch");
  assert(value.kind === "roots-and-hits-f64-response", "response kind mismatch");
  assertNonemptyString(value.requestId, "response request id");
  const responseValue = value.response;
  assert(Array.isArray(responseValue.roots), "roots must be an array");
  assert(Array.isArray(responseValue.hits), "hits must be an array");
  assert(responseValue.roots.length === 1, "smoke response must contain one root");
  assert(responseValue.hits.length === 1, "smoke response must contain one hit");
  assertClose(responseValue.roots[0].emissionTime, 0, "root emission time");
  assertClose(responseValue.roots[0].distance, 10, "root distance");
  assertClose(responseValue.hits[0].unitDirection.x, 1, "hit unit direction x");
  assertClose(responseValue.hits[0].strength, 1, "hit strength");
  assertBuffer(responseValue.buffers[0], "root-ledger", "root_ledger.v1", 112, 1);
  assertBuffer(responseValue.buffers[1], "delayed-hit-events", "delayed_hit_events.v1", 128, 1);
  assert(responseValue.streams.length === 1, "expected one transient stream");
  const stream = responseValue.streams[0];
  assert(stream.indexLayout === "stream_index.v1", "stream index layout mismatch");
  assert(stream.availableRanges.length === 2, "stream ranges mismatch");
  assert(stream.storagePolicy.maxBytes === 240, "stream storage byte count mismatch");
  assert(responseValue.status.code === "ok", "status code mismatch");
}

function assertSegment(value, label) {
  assertFinite(value.startTime, `${label} start time`);
  assertFinite(value.endTime, `${label} end time`);
  assert(value.endTime >= value.startTime, `${label} time bounds`);
  assertVector(value.positionAtStart, `${label} position`);
  assertVector(value.velocity, `${label} velocity`);
}

function assertVector(value, label) {
  assertFinite(value.x, `${label} x`);
  assertFinite(value.y, `${label} y`);
  assertFinite(value.z, `${label} z`);
}

function assertBuffer(value, bufferId, layout, byteLength, rowCount) {
  assert(value.bufferId === bufferId, `${bufferId} id mismatch`);
  assert(value.layout === layout, `${bufferId} layout mismatch`);
  assert(value.rowCount === rowCount, `${bufferId} row count mismatch`);
  assert(value.byteLength === byteLength, `${bufferId} byte length mismatch`);
  assert(value.numericType === "f64", `${bufferId} numeric type mismatch`);
}

function assertCoreBinaryLayouts(expectedLayouts) {
  const actualLayouts = schema.$defs.coreBinaryLayoutId?.enum || [];
  for (const layout of expectedLayouts) {
    assert(actualLayouts.includes(layout), `core binary layout missing ${layout}`);
  }
}

function assertNumericTypes(expectedTypes) {
  const actualTypes = schema.$defs.numericTypeId?.enum || [];
  for (const numericType of expectedTypes) {
    assert(actualTypes.includes(numericType), `numeric type missing ${numericType}`);
  }
}

function assertNonemptyString(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be nonempty`);
}

function assertPositiveInteger(value, label) {
  assert(Number.isInteger(value) && value > 0, `${label} must be a positive integer`);
}

function assertPositiveFinite(value, label) {
  assertFinite(value, label);
  assert(value > 0, `${label} must be positive`);
}

function assertFinite(value, label) {
  assert(typeof value === "number" && Number.isFinite(value), `${label} must be finite`);
}

function assertClose(actual, expected, label) {
  assert(Math.abs(actual - expected) <= 1e-10, `${label} expected ${expected} got ${actual}`);
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
