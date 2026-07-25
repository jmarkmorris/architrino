import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  INPUT_SCHEMA,
  OUTPUT_SCHEMA,
  buildNoetherSeaResponseSourceTargetCheck,
} from "../scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs",
    import.meta.url,
  ),
);
const TARGET_PATH = fileURLToPath(
  new URL(
    "../scripts/spacetime/noether-sea-density-compression-provider.v1.json",
    import.meta.url,
  ),
);

function readTarget() {
  return JSON.parse(fs.readFileSync(TARGET_PATH, "utf8"));
}

test("current Noether sea provider accepts Fe/Ni toy response rows", () => {
  const report = buildNoetherSeaResponseSourceTargetCheck(readTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.input.schema, INPUT_SCHEMA);
  assert.equal(report.summary.status, "accepted_noether_sea_response_rows");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.providerObjectPass, true);
  assert.equal(report.summary.retainedWindowPass, true);
  assert.equal(report.summary.responseAgreementPass, true);
  assert.equal(report.summary.toyBindingRowsPass, true);
  assert.deepEqual(report.summary.missingRows, []);
  assert.equal(report.rowChecks.rho_NS.accepted, true);
  assert.equal(report.rowChecks.theta_sea.accepted, true);
  assert.equal(report.rowChecks.stress_strain_row.accepted, true);
  assert.equal(report.responseAgreementCheck.residual <= report.responseAgreementCheck.tolerance, true);
  assert.equal(report.toyBindingCheck.unconsumedRequiredRows.length, 0);
  assert.equal(
    report.toyBindingCheck.rowConsumption.status,
    "all_toy_bound_noether_sea_rows_accepted",
  );
  assert.deepEqual(report.toyBindingCheck.rowConsumption.acceptedRows, [
    "rho_NS",
    "theta_sea",
    "stress_strain_row",
    "causality_row",
  ]);
  assert.deepEqual(
    report.toyBindingCheck.rowConsumption.rows.rho_NS.directToyConsumers,
    {
      coefficients: ["alphaSea", "seaImbalancePenalty"],
      graphRules: ["noether_sea_polarization_reward"],
    },
  );
  assert.deepEqual(
    report.toyBindingCheck.rowConsumption.rows.stress_strain_row.directToyConsumers,
    {
      coefficients: ["alphaSea"],
      graphRules: ["noether_sea_polarization_reward"],
    },
  );
  assert.equal(
    report.toyBindingCheck.rowConsumption.rows.rho_NS.eventLedgerRef,
    "event-ledger-theta-sea-rho-ns-provider-0001",
  );
});

test("Noether sea checker does not advance when acoustic-elastic agreement drifts", () => {
  const target = readTarget();
  target.acousticElasticAgreement.C1111_X = 1;

  const report = buildNoetherSeaResponseSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "noether_sea_response_structure_mismatch");
  assert.equal(report.summary.structuralPass, false);
  assert.equal(report.summary.providerObjectPass, false);
  assert.equal(report.summary.responseAgreementPass, false);
  assert.deepEqual(report.summary.structuralFailures, [
    "providerObject",
    "acousticElasticAgreement",
  ]);
  assert.deepEqual(report.responseAgreementCheck.failures, [
    "numeric_residual_outside_refinement",
  ]);
});

test("Noether sea checker does not advance when a toy-bound row is not accepted", () => {
  const target = readTarget();
  target.responseRows.stress_strain_row.status = "attempt";

  const report = buildNoetherSeaResponseSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "noether_sea_response_structure_mismatch");
  assert.deepEqual(report.summary.missingRows, ["stress_strain_row"]);
  assert.equal(report.summary.toyBindingRowsPass, false);
  assert.deepEqual(report.toyBindingCheck.failures, [
    {
      scope: "coefficients",
      objectId: "alphaSea",
      rowId: "stress_strain_row",
      reason: "row_not_accepted",
    },
    {
      scope: "graphRules",
      objectId: "noether_sea_polarization_reward",
      rowId: "stress_strain_row",
      reason: "row_not_accepted",
    },
  ]);
  assert.equal(
    report.toyBindingCheck.rowConsumption.status,
    "blocked_missing_toy_bound_noether_sea_rows",
  );
  assert.deepEqual(report.toyBindingCheck.rowConsumption.missingRows, [
    "stress_strain_row",
  ]);
  assert.deepEqual(
    report.toyBindingCheck.rowConsumption.rows.stress_strain_row.directToyConsumers,
    {
      coefficients: ["alphaSea"],
      graphRules: ["noether_sea_polarization_reward"],
    },
  );
});

test("CLI require-accepted passes for the current Noether sea provider", () => {
  const output = execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--summary", "--require-accepted"],
    {
      encoding: "utf8",
    },
  );
  const report = JSON.parse(output);

  assert.equal(report.summary.status, "accepted_noether_sea_response_rows");
});
