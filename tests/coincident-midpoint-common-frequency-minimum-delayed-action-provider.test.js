import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider,
  summarizeCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider,
  validateCoincidentMidpointCommonFrequencyMinimumActionProtocol,
} from "../src/action-analysis/CoincidentMidpointCommonFrequencyMinimumDelayedActionProviderDiagnostic.mjs";

const protocol = JSON.parse(await readFile(
  new URL(
    "../src/action-analysis/protocols/" +
    "coincident-midpoint-common-frequency-minimum-delayed-action-provider-protocol.v1.json",
    import.meta.url,
  ),
  "utf8",
));
const sealedCoincidentMidpointCommonFrequencySummary = JSON.parse(await readFile(
  new URL(
    "../reference/priorities/braid-program/evidence/" +
    "coincident-midpoint-common-frequency-history-policy-extension-independent-verifier-summary.v1.json",
    import.meta.url,
  ),
  "utf8",
));

test("minimum provider freezes the accepted coincident-midpoint common-frequency three-axis circular configuration control and non-claims", () => {
  const validated = validateCoincidentMidpointCommonFrequencyMinimumActionProtocol(protocol);
  assert.deepEqual(validated.sourceConfiguration.scientificIdentity, {
    assemblyId: "asm-2a289a6fe32f64922ab71bae973acc80",
    modelRevisionSha256:
      "2a289a6fe32f64922ab71bae973acc80bef8ebc2369329a26822f3f0d7f159d6",
  });
  assert.equal(validated.actionCandidate.fieldSpeed, 1);
  assert.equal(validated.sealedCoincidentMidpointCommonFrequencyControl.radiusOrHistoryMutationAuthorized, false);
  assert.equal(validated.claimBoundary.score, null);
  assert.equal(validated.claimBoundary.eomSolverInvoked, false);
  assert.equal(validated.claimBoundary.prescribedRotatingChartIsSolution, false);
});

test("normalized characteristic tail closes the local Euler identity", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
    protocol,
    sealedCoincidentMidpointCommonFrequencySummary,
  });
  assert.equal(result.localEuler.passed, true);
  assert.ok(result.localEuler.maximumAbsoluteError <= 5e-6);
  assert.equal(result.localEuler.noncentralDirectScalarFailures, 4);
  assert.equal(
    result.actionCandidate.localEulerIdentityPassedOnBoundedChart,
    true,
  );
  assert.ok(Math.abs(result.rotatingChart.rootResidual) <= 5e-15);
  assert.equal(result.rotatingChart.eomSolutionClaimed, false);
});

test("future-boundary dependence stops before branch and ledger execution", () => {
  const result = evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
    protocol,
    sealedCoincidentMidpointCommonFrequencySummary,
  });
  assert.equal(result.status.code, "blocked-future-boundary-causal-update");
  assert.equal(result.status.score, null);
  assert.equal(result.futureBoundary.passed, false);
  assert.equal(result.futureBoundary.futureDependenceWitnessPassed, true);
  assert.equal(result.futureBoundary.causalUpdateMayReadFutureReceiver, false);
  assert.equal(result.branchAttempt.executed, false);
  assert.equal(result.angularMomentumLedger.executed, false);
  assert.equal(result.angularMomentumLedger.complete, false);
});

test("protocol, control, and execution drift stop advancement", () => {
  const identityDrift = structuredClone(protocol);
  identityDrift.sourceConfiguration.scientificIdentity.assemblyId =
    "asm-00000000000000000000000000000000";
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyMinimumActionProtocol(identityDrift),
    /exact coincident-midpoint common-frequency scientific identity/,
  );
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyMinimumActionProtocol({
      ...protocol,
      actionCandidate: {
        ...protocol.actionCandidate,
        fieldSpeed: 2,
      },
    }),
    /action candidate declaration drifted/,
  );
  assert.throws(
    () => evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
      protocol,
      sealedCoincidentMidpointCommonFrequencySummary: {
        ...sealedCoincidentMidpointCommonFrequencySummary,
        resultHash: "tampered",
      },
    }),
    /sealed coincident-midpoint common-frequency three-axis circular configuration diagnostic control does not match/,
  );
  assert.throws(
    () => validateCoincidentMidpointCommonFrequencyMinimumActionProtocol({
      ...protocol,
      claimBoundary: {
        ...protocol.claimBoundary,
        prescribedRotatingChartIsSolution: true,
      },
    }),
    /claim boundary drifted/,
  );
});

test("minimum provider replay is deterministic", () => {
  const first = summarizeCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider(
    evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
      protocol,
      sealedCoincidentMidpointCommonFrequencySummary,
    }),
  );
  const second = summarizeCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider(
    evaluateCoincidentMidpointCommonFrequencyMinimumDelayedActionProvider({
      protocol,
      sealedCoincidentMidpointCommonFrequencySummary,
    }),
  );
  assert.deepEqual(second, first);
});
