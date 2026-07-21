import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  evaluateSpindleSite,
  generateSpindleChartRecord,
  serializeSpindleChartRecord,
  validateSpindleChartSpec,
} from "../scripts/eom/generate-spindle-chart-record.mjs";
import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SPEC_PATH = path.join(
  ROOT,
  "reference/priorities/braid-program/configurations/illustrative-spindle-chart-hypothesis.v0.json",
);
const RECORD_PATH = path.join(
  ROOT,
  "content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
);
const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
const checkedRecord = JSON.parse(readFileSync(RECORD_PATH, "utf8"));

function maximumComponentDifference(left, right) {
  return Math.max(...["x", "y", "z"].map((axis) => Math.abs(left[axis] - right[axis])));
}

function asObject(vector) {
  return { x: vector[0], y: vector[1], z: vector[2] };
}

test("spindle chart specification validates its finite right-handed frame and fixed source order", () => {
  assert.equal(validateSpindleChartSpec(spec), spec);
  const nonfinite = structuredClone(spec);
  nonfinite.layers[0].radius = Number.POSITIVE_INFINITY;
  assert.throws(() => validateSpindleChartSpec(nonfinite), /layers\[0\]\.radius must be finite/);

  const leftHanded = structuredClone(spec);
  leftHanded.frame.axis = [0, 0, -1];
  assert.throws(() => validateSpindleChartSpec(leftHanded), /right-handed/);

  const reordered = structuredClone(spec);
  reordered.sourceOrder.reverse();
  assert.throws(() => validateSpindleChartSpec(reordered), /preserve the declared layer order/);

  const invalidTrail = structuredClone(spec);
  invalidTrail.displayTrailPeriods = 0;
  assert.throws(() => validateSpindleChartSpec(invalidTrail), /displayTrailPeriods/);
});

test("prescribed spindle sites satisfy the sphere, antipodal, separation, and common-speed identities", () => {
  const phases = [0, 0.37, 1.25, 3.9, 8];
  spec.layers.forEach((layer, layerIndex) => {
    phases.forEach((time) => {
      const plus = evaluateSpindleSite(spec, layerIndex, 0, time);
      const minus = evaluateSpindleSite(spec, layerIndex, 1, time);
      const center = plus.responseCenter;
      const plusOffset = plus.position.map((value, axis) => value - center[axis]);
      const minusOffset = minus.position.map((value, axis) => value - center[axis]);
      assert.ok(Math.abs(Math.hypot(...plusOffset) - layer.radius) < 1e-13);
      assert.ok(Math.abs(Math.hypot(...minusOffset) - layer.radius) < 1e-13);
      plusOffset.forEach((value, axis) => {
        assert.ok(Math.abs(value + minusOffset[axis]) < 1e-13);
      });
      assert.ok(
        Math.abs(plusOffset[2] - layer.radius * Math.sin(layer.capAngle)) < 1e-13,
      );
      assert.ok(
        Math.abs(minusOffset[2] + layer.radius * Math.sin(layer.capAngle)) < 1e-13,
      );
      assert.ok(
        Math.abs(
          Math.hypot(...plus.position.map((value, axis) => value - minus.position[axis])) -
          2 * layer.radius,
        ) < 1e-13,
      );
      const axialSeparation = Math.abs(plus.position[2] - minus.position[2]);
      assert.ok(
        Math.abs(axialSeparation - 2 * layer.radius * Math.sin(layer.capAngle)) < 1e-13,
      );
      assert.ok(Math.abs(Math.hypot(...plus.velocity) - plus.carrierSpeed) < 1e-13);
      assert.ok(Math.abs(Math.hypot(...minus.velocity) - plus.carrierSpeed) < 1e-13);
    });
  });
});

test("cap-angle boundary cases reduce to an equatorial circle and an axial antipodal pair", () => {
  const equatorial = structuredClone(spec);
  equatorial.layers[0].capAngle = 0;
  const equatorialState = evaluateSpindleSite(equatorial, 0, 0, 0.5);
  assert.ok(Math.abs(equatorialState.axialHeight) < 1e-15);
  assert.ok(Math.abs(equatorialState.transverseRadius - equatorial.layers[0].radius) < 1e-15);

  const axial = structuredClone(spec);
  axial.layers[0].capAngle = Math.PI / 2;
  const axialState = evaluateSpindleSite(axial, 0, 0, 0.5);
  assert.ok(Math.abs(axialState.transverseRadius) < 1e-15);
  assert.ok(Math.abs(axialState.carrierSpeed) < 1e-15);
});

