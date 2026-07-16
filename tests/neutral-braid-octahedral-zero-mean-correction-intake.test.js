import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_TARGET_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA,
  evaluateCandidateBRangeProbe,
  evaluateLiveCorrectionDirectionCertificate,
  evaluateLiveDerivativeMatrixCertificate,
  evaluateLiveDerivativeColumnPreviewRangeProbe,
  evaluateLiveDerivativeColumnIntake,
  evaluateSpeedPrimitiveFeasibilityCertificate,
  evaluateSpeedClockLengthCertificate,
  evaluateNormalReconstructionHandoff,
  evaluateBoundedSpeedNormalReconstructionCandidate,
  evaluateActionStabilityAfterNormalCandidateIntake,
  buildOctahedralZeroMeanCorrectionIntake,
  validateOctahedralZeroMeanCorrectionIntake,
} from "../scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs";

const RECEIVER_LABELS = ["1+", "1-", "2+", "2-", "3+", "3-"];
const SOURCE_ARTIFACT_ID = "neutral_braid_octahedral_zero_mean_correction_intake.frozen_constant_vector.v1";
const REQUIRED_LIVE_DERIVATIVE_BLOCKS = [
  "clock",
  "inverse-clock",
  "root",
  "jacobian",
  "force-weight",
  "support",
  "action",
  "event",
];
const REQUIRED_LIVE_DERIVATIVE_GUARDS = [
  "clock_guard",
  "inverse_clock_guard",
  "root_guard",
  "jacobian_guard",
  "force_weight_guard",
  "support_guard",
  "action_guard",
  "event_guard",
  "force_checksum_guard",
  "consumer_checksum_guard",
];
const REQUIRED_CORRECTION_DIRECTION_GUARDS = [
  "delay_floor_guard",
  "jacobian_floor_guard",
  "speed_band_margin_guard",
  "support_margin_guard",
  "action_convention_guard",
  "event_convention_guard",
];
const REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS = [
  "action_scale",
  "action_curl",
  "speed_factor_storage_exchange",
  "noether_event_exchange",
  "tail_refinement_persistence",
  "bounded_speed_stability",
  "observer_export_eligibility",
  "coupled_fixed_point",
];
const REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS = [
  ["action_derived_scale", "action_scale"],
  ["action_curl", "action_curl"],
  ["speed_factor_storage_exchange", "speed_factor_storage_exchange"],
  ["noether_event_exchange", "noether_event_exchange"],
  ["tail_refinement_persistence", "tail_refinement_persistence"],
  ["bounded_speed_stability", "bounded_speed_stability"],
  ["observer_export_eligibility", "observer_export_eligibility"],
  ["coupled_fixed_point", "coupled_fixed_point"],
];
const REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_ROWS = [
  "bounded_speed_normal_reconstruction_candidate",
  ...REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row]) => row),
];
const MISSING_LIVE_LEDGER_CLOSED_ROWS = REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(
  ([row]) => row
);
const ACTION_DERIVED_SCALE_TARGET_REQUIRED_VARIABLES = [
  "gamma_B_nu",
  "action_functional_A_nu",
  "scale_parameter",
  "speed_factor_profile_nu",
  "force_action_pairing",
  "scale_margin",
];
const ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS = [
  "bounded_speed_normal_reconstruction_candidate",
  "action_measure_row",
  "scale_derivative_row",
  "force_action_pairing_row",
  "normal_speed_pullback_row",
  "scale_margin_row",
];
const MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS = ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS.slice(1);
const ACTION_MEASURE_ROW_TARGET_REQUIRED_VARIABLES = [
  "action_functional_A_nu",
  "branch_scope",
  "period_rows",
  "root_support_event_rows",
  "normalization_scale_R_star",
  "finite_chart",
];
const ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS = [
  "same_ledger_identity_tuple",
  "branch_scope",
  "period_rows",
  "action_functional",
  "root_support_event_rows",
];
const ACTION_MEASURE_ROW_CANDIDATE_REQUIRED_FIELDS = [
  "bounded_speed_ledger_id",
  "force_checksum_id",
  "consumer_checksum_id",
  "source_normal_reconstruction_candidate_id",
  "branch_scope",
  "period_rows",
  "action_functional",
  "root_support_event_rows",
];
const FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS = [
  ...ACTION_MEASURE_ROW_CANDIDATE_REQUIRED_FIELDS,
  "retained_source_binding",
  "receiver_normal_branch_strength_linkage",
  "provider_provenance",
];
const CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS = [
  "bounded_speed_ledger_id",
  "force_checksum_id",
  "consumer_checksum_id",
  "source_normal_reconstruction_candidate_id",
];
const MISSING_ACTION_MEASURE_ROW_CANDIDATE_FIELDS =
  ACTION_MEASURE_ROW_CANDIDATE_REQUIRED_FIELDS.filter(
    (field) => !CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS.includes(field)
  );
const ACTION_MEASURE_ROW_MISSING_SAME_LEDGER_BINDINGS = [
  {
    field: "branch_scope",
    required_binding: "same-normal-candidate-ledger-branch-scope-source",
    blocker: "same_ledger_branch_scope_source_missing",
  },
  {
    field: "period_rows",
    required_binding: "same-normal-candidate-ledger-period-rows",
    blocker: "same_ledger_period_rows_source_missing",
  },
  {
    field: "action_functional",
    required_binding: "same-normal-candidate-ledger-action-functional",
    blocker: "same_ledger_action_functional_source_missing",
  },
  {
    field: "root_support_event_rows",
    required_binding: "same-normal-candidate-ledger-root-support-event-rows",
    blocker: "same_ledger_root_support_event_rows_source_missing",
  },
];
const ACTION_MEASURE_ROW_CANDIDATE_FIELD_STATUS_ROWS = [
  ...CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS.map((field) => ({
    field,
    status: "supplied_on_normal_candidate_ledger",
    blocker: null,
  })),
  ...ACTION_MEASURE_ROW_MISSING_SAME_LEDGER_BINDINGS.map((binding) => ({
    field: binding.field,
    status: "missing_same_ledger_binding",
    blocker: binding.blocker,
  })),
];
const MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS = ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS.slice(1);
const ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS = [
  "bounded_speed_ledger_id",
  "force_checksum_id",
  "consumer_checksum_id",
  "source_normal_reconstruction_candidate_id",
];
const ACTION_MEASURE_BRANCH_SCOPE_NEAREST_PRESENT_FIELDS = ["branch_scope"];
const ACTION_MEASURE_BRANCH_SCOPE_NEAREST_MISSING_ACTION_MEASURE_FIELDS = [
  "same_ledger_identity_tuple",
  "action_measure_row",
  "period_rows",
  "action_functional",
  "root_support_event_rows",
];
const ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS = [
  "same_ledger_identity_tuple",
  "action_measure_row",
];
const ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_ROOTS = [
  "scripts/neutral-braid",
  "reference/priorities/braid-archive/braid-retained-branch-closure",
];
const ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_TERMS = [
  "branch_scope",
  "action_measure_row",
  "same_ledger_action_measure_row_with_branch_scope",
  "accepted_branch_scope_source",
  "period_rows",
];
const ACTION_MEASURE_BRANCH_SCOPE_AUDIT_RESULT =
  "no-accepted-same-ledger-action-measure-branch-scope-source";
const ACTION_MEASURE_BRANCH_SCOPE_NEAREST_READINESS_STATUS =
  "fixed-speed-root-ledger-branch-scope-provenance-only";
const ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT =
  "same-ledger-action-measure-row-with-branch-scope";
const ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_FIELDS = [
  "same_ledger_identity_tuple",
  "branch_scope",
];
const ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS =
  ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS.filter(
    (field) => !ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_FIELDS.includes(field)
  );
const ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_FIRST_FAILURE =
  "same_ledger_period_rows_source_missing";
const ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_NEGATIVE_CONTROL =
  "branch-scope-provenance-without-same-ledger-period-rows-not-action-measure-row";
const ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_SMALLEST_NEXT_EVIDENCE_OBJECT =
  "same-ledger-action-measure-row-with-branch-scope-and-period-rows";
const RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REQUIRED_FIELDS = [
  "same_ledger_identity_tuple",
  "branch_scope",
  "period_rows",
  "action_functional",
  "root_support_event_rows",
];
const RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE = [
  "fixture-rows",
  "proxy-only-branch-scope",
  "fixed-speed-root-ledger-provenance",
  "branch-scope-free-action-summaries",
  "diagnostic-force-residual",
  "sampled-phase-offset",
  "sampled-diagnostics",
  "source-normal-rows",
  "generated-decoys",
  "cross-row-bundles",
  "finite-mode-open-search-contract",
];
const ACTION_MEASURE_BRANCH_SCOPE_CANDIDATE_FIELD_STATUSES = [
  {
    field: "branch_scope",
    candidate_source_status: "present",
    normal_candidate_ledger_status: "missing_same_ledger_binding",
    acceptance_status: "rejected_off_ledger",
    blocker: "same_ledger_branch_scope_source_missing",
  },
  {
    field: "period_rows",
    candidate_source_status: "absent",
    normal_candidate_ledger_status: "missing_same_ledger_binding",
    acceptance_status: "conditional_blocked_until_branch_scope_binds",
    blocker: "same_ledger_branch_scope_source_missing",
    conditional_next_failure: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_FIRST_FAILURE,
  },
  {
    field: "action_functional",
    candidate_source_status: "absent",
    normal_candidate_ledger_status: "missing_same_ledger_binding",
    acceptance_status: "rejected_missing_same_ledger_binding",
    blocker: "same_ledger_action_functional_source_missing",
  },
  {
    field: "root_support_event_rows",
    candidate_source_status: "absent",
    normal_candidate_ledger_status: "missing_same_ledger_binding",
    acceptance_status: "rejected_missing_same_ledger_binding",
    blocker: "same_ledger_root_support_event_rows_source_missing",
  },
];
const ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_CANDIDATES = [
  {
    source_path: "scripts/neutral-braid/octahedral-root-ledger.mjs",
    artifact_schema: "neutral-braid-octahedral-root-ledger/v1",
    artifact_id: "neutral_braid_octahedral_root_ledger.certified.v1",
    branch_scope_role: "certified fixed-speed all-pairs root ledger",
    first_rejection_code: "root-ledger-branch-scope-lacks-action-measure-row",
  },
  {
    source_path: "scripts/neutral-braid/octahedral-fixed-speed-witness.mjs",
    artifact_schema: "neutral-braid-octahedral-fixed-speed-witness/v1",
    artifact_id: "neutral_braid_octahedral_fixed_speed_witness.deterministic_nodes.v1",
    branch_scope_role: "fixed-speed tangential residual no-go witness",
    first_rejection_code: "fixed-speed-witness-branch-scope-lacks-live-ledger-tuple",
  },
  {
    source_path: "scripts/neutral-braid/octahedral-force-residual.mjs",
    artifact_schema: "neutral-braid-octahedral-force-residual/v1",
    artifact_id: "neutral_braid_octahedral_force_residual.sampled_diagnostic.v1",
    branch_scope_role: "sampled fixed-speed force residual diagnostic",
    first_rejection_code: "force-residual-branch-scope-is-diagnostic-not-action-measure",
  },
  {
    source_path: "scripts/neutral-braid/octahedral-root-force-closure-witness.mjs",
    artifact_schema: "neutral-braid-octahedral-root-force-closure-witness/v1",
    artifact_id: "neutral_braid_octahedral_root_force_closure_witness.narrow_no_go.v1",
    branch_scope_role: "resolved-root force-closure overread rejection",
    first_rejection_code: "root-force-no-go-branch-scope-not-same-ledger-action-measure",
  },
  {
    source_path: "scripts/neutral-braid/octahedral-inventory-closure-witness.mjs",
    artifact_schema: "neutral-braid-octahedral-inventory-closure-witness/v1",
    artifact_id: "neutral_braid_octahedral_inventory_closure_witness.narrow_no_go.v1",
    branch_scope_role: "inventory-bias closure overread rejection",
    first_rejection_code: "inventory-witness-branch-scope-not-action-functional-row",
  },
  {
    source_path: "scripts/neutral-braid/octahedral-phase-offset-scan.mjs",
    artifact_schema: "neutral-braid-octahedral-phase-offset-scan/v1",
    artifact_id: "neutral_braid_octahedral_phase_offset_scan.sampled_diagnostic.v1",
    branch_scope_role: "phase-offset sampled diagnostic",
    first_rejection_code: "phase-offset-branch-scope-not-bounded-speed-live-ledger",
  },
  {
    source_path: "scripts/neutral-braid/octahedral-polarity-phase-retention-witness.mjs",
    artifact_schema: "neutral-braid-octahedral-polarity-phase-retention-witness/v1",
    artifact_id: "neutral_braid_octahedral_polarity_phase_retention_witness.best_row_consumption.v1",
    branch_scope_role: "polarity-phase retention overread rejection",
    first_rejection_code: "polarity-phase-branch-scope-retention-rejected",
  },
  {
    source_path: "scripts/neutral-braid/finite-mode-artifact.mjs",
    artifact_schema: "neutral-braid-finite-mode-artifact/v1",
    artifact_id: "neutral_braid_finite_mode_search.audit_shape.v1",
    branch_scope_role: "finite-mode open search contract",
    first_rejection_code: "finite-mode-branch-scope-open-placeholders-not-action-measure",
  },
];
const ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE =
  ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_CANDIDATES[0];

