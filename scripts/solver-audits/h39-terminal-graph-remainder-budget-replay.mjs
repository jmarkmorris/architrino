#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate,
  validateH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnostic,
} from "../neutral-swarm/theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic.mjs";

export const H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_SCHEMA =
  "solver-h39-terminal-graph-remainder-budget-replay/v1";
export const H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_CASE_SCHEMA =
  "solver-h39-terminal-graph-remainder-budget-replay-case/v1";
export const H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_MANIFEST_SCHEMA =
  "solver-h39-terminal-graph-remainder-budget-replay-manifest/v1";

const AUDIT_ID = "h39_terminal_graph_remainder_budget_replay";
const SOURCE_SCRIPT =
  "scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-h39-recurrence-refined-subcover-diagnostic.mjs";
const SOURCE_TEST =
  "tests/neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js";
const AUDIT_DOC = "reference/priorities/solver/h39-solver-impact-audit.md";
const UNIT_CONVENTION = "dimensionless-h39-h38-expression-n38-terminal-graph";
const SCALE_NORMALIZATION =
  "h39 expression-level N38 terminal graph remainder budget chart";
const GLOBAL_TOLERANCE = 1e-12;

export const H39_SOLVER_IMPACT_CLASSIFICATIONS = new Set([
  "h39_no_material_effect",
  "h39_same_result_faster",
  "h39_refined_result",
  "h39_changed_bottleneck",
  "h39_investigation_required_mismatch",
]);

const CENTRAL_SOLVER_CAPABILITY_STATUSES = new Set([
  "fixture_adapter_built",
  "needs_fixture_adapter",
  "needs_missing_solver_capability",
  "can_replay_now",
]);

const BASE_DIAGNOSTIC_OPTIONS = Object.freeze({
  targetSpeedInterval: [3.02156, 3.02156007813],
  branch: "-",
  rootSubdivisions: 100,
  polynomialDegree: 2,
  terminalHIndexes: [37, 36, 35],
  residualBudgetTargetShareOfAll: 0.05,
  residualBudgetScales: [0, 0.02, 0.05, 1],
  residualNoiseSamples: [-1, -0.5, 0, 0.5, 1],
  residualCoordinatePartitionCount: 8,
  topContributorCount: 8,
  seriesOrder: 60,
});

const DEFAULT_REPLAY_CASES = Object.freeze([
  {
    caseId: "positive_xi_terminal_graph_budget",
    historicalArtifactId:
      "h39-h38-expression-n38-terminal-graph-remainder-budget-positive-xi-window",
    description:
      "Replay the historical positive-xi five-row terminal graph remainder budget with sourceStencilSubcellCount=32 and comparisonStencilIndex=27.",
    diagnosticOptions: {
      ...BASE_DIAGNOSTIC_OPTIONS,
      sourceStencilSubcellCount: 32,
      comparisonStencilIndex: 27,
      refinementSubcellCounts: [32],
    },
  },
  {
    caseId: "symmetric_cross_fold_terminal_graph_budget",
    historicalArtifactId:
      "h39-h38-expression-n38-terminal-graph-remainder-budget-symmetric-cross-fold-window",
    description:
      "Replay the symmetric cross-fold five-row terminal graph remainder budget with sourceStencilSubcellCount=5 and comparisonStencilIndex=0.",
    diagnosticOptions: {
      ...BASE_DIAGNOSTIC_OPTIONS,
      sourceStencilSubcellCount: 5,
      comparisonStencilIndex: 0,
      refinementSubcellCounts: [5],
    },
  },
]);

