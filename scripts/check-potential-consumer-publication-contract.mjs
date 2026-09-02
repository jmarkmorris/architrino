#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACT_PATH = "reference/priorities/app-aaa-core/potential/potential-product-contract.v1.json";

class ContractError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.code = code;
  }
}

function fail(code, message) {
  throw new ContractError(code, message);
}

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

export function canonicalSha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(canonicalize(value))).digest("hex");
}

function valueAt(record, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], record);
}

function requireFields(record, paths) {
  for (const dottedPath of paths) {
    const value = valueAt(record, dottedPath);
    if (value === undefined || value === null || value === "") {
      fail("missing_required_field", dottedPath);
    }
  }
}

function sameArray(left, right) {
  return Array.isArray(left) && Array.isArray(right) && JSON.stringify(left) === JSON.stringify(right);
}

function validateProductGeometry(contract, record) {
  const definition = contract.productKinds[record.request.mapGeometry.productKind];
  if (!definition) fail("unsupported_product_geometry", "unknown product kind");
  if (!sameArray(record.request.mapGeometry.axes, definition.axes)) {
    fail("unsupported_product_geometry", "request axes do not match product kind");
  }
  if (record.request.timeSelection.mode !== definition.timeMode) {
    fail("unsupported_product_geometry", "time mode does not match product kind");
  }
  if (!sameArray(record.publication.geometry.axes, definition.axes) ||
      record.publication.geometry.productKind !== record.request.mapGeometry.productKind ||
      !sameArray(record.publication.geometry.sampleShape, record.request.mapGeometry.sampleShape)) {
    fail("unsupported_product_geometry", "publication geometry does not match request");
  }
  const expectedCells = record.request.mapGeometry.sampleShape.reduce((product, value) => product * value, 1);
  if (record.publication.derivedMap.values.length !== expectedCells) {
    fail("incomplete_publication", "derived map cell count does not match sample shape");
  }
}

function validateHistoryAndScale(record) {
  const { sourceHistory, request } = record;
  if (sourceHistory.coverage.startT > request.requiredHistory.startT ||
      sourceHistory.coverage.endT < request.requiredHistory.endT ||
      sourceHistory.coverage.acceptedThroughT < request.requiredHistory.endT ||
      sourceHistory.coverage.complete !== true) {
    fail("missing_history", "required source-history coverage is unavailable");
  }
  if (sourceHistory.units.wakeSpeed !== 1 || sourceHistory.units.scaleMapId !== request.scaleMapId) {
    fail("incompatible_scales", "normalized wake speed or scale-map identity is incompatible");
  }
}

function validateObservableAndCodec(contract, record) {
  const observable = contract.observableRegistry.find((candidate) =>
    candidate.id === record.request.observable.id && candidate.version === record.request.observable.version);
  if (!observable || observable.kernelVersion !== record.request.observable.kernelVersion) {
    fail("unknown_observable_version", "observable or kernel version is not registered");
  }
  if (!observable.permittedHistoryKinds.includes(record.sourceHistory.historyKind)) {
    fail("unknown_observable_version", "observable does not accept this history kind");
  }
  const codec = contract.codecCapabilities.find((candidate) =>
    candidate.capabilityId === record.request.output.codecCapabilityId);
  if (!codec || codec.provider !== record.publication.codec.provider ||
      codec.registry !== record.publication.codec.registry ||
      codec.capabilityId !== record.publication.codec.capabilityId) {
    fail("unregistered_codec", "publication codec is not a matching registered capability");
  }
  const precision = record.request.numericPolicy.precisionBits;
  if (precision > observable.maximumPrecisionBits || precision > codec.maximumPrecisionBits ||
      !codec.representationProfiles.includes(record.request.numericPolicy.representationProfile) ||
      record.publication.codec.representationProfile !== record.request.numericPolicy.representationProfile) {
    fail("unsupported_precision", "numeric or representation profile exceeds a registered capability");
  }
}

