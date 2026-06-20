import assert from "node:assert/strict";
import test from "node:test";

import {
  buildH39SharedDomainPrimitiveReplayReport,
  validateH39SharedDomainPrimitiveReplayReport,
} from "../scripts/solver-audits/h39-shared-domain-primitive-replay.mjs";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("h39 shared-domain primitive replay report validates the first solver-impact fixture", () => {
  const report = buildH39SharedDomainPrimitiveReplayReport();

  assert.deepEqual(validateH39SharedDomainPrimitiveReplayReport(report), []);
  assert.equal(report.schema, "solver-h39-shared-domain-primitive-replay/v1");
  assert.equal(report.audit_id, "h39_shared_domain_primitive_replay");
  assert.equal(report.central_solver_backend_invoked, false);
  assert.equal(report.case_count, 3);
  assert.equal(report.overall_impact_classification, "h39_refined_result");
  assert.equal(
    report.final_h39_source_covariance_classification,
    "h39_no_material_effect"
  );
  assert.equal(
    report.next_replay_candidate,
    "h39_terminal_graph_remainder_budget_replay"
  );
});

test("h39 shared-domain primitive replay preserves diagnostic decisions and adds solver metadata", () => {
  const report = buildH39SharedDomainPrimitiveReplayReport();
  const cases = new Map(report.cases.map((entry) => [entry.case_id, entry]));
  const missing = cases.get("missing_bounds");
  const unverified = cases.get("closing_bounds_unverified");
  const external = cases.get("closing_bounds_external_directed_rounded_label");

  assert.equal(
    missing.historical_diagnostic.diagnostic_decision,
    "open-missing-primitive-bounds"
  );
  assert.equal(missing.impact_classification, "h39_no_material_effect");
  assert.deepEqual(
    missing.comparable_output_set.missing_explicit_primitive_bounds,
    ["E_R", "nu_J", "L_J", "rho_X", "r_X", "M_G", "M_R"]
  );
  assert.equal(missing.precision_replay.primitive_component_available_count, 0);
  assert.equal(missing.precision_replay.minimum_jacobian_value, null);
  assert.ok(
    missing.primitive_residual_rows.every(
      (row) => row.value_available === false && row.value === null
    )
  );

  assert.equal(
    unverified.historical_diagnostic.diagnostic_decision,
    "open-shared-domain-not-certified"
  );
  assert.equal(unverified.impact_classification, "h39_refined_result");
  assert.equal(
    unverified.precision_replay.root_solve_metadata.first_failure_code,
    "h39_primitive_provenance_unverified"
  );
  assert.equal(
    unverified.precision_replay.selected_precision_path,
    "validation_replay"
  );
  assert.equal(unverified.precision_replay.selected_numeric_chart, "interval_bounds");
  assert.equal(
    unverified.precision_replay.minimum_jacobian_value,
    5
  );
  assert.equal(unverified.precision_replay.jacobian_sign_stratum, "positive");

  assert.equal(
    external.historical_diagnostic.diagnostic_decision,
    "passes-provided-primitive-bounds"
  );
  assert.equal(external.impact_classification, "h39_refined_result");
  assert.equal(
    external.precision_replay.root_solve_metadata.first_failure_code,
    "h39_external_directed_rounded_provenance_unverified_by_this_fixture"
  );
  assert.equal(
    external.historical_diagnostic.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(external.historical_diagnostic.retained_branch, false);

  for (const replayCase of report.cases) {
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
    assert.equal(replayCase.replay_diff.claim_boundary_preserved, true);
    assert.match(replayCase.resource_notes.timing_note, /fixture adapter/);
    assert.match(replayCase.resource_notes.memory_note, /report JSON/);
  }
});

test("h39 shared-domain primitive replay validator rejects overclaim drift", () => {
  const report = buildH39SharedDomainPrimitiveReplayReport();
  const changedFinal = clone(report);
  changedFinal.final_h39_source_covariance_classification = "h39_refined_result";

  assert.ok(
    validateH39SharedDomainPrimitiveReplayReport(changedFinal).includes(
      "final h39 source-covariance classification must remain h39_no_material_effect for this fixture"
    )
  );

  const changedBackend = clone(report);
  changedBackend.central_solver_backend_invoked = true;

  assert.ok(
    validateH39SharedDomainPrimitiveReplayReport(changedBackend).includes(
      "h39 primitive replay must not claim native central solver backend execution"
    )
  );

  const changedBoundary = clone(report);
  changedBoundary.cases[1].historical_diagnostic.claim_boundary.certifies_directed_rounded_shared_domain =
    true;

  assert.ok(
    validateH39SharedDomainPrimitiveReplayReport(changedBoundary).some((error) =>
      error.includes("must preserve non-promoting h39 claim boundary")
    )
  );
});