function branchScopeNearestCandidateLineageReadout() {
  const nearestCandidate = ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE;
  return {
    status: "fail-closed-nearest-candidate-lineage",
    readiness_status: ACTION_MEASURE_BRANCH_SCOPE_NEAREST_READINESS_STATUS,
    closest_rejected_branch_scope_source: {
      source_path: nearestCandidate.source_path,
      artifact_schema: nearestCandidate.artifact_schema,
      artifact_id: nearestCandidate.artifact_id,
      branch_scope_role: nearestCandidate.branch_scope_role,
      first_rejection_code: nearestCandidate.first_rejection_code,
    },
    closest_candidate_reason:
      "certified fixed-speed all-pairs root ledger carries branch_scope and certified root rows, but it is provenance only for the bounded-speed action-measure target",
    present_fields: [...ACTION_MEASURE_BRANCH_SCOPE_NEAREST_PRESENT_FIELDS],
    missing_same_ledger_fields: [...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS],
    missing_action_measure_fields: [...ACTION_MEASURE_BRANCH_SCOPE_NEAREST_MISSING_ACTION_MEASURE_FIELDS],
    required_acceptance_bindings: [...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS],
    smallest_next_evidence_object: ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
  };
}

function branchScopeSourceAuditPacket(identityTuple) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA,
    claim_scope: "bounded-speed-action-measure-branch-scope-source-audit-after-normal-candidate",
    promotion_status: "priority-only",
    status: "no-same-ledger-branch-scope-source",
    audited_measure_field: "branch_scope",
    source_action_measure_row: "action_measure_row",
    required_identity_tuple: { ...identityTuple },
    search_basis: {
      searched_roots: [...ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_ROOTS],
      searched_terms: [...ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_TERMS],
      result: ACTION_MEASURE_BRANCH_SCOPE_AUDIT_RESULT,
    },
    acceptance_criteria: {
      required_identity_tuple: { ...identityTuple },
      required_same_ledger_fields: [...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS],
      required_action_measure_fields: [...ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS],
      required_acceptance_bindings: [...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS],
    },
    candidate_count: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_CANDIDATES.length,
    accepted_count: 0,
    accepted_branch_scope_source: null,
    first_failure: "same_ledger_branch_scope_source_missing",
    negative_control_status:
      "branch-scope-artifacts-without-same-ledger-action-measure-row-not-bound",
    nearest_candidate_lineage_readout: branchScopeNearestCandidateLineageReadout(),
    candidate_branch_scope_sources: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_CANDIDATES.map((candidate) => ({
      ...candidate,
      branch_scope_status: "present",
      observed_fields: ["branch_scope"],
      observed_identity_fields: {
        bounded_speed_ledger_id: null,
        force_checksum_id: null,
        consumer_checksum_id: null,
        source_normal_reconstruction_candidate_id: null,
      },
      missing_required_identity_fields: [
        ...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS,
      ],
      missing_action_measure_fields: [...ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS],
      same_ledger_tuple_match: false,
      action_measure_row_status: "absent",
      accepted_for_action_measure_branch_scope: false,
      action_measure_field_statuses: ACTION_MEASURE_BRANCH_SCOPE_CANDIDATE_FIELD_STATUSES.map(
        (fieldStatus) => ({ ...fieldStatus })
      ),
      rejection_summary:
        "branch_scope provenance is present, but no same-ledger identity tuple or action_measure_row binds it to the bounded-speed normal-candidate ledger",
    })),
  };
}

function sameLedgerActionMeasureWithBranchScopeAttemptPacket(identityTuple) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA,
    claim_scope:
      "bounded-speed-same-ledger-action-measure-row-with-branch-scope-attempt-after-normal-candidate",
    promotion_status: "priority-only",
    status: "fail-closed-target",
    attempted_evidence_object: ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
    source_action_measure_row_target: "action_measure_row",
    required_identity_tuple: { ...identityTuple },
    current_fixture_supplied_measure_fields: ["same_ledger_identity_tuple"],
    attempted_measure_fields: ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_FIELDS,
    missing_measure_fields_if_branch_scope_bound: ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS,
    branch_scope_binding_status: "not_accepted",
    branch_scope_source_audit_first_failure: "same_ledger_branch_scope_source_missing",
    first_missing_subfield_after_branch_scope: "period_rows",
    constructed_action_measure_row: null,
    fail_closed_action_measure_row_target: {
      row: "action_measure_row",
      status: "absent-fail-closed",
      candidate_row_status: "not_constructed",
      accepted_row_status: "absent",
      required_row_fields: [...ACTION_MEASURE_ROW_CANDIDATE_REQUIRED_FIELDS],
      supplied_fields_on_normal_candidate_ledger: [
        ...CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS,
      ],
      missing_fields_on_normal_candidate_ledger: [
        ...MISSING_ACTION_MEASURE_ROW_CANDIDATE_FIELDS,
      ],
      missing_same_ledger_bindings: ACTION_MEASURE_ROW_MISSING_SAME_LEDGER_BINDINGS.map(
        (binding) => ({ ...binding })
      ),
      first_blocker: "same_ledger_branch_scope_source_missing",
      field_statuses_on_normal_candidate_ledger:
        ACTION_MEASURE_ROW_CANDIDATE_FIELD_STATUS_ROWS.map((fieldStatus) => ({
          ...fieldStatus,
        })),
      certifies_action_measure_row: false,
      retention: "not_retained",
      retained_branch: false,
    },
    period_rows_target: {
      field: "period_rows",
      status: "target-only-blocked-by-branch-scope",
      source_action_measure_row: "action_measure_row",
      blocking_failure: "same_ledger_branch_scope_source_missing",
      first_failure: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_FIRST_FAILURE,
      accepted_period_rows_source: null,
      candidate_count: 0,
      negative_control_status: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_NEGATIVE_CONTROL,
      smallest_next_evidence_object:
        ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_SMALLEST_NEXT_EVIDENCE_OBJECT,
    },
    rank5_retained_branch_closure_producer_target: {
      schema: OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA,
      claim_scope:
        "rank5-retained-branch-action-measure-producer-target-after-normal-candidate",
      promotion_status: "priority-only",
      top_six_rank: 5,
      closure_route: "bounded-speed-live-ledger",
      source_after_normal_packet: "bounded-speed-normal-reconstruction-candidate",
      source_normal_reconstruction_candidate_id:
        identityTuple.source_normal_reconstruction_candidate_id,
      bounded_speed_ledger_id: identityTuple.bounded_speed_ledger_id,
      force_checksum_id: identityTuple.force_checksum_id,
      consumer_checksum_id: identityTuple.consumer_checksum_id,
      attempted_evidence_object: ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
      required_identity_tuple: { ...identityTuple },
      required_producer_fields: RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REQUIRED_FIELDS,
      supplied_fields_on_normal_candidate_ledger: ["same_ledger_identity_tuple"],
      missing_producer_fields: MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS,
      first_missing_producer_field: "branch_scope",
      first_blocker: "same_ledger_branch_scope_source_missing",
      rejected_evidence_kinds: RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE,
      nearest_rejected_source: {
        ...ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE,
      },
      finite_mode_solver_action_measure_row_producer_target: {
        schema: OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA,
        claim_scope: "bounded-speed-finite-mode-action-measure-row-producer-target",
        promotion_status: "priority-only",
        target_status: "producer_target_blocked",
        expected_source_object:
          "bounded-speed-factor-finite-mode-solver-artifact-with-action-measure-row",
        expected_source_packet:
          "reference/priorities/braid-archive/braid-retained-branch-closure/shell-braid/bounded-speed-factor-finite-mode-branch-system.md",
        source_after_normal_packet: "bounded-speed-normal-reconstruction-candidate",
        source_normal_reconstruction_candidate_id:
          identityTuple.source_normal_reconstruction_candidate_id,
        required_identity_tuple: { ...identityTuple },
        required_same_ledger_row_fields:
          FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS,
        supplied_fields_on_normal_candidate_ledger:
          CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS,
        missing_same_ledger_row_fields:
          FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS.filter(
            (field) => !CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS.includes(field)
          ),
        first_missing_same_ledger_field: "branch_scope",
        first_blocker: "same_ledger_branch_scope_source_missing",
        required_finite_mode_sections: [
          "branch_scope",
          "clock_period",
          "root_sheet_rows",
          "force_rows",
          "event_rows",
          "variational_noether",
          "derivative_matrix",
          "full_stack_embedding",
        ],
        negative_controls: RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE,
        accepted_same_ledger_action_measure_row: null,
        authorizes_rank5_retention: false,
        certifies_action_measure_row: false,
        certifies_bounded_speed_live_ledger: false,
        retention: "not_retained",
        retained_branch: false,
      },
      negative_control_status:
        "same-ledger-tuple-without-branch-scope-action-measure-not-rank5-retained-branch",
      accepted_same_ledger_action_measure_row: null,
      certifies_action_measure_row: false,
      certifies_rank5_retained_branch_closure: false,
      certifies_bounded_speed_live_ledger: false,
      retention: "not_retained",
      retained_branch: false,
    },
    certifies_action_measure_row: false,
    certifies_action_derived_scale: false,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function candidateBPacket(matrix, overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
    matrix_id: "candidate-b",
    claim_scope: "candidate-range-probe-only",
    live_derivative_columns_claimed: false,
    row_labels: RECEIVER_LABELS,
    column_labels: matrix[0].map((_, index) => `column_${index}`),
    matrix,
    ...overrides,
  };
}

function passedLiveDerivativeGuards() {
  return Object.fromEntries(REQUIRED_LIVE_DERIVATIVE_GUARDS.map((guard) => [guard, "passed"]));
}

function passedCorrectionDirectionGuards() {
  return Object.fromEntries(REQUIRED_CORRECTION_DIRECTION_GUARDS.map((guard) => [guard, "passed"]));
}

