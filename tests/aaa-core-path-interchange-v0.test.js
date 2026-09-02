import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  applyFixtureMutation,
  checkPathInterchangeContract,
  recordSha256,
  validatePathInterchangeBundle,
} from "../src/aaa-core/path-interchange-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const contract = readJson("reference/priorities/app-aaa-core/aaa-core-path-interchange.v0.json");
const positiveSuite = readJson(contract.fixtures.positive);

function valueAt(record, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], record);
}

test("AAA Core path interchange accepts every required positive family and fail-closed control", () => {
  const result = checkPathInterchangeContract({ rootDir: ROOT });
  assert.equal(result.status, "passed");
  assert.deepEqual(result.positive.map((entry) => entry.caseId), [
    "eom-produced-history",
    "prescribed-paths",
    "live-accepted-stream",
    "potential-map-product",
    "experimental-import",
  ]);
  assert.deepEqual(result.negative.map((entry) => entry.refusalCode), [
    "missing_coverage",
    "incompatible_scales",
    "broken_predecessor_chain",
    "unsupported_precision",
    "unknown_schema_version",
    "authority_escalation",
    "missing_source_binding",
    "incomplete_seal",
    "invalid_experimental_provenance",
    "identity_mismatch",
  ]);
});

test("every fixture record has a canonical immutable identity", () => {
  for (const fixtureCase of positiveSuite.cases) {
    for (const record of fixtureCase.records) {
      assert.equal(record.contentSha256, recordSha256(record), `${fixtureCase.caseId}: ${record.recordId}`);
    }
  }
});

test("the schema and control record expose the same five logical record kinds", () => {
  const schema = readJson(contract.recordSchemaPath);
  assert.equal(schema.properties.schema.const, contract.interchangeSchema);
  assert.equal(schema.properties.version.const, 0);
  assert.deepEqual(schema.properties.recordType.enum, contract.recordTypes);
  assert.equal(schema.$defs.units.properties.wakeSpeed.const, 1);
  assert.equal(schema.$defs.pathSetManifest.properties.interpolation.properties.eventBoundaryBehavior.const, "split_chunk");
});

test("the Potential v1 consumer fields are supplied by the Core manifest mapping", () => {
  const potentialContract = readJson("reference/priorities/app-aaa-core/potential/potential-product-contract.v1.json");
  assert.equal(potentialContract.upstreamContracts.pathInterchange.schema, contract.interchangeSchema);
  assert.equal(potentialContract.upstreamContracts.pathInterchange.status, "accepted");
  const fixtureCase = positiveSuite.cases.find((entry) => entry.caseId === "potential-map-product");
  const manifest = fixtureCase.records.find((record) => record.recordType === "path_set_manifest");
  const sourceRecord = manifest.payload.provenance.sourceRecords[0];
  const sourceHistory = {
    pathSetId: manifest.payload.pathSetId,
    manifestSchema: manifest.schema,
    manifestSha256: manifest.contentSha256,
    historyKind: manifest.payload.historyKind,
    authority: manifest.payload.authority.level,
    coverage: manifest.payload.coverage,
    coordinateFrame: manifest.payload.coordinateFrame,
    units: manifest.payload.units,
    numeric: {
      representation: manifest.payload.numericPolicy.representation,
      precisionBits: manifest.payload.numericPolicy.precisionBits,
      nonfiniteBehavior: manifest.payload.numericPolicy.nonfiniteBehavior,
    },
    interpolation: {
      basis: manifest.payload.interpolation.basis,
      maximumPositionError: manifest.payload.interpolation.maximumPositionError,
    },
    provenance: {
      producer: manifest.payload.provenance.producer,
      sourceSha256: sourceRecord.sourceSha256,
    },
  };
  for (const dottedPath of potentialContract.requiredUpstreamFields) {
    assert.notEqual(valueAt({ sourceHistory }, dottedPath), undefined, dottedPath);
  }
});

test("fixture mutation is isolated and identity tampering fails closed", () => {
  const base = positiveSuite.cases.find((entry) => entry.caseId === "potential-map-product");
  const changed = applyFixtureMutation(base, {
    path: "records.2.payload.query.fixedT",
    value: 1.25,
  });
  assert.equal(base.records[2].payload.query.fixedT, 1);
  assert.throws(
    () => validatePathInterchangeBundle(contract, changed),
    /identity_mismatch/u,
  );
});
