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
  "../reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json",
  import.meta.url,
);
const frozenPilotSourcePath = new URL(
  "../reference/priorities/development-process-review/evidence/next-caller-inputs/2026-08-26-f5-phase-varying-root-pilot-source.v2.json.bda39fe695e8.source",
  import.meta.url,
);
const source = fs.readFileSync(specPath, "utf8");
const spec = JSON.parse(source);
const frozenPilotSource = fs.readFileSync(frozenPilotSourcePath, "utf8");
const frozenPilotSpec = JSON.parse(frozenPilotSource);

// The current display uses v3 identifiers. Preserve the original fixture bytes
// and compare its complete scientific fields through this explicit name map.
const names = new Map([['f5-phase-varying.v1', 'phase-varying-history-consistency.v2']]);
frozenPilotSpec.constituents.forEach((row, i) => names.set(row.id, `member-${i + 1}`));
frozenPilotSpec.worldlines.forEach((row, i) => names.set(row.id, `worldline-${i + 1}`));
for (const [field, prefix] of [['pairings', 'pairings'], ['componentBraids', 'component-braids'],
  ['polaritySectors', 'polarity-sectors'], ['symmetryOrbits', 'symmetry-orbits']]) {
  frozenPilotSpec.relationships[field].forEach((row, i) => names.set(row.id, `${prefix}-${i + 1}`));
}
function renameStrings(value, mapping) {
  if (typeof value === 'string') return mapping.get(value) ?? value;
  if (Array.isArray(value)) return value.map(row => renameStrings(row, mapping));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, row]) => [key, renameStrings(row, mapping)]));
  return value;
}
assert.deepEqual(renameStrings({ id: 'old', numeric: [1, 2] }, new Map([['old', 'new']])), { id: 'new', numeric: [1, 2] });

function vectorDistance(left, right) {
  return Math.hypot(...left.map((value, index) => value - right[index]));
}

test("the approved F5 display source preserves the frozen pilot's scientific row", () => {
  assert.equal(
    crypto.createHash("sha256").update(frozenPilotSource).digest("hex"),
    "bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344",
  );
  assert.doesNotThrow(() => validatePrescribedAssemblySpec(spec));
  assert.equal(spec.identity.status, "operator-approved-prescribed-display");
  for (const field of ["constituents", "worldlines", "relationships", "history", "constraints", "display", "interpolation"]) {
    assert.deepEqual(spec[field], renameStrings(frozenPilotSpec[field], names), `${field} changed beyond the explicit v3 name map`);
  }
  assert.equal(spec.constraints.collisionGuard.continuousLowerBound, 0.12014843873518877);
  assert.equal(spec.constraints.historyCoverage.maximumPossibleRootDelay, 0.8627861844049196);
});

test("the approved F5 display source preserves identities, source order, speed, and labeled return", () => {
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
