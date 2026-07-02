import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  FE_NI_WINDOW,
  SCHEMA,
  buildIronGroupBindingCuspToySweep,
  validationErrors,
} from "../scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs", import.meta.url),
);

test("default toy sweep emits a priority-only Fe/Ni-window cusp report", () => {
  const report = buildIronGroupBindingCuspToySweep();

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.schema, SCHEMA);
  assert.equal(report.artifactStatus, "priority_only_first_executable_toy_graph_sweep");
  assert.equal(report.summary.firstFailure, null);
  assert.equal(report.summary.feNiWindowPass, true);
  assert.equal(report.summary.peak.A >= FE_NI_WINDOW.aMin, true);
  assert.equal(report.summary.peak.A <= FE_NI_WINDOW.aMax, true);
  assert.equal(report.summary.peak.Z >= FE_NI_WINDOW.zMin, true);
  assert.equal(report.summary.peak.Z <= FE_NI_WINDOW.zMax, true);
  assert.equal(report.sweepRows.length, 239);
  assert.equal(report.comparisonRows.deuteron.bound, true);
  assert.equal(report.comparisonRows.diproton.overbound, false);
  assert.equal(report.comparisonRows.saturation.triggered, false);
  assert.equal(report.comparisonRows.representativeHeavySplit.fissionFavoredByBindingGain, true);
  assert.equal(report.negativeControls.deuteron_unbound.triggered, false);
  assert.equal(report.negativeControls.diproton_overbound.triggered, false);
  assert.equal(report.negativeControls.no_saturation.triggered, false);
  assert.equal(report.negativeControls.wrong_cusp_region.triggered, false);
  assert.equal(report.negativeControls.hidden_fit.triggered, false);
  assert.equal(report.negativeControls.ledger_loss.triggered, false);
  assert.equal(report.negativeControls.shielded_energy_leak.triggered, false);
  assert.equal(report.authorization.acceptedNuclearBindingRecovery, false);
  assert.equal(report.authorization.equationMappingScoreMovement, "no_score_increase");
  assert.equal(
    report.coefficientSet.rows.every((row) => row.status === "shared_global_toy_diagnostic"),
    true,
  );
});

test("deuteron control fails closed when the p+n corridor reward is removed", () => {
  const report = buildIronGroupBindingCuspToySweep({
    coefficientOverrides: {
      pnCorridorPairReward: 0.1,
    },
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.summary.firstFailure, "deuteron_unbound");
  assert.equal(report.negativeControls.deuteron_unbound.triggered, true);
  assert.equal(report.summary.verdict, "fail_closed_deuteron_unbound");
  assert.equal(report.authorization.acceptedIronGroupCuspRecovery, false);
});

test("coulomb-free sweep fails closed as no-saturation before cusp promotion", () => {
  const report = buildIronGroupBindingCuspToySweep({
    coefficientOverrides: {
      alphaCoul: 0,
    },
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.summary.firstFailure, "no_saturation");
  assert.equal(report.negativeControls.no_saturation.triggered, true);
  assert.equal(report.summary.verdict, "fail_closed_no_saturation");
  assert.equal(report.authorization.contentPromotionAuthorized, false);
});

test("coefficient scope override trips the hidden-fit negative control", () => {
  const report = buildIronGroupBindingCuspToySweep({
    coefficientScopeOverrides: {
      alphaCoul: "element_specific",
    },
  });

  assert.deepEqual(validationErrors(report), []);
  assert.equal(report.summary.firstFailure, "hidden_fit");
  assert.equal(report.negativeControls.hidden_fit.triggered, true);
  assert.deepEqual(report.negativeControls.hidden_fit.hiddenFitRows, ["alphaCoul"]);
});

test("CLI summary emits JSON with the sweep verdict", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH, "--summary"], {
    encoding: "utf8",
  });
  const report = JSON.parse(output);

  assert.equal(report.schema, SCHEMA);
  assert.equal(report.summary.firstFailure, null);
  assert.equal(report.summary.feNiWindowPass, true);
  assert.equal(report.comparisonRows.deuteron.bound, true);
  assert.equal(report.authorization.acceptedNuclearBindingRecovery, false);
});
