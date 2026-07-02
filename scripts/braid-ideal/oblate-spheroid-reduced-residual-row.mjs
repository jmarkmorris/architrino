import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

export const SCHEMA = "oblate_spheroid_reduced_residual_row.v0";
export const DEFAULT_SEED_ID = "braid-ideal:oblate-spheroid:three-pair:v0";
export const DEFAULT_ROUTE_ID = "braid-ideal:oblate-spheroid-reduced-equations:v0";
export const DEFAULT_GROUP_VELOCITY = Object.freeze([1 / 60, 1 / 60, 1 / 60]);
export const FIRST_MISSING_OBJECT = "same_retained_root_ledger_for_oblate_spheroid_reduced_residual_row";
export const FIRST_MISSING_FIELD =
  "oblate_spheroid_reduced_residual_row.root_ledger_status.retained_root_ledger_ref";

const DEFAULT_R_PERP = 1;
const DEFAULT_CHI = 0.94;
const DEFAULT_ZETA = 1 / Math.sqrt(3);
const DEFAULT_PSI = 0;
const DEFAULT_OMEGA = 1 / 3;
const DEFAULT_BODY_ANGULAR_VELOCITY = Object.freeze([0, 0, 0]);
const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_COUPLING = 1 / 36;
const SUPPORT_RESIDUAL_EPSILON = 1e-12;

const PAIR_OFFSETS = Object.freeze([
  Object.freeze({ pair_index: 0, alpha: 0 }),
  Object.freeze({ pair_index: 1, alpha: (2 * Math.PI) / 3 }),
  Object.freeze({ pair_index: 2, alpha: (4 * Math.PI) / 3 }),
]);

export const NEGATIVE_CONTROL_REASONS = Object.freeze({
  fixture: "fixture_not_accepted_oblate_spheroid_residual_evidence",
  diagnostic: "diagnostic_not_accepted_oblate_spheroid_residual_evidence",
  priority_prose: "priority_prose_not_accepted_oblate_spheroid_residual_evidence",
  generated_decoy: "generated_decoy_not_accepted_oblate_spheroid_residual_evidence",
  proxy_row: "proxy_row_not_accepted_oblate_spheroid_residual_evidence",
  candidate_ref: "candidate_ref_not_accepted_oblate_spheroid_residual_evidence",
  aggregate_row: "aggregate_row_not_same_record_oblate_spheroid_residual_evidence",
  h39_theta3minus_quotient_row:
    "h39_theta3minus_row_not_braid_ideal_oblate_spheroid_residual_evidence",
  source_contract_shell: "source_contract_shell_not_accepted_oblate_spheroid_residual_evidence",
  temp_probe: "temp_probe_not_accepted_oblate_spheroid_residual_evidence",
  t3_row: "t3_row_not_braid_ideal_oblate_spheroid_residual_evidence",
  endpoint_only_row: "endpoint_only_row_not_oblate_spheroid_residual_evidence",
  affine_geometry_alone: "affine_geometry_alone_not_oblate_spheroid_residual_evidence",
  cross_row_bundle: "cross_row_bundle_not_same_record_oblate_spheroid_residual_evidence",
  generic_spheroid_display_metadata_without_same_record_binding:
    "generic_spheroid_display_metadata_without_same_record_binding_not_accepted_residual_evidence",
  earlier_fail_closed_adapter_row: "earlier_fail_closed_adapter_row_not_accepted_residual_evidence",
});

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "oblate_spheroid_reduced_residual_row",
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

function stableUint32(value) {
  const digest = crypto.createHash("sha256").update(value).digest();
  return digest.readUInt32BE(0);
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizePositiveNumber(value, fallback) {
  const number = normalizeNumber(value, fallback);
  return number > 0 ? number : fallback;
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => normalizeNumber(entry, fallback[index]));
}

function addVectors(left, right) {
  return left.map((value, index) => value + right[index]);
}

