import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("F6b diagnostic rejects shared circles and preserves polarity-resolved tangent structure", () => {
  const stdout = execFileSync(
    process.execPath,
    ["scripts/mapping-electromagnetism/f6b-prescribed-kernel-diagnostic.mjs"],
    {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
    },
  );
  const report = JSON.parse(stdout);

  assert.equal(report.claimGrade, "measured-report-grade-prescribed-path-diagnostic");
  assert.equal(report.fieldSpeed, 1);
  assert.equal(report.polarityMagnitude, 1);
  assert.equal(report.status.code, "ok");
  assert.equal(report.validity.passed, true);
  assert.deepEqual(report.rootsPerEvent, [7, 7]);
  assert.equal(report.totalRootRows, 7168);
  assert.ok(report.bestPositiveCommonCouplingResidual.rms > 0.29);
  assert.ok(
    report.commonBreathingCoordinateCompatibility.vectorFieldNormalFraction > 0.68,
  );
  assert.ok(
    report.polarityResolvedBreathingCoordinateCompatibility
      .vectorFieldNormalFraction < 1e-12,
  );
  for (const component of ["axial", "radial", "phase"]) {
    assert.ok(
      report.polarityResolvedBreathingCoordinateCompatibility[component]
        .peakSpread < 1e-10,
    );
  }
  assert.equal(report.cyclicImproperSymmetry.determinant, -1);
  assert.equal(report.cyclicImproperSymmetry.order, 4);
  assert.deepEqual(
    report.cyclicImproperSymmetry.modulePermutation,
    [3, 2, 0, 1],
  );
  for (const residual of Object.values(
    report.cyclicImproperSymmetry.maximumResidual,
  )) {
    assert.ok(residual < 1e-10);
  }
  assert.ok(report.excludedClaims.includes("retention"));
  assert.ok(report.excludedClaims.includes("particle-identity"));
});
