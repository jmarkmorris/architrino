#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const INPUT_SCHEMA =
  "aaa-nuclear-atomic-confinement-functional-source-target/v1";
export const OUTPUT_SCHEMA =
  "aaa-nuclear-atomic-confinement-functional-source-target-check/v1";

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const REQUIRED_ROWS = Object.freeze([
  "sigma_eff_extraction",
  "color_singlet_nucleon_envelope",
  "delta_E_corr_NN",
  "no_open_color_far_field",
]);
const ACCEPTED_EVIDENCE_STATUSES = new Set(["accepted_non_fixture_source"]);
const DEFAULT_INPUT =
  "scripts/nuclear-atomic/confinement-functional-source-target.v1.json";

const REQUIRED_SOURCE_ROWS = Object.freeze({
  sigma_eff_extraction: [
    "K_perp",
    "V_exc",
    "rho_NS",
    "chi_sea",
    "axis_exceptionality_charge",
    "same_record_noether_sea_response",
  ],
  color_singlet_nucleon_envelope: [
    "accepted_proton_color_singlet_envelope",
    "accepted_neutron_color_singlet_envelope",
    "no_free_color_asymptotic_state",
    "same_record_branch_interface",
  ],
  delta_E_corr_NN: [
    "accepted_sigma_eff_extraction",
    "accepted_color_singlet_nucleon_envelope",
    "accepted_branch_interface_rows",
    "finite_residual_corridor_overlap",
  ],
  no_open_color_far_field: [
    "accepted_delta_E_corr_NN",
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
  ],
});
const REQUIRED_SOURCE_TARGET_COMPONENTS = Object.freeze({
  K_perp: [
    "transverse_stiffness_functional",
    "color_charge_domain",
    "sigma_eff_variation_record",
  ],
  V_exc: [
    "excitation_potential_functional",
    "vacuum_exceptionality_profile",
    "rho_NS_chi_sea_arguments",
  ],
  rho_NS: [
    "retained_window_density_row",
    "same_record_noether_sea_response",
    "provider_source_path",
  ],
  chi_sea: [
    "noether_sea_delay_factor_row",
    "same_record_noether_sea_response",
    "effective_speed_relation",
  ],
  axis_exceptionality_charge: [
    "axis_exceptionality_definition",
    "charge_normalization_row",
    "same_sigma_eff_domain",
  ],
  same_record_noether_sea_response: [
    "rho_NS",
    "theta_sea",
    "stress_strain_row",
    "same_event_ledger",
  ],
  proton_color_singlet_closure: [
    "Pi_singlet_X_ref",
    "Pi_open_X_ref",
    "W_locked_pX_ref",
    "E_color_pX_bound",
    "coefficient_exclusion_audit",
  ],
  neutron_color_singlet_closure: [
    "Pi_singlet_X_ref",
    "Pi_open_X_ref",
    "W_locked_nX_ref",
    "E_color_nX_bound",
    "coefficient_exclusion_audit",
  ],
  finite_envelope_boundary: [
    "R_p",
    "R_n",
    "refinement_window",
    "same_sigma_eff_domain",
    "coefficient_exclusion_audit",
  ],
  accepted_proton_color_singlet_envelope: [
    "proton_color_singlet_closure",
    "finite_envelope_boundary",
    "no_free_color_asymptotic_state",
  ],
  accepted_neutron_color_singlet_envelope: [
    "neutron_color_singlet_closure",
    "finite_envelope_boundary",
    "no_free_color_asymptotic_state",
  ],
  no_free_color_asymptotic_state: [
    "color_singlet_closure",
    "asymptotic_field_audit",
    "finite_range_residual",
  ],
  same_record_branch_interface: [
    "accepted_proton_branch_interface_ledger",
    "accepted_neutron_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ],
  accepted_sigma_eff_extraction: [
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
  accepted_color_singlet_nucleon_envelope: [
    "accepted_proton_color_singlet_envelope",
    "accepted_neutron_color_singlet_envelope",
    "no_free_color_asymptotic_state",
    "same_record_branch_interface",
  ],
  accepted_branch_interface_rows: [
    "pn_orientation_count",
    "pp_orientation_count",
    "nucleon_branch_interface_ledgers",
    "same_record_energy_momentum_angular_momentum_ledger",
  ],
  finite_residual_corridor_overlap: [
    "Delta_E_corr_NN_finite_range",
    "corridor_overlap_window",
    "no_open_color_far_field",
  ],
  accepted_delta_E_corr_NN: [
    "accepted_sigma_eff_extraction",
    "accepted_color_singlet_nucleon_envelope",
    "accepted_branch_interface_rows",
    "finite_residual_corridor_overlap",
  ],
  Delta_E_corr_NN_tail_limit: [
    "lim_R_to_infty_T_NN_R_eq_0",
    "O_NN_finite",
    "exists_R0_C_lambda_exp_decay_tail",
  ],
  lim_R_to_infty_T_NN_R_eq_0: [
    "tail_envelope_bound",
    "R0",
    "C",
    "lambda",
    "zero_limit_derivation",
    "coefficient_exclusion_audit",
  ],
  O_NN_finite: [
    "tail_envelope_bound",
    "corridor_weight_bound",
    "C_w",
    "eta_lt_lambda_witness",
    "finite_overlap_integral",
    "coefficient_exclusion_audit",
  ],
  exists_R0_C_lambda_exp_decay_tail: [
    "tail_envelope_bound",
    "R0",
    "C",
    "lambda",
    "lambda_positive",
    "coefficient_exclusion_audit",
  ],
  bounded_residual_overlap: [
    "O_NN_finite",
    "corridor_weight_ref",
    "finite_overlap_integral",
    "same_tail_support_domain",
    "coefficient_exclusion_audit",
  ],
  large_r_zero_limit: [
    "lim_R_to_infty_T_NN_R_eq_0",
    "tail_envelope_bound",
    "zero_limit_derivation",
    "same_tail_support_domain",
    "coefficient_exclusion_audit",
  ],
  finite_range_residual: [
    "Delta_E_corr_NN_tail_limit",
    "bounded_residual_overlap",
    "large_r_zero_limit",
  ],
  color_singlet_closure: [
    "proton_color_singlet_envelope",
    "neutron_color_singlet_envelope",
    "no_free_color_asymptotic_state",
  ],
  same_record_no_open_color_audit: [
    "Delta_E_corr_NN_tail_limit",
    "finite_range_residual",
    "color_singlet_closure",
    "same_event_ledger",
  ],
  bounded_open_color_projection_operator_norm: [
    "Pi_open_operator",
    "projection_domain",
    "operator_norm_bound",
    "coefficient_exclusion_audit",
  ],
  finite_open_color_surface_measure: [
    "open_color_surface_measure",
    "finite_measure_witness",
    "projection_domain",
    "coefficient_exclusion_audit",
  ],
  corridor_weight_growth_eta_lt_lambda: [
    "corridor_weight_bound",
    "C_w",
    "eta",
    "eta_lt_lambda_witness",
  ],
  uniform_large_r_bound_C_lambda_R0: [
    "tail_envelope_bound",
    "R0",
    "C",
    "lambda",
    "coefficient_exclusion_audit",
  ],
  coefficient_exclusion_audit: [
    "no_A_indexed_tail_coefficient",
    "no_Z_indexed_tail_coefficient",
    "no_isotope_or_element_indexed_tail_coefficient",
    "no_Fe_Ni_tuned_tail_coefficient",
  ],
});
const SOURCE_ACQUISITION_ROUTES = Object.freeze({
  accepted_proton_color_singlet_envelope: {
    requiredAcceptedRowsBeforeUse: [
      "proton_color_singlet_closure",
      "finite_envelope_boundary",
      "no_free_color_asymptotic_state",
    ],
  },
  accepted_neutron_color_singlet_envelope: {
    requiredAcceptedRowsBeforeUse: [
      "neutron_color_singlet_closure",
      "finite_envelope_boundary",
      "no_free_color_asymptotic_state",
    ],
  },
  no_free_color_asymptotic_state: {
    requiredAcceptedRowsBeforeUse: [
      "color_singlet_closure",
      "asymptotic_field_audit",
      "finite_range_residual",
    ],
  },
  accepted_sigma_eff_extraction: {
    requiredAcceptedRowsBeforeUse: [
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
  },
  accepted_color_singlet_nucleon_envelope: {
    requiredAcceptedRowsBeforeUse: [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
    ],
  },
  accepted_branch_interface_rows: {
    requiredAcceptedRowsBeforeUse: [
      "pn_orientation_count",
      "pp_orientation_count",
      "nucleon_branch_interface_ledgers",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  },
  finite_residual_corridor_overlap: {
    requiredAcceptedRowsBeforeUse: [
      "Delta_E_corr_NN_finite_range",
      "corridor_overlap_window",
      "no_open_color_far_field",
    ],
  },
  accepted_delta_E_corr_NN: {
    requiredAcceptedRowsBeforeUse: [
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
  },
  finite_range_residual: {
    requiredAcceptedRowsBeforeUse: [
      "Delta_E_corr_NN_tail_limit",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
    ],
    feedsRowsAfterAcceptance: [
      "finite_residual_corridor_overlap",
      "same_record_no_open_color_audit",
      "no_open_color_far_field",
      "no_free_color_asymptotic_state",
    ],
    notRequiredBeforeAcceptance: [
      "accepted_delta_E_corr_NN",
      "accepted_branch_interface_rows",
      "no_open_color_far_field",
      "same_record_no_open_color_audit",
      "no_free_color_asymptotic_state",
    ],
  },
  color_singlet_closure: {
    requiredAcceptedRowsBeforeUse: [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_sigma_eff_domain",
      "same_record_noether_sea_response",
      "same_record_branch_interface",
      "finite_range_residual",
    ],
  },
  same_record_no_open_color_audit: {
    requiredAcceptedRowsBeforeUse: [
      "Delta_E_corr_NN_tail_limit",
      "finite_range_residual",
      "color_singlet_closure",
      "same_event_ledger",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
    feedsRowsAfterAcceptance: [
      "no_open_color_far_field",
      "accepted_branch_interface_rows",
    ],
    notRequiredBeforeAcceptance: [
      "accepted_branch_interface_rows",
      "no_open_color_far_field",
    ],
  },
  no_open_color_far_field: {
    requiredAcceptedRowsBeforeUse: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
    feedsRowsAfterAcceptance: [
      "same_record_branch_interface",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
    notRequiredBeforeAcceptance: [
      "same_record_branch_interface",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
  },
});
const REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS = Object.freeze({
  sigma_eff_extraction: {
    requiredAcceptedSourceRowsBeforeUse: [
      "K_perp",
      "V_exc",
      "rho_NS",
      "chi_sea",
      "axis_exceptionality_charge",
      "same_record_noether_sea_response",
    ],
    requiredSameRecordRows: [
      "K_perp",
      "V_exc",
      "rho_NS",
      "chi_sea",
      "axis_exceptionality_charge",
      "same_record_noether_sea_response",
      "sigma_eff_extraction",
    ],
    requiredClosureRows: [
      "same_domain_minimizer_certificate",
      "refinement_stable_sigma_eff_row",
      "source_path_tying_extraction_to_inputs",
    ],
    requiredExtractionCertificateRows: [
      "same_domain_minimizer_or_variational_certificate",
      "refinement_stable_sigma_eff_row",
      "source_path_tying_extraction_to_accepted_upstream_rows",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "accepted_inputs_only",
      "target_equation_only",
    ],
  },
  color_singlet_nucleon_envelope: {
    requiredAcceptedSourceRowsBeforeUse: [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
    ],
    requiredSameRecordRows: [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
      "color_singlet_nucleon_envelope",
      "same_sigma_eff_domain",
    ],
    requiredClosureRows: [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
    ],
    requiredEnvelopeBundleRows: [
      "accepted_proton_color_singlet_envelope",
      "accepted_neutron_color_singlet_envelope",
      "no_free_color_asymptotic_state",
      "same_record_branch_interface",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "separate_target_only_envelope_blockers",
      "color_singlet_closure_blocker_only",
    ],
  },
  delta_E_corr_NN: {
    requiredAcceptedSourceRowsBeforeUse: [
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
    requiredSameRecordRows: [
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
    requiredClosureRows: [
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
    requiredResidualDerivationRows: [
      "same_domain_residual_derivation",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_branch_interface_rows",
      "finite_residual_corridor_overlap",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "target_equation_only",
      "finite_overlap_blocker_only",
    ],
  },
  finite_range_residual: {
    requiredAcceptedSourceRowsBeforeUse: [
      "Delta_E_corr_NN_tail_limit",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
    ],
    requiredSameRecordRows: [
      "Delta_E_corr_NN_tail_limit",
      "accepted_sigma_eff_extraction",
      "accepted_color_singlet_nucleon_envelope",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
      "finite_range_residual",
    ],
    requiredClosureRows: [
      "Delta_E_corr_NN_tail_limit",
      "bounded_residual_overlap",
      "large_r_zero_limit",
    ],
    requiredTailLimitStatements: [
      "lim_R_to_infty_T_NN_R_eq_0",
      "O_NN_finite",
      "exists_R0_C_lambda_exp_decay_tail",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "sample_level_finite_tail",
      "target_equation_only",
    ],
  },
  no_open_color_far_field: {
    requiredAcceptedSourceRowsBeforeUse: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
    requiredSameRecordRows: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "same_record_noether_sea_response",
    ],
    requiredClosureRows: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
    ],
    requiredLimitStatements: [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "sample_level_finite_tail",
      "target_only_no_open_color",
    ],
  },
});

const EQUATION_TOKENS = Object.freeze({
  sigma_eff_extraction: [
    "sigma_eff",
    "min_{a,f}",
    "K_perp",
    "V_exc",
    "rho_NS",
    "chi_sea",
  ],
  delta_E_corr_NN: [
    "Delta E_corr_NN",
    "min_{Theta_12",
    "E_conf",
    "Gamma_N1",
    "Gamma_N2",
  ],
});

const REQUIRED_TOY_BINDING_ROWS = Object.freeze({
  coefficients: {
    alphaCorr: ["delta_E_corr_NN"],
    alphaSea: ["sigma_eff_extraction"],
    alphaSurf: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    alphaPair: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    alphaShell: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    alphaPack: ["delta_E_corr_NN", "finite_range_residual", "no_open_color_far_field"],
    boundaryDegreeLoss: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    dSat: ["delta_E_corr_NN", "finite_range_residual", "no_open_color_far_field"],
    maxDegree: ["delta_E_corr_NN", "finite_range_residual", "no_open_color_far_field"],
    packSoftA: ["delta_E_corr_NN", "finite_range_residual", "no_open_color_far_field"],
    pnCorridorPairReward: ["sigma_eff_extraction", "delta_E_corr_NN"],
    ppCorridorPairReward: ["sigma_eff_extraction", "delta_E_corr_NN"],
  },
  graphRules: {
    bounded_degree_surface_depleted_corridor_estimator: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
    finite_tail_saturation_check: [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
  },
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const inputPath = path.resolve(args.input);
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const report = buildConfinementFunctionalSourceTargetCheck(input, {
    inputPath,
  });
  writeReport(report, args);
  if (
    args.requireAccepted &&
    report.summary.status !== "accepted_confinement_functional_source_rows"
  ) {
    process.exitCode = 1;
  }
}

export function buildConfinementFunctionalSourceTargetCheck(
  input,
  { inputPath = DEFAULT_INPUT } = {},
) {
  const rows = input?.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      buildRowCheck(rowId, rows[rowId]),
    ]),
  );
  const sourceEvidenceCheck = evaluateSourceEvidence(rowChecks);
  const dependencyChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      evaluateSourceRowDependencies(rowId, rows[rowId]),
    ]),
  );
  const equationChecks = {
    sigma_eff_extraction: evaluateEquationTokens(
      rows.sigma_eff_extraction?.targetEquation,
      EQUATION_TOKENS.sigma_eff_extraction,
    ),
    delta_E_corr_NN: evaluateEquationTokens(
      rows.delta_E_corr_NN?.targetEquation,
      EQUATION_TOKENS.delta_E_corr_NN,
    ),
    no_open_color_far_field: evaluateNoOpenColorBehavior(
      rows.no_open_color_far_field?.requiredBehavior,
    ),
  };
  const toyBindingCheck = evaluateToyBindingRows(input?.toyBindingRows ?? {});
  const sourceAcquisitionCheck = evaluateSourceAcquisition(
    rows,
    input?.sourceAcquisitionTargets ?? {},
  );
  const acceptedSourceRowProofTargets = evaluateAcceptedSourceRowProofTargets(
    input?.acceptedSourceRowProofTargets ?? {},
    input?.toyBindingRows ?? {},
  );
  const sourceAcquisitionBlockerMap = buildSourceAcquisitionBlockerMap({
    sourceAcquisitionCheck,
    toyBindingRows: input?.toyBindingRows ?? {},
    acceptedSourceRowProofTargets,
  });
  const structuralFailures = [
    ...Object.entries(dependencyChecks)
      .filter(([, check]) => check.passed !== true)
      .map(([rowId]) => `${rowId}.dependencies`),
    ...Object.entries(equationChecks)
      .filter(([, check]) => check.passed !== true)
      .map(([rowId]) => `${rowId}.equation`),
    ...(toyBindingCheck.passed ? [] : ["toyBindingRows"]),
  ];
  const missingRows = REQUIRED_ROWS.filter(
    (rowId) => rowChecks[rowId].accepted !== true,
  );
  const schemaOk = input?.schema === INPUT_SCHEMA;
  const status = decideStatus({
    schemaOk,
    structuralFailures,
    sourceEvidenceCheck,
    acceptedSourceRowProofTargets,
    sourceAcquisitionCheck,
    missingRows,
  });
  const firstMissingRow = missingRows[0] ?? null;

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input?.schema ?? null,
      schemaOk,
      claimLevel: input?.claimLevel ?? null,
      status: input?.status ?? null,
    },
    summary: {
      status,
      allRequiredRowsAccepted: schemaOk && missingRows.length === 0,
      missingRows,
      firstMissingRow,
      firstMissingObject: firstMissingRow ? `missing_accepted_${firstMissingRow}` : null,
      structuralPass: structuralFailures.length === 0,
      structuralFailures,
      dependencyPass: Object.values(dependencyChecks).every(
        (check) => check.passed === true,
      ),
      equationPass: Object.values(equationChecks).every(
        (check) => check.passed === true,
      ),
      sourceEvidencePass: sourceEvidenceCheck.passed,
      acceptedSourceRowProofTargetPass:
        acceptedSourceRowProofTargets.summary.passed,
      acceptedSourceRowProofTargetFailures:
        acceptedSourceRowProofTargets.summary.failures,
      sourceAcquisitionPass: sourceAcquisitionCheck.passed,
      sourceAcquisitionFirstMissingObject:
        sourceAcquisitionCheck.firstMissingSourceRow
          ? `missing_accepted_${sourceAcquisitionCheck.firstMissingSourceRow}`
          : null,
      toyBindingRowsPass: toyBindingCheck.passed,
      scoreDecision: "no_score_increase",
    },
    requiredRows: [...REQUIRED_ROWS],
    rowChecks,
    sourceEvidenceCheck,
    acceptedSourceRowProofTargets,
    sourceAcquisitionCheck,
    sourceAcquisitionBlockerMap,
    dependencyChecks,
    equationChecks,
    toyBindingCheck,
    acceptanceRule:
      "The confinement-functional target is promotion-ready only when every required row is accepted from durable non-fixture source evidence, each row's upstream source-acquisition targets preserve their required component shape, and the sigma_eff, color-singlet envelope, Delta E_corr_NN, no-open-color, and toy-binding dependency checks still pass.",
  };
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT,
    out: null,
    pretty: false,
    summary: false,
    requireAccepted: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--require-accepted") {
      parsed.requireAccepted = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/nuclear-atomic/confinement-functional-source-target-check.mjs [options]

Options:
  --input PATH          Source-target JSON to inspect.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless all confinement-functional rows are accepted.
  --help                Show this help.

This checker keeps the Fe/Ni toy confinement-functional source target
fail-closed: it can verify the sigma_eff and Delta E_corr_NN dependency
structure without treating target-only rows as accepted source evidence.`);
}

function writeReport(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        input: report.input,
        summary: report.summary,
        rowChecks: report.rowChecks,
        sourceEvidenceCheck: report.sourceEvidenceCheck,
        acceptedSourceRowProofTargets: report.acceptedSourceRowProofTargets,
        sourceAcquisitionCheck: report.sourceAcquisitionCheck,
        sourceAcquisitionBlockerMap: report.sourceAcquisitionBlockerMap,
        equationChecks: report.equationChecks,
        toyBindingCheck: report.toyBindingCheck,
      }
    : report;
  const text = JSON.stringify(payload, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function buildRowCheck(rowId, row) {
  const status = normalizeStatus(row);
  const currentEvidenceStatus = row?.currentEvidenceStatus ?? null;
  const acceptedStatus = ACCEPTED_STATUSES.has(status);
  const evidenceAccepted = ACCEPTED_EVIDENCE_STATUSES.has(currentEvidenceStatus);
  return {
    rowId,
    sourceRowId: row?.id ?? row?.rowId ?? null,
    status,
    acceptedStatus,
    evidenceAccepted,
    accepted: acceptedStatus && evidenceAccepted,
    currentEvidenceStatus,
  };
}

function evaluateSourceEvidence(rowChecks) {
  const failures = Object.values(rowChecks)
    .filter((check) => check.acceptedStatus === true && check.evidenceAccepted !== true)
    .map((check) => ({
      rowId: check.rowId,
      currentEvidenceStatus: check.currentEvidenceStatus,
      reason: "accepted_status_without_accepted_non_fixture_source",
    }));
  return {
    requiredEvidenceStatus: "accepted_non_fixture_source",
    failures,
    passed: failures.length === 0,
  };
}

function evaluateSourceAcquisition(rows, sourceAcquisitionTargets) {
  const targetChecks = evaluateSourceAcquisitionTargets(sourceAcquisitionTargets);
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      evaluateSourceAcquisitionRow(rowId, rows[rowId], targetChecks),
    ]),
  );
  const failures = [
    ...Object.values(rowChecks).flatMap((check) => {
      const rowFailures = [];
      if (
        check.missingDeclaredRequiredRows.length > 0 ||
        check.extraDeclaredRequiredRows.length > 0
      ) {
        rowFailures.push({
          rowId: check.rowId,
          reason: "required_source_rows_declaration_mismatch",
          missingDeclaredRequiredRows: check.missingDeclaredRequiredRows,
          extraDeclaredRequiredRows: check.extraDeclaredRequiredRows,
        });
      }
      if (check.missingAcceptedSourceRows.length > 0) {
        rowFailures.push({
          rowId: check.rowId,
          reason: "missing_accepted_source_rows",
          missingAcceptedSourceRows: check.missingAcceptedSourceRows,
        });
      }
      return rowFailures;
    }),
    ...Object.values(targetChecks)
      .filter((check) => check.accepted !== true)
      .map((check) => ({
        sourceRowId: check.sourceRowId,
        reason: sourceAcquisitionTargetFailureReason(check),
        status: check.status,
        currentEvidenceStatus: check.currentEvidenceStatus,
        missingRequiredComponents: check.missingRequiredComponents,
        extraRequiredComponents: check.extraRequiredComponents,
      })),
  ];
  return {
    requiredDeclarationField: "requiredSourceRows",
    acceptedRowsField: "acceptedSourceRows",
    sourceAcquisitionTargetsField: "sourceAcquisitionTargets",
    targetChecks,
    rowChecks,
    failures,
    firstMissingSourceRow:
      Object.values(rowChecks)
        .flatMap((check) => check.missingAcceptedSourceRows)
        .find(Boolean) ?? null,
    passed: failures.length === 0,
  };
}

function evaluateSourceAcquisitionTargets(sourceAcquisitionTargets) {
  const expectedSourceRows = [
    ...new Set([
      ...Object.values(REQUIRED_SOURCE_ROWS).flat(),
      ...Object.keys(sourceAcquisitionTargets ?? {}),
    ]),
  ];
  return Object.fromEntries(
    expectedSourceRows.map((sourceRowId) => {
      const target = sourceAcquisitionTargets[sourceRowId];
      const present =
        target && typeof target === "object" && !Array.isArray(target);
      const status = present ? normalizeStatus(target) : "missing";
      const currentEvidenceStatus = present
        ? target.currentEvidenceStatus ?? null
        : null;
      const acceptedStatus = ACCEPTED_STATUSES.has(status);
      const evidenceAccepted = ACCEPTED_EVIDENCE_STATUSES.has(currentEvidenceStatus);
      const expectedRequiredComponents =
        REQUIRED_SOURCE_TARGET_COMPONENTS[sourceRowId] ?? [];
      const requiredLedgerComponents = Array.isArray(
        target?.requiredLedgerComponents,
      )
        ? target.requiredLedgerComponents
        : [];
      const missingRequiredComponents = expectedRequiredComponents.filter(
        (component) => !requiredLedgerComponents.includes(component),
      );
      const extraRequiredComponents = requiredLedgerComponents.filter(
        (component) => !expectedRequiredComponents.includes(component),
      );
      const componentShapePass =
        missingRequiredComponents.length === 0 &&
        extraRequiredComponents.length === 0;
      return [
        sourceRowId,
        {
          sourceRowId,
          targetId: present ? target.id ?? target.rowId ?? null : null,
          present,
          status,
          currentEvidenceStatus,
          acceptedStatus,
          evidenceAccepted,
          expectedRequiredComponents,
          requiredLedgerComponents,
          missingRequiredComponents,
          extraRequiredComponents,
          componentShapePass,
          accepted: acceptedStatus && evidenceAccepted && componentShapePass,
          sourceTargetPath: present ? target.sourceTargetPath ?? null : null,
          requiredScope: present ? target.requiredScope ?? null : null,
        },
      ];
    }),
  );
}

function evaluateSourceAcquisitionRow(rowId, row, targetChecks) {
  const expectedRequiredRows = REQUIRED_SOURCE_ROWS[rowId] ?? [];
  const declaredRequiredRows = Array.isArray(row?.requiredSourceRows)
    ? row.requiredSourceRows
    : [];
  const acceptedSourceRows = Array.isArray(row?.acceptedSourceRows)
    ? row.acceptedSourceRows
    : Array.isArray(row?.satisfiedSourceRows)
      ? row.satisfiedSourceRows
      : [];
  const acceptedTargetRows = new Set(
    Object.values(targetChecks)
      .filter((check) => check.accepted === true)
      .map((check) => check.sourceRowId),
  );
  const missingDeclaredRequiredRows = expectedRequiredRows.filter(
    (sourceRow) => !declaredRequiredRows.includes(sourceRow),
  );
  const extraDeclaredRequiredRows = declaredRequiredRows.filter(
    (sourceRow) => !expectedRequiredRows.includes(sourceRow),
  );
  const missingAcceptedSourceRows = declaredRequiredRows.filter(
    (sourceRow) =>
      !acceptedSourceRows.includes(sourceRow) ||
      !acceptedTargetRows.has(sourceRow),
  );
  const unacceptedSourceTargets = declaredRequiredRows.filter(
    (sourceRow) => !acceptedTargetRows.has(sourceRow),
  );
  return {
    rowId,
    expectedRequiredRows,
    declaredRequiredRows,
    acceptedSourceRows,
    missingDeclaredRequiredRows,
    extraDeclaredRequiredRows,
    missingAcceptedSourceRows,
    unacceptedSourceTargets,
    passed:
      missingDeclaredRequiredRows.length === 0 &&
      extraDeclaredRequiredRows.length === 0 &&
      missingAcceptedSourceRows.length === 0,
  };
}

function evaluateAcceptedSourceRowProofTargets(proofTargets, toyBindingRows) {
  const targets = Object.fromEntries(
    Object.entries(REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS).map(
      ([rowId, expected]) => [
        rowId,
        evaluateAcceptedSourceRowProofTarget(
          rowId,
          proofTargets[rowId],
          expected,
          toyBindingRows,
        ),
      ],
    ),
  );
  const failures = Object.values(targets).flatMap((target) =>
    target.passed
      ? []
      : [
          {
            rowId: target.rowId,
            reason: acceptedSourceRowProofTargetFailureReason(target),
            missingFields: target.missingFields,
            mismatchedFields: target.mismatchedFields,
          },
        ],
  );
  return {
    summary: {
      requiredField: "acceptedSourceRowProofTargets",
      requiredRows: Object.keys(REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS),
      passed: failures.length === 0,
      failures,
    },
    targets,
  };
}

function evaluateAcceptedSourceRowProofTarget(
  rowId,
  target,
  expected,
  toyBindingRows,
) {
  const present = target && typeof target === "object" && !Array.isArray(target);
  const status = present ? normalizeStatus(target) : "missing";
  const claimLevel = present ? target.claimLevel ?? null : null;
  const expectedArrayFields = Object.keys(expected);
  const missingFields = [
    ...requiredStringFields(target, ["id", "claimLevel", "currentEvidenceStatus"]),
    ...requiredArrayFields(target, expectedArrayFields),
  ];
  const mismatchedFields = [];
  if (status !== "target_required") {
    mismatchedFields.push("status");
  }
  if (typeof claimLevel !== "string" || !claimLevel.includes("not accepted source evidence")) {
    mismatchedFields.push("claimLevel");
  }
  for (const [field, expectedRows] of Object.entries(expected)) {
    if (!sameStringSet(target?.[field], expectedRows)) {
      mismatchedFields.push(field);
    }
  }
  return {
    rowId,
    targetId: present ? target.id ?? null : null,
    present,
    status,
    currentEvidenceStatus: present ? target.currentEvidenceStatus ?? null : null,
    claimLevel,
    requiredAcceptedSourceRowsBeforeUse:
      target?.requiredAcceptedSourceRowsBeforeUse ?? [],
    requiredSameRecordRows: target?.requiredSameRecordRows ?? [],
    requiredClosureRows: target?.requiredClosureRows ?? [],
    requiredExtractionCertificateRows:
      target?.requiredExtractionCertificateRows ?? [],
    requiredEnvelopeBundleRows: target?.requiredEnvelopeBundleRows ?? [],
    requiredResidualDerivationRows:
      target?.requiredResidualDerivationRows ?? [],
    requiredLimitStatements: target?.requiredLimitStatements ?? [],
    requiredTailLimitStatements: target?.requiredTailLimitStatements ?? [],
    forbiddenPromotionSources: target?.forbiddenPromotionSources ?? [],
    currentPriorityPacket: present ? target.currentPriorityPacket ?? null : null,
    directToyConsumers: directToyConsumersForConfinementRows(toyBindingRows, [rowId]),
    missingFields,
    mismatchedFields,
    passed:
      present &&
      missingFields.length === 0 &&
      mismatchedFields.length === 0,
  };
}

function requiredStringFields(target, fields) {
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return fields;
  }
  return fields.filter((field) => typeof target[field] !== "string" || target[field] === "");
}

function requiredArrayFields(target, fields) {
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return fields;
  }
  return fields.filter((field) => !Array.isArray(target[field]));
}

function acceptedSourceRowProofTargetFailureReason(target) {
  if (target.present !== true) {
    return "accepted_source_row_proof_target_missing";
  }
  if (target.missingFields.length > 0) {
    return "accepted_source_row_proof_target_field_missing";
  }
  return "accepted_source_row_proof_target_shape_mismatch";
}

function sameStringSet(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    return false;
  }
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value) => right.includes(value));
}

function sourceAcquisitionTargetFailureReason(check) {
  if (check.present !== true) {
    return "source_acquisition_target_missing";
  }
  if (check.componentShapePass !== true) {
    return "source_acquisition_target_shape_mismatch";
  }
  return "source_acquisition_target_not_accepted";
}

function buildSourceAcquisitionBlockerMap({
  sourceAcquisitionCheck,
  toyBindingRows,
  acceptedSourceRowProofTargets,
}) {
  const missingSourceRows = [
    ...new Set(
      Object.values(sourceAcquisitionCheck.rowChecks)
        .flatMap((check) => check.missingAcceptedSourceRows),
    ),
  ];
  const blockers = missingSourceRows.map((sourceRowId) =>
    sourceAcquisitionBlocker(
      sourceAcquisitionCheck,
      toyBindingRows,
      sourceRowId,
      acceptedSourceRowProofTargets,
    ),
  );
  const firstBlocker = blockers[0] ?? null;
  return {
    status:
      blockers.length === 0
        ? "all_required_source_rows_acquired"
        : "blocked_missing_accepted_source_rows",
    claimLevel:
      "source-acquisition blocker map; not accepted source evidence and not promotion evidence",
    firstMissingAcceptedSourceRow: firstBlocker?.sourceRowId ?? null,
    firstMissingObject: firstBlocker
      ? `missing_accepted_${firstBlocker.sourceRowId}`
      : null,
    blockedSourceRowCount: blockers.length,
    blockers,
  };
}

function sourceAcquisitionBlocker(
  sourceAcquisitionCheck,
  toyBindingRows,
  sourceRowId,
  acceptedSourceRowProofTargets,
) {
  const targetCheck = sourceAcquisitionCheck.targetChecks[sourceRowId] ?? {};
  const blockedConfinementRows = Object.values(sourceAcquisitionCheck.rowChecks)
    .filter((check) => check.missingAcceptedSourceRows.includes(sourceRowId))
    .map((check) => check.rowId);
  return {
    sourceRowId,
    targetId: targetCheck.targetId ?? null,
    status: targetCheck.status ?? null,
    currentEvidenceStatus: targetCheck.currentEvidenceStatus ?? null,
    accepted: targetCheck.accepted === true,
    sourceTargetPath: targetCheck.sourceTargetPath ?? null,
    requiredScope: targetCheck.requiredScope ?? null,
    requiredLedgerComponents: targetCheck.requiredLedgerComponents ?? [],
    missingRequiredComponents: targetCheck.missingRequiredComponents ?? [],
    blockedConfinementRows,
    acceptedSourceRowProofTargets: Object.fromEntries(
      blockedConfinementRows
        .map((rowId) => [
          rowId,
          acceptedSourceRowProofTargets?.targets?.[rowId] ?? null,
        ])
        .filter(([, target]) => target),
    ),
    sourceAcquisitionRoute: sourceAcquisitionRouteForSourceRow(
      sourceRowId,
      targetCheck,
      blockedConfinementRows,
    ),
    directToyConsumers: directToyConsumersForConfinementRows(
      toyBindingRows,
      [sourceRowId, ...blockedConfinementRows],
    ),
    nextProofTarget:
      targetCheck.requiredScope ??
      `accepted ${sourceRowId} source row in the same confinement-functional record`,
  };
}

function sourceAcquisitionRouteForSourceRow(
  sourceRowId,
  targetCheck,
  blockedConfinementRows,
) {
  const route = SOURCE_ACQUISITION_ROUTES[sourceRowId] ?? {};
  return {
    claimLevel:
      "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
    requiredRowsBeforeUse: targetCheck.requiredLedgerComponents ?? [],
    requiredAcceptedRowsBeforeUse: route.requiredAcceptedRowsBeforeUse ?? [],
    feedsRowsAfterAcceptance:
      route.feedsRowsAfterAcceptance ?? blockedConfinementRows,
    notRequiredBeforeAcceptance: route.notRequiredBeforeAcceptance ?? [],
  };
}

function directToyConsumersForConfinementRows(toyBindingRows, rows) {
  return {
    coefficients: toyConsumersForConfinementRows(
      toyBindingRows.coefficients ?? {},
      rows,
    ),
    graphRules: toyConsumersForConfinementRows(
      toyBindingRows.graphRules ?? {},
      rows,
    ),
  };
}

function toyConsumersForConfinementRows(bindings, rows) {
  return Object.entries(bindings)
    .filter(([, boundRows]) =>
      Array.isArray(boundRows) && boundRows.some((row) => rows.includes(row)),
    )
    .map(([consumer]) => consumer);
}

function evaluateSourceRowDependencies(rowId, row) {
  const expected = REQUIRED_SOURCE_ROWS[rowId] ?? [];
  const observed = Array.isArray(row?.requiredSourceRows)
    ? row.requiredSourceRows
    : [];
  const missing = expected.filter((value) => !observed.includes(value));
  const extra = observed.filter((value) => !expected.includes(value));
  return {
    expected,
    observed,
    missing,
    extra,
    passed: missing.length === 0 && extra.length === 0,
  };
}

function evaluateEquationTokens(raw, tokens) {
  const equation = typeof raw === "string" ? raw : "";
  const missing = tokens.filter((token) => !equation.includes(token));
  return {
    requiredTokens: tokens,
    missingTokens: missing,
    passed: missing.length === 0,
  };
}

function evaluateNoOpenColorBehavior(raw) {
  const text = typeof raw === "string" ? raw : "";
  const requiredTokens = [
    "Delta E_corr_NN(r) tends to zero",
    "r tends to infinity",
    "no residual open-color far field",
  ];
  const missingTokens = requiredTokens.filter((token) => !text.includes(token));
  return {
    requiredTokens,
    missingTokens,
    passed: missingTokens.length === 0,
  };
}

function evaluateToyBindingRows(raw) {
  const failures = [
    ...evaluateToyBindingGroup("coefficients", raw.coefficients ?? {}),
    ...evaluateToyBindingGroup("graphRules", raw.graphRules ?? {}),
  ];
  const consumedRows = new Set(
    [
      ...Object.values(raw.coefficients ?? {}).flat(),
      ...Object.values(raw.graphRules ?? {}).flat(),
    ].filter((value) => typeof value === "string"),
  );
  const unconsumedRequiredRows = REQUIRED_ROWS.filter((rowId) => !consumedRows.has(rowId));
  return {
    passed: failures.length === 0 && unconsumedRequiredRows.length === 0,
    failures,
    unconsumedRequiredRows,
  };
}

function evaluateToyBindingGroup(groupName, observedGroup) {
  const expectedGroup = REQUIRED_TOY_BINDING_ROWS[groupName] ?? {};
  const failures = [];
  for (const [id, expectedRows] of Object.entries(expectedGroup)) {
    const observedRows = observedGroup[id] ?? [];
    const missing = expectedRows.filter((row) => !observedRows.includes(row));
    const extra = observedRows.filter((row) => !expectedRows.includes(row));
    if (missing.length > 0 || extra.length > 0) {
      failures.push({ group: groupName, id, missing, extra });
    }
  }
  for (const id of Object.keys(observedGroup)) {
    if (!Object.hasOwn(expectedGroup, id)) {
      failures.push({
        group: groupName,
        id,
        missing: [],
        extra: observedGroup[id],
      });
    }
  }
  return failures;
}

function decideStatus({
  schemaOk,
  structuralFailures,
  sourceEvidenceCheck,
  acceptedSourceRowProofTargets,
  sourceAcquisitionCheck,
  missingRows,
}) {
  if (!schemaOk) {
    return "schema_mismatch";
  }
  if (structuralFailures.length > 0) {
    return "confinement_functional_structure_mismatch";
  }
  if (sourceEvidenceCheck.passed !== true) {
    return "confinement_functional_source_evidence_mismatch";
  }
  if (acceptedSourceRowProofTargets.summary.passed !== true) {
    return "confinement_functional_proof_target_incomplete";
  }
  if (missingRows.length > 0) {
    return "missing_accepted_confinement_functional_rows";
  }
  if (sourceAcquisitionCheck.passed !== true) {
    return "confinement_functional_source_acquisition_incomplete";
  }
  return "accepted_confinement_functional_source_rows";
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return typeof row.status === "string" ? row.status : "missing";
}