function liveDerivativeColumnPacket(overrides = {}) {
  const columns =
    overrides.columns ??
    [
      {
        column_label: "constant_speed_direction",
        parameter_id: "b:constant-speed-test",
        parameter_kind: "speed-coefficient",
        difference_scheme: "central-finite-difference",
        perturbation_epsilon: 0.001,
        baseline_artifact_id: "baseline-live-mean-row",
        plus_artifact_id: "plus-live-mean-row",
        minus_artifact_id: "minus-live-mean-row",
        ledger_convention_id: "bounded-speed-ledger-convention-test",
        same_ledger_convention: true,
        guards: passedLiveDerivativeGuards(),
        receiver_rows: RECEIVER_LABELS.map((receiver_label) => ({
          receiver_label,
          baseline_mean: 1.15740669293,
          plus_mean: 1.15840669293,
          minus_mean: 1.15640669293,
          derivative_value: 1,
          finite_difference_residual: 0,
        })),
      },
    ];

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
    claim_scope: "live-derivative-column-provenance-intake",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    certifies_live_derivative_matrix: false,
    certifies_correction_direction: false,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    column_labels: columns.map((column) => column.column_label),
    derivative_column_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS,
    columns,
    ...overrides,
  };
}

function liveDerivativePreviewPacketWithColumn(columnValues, overrides = {}) {
  return liveDerivativeColumnPacket({
    columns: [
      {
        column_label: "preview_direction",
        parameter_id: "b:preview-direction",
        parameter_kind: "speed-coefficient",
        difference_scheme: "central-finite-difference",
        perturbation_epsilon: 0.001,
        baseline_artifact_id: "baseline-live-mean-row",
        plus_artifact_id: "plus-live-mean-row",
        minus_artifact_id: "minus-live-mean-row",
        ledger_convention_id: "bounded-speed-ledger-convention-test",
        same_ledger_convention: true,
        guards: passedLiveDerivativeGuards(),
        receiver_rows: RECEIVER_LABELS.map((receiver_label, index) => ({
          receiver_label,
          baseline_mean: 1.15740669293,
          plus_mean: 1.15740669293 + 0.001 * columnValues[index],
          minus_mean: 1.15740669293 - 0.001 * columnValues[index],
          derivative_value: columnValues[index],
          finite_difference_residual: 0,
        })),
      },
    ],
    ...overrides,
  });
}

function liveDerivativePreviewPacketWithColumns(columnVectors, overrides = {}) {
  return liveDerivativeColumnPacket({
    columns: columnVectors.map((columnValues, columnIndex) => ({
      column_label: `preview_direction_${columnIndex}`,
      parameter_id: `b:preview-direction-${columnIndex}`,
      parameter_kind: "speed-coefficient",
      difference_scheme: "central-finite-difference",
      perturbation_epsilon: 0.001,
      baseline_artifact_id: "baseline-live-mean-row",
      plus_artifact_id: `plus-live-mean-row-${columnIndex}`,
      minus_artifact_id: `minus-live-mean-row-${columnIndex}`,
      ledger_convention_id: "bounded-speed-ledger-convention-test",
      same_ledger_convention: true,
      guards: passedLiveDerivativeGuards(),
      receiver_rows: RECEIVER_LABELS.map((receiver_label, index) => ({
        receiver_label,
        baseline_mean: 1.15740669293,
        plus_mean: 1.15740669293 + 0.001 * columnValues[index],
        minus_mean: 1.15740669293 - 0.001 * columnValues[index],
        derivative_value: columnValues[index],
        finite_difference_residual: 0,
      })),
    })),
    ...overrides,
  });
}

function liveDerivativeMatrixPacket(matrix, overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    claim_scope: "live-derivative-matrix-range-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    matrix_id: "same-ledger-live-b-test",
    ledger_convention_id: "bounded-speed-ledger-convention-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    force_checksum_id: "force-checksum-test",
    consumer_checksum_id: "consumer-checksum-test",
    certifies_live_derivative_matrix: true,
    certifies_bounded_speed_live_ledger: false,
    certifies_correction_direction: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    column_labels: matrix[0].map((_, index) => `live_direction_${index}`),
    derivative_column_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS,
    guards: passedLiveDerivativeGuards(),
    matrix,
    ...overrides,
  };
}

function liveCorrectionDirectionPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    claim_scope: "live-correction-direction-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_live_derivative_matrix_certificate_schema:
      OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    source_live_derivative_matrix_id: "same-ledger-constant-column-pass",
    source_range_certificate_status: "certified-live-rhs-in-range",
    direction_id: "alpha-constant-column-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    first_order_margin_guards: passedCorrectionDirectionGuards(),
    ...overrides,
  };
}

function speedPrimitiveFeasibilityPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    claim_scope: "speed-primitive-feasibility-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_correction_direction_certificate_schema:
      OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    source_correction_direction_id: "alpha-constant-column-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    primitive_id: "post-correction-speed-primitive-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    receiver_primitives: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      primitive_return_residual: 0,
      primitive_excursion_min: -0.1,
      primitive_excursion_max: 0.1,
      nu_initial: 1,
      speed_band_lower: 0.5,
      speed_band_upper: 1.5,
    })),
    ...overrides,
  };
}

function speedClockLengthPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    claim_scope: "speed-clock-length-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_speed_primitive_feasibility_schema:
      OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    source_speed_primitive_feasibility_id: "post-correction-speed-primitive-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    clock_length_id: "post-correction-speed-clock-length-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    receiver_clock_length_rows: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      center_time_period: 2,
      target_length: 2,
      winding_number: 1,
      nu_initial: 1,
      primitive_integral: 0,
      length_return_residual: 0,
    })),
    ...overrides,
  };
}

function normalReconstructionHandoffPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    claim_scope: "normal-reconstruction-handoff",
    promotion_status: "priority-only",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_speed_clock_length_schema: OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    source_speed_clock_length_id: "post-correction-speed-clock-length-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    normal_handoff_id: "post-correction-normal-reconstruction-handoff-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: false,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    receiver_normal_handoff_rows: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      normal_residual_norm_2: 0.25,
      tangent_holonomy_residual_norm_2: 0.125,
      position_closure_residual_norm_2: 0.0625,
      unit_tangent_residual_abs_max: 0,
      support_margin_min: 0.5,
    })),
    ...overrides,
  };
}

function boundedSpeedNormalReconstructionCandidatePacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    claim_scope: "bounded-speed-normal-reconstruction-candidate",
    promotion_status: "priority-only",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_normal_reconstruction_handoff_schema: OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    source_normal_handoff_id: "post-correction-normal-reconstruction-handoff-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    force_checksum_id: "force-checksum-test",
    consumer_checksum_id: "consumer-checksum-test",
    normal_reconstruction_candidate_id: "post-correction-bounded-speed-normal-reconstruction-candidate-test",
    normal_equation_status: "normal-equation-closed",
    tangent_holonomy_status: "tangent-holonomy-closed",
    position_closure_status: "position-closure-closed",
    unit_tangent_status: "unit-tangent-closed",
    support_margin_status: "support-margin-positive",
    noncollision_status: "noncollision-certified",
    root_persistence_status: "root-persistence-certified",
    krawczyk_status: "bounded-speed-branch-krawczyk-accepted",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    tolerances: {
      normal_residual_norm_2: 1e-9,
      tangent_holonomy_residual_norm_2: 1e-9,
      position_closure_residual_norm_2: 1e-9,
      unit_tangent_residual_abs_max: 1e-9,
      krawczyk_residual_norm_2: 1e-9,
    },
    margin_floors: {
      support_margin_min: 0,
      noncollision_margin_min: 0,
      root_persistence_margin_min: 0,
    },
    receiver_normal_candidate_rows: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      normal_residual_norm_2: 0,
      tangent_holonomy_residual_norm_2: 0,
      position_closure_residual_norm_2: 0,
      unit_tangent_residual_abs_max: 0,
      support_margin_min: 0.5,
      noncollision_margin_min: 0.25,
      root_persistence_margin_min: 0.125,
      krawczyk_residual_norm_2: 0,
    })),
    ...overrides,
  };
}

function actionStabilityAfterNormalCandidatePacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
    claim_scope: "bounded-speed-action-stability-after-normal-candidate-intake",
    promotion_status: "priority-only",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_bounded_speed_normal_reconstruction_candidate_schema:
      OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    source_normal_reconstruction_candidate_id:
      "post-correction-bounded-speed-normal-reconstruction-candidate-test",
    action_stability_intake_id: "after-normal-action-stability-intake-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    force_checksum_id: "force-checksum-test",
    consumer_checksum_id: "consumer-checksum-test",
    live_ledger_identity: {
      bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
      force_checksum_id: "force-checksum-test",
      consumer_checksum_id: "consumer-checksum-test",
      certification_status: "bounded-speed-live-ledger-open",
    },
    bounded_speed_live_ledger: {
      claim_scope: "bounded-speed-live-ledger-target-after-normal-candidate",
      source_normal_reconstruction_candidate_id:
        "post-correction-bounded-speed-normal-reconstruction-candidate-test",
      bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
      force_checksum_id: "force-checksum-test",
      consumer_checksum_id: "consumer-checksum-test",
      intake_status: "bounded-speed-live-ledger-open",
      first_failure_row: "bounded-speed-live-ledger-open",
      required_same_ledger_rows: Object.fromEntries(
        REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row, downstreamRow]) => [
          row,
          {
            downstream_row: downstreamRow,
            same_ledger_binding: "same-normal-candidate-ledger-checksum",
            status: "blocked:bounded-speed-live-ledger-open",
          },
        ])
      ),
      live_ledger_identity_target: {
        schema: OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_TARGET_SCHEMA,
        claim_scope: "bounded-speed-live-ledger-identity-target-after-normal-candidate",
        promotion_status: "priority-only",
        status: "target-only",
        source_normal_reconstruction_candidate_id:
          "post-correction-bounded-speed-normal-reconstruction-candidate-test",
        bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
        force_checksum_id: "force-checksum-test",
        consumer_checksum_id: "consumer-checksum-test",
        required_identity_tuple: {
          bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
          force_checksum_id: "force-checksum-test",
          consumer_checksum_id: "consumer-checksum-test",
          source_normal_reconstruction_candidate_id:
            "post-correction-bounded-speed-normal-reconstruction-candidate-test",
        },
        required_closed_rows: REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_ROWS,
        closed_rows_supplied_by_current_packet: ["bounded_speed_normal_reconstruction_candidate"],
        missing_closed_rows: MISSING_LIVE_LEDGER_CLOSED_ROWS,
        first_missing_closed_row: "action_derived_scale",
        negative_control_status:
          "same-ledger-id-tuple-without-closed-downstream-rows-not-live-ledger",
        certifies_bounded_speed_live_ledger: false,
        retention: "not_retained",
        retained_branch: false,
      },
      action_derived_scale_target: {
        schema: OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA,
        claim_scope: "bounded-speed-action-derived-scale-target-after-normal-candidate",
        promotion_status: "priority-only",
        status: "target-only",
        row: "action_derived_scale",
        downstream_row: "action_scale",
        source_normal_reconstruction_candidate_id:
          "post-correction-bounded-speed-normal-reconstruction-candidate-test",
        bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
        force_checksum_id: "force-checksum-test",
        consumer_checksum_id: "consumer-checksum-test",
        required_identity_tuple: {
          bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
          force_checksum_id: "force-checksum-test",
          consumer_checksum_id: "consumer-checksum-test",
          source_normal_reconstruction_candidate_id:
            "post-correction-bounded-speed-normal-reconstruction-candidate-test",
        },
        required_variables: ACTION_DERIVED_SCALE_TARGET_REQUIRED_VARIABLES,
        required_rows: ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS,
        current_fixture_supplied_rows: ["bounded_speed_normal_reconstruction_candidate"],
        missing_rows: MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS,
        first_missing_required_row: "action_measure_row",
        negative_control_status:
          "same-ledger-tuple-without-action-scale-rows-not-action-derived-scale",
        rejected_current_fixture: true,
        action_measure_row_target: {
          schema: OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA,
          claim_scope: "bounded-speed-action-measure-row-target-after-normal-candidate",
          promotion_status: "priority-only",
          status: "target-only",
          row: "action_measure_row",
          source_action_derived_scale_row: "action_derived_scale",
          source_normal_reconstruction_candidate_id:
            "post-correction-bounded-speed-normal-reconstruction-candidate-test",
          bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
          force_checksum_id: "force-checksum-test",
          consumer_checksum_id: "consumer-checksum-test",
          required_identity_tuple: {
            bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
            force_checksum_id: "force-checksum-test",
            consumer_checksum_id: "consumer-checksum-test",
            source_normal_reconstruction_candidate_id:
              "post-correction-bounded-speed-normal-reconstruction-candidate-test",
          },
          required_variables: ACTION_MEASURE_ROW_TARGET_REQUIRED_VARIABLES,
          required_measure_fields: ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS,
          current_fixture_supplied_measure_fields: ["same_ledger_identity_tuple"],
          missing_measure_fields: MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS,
          first_missing_measure_field: "branch_scope",
          branch_scope_source_audit: branchScopeSourceAuditPacket({
            bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
            force_checksum_id: "force-checksum-test",
            consumer_checksum_id: "consumer-checksum-test",
            source_normal_reconstruction_candidate_id:
              "post-correction-bounded-speed-normal-reconstruction-candidate-test",
          }),
          same_ledger_action_measure_row_with_branch_scope_attempt:
            sameLedgerActionMeasureWithBranchScopeAttemptPacket({
              bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
              force_checksum_id: "force-checksum-test",
              consumer_checksum_id: "consumer-checksum-test",
              source_normal_reconstruction_candidate_id:
                "post-correction-bounded-speed-normal-reconstruction-candidate-test",
            }),
          negative_control_status:
            "same-ledger-tuple-without-action-functional-not-action-measure-row",
          rejected_current_fixture: true,
          certifies_action_measure_row: false,
          certifies_action_derived_scale: false,
          certifies_bounded_speed_live_ledger: false,
          certifies_action_stability: false,
          certifies_observer_export: false,
          retention: "not_retained",
          retained_branch: false,
        },
        certifies_action_derived_scale: false,
        certifies_bounded_speed_live_ledger: false,
        certifies_action_stability: false,
        certifies_observer_export: false,
        retention: "not_retained",
        retained_branch: false,
      },
      certifies_bounded_speed_live_ledger: false,
      certifies_action_stability: false,
      certifies_observer_export: false,
      retention: "not_retained",
      retained_branch: false,
    },
    normal_candidate_status: "bounded-speed-normal-reconstruction-candidate",
    live_ledger_status: "bounded-speed-live-ledger-open",
    first_failure_row: "bounded-speed-live-ledger-open",
    downstream_row_statuses: Object.fromEntries(
      REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS.map((row) => [
        row,
        "blocked:bounded-speed-live-ledger-open",
      ])
    ),
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: true,
    certifies_bounded_speed_live_ledger: false,
    certifies_action_stability: false,
    certifies_observer_export: false,
    retention: "not_retained",
    retained_branch: false,
    ...overrides,
  };
}

