import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const SCHEMA = "self_hit_held_release_solver_row.v0";
export const DEFAULT_SEED_ID = "braid-ideal:held-release:face-opposite:six-point:v0";
export const DEFAULT_ROUTE_ID = "braid-ideal:self-hit-held-release:face-opposite:v0";
export const DEFAULT_GROUP_VELOCITY = [1 / 60, 1 / 60, 1 / 60];
export const CANDIDATE_SAME_RECORD_REQUEST_SCHEMA = "sh_0_sea_candidate_same_record_request.v0";
export const SEA_SELF_HIT_COMPARISON_SCHEMA = "sea_screened_self_hit_comparison_row.diagnostic.v0";

const DEFAULT_FIELD_SPEED = 1;
const DEFAULT_COUPLING = 1 / 36;
const DEFAULT_DURATION = 18;
const DEFAULT_TIME_STEP = 0.024;
const DEFAULT_HOLD_TIME = 4;

const SIX_POINT_SEED = [
  { architrino_id: "P:+x:+y:+z", polarity: "P", sign: 1, position: [1, 1, 1] },
  { architrino_id: "P:+x:-y:-z", polarity: "P", sign: 1, position: [1, -1, -1] },
  { architrino_id: "P:-x:+y:-z", polarity: "P", sign: 1, position: [-1, 1, -1] },
  { architrino_id: "E:-x:-y:-z", polarity: "E", sign: -1, position: [-1, -1, -1] },
  { architrino_id: "E:-x:+y:+z", polarity: "E", sign: -1, position: [-1, 1, 1] },
  { architrino_id: "E:+x:-y:+z", polarity: "E", sign: -1, position: [1, -1, 1] },
];

const REQUIRED_RETAINED_HISTORY_FIELDS = [
  "central_solver_retained_history_row",
  "path_history_stream_ids",
  "same_source_self_hit_rows",
  "partner_causal_root_replay_rows",
  "retained_wake_history_rows",
  "same_record_action_ledger_rows",
  "branch_row_identity",
  "oblate_spheroid_residual_rows",
  "stability_or_return_margin_row",
  "retained_source_binding",
  "provider_provenance",
];

const NEGATIVE_CONTROLS = [
  "priority_only_held_release_toy_not_retained_history",
  "dirty_checkpoint_output_not_accepted_evidence",
  "circular_self_hit_span_not_six_point_retained_row",
  "moving_circular_same_source_roots_not_held_release_row",
  "path_history_stream_without_same_record_binding_not_accepted",
  "t3_retained_replay_rows_not_braid_ideal_evidence",
  "aggregate_or_cross_row_bundle_not_same_record",
  "candidate_or_proxy_refs_not_accepted",
];

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeVector(value, fallback) {
  if (!Array.isArray(value) || value.length !== 3) {
    return [...fallback];
  }
  return value.map((entry, index) => {
    const number = Number(entry);
    return Number.isFinite(number) ? number : fallback[index];
  });
}

function formatIdPart(value) {
  return String(value)
    .replaceAll("+", "plus")
    .replaceAll("-", "minus")
    .replaceAll(":", "_")
    .replaceAll(".", "_")
    .replaceAll("/", "_");
}

function makeRequestedPathHistoryStreams(rowPrefix, seedRows) {
  return seedRows.map((row, index) => ({
    architrino_id: row.architrino_id,
    requested_stream_id: `${rowPrefix}:path-history:${index}:${formatIdPart(row.architrino_id)}`,
    status: "request_only_missing_central_solver_retained_history_row",
    stream_id: null,
    path_segment_count: null,
    retained_history_binding: null,
  }));
}

function makeSameSourceSelfHitRequirements(rowPrefix, seedRows) {
  return seedRows.map((row, index) => ({
    row_id: `${rowPrefix}:same-source-self-hit:${index}:${formatIdPart(row.architrino_id)}`,
    receiver_architrino_id: row.architrino_id,
    source_architrino_id: row.architrino_id,
    required_relation: "strictly-delayed-same-source-root",
    required_path_history_stream_id: `${rowPrefix}:path-history:${index}:${formatIdPart(row.architrino_id)}`,
    causal_root_replay_ref: null,
    accepted_same_source_self_hit_row: null,
    first_missing_field: "central_solver_retained_history_row",
  }));
}