function validateBindingsAndPublication(record) {
  const { sourceHistory, request, publication } = record;
  if (request.sourcePathSetId !== sourceHistory.pathSetId ||
      request.sourceManifestSha256 !== sourceHistory.manifestSha256 ||
      publication.sourceBinding.pathSetId !== sourceHistory.pathSetId ||
      publication.sourceBinding.manifestSha256 !== sourceHistory.manifestSha256 ||
      publication.sourceBinding.authority !== sourceHistory.authority) {
    fail("source_binding_mismatch", "source identity or authority changed across the derived-product boundary");
  }
  if (publication.sourceHistoryPayload !== undefined || publication.derivedMap.sourceHistory !== undefined) {
    fail("source_history_leakage", "publication embeds source history instead of retaining a reference");
  }
  if (publication.requestId !== request.requestId || publication.requestSha256 !== canonicalSha256(request) ||
      publication.derivedMapSha256 !== canonicalSha256(publication.derivedMap)) {
    fail("identity_mismatch", "request or derived-map identity is stale");
  }
  if (publication.completeness === "sealed" &&
      (publication.coverage.complete !== true || publication.coverage.missingCells !== 0 ||
       publication.coverage.unresolvedCells !== 0 ||
       publication.publicationIdentity.immutable !== true)) {
    fail("incomplete_publication", "sealed publication is incomplete or mutable");
  }
  if (publication.publicationIdentity.replacesSourceHistory !== false ||
      publication.publicationIdentity.solverContinuationPermitted !== false) {
    fail("source_history_leakage", "derived map claims source-history or solver-continuation authority");
  }
}

export function validatePotentialConsumerPublication(contract, record) {
  if (contract.schema !== "architrino.potential-consumer-publication-contract.v1" || contract.status !== "accepted") {
    fail("missing_required_field", "accepted contract schema is unavailable");
  }
  if (record.schema !== "architrino.potential-consumer-publication-example.v1") {
    fail("missing_required_field", "example schema is invalid");
  }
  requireFields(record, contract.requiredUpstreamFields);
  requireFields(record, [
    "request.requestId", "request.sourcePathSetId", "request.sourceManifestSha256",
    "request.requiredHistory.startT", "request.requiredHistory.endT", "request.scaleMapId",
    "request.timeSelection.mode", "request.mapGeometry.productKind", "request.mapGeometry.axes",
    "request.mapGeometry.domain", "request.mapGeometry.sampleShape", "request.observable.id",
    "request.observable.version", "request.observable.kernelVersion", "request.sampling.policy",
    "request.numericPolicy.representationProfile", "request.numericPolicy.precisionBits",
    "request.numericPolicy.errorGrade", "request.output.view", "request.output.codecCapabilityId",
    "request.output.publicationMode", "request.output.consumerPurpose", "publication.productId",
    "publication.requestId", "publication.requestSha256", "publication.sourceBinding.pathSetId",
    "publication.observable.version", "publication.geometry.productKind", "publication.derivedMap.schema",
    "publication.derivedMap.values", "publication.derivedMapSha256", "publication.coverage.complete",
    "publication.completeness", "publication.codec.provider", "publication.codec.capabilityId",
    "publication.publicationIdentity.version"
  ]);
  validateHistoryAndScale(record);
  validateObservableAndCodec(contract, record);
  validateProductGeometry(contract, record);
  validateBindingsAndPublication(record);
  return {
    status: "passed",
    requestId: record.request.requestId,
    productId: record.publication.productId,
    productKind: record.request.mapGeometry.productKind,
    cells: record.publication.derivedMap.values.length,
    completeness: record.publication.completeness,
  };
}

export function applyFixtureMutation(record, mutation) {
  const copy = structuredClone(record);
  const parts = mutation.path.split(".");
  const key = parts.pop();
  const parent = parts.reduce((value, part) => value[part], copy);
  if (mutation.delete === true) delete parent[key];
  else parent[key] = mutation.value;
  return copy;
}

export function checkPotentialConsumerPublicationContract({ rootDir = ROOT } = {}) {
  const contract = readJson(rootDir, CONTRACT_PATH);
  const positive = readJson(rootDir, contract.fixtures.positive);
  const negative = readJson(rootDir, contract.fixtures.negative);
  const result = validatePotentialConsumerPublication(contract, positive);
  const cases = negative.cases.map((entry) => {
    const candidate = applyFixtureMutation(positive, entry.mutation);
    try {
      validatePotentialConsumerPublication(contract, candidate);
      fail("missing_required_field", `${entry.id} negative fixture unexpectedly passed`);
    } catch (error) {
      if (!(error instanceof ContractError) || error.code !== entry.expectedCode) {
        throw error;
      }
      return { id: entry.id, refusalCode: error.code };
    }
  });
  return { schema: contract.schema, status: "passed", positive: result, negativeCases: cases };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkPotentialConsumerPublicationContract(), null, 2));
}
