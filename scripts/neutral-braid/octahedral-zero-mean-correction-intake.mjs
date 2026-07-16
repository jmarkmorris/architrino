#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
  buildOctahedralSpeedOdeDiagnostic,
  validateOctahedralSpeedOdeDiagnostic,
} from "./octahedral-speed-ode-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-correction-intake/v1";
export const OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA =
  "neutral-braid-octahedral-zero-mean-candidate-b/v1";
export const OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-candidate-b-range-probe/v1";
export const OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-live-derivative-column-intake/v1";
export const OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-live-derivative-column-preview-range-probe/v1";
export const OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-live-derivative-matrix-certificate/v1";
export const OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-live-correction-direction-certificate/v1";
export const OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-speed-primitive-feasibility-certificate/v1";
export const OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-speed-clock-length-certificate/v1";
export const OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA =
  "neutral-braid-octahedral-zero-mean-normal-reconstruction-handoff/v1";
export const OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-bounded-speed-normal-reconstruction-candidate/v1";
export const OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA =
  "neutral-braid-octahedral-zero-mean-bounded-speed-action-stability-after-normal-candidate-intake/v1";
export const OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_TARGET_SCHEMA =
  "neutral-braid-octahedral-zero-mean-bounded-speed-live-ledger-identity-target/v0";
export const OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA =
  "neutral-braid-octahedral-zero-mean-bounded-speed-action-derived-scale-target/v0";
export const OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA =
  "neutral-braid-octahedral-zero-mean-action-measure-row-target/v0";
export const OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA =
  "neutral-braid-octahedral-zero-mean-action-measure-branch-scope-source-audit/v0";
export const OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA =
  "neutral-braid-octahedral-zero-mean-same-ledger-action-measure-row-with-branch-scope-attempt/v0";
export const OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA =
  "neutral-braid-octahedral-zero-mean-rank5-retained-branch-action-measure-producer-target/v0";
export const OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA =
  "neutral-braid-octahedral-zero-mean-finite-mode-action-measure-row-producer-target/v0";

const PACKET_ID = "octahedral_zero_mean_correction_intake";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_PHASE_SAMPLES = 720;
const DEFAULT_Y_SUBDIVISIONS = 720;
const DEFAULT_CONSTANT_VECTOR_TOLERANCE = 1e-9;
const DEFAULT_RANK_TOLERANCE = 1e-10;
const DEFAULT_RANGE_TOLERANCE = 1e-9;
const DEFAULT_PRIMITIVE_RETURN_TOLERANCE = 1e-9;
const DEFAULT_SPEED_BAND_MARGIN_FLOOR = 0;
const DEFAULT_CLOCK_LENGTH_TOLERANCE = 1e-9;
const RECEIVER_COUNT = 6;
const LIVE_DERIVATIVE_COLUMN_CLAIM_SCOPE = "live-derivative-column-provenance-intake";
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
const CURRENT_PACKET_LIVE_LEDGER_CLOSED_ROWS = ["bounded_speed_normal_reconstruction_candidate"];
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
const CURRENT_ACTION_DERIVED_SCALE_TARGET_ROWS = ["bounded_speed_normal_reconstruction_candidate"];
const MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS = ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS.filter(
  (row) => !CURRENT_ACTION_DERIVED_SCALE_TARGET_ROWS.includes(row)
);
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
const CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS = ["same_ledger_identity_tuple"];
const MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS = ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS.filter(
  (field) => !CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS.includes(field)
);
const ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE =
  "same_ledger_branch_scope_source_missing";
const ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_NEGATIVE_CONTROL =
  "branch-scope-artifacts-without-same-ledger-action-measure-row-not-bound";
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
  "h39-theta3minus-quotient-rows",
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
    blocker: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
  },
  {
    field: "period_rows",
    candidate_source_status: "absent",
    normal_candidate_ledger_status: "missing_same_ledger_binding",
    acceptance_status: "conditional_blocked_until_branch_scope_binds",
    blocker: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
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
const ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES = [
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
  ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES[0];
const LIVE_DERIVATIVE_DIFFERENCE_SCHEMES = new Set(["central-finite-difference"]);

function buildFiniteModeActionMeasureRowProducerTarget(candidate) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA,
    claim_scope: "bounded-speed-finite-mode-action-measure-row-producer-target",
    promotion_status: PROMOTION_STATUS,
    target_status: "producer_target_blocked",
    expected_source_object:
      "bounded-speed-factor-finite-mode-solver-artifact-with-action-measure-row",
    expected_source_packet:
      "reference/priorities/braid-archive/braid-retained-branch-closure/shell-braid/bounded-speed-factor-finite-mode-branch-system.md",
    source_after_normal_packet: "bounded-speed-normal-reconstruction-candidate",
    source_normal_reconstruction_candidate_id:
      candidate.normal_reconstruction_candidate_id,
    required_identity_tuple: {
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      source_normal_reconstruction_candidate_id:
        candidate.normal_reconstruction_candidate_id,
    },
    required_same_ledger_row_fields: [
      ...FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS,
    ],
    supplied_fields_on_normal_candidate_ledger: [
      ...CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS,
    ],
    missing_same_ledger_row_fields:
      FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS.filter(
        (field) => !CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS.includes(field)
      ),
    first_missing_same_ledger_field: "branch_scope",
    first_blocker: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
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
    negative_controls: [
      ...RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE,
    ],
    accepted_same_ledger_action_measure_row: null,
    authorizes_rank5_retention: false,
    certifies_action_measure_row: false,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function vectorNorm(vector) {
  return Math.hypot(...vector);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function maxAbs(values) {
  return values.reduce((best, value) => Math.max(best, Math.abs(value)), 0);
}

function multiplyMatrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function buildConstantCovector(length) {
  return Array.from({ length }, () => 1 / Math.sqrt(length));
}

function readJsonObjectPacket(filePath, label) {
  const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error(`${label} JSON must be an object`);
  }
  return payload;
}

function readCandidateBPacket(filePath) {
  return readJsonObjectPacket(filePath, "candidate B");
}

function readLiveDerivativeColumnPacket(filePath) {
  return readJsonObjectPacket(filePath, "live derivative column");
}

function readLiveDerivativeMatrixPacket(filePath) {
  return readJsonObjectPacket(filePath, "live derivative matrix");
}

function readLiveCorrectionDirectionPacket(filePath) {
  return readJsonObjectPacket(filePath, "live correction direction");
}

function readSpeedPrimitiveFeasibilityPacket(filePath) {
  return readJsonObjectPacket(filePath, "speed primitive feasibility");
}

function readSpeedClockLengthPacket(filePath) {
  return readJsonObjectPacket(filePath, "speed clock length");
}

function readNormalReconstructionHandoffPacket(filePath) {
  return readJsonObjectPacket(filePath, "normal reconstruction handoff");
}

function readBoundedSpeedNormalReconstructionCandidatePacket(filePath) {
  return readJsonObjectPacket(filePath, "bounded speed normal reconstruction candidate");
}

function readActionStabilityAfterNormalCandidatePacket(filePath) {
  return readJsonObjectPacket(filePath, "action stability after normal candidate");
}

function isNonemptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function isRecordObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function uniqueEntries(values) {
  return new Set(values).size === values.length;
}

function sameStringArray(actual, expected) {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    expected.every((value, index) => actual[index] === value)
  );
}

function validateCandidateMatrixShape(matrix) {
  if (!Array.isArray(matrix) || matrix.length !== RECEIVER_COUNT) {
    throw new Error(`candidate derivative matrix must have ${RECEIVER_COUNT} receiver rows`);
  }
  const columnCount = Array.isArray(matrix[0]) ? matrix[0].length : null;
  if (!Number.isInteger(columnCount) || columnCount < 1) {
    throw new Error("candidate derivative matrix must have at least one column");
  }
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== columnCount) {
      throw new Error("candidate derivative matrix rows must be rectangular");
    }
    for (const value of row) {
      if (!Number.isFinite(value)) {
        throw new Error("candidate derivative matrix entries must be finite numbers");
      }
    }
  }
  return columnCount;
}

function matrixColumns(matrix) {
  return Array.from({ length: matrix[0].length }, (_, columnIndex) => matrix.map((row) => row[columnIndex]));
}

function orthonormalColumnBasis(matrix, tolerance) {
  const basis = [];
  const independentColumns = [];
  matrixColumns(matrix).forEach((column, columnIndex) => {
    let residual = [...column];
    for (const basisVector of basis) {
      residual = subtract(residual, scale(basisVector, dot(basisVector, residual)));
    }
    const residualNorm = vectorNorm(residual);
    if (residualNorm > tolerance) {
      basis.push(scale(residual, 1 / residualNorm));
      independentColumns.push(columnIndex);
    }
  });
  return { basis, independentColumns };
}

function projectOntoBasis(vector, basis) {
  return basis.reduce(
    (projection, basisVector) => projection.map((entry, index) => entry + dot(basisVector, vector) * basisVector[index]),
    Array.from({ length: vector.length }, () => 0)
  );
}

function solveUpperTriangular(matrix, vector, tolerance) {
  const size = matrix.length;
  const solution = Array.from({ length: size }, () => 0);
  for (let rowIndex = size - 1; rowIndex >= 0; rowIndex -= 1) {
    const pivot = matrix[rowIndex][rowIndex];
    if (Math.abs(pivot) <= tolerance) {
      throw new Error("linear solve failed: singular preview triangular factor");
    }
    let remainder = vector[rowIndex];
    for (let columnIndex = rowIndex + 1; columnIndex < size; columnIndex += 1) {
      remainder -= matrix[rowIndex][columnIndex] * solution[columnIndex];
    }
    solution[rowIndex] = remainder / pivot;
  }
  return solution;
}

function leastSquaresPreviewSolution(matrix, targetVector, rank, tolerance) {
  const columnCount = matrix[0].length;
  if (rank < columnCount) {
    return {
      status: "least-squares-preview-rank-deficient-not-computed",
      coefficients: null,
      fitted: null,
      residual: null,
      residualNorm: null,
      relativeResidual: null,
    };
  }

  const columns = matrixColumns(matrix);
  const qColumns = [];
  const upper = Array.from({ length: columnCount }, () => Array.from({ length: columnCount }, () => 0));
  columns.forEach((column, columnIndex) => {
    let residual = [...column];
    for (let priorIndex = 0; priorIndex < columnIndex; priorIndex += 1) {
      upper[priorIndex][columnIndex] = dot(qColumns[priorIndex], column);
      residual = subtract(residual, scale(qColumns[priorIndex], upper[priorIndex][columnIndex]));
    }
    upper[columnIndex][columnIndex] = vectorNorm(residual);
    if (upper[columnIndex][columnIndex] <= tolerance) {
      throw new Error("least-squares preview rank changed during solve");
    }
    qColumns.push(scale(residual, 1 / upper[columnIndex][columnIndex]));
  });
  const qTarget = qColumns.map((column) => dot(column, targetVector));
  const coefficients = solveUpperTriangular(upper, qTarget, tolerance);
  const fitted = multiplyMatrixVector(matrix, coefficients);
  const residual = subtract(fitted, targetVector);
  const residualNorm = vectorNorm(residual);
  const targetNorm = vectorNorm(targetVector);

  return {
    status: "least-squares-preview-computed",
    coefficients,
    fitted,
    residual,
    residualNorm,
    relativeResidual: targetNorm > 0 ? residualNorm / targetNorm : residualNorm,
  };
}

function evaluateCandidateRangeCondition(matrix, targetVector, options) {
  const rangeTolerance = options.rangeTolerance;
  const rankTolerance = options.rankTolerance ?? rangeTolerance;
  const columnCount = validateCandidateMatrixShape(matrix);
  const { basis, independentColumns } = orthonormalColumnBasis(matrix, rankTolerance);
  const augmentedRank = orthonormalColumnBasis(
    matrix.map((row) => [...row, 1]),
    rankTolerance
  ).basis.length;
  const projection = projectOntoBasis(targetVector, basis);
  const residual = subtract(targetVector, projection);
  const residualNorm = vectorNorm(residual);
  const targetNorm = vectorNorm(targetVector);
  const oneVector = Array.from({ length: RECEIVER_COUNT }, () => 1);
  const oneProjection = projectOntoBasis(oneVector, basis);
  const oneResidualNorm = vectorNorm(subtract(oneVector, oneProjection));
  const columnSums = matrixColumns(matrix).map((column) => column.reduce((sum, value) => sum + value, 0));
  const maxAbsColumnSum = maxAbs(columnSums);
  const balancedColumnObstruction = maxAbsColumnSum <= rangeTolerance && targetNorm > rangeTolerance;
  const rangePassed = residualNorm <= rangeTolerance;

  return {
    status: rangePassed
      ? "range-condition-passed"
      : balancedColumnObstruction
        ? "balanced-column-cokernel-obstructed"
        : "range-condition-failed",
    row_count: RECEIVER_COUNT,
    column_count: columnCount,
    rank: basis.length,
    augmented_rank_with_constant_direction: augmentedRank,
    independent_column_indices: independentColumns,
    constant_direction_in_range_status:
      augmentedRank === basis.length ? "constant-direction-in-range" : "constant-direction-out-of-range",
    range_tolerance: rangeTolerance,
    rank_tolerance: rankTolerance,
    target_vector_norm: formatNumber(targetNorm),
    range_projection_vector: projection.map(formatNumber),
    range_residual_vector: residual.map(formatNumber),
    range_residual_norm: formatNumber(residualNorm),
    normalized_range_residual: formatNumber(targetNorm > 0 ? residualNorm / targetNorm : residualNorm),
    constant_direction_residual_norm: formatNumber(oneResidualNorm),
    column_sums: columnSums.map(formatNumber),
    max_abs_column_sum: formatNumber(maxAbsColumnSum),
    balanced_column_status: maxAbsColumnSum <= rangeTolerance ? "candidate-columns-balanced" : "candidate-columns-unbalanced",
    cokernel_obstruction_status: balancedColumnObstruction
      ? "left-null-constant-covector-obstructs"
      : rangePassed
        ? "no-cokernel-obstruction-detected"
        : "cokernel-obstruction-open",
  };
}

function buildPreviewCokernelWitness(matrix, targetVector, residualVector, residualNorm, rangeTolerance) {
  if (!Number.isFinite(residualNorm) || residualNorm <= rangeTolerance) {
    return {
      claim_scope: "preview-cokernel-witness-only",
      status: "preview-cokernel-witness-not-needed",
      witness_source: "preview_range_residual",
      normalized_left_null_witness: null,
      witness_dot_preview_columns_abs_max: null,
      witness_dot_rhs: null,
      witness_dot_m_frz: null,
      obstruction_magnitude: null,
      certifies_live_derivative_matrix: false,
      certifies_correction_direction: false,
      certifies_bounded_speed_live_ledger: false,
      correction_status: "zero-mean-correction-open",
      retention: "not_retained",
      status_note:
        "No preview cokernel witness is emitted because the preview residual is inside range tolerance.",
    };
  }

  const witness = scale(residualVector, 1 / residualNorm);
  const columnDots = matrixColumns(matrix).map((column) => dot(witness, column));
  const witnessDotRhs = dot(witness, targetVector);
  const witnessDotMFrz = -witnessDotRhs;

  return {
    claim_scope: "preview-cokernel-witness-only",
    status: "preview-only-cokernel-witness",
    witness_source: "preview_range_residual",
    normalized_left_null_witness: witness.map(formatNumber),
    witness_dot_preview_columns_abs_max: formatNumber(maxAbs(columnDots)),
    witness_dot_rhs: formatNumber(witnessDotRhs),
    witness_dot_m_frz: formatNumber(witnessDotMFrz),
    obstruction_magnitude: formatNumber(Math.abs(witnessDotRhs)),
    certifies_live_derivative_matrix: false,
    certifies_correction_direction: false,
    certifies_bounded_speed_live_ledger: false,
    correction_status: "zero-mean-correction-open",
    retention: "not_retained",
    status_note:
      "The normalized preview residual is a preview-only left-null witness for the column matrix preview. It does not certify a live cokernel vector for B.",
  };
}

function formatMatrix(matrix) {
  return matrix.map((row) => row.map(formatNumber));
}

function buildCertifiedLiveCokernelWitness(matrix, targetVector, residualVector, residualNorm, rangeTolerance) {
  if (!Number.isFinite(residualNorm) || residualNorm <= rangeTolerance) {
    return {
      claim_scope: "certified-live-cokernel-witness",
      status: "live-cokernel-witness-not-needed",
      witness_source: "live_range_residual",
      normalized_left_null_witness: null,
      witness_dot_live_columns_abs_max: null,
      witness_dot_rhs: null,
      witness_dot_m: null,
      obstruction_magnitude: null,
      certifies_live_derivative_matrix: true,
      certifies_correction_direction: false,
      certifies_bounded_speed_live_ledger: false,
      correction_status: "correction-direction-open",
      retention: "not_retained",
      status_note:
        "No live cokernel witness is emitted because the certified live range residual is inside range tolerance.",
    };
  }

  const witness = scale(residualVector, 1 / residualNorm);
  const columnDots = matrixColumns(matrix).map((column) => dot(witness, column));
  const witnessDotRhs = dot(witness, targetVector);
  const witnessDotM = -witnessDotRhs;

  return {
    claim_scope: "certified-live-cokernel-witness",
    status: "certified-live-cokernel-obstruction",
    witness_source: "live_range_residual",
    normalized_left_null_witness: witness.map(formatNumber),
    witness_dot_live_columns_abs_max: formatNumber(maxAbs(columnDots)),
    witness_dot_rhs: formatNumber(witnessDotRhs),
    witness_dot_m: formatNumber(witnessDotM),
    obstruction_magnitude: formatNumber(Math.abs(witnessDotRhs)),
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: false,
    certifies_bounded_speed_live_ledger: false,
    correction_status: "correction-obstruction-certified",
    retention: "not_retained",
    status_note:
      "The normalized live range residual is a certified left-null witness for the supplied same-ledger derivative matrix B. It certifies a first-order range obstruction for this B only, not a retained branch.",
  };
}

function liveDerivativeMatrixCertificateValidationErrors(artifact, matrixPacket, options) {
  const errors = [];
  const receiverLabels = artifact?.frozen_mean_vector?.receiver_labels ?? [];

  assertField(
    matrixPacket?.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    `live derivative matrix schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA}`,
    errors
  );
  assertField(
    matrixPacket?.claim_scope === "live-derivative-matrix-range-certificate",
    "live derivative matrix claim_scope must be live-derivative-matrix-range-certificate",
    errors
  );
  assertField(
    matrixPacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `live derivative matrix source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    matrixPacket?.source_artifact_id === artifact?.artifact_id,
    "live derivative matrix source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    matrixPacket?.certifies_live_derivative_matrix === true,
    "live derivative matrix packet must set certifies_live_derivative_matrix=true",
    errors
  );
  assertField(
    matrixPacket?.certifies_bounded_speed_live_ledger === false,
    "live derivative matrix packet must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    matrixPacket?.certifies_correction_direction === false,
    "live derivative matrix packet must set certifies_correction_direction=false",
    errors
  );
  assertField(matrixPacket?.retained_branch === false, "live derivative matrix packet must set retained_branch=false", errors);
  assertField(
    isNonemptyString(matrixPacket?.matrix_id),
    "live derivative matrix packet must declare matrix_id",
    errors
  );
  assertField(
    isNonemptyString(matrixPacket?.ledger_convention_id),
    "live derivative matrix packet must declare ledger_convention_id",
    errors
  );
  assertField(
    isNonemptyString(matrixPacket?.bounded_speed_ledger_id),
    "live derivative matrix packet must declare bounded_speed_ledger_id",
    errors
  );
  assertField(
    isNonemptyString(matrixPacket?.force_checksum_id) && isNonemptyString(matrixPacket?.consumer_checksum_id),
    "live derivative matrix packet must declare force_checksum_id and consumer_checksum_id",
    errors
  );
  assertField(
    Array.isArray(matrixPacket?.row_labels) && JSON.stringify(matrixPacket.row_labels) === JSON.stringify(receiverLabels),
    "live derivative matrix row_labels must match frozen receiver labels",
    errors
  );
  assertField(
    Array.isArray(matrixPacket?.column_labels) &&
      matrixPacket.column_labels.length >= 1 &&
      matrixPacket.column_labels.every(isNonemptyString) &&
      uniqueEntries(matrixPacket.column_labels),
    "live derivative matrix column_labels must be a nonempty unique string array",
    errors
  );
  const includedBlocks = matrixPacket?.derivative_column_blocks;
  assertField(
    Array.isArray(includedBlocks) && includedBlocks.every(isNonemptyString),
    "live derivative matrix derivative_column_blocks must be a string array",
    errors
  );
  if (Array.isArray(includedBlocks)) {
    const missingBlocks = missingRequiredEntries(REQUIRED_LIVE_DERIVATIVE_BLOCKS, includedBlocks);
    assertField(
      missingBlocks.length === 0,
      `live derivative matrix packet omits required live blocks: ${missingBlocks.join(", ")}`,
      errors
    );
  }

  const guards = matrixPacket?.guards ?? {};
  for (const guard of REQUIRED_LIVE_DERIVATIVE_GUARDS) {
    assertField(guards?.[guard] === "passed", `live derivative matrix ${guard} must be passed`, errors);
  }

  try {
    const columnCount = validateCandidateMatrixShape(matrixPacket?.matrix);
    assertField(
      Array.isArray(matrixPacket?.column_labels) && matrixPacket.column_labels.length === columnCount,
      "live derivative matrix column_labels length must equal matrix column count",
      errors
    );
  } catch (error) {
    errors.push(error.message);
  }
  assertField(
    Number.isFinite(options.rankTolerance) && options.rankTolerance >= 0,
    "rank tolerance must be nonnegative",
    errors
  );
  assertField(
    Number.isFinite(options.rangeTolerance) && options.rangeTolerance >= 0,
    "range tolerance must be nonnegative",
    errors
  );
  return errors;
}

export function evaluateLiveDerivativeMatrixCertificate(artifact, matrixPacket, options = {}) {
  const rankTolerance = Number(options.rankTolerance ?? DEFAULT_RANK_TOLERANCE);
  const rangeTolerance = Number(options.rangeTolerance ?? DEFAULT_RANGE_TOLERANCE);
  const errors = liveDerivativeMatrixCertificateValidationErrors(artifact, matrixPacket, {
    rankTolerance,
    rangeTolerance,
  });
  if (errors.length > 0) {
    throw new Error(`live derivative matrix packet failed validation: ${errors.join("; ")}`);
  }

  const targetVector = artifact.linear_system_intake.rhs_vector;
  const check = evaluateCandidateRangeCondition(matrixPacket.matrix, targetVector, {
    rankTolerance,
    rangeTolerance,
  });
  const cokernelWitness = buildCertifiedLiveCokernelWitness(
    matrixPacket.matrix,
    targetVector,
    check.range_residual_vector,
    check.range_residual_norm,
    rangeTolerance
  );
  const rangePassed = check.status === "range-condition-passed";

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    claim_scope: "live-derivative-matrix-range-certificate",
    matrix_id: matrixPacket.matrix_id,
    source_artifact_id: matrixPacket.source_artifact_id,
    target_condition: "-M(z_0) in Range(B)",
    rhs_source: "linear_system_intake.rhs_vector",
    matrix_source: "live_derivative_matrix_certificate.matrix",
    ledger_convention_id: matrixPacket.ledger_convention_id,
    bounded_speed_ledger_id: matrixPacket.bounded_speed_ledger_id,
    force_checksum_id: matrixPacket.force_checksum_id,
    consumer_checksum_id: matrixPacket.consumer_checksum_id,
    row_labels: matrixPacket.row_labels,
    column_labels: matrixPacket.column_labels,
    dimensions: {
      row_count: check.row_count,
      column_count: check.column_count,
    },
    required_live_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS,
    included_live_blocks: matrixPacket.derivative_column_blocks,
    omitted_required_live_blocks: [],
    required_guards: REQUIRED_LIVE_DERIVATIVE_GUARDS,
    guard_status: "same-ledger-live-derivative-matrix-certified",
    tolerances: {
      rank: rankTolerance,
      range: rangeTolerance,
    },
    derivative_matrix: formatMatrix(matrixPacket.matrix),
    matrix_rank: check.rank,
    augmented_rank_with_constant_direction: check.augmented_rank_with_constant_direction,
    independent_column_indices: check.independent_column_indices,
    constant_direction_in_range_status: check.constant_direction_in_range_status,
    rhs_norm_2: check.target_vector_norm,
    live_range_projection_vector: check.range_projection_vector,
    live_range_residual_vector: check.range_residual_vector,
    live_range_residual_norm_2: check.range_residual_norm,
    live_range_relative_residual: check.normalized_range_residual,
    certified_cokernel_witness: cokernelWitness,
    constant_direction_residual_norm_2: check.constant_direction_residual_norm,
    column_sums: check.column_sums,
    max_abs_column_sum: check.max_abs_column_sum,
    balanced_column_status: check.balanced_column_status,
    range_membership_status: rangePassed ? "live-rhs-in-range" : "live-rhs-out-of-range",
    range_certificate_status: rangePassed ? "certified-live-rhs-in-range" : "certified-live-rhs-out-of-range",
    cokernel_obstruction_status: rangePassed ? "no-cokernel-obstruction-detected" : check.cokernel_obstruction_status,
    certifies_live_derivative_matrix: true,
    certifies_bounded_speed_live_ledger: false,
    certifies_correction_direction: false,
    live_derivative_status: "live-derivative-matrix-certified",
    correction_status: rangePassed ? "correction-direction-open" : "correction-obstruction-certified",
    retention: "not_retained",
    status_note:
      "This packet certifies the supplied same-ledger derivative matrix B and its range verdict for the zero-mean row. It does not certify a bounded-speed live ledger, correction direction, or retained branch.",
  };
}

export function attachLiveDerivativeMatrixCertificate(artifact, matrixPacket, options = {}) {
  const liveMatrixCertificate = evaluateLiveDerivativeMatrixCertificate(artifact, matrixPacket, options);
  const correctionStatus = liveMatrixCertificate.correction_status;
  const firstFailureRow =
    correctionStatus === "correction-obstruction-certified"
      ? "correction-obstruction-certified"
      : "correction-direction-open";

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      certifies_live_derivative_matrix: true,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE mean vector is a positive constant six-vector, and a same-ledger derivative matrix has been certified for the first-order zero-mean range test.",
    },
    linear_system_intake: {
      ...artifact.linear_system_intake,
      derivative_matrix: liveMatrixCertificate.derivative_matrix,
      derivative_matrix_source: liveMatrixCertificate.matrix_source,
      derivative_matrix_certificate_schema: liveMatrixCertificate.schema,
      rank: liveMatrixCertificate.matrix_rank,
      range_residual: liveMatrixCertificate.live_range_residual_vector,
      range_residual_norm_2: liveMatrixCertificate.live_range_residual_norm_2,
      range_projection: liveMatrixCertificate.live_range_projection_vector,
      cokernel_projection: liveMatrixCertificate.certified_cokernel_witness,
      range_certificate_status: liveMatrixCertificate.range_certificate_status,
      live_derivative_status: liveMatrixCertificate.live_derivative_status,
      correction_status: correctionStatus,
    },
    derivative_column_audit: {
      status: "live-derivative-matrix-certified",
      live_derivative_columns_claimed: true,
      included_column_blocks: liveMatrixCertificate.included_live_blocks,
      omitted_required_live_blocks: [],
      ledger_convention_id: liveMatrixCertificate.ledger_convention_id,
      bounded_speed_ledger_id: liveMatrixCertificate.bounded_speed_ledger_id,
      force_checksum_id: liveMatrixCertificate.force_checksum_id,
      consumer_checksum_id: liveMatrixCertificate.consumer_checksum_id,
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: artifact.residual_vector.rows.map((row) =>
        row.row === "R_live_zero_mean_derivative_matrix"
          ? { ...row, status: "passed", value: liveMatrixCertificate.live_derivative_status }
          : row
      ),
      first_failure_row: firstFailureRow,
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-live-matrix-range-certified",
      correction_direction: "not_found",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side and certifies the supplied same-ledger derivative matrix range verdict. It does not certify a correction direction, bounded-speed live ledger, or retained branch.",
    },
    not_retained_reason: [
      "correction direction is not certified",
      "bounded-speed live ledger is not certified as a retained branch",
      "normal reconstruction, action, Noether, event, stability, and observer-export rows are not closed",
    ],
    live_derivative_matrix_certificate: liveMatrixCertificate,
  };
}

function liveCorrectionDirectionCertificateValidationErrors(artifact, correctionPacket, options) {
  const errors = [];
  const liveMatrixCertificate = artifact?.live_derivative_matrix_certificate;

  assertField(
    correctionPacket?.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    `live correction direction schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA}`,
    errors
  );
  assertField(
    correctionPacket?.claim_scope === "live-correction-direction-certificate",
    "live correction direction claim_scope must be live-correction-direction-certificate",
    errors
  );
  assertField(
    correctionPacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `live correction direction source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    correctionPacket?.source_artifact_id === artifact?.artifact_id,
    "live correction direction source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    liveMatrixCertificate?.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    "live correction direction requires an attached live derivative matrix certificate",
    errors
  );
  assertField(
    correctionPacket?.source_live_derivative_matrix_certificate_schema ===
      OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    "live correction direction must cite the live derivative matrix certificate schema",
    errors
  );
  assertField(
    correctionPacket?.source_live_derivative_matrix_id === liveMatrixCertificate?.matrix_id,
    "live correction direction source_live_derivative_matrix_id must match the live matrix certificate",
    errors
  );
  assertField(
    liveMatrixCertificate?.range_certificate_status === "certified-live-rhs-in-range",
    "live correction direction requires certified-live-rhs-in-range",
    errors
  );
  assertField(
    correctionPacket?.source_range_certificate_status === "certified-live-rhs-in-range",
    "live correction direction must cite certified-live-rhs-in-range",
    errors
  );
  assertField(
    correctionPacket?.certifies_live_derivative_matrix === true,
    "live correction direction packet must set certifies_live_derivative_matrix=true",
    errors
  );
  assertField(
    correctionPacket?.certifies_correction_direction === true,
    "live correction direction packet must set certifies_correction_direction=true",
    errors
  );
  assertField(
    correctionPacket?.certifies_bounded_speed_live_ledger === false,
    "live correction direction packet must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    correctionPacket?.retained_branch === false,
    "live correction direction packet must set retained_branch=false",
    errors
  );
  assertField(
    isNonemptyString(correctionPacket?.direction_id),
    "live correction direction packet must declare direction_id",
    errors
  );
  assertField(
    Number.isFinite(options.rankTolerance) && options.rankTolerance >= 0,
    "rank tolerance must be nonnegative",
    errors
  );
  assertField(
    Number.isFinite(options.rangeTolerance) && options.rangeTolerance >= 0,
    "range tolerance must be nonnegative",
    errors
  );
  const guards = correctionPacket?.first_order_margin_guards ?? {};
  for (const guard of REQUIRED_CORRECTION_DIRECTION_GUARDS) {
    assertField(guards?.[guard] === "passed", `live correction direction ${guard} must be passed`, errors);
  }
  assertField(
    Array.isArray(correctionPacket?.alpha_b_vector) &&
      correctionPacket.alpha_b_vector.length === liveMatrixCertificate?.dimensions?.column_count &&
      correctionPacket.alpha_b_vector.every(Number.isFinite),
    "live correction direction alpha_b_vector must have one finite entry per live matrix column",
    errors
  );
  return errors;
}

