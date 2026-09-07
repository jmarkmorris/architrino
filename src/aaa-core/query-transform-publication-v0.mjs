import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import {
  canonicalSha256,
  recordSha256,
  validatePathInterchangeBundle,
} from "./path-interchange-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CONTRACT_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-query-transform-publication.v0.json";
const PATH_CONTRACT_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-path-interchange.v0.json";
const CODEC_REGISTRY_PATH = "reference/priorities/app-aaa-core/contracts/aaa-core-codec-registry.v0.json";

const REQUEST_KEYS = ["numericPolicy", "output", "query", "requestId", "schema", "sourceBindings", "transforms"];
const QUERY_KEYS = ["eventKinds", "minimumAuthority", "pathIds", "timeRange"];
const TIME_RANGE_KEYS = ["endT", "startT"];
const OUTPUT_KEYS = ["codecCapabilityId", "codecProvider", "productKind", "representationProfile"];
const TRANSFORM_KEYS = ["authorityEffect", "coverageEffect", "maximumAddedAbsoluteError", "parameters", "transformId", "version"];
const NUMERIC_POLICY_KEYS = ["maximumAbsoluteError", "nonfiniteBehavior", "precisionBits", "representation", "representationProfile", "rounding"];
const SOURCE_BINDING_KEYS = ["manifestSha256", "pathSetId"];
const SUPPORTED_TRANSFORMS = new Set([
  "aaa-core.translate/v0",
  "aaa-core.scale/v0",
  "aaa-core.select/v0",
]);

export class QueryPublicationError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "QueryPublicationError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new QueryPublicationError(code, message);
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

function requireArray(value, label, {nonempty = false} = {}) {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) fail("missing_required_field", label);
  return value;
}

function requireFiniteNonnegative(value, label) {
  if (!Number.isFinite(value) || value < 0) fail("missing_required_field", label);
  return value;
}

function requireSha(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/u.test(value)) fail("missing_required_field", label);
  return value;
}

function assertExactKeys(value, keys, label, code = "unsupported_query_field") {
  requireObject(value, label);
  const actual = Object.keys(value).sort();
  const allowed = new Set(keys);
  const unsupported = actual.filter((key) => !allowed.has(key));
  if (unsupported.length > 0) fail(code, `${label}.${unsupported[0]}`);
}

function requireExactFields(value, keys, label, code = "missing_required_field") {
  for (const key of keys) {
    if (!(key in value)) fail(code, `${label}.${key}`);
  }
}

function uniqueSortedStrings(values, label) {
  const result = requireArray(values, label).map((value, index) => requireString(value, `${label}[${index}]`));
  if (new Set(result).size !== result.length) fail("unsupported_query_field", `${label} contains duplicates`);
  return [...result].sort();
}

function authorityRank(pathContract, authority) {
  const entry = pathContract.authorityLevels.find((candidate) => candidate.id === authority);
  if (!entry) fail("authority_escalation", `unknown authority ${String(authority)}`);
  return entry.rank;
}

function authorityAtOrBelow(pathContract, rank, preferred) {
  if (preferred && authorityRank(pathContract, preferred) <= rank) return preferred;
  if (rank >= authorityRank(pathContract, "derived_analysis")) return "derived_analysis";
  if (rank >= authorityRank(pathContract, "display_only")) return "display_only";
  return "untrusted_import";
}

function canonicalSourceBindings(sourceBindings) {
  const seen = new Set();
  const normalized = requireArray(sourceBindings, "request.sourceBindings", {nonempty: true}).map((binding, index) => {
    assertExactKeys(binding, SOURCE_BINDING_KEYS, `request.sourceBindings[${index}]`);
    requireExactFields(binding, SOURCE_BINDING_KEYS, `request.sourceBindings[${index}]`);
    const pathSetId = requireString(binding.pathSetId, `request.sourceBindings[${index}].pathSetId`);
    const manifestSha256 = requireSha(binding.manifestSha256, `request.sourceBindings[${index}].manifestSha256`);
    const key = `${pathSetId}\u0000${manifestSha256}`;
    if (seen.has(key)) fail("duplicate_source_binding", pathSetId);
    seen.add(key);
    return {pathSetId, manifestSha256};
  });
  return normalized.sort((left, right) =>
    left.pathSetId.localeCompare(right.pathSetId) || left.manifestSha256.localeCompare(right.manifestSha256));
}

