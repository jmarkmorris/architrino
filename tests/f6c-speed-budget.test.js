import assert from "node:assert/strict";
import test from "node:test";
import {
  f6cAssemblyCurrentDecomposition,
  f6cSectorCurrentFlow,
} from
  "../scripts/mapping-electromagnetism/f6c-current-transport.mjs";
import {
  f6cCurrentCorridorDecomposition,
  f6cPairDistanceRateRow,
  minimumMaximumSectorSpeedTwoConstraintSolution,
} from "../scripts/mapping-electromagnetism/f6c-linear-constraint-geometry.mjs";

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

function norm(value) {
  return Math.hypot(...value);
}

function scale(value, scalar) {
  return value.map((entry) => entry * scalar);
}

function add(...values) {
  return values[0].map((_, index) =>
    values.reduce((sum, value) => sum + value[index], 0));
}

function unit(value) {
  return scale(value, 1 / norm(value));
}

test("F6c axial, radial, and tangential rates exhaust member speed", () => {
  const axes = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ].map(unit);
  const circulationSigns = [-1, -1, 1, 1];
  const phaseOffsets = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];
  const state = {
    h: 0.24565108958955967,
    rho: 0.26756171193022543,
    theta: 1.816439700604808,
    hDot: -0.2517387334775506,
    rhoDot: 0.0025402349289753642,
    thetaDot: 3.6161724473788874,
  };
  const expectedSquaredSpeed = state.hDot ** 2
    + state.rhoDot ** 2
    + (state.rho * state.thetaDot) ** 2;

  for (const polarity of [1, -1]) {
    let measuredCurrent = [0, 0, 0];
    for (let module = 0; module < axes.length; module += 1) {
      const axis = axes[module];
      const localU = unit(cross([0, 0, 1], axis));
      const localV = cross(axis, localU);
      const phase = polarity * circulationSigns[module] * state.theta
        + phaseOffsets[module];
      const radial = add(
        scale(localU, Math.cos(phase)),
        scale(localV, Math.sin(phase)),
      );
      const tangent = cross(axis, radial);
      const position = add(
        scale(axis, polarity * state.h),
        scale(radial, state.rho),
      );
      const velocity = add(
        scale(axis, polarity * state.hDot),
        scale(radial, state.rhoDot),
        scale(
          tangent,
          state.rho * polarity * circulationSigns[module] * state.thetaDot,
        ),
      );
      assert.ok(Math.abs(dot(axis, radial)) < 2e-15);
      assert.ok(Math.abs(dot(axis, tangent)) < 2e-15);
      assert.ok(Math.abs(dot(radial, tangent)) < 2e-15);
      assert.ok(Math.abs(norm(velocity) ** 2 - expectedSquaredSpeed) < 2e-15);
      measuredCurrent = add(
        measuredCurrent,
        scale(cross(position, velocity), polarity),
      );
    }
    const angle = state.theta + (polarity > 0 ? Math.PI / 6 : Math.PI / 3);
    const coefficient = polarity > 0
      ? [
        -Math.sqrt(6) * state.rho * Math.sin(angle),
        Math.sqrt(6) * state.h * Math.sin(angle),
        Math.sqrt(6) * state.h * Math.cos(angle) + Math.sqrt(3) * state.rho,
      ]
      : [
        Math.sqrt(6) * state.rho * Math.cos(angle),
        -Math.sqrt(6) * state.h * Math.cos(angle),
        Math.sqrt(6) * state.h * Math.sin(angle) - Math.sqrt(3) * state.rho,
      ];
    const rates = [state.hDot, state.rhoDot, state.rho * state.thetaDot];
    const predictedCurrentX = (polarity > 0 ? -4 / 3 : 4 / 3)
      * dot(coefficient, rates);
    assert.ok(Math.abs(measuredCurrent[0] - predictedCurrentX) < 3e-15);
    assert.ok(Math.abs(measuredCurrent[1]) < 3e-15);
    assert.ok(Math.abs(measuredCurrent[2]) < 3e-15);
    assert.ok(
      Math.abs(predictedCurrentX)
        <= (4 / 3) * norm(coefficient) * Math.sqrt(expectedSquaredSpeed)
          + 2e-15,
    );
  }
});

