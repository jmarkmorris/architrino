import assert from "node:assert/strict";
import test from "node:test";

// This checker is authored directly from the displayed F5 mathematics. It does
// not import a prescribed-worldline operator, geometry constructor, or fixture.

const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const rho1 = 0.30;
const rho2 = 0.22;
const h = 0.31;
const omega = 0.4;
const period = 2 * Math.PI / omega;
const sectors = [
  { sigma: 1, amplitude: 0.24, phase: 0.1, eta: [1, -1, 1] },
  { sigma: -1, amplitude: 0.27, phase: -0.3, eta: [-1, 1, -1] },
];

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => scalar * value);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function coordinateRow(time, sector) {
  const theta = omega * time + sector.phase;
  const phases = [theta, theta - 2 * Math.PI / 3, theta + 2 * Math.PI / 3];
  const [u, v, w] = phases.map((phase) => sector.amplitude * Math.cos(phase));
  const [uDot, vDot, wDot] = phases.map((phase) => -sector.amplitude * omega * Math.sin(phase));
  return { u, v, w, uDot, vDot, wDot };
}

function sectorState(time, sector) {
  const coordinates = coordinateRow(time, sector);
  const { u, v, w, uDot, vDot, wDot } = coordinates;
  const resultants = [[0, v, w], [u, 0, -w], [-u, -v, 0]];
  const resultantRates = [[0, vDot, wDot], [uDot, 0, -wDot], [-uDot, -vDot, 0]];
  const members = [];

  for (let axisIndex = 0; axisIndex < 3; axisIndex += 1) {
    const axis = axes[axisIndex];
    const resultant = resultants[axisIndex];
    const resultantRate = resultantRates[axisIndex];
    const kappa = norm(resultant);
    const e = scale(resultant, 1 / kappa);
    const kappaDot = dot(e, resultantRate);
    const eDot = scale(subtract(resultantRate, scale(e, kappaDot)), 1 / kappa);
    const tangent = cross(axis, e);
    const tangentDot = cross(axis, eDot);
    const alpha = (kappa ** 2 + rho1 ** 2 - rho2 ** 2) / (2 * kappa);
    const alphaDot = 0.5 * kappaDot
      - 0.5 * (rho1 ** 2 - rho2 ** 2) * kappaDot / kappa ** 2;
    const beta = Math.sqrt(rho1 ** 2 - alpha ** 2);
    const betaDot = -alpha * alphaDot / beta;
    const eta = sector.eta[axisIndex];
    const branchRate = add(scale(tangent, betaDot), scale(tangentDot, beta));
    const r1 = add(scale(e, alpha), scale(tangent, eta * beta));
    const r2 = subtract(scale(e, kappa - alpha), scale(tangent, eta * beta));
    const r1Dot = add(
      add(scale(e, alphaDot), scale(eDot, alpha)),
      scale(branchRate, eta),
    );
    const r2Dot = subtract(
      add(scale(e, kappaDot - alphaDot), scale(eDot, kappa - alpha)),
      scale(branchRate, eta),
    );
    members.push({
      axisIndex,
      ring: 1,
      kappa,
      transverse: r1,
      position: add(scale(axis, sector.sigma * h), r1),
      velocity: r1Dot,
    });
    members.push({
      axisIndex,
      ring: 2,
      kappa,
      transverse: r2,
      position: add(scale(axis, -sector.sigma * h), r2),
      velocity: r2Dot,
    });
  }

  return { coordinates, members };
}

test("F5 harmonic resultant history stays uniformly inside the revised chart", () => {
  const lower = Math.abs(rho1 - rho2);
  const upper = rho1 + rho2;
  for (const sector of sectors) {
    assert.ok(Math.sqrt(2) * lower < sector.amplitude);
    assert.ok(sector.amplitude < Math.sqrt(2 / 3) * upper);
  }

  let minimumKappa = Infinity;
  let maximumKappa = -Infinity;
  for (let sample = 0; sample <= 4096; sample += 1) {
    const time = period * sample / 4096;
    for (const sector of sectors) {
      const state = sectorState(time, sector);
      const { u, v, w } = state.coordinates;
      assert.ok(Math.abs(u ** 2 + v ** 2 + w ** 2 - 1.5 * sector.amplitude ** 2) < 2e-16);
      const centroid = scale(
        state.members.reduce((sum, member) => add(sum, member.position), [0, 0, 0]),
        1 / 6,
      );
      assert.ok(norm(centroid) < 5e-16);
      for (const member of state.members) {
        minimumKappa = Math.min(minimumKappa, member.kappa);
        maximumKappa = Math.max(maximumKappa, member.kappa);
        assert.ok(Math.abs(norm(member.transverse) - (member.ring === 1 ? rho1 : rho2)) < 5e-16);
      }
    }
  }
  assert.ok(minimumKappa > lower);
  assert.ok(maximumKappa < upper);
  assert.ok(Math.abs(minimumKappa - Math.min(...sectors.map(({ amplitude }) => amplitude / Math.sqrt(2)))) < 2e-6);
  assert.ok(Math.abs(maximumKappa - Math.max(...sectors.map(({ amplitude }) => amplitude * Math.sqrt(3 / 2)))) < 2e-6);
});

test("F5 history derivatives and labeled return agree with the revised tangent", () => {
  const differenceStep = 1e-6;
  let maximumDifferenceResidual = 0;
  let maximumReturnResidual = 0;
  let minimumAngularRate = Infinity;
  let maximumAngularRate = -Infinity;

  for (let sample = 0; sample <= 512; sample += 1) {
    const time = period * sample / 512;
    for (const sector of sectors) {
      const state = sectorState(time, sector);
      const earlier = sectorState(time - differenceStep, sector);
      const later = sectorState(time + differenceStep, sector);
      const returned = sectorState(time + period, sector);
      state.members.forEach((member, index) => {
        const finiteDifference = scale(
          subtract(later.members[index].position, earlier.members[index].position),
          1 / (2 * differenceStep),
        );
        maximumDifferenceResidual = Math.max(
          maximumDifferenceResidual,
          norm(subtract(finiteDifference, member.velocity)),
        );
        maximumReturnResidual = Math.max(
          maximumReturnResidual,
          norm(subtract(returned.members[index].position, member.position)),
          norm(subtract(returned.members[index].velocity, member.velocity)),
        );
        const angularRate = dot(
          axes[member.axisIndex],
          cross(member.transverse, member.velocity),
        ) / dot(member.transverse, member.transverse);
        minimumAngularRate = Math.min(minimumAngularRate, angularRate);
        maximumAngularRate = Math.max(maximumAngularRate, angularRate);
      });
    }
  }

  assert.ok(maximumDifferenceResidual < 2e-9);
  assert.ok(maximumReturnResidual < 2e-14);
  assert.ok(maximumAngularRate - minimumAngularRate > 0.1);
});