test("generator preserves stable ids, source order, polarity assignment, and segment contiguity", () => {
  const record = generateSpindleChartRecord(spec);
  assert.deepEqual(record.binaries.map((binary) => binary.id), spec.sourceOrder);
  assert.equal(
    record.binaries.every((binary) => binary.angularFrequency === spec.angularFrequency),
    true,
  );
  assert.equal(record.binaries.every((binary) =>
    binary.axisPoint.x === 0 &&
    binary.axisPoint.y === 0 &&
    binary.axisPoint.z === 0 &&
    binary.axisDisplayHalfLength === 0.45
  ), true);
  assert.deepEqual(
    record.worldlines.map((worldline) => worldline.id),
    spec.layers.flatMap((layer) => layer.worldlineIds),
  );
  assert.deepEqual(record.worldlines.map((worldline) => worldline.polarity), [1, -1, -1, 1, 1, -1]);
  record.worldlines.forEach((worldline) => {
    assert.equal(worldline.segments[0].startTime, spec.recordInterval.start);
    assert.equal(worldline.segments.at(-1).endTime, spec.recordInterval.end);
    for (let index = 1; index < worldline.segments.length; index += 1) {
      assert.equal(worldline.segments[index - 1].endTime, worldline.segments[index].startTime);
    }
  });
});

test("Hermite endpoints and velocities agree with the analytical chart and declared errors bound dense samples", () => {
  const dataset = createEomHistoryDataset(checkedRecord);
  checkedRecord.worldlines.forEach((worldline, worldlineIndex) => {
    const layerIndex = Math.floor(worldlineIndex / 2);
    const endpointIndex = worldlineIndex % 2;
    worldline.segments.forEach((segment) => {
      for (const time of [segment.startTime, segment.endTime]) {
        const exact = evaluateSpindleSite(spec, layerIndex, endpointIndex, time);
        const actual = dataset.evaluateWorldline(worldline.id, time);
        assert.ok(maximumComponentDifference(actual.position, asObject(exact.position)) < 2e-12);
        assert.ok(maximumComponentDifference(actual.velocity, asObject(exact.velocity)) < 2e-12);
      }
      for (const fraction of [0.1, 0.25, 0.5, 0.75, 0.9]) {
        const time = segment.startTime + fraction * (segment.endTime - segment.startTime);
        const exact = evaluateSpindleSite(spec, layerIndex, endpointIndex, time);
        const actual = dataset.evaluateWorldline(worldline.id, time);
        assert.ok(
          maximumComponentDifference(actual.position, asObject(exact.position)) <=
            segment.positionError + 2e-15,
        );
        assert.ok(
          maximumComponentDifference(actual.velocity, asObject(exact.velocity)) <=
            segment.velocityError + 2e-15,
        );
      }
    });
  });
});

test("generated spindle record is deterministic, checked in, ingestible, and provenance-limited", () => {
  const first = generateSpindleChartRecord(spec);
  const second = generateSpindleChartRecord(structuredClone(spec));
  assert.equal(serializeSpindleChartRecord(first), serializeSpindleChartRecord(second));
  assert.equal(
    serializeSpindleChartRecord(first),
    readFileSync(RECORD_PATH, "utf8"),
  );
  const dataset = createEomHistoryDataset(first);
  assert.equal(dataset.provenance.engineId, "prescribed-geometry");
  assert.equal(dataset.provenance.claimGrade, "chart-hypothesis");
  assert.equal(dataset.provenance.evidenceStatus, "display-only");
  assert.equal(dataset.provenance.prescribedGeometry.physicsInvoked, false);
  assert.deepEqual(dataset.provenance.prescribedGeometry.responseCenter, { x: 0, y: 0, z: 0 });
  assert.equal(dataset.provenance.prescribedGeometry.sphericalEnvelopeRadius, 0.5);
  assert.equal(dataset.provenance.prescribedGeometry.displayTrailPeriods, 1);
  assert.equal(dataset.worldlines.length, 6);
  assert.equal(dataset.binaries.length, 3);
  assert.equal(dataset.ansatz.length, 6);

  const upgraded = structuredClone(first);
  upgraded.provenance.evidenceStatus = "canonical";
  assert.throws(() => createEomHistoryDataset(upgraded), /must carry claimGrade chart-hypothesis and evidenceStatus display-only/);
  const missingDeclaration = structuredClone(first);
  delete missingDeclaration.provenance.prescribedGeometry;
  assert.throws(() => createEomHistoryDataset(missingDeclaration), /require provenance\.prescribedGeometry/);
  const incompleteAxis = structuredClone(first);
  delete incompleteAxis.binaries[0].axisDisplayHalfLength;
  assert.throws(
    () => createEomHistoryDataset(incompleteAxis),
    /binaries\[0\]\.axisDisplayHalfLength must be finite/,
  );
});