test("octahedral zero-mean correction intake emits the constant six-vector obstruction", () => {
  const artifact = buildOctahedralZeroMeanCorrectionIntake({ phaseSamples: 120, ySubdivisions: 240 });
  const errors = validateOctahedralZeroMeanCorrectionIntake(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-octahedral-zero-mean-correction-intake/v1");
  assert.equal(artifact.packet_id, "octahedral_zero_mean_correction_intake");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.emits_live_derivative_columns, false);
  assert.equal(artifact.artifact_claim.certifies_live_derivative_matrix, false);
  assert.equal(artifact.artifact_claim.certifies_correction_direction, false);
  assert.equal(artifact.source_diagnostic.validation_status, "source-speed-diagnostic-valid");
  assert.equal(artifact.source_diagnostic.mean_split_status, "frozen-fixed-ledger-mean-obstruction");
  assert.equal(
    artifact.source_diagnostic.cross_binary_symmetry_certificate_status,
    "analytic-cross-binary-phase-antiperiodicity-certified"
  );
  assert.equal(artifact.frozen_mean_vector.period_integral_vector.length, 6);
  assert.equal(artifact.frozen_mean_vector.constant_vector_status, "constant-six-vector-certified");
  assert.equal(artifact.frozen_mean_vector.positivity_status, "positive-period-mean-certified");
  assert.ok(artifact.frozen_mean_vector.mu_period_integral > 1);
  assert.ok(artifact.frozen_mean_vector.period_integral_deviation_abs_max < 1e-9);
  assert.deepEqual(
    artifact.linear_system_intake.rhs_vector,
    artifact.frozen_mean_vector.period_integral_vector.map((value) => -value)
  );
  assert.equal(artifact.linear_system_intake.equation, "B*alpha=-M");
  assert.equal(
    artifact.linear_system_intake.exact_range_condition,
    "Since M=mu*1_6 with mu>0, first-order solvability is equivalent to 1_6 being in Range(B)."
  );
  assert.ok(artifact.linear_system_intake.normalized_constant_covector.projection_of_M > 2);
  assert.equal(
    artifact.linear_system_intake.normalized_constant_covector.projection_of_rhs,
    -artifact.linear_system_intake.normalized_constant_covector.projection_of_M
  );
  assert.equal(artifact.linear_system_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(artifact.linear_system_intake.range_certificate_status, "correction-rank-open");
  assert.equal(artifact.linear_system_intake.correction_status, "zero-mean-correction-open");
  assert.equal(artifact.linear_system_intake.derivative_matrix, null);
  assert.equal(artifact.linear_system_intake.range_residual, null);
  assert.equal(artifact.linear_system_intake.range_projection, null);
  assert.equal(artifact.linear_system_intake.cokernel_projection, null);
  assert.equal(artifact.derivative_column_audit.live_derivative_columns_claimed, false);
  assert.deepEqual(artifact.derivative_column_audit.included_column_blocks, []);
  assert.deepEqual(artifact.derivative_column_audit.omitted_required_live_blocks, [
    "clock",
    "inverse-clock",
    "root",
    "jacobian",
    "force-weight",
    "support",
    "action",
    "event",
  ]);
  assert.equal(artifact.live_derivative_column_intake, null);
  assert.equal(artifact.residual_vector.first_failure_row, "live-ledger-derivative-open");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("octahedral zero-mean correction intake checks candidate range matrices", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const passingPacket = candidateBPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "constant-column-pass",
    column_labels: ["constant_receiver_column"],
  });
  const passingArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    candidateBPacket: passingPacket,
  });
  const passingProbe = evaluateCandidateBRangeProbe(baseArtifact, passingPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(passingArtifact), []);
  assert.deepEqual(passingArtifact.candidate_b_range_probe, passingProbe);
  assert.equal(passingArtifact.candidate_b_range_probe.schema, OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA);
  assert.equal(passingArtifact.candidate_b_range_probe.range_membership_status, "candidate-rhs-in-range");
  assert.equal(passingArtifact.candidate_b_range_probe.matrix_rank, 1);
  assert.equal(passingArtifact.candidate_b_range_probe.augmented_rank_with_constant_direction, 1);
  assert.equal(passingArtifact.candidate_b_range_probe.candidate_range_residual_norm_2, 0);
  assert.equal(passingArtifact.candidate_b_range_probe.balanced_column_status, "candidate-columns-unbalanced");
  assert.equal(passingArtifact.linear_system_intake.derivative_matrix, null);
  assert.equal(passingArtifact.linear_system_intake.rank, null);
  assert.equal(passingArtifact.linear_system_intake.range_residual, null);
  assert.equal(passingArtifact.linear_system_intake.range_certificate_status, "correction-rank-open");
  assert.equal(passingArtifact.linear_system_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(passingArtifact.result.retained_branch, false);

  const balancedPacket = candidateBPacket([[1], [-1], [1], [-1], [1], [-1]], {
    matrix_id: "balanced-column-fail",
    column_labels: ["zero_sum_column"],
  });
  const obstructedArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    candidateBPacket: balancedPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(obstructedArtifact), []);
  assert.equal(obstructedArtifact.candidate_b_range_probe.range_membership_status, "candidate-rhs-out-of-range");
  assert.equal(obstructedArtifact.candidate_b_range_probe.balanced_column_status, "candidate-columns-balanced");
  assert.equal(obstructedArtifact.candidate_b_range_probe.max_abs_column_sum, 0);
  assert.equal(
    obstructedArtifact.candidate_b_range_probe.cokernel_obstruction_status,
    "left-null-constant-covector-obstructs"
  );
  assert.ok(obstructedArtifact.candidate_b_range_probe.candidate_range_residual_norm_2 > 2);
  assert.equal(obstructedArtifact.linear_system_intake.derivative_matrix, null);
  assert.equal(obstructedArtifact.result.retention, "not_retained");

  assert.throws(
    () =>
      evaluateCandidateBRangeProbe(baseArtifact, {
        ...passingPacket,
        live_derivative_columns_claimed: true,
      }),
    /must not claim live derivative columns/
  );
  assert.throws(
    () =>
      evaluateCandidateBRangeProbe(baseArtifact, {
        ...passingPacket,
        row_labels: ["1-", "1+", "2+", "2-", "3+", "3-"],
      }),
    /row_labels must match/
  );
});

test("octahedral zero-mean correction intake checks live derivative column provenance packets", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const columnPacket = liveDerivativeColumnPacket();
  const evaluated = evaluateLiveDerivativeColumnIntake(baseArtifact, columnPacket);
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeColumnPacket: columnPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.live_derivative_column_intake, evaluated);
  assert.equal(
    artifact.live_derivative_column_intake.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA
  );
  assert.equal(artifact.live_derivative_column_intake.guard_status, "live-derivative-column-provenance-checked");
  assert.deepEqual(artifact.live_derivative_column_intake.omitted_required_live_blocks, []);
  assert.deepEqual(
    artifact.live_derivative_column_intake.column_matrix_preview,
    Array.from({ length: 6 }, () => [1])
  );
  assert.equal(artifact.live_derivative_column_intake.finite_difference_residual_abs_max, 0);
  assert.equal(artifact.live_derivative_column_intake.certifies_live_derivative_matrix, false);
  assert.equal(artifact.live_derivative_column_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(artifact.live_derivative_column_intake.correction_status, "zero-mean-correction-open");
  assert.equal(artifact.live_derivative_column_intake.retention, "not_retained");
  assert.equal(artifact.linear_system_intake.derivative_matrix, null);
  assert.equal(artifact.linear_system_intake.rank, null);
  assert.equal(artifact.linear_system_intake.range_residual, null);
  assert.equal(artifact.result.retained_branch, false);

  assert.throws(
    () =>
      evaluateLiveDerivativeColumnIntake(
        baseArtifact,
        liveDerivativeColumnPacket({
          derivative_column_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS.filter((block) => block !== "event"),
        })
      ),
    /omits required live blocks: event/
  );
  assert.throws(
    () =>
      evaluateLiveDerivativeColumnIntake(
        baseArtifact,
        liveDerivativeColumnPacket({
          certifies_live_derivative_matrix: true,
        })
      ),
    /must set certifies_live_derivative_matrix=false/
  );
});