export function validateQueryPublicationContract(contract) {
  requireObject(contract, "contract");
  if (contract.schema !== "aaa_core_query_transform_publication/v0" || contract.version !== 0 ||
      contract.status !== "accepted" || contract.owner !== "AAA Core") {
    fail("invalid_contract", "query/transform/publication control record");
  }
  requireObject(contract.normalization, "contract.normalization");
  requireObject(contract.identities, "contract.identities");
  requireObject(contract.transformRules, "contract.transformRules");
  requireObject(contract.publicationRules, "contract.publicationRules");
  requireObject(contract.authorityCaps, "contract.authorityCaps");
  const codes = requireArray(contract.refusalCodes, "contract.refusalCodes", {nonempty: true});
  if (new Set(codes).size !== codes.length) fail("invalid_contract", "duplicate refusal code");
  return contract;
}

export function normalizeQueryRequest(contract, request) {
  validateQueryPublicationContract(contract);
  assertExactKeys(request, REQUEST_KEYS, "request");
  requireExactFields(request, REQUEST_KEYS, "request");
  if (request.schema !== contract.requestSchema) fail("missing_required_field", "request.schema");
  requireString(request.requestId, "request.requestId");

  const sourceBindings = canonicalSourceBindings(request.sourceBindings);

  assertExactKeys(request.query, QUERY_KEYS, "request.query");
  requireExactFields(request.query, QUERY_KEYS, "request.query");
  assertExactKeys(request.query.timeRange, TIME_RANGE_KEYS, "request.query.timeRange");
  requireExactFields(request.query.timeRange, TIME_RANGE_KEYS, "request.query.timeRange");
  const startT = request.query.timeRange.startT;
  const endT = request.query.timeRange.endT;
  if (!Number.isFinite(startT) || !Number.isFinite(endT) || startT > endT) {
    fail("unsupported_query_field", "request.query.timeRange");
  }
  const query = {
    pathIds: uniqueSortedStrings(request.query.pathIds, "request.query.pathIds"),
    timeRange: {startT, endT},
    eventKinds: uniqueSortedStrings(request.query.eventKinds, "request.query.eventKinds"),
    minimumAuthority: requireString(request.query.minimumAuthority, "request.query.minimumAuthority"),
  };

  const transforms = requireArray(request.transforms, "request.transforms").map((transform, index) => {
    const label = `request.transforms[${index}]`;
    assertExactKeys(transform, TRANSFORM_KEYS, label);
    requireExactFields(transform, TRANSFORM_KEYS, label);
    const transformId = requireString(transform.transformId, `${label}.transformId`);
    if (!SUPPORTED_TRANSFORMS.has(transformId)) fail("unsupported_transform", transformId);
    requireString(transform.version, `${label}.version`);
    requireObject(transform.parameters, `${label}.parameters`);
    if (!contract.transformRules.authorityEffects.includes(transform.authorityEffect) ||
        !contract.transformRules.coverageEffects.includes(transform.coverageEffect)) {
      fail("unsupported_transform", `${transformId} effect`);
    }
    requireFiniteNonnegative(transform.maximumAddedAbsoluteError, `${label}.maximumAddedAbsoluteError`);
    return structuredClone(transform);
  });

  assertExactKeys(request.numericPolicy, NUMERIC_POLICY_KEYS, "request.numericPolicy");
  requireExactFields(request.numericPolicy, NUMERIC_POLICY_KEYS, "request.numericPolicy");
  requireFiniteNonnegative(request.numericPolicy.maximumAbsoluteError, "request.numericPolicy.maximumAbsoluteError");

  assertExactKeys(request.output, OUTPUT_KEYS, "request.output");
  requireExactFields(request.output, OUTPUT_KEYS, "request.output");
  for (const key of OUTPUT_KEYS) requireString(request.output[key], `request.output.${key}`);

  return {
    schema: request.schema,
    requestId: request.requestId,
    sourceBindings,
    query,
    transforms,
    numericPolicy: structuredClone(request.numericPolicy),
    output: structuredClone(request.output),
  };
}

