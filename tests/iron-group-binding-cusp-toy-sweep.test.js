import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  FE_NI_WINDOW,
  SCHEMA,
  SOURCE_BINDING_REPORT_SCHEMA,
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
  assert.equal(report.summary.sourceBindingStatus, "blocked_missing_accepted_source_rows");
  assert.equal(report.summary.sourceBindingFirstMissingFamily, "branch_interface");
  assert.equal(
    report.summary.sourceBindingFirstMissingObject,
    "missing_accepted_nucleon_branch_interface_ledgers",
  );
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
  assert.equal(report.authorization.sourceBindingPreconditionsMet, false);
  assert.equal(report.authorization.contentPromotionAuthorized, false);
  assert.equal(report.authorization.equationMappingScoreMovement, "no_score_increase");
  assert.equal(
    report.coefficientSet.rows.every((row) => row.status === "shared_global_toy_diagnostic"),
    true,
  );
  assert.equal(report.sourceBinding.schema, SOURCE_BINDING_REPORT_SCHEMA);
  assert.equal(report.sourceBinding.summary.acceptedRequiredFamilyCount, 1);
  assert.deepEqual(report.sourceBinding.summary.missingRequiredFamilies, [
    "branch_interface",
    "confinement_functional",
    "weak_channel",
  ]);
  assert.equal(report.sourceBinding.familyResults.branch_interface.sourceStatus, "required_rows_missing");
  assert.equal(
    report.sourceBinding.familyResults.branch_interface.nearestCandidateId,
    "nucleon_branch_interface_source_target_current",
  );
  assert.deepEqual(report.sourceBinding.familyResults.branch_interface.missingOrRejectedFields, [
    "rows.nucleon_branch_interface_ledgers.accepted",
    "rows.pn_orientation_count.accepted",
    "rows.pp_orientation_count.accepted",
    "rows.same_record_energy_momentum_angular_momentum_ledger.accepted",
  ]);
  const branchCandidate = report.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "branch_interface",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.summary.status,
    "missing_accepted_branch_interface_rows",
  );
  assert.equal(branchCandidate.sourceTargetCheck.summary.algebraicPass, true);
  assert.equal(branchCandidate.sourceTargetCheck.differential.passed, true);
  assert.equal(
    report.sourceBinding.familyResults.confinement_functional.sourceStatus,
    "required_rows_missing",
  );
  assert.equal(
    report.sourceBinding.familyResults.confinement_functional.nearestCandidateId,
    "confinement_functional_source_target_current",
  );
  assert.deepEqual(report.sourceBinding.familyResults.confinement_functional.missingOrRejectedFields, [
    "rows.sigma_eff_extraction.accepted",
    "rows.color_singlet_nucleon_envelope.accepted",
    "rows.delta_E_corr_NN.accepted",
    "rows.no_open_color_far_field.accepted",
  ]);
  const confinementCandidate = report.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "confinement_functional",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.summary.status,
    "missing_accepted_confinement_functional_rows",
  );
  assert.equal(confinementCandidate.sourceTargetCheck.summary.structuralPass, true);
  assert.equal(
    confinementCandidate.sourceTargetCheck.summary.firstMissingObject,
    "missing_accepted_sigma_eff_extraction",
  );
  assert.equal(report.sourceBinding.familyResults.weak_channel.firstMissingObject, "missing_accepted_weak_quotient");
  const weakCandidate = report.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "weak_channel",
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.summary.status,
    "missing_accepted_weak_channel_rows",
  );
  assert.deepEqual(weakCandidate.sourceTargetCheck.summary.acceptedRows, [
    "weak_visible_branch_ledger",
    "weak_projection",
  ]);
  assert.equal(
    weakCandidate.sourceTargetCheck.summary.firstMissingObject,
    "missing_accepted_weak_quotient",
  );
  assert.equal(weakCandidate.sourceTargetCheck.summary.structuralPass, true);
  assert.equal(report.sourceBinding.familyResults.noether_sea_response.accepted, true);
  assert.equal(
    report.sourceBinding.familyResults.noether_sea_response.sourceStatus,
    "accepted_non_fixture_source",
  );
  const noetherCandidate = report.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "noether_sea_response",
  );
  assert.equal(
    noetherCandidate.sourceTargetCheck.summary.status,
    "accepted_noether_sea_response_rows",
  );
  assert.equal(noetherCandidate.sourceTargetCheck.summary.structuralPass, true);
  assert.equal(noetherCandidate.sourceTargetCheck.summary.responseAgreementPass, true);
  assert.equal(noetherCandidate.sourceTargetCheck.summary.toyBindingRowsPass, true);
  assert.deepEqual(report.sourceBinding.coefficientBindings.alphaCorr.sourceFamilies, [
    "branch_interface",
    "confinement_functional",
  ]);
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaCorr.rowBindingStatus,
    "blocked_missing_accepted_rows",
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.branch_interface.requiredRows,
    ["nucleon_branch_interface_ledgers"],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.confinement_functional.missingRows,
    ["delta_E_corr_NN"],
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaSea.requiredRowsByFamily.noether_sea_response.accepted,
    true,
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.betaValleySlope.firstMissingObject,
    "missing_accepted_weak_quotient",
  );
  assert.deepEqual(report.sourceBinding.graphRuleBindings.beta_stable_band_center, [
    "weak_channel",
  ]);
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.noether_sea_polarization_reward.rowBindingStatus,
    "all_required_rows_accepted",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check.firstMissingObject,
    "missing_accepted_delta_E_corr_NN",
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
  assert.equal(report.summary.sourceBindingStatus, "blocked_missing_accepted_source_rows");
  assert.equal(report.summary.feNiWindowPass, true);
  assert.equal(report.sourceBinding.summary.allRequiredFamiliesAccepted, false);
  assert.equal(report.comparisonRows.deuteron.bound, true);
  assert.equal(report.authorization.acceptedNuclearBindingRecovery, false);
});

test("CLI promotion-ready requirement fails while accepted source families are missing", () => {
  assert.throws(
    () => {
      execFileSync(process.execPath, [SCRIPT_PATH, "--summary", "--require-promotion-ready"], {
        encoding: "utf8",
      });
    },
    (error) => error.status === 1,
  );
});
