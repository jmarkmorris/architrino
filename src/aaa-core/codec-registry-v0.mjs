import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  canonicalSha256,
  recordSha256,
  validatePathInterchangeBundle,
} from "./path-interchange-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const REGISTRY_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-codec-registry.v0.json";
const PATH_CONTRACT_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-path-interchange.v0.json";

export class CodecRegistryError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "CodecRegistryError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new CodecRegistryError(code, message);
}

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireObject(value, label) {
  if (!isObject(value)) fail("missing_required_field", label);
  return value;
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) fail("missing_required_field", label);
  return value;
}

function requireArray(value, label, { nonempty = false } = {}) {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) fail("missing_required_field", label);
  return value;
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (isObject(value)) {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

function rawSha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sameValue(left, right) {
  return canonicalJson(left) === canonicalJson(right);
}

function assertSha(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) {
    fail("missing_required_field", label);
  }
}

function validateProviderShape(registry, provider) {
  requireString(provider.capabilityId, "provider.capabilityId");
  requireString(provider.providerId, `${provider.capabilityId}.providerId`);
  if (!["core", "application", "experimental"].includes(provider.providerClass)) {
    fail("missing_required_field", `${provider.capabilityId}.providerClass`);
  }
  requireString(provider.status, `${provider.capabilityId}.status`);
  if (!/^\d+\.\d+\.\d+$/u.test(requireString(provider.deterministicVersion, `${provider.capabilityId}.deterministicVersion`))) {
    fail("incompatible_version", provider.capabilityId);
  }
  const directions = requireArray(provider.directions, `${provider.capabilityId}.directions`, { nonempty: true });
  if (directions.some((direction) => !["encode", "decode"].includes(direction))) {
    fail("capability_mismatch", `${provider.capabilityId}.directions`);
  }
  requireArray(provider.logicalInputTypes, `${provider.capabilityId}.logicalInputTypes`, { nonempty: true });
  requireArray(provider.logicalOutputTypes, `${provider.capabilityId}.logicalOutputTypes`, { nonempty: true });
  const profiles = requireArray(provider.profiles, `${provider.capabilityId}.profiles`, { nonempty: true });
  if (profiles.some((profile) => !registry.profiles.some((candidate) => candidate.id === profile))) {
    fail("unsupported_profile", provider.capabilityId);
  }
  requireObject(provider.encoding, `${provider.capabilityId}.encoding`);
  requireObject(provider.numericAndError, `${provider.capabilityId}.numericAndError`);
  const preservation = requireObject(provider.preservation, `${provider.capabilityId}.preservation`);
  for (const field of ["events", "branches", "coverage", "provenance", "uncertainty"]) {
    requireString(preservation[field], `${provider.capabilityId}.preservation.${field}`);
  }
  const access = requireObject(provider.access, `${provider.capabilityId}.access`);
  requireArray(access.randomAccess, `${provider.capabilityId}.access.randomAccess`, { nonempty: true });
  requireString(access.streaming, `${provider.capabilityId}.access.streaming`);
  requireString(access.chunking, `${provider.capabilityId}.access.chunking`);
  const layout = requireObject(provider.deviceLayout, `${provider.capabilityId}.deviceLayout`);
  requireString(layout.cpu, `${provider.capabilityId}.deviceLayout.cpu`);
  requireString(layout.gpu, `${provider.capabilityId}.deviceLayout.gpu`);
  if (typeof layout.deviceResidentDecode !== "boolean") {
    fail("missing_required_field", `${provider.capabilityId}.deviceLayout.deviceResidentDecode`);
  }
  requireObject(provider.authority, `${provider.capabilityId}.authority`);
  requireArray(provider.permittedConsumers, `${provider.capabilityId}.permittedConsumers`, { nonempty: true });
  const compatibility = requireObject(provider.compatibility, `${provider.capabilityId}.compatibility`);
  if (compatibility.registrySchema !== registry.schema ||
      compatibility.logicalSchema !== registry.logicalContract.schema) {
    fail("incompatible_version", provider.capabilityId);
  }
  for (const refusal of requireArray(provider.failures, `${provider.capabilityId}.failures`, { nonempty: true })) {
    if (!registry.refusalCodes.includes(requireString(refusal.code, `${provider.capabilityId}.failure.code`))) {
      fail("missing_required_field", `${provider.capabilityId} unknown refusal ${String(refusal.code)}`);
    }
    requireString(refusal.condition, `${provider.capabilityId}.${refusal.code}.condition`);
    requireString(refusal.fallback, `${provider.capabilityId}.${refusal.code}.fallback`);
  }
}