function makePartnerCausalRootRequirements(rowPrefix, seedRows) {
  const rows = [];
  for (const receiver of seedRows) {
    for (const source of seedRows) {
      if (receiver.architrino_id === source.architrino_id) {
        continue;
      }
      rows.push({
        row_id: `${rowPrefix}:partner-root:${formatIdPart(receiver.architrino_id)}:${formatIdPart(source.architrino_id)}`,
        receiver_architrino_id: receiver.architrino_id,
        source_architrino_id: source.architrino_id,
        required_relation: "partner-causal-root-replay",
        causal_root_replay_ref: null,
        retained_causal_root_row_id: null,
        first_missing_field: "central_solver_retained_history_row",
      });
    }
  }
  return rows;
}

function makeLedgerHook(name, rowPrefix) {
  return {
    ledger: name,
    required_same_record_binding: true,
    hook_id: `${rowPrefix}:${name}:hook`,
    accepted_rows: [],
    first_missing_field: "central_solver_retained_history_row",
    retained_source_binding: null,
    provider_provenance: null,
  };
}

// Candidate same-record target binding: consumes the named SH-0-sea spacing
// candidate request (`sh_0_sea_candidate_same_record_request.v0`) as this
// row's declared sea-environment target binding. The binding authorizes
// nothing; it records which candidate the eventual retained-history row must
// bind to, and it inherits the request's own fail-closed blocker chain.
function buildCandidateSameRecordTargetBinding(request) {
  if (request == null) {
    return {
      required_schema: CANDIDATE_SAME_RECORD_REQUEST_SCHEMA,
      supplied: false,
      binding_status: "candidate_request_missing",
      candidate_id: null,
      a_fcc: null,
      consumer_listed: null,
      request_first_missing_object: null,
      authorizes_nothing: true,
      first_missing_field: "candidate_same_record_request",
    };
  }
  const consumers = Array.isArray(request.downstream_consumers) ? request.downstream_consumers : [];
  const schemaMatches = request.schema === CANDIDATE_SAME_RECORD_REQUEST_SCHEMA;
  const candidateId = request.candidate?.candidate_id ?? null;
  const consumerListed = consumers.includes("self_hit_held_release_solver_row");
  const bound = schemaMatches && candidateId != null && consumerListed;
  return {
    required_schema: CANDIDATE_SAME_RECORD_REQUEST_SCHEMA,
    supplied: true,
    binding_status: bound
      ? "candidate_request_bound_not_accepted"
      : "candidate_request_invalid_or_consumer_not_listed",
    candidate_id: candidateId,
    a_fcc: request.candidate?.a_fcc ?? null,
    candidate_inward_projection: request.candidate?.Pi_R_A_sea ?? null,
    consumer_listed: consumerListed,
    request_authority_class: request.authority_class ?? null,
    request_first_missing_object: request.first_missing_object ?? null,
    authorizes_nothing: true,
    first_missing_field: bound ? null : "candidate_same_record_request",
  };
}

