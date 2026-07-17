import test from "node:test";
import assert from "node:assert/strict";

import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgAppManifest.js";
import {
  BORG_ACCEPTED_SEED_HISTORY_PROVENANCE,
  BORG_MAX_INITIAL_ARCHITRINO_COUNT,
  BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE,
  createBorgAcceptedInertialSeedHistory,
  createBorgInitialConditionConfig,
  createBorgPrescribedLinearHistoryRows,
  calculateBorgSeedingRadius,
  createBorgSeededInitialConditionRows,
  certifyBorgMinimumSeparation,
  validateBorgInitialConditionConfig,
} from "../src/apps/borg/BorgInitialConditions.js";
import {
  createBorgRunGradeDefaults,
  createBorgRunGradePlacementPolicy,
} from "../src/apps/borg/BorgRunGradeDefaults.js";

test("Borg initial-condition controls start from the accepted manifest values", () => {
  assert.deepEqual(
    createBorgInitialConditionConfig(BORG_DATASET_MANIFEST_V1.initialConditions),
    {
      electrinoCount: 3,
      positrinoCount: 3,
      randomVelocityMaxComponentMagnitude: 0.01,
      randomVelocityMinSpeed: 0,
    },
  );
});

test("Borg display defaults are separate from unchanged certified defaults", () => {
  assert.deepEqual(createBorgRunGradeDefaults(BORG_DATASET_MANIFEST_V1, "display"), {
    coupling: 0.0005,
    initialConditionConfig: {
      electrinoCount: 32,
      positrinoCount: 32,
      randomVelocityMaxComponentMagnitude: 0.001,
      randomVelocityMinSpeed: 0,
    },
  });
  assert.deepEqual(createBorgRunGradeDefaults(BORG_DATASET_MANIFEST_V1, "certified"), {
    coupling: 0.05,
    initialConditionConfig: {
      electrinoCount: 3,
      positrinoCount: 3,
      randomVelocityMaxComponentMagnitude: 0.01,
      randomVelocityMinSpeed: 0,
    },
  });
  assert.equal(BORG_DATASET_MANIFEST_V1.simulationEnvelope.outerRadius, 0.5);
  assert.ok(
    createBorgRunGradePlacementPolicy(
      BORG_DATASET_MANIFEST_V1,
      "certified",
      64,
    ).seedingRadius > 0.5,
  );
});

test("Borg display seeding keeps all 64 default paths inside the smaller sphere", () => {
  const defaults = createBorgRunGradeDefaults(BORG_DATASET_MANIFEST_V1, "display");
  const placement = createBorgRunGradePlacementPolicy(
    BORG_DATASET_MANIFEST_V1,
    "display",
    64,
  );
  const rows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 7,
    config: defaults.initialConditionConfig,
    seedingRadius: placement.seedingRadius,
    minimumPairSeparation: placement.minimumPairSeparation,
  });
  assert.equal(placement.seedingRadius, 0.35);
  assert.equal(placement.velocityReversalRadius, 0.4375);
  assert.equal(rows.length, 64);
  assert.equal(
    certifyBorgMinimumSeparation(rows, {
      minimumPairSeparation: placement.minimumPairSeparation,
    }).accepted,
    true,
  );
  rows.forEach((row) => {
    assert.ok(Math.hypot(
      row.position.x - 0.5,
      row.position.y - 0.5,
      row.position.z - 0.5,
    ) <= 0.35 + 1e-12);
  });
});

test("Borg initial-condition controls reject impossible populations and velocity ranges", () => {
  assert.equal(validateBorgInitialConditionConfig({
    electrinoCount: 0,
    positrinoCount: 0,
    randomVelocityMaxComponentMagnitude: 0.042,
    randomVelocityMinSpeed: 0.0144,
  }).ok, false);
  assert.equal(validateBorgInitialConditionConfig({
    electrinoCount: 8,
    positrinoCount: 9,
    randomVelocityMaxComponentMagnitude: 0.01,
    randomVelocityMinSpeed: 0.01,
  }, { maximumTotalCount: 16 }).ok, false);
  assert.equal(validateBorgInitialConditionConfig({
    electrinoCount: BORG_MAX_INITIAL_ARCHITRINO_COUNT,
    positrinoCount: 1,
    randomVelocityMaxComponentMagnitude: 0.042,
    randomVelocityMinSpeed: 0.0144,
  }).ok, false);
  assert.equal(validateBorgInitialConditionConfig({
    electrinoCount: 1,
    positrinoCount: 1,
    randomVelocityMaxComponentMagnitude: 0.01,
    randomVelocityMinSpeed: 0.02,
  }).ok, false);
});