export function validateCodecRegistry(registry) {
  requireObject(registry, "registry");
  if (registry.schema !== "aaa_core_codec_registry/v0" || registry.version !== 0 || registry.status !== "accepted") {
    fail("incompatible_version", "registry envelope");
  }
  if (registry.registryAuthority !== "AAA Core" || registry.logicalContract?.schema !== "aaa_core_path_interchange/v0") {
    fail("incompatible_version", "registry authority or logical contract");
  }
  const profiles = requireArray(registry.profiles, "registry.profiles", { nonempty: true });
  const profileIds = profiles.map((profile) => requireString(profile.id, "profile.id"));
  const requiredProfiles = ["authoritative_history", "precision_bounded_analysis", "display_stream"];
  if (!sameValue([...profileIds].sort(), [...requiredProfiles].sort())) {
    fail("unsupported_profile", "registry must define the three accepted profiles exactly once");
  }
  if (new Set(profileIds).size !== profileIds.length) fail("unsupported_profile", "duplicate profile id");
  for (const profile of profiles) {
    for (const field of ["purpose", "numericRule", "errorRule", "authorityEffect", "eventAndBranchRule", "continuationRule", "requiredDevicePosture"]) {
      requireString(profile[field], `${profile.id}.${field}`);
    }
    requireArray(profile.requiredAccess, `${profile.id}.requiredAccess`, { nonempty: true });
  }
  requireArray(registry.refusalCodes, "registry.refusalCodes", { nonempty: true });
  const providers = requireArray(registry.providers, "registry.providers", { nonempty: true });
  const capabilityIds = new Set();
  for (const provider of providers) {
    validateProviderShape(registry, provider);
    if (capabilityIds.has(provider.capabilityId)) fail("capability_mismatch", `duplicate ${provider.capabilityId}`);
    capabilityIds.add(provider.capabilityId);
  }
  for (const profileId of requiredProfiles) {
    if (!providers.some((provider) => provider.profiles.includes(profileId))) {
      fail("unsupported_profile", `no provider for ${profileId}`);
    }
  }
  for (const providerClass of ["core", "experimental"]) {
    if (!providers.some((provider) => provider.providerClass === providerClass)) {
      fail("capability_mismatch", `no ${providerClass} provider`);
    }
  }
  return registry;
}

export function negotiateCodec(registry, request) {
  validateCodecRegistry(registry);
  requireObject(request, "request");
  if (request.registrySchema !== registry.schema) fail("incompatible_version", String(request.registrySchema));
  const provider = registry.providers.find((candidate) => candidate.capabilityId === request.capabilityId);
  if (!provider) fail("unknown_capability", String(request.capabilityId));
  if (request.deterministicVersion !== provider.deterministicVersion) {
    fail("incompatible_version", `${provider.capabilityId} ${String(request.deterministicVersion)}`);
  }
  if (!provider.profiles.includes(request.profile)) {
    fail("unsupported_profile", `${provider.capabilityId} does not support ${String(request.profile)}`);
  }
  if (!provider.permittedConsumers.includes(request.consumer)) {
    fail("forbidden_consumer", `${String(request.consumer)} may not consume ${provider.capabilityId}`);
  }
  if (!provider.access.randomAccess.includes(request.requestedAccess)) {
    fail("capability_mismatch", `${provider.capabilityId} does not support ${String(request.requestedAccess)}`);
  }
  if (request.direction && !provider.directions.includes(request.direction)) {
    fail("capability_mismatch", `${provider.capabilityId} does not support ${request.direction}`);
  }
  return provider;
}