test("octahedral zero-mean correction intake range-probes live derivative column previews without certifying B", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const passingPacket = liveDerivativePreviewPacketWithColumn([1, 1, 1, 1, 1, 1]);
  const passingProbe = evaluateLiveDerivativeColumnPreviewRangeProbe(baseArtifact, passingPacket);
  const passingArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeColumnPacket: passingPacket,
    probeLiveDerivativeColumnPreview: true,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(passingArtifact), []);
  assert.deepEqual(passingArtifact.live_derivative_column_preview_range_probe, passingProbe);
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.claim_scope,
    "live-derivative-column-preview-range-probe-only"
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.matrix_source,
    "live_derivative_column_intake.column_matrix_preview"
  );
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.range_membership_status, "preview-rhs-in-range");
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.preview_range_residual_norm_2, 0);
  assert.deepEqual(passingArtifact.live_derivative_column_preview_range_probe.preview_range_residual_vector, [0, 0, 0, 0, 0, 0]);
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.preview_cokernel_witness.status,
    "preview-cokernel-witness-not-needed"
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.preview_cokernel_witness.normalized_left_null_witness,
    null
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.status,
    "least-squares-preview-computed"
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.equation,
    "B_preview*alpha_preview=-m_frz"
  );
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.alpha_preview_vector.length, 1);
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.residual_norm_2, 0);
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.certifies_correction_direction,
    false
  );
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.certifies_live_derivative_matrix, false);
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.certifies_correction_direction, false);
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.retention, "not_retained");
  assert.equal(passingArtifact.linear_system_intake.derivative_matrix, null);
  assert.equal(passingArtifact.linear_system_intake.rank, null);
  assert.equal(passingArtifact.linear_system_intake.range_residual, null);
  assert.equal(passingArtifact.linear_system_intake.range_projection, null);
  assert.equal(passingArtifact.linear_system_intake.cokernel_projection, null);
  assert.equal(passingArtifact.result.retained_branch, false);

  const obstructedPacket = liveDerivativePreviewPacketWithColumn([1, -1, 1, -1, 1, -1]);
  const obstructedProbe = evaluateLiveDerivativeColumnPreviewRangeProbe(baseArtifact, obstructedPacket);

  assert.equal(obstructedProbe.range_membership_status, "preview-rhs-out-of-range");
  assert.equal(obstructedProbe.balanced_column_status, "candidate-columns-balanced");
  assert.equal(obstructedProbe.cokernel_obstruction_status, "left-null-constant-covector-obstructs");
  assert.ok(obstructedProbe.preview_range_residual_norm_2 > 2);
  assert.equal(obstructedProbe.preview_cokernel_witness.claim_scope, "preview-cokernel-witness-only");
  assert.equal(obstructedProbe.preview_cokernel_witness.status, "preview-only-cokernel-witness");
  assert.equal(obstructedProbe.preview_cokernel_witness.witness_source, "preview_range_residual");
  assert.equal(obstructedProbe.preview_cokernel_witness.normalized_left_null_witness.length, 6);
  assert.ok(obstructedProbe.preview_cokernel_witness.witness_dot_preview_columns_abs_max <= 1e-9);
  assert.ok(obstructedProbe.preview_cokernel_witness.witness_dot_rhs > 2);
  assert.equal(obstructedProbe.preview_cokernel_witness.certifies_correction_direction, false);
  assert.equal(obstructedProbe.preview_cokernel_witness.retention, "not_retained");
  assert.equal(obstructedProbe.least_squares_preview.status, "least-squares-preview-computed");
  assert.ok(obstructedProbe.least_squares_preview.residual_norm_2 > 2);
  assert.equal(obstructedProbe.least_squares_preview.certifies_correction_direction, false);
  assert.equal(obstructedProbe.least_squares_preview.retention, "not_retained");

  const duplicatePacket = liveDerivativePreviewPacketWithColumns([
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ]);
  const duplicateProbe = evaluateLiveDerivativeColumnPreviewRangeProbe(baseArtifact, duplicatePacket);

  assert.equal(duplicateProbe.matrix_rank, 1);
  assert.equal(duplicateProbe.least_squares_preview.status, "least-squares-preview-rank-deficient-not-computed");
  assert.equal(duplicateProbe.least_squares_preview.alpha_preview_vector, null);
  assert.equal(duplicateProbe.least_squares_preview.fitted_rhs_preview, null);
  assert.equal(duplicateProbe.least_squares_preview.certifies_correction_direction, false);
  assert.equal(duplicateProbe.preview_cokernel_witness.status, "preview-cokernel-witness-not-needed");
});

test("octahedral zero-mean correction intake certifies same-ledger derivative matrix range verdicts", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const passingPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const passingCertificate = evaluateLiveDerivativeMatrixCertificate(baseArtifact, passingPacket);
  const passingArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: passingPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(passingArtifact), []);
  assert.deepEqual(passingArtifact.live_derivative_matrix_certificate, passingCertificate);
  assert.equal(
    passingArtifact.live_derivative_matrix_certificate.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA
  );
  assert.equal(passingArtifact.artifact_claim.certifies_live_derivative_matrix, true);
  assert.equal(passingArtifact.artifact_claim.certifies_correction_direction, false);
  assert.equal(passingArtifact.live_derivative_matrix_certificate.range_membership_status, "live-rhs-in-range");
  assert.equal(passingArtifact.live_derivative_matrix_certificate.range_certificate_status, "certified-live-rhs-in-range");
  assert.equal(passingArtifact.linear_system_intake.live_derivative_status, "live-derivative-matrix-certified");
  assert.deepEqual(passingArtifact.linear_system_intake.derivative_matrix, Array.from({ length: 6 }, () => [1]));
  assert.equal(passingArtifact.linear_system_intake.rank, 1);
  assert.deepEqual(passingArtifact.linear_system_intake.range_residual, [0, 0, 0, 0, 0, 0]);
  assert.equal(passingArtifact.linear_system_intake.range_residual_norm_2, 0);
  assert.deepEqual(
    passingArtifact.linear_system_intake.range_projection,
    passingArtifact.linear_system_intake.rhs_vector
  );
  assert.equal(
    passingArtifact.linear_system_intake.cokernel_projection.status,
    "live-cokernel-witness-not-needed"
  );
  assert.equal(passingArtifact.residual_vector.first_failure_row, "correction-direction-open");
  assert.equal(passingArtifact.result.retention, "not_retained");
  assert.equal(passingArtifact.result.retained_branch, false);

  const obstructedPacket = liveDerivativeMatrixPacket([[1], [-1], [1], [-1], [1], [-1]], {
    matrix_id: "same-ledger-balanced-column-fail",
    column_labels: ["zero_sum_live_direction"],
  });
  const obstructedArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: obstructedPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(obstructedArtifact), []);
  assert.equal(obstructedArtifact.live_derivative_matrix_certificate.range_membership_status, "live-rhs-out-of-range");
  assert.equal(
    obstructedArtifact.live_derivative_matrix_certificate.range_certificate_status,
    "certified-live-rhs-out-of-range"
  );
  assert.equal(
    obstructedArtifact.live_derivative_matrix_certificate.certified_cokernel_witness.status,
    "certified-live-cokernel-obstruction"
  );
  assert.equal(
    obstructedArtifact.live_derivative_matrix_certificate.certified_cokernel_witness.claim_scope,
    "certified-live-cokernel-witness"
  );
  assert.equal(
    obstructedArtifact.linear_system_intake.cokernel_projection.status,
    "certified-live-cokernel-obstruction"
  );
  assert.ok(
    obstructedArtifact.live_derivative_matrix_certificate.certified_cokernel_witness
      .witness_dot_live_columns_abs_max <= 1e-9
  );
  assert.ok(obstructedArtifact.live_derivative_matrix_certificate.live_range_residual_norm_2 > 2);
  assert.equal(obstructedArtifact.residual_vector.first_failure_row, "correction-obstruction-certified");
  assert.equal(obstructedArtifact.result.retained_branch, false);

  assert.throws(
    () =>
      evaluateLiveDerivativeMatrixCertificate(
        baseArtifact,
        liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
          certifies_correction_direction: true,
        })
      ),
    /must set certifies_correction_direction=false/
  );
  assert.throws(
    () =>
      evaluateLiveDerivativeMatrixCertificate(
        baseArtifact,
        liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
          guards: {
            ...passedLiveDerivativeGuards(),
            event_guard: "open",
          },
        })
      ),
    /event_guard must be passed/
  );

  const forgedArtifact = {
    ...baseArtifact,
    linear_system_intake: {
      ...baseArtifact.linear_system_intake,
      derivative_matrix: Array.from({ length: 6 }, () => [1]),
    },
  };
  assert.match(
    validateOctahedralZeroMeanCorrectionIntake(forgedArtifact).join("; "),
    /derivative matrix must not be claimed/
  );
});

test("octahedral zero-mean correction intake certifies first-order correction directions without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
  });
  const evaluatedDirection = evaluateLiveCorrectionDirectionCertificate(
    buildOctahedralZeroMeanCorrectionIntake({
      phaseSamples: 120,
      ySubdivisions: 240,
      liveDerivativeMatrixPacket: matrixPacket,
    }),
    directionPacket
  );

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.live_correction_direction_certificate, evaluatedDirection);
  assert.equal(
    artifact.live_correction_direction_certificate.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.certifies_live_derivative_matrix, true);
  assert.equal(artifact.artifact_claim.certifies_correction_direction, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.live_correction_direction_certificate.correction_status, "correction-direction-found");
  assert.equal(artifact.live_correction_direction_certificate.downstream_status, "bounded-speed-live-ledger-open");
  assert.equal(artifact.live_correction_direction_certificate.retention, "not_retained");
  assert.equal(artifact.linear_system_intake.correction_status, "correction-direction-found");
  assert.equal(artifact.linear_system_intake.alpha_b_vector.length, 1);
  assert.equal(artifact.linear_system_intake.solution_alpha_vector.length, 1);
  assert.equal(
    artifact.linear_system_intake.alpha_b_vector[0],
    artifact.frozen_mean_vector.period_integral_vector[0] * -1
  );
  assert.equal(artifact.linear_system_intake.alpha_b_residual_norm_2, 0);
  assert.equal(artifact.linear_system_intake.solution_residual_norm_2, 0);
  assert.equal(
    artifact.linear_system_intake.correction_direction_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA
  );
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(artifact.result.intake_status, "zero-mean-live-correction-direction-certified");
  assert.equal(artifact.result.correction_direction, "found_first_order_not_retained");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveCorrectionDirectionPacket: directionPacket,
      }),
    /requires an attached live derivative matrix certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: liveDerivativeMatrixPacket([[1], [-1], [1], [-1], [1], [-1]], {
          matrix_id: "same-ledger-balanced-column-fail",
          column_labels: ["zero_sum_live_direction"],
        }),
        liveCorrectionDirectionPacket: liveCorrectionDirectionPacket({
          source_live_derivative_matrix_id: "same-ledger-balanced-column-fail",
          alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
        }),
      }),
    /requires certified-live-rhs-in-range/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: liveCorrectionDirectionPacket({
          alpha_b_vector: [0],
        }),
      }),
    /alpha_B residual/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: liveCorrectionDirectionPacket({
          alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
          first_order_margin_guards: {
            ...passedCorrectionDirectionGuards(),
            speed_band_margin_guard: "open",
          },
        }),
      }),
    /speed_band_margin_guard must be passed/
  );
});

