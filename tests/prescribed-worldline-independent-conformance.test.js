import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { BORG_BRAID_RECORD_CATALOG } from "../src/apps/borg/BorgBraidRecordCatalog.js";
import {
  evaluateMaterializedWorldline,
  materializePrescribedAssemblySpec,
} from "../src/prescribed-geometry/PrescribedAssemblySpec.mjs";
import {
  ACTIVE_PRESCRIBED_BRAID_TARGETS,
  DEPRECATED_PRESCRIBED_BRAID_TARGETS,
} from "../scripts/eom/generate-prescribed-braid-record.mjs";

// These expected-value maps are authored directly from the mathematical owners.
// They deliberately do not import a geometry constructor, reconstruction helper,
// or worldline operator from the production path under test.

const SD3_URL = new URL(
  "../reference/priorities/braid-program/configurations/sd3-centered-five-coordinate.v2.json",
  import.meta.url,
);
const F6C_URL = new URL(
  "../reference/priorities/braid-program/configurations/f6c-polarity-resolved-harmonic.v2.json",
  import.meta.url,
);
const F6B_URL = new URL(
  "../reference/priorities/braid-program/configurations/f6b-scoped-negative-circular.v2.json",
  import.meta.url,
);
const READINESS_MATRIX_URL = new URL(
  "../reference/priorities/braid-program/prescribed-worldline-readiness-matrix.md",
  import.meta.url,
);

const SD3_SPEC = JSON.parse(readFileSync(SD3_URL, "utf8"));
const F6C_SPEC = JSON.parse(readFileSync(F6C_URL, "utf8"));
const F6B_SPEC = JSON.parse(readFileSync(F6B_URL, "utf8"));
const FIELD_SPEED = 1;
const TWO_PI = 2 * Math.PI;
const TOLERANCE = 3e-12;

const F6_AXES = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
].map((axis) => scale(axis, 1 / Math.sqrt(3)));
const F6_CIRCULATION_SIGNS = [-1, -1, 1, 1];
const F6_PHASE_OFFSETS = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];
const F6_ORDER_FOUR = [
  [-1, 0, 0],
  [0, 0, -1],
  [0, 1, 0],
];
const F6_ORDER_FOUR_MODULE_MAP = [3, 2, 0, 1];

function add(...vectors) {
  return [0, 1, 2].map((axis) => vectors.reduce((sum, vector) => sum + vector[axis], 0));
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.hypot(...vector);
}

function unit(vector) {
  return scale(vector, 1 / norm(vector));
}

function matrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function mean(vectors) {
  return scale(vectors.reduce((sum, vector) => add(sum, vector), [0, 0, 0]), 1 / vectors.length);
}

function near(actual, expected, tolerance = TOLERANCE) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

function vectorNear(actual, expected, tolerance = TOLERANCE) {
  assert.equal(actual.length, expected.length);
  actual.forEach((value, index) => near(value, expected[index], tolerance));
}

function angleNear(actual, expected, tolerance = TOLERANCE) {
  near(Math.atan2(Math.sin(actual - expected), Math.cos(actual - expected)), 0, tolerance);
}

function cyclicRotate(vector, moduleIndex) {
  let result = [...vector];
  for (let index = 0; index < moduleIndex; index += 1) {
    result = [result[2], result[0], result[1]];
  }
  return result;
}

