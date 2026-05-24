import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_CRITICAL_EXHAUSTION_INTEGRATION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration,
  validateOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.mjs";
import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs";
import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs";

const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const EXPECTED_STATUS =
  "source-atlas-aware-i1-f1-critical-exhaustion-integration-certified";

let cachedArtifact = null;

function zeroIsolationFixture() {
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_FULL_INTERVAL_ZERO_ISOLATION_COMPOSITION_SCHEMA,
    packet_id:
      "octahedral_fold_aware_cross_binary_i1_f1_full_interval_zero_isolation_composition",
    promotion_status: "priority-only",
    forcing_bracket_certificate_check: {
      valid: true,
      certifies_I1_forcing_bracket_point_signs: true,
      certifies_I1_zero_isolation: false,
    },
    derivative_peak_budget_check: {
      valid: true,
      theory_status:
        "source-atlas-aware-i1-f1-bracket-local-directed-rounded-taylor-derivative-variation-certified",
      certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure:
        true,
      certifies_directed_rounded_taylor_upper_envelope: true,
      certifies_I1_f1_full_interval_zero_isolation: false,
    },
    composition_parameters: {
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: [3.02156, 3.02157],
    },
    full_interval_zero_isolation_composition_summary: {
      status: "i1-f1-full-interval-zero-isolation-composition-certified",
      bracket_interval: [0.124678831905, 0.145456970556],
      endpoint_signs_force_existence: true,
      derivative_envelope_forces_strict_monotonicity: true,
      minimum_endpoint_signed_clearance: 0.000471690862363,
      maximum_directed_rounded_interval_taylor_upper_bound: -0.0603824889362,
      minimum_directed_rounded_interval_derivative_negativity_clearance:
        0.0603824889362,
      maximum_allowed_upper_bound: 0,
      minimum_directed_rounded_interval_taylor_headroom: 0.00000372535118309,
      directed_rounded_taylor_passed_tile_count: 4096,
      theta_localized_taylor_tile_count: 4096,
    },
    interval_profile_boundary: {
      certifies_I1_f1_full_interval_zero_isolation_composition: true,
      certifies_I1_f1_bracket_interval_monotonicity: true,
      certifies_I1_f1_unique_bracket_zero: true,
      certifies_I1_f1_full_interval_zero_isolation: true,
      certifies_I1_zero_isolation: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      composes_I1_endpoint_signs_and_directed_rounded_derivative_envelope:
        true,
      certifies_I1_f1_full_interval_zero_isolation_composition: true,
      certifies_I1_f1_bracket_interval_monotonicity: true,
      certifies_I1_f1_unique_bracket_zero: true,
      certifies_I1_f1_full_interval_zero_isolation: true,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantity_names: [
        "global_I1_interval_sign_topology",
        "interval_critical_exhaustion",
        "interval_quadrature_enclosure",
        "retained_branch_status",
      ],
      retained_branch: false,
    },
    result: {
      theory_status:
        "source-atlas-aware-i1-f1-full-interval-zero-isolation-composition-certified",
      first_successor_row:
        "I1.f1.interval-critical-exhaustion-quadrature-retention-required",
      retention: "not_retained",
      retained_branch: false,
    },
  };
}

