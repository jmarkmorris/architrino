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
export const FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD =
  "braid_ideal_chirality_retained_history_target.residual_vector.R_phase.value.measurement_passed";

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

function makeMeasurementOutcome(component, { centralSolverRow } = {}) {
  if (component === "R_phase") {
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

function makeAcceptedResidualMeasurementRow(component, { rowPrefix, centralSolverRow, providerObject } = {}) {
  const statusValue = makeProviderBackedResidualValue(component, { centralSolverRow, providerObject });
  const outcome = makeMeasurementOutcome(component, { centralSolverRow, providerObject });
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
    same_record_binding: {
      required: true,
      retained_record_id: statusValue.retained_record_id,
      central_solver_retained_history_row_ref: statusValue.central_solver_retained_history_row_ref,
      provider_object_ref: statusValue.provider_object_ref,
      status: "same_record_measurement_binding_present",
    },
    measurement_kind: "same_record_chirality_residual_measurement",
    measured: true,
    measurement_status: outcome.measurement_status,
    measurement_passed: outcome.measurement_passed,
    residual_value: outcome.residual_value,
    residual_value_status: outcome.residual_value_status,
    tolerance: null,
    failure_reason: outcome.failure_reason,
    first_failed_requirement: outcome.first_failed_requirement,
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
  const residualVector = makeAcceptedResidualMeasurementVector(providerBackedTarget.target_id, {
    centralSolverRow,
    providerObject,
  });
  const firstFailedMeasurement = firstFailedResidualMeasurement(residualVector);
  const blockerField = firstFailedMeasurement
    ? firstFailedMeasurement.field
    : "braid_ideal_chirality_retained_history_target.acceptance_certificate_ref";
  const measuredPairedRows = providerBackedTarget.paired_rows.map((row) => ({
    ...row,
    phase_order_requirement: {
      ...row.phase_order_requirement,
      first_missing_field: blockerField,
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
  }));
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
