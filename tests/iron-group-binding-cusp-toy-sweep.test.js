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

const RELEASE_LEDGER_ROUTES = [
  "daughter_binding_rows",
  "emitted_products_when_present",
  "recoil",
  "heat",
  "photon_rows_when_present",
  "medium_exchange",
  "Noether_sea_update",
];

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
  assert.deepEqual(
    report.negativeControls.ledger_loss.declaredLedgerRoutes,
    RELEASE_LEDGER_ROUTES,
  );
  assert.equal(
    report.negativeControls.shielded_energy_leak
      .survivingNucleonShieldedEnergyUsed,
    false,
  );
  assert.deepEqual(
    report.comparisonRows.representativeHeavySplit.declaredLedgerRoutes,
    RELEASE_LEDGER_ROUTES,
  );
  assert.equal(report.releaseAccounting.survivingNucleonShieldedEnergyUsed, false);
  assert.deepEqual(
    report.releaseAccounting.ordinaryFissionFusionLedgerRoutes,
    RELEASE_LEDGER_ROUTES,
  );
  assert.match(report.releaseAccounting.promotionInvariant, /no corpus promotion/);
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
  assert.equal(report.sourceBinding.summary.allRequiredFamiliesAccepted, false);
  assert.equal(report.sourceBinding.summary.allCoefficientBindingsAccepted, false);
  assert.equal(report.sourceBinding.summary.allGraphRuleBindingsAccepted, false);
  assert.equal(report.sourceBinding.summary.rowEvidenceTracePass, true);
  assert.equal(report.sourceBinding.summary.sourceRowRequirementIndexPass, true);
  assert.equal(report.sourceBinding.summary.familyDistinctionLocksPass, true);
  assert.equal(report.sourceBinding.summary.partialSourceMarkerLocksPass, true);
  assert.equal(report.sourceBinding.summary.rowBindingCoveragePass, true);
  assert.equal(report.sourceBinding.summary.allPromotionBindingsAccepted, false);
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
  assert.equal(
    branchCandidate.sourceTargetCheck.summary.acceptedSourceRowProofTargetPass,
    true,
  );
  assert.equal(branchCandidate.sourceTargetCheck.summary.sourceAcquisitionPass, false);
  assert.equal(
    branchCandidate.sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.equal(
    branchCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap
      .firstMissingAcceptedSourceRow,
    "no_open_color_far_field",
  );
  const branchNoOpenColorBlocker =
    branchCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap.blockers[0];
  assert.deepEqual(branchNoOpenColorBlocker.blockedBranchRows, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
  ]);
  assert.deepEqual(branchNoOpenColorBlocker.directToyConsumers, {
    coefficients: [
      "alphaCorr",
      "alphaPair",
      "alphaPack",
      "dSat",
      "maxDegree",
      "pnCorridorPairReward",
      "pnPairMismatchCost",
      "ppCorridorPairReward",
      "ppPairMismatchCost",
    ],
    graphRules: [
      "bounded_degree_surface_depleted_corridor_estimator",
      "finite_tail_saturation_check",
    ],
  });
  assert.deepEqual(
    branchNoOpenColorBlocker.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  );
  assert.deepEqual(branchNoOpenColorBlocker.sourceAcquisitionRoute.feedsRowsAfterAcceptance, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
  ]);
  assert.deepEqual(branchNoOpenColorBlocker.sourceAcquisitionRoute.notRequiredBeforeAcceptance, [
    "accepted_branch_interface_rows",
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
  ]);
  assert.deepEqual(
    branchNoOpenColorBlocker.acceptedSourceRowProofTargets.no_open_color_far_field
      .requiredSufficientConditionRows,
    [
      "Delta_E_corr_NN_tail_limit",
      "bounded_residual_overlap",
      "large_r_zero_limit",
      "K_open_finite",
    ],
  );
  assert.deepEqual(
    branchNoOpenColorBlocker.acceptedSourceRowProofTargets
      .nucleon_branch_interface_ledgers.requiredSameRecordRows,
    [
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "pn_orientation_count",
      "pp_orientation_count",
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
  );
  assert.deepEqual(
    branchNoOpenColorBlocker.acceptedSourceRowProofTargets
      .nucleon_branch_interface_ledgers.directToyConsumers,
    {
      coefficients: ["alphaCorr", "alphaPair", "alphaPack", "dSat", "maxDegree"],
      graphRules: [
        "bounded_degree_surface_depleted_corridor_estimator",
        "finite_tail_saturation_check",
      ],
    },
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
    confinementCandidate.sourceTargetCheck.summary.acceptedSourceRowProofTargetPass,
    true,
  );
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
    confinementCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap
      .firstMissingAcceptedSourceRow,
    "accepted_proton_color_singlet_envelope",
  );
  const confinementProtonEnvelopeBlocker =
    confinementCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap.blockers[0];
  assert.deepEqual(confinementProtonEnvelopeBlocker.blockedConfinementRows, [
    "color_singlet_nucleon_envelope",
  ]);
  assert.deepEqual(confinementProtonEnvelopeBlocker.directToyConsumers, {
    coefficients: [
      "alphaSurf",
      "alphaPair",
      "alphaShell",
      "boundaryDegreeLoss",
    ],
    graphRules: ["bounded_degree_surface_depleted_corridor_estimator"],
  });
  assert.deepEqual(
    confinementProtonEnvelopeBlocker.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "proton_color_singlet_closure",
      "finite_envelope_boundary",
      "no_free_color_asymptotic_state",
    ],
  );
  const confinementFiniteRangeBlocker =
    confinementCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap.blockers.find(
      (blockerEntry) => blockerEntry.sourceRowId === "finite_range_residual",
    );
  assert.deepEqual(
    confinementFiniteRangeBlocker.sourceAcquisitionRoute.feedsRowsAfterAcceptance,
    [
      "finite_residual_corridor_overlap",
      "same_record_no_open_color_audit",
      "no_open_color_far_field",
      "no_free_color_asymptotic_state",
    ],
  );
  assert.deepEqual(
    confinementFiniteRangeBlocker.sourceAcquisitionRoute.notRequiredBeforeAcceptance,
    [
      "accepted_delta_E_corr_NN",
      "accepted_branch_interface_rows",
      "no_open_color_far_field",
      "same_record_no_open_color_audit",
      "no_free_color_asymptotic_state",
    ],
  );
  assert.deepEqual(
    confinementFiniteRangeBlocker.acceptedSourceRowProofTargets
      .no_open_color_far_field.requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
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
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_neutron_color_singlet_envelope.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_neutron_color_singlet_envelope.currentEvidenceStatus,
    "blocked_missing_no_free_color_audit",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_neutron_color_singlet_envelope.sourceTargetPath,
    "scripts/nuclear-atomic/neutron-color-singlet-envelope-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .no_free_color_asymptotic_state.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .no_free_color_asymptotic_state.currentEvidenceStatus,
    "blocked_missing_asymptotic_field_audit",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .no_free_color_asymptotic_state.sourceTargetPath,
    "scripts/nuclear-atomic/no-free-color-asymptotic-state-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_branch_interface.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_branch_interface.currentEvidenceStatus,
    "blocked_missing_same_record_branch_interface",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_branch_interface.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-branch-interface-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_sigma_eff_extraction.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_sigma_eff_extraction.currentEvidenceStatus,
    "blocked_missing_sigma_eff_extraction_acceptance",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_sigma_eff_extraction.sourceTargetPath,
    "scripts/nuclear-atomic/accepted-sigma-eff-extraction-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_color_singlet_nucleon_envelope.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_color_singlet_nucleon_envelope.currentEvidenceStatus,
    "blocked_missing_color_singlet_nucleon_envelope_acceptance",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_color_singlet_nucleon_envelope.sourceTargetPath,
    "scripts/nuclear-atomic/accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_branch_interface_rows.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_branch_interface_rows.currentEvidenceStatus,
    "blocked_missing_accepted_branch_interface_rows",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_branch_interface_rows.sourceTargetPath,
    "scripts/nuclear-atomic/accepted-branch-interface-rows-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .finite_residual_corridor_overlap.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .finite_residual_corridor_overlap.currentEvidenceStatus,
    "blocked_missing_finite_range_residual_audit",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .finite_residual_corridor_overlap.sourceTargetPath,
    "scripts/nuclear-atomic/finite-residual-corridor-overlap-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_delta_E_corr_NN.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_delta_E_corr_NN.currentEvidenceStatus,
    "blocked_missing_same_domain_residual_derivation",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .accepted_delta_E_corr_NN.sourceTargetPath,
    "scripts/nuclear-atomic/accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .finite_range_residual.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .finite_range_residual.currentEvidenceStatus,
    "blocked_missing_delta_E_corr_tail_audit",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .finite_range_residual.sourceTargetPath,
    "scripts/nuclear-atomic/finite-range-residual-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .color_singlet_closure.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .color_singlet_closure.currentEvidenceStatus,
    "blocked_missing_color_singlet_closure",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .color_singlet_closure.sourceTargetPath,
    "scripts/nuclear-atomic/color-singlet-closure-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_no_open_color_audit.accepted,
    false,
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_no_open_color_audit.currentEvidenceStatus,
    "blocked_missing_same_record_no_open_color_audit",
  );
  assert.equal(
    confinementCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .same_record_no_open_color_audit.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-no-open-color-audit-source-acquisition-blocker.v1.json",
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
  assert.equal(
    weakCandidate.sourceTargetCheck.summary.acceptedSourceRowProofTargetPass,
    true,
  );
  assert.equal(weakCandidate.sourceTargetCheck.summary.sourceAcquisitionPass, false);
  assert.equal(
    weakCandidate.sourceTargetCheck.summary.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap
      .firstMissingAcceptedSourceRow,
    "va_chirality_gate",
  );
  const weakVaChiralityBlocker =
    weakCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap.blockers[0];
  assert.equal(weakVaChiralityBlocker.sourceRowId, "va_chirality_gate");
  assert.deepEqual(
    weakVaChiralityBlocker.acceptedSourceRowProofTargets.va_chirality_gate
      .requiredChiralitySelectionRows,
    [
      "charged_current_left_channel_selection",
      "right_channel_charged_current_suppression",
      "va_chirality_row",
      "muon_decay_michel_parameter_binding",
    ],
  );
  assert.deepEqual(
    weakVaChiralityBlocker.sourceAcquisitionRoute.notRequiredBeforeAcceptance,
    [
      "ckm_overlap_readout",
      "pmns_overlap_readout",
      "weak_corridor_provenance",
      "effective_gauge_covariance_witness",
      "reaction_event_ledger",
      "noether_sea_response",
    ],
  );
  const weakReactionEventBlocker =
    weakCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap.blockers.find(
      (blockerEntry) => blockerEntry.sourceRowId === "reaction_event_ledger",
    );
  assert.deepEqual(weakReactionEventBlocker.directToyConsumers, {
    coefficients: ["alphaAsym", "betaValleySlope"],
    graphRules: ["beta_stable_band_center"],
  });
  assert.deepEqual(
    weakReactionEventBlocker.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_gate",
      "energy_momentum_angular_momentum_accounting",
    ],
  );
  assert.deepEqual(
    weakReactionEventBlocker.sourceAcquisitionRoute.feedsRowsAfterAcceptance,
    ["noether_sea_response"],
  );
  assert.deepEqual(
    weakReactionEventBlocker.acceptedSourceRowProofTargets.reaction_event_ledger
      .requiredConservationRows,
    [
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
    ],
  );
  assert.deepEqual(
    weakReactionEventBlocker.acceptedSourceRowProofTargets.reaction_event_ledger
      .requiredEventBalanceRows,
    [
      "incoming_weak_domain_rows",
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
      "weak_event_noether_sea_update_route",
    ],
  );
  assert.deepEqual(
    weakReactionEventBlocker.acceptedSourceRowProofTargets.reaction_event_ledger
      .directToyConsumers,
    {
      coefficients: ["alphaAsym", "betaValleySlope"],
      graphRules: ["beta_stable_band_center"],
    },
  );
  const weakNoetherResponseBlocker =
    weakCandidate.sourceTargetCheck.sourceAcquisitionBlockerMap.blockers.find(
      (blockerEntry) => blockerEntry.sourceRowId === "noether_sea_response",
    );
  assert.deepEqual(weakNoetherResponseBlocker.directToyConsumers, {
    coefficients: ["seaImbalancePenalty"],
    graphRules: [],
  });
  assert.deepEqual(
    weakNoetherResponseBlocker.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
  );
  assert.deepEqual(
    weakNoetherResponseBlocker.sourceAcquisitionRoute.mustRemainDistinctFrom,
    ["retained_window_noether_sea_response_provider"],
  );
  assert.deepEqual(
    weakNoetherResponseBlocker.acceptedSourceRowProofTargets.noether_sea_response
      .requiredUpdateRows,
    [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
  );
  assert.deepEqual(
    weakNoetherResponseBlocker.acceptedSourceRowProofTargets.noether_sea_response
      .directToyConsumers,
    {
      coefficients: ["seaImbalancePenalty"],
      graphRules: [],
    },
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
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .reaction_event_ledger.accepted,
    false,
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .reaction_event_ledger.currentEvidenceStatus,
    "blocked_missing_reaction_event_ledger",
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .reaction_event_ledger.sourceTargetPath,
    "scripts/equation-mapping/weak-reaction-event-ledger-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .noether_sea_response.accepted,
    false,
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .noether_sea_response.currentEvidenceStatus,
    "blocked_missing_weak_noether_sea_response",
  );
  assert.equal(
    weakCandidate.sourceTargetCheck.sourceAcquisitionCheck.targetChecks
      .noether_sea_response.sourceTargetPath,
    "scripts/equation-mapping/weak-noether-sea-response-source-acquisition-blocker.v1.json",
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
  assert.equal(
    noetherCandidate.sourceTargetCheck.toyBindingCheck.rowConsumption.status,
    "all_toy_bound_noether_sea_rows_accepted",
  );
  assert.deepEqual(
    noetherCandidate.sourceTargetCheck.toyBindingCheck.rowConsumption.rows.rho_NS
      .directToyConsumers,
    {
      coefficients: ["alphaSea", "seaImbalancePenalty"],
      graphRules: ["noether_sea_polarization_reward"],
    },
  );
  assert.deepEqual(
    noetherCandidate.sourceTargetCheck.toyBindingCheck.rowConsumption.rows
      .causality_row.directToyConsumers,
    {
      coefficients: [],
      graphRules: ["noether_sea_polarization_reward"],
    },
  );
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
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .branch_interface.rowEvidence.nucleon_branch_interface_ledgers
      .sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .branch_interface.rowEvidence.nucleon_branch_interface_ledgers
      .sourceAcquisitionRoute.feedsRowsAfterAcceptance,
    [
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .branch_interface.rowEvidence.nucleon_branch_interface_ledgers
      .sourceAcquisitionRoute.notRequiredBeforeAcceptance,
    [
      "accepted_branch_interface_rows",
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .branch_interface.rowEvidence.nucleon_branch_interface_ledgers
      .acceptedSourceRowProofTarget.requiredClosureRows,
    [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .branch_interface.rowEvidence.nucleon_branch_interface_ledgers
      .acceptedSourceRowProofTarget.requiredInequalities,
    ["W_pn > W_pp", "M_pn < M_pp"],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .branch_interface.rowEvidence.nucleon_branch_interface_ledgers
      .acceptedSourceRowProofTarget.requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .missingRows,
    [],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .localAcceptedRows,
    ["same_record_energy_momentum_angular_momentum_ledger"],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .promotionEligibleRows,
    [],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCoul.requiredRowsByFamily.branch_interface
      .rowEvidence.same_record_energy_momentum_angular_momentum_ledger,
    {
      row: "same_record_energy_momentum_angular_momentum_ledger",
      family: "branch_interface",
      candidateId: "nucleon_branch_interface_source_target_current",
      evidenceMode: "accepted_source_row",
      localAccepted: true,
      promotionEligible: false,
      sourceRowId: "same_record_energy_momentum_angular_momentum_ledger_target_0001",
      status: "accepted",
      currentEvidenceStatus: "accepted_non_fixture_source",
      acceptedEvidenceTrace: {
        claimLevel:
          "accepted source-row trace; not promotion evidence unless the owning source family is accepted",
        sourceRowId: "same_record_energy_momentum_angular_momentum_ledger_target_0001",
        status: "accepted",
        durableEvidenceStatus: "accepted_non_fixture_source",
        currentEvidenceStatus: "accepted_non_fixture_source",
        sourceTargetPath:
          "scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json",
        targetId: "same_record_energy_momentum_angular_momentum_ledger_target_0001",
        requiredScope:
          "one accepted same-record ledger that carries p+n and p+p branch-interface rows, energy, momentum, angular momentum, branch exposure, and Coulomb separation together",
        componentShapePass: true,
        reportSourceEvidence: {
          passed: true,
          requiredEvidenceStatus: "accepted_non_fixture_source",
        },
      },
    },
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
  const partialLocks = report.sourceBinding.partialSourceMarkerLocks;
  assert.deepEqual(
    partialLocks.map((lock) => lock.id),
    [
      "coefficient_alphaCoul_branch_interface_partial_source_marker_not_promotion",
      "coefficient_alphaAsym_weak_channel_partial_source_marker_not_promotion",
      "coefficient_betaValleySlope_weak_channel_partial_source_marker_not_promotion",
      "coefficient_seaImbalancePenalty_weak_channel_partial_source_marker_not_promotion",
      "coefficient_pnPairMismatchCost_branch_interface_partial_source_marker_not_promotion",
      "coefficient_ppPairMismatchCost_branch_interface_partial_source_marker_not_promotion",
      "coefficient_ppCoulombCost_branch_interface_partial_source_marker_not_promotion",
      "graphRule_beta_stable_band_center_weak_channel_partial_source_marker_not_promotion",
    ],
  );
  const alphaCoulPartialLock = partialLocks.find(
    (lock) =>
      lock.id ===
      "coefficient_alphaCoul_branch_interface_partial_source_marker_not_promotion",
  );
  assert.equal(alphaCoulPartialLock.kind, "coefficient");
  assert.equal(alphaCoulPartialLock.objectId, "alphaCoul");
  assert.equal(alphaCoulPartialLock.family, "branch_interface");
  assert.deepEqual(alphaCoulPartialLock.requiredRows, [
    "same_record_energy_momentum_angular_momentum_ledger",
  ]);
  assert.deepEqual(alphaCoulPartialLock.acceptedMarkerRows, [
    "same_record_energy_momentum_angular_momentum_ledger",
  ]);
  assert.deepEqual(alphaCoulPartialLock.missingRows, []);
  assert.equal(alphaCoulPartialLock.accepted, false);
  assert.equal(alphaCoulPartialLock.lockPass, true);
  assert.equal(
    alphaCoulPartialLock.markerStatus,
    "accepted_upstream_rows_present_but_owning_family_not_accepted",
  );
  assert.equal(
    alphaCoulPartialLock.firstMissingObject,
    "missing_accepted_nucleon_branch_interface_ledgers",
  );
  assert.equal(
    alphaCoulPartialLock.sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  const alphaAsymWeakPartialLock = partialLocks.find(
    (lock) =>
      lock.id ===
      "coefficient_alphaAsym_weak_channel_partial_source_marker_not_promotion",
  );
  assert.deepEqual(alphaAsymWeakPartialLock.requiredRows, [
    "weak_quotient",
    "weak_exposure_record",
    "reaction_event_ledger",
  ]);
  assert.deepEqual(alphaAsymWeakPartialLock.acceptedMarkerRows, [
    "weak_quotient",
    "weak_exposure_record",
  ]);
  assert.deepEqual(alphaAsymWeakPartialLock.missingRows, [
    "reaction_event_ledger",
  ]);
  assert.equal(
    alphaAsymWeakPartialLock.firstMissingObject,
    "missing_accepted_reaction_event_ledger",
  );
  assert.equal(
    alphaAsymWeakPartialLock.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    alphaAsymWeakPartialLock.markerStatus,
    "accepted_source_rows_present_but_binding_still_missing_required_rows",
  );
  assert.equal(alphaAsymWeakPartialLock.lockPass, true);
  const betaGraphWeakPartialLock = partialLocks.find(
    (lock) =>
      lock.id ===
      "graphRule_beta_stable_band_center_weak_channel_partial_source_marker_not_promotion",
  );
  assert.equal(betaGraphWeakPartialLock.kind, "graphRule");
  assert.deepEqual(betaGraphWeakPartialLock.acceptedMarkerRows, [
    "weak_quotient",
    "weak_exposure_record",
  ]);
  assert.deepEqual(betaGraphWeakPartialLock.missingRows, [
    "reaction_event_ledger",
  ]);
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.confinement_functional.missingRows,
    ["delta_E_corr_NN"],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .confinement_functional.rowEvidence.delta_E_corr_NN
      .sourceAcquisitionRoute,
    {
      sourceRowId: "accepted_delta_E_corr_NN",
      targetId: "accepted_delta_E_corr_NN_source_target_0001",
      currentEvidenceStatus: "blocked_missing_same_domain_residual_derivation",
      claimLevel:
        "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
      requiredRowsBeforeUse: [
        "accepted_sigma_eff_extraction",
        "accepted_color_singlet_nucleon_envelope",
        "accepted_branch_interface_rows",
        "finite_residual_corridor_overlap",
      ],
      requiredAcceptedRowsBeforeUse: [
        "accepted_sigma_eff_extraction",
        "accepted_color_singlet_nucleon_envelope",
        "accepted_branch_interface_rows",
        "finite_residual_corridor_overlap",
      ],
      feedsRowsAfterAcceptance: ["no_open_color_far_field"],
      notRequiredBeforeAcceptance: [],
    },
  );
  assert.deepEqual(report.sourceBinding.sourceRowRequirementIndex.summary, {
    totalRows: 18,
    promotionEligibleRowCount: 4,
    blockedRowCount: 14,
    firstBlockedFamily: "branch_interface",
    firstBlockedRow: "nucleon_branch_interface_ledgers",
    firstBlockedObject: "missing_accepted_nucleon_branch_interface_ledgers",
  });
  const sourceRowRequirement = Object.fromEntries(
    report.sourceBinding.sourceRowRequirementIndex.rows.map((row) => [
      row.id,
      row,
    ]),
  );
  assert.deepEqual(
    sourceRowRequirement["branch_interface.nucleon_branch_interface_ledgers"]
      .requiredBy,
    [
      { kind: "coefficient", objectId: "alphaCorr", bindingAccepted: false },
      { kind: "coefficient", objectId: "alphaPair", bindingAccepted: false },
      { kind: "coefficient", objectId: "alphaPack", bindingAccepted: false },
      { kind: "coefficient", objectId: "dSat", bindingAccepted: false },
      { kind: "coefficient", objectId: "maxDegree", bindingAccepted: false },
      {
        kind: "graphRule",
        objectId: "bounded_degree_surface_depleted_corridor_estimator",
        bindingAccepted: false,
      },
      {
        kind: "graphRule",
        objectId: "finite_tail_saturation_check",
        bindingAccepted: false,
      },
    ],
  );
  assert.equal(
    sourceRowRequirement["branch_interface.nucleon_branch_interface_ledgers"]
      .notPromotionEligibleReason,
    "missing_accepted_source_row",
  );
  assert.equal(
    sourceRowRequirement["branch_interface.nucleon_branch_interface_ledgers"]
      .sourceAcquisitionRoute.sourceRowId,
    "no_open_color_far_field",
  );
  assert.deepEqual(
    sourceRowRequirement["branch_interface.nucleon_branch_interface_ledgers"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: ["alphaCorr", "alphaPair", "alphaPack", "dSat", "maxDegree"],
      graphRules: [
        "bounded_degree_surface_depleted_corridor_estimator",
        "finite_tail_saturation_check",
      ],
    },
  );
  assert.deepEqual(
    sourceRowRequirement["branch_interface.nucleon_branch_interface_ledgers"]
      .acceptedSourceRowProofTarget.requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.no_open_color_far_field"]
      .acceptedSourceRowProofTarget.requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.no_open_color_far_field"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: ["alphaPack", "dSat", "maxDegree", "packSoftA"],
      graphRules: ["finite_tail_saturation_check"],
    },
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.sigma_eff_extraction"]
      .acceptedSourceRowProofTarget.requiredExtractionCertificateRows,
    [
      "same_domain_minimizer_or_variational_certificate",
      "refinement_stable_sigma_eff_row",
      "source_path_tying_extraction_to_accepted_upstream_rows",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.sigma_eff_extraction"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: [
        "alphaSea",
        "pnCorridorPairReward",
        "ppCorridorPairReward",
      ],
      graphRules: [],
    },
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.color_singlet_nucleon_envelope"]
      .acceptedSourceRowProofTarget.requiredEnvelopeBundleRows,
    [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.color_singlet_nucleon_envelope"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: [
        "alphaSurf",
        "alphaPair",
        "alphaShell",
        "boundaryDegreeLoss",
      ],
      graphRules: ["bounded_degree_surface_depleted_corridor_estimator"],
    },
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.delta_E_corr_NN"]
      .acceptedSourceRowProofTarget.requiredResidualDerivationRows,
    [
      "same_domain_residual_derivation",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.delta_E_corr_NN"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: [
        "alphaCorr",
        "alphaSurf",
        "alphaPair",
        "alphaShell",
        "alphaPack",
        "boundaryDegreeLoss",
        "dSat",
        "maxDegree",
        "packSoftA",
        "pnCorridorPairReward",
        "ppCorridorPairReward",
      ],
      graphRules: [
        "bounded_degree_surface_depleted_corridor_estimator",
        "finite_tail_saturation_check",
      ],
    },
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.finite_range_residual"]
      .acceptedSourceRowProofTarget.requiredTailLimitStatements,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["confinement_functional.finite_range_residual"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: ["alphaPack", "dSat", "maxDegree", "packSoftA"],
      graphRules: ["finite_tail_saturation_check"],
    },
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaSea.requiredRowsByFamily
      .confinement_functional.rowEvidence.sigma_eff_extraction
      .acceptedSourceRowProofTarget.requiredExtractionCertificateRows,
    [
      "same_domain_minimizer_or_variational_certificate",
      "refinement_stable_sigma_eff_row",
      "source_path_tying_extraction_to_accepted_upstream_rows",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings
      .bounded_degree_surface_depleted_corridor_estimator.requiredRowsByFamily
      .confinement_functional.rowEvidence.color_singlet_nucleon_envelope
      .acceptedSourceRowProofTarget.requiredEnvelopeBundleRows,
    [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily
      .confinement_functional.rowEvidence.delta_E_corr_NN
      .acceptedSourceRowProofTarget.requiredResidualDerivationRows,
    [
      "same_domain_residual_derivation",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.rowEvidence
      .finite_range_residual.acceptedSourceRowProofTarget
      .requiredTailLimitStatements,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement[
      "branch_interface.same_record_energy_momentum_angular_momentum_ledger"
    ].requiredBy,
    [
      { kind: "coefficient", objectId: "alphaCoul", bindingAccepted: false },
      {
        kind: "coefficient",
        objectId: "pnPairMismatchCost",
        bindingAccepted: false,
      },
      {
        kind: "coefficient",
        objectId: "ppPairMismatchCost",
        bindingAccepted: false,
      },
      { kind: "coefficient", objectId: "ppCoulombCost", bindingAccepted: false },
    ],
  );
  assert.equal(
    sourceRowRequirement[
      "branch_interface.same_record_energy_momentum_angular_momentum_ledger"
    ].localAccepted,
    true,
  );
  assert.equal(
    sourceRowRequirement[
      "branch_interface.same_record_energy_momentum_angular_momentum_ledger"
    ].promotionEligible,
    false,
  );
  assert.equal(
    sourceRowRequirement[
      "branch_interface.same_record_energy_momentum_angular_momentum_ledger"
    ].notPromotionEligibleReason,
    "owning_family_not_accepted",
  );
  assert.equal(
    sourceRowRequirement[
      "branch_interface.same_record_energy_momentum_angular_momentum_ledger"
    ].acceptedEvidenceTrace.durableEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    sourceRowRequirement[
      "branch_interface.same_record_energy_momentum_angular_momentum_ledger"
    ].acceptedEvidenceTrace.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json",
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.reaction_event_ledger"].requiredBy,
    [
      { kind: "coefficient", objectId: "alphaAsym", bindingAccepted: false },
      {
        kind: "coefficient",
        objectId: "betaValleySlope",
        bindingAccepted: false,
      },
      {
        kind: "graphRule",
        objectId: "beta_stable_band_center",
        bindingAccepted: false,
      },
    ],
  );
  assert.equal(
    sourceRowRequirement["weak_channel.reaction_event_ledger"]
      .firstMissingObject,
    "missing_accepted_reaction_event_ledger",
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.reaction_event_ledger"]
      .acceptedSourceRowProofTarget.requiredConservationRows,
    [
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.reaction_event_ledger"]
      .acceptedSourceRowProofTarget.requiredEventBalanceRows,
    [
      "incoming_weak_domain_rows",
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
      "weak_event_noether_sea_update_route",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.reaction_event_ledger"]
      .acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: ["alphaAsym", "betaValleySlope"],
      graphRules: ["beta_stable_band_center"],
    },
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.rowEvidence
      .finite_range_residual.sourceAcquisitionRoute.notRequiredBeforeAcceptance,
    [
      "accepted_delta_E_corr_NN",
      "accepted_branch_interface_rows",
      "no_open_color_far_field",
      "same_record_no_open_color_audit",
      "no_free_color_asymptotic_state",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.coefficientBindings.seaImbalancePenalty
      .requiredRowsByFamily.weak_channel.rowEvidence.noether_sea_response
      .sourceAcquisitionRoute.mustRemainDistinctFrom,
    ["retained_window_noether_sea_response_provider"],
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.noether_sea_response"]
      .sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.noether_sea_response"]
      .acceptedSourceRowProofTarget.requiredUpdateRows,
    [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
  );
  assert.deepEqual(
    sourceRowRequirement["weak_channel.noether_sea_response"]
      .acceptedSourceRowProofTarget.mustRemainDistinctFrom,
    ["retained_window_noether_sea_response_provider"],
  );
  assert.deepEqual(sourceRowRequirement["noether_sea_response.rho_NS"], {
    id: "noether_sea_response.rho_NS",
    family: "noether_sea_response",
    row: "rho_NS",
    requiredBy: [
      { kind: "coefficient", objectId: "alphaSea", bindingAccepted: true },
      {
        kind: "coefficient",
        objectId: "seaImbalancePenalty",
        bindingAccepted: true,
      },
      {
        kind: "graphRule",
        objectId: "noether_sea_polarization_reward",
        bindingAccepted: true,
      },
    ],
    evidenceMode: "accepted_source_row",
    localAccepted: true,
    promotionEligible: true,
    notPromotionEligibleReason: null,
    sourceRowId: "rho-NS-provider-0001",
    targetId: null,
    status: "accepted",
    currentEvidenceStatus: null,
    acceptedEvidenceTrace: {
      claimLevel:
        "accepted source-row trace; not promotion evidence unless the owning source family is accepted",
      sourceRowId: "rho-NS-provider-0001",
      status: "accepted",
      durableEvidenceStatus: "accepted_provider_source_object",
      currentEvidenceStatus: null,
      reportSourceEvidence: {
        passed: true,
        reason: "source_file",
        resolvedPath:
          "/Users/markmorris/vibe/architrino/scripts/spacetime/noether-sea-density-compression-provider.v1.json",
      },
      providerObjectCheck: {
        passed: true,
        reason: "accepted",
        providerStatus: "accepted",
      },
      group: "thetaSeaRows",
      eventLedgerRef: "event-ledger-theta-sea-rho-ns-provider-0001",
    },
    firstMissingObject: null,
    sourceAcquisitionFirstMissingObject: null,
  });
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaCorr.requiredRowsByFamily.confinement_functional
      .sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    report.sourceBinding.coefficientBindings.alphaSea.requiredRowsByFamily.noether_sea_response.accepted,
    true,
  );
  const noetherWeakLock = report.sourceBinding.familyDistinctionLocks.find(
    (lock) =>
      lock.id === "weak_channel_noether_sea_response_not_retained_window_provider",
  );
  assert.equal(noetherWeakLock.separationPass, true);
  assert.equal(noetherWeakLock.coefficient, "seaImbalancePenalty");
  assert.equal(noetherWeakLock.providerFamily, "noether_sea_response");
  assert.equal(
    noetherWeakLock.providerCandidateId,
    "theta_sea_rho_ns_density_compression_provider",
  );
  assert.equal(noetherWeakLock.providerAccepted, true);
  assert.deepEqual(noetherWeakLock.providerRows, ["rho_NS", "theta_sea"]);
  assert.equal(noetherWeakLock.weakFamily, "weak_channel");
  assert.equal(noetherWeakLock.weakCandidateId, "weak_channel_muon_projection_current");
  assert.deepEqual(noetherWeakLock.weakRows, [
    "weak_quotient",
    "noether_sea_response",
  ]);
  assert.equal(noetherWeakLock.weakChannelRowAccepted, false);
  assert.equal(noetherWeakLock.weakBindingAccepted, false);
  assert.equal(
    noetherWeakLock.weakFirstMissingObject,
    "missing_accepted_noether_sea_response",
  );
  assert.equal(
    noetherWeakLock.weakSourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(noetherWeakLock.distinctCandidateIds, true);
  assert.match(noetherWeakLock.rule, /cannot satisfy/);
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
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.noether_sea_polarization_reward
      .requiredRowsByFamily.noether_sea_response.promotionEligibleRows,
    ["rho_NS", "theta_sea", "stress_strain_row", "causality_row"],
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.noether_sea_polarization_reward
      .requiredRowsByFamily.noether_sea_response.rowEvidence.rho_NS
      .promotionEligible,
    true,
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .requiredRowsByFamily.weak_channel.localAcceptedRows,
    ["weak_quotient", "weak_exposure_record"],
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .requiredRowsByFamily.weak_channel.promotionEligibleRows,
    [],
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .requiredRowsByFamily.weak_channel.rowEvidence.weak_quotient
      .promotionEligible,
    false,
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .requiredRowsByFamily.weak_channel.rowEvidence.weak_quotient
      .acceptedEvidenceTrace.durableEvidenceStatus,
    "accepted_source_evidence_check",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.beta_stable_band_center
      .requiredRowsByFamily.weak_channel.rowEvidence.weak_quotient
      .acceptedEvidenceTrace.domainId,
    "D_weak_visible_attempt_0001",
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check.firstMissingObject,
    "missing_accepted_delta_E_corr_NN",
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.requiredRows,
    [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.missingRows,
    [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.rowEvidence
      .no_open_color_far_field.acceptedSourceRowProofTarget.requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
  );
  assert.deepEqual(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.confinement_functional.rowEvidence
      .no_open_color_far_field.acceptedSourceRowProofTarget.directToyConsumers,
    {
      coefficients: ["alphaPack", "dSat", "maxDegree", "packSoftA"],
      graphRules: ["finite_tail_saturation_check"],
    },
  );
  assert.equal(
    report.sourceBinding.graphRuleRowBindings.finite_tail_saturation_check
      .requiredRowsByFamily.branch_interface.sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.equal(
    report.sourceBinding.rowBindingCoverage.coefficients.total,
    report.coefficientSet.rows.length,
  );
  assert.equal(
    report.sourceBinding.rowBindingCoverage.coefficients.covered,
    report.coefficientSet.rows.length,
  );
  assert.deepEqual(report.sourceBinding.rowBindingCoverage.coefficients.uncovered, []);
  assert.equal(
    report.sourceBinding.rowBindingCoverage.graphRules.total,
    Object.keys(report.sourceBinding.graphRuleBindings).length,
  );
  assert.equal(
    report.sourceBinding.rowBindingCoverage.graphRules.covered,
    Object.keys(report.sourceBinding.graphRuleBindings).length,
  );
  assert.deepEqual(report.sourceBinding.rowBindingCoverage.graphRules.uncovered, []);
});

test("validation rejects missing coefficient and graph-rule row-binding coverage", () => {
  const report = buildIronGroupBindingCuspToySweep();

  const missingCoefficientRows = JSON.parse(JSON.stringify(report));
  delete missingCoefficientRows.sourceBinding.coefficientBindings.alphaCorr
    .requiredRowsByFamily.branch_interface;
  assert.equal(
    validationErrors(missingCoefficientRows).includes(
      "coefficient_source_rows_missing_alphaCorr_branch_interface",
    ),
    true,
  );

  const missingGraphRuleRows = JSON.parse(JSON.stringify(report));
  delete missingGraphRuleRows.sourceBinding.graphRuleRowBindings
    .finite_tail_saturation_check.requiredRowsByFamily.confinement_functional;
  assert.equal(
    validationErrors(missingGraphRuleRows).includes(
      "graph_rule_source_rows_missing_finite_tail_saturation_check_confinement_functional",
    ),
    true,
  );

  const missingCoverageSummary = JSON.parse(JSON.stringify(report));
  delete missingCoverageSummary.sourceBinding.rowBindingCoverage;
  assert.equal(
    validationErrors(missingCoverageSummary).includes(
      "source_binding_row_binding_coverage_missing",
    ),
    true,
  );

  const uncoveredCoverage = JSON.parse(JSON.stringify(report));
  uncoveredCoverage.sourceBinding.rowBindingCoverage.coefficients.uncovered = [
    "alphaCorr",
  ];
  assert.equal(
    validationErrors(uncoveredCoverage).includes(
      "coefficient_row_binding_coverage_uncovered_alphaCorr",
    ),
    true,
  );

  const missingRowEvidence = JSON.parse(JSON.stringify(report));
  delete missingRowEvidence.sourceBinding.coefficientBindings.alphaCoul
    .requiredRowsByFamily.branch_interface.rowEvidence
    .same_record_energy_momentum_angular_momentum_ledger;
  assert.equal(
    validationErrors(missingRowEvidence).includes(
      "coefficient_row_evidence_missing_alphaCoul_branch_interface_same_record_energy_momentum_angular_momentum_ledger",
    ),
    true,
  );

  const mismatchedRowEvidence = JSON.parse(JSON.stringify(report));
  mismatchedRowEvidence.sourceBinding.graphRuleRowBindings.noether_sea_polarization_reward
    .requiredRowsByFamily.noether_sea_response.rowEvidence.rho_NS
    .promotionEligible = false;
  assert.equal(
    validationErrors(mismatchedRowEvidence).includes(
      "graph_rule_row_evidence_mismatch_noether_sea_polarization_reward_noether_sea_response_rho_NS",
    ),
    true,
  );

  const mismatchedRowEvidenceSummary = JSON.parse(JSON.stringify(report));
  mismatchedRowEvidenceSummary.sourceBinding.summary.rowEvidenceTracePass = false;
  assert.equal(
    validationErrors(mismatchedRowEvidenceSummary).includes(
      "source_binding_row_evidence_trace_summary_mismatch",
    ),
    true,
  );

  const missingSourceAcquisitionRoute = JSON.parse(JSON.stringify(report));
  delete missingSourceAcquisitionRoute.sourceBinding.candidateResults.find(
    (candidate) => candidate.family === "branch_interface",
  ).sourceTargetCheck.sourceAcquisitionBlockerMap.blockers[0]
    .sourceAcquisitionRoute;
  assert.equal(
    validationErrors(missingSourceAcquisitionRoute).includes(
      "source_acquisition_route_missing_branch_interface_no_open_color_far_field",
    ),
    true,
  );

  const missingRowEvidenceRoute = JSON.parse(JSON.stringify(report));
  delete missingRowEvidenceRoute.sourceBinding.coefficientBindings.alphaCorr
    .requiredRowsByFamily.branch_interface.rowEvidence
    .nucleon_branch_interface_ledgers.sourceAcquisitionRoute;
  assert.equal(
    validationErrors(missingRowEvidenceRoute).includes(
      "coefficient_source_acquisition_route_missing_alphaCorr_branch_interface_nucleon_branch_interface_ledgers",
    ),
    true,
  );

  const missingAcceptedEvidenceTrace = JSON.parse(JSON.stringify(report));
  delete missingAcceptedEvidenceTrace.sourceBinding.coefficientBindings.alphaCoul
    .requiredRowsByFamily.branch_interface.rowEvidence
    .same_record_energy_momentum_angular_momentum_ledger.acceptedEvidenceTrace;
  assert.equal(
    validationErrors(missingAcceptedEvidenceTrace).includes(
      "coefficient_accepted_evidence_trace_missing_alphaCoul_branch_interface_same_record_energy_momentum_angular_momentum_ledger",
    ),
    true,
  );

  const missingAcceptedSourceRowProofTarget = JSON.parse(JSON.stringify(report));
  delete missingAcceptedSourceRowProofTarget.sourceBinding.coefficientBindings
    .alphaCorr.requiredRowsByFamily.branch_interface.rowEvidence
    .nucleon_branch_interface_ledgers.acceptedSourceRowProofTarget;
  assert.equal(
    validationErrors(missingAcceptedSourceRowProofTarget).includes(
      "coefficient_accepted_source_row_proof_target_missing_alphaCorr_branch_interface_nucleon_branch_interface_ledgers",
    ),
    true,
  );

  const missingBranchLimitAcceptedSourceRowProofTarget = JSON.parse(
    JSON.stringify(report),
  );
  delete missingBranchLimitAcceptedSourceRowProofTarget.sourceBinding
    .coefficientBindings.alphaCorr.requiredRowsByFamily.branch_interface
    .rowEvidence.nucleon_branch_interface_ledgers.acceptedSourceRowProofTarget
    .requiredLimitStatements;
  assert.equal(
    validationErrors(missingBranchLimitAcceptedSourceRowProofTarget).includes(
      "coefficient_accepted_source_row_proof_target_missing_alphaCorr_branch_interface_nucleon_branch_interface_ledgers",
    ),
    true,
  );

  const missingConfinementAcceptedSourceRowProofTarget = JSON.parse(
    JSON.stringify(report),
  );
  delete missingConfinementAcceptedSourceRowProofTarget.sourceBinding
    .graphRuleRowBindings.finite_tail_saturation_check.requiredRowsByFamily
    .confinement_functional.rowEvidence.no_open_color_far_field
    .acceptedSourceRowProofTarget;
  assert.equal(
    validationErrors(missingConfinementAcceptedSourceRowProofTarget).includes(
      "graph_rule_accepted_source_row_proof_target_missing_finite_tail_saturation_check_confinement_functional_no_open_color_far_field",
    ),
    true,
  );

  const missingSigmaAcceptedSourceRowProofTarget = JSON.parse(
    JSON.stringify(report),
  );
  delete missingSigmaAcceptedSourceRowProofTarget.sourceBinding
    .coefficientBindings.alphaSea.requiredRowsByFamily.confinement_functional
    .rowEvidence.sigma_eff_extraction.acceptedSourceRowProofTarget;
  assert.equal(
    validationErrors(missingSigmaAcceptedSourceRowProofTarget).includes(
      "coefficient_accepted_source_row_proof_target_missing_alphaSea_confinement_functional_sigma_eff_extraction",
    ),
    true,
  );

  const missingFiniteAcceptedSourceRowProofTarget = JSON.parse(
    JSON.stringify(report),
  );
  delete missingFiniteAcceptedSourceRowProofTarget.sourceBinding
    .graphRuleRowBindings.finite_tail_saturation_check.requiredRowsByFamily
    .confinement_functional.rowEvidence.finite_range_residual
    .acceptedSourceRowProofTarget;
  assert.equal(
    validationErrors(missingFiniteAcceptedSourceRowProofTarget).includes(
      "graph_rule_accepted_source_row_proof_target_missing_finite_tail_saturation_check_confinement_functional_finite_range_residual",
    ),
    true,
  );

  const missingWeakReactionAcceptedSourceRowProofTarget = JSON.parse(
    JSON.stringify(report),
  );
  delete missingWeakReactionAcceptedSourceRowProofTarget.sourceBinding
    .coefficientBindings.alphaAsym.requiredRowsByFamily.weak_channel.rowEvidence
    .reaction_event_ledger.acceptedSourceRowProofTarget;
  assert.equal(
    validationErrors(missingWeakReactionAcceptedSourceRowProofTarget).includes(
      "coefficient_accepted_source_row_proof_target_missing_alphaAsym_weak_channel_reaction_event_ledger",
    ),
    true,
  );

  const missingWeakReactionBalanceRows = JSON.parse(JSON.stringify(report));
  delete missingWeakReactionBalanceRows.sourceBinding.coefficientBindings.alphaAsym
    .requiredRowsByFamily.weak_channel.rowEvidence.reaction_event_ledger
    .acceptedSourceRowProofTarget.requiredEventBalanceRows;
  assert.equal(
    validationErrors(missingWeakReactionBalanceRows).includes(
      "coefficient_accepted_source_row_proof_target_missing_alphaAsym_weak_channel_reaction_event_ledger",
    ),
    true,
  );

  const missingWeakNoetherAcceptedSourceRowProofTarget = JSON.parse(
    JSON.stringify(report),
  );
  delete missingWeakNoetherAcceptedSourceRowProofTarget.sourceBinding
    .coefficientBindings.seaImbalancePenalty.requiredRowsByFamily.weak_channel
    .rowEvidence.noether_sea_response.acceptedSourceRowProofTarget;
  assert.equal(
    validationErrors(missingWeakNoetherAcceptedSourceRowProofTarget).includes(
      "coefficient_accepted_source_row_proof_target_missing_seaImbalancePenalty_weak_channel_noether_sea_response",
    ),
    true,
  );

  const missingSourceRowIndex = JSON.parse(JSON.stringify(report));
  delete missingSourceRowIndex.sourceBinding.sourceRowRequirementIndex;
  assert.equal(
    validationErrors(missingSourceRowIndex).includes(
      "source_binding_source_row_requirement_index_missing",
    ),
    true,
  );

  const mismatchedSourceRowIndexSummary = JSON.parse(JSON.stringify(report));
  mismatchedSourceRowIndexSummary.sourceBinding.summary.sourceRowRequirementIndexPass = false;
  assert.equal(
    validationErrors(mismatchedSourceRowIndexSummary).includes(
      "source_binding_source_row_requirement_index_summary_mismatch",
    ),
    true,
  );

  const driftedSourceRowIndex = JSON.parse(JSON.stringify(report));
  driftedSourceRowIndex.sourceBinding.sourceRowRequirementIndex.rows.find(
    (row) => row.id === "noether_sea_response.rho_NS",
  ).promotionEligible = false;
  assert.equal(
    validationErrors(driftedSourceRowIndex).includes(
      "source_binding_source_row_requirement_mismatch_noether_sea_response_rho_NS",
    ),
    true,
  );

  const falsePromotionSummary = JSON.parse(JSON.stringify(report));
  falsePromotionSummary.sourceBinding.summary.allPromotionBindingsAccepted = true;
  assert.equal(
    validationErrors(falsePromotionSummary).includes(
      "source_binding_summary_allPromotionBindingsAccepted_mismatch",
    ),
    true,
  );

  const falseMissingFamilySummary = JSON.parse(JSON.stringify(report));
  falseMissingFamilySummary.sourceBinding.summary.missingRequiredFamilies = [
    "weak_channel",
  ];
  falseMissingFamilySummary.sourceBinding.summary.firstMissingFamily =
    "weak_channel";
  assert.equal(
    validationErrors(falseMissingFamilySummary).includes(
      "source_binding_summary_missing_required_families_mismatch",
    ),
    true,
  );
  assert.equal(
    validationErrors(falseMissingFamilySummary).includes(
      "source_binding_summary_firstMissingFamily_mismatch",
    ),
    true,
  );

  const missingDistinctionLocks = JSON.parse(JSON.stringify(report));
  delete missingDistinctionLocks.sourceBinding.familyDistinctionLocks;
  assert.equal(
    validationErrors(missingDistinctionLocks).includes(
      "source_binding_family_distinction_locks_missing",
    ),
    true,
  );

  const failedDistinctionLock = JSON.parse(JSON.stringify(report));
  failedDistinctionLock.sourceBinding.familyDistinctionLocks[0].separationPass = false;
  assert.equal(
    validationErrors(failedDistinctionLock).includes(
      "source_binding_family_distinction_lock_failed_weak_channel_noether_sea_response_not_retained_window_provider",
    ),
    true,
  );

  const mismatchedDistinctionLockSummary = JSON.parse(JSON.stringify(report));
  mismatchedDistinctionLockSummary.sourceBinding.summary.familyDistinctionLocksPass = false;
  assert.equal(
    validationErrors(mismatchedDistinctionLockSummary).includes(
      "source_binding_family_distinction_lock_summary_mismatch",
    ),
    true,
  );

  const missingPartialMarkerLocks = JSON.parse(JSON.stringify(report));
  delete missingPartialMarkerLocks.sourceBinding.partialSourceMarkerLocks;
  assert.equal(
    validationErrors(missingPartialMarkerLocks).includes(
      "source_binding_partial_source_marker_locks_missing",
    ),
    true,
  );

  const failedPartialMarkerLock = JSON.parse(JSON.stringify(report));
  failedPartialMarkerLock.sourceBinding.partialSourceMarkerLocks[0].lockPass = false;
  assert.equal(
    validationErrors(failedPartialMarkerLock).includes(
      "source_binding_partial_source_marker_lock_failed_coefficient_alphaCoul_branch_interface_partial_source_marker_not_promotion",
    ),
    true,
  );

  const driftedWeakPartialMarkerRows = JSON.parse(JSON.stringify(report));
  const driftedWeakPartialMarkerLock =
    driftedWeakPartialMarkerRows.sourceBinding.partialSourceMarkerLocks.find(
      (lock) =>
        lock.id ===
        "coefficient_alphaAsym_weak_channel_partial_source_marker_not_promotion",
    );
  driftedWeakPartialMarkerLock.acceptedMarkerRows = ["weak_quotient"];
  assert.equal(
    validationErrors(driftedWeakPartialMarkerRows).includes(
      "source_binding_partial_source_marker_lock_accepted_marker_rows_mismatch_coefficient_alphaAsym_weak_channel_partial_source_marker_not_promotion",
    ),
    true,
  );

  const mismatchedPartialMarkerSummary = JSON.parse(JSON.stringify(report));
  mismatchedPartialMarkerSummary.sourceBinding.summary.partialSourceMarkerLocksPass = false;
  assert.equal(
    validationErrors(mismatchedPartialMarkerSummary).includes(
      "source_binding_partial_source_marker_lock_summary_mismatch",
    ),
    true,
  );

  const missingReleaseAccounting = JSON.parse(JSON.stringify(report));
  delete missingReleaseAccounting.releaseAccounting;
  assert.equal(
    validationErrors(missingReleaseAccounting).includes(
      "release_accounting_missing",
    ),
    true,
  );

  const shieldedEnergyLeak = JSON.parse(JSON.stringify(report));
  shieldedEnergyLeak.releaseAccounting.survivingNucleonShieldedEnergyUsed = true;
  assert.equal(
    validationErrors(shieldedEnergyLeak).includes(
      "release_accounting_shielded_energy_leak",
    ),
    true,
  );

  const missingReleaseRoute = JSON.parse(JSON.stringify(report));
  missingReleaseRoute.releaseAccounting.ordinaryFissionFusionLedgerRoutes =
    missingReleaseRoute.releaseAccounting.ordinaryFissionFusionLedgerRoutes.filter(
      (route) => route !== "Noether_sea_update",
    );
  assert.equal(
    validationErrors(missingReleaseRoute).includes(
      "release_accounting_ledger_route_missing_Noether_sea_update",
    ),
    true,
  );

  const missingHeavySplitRoute = JSON.parse(JSON.stringify(report));
  missingHeavySplitRoute.comparisonRows.representativeHeavySplit.declaredLedgerRoutes =
    missingHeavySplitRoute.comparisonRows.representativeHeavySplit.declaredLedgerRoutes.filter(
      (route) => route !== "photon_rows_when_present",
    );
  assert.equal(
    validationErrors(missingHeavySplitRoute).includes(
      "heavy_split_ledger_route_missing_photon_rows_when_present",
    ),
    true,
  );
  assert.equal(
    validationErrors(missingHeavySplitRoute).includes(
      "release_accounting_ledger_control_mismatch",
    ),
    true,
  );

  const mismatchedAuthorization = JSON.parse(JSON.stringify(report));
  mismatchedAuthorization.authorization.sourceBindingPreconditionsMet = true;
  assert.equal(
    validationErrors(mismatchedAuthorization).includes(
      "source_binding_precondition_authorization_mismatch",
    ),
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
  assert.equal(report.summary.sourceBindingStatus, "blocked_missing_accepted_source_rows");
  assert.equal(report.summary.feNiWindowPass, true);
  assert.equal(report.sourceBinding.summary.allRequiredFamiliesAccepted, false);
  assert.equal(report.comparisonRows.deuteron.bound, true);
  assert.deepEqual(
    report.releaseAccounting.ordinaryFissionFusionLedgerRoutes,
    RELEASE_LEDGER_ROUTES,
  );
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
