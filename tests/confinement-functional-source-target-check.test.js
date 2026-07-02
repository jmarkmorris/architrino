import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  INPUT_SCHEMA,
  OUTPUT_SCHEMA,
  buildConfinementFunctionalSourceTargetCheck,
} from "../scripts/nuclear-atomic/confinement-functional-source-target-check.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/confinement-functional-source-target-check.mjs",
    import.meta.url,
  ),
);
const TARGET_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/confinement-functional-source-target.v1.json",
    import.meta.url,
  ),
);
const PROTON_COLOR_SINGLET_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/proton-color-singlet-envelope-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const PROTON_COLOR_SINGLET_SUPPORT_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/proton-color-singlet-envelope-support-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const NEUTRON_COLOR_SINGLET_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/neutron-color-singlet-envelope-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const NEUTRON_COLOR_SINGLET_SUPPORT_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/neutron-color-singlet-envelope-support-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const NO_FREE_COLOR_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/no-free-color-asymptotic-state-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const SAME_RECORD_BRANCH_INTERFACE_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/same-record-branch-interface-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const FINITE_OVERLAP_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/finite-residual-corridor-overlap-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const ACCEPTED_SIGMA_EFF_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/accepted-sigma-eff-extraction-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const SIGMA_EFF_EXTRACTION_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/sigma-eff-extraction-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const ACCEPTED_COLOR_SINGLET_NUCLEON_ENVELOPE_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const ACCEPTED_BRANCH_INTERFACE_ROWS_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/accepted-branch-interface-rows-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const FINITE_RANGE_RESIDUAL_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/finite-range-residual-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const ACCEPTED_DELTA_E_CORR_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const DELTA_E_CORR_TAIL_LIMIT_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/delta-E-corr-NN-tail-limit-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const DELTA_E_CORR_TAIL_CORRIDOR_WEIGHT_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/delta-E-corr-NN-tail-corridor-weight-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const DELTA_E_CORR_UNIFORM_TAIL_BOUND_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/delta-E-corr-NN-uniform-tail-bound-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const DELTA_E_CORR_TAIL_CALCULUS_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/delta-E-corr-NN-tail-calculus-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const FINITE_RANGE_TAIL_SUPPORT_EVIDENCE_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/finite-range-tail-support-retained-evidence.v1.json",
    import.meta.url,
  ),
);
const COLOR_SINGLET_CLOSURE_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/color-singlet-closure-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const SAME_RECORD_NO_OPEN_COLOR_AUDIT_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/same-record-no-open-color-audit-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const OPEN_COLOR_PROJECTION_SURFACE_SUPPORT_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/open-color-projection-surface-support-retained-evidence.v1.json",
    import.meta.url,
  ),
);

function readTarget() {
  return JSON.parse(fs.readFileSync(TARGET_PATH, "utf8"));
}

function acceptedTarget() {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
    row.currentEvidenceStatus = "accepted_non_fixture_source";
    row.acceptedSourceRows = row.requiredSourceRows ?? [];
  }
  for (const sourceTarget of Object.values(target.sourceAcquisitionTargets ?? {})) {
    sourceTarget.status = "accepted";
    sourceTarget.currentEvidenceStatus = "accepted_non_fixture_source";
  }
  return target;
}

