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
    "all-pairs root-ledger placeholders",
    "residual and status vocabulary",
    "not_retained/search_open result",
  ],
  required_fields: [
    "schema",
    "packet_id",
    "promotion_status",
    "branch_scope",
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

export function buildArtifact(options = {}) {
  const sameSourcePolicy = options.sameSourcePolicy ?? DEFAULT_SAME_SOURCE_POLICY;
  if (!SAME_SOURCE_POLICIES.includes(sameSourcePolicy)) {
    throw new Error(`same-source policy must be one of: ${SAME_SOURCE_POLICIES.join(", ")}`);
  }

  const pairs = orderedDistinctPairs();
  const inventory = siteInventory();

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
      kind: "audit_emitter_surface",
      solves_dynamics: false,
      strongest_claim:
        "This artifact records the finite-mode search contract and open placeholders; it is not a branch certificate.",
    },
    branch_scope: {
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
    },
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
      active_roots: { status: "open_placeholder", rows: [] },
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
        "The emitted artifact is an open finite-mode search contract. It records required rows but does not solve dynamics or retain a branch.",
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
  assertField(rootLedger?.active_roots?.status === "open_placeholder", "active_roots must be an open placeholder", errors);
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
  assertField(Array.isArray(artifact.not_retained_reason) && artifact.not_retained_reason.length > 0, "not_retained_reason must be nonempty", errors);

  return errors;
}

function parseArgs(argv) {
  const args = {
    mode: "emit",
    out: null,
    pretty: false,
    sameSourcePolicy: DEFAULT_SAME_SOURCE_POLICY,
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
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/neutral-braid/finite-mode-artifact.mjs [options]

Options:
  --out PATH                         Write emitted JSON to PATH instead of stdout.
  --pretty                           Pretty-print JSON output.
  --same-source-policy POLICY        Same-source policy. Defaults to ordinary-same-source-excluded.
  --schema                           Emit the compact artifact schema contract.
  --validate PATH                    Validate an emitted artifact and print an audit summary.
  --help                             Show this help.

This emits or validates the neutral braid finite-mode search artifact shape. It
records the six-site inventory, all 30 ordered distinct source pairs, hollow
support placeholders, root-ledger placeholders, residual/status vocabulary, and
a search_open/not_retained result. It does not solve dynamics or retain a branch.`);
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
      result: artifact.result ?? null,
    };
    writeJson(summary, args.out, args.pretty);
    if (errors.length > 0) {
      process.exitCode = 1;
    }
    return;
  }

  writeJson(buildArtifact({ sameSourcePolicy: args.sameSourcePolicy }), args.out, args.pretty);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  main();
}