function sd3OwnerMap(input) {
  const { seed, coordinates, rates, center, centerVelocity } = input;
  const axial = [1, 0, 0];
  const radial = [0, Math.cos(seed.theta), Math.sin(seed.theta)];
  const tangent = [0, -Math.sin(seed.theta), Math.cos(seed.theta)];
  const midpointCosine = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
  const midpointSine = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
  const seedPosition = add(scale(axial, seed.h), scale(radial, seed.rho));
  const seedVelocity = add(
    scale(axial, seed.hDot),
    scale(radial, seed.rhoDot),
    scale(tangent, seed.rho * seed.thetaDot),
  );
  const common = add(
    scale(axial, coordinates[0]),
    scale(radial, coordinates[1]),
    scale(tangent, coordinates[2]),
  );
  const commonVelocity = add(
    scale(axial, rates[0]),
    scale(radial, rates[1]),
    scale(tangent, rates[2]),
  );
  const midpoint = add(scale(midpointCosine, coordinates[3]), scale(midpointSine, coordinates[4]));
  const midpointVelocity = add(scale(midpointCosine, rates[3]), scale(midpointSine, rates[4]));
  const representatives = {
    1: {
      position: add(seedPosition, common, midpoint),
      velocity: add(seedVelocity, commonVelocity, midpointVelocity),
    },
    "-1": {
      position: add(scale(seedPosition, -1), scale(common, -1), midpoint),
      velocity: add(scale(seedVelocity, -1), scale(commonVelocity, -1), midpointVelocity),
    },
  };
  const members = [];
  for (let moduleIndex = 0; moduleIndex < 3; moduleIndex += 1) {
    for (const polarity of [1, -1]) {
      members.push({
        moduleIndex,
        polarity,
        position: add(center, cyclicRotate(representatives[polarity].position, moduleIndex)),
        velocity: add(centerVelocity, cyclicRotate(representatives[polarity].velocity, moduleIndex)),
      });
    }
  }
  return {
    axial,
    radial,
    tangent,
    midpointCosine,
    midpointSine,
    seedPosition,
    seedVelocity,
    representatives,
    members,
  };
}

function sd3MemberAtTime(member, time) {
  return {
    position: add(member.position, scale(member.velocity, time)),
    velocity: member.velocity,
  };
}

function recoverSd3Coordinates(map, positionRows, velocityRows) {
  const positive = positionRows.find((row) => row.moduleIndex === 0 && row.polarity === 1).value;
  const negative = positionRows.find((row) => row.moduleIndex === 0 && row.polarity === -1).value;
  const positiveVelocity = velocityRows.find((row) => row.moduleIndex === 0 && row.polarity === 1).value;
  const negativeVelocity = velocityRows.find((row) => row.moduleIndex === 0 && row.polarity === -1).value;
  const common = subtract(scale(subtract(positive, negative), 0.5), map.seedPosition);
  const midpoint = scale(add(positive, negative), 0.5);
  const commonVelocity = subtract(
    scale(subtract(positiveVelocity, negativeVelocity), 0.5),
    map.seedVelocity,
  );
  const midpointVelocity = scale(add(positiveVelocity, negativeVelocity), 0.5);
  return {
    coordinates: [
      dot(common, map.axial),
      dot(common, map.radial),
      dot(common, map.tangent),
      dot(midpoint, map.midpointCosine),
      dot(midpoint, map.midpointSine),
    ],
    rates: [
      dot(commonVelocity, map.axial),
      dot(commonVelocity, map.radial),
      dot(commonVelocity, map.tangent),
      dot(midpointVelocity, map.midpointCosine),
      dot(midpointVelocity, map.midpointSine),
    ],
  };
}

function sd3TangentColumns(map) {
  return [map.axial, map.radial, map.tangent, map.midpointCosine, map.midpointSine]
    .map((direction, coordinateIndex) => [0, 1, 2].flatMap((moduleIndex) => {
      const rotated = cyclicRotate(direction, moduleIndex);
      return coordinateIndex < 3 ? [...rotated, ...scale(rotated, -1)] : [...rotated, ...rotated];
    }));
}

function exactLinearMinimumClearance(members, start, end) {
  let minimum = Infinity;
  for (let left = 0; left < members.length; left += 1) {
    for (let right = left + 1; right < members.length; right += 1) {
      const separation = subtract(members[left].position, members[right].position);
      const relativeVelocity = subtract(members[left].velocity, members[right].velocity);
      const speedSquared = dot(relativeVelocity, relativeVelocity);
      const stationaryTime = speedSquared === 0 ? start : -dot(separation, relativeVelocity) / speedSquared;
      const time = Math.max(start, Math.min(end, stationaryTime));
      minimum = Math.min(minimum, norm(add(separation, scale(relativeVelocity, time))));
    }
  }
  return minimum;
}

function f6Frame(moduleIndex) {
  const axis = F6_AXES[moduleIndex];
  const transverseU = unit(cross([0, 0, 1], axis));
  const transverseV = cross(axis, transverseU);
  return { axis, transverseU, transverseV };
}

