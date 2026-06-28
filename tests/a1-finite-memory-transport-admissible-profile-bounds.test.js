import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const python = process.env.AAA_VENV
  ? path.join(process.env.AAA_VENV, "bin", "python")
  : path.resolve(repoRoot, "../.venv/bin/python");
const scriptPath = path.join(
  repoRoot,
  "reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py"
);

function runA1Diagnostic(diagnosticMode) {
  const output = execFileSync(
    python,
    [
      scriptPath,
      "--theta-hi",
      "0.02",
      "--delta-steps",
      "128",
      "--integration-panels",
      "16",
      "--profile-mode",
      "tangential_transport",
      "--transport-steps",
      "16",
      "--past-profile",
      "endpoint_slope_cancel",
      "--endpoint-cancel-positivity-samples",
      "101",
      "--diagnostic-mode",
      diagnosticMode,
      "--finite-collar-samples",
      "3",
      "--finite-collar-integration-panels",
      "16",
      "--finite-collar-transport-steps",
      "16",
      "--finite-collar-delta-steps",
      "128",
      "--finite-collar-positivity-samples",
      "101",
      "--admissible-profile-bernstein-depth",
      "12",
    ],
    {
      cwd: repoRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        VIRTUAL_ENV: process.env.AAA_VENV ?? path.resolve(repoRoot, "../.venv"),
      },
    }
  );
  return JSON.parse(output);
}

const futureProfileCertificateSummaryKeys = [
  "schema",
  "artifact_id",
  "box_id",
  "source_artifact_hash",
  "past_profile_certificate_digest",
  "transport_profile_kind",
  "theta_interval",
  "transport_steps",
  "node_count",
  "node_payload_digest",
  "node_payload_byte_count",
  "method",
  "exact_reference_arithmetic",
  "source_float64_payload_bound",
  "interpolation_kind",
  "q_prime_semantics",
  "q_interval",
  "q_interval_hex",
  "q_prime_auxiliary_interval",
  "q_prime_auxiliary_interval_hex",
  "q_min_node_index",
  "q_max_node_index",
  "q_prime_min_node_index",
  "q_prime_max_node_index",
  "bounds_emitted_piecewise_linear_profile",
  "outward_for_emitted_piecewise_linear_profile",
  "bounds_continuous_transport_equation",
  "outward_for_continuous_transport_equation",
  "E_Q_plus_b_for_admissible_class",
  "used_as_certificate",
  "used_as_local_certificate",
  "used_as_shared_certificate",
  "authorizes_outward_certificate",
  "authorizes_obstruction_or_channel_decision",
  "certificate_digest",
  "status",
];

function summarizeFutureProfileCertificate(certificate) {
  return Object.fromEntries(
    futureProfileCertificateSummaryKeys.map((key) => [key, certificate[key]])
  );
}

function withoutAdmissibilityOnlyReplays(target) {
  const copy = structuredClone(target);
  delete copy.shared_interval_boxes.retained_root_window_bracket_replay;
  delete copy.shared_interval_boxes.inactive_cover_exclusion_replay;
  return copy;
}