export function computeQueryIdentities(contract, request) {
  const normalized = normalizeQueryRequest(contract, request);
  const queryIdentity = canonicalSha256({sourceBindings: normalized.sourceBindings, query: normalized.query});
  const transformPipelineIdentity = canonicalSha256(normalized.transforms);
  const cacheIdentity = canonicalSha256({
    contractSchema: contract.schema,
    version: contract.version,
    queryIdentity,
    transformPipelineIdentity,
    numericPolicy: normalized.numericPolicy,
    output: normalized.output,
  });
  return {normalized, queryIdentity, transformPipelineIdentity, cacheIdentity};
}

function resolveSources(pathContract, sourceBundle, sourceBindings) {
  validatePathInterchangeBundle(pathContract, sourceBundle);
  const manifests = new Map(sourceBundle.records
    .filter((record) => record.recordType === "path_set_manifest")
    .map((record) => [record.payload.pathSetId, record]));
  return sourceBindings.map((binding) => {
    const manifest = manifests.get(binding.pathSetId);
    if (!manifest || manifest.contentSha256 !== binding.manifestSha256) {
      fail("missing_source_binding", binding.pathSetId);
    }
    return manifest;
  });
}

function resolveCodec(codecRegistry, request, publisher) {
  const provider = codecRegistry.providers?.find((candidate) =>
    candidate.capabilityId === request.output.codecCapabilityId &&
    candidate.providerId === request.output.codecProvider);
  if (!provider || !provider.profiles.includes(request.output.representationProfile) ||
      !provider.permittedConsumers.includes(publisher)) {
    fail("unregistered_codec", `${request.output.codecProvider}:${request.output.codecCapabilityId}`);
  }
  return provider;
}

function outputAuthority(pathContract, contract, sources, transforms) {
  let rank = Math.min(
    authorityRank(pathContract, "derived_analysis"),
    ...sources.map((source) => authorityRank(pathContract, source.payload.authority.level)),
  );
  let preferred = "derived_analysis";
  for (const transform of transforms) {
    const cap = contract.authorityCaps[transform.authorityEffect];
    if (cap !== null) {
      rank = Math.min(rank, authorityRank(pathContract, cap));
      preferred = cap;
    }
  }
  return authorityAtOrBelow(pathContract, rank, preferred);
}

function coverageFor(sources, timeRange) {
  const acceptedThroughT = Math.min(timeRange.endT, ...sources.map((source) => source.payload.coverage.acceptedThroughT));
  return {
    startT: timeRange.startT,
    endT: timeRange.endT,
    acceptedThroughT,
    complete: sources.every((source) => source.payload.coverage.complete) && acceptedThroughT === timeRange.endT,
  };
}

function makeRecord(recordType, recordId, payload) {
  const record = {schema: "aaa_core_path_interchange/v0", recordType, recordId, version: 0, contentSha256: "", payload};
  record.contentSha256 = recordSha256(record);
  return record;
}

function receiptSha256(receipt) {
  const {receiptSha256: _receiptSha256, ...payload} = receipt;
  return canonicalSha256(payload);
}