function f6cSectorCoordinates(polarity, time) {
  const positive = polarity === 1;
  const axialAmplitude = positive ? 0.04 : -0.03;
  const radialAmplitude = positive ? 0.025 : -0.02;
  return {
    h: 0.3 + axialAmplitude * Math.sin(time),
    hDot: axialAmplitude * Math.cos(time),
    rho: 0.3 + radialAmplitude * Math.sin(time),
    rhoDot: radialAmplitude * Math.cos(time),
    theta: time,
    thetaDot: 1,
  };
}

function f6cOwnerState(moduleIndex, polarity, time) {
  const { axis, transverseU, transverseV } = f6Frame(moduleIndex);
  const sector = f6cSectorCoordinates(polarity, time);
  const angle = polarity * F6_CIRCULATION_SIGNS[moduleIndex] * sector.theta
    + F6_PHASE_OFFSETS[moduleIndex];
  const radial = add(scale(transverseU, Math.cos(angle)), scale(transverseV, Math.sin(angle)));
  const tangent = add(scale(transverseU, -Math.sin(angle)), scale(transverseV, Math.cos(angle)));
  return {
    ...sector,
    trackCenter: scale(axis, polarity * sector.h),
    position: add(scale(axis, polarity * sector.h), scale(radial, sector.rho)),
    velocity: add(
      scale(axis, polarity * sector.hDot),
      scale(radial, sector.rhoDot),
      scale(tangent, sector.rho * polarity * F6_CIRCULATION_SIGNS[moduleIndex] * sector.thetaDot),
    ),
  };
}

function f6bOwnerState(moduleIndex, polarity, time) {
  const { axis, transverseU, transverseV } = f6Frame(moduleIndex);
  const angle = polarity * F6_CIRCULATION_SIGNS[moduleIndex] * time + F6_PHASE_OFFSETS[moduleIndex];
  const radial = add(scale(transverseU, Math.cos(angle)), scale(transverseV, Math.sin(angle)));
  const tangent = add(scale(transverseU, -Math.sin(angle)), scale(transverseV, Math.cos(angle)));
  return {
    trackCenter: scale(axis, polarity * 0.3),
    position: add(scale(axis, polarity * 0.3), scale(radial, 0.3)),
    velocity: scale(tangent, 0.3 * polarity * F6_CIRCULATION_SIGNS[moduleIndex]),
  };
}

function materializedStates(spec, time) {
  return materializePrescribedAssemblySpec(spec).worldlines.map((row) => ({
    id: row.id,
    constituentId: row.constituentId,
    moduleIndex: row.constituent.metadata.moduleIndex,
    polarity: row.constituent.polarity,
    ...evaluateMaterializedWorldline(row, time),
  }));
}

function minimumSampledClearance(stateAt, sampleCount) {
  let minimum = Infinity;
  for (let sample = 0; sample <= sampleCount; sample += 1) {
    const states = stateAt(TWO_PI * sample / sampleCount);
    for (let left = 0; left < states.length; left += 1) {
      for (let right = left + 1; right < states.length; right += 1) {
        minimum = Math.min(minimum, norm(subtract(states[left].position, states[right].position)));
      }
    }
  }
  return minimum;
}

function assertIndividualWorldlineSemantics(spec) {
  assert.equal(spec.geometry.representation, "individual-worldlines");
  assert.equal(spec.constituents.length, spec.worldlines.length);
  assert.equal(new Set(spec.constituents.map((row) => row.id)).size, spec.constituents.length);
  assert.equal(new Set(spec.constituents.map((row) => row.worldlineId)).size, spec.constituents.length);
  assert.equal(new Set(spec.worldlines.map((row) => row.id)).size, spec.worldlines.length);
  const constituentIds = new Set(spec.constituents.map((row) => row.id));
  const worldlinesById = new Map(spec.worldlines.map((row) => [row.id, row]));
  for (const constituent of spec.constituents) {
    assert.ok(constituent.polarity === 1 || constituent.polarity === -1);
    assert.equal(worldlinesById.get(constituent.worldlineId).constituentId, constituent.id);
  }
  for (const [name, relationships] of Object.entries(spec.relationships)) {
    if (name === "sourceOrder") {
      assert.deepEqual(new Set(relationships), constituentIds);
    } else if (name === "permutations") {
      for (const row of relationships) {
        Object.entries(row.mapping).forEach(([from, to]) => {
          assert.ok(constituentIds.has(from));
          assert.ok(constituentIds.has(to));
        });
      }
    } else if (Array.isArray(relationships)) {
      relationships.forEach((row) => row.members?.forEach((id) => assert.ok(constituentIds.has(id))));
    }
  }
  assert.equal(spec.constraints.speedGuard.normalizedFieldSpeed, FIELD_SPEED);
  assert.equal(spec.constraints.speedGuard.maximumExclusive, FIELD_SPEED);
  assert.equal(spec.claimGrade, "chart-hypothesis");
  assert.equal(spec.evidenceStatus, "display-only");
  assert.ok(spec.display);
  assert.ok(spec.history);
}