test("current confinement target passes structure but blocks accepted source rows", () => {
  const report = buildConfinementFunctionalSourceTargetCheck(readTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.input.schema, INPUT_SCHEMA);
  assert.equal(report.summary.status, "missing_accepted_confinement_functional_rows");
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.dependencyPass, true);
  assert.equal(report.summary.equationPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, true);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, []);
  assert.deepEqual(report.acceptedSourceRowProofTargets.summary.requiredRows, [
    "sigma_eff_extraction",
    "color_singlet_nucleon_envelope",
    "delta_E_corr_NN",
    "finite_range_residual",
    "no_open_color_far_field",
  ]);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.summary.sourceAcquisitionFirstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.status,
    "blocked_missing_accepted_source_rows",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingAcceptedSourceRow,
    "accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingObject,
    "missing_accepted_accepted_proton_color_singlet_envelope",
  );
  assert.equal(report.sourceAcquisitionBlockerMap.blockedSourceRowCount, 11);
  const firstBlocker = report.sourceAcquisitionBlockerMap.blockers[0];
  assert.deepEqual(firstBlocker.blockedConfinementRows, [
    "color_singlet_nucleon_envelope",
  ]);
  assert.deepEqual(firstBlocker.directToyConsumers, {
    coefficients: [
      "alphaSurf",
      "alphaPair",
      "alphaShell",
      "boundaryDegreeLoss",
    ],
    graphRules: ["bounded_degree_surface_depleted_corridor_estimator"],
  });
  assert.deepEqual(firstBlocker.sourceAcquisitionRoute, {
    claimLevel:
      "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
    requiredRowsBeforeUse: [
      "proton_color_singlet_closure",
      "finite_envelope_boundary",
      "no_free_color_asymptotic_state",
    ],
    requiredAcceptedRowsBeforeUse: [
      "proton_color_singlet_closure",
      "finite_envelope_boundary",
      "no_free_color_asymptotic_state",
    ],
    feedsRowsAfterAcceptance: ["color_singlet_nucleon_envelope"],
    notRequiredBeforeAcceptance: [],
  });
  assert.equal(
    firstBlocker.nextProofTarget,
    "accepted proton color-singlet envelope with finite boundary and no-free-color audit",
  );
  const sigmaEffProofTarget =
    report.acceptedSourceRowProofTargets.targets.sigma_eff_extraction;
  assert.deepEqual(sigmaEffProofTarget.requiredExtractionCertificateRows, [
    "same_domain_minimizer_or_variational_certificate",
    "refinement_stable_sigma_eff_row",
    "source_path_tying_extraction_to_accepted_upstream_rows",
  ]);
  assert.deepEqual(sigmaEffProofTarget.directToyConsumers, {
    coefficients: [
      "alphaSea",
      "pnCorridorPairReward",
      "ppCorridorPairReward",
    ],
    graphRules: [],
  });
  const colorEnvelopeProofTarget =
    report.acceptedSourceRowProofTargets.targets.color_singlet_nucleon_envelope;
  assert.deepEqual(colorEnvelopeProofTarget.requiredEnvelopeBundleRows, [
    "accepted_proton_color_singlet_envelope",
    "accepted_neutron_color_singlet_envelope",
    "no_free_color_asymptotic_state",
    "same_record_branch_interface",
  ]);
  assert.deepEqual(colorEnvelopeProofTarget.directToyConsumers, {
    coefficients: [
      "alphaSurf",
      "alphaPair",
      "alphaShell",
      "boundaryDegreeLoss",
    ],
    graphRules: ["bounded_degree_surface_depleted_corridor_estimator"],
  });
  const deltaCorrProofTarget =
    report.acceptedSourceRowProofTargets.targets.delta_E_corr_NN;
  assert.deepEqual(deltaCorrProofTarget.requiredResidualDerivationRows, [
    "same_domain_residual_derivation",
    "accepted_sigma_eff_extraction",
    "accepted_color_singlet_nucleon_envelope",
    "accepted_branch_interface_rows",
    "finite_residual_corridor_overlap",
  ]);
  assert.deepEqual(deltaCorrProofTarget.directToyConsumers, {
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
  });
  const finiteResidualProofTarget =
    report.acceptedSourceRowProofTargets.targets.finite_range_residual;
  assert.deepEqual(finiteResidualProofTarget.requiredTailLimitStatements, [
    "lim_R_to_infty_T_NN_R_eq_0",
    "O_NN_finite",
    "exists_R0_C_lambda_exp_decay_tail",
  ]);
  assert.deepEqual(finiteResidualProofTarget.directToyConsumers, {
    coefficients: ["alphaPack", "dSat", "maxDegree", "packSoftA"],
    graphRules: ["finite_tail_saturation_check"],
  });
  const noOpenProofTarget =
    report.acceptedSourceRowProofTargets.targets.no_open_color_far_field;
  assert.deepEqual(noOpenProofTarget.requiredAcceptedSourceRowsBeforeUse, [
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
    "accepted_proton_branch_interface_ledger",
    "accepted_neutron_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
  ]);
  assert.deepEqual(noOpenProofTarget.requiredSameRecordRows, [
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
    "accepted_proton_branch_interface_ledger",
    "accepted_neutron_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
    "same_record_noether_sea_response",
  ]);
  assert.deepEqual(noOpenProofTarget.requiredClosureRows, [
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
  ]);
  assert.deepEqual(noOpenProofTarget.requiredLimitStatements, [
    "lim_R_to_infty_N_open_R_eq_0",
    "N_open_R_le_K_open_T_NN_R_squared",
    "lim_R_to_infty_T_NN_R_eq_0",
  ]);
  assert.deepEqual(noOpenProofTarget.directToyConsumers, {
    coefficients: ["alphaPack", "dSat", "maxDegree", "packSoftA"],
    graphRules: ["finite_tail_saturation_check"],
  });
  const finiteRangeBlocker =
    report.sourceAcquisitionBlockerMap.blockers.find(
      (blocker) => blocker.sourceRowId === "finite_range_residual",
    );
  assert.deepEqual(
    finiteRangeBlocker.acceptedSourceRowProofTargets.no_open_color_far_field
      .requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
  );
  assert.equal(report.summary.toyBindingRowsPass, true);
  assert.equal(
    report.summary.firstMissingObject,
    "missing_accepted_color_singlet_nucleon_envelope",
  );
  assert.deepEqual(report.summary.missingRows, [
    "color_singlet_nucleon_envelope",
    "delta_E_corr_NN",
    "no_open_color_far_field",
  ]);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.K_perp.componentShapePass,
    true,
  );
  assert.equal(report.sourceAcquisitionCheck.targetChecks.K_perp.accepted, true);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.K_perp.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.K_perp.sourceTargetPath,
    "scripts/nuclear-atomic/K-perp-transverse-stiffness-functional-retained-evidence.v1.json",
  );
  assert.deepEqual(report.sourceAcquisitionCheck.targetChecks.K_perp.requiredLedgerComponents, [
    "transverse_stiffness_functional",
    "color_charge_domain",
    "sigma_eff_variation_record",
  ]);
  assert.equal(report.sourceAcquisitionCheck.targetChecks.V_exc.accepted, true);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.V_exc.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.V_exc.sourceTargetPath,
    "scripts/nuclear-atomic/V-exc-excitation-potential-functional-retained-evidence.v1.json",
  );
  assert.deepEqual(report.sourceAcquisitionCheck.targetChecks.V_exc.requiredLedgerComponents, [
    "excitation_potential_functional",
    "vacuum_exceptionality_profile",
    "rho_NS_chi_sea_arguments",
  ]);
  assert.equal(report.sourceAcquisitionCheck.targetChecks.rho_NS.accepted, true);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.rho_NS.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.rho_NS.sourceTargetPath,
    "scripts/nuclear-atomic/rho-NS-confinement-domain-retained-evidence.v1.json",
  );
  assert.deepEqual(report.sourceAcquisitionCheck.targetChecks.rho_NS.requiredLedgerComponents, [
    "retained_window_density_row",
    "same_record_noether_sea_response",
    "provider_source_path",
  ]);
  assert.equal(report.sourceAcquisitionCheck.targetChecks.chi_sea.accepted, true);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.chi_sea.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.chi_sea.sourceTargetPath,
    "scripts/nuclear-atomic/chi-sea-confinement-delay-factor-retained-evidence.v1.json",
  );
  assert.deepEqual(report.sourceAcquisitionCheck.targetChecks.chi_sea.requiredLedgerComponents, [
    "noether_sea_delay_factor_row",
    "same_record_noether_sea_response",
    "effective_speed_relation",
  ]);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.axis_exceptionality_charge.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.axis_exceptionality_charge.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.axis_exceptionality_charge.sourceTargetPath,
    "scripts/nuclear-atomic/axis-exceptionality-charge-confinement-retained-evidence.v1.json",
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.axis_exceptionality_charge.requiredLedgerComponents,
    [
      "axis_exceptionality_definition",
      "charge_normalization_row",
      "same_sigma_eff_domain",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_noether_sea_response.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_noether_sea_response.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_noether_sea_response.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-noether-sea-response-confinement-retained-evidence.v1.json",
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.same_record_noether_sea_response.requiredLedgerComponents,
    [
      "rho_NS",
      "theta_sea",
      "stress_strain_row",
      "same_event_ledger",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_color_singlet_envelope
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_color_singlet_envelope
      .currentEvidenceStatus,
    "blocked_missing_no_free_color_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_color_singlet_envelope
      .sourceTargetPath,
    "scripts/nuclear-atomic/proton-color-singlet-envelope-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.proton_color_singlet_closure
      .accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.proton_color_singlet_closure
      .requiredLedgerComponents,
    [
      "Pi_singlet_X_ref",
      "Pi_open_X_ref",
      "W_locked_pX_ref",
      "E_color_pX_bound",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.proton_color_singlet_closure
      .sourceTargetPath,
    "scripts/nuclear-atomic/proton-color-singlet-envelope-support-retained-evidence.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_envelope_boundary.accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.finite_envelope_boundary
      .requiredLedgerComponents,
    [
      "R_p",
      "R_n",
      "refinement_window",
      "same_sigma_eff_domain",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_envelope_boundary
      .sourceTargetPath,
    "scripts/nuclear-atomic/proton-color-singlet-envelope-support-retained-evidence.v1.json",
  );
  const protonSupportEvidence = JSON.parse(
    fs.readFileSync(PROTON_COLOR_SINGLET_SUPPORT_EVIDENCE_PATH, "utf8"),
  );
  assert.deepEqual(
    protonSupportEvidence.acceptedBoundary.acceptedSourceRowsByThisEvidence,
    ["proton_color_singlet_closure", "finite_envelope_boundary"],
  );
  assert.equal(protonSupportEvidence.protonColorSingletClosure.E_color_pX, 0);
  assert.equal(protonSupportEvidence.protonColorSingletClosure.Delta_color_pX, 0);
  assert.equal(protonSupportEvidence.finiteEnvelopeBoundary.R_p, 1);
  assert.equal(protonSupportEvidence.finiteEnvelopeBoundary.R_n, 1);
  assert.equal(
    protonSupportEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "accepted_proton_color_singlet_envelope",
    ),
    true,
  );
  assert.equal(
    protonSupportEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "no_free_color_asymptotic_state",
    ),
    true,
  );
  const protonBlocker = JSON.parse(
    fs.readFileSync(PROTON_COLOR_SINGLET_BLOCKER_PATH, "utf8"),
  );
  assert.equal(protonBlocker.sourceKind, "accepted_proton_color_singlet_envelope");
  assert.equal(protonBlocker.currentStatus, "blocked_missing_no_free_color_audit");
  assert.deepEqual(
    protonBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    protonBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "accepted_proton_color_singlet_envelope",
    ),
    true,
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket.sourceRowId,
    "accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket.minimumFields.includes(
      "E_color_pX_bound_ref",
    ),
    true,
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket.minimumFields.includes(
      "noFreeColorAsymptoticStateRef",
    ),
    true,
  );
  assert.deepEqual(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket
      .acceptedInputsAlreadyAvailable,
    [
      "accepted_proton_branch_interface_ledger",
      "same_record_noether_sea_response",
      "proton_color_singlet_closure",
      "finite_envelope_boundary",
    ],
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("proton_color_singlet_closure"),
    false,
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("finite_envelope_boundary"),
    false,
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("no_free_color_asymptotic_state"),
    true,
  );
  assert.deepEqual(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket
      .derivedRowsIfAccepted,
    ["proton_color_singlet_closure", "finite_envelope_boundary"],
  );
  assert.equal(
    protonBlocker.protonColorSingletEnvelopeCertificateRequestPacket
      .notAcceptedByThisPacket.includes("accepted_proton_color_singlet_envelope"),
    true,
  );
  assert.equal(
    protonBlocker.candidateProtonColorSingletEnvelopeLemma.lemmaId,
    "proton_projection_boundary_no_free_color_implies_envelope_support_0001",
  );
  assert.deepEqual(
    protonBlocker.candidateProtonColorSingletEnvelopeLemma.derivedRowsIfAccepted,
    ["proton_color_singlet_closure", "finite_envelope_boundary"],
  );
  assert.equal(
    protonBlocker.candidateProtonColorSingletEnvelopeLemma.proofSteps.some(
      (step) => step.stepId === "bounded_open_color_exposure",
    ),
    true,
  );
  assert.equal(
    protonBlocker.candidateProtonColorSingletEnvelopeLemma
      .missingAcceptanceRows.includes("no_free_color_asymptotic_state"),
    true,
  );
  assert.equal(
    protonBlocker.candidateProtonColorSingletEnvelopeLemma
      .missingAcceptanceRows.includes("bounded_E_color_pX_le_Delta_color_pX"),
    false,
  );
  assert.equal(
    protonBlocker.candidateProtonColorSingletEnvelopeLemma
      .missingAcceptanceRows.includes("finite_R_p"),
    false,
  );
  assert.equal(
    protonBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "proton_color_singlet_closure",
    ),
    true,
  );
  assert.equal(protonBlocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_color_singlet_envelope
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_color_singlet_envelope
      .currentEvidenceStatus,
    "blocked_missing_no_free_color_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_color_singlet_envelope
      .sourceTargetPath,
    "scripts/nuclear-atomic/neutron-color-singlet-envelope-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.neutron_color_singlet_closure
      .accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.neutron_color_singlet_closure
      .requiredLedgerComponents,
    [
      "Pi_singlet_X_ref",
      "Pi_open_X_ref",
      "W_locked_nX_ref",
      "E_color_nX_bound",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.neutron_color_singlet_closure
      .sourceTargetPath,
    "scripts/nuclear-atomic/neutron-color-singlet-envelope-support-retained-evidence.v1.json",
  );
  const neutronSupportEvidence = JSON.parse(
    fs.readFileSync(NEUTRON_COLOR_SINGLET_SUPPORT_EVIDENCE_PATH, "utf8"),
  );
  assert.deepEqual(
    neutronSupportEvidence.acceptedBoundary.acceptedSourceRowsByThisEvidence,
    ["neutron_color_singlet_closure"],
  );
  assert.equal(
    neutronSupportEvidence.neutronColorSingletClosure.E_color_nX,
    0,
  );
  assert.equal(
    neutronSupportEvidence.neutronColorSingletClosure.Delta_color_nX,
    0,
  );
  assert.equal(
    neutronSupportEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "accepted_neutron_color_singlet_envelope",
    ),
    true,
  );
  assert.equal(
    neutronSupportEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "no_open_color_far_field",
    ),
    true,
  );
  const neutronBlocker = JSON.parse(
    fs.readFileSync(NEUTRON_COLOR_SINGLET_BLOCKER_PATH, "utf8"),
  );
  assert.equal(neutronBlocker.sourceKind, "accepted_neutron_color_singlet_envelope");
  assert.equal(neutronBlocker.currentStatus, "blocked_missing_no_free_color_audit");
  assert.deepEqual(
    neutronBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    neutronBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "accepted_neutron_color_singlet_envelope",
    ),
    true,
  );
  assert.deepEqual(
    neutronBlocker.neutronColorSingletEnvelopeCertificateRequestPacket
      .acceptedInputsAlreadyAvailable,
    [
      "accepted_neutron_branch_interface_ledger",
      "same_record_noether_sea_response",
      "neutron_color_singlet_closure",
      "finite_envelope_boundary",
    ],
  );
  assert.equal(
    neutronBlocker.neutronColorSingletEnvelopeCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("neutron_color_singlet_closure"),
    false,
  );
  assert.equal(
    neutronBlocker.neutronColorSingletEnvelopeCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("no_free_color_asymptotic_state"),
    true,
  );
  assert.deepEqual(
    neutronBlocker.neutronColorSingletEnvelopeCertificateRequestPacket
      .derivedRowsIfAccepted,
    ["neutron_color_singlet_closure"],
  );
  assert.equal(
    neutronBlocker.candidateNeutronColorSingletEnvelopeLemma.lemmaId,
    "neutron_projection_boundary_no_free_color_implies_envelope_support_0001",
  );
  assert.deepEqual(
    neutronBlocker.candidateNeutronColorSingletEnvelopeLemma.derivedRowsIfAccepted,
    ["neutron_color_singlet_closure"],
  );
  assert.equal(
    neutronBlocker.candidateNeutronColorSingletEnvelopeLemma.proofSteps.some(
      (step) => step.stepId === "bounded_open_color_exposure",
    ),
    true,
  );
  assert.equal(
    neutronBlocker.candidateNeutronColorSingletEnvelopeLemma
      .missingAcceptanceRows.includes("no_free_color_asymptotic_state"),
    true,
  );
  assert.equal(neutronBlocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.no_free_color_asymptotic_state
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.no_free_color_asymptotic_state
      .currentEvidenceStatus,
    "blocked_missing_asymptotic_field_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.no_free_color_asymptotic_state
      .sourceTargetPath,
    "scripts/nuclear-atomic/no-free-color-asymptotic-state-source-acquisition-blocker.v1.json",
  );
  const noFreeColorBlocker = JSON.parse(
    fs.readFileSync(NO_FREE_COLOR_BLOCKER_PATH, "utf8"),
  );
  assert.equal(noFreeColorBlocker.sourceKind, "no_free_color_asymptotic_state");
  assert.equal(
    noFreeColorBlocker.currentStatus,
    "blocked_missing_asymptotic_field_audit",
  );
  assert.deepEqual(
    noFreeColorBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    noFreeColorBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "no_free_color_asymptotic_state",
    ),
    true,
  );
  assert.equal(
    noFreeColorBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    noFreeColorBlocker.asymptoticFieldAuditRequestPacket.sourceRowId,
    "asymptotic_field_audit",
  );
  assert.equal(
    noFreeColorBlocker.asymptoticFieldAuditRequestPacket.minimumFields.includes(
      "lim_R_to_infty_sup_X_E_color_pX_R_eq_0_ref",
    ),
    true,
  );
  assert.equal(
    noFreeColorBlocker.asymptoticFieldAuditRequestPacket.minimumFields.includes(
      "lim_R_to_infty_sup_X_E_color_nX_R_eq_0_ref",
    ),
    true,
  );
  assert.deepEqual(
    noFreeColorBlocker.asymptoticFieldAuditRequestPacket.derivedRowsIfAccepted,
    ["asymptotic_field_audit"],
  );
  assert.equal(
    noFreeColorBlocker.asymptoticFieldAuditRequestPacket.notAcceptedByThisPacket.includes(
      "no_free_color_asymptotic_state",
    ),
    true,
  );
  assert.equal(
    noFreeColorBlocker.candidateNoFreeColorAsymptoticAuditLemma.lemmaId,
    "finite_envelope_open_projection_limits_imply_asymptotic_field_audit_0001",
  );
  assert.equal(
    noFreeColorBlocker.candidateNoFreeColorAsymptoticAuditLemma.proofSteps.some(
      (step) => step.stepId === "proton_open_projection_zero_limit",
    ),
    true,
  );
  assert.equal(
    noFreeColorBlocker.candidateNoFreeColorAsymptoticAuditLemma
      .missingAcceptanceRows.includes("finite_range_residual"),
    true,
  );
  assert.equal(
    noFreeColorBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "asymptotic_field_audit",
    ),
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_branch_interface
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_branch_interface
      .currentEvidenceStatus,
    "blocked_missing_same_record_branch_interface",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_branch_interface
      .sourceTargetPath,
    "scripts/nuclear-atomic/same-record-branch-interface-source-acquisition-blocker.v1.json",
  );
  const sameRecordBranchInterfaceBlocker = JSON.parse(
    fs.readFileSync(SAME_RECORD_BRANCH_INTERFACE_BLOCKER_PATH, "utf8"),
  );
  assert.equal(
    sameRecordBranchInterfaceBlocker.sourceKind,
    "same_record_branch_interface",
  );
  assert.equal(
    sameRecordBranchInterfaceBlocker.currentStatus,
    "blocked_missing_same_record_branch_interface",
  );
  assert.deepEqual(
    sameRecordBranchInterfaceBlocker.localEvidenceBoundary
      .acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    sameRecordBranchInterfaceBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "same_record_branch_interface",
    ),
    true,
  );
  assert.equal(
    sameRecordBranchInterfaceBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_sigma_eff_extraction
      .accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_sigma_eff_extraction
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_sigma_eff_extraction
      .sourceTargetPath,
    "scripts/nuclear-atomic/sigma-eff-extraction-retained-evidence.v1.json",
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.accepted_sigma_eff_extraction
      .requiredLedgerComponents,
    [
      "K_perp",
      "V_exc",
      "rho_NS",
      "chi_sea",
      "axis_exceptionality_charge",
      "same_record_noether_sea_response",
      "same_domain_minimizer_or_variational_certificate",
      "refinement_stable_sigma_eff_row",
      "source_path_tying_extraction_to_accepted_upstream_rows",
    ],
  );
  const sigmaEffEvidence = JSON.parse(
    fs.readFileSync(SIGMA_EFF_EXTRACTION_EVIDENCE_PATH, "utf8"),
  );
  assert.equal(
    sigmaEffEvidence.sourceKind,
    "sigma_eff_extraction",
  );
  assert.deepEqual(
    sigmaEffEvidence.acceptedBoundary.acceptedSourceRowsByThisEvidence,
    ["sigma_eff_extraction", "accepted_sigma_eff_extraction"],
  );
  assert.equal(
    sigmaEffEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "Delta_E_corr_NN_tail_limit",
    ),
    true,
  );
  assert.equal(
    sigmaEffEvidence.sameDomainExtractionCertificate.stationarityResidual,
    0,
  );
  assert.equal(
    sigmaEffEvidence.refinementStableSigmaEffRow.refinementStatement.includes(
      "not a grid-only or sample-only value",
    ),
    true,
  );
  const acceptedSigmaEffBlocker = JSON.parse(
    fs.readFileSync(ACCEPTED_SIGMA_EFF_BLOCKER_PATH, "utf8"),
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionScaffold
      .sigmaEffDefinition,
    "\\sigma_{\\mathrm{eff}}(Q;\\rho_{\\text{NS}},\\chi_{\\text{sea}})=\\inf_{a,f}\\mathcal S_{\\sigma}[a,f;Q,\\rho_{\\text{NS}},\\chi_{\\text{sea}}]",
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionScaffold
      .sameRecordConstraint.includes("\\operatorname{record}(K_{\\perp})"),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionScaffold
      .requiredAcceptedRowsBeforeUse.includes("same_record_noether_sea_response"),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionScaffold
      .feedsRowsAfterAcceptance.includes("delta_E_corr_NN"),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionScaffold
      .coefficientLocks.includes("alphaSea"),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionScaffold
      .coefficientExclusion.includes("element-indexed coefficient"),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma.lemmaId,
    "sigma_eff_same_domain_variational_certificate_0001",
  );
  assert.deepEqual(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma
      .derivedRowsIfAccepted,
    [
      "same_domain_minimizer_or_variational_certificate",
      "refinement_stable_sigma_eff_row",
      "source_path_tying_extraction_to_accepted_upstream_rows",
    ],
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma.proofSteps.some(
      (step) => step.stepId === "coercive_existence",
    ),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma.proofSteps.some(
      (step) => step.stepId === "stationarity_residual",
    ),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma.proofSteps.some(
      (step) => step.stepId === "refinement_stability",
    ),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma
      .missingAcceptanceRows.includes(
        "accepted_coercive_lower_bound_for_S_sigma",
      ),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.candidateSigmaEffExtractionLemma
      .feedsRowsAfterAcceptance.includes("Delta_E_corr_NN_tail_limit"),
    true,
  );
  assert.equal(
    acceptedSigmaEffBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .accepted_color_singlet_nucleon_envelope.accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .accepted_color_singlet_nucleon_envelope.currentEvidenceStatus,
    "blocked_missing_color_singlet_nucleon_envelope_acceptance",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .accepted_color_singlet_nucleon_envelope.sourceTargetPath,
    "scripts/nuclear-atomic/accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json",
  );
  const acceptedColorSingletNucleonEnvelopeBlocker = JSON.parse(
    fs.readFileSync(
      ACCEPTED_COLOR_SINGLET_NUCLEON_ENVELOPE_BLOCKER_PATH,
      "utf8",
    ),
  );
  assert.equal(
    acceptedColorSingletNucleonEnvelopeBlocker.sourceKind,
    "accepted_color_singlet_nucleon_envelope",
  );
  assert.equal(
    acceptedColorSingletNucleonEnvelopeBlocker.currentStatus,
    "blocked_missing_color_singlet_nucleon_envelope_acceptance",
  );
  assert.deepEqual(
    acceptedColorSingletNucleonEnvelopeBlocker.localEvidenceBoundary
      .acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    acceptedColorSingletNucleonEnvelopeBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "accepted_color_singlet_nucleon_envelope",
    ),
    true,
  );
  assert.equal(
    acceptedColorSingletNucleonEnvelopeBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_branch_interface_rows
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_branch_interface_rows
      .currentEvidenceStatus,
    "blocked_missing_accepted_branch_interface_rows",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_branch_interface_rows
      .sourceTargetPath,
    "scripts/nuclear-atomic/accepted-branch-interface-rows-source-acquisition-blocker.v1.json",
  );
  const acceptedBranchInterfaceRowsBlocker = JSON.parse(
    fs.readFileSync(ACCEPTED_BRANCH_INTERFACE_ROWS_BLOCKER_PATH, "utf8"),
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.sourceKind,
    "accepted_branch_interface_rows",
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.currentStatus,
    "blocked_missing_accepted_branch_interface_rows",
  );
  assert.deepEqual(
    acceptedBranchInterfaceRowsBlocker.localEvidenceBoundary
      .acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "accepted_branch_interface_rows",
    ),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .bundleTuple,
    "\\mathcal B_{\\mathrm{br}}=(B_{pn},B_{pp},L_{E\\mathbf p\\mathbf J},\\mathcal C_{\\mathrm{no\\ open}},\\Gamma_p,\\Gamma_n)",
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .channelDifferentialCriterion,
    "W_{pn}>W_{pp}\\;\\wedge\\;M_{pn}<M_{pp}",
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .sameRecordConstraint.includes(
        "\\operatorname{record}(\\mathcal C_{\\mathrm{no\\ open}})",
      ),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .requiredAcceptedRowsBeforeUse.includes("no_open_color_far_field"),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .feedsRowsAfterAcceptance.includes("accepted_delta_E_corr_NN"),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .coefficientLocks.includes("pnCorridorPairReward"),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .graphRuleLocks.includes("finite_tail_saturation_check"),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.candidateBranchInterfaceRowBundleScaffold
      .coefficientExclusion.includes("element-indexed coefficient"),
    true,
  );
  assert.equal(
    acceptedBranchInterfaceRowsBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_residual_corridor_overlap
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_residual_corridor_overlap
      .currentEvidenceStatus,
    "blocked_missing_finite_range_residual_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_residual_corridor_overlap
      .sourceTargetPath,
    "scripts/nuclear-atomic/finite-residual-corridor-overlap-source-acquisition-blocker.v1.json",
  );
  const finiteOverlapBlocker = JSON.parse(
    fs.readFileSync(FINITE_OVERLAP_BLOCKER_PATH, "utf8"),
  );
  assert.equal(finiteOverlapBlocker.sourceKind, "finite_residual_corridor_overlap");
  assert.equal(
    finiteOverlapBlocker.currentStatus,
    "blocked_missing_finite_range_residual_audit",
  );
  assert.deepEqual(
    finiteOverlapBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    finiteOverlapBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "finite_residual_corridor_overlap",
    ),
    true,
  );
  assert.equal(
    finiteOverlapBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_delta_E_corr_NN
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_delta_E_corr_NN
      .currentEvidenceStatus,
    "blocked_missing_same_domain_residual_derivation",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_delta_E_corr_NN
      .sourceTargetPath,
    "scripts/nuclear-atomic/accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json",
  );
  const acceptedDeltaECorrBlocker = JSON.parse(
    fs.readFileSync(ACCEPTED_DELTA_E_CORR_BLOCKER_PATH, "utf8"),
  );
  assert.equal(acceptedDeltaECorrBlocker.sourceKind, "accepted_delta_E_corr_NN");
  assert.equal(
    acceptedDeltaECorrBlocker.currentStatus,
    "blocked_missing_same_domain_residual_derivation",
  );
  assert.deepEqual(
    acceptedDeltaECorrBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    acceptedDeltaECorrBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "accepted_delta_E_corr_NN",
    ),
    true,
  );
  assert.equal(
    acceptedDeltaECorrBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.Delta_E_corr_NN_tail_limit
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.Delta_E_corr_NN_tail_limit
      .currentEvidenceStatus,
    "blocked_missing_same_record_sigma_eff_color_singlet_join",
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.Delta_E_corr_NN_tail_limit
      .requiredLedgerComponents,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.Delta_E_corr_NN_tail_limit
      .componentShapePass,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.Delta_E_corr_NN_tail_limit
      .sourceTargetPath,
    "scripts/nuclear-atomic/delta-E-corr-NN-tail-limit-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.corridor_weight_growth_eta_lt_lambda
      .accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.corridor_weight_growth_eta_lt_lambda
      .requiredLedgerComponents,
    ["corridor_weight_bound", "C_w", "eta", "eta_lt_lambda_witness"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.coefficient_exclusion_audit
      .accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.coefficient_exclusion_audit
      .sourceTargetPath,
    "scripts/nuclear-atomic/delta-E-corr-NN-tail-corridor-weight-retained-evidence.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.uniform_large_r_bound_C_lambda_R0
      .accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.uniform_large_r_bound_C_lambda_R0
      .requiredLedgerComponents,
    ["tail_envelope_bound", "R0", "C", "lambda", "coefficient_exclusion_audit"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.uniform_large_r_bound_C_lambda_R0
      .sourceTargetPath,
    "scripts/nuclear-atomic/delta-E-corr-NN-uniform-tail-bound-retained-evidence.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.lim_R_to_infty_T_NN_R_eq_0
      .accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.lim_R_to_infty_T_NN_R_eq_0
      .requiredLedgerComponents,
    [
      "tail_envelope_bound",
      "R0",
      "C",
      "lambda",
      "zero_limit_derivation",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.O_NN_finite.accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.O_NN_finite
      .requiredLedgerComponents,
    [
      "tail_envelope_bound",
      "corridor_weight_bound",
      "C_w",
      "eta_lt_lambda_witness",
      "finite_overlap_integral",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.exists_R0_C_lambda_exp_decay_tail
      .accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.exists_R0_C_lambda_exp_decay_tail
      .requiredLedgerComponents,
    [
      "tail_envelope_bound",
      "R0",
      "C",
      "lambda",
      "lambda_positive",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.exists_R0_C_lambda_exp_decay_tail
      .sourceTargetPath,
    "scripts/nuclear-atomic/delta-E-corr-NN-tail-calculus-retained-evidence.v1.json",
  );
  const deltaTailCorridorWeightEvidence = JSON.parse(
    fs.readFileSync(DELTA_E_CORR_TAIL_CORRIDOR_WEIGHT_EVIDENCE_PATH, "utf8"),
  );
  assert.deepEqual(
    deltaTailCorridorWeightEvidence.acceptedBoundary
      .acceptedSourceRowsByThisEvidence,
    ["corridor_weight_growth_eta_lt_lambda", "coefficient_exclusion_audit"],
  );
  assert.equal(deltaTailCorridorWeightEvidence.corridorWeightGrowth.C_w, 1);
  assert.equal(deltaTailCorridorWeightEvidence.corridorWeightGrowth.eta, 0);
  assert.equal(
    deltaTailCorridorWeightEvidence.coefficientExclusionAudit
      .usesFeNiTunedCoefficient,
    false,
  );
  assert.equal(
    deltaTailCorridorWeightEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "Delta_E_corr_NN_tail_limit",
    ),
    true,
  );
  assert.equal(
    deltaTailCorridorWeightEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "uniform_large_r_bound_C_lambda_R0",
    ),
    true,
  );
  const deltaUniformTailBoundEvidence = JSON.parse(
    fs.readFileSync(DELTA_E_CORR_UNIFORM_TAIL_BOUND_EVIDENCE_PATH, "utf8"),
  );
  assert.deepEqual(
    deltaUniformTailBoundEvidence.acceptedBoundary.acceptedSourceRowsByThisEvidence,
    ["uniform_large_r_bound_C_lambda_R0"],
  );
  assert.equal(deltaUniformTailBoundEvidence.tailEnvelopeBound.R0, 1);
  assert.equal(deltaUniformTailBoundEvidence.tailEnvelopeBound.C, 1);
  assert.equal(deltaUniformTailBoundEvidence.tailEnvelopeBound.lambda, 1);
  assert.equal(
    deltaUniformTailBoundEvidence.tailEnvelopeBound.usesFeNiTunedCoefficient,
    false,
  );
  assert.equal(
    deltaUniformTailBoundEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "Delta_E_corr_NN_tail_limit",
    ),
    true,
  );
  assert.equal(
    deltaUniformTailBoundEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "lim_R_to_infty_T_NN_R_eq_0",
    ),
    true,
  );
  const deltaTailCalculusEvidence = JSON.parse(
    fs.readFileSync(DELTA_E_CORR_TAIL_CALCULUS_EVIDENCE_PATH, "utf8"),
  );
  assert.deepEqual(
    deltaTailCalculusEvidence.acceptedBoundary.acceptedSourceRowsByThisEvidence,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.equal(deltaTailCalculusEvidence.tailInputs.lambda, 1);
  assert.equal(deltaTailCalculusEvidence.tailInputs.eta, 0);
  assert.equal(deltaTailCalculusEvidence.finiteOverlap.O_NN_upper_bound, 1);
  assert.equal(
    deltaTailCalculusEvidence.zeroLimit.coefficientExclusionAudit
      .usesFeNiTunedCoefficient,
    false,
  );
  assert.equal(
    deltaTailCalculusEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "Delta_E_corr_NN_tail_limit",
    ),
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.bounded_residual_overlap.accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.bounded_residual_overlap
      .requiredLedgerComponents,
    [
      "O_NN_finite",
      "corridor_weight_ref",
      "finite_overlap_integral",
      "same_tail_support_domain",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.large_r_zero_limit.accepted,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.large_r_zero_limit
      .requiredLedgerComponents,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "tail_envelope_bound",
      "zero_limit_derivation",
      "same_tail_support_domain",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.large_r_zero_limit
      .sourceTargetPath,
    "scripts/nuclear-atomic/finite-range-tail-support-retained-evidence.v1.json",
  );
  const finiteRangeTailSupportEvidence = JSON.parse(
    fs.readFileSync(FINITE_RANGE_TAIL_SUPPORT_EVIDENCE_PATH, "utf8"),
  );
  assert.deepEqual(
    finiteRangeTailSupportEvidence.acceptedBoundary
      .acceptedSourceRowsByThisEvidence,
    ["bounded_residual_overlap", "large_r_zero_limit"],
  );
  assert.equal(
    finiteRangeTailSupportEvidence.tailSupportInputs.sameFullConfinementRecord,
    false,
  );
  assert.equal(
    finiteRangeTailSupportEvidence.boundedResidualOverlap
      .coefficientExclusionAudit.usesFeNiTunedCoefficient,
    false,
  );
  assert.equal(
    finiteRangeTailSupportEvidence.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "finite_range_residual",
    ),
    true,
  );
  const deltaECorrTailLimitBlocker = JSON.parse(
    fs.readFileSync(DELTA_E_CORR_TAIL_LIMIT_BLOCKER_PATH, "utf8"),
  );
  assert.equal(deltaECorrTailLimitBlocker.sourceKind, "Delta_E_corr_NN_tail_limit");
  assert.equal(
    deltaECorrTailLimitBlocker.currentStatus,
    "blocked_missing_same_record_sigma_eff_color_singlet_join",
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.nearestCandidateInputs.tailCalculusSupport
      .acceptedRowsProvided,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.candidateTailLimitScaffold.requiredLedgerComponents,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    deltaECorrTailLimitBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "Delta_E_corr_NN_tail_limit",
    ),
    true,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitScaffold.notRequiredBeforeAcceptance.includes(
      "accepted_delta_E_corr_NN",
    ),
    true,
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .sourceRowIds,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket.minimumFields.includes(
      "eta_lt_lambda_witness",
    ),
    true,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket.minimumFields.includes(
      "coefficientExclusionAudit",
    ),
    true,
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .inequalityRequirements,
    ["C>0", "lambda>0", "C_w>0", "0<=eta<lambda"],
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .acceptedInputsAlreadyAvailable,
    [
      "accepted_sigma_eff_extraction",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
      "corridor_weight_growth_eta_lt_lambda",
      "uniform_large_r_bound_C_lambda_R0",
      "coefficient_exclusion_audit",
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("accepted_sigma_eff_extraction"),
    false,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("uniform_large_r_bound_C_lambda_R0"),
    false,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes(
        "corridor_weight_growth_eta_lt_lambda",
      ),
    false,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .stillMissingBeforeAcceptance.includes("coefficient_exclusion_audit"),
    false,
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .acceptedRowsAlreadyAvailable,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .derivedRowsIfAccepted,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.equal(
    deltaECorrTailLimitBlocker.uniformExponentialTailCertificateRequestPacket
      .notAcceptedByThisPacket.includes("Delta_E_corr_NN_tail_limit"),
    true,
  );
  assert.deepEqual(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.derivedRowsIfAccepted,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.proofSteps.some(
      (step) => step.stepId === "zero_limit",
    ),
    true,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.proofSteps.some(
      (step) => step.stepId === "finite_overlap",
    ),
    true,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.missingAcceptanceRows.includes(
      "accepted_sigma_eff_extraction",
    ),
    false,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.missingAcceptanceRows.includes(
      "uniform_large_r_bound_C_lambda_R0",
    ),
    false,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.missingAcceptanceRows.includes(
      "corridor_weight_growth_eta_lt_lambda",
    ),
    false,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.candidateTailLimitLemma.missingAcceptanceRows.includes(
      "accepted_color_singlet_nucleon_envelope",
    ),
    true,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "O_NN_finite",
    ),
    true,
  );
  assert.equal(
    deltaECorrTailLimitBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_range_residual.accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_range_residual
      .currentEvidenceStatus,
    "blocked_missing_delta_E_corr_tail_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.finite_range_residual
      .sourceTargetPath,
    "scripts/nuclear-atomic/finite-range-residual-source-acquisition-blocker.v1.json",
  );
  const finiteRangeBlockerEntry = report.sourceAcquisitionBlockerMap.blockers.find(
    (blockerEntry) => blockerEntry.sourceRowId === "finite_range_residual",
  );
  assert.deepEqual(
    finiteRangeBlockerEntry.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "Delta_E_corr_NN_tail_limit",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
    ],
  );
  assert.deepEqual(
    finiteRangeBlockerEntry.sourceAcquisitionRoute.feedsRowsAfterAcceptance,
    [
      "finite_residual_corridor_overlap",
      "same_record_no_open_color_audit",
      "no_open_color_far_field",
      "no_free_color_asymptotic_state",
    ],
  );
  assert.deepEqual(
    finiteRangeBlockerEntry.sourceAcquisitionRoute.notRequiredBeforeAcceptance,
    [
      "accepted_delta_E_corr_NN",
      "accepted_branch_interface_rows",
      "no_open_color_far_field",
      "same_record_no_open_color_audit",
      "no_free_color_asymptotic_state",
    ],
  );
  const finiteRangeResidualBlocker = JSON.parse(
    fs.readFileSync(FINITE_RANGE_RESIDUAL_BLOCKER_PATH, "utf8"),
  );
  assert.equal(finiteRangeResidualBlocker.sourceKind, "finite_range_residual");
  assert.equal(
    finiteRangeResidualBlocker.currentStatus,
    "blocked_missing_delta_E_corr_tail_audit",
  );
  assert.equal(
    finiteRangeResidualBlocker.nearestCandidateInputs.deltaECorrTailLimitBlocker
      .candidatePath,
    "scripts/nuclear-atomic/delta-E-corr-NN-tail-limit-source-acquisition-blocker.v1.json",
  );
  assert.deepEqual(
    finiteRangeResidualBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    finiteRangeResidualBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "finite_range_residual",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.finiteRangeClosure,
    "\\lim_{R\\to\\infty}\\mathcal T_{NN}(R)=0",
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.requiredAcceptedRowsBeforeUse.includes(
      "Delta_E_corr_NN_tail_limit",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.requiredAcceptedRowsBeforeUse.includes(
      "accepted_branch_interface_rows",
    ),
    false,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.notRequiredBeforeFiniteRangeAcceptance.includes(
      "accepted_delta_E_corr_NN",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.notRequiredBeforeFiniteRangeAcceptance.includes(
      "no_open_color_far_field",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.feedsRowsAfterAcceptance.includes(
      "same_record_no_open_color_audit",
    ),
    true,
  );
  assert.deepEqual(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket.sourceRowIds,
    ["bounded_residual_overlap", "large_r_zero_limit"],
  );
  assert.equal(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket.minimumFields.includes(
      "O_NN_finite_ref",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket.minimumFields.includes(
      "lim_R_to_infty_T_NN_R_eq_0_ref",
    ),
    true,
  );
  assert.deepEqual(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket.derivedRowsIfAccepted,
    ["bounded_residual_overlap", "large_r_zero_limit"],
  );
  assert.deepEqual(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket
      .acceptedInputsAlreadyAvailable,
    [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
      "bounded_residual_overlap",
      "large_r_zero_limit",
    ],
  );
  assert.deepEqual(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket
      .acceptedRowsAlreadyAvailable,
    ["bounded_residual_overlap", "large_r_zero_limit"],
  );
  assert.equal(
    finiteRangeResidualBlocker.tailLimitRowBridgeRequestPacket.notAcceptedByThisPacket.includes(
      "finite_range_residual",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateTailLimitRowBridgeLemma.lemmaId,
    "tail_limit_overlap_zero_rows_imply_finite_range_support_0001",
  );
  assert.deepEqual(
    finiteRangeResidualBlocker.candidateTailLimitRowBridgeLemma.derivedRowsIfAccepted,
    ["bounded_residual_overlap", "large_r_zero_limit"],
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateTailLimitRowBridgeLemma.proofSteps.some(
      (step) => step.stepId === "bounded_overlap_relabel",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateTailLimitRowBridgeLemma.notRequiredBeforeAcceptance.includes(
      "no_open_color_far_field",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.graphRuleLocks.includes(
      "finite_tail_saturation_check",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.candidateFiniteTailScaffold.coefficientLocks.includes(
      "alphaPack",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.requiredAcceptanceCondition.largeRZeroLimit
      .notRequiredBeforeFiniteRangeAcceptance.includes("no_open_color_far_field"),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "O_NN_finite",
    ),
    true,
  );
  assert.equal(
    finiteRangeResidualBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.color_singlet_closure.accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.color_singlet_closure
      .currentEvidenceStatus,
    "blocked_missing_color_singlet_closure",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.color_singlet_closure
      .sourceTargetPath,
    "scripts/nuclear-atomic/color-singlet-closure-source-acquisition-blocker.v1.json",
  );
  const colorSingletClosureBlocker = JSON.parse(
    fs.readFileSync(COLOR_SINGLET_CLOSURE_BLOCKER_PATH, "utf8"),
  );
  assert.equal(colorSingletClosureBlocker.sourceKind, "color_singlet_closure");
  assert.equal(
    colorSingletClosureBlocker.currentStatus,
    "blocked_missing_color_singlet_closure",
  );
  assert.deepEqual(
    colorSingletClosureBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    colorSingletClosureBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "color_singlet_closure",
    ),
    true,
  );
  assert.equal(
    colorSingletClosureBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_no_open_color_audit
      .accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_no_open_color_audit
      .currentEvidenceStatus,
    "blocked_missing_same_record_no_open_color_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.same_record_no_open_color_audit
      .sourceTargetPath,
    "scripts/nuclear-atomic/same-record-no-open-color-audit-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .bounded_open_color_projection_operator_norm.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .bounded_open_color_projection_operator_norm.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks
      .bounded_open_color_projection_operator_norm.requiredLedgerComponents,
    [
      "Pi_open_operator",
      "projection_domain",
      "operator_norm_bound",
      "coefficient_exclusion_audit",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .finite_open_color_surface_measure.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .finite_open_color_surface_measure.sourceTargetPath,
    "scripts/nuclear-atomic/open-color-projection-surface-support-retained-evidence.v1.json",
  );
  const openColorProjectionSurfaceSupport = JSON.parse(
    fs.readFileSync(OPEN_COLOR_PROJECTION_SURFACE_SUPPORT_PATH, "utf8"),
  );
  assert.deepEqual(
    openColorProjectionSurfaceSupport.acceptedBoundary
      .acceptedSourceRowsByThisEvidence,
    [
      "bounded_open_color_projection_operator_norm",
      "finite_open_color_surface_measure",
    ],
  );
  assert.equal(
    openColorProjectionSurfaceSupport.boundedOpenColorProjectionOperatorNorm
      .kappa_open,
    1,
  );
  assert.equal(
    openColorProjectionSurfaceSupport.finiteOpenColorSurfaceMeasure.Omega_open,
    1,
  );
  assert.equal(
    openColorProjectionSurfaceSupport.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "K_open_finite",
    ),
    true,
  );
  assert.equal(
    openColorProjectionSurfaceSupport.acceptedBoundary.notAcceptedByThisEvidence.includes(
      "no_open_color_far_field",
    ),
    true,
  );
  const sameRecordAuditBlockerEntry =
    report.sourceAcquisitionBlockerMap.blockers.find(
      (blockerEntry) =>
        blockerEntry.sourceRowId === "same_record_no_open_color_audit",
    );
  assert.deepEqual(
    sameRecordAuditBlockerEntry.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "Delta_E_corr_NN_tail_limit",
      "finite_range_residual",
      "color_singlet_closure",
      "same_event_ledger",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  );
  assert.deepEqual(
    sameRecordAuditBlockerEntry.sourceAcquisitionRoute.notRequiredBeforeAcceptance,
    ["accepted_branch_interface_rows", "no_open_color_far_field"],
  );
  const sameRecordNoOpenColorAuditBlocker = JSON.parse(
    fs.readFileSync(SAME_RECORD_NO_OPEN_COLOR_AUDIT_BLOCKER_PATH, "utf8"),
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sourceKind,
    "same_record_no_open_color_audit",
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.currentStatus,
    "blocked_missing_same_record_no_open_color_audit",
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary
      .acceptedSourceRowsByThisPacket,
    [],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "same_record_no_open_color_audit",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold.auditTuple.includes(
      "\\Delta E_{\\mathrm{corr}}^{NN}",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold.acceptanceImplication,
    "finite_range_residual \\wedge color_singlet_closure \\wedge \\lim_{R\\to\\infty}\\mathcal N_{\\mathrm{open}}(R)=0 \\Rightarrow no_open_color_far_field",
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold.tailToFarFieldBound,
    "\\mathcal N_{\\mathrm{open}}(R)\\le K_{\\mathrm{open}}\\,\\mathcal T_{NN}(R)^2",
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold
      .largeRClosureRoute,
    "\\lim_{R\\to\\infty}\\mathcal T_{NN}(R)=0\\;\\wedge\\;K_{\\mathrm{open}}<\\infty\\;\\Rightarrow\\;\\lim_{R\\to\\infty}\\mathcal N_{\\mathrm{open}}(R)=0",
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold
      .sameRecordWitness.includes("\\mathcal B_{\\mathrm{br}}"),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold.graphRuleLocks.includes(
      "finite_tail_saturation_check",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold.coefficientLocks.includes(
      "alphaPack",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold.coefficientExclusion.includes(
      "K_open",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold
      .requiredAcceptedRowsBeforeUse.includes("accepted_branch_interface_rows"),
    false,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold
      .requiredAcceptedRowsBeforeUse.includes("Delta_E_corr_NN_tail_limit"),
    true,
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.sameRecordAuditScaffold
      .notRequiredBeforeAcceptance,
    ["accepted_branch_interface_rows", "no_open_color_far_field"],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameRecordAuditLemma.lemmaId,
    "finite_tail_color_singlet_event_ledger_implies_same_record_no_open_color_audit_0001",
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.candidateSameRecordAuditLemma
      .derivedRowsIfAccepted,
    [
      "same_record_no_open_color_audit",
      "same_record_branch_interface_confinement_functional_audit",
      "N_open_R_le_K_open_T_NN_R_squared",
    ],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameRecordAuditLemma.proofSteps.some(
      (step) => step.stepId === "same_event_record_lock",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameRecordAuditLemma.proofSteps.some(
      (step) => step.stepId === "audit_witness",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameRecordAuditLemma
      .missingAcceptanceRows.includes("K_open_finite"),
    true,
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.candidateSameRecordAuditLemma
      .notRequiredBeforeAcceptance,
    ["accepted_branch_interface_rows", "no_open_color_far_field"],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket.sourceRowId,
    "same_event_ledger",
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket.minimumFields.includes(
      "sameRecordNoetherSeaResponseEventLedgerRef",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket.requiredRecordEqualities.includes(
      "record(branchSameRecordLedgerRef)=record(finite_range_residual_ref)",
    ),
    true,
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket
      .acceptedInputsAlreadyAvailable,
    [
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
      "bounded_open_color_projection_operator_norm",
      "finite_open_color_surface_measure",
    ],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket
      .stillMissingBeforeAcceptance.includes(
        "bounded_open_color_projection_operator_norm",
      ),
    false,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket
      .stillMissingBeforeAcceptance.includes("finite_open_color_surface_measure"),
    false,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket
      .stillMissingBeforeAcceptance.includes("K_open_finite"),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.sameEventLedgerRequestPacket
      .notAcceptedByThisPacket.includes("same_event_ledger"),
    true,
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.openColorProjectionSurfaceSupportRequestPacket
      .sourceRowIds,
    [
      "bounded_open_color_projection_operator_norm",
      "finite_open_color_surface_measure",
    ],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.openColorProjectionSurfaceSupportRequestPacket.minimumFields.includes(
      "Pi_open_operator_ref",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.openColorProjectionSurfaceSupportRequestPacket.minimumFields.includes(
      "surfaceMeasureRef",
    ),
    true,
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.openColorProjectionSurfaceSupportRequestPacket
      .derivedRowsIfAccepted,
    [
      "bounded_open_color_projection_operator_norm",
      "finite_open_color_surface_measure",
    ],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.openColorProjectionSurfaceSupportRequestPacket
      .notAcceptedByThisPacket.includes("no_open_color_far_field"),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameEventLedgerLockLemma
      .lemmaId,
    "branch_noether_residual_color_projection_event_lock_implies_same_event_ledger_0001",
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.candidateSameEventLedgerLockLemma
      .derivedRowsIfAccepted,
    ["same_event_ledger"],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameEventLedgerLockLemma.proofSteps.some(
      (step) => step.stepId === "same_event_ledger_witness",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameEventLedgerLockLemma
      .missingAcceptanceRows.includes("finite_open_color_surface_measure"),
    false,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateSameEventLedgerLockLemma
      .missingAcceptanceRows.includes("single_retained_event_id"),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateOpenColorProjectionSurfaceSupportLemma
      .lemmaId,
    "bounded_open_projection_surface_measure_implies_projection_support_0001",
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker
      .candidateOpenColorProjectionSurfaceSupportLemma.derivedRowsIfAccepted,
    [
      "bounded_open_color_projection_operator_norm",
      "finite_open_color_surface_measure",
    ],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateOpenColorProjectionSurfaceSupportLemma.proofSteps.some(
      (step) => step.stepId === "surface_measure_finiteness",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "accepted_same_event_ledger_for_no_open_color_audit",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateFiniteKOpenProjectionBoundLemma
      .lemmaId,
    "same_record_bounded_open_projection_implies_finite_K_open_0001",
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.candidateFiniteKOpenProjectionBoundLemma
      .derivedRowsIfAccepted,
    ["K_open_finite", "N_open_R_le_K_open_T_NN_R_squared"],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateFiniteKOpenProjectionBoundLemma.proofSteps.some(
      (step) => step.stepId === "define_K_open",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.candidateFiniteKOpenProjectionBoundLemma
      .missingAcceptanceRows.includes("bounded_residual_overlap"),
    false,
  );
  assert.deepEqual(
    sameRecordNoOpenColorAuditBlocker.candidateFiniteKOpenProjectionBoundLemma
      .notRequiredBeforeAcceptance,
    [
      "same_record_no_open_color_audit",
      "no_open_color_far_field",
      "accepted_branch_interface_rows",
    ],
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "K_open_finite",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "N_open_R_le_K_open_T_NN_R_squared",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "bounded_open_color_projection_operator_norm",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "finite_open_color_surface_measure",
    ),
    true,
  );
  assert.equal(
    sameRecordNoOpenColorAuditBlocker.localEvidenceBoundary.scoreDecision,
    "no_score_increase",
  );
  assert.deepEqual(report.toyBindingCheck.failures, []);
  assert.deepEqual(
    report.sourceAcquisitionCheck.rowChecks.sigma_eff_extraction
      .missingAcceptedSourceRows,
    [],
  );
  assert.equal(report.toyBindingCheck.unconsumedRequiredRows.length, 0);
});

test("accepted confinement rows pass when the same dependency structure is retained", () => {
  const report = buildConfinementFunctionalSourceTargetCheck(acceptedTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "accepted_confinement_functional_source_rows");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.deepEqual(report.summary.missingRows, []);
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, true);
  assert.equal(report.summary.sourceAcquisitionPass, true);
  assert.deepEqual(report.sourceAcquisitionBlockerMap, {
    status: "all_required_source_rows_acquired",
    claimLevel:
      "source-acquisition blocker map; not accepted source evidence and not promotion evidence",
    firstMissingAcceptedSourceRow: null,
    firstMissingObject: null,
    blockedSourceRowCount: 0,
    blockers: [],
  });
});

test("accepted confinement rows fail closed when source rows are named but target-only", () => {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
    row.currentEvidenceStatus = "accepted_non_fixture_source";
    row.acceptedSourceRows = row.requiredSourceRows ?? [];
  }

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_source_acquisition_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.sourceAcquisitionCheck.firstMissingSourceRow,
    "accepted_proton_color_singlet_envelope",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingAcceptedSourceRow,
    "accepted_proton_color_singlet_envelope",
  );
  assert.deepEqual(
    report.sourceAcquisitionBlockerMap.blockers[0].blockedConfinementRows,
    ["color_singlet_nucleon_envelope"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.failures.some(
      (failure) =>
        failure.sourceRowId === "accepted_proton_color_singlet_envelope" &&
        failure.reason === "source_acquisition_target_not_accepted",
    ),
    true,
  );
});

test("accepted confinement rows fail closed when a source-acquisition target loses its required component shape", () => {
  const target = acceptedTarget();
  target.sourceAcquisitionTargets.K_perp.requiredLedgerComponents =
    target.sourceAcquisitionTargets.K_perp.requiredLedgerComponents.filter(
      (component) => component !== "transverse_stiffness_functional",
    );

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_source_acquisition_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(report.sourceAcquisitionCheck.targetChecks.K_perp.componentShapePass, false);
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingAcceptedSourceRow,
    "K_perp",
  );
  assert.deepEqual(
    report.sourceAcquisitionBlockerMap.blockers[0].blockedConfinementRows,
    ["sigma_eff_extraction"],
  );
  assert.deepEqual(report.sourceAcquisitionBlockerMap.blockers[0].directToyConsumers, {
    coefficients: [
      "alphaSea",
      "pnCorridorPairReward",
      "ppCorridorPairReward",
    ],
    graphRules: [],
  });
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.K_perp.missingRequiredComponents,
    ["transverse_stiffness_functional"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.failures.some(
      (failure) =>
        failure.sourceRowId === "K_perp" &&
        failure.reason === "source_acquisition_target_shape_mismatch",
    ),
    true,
  );
});

test("confinement checker fails closed when no-open proof target loses a limit statement", () => {
  const target = acceptedTarget();
  target.acceptedSourceRowProofTargets.no_open_color_far_field.requiredLimitStatements =
    target.acceptedSourceRowProofTargets.no_open_color_far_field.requiredLimitStatements.filter(
      (statement) => statement !== "N_open_R_le_K_open_T_NN_R_squared",
    );

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_proof_target_incomplete");
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "no_open_color_far_field",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredLimitStatements"],
    },
  ]);
});

test("confinement checker fails closed when sigma-eff proof target loses extraction certificate rows", () => {
  const target = acceptedTarget();
  target.acceptedSourceRowProofTargets.sigma_eff_extraction.requiredExtractionCertificateRows =
    target.acceptedSourceRowProofTargets.sigma_eff_extraction.requiredExtractionCertificateRows.filter(
      (row) => row !== "refinement_stable_sigma_eff_row",
    );

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_proof_target_incomplete");
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "sigma_eff_extraction",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredExtractionCertificateRows"],
    },
  ]);
});

test("confinement checker fails closed on accepted-looking priority-only rows", () => {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
    row.currentEvidenceStatus = "priority_packet_only";
  }

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_source_evidence_mismatch");
  assert.equal(report.summary.sourceEvidencePass, false);
  assert.deepEqual(report.sourceEvidenceCheck.failures, [
    {
      rowId: "sigma_eff_extraction",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "color_singlet_nucleon_envelope",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "delta_E_corr_NN",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "no_open_color_far_field",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
  ]);
  assert.deepEqual(report.summary.missingRows, [
    "sigma_eff_extraction",
    "color_singlet_nucleon_envelope",
    "delta_E_corr_NN",
    "no_open_color_far_field",
  ]);
});

test("confinement checker fails closed on corrupted Delta E equation structure", () => {
  const target = acceptedTarget();
  target.rows.delta_E_corr_NN.targetEquation = "Delta E_corr_NN(r)=unstructured";

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_structure_mismatch");
  assert.equal(report.summary.structuralPass, false);
  assert.deepEqual(report.summary.structuralFailures, [
    "delta_E_corr_NN.equation",
  ]);
});

test("CLI require-accepted fails while current confinement rows remain target-only", () => {
  assert.throws(
    () => {
      execFileSync(process.execPath, [SCRIPT_PATH, "--summary", "--require-accepted"], {
        encoding: "utf8",
      });
    },
    (error) => error.status === 1,
  );
});
