import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildReport,
  validationErrors,
} from "../scripts/mass-map/pressure-row-branch-intake-report.mjs";
import {
  buildSourceScoutReport,
  scoutValidationErrors,
} from "../scripts/mass-map/pressure-row-branch-intake-source-scout.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/mass-map/pressure-row-branch-intake-report.mjs", import.meta.url)
);
const CURRENT_FIXTURE = fileURLToPath(
  new URL("../scripts/mass-map/fixtures/pressure-row-branch-intake-current-status.json", import.meta.url)
);
const FE_SILICATE_PARTIAL_FIXTURE = fileURLToPath(
  new URL("../scripts/mass-map/fixtures/pressure-row-branch-intake-fe-silicate-toy-partial.json", import.meta.url)
);
const A0_BRANCH_SOURCE_PARTIAL_FIXTURE = fileURLToPath(
  new URL("../scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json", import.meta.url)
);
const PROVIDER_TARGET_FIXTURE = fileURLToPath(
  new URL("../scripts/mass-map/fixtures/pressure-row-branch-intake-provider-target.json", import.meta.url)
);
const PROVIDER_INTAKE_ARTIFACT_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/mass-map/fixtures/pressure-row-branch-intake-provider-intake-artifact.json",
    import.meta.url
  )
);
const NESTED_SOURCE_STATUS_PROBE_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json",
    import.meta.url
  )
);
const CROSS_ROW_BUNDLE_NEGATIVE_CONTROL_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/mass-map/fixtures/pressure-row-branch-intake-cross-row-bundle-negative-control.json",
    import.meta.url
  )
);
const SOURCE_SCOUT_MANIFEST = fileURLToPath(
  new URL(
    "../scripts/mass-map/fixtures/pressure-row-branch-intake-source-scout-manifest.json",
    import.meta.url
  )
);
const SOURCE_SCOUT_SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/mass-map/pressure-row-branch-intake-source-scout.mjs", import.meta.url)
);

test("pressure-row branch intake report rejects current diagnostic-only status", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "pressure_row_branch_intake_report/v0");
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "finite_branch_evidence_missing");
  assert.equal(report.same_row_binding, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.authorization.export_readiness, false);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.missing_or_rejected_fields.includes("branch_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_record.Pi"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_iso"), true);
  assert.equal(report.missing_or_rejected_fields.includes("null_sector_record.transport"), true);
});

test("pressure-row branch intake report accepts a complete same-row synthetic record", () => {
  const report = buildReport({
    row_id: "synthetic-retained-pressure-row",
    branch_id: "branch:q-test",
    accepted_history_segment_id: "history:q-test:W",
    source_path: "generated/report/q-test.json",
    quotient_chart_id: "quotient:q-test",
    residual_status: "pass",
    gap_or_stability_status: "positive_gap",
    eta_ladder_status: "not_required",
    pressure_record: {
      Pi: "source:Pi",
      A: "source:A",
      s_n: "source:s_n",
      Q_chi_ab: "source:Qchi",
      S_dev_ab: "source:Sdev",
      retained_replay_direction: "source:direction"
    },
    exposure_source_record: {
      E_internal: "source:E",
      zeta: "source:zeta",
      M0_src: "source:M0",
      N_tf_ab: "source:Ntf"
    },
    pressure_response_record: {
      partial_P_M0_src: "source:dPM0",
      C_chi_iso: "source:Ciso",
      C_chi_aniso: "source:Caniso",
      m_S: "source:mS"
    },
    receiver_normal_weight_record: {
      D_s: "source:Ds",
      D_t: "source:Dt",
      W_rec: "source:Wrec",
      retained_root_row_ids: ["source:root-row-1"]
    },
    noether_sea_response_record: {
      theta_sea: "source:theta-sea",
      M_plus_ab: "source:M-plus"
    },
    reversible_domain: {
      R_tr: "source:Rtr",
      R_tr_star: "source:RtrStar",
      loss_channels_closed: true
    },
    null_sector_record: {
      clock_signal: "source:clock",
      birefringence: "source:birefringence",
      photon_dispersion: "source:photon-dispersion",
      preferred_frame: "source:preferred-frame",
      directional_tensor: "source:directional-tensor",
      transport: "source:transport"
    }
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.branch_intake_verdict, "accepted_retained_pressure_row");
  assert.equal(report.first_failure, null);
  assert.equal(report.same_row_binding, true);
  assert.equal(report.authorization.branch_derived_pressure_response, true);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.authorization.export_readiness, false);
});