test("SD3 independently conforms to the exact centered five-coordinate owner", () => {
  const input = SD3_SPEC.geometry.reconstruction.input;
  const owner = sd3OwnerMap(input);
  const materialized = materializePrescribedAssemblySpec(SD3_SPEC);

  assert.equal(materialized.worldlines.length, 6);
  assert.equal(materialized.worldlines.filter((row) => row.constituent.polarity === 1).length, 3);
  assert.equal(materialized.worldlines.filter((row) => row.constituent.polarity === -1).length, 3);
  assert.equal(SD3_SPEC.relationships.neutralPairs.length, 3);
  SD3_SPEC.relationships.neutralPairs.forEach((pair, moduleIndex) => {
    assert.deepEqual(pair.members, [
      `sd3-module-${moduleIndex + 1}-positrino`,
      `sd3-module-${moduleIndex + 1}-electrino`,
    ]);
  });

  for (const time of [SD3_SPEC.history.start, -0.37, 0, SD3_SPEC.history.end]) {
    materialized.worldlines.forEach((row) => {
      const { moduleIndex } = row.constituent.metadata;
      const expected = sd3MemberAtTime(
        owner.members.find((member) => member.moduleIndex === moduleIndex
          && member.polarity === row.constituent.polarity),
        time,
      );
      const actual = evaluateMaterializedWorldline(row, time);
      vectorNear(actual.position, expected.position);
      vectorNear(actual.velocity, expected.velocity);
    });
  }

  const positionRows = materializedStates(SD3_SPEC, 0).map((row) => ({ ...row, value: row.position }));
  const velocityRows = materializedStates(SD3_SPEC, 0).map((row) => ({ ...row, value: row.velocity }));
  const recovered = recoverSd3Coordinates(owner, positionRows, velocityRows);
  vectorNear(recovered.coordinates, input.coordinates);
  vectorNear(recovered.rates, input.rates);

  const cyclicAxis = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
  near(dot(scale(add(owner.representatives[1].position, owner.representatives[-1].position), 0.5), cyclicAxis), 0);
  near(dot(scale(add(owner.representatives[1].velocity, owner.representatives[-1].velocity), 0.5), cyclicAxis), 0);
  for (const time of [-1, 0, 0.5]) {
    const states = materializedStates(SD3_SPEC, time);
    vectorNear(mean(states.map((row) => row.position)), [0, 0, 0]);
    vectorNear(mean(states.map((row) => row.velocity)), [0, 0, 0]);
    for (const polarity of [1, -1]) {
      const sector = states.filter((row) => row.polarity === polarity).sort((a, b) => a.moduleIndex - b.moduleIndex);
      vectorNear(cyclicRotate(sector[0].position, 1), sector[1].position);
      vectorNear(cyclicRotate(sector[1].position, 1), sector[2].position);
      vectorNear(cyclicRotate(sector[2].position, 1), sector[0].position);
    }
  }
});

