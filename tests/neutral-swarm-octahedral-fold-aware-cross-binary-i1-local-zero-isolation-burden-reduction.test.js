import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction,
  validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction({
        rootSubdivisions: 5000,
        endpointSpeedSampleCount: 9,
        zeroBranchSpeedSampleCount: 9,
        derivativeThetaSampleCount: 48,
        thetaCellCount: 16,
        speedCellCount: 8,
        endpointPadding: 1e-5,
        machinePadding: 1e-9,
        bisectionTolerance: 1e-12,
      });
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-12) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("I1.f1 local zero-isolation burden reduction validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_local_zero_isolation_burden_reduction"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 local zero-isolation burden reduction consumes the local composition only", () => {
  const packet = artifact();

  assert.equal(packet.local_zero_isolation_composition_check.valid, true);
  assert.equal(
    packet.local_zero_isolation_composition_check
      .certifies_I1_f1_bracket_local_zero_isolation_mesh_composition,
    true
  );
  assert.equal(
    packet.local_zero_isolation_composition_check
      .certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.local_zero_isolation_composition_check
      .certifies_interval_derivative_enclosure,
    false
  );
});

test("I1.f1 local zero-isolation burden reduction imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.reduction_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.reduction_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.reduction_parameters.speed_band, undefined);
  assert.equal(packet.reduction_parameters.speed_window, undefined);
  assert.equal(packet.reduction_parameters.speed_min, undefined);
  assert.equal(packet.reduction_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 local zero-isolation burden reduction shrinks the derivative domain", () => {
  const summary = artifact().burden_reduction_summary;

  assert.equal(
    summary.reduction_row_id,
    "I1.f1.local-zero-isolation-burden-reduction"
  );
  assert.equal(
    summary.original_successor_row,
    "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required"
  );
  assert.equal(
    summary.reduced_local_successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
  );
  assert.deepEqual(summary.bracket_interval, [0.124678831905, 0.145456970556]);
  assert.deepEqual(summary.compact_i1_scan_interval, [0.00001, 0.997360655243]);
  near(summary.bracket_length, 0.020778138651, 5e-13);
  near(summary.compact_i1_scan_length, 0.997350655243, 5e-13);
  near(summary.bracket_fraction_of_compact_i1_scan, 0.0208333333334, 5e-13);
  near(summary.compact_to_bracket_length_ratio, 47.9999999998, 5e-10);
  near(summary.minimum_endpoint_signed_clearance, 0.000471690862363, 5e-15);
  near(
    summary.maximum_local_derivative_upper_barrier_stencil,
    -0.0603824889362,
    5e-13
  );
  near(summary.minimum_derivative_signed_clearance, 0.0603824889362, 5e-13);
  assert.deepEqual(summary.sampled_root_theta_envelope, [
    0.129617801662,
    0.129631781031,
  ]);
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  assert.equal(summary.local_zero_isolation_uses_only_bracket_derivative_negativity, true);
  assert.equal(
    summary.full_cell_derivative_negativity_is_sufficient_not_necessary_for_I1_f1_local_zero,
    true
  );
  assert.equal(
    summary.status,
    "i1-f1-local-zero-isolation-burden-reduction-certified"
  );
});

test("I1.f1 local zero-isolation burden reduction keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim.certifies_I1_f1_local_zero_isolation_burden_reduction,
    true
  );
  assert.equal(
    packet.artifact_claim
      .replaces_full_cell_derivative_requirement_for_I1_f1_local_zero_isolation,
    true
  );
  assert.equal(
    packet.artifact_claim
      .shrinks_direct_I1_f1_zero_isolation_derivative_domain_to_bracket,
    true
  );
  assert.equal(
    packet.artifact_claim.preserves_full_cell_derivative_row_for_global_sign_topology,
    true
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
    "source-atlas-aware-i1-f1-local-zero-isolation-burden-reduction-certified"
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
  );
  assert.equal(
    packet.result.broader_open_row,
    "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required"
  );
});

test("I1.f1 local zero-isolation burden reduction rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction({
        zeroBranchSpeedSampleCount: 2,
      }),
    /zeroBranchSpeedSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction({
        speedCellCount: 1,
      }),
    /speedCellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction({
        machinePadding: 0,
      }),
    /machinePadding/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_derivative_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );
});

test("I1.f1 local zero-isolation burden reduction CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-burden-reduction-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA
  );
});
