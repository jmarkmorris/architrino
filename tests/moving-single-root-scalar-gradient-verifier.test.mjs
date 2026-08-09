import assert from "node:assert/strict";
import test from "node:test";

import {
  runMovingSingleRootScalarGradientVerification,
} from "../scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs";

test("moving single-root scalar gradient reproduces only the regular ledger row", () => {
  const report = runMovingSingleRootScalarGradientVerification();

  assert.equal(
    report.schema,
    "moving_single_root_scalar_gradient_verification/v1",
  );
  assert.equal(report.status, "verified_regular_only");
  assert.equal(report.fieldSpeed, 1);
  assert.equal(
    report.oracle.sourceSchema,
    "receiver_wake_gradient_independent_verification/v1",
  );
  assert.equal(report.oracle.sourceControl, "uniform_circular_history");
  assert.ok(report.chartCertificate.analyticSeparationFloor > 1);
  assert.ok(
    report.chartCertificate.analyticTransmitterFactorFloor >= 0.72,
  );
  assert.ok(report.finalMaximumAbsoluteResidual <= 2e-9);
  assert.ok(report.finalMaximumStencilDisagreement <= 2e-9);
  assert.ok(report.maximumAbsoluteResidualAcrossRows <= 2e-9);
  assert.ok(report.maximumStencilDisagreementAcrossRows <= 2e-9);
  assert.equal(
    report.negativeControls.rawInverseSquareScalar.status,
    "rejected_wrong_radial_scaling",
  );
  assert.ok(
    report.negativeControls.rawInverseSquareScalar.maximumAbsoluteResidual >=
      0.1,
  );
  assert.equal(
    report.negativeControls.outsideCertifiedChart.status,
    "not_advanced_outside_regular_chart",
  );
  assert.ok(report.nonclaims.includes("global scalar existence"));
  assert.ok(report.nonclaims.includes("action or conservation closure"));
  assert.match(report.conclusion, /Singular boundaries.*remain unresolved/u);
});