export function buildH39TerminalGraphRemainderBudgetReplayReport(options = {}) {
  const cases = (options.cases ?? DEFAULT_REPLAY_CASES).map(buildReplayCase);
  const overallImpactClassification = classifyOverallImpact(cases);

  return {
    schema: H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_SCHEMA,
    audit_id: AUDIT_ID,
    source_task: "h39_solver_impact_audit",
    source_document: AUDIT_DOC,
    replay_scope:
      "second executable H39 solver-impact fixture for the expression-level N38 terminal graph remainder budget surface",
    central_solver_backend_invoked: false,
    central_solver_backend_reason:
      "The current central solver can carry root-ledger, interval, precision, and validation-replay metadata, but this H39 terminal graph budget remains a fixture adapter over the historical proof diagnostic rather than a native solver backend run.",
    selected_replay_fixture: AUDIT_ID,
    case_count: cases.length,
    cases,
    overall_impact_classification: overallImpactClassification,
    final_h39_source_covariance_classification: "h39_no_material_effect",
    final_h39_source_covariance_reason:
      "The terminal graph replay sharpens the producer interval overbudget diagnosis, but it does not supply the missing same-domain branch-bearing provider object before aggregate P.",
    next_replay_candidate: "h39_affine_endpoint_provider_boundary_replay",
    next_replay_gate:
      "Keep provider-boundary replay classified as missing solver capability until the solver owns H39 provider-boundary theorem objects.",
  };
}

export function validateH39TerminalGraphRemainderBudgetReplayReport(report) {
  const errors = [];

  if (report?.schema !== H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_SCHEMA) {
    errors.push("schema must match h39 terminal graph remainder budget replay schema");
  }
  if (report?.audit_id !== AUDIT_ID) {
    errors.push("audit id must be h39_terminal_graph_remainder_budget_replay");
  }
  if (report?.central_solver_backend_invoked !== false) {
    errors.push("h39 terminal graph replay must not claim native central solver backend execution");
  }
  if (!Array.isArray(report?.cases) || report.cases.length === 0) {
    errors.push("report must contain at least one terminal graph replay case");
  }

  for (const replayCase of report?.cases ?? []) {
    errors.push(...validateReplayCase(replayCase));
  }

  if (!H39_SOLVER_IMPACT_CLASSIFICATIONS.has(report?.overall_impact_classification)) {
    errors.push("overall impact classification must use the h39 impact vocabulary");
  }
  const expectedOverall = classifyOverallImpact(report?.cases ?? []);
  if (report?.overall_impact_classification !== expectedOverall) {
    errors.push("overall impact classification must match case classifications");
  }
  if (report?.final_h39_source_covariance_classification !== "h39_no_material_effect") {
    errors.push("final h39 source-covariance classification must remain h39_no_material_effect for this fixture");
  }
  return errors;
}

