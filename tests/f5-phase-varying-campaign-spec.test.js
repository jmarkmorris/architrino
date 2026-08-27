import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import test from "node:test";

import {
  materializePrescribedAssemblySpec,
  validatePrescribedAssemblySpec,
} from "../src/prescribed-geometry/PrescribedAssemblySpec.mjs";
import {
  evaluatePrescribedWorldlineOperator,
  prescribedWorldlineSpeedBound,
} from "../src/prescribed-geometry/PrescribedWorldlineOperators.mjs";

const specPath = new URL(
  "../reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json",
  import.meta.url,
);
const source = fs.readFileSync(specPath, "utf8");
const spec = JSON.parse(source);

function vectorDistance(left, right) {
  return Math.hypot(...left.map((value, index) => value - right[index]));
}

test("the F5 campaign source remains bound to its closed guard certificate", () => {
  assert.equal(
    crypto.createHash("sha256").update(source).digest("hex"),
    "bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344",
  );
  assert.doesNotThrow(() => validatePrescribedAssemblySpec(spec));
  assert.equal(spec.identity.status, "campaign-scoped-provisional-representative");
  assert.equal(spec.constraints.collisionGuard.continuousLowerBound, 0.12014843873518877);
  assert.equal(spec.constraints.historyCoverage.maximumPossibleRootDelay, 0.8627861844049196);
});

test("the F5 campaign source preserves identities, source order, speed, and labeled return", () => {
  const materialized = materializePrescribedAssemblySpec(spec);
  assert.equal(materialized.worldlines.length, 12);
  assert.deepEqual(
    materialized.worldlines.map((row) => row.constituentId),
    spec.relationships.sourceOrder,
  );
  assert.equal(new Set(materialized.worldlines.map((row) => row.id)).size, 12);
  const maximumSpeedBound = Math.max(...materialized.worldlines.map((row) =>
    prescribedWorldlineSpeedBound(row.operator, spec.history.start, spec.history.end)));
  assert.ok(Math.abs(maximumSpeedBound - 0.5) < 2e-15);
  assert.ok(maximumSpeedBound < 1);

  const start = 0.37;
  for (const row of materialized.worldlines) {
    const initial = evaluatePrescribedWorldlineOperator(row.operator, start);
    const returned = evaluatePrescribedWorldlineOperator(
      row.operator,
      start + spec.history.returnPeriod,
    );
    assert.ok(vectorDistance(initial.position, returned.position) < 2e-14);
    assert.ok(vectorDistance(initial.velocity, returned.velocity) < 2e-14);
  }
});
