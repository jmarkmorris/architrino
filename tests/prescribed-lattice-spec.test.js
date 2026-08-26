import assert from "node:assert/strict";
import test from "node:test";

import {
  materializePrescribedAssemblySpec,
  validatePrescribedAssemblySpec,
} from "../src/prescribed-geometry/PrescribedAssemblySpec.mjs";

function assemblyFixture({ positions, polarities, lattice }) {
  const constituents = positions.map((_, index) => ({
    id: `member-${index}`,
    polarity: polarities[index],
    role: "braid",
    worldlineId: `path-${index}`,
  }));
  const worldlines = positions.map((position, index) => ({
    id: `path-${index}`,
    constituentId: `member-${index}`,
    operator: { kind: "stationary.v1", epochTime: 0, position },
  }));
  return {
    schema: "prescribed-assembly-spec.v2",
    specId: "prescribed-lattice-test-fixture-v2",
    label: "Prescribed lattice test fixture",
    provenanceDescription: "Test-only lattice declaration bound to explicit stationary worldlines.",
    claimGrade: "chart-hypothesis",
    evidenceStatus: "display-only",
    date: "2026-08-25",
    identity: {
      candidateId: "test-lattice",
      displayLabel: "Prescribed lattice test fixture",
      status: "test-only",
      geometryOwner: "tests/prescribed-lattice-spec.test.js",
    },
    constituents,
    worldlines,
    geometry: {
      representation: "individual-worldlines",
      assemblyPlacement: { centerAtEpoch: [0, 0, 0], velocity: [0, 0, 0] },
      frameProvenance: [],
      lattices: [lattice],
    },
    relationships: {
      sourceOrder: constituents.map((row) => row.id),
      polaritySectors: [
        { id: "positive-sector", polarity: 1, members: constituents.filter((row) => row.polarity === 1).map((row) => row.id) },
        { id: "negative-sector", polarity: -1, members: constituents.filter((row) => row.polarity === -1).map((row) => row.id) },
      ].filter((row) => row.members.length > 0),
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
      sphericalEnvelopeRadius: 2,
      trailDuration: 1,
      ansatzSampleCount: 16,
    },
    constraints: {
      validators: [],
      speedGuard: { normalizedFieldSpeed: 1, maximumExclusive: 1, policy: "reject" },
    },
    compatibility: { retainedIdentifiers: [] },
  };
}

function translationLattice() {
  return {
    id: "body-centered-cell",
    generator: {
      kind: "translation-lattice.v1",
      origin: [0, 0, 0],
      basisVectors: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
      extent: {
        kind: "finite-index-box.v1",
        minimum: [0, 0, 0],
        maximumExclusive: [1, 1, 1],
      },
      siteTemplates: [
        { id: "corner", fractionalPosition: [0, 0, 0], polarity: 1, role: "braid" },
        { id: "body", fractionalPosition: [0.5, 0.5, 0.5], polarity: -1, role: "braid" },
      ],
    },
    materialization: {
      status: "explicit-finite",
      epochTime: 0,
      boundaryInterpretation: "cropped-periodic-template",
      instances: [
        { cellIndex: [0, 0, 0], templateId: "corner", constituentId: "member-0", worldlineId: "path-0" },
        { cellIndex: [0, 0, 0], templateId: "body", constituentId: "member-1", worldlineId: "path-1" },
      ],
    },
  };
}

test("translation lattices bind every generated motif site to one explicit constituent worldline", () => {
  const spec = assemblyFixture({
    positions: [[0, 0, 0], [0.5, 0.5, 0.5]],
    polarities: [1, -1],
    lattice: translationLattice(),
  });
  assert.equal(validatePrescribedAssemblySpec(spec), spec);
  const [lattice] = materializePrescribedAssemblySpec(spec).lattices;
  assert.equal(lattice.generator.kind, "translation-lattice.v1");
  assert.deepEqual(
    lattice.realizedSites.map((row) => [row.siteKey, row.constituentId, row.position]),
    [
      ["cell:0,0,0/template:corner", "member-0", [0, 0, 0]],
      ["cell:0,0,0/template:body", "member-1", [0.5, 0.5, 0.5]],
    ],
  );
});

test("seeded random sites are reproducible and retain explicit sample-to-worldline bindings", () => {
  const expectedPositions = [
    [0.26425543846562505, 0.042528728023171425, -0.41788732958957553],
    [0.7788728401064873, 0.47964790742844343, 0.7155608311295509],
  ];
  const lattice = {
    id: "seeded-random-sample",
    generator: {
      kind: "seeded-random-sites.v1",
      algorithm: "xorshift32.v1",
      seed: 123456789,
      siteCount: 2,
      templateAssignment: "cyclic.v1",
      domain: {
        kind: "axis-aligned-box.v1",
        minimum: [-1, -1, -1],
        maximumExclusive: [1, 1, 1],
      },
      siteTemplates: [
        { id: "positive", polarity: 1, role: "braid" },
        { id: "negative", polarity: -1, role: "braid" },
      ],
    },
    materialization: {
      status: "explicit-finite",
      epochTime: 0,
      boundaryInterpretation: "finite-sample",
      instances: [
        { sampleIndex: 0, templateId: "positive", constituentId: "member-0", worldlineId: "path-0" },
        { sampleIndex: 1, templateId: "negative", constituentId: "member-1", worldlineId: "path-1" },
      ],
    },
  };
  const spec = assemblyFixture({ positions: expectedPositions, polarities: [1, -1], lattice });
  const first = materializePrescribedAssemblySpec(spec).lattices[0].realizedSites;
  const second = materializePrescribedAssemblySpec(structuredClone(spec)).lattices[0].realizedSites;
  assert.deepEqual(first.map((row) => row.position), expectedPositions);
  assert.deepEqual(second, first);
});

test("template-only lattices state unmaterialized continuation without inventing constituents", () => {
  const lattice = translationLattice();
  lattice.generator.extent = { kind: "infinite-index-space.v1" };
  lattice.materialization = {
    status: "template-only",
    boundaryInterpretation: "infinite-template",
  };
  const spec = assemblyFixture({
    positions: [[2, 0, 0], [-2, 0, 0]],
    polarities: [1, -1],
    lattice,
  });
  assert.equal(validatePrescribedAssemblySpec(spec), spec);
  assert.deepEqual(materializePrescribedAssemblySpec(spec).lattices[0].realizedSites, []);
});

test("lattice validation fails closed on incomplete bindings, position drift, and unknown generators", () => {
  const baseline = assemblyFixture({
    positions: [[0, 0, 0], [0.5, 0.5, 0.5]],
    polarities: [1, -1],
    lattice: translationLattice(),
  });
  const incomplete = structuredClone(baseline);
  incomplete.geometry.lattices[0].materialization.instances.pop();
  assert.throws(() => validatePrescribedAssemblySpec(incomplete), /bind all 2 generated/);

  const drifted = structuredClone(baseline);
  drifted.worldlines[1].operator.position[0] += 0.01;
  assert.throws(() => validatePrescribedAssemblySpec(drifted), /differs from its generated lattice site/);

  const unknown = structuredClone(baseline);
  unknown.geometry.lattices[0].generator.kind = "future-unregistered-generator.v1";
  assert.throws(() => validatePrescribedAssemblySpec(unknown), /not a registered prescribed-lattice generator/);

  const explicitInfinite = structuredClone(baseline);
  explicitInfinite.geometry.lattices[0].generator.extent = { kind: "infinite-index-space.v1" };
  assert.throws(() => validatePrescribedAssemblySpec(explicitInfinite), /cannot explicitly materialize an infinite/);
});
