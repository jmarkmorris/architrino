import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  buildH39TerminalGraphRemainderBudgetReplayReport,
  validateH39TerminalGraphRemainderBudgetReplayReport,
} from "../scripts/solver-audits/h39-terminal-graph-remainder-budget-replay.mjs";

let cachedReport = null;

function report() {
  cachedReport ??= buildH39TerminalGraphRemainderBudgetReplayReport();
  return cachedReport;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readAuditDoc() {
  return fs.readFileSync(
    new URL(
      "../reference/priorities/app-solver/h39-solver-impact-audit.md",
      import.meta.url
    ),
    "utf8"
  );
}

test("h39 terminal graph remainder budget replay report validates the second solver-impact fixture", () => {
  const artifact = report();

  assert.deepEqual(
    validateH39TerminalGraphRemainderBudgetReplayReport(artifact),
    []
  );
  assert.equal(
    artifact.schema,
    "solver-h39-terminal-graph-remainder-budget-replay/v1"
  );
  assert.equal(artifact.audit_id, "h39_terminal_graph_remainder_budget_replay");
  assert.equal(artifact.central_solver_backend_invoked, false);
  assert.equal(artifact.case_count, 2);
  assert.equal(artifact.overall_impact_classification, "h39_refined_result");
  assert.equal(
    artifact.final_h39_source_covariance_classification,
    "h39_no_material_effect"
  );
  assert.equal(
    artifact.next_replay_candidate,
    "h39_affine_endpoint_provider_boundary_replay"
  );
  assert.equal(
    artifact.next_replay_gate,
    "Hold `h39_affine_endpoint_provider_boundary_replay` at missing-capability status and use the executable retained-record preimage fixture as the fail-closed target for any future accepted `P_-` / `P_+` provider-object branch producer."
  );
});

test("h39 provider-boundary replay remains missing-capability gated", () => {
  const auditDoc = readAuditDoc();

  assert.match(
    auditDoc,
    /\| `h39_affine_endpoint_provider_boundary_replay` \|[^|\n]+\|[^|\n]+\| `needs_missing_solver_capability`\. The central solver does not currently expose H39 provider-boundary theorem objects\. \|/
  );
  assert.match(
    auditDoc,
    /\| Next audit action \| Hold `h39_affine_endpoint_provider_boundary_replay` at missing-capability status and use the executable retained-record preimage fixture as the fail-closed target for any future accepted `P_-` \/ `P_\+` provider-object branch producer\. \|/
  );
});

test("h39 terminal graph replay preserves historical budget decisions and adds solver metadata", () => {
  const cases = new Map(report().cases.map((entry) => [entry.case_id, entry]));
  const positiveXi = cases.get("positive_xi_terminal_graph_budget");
  const symmetric = cases.get("symmetric_cross_fold_terminal_graph_budget");

  assert.equal(positiveXi.impact_classification, "h39_refined_result");
  assert.equal(symmetric.impact_classification, "h39_refined_result");

  for (const replayCase of [positiveXi, symmetric]) {
    assert.equal(replayCase.central_solver_capability_status, "fixture_adapter_built");
    assert.equal(replayCase.central_solver_native_backend_invoked, false);
    assert.equal(
      replayCase.central_solver_replay_manifest.selected_precision_path,
      "validation_replay"
    );
    assert.equal(
      replayCase.central_solver_replay_manifest.numeric_type,
      "interval_f64_pair"
    );
    assert.equal(replayCase.historical_diagnostic.validation_errors.length, 0);
    assert.equal(
      replayCase.historical_diagnostic.diagnosis,
      "terminal-graph-remainder-affine-zeta-endpoint-partition-route-candidate"
    );
    assert.equal(
      replayCase.comparable_output_set.route_interpretation,
      "terminal-graph-remainder-budget-localizes-enclosure-failure-to-producer-interval-width"
    );
    assert.equal(
      replayCase.comparable_output_set
        .all_rows_graph_plus_nonterminal_under_target,
      true
    );
    assert.equal(
      replayCase.comparable_output_set
        .all_rows_producer_intervals_contained_by_allowed_budget,
      false
    );
    assert.equal(
      replayCase.comparable_output_set.all_rows_producer_interval_budget_no_go,
      true
    );
    assert.equal(replayCase.root_ledger_rows.length, 5);
    assert.equal(replayCase.terminal_graph_residual_rows.length, 15);
    assert.equal(replayCase.precision_replay.overbudget_residual_row_count, 15);
    assert.ok(
      replayCase.precision_replay.maximum_budget_normalized_residual > 40
    );
    assert.ok(
      replayCase.precision_replay.maximum_budget_normalized_residual < 50
    );
    assert.ok(
      replayCase.precision_replay
        .minimum_allowed_radius_to_producer_half_width_ratio > 0.02
    );
    assert.ok(
      replayCase.precision_replay
        .minimum_allowed_radius_to_producer_half_width_ratio < 0.03
    );
    assert.ok(
      replayCase.terminal_graph_residual_rows.every(
        (row) =>
          row.producer_interval_contained_by_budget === false &&
          row.first_failure_code ===
            "h39_terminal_producer_interval_exceeds_allowed_graph_budget" &&
          row.budget_normalized_residual > 40 &&
          row.budget_normalized_residual < 50 &&
          row.midpoint_fit_residual_inside_allowed_budget === true
      )
    );
    assert.equal(replayCase.replay_diff.claim_boundary_preserved, true);
    assert.match(replayCase.resource_notes.timing_note, /fixture adapter/);
    assert.match(replayCase.resource_notes.memory_note, /report JSON/);
  }

  assert.equal(positiveXi.comparable_output_set.xi_stencil_kind, "positive-xi");
  assert.equal(
    positiveXi.comparable_output_set.source_stencil_subcell_count,
    32
  );
  assert.equal(positiveXi.comparable_output_set.comparison_stencil_index, 27);
  assert.equal(
    positiveXi.comparable_output_set.projected_subcell_count_for_baseline_budget,
    1453
  );
  assert.ok(
    positiveXi.comparable_output_set
      .projected_subcell_multiplier_for_baseline_budget > 45
  );
  assert.ok(
    positiveXi.comparable_output_set
      .projected_subcell_multiplier_for_baseline_budget < 46
  );

  assert.equal(
    symmetric.comparable_output_set.xi_stencil_kind,
    "symmetric-cross-fold"
  );
  assert.equal(symmetric.comparable_output_set.source_stencil_subcell_count, 5);
  assert.equal(symmetric.comparable_output_set.comparison_stencil_index, 0);
  assert.deepEqual(symmetric.comparable_output_set.comparison_xi_midpoint_span, [
    -1.5998976065444506,
    1.5998976065444506,
  ]);
  assert.equal(
    symmetric.comparable_output_set.projected_subcell_count_for_baseline_budget,
    227
  );
});

test("h39 terminal graph replay validator rejects backend and claim overclaims", () => {
  const artifact = report();
  const changedFinal = clone(artifact);
  changedFinal.final_h39_source_covariance_classification = "h39_refined_result";

  assert.ok(
    validateH39TerminalGraphRemainderBudgetReplayReport(changedFinal).includes(
      "final h39 source-covariance classification must remain h39_no_material_effect for this fixture"
    )
  );

  const changedBackend = clone(artifact);
  changedBackend.central_solver_backend_invoked = true;

  assert.ok(
    validateH39TerminalGraphRemainderBudgetReplayReport(changedBackend).includes(
      "h39 terminal graph replay must not claim native central solver backend execution"
    )
  );

  const changedBoundary = clone(artifact);
  changedBoundary.cases[0].historical_diagnostic.claim_boundary.certifies_terminal_graph_remainder_bound =
    true;

  assert.ok(
    validateH39TerminalGraphRemainderBudgetReplayReport(changedBoundary).some(
      (error) => error.includes("must preserve candidate-only h39 claim boundary")
    )
  );

  const changedResidual = clone(artifact);
  changedResidual.cases[0].terminal_graph_residual_rows[0].producer_interval_contained_by_budget =
    true;

  assert.ok(
    validateH39TerminalGraphRemainderBudgetReplayReport(changedResidual).some(
      (error) =>
        error.includes("terminal residual rows must preserve overbudget")
    )
  );
});
