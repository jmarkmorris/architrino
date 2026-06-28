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
const CROSS_ROW_BUNDLE_NEGATIVE_CONTROL_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/mass-map/fixtures/pressure-row-branch-intake-cross-row-bundle-negative-control.json",
    import.meta.url
  )
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
    "accepted_non_fixture_source",
    "same_domain_record_ref",
    "branch_certificate_ref",
    "active_root_or_live_ledger_identity",
    "branch_local_projection_or_normalization_identity",
  ]);
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