// Diagnostic witness comparison of one sea-screened held-release toy row with
// same-source self-hits enabled against its self-hit-disabled baseline.
// Priority-only toy probe; never accepted evidence.
export function summarizeSeaScreenedSelfHitComparison({ runHandle, withSelfHits, withoutSelfHits }) {
  const frameCrossTime = (result) => {
    const frame = result.frames.find((entry) => entry.metrics.fieldSpeedRatioMax >= 1);
    return frame ? frame.time : null;
  };
  const returnTurnTimes = (result) =>
    result.trajectoryDiagnostics.radialTurnRows
      .filter((turn) => turn.turnKind === "expansion_to_compression")
      .map((turn) => turn.time);
  const finalMetrics = (result) => result.frames[result.frames.length - 1].metrics;

  if (withSelfHits.configuration.includeSelfHits !== true) {
    throw new TypeError("withSelfHits result must have includeSelfHits=true");
  }
  if (withoutSelfHits.configuration.includeSelfHits === true) {
    throw new TypeError("withoutSelfHits result must have includeSelfHits=false");
  }

  let firstDivergenceTime = null;
  const frameCount = Math.min(withSelfHits.frames.length, withoutSelfHits.frames.length);
  for (let index = 0; index < frameCount; index += 1) {
    const a = withSelfHits.frames[index].metrics;
    const b = withoutSelfHits.frames[index].metrics;
    if (Math.abs(a.radiusMean - b.radiusMean) > 1e-12 || Math.abs(a.speedMax - b.speedMax) > 1e-12) {
      firstDivergenceTime = withSelfHits.frames[index].time;
      break;
    }
  }
  const crossingWith = frameCrossTime(withSelfHits);
  const crossingWithout = frameCrossTime(withoutSelfHits);
  const selfHitActivationAtHinge =
    firstDivergenceTime == null || (crossingWith != null && firstDivergenceTime >= crossingWith);
  const withFinal = finalMetrics(withSelfHits);
  const withoutFinal = finalMetrics(withoutSelfHits);
  const amplifiesRunaway =
    selfHitActivationAtHinge &&
    withSelfHits.rootStats.selfHitRoots > 0 &&
    withFinal.fieldSpeedRatioMax > withoutFinal.fieldSpeedRatioMax;
  return {
    schema: SEA_SELF_HIT_COMPARISON_SCHEMA,
    authority: "priority_only_toy_probe_not_accepted_evidence",
    accepted: false,
    run_handle: runHandle,
    fcc_sea_spacing: withSelfHits.configuration.fccSeaShell?.spacing ?? null,
    prehistory_mode: withSelfHits.configuration.prehistoryMode ?? null,
    surface_speed_fraction:
      withSelfHits.configuration.angularMomentumRelease?.surfaceSpeedFraction ?? 0,
    self_hit_min_delay: withSelfHits.configuration.selfHitMinDelay ?? null,
    return_turn_times_with_self_hits: returnTurnTimes(withSelfHits),
    return_turn_times_without_self_hits: returnTurnTimes(withoutSelfHits),
    field_speed_crossing_frame_time_with: crossingWith,
    field_speed_crossing_frame_time_without: crossingWithout,
    first_divergence_frame_time: firstDivergenceTime,
    self_hit_activation_at_field_speed_hinge: selfHitActivationAtHinge,
    self_hit_roots: withSelfHits.rootStats.selfHitRoots,
    max_self_hit_roots_per_directed_pair: withSelfHits.rootStats.maxSelfHitRootsPerDirectedPair,
    max_branch_weight_with: withSelfHits.rootStats.maxBranchWeight,
    max_branch_weight_without: withoutSelfHits.rootStats.maxBranchWeight,
    final_radius_mean_with: withFinal.radiusMean,
    final_radius_mean_without: withoutFinal.radiusMean,
    final_field_speed_ratio_with: withFinal.fieldSpeedRatioMax,
    final_field_speed_ratio_without: withoutFinal.fieldSpeedRatioMax,
    hinge_absorber_finding: amplifiesRunaway
      ? "self_hit_channel_amplifies_post_hinge_runaway_not_absorber"
      : selfHitActivationAtHinge
        ? "no_post_hinge_amplification_witnessed"
        : "sub_field_divergence_witnessed_self_hit_policy_defect",
  };
}

function buildSeaScreenedSelfHitDiagnosticWitness(comparisonRows) {
  if (!Array.isArray(comparisonRows) || comparisonRows.length === 0) {
    return {
      authority: "priority_only_toy_probe_not_accepted_evidence",
      rows: [],
      hinge_absorber_decision: "no_comparison_rows_supplied",
      first_missing_field: "sea_screened_self_hit_comparison_rows",
    };
  }
  const allActivationsAtHinge = comparisonRows.every(
    (row) => row.self_hit_activation_at_field_speed_hinge === true
  );
  const allAmplify = comparisonRows.every(
    (row) => row.hinge_absorber_finding === "self_hit_channel_amplifies_post_hinge_runaway_not_absorber"
  );
  return {
    authority: "priority_only_toy_probe_not_accepted_evidence",
    rows: comparisonRows,
    // Claim discipline: the ejection magnitude is regularization-dependent
    // (softening / Jacobian floor / self-hit minimum delay), so the toy
    // witnesses the uncontrolled fold crossing, not the controlled click; it
    // cannot decide the click-absorber question. See the packet section
    // "Self-Hit Probe Inside the Sea Shell - 2026-07-07".
    hinge_absorber_decision: allAmplify
      ? "naive_self_hit_kernel_uniformly_ejective_toy_cannot_decide_controlled_click"
      : allActivationsAtHinge
        ? "mixed_findings_absorber_question_open"
        : "comparison_defect_sub_field_divergence",
    first_missing_field: null,
  };
}

