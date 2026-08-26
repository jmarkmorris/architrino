import assert from "node:assert/strict";
import test from "node:test";

import {
  materializePrescribedAssemblySpec,
  validatePrescribedAssemblySpec,
} from "../src/prescribed-geometry/PrescribedAssemblySpec.mjs";

function assemblyFixture({ members, sea }) {
  const constituents = members.map((_, index) => ({
    id: `member-${index}`,
    polarity: index % 2 === 0 ? 1 : -1,
    role: "braid",
    worldlineId: `path-${index}`,
  }));
  const worldlines = members.map((member, index) => ({
    id: `path-${index}`,
    constituentId: `member-${index}`,
    operator: {
      kind: "inertial.v1",
      epochTime: 0,
      positionAtEpoch: member.position,
      velocity: member.velocity,
    },
  }));
  return {
    schema: "prescribed-assembly-spec.v2",
    specId: "prescribed-sea-test-fixture-v2",
    label: "Prescribed sea test fixture",
    provenanceDescription: "Test-only sea declaration bound to explicit constituent worldlines.",
    claimGrade: "chart-hypothesis",
    evidenceStatus: "display-only",
    date: "2026-08-25",
    identity: {
      candidateId: "test-sea",
      displayLabel: "Prescribed sea test fixture",
      status: "test-only",
      geometryOwner: "tests/prescribed-sea-model.test.js",
    },
    constituents,
    worldlines,
    geometry: {
      representation: "individual-worldlines",
      assemblyPlacement: { centerAtEpoch: [0, 0, 0], velocity: [0, 0, 0] },
      frameProvenance: [],
      seas: [sea],
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
      sphericalEnvelopeRadius: 5,
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

function seaModel({ templates, instances, status = "explicit-finite" }) {
  return {
    id: "visualized-noether-sea",
    model: {
      kind: "assembly-population-sea.v1",
      frame: {
        kind: "visualization-frame.v1",
        epochTime: 0,
        originAtEpoch: [0, 0, 0],
        velocity: [0.1, 0, 0],
      },
      region: {
        kind: "axis-aligned-box.v1",
        minimum: [-10, -10, -10],
        maximumExclusive: [10, 10, 10],
      },
      assemblyTemplates: templates,
    },
    materialization: status === "template-only"
      ? { status, boundaryInterpretation: "population-template" }
      : { status, boundaryInterpretation: "visualization-window", instances },
  };
}

const braidTemplates = [
  {
    id: "pro-braid",
    assemblyClass: "braid",
    variant: "pro",
    populationRole: "sea-background",
    memberCount: 2,
    geometryOwner: "reference/priorities/braid-program/pro-braid-geometry.md",
  },
  {
    id: "anti-braid",
    assemblyClass: "braid",
    variant: "anti",
    populationRole: "sea-background",
    memberCount: 2,
    geometryOwner: "reference/priorities/braid-program/anti-braid-geometry.md",
  },
];

test("a sea groups pro and anti braid assemblies independently of lattice sites", () => {
  const members = [
    { position: [-1, 0.1, 0], velocity: [0.1, 0.2, 0] },
    { position: [-1, -0.1, 0], velocity: [0.1, -0.2, 0] },
    { position: [1, 0.1, 0], velocity: [0.3, 0.2, 0] },
    { position: [1, -0.1, 0], velocity: [0.3, -0.2, 0] },
  ];
  const sea = seaModel({
    templates: braidTemplates,
    instances: [
      {
        id: "pro-0",
        templateId: "pro-braid",
        memberConstituentIds: ["member-0", "member-1"],
        groupMotion: {
          kind: "inertial-group.v1",
          epochTime: 0,
          positionAtEpoch: [-1, 0, 0],
          velocity: [0, 0, 0],
        },
      },
      {
        id: "anti-0",
        templateId: "anti-braid",
        memberConstituentIds: ["member-2", "member-3"],
        groupMotion: {
          kind: "inertial-group.v1",
          epochTime: 0,
          positionAtEpoch: [1, 0, 0],
          velocity: [0.2, 0, 0],
        },
      },
    ],
  });
  const spec = assemblyFixture({ members, sea });
  assert.equal(validatePrescribedAssemblySpec(spec), spec);
  const [materializedSea] = materializePrescribedAssemblySpec(spec).seas;
  assert.deepEqual(
    materializedSea.realizedAssemblies.map((row) => [
      row.id,
      row.variant,
      row.groupMotion.velocity,
      row.absoluteGroupStateAtEpoch.velocity,
    ]),
    [
      ["pro-0", "pro", [0, 0, 0], [0.1, 0, 0]],
      ["anti-0", "anti", [0.2, 0, 0], [0.30000000000000004, 0, 0]],
    ],
  );
});

test("the same sea contract admits photon and neutrino passers, including group-v=0", () => {
  const templates = [
    ...braidTemplates,
    {
      id: "neutrino",
      assemblyClass: "neutrino",
      populationRole: "transient",
      memberCount: 1,
      geometryOwner: "tests/fixtures/neutrino-prescribed-geometry.json",
    },
    {
      id: "photon",
      assemblyClass: "photon",
      populationRole: "transient",
      memberCount: 1,
      geometryOwner: "tests/fixtures/photon-prescribed-geometry.json",
    },
  ];
  const members = [
    { position: [-1, 0.1, 0], velocity: [0.1, 0.2, 0] },
    { position: [-1, -0.1, 0], velocity: [0.1, -0.2, 0] },
    { position: [1, 0.1, 0], velocity: [0.3, 0.2, 0] },
    { position: [1, -0.1, 0], velocity: [0.3, -0.2, 0] },
    { position: [0, 2, 0], velocity: [0.1, 0, 0] },
    { position: [0, -2, 0], velocity: [0.1, 0.4, 0] },
  ];
  const sea = seaModel({
    templates,
    instances: [
      {
        id: "pro-0",
        templateId: "pro-braid",
        memberConstituentIds: ["member-0", "member-1"],
        groupMotion: { kind: "inertial-group.v1", epochTime: 0, positionAtEpoch: [-1, 0, 0], velocity: [0, 0, 0] },
      },
      {
        id: "anti-0",
        templateId: "anti-braid",
        memberConstituentIds: ["member-2", "member-3"],
        groupMotion: { kind: "inertial-group.v1", epochTime: 0, positionAtEpoch: [1, 0, 0], velocity: [0.2, 0, 0] },
      },
      {
        id: "neutrino-0",
        templateId: "neutrino",
        memberConstituentIds: ["member-4"],
        groupMotion: { kind: "inertial-group.v1", epochTime: 0, positionAtEpoch: [0, 2, 0], velocity: [0, 0, 0] },
      },
      {
        id: "photon-0",
        templateId: "photon",
        memberConstituentIds: ["member-5"],
        groupMotion: { kind: "inertial-group.v1", epochTime: 0, positionAtEpoch: [0, -2, 0], velocity: [0, 0.4, 0] },
      },
    ],
  });
  const realized = materializePrescribedAssemblySpec(assemblyFixture({ members, sea }))
    .seas[0].realizedAssemblies;
  assert.deepEqual(
    realized.filter((row) => row.populationRole === "transient")
      .map((row) => [row.assemblyClass, row.groupMotion.velocity]),
    [["neutrino", [0, 0, 0]], ["photon", [0, 0.4, 0]]],
  );
});

test("template-only seas preserve an assembly population idea without inventing members", () => {
  const sea = seaModel({ templates: braidTemplates, status: "template-only" });
  const spec = assemblyFixture({
    members: [{ position: [0, 0, 0], velocity: [0, 0, 0] }],
    sea,
  });
  assert.equal(validatePrescribedAssemblySpec(spec), spec);
  assert.deepEqual(materializePrescribedAssemblySpec(spec).seas[0].realizedAssemblies, []);
});

test("sea validation fails closed on member reuse, centroid drift, and unknown models", () => {
  const members = [
    { position: [-1, 0.1, 0], velocity: [0.1, 0.2, 0] },
    { position: [-1, -0.1, 0], velocity: [0.1, -0.2, 0] },
    { position: [1, 0.1, 0], velocity: [0.3, 0.2, 0] },
    { position: [1, -0.1, 0], velocity: [0.3, -0.2, 0] },
  ];
  const sea = seaModel({
    templates: braidTemplates,
    instances: [
      {
        id: "pro-0",
        templateId: "pro-braid",
        memberConstituentIds: ["member-0", "member-1"],
        groupMotion: { kind: "inertial-group.v1", epochTime: 0, positionAtEpoch: [-1, 0, 0], velocity: [0, 0, 0] },
      },
      {
        id: "anti-0",
        templateId: "anti-braid",
        memberConstituentIds: ["member-2", "member-3"],
        groupMotion: { kind: "inertial-group.v1", epochTime: 0, positionAtEpoch: [1, 0, 0], velocity: [0.2, 0, 0] },
      },
    ],
  });
  const baseline = assemblyFixture({ members, sea });

  const reused = structuredClone(baseline);
  reused.geometry.seas[0].materialization.instances[1].memberConstituentIds[0] = "member-0";
  assert.throws(() => validatePrescribedAssemblySpec(reused), /reuses constituent member-0/);

  const drifted = structuredClone(baseline);
  drifted.geometry.seas[0].materialization.instances[0].groupMotion.positionAtEpoch[0] = -1.1;
  assert.throws(() => validatePrescribedAssemblySpec(drifted), /geometric-centroid position differs/);

  const unknown = structuredClone(baseline);
  unknown.geometry.seas[0].model.kind = "future-unregistered-sea.v1";
  assert.throws(() => validatePrescribedAssemblySpec(unknown), /not a registered prescribed-sea model/);

  const windowWithoutRegion = structuredClone(baseline);
  delete windowWithoutRegion.geometry.seas[0].model.region;
  assert.throws(() => validatePrescribedAssemblySpec(windowWithoutRegion), /requires model.region/);
});
