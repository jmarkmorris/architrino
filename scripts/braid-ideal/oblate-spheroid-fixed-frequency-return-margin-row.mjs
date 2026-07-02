import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  FIRST_MISSING_FIELD as REDUCED_FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT as REDUCED_FIRST_MISSING_OBJECT,
  buildOblateSpheroidReducedResidualRow,
} from "./oblate-spheroid-reduced-residual-row.mjs";

export const SCHEMA = "oblate_spheroid_fixed_frequency_return_margin_row.v0";
export const FIRST_MISSING_OBJECT = REDUCED_FIRST_MISSING_OBJECT;
export const FIRST_MISSING_FIELD = REDUCED_FIRST_MISSING_FIELD;

const TWO_PI = 2 * Math.PI;
const EPSILON = 1e-12;

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_retained_evidence",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_fixed_frequency_return_margin_evidence",
  diagnostic: "diagnostic_not_accepted_fixed_frequency_return_margin_evidence",
  priority_prose: "priority_prose_not_accepted_fixed_frequency_return_margin_evidence",
  generated_decoy: "generated_decoy_not_accepted_fixed_frequency_return_margin_evidence",
  proxy_row: "proxy_row_not_accepted_fixed_frequency_return_margin_evidence",
  candidate_ref: "candidate_ref_not_accepted_fixed_frequency_return_margin_evidence",
  aggregate_row: "aggregate_row_not_same_record_fixed_frequency_return_margin_evidence",
  h39_theta3minus_quotient_row:
    "h39_theta3minus_row_not_braid_ideal_fixed_frequency_return_margin_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_fixed_frequency_return_margin_evidence",
  temp_probe: "temp_probe_not_accepted_fixed_frequency_return_margin_evidence",
  t3_row: "t3_row_not_braid_ideal_fixed_frequency_return_margin_evidence",
  endpoint_only_row: "endpoint_only_row_not_fixed_frequency_return_margin_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_fixed_frequency_return_margin_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_fixed_frequency_return_margin_evidence",
  generic_spheroid_display_metadata_without_same_record_binding:
    "generic_spheroid_display_metadata_without_same_record_binding_not_fixed_frequency_return_margin_evidence",
  earlier_fail_closed_adapter_row: "earlier_fail_closed_adapter_row_not_fixed_frequency_return_margin_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function norm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function maxAbs(values) {
  return Math.max(...values.map((value) => Math.abs(value)));
}

