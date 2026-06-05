#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan/v1";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_V10_LEDGER = `${CERT_DIR}/causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`;
const DEFAULT_SHIFTED_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_SHIFTED_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_ONE_LEAF = `${CERT_DIR}/one_leaf_candidate_change_boundary_data.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`;
const DEFAULT_SOURCE_COVER = `${CERT_DIR}/source_cover_defect_atlas.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`;
const DEFAULT_BOUNDARY_AUDIT = `${CERT_DIR}/source_cover_boundary_ownership_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`;
const DEFAULT_FOLD_LAYER = `${CERT_DIR}/fold_layer_burden.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_LAMBDA_AUDIT = `${CERT_DIR}/lambda0305_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`;
const DEFAULT_OUT = `${CERT_DIR}/gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`;

const FOLD_VARIABLES = [
  {
    id: "fc_sigma_source_lower",
    source_symbol: "sigma_source_lower",
    meaning: "Fold-coordinate source-inner lower-boundary opening tangent.",
  },
  {
    id: "fc_rho_receiver_lower",
    source_symbol: "rho_receiver_lower",
    meaning: "Fold-coordinate receiver lower-boundary contraction tangent.",
  },
  {
    id: "fc_sigma_source_upper",
    source_symbol: "sigma_source_upper",
    meaning: "Fold-coordinate source-inner upper-boundary opening tangent.",
  },
  {
    id: "fc_rho_receiver_upper",
    source_symbol: "rho_receiver_upper",
    meaning: "Fold-coordinate receiver upper-boundary contraction tangent.",
  },
];

const FOLD_VARIABLE_BY_SYMBOL = new Map(FOLD_VARIABLES.map((entry) => [entry.source_symbol, entry.id]));

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    v10Ledger: DEFAULT_V10_LEDGER,
    shiftedInput: DEFAULT_SHIFTED_INPUT,
    shiftedResult: DEFAULT_SHIFTED_RESULT,
    oneLeaf: DEFAULT_ONE_LEAF,
    sourceCover: DEFAULT_SOURCE_COVER,
    boundaryAudit: DEFAULT_BOUNDARY_AUDIT,
    foldLayer: DEFAULT_FOLD_LAYER,
    lambdaAudit: DEFAULT_LAMBDA_AUDIT,
    out: DEFAULT_OUT,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++i];
    } else if (arg === "--v10-ledger") {
      args.v10Ledger = argv[++i];
    } else if (arg === "--shifted-input") {
      args.shiftedInput = argv[++i];
    } else if (arg === "--shifted-result") {
      args.shiftedResult = argv[++i];
    } else if (arg === "--one-leaf") {
      args.oneLeaf = argv[++i];
    } else if (arg === "--source-cover") {
      args.sourceCover = argv[++i];
    } else if (arg === "--boundary-audit") {
      args.boundaryAudit = argv[++i];
    } else if (arg === "--fold-layer") {
      args.foldLayer = argv[++i];
    } else if (arg === "--lambda-audit") {
      args.lambdaAudit = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-nonlinear-fold-coordinate-collocation-matrix-builder.mjs [options]

Options:
  --contract PATH        Fresh same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --v10-ledger PATH      Proof-interval-v10 ledger JSON. Defaults to ${DEFAULT_V10_LEDGER}.
  --shifted-input PATH   Existing shifted-separator strict-gap scanner input. Defaults to ${DEFAULT_SHIFTED_INPUT}.
  --shifted-result PATH  Existing shifted-separator strict-gap scanner result. Defaults to ${DEFAULT_SHIFTED_RESULT}.
  --one-leaf PATH        Higher-fold one-leaf boundary-opening data. Defaults to ${DEFAULT_ONE_LEAF}.
  --source-cover PATH    Higher-fold source-cover defect atlas. Defaults to ${DEFAULT_SOURCE_COVER}.
  --boundary-audit PATH  Higher-fold boundary-ownership audit. Defaults to ${DEFAULT_BOUNDARY_AUDIT}.
  --fold-layer PATH      Higher-fold fold-layer burden JSON. Defaults to ${DEFAULT_FOLD_LAYER}.
  --lambda-audit PATH    Higher-fold lambda=0.305 replay audit. Defaults to ${DEFAULT_LAMBDA_AUDIT}.
  --out PATH             Write scanner input JSON. Defaults to ${DEFAULT_OUT}.
  --pretty               Pretty-print JSON.
  --help                 Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function cleanNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error(`Expected finite number, got ${value}`);
  }
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function qDisplayNumber(value, label) {
  const display = value?.display;
  const number = Number(display);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected finite ${label}.display, got ${display}`);
  }
  return number;
}