test("SD3 owner identities close the A2 locus, tangent metric, clearance, and speed guards", () => {
  const input = SD3_SPEC.geometry.reconstruction.input;
  const owner = sd3OwnerMap(input);
  const a2 = sd3OwnerMap({
    ...input,
    coordinates: [...input.coordinates.slice(0, 3), 0, 0],
    rates: [...input.rates.slice(0, 3), 0, 0],
  });
  for (let moduleIndex = 0; moduleIndex < 3; moduleIndex += 1) {
    const positive = a2.members.find((row) => row.moduleIndex === moduleIndex && row.polarity === 1);
    const negative = a2.members.find((row) => row.moduleIndex === moduleIndex && row.polarity === -1);
    vectorNear(negative.position, scale(positive.position, -1));
    vectorNear(negative.velocity, scale(positive.velocity, -1));
  }

  const columns = sd3TangentColumns(owner);
  const gram = columns.map((left) => columns.map((right) => dot(left, right)));
  gram.forEach((row, left) => row.forEach((value, right) => near(value, left === right ? 6 : 0)));
  assert.equal(gram.filter((row, index) => row[index] > 1e-12).length, 5);

  const minimumClearance = exactLinearMinimumClearance(
    owner.members,
    SD3_SPEC.history.start,
    SD3_SPEC.history.end,
  );
  assert.ok(minimumClearance >= SD3_SPEC.constraints.collisionGuard.minimumSampledClearance);
  assert.ok(Math.max(...owner.members.map((row) => norm(row.velocity))) < FIELD_SPEED);
  assert.equal(SD3_SPEC.geometry.reconstruction.removedGauge.value, 0);
  assert.equal(SD3_SPEC.geometry.reconstruction.removedGauge.rate, 0);
  assert.deepEqual(SD3_SPEC.geometry.assemblyPlacement.centerAtEpoch, [0, 0, 0]);
  assert.deepEqual(SD3_SPEC.geometry.assemblyPlacement.velocity, [0, 0, 0]);
});

test("F6c independently conforms to the exact 4:4 six-coordinate member map", () => {
  const materialized = materializePrescribedAssemblySpec(F6C_SPEC);
  assert.equal(materialized.worldlines.length, 8);
  assert.equal(materialized.worldlines.filter((row) => row.constituent.polarity === 1).length, 4);
  assert.equal(materialized.worldlines.filter((row) => row.constituent.polarity === -1).length, 4);
  assert.deepEqual(
    F6C_SPEC.relationships.polaritySectors.map((row) => [row.polarity, row.members.length]),
    [[1, 4], [-1, 4]],
  );
  assert.equal(F6C_SPEC.relationships.neutralPairs.length, 0);
  assert.deepEqual(F6C_SPEC.geometry.frameProvenance[0].frameDefinition.axes, F6_AXES);
  for (const row of materialized.worldlines) {
    const { moduleIndex } = row.constituent.metadata;
    assert.equal(row.operator.circulationSign, F6_CIRCULATION_SIGNS[moduleIndex]);
    near(row.operator.phaseOffset, F6_PHASE_OFFSETS[moduleIndex]);
    assert.equal(row.operator.phase.rate, 1);
    assert.equal(row.operator.phase.modulationAmplitude, 0);
  }

  for (const time of [0, 0.19, Math.PI / 2, Math.PI, 1.73 * Math.PI, TWO_PI]) {
    materialized.worldlines.forEach((row) => {
      const expected = f6cOwnerState(
        row.constituent.metadata.moduleIndex,
        row.constituent.polarity,
        time,
      );
      const actual = evaluateMaterializedWorldline(row, time);
      vectorNear(actual.position, expected.position);
      vectorNear(actual.velocity, expected.velocity);
      near(norm(subtract(actual.position, expected.trackCenter)), expected.rho);
      assert.ok(norm(subtract(actual.position, expected.trackCenter)) > 0);
    });

    const states = materializedStates(F6C_SPEC, time);
    for (const polarity of [1, -1]) {
      const sector = states.filter((row) => row.polarity === polarity);
      vectorNear(mean(sector.map((row) => row.position)), [0, 0, 0]);
      vectorNear(mean(sector.map((row) => row.velocity)), [0, 0, 0]);
      const coordinates = f6cSectorCoordinates(polarity, time);
      sector.forEach((row) => {
        const { transverseU, transverseV } = f6Frame(row.moduleIndex);
        const offset = subtract(row.position, scale(F6_AXES[row.moduleIndex], polarity * coordinates.h));
        const memberAngle = Math.atan2(dot(offset, transverseV), dot(offset, transverseU));
        const expectedAngle = polarity * F6_CIRCULATION_SIGNS[row.moduleIndex] * coordinates.theta
          + F6_PHASE_OFFSETS[row.moduleIndex];
        near(polarity * dot(row.position, F6_AXES[row.moduleIndex]), coordinates.h);
        near(norm(offset), coordinates.rho);
        angleNear(memberAngle, expectedAngle);
      });
    }
  }

  const start = materializedStates(F6C_SPEC, 0);
  const end = materializedStates(F6C_SPEC, TWO_PI);
  start.forEach((row, index) => {
    vectorNear(end[index].position, row.position);
    vectorNear(end[index].velocity, row.velocity);
  });
  assert.equal(F6C_SPEC.history.periodic, true);
  near(F6C_SPEC.history.returnPeriod, TWO_PI);
});

