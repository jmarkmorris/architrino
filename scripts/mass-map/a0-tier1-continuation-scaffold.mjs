#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROWS = "ready";
const DEFAULT_ETA_STEPS = 4;
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];

function parseArgs(argv) {
  const args = {
    tier0: null,
    rows: DEFAULT_ROWS,
    etaLadder: null,
    pretty: false,
    out: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--tier0") {
      args.tier0 = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--eta-ladder") {
      args.etaLadder = parseNumberList(argv[++i]);
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier1-continuation-scaffold.mjs --tier0 PATH [options]

Options:
  --tier0 PATH          Tier 0 JSON output from a0-tier0-branch-search.mjs.
  --rows VALUE          "ready", "all", or a comma-separated row list. Defaults to "ready".
  --eta-ladder LIST     Comma-separated positive eta values. Defaults to the Tier 0 self-root fold layer and halvings.
  --out PATH            Write JSON output to a file instead of stdout.
  --pretty              Pretty-print JSON.
  --help                Show this help.

This is a Tier 1 continuation scaffold. It converts Tier 0 rows into a concrete
regularized delayed-dynamics and Floquet-gap work packet. It does not integrate
the delayed dynamics and it does not compute Delta_k.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseNumberList(value) {
  const numbers = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isFinite(entry) && entry > 0);
  if (numbers.length === 0) {
    throw new Error(`Expected a comma-separated list of positive numbers, got: ${value}`);
  }
  return numbers;
}

function requireTier0Path(args) {
  if (!args.tier0) {
    throw new Error("Missing required --tier0 PATH argument.");
  }
  return path.resolve(args.tier0);
}

function uniquePositive(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    if (!Number.isFinite(value) || value <= 0) {
      continue;
    }
    const key = value.toPrecision(16);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }
  return result;
}

function defaultEtaLadder(tier0) {
  const toleranceSeed =
    tier0.tolerances?.selfRootFoldLayerDelay ??
    tier0.tolerances?.instantaneousSelfDelay ??
    tier0.tolerances?.root ??
    1e-6;
  const ladder = [];
  for (let i = 0; i < DEFAULT_ETA_STEPS; i += 1) {
    ladder.push(toleranceSeed / 2 ** i);
  }
  return uniquePositive(ladder);
}

function selectRows(tier0, selector) {
  const candidates = Array.isArray(tier0.candidates) ? tier0.candidates : [];
  if (selector === "all") {
    return candidates;
  }
  if (selector === "ready") {
    return candidates.filter((row) => row.status === "tier0_continuation_ready");
  }
  const selected = new Set(
    String(selector)
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isInteger(entry))
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return candidates.filter((row) => selected.has(row.row));
}

function ratio(value, scale) {
  if (!Number.isFinite(value) || !Number.isFinite(scale) || scale === 0) {
    return null;
  }
  return value / scale;
}

function etaScaleTable(row, etaLadder) {
  const radii = row.geometry?.radii ?? {};
  const periods = row.geometry?.periods ?? {};
  return etaLadder.map((eta) => ({
    eta,
    eta_over_R_I: ratio(eta, radii.I),
    eta_over_R_M: ratio(eta, radii.M),
    eta_over_R_O: ratio(eta, radii.O),
    eta_over_T_I: ratio(eta, periods.I),
    eta_over_T_M: ratio(eta, periods.M),
    eta_over_T_O: ratio(eta, periods.O),
  }));
}

function coordinateBasis(row) {
  const phaseStatus = row.z_lambda?.phase_offset_quotient?.status ?? "not_reported";
  return [
    {
      coordinate: "log_epsilon_IM",
      source: "z_lambda.radius_ratios.epsilon_IM",
      finite_difference: "multiplicative",
    },
    {
      coordinate: "log_epsilon_MO",
      source: "z_lambda.radius_ratios.epsilon_MO",
      finite_difference: "multiplicative",
    },
    {
      coordinate: "delta_M",
      source: "z_lambda.delta_M",
      finite_difference: "additive",
    },
    {
      coordinate: "ellipticity_layers",
      source: "z_lambda.ellipticity",
      finite_difference: "additive within the declared non-circular correction basis",
    },
    {
      coordinate: "plane_gram_IM_MO_OI",
      source: "z_lambda.plane_gram after SO(3) quotient",
      finite_difference: "normal-plane tilt basis with global rotations projected out",
    },
    {
      coordinate: "relative_phase_offsets",
      source: "z_lambda.phase_offset_quotient",
      finite_difference: phaseStatus === "gauge_fixed_zero_offsets_tier0" ? "Tier 1 phase-grid lift required" : "quotient chart",
    },
  ];
}

