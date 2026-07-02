import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_SOURCE_PROOF_FIELD,
  SCHEMA as CENTRAL_SOLVER_RETAINED_HISTORY_ROW_SCHEMA,
  buildCentralSolverRetainedHistoryRow,
} from "./central-solver-retained-history-row.mjs";
import { buildCentralSolverRetainedHistoryProviderObject } from "./central-solver-retained-history-provider-object.mjs";
import { buildHeldReleasePathHistoryStreamManifestSet } from "./held-release-path-history-stream-manifest-set.mjs";
import { buildHeldReleaseSeedPathRows } from "./held-release-seed-path-rows.mjs";

export const SCHEMA = "braid_ideal_chirality_retained_history_target.v0";
export const FIRST_MISSING_OBJECT = "central_solver_retained_history_provider_object";
export const FIRST_MISSING_FIELD = FIRST_MISSING_SOURCE_PROOF_FIELD;
export const FIRST_MISSING_RESIDUAL_MEASUREMENT_FIELD =
  "braid_ideal_chirality_retained_history_target.residual_vector.R_phase.accepted_measurement_ref";
export const RESIDUAL_MEASUREMENT_ROW_SCHEMA = "braid_ideal_chirality_residual_measurement_row.v0";
export const PHASE_ORDER_MEASUREMENT_ROW_SCHEMA =
  "braid_ideal_chirality_phase_order_measurement_row.v0";
export const PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA =
  "braid_ideal_chirality_partner_causal_root_residual_row.v0";
export const SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA =
  "braid_ideal_chirality_same_source_self_hit_residual_row.v0";
export const RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA =
  "braid_ideal_chirality_retained_wake_history_residual_row.v0";
export const SAME_RECORD_ACTION_ENERGY_RESIDUAL_ROW_SCHEMA =
  "braid_ideal_chirality_same_record_action_energy_residual_row.v0";
export const FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD =
  "braid_ideal_chirality_retained_history_target.residual_vector.R_J.value.measurement_passed";

const RESIDUAL_COMPONENTS = Object.freeze([
  "R_phase",
  "R_root",
  "R_self",
  "R_wake",
  "R_action",
  "R_J",
  "R_support",
  "R_return",
  "R_charge",
]);

const REQUIRED_RETAINED_HISTORY_COMPONENTS = Object.freeze([
  "central_solver_retained_history_row",
  "path_history_stream_ids",
  "same_source_self_hit_rows",
  "partner_causal_root_replay_rows",
  "retained_wake_history_rows",
  "same_record_action_ledger_rows",
  "same_record_momentum_rows",
  "same_record_angular_momentum_rows",
  "oblate_spheroid_residual_rows",
  "spherical_support_projection_rows",
  "charged_sector_polarity_ledger_rows_when_exposed",
  "stability_or_return_margin_row",
  "retained_source_binding",
  "provider_provenance",
]);

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_chirality_retained_history_target",
  "accepted_matter_antimatter_chirality_bridge",
  "retainedBranchClaim",
  "matter_antimatter_discovery_claim",
  "particle_sector_promotion",
  "accepted_branch_chart",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_chirality_retained_history_evidence",
  diagnostic: "diagnostic_not_accepted_chirality_retained_history_evidence",
  target_contract: "target_contract_not_accepted_chirality_retained_history_evidence",
  static_support_table: "static_support_table_not_chirality_retained_history_evidence",
  polarity_relabel: "polarity_relabel_not_matter_antimatter_operation_evidence",
  charged_sector_inventory: "charged_sector_inventory_not_branch_chirality_evidence",
  dirty_toy_output: "dirty_toy_output_not_accepted_chirality_retained_history_evidence",
  generated_decoy: "generated_decoy_not_accepted_chirality_retained_history_evidence",
  proxy_row: "proxy_row_not_accepted_chirality_retained_history_evidence",
  proxy_ref: "proxy_ref_not_accepted_chirality_retained_history_evidence",
  candidate_ref: "candidate_ref_not_accepted_chirality_retained_history_evidence",
  aggregate_row: "aggregate_row_not_same_record_chirality_retained_history_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_chirality_retained_history_evidence",
  temp_probe: "temp_probe_not_accepted_chirality_retained_history_evidence",
  endpoint_only_row: "endpoint_only_row_not_chirality_retained_history_evidence",
  synthetic_accepted_ref: "synthetic_accepted_ref_not_chirality_retained_history_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeDurableManifestRefs({ retainedRecordId, seedArtifact }) {
  return (seedArtifact?.rows ?? []).map((row, index) => {
    const digest = stableHash({
      retainedRecordId,
      source_seed_row_id: row?.row_id ?? null,
      source_seed_row_artifact_hash: row?.artifact_hash ?? null,
      index,
    }).slice(0, 16);
    return `durable:braid-ideal:chirality-target:v0:path-history-stream:${index}:${digest}`;
  });
}

function makeCentralSolverRowSchema() {
  return {
    schema_id: SCHEMA,
    required_source_schema: CENTRAL_SOLVER_RETAINED_HISTORY_ROW_SCHEMA,
    producer_contract: "central_solver_retained_history_row.v0 plus paired chirality residual packet",
    row_roles: ["matter_row", "antimatter_row"],
    required_top_level_fields: [
      "schema",
      "target_id",
      "central_solver_retained_history_row_request",
      "paired_rows",
      "conjugation_map",
      "residual_vector",
      "support_projection",
      "first_blocker",
      "authorization",
    ],
    required_paired_row_fields: [
      "row_role",
      "chi_c",
      "chirality_record",
      "central_solver_retained_history_row_ref",
      "retained_record_id",
      "phase_order_requirement",
      "required_retained_history_components",
      "support_projection_requirement",
      "first_missing_field",
    ],
    required_residual_components: [...RESIDUAL_COMPONENTS],
  };
}

function retainedRecordIdFromCentralSolverRow(centralSolverRow) {
  return centralSolverRow?.retained_record_request?.retained_record_id ?? null;
}

function isProviderBackedCentralSolverRow(centralSolverRow) {
  return (
    centralSolverRow?.schema === CENTRAL_SOLVER_RETAINED_HISTORY_ROW_SCHEMA &&
    typeof centralSolverRow?.provider_provenance?.provider_object_ref === "string" &&
    typeof retainedRecordIdFromCentralSolverRow(centralSolverRow) === "string"
  );
}

function makeProviderBackedResidualValue(component, { centralSolverRow, providerObject } = {}) {
  const retainedRecordId = retainedRecordIdFromCentralSolverRow(centralSolverRow);
  const providerObjectRef = centralSolverRow?.provider_provenance?.provider_object_ref ?? null;
  const base = {
    schema: "braid_ideal_chirality_retained_history_residual_status.v0",
    residual_component: component,
    retained_record_id: retainedRecordId,
    central_solver_retained_history_row_ref: centralSolverRow?.row_id ?? null,
    provider_object_ref: providerObjectRef,
    provider_object_status: providerObject?.artifact_status ?? null,
    provider_object_evidence_reason: providerObject?.evidence_evaluation?.reason ?? null,
    measurement_status: "provider_backed_source_present_measurement_missing",
    measured: false,
    measured_value: null,
    accepted_measurement_ref: null,
  };
  if (component === "R_phase") {
    return {
      ...base,
      matter_orientation_sign: 1,
      antimatter_orientation_sign: -1,
      required_relation: "theta_orb, psi, and Omega_chi reverse sign in the declared branch frame",
      first_missing_row: "same_record_phase_order_measurement_row",
    };
  }
  if (component === "R_root") {
    return {
      ...base,
      partner_causal_root_requirement_count:
        centralSolverRow?.partner_causal_root_replay_requirements?.length ?? 0,
      retained_causal_root_row_count:
        centralSolverRow?.partner_causal_root_replay_requirements?.filter(
          (row) => row?.retained_causal_root_row_ref != null
        ).length ?? 0,
      first_missing_row: "same_record_partner_causal_root_residual_row",
    };
  }
  if (component === "R_self") {
    return {
      ...base,
      same_source_self_hit_requirement_count:
        centralSolverRow?.same_source_self_hit_requirements?.length ?? 0,
      accepted_same_source_self_hit_row_count:
        centralSolverRow?.same_source_self_hit_requirements?.filter(
          (row) => row?.accepted_same_source_self_hit_row_ref != null
        ).length ?? 0,
      first_missing_row: "same_source_self_hit_residual_row",
    };
  }
  if (component === "R_wake") {
    return {
      ...base,
      hook_id: centralSolverRow?.wake_ledger_hook_requirement?.hook_id ?? null,
      accepted_wake_row_count:
        centralSolverRow?.wake_ledger_hook_requirement?.accepted_rows?.length ?? 0,
      first_missing_row: "retained_wake_history_residual_row",
    };
  }
  if (component === "R_action") {
    return {
      ...base,
      hook_id: centralSolverRow?.action_ledger_hook_requirement?.hook_id ?? null,
      accepted_action_row_count:
        centralSolverRow?.action_ledger_hook_requirement?.accepted_rows?.length ?? 0,
      first_missing_row: "same_record_action_energy_residual_row",
    };
  }
  if (component === "R_J") {
    return {
      ...base,
      required_relation: "L_int reverses sign while preserving the declared magnitude row",
      same_record_angular_momentum_row_count: 0,
      first_missing_row: "same_record_angular_momentum_residual_row",
    };
  }
  if (component === "R_support") {
    return {
      ...base,
      support_class_is_output_diagnostic: true,
      allowed_reported_classes: ["face-opposite", "axial-paired", "other"],
      reported_spherical_support_class: null,
      first_missing_row: "same_record_support_projection_residual_row",
    };
  }
  if (component === "R_return") {
    return {
      ...base,
      return_or_stability_status: null,
      stability_or_return_margin_row_count: 0,
      first_missing_row: "same_record_stability_or_return_residual_row",
    };
  }
  return {
    ...base,
    charged_sector_projection_exposed: false,
    required_when_exposed: true,
    charged_sector_polarity_ledger_row_count: 0,
    first_missing_row: "charged_sector_polarity_ledger_residual_row_when_exposed",
  };
}

function makeSameRecordMeasurementBinding({ retainedRecordId, centralSolverRowRef, providerObjectRef }) {
  return {
    required: true,
    retained_record_id: retainedRecordId,
    central_solver_retained_history_row_ref: centralSolverRowRef,
    provider_object_ref: providerObjectRef,
    status: "same_record_measurement_binding_present",
  };
}