test("F6c owner symmetry, sampled clearance, and sector speed bounds remain exact", () => {
  for (const time of [0, 0.31, 1.2, Math.PI, 5.91]) {
    const states = materializedStates(F6C_SPEC, time);
    for (const row of states) {
      const target = states.find((candidate) => candidate.polarity === row.polarity
        && candidate.moduleIndex === F6_ORDER_FOUR_MODULE_MAP[row.moduleIndex]);
      vectorNear(matrixVector(F6_ORDER_FOUR, row.position), target.position);
      vectorNear(matrixVector(F6_ORDER_FOUR, row.velocity), target.velocity);
    }
  }
  let power = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let count = 0; count < 4; count += 1) {
    power = power.map((row) => [0, 1, 2].map((column) =>
      row.reduce((sum, value, index) => sum + value * F6_ORDER_FOUR[index][column], 0)));
  }
  assert.deepEqual(power, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

  const minimum = minimumSampledClearance(
    (time) => F6_AXES.flatMap((_, moduleIndex) => [1, -1]
      .map((polarity) => f6cOwnerState(moduleIndex, polarity, time))),
    F6C_SPEC.constraints.collisionGuard.sampleCount,
  );
  assert.ok(minimum >= F6C_SPEC.constraints.collisionGuard.minimumSampledClearance);
  for (let sample = 0; sample <= 4096; sample += 1) {
    const time = TWO_PI * sample / 4096;
    for (const polarity of [1, -1]) {
      const coordinates = f6cSectorCoordinates(polarity, time);
      const expectedSpeed = Math.hypot(
        coordinates.hDot,
        coordinates.rhoDot,
        coordinates.rho * coordinates.thetaDot,
      );
      assert.ok(expectedSpeed < FIELD_SPEED);
      for (let moduleIndex = 0; moduleIndex < 4; moduleIndex += 1) {
        near(norm(f6cOwnerState(moduleIndex, polarity, time).velocity), expectedSpeed);
      }
    }
  }
});

test("F6b independently conforms to the exact rejected circular realization", () => {
  const materialized = materializePrescribedAssemblySpec(F6B_SPEC);
  assert.equal(materialized.worldlines.length, 8);
  assert.equal(materialized.worldlines.filter((row) => row.constituent.polarity === 1).length, 4);
  assert.equal(materialized.worldlines.filter((row) => row.constituent.polarity === -1).length, 4);
  assert.deepEqual(F6B_SPEC.geometry.reconstruction.axes, F6_AXES);
  assert.deepEqual(F6B_SPEC.geometry.reconstruction.circulationSigns, F6_CIRCULATION_SIGNS);
  assert.deepEqual(F6B_SPEC.geometry.reconstruction.phaseOffsets, F6_PHASE_OFFSETS);
  assert.equal(F6B_SPEC.geometry.reconstruction.axialScale, 0.3);
  assert.equal(F6B_SPEC.geometry.reconstruction.transverseRadius, 0.3);
  for (const row of materialized.worldlines) {
    const { moduleIndex } = row.constituent.metadata;
    assert.equal(
      row.operator.angularVelocity,
      row.constituent.polarity * F6_CIRCULATION_SIGNS[moduleIndex],
    );
    near(row.operator.phaseAtEpoch, F6_PHASE_OFFSETS[moduleIndex]);
    vectorNear(row.operator.centerAtEpoch, scale(F6_AXES[moduleIndex], row.constituent.polarity * 0.3));
  }

  for (const time of [0, 0.23, Math.PI / 3, Math.PI, 11 * Math.PI / 6, TWO_PI]) {
    materialized.worldlines.forEach((row) => {
      const expected = f6bOwnerState(
        row.constituent.metadata.moduleIndex,
        row.constituent.polarity,
        time,
      );
      const actual = evaluateMaterializedWorldline(row, time);
      vectorNear(actual.position, expected.position);
      vectorNear(actual.velocity, expected.velocity);
      near(norm(actual.velocity), 0.3);
      assert.ok(norm(actual.velocity) < FIELD_SPEED);
    });
    const states = materializedStates(F6B_SPEC, time);
    for (const polarity of [1, -1]) {
      const sector = states.filter((row) => row.polarity === polarity);
      vectorNear(mean(sector.map((row) => row.position)), [0, 0, 0]);
      vectorNear(mean(sector.map((row) => row.velocity)), [0, 0, 0]);
    }
    vectorNear(mean(states.map((row) => row.position)), [0, 0, 0]);
  }
});

