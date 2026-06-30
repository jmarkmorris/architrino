#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

const SCHEMA_ID = "neutral-braid-finite-mode-artifact/v1";
const PACKET_ID = "neutral_braid_finite_mode_search";
const PROMOTION_STATUS = "priority-only";
const SITE_IDS = [1, 2, 3, 4, 5, 6];
const SAME_SOURCE_POLICIES = [
  "ordinary-same-source-excluded",
  "self-hit-event-ledgered",
  "regularized-fold-layer",
];
const DEFAULT_SAME_SOURCE_POLICY = "ordinary-same-source-excluded";
const DEFAULT_CHART_ID = "neutral-braid-finite-mode-concrete-chart.v1";
const DEFAULT_CHART_PERIOD = 2 * Math.PI;
const DEFAULT_PERIOD_CONVENTION = "single-winding-common-period";
const NON_AUTHORIZING_ACTION_MEASURE_REJECTIONS = [
  "fixture-row",
  "fixed-speed-off-ledger-provenance",
  "sampled-diagnostic",
  "source-normal-row",
  "h39-theta3minus-quotient-row",
  "generated-decoy",
  "proxy-row",
  "cross-row-bundle",
  "branch-scope-free-summary",
  "target-only-row",
];
const ROOT_SUPPORT_EVENT_ROW_IDS = [
  "all_pairs_root_ledger",
  "root_sheet_rows",
  "tail_split",
  "hollow_support",
  "support_work_rows",
  "support_event_rows",
  "period_event_rows",
  "root_fold_event_rows",
  "endpoint_event_rows",
  "source_provenance_event_rows",
];

const FINITE_MODE_DECISIONS = [
  "neutral-braid-finite-mode-candidate",
  "neutral-braid-finite-mode-rejected",
  "neutral-braid-finite-mode-open",
];

const FIRST_FAILURE_ORDER = [
  "neutral-braid-finite-mode-schema-open",
  "neutral-ledger-convention-mismatch",
  "neutral-inventory-open",
  "six-curve-chart-open",
  "neutral-mode-quotient-open",
  "unit-arclength-row-open",
  "speed-band-failure",
  "clock-period-failure",
  "bounded-speed-time-map-derivatives-open",
  "hollow-support-band-open",
  "support-complementarity-open",
  "all-pairs-root-ledger-open",
  "root-jacobian-floor-failure",
  "all-pairs-tail-cover-incomplete",
  "tail-force-error-unbounded",
  "all-pairs-force-ledger-mismatch",
  "speed-ode-mean-fails",
  "speed-primitive-band-fails",
  "tangential-speed-row-open",
  "normal-equation-open",
  "support-action-work-open",
  "occupancy-claim-open",
  "event-matching-open",
  "self-hit-exchange-residual-open",
  "action-scale-mismatch",
  "gamma-fitted-not-derived",
  "speed-el-ode-equivalence-open",
  "noether-current-open",
  "derivative-block-stale",
  "coupled-cokernel-open",
  "coupled-krawczyk-open",
  "finite-mode-convergence-open",
  "not-retained",
];

const ROOT_LEDGER_STATUSES = [
  "all-pairs-root-ledger-open",
  "ordered-pair-policy-mismatch",
  "root-residual-failed",
  "root-tube-overlap",
  "inactive-gap-uncertified",
  "memory-window-exit",
  "memory-window-reset",
  "support-complete-memory-open",
  "jacobian-floor-failed",
  "jacobian-sign-open",
  "root-fold-event",
  "root-label-collision",
  "delay-floor-collision",
  "tail-boundary-convention-failed",
  "tail-exclusion-restored",
  "tail-root-sheet-assimilated-rerun-required",
  "tail-force-error-unbounded",
  "ledger-rerun-required",
  "optional-reduction-not-certified",
  "all-pairs-root-ledger-certified",
];

const INACTIVE_GAP_PREDICATES = [
  "distance-gap",
  "same-sign-endpoints",
  "lipschitz-empty",
  "newton-disjoint",
  "owned-by-active-root",
];

const LIVE_LEDGER_HANDOFF_REQUIRED_ROWS = [
  "source_ledger_reference",
  "bounded_chart",
  "clock_lift",
  "pair_policy_handoff",
  "root_label_handoff",
  "active_root_equations",
  "inactive_gap_cover",
  "jacobian_floor",
  "tail_interface",
  "root_derivative_columns",
  "force_checksum",
  "consumer_checksum",
];

const TAIL_TERMINAL_PREDICATES = [
  "excluded-gap",
  "unique-root-tube",
  "event-reset",
  "distance-empty",
  "monotone-empty",
  "lipschitz-empty",
  "newton-empty",
  "krawczyk-root-tube",
];

const RESIDUAL_ROWS = [
  "R_scope",
  "R_chart",
  "R_gauge",
  "R_unit",
  "R_nu_band",
  "R_H",
  "R_support_NS",
  "R_occ_M",
  "R_root_all",
  "R_sheet_all",
  "R_tail_all",
  "R_ledger_all",
  "R_force_all",
  "R_T",
  "R_speedODE",
  "R_N",
  "R_inv_NS",
  "R_supp_work",
  "R_event",
  "R_hit",
  "R_gamma",
  "R_VN",
  "R_Noeth",
  "R_optional_reduction",
  "R_kraw",
];

const OBJECTIVE_HIERARCHY = [
  {
    level: 0,
    block: "Phi_0",
    rows: ["R_scope", "R_chart", "R_gauge", "R_unit", "R_nu_band", "R_H", "R_inv_NS"],
    passing_meaning: "valid six-site bounded-speed chart with neutral inventory and period data",
  },
  {
    level: 1,
    block: "Phi_1",
    rows: ["R_support_NS", "R_root_all", "R_sheet_all", "R_tail_all", "R_ledger_all"],
    passing_meaning: "hollow support and all-pairs root ledger are live on one convention",
  },
  {
    level: 2,
    block: "Phi_2",
    rows: ["R_force_all", "R_T", "R_speedODE", "R_N", "R_supp_work"],
    passing_meaning: "all-pairs force, speed ODE, normal balance, and support work close together",
  },
  {
    level: 3,
    block: "Phi_3",
    rows: ["R_event", "R_hit", "R_gamma", "R_VN", "R_Noeth"],
    passing_meaning: "action, event, self-hit, and Noether rows consume the same live ledger",
  },
  {
    level: 4,
    block: "Phi_4",
    rows: ["R_occ_M", "R_optional_reduction", "R_kraw"],
    passing_meaning: "declared occupancy claims, optional reductions, and interval proof budget are statused",
  },
];