function requestFor(registry, fixtureCase, overrides = {}) {
  const provider = registry.providers.find((candidate) => candidate.capabilityId === fixtureCase.capabilityId);
  return {
    registrySchema: registry.schema,
    capabilityId: fixtureCase.capabilityId,
    deterministicVersion: provider?.deterministicVersion,
    profile: fixtureCase.profile,
    consumer: fixtureCase.consumer,
    requestedAccess: fixtureCase.requestedAccess,
    ...overrides,
  };
}

function recordProfile(record) {
  return record.payload?.numericPolicy?.representationProfile ?? record.payload?.codec?.representationProfile;
}

function createEnvelope(registry, provider, profile, sourceRecord, payloadBytes, extra = {}) {
  return {
    schema: "aaa_core_codec_payload/v0",
    registrySchema: registry.schema,
    capabilityId: provider.capabilityId,
    deterministicVersion: provider.deterministicVersion,
    representationProfile: profile,
    sourceRecordId: sourceRecord.recordId,
    sourceContentSha256: sourceRecord.contentSha256,
    encodedContentSha256: rawSha256(payloadBytes),
    payloadBase64: Buffer.from(payloadBytes).toString("base64"),
    ...extra,
  };
}

function verifyEnvelope(registry, provider, envelope) {
  requireObject(envelope, "codec envelope");
  if (envelope.schema !== "aaa_core_codec_payload/v0" ||
      envelope.registrySchema !== registry.schema ||
      envelope.capabilityId !== provider.capabilityId ||
      envelope.deterministicVersion !== provider.deterministicVersion) {
    fail("incompatible_version", "codec envelope");
  }
  assertSha(envelope.sourceContentSha256, "envelope.sourceContentSha256");
  assertSha(envelope.encodedContentSha256, "envelope.encodedContentSha256");
  const bytes = Buffer.from(requireString(envelope.payloadBase64, "envelope.payloadBase64"), "base64");
  if (rawSha256(bytes) !== envelope.encodedContentSha256) {
    fail("payload_integrity_mismatch", provider.capabilityId);
  }
  return bytes;
}

export function encodeCanonicalPathRecord(registry, request, record) {
  const provider = negotiateCodec(registry, {...request, direction: "encode"});
  if (provider.capabilityId !== "aaa-core.canonical-json-path-record/v0" ||
      !provider.logicalInputTypes.includes(record.recordType)) {
    fail("capability_mismatch", "canonical path record input");
  }
  if (recordProfile(record) !== request.profile) {
    fail("unsupported_profile", `${record.recordId} profile`);
  }
  if (recordSha256(record) !== record.contentSha256) fail("semantic_round_trip_failure", `${record.recordId} identity`);
  return createEnvelope(registry, provider, request.profile, record, Buffer.from(canonicalJson(record), "utf8"));
}

export function decodeCanonicalPathRecord(registry, request, envelope) {
  const provider = negotiateCodec(registry, {...request, direction: "decode"});
  if (provider.capabilityId !== "aaa-core.canonical-json-path-record/v0") {
    fail("capability_mismatch", "canonical path record decoder");
  }
  const bytes = verifyEnvelope(registry, provider, envelope);
  let record;
  try {
    record = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail("semantic_round_trip_failure", "canonical JSON parse");
  }
  if (record.recordId !== envelope.sourceRecordId || record.contentSha256 !== envelope.sourceContentSha256 ||
      recordSha256(record) !== record.contentSha256 || recordProfile(record) !== request.profile) {
    fail("semantic_round_trip_failure", "decoded record identity or profile");
  }
  return record;
}

