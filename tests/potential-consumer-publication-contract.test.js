import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  applyFixtureMutation,
  canonicalSha256,
  checkPotentialConsumerPublicationContract,
  validatePotentialConsumerPublication,
} from "../scripts/check-potential-consumer-publication-contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const CONTRACT_PATH = "reference/priorities/app-aaa-core/potential/potential-product-contract.v1.json";
const contract = readJson(CONTRACT_PATH);
const positive = readJson(contract.fixtures.positive);

test("Potential consumer and publication contract passes its positive and negative fixture suite", () => {
  const result = checkPotentialConsumerPublicationContract({ rootDir: ROOT });
  assert.equal(result.status, "passed");
  assert.equal(result.positive.cells, 8);
  assert.deepEqual(result.negativeCases.map((entry) => entry.refusalCode), [
    "missing_history",
    "incompatible_scales",
    "unsupported_precision",
    "incomplete_publication",
    "unknown_observable_version",
  ]);

  const integrityRunner = fs.readFileSync(path.join(ROOT, "scripts/check-content-integrity.mjs"), "utf8");
  assert.match(integrityRunner, /Validate Potential consumer and publication contract/u);
  assert.match(integrityRunner, /scripts\/check-potential-consumer-publication-contract\.mjs/u);
});

test("Potential contract defines fixed-time 3D and both time-spanning map products", () => {
  assert.deepEqual(contract.productKinds.fixed_t_spatial_volume, {
    axes: ["X1", "X2", "X3"],
    timeMode: "fixed",
    description: "Three spatial axes over a declared region at one absolute time T.",
  });
  assert.deepEqual(contract.productKinds.timespace_volume.axes, ["u", "v", "T"]);
  assert.equal(contract.productKinds.timespace_volume.timeMode, "interval");
  assert.deepEqual(contract.productKinds.full_timespace_product.axes, ["X1", "X2", "X3", "T"]);
  assert.equal(contract.productKinds.full_timespace_product.timeMode, "interval");
});

test("Potential publication keeps source history separate and bound by identity", () => {
  const leaked = structuredClone(positive);
  leaked.publication.sourceHistoryPayload = [{ T: 0, X: [0, 0, 0] }];
  assert.throws(() => validatePotentialConsumerPublication(contract, leaked), /source_history_leakage/u);

  const rebound = structuredClone(positive);
  rebound.publication.sourceBinding.pathSetId = "different-path-set";
  assert.throws(() => validatePotentialConsumerPublication(contract, rebound), /source_binding_mismatch/u);

  const stale = structuredClone(positive);
  stale.request.output.consumerPurpose = "changed without re-identifying the request";
  assert.throws(() => validatePotentialConsumerPublication(contract, stale), /identity_mismatch/u);
});

test("Potential publication rejects unsupported geometry and codec capabilities", () => {
  const axes = structuredClone(positive);
  axes.request.mapGeometry.axes = ["X1", "X2", "T"];
  axes.publication.requestSha256 = canonicalSha256(axes.request);
  assert.throws(() => validatePotentialConsumerPublication(contract, axes), /unsupported_product_geometry/u);

  const codec = structuredClone(positive);
  codec.request.output.codecCapabilityId = "private_app_codec/v1";
  codec.publication.requestSha256 = canonicalSha256(codec.request);
  assert.throws(() => validatePotentialConsumerPublication(contract, codec), /unregistered_codec/u);
});

test("declared fixture mutations remain independent and do not alter the positive record", () => {
  const changed = applyFixtureMutation(positive, {
    path: "sourceHistory.coverage.acceptedThroughT",
    value: 0.5,
  });
  assert.equal(changed.sourceHistory.coverage.acceptedThroughT, 0.5);
  assert.equal(positive.sourceHistory.coverage.acceptedThroughT, 2);
});