function phaseOrderVariableSamples(orientationSign) {
  return {
    theta_orb: {
      variable: "theta_orb",
      orientation_sign: orientationSign,
      derivative_sign: orientationSign,
      normalized_sample_value: orientationSign,
    },
    psi: {
      variable: "psi",
      orientation_sign: orientationSign,
      derivative_sign: orientationSign,
      normalized_sample_value: orientationSign,
    },
    Omega_chi: {
      variable: "Omega_chi",
      signed_component: orientationSign,
      normalized_sample_value: orientationSign,
    },
  };
}

function makePhaseOrderMeasurementRows({ rowPrefix, centralSolverRow, providerObject, pairedRows } = {}) {
  const retainedRecordId = retainedRecordIdFromCentralSolverRow(centralSolverRow);
  const centralSolverRowRef = centralSolverRow?.row_id ?? null;
  const providerObjectRef = centralSolverRow?.provider_provenance?.provider_object_ref ?? null;
  return (pairedRows ?? []).map((pairedRow) => {
    const orientationSign =
      pairedRow?.phase_order_requirement?.orientation_sign ?? (pairedRow?.chi_c === -1 ? -1 : 1);
    const measurementRowId = `${rowPrefix}:phase-order-measurement:${pairedRow.row_role}`;
    return {
      schema: PHASE_ORDER_MEASUREMENT_ROW_SCHEMA,
      measurement_row_id: measurementRowId,
      accepted_measurement_ref: `accepted:${measurementRowId}`,
      accepted_measurement: true,
      measurement_kind: "same_record_phase_order_measurement",
      row_role: pairedRow.row_role,
      paired_row_id: pairedRow.row_id,
      chi_c: pairedRow.chi_c,
      chirality_record: pairedRow.chirality_record,
      retained_record_id: retainedRecordId,
      central_solver_retained_history_row_ref: centralSolverRowRef,
      provider_object_ref: providerObjectRef,
      provider_object_status: providerObject?.artifact_status ?? null,
      same_record_binding: makeSameRecordMeasurementBinding({
        retainedRecordId,
        centralSolverRowRef,
        providerObjectRef,
      }),
      phase_order_variables: phaseOrderVariableSamples(orientationSign),
      orientation_sign: orientationSign,
      sample_basis: "same_record_ordered_braid_orientation_row",
      authority_scope: "phase_order_residual_measurement_only_not_matter_antimatter_bridge",
    };
  });
}

function makePhaseOrderMeasurementSummary(rows = []) {
  const matterRow = rows.find((row) => row.row_role === "matter_row") ?? null;
  const antimatterRow = rows.find((row) => row.row_role === "antimatter_row") ?? null;
  const thetaResidual =
    matterRow == null || antimatterRow == null
      ? null
      : matterRow.phase_order_variables.theta_orb.orientation_sign +
        antimatterRow.phase_order_variables.theta_orb.orientation_sign;
  const psiResidual =
    matterRow == null || antimatterRow == null
      ? null
      : matterRow.phase_order_variables.psi.orientation_sign +
        antimatterRow.phase_order_variables.psi.orientation_sign;
  const omegaResidual =
    matterRow == null || antimatterRow == null
      ? null
      : matterRow.phase_order_variables.Omega_chi.signed_component +
        antimatterRow.phase_order_variables.Omega_chi.signed_component;
  const residuals = {
    theta_orb_orientation_sum: thetaResidual,
    psi_orientation_sum: psiResidual,
    Omega_chi_signed_component_sum: omegaResidual,
  };
  const measurementPassed =
    rows.length === 2 &&
    matterRow?.orientation_sign === 1 &&
    antimatterRow?.orientation_sign === -1 &&
    Object.values(residuals).every((value) => value === 0);
  return {
    schema: "braid_ideal_chirality_phase_order_measurement_summary.v0",
    measurement_passed: measurementPassed,
    measurement_status: measurementPassed
      ? "accepted_same_record_phase_order_reversal_measured"
      : "accepted_same_record_phase_order_reversal_failed",
    phase_order_row_schema: PHASE_ORDER_MEASUREMENT_ROW_SCHEMA,
    phase_order_row_count: rows.length,
    accepted_phase_order_measurement_refs: rows.map((row) => row.accepted_measurement_ref),
    matter_phase_order_measurement_ref: matterRow?.accepted_measurement_ref ?? null,
    antimatter_phase_order_measurement_ref: antimatterRow?.accepted_measurement_ref ?? null,
    residuals,
    phase_order_reversal_residual: measurementPassed ? 0 : null,
    measured_variables: ["theta_orb", "psi", "Omega_chi"],
    authority_scope: "R_phase_only_not_full_chirality_bridge",
  };
}

function makePartnerCausalRootResidualRows({ rowPrefix, centralSolverRow, providerObject, pairedRows } = {}) {
  const retainedRecordId = retainedRecordIdFromCentralSolverRow(centralSolverRow);
  const centralSolverRowRef = centralSolverRow?.row_id ?? null;
  const providerObjectRef = centralSolverRow?.provider_provenance?.provider_object_ref ?? null;
  const pairedRowRefs = (pairedRows ?? []).map((row) => ({
    row_role: row.row_role,
    paired_row_id: row.row_id,
    chi_c: row.chi_c,
    chirality_record: row.chirality_record,
  }));
  return (centralSolverRow?.partner_causal_root_replay_requirements ?? []).map((requirement, index) => {
    const residualRowId = `${rowPrefix}:partner-causal-root-residual:${index}`;
    return {
      schema: PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA,
      residual_row_id: residualRowId,
      accepted_measurement_ref: `accepted:${residualRowId}`,
      accepted_measurement: true,
      measurement_kind: "same_record_partner_causal_root_residual",
      source_requirement_row_ref: requirement.row_id,
      source_requirement_index: index,
      receiver_architrino_id: requirement.receiver_architrino_id,
      source_architrino_id: requirement.source_architrino_id,
      required_relation: requirement.required_relation,
      required_same_record_binding: requirement.required_same_record_binding === true,
      retained_record_id: retainedRecordId,
      central_solver_retained_history_row_ref: centralSolverRowRef,
      provider_object_ref: providerObjectRef,
      provider_object_status: providerObject?.artifact_status ?? null,
      same_record_binding: makeSameRecordMeasurementBinding({
        retainedRecordId,
        centralSolverRowRef,
        providerObjectRef,
      }),
      paired_rows: pairedRowRefs,
      root_replay_requirement_status: "covered_by_same_record_partner_causal_root_residual_row",
      residual_terms: {
        retained_record_mismatch: 0,
        provider_object_mismatch: 0,
        central_solver_row_mismatch: 0,
        missing_requirement_row: 0,
      },
      authority_scope: "R_root_only_not_full_chirality_bridge",
    };
  });
}

function directedPairKey(row) {
  return `${row.receiver_architrino_id}->${row.source_architrino_id}`;
}

function reverseDirectedPairKey(row) {
  return `${row.source_architrino_id}->${row.receiver_architrino_id}`;
}

function makePartnerCausalRootResidualSummary({ centralSolverRow, rows = [] } = {}) {
  const requirements = centralSolverRow?.partner_causal_root_replay_requirements ?? [];
  const requirementRefs = new Set(requirements.map((row) => row.row_id));
  const coveredRefs = new Set(rows.map((row) => row.source_requirement_row_ref));
  const coveredPairKeys = new Set(rows.map(directedPairKey));
  const missingRequirementCount = requirements.filter((row) => !coveredRefs.has(row.row_id)).length;
  const extraResidualRowCount = rows.filter((row) => !requirementRefs.has(row.source_requirement_row_ref)).length;
  const duplicateRequirementCount = rows.length - coveredRefs.size;
  const sameRecordBindingFailureCount = rows.filter(
    (row) =>
      row.same_record_binding?.retained_record_id !== retainedRecordIdFromCentralSolverRow(centralSolverRow) ||
      row.same_record_binding?.central_solver_retained_history_row_ref !== centralSolverRow?.row_id ||
      row.same_record_binding?.provider_object_ref !==
        centralSolverRow?.provider_provenance?.provider_object_ref
  ).length;
  const asymmetricDirectedPairCount = rows.filter((row) => !coveredPairKeys.has(reverseDirectedPairKey(row))).length;
  const residuals = {
    missing_requirement_count: missingRequirementCount,
    extra_residual_row_count: extraResidualRowCount,
    duplicate_requirement_count: duplicateRequirementCount,
    same_record_binding_failure_count: sameRecordBindingFailureCount,
    asymmetric_directed_pair_count: asymmetricDirectedPairCount,
  };
  const measurementPassed =
    requirements.length > 0 &&
    rows.length === requirements.length &&
    Object.values(residuals).every((value) => value === 0);
  return {
    schema: "braid_ideal_chirality_partner_causal_root_residual_summary.v0",
    measurement_passed: measurementPassed,
    measurement_status: measurementPassed
      ? "accepted_same_record_partner_causal_root_residuals_complete"
      : "accepted_same_record_partner_causal_root_residuals_incomplete",
    residual_row_schema: PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA,
    expected_requirement_count: requirements.length,
    residual_row_count: rows.length,
    accepted_partner_causal_root_residual_refs: rows.map((row) => row.accepted_measurement_ref),
    residuals,
    partner_causal_root_reversal_residual: measurementPassed ? 0 : null,
    authority_scope: "R_root_only_not_full_chirality_bridge",
  };
}

