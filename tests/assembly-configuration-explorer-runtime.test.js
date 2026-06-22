import test from "node:test";
import assert from "node:assert/strict";

import {
  classifySpeedRegime,
  createAssemblyExplorerDemoDataset,
  createPermutationCanonicalKey,
  normalizeBranchRecord,
  normalizeExplorerDataset,
} from "../src/apps/assembly-explorer/AssemblyConfigurationExplorerRuntime.js";

test("assembly explorer preserves unquotiented input order while computing an S3 key", () => {
  const dataset = createAssemblyExplorerDemoDataset();
  assert.equal(dataset.searchSemantics.layerOrdering, "unquotiented-labeled");
  assert.deepEqual(
    dataset.branches[0].layers.map((layer) => layer.layerId),
    ["B1", "B2", "B3"]
  );
  assert.deepEqual(
    dataset.branches[1].layers.map((layer) => layer.layerId),
    ["B3", "B1", "B2"]
  );
  assert.equal(dataset.branches[0].permutationCanonicalKey, dataset.branches[1].permutationCanonicalKey);
});

test("permutation canonical key is invariant under layer relabeling", () => {
  const branch = normalizeBranchRecord(
    {
      branchId: "probe",
      layers: [
        { layerId: "x", frequency: 2, radius: 3, energy: 5, phase: 0, normal: { x: 1, y: 0, z: 0 } },
        { layerId: "y", frequency: 7, radius: 11, energy: 13, phase: 1, normal: { x: 0, y: 1, z: 0 } },
        { layerId: "z", frequency: 17, radius: 19, energy: 23, phase: 2, normal: { x: 0, y: 0, z: 1 } },
      ],
    },
    1
  );
  const permuted = [branch.layers[2], branch.layers[0], branch.layers[1]];
  assert.equal(createPermutationCanonicalKey(branch.layers), createPermutationCanonicalKey(permuted));
});

test("permutation canonical key is stable for equivalent ledger key order", () => {
  const branch = normalizeBranchRecord(
    {
      branchId: "probe",
      layers: [
        { layerId: "x", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 }, ledger: { b: 2, a: 1 } },
        { layerId: "y", frequency: 2, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 1, z: 0 } },
        { layerId: "z", frequency: 3, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 0, z: 1 } },
      ],
    },
    1
  );
  const sameBranch = normalizeBranchRecord(
    {
      branchId: "probe",
      layers: [
        { layerId: "x", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 }, ledger: { a: 1, b: 2 } },
        { layerId: "y", frequency: 2, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 1, z: 0 } },
        { layerId: "z", frequency: 3, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 0, z: 1 } },
      ],
    },
    1
  );
  assert.equal(branch.permutationCanonicalKey, sameBranch.permutationCanonicalKey);
});

test("assembly explorer keeps unquotiented layer ordering even when a packet asks for another label", () => {
  const dataset = normalizeExplorerDataset({
    schema: "assembly-configuration-explorer.dataset.v1",
    datasetId: "ordering",
    fieldSpeed: 1,
    searchSemantics: {
      layerOrdering: "sorted-by-frequency",
      permutationPolicy: "analysis-collapse-only",
    },
    branches: [
      {
        branchId: "row",
        layers: [
          { layerId: "a", frequency: 3, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 } },
          { layerId: "b", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 1, z: 0 } },
          { layerId: "c", frequency: 2, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 0, z: 1 } },
        ],
      },
    ],
  });
  assert.equal(dataset.searchSemantics.layerOrdering, "unquotiented-labeled");
  assert.equal(dataset.searchSemantics.permutationPolicy, "analysis-collapse-only");
  assert.deepEqual(
    dataset.branches[0].layers.map((layer) => layer.layerId),
    ["a", "b", "c"]
  );
});

test("assembly explorer keeps group velocity as a branch-level transport row", () => {
  const branch = normalizeBranchRecord(
    {
      branchId: "moving-row",
      responseCenter: { x: 1, y: 2, z: 3 },
      groupVelocity: { x: 0.2, y: 0.1, z: 0.2 },
      seaRecord: { regime: "weak-drift-diagnostic" },
      layers: [
        { layerId: "a", frequency: 3, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 } },
        { layerId: "b", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 1, z: 0 } },
        { layerId: "c", frequency: 2, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 0, z: 1 } },
      ],
    },
    1
  );
  assert.deepEqual(branch.responseCenter, { x: 1, y: 2, z: 3 });
  assert.deepEqual(branch.groupVelocity, { x: 0.2, y: 0.1, z: 0.2 });
  assert.ok(Math.abs(branch.groupSpeed - 0.3) < 1e-12);
  assert.equal(branch.seaRecord.regime, "weak-drift-diagnostic");
});

