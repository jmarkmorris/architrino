import assert from "node:assert/strict";
import test from "node:test";

import {
  runReceiverWakeGradientVerification,
} from "../scripts/equation-mapping/verify-receiver-wake-gradient.mjs";

test("independent receiver-wake gradient verifier closes only regular rows", () => {
  const report = runReceiverWakeGradientVerification();

  assert.equal(
    report.schema,
    "receiver_wake_gradient_independent_verification/v1",
  );
  assert.equal(report.controls.length, 4);
  for (const control of report.controls) {
    assert.equal(control.status, "verified_regular_only");
    assert.ok(control.separation > 0);
    assert.ok(Math.abs(control.transmitterFactor) > 0);
  }
  assert.equal(
    report.foldModel.status,
    "boundary_prescription_not_selected",
  );
  for (const row of report.foldModel.regulatorRows) {
    assert.equal(row.family, "1/sqrt(lambda + shape*width^2)");
    assert.ok(Math.abs(row.contributionRatio - 2) <= 1e-14);
    assert.ok(Math.abs(row.derivativeRatio - 8) <= 1e-14);
  }
  assert.match(report.conclusion, /remain unselected and unresolved/);
});