test("octahedral zero-mean correction intake certifies post-correction speed primitive feasibility without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const correctionArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
  });
  const evaluatedPrimitive = evaluateSpeedPrimitiveFeasibilityCertificate(correctionArtifact, primitivePacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.speed_ode_primitive_feasibility_certificate, evaluatedPrimitive);
  assert.equal(
    artifact.speed_ode_primitive_feasibility_certificate.schema,
    OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.certifies_speed_primitive_feasibility, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    artifact.speed_ode_primitive_feasibility_certificate.speed_primitive_status,
    "speed-primitive-feasibility-certified"
  );
  assert.equal(
    artifact.speed_ode_primitive_feasibility_certificate.guard_status,
    "speed-primitive-return-and-band-passed"
  );
  assert.equal(artifact.speed_ode_primitive_feasibility_certificate.downstream_status, "clock-length-return-open");
  assert.equal(artifact.speed_ode_primitive_feasibility_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.speed_ode_primitive_feasibility_certificate.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-speed-primitive-feasibility-certified");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "clock-length-return-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) => row.row === "R_speed_ode_primitive_feasibility" && row.status === "passed"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
      }),
    /requires an attached live correction direction certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          source_correction_direction_id: "wrong-alpha-id",
        }),
      }),
    /source_correction_direction_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          receiver_primitives: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            primitive_return_residual: 1e-3,
            primitive_excursion_min: -0.1,
            primitive_excursion_max: 0.1,
            nu_initial: 1,
            speed_band_lower: 0.5,
            speed_band_upper: 1.5,
          })),
        }),
      }),
    /primitive return residual/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          receiver_primitives: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            primitive_return_residual: 0,
            primitive_excursion_min: -0.1,
            primitive_excursion_max: 0.1,
            nu_initial: 1,
            speed_band_lower: 0.95,
            speed_band_upper: 1.05,
          })),
        }),
      }),
    /speed band margin/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
});

test("octahedral zero-mean correction intake certifies post-correction speed clock length without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const primitiveArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
  });
  const evaluatedClockLength = evaluateSpeedClockLengthCertificate(primitiveArtifact, clockPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.speed_ode_clock_length_certificate, evaluatedClockLength);
  assert.equal(artifact.speed_ode_clock_length_certificate.schema, OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA);
  assert.equal(artifact.artifact_claim.certifies_speed_clock_length, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.speed_ode_clock_length_certificate.speed_clock_length_status, "speed-clock-length-return-certified");
  assert.equal(artifact.speed_ode_clock_length_certificate.guard_status, "speed-clock-length-return-passed");
  assert.equal(artifact.speed_ode_clock_length_certificate.downstream_status, "normal-reconstruction-open");
  assert.equal(artifact.speed_ode_clock_length_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.speed_ode_clock_length_certificate.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-speed-clock-length-certified");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "normal-reconstruction-open");
  assert.equal(
    artifact.residual_vector.rows.some((row) => row.row === "R_speed_ode_clock_length_return" && row.status === "passed"),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedClockLengthPacket: clockPacket,
      }),
    /requires an attached speed primitive feasibility certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          source_speed_primitive_feasibility_id: "wrong-primitive-id",
        }),
      }),
    /source_speed_primitive_feasibility_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          receiver_clock_length_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            center_time_period: 2,
            target_length: 2,
            winding_number: 1,
            nu_initial: 1,
            primitive_integral: 0.001,
            length_return_residual: 1e-3,
          })),
        }),
      }),
    /length return residual/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          receiver_clock_length_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            center_time_period: 2,
            target_length: 2,
            winding_number: 1,
            nu_initial: 1,
            primitive_integral: 0.25,
            length_return_residual: 0,
          })),
        }),
      }),
    /length residual mismatch/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
});

test("octahedral zero-mean correction intake stages normal reconstruction handoff without certification", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const handoffPacket = normalReconstructionHandoffPacket();
  const clockArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
  });
  const evaluatedHandoff = evaluateNormalReconstructionHandoff(clockArtifact, handoffPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.normal_reconstruction_handoff, evaluatedHandoff);
  assert.equal(artifact.normal_reconstruction_handoff.schema, OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA);
  assert.equal(artifact.artifact_claim.emits_normal_reconstruction_handoff, true);
  assert.equal(artifact.artifact_claim.certifies_normal_reconstruction, false);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    artifact.normal_reconstruction_handoff.normal_reconstruction_handoff_status,
    "normal-reconstruction-handoff-staged"
  );
  assert.equal(artifact.normal_reconstruction_handoff.normal_reconstruction_status, "normal-reconstruction-open");
  assert.equal(artifact.normal_reconstruction_handoff.certifies_normal_reconstruction, false);
  assert.equal(artifact.normal_reconstruction_handoff.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.normal_reconstruction_handoff.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-normal-reconstruction-handoff-staged");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "normal-reconstruction-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) => row.row === "R_normal_reconstruction_handoff" && row.status === "open"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        normalReconstructionHandoffPacket: handoffPacket,
      }),
    /requires an attached speed clock length certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          source_speed_clock_length_id: "wrong-clock-length-id",
        }),
      }),
    /source_speed_clock_length_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          certifies_normal_reconstruction: true,
        }),
      }),
    /must set certifies_normal_reconstruction=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          receiver_normal_handoff_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            normal_residual_norm_2: Number.NaN,
            tangent_holonomy_residual_norm_2: 0.125,
            position_closure_residual_norm_2: 0.0625,
            unit_tangent_residual_abs_max: 0,
            support_margin_min: 0.5,
          })),
        }),
      }),
    /normal residual norms must be nonnegative finite numbers/
  );
});

test("octahedral zero-mean correction intake certifies bounded-speed normal reconstruction candidate without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const handoffPacket = normalReconstructionHandoffPacket();
  const candidatePacket = boundedSpeedNormalReconstructionCandidatePacket();
  const handoffArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
  });
  const evaluatedCandidate = evaluateBoundedSpeedNormalReconstructionCandidate(handoffArtifact, candidatePacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.bounded_speed_normal_reconstruction_candidate, evaluatedCandidate);
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.schema,
    OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.emits_bounded_speed_normal_reconstruction_candidate, true);
  assert.equal(artifact.artifact_claim.certifies_normal_reconstruction, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.candidate_status,
    "bounded-speed-normal-reconstruction-candidate"
  );
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.downstream_status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.certifies_normal_reconstruction, true);
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-bounded-speed-normal-reconstruction-candidate");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) => row.row === "R_bounded_speed_normal_reconstruction_candidate" && row.status === "passed"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
      }),
    /requires an attached normal reconstruction handoff/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          source_normal_handoff_id: "wrong-normal-handoff-id",
        }),
      }),
    /source_normal_handoff_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          tangent_holonomy_status: "normal-holonomy-open",
        }),
      }),
    /tangent holonomy row must be closed/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          receiver_normal_candidate_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            normal_residual_norm_2: 2e-9,
            tangent_holonomy_residual_norm_2: 0,
            position_closure_residual_norm_2: 0,
            unit_tangent_residual_abs_max: 0,
            support_margin_min: 0.5,
            noncollision_margin_min: 0.25,
            root_persistence_margin_min: 0.125,
            krawczyk_residual_norm_2: 0,
          })),
        }),
      }),
    /normal residuals must be inside tolerance/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          margin_floors: {
            support_margin_min: 1,
            noncollision_margin_min: 0,
            root_persistence_margin_min: 0,
          },
        }),
      }),
    /support margins must clear the floor/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          retained_branch: true,
        }),
      }),
    /must set retained_branch=false/
  );
});