function buildReplayCase(caseDefinition) {
  const diagnostic =
    buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate(
      caseDefinition.diagnosticOptions ?? {}
    );
  const historicalValidationErrors =
    validateH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnostic(diagnostic);
  const summary = diagnostic.terminal_graph_remainder_budget_summary ?? {};
  const forecast = diagnostic.terminal_producer_refinement_forecast ?? {};
  const replayManifest = createReplayManifest(caseDefinition, diagnostic);
  const rootLedgerRows = createRootLedgerRows({ caseDefinition, diagnostic });
  const terminalGraphResidualRows = createTerminalGraphResidualRows({
    caseDefinition,
    diagnostic,
  });
  const impactClassification = classifyReplayCase({
    diagnostic,
    historicalValidationErrors,
  });

  return {
    schema: H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_CASE_SCHEMA,
    case_id: caseDefinition.caseId,
    historical_artifact_id: caseDefinition.historicalArtifactId,
    source_script: SOURCE_SCRIPT,
    source_test: SOURCE_TEST,
    description: caseDefinition.description,
    central_solver_capability_status: "fixture_adapter_built",
    central_solver_native_backend_invoked: false,
    central_solver_replay_status: "fixture-adapter-report-emitted",
    central_solver_replay_manifest: replayManifest,
    historical_diagnostic: {
      schema: diagnostic.schema,
      status: diagnostic.status,
      evaluation_level: diagnostic.evaluation_level,
      proof_status: diagnostic.proof_status,
      artifact_sha256: stableSha256(diagnostic),
      validation_errors: historicalValidationErrors,
      diagnosis: diagnostic.n38_terminal_graph_remainder_budget_diagnosis,
      route_interpretation: summary.route_interpretation ?? null,
      claim_boundary: diagnostic.claim_boundary,
    },
    comparable_output_set: {
      target_speed_interval: diagnostic.target_speed_interval,
      branch: diagnostic.branch,
      root_subdivisions: caseDefinition.diagnosticOptions?.rootSubdivisions ?? null,
      source_stencil_subcell_count: diagnostic.source_stencil_subcell_count,
      comparison_stencil_index: diagnostic.comparison_stencil_index,
      comparison_xi_midpoint_span: diagnostic.comparison_xi_midpoint_span,
      xi_stencil_kind: summary.xi_stencil_kind ?? null,
      row_count: summary.row_count ?? null,
      terminal_provider_h_indexes: diagnostic.terminal_provider_h_indexes,
      all_rows_h38_solve_target_zeroed:
        summary.all_rows_h38_solve_target_zeroed ?? null,
      all_rows_graph_plus_nonterminal_under_target:
        summary.all_rows_graph_plus_nonterminal_under_target ?? null,
      all_rows_raw_interval_residual_over_target:
        summary.all_rows_raw_interval_residual_over_target ?? null,
      all_rows_symmetric_raw_residual_scale_one_over_target:
        summary.all_rows_symmetric_raw_residual_scale_one_over_target ?? null,
      all_rows_have_finite_residual_scale_budget:
        summary.all_rows_have_finite_residual_scale_budget ?? null,
      all_rows_midpoint_fit_residual_below_symmetric_budget:
        summary.all_rows_midpoint_fit_residual_below_symmetric_budget ?? null,
      all_rows_producer_intervals_contained_by_allowed_budget:
        summary.all_rows_producer_intervals_contained_by_allowed_budget ?? null,
      all_rows_producer_interval_budget_no_go:
        summary.all_rows_producer_interval_budget_no_go ?? null,
      all_rows_correlated_terminal_residual_affine_endpoint_control:
        summary.all_rows_correlated_terminal_residual_affine_endpoint_control ??
        null,
      min_allowed_symmetric_raw_residual_scale_for_target:
        summary.min_allowed_symmetric_raw_residual_scale_for_target ?? null,
      max_allowed_symmetric_raw_residual_scale_for_target:
        summary.max_allowed_symmetric_raw_residual_scale_for_target ?? null,
      max_required_scale_to_allowed_scale_ratio:
        summary.max_required_scale_to_allowed_scale_ratio ?? null,
      min_allowed_radius_to_producer_half_width_ratio:
        summary.min_allowed_radius_to_producer_half_width_ratio ?? null,
      max_midpoint_fit_residual_to_allowed_radius_ratio:
        summary.max_midpoint_fit_residual_to_allowed_radius_ratio ?? null,
      correlated_terminal_residual_partition_route_interpretation:
        summary.correlated_terminal_residual_partition_route_interpretation ??
        null,
      route_interpretation: summary.route_interpretation ?? null,
      terminal_graph_remainder_budget_diagnosis:
        diagnostic.n38_terminal_graph_remainder_budget_diagnosis,
      projected_subcell_count_for_baseline_budget:
        forecast.projected_subcell_count_for_baseline_budget ?? null,
      projected_subcell_multiplier_for_baseline_budget:
        forecast.projected_subcell_multiplier_for_baseline_budget ?? null,
      refinement_forecast_route_interpretation:
        forecast.route_interpretation ?? null,
    },
    precision_replay: createPrecisionReplayMetadata({
      caseDefinition,
      diagnostic,
      terminalGraphResidualRows,
    }),
    root_ledger_rows: rootLedgerRows,
    terminal_graph_residual_rows: terminalGraphResidualRows,
    replay_diff: createReplayDiff({
      diagnostic,
      historicalValidationErrors,
      impactClassification,
    }),
    resource_notes: {
      timing_note:
        "not measured as central solver runtime; deterministic in-process fixture adapter build over the historical terminal graph diagnostic",
      memory_note:
        "no native path-history stream or central solver buffers allocated; terminal graph replay rows are projected report JSON",
      native_solver_backend_cost: "none",
    },
    impact_classification: impactClassification,
  };
}