function reducedCoordinateChart(row) {
  const zLambda = row.z_lambda ?? {};
  return {
    schema: "a0-tier1-reduced-coordinate-chart/v1",
    source_z_lambda_schema: zLambda.schema ?? null,
    radius_ratios: zLambda.radius_ratios ?? null,
    period_ratios: zLambda.period_ratios ?? null,
    delta_M: zLambda.delta_M ?? null,
    ellipticity: zLambda.ellipticity ?? null,
    plane_gram: zLambda.plane_gram ?? null,
    orientation_class: zLambda.orientation_class ?? null,
    handedness: zLambda.handedness ?? row.branch_label?.handedness ?? null,
    phase_offset_quotient: zLambda.phase_offset_quotient ?? null,
    branch_class: zLambda.branch_class ?? row.branch_label ?? null,
    removed_gauges: zLambda.removed_gauges ?? ["SO(3)", "S^1_k", "Gamma_Lambda"],
    coordinate_basis_for_finite_difference: coordinateBasis(row),
  };
}

function continuationContract(row, etaLadder) {
  return {
    schema: "a0-tier1-continuation-contract/v1",
    source_row: row.row,
    source_status: row.status,
    ready_for_continuation: row.status === "tier0_continuation_ready",
    period: row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null,
    history_window_required: {
      source_history_window: row.state_vector?.historyWindow ?? null,
      active_root_max_delay: row.root_ledger?.maxDelay ?? null,
      rule:
        "Use a history window strictly deeper than the active-root maximum delay and retest under refinement.",
    },
    eta_ladder: etaLadder,
    eta_scale_table: etaScaleTable(row, etaLadder),
    operations: [
      "continue the carrier row under the full regularized delayed acceleration law",
      "solve active causal roots at each sampled state",
      "recompute the root ledger and detect separator events",
      "compute R_Lambda over at least one declared T_k",
      "build the linearized return map or finite-difference monodromy approximation",
      "remove symmetry modes and compute Delta_k",
      "repeat across dt, history-window, and eta refinement",
    ],
    source_prototype: {
      script: "scripts/mass-map/a0-tier1-continuation-source-prototype.mjs",
      status: "blocked_carrier_replay_only",
      failure_code: "tier1-integrator-not-run",
      computed_predicates: ["speed_ordering_retained", "root_ledger_stable_under_refinement"],
      note:
        "The prototype replays Tier 0 carrier samples and provisional carrier roots, then computes bounded one-step speed-ordering and carrier-root refinement diagnostics; it is not an accepted Tier 1 continuation.",
    },
    residuals_to_recompute: [
      "state",
      "root",
      "phase",
      "energy",
      "drift",
      "speed",
      "avg",
      "lock",
      "leak",
      "Floquet",
    ],
  };
}

function monodromyPlan(row, etaLadder) {
  return {
    schema: "a0-tier1-monodromy-plan/v1",
    source_row: row.row,
    return_map: {
      notation: "P_{eta,Lambda}",
      period: row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null,
      section: "phase-gauge section fixed by the representative in z_lambda",
      domain:
        "regularized delayed-history tube around the Tier 0 carrier representative, expressed in reduced coordinates",
    },
    symmetry_quotient: {
      gauge_subspace: "G_sym",
      remove_modes: [
        "time_shift",
        "Euclidean_translation",
        "Euclidean_rotation",
        "phase_gauge_already_fixed_in_z_lambda",
      ],
      projected_operator: "Pi_perp D P_{eta,Lambda} Pi_perp",
      coordinate_chart: "a0-tier1-reduced-coordinate-chart/v1",
    },
    finite_difference_packet: {
      perturbation_basis: coordinateBasis(row),
      paired_step_rule:
        "Use plus/minus perturbations in each reduced coordinate and rerun the same causal-root solve before differencing.",
      root_matching_rule:
        "Reject the eta step if active root labels, relation classes, or separator status cannot be matched under refinement.",
      projection_rule:
        "Project out G_sym before forming the spectral radius used for Delta_k.",
    },
    Floquet_gap: {
      value: null,
      status: "not_computed",
      formula: "Delta_k = 1 - max_{mu_i notin G_sym} |mu_i|",
      positive_gap_gate: "Delta_k > 0 after numerical tolerance and convergence checks",
      failure_code_if_nonpositive: "nonpositive-floquet-gap",
    },
    eta_convergence: etaLadder.map((eta) => ({
      eta,
      monodromy_status: "not_run",
      Delta_k: null,
      root_ledger_refinement_status: "not_run",
      residual_refinement_status: "not_run",
    })),
  };
}