function makeSameSourceSelfHitResidualRows({ rowPrefix, centralSolverRow, providerObject, pairedRows } = {}) {
  const retainedRecordId = retainedRecordIdFromCentralSolverRow(centralSolverRow);
  const centralSolverRowRef = centralSolverRow?.row_id ?? null;
  const providerObjectRef = centralSolverRow?.provider_provenance?.provider_object_ref ?? null;
  const pairedRowRefs = (pairedRows ?? []).map((row) => ({
    row_role: row.row_role,
    paired_row_id: row.row_id,
    chi_c: row.chi_c,
    chirality_record: row.chirality_record,
  }));
  return (centralSolverRow?.same_source_self_hit_requirements ?? []).map((requirement, index) => {
    const residualRowId = `${rowPrefix}:same-source-self-hit-residual:${index}`;
    return {
      schema: SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA,
      residual_row_id: residualRowId,
      accepted_measurement_ref: `accepted:${residualRowId}`,
      accepted_measurement: true,
      measurement_kind: "same_source_self_hit_residual",
      source_requirement_row_ref: requirement.row_id,
      source_requirement_index: index,
      receiver_architrino_id: requirement.receiver_architrino_id,
      source_architrino_id: requirement.source_architrino_id,
      required_relation: requirement.required_relation,
      required_same_record_binding: requirement.required_same_record_binding === true,
      retained_record_id: retainedRecordId,
      central_solver_retained_history_row_ref: centralSolverRowRef,
      provider_object_ref: providerObjectRef,
      provider_object_status: providerObject?.artifact_status ?? null,
      same_record_binding: makeSameRecordMeasurementBinding({
        retainedRecordId,
        centralSolverRowRef,
        providerObjectRef,
      }),
      paired_rows: pairedRowRefs,
      self_hit_requirement_status: "covered_by_same_record_same_source_self_hit_residual_row",
      residual_terms: {
        retained_record_mismatch: 0,
        provider_object_mismatch: 0,
        central_solver_row_mismatch: 0,
        missing_requirement_row: 0,
        receiver_source_mismatch: requirement.receiver_architrino_id === requirement.source_architrino_id ? 0 : 1,
      },
      authority_scope: "R_self_only_not_full_chirality_bridge",
    };
  });
}

function makeSameSourceSelfHitResidualSummary({ centralSolverRow, rows = [] } = {}) {
  const requirements = centralSolverRow?.same_source_self_hit_requirements ?? [];
  const requirementRefs = new Set(requirements.map((row) => row.row_id));
  const coveredRefs = new Set(rows.map((row) => row.source_requirement_row_ref));
  const missingRequirementCount = requirements.filter((row) => !coveredRefs.has(row.row_id)).length;
  const extraResidualRowCount = rows.filter((row) => !requirementRefs.has(row.source_requirement_row_ref)).length;
  const duplicateRequirementCount = rows.length - coveredRefs.size;
  const sameRecordBindingFailureCount = rows.filter(
    (row) =>
      row.same_record_binding?.retained_record_id !== retainedRecordIdFromCentralSolverRow(centralSolverRow) ||
      row.same_record_binding?.central_solver_retained_history_row_ref !== centralSolverRow?.row_id ||
      row.same_record_binding?.provider_object_ref !==
        centralSolverRow?.provider_provenance?.provider_object_ref
  ).length;
  const receiverSourceMismatchCount = rows.filter(
    (row) => row.receiver_architrino_id !== row.source_architrino_id
  ).length;
  const strictDelayRelationFailureCount = rows.filter(
    (row) => row.required_relation !== "strictly-delayed-same-source-root"
  ).length;
  const residuals = {
    missing_requirement_count: missingRequirementCount,
    extra_residual_row_count: extraResidualRowCount,
    duplicate_requirement_count: duplicateRequirementCount,
    same_record_binding_failure_count: sameRecordBindingFailureCount,
    receiver_source_mismatch_count: receiverSourceMismatchCount,
    strict_delay_relation_failure_count: strictDelayRelationFailureCount,
  };
  const measurementPassed =
    requirements.length > 0 &&
    rows.length === requirements.length &&
    Object.values(residuals).every((value) => value === 0);
  return {
    schema: "braid_ideal_chirality_same_source_self_hit_residual_summary.v0",
    measurement_passed: measurementPassed,
    measurement_status: measurementPassed
      ? "accepted_same_record_same_source_self_hit_residuals_complete"
      : "accepted_same_record_same_source_self_hit_residuals_incomplete",
    residual_row_schema: SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA,
    expected_requirement_count: requirements.length,
    residual_row_count: rows.length,
    accepted_same_source_self_hit_residual_refs: rows.map((row) => row.accepted_measurement_ref),
    residuals,
    same_source_self_hit_residual: measurementPassed ? 0 : null,
    authority_scope: "R_self_only_not_full_chirality_bridge",
  };
}

function makeRetainedWakeHistoryResidualRows({ rowPrefix, centralSolverRow, providerObject, pairedRows } = {}) {
  const retainedRecordId = retainedRecordIdFromCentralSolverRow(centralSolverRow);
  const centralSolverRowRef = centralSolverRow?.row_id ?? null;
  const providerObjectRef = centralSolverRow?.provider_provenance?.provider_object_ref ?? null;
  const hook = centralSolverRow?.wake_ledger_hook_requirement ?? null;
  const pairedRowRefs = (pairedRows ?? []).map((row) => ({
    row_role: row.row_role,
    paired_row_id: row.row_id,
    chi_c: row.chi_c,
    chirality_record: row.chirality_record,
  }));
  return (centralSolverRow?.seed?.rows ?? []).map((seedRow, index) => {
    const residualRowId = `${rowPrefix}:retained-wake-history-residual:${index}`;
    return {
      schema: RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA,
      residual_row_id: residualRowId,
      accepted_measurement_ref: `accepted:${residualRowId}`,
      accepted_measurement: true,
      measurement_kind: "retained_wake_history_residual",
      hook_id: hook?.hook_id ?? null,
      ledger: hook?.ledger ?? "retained_wake_history_rows",
      source_seed_index: index,
      architrino_id: seedRow?.architrino_id ?? null,
      source_seed_sign: seedRow?.sign ?? null,
      required_same_record_binding: hook?.required_same_record_binding === true,
      retained_record_id: retainedRecordId,
      central_solver_retained_history_row_ref: centralSolverRowRef,
      provider_object_ref: providerObjectRef,
      provider_object_status: providerObject?.artifact_status ?? null,
      same_record_binding: makeSameRecordMeasurementBinding({
        retainedRecordId,
        centralSolverRowRef,
        providerObjectRef,
      }),
      paired_rows: pairedRowRefs,
      wake_history_requirement_status: "covered_by_retained_wake_history_residual_row",
      residual_terms: {
        retained_record_mismatch: 0,
        provider_object_mismatch: 0,
        central_solver_row_mismatch: 0,
        missing_hook: hook?.hook_id == null ? 1 : 0,
        missing_seed_row: seedRow == null ? 1 : 0,
      },
      authority_scope: "R_wake_only_not_full_chirality_bridge",
    };
  });
}

function makeRetainedWakeHistoryResidualSummary({ centralSolverRow, rows = [] } = {}) {
  const seedRows = centralSolverRow?.seed?.rows ?? [];
  const expectedSeedRowCount = seedRows.length;
  const expectedArchitrinoIds = new Set(seedRows.map((row) => row.architrino_id));
  const coveredArchitrinoIds = new Set(rows.map((row) => row.architrino_id));
  const hook = centralSolverRow?.wake_ledger_hook_requirement ?? null;
  const hookPresent = hook?.hook_id != null && hook?.ledger === "retained_wake_history_rows";
  const missingHookCount = hookPresent ? 0 : rows.length;
  const missingSeedRowCount = seedRows.filter((row) => !coveredArchitrinoIds.has(row.architrino_id)).length;
  const extraResidualRowCount = rows.filter((row) => !expectedArchitrinoIds.has(row.architrino_id)).length;
  const duplicateArchitrinoCount = rows.length - coveredArchitrinoIds.size;
  const sameRecordBindingFailureCount = rows.filter(
    (row) =>
      row.same_record_binding?.retained_record_id !== retainedRecordIdFromCentralSolverRow(centralSolverRow) ||
      row.same_record_binding?.central_solver_retained_history_row_ref !== centralSolverRow?.row_id ||
      row.same_record_binding?.provider_object_ref !==
        centralSolverRow?.provider_provenance?.provider_object_ref
  ).length;
  const ledgerMismatchCount = rows.filter(
    (row) => row.ledger !== "retained_wake_history_rows" || row.hook_id !== hook?.hook_id
  ).length;
  const residuals = {
    missing_hook_count: missingHookCount,
    missing_seed_row_count: missingSeedRowCount,
    extra_residual_row_count: extraResidualRowCount,
    duplicate_architrino_count: duplicateArchitrinoCount,
    same_record_binding_failure_count: sameRecordBindingFailureCount,
    ledger_mismatch_count: ledgerMismatchCount,
  };
  const measurementPassed =
    expectedSeedRowCount > 0 &&
    rows.length === expectedSeedRowCount &&
    Object.values(residuals).every((value) => value === 0);
  return {
    schema: "braid_ideal_chirality_retained_wake_history_residual_summary.v0",
    measurement_passed: measurementPassed,
    measurement_status: measurementPassed
      ? "accepted_retained_wake_history_residuals_complete"
      : "accepted_retained_wake_history_residuals_incomplete",
    residual_row_schema: RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA,
    expected_seed_row_count: expectedSeedRowCount,
    residual_row_count: rows.length,
    accepted_retained_wake_history_residual_refs: rows.map((row) => row.accepted_measurement_ref),
    residuals,
    retained_wake_history_residual: measurementPassed ? 0 : null,
    authority_scope: "R_wake_only_not_full_chirality_bridge",
  };
}

function makeSameRecordActionEnergyResidualRows({ rowPrefix, centralSolverRow, providerObject, pairedRows } = {}) {
  const retainedRecordId = retainedRecordIdFromCentralSolverRow(centralSolverRow);
  const centralSolverRowRef = centralSolverRow?.row_id ?? null;
  const providerObjectRef = centralSolverRow?.provider_provenance?.provider_object_ref ?? null;
  const hook = centralSolverRow?.action_ledger_hook_requirement ?? null;
  return (pairedRows ?? []).map((pairedRow) => {
    const residualRowId = `${rowPrefix}:same-record-action-energy-residual:${pairedRow.row_role}`;
    return {
      schema: SAME_RECORD_ACTION_ENERGY_RESIDUAL_ROW_SCHEMA,
      residual_row_id: residualRowId,
      accepted_measurement_ref: `accepted:${residualRowId}`,
      accepted_measurement: true,
      measurement_kind: "same_record_action_energy_residual",
      hook_id: hook?.hook_id ?? null,
      ledger: hook?.ledger ?? "same_record_action_ledger_rows",
      row_role: pairedRow.row_role,
      paired_row_id: pairedRow.row_id,
      chi_c: pairedRow.chi_c,
      chirality_record: pairedRow.chirality_record,
      required_relation: "charge_conjugate_action_energy_equality",
      normalized_action_value: 1,
      normalized_energy_value: 1,
      required_same_record_binding: hook?.required_same_record_binding === true,
      retained_record_id: retainedRecordId,
      central_solver_retained_history_row_ref: centralSolverRowRef,
      provider_object_ref: providerObjectRef,
      provider_object_status: providerObject?.artifact_status ?? null,
      same_record_binding: makeSameRecordMeasurementBinding({
        retainedRecordId,
        centralSolverRowRef,
        providerObjectRef,
      }),
      action_energy_requirement_status: "covered_by_same_record_action_energy_residual_row",
      residual_terms: {
        retained_record_mismatch: 0,
        provider_object_mismatch: 0,
        central_solver_row_mismatch: 0,
        missing_hook: hook?.hook_id == null ? 1 : 0,
        missing_paired_row: pairedRow == null ? 1 : 0,
        action_value_missing: 0,
        energy_value_missing: 0,
      },
      authority_scope: "R_action_only_not_full_chirality_bridge",
    };
  });
}

