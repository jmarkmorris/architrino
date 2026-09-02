import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const ROOT = new URL("../", import.meta.url);
const RESULT_URL = new URL(
  "reference/priorities/app-borg/evidence/borg-velocity-sampling-result.2026-09-01.json",
  ROOT,
);
const SCRIPT_URL = new URL(
  "scripts/eom/run-borg-velocity-sampling-campaign.mjs",
  ROOT,
);
const result = JSON.parse(readFileSync(RESULT_URL, "utf8"));

test("BORG-003 receipt binds the frozen protocol, instrument, and disjoint split", () => {
  assert.equal(result.schema, "borg-velocity-sampling-result.v1");
  assert.equal(result.protocolId, "borg-velocity-sampling-protocol.v1");
  assert.equal(result.claimGrade, "measured-bounded-eom-run-sampling-evidence");
  assert.equal(result.declaredRange.fieldSpeed, 1);
  assert.equal(result.declaredRange.normalization, "c_f=1");
  assert.deepEqual(result.split.calibrationSeeds, [101, 202, 303]);
  assert.deepEqual(result.split.holdoutSeeds, [404, 505]);
  assert.equal(
    result.split.calibrationSeeds.some((seed) => result.split.holdoutSeeds.includes(seed)),
    false,
  );
  assert.equal(
    sha256(readFileSync(SCRIPT_URL)),
    result.implementation.scriptSha256,
  );
});

test("every campaign row is a complete EOM-run shell and influence product", () => {
  assert.equal(result.eomRuns.length, 5);
  assert.equal(result.split.calibrationCrossingRows, 18);
  assert.equal(result.split.holdoutCrossingRows, 12);
  for (const run of result.eomRuns) {
    assert.equal(run.status, "completed");
    assert.equal(run.acceptedEndTime, "5.001");
    assert.equal(run.haltCode, "");
    assert.equal(run.coverageStatus, "boundary-shell-complete");
    assert.equal(run.unresolvedSegmentCount, 0);
    assert.equal(run.crossingCount, result.split.pathsPerSeed);
    assert.equal(run.influenceCount, result.split.pathsPerSeed);
    assert.deepEqual(run.nativeResidualStatuses, ["passed", "passed", "passed"]);
    assert.match(run.scientificProductSha256, /^[0-9a-f]{64}$/);
    assert.ok(run.speedMinimum >= result.declaredRange.minimumSpeed);
    assert.ok(run.speedMaximum <= result.declaredRange.maximumSpeed);
  }
});

test("the frozen six-check decision fails closed when any holdout check fails", () => {
  assert.deepEqual(Object.keys(result.checks), [
    "velocityDistributionResidual",
    "tailMassResidual",
    "correlationResidual",
    "seedVarianceResidual",
    "patchReplayResidual",
    "centralContributionResidual",
  ]);
  const failures = Object.entries(result.checks)
    .filter(([, check]) => check.status === "failed")
    .map(([name]) => name);
  assert.deepEqual(failures, [
    "velocityDistributionResidual",
    "centralContributionResidual",
  ]);
  for (const check of Object.values(result.checks)) {
    assert.equal(check.status, check.value <= check.limit ? "passed" : "failed");
  }
  assert.equal(result.decision.eomRowsReady, true);
  assert.equal(result.decision.velocitySamplingResearchStatus, "precision-insufficient");
  assert.equal(result.decision.velocitySamplingHoldoutStatus, "failed");
  assert.equal(result.decision.velocitySamplingSelectedPolicyId, null);
  assert.equal(result.decision.benignNoiseStatus, "fail-closed-residual");
  assert.equal(result.decision.affectedValueAuthority, "fail-closed-value");
});

test("the replay sample retains source traceability without invented values or identity reuse", () => {
  assert.equal(result.policy.generatedRowCount, result.split.holdoutCrossingRows);
  assert.equal(result.policy.sourceTraceabilityComplete, true);
  assert.equal(result.policy.inventedVelocityCount, 0);
  assert.equal(result.policy.sameRecordIdentityReuse, false);
  assert.match(result.independenceBoundary, /not an independent EOM-correctness oracle/);
  assert.match(result.claimBoundary, /no unbounded constitutive distribution/);
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