function acceptancePredicate(row) {
  return {
    schema: "a0-tier1-acceptance-predicate/v1",
    source_row: row.row,
    pass_only_if: [
      "declared residuals remain below tolerance under direct regularized delayed dynamics",
      "speed ordering is retained",
      "active root ledger is stable under dt and history-window refinement",
      "no secular center drift remains after symmetry modes are removed",
      "Delta_k > 0 on the non-symmetry quotient",
      "the same branch persists across the eta ladder before any eta -> 0+ extrapolation",
    ],
    reject_if: [
      "nonpositive-floquet-gap",
      "root-ledger-instability",
      "separator-singularity-unresolved",
      "scale-separation-collapse",
      "carrier-residual-open",
      "energy residual fails convergence",
    ],
  };
}

function acceptedHistorySegmentContract(row, etaLadder) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const maxDelay = row.root_ledger?.maxDelay ?? null;
  const activeTierLayers =
    row.weak_retained_amplitude_handoff?.tier_selector?.active_layers ?? ["I", "M", "O"];
  return {
    artifact_schema: "a0-tier1-accepted-history-segments/v1",
    schema: "a0-tier1-accepted-history-segment/v1",
    source_row: row.row,
    emitted_status_required: "accepted_history_segment",
    period,
    source_row_required_fields: ["branch_label", "z_lambda"],
    minimum_history_window: {
      active_root_max_delay: maxDelay,
      source_time_start_required: maxDelay === null ? null : -maxDelay,
      source_time_end_required: period,
      rule:
        "Samples must cover every cycle time in [0,T_k] and every delayed source time t-delay required by the active causal-root ledger.",
    },
    selected_weak_tier_layers: activeTierLayers,
    writer: {
      script: "scripts/mass-map/a0-tier1-accepted-history-writer.mjs",
      source_required:
        "accepted Tier 1 continuation source with samples, active causal-root ledger, residual convergence, stable root ledger, positive Delta_k, and declared benchmark-input exclusion",
      fail_closed_status: "blocked_missing_tier1_continuation_source",
      note:
        "The continuation scaffold alone is not an accepted history source; the writer must canonicalize an accepted continuation artifact or emit blocked rows.",
    },
    sample_schema: {
      required_fields: ["t", "bodies"],
      body_ids: BODY_IDS,
      body_state_required_fields: ["position", "velocity"],
      position_rule: "three finite numbers in the same centered carrier chart as the source Tier 0 row",
      velocity_rule: "three finite numbers in the same time units as the source Tier 0 row",
      interpolation_rule:
        "Consumers may linearly interpolate between adjacent samples only inside the declared sample time range.",
    },
    active_causal_root_ledger_schema: {
      required_collection_field: "active_causal_root_ledger",
      required_relations: ROOT_RELATIONS,
      root_required_fields: ["source", "receiver", "relation", "delay", "J", "status"],
      source_receiver_rule: "source and receiver must be one of I+, I-, M+, M-, O+, O-",
      delay_rule: "delay is a finite nonnegative causal-delay time in the same units as sample t",
      J_rule: "J is the branch Jacobian used for root-weighted wake reconstruction",
      status_rule: "active roots use status active; excluded or inactive roots must not appear in this collection",
    },
    validation_schema: {
      required_booleans: [
        "status_is_accepted_history_segment",
        "source_row_identity_matches",
        "sample_count_at_least_two",
        "samples_ordered_by_t",
        "samples_cover_cycle",
        "samples_cover_all_delayed_source_times",
        "all_required_body_states_present",
        "body_state_vectors_finite",
        "active_root_labels_valid",
        "active_root_delays_finite_nonnegative",
        "active_root_J_finite",
        "root_ledger_stable_under_refinement",
        "residuals_below_tolerance",
        "speed_ordering_retained",
        "no_secular_center_drift",
        "Delta_k_positive",
        "same_branch_persists_across_eta_ladder",
        "benchmark_inputs_excluded",
      ],
      required_objects: [
        "active_root_relations_present",
        "active_root_sources_cover_selected_layers",
      ],
      active_root_relations_present_shape: {
        partner: true,
        self: true,
        inter_layer: true,
      },
      active_root_sources_cover_selected_layers_rule:
        "Both polarities must have at least one active source root for every selected weak tier layer before a weak-retained causal-wake amplitude is considered complete.",
    },
    acceptance_checks: [
      "status equals accepted_history_segment",
      "at least two ordered samples are present",
      "samples cover the full cycle and delayed source-time interval required by active roots",
      "all body states required by the selected branch row are present at every sample",
      "all body position and velocity vectors are finite three-vectors",
      "active causal-root ledger includes partner, self, and inter-layer relation classes",
      "active root source labels cover both polarities for every selected weak tier layer",
      "active root source and receiver labels are valid body ids",
      "active root delay and J fields are finite",
      "the branch label and z_lambda are inherited from the same source row without benchmark input selection",
    ],
    failure_mapping: {
      missing_or_unaccepted_history: "weak-emitter-not-computed",
      incomplete_root_ledger: "weak-emitter-not-computed",
      missing_source_time_coverage: "weak-emitter-not-computed",
      zero_active_tier_norm_after_reconstruction: "weak-emitter-zero-norm",
      refinement_drift_after_reconstruction: "weak-emitter-refinement-drift",
    },
  };
}