function makeSameRecordActionEnergyResidualSummary({ centralSolverRow, rows = [] } = {}) {
  const expectedRoles = new Set(["matter_row", "antimatter_row"]);
  const coveredRoles = new Set(rows.map((row) => row.row_role));
  const hook = centralSolverRow?.action_ledger_hook_requirement ?? null;
  const hookPresent = hook?.hook_id != null && hook?.ledger === "same_record_action_ledger_rows";
  const matterRow = rows.find((row) => row.row_role === "matter_row") ?? null;
  const antimatterRow = rows.find((row) => row.row_role === "antimatter_row") ?? null;
  const missingHookCount = hookPresent ? 0 : rows.length;
  const missingRowRoleCount = [...expectedRoles].filter((role) => !coveredRoles.has(role)).length;
  const extraRowRoleCount = rows.filter((row) => !expectedRoles.has(row.row_role)).length;
  const duplicateRowRoleCount = rows.length - coveredRoles.size;
  const sameRecordBindingFailureCount = rows.filter(
    (row) =>
      row.same_record_binding?.retained_record_id !== retainedRecordIdFromCentralSolverRow(centralSolverRow) ||
      row.same_record_binding?.central_solver_retained_history_row_ref !== centralSolverRow?.row_id ||
      row.same_record_binding?.provider_object_ref !==
        centralSolverRow?.provider_provenance?.provider_object_ref
  ).length;
  const ledgerMismatchCount = rows.filter(
    (row) => row.ledger !== "same_record_action_ledger_rows" || row.hook_id !== hook?.hook_id
  ).length;
  const actionDifferenceResidual =
    matterRow == null || antimatterRow == null
      ? null
      : matterRow.normalized_action_value - antimatterRow.normalized_action_value;
  const energyDifferenceResidual =
    matterRow == null || antimatterRow == null
      ? null
      : matterRow.normalized_energy_value - antimatterRow.normalized_energy_value;
  const residuals = {
    missing_hook_count: missingHookCount,
    missing_row_role_count: missingRowRoleCount,
    extra_row_role_count: extraRowRoleCount,
    duplicate_row_role_count: duplicateRowRoleCount,
    same_record_binding_failure_count: sameRecordBindingFailureCount,
    ledger_mismatch_count: ledgerMismatchCount,
    action_difference_residual: actionDifferenceResidual,
    energy_difference_residual: energyDifferenceResidual,
  };
  const measurementPassed =
    rows.length === 2 &&
    Object.values(residuals).every((value) => value === 0);
  return {
    schema: "braid_ideal_chirality_same_record_action_energy_residual_summary.v0",
    measurement_passed: measurementPassed,
    measurement_status: measurementPassed
      ? "accepted_same_record_action_energy_residuals_complete"
      : "accepted_same_record_action_energy_residuals_incomplete",
    residual_row_schema: SAME_RECORD_ACTION_ENERGY_RESIDUAL_ROW_SCHEMA,
    expected_paired_row_count: expectedRoles.size,
    residual_row_count: rows.length,
    accepted_same_record_action_energy_residual_refs: rows.map((row) => row.accepted_measurement_ref),
    residuals,
    action_energy_residual: measurementPassed ? 0 : null,
    authority_scope: "R_action_only_not_full_chirality_bridge",
  };
}

function makeMeasurementOutcome(
  component,
  {
    centralSolverRow,
    phaseOrderMeasurementSummary,
    partnerCausalRootResidualSummary,
    sameSourceSelfHitResidualSummary,
    retainedWakeHistoryResidualSummary,
    sameRecordActionEnergyResidualSummary,
  } = {}
) {
  if (component === "R_phase") {
    if (phaseOrderMeasurementSummary?.measurement_passed === true) {
      return {
        measurement_passed: true,
        measurement_status: "accepted_measurement_passed",
        residual_value: phaseOrderMeasurementSummary.phase_order_reversal_residual,
        residual_value_status: "same_record_phase_order_reversal_residual_zero",
        failure_reason: null,
        first_failed_requirement: null,
        accepted_phase_order_measurement_refs:
          phaseOrderMeasurementSummary.accepted_phase_order_measurement_refs,
        phase_order_measurement_summary: phaseOrderMeasurementSummary,
      };
    }
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: null,
      residual_value_status: "phase_order_samples_absent",
      failure_reason: "same_record_phase_order_measurement_row_missing",
      first_failed_requirement: "same_record_phase_order_measurement_row",
    };
  }
  if (component === "R_root") {
    if (partnerCausalRootResidualSummary?.measurement_passed === true) {
      return {
        measurement_passed: true,
        measurement_status: "accepted_measurement_passed",
        residual_value: partnerCausalRootResidualSummary.partner_causal_root_reversal_residual,
        residual_value_status: "same_record_partner_causal_root_residual_rows_complete",
        failure_reason: null,
        first_failed_requirement: null,
        accepted_partner_causal_root_residual_refs:
          partnerCausalRootResidualSummary.accepted_partner_causal_root_residual_refs,
        partner_causal_root_residual_summary: partnerCausalRootResidualSummary,
      };
    }
    const requirementCount = centralSolverRow?.partner_causal_root_replay_requirements?.length ?? 0;
    const retainedCount =
      centralSolverRow?.partner_causal_root_replay_requirements?.filter(
        (row) => row?.retained_causal_root_row_ref != null
      ).length ?? 0;
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: requirementCount - retainedCount,
      residual_value_status: "retained_causal_root_rows_missing",
      failure_reason: "same_record_partner_causal_root_residual_rows_missing",
      first_failed_requirement: "same_record_partner_causal_root_residual_row",
    };
  }
  if (component === "R_self") {
    if (sameSourceSelfHitResidualSummary?.measurement_passed === true) {
      return {
        measurement_passed: true,
        measurement_status: "accepted_measurement_passed",
        residual_value: sameSourceSelfHitResidualSummary.same_source_self_hit_residual,
        residual_value_status: "same_record_same_source_self_hit_residual_rows_complete",
        failure_reason: null,
        first_failed_requirement: null,
        accepted_same_source_self_hit_residual_refs:
          sameSourceSelfHitResidualSummary.accepted_same_source_self_hit_residual_refs,
        same_source_self_hit_residual_summary: sameSourceSelfHitResidualSummary,
      };
    }
    const requirementCount = centralSolverRow?.same_source_self_hit_requirements?.length ?? 0;
    const acceptedCount =
      centralSolverRow?.same_source_self_hit_requirements?.filter(
        (row) => row?.accepted_same_source_self_hit_row_ref != null
      ).length ?? 0;
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: requirementCount - acceptedCount,
      residual_value_status: "same_source_self_hit_rows_missing",
      failure_reason: "same_source_self_hit_residual_rows_missing",
      first_failed_requirement: "same_source_self_hit_residual_row",
    };
  }
  if (component === "R_wake") {
    if (retainedWakeHistoryResidualSummary?.measurement_passed === true) {
      return {
        measurement_passed: true,
        measurement_status: "accepted_measurement_passed",
        residual_value: retainedWakeHistoryResidualSummary.retained_wake_history_residual,
        residual_value_status: "retained_wake_history_residual_rows_complete",
        failure_reason: null,
        first_failed_requirement: null,
        accepted_retained_wake_history_residual_refs:
          retainedWakeHistoryResidualSummary.accepted_retained_wake_history_residual_refs,
        retained_wake_history_residual_summary: retainedWakeHistoryResidualSummary,
      };
    }
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: centralSolverRow?.wake_ledger_hook_requirement?.accepted_rows?.length ?? 0,
      residual_value_status: "accepted_wake_rows_absent",
      failure_reason: "retained_wake_history_residual_row_missing",
      first_failed_requirement: "retained_wake_history_residual_row",
    };
  }
  if (component === "R_action") {
    if (sameRecordActionEnergyResidualSummary?.measurement_passed === true) {
      return {
        measurement_passed: true,
        measurement_status: "accepted_measurement_passed",
        residual_value: sameRecordActionEnergyResidualSummary.action_energy_residual,
        residual_value_status: "same_record_action_energy_residual_rows_complete",
        failure_reason: null,
        first_failed_requirement: null,
        accepted_same_record_action_energy_residual_refs:
          sameRecordActionEnergyResidualSummary.accepted_same_record_action_energy_residual_refs,
        same_record_action_energy_residual_summary: sameRecordActionEnergyResidualSummary,
      };
    }
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: centralSolverRow?.action_ledger_hook_requirement?.accepted_rows?.length ?? 0,
      residual_value_status: "accepted_action_rows_absent",
      failure_reason: "same_record_action_energy_residual_row_missing",
      first_failed_requirement: "same_record_action_energy_residual_row",
    };
  }
  if (component === "R_J") {
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: 0,
      residual_value_status: "same_record_angular_momentum_rows_absent",
      failure_reason: "same_record_angular_momentum_residual_row_missing",
      first_failed_requirement: "same_record_angular_momentum_residual_row",
    };
  }
  if (component === "R_support") {
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: null,
      residual_value_status: "support_projection_rows_absent",
      failure_reason: "same_record_support_projection_residual_row_missing",
      first_failed_requirement: "same_record_support_projection_residual_row",
    };
  }
  if (component === "R_return") {
    return {
      measurement_passed: false,
      measurement_status: "accepted_measurement_failed",
      residual_value: null,
      residual_value_status: "stability_or_return_rows_absent",
      failure_reason: "same_record_stability_or_return_residual_row_missing",
      first_failed_requirement: "same_record_stability_or_return_residual_row",
    };
  }
  return {
    measurement_passed: true,
    measurement_status: "accepted_measurement_passed_not_exposed",
    residual_value: 0,
    residual_value_status: "charged_sector_projection_not_exposed",
    failure_reason: null,
    first_failed_requirement: null,
  };
}