function quantize(value, quantum, minimum, maximum, errorBudget, label) {
  if (!Number.isFinite(value)) fail("error_budget_exceeded", label);
  const integer = Math.round(value / quantum);
  if (integer < minimum || integer > maximum) fail("error_budget_exceeded", `${label} range`);
  const reconstructed = integer * quantum;
  if (Math.abs(reconstructed - value) > errorBudget + Number.EPSILON) {
    fail("error_budget_exceeded", `${label} error`);
  }
  return integer;
}

function writeInt16(values) {
  const bytes = Buffer.alloc(values.length * 2);
  values.forEach((value, index) => bytes.writeInt16LE(value, index * 2));
  return bytes.toString("base64");
}

function writeUint16(values) {
  const bytes = Buffer.alloc(values.length * 2);
  values.forEach((value, index) => bytes.writeUInt16LE(value, index * 2));
  return bytes.toString("base64");
}

function writeInt32(values) {
  const bytes = Buffer.alloc(values.length * 4);
  values.forEach((value, index) => bytes.writeInt32LE(value, index * 4));
  return bytes.toString("base64");
}

function readIntegers(base64, width, read, expectedCount, label) {
  const bytes = Buffer.from(requireString(base64, label), "base64");
  if (bytes.length !== width * expectedCount) fail("semantic_round_trip_failure", `${label} length`);
  return Array.from({length: expectedCount}, (_, index) => bytes[read](index * width));
}

export function encodeQuantizedDisplayPath(registry, request, record) {
  const provider = negotiateCodec(registry, {...request, direction: "encode"});
  if (provider.capabilityId !== "aaa-core.quantized-path-display-int16le/v0" || record.recordType !== "path_chunk") {
    fail("capability_mismatch", "quantized display codec input");
  }
  const policy = record.payload?.numericPolicy;
  if (policy?.representationProfile !== "display_stream" || policy.representation !== "quantized_integer" ||
      policy.precisionBits !== 16 || policy.rounding !== "declared_quantizer" ||
      record.payload.authority?.continuationPermitted !== false) {
    fail("unsupported_profile", `${record.recordId} display policy`);
  }
  if (recordSha256(record) !== record.contentSha256) fail("semantic_round_trip_failure", `${record.recordId} identity`);
  const timeQuantum = provider.numericAndError.timeQuantum;
  const positionQuantum = provider.numericAndError.positionQuantum;
  const errorBudget = Math.min(provider.numericAndError.maximumAddedAbsoluteError, policy.maximumAbsoluteError);
  const pathDictionary = [...new Set(record.payload.samples.map((sample) => sample.pathId))];
  const pathIndices = [];
  const times = [];
  const positions = [];
  for (const [index, sample] of record.payload.samples.entries()) {
    pathIndices.push(pathDictionary.indexOf(sample.pathId));
    times.push(quantize(sample.T, timeQuantum, -2147483648, 2147483647, errorBudget, `sample ${index} T`));
    for (const [axis, coordinate] of sample.position.entries()) {
      positions.push(quantize(coordinate, positionQuantum, -32768, 32767, errorBudget, `sample ${index} axis ${axis}`));
    }
  }
  const metadata = structuredClone(record);
  delete metadata.payload.samples;
  delete metadata.payload.eventMarkers;
  const packed = {
    schema: "potential_quantized_path_display_payload/v0",
    metadata,
    pathDictionary,
    pathIndicesBase64: writeUint16(pathIndices),
    timesBase64: writeInt32(times),
    positionsBase64: writeInt16(positions),
    sampleCount: record.payload.samples.length,
    eventMarkers: structuredClone(record.payload.eventMarkers),
  };
  const bytes = Buffer.from(canonicalJson(packed), "utf8");
  return createEnvelope(registry, provider, request.profile, record, bytes, {
    eventMarkersSha256: canonicalSha256(record.payload.eventMarkers),
    effectiveOutputAuthority: "display_only",
  });
}