function assertInputs({ contract, ledger, shiftedInput, shiftedResult, oneLeaf }) {
  if (contract.packet_id !== "fresh-same-packet-fold-shear-seed-v0") {
    throw new Error(`Unexpected contract packet_id: ${contract.packet_id}`);
  }
  if (ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v10") {
    throw new Error("Proof-interval-v10 ledger schema mismatch.");
  }
  if (ledger.packet_id !== contract.packet_id) {
    throw new Error(`Ledger packet_id ${ledger.packet_id} does not match contract ${contract.packet_id}.`);
  }
  if (!Array.isArray(ledger.parent_complement_strips_v10) || ledger.parent_complement_strips_v10.length !== 10) {
    throw new Error("Expected exactly 10 v10 parent-complement strips.");
  }
  if (ledger.branch_chart_authorized || ledger.preledger_pass || ledger.updates_live_ledger) {
    throw new Error("Imported v10 unexpectedly authorizes a live preledger or branch chart.");
  }
  if (shiftedInput.schema !== OUTPUT_SCHEMA) {
    throw new Error(`Expected shifted input schema ${OUTPUT_SCHEMA}.`);
  }
  if (!Array.isArray(shiftedInput.gap_constraints) || shiftedInput.gap_constraints.length !== 10) {
    throw new Error("Expected shifted input to provide exactly 10 gap constraints.");
  }
  if (shiftedResult.status !== "feasible") {
    throw new Error("The shifted-separator fixed-period witness is not feasible.");
  }
  if (shiftedResult.gap_constraint_count !== 10) {
    throw new Error("The shifted-separator fixed-period result does not cover 10 gap rows.");
  }
  if (!Array.isArray(oneLeaf.rows) || oneLeaf.rows.length !== 3) {
    throw new Error("Expected exactly 3 one-leaf boundary-opening rows.");
  }
}

function structuralConstraints() {
  return [
    {
      id: "fold_coordinate_lower_boundary_pair_balance",
      coefficients: { fc_sigma_source_lower: 1, fc_rho_receiver_lower: -1 },
      target: 0,
      meaning: "First-screen lower-boundary opening keeps source and receiver fold-coordinate tangents paired.",
    },
    {
      id: "fold_coordinate_upper_boundary_pair_balance",
      coefficients: { fc_sigma_source_upper: 1, fc_rho_receiver_upper: -1 },
      target: 0,
      meaning: "First-screen upper-boundary opening keeps source and receiver fold-coordinate tangents paired.",
    },
    {
      id: "fold_coordinate_mirrored_boundary_opening_balance",
      coefficients: { fc_sigma_source_lower: 1, fc_sigma_source_upper: -1 },
      target: 0,
      meaning: "Half-period fold-coordinate opening uses equal lower and upper screen magnitudes.",
    },
  ];
}

function variablesFromShiftedInput(shiftedInput) {
  return [
    ...shiftedInput.variables.map((entry) => ({
      ...entry,
      collocation_role: "shifted_separator_c1_arc_bump",
    })),
    ...FOLD_VARIABLES.map((entry) => ({
      id: entry.id,
      meaning: entry.meaning,
      collocation_role: "fold_coordinate_boundary_opening",
      source_symbol: entry.source_symbol,
      bounded_screen_range: [-1, 1],
    })),
  ];
}

function witnessFromShiftedResult(shiftedInput, shiftedResult) {
  const shiftedWitness = shiftedResult.witness ?? shiftedInput.candidate_witness;
  if (!shiftedWitness || typeof shiftedWitness !== "object") {
    throw new Error("Missing shifted-separator witness.");
  }
  return {
    ...shiftedWitness,
    fc_sigma_source_lower: 0.5,
    fc_rho_receiver_lower: 0.5,
    fc_sigma_source_upper: 0.5,
    fc_rho_receiver_upper: 0.5,
  };
}