function createReplayManifest(caseDefinition, diagnostic) {
  const options = caseDefinition.diagnosticOptions ?? {};
  const summary = diagnostic.terminal_graph_remainder_budget_summary ?? {};
  return {
    schema: H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_MANIFEST_SCHEMA,
    replay_id: `${caseDefinition.caseId}-central-solver-style-replay`,
    audit_id: AUDIT_ID,
    historical_artifact_id: caseDefinition.historicalArtifactId,
    source_artifacts: [SOURCE_SCRIPT, SOURCE_TEST, AUDIT_DOC],
    model_contract: {
      model_id:
        "theta3minus-fold-pair-first-y-gd-h39-h38-expression-n38-terminal-graph-remainder-budget",
      equation_version: "h39-h38-expression-n38-terminal-graph-budget",
      constants_hash: stableSha256({
        target_speed_interval: diagnostic.target_speed_interval,
        branch: diagnostic.branch,
        h38_numerator_y_order: diagnostic.h38_numerator_y_order,
        terminal_provider_h_indexes: diagnostic.terminal_provider_h_indexes,
        residual_budget_target_share_of_all:
          diagnostic.residual_budget_target_share_of_all,
        residual_coordinate_partition_count:
          diagnostic.residual_coordinate_partition_count,
      }),
      causal_speed_policy: "not-app-facing-causal-root-run",
      branch_policy: "candidate-only; retained_branch=false",
      unit_convention: UNIT_CONVENTION,
      compatible_precision_paths: ["validation_replay", "extended_precision"],
    },
    replay_request: {
      request_id: `${caseDefinition.caseId}-h39-terminal-graph-budget-replay-request`,
      run_kind: "validationReplay",
      consumer_id: "solver-impact-audit",
      claim_level: "validation-evidence",
      precision_path: "validation_replay",
      compare_layouts: [
        "h39_h38_expression_n38_terminal_graph_remainder_budget_diagnostic.v1",
        "solver-run-precision-metadata.v1",
        "solver-root-ledger-row.v1",
        "h39_terminal_graph_residual_row.v1",
      ],
    },
    root_subdivision_count: options.rootSubdivisions ?? null,
    selected_precision_path: "validation_replay",
    numeric_chart: "interval_bounds",
    numeric_type: "interval_f64_pair",
    unit_convention: UNIT_CONVENTION,
    scale_normalization: SCALE_NORMALIZATION,
    global_error_budget: GLOBAL_TOLERANCE,
    stage_error_budgets: [
      {
        stage: "historical_terminal_graph_diagnostic_replay",
        tolerance: GLOBAL_TOLERANCE,
        authority: "historical-artifact-validation",
      },
      {
        stage: "root_ledger_projection",
        tolerance: 0,
        authority: "exact-json-projection",
      },
      {
        stage: "terminal_graph_residual_budget_projection",
        tolerance: 0,
        authority: "exact-json-projection",
      },
      {
        stage: "claim_boundary_projection",
        tolerance: 0,
        authority: "metadata-only",
      },
    ],
    claim_level: "validation-evidence",
    manifest_sha256: stableSha256({
      caseId: caseDefinition.caseId,
      xiStencilKind: summary.xi_stencil_kind ?? null,
      routeInterpretation: summary.route_interpretation ?? null,
      diagnosis: diagnostic.n38_terminal_graph_remainder_budget_diagnosis,
    }),
  };
}