test("Borg retains the prescribed linear history constructor for compatibility diagnostics", () => {
  const endpointRows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 4,
    config: {
      electrinoCount: 1,
      positrinoCount: 1,
      randomVelocityMaxComponentMagnitude: 0.02,
      randomVelocityMinSpeed: 0.01,
    },
  });
  const rows = createBorgPrescribedLinearHistoryRows(endpointRows, {
    historyStartTime: 100,
    historyEndTime: 300,
  });

  assert.equal(rows.length, 4);
  for (const endpoint of endpointRows) {
    const pathRows = rows.filter((row) => row.pathKey === endpoint.pathKey);
    assert.equal(pathRows.length, 2);
    assert.equal(pathRows[0].time, 100);
    assert.equal(pathRows[1].time, 300);
    assert.deepEqual(pathRows[1].position, endpoint.position);
    assert.deepEqual(pathRows[1].velocity, endpoint.velocity);
    assert.equal(pathRows[0].historySourceProvenance, BORG_PRESCRIBED_INITIAL_HISTORY_PROVENANCE);
  }
});

test("Borg creates a certified accepted seed without calling it EOM output", async () => {
  const endpointRows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 4,
    config: {
      electrinoCount: 1,
      positrinoCount: 1,
      randomVelocityMaxComponentMagnitude: 0.02,
      randomVelocityMinSpeed: 0.01,
    },
  });
  const seed = await createBorgAcceptedInertialSeedHistory(endpointRows, {
    historyStartTime: -0.02,
    historyEndTime: 0,
    sampleInterval: 0.01,
    digest: async () => "known-digest",
  });

  assert.equal(seed.rows.length, 4);
  assert.equal(seed.rows.every((row) => row.historySourceProvenance === BORG_ACCEPTED_SEED_HISTORY_PROVENANCE), true);
  assert.equal(seed.rows.every((row) => row.historySourceAcceptedInitialDatum === true), true);
  assert.equal(seed.rows.every((row) => row.historySourceIsEomOutput === false), true);
  assert.equal(seed.certificate.accepted, true);
  assert.equal(seed.certificate.acceptanceScope, "eom-continuous-initial-datum-only");
  assert.equal(seed.certificate.futurePathPrescription, false);
  assert.equal(seed.certificate.eomOutput, false);
  assert.equal(seed.certificate.canonicalEomEvidence, false);
  assert.equal(seed.certificate.contentSha256, "known-digest");
});

test("Borg seeded initial-condition rows honor counts, polarity, and velocity limits", () => {
  const config = {
    electrinoCount: 3,
    positrinoCount: 2,
    randomVelocityMaxComponentMagnitude: 0.02,
    randomVelocityMinSpeed: 0.01,
  };
  const first = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 7,
    config,
  });
  const repeated = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 7,
    config,
  });
  const next = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 8,
    config,
  });

  assert.deepEqual(first, repeated);
  assert.notDeepEqual(first, next);
  assert.equal(first.length, 5);
  assert.equal(new Set(first.map((row) => row.pathKey)).size, 5);
  assert.equal(first.filter((row) => row.stateFlags === 1).length, 2);
  assert.equal(first.filter((row) => row.stateFlags === 2).length, 3);
  const center = BORG_DATASET_MANIFEST_V1.simulationEnvelope.center;
  const radius = BORG_DATASET_MANIFEST_V1.simulationEnvelope.outerRadius;
  first.forEach((row) => {
    assert.ok(Math.max(...Object.values(row.velocity).map(Math.abs)) <= 0.02);
    assert.ok(Math.hypot(row.velocity.x, row.velocity.y, row.velocity.z) >= 0.01);
    assert.ok(Math.hypot(
      row.position.x - center.x,
      row.position.y - center.y,
      row.position.z - center.z,
    ) <= radius + 1e-12);
  });
});

