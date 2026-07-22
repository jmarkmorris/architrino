import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";
import { evaluateExactPrescribedSourceState } from "../src/prescribed-path-analysis/index.mjs";
import {
  PRESCRIBED_BRAID_TARGETS,
  createPrescribedBraidExactSourceRecord,
  evaluatePrescribedBraidSite,
  generatePrescribedBraidRecord,
  materializePrescribedBraidSpec,
  serializePrescribedBraidRecord,
  validatePrescribedBraidSpec,
} from "../scripts/eom/generate-prescribed-braid-record.mjs";

const ROOT = new URL("../", import.meta.url);
const fixtures = PRESCRIBED_BRAID_TARGETS.map(({ specPath, outPath }) => ({
  specPath,
  outPath,
  spec: JSON.parse(readFileSync(specPath, "utf8")),
  record: JSON.parse(readFileSync(outPath, "utf8")),
}));

function near(actual, expected, tolerance = 1e-11) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

function vectorNear(actual, expected, tolerance = 1e-11) {
  actual.forEach((value, index) => near(value, expected[index], tolerance));
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function rotate120(vector) {
  // The declared near-rest frame uses x -> y -> z under +120 degrees about (1,1,1).
  return [vector[2], vector[0], vector[1]];
}

test("canonical target registry contains every requested candidate exactly once", () => {
  assert.equal(PRESCRIBED_BRAID_TARGETS.length, 12);
  const labels = fixtures.map(({ spec }) => spec.taxonomy.displayLabel);
  assert.deepEqual(labels, [
    "A1 — general",
    "A1.1 — equal frequency",
    "A1.2 — equal frequency, equal radius",
    "A1.3 — 4:2:1 frequency",
    "A1.4 — 3:2:1 frequency",
    "A2 — fully symmetric",
    "B1 — interior reference",
    "B1 — high-axial interior",
    "B1 — all-equatorial boundary",
    "B1 — all-axial boundary",
    "C1 — co-rotating B1 pair",
    "C2 — counter-rotating B1 pair",
  ]);
  assert.equal(new Set(labels).size, labels.length);
  assert.equal(new Set(PRESCRIBED_BRAID_TARGETS.map((row) => row.specPath)).size, 12);
  assert.equal(new Set(PRESCRIBED_BRAID_TARGETS.map((row) => row.outPath)).size, 12);
});

test("spec validation fails closed on nonfinite coordinates, broken radii, and incomplete return cycles", () => {
  const valid = structuredClone(fixtures[0].spec);
  assert.equal(validatePrescribedBraidSpec(valid), valid);
  const nonfinite = structuredClone(valid);
  nonfinite.braids[0].binaries[0].radius = "Infinity";
  assert.throws(() => validatePrescribedBraidSpec(nonfinite), /radius must be finite/);
  const brokenRadius = structuredClone(valid);
  brokenRadius.braids[0].binaries[0].transverseOrbitRadius = 0.1;
  assert.throws(() => validatePrescribedBraidSpec(brokenRadius), /radius decomposition/);
  const brokenPeriod = structuredClone(valid);
  brokenPeriod.prescribedReturnPeriod = 3;
  assert.throws(() => validatePrescribedBraidSpec(brokenPeriod), /return-period cycles/);
  const wrongMember = structuredClone(fixtures[3].spec);
  wrongMember.braids[0].binaries[0].frequency = 0.75;
  assert.throws(() => validatePrescribedBraidSpec(wrongMember), /4:2:1/);
});

test("every endpoint remains finite, antipodal, and on its declared binary coordinates", () => {
  fixtures.forEach(({ spec }) => {
    const materialized = materializePrescribedBraidSpec(spec);
    materialized.binaries.forEach((binary) => {
      for (const time of [0, 0.37, 1.25, 3.99]) {
        const plus = evaluatePrescribedBraidSite(
          spec,
          binary.braidIndex,
          binary.binaryIndex,
          0,
          time,
        );
        const minus = evaluatePrescribedBraidSite(
          spec,
          binary.braidIndex,
          binary.binaryIndex,
          1,
          time,
        );
        assert.ok([...plus.position, ...plus.velocity, ...minus.position, ...minus.velocity].every(Number.isFinite));
        vectorNear(scale(add(plus.position, minus.position), 0.5), plus.binaryCenter, 2e-12);
        const half = scale(subtract(plus.position, minus.position), 0.5);
        near(norm(half), binary.radius, 2e-12);
        near(dot(half, binary.frame.axis), binary.axialHalfSeparation, 2e-12);
        const transverse = subtract(half, scale(binary.frame.axis, binary.axialHalfSeparation));
        near(norm(transverse), binary.transverseOrbitRadius, 2e-12);
      }
    });
  });
});

test("all paths close in position and velocity over the declared return period", () => {
  fixtures.forEach(({ spec }) => {
    const materialized = materializePrescribedBraidSpec(spec);
    materialized.binaries.forEach((binary) => {
      for (const endpointIndex of [0, 1]) {
        const start = evaluatePrescribedBraidSite(
          spec,
          binary.braidIndex,
          binary.binaryIndex,
          endpointIndex,
          0.37,
        );
        const returned = evaluatePrescribedBraidSite(
          spec,
          binary.braidIndex,
          binary.binaryIndex,
          endpointIndex,
          0.37 + spec.prescribedReturnPeriod,
        );
        vectorNear(start.position, returned.position, 3e-12);
        vectorNear(start.velocity, returned.velocity, 3e-12);
      }
    });
  });
});

test("Family-A axes implement the declared flattening interpolation and preserve persistent indices", () => {
  fixtures.slice(0, 6).forEach(({ spec }) => {
    const materialized = materializePrescribedBraidSpec(spec);
    const axes0 = spec.braids[0].frameDefinition.nearRestAxes;
    const lambda = spec.braids[0].frameDefinition.flattening;
    const u = [1, 1, 1].map((value) => value / Math.sqrt(3));
    materialized.binaries.forEach((binary, index) => {
      assert.equal(binary.binaryIndex, index);
      const raw = add(scale(axes0[index], 1 - lambda), scale(u, lambda));
      vectorNear(binary.frame.axis, scale(raw, 1 / norm(raw)), 2e-12);
      near(norm(binary.frame.axis), 1, 2e-12);
    });
  });
});

test("A2 complete endpoint paths are cyclically equivalent under the declared 120-degree rotation", () => {
  const spec = fixtures[5].spec;
  for (const time of [0, 0.43, 1.9]) {
    for (const endpointIndex of [0, 1]) {
      const states = [0, 1, 2].map((binaryIndex) =>
        evaluatePrescribedBraidSite(spec, 0, binaryIndex, endpointIndex, time));
      vectorNear(rotate120(states[0].position), states[1].position, 3e-12);
      vectorNear(rotate120(states[1].position), states[2].position, 3e-12);
      vectorNear(rotate120(states[0].velocity), states[1].velocity, 3e-12);
    }
  }
});

test("Family-A member constraints are explicit and distinct", () => {
  const rows = fixtures.slice(0, 6).map(({ spec }) => spec.braids[0].binaries);
  assert.deepEqual(rows[0].map((row) => row.frequency), [0.25, 0.5, 0.75]);
  assert.deepEqual(rows[1].map((row) => row.frequency), [0.25, 0.25, 0.25]);
  assert.deepEqual(rows[2].map((row) => row.radius), [0.32, 0.32, 0.32]);
  assert.deepEqual(rows[3].map((row) => row.frequency), [1, 0.5, 0.25]);
  assert.deepEqual(rows[4].map((row) => row.frequency), [0.75, 0.5, 0.25]);
  assert.equal(new Set(rows[5].map((row) => JSON.stringify([
    row.radius,
    row.axialHalfSeparation,
    row.transverseOrbitRadius,
    row.frequency,
  ]))).size, 1);
});

test("the four B1 records preserve the verified coordinate mapping and compatibility identities", () => {
  const [interior, highAxial, equatorial, axial] = fixtures.slice(6, 10).map(({ spec }) => spec);
  assert.deepEqual(interior.braids[0].binaries.map((row) => row.radius), [0.22, 0.32, 0.44]);
  assert.deepEqual(interior.braids[0].binaries.map((row) => row.frequency), [0.25, 0.25, 0.25]);
  assert.ok(highAxial.braids[0].binaries.every((row) =>
    row.axialHalfSeparation > row.transverseOrbitRadius));
  assert.ok(equatorial.braids[0].binaries.every((row) =>
    row.axialHalfSeparation === 0 && row.transverseOrbitRadius === row.radius));
  assert.ok(axial.braids[0].binaries.every((row) =>
    row.axialHalfSeparation === row.radius && row.transverseOrbitRadius === 0));
  fixtures.slice(6, 10).forEach(({ spec }) => {
    assert.ok(spec.compatibility.retainedIdentifiers.length >= 4);
    assert.deepEqual(spec.braids[0].frameDefinition.axis, [0, 0, 1]);
  });
});

test("C1 and C2 contain two complete B1 components and the declared relative circulation", () => {
  const c1 = fixtures[10].spec;
  const c2 = fixtures[11].spec;
  for (const spec of [c1, c2]) {
    assert.equal(spec.braids.length, 2);
    assert.deepEqual(spec.braids.map((braid) => braid.binaries.length), [3, 3]);
    assert.deepEqual(spec.braids.map((braid) => braid.centerOffset), [[-0.55, 0, 0], [0.55, 0, 0]]);
    assert.equal(generatePrescribedBraidRecord(spec).worldlines.length, 12);
  }
  assert.deepEqual(c1.braids.map((braid) => braid.circulationSense), [1, 1]);
  assert.deepEqual(c2.braids.map((braid) => braid.circulationSense), [1, -1]);
});

test("exact analytical sources reproduce every declared endpoint path", () => {
  fixtures.forEach(({ spec }) => {
    const exact = createPrescribedBraidExactSourceRecord(spec);
    const materialized = materializePrescribedBraidSpec(spec);
    assert.equal(exact.sources.length, materialized.binaries.length * 2);
    materialized.binaries.forEach((binary) => {
      binary.worldlineIds.forEach((worldlineId, endpointIndex) => {
        const source = exact.sources.find((row) => row.id === worldlineId);
        const actual = evaluateExactPrescribedSourceState(source, 1.2345);
        const expected = evaluatePrescribedBraidSite(
          spec,
          binary.braidIndex,
          binary.binaryIndex,
          endpointIndex,
          1.2345,
        );
        vectorNear([actual.position.x, actual.position.y, actual.position.z], expected.position, 2e-12);
        vectorNear([actual.velocity.x, actual.velocity.y, actual.velocity.z], expected.velocity, 2e-12);
      });
    });
  });
});

test("every generated record is deterministic, checked in, ingestible, and provenance-limited", () => {
  fixtures.forEach(({ spec, specPath, outPath, record }) => {
    const generatingSpec = specPath.replace(new URL("../", import.meta.url).pathname, "");
    const generated = generatePrescribedBraidRecord(spec, { generatingSpec });
    assert.equal(serializePrescribedBraidRecord(generated), readFileSync(outPath, "utf8"));
    assert.equal(serializePrescribedBraidRecord(generated), serializePrescribedBraidRecord(record));
    const dataset = createEomHistoryDataset(generated);
    assert.equal(dataset.provenance.engineId, "prescribed-geometry");
    assert.equal(dataset.provenance.claimGrade, "chart-hypothesis");
    assert.equal(dataset.provenance.evidenceStatus, "display-only");
    assert.equal(dataset.provenance.prescribedGeometry.physicsInvoked, false);
    assert.equal(dataset.provenance.prescribedGeometry.prescribedReturnPeriod, 4);
    assert.equal(dataset.worldlines.length, spec.taxonomy.familyId === "C" ? 12 : 6);
    assert.equal(dataset.ansatz.length, dataset.worldlines.length);
  });
});

test("Hermite display segments match exact endpoints and stay inside declared error bounds", () => {
  fixtures.forEach(({ spec, record }) => {
    const materialized = materializePrescribedBraidSpec(spec);
    const dataset = createEomHistoryDataset(record);
    materialized.binaries.forEach((binary) => {
      binary.worldlineIds.forEach((worldlineId, endpointIndex) => {
        const worldline = record.worldlines.find((row) => row.id === worldlineId);
        worldline.segments.slice(0, 4).forEach((segment) => {
          for (const time of [segment.startTime, segment.endTime]) {
            const exact = evaluatePrescribedBraidSite(
              spec,
              binary.braidIndex,
              binary.binaryIndex,
              endpointIndex,
              time,
            );
            const actual = dataset.evaluateWorldline(worldlineId, time);
            vectorNear([actual.position.x, actual.position.y, actual.position.z], exact.position, 3e-12);
          }
          const time = (segment.startTime + segment.endTime) / 2;
          const exact = evaluatePrescribedBraidSite(
            spec,
            binary.braidIndex,
            binary.binaryIndex,
            endpointIndex,
            time,
          );
          const actual = dataset.evaluateWorldline(worldlineId, time);
          const error = Math.max(
            Math.abs(actual.position.x - exact.position[0]),
            Math.abs(actual.position.y - exact.position[1]),
            Math.abs(actual.position.z - exact.position[2]),
          );
          assert.ok(error <= segment.positionError + 2e-15);
        });
      });
    });
  });
});