test("F6b exact clearance and fail-closed status preserve the scoped-negative result", () => {
  const exactClearance = Math.sqrt((9 - 6 * Math.SQRT2) / 50);
  const sampledClearance = minimumSampledClearance(
    (time) => F6_AXES.flatMap((_, moduleIndex) => [1, -1]
      .map((polarity) => f6bOwnerState(moduleIndex, polarity, time))),
    24576,
  );
  near(sampledClearance, exactClearance, 2e-11);
  assert.ok(exactClearance >= F6B_SPEC.constraints.collisionGuard.minimumSampledClearance);
  assert.equal(F6B_SPEC.identity.status, "scoped-negative-reproducibility-control");
  assert.equal(F6B_SPEC.geometry.reconstruction.operator, "f6b-fixed-circular.v1");
  assert.ok(F6B_SPEC.worldlines.every((row) => row.operator.kind === "moving-circular.v1"));
  assert.ok(!F6B_SPEC.worldlines.some((row) => row.operator.kind === "f6c-harmonic-member.v1"));
  assert.match(F6B_SPEC.provenanceDescription, /member-acceleration residual rejected/);

  assert.equal(
    ACTIVE_PRESCRIBED_BRAID_TARGETS.some((row) => row.specPath.endsWith("f6b-scoped-negative-circular.v2.json")),
    false,
  );
  assert.equal(
    DEPRECATED_PRESCRIBED_BRAID_TARGETS.some((row) => row.specPath.endsWith("f6b-scoped-negative-circular.v2.json")),
    true,
  );
  const catalogEntry = BORG_BRAID_RECORD_CATALOG.entries.find((row) => row.familyId === "F6b");
  assert.ok(catalogEntry);
  assert.match(catalogEntry.label, /scoped-negative circular realization/);
});

test("the three cases preserve explicit individual-worldline and fail-closed metadata", () => {
  for (const [spec, recordName] of [
    [SD3_SPEC, "sd3-centered-five-coordinate.assembly-view-record.v0.json"],
    [F6C_SPEC, "f6c-polarity-resolved-harmonic.assembly-view-record.v0.json"],
    [F6B_SPEC, "f6b-scoped-negative-circular.assembly-view-record.v0.json"],
  ]) {
    assertIndividualWorldlineSemantics(spec);
    const record = JSON.parse(readFileSync(new URL(`../content/assets/borg/records/${recordName}`, import.meta.url), "utf8"));
    assert.equal(record.provenance.engineId, "prescribed-geometry");
    assert.equal(record.provenance.claimGrade, "chart-hypothesis");
    assert.equal(record.provenance.evidenceStatus, "display-only");
    assert.equal(record.provenance.prescribedGeometry.sourceSchema, "prescribed-assembly-spec.v2");
    assert.equal(record.provenance.prescribedGeometry.evaluatorId, "prescribed-assembly-evaluator.v2");
    assert.equal(record.provenance.prescribedGeometry.physicsInvoked, false);
  }
  assert.equal(SD3_SPEC.constituents.length, 6);
  assert.equal(F6C_SPEC.constituents.length, 8);
  assert.equal(F6C_SPEC.relationships.neutralPairs.length, 0);
  assert.equal(F6B_SPEC.relationships.neutralPairs.length, 0);
});

