#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_MAX_ESTIMATED_STEPS = 1_000_000;
const ACCEPTED_HISTORY_BLOCKERS = [
  "status_is_accepted_history_segment",
  "residuals_below_tolerance",
  "no_secular_center_drift",
  "Delta_k_positive",
  "same_branch_persists_across_eta_ladder",
];

function parseArgs(argv) {
  const args = {
    source: null,
    rows: "all",
    maxEstimatedSteps: DEFAULT_MAX_ESTIMATED_STEPS,
    pretty: false,
    out: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source") {
      args.source = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--max-estimated-steps") {
      args.maxEstimatedSteps = parsePositiveInteger(argv[++i], "--max-estimated-steps");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-one-period-continuation-prototype.mjs --source PATH [options]

Options:
  --source PATH              Continuation-source prototype JSON with direct-root horizon diagnostics.
  --rows VALUE               "all" or a comma-separated row list. Defaults to "all".
  --max-estimated-steps N    Step-count cap for a one-period attempt. Defaults to ${DEFAULT_MAX_ESTIMATED_STEPS}.
  --out PATH                 Write JSON output to a file instead of stdout.
  --pretty                   Pretty-print JSON.
  --help                     Show this help.

This is a fail-closed one-period continuation intake prototype. It does not run
the full one-period delayed dynamics and does not compute Delta_k. It consumes
short-horizon direct-root diagnostics, carries fold-layer routing forward, and
reports whether a one-period attempt is computationally and structurally ready.`);
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireSourcePath(args) {
  if (!args.source) {
    throw new Error("Missing required --source PATH argument.");
  }
  return path.resolve(args.source);
}

function selectRows(artifact, selector) {
  const rows = Array.isArray(artifact.rows) ? artifact.rows : [];
  if (selector === "all") {
    return rows;
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
  return rows.filter((row) => selected.has(row.row));
}

function directRootHorizonLadder(row) {
  return row.diagnostics?.direct_root_horizon_ladder ?? null;
}

function bestBoundedEntry(ladder) {
  const entries = Array.isArray(ladder?.entries) ? ladder.entries : [];
  const bounded = entries.filter(
    (entry) => entry.dynamically_bounded === true && Number.isFinite(entry.horizon_period_fraction)
  );
  return bounded.reduce(
    (best, entry) =>
      !best || entry.horizon_period_fraction > best.horizon_period_fraction ? entry : best,
    null
  );
}

function firstSurplusEntry(ladder) {
  const entries = Array.isArray(ladder?.entries) ? ladder.entries : [];
  return (
    entries.find((entry) => {
      const step = entry.branch_retention?.first_branch_surplus_step;
      return step !== null && step !== undefined;
    }) ?? null
  );
}

function estimateOnePeriodSteps(entry) {
  if (!entry || !Number.isFinite(entry.horizon_period_fraction) || entry.horizon_period_fraction <= 0) {
    return null;
  }
  const requestedSteps = entry.requested_steps ?? entry.completed_steps;
  if (!Number.isFinite(requestedSteps) || requestedSteps <= 0) {
    return null;
  }
  return Math.ceil(requestedSteps / entry.horizon_period_fraction);
}

function foldLayerRouting(fold) {
  if (!fold) {
    return {
      status: "missing",
      classification: null,
      route: "fold-splitting-classification-required",
      can_route_to_lock_ledger: false,
      failure_code: "self-root-fold-splitting-missing",
    };
  }
  if (fold.classification === "fold-layer") {
    return {
      status: "classified",
      classification: fold.classification,
      route: "fold-layer-routed-to-lock-ledger",
      can_route_to_lock_ledger: true,
      failure_code: null,
    };
  }
  if (fold.classification === "branch-proliferation") {
    return {
      status: "classified",
      classification: fold.classification,
      route: "root-ledger-instability",
      can_route_to_lock_ledger: false,
      failure_code: "self-root-branch-proliferation",
    };
  }
  return {
    status: "classified",
    classification: fold.classification ?? "resolution-artifact",
    route: "resolution-refinement-required",
    can_route_to_lock_ledger: false,
    failure_code: "self-root-resolution-artifact",
  };
}

function residualTargets() {
  return {
    schema: "a0-tier1-one-period-residual-targets/v1",
    state_return:
      "R_state = max_b max(||x_b(T)-x_b(0)||/R_scale, ||v_b(T)-v_b(0)||/V_scale)",
    root_residual:
      "R_root = max_{t,i,j,l} |g_ij(t0_l;t)| / max(c_F Delta t, eta, epsilon_0)",
    speed_ordering:
      "R_speed = max_t max(0, v_I(t)-c_F, v_M(t)-v_I(t), v_O(t)-v_M(t))",
    center_drift:
      "R_drift = max(||X_c(T)-X_c(0)||/R_scale, ||V_c(T)-V_c(0)||/V_scale) after symmetry removal",
    energy_like_speed_ledger:
      "R_E = |mean_b ||v_b(T)||^2 - mean_b ||v_b(0)||^2| / max(mean_b ||v_b(0)||^2, eps)",
    fold_layer_lock:
      "R_lock records bounded self-root fold-layer events separately from root-ledger instability",
  };
}

function monodromySetup(row) {
  return {
    schema: "a0-tier1-one-period-monodromy-setup/v1",
    status: "not_computed",
    period: row.period ?? null,
    operator: "P_eta_Lambda",
    quotient_rule:
      "Remove time-shift, Euclidean translation, Euclidean rotation, and branch-chart gauge modes before measuring non-symmetry multipliers.",
    Delta_k_formula: "Delta_k = 1 - rho(Pi_perp D P_{eta,Lambda} Pi_perp)",
    validation_effect: {
      Delta_k_positive: false,
      reason: "finite-difference monodromy has not been constructed by this prototype",
    },
  };
}

function rowStatus({ routing, estimatedSteps, maxEstimatedSteps, bestEntry }) {
  if (routing.status === "missing") {
    return {
      status: "blocked_fold_splitting_unclassified",
      failure_code: routing.failure_code,
    };
  }
  if (routing.classification === "branch-proliferation") {
    return {
      status: "blocked_root_ledger_instability",
      failure_code: routing.failure_code,
    };
  }
  if (routing.classification !== "fold-layer") {
    return {
      status: "blocked_resolution_refinement_required",
      failure_code: routing.failure_code,
    };
  }
  if (!bestEntry || estimatedSteps === null) {
    return {
      status: "blocked_one_period_step_budget_unavailable",
      failure_code: "bounded-short-horizon-entry-missing",
    };
  }
  if (estimatedSteps > maxEstimatedSteps) {
    return {
      status: "blocked_one_period_step_budget_exceeds_cap",
      failure_code: "estimated-step-count-exceeds-cap",
    };
  }
  return {
    status: "ready_for_one_period_continuation_attempt",
    failure_code: "one-period-integrator-not-run",
  };
}

function onePeriodRow(row, args) {
  const ladder = directRootHorizonLadder(row);
  const bestEntry = bestBoundedEntry(ladder);
  const surplusEntry = firstSurplusEntry(ladder);
  const fold = ladder?.first_self_root_fold_splitting ?? surplusEntry?.self_root_fold_splitting ?? null;
  const routing = foldLayerRouting(fold);
  const estimatedSteps = estimateOnePeriodSteps(bestEntry);
  const status = rowStatus({
    routing,
    estimatedSteps,
    maxEstimatedSteps: args.maxEstimatedSteps,
    bestEntry,
  });
  return {
    row: row.row,
    schema: "a0-tier1-one-period-continuation-prototype-row/v1",
    schema_status: "provisional",
    status: status.status,
    failure_code: status.failure_code,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    period: row.period ?? null,
    branch_chart: {
      self_root_fold_splitting: fold,
      fold_layer_routing: routing,
      branch_surplus_source: ladder?.first_branch_surplus ?? null,
    },
    one_period_step_budget: {
      max_estimated_steps: args.maxEstimatedSteps,
      best_bounded_entry:
        bestEntry === null
          ? null
          : {
              requested_steps: bestEntry.requested_steps,
              completed_steps: bestEntry.completed_steps,
              horizon_period_fraction: bestEntry.horizon_period_fraction,
              status: bestEntry.status,
              dynamically_bounded: bestEntry.dynamically_bounded,
            },
      first_surplus_entry:
        surplusEntry === null
          ? null
          : {
              requested_steps: surplusEntry.requested_steps,
              horizon_period_fraction: surplusEntry.horizon_period_fraction,
              status: surplusEntry.status,
              dynamically_bounded: surplusEntry.dynamically_bounded,
              first_branch_surplus_step: surplusEntry.branch_retention?.first_branch_surplus_step ?? null,
            },
      estimated_steps_for_one_period: estimatedSteps,
      can_attempt_with_current_cap:
        estimatedSteps !== null && estimatedSteps <= args.maxEstimatedSteps && routing.can_route_to_lock_ledger,
    },
    residual_targets: residualTargets(),
    monodromy_setup: monodromySetup(row),
    accepted_history_boundary: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      blocked_fields: ACCEPTED_HISTORY_BLOCKERS,
      reason:
        "this prototype records feasibility and residual targets only; it does not emit accepted-history rows",
    },
  };
}

function summarize(rows) {
  const status_counts = {};
  const failure_codes = {};
  for (const row of rows) {
    status_counts[row.status] = (status_counts[row.status] ?? 0) + 1;
    if (row.failure_code) {
      failure_codes[row.failure_code] = (failure_codes[row.failure_code] ?? 0) + 1;
    }
  }
  return {
    row_count: rows.length,
    ready_for_one_period_attempt_count: rows.filter((row) => row.status === "ready_for_one_period_continuation_attempt").length,
    accepted_history_row_count: 0,
    status_counts,
    failure_codes,
  };
}

function run(sourceArtifact, sourcePath, args) {
  const rows = selectRows(sourceArtifact, args.rows).map((row) => onePeriodRow(row, args));
  return {
    metadata: {
      artifact: "a0-tier1-one-period-continuation-prototype",
      schema: "a0-tier1-one-period-continuation-prototype/v1",
      status:
        rows.length > 0 && rows.every((row) => row.status === "ready_for_one_period_continuation_attempt")
          ? "ready_for_one_period_attempt"
          : "blocked_one_period_continuation",
      generatedAt: new Date().toISOString(),
      source: path.relative(process.cwd(), sourcePath),
      max_estimated_steps: args.maxEstimatedSteps,
      note:
        "Fail-closed intake from short-horizon direct-root diagnostics; this artifact does not integrate a full period and does not compute Delta_k.",
    },
    source_metadata: sourceArtifact.metadata ?? null,
    summary: summarize(rows),
    rows,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const sourcePath = requireSourcePath(args);
  const sourceArtifact = readJson(sourcePath);
  const artifact = run(sourceArtifact, sourcePath, args);
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