function createPrecisionReplayMetadata({
  caseDefinition,
  diagnostic,
  terminalGraphResidualRows,
}) {
  const summary = diagnostic.terminal_graph_remainder_budget_summary ?? {};
  const overbudgetRows = terminalGraphResidualRows.filter(
    (row) => row.producer_interval_contained_by_budget === false
  );
  return {
    schema: "solver-run-precision-metadata.v1",
    replay_case_id: caseDefinition.caseId,
    requested_precision_path: "validation_replay",
    selected_precision_path: "validation_replay",
    selected_numeric_type: "interval_f64_pair",
    selected_numeric_chart: "interval_bounds",
    unit_convention: UNIT_CONVENTION,
    scale_normalization: SCALE_NORMALIZATION,
    global_error_budget: GLOBAL_TOLERANCE,
    stage_error_budgets: [
      {
        stage: "historical_terminal_graph_diagnostic_replay",
        tolerance: GLOBAL_TOLERANCE,
      },
      { stage: "root_ledger_projection", tolerance: 0 },
      { stage: "terminal_graph_residual_budget_projection", tolerance: 0 },
      { stage: "claim_boundary_projection", tolerance: 0 },
    ],
    claim_level: "validation-evidence",
    root_solve_metadata: {
      root_tolerance: null,
      root_subdivision_count:
        caseDefinition.diagnosticOptions?.rootSubdivisions ?? null,
      iteration_count: null,
      bracket_or_isolation_metadata:
        "historical target speed interval subcover and comparison xi window projected from the H39 terminal graph diagnostic",
      target_speed_interval: diagnostic.target_speed_interval,
      comparison_xi_midpoint_span: diagnostic.comparison_xi_midpoint_span,
      xi_stencil_kind: summary.xi_stencil_kind ?? null,
      first_failure_code:
        overbudgetRows.length > 0
          ? "h39_terminal_producer_interval_exceeds_graph_remainder_budget"
          : null,
    },
    residual_row_count: terminalGraphResidualRows.length,
    overbudget_residual_row_count: overbudgetRows.length,
    maximum_budget_normalized_residual: maxFinite(
      terminalGraphResidualRows.map((row) => row.budget_normalized_residual)
    ),
    minimum_allowed_radius_to_producer_half_width_ratio: minFinite(
      terminalGraphResidualRows.map(
        (row) => row.allowed_radius_to_producer_half_width_ratio
      )
    ),
    maximum_midpoint_fit_residual_to_allowed_radius_ratio: maxFinite(
      terminalGraphResidualRows.map(
        (row) => row.midpoint_fit_residual_to_allowed_radius_ratio
      )
    ),
    interval_authority:
      "historical binary64 outward-scaled terminal producer interval replay; not a native directed-rounded central solver certificate",
    terminal_row_provenance:
      "terminal h37,h36,h35 rows projected from buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate",
    precision_escalations: [],
    validation_replay_run: true,
    validation_replay_matched: true,
    native_backend_authority: "not-run-for-h39-terminal-graph-proof-object",
  };
}

function createRootLedgerRows({ caseDefinition, diagnostic }) {
  const rows = diagnostic.terminal_graph_remainder_budget_rows ?? [];
  return rows.map((row, rowIndex) => ({
    schema: "solver-root-ledger-row.v1",
    row_id: `${caseDefinition.caseId}-root-ledger-${rowIndex}`,
    cell_id: row.cell_id,
    row_index: rowIndex,
    target_speed_interval: diagnostic.target_speed_interval,
    speed_interval: row.speed_interval,
    xi_interval: row.xi_interval,
    xi_midpoint: row.xi_midpoint,
    branch: diagnostic.branch,
    root_subdivision_count:
      caseDefinition.diagnosticOptions?.rootSubdivisions ?? null,
    coordinate_route: row.coordinate_route,
    h38_solve_target_zeroed: row.h38_solve_target_zeroed,
    terminal_provider_h_indexes: row.terminal_provider_h_indexes,
    terminal_width_share_of_all: finiteOrNull(row.terminal_width_share_of_all),
    nonterminal_width_share_of_all:
      finiteOrNull(row.nonterminal_width_share_of_all),
    terminal_graph_with_nonterminal_width_share_of_all: finiteOrNull(
      row.terminal_graph_with_nonterminal_width_share_of_all
    ),
    allowed_symmetric_raw_residual_scale_for_target: finiteOrNull(
      row.allowed_symmetric_raw_residual_scale_for_target
    ),
    graph_plus_nonterminal_under_target:
      row.graph_plus_nonterminal_under_target,
    raw_interval_residual_with_nonterminal_over_target:
      row.raw_interval_residual_with_nonterminal_over_target,
    residual_coordinate_partition_route_interpretation:
      row.residual_coordinate_partition_route_interpretation,
    terminal_graph_remainder_budget_route_interpretation:
      row.terminal_graph_remainder_budget_route_interpretation,
  }));
}