export function evaluateLiveCorrectionDirectionCertificate(artifact, correctionPacket, options = {}) {
  const rankTolerance = Number(options.rankTolerance ?? DEFAULT_RANK_TOLERANCE);
  const rangeTolerance = Number(options.rangeTolerance ?? DEFAULT_RANGE_TOLERANCE);
  const errors = liveCorrectionDirectionCertificateValidationErrors(artifact, correctionPacket, {
    rankTolerance,
    rangeTolerance,
  });
  if (errors.length > 0) {
    throw new Error(`live correction direction packet failed validation: ${errors.join("; ")}`);
  }

  const liveMatrixCertificate = artifact.live_derivative_matrix_certificate;
  const targetVector = artifact.linear_system_intake.rhs_vector;
  const alphaB = correctionPacket.alpha_b_vector;
  const fitted = multiplyMatrixVector(liveMatrixCertificate.derivative_matrix, alphaB);
  const residual = subtract(fitted, targetVector);
  const residualNorm = vectorNorm(residual);
  const targetNorm = vectorNorm(targetVector);
  const relativeResidual = targetNorm > 0 ? residualNorm / targetNorm : residualNorm;
  if (residualNorm > rangeTolerance) {
    throw new Error(`alpha_B residual ${residualNorm} exceeds range tolerance ${rangeTolerance}`);
  }

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_live_derivative_matrix_certificate_schema: liveMatrixCertificate.schema,
    claim_scope: "live-correction-direction-certificate",
    direction_id: correctionPacket.direction_id,
    source_artifact_id: correctionPacket.source_artifact_id,
    source_live_derivative_matrix_id: liveMatrixCertificate.matrix_id,
    source_range_certificate_status: liveMatrixCertificate.range_certificate_status,
    equation: "B*alpha=-M",
    solver: "supplied-alpha-b-residual-check",
    rhs_source: "linear_system_intake.rhs_vector",
    matrix_source: "live_derivative_matrix_certificate.derivative_matrix",
    ledger_convention_id: liveMatrixCertificate.ledger_convention_id,
    bounded_speed_ledger_id: liveMatrixCertificate.bounded_speed_ledger_id,
    force_checksum_id: liveMatrixCertificate.force_checksum_id,
    consumer_checksum_id: liveMatrixCertificate.consumer_checksum_id,
    column_labels: liveMatrixCertificate.column_labels,
    tolerances: {
      rank: rankTolerance,
      range: rangeTolerance,
    },
    alpha_b_vector: alphaB.map(formatNumber),
    alpha_b_norm_2: formatNumber(vectorNorm(alphaB)),
    fitted_rhs: fitted.map(formatNumber),
    alpha_b_residual_vector: residual.map(formatNumber),
    alpha_b_residual_norm_2: formatNumber(residualNorm),
    alpha_b_relative_residual: formatNumber(relativeResidual),
    alpha_vector: alphaB.map(formatNumber),
    residual_vector: residual.map(formatNumber),
    residual_norm_2: formatNumber(residualNorm),
    relative_residual: formatNumber(relativeResidual),
    required_first_order_margin_guards: REQUIRED_CORRECTION_DIRECTION_GUARDS,
    first_order_margin_guards: correctionPacket.first_order_margin_guards,
    guard_status: "first-order-correction-margins-passed",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_bounded_speed_live_ledger: false,
    correction_status: "correction-direction-found",
    downstream_status: "bounded-speed-live-ledger-open",
    retention: "not_retained",
    status_note:
      "This packet certifies a first-order zero-mean correction direction for the supplied same-ledger derivative matrix. It does not certify a bounded-speed live ledger or retained branch.",
  };
}

export function attachLiveCorrectionDirectionCertificate(artifact, correctionPacket, options = {}) {
  const liveCorrectionDirectionCertificate = evaluateLiveCorrectionDirectionCertificate(
    artifact,
    correctionPacket,
    options
  );
  const existingRows = artifact.residual_vector.rows.filter(
    (row) => row.row !== "R_live_zero_mean_correction_direction"
  );

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      certifies_correction_direction: true,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE mean vector is a positive constant six-vector, a same-ledger derivative matrix has been certified, and a first-order zero-mean correction direction has been found for that matrix.",
    },
    linear_system_intake: {
      ...artifact.linear_system_intake,
      alpha_b_vector: liveCorrectionDirectionCertificate.alpha_b_vector,
      alpha_b_source: liveCorrectionDirectionCertificate.matrix_source,
      alpha_b_certificate_schema: liveCorrectionDirectionCertificate.schema,
      alpha_b_residual_vector: liveCorrectionDirectionCertificate.alpha_b_residual_vector,
      alpha_b_residual_norm_2: liveCorrectionDirectionCertificate.alpha_b_residual_norm_2,
      alpha_b_relative_residual: liveCorrectionDirectionCertificate.alpha_b_relative_residual,
      solution_alpha_vector: liveCorrectionDirectionCertificate.alpha_vector,
      solution_alpha_norm_2: liveCorrectionDirectionCertificate.alpha_b_norm_2,
      solution_fitted_rhs: liveCorrectionDirectionCertificate.fitted_rhs,
      solution_residual_vector: liveCorrectionDirectionCertificate.residual_vector,
      solution_residual_norm_2: liveCorrectionDirectionCertificate.residual_norm_2,
      correction_direction_certificate_schema: liveCorrectionDirectionCertificate.schema,
      correction_direction_certificate_id: liveCorrectionDirectionCertificate.direction_id,
      correction_status: "correction-direction-found",
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: [
        ...existingRows,
        {
          row: "R_live_zero_mean_correction_direction",
          status: "passed",
          value: "correction-direction-found",
        },
      ],
      first_failure_row: "bounded-speed-live-ledger-open",
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-live-correction-direction-certified",
      correction_direction: "found_first_order_not_retained",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side, certifies the supplied same-ledger derivative matrix range verdict, and emits a first-order correction direction. It does not certify a bounded-speed live ledger or retained branch.",
    },
    not_retained_reason: [
      "bounded-speed live ledger is not certified as a retained branch",
      "primitive excursion and speed-band rows are not closed",
      "normal reconstruction, action, Noether, event, stability, and observer-export rows are not closed",
    ],
    live_correction_direction_certificate: liveCorrectionDirectionCertificate,
  };
}

function speedPrimitiveFeasibilityValidationErrors(artifact, primitivePacket, options) {
  const errors = [];
  const correctionCertificate = artifact?.live_correction_direction_certificate;

  assertField(
    primitivePacket?.schema === OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    `speed primitive feasibility schema must be ${OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA}`,
    errors
  );
  assertField(
    primitivePacket?.claim_scope === "speed-primitive-feasibility-certificate",
    "speed primitive feasibility claim_scope must be speed-primitive-feasibility-certificate",
    errors
  );
  assertField(
    primitivePacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `speed primitive feasibility source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    primitivePacket?.source_artifact_id === artifact?.artifact_id,
    "speed primitive feasibility source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    correctionCertificate?.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    "speed primitive feasibility requires an attached live correction direction certificate",
    errors
  );
  assertField(
    correctionCertificate?.correction_status === "correction-direction-found",
    "speed primitive feasibility requires correction-direction-found",
    errors
  );
  assertField(
    primitivePacket?.source_correction_direction_certificate_schema ===
      OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    "speed primitive feasibility must cite the live correction direction certificate schema",
    errors
  );
  assertField(
    primitivePacket?.source_correction_direction_id === correctionCertificate?.direction_id,
    "speed primitive feasibility source_correction_direction_id must match the live correction direction",
    errors
  );
  assertField(
    primitivePacket?.bounded_speed_ledger_id === correctionCertificate?.bounded_speed_ledger_id,
    "speed primitive feasibility bounded_speed_ledger_id must match the correction direction certificate",
    errors
  );
  assertField(
    primitivePacket?.certifies_live_derivative_matrix === true,
    "speed primitive feasibility packet must set certifies_live_derivative_matrix=true",
    errors
  );
  assertField(
    primitivePacket?.certifies_correction_direction === true,
    "speed primitive feasibility packet must set certifies_correction_direction=true",
    errors
  );
  assertField(
    primitivePacket?.certifies_speed_primitive_feasibility === true,
    "speed primitive feasibility packet must set certifies_speed_primitive_feasibility=true",
    errors
  );
  assertField(
    primitivePacket?.certifies_bounded_speed_live_ledger === false,
    "speed primitive feasibility packet must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    primitivePacket?.retained_branch === false,
    "speed primitive feasibility packet must set retained_branch=false",
    errors
  );
  assertField(isNonemptyString(primitivePacket?.primitive_id), "speed primitive feasibility must declare primitive_id", errors);
  assertField(
    Number.isFinite(options.primitiveReturnTolerance) && options.primitiveReturnTolerance >= 0,
    "primitive return tolerance must be nonnegative",
    errors
  );
  assertField(
    Number.isFinite(options.speedBandMarginFloor) && options.speedBandMarginFloor >= 0,
    "speed band margin floor must be nonnegative",
    errors
  );
  assertField(
    Array.isArray(primitivePacket?.row_labels) &&
      JSON.stringify(primitivePacket.row_labels) === JSON.stringify(artifact?.frozen_mean_vector?.receiver_labels),
    "speed primitive feasibility row_labels must match frozen receiver labels",
    errors
  );
  const receiverRows = primitivePacket?.receiver_primitives;
  assertField(
    Array.isArray(receiverRows) && receiverRows.length === RECEIVER_COUNT,
    "speed primitive feasibility must provide one primitive row per receiver",
    errors
  );
  if (Array.isArray(receiverRows)) {
    assertField(
      uniqueEntries(receiverRows.map((row) => row?.receiver_label)),
      "speed primitive feasibility receiver labels must be unique",
      errors
    );
    const expectedLabels = artifact?.frozen_mean_vector?.receiver_labels ?? [];
    receiverRows.forEach((row, index) => {
      assertField(
        row?.receiver_label === expectedLabels[index],
        "speed primitive feasibility receiver rows must follow frozen receiver order",
        errors
      );
      assertField(Number.isFinite(row?.primitive_return_residual), "primitive return residuals must be finite", errors);
      assertField(Number.isFinite(row?.primitive_excursion_min), "primitive excursion minima must be finite", errors);
      assertField(Number.isFinite(row?.primitive_excursion_max), "primitive excursion maxima must be finite", errors);
      assertField(
        Number.isFinite(row?.primitive_excursion_min) &&
          Number.isFinite(row?.primitive_excursion_max) &&
          row.primitive_excursion_min <= row.primitive_excursion_max,
        "primitive excursion minima must not exceed maxima",
        errors
      );
      assertField(Number.isFinite(row?.nu_initial), "primitive feasibility nu_initial values must be finite", errors);
      assertField(Number.isFinite(row?.speed_band_lower), "primitive feasibility speed_band_lower values must be finite", errors);
      assertField(Number.isFinite(row?.speed_band_upper), "primitive feasibility speed_band_upper values must be finite", errors);
      assertField(
        Number.isFinite(row?.speed_band_lower) &&
          Number.isFinite(row?.speed_band_upper) &&
          row.speed_band_lower < row.speed_band_upper,
        "primitive feasibility speed band lower bounds must be below upper bounds",
        errors
      );
    });
  }
  return errors;
}

export function evaluateSpeedPrimitiveFeasibilityCertificate(artifact, primitivePacket, options = {}) {
  const primitiveReturnTolerance = Number(options.primitiveReturnTolerance ?? DEFAULT_PRIMITIVE_RETURN_TOLERANCE);
  const speedBandMarginFloor = Number(options.speedBandMarginFloor ?? DEFAULT_SPEED_BAND_MARGIN_FLOOR);
  const errors = speedPrimitiveFeasibilityValidationErrors(artifact, primitivePacket, {
    primitiveReturnTolerance,
    speedBandMarginFloor,
  });
  if (errors.length > 0) {
    throw new Error(`speed primitive feasibility packet failed validation: ${errors.join("; ")}`);
  }

  const correctionCertificate = artifact.live_correction_direction_certificate;
  const receiverPrimitives = primitivePacket.receiver_primitives.map((row) => {
    const correctedMinimum = row.nu_initial + row.primitive_excursion_min;
    const correctedMaximum = row.nu_initial + row.primitive_excursion_max;
    const lowerMargin = correctedMinimum - row.speed_band_lower;
    const upperMargin = row.speed_band_upper - correctedMaximum;
    const minimumMargin = Math.min(lowerMargin, upperMargin);
    return {
      receiver_label: row.receiver_label,
      primitive_return_residual: formatNumber(row.primitive_return_residual),
      primitive_return_residual_abs: formatNumber(Math.abs(row.primitive_return_residual)),
      primitive_excursion_min: formatNumber(row.primitive_excursion_min),
      primitive_excursion_max: formatNumber(row.primitive_excursion_max),
      nu_initial: formatNumber(row.nu_initial),
      corrected_speed_interval: [formatNumber(correctedMinimum), formatNumber(correctedMaximum)],
      speed_band: [formatNumber(row.speed_band_lower), formatNumber(row.speed_band_upper)],
      lower_speed_band_margin: formatNumber(lowerMargin),
      upper_speed_band_margin: formatNumber(upperMargin),
      minimum_speed_band_margin: formatNumber(minimumMargin),
    };
  });
  const primitiveReturnResidualAbsMax = maxAbs(primitivePacket.receiver_primitives.map((row) => row.primitive_return_residual));
  const speedBandMarginMin = Math.min(...receiverPrimitives.map((row) => row.minimum_speed_band_margin));
  if (primitiveReturnResidualAbsMax > primitiveReturnTolerance) {
    throw new Error(
      `primitive return residual ${primitiveReturnResidualAbsMax} exceeds tolerance ${primitiveReturnTolerance}`
    );
  }
  if (speedBandMarginMin < speedBandMarginFloor) {
    throw new Error(`speed band margin ${speedBandMarginMin} is below floor ${speedBandMarginFloor}`);
  }

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_correction_direction_certificate_schema: correctionCertificate.schema,
    claim_scope: "speed-primitive-feasibility-certificate",
    primitive_id: primitivePacket.primitive_id,
    source_artifact_id: primitivePacket.source_artifact_id,
    source_correction_direction_id: correctionCertificate.direction_id,
    equation: "nu_i(u)=nu_i(0)+A_i(u)",
    primitive_definition: "A_i(u)=Gamma*int_0^u f_i^nu(s; alpha_B) ds",
    primitive_source: "supplied-post-correction-primitive-bounds",
    alpha_b_source: "live_correction_direction_certificate.alpha_b_vector",
    ledger_convention_id: correctionCertificate.ledger_convention_id,
    bounded_speed_ledger_id: correctionCertificate.bounded_speed_ledger_id,
    force_checksum_id: correctionCertificate.force_checksum_id,
    consumer_checksum_id: correctionCertificate.consumer_checksum_id,
    row_labels: primitivePacket.row_labels,
    tolerances: {
      primitive_return: primitiveReturnTolerance,
      speed_band_margin_floor: speedBandMarginFloor,
    },
    receiver_primitives: receiverPrimitives,
    primitive_return_residual_abs_max: formatNumber(primitiveReturnResidualAbsMax),
    speed_band_margin_min: formatNumber(speedBandMarginMin),
    guard_status: "speed-primitive-return-and-band-passed",
    speed_primitive_status: "speed-primitive-feasibility-certified",
    downstream_status: "clock-length-return-open",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
    status_note:
      "This packet certifies supplied post-correction speed primitive return and speed-band bounds for the first-order alpha_B direction. It does not certify clock-length return, a bounded-speed live ledger, or a retained branch.",
  };
}

export function attachSpeedPrimitiveFeasibilityCertificate(artifact, primitivePacket, options = {}) {
  const speedPrimitiveFeasibilityCertificate = evaluateSpeedPrimitiveFeasibilityCertificate(
    artifact,
    primitivePacket,
    options
  );
  const existingRows = artifact.residual_vector.rows.filter(
    (row) => row.row !== "R_speed_ode_primitive_feasibility"
  );

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      certifies_speed_primitive_feasibility: true,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE mean vector is a positive constant six-vector, a same-ledger derivative matrix and first-order correction direction have been certified, and supplied post-correction speed primitive return and speed-band bounds pass.",
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: [
        ...existingRows,
        {
          row: "R_speed_ode_primitive_feasibility",
          status: "passed",
          value: "speed-primitive-feasibility-certified",
        },
      ],
      first_failure_row: "clock-length-return-open",
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-speed-primitive-feasibility-certified",
      correction_direction: "found_first_order_not_retained",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side, certifies the supplied same-ledger derivative matrix range verdict, emits a first-order correction direction, and certifies supplied post-correction speed primitive feasibility. It does not certify clock-length return, a bounded-speed live ledger, or retained branch.",
    },
    not_retained_reason: [
      "clock-length return is not certified",
      "bounded-speed live ledger is not certified as a retained branch",
      "normal reconstruction, action, Noether, event, stability, and observer-export rows are not closed",
    ],
    speed_ode_primitive_feasibility_certificate: speedPrimitiveFeasibilityCertificate,
  };
}

function speedClockLengthValidationErrors(artifact, clockPacket, options) {
  const errors = [];
  const primitiveCertificate = artifact?.speed_ode_primitive_feasibility_certificate;

  assertField(
    clockPacket?.schema === OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    `speed clock length schema must be ${OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA}`,
    errors
  );
  assertField(
    clockPacket?.claim_scope === "speed-clock-length-certificate",
    "speed clock length claim_scope must be speed-clock-length-certificate",
    errors
  );
  assertField(
    clockPacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `speed clock length source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    clockPacket?.source_artifact_id === artifact?.artifact_id,
    "speed clock length source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    primitiveCertificate?.schema === OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    "speed clock length requires an attached speed primitive feasibility certificate",
    errors
  );
  assertField(
    primitiveCertificate?.speed_primitive_status === "speed-primitive-feasibility-certified",
    "speed clock length requires speed-primitive-feasibility-certified",
    errors
  );
  assertField(
    clockPacket?.source_speed_primitive_feasibility_schema ===
      OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    "speed clock length must cite the speed primitive feasibility certificate schema",
    errors
  );
  assertField(
    clockPacket?.source_speed_primitive_feasibility_id === primitiveCertificate?.primitive_id,
    "speed clock length source_speed_primitive_feasibility_id must match the primitive certificate",
    errors
  );
  assertField(
    clockPacket?.bounded_speed_ledger_id === primitiveCertificate?.bounded_speed_ledger_id,
    "speed clock length bounded_speed_ledger_id must match the primitive certificate",
    errors
  );
  assertField(
    clockPacket?.certifies_live_derivative_matrix === true,
    "speed clock length packet must set certifies_live_derivative_matrix=true",
    errors
  );
  assertField(
    clockPacket?.certifies_correction_direction === true,
    "speed clock length packet must set certifies_correction_direction=true",
    errors
  );
  assertField(
    clockPacket?.certifies_speed_primitive_feasibility === true,
    "speed clock length packet must set certifies_speed_primitive_feasibility=true",
    errors
  );
  assertField(
    clockPacket?.certifies_speed_clock_length === true,
    "speed clock length packet must set certifies_speed_clock_length=true",
    errors
  );
  assertField(
    clockPacket?.certifies_bounded_speed_live_ledger === false,
    "speed clock length packet must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(clockPacket?.retained_branch === false, "speed clock length packet must set retained_branch=false", errors);
  assertField(isNonemptyString(clockPacket?.clock_length_id), "speed clock length must declare clock_length_id", errors);
  assertField(
    Number.isFinite(options.clockLengthTolerance) && options.clockLengthTolerance >= 0,
    "clock length tolerance must be nonnegative",
    errors
  );
  assertField(
    Array.isArray(clockPacket?.row_labels) &&
      JSON.stringify(clockPacket.row_labels) === JSON.stringify(artifact?.frozen_mean_vector?.receiver_labels),
    "speed clock length row_labels must match frozen receiver labels",
    errors
  );
  const clockRows = clockPacket?.receiver_clock_length_rows;
  assertField(
    Array.isArray(clockRows) && clockRows.length === RECEIVER_COUNT,
    "speed clock length must provide one clock/length row per receiver",
    errors
  );
  if (Array.isArray(clockRows)) {
    assertField(
      uniqueEntries(clockRows.map((row) => row?.receiver_label)),
      "speed clock length receiver labels must be unique",
      errors
    );
    const expectedLabels = artifact?.frozen_mean_vector?.receiver_labels ?? [];
    const primitiveRowsByLabel = new Map(
      (primitiveCertificate?.receiver_primitives ?? []).map((row) => [row.receiver_label, row])
    );
    clockRows.forEach((row, index) => {
      const primitiveRow = primitiveRowsByLabel.get(row?.receiver_label);
      assertField(
        row?.receiver_label === expectedLabels[index],
        "speed clock length receiver rows must follow frozen receiver order",
        errors
      );
      assertField(primitiveRow !== undefined, "speed clock length receiver must exist in primitive certificate", errors);
      assertField(Number.isFinite(row?.center_time_period) && row.center_time_period > 0, "center-time periods must be positive", errors);
      assertField(Number.isFinite(row?.target_length) && row.target_length > 0, "target lengths must be positive", errors);
      assertField(Number.isFinite(row?.nu_initial), "clock length nu_initial values must be finite", errors);
      assertField(
        primitiveRow === undefined || row?.nu_initial === primitiveRow.nu_initial,
        "clock length nu_initial must match the primitive certificate",
        errors
      );
      assertField(Number.isFinite(row?.primitive_integral), "primitive integrals must be finite", errors);
      assertField(Number.isFinite(row?.length_return_residual), "length return residuals must be finite", errors);
    });
  }
  return errors;
}

export function evaluateSpeedClockLengthCertificate(artifact, clockPacket, options = {}) {
  const clockLengthTolerance = Number(options.clockLengthTolerance ?? DEFAULT_CLOCK_LENGTH_TOLERANCE);
  const errors = speedClockLengthValidationErrors(artifact, clockPacket, { clockLengthTolerance });
  if (errors.length > 0) {
    throw new Error(`speed clock length packet failed validation: ${errors.join("; ")}`);
  }

  const primitiveCertificate = artifact.speed_ode_primitive_feasibility_certificate;
  const receiverClockLengthRows = clockPacket.receiver_clock_length_rows.map((row) => {
    const computedLength = row.center_time_period * row.nu_initial + row.primitive_integral;
    const computedResidual = computedLength - row.target_length;
    const residualMismatch = computedResidual - row.length_return_residual;
    return {
      receiver_label: row.receiver_label,
      center_time_period: formatNumber(row.center_time_period),
      target_length: formatNumber(row.target_length),
      winding_number: Number.isFinite(row.winding_number) ? formatNumber(row.winding_number) : null,
      nu_initial: formatNumber(row.nu_initial),
      primitive_integral: formatNumber(row.primitive_integral),
      computed_length: formatNumber(computedLength),
      length_return_residual: formatNumber(row.length_return_residual),
      length_return_residual_abs: formatNumber(Math.abs(row.length_return_residual)),
      residual_mismatch: formatNumber(residualMismatch),
    };
  });
  const residualAbsMax = maxAbs(clockPacket.receiver_clock_length_rows.map((row) => row.length_return_residual));
  const residualMismatchAbsMax = maxAbs(receiverClockLengthRows.map((row) => row.residual_mismatch));
  if (residualMismatchAbsMax > clockLengthTolerance) {
    throw new Error(`length residual mismatch ${residualMismatchAbsMax} exceeds tolerance ${clockLengthTolerance}`);
  }
  if (residualAbsMax > clockLengthTolerance) {
    throw new Error(`length return residual ${residualAbsMax} exceeds tolerance ${clockLengthTolerance}`);
  }

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_speed_primitive_feasibility_schema: primitiveCertificate.schema,
    claim_scope: "speed-clock-length-certificate",
    clock_length_id: clockPacket.clock_length_id,
    source_artifact_id: clockPacket.source_artifact_id,
    source_speed_primitive_feasibility_id: primitiveCertificate.primitive_id,
    equation: "int_0^H nu_i(u) du=L_i",
    length_return_source: "supplied-post-correction-primitive-integrals",
    bounded_speed_ledger_id: primitiveCertificate.bounded_speed_ledger_id,
    force_checksum_id: primitiveCertificate.force_checksum_id,
    consumer_checksum_id: primitiveCertificate.consumer_checksum_id,
    row_labels: clockPacket.row_labels,
    tolerances: {
      clock_length: clockLengthTolerance,
    },
    receiver_clock_length_rows: receiverClockLengthRows,
    length_return_residual_abs_max: formatNumber(residualAbsMax),
    residual_mismatch_abs_max: formatNumber(residualMismatchAbsMax),
    guard_status: "speed-clock-length-return-passed",
    speed_clock_length_status: "speed-clock-length-return-certified",
    downstream_status: "normal-reconstruction-open",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
    status_note:
      "This packet certifies supplied post-correction speed clock/length return for the primitive-feasible alpha_B direction. It does not certify normal reconstruction, a bounded-speed live ledger, or a retained branch.",
  };
}

export function attachSpeedClockLengthCertificate(artifact, clockPacket, options = {}) {
  const speedClockLengthCertificate = evaluateSpeedClockLengthCertificate(artifact, clockPacket, options);
  const existingRows = artifact.residual_vector.rows.filter((row) => row.row !== "R_speed_ode_clock_length_return");

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      certifies_speed_clock_length: true,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE mean vector is a positive constant six-vector, a same-ledger derivative matrix, first-order correction direction, primitive feasibility, and clock/length return have been certified, but normal reconstruction and retained-branch rows remain open.",
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: [
        ...existingRows,
        {
          row: "R_speed_ode_clock_length_return",
          status: "passed",
          value: "speed-clock-length-return-certified",
        },
      ],
      first_failure_row: "normal-reconstruction-open",
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-speed-clock-length-certified",
      correction_direction: "found_first_order_not_retained",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side, certifies the supplied same-ledger derivative matrix range verdict, emits a first-order correction direction, certifies supplied post-correction speed primitive feasibility, and certifies supplied clock/length return. It does not certify normal reconstruction, a bounded-speed live ledger, or retained branch.",
    },
    not_retained_reason: [
      "normal reconstruction is not certified",
      "bounded-speed live ledger is not certified as a retained branch",
      "action, Noether, event, stability, and observer-export rows are not closed",
    ],
    speed_ode_clock_length_certificate: speedClockLengthCertificate,
  };
}

function normalReconstructionHandoffValidationErrors(artifact, handoffPacket) {
  const errors = [];
  const clockLengthCertificate = artifact?.speed_ode_clock_length_certificate;

  assertField(
    handoffPacket?.schema === OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    `normal reconstruction handoff schema must be ${OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA}`,
    errors
  );
  assertField(
    handoffPacket?.claim_scope === "normal-reconstruction-handoff",
    "normal reconstruction handoff claim_scope must be normal-reconstruction-handoff",
    errors
  );
  assertField(
    handoffPacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `normal reconstruction handoff source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    handoffPacket?.source_artifact_id === artifact?.artifact_id,
    "normal reconstruction handoff source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    handoffPacket?.promotion_status === PROMOTION_STATUS,
    `normal reconstruction handoff promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    clockLengthCertificate?.schema === OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    "normal reconstruction handoff requires an attached speed clock length certificate",
    errors
  );
  assertField(
    clockLengthCertificate?.speed_clock_length_status === "speed-clock-length-return-certified",
    "normal reconstruction handoff requires speed-clock-length-return-certified",
    errors
  );
  assertField(
    handoffPacket?.source_speed_clock_length_schema === OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    "normal reconstruction handoff must cite the speed clock length certificate schema",
    errors
  );
  assertField(
    handoffPacket?.source_speed_clock_length_id === clockLengthCertificate?.clock_length_id,
    "normal reconstruction handoff source_speed_clock_length_id must match the clock length certificate",
    errors
  );
  assertField(
    handoffPacket?.bounded_speed_ledger_id === clockLengthCertificate?.bounded_speed_ledger_id,
    "normal reconstruction handoff bounded_speed_ledger_id must match the clock length certificate",
    errors
  );
  assertField(
    handoffPacket?.certifies_live_derivative_matrix === true,
    "normal reconstruction handoff packet must set certifies_live_derivative_matrix=true",
    errors
  );
  assertField(
    handoffPacket?.certifies_correction_direction === true,
    "normal reconstruction handoff packet must set certifies_correction_direction=true",
    errors
  );
  assertField(
    handoffPacket?.certifies_speed_primitive_feasibility === true,
    "normal reconstruction handoff packet must set certifies_speed_primitive_feasibility=true",
    errors
  );
  assertField(
    handoffPacket?.certifies_speed_clock_length === true,
    "normal reconstruction handoff packet must set certifies_speed_clock_length=true",
    errors
  );
  assertField(
    handoffPacket?.certifies_normal_reconstruction === false,
    "normal reconstruction handoff packet must set certifies_normal_reconstruction=false",
    errors
  );
  assertField(
    handoffPacket?.certifies_bounded_speed_live_ledger === false,
    "normal reconstruction handoff packet must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    handoffPacket?.retained_branch === false,
    "normal reconstruction handoff packet must set retained_branch=false",
    errors
  );
  assertField(
    isNonemptyString(handoffPacket?.normal_handoff_id),
    "normal reconstruction handoff must declare normal_handoff_id",
    errors
  );
  assertField(
    Array.isArray(handoffPacket?.row_labels) &&
      JSON.stringify(handoffPacket.row_labels) === JSON.stringify(artifact?.frozen_mean_vector?.receiver_labels),
    "normal reconstruction handoff row_labels must match frozen receiver labels",
    errors
  );
  const normalRows = handoffPacket?.receiver_normal_handoff_rows;
  assertField(
    Array.isArray(normalRows) && normalRows.length === RECEIVER_COUNT,
    "normal reconstruction handoff must provide one normal handoff row per receiver",
    errors
  );
  if (Array.isArray(normalRows)) {
    assertField(
      uniqueEntries(normalRows.map((row) => row?.receiver_label)),
      "normal reconstruction handoff receiver labels must be unique",
      errors
    );
    const expectedLabels = artifact?.frozen_mean_vector?.receiver_labels ?? [];
    normalRows.forEach((row, index) => {
      assertField(
        row?.receiver_label === expectedLabels[index],
        "normal reconstruction handoff receiver rows must follow frozen receiver order",
        errors
      );
      assertField(
        Number.isFinite(row?.normal_residual_norm_2) && row.normal_residual_norm_2 >= 0,
        "normal reconstruction handoff normal residual norms must be nonnegative finite numbers",
        errors
      );
      assertField(
        Number.isFinite(row?.tangent_holonomy_residual_norm_2) && row.tangent_holonomy_residual_norm_2 >= 0,
        "normal reconstruction handoff tangent holonomy residual norms must be nonnegative finite numbers",
        errors
      );
      assertField(
        Number.isFinite(row?.position_closure_residual_norm_2) && row.position_closure_residual_norm_2 >= 0,
        "normal reconstruction handoff position closure residual norms must be nonnegative finite numbers",
        errors
      );
      assertField(
        Number.isFinite(row?.unit_tangent_residual_abs_max) && row.unit_tangent_residual_abs_max >= 0,
        "normal reconstruction handoff unit tangent residuals must be nonnegative finite numbers",
        errors
      );
      assertField(
        Number.isFinite(row?.support_margin_min),
        "normal reconstruction handoff support margins must be finite numbers",
        errors
      );
    });
  }
  return errors;
}

