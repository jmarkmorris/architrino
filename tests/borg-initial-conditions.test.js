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
  createBorgSeededInitialConditionRows,
  validateBorgInitialConditionConfig,
} from "../src/apps/borg/BorgInitialConditions.js";

test("Borg initial-condition controls start from the accepted manifest values", () => {
  assert.deepEqual(
    createBorgInitialConditionConfig(BORG_DATASET_MANIFEST_V1.initialConditions),
    {
      electrinoCount: 8,
      positrinoCount: 8,
      randomVelocityMaxComponentMagnitude: 0.042,
      randomVelocityMinSpeed: 0.0144,
    },
  );
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
  const bounds = BORG_DATASET_MANIFEST_V1.simulationEnvelope.centralVolume.bounds;
  first.forEach((row) => {
    assert.ok(Math.max(...Object.values(row.velocity).map(Math.abs)) <= 0.02);
    assert.ok(Math.hypot(row.velocity.x, row.velocity.y, row.velocity.z) >= 0.01);
    assert.ok(row.position.x >= bounds.x[0] && row.position.x <= bounds.x[1]);
    assert.ok(row.position.y >= bounds.y[0] && row.position.y <= bounds.y[1]);
    assert.ok(row.position.z >= bounds.z[0] && row.position.z <= bounds.z[1]);
  });
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