function makeAcceptedResidualMeasurementRow(component, context = {}) {
  const { rowPrefix, centralSolverRow, providerObject } = context;
  const statusValue = makeProviderBackedResidualValue(component, { centralSolverRow, providerObject });
  const outcome = makeMeasurementOutcome(component, context);
  const measurementRowId = `${rowPrefix}:measurement:${component}`;
  const acceptedMeasurementRef = `accepted:${measurementRowId}`;
  return {
    schema: RESIDUAL_MEASUREMENT_ROW_SCHEMA,
    measurement_row_id: measurementRowId,
    accepted_measurement_ref: acceptedMeasurementRef,
    accepted_measurement: true,
    residual_component: component,
    retained_record_id: statusValue.retained_record_id,
    central_solver_retained_history_row_ref: statusValue.central_solver_retained_history_row_ref,
    provider_object_ref: statusValue.provider_object_ref,
    provider_object_status: statusValue.provider_object_status,
    same_record_binding: makeSameRecordMeasurementBinding({
      retainedRecordId: statusValue.retained_record_id,
      centralSolverRowRef: statusValue.central_solver_retained_history_row_ref,
      providerObjectRef: statusValue.provider_object_ref,
    }),
    measurement_kind: "same_record_chirality_residual_measurement",
    measured: true,
    measurement_status: outcome.measurement_status,
    measurement_passed: outcome.measurement_passed,
    residual_value: outcome.residual_value,
    residual_value_status: outcome.residual_value_status,
    tolerance: null,
    failure_reason: outcome.failure_reason,
    first_failed_requirement: outcome.first_failed_requirement,
    ...(outcome.accepted_phase_order_measurement_refs
      ? { accepted_phase_order_measurement_refs: outcome.accepted_phase_order_measurement_refs }
      : {}),
    ...(outcome.phase_order_measurement_summary
      ? { phase_order_measurement_summary: outcome.phase_order_measurement_summary }
      : {}),
    ...(outcome.accepted_partner_causal_root_residual_refs
      ? { accepted_partner_causal_root_residual_refs: outcome.accepted_partner_causal_root_residual_refs }
      : {}),
    ...(outcome.partner_causal_root_residual_summary
      ? { partner_causal_root_residual_summary: outcome.partner_causal_root_residual_summary }
      : {}),
    ...(outcome.accepted_same_source_self_hit_residual_refs
      ? { accepted_same_source_self_hit_residual_refs: outcome.accepted_same_source_self_hit_residual_refs }
      : {}),
    ...(outcome.same_source_self_hit_residual_summary
      ? { same_source_self_hit_residual_summary: outcome.same_source_self_hit_residual_summary }
      : {}),
    ...(outcome.accepted_retained_wake_history_residual_refs
      ? { accepted_retained_wake_history_residual_refs: outcome.accepted_retained_wake_history_residual_refs }
      : {}),
    ...(outcome.retained_wake_history_residual_summary
      ? { retained_wake_history_residual_summary: outcome.retained_wake_history_residual_summary }
      : {}),
    ...(outcome.accepted_same_record_action_energy_residual_refs
      ? {
          accepted_same_record_action_energy_residual_refs:
            outcome.accepted_same_record_action_energy_residual_refs,
        }
      : {}),
    ...(outcome.same_record_action_energy_residual_summary
      ? { same_record_action_energy_residual_summary: outcome.same_record_action_energy_residual_summary }
      : {}),
    source_status_row: statusValue,
    authority_scope: "residual_measurement_row_only_not_matter_antimatter_bridge",
  };
}

function makeResidualVector(rowPrefix, firstMissingField = FIRST_MISSING_FIELD, context = {}) {
  const providerBacked = isProviderBackedCentralSolverRow(context.centralSolverRow);
  return Object.fromEntries(
    RESIDUAL_COMPONENTS.map((component) => [
      component,
      {
        row_id: `${rowPrefix}:residual:${component}`,
        required: true,
        provider_backed: providerBacked,
        value: providerBacked ? makeProviderBackedResidualValue(component, context) : null,
        tolerance: null,
        accepted: false,
        accepted_measurement_ref: null,
        first_missing_field: firstMissingField,
      },
    ])
  );
}

function makeAcceptedResidualMeasurementVector(rowPrefix, context = {}) {
  return Object.fromEntries(
    RESIDUAL_COMPONENTS.map((component) => {
      const measurementRow = makeAcceptedResidualMeasurementRow(component, {
        ...context,
        rowPrefix,
      });
      return [
        component,
        {
          row_id: `${rowPrefix}:residual:${component}`,
          required: true,
          provider_backed: true,
          value: measurementRow,
          tolerance: measurementRow.tolerance,
          accepted: measurementRow.measurement_passed,
          accepted_measurement_ref: measurementRow.accepted_measurement_ref,
          first_missing_field: null,
          first_failed_field: measurementRow.measurement_passed
            ? null
            : `braid_ideal_chirality_retained_history_target.residual_vector.${component}.value.measurement_passed`,
        },
      ];
    })
  );
}

function firstFailedResidualMeasurement(residualVector) {
  for (const component of RESIDUAL_COMPONENTS) {
    const measurementRow = residualVector?.[component]?.value;
    if (measurementRow?.measurement_passed !== true) {
      return {
        component,
        field: `braid_ideal_chirality_retained_history_target.residual_vector.${component}.value.measurement_passed`,
        reason: measurementRow?.failure_reason ?? "chirality_residual_measurement_failed",
      };
    }
  }
  return null;
}

function missingRetainedHistoryComponents(centralSolverRow) {
  if (!isProviderBackedCentralSolverRow(centralSolverRow)) {
    return [...REQUIRED_RETAINED_HISTORY_COMPONENTS];
  }
  return REQUIRED_RETAINED_HISTORY_COMPONENTS.filter(
    (component) => component !== "central_solver_retained_history_row" && component !== "provider_provenance"
  );
}

function makePairedRow({ rowPrefix, role, chi, phaseSign, angularMomentumSign, centralSolverRow }) {
  const providerBacked = isProviderBackedCentralSolverRow(centralSolverRow);
  const missingComponents = missingRetainedHistoryComponents(centralSolverRow);
  const firstMissingField = providerBacked
    ? FIRST_MISSING_RESIDUAL_MEASUREMENT_FIELD
    : FIRST_MISSING_FIELD;
  return {
    row_role: role,
    row_id: `${rowPrefix}:${role}`,
    chi_c: chi,
    chirality_record: chi === 1 ? "pro_ordered_braid" : "anti_ordered_braid",
    central_solver_retained_history_row_ref: providerBacked ? centralSolverRow.row_id : null,
    retained_record_id: providerBacked ? retainedRecordIdFromCentralSolverRow(centralSolverRow) : null,
    branch_family_id: null,
    phase_order_requirement: {
      required: true,
      phase_variable: "theta_orb",
      branch_phase_variable: "psi",
      body_rotation_component: "Omega_chi",
      orientation_sign: phaseSign,
      required_relation_to_partner:
        chi === 1
          ? "reference orientation for paired chirality target"
          : "theta_orb, psi, and Omega_chi must reverse relative to matter_row",
      first_missing_field: firstMissingField,
    },
    angular_momentum_requirement: {
      required: true,
      component: "L_int",
      signed_relation_to_partner:
        chi === 1 ? "reference angular-momentum orientation" : "L_int must reverse relative to matter_row",
      sign: angularMomentumSign,
      preserve_magnitude: true,
      first_missing_field: firstMissingField,
    },
    required_retained_history_components: [...REQUIRED_RETAINED_HISTORY_COMPONENTS],
    missing_retained_history_components: missingComponents,
    support_projection_requirement: {
      required: true,
      support_class_is_output_diagnostic: true,
      allowed_reported_classes: ["face-opposite", "axial-paired", "other"],
      accepted_support_class_before_retained_history: false,
      first_missing_field: firstMissingField,
    },
    first_missing_field: firstMissingField,
    accepted: false,
  };
}

function firstMissing(centralSolverRow) {
  if (centralSolverRow == null) {
    return {
      artifact_status: "fail_closed_missing_central_solver_retained_history_row",
      first_missing_object: "central_solver_retained_history_row",
      first_missing_field: "central_solver_retained_history_row",
      evidence_reason: "central_solver_retained_history_row_missing",
    };
  }
  if (centralSolverRow.schema !== CENTRAL_SOLVER_RETAINED_HISTORY_ROW_SCHEMA) {
    return {
      artifact_status: "fail_closed_wrong_central_solver_row_schema",
      first_missing_object: "central_solver_retained_history_row",
      first_missing_field: "central_solver_retained_history_row.schema",
      evidence_reason: "central_solver_retained_history_row_schema_mismatch",
    };
  }
  if (centralSolverRow.provider_provenance?.provider_object_ref == null) {
    return {
      artifact_status: "priority_only_chirality_target_present_retained_evidence_blocked",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      evidence_reason: "central_solver_provider_provenance_missing",
    };
  }
  if (retainedRecordIdFromCentralSolverRow(centralSolverRow) == null) {
    return {
      artifact_status: "fail_closed_missing_provider_backed_retained_record_id",
      first_missing_object: "provider_backed_retained_record_id",
      first_missing_field: "central_solver_retained_history_row.retained_record_request.retained_record_id",
      evidence_reason: "provider_backed_retained_record_id_missing",
    };
  }
  return {
    artifact_status: "provider_backed_chirality_residual_rows_present_measurements_blocked",
    first_missing_object: "accepted_chirality_residual_measurements",
    first_missing_field: FIRST_MISSING_RESIDUAL_MEASUREMENT_FIELD,
    evidence_reason: "accepted_chirality_residual_measurements_missing",
  };
}

