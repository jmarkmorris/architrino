#!/usr/bin/env node

// Independent construction check for Campaign 1 initial histories.
//
// This checker reads only the construction-only manifest. It reconstructs the
// campaign grid and cubic prehistory equations directly from the campaign spec;
// it does not call the EOM solver, consume engine evidence flags, or inspect an
// evolved path. Agreement therefore checks the C++ workload implementation.

import assert from "node:assert/strict";
import fs from "node:fs";

const manifestPath = process.argv[2];
if (!manifestPath) {
  throw new Error(
    "usage: node scripts/eom/validate-campaign1-binary-workload.mjs <manifest.json>",
  );
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const separations = [1, 2, 4];
const speeds = [0.25, 0.5, 0.75];
const angles = new Map([
  ["0", 0],
  ["pi4", Math.PI / 4],
  ["pi2", Math.PI / 2],
]);
const prehistories = ["P0-inertial", "P1-lateral", "P2-longitudinal"];
const refinements = new Map([
  ["R0", { maximumStep: 0.02, maximumPrehistorySegment: 0.1, rootDepth: 192, stepsPerChunk: 5 }],
  ["R1", { maximumStep: 0.01, maximumPrehistorySegment: 0.05, rootDepth: 224, stepsPerChunk: 10 }],
  ["R2", { maximumStep: 0.005, maximumPrehistorySegment: 0.025, rootDepth: 256, stepsPerChunk: 20 }],
]);
const probeTimes = [-20, -15, -10, -5, 0];
const tolerance = 3e-10;

function near(actual, expected, label, epsilon = tolerance) {
  assert.ok(
    Math.abs(actual - expected) <= epsilon,
    `${label}: expected ${expected}, received ${actual}`,
  );
}

function midpoint(interval) {
  return (interval.lower + interval.upper) / 2;
}

function encloses(interval, expected, label) {
  assert.ok(interval.lower <= interval.upper, `${label}: inverted interval`);
  assert.ok(
    expected >= interval.lower - tolerance && expected <= interval.upper + tolerance,
    `${label}: ${expected} not enclosed by [${interval.lower}, ${interval.upper}]`,
  );
}

function expectedState(workload, pathId, time) {
  const polarity = pathId === "positive" ? 1 : -1;
  const angle = angles.get(workload.angleId);
  const releasePosition = [polarity * workload.separation / 2, 0, 0];
  const positiveVelocity = [
    -workload.speed * Math.cos(angle),
    workload.speed * Math.sin(angle),
    0,
  ];
  const releaseVelocity = positiveVelocity.map((value) => polarity * value);
  const u = -time / 20;
  const q = u * u * (3 - 2 * u);
  const qPrime = (6 * time) / (20 * 20) + (6 * time * time) / (20 * 20 * 20);
  const bump = [0, 0, 0];
  const amplitude = polarity * 0.25 * workload.separation;
  if (workload.prehistoryId === "P1-lateral") bump[2] = amplitude;
  if (workload.prehistoryId === "P2-longitudinal") bump[0] = amplitude;
  return {
    position: releasePosition.map(
      (value, axis) => value + time * releaseVelocity[axis] + q * bump[axis],
    ),
    velocity: releaseVelocity.map(
      (value, axis) => value + qPrime * bump[axis],
    ),
  };
}

assert.equal(manifest.schema, "campaign1_binary_workload_construction/v0");
assert.equal(manifest.purpose, "declared-initial-condition-construction-only");
// evolutionInvoked and physicsResultBooked are descriptive producer metadata,
// never acceptance inputs. The no-evolution boundary is established by the
// harness control path returning before request construction/root/evolution.
assert.equal(manifest.configurationCount, 27);
assert.equal(manifest.prehistoryCount, 3);
assert.equal(manifest.refinementCount, 3);
assert.equal(manifest.workloadCount, 243);
assert.equal(manifest.workloads.length, 243);

const runIds = new Set();
const configurationIds = new Set();
const productionCoordinateIds = new Set();
const endpointGroups = new Map();
const oldEndpointGroups = new Map();
let probeCount = 0;
let segmentCount = 0;
let maximumPositionIntervalWidth = 0;
let maximumVelocityIntervalWidth = 0;

for (const workload of manifest.workloads) {
  assert.ok(separations.includes(workload.separation));
  assert.ok(speeds.includes(workload.speed));
  assert.ok(workload.speed < 1, `${workload.runId}: release speed is not sub-field`);
  assert.ok(angles.has(workload.angleId));
  assert.ok(prehistories.includes(workload.prehistoryId));
  assert.ok(refinements.has(workload.refinement.id));
  assert.ok(!runIds.has(workload.runId), `duplicate run id ${workload.runId}`);
  runIds.add(workload.runId);
  configurationIds.add(
    `${workload.separation}|${workload.speed}|${workload.angleId}`,
  );
  productionCoordinateIds.add(
    `${workload.separation}|${workload.speed}|${workload.angleId}|${workload.prehistoryId}`,
  );

  const expectedRefinement = refinements.get(workload.refinement.id);
  for (const [field, expected] of Object.entries(expectedRefinement)) {
    near(workload.refinement[field], expected, `${workload.runId}.${field}`, 1e-15);
  }
  near(workload.refinement.chunkDuration, 0.1, `${workload.runId}.chunkDuration`, 1e-15);
  near(
    workload.angleRadians,
    angles.get(workload.angleId),
    `${workload.runId}.angleRadians`,
    1e-15,
  );
  assert.deepEqual(workload.paths.map((path) => path.id), ["positive", "negative"]);
  assert.equal(workload.paths[0].charge, "0.1666666666666666666666666666666667");
  assert.equal(workload.paths[1].charge, "-0.1666666666666666666666666666666667");

  for (const path of workload.paths) {
    assert.equal(Number(path.coverageStart), -20);
    assert.equal(Number(path.coverageEnd), 0);
    const expectedSegments = Math.round(
      20 / expectedRefinement.maximumPrehistorySegment,
    );
    assert.equal(path.segmentCount, expectedSegments);
    segmentCount += path.segmentCount;
    assert.ok(path.historyFingerprint.startsWith("fnv1a64-chain-v1:"));
    assert.ok(
      path.maximumSegmentDuration <=
        expectedRefinement.maximumPrehistorySegment + 1e-14,
      `${workload.runId}/${path.id}: segment duration exceeds refinement`,
    );
    assert.deepEqual(path.probes.map((probe) => Number(probe.time)), probeTimes);

    for (const probe of path.probes) {
      const time = Number(probe.time);
      const expected = expectedState(workload, path.id, time);
      for (let axis = 0; axis < 3; axis += 1) {
        encloses(
          probe.position[axis],
          expected.position[axis],
          `${workload.runId}/${path.id}/t=${time}/position[${axis}]`,
        );
        encloses(
          probe.velocity[axis],
          expected.velocity[axis],
          `${workload.runId}/${path.id}/t=${time}/velocity[${axis}]`,
        );
        maximumPositionIntervalWidth = Math.max(
          maximumPositionIntervalWidth,
          probe.position[axis].upper - probe.position[axis].lower,
        );
        maximumVelocityIntervalWidth = Math.max(
          maximumVelocityIntervalWidth,
          probe.velocity[axis].upper - probe.velocity[axis].lower,
        );
      }
      probeCount += 1;
    }

    const endpointKey = [
      workload.separation,
      workload.speed,
      workload.angleId,
      workload.refinement.id,
      path.id,
    ].join("|");
    const endpointProbe = path.probes.at(-1);
    const endpoint = {
      position: endpointProbe.position.map(midpoint),
      velocity: endpointProbe.velocity.map(midpoint),
      prehistoryId: workload.prehistoryId,
    };
    const endpointRows = endpointGroups.get(endpointKey) ?? [];
    endpointRows.push(endpoint);
    endpointGroups.set(endpointKey, endpointRows);

    const oldProbe = path.probes[0];
    const oldRows = oldEndpointGroups.get(endpointKey) ?? [];
    oldRows.push({
      position: oldProbe.position.map(midpoint),
      prehistoryId: workload.prehistoryId,
    });
    oldEndpointGroups.set(endpointKey, oldRows);
  }
}

assert.equal(runIds.size, 243);
assert.equal(configurationIds.size, 27);
assert.equal(productionCoordinateIds.size, 81);

for (const [key, rows] of endpointGroups) {
  assert.equal(rows.length, 3, `${key}: missing endpoint-matched prehistory`);
  const reference = rows.find((row) => row.prehistoryId === "P0-inertial");
  for (const row of rows) {
    row.position.forEach((value, axis) =>
      near(value, reference.position[axis], `${key}: endpoint position axis ${axis}`),
    );
    row.velocity.forEach((value, axis) =>
      near(value, reference.velocity[axis], `${key}: endpoint velocity axis ${axis}`),
    );
  }
}

for (const [key, rows] of oldEndpointGroups) {
  assert.equal(rows.length, 3, `${key}: missing old prehistory endpoint`);
  const [separationText, , , , pathId] = key.split("|");
  const polarity = pathId === "positive" ? 1 : -1;
  const amplitude = polarity * 0.25 * Number(separationText);
  const p0 = rows.find((row) => row.prehistoryId === "P0-inertial").position;
  const p1 = rows.find((row) => row.prehistoryId === "P1-lateral").position;
  const p2 = rows.find((row) => row.prehistoryId === "P2-longitudinal").position;
  near(p1[2] - p0[2], amplitude, `${key}: lateral material difference`);
  near(p2[0] - p0[0], amplitude, `${key}: longitudinal material difference`);
}

const result = {
  schema: "campaign1_binary_workload_validation/v0",
  grade: "measured-implementation-parity",
  constructionTheoremCheckedSeparately: true,
  evolutionInvoked: false,
  physicsResultBooked: false,
  configurationCount: configurationIds.size,
  productionCoordinateCount: productionCoordinateIds.size,
  refinementExecutionCount: runIds.size,
  pathCount: runIds.size * 2,
  retainedSegmentCount: segmentCount,
  analyticProbeCount: probeCount,
  endpointMatchedGroupCount: endpointGroups.size,
  materialDifferenceGroupCount: oldEndpointGroups.size,
  maximumPositionIntervalWidth,
  maximumVelocityIntervalWidth,
  status: "passed",
};

console.log(JSON.stringify(result, null, 2));