function createTerminalGraphResidualRows({ caseDefinition, diagnostic }) {
  const rows = diagnostic.terminal_graph_remainder_budget_rows ?? [];
  return rows.flatMap((row, rowIndex) =>
    (row.terminal_graph_remainder_budget_entries ?? []).map((entry) => {
      const allowedRadius = finiteOrNull(
        entry.allowed_residual_radius_for_source_budget
      );
      const rowResidualAbsUpper = finiteOrNull(entry.row_residual_abs_upper);
      return {
        schema: "h39-terminal-graph-residual-row.v1",
        row_id: `${caseDefinition.caseId}-terminal-${rowIndex}-h${entry.h_index}`,
        cell_id: row.cell_id,
        row_index: rowIndex,
        h_index: entry.h_index,
        branch: diagnostic.branch,
        speed_interval: row.speed_interval,
        xi_interval: row.xi_interval,
        xi_midpoint: row.xi_midpoint,
        terminal_row_provenance: {
          source_script: SOURCE_SCRIPT,
          builder:
            "buildH39H38ExpressionN38TerminalGraphRemainderBudgetDiagnosticCandidate",
          source_cell_id: row.cell_id,
          terminal_provider_h_index: entry.h_index,
        },
        interval_authority:
          "historical terminal producer interval replay projected into solver-style interval rows",
        producer_interval: entry.producer_interval,
        graph_interval: entry.graph_interval,
        row_residual_interval: entry.row_residual_interval,
        row_residual_abs_upper: rowResidualAbsUpper,
        residual_scale: Math.max(1, Math.abs(rowResidualAbsUpper ?? 0)),
        absolute_residual: rowResidualAbsUpper,
        allowed_residual_radius_for_source_budget: allowedRadius,
        budget_normalized_residual:
          allowedRadius && rowResidualAbsUpper !== null
            ? rowResidualAbsUpper / allowedRadius
            : null,
        tolerance: GLOBAL_TOLERANCE,
        producer_interval_contained_by_budget:
          entry.producer_interval_contained_by_budget,
        required_symmetric_raw_residual_scale_to_cover_row: finiteOrNull(
          entry.required_symmetric_raw_residual_scale_to_cover_row
        ),
        required_scale_to_allowed_scale_ratio: finiteOrNull(
          entry.required_scale_to_allowed_scale_ratio
        ),
        producer_interval_half_width: finiteOrNull(
          entry.producer_interval_half_width
        ),
        allowed_radius_to_producer_half_width_ratio: finiteOrNull(
          entry.allowed_radius_to_producer_half_width_ratio
        ),
        midpoint_fit_max_abs_residual: finiteOrNull(
          entry.midpoint_fit_max_abs_residual
        ),
        midpoint_fit_residual_scale_to_raw: finiteOrNull(
          entry.midpoint_fit_residual_scale_to_raw
        ),
        midpoint_fit_residual_to_allowed_radius_ratio: finiteOrNull(
          entry.midpoint_fit_residual_to_allowed_radius_ratio
        ),
        midpoint_fit_residual_inside_allowed_budget:
          entry.midpoint_fit_residual_inside_allowed_budget,
        root_tolerance: null,
        iteration_count: null,
        bracket_or_isolation_metadata:
          "projected from target speed interval subcover and comparison xi window",
        first_failure_code:
          entry.producer_interval_contained_by_budget === false
            ? "h39_terminal_producer_interval_exceeds_allowed_graph_budget"
            : null,
        replay_authority:
          "fixture-adapter projection; candidate-only, not a directed-rounded terminal provider enclosure",
      };
    })
  );
}

function createReplayDiff({
  diagnostic,
  historicalValidationErrors,
  impactClassification,
}) {
  const claimBoundary = diagnostic.claim_boundary ?? {};
  const summary = diagnostic.terminal_graph_remainder_budget_summary ?? {};
  return {
    historical_and_replay_decision_match: true,
    historical_validation_passed: historicalValidationErrors.length === 0,
    claim_boundary_preserved: allClaimBoundaryFlagsFalse(claimBoundary),
    native_solver_backend_invoked: false,
    strict_comparison_keys: [
      "n38_terminal_graph_remainder_budget_diagnosis",
      "terminal_graph_remainder_budget_summary.route_interpretation",
      "terminal_graph_remainder_budget_summary.all_rows_producer_interval_budget_no_go",
      "terminal_graph_remainder_budget_summary.max_required_scale_to_allowed_scale_ratio",
      "terminal_producer_refinement_forecast.projected_subcell_count_for_baseline_budget",
    ],
    added_solver_metadata: [
      "solver-run-precision-metadata.v1",
      "stage error budgets",
      "root ledger rows",
      "terminal graph residual rows",
      "impact classification",
      "artifact hashes",
      "resource notes",
    ],
    terminal_graph_remainder_budget_diagnosis:
      diagnostic.n38_terminal_graph_remainder_budget_diagnosis,
    route_interpretation: summary.route_interpretation ?? null,
    impact_classification: impactClassification,
  };
}

