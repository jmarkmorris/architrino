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
const FE_SILICATE_PARTIAL_FIXTURE = fileURLToPath(
  new URL("../scripts/mass-map/fixtures/pressure-row-branch-intake-fe-silicate-toy-partial.json", import.meta.url)
);
const NESTED_SOURCE_STATUS_PROBE_FIXTURE = fileURLToPath(
  new URL(
    "../scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json",
    import.meta.url
  )
);

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

test("pressure-row branch intake CLI emits and validates nested-probe fixture report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pressure-row-branch-intake-"));
  const reportPath = path.join(tempDir, "report.json");

  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--input", NESTED_SOURCE_STATUS_PROBE_FIXTURE, "--out", reportPath, "--pretty"],
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
