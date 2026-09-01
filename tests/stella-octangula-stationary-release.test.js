import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import {
  buildStationaryReleasePacket,
} from "../scripts/prescribed-path-analysis/build-stella-octangula-stationary-release.mjs";
import {
  stellaOctangulaClosedFormCoefficient,
} from "../scripts/prescribed-path-analysis/oracle/stella-octangula-stationary-release-oracle.mjs";

const PREDECLARATION_PATH = new URL(
  "../reference/priorities/braid-program/evidence/2026-09-01-stella-octangula-stationary-release.predeclaration.v1.json",
  import.meta.url,
);

function readJson(url) {
  return JSON.parse(readFileSync(url, "utf8"));
}

function closeTo(actual, expected, tolerance = 1e-10) {
  assert.ok(Math.abs(actual - expected) <= tolerance,
    `expected ${actual} within ${tolerance} of ${expected}`);
}

test("stationary stella-octangula release has the frozen complete root inventory", () => {
  const declaration = readJson(PREDECLARATION_PATH);
  const sourceUrl = new URL(`../${declaration.source.path}`, import.meta.url);
  const sourceBytes = readFileSync(sourceUrl);
  const sourceSha256 = createHash("sha256").update(sourceBytes).digest("hex");
  const packet = buildStationaryReleasePacket({
    staticSpec: JSON.parse(sourceBytes.toString("utf8")),
    declaration,
    sourceSha256,
  });

  assert.equal(packet.verdict, "passed");
  assert.ok(Object.values(packet.checks).every(Boolean));
  assert.equal(packet.measurement.receiverCount, 8);
  assert.equal(packet.measurement.totalCertifiedRoots, 56);
  assert.ok(packet.measurement.rows.every((row) => row.certifiedRootCount === 7));
  assert.ok(packet.measurement.rows.every((row) =>
    row.distanceMultiplicityChecks.map((check) => check.measuredMultiplicity).join(",") ===
      "3,3,1"));
  assert.ok(packet.measurement.rows.every((row) =>
    row.roots.every((root) => Math.abs(root.emissionTime + root.distance) <= 1e-12)));
});

test("stationary stella-octangula release acceleration matches the independent radial oracle", () => {
  const declaration = readJson(PREDECLARATION_PATH);
  const sourceUrl = new URL(`../${declaration.source.path}`, import.meta.url);
  const sourceBytes = readFileSync(sourceUrl);
  const packet = buildStationaryReleasePacket({
    staticSpec: JSON.parse(sourceBytes.toString("utf8")),
    declaration,
    sourceSha256: createHash("sha256").update(sourceBytes).digest("hex"),
  });
  const coefficient = stellaOctangulaClosedFormCoefficient(0.5, 1);

  closeTo(coefficient, -5.04383561706373, 1e-14);
  closeTo(packet.independentReference.predictedAccelerationMagnitude,
    2.521917808531865, 1e-14);
  assert.ok(packet.measurement.rows.every((row) =>
    Math.abs(row.radialCoefficient - coefficient) <= 1e-10));
  assert.ok(packet.measurement.maximumIndependentVectorError <= 1e-10);
  assert.ok(packet.measurement.maximumTangentialResidual <= 1e-10);
});

test("deeper stationary history leaves release acceleration and root inventory unchanged", () => {
  const declaration = readJson(PREDECLARATION_PATH);
  const sourceUrl = new URL(`../${declaration.source.path}`, import.meta.url);
  const sourceBytes = readFileSync(sourceUrl);
  const packet = buildStationaryReleasePacket({
    staticSpec: JSON.parse(sourceBytes.toString("utf8")),
    declaration,
    sourceSha256: createHash("sha256").update(sourceBytes).digest("hex"),
  });

  assert.equal(packet.deeperHistoryControl.comparison.rootInventoriesMatch, true);
  assert.ok(packet.deeperHistoryControl.comparison.maximumAccelerationDifference <= 1e-10);
  assert.deepEqual(packet.claimBoundary.excluded.slice(0, 3), [
    "future evolution",
    "animation",
    "braid classification",
  ]);
});