export function buildSelfHitHeldReleaseSolverRow(options = {}) {
  const seedId = options.seedId ?? DEFAULT_SEED_ID;
  const routeId = options.routeId ?? DEFAULT_ROUTE_ID;
  const groupVelocity = normalizeVector(options.groupVelocity, DEFAULT_GROUP_VELOCITY);
  const seedRows = SIX_POINT_SEED.map((row) => ({ ...row, position: [...row.position] }));
  const rowKey = {
    schema: SCHEMA,
    seedId,
    routeId,
    fieldSpeed: Number(options.fieldSpeed ?? DEFAULT_FIELD_SPEED),
    coupling: Number(options.coupling ?? DEFAULT_COUPLING),
    duration: Number(options.duration ?? DEFAULT_DURATION),
    dt: Number(options.dt ?? DEFAULT_TIME_STEP),
    groupVelocity,
  };
  const rowHash = stableHash(rowKey);
  const rowPrefix = `self_hit_held_release_solver_row:${rowHash.slice(0, 16)}`;

  const pathHistoryStreamRequests = makeRequestedPathHistoryStreams(rowPrefix, seedRows);
  const sameSourceSelfHitRequirements = makeSameSourceSelfHitRequirements(rowPrefix, seedRows);
  const partnerCausalRootReplayRequirements = makePartnerCausalRootRequirements(rowPrefix, seedRows);
  const candidateSameRecordTargetBinding = buildCandidateSameRecordTargetBinding(
    options.candidateSameRecordRequest ?? null
  );
  const seaScreenedSelfHitDiagnosticWitness = buildSeaScreenedSelfHitDiagnosticWitness(
    options.seaScreenedSelfHitComparisonRows ?? null
  );

  return {
    schema: SCHEMA,
    row_id: rowPrefix,
    artifact_hash: rowHash,
    artifact_status: "fail_closed_missing_central_solver_retained_history_row",
    source_status: "source_acquisition_blocked",
    first_missing_object: "central_solver_retained_history_row",
    first_missing_field: "central_solver_retained_history_row",
    seed_id: seedId,
    route_id: routeId,
    seed: {
      seed_kind: "six_point_face_opposite_held_release",
      point_count: seedRows.length,
      rows: seedRows,
    },
    held_prehistory_metadata: {
      hold_time: Number(options.holdTime ?? DEFAULT_HOLD_TIME),
      prehistory_status: "declared_request_not_retained",
      stationary_in_moving_center_frame: true,
      central_solver_retained_history_row: null,
    },
    dynamics: {
      field_speed: rowKey.fieldSpeed,
      coupling: rowKey.coupling,
      duration: rowKey.duration,
      dt: rowKey.dt,
      dynamic_center: {
        required: true,
        center_kind: "same-record-dynamic-center",
        value: null,
        first_missing_field: "central_solver_retained_history_row",
      },
      group_velocity: {
        required: true,
        value: groupVelocity,
        source_status: "declared_seed_parameter_not_retained_history_evidence",
      },
    },
    path_history_stream_requests: pathHistoryStreamRequests,
    same_source_self_hit_row_requirements: sameSourceSelfHitRequirements,
    partner_causal_root_replay_requirements: partnerCausalRootReplayRequirements,
    wake_ledger_hooks: [makeLedgerHook("retained_wake_history_rows", rowPrefix)],
    action_ledger_hooks: [makeLedgerHook("same_record_action_ledger_rows", rowPrefix)],
    branch_row_identity_requirements: {
      branch_row_identity: null,
      required_fields: [
        "branch_row_id",
        "retained_record_id",
        "same_record_binding",
        "receiver_normal_branch_strength_linkage",
      ],
      first_missing_field: "central_solver_retained_history_row",
    },
    oblate_spheroid_residual_row_requirements: {
      required: true,
      residual_rows: [],
      required_fields: [
        "dynamic_center",
        "group_velocity",
        "equatorial_radius",
        "polar_radius",
        "flattening_ratio",
        "same_record_residual_norm",
      ],
      first_missing_field: "central_solver_retained_history_row",
    },
    stability_or_return_margin_requirement: {
      required: true,
      accepted_stability_or_return_margin_row: null,
      first_missing_field: "central_solver_retained_history_row",
    },
    retained_source_binding_requirement: {
      required: true,
      retained_source_binding: null,
      first_missing_field: "central_solver_retained_history_row",
    },
    candidate_same_record_target_binding: candidateSameRecordTargetBinding,
    sea_screened_self_hit_diagnostic_witness: seaScreenedSelfHitDiagnosticWitness,
    central_solver_self_hit_brake_finding: {
      // Consumed finding from self-hit-brake-central-measurement.mjs, which drives
      // the production same-source causal-root runtime
      // (AbsoluteHistoryRootRuntime.solveMovingCircularSameSourceCausalRoots).
      // The production runtime emits the signed branch orientation
      // receiverNormalFactor = D_T/D_s (absorptive, m < 0, under the pump-driven
      // tangential acceleration), superseding the naive |m| ejective reading.
      // The magnitude reduces to the operator-declared coincidence-stratum scale d0
      // (operator decision 2026-07-08); the symmetric single-site self-hit is therefore
      // NOT the load-bearing absorber (its d0-set magnitude is ~50x the tangential pump).
      authority: "priority_only_central_solver_measurement_not_accepted_evidence",
      disposition:
        "central_solver_self_hit_brake_sign_absorptive_magnitude_set_by_operator_declared_d0_not_load_bearing",
      signed_orientation_emitted_by_production: true,
      sign_decided_absorptive: true,
      magnitude_reduces_to_declared_stratum: true,
      // Two of the three producer gaps are now landed in the production runtime
      // (AbsoluteHistoryRootRuntime): the signed branch orientation is emitted
      // as `signedBranchOrientation`, and the moving-circular source history
      // accepts an optional `angularAcceleration` so the same-source root
      // realizes the pump-driven crossing (m<0) directly.
      // Operator decision 2026-07-08: the declared coincidence-stratum length scale is d0,
      // of order the near-field two-body scale kappa*epsilon^2/c_f^2 (R_*); in the
      // minimum-circular-binary reading d0 = R_MCB, the collapse-arresting radius set by the
      // self-hit. This declares the same-source hinge magnitude scale but does NOT make the
      // symmetric single-site self-hit the load-bearing absorber (d0-set magnitude ~50x the
      // pump). d0's exact value derivation from (kappa, epsilon, c_f) remains open
      // (content/markdown/aaa/assemblies/particle-masses.md).
      declared_coincidence_stratum: {
        symbol: "d0",
        of_order: "kappa*epsilon^2/c_f^2",
        reading: "minimum_circular_binary_radius_R_MCB_collapse_arresting",
        operator_decision_date: "2026-07-08",
        exact_value_derivation_status: "open_from_kappa_epsilon_cf",
        symmetric_self_hit_load_bearing: false,
        symmetric_self_hit_magnitude_vs_pump: "about_50x_too_large",
      },
      resolved_producer_gaps: [
        "same_source_branch_weight_discards_sign",
        "rigid_circle_same_source_history_reflection_locks_sign",
        "coincidence_stratum_declared_as_d0_by_operator_2026_07_08",
      ],
      open_producer_gaps: ["non_coincident_cross_hit_sustained_velocity_alignment_formation_history"],
      first_missing_object: "non_coincident_cross_hit_hinge_sustained_alignment_over_a_click_window",
    },
    provider_provenance_requirement: {
      required: true,
      provider_object: null,
      provider_provenance: null,
      first_missing_field: "central_solver_retained_history_row",
    },
    required_retained_history_fields: [...REQUIRED_RETAINED_HISTORY_FIELDS],
    missing_retained_history_fields: [...REQUIRED_RETAINED_HISTORY_FIELDS],
    authorization: {
      accepted_same_record_evidence: false,
      retained_branch_claim: false,
      accepted_transition_source: false,
      moving_retained_branch_certificate: false,
      same_ledger_action_measure_row: false,
      bounded_speed_live_ledger: false,
      receiver_normal_branch_strength: false,
      score_movement: "no_score_increase",
    },
    negative_controls: [...NEGATIVE_CONTROLS],
  };
}