export function buildPublication({
  contract,
  pathContract,
  codecRegistry,
  sourceBundle,
  request,
  publisher,
  permittedConsumers,
  state,
}) {
  const identities = computeQueryIdentities(contract, request);
  const normalized = identities.normalized;
  const sources = resolveSources(pathContract, sourceBundle, normalized.sourceBindings);
  const provider = resolveCodec(codecRegistry, normalized, publisher);
  const consumers = uniqueSortedStrings(permittedConsumers, "permittedConsumers");
  const publicationState = requireString(state, "state");
  if (!contract.publicationRules.states.includes(publicationState)) fail("missing_required_field", "state");

  const sourceRank = Math.min(...sources.map((source) => authorityRank(pathContract, source.payload.authority.level)));
  if (sourceRank < authorityRank(pathContract, normalized.query.minimumAuthority)) {
    fail("authority_escalation", "query minimum authority exceeds a source");
  }
  const authorityLevel = outputAuthority(pathContract, contract, sources, normalized.transforms);
  const coverage = coverageFor(sources, normalized.query.timeRange);
  if (publicationState === "sealed" && (!coverage.complete || sources.some((source) => !source.payload.coverage.complete))) {
    fail("incomplete_seal", "sealed publication lacks complete source or output coverage");
  }

  const sourceRecords = sources.map((source) => ({sourceId: source.recordId, sourceSha256: source.contentSha256}));
  const transformNames = normalized.transforms.map((transform) => `${transform.transformId}@${transform.version}`);
  const authority = {
    level: authorityLevel,
    scientificOwner: publisher,
    continuationPermitted: false,
    evidenceUse: "synthetic query, transform, and publication contract conformance only",
  };
  const viewId = `view.${identities.queryIdentity}`;
  const view = makeRecord("view_manifest", `record.${viewId}`, {
    viewId,
    sourceBindings: structuredClone(normalized.sourceBindings),
    query: structuredClone(normalized.query),
    transforms: structuredClone(normalized.transforms),
    numericPolicy: structuredClone(normalized.numericPolicy),
    provenance: {producer: publisher, producerVersion: contract.schema, sourceRecords: structuredClone(sourceRecords), transforms: [...transformNames]},
    authority: structuredClone(authority),
  });
  const productId = `product.${identities.cacheIdentity}`;
  const product = makeRecord("derived_product_manifest", `record.${productId}`, {
    productId,
    productKind: normalized.output.productKind,
    sourceBindings: structuredClone(normalized.sourceBindings),
    viewManifestId: viewId,
    coverage,
    completeness: publicationState,
    codec: {
      capabilityId: provider.capabilityId,
      provider: provider.providerId,
      representationProfile: normalized.output.representationProfile,
    },
    provenance: {producer: publisher, producerVersion: contract.schema, sourceRecords: structuredClone(sourceRecords), transforms: [...transformNames]},
    authority: structuredClone(authority),
  });

  const receipt = {
    schema: "aaa_core_publication_receipt/v0",
    publisher,
    permittedConsumers: consumers,
    cacheIdentity: identities.cacheIdentity,
    viewId,
    viewContentSha256: view.contentSha256,
    productId,
    productContentSha256: product.contentSha256,
    sourceBindings: structuredClone(normalized.sourceBindings),
    publicationState,
    outputCoverageComplete: coverage.complete,
    immutable: publicationState === "sealed",
    outputAuthority: authorityLevel,
    solverContinuationPermitted: false,
    receiptSha256: "",
  };
  receipt.receiptSha256 = receiptSha256(receipt);

  const publication = {
    schema: "aaa_core_query_publication_bundle/v0",
    request: normalized,
    identities: {
      queryIdentity: identities.queryIdentity,
      transformPipelineIdentity: identities.transformPipelineIdentity,
      cacheIdentity: identities.cacheIdentity,
    },
    view,
    product,
    receipt,
  };
  validatePublicationBundle({contract, pathContract, codecRegistry, sourceBundle, publication});
  return publication;
}