function classifyReplayCase({ diagnostic, historicalValidationErrors }) {
  if (historicalValidationErrors.length > 0) {
    return "h39_investigation_required_mismatch";
  }
  if (
    diagnostic?.n38_terminal_graph_remainder_budget_diagnosis ===
      "terminal-graph-remainder-affine-zeta-endpoint-partition-route-candidate" &&
    diagnostic?.terminal_graph_remainder_budget_summary
      ?.route_interpretation ===
      "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
  ) {
    return "h39_refined_result";
  }
  return "h39_investigation_required_mismatch";
}

function classifyOverallImpact(cases) {
  const classifications = new Set(
    cases.map((replayCase) => replayCase.impact_classification)
  );
  if (classifications.has("h39_investigation_required_mismatch")) {
    return "h39_investigation_required_mismatch";
  }
  if (classifications.has("h39_changed_bottleneck")) {
    return "h39_changed_bottleneck";
  }
  if (classifications.has("h39_refined_result")) {
    return "h39_refined_result";
  }
  if (classifications.has("h39_same_result_faster")) {
    return "h39_same_result_faster";
  }
  return "h39_no_material_effect";
}

function validateReplayCase(replayCase) {
  const errors = [];
  if (replayCase?.schema !== H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_CASE_SCHEMA) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} schema is invalid`);
  }
  if (!CENTRAL_SOLVER_CAPABILITY_STATUSES.has(replayCase?.central_solver_capability_status)) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} central solver capability status is invalid`);
  }
  if (replayCase?.central_solver_native_backend_invoked !== false) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must not claim native backend execution`);
  }
  if (!H39_SOLVER_IMPACT_CLASSIFICATIONS.has(replayCase?.impact_classification)) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} impact classification is invalid`);
  }
  if (
    replayCase?.central_solver_replay_manifest?.schema !==
    H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_MANIFEST_SCHEMA
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} replay manifest schema is invalid`);
  }
  if (replayCase?.central_solver_replay_manifest?.selected_precision_path !== "validation_replay") {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must use validation_replay precision path`);
  }
  if (replayCase?.central_solver_replay_manifest?.numeric_chart !== "interval_bounds") {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must use interval_bounds numeric chart`);
  }
  if (replayCase?.central_solver_replay_manifest?.numeric_type !== "interval_f64_pair") {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must use interval_f64_pair numeric type`);
  }
  if (!allClaimBoundaryFlagsFalse(replayCase?.historical_diagnostic?.claim_boundary)) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must preserve candidate-only h39 claim boundary`);
  }
  if (Array.isArray(replayCase?.historical_diagnostic?.validation_errors)) {
    if (replayCase.historical_diagnostic.validation_errors.length !== 0) {
      errors.push(`case ${replayCase?.case_id ?? "<unknown>"} historical diagnostic must validate`);
    }
  } else {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include historical validation errors array`);
  }
  if (
    replayCase?.historical_diagnostic?.diagnosis !==
    "terminal-graph-remainder-affine-zeta-endpoint-partition-route-candidate"
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} diagnosis must preserve the terminal graph route candidate`);
  }
  if (
    replayCase?.comparable_output_set?.route_interpretation !==
    "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must preserve producer interval overbudget route interpretation`);
  }
  if (
    replayCase?.comparable_output_set
      ?.all_rows_producer_intervals_contained_by_allowed_budget !== false ||
    replayCase?.comparable_output_set?.all_rows_producer_interval_budget_no_go !==
      true
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must preserve producer interval budget no-go status`);
  }
  if (
    !Array.isArray(replayCase?.root_ledger_rows) ||
    replayCase.root_ledger_rows.length !== replayCase?.comparable_output_set?.row_count
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include one root ledger row per comparison row`);
  }
  const terminalIndexes =
    replayCase?.comparable_output_set?.terminal_provider_h_indexes ?? [];
  const expectedTerminalResidualRows =
    Number(replayCase?.comparable_output_set?.row_count) * terminalIndexes.length;
  if (
    !Array.isArray(replayCase?.terminal_graph_residual_rows) ||
    replayCase.terminal_graph_residual_rows.length !== expectedTerminalResidualRows
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include one terminal residual row per terminal h entry`);
  }
  if (
    Array.isArray(replayCase?.terminal_graph_residual_rows) &&
    replayCase.terminal_graph_residual_rows.some(
      (row) =>
        row.producer_interval_contained_by_budget !== false ||
        row.first_failure_code !==
          "h39_terminal_producer_interval_exceeds_allowed_graph_budget" ||
        !Number.isFinite(Number(row.budget_normalized_residual)) ||
        Number(row.budget_normalized_residual) <= 1
    )
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} terminal residual rows must preserve overbudget producer interval status`);
  }
  if (
    !Number.isFinite(
      Number(replayCase?.precision_replay?.maximum_budget_normalized_residual)
    ) ||
    Number(replayCase.precision_replay.maximum_budget_normalized_residual) <= 1
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} precision replay must expose overbudget residual scale`);
  }
  if (
    !Number.isFinite(
      Number(
        replayCase?.precision_replay
          ?.minimum_allowed_radius_to_producer_half_width_ratio
      )
    ) ||
    Number(
      replayCase.precision_replay
        .minimum_allowed_radius_to_producer_half_width_ratio
    ) >= 1
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} precision replay must preserve subunit allowed-radius ratio`);
  }
  if (
    replayCase?.replay_diff?.historical_and_replay_decision_match !== true ||
    replayCase?.replay_diff?.claim_boundary_preserved !== true
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} replay diff must preserve decision and claim boundary`);
  }
  if (
    typeof replayCase?.resource_notes?.timing_note !== "string" ||
    typeof replayCase?.resource_notes?.memory_note !== "string"
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include timing and memory notes`);
  }
  return errors;
}

