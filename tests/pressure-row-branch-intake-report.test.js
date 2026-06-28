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

test("pressure-row branch intake report rejects current diagnostic-only status", () => {
  const fixture = JSON.parse(fs.readFileSync(CURRENT_FIXTURE, "utf8"));
  const report = buildReport(fixture, { sourceRef: CURRENT_FIXTURE });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, "pressure_row_branch_intake_report/v0");
  assert.equal(report.branch_intake_verdict, "finite_branch_evidence_missing");
  assert.equal(report.first_failure, "finite_branch_evidence_missing");
  assert.equal(report.same_row_binding, false);
  assert.equal(report.authorization.branch_derived_pressure_response, false);
  assert.equal(report.authorization.empirical_mass_response, false);
  assert.equal(report.missing_or_rejected_fields.includes("branch_id"), true);
  assert.equal(report.missing_or_rejected_fields.includes("pressure_response_record.C_chi_iso"), true);
});

test("pressure-row branch intake report accepts a complete same-row synthetic record", () => {
  const report = buildReport({
    row_id: "synthetic-retained-pressure-row",
    branch_id: "branch:q-test",
    accepted_history_segment_id: "history:q-test:W",
    quotient_chart_id: "quotient:q-test",
    residual_status: "pass",
    gap_or_stability_status: "positive_gap",
    eta_ladder_status: "not_required",
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
    }
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.branch_intake_verdict, "accepted_retained_pressure_row");
  assert.equal(report.first_failure, null);
  assert.equal(report.same_row_binding, true);
  assert.equal(report.authorization.branch_derived_pressure_response, true);
  assert.equal(report.authorization.retained_branch_claim, false);
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
