import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

import {AAAClient, AAAClientService} from "../src/aaa-core/client-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const CLIENT_CONTRACT = readJson("reference/priorities/app-aaa-core/aaa-core-client.v0.json");
const PATH_CONTRACT = readJson("reference/priorities/app-aaa-core/aaa-core-path-interchange.v0.json");
const CODECS = readJson("reference/priorities/app-aaa-core/aaa-core-codec-registry.v0.json");
const STREAM_CONTRACT = readJson("reference/priorities/app-aaa-core/aaa-core-accepted-history-stream.v0.json");
const QUERY_CONTRACT = readJson("reference/priorities/app-aaa-core/aaa-core-query-transform-publication.v0.json");
const FIXTURE = readJson(CLIENT_CONTRACT.conformance.fixtures);
const PATH_FIXTURES = readJson(FIXTURE.pathFixtureSuite);
const STREAM_FIXTURES = readJson(FIXTURE.streamFixtureSuite);
const QUERY_FIXTURES = readJson(FIXTURE.queryFixtureSuite);
const sourceBundle = PATH_FIXTURES.cases.find((candidate) => candidate.caseId === FIXTURE.sourceCaseId);
const streamCase = STREAM_FIXTURES.cases.find((candidate) => candidate.caseId === FIXTURE.streamCaseId);
const queryCase = QUERY_FIXTURES.cases.find((candidate) => candidate.caseId === FIXTURE.queryCaseId);

function setup() {
  const service = new AAAClientService({clientContract: CLIENT_CONTRACT, pathContract: PATH_CONTRACT,
    codecRegistry: CODECS, streamContract: STREAM_CONTRACT, queryPublicationContract: QUERY_CONTRACT});
  const clients = FIXTURE.clients.map((identity) => service.createClient(identity));
  return {service, potential: clients[0], equationMapping: clients[1]};
}

test("Potential and Equation Mapping receive the same client implementation and operation surface", () => {
  const {potential, equationMapping} = setup();
  assert.ok(potential instanceof AAAClient);
  assert.ok(equationMapping instanceof AAAClient);
  assert.equal(potential.constructor, equationMapping.constructor);
  for (const operation of CLIENT_CONTRACT.operations) assert.equal(typeof potential[operation], "function");
});

test("both applications validate and normalize through Core without local path logic", () => {
  const {potential, equationMapping} = setup();
  const potentialManifest = potential.validateManifest(sourceBundle);
  const equationManifest = equationMapping.validateManifest(sourceBundle);
  assert.equal(potentialManifest.state, "succeeded");
  assert.deepEqual(potentialManifest.result, equationManifest.result);
  const potentialQuery = potential.prepareQuery(queryCase.request);
  const equationQuery = equationMapping.prepareQuery(queryCase.equivalentRequest);
  assert.equal(potentialQuery.result.cacheIdentity, equationQuery.result.cacheIdentity);
});

test("equivalent sealed publication is reused and retrieved by the second application", () => {
  const {potential, equationMapping} = setup();
  const base = {sourceBundle, publisher: queryCase.publisher, permittedConsumers: queryCase.permittedConsumers, state: "sealed"};
  const first = potential.publish({...base, request: queryCase.request});
  const second = potential.publish({...base, request: queryCase.equivalentRequest});
  assert.equal(first.state, "succeeded");
  assert.equal(first.result.cacheStatus, FIXTURE.expected.firstPublicationCacheStatus);
  assert.equal(second.result.cacheStatus, FIXTURE.expected.equivalentPublicationCacheStatus);
  assert.equal(first.result.publication.receipt.productContentSha256, second.result.publication.receipt.productContentSha256);
  const receipt = first.result.publication.receipt;
  const retrieved = equationMapping.retrieve({productId: receipt.productId,
    productContentSha256: receipt.productContentSha256, receiptSha256: receipt.receiptSha256});
  assert.equal(retrieved.state, "succeeded");
  assert.equal(retrieved.result.product.contentSha256, receipt.productContentSha256);
});

test("both clients subscribe through one shared accepted-history session", () => {
  const {service, potential, equationMapping} = setup();
  const producer = service.createClient({clientId: "eom-fixture-client", applicationId: "EOM solver"});
  const streamId = streamCase.stream.streamId;
  const opened = producer.openStream({streamId, fixtureCase: streamCase, pathBundle: streamCase.pathBundle});
  assert.equal(opened.state, "succeeded");
  for (const action of streamCase.actions) {
    const client = action.consumerId === "potential-consumer" ? potential :
      action.consumerId === "history-audit-consumer" ? equationMapping : producer;
    const result = client.streamAction({streamId, action});
    assert.equal(result.state, "succeeded", result.failure?.message);
  }
  const first = potential.inspectStream(streamId);
  const second = equationMapping.inspectStream(streamId);
  assert.deepEqual(first.result, second.result);
  assert.equal(first.result.progress.producerState, FIXTURE.expected.streamState);
  assert.equal(first.result.progress.acceptedThroughT, FIXTURE.expected.sourceAcceptedThroughT);
  assert.equal(first.result.progress.consumers["potential-consumer"].acknowledgedSequence, 2);
  assert.equal(first.result.progress.consumers["history-audit-consumer"].acknowledgedSequence, 2);
});

test("failures retain exact source code and inspectable terminal progress", () => {
  const {potential} = setup();
  const malformed = structuredClone(queryCase.request);
  delete malformed.output;
  const failed = potential.prepareQuery(malformed);
  assert.equal(failed.state, "failed");
  assert.equal(failed.failure.source, "QueryPublicationError");
  assert.equal(failed.failure.code, FIXTURE.expected.failureCode);
  assert.deepEqual(failed.progress, {phase: "failed", completedUnits: 0, totalUnits: 1});
  assert.deepEqual(potential.inspectOperation(failed.operationId), failed);
  failed.failure.code = "mutated";
  assert.equal(potential.inspectOperation(failed.operationId).failure.code, FIXTURE.expected.failureCode);
});

test("codec negotiation delegates to the accepted registry", () => {
  const {potential} = setup();
  const provider = CODECS.providers.find((candidate) => candidate.capabilityId === "potential_fixture_map_json/v1");
  const result = potential.negotiateCodec({registrySchema: CODECS.schema, capabilityId: provider.capabilityId,
    deterministicVersion: provider.deterministicVersion, profile: "precision_bounded_analysis",
    consumer: "Potential publication", requestedAccess: "whole_record", direction: "encode"});
  assert.equal(result.state, "succeeded");
  assert.deepEqual(result.result, {capabilityId: provider.capabilityId, providerId: provider.providerId,
    deterministicVersion: provider.deterministicVersion});
});

test("client schema retains dependency, operation, cache, failure, and consumer boundaries", () => {
  const schema = readJson(CLIENT_CONTRACT.conformance.schema);
  for (const field of ["dependencies", "operations", "operationEnvelope", "cache", "clientBoundary", "consumerConformance", "conformance", "claimBoundary"]) {
    assert.ok(schema.required.includes(field));
  }
  assert.deepEqual(new Set(CLIENT_CONTRACT.consumerConformance.map((candidate) => candidate.applicationId)),
    new Set(["Potential", "Equation Mapping"]));
});