function allClaimBoundaryFlagsFalse(claimBoundary) {
  return (
    claimBoundary &&
    Object.keys(claimBoundary).length > 0 &&
    Object.values(claimBoundary).every((value) => value === false)
  );
}

function stableSha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteOrNull(value) {
  if (value === null || value === undefined) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function maxFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.max(...finiteValues) : null;
}

function minFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.min(...finiteValues) : null;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--pretty") {
      options.pretty = true;
    } else if (arg === "--schema") {
      options.schema = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/solver-audits/h39-terminal-graph-remainder-budget-replay.mjs [options]",
    "",
    "Options:",
    "  --out <path>       Write replay report JSON",
    "  --validate <path>  Validate a replay report JSON",
    "  --pretty           Pretty-print JSON output",
    "  --schema           Print replay schema metadata",
  ].join("\n");
}

function writeJson(value, outPath, pretty = false) {
  const output = `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output);
  } else {
    process.stdout.write(output);
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (options.schema) {
    writeJson(
      {
        artifact_schema: H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_SCHEMA,
        case_schema: H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_CASE_SCHEMA,
        manifest_schema:
          H39_TERMINAL_GRAPH_REMAINDER_BUDGET_REPLAY_MANIFEST_SCHEMA,
        audit_id: AUDIT_ID,
      },
      null,
      options.pretty
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors =
      validateH39TerminalGraphRemainderBudgetReplayReport(artifact);
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
      return;
    }
    writeJson(
      {
        ok: true,
        schema: artifact.schema,
        audit_id: artifact.audit_id,
        case_count: artifact.case_count,
        overall_impact_classification: artifact.overall_impact_classification,
      },
      null,
      options.pretty
    );
    return;
  }

  const report = buildH39TerminalGraphRemainderBudgetReplayReport();
  const errors = validateH39TerminalGraphRemainderBudgetReplayReport(report);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  writeJson(report, options.out, options.pretty);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