test("octahedral zero-mean correction intake emits fail-closed action stability boundary after normal candidate", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const handoffPacket = normalReconstructionHandoffPacket();
  const candidatePacket = boundedSpeedNormalReconstructionCandidatePacket();
  const actionPacket = actionStabilityAfterNormalCandidatePacket();
  const candidateArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
    actionStabilityAfterNormalCandidatePacket: actionPacket,
  });
  const evaluatedIntake = evaluateActionStabilityAfterNormalCandidateIntake(candidateArtifact, actionPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.action_stability_after_normal_candidate_intake, evaluatedIntake);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.emits_action_stability_after_normal_candidate_intake, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.certifies_action_stability, false);
  assert.equal(artifact.artifact_claim.certifies_observer_export, false);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.source_normal_reconstruction_candidate_id,
    artifact.bounded_speed_normal_reconstruction_candidate.normal_reconstruction_candidate_id
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.live_ledger_status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.intake_status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.consumer_checksum_id,
    artifact.bounded_speed_normal_reconstruction_candidate.consumer_checksum_id
  );
  assert.deepEqual(
    Object.keys(
      artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
        .required_same_ledger_rows
    ),
    REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row]) => row)
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.action_derived_scale.downstream_row,
    "action_scale"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.noether_event_exchange.status,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .live_ledger_identity_target.required_closed_rows,
    REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_ROWS
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .live_ledger_identity_target.missing_closed_rows,
    MISSING_LIVE_LEDGER_CLOSED_ROWS
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .live_ledger_identity_target.first_missing_closed_row,
    "action_derived_scale"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .live_ledger_identity_target.negative_control_status,
    "same-ledger-id-tuple-without-closed-downstream-rows-not-live-ledger"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .live_ledger_identity_target.certifies_bounded_speed_live_ledger,
    false
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.required_variables,
    ACTION_DERIVED_SCALE_TARGET_REQUIRED_VARIABLES
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.required_rows,
    ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.current_fixture_supplied_rows,
    ["bounded_speed_normal_reconstruction_candidate"]
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.missing_rows,
    MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.first_missing_required_row,
    "action_measure_row"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.negative_control_status,
    "same-ledger-tuple-without-action-scale-rows-not-action-derived-scale"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.rejected_current_fixture,
    true
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.row,
    "action_measure_row"
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.required_variables,
    ACTION_MEASURE_ROW_TARGET_REQUIRED_VARIABLES
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.required_measure_fields,
    ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.current_fixture_supplied_measure_fields,
    ["same_ledger_identity_tuple"]
  );
  assert.deepEqual(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.missing_measure_fields,
    MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.first_missing_measure_field,
    "branch_scope"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.negative_control_status,
    "same-ledger-tuple-without-action-functional-not-action-measure-row"
  );
  const branchScopeSourceAudit =
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.branch_scope_source_audit;
  assert.equal(
    branchScopeSourceAudit.schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA
  );
  assert.equal(branchScopeSourceAudit.candidate_count, ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_CANDIDATES.length);
  assert.equal(branchScopeSourceAudit.accepted_count, 0);
  assert.equal(branchScopeSourceAudit.accepted_branch_scope_source, null);
  assert.equal(branchScopeSourceAudit.first_failure, "same_ledger_branch_scope_source_missing");
  assert.deepEqual(branchScopeSourceAudit.search_basis, {
    searched_roots: ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_ROOTS,
    searched_terms: ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_TERMS,
    result: ACTION_MEASURE_BRANCH_SCOPE_AUDIT_RESULT,
  });
  assert.deepEqual(branchScopeSourceAudit.acceptance_criteria, {
    required_identity_tuple: {
      bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
      force_checksum_id: "force-checksum-test",
      consumer_checksum_id: "consumer-checksum-test",
      source_normal_reconstruction_candidate_id:
        "post-correction-bounded-speed-normal-reconstruction-candidate-test",
    },
    required_same_ledger_fields: ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS,
    required_action_measure_fields: ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS,
    required_acceptance_bindings: ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS,
  });
  assert.equal(
    branchScopeSourceAudit.negative_control_status,
    "branch-scope-artifacts-without-same-ledger-action-measure-row-not-bound"
  );
  assert.equal(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.status,
    "fail-closed-nearest-candidate-lineage"
  );
  assert.equal(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.readiness_status,
    ACTION_MEASURE_BRANCH_SCOPE_NEAREST_READINESS_STATUS
  );
  assert.deepEqual(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.closest_rejected_branch_scope_source,
    ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE
  );
  assert.deepEqual(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.present_fields,
    ["branch_scope"]
  );
  assert.deepEqual(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.missing_same_ledger_fields,
    ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS
  );
  assert.deepEqual(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.missing_action_measure_fields,
    ACTION_MEASURE_BRANCH_SCOPE_NEAREST_MISSING_ACTION_MEASURE_FIELDS
  );
  assert.deepEqual(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.required_acceptance_bindings,
    ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS
  );
  assert.equal(
    branchScopeSourceAudit.nearest_candidate_lineage_readout.smallest_next_evidence_object,
    ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT
  );
  assert.deepEqual(
    branchScopeSourceAudit.candidate_branch_scope_sources.map((source) => source.first_rejection_code),
    ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_CANDIDATES.map((source) => source.first_rejection_code)
  );
  assert.equal(
    branchScopeSourceAudit.candidate_branch_scope_sources.every(
      (source) =>
        source.branch_scope_status === "present" &&
        source.observed_fields.length === 1 &&
        source.observed_fields[0] === "branch_scope" &&
        source.missing_required_identity_fields.join("|") ===
          ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS.join("|") &&
        source.missing_action_measure_fields.join("|") ===
          ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS.join("|") &&
        JSON.stringify(source.action_measure_field_statuses) ===
          JSON.stringify(ACTION_MEASURE_BRANCH_SCOPE_CANDIDATE_FIELD_STATUSES) &&
        source.same_ledger_tuple_match === false &&
        source.action_measure_row_status === "absent" &&
        source.accepted_for_action_measure_branch_scope === false &&
        source.rejection_summary ===
          "branch_scope provenance is present, but no same-ledger identity tuple or action_measure_row binds it to the bounded-speed normal-candidate ledger"
    ),
    true
  );
  const actionMeasureWithBranchScopeAttempt =
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target
      .same_ledger_action_measure_row_with_branch_scope_attempt;
  assert.equal(
    actionMeasureWithBranchScopeAttempt.schema,
    OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA
  );
  assert.equal(actionMeasureWithBranchScopeAttempt.status, "fail-closed-target");
  assert.equal(
    actionMeasureWithBranchScopeAttempt.attempted_evidence_object,
    ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT
  );
  assert.deepEqual(
    actionMeasureWithBranchScopeAttempt.current_fixture_supplied_measure_fields,
    ["same_ledger_identity_tuple"]
  );
  assert.deepEqual(
    actionMeasureWithBranchScopeAttempt.attempted_measure_fields,
    ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_FIELDS
  );
  assert.deepEqual(
    actionMeasureWithBranchScopeAttempt.missing_measure_fields_if_branch_scope_bound,
    ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS
  );
  assert.equal(actionMeasureWithBranchScopeAttempt.branch_scope_binding_status, "not_accepted");
  assert.equal(
    actionMeasureWithBranchScopeAttempt.branch_scope_source_audit_first_failure,
    "same_ledger_branch_scope_source_missing"
  );
  assert.equal(
    actionMeasureWithBranchScopeAttempt.first_missing_subfield_after_branch_scope,
    "period_rows"
  );
  assert.equal(actionMeasureWithBranchScopeAttempt.constructed_action_measure_row, null);
  assert.deepEqual(
    actionMeasureWithBranchScopeAttempt.fail_closed_action_measure_row_target,
    {
      row: "action_measure_row",
      status: "absent-fail-closed",
      candidate_row_status: "not_constructed",
      accepted_row_status: "absent",
      required_row_fields: ACTION_MEASURE_ROW_CANDIDATE_REQUIRED_FIELDS,
      supplied_fields_on_normal_candidate_ledger: CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS,
      missing_fields_on_normal_candidate_ledger: MISSING_ACTION_MEASURE_ROW_CANDIDATE_FIELDS,
      missing_same_ledger_bindings: ACTION_MEASURE_ROW_MISSING_SAME_LEDGER_BINDINGS,
      first_blocker: "same_ledger_branch_scope_source_missing",
      field_statuses_on_normal_candidate_ledger: ACTION_MEASURE_ROW_CANDIDATE_FIELD_STATUS_ROWS,
      certifies_action_measure_row: false,
      retention: "not_retained",
      retained_branch: false,
    }
  );
  assert.deepEqual(actionMeasureWithBranchScopeAttempt.period_rows_target, {
    field: "period_rows",
    status: "target-only-blocked-by-branch-scope",
    source_action_measure_row: "action_measure_row",
    blocking_failure: "same_ledger_branch_scope_source_missing",
    first_failure: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_FIRST_FAILURE,
    accepted_period_rows_source: null,
    candidate_count: 0,
    negative_control_status: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_NEGATIVE_CONTROL,
    smallest_next_evidence_object:
      ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_SMALLEST_NEXT_EVIDENCE_OBJECT,
  });
  assert.deepEqual(
    actionMeasureWithBranchScopeAttempt.rank5_retained_branch_closure_producer_target,
    {
      schema: OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA,
      claim_scope:
        "rank5-retained-branch-action-measure-producer-target-after-normal-candidate",
      promotion_status: "priority-only",
      top_six_rank: 5,
      closure_route: "bounded-speed-live-ledger",
      source_after_normal_packet: "bounded-speed-normal-reconstruction-candidate",
      source_normal_reconstruction_candidate_id:
        actionMeasureWithBranchScopeAttempt.required_identity_tuple
          .source_normal_reconstruction_candidate_id,
      bounded_speed_ledger_id:
        actionMeasureWithBranchScopeAttempt.required_identity_tuple.bounded_speed_ledger_id,
      force_checksum_id:
        actionMeasureWithBranchScopeAttempt.required_identity_tuple.force_checksum_id,
      consumer_checksum_id:
        actionMeasureWithBranchScopeAttempt.required_identity_tuple.consumer_checksum_id,
      attempted_evidence_object: ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
      required_identity_tuple: {
        ...actionMeasureWithBranchScopeAttempt.required_identity_tuple,
      },
      required_producer_fields: RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REQUIRED_FIELDS,
      supplied_fields_on_normal_candidate_ledger: ["same_ledger_identity_tuple"],
      missing_producer_fields: MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS,
      first_missing_producer_field: "branch_scope",
      first_blocker: "same_ledger_branch_scope_source_missing",
      rejected_evidence_kinds: RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE,
      nearest_rejected_source: {
        ...ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE,
      },
      finite_mode_solver_action_measure_row_producer_target: {
        schema: OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA,
        claim_scope: "bounded-speed-finite-mode-action-measure-row-producer-target",
        promotion_status: "priority-only",
        target_status: "producer_target_blocked",
        expected_source_object:
          "bounded-speed-factor-finite-mode-solver-artifact-with-action-measure-row",
        expected_source_packet:
          "reference/priorities/braid-archive/braid-retained-branch-closure/shell-braid/bounded-speed-factor-finite-mode-branch-system.md",
        source_after_normal_packet: "bounded-speed-normal-reconstruction-candidate",
        source_normal_reconstruction_candidate_id:
          actionMeasureWithBranchScopeAttempt.required_identity_tuple
            .source_normal_reconstruction_candidate_id,
        required_identity_tuple: {
          ...actionMeasureWithBranchScopeAttempt.required_identity_tuple,
        },
        required_same_ledger_row_fields:
          FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS,
        supplied_fields_on_normal_candidate_ledger:
          CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS,
        missing_same_ledger_row_fields:
          FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS.filter(
            (field) => !CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS.includes(field)
          ),
        first_missing_same_ledger_field: "branch_scope",
        first_blocker: "same_ledger_branch_scope_source_missing",
        required_finite_mode_sections: [
          "branch_scope",
          "clock_period",
          "root_sheet_rows",
          "force_rows",
          "event_rows",
          "variational_noether",
          "derivative_matrix",
          "full_stack_embedding",
        ],
        negative_controls: RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE,
        accepted_same_ledger_action_measure_row: null,
        authorizes_rank5_retention: false,
        certifies_action_measure_row: false,
        certifies_bounded_speed_live_ledger: false,
        retention: "not_retained",
        retained_branch: false,
      },
      negative_control_status:
        "same-ledger-tuple-without-branch-scope-action-measure-not-rank5-retained-branch",
      accepted_same_ledger_action_measure_row: null,
      certifies_action_measure_row: false,
      certifies_rank5_retained_branch_closure: false,
      certifies_bounded_speed_live_ledger: false,
      retention: "not_retained",
      retained_branch: false,
    }
  );
  assert.equal(actionMeasureWithBranchScopeAttempt.certifies_action_measure_row, false);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.action_measure_row_target.certifies_action_measure_row,
    false
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .action_derived_scale_target.certifies_action_derived_scale,
    false
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.first_failure_row,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.downstream_row_statuses.action_scale,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.downstream_row_statuses.coupled_fixed_point,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.certifies_bounded_speed_live_ledger,
    false
  );
  assert.equal(artifact.action_stability_after_normal_candidate_intake.certifies_action_stability, false);
  assert.equal(artifact.action_stability_after_normal_candidate_intake.certifies_observer_export, false);
  assert.equal(artifact.action_stability_after_normal_candidate_intake.retention, "not_retained");
  assert.equal(artifact.action_stability_after_normal_candidate_intake.retained_branch, false);
  assert.equal(artifact.result.intake_status, "zero-mean-action-stability-after-normal-candidate-blocked");
  assert.equal(artifact.result.action_stability, "not_certified");
  assert.equal(artifact.result.observer_export, "not_authorized");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) =>
        row.row === "R_bounded_speed_action_stability_after_normal_candidate" &&
        row.status === "open" &&
        row.value === "bounded-speed-live-ledger-open"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        actionStabilityAfterNormalCandidatePacket: actionPacket,
      }),
    /requires an attached bounded speed normal reconstruction candidate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_ledger_id: "wrong-ledger",
        }),
      }),
    /bounded_speed_ledger_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: undefined,
        }),
      }),
    /must declare bounded_speed_live_ledger target/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            consumer_checksum_id: "wrong-consumer-checksum",
          },
        }),
      }),
    /bounded_speed_live_ledger consumer_checksum_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            live_ledger_identity_target: {
              ...actionPacket.bounded_speed_live_ledger.live_ledger_identity_target,
              certifies_bounded_speed_live_ledger: true,
            },
          },
        }),
      }),
    /identity target must set certifies_bounded_speed_live_ledger=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            action_derived_scale_target: {
              ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target,
              certifies_action_derived_scale: true,
            },
          },
        }),
      }),
    /action_derived_scale_target must set certifies_action_derived_scale=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            action_derived_scale_target: {
              ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target,
              action_measure_row_target: {
                ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                  .action_measure_row_target,
                certifies_action_measure_row: true,
              },
            },
          },
        }),
      }),
    /action_measure_row_target must set certifies_action_measure_row=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            action_derived_scale_target: {
              ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target,
              action_measure_row_target: {
                ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                  .action_measure_row_target,
                branch_scope_source_audit: {
                  ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                    .action_measure_row_target.branch_scope_source_audit,
                  nearest_candidate_lineage_readout: {
                    ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                      .action_measure_row_target.branch_scope_source_audit
                      .nearest_candidate_lineage_readout,
                    missing_same_ledger_fields: ["bounded_speed_ledger_id"],
                  },
                },
              },
            },
          },
        }),
      }),
    /nearest_candidate_lineage_readout missing_same_ledger_fields mismatch/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            action_derived_scale_target: {
              ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target,
              action_measure_row_target: {
                ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                  .action_measure_row_target,
                same_ledger_action_measure_row_with_branch_scope_attempt: {
                  ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                    .action_measure_row_target
                    .same_ledger_action_measure_row_with_branch_scope_attempt,
                  fail_closed_action_measure_row_target: {
                    ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                      .action_measure_row_target
                      .same_ledger_action_measure_row_with_branch_scope_attempt
                      .fail_closed_action_measure_row_target,
                    missing_fields_on_normal_candidate_ledger: ["branch_scope"],
                  },
                },
              },
            },
          },
        }),
      }),
    /fail_closed_action_measure_row_target missing fields mismatch/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            action_derived_scale_target: {
              ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target,
              action_measure_row_target: {
                ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                  .action_measure_row_target,
                same_ledger_action_measure_row_with_branch_scope_attempt: {
                  ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                    .action_measure_row_target
                    .same_ledger_action_measure_row_with_branch_scope_attempt,
                  rank5_retained_branch_closure_producer_target: {
                    ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                      .action_measure_row_target
                      .same_ledger_action_measure_row_with_branch_scope_attempt
                      .rank5_retained_branch_closure_producer_target,
                    finite_mode_solver_action_measure_row_producer_target: {
                      ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                        .action_measure_row_target
                        .same_ledger_action_measure_row_with_branch_scope_attempt
                        .rank5_retained_branch_closure_producer_target
                        .finite_mode_solver_action_measure_row_producer_target,
                      negative_controls: ["fixture-rows"],
                    },
                  },
                },
              },
            },
          },
        }),
      }),
    /finite_mode_solver_action_measure_row_producer_target negative controls mismatch/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            action_derived_scale_target: {
              ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target,
              action_measure_row_target: {
                ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                  .action_measure_row_target,
                branch_scope_source_audit: {
                  ...actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                    .action_measure_row_target.branch_scope_source_audit,
                  candidate_branch_scope_sources:
                    actionPacket.bounded_speed_live_ledger.action_derived_scale_target
                      .action_measure_row_target.branch_scope_source_audit
                      .candidate_branch_scope_sources.map((candidateSource, index) =>
                        index === 0
                          ? {
                              ...candidateSource,
                              action_measure_field_statuses: [
                                {
                                  field: "branch_scope",
                                  candidate_source_status: "present",
                                  normal_candidate_ledger_status: "accepted",
                                },
                              ],
                            }
                          : candidateSource
                      ),
                },
              },
            },
          },
        }),
      }),
    /action_measure_field_statuses mismatch/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          downstream_row_statuses: {
            ...actionPacket.downstream_row_statuses,
            action_curl: "action-curl-open",
          },
        }),
      }),
    /downstream row action_curl must be blocked:bounded-speed-live-ledger-open/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          certifies_action_stability: true,
        }),
      }),
    /must set certifies_action_stability=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          retained_branch: true,
        }),
      }),
    /must set retained_branch=false/
  );
});