export function validateSelfHitHeldReleaseSolverRow(row) {
  const errors = [];
  if (row?.schema !== SCHEMA) {
    errors.push("schema mismatch");
  }
  if (row?.artifact_status !== "fail_closed_missing_central_solver_retained_history_row") {
    errors.push("artifact must fail closed at central_solver_retained_history_row");
  }
  if (row?.first_missing_field !== "central_solver_retained_history_row") {
    errors.push("first missing field must be central_solver_retained_history_row");
  }
  if (!Array.isArray(row?.path_history_stream_requests) || row.path_history_stream_requests.length !== 6) {
    errors.push("six path-history stream requests are required");
  }
  if (!Array.isArray(row?.same_source_self_hit_row_requirements) || row.same_source_self_hit_row_requirements.length !== 6) {
    errors.push("six same-source self-hit row requirements are required");
  }
  if (
    !Array.isArray(row?.partner_causal_root_replay_requirements) ||
    row.partner_causal_root_replay_requirements.length !== 30
  ) {
    errors.push("thirty directed partner causal-root replay requirements are required");
  }
  for (const [field, expected] of Object.entries({
    accepted_same_record_evidence: false,
    retained_branch_claim: false,
    accepted_transition_source: false,
    moving_retained_branch_certificate: false,
    same_ledger_action_measure_row: false,
    bounded_speed_live_ledger: false,
    receiver_normal_branch_strength: false,
  })) {
    if (row?.authorization?.[field] !== expected) {
      errors.push(`${field} must remain ${expected}`);
    }
  }
  if (row?.authorization?.score_movement !== "no_score_increase") {
    errors.push("score movement must remain no_score_increase");
  }
  const binding = row?.candidate_same_record_target_binding;
  if (binding == null || binding.authorizes_nothing !== true) {
    errors.push("candidate same-record target binding must be present and authorize nothing");
  }
  if (binding?.required_schema !== CANDIDATE_SAME_RECORD_REQUEST_SCHEMA) {
    errors.push(`candidate binding must require ${CANDIDATE_SAME_RECORD_REQUEST_SCHEMA}`);
  }
  const witness = row?.sea_screened_self_hit_diagnostic_witness;
  if (witness == null || witness.authority !== "priority_only_toy_probe_not_accepted_evidence") {
    errors.push("sea-screened self-hit diagnostic witness must carry priority-only toy-probe authority");
  }
  if (Array.isArray(witness?.rows)) {
    for (const comparisonRow of witness.rows) {
      if (comparisonRow.accepted !== false || comparisonRow.schema !== SEA_SELF_HIT_COMPARISON_SCHEMA) {
        errors.push("every self-hit comparison row must be unaccepted and carry the comparison schema");
        break;
      }
    }
  }
  return errors;
}