export function decodeQuantizedDisplayPath(registry, request, envelope) {
  const provider = negotiateCodec(registry, {...request, direction: "decode"});
  if (provider.capabilityId !== "aaa-core.quantized-path-display-int16le/v0") {
    fail("capability_mismatch", "quantized display codec decoder");
  }
  const bytes = verifyEnvelope(registry, provider, envelope);
  let packed;
  try {
    packed = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail("semantic_round_trip_failure", "display payload parse");
  }
  if (packed.schema !== "potential_quantized_path_display_payload/v0" ||
      canonicalSha256(packed.eventMarkers) !== envelope.eventMarkersSha256) {
    fail("event_preservation_failure", "display event markers");
  }
  const sampleCount = packed.sampleCount;
  if (!Number.isInteger(sampleCount) || sampleCount < 1) fail("semantic_round_trip_failure", "display sample count");
  const pathIndices = readIntegers(packed.pathIndicesBase64, 2, "readUInt16LE", sampleCount, "pathIndicesBase64");
  const times = readIntegers(packed.timesBase64, 4, "readInt32LE", sampleCount, "timesBase64");
  const positions = readIntegers(packed.positionsBase64, 2, "readInt16LE", sampleCount * 3, "positionsBase64");
  const record = structuredClone(packed.metadata);
  record.payload.samples = Array.from({length: sampleCount}, (_, index) => {
    const pathId = packed.pathDictionary[pathIndices[index]];
    if (typeof pathId !== "string") fail("semantic_round_trip_failure", `path index ${index}`);
    return {
      pathId,
      T: times[index] * provider.numericAndError.timeQuantum,
      position: positions.slice(index * 3, index * 3 + 3).map((value) => value * provider.numericAndError.positionQuantum),
    };
  });
  record.payload.eventMarkers = packed.eventMarkers;
  if (record.recordId !== envelope.sourceRecordId || record.contentSha256 !== envelope.sourceContentSha256 ||
      recordSha256(record) !== record.contentSha256) {
    fail("semantic_round_trip_failure", "display logical record identity");
  }
  return record;
}

export function encodePotentialMapFixture(registry, request, document) {
  const provider = negotiateCodec(registry, {...request, direction: "encode"});
  if (provider.capabilityId !== "potential_fixture_map_json/v1" ||
      document.schema !== "architrino.potential-consumer-publication-example.v1" ||
      document.publication?.codec?.provider !== "aaa-core" ||
      document.publication?.codec?.capabilityId !== provider.capabilityId ||
      document.publication?.codec?.registry !== registry.schema ||
      document.publication?.codec?.representationProfile !== request.profile) {
    fail("capability_mismatch", "Potential map fixture input");
  }
  const sourceIdentity = {
    recordId: document.schema,
    contentSha256: canonicalSha256(document),
  };
  return createEnvelope(
    registry,
    provider,
    request.profile,
    sourceIdentity,
    Buffer.from(canonicalJson(document), "utf8"),
    {effectiveOutputAuthority: "derived_analysis"},
  );
}

export function decodePotentialMapFixture(registry, request, envelope) {
  const provider = negotiateCodec(registry, {...request, direction: "decode"});
  if (provider.capabilityId !== "potential_fixture_map_json/v1") {
    fail("capability_mismatch", "Potential map fixture decoder");
  }
  const bytes = verifyEnvelope(registry, provider, envelope);
  let document;
  try {
    document = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail("semantic_round_trip_failure", "Potential map fixture parse");
  }
  if (document.schema !== envelope.sourceRecordId ||
      canonicalSha256(document) !== envelope.sourceContentSha256 ||
      document.publication?.codec?.capabilityId !== provider.capabilityId ||
      document.publication?.codec?.representationProfile !== request.profile) {
    fail("semantic_round_trip_failure", "Potential map fixture identity or profile");
  }
  return document;
}

const EXPERIMENT_HEADER = ["path_id", "T", "X1", "X2", "X3", "position_uncertainty", "event_id", "event_kind", "event_boundary"];