test("octahedral zero-mean correction intake CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-zero-mean-intake-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const candidatePath = path.join(tempDir, "candidate-b-pass.json");
  const failCandidatePath = path.join(tempDir, "candidate-b-fail.json");
  const liveDerivativeColumnPath = path.join(tempDir, "live-derivative-columns.json");
  const liveDerivativeMatrixPath = path.join(tempDir, "live-derivative-matrix.json");
  const liveCorrectionDirectionPath = path.join(tempDir, "live-correction-direction.json");
  const speedPrimitiveFeasibilityPath = path.join(tempDir, "speed-primitive-feasibility.json");
  const speedClockLengthPath = path.join(tempDir, "speed-clock-length.json");
  const normalReconstructionHandoffPath = path.join(tempDir, "normal-reconstruction-handoff.json");
  const boundedSpeedNormalReconstructionCandidatePath = path.join(
    tempDir,
    "bounded-speed-normal-reconstruction-candidate.json"
  );
  const actionStabilityAfterNormalCandidatePath = path.join(
    tempDir,
    "action-stability-after-normal-candidate.json"
  );
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs", import.meta.url)
  );
  fs.writeFileSync(
    candidatePath,
    `${JSON.stringify(
      candidateBPacket(Array.from({ length: 6 }, () => [1]), {
        matrix_id: "constant-column-pass",
        column_labels: ["constant_receiver_column"],
      })
    )}\n`
  );
  fs.writeFileSync(
    failCandidatePath,
    `${JSON.stringify(
      candidateBPacket([[1], [-1], [1], [-1], [1], [-1]], {
        matrix_id: "balanced-column-fail",
        column_labels: ["zero_sum_column"],
      })
    )}\n`
  );
  fs.writeFileSync(liveDerivativeColumnPath, `${JSON.stringify(liveDerivativeColumnPacket())}\n`);
  fs.writeFileSync(
    liveDerivativeMatrixPath,
    `${JSON.stringify(
      liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
        matrix_id: "same-ledger-constant-column-pass",
        column_labels: ["constant_receiver_direction"],
      })
    )}\n`
  );
  fs.writeFileSync(
    liveCorrectionDirectionPath,
    `${JSON.stringify(
      liveCorrectionDirectionPacket({
        alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
      })
    )}\n`
  );
  fs.writeFileSync(speedPrimitiveFeasibilityPath, `${JSON.stringify(speedPrimitiveFeasibilityPacket())}\n`);
  fs.writeFileSync(speedClockLengthPath, `${JSON.stringify(speedClockLengthPacket())}\n`);
  fs.writeFileSync(normalReconstructionHandoffPath, `${JSON.stringify(normalReconstructionHandoffPacket())}\n`);
  fs.writeFileSync(
    boundedSpeedNormalReconstructionCandidatePath,
    `${JSON.stringify(boundedSpeedNormalReconstructionCandidatePacket())}\n`
  );
  fs.writeFileSync(
    actionStabilityAfterNormalCandidatePath,
    `${JSON.stringify(actionStabilityAfterNormalCandidatePacket())}\n`
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--samples",
      "120",
      "--subdivisions",
      "240",
      "--candidate-b",
      candidatePath,
      "--live-derivative-columns",
      liveDerivativeColumnPath,
      "--probe-live-derivative-preview",
      "--live-derivative-matrix",
      liveDerivativeMatrixPath,
      "--live-correction-direction",
      liveCorrectionDirectionPath,
      "--speed-primitive-feasibility",
      speedPrimitiveFeasibilityPath,
      "--speed-clock-length",
      speedClockLengthPath,
      "--normal-reconstruction-handoff",
      normalReconstructionHandoffPath,
      "--bounded-speed-normal-reconstruction-candidate",
      boundedSpeedNormalReconstructionCandidatePath,
      "--action-stability-after-normal-candidate",
      actionStabilityAfterNormalCandidatePath,
      "--out",
      artifactPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.equal(artifact.live_derivative_column_intake.guard_status, "live-derivative-column-provenance-checked");
  assert.equal(
    artifact.live_derivative_column_preview_range_probe.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.intake_status, "zero-mean-action-stability-after-normal-candidate-blocked");
  assert.equal(validation.result.correction_direction, "found_first_order_not_retained");
  assert.equal(validation.result.action_stability, "not_certified");
  assert.equal(validation.result.observer_export, "not_authorized");
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.result.retained_branch, false);
  assert.equal(validation.linear_system_intake.live_derivative_status, "live-derivative-matrix-certified");
  assert.equal(validation.linear_system_intake.range_certificate_status, "certified-live-rhs-in-range");
  assert.equal(validation.candidate_b_range_probe.range_membership_status, "candidate-rhs-in-range");
  assert.equal(validation.live_derivative_column_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(validation.live_derivative_column_preview_range_probe.range_membership_status, "preview-rhs-in-range");
  assert.equal(validation.live_derivative_matrix_certificate.range_membership_status, "live-rhs-in-range");
  assert.equal(validation.live_correction_direction_certificate.correction_status, "correction-direction-found");
  assert.equal(validation.live_correction_direction_certificate.retention, "not_retained");
  assert.equal(
    validation.speed_ode_primitive_feasibility_certificate.speed_primitive_status,
    "speed-primitive-feasibility-certified"
  );
  assert.equal(validation.speed_ode_primitive_feasibility_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    validation.speed_ode_clock_length_certificate.speed_clock_length_status,
    "speed-clock-length-return-certified"
  );
  assert.equal(validation.speed_ode_clock_length_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    validation.normal_reconstruction_handoff.normal_reconstruction_handoff_status,
    "normal-reconstruction-handoff-staged"
  );
  assert.equal(validation.normal_reconstruction_handoff.certifies_normal_reconstruction, false);
  assert.equal(validation.normal_reconstruction_handoff.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    validation.bounded_speed_normal_reconstruction_candidate.candidate_status,
    "bounded-speed-normal-reconstruction-candidate"
  );
  assert.equal(validation.bounded_speed_normal_reconstruction_candidate.certifies_normal_reconstruction, true);
  assert.equal(
    validation.bounded_speed_normal_reconstruction_candidate.certifies_bounded_speed_live_ledger,
    false
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.first_failure_row,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.coupled_fixed_point.status,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.downstream_row_statuses.action_scale,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.certifies_action_stability,
    false
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.certifies_observer_export,
    false
  );
  assert.equal(validation.action_stability_after_normal_candidate_intake.retained_branch, false);

  const validationWithColumnPacket = JSON.parse(
    execFileSync(
      process.execPath,
      [scriptPath, "--validate", artifactPath, "--live-derivative-columns", liveDerivativeColumnPath, "--probe-live-derivative-preview"],
      {
        encoding: "utf8",
      }
    )
  );
  assert.equal(validationWithColumnPacket.valid, true);
  assert.equal(
    validationWithColumnPacket.live_derivative_column_intake.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA
  );
  assert.equal(
    validationWithColumnPacket.live_derivative_column_preview_range_probe.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );

  const validationWithFailProbe = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath, "--candidate-b", failCandidatePath], {
      encoding: "utf8",
    })
  );
  assert.equal(validationWithFailProbe.valid, true);
  assert.equal(validationWithFailProbe.candidate_b_range_probe.range_membership_status, "candidate-rhs-out-of-range");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA);
  assert.equal(schema.candidate_b_schema, OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA);
  assert.equal(schema.candidate_b_range_probe_schema, OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA);
  assert.equal(schema.live_derivative_column_intake_schema, OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA);
  assert.equal(
    schema.live_derivative_column_preview_range_probe_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );
  assert.equal(
    schema.live_derivative_matrix_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.live_correction_direction_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.speed_primitive_feasibility_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.speed_clock_length_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.normal_reconstruction_handoff_schema,
    OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA
  );
  assert.equal(
    schema.bounded_speed_normal_reconstruction_candidate_schema,
    OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA
  );
  assert.equal(
    schema.action_stability_after_normal_candidate_intake_schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA
  );
});

test("octahedral zero-mean correction intake validates committed normal-candidate fixture", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-zero-mean-fixture-"));
  const artifactPath = path.join(tempDir, "fixture-artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs", import.meta.url)
  );
  const fixtureDir = fileURLToPath(
    new URL("../scripts/neutral-braid/fixtures/zero-mean-normal-candidate/", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--samples",
      "120",
      "--subdivisions",
      "240",
      "--live-derivative-matrix",
      path.join(fixtureDir, "live-derivative-matrix.json"),
      "--live-correction-direction",
      path.join(fixtureDir, "live-correction-direction.json"),
      "--speed-primitive-feasibility",
      path.join(fixtureDir, "speed-primitive-feasibility.json"),
      "--speed-clock-length",
      path.join(fixtureDir, "speed-clock-length.json"),
      "--normal-reconstruction-handoff",
      path.join(fixtureDir, "normal-reconstruction-handoff.json"),
      "--bounded-speed-normal-reconstruction-candidate",
      path.join(fixtureDir, "bounded-speed-normal-reconstruction-candidate.json"),
      "--action-stability-after-normal-candidate",
      path.join(fixtureDir, "action-stability-after-normal-candidate.json"),
      "--out",
      artifactPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(validation.valid, true);
  assert.equal(artifact.result.intake_status, "zero-mean-action-stability-after-normal-candidate-blocked");
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(artifact.artifact_claim.emits_bounded_speed_normal_reconstruction_candidate, true);
  assert.equal(artifact.artifact_claim.emits_action_stability_after_normal_candidate_intake, true);
  assert.equal(artifact.artifact_claim.certifies_normal_reconstruction, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.certifies_action_stability, false);
  assert.equal(artifact.artifact_claim.certifies_observer_export, false);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.candidate_status,
    "bounded-speed-normal-reconstruction-candidate"
  );
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.retained_branch, false);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.first_failure_row,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.action_derived_scale.downstream_row,
    "action_scale"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.downstream_row_statuses.observer_export_eligibility,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(artifact.action_stability_after_normal_candidate_intake.retained_branch, false);
});