export function validatePublicationBundle({contract, pathContract, codecRegistry, sourceBundle, publication}) {
  requireObject(publication, "publication");
  const computed = computeQueryIdentities(contract, publication.request);
  if (publication.identities?.queryIdentity !== computed.queryIdentity) fail("cache_identity_mismatch", "query identity");
  if (publication.identities?.transformPipelineIdentity !== computed.transformPipelineIdentity) {
    fail("transform_order_collision", "ordered transform identity");
  }
  if (publication.identities?.cacheIdentity !== computed.cacheIdentity) fail("cache_identity_mismatch", "cache identity");

  const sources = resolveSources(pathContract, sourceBundle, computed.normalized.sourceBindings);
  const expectedBindings = JSON.stringify(computed.normalized.sourceBindings);
  if (JSON.stringify(publication.view?.payload?.sourceBindings) !== expectedBindings ||
      JSON.stringify(publication.product?.payload?.sourceBindings) !== expectedBindings ||
      JSON.stringify(publication.receipt?.sourceBindings) !== expectedBindings) {
    fail("source_closure_mismatch", "request, view, product, and receipt source bindings differ");
  }
  const provider = resolveCodec(codecRegistry, computed.normalized, publication.receipt?.publisher);
  if (publication.product?.payload?.codec?.capabilityId !== provider.capabilityId ||
      publication.product?.payload?.codec?.provider !== provider.providerId ||
      publication.product?.payload?.codec?.representationProfile !== computed.normalized.output.representationProfile) {
    fail("unregistered_codec", "product codec does not match the registered request capability");
  }

  const expectedAuthority = outputAuthority(pathContract, contract, sources, computed.normalized.transforms);
  const actualAuthority = publication.product?.payload?.authority?.level;
  if (authorityRank(pathContract, actualAuthority) > authorityRank(pathContract, expectedAuthority) ||
      publication.view?.payload?.authority?.continuationPermitted ||
      publication.product?.payload?.authority?.continuationPermitted ||
      publication.receipt?.solverContinuationPermitted ||
      publication.receipt?.outputAuthority !== actualAuthority) {
    fail("authority_escalation", "publication raises authority or permits continuation");
  }

  if (publication.product.payload.completeness === "sealed" &&
      (!publication.product.payload.coverage.complete || sources.some((source) => !source.payload.coverage.complete))) {
    fail("incomplete_seal", "sealed product lacks complete source or output coverage");
  }
  if (publication.receipt.publicationState !== publication.product.payload.completeness ||
      publication.receipt.outputCoverageComplete !== publication.product.payload.coverage.complete) {
    fail("incomplete_seal", "receipt and product completeness differ");
  }
  if (publication.receipt.publicationState === "sealed" && publication.receipt.immutable !== true) {
    fail("mutable_publication", "sealed receipt is mutable");
  }

  if (publication.receipt.cacheIdentity !== computed.cacheIdentity ||
      publication.receipt.viewId !== publication.view.payload.viewId ||
      publication.receipt.viewContentSha256 !== publication.view.contentSha256 ||
      publication.receipt.productId !== publication.product.payload.productId ||
      publication.receipt.productContentSha256 !== publication.product.contentSha256 ||
      receiptSha256(publication.receipt) !== publication.receipt.receiptSha256) {
    fail("publication_identity_mismatch", "receipt identity or record binding");
  }

  validatePathInterchangeBundle(pathContract, {
    caseId: `publication-${computed.cacheIdentity}`,
    records: [...sourceBundle.records, publication.view, publication.product],
  });
  return {status: "passed", cacheIdentity: computed.cacheIdentity, productId: publication.product.payload.productId};
}

export function retrievePublishedProduct(publication, consumer, {productId, productContentSha256, receiptSha256: requestedReceiptSha256}) {
  if (!publication.receipt.permittedConsumers.includes(consumer)) fail("forbidden_consumer", consumer);
  if (publication.receipt.productId !== productId || publication.receipt.productContentSha256 !== productContentSha256 ||
      publication.receipt.receiptSha256 !== requestedReceiptSha256 || receiptSha256(publication.receipt) !== requestedReceiptSha256) {
    fail("publication_identity_mismatch", "retrieval identity");
  }
  return {receipt: structuredClone(publication.receipt), product: structuredClone(publication.product)};
}

function mutatePath(target, mutation) {
  const copy = structuredClone(target);
  const parts = mutation.path.split(".").map((part) => /^\d+$/u.test(part) ? Number(part) : part);
  const key = parts.pop();
  const parent = parts.reduce((value, part) => value?.[part], copy);
  if (parent === undefined || parent === null) fail("missing_required_field", mutation.path);
  if (mutation.delete) delete parent[key];
  else parent[key] = structuredClone(mutation.value);
  return copy;
}

function fixtureSources(positivePathSuite, caseId) {
  const candidate = positivePathSuite.cases.find((entry) => entry.caseId === caseId);
  if (!candidate) fail("missing_required_field", `source fixture ${caseId}`);
  return candidate;
}

