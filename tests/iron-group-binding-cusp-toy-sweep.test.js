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
  assert.equal(
    report.sourceBinding.familyResults.branch_interface.sourceStatus,
    "missing_accepted_branch_interface_rows",
  );
  assert.equal(
    report.sourceBinding.familyResults.branch_interface.nearestCandidateId,
    "nucleon_branch_interface_source_target_current",
  );
  assert.equal(
    report.sourceBinding.familyResults.branch_interface
      .sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.deepEqual(report.sourceBinding.familyResults.branch_interface.missingOrRejectedFields, [
    "rows.nucleon_branch_interface_ledgers.accepted",
    "rows.pn_orientation_count.accepted",
    "rows.pp_orientation_count.accepted",
  ]);
  const branchCandidate = report.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "branch_interface",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.summary.status,
    "missing_accepted_branch_interface_rows",
  );
  assert.equal(branchCandidate.sourceTargetCheck.summary.algebraicPass, true);
  assert.equal(branchCandidate.sourceTargetCheck.summary.sourceAcquisitionPass, false);
  assert.equal(
    branchCandidate.sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.deepEqual(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.rowChecks
      .pn_orientation_count.missingAcceptedSourceRows,
    ["no_open_color_far_field"],
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_proton_branch_interface_ledger.accepted,
    true,
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_proton_branch_interface_ledger.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_proton_branch_interface_ledger.sourceTargetPath,
    "scripts/nuclear-atomic/proton-branch-interface-ledger-retained-evidence.v1.json",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_neutron_branch_interface_ledger.accepted,
    true,
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_neutron_branch_interface_ledger.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_neutron_branch_interface_ledger.sourceTargetPath,
    "scripts/nuclear-atomic/neutron-branch-interface-ledger-retained-evidence.v1.json",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_energy_momentum_angular_momentum_ledger.accepted,
    true,
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_energy_momentum_angular_momentum_ledger.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_energy_momentum_angular_momentum_ledger.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json",
  );
  assert.equal(branchCandidate.sourceTargetCheck.differential.passed, true);
  assert.equal(
    report.sourceBinding.familyResults.confinement_functional.sourceStatus,
    "missing_accepted_confinement_functional_rows",
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
    "source_acquisition",
  ]);
  assert.equal(
    report.sourceBinding.familyResults.confinement_functional
      .sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  const confinementCandidate = report.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "confinement_functional",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.summary.status,
    "missing_accepted_confinement_functional_rows",
  );
  assert.equal(confinementCandidate.sourceTargetCheck.summary.structuralPass, true);
  assert.equal(confinementCandidate.sourceTargetCheck.summary.sourceEvidencePass, true);
  assert.equal(
    confinementCandidate.sourceTargetCheck.summary.firstMissingObject,
    "missing_accepted_sigma_eff_extraction",
  );
  assert.equal(confinementCandidate.sourceTargetCheck.summary.sourceAcquisitionPass, false);
  assert.equal(
    confinementCandidate.sourceTargetCheck.summary.sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.K_perp
      .accepted,
    true,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.K_perp
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.K_perp
      .sourceTargetPath,
    "scripts/nuclear-atomic/K-perp-transverse-stiffness-functional-retained-evidence.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.V_exc
      .accepted,
    true,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.V_exc
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.V_exc
      .sourceTargetPath,
    "scripts/nuclear-atomic/V-exc-excitation-potential-functional-retained-evidence.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.rho_NS
      .accepted,
    true,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.rho_NS
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.rho_NS
      .sourceTargetPath,
    "scripts/nuclear-atomic/rho-NS-confinement-domain-retained-evidence.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.chi_sea
      .accepted,
    true,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.chi_sea
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.chi_sea
      .sourceTargetPath,
    "scripts/nuclear-atomic/chi-sea-confinement-delay-factor-retained-evidence.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .axis_exceptionality_charge.accepted,
    true,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .axis_exceptionality_charge.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .axis_exceptionality_charge.sourceTargetPath,
    "scripts/nuclear-atomic/axis-exceptionality-charge-confinement-retained-evidence.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_noether_sea_response.accepted,
    true,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_noether_sea_response.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_noether_sea_response.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-noether-sea-response-confinement-retained-evidence.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_proton_color_singlet_envelope.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_proton_color_singlet_envelope.currentEvidenceStatus,
    "blocked_missing_no_free_color_audit",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_proton_color_singlet_envelope.sourceTargetPath,
    "scripts/nuclear-atomic/proton-color-singlet-envelope-source-acquisition-blocker.v1.json",
  );
  assert.deepEqual(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.rowChecks
      .sigma_eff_extraction.missingAcceptedSourceRows,
    [],
  );
  assert.equal(
    report.sourceBinding.familyResults.weak_channel.firstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    report.sourceBinding.familyResults.weak_channel
      .sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    report.sourceBinding.familyResults.weak_channel.sourceStatus,
    "missing_accepted_weak_channel_rows",
  );
  assert.deepEqual(report.sourceBinding.familyResults.weak_channel.missingOrRejectedFields, [
    "rows.va_chirality_gate.accepted",
    "rows.ckm_overlap_readout.accepted",
    "rows.pmns_overlap_readout.accepted",
    "rows.weak_corridor_provenance.accepted",
    "rows.effective_gauge_covariance_witness.accepted",
    "rows.reaction_event_ledger.accepted",
    "rows.noether_sea_response.accepted",
    "source_acquisition",
  ]);
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
    "weak_quotient",
    "weak_exposure_record",
  ]);
  assert.equal(
    weakCandidate.sourceTargetCheck.summary.firstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(weakCandidate.sourceTargetCheck.summary.sourceAcquisitionPass, false);
  assert.equal(
    weakCandidate.sourceTargetCheck.summary.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .weak_visible_branch_ledger.accepted,
    true,
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.weak_projection
      .accepted,
    true,
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks.weak_quotient
      .accepted,
    true,
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .weak_exposure_record.accepted,
    true,
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .va_chirality_gate.accepted,
    false,
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
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.branch_interface
      .sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .missingRows,
    [],
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .firstMissingObject,
    "missing_accepted_nucleon_branch_interface_ledgers",
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.confinement_functional.missingRows,
    ["delta_E_corr_NN"],
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.confinement_functional
      .sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaSea.requiredRowsByFamily.noether_sea_response.accepted,
    true,
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.betaValleySlope.firstMissingObject,
    "missing_accepted_reaction_event_ledger",
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.betaValleySlope.requiredRowsByFamily
      .weak_channel.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.deepEqual(report.sourceBinding.graphRuleBindings.beta_stable_band_center, [
    "weak_channel",
  ]);
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .firstMissingObject,
    "missing_accepted_reaction_event_ledger",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .requiredRowsByFamily.weak_channel.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.noether_sea_polarization_reward.rowBindingStatus,
    "all_required_rows_accepted",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check.firstMissingObject,
    "missing_accepted_delta_E_corr_NN",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.branch_interface.sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
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
