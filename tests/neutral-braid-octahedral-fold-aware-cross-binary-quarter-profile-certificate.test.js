import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate,
  validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryQuarterProfileCertificate({
      sampleCount: 32,
      rootSubdivisions: 5000,
    });
  }
  return cachedArtifact;
}

test("fold-aware cross-binary quarter profile validates source reductions", () => {
  const certificate = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(certificate),
    []
  );
  assert.equal(
    certificate.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    certificate.packet_id,
    "octahedral_fold_aware_cross_binary_quarter_profile_certificate"
  );
  assert.equal(certificate.promotion_status, "priority-only");
  assert.equal(certificate.source_decomposition_check.valid, true);
  assert.equal(certificate.source_decomposition_check.partner_null_certified, true);
  assert.equal(
    certificate.source_decomposition_check.cross_binary_period_mean_zero_certified,
    true
  );
  assert.equal(certificate.source_chart_closure_check.receiver_orbit_transport_certified, true);
});

test("fold-aware cross-binary quarter profile imposes no speed window", () => {
  const certificate = artifact();

  assert.equal(
    certificate.scan_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.match(certificate.scan_parameters.quadrature_convention, /not an interval enclosure/);
  assert.deepEqual(certificate.scan_parameters.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(certificate.scan_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(certificate.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware cross-binary quarter profile checks symmetry transport", () => {
  const certificate = artifact();
  const symmetry = certificate.symmetry_transport_summary;

  assert.equal(symmetry.quarter_shift_identity, "f_cross(u+H/4)=-f_cross(u)");
  assert.equal(symmetry.half_period_identity, "f_cross(u+H/2)=f_cross(u)");
  assert.equal(symmetry.status, "sampled-cross-binary-quarter-symmetry-transport-passed");
  assert.ok(symmetry.max_quarter_shift_antisymmetry_residual <= 1e-10);
  assert.ok(symmetry.max_half_period_residual <= 1e-10);
  assert.ok(symmetry.max_partner_abs <= 1e-10);
  assert.ok(symmetry.max_total_minus_cross_abs <= 1e-10);
  assert.ok(Math.abs(symmetry.sampled_period_mean_residual) <= 1e-10);
});

test("fold-aware cross-binary quarter profile emits quarter primitive and centered clock formulas", () => {
  const certificate = artifact();
  const quarter = certificate.quarter_profile_summary;
  const transported = certificate.transported_clock_profile_summary;

  assert.deepEqual(quarter.cross_root_counts, [4, 6]);
  assert.deepEqual(quarter.partner_root_counts, [3]);
  assert.ok(quarter.forcing_minimum < 0);
  assert.ok(quarter.forcing_maximum > 0);
  assert.equal(quarter.primitive_endpoint_value, quarter.quarter_integral);
  assert.ok(transported.transport_identities.includes("Abar_cross=C_cross/2"));
  assert.ok(transported.transport_identities.includes("A_tilde_cross(u+H/4)=-A_tilde_cross(u)"));
  assert.equal(
    transported.centered_speed_interval_formula,
    "nu_min=L/H-D_cross, nu_max=L/H+D_cross"
  );
  assert.equal(
    transported.sampled_clock_length_criterion.positivity_status,
    "positive-clock-length-speed-profile-certified-for-supplied-summary"
  );
  assert.ok(transported.sampled_clock_length_criterion.positivity_margin > 2);
  assert.equal(
    transported.centered_speed_minimum,
    transported.sampled_clock_length_criterion.positivity_margin
  );
});

test("fold-aware cross-binary quarter profile preserves fold and non-retention boundaries", () => {
  const certificate = artifact();

  assert.equal(certificate.fold_guard_summary.ordinary_global_jacobian_floor_claimed, false);
  assert.equal(certificate.fold_guard_summary.regular_subcharts_required, true);
  assert.equal(certificate.fold_guard_summary.explicit_fold_rows_required, true);
  assert.equal(certificate.fold_guard_summary.coarea_interval_profile_still_required, true);
  assert.equal(certificate.artifact_claim.certifies_sampled_cross_binary_quarter_profile, true);
  assert.equal(certificate.artifact_claim.certifies_cross_binary_coarea_interval_profile, false);
  assert.equal(certificate.artifact_claim.certifies_representative_interval_profile, false);
  assert.equal(
    certificate.artifact_claim.certifies_receiver_orbit_interval_clock_length_return,
    false
  );
  assert.equal(certificate.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(certificate.result.retention, "not_retained");
  assert.equal(certificate.result.retained_branch, false);
});

test("fold-aware cross-binary quarter profile CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-cross-quarter-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-quarter-profile-certificate.mjs",
      import.meta.url
    )
  );

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "32", "--subdivisions", "5000", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const certificate = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryQuarterProfileCertificate(certificate),
    []
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(
    validation.result.theory_status,
    "sampled-cross-binary-quarter-profile-positive-clock-check"
  );

  const schema = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" })
  );
  assert.equal(
    schema.artifact_schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_QUARTER_PROFILE_CERTIFICATE_SCHEMA
  );
});