function speedEnvelopeFixture() {
  const rows = [
    [3.02156, 0.12963178103, -0.090295966856],
    [3.021565, 0.12962479135, -0.09030984611],
    [3.02157, 0.129617801663, -0.090323725862],
  ].map(([speedRatio, rootTheta, derivative]) => ({
    speed_ratio: speedRatio,
    root_theta: rootTheta,
    root_forcing_abs: 1e-13,
    root_derivative: derivative,
    source_root_count: 6,
    term_root_count_signature: [1, 3, 1, 1],
    min_abs_F_delta: 0.70663446648,
    min_multiroot_term_delta_separation: 1.28378134743,
    source_root_count_preserved: true,
    bracket_signs_preserved: true,
    root_inside_bracket: true,
    derivative_at_root_negative: true,
    status: "i1-f1-sampled-simple-root-certified",
  }));
  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_ZERO_ISOLATION_SPEED_ENVELOPE_SCAN_SCHEMA,
    packet_id:
      "octahedral_fold_aware_cross_binary_i1_zero_isolation_speed_envelope_scan",
    promotion_status: "priority-only",
    forcing_bracket_certificate_check: {
      valid: true,
      certifies_I1_forcing_bracket_point_signs: true,
      certifies_I1_zero_isolation: false,
    },
    derivative_negative_scan_check: {
      valid: true,
      certifies_I1_derivative_negative_speed_envelope_scan: true,
      certifies_interval_derivative_enclosure: false,
    },
    scan_parameters: {
      speed_constraint: NO_SPEED_WINDOW,
      speed_sample_count: rows.length,
      bisection_tolerance: 1e-12,
    },
    root_branch_rows: rows,
    root_branch_summary: {
      zero_row_id: "I1.f1.zero-isolation.speed-envelope-scan",
      status: "i1-f1-zero-isolation-speed-envelope-scan-certified",
      sampled_root_count: rows.length,
      source_root_count_preserved: true,
      term_root_count_signatures: ["1,3,1,1"],
      min_abs_F_delta: 0.70663446648,
      min_multiroot_term_delta_separation: 1.28378134743,
      root_theta_envelope: [0.129617801662, 0.129631781031],
      root_theta_span: 0.0000139793672153,
      root_derivative_envelope: [-0.0903237258617, -0.0902959668558],
      sampled_root_branch_monotone_decreasing_in_speed: true,
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      composes_I1_endpoint_signs_and_derivative_scan: true,
      certifies_I1_f1_zero_isolation_speed_envelope_scan: true,
      certifies_I1_f1_root_branch_speed_envelope_scan: true,
      certifies_I1_f1_sampled_simple_root_branch: true,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_critical_exhaustion: false,
      retained_branch: false,
    },
    result: {
      theory_status:
        "source-atlas-aware-i1-f1-zero-isolation-speed-envelope-scan-certified",
      retention: "not_retained",
      retained_branch: false,
    },
  };
}

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration({
        zeroIsolationPacket: zeroIsolationFixture(),
        speedEnvelopePacket: speedEnvelopeFixture(),
      });
  }
  return cachedArtifact;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("I1.f1 critical-exhaustion integration validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_CRITICAL_EXHAUSTION_INTEGRATION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_f1_critical_exhaustion_integration"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 integration imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(packet.integration_parameters.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(packet.integration_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.integration_parameters.speed_band, undefined);
  assert.equal(packet.integration_parameters.speed_window, undefined);
  assert.equal(packet.integration_parameters.speed_min, undefined);
  assert.equal(packet.integration_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 integration consumes zero isolation and sampled location envelope", () => {
  const packet = artifact();
  const summary = packet.critical_exhaustion_integration_summary;

  assert.equal(packet.zero_isolation_composition_check.valid, true);
  assert.equal(
    packet.zero_isolation_composition_check
      .certifies_I1_f1_full_interval_zero_isolation,
    true
  );
  assert.equal(
    packet.speed_envelope_location_check
      .certifies_I1_f1_root_branch_speed_envelope_scan,
    true
  );
  assert.deepEqual(summary.certified_unique_zero_bracket, [
    0.124678831905,
    0.145456970556,
  ]);
  assert.deepEqual(summary.theorem_grade_candidate_location_interval, [
    0.124678831905,
    0.145456970556,
  ]);
  assert.deepEqual(summary.sampled_speed_envelope_location_interval, [
    0.129617801662,
    0.129631781031,
  ]);
  assert.equal(summary.sampled_envelope_inside_certified_bracket, true);
  assert.equal(summary.i1_zero_isolation_target_removed_from_open_bottleneck, true);
});

test("I1.f1 integration reduces critical exhaustion to complement signs", () => {
  const packet = artifact();
  const summary = packet.critical_exhaustion_integration_summary;

  assert.equal(
    packet.i1_f1_critical_exhaustion_integration_theorem.proof_status,
    "i1-f1-critical-exhaustion-integration-reduction-certified"
  );
  assert.equal(summary.remaining_i1_complement_row_count, 2);
  assert.deepEqual(
    summary.complement_sign_exclusion_rows.map((row) => row.row_id),
    [
      "I1.left-complement.forcing-positive",
      "I1.right-complement.forcing-negative",
    ]
  );
  assert.deepEqual(
    summary.complement_sign_exclusion_rows.map((row) => row.expected_sign),
    ["+", "-"]
  );
  assert.ok(
    summary.i1_regular_critical_exhaustion_implication.includes(
      "Crit(A_cross;I1)={u1}"
    )
  );
});

test("I1.f1 integration keeps downstream interval, quadrature, and retention claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .composes_I1_f1_zero_isolation_into_critical_exhaustion_map,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_critical_exhaustion_integration,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    true
  );
  assert.equal(packet.artifact_claim.certifies_I1_regular_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(
    packet.artifact_claim.certifies_global_I1_interval_sign_topology,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
  assert.equal(
    packet.result.first_successor_row,
    "I1.complement-sign-exclusion-interval-enclosures-required"
  );
});

test("I1.f1 integration rejects speed-band fields and downstream overclaims", () => {
  const packet = clone(artifact());
  packet.integration_parameters.speed_band = [0.5, 1.5];
  packet.artifact_claim.certifies_interval_critical_exhaustion = true;

  const errors =
    validateOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration(
      packet
    );

  assert.ok(
    errors.includes("integration parameters must not contain speed-band fields")
  );
  assert.ok(
    errors.includes(
      "artifact claim must integrate only the I1.f1 zero and keep complement, interval, quadrature, and retention claims open"
    )
  );
});

test("I1.f1 critical-exhaustion integration CLI validates JSON artifacts", () => {
  const packet = artifact();
  const scriptPath = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.mjs",
      import.meta.url
    )
  );
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-f1-critical-exhaustion-")
  );
  const artifactPath = path.join(tempDir, "artifact.json");
  fs.writeFileSync(artifactPath, `${JSON.stringify(packet)}\n`);

  const output = execFileSync(process.execPath, [
    scriptPath,
    "--validate",
    artifactPath,
  ]).toString();

  assert.equal(output.trim(), "ok");
});
