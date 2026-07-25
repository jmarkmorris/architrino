import test from "node:test";
import assert from "node:assert/strict";

import {
  comparePointwiseMemberResidualSearchScreens,
  reducePointwiseMemberResidualSearchScreen,
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

function memberScreen(reduction, overrides = {}) {
  return reducePointwiseMemberResidualSearchScreen(reduction, {
    cycleStart: 4,
    period: 4,
    absoluteTolerance: 1e-12,
    numericalConvergenceBound: 0,
    ...overrides,
  });
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

test("member screen catches equal-and-opposite residuals hidden by the summed screen", () => {
  const reduction = certifiedReduction([
    receiver("a", [0, 1, 2, 3].map((offset) => ({
      observationTime: 4 + offset,
      evaluated: { x: 0, y: 0, z: 0 },
      prescribed: { x: 1, y: 0, z: 0 },
    }))),
    receiver("b", [0, 1, 2, 3].map((offset) => ({
      observationTime: 4 + offset,
      evaluated: { x: 0, y: 0, z: 0 },
      prescribed: { x: -1, y: 0, z: 0 },
    }))),
  ]);

  const summed = reducePointwiseSummedAccelerationNecessaryCondition(
    reduction,
    { absoluteTolerance: 1e-12 },
  );
  const members = memberScreen(reduction);

  assert.equal(summed.outcome, "not-falsified-by-this-screen");
  assert.equal(
    members.outcome,
    "falsified-exact-isolated-prescribed-history",
  );
  assert.equal(
    members.windows.fullCycle.maximumPointwiseMemberResidualNorm,
    1,
  );
  assert.equal(
    members.partitionIdentities.fullCyclePeakEqualsWorseHalfPeak,
    true,
  );
  assert.equal(
    members.partitionIdentities.fullCycleRmsEqualsWeightedHalfRms,
    true,
  );
  assert.equal(members.branchExistenceClaim, false);
  assert.equal(members.returnSymmetryClaim, false);
  assert.equal(members.taxonomyClaim, false);
});

test("one clean half cannot conceal a falsifying second half", () => {
  const reduction = certifiedReduction([
    receiver("a", [
      {
        observationTime: 4,
        evaluated: { x: 0, y: 0, z: 0 },
        prescribed: { x: 0, y: 0, z: 0 },
      },
      {
        observationTime: 5,
        evaluated: { x: 0, y: 0, z: 0 },
        prescribed: { x: 0, y: 0, z: 0 },
      },
      {
        observationTime: 6,
        evaluated: { x: 0, y: 0, z: 0 },
        prescribed: { x: 0.5, y: 0, z: 0 },
      },
      {
        observationTime: 7,
        evaluated: { x: 0, y: 0, z: 0 },
        prescribed: { x: 0.25, y: 0, z: 0 },
      },
    ]),
  ]);

  const result = memberScreen(reduction);

  assert.equal(
    result.windows.firstHalf.falsifiedAsExactIsolatedPrescribedHistory,
    false,
  );
  assert.equal(
    result.windows.secondHalf.falsifiedAsExactIsolatedPrescribedHistory,
    true,
  );
  assert.equal(result.falsifiedAsExactIsolatedPrescribedHistory, true);
  assert.equal(
    result.searchGuidance.worseHalfMaximumPointwiseMemberResidualNorm,
    result.searchGuidance.fullCycleMaximumPointwiseMemberResidualNorm,
  );
  assert.match(result.searchGuidance.interpretation, /One near-zero half is insufficient/);
});

test("member screen full-cycle metrics are invariant under a cyclic phase relabeling", () => {
  const values = [0.1, 0.2, 0.3, 0.4];
  const reduction = (orderedValues) => certifiedReduction([
    receiver("a", orderedValues.map((value, index) => ({
      observationTime: 4 + index,
      evaluated: { x: 0, y: 0, z: 0 },
      prescribed: { x: value, y: 0, z: 0 },
    }))),
  ]);

  const original = memberScreen(reduction(values));
  const shifted = memberScreen(reduction([0.3, 0.4, 0.1, 0.2]));

  assert.equal(
    original.windows.fullCycle.maximumPointwiseMemberResidualNorm,
    shifted.windows.fullCycle.maximumPointwiseMemberResidualNorm,
  );
  assert.equal(
    original.windows.fullCycle.rmsPointwiseMemberResidualNorm,
    shifted.windows.fullCycle.rmsPointwiseMemberResidualNorm,
  );
  assert.equal(
    original.searchGuidance.halfPeakImbalance,
    shifted.searchGuidance.halfPeakImbalance,
  );
});

test("member screen fails closed without a complete acceleration inventory", () => {
  const result = memberScreen({
    accelerationInventoryCertification: {
      complete: false,
      status: "not-certified",
    },
    receivers: [],
  });

  assert.equal(result.status, "inapplicable-incomplete-acceleration-inventory");
  assert.equal(result.falsifiedAsExactIsolatedPrescribedHistory, null);
  assert.equal(result.windows, null);
  assert.equal(result.searchGuidance, null);
});

test("member screen reports primary/refined near-zero movement without accepting it", () => {
  const reduction = (value) => certifiedReduction([
    receiver("a", [0, 1, 2, 3].map((offset) => ({
      observationTime: 4 + offset,
      evaluated: { x: 0, y: 0, z: 0 },
      prescribed: { x: value, y: 0, z: 0 },
    }))),
  ]);
  const primary = memberScreen(reduction(0.1));
  const refined = memberScreen(reduction(0.01));

  const comparison = comparePointwiseMemberResidualSearchScreens(
    primary,
    refined,
  );

  assert.equal(comparison.status, "diagnostic-resolution-comparison");
  assert.ok(
    Math.abs(
      comparison.entries.find(
        (row) =>
          row.metric === "fullCycleMaximumPointwiseMemberResidualNorm",
      ).absoluteChange - 0.09,
    ) < 1e-15,
  );
  assert.match(comparison.interpretation, /search guidance only/);
});