export function decodeExperimentalTrackCsv(registry, request, sourceNative, recordTemplate) {
  const provider = negotiateCodec(registry, {...request, direction: "decode"});
  if (provider.capabilityId !== "experiment.synthetic-track-csv-decoder/v0") {
    fail("capability_mismatch", "experimental decoder");
  }
  requireObject(sourceNative, "sourceNative");
  const text = requireString(sourceNative.text, "sourceNative.text");
  if (rawSha256(Buffer.from(text, "utf8")) !== sourceNative.contentSha256) {
    fail("source_identity_mismatch", "source-native CSV hash");
  }
  const lines = text.split("\n");
  if (sourceNative.schema !== "synthetic_track_csv/v0" || lines[0] !== "schema,synthetic_track_csv/v0" ||
      !sameValue(lines[1]?.split(","), EXPERIMENT_HEADER)) {
    fail("unsupported_source_schema", "synthetic track CSV header");
  }
  const samples = [];
  const eventMarkers = [];
  for (const [offset, line] of lines.slice(2).filter((candidate) => candidate.length > 0).entries()) {
    const cells = line.split(",");
    if (cells.length !== EXPERIMENT_HEADER.length) fail("unsupported_source_schema", `row ${offset + 2}`);
    const [pathId, TText, xText, yText, zText, uncertaintyText, eventId, eventKind, eventBoundary] = cells;
    const values = [TText, xText, yText, zText].map(Number);
    if (!pathId || values.some((value) => !Number.isFinite(value))) {
      fail("unsupported_source_schema", `row ${offset + 2} numeric fields`);
    }
    const uncertainty = Number(uncertaintyText);
    if (uncertaintyText.length === 0 || !Number.isFinite(uncertainty) || uncertainty < 0) {
      fail("uncertainty_loss", `row ${offset + 2}`);
    }
    samples.push({pathId, T: values[0], position: values.slice(1), positionUncertainty: uncertainty});
    if (eventId || eventKind || eventBoundary) {
      if (!eventId || !eventKind || eventBoundary !== "true") {
        fail("event_preservation_failure", `row ${offset + 2}`);
      }
      eventMarkers.push({eventId, T: values[0], kind: eventKind, boundary: true});
    }
  }
  const record = structuredClone(recordTemplate);
  if (record.payload?.provenance?.sourceRecords?.[0]?.sourceSha256 !== sourceNative.contentSha256) {
    fail("source_identity_mismatch", "record template provenance");
  }
  record.payload.samples = samples;
  record.payload.eventMarkers = eventMarkers;
  record.contentSha256 = recordSha256(record);
  return {
    record,
    retainedSourceNative: structuredClone(sourceNative),
  };
}

export function reemitExperimentalSourceNative(decoded) {
  const sourceNative = requireObject(decoded?.retainedSourceNative, "retainedSourceNative");
  const text = requireString(sourceNative.text, "retainedSourceNative.text");
  if (rawSha256(Buffer.from(text, "utf8")) !== sourceNative.contentSha256) {
    fail("source_identity_mismatch", "retained source-native bytes");
  }
  return text;
}

function sourceRecordFromFixture(pathSuite, fixtureCase) {
  const bundle = pathSuite.cases.find((candidate) => candidate.caseId === fixtureCase.sourceFixture.caseId);
  const record = bundle?.records.find((candidate) => candidate.recordId === fixtureCase.sourceFixture.recordId);
  if (!record) fail("missing_required_field", `${fixtureCase.caseId}.sourceFixture`);
  return structuredClone(record);
}