export const ARTIFACT_SCHEMA = {
  schema: "neutral-braid-finite-mode-artifact-schema/v1",
  artifact_schema: SCHEMA_ID,
  required_contract: [
    "six direct site labels",
    "polarity balance 3 positive and 3 negative",
    "30 ordered distinct source pairs",
    "same-source policy outside ordinary force rows",
    "hollow support fields and placeholder statuses",
    "same-run period rows from the selected chart input",
    "same-run root/support/event row ids with open blockers",
    "all-pairs root-ledger placeholders",
    "residual and status vocabulary",
    "not_retained/search_open result",
  ],
  required_fields: [
    "schema",
    "packet_id",
    "promotion_status",
    "branch_scope",
    "period_rows",
    "root_support_event_rows",
    "site_inventory",
    "hollow_support",
    "all_pairs_root_ledger",
    "residual_status_vocabulary",
    "result",
    "not_retained_reason",
  ],
};

function polarityForSite(siteId) {
  return siteId <= 3 ? 1 : -1;
}

function sourceRelation(receiverPolarity, sourcePolarity) {
  return receiverPolarity * sourcePolarity === -1 ? "attractive" : "repulsive";
}

export function orderedDistinctPairs() {
  const rows = [];
  for (const receiver of SITE_IDS) {
    for (const source of SITE_IDS) {
      if (receiver === source) {
        continue;
      }
      const receiverPolarity = polarityForSite(receiver);
      const sourcePolarity = polarityForSite(source);
      rows.push({
        receiver,
        source,
        force_sign: receiverPolarity * sourcePolarity,
        source_relation: sourceRelation(receiverPolarity, sourcePolarity),
      });
    }
  }
  return rows;
}

function siteInventory() {
  const sites = SITE_IDS.map((id) => ({
    id,
    polarity: polarityForSite(id),
    polarity_label: polarityForSite(id) > 0 ? "positive" : "negative",
  }));
  const sourceRowsByReceiver = SITE_IDS.map((receiver) => {
    const rows = orderedDistinctPairs().filter((pair) => pair.receiver === receiver);
    return {
      receiver,
      attractive_source_sites: rows.filter((pair) => pair.source_relation === "attractive").length,
      repulsive_source_sites: rows.filter((pair) => pair.source_relation === "repulsive").length,
    };
  });

  return {
    sites,
    polarity_balance: {
      positive: sites.filter((site) => site.polarity === 1).length,
      negative: sites.filter((site) => site.polarity === -1).length,
      q_core_units: sites.reduce((sum, site) => sum + site.polarity, 0),
    },
    source_rows_by_receiver: sourceRowsByReceiver,
  };
}

function residualRows() {
  return RESIDUAL_ROWS.map((row) => {
    if (row === "R_scope" || row === "R_inv_NS") {
      return { row, status: "declared_by_artifact", value: null };
    }
    if (row === "R_root_all" || row === "R_sheet_all" || row === "R_tail_all" || row === "R_ledger_all") {
      return { row, status: "open_placeholder", value: null };
    }
    return { row, status: "not_computed", value: null };
  });
}

function assertPositiveFiniteNumber(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
}

function assertNonemptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a nonempty string.`);
  }
}

function buildChartRun(options) {
  const chartId = options.chartId ?? DEFAULT_CHART_ID;
  const chartPeriod = options.chartPeriod ?? DEFAULT_CHART_PERIOD;
  const periodConvention = options.periodConvention ?? DEFAULT_PERIOD_CONVENTION;

  assertNonemptyString(chartId, "chartId");
  assertPositiveFiniteNumber(chartPeriod, "chartPeriod");
  assertNonemptyString(periodConvention, "periodConvention");

  return {
    run_id: `${chartId}::period-${chartPeriod}`,
    chart_id: chartId,
    source_kind: "deterministic-chart-input",
    fixture: false,
    proxy: false,
    off_ledger: false,
    cross_row_bundle: false,
    period_convention: periodConvention,
    common_period: chartPeriod,
  };
}

function buildPeriodRows(chartRun) {
  return SITE_IDS.map((siteId) => ({
    row: "period_row",
    site: siteId,
    chart_run_id: chartRun.run_id,
    period_symbol: `H_${siteId}`,
    winding: 1,
    period: chartRun.common_period,
    period_convention: chartRun.period_convention,
    source_status: "same-run-chart-input",
    fixture: false,
    proxy: false,
    off_ledger: false,
    cross_row_bundle: false,
  }));
}

function rootLabelForPair(pair) {
  return `r_${pair.receiver}_${pair.source}_nu`;
}

function buildClockLiftRows(chartRun) {
  return SITE_IDS.map((siteId) => ({
    row: "clock_lift_prerequisite",
    site: siteId,
    chart_run_id: chartRun.run_id,
    chi_symbol: `chi_${siteId}`,
    lambda_symbol: `Lambda_${siteId}`,
    period_symbol: `H_${siteId}`,
    period: chartRun.common_period,
    speed_factor_status: "bounded-speed-speed-factor-open",
    inverse_clock_derivatives_status: "not_computed",
    fixed_speed_seed_only: false,
    fixture: false,
    proxy: false,
    off_ledger: false,
    cross_row_bundle: false,
  }));
}

function buildActiveRootPrerequisiteRows(chartRun, pairs) {
  return pairs.map((pair, index) => ({
    row: "bounded_speed_active_root_prerequisite",
    row_id: `active_root_prerequisite_${index + 1}`,
    chart_run_id: chartRun.run_id,
    root_label: rootLabelForPair(pair),
    receiver: pair.receiver,
    source: pair.source,
    force_sign: pair.force_sign,
    source_relation: pair.source_relation,
    clock_lift_binding: {
      receiver_clock_map: `chi_${pair.receiver}`,
      source_clock_map: `chi_${pair.source}`,
      receiver_inverse_clock_map: `Lambda_${pair.receiver}`,
      source_inverse_clock_map: `Lambda_${pair.source}`,
      period_convention: chartRun.period_convention,
      status: "same-run-prerequisite",
    },
    bounded_speed_root_equation: {
      equation: "G_r^nu(u,eta_r;Y,nu)=0",
      status: "not_solved",
      first_missing_field: "bounded_speed_delay_bracket",
    },
    delay_bracket: { status: "not_computed", lower: null, upper: null },
    delay_floor: { status: "not_computed", value: null },
    jacobian: {
      status: "not_computed",
      sign_label: null,
      floor: null,
      first_missing_field: "bounded_speed_root_solution",
    },
    inactive_gap_cover: {
      status: "not_computed",
      predicates: [...INACTIVE_GAP_PREDICATES],
      rows: [],
    },
    source_provenance: {
      status: "same-run-chart-source-open",
      chart_id: chartRun.chart_id,
      retained_source_binding: null,
      provider_provenance: null,
    },
    fixed_speed_source_reference: {
      allowed_as_seed: true,
      promoted_as_bounded_speed_evidence: false,
    },
    accepted_active_root: null,
    certifies_active_root: false,
    fixture: false,
    proxy: false,
    off_ledger: false,
    sampled_diagnostic: false,
    cross_row_bundle: false,
  }));
}

function buildRootSupportEventRows(chartRun) {
  return {
    status: "same-run-open",
    chart_run_id: chartRun.run_id,
    row_family: "root_support_event_rows",
    row_ids: [...ROOT_SUPPORT_EVENT_ROW_IDS],
    rows: [
      {
        row_id: "all_pairs_root_ledger",
        group: "root",
        chart_run_id: chartRun.run_id,
        status: "same-run-prerequisites-open",
        first_missing_field: "accepted_active_roots",
        absence_reason:
          "same-run active-root prerequisite rows are present, but no bounded-speed delay brackets, Jacobian floors, inactive-gap cover, or retained source binding certify accepted active roots",
      },
      {
        row_id: "root_sheet_rows",
        group: "root",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_root_ledger",
        first_missing_field: "root_sheet_derivatives",
        absence_reason:
          "root sheet derivatives require accepted same-run root labels, delay floors, and Jacobian floors",
      },
      {
        row_id: "tail_split",
        group: "root",
        chart_run_id: chartRun.run_id,
        status: "open_placeholder",
        first_missing_field: "tail_ownership_map",
        absence_reason:
          "tail ownership, terminal predicates, and persistence radius have not been computed for this chart run",
      },
      {
        row_id: "hollow_support",
        group: "support",
        chart_run_id: chartRun.run_id,
        status: "declared_open",
        first_missing_field: "certified_support_margins",
        absence_reason:
          "the artifact declares the support descriptor but does not certify support margins or support complementarity",
      },
      {
        row_id: "support_work_rows",
        group: "support",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_support_margins",
        first_missing_field: "support_work_status",
        absence_reason:
          "support work needs certified support margins, multipliers or variational inequality, and endpoint convention",
      },
      {
        row_id: "support_event_rows",
        group: "event",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_support_margins",
        first_missing_field: "support_boundary_event_surface",
        absence_reason:
          "support-boundary events require certified support margins and event-surface checks on this chart run",
      },
      {
        row_id: "period_event_rows",
        group: "event",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_event_ledger",
        first_missing_field: "period_event_residual",
        absence_reason:
          "period rows are present, but no event ledger has consumed them for conservation or reset status",
      },
      {
        row_id: "root_fold_event_rows",
        group: "event",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_root_ledger",
        first_missing_field: "root_fold_event_surface",
        absence_reason:
          "root-fold events require same-run root labels, Jacobian signs, and event-surface checks",
      },
      {
        row_id: "endpoint_event_rows",
        group: "event",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_event_ledger",
        first_missing_field: "endpoint_jump_status",
        absence_reason:
          "endpoint jumps and resets require an event ledger tied to the same branch scope and period rows",
      },
      {
        row_id: "source_provenance_event_rows",
        group: "event",
        chart_run_id: chartRun.run_id,
        status: "absent_blocked_by_provider_provenance",
        first_missing_field: "source_provenance_binding",
        absence_reason:
          "source provenance is not accepted because no provider provenance or retained source binding exists",
      },
    ],
    first_missing_field: "accepted_active_roots",
    accepted_root_support_event_rows: null,
    certifies_root_support_event_rows: false,
    fixture: false,
    proxy: false,
    off_ledger: false,
    sampled_diagnostic: false,
    source_normal_row: false,
    h39_theta3minus_quotient_row: false,
    generated_decoy: false,
    cross_row_bundle: false,
    target_only: false,
    rejected_evidence_kinds: [...NON_AUTHORIZING_ACTION_MEASURE_REJECTIONS],
  };
}

export function buildArtifact(options = {}) {
  const sameSourcePolicy = options.sameSourcePolicy ?? DEFAULT_SAME_SOURCE_POLICY;
  if (!SAME_SOURCE_POLICIES.includes(sameSourcePolicy)) {
    throw new Error(`same-source policy must be one of: ${SAME_SOURCE_POLICIES.join(", ")}`);
  }

  const chartRun = buildChartRun(options);
  const pairs = orderedDistinctPairs();
  const inventory = siteInventory();
  const periodRows = buildPeriodRows(chartRun);
  const rootSupportEventRows = buildRootSupportEventRows(chartRun);
  const clockLiftRows = buildClockLiftRows(chartRun);
  const activeRootPrerequisiteRows = buildActiveRootPrerequisiteRows(chartRun, pairs);

  return {
    schema: SCHEMA_ID,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_finite_mode_search.audit_shape.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "reference/priorities/braid-retained-branch-closure/neutral-braid/neutral-braid-finite-mode-search.md",
      "reference/priorities/braid-retained-branch-closure/neutral-braid/all-pairs-root-ledger.md",
    ],
    artifact_claim: {
      kind: "chart_owned_execution_slice",
      solves_dynamics: false,
      emits_same_run_branch_scope: true,
      emits_same_run_period_rows: true,
      emits_same_run_root_support_event_rows: true,
      emits_action_measure_row: false,
      authorizes_rank5_retained_branch_closure: false,
      strongest_claim:
        "This artifact records the selected finite-mode chart, branch scope, same-run period rows, and same-run root/support/event row ids; it does not solve dynamics or retain a branch.",
    },
    chart_run: chartRun,
    branch_scope: {
      chart_run_id: chartRun.run_id,
      sites: SITE_IDS,
      polarity_map: Object.fromEntries(SITE_IDS.map((id) => [String(id), polarityForSite(id)])),
      pair_policy: {
        name: "Pi_all",
        kind: "ordered-distinct-source-pairs",
        cardinality: pairs.length,
        ordered_distinct_pairs: pairs,
        binary_partition_required: false,
      },
      same_source_policy: {
        selected: sameSourcePolicy,
        options: SAME_SOURCE_POLICIES,
        ordinary_force_rows_include_same_source: false,
        note: "Same-source roots are outside Pi_all and must enter event or exchange rows if claimed.",
      },
      endpoint_convention: "open_placeholder",
      hollow_support_convention: "annular-hollow-support-band",
      action_event_convention: "open_placeholder",
      row_weights: "open_placeholder",
      truncation: {
        M_NS: {
          M_Y: null,
          M_nu: null,
          K: null,
          Q_tail: null,
          Q_occ: null,
          W: null,
        },
        status: "finite-mode-truncation-open",
      },
      fixture: false,
      proxy: false,
      off_ledger: false,
      cross_row_bundle: false,
    },
    period_rows: {
      status: "same-run-chart-input",
      chart_run_id: chartRun.run_id,
      row_family: "period_rows",
      rows: periodRows,
      fixture: false,
      proxy: false,
      off_ledger: false,
      cross_row_bundle: false,
    },
    same_run_binding: {
      status: "branch-scope-and-period-rows-bound",
      chart_run_id: chartRun.run_id,
      branch_scope_chart_run_id: chartRun.run_id,
      period_rows_chart_run_id: chartRun.run_id,
      bound_row_families: ["branch_scope", "period_rows"],
      non_fixture: true,
      rejects_fixed_speed_off_ledger_provenance: true,
      rejects_proxy_rows: true,
      rejects_cross_row_bundles: true,
    },
    root_support_event_rows: rootSupportEventRows,
    site_inventory: inventory,
    unknown_vector: {
      symbol: "z_NS_M_nu",
      blocks: ["a", "ell", "c", "theta", "b", "kappa", "r", "j", "s", "mu", "o", "h", "e", "gamma", "Theta", "p", "q", "g"],
      discrete_metadata_not_newton_variables: [
        "polarity_map",
        "source_pair_policy",
        "same_source_policy",
        "endpoint_convention",
        "winding_integers",
        "smoothing_kernel",
        "row_weights",
      ],
      dimensions: "open_placeholder",
    },
    hollow_support: {
      descriptor: "Supp_hollow",
      center: { symbol: "C", status: "open_placeholder" },
      radius_inner: { symbol: "R_in", required_relation: "0 < R_in", status: "open_placeholder" },
      radius_outer: { symbol: "R_out", required_relation: "R_in < R_out", status: "open_placeholder" },
      band_width_witness: { symbol: "beta_band", definition: "R_out / R_in", status: "open_placeholder" },
      inequalities: [
        { row: "B_i_minus", expression: "r_i(lambda) - R_in >= 0", status: "open_placeholder" },
        { row: "B_i_plus", expression: "R_out - r_i(lambda) >= 0", status: "open_placeholder" },
      ],
      residuals: [
        { row: "R_hollow_M", status: "open_placeholder", value: null },
        { row: "R_outer_M", status: "open_placeholder", value: null },
        { row: "R_supp_comp", status: "open_placeholder", value: null },
        { row: "R_supp_rad_nu", status: "open_placeholder", value: null },
        { row: "R_supp_work_nu", status: "open_placeholder", value: null },
      ],
      support_multipliers: { status: "not_claimed", rows: [] },
      central_inventory_status: "not_claimed",
    },
    occupancy_rows: {
      status: "not_claimed",
      smoothing_scale: null,
      occupancy_mesh: null,
      unsigned_density_row: "not_computed",
      signed_density_row: "not_computed",
      coverage_row: "not_computed",
      signed_balance_row: "not_computed",
      quadrature_error_bounds: null,
      mesh_error_bounds: null,
    },
    all_pairs_root_ledger: {
      status: "all-pairs-root-ledger-open",
      pair_policy_checksum: {
        policy: "Pi_all",
        ordered_distinct_pair_count: pairs.length,
        same_source_policy: sameSourcePolicy,
      },
      bounded_speed_live_ledger_handoff: {
        status: "same-run-prerequisites-open",
        required_rows: [...LIVE_LEDGER_HANDOFF_REQUIRED_ROWS],
        first_missing_field: "bounded_speed_delay_brackets",
        source_ledger_reference: {
          source_artifact_id: "octahedral_root_ledger_diagnostic",
          source_schema: "neutral-braid-octahedral-root-ledger/v1",
          fixed_speed_special_case: true,
          seed_only: true,
          promoted_as_bounded_speed_evidence: false,
        },
        bounded_chart: {
          chart_run_id: chartRun.run_id,
          chart_id: chartRun.chart_id,
          period_convention: chartRun.period_convention,
          status: "same-run-chart-input",
        },
        clock_lift: {
          status: "same-run-prerequisites-open",
          rows: clockLiftRows,
          first_missing_field: "bounded_speed_speed_factor_solution",
        },
        pair_policy_handoff: {
          status: "same-run-prerequisite-computed",
          policy: "Pi_all",
          ordered_distinct_pair_count: pairs.length,
          unordered_compression: false,
        },
        root_label_handoff: {
          status: "same-run-prerequisite-computed",
          root_labels: activeRootPrerequisiteRows.map((row) => row.root_label),
          certified_bounded_speed_root_tubes: null,
        },
        active_root_equations: {
          status: "same-run-prerequisites-open",
          row_count: activeRootPrerequisiteRows.length,
          first_missing_field: "bounded_speed_delay_brackets",
        },
        inactive_gap_cover: {
          status: "not_computed",
          predicates: [...INACTIVE_GAP_PREDICATES],
          first_missing_field: "bounded_speed_inactive_gap_cover",
        },
        jacobian_floor: {
          status: "not_computed",
          first_missing_field: "bounded_speed_jacobian_floor",
        },
        tail_interface: { status: "not_computed", first_missing_field: "tail_ownership_map" },
        root_derivative_columns: {
          status: "not_computed",
          first_missing_field: "root_sheet_derivatives",
        },
        force_checksum: { status: "not_computed" },
        consumer_checksum: { status: "not_computed" },
        accepted_bounded_speed_live_ledger: null,
        certifies_bounded_speed_live_ledger: false,
      },
      active_roots: {
        status: "same-run-prerequisites-open",
        row_family: "bounded_speed_active_root_prerequisites",
        first_missing_field: "bounded_speed_delay_brackets",
        accepted_active_roots: null,
        certifies_active_roots: false,
        rows: activeRootPrerequisiteRows,
      },
      assimilated_tail_roots: { status: "open_placeholder", rows: [] },
      excluded_tail_cells: { status: "open_placeholder", rows: [] },
      inactive_gaps: { status: "open_placeholder", predicates: INACTIVE_GAP_PREDICATES, rows: [] },
      delay_floor: { status: "open_placeholder", value: null },
      jacobian_floor: { status: "open_placeholder", J_min_nu: null, sign_labels: [], residual: null },
      sheet_continuation: { status: "open_placeholder", rows: [] },
      event_classification: {
        first_event_surface: null,
        first_hard_failure: "all-pairs-root-ledger-open",
        secondary_diagnostics: [],
        reset_instruction: "ledger completion required before downstream rows may claim closure",
      },
    },
    tail_split: {
      status: "all-pairs-tail-cover-incomplete",
      tail_domain: "(h_mem, eta_sup]",
      terminal_predicates: TAIL_TERMINAL_PREDICATES,
      owned_cells: [],
      persistence_radius: null,
      epsilon_tail_all_nu: null,
    },
    force_rows: {
      status: "not_computed",
      all_pairs_force: "not_computed",
      same_source_force: "not_computed",
      medium_force: "not_computed",
      support_force: "not_computed",
      total_force: "not_computed",
      consumer_checksum: null,
    },
    action_measure_row: {
      status: "absent-fail-closed",
      row: "action_measure_row",
      first_missing_field_after_period_rows: "action_functional",
      root_support_event_rows_status: "same-run-open-not-accepted",
      missing_same_ledger_fields: [
        "action_functional",
        "accepted_root_support_event_rows",
        "retained_source_binding",
        "provider_provenance",
        "receiver_normal_branch_strength_linkage",
      ],
      rejected_evidence_kinds: NON_AUTHORIZING_ACTION_MEASURE_REJECTIONS,
      accepted_same_ledger_action_measure_row: null,
      certifies_action_measure_row: false,
      authorizes_rank5_retained_branch_closure: false,
    },
    residual_vector: {
      symbol: "B_NS_M_nu",
      rows: residualRows(),
      row_weights: "open_placeholder",
      first_failure_row: "all-pairs-root-ledger-open",
    },
    objective_hierarchy: {
      levels: OBJECTIVE_HIERARCHY,
      scalar_merit_used: false,
      first_failure_order_controls_result: true,
    },
    derivative_matrix: {
      status: "derivative-block-stale",
      included_blocks: [],
      omitted_column_audit: "not_computed",
    },
    krawczyk_budget: {
      status: "coupled-krawczyk-open",
      Y_NS_M_nu: null,
      Z_NS_M_nu: null,
      rho: null,
      rho_chart_NS_M_nu: null,
      range_cokernel_rows: "not_computed",
    },
    optional_reductions: {
      binary_partition: "not_claimed",
      exact_antipodal: "not_claimed",
      shell_braid: "not_claimed",
      nested_shell_braid: "not_claimed",
      controls_base_rejection: false,
    },
    residual_status_vocabulary: {
      finite_mode_decisions: FINITE_MODE_DECISIONS,
      first_failure_order: FIRST_FAILURE_ORDER,
      root_ledger_statuses: ROOT_LEDGER_STATUSES,
      same_source_policy_options: SAME_SOURCE_POLICIES,
      occupancy_statuses: ["not_claimed", "open", "failed", "passed"],
      optional_reduction_statuses: ["not_claimed", "failed", "passed"],
      observer_export_statuses: ["not_computed", "diagnostic", "failed", "passed"],
      result_statuses: ["search_open", "not_retained"],
    },
    decision: {
      finite_mode_decision: "neutral-braid-finite-mode-open",
      first_failure_status: "all-pairs-root-ledger-open",
      rejection_scope: null,
    },
    result: {
      search: "search_open",
      retention: "not_retained",
      retained_branch: false,
      finite_mode_candidate: false,
      finite_mode_rejection_certified: false,
      status_note:
        "The emitted artifact is an open finite-mode execution slice. It records same-run branch scope, period rows, and root/support/event row ids but does not solve dynamics, emit an action_measure_row, or retain a branch.",
    },
    not_retained_reason: [
      "all-pairs root ledger is open",
      "tail cover is incomplete",
      "dynamics, action, event, and Noether rows are not computed",
      "finite-mode convergence is open",
      "master-retention rows are not closed",
    ],
  };
}

function pairKey(pair) {
  return `${pair.receiver}->${pair.source}`;
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === SCHEMA_ID, `schema must be ${SCHEMA_ID}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.emits_same_run_branch_scope === true, "artifact must emit same-run branch_scope", errors);
  assertField(artifact.artifact_claim?.emits_same_run_period_rows === true, "artifact must emit same-run period_rows", errors);
  assertField(
    artifact.artifact_claim?.emits_same_run_root_support_event_rows === true,
    "artifact must emit same-run root_support_event_rows",
    errors
  );
  assertField(artifact.artifact_claim?.emits_action_measure_row === false, "artifact must not emit action_measure_row", errors);
  assertField(
    artifact.artifact_claim?.authorizes_rank5_retained_branch_closure === false,
    "artifact must not authorize rank-5 retained branch closure",
    errors
  );

  const chartRun = artifact.chart_run;
  assertField(chartRun?.source_kind === "deterministic-chart-input", "chart_run source_kind must be deterministic-chart-input", errors);
  assertField(chartRun?.fixture === false, "chart_run must not be fixture evidence", errors);
  assertField(chartRun?.proxy === false, "chart_run must not be proxy evidence", errors);
  assertField(chartRun?.off_ledger === false, "chart_run must not be off-ledger evidence", errors);
  assertField(chartRun?.cross_row_bundle === false, "chart_run must not be a cross-row bundle", errors);
  assertField(Number.isFinite(chartRun?.common_period) && chartRun.common_period > 0, "chart_run common_period must be positive", errors);

  const sites = artifact.site_inventory?.sites ?? [];
  assertField(Array.isArray(sites) && sites.length === 6, "site_inventory.sites must contain six sites", errors);
  assertField(new Set(sites.map((site) => site.id)).size === 6, "site ids must be unique", errors);
  assertField(
    SITE_IDS.every((id) => sites.some((site) => site.id === id)),
    "site ids must be exactly 1 through 6",
    errors
  );
  const positiveCount = sites.filter((site) => site.polarity === 1).length;
  const negativeCount = sites.filter((site) => site.polarity === -1).length;
  const qCoreUnits = sites.reduce((sum, site) => sum + (Number.isFinite(site.polarity) ? site.polarity : 0), 0);
  assertField(positiveCount === 3, "polarity balance must contain three positive sites", errors);
  assertField(negativeCount === 3, "polarity balance must contain three negative sites", errors);
  assertField(qCoreUnits === 0, "polarity balance must have q_core_units=0", errors);
  assertField(artifact.site_inventory?.polarity_balance?.positive === 3, "polarity_balance.positive must be 3", errors);
  assertField(artifact.site_inventory?.polarity_balance?.negative === 3, "polarity_balance.negative must be 3", errors);
  assertField(artifact.site_inventory?.polarity_balance?.q_core_units === 0, "polarity_balance.q_core_units must be 0", errors);

  const pairs = artifact.branch_scope?.pair_policy?.ordered_distinct_pairs ?? [];
  const expectedPairs = orderedDistinctPairs();
  const pairKeys = new Set(pairs.map(pairKey));
  assertField(Array.isArray(pairs) && pairs.length === 30, "pair_policy must list 30 ordered distinct pairs", errors);
  assertField(artifact.branch_scope?.pair_policy?.cardinality === 30, "pair_policy.cardinality must be 30", errors);
  assertField(pairs.every((pair) => pair.receiver !== pair.source), "pair_policy pairs must exclude same-source rows", errors);
  assertField(pairKeys.size === pairs.length, "pair_policy pairs must be unique", errors);
  assertField(
    expectedPairs.every((pair) => pairKeys.has(pairKey(pair))),
    "pair_policy must cover every ordered distinct source pair",
    errors
  );
  assertField(
    artifact.branch_scope?.chart_run_id === chartRun?.run_id,
    "branch_scope chart_run_id must match chart_run",
    errors
  );
  assertField(artifact.branch_scope?.fixture === false, "branch_scope must not be fixture evidence", errors);
  assertField(artifact.branch_scope?.proxy === false, "branch_scope must not be proxy evidence", errors);
  assertField(artifact.branch_scope?.off_ledger === false, "branch_scope must not be off-ledger evidence", errors);
  assertField(artifact.branch_scope?.cross_row_bundle === false, "branch_scope must not be a cross-row bundle", errors);

  const periodRows = artifact.period_rows?.rows ?? [];
  assertField(artifact.period_rows?.status === "same-run-chart-input", "period_rows status must be same-run-chart-input", errors);
  assertField(artifact.period_rows?.chart_run_id === chartRun?.run_id, "period_rows chart_run_id must match chart_run", errors);
  assertField(Array.isArray(periodRows) && periodRows.length === SITE_IDS.length, "period_rows must contain one row per site", errors);
  for (const siteId of SITE_IDS) {
    const row = periodRows.find((candidate) => candidate.site === siteId);
    assertField(Boolean(row), `period_rows must include site ${siteId}`, errors);
    assertField(row?.chart_run_id === chartRun?.run_id, `period row ${siteId} chart_run_id must match chart_run`, errors);
    assertField(row?.source_status === "same-run-chart-input", `period row ${siteId} must be same-run chart input`, errors);
    assertField(row?.period === chartRun?.common_period, `period row ${siteId} period must match chart_run`, errors);
    assertField(row?.fixture === false, `period row ${siteId} must not be fixture evidence`, errors);
    assertField(row?.proxy === false, `period row ${siteId} must not be proxy evidence`, errors);
    assertField(row?.off_ledger === false, `period row ${siteId} must not be off-ledger evidence`, errors);
    assertField(row?.cross_row_bundle === false, `period row ${siteId} must not be a cross-row bundle`, errors);
  }
  assertField(
    artifact.same_run_binding?.status === "branch-scope-and-period-rows-bound" &&
      artifact.same_run_binding?.chart_run_id === chartRun?.run_id &&
      artifact.same_run_binding?.branch_scope_chart_run_id === chartRun?.run_id &&
      artifact.same_run_binding?.period_rows_chart_run_id === chartRun?.run_id,
    "same_run_binding must bind branch_scope and period_rows to one chart_run",
    errors
  );
  assertField(artifact.same_run_binding?.non_fixture === true, "same_run_binding must be non-fixture", errors);
  assertField(
    artifact.same_run_binding?.rejects_fixed_speed_off_ledger_provenance === true &&
      artifact.same_run_binding?.rejects_proxy_rows === true &&
      artifact.same_run_binding?.rejects_cross_row_bundles === true,
    "same_run_binding must reject fixed-speed off-ledger, proxy, and cross-row evidence",
    errors
  );

  const rootSupportEventRows = artifact.root_support_event_rows ?? {};
  const rootSupportRows = rootSupportEventRows.rows ?? [];
  assertField(
    rootSupportEventRows.status === "same-run-open" &&
      rootSupportEventRows.chart_run_id === chartRun?.run_id &&
      rootSupportEventRows.row_family === "root_support_event_rows",
    "root_support_event_rows must be same-run open rows",
    errors
  );
  assertField(
    ROOT_SUPPORT_EVENT_ROW_IDS.every((rowId) => rootSupportEventRows.row_ids?.includes(rowId)),
    "root_support_event_rows must list every required row id",
    errors
  );
  assertField(
    Array.isArray(rootSupportRows) && rootSupportRows.length === ROOT_SUPPORT_EVENT_ROW_IDS.length,
    "root_support_event_rows rows length mismatch",
    errors
  );
  for (const rowId of ROOT_SUPPORT_EVENT_ROW_IDS) {
    const row = rootSupportRows.find((candidate) => candidate.row_id === rowId);
    assertField(Boolean(row), `root_support_event_rows missing ${rowId}`, errors);
    assertField(row?.chart_run_id === chartRun?.run_id, `root_support_event_rows ${rowId} chart_run_id must match`, errors);
    assertField(typeof row?.first_missing_field === "string" && row.first_missing_field.length > 0, `${rowId} first_missing_field must be named`, errors);
    assertField(typeof row?.absence_reason === "string" && row.absence_reason.length > 0, `${rowId} absence_reason must be named`, errors);
  }
  assertField(
    rootSupportEventRows.first_missing_field === "accepted_active_roots" &&
      rootSupportEventRows.accepted_root_support_event_rows === null &&
      rootSupportEventRows.certifies_root_support_event_rows === false,
    "root_support_event_rows must remain open and non-certifying",
    errors
  );
  assertField(
    rootSupportEventRows.fixture === false &&
      rootSupportEventRows.off_ledger === false &&
      rootSupportEventRows.sampled_diagnostic === false &&
      rootSupportEventRows.source_normal_row === false &&
      rootSupportEventRows.h39_theta3minus_quotient_row === false &&
      rootSupportEventRows.generated_decoy === false &&
      rootSupportEventRows.cross_row_bundle === false &&
      rootSupportEventRows.target_only === false,
    "root_support_event_rows must reject fixture/off-ledger/diagnostic/decoy/cross-row/target-only evidence",
    errors
  );

  const receiverRows = artifact.site_inventory?.source_rows_by_receiver ?? [];
  for (const receiver of SITE_IDS) {
    const row = receiverRows.find((candidate) => candidate.receiver === receiver);
    assertField(row?.attractive_source_sites === 3, `receiver ${receiver} must have three attractive source sites`, errors);
    assertField(row?.repulsive_source_sites === 2, `receiver ${receiver} must have two repulsive source sites`, errors);
  }

  const sameSourcePolicy = artifact.branch_scope?.same_source_policy;
  assertField(
    SAME_SOURCE_POLICIES.includes(sameSourcePolicy?.selected),
    "same_source_policy.selected must be an allowed same-source policy",
    errors
  );
  assertField(
    sameSourcePolicy?.ordinary_force_rows_include_same_source === false,
    "same-source rows must be excluded from ordinary all-pairs force rows",
    errors
  );

  const hollow = artifact.hollow_support;
  assertField(hollow?.descriptor === "Supp_hollow", "hollow_support.descriptor must be Supp_hollow", errors);
  assertField(hollow?.center?.symbol === "C", "hollow_support.center.symbol must be C", errors);
  assertField(hollow?.radius_inner?.symbol === "R_in", "hollow_support.radius_inner.symbol must be R_in", errors);
  assertField(hollow?.radius_outer?.symbol === "R_out", "hollow_support.radius_outer.symbol must be R_out", errors);
  assertField(
    hollow?.band_width_witness?.symbol === "beta_band",
    "hollow_support.band_width_witness.symbol must be beta_band",
    errors
  );
  assertField(Array.isArray(hollow?.residuals) && hollow.residuals.length >= 5, "hollow_support.residuals must list support rows", errors);

  const rootLedger = artifact.all_pairs_root_ledger;
  assertField(rootLedger?.status === "all-pairs-root-ledger-open", "root ledger status must be open", errors);
  assertField(rootLedger?.pair_policy_checksum?.ordered_distinct_pair_count === 30, "root ledger checksum must record 30 pairs", errors);
  const liveLedgerHandoff = rootLedger?.bounded_speed_live_ledger_handoff ?? {};
  assertField(
    liveLedgerHandoff.status === "same-run-prerequisites-open",
    "bounded-speed live-ledger handoff must be same-run prerequisites open",
    errors
  );
  assertField(
    LIVE_LEDGER_HANDOFF_REQUIRED_ROWS.every((row) => liveLedgerHandoff.required_rows?.includes(row)),
    "bounded-speed live-ledger handoff required rows are incomplete",
    errors
  );
  assertField(
    liveLedgerHandoff.first_missing_field === "bounded_speed_delay_brackets",
    "bounded-speed live-ledger handoff first missing field must be bounded_speed_delay_brackets",
    errors
  );
  assertField(
    liveLedgerHandoff.source_ledger_reference?.seed_only === true &&
      liveLedgerHandoff.source_ledger_reference?.promoted_as_bounded_speed_evidence === false,
    "fixed-speed source ledger reference must remain seed-only",
    errors
  );
  assertField(
    liveLedgerHandoff.bounded_chart?.chart_run_id === chartRun?.run_id &&
      liveLedgerHandoff.bounded_chart?.status === "same-run-chart-input",
    "bounded chart handoff must bind to the same chart run",
    errors
  );
  assertField(
    Array.isArray(liveLedgerHandoff.clock_lift?.rows) &&
      liveLedgerHandoff.clock_lift.rows.length === SITE_IDS.length &&
      liveLedgerHandoff.clock_lift.rows.every((row) => row.chart_run_id === chartRun?.run_id),
    "clock_lift must emit one same-run prerequisite row per site",
    errors
  );
  assertField(
    liveLedgerHandoff.pair_policy_handoff?.ordered_distinct_pair_count === 30 &&
      liveLedgerHandoff.pair_policy_handoff?.unordered_compression === false,
    "pair_policy_handoff must preserve ordered all-pairs policy",
    errors
  );
  assertField(
    Array.isArray(liveLedgerHandoff.root_label_handoff?.root_labels) &&
      liveLedgerHandoff.root_label_handoff.root_labels.length === 30,
    "root_label_handoff must name 30 retained root labels",
    errors
  );
  assertField(
    liveLedgerHandoff.accepted_bounded_speed_live_ledger === null &&
      liveLedgerHandoff.certifies_bounded_speed_live_ledger === false,
    "bounded-speed live-ledger handoff must remain non-certifying",
    errors
  );
  const activeRootRows = rootLedger?.active_roots?.rows ?? [];
  assertField(
    rootLedger?.active_roots?.status === "same-run-prerequisites-open",
    "active_roots must be same-run prerequisites open",
    errors
  );
  assertField(
    rootLedger?.active_roots?.first_missing_field === "bounded_speed_delay_brackets" &&
      rootLedger?.active_roots?.accepted_active_roots === null &&
      rootLedger?.active_roots?.certifies_active_roots === false,
    "active_roots must remain fail-closed behind bounded_speed_delay_brackets",
    errors
  );
  assertField(
    Array.isArray(activeRootRows) && activeRootRows.length === expectedPairs.length,
    "active_roots must emit one prerequisite row per ordered distinct pair",
    errors
  );
  for (const pair of expectedPairs) {
    const row = activeRootRows.find((candidate) => candidate.receiver === pair.receiver && candidate.source === pair.source);
    assertField(Boolean(row), `active_roots must include prerequisite row for ${pairKey(pair)}`, errors);
    assertField(row?.chart_run_id === chartRun?.run_id, `active root prerequisite ${pairKey(pair)} chart_run_id must match`, errors);
    assertField(row?.root_label === rootLabelForPair(pair), `active root prerequisite ${pairKey(pair)} root_label mismatch`, errors);
    assertField(
      row?.bounded_speed_root_equation?.first_missing_field === "bounded_speed_delay_bracket",
      `active root prerequisite ${pairKey(pair)} must name bounded_speed_delay_bracket as first missing field`,
      errors
    );
    assertField(
      row?.delay_bracket?.status === "not_computed" &&
        row?.delay_floor?.status === "not_computed" &&
        row?.jacobian?.status === "not_computed",
      `active root prerequisite ${pairKey(pair)} must not fabricate delay or Jacobian evidence`,
      errors
    );
    assertField(
      row?.source_provenance?.retained_source_binding === null &&
        row?.source_provenance?.provider_provenance === null,
      `active root prerequisite ${pairKey(pair)} must keep provenance fail-closed`,
      errors
    );
    assertField(
      row?.fixed_speed_source_reference?.allowed_as_seed === true &&
        row?.fixed_speed_source_reference?.promoted_as_bounded_speed_evidence === false,
      `active root prerequisite ${pairKey(pair)} must keep fixed-speed source reference seed-only`,
      errors
    );
    assertField(
      row?.accepted_active_root === null &&
        row?.certifies_active_root === false &&
        row?.fixture === false &&
        row?.proxy === false &&
        row?.off_ledger === false &&
        row?.sampled_diagnostic === false &&
        row?.cross_row_bundle === false,
      `active root prerequisite ${pairKey(pair)} must remain non-authorizing same-run evidence`,
      errors
    );
  }
  assertField(rootLedger?.inactive_gaps?.status === "open_placeholder", "inactive_gaps must be an open placeholder", errors);
  assertField(rootLedger?.jacobian_floor?.status === "open_placeholder", "jacobian_floor must be an open placeholder", errors);

  const vocabulary = artifact.residual_status_vocabulary;
  assertField(
    FINITE_MODE_DECISIONS.every((status) => vocabulary?.finite_mode_decisions?.includes(status)),
    "finite-mode decision vocabulary is incomplete",
    errors
  );
  assertField(
    FIRST_FAILURE_ORDER.every((status) => vocabulary?.first_failure_order?.includes(status)),
    "first-failure vocabulary is incomplete",
    errors
  );
  assertField(
    ROOT_LEDGER_STATUSES.every((status) => vocabulary?.root_ledger_statuses?.includes(status)),
    "root-ledger status vocabulary is incomplete",
    errors
  );
  assertField(vocabulary?.result_statuses?.includes("search_open"), "result vocabulary must include search_open", errors);
  assertField(vocabulary?.result_statuses?.includes("not_retained"), "result vocabulary must include not_retained", errors);

  assertField(artifact.decision?.finite_mode_decision === "neutral-braid-finite-mode-open", "decision must be finite-mode open", errors);
  assertField(artifact.decision?.first_failure_status === "all-pairs-root-ledger-open", "first failure must be root-ledger open", errors);
  assertField(artifact.result?.search === "search_open", "result.search must be search_open", errors);
  assertField(artifact.result?.retention === "not_retained", "result.retention must be not_retained", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);
  assertField(artifact.action_measure_row?.status === "absent-fail-closed", "action_measure_row must be absent fail-closed", errors);
  assertField(
    artifact.action_measure_row?.first_missing_field_after_period_rows === "action_functional",
    "action_measure_row first missing field after period_rows must be action_functional",
    errors
  );
  assertField(
    Array.isArray(artifact.action_measure_row?.missing_same_ledger_fields) &&
      artifact.action_measure_row.root_support_event_rows_status === "same-run-open-not-accepted" &&
      artifact.action_measure_row.missing_same_ledger_fields.includes("accepted_root_support_event_rows") &&
      artifact.action_measure_row.missing_same_ledger_fields.includes("retained_source_binding") &&
      artifact.action_measure_row.missing_same_ledger_fields.includes("provider_provenance") &&
      artifact.action_measure_row.missing_same_ledger_fields.includes("receiver_normal_branch_strength_linkage"),
    "action_measure_row must list retained source, provider provenance, and receiver-normal linkage blockers",
    errors
  );
  assertField(
    NON_AUTHORIZING_ACTION_MEASURE_REJECTIONS.every((kind) =>
      artifact.action_measure_row?.rejected_evidence_kinds?.includes(kind)
    ),
    "action_measure_row rejected evidence list is incomplete",
    errors
  );
  assertField(
    artifact.action_measure_row?.accepted_same_ledger_action_measure_row === null &&
      artifact.action_measure_row?.certifies_action_measure_row === false &&
      artifact.action_measure_row?.authorizes_rank5_retained_branch_closure === false,
    "action_measure_row must remain non-authorizing",
    errors
  );
  assertField(Array.isArray(artifact.not_retained_reason) && artifact.not_retained_reason.length > 0, "not_retained_reason must be nonempty", errors);

  return errors;
}

