import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

import {
  checkCodecRegistryContract,
  decodeCanonicalPathRecord,
  decodeExperimentalTrackCsv,
  decodePotentialMapFixture,
  decodeQuantizedDisplayPath,
  encodeCanonicalPathRecord,
  encodePotentialMapFixture,
  encodeQuantizedDisplayPath,
  negotiateCodec,
  reemitExperimentalSourceNative,
  validateCodecRegistry,
} from "../src/aaa-core/codec-registry-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const REGISTRY = readJson("reference/priorities/app-aaa-core/aaa-core-codec-registry.v0.json");
const POSITIVE = readJson(REGISTRY.conformance.positiveFixtures);
const NEGATIVE = readJson(REGISTRY.conformance.negativeFixtures);
const PATH_POSITIVE = readJson(POSITIVE.pathInterchangeFixtureSuite);

function fixtureCase(caseId) {
  return POSITIVE.cases.find((candidate) => candidate.caseId === caseId);
}

function requestFor(candidate) {
  const provider = REGISTRY.providers.find((entry) => entry.capabilityId === candidate.capabilityId);
  return {
    registrySchema: REGISTRY.schema,
    capabilityId: candidate.capabilityId,
    deterministicVersion: provider.deterministicVersion,
    profile: candidate.profile,
    consumer: candidate.consumer,
    requestedAccess: candidate.requestedAccess,
  };
}

test("AAA Core codec registry passes all positive and fail-closed fixtures", () => {
  const result = checkCodecRegistryContract({rootDir: ROOT});
  assert.equal(result.status, "passed");
  assert.equal(result.positive.length, 5);
  assert.equal(result.negative.length, 11);
  assert.deepEqual(new Set(result.positive.map((candidate) => candidate.providerClass)), new Set(["core", "application", "experimental"]));
});

test("registry descriptors cover every accepted profile and provider boundary", () => {
  const registry = validateCodecRegistry(structuredClone(REGISTRY));
  assert.deepEqual(registry.profiles.map((profile) => profile.id).sort(), ["authoritative_history", "display_stream", "precision_bounded_analysis"]);
  assert.deepEqual(new Set(registry.providers.map((provider) => provider.providerClass)), new Set(["core", "application", "experimental"]));
  for (const provider of registry.providers) {
    assert.ok(provider.logicalInputTypes.length > 0);
    assert.ok(provider.logicalOutputTypes.length > 0);
    assert.ok(provider.permittedConsumers.length > 0);
    assert.ok(provider.access.randomAccess.length > 0);
    assert.ok(provider.deviceLayout.cpu);
    assert.ok(provider.deviceLayout.gpu);
    assert.ok(provider.preservation.events);
    assert.ok(provider.preservation.branches);
    assert.ok(provider.failures.length > 0);
  }
});

test("Core canonical codec is deterministic and preserves the complete logical record", () => {
  const candidate = fixtureCase("core-authoritative-canonical-json");
  const sourceBundle = PATH_POSITIVE.cases.find((entry) => entry.caseId === candidate.sourceFixture.caseId);
  const source = sourceBundle.records.find((record) => record.recordId === candidate.sourceFixture.recordId);
  const request = requestFor(candidate);
  const first = encodeCanonicalPathRecord(REGISTRY, request, source);
  const second = encodeCanonicalPathRecord(REGISTRY, request, source);
  assert.deepEqual(first, second);
  assert.deepEqual(decodeCanonicalPathRecord(REGISTRY, request, first), source);
  assert.equal(first.sourceContentSha256, source.contentSha256);
});

test("Core display codec preserves grid-aligned samples and exact event boundaries", () => {
  const candidate = fixtureCase("core-display-int16le");
  const source = candidate.logicalBundle.records.find((record) => record.recordType === "path_chunk");
  const request = requestFor(candidate);
  const envelope = encodeQuantizedDisplayPath(REGISTRY, request, source);
  const decoded = decodeQuantizedDisplayPath(REGISTRY, request, envelope);
  assert.deepEqual(decoded, source);
  assert.equal(envelope.effectiveOutputAuthority, "display_only");
  assert.deepEqual(decoded.payload.eventMarkers, source.payload.eventMarkers);
  assert.equal(decoded.payload.authority.continuationPermitted, false);
});

test("Potential app-owned map codec round-trips its existing contract fixture", () => {
  const candidate = fixtureCase("potential-map-canonical-json");
  const source = readJson(candidate.sourceFile);
  const request = requestFor(candidate);
  const envelope = encodePotentialMapFixture(REGISTRY, request, source);
  assert.deepEqual(decodePotentialMapFixture(REGISTRY, request, envelope), source);
  assert.equal(envelope.effectiveOutputAuthority, "derived_analysis");
});

test("experimental decoder retains source-native bytes, uncertainty, event identity, and observer authority", () => {
  const candidate = fixtureCase("experimental-source-csv-decode");
  const decoded = decodeExperimentalTrackCsv(REGISTRY, requestFor(candidate), candidate.sourceNative, candidate.recordTemplate);
  assert.equal(reemitExperimentalSourceNative(decoded), candidate.sourceNative.text);
  assert.ok(decoded.record.payload.samples.every((sample) => Number.isFinite(sample.positionUncertainty)));
  assert.deepEqual(decoded.record.payload.eventMarkers, [{eventId: "detector-crossing-1", T: 1, kind: "detector_crossing", boundary: true}]);
  assert.equal(decoded.record.payload.authority.level, "observer_measurement");
  assert.equal(decoded.record.payload.authority.continuationPermitted, false);
});

test("negotiation refuses unregistered consumers and access modes", () => {
  const candidate = fixtureCase("core-display-int16le");
  const request = requestFor(candidate);
  assert.throws(
    () => negotiateCodec(REGISTRY, {...request, consumer: "EOM solver"}),
    (error) => error.code === "forbidden_consumer",
  );
  assert.throws(
    () => negotiateCodec(REGISTRY, {...request, requestedAccess: "event_index"}),
    (error) => error.code === "capability_mismatch",
  );
});

test("negative fixture suite names every purpose-specific refusal", () => {
  assert.deepEqual(
    new Set(NEGATIVE.cases.map((candidate) => candidate.expectedCode)),
    new Set([
      "unknown_capability",
      "incompatible_version",
      "unsupported_profile",
      "capability_mismatch",
      "forbidden_consumer",
      "payload_integrity_mismatch",
      "error_budget_exceeded",
      "event_preservation_failure",
      "source_identity_mismatch",
      "uncertainty_loss",
      "unsupported_source_schema",
    ]),
  );
});

test("machine schema requires every completion-boundary provider field", () => {
  const schema = readJson("src/contracts/aaa-core-codec-registry/v0/schema.json");
  const providerRequired = new Set(schema.$defs.provider.required);
  for (const field of [
    "logicalInputTypes",
    "logicalOutputTypes",
    "encoding",
    "numericAndError",
    "preservation",
    "access",
    "deviceLayout",
    "authority",
    "permittedConsumers",
    "compatibility",
    "failures",
  ]) {
    assert.ok(providerRequired.has(field), `schema must require ${field}`);
  }
});
