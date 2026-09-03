import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import {
  buildCatalogEndpointBalancePacket,
} from "../scripts/prescribed-path-analysis/build-stella-octangula-catalog-endpoint-balance.mjs";

const PREDECLARATION_PATH = new URL(
  "../reference/priorities/braid-program/evidence/2026-09-02-stella-octangula-catalog-endpoint-balance.predeclaration.v1.json",
  import.meta.url,
);

function readJson(url) {
  return JSON.parse(readFileSync(url, "utf8"));
}

test("catalog stella-octangula endpoint is bound to its exact identity and complete history", () => {
  const declaration = readJson(PREDECLARATION_PATH);
  const sourceUrl = new URL(`../${declaration.source.path}`, import.meta.url);
  const sourceBytes = readFileSync(sourceUrl);
  const packet = buildCatalogEndpointBalancePacket({
    staticSpec: JSON.parse(sourceBytes.toString("utf8")),
    declaration,
    sourceSha256: createHash("sha256").update(sourceBytes).digest("hex"),
  });

  assert.equal(packet.verdict, "passed");
  assert.ok(Object.values(packet.checks).every(Boolean));
  assert.equal(packet.sourceBinding.assemblyId, declaration.source.assemblyId);
  assert.equal(packet.sourceBinding.modelRevisionSha256, declaration.source.modelRevisionSha256);
  assert.deepEqual(packet.observationBoundary.history, { start: 0, end: 1 });
  assert.equal(packet.measurement.receiverCount, 8);
  assert.equal(packet.measurement.totalCertifiedRoots, 56);
  assert.equal(packet.measurement.leftBoundaryRootCount, 8);
});

test("catalog stella-octangula endpoint fails prescribed balance against an independent oracle", () => {
  const declaration = readJson(PREDECLARATION_PATH);
  const sourceUrl = new URL(`../${declaration.source.path}`, import.meta.url);
  const sourceBytes = readFileSync(sourceUrl);
  const packet = buildCatalogEndpointBalancePacket({
    staticSpec: JSON.parse(sourceBytes.toString("utf8")),
    declaration,
    sourceSha256: createHash("sha256").update(sourceBytes).digest("hex"),
  });

  assert.equal(packet.scientificAdjudication.disposition, "excluded-prescribed-balance");
  assert.equal(packet.scientificAdjudication.H4, "F[D/M]");
  assert.ok(packet.measurement.minimumAccelerationMagnitude > 2.5);
  assert.ok(packet.measurement.maximumIndependentVectorError <= 1e-10);
  assert.ok(packet.measurement.maximumTangentialResidual <= 1e-10);
  assert.ok(packet.claimBoundary.excluded.includes("the distinct extended stationary release-source identity"));
});