function runPositiveCase(registry, pathContract, pathSuite, fixtureCase) {
  const request = requestFor(registry, fixtureCase);
  if (fixtureCase.capabilityId === "aaa-core.canonical-json-path-record/v0") {
    const source = sourceRecordFromFixture(pathSuite, fixtureCase);
    const envelope = encodeCanonicalPathRecord(registry, request, source);
    const decoded = decodeCanonicalPathRecord(registry, request, envelope);
    if (!sameValue(decoded, source)) fail("semantic_round_trip_failure", fixtureCase.caseId);
    return {caseId: fixtureCase.caseId, providerClass: "core", roundTrip: "semantic_exact", status: "passed"};
  }
  if (fixtureCase.capabilityId === "aaa-core.quantized-path-display-int16le/v0") {
    validatePathInterchangeBundle(pathContract, fixtureCase.logicalBundle);
    const source = fixtureCase.logicalBundle.records.find((record) => record.recordType === "path_chunk");
    const envelope = encodeQuantizedDisplayPath(registry, request, source);
    const decoded = decodeQuantizedDisplayPath(registry, request, envelope);
    if (!sameValue(decoded, source)) fail("semantic_round_trip_failure", fixtureCase.caseId);
    return {caseId: fixtureCase.caseId, providerClass: "core", roundTrip: "semantic_exact", status: "passed"};
  }
  if (fixtureCase.capabilityId === "potential_fixture_map_json/v1") {
    const source = readJson(ROOT, fixtureCase.sourceFile);
    const envelope = encodePotentialMapFixture(registry, request, source);
    const decoded = decodePotentialMapFixture(registry, request, envelope);
    if (!sameValue(decoded, source)) fail("semantic_round_trip_failure", fixtureCase.caseId);
    return {caseId: fixtureCase.caseId, providerClass: "core", roundTrip: "semantic_exact", status: "passed"};
  }
  if (fixtureCase.capabilityId === "experiment.synthetic-track-csv-decoder/v0") {
    const decoded = decodeExperimentalTrackCsv(registry, request, fixtureCase.sourceNative, fixtureCase.recordTemplate);
    const expected = fixtureCase.expectedBundle.records.find((record) => record.recordType === "path_chunk");
    if (!sameValue(decoded.record, expected) || reemitExperimentalSourceNative(decoded) !== fixtureCase.sourceNative.text) {
      fail("semantic_round_trip_failure", fixtureCase.caseId);
    }
    validatePathInterchangeBundle(pathContract, fixtureCase.expectedBundle);
    return {caseId: fixtureCase.caseId, providerClass: "experimental", roundTrip: "source_native_exact_bytes", status: "passed"};
  }
  fail("unknown_capability", fixtureCase.capabilityId);
}