function oneLeafConstraints(oneLeaf, witness) {
  const rows = oneLeaf.rows.map((row) => {
    const sourceSymbol = row.candidate_change_variables?.favorable_source_shift?.symbol;
    const receiverSymbol = row.candidate_change_variables?.favorable_receiver_shift?.symbol;
    const sourceVariable = FOLD_VARIABLE_BY_SYMBOL.get(sourceSymbol);
    const receiverVariable = FOLD_VARIABLE_BY_SYMBOL.get(receiverSymbol);
    if (!sourceVariable || !receiverVariable) {
      throw new Error(`Unsupported one-leaf shift symbols for ${row.row_id}: ${sourceSymbol}, ${receiverSymbol}`);
    }
    const required = qDisplayNumber(
      row.combined_boundary_opening_condition?.required_combined_opening_q,
      `${row.row_id}.required_combined_opening_q`
    );
    const opening = Number(witness[sourceVariable]) + Number(witness[receiverVariable]);
    const margin = cleanNumber(opening - required);
    return {
      row_id: row.row_id,
      cover_id: row.cover_id,
      ledger: row.ledger,
      receiver_interval: row.receiver_interval,
      source_interval: row.source_interval,
      failed_side: row.failed_side,
      boundary_side: row.boundary_side,
      terminal_grid_span: row.terminal_grid_span,
      ownership_component_id: row.ownership_component_id,
      source_boundary_ref: row.source_boundary_ref,
      receiver_boundary_ref: row.receiver_boundary_ref,
      source_shift_variable: sourceVariable,
      receiver_shift_variable: receiverVariable,
      required_combined_opening: cleanNumber(required),
      witness_combined_opening: cleanNumber(opening),
      witness_margin_after_required_opening: margin,
      strict_screen_pass: margin > 0,
      success_inequality:
        row.combined_boundary_opening_condition?.combined_shift_condition ??
        `${sourceVariable} + ${receiverVariable} > required_combined_opening`,
    };
  });
  const margins = rows.map((row) => row.witness_margin_after_required_opening);
  return {
    rows,
    summary: {
      row_count: rows.length,
      strict_screen_pass_rows: rows.filter((row) => row.strict_screen_pass).length,
      min_boundary_opening_margin: cleanNumber(Math.min(...margins)),
      max_boundary_opening_margin: cleanNumber(Math.max(...margins)),
      screen_level_success:
        rows.length > 0 && rows.every((row) => row.strict_screen_pass)
          ? "strict_boundary_opening_screen_positive"
          : "strict_boundary_opening_screen_not_positive",
      still_not_certified_fields: [
        "source_monotonicity_preserved_under_candidate_change",
        "receiver_monotonicity_preserved_under_candidate_change",
        "memory_margins_all_owned_components",
        "endpoint_ownership_no_double_counting",
        "simple_root_branch_reuse_exclusion",
        "non_owned_complement_closed",
      ],
    },
  };
}

function guardFacts(sourceCover, boundaryAudit, foldLayer, lambdaAudit) {
  return {
    source_cover_defect_atlas: {
      parent_rows: sourceCover.summary?.parent_rows,
      structural_terminal_misses: sourceCover.summary?.structural_terminal_misses,
      receiver_interior_missing_leaves:
        sourceCover.summary?.receiver_boundary_span_counts?.receiver_interior_missing_leaves,
      row_consumption_count: sourceCover.summary?.row_consumption_count,
      branch_chart_authorized: sourceCover.summary?.branch_chart_authorized,
      nearest_closure_rows: sourceCover.summary?.nearest_closure_rows?.slice(0, 3),
    },
    boundary_ownership_audit: {
      complete_receiver_partitions: boundaryAudit.summary?.complete_receiver_partitions,
      rows_passing_boundary_ownership_rule: boundaryAudit.summary?.rows_passing_boundary_ownership_rule,
      all_terminal_spans_owned:
        boundaryAudit.summary?.field_certification_counts?.all_terminal_spans_owned,
      strict_source_coverage_or_contraction:
        boundaryAudit.summary?.field_certification_counts?.strict_source_coverage_or_contraction,
      endpoint_ownership_no_double_counting:
        boundaryAudit.summary?.field_certification_counts?.endpoint_ownership_no_double_counting,
      row_consumption_count: boundaryAudit.summary?.row_consumption_count,
    },
    fold_layer_burden: {
      fold_layer_rows: foldLayer.summary?.fold_layer_rows,
      separator_count: foldLayer.summary?.separator_count,
      accepted_fold_layer_rows: 0,
      row_must_not_become: "simple_root",
    },
    lambda0305_replay: {
      root_count: lambdaAudit.trial_seed_summary?.root_count,
      interval_status: lambdaAudit.topology_recertification?.interval_status,
      interval_min_complement_margin: lambdaAudit.topology_recertification?.interval_min_complement_margin,
      split_required_base_rows: lambdaAudit.ephemeral_preledger_replay?.v6?.split_required_base_rows,
      receiver_cover_missing_cells: lambdaAudit.ephemeral_preledger_replay?.v6?.receiver_cover_missing_cells,
      accepted_fold_layer_rows: lambdaAudit.ephemeral_preledger_replay?.v6?.accepted_fold_layer_rows,
      branch_chart_authorized: lambdaAudit.ephemeral_preledger_replay?.v6?.branch_chart_authorized,
    },
  };
}

