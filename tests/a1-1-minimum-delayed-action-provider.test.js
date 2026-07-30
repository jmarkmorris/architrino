import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  evaluateA11MinimumDelayedActionProvider,
  summarizeA11MinimumDelayedActionProvider,
  validateA11MinimumActionProtocol,
} from "../src/action-analysis/A11MinimumDelayedActionProviderDiagnostic.mjs";

const protocol = JSON.parse(await readFile(
  new URL(
    "../src/action-analysis/protocols/" +
    "a1-1-minimum-delayed-action-provider-protocol.v1.json",
    import.meta.url,
  ),
  "utf8",
));
const sealedA11Summary = JSON.parse(await readFile(
  new URL(
    "../reference/priorities/braid-program/evidence/" +
    "a1-1-history-policy-extension-independent-verifier-summary.v1.json",
    import.meta.url,
  ),
  "utf8",
));

test("minimum provider freezes the accepted A1.1 control and non-claims", () => {
  const validated = validateA11MinimumActionProtocol(protocol);
  assert.equal(validated.actionCandidate.fieldSpeed, 1);
  assert.equal(validated.sealedA11Control.radiusOrHistoryMutationAuthorized, false);
  assert.equal(validated.claimBoundary.score, null);
  assert.equal(validated.claimBoundary.eomSolverInvoked, false);
  assert.equal(validated.claimBoundary.prescribedRotatingChartIsSolution, false);
});

test("normalized characteristic tail closes the local Euler identity", () => {
  const result = evaluateA11MinimumDelayedActionProvider({
    protocol,
    sealedA11Summary,
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
  const result = evaluateA11MinimumDelayedActionProvider({
    protocol,
    sealedA11Summary,
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
  assert.throws(
    () => validateA11MinimumActionProtocol({
      ...protocol,
      actionCandidate: {
        ...protocol.actionCandidate,
        fieldSpeed: 2,
      },
    }),
    /action candidate declaration drifted/,
  );
  assert.throws(
    () => evaluateA11MinimumDelayedActionProvider({
      protocol,
      sealedA11Summary: {
        ...sealedA11Summary,
        resultHash: "tampered",
      },
    }),
    /sealed A1\.1 diagnostic control does not match/,
  );
  assert.throws(
    () => validateA11MinimumActionProtocol({
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
  const first = summarizeA11MinimumDelayedActionProvider(
    evaluateA11MinimumDelayedActionProvider({
      protocol,
      sealedA11Summary,
    }),
  );
  const second = summarizeA11MinimumDelayedActionProvider(
    evaluateA11MinimumDelayedActionProvider({
      protocol,
      sealedA11Summary,
    }),
  );
  assert.deepEqual(second, first);
});