function expectNegativeOperation(registry, fixtureCase, operation, pathSuite) {
  const baseRequest = requestFor(registry, fixtureCase);
  const source = fixtureCase.sourceFixture ? sourceRecordFromFixture(pathSuite, fixtureCase) : null;
  switch (operation) {
    case "unknown_capability":
      negotiateCodec(registry, {...baseRequest, capabilityId: "unknown.codec/v0"});
      break;
    case "incompatible_version":
      negotiateCodec(registry, {...baseRequest, registrySchema: "aaa_core_codec_registry/v1"});
      break;
    case "unsupported_profile":
      negotiateCodec(registry, {...baseRequest, profile: "display_stream"});
      break;
    case "unsupported_access":
      negotiateCodec(registry, {...baseRequest, requestedAccess: "sample_range"});
      break;
    case "forbidden_consumer":
      negotiateCodec(registry, {...baseRequest, consumer: "EOM solver"});
      break;
    case "payload_integrity_mismatch": {
      const envelope = encodeCanonicalPathRecord(registry, baseRequest, source);
      envelope.payloadBase64 = `${envelope.payloadBase64.slice(0, -2)}AA`;
      decodeCanonicalPathRecord(registry, baseRequest, envelope);
      break;
    }
    case "error_budget_exceeded": {
      const display = structuredClone(fixtureCase.logicalBundle.records.find((record) => record.recordType === "path_chunk"));
      display.payload.numericPolicy.maximumAbsoluteError = 0.0001;
      display.payload.samples[0].position[0] = -0.9996;
      display.contentSha256 = recordSha256(display);
      encodeQuantizedDisplayPath(registry, baseRequest, display);
      break;
    }
    case "event_preservation_failure": {
      const display = fixtureCase.logicalBundle.records.find((record) => record.recordType === "path_chunk");
      const envelope = encodeQuantizedDisplayPath(registry, baseRequest, display);
      const packed = JSON.parse(Buffer.from(envelope.payloadBase64, "base64").toString("utf8"));
      packed.eventMarkers = [];
      const bytes = Buffer.from(canonicalJson(packed), "utf8");
      envelope.payloadBase64 = bytes.toString("base64");
      envelope.encodedContentSha256 = rawSha256(bytes);
      decodeQuantizedDisplayPath(registry, baseRequest, envelope);
      break;
    }
    case "source_identity_mismatch": {
      const sourceNative = structuredClone(fixtureCase.sourceNative);
      sourceNative.contentSha256 = "0".repeat(64);
      decodeExperimentalTrackCsv(registry, baseRequest, sourceNative, fixtureCase.recordTemplate);
      break;
    }
    case "uncertainty_loss": {
      const sourceNative = structuredClone(fixtureCase.sourceNative);
      sourceNative.text = sourceNative.text.replace("observed-track-a,0,0,0,0,0.01,,,", "observed-track-a,0,0,0,0,,,,");
      sourceNative.contentSha256 = rawSha256(Buffer.from(sourceNative.text, "utf8"));
      const template = structuredClone(fixtureCase.recordTemplate);
      template.payload.provenance.sourceRecords[0].sourceSha256 = sourceNative.contentSha256;
      decodeExperimentalTrackCsv(registry, baseRequest, sourceNative, template);
      break;
    }
    case "unsupported_source_schema": {
      const sourceNative = structuredClone(fixtureCase.sourceNative);
      sourceNative.text = sourceNative.text.replace("schema,synthetic_track_csv/v0", "schema,synthetic_track_csv/v1");
      sourceNative.contentSha256 = rawSha256(Buffer.from(sourceNative.text, "utf8"));
      const template = structuredClone(fixtureCase.recordTemplate);
      template.payload.provenance.sourceRecords[0].sourceSha256 = sourceNative.contentSha256;
      decodeExperimentalTrackCsv(registry, baseRequest, sourceNative, template);
      break;
    }
    default:
      fail("missing_required_field", `unknown negative operation ${operation}`);
  }
  fail("missing_required_field", `${operation} unexpectedly passed`);
}

export function checkCodecRegistryContract({rootDir = ROOT} = {}) {
  const registry = validateCodecRegistry(readJson(rootDir, REGISTRY_PATH));
  const pathContract = readJson(rootDir, PATH_CONTRACT_PATH);
  const positiveSuite = readJson(rootDir, registry.conformance.positiveFixtures);
  const negativeSuite = readJson(rootDir, registry.conformance.negativeFixtures);
  const pathSuite = readJson(rootDir, positiveSuite.pathInterchangeFixtureSuite);
  const positive = positiveSuite.cases.map((fixtureCase) => runPositiveCase(registry, pathContract, pathSuite, fixtureCase));
  const byCaseId = new Map(positiveSuite.cases.map((fixtureCase) => [fixtureCase.caseId, fixtureCase]));
  const negative = negativeSuite.cases.map((negativeCase) => {
    const fixtureCase = byCaseId.get(negativeCase.baseCaseId);
    if (!fixtureCase) fail("missing_required_field", `${negativeCase.id}.baseCaseId`);
    try {
      expectNegativeOperation(registry, fixtureCase, negativeCase.operation, pathSuite);
    } catch (error) {
      if (!(error instanceof CodecRegistryError) || error.code !== negativeCase.expectedCode) throw error;
      return {caseId: negativeCase.id, refusalCode: error.code, status: "passed"};
    }
    return null;
  });
  return {
    schema: registry.schema,
    status: "passed",
    profiles: registry.profiles.map((profile) => profile.id),
    providers: registry.providers.map((provider) => provider.capabilityId),
    positive,
    negative,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkCodecRegistryContract(), null, 2));
}