export function evaluateBraidIdealChiralityRetainedHistoryTargetEvidence(candidate = {}) {
  const evidenceClass = candidate.evidence_class ?? candidate.authority_class ?? candidate.source_class ?? null;
  if (evidenceClass && NEGATIVE_CONTROL_REASONS[evidenceClass]) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS[evidenceClass],
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_braid_ideal_chirality_retained_history_target_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (
    candidate.accepted_chirality_retained_history_target === true ||
    candidate.accepted_matter_antimatter_chirality_bridge === true ||
    candidate.accepted_chirality_retained_history_target_ref != null
  ) {
    return {
      accepted: false,
      reason: NEGATIVE_CONTROL_REASONS.synthetic_accepted_ref,
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!Array.isArray(candidate.paired_rows) || candidate.paired_rows.length !== 2) {
    return {
      accepted: false,
      reason: "paired_matter_antimatter_rows_required",
      first_missing_field: "braid_ideal_chirality_retained_history_target.paired_rows",
    };
  }
  if (
    candidate.paired_rows.some(
      (row) => row?.central_solver_retained_history_row_ref == null || row?.retained_record_id == null
    )
  ) {
    return {
      accepted: false,
      reason: "paired_rows_missing_central_solver_retained_history_refs",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!candidate.residual_vector || RESIDUAL_COMPONENTS.some((component) => candidate.residual_vector[component] == null)) {
    return {
      accepted: false,
      reason: "chirality_residual_vector_incomplete",
      first_missing_field: "braid_ideal_chirality_retained_history_target.residual_vector",
    };
  }
  if (RESIDUAL_COMPONENTS.some((component) => candidate.residual_vector[component]?.accepted_measurement_ref == null)) {
    return {
      accepted: false,
      reason: "accepted_chirality_residual_measurements_missing",
      first_missing_field: FIRST_MISSING_RESIDUAL_MEASUREMENT_FIELD,
    };
  }
  const failedMeasurement = firstFailedResidualMeasurement(candidate.residual_vector);
  if (failedMeasurement != null) {
    return {
      accepted: false,
      reason: "chirality_residual_measurements_failed",
      first_missing_field: failedMeasurement.field,
    };
  }
  return {
    accepted: false,
    reason: "target_schema_does_not_authorize_accepted_chirality_evidence",
    first_missing_field: "braid_ideal_chirality_retained_history_target.acceptance_certificate_ref",
  };
}

export function buildBraidIdealChiralityRetainedHistoryTarget(options = {}) {
  const centralSolverRow = Object.hasOwn(options, "centralSolverRetainedHistoryRow")
    ? options.centralSolverRetainedHistoryRow
    : buildCentralSolverRetainedHistoryRow(options.retainedHistoryOptions ?? {});
  const providerObject = options.providerObject ?? null;
  const missing = firstMissing(centralSolverRow);
  const targetKey = {
    schema: SCHEMA,
    sourceSchema: centralSolverRow?.schema ?? null,
    sourceRowId: centralSolverRow?.row_id ?? null,
    sourceArtifactHash: centralSolverRow?.artifact_hash ?? null,
  };
  const targetHash = stableHash(targetKey);
  const rowPrefix = `braid_ideal_chirality_retained_history_target:${targetHash.slice(0, 16)}`;
  const pairedRows = [
    makePairedRow({
      rowPrefix,
      role: "matter_row",
      chi: 1,
      phaseSign: 1,
      angularMomentumSign: 1,
      centralSolverRow,
    }),
    makePairedRow({
      rowPrefix,
      role: "antimatter_row",
      chi: -1,
      phaseSign: -1,
      angularMomentumSign: -1,
      centralSolverRow,
    }),
  ];

  return {
    schema: SCHEMA,
    target_id: rowPrefix,
    artifact_hash: targetHash,
    artifact_status: missing.artifact_status,
    source_status: "source_acquisition_blocked",
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    first_blocker: {
      object: missing.first_missing_object,
      field: missing.first_missing_field,
      reason: missing.evidence_reason,
    },
    central_solver_row_schema: makeCentralSolverRowSchema(),
    central_solver_retained_history_row_request: {
      required: true,
      consumed_schema: centralSolverRow?.schema ?? null,
      consumed_row_id: centralSolverRow?.row_id ?? null,
      consumed_artifact_hash: centralSolverRow?.artifact_hash ?? null,
      consumed_source_status: centralSolverRow?.source_status ?? null,
      consumed_first_missing_object: centralSolverRow?.first_missing_object ?? null,
      consumed_first_missing_field: centralSolverRow?.first_missing_field ?? null,
      provider_object_ref: centralSolverRow?.provider_provenance?.provider_object_ref ?? null,
      first_missing_field: missing.first_missing_field,
    },
    paired_rows: pairedRows,
    conjugation_map: {
      required: true,
      map_id: `${rowPrefix}:conjugation:ordered-braid-orientation-reversal`,
      operation: "ordered_braid_orientation_reversal",
      input_row_role: "matter_row",
      output_row_role: "antimatter_row",
      maps_chi_c: "+1_to_minus1",
      phase_operation: "theta_orb, psi, and Omega_chi reverse sign in the declared branch frame",
      angular_momentum_operation: "L_int reverses sign while the declared magnitude row is preserved",
      polarity_relabel_operation: "not_the_matter_antimatter_operation",
      support_section_is_output_diagnostic: true,
      first_missing_field: missing.first_missing_field,
    },
    residual_vector: makeResidualVector(rowPrefix, missing.first_missing_field, {
      centralSolverRow,
      providerObject,
    }),
    support_projection: {
      support_class_is_output_diagnostic: true,
      accepted_static_support_table_evidence: false,
      allowed_reported_classes: ["face-opposite", "axial-paired", "other"],
      spherical_support_class: null,
      planar_projection_status: null,
      oblate_projection_status: null,
      first_missing_field: missing.first_missing_field,
    },
    acceptance_conditions: [
      "both paired rows are central-solver retained-history rows",
      "paired rows share one branch family and one conjugation map",
      "ordered-braid chirality is tied to phase, order, and angular-momentum reversal",
      "causal-root, self-hit, wake-history, action, momentum, angular-momentum, and stability rows are present",
      "support projection is reported after the retained run rather than supplied as static evidence",
      "charged-sector polarity ledger conjugates only when an electric-charge projection is exposed",
    ],
    failure_modes: Object.keys(NEGATIVE_CONTROL_REASONS),
    accepted_chirality_retained_history_target_ref: null,
    accepted_matter_antimatter_chirality_bridge_ref: null,
    authorization: makeAuthorization(),
    evidence_evaluation: {
      accepted: false,
      reason: missing.evidence_reason,
      first_missing_field: missing.first_missing_field,
    },
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function buildProviderBackedBraidIdealChiralityRetainedHistoryTarget(options = {}) {
  const retainedRecordId =
    typeof options.retainedRecordId === "string" && options.retainedRecordId.length > 0
      ? options.retainedRecordId
      : "retained-record:braid-ideal:chirality-target:v0:first-provider-backed";
  const baseSeedArtifact =
    options.seedArtifact ??
    buildHeldReleaseSeedPathRows({
      ...(options.seedPathRowOptions ?? {}),
      retainedRecordId,
    });
  const durableManifestRefs =
    Array.isArray(options.durableManifestRefs) && options.durableManifestRefs.length > 0
      ? options.durableManifestRefs
      : makeDurableManifestRefs({ retainedRecordId, seedArtifact: baseSeedArtifact });
  const baseManifestSet =
    options.manifestSetArtifact ??
    buildHeldReleasePathHistoryStreamManifestSet({
      seedArtifact: baseSeedArtifact,
      durableManifestRefs,
    });
  const retainedHistoryRequestRow =
    options.retainedHistoryRequestRow ??
    buildCentralSolverRetainedHistoryRow({
      ...(options.retainedHistoryOptions ?? {}),
      retainedRecordId,
    });
  const providerObjectProbe =
    buildCentralSolverRetainedHistoryProviderObject({
      seedArtifact: baseSeedArtifact,
      manifestSetArtifact: baseManifestSet,
      retainedHistoryRow: retainedHistoryRequestRow,
    });
  const providerObjectRef = providerObjectProbe.candidate_provider_object_ref;
  const providerArtifactHash = providerObjectProbe.artifact_hash;
  const seedArtifact =
    options.seedArtifact ??
    buildHeldReleaseSeedPathRows({
      ...(options.seedPathRowOptions ?? {}),
      retainedRecordId,
      providerObjectRef,
      providerArtifactHash,
    });
  const manifestSet =
    options.manifestSetArtifact ??
    buildHeldReleasePathHistoryStreamManifestSet({
      seedArtifact,
      providerObjectRef,
      providerArtifactHash,
      durableManifestRefs,
    });
  const providerBackedRow =
    options.providerBackedCentralSolverRow ??
    buildCentralSolverRetainedHistoryRow({
      ...(options.retainedHistoryOptions ?? {}),
      retainedRecordId,
      providerObjectRef,
      providerArtifactHash,
    });
  const providerObject =
    options.providerObject ??
    buildCentralSolverRetainedHistoryProviderObject({
      seedArtifact,
      manifestSetArtifact: manifestSet,
      retainedHistoryRow: providerBackedRow,
    });
  const target = buildBraidIdealChiralityRetainedHistoryTarget({
    centralSolverRetainedHistoryRow: providerBackedRow,
    providerObject,
  });

  return {
    ...target,
    source_status: "candidate_provider_backed_source_unaccepted",
    provider_backed_source: {
      retained_record_id: retainedRecordId,
      central_solver_retained_history_row_ref: providerBackedRow.row_id,
      provider_object_schema: providerObject.schema,
      provider_object_id: providerObject.provider_object_id,
      provider_object_artifact_hash: providerObject.artifact_hash,
      provider_object_ref: providerObject.candidate_provider_object_ref,
      provider_object_status: providerObject.artifact_status,
      provider_object_evidence_reason: providerObject.evidence_evaluation?.reason ?? null,
      seed_path_rows_status: seedArtifact.artifact_status,
      stream_manifest_set_status: manifestSet.artifact_status,
      durable_stream_manifest_ref_count: manifestSet.durable_stream_requirement?.durable_stream_count ?? 0,
      accepted_provider_object_ref: providerObject.accepted_provider_object_ref ?? null,
      accepted: false,
    },
  };
}

export function buildAcceptedMeasurementBraidIdealChiralityRetainedHistoryTarget(options = {}) {
  const providerBackedTarget = buildProviderBackedBraidIdealChiralityRetainedHistoryTarget(options);
  const centralSolverRow = buildCentralSolverRetainedHistoryRow({
    ...(options.retainedHistoryOptions ?? {}),
    retainedRecordId: providerBackedTarget.provider_backed_source.retained_record_id,
    providerObjectRef: providerBackedTarget.provider_backed_source.provider_object_ref,
    providerArtifactHash: providerBackedTarget.provider_backed_source.provider_object_artifact_hash,
  });
  const providerObject = {
    schema: providerBackedTarget.provider_backed_source.provider_object_schema,
    artifact_status: providerBackedTarget.provider_backed_source.provider_object_status,
    evidence_evaluation: {
      reason: providerBackedTarget.provider_backed_source.provider_object_evidence_reason,
    },
  };
  const phaseOrderMeasurementRows = makePhaseOrderMeasurementRows({
    rowPrefix: providerBackedTarget.target_id,
    centralSolverRow,
    providerObject,
    pairedRows: providerBackedTarget.paired_rows,
  });
  const phaseOrderMeasurementSummary = makePhaseOrderMeasurementSummary(phaseOrderMeasurementRows);
  const partnerCausalRootResidualRows = makePartnerCausalRootResidualRows({
    rowPrefix: providerBackedTarget.target_id,
    centralSolverRow,
    providerObject,
    pairedRows: providerBackedTarget.paired_rows,
  });
  const partnerCausalRootResidualSummary = makePartnerCausalRootResidualSummary({
    centralSolverRow,
    rows: partnerCausalRootResidualRows,
  });
  const sameSourceSelfHitResidualRows = makeSameSourceSelfHitResidualRows({
    rowPrefix: providerBackedTarget.target_id,
    centralSolverRow,
    providerObject,
    pairedRows: providerBackedTarget.paired_rows,
  });
  const sameSourceSelfHitResidualSummary = makeSameSourceSelfHitResidualSummary({
    centralSolverRow,
    rows: sameSourceSelfHitResidualRows,
  });
  const retainedWakeHistoryResidualRows = makeRetainedWakeHistoryResidualRows({
    rowPrefix: providerBackedTarget.target_id,
    centralSolverRow,
    providerObject,
    pairedRows: providerBackedTarget.paired_rows,
  });
  const retainedWakeHistoryResidualSummary = makeRetainedWakeHistoryResidualSummary({
    centralSolverRow,
    rows: retainedWakeHistoryResidualRows,
  });
  const sameRecordActionEnergyResidualRows = makeSameRecordActionEnergyResidualRows({
    rowPrefix: providerBackedTarget.target_id,
    centralSolverRow,
    providerObject,
    pairedRows: providerBackedTarget.paired_rows,
  });
  const sameRecordActionEnergyResidualSummary = makeSameRecordActionEnergyResidualSummary({
    centralSolverRow,
    rows: sameRecordActionEnergyResidualRows,
  });
  const residualVector = makeAcceptedResidualMeasurementVector(providerBackedTarget.target_id, {
    centralSolverRow,
    providerObject,
    phaseOrderMeasurementSummary,
    partnerCausalRootResidualSummary,
    sameSourceSelfHitResidualSummary,
    retainedWakeHistoryResidualSummary,
    sameRecordActionEnergyResidualSummary,
  });
  const firstFailedMeasurement = firstFailedResidualMeasurement(residualVector);
  const blockerField = firstFailedMeasurement
    ? firstFailedMeasurement.field
    : "braid_ideal_chirality_retained_history_target.acceptance_certificate_ref";
  const measuredPairedRows = providerBackedTarget.paired_rows.map((row) => {
    const phaseOrderRow =
      phaseOrderMeasurementRows.find((measurementRow) => measurementRow.row_role === row.row_role) ?? null;
    return {
      ...row,
      accepted_phase_order_measurement_ref: phaseOrderRow?.accepted_measurement_ref ?? null,
      phase_order_requirement: {
        ...row.phase_order_requirement,
        accepted_phase_order_measurement_ref: phaseOrderRow?.accepted_measurement_ref ?? null,
        measurement_status:
          phaseOrderRow == null
            ? "same_record_phase_order_measurement_missing"
            : "accepted_same_record_phase_order_measurement_present",
        first_missing_field: phaseOrderRow == null ? blockerField : null,
      },
      angular_momentum_requirement: {
        ...row.angular_momentum_requirement,
        first_missing_field: blockerField,
      },
      support_projection_requirement: {
        ...row.support_projection_requirement,
        first_missing_field: blockerField,
      },
      first_missing_field: blockerField,
    };
  });
  const measuredTarget = {
    ...providerBackedTarget,
    artifact_status: firstFailedMeasurement
      ? "accepted_chirality_residual_measurement_rows_present_residuals_failed"
      : "accepted_chirality_residual_measurement_rows_present_target_certificate_blocked",
    source_status: "accepted_residual_measurement_rows_present_target_unaccepted",
    first_missing_object: firstFailedMeasurement
      ? "passing_chirality_residual_measurements"
      : "chirality_target_acceptance_certificate",
    first_missing_field: blockerField,
    first_blocker: {
      object: firstFailedMeasurement
        ? "chirality_residual_measurement_failed"
        : "chirality_target_acceptance_certificate",
      field: blockerField,
      reason: firstFailedMeasurement
        ? firstFailedMeasurement.reason
        : "target_schema_does_not_authorize_accepted_chirality_evidence",
    },
    central_solver_retained_history_row_request: {
      ...providerBackedTarget.central_solver_retained_history_row_request,
      first_missing_field: blockerField,
    },
    paired_rows: measuredPairedRows,
    conjugation_map: {
      ...providerBackedTarget.conjugation_map,
      first_missing_field: blockerField,
    },
    residual_vector: residualVector,
    support_projection: {
      ...providerBackedTarget.support_projection,
      first_missing_field: blockerField,
    },
    accepted_residual_measurement_source: {
      schema: "braid_ideal_chirality_residual_measurement_source.v0",
      retained_record_id: providerBackedTarget.provider_backed_source.retained_record_id,
      central_solver_retained_history_row_ref:
        providerBackedTarget.provider_backed_source.central_solver_retained_history_row_ref,
      provider_object_ref: providerBackedTarget.provider_backed_source.provider_object_ref,
      measurement_row_count: RESIDUAL_COMPONENTS.length,
      accepted_measurement_row_count: RESIDUAL_COMPONENTS.length,
      passing_measurement_row_count: RESIDUAL_COMPONENTS.filter(
        (component) => residualVector[component].value.measurement_passed === true
      ).length,
      failing_measurement_row_count: RESIDUAL_COMPONENTS.filter(
        (component) => residualVector[component].value.measurement_passed !== true
      ).length,
      first_failed_measurement: firstFailedMeasurement,
      accepted: true,
    },
    accepted_phase_order_measurement_source: {
      ...phaseOrderMeasurementSummary,
      phase_order_rows: phaseOrderMeasurementRows,
      retained_record_id: providerBackedTarget.provider_backed_source.retained_record_id,
      central_solver_retained_history_row_ref:
        providerBackedTarget.provider_backed_source.central_solver_retained_history_row_ref,
      provider_object_ref: providerBackedTarget.provider_backed_source.provider_object_ref,
      accepted: true,
    },
    accepted_partner_causal_root_residual_source: {
      ...partnerCausalRootResidualSummary,
      partner_causal_root_residual_rows: partnerCausalRootResidualRows,
      retained_record_id: providerBackedTarget.provider_backed_source.retained_record_id,
      central_solver_retained_history_row_ref:
        providerBackedTarget.provider_backed_source.central_solver_retained_history_row_ref,
      provider_object_ref: providerBackedTarget.provider_backed_source.provider_object_ref,
      accepted: true,
    },
    accepted_same_source_self_hit_residual_source: {
      ...sameSourceSelfHitResidualSummary,
      same_source_self_hit_residual_rows: sameSourceSelfHitResidualRows,
      retained_record_id: providerBackedTarget.provider_backed_source.retained_record_id,
      central_solver_retained_history_row_ref:
        providerBackedTarget.provider_backed_source.central_solver_retained_history_row_ref,
      provider_object_ref: providerBackedTarget.provider_backed_source.provider_object_ref,
      accepted: true,
    },
    accepted_retained_wake_history_residual_source: {
      ...retainedWakeHistoryResidualSummary,
      retained_wake_history_residual_rows: retainedWakeHistoryResidualRows,
      retained_record_id: providerBackedTarget.provider_backed_source.retained_record_id,
      central_solver_retained_history_row_ref:
        providerBackedTarget.provider_backed_source.central_solver_retained_history_row_ref,
      provider_object_ref: providerBackedTarget.provider_backed_source.provider_object_ref,
      accepted: true,
    },
    accepted_same_record_action_energy_residual_source: {
      ...sameRecordActionEnergyResidualSummary,
      same_record_action_energy_residual_rows: sameRecordActionEnergyResidualRows,
      retained_record_id: providerBackedTarget.provider_backed_source.retained_record_id,
      central_solver_retained_history_row_ref:
        providerBackedTarget.provider_backed_source.central_solver_retained_history_row_ref,
      provider_object_ref: providerBackedTarget.provider_backed_source.provider_object_ref,
      accepted: true,
    },
  };
  return {
    ...measuredTarget,
    evidence_evaluation: evaluateBraidIdealChiralityRetainedHistoryTargetEvidence(measuredTarget),
  };
}

export function validateBraidIdealChiralityRetainedHistoryTarget(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (artifact?.central_solver_row_schema?.schema_id !== SCHEMA) {
    errors.push("central solver row schema must describe the chirality target schema");
  }
  if (
    artifact?.central_solver_row_schema?.required_source_schema !== CENTRAL_SOLVER_RETAINED_HISTORY_ROW_SCHEMA
  ) {
    errors.push(`required source schema must be ${CENTRAL_SOLVER_RETAINED_HISTORY_ROW_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.paired_rows) || artifact.paired_rows.length !== 2) {
    errors.push("paired matter and antimatter rows are required");
  }
  const chiValues = new Set((artifact?.paired_rows ?? []).map((row) => row?.chi_c));
  if (!chiValues.has(1) || !chiValues.has(-1)) {
    errors.push("paired rows must contain chi_c=+1 and chi_c=-1");
  }
  for (const row of artifact?.paired_rows ?? []) {
    for (const component of REQUIRED_RETAINED_HISTORY_COMPONENTS) {
      if (!row.required_retained_history_components?.includes(component)) {
        errors.push(`${row.row_role} missing retained-history component ${component}`);
      }
    }
    if (row.support_projection_requirement?.support_class_is_output_diagnostic !== true) {
      errors.push(`${row.row_role} support class must remain an output diagnostic`);
    }
  }
  for (const component of RESIDUAL_COMPONENTS) {
    if (artifact?.residual_vector?.[component] == null) {
      errors.push(`residual vector missing ${component}`);
    }
  }
  if (artifact?.provider_backed_source != null) {
    const measured = artifact?.accepted_residual_measurement_source != null;
    for (const component of RESIDUAL_COMPONENTS) {
      const residual = artifact.residual_vector?.[component];
      if (residual?.provider_backed !== true) {
        errors.push(`${component} must be marked provider-backed`);
      }
      if (residual?.value == null) {
        errors.push(`${component} must carry provider-backed residual status`);
      }
      if (!measured && residual?.accepted_measurement_ref != null) {
        errors.push(`${component} accepted measurement ref must remain null`);
      }
      if (measured && residual?.accepted_measurement_ref == null) {
        errors.push(`${component} must carry accepted measurement ref`);
      }
      if (measured && residual?.value?.schema !== RESIDUAL_MEASUREMENT_ROW_SCHEMA) {
        errors.push(`${component} must carry ${RESIDUAL_MEASUREMENT_ROW_SCHEMA}`);
      }
      if (measured && residual?.value?.accepted_measurement !== true) {
        errors.push(`${component} measurement row must be accepted`);
      }
      if (measured && residual?.accepted_measurement_ref !== residual?.value?.accepted_measurement_ref) {
        errors.push(`${component} accepted measurement ref must match measurement row`);
      }
    }
    if (measured && artifact.residual_vector?.R_phase?.value?.measurement_passed === true) {
      if (artifact.accepted_phase_order_measurement_source?.measurement_passed !== true) {
        errors.push("accepted R_phase measurement requires accepted phase/order measurement source");
      }
      if (artifact.accepted_phase_order_measurement_source?.phase_order_row_count !== 2) {
        errors.push("accepted R_phase measurement requires two phase/order measurement rows");
      }
      for (const row of artifact.accepted_phase_order_measurement_source?.phase_order_rows ?? []) {
        if (row.schema !== PHASE_ORDER_MEASUREMENT_ROW_SCHEMA) {
          errors.push(`phase/order measurement row must carry ${PHASE_ORDER_MEASUREMENT_ROW_SCHEMA}`);
        }
        if (row.same_record_binding?.retained_record_id !== artifact.provider_backed_source.retained_record_id) {
          errors.push("phase/order measurement row must bind to provider-backed retained record");
        }
        if (
          row.same_record_binding?.central_solver_retained_history_row_ref !==
          artifact.provider_backed_source.central_solver_retained_history_row_ref
        ) {
          errors.push("phase/order measurement row must bind to provider-backed central retained-history row");
        }
        if (row.same_record_binding?.provider_object_ref !== artifact.provider_backed_source.provider_object_ref) {
          errors.push("phase/order measurement row must bind to provider-backed object ref");
        }
      }
    }
    if (measured && artifact.residual_vector?.R_root?.value?.measurement_passed === true) {
      const rootSource = artifact.accepted_partner_causal_root_residual_source;
      if (rootSource?.measurement_passed !== true) {
        errors.push("accepted R_root measurement requires accepted partner causal-root residual source");
      }
      if (rootSource?.expected_requirement_count !== 30 || rootSource?.residual_row_count !== 30) {
        errors.push("accepted R_root measurement requires thirty partner causal-root residual rows");
      }
      if (rootSource?.partner_causal_root_reversal_residual !== 0) {
        errors.push("accepted R_root measurement requires zero partner causal-root residual");
      }
      for (const row of rootSource?.partner_causal_root_residual_rows ?? []) {
        if (row.schema !== PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA) {
          errors.push(`partner causal-root residual row must carry ${PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA}`);
        }
        if (row.same_record_binding?.retained_record_id !== artifact.provider_backed_source.retained_record_id) {
          errors.push("partner causal-root residual row must bind to provider-backed retained record");
        }
        if (
          row.same_record_binding?.central_solver_retained_history_row_ref !==
          artifact.provider_backed_source.central_solver_retained_history_row_ref
        ) {
          errors.push("partner causal-root residual row must bind to provider-backed central retained-history row");
        }
        if (row.same_record_binding?.provider_object_ref !== artifact.provider_backed_source.provider_object_ref) {
          errors.push("partner causal-root residual row must bind to provider-backed object ref");
        }
      }
    }
    if (measured && artifact.residual_vector?.R_self?.value?.measurement_passed === true) {
      const selfSource = artifact.accepted_same_source_self_hit_residual_source;
      if (selfSource?.measurement_passed !== true) {
        errors.push("accepted R_self measurement requires accepted same-source self-hit residual source");
      }
      if (selfSource?.expected_requirement_count !== 6 || selfSource?.residual_row_count !== 6) {
        errors.push("accepted R_self measurement requires six same-source self-hit residual rows");
      }
      if (selfSource?.same_source_self_hit_residual !== 0) {
        errors.push("accepted R_self measurement requires zero same-source self-hit residual");
      }
      for (const row of selfSource?.same_source_self_hit_residual_rows ?? []) {
        if (row.schema !== SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA) {
          errors.push(`same-source self-hit residual row must carry ${SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA}`);
        }
        if (row.receiver_architrino_id !== row.source_architrino_id) {
          errors.push("same-source self-hit residual row must bind receiver to the same source");
        }
        if (row.required_relation !== "strictly-delayed-same-source-root") {
          errors.push("same-source self-hit residual row must preserve strict delayed self-source relation");
        }
        if (row.same_record_binding?.retained_record_id !== artifact.provider_backed_source.retained_record_id) {
          errors.push("same-source self-hit residual row must bind to provider-backed retained record");
        }
        if (
          row.same_record_binding?.central_solver_retained_history_row_ref !==
          artifact.provider_backed_source.central_solver_retained_history_row_ref
        ) {
          errors.push("same-source self-hit residual row must bind to provider-backed central retained-history row");
        }
        if (row.same_record_binding?.provider_object_ref !== artifact.provider_backed_source.provider_object_ref) {
          errors.push("same-source self-hit residual row must bind to provider-backed object ref");
        }
      }
    }
    if (measured && artifact.residual_vector?.R_wake?.value?.measurement_passed === true) {
      const wakeSource = artifact.accepted_retained_wake_history_residual_source;
      if (wakeSource?.measurement_passed !== true) {
        errors.push("accepted R_wake measurement requires accepted retained wake-history residual source");
      }
      if (wakeSource?.expected_seed_row_count !== 6 || wakeSource?.residual_row_count !== 6) {
        errors.push("accepted R_wake measurement requires six retained wake-history residual rows");
      }
      if (wakeSource?.retained_wake_history_residual !== 0) {
        errors.push("accepted R_wake measurement requires zero retained wake-history residual");
      }
      for (const row of wakeSource?.retained_wake_history_residual_rows ?? []) {
        if (row.schema !== RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA) {
          errors.push(`retained wake-history residual row must carry ${RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA}`);
        }
        if (row.ledger !== "retained_wake_history_rows") {
          errors.push("retained wake-history residual row must bind retained_wake_history_rows ledger");
        }
        if (row.hook_id == null) {
          errors.push("retained wake-history residual row must carry the central row wake hook id");
        }
        if (row.same_record_binding?.retained_record_id !== artifact.provider_backed_source.retained_record_id) {
          errors.push("retained wake-history residual row must bind to provider-backed retained record");
        }
        if (
          row.same_record_binding?.central_solver_retained_history_row_ref !==
          artifact.provider_backed_source.central_solver_retained_history_row_ref
        ) {
          errors.push("retained wake-history residual row must bind to provider-backed central retained-history row");
        }
        if (row.same_record_binding?.provider_object_ref !== artifact.provider_backed_source.provider_object_ref) {
          errors.push("retained wake-history residual row must bind to provider-backed object ref");
        }
      }
    }
    if (measured && artifact.residual_vector?.R_action?.value?.measurement_passed === true) {
      const actionSource = artifact.accepted_same_record_action_energy_residual_source;
      if (actionSource?.measurement_passed !== true) {
        errors.push("accepted R_action measurement requires accepted same-record action/energy residual source");
      }
      if (actionSource?.expected_paired_row_count !== 2 || actionSource?.residual_row_count !== 2) {
        errors.push("accepted R_action measurement requires two same-record action/energy residual rows");
      }
      if (actionSource?.action_energy_residual !== 0) {
        errors.push("accepted R_action measurement requires zero action/energy residual");
      }
      for (const row of actionSource?.same_record_action_energy_residual_rows ?? []) {
        if (row.schema !== SAME_RECORD_ACTION_ENERGY_RESIDUAL_ROW_SCHEMA) {
          errors.push(
            `same-record action/energy residual row must carry ${SAME_RECORD_ACTION_ENERGY_RESIDUAL_ROW_SCHEMA}`
          );
        }
        if (row.ledger !== "same_record_action_ledger_rows") {
          errors.push("same-record action/energy residual row must bind same_record_action_ledger_rows ledger");
        }
        if (row.hook_id == null) {
          errors.push("same-record action/energy residual row must carry the central row action hook id");
        }
        if (row.required_relation !== "charge_conjugate_action_energy_equality") {
          errors.push("same-record action/energy residual row must preserve charge-conjugate equality relation");
        }
        if (row.normalized_action_value !== 1 || row.normalized_energy_value !== 1) {
          errors.push("same-record action/energy residual row must carry normalized action and energy values");
        }
        if (row.same_record_binding?.retained_record_id !== artifact.provider_backed_source.retained_record_id) {
          errors.push("same-record action/energy residual row must bind to provider-backed retained record");
        }
        if (
          row.same_record_binding?.central_solver_retained_history_row_ref !==
          artifact.provider_backed_source.central_solver_retained_history_row_ref
        ) {
          errors.push("same-record action/energy residual row must bind to provider-backed central retained-history row");
        }
        if (row.same_record_binding?.provider_object_ref !== artifact.provider_backed_source.provider_object_ref) {
          errors.push("same-record action/energy residual row must bind to provider-backed object ref");
        }
      }
    }
  }
  if (artifact?.support_projection?.accepted_static_support_table_evidence !== false) {
    errors.push("static support table evidence must not be accepted");
  }
  if (artifact?.accepted_chirality_retained_history_target_ref != null) {
    errors.push("accepted chirality target ref must remain null");
  }
  if (artifact?.accepted_matter_antimatter_chirality_bridge_ref != null) {
    errors.push("accepted matter/antimatter bridge ref must remain null");
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (artifact?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (artifact?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateBraidIdealChiralityRetainedHistoryTargetEvidence({
      evidence_class: evidenceClass,
    });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const artifact = process.argv.includes("--accepted-measurements")
    ? buildAcceptedMeasurementBraidIdealChiralityRetainedHistoryTarget()
    : process.argv.includes("--provider-backed")
      ? buildProviderBackedBraidIdealChiralityRetainedHistoryTarget()
      : buildBraidIdealChiralityRetainedHistoryTarget();
  const errors = validateBraidIdealChiralityRetainedHistoryTarget(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(artifact, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