export function evaluateNormalReconstructionHandoff(artifact, handoffPacket) {
  const errors = normalReconstructionHandoffValidationErrors(artifact, handoffPacket);
  if (errors.length > 0) {
    throw new Error(`normal reconstruction handoff packet failed validation: ${errors.join("; ")}`);
  }

  const clockLengthCertificate = artifact.speed_ode_clock_length_certificate;
  const receiverRows = handoffPacket.receiver_normal_handoff_rows.map((row) => ({
    receiver_label: row.receiver_label,
    normal_residual_norm_2: formatNumber(row.normal_residual_norm_2),
    tangent_holonomy_residual_norm_2: formatNumber(row.tangent_holonomy_residual_norm_2),
    position_closure_residual_norm_2: formatNumber(row.position_closure_residual_norm_2),
    unit_tangent_residual_abs_max: formatNumber(row.unit_tangent_residual_abs_max),
    support_margin_min: formatNumber(row.support_margin_min),
  }));

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_speed_clock_length_schema: clockLengthCertificate.schema,
    claim_scope: "normal-reconstruction-handoff",
    promotion_status: PROMOTION_STATUS,
    normal_handoff_id: handoffPacket.normal_handoff_id,
    source_artifact_id: handoffPacket.source_artifact_id,
    source_speed_clock_length_id: clockLengthCertificate.clock_length_id,
    equation: "nu_i(lambda_i)^2*K_i=Gamma_B^nu*P_i^perp*F_i^nu",
    handoff_source: "supplied-normal-reconstruction-handoff-rows",
    bounded_speed_ledger_id: clockLengthCertificate.bounded_speed_ledger_id,
    force_checksum_id: clockLengthCertificate.force_checksum_id,
    consumer_checksum_id: clockLengthCertificate.consumer_checksum_id,
    row_labels: handoffPacket.row_labels,
    receiver_normal_handoff_rows: receiverRows,
    normal_residual_norm_2_max: formatNumber(Math.max(...receiverRows.map((row) => row.normal_residual_norm_2))),
    tangent_holonomy_residual_norm_2_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.tangent_holonomy_residual_norm_2))
    ),
    position_closure_residual_norm_2_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.position_closure_residual_norm_2))
    ),
    unit_tangent_residual_abs_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.unit_tangent_residual_abs_max))
    ),
    support_margin_min: formatNumber(Math.min(...receiverRows.map((row) => row.support_margin_min))),
    guard_status: "normal-reconstruction-handoff-staged",
    normal_reconstruction_handoff_status: "normal-reconstruction-handoff-staged",
    normal_reconstruction_status: "normal-reconstruction-open",
    downstream_status: "normal-reconstruction-open",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: false,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
    status_note:
      "This packet stages same-ledger normal reconstruction residual, tangent-holonomy, position-closure, unit-tangent, and support-margin data after the speed clock/length row. It does not certify normal reconstruction, a bounded-speed live ledger, or a retained branch.",
  };
}

export function attachNormalReconstructionHandoff(artifact, handoffPacket) {
  const normalReconstructionHandoff = evaluateNormalReconstructionHandoff(artifact, handoffPacket);
  const existingRows = artifact.residual_vector.rows.filter((row) => row.row !== "R_normal_reconstruction_handoff");

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      emits_normal_reconstruction_handoff: true,
      certifies_normal_reconstruction: false,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE mean vector is a positive constant six-vector, the scalar speed-ODE correction chain is certified through clock/length return, and same-ledger normal reconstruction handoff rows are staged, but normal reconstruction and retained-branch rows remain open.",
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: [
        ...existingRows,
        {
          row: "R_normal_reconstruction_handoff",
          status: "open",
          value: "normal-reconstruction-handoff-staged",
        },
      ],
      first_failure_row: "normal-reconstruction-open",
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-normal-reconstruction-handoff-staged",
      correction_direction: "found_first_order_not_retained",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side, certifies the scalar speed-ODE correction chain through clock/length return, and stages normal reconstruction handoff rows. It does not certify normal reconstruction, a bounded-speed live ledger, or retained branch.",
    },
    not_retained_reason: [
      "normal reconstruction is staged but not certified",
      "bounded-speed live ledger is not certified as a retained branch",
      "action, Noether, event, stability, and observer-export rows are not closed",
    ],
    normal_reconstruction_handoff: normalReconstructionHandoff,
  };
}

function boundedSpeedNormalReconstructionCandidateValidationErrors(artifact, candidatePacket) {
  const errors = [];
  const handoff = artifact?.normal_reconstruction_handoff;
  const tolerances = candidatePacket?.tolerances ?? {};
  const marginFloors = candidatePacket?.margin_floors ?? {};

  assertField(
    candidatePacket?.schema === OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    `bounded speed normal reconstruction candidate schema must be ${OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA}`,
    errors
  );
  assertField(
    candidatePacket?.claim_scope === "bounded-speed-normal-reconstruction-candidate",
    "bounded speed normal reconstruction candidate claim_scope must be bounded-speed-normal-reconstruction-candidate",
    errors
  );
  assertField(
    candidatePacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `bounded speed normal reconstruction candidate source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    candidatePacket?.source_artifact_id === artifact?.artifact_id,
    "bounded speed normal reconstruction candidate source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    candidatePacket?.promotion_status === PROMOTION_STATUS,
    `bounded speed normal reconstruction candidate promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    handoff?.schema === OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    "bounded speed normal reconstruction candidate requires an attached normal reconstruction handoff",
    errors
  );
  assertField(
    handoff?.normal_reconstruction_handoff_status === "normal-reconstruction-handoff-staged",
    "bounded speed normal reconstruction candidate requires normal-reconstruction-handoff-staged",
    errors
  );
  assertField(
    candidatePacket?.source_normal_reconstruction_handoff_schema ===
      OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    "bounded speed normal reconstruction candidate must cite the normal reconstruction handoff schema",
    errors
  );
  assertField(
    candidatePacket?.source_normal_handoff_id === handoff?.normal_handoff_id,
    "bounded speed normal reconstruction candidate source_normal_handoff_id must match the normal handoff",
    errors
  );
  assertField(
    candidatePacket?.bounded_speed_ledger_id === handoff?.bounded_speed_ledger_id,
    "bounded speed normal reconstruction candidate bounded_speed_ledger_id must match the handoff",
    errors
  );
  assertField(
    candidatePacket?.force_checksum_id === handoff?.force_checksum_id,
    "bounded speed normal reconstruction candidate force_checksum_id must match the handoff",
    errors
  );
  assertField(
    candidatePacket?.consumer_checksum_id === handoff?.consumer_checksum_id,
    "bounded speed normal reconstruction candidate consumer_checksum_id must match the handoff",
    errors
  );
  assertField(
    isNonemptyString(candidatePacket?.normal_reconstruction_candidate_id),
    "bounded speed normal reconstruction candidate must declare normal_reconstruction_candidate_id",
    errors
  );
  assertField(
    Array.isArray(candidatePacket?.row_labels) &&
      JSON.stringify(candidatePacket.row_labels) === JSON.stringify(artifact?.frozen_mean_vector?.receiver_labels),
    "bounded speed normal reconstruction candidate row_labels must match frozen receiver labels",
    errors
  );
  assertField(
    candidatePacket?.normal_equation_status === "normal-equation-closed",
    "bounded speed normal reconstruction candidate normal equation row must be closed",
    errors
  );
  assertField(
    candidatePacket?.tangent_holonomy_status === "tangent-holonomy-closed",
    "bounded speed normal reconstruction candidate tangent holonomy row must be closed",
    errors
  );
  assertField(
    candidatePacket?.position_closure_status === "position-closure-closed",
    "bounded speed normal reconstruction candidate position closure row must be closed",
    errors
  );
  assertField(
    candidatePacket?.unit_tangent_status === "unit-tangent-closed",
    "bounded speed normal reconstruction candidate unit tangent row must be closed",
    errors
  );
  assertField(
    candidatePacket?.support_margin_status === "support-margin-positive",
    "bounded speed normal reconstruction candidate support margin row must be positive",
    errors
  );
  assertField(
    candidatePacket?.noncollision_status === "noncollision-certified",
    "bounded speed normal reconstruction candidate noncollision row must be certified",
    errors
  );
  assertField(
    candidatePacket?.root_persistence_status === "root-persistence-certified",
    "bounded speed normal reconstruction candidate root persistence row must be certified",
    errors
  );
  assertField(
    candidatePacket?.krawczyk_status === "bounded-speed-branch-krawczyk-accepted",
    "bounded speed normal reconstruction candidate Krawczyk row must be accepted",
    errors
  );
  assertField(
    candidatePacket?.certifies_live_derivative_matrix === true &&
      candidatePacket?.certifies_correction_direction === true &&
      candidatePacket?.certifies_speed_primitive_feasibility === true &&
      candidatePacket?.certifies_speed_clock_length === true,
    "bounded speed normal reconstruction candidate must preserve the certified scalar speed chain",
    errors
  );
  assertField(
    candidatePacket?.certifies_normal_reconstruction === true,
    "bounded speed normal reconstruction candidate must set certifies_normal_reconstruction=true",
    errors
  );
  assertField(
    candidatePacket?.certifies_bounded_speed_live_ledger === false,
    "bounded speed normal reconstruction candidate must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    candidatePacket?.retained_branch === false,
    "bounded speed normal reconstruction candidate must set retained_branch=false",
    errors
  );

  const toleranceKeys = [
    "normal_residual_norm_2",
    "tangent_holonomy_residual_norm_2",
    "position_closure_residual_norm_2",
    "unit_tangent_residual_abs_max",
    "krawczyk_residual_norm_2",
  ];
  for (const key of toleranceKeys) {
    assertField(
      Number.isFinite(tolerances?.[key]) && tolerances[key] >= 0,
      `bounded speed normal reconstruction candidate tolerance ${key} must be a nonnegative finite number`,
      errors
    );
  }
  for (const key of ["support_margin_min", "noncollision_margin_min", "root_persistence_margin_min"]) {
    assertField(
      Number.isFinite(marginFloors?.[key]),
      `bounded speed normal reconstruction candidate margin floor ${key} must be finite`,
      errors
    );
  }

  const candidateRows = candidatePacket?.receiver_normal_candidate_rows;
  assertField(
    Array.isArray(candidateRows) && candidateRows.length === RECEIVER_COUNT,
    "bounded speed normal reconstruction candidate must provide one candidate row per receiver",
    errors
  );
  if (Array.isArray(candidateRows)) {
    assertField(
      uniqueEntries(candidateRows.map((row) => row?.receiver_label)),
      "bounded speed normal reconstruction candidate receiver labels must be unique",
      errors
    );
    const expectedLabels = artifact?.frozen_mean_vector?.receiver_labels ?? [];
    candidateRows.forEach((row, index) => {
      assertField(
        row?.receiver_label === expectedLabels[index],
        "bounded speed normal reconstruction candidate receiver rows must follow frozen receiver order",
        errors
      );
      assertField(
        Number.isFinite(row?.normal_residual_norm_2) &&
          row.normal_residual_norm_2 >= 0 &&
          row.normal_residual_norm_2 <= tolerances.normal_residual_norm_2,
        "bounded speed normal reconstruction candidate normal residuals must be inside tolerance",
        errors
      );
      assertField(
        Number.isFinite(row?.tangent_holonomy_residual_norm_2) &&
          row.tangent_holonomy_residual_norm_2 >= 0 &&
          row.tangent_holonomy_residual_norm_2 <= tolerances.tangent_holonomy_residual_norm_2,
        "bounded speed normal reconstruction candidate tangent holonomy residuals must be inside tolerance",
        errors
      );
      assertField(
        Number.isFinite(row?.position_closure_residual_norm_2) &&
          row.position_closure_residual_norm_2 >= 0 &&
          row.position_closure_residual_norm_2 <= tolerances.position_closure_residual_norm_2,
        "bounded speed normal reconstruction candidate position closure residuals must be inside tolerance",
        errors
      );
      assertField(
        Number.isFinite(row?.unit_tangent_residual_abs_max) &&
          row.unit_tangent_residual_abs_max >= 0 &&
          row.unit_tangent_residual_abs_max <= tolerances.unit_tangent_residual_abs_max,
        "bounded speed normal reconstruction candidate unit tangent residuals must be inside tolerance",
        errors
      );
      assertField(
        Number.isFinite(row?.support_margin_min) && row.support_margin_min >= marginFloors.support_margin_min,
        "bounded speed normal reconstruction candidate support margins must clear the floor",
        errors
      );
      assertField(
        Number.isFinite(row?.noncollision_margin_min) &&
          row.noncollision_margin_min >= marginFloors.noncollision_margin_min,
        "bounded speed normal reconstruction candidate noncollision margins must clear the floor",
        errors
      );
      assertField(
        Number.isFinite(row?.root_persistence_margin_min) &&
          row.root_persistence_margin_min >= marginFloors.root_persistence_margin_min,
        "bounded speed normal reconstruction candidate root persistence margins must clear the floor",
        errors
      );
      assertField(
        Number.isFinite(row?.krawczyk_residual_norm_2) &&
          row.krawczyk_residual_norm_2 >= 0 &&
          row.krawczyk_residual_norm_2 <= tolerances.krawczyk_residual_norm_2,
        "bounded speed normal reconstruction candidate Krawczyk residuals must be inside tolerance",
        errors
      );
    });
  }

  return errors;
}

export function evaluateBoundedSpeedNormalReconstructionCandidate(artifact, candidatePacket) {
  const errors = boundedSpeedNormalReconstructionCandidateValidationErrors(artifact, candidatePacket);
  if (errors.length > 0) {
    throw new Error(`bounded speed normal reconstruction candidate packet failed validation: ${errors.join("; ")}`);
  }

  const handoff = artifact.normal_reconstruction_handoff;
  const receiverRows = candidatePacket.receiver_normal_candidate_rows.map((row) => ({
    receiver_label: row.receiver_label,
    normal_residual_norm_2: formatNumber(row.normal_residual_norm_2),
    tangent_holonomy_residual_norm_2: formatNumber(row.tangent_holonomy_residual_norm_2),
    position_closure_residual_norm_2: formatNumber(row.position_closure_residual_norm_2),
    unit_tangent_residual_abs_max: formatNumber(row.unit_tangent_residual_abs_max),
    support_margin_min: formatNumber(row.support_margin_min),
    noncollision_margin_min: formatNumber(row.noncollision_margin_min),
    root_persistence_margin_min: formatNumber(row.root_persistence_margin_min),
    krawczyk_residual_norm_2: formatNumber(row.krawczyk_residual_norm_2),
  }));

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_normal_reconstruction_handoff_schema: handoff.schema,
    claim_scope: "bounded-speed-normal-reconstruction-candidate",
    promotion_status: PROMOTION_STATUS,
    normal_reconstruction_candidate_id: candidatePacket.normal_reconstruction_candidate_id,
    source_artifact_id: candidatePacket.source_artifact_id,
    source_normal_handoff_id: handoff.normal_handoff_id,
    equation: "nu_i(lambda_i)^2*K_i=Gamma_B^nu*P_i^perp*F_i^nu",
    candidate_source: "supplied-same-ledger-normal-reconstruction-rows",
    bounded_speed_ledger_id: handoff.bounded_speed_ledger_id,
    force_checksum_id: handoff.force_checksum_id,
    consumer_checksum_id: handoff.consumer_checksum_id,
    row_labels: candidatePacket.row_labels,
    tolerances: {
      normal_residual_norm_2: formatNumber(candidatePacket.tolerances.normal_residual_norm_2),
      tangent_holonomy_residual_norm_2: formatNumber(
        candidatePacket.tolerances.tangent_holonomy_residual_norm_2
      ),
      position_closure_residual_norm_2: formatNumber(candidatePacket.tolerances.position_closure_residual_norm_2),
      unit_tangent_residual_abs_max: formatNumber(candidatePacket.tolerances.unit_tangent_residual_abs_max),
      krawczyk_residual_norm_2: formatNumber(candidatePacket.tolerances.krawczyk_residual_norm_2),
    },
    margin_floors: {
      support_margin_min: formatNumber(candidatePacket.margin_floors.support_margin_min),
      noncollision_margin_min: formatNumber(candidatePacket.margin_floors.noncollision_margin_min),
      root_persistence_margin_min: formatNumber(candidatePacket.margin_floors.root_persistence_margin_min),
    },
    normal_equation_status: candidatePacket.normal_equation_status,
    tangent_holonomy_status: candidatePacket.tangent_holonomy_status,
    position_closure_status: candidatePacket.position_closure_status,
    unit_tangent_status: candidatePacket.unit_tangent_status,
    support_margin_status: candidatePacket.support_margin_status,
    noncollision_status: candidatePacket.noncollision_status,
    root_persistence_status: candidatePacket.root_persistence_status,
    krawczyk_status: candidatePacket.krawczyk_status,
    receiver_normal_candidate_rows: receiverRows,
    normal_residual_norm_2_max: formatNumber(Math.max(...receiverRows.map((row) => row.normal_residual_norm_2))),
    tangent_holonomy_residual_norm_2_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.tangent_holonomy_residual_norm_2))
    ),
    position_closure_residual_norm_2_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.position_closure_residual_norm_2))
    ),
    unit_tangent_residual_abs_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.unit_tangent_residual_abs_max))
    ),
    support_margin_min: formatNumber(Math.min(...receiverRows.map((row) => row.support_margin_min))),
    noncollision_margin_min: formatNumber(Math.min(...receiverRows.map((row) => row.noncollision_margin_min))),
    root_persistence_margin_min: formatNumber(
      Math.min(...receiverRows.map((row) => row.root_persistence_margin_min))
    ),
    krawczyk_residual_norm_2_max: formatNumber(
      Math.max(...receiverRows.map((row) => row.krawczyk_residual_norm_2))
    ),
    guard_status: "bounded-speed-normal-reconstruction-rows-closed",
    candidate_status: "bounded-speed-normal-reconstruction-candidate",
    normal_reconstruction_status: "bounded-speed-normal-reconstruction-candidate",
    downstream_status: "bounded-speed-live-ledger-open",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: true,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
    status_note:
      "This packet certifies supplied bounded-speed normal reconstruction candidate rows on the same handoff ledger. It does not certify a bounded-speed live ledger, action/Noether/event/stability closure, observer export, or a retained branch.",
  };
}

export function attachBoundedSpeedNormalReconstructionCandidate(artifact, candidatePacket) {
  const candidate = evaluateBoundedSpeedNormalReconstructionCandidate(artifact, candidatePacket);
  const existingRows = artifact.residual_vector.rows.filter(
    (row) => row.row !== "R_bounded_speed_normal_reconstruction_candidate"
  );

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      emits_bounded_speed_normal_reconstruction_candidate: true,
      certifies_normal_reconstruction: true,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE correction chain is certified through clock/length return, and supplied same-ledger bounded-speed normal reconstruction rows form a candidate, but bounded-speed live-ledger retention remains open.",
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: [
        ...existingRows,
        {
          row: "R_bounded_speed_normal_reconstruction_candidate",
          status: "passed",
          value: "bounded-speed-normal-reconstruction-candidate",
        },
      ],
      first_failure_row: "bounded-speed-live-ledger-open",
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-bounded-speed-normal-reconstruction-candidate",
      bounded_speed_live_ledger: "not_built",
      correction_direction: "found_first_order_not_retained",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side, certifies the scalar speed-ODE correction chain through clock/length return, and certifies supplied bounded-speed normal reconstruction candidate rows. It does not certify a bounded-speed live ledger or retained branch.",
    },
    not_retained_reason: [
      "bounded-speed live ledger is not certified as a retained branch",
      "action, Noether, event, stability, and observer-export rows are not closed",
      "coupled fixed-point and refinement-persistence rows are not closed",
    ],
    bounded_speed_normal_reconstruction_candidate: candidate,
  };
}

function boundedSpeedLiveLedgerTargetValidationErrors(candidate, liveLedgerTarget) {
  const errors = [];

  assertField(
    isRecordObject(liveLedgerTarget),
    "action stability after normal candidate must declare bounded_speed_live_ledger target",
    errors
  );
  if (!isRecordObject(liveLedgerTarget)) {
    return errors;
  }

  assertField(
    liveLedgerTarget?.claim_scope === "bounded-speed-live-ledger-target-after-normal-candidate",
    "bounded_speed_live_ledger claim_scope must be bounded-speed-live-ledger-target-after-normal-candidate",
    errors
  );
  assertField(
    liveLedgerTarget?.source_normal_reconstruction_candidate_id === candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger source_normal_reconstruction_candidate_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerTarget?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id,
    "bounded_speed_live_ledger bounded_speed_ledger_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerTarget?.force_checksum_id === candidate?.force_checksum_id,
    "bounded_speed_live_ledger force_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerTarget?.consumer_checksum_id === candidate?.consumer_checksum_id,
    "bounded_speed_live_ledger consumer_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerTarget?.intake_status === "bounded-speed-live-ledger-open",
    "bounded_speed_live_ledger intake_status must be bounded-speed-live-ledger-open",
    errors
  );
  assertField(
    liveLedgerTarget?.first_failure_row === "bounded-speed-live-ledger-open",
    "bounded_speed_live_ledger first_failure_row must be bounded-speed-live-ledger-open",
    errors
  );
  assertField(
    liveLedgerTarget?.certifies_bounded_speed_live_ledger === false,
    "bounded_speed_live_ledger must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    liveLedgerTarget?.certifies_action_stability === false,
    "bounded_speed_live_ledger must set certifies_action_stability=false",
    errors
  );
  assertField(
    liveLedgerTarget?.certifies_observer_export === false,
    "bounded_speed_live_ledger must set certifies_observer_export=false",
    errors
  );
  assertField(
    liveLedgerTarget?.retention === "not_retained",
    "bounded_speed_live_ledger retention must be not_retained",
    errors
  );
  assertField(
    liveLedgerTarget?.retained_branch === false,
    "bounded_speed_live_ledger must set retained_branch=false",
    errors
  );

  const requiredRows = liveLedgerTarget?.required_same_ledger_rows ?? {};
  assertField(
    isRecordObject(requiredRows),
    "bounded_speed_live_ledger required_same_ledger_rows must be an object",
    errors
  );
  if (isRecordObject(requiredRows)) {
    const expectedRowNames = REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row]) => row);
    const actualRowNames = Object.keys(requiredRows);
    assertField(
      actualRowNames.length === expectedRowNames.length &&
        expectedRowNames.every((row) => Object.prototype.hasOwnProperty.call(requiredRows, row)),
      `bounded_speed_live_ledger must declare exactly required same-ledger rows: ${expectedRowNames.join(", ")}`,
      errors
    );
    for (const [row, downstreamRow] of REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS) {
      const rowTarget = requiredRows[row] ?? {};
      assertField(
        rowTarget?.downstream_row === downstreamRow,
        `bounded_speed_live_ledger row ${row} downstream_row must be ${downstreamRow}`,
        errors
      );
      assertField(
        rowTarget?.same_ledger_binding === "same-normal-candidate-ledger-checksum",
        `bounded_speed_live_ledger row ${row} must bind to the same normal-candidate ledger/checksum`,
        errors
      );
      assertField(
        rowTarget?.status === "blocked:bounded-speed-live-ledger-open",
        `bounded_speed_live_ledger row ${row} must be blocked:bounded-speed-live-ledger-open`,
        errors
      );
    }
  }

  errors.push(
    ...boundedSpeedLiveLedgerIdentityTargetValidationErrors(
      candidate,
      liveLedgerTarget?.live_ledger_identity_target
    )
  );
  errors.push(
    ...boundedSpeedActionDerivedScaleTargetValidationErrors(
      candidate,
      liveLedgerTarget?.action_derived_scale_target
    )
  );

  return errors;
}

function boundedSpeedLiveLedgerIdentityTargetValidationErrors(candidate, identityTarget) {
  const errors = [];
  const identityTuple = identityTarget?.required_identity_tuple ?? {};

  assertField(
    identityTarget?.schema === OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_TARGET_SCHEMA,
    `bounded_speed_live_ledger identity target schema must be ${OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_TARGET_SCHEMA}`,
    errors
  );
  assertField(
    identityTarget?.claim_scope === "bounded-speed-live-ledger-identity-target-after-normal-candidate",
    "bounded_speed_live_ledger identity target claim_scope must be bounded-speed-live-ledger-identity-target-after-normal-candidate",
    errors
  );
  assertField(
    identityTarget?.promotion_status === PROMOTION_STATUS,
    `bounded_speed_live_ledger identity target promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    identityTarget?.status === "target-only",
    "bounded_speed_live_ledger identity target status must be target-only",
    errors
  );
  assertField(
    identityTarget?.source_normal_reconstruction_candidate_id === candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger identity target source_normal_reconstruction_candidate_id must match the normal candidate",
    errors
  );
  assertField(
    identityTarget?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id,
    "bounded_speed_live_ledger identity target bounded_speed_ledger_id must match the normal candidate",
    errors
  );
  assertField(
    identityTarget?.force_checksum_id === candidate?.force_checksum_id,
    "bounded_speed_live_ledger identity target force_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    identityTarget?.consumer_checksum_id === candidate?.consumer_checksum_id,
    "bounded_speed_live_ledger identity target consumer_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    identityTuple?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
      identityTuple?.force_checksum_id === candidate?.force_checksum_id &&
      identityTuple?.consumer_checksum_id === candidate?.consumer_checksum_id &&
      identityTuple?.source_normal_reconstruction_candidate_id ===
        candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger identity target required_identity_tuple must match the normal candidate ledger tuple",
    errors
  );
  assertField(
    sameStringArray(
      identityTarget?.required_closed_rows,
      REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_ROWS
    ),
    "bounded_speed_live_ledger identity target required_closed_rows must declare the normal candidate plus every downstream live-ledger row",
    errors
  );
  assertField(
    sameStringArray(
      identityTarget?.closed_rows_supplied_by_current_packet,
      CURRENT_PACKET_LIVE_LEDGER_CLOSED_ROWS
    ),
    "bounded_speed_live_ledger identity target closed_rows_supplied_by_current_packet must contain only the normal candidate row",
    errors
  );
  assertField(
    sameStringArray(identityTarget?.missing_closed_rows, MISSING_LIVE_LEDGER_CLOSED_ROWS),
    "bounded_speed_live_ledger identity target missing_closed_rows must list every downstream live-ledger row",
    errors
  );
  assertField(
    identityTarget?.first_missing_closed_row === MISSING_LIVE_LEDGER_CLOSED_ROWS[0],
    "bounded_speed_live_ledger identity target first_missing_closed_row must be action_derived_scale",
    errors
  );
  assertField(
    identityTarget?.negative_control_status ===
      "same-ledger-id-tuple-without-closed-downstream-rows-not-live-ledger",
    "bounded_speed_live_ledger identity target negative_control_status must reject tuple-only live-ledger certification",
    errors
  );
  assertField(
    identityTarget?.certifies_bounded_speed_live_ledger === false,
    "bounded_speed_live_ledger identity target must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    identityTarget?.retention === "not_retained",
    "bounded_speed_live_ledger identity target retention must be not_retained",
    errors
  );
  assertField(
    identityTarget?.retained_branch === false,
    "bounded_speed_live_ledger identity target must set retained_branch=false",
    errors
  );

  return errors;
}

function boundedSpeedActionMeasureRowTargetValidationErrors(candidate, actionMeasureTarget) {
  const errors = [];
  const identityTuple = actionMeasureTarget?.required_identity_tuple ?? {};

  assertField(
    isRecordObject(actionMeasureTarget),
    "bounded_speed_live_ledger action_derived_scale_target must declare action_measure_row_target",
    errors
  );
  if (!isRecordObject(actionMeasureTarget)) {
    return errors;
  }

  assertField(
    actionMeasureTarget?.schema === OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA,
    `bounded_speed_live_ledger action_measure_row_target schema must be ${OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA}`,
    errors
  );
  assertField(
    actionMeasureTarget?.claim_scope === "bounded-speed-action-measure-row-target-after-normal-candidate",
    "bounded_speed_live_ledger action_measure_row_target claim_scope must be bounded-speed-action-measure-row-target-after-normal-candidate",
    errors
  );
  assertField(
    actionMeasureTarget?.promotion_status === PROMOTION_STATUS,
    `bounded_speed_live_ledger action_measure_row_target promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    actionMeasureTarget?.status === "target-only",
    "bounded_speed_live_ledger action_measure_row_target status must be target-only",
    errors
  );
  assertField(
    actionMeasureTarget?.row === "action_measure_row",
    "bounded_speed_live_ledger action_measure_row_target row must be action_measure_row",
    errors
  );
  assertField(
    actionMeasureTarget?.source_action_derived_scale_row === "action_derived_scale",
    "bounded_speed_live_ledger action_measure_row_target source_action_derived_scale_row must be action_derived_scale",
    errors
  );
  assertField(
    actionMeasureTarget?.source_normal_reconstruction_candidate_id ===
      candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger action_measure_row_target source_normal_reconstruction_candidate_id must match the normal candidate",
    errors
  );
  assertField(
    actionMeasureTarget?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id,
    "bounded_speed_live_ledger action_measure_row_target bounded_speed_ledger_id must match the normal candidate",
    errors
  );
  assertField(
    actionMeasureTarget?.force_checksum_id === candidate?.force_checksum_id,
    "bounded_speed_live_ledger action_measure_row_target force_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    actionMeasureTarget?.consumer_checksum_id === candidate?.consumer_checksum_id,
    "bounded_speed_live_ledger action_measure_row_target consumer_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    identityTuple?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
      identityTuple?.force_checksum_id === candidate?.force_checksum_id &&
      identityTuple?.consumer_checksum_id === candidate?.consumer_checksum_id &&
      identityTuple?.source_normal_reconstruction_candidate_id ===
        candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger action_measure_row_target required_identity_tuple must match the normal candidate ledger tuple",
    errors
  );
  assertField(
    sameStringArray(
      actionMeasureTarget?.required_variables,
      ACTION_MEASURE_ROW_TARGET_REQUIRED_VARIABLES
    ),
    "bounded_speed_live_ledger action_measure_row_target required_variables must list the action-measure variables",
    errors
  );
  assertField(
    sameStringArray(
      actionMeasureTarget?.required_measure_fields,
      ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS
    ),
    "bounded_speed_live_ledger action_measure_row_target required_measure_fields must list the action-measure fields",
    errors
  );
  assertField(
    sameStringArray(
      actionMeasureTarget?.current_fixture_supplied_measure_fields,
      CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS
    ),
    "bounded_speed_live_ledger action_measure_row_target current_fixture_supplied_measure_fields must contain only the identity tuple",
    errors
  );
  assertField(
    sameStringArray(
      actionMeasureTarget?.missing_measure_fields,
      MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS
    ),
    "bounded_speed_live_ledger action_measure_row_target missing_measure_fields must list the missing action-measure fields",
    errors
  );
  assertField(
    actionMeasureTarget?.first_missing_measure_field ===
      MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS[0],
    "bounded_speed_live_ledger action_measure_row_target first_missing_measure_field must be branch_scope",
    errors
  );
  assertField(
    actionMeasureTarget?.negative_control_status ===
      "same-ledger-tuple-without-action-functional-not-action-measure-row",
    "bounded_speed_live_ledger action_measure_row_target negative_control_status must reject tuple-only action-measure certification",
    errors
  );
  assertField(
    actionMeasureTarget?.rejected_current_fixture === true,
    "bounded_speed_live_ledger action_measure_row_target must reject the current fixture",
    errors
  );
  errors.push(
    ...actionMeasureBranchScopeSourceAuditValidationErrors(
      candidate,
      actionMeasureTarget?.branch_scope_source_audit
    )
  );
  errors.push(
    ...sameLedgerActionMeasureWithBranchScopeAttemptValidationErrors(
      candidate,
      actionMeasureTarget
    )
  );
  assertField(
    actionMeasureTarget?.certifies_action_measure_row === false,
    "bounded_speed_live_ledger action_measure_row_target must set certifies_action_measure_row=false",
    errors
  );
  assertField(
    actionMeasureTarget?.certifies_action_derived_scale === false,
    "bounded_speed_live_ledger action_measure_row_target must set certifies_action_derived_scale=false",
    errors
  );
  assertField(
    actionMeasureTarget?.certifies_bounded_speed_live_ledger === false,
    "bounded_speed_live_ledger action_measure_row_target must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    actionMeasureTarget?.certifies_action_stability === false,
    "bounded_speed_live_ledger action_measure_row_target must set certifies_action_stability=false",
    errors
  );
  assertField(
    actionMeasureTarget?.certifies_observer_export === false,
    "bounded_speed_live_ledger action_measure_row_target must set certifies_observer_export=false",
    errors
  );
  assertField(
    actionMeasureTarget?.retention === "not_retained",
    "bounded_speed_live_ledger action_measure_row_target retention must be not_retained",
    errors
  );
  assertField(
    actionMeasureTarget?.retained_branch === false,
    "bounded_speed_live_ledger action_measure_row_target must set retained_branch=false",
    errors
  );

  return errors;
}