test("the F1-F6 readiness map gives every required field a closed status and every missing field a closure row", () => {
  const markdown = readFileSync(READINESS_MATRIX_URL, "utf8");
  const fieldNames = [
    "Inventory",
    "Identity",
    "Polarity",
    "Relationships",
    "Source order",
    "Coordinates",
    "Gauge",
    "Reconstruction",
    "Velocity",
    "History",
    "Path operator",
    "Parameters",
    "Symmetry",
    "Periodicity",
    "Centering",
    "Collision",
    "Speed",
    "Claim boundary",
    "Display choice",
  ];
  const candidates = ["F1", "F2", "F3", "F4", "F5", "F6"];
  const allowedStatus = /^`(?:declared|derived|guessed|missing|not applicable|owned by concrete continuation)`/;
  const fieldSection = markdown
    .split("### Missing-Field Closure Ledger")[0]
    .split("## F1–F6 Field Completeness")[1];
  const fieldRows = fieldSection.split("\n")
    .filter((line) => fieldNames.some((field) => line.startsWith(`| ${field} |`)));
  assert.equal(fieldRows.length, fieldNames.length);

  const missing = [];
  fieldRows.forEach((line, fieldIndex) => {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    assert.equal(cells[0], fieldNames[fieldIndex]);
    assert.equal(cells.length, candidates.length + 1);
    cells.slice(1).forEach((cell, candidateIndex) => {
      assert.match(cell, allowedStatus);
      if (cell.startsWith("`missing`")) missing.push([candidates[candidateIndex], cells[0]]);
    });
  });

  const closureLedger = markdown
    .split("### Missing-Field Closure Ledger")[1]
    .split("Plainly: these are representation debts")[0];
  assert.equal(missing.length, 27);
  assert.ok(!missing.some(([candidate, field]) => candidate === "F1" && field === "Gauge"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F1" && field === "Reconstruction"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F1" && field === "Velocity"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F1" && field === "Centering"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F1" && field === "Speed"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F1" && field === "Collision"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F2" && field === "Gauge"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F2" && field === "Reconstruction"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F2" && field === "Velocity"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F2" && field === "Collision"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F2" && field === "Speed"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F3" && field === "Gauge"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F3" && field === "Reconstruction"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F3" && field === "Velocity"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F3" && field === "Centering"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F3" && field === "Speed"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F3" && field === "Collision"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Inventory"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Polarity"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Gauge"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Reconstruction"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Velocity"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Centering"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Speed"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F4" && field === "Collision"));
  assert.ok(!missing.some(([candidate, field]) => candidate === "F5" && field === "Gauge"));
  const coordinateCells = fieldRows.find((line) => line.startsWith("| Coordinates |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(coordinateCells[2].startsWith("`derived`"));
  assert.ok(coordinateCells[3].startsWith("`derived`"));
  assert.ok(coordinateCells[4].startsWith("`derived`"));
  assert.ok(coordinateCells[5].startsWith("`derived`"));
  const gaugeCells = fieldRows.find((line) => line.startsWith("| Gauge |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(gaugeCells[5].startsWith("`derived`"));
  const reconstructionCells = fieldRows.find((line) => line.startsWith("| Reconstruction |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(reconstructionCells[5].startsWith("`derived`"));
  const velocityCells = fieldRows.find((line) => line.startsWith("| Velocity |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(velocityCells[5].startsWith("`derived`"));
  const centeringCells = fieldRows.find((line) => line.startsWith("| Centering |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(centeringCells[2].startsWith("`derived`"));
  assert.ok(centeringCells[3].startsWith("`derived`"));
  assert.ok(centeringCells[4].startsWith("`derived`"));
  const speedCells = fieldRows.find((line) => line.startsWith("| Speed |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(speedCells[2].startsWith("`derived`"));
  assert.ok(speedCells[3].startsWith("`derived`"));
  assert.ok(speedCells[4].startsWith("`derived`"));
  assert.ok(speedCells[5].startsWith("`derived`"));
  const collisionCells = fieldRows.find((line) => line.startsWith("| Collision |"))
    .split("|").slice(1, -1).map((cell) => cell.trim());
  assert.ok(collisionCells[2].startsWith("`derived`"));
  assert.ok(collisionCells[3].startsWith("`derived`"));
  assert.ok(collisionCells[4].startsWith("`derived`"));
  assert.ok(collisionCells[5].startsWith("`derived`"));
  missing.forEach(([candidate, field]) => {
    assert.ok(
      closureLedger.includes(`| ${candidate} | ${field} |`),
      `${candidate} ${field} requires a closure-ledger row`,
    );
  });
});
