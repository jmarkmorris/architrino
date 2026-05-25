import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
        {
          rootSubdivisions: 5000,
          endpointSpeedSampleCount: 9,
          zeroBranchSpeedSampleCount: 9,
          derivativeThetaSampleCount: 48,
          thetaCellCount: 16,
          speedCellCount: 8,
          stencilSamplesPerAxis: 5,
          endpointPadding: 1e-5,
          machinePadding: 1e-9,
          bisectionTolerance: 1e-12,
        }
      );
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-12) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("I1.f1 bracket-local derivative variation certificate validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_bracket_local_derivative_variation_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 bracket-local derivative variation certificate consumes the reduced local successor", () => {
  const packet = artifact();

  assert.equal(packet.burden_reduction_check.valid, true);
  assert.equal(
    packet.burden_reduction_check
      .certifies_I1_f1_local_zero_isolation_burden_reduction,
    true
  );
  assert.equal(
    packet.burden_reduction_check.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.burden_reduction_check.certifies_interval_derivative_enclosure,
    false
  );
  assert.equal(
    packet.burden_reduction_check.first_successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
  );
  assert.equal(packet.mesh_barrier_check.valid, true);
  assert.equal(
    packet.mesh_barrier_check.certifies_I1_f1_bracket_derivative_mesh_barrier,
    true
  );
  assert.equal(
    packet.mesh_barrier_check.certifies_interval_derivative_enclosure,
    false
  );
});

test("I1.f1 bracket-local derivative variation certificate imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.stencil_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.stencil_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.stencil_parameters.speed_band, undefined);
  assert.equal(packet.stencil_parameters.speed_window, undefined);
  assert.equal(packet.stencil_parameters.speed_min, undefined);
  assert.equal(packet.stencil_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 bracket-local derivative variation certificate records the mixed-stencil margin", () => {
  const summary = artifact().variation_summary;

  assert.equal(
    summary.variation_row_id,
    "I1.f1.bracket-local-derivative-variation-stencil-certificate"
  );
  assert.equal(
    summary.successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
  );
  assert.equal(summary.mesh_row_count, 128);
  assert.equal(summary.certified_mesh_row_count, 128);
  assert.equal(summary.stencil_samples_per_axis, 5);
  assert.equal(summary.total_derivative_sample_count, 3200);
  near(summary.observed_derivative_minimum, -0.100761491871, 5e-13);
  near(summary.observed_derivative_maximum, -0.060388174983, 5e-13);
  near(summary.minimum_observed_derivative_clearance, 0.060388174983, 5e-13);
  near(summary.max_observed_derivative_spread, 0.00278826642474, 5e-14);
  near(
    summary.max_center_to_observed_max_variation,
    0.00139034657825,
    5e-14
  );
  near(summary.max_existing_local_variation_allowance, 0.00139413419694, 5e-14);
  near(summary.max_observed_variation_allowance_ratio, 0.997283174962, 5e-12);
  near(summary.minimum_allowance_domination_slack, 0.00000378761869309, 5e-16);
  near(summary.max_corner_excess_over_axial_face_max, 1.42752990595e-7, 5e-18);
  near(summary.minimum_sampled_abs_F_delta, 0.686789509138, 5e-13);
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  assert.equal(
    summary.worst_slack_mesh_row_id,
    "I1.f1.bracket-derivative-mesh.0.7"
  );
  assert.equal(
    summary.worst_derivative_mesh_row_id,
    "I1.f1.bracket-derivative-mesh.15.7"
  );
  assert.equal(
    summary.status,
    "i1-f1-bracket-local-derivative-variation-stencil-certificate-certified"
  );
});

test("I1.f1 bracket-local derivative variation rows stay inside the predecessor allowance", () => {
  const rows = artifact().stencil_rows;

  assert.equal(rows.length, 128);
  assert.equal(
    rows.every(
      (row) =>
        row.status ===
          "i1-f1-bracket-local-derivative-variation-stencil-cell-certified" &&
        row.stencil_sample_count === 25 &&
        row.source_root_count_preserved === true &&
        row.source_root_counts.length === 1 &&
        row.source_root_counts[0] === 6 &&
        row.term_root_count_signatures.length === 1 &&
        row.term_root_count_signatures[0] === "1,3,1,1" &&
        Number(row.observed_derivative_maximum) < 0 &&
        Number(row.allowance_domination_slack) > 0 &&
        Number(row.observed_variation_allowance_ratio) < 1 &&
        Number(row.min_abs_F_delta) > 0
    ),
    true
  );
});

test("I1.f1 bracket-local derivative variation certificate keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_observed_stencil_derivative_negativity_on_I1_f1_bracket,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_observed_stencil_variation_below_existing_mesh_allowance,
    true
  );
  assert.equal(
    packet.artifact_claim
      .advances_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_derivative_negative_full_cell_interval_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-f1-bracket-local-derivative-variation-stencil-certificate-certified"
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
  );
});

test("I1.f1 bracket-local derivative variation certificate rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
        {
          stencilSamplesPerAxis: 2,
        }
      ),
    /stencilSamplesPerAxis/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
        {
          stencilSamplesPerAxis: 4,
        }
      ),
    /stencilSamplesPerAxis/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
        {
          speedCellCount: 1,
        }
      ),
    /speedCellCount/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_derivative_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativeVariationCertificate(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1.f1 bracket-local derivative variation certificate CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-variation-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [
      script,
      "--out",
      outPath,
      "--pretty",
      "--endpoint-speed-samples",
      "3",
      "--zero-branch-speed-samples",
      "3",
      "--derivative-theta-samples",
      "8",
      "--theta-cells",
      "4",
      "--speed-cells",
      "2",
      "--stencil-samples",
      "3",
    ],
    {
      stdio: "pipe",
    }
  );
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_VARIATION_CERTIFICATE_SCHEMA
  );
});
