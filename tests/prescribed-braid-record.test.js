import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";
import { evaluateExactPrescribedSourceState } from "../src/prescribed-path-analysis/index.mjs";
import {
  evaluateMaterializedWorldline,
} from "../src/prescribed-geometry/PrescribedAssemblySpec.mjs";
import {
  buildMatchedFiveCoordinateInitializations,
} from "../scripts/mapping-electromagnetism/three-binary-five-coordinate-initialization-ledger.mjs";
import {
  ACTIVE_PRESCRIBED_BRAID_TARGETS,
  DEPRECATED_PRESCRIBED_BRAID_TARGETS,
  PRESCRIBED_BRAID_TARGETS,
  createPrescribedBraidExactSourceRecord,
  generatePrescribedBraidRecord,
  materializePrescribedBraidSpec,
  serializePrescribedBraidRecord,
  validatePrescribedBraidSpec,
} from "../scripts/eom/generate-prescribed-braid-record.mjs";

const availableFixtures = PRESCRIBED_BRAID_TARGETS
  .filter(({ specPath }) => existsSync(specPath))
  .map(({ specPath, outPath }) => ({
    specPath,
    outPath,
    spec: JSON.parse(readFileSync(specPath, "utf8")),
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

function arbitraryCountFixture() {
  return {
    schema: "prescribed-assembly-spec.v2",
    specId: "arbitrary-three-member-fixture-v2",
    label: "Arbitrary three-member fixture",
    provenanceDescription: "Test-only explicit worldlines with one accessory.",
    claimGrade: "chart-hypothesis",
    evidenceStatus: "display-only",
    date: "2026-08-25",
    identity: {
      candidateId: "test-three-member",
      displayLabel: "Arbitrary three-member fixture",
      status: "test-only",
      geometryOwner: "tests/prescribed-braid-record.test.js",
    },
    constituents: [
      { id: "positive-braid-member", polarity: 1, role: "braid", worldlineId: "positive-path" },
      { id: "negative-braid-member", polarity: -1, role: "braid", worldlineId: "negative-path" },
      { id: "positive-accessory", polarity: 1, role: "accessory", worldlineId: "accessory-path" },
    ],
    worldlines: [
      {
        id: "positive-path",
        constituentId: "positive-braid-member",
        operator: { kind: "inertial.v1", epochTime: 0, positionAtEpoch: [0.2, 0, 0], velocity: [0, 0.1, 0] },
      },
      {
        id: "negative-path",
        constituentId: "negative-braid-member",
        operator: { kind: "stationary.v1", epochTime: 0, position: [-0.2, 0, 0] },
      },
      {
        id: "accessory-path",
        constituentId: "positive-accessory",
        operator: { kind: "inertial.v1", epochTime: 0, positionAtEpoch: [0, 0, 0.5], velocity: [0, 0, -0.05] },
      },
    ],
    geometry: {
      representation: "individual-worldlines",
      assemblyPlacement: { centerAtEpoch: [0, 0, 0], velocity: [0, 0, 0] },
      frameProvenance: [],
    },
    relationships: {
      sourceOrder: ["positive-braid-member", "negative-braid-member", "positive-accessory"],
      neutralPairs: [{ id: "braid-neutral-pair", members: ["positive-braid-member", "negative-braid-member"] }],
      componentBraids: [{ id: "two-member-braid", members: ["positive-braid-member", "negative-braid-member"] }],
      polaritySectors: [
        { id: "positive-sector", polarity: 1, members: ["positive-braid-member", "positive-accessory"] },
        { id: "negative-sector", polarity: -1, members: ["negative-braid-member"] },
      ],
      accessorySets: [{ id: "external-accessories", members: ["positive-accessory"] }],
    },
    history: { start: 0, end: 1, delayHorizon: 0.25, periodic: false },
    interpolation: {
      rule: "piecewise-cubic-hermite/v0",
      interval: 0.1,
      errorMethod: "sampled-hermite-residual-bound/v1",
      positionDivisor: 300,
      velocityDivisor: 8,
      roundoffMultiplier: 64,
    },
    display: {
      responseCenter: [0, 0, 0],
      sphericalEnvelopeRadius: 1,
      trailDuration: 1,
      ansatzSampleCount: 16,
    },
    constraints: {
      validators: [],
      speedGuard: { normalizedFieldSpeed: 1, maximumExclusive: 1, policy: "reject" },
      collisionGuard: { sampleCount: 16, minimumSampledClearance: 0.1 },
    },
    compatibility: { retainedIdentifiers: [] },
  };
}

test("the target map has unique source and record identities and retains scoped controls", () => {
  assert.equal(ACTIVE_PRESCRIBED_BRAID_TARGETS.length, 20);
  assert.equal(new Set(PRESCRIBED_BRAID_TARGETS.map((row) => row.specPath)).size, PRESCRIBED_BRAID_TARGETS.length);
  assert.equal(new Set(PRESCRIBED_BRAID_TARGETS.map((row) => row.outPath)).size, PRESCRIBED_BRAID_TARGETS.length);
  assert.ok(DEPRECATED_PRESCRIBED_BRAID_TARGETS.some((row) =>
    row.specPath.endsWith("illustrative-full-cap-axial-spindle-boundary.v2.json")));
  assert.ok(DEPRECATED_PRESCRIBED_BRAID_TARGETS.some((row) =>
    row.specPath.endsWith("f6b-scoped-negative-circular.v2.json")));
});

test("the general schema accepts arbitrary counts and keeps accessories outside neutral pairs", () => {
  const spec = arbitraryCountFixture();
  assert.equal(validatePrescribedBraidSpec(spec), spec);
  assert.equal(generatePrescribedBraidRecord(spec).worldlines.length, 3);
  assert.equal(spec.relationships.neutralPairs[0].members.includes("positive-accessory"), false);

  const duplicateWorldline = structuredClone(spec);
  duplicateWorldline.constituents[2].worldlineId = "positive-path";
  assert.throws(() => validatePrescribedBraidSpec(duplicateWorldline), /worldline id .* duplicated/);

  const accessoryInBraid = structuredClone(spec);
  accessoryInBraid.relationships.componentBraids[0].members.push("positive-accessory");
  assert.throws(() => validatePrescribedBraidSpec(accessoryInBraid), /only braid-role/);

  const duplicatePairOwnership = structuredClone(spec);
  duplicatePairOwnership.relationships.neutralPairs.push({
    id: "duplicate-owner",
    members: ["positive-braid-member", "negative-braid-member"],
  });
  assert.throws(() => validatePrescribedBraidSpec(duplicatePairOwnership), /more than one neutral pair/);
});

test("every available source declares one stable worldline per individual constituent", () => {
  assert.ok(availableFixtures.length >= 23);
  for (const { spec } of availableFixtures) {
    validatePrescribedBraidSpec(spec);
    assert.equal(spec.schema, "prescribed-assembly-spec.v2");
    assert.equal(spec.geometry.representation, "individual-worldlines");
    assert.equal(spec.worldlines.length, spec.constituents.length);
    assert.equal(new Set(spec.constituents.map((row) => row.id)).size, spec.constituents.length);
    assert.equal(new Set(spec.worldlines.map((row) => row.id)).size, spec.worldlines.length);
    assert.equal(new Set(spec.constituents.map((row) => row.worldlineId)).size, spec.constituents.length);
    assert.ok(spec.constituents.every((row) => row.polarity === 1 || row.polarity === -1));
    assert.equal(spec.constraints.speedGuard.normalizedFieldSpeed, 1);
    assert.equal(spec.constraints.speedGuard.maximumExclusive, 1);
  }
});

test("the legacy migration receipt reports dense preservation-only parity", () => {
  const receipt = JSON.parse(readFileSync(new URL(
    "../reference/priorities/braid-program/evidence/prescribed-assembly-v2-migration-parity.v1.json",
    import.meta.url,
  )));
  assert.equal(receipt.instrument.grade, "measured");
  assert.equal(receipt.claimBoundary.preservationOnly, true);
  assert.equal(receipt.sampleTimesPerCandidate, 257);
  assert.equal(receipt.rows.length, 21);
  assert.ok(receipt.rows.every((row) => row.maximumPositionDifference <= 1.1e-16));
  assert.ok(receipt.rows.every((row) => row.maximumVelocityDifference <= 4.5e-16));
  assert.equal(receipt.claimBoundary.eomSolverInvoked, false);
});

test("the exact-source producer delegates position and velocity to each declared worldline", () => {
  for (const { spec } of availableFixtures) {
    const materialized = materializePrescribedBraidSpec(spec);
    const exact = createPrescribedBraidExactSourceRecord(spec);
    assert.equal(exact.sources.length, materialized.worldlines.length);
    for (const time of [spec.history.start, (spec.history.start + spec.history.end) / 2, spec.history.end]) {
      materialized.worldlines.forEach((worldline) => {
        const source = exact.sources.find((row) => row.id === worldline.id);
        const actual = evaluateExactPrescribedSourceState(source, time);
        const expected = evaluateMaterializedWorldline(worldline, time);
        vectorNear([actual.position.x, actual.position.y, actual.position.z], expected.position, 2e-12);
        vectorNear([actual.velocity.x, actual.velocity.y, actual.velocity.z], expected.velocity, 2e-12);
      });
    }
  }
});

test("SD3 worldlines reproduce the exact centered five-coordinate owner", () => {
  const fixture = availableFixtures.find(({ spec }) => spec.identity.candidateId === "SD3");
  assert.ok(fixture);
  const input = fixture.spec.geometry.reconstruction.input;
  const expected = buildMatchedFiveCoordinateInitializations(input).candidateB.members;
  const materialized = materializePrescribedBraidSpec(fixture.spec);
  materialized.worldlines.forEach((row, index) => {
    const state = evaluateMaterializedWorldline(row, 0);
    vectorNear(state.position, expected[index].position, 2e-12);
    vectorNear(state.velocity, expected[index].velocity, 2e-12);
    assert.equal(row.constituent.polarity, expected[index].polarity);
  });
  const centroid = materialized.worldlines.reduce((sum, row) => {
    const state = evaluateMaterializedWorldline(row, 0);
    return sum.map((value, index) => value + state.position[index] / 6);
  }, [0, 0, 0]);
  vectorNear(centroid, [0, 0, 0], 2e-12);
});

test("F6c is eight-member 4:4 with exact sector identities when its representative is frozen", () => {
  const fixture = availableFixtures.find(({ spec }) => spec.identity.candidateId === "F6c");
  assert.ok(fixture);
  const { spec } = fixture;
  assert.equal(spec.constituents.length, 8);
  assert.equal(spec.constituents.filter((row) => row.polarity === 1).length, 4);
  assert.equal(spec.constituents.filter((row) => row.polarity === -1).length, 4);
  assert.equal(spec.relationships.neutralPairs.length, 0);
  assert.deepEqual(
    spec.relationships.polaritySectors.map((row) => [row.polarity, row.members.length]),
    [[1, 4], [-1, 4]],
  );
  assert.ok(spec.worldlines.every((row) => row.operator.kind === "f6c-harmonic-member.v1"));
  assert.equal(spec.geometry.reconstruction.representativeSelection.authority, "operator");
  assert.equal(spec.geometry.reconstruction.representativeSelection.approvedDate, "2026-08-26");
  assert.equal(spec.history.returnPeriod, 2 * Math.PI);
  const positive = spec.worldlines.filter((row) => row.operator.polarity === 1);
  const negative = spec.worldlines.filter((row) => row.operator.polarity === -1);
  assert.ok(positive.every((row) => row.operator.axial.amplitude === 0.04));
  assert.ok(positive.every((row) => row.operator.radial.amplitude === 0.025));
  assert.ok(negative.every((row) => row.operator.axial.amplitude === -0.03));
  assert.ok(negative.every((row) => row.operator.radial.amplitude === -0.02));
  assert.deepEqual(positive.map((row) => row.operator.circulationSign), [-1, -1, 1, 1]);
  assert.deepEqual(positive.map((row) => row.operator.phaseOffset), [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3]);
});

test("generated records remain sealed display-only inputs with no physics invocation", () => {
  for (const { spec, specPath, outPath } of availableFixtures) {
    const generated = generatePrescribedBraidRecord(spec, { specPath });
    assert.equal(generated.provenance.engineId, "prescribed-geometry");
    assert.equal(generated.provenance.claimGrade, "chart-hypothesis");
    assert.equal(generated.provenance.evidenceStatus, "display-only");
    assert.equal(generated.provenance.prescribedGeometry.physicsInvoked, false);
    assert.equal(generated.provenance.prescribedGeometry.sourceSchema, "prescribed-assembly-spec.v2");
    const dataset = createEomHistoryDataset(generated);
    assert.equal(dataset.worldlines.length, spec.constituents.length);
    assert.equal(dataset.ansatz.length, dataset.worldlines.length);
    if (existsSync(outPath)) {
      const sealed = JSON.parse(readFileSync(outPath, "utf8"));
      if (sealed.provenance?.prescribedGeometry?.sourceSchema === "prescribed-assembly-spec.v2") {
        assert.equal(serializePrescribedBraidRecord(generated), readFileSync(outPath, "utf8"));
      }
    }
  }
});

test("Hermite display segments reproduce exact endpoints and honor declared residual bounds", () => {
  for (const { spec } of availableFixtures) {
    const materialized = materializePrescribedBraidSpec(spec);
    const record = generatePrescribedBraidRecord(spec);
    const dataset = createEomHistoryDataset(record);
    for (const row of materialized.worldlines) {
      const display = record.worldlines.find((entry) => entry.id === row.id);
      for (const segment of display.segments.slice(0, 3)) {
        for (const time of [segment.startTime, segment.endTime]) {
          const exact = evaluateMaterializedWorldline(row, time);
          const actual = dataset.evaluateWorldline(row.id, time);
          vectorNear([actual.position.x, actual.position.y, actual.position.z], exact.position, 3e-12);
          vectorNear([actual.velocity.x, actual.velocity.y, actual.velocity.z], exact.velocity, 3e-12);
        }
        const time = (segment.startTime + segment.endTime) / 2;
        const exact = evaluateMaterializedWorldline(row, time);
        const actual = dataset.evaluateWorldline(row.id, time);
        const positionError = Math.hypot(
          actual.position.x - exact.position[0],
          actual.position.y - exact.position[1],
          actual.position.z - exact.position[2],
        );
        assert.ok(positionError <= segment.positionError + 2e-15);
      }
    }
  }
});