function parseArgs(argv) {
  const args = {
    mode: "emit",
    out: null,
    pretty: false,
    sameSourcePolicy: DEFAULT_SAME_SOURCE_POLICY,
    chartId: DEFAULT_CHART_ID,
    chartPeriod: DEFAULT_CHART_PERIOD,
    periodConvention: DEFAULT_PERIOD_CONVENTION,
    validatePath: null,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema") {
      args.mode = "schema";
    } else if (arg === "--validate") {
      args.mode = "validate";
      args.validatePath = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--same-source-policy") {
      args.sameSourcePolicy = argv[++index];
    } else if (arg === "--chart-id") {
      args.chartId = argv[++index];
    } else if (arg === "--chart-period") {
      args.chartPeriod = Number(argv[++index]);
    } else if (arg === "--period-convention") {
      args.periodConvention = argv[++index];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.mode === "validate" && !args.validatePath) {
    throw new Error("--validate requires a JSON artifact path.");
  }
  if (!SAME_SOURCE_POLICIES.includes(args.sameSourcePolicy)) {
    throw new Error(`--same-source-policy must be one of: ${SAME_SOURCE_POLICIES.join(", ")}`);
  }
  assertNonemptyString(args.chartId, "--chart-id");
  assertPositiveFiniteNumber(args.chartPeriod, "--chart-period");
  assertNonemptyString(args.periodConvention, "--period-convention");
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/neutral-braid/finite-mode-artifact.mjs [options]

Options:
  --out PATH                         Write emitted JSON to PATH instead of stdout.
  --pretty                           Pretty-print JSON output.
  --same-source-policy POLICY        Same-source policy. Defaults to ordinary-same-source-excluded.
  --chart-id ID                      Concrete chart input id for this run.
  --chart-period NUMBER              Positive period value for all same-run period rows.
  --period-convention NAME           Period convention for emitted period_rows.
  --schema                           Emit the compact artifact schema contract.
  --validate PATH                    Validate an emitted artifact and print an audit summary.
  --help                             Show this help.

This emits or validates the neutral braid finite-mode execution artifact slice.
It records the six-site inventory, all 30 ordered distinct source pairs,
same-run branch_scope and period_rows, hollow support placeholders, root-ledger
placeholders, root/support/event row ids, residual/status vocabulary, and a
search_open/not_retained result.
It does not solve dynamics, emit action_measure_row, or retain a branch.`);
}

function writeJson(value, outPath, pretty) {
  const text = `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.writeFileSync(path.resolve(outPath), text);
    return;
  }
  process.stdout.write(text);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  if (args.mode === "schema") {
    writeJson(ARTIFACT_SCHEMA, args.out, args.pretty);
    return;
  }

  if (args.mode === "validate") {
    const inputPath = path.resolve(args.validatePath);
    const artifact = readJson(inputPath);
    const errors = validateArtifact(artifact);
    const summary = {
      schema: "neutral-braid-finite-mode-artifact-validation/v1",
      input: path.relative(process.cwd(), inputPath),
      valid: errors.length === 0,
      errors,
      packet_id: artifact.packet_id ?? null,
      pair_count: artifact.branch_scope?.pair_policy?.ordered_distinct_pairs?.length ?? null,
      period_row_count: artifact.period_rows?.rows?.length ?? null,
      root_support_event_row_count: artifact.root_support_event_rows?.rows?.length ?? null,
      result: artifact.result ?? null,
    };
    writeJson(summary, args.out, args.pretty);
    if (errors.length > 0) {
      process.exitCode = 1;
    }
    return;
  }

  writeJson(
    buildArtifact({
      sameSourcePolicy: args.sameSourcePolicy,
      chartId: args.chartId,
      chartPeriod: args.chartPeriod,
      periodConvention: args.periodConvention,
    }),
    args.out,
    args.pretty
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  main();
}