test("pressure-row branch intake report records Fe/silicate toy row fields without accepting replay-only evidence", () => {
  const fixture = JSON.parse(fs.readFileSync(FE_SILICATE_PARTIAL_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: FE_SILICATE_PARTIAL_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "finite_branch_evidence_missing");
  assert.equal(report.same_row_binding, false);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);

  assert.equal(report.missing_or_rejected_fields.includes("pressure_record.Pi"), false);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_record.s_n"), false);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_iso"), false);
  assert.equal(report.missing_or_rejected_fields.includes("null_sector_record.birefringence"), false);

  assert.equal(report.missing_or_rejected_fields.includes("branch_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("accepted_history_segment_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("quotient_chart_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("eta_ladder_status"), true);
  assert.equal(report.missing_or_rejected_fields.includes("exposure_source_record.E_internal"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.partial_P_M0_src"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_aniso"), true);
  assert.equal(report.missing_or_rejected_fields.includes("receiver_normal_weight_record.D_s"), true);
  assert.equal(report.missing_or_rejected_fields.includes("noether_sea_response_record.theta_sea"), true);
  assert.equal(report.missing_or_rejected_fields.includes("reversible_domain.loss_channels_closed"), true);
  assert.equal(report.missing_or_rejected_fields.includes("null_sector_record.preferred_frame"), true);
  assert.equal(report.missing_or_rejected_fields.includes("null_sector_record.directional_tensor"), true);

  const residualStatus = report.field_results.find((field) => field.path === "residual_status");
  assert.equal(residualStatus.present, true);
  assert.equal(residualStatus.pass, false);
  assert.equal(residualStatus.failure_code, "pressure_row_residual_not_accepted");
});

test("pressure-row branch intake report records A0 branch-source frontier without accepting provisional rows", () => {
  const fixture = JSON.parse(fs.readFileSync(A0_BRANCH_SOURCE_PARTIAL_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: A0_BRANCH_SOURCE_PARTIAL_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "finite_branch_evidence_missing");
  assert.equal(report.same_row_binding, false);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);

  assert.equal(report.source_frontier.source_status, "tier0_continuation_ready_not_accepted_history");
  assert.equal(report.source_frontier.branch_label.k.I, 60);
  assert.equal(report.source_ownership.A0_branch_search.includes("accepted_history_segment_id"), true);
  assert.equal(report.source_ownership.exposure_quotient.includes("exposure_source_record.M0_src"), true);
  assert.equal(report.source_ownership.pressure_replay.includes("pressure_response_record.C_chi_aniso"), true);

  assert.equal(report.missing_or_rejected_fields.includes("branch_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("accepted_history_segment_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("source_path"), true);
  assert.equal(report.missing_or_rejected_fields.includes("quotient_chart_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_record.Pi"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_iso"), true);

  const residualStatus = report.field_results.find((field) => field.path === "residual_status");
  assert.equal(residualStatus.present, true);
  assert.equal(residualStatus.pass, false);
  assert.equal(residualStatus.failure_code, "pressure_row_residual_not_accepted");
});

test("pressure-row branch intake report rejects target-only provider fixture", () => {
  const fixture = JSON.parse(fs.readFileSync(PROVIDER_TARGET_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: PROVIDER_TARGET_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(fixture.schema, "pressure_row_branch_intake_provider_target/v0");
  assert.equal(report.provider_source_status, "target_only_not_accepted_source");
  assert.equal(report.target_status, "same_row_branch_intake_provider_missing");
  assert.equal(
    report.provider_target.provider_target_reading,
    "target_only_same_row_branch_intake_provider_missing"
  );
  assert.deepEqual(report.provider_target.required_provider_fields, [
    "provider_source_status",
    "source_ref",
    "same_domain_record_ref",
    "branch_certificate_ref",
    "active_root_or_live_ledger_identity",
    "branch_local_projection_or_normalization_identity",
    "receiver_normal_branch_strength",
    "retained_source_binding",
    "accepted_status",
  ]);
  assert.equal(
    report.provider_target.same_domain_provider_object_target.schema,
    "pressure_row_same_domain_provider_object_target/v0"
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.claim_level,
    "priority-only fail-closed target, not provider acceptance"
  );
  assert.deepEqual(report.provider_target.same_domain_provider_object_target.required_provider_fields, [
    "provider_source_status",
    "source_ref",
    "same_domain_record_ref",
    "branch_certificate_ref",
    "active_root_or_live_ledger_identity",
    "branch_local_projection_or_normalization_identity",
    "receiver_normal_branch_strength",
    "retained_source_binding",
    "accepted_status",
  ]);
  assert.deepEqual(
    report.provider_target.same_domain_provider_object_target.current_best_partial_missing_fields,
    [
      "provider_source_status",
      "source_ref",
      "branch_certificate_ref",
      "receiver_normal_branch_strength",
      "retained_source_binding",
      "accepted_status",
    ]
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.authorizes_pressure_response,
    false
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.current_best_partial_source_path_probe_target.schema,
    "pressure_row_provider_source_status_and_certificate_path_probe/v0"
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.current_best_partial_source_path_probe_target.required_provider_source_status_path,
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status"
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.current_best_partial_source_path_probe_target.required_source_ref_path,
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].source_ref"
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.current_best_partial_source_path_probe_target.required_branch_certificate_ref_path,
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref"
  );
  assert.equal(
    report.provider_target.same_domain_provider_object_target.current_best_partial_source_path_probe_target.authorizes_pressure_response,
    false
  );
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "finite_branch_evidence_missing");
  assert.equal(report.same_row_binding, false);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.missing_or_rejected_fields.includes("branch_id"), true);
  assert.equal(
    report.missing_or_rejected_fields.includes("accepted_history_segment_id"),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_iso"),
    true
  );
  assert.equal(
    report.missing_or_rejected_fields.includes("null_sector_record.transport"),
    true
  );
});

test("pressure-row branch intake report rejects target-only same-row provider/intake artifact", () => {
  const fixture = JSON.parse(fs.readFileSync(PROVIDER_INTAKE_ARTIFACT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: PROVIDER_INTAKE_ARTIFACT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(fixture.schema, "pressure_row_branch_intake_provider_intake_artifact/v0");
  assert.equal(report.provider_source_status, "same_row_provider_intake_artifact_target_only_not_accepted_source");
  assert.equal(report.target_status, "accepted_non_fixture_retained_pressure_row_missing");
  assert.equal(
    report.provider_intake.artifact_reading,
    "same_row_provider_intake_artifact_target_only_fail_closed"
  );
  assert.deepEqual(
    Object.keys(report.provider_intake.required_intake_records),
    [
      "accepted_branch_identity",
      "accepted_history_segment",
      "source_path",
      "quotient_chart",
      "pressure_record",
      "exposure_source_record",
      "pressure_response_record",
      "receiver_normal_weight_record",
      "noether_sea_response_record",
      "reversible_domain",
      "null_sector_record",
    ]
  );
  assert.equal(report.negative_control.expected_report.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(report.same_row_binding, true);
  assert.equal(report.same_row_binding_evidence.pass, true);
  assert.deepEqual(report.field_results.filter((field) => !field.pass), []);
  assert.equal(report.accepted_source_evidence.pass, false);
  assert.equal(
    report.accepted_source_evidence.rejected_status_fields.some(
      (field) => field.path === "provider_source_status"
    ),
    true
  );
  assert.equal(
    report.accepted_source_evidence.rejected_status_fields.some(
      (field) => field.path === "branch_id.source_status"
    ),
    true
  );
  assert.equal(
    report.accepted_source_evidence.rejected_status_fields.some(
      (field) => field.path === "pressure_response_record.C_chi_iso.source_status"
    ),
    true
  );
  assert.deepEqual(report.missing_or_rejected_fields, ["accepted_non_fixture_source"]);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.authorization.export_readiness, false);
});

test("pressure-row branch intake report rejects nested target-only provenance on complete same-row fields", () => {
  const fixture = JSON.parse(fs.readFileSync(NESTED_SOURCE_STATUS_PROBE_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: fixture.source_ref });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(fixture.schema, "pressure_row_branch_intake_nested_source_status_probe/v0");
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(report.same_row_binding, true);
  assert.equal(report.same_row_binding_evidence.pass, true);
  assert.deepEqual(report.field_results.filter((field) => !field.pass), []);
  assert.deepEqual(report.missing_or_rejected_fields, ["accepted_non_fixture_source"]);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.authorization.export_readiness, false);

  const rejectedPaths = report.accepted_source_evidence.rejected_status_fields.map(
    (field) => field.path
  );
  assert.equal(rejectedPaths.includes("branch_id.source_status"), true);
  assert.equal(rejectedPaths.includes("accepted_history_segment_id.source_status"), true);
  assert.equal(rejectedPaths.includes("pressure_record.Pi.source_status"), true);
  assert.equal(rejectedPaths.includes("exposure_source_record.E_internal.source_status"), true);
  assert.equal(
    rejectedPaths.includes("pressure_response_record.partial_P_M0_src.source_status"),
    true
  );
  assert.equal(rejectedPaths.includes("receiver_normal_weight_record.D_s.source_status"), true);
  assert.equal(rejectedPaths.includes("noether_sea_response_record.theta_sea.source_status"), true);
  assert.equal(rejectedPaths.includes("null_sector_record.transport.source_status"), true);
});

test("pressure-row branch intake report rejects cross-row bundle negative control", () => {
  const fixture = JSON.parse(fs.readFileSync(CROSS_ROW_BUNDLE_NEGATIVE_CONTROL_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CROSS_ROW_BUNDLE_NEGATIVE_CONTROL_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(fixture.schema, "pressure_row_branch_intake_cross_row_bundle_negative_control/v0");
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "finite_branch_evidence_missing");
  assert.equal(report.same_row_binding, false);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.authorization.export_readiness, false);

  assert.deepEqual(
    report.field_results.filter((field) => !field.pass).map((field) => field.path),
    []
  );
  assert.equal(report.missing_or_rejected_fields.includes("same_row_binding"), true);
  assert.equal(report.missing_or_rejected_fields.includes("branch_id"), false);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_iso"), false);
  assert.equal(report.missing_or_rejected_fields.includes("receiver_normal_weight_record.D_s"), false);
  assert.equal(report.missing_or_rejected_fields.includes("noether_sea_response_record.theta_sea"), false);
  assert.equal(report.missing_or_rejected_fields.includes("null_sector_record.transport"), false);

  const rowConflict = report.same_row_binding_evidence.conflicting_bindings.find(
    (binding) => binding.binding_key === "row_id"
  );
  assert.ok(rowConflict);
  assert.deepEqual(rowConflict.values, [
    "a0-compact-fixture-branch-source-frontier-partial",
    "fe-silicate-toy-Fe_metal-step1-partial-same-row",
    "retained-pressure-row-branch-intake-provider-target",
  ]);

  const sourceConflict = report.same_row_binding_evidence.conflicting_bindings.find(
    (binding) => binding.binding_key === "source_ref"
  );
  assert.ok(sourceConflict);
  assert.equal(
    sourceConflict.values.includes("reference/priorities/braid-mass-response-map/a0-reduced-branch-certificate.md"),
    true
  );
  assert.equal(
    sourceConflict.values.includes("scripts/mass-map/fe-silicate-segregation-toy.json#materials[Fe_metal].steps[1]"),
    true
  );
  assert.equal(
    sourceConflict.values.includes("reference/priorities/braid-mass-response-map/pressure-response-coefficient-closure.md"),
    true
  );
});

test("pressure-row branch intake CLI emits and validates current fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pressure-row-branch-intake-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--input", CURRENT_FIXTURE, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.authorization.empirical_mass_response, false);

  const validation = JSON.parse(
    execFileSync(process.execPath, [SCRIPT_PATH, "--validate", reportPath, "--pretty"], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.branch_intake_verdict, "finite_branch_evidence_missing");
});

test("pressure-row accepted-source scout keeps current repo candidates fail-closed", () => {
  const manifest = JSON.parse(fs.readFileSync(SOURCE_SCOUT_MANIFEST, "utf8"));
  const repoRoot = path.resolve(path.dirname(SOURCE_SCOUT_MANIFEST), "../../..");
  const report = buildSourceScoutReport(manifest, { repoRoot });

  assert.deepEqual(scoutValidationErrors(report), []);
  assert.equal(report.schema, "pressure_row_branch_intake_source_scout_report/v0");
  assert.equal(report.candidate_count, 14);
  assert.equal(report.source_scope.manifest_candidate_count, 13);
  assert.equal(report.source_scope.auto_discovered_candidate_count, 1);
  assert.equal(report.accepted_non_fixture_candidate_count, 0);
  assert.equal(report.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.authorization.retained_branch_claim, false);
  assert.equal(report.authorization.observer_export, false);
  assert.equal(report.authorization.export_readiness, false);

  const rejectionCodes = new Set(report.candidates.flatMap((candidate) => candidate.rejection_codes));
  for (const expectedCode of [
    "target_only_source",
    "toy_source",
    "fixture_path",
    "diagnostic_source",
    "nested_target_provenance",
    "empirical_source",
    "provider_boundary_not_pressure_row",
  ]) {
    assert.equal(rejectionCodes.has(expectedCode), true);
  }

  const inspectedSourceClasses = report.candidate_source_class_inspections.map(
    (entry) => entry.candidate_kind
  );
  assert.deepEqual(inspectedSourceClasses, [
    "a0_branch_chart_revision_contract",
    "a0_branch_source_frontier_partial",
    "branch_provider_boundary_report",
    "complete_same_row_target_fixture",
    "cross_row_bundle_negative_control",
    "current_status_fixture",
    "empirical_pressure_replay_skeleton",
    "exposure_source_theorem_target",
    "finite_branch_hessian_target_packet",
    "nested_target_provenance_probe",
    "noether_sea_response_probe_target",
    "provider_target_fixture",
    "toy_pressure_replay_packet",
    "toy_pressure_replay_partial",
  ]);
  assert.equal(
    report.candidate_source_class_inspections.every(
      (entry) => entry.accepted_non_fixture_candidate_count === 0
    ),
    true
  );
  const completeSameRowClass = report.candidate_source_class_inspections.find(
    (entry) => entry.candidate_kind === "complete_same_row_target_fixture"
  );
  assert.ok(completeSameRowClass);
  assert.deepEqual(completeSameRowClass.first_failures, [
    "accepted_non_fixture_source_missing",
  ]);
  assert.equal(
    completeSameRowClass.nearest_missing_field_sets.includes("branch_id"),
    true
  );
  assert.equal(
    completeSameRowClass.nearest_missing_field_sets.includes(
      "reversible_domain.loss_channels_closed"
    ),
    true
  );

  const nestedProbe = report.candidates.find((candidate) =>
    candidate.path.endsWith("pressure-row-branch-intake-nested-source-status-probe.json")
  );
  assert.ok(nestedProbe);
  assert.equal(nestedProbe.pressure_row_report.same_row_binding, true);
  assert.equal(nestedProbe.pressure_row_report.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(nestedProbe.rejection_codes.includes("nested_target_provenance"), true);

  const branchProviderReport = report.candidates.find(
    (candidate) => candidate.path === "reference/priorities/app-solver/branch-provider-evidence-report.md"
  );
  assert.ok(branchProviderReport);
  assert.equal(branchProviderReport.candidate_kind, "branch_provider_boundary_report");
  assert.equal(branchProviderReport.accepted_non_fixture_source, false);
  assert.equal(branchProviderReport.rejection_codes.includes("provider_boundary_not_pressure_row"), true);
  assert.equal(
    branchProviderReport.provider_report_reading.provider_verdict,
    "same_domain_branch_provider_missing"
  );
  assert.equal(branchProviderReport.provider_report_reading.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(branchProviderReport.provider_report_reading.provider_ready_consumer_count, "0");

  assert.ok(report.failure_family_delta.nearest_candidate);
  assert.equal(
    report.failure_family_delta.nearest_candidate.path,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json"
  );
  assert.equal(report.failure_family_delta.nearest_candidate.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(report.failure_family_delta.nearest_candidate.same_row_binding, true);
  assert.equal(report.failure_family_delta.nearest_candidate.failed_field_count, 0);
  assert.equal(
    report.failure_family_delta.minimal_missing_rows.includes("exposure_source_record.E_internal"),
    true
  );
  assert.equal(
    report.failure_family_delta.minimal_missing_rows.includes("pressure_response_record.C_chi_iso"),
    true
  );
  assert.equal(
    report.failure_family_delta.provider_boundary_candidate.path,
    "reference/priorities/app-solver/branch-provider-evidence-report.md"
  );

  const provenanceDepth = report.failure_family_delta.provenance_depth_readout;
  assert.ok(provenanceDepth);
  assert.equal(
    provenanceDepth.schema,
    "pressure_row_nearest_candidate_provenance_depth_readout/v0"
  );
  assert.equal(
    provenanceDepth.candidate_path,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json"
  );
  assert.equal(provenanceDepth.accepted_non_fixture_source_provenance_pass, false);
  assert.equal(provenanceDepth.field_count, 33);
  assert.equal(provenanceDepth.target_or_probe_only_required_field_count, 32);
  assert.equal(provenanceDepth.unaccepted_required_field_count, 33);
  assert.equal(provenanceDepth.first_unaccepted_required_field.field_path, "branch_id");
  assert.equal(
    provenanceDepth.first_unaccepted_required_field.source_status,
    "target_required_not_accepted_source"
  );
  assert.equal(
    provenanceDepth.first_target_or_probe_only_required_field.field_path,
    "branch_id"
  );
  assert.equal(
    provenanceDepth.first_target_or_probe_only_required_field.provenance_reading,
    "target_or_probe_only_not_accepted_source"
  );
  assert.equal(
    provenanceDepth.first_non_target_unaccepted_required_field.field_path,
    "reversible_domain.loss_channels_closed"
  );
  assert.equal(
    provenanceDepth.first_non_target_unaccepted_required_field.provenance_reading,
    "literal_or_row_value_without_source_provenance"
  );
  assert.deepEqual(provenanceDepth.provenance_reading_counts, [
    {
      key: "target_or_probe_only_not_accepted_source",
      count: 32,
    },
    {
      key: "literal_or_row_value_without_source_provenance",
      count: 1,
    },
  ]);
  assert.equal(provenanceDepth.target_or_probe_only_required_field_paths.length, 32);
  assert.deepEqual(provenanceDepth.missing_required_field_paths, []);
  assert.deepEqual(provenanceDepth.literal_or_row_value_without_source_provenance_field_paths, [
    "reversible_domain.loss_channels_closed",
  ]);
  assert.deepEqual(provenanceDepth.rejected_non_source_provenance_field_paths, []);
  assert.deepEqual(provenanceDepth.unverified_source_provenance_field_paths, []);
  assert.equal(
    provenanceDepth.field_readouts.every((field) => field.accepted_non_fixture_source_provenance === false),
    true
  );

  const branchIdAudit = report.failure_family_delta.branch_id_source_availability_audit;
  assert.ok(branchIdAudit);
  assert.equal(branchIdAudit.schema, "pressure_row_branch_id_source_availability_audit/v0");
  assert.equal(branchIdAudit.field_path, "branch_id");
  assert.equal(branchIdAudit.accepted_branch_id_source_found, false);
  assert.equal(branchIdAudit.first_failure, "branch_id.accepted_non_fixture_source_missing");
  assert.equal(branchIdAudit.preserved_failure_boundary, "accepted_non_fixture_source_missing");
  assert.equal(
    branchIdAudit.required_source_family,
    "same-domain source-map provider-object branch intervals feeding retained pressure-row branch identity"
  );
  assert.match(
    branchIdAudit.required_next_pressure_row,
    /one accepted non-fixture retained pressure row/
  );
  assert.equal(branchIdAudit.candidate_count, 14);
  assert.equal(branchIdAudit.branch_id_present_candidate_count, 3);
  assert.equal(branchIdAudit.target_or_probe_only_branch_id_candidate_count, 3);
  assert.equal(branchIdAudit.accepted_branch_id_candidate_count, 0);
  assert.deepEqual(branchIdAudit.accepted_branch_id_candidates, []);
  assert.equal(
    branchIdAudit.nearest_candidate_branch_id_readout.path,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json"
  );
  assert.equal(
    branchIdAudit.nearest_candidate_branch_id_readout.branch_id.source_status,
    "target_required_not_accepted_source"
  );
  assert.equal(
    branchIdAudit.nearest_candidate_branch_id_readout.branch_id.provenance_reading,
    "target_or_probe_only_not_accepted_source"
  );
  assert.equal(
    branchIdAudit.provider_boundary_candidate.provider_report_reading.provider_verdict,
    "same_domain_branch_provider_missing"
  );
  assert.equal(
    branchIdAudit.provider_boundary_candidate.provider_report_reading.provider_ready_consumer_count,
    "0"
  );

  const providerReadiness = branchIdAudit.provider_readiness;
  assert.equal(providerReadiness.schema, "pressure_row_branch_id_provider_readiness_audit/v0");
  assert.equal(providerReadiness.provider_current_candidate_available, true);
  assert.equal(
    providerReadiness.provider_candidate_id,
    "h39-aggregate-p-provider-preaggregation-construction-attempt"
  );
  assert.equal(providerReadiness.provider_source_status, "target_only_not_accepted_source");
  assert.equal(providerReadiness.feeds_rank4_pressure_row_branch_intake, true);
  assert.equal(
    providerReadiness.current_primary_missing_object_kind,
    "source-map-provider-object-branch-intervals"
  );
  assert.equal(
    providerReadiness.next_evidence_object,
    "same-domain source-map provider-object branch intervals on every terminal row"
  );
  assert.equal(providerReadiness.source_map_provider_branch_intervals_available, false);
  assert.equal(providerReadiness.provider_object_branch_intervals_present, false);
  assert.equal(providerReadiness.accepted_provider_object_branch_interval_count, 0);
  assert.equal(providerReadiness.required_terminal_row_count, 15);
  assert.equal(providerReadiness.required_branch_row_count, 30);
  assert.deepEqual(providerReadiness.required_identity_kinds, [
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
  ]);
  assert.equal(providerReadiness.provider_ready_authorized, false);
  assert.equal(providerReadiness.downstream_consumer_authorization, false);

  const branchCertificateRefAudit =
    report.failure_family_delta.branch_certificate_ref_source_availability_audit;
  assert.ok(branchCertificateRefAudit);
  assert.equal(
    branchCertificateRefAudit.schema,
    "pressure_row_branch_certificate_ref_source_availability_audit/v0"
  );
  assert.equal(branchCertificateRefAudit.field_path, "branch_certificate_ref");
  assert.equal(branchCertificateRefAudit.accepted_branch_certificate_ref_found, false);
  assert.equal(
    branchCertificateRefAudit.first_failure,
    "branch_certificate_ref.accepted_non_fixture_source_missing"
  );
  assert.equal(
    branchCertificateRefAudit.preserved_failure_boundary,
    "accepted_non_fixture_source_missing"
  );
  assert.equal(branchCertificateRefAudit.provider_candidate_count, 8);
  assert.equal(branchCertificateRefAudit.rank4_provider_candidate_count, 4);
  assert.equal(branchCertificateRefAudit.pressure_source_candidate_count, 14);
  assert.equal(branchCertificateRefAudit.pressure_target_or_fixture_candidate_count, 7);
  assert.equal(branchCertificateRefAudit.branch_certificate_ref_present_candidate_count, 0);
  assert.equal(branchCertificateRefAudit.accepted_branch_certificate_ref_candidate_count, 0);
  assert.deepEqual(branchCertificateRefAudit.accepted_branch_certificate_ref_candidates, []);
  assert.match(
    branchCertificateRefAudit.required_next_provider_object,
    /provider_source_status=accepted_non_fixture_source/
  );
  assert.match(
    branchCertificateRefAudit.required_next_pressure_row_binding,
    /one accepted non-fixture retained pressure row/
  );
  const branchCertificateCandidateIds = branchCertificateRefAudit.candidate_readouts.map(
    (candidate) => candidate.id
  );
  assert.deepEqual(branchCertificateCandidateIds, [
    "pressure-row-current-status",
    "pressure-row-fe-silicate-toy-partial",
    "pressure-row-a0-branch-source-frontier-partial",
    "h39-aggregate-p-provider-preaggregation-construction-attempt",
  ]);
  assert.equal(
    branchCertificateRefAudit.candidate_readouts.every(
      (candidate) =>
        candidate.branch_certificate_ref_present === false &&
        candidate.branch_certificate_ref_reading === "branch_certificate_ref_missing"
    ),
    true
  );

  const providerObjectAttempt =
    branchCertificateRefAudit.same_domain_provider_object_construction_attempt;
  assert.ok(providerObjectAttempt);
  assert.equal(
    providerObjectAttempt.schema,
    "pressure_row_same_domain_provider_object_construction_attempt/v0"
  );
  assert.equal(
    providerObjectAttempt.claim_scope,
    "rank4 pressure-row branch-intake provider object"
  );
  assert.equal(providerObjectAttempt.required_provider_source_status, "accepted_non_fixture_source");
  assert.deepEqual(providerObjectAttempt.required_provider_fields, [
    "provider_source_status",
    "source_ref",
    "same_domain_record_ref",
    "branch_certificate_ref",
    "active_root_or_live_ledger_identity",
    "branch_local_projection_or_normalization_identity",
    "receiver_normal_branch_strength",
    "retained_source_binding",
    "accepted_status",
  ]);
  assert.equal(providerObjectAttempt.accepted_same_domain_provider_object_found, false);
  assert.equal(
    providerObjectAttempt.first_failure,
    "same_domain_provider_object.accepted_non_fixture_source_missing"
  );
  assert.equal(
    providerObjectAttempt.preserved_failure_boundary,
    "accepted_non_fixture_source_missing"
  );
  assert.equal(providerObjectAttempt.rank4_provider_candidate_count, 4);
  assert.equal(providerObjectAttempt.provider_object_ready_candidate_count, 0);
  assert.deepEqual(providerObjectAttempt.missing_or_rejected_provider_field_union, [
    "accepted_status",
    "active_root_or_live_ledger_identity",
    "branch_certificate_ref",
    "branch_local_projection_or_normalization_identity",
    "provider_source_status",
    "receiver_normal_branch_strength",
    "retained_source_binding",
    "same_domain_record_ref",
    "source_ref",
  ]);
  assert.deepEqual(providerObjectAttempt.nearest_pressure_specific_partial, {
    id: "pressure-row-a0-branch-source-frontier-partial",
    required_field_pass_count: 3,
    missing_or_rejected_provider_fields: [
      "provider_source_status",
      "source_ref",
      "branch_certificate_ref",
      "receiver_normal_branch_strength",
      "retained_source_binding",
      "accepted_status",
    ],
    first_failure: "provider_source_status.accepted_non_fixture_source_missing",
  });
  assert.deepEqual(providerObjectAttempt.branch_certificate_ref_null_candidate_ids, [
    "pressure-row-current-status",
    "pressure-row-fe-silicate-toy-partial",
    "pressure-row-a0-branch-source-frontier-partial",
    "h39-aggregate-p-provider-preaggregation-construction-attempt",
  ]);
  const providerSourcePathProbe =
    providerObjectAttempt.provider_source_status_and_certificate_path_probe;
  assert.ok(providerSourcePathProbe);
  assert.equal(
    providerSourcePathProbe.schema,
    "pressure_row_provider_source_status_and_certificate_path_probe/v0"
  );
  assert.equal(
    providerSourcePathProbe.nearest_partial_id,
    "pressure-row-a0-branch-source-frontier-partial"
  );
  assert.equal(
    providerSourcePathProbe.nearest_partial_source_ref,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json"
  );
  assert.equal(
    providerSourcePathProbe.nearest_partial_source_ref_status,
    "fixture_source_ref_not_accepted_provenance"
  );
  assert.equal(providerSourcePathProbe.accepted_promotion_authorized, false);
  assert.equal(
    providerSourcePathProbe.same_candidate_populated_fields_are_not_source_acceptance,
    true
  );
  assert.equal(
    providerSourcePathProbe.provider_source_status_path,
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status"
  );
  assert.equal(
    providerSourcePathProbe.provider_source_status_observed_value,
    "tier0_continuation_ready_not_accepted_history"
  );
  assert.equal(providerSourcePathProbe.provider_source_status_pass, false);
  assert.equal(
    providerSourcePathProbe.provider_source_status_first_failure,
    "provider_source_status.accepted_non_fixture_source_missing"
  );
  assert.equal(
    providerSourcePathProbe.branch_certificate_ref_path,
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref"
  );
  assert.equal(providerSourcePathProbe.branch_certificate_ref_observed_value, null);
  assert.equal(providerSourcePathProbe.branch_certificate_ref_pass, false);
  assert.equal(
    providerSourcePathProbe.branch_certificate_ref_first_failure,
    "branch_certificate_ref.missing"
  );
  assert.deepEqual(providerSourcePathProbe.exact_missing_provider_source_paths, [
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].source_ref",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].receiver_normal_branch_strength",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].retained_source_binding",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].accepted_status",
  ]);

  const acceptedSourceBoundary =
    report.failure_family_delta.accepted_source_object_boundary;
  assert.ok(acceptedSourceBoundary);
  assert.equal(
    acceptedSourceBoundary.schema,
    "pressure_row_accepted_source_object_boundary/v0"
  );
  assert.equal(acceptedSourceBoundary.accepted_source_object_found, false);
  assert.equal(acceptedSourceBoundary.accepted_promotion_authorized, false);
  assert.equal(acceptedSourceBoundary.first_failure, "accepted_non_fixture_source_missing");
  assert.equal(
    acceptedSourceBoundary.provider_boundary.nearest_provider_candidate_id,
    "pressure-row-a0-branch-source-frontier-partial"
  );
  assert.match(
    acceptedSourceBoundary.provider_boundary.expected_provider_source_producer,
    /accepted non-fixture same-domain branch-provider report/
  );
  assert.match(
    acceptedSourceBoundary.provider_boundary.expected_provider_file_family,
    /non-fixture generated branch-provider report/
  );
  assert.deepEqual(acceptedSourceBoundary.provider_boundary.required_provider_report_fields, [
    "provider_source_status",
    "source_ref",
    "branch_certificate_ref",
    "same_domain_record_ref",
    "active_root_or_live_ledger_identity",
    "branch_local_projection_or_normalization_identity",
    "receiver_normal_branch_strength",
    "retained_source_binding",
    "accepted_status",
  ]);
  assert.equal(
    acceptedSourceBoundary.provider_boundary.nearest_provider_candidate_source_ref,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json"
  );
  assert.equal(
    acceptedSourceBoundary.provider_boundary.nearest_provider_candidate_source_ref_status,
    "fixture_source_ref_not_accepted_provenance"
  );
  assert.deepEqual(
    acceptedSourceBoundary.provider_boundary.exact_missing_provider_source_fields,
    [
      {
        field: "provider_source_status",
        path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
        required_value: "accepted_non_fixture_source",
        observed_value: "tier0_continuation_ready_not_accepted_history",
        pass: false,
        first_failure: "provider_source_status.accepted_non_fixture_source_missing",
      },
      {
        field: "source_ref",
        path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].source_ref",
        required_value: "non-fixture source_ref for accepted provider report",
        observed_value:
          "scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json",
        pass: false,
        first_failure: "source_ref.fixture_source_ref_not_accepted_provenance",
      },
      {
        field: "branch_certificate_ref",
        path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref",
        required_value:
          "nonempty branch_certificate_ref on the same accepted non-fixture provider record",
        observed_value: null,
        pass: false,
        first_failure: "branch_certificate_ref.missing",
      },
      {
        field: "receiver_normal_branch_strength",
        path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].receiver_normal_branch_strength",
        required_value:
          "receiver-normal branch strength on the same accepted non-fixture provider row",
        observed_value: null,
        pass: false,
        first_failure: "receiver_normal_branch_strength.missing",
      },
      {
        field: "retained_source_binding",
        path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].retained_source_binding",
        required_value:
          "retained source binding on the same accepted non-fixture provider row",
        observed_value: null,
        pass: false,
        first_failure: "retained_source_binding.missing",
      },
      {
        field: "accepted_status",
        path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].accepted_status",
        required_value: "accepted",
        observed_value: null,
        pass: false,
        first_failure: "accepted_status.accepted_missing",
      },
    ]
  );
  assert.deepEqual(
    acceptedSourceBoundary.provider_boundary.exact_missing_provider_source_paths,
    [
      "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
      "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].source_ref",
      "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref",
      "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].receiver_normal_branch_strength",
      "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].retained_source_binding",
      "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].accepted_status",
    ]
  );
  assert.deepEqual(
    acceptedSourceBoundary.provider_boundary.missing_or_rejected_provider_report_fields,
    [
      "provider_source_status",
      "source_ref",
      "branch_certificate_ref",
      "receiver_normal_branch_strength",
      "retained_source_binding",
      "accepted_status",
    ]
  );
  assert.equal(
    acceptedSourceBoundary.provider_boundary.first_missing_or_rejected_provider_report_field,
    "provider_source_status"
  );
  assert.equal(
    acceptedSourceBoundary.provider_boundary.first_missing_or_rejected_provider_report_path,
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status"
  );
  assert.equal(
    acceptedSourceBoundary.provider_boundary.first_missing_or_rejected_provider_report_failure,
    "provider_source_status.accepted_non_fixture_source_missing"
  );
  assert.deepEqual(acceptedSourceBoundary.provider_boundary.provider_source_status_target, {
    schema: "pressure_row_provider_source_status_target/v0",
    field: "provider_source_status",
    status: "source_target_blocked",
    accepted_promotion_authorized: false,
    path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
    required_value: "accepted_non_fixture_source",
    observed_value: "tier0_continuation_ready_not_accepted_history",
    first_failure: "provider_source_status.accepted_non_fixture_source_missing",
    expected_producer:
      "same-domain branch-provider report row that marks this provider source as accepted_non_fixture_source",
    same_provider_row_required: true,
  });
  assert.deepEqual(acceptedSourceBoundary.provider_boundary.provider_source_ref_target, {
    schema: "pressure_row_provider_source_ref_target/v0",
    field: "source_ref",
    status: "source_target_blocked",
    accepted_promotion_authorized: false,
    path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].source_ref",
    required_value: "non-fixture source_ref for accepted provider report",
    observed_value:
      "scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json",
    first_failure: "source_ref.fixture_source_ref_not_accepted_provenance",
    expected_producer:
      "non-fixture source_ref for the same accepted branch-provider report row, outside scripts/**/fixtures/**",
    same_provider_row_required: true,
  });
  assert.deepEqual(
    acceptedSourceBoundary.provider_boundary.provider_branch_certificate_ref_target,
    {
      schema: "pressure_row_provider_branch_certificate_ref_target/v0",
      field: "branch_certificate_ref",
      status: "source_target_blocked",
      accepted_promotion_authorized: false,
      path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref",
      required_value:
        "nonempty branch_certificate_ref on the same accepted non-fixture provider record",
      observed_value: null,
      first_failure: "branch_certificate_ref.missing",
      expected_producer:
        "branch_certificate_ref emitted on the same accepted non-fixture branch-provider report row",
      same_provider_row_required: true,
    }
  );
  assert.deepEqual(
    acceptedSourceBoundary.provider_boundary
      .accepted_non_fixture_same_domain_provider_source_target,
    {
      schema: "pressure_row_accepted_non_fixture_same_domain_provider_source_target/v0",
      claim_scope: "rank4 pressure-row same-domain branch-provider source",
      target_status: "source_target_blocked",
      accepted_provider_source_found: false,
      accepted_promotion_authorized: false,
      selected_provider_candidate_id: "pressure-row-a0-branch-source-frontier-partial",
      selected_provider_claim_scope: "rank4 A0 branch-source frontier partial",
      selected_provider_source_ref:
        "scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json",
      first_missing_or_rejected_field: "provider_source_status",
      first_missing_or_rejected_path:
        "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
      first_missing_or_rejected_failure:
        "provider_source_status.accepted_non_fixture_source_missing",
      required_provider_report_fields: [
        "provider_source_status",
        "source_ref",
        "branch_certificate_ref",
        "same_domain_record_ref",
        "active_root_or_live_ledger_identity",
        "branch_local_projection_or_normalization_identity",
        "receiver_normal_branch_strength",
        "retained_source_binding",
        "accepted_status",
      ],
      satisfied_same_row_provider_fields: [
        "same_domain_record_ref",
        "active_root_or_live_ledger_identity",
        "branch_local_projection_or_normalization_identity",
      ],
      missing_or_rejected_provider_report_fields: [
        "provider_source_status",
        "source_ref",
        "branch_certificate_ref",
        "receiver_normal_branch_strength",
        "retained_source_binding",
        "accepted_status",
      ],
      field_readouts:
        acceptedSourceBoundary.provider_boundary.provider_row_field_readouts,
      required_source_ref_rule:
        "source_ref must be non-fixture provenance for the same accepted provider report row.",
      required_branch_certificate_rule:
        "branch_certificate_ref must be nonempty on the same accepted non-fixture provider row.",
      required_same_record_binding: {
        same_provider_row_required: true,
        cross_candidate_join_authorized: false,
        fixture_source_ref_authorized: false,
        target_only_source_status_authorized: false,
        h39_theta3minus_diagnostic_authorized_as_pressure_evidence: false,
      },
      expected_producer:
        "non-fixture same-domain branch-provider report for pressure-row-a0-branch-source-frontier-partial carrying provider_source_status=accepted_non_fixture_source, non-fixture source_ref, branch_certificate_ref, same_domain_record_ref, active_root_or_live_ledger_identity, branch_local_projection_or_normalization_identity, receiver_normal_branch_strength, retained_source_binding, and accepted_status=accepted on one provider row",
      authorization: {
        retained_pressure_row_source: false,
        branch_derived_pressure_response: false,
        empirical_mass_response: false,
        retained_branch_claim: false,
        observer_export: false,
        export_readiness: false,
      },
    }
  );
  const providerReportReadouts = new Map(
    acceptedSourceBoundary.provider_boundary.provider_row_field_readouts.map((field) => [
      field.field,
      field,
    ])
  );
  assert.equal(providerReportReadouts.get("same_domain_record_ref").pass, true);
  assert.equal(providerReportReadouts.get("active_root_or_live_ledger_identity").pass, true);
  assert.equal(
    providerReportReadouts.get("branch_local_projection_or_normalization_identity").pass,
    true
  );
  assert.equal(
    acceptedSourceBoundary.pressure_row_boundary.nearest_pressure_row_candidate_path,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json"
  );
  assert.match(
    acceptedSourceBoundary.pressure_row_boundary.expected_pressure_row_source_producer,
    /accepted retained pressure-row report/
  );
  assert.equal(acceptedSourceBoundary.pressure_row_boundary.required_source_field_count, 33);
  assert.equal(acceptedSourceBoundary.pressure_row_boundary.unaccepted_source_field_count, 33);
  const sourceFamilies = new Map(
    acceptedSourceBoundary.pressure_row_boundary.source_field_families.map((family) => [
      family.field_family,
      family,
    ])
  );
  assert.equal(sourceFamilies.get("retained_branch_identity").required_count, 3);
  assert.equal(sourceFamilies.get("retained_branch_identity").unaccepted_count, 3);
  assert.equal(sourceFamilies.get("exposure_quotient").required_count, 1);
  assert.equal(sourceFamilies.get("pressure_record").required_count, 6);
  assert.equal(sourceFamilies.get("exposure_source_record").required_count, 4);
  assert.equal(sourceFamilies.get("pressure_response_record").required_count, 4);
  assert.equal(sourceFamilies.get("receiver_normal_weight_record").required_count, 4);
  assert.equal(sourceFamilies.get("receiver_normal_weight_record").unaccepted_count, 4);
  assert.equal(sourceFamilies.get("noether_sea_response_record").required_count, 2);
  assert.equal(sourceFamilies.get("noether_sea_response_record").unaccepted_count, 2);
  assert.equal(sourceFamilies.get("reversible_domain").required_count, 3);
  assert.equal(sourceFamilies.get("null_sector_record").required_count, 6);
  assert.equal(
    acceptedSourceBoundary.pressure_row_boundary.exact_unaccepted_pressure_row_source_paths.includes(
      "scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json#receiver_normal_weight_record.D_s"
    ),
    true
  );
  assert.equal(
    acceptedSourceBoundary.pressure_row_boundary.exact_unaccepted_pressure_row_source_paths.includes(
      "scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json#noether_sea_response_record.M_plus_ab"
    ),
    true
  );
  assert.equal(
    acceptedSourceBoundary.required_same_record_binding.cross_candidate_join_authorized,
    false
  );
  assert.equal(
    acceptedSourceBoundary.forbidden_evidence_sources.includes("H39/theta3minus diagnostics"),
    true
  );
  assert.deepEqual(acceptedSourceBoundary.next_exact_source_target.provider_paths, [
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].source_ref",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].receiver_normal_branch_strength",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].retained_source_binding",
    "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].accepted_status",
  ]);
  assert.deepEqual(acceptedSourceBoundary.next_exact_source_target.first_provider_row_blocker, {
    field: "provider_source_status",
    path: "scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status",
    required_value: "accepted_non_fixture_source",
    observed_value: "tier0_continuation_ready_not_accepted_history",
    pass: false,
    first_failure: "provider_source_status.accepted_non_fixture_source_missing",
  });
  assert.deepEqual(providerObjectAttempt.accepted_same_domain_provider_object_candidates, []);
  assert.equal(
    providerObjectAttempt.candidate_readouts.every(
      (candidate) =>
        candidate.pressure_provider_object_ready === false &&
        candidate.cross_candidate_join_authorized === false
    ),
    true
  );
});

test("pressure-row accepted-source scout CLI emits and validates manifest report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pressure-row-source-scout-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SOURCE_SCOUT_SCRIPT_PATH, "--manifest", SOURCE_SCOUT_MANIFEST, "--out", reportPath, "--pretty"],
    { encoding: "utf8" }
  );

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  assert.equal(report.candidate_count, 14);
  assert.equal(report.accepted_non_fixture_candidate_count, 0);
  assert.equal(report.first_failure, "accepted_non_fixture_source_missing");

  const validation = JSON.parse(
    execFileSync(process.execPath, [SOURCE_SCOUT_SCRIPT_PATH, "--validate", reportPath, "--pretty"], {
      encoding: "utf8",
    })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.first_failure, "accepted_non_fixture_source_missing");
});