function actionMeasureBranchScopeSourceAuditValidationErrors(candidate, sourceAudit) {
  const errors = [];
  const identityTuple = sourceAudit?.required_identity_tuple ?? {};
  const candidateSources = sourceAudit?.candidate_branch_scope_sources ?? [];
  const nearestLineage = sourceAudit?.nearest_candidate_lineage_readout ?? {};
  const closestRejectedSource = nearestLineage?.closest_rejected_branch_scope_source ?? {};
  const searchBasis = sourceAudit?.search_basis ?? {};
  const acceptanceCriteria = sourceAudit?.acceptance_criteria ?? {};

  assertField(
    isRecordObject(sourceAudit),
    "bounded_speed_live_ledger action_measure_row_target must declare branch_scope_source_audit",
    errors
  );
  if (!isRecordObject(sourceAudit)) {
    return errors;
  }
  assertField(
    sourceAudit?.schema === OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA,
    `bounded_speed_live_ledger branch_scope_source_audit schema must be ${OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA}`,
    errors
  );
  assertField(
    sourceAudit?.claim_scope === "bounded-speed-action-measure-branch-scope-source-audit-after-normal-candidate",
    "bounded_speed_live_ledger branch_scope_source_audit claim_scope must be bounded-speed-action-measure-branch-scope-source-audit-after-normal-candidate",
    errors
  );
  assertField(
    sourceAudit?.promotion_status === PROMOTION_STATUS,
    `bounded_speed_live_ledger branch_scope_source_audit promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    sourceAudit?.status === "no-same-ledger-branch-scope-source",
    "bounded_speed_live_ledger branch_scope_source_audit status must be no-same-ledger-branch-scope-source",
    errors
  );
  assertField(
    sourceAudit?.audited_measure_field === "branch_scope",
    "bounded_speed_live_ledger branch_scope_source_audit audited_measure_field must be branch_scope",
    errors
  );
  assertField(
    sourceAudit?.source_action_measure_row === "action_measure_row",
    "bounded_speed_live_ledger branch_scope_source_audit source_action_measure_row must be action_measure_row",
    errors
  );
  assertField(
    identityTuple?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
      identityTuple?.force_checksum_id === candidate?.force_checksum_id &&
      identityTuple?.consumer_checksum_id === candidate?.consumer_checksum_id &&
      identityTuple?.source_normal_reconstruction_candidate_id ===
        candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger branch_scope_source_audit required_identity_tuple must match the normal candidate ledger tuple",
    errors
  );
  assertField(
    isRecordObject(searchBasis),
    "bounded_speed_live_ledger branch_scope_source_audit must declare search_basis",
    errors
  );
  if (isRecordObject(searchBasis)) {
    assertField(
      sameStringArray(searchBasis.searched_roots, ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_ROOTS),
      "bounded_speed_live_ledger branch_scope_source_audit searched_roots mismatch",
      errors
    );
    assertField(
      sameStringArray(searchBasis.searched_terms, ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_TERMS),
      "bounded_speed_live_ledger branch_scope_source_audit searched_terms mismatch",
      errors
    );
    assertField(
      searchBasis.result === ACTION_MEASURE_BRANCH_SCOPE_AUDIT_RESULT,
      "bounded_speed_live_ledger branch_scope_source_audit search result mismatch",
      errors
    );
  }
  assertField(
    isRecordObject(acceptanceCriteria),
    "bounded_speed_live_ledger branch_scope_source_audit must declare acceptance_criteria",
    errors
  );
  if (isRecordObject(acceptanceCriteria)) {
    const criteriaTuple = acceptanceCriteria.required_identity_tuple ?? {};
    assertField(
      criteriaTuple.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
        criteriaTuple.force_checksum_id === candidate?.force_checksum_id &&
        criteriaTuple.consumer_checksum_id === candidate?.consumer_checksum_id &&
        criteriaTuple.source_normal_reconstruction_candidate_id ===
          candidate?.normal_reconstruction_candidate_id,
      "bounded_speed_live_ledger branch_scope_source_audit acceptance_criteria identity tuple must match",
      errors
    );
    assertField(
      sameStringArray(
        acceptanceCriteria.required_same_ledger_fields,
        ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS
      ),
      "bounded_speed_live_ledger branch_scope_source_audit acceptance same-ledger fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        acceptanceCriteria.required_action_measure_fields,
        ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS
      ),
      "bounded_speed_live_ledger branch_scope_source_audit acceptance action-measure fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        acceptanceCriteria.required_acceptance_bindings,
        ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS
      ),
      "bounded_speed_live_ledger branch_scope_source_audit acceptance bindings mismatch",
      errors
    );
  }
  assertField(
    sourceAudit?.candidate_count === ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES.length,
    "bounded_speed_live_ledger branch_scope_source_audit candidate_count must cover all audited sources",
    errors
  );
  assertField(
    sourceAudit?.accepted_count === 0,
    "bounded_speed_live_ledger branch_scope_source_audit accepted_count must be zero",
    errors
  );
  assertField(
    sourceAudit?.accepted_branch_scope_source === null,
    "bounded_speed_live_ledger branch_scope_source_audit accepted_branch_scope_source must be null",
    errors
  );
  assertField(
    sourceAudit?.first_failure === ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
    "bounded_speed_live_ledger branch_scope_source_audit first_failure must be same_ledger_branch_scope_source_missing",
    errors
  );
  assertField(
    sourceAudit?.negative_control_status === ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_NEGATIVE_CONTROL,
    "bounded_speed_live_ledger branch_scope_source_audit negative_control_status must reject off-ledger branch scopes",
    errors
  );
  assertField(
    isRecordObject(nearestLineage),
    "bounded_speed_live_ledger branch_scope_source_audit must declare nearest_candidate_lineage_readout",
    errors
  );
  if (isRecordObject(nearestLineage)) {
    assertField(
      nearestLineage.status === "fail-closed-nearest-candidate-lineage",
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout status must be fail-closed",
      errors
    );
    assertField(
      nearestLineage.readiness_status === ACTION_MEASURE_BRANCH_SCOPE_NEAREST_READINESS_STATUS,
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout readiness_status mismatch",
      errors
    );
    assertField(
      isRecordObject(closestRejectedSource),
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout must name closest_rejected_branch_scope_source",
      errors
    );
    assertField(
      closestRejectedSource.source_path === ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.source_path &&
        closestRejectedSource.artifact_schema === ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.artifact_schema &&
        closestRejectedSource.artifact_id === ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.artifact_id &&
        closestRejectedSource.branch_scope_role ===
          ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.branch_scope_role &&
        closestRejectedSource.first_rejection_code ===
          ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.first_rejection_code,
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout closest source must be the fixed-speed root ledger rejection",
      errors
    );
    assertField(
      sameStringArray(nearestLineage.present_fields, ACTION_MEASURE_BRANCH_SCOPE_NEAREST_PRESENT_FIELDS),
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout present_fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        nearestLineage.missing_same_ledger_fields,
        ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS
      ),
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout missing_same_ledger_fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        nearestLineage.missing_action_measure_fields,
        ACTION_MEASURE_BRANCH_SCOPE_NEAREST_MISSING_ACTION_MEASURE_FIELDS
      ),
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout missing_action_measure_fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        nearestLineage.required_acceptance_bindings,
        ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS
      ),
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout required_acceptance_bindings mismatch",
      errors
    );
    assertField(
      nearestLineage.smallest_next_evidence_object ===
        ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
      "bounded_speed_live_ledger branch_scope_source_audit nearest_candidate_lineage_readout smallest_next_evidence_object mismatch",
      errors
    );
  }
  assertField(
    Array.isArray(candidateSources) &&
      candidateSources.length === ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES.length,
    "bounded_speed_live_ledger branch_scope_source_audit must list every candidate branch-scope source",
    errors
  );
  if (Array.isArray(candidateSources)) {
    for (const expected of ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES) {
      const row = candidateSources.find((candidateRow) => candidateRow?.source_path === expected.source_path);
      assertField(Boolean(row), `branch_scope_source_audit missing source ${expected.source_path}`, errors);
      if (!row) {
        continue;
      }
      assertField(row.artifact_schema === expected.artifact_schema, `${expected.source_path} artifact_schema mismatch`, errors);
      assertField(row.artifact_id === expected.artifact_id, `${expected.source_path} artifact_id mismatch`, errors);
      assertField(row.branch_scope_status === "present", `${expected.source_path} branch_scope_status must be present`, errors);
      assertField(
        sameStringArray(row.observed_fields, ["branch_scope"]),
        `${expected.source_path} observed_fields must record only branch_scope`,
        errors
      );
      assertField(
        row.action_measure_row_status === "absent",
        `${expected.source_path} action_measure_row_status must be absent`,
        errors
      );
      assertField(
        row.same_ledger_tuple_match === false,
        `${expected.source_path} same_ledger_tuple_match must be false`,
        errors
      );
      assertField(
        row.accepted_for_action_measure_branch_scope === false,
        `${expected.source_path} must not be accepted for action_measure_row branch_scope`,
        errors
      );
      assertField(
        row.first_rejection_code === expected.first_rejection_code,
        `${expected.source_path} first_rejection_code mismatch`,
        errors
      );
      const observedIdentity = row.observed_identity_fields ?? {};
      assertField(
        observedIdentity.bounded_speed_ledger_id === null &&
          observedIdentity.force_checksum_id === null &&
          observedIdentity.consumer_checksum_id === null &&
          observedIdentity.source_normal_reconstruction_candidate_id === null,
        `${expected.source_path} observed_identity_fields must not claim the bounded-speed live-ledger tuple`,
        errors
      );
      assertField(
        sameStringArray(
          row.missing_required_identity_fields,
          ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS
        ),
        `${expected.source_path} missing_required_identity_fields mismatch`,
        errors
      );
      assertField(
        sameStringArray(row.missing_action_measure_fields, ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS),
        `${expected.source_path} missing_action_measure_fields mismatch`,
        errors
      );
      assertField(
        JSON.stringify(row.action_measure_field_statuses) ===
          JSON.stringify(ACTION_MEASURE_BRANCH_SCOPE_CANDIDATE_FIELD_STATUSES),
        `${expected.source_path} action_measure_field_statuses mismatch`,
        errors
      );
      assertField(
        row.rejection_summary ===
          "branch_scope provenance is present, but no same-ledger identity tuple or action_measure_row binds it to the bounded-speed normal-candidate ledger",
        `${expected.source_path} rejection_summary mismatch`,
        errors
      );
    }
  }

  return errors;
}

function sameLedgerActionMeasureWithBranchScopeAttemptValidationErrors(candidate, actionMeasureTarget) {
  const errors = [];
  const attempt = actionMeasureTarget?.same_ledger_action_measure_row_with_branch_scope_attempt ?? {};
  const identityTuple = attempt?.required_identity_tuple ?? {};
  const rowTarget = attempt?.fail_closed_action_measure_row_target ?? {};
  const periodRowsTarget = attempt?.period_rows_target ?? {};
  const rank5ProducerTarget =
    attempt?.rank5_retained_branch_closure_producer_target ?? {};

  assertField(
    isRecordObject(attempt),
    "bounded_speed_live_ledger action_measure_row_target must declare same_ledger_action_measure_row_with_branch_scope_attempt",
    errors
  );
  if (!isRecordObject(attempt)) {
    return errors;
  }
  assertField(
    attempt?.schema === OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA,
    `bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt schema must be ${OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA}`,
    errors
  );
  assertField(
    attempt?.claim_scope ===
      "bounded-speed-same-ledger-action-measure-row-with-branch-scope-attempt-after-normal-candidate",
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt claim_scope mismatch",
    errors
  );
  assertField(
    attempt?.promotion_status === PROMOTION_STATUS,
    `bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    attempt?.status === "fail-closed-target",
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt status must be fail-closed-target",
    errors
  );
  assertField(
    attempt?.attempted_evidence_object === ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt attempted_evidence_object mismatch",
    errors
  );
  assertField(
    attempt?.source_action_measure_row_target === "action_measure_row",
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must target action_measure_row",
    errors
  );
  assertField(
    identityTuple?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
      identityTuple?.force_checksum_id === candidate?.force_checksum_id &&
      identityTuple?.consumer_checksum_id === candidate?.consumer_checksum_id &&
      identityTuple?.source_normal_reconstruction_candidate_id ===
        candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt required_identity_tuple must match the normal candidate ledger tuple",
    errors
  );
  assertField(
    sameStringArray(
      attempt?.current_fixture_supplied_measure_fields,
      CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS
    ),
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt current fixture fields mismatch",
    errors
  );
  assertField(
    sameStringArray(attempt?.attempted_measure_fields, ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_FIELDS),
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt attempted fields mismatch",
    errors
  );
  assertField(
    sameStringArray(
      attempt?.missing_measure_fields_if_branch_scope_bound,
      ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS
    ),
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt missing fields after branch_scope mismatch",
    errors
  );
  assertField(
    attempt?.branch_scope_binding_status === "not_accepted",
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt branch_scope_binding_status must be not_accepted",
    errors
  );
  assertField(
    attempt?.branch_scope_source_audit_first_failure ===
      ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must cite branch_scope source-audit first failure",
    errors
  );
  assertField(
    attempt?.first_missing_subfield_after_branch_scope ===
      ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS[0],
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt first_missing_subfield_after_branch_scope must be period_rows",
    errors
  );
  assertField(
    attempt?.constructed_action_measure_row === null,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must not construct an action_measure_row",
    errors
  );
  assertField(
    isRecordObject(rowTarget),
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must declare fail_closed_action_measure_row_target",
    errors
  );
  if (isRecordObject(rowTarget)) {
    assertField(
      rowTarget?.row === "action_measure_row",
      "bounded_speed_live_ledger fail_closed_action_measure_row_target row must be action_measure_row",
      errors
    );
    assertField(
      rowTarget?.status === "absent-fail-closed",
      "bounded_speed_live_ledger fail_closed_action_measure_row_target status must be absent-fail-closed",
      errors
    );
    assertField(
      rowTarget?.candidate_row_status === "not_constructed",
      "bounded_speed_live_ledger fail_closed_action_measure_row_target candidate row status must be not_constructed",
      errors
    );
    assertField(
      rowTarget?.accepted_row_status === "absent",
      "bounded_speed_live_ledger fail_closed_action_measure_row_target accepted row status must be absent",
      errors
    );
    assertField(
      sameStringArray(
        rowTarget?.required_row_fields,
        ACTION_MEASURE_ROW_CANDIDATE_REQUIRED_FIELDS
      ),
      "bounded_speed_live_ledger fail_closed_action_measure_row_target required row fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        rowTarget?.supplied_fields_on_normal_candidate_ledger,
        CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS
      ),
      "bounded_speed_live_ledger fail_closed_action_measure_row_target supplied fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        rowTarget?.missing_fields_on_normal_candidate_ledger,
        MISSING_ACTION_MEASURE_ROW_CANDIDATE_FIELDS
      ),
      "bounded_speed_live_ledger fail_closed_action_measure_row_target missing fields mismatch",
      errors
    );
    assertField(
      rowTarget?.first_blocker === ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
      "bounded_speed_live_ledger fail_closed_action_measure_row_target first blocker must cite branch_scope",
      errors
    );
    assertField(
      JSON.stringify(rowTarget?.field_statuses_on_normal_candidate_ledger) ===
        JSON.stringify(ACTION_MEASURE_ROW_CANDIDATE_FIELD_STATUS_ROWS),
      "bounded_speed_live_ledger fail_closed_action_measure_row_target field statuses mismatch",
      errors
    );
    assertField(
      Array.isArray(rowTarget?.missing_same_ledger_bindings) &&
        rowTarget.missing_same_ledger_bindings.length ===
          ACTION_MEASURE_ROW_MISSING_SAME_LEDGER_BINDINGS.length,
      "bounded_speed_live_ledger fail_closed_action_measure_row_target missing bindings length mismatch",
      errors
    );
    if (Array.isArray(rowTarget?.missing_same_ledger_bindings)) {
      for (const expected of ACTION_MEASURE_ROW_MISSING_SAME_LEDGER_BINDINGS) {
        const actual = rowTarget.missing_same_ledger_bindings.find(
          (binding) => binding?.field === expected.field
        );
        assertField(
          actual?.required_binding === expected.required_binding &&
            actual?.blocker === expected.blocker,
          `bounded_speed_live_ledger fail_closed_action_measure_row_target missing binding ${expected.field} mismatch`,
          errors
        );
      }
    }
    assertField(
      rowTarget?.certifies_action_measure_row === false,
      "bounded_speed_live_ledger fail_closed_action_measure_row_target must not certify action_measure_row",
      errors
    );
    assertField(
      rowTarget?.retention === "not_retained" && rowTarget?.retained_branch === false,
      "bounded_speed_live_ledger fail_closed_action_measure_row_target must not retain a branch",
      errors
    );
  }
  assertField(
    isRecordObject(periodRowsTarget),
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must declare period_rows_target",
    errors
  );
  if (isRecordObject(periodRowsTarget)) {
    assertField(
      periodRowsTarget?.field === "period_rows",
      "bounded_speed_live_ledger period_rows_target field must be period_rows",
      errors
    );
    assertField(
      periodRowsTarget?.status === "target-only-blocked-by-branch-scope",
      "bounded_speed_live_ledger period_rows_target status must be target-only-blocked-by-branch-scope",
      errors
    );
    assertField(
      periodRowsTarget?.source_action_measure_row === "action_measure_row",
      "bounded_speed_live_ledger period_rows_target source_action_measure_row must be action_measure_row",
      errors
    );
    assertField(
      periodRowsTarget?.blocking_failure === ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
      "bounded_speed_live_ledger period_rows_target blocking_failure must cite the branch_scope first failure",
      errors
    );
    assertField(
      periodRowsTarget?.first_failure ===
        ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_FIRST_FAILURE,
      "bounded_speed_live_ledger period_rows_target first_failure must be same_ledger_period_rows_source_missing",
      errors
    );
    assertField(
      periodRowsTarget?.accepted_period_rows_source === null,
      "bounded_speed_live_ledger period_rows_target accepted_period_rows_source must be null",
      errors
    );
    assertField(
      periodRowsTarget?.candidate_count === 0,
      "bounded_speed_live_ledger period_rows_target candidate_count must be zero",
      errors
    );
    assertField(
      periodRowsTarget?.negative_control_status ===
        ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_NEGATIVE_CONTROL,
      "bounded_speed_live_ledger period_rows_target negative_control_status mismatch",
      errors
    );
    assertField(
      periodRowsTarget?.smallest_next_evidence_object ===
        ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_SMALLEST_NEXT_EVIDENCE_OBJECT,
      "bounded_speed_live_ledger period_rows_target smallest_next_evidence_object mismatch",
      errors
    );
  }
  assertField(
    isRecordObject(rank5ProducerTarget),
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must declare rank5_retained_branch_closure_producer_target",
    errors
  );
  if (isRecordObject(rank5ProducerTarget)) {
    assertField(
      rank5ProducerTarget?.schema ===
        OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA,
      `bounded_speed_live_ledger rank5_retained_branch_closure_producer_target schema must be ${OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA}`,
      errors
    );
    assertField(
      rank5ProducerTarget?.claim_scope ===
        "rank5-retained-branch-action-measure-producer-target-after-normal-candidate",
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target claim_scope mismatch",
      errors
    );
    assertField(
      rank5ProducerTarget?.promotion_status === PROMOTION_STATUS,
      `bounded_speed_live_ledger rank5_retained_branch_closure_producer_target promotion_status must be ${PROMOTION_STATUS}`,
      errors
    );
    assertField(
      rank5ProducerTarget?.top_six_rank === 5 &&
        rank5ProducerTarget?.closure_route === "bounded-speed-live-ledger" &&
        rank5ProducerTarget?.source_after_normal_packet ===
          "bounded-speed-normal-reconstruction-candidate",
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target route metadata mismatch",
      errors
    );
    assertField(
      rank5ProducerTarget?.source_normal_reconstruction_candidate_id ===
        candidate?.normal_reconstruction_candidate_id &&
        rank5ProducerTarget?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
        rank5ProducerTarget?.force_checksum_id === candidate?.force_checksum_id &&
        rank5ProducerTarget?.consumer_checksum_id === candidate?.consumer_checksum_id,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target ledger ids must match the normal candidate",
      errors
    );
    assertField(
      rank5ProducerTarget?.required_identity_tuple?.bounded_speed_ledger_id ===
        candidate?.bounded_speed_ledger_id &&
        rank5ProducerTarget?.required_identity_tuple?.force_checksum_id ===
          candidate?.force_checksum_id &&
        rank5ProducerTarget?.required_identity_tuple?.consumer_checksum_id ===
          candidate?.consumer_checksum_id &&
        rank5ProducerTarget?.required_identity_tuple
          ?.source_normal_reconstruction_candidate_id ===
          candidate?.normal_reconstruction_candidate_id,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target required_identity_tuple must match the normal candidate ledger tuple",
      errors
    );
    assertField(
      rank5ProducerTarget?.attempted_evidence_object ===
        ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target attempted_evidence_object mismatch",
      errors
    );
    assertField(
      sameStringArray(
        rank5ProducerTarget?.required_producer_fields,
        RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REQUIRED_FIELDS
      ),
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target required producer fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        rank5ProducerTarget?.supplied_fields_on_normal_candidate_ledger,
        CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS
      ),
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target supplied fields mismatch",
      errors
    );
    assertField(
      sameStringArray(
        rank5ProducerTarget?.missing_producer_fields,
        MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS
      ),
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target missing producer fields mismatch",
      errors
    );
    assertField(
      rank5ProducerTarget?.first_missing_producer_field ===
        MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS[0] &&
        rank5ProducerTarget?.first_blocker ===
          ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target first blocker mismatch",
      errors
    );
    assertField(
      sameStringArray(
        rank5ProducerTarget?.rejected_evidence_kinds,
        RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE
      ),
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target rejected evidence list mismatch",
      errors
    );
    assertField(
      rank5ProducerTarget?.nearest_rejected_source?.source_path ===
        ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.source_path &&
        rank5ProducerTarget?.nearest_rejected_source?.artifact_schema ===
          ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.artifact_schema &&
        rank5ProducerTarget?.nearest_rejected_source?.artifact_id ===
          ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.artifact_id &&
        rank5ProducerTarget?.nearest_rejected_source?.first_rejection_code ===
          ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE.first_rejection_code,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target nearest rejected source mismatch",
      errors
    );
    const finiteModeProducerTarget =
      rank5ProducerTarget?.finite_mode_solver_action_measure_row_producer_target ?? {};
    assertField(
      isRecordObject(finiteModeProducerTarget),
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target must declare finite_mode_solver_action_measure_row_producer_target",
      errors
    );
    if (isRecordObject(finiteModeProducerTarget)) {
      assertField(
        finiteModeProducerTarget?.schema ===
          OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA,
        `bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target schema must be ${OCTAHEDRAL_ZERO_MEAN_FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_TARGET_SCHEMA}`,
        errors
      );
      assertField(
        finiteModeProducerTarget?.target_status === "producer_target_blocked" &&
          finiteModeProducerTarget?.expected_source_object ===
            "bounded-speed-factor-finite-mode-solver-artifact-with-action-measure-row",
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target source target mismatch",
        errors
      );
      assertField(
        finiteModeProducerTarget?.required_identity_tuple?.bounded_speed_ledger_id ===
          candidate?.bounded_speed_ledger_id &&
          finiteModeProducerTarget?.required_identity_tuple?.force_checksum_id ===
            candidate?.force_checksum_id &&
          finiteModeProducerTarget?.required_identity_tuple?.consumer_checksum_id ===
            candidate?.consumer_checksum_id &&
          finiteModeProducerTarget?.required_identity_tuple
            ?.source_normal_reconstruction_candidate_id ===
            candidate?.normal_reconstruction_candidate_id,
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target identity tuple mismatch",
        errors
      );
      assertField(
        sameStringArray(
          finiteModeProducerTarget?.required_same_ledger_row_fields,
          FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS
        ),
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target required fields mismatch",
        errors
      );
      assertField(
        sameStringArray(
          finiteModeProducerTarget?.supplied_fields_on_normal_candidate_ledger,
          CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS
        ),
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target supplied fields mismatch",
        errors
      );
      assertField(
        sameStringArray(
          finiteModeProducerTarget?.missing_same_ledger_row_fields,
          FINITE_MODE_ACTION_MEASURE_ROW_PRODUCER_REQUIRED_FIELDS.filter(
            (field) => !CURRENT_ACTION_MEASURE_ROW_CANDIDATE_SUPPLIED_FIELDS.includes(field)
          )
        ),
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target missing fields mismatch",
        errors
      );
      assertField(
        finiteModeProducerTarget?.first_missing_same_ledger_field === "branch_scope" &&
          finiteModeProducerTarget?.first_blocker ===
            ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target first blocker mismatch",
        errors
      );
      assertField(
        sameStringArray(
          finiteModeProducerTarget?.negative_controls,
          RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE
        ),
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target negative controls mismatch",
        errors
      );
      assertField(
        finiteModeProducerTarget?.accepted_same_ledger_action_measure_row === null &&
          finiteModeProducerTarget?.authorizes_rank5_retention === false &&
          finiteModeProducerTarget?.certifies_action_measure_row === false &&
          finiteModeProducerTarget?.certifies_bounded_speed_live_ledger === false,
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target must remain non-authorizing",
        errors
      );
      assertField(
        finiteModeProducerTarget?.retention === "not_retained" &&
          finiteModeProducerTarget?.retained_branch === false,
        "bounded_speed_live_ledger finite_mode_solver_action_measure_row_producer_target must not retain a branch",
        errors
      );
    }
    assertField(
      rank5ProducerTarget?.negative_control_status ===
        "same-ledger-tuple-without-branch-scope-action-measure-not-rank5-retained-branch",
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target negative_control_status mismatch",
      errors
    );
    assertField(
      rank5ProducerTarget?.accepted_same_ledger_action_measure_row === null,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target must not accept an action_measure_row",
      errors
    );
    assertField(
      rank5ProducerTarget?.certifies_action_measure_row === false &&
        rank5ProducerTarget?.certifies_rank5_retained_branch_closure === false &&
        rank5ProducerTarget?.certifies_bounded_speed_live_ledger === false,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target must remain non-certifying",
      errors
    );
    assertField(
      rank5ProducerTarget?.retention === "not_retained" &&
        rank5ProducerTarget?.retained_branch === false,
      "bounded_speed_live_ledger rank5_retained_branch_closure_producer_target must not retain a branch",
      errors
    );
  }
  assertField(
    attempt?.certifies_action_measure_row === false,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must set certifies_action_measure_row=false",
    errors
  );
  assertField(
    attempt?.certifies_action_derived_scale === false,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must set certifies_action_derived_scale=false",
    errors
  );
  assertField(
    attempt?.certifies_bounded_speed_live_ledger === false,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    attempt?.retention === "not_retained" && attempt?.retained_branch === false,
    "bounded_speed_live_ledger action_measure_row_with_branch_scope_attempt must not retain a branch",
    errors
  );

  return errors;
}

