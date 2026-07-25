import test from "node:test";
import assert from "node:assert/strict";

import {
  reducePointwiseSummedAccelerationNecessaryCondition,
} from "../src/prescribed-path-analysis/index.mjs";

function certifiedReduction(receivers) {
  return {
    accelerationInventoryCertification: {
      schema:
        "prescribed-path-analysis/declared-isolated-acceleration-inventory-certificate.v1",
      complete: true,
      status: "certified",
      scope:
        "all retained canonical-kernel contributions from the declared isolated architrino-worldline inventory",
    },
    receivers,
  };
}

function receiver(transmitterId, events) {
  return {
    transmitterId,
    events: events.map((event, eventIndex) => ({
      eventId: `${transmitterId}-${eventIndex}`,
      observationTime: event.observationTime,
      netAccelerationFromOtherSources: event.evaluated,
      prescribedPathAcceleration: event.prescribed,
    })),
  };
}

test("pointwise summed-acceleration reducer matches a hand-summed falsifying ledger", () => {
  const reduction = certifiedReduction([
    receiver("a", [
      {
        observationTime: 4,
        evaluated: { x: 1, y: 0, z: 0 },
        prescribed: { x: 2, y: 0, z: 0 },
      },
      {
        observationTime: 5,
        evaluated: { x: 0.1, y: 0, z: 0 },
        prescribed: { x: 0, y: 3, z: 0 },
      },
    ]),
    receiver("b", [
      {
        observationTime: 4,
        evaluated: { x: -0.75, y: 0, z: 0 },
        prescribed: { x: -2, y: 0, z: 0 },
      },
      {
        observationTime: 5,
        evaluated: { x: -0.1, y: 0, z: 0 },
        prescribed: { x: 0, y: -3, z: 0 },
      },
    ]),
  ]);

  const result = reducePointwiseSummedAccelerationNecessaryCondition(reduction, {
    absoluteTolerance: 0.01,
    numericalConvergenceBound: 0.005,
  });

  assert.equal(result.status, "evaluated-falsification-only");
  assert.equal(result.outcome, "falsified-exact-isolated-prescribed-history");
  assert.equal(result.falsifiedAsExactIsolatedPrescribedHistory, true);
  assert.equal(result.adjudicationThreshold, 0.02);
  assert.deepEqual(result.rows[0].summedEvaluatedAcceleration, {
    x: 0.25,
    y: 0,
    z: 0,
  });
  assert.deepEqual(result.rows[0].summedPrescribedAcceleration, {
    x: 0,
    y: 0,
    z: 0,
  });
  assert.deepEqual(result.rows[0].summedEquationResidual, {
    x: -0.25,
    y: 0,
    z: 0,
  });
  assert.equal(result.summary.maximumSummedEvaluatedAccelerationNorm, 0.25);
  assert.equal(result.summary.maximumSummedPrescribedAccelerationNorm, 0);
  assert.equal(result.sufficientConditionClaim, false);
  assert.equal(result.branchExistenceClaim, false);
  assert.equal(result.taxonomyClaim, false);
});

test("pointwise screen reports only non-falsification when every hand sum vanishes", () => {
  const reduction = certifiedReduction([
    receiver("a", [{
      observationTime: 4,
      evaluated: { x: 2, y: -1, z: 0.5 },
      prescribed: { x: 3, y: 4, z: 5 },
    }]),
    receiver("b", [{
      observationTime: 4,
      evaluated: { x: -2, y: 1, z: -0.5 },
      prescribed: { x: -3, y: -4, z: -5 },
    }]),
  ]);

  const result = reducePointwiseSummedAccelerationNecessaryCondition(reduction, {
    absoluteTolerance: 1e-12,
  });

  assert.equal(result.status, "evaluated-falsification-only");
  assert.equal(result.outcome, "not-falsified-by-this-screen");
  assert.equal(result.falsifiedAsExactIsolatedPrescribedHistory, false);
  assert.equal(result.summary.maximumSummedEvaluatedAccelerationNorm, 0);
  assert.match(result.interpretation, /establishes no branch, taxonomy, stability/);
});

test("pointwise screen fails closed without a complete acceleration inventory", () => {
  const result = reducePointwiseSummedAccelerationNecessaryCondition({
    accelerationInventoryCertification: {
      complete: false,
      status: "not-certified",
      reasons: ["same-source self-hit acceleration is not certified absent"],
    },
    receivers: [
      receiver("a", [{
        observationTime: 4,
        evaluated: { x: 100, y: 0, z: 0 },
        prescribed: { x: 0, y: 0, z: 0 },
      }]),
    ],
  }, {
    absoluteTolerance: 1e-12,
  });

  assert.equal(result.status, "inapplicable-incomplete-acceleration-inventory");
  assert.equal(result.outcome, "not-evaluated");
  assert.equal(result.falsifiedAsExactIsolatedPrescribedHistory, null);
  assert.deepEqual(result.rows, []);
  assert.equal(result.summary, null);
});

test("zero-sum screen is inapplicable when prescribed accelerations do not cancel", () => {
  const result = reducePointwiseSummedAccelerationNecessaryCondition(
    certifiedReduction([
      receiver("a", [{
        observationTime: 4,
        evaluated: { x: 1, y: 0, z: 0 },
        prescribed: { x: 1, y: 0, z: 0 },
      }]),
    ]),
    { absoluteTolerance: 1e-12 },
  );

  assert.equal(result.status, "inapplicable-nonzero-prescribed-acceleration-sum");
  assert.equal(result.outcome, "not-evaluated");
  assert.equal(result.falsifiedAsExactIsolatedPrescribedHistory, null);
});

test("pointwise screen rejects mismatched receiver time grids", () => {
  const reduction = certifiedReduction([
    receiver("a", [{
      observationTime: 4,
      evaluated: { x: 0, y: 0, z: 0 },
      prescribed: { x: 0, y: 0, z: 0 },
    }]),
    receiver("b", [{
      observationTime: 4.5,
      evaluated: { x: 0, y: 0, z: 0 },
      prescribed: { x: 0, y: 0, z: 0 },
    }]),
  ]);

  assert.throws(
    () => reducePointwiseSummedAccelerationNecessaryCondition(reduction, {
      absoluteTolerance: 1e-12,
    }),
    /receiver observation times differ/,
  );
});