test("F6c sector-current flow matches a direct member finite difference", () => {
  const axes = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ].map(unit);
  const circulationSigns = [-1, -1, 1, 1];
  const phaseOffsets = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];
  const initial = {
    h: 0.2376,
    rho: 0.3109090909090909,
    theta: Math.PI / 2,
    hDot: -0.031,
    rhoDot: 0.027,
    thetaDot: 1.25,
  };
  const acceleration = {
    hDDot: -0.6850128139628605,
    rhoDDot: 0.7252642445150421,
    thetaDDot: -3.176718773315335,
  };

  function stateAt(time) {
    return {
      h: initial.h + initial.hDot * time
        + 0.5 * acceleration.hDDot * time ** 2,
      rho: initial.rho + initial.rhoDot * time
        + 0.5 * acceleration.rhoDDot * time ** 2,
      theta: initial.theta + initial.thetaDot * time
        + 0.5 * acceleration.thetaDDot * time ** 2,
      hDot: initial.hDot + acceleration.hDDot * time,
      rhoDot: initial.rhoDot + acceleration.rhoDDot * time,
      thetaDot: initial.thetaDot + acceleration.thetaDDot * time,
    };
  }

  function directSectorCurrentX(sectorName, state) {
    const polarity = sectorName === "positive" ? 1 : -1;
    let current = [0, 0, 0];
    for (let module = 0; module < axes.length; module += 1) {
      const axis = axes[module];
      const localU = unit(cross([0, 0, 1], axis));
      const localV = cross(axis, localU);
      const phase = polarity * circulationSigns[module] * state.theta
        + phaseOffsets[module];
      const radial = add(
        scale(localU, Math.cos(phase)),
        scale(localV, Math.sin(phase)),
      );
      const tangent = cross(axis, radial);
      const position = add(
        scale(axis, polarity * state.h),
        scale(radial, state.rho),
      );
      const velocity = add(
        scale(axis, polarity * state.hDot),
        scale(radial, state.rhoDot),
        scale(
          tangent,
          state.rho * polarity * circulationSigns[module] * state.thetaDot,
        ),
      );
      current = add(current, scale(cross(position, velocity), polarity));
    }
    assert.ok(Math.abs(current[1]) < 3e-15);
    assert.ok(Math.abs(current[2]) < 3e-15);
    return current[0];
  }

  for (const sectorName of ["positive", "negative"]) {
    const flow = f6cSectorCurrentFlow(sectorName, initial, acceleration);
    assert.ok(
      Math.abs(flow.current - directSectorCurrentX(sectorName, initial))
        < 3e-15,
    );
    const epsilon = 1e-6;
    const finiteDifference = (
      directSectorCurrentX(sectorName, stateAt(epsilon))
      - directSectorCurrentX(sectorName, stateAt(-epsilon))
    ) / (2 * epsilon);
    assert.ok(Math.abs(flow.currentDerivative - finiteDifference) < 2e-9);
  }
});

test("F6c assembly current splits into minimum-norm carrier and neutral motion", () => {
  const sectors = {
    positive: {
      h: 0.238300684736791,
      rho: 0.3107865935774841,
      theta: 1.7207963267948967,
      hDot: 0.011656174332940772,
      rhoDot: -0.002037792715549049,
      thetaDot: 1.25,
    },
    negative: {
      h: 0.38475180668023223,
      rho: 0.2908728823575135,
      theta: -3.0661255787892263,
      hDot: -0.016011228479314254,
      rhoDot: 0.0017242861439262132,
      thetaDot: 1.25,
    },
  };
  const result = f6cAssemblyCurrentDecomposition(sectors);

  assert.ok(Math.abs(result.current + 0.7282149803924783) < 1e-14);
  assert.ok(Math.abs(result.orthogonalityResidual) < 1e-14);
  assert.ok(Math.abs(result.pythagoreanResidual) < 1e-14);
  assert.ok(Math.abs(
    dot(result.currentRow, result.minimumNormCarrier) - result.current,
  ) < 1e-14);
  assert.ok(Math.abs(
    dot(result.currentRow, result.currentNeutralResidual),
  ) < 1e-14);
  assert.ok(result.minimumRateNormForCurrent <= result.rateNorm);
  assert.ok(result.currentEfficiency >= 0 && result.currentEfficiency <= 1);
});

test("F6c current and pair opening leave a four-dimensional neutral rate space", () => {
  const sectors = {
    positive: {
      h: 0.238300684736791,
      rho: 0.3107865935774841,
      theta: 1.7207963267948967,
      hDot: 0.011656174332940772,
      rhoDot: -0.002037792715549049,
      thetaDot: 1.25,
    },
    negative: {
      h: 0.38475180668023223,
      rho: 0.2908728823575135,
      theta: -3.0661255787892263,
      hDot: -0.016011228479314254,
      rhoDot: 0.0017242861439262132,
      thetaDot: 1.25,
    },
  };
  const pairIds = ["0-", "2+"];
  const corridor = f6cPairDistanceRateRow(sectors, pairIds);
  const current = f6cAssemblyCurrentDecomposition(sectors);
  assert.ok(Math.abs(corridor.distance - 0.41942074655982103) < 1e-14);
  assert.ok(Math.abs(
    dot(corridor.row, current.rateVector) - 0.19597583352017495,
  ) < 1e-14);

  const decomposition = f6cCurrentCorridorDecomposition(
    sectors,
    pairIds,
    current.current,
    0.19597583352017495,
  );
  assert.ok(Math.max(
    ...decomposition.constrainedCarrier.constraintResiduals.map(Math.abs),
  ) < 1e-14);
  assert.ok(Math.max(
    ...decomposition.jointNeutralConstraintResiduals.map(Math.abs),
  ) < 1e-14);
  assert.ok(Math.abs(decomposition.pythagoreanResidual) < 1e-14);
  assert.ok(decomposition.constrainedCarrier.norm <= current.rateNorm);

  const minimax = minimumMaximumSectorSpeedTwoConstraintSolution(
    current.currentRow,
    current.current,
    corridor.row,
    0.19597583352017495,
  );
  assert.ok(Math.max(...minimax.constraintResiduals.map(Math.abs)) < 1e-13);
  assert.ok(Math.abs(minimax.sectorSpeeds[0] - minimax.sectorSpeeds[1]) < 1e-13);
  assert.ok(
    minimax.maximumSectorMemberSpeed
      <= decomposition.constrainedCarrier.maximumSectorMemberSpeed,
  );
});
