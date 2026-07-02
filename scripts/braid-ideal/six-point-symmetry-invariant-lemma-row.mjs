import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SCHEMA = "six_point_symmetry_invariant_lemma_row.v0";
export const FIRST_MISSING_OBJECT =
  "same_record_force_law_equivariance_proof_for_six_point_symmetry_invariant_lemma";
export const FIRST_MISSING_FIELD =
  "six_point_symmetry_invariant_lemma_row.force_law_equivariance_proof_ref";

const DEFAULT_A = 1;
const DEFAULT_B = 0;
const DEFAULT_A_ACCEL = -1 / 4;
const DEFAULT_B_ACCEL = 0;
const EPSILON = 1e-12;

const FACE_OPPOSITE_DECORATION = Object.freeze([
  Object.freeze({ site: "+x", axis: "x", side: 1, polarity: "P" }),
  Object.freeze({ site: "+y", axis: "y", side: 1, polarity: "P" }),
  Object.freeze({ site: "+z", axis: "z", side: 1, polarity: "P" }),
  Object.freeze({ site: "-x", axis: "x", side: -1, polarity: "E" }),
  Object.freeze({ site: "-y", axis: "y", side: -1, polarity: "E" }),
  Object.freeze({ site: "-z", axis: "z", side: -1, polarity: "E" }),
]);