test("A1 admissible profile bounds attempt remains fail-closed and priority-only", () => {
  const packet = runA1Diagnostic("a1_admissible_profile_bounds_attempt");
  assert.equal(
    packet.schema,
    "architrino.priority.master_equation_closure.a1_admissible_profile_bounds.v0"
  );
  assert.equal(packet.artifact_id, "a1_admissible_profile_bounds.v0");
  assert.equal(packet.diagnostic_mode, "a1_admissible_profile_bounds_attempt");
  assert.equal(packet.first_failure, "admissible_profile_bounds");
  assert.equal(packet.promotion_authorized, false);
  assert.equal(packet.authorizes_outward_certificate, false);
  assert.equal(packet.authorizes_obstruction_or_channel_decision, false);
  assert.equal(packet.past_profile_bounds.used_as_certificate, true);
  assert.equal(packet.past_profile_bounds.used_as_shared_certificate, false);
  assert.equal(packet.future_profile_admissibility.used_as_certificate, true);
  assert.equal(packet.future_profile_admissibility.used_as_local_certificate, true);
  assert.equal(packet.future_profile_admissibility.used_as_shared_certificate, false);
  assert.equal(packet.retained_root_context.used_as_certificate, false);
  assert.match(
    packet.row_identity.source_artifact_hash,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.row_identity.source_artifact_hash_status,
    "source_identity_digest_only_not_interval_certificate"
  );
  assert.equal(
    packet.past_profile.source_identity.status,
    "source_identity_digest_only_not_interval_certificate"
  );
  assert.equal(
    packet.past_profile.source_identity.artifact_id,
    "a1_endpoint_slope_cancel_source_identity.v0"
  );
  assert.equal(
    packet.past_profile.source_identity.payload_diagnostic_mode,
    "a1_endpoint_slope_cancel_source_identity"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.target_status,
    "certificate_target_only_not_interval_certificate"
  );
  assert.equal(
    packet.past_profile.coefficient_interval_enclosure_attempt_summary.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    packet.past_profile.coefficient_interval_enclosure_attempt_summary.status,
    "float64_nextafter_enclosure_attempt_not_directed_rounding_certificate"
  );
  assert.equal(
    packet.past_profile.coefficient_interval_enclosure_attempt_summary
      .total_coefficient_intervals,
    42
  );
  assert.equal(
    packet.past_profile.coefficient_interval_enclosure_attempt_summary.used_as_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.coefficient_interval_enclosure
      .status,
    "float64_nextafter_enclosure_attempt_present_not_certificate"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.coefficient_interval_enclosure
      .attempt_total_coefficient_intervals,
    42
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.coefficient_interval_enclosure
      .used_as_certificate,
    false
  );
  assert.equal(
    packet.past_profile.interval_box_attempt_summary.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    packet.past_profile.interval_box_attempt_summary.box_id,
    "past_profile_interval_box"
  );
  assert.match(
    packet.past_profile.interval_box_attempt_summary.subdivision_tree_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.match(
    packet.past_profile.interval_box_attempt_summary.attempt_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.past_profile.interval_box_attempt_summary.status,
    "past_profile_interval_box_float64_attempt_not_certificate"
  );
  assert.equal(
    packet.past_profile.interval_box_attempt_summary.used_as_certificate,
    false
  );
  assert.equal(
    packet.past_profile.interval_box_attempt_summary.subinterval_count,
    4096
  );
  assert.equal(
    packet.past_profile.interval_box_attempt_summary.control_point_count,
    61440
  );
  assert.deepEqual(
    packet.past_profile.interval_box_certificate_summary.q_interval,
    [
      packet.past_profile_bounds.outward_q_min,
      packet.past_profile_bounds.outward_q_max,
    ]
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary.status,
    "past_profile_interval_box_certificate_local_only_not_shared_certificate"
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary.method,
    "exact_rational_subdivided_bernstein_float64_nextafter_certificate"
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary.control_point_count,
    61440
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary
      .all_control_point_intervals_enclose_exact,
    true
  );
  assert.match(
    packet.past_profile.interval_box_certificate_summary
      .control_point_interval_payload_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.match(
    packet.past_profile.interval_box_certificate_summary.certificate_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary
      .used_as_certificate,
    true
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary
      .used_as_local_certificate,
    true
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary
      .used_as_shared_certificate,
    false
  );
  assert.equal(
    packet.past_profile.interval_box_certificate_summary
      .authorizes_outward_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes.status,
    "past_and_future_interval_box_certificates_present_not_shared_certificate"
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .attempt_box_ids_present,
    ["past_profile_interval_box"]
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .missing_box_ids,
    ["retained_root_interval_boxes", "inactive_cover_interval_boxes"]
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .local_certificate_box_ids_present,
    ["past_profile_interval_box", "future_transport_interval_box"]
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .past_profile_interval_box_attempt_digest,
    packet.past_profile.interval_box_attempt_summary.attempt_digest
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .past_profile_interval_box_certificate_digest,
    packet.past_profile.interval_box_certificate_summary.certificate_digest
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .past_profile_interval_box_certificate_used_locally,
    true
  );
  assert.match(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .future_transport_interval_box_certificate_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .future_transport_interval_box_certificate_digest,
    packet.future_profile_admissibility.local_certificate.certificate_digest
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .future_transport_interval_box_certificate_status,
    "future_piecewise_linear_profile_box_local_certificate_not_shared_transport_certificate"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .future_transport_interval_box_certificate_used_locally,
    true
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .future_transport_outward_for_continuous_transport_equation,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay.schema,
    "architrino.priority.master_equation_closure.a1_retained_root_window_sign_bracket_sample_replay.v0"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay.status,
    "sampled_retained_root_window_sign_brackets_present_not_interval_boxes"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay.sampled_bracket_count,
    12
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay.sampled_brackets_verified,
    true
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay.bounds_retained_root_interval_boxes,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay.used_as_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.schema,
    "architrino.priority.master_equation_closure.a1_inactive_cover_global_root_exclusion_sample_replay.v0"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.status,
    "sampled_inactive_cover_global_roots_excluded_not_interval_boxes"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.sampled_expected_global_counts,
    true
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.sampled_inactive_root_count,
    0
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.sampled_root_to_retained_window_matches,
    12
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.bounds_inactive_cover_interval_boxes,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay.used_as_certificate,
    false
  );
  const retainedRootInactiveCoverTarget =
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_inactive_cover_interval_box_target;
  assert.equal(
    retainedRootInactiveCoverTarget.schema,
    "architrino.priority.master_equation_closure.a1_retained_root_inactive_cover_interval_box_target.v0"
  );
  assert.equal(
    retainedRootInactiveCoverTarget.status,
    "target_only_retained_root_inactive_cover_interval_boxes_absent"
  );
  assert.equal(
    retainedRootInactiveCoverTarget.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    packet.row_identity.inactive_cover_id,
    retainedRootInactiveCoverTarget.inactive_cover_id
  );
  assert.deepEqual(retainedRootInactiveCoverTarget.theta_interval, [0, 0.02]);
  assert.equal(retainedRootInactiveCoverTarget.radius_b, 0.001);
  assert.equal(
    retainedRootInactiveCoverTarget.retained_root_endpoint_sign_obligations
      .length,
    4
  );
  assert.equal(
    retainedRootInactiveCoverTarget.retained_root_jacobian_floor_obligations
      .length,
    4
  );
  assert.ok(
    retainedRootInactiveCoverTarget.inactive_cover_no_root_obligations.length >
      0
  );
  assert.equal(
    retainedRootInactiveCoverTarget.bounds_retained_root_interval_boxes,
    false
  );
  assert.equal(
    retainedRootInactiveCoverTarget.bounds_inactive_cover_interval_boxes,
    false
  );
  assert.equal(retainedRootInactiveCoverTarget.used_as_certificate, false);
  assert.equal(
    retainedRootInactiveCoverTarget.authorizes_outward_certificate,
    false
  );
  assert.equal(
    retainedRootInactiveCoverTarget.authorizes_obstruction_or_channel_decision,
    false
  );
  assert.equal(
    Object.keys(retainedRootInactiveCoverTarget).some((key) =>
      key.startsWith("sampled_")
    ),
    false
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .missing_box_ids,
    ["retained_root_interval_boxes", "inactive_cover_interval_boxes"]
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .used_as_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.bernstein_control_point_proof
      .status,
    "past_profile_bernstein_certificate_present_not_shared_certificate"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.bernstein_control_point_proof
      .subdivision_tree_digest_attempt,
    packet.past_profile.interval_box_attempt_summary.subdivision_tree_digest
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.bernstein_control_point_proof
      .certificate_digest,
    packet.past_profile.interval_box_certificate_summary.certificate_digest
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.bernstein_control_point_proof
      .local_certificate_used,
    true
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.used_as_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.authorizes_outward_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target
      .authorizes_obstruction_or_channel_decision,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .status,
    "backend_target_self_audit_passed_not_shared_certificate"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .backend_id,
    "a1_directed_rounding_interval_backend"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .required_method,
    "directed_rounding_interval_arithmetic"
  );
  assert.match(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .target_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .target_digest,
    packet.past_profile.directed_rounding_backend_target_summary.target_digest
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .required_capabilities,
    packet.past_profile.directed_rounding_backend_target_summary
      .required_capabilities
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .capability_probe_status,
    "float64_probe_present_not_directed_rounding_backend"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .used_as_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .self_audit_status,
    "directed_rounding_backend_self_audit_passed_not_shared_interval_box_certificate"
  );
  assert.match(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .self_audit_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .self_audit_digest,
    packet.past_profile.directed_rounding_backend_self_audit_summary
      .self_audit_digest
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .self_audit_rows_passed,
    packet.past_profile.directed_rounding_backend_self_audit_summary.rows_passed
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .self_audit_rows_failed,
    0
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .audited_capabilities,
    [
      "outward_rounded_coefficient_interval_rows",
      "outward_rounded_bernstein_subdivision_control_points",
      "rounding_mode_audit_trail",
    ]
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .unaudited_capabilities,
    ["shared_interval_box_family_for_past_future_roots_and_inactive_cover"]
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.directed_rounding_backend
      .authorizes_outward_certificate,
    false
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_target_summary.status,
    "directed_rounding_backend_target_declared_probe_not_certificate"
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_target_summary
      .current_runtime_probe.directed_rounding_backend_available,
    false
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_target_summary
      .current_runtime_probe.directed_rounding_mode_audit_trail_available,
    false
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_target_summary
      .used_as_certificate,
    false
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary.status,
    "directed_rounding_backend_self_audit_passed_not_shared_interval_box_certificate"
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary.method,
    "exact_rational_float64_nextafter_outward_self_audit"
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary.row_count,
    packet.past_profile.directed_rounding_backend_self_audit_summary.rows_passed
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary.rows_failed,
    0
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary
      .rounding_policy.audit_trail_available,
    true
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary
      .rounding_policy.hardware_rounding_mode_control,
    false
  );
  assert.equal(
    packet.past_profile.directed_rounding_backend_self_audit_summary
      .used_as_certificate,
    false
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.future_transport_constants
      .required_constants[0],
    "E_Q_plus_b"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.future_transport_constants
      .status,
    "target_only_future_continuous_transport_bounds_absent"
  );
  assert.equal(
    packet.shared_interval_box_certificate_target.future_transport_constants
      .first_missing_evidence_object,
    "a1_future_continuous_transport_bounds/v0"
  );
  const futureContinuousTarget =
    packet.shared_interval_box_certificate_target.future_transport_constants
      .future_continuous_transport_bounds_target;
  assert.equal(
    futureContinuousTarget.schema,
    "architrino.priority.master_equation_closure.a1_future_continuous_transport_bounds_target.v0"
  );
  assert.equal(
    futureContinuousTarget.status,
    "target_only_future_continuous_transport_bounds_absent"
  );
  assert.equal(
    futureContinuousTarget.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.deepEqual(
    futureContinuousTarget.same_box_binding.required_box_ids,
    [
      "past_profile_interval_box",
      "future_transport_interval_box",
      "retained_root_interval_boxes",
      "inactive_cover_interval_boxes",
    ]
  );
  assert.equal(
    futureContinuousTarget.local_certificate_inputs
      .future_bounds_emitted_piecewise_linear_profile,
    true
  );
  assert.equal(
    futureContinuousTarget.local_certificate_inputs
      .future_bounds_continuous_transport_equation,
    false
  );
  assert.equal(futureContinuousTarget.emits_E_Q_plus_b, false);
  assert.equal(futureContinuousTarget.used_as_certificate, false);
  assert.equal(futureContinuousTarget.authorizes_outward_certificate, false);
  assert.equal(
    futureContinuousTarget.disallowed_evidence_sources.includes(
      "q_prime_auxiliary_interpolant"
    ),
    true
  );
  const futureContinuousAttempt =
    packet.future_continuous_transport_bounds_attempt;
  assert.equal(
    futureContinuousAttempt.schema,
    "architrino.priority.master_equation_closure.a1_future_continuous_transport_bounds_attempt.v0"
  );
  assert.equal(
    futureContinuousAttempt.artifact_id,
    "a1_future_continuous_transport_bounds_attempt.v0"
  );
  assert.match(futureContinuousAttempt.attempt_digest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(
    futureContinuousAttempt.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    futureContinuousAttempt.source_node_certificate.certificate_digest,
    packet.future_profile_admissibility.local_certificate.certificate_digest
  );
  assert.equal(futureContinuousAttempt.node_certificate_consumed, true);
  assert.equal(
    futureContinuousAttempt.node_certificate_consistency
      .theta_nodes_match_profile,
    true
  );
  assert.equal(
    futureContinuousAttempt.node_certificate_consistency.q_nodes_match_profile,
    true
  );
  assert.equal(
    futureContinuousAttempt.node_certificate_consistency
      .q_prime_nodes_match_profile,
    true
  );
  assert.equal(futureContinuousAttempt.transport_step_count, 16);
  assert.equal(futureContinuousAttempt.transport_rows.length, 16);
  assert.equal(
    futureContinuousAttempt.transport_rows.every(
      (row) =>
        row.transport_rhs_interval_enclosure.rhs_function ===
        "tangential_transport_derivative"
    ),
    true
  );
  assert.equal(
    futureContinuousAttempt.transport_rows.every(
      (row) => row.transport_rhs_interval_enclosure.sample_count === 5
    ),
    true
  );
  assert.equal(
    futureContinuousAttempt.continuous_profile_defect_bound.sample_count,
    80
  );
  assert.equal(
    futureContinuousAttempt.continuous_profile_defect_bound
      .sampled_retained_labels_match_retained_set,
    true
  );
  assert.ok(
    futureContinuousAttempt.continuous_profile_defect_bound.defect_sup_upper > 0
  );
  assert.ok(
    futureContinuousAttempt.continuous_profile_defect_bound.defect_sup_upper <
      0.003
  );
  assert.ok(
    futureContinuousAttempt.continuous_profile_defect_bound
      .integrated_l1_defect_upper > 0
  );
  assert.ok(
    futureContinuousAttempt.continuous_profile_defect_bound
      .integrated_l1_defect_upper < 0.00006
  );
  assert.equal(
    futureContinuousAttempt.first_failure,
    "branch_sum_feedback_bound_missing"
  );
  assert.equal(
    futureContinuousAttempt.gronwall_closure_row.status,
    "branch_sum_feedback_bound_missing"
  );
  assert.equal(futureContinuousAttempt.gronwall_closure_row.K_Q, "absent");
  assert.equal(
    futureContinuousAttempt.gronwall_closure_row.E_Q_plus_b,
    "absent"
  );
  assert.equal(
    futureContinuousAttempt.gronwall_closure_row.required_missing_row,
    "branch_sum_feedback_bound_for_E_Q_plus_b"
  );
  assert.equal(futureContinuousAttempt.bounds_continuous_transport_equation, true);
  assert.equal(
    futureContinuousAttempt.outward_for_continuous_transport_equation,
    false
  );
  assert.equal(futureContinuousAttempt.emits_E_Q_plus_b, false);
  assert.equal(futureContinuousAttempt.used_as_certificate, false);
  assert.equal(futureContinuousAttempt.used_as_shared_certificate, false);
  assert.equal(futureContinuousAttempt.authorizes_outward_certificate, false);
  const branchSumAttempt = packet.branch_sum_feedback_bound_attempt;
  assert.equal(
    branchSumAttempt.schema,
    "architrino.priority.master_equation_closure.a1_branch_sum_feedback_bound_attempt.v0"
  );
  assert.equal(
    branchSumAttempt.artifact_id,
    "a1_branch_sum_feedback_bound_attempt.v0"
  );
  assert.match(branchSumAttempt.attempt_digest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(
    branchSumAttempt.source_artifact_hash,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    branchSumAttempt.source_future_continuous_transport_attempt_digest,
    futureContinuousAttempt.attempt_digest
  );
  assert.equal(branchSumAttempt.nullspace_dimension, 2);
  assert.equal(branchSumAttempt.theta_sample_count, 3);
  assert.equal(branchSumAttempt.sample_count, 6);
  assert.deepEqual(branchSumAttempt.retained_labels, ["P_1", "P_2", "P_3", "S_1"]);
  assert.equal(
    branchSumAttempt.existing_code_paths_sampled.includes("tangent_branch_sums"),
    true
  );
  assert.equal(
    branchSumAttempt.existing_code_paths_sampled.includes(
      "tangent_transport_derivative"
    ),
    true
  );
  assert.equal(
    branchSumAttempt.sample_rows.every(
      (row) => row.summand_rows.length === 4
    ),
    true
  );
  assert.equal(
    branchSumAttempt.sample_rows.every((row) =>
      row.summand_rows.every(
        (summand) =>
          summand.partial_source_function === "branch_partials_with_source_q" &&
          summand.partial_method ===
            "central_float64_finite_difference_not_interval_box" &&
          typeof summand.partials.tangential_delta === "number" &&
          typeof summand.partials.radial_q_source === "number"
      )
    ),
    true
  );
  assert.ok(
    branchSumAttempt.sampled_unit_nullspace_tangent_bounds
      .max_abs_delta_T_Q_per_unit_parameter > 0
  );
  assert.ok(
    branchSumAttempt.sampled_unit_nullspace_tangent_bounds
      .max_abs_delta_B_Q_per_unit_parameter > 0
  );
  const summandDerivativeTarget =
    branchSumAttempt.outward_summand_derivative_boxes_target;
  assert.equal(
    summandDerivativeTarget.schema,
    "architrino.priority.master_equation_closure.a1_outward_summand_derivative_boxes_target.v0"
  );
  assert.equal(
    summandDerivativeTarget.artifact_id,
    "a1_outward_summand_derivative_boxes_target.v0"
  );
  assert.match(summandDerivativeTarget.target_digest, /^sha256:[0-9a-f]{64}$/);
  assert.deepEqual(summandDerivativeTarget.required_labels, [
    "P_1",
    "P_2",
    "P_3",
    "S_1",
  ]);
  assert.deepEqual(
    summandDerivativeTarget.same_box_binding.required_labels,
    summandDerivativeTarget.required_labels
  );
  assert.deepEqual(
    summandDerivativeTarget.same_box_binding.required_box_ids,
    [
      "past_profile_interval_box",
      "future_transport_interval_box",
      "retained_root_interval_boxes",
      "inactive_cover_interval_boxes",
      "outward_summand_derivative_boxes",
    ]
  );
  assert.equal(
    summandDerivativeTarget.same_box_binding.requires_same_theta_box_family,
    true
  );
  assert.equal(
    summandDerivativeTarget.same_box_binding
      .requires_retained_labels_in_same_box_order,
    true
  );
  assert.deepEqual(
    summandDerivativeTarget.derivative_families.map(
      (family) => family.family_id
    ),
    [
      "tangential_summand_partials",
      "radial_summand_partials",
      "retained_root_motion",
      "source_profile_variation",
    ]
  );
  assert.ok(
    summandDerivativeTarget.missing_interval_rows.includes(
      "summand_partial_interval_boxes"
    )
  );
  assert.equal(
    summandDerivativeTarget.first_missing_interval_row,
    "summand_partial_interval_boxes"
  );
  assert.equal(
    summandDerivativeTarget.negative_control_policy
      .sampled_float64_finite_differences,
    "reject_as_certificate"
  );
  assert.ok(
    summandDerivativeTarget.sampled_float64_rejection.rejected_methods.includes(
      "central_float64_finite_difference_not_interval_box"
    )
  );
  assert.ok(
    summandDerivativeTarget.sampled_float64_rejection
      .why_sampled_attempt_cannot_satisfy.length >= 5
  );
  assert.equal(
    summandDerivativeTarget.bounds_outward_summand_derivative_boxes,
    false
  );
  assert.equal(summandDerivativeTarget.emits_K_Q, false);
  assert.equal(summandDerivativeTarget.emits_E_Q_plus_b, false);
  assert.equal(
    summandDerivativeTarget.first_failure,
    "summand_derivative_boxes_absent"
  );
  assert.equal(summandDerivativeTarget.used_as_certificate, false);
  assert.equal(summandDerivativeTarget.authorizes_outward_certificate, false);
  assert.equal(
    branchSumAttempt.target_only_objects
      .outward_summand_derivative_boxes_target_digest,
    summandDerivativeTarget.target_digest
  );
  assert.equal(
    branchSumAttempt.target_only_objects
      .outward_summand_derivative_boxes_target_status,
    summandDerivativeTarget.status
  );
  const summandPartialNegativeControl =
    branchSumAttempt.summand_partial_interval_boxes_negative_control;
  assert.equal(
    summandPartialNegativeControl.schema,
    "architrino.priority.master_equation_closure.a1_summand_partial_interval_boxes_negative_control.v0"
  );
  assert.equal(
    summandPartialNegativeControl.artifact_id,
    "a1_summand_partial_interval_boxes_negative_control.v0"
  );
  assert.match(
    summandPartialNegativeControl.negative_control_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    summandPartialNegativeControl.target_digest,
    summandDerivativeTarget.target_digest
  );
  assert.equal(
    summandPartialNegativeControl.target_first_missing_interval_row,
    "summand_partial_interval_boxes"
  );
  assert.equal(
    summandPartialNegativeControl.sampled_evidence_intake.sample_row_count,
    branchSumAttempt.sample_count
  );
  assert.equal(
    summandPartialNegativeControl.sampled_evidence_intake.summand_row_count,
    branchSumAttempt.sample_count * summandDerivativeTarget.required_labels.length
  );
  assert.equal(summandPartialNegativeControl.required_slot_count, 36);
  assert.equal(summandPartialNegativeControl.failed_slot_count, 36);
  assert.equal(
    summandPartialNegativeControl.slot_matrix.every(
      (slot) =>
        summandDerivativeTarget.required_labels.includes(slot.label) &&
        slot.required_interval_row === "summand_partial_interval_boxes" &&
        slot.slot_satisfied === false &&
        slot.failure === "sampled_value_not_outward_interval_box"
    ),
    true
  );
  assert.equal(
    summandPartialNegativeControl.slot_matrix.some(
      (slot) =>
        slot.required_partial === "partial_T_alpha_partial_delta_alpha" &&
        slot.sampled_method ===
          "central_float64_finite_difference_not_interval_box"
    ),
    true
  );
  assert.equal(
    summandPartialNegativeControl.slot_matrix.some(
      (slot) =>
        slot.required_partial === "memory_variation_interval_operator_bound" &&
        slot.sampled_method ===
          "simpson_memory_integral_sample_replay_not_operator_bound"
    ),
    true
  );
  assert.equal(
    summandPartialNegativeControl.satisfies_summand_partial_interval_boxes,
    false
  );
  assert.equal(
    summandPartialNegativeControl.first_failure,
    "summand_partial_interval_boxes_not_interval_evidence"
  );
  assert.equal(summandPartialNegativeControl.emits_K_Q, false);
  assert.equal(summandPartialNegativeControl.emits_E_Q_plus_b, false);
  assert.equal(summandPartialNegativeControl.used_as_certificate, false);
  assert.equal(
    summandPartialNegativeControl.authorizes_outward_certificate,
    false
  );
  assert.equal(
    branchSumAttempt.target_only_objects
      .summand_partial_interval_boxes_negative_control_digest,
    summandPartialNegativeControl.negative_control_digest
  );
  assert.equal(
    branchSumAttempt.target_only_objects
      .summand_partial_interval_boxes_negative_control_status,
    summandPartialNegativeControl.status
  );
  const oneSlotConstructionAttempt =
    branchSumAttempt.summand_partial_interval_box_one_slot_construction_attempt;
  assert.equal(
    oneSlotConstructionAttempt.schema,
    "architrino.priority.master_equation_closure.a1_summand_partial_interval_box_one_slot_construction_attempt.v0"
  );
  assert.equal(
    oneSlotConstructionAttempt.artifact_id,
    "a1_summand_partial_interval_box_one_slot_construction_attempt.v0"
  );
  assert.match(
    oneSlotConstructionAttempt.construction_attempt_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    oneSlotConstructionAttempt.target_digest,
    summandDerivativeTarget.target_digest
  );
  assert.deepEqual(oneSlotConstructionAttempt.slot, {
    label: "P_1",
    kind: "partner",
    window: [2.55, 2.69],
    family_id: "tangential_summand_partials",
    summand: "T_alpha",
    required_partial: "partial_T_alpha_partial_delta_alpha",
    required_interval_row: "summand_partial_interval_boxes",
    required_output_row: "delta_T_alpha_interval_box",
  });
  assert.equal(oneSlotConstructionAttempt.attempted_slot_count, 1);
  assert.deepEqual(oneSlotConstructionAttempt.formula_target.fixed_variables, [
    "theta",
    "q_source_alpha",
  ]);
  assert.equal(
    oneSlotConstructionAttempt.formula_target.differentiated_variable,
    "delta_alpha"
  );
  assert.ok(
    oneSlotConstructionAttempt.formula_target.required_formula_rows.includes(
      "partial_delta_J_partner_with_source_q_interval_formula"
    )
  );
  assert.equal(
    oneSlotConstructionAttempt.helper_gap.source_q_jacobian_interval_missing,
    false
  );
  assert.equal(
    oneSlotConstructionAttempt.helper_gap
      .delta_partial_interval_automatic_differentiation_missing,
    false
  );
  const formulaDependencyAudit =
    oneSlotConstructionAttempt.formula_dependency_audit;
  assert.equal(
    formulaDependencyAudit.schema,
    "architrino.priority.master_equation_closure.a1_one_slot_formula_dependency_audit.v0"
  );
  assert.equal(
    formulaDependencyAudit.artifact_id,
    "a1_one_slot_formula_dependency_audit.v0"
  );
  assert.match(formulaDependencyAudit.audit_digest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(
    formulaDependencyAudit.first_missing_row,
    "P_1_retained_root_delta_alpha_interval_box"
  );
  assert.equal(
    formulaDependencyAudit.emits_local_formula_interval_probe,
    true
  );
  assert.equal(formulaDependencyAudit.emits_one_slot_interval_box, false);
  assert.equal(
    formulaDependencyAudit.delta_interval_source
      .satisfies_retained_root_delta_alpha_interval_box,
    false
  );
  assert.equal(
    formulaDependencyAudit.q_source_interval_source
      .satisfies_P_1_q_source_alpha_interval_box,
    false
  );
  assert.deepEqual(
    formulaDependencyAudit.q_source_interval_source.q_interval,
    packet.past_profile.interval_box_certificate_summary.q_interval
  );
  assert.equal(
    formulaDependencyAudit.local_interval_formula_probe.formula_available,
    true
  );
  assert.equal(
    formulaDependencyAudit.local_interval_formula_probe.J_partner_sign,
    "positive"
  );
  assert.ok(
    formulaDependencyAudit.local_interval_formula_probe
      .abs_J_partner_interval_floor > 0
  );
  assert.ok(
    formulaDependencyAudit.local_interval_formula_probe
      .partial_delta_J_partner_with_source_q_interval.lower <
      formulaDependencyAudit.local_interval_formula_probe
        .partial_delta_J_partner_with_source_q_interval.upper
  );
  assert.ok(
    formulaDependencyAudit.local_interval_formula_probe
      .partial_T_alpha_partial_delta_alpha_interval.lower <
      formulaDependencyAudit.local_interval_formula_probe
        .partial_T_alpha_partial_delta_alpha_interval.upper
  );
  assert.equal(
    formulaDependencyAudit.sampled_partial_containment
      .sampled_partials_inside_formula_interval,
    true
  );
  assert.equal(
    formulaDependencyAudit.sampled_partial_containment
      .accepted_as_interval_evidence,
    false
  );
  assert.ok(
    formulaDependencyAudit.dependency_rows.some(
      (row) =>
        row.row === "partial_delta_J_partner_with_source_q_interval_formula" &&
        row.status === "local_interval_formula_present" &&
        row.used_as_certificate === false
    )
  );
  assert.equal(
    oneSlotConstructionAttempt.sampled_reference_readout.sampled_row_count,
    branchSumAttempt.sample_count
  );
  assert.equal(
    oneSlotConstructionAttempt.sampled_reference_readout.sampled_rows.every(
      (row) =>
        row.partial_method ===
        "central_float64_finite_difference_not_interval_box"
    ),
    true
  );
  assert.equal(
    oneSlotConstructionAttempt.sampled_reference_readout
      .accepted_as_interval_evidence,
    false
  );
  assert.equal(
    oneSlotConstructionAttempt.construction_status
      .emits_one_slot_interval_box,
    false
  );
  assert.equal(
    oneSlotConstructionAttempt.construction_status
      .emits_local_formula_interval_probe,
    true
  );
  assert.equal(
    oneSlotConstructionAttempt.construction_status.satisfies_selected_slot,
    false
  );
  assert.equal(
    oneSlotConstructionAttempt.construction_status.first_missing_interval_input,
    "P_1_retained_root_delta_alpha_interval_box"
  );
  assert.equal(
    oneSlotConstructionAttempt.construction_status.first_missing_formula_row,
    null
  );
  assert.equal(
    oneSlotConstructionAttempt.construction_status
      .first_missing_backend_capability,
    "shared_directed_rounding_audit_trail_for_source_q_derivative_composition"
  );
  assert.equal(
    oneSlotConstructionAttempt.first_failure,
    "one_slot_retained_root_delta_interval_source_missing"
  );
  assert.equal(oneSlotConstructionAttempt.emits_K_Q, false);
  assert.equal(oneSlotConstructionAttempt.emits_E_Q_plus_b, false);
  assert.equal(oneSlotConstructionAttempt.used_as_certificate, false);
  assert.equal(
    oneSlotConstructionAttempt.authorizes_outward_certificate,
    false
  );
  assert.equal(
    branchSumAttempt.target_only_objects
      .summand_partial_interval_box_one_slot_construction_attempt_digest,
    oneSlotConstructionAttempt.construction_attempt_digest
  );
  assert.equal(
    branchSumAttempt.target_only_objects
      .summand_partial_interval_box_one_slot_construction_attempt_status,
    oneSlotConstructionAttempt.status
  );
  assert.equal(branchSumAttempt.target_constants.K_Q, "absent");
  assert.equal(branchSumAttempt.target_constants.E_Q_plus_b, "absent");
  assert.equal(branchSumAttempt.emits_K_Q, false);
  assert.equal(branchSumAttempt.emits_E_Q_plus_b, false);
  assert.equal(
    branchSumAttempt.bounds_branch_sum_feedback_for_admissible_class,
    false
  );
  assert.equal(
    branchSumAttempt.required_missing_evidence_objects.includes(
      "outward_summand_derivative_boxes"
    ),
    true
  );
  assert.equal(
    branchSumAttempt.first_failure,
    "summand_derivative_boxes_absent"
  );
  assert.equal(branchSumAttempt.used_as_certificate, false);
  assert.equal(branchSumAttempt.used_as_shared_certificate, false);
  assert.equal(branchSumAttempt.authorizes_outward_certificate, false);
  assert.equal(
    packet.future_profile_admissibility.branch_sum_feedback_attempt_digest,
    branchSumAttempt.attempt_digest
  );
  assert.equal(
    packet.future_profile_admissibility.branch_sum_feedback_attempt_status,
    branchSumAttempt.status
  );
  assert.equal(
    packet.certificate_composition_readiness.schema,
    "architrino.priority.master_equation_closure.a1_certificate_composition_readiness.v0"
  );
  assert.equal(
    packet.certificate_composition_readiness.status,
    "composition_readiness_open_local_certificates_present_future_continuous_transport_and_same_box_rows_absent"
  );
  assert.equal(
    packet.certificate_composition_readiness.first_missing_evidence_object,
    "a1_future_continuous_transport_bounds/v0"
  );
  assert.equal(packet.certificate_composition_readiness.used_as_certificate, false);
  assert.equal(
    packet.certificate_composition_readiness.authorizes_outward_certificate,
    false
  );
  assert.deepEqual(
    packet.certificate_composition_readiness.local_certificate_inputs
      .local_certificate_box_ids_present,
    ["past_profile_interval_box", "future_transport_interval_box"]
  );
  assert.deepEqual(
    packet.certificate_composition_readiness.missing_certificate_grade_objects,
    [
      "future_continuous_transport_bounds",
      "E_Q_plus_b_outward_bound",
      "retained_root_interval_boxes",
      "inactive_cover_interval_boxes",
      "branch_sum_constants",
      "transport_constants",
      "residual_envelope",
    ]
  );
  assert.equal(packet.past_profile.source_identity.used_as_certificate, false);
  assert.equal(packet.past_profile.source_identity.constraint_row_count, 12);
  assert.equal(packet.past_profile.source_identity.constraint_column_count, 14);
  assert.deepEqual(
    packet.past_profile.source_identity.canonical_payload_fields,
    [
      "base_coefficients",
      "basis_scale",
      "candidate",
      "coefficients",
      "constraint_rhs",
      "constraint_rows",
      "construction_summary",
      "degree",
      "past_profile_kind",
      "perturbation",
      "radius_b",
      "retained_deltas",
      "schema",
      "sensitivity",
      "source_object",
    ]
  );
  assert.equal(
    packet.past_profile_bounds.status,
    "past_profile_exact_rational_bernstein_certificate_local_only_not_shared"
  );
  assert.deepEqual(
    packet.past_profile_bounds.local_certificate,
    packet.past_profile.interval_box_certificate_summary
  );
  assert.equal(
    packet.past_profile_bounds.outward_attempt.method,
    "subdivided_bernstein_convex_hull_float64"
  );
  assert.equal(packet.past_profile_bounds.outward_attempt.subdivision_depth, 12);
  assert.equal(
    packet.past_profile_bounds.outward_attempt.subinterval_count,
    4096
  );
  assert.ok(packet.past_profile_bounds.outward_q_min > 0.65);
  assert.ok(
    packet.past_profile_bounds.outward_q_min
      < packet.past_profile_bounds.sampled_seed_q_min
  );
  assert.ok(
    packet.past_profile_bounds.outward_q_max
      > packet.past_profile_bounds.sampled_seed_q_max
  );
  assert.ok(packet.past_profile_bounds.H_b > 0.53);
  assert.equal(
    packet.past_profile_bounds.H_b,
    packet.past_profile.interval_box_certificate_summary.H_b_upper
  );
  assert.equal(packet.past_profile_bounds.used_as_certificate, true);
  assert.equal(packet.past_profile_bounds.used_as_shared_certificate, false);
  assert.equal(
    packet.future_profile_admissibility.status,
    "future_piecewise_linear_profile_box_local_certificate_not_shared_transport_certificate"
  );
  assert.deepEqual(packet.future_profile_admissibility.local_certificate.q_interval, [
    packet.future_profile_admissibility.outward_q_min,
    packet.future_profile_admissibility.outward_q_max,
  ]);
  assert.deepEqual(
    packet.future_profile_admissibility.local_certificate
      .q_prime_auxiliary_interval,
    [
      packet.future_profile_admissibility.outward_q_prime_auxiliary_min,
      packet.future_profile_admissibility.outward_q_prime_auxiliary_max,
    ]
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.schema,
    "architrino.priority.master_equation_closure.a1_future_piecewise_linear_profile_box_certificate.v0"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.artifact_id,
    "a1_future_piecewise_linear_profile_box_certificate.v0"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.box_id,
    "future_transport_interval_box"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .past_profile_certificate_digest,
    packet.past_profile.interval_box_certificate_summary.certificate_digest
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.transport_profile_kind,
    "retained_memory_tangential_transport_sampled"
  );
  assert.deepEqual(
    packet.future_profile_admissibility.local_certificate.theta_interval,
    packet.row_identity.theta_interval
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.transport_steps,
    16
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.node_count,
    17
  );
  assert.match(
    packet.future_profile_admissibility.local_certificate.node_payload_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.interpolation_kind,
    "piecewise_linear_float64_nodes"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.q_prime_semantics,
    "auxiliary_transport_derivative_interpolant_not_derivative_of_piecewise_linear_q"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .bounds_emitted_piecewise_linear_profile,
    true
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .outward_for_emitted_piecewise_linear_profile,
    true
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .bounds_continuous_transport_equation,
    false
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .outward_for_continuous_transport_equation,
    false
  );
  assert.equal(
    packet.future_profile_admissibility.continuous_transport_attempt_digest,
    futureContinuousAttempt.attempt_digest
  );
  assert.equal(
    packet.future_profile_admissibility.continuous_transport_attempt_status,
    futureContinuousAttempt.status
  );
  assert.equal(
    packet.future_profile_admissibility.bounds_continuous_transport_equation,
    true
  );
  assert.equal(
    packet.future_profile_admissibility.outward_for_continuous_transport_equation,
    false
  );
  assert.equal(
    packet.future_profile_admissibility.continuous_transport_defect_sup_upper,
    futureContinuousAttempt.continuous_profile_defect_bound.defect_sup_upper
  );
  assert.equal(packet.future_profile_admissibility.E_Q_plus_b, "absent");
  assert.equal(
    packet.future_profile_admissibility.E_Q_plus_b_status,
    "branch_sum_feedback_bound_missing"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .E_Q_plus_b_for_admissible_class,
    "absent"
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate.used_as_certificate,
    true
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .used_as_local_certificate,
    true
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .used_as_shared_certificate,
    false
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .authorizes_outward_certificate,
    false
  );
  assert.equal(
    packet.future_profile_admissibility.local_certificate
      .authorizes_obstruction_or_channel_decision,
    false
  );
  assert.equal(
    packet.retained_root_context.status,
    "sampled_retained_root_window_replay_not_interval_box_certificate"
  );
  assert.equal(
    packet.retained_root_context.sampled_global_counts_3_plus_1,
    true
  );
  assert.ok(packet.retained_root_context.sampled_min_retained_window_clearance > 0);
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.schema,
    "architrino.priority.master_equation_closure.a1_retained_root_window_sample_replay.v0"
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.artifact_id,
    "a1_retained_root_window_sample_replay.v0"
  );
  assert.match(
    packet.retained_root_context.root_window_sample_replay.replay_digest,
    /^sha256:[0-9a-f]{64}$/
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.status,
    packet.retained_root_context.status
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.theta_samples,
    3
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.retained_rows.length,
    12
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.global_counts.length,
    3
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay
      .sampled_active_labels_match_retained_set,
    true
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay
      .sampled_global_counts_3_plus_1,
    true
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay
      .bounds_retained_root_interval_boxes,
    false
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay
      .bounds_inactive_cover_interval_boxes,
    false
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay.used_as_certificate,
    false
  );
  assert.equal(
    packet.retained_root_context.root_window_sample_replay
      .authorizes_outward_certificate,
    false
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.schema,
    "architrino.priority.master_equation_closure.a1_retained_root_window_sign_bracket_sample_replay.v0"
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.status,
    "sampled_retained_root_window_sign_brackets_present_not_interval_boxes"
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.sampled_bracket_count,
    12
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.bracket_rows.length,
    12
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.failures.length,
    0
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.bracket_rows.every(
      (row) => row.sign_change_or_endpoint_zero === true
    ),
    true
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay
      .bounds_retained_root_interval_boxes,
    false
  );
  assert.equal(
    packet.retained_root_context.root_window_sign_bracket_replay.used_as_certificate,
    false
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay.schema,
    "architrino.priority.master_equation_closure.a1_inactive_cover_global_root_exclusion_sample_replay.v0"
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay.status,
    "sampled_inactive_cover_global_roots_excluded_not_interval_boxes"
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay.rows.length,
    6
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay
      .sampled_expected_global_counts,
    true
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay
      .sampled_inactive_root_count,
    0
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay.failures.length,
    0
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay
      .roots_outside_retained_windows.length,
    0
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay
      .bounds_inactive_cover_interval_boxes,
    false
  );
  assert.equal(
    packet.retained_root_context.inactive_cover_exclusion_replay
      .used_as_certificate,
    false
  );
  assert.equal(packet.sampled_attempt_reading, "sampled_bounds_within_declared_convention");
  assert.equal(
    packet.retained_root_context.sampled_active_labels_match_retained_set,
    true
  );
  assert.equal(packet.reduced_smoke_context.used_as_certificate, false);
  assert.equal(packet.reduced_smoke_context.recomputed_by_this_mode, false);
  assert.ok(
    packet.blocked_rows.includes(
      "past_profile_interval_box_certificate_not_shared_certificate"
    )
  );
  assert.ok(
    packet.blocked_rows.includes(
      "future_piecewise_linear_profile_box_certificate_not_shared_certificate"
    )
  );
  assert.ok(
    packet.blocked_rows.includes(
      "future_continuous_transport_bounds_attempt_not_shared_certificate"
    )
  );
  assert.ok(
    packet.blocked_rows.includes("branch_sum_feedback_bound_attempt_not_certificate")
  );
  assert.ok(
    packet.blocked_rows.includes("branch_sum_feedback_bound_missing")
  );
  assert.equal(
    packet.blocked_rows.includes(
      "future_piecewise_linear_profile_box_local_certificate_not_continuous_transport_certificate"
    ),
    false
  );
  assert.equal(
    packet.blocked_rows.includes("continuous_transport_equation_bounds_absent"),
    false
  );
  assert.equal(
    packet.blocked_rows.includes("E_Q_plus_b_absent_for_admissible_class"),
    false
  );
  assert.ok(
    packet.blocked_rows.includes("inactive_cover_interval_boxes_absent")
  );
  assert.equal(packet.blocked_rows.includes("inactive_cover_id_absent"), false);
  assert.ok(
    packet.blocked_rows.includes(
      "source_identity_digest_not_shared_interval_box_certificate"
    )
  );
  assert.ok(
    packet.blocked_rows.includes(
      "directed_rounding_backend_self_audit_not_shared_certificate"
    )
  );
  assert.ok(
    packet.blocked_rows.includes(
      "past_profile_interval_box_certificate_not_shared_certificate"
    )
  );
});

test("A1 source identity diagnostic reproduces the admissible profile digest", () => {
  const packet = runA1Diagnostic("a1_admissible_profile_bounds_attempt");
  const sourceIdentity = runA1Diagnostic(
    "a1_endpoint_slope_cancel_source_identity"
  );

  assert.equal(
    sourceIdentity.schema,
    "architrino.priority.master_equation_closure.a1_endpoint_slope_cancel_source_identity.v0"
  );
  assert.equal(
    sourceIdentity.artifact_id,
    "a1_endpoint_slope_cancel_source_identity.v0"
  );
  assert.equal(
    sourceIdentity.status,
    "source_identity_payload_only_not_interval_box_certificate"
  );
  assert.equal(sourceIdentity.used_as_certificate, false);
  assert.equal(sourceIdentity.authorizes_outward_certificate, false);
  assert.equal(
    sourceIdentity.authorizes_obstruction_or_channel_decision,
    false
  );
  assert.equal(
    sourceIdentity.digest,
    packet.row_identity.source_artifact_hash
  );
  assert.equal(
    sourceIdentity.digest,
    packet.past_profile.source_identity.digest
  );
  assert.deepEqual(
    sourceIdentity.canonical_payload_fields,
    packet.past_profile.source_identity.canonical_payload_fields
  );
  assert.deepEqual(
    sourceIdentity.shared_interval_box_certificate_target,
    withoutAdmissibilityOnlyReplays(packet.shared_interval_box_certificate_target)
  );
  assert.deepEqual(
    sourceIdentity.certificate_composition_readiness,
    packet.certificate_composition_readiness
  );
  assert.equal(
    sourceIdentity.shared_interval_box_certificate_target.shared_interval_boxes
      .retained_root_window_bracket_replay,
    undefined
  );
  assert.equal(
    sourceIdentity.shared_interval_box_certificate_target.shared_interval_boxes
      .inactive_cover_exclusion_replay,
    undefined
  );
  assert.deepEqual(
    {
      schema: sourceIdentity.directed_rounding_backend_target.schema,
      artifact_id: sourceIdentity.directed_rounding_backend_target.artifact_id,
      backend_id: sourceIdentity.directed_rounding_backend_target.backend_id,
      source_artifact_hash:
        sourceIdentity.directed_rounding_backend_target.source_artifact_hash,
      required_method:
        sourceIdentity.directed_rounding_backend_target.required_method,
      required_rounding_modes:
        sourceIdentity.directed_rounding_backend_target.required_rounding_modes,
      required_capabilities:
        sourceIdentity.directed_rounding_backend_target.required_capabilities,
      current_runtime_probe:
        sourceIdentity.directed_rounding_backend_target.current_runtime_probe,
      target_digest:
        sourceIdentity.directed_rounding_backend_target.target_digest,
      used_as_certificate:
        sourceIdentity.directed_rounding_backend_target.used_as_certificate,
      authorizes_outward_certificate:
        sourceIdentity.directed_rounding_backend_target
          .authorizes_outward_certificate,
      authorizes_obstruction_or_channel_decision:
        sourceIdentity.directed_rounding_backend_target
          .authorizes_obstruction_or_channel_decision,
      status: sourceIdentity.directed_rounding_backend_target.status,
    },
    packet.past_profile.directed_rounding_backend_target_summary
  );
  assert.deepEqual(
    {
      schema: sourceIdentity.directed_rounding_backend_self_audit.schema,
      artifact_id:
        sourceIdentity.directed_rounding_backend_self_audit.artifact_id,
      source_artifact_hash:
        sourceIdentity.directed_rounding_backend_self_audit
          .source_artifact_hash,
      backend_target_digest:
        sourceIdentity.directed_rounding_backend_self_audit
          .backend_target_digest,
      backend_id: sourceIdentity.directed_rounding_backend_self_audit.backend_id,
      method: sourceIdentity.directed_rounding_backend_self_audit.method,
      rounding_policy:
        sourceIdentity.directed_rounding_backend_self_audit.rounding_policy,
      audited_capabilities:
        sourceIdentity.directed_rounding_backend_self_audit
          .audited_capabilities,
      unaudited_capabilities:
        sourceIdentity.directed_rounding_backend_self_audit
          .unaudited_capabilities,
      row_count: sourceIdentity.directed_rounding_backend_self_audit.row_count,
      rows_passed:
        sourceIdentity.directed_rounding_backend_self_audit.rows_passed,
      rows_failed:
        sourceIdentity.directed_rounding_backend_self_audit.rows_failed,
      self_audit_digest:
        sourceIdentity.directed_rounding_backend_self_audit.self_audit_digest,
      used_as_certificate:
        sourceIdentity.directed_rounding_backend_self_audit.used_as_certificate,
      authorizes_outward_certificate:
        sourceIdentity.directed_rounding_backend_self_audit
          .authorizes_outward_certificate,
      authorizes_obstruction_or_channel_decision:
        sourceIdentity.directed_rounding_backend_self_audit
          .authorizes_obstruction_or_channel_decision,
      status: sourceIdentity.directed_rounding_backend_self_audit.status,
    },
    packet.past_profile.directed_rounding_backend_self_audit_summary
  );
  assert.equal(sourceIdentity.directed_rounding_backend_self_audit.rows.length, 7);
  assert.equal(
    sourceIdentity.directed_rounding_backend_self_audit.rows.every(
      (row) =>
        row.row_pass &&
        row.directed_interval.lower_leq_exact &&
        row.directed_interval.exact_leq_upper &&
        row.computed_float_inside_directed_interval
    ),
    true
  );
  assert.deepEqual(
    {
      schema: sourceIdentity.coefficient_interval_enclosure_attempt.schema,
      source_artifact_hash:
        sourceIdentity.coefficient_interval_enclosure_attempt.source_artifact_hash,
      method: sourceIdentity.coefficient_interval_enclosure_attempt.method,
      row_count: sourceIdentity.coefficient_interval_enclosure_attempt.row_count,
      total_coefficient_intervals:
        sourceIdentity.coefficient_interval_enclosure_attempt
          .total_coefficient_intervals,
      max_interval_width:
        sourceIdentity.coefficient_interval_enclosure_attempt.max_interval_width,
      used_as_certificate:
        sourceIdentity.coefficient_interval_enclosure_attempt.used_as_certificate,
      status: sourceIdentity.coefficient_interval_enclosure_attempt.status,
    },
    packet.past_profile.coefficient_interval_enclosure_attempt_summary
  );
  assert.deepEqual(
    {
      schema: sourceIdentity.past_profile_interval_box_attempt.schema,
      box_id: sourceIdentity.past_profile_interval_box_attempt.box_id,
      source_artifact_hash:
        sourceIdentity.past_profile_interval_box_attempt.source_artifact_hash,
      method: sourceIdentity.past_profile_interval_box_attempt.method,
      subdivision_depth:
        sourceIdentity.past_profile_interval_box_attempt.subdivision_depth,
      subinterval_count:
        sourceIdentity.past_profile_interval_box_attempt.subinterval_count,
      control_point_count:
        sourceIdentity.past_profile_interval_box_attempt.control_point_count,
      subdivision_tree_digest:
        sourceIdentity.past_profile_interval_box_attempt.subdivision_tree_digest,
      attempt_digest:
        sourceIdentity.past_profile_interval_box_attempt.attempt_digest,
      q_interval: sourceIdentity.past_profile_interval_box_attempt.q_interval,
      H_b: sourceIdentity.past_profile_interval_box_attempt.H_b,
      used_as_certificate:
        sourceIdentity.past_profile_interval_box_attempt.used_as_certificate,
      status: sourceIdentity.past_profile_interval_box_attempt.status,
    },
    packet.past_profile.interval_box_attempt_summary
  );
  assert.deepEqual(
    {
      schema: sourceIdentity.past_profile_interval_box_certificate.schema,
      artifact_id:
        sourceIdentity.past_profile_interval_box_certificate.artifact_id,
      box_id: sourceIdentity.past_profile_interval_box_certificate.box_id,
      source_artifact_hash:
        sourceIdentity.past_profile_interval_box_certificate
          .source_artifact_hash,
      method: sourceIdentity.past_profile_interval_box_certificate.method,
      exact_reference_arithmetic:
        sourceIdentity.past_profile_interval_box_certificate
          .exact_reference_arithmetic,
      source_float64_payload_bound:
        sourceIdentity.past_profile_interval_box_certificate
          .source_float64_payload_bound,
      subdivision_depth:
        sourceIdentity.past_profile_interval_box_certificate.subdivision_depth,
      subinterval_count:
        sourceIdentity.past_profile_interval_box_certificate.subinterval_count,
      control_point_count:
        sourceIdentity.past_profile_interval_box_certificate.control_point_count,
      control_point_interval_payload_digest:
        sourceIdentity.past_profile_interval_box_certificate
          .control_point_interval_payload_digest,
      control_point_interval_payload_byte_count:
        sourceIdentity.past_profile_interval_box_certificate
          .control_point_interval_payload_byte_count,
      all_control_point_intervals_enclose_exact:
        sourceIdentity.past_profile_interval_box_certificate
          .all_control_point_intervals_enclose_exact,
      max_control_point_interval_width:
        sourceIdentity.past_profile_interval_box_certificate
          .max_control_point_interval_width,
      q_interval: sourceIdentity.past_profile_interval_box_certificate.q_interval,
      q_interval_hex:
        sourceIdentity.past_profile_interval_box_certificate.q_interval_hex,
      H_b_upper: sourceIdentity.past_profile_interval_box_certificate.H_b_upper,
      H_b_upper_hex:
        sourceIdentity.past_profile_interval_box_certificate.H_b_upper_hex,
      used_as_certificate:
        sourceIdentity.past_profile_interval_box_certificate.used_as_certificate,
      used_as_local_certificate:
        sourceIdentity.past_profile_interval_box_certificate
          .used_as_local_certificate,
      used_as_shared_certificate:
        sourceIdentity.past_profile_interval_box_certificate
          .used_as_shared_certificate,
      authorizes_outward_certificate:
        sourceIdentity.past_profile_interval_box_certificate
          .authorizes_outward_certificate,
      authorizes_obstruction_or_channel_decision:
        sourceIdentity.past_profile_interval_box_certificate
          .authorizes_obstruction_or_channel_decision,
      certificate_digest:
        sourceIdentity.past_profile_interval_box_certificate.certificate_digest,
      status: sourceIdentity.past_profile_interval_box_certificate.status,
    },
    packet.past_profile.interval_box_certificate_summary
  );
  assert.deepEqual(
    summarizeFutureProfileCertificate(
      sourceIdentity.future_piecewise_linear_profile_box_certificate
    ),
    packet.future_profile_admissibility.local_certificate
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .theta_nodes_hex.length,
    17
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .q_nodes_hex.length,
    17
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .q_prime_nodes_hex.length,
    17
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .q_prime_semantics,
    "auxiliary_transport_derivative_interpolant_not_derivative_of_piecewise_linear_q"
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .E_Q_plus_b_for_admissible_class,
    "absent"
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .bounds_continuous_transport_equation,
    false
  );
  assert.equal(
    sourceIdentity.future_piecewise_linear_profile_box_certificate
      .used_as_shared_certificate,
    false
  );
  assert.equal(
    sourceIdentity.coefficient_interval_enclosure_attempt.rows.length,
    3
  );
  assert.equal(
    /^-?0x/.test(
      sourceIdentity.coefficient_interval_enclosure_attempt.rows[0].intervals[0]
        .lower_hex,
    ),
    true
  );
  assert.equal(
    sourceIdentity.shared_interval_box_certificate_target.source_artifact_hash,
    sourceIdentity.digest
  );
  assert.equal(
    sourceIdentity.shared_interval_box_certificate_target.shared_interval_boxes
      .required_box_ids.length,
    4
  );
  assert.equal(
    sourceIdentity.shared_interval_box_certificate_target
      .future_transport_constants.status,
    "target_only_future_continuous_transport_bounds_absent"
  );
  assert.equal(
    sourceIdentity.shared_interval_box_certificate_target
      .residual_envelope_constants.status,
    "absent"
  );
  assert.equal(sourceIdentity.payload.candidate, "a1");
  assert.equal(
    sourceIdentity.payload.source_object,
    "endpoint_slope_cancel_homogeneous_perturbation"
  );
  assert.equal(sourceIdentity.payload.degree, 14);
  assert.equal(sourceIdentity.payload.constraint_rows.length, 12);
  assert.equal(sourceIdentity.payload.constraint_rows[0].length, 14);
  assert.ok(
    sourceIdentity.blocked_rows.includes(
      "directed_rounding_backend_self_audit_not_shared_certificate"
    )
  );
  assert.ok(
    sourceIdentity.blocked_rows.includes(
      "past_profile_interval_box_certificate_not_shared_certificate"
    )
  );
  assert.ok(
    sourceIdentity.blocked_rows.includes(
      "future_piecewise_linear_profile_box_local_certificate_not_continuous_transport_certificate"
    )
  );
  assert.ok(
    sourceIdentity.blocked_rows.includes(
      "continuous_transport_equation_bounds_absent"
    )
  );
  assert.ok(
    sourceIdentity.blocked_rows.includes(
      "E_Q_plus_b_absent_for_admissible_class"
    )
  );
});