function requiredArtifacts(row) {
  const stem = `a0-row-${row.row}-tier1`;
  return [
    `${stem}-continuation.json`,
    `${stem}-accepted-history.json`,
    `${stem}-root-ledger.json`,
    `${stem}-residuals.json`,
    `${stem}-monodromy.json`,
    `${stem}-floquet-gap.json`,
    `${stem}-convergence-report.md`,
  ];
}

function rowPacket(row, etaLadder) {
  const sourceReady = row.status === "tier0_continuation_ready";
  return {
    row: row.row,
    status: sourceReady ? "tier1_continuation_contract_ready" : "source_row_not_ready",
    failure_code: sourceReady ? "tier1-not-run" : row.failure_code,
    branch_label: row.branch_label,
    closure_labels: row.closure_labels,
    promotion_boundary: row.promotion_boundary,
    scale_hierarchy: {
      radii: row.geometry?.radii ?? null,
      periods: row.geometry?.periods ?? null,
      speeds: row.geometry?.speeds ?? null,
      eta_scale_table: etaScaleTable(row, etaLadder),
    },
    active_root_summary: row.root_ledger ?? null,
    self_root_delay_window: row.self_root_delay_window ?? null,
    reduced_coordinate_chart: reducedCoordinateChart(row),
    continuation_contract: continuationContract(row, etaLadder),
    monodromy_plan: monodromyPlan(row, etaLadder),
    acceptance_predicate: acceptancePredicate(row),
    accepted_history_segment_contract: acceptedHistorySegmentContract(row, etaLadder),
    inherited_Delta_k_status: row.Delta_k ?? null,
    required_artifacts: requiredArtifacts(row),
  };
}

function run(tier0, tier0Path, args) {
  const etaLadder = args.etaLadder ?? defaultEtaLadder(tier0);
  const rows = selectRows(tier0, args.rows);
  return {
    metadata: {
      artifact: "a0-tier1-continuation-scaffold",
      status: "tier1-continuation-contract",
      generatedAt: new Date().toISOString(),
      sourceTier0: path.relative(process.cwd(), tier0Path),
      rowSelector: args.rows,
      note:
        "This packet starts Tier 1 by declaring the continuation, quotient, and Floquet-gap work objects. It does not certify stability.",
    },
    source_tier0_metadata: tier0.metadata ?? null,
    eta_ladder: etaLadder,
    selected_row_count: rows.length,
    global_acceptance_boundary: {
      stability_functional:
        "Delta_k(eta,Lambda) = 1 - max_{mu_i notin G_sym} |mu_i(Pi_perp D P_{eta,Lambda} Pi_perp)|",
      pass_statement:
        "A row becomes a stable rest-branch candidate only after positive non-symmetry Floquet gap, residual convergence, and stable causal-root ledger are all observed in Tier 1.",
      failure_mode: "nonpositive-floquet-gap",
    },
    rows: rows.map((row) => rowPacket(row, etaLadder)),
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const tier0Path = requireTier0Path(args);
  const tier0 = readJson(tier0Path);
  const output = run(tier0, tier0Path, args);
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