test("assembly explorer keeps eigen-swarm status out of the S3 layer key", () => {
  const layers = [
    { layerId: "a", frequency: 3, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 } },
    { layerId: "b", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 1, z: 0 } },
    { layerId: "c", frequency: 2, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 0, z: 1 } },
  ];
  const candidate = normalizeBranchRecord(
    {
      branchId: "eigen-candidate",
      eigenSwarm: {
        status: "candidate",
        returnResidual: 0.01,
        floquetGap: 0.2,
        allowedSymmetries: ["phase-shift", "translation"],
        lorentzExportStatus: "downstream-target",
      },
      layers,
    },
    1
  );
  const rejected = normalizeBranchRecord(
    {
      branchId: "eigen-rejected",
      eigenSwarm: {
        status: "rejected",
        returnResidual: 1.4,
        lorentzExportStatus: "failed",
      },
      layers,
    },
    1
  );
  assert.equal(candidate.eigenSwarm.status, "candidate");
  assert.equal(candidate.eigenSwarm.returnResidual, 0.01);
  assert.deepEqual(candidate.eigenSwarm.allowedSymmetries, ["phase-shift", "translation"]);
  assert.equal(candidate.permutationCanonicalKey, rejected.permutationCanonicalKey);
});

test("assembly explorer keeps momentum-axis alignment as a branch-level row", () => {
  const layers = [
    { layerId: "a", frequency: 3, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 } },
    { layerId: "b", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 1, z: 0 } },
    { layerId: "c", frequency: 2, radius: 1, energy: 1, phase: 0, normal: { x: 0, y: 0, z: 1 } },
  ];
  const branch = normalizeBranchRecord(
    {
      branchId: "axis-row",
      totalMomentum: { x: 0.2, y: 0, z: 0 },
      totalAngularMomentum: { x: 0, y: 0, z: 0.4 },
      axisAlignment: {
        status: "candidate",
        angularMomentumResidual: 0.03,
        weights: "branch-angular-momentum",
        envelopeAxisStatus: "moving-branch",
      },
      layers,
    },
    1
  );
  const shiftedAxisBranch = normalizeBranchRecord(
    {
      branchId: "axis-shifted-row",
      totalMomentum: { x: 0, y: 0.2, z: 0 },
      totalAngularMomentum: { x: 0, y: 0, z: 0.1 },
      axisAlignment: {
        status: "failed",
        angularMomentumResidual: 0.9,
        weights: "branch-angular-momentum",
        envelopeAxisStatus: "failed",
      },
      layers,
    },
    1
  );
  assert.deepEqual(branch.totalMomentum, { x: 0.2, y: 0, z: 0 });
  assert.equal(branch.totalMomentumMagnitude, 0.2);
  assert.deepEqual(branch.totalAngularMomentum, { x: 0, y: 0, z: 0.4 });
  assert.equal(branch.totalAngularMomentumMagnitude, 0.4);
  assert.equal(branch.axisAlignment.status, "candidate");
  assert.equal(branch.axisAlignment.angularMomentumResidual, 0.03);
  assert.equal(branch.axisAlignment.envelopeAxisStatus, "moving-branch");
  assert.equal(branch.permutationCanonicalKey, shiftedAxisBranch.permutationCanonicalKey);
});

test("assembly explorer classifies sub, field, and super-field-speed carrier rows", () => {
  assert.equal(classifySpeedRegime(0.5, 1), "sub-field-speed");
  assert.equal(classifySpeedRegime(1, 1), "at-field-speed");
  assert.equal(classifySpeedRegime(1.5, 1), "super-field-speed");
});

test("assembly explorer rejects datasets without exactly three layers per branch", () => {
  assert.throws(
    () =>
      normalizeExplorerDataset({
        schema: "assembly-configuration-explorer.dataset.v1",
        datasetId: "bad",
        fieldSpeed: 1,
        searchSemantics: {
          layerOrdering: "unquotiented-labeled",
          permutationPolicy: "keep-repeated-solutions",
        },
        branches: [
          {
            branchId: "bad",
            layers: [
              { layerId: "a", frequency: 1, radius: 1, energy: 1, phase: 0, normal: { x: 1, y: 0, z: 0 } },
            ],
          },
        ],
      }),
    /requires exactly three binary layers/u
  );
});