function finiteOrNull(value) {
  return Number.isFinite(value) ? value : null;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function getOblateArtifact(options = {}) {
  return options.oblateArtifact ?? buildOblateSpheroidReducedResidualRow(options.oblateOptions ?? {});
}

function makeFrequencyRows(rowPrefix, oblateArtifact) {
  const theta = oblateArtifact.fixed_frequency_validation_row?.theta ?? {};
  const omega = Number(theta.omega ?? oblateArtifact.parameters?.omega ?? 0);
  const bodyAngularVelocity = theta.Omega ?? oblateArtifact.parameters?.body_angular_velocity ?? [0, 0, 0];
  const phaseFrequency = Math.abs(omega) / TWO_PI;
  const bodyPrecessionFrequency = norm(bodyAngularVelocity) / TWO_PI;
  const labeledPeriod = omega === 0 ? null : TWO_PI / Math.abs(omega);
  const quotientPeriod = omega === 0 ? null : TWO_PI / (3 * Math.abs(omega));
  const labeledPhaseResidual = labeledPeriod == null ? null : Math.abs(Math.abs(omega) * labeledPeriod - TWO_PI);
  const quotientPhaseResidual = quotientPeriod == null ? null : Math.abs(Math.abs(omega) * quotientPeriod - TWO_PI / 3);

  return [
    {
      row_id: `${rowPrefix}:frequency:phase`,
      schema: "oblate_spheroid_frequency_residual_row.v0",
      frequency_component: "nu_psi",
      angular_rate: omega,
      cycles_per_unit_time: phaseFrequency,
      integer_candidate: 1,
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:frequency:zeta`,
      schema: "oblate_spheroid_frequency_residual_row.v0",
      frequency_component: "nu_z",
      angular_rate: 0,
      cycles_per_unit_time: 0,
      integer_candidate: 0,
      failure_code: "degenerate_meridional_frequency",
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:frequency:body-precession`,
      schema: "oblate_spheroid_frequency_residual_row.v0",
      frequency_component: "nu_p",
      angular_rate: norm(bodyAngularVelocity),
      cycles_per_unit_time: bodyPrecessionFrequency,
      integer_candidate: bodyPrecessionFrequency <= EPSILON ? 0 : null,
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:period:labeled`,
      schema: "oblate_spheroid_phase_closure_period_row.v0",
      closure_level: "labeled_retained_path_history",
      period: finiteOrNull(labeledPeriod),
      phase_target: TWO_PI,
      phase_residual: finiteOrNull(labeledPhaseResidual),
      pass: labeledPhaseResidual != null && labeledPhaseResidual <= EPSILON,
      retained_path_history_required: true,
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:period:quotient`,
      schema: "oblate_spheroid_phase_closure_period_row.v0",
      closure_level: "quotient_level_assembly_state",
      period: finiteOrNull(quotientPeriod),
      phase_target: TWO_PI / 3,
      phase_residual: finiteOrNull(quotientPhaseResidual),
      pass: quotientPhaseResidual != null && quotientPhaseResidual <= EPSILON,
      retained_path_history_required: false,
      accepted: false,
    },
  ];
}

function makeFlatteningRows(rowPrefix, oblateArtifact) {
  const params = oblateArtifact.parameters ?? {};
  const RPerp = params.R_perp;
  const chi = params.chi;
  const RParallel = params.R_parallel;
  const expectedRParallel = chi * RPerp;
  const flattening = 1 - chi;
  const eccentricitySquared = Math.max(0, 1 - chi * chi);

  return [
    {
      row_id: `${rowPrefix}:flattening:parallel-radius`,
      schema: "oblate_spheroid_flattening_residual_row.v0",
      residual: RParallel - expectedRParallel,
      R_perp: RPerp,
      R_parallel: RParallel,
      chi,
      pass: Math.abs(RParallel - expectedRParallel) <= EPSILON,
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:flattening:eccentricity`,
      schema: "oblate_spheroid_flattening_residual_row.v0",
      flattening,
      eccentricity: Math.sqrt(eccentricitySquared),
      oblate: RParallel <= RPerp,
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:support-surface`,
      schema: "oblate_spheroid_support_surface_residual_row.v0",
      equation: oblateArtifact.support_surface_checks?.equation ?? null,
      max_abs_phi: oblateArtifact.support_surface_checks?.max_abs_phi ?? null,
      epsilon: oblateArtifact.support_surface_checks?.epsilon ?? EPSILON,
      pass: oblateArtifact.support_surface_checks?.pass === true,
      accepted: false,
    },
  ];
}

function makeCommonLevelRows(rowPrefix, oblateArtifact) {
  const radii = oblateArtifact.kinematic_rows.map((row) => row.common_level.center_radius);
  const speeds = oblateArtifact.kinematic_rows.map((row) => row.common_level.center_speed);
  const radiusMean = mean(radii);
  const speedMean = mean(speeds);
  return [
    {
      row_id: `${rowPrefix}:common-level:radius`,
      schema: "oblate_spheroid_common_level_residual_row.v0",
      quantity: "center_radius",
      mean: radiusMean,
      max_abs_deviation: maxAbs(radii.map((value) => value - radiusMean)),
      pass: maxAbs(radii.map((value) => value - radiusMean)) <= EPSILON,
      accepted: false,
    },
    {
      row_id: `${rowPrefix}:common-level:speed`,
      schema: "oblate_spheroid_common_level_residual_row.v0",
      quantity: "center_speed",
      mean: speedMean,
      max_abs_deviation: maxAbs(speeds.map((value) => value - speedMean)),
      pass: maxAbs(speeds.map((value) => value - speedMean)) <= EPSILON,
      accepted: false,
    },
  ];
}

function makeReturnMarginRows(rowPrefix, oblateArtifact, frequencyRows) {
  const groupSpeed = oblateArtifact.parameters?.group_speed ?? norm(oblateArtifact.parameters?.group_velocity ?? [0, 0, 0]);
  return frequencyRows
    .filter((row) => row.schema === "oblate_spheroid_phase_closure_period_row.v0")
    .map((row) => {
      const centerDriftDistance = row.period == null ? null : groupSpeed * row.period;
      return {
        row_id: `${rowPrefix}:return-margin:${row.closure_level}`,
        schema: "oblate_spheroid_return_margin_residual_row.v0",
        closure_level: row.closure_level,
        phase_period_ref: row.row_id,
        center_frame_phase_residual: row.phase_residual,
        center_drift_distance: centerDriftDistance,
        retained_path_history_required: row.retained_path_history_required,
        same_record_return_margin_ref: null,
        failure_code: "missing_retained_root_ledger",
        accepted: false,
      };
    });
}

function makeAntipodalReturnRows(rowPrefix, oblateArtifact) {
  return oblateArtifact.antipodal_pair_refs.map((pair) => ({
    row_id: `${rowPrefix}:antipodal-return:${pair.pair_index}`,
    schema: "oblate_spheroid_antipodal_return_margin_residual_row.v0",
    antipodal_pair_ref: pair.row_id,
    position_residual: pair.position_residual,
    center_frame_velocity_residual: pair.center_frame_velocity_residual,
    pass: pair.pass,
    accepted: false,
  }));
}

function makeFirstMissing(oblateArtifact) {
  if (oblateArtifact.root_ledger_status?.retained_root_ledger_ref == null) {
    return {
      artifact_status: "fail_closed_missing_retained_root_ledger",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "retained_root_ledger_missing",
    };
  }
  return {
    artifact_status: "fail_closed_retained_root_ledger_unaccepted",
    first_missing_object: "accepted_same_record_retained_root_ledger_for_oblate_spheroid_fixed_frequency",
    first_missing_field: "oblate_spheroid_fixed_frequency_return_margin_row.root_ledger_status.accepted_retained_root_ledger_ref",
    reason: "demo_or_unaccepted_retained_root_ledger_not_evidence",
  };
}

export function evaluateOblateSpheroidFixedFrequencyReturnMarginEvidence(candidate = {}) {
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
      reason: "schema_not_oblate_spheroid_fixed_frequency_return_margin_row_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.root_ledger_status?.accepted_retained_root_ledger_ref == null) {
    return {
      accepted: false,
      reason: "accepted_retained_root_ledger_missing",
      first_missing_field:
        candidate.root_ledger_status?.retained_root_ledger_ref == null
          ? FIRST_MISSING_FIELD
          : "oblate_spheroid_fixed_frequency_return_margin_row.root_ledger_status.accepted_retained_root_ledger_ref",
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_fixed_frequency_return_margin_evidence",
    first_missing_field: "oblate_spheroid_fixed_frequency_return_margin_row.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidFixedFrequencyReturnMarginRow(options = {}) {
  const oblateArtifact = getOblateArtifact(options);
  const rowKey = {
    schema: SCHEMA,
    source_schema: oblateArtifact.schema,
    source_row_id: oblateArtifact.row_id,
    source_artifact_hash: oblateArtifact.artifact_hash,
    parameters: oblateArtifact.parameters,
    theta: oblateArtifact.fixed_frequency_validation_row?.theta,
  };
  const artifactHash = stableHash(rowKey);
  const rowPrefix = `oblate_spheroid_fixed_frequency_return_margin_row:${artifactHash.slice(0, 16)}`;
  const frequencyRows = makeFrequencyRows(rowPrefix, oblateArtifact);
  const flatteningRows = makeFlatteningRows(rowPrefix, oblateArtifact);
  const commonLevelRows = makeCommonLevelRows(rowPrefix, oblateArtifact);
  const returnMarginRows = makeReturnMarginRows(rowPrefix, oblateArtifact, frequencyRows);
  const antipodalReturnRows = makeAntipodalReturnRows(rowPrefix, oblateArtifact);
  const missing = makeFirstMissing(oblateArtifact);

  const artifact = {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    seed_id: oblateArtifact.seed_id,
    route_id: oblateArtifact.route_id,
    authority_class: "priority_only_hard_math_residual_rows_not_retained_evidence",
    source_oblate_spheroid_reduced_residual_row: {
      schema: oblateArtifact.schema,
      row_id: oblateArtifact.row_id,
      artifact_hash: oblateArtifact.artifact_hash,
      status: oblateArtifact.artifact_status,
      first_missing_object: oblateArtifact.first_missing_object,
      first_missing_field: oblateArtifact.first_missing_field,
    },
    closure_convention: oblateArtifact.closure_convention,
    theta: oblateArtifact.fixed_frequency_validation_row?.theta ?? null,
    fixed_frequency_residual_rows: frequencyRows,
    flattening_support_residual_rows: flatteningRows,
    common_level_residual_rows: commonLevelRows,
    antipodal_return_margin_residual_rows: antipodalReturnRows,
    return_margin_residual_rows: returnMarginRows,
    root_ledger_status: {
      retained_root_ledger_ref: oblateArtifact.root_ledger_status?.retained_root_ledger_ref ?? null,
      accepted_retained_root_ledger_ref: null,
      status:
        oblateArtifact.root_ledger_status?.retained_root_ledger_ref == null
          ? "missing_retained_root_ledger"
          : "retained_root_ledger_present_but_unaccepted",
      first_missing_field:
        oblateArtifact.root_ledger_status?.retained_root_ledger_ref == null
          ? FIRST_MISSING_FIELD
          : "oblate_spheroid_fixed_frequency_return_margin_row.root_ledger_status.accepted_retained_root_ledger_ref",
    },
    retained_source_status: {
      retained_record_id: oblateArtifact.retained_source_binding?.retained_record_id ?? null,
      retained_source_binding_ref: oblateArtifact.retained_source_binding?.retained_source_binding_ref ?? null,
      provider_object_ref: oblateArtifact.provider_provenance?.provider_object_ref ?? null,
      accepted_same_record_source: false,
    },
    artifact_status: missing.artifact_status,
    source_status: "source_acquisition_blocked",
    first_missing_object: missing.first_missing_object,
    first_missing_field: missing.first_missing_field,
    evidence_evaluation: {
      accepted: false,
      reason: missing.reason,
      first_missing_field: missing.first_missing_field,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
  return artifact;
}

export function validateOblateSpheroidFixedFrequencyReturnMarginRow(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.fixed_frequency_residual_rows) || artifact.fixed_frequency_residual_rows.length !== 5) {
    errors.push("five fixed-frequency residual rows are required");
  }
  if (!Array.isArray(artifact?.flattening_support_residual_rows) || artifact.flattening_support_residual_rows.length !== 3) {
    errors.push("three flattening/support residual rows are required");
  }
  if (!Array.isArray(artifact?.common_level_residual_rows) || artifact.common_level_residual_rows.length !== 2) {
    errors.push("two common-level residual rows are required");
  }
  if (
    !Array.isArray(artifact?.antipodal_return_margin_residual_rows) ||
    artifact.antipodal_return_margin_residual_rows.length !== 3
  ) {
    errors.push("three antipodal return-margin residual rows are required");
  }
  if (!Array.isArray(artifact?.return_margin_residual_rows) || artifact.return_margin_residual_rows.length !== 2) {
    errors.push("two return-margin residual rows are required");
  }
  if (artifact?.first_missing_field !== FIRST_MISSING_FIELD) {
    errors.push(`default first missing field must be ${FIRST_MISSING_FIELD}`);
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
    const result = evaluateOblateSpheroidFixedFrequencyReturnMarginEvidence({
      evidence_class: evidenceClass,
    });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const artifact = buildOblateSpheroidFixedFrequencyReturnMarginRow();
  const errors = validateOblateSpheroidFixedFrequencyReturnMarginRow(artifact);
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