test("Borg default seeded-random geometry certifies separation and bounded random velocity", () => {
  const rows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 0,
    config: createBorgInitialConditionConfig(BORG_DATASET_MANIFEST_V1.initialConditions),
  });
  const certificate = certifyBorgMinimumSeparation(rows, {
    minimumPairSeparation: 0.2,
  });

  assert.equal(rows.length, 6);
  assert.equal(rows[0].runSource, "seeded-random-minimum-separation-initial-state");
  assert.notDeepEqual(
    rows.map((row) => row.position),
    [...rows].sort((left, right) =>
      left.position.x - right.position.x ||
      left.position.y - right.position.y ||
      left.position.z - right.position.z
    ).map((row) => row.position),
  );
  assert.equal(rows.every((row) =>
    Object.values(row.velocity).every((value) => Math.abs(value) <= 0.01)), true);
  assert.equal(rows.some((row) =>
    Object.values(row.velocity).some((value) => value !== 0)), true);
  assert.equal(certificate.accepted, true);
  assert.equal(certificate.requiredMinimumSeparation, 0.2);
  assert.ok(certificate.measuredMinimumSeparation >= 0.2 - 1e-12);
});

test("Borg single-particle seeding has the uniform simulation-envelope radial law", () => {
  const radius = BORG_DATASET_MANIFEST_V1.simulationEnvelope.outerRadius;
  const centralRadius = BORG_DATASET_MANIFEST_V1.simulationEnvelope.centralBallRadius;
  const center = BORG_DATASET_MANIFEST_V1.simulationEnvelope.center;
  let normalizedCubicRadiusSum = 0;
  let outsideCentralBallCount = 0;
  const sampleCount = 1000;
  for (let seedIndex = 0; seedIndex < sampleCount; seedIndex += 1) {
    const [row] = createBorgSeededInitialConditionRows({
      manifest: BORG_DATASET_MANIFEST_V1,
      seedIndex,
      config: {
        electrinoCount: 1,
        positrinoCount: 0,
        randomVelocityMaxComponentMagnitude: 0,
        randomVelocityMinSpeed: 0,
      },
    });
    const radialDistance = Math.hypot(
      row.position.x - center.x,
      row.position.y - center.y,
      row.position.z - center.z,
    );
    assert.ok(radialDistance <= radius + 1e-12);
    if (radialDistance > centralRadius) {
      outsideCentralBallCount += 1;
    }
    normalizedCubicRadiusSum += (radialDistance / radius) ** 3;
  }
  const normalizedCubicRadiusMean = normalizedCubicRadiusSum / sampleCount;
  assert.ok(normalizedCubicRadiusMean > 0.47);
  assert.ok(normalizedCubicRadiusMean < 0.53);
  assert.ok(outsideCentralBallCount > 400);
  assert.ok(outsideCentralBallCount < 600);
});

test("Borg initial-condition controls support an explicit zero-velocity population", () => {
  const rows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 1,
    config: {
      electrinoCount: 1,
      positrinoCount: 0,
      randomVelocityMaxComponentMagnitude: 0,
      randomVelocityMinSpeed: 0,
    },
  });

  assert.deepEqual(rows[0].velocity, { x: 0, y: 0, z: 0 });
});

test("Borg seeds large populations by holding the declared density, not by failing closed", () => {
  const rows = createBorgSeededInitialConditionRows({
    manifest: BORG_DATASET_MANIFEST_V1,
    seedIndex: 0,
    config: {
      electrinoCount: 32,
      positrinoCount: 32,
      randomVelocityMaxComponentMagnitude: 0,
      randomVelocityMinSpeed: 0,
    },
  });
  assert.equal(rows.length, 64);

  // The declared separation is honored inside a density-preserving envelope;
  // a fixed envelope cannot place 64 at 0.2 separation at any seed.
  const certificate = certifyBorgMinimumSeparation(rows, { minimumPairSeparation: 0.2 });
  assert.equal(certificate.accepted, true);
  assert.ok(certificate.measuredMinimumSeparation >= 0.2);

  const seedingRadius = calculateBorgSeedingRadius(BORG_DATASET_MANIFEST_V1, 64);
  const center = BORG_DATASET_MANIFEST_V1.simulationEnvelope.center;
  assert.ok(seedingRadius > BORG_DATASET_MANIFEST_V1.simulationEnvelope.outerRadius);
  rows.forEach((row) => {
    const radius = Math.hypot(
      row.position.x - center.x,
      row.position.y - center.y,
      row.position.z - center.z,
    );
    assert.ok(radius <= seedingRadius);
  });

  // The declared population still seeds inside the declared envelope exactly.
  assert.equal(
    calculateBorgSeedingRadius(BORG_DATASET_MANIFEST_V1, 6),
    BORG_DATASET_MANIFEST_V1.simulationEnvelope.outerRadius,
  );
});