export function checkQueryTransformPublicationContract({rootDir = ROOT} = {}) {
  const contract = readJson(rootDir, CONTRACT_PATH);
  const pathContract = readJson(rootDir, PATH_CONTRACT_PATH);
  const codecRegistry = readJson(rootDir, CODEC_REGISTRY_PATH);
  validateQueryPublicationContract(contract);
  const positiveSuite = readJson(rootDir, contract.conformance.positiveFixtures);
  const negativeSuite = readJson(rootDir, contract.conformance.negativeFixtures);
  const positivePathSuite = readJson(rootDir, positiveSuite.pathInterchangeFixtureSuite);

  const built = new Map();
  const positive = positiveSuite.cases.map((candidate) => {
    const sourceBundle = fixtureSources(positivePathSuite, candidate.sourceCaseId);
    const publication = buildPublication({
      contract,
      pathContract,
      codecRegistry,
      sourceBundle,
      request: candidate.request,
      publisher: candidate.publisher,
      permittedConsumers: candidate.permittedConsumers,
      state: candidate.state,
    });
    if (candidate.equivalentRequest) {
      const equivalent = computeQueryIdentities(contract, candidate.equivalentRequest);
      if (equivalent.cacheIdentity !== publication.identities.cacheIdentity) fail("cache_identity_mismatch", candidate.caseId);
    }
    if (candidate.reorderedRequest) {
      const reordered = computeQueryIdentities(contract, candidate.reorderedRequest);
      if (reordered.cacheIdentity === publication.identities.cacheIdentity) fail("transform_order_collision", candidate.caseId);
    }
    if (candidate.retrievalConsumer) {
      retrievePublishedProduct(publication, candidate.retrievalConsumer, {
        productId: publication.receipt.productId,
        productContentSha256: publication.receipt.productContentSha256,
        receiptSha256: publication.receipt.receiptSha256,
      });
    }
    built.set(candidate.caseId, {candidate, sourceBundle, publication});
    return {
      caseId: candidate.caseId,
      state: publication.receipt.publicationState,
      cacheIdentity: publication.identities.cacheIdentity,
      authority: publication.receipt.outputAuthority,
    };
  });

  const completeBase = built.get("complete-equivalent-and-ordered");
  const incompleteBase = built.get("incomplete-provisional");
  const negative = negativeSuite.cases.map((candidate) => {
    try {
      if (candidate.operation === "invalid_contract") {
        validateQueryPublicationContract(mutatePath(contract, candidate.mutation));
      } else if (candidate.operation === "normalize_request") {
        normalizeQueryRequest(contract, mutatePath(completeBase.candidate.request, candidate.mutation));
      } else if (candidate.operation === "build_complete") {
        buildPublication({contract, pathContract, codecRegistry, sourceBundle: completeBase.sourceBundle,
          request: mutatePath(completeBase.candidate.request, candidate.mutation), publisher: completeBase.candidate.publisher,
          permittedConsumers: completeBase.candidate.permittedConsumers, state: completeBase.candidate.state});
      } else if (candidate.operation === "build_incomplete_sealed") {
        buildPublication({contract, pathContract, codecRegistry, sourceBundle: incompleteBase.sourceBundle,
          request: incompleteBase.candidate.request, publisher: incompleteBase.candidate.publisher,
          permittedConsumers: incompleteBase.candidate.permittedConsumers, state: "sealed"});
      } else if (candidate.operation === "validate_publication") {
        const publication = mutatePath(completeBase.publication, candidate.mutation);
        validatePublicationBundle({contract, pathContract, codecRegistry, sourceBundle: completeBase.sourceBundle, publication});
      } else if (candidate.operation === "retrieve") {
        retrievePublishedProduct(completeBase.publication, candidate.consumer, {
          productId: completeBase.publication.receipt.productId,
          productContentSha256: completeBase.publication.receipt.productContentSha256,
          receiptSha256: completeBase.publication.receipt.receiptSha256,
        });
      } else {
        fail("missing_required_field", `${candidate.id}.operation`);
      }
      fail("missing_required_field", `${candidate.id} unexpectedly passed`);
    } catch (error) {
      if (!(error instanceof QueryPublicationError) || error.code !== candidate.expectedCode) {
        error.message = `${candidate.id}: expected ${candidate.expectedCode}; ${error.message}`;
        throw error;
      }
      return {id: candidate.id, refusalCode: error.code};
    }
  });

  return {schema: contract.schema, status: "passed", positive, negative};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkQueryTransformPublicationContract(), null, 2));
}