function scaleVector(vector, scale) {
  return vector.map((value) => value * scale);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function makeAuthorization() {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [flag, false]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function makeParameters(options = {}) {
  const RPerp = normalizePositiveNumber(options.R_perp, DEFAULT_R_PERP);
  const chi = Math.min(1, normalizePositiveNumber(options.chi, DEFAULT_CHI));
  const zeta = Math.max(-0.999999, Math.min(0.999999, normalizeNumber(options.zeta, DEFAULT_ZETA)));
  const RParallel = chi * RPerp;
  const orbitalRadius = RPerp * Math.sqrt(1 - zeta * zeta);
  const requestedVOrb = options.v_orb ?? options.vOrb ?? options.orbitalVelocity;
  const omega =
    requestedVOrb != null && options.omega == null
      ? normalizeNumber(requestedVOrb, Math.abs(DEFAULT_OMEGA * orbitalRadius)) / orbitalRadius
      : normalizeNumber(options.omega, DEFAULT_OMEGA);
  const vOrb = Math.abs(orbitalRadius * omega);
  return {
    seed_id: options.seedId ?? DEFAULT_SEED_ID,
    route_id: options.routeId ?? DEFAULT_ROUTE_ID,
    group_velocity: normalizeVector(options.group_velocity ?? options.groupVelocity, DEFAULT_GROUP_VELOCITY),
    R_perp: RPerp,
    chi,
    R_parallel: RParallel,
    orbital_radius: orbitalRadius,
    v_orb: vOrb,
    zeta,
    psi: normalizeNumber(options.psi, DEFAULT_PSI),
    omega,
    body_angular_velocity: normalizeVector(
      options.body_angular_velocity ?? options.bodyAngularVelocity,
      DEFAULT_BODY_ANGULAR_VELOCITY
    ),
    K_sea:
      options.K_sea == null && options.KSea == null ? null : normalizeNumber(options.K_sea ?? options.KSea, 0),
    Gamma_sea:
      options.Gamma_sea == null && options.GammaSea == null
        ? null
        : normalizeNumber(options.Gamma_sea ?? options.GammaSea, 0),
    field_speed: normalizePositiveNumber(options.fieldSpeed, DEFAULT_FIELD_SPEED),
    coupling: normalizeNumber(options.coupling, DEFAULT_COUPLING),
    retained_record_id: options.retainedRecordId ?? null,
    retained_root_ledger_ref: options.retainedRootLedgerRef ?? null,
    wake_rows_ref: options.wakeRowsRef ?? null,
    action_rows_ref: options.actionRowsRef ?? null,
    stability_return_margin_ref: options.stabilityReturnMarginRef ?? null,
    retained_source_binding_ref: options.retainedSourceBindingRef ?? null,
    provider_object_ref: options.providerObjectRef ?? null,
  };
}

function supportPhi(bodyPosition, params) {
  const [x, y, z] = bodyPosition;
  return (x * x + y * y) / (params.R_perp * params.R_perp) +
    (z * z) / (params.R_parallel * params.R_parallel) -
    1;
}

function makeBodyBasis(params, alpha) {
  const theta = params.psi + alpha;
  const radialScale = params.R_perp * Math.sqrt(1 - params.zeta * params.zeta);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const bodyPosition = [
    radialScale * cosTheta,
    radialScale * sinTheta,
    params.R_parallel * params.zeta,
  ];
  const dpsi = [-radialScale * sinTheta, radialScale * cosTheta, 0];
  const dzetaScale = params.R_perp * (-params.zeta / Math.sqrt(1 - params.zeta * params.zeta));
  const dzeta = [dzetaScale * cosTheta, dzetaScale * sinTheta, params.R_parallel];
  const dRPerp = [Math.sqrt(1 - params.zeta * params.zeta) * cosTheta, Math.sqrt(1 - params.zeta * params.zeta) * sinTheta, 0];
  const dRParallel = [0, 0, params.zeta];
  return { theta, bodyPosition, dpsi, dzeta, dRPerp, dRParallel };
}

function makeKinematicRows(rowPrefix, params) {
  const rows = [];
  for (const pair of PAIR_OFFSETS) {
    const basis = makeBodyBasis(params, pair.alpha);
    const phaseVelocity = scaleVector(basis.dpsi, params.omega);
    const bodyAngularVelocity = cross(params.body_angular_velocity, basis.bodyPosition);
    const bodyInternalVelocity = addVectors(phaseVelocity, bodyAngularVelocity);
    for (const role of ["P", "E"]) {
      const sign = role === "P" ? 1 : -1;
      const bodyPosition = scaleVector(basis.bodyPosition, sign);
      const centerFrameVelocity = scaleVector(bodyInternalVelocity, sign);
      const velocity = addVectors(params.group_velocity, centerFrameVelocity);
      const architrinoId = `${role}:oblate-pair:${pair.pair_index}`;
      rows.push({
        row_id: `${rowPrefix}:kinematic:${architrinoId}`,
        schema: "oblate_spheroid_kinematic_row.v0",
        accepted: false,
        architrino_id: architrinoId,
        polarity: role,
        pair_index: pair.pair_index,
        antipodal_pair_ref: `${rowPrefix}:antipodal-pair:${pair.pair_index}`,
        body_phase_offset: pair.alpha,
        body_position: bodyPosition,
        center_frame_position: bodyPosition,
        dynamic_center: [0, 0, 0],
        group_velocity: [...params.group_velocity],
        center_frame_velocity: centerFrameVelocity,
        velocity,
        support_surface: {
          R_perp: params.R_perp,
          R_parallel: params.R_parallel,
          chi: params.chi,
          Phi: supportPhi(bodyPosition, params),
          pass: Math.abs(supportPhi(bodyPosition, params)) <= SUPPORT_RESIDUAL_EPSILON,
        },
        common_level: {
          center_radius: norm(bodyPosition),
          center_speed: norm(centerFrameVelocity),
          support_radius_class: "oblate_spheroid_same_level_candidate",
        },
        derivative_basis: {
          dpsi: scaleVector(basis.dpsi, sign),
          dzeta: scaleVector(basis.dzeta, sign),
          dR_perp: scaleVector(basis.dRPerp, sign),
          dR_parallel: scaleVector(basis.dRParallel, sign),
        },
        retained_record_id: params.retained_record_id,
        retained_root_ledger_ref: params.retained_root_ledger_ref,
      });
    }
  }
  return rows;
}

function makeAntipodalPairs(rowPrefix, kinematicRows) {
  return PAIR_OFFSETS.map((pair) => {
    const positrino = kinematicRows.find(
      (row) => row.pair_index === pair.pair_index && row.polarity === "P"
    );
    const electrino = kinematicRows.find(
      (row) => row.pair_index === pair.pair_index && row.polarity === "E"
    );
    const positionResidual = norm(addVectors(positrino.center_frame_position, electrino.center_frame_position));
    const velocityResidual = norm(addVectors(positrino.center_frame_velocity, electrino.center_frame_velocity));
    return {
      row_id: `${rowPrefix}:antipodal-pair:${pair.pair_index}`,
      schema: "oblate_spheroid_antipodal_pair_ref.v0",
      pair_index: pair.pair_index,
      positrino_row_id: positrino.row_id,
      electrino_row_id: electrino.row_id,
      position_residual: positionResidual,
      center_frame_velocity_residual: velocityResidual,
      pass: positionResidual <= SUPPORT_RESIDUAL_EPSILON && velocityResidual <= SUPPORT_RESIDUAL_EPSILON,
    };
  });
}

function makeCausalRootRequirements(rowPrefix, kinematicRows) {
  const rows = [];
  for (const receiver of kinematicRows) {
    for (const source of kinematicRows) {
      const sameSource = receiver.row_id === source.row_id;
      rows.push({
        row_id: `${rowPrefix}:causal-root:${receiver.architrino_id}->${source.architrino_id}`,
        schema: "oblate_spheroid_causal_root_requirement.v0",
        accepted: false,
        receiver_row_id: receiver.row_id,
        source_row_id: source.row_id,
        same_source_self_hit_required_when_root_exists: sameSource,
        causal_root_equation: "||V_g*tau + Q*y_receiver(t) - Q*y_source(t-tau)|| = c_f*tau",
        root_set_ref: null,
        retained_root_ledger_ref: null,
        source_normal_factor_requirement: {
          required: true,
          field: "D_s_ab",
          floor_ref: null,
          first_missing_field: FIRST_MISSING_FIELD,
        },
        receiver_normal_factor_requirement: {
          required: true,
          field: "D_t_ab",
          floor_ref: null,
          first_missing_field: FIRST_MISSING_FIELD,
        },
        wake_weight_requirement: {
          required: true,
          field: "W_ab_rec",
          row_ref: null,
          first_missing_field: FIRST_MISSING_FIELD,
        },
        first_missing_field: FIRST_MISSING_FIELD,
      });
    }
  }
  return rows;
}

function makeWakeAccelerationRequirements(rowPrefix, kinematicRows) {
  return kinematicRows.map((row) => ({
    row_id: `${rowPrefix}:wake-acceleration:${row.architrino_id}`,
    schema: "oblate_spheroid_wake_acceleration_requirement.v0",
    receiver_row_id: row.row_id,
    required_causal_root_rows: 6,
    wake_acceleration_row_ref: null,
    retained_wake_rows_ref: null,
    first_missing_field: FIRST_MISSING_FIELD,
  }));
}

function makeProjectionResidualRequirements(rowPrefix, kinematicRows) {
  const projections = [
    ["R_psi", "dpsi"],
    ["R_zeta", "dzeta"],
    ["R_perp", "dR_perp"],
    ["R_parallel", "dR_parallel"],
  ];
  return kinematicRows.flatMap((row) =>
    projections.map(([projection, basisField]) => ({
      row_id: `${rowPrefix}:projection:${projection}:${row.architrino_id}`,
      schema: "oblate_spheroid_projection_residual_requirement.v0",
      projection,
      receiver_row_id: row.row_id,
      basis_vector: row.derivative_basis[basisField],
      ansatz_acceleration_ref: null,
      wake_acceleration_row_ref: null,
      noether_sea_response_row_ref: null,
      residual_value: null,
      accepted: false,
      first_missing_field: FIRST_MISSING_FIELD,
    }))
  );
}

function makeNoetherSeaPressureRows(rowPrefix, kinematicRows, params) {
  const enabled = params.K_sea != null || params.Gamma_sea != null;
  return {
    schema: "oblate_spheroid_noether_sea_pressure_diagnostic.v0",
    enabled,
    K_sea: params.K_sea,
    Gamma_sea: params.Gamma_sea,
    authority_class: enabled
      ? "diagnostic_pressure_coefficients_not_retained_noether_sea_response"
      : "no_noether_sea_pressure_term_requested",
    accepted_noether_sea_response: false,
    pressure_rows: kinematicRows.map((row) => ({
      row_id: `${rowPrefix}:noether-sea-pressure:${row.architrino_id}`,
      receiver_row_id: row.row_id,
      pressure_support_term_required: enabled,
      noether_sea_response_row_ref: null,
      support_surface_phi: row.support_surface.Phi,
      first_missing_field: enabled
        ? "oblate_spheroid_reduced_residual_row.noether_sea_pressure_rows[*].noether_sea_response_row_ref"
        : null,
    })),
  };
}

function firstMissing(params) {
  if (params.retained_root_ledger_ref == null) {
    return {
      artifact_status: "fail_closed_missing_retained_root_ledger",
      first_missing_object: FIRST_MISSING_OBJECT,
      first_missing_field: FIRST_MISSING_FIELD,
      reason: "retained_root_ledger_missing",
    };
  }
  if (params.wake_rows_ref == null) {
    return {
      artifact_status: "fail_closed_missing_retained_wake_rows",
      first_missing_object: "same_record_wake_acceleration_rows_for_oblate_spheroid_residual",
      first_missing_field: "oblate_spheroid_reduced_residual_row.wake_acceleration_requirements[*].retained_wake_rows_ref",
      reason: "retained_wake_rows_missing",
    };
  }
  if (params.action_rows_ref == null) {
    return {
      artifact_status: "fail_closed_missing_same_record_action_rows",
      first_missing_object: "same_record_action_rows_for_oblate_spheroid_residual",
      first_missing_field: "oblate_spheroid_reduced_residual_row.action_proxy_row.action_rows_ref",
      reason: "same_record_action_rows_missing",
    };
  }
  if (params.stability_return_margin_ref == null) {
    return {
      artifact_status: "fail_closed_missing_stability_return_margin_row",
      first_missing_object: "stability_or_return_margin_row_for_oblate_spheroid_residual",
      first_missing_field: "oblate_spheroid_reduced_residual_row.fixed_frequency_validation_row.stability_return_margin_ref",
      reason: "stability_return_margin_missing",
    };
  }
  if (params.retained_source_binding_ref == null || params.retained_record_id == null) {
    return {
      artifact_status: "fail_closed_missing_retained_source_binding",
      first_missing_object: "retained_source_binding_for_oblate_spheroid_residual",
      first_missing_field: "oblate_spheroid_reduced_residual_row.retained_source_binding.retained_record_id",
      reason: "retained_source_binding_missing",
    };
  }
  if (params.provider_object_ref == null) {
    return {
      artifact_status: "fail_closed_missing_provider_object",
      first_missing_object: "provider_object_for_oblate_spheroid_reduced_residual_row",
      first_missing_field: "oblate_spheroid_reduced_residual_row.provider_provenance.provider_object_ref",
      reason: "provider_object_ref_missing",
    };
  }
  return {
    artifact_status: "fail_closed_missing_acceptance_certificate",
    first_missing_object: "acceptance_certificate_for_oblate_spheroid_reduced_residual_row",
    first_missing_field: "oblate_spheroid_reduced_residual_row.acceptance_certificate_ref",
    reason: "producer_does_not_authorize_accepted_residual_evidence",
  };
}

export function evaluateOblateSpheroidReducedResidualEvidence(candidate = {}) {
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
      reason: "schema_not_oblate_spheroid_reduced_residual_row_v0",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (!Array.isArray(candidate.kinematic_rows) || candidate.kinematic_rows.length !== 6) {
    return {
      accepted: false,
      reason: "six_kinematic_rows_required",
      first_missing_field: "oblate_spheroid_reduced_residual_row.kinematic_rows",
    };
  }
  if (candidate.root_ledger_status?.retained_root_ledger_ref == null) {
    return {
      accepted: false,
      reason: "retained_root_ledger_missing",
      first_missing_field: FIRST_MISSING_FIELD,
    };
  }
  if (candidate.provider_provenance?.provider_object_ref == null) {
    return {
      accepted: false,
      reason: "provider_object_ref_missing",
      first_missing_field: "oblate_spheroid_reduced_residual_row.provider_provenance.provider_object_ref",
    };
  }
  return {
    accepted: false,
    reason: "producer_does_not_authorize_accepted_residual_evidence",
    first_missing_field: "oblate_spheroid_reduced_residual_row.acceptance_certificate_ref",
  };
}

export function buildOblateSpheroidReducedResidualRow(options = {}) {
  const params = makeParameters(options);
  const artifactKey = {
    schema: SCHEMA,
    seedId: params.seed_id,
    routeId: params.route_id,
    groupVelocity: params.group_velocity,
    RPerp: params.R_perp,
    chi: params.chi,
    zeta: params.zeta,
    vOrb: params.v_orb,
    psi: params.psi,
    omega: params.omega,
    bodyAngularVelocity: params.body_angular_velocity,
    KSea: params.K_sea,
    GammaSea: params.Gamma_sea,
  };
  const artifactHash = stableHash(artifactKey);
  const rowPrefix = `oblate_spheroid_reduced_residual_row:${artifactHash.slice(0, 16)}`;
  const missing = firstMissing(params);
  const kinematicRows = makeKinematicRows(rowPrefix, params);
  const antipodalPairRefs = makeAntipodalPairs(rowPrefix, kinematicRows);
  const causalRootRequirements = makeCausalRootRequirements(rowPrefix, kinematicRows);
  const wakeAccelerationRequirements = makeWakeAccelerationRequirements(rowPrefix, kinematicRows);
  const projectionResidualRequirements = makeProjectionResidualRequirements(rowPrefix, kinematicRows);
  const noetherSeaPressureDiagnostic = makeNoetherSeaPressureRows(rowPrefix, kinematicRows, params);

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: artifactHash,
    seed_id: params.seed_id,
    route_id: params.route_id,
    authority_class: "fail_closed_reduced_residual_requirements_not_retained_evidence",
    parameters: {
      group_velocity: params.group_velocity,
      group_speed: norm(params.group_velocity),
      field_speed: params.field_speed,
      coupling: params.coupling,
      R_perp: params.R_perp,
      chi: params.chi,
      R_parallel: params.R_parallel,
      orbital_radius: params.orbital_radius,
      v_orb: params.v_orb,
      zeta: params.zeta,
      psi: params.psi,
      omega: params.omega,
      body_angular_velocity: params.body_angular_velocity,
      K_sea: params.K_sea,
      Gamma_sea: params.Gamma_sea,
    },
    closure_convention: {
      labeled_retained_path_history_required: true,
      quotient_level_closure_allowed_for_assembly_state: true,
      selected_closure_level: "labeled_retained_path_history",
      labeled_phase_closure: "Delta_psi = 2*pi*m_psi",
      quotient_phase_closure: "Delta_psi = 2*pi*m_psi/3",
      retained_path_history_must_declare_closure_level: true,
    },
    kinematic_rows: kinematicRows,
    support_surface_checks: {
      equation: "Phi(y;R_perp,R_parallel)=(y1^2+y2^2)/R_perp^2+y3^2/R_parallel^2-1",
      epsilon: SUPPORT_RESIDUAL_EPSILON,
      max_abs_phi: Math.max(...kinematicRows.map((row) => Math.abs(row.support_surface.Phi))),
      pass: kinematicRows.every((row) => row.support_surface.pass),
    },
    antipodal_pair_refs: antipodalPairRefs,
    common_level_radius_speed_rows: kinematicRows.map((row) => ({
      row_id: `${rowPrefix}:common-level:${row.architrino_id}`,
      kinematic_row_id: row.row_id,
      center_radius: row.common_level.center_radius,
      center_speed: row.common_level.center_speed,
      retained_record_id: params.retained_record_id,
      accepted: false,
    })),
    causal_root_equation_requirements: causalRootRequirements,
    wake_acceleration_row_requirements: wakeAccelerationRequirements,
    noether_sea_pressure_diagnostic: noetherSeaPressureDiagnostic,
    projection_residual_requirements: projectionResidualRequirements,
    center_residual_requirement: {
      row_id: `${rowPrefix}:center-residual:R_C`,
      schema: "oblate_spheroid_center_residual_requirement.v0",
      equation: "R_C = sum_a E_a",
      residual_value: null,
      retained_root_ledger_ref: params.retained_root_ledger_ref,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    angular_residual_requirement: {
      row_id: `${rowPrefix}:angular-residual:R_J`,
      schema: "oblate_spheroid_angular_residual_requirement.v0",
      equation: "R_J = sum_a (x_a-C) x E_a",
      residual_value: null,
      retained_root_ledger_ref: params.retained_root_ledger_ref,
      first_missing_field: FIRST_MISSING_FIELD,
    },
    action_proxy_row: {
      row_id: `${rowPrefix}:action-proxy`,
      schema: "oblate_spheroid_action_proxy_requirement.v0",
      integral: "A(T)=integral sum_a mu_arch * dx_a/dt dot dx_a",
      action_rows_ref: params.action_rows_ref,
      accepted_same_ledger_action_measure_row: false,
      first_missing_field: "oblate_spheroid_reduced_residual_row.action_proxy_row.action_rows_ref",
    },
    root_ledger_status: {
      required: true,
      retained_root_ledger_ref: params.retained_root_ledger_ref,
      causal_root_requirement_count: causalRootRequirements.length,
      same_source_self_hit_requirement_count: causalRootRequirements.filter(
        (row) => row.same_source_self_hit_required_when_root_exists
      ).length,
      root_loss_windows_ref: null,
      source_normal_denominator_floor_ref: null,
      status: params.retained_root_ledger_ref == null ? "missing_retained_root_ledger" : "retained_root_ledger_present_unaccepted",
      first_missing_field: FIRST_MISSING_FIELD,
    },
    fixed_frequency_validation_row: {
      row_id: `${rowPrefix}:fixed-frequency-validation`,
      schema: "oblate_spheroid_fixed_frequency_validation_row.v0",
      theta: {
        u: norm(params.group_velocity),
        R_perp: params.R_perp,
        chi: params.chi,
        zeta_0: params.zeta,
        v_orb: params.v_orb,
        omega: params.omega,
        Omega: params.body_angular_velocity,
        K_sea: params.K_sea,
      },
      required_residuals: ["R_psi", "R_zeta", "R_perp", "R_parallel", "R_C", "R_J"],
      allowed_failure_codes: [
        "root_loss",
        "small_denominator",
        "pressure_artifact",
        "action_drift",
        "same_level_loss",
        "escape",
      ],
      stability_return_margin_ref: params.stability_return_margin_ref,
      status: "not_evaluated_missing_same_record_inputs",
      accepted: false,
    },
    retained_source_binding: {
      retained_record_id: params.retained_record_id,
      retained_source_binding_ref: params.retained_source_binding_ref,
      same_record_binding_required: true,
      status:
        params.retained_record_id == null || params.retained_source_binding_ref == null
          ? "missing_retained_source_binding"
          : "retained_source_binding_present_unaccepted",
    },
    provider_provenance: {
      required: true,
      provider_object_ref: params.provider_object_ref,
      provider_artifact_hash: null,
      status: params.provider_object_ref == null ? "missing_provider_object_ref" : "provider_present_unaccepted",
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
}

export function validateOblateSpheroidReducedResidualRow(artifact) {
  const errors = [];
  if (artifact?.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (!Array.isArray(artifact?.kinematic_rows) || artifact.kinematic_rows.length !== 6) {
    errors.push("six kinematic rows are required");
  }
  if (!Array.isArray(artifact?.antipodal_pair_refs) || artifact.antipodal_pair_refs.length !== 3) {
    errors.push("three antipodal pair refs are required");
  }
  if (
    !Array.isArray(artifact?.causal_root_equation_requirements) ||
    artifact.causal_root_equation_requirements.length !== 36
  ) {
    errors.push("thirty-six directed causal-root requirements are required");
  }
  const sameSourceCount = artifact?.causal_root_equation_requirements?.filter(
    (row) => row.same_source_self_hit_required_when_root_exists
  ).length;
  if (sameSourceCount !== 6) {
    errors.push("six same-source self-hit requirements are required");
  }
  if (!Array.isArray(artifact?.projection_residual_requirements) || artifact.projection_residual_requirements.length !== 24) {
    errors.push("twenty-four projection residual requirements are required");
  }
  if (artifact?.support_surface_checks?.pass !== true) {
    errors.push("support-surface checks must pass for constructed kinematic rows");
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
    const result = evaluateOblateSpheroidReducedResidualEvidence({ evidence_class: evidenceClass });
    if (result.accepted || result.reason !== reason) {
      errors.push(`${evidenceClass} negative control must reject as ${reason}`);
    }
  }
  return errors;
}

function runCli() {
  const artifact = buildOblateSpheroidReducedResidualRow();
  const errors = validateOblateSpheroidReducedResidualRow(artifact);
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
