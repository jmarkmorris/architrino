import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { buildOblateSpheroidReducedResidualRow } from "./oblate-spheroid-reduced-residual-row.mjs";
import { buildOblateSpheroidFixedFrequencyReturnMarginRow } from "./oblate-spheroid-fixed-frequency-return-margin-row.mjs";

export const SCHEMA = "oblate_spheroid_two_speed_deformation_sweep.v0";
export const FIRST_MISSING_OBJECT = "same_record_retained_root_ledger_for_two_speed_deformation_sweep";
export const FIRST_MISSING_FIELD = "oblate_spheroid_two_speed_deformation_sweep.rows[*].root_ledger_status.retained_root_ledger_ref";

const DEFAULT_U_VALUES = Object.freeze([0, 0.1, 0.2, 0.3, 0.4, 0.5]);
const DEFAULT_V_ORB_VALUES = Object.freeze([0.1, 0.2, 0.3, 0.4, 0.5, 0.6]);
const DEFAULT_GROUP_DIRECTION = Object.freeze([1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)]);
const DEFAULT_BETA_STAR = 0.8;
const DEFAULT_R_PERP = 1;
const DEFAULT_ZETA = 1 / Math.sqrt(3);
const DEFAULT_FIELD_SPEED = 1;
const EPSILON = 1e-12;
const ACTION_DRIFT_PREFILTER_WEIGHT = 0.1;
const BETA_MAX_PREFILTER_WEIGHT = 0.5;

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "two_speed_deformation_sweep",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "preferred_configuration_claim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_two_speed_deformation_sweep_evidence",
  diagnostic: "diagnostic_not_accepted_two_speed_deformation_sweep_evidence",
  priority_prose: "priority_prose_not_accepted_two_speed_deformation_sweep_evidence",
  generated_decoy: "generated_decoy_not_accepted_two_speed_deformation_sweep_evidence",
  proxy_row: "proxy_row_not_accepted_two_speed_deformation_sweep_evidence",
  aggregate_row: "aggregate_row_not_same_record_two_speed_deformation_sweep_evidence",
  display_fit: "display_fit_not_retained_branch_two_speed_deformation_sweep_evidence",
});

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizePositiveNumber(value, fallback) {
  const number = normalizeNumber(value, fallback);
  return number > 0 ? number : fallback;
}

function uniqueSortedNumbers(values, fallback) {
  const source = Array.isArray(values) && values.length > 0 ? values : fallback;
  return [...new Set(source.map((value) => Number(value)).filter((value) => Number.isFinite(value) && value >= 0))]
    .sort((left, right) => left - right);
}

function parseNumberList(value, fallback) {
  if (value == null || value === "") {
    return [...fallback];
  }
  return uniqueSortedNumbers(String(value).split(",").map((entry) => entry.trim()), fallback);
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => normalizeNumber(entry, fallback[index]));
}

function norm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function scaleVector(vector, scale) {
  return vector.map((value) => value * scale);
}

function normalizeDirection(value) {
  const vector = normalizeVector(value, DEFAULT_GROUP_DIRECTION);
  const length = norm(vector);
  return length <= EPSILON ? [...DEFAULT_GROUP_DIRECTION] : scaleVector(vector, 1 / length);
}