function readJsonOption(rawArgs, flag) {
  const index = rawArgs.indexOf(flag);
  if (index === -1) {
    return null;
  }
  const value = rawArgs[index + 1];
  if (value == null || value.startsWith("--")) {
    throw new TypeError(`${flag} requires a path value`);
  }
  return JSON.parse(fs.readFileSync(value, "utf8"));
}

function runCli() {
  const rawArgs = process.argv.slice(2);
  const candidateSameRecordRequest = readJsonOption(rawArgs, "--candidate-same-record-request-json");
  // Comparisons file: array of { run_handle, with_result_path, without_result_path }.
  const comparisonsManifest = readJsonOption(rawArgs, "--sea-self-hit-comparisons-json");
  const seaScreenedSelfHitComparisonRows = Array.isArray(comparisonsManifest)
    ? comparisonsManifest.map((entry) =>
        summarizeSeaScreenedSelfHitComparison({
          runHandle: entry.run_handle,
          withSelfHits: JSON.parse(fs.readFileSync(entry.with_result_path, "utf8")),
          withoutSelfHits: JSON.parse(fs.readFileSync(entry.without_result_path, "utf8")),
        })
      )
    : null;
  const row = buildSelfHitHeldReleaseSolverRow({
    candidateSameRecordRequest,
    seaScreenedSelfHitComparisonRows,
  });
  const errors = validateSelfHitHeldReleaseSolverRow(row);
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