function buildActionMeasureBranchScopeNearestCandidateLineageReadout() {
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

function boundedSpeedActionDerivedScaleTargetValidationErrors(candidate, actionScaleTarget) {
  const errors = [];
  const identityTuple = actionScaleTarget?.required_identity_tuple ?? {};

  assertField(
    isRecordObject(actionScaleTarget),
    "bounded_speed_live_ledger must declare action_derived_scale_target",
    errors
  );
  if (!isRecordObject(actionScaleTarget)) {
    return errors;
  }

  assertField(
    actionScaleTarget?.schema === OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA,
    `bounded_speed_live_ledger action_derived_scale_target schema must be ${OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA}`,
    errors
  );
  assertField(
    actionScaleTarget?.claim_scope === "bounded-speed-action-derived-scale-target-after-normal-candidate",
    "bounded_speed_live_ledger action_derived_scale_target claim_scope must be bounded-speed-action-derived-scale-target-after-normal-candidate",
    errors
  );
  assertField(
    actionScaleTarget?.promotion_status === PROMOTION_STATUS,
    `bounded_speed_live_ledger action_derived_scale_target promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    actionScaleTarget?.status === "target-only",
    "bounded_speed_live_ledger action_derived_scale_target status must be target-only",
    errors
  );
  assertField(
    actionScaleTarget?.row === "action_derived_scale",
    "bounded_speed_live_ledger action_derived_scale_target row must be action_derived_scale",
    errors
  );
  assertField(
    actionScaleTarget?.downstream_row === "action_scale",
    "bounded_speed_live_ledger action_derived_scale_target downstream_row must be action_scale",
    errors
  );
  assertField(
    actionScaleTarget?.source_normal_reconstruction_candidate_id ===
      candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger action_derived_scale_target source_normal_reconstruction_candidate_id must match the normal candidate",
    errors
  );
  assertField(
    actionScaleTarget?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id,
    "bounded_speed_live_ledger action_derived_scale_target bounded_speed_ledger_id must match the normal candidate",
    errors
  );
  assertField(
    actionScaleTarget?.force_checksum_id === candidate?.force_checksum_id,
    "bounded_speed_live_ledger action_derived_scale_target force_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    actionScaleTarget?.consumer_checksum_id === candidate?.consumer_checksum_id,
    "bounded_speed_live_ledger action_derived_scale_target consumer_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    identityTuple?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id &&
      identityTuple?.force_checksum_id === candidate?.force_checksum_id &&
      identityTuple?.consumer_checksum_id === candidate?.consumer_checksum_id &&
      identityTuple?.source_normal_reconstruction_candidate_id ===
        candidate?.normal_reconstruction_candidate_id,
    "bounded_speed_live_ledger action_derived_scale_target required_identity_tuple must match the normal candidate ledger tuple",
    errors
  );
  assertField(
    sameStringArray(
      actionScaleTarget?.required_variables,
      ACTION_DERIVED_SCALE_TARGET_REQUIRED_VARIABLES
    ),
    "bounded_speed_live_ledger action_derived_scale_target required_variables must list the action-derived scale variables",
    errors
  );
  assertField(
    sameStringArray(actionScaleTarget?.required_rows, ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS),
    "bounded_speed_live_ledger action_derived_scale_target required_rows must list the action-derived scale rows",
    errors
  );
  assertField(
    sameStringArray(
      actionScaleTarget?.current_fixture_supplied_rows,
      CURRENT_ACTION_DERIVED_SCALE_TARGET_ROWS
    ),
    "bounded_speed_live_ledger action_derived_scale_target current_fixture_supplied_rows must contain only the normal candidate",
    errors
  );
  assertField(
    sameStringArray(actionScaleTarget?.missing_rows, MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS),
    "bounded_speed_live_ledger action_derived_scale_target missing_rows must list the missing action-derived scale rows",
    errors
  );
  assertField(
    actionScaleTarget?.first_missing_required_row === MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS[0],
    "bounded_speed_live_ledger action_derived_scale_target first_missing_required_row must be action_measure_row",
    errors
  );
  assertField(
    actionScaleTarget?.negative_control_status ===
      "same-ledger-tuple-without-action-scale-rows-not-action-derived-scale",
    "bounded_speed_live_ledger action_derived_scale_target negative_control_status must reject tuple-only action-derived scale certification",
    errors
  );
  assertField(
    actionScaleTarget?.rejected_current_fixture === true,
    "bounded_speed_live_ledger action_derived_scale_target must reject the current fixture",
    errors
  );
  assertField(
    actionScaleTarget?.certifies_action_derived_scale === false,
    "bounded_speed_live_ledger action_derived_scale_target must set certifies_action_derived_scale=false",
    errors
  );
  assertField(
    actionScaleTarget?.certifies_bounded_speed_live_ledger === false,
    "bounded_speed_live_ledger action_derived_scale_target must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    actionScaleTarget?.certifies_action_stability === false,
    "bounded_speed_live_ledger action_derived_scale_target must set certifies_action_stability=false",
    errors
  );
  assertField(
    actionScaleTarget?.certifies_observer_export === false,
    "bounded_speed_live_ledger action_derived_scale_target must set certifies_observer_export=false",
    errors
  );
  assertField(
    actionScaleTarget?.retention === "not_retained",
    "bounded_speed_live_ledger action_derived_scale_target retention must be not_retained",
    errors
  );
  assertField(
    actionScaleTarget?.retained_branch === false,
    "bounded_speed_live_ledger action_derived_scale_target must set retained_branch=false",
    errors
  );
  errors.push(
    ...boundedSpeedActionMeasureRowTargetValidationErrors(
      candidate,
      actionScaleTarget?.action_measure_row_target
    )
  );

  return errors;
}

function buildBoundedSpeedLiveLedgerIdentityTarget(candidate) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_TARGET_SCHEMA,
    claim_scope: "bounded-speed-live-ledger-identity-target-after-normal-candidate",
    promotion_status: PROMOTION_STATUS,
    status: "target-only",
    source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    required_identity_tuple: {
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    },
    required_closed_rows: [...REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_IDENTITY_ROWS],
    closed_rows_supplied_by_current_packet: [...CURRENT_PACKET_LIVE_LEDGER_CLOSED_ROWS],
    missing_closed_rows: [...MISSING_LIVE_LEDGER_CLOSED_ROWS],
    first_missing_closed_row: MISSING_LIVE_LEDGER_CLOSED_ROWS[0],
    negative_control_status:
      "same-ledger-id-tuple-without-closed-downstream-rows-not-live-ledger",
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function buildActionMeasureBranchScopeSourceAudit(candidate) {
  const requiredIdentityTuple = {
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
  };
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_SCHEMA,
    claim_scope: "bounded-speed-action-measure-branch-scope-source-audit-after-normal-candidate",
    promotion_status: PROMOTION_STATUS,
    status: "no-same-ledger-branch-scope-source",
    audited_measure_field: "branch_scope",
    source_action_measure_row: "action_measure_row",
    required_identity_tuple: requiredIdentityTuple,
    search_basis: {
      searched_roots: [...ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_ROOTS],
      searched_terms: [...ACTION_MEASURE_BRANCH_SCOPE_AUDIT_SEARCH_TERMS],
      result: ACTION_MEASURE_BRANCH_SCOPE_AUDIT_RESULT,
    },
    acceptance_criteria: {
      required_identity_tuple: requiredIdentityTuple,
      required_same_ledger_fields: [...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_SAME_LEDGER_FIELDS],
      required_action_measure_fields: [...ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS],
      required_acceptance_bindings: [...ACTION_MEASURE_BRANCH_SCOPE_REQUIRED_ACCEPTANCE_BINDINGS],
    },
    candidate_count: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES.length,
    accepted_count: 0,
    accepted_branch_scope_source: null,
    first_failure: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
    negative_control_status: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_NEGATIVE_CONTROL,
    nearest_candidate_lineage_readout: buildActionMeasureBranchScopeNearestCandidateLineageReadout(),
    candidate_branch_scope_sources: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_CANDIDATES.map((candidateSource) => ({
      ...candidateSource,
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

function buildSameLedgerActionMeasureWithBranchScopeAttempt(candidate) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SAME_LEDGER_ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_SCHEMA,
    claim_scope:
      "bounded-speed-same-ledger-action-measure-row-with-branch-scope-attempt-after-normal-candidate",
    promotion_status: PROMOTION_STATUS,
    status: "fail-closed-target",
    attempted_evidence_object: ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
    source_action_measure_row_target: "action_measure_row",
    required_identity_tuple: {
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    },
    current_fixture_supplied_measure_fields: [...CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS],
    attempted_measure_fields: [...ACTION_MEASURE_WITH_BRANCH_SCOPE_ATTEMPT_FIELDS],
    missing_measure_fields_if_branch_scope_bound: [
      ...ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS,
    ],
    branch_scope_binding_status: "not_accepted",
    branch_scope_source_audit_first_failure:
      ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
    first_missing_subfield_after_branch_scope:
      ACTION_MEASURE_WITH_BRANCH_SCOPE_MISSING_FIELDS[0],
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
      first_blocker: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
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
      blocking_failure: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
      first_failure: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_FIRST_FAILURE,
      accepted_period_rows_source: null,
      candidate_count: 0,
      negative_control_status: ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_NEGATIVE_CONTROL,
      smallest_next_evidence_object:
        ACTION_MEASURE_WITH_BRANCH_SCOPE_PERIOD_ROWS_SMALLEST_NEXT_EVIDENCE_OBJECT,
    },
    rank5_retained_branch_closure_producer_target:
      buildRank5RetainedBranchActionMeasureProducerTarget(candidate),
    certifies_action_measure_row: false,
    certifies_action_derived_scale: false,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function buildRank5RetainedBranchActionMeasureProducerTarget(candidate) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_RANK5_RETAINED_BRANCH_ACTION_MEASURE_PRODUCER_TARGET_SCHEMA,
    claim_scope:
      "rank5-retained-branch-action-measure-producer-target-after-normal-candidate",
    promotion_status: PROMOTION_STATUS,
    top_six_rank: 5,
    closure_route: "bounded-speed-live-ledger",
    source_after_normal_packet: "bounded-speed-normal-reconstruction-candidate",
    source_normal_reconstruction_candidate_id:
      candidate.normal_reconstruction_candidate_id,
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    attempted_evidence_object: ACTION_MEASURE_BRANCH_SCOPE_SMALLEST_NEXT_EVIDENCE_OBJECT,
    required_identity_tuple: {
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      source_normal_reconstruction_candidate_id:
        candidate.normal_reconstruction_candidate_id,
    },
    required_producer_fields: [
      ...RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REQUIRED_FIELDS,
    ],
    supplied_fields_on_normal_candidate_ledger: [
      ...CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS,
    ],
    missing_producer_fields: [...MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS],
    first_missing_producer_field: MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS[0],
    first_blocker: ACTION_MEASURE_BRANCH_SCOPE_SOURCE_AUDIT_FIRST_FAILURE,
    rejected_evidence_kinds: [
      ...RANK5_RETAINED_BRANCH_PRODUCER_TARGET_REJECTED_EVIDENCE,
    ],
    nearest_rejected_source: {
      ...ACTION_MEASURE_BRANCH_SCOPE_NEAREST_CANDIDATE,
    },
    finite_mode_solver_action_measure_row_producer_target:
      buildFiniteModeActionMeasureRowProducerTarget(candidate),
    negative_control_status:
      "same-ledger-tuple-without-branch-scope-action-measure-not-rank5-retained-branch",
    accepted_same_ledger_action_measure_row: null,
    certifies_action_measure_row: false,
    certifies_rank5_retained_branch_closure: false,
    certifies_bounded_speed_live_ledger: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function buildBoundedSpeedActionMeasureRowTarget(candidate) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_MEASURE_ROW_TARGET_SCHEMA,
    claim_scope: "bounded-speed-action-measure-row-target-after-normal-candidate",
    promotion_status: PROMOTION_STATUS,
    status: "target-only",
    row: "action_measure_row",
    source_action_derived_scale_row: "action_derived_scale",
    source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    required_identity_tuple: {
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    },
    required_variables: [...ACTION_MEASURE_ROW_TARGET_REQUIRED_VARIABLES],
    required_measure_fields: [...ACTION_MEASURE_ROW_TARGET_REQUIRED_FIELDS],
    current_fixture_supplied_measure_fields: [...CURRENT_ACTION_MEASURE_ROW_TARGET_FIELDS],
    missing_measure_fields: [...MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS],
    first_missing_measure_field: MISSING_ACTION_MEASURE_ROW_TARGET_FIELDS[0],
    negative_control_status:
      "same-ledger-tuple-without-action-functional-not-action-measure-row",
    rejected_current_fixture: true,
    branch_scope_source_audit: buildActionMeasureBranchScopeSourceAudit(candidate),
    same_ledger_action_measure_row_with_branch_scope_attempt:
      buildSameLedgerActionMeasureWithBranchScopeAttempt(candidate),
    certifies_action_measure_row: false,
    certifies_action_derived_scale: false,
    certifies_bounded_speed_live_ledger: false,
    certifies_action_stability: false,
    certifies_observer_export: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function buildBoundedSpeedActionDerivedScaleTarget(candidate) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_DERIVED_SCALE_TARGET_SCHEMA,
    claim_scope: "bounded-speed-action-derived-scale-target-after-normal-candidate",
    promotion_status: PROMOTION_STATUS,
    status: "target-only",
    row: "action_derived_scale",
    downstream_row: "action_scale",
    source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    required_identity_tuple: {
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    },
    required_variables: [...ACTION_DERIVED_SCALE_TARGET_REQUIRED_VARIABLES],
    required_rows: [...ACTION_DERIVED_SCALE_TARGET_REQUIRED_ROWS],
    current_fixture_supplied_rows: [...CURRENT_ACTION_DERIVED_SCALE_TARGET_ROWS],
    missing_rows: [...MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS],
    first_missing_required_row: MISSING_ACTION_DERIVED_SCALE_TARGET_ROWS[0],
    negative_control_status:
      "same-ledger-tuple-without-action-scale-rows-not-action-derived-scale",
    rejected_current_fixture: true,
    action_measure_row_target: buildBoundedSpeedActionMeasureRowTarget(candidate),
    certifies_action_derived_scale: false,
    certifies_bounded_speed_live_ledger: false,
    certifies_action_stability: false,
    certifies_observer_export: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function buildBoundedSpeedLiveLedgerTarget(candidate, liveLedgerTarget) {
  return {
    claim_scope: "bounded-speed-live-ledger-target-after-normal-candidate",
    source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    intake_status: "bounded-speed-live-ledger-open",
    first_failure_row: "bounded-speed-live-ledger-open",
    required_same_ledger_rows: Object.fromEntries(
      REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row, downstreamRow]) => [
        row,
        {
          downstream_row: downstreamRow,
          same_ledger_binding: "same-normal-candidate-ledger-checksum",
          status: liveLedgerTarget.required_same_ledger_rows[row].status,
        },
      ])
    ),
    live_ledger_identity_target: buildBoundedSpeedLiveLedgerIdentityTarget(candidate),
    action_derived_scale_target: buildBoundedSpeedActionDerivedScaleTarget(candidate),
    certifies_bounded_speed_live_ledger: false,
    certifies_action_stability: false,
    certifies_observer_export: false,
    retention: "not_retained",
    retained_branch: false,
  };
}

function actionStabilityAfterNormalCandidateValidationErrors(artifact, actionPacket) {
  const errors = [];
  const candidate = artifact?.bounded_speed_normal_reconstruction_candidate;
  const downstreamRows = actionPacket?.downstream_row_statuses ?? {};
  const liveLedgerIdentity = actionPacket?.live_ledger_identity ?? {};

  assertField(
    actionPacket?.schema === OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
    `action stability after normal candidate schema must be ${OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    actionPacket?.claim_scope === "bounded-speed-action-stability-after-normal-candidate-intake",
    "action stability after normal candidate claim_scope must be bounded-speed-action-stability-after-normal-candidate-intake",
    errors
  );
  assertField(
    actionPacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `action stability after normal candidate source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    actionPacket?.source_artifact_id === artifact?.artifact_id,
    "action stability after normal candidate source_artifact_id must match the intake artifact",
    errors
  );
  assertField(
    actionPacket?.promotion_status === PROMOTION_STATUS,
    `action stability after normal candidate promotion_status must be ${PROMOTION_STATUS}`,
    errors
  );
  assertField(
    candidate?.schema === OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    "action stability after normal candidate requires an attached bounded speed normal reconstruction candidate",
    errors
  );
  assertField(
    candidate?.candidate_status === "bounded-speed-normal-reconstruction-candidate",
    "action stability after normal candidate requires bounded-speed-normal-reconstruction-candidate",
    errors
  );
  assertField(
    actionPacket?.source_bounded_speed_normal_reconstruction_candidate_schema ===
      OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    "action stability after normal candidate must cite the bounded speed normal reconstruction candidate schema",
    errors
  );
  assertField(
    actionPacket?.source_normal_reconstruction_candidate_id === candidate?.normal_reconstruction_candidate_id,
    "action stability after normal candidate source_normal_reconstruction_candidate_id must match the normal candidate",
    errors
  );
  assertField(
    actionPacket?.normal_candidate_status === "bounded-speed-normal-reconstruction-candidate",
    "action stability after normal candidate normal_candidate_status must be bounded-speed-normal-reconstruction-candidate",
    errors
  );
  assertField(
    isNonemptyString(actionPacket?.action_stability_intake_id),
    "action stability after normal candidate must declare action_stability_intake_id",
    errors
  );
  assertField(
    actionPacket?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id,
    "action stability after normal candidate bounded_speed_ledger_id must match the normal candidate",
    errors
  );
  assertField(
    actionPacket?.force_checksum_id === candidate?.force_checksum_id,
    "action stability after normal candidate force_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    actionPacket?.consumer_checksum_id === candidate?.consumer_checksum_id,
    "action stability after normal candidate consumer_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerIdentity?.bounded_speed_ledger_id === candidate?.bounded_speed_ledger_id,
    "action stability after normal candidate live_ledger_identity bounded_speed_ledger_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerIdentity?.force_checksum_id === candidate?.force_checksum_id,
    "action stability after normal candidate live_ledger_identity force_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerIdentity?.consumer_checksum_id === candidate?.consumer_checksum_id,
    "action stability after normal candidate live_ledger_identity consumer_checksum_id must match the normal candidate",
    errors
  );
  assertField(
    liveLedgerIdentity?.certification_status === "bounded-speed-live-ledger-open",
    "action stability after normal candidate live_ledger_identity certification_status must be bounded-speed-live-ledger-open",
    errors
  );
  errors.push(...boundedSpeedLiveLedgerTargetValidationErrors(candidate, actionPacket?.bounded_speed_live_ledger));
  assertField(
    actionPacket?.live_ledger_status === "bounded-speed-live-ledger-open",
    "action stability after normal candidate live_ledger_status must be bounded-speed-live-ledger-open",
    errors
  );
  assertField(
    actionPacket?.first_failure_row === "bounded-speed-live-ledger-open",
    "action stability after normal candidate first_failure_row must be bounded-speed-live-ledger-open",
    errors
  );
  assertField(
    actionPacket?.retention === "not_retained",
    "action stability after normal candidate retention must be not_retained",
    errors
  );
  assertField(
    actionPacket?.retained_branch === false,
    "action stability after normal candidate must set retained_branch=false",
    errors
  );
  assertField(
    actionPacket?.certifies_live_derivative_matrix === true &&
      actionPacket?.certifies_correction_direction === true &&
      actionPacket?.certifies_speed_primitive_feasibility === true &&
      actionPacket?.certifies_speed_clock_length === true &&
      actionPacket?.certifies_normal_reconstruction === true,
    "action stability after normal candidate must preserve the certified scalar and normal candidate chain",
    errors
  );
  assertField(
    actionPacket?.certifies_bounded_speed_live_ledger === false,
    "action stability after normal candidate must set certifies_bounded_speed_live_ledger=false",
    errors
  );
  assertField(
    actionPacket?.certifies_action_stability === false,
    "action stability after normal candidate must set certifies_action_stability=false",
    errors
  );
  assertField(
    actionPacket?.certifies_observer_export === false,
    "action stability after normal candidate must set certifies_observer_export=false",
    errors
  );
  for (const row of REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS) {
    assertField(
      downstreamRows?.[row] === "blocked:bounded-speed-live-ledger-open",
      `action stability after normal candidate downstream row ${row} must be blocked:bounded-speed-live-ledger-open`,
      errors
    );
  }

  return errors;
}

export function evaluateActionStabilityAfterNormalCandidateIntake(artifact, actionPacket) {
  const errors = actionStabilityAfterNormalCandidateValidationErrors(artifact, actionPacket);
  if (errors.length > 0) {
    throw new Error(`action stability after normal candidate packet failed validation: ${errors.join("; ")}`);
  }

  const candidate = artifact.bounded_speed_normal_reconstruction_candidate;

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_bounded_speed_normal_reconstruction_candidate_schema: candidate.schema,
    claim_scope: "bounded-speed-action-stability-after-normal-candidate-intake",
    promotion_status: PROMOTION_STATUS,
    action_stability_intake_id: actionPacket.action_stability_intake_id,
    source_artifact_id: actionPacket.source_artifact_id,
    source_normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
    normal_candidate_input: {
      normal_reconstruction_candidate_id: candidate.normal_reconstruction_candidate_id,
      candidate_status: candidate.candidate_status,
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      certifies_bounded_speed_live_ledger: false,
      retention: "not_retained",
      retained_branch: false,
    },
    live_ledger_identity: {
      ...actionPacket.live_ledger_identity,
      bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
      force_checksum_id: candidate.force_checksum_id,
      consumer_checksum_id: candidate.consumer_checksum_id,
      certification_status: "bounded-speed-live-ledger-open",
    },
    bounded_speed_live_ledger: buildBoundedSpeedLiveLedgerTarget(
      candidate,
      actionPacket.bounded_speed_live_ledger
    ),
    bounded_speed_ledger_id: candidate.bounded_speed_ledger_id,
    force_checksum_id: candidate.force_checksum_id,
    consumer_checksum_id: candidate.consumer_checksum_id,
    normal_candidate_status: "bounded-speed-normal-reconstruction-candidate",
    live_ledger_status: "bounded-speed-live-ledger-open",
    first_failure_row: "bounded-speed-live-ledger-open",
    downstream_row_statuses: Object.fromEntries(
      REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS.map((row) => [
        row,
        actionPacket.downstream_row_statuses[row],
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
    action_stability_intake_status: "after-normal-action-stability-intake-blocked",
    downstream_status: "bounded-speed-live-ledger-open",
    retention: "not_retained",
    retained_branch: false,
    status_note:
      "This packet consumes the supplied bounded-speed normal reconstruction candidate on the same ledger/checksum boundary and fails closed at bounded-speed-live-ledger-open. It does not certify action, Noether/event, stability, observer export, coupled fixed point, or retained branch rows.",
  };
}

export function attachActionStabilityAfterNormalCandidateIntake(artifact, actionPacket) {
  const intake = evaluateActionStabilityAfterNormalCandidateIntake(artifact, actionPacket);
  const existingRows = artifact.residual_vector.rows.filter(
    (row) => row.row !== "R_bounded_speed_action_stability_after_normal_candidate"
  );

  return {
    ...artifact,
    artifact_claim: {
      ...artifact.artifact_claim,
      emits_action_stability_after_normal_candidate_intake: true,
      certifies_bounded_speed_live_ledger: false,
      certifies_action_stability: false,
      certifies_observer_export: false,
      strongest_claim:
        "The supplied same-ledger bounded-speed normal reconstruction candidate can be consumed by an after-normal action/stability intake boundary, but the bounded-speed live ledger remains open and no branch is retained.",
    },
    residual_vector: {
      ...artifact.residual_vector,
      rows: [
        ...existingRows,
        {
          row: "R_bounded_speed_action_stability_after_normal_candidate",
          status: "open",
          value: "bounded-speed-live-ledger-open",
        },
      ],
      first_failure_row: "bounded-speed-live-ledger-open",
    },
    result: {
      ...artifact.result,
      intake_status: "zero-mean-action-stability-after-normal-candidate-blocked",
      bounded_speed_live_ledger: "not_built",
      action_stability: "not_certified",
      observer_export: "not_authorized",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side, certifies the scalar speed-ODE correction chain through supplied normal reconstruction candidate rows, and records the after-normal action/stability intake boundary. It stops at bounded-speed-live-ledger-open and does not certify a retained branch.",
    },
    not_retained_reason: [
      "bounded-speed live ledger is not certified as a retained branch",
      "action, Noether, event, stability, and observer-export rows are blocked by bounded-speed-live-ledger-open",
      "coupled fixed-point and refinement-persistence rows are not closed",
    ],
    action_stability_after_normal_candidate_intake: intake,
  };
}

function candidateBValidationErrors(artifact, candidateBPacket, options) {
  const errors = [];
  const rankTolerance = options.rankTolerance;
  const rangeTolerance = options.rangeTolerance;

  assertField(
    candidateBPacket?.schema === OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
    `candidate B schema must be ${OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA}`,
    errors
  );
  assertField(
    candidateBPacket?.claim_scope === "candidate-range-probe-only",
    "candidate B claim_scope must be candidate-range-probe-only",
    errors
  );
  assertField(
    candidateBPacket?.live_derivative_columns_claimed === false,
    "candidate B must not claim live derivative columns",
    errors
  );
  for (const forbidden of [
    "certifies_live_derivative_matrix",
    "certifies_correction_direction",
    "certifies_bounded_speed_live_ledger",
    "retained_branch",
  ]) {
    assertField(candidateBPacket?.[forbidden] !== true, `candidate B must not set ${forbidden}=true`, errors);
  }
  assertField(
    Array.isArray(candidateBPacket?.row_labels) &&
      JSON.stringify(candidateBPacket.row_labels) === JSON.stringify(artifact.frozen_mean_vector.receiver_labels),
    "candidate B row_labels must match frozen receiver labels",
    errors
  );
  assertField(
    Array.isArray(candidateBPacket?.column_labels) && candidateBPacket.column_labels.length >= 1,
    "candidate B column_labels must be a nonempty array",
    errors
  );
  try {
    const columnCount = validateCandidateMatrixShape(candidateBPacket?.matrix);
    assertField(
      candidateBPacket.column_labels.length === columnCount,
      "candidate B column_labels length must equal matrix column count",
      errors
    );
  } catch (error) {
    errors.push(error.message);
  }
  assertField(Number.isFinite(rankTolerance) && rankTolerance >= 0, "rank tolerance must be nonnegative", errors);
  assertField(Number.isFinite(rangeTolerance) && rangeTolerance >= 0, "range tolerance must be nonnegative", errors);
  return errors;
}

export function evaluateCandidateBRangeProbe(artifact, candidateBPacket, options = {}) {
  const rankTolerance = Number(options.rankTolerance ?? DEFAULT_RANK_TOLERANCE);
  const rangeTolerance = Number(options.rangeTolerance ?? DEFAULT_RANGE_TOLERANCE);
  const errors = candidateBValidationErrors(artifact, candidateBPacket, { rankTolerance, rangeTolerance });
  if (errors.length > 0) {
    throw new Error(`candidate B packet failed validation: ${errors.join("; ")}`);
  }

  const targetVector = artifact.linear_system_intake.rhs_vector;
  const check = evaluateCandidateRangeCondition(candidateBPacket.matrix, targetVector, {
    rankTolerance,
    rangeTolerance,
  });

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA,
    candidate_b_schema: OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
    matrix_id: candidateBPacket.matrix_id ?? "candidate-b",
    claim_scope: "candidate-range-probe-only",
    target_condition: "-m_frz in Range(B_cand)",
    rhs_source: "linear_system_intake.rhs_vector",
    row_labels: candidateBPacket.row_labels,
    column_labels: candidateBPacket.column_labels,
    dimensions: {
      row_count: check.row_count,
      column_count: check.column_count,
    },
    tolerances: {
      rank: rankTolerance,
      range: rangeTolerance,
    },
    matrix_rank: check.rank,
    augmented_rank_with_constant_direction: check.augmented_rank_with_constant_direction,
    constant_direction_in_range_status: check.constant_direction_in_range_status,
    rhs_norm_2: check.target_vector_norm,
    candidate_range_residual_norm_2: check.range_residual_norm,
    candidate_range_relative_residual: check.normalized_range_residual,
    constant_direction_residual_norm_2: check.constant_direction_residual_norm,
    column_sums: check.column_sums,
    max_abs_column_sum: check.max_abs_column_sum,
    balanced_column_status: check.balanced_column_status,
    range_membership_status:
      check.status === "range-condition-passed" ? "candidate-rhs-in-range" : "candidate-rhs-out-of-range",
    cokernel_obstruction_status: check.cokernel_obstruction_status,
    live_derivative_columns_claimed: false,
    live_derivative_status: "live-ledger-derivative-open",
    correction_status: "zero-mean-correction-open",
    retention: "not_retained",
    status_note:
      "Candidate B is an algebraic range probe only; it is not linear_system_intake.derivative_matrix and does not certify a live derivative matrix.",
  };
}

export function attachCandidateBRangeProbe(artifact, candidateBPacket, options = {}) {
  return {
    ...artifact,
    candidate_b_range_probe: evaluateCandidateBRangeProbe(artifact, candidateBPacket, options),
  };
}

function missingRequiredEntries(requiredEntries, includedEntries) {
  const included = new Set(includedEntries);
  return requiredEntries.filter((entry) => !included.has(entry));
}

function liveDerivativeColumnValidationErrors(artifact, columnPacket) {
  const errors = [];
  const receiverLabels = artifact?.frozen_mean_vector?.receiver_labels ?? [];

  assertField(
    columnPacket?.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
    `live derivative column schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    columnPacket?.claim_scope === LIVE_DERIVATIVE_COLUMN_CLAIM_SCOPE,
    `live derivative column claim_scope must be ${LIVE_DERIVATIVE_COLUMN_CLAIM_SCOPE}`,
    errors
  );
  assertField(
    columnPacket?.source_intake_schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `live derivative column source_intake_schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(
    columnPacket?.source_artifact_id === artifact?.artifact_id,
    "live derivative column source_artifact_id must match the intake artifact",
    errors
  );
  for (const forbidden of [
    "certifies_live_derivative_matrix",
    "certifies_correction_direction",
    "certifies_bounded_speed_live_ledger",
    "retained_branch",
  ]) {
    assertField(columnPacket?.[forbidden] === false, `live derivative column packet must set ${forbidden}=false`, errors);
  }
  assertField(
    Array.isArray(columnPacket?.row_labels) && JSON.stringify(columnPacket.row_labels) === JSON.stringify(receiverLabels),
    "live derivative column row_labels must match frozen receiver labels",
    errors
  );
  assertField(
    Array.isArray(columnPacket?.column_labels) &&
      columnPacket.column_labels.length >= 1 &&
      columnPacket.column_labels.every(isNonemptyString) &&
      uniqueEntries(columnPacket.column_labels),
    "live derivative column column_labels must be a nonempty unique string array",
    errors
  );

  const includedBlocks = columnPacket?.derivative_column_blocks;
  assertField(
    Array.isArray(includedBlocks) && includedBlocks.every(isNonemptyString),
    "live derivative column derivative_column_blocks must be a string array",
    errors
  );
  if (Array.isArray(includedBlocks)) {
    const missingBlocks = missingRequiredEntries(REQUIRED_LIVE_DERIVATIVE_BLOCKS, includedBlocks);
    assertField(
      missingBlocks.length === 0,
      `live derivative column packet omits required live blocks: ${missingBlocks.join(", ")}`,
      errors
    );
  }

  const columns = columnPacket?.columns;
  assertField(Array.isArray(columns) && columns.length >= 1, "live derivative column columns must be nonempty", errors);
  if (!Array.isArray(columns)) {
    return errors;
  }
  assertField(
    Array.isArray(columnPacket?.column_labels) && columnPacket.column_labels.length === columns.length,
    "live derivative column column_labels length must equal columns length",
    errors
  );

  columns.forEach((column, columnIndex) => {
    const columnLabel = column?.column_label;
    const labelPrefix = `live derivative column ${columnLabel ?? columnIndex}`;
    assertField(isNonemptyString(columnLabel), `${labelPrefix} must have a column_label`, errors);
    if (Array.isArray(columnPacket?.column_labels)) {
      assertField(
        columnPacket.column_labels[columnIndex] === columnLabel,
        `${labelPrefix} column_label must match column_labels order`,
        errors
      );
    }
    assertField(isNonemptyString(column?.parameter_id), `${labelPrefix} must have a parameter_id`, errors);
    assertField(isNonemptyString(column?.parameter_kind), `${labelPrefix} must have a parameter_kind`, errors);
    assertField(
      LIVE_DERIVATIVE_DIFFERENCE_SCHEMES.has(column?.difference_scheme),
      `${labelPrefix} must declare an allowed difference_scheme`,
      errors
    );
    assertField(
      Number.isFinite(column?.perturbation_epsilon) && column.perturbation_epsilon > 0,
      `${labelPrefix} must have a positive perturbation_epsilon`,
      errors
    );
    for (const artifactField of ["baseline_artifact_id", "plus_artifact_id", "minus_artifact_id"]) {
      assertField(isNonemptyString(column?.[artifactField]), `${labelPrefix} must have ${artifactField}`, errors);
    }
    assertField(
      isNonemptyString(column?.ledger_convention_id),
      `${labelPrefix} must declare a ledger_convention_id`,
      errors
    );
    assertField(
      column?.same_ledger_convention === true,
      `${labelPrefix} must declare same_ledger_convention=true`,
      errors
    );

    const guards = column?.guards ?? {};
    for (const guard of REQUIRED_LIVE_DERIVATIVE_GUARDS) {
      assertField(guards?.[guard] === "passed", `${labelPrefix} ${guard} must be passed`, errors);
    }

    const receiverRows = column?.receiver_rows;
    assertField(
      Array.isArray(receiverRows) && receiverRows.length === RECEIVER_COUNT,
      `${labelPrefix} must have six receiver_rows`,
      errors
    );
    if (!Array.isArray(receiverRows)) {
      return;
    }
    receiverRows.forEach((row, receiverIndex) => {
      const receiverLabel = receiverLabels[receiverIndex];
      assertField(
        row?.receiver_label === receiverLabel,
        `${labelPrefix} receiver row ${receiverIndex} must match receiver label ${receiverLabel}`,
        errors
      );
      for (const valueField of ["baseline_mean", "plus_mean", "minus_mean", "derivative_value"]) {
        assertField(Number.isFinite(row?.[valueField]), `${labelPrefix} ${receiverLabel} ${valueField} must be finite`, errors);
      }
      assertField(
        Number.isFinite(row?.finite_difference_residual) && row.finite_difference_residual >= 0,
        `${labelPrefix} ${receiverLabel} finite_difference_residual must be a nonnegative finite number`,
        errors
      );
    });
  });

  return errors;
}

export function evaluateLiveDerivativeColumnIntake(artifact, columnPacket) {
  const errors = liveDerivativeColumnValidationErrors(artifact, columnPacket);
  if (errors.length > 0) {
    throw new Error(`live derivative column packet failed validation: ${errors.join("; ")}`);
  }

  const matrixColumnsFromPacket = columnPacket.columns.map((column) =>
    column.receiver_rows.map((row) => row.derivative_value)
  );
  const columnMatrixPreview = Array.from({ length: RECEIVER_COUNT }, (_, receiverIndex) =>
    matrixColumnsFromPacket.map((column) => formatNumber(column[receiverIndex]))
  );
  const residuals = columnPacket.columns.flatMap((column) =>
    column.receiver_rows.map((row) => row.finite_difference_residual)
  );

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    claim_scope: LIVE_DERIVATIVE_COLUMN_CLAIM_SCOPE,
    source_artifact_id: columnPacket.source_artifact_id,
    target_derivative_matrix_symbol: "B_{i ell}=D_{v_ell} M_i^nu(z_0)",
    row_labels: columnPacket.row_labels,
    column_labels: columnPacket.column_labels,
    dimensions: {
      row_count: RECEIVER_COUNT,
      column_count: columnPacket.columns.length,
    },
    required_live_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS,
    included_live_blocks: columnPacket.derivative_column_blocks,
    omitted_required_live_blocks: [],
    required_guards: REQUIRED_LIVE_DERIVATIVE_GUARDS,
    guard_status: "live-derivative-column-provenance-checked",
    finite_difference_residual_abs_max: formatNumber(maxAbs(residuals)),
    column_matrix_preview: columnMatrixPreview,
    column_provenance: columnPacket.columns.map((column) => ({
      column_label: column.column_label,
      parameter_id: column.parameter_id,
      parameter_kind: column.parameter_kind,
      difference_scheme: column.difference_scheme,
      perturbation_epsilon: column.perturbation_epsilon,
      ledger_convention_id: column.ledger_convention_id,
      same_ledger_convention: true,
      baseline_artifact_id: column.baseline_artifact_id,
      plus_artifact_id: column.plus_artifact_id,
      minus_artifact_id: column.minus_artifact_id,
      guard_status: "passed",
      finite_difference_residual_abs_max: formatNumber(
        maxAbs(column.receiver_rows.map((row) => row.finite_difference_residual))
      ),
    })),
    certifies_live_derivative_matrix: false,
    certifies_bounded_speed_live_ledger: false,
    certifies_correction_direction: false,
    live_derivative_matrix_status: "not_certified_live_derivative_matrix",
    live_derivative_status: "live-ledger-derivative-open",
    correction_status: "zero-mean-correction-open",
    retention: "not_retained",
    status_note:
      "This packet audits derivative-column provenance for the zero-mean row. It is not linear_system_intake.derivative_matrix and does not certify a live derivative matrix, range certificate, correction direction, or retained branch.",
  };
}

export function attachLiveDerivativeColumnIntake(artifact, columnPacket) {
  return {
    ...artifact,
    live_derivative_column_intake: evaluateLiveDerivativeColumnIntake(artifact, columnPacket),
  };
}

export function evaluateLiveDerivativeColumnPreviewRangeProbeFromIntake(artifact, liveColumnIntake, options = {}) {
  const rankTolerance = Number(options.rankTolerance ?? DEFAULT_RANK_TOLERANCE);
  const rangeTolerance = Number(options.rangeTolerance ?? DEFAULT_RANGE_TOLERANCE);
  const matrixPreview = liveColumnIntake.column_matrix_preview;
  const targetVector = artifact.linear_system_intake.rhs_vector;
  const check = evaluateCandidateRangeCondition(matrixPreview, targetVector, {
    rankTolerance,
    rangeTolerance,
  });
  const previewSolution = leastSquaresPreviewSolution(
    matrixPreview,
    targetVector,
    check.rank,
    rankTolerance
  );
  const previewCokernelWitness = buildPreviewCokernelWitness(
    matrixPreview,
    targetVector,
    check.range_residual_vector,
    check.range_residual_norm,
    rangeTolerance
  );
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA,
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
    claim_scope: "live-derivative-column-preview-range-probe-only",
    source_artifact_id: artifact.artifact_id,
    target_condition: "-m_frz in Range(column_matrix_preview)",
    rhs_source: "linear_system_intake.rhs_vector",
    matrix_source: "live_derivative_column_intake.column_matrix_preview",
    source_live_derivative_column_intake_schema: liveColumnIntake.schema,
    source_live_derivative_column_claim_scope: liveColumnIntake.claim_scope,
    source_guard_status: liveColumnIntake.guard_status,
    provenance_checked_column_preview: true,
    row_labels: liveColumnIntake.row_labels,
    column_labels: liveColumnIntake.column_labels,
    dimensions: {
      row_count: check.row_count,
      column_count: check.column_count,
    },
    tolerances: {
      rank: rankTolerance,
      range: rangeTolerance,
    },
    matrix_rank: check.rank,
    augmented_rank_with_constant_direction: check.augmented_rank_with_constant_direction,
    independent_column_indices: check.independent_column_indices,
    constant_direction_in_range_status: check.constant_direction_in_range_status,
    rhs_norm_2: check.target_vector_norm,
    preview_range_residual_norm_2: check.range_residual_norm,
    preview_range_relative_residual: check.normalized_range_residual,
    preview_range_projection_vector: check.range_projection_vector,
    preview_range_residual_vector: check.range_residual_vector,
    least_squares_preview: {
      claim_scope: "least-squares-preview-only",
      equation: "B_preview*alpha_preview=-m_frz",
      matrix_source: "live_derivative_column_intake.column_matrix_preview",
      rhs_source: "linear_system_intake.rhs_vector",
      solver: "modified-gram-schmidt-full-column-rank-preview",
      status: previewSolution.status,
      alpha_preview_vector: previewSolution.coefficients?.map(formatNumber) ?? null,
      alpha_preview_norm_2: previewSolution.coefficients ? formatNumber(vectorNorm(previewSolution.coefficients)) : null,
      fitted_rhs_preview: previewSolution.fitted?.map(formatNumber) ?? null,
      residual_vector: previewSolution.residual?.map(formatNumber) ?? null,
      residual_norm_2: previewSolution.residualNorm === null ? null : formatNumber(previewSolution.residualNorm),
      relative_residual: previewSolution.relativeResidual === null ? null : formatNumber(previewSolution.relativeResidual),
      certifies_live_derivative_matrix: false,
      certifies_correction_direction: false,
      certifies_bounded_speed_live_ledger: false,
      correction_status: "zero-mean-correction-open",
      retention: "not_retained",
      status_note:
        "Preview-only least-squares coordinates for the provenance-checked column preview; not a certified correction direction and not linear_system_intake.derivative_matrix.",
    },
    preview_cokernel_witness: previewCokernelWitness,
    constant_direction_residual_norm_2: check.constant_direction_residual_norm,
    column_sums: check.column_sums,
    max_abs_column_sum: check.max_abs_column_sum,
    balanced_column_status: check.balanced_column_status,
    range_membership_status:
      check.status === "range-condition-passed" ? "preview-rhs-in-range" : "preview-rhs-out-of-range",
    cokernel_obstruction_status: check.cokernel_obstruction_status,
    certifies_live_derivative_matrix: false,
    certifies_bounded_speed_live_ledger: false,
    certifies_correction_direction: false,
    live_derivative_matrix_status: "not_certified_live_derivative_matrix",
    live_derivative_status: "live-ledger-derivative-open",
    correction_status: "zero-mean-correction-open",
    retention: "not_retained",
    status_note:
      "This is a range probe of a provenance-checked finite-difference column preview. It is not linear_system_intake.derivative_matrix and does not certify a live derivative matrix, correction direction, bounded-speed live ledger, or retained branch.",
  };
}

export function evaluateLiveDerivativeColumnPreviewRangeProbe(artifact, columnPacket, options = {}) {
  return evaluateLiveDerivativeColumnPreviewRangeProbeFromIntake(
    artifact,
    evaluateLiveDerivativeColumnIntake(artifact, columnPacket),
    options
  );
}

export function attachLiveDerivativeColumnPreviewRangeProbe(artifact, options = {}) {
  if (!artifact.live_derivative_column_intake) {
    throw new Error("live derivative column intake must be attached before range probing");
  }
  return {
    ...artifact,
    live_derivative_column_preview_range_probe: evaluateLiveDerivativeColumnPreviewRangeProbeFromIntake(
      artifact,
      artifact.live_derivative_column_intake,
      options
    ),
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function buildOctahedralZeroMeanCorrectionIntake(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const constantVectorTolerance = Number(options.constantVectorTolerance ?? DEFAULT_CONSTANT_VECTOR_TOLERANCE);
  const rankTolerance = Number(options.rankTolerance ?? DEFAULT_RANK_TOLERANCE);
  const rangeTolerance = Number(options.rangeTolerance ?? DEFAULT_RANGE_TOLERANCE);
  const primitiveReturnTolerance = Number(options.primitiveReturnTolerance ?? DEFAULT_PRIMITIVE_RETURN_TOLERANCE);
  const speedBandMarginFloor = Number(options.speedBandMarginFloor ?? DEFAULT_SPEED_BAND_MARGIN_FLOOR);
  const clockLengthTolerance = Number(options.clockLengthTolerance ?? DEFAULT_CLOCK_LENGTH_TOLERANCE);

  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(constantVectorTolerance) || constantVectorTolerance < 0) {
    throw new Error("constantVectorTolerance must be a nonnegative number");
  }
  if (!Number.isFinite(rankTolerance) || rankTolerance < 0) {
    throw new Error("rankTolerance must be a nonnegative number");
  }
  if (!Number.isFinite(rangeTolerance) || rangeTolerance < 0) {
    throw new Error("rangeTolerance must be a nonnegative number");
  }
  if (!Number.isFinite(primitiveReturnTolerance) || primitiveReturnTolerance < 0) {
    throw new Error("primitiveReturnTolerance must be a nonnegative number");
  }
  if (!Number.isFinite(speedBandMarginFloor) || speedBandMarginFloor < 0) {
    throw new Error("speedBandMarginFloor must be a nonnegative number");
  }
  if (!Number.isFinite(clockLengthTolerance) || clockLengthTolerance < 0) {
    throw new Error("clockLengthTolerance must be a nonnegative number");
  }

  const speedDiagnostic = buildOctahedralSpeedOdeDiagnostic({ phaseSamples, ySubdivisions });
  const speedDiagnosticValidationErrors = validateOctahedralSpeedOdeDiagnostic(speedDiagnostic);
  const siteRows = speedDiagnostic.speed_ode_solvability.site_rows;
  const periodIntegralVector = siteRows.map((row) => row.tangent_forcing.period_integral);
  const periodMeanVector = siteRows.map((row) => row.tangent_forcing.mean);
  const muPeriodIntegral = mean(periodIntegralVector);
  const muPeriodMean = mean(periodMeanVector);
  const periodIntegralDeviation = periodIntegralVector.map((value) => value - muPeriodIntegral);
  const periodMeanDeviation = periodMeanVector.map((value) => value - muPeriodMean);
  const constantCovector = buildConstantCovector(RECEIVER_COUNT);
  const projectionOfMean = dot(constantCovector, periodIntegralVector);
  const projectionOfRhs = -projectionOfMean;
  const rhsVector = periodIntegralVector.map((value) => -value);
  const meanSplit = speedDiagnostic.speed_ode_solvability.mean_split_certificate;
  const partnerCertificate = meanSplit.partner_positive_certificate;
  const candidateBPacket = options.candidateBPacket ?? null;
  const liveDerivativeColumnPacket = options.liveDerivativeColumnPacket ?? null;
  const liveDerivativeMatrixPacket = options.liveDerivativeMatrixPacket ?? null;
  const liveCorrectionDirectionPacket = options.liveCorrectionDirectionPacket ?? null;
  const speedPrimitiveFeasibilityPacket = options.speedPrimitiveFeasibilityPacket ?? null;
  const speedClockLengthPacket = options.speedClockLengthPacket ?? null;
  const normalReconstructionHandoffPacket = options.normalReconstructionHandoffPacket ?? null;
  const boundedSpeedNormalReconstructionCandidatePacket =
    options.boundedSpeedNormalReconstructionCandidatePacket ?? null;
  const actionStabilityAfterNormalCandidatePacket = options.actionStabilityAfterNormalCandidatePacket ?? null;
  const probeLiveDerivativeColumnPreview = Boolean(options.probeLiveDerivativeColumnPreview);

  const artifact = {
    schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_zero_mean_correction_intake.frozen_constant_vector.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "scripts/neutral-braid/octahedral-speed-ode-diagnostic.mjs",
      "reference/priorities/braid-archive/braid-retained-branch-closure/shell-braid/bounded-speed-factor-speed-ode-zero-mean-correction-target.md",
    ],
    artifact_claim: {
      kind: "zero_mean_correction_intake",
      solves_dynamics: false,
      certifies_bounded_speed_live_ledger: false,
      emits_live_derivative_columns: false,
      certifies_live_derivative_matrix: false,
      certifies_correction_direction: false,
      certifies_speed_primitive_feasibility: false,
      certifies_speed_clock_length: false,
      emits_normal_reconstruction_handoff: false,
      emits_bounded_speed_normal_reconstruction_candidate: false,
      emits_action_stability_after_normal_candidate_intake: false,
      certifies_normal_reconstruction: false,
      certifies_action_stability: false,
      certifies_observer_export: false,
      retained_branch: false,
      strongest_claim:
        "The frozen rigid-octahedral speed-ODE mean vector is a positive constant six-vector, so any live zero-mean correction matrix must hit that right-hand-side direction.",
    },
    source_diagnostic: {
      schema: OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
      validation_status:
        speedDiagnosticValidationErrors.length === 0 ? "source-speed-diagnostic-valid" : "source-speed-diagnostic-invalid",
      validation_errors: speedDiagnosticValidationErrors,
      speed_ode_status: speedDiagnostic.speed_ode_solvability.status,
      mean_split_status: meanSplit.status,
      partner_positive_status: partnerCertificate.status,
      cross_binary_symmetry_certificate_status: meanSplit.cross_binary_symmetry_certificate_status,
      bounded_speed_handoff_status: meanSplit.bounded_speed_handoff_status,
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      y_subdivisions: ySubdivisions,
      constant_vector_tolerance: constantVectorTolerance,
      source_integration_rule: speedDiagnostic.numerical_method.integration_rule,
    },
    frozen_mean_vector: {
      receiver_labels: siteRows.map((row) => row.label),
      period_integral_vector: periodIntegralVector.map(formatNumber),
      period_mean_vector: periodMeanVector.map(formatNumber),
      mu_period_integral: formatNumber(muPeriodIntegral),
      mu_period_mean: formatNumber(muPeriodMean),
      period_integral_deviation_abs_max: formatNumber(maxAbs(periodIntegralDeviation)),
      period_mean_deviation_abs_max: formatNumber(maxAbs(periodMeanDeviation)),
      constant_vector_status:
        maxAbs(periodIntegralDeviation) <= constantVectorTolerance &&
        maxAbs(periodMeanDeviation) <= constantVectorTolerance
          ? "constant-six-vector-certified"
          : "constant-six-vector-failed",
      positivity_status: muPeriodIntegral > constantVectorTolerance ? "positive-period-mean-certified" : "positive-period-mean-failed",
      source_relation_basis: {
        antipodal_partner: {
          status: partnerCertificate.status,
          period_integral_interval_estimate: partnerCertificate.period_integral_interval_estimate,
          tangential_mean_formula: partnerCertificate.tangential_mean_formula,
        },
        cross_binary: {
          status: meanSplit.cross_binary_symmetry_certificate_status,
          aggregate_identity: meanSplit.cross_binary_symmetry_certificate.aggregate_identity,
          period_mean: 0,
        },
      },
    },
    linear_system_intake: {
      equation: "B*alpha=-M",
      mean_vector_symbol: "M=(M_1,...,M_6)",
      derivative_matrix_symbol: "B_{i ell}=D_{v_ell} M_i^nu(z_0)",
      rhs_vector: rhsVector.map(formatNumber),
      normalized_constant_covector: {
        symbol: "e_0=(1,1,1,1,1,1)/sqrt(6)",
        entries: constantCovector.map(formatNumber),
        projection_of_M: formatNumber(projectionOfMean),
        projection_of_rhs: formatNumber(projectionOfRhs),
      },
      necessary_projection_condition:
        "Any correction alpha must satisfy e_0^T*B*alpha=-e_0^T*M; if e_0^T*B is the zero row, the first-order correction is obstructed.",
      exact_range_condition:
        "Since M=mu*1_6 with mu>0, first-order solvability is equivalent to 1_6 being in Range(B).",
      cokernel_obstruction_rule:
        "Equivalently, every q in ker(B^T) must satisfy q^T*1_6=0; any left-null vector with nonzero receiver sum certifies a first-order zero-mean obstruction.",
      derivative_matrix: null,
      rank: null,
      range_residual: null,
      range_projection: null,
      cokernel_projection: null,
      alpha_b_vector: null,
      alpha_b_source: null,
      alpha_b_certificate_schema: null,
      alpha_b_residual_vector: null,
      alpha_b_residual_norm_2: null,
      alpha_b_relative_residual: null,
      solution_alpha_vector: null,
      solution_alpha_norm_2: null,
      solution_fitted_rhs: null,
      solution_residual_vector: null,
      solution_residual_norm_2: null,
      correction_direction_certificate_schema: null,
      correction_direction_certificate_id: null,
      range_certificate_status: "correction-rank-open",
      live_derivative_status: "live-ledger-derivative-open",
      correction_status: "zero-mean-correction-open",
    },
    derivative_column_audit: {
      status: "live-ledger-derivative-open",
      live_derivative_columns_claimed: false,
      included_column_blocks: [],
      omitted_required_live_blocks: [
        "clock",
        "inverse-clock",
        "root",
        "jacobian",
        "force-weight",
        "support",
        "action",
        "event",
      ],
    },
    residual_vector: {
      rows: [
        { row: "R_source_speed_ode_mean_split", status: "passed", value: meanSplit.status },
        {
          row: "R_frozen_mean_constant_vector",
          status:
            maxAbs(periodIntegralDeviation) <= constantVectorTolerance &&
            maxAbs(periodMeanDeviation) <= constantVectorTolerance
              ? "passed"
              : "failed",
          value: formatNumber(maxAbs(periodIntegralDeviation)),
        },
        {
          row: "R_live_zero_mean_derivative_matrix",
          status: "open",
          value: "live-ledger-derivative-open",
        },
      ],
      first_failure_row: "live-ledger-derivative-open",
    },
    result: {
      intake_status: "zero-mean-correction-intake-staged",
      bounded_speed_live_ledger: "not_built",
      correction_direction: "not_found",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "This artifact packages the frozen zero-mean right-hand side for the live correction row. It does not assemble B, solve for alpha, build a bounded-speed live ledger, or retain a branch.",
    },
    not_retained_reason: [
      "live bounded-speed ledger is not built",
      "mean-row derivative matrix B is not assembled",
      "range and cokernel certificate is open",
      "correction direction is not found",
      "normal reconstruction, action, Noether, event, stability, and observer-export rows are not closed",
    ],
    candidate_b_range_probe: null,
    live_derivative_column_intake: null,
    live_derivative_column_preview_range_probe: null,
    live_derivative_matrix_certificate: null,
    live_correction_direction_certificate: null,
    speed_ode_primitive_feasibility_certificate: null,
    speed_ode_clock_length_certificate: null,
    normal_reconstruction_handoff: null,
    bounded_speed_normal_reconstruction_candidate: null,
    action_stability_after_normal_candidate_intake: null,
  };

  let packagedArtifact = artifact;
  if (candidateBPacket) {
    packagedArtifact = attachCandidateBRangeProbe(packagedArtifact, candidateBPacket, { rankTolerance, rangeTolerance });
  }
  if (liveDerivativeColumnPacket) {
    packagedArtifact = attachLiveDerivativeColumnIntake(packagedArtifact, liveDerivativeColumnPacket);
    if (probeLiveDerivativeColumnPreview) {
      packagedArtifact = attachLiveDerivativeColumnPreviewRangeProbe(packagedArtifact, { rankTolerance, rangeTolerance });
    }
  }
  if (liveDerivativeMatrixPacket) {
    packagedArtifact = attachLiveDerivativeMatrixCertificate(packagedArtifact, liveDerivativeMatrixPacket, {
      rankTolerance,
      rangeTolerance,
    });
  }
  if (liveCorrectionDirectionPacket) {
    packagedArtifact = attachLiveCorrectionDirectionCertificate(packagedArtifact, liveCorrectionDirectionPacket, {
      rankTolerance,
      rangeTolerance,
    });
  }
  if (speedPrimitiveFeasibilityPacket) {
    packagedArtifact = attachSpeedPrimitiveFeasibilityCertificate(packagedArtifact, speedPrimitiveFeasibilityPacket, {
      primitiveReturnTolerance,
      speedBandMarginFloor,
    });
  }
  if (speedClockLengthPacket) {
    packagedArtifact = attachSpeedClockLengthCertificate(packagedArtifact, speedClockLengthPacket, {
      clockLengthTolerance,
    });
  }
  if (normalReconstructionHandoffPacket) {
    packagedArtifact = attachNormalReconstructionHandoff(packagedArtifact, normalReconstructionHandoffPacket);
  }
  if (boundedSpeedNormalReconstructionCandidatePacket) {
    packagedArtifact = attachBoundedSpeedNormalReconstructionCandidate(
      packagedArtifact,
      boundedSpeedNormalReconstructionCandidatePacket
    );
  }
  if (actionStabilityAfterNormalCandidatePacket) {
    packagedArtifact = attachActionStabilityAfterNormalCandidateIntake(
      packagedArtifact,
      actionStabilityAfterNormalCandidatePacket
    );
  }
  return packagedArtifact;
}

export function validateOctahedralZeroMeanCorrectionIntake(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    `schema must be ${OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  const liveMatrixCertificate = artifact.live_derivative_matrix_certificate;
  const hasLiveMatrixCertificate = liveMatrixCertificate !== null && liveMatrixCertificate !== undefined;
  const liveCorrectionDirectionCertificate = artifact.live_correction_direction_certificate;
  const hasLiveCorrectionDirectionCertificate =
    liveCorrectionDirectionCertificate !== null && liveCorrectionDirectionCertificate !== undefined;
  const speedPrimitiveFeasibilityCertificate = artifact.speed_ode_primitive_feasibility_certificate;
  const hasSpeedPrimitiveFeasibilityCertificate =
    speedPrimitiveFeasibilityCertificate !== null && speedPrimitiveFeasibilityCertificate !== undefined;
  const speedClockLengthCertificate = artifact.speed_ode_clock_length_certificate;
  const hasSpeedClockLengthCertificate =
    speedClockLengthCertificate !== null && speedClockLengthCertificate !== undefined;
  const normalReconstructionHandoff = artifact.normal_reconstruction_handoff;
  const hasNormalReconstructionHandoff =
    normalReconstructionHandoff !== null && normalReconstructionHandoff !== undefined;
  const boundedSpeedNormalReconstructionCandidate = artifact.bounded_speed_normal_reconstruction_candidate;
  const hasBoundedSpeedNormalReconstructionCandidate =
    boundedSpeedNormalReconstructionCandidate !== null &&
    boundedSpeedNormalReconstructionCandidate !== undefined;
  const actionStabilityAfterNormalCandidateIntake =
    artifact.action_stability_after_normal_candidate_intake;
  const hasActionStabilityAfterNormalCandidateIntake =
    actionStabilityAfterNormalCandidateIntake !== null &&
    actionStabilityAfterNormalCandidateIntake !== undefined;
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(
    artifact.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must not certify a bounded-speed live ledger",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_live_derivative_matrix === hasLiveMatrixCertificate,
    "artifact live derivative matrix claim must match attached live matrix certificate",
    errors
  );
  assertField(
    artifact.artifact_claim?.emits_live_derivative_columns === false,
    "artifact must not emit live derivative columns",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_correction_direction === hasLiveCorrectionDirectionCertificate,
    "artifact correction direction claim must match attached correction direction certificate",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_speed_primitive_feasibility === hasSpeedPrimitiveFeasibilityCertificate,
    "artifact speed primitive feasibility claim must match attached speed primitive certificate",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_speed_clock_length === hasSpeedClockLengthCertificate,
    "artifact speed clock length claim must match attached speed clock length certificate",
    errors
  );
  assertField(
    artifact.artifact_claim?.emits_normal_reconstruction_handoff === hasNormalReconstructionHandoff,
    "artifact normal reconstruction handoff claim must match attached handoff",
    errors
  );
  assertField(
    artifact.artifact_claim?.emits_bounded_speed_normal_reconstruction_candidate ===
      hasBoundedSpeedNormalReconstructionCandidate,
    "artifact bounded speed normal reconstruction candidate claim must match attached candidate",
    errors
  );
  assertField(
    artifact.artifact_claim?.emits_action_stability_after_normal_candidate_intake ===
      hasActionStabilityAfterNormalCandidateIntake,
    "artifact action stability after normal candidate intake claim must match attached intake",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_normal_reconstruction === hasBoundedSpeedNormalReconstructionCandidate,
    "artifact normal reconstruction claim must match attached candidate",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_action_stability === false,
    "artifact must not certify action stability",
    errors
  );
  assertField(
    artifact.artifact_claim?.certifies_observer_export === false,
    "artifact must not certify observer export",
    errors
  );
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  assertField(
    artifact.source_diagnostic?.validation_status === "source-speed-diagnostic-valid",
    "source speed diagnostic must validate",
    errors
  );
  assertField(
    artifact.source_diagnostic?.mean_split_status === "frozen-fixed-ledger-mean-obstruction",
    "source mean split must preserve frozen mean obstruction",
    errors
  );
  assertField(
    artifact.source_diagnostic?.cross_binary_symmetry_certificate_status ===
      "analytic-cross-binary-phase-antiperiodicity-certified",
    "source cross-binary anti-periodicity certificate must be present",
    errors
  );
  assertField(
    artifact.source_diagnostic?.bounded_speed_handoff_status === "bounded-speed-ledger-handoff-open",
    "bounded-speed handoff must remain open",
    errors
  );

  const meanVector = artifact.frozen_mean_vector ?? {};
  const periodIntegralVector = meanVector.period_integral_vector ?? [];
  const rhsVector = artifact.linear_system_intake?.rhs_vector ?? [];
  assertField(
    Array.isArray(periodIntegralVector) && periodIntegralVector.length === RECEIVER_COUNT,
    "period integral vector must have six entries",
    errors
  );
  assertField(
    periodIntegralVector.every((value) => Number.isFinite(value) && value > 1),
    "period integral vector entries must be finite positive obstructions",
    errors
  );
  assertField(
    Array.isArray(rhsVector) && rhsVector.length === RECEIVER_COUNT,
    "right-hand-side vector must have six entries",
    errors
  );
  assertField(
    rhsVector.every((value, index) => Number.isFinite(value) && value === -periodIntegralVector[index]),
    "right-hand-side vector must be the negative frozen mean vector",
    errors
  );
  assertField(
    meanVector.constant_vector_status === "constant-six-vector-certified",
    "frozen mean vector must be certified constant",
    errors
  );
  assertField(
    Number.isFinite(meanVector.period_integral_deviation_abs_max) &&
      meanVector.period_integral_deviation_abs_max <= artifact.numerical_method?.constant_vector_tolerance,
    "period integral deviation must be inside tolerance",
    errors
  );
  assertField(
    meanVector.positivity_status === "positive-period-mean-certified",
    "constant mean must be positive",
    errors
  );

  const intake = artifact.linear_system_intake ?? {};
  assertField(intake.equation === "B*alpha=-M", "linear system equation must be B*alpha=-M", errors);
  assertField(
    intake.exact_range_condition ===
      "Since M=mu*1_6 with mu>0, first-order solvability is equivalent to 1_6 being in Range(B).",
    "linear system intake must state the exact constant-vector range condition",
    errors
  );
  assertField(
    Number.isFinite(intake.normalized_constant_covector?.projection_of_M) &&
      intake.normalized_constant_covector.projection_of_M > 2,
    "constant covector projection of M must be positive and nontrivial",
    errors
  );
  assertField(
    intake.normalized_constant_covector?.projection_of_rhs === -intake.normalized_constant_covector?.projection_of_M,
    "constant covector projection of rhs must be negative projection of M",
    errors
  );
  if (hasLiveMatrixCertificate) {
    assertField(
      intake.live_derivative_status === "live-derivative-matrix-certified",
      "live derivative status must record certified matrix when attached",
      errors
    );
    assertField(
      intake.range_certificate_status === "certified-live-rhs-in-range" ||
        intake.range_certificate_status === "certified-live-rhs-out-of-range",
      "range certificate must record certified live range verdict",
      errors
    );
    assertField(
      intake.correction_status === "correction-direction-open" ||
        intake.correction_status === "correction-obstruction-certified" ||
        intake.correction_status === "correction-direction-found",
      "correction status must reflect live range verdict",
      errors
    );
    assertField(
      Array.isArray(intake.derivative_matrix) && intake.derivative_matrix.length === RECEIVER_COUNT,
      "certified derivative matrix must be populated",
      errors
    );
    assertField(Number.isInteger(intake.rank), "certified derivative matrix rank must be populated", errors);
    assertField(Array.isArray(intake.range_residual), "certified range residual vector must be populated", errors);
    assertField(Array.isArray(intake.range_projection), "certified range projection vector must be populated", errors);
    assertField(
      intake.cokernel_projection?.claim_scope === "certified-live-cokernel-witness",
      "certified cokernel projection must be a live witness payload",
      errors
    );
    if (hasLiveCorrectionDirectionCertificate) {
      assertField(
        intake.correction_status === "correction-direction-found",
        "correction status must be found when a correction direction certificate is attached",
        errors
      );
      assertField(
        Array.isArray(intake.solution_alpha_vector) &&
          intake.solution_alpha_vector.length === liveMatrixCertificate.dimensions?.column_count,
        "correction direction must populate one alpha per live matrix column",
        errors
      );
      assertField(
        JSON.stringify(intake.alpha_b_vector) === JSON.stringify(intake.solution_alpha_vector) &&
          intake.alpha_b_certificate_schema === OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
        "alpha_B fields must mirror the correction direction certificate",
        errors
      );
      assertField(
        Number.isFinite(intake.solution_residual_norm_2) &&
          intake.solution_residual_norm_2 <= liveCorrectionDirectionCertificate?.tolerances?.range,
        "correction direction residual must be inside range tolerance",
        errors
      );
      assertField(
        intake.correction_direction_certificate_schema ===
          OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
        "correction direction certificate schema must populate linear system intake",
        errors
      );
    } else {
      assertField(intake.solution_alpha_vector === null, "solution alpha must stay null without correction certificate", errors);
      assertField(intake.alpha_b_vector === null, "alpha_B must stay null without correction certificate", errors);
      assertField(
        intake.correction_direction_certificate_schema === null,
        "correction direction certificate must stay null without correction certificate",
        errors
      );
    }
  } else {
    assertField(intake.live_derivative_status === "live-ledger-derivative-open", "live derivative status must stay open", errors);
    assertField(intake.range_certificate_status === "correction-rank-open", "range certificate must stay open", errors);
    assertField(intake.correction_status === "zero-mean-correction-open", "correction status must stay open", errors);
    assertField(intake.derivative_matrix === null, "derivative matrix must not be claimed", errors);
    assertField(intake.rank === null, "rank must not be claimed", errors);
    assertField(intake.range_residual === null, "range residual must not be claimed", errors);
    assertField(intake.range_projection === null, "range projection must not be claimed", errors);
    assertField(intake.cokernel_projection === null, "cokernel projection must not be claimed", errors);
    assertField(intake.alpha_b_vector === null, "alpha_B must not be claimed", errors);
    assertField(intake.solution_alpha_vector === null, "solution alpha must not be claimed", errors);
    assertField(
      intake.correction_direction_certificate_schema === null,
      "correction direction certificate must not be claimed",
      errors
    );
  }

  const probe = artifact.candidate_b_range_probe;
  if (probe !== null && probe !== undefined) {
    assertField(
      probe.schema === OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA,
      `candidate B range probe schema must be ${OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA}`,
      errors
    );
    assertField(
      probe.claim_scope === "candidate-range-probe-only",
      "candidate B range probe must keep candidate-range-probe-only scope",
      errors
    );
    assertField(
      probe.live_derivative_columns_claimed === false,
      "candidate B range probe must not claim live derivative columns",
      errors
    );
    assertField(probe.live_derivative_status === "live-ledger-derivative-open", "candidate probe must keep live derivative open", errors);
    assertField(probe.correction_status === "zero-mean-correction-open", "candidate probe must keep correction open", errors);
    assertField(probe.retention === "not_retained", "candidate probe must not retain a branch", errors);
    assertField(probe.dimensions?.row_count === RECEIVER_COUNT, "candidate probe must have six rows", errors);
    assertField(
      Number.isInteger(probe.dimensions?.column_count) && probe.dimensions.column_count >= 1,
      "candidate probe must have at least one column",
      errors
    );
    assertField(
      Number.isInteger(probe.matrix_rank) && probe.matrix_rank >= 0 && probe.matrix_rank <= RECEIVER_COUNT,
      "candidate probe rank must be recorded",
      errors
    );
    assertField(
      Number.isInteger(probe.augmented_rank_with_constant_direction) &&
        probe.augmented_rank_with_constant_direction >= probe.matrix_rank &&
        probe.augmented_rank_with_constant_direction <= RECEIVER_COUNT,
      "candidate probe augmented rank must be recorded",
      errors
    );
    assertField(Number.isFinite(probe.candidate_range_residual_norm_2), "candidate probe residual must be finite", errors);
    assertField(
      probe.range_membership_status === "candidate-rhs-in-range" ||
        probe.range_membership_status === "candidate-rhs-out-of-range",
      "candidate probe must report range membership status",
      errors
    );
    if (probe.range_membership_status === "candidate-rhs-in-range") {
      assertField(
        probe.candidate_range_residual_norm_2 <= probe.tolerances?.range,
        "passing candidate probe must put rhs inside range tolerance",
        errors
      );
    }
    if (probe.balanced_column_status === "candidate-columns-balanced") {
      assertField(
        probe.cokernel_obstruction_status === "left-null-constant-covector-obstructs" ||
          probe.range_membership_status === "candidate-rhs-in-range",
        "balanced candidate columns must either pass trivially or report constant-covector obstruction",
        errors
      );
    }
  }

  const liveColumnIntake = artifact.live_derivative_column_intake;
  if (liveColumnIntake !== null && liveColumnIntake !== undefined) {
    assertField(
      liveColumnIntake.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
      `live derivative column intake schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA}`,
      errors
    );
    assertField(
      liveColumnIntake.claim_scope === LIVE_DERIVATIVE_COLUMN_CLAIM_SCOPE,
      "live derivative column intake must keep live derivative column provenance scope",
      errors
    );
    assertField(
      liveColumnIntake.source_artifact_id === artifact.artifact_id,
      "live derivative column intake source_artifact_id must match artifact",
      errors
    );
    assertField(
      JSON.stringify(liveColumnIntake.row_labels) === JSON.stringify(meanVector.receiver_labels),
      "live derivative column intake row_labels must match frozen receiver labels",
      errors
    );
    assertField(
      liveColumnIntake.dimensions?.row_count === RECEIVER_COUNT &&
        Number.isInteger(liveColumnIntake.dimensions?.column_count) &&
        liveColumnIntake.dimensions.column_count >= 1,
      "live derivative column intake must record six rows and at least one column",
      errors
    );
    assertField(
      Array.isArray(liveColumnIntake.omitted_required_live_blocks) &&
        liveColumnIntake.omitted_required_live_blocks.length === 0,
      "live derivative column intake must have no omitted required live blocks",
      errors
    );
    assertField(
      liveColumnIntake.guard_status === "live-derivative-column-provenance-checked",
      "live derivative column intake guard status must be provenance checked",
      errors
    );
    assertField(
      liveColumnIntake.certifies_live_derivative_matrix === false,
      "live derivative column intake must not certify the live derivative matrix",
      errors
    );
    assertField(
      liveColumnIntake.certifies_bounded_speed_live_ledger === false,
      "live derivative column intake must not certify a bounded-speed live ledger",
      errors
    );
    assertField(
      liveColumnIntake.certifies_correction_direction === false,
      "live derivative column intake must not certify a correction direction",
      errors
    );
    assertField(
      liveColumnIntake.live_derivative_status === "live-ledger-derivative-open",
      "live derivative column intake must keep live derivative status open",
      errors
    );
    assertField(
      liveColumnIntake.correction_status === "zero-mean-correction-open",
      "live derivative column intake must keep correction open",
      errors
    );
    assertField(liveColumnIntake.retention === "not_retained", "live derivative column intake must not retain a branch", errors);
    assertField(
      Array.isArray(liveColumnIntake.column_matrix_preview) &&
        liveColumnIntake.column_matrix_preview.length === RECEIVER_COUNT &&
        liveColumnIntake.column_matrix_preview.every(
          (row) => Array.isArray(row) && row.length === liveColumnIntake.dimensions.column_count
        ),
      "live derivative column intake must expose a rectangular matrix preview",
      errors
    );
    if (!hasLiveMatrixCertificate) {
      assertField(
        intake.derivative_matrix === null &&
          intake.rank === null &&
          intake.range_residual === null &&
          intake.range_projection === null &&
          intake.cokernel_projection === null,
        "live derivative column intake must not populate linear_system_intake matrix or range fields",
        errors
      );
    }
  }

  const previewProbe = artifact.live_derivative_column_preview_range_probe;
  if (previewProbe !== null && previewProbe !== undefined) {
    assertField(
      liveColumnIntake !== null && liveColumnIntake !== undefined,
      "live derivative preview range probe requires live derivative column intake",
      errors
    );
    assertField(
      previewProbe.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA,
      `live derivative preview range probe schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA}`,
      errors
    );
    assertField(
      previewProbe.claim_scope === "live-derivative-column-preview-range-probe-only",
      "live derivative preview range probe must keep preview-only scope",
      errors
    );
    assertField(
      previewProbe.matrix_source === "live_derivative_column_intake.column_matrix_preview",
      "live derivative preview range probe must name the matrix preview source",
      errors
    );
    assertField(
      previewProbe.provenance_checked_column_preview === true,
      "live derivative preview range probe must declare provenance-checked preview",
      errors
    );
    assertField(
      previewProbe.source_guard_status === "live-derivative-column-provenance-checked",
      "live derivative preview range probe must consume provenance-checked columns",
      errors
    );
    assertField(
      JSON.stringify(previewProbe.row_labels) === JSON.stringify(meanVector.receiver_labels),
      "live derivative preview range probe row_labels must match frozen receiver labels",
      errors
    );
    assertField(
      previewProbe.certifies_live_derivative_matrix === false &&
        previewProbe.certifies_bounded_speed_live_ledger === false &&
        previewProbe.certifies_correction_direction === false,
      "live derivative preview range probe must not certify matrix, ledger, or correction direction",
      errors
    );
    assertField(
      previewProbe.live_derivative_status === "live-ledger-derivative-open" &&
        previewProbe.correction_status === "zero-mean-correction-open" &&
        previewProbe.retention === "not_retained",
      "live derivative preview range probe must keep live derivative, correction, and retention open",
      errors
    );
    assertField(
      Number.isFinite(previewProbe.preview_range_residual_norm_2),
      "live derivative preview range probe residual must be finite",
      errors
    );
    assertField(
      previewProbe.range_membership_status === "preview-rhs-in-range" ||
        previewProbe.range_membership_status === "preview-rhs-out-of-range",
      "live derivative preview range probe must report preview range membership",
      errors
    );
    const leastSquaresPreview = previewProbe.least_squares_preview;
    if (leastSquaresPreview !== null && leastSquaresPreview !== undefined) {
      assertField(
        leastSquaresPreview.claim_scope === "least-squares-preview-only",
        "least-squares preview must keep preview-only scope",
        errors
      );
      assertField(
        leastSquaresPreview.equation === "B_preview*alpha_preview=-m_frz",
        "least-squares preview must name the preview equation",
        errors
      );
      assertField(
        leastSquaresPreview.certifies_live_derivative_matrix === false &&
          leastSquaresPreview.certifies_bounded_speed_live_ledger === false &&
          leastSquaresPreview.certifies_correction_direction === false,
        "least-squares preview must not certify matrix, ledger, or correction direction",
        errors
      );
      assertField(
        leastSquaresPreview.correction_status === "zero-mean-correction-open" &&
          leastSquaresPreview.retention === "not_retained",
        "least-squares preview must keep correction open and branch not retained",
        errors
      );
      if (leastSquaresPreview.status === "least-squares-preview-computed") {
        assertField(
          Array.isArray(leastSquaresPreview.alpha_preview_vector) &&
            leastSquaresPreview.alpha_preview_vector.length === previewProbe.dimensions?.column_count,
          "computed least-squares preview must emit one alpha per preview column",
          errors
        );
        assertField(
          Number.isFinite(leastSquaresPreview.residual_norm_2) &&
            Number.isFinite(leastSquaresPreview.relative_residual),
          "computed least-squares preview must emit finite residuals",
          errors
        );
      } else {
        assertField(
          leastSquaresPreview.status === "least-squares-preview-rank-deficient-not-computed",
          "least-squares preview status must be computed or rank-deficient-not-computed",
          errors
        );
        assertField(
          leastSquaresPreview.alpha_preview_vector === null &&
            leastSquaresPreview.fitted_rhs_preview === null &&
            leastSquaresPreview.residual_vector === null,
          "rank-deficient least-squares preview must not emit alpha or fitted vectors",
          errors
        );
      }
    }
    const previewCokernelWitness = previewProbe.preview_cokernel_witness;
    if (previewCokernelWitness !== null && previewCokernelWitness !== undefined) {
      assertField(
        previewCokernelWitness.claim_scope === "preview-cokernel-witness-only",
        "preview cokernel witness must keep preview-only scope",
        errors
      );
      assertField(
        previewCokernelWitness.witness_source === "preview_range_residual",
        "preview cokernel witness must be derived from the preview range residual",
        errors
      );
      assertField(
        previewCokernelWitness.certifies_live_derivative_matrix === false &&
          previewCokernelWitness.certifies_bounded_speed_live_ledger === false &&
          previewCokernelWitness.certifies_correction_direction === false,
        "preview cokernel witness must not certify matrix, ledger, or correction direction",
        errors
      );
      assertField(
        previewCokernelWitness.correction_status === "zero-mean-correction-open" &&
          previewCokernelWitness.retention === "not_retained",
        "preview cokernel witness must keep correction open and branch not retained",
        errors
      );
      if (previewCokernelWitness.status === "preview-only-cokernel-witness") {
        assertField(
          Array.isArray(previewCokernelWitness.normalized_left_null_witness) &&
            previewCokernelWitness.normalized_left_null_witness.length === RECEIVER_COUNT,
          "emitted preview cokernel witness must have six normalized entries",
          errors
        );
        assertField(
          Number.isFinite(previewCokernelWitness.witness_dot_preview_columns_abs_max) &&
            Number.isFinite(previewCokernelWitness.witness_dot_rhs) &&
            Number.isFinite(previewCokernelWitness.witness_dot_m_frz) &&
            Number.isFinite(previewCokernelWitness.obstruction_magnitude),
          "emitted preview cokernel witness must have finite pairings",
          errors
        );
      } else {
        assertField(
          previewCokernelWitness.status === "preview-cokernel-witness-not-needed",
          "preview cokernel witness status must be emitted or not-needed",
          errors
        );
        assertField(
          previewCokernelWitness.normalized_left_null_witness === null &&
            previewCokernelWitness.witness_dot_preview_columns_abs_max === null &&
            previewCokernelWitness.witness_dot_rhs === null &&
            previewCokernelWitness.witness_dot_m_frz === null &&
            previewCokernelWitness.obstruction_magnitude === null,
          "not-needed preview cokernel witness must not emit a covector",
          errors
        );
      }
    }
    if (!hasLiveMatrixCertificate) {
      assertField(
        intake.derivative_matrix === null &&
          intake.rank === null &&
          intake.range_residual === null &&
          intake.range_projection === null &&
          intake.cokernel_projection === null,
        "live derivative preview range probe must not populate linear_system_intake matrix or range fields",
        errors
      );
    }
  }

  if (hasLiveMatrixCertificate) {
    assertField(
      liveMatrixCertificate.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
      `live derivative matrix certificate schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA}`,
      errors
    );
    assertField(
      liveMatrixCertificate.claim_scope === "live-derivative-matrix-range-certificate",
      "live derivative matrix certificate must keep range-certificate scope",
      errors
    );
    assertField(
      liveMatrixCertificate.guard_status === "same-ledger-live-derivative-matrix-certified",
      "live derivative matrix certificate guard status must certify same-ledger matrix",
      errors
    );
    assertField(
      JSON.stringify(liveMatrixCertificate.row_labels) === JSON.stringify(meanVector.receiver_labels),
      "live derivative matrix certificate row_labels must match frozen receiver labels",
      errors
    );
    assertField(
      liveMatrixCertificate.certifies_live_derivative_matrix === true &&
        liveMatrixCertificate.certifies_bounded_speed_live_ledger === false &&
        liveMatrixCertificate.certifies_correction_direction === false,
      "live derivative matrix certificate must certify only the matrix, not ledger or correction direction",
      errors
    );
    assertField(
      liveMatrixCertificate.live_derivative_status === "live-derivative-matrix-certified" &&
        liveMatrixCertificate.retention === "not_retained",
      "live derivative matrix certificate must certify matrix while keeping branch not retained",
      errors
    );
    assertField(
      Array.isArray(liveMatrixCertificate.derivative_matrix) &&
        liveMatrixCertificate.derivative_matrix.length === RECEIVER_COUNT &&
        liveMatrixCertificate.derivative_matrix.every(
          (row) => Array.isArray(row) && row.length === liveMatrixCertificate.dimensions?.column_count
        ),
      "live derivative matrix certificate must expose a rectangular derivative matrix",
      errors
    );
    assertField(
      Number.isInteger(liveMatrixCertificate.matrix_rank) &&
        liveMatrixCertificate.matrix_rank === intake.rank,
      "live derivative matrix certificate rank must populate linear_system_intake.rank",
      errors
    );
    assertField(
      JSON.stringify(liveMatrixCertificate.derivative_matrix) === JSON.stringify(intake.derivative_matrix),
      "live derivative matrix certificate must populate linear_system_intake.derivative_matrix",
      errors
    );
    assertField(
      JSON.stringify(liveMatrixCertificate.live_range_residual_vector) === JSON.stringify(intake.range_residual) &&
        JSON.stringify(liveMatrixCertificate.live_range_projection_vector) === JSON.stringify(intake.range_projection),
      "live derivative matrix certificate must populate range residual and projection",
      errors
    );
    assertField(
      liveMatrixCertificate.range_certificate_status === intake.range_certificate_status,
      "live derivative matrix certificate range status must populate linear system intake",
      errors
    );
    assertField(
      JSON.stringify(liveMatrixCertificate.certified_cokernel_witness) === JSON.stringify(intake.cokernel_projection),
      "live derivative matrix certificate cokernel witness must populate linear system intake",
      errors
    );
    assertField(
      liveMatrixCertificate.range_membership_status === "live-rhs-in-range" ||
        liveMatrixCertificate.range_membership_status === "live-rhs-out-of-range",
      "live derivative matrix certificate must report live range membership",
      errors
    );
    if (liveMatrixCertificate.range_membership_status === "live-rhs-in-range") {
      assertField(
        liveMatrixCertificate.live_range_residual_norm_2 <= liveMatrixCertificate.tolerances?.range,
        "passing live derivative matrix certificate must put rhs inside range tolerance",
        errors
      );
      assertField(
        liveMatrixCertificate.certified_cokernel_witness?.status === "live-cokernel-witness-not-needed",
        "passing live derivative matrix certificate must not emit a cokernel obstruction",
        errors
      );
    } else {
      assertField(
        liveMatrixCertificate.live_range_residual_norm_2 > liveMatrixCertificate.tolerances?.range,
        "failing live derivative matrix certificate must have residual outside range tolerance",
        errors
      );
      assertField(
        liveMatrixCertificate.certified_cokernel_witness?.status === "certified-live-cokernel-obstruction",
        "failing live derivative matrix certificate must emit a certified live cokernel obstruction",
        errors
      );
    }
  }

  if (hasLiveCorrectionDirectionCertificate) {
    assertField(hasLiveMatrixCertificate, "live correction direction certificate requires live matrix certificate", errors);
    assertField(
      liveCorrectionDirectionCertificate.schema === OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
      `live correction direction certificate schema must be ${OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA}`,
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.claim_scope === "live-correction-direction-certificate",
      "live correction direction certificate must keep correction-direction scope",
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.source_live_derivative_matrix_id === liveMatrixCertificate?.matrix_id,
      "live correction direction certificate must cite the attached live matrix id",
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.source_range_certificate_status === "certified-live-rhs-in-range",
      "live correction direction certificate must cite an in-range live matrix verdict",
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.guard_status === "first-order-correction-margins-passed",
      "live correction direction margins must pass",
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.certifies_live_derivative_matrix === true &&
        liveCorrectionDirectionCertificate.certifies_correction_direction === true &&
        liveCorrectionDirectionCertificate.certifies_bounded_speed_live_ledger === false,
      "live correction direction certificate must certify direction only, not bounded-speed live ledger",
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.correction_status === "correction-direction-found" &&
        liveCorrectionDirectionCertificate.downstream_status === "bounded-speed-live-ledger-open" &&
        liveCorrectionDirectionCertificate.retention === "not_retained",
      "live correction direction certificate must leave downstream ledger and retention open",
      errors
    );
    assertField(
      Array.isArray(liveCorrectionDirectionCertificate.alpha_b_vector) &&
        liveCorrectionDirectionCertificate.alpha_b_vector.length === liveMatrixCertificate?.dimensions?.column_count,
      "live correction direction certificate must emit one alpha per live matrix column",
      errors
    );
    assertField(
      JSON.stringify(liveCorrectionDirectionCertificate.alpha_b_vector) === JSON.stringify(intake.alpha_b_vector),
      "live correction direction alpha must populate linear system intake",
      errors
    );
    assertField(
      liveCorrectionDirectionCertificate.alpha_b_residual_norm_2 === intake.alpha_b_residual_norm_2 &&
        liveCorrectionDirectionCertificate.alpha_b_residual_norm_2 <= liveCorrectionDirectionCertificate.tolerances?.range,
      "live correction direction residual must populate linear system intake and stay inside tolerance",
      errors
    );
  }

  if (hasSpeedPrimitiveFeasibilityCertificate) {
    assertField(
      hasLiveCorrectionDirectionCertificate,
      "speed primitive feasibility certificate requires live correction direction certificate",
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.schema ===
        OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
      `speed primitive feasibility certificate schema must be ${OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA}`,
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.claim_scope === "speed-primitive-feasibility-certificate",
      "speed primitive feasibility certificate must keep primitive-feasibility scope",
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.source_correction_direction_id ===
        liveCorrectionDirectionCertificate?.direction_id,
      "speed primitive feasibility certificate must cite the attached correction direction",
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.guard_status === "speed-primitive-return-and-band-passed",
      "speed primitive feasibility guard status must pass",
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.speed_primitive_status === "speed-primitive-feasibility-certified" &&
        speedPrimitiveFeasibilityCertificate.downstream_status === "clock-length-return-open",
      "speed primitive feasibility certificate must stop at the clock-length return row",
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.certifies_live_derivative_matrix === true &&
        speedPrimitiveFeasibilityCertificate.certifies_correction_direction === true &&
        speedPrimitiveFeasibilityCertificate.certifies_speed_primitive_feasibility === true &&
        speedPrimitiveFeasibilityCertificate.certifies_bounded_speed_live_ledger === false,
      "speed primitive feasibility certificate must certify primitive feasibility only, not bounded-speed live ledger",
      errors
    );
    assertField(
      speedPrimitiveFeasibilityCertificate.retention === "not_retained" &&
        speedPrimitiveFeasibilityCertificate.retained_branch === false,
      "speed primitive feasibility certificate must not retain a branch",
      errors
    );
    assertField(
      Array.isArray(speedPrimitiveFeasibilityCertificate.receiver_primitives) &&
        speedPrimitiveFeasibilityCertificate.receiver_primitives.length === RECEIVER_COUNT,
      "speed primitive feasibility certificate must emit six primitive rows",
      errors
    );
    assertField(
      Number.isFinite(speedPrimitiveFeasibilityCertificate.primitive_return_residual_abs_max) &&
        speedPrimitiveFeasibilityCertificate.primitive_return_residual_abs_max <=
          speedPrimitiveFeasibilityCertificate.tolerances?.primitive_return,
      "speed primitive feasibility return residual must stay inside tolerance",
      errors
    );
    assertField(
      Number.isFinite(speedPrimitiveFeasibilityCertificate.speed_band_margin_min) &&
        speedPrimitiveFeasibilityCertificate.speed_band_margin_min >=
          speedPrimitiveFeasibilityCertificate.tolerances?.speed_band_margin_floor,
      "speed primitive feasibility band margin must stay above floor",
      errors
    );
  }

  if (hasSpeedClockLengthCertificate) {
    assertField(
      hasSpeedPrimitiveFeasibilityCertificate,
      "speed clock length certificate requires speed primitive feasibility certificate",
      errors
    );
    assertField(
      speedClockLengthCertificate.schema === OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
      `speed clock length certificate schema must be ${OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA}`,
      errors
    );
    assertField(
      speedClockLengthCertificate.claim_scope === "speed-clock-length-certificate",
      "speed clock length certificate must keep clock-length scope",
      errors
    );
    assertField(
      speedClockLengthCertificate.source_speed_primitive_feasibility_id ===
        speedPrimitiveFeasibilityCertificate?.primitive_id,
      "speed clock length certificate must cite the attached primitive feasibility certificate",
      errors
    );
    assertField(
      speedClockLengthCertificate.guard_status === "speed-clock-length-return-passed",
      "speed clock length guard status must pass",
      errors
    );
    assertField(
      speedClockLengthCertificate.speed_clock_length_status === "speed-clock-length-return-certified" &&
        speedClockLengthCertificate.downstream_status === "normal-reconstruction-open",
      "speed clock length certificate must stop at the normal reconstruction row",
      errors
    );
    assertField(
      speedClockLengthCertificate.certifies_live_derivative_matrix === true &&
        speedClockLengthCertificate.certifies_correction_direction === true &&
        speedClockLengthCertificate.certifies_speed_primitive_feasibility === true &&
        speedClockLengthCertificate.certifies_speed_clock_length === true &&
        speedClockLengthCertificate.certifies_bounded_speed_live_ledger === false,
      "speed clock length certificate must certify clock length only, not bounded-speed live ledger",
      errors
    );
    assertField(
      speedClockLengthCertificate.retention === "not_retained" &&
        speedClockLengthCertificate.retained_branch === false,
      "speed clock length certificate must not retain a branch",
      errors
    );
    assertField(
      Array.isArray(speedClockLengthCertificate.receiver_clock_length_rows) &&
        speedClockLengthCertificate.receiver_clock_length_rows.length === RECEIVER_COUNT,
      "speed clock length certificate must emit six clock/length rows",
      errors
    );
    assertField(
      Number.isFinite(speedClockLengthCertificate.length_return_residual_abs_max) &&
        speedClockLengthCertificate.length_return_residual_abs_max <=
          speedClockLengthCertificate.tolerances?.clock_length,
      "speed clock length residual must stay inside tolerance",
      errors
    );
    assertField(
      Number.isFinite(speedClockLengthCertificate.residual_mismatch_abs_max) &&
        speedClockLengthCertificate.residual_mismatch_abs_max <= speedClockLengthCertificate.tolerances?.clock_length,
      "speed clock length residual mismatch must stay inside tolerance",
      errors
    );
  }

  if (hasNormalReconstructionHandoff) {
    assertField(
      hasSpeedClockLengthCertificate,
      "normal reconstruction handoff requires speed clock length certificate",
      errors
    );
    assertField(
      normalReconstructionHandoff.schema === OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
      `normal reconstruction handoff schema must be ${OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA}`,
      errors
    );
    assertField(
      normalReconstructionHandoff.claim_scope === "normal-reconstruction-handoff",
      "normal reconstruction handoff must keep handoff scope",
      errors
    );
    assertField(
      normalReconstructionHandoff.source_speed_clock_length_id === speedClockLengthCertificate?.clock_length_id,
      "normal reconstruction handoff must cite the attached speed clock length certificate",
      errors
    );
    assertField(
      normalReconstructionHandoff.guard_status === "normal-reconstruction-handoff-staged" &&
        normalReconstructionHandoff.normal_reconstruction_handoff_status ===
          "normal-reconstruction-handoff-staged",
      "normal reconstruction handoff status must be staged",
      errors
    );
    assertField(
      normalReconstructionHandoff.normal_reconstruction_status === "normal-reconstruction-open" &&
        normalReconstructionHandoff.downstream_status === "normal-reconstruction-open",
      "normal reconstruction handoff must leave normal reconstruction open",
      errors
    );
    assertField(
      normalReconstructionHandoff.certifies_live_derivative_matrix === true &&
        normalReconstructionHandoff.certifies_correction_direction === true &&
        normalReconstructionHandoff.certifies_speed_primitive_feasibility === true &&
        normalReconstructionHandoff.certifies_speed_clock_length === true &&
        normalReconstructionHandoff.certifies_normal_reconstruction === false &&
        normalReconstructionHandoff.certifies_bounded_speed_live_ledger === false,
      "normal reconstruction handoff must not certify normal reconstruction or bounded-speed live ledger",
      errors
    );
    assertField(
      normalReconstructionHandoff.retention === "not_retained" &&
        normalReconstructionHandoff.retained_branch === false,
      "normal reconstruction handoff must not retain a branch",
      errors
    );
    assertField(
      Array.isArray(normalReconstructionHandoff.receiver_normal_handoff_rows) &&
        normalReconstructionHandoff.receiver_normal_handoff_rows.length === RECEIVER_COUNT,
      "normal reconstruction handoff must emit six handoff rows",
      errors
    );
    assertField(
      Number.isFinite(normalReconstructionHandoff.normal_residual_norm_2_max) &&
        Number.isFinite(normalReconstructionHandoff.tangent_holonomy_residual_norm_2_max) &&
        Number.isFinite(normalReconstructionHandoff.position_closure_residual_norm_2_max) &&
        Number.isFinite(normalReconstructionHandoff.unit_tangent_residual_abs_max) &&
        Number.isFinite(normalReconstructionHandoff.support_margin_min),
      "normal reconstruction handoff summaries must be finite",
      errors
    );
  }

  if (hasBoundedSpeedNormalReconstructionCandidate) {
    assertField(
      hasNormalReconstructionHandoff,
      "bounded speed normal reconstruction candidate requires normal reconstruction handoff",
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.schema ===
        OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
      `bounded speed normal reconstruction candidate schema must be ${OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA}`,
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.claim_scope === "bounded-speed-normal-reconstruction-candidate",
      "bounded speed normal reconstruction candidate must keep candidate scope",
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.source_normal_handoff_id ===
        normalReconstructionHandoff?.normal_handoff_id,
      "bounded speed normal reconstruction candidate must cite the attached normal reconstruction handoff",
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.guard_status ===
        "bounded-speed-normal-reconstruction-rows-closed" &&
        boundedSpeedNormalReconstructionCandidate.candidate_status ===
          "bounded-speed-normal-reconstruction-candidate",
      "bounded speed normal reconstruction candidate rows must be closed",
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.normal_reconstruction_status ===
        "bounded-speed-normal-reconstruction-candidate" &&
        boundedSpeedNormalReconstructionCandidate.downstream_status === "bounded-speed-live-ledger-open",
      "bounded speed normal reconstruction candidate must leave bounded-speed live ledger open",
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.certifies_live_derivative_matrix === true &&
        boundedSpeedNormalReconstructionCandidate.certifies_correction_direction === true &&
        boundedSpeedNormalReconstructionCandidate.certifies_speed_primitive_feasibility === true &&
        boundedSpeedNormalReconstructionCandidate.certifies_speed_clock_length === true &&
        boundedSpeedNormalReconstructionCandidate.certifies_normal_reconstruction === true &&
        boundedSpeedNormalReconstructionCandidate.certifies_bounded_speed_live_ledger === false,
      "bounded speed normal reconstruction candidate must certify normal rows only, not bounded-speed live ledger",
      errors
    );
    assertField(
      boundedSpeedNormalReconstructionCandidate.retention === "not_retained" &&
        boundedSpeedNormalReconstructionCandidate.retained_branch === false,
      "bounded speed normal reconstruction candidate must not retain a branch",
      errors
    );
    assertField(
      Array.isArray(boundedSpeedNormalReconstructionCandidate.receiver_normal_candidate_rows) &&
        boundedSpeedNormalReconstructionCandidate.receiver_normal_candidate_rows.length === RECEIVER_COUNT,
      "bounded speed normal reconstruction candidate must emit six candidate rows",
      errors
    );
    assertField(
      Number.isFinite(boundedSpeedNormalReconstructionCandidate.normal_residual_norm_2_max) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.tangent_holonomy_residual_norm_2_max) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.position_closure_residual_norm_2_max) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.unit_tangent_residual_abs_max) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.support_margin_min) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.noncollision_margin_min) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.root_persistence_margin_min) &&
        Number.isFinite(boundedSpeedNormalReconstructionCandidate.krawczyk_residual_norm_2_max),
      "bounded speed normal reconstruction candidate summaries must be finite",
      errors
    );
  }

  if (hasActionStabilityAfterNormalCandidateIntake) {
    assertField(
      hasBoundedSpeedNormalReconstructionCandidate,
      "action stability after normal candidate intake requires bounded speed normal reconstruction candidate",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.schema ===
        OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
      `action stability after normal candidate intake schema must be ${OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA}`,
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.claim_scope ===
        "bounded-speed-action-stability-after-normal-candidate-intake",
      "action stability after normal candidate intake must keep after-normal intake scope",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.source_normal_reconstruction_candidate_id ===
        boundedSpeedNormalReconstructionCandidate?.normal_reconstruction_candidate_id,
      "action stability after normal candidate intake must cite the attached normal candidate",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.normal_candidate_status ===
        "bounded-speed-normal-reconstruction-candidate",
      "action stability after normal candidate intake must consume the normal candidate status",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.live_ledger_status ===
        "bounded-speed-live-ledger-open" &&
        actionStabilityAfterNormalCandidateIntake.first_failure_row ===
          "bounded-speed-live-ledger-open",
      "action stability after normal candidate intake must stop at bounded-speed-live-ledger-open",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.bounded_speed_ledger_id ===
        boundedSpeedNormalReconstructionCandidate?.bounded_speed_ledger_id &&
        actionStabilityAfterNormalCandidateIntake.force_checksum_id ===
          boundedSpeedNormalReconstructionCandidate?.force_checksum_id &&
        actionStabilityAfterNormalCandidateIntake.consumer_checksum_id ===
          boundedSpeedNormalReconstructionCandidate?.consumer_checksum_id,
      "action stability after normal candidate intake must reuse the normal candidate ledger and checksums",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.live_ledger_identity?.bounded_speed_ledger_id ===
        boundedSpeedNormalReconstructionCandidate?.bounded_speed_ledger_id &&
        actionStabilityAfterNormalCandidateIntake.live_ledger_identity?.force_checksum_id ===
          boundedSpeedNormalReconstructionCandidate?.force_checksum_id &&
        actionStabilityAfterNormalCandidateIntake.live_ledger_identity?.consumer_checksum_id ===
          boundedSpeedNormalReconstructionCandidate?.consumer_checksum_id &&
        actionStabilityAfterNormalCandidateIntake.live_ledger_identity?.certification_status ===
          "bounded-speed-live-ledger-open",
      "action stability after normal candidate intake live ledger identity must carry the normal candidate ledger boundary",
      errors
    );
    errors.push(
      ...boundedSpeedLiveLedgerTargetValidationErrors(
        boundedSpeedNormalReconstructionCandidate,
        actionStabilityAfterNormalCandidateIntake.bounded_speed_live_ledger
      )
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.certifies_live_derivative_matrix === true &&
        actionStabilityAfterNormalCandidateIntake.certifies_correction_direction === true &&
        actionStabilityAfterNormalCandidateIntake.certifies_speed_primitive_feasibility === true &&
        actionStabilityAfterNormalCandidateIntake.certifies_speed_clock_length === true &&
        actionStabilityAfterNormalCandidateIntake.certifies_normal_reconstruction === true &&
        actionStabilityAfterNormalCandidateIntake.certifies_bounded_speed_live_ledger === false &&
        actionStabilityAfterNormalCandidateIntake.certifies_action_stability === false &&
        actionStabilityAfterNormalCandidateIntake.certifies_observer_export === false,
      "action stability after normal candidate intake must preserve the prior chain without certifying live ledger, action stability, or observer export",
      errors
    );
    assertField(
      actionStabilityAfterNormalCandidateIntake.retention === "not_retained" &&
        actionStabilityAfterNormalCandidateIntake.retained_branch === false,
      "action stability after normal candidate intake must not retain a branch",
      errors
    );
    const downstreamRows =
      actionStabilityAfterNormalCandidateIntake.downstream_row_statuses ?? {};
    for (const row of REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS) {
      assertField(
        downstreamRows?.[row] === "blocked:bounded-speed-live-ledger-open",
        `action stability after normal candidate downstream row ${row} must remain blocked by bounded-speed-live-ledger-open`,
        errors
      );
    }
  }

  const derivativeAudit = artifact.derivative_column_audit ?? {};
  if (hasLiveMatrixCertificate) {
    assertField(
      derivativeAudit.live_derivative_columns_claimed === true &&
        derivativeAudit.status === "live-derivative-matrix-certified",
      "derivative audit must record certified live derivative matrix",
      errors
    );
    assertField(
      Array.isArray(derivativeAudit.included_column_blocks) &&
        missingRequiredEntries(REQUIRED_LIVE_DERIVATIVE_BLOCKS, derivativeAudit.included_column_blocks).length === 0,
      "certified derivative audit must include required live blocks",
      errors
    );
    assertField(
      Array.isArray(derivativeAudit.omitted_required_live_blocks) &&
        derivativeAudit.omitted_required_live_blocks.length === 0,
      "certified derivative audit must omit no required live blocks",
      errors
    );
    assertField(
      artifact.residual_vector?.first_failure_row === "correction-direction-open" ||
        artifact.residual_vector?.first_failure_row === "correction-obstruction-certified" ||
        artifact.residual_vector?.first_failure_row === "bounded-speed-live-ledger-open" ||
        artifact.residual_vector?.first_failure_row === "clock-length-return-open" ||
        artifact.residual_vector?.first_failure_row === "normal-reconstruction-open",
      "first failure row must advance past live derivative open when matrix is certified",
      errors
    );
  } else {
    assertField(
      derivativeAudit.live_derivative_columns_claimed === false,
      "live derivative columns must not be claimed",
      errors
    );
    assertField(
      Array.isArray(derivativeAudit.included_column_blocks) && derivativeAudit.included_column_blocks.length === 0,
      "included derivative column blocks must be empty",
      errors
    );
    assertField(
      Array.isArray(derivativeAudit.omitted_required_live_blocks) &&
        derivativeAudit.omitted_required_live_blocks.includes("clock") &&
        derivativeAudit.omitted_required_live_blocks.includes("event"),
      "omitted derivative column audit must list required live blocks",
      errors
    );
    assertField(
      artifact.residual_vector?.first_failure_row === "live-ledger-derivative-open",
      "first failure row must be live-ledger-derivative-open",
      errors
    );
  }
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs [options]",
    "",
    "Options:",
    "  --samples <n>              Periodic phase samples over [0, 2*pi) (default: 720)",
    "  --subdivisions <n>         Root-search subdivisions over 0 < y <= 2 (default: 720)",
    "  --constant-vector-tol <x>  Constant-vector tolerance (default: 1e-9)",
    "  --rank-tol <x>             Candidate rank tolerance (default: 1e-10)",
    "  --range-tol <x>            Candidate range-check tolerance (default: 1e-9)",
    "  --primitive-return-tol <x> Primitive return residual tolerance (default: 1e-9)",
    "  --speed-band-margin-floor <x>",
    "                             Minimum allowed speed-band margin (default: 0)",
    "  --clock-length-tol <x>     Clock/length return residual tolerance (default: 1e-9)",
    "  --candidate-b <path>       Candidate B packet JSON for an algebraic range probe",
    "  --live-derivative-columns <path>",
    "                             Live derivative column provenance packet JSON",
    "  --probe-live-derivative-preview",
    "                             Range-probe the provenance-checked column matrix preview without certifying B",
    "  --live-derivative-matrix <path>",
    "                             Same-ledger live derivative matrix certificate JSON",
    "  --live-correction-direction <path>",
    "                             First-order correction direction certificate JSON",
    "  --speed-primitive-feasibility <path>",
    "                             Post-correction speed primitive feasibility certificate JSON",
    "  --speed-clock-length <path>",
    "                             Post-correction speed clock/length return certificate JSON",
    "  --normal-reconstruction-handoff <path>",
    "                             Post-correction normal reconstruction handoff packet JSON",
    "  --bounded-speed-normal-reconstruction-candidate <path>",
    "                             Bounded-speed normal reconstruction candidate packet JSON",
    "  --action-stability-after-normal-candidate <path>",
    "                             Fail-closed action/stability intake packet after the normal candidate",
    "  --out <path>               Write artifact JSON to path instead of stdout",
    "  --validate <path>          Validate an existing artifact JSON file",
    "  --schema                   Print the artifact schema identifier",
    "  --pretty                   Pretty-print JSON output",
    "  --help                     Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    constantVectorTolerance: DEFAULT_CONSTANT_VECTOR_TOLERANCE,
    rankTolerance: DEFAULT_RANK_TOLERANCE,
    rangeTolerance: DEFAULT_RANGE_TOLERANCE,
    primitiveReturnTolerance: DEFAULT_PRIMITIVE_RETURN_TOLERANCE,
    speedBandMarginFloor: DEFAULT_SPEED_BAND_MARGIN_FLOOR,
    clockLengthTolerance: DEFAULT_CLOCK_LENGTH_TOLERANCE,
    candidateBPath: null,
    liveDerivativeColumnPath: null,
    probeLiveDerivativeColumnPreview: false,
    liveDerivativeMatrixPath: null,
    liveCorrectionDirectionPath: null,
    speedPrimitiveFeasibilityPath: null,
    speedClockLengthPath: null,
    normalReconstructionHandoffPath: null,
    boundedSpeedNormalReconstructionCandidatePath: null,
    actionStabilityAfterNormalCandidatePath: null,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.phaseSamples = argv[++index];
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = argv[++index];
    } else if (arg === "--constant-vector-tol") {
      args.constantVectorTolerance = argv[++index];
    } else if (arg === "--rank-tol") {
      args.rankTolerance = argv[++index];
    } else if (arg === "--range-tol") {
      args.rangeTolerance = argv[++index];
    } else if (arg === "--primitive-return-tol") {
      args.primitiveReturnTolerance = argv[++index];
    } else if (arg === "--speed-band-margin-floor") {
      args.speedBandMarginFloor = argv[++index];
    } else if (arg === "--clock-length-tol") {
      args.clockLengthTolerance = argv[++index];
    } else if (arg === "--candidate-b") {
      args.candidateBPath = argv[++index];
    } else if (arg === "--live-derivative-columns") {
      args.liveDerivativeColumnPath = argv[++index];
    } else if (arg === "--probe-live-derivative-preview") {
      args.probeLiveDerivativeColumnPreview = true;
    } else if (arg === "--live-derivative-matrix") {
      args.liveDerivativeMatrixPath = argv[++index];
    } else if (arg === "--live-correction-direction") {
      args.liveCorrectionDirectionPath = argv[++index];
    } else if (arg === "--speed-primitive-feasibility") {
      args.speedPrimitiveFeasibilityPath = argv[++index];
    } else if (arg === "--speed-clock-length") {
      args.speedClockLengthPath = argv[++index];
    } else if (arg === "--normal-reconstruction-handoff") {
      args.normalReconstructionHandoffPath = argv[++index];
    } else if (arg === "--bounded-speed-normal-reconstruction-candidate") {
      args.boundedSpeedNormalReconstructionCandidatePath = argv[++index];
    } else if (arg === "--action-stability-after-normal-candidate") {
      args.actionStabilityAfterNormalCandidatePath = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function emitJson(payload, pretty) {
  return JSON.stringify(payload, null, pretty ? 2 : 0);
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.schema) {
    console.log(
      emitJson(
        {
          artifact_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
          source_schema: OCTAHEDRAL_SPEED_ODE_DIAGNOSTIC_SCHEMA,
          candidate_b_schema: OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
          candidate_b_range_probe_schema: OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA,
          live_derivative_column_intake_schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
          live_derivative_column_preview_range_probe_schema:
            OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA,
          live_derivative_matrix_certificate_schema:
            OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
          live_correction_direction_certificate_schema:
            OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
          speed_primitive_feasibility_certificate_schema:
            OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
          speed_clock_length_certificate_schema: OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
          normal_reconstruction_handoff_schema: OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
          bounded_speed_normal_reconstruction_candidate_schema:
            OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
          action_stability_after_normal_candidate_intake_schema:
            OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
          candidate_b_support: "optional candidate B packet checked only as an algebraic range probe",
          live_derivative_column_support:
            "optional live derivative column packet checked only as provenance intake, not as a certified live derivative matrix",
          live_derivative_column_preview_range_probe_support:
            "optional range probe of provenance-checked live derivative column matrix preview, not a certified live derivative matrix",
          live_derivative_matrix_certificate_support:
            "optional same-ledger derivative matrix certificate that may populate linear_system_intake matrix, rank, projection, and residual fields while retaining no branch",
          live_correction_direction_certificate_support:
            "optional first-order correction direction certificate that requires a certified live matrix range pass and still retains no branch",
          speed_primitive_feasibility_certificate_support:
            "optional post-correction speed primitive return and speed-band feasibility certificate that requires a certified correction direction and still retains no branch",
          speed_clock_length_certificate_support:
            "optional post-correction speed clock/length return certificate that requires primitive feasibility and still retains no branch",
          normal_reconstruction_handoff_support:
            "optional normal reconstruction handoff packet that requires speed clock/length return and still certifies neither normal reconstruction nor a retained branch",
          bounded_speed_normal_reconstruction_candidate_support:
            "optional bounded-speed normal reconstruction candidate packet that requires normal reconstruction handoff and still certifies neither a bounded-speed live ledger nor a retained branch",
          action_stability_after_normal_candidate_intake_support:
            "optional after-normal action/stability intake packet that consumes the bounded-speed normal candidate and fails closed at bounded-speed-live-ledger-open without certifying action stability, observer export, or retained branch",
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralZeroMeanCorrectionIntake(artifact);
    const candidateBPacket = args.candidateBPath ? readCandidateBPacket(args.candidateBPath) : null;
    const liveDerivativeColumnPacket = args.liveDerivativeColumnPath
      ? readLiveDerivativeColumnPacket(args.liveDerivativeColumnPath)
      : null;
    const liveDerivativeMatrixPacket = args.liveDerivativeMatrixPath
      ? readLiveDerivativeMatrixPacket(args.liveDerivativeMatrixPath)
      : null;
    const liveCorrectionDirectionPacket = args.liveCorrectionDirectionPath
      ? readLiveCorrectionDirectionPacket(args.liveCorrectionDirectionPath)
      : null;
    const speedPrimitiveFeasibilityPacket = args.speedPrimitiveFeasibilityPath
      ? readSpeedPrimitiveFeasibilityPacket(args.speedPrimitiveFeasibilityPath)
      : null;
    const speedClockLengthPacket = args.speedClockLengthPath ? readSpeedClockLengthPacket(args.speedClockLengthPath) : null;
    const normalReconstructionHandoffPacket = args.normalReconstructionHandoffPath
      ? readNormalReconstructionHandoffPacket(args.normalReconstructionHandoffPath)
      : null;
    const boundedSpeedNormalReconstructionCandidatePacket = args.boundedSpeedNormalReconstructionCandidatePath
      ? readBoundedSpeedNormalReconstructionCandidatePacket(args.boundedSpeedNormalReconstructionCandidatePath)
      : null;
    const actionStabilityAfterNormalCandidatePacket = args.actionStabilityAfterNormalCandidatePath
      ? readActionStabilityAfterNormalCandidatePacket(args.actionStabilityAfterNormalCandidatePath)
      : null;
    const candidateBRangeProbe =
      candidateBPacket && errors.length === 0
        ? evaluateCandidateBRangeProbe(artifact, candidateBPacket, {
            rankTolerance: args.rankTolerance,
            rangeTolerance: args.rangeTolerance,
          })
        : artifact.candidate_b_range_probe ?? null;
    const liveDerivativeColumnIntake =
      liveDerivativeColumnPacket && errors.length === 0
        ? evaluateLiveDerivativeColumnIntake(artifact, liveDerivativeColumnPacket)
        : artifact.live_derivative_column_intake ?? null;
    const liveDerivativeColumnPreviewRangeProbe =
      liveDerivativeColumnPacket && args.probeLiveDerivativeColumnPreview && errors.length === 0
        ? evaluateLiveDerivativeColumnPreviewRangeProbeFromIntake(artifact, liveDerivativeColumnIntake, {
            rankTolerance: args.rankTolerance,
            rangeTolerance: args.rangeTolerance,
          })
        : artifact.live_derivative_column_preview_range_probe ?? null;
    const liveDerivativeMatrixCertificate =
      liveDerivativeMatrixPacket && errors.length === 0
        ? evaluateLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
            rankTolerance: args.rankTolerance,
            rangeTolerance: args.rangeTolerance,
          })
        : artifact.live_derivative_matrix_certificate ?? null;
    const liveCorrectionDirectionCertificate =
      liveCorrectionDirectionPacket && errors.length === 0
        ? evaluateLiveCorrectionDirectionCertificate(
            liveDerivativeMatrixCertificate && !artifact.live_derivative_matrix_certificate
              ? attachLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
                  rankTolerance: args.rankTolerance,
                  rangeTolerance: args.rangeTolerance,
                })
              : artifact,
            liveCorrectionDirectionPacket,
            {
              rankTolerance: args.rankTolerance,
              rangeTolerance: args.rangeTolerance,
            }
          )
        : artifact.live_correction_direction_certificate ?? null;
    const speedPrimitiveFeasibilityCertificate =
      speedPrimitiveFeasibilityPacket && errors.length === 0
        ? evaluateSpeedPrimitiveFeasibilityCertificate(
            liveCorrectionDirectionCertificate && !artifact.live_correction_direction_certificate
              ? attachLiveCorrectionDirectionCertificate(
                  liveDerivativeMatrixCertificate && !artifact.live_derivative_matrix_certificate
                    ? attachLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
                        rankTolerance: args.rankTolerance,
                        rangeTolerance: args.rangeTolerance,
                      })
                    : artifact,
                  liveCorrectionDirectionPacket,
                  {
                    rankTolerance: args.rankTolerance,
                    rangeTolerance: args.rangeTolerance,
                  }
                )
              : artifact,
            speedPrimitiveFeasibilityPacket,
            {
              primitiveReturnTolerance: args.primitiveReturnTolerance,
              speedBandMarginFloor: args.speedBandMarginFloor,
            }
          )
        : artifact.speed_ode_primitive_feasibility_certificate ?? null;
    const speedClockLengthCertificate =
      speedClockLengthPacket && errors.length === 0
        ? evaluateSpeedClockLengthCertificate(
            speedPrimitiveFeasibilityCertificate && !artifact.speed_ode_primitive_feasibility_certificate
              ? attachSpeedPrimitiveFeasibilityCertificate(
                  liveCorrectionDirectionCertificate && !artifact.live_correction_direction_certificate
                    ? attachLiveCorrectionDirectionCertificate(
                        liveDerivativeMatrixCertificate && !artifact.live_derivative_matrix_certificate
                          ? attachLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
                              rankTolerance: args.rankTolerance,
                              rangeTolerance: args.rangeTolerance,
                            })
                          : artifact,
                        liveCorrectionDirectionPacket,
                        {
                          rankTolerance: args.rankTolerance,
                          rangeTolerance: args.rangeTolerance,
                        }
                      )
                    : artifact,
                  speedPrimitiveFeasibilityPacket,
                  {
                    primitiveReturnTolerance: args.primitiveReturnTolerance,
                    speedBandMarginFloor: args.speedBandMarginFloor,
                  }
                )
              : artifact,
            speedClockLengthPacket,
            {
              clockLengthTolerance: args.clockLengthTolerance,
            }
          )
        : artifact.speed_ode_clock_length_certificate ?? null;
    const normalReconstructionHandoff =
      normalReconstructionHandoffPacket && errors.length === 0
        ? evaluateNormalReconstructionHandoff(
            speedClockLengthCertificate && !artifact.speed_ode_clock_length_certificate
              ? attachSpeedClockLengthCertificate(
                  speedPrimitiveFeasibilityCertificate && !artifact.speed_ode_primitive_feasibility_certificate
                    ? attachSpeedPrimitiveFeasibilityCertificate(
                        liveCorrectionDirectionCertificate && !artifact.live_correction_direction_certificate
                          ? attachLiveCorrectionDirectionCertificate(
                              liveDerivativeMatrixCertificate && !artifact.live_derivative_matrix_certificate
                                ? attachLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
                                    rankTolerance: args.rankTolerance,
                                    rangeTolerance: args.rangeTolerance,
                                  })
                                : artifact,
                              liveCorrectionDirectionPacket,
                              {
                                rankTolerance: args.rankTolerance,
                                rangeTolerance: args.rangeTolerance,
                              }
                            )
                          : artifact,
                        speedPrimitiveFeasibilityPacket,
                        {
                          primitiveReturnTolerance: args.primitiveReturnTolerance,
                          speedBandMarginFloor: args.speedBandMarginFloor,
                        }
                      )
                    : artifact,
                  speedClockLengthPacket,
                  {
                    clockLengthTolerance: args.clockLengthTolerance,
                  }
                )
              : artifact,
            normalReconstructionHandoffPacket
          )
        : artifact.normal_reconstruction_handoff ?? null;
    const boundedSpeedNormalReconstructionCandidate =
      boundedSpeedNormalReconstructionCandidatePacket && errors.length === 0
        ? evaluateBoundedSpeedNormalReconstructionCandidate(
            normalReconstructionHandoff && !artifact.normal_reconstruction_handoff
              ? attachNormalReconstructionHandoff(
                  speedClockLengthCertificate && !artifact.speed_ode_clock_length_certificate
                    ? attachSpeedClockLengthCertificate(
                        speedPrimitiveFeasibilityCertificate && !artifact.speed_ode_primitive_feasibility_certificate
                          ? attachSpeedPrimitiveFeasibilityCertificate(
                              liveCorrectionDirectionCertificate && !artifact.live_correction_direction_certificate
                                ? attachLiveCorrectionDirectionCertificate(
                                    liveDerivativeMatrixCertificate && !artifact.live_derivative_matrix_certificate
                                      ? attachLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
                                          rankTolerance: args.rankTolerance,
                                          rangeTolerance: args.rangeTolerance,
                                        })
                                      : artifact,
                                    liveCorrectionDirectionPacket,
                                    {
                                      rankTolerance: args.rankTolerance,
                                      rangeTolerance: args.rangeTolerance,
                                    }
                                  )
                                : artifact,
                              speedPrimitiveFeasibilityPacket,
                              {
                                primitiveReturnTolerance: args.primitiveReturnTolerance,
                                speedBandMarginFloor: args.speedBandMarginFloor,
                              }
                            )
                          : artifact,
                        speedClockLengthPacket,
                        {
                          clockLengthTolerance: args.clockLengthTolerance,
                        }
                      )
                    : artifact,
                  normalReconstructionHandoffPacket
                )
              : artifact,
            boundedSpeedNormalReconstructionCandidatePacket
          )
        : artifact.bounded_speed_normal_reconstruction_candidate ?? null;
    const actionStabilityAfterNormalCandidateIntake =
      actionStabilityAfterNormalCandidatePacket && errors.length === 0
        ? evaluateActionStabilityAfterNormalCandidateIntake(
            boundedSpeedNormalReconstructionCandidate &&
              !artifact.bounded_speed_normal_reconstruction_candidate
              ? attachBoundedSpeedNormalReconstructionCandidate(
                  normalReconstructionHandoff && !artifact.normal_reconstruction_handoff
                    ? attachNormalReconstructionHandoff(
                        speedClockLengthCertificate && !artifact.speed_ode_clock_length_certificate
                          ? attachSpeedClockLengthCertificate(
                              speedPrimitiveFeasibilityCertificate &&
                                !artifact.speed_ode_primitive_feasibility_certificate
                                ? attachSpeedPrimitiveFeasibilityCertificate(
                                    liveCorrectionDirectionCertificate &&
                                      !artifact.live_correction_direction_certificate
                                      ? attachLiveCorrectionDirectionCertificate(
                                          liveDerivativeMatrixCertificate &&
                                            !artifact.live_derivative_matrix_certificate
                                            ? attachLiveDerivativeMatrixCertificate(artifact, liveDerivativeMatrixPacket, {
                                                rankTolerance: args.rankTolerance,
                                                rangeTolerance: args.rangeTolerance,
                                              })
                                            : artifact,
                                          liveCorrectionDirectionPacket,
                                          {
                                            rankTolerance: args.rankTolerance,
                                            rangeTolerance: args.rangeTolerance,
                                          }
                                        )
                                      : artifact,
                                    speedPrimitiveFeasibilityPacket,
                                    {
                                      primitiveReturnTolerance: args.primitiveReturnTolerance,
                                      speedBandMarginFloor: args.speedBandMarginFloor,
                                    }
                                  )
                                : artifact,
                              speedClockLengthPacket,
                              {
                                clockLengthTolerance: args.clockLengthTolerance,
                              }
                            )
                          : artifact,
                        normalReconstructionHandoffPacket
                      )
                    : artifact,
                  boundedSpeedNormalReconstructionCandidatePacket
                )
              : artifact,
            actionStabilityAfterNormalCandidatePacket
          )
        : artifact.action_stability_after_normal_candidate_intake ?? null;
    console.log(
      emitJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema ?? null,
          result: artifact.result ?? null,
          frozen_mean_vector: artifact.frozen_mean_vector ?? null,
          linear_system_intake: artifact.linear_system_intake ?? null,
          candidate_b_range_probe: candidateBRangeProbe,
          live_derivative_column_intake: liveDerivativeColumnIntake,
          live_derivative_column_preview_range_probe: liveDerivativeColumnPreviewRangeProbe,
          live_derivative_matrix_certificate: liveDerivativeMatrixCertificate,
          live_correction_direction_certificate: liveCorrectionDirectionCertificate,
          speed_ode_primitive_feasibility_certificate: speedPrimitiveFeasibilityCertificate,
          speed_ode_clock_length_certificate: speedClockLengthCertificate,
          normal_reconstruction_handoff: normalReconstructionHandoff,
          bounded_speed_normal_reconstruction_candidate: boundedSpeedNormalReconstructionCandidate,
          action_stability_after_normal_candidate_intake: actionStabilityAfterNormalCandidateIntake,
        },
        args.pretty
      )
    );
    return;
  }

  const candidateBPacket = args.candidateBPath ? readCandidateBPacket(args.candidateBPath) : null;
  const liveDerivativeColumnPacket = args.liveDerivativeColumnPath
    ? readLiveDerivativeColumnPacket(args.liveDerivativeColumnPath)
    : null;
  const liveDerivativeMatrixPacket = args.liveDerivativeMatrixPath
    ? readLiveDerivativeMatrixPacket(args.liveDerivativeMatrixPath)
    : null;
  const liveCorrectionDirectionPacket = args.liveCorrectionDirectionPath
    ? readLiveCorrectionDirectionPacket(args.liveCorrectionDirectionPath)
    : null;
  const speedPrimitiveFeasibilityPacket = args.speedPrimitiveFeasibilityPath
    ? readSpeedPrimitiveFeasibilityPacket(args.speedPrimitiveFeasibilityPath)
    : null;
  const speedClockLengthPacket = args.speedClockLengthPath ? readSpeedClockLengthPacket(args.speedClockLengthPath) : null;
  const normalReconstructionHandoffPacket = args.normalReconstructionHandoffPath
    ? readNormalReconstructionHandoffPacket(args.normalReconstructionHandoffPath)
    : null;
  const boundedSpeedNormalReconstructionCandidatePacket = args.boundedSpeedNormalReconstructionCandidatePath
    ? readBoundedSpeedNormalReconstructionCandidatePacket(args.boundedSpeedNormalReconstructionCandidatePath)
    : null;
  const actionStabilityAfterNormalCandidatePacket = args.actionStabilityAfterNormalCandidatePath
    ? readActionStabilityAfterNormalCandidatePacket(args.actionStabilityAfterNormalCandidatePath)
    : null;
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    ...args,
    candidateBPacket,
    liveDerivativeColumnPacket,
    liveDerivativeMatrixPacket,
    liveCorrectionDirectionPacket,
    speedPrimitiveFeasibilityPacket,
    speedClockLengthPacket,
    normalReconstructionHandoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket,
    actionStabilityAfterNormalCandidatePacket,
  });
  const errors = validateOctahedralZeroMeanCorrectionIntake(artifact);
  if (errors.length > 0) {
    throw new Error(`generated artifact failed validation: ${errors.join("; ")}`);
  }
  const output = emitJson(artifact, args.pretty);
  if (args.out) {
    fs.writeFileSync(args.out, `${output}\n`);
  } else {
    console.log(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  main();
}
