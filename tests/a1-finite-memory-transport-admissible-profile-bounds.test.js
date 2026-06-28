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
  assert.equal(packet.future_profile_admissibility.used_as_certificate, false);
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
    "past_profile_interval_box_certificate_present_not_shared_certificate"
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .attempt_box_ids_present,
    ["past_profile_interval_box"]
  );
  assert.deepEqual(
    packet.shared_interval_box_certificate_target.shared_interval_boxes
      .missing_box_ids,
    [
      "future_transport_interval_box",
      "retained_root_interval_boxes",
      "inactive_cover_interval_boxes",
    ]
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
    "transport_node_envelope_only_not_interval_certificate"
  );
  assert.equal(
    packet.future_profile_admissibility.transport_node_envelope.status,
    "transport_node_envelope_not_interval_certificate"
  );
  assert.equal(
    packet.future_profile_admissibility.transport_node_envelope.outward_for_continuous_transport_equation,
    false
  );
  assert.equal(
    packet.retained_root_context.status,
    "sampled_retained_context_only_not_root_persistence_row"
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
  assert.ok(packet.blocked_rows.includes("future_outward_profile_bounds_absent"));
  assert.ok(packet.blocked_rows.includes("E_Q_plus_b_absent"));
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
    packet.shared_interval_box_certificate_target
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
      "future_outward_profile_bounds_absent"
    )
  );
  assert.ok(sourceIdentity.blocked_rows.includes("E_Q_plus_b_absent"));
});
