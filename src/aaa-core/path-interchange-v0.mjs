import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CONTRACT_PATH = "reference/priorities/app-aaa-core/aaa-core-path-interchange.v0.json";

export class PathInterchangeError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "PathInterchangeError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new PathInterchangeError(code, message);
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

export function recordSha256(record) {
  const { contentSha256: _contentSha256, ...identityPayload } = record;
  return canonicalSha256(identityPayload);
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

function requireFinite(value, label) {
  if (!Number.isFinite(value)) fail("missing_required_field", label);
  return value;
}

function requireSha(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) {
    fail("missing_required_field", label);
  }
  return value;
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function authorityDefinition(contract, level) {
  const definition = contract.authorityLevels.find((candidate) => candidate.id === level);
  if (!definition) fail("authority_escalation", `unknown authority level ${String(level)}`);
  return definition;
}

function validateCoverage(coverage, label) {
  requireObject(coverage, label);
  const startT = requireFinite(coverage.startT, `${label}.startT`);
  const endT = requireFinite(coverage.endT, `${label}.endT`);
  const acceptedThroughT = requireFinite(coverage.acceptedThroughT, `${label}.acceptedThroughT`);
  if (typeof coverage.complete !== "boolean") fail("missing_coverage", `${label}.complete`);
  if (startT > acceptedThroughT || acceptedThroughT > endT) {
    fail("missing_coverage", `${label} is not ordered`);
  }
  if (coverage.complete && acceptedThroughT !== endT) {
    fail("missing_coverage", `${label} is marked complete before endT`);
  }
}

function validateUnits(contract, units, label) {
  requireObject(units, label);
  if (units.wakeSpeed !== contract.rules.normalizedWakeSpeed) {
    fail("incompatible_scales", `${label}.wakeSpeed must equal ${contract.rules.normalizedWakeSpeed}`);
  }
  requireString(units.lengthScale, `${label}.lengthScale`);
  requireString(units.timeScale, `${label}.timeScale`);
  requireString(units.scaleMapId, `${label}.scaleMapId`);
}

function validateNumericPolicy(contract, numericPolicy, label) {
  requireObject(numericPolicy, label);
  const profile = contract.representationProfiles[numericPolicy.representationProfile];
  if (!profile) fail("unsupported_precision", `${label}.representationProfile`);
  if (!profile.representations.includes(numericPolicy.representation)) {
    fail("unsupported_precision", `${label}.representation is not allowed by ${numericPolicy.representationProfile}`);
  }
  if (!Number.isInteger(numericPolicy.precisionBits) ||
      numericPolicy.precisionBits < profile.minimumPrecisionBits ||
      numericPolicy.precisionBits > profile.maximumPrecisionBits) {
    fail("unsupported_precision", `${label}.precisionBits is outside the profile range`);
  }
  if (!["nearest_ties_even", "directed_interval", "exact_decimal", "declared_quantizer"].includes(numericPolicy.rounding)) {
    fail("unsupported_precision", `${label}.rounding`);
  }
  if (!["reject", "mark_unavailable"].includes(numericPolicy.nonfiniteBehavior)) {
    fail("unsupported_precision", `${label}.nonfiniteBehavior`);
  }
  if (!Number.isFinite(numericPolicy.maximumAbsoluteError) || numericPolicy.maximumAbsoluteError < 0) {
    fail("unsupported_precision", `${label}.maximumAbsoluteError`);
  }
  if (profile.requiresZeroDeclaredApproximationError && numericPolicy.maximumAbsoluteError !== 0) {
    fail("unsupported_precision", `${label} authoritative history declares approximation error`);
  }
}

function validateProvenance(provenance, label) {
  requireObject(provenance, label);
  requireString(provenance.producer, `${label}.producer`);
  requireString(provenance.producerVersion, `${label}.producerVersion`);
  const sourceRecords = requireArray(provenance.sourceRecords, `${label}.sourceRecords`);
  for (const [index, source] of sourceRecords.entries()) {
    requireObject(source, `${label}.sourceRecords[${index}]`);
    requireString(source.sourceId, `${label}.sourceRecords[${index}].sourceId`);
    requireSha(source.sourceSha256, `${label}.sourceRecords[${index}].sourceSha256`);
  }
  requireArray(provenance.transforms, `${label}.transforms`);
}

function validateAuthority(contract, authority, label) {
  requireObject(authority, label);
  const definition = authorityDefinition(contract, authority.level);
  requireString(authority.scientificOwner, `${label}.scientificOwner`);
  requireString(authority.evidenceUse, `${label}.evidenceUse`);
  if (authority.continuationPermitted !== definition.continuationPermitted) {
    fail("authority_escalation", `${label}.continuationPermitted conflicts with ${authority.level}`);
  }
  return definition;
}

function validateSourceBindings(sourceBindings, label) {
  for (const [index, binding] of requireArray(sourceBindings, label, { nonempty: true }).entries()) {
    requireObject(binding, `${label}[${index}]`);
    requireString(binding.pathSetId, `${label}[${index}].pathSetId`);
    requireSha(binding.manifestSha256, `${label}[${index}].manifestSha256`);
  }
}

function validatePathSetManifest(contract, record) {
  const payload = requireObject(record.payload, `${record.recordId}.payload`);
  requireString(payload.pathSetId, `${record.recordId}.pathSetId`);
  if (!contract.historyKinds.includes(payload.historyKind)) {
    fail("missing_required_field", `${record.recordId}.historyKind`);
  }
  const membership = requireArray(payload.membership, `${record.recordId}.membership`, { nonempty: true });
  const pathIds = new Set();
  for (const [index, member] of membership.entries()) {
    requireObject(member, `${record.recordId}.membership[${index}]`);
    const pathId = requireString(member.pathId, `${record.recordId}.membership[${index}].pathId`);
    requireString(member.role, `${record.recordId}.membership[${index}].role`);
    if (pathIds.has(pathId)) fail("duplicate_record_identity", `${record.recordId} repeats ${pathId}`);
    pathIds.add(pathId);
  }
  validateCoverage(payload.coverage, `${record.recordId}.coverage`);
  const frame = requireObject(payload.coordinateFrame, `${record.recordId}.coordinateFrame`);
  requireString(frame.frameId, `${record.recordId}.coordinateFrame.frameId`);
  if (!sameValue(frame.axes, ["X1", "X2", "X3"]) || frame.handedness !== "right") {
    fail("missing_required_field", `${record.recordId}.coordinateFrame`);
  }
  validateUnits(contract, payload.units, `${record.recordId}.units`);
  validateNumericPolicy(contract, payload.numericPolicy, `${record.recordId}.numericPolicy`);
  const interpolation = requireObject(payload.interpolation, `${record.recordId}.interpolation`);
  requireString(interpolation.basis, `${record.recordId}.interpolation.basis`);
  if (!Number.isFinite(interpolation.maximumPositionError) || interpolation.maximumPositionError < 0 ||
      interpolation.eventBoundaryBehavior !== "split_chunk") {
    fail("missing_required_field", `${record.recordId}.interpolation`);
  }
  validateProvenance(payload.provenance, `${record.recordId}.provenance`);
  validateAuthority(contract, payload.authority, `${record.recordId}.authority`);
  if (contract.historyAuthority[payload.historyKind] !== payload.authority.level) {
    fail("authority_escalation", `${record.recordId} history kind and authority disagree`);
  }
  const chunks = requireArray(payload.chunks, `${record.recordId}.chunks`);
  const chunkIds = new Set();
  for (const [index, chunk] of chunks.entries()) {
    requireObject(chunk, `${record.recordId}.chunks[${index}]`);
    const chunkId = requireString(chunk.chunkId, `${record.recordId}.chunks[${index}].chunkId`);
    requireSha(chunk.contentSha256, `${record.recordId}.chunks[${index}].contentSha256`);
    if (!Number.isInteger(chunk.sequence) || chunk.sequence < 0) {
      fail("broken_predecessor_chain", `${record.recordId}.chunks[${index}].sequence`);
    }
    if (chunkIds.has(chunkId)) fail("duplicate_record_identity", `${record.recordId} repeats ${chunkId}`);
    chunkIds.add(chunkId);
  }
}

function validatePathChunk(contract, record) {
  const payload = requireObject(record.payload, `${record.recordId}.payload`);
  requireString(payload.chunkId, `${record.recordId}.chunkId`);
  requireString(payload.pathSetId, `${record.recordId}.pathSetId`);
  requireString(payload.sourceManifestId, `${record.recordId}.sourceManifestId`);
  if (!Number.isInteger(payload.sequence) || payload.sequence < 0) {
    fail("broken_predecessor_chain", `${record.recordId}.sequence`);
  }
  if (payload.predecessorChunkSha256 !== null) {
    requireSha(payload.predecessorChunkSha256, `${record.recordId}.predecessorChunkSha256`);
  }
  validateCoverage(payload.coverage, `${record.recordId}.coverage`);
  validateUnits(contract, payload.units, `${record.recordId}.units`);
  validateNumericPolicy(contract, payload.numericPolicy, `${record.recordId}.numericPolicy`);
  const samples = requireArray(payload.samples, `${record.recordId}.samples`, { nonempty: true });
  for (const [index, sample] of samples.entries()) {
    requireObject(sample, `${record.recordId}.samples[${index}]`);
    requireString(sample.pathId, `${record.recordId}.samples[${index}].pathId`);
    const T = requireFinite(sample.T, `${record.recordId}.samples[${index}].T`);
    if (T < payload.coverage.startT || T > payload.coverage.endT) {
      fail("missing_coverage", `${record.recordId}.samples[${index}].T`);
    }
    if (!Array.isArray(sample.position) || sample.position.length !== 3 ||
        sample.position.some((coordinate) => !Number.isFinite(coordinate))) {
      fail("missing_required_field", `${record.recordId}.samples[${index}].position`);
    }
    if (sample.positionUncertainty !== undefined &&
        (!Number.isFinite(sample.positionUncertainty) || sample.positionUncertainty < 0)) {
      fail("invalid_experimental_provenance", `${record.recordId}.samples[${index}].positionUncertainty`);
    }
  }
  const markers = requireArray(payload.eventMarkers, `${record.recordId}.eventMarkers`);
  for (const [index, marker] of markers.entries()) {
    requireObject(marker, `${record.recordId}.eventMarkers[${index}]`);
    requireString(marker.eventId, `${record.recordId}.eventMarkers[${index}].eventId`);
    requireString(marker.kind, `${record.recordId}.eventMarkers[${index}].kind`);
    const T = requireFinite(marker.T, `${record.recordId}.eventMarkers[${index}].T`);
    if (T < payload.coverage.startT || T > payload.coverage.endT || marker.boundary !== true) {
      fail("missing_coverage", `${record.recordId}.eventMarkers[${index}]`);
    }
  }
  validateProvenance(payload.provenance, `${record.recordId}.provenance`);
  validateAuthority(contract, payload.authority, `${record.recordId}.authority`);
}

function validateStreamEnvelope(record) {
  const payload = requireObject(record.payload, `${record.recordId}.payload`);
  requireString(payload.streamId, `${record.recordId}.streamId`);
  requireString(payload.pathSetId, `${record.recordId}.pathSetId`);
  requireSha(payload.sourceManifestSha256, `${record.recordId}.sourceManifestSha256`);
  if (!["open", "halted", "sealed"].includes(payload.state)) {
    fail("invalid_stream_state", `${record.recordId}.state`);
  }
  if (!Number.isInteger(payload.sequenceBase) || payload.sequenceBase < 0 ||
      !Number.isInteger(payload.nextSequence) || payload.nextSequence < payload.sequenceBase) {
    fail("invalid_stream_state", `${record.recordId}.sequence range`);
  }
  requireFinite(payload.acceptedThroughT, `${record.recordId}.acceptedThroughT`);
  requireArray(payload.chunkRefs, `${record.recordId}.chunkRefs`);
  if (payload.state === "halted") {
    requireObject(payload.halt, `${record.recordId}.halt`);
    requireString(payload.halt.code, `${record.recordId}.halt.code`);
    requireString(payload.halt.message, `${record.recordId}.halt.message`);
  } else if (payload.halt !== null) {
    fail("invalid_stream_state", `${record.recordId}.halt must be null`);
  }
}

function validateViewManifest(contract, record) {
  const payload = requireObject(record.payload, `${record.recordId}.payload`);
  requireString(payload.viewId, `${record.recordId}.viewId`);
  validateSourceBindings(payload.sourceBindings, `${record.recordId}.sourceBindings`);
  requireObject(payload.query, `${record.recordId}.query`);
  requireArray(payload.transforms, `${record.recordId}.transforms`);
  validateNumericPolicy(contract, payload.numericPolicy, `${record.recordId}.numericPolicy`);
  validateProvenance(payload.provenance, `${record.recordId}.provenance`);
  validateAuthority(contract, payload.authority, `${record.recordId}.authority`);
}

function validateDerivedProductManifest(contract, record) {
  const payload = requireObject(record.payload, `${record.recordId}.payload`);
  requireString(payload.productId, `${record.recordId}.productId`);
  requireString(payload.productKind, `${record.recordId}.productKind`);
  validateSourceBindings(payload.sourceBindings, `${record.recordId}.sourceBindings`);
  if (payload.viewManifestId !== null) requireString(payload.viewManifestId, `${record.recordId}.viewManifestId`);
  validateCoverage(payload.coverage, `${record.recordId}.coverage`);
  if (!["provisional", "sealed", "halted"].includes(payload.completeness)) {
    fail("incomplete_seal", `${record.recordId}.completeness`);
  }
  const codec = requireObject(payload.codec, `${record.recordId}.codec`);
  requireString(codec.capabilityId, `${record.recordId}.codec.capabilityId`);
  requireString(codec.provider, `${record.recordId}.codec.provider`);
  if (!["precision_bounded_analysis", "display_stream"].includes(codec.representationProfile)) {
    fail("unsupported_precision", `${record.recordId}.codec.representationProfile`);
  }
  validateProvenance(payload.provenance, `${record.recordId}.provenance`);
  validateAuthority(contract, payload.authority, `${record.recordId}.authority`);
  if (!contract.derivedProductAuthorityLevels.includes(payload.authority.level)) {
    fail("authority_escalation", `${record.recordId} uses a source-only authority level`);
  }
}

function validateLocalRecord(contract, record) {
  requireObject(record, "record");
  if (record.schema !== contract.interchangeSchema || record.version !== contract.version) {
    fail("unknown_schema_version", `${String(record.schema)} @ ${String(record.version)}`);
  }
  if (!contract.recordTypes.includes(record.recordType)) {
    fail("unknown_schema_version", `${String(record.recordType)}`);
  }
  requireString(record.recordId, "record.recordId");
  requireSha(record.contentSha256, `${record.recordId}.contentSha256`);
  switch (record.recordType) {
    case "path_set_manifest": validatePathSetManifest(contract, record); break;
    case "path_chunk": validatePathChunk(contract, record); break;
    case "stream_envelope": validateStreamEnvelope(record); break;
    case "view_manifest": validateViewManifest(contract, record); break;
    case "derived_product_manifest": validateDerivedProductManifest(contract, record); break;
    default: fail("unknown_schema_version", `${record.recordId}.recordType`);
  }
}

function resolveSourceBindings(contract, record, manifestsByPathSet) {
  const bindings = record.payload.sourceBindings;
  let minimumRank = Number.POSITIVE_INFINITY;
  for (const binding of bindings) {
    const manifest = manifestsByPathSet.get(binding.pathSetId);
    if (!manifest || manifest.contentSha256 !== binding.manifestSha256) {
      fail("missing_source_binding", `${record.recordId} cannot resolve ${binding.pathSetId}`);
    }
    minimumRank = Math.min(minimumRank, authorityDefinition(contract, manifest.payload.authority.level).rank);
  }
  const outputRank = authorityDefinition(contract, record.payload.authority.level).rank;
  if (outputRank > minimumRank || record.payload.authority.continuationPermitted) {
    fail("authority_escalation", `${record.recordId} raises source authority`);
  }
  return bindings.map((binding) => manifestsByPathSet.get(binding.pathSetId));
}

export function validatePathInterchangeBundle(contract, bundle) {
  const records = requireArray(bundle.records, `${bundle.caseId ?? "bundle"}.records`, { nonempty: true });
  for (const record of records) validateLocalRecord(contract, record);

  const byRecordId = new Map();
  for (const record of records) {
    if (byRecordId.has(record.recordId)) fail("duplicate_record_identity", record.recordId);
    byRecordId.set(record.recordId, record);
  }

  const manifests = records.filter((record) => record.recordType === "path_set_manifest");
  const manifestsByPathSet = new Map();
  for (const manifest of manifests) {
    if (manifestsByPathSet.has(manifest.payload.pathSetId)) {
      fail("duplicate_record_identity", manifest.payload.pathSetId);
    }
    manifestsByPathSet.set(manifest.payload.pathSetId, manifest);
  }

  const chunks = records.filter((record) => record.recordType === "path_chunk");
  const chunksById = new Map(chunks.map((chunk) => [chunk.payload.chunkId, chunk]));
  for (const chunk of chunks) {
    const manifest = manifestsByPathSet.get(chunk.payload.pathSetId);
    if (!manifest || chunk.payload.sourceManifestId !== manifest.recordId) {
      fail("missing_source_binding", `${chunk.recordId} has no matching manifest`);
    }
    if (!sameValue(chunk.payload.units, manifest.payload.units)) {
      fail("incompatible_scales", `${chunk.recordId} units differ from ${manifest.recordId}`);
    }
    if (!sameValue(chunk.payload.numericPolicy, manifest.payload.numericPolicy) ||
        chunk.payload.authority.level !== manifest.payload.authority.level ||
        chunk.payload.authority.scientificOwner !== manifest.payload.authority.scientificOwner) {
      fail("authority_escalation", `${chunk.recordId} does not preserve manifest numeric policy or authority`);
    }
    const pathIds = new Set(manifest.payload.membership.map((member) => member.pathId));
    if (chunk.payload.samples.some((sample) => !pathIds.has(sample.pathId))) {
      fail("missing_source_binding", `${chunk.recordId} contains an undeclared path`);
    }
    if (manifest.payload.historyKind === "experimental_observer_path") {
      if (manifest.payload.provenance.sourceRecords.length === 0 ||
          chunk.payload.samples.some((sample) => sample.positionUncertainty === undefined)) {
        fail("invalid_experimental_provenance", `${chunk.recordId} loses measurement provenance or uncertainty`);
      }
    }
  }

  for (const manifest of manifests) {
    let predecessor = null;
    const orderedRefs = [...manifest.payload.chunks].sort((left, right) => left.sequence - right.sequence);
    for (const [offset, reference] of orderedRefs.entries()) {
      if (reference.sequence !== offset) {
        fail("broken_predecessor_chain", `${manifest.recordId} sequence ${reference.sequence}`);
      }
      const chunk = chunksById.get(reference.chunkId);
      if (!chunk || chunk.contentSha256 !== reference.contentSha256 ||
          chunk.payload.sequence !== reference.sequence ||
          chunk.payload.predecessorChunkSha256 !== predecessor) {
        fail("broken_predecessor_chain", `${manifest.recordId} cannot close ${reference.chunkId}`);
      }
      predecessor = chunk.contentSha256;
    }
  }

  for (const stream of records.filter((record) => record.recordType === "stream_envelope")) {
    const manifest = manifestsByPathSet.get(stream.payload.pathSetId);
    if (!manifest || manifest.contentSha256 !== stream.payload.sourceManifestSha256) {
      fail("missing_source_binding", `${stream.recordId} source manifest`);
    }
    let predecessor = null;
    for (const [offset, reference] of stream.payload.chunkRefs.entries()) {
      const expectedSequence = stream.payload.sequenceBase + offset;
      const chunk = chunksById.get(reference.chunkId);
      if (!chunk || reference.sequence !== expectedSequence ||
          chunk.contentSha256 !== reference.contentSha256 ||
          chunk.payload.predecessorChunkSha256 !== predecessor) {
        fail("broken_predecessor_chain", `${stream.recordId} sequence ${expectedSequence}`);
      }
      predecessor = chunk.contentSha256;
    }
    if (stream.payload.nextSequence !== stream.payload.sequenceBase + stream.payload.chunkRefs.length ||
        stream.payload.acceptedThroughT !== manifest.payload.coverage.acceptedThroughT) {
      fail("invalid_stream_state", `${stream.recordId} watermark or next sequence`);
    }
    if (stream.payload.state === "sealed" &&
        (!manifest.payload.coverage.complete ||
         stream.payload.chunkRefs.length !== manifest.payload.chunks.length)) {
      fail("incomplete_seal", `${stream.recordId} is sealed without complete source closure`);
    }
  }

  const viewsById = new Map();
  for (const view of records.filter((record) => record.recordType === "view_manifest")) {
    resolveSourceBindings(contract, view, manifestsByPathSet);
    viewsById.set(view.payload.viewId, view);
  }

  for (const product of records.filter((record) => record.recordType === "derived_product_manifest")) {
    const sources = resolveSourceBindings(contract, product, manifestsByPathSet);
    if (product.payload.viewManifestId !== null) {
      const view = viewsById.get(product.payload.viewManifestId);
      if (!view || !sameValue(view.payload.sourceBindings, product.payload.sourceBindings)) {
        fail("missing_source_binding", `${product.recordId} view binding`);
      }
    }
    if (product.payload.completeness === "sealed" &&
        (!product.payload.coverage.complete || sources.some((source) => !source.payload.coverage.complete))) {
      fail("incomplete_seal", `${product.recordId} is sealed without complete source closure`);
    }
  }

  for (const record of records) {
    if (record.contentSha256 !== recordSha256(record)) {
      fail("identity_mismatch", record.recordId);
    }
  }

  return {
    caseId: bundle.caseId,
    recordCount: records.length,
    recordTypes: [...new Set(records.map((record) => record.recordType))].sort(),
    status: "passed",
  };
}

function pathParts(dottedPath) {
  return dottedPath.split(".").map((part) => /^\d+$/u.test(part) ? Number(part) : part);
}

export function applyFixtureMutation(bundle, mutation) {
  const copy = structuredClone(bundle);
  const parts = pathParts(mutation.path);
  const key = parts.pop();
  const parent = parts.reduce((value, part) => value?.[part], copy);
  if (parent === undefined || parent === null) fail("missing_required_field", mutation.path);
  if (mutation.delete === true) delete parent[key];
  else parent[key] = mutation.value;
  return copy;
}

export function checkPathInterchangeContract({ rootDir = ROOT } = {}) {
  const contract = readJson(rootDir, CONTRACT_PATH);
  if (contract.schema !== "aaa_core_path_interchange_contract/v0" ||
      contract.interchangeSchema !== "aaa_core_path_interchange/v0" ||
      contract.status !== "accepted" || contract.version !== 0) {
    fail("unknown_schema_version", "contract control record");
  }
  const positiveSuite = readJson(rootDir, contract.fixtures.positive);
  const negativeSuite = readJson(rootDir, contract.fixtures.negative);
  const positive = positiveSuite.cases.map((fixtureCase) => validatePathInterchangeBundle(contract, fixtureCase));
  const byCaseId = new Map(positiveSuite.cases.map((fixtureCase) => [fixtureCase.caseId, fixtureCase]));
  const negative = negativeSuite.cases.map((negativeCase) => {
    const base = byCaseId.get(negativeCase.baseCaseId);
    if (!base) fail("missing_required_field", `${negativeCase.id}.baseCaseId`);
    const candidate = applyFixtureMutation(base, negativeCase.mutation);
    try {
      validatePathInterchangeBundle(contract, candidate);
      fail("missing_required_field", `${negativeCase.id} unexpectedly passed`);
    } catch (error) {
      if (!(error instanceof PathInterchangeError) || error.code !== negativeCase.expectedCode) throw error;
      return { id: negativeCase.id, refusalCode: error.code };
    }
  });
  return {
    schema: contract.schema,
    status: "passed",
    positive,
    negative,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkPathInterchangeContract(), null, 2));
}