function buildInput(inputs) {
  assertInputs(inputs);
  const witness = witnessFromShiftedResult(inputs.shiftedInput, inputs.shiftedResult);
  const oneLeaf = oneLeafConstraints(inputs.oneLeaf, witness);
  return {
    schema: OUTPUT_SCHEMA,
    packet_id: "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0",
    packet_identity: {
      source_packet: inputs.ledger.packet_id,
      source_refinement: inputs.ledger.refinement_id,
      matrix_status: "diagnostic_nonlinear_fold_coordinate_collocation_tangent_matrix_not_full_candidate",
      basis_model: "shifted_separator_c1_bumps_plus_fold_coordinate_boundary_opening_columns",
      period_mode: "fixed",
      fold_coordinate_source:
        "First nonlinear collocation surface screen; fold-coordinate columns are bounded tangent variables, not an accepted candidate deformation.",
    },
    source:
      "Adds bounded fold-coordinate boundary-opening columns and nonzero structural rows to the existing fixed-period shifted-separator v10 strict-gap tangent matrix, while importing higher-fold one-leaf rows as first-focus screen data.",
    claim_limits: {
      claims_breather: false,
      claims_preledger_pass: false,
      claims_branch_chart_authorization: false,
      claims_interval_certification: false,
      claims_live_candidate: false,
      claims_full_structural_jacobian: false,
      claims_receiver_cover_ownership: false,
      claims_fold_layer_consumption: false,
    },
    basis_includes_fold_coordinate_columns: true,
    uses_receiver_cover_ownership: false,
    basis_definition: {
      ...(inputs.shiftedInput.basis_definition ?? {}),
      basis_includes_fold_coordinate_columns: true,
      fold_coordinate_columns: FOLD_VARIABLES,
      nonlinear_collocation_surface:
        "This file is the finite tangent-matrix surface for the nonlinear fold-coordinate collocation route; it is not the solved collocation packet.",
    },
    variables: variablesFromShiftedInput(inputs.shiftedInput),
    structural_constraints: structuralConstraints(),
    candidate_witness: witness,
    gap_constraints: inputs.shiftedInput.gap_constraints,
    source_summary: inputs.ledger.summary,
    one_leaf_boundary_opening_constraints: oneLeaf.rows,
    one_leaf_boundary_opening_summary: oneLeaf.summary,
    guard_facts: guardFacts(inputs.sourceCover, inputs.boundaryAudit, inputs.foldLayer, inputs.lambdaAudit),
    imported_artifacts: {
      contract: DEFAULT_CONTRACT,
      v10_ledger: DEFAULT_V10_LEDGER,
      shifted_input: DEFAULT_SHIFTED_INPUT,
      shifted_result: DEFAULT_SHIFTED_RESULT,
      one_leaf_boundary_data: DEFAULT_ONE_LEAF,
      source_cover_defect_atlas: DEFAULT_SOURCE_COVER,
      boundary_ownership_audit: DEFAULT_BOUNDARY_AUDIT,
      fold_layer_burden: DEFAULT_FOLD_LAYER,
      lambda0305_replay_audit: DEFAULT_LAMBDA_AUDIT,
    },
    limitations: [
      "The scanner-facing rows are the 10 existing v10 strict null-coordinate parent-complement collars.",
      "The three higher-fold one-leaf rows are first-focus screen data, not consumed pre-ledger rows.",
      "The structural rows are a bounded fold-coordinate tangent surface, not the full nonlinear collocation Jacobian.",
      "The result must not update the live causal ledger or authorize branch-chart construction.",
      "A feasible witness still has to be integrated into a solved same-packet collocation candidate and interval pre-ledger.",
    ],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    contract: readJson(path.resolve(args.contract)),
    ledger: readJson(path.resolve(args.v10Ledger)),
    shiftedInput: readJson(path.resolve(args.shiftedInput)),
    shiftedResult: readJson(path.resolve(args.shiftedResult)),
    oneLeaf: readJson(path.resolve(args.oneLeaf)),
    sourceCover: readJson(path.resolve(args.sourceCover)),
    boundaryAudit: readJson(path.resolve(args.boundaryAudit)),
    foldLayer: readJson(path.resolve(args.foldLayer)),
    lambdaAudit: readJson(path.resolve(args.lambdaAudit)),
  };
  writeJson(path.resolve(args.out), buildInput(inputs), args.pretty);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