const AXIAL_PAIRED_DECORATION = Object.freeze([
  Object.freeze({ site: "+x", axis: "x", side: 1, polarity: "P" }),
  Object.freeze({ site: "-x", axis: "x", side: -1, polarity: "P" }),
  Object.freeze({ site: "+y", axis: "y", side: 1, polarity: "P" }),
  Object.freeze({ site: "-y", axis: "y", side: -1, polarity: "E" }),
  Object.freeze({ site: "+z", axis: "z", side: 1, polarity: "E" }),
  Object.freeze({ site: "-z", axis: "z", side: -1, polarity: "E" }),
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  diagnostic: "diagnostic_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  priority_prose: "priority_prose_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  generated_decoy: "generated_decoy_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  proxy_row: "proxy_row_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  candidate_ref: "candidate_ref_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  aggregate_row: "aggregate_row_not_same_record_six_point_symmetry_invariant_lemma_evidence",
  h39_theta3minus_quotient_row:
    "h39_theta3minus_row_not_braid_ideal_six_point_symmetry_invariant_lemma_evidence",
  dirty_file_evidence: "dirty_file_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  temp_probe: "temp_probe_not_accepted_six_point_symmetry_invariant_lemma_evidence",
  t3_row: "t3_row_not_braid_ideal_six_point_symmetry_invariant_lemma_evidence",
  endpoint_only_row: "endpoint_only_row_not_six_point_symmetry_invariant_lemma_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_six_point_symmetry_invariant_lemma_evidence",
  axial_paired_control: "axial_paired_control_not_face_opposite_invariant_channel_evidence",
  earlier_fail_closed_adapter_row:
    "earlier_fail_closed_adapter_row_not_accepted_six_point_symmetry_invariant_lemma_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "six_point_symmetry_invariant_lemma",
  "retainedBranchClaim",
  "acceptedSameLevelBranchClaim",
  "accepted_transition_source",
  "moving_retained_branch_certificate",
  "same_ledger_action_measure_row",
  "bounded_speed_live_ledger",
  "receiver_normal_branch_strength",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function addVectors(left, right) {
  return left.map((value, index) => value + right[index]);
}

function scaleVector(vector, scale) {
  return vector.map((value) => value * scale);
}

function norm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function squaredNorm(vector) {
  return vector.reduce((sum, value) => sum + value * value, 0);
}

function sumVectors(rows, field) {
  return rows.reduce((sum, row) => addVectors(sum, row[field]), [0, 0, 0]);
}

function max(values) {
  return Math.max(...values);
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makePositionRows(rowPrefix, a, b) {
  const positrinoRows = [
    { architrino_id: "P_x", polarity: "P", axis_label: "x", position: [a, b, b] },
    { architrino_id: "P_y", polarity: "P", axis_label: "y", position: [b, a, b] },
    { architrino_id: "P_z", polarity: "P", axis_label: "z", position: [b, b, a] },
  ];
  return positrinoRows.flatMap((row) => [
    {
      row_id: `${rowPrefix}:manifold-position:${row.architrino_id}`,
      schema: "six_point_face_opposite_manifold_position.v0",
      accepted: false,
      ...row,
    },
    {
      row_id: `${rowPrefix}:manifold-position:E_${row.axis_label}`,
      schema: "six_point_face_opposite_manifold_position.v0",
      accepted: false,
      architrino_id: `E_${row.axis_label}`,
      polarity: "E",
      axis_label: row.axis_label,
      position: scaleVector(row.position, -1),
    },
  ]);
}

function makeAccelerationRows(rowPrefix, A, B) {
  const positrinoRows = [
    { architrino_id: "P_x", polarity: "P", axis_label: "x", acceleration: [A, B, B] },
    { architrino_id: "P_y", polarity: "P", axis_label: "y", acceleration: [B, A, B] },
    { architrino_id: "P_z", polarity: "P", axis_label: "z", acceleration: [B, B, A] },
  ];
  return positrinoRows.flatMap((row) => [
    {
      row_id: `${rowPrefix}:tangent-acceleration:${row.architrino_id}`,
      schema: "six_point_face_opposite_tangent_acceleration.v0",
      accepted: false,
      ...row,
    },
    {
      row_id: `${rowPrefix}:tangent-acceleration:E_${row.axis_label}`,
      schema: "six_point_face_opposite_tangent_acceleration.v0",
      accepted: false,
      architrino_id: `E_${row.axis_label}`,
      polarity: "E",
      axis_label: row.axis_label,
      acceleration: scaleVector(row.acceleration, -1),
    },
  ]);
}

function classifyDecoration(decoration) {
  const byAxis = ["x", "y", "z"].map((axis) => {
    const rows = decoration.filter((row) => row.axis === axis);
    const polarities = rows.map((row) => row.polarity).sort();
    const split = polarities[0] !== polarities[1];
    return {
      axis,
      sites: rows.map((row) => row.site),
      polarities,
      opposite_pair_pattern: split ? "split_P_E" : `${polarities[0]}_${polarities[1]}`,
      split_polarity_axis: split,
      same_polarity_axis: !split,
    };
  });
  const splitAxisCount = byAxis.filter((row) => row.split_polarity_axis).length;
  const samePolarityAxisCount = byAxis.filter((row) => row.same_polarity_axis).length;
  return {
    axis_rows: byAxis,
    split_axis_count: splitAxisCount,
    same_polarity_axis_count: samePolarityAxisCount,
    rotation_class:
      splitAxisCount === 3
        ? "face-opposite"
        : samePolarityAxisCount === 2 && splitAxisCount === 1
          ? "axial-paired"
          : "unclassified_balanced_octahedral_decoration",
  };
}

function makeManifoldChecks(positionRows) {
  const centerResidual = norm(sumVectors(positionRows, "position"));
  const radiusSquares = positionRows.map((row) => squaredNorm(row.position));
  const commonRadiusSquared = radiusSquares[0];
  const commonRadiusMaxResidual = max(radiusSquares.map((value) => Math.abs(value - commonRadiusSquared)));
  const antipodalResiduals = ["x", "y", "z"].map((axis) => {
    const positrino = positionRows.find((row) => row.architrino_id === `P_${axis}`);
    const electrino = positionRows.find((row) => row.architrino_id === `E_${axis}`);
    return norm(addVectors(positrino.position, electrino.position));
  });
  const antipodalPairMaxResidual = max(antipodalResiduals);
  return {
    center_residual: centerResidual,
    common_radius_squared: commonRadiusSquared,
    common_radius_max_residual: commonRadiusMaxResidual,
    antipodal_pair_max_residual: antipodalPairMaxResidual,
    pass:
      centerResidual <= EPSILON &&
      commonRadiusMaxResidual <= EPSILON &&
      antipodalPairMaxResidual <= EPSILON,
  };
}

function makeTangentChecks(accelerationRows) {
  const centerAccelerationResidual = norm(sumVectors(accelerationRows, "acceleration"));
  const antipodalAccelerationResiduals = ["x", "y", "z"].map((axis) => {
    const positrino = accelerationRows.find((row) => row.architrino_id === `P_${axis}`);
    const electrino = accelerationRows.find((row) => row.architrino_id === `E_${axis}`);
    return norm(addVectors(positrino.acceleration, electrino.acceleration));
  });
  const antipodalAccelerationMaxResidual = max(antipodalAccelerationResiduals);
  const templatePass = ["x", "y", "z"].every((axis) => {
    const row = accelerationRows.find((entry) => entry.architrino_id === `P_${axis}`);
    const repeatedCoordinates =
      axis === "x"
        ? Math.abs(row.acceleration[1] - row.acceleration[2])
        : axis === "y"
          ? Math.abs(row.acceleration[0] - row.acceleration[2])
          : Math.abs(row.acceleration[0] - row.acceleration[1]);
    return repeatedCoordinates <= EPSILON;
  });
  return {
    center_acceleration_residual: centerAccelerationResidual,
    antipodal_acceleration_max_residual: antipodalAccelerationMaxResidual,
    template_pass: templatePass,
    pass:
      centerAccelerationResidual <= EPSILON &&
      antipodalAccelerationMaxResidual <= EPSILON &&
      templatePass,
  };
}

function makeProofObligations() {
  return [
    {
      obligation_id: "coordinate_permutation_equivariance_of_retained_force_law",
      required: true,
      proof_ref: null,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    {
      obligation_id: "charge_conjugate_inversion_oddness_of_retained_force_law",
      required: true,
      proof_ref: null,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    {
      obligation_id: "complete_retained_root_set_no_asymmetric_root_pruning",
      required: true,
      retained_root_ledger_ref: null,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    {
      obligation_id: "same_record_binding_for_retained_history_rows",
      required: true,
      retained_record_id: null,
      provider_object_ref: null,
      first_missing_field: FIRST_MISSING_FIELD,
    },
  ];
}

export function evaluateSixPointSymmetryInvariantLemmaEvidence(candidate = {}) {
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
      reason: "schema_not_six_point_symmetry_invariant_lemma_row_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.force_law_equivariance_proof_ref == null) {
    return {
      accepted: false,
      reason: "force_law_equivariance_proof_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.retained_root_ledger_ref == null) {
    return {
      accepted: false,
      reason: "retained_root_ledger_missing",
      first_missing_field: "six_point_symmetry_invariant_lemma_row.retained_root_ledger_ref",
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_symmetry_invariant_lemma_evidence",
    first_missing_field: "six_point_symmetry_invariant_lemma_row.acceptance_certificate_ref",
  };
}

export function buildSixPointSymmetryInvariantLemmaRow(options = {}) {
  const a = normalizeNumber(options.a, DEFAULT_A);
  const b = normalizeNumber(options.b, DEFAULT_B);
  const A = normalizeNumber(options.A, DEFAULT_A_ACCEL);
  const B = normalizeNumber(options.B, DEFAULT_B_ACCEL);
  const artifactKey = {
    schema: SCHEMA,
    a,
    b,
    A,
    B,
    selectedDecorationClass: "face-opposite",
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `six_point_symmetry_invariant_lemma_row:${artifactHash.slice(0, 16)}`;
  const positionRows = makePositionRows(rowPrefix, a, b);
  const accelerationRows = makeAccelerationRows(rowPrefix, A, B);
  const faceOppositeClassification = classifyDecoration(FACE_OPPOSITE_DECORATION);
  const axialPairedClassification = classifyDecoration(AXIAL_PAIRED_DECORATION);
  const manifoldChecks = makeManifoldChecks(positionRows);
  const tangentChecks = makeTangentChecks(accelerationRows);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    authority_class: "priority_only_symmetry_invariant_lemma_not_retained_branch_evidence",
    claim_level: "priority_only_derivation_closure_target",
    selected_decoration_class: "face-opposite",
    decoration_classification: {
      balanced_octahedral_decoration_count: 20,
      proper_rotation_class_count: 2,
      face_opposite: {
        ...faceOppositeClassification,
        support_status: "selected_invariant_channel_candidate",
      },
      axial_paired_control: {
        ...axialPairedClassification,
        support_status: "negative_control_not_this_invariant_channel",
        accepted_as_antimatter_branch: false,
      },
    },
    invariant_manifold: {
      schema: "face_opposite_common_sphere_antipodal_manifold.v0",
      coordinate_form: {
        P_x: "(a,b,b)",
        P_y: "(b,a,b)",
        P_z: "(b,b,a)",
        E_x: "-P_x",
        E_y: "-P_y",
        E_z: "-P_z",
      },
      parameters: { a, b },
      position_rows: positionRows,
      checks: manifoldChecks,
    },
    tangent_acceleration_template: {
      schema: "face_opposite_tangent_acceleration_template.v0",
      coordinate_form: {
        ddot_P_x: "(A,B,B)",
        ddot_P_y: "(B,A,B)",
        ddot_P_z: "(B,B,A)",
        ddot_E_i: "-ddot_P_i",
      },
      parameters: { A, B },
      acceleration_rows: accelerationRows,
      checks: tangentChecks,
    },
    proof_obligations: makeProofObligations(),
    force_law_equivariance_proof_ref: null,
    retained_root_ledger_ref: null,
    retained_record_id: null,
    provider_object_ref: null,
    retained_source_binding_ref: null,
    artifact_status: "fail_closed_missing_force_law_equivariance_proof",
    source_status: "source_acquisition_blocked",
    first_missing_object: FIRST_MISSING_OBJECT,
    first_missing_field: FIRST_MISSING_FIELD,
    evidence_evaluation: evaluateSixPointSymmetryInvariantLemmaEvidence({ schema: SCHEMA }),
    authorization: makeAuthorization(),
    negative_controls: Object.entries(NEGATIVE_CONTROL_REASONS).map(([evidence_class, reason]) => ({
      evidence_class,
      accepted: false,
      reason,
    })),
  };
}

export function validateSixPointSymmetryInvariantLemmaRow(row) {
  const errors = [];
  if (row?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (row?.artifact_status !== "fail_closed_missing_force_law_equivariance_proof") {
    errors.push("artifact must fail closed at missing force-law equivariance proof");
  }
  if (row?.first_missing_field !== FIRST_MISSING_FIELD) {
    errors.push(`first missing field must be ${FIRST_MISSING_FIELD}`);
  }
  if (row?.decoration_classification?.face_opposite?.split_axis_count !== 3) {
    errors.push("face-opposite decoration must split all three opposite axes");
  }
  if (row?.decoration_classification?.axial_paired_control?.same_polarity_axis_count !== 2) {
    errors.push("axial-paired control must have two same-polarity axes");
  }
  if (row?.invariant_manifold?.checks?.pass !== true) {
    errors.push("face-opposite invariant manifold checks must pass");
  }
  if (row?.tangent_acceleration_template?.checks?.pass !== true) {
    errors.push("tangent acceleration template checks must pass");
  }
  if (!Array.isArray(row?.proof_obligations) || row.proof_obligations.length !== 4) {
    errors.push("four proof obligations are required");
  }
  for (const flag of AUTHORIZATION_FLAGS) {
    if (row?.authorization?.[flag] !== false) {
      errors.push(`${flag} must remain false`);
    }
  }
  if (row?.authorization?.scoreMovement !== "no_score_increase") {
    errors.push("scoreMovement must remain no_score_increase");
  }
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateSixPointSymmetryInvariantLemmaEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const row = buildSixPointSymmetryInvariantLemmaRow();
  const errors = validateSixPointSymmetryInvariantLemmaRow(row);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(row, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli();
}
