import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

import {
  buildPublication,
  checkQueryTransformPublicationContract,
  computeQueryIdentities,
  retrievePublishedProduct,
  validatePublicationBundle,
  validateQueryPublicationContract,
} from "../src/aaa-core/query-transform-publication-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const CONTRACT = readJson("reference/priorities/app-aaa-core/aaa-core-query-transform-publication.v0.json");
const PATH_CONTRACT = readJson("reference/priorities/app-aaa-core/aaa-core-path-interchange.v0.json");
const CODECS = readJson("reference/priorities/app-aaa-core/aaa-core-codec-registry.v0.json");
const POSITIVE = readJson(CONTRACT.conformance.positiveFixtures);
const NEGATIVE = readJson(CONTRACT.conformance.negativeFixtures);
const PATH_FIXTURES = readJson(POSITIVE.pathInterchangeFixtureSuite);
const completeCase = POSITIVE.cases.find((candidate) => candidate.caseId === "complete-equivalent-and-ordered");
const completeSources = PATH_FIXTURES.cases.find((candidate) => candidate.caseId === completeCase.sourceCaseId);

function buildComplete() {
  return buildPublication({contract: CONTRACT, pathContract: PATH_CONTRACT, codecRegistry: CODECS,
    sourceBundle: completeSources, request: completeCase.request, publisher: completeCase.publisher,
    permittedConsumers: completeCase.permittedConsumers, state: completeCase.state});
}

test("CORE-005 control record passes positive and fail-closed conformance", () => {
  const result = checkQueryTransformPublicationContract({rootDir: ROOT});
  assert.equal(result.status, "passed");
  assert.equal(result.positive.length, 2);
  assert.equal(result.negative.length, 15);
  assert.deepEqual(new Set(result.negative.map((candidate) => candidate.refusalCode)), new Set(CONTRACT.refusalCodes));
});

test("equivalent requests share identity while requestId is excluded", () => {
  const first = computeQueryIdentities(CONTRACT, completeCase.request);
  const second = computeQueryIdentities(CONTRACT, completeCase.equivalentRequest);
  assert.equal(first.cacheIdentity, second.cacheIdentity);
  assert.equal(first.queryIdentity, second.queryIdentity);
  assert.equal(first.transformPipelineIdentity, second.transformPipelineIdentity);
  assert.notEqual(first.normalized.requestId, second.normalized.requestId);
});

test("noncommuting transform order is preserved in pipeline and cache identity", () => {
  const first = computeQueryIdentities(CONTRACT, completeCase.request);
  const reordered = computeQueryIdentities(CONTRACT, completeCase.reorderedRequest);
  assert.notEqual(first.transformPipelineIdentity, reordered.transformPipelineIdentity);
  assert.notEqual(first.cacheIdentity, reordered.cacheIdentity);
});

test("sealed publication closes exact sources and cannot raise authority", () => {
  const publication = buildComplete();
  assert.equal(publication.product.payload.completeness, "sealed");
  assert.equal(publication.product.payload.coverage.complete, true);
  assert.equal(publication.product.payload.authority.level, "derived_analysis");
  assert.equal(publication.product.payload.authority.continuationPermitted, false);
  assert.equal(publication.receipt.immutable, true);
  assert.deepEqual(publication.product.payload.sourceBindings, publication.request.sourceBindings);
  assert.equal(validatePublicationBundle({contract: CONTRACT, pathContract: PATH_CONTRACT, codecRegistry: CODECS,
    sourceBundle: completeSources, publication}).status, "passed");
});

test("incomplete accepted history can publish provisionally but cannot seal", () => {
  const candidate = POSITIVE.cases.find((entry) => entry.caseId === "incomplete-provisional");
  const sources = PATH_FIXTURES.cases.find((entry) => entry.caseId === candidate.sourceCaseId);
  const options = {contract: CONTRACT, pathContract: PATH_CONTRACT, codecRegistry: CODECS,
    sourceBundle: sources, request: candidate.request, publisher: candidate.publisher,
    permittedConsumers: candidate.permittedConsumers};
  const provisional = buildPublication({...options, state: "provisional"});
  assert.equal(provisional.product.payload.coverage.complete, false);
  assert.equal(provisional.product.payload.authority.level, "display_only");
  assert.throws(() => buildPublication({...options, state: "sealed"}), (error) => error.code === "incomplete_seal");
});

test("an explicitly permitted second application retrieves exact immutable identities", () => {
  const publication = buildComplete();
  const retrieved = retrievePublishedProduct(publication, "Equation Mapping", {
    productId: publication.receipt.productId,
    productContentSha256: publication.receipt.productContentSha256,
    receiptSha256: publication.receipt.receiptSha256,
  });
  assert.deepEqual(retrieved.product, publication.product);
  assert.deepEqual(retrieved.receipt, publication.receipt);
});

test("machine schema and contract retain every completion boundary", () => {
  validateQueryPublicationContract(structuredClone(CONTRACT));
  const schema = readJson("src/contracts/aaa-core-query-transform-publication/v0/schema.json");
  for (const field of ["normalization", "identities", "transformRules", "publicationRules", "authorityCaps", "refusalCodes", "conformance", "claimBoundary"]) {
    assert.ok(schema.required.includes(field));
  }
  assert.equal(NEGATIVE.cases.length, CONTRACT.refusalCodes.length);
});