function max(values) {
  return Math.max(...values);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeChiForMode(u, options) {
  if (options.chiMode === "fixed") {
    return options.fixedChi;
  }
  return Math.max(1e-6, Math.sqrt(Math.max(0, 1 - u * u)));
}

function getPhasePeriod(fixedFrequencyArtifact, closureLevel) {
  return fixedFrequencyArtifact.fixed_frequency_residual_rows.find(
    (row) => row.schema === "oblate_spheroid_phase_closure_period_row.v0" && row.closure_level === closureLevel
  )?.period ?? null;
}

function computeActionProxy(oblateArtifact, period, actionUnit) {
  if (period == null || period <= 0) {
    return {
      action_proxy: null,
      action_units: null,
      nearest_action_integer: null,
      action_drift_to_nearest_h: null,
    };
  }
  const centerSpeedSquares = oblateArtifact.kinematic_rows.map((row) => {
    const speed = norm(row.center_frame_velocity);
    return speed * speed;
  });
  const actionProxy = centerSpeedSquares.reduce((sum, value) => sum + value, 0) * period;
  const units = actionProxy / actionUnit;
  const nearestInteger = Math.max(1, Math.round(units));
  return {
    action_proxy: actionProxy,
    action_units: units,
    nearest_action_integer: nearestInteger,
    action_drift_to_nearest_h: Math.abs(units - nearestInteger),
  };
}

function buildSweepRow(rowPrefix, options, u, vOrb) {
  const groupVelocity = scaleVector(options.groupDirection, u);
  const chi = makeChiForMode(u, options);
  const oblateArtifact = buildOblateSpheroidReducedResidualRow({
    groupVelocity,
    R_perp: options.RPerp,
    chi,
    zeta: options.zeta,
    v_orb: vOrb,
    fieldSpeed: DEFAULT_FIELD_SPEED,
  });
  const fixedFrequencyArtifact = buildOblateSpheroidFixedFrequencyReturnMarginRow({ oblateArtifact });
  const labeledPeriod = getPhasePeriod(fixedFrequencyArtifact, "labeled_retained_path_history");
  const quotientPeriod = getPhasePeriod(fixedFrequencyArtifact, "quotient_level_assembly_state");
  const fieldSpeeds = oblateArtifact.kinematic_rows.map((row) => norm(row.velocity));
  const centerFrameSpeeds = oblateArtifact.kinematic_rows.map((row) => norm(row.center_frame_velocity));
  const betaMax = max(fieldSpeeds) / DEFAULT_FIELD_SPEED;
  const rootBudgetMargin = DEFAULT_FIELD_SPEED - max(fieldSpeeds);
  const speedBudgetQuadrature = Math.sqrt(u * u + vOrb * vOrb);
  const expectedVOrbAtBetaStar = Math.sqrt(Math.max(0, options.betaStar * options.betaStar - u * u));
  const speedBudgetCurveResidual = Math.abs(vOrb - expectedVOrbAtBetaStar);
  const betaMaxResidual = Math.abs(betaMax - options.betaStar);
  const actionProxy = computeActionProxy(oblateArtifact, labeledPeriod, options.actionUnit);
  const actionDrift = actionProxy.action_drift_to_nearest_h ?? 1;
  const rootPenalty = rootBudgetMargin > 0 ? 0 : Math.abs(rootBudgetMargin) + 1;
  const returnPenalty = 1;
  const candidateObjective =
    speedBudgetCurveResidual * speedBudgetCurveResidual +
    BETA_MAX_PREFILTER_WEIGHT * betaMaxResidual * betaMaxResidual +
    ACTION_DRIFT_PREFILTER_WEIGHT * actionDrift * actionDrift +
    rootPenalty * rootPenalty +
    returnPenalty;

  return {
    row_id: `${rowPrefix}:row:u_${u.toFixed(6)}:v_orb_${vOrb.toFixed(6)}`,
    schema: "oblate_spheroid_two_speed_sweep_row.v0",
    field_speed: DEFAULT_FIELD_SPEED,
    u,
    v_orb: vOrb,
    group_velocity: groupVelocity,
    chi,
    volume_ratio_candidate: chi * Math.pow(options.RPerp / DEFAULT_R_PERP, 3),
    lorentz_clock_ratio_target: Math.sqrt(Math.max(0, 1 - u * u)),
    speed_budget: {
      beta_star: options.betaStar,
      quadrature: speedBudgetQuadrature,
      expected_v_orb_for_constant_budget: expectedVOrbAtBetaStar,
      curve_residual: speedBudgetCurveResidual,
      beta_max: betaMax,
      beta_max_residual: betaMaxResidual,
      root_budget_margin: rootBudgetMargin,
      positive_root_budget_margin: rootBudgetMargin > 0,
    },
    branch_clock_proxy: {
      labeled_period: labeledPeriod,
      quotient_period: quotientPeriod,
      cadence_ratio_to_beta_star: options.betaStar > 0 ? vOrb / options.betaStar : null,
      accepted_branch_clock: false,
    },
    action_proxy: actionProxy,
    kinematic_summary: {
      center_frame_speed_mean: mean(centerFrameSpeeds),
      center_frame_speed_max: max(centerFrameSpeeds),
      field_frame_speed_max: max(fieldSpeeds),
      support_surface_pass: oblateArtifact.support_surface_checks.pass === true,
      support_surface_max_abs_phi: oblateArtifact.support_surface_checks.max_abs_phi,
    },
    residual_status: {
      reduced_residual_norm: null,
      residual_status: "missing_same_record_retained_root_ledger",
      source_oblate_row_id: oblateArtifact.row_id,
      source_fixed_frequency_row_id: fixedFrequencyArtifact.row_id,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    root_ledger_status: fixedFrequencyArtifact.root_ledger_status,
    return_status: {
      bounded_return_observed: false,
      stable_support_radius_observed: false,
      status: "not_evaluated_missing_retained_root_ledger",
      first_missing_field: FIRST_MISSING_FIELD,
    },
    candidate_objective: candidateObjective,
    accepted: false,
  };
}

function chooseCandidateRows(rows, uValues) {
  return uValues
    .map((u) => rows.filter((row) => row.u === u && row.speed_budget.positive_root_budget_margin))
    .filter((group) => group.length > 0)
    .map((group) => [...group].sort((left, right) => left.candidate_objective - right.candidate_objective)[0]);
}

function makeSummary(rows, candidateRows) {
  const positiveRootRows = rows.filter((row) => row.speed_budget.positive_root_budget_margin);
  const boundedRows = rows.filter((row) => row.return_status.bounded_return_observed);
  return {
    row_count: rows.length,
    positive_root_budget_row_count: positiveRootRows.length,
    bounded_return_row_count: boundedRows.length,
    candidate_prefilter_row_count: candidateRows.length,
    min_candidate_objective: rows.length > 0 ? Math.min(...rows.map((row) => row.candidate_objective)) : null,
    max_beta: rows.length > 0 ? Math.max(...rows.map((row) => row.speed_budget.beta_max)) : null,
    min_root_budget_margin: rows.length > 0 ? Math.min(...rows.map((row) => row.speed_budget.root_budget_margin)) : null,
    preferred_configuration_status:
      boundedRows.length > 0
        ? "bounded_return_rows_present_requires_retained_evidence_review"
        : candidateRows.length > 0
          ? "kinematic_prefilter_only_no_bounded_return"
          : "no_positive_root_budget_candidate_rows",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
  };
}

export function evaluateOblateSpheroidTwoSpeedSweepEvidence(candidate = {}) {
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
      reason: "schema_not_oblate_spheroid_two_speed_deformation_sweep_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_two_speed_deformation_sweep_evidence",
    first_missing_field: "oblate_spheroid_two_speed_deformation_sweep.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidTwoSpeedSweep(options = {}) {
  const uValues = uniqueSortedNumbers(options.uValues, DEFAULT_U_VALUES);
  const vOrbValues = uniqueSortedNumbers(options.vOrbValues, DEFAULT_V_ORB_VALUES);
  const normalizedOptions = {
    uValues,
    vOrbValues,
    groupDirection: normalizeDirection(options.groupDirection),
    betaStar: normalizePositiveNumber(options.betaStar, DEFAULT_BETA_STAR),
    actionUnit: normalizePositiveNumber(options.actionUnit, 1),
    RPerp: normalizePositiveNumber(options.R_perp ?? options.RPerp, DEFAULT_R_PERP),
    zeta: Math.max(-0.999999, Math.min(0.999999, normalizeNumber(options.zeta, DEFAULT_ZETA))),
    chiMode: options.chiMode === "fixed" ? "fixed" : "lorentz_target",
    fixedChi: Math.max(1e-6, Math.min(1, normalizePositiveNumber(options.chi, 1))),
  };
  const artifactKey = {
    schema: SCHEMA,
    uValues,
    vOrbValues,
    groupDirection: normalizedOptions.groupDirection,
    betaStar: normalizedOptions.betaStar,
    actionUnit: normalizedOptions.actionUnit,
    RPerp: normalizedOptions.RPerp,
    zeta: normalizedOptions.zeta,
    chiMode: normalizedOptions.chiMode,
    fixedChi: normalizedOptions.fixedChi,
    fieldSpeed: DEFAULT_FIELD_SPEED,
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_two_speed_deformation_sweep:${artifactHash.slice(0, 16)}`;
  const rows = uValues.flatMap((u) => vOrbValues.map((vOrb) => buildSweepRow(rowPrefix, normalizedOptions, u, vOrb)));
  const candidateRows = chooseCandidateRows(rows, uValues);
  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_two_speed_prefilter_not_retained_branch_evidence",
    claim_level: "priority_only_validation_prefilter",
    field_speed: DEFAULT_FIELD_SPEED,
    parameters: {
      u_values: uValues,
      v_orb_values: vOrbValues,
      group_direction: normalizedOptions.groupDirection,
      beta_star: normalizedOptions.betaStar,
      action_unit: normalizedOptions.actionUnit,
      R_perp: normalizedOptions.RPerp,
      zeta: normalizedOptions.zeta,
      chi_mode: normalizedOptions.chiMode,
      fixed_chi: normalizedOptions.fixedChi,
    },
    candidate_selection: {
      preferred_configuration_conditions: [
        "reduced residual norm near zero",
        "action drift near zero",
        "bounded return or stable support radius",
        "positive retained root-budget margin",
      ],
      current_status: "kinematic_prefilter_only_missing_retained_root_ledger",
      objective_terms: [
        "constant speed-budget curve residual",
        `exact beta_max residual weighted by ${BETA_MAX_PREFILTER_WEIGHT}`,
        `nearest h-scale action drift proxy weighted by ${ACTION_DRIFT_PREFILTER_WEIGHT}`,
        "root-budget penalty",
        "return penalty",
      ],
      weights_define_physics: false,
    },
    rows,
    candidate_prefilter_rows: candidateRows,
    summary: makeSummary(rows, candidateRows),
    artifact_status: "fail_closed_missing_retained_root_ledger",
    source_status: "source_acquisition_blocked",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    evidence_evaluation: {
      accepted: false,
      reason: "retained_root_ledger_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    },
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateOblateSpheroidTwoSpeedSweep(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  const expectedRows = (artifact?.parameters?.u_values?.length ?? 0) * (artifact?.parameters?.v_orb_values?.length ?? 0);
  if (!Array.isArray(artifact?.rows) || artifact.rows.length !== expectedRows) {
    errors.push("rows must cover the full u by v_orb grid");
  }
  if (artifact?.field_speed !== 1) {
    errors.push("field_speed must remain canonical c_f=1");
  }
  if (artifact?.artifact_status !== "fail_closed_missing_retained_root_ledger") {
    errors.push("two-speed sweep must fail closed without retained root ledger");
  }
  if (artifact?.summary?.bounded_return_row_count !== 0) {
    errors.push("priority-only prefilter must not report bounded return");
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
    const result = evaluateOblateSpheroidTwoSpeedSweepEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function parseCliArgs(argv) {
  const options = {};
  for (const arg of argv) {
    if (arg.startsWith("--u-values=")) {
      options.uValues = parseNumberList(arg.slice("--u-values=".length), DEFAULT_U_VALUES);
    } else if (arg.startsWith("--v-orb-values=")) {
      options.vOrbValues = parseNumberList(arg.slice("--v-orb-values=".length), DEFAULT_V_ORB_VALUES);
    } else if (arg.startsWith("--beta-star=")) {
      options.betaStar = normalizePositiveNumber(arg.slice("--beta-star=".length), DEFAULT_BETA_STAR);
    } else if (arg.startsWith("--action-unit=")) {
      options.actionUnit = normalizePositiveNumber(arg.slice("--action-unit=".length), 1);
    } else if (arg.startsWith("--chi-mode=")) {
      options.chiMode = arg.slice("--chi-mode=".length);
    } else if (arg.startsWith("--chi=")) {
      options.chi = normalizePositiveNumber(arg.slice("--chi=".length), 1);
    } else if (arg.startsWith("--out=")) {
      options.out = arg.slice("--out=".length);
    }
  }
  return options;
}

function runCli() {
  const cliOptions = parseCliArgs(process.argv.slice(2));
  const artifact = buildOblateSpheroidTwoSpeedSweep(cliOptions);
  const errors = validateOblateSpheroidTwoSpeedSweep(artifact);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  const output = JSON.stringify(artifact, null, pretty ? 2 : 0);
  if (cliOptions.out) {
    fs.writeFileSync(cliOptions.out, `${output}\n`);
    return;
  }
  console.log(output);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
