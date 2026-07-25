#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  providerSourcePathRejectionReason,
} from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";
import { buildConfinementFunctionalSourceTargetCheck } from "./confinement-functional-source-target-check.mjs";
import { buildNoetherSeaResponseSourceTargetCheck } from "./noether-sea-response-source-target-check.mjs";
import { buildNucleonBranchInterfaceSourceTargetCheck } from "./nucleon-branch-interface-source-target-check.mjs";
import { buildWeakChannelSourceTargetCheck } from "./weak-channel-source-target-check.mjs";

export const SCHEMA = "iron_group_binding_cusp_toy_graph_sweep/v0";
export const SOURCE_BINDING_SCHEMA =
  "iron_group_binding_cusp_source_binding_candidates/v1";
export const SOURCE_BINDING_REPORT_SCHEMA =
  "iron_group_binding_cusp_source_binding_report/v0";
export const FE_NI_WINDOW = Object.freeze({
  aMin: 45,
  aMax: 70,
  zMin: 20,
  zMax: 30,
});

const SCRIPT_PATH = new URL(import.meta.url).pathname;
const SCRIPT_DIR = path.dirname(SCRIPT_PATH);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_SOURCE_BINDING_PATH = path.join(
  SCRIPT_DIR,
  "iron-group-binding-cusp-source-binding-candidates.v1.json",
);

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);

const REQUIRED_SOURCE_FAMILIES = Object.freeze([
  "branch_interface",
  "confinement_functional",
  "weak_channel",
  "noether_sea_response",
]);

const SOURCE_BINDING_ORDER = Object.freeze([
  "branch_interface",
  "confinement_functional",
  "weak_channel",
  "noether_sea_response",
]);

const COEFFICIENT_SOURCE_FAMILIES = Object.freeze({
  alphaCorr: ["branch_interface", "confinement_functional"],
  alphaSea: ["noether_sea_response", "confinement_functional"],
  alphaSurf: ["confinement_functional"],
  alphaCoul: ["branch_interface"],
  alphaAsym: ["weak_channel"],
  alphaPair: ["confinement_functional", "branch_interface"],
  alphaShell: ["confinement_functional"],
  alphaPack: ["confinement_functional", "branch_interface"],
  boundaryDegreeLoss: ["confinement_functional"],
  dSat: ["branch_interface", "confinement_functional"],
  maxDegree: ["branch_interface", "confinement_functional"],
  betaValleySlope: ["weak_channel"],
  seaImbalancePenalty: ["noether_sea_response", "weak_channel"],
  packSoftA: ["confinement_functional"],
  pnCorridorPairReward: ["branch_interface", "confinement_functional"],
  pnPairMismatchCost: ["branch_interface"],
  ppCorridorPairReward: ["branch_interface", "confinement_functional"],
  ppPairMismatchCost: ["branch_interface"],
  ppCoulombCost: ["branch_interface"],
});

const GRAPH_RULE_SOURCE_FAMILIES = Object.freeze({
  bounded_degree_surface_depleted_corridor_estimator: [
    "branch_interface",
    "confinement_functional",
  ],
  beta_stable_band_center: ["weak_channel"],
  noether_sea_polarization_reward: ["noether_sea_response"],
  finite_tail_saturation_check: ["confinement_functional", "branch_interface"],
});

const COEFFICIENT_SOURCE_ROW_REQUIREMENTS = Object.freeze({
  alphaCorr: {
    branch_interface: ["nucleon_branch_interface_ledgers"],
    confinement_functional: ["delta_E_corr_NN"],
  },
  alphaSea: {
    noether_sea_response: ["rho_NS", "theta_sea", "stress_strain_row"],
    confinement_functional: ["sigma_eff_extraction"],
  },
  alphaSurf: {
    confinement_functional: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
  },
  alphaCoul: {
    branch_interface: ["same_record_energy_momentum_angular_momentum_ledger"],
  },
  alphaAsym: {
    weak_channel: ["weak_quotient", "weak_exposure_record", "reaction_event_ledger"],
  },
  alphaPair: {
    confinement_functional: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
    branch_interface: ["nucleon_branch_interface_ledgers"],
  },
  alphaShell: {
    confinement_functional: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
  },
  alphaPack: {
    confinement_functional: [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
    branch_interface: ["nucleon_branch_interface_ledgers"],
  },
  boundaryDegreeLoss: {
    confinement_functional: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
  },
  dSat: {
    branch_interface: ["nucleon_branch_interface_ledgers"],
    confinement_functional: [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
  },
  maxDegree: {
    branch_interface: ["nucleon_branch_interface_ledgers"],
    confinement_functional: [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
  },
  betaValleySlope: {
    weak_channel: ["weak_quotient", "weak_projection", "reaction_event_ledger"],
  },
  seaImbalancePenalty: {
    noether_sea_response: ["rho_NS", "theta_sea"],
    weak_channel: ["weak_quotient", "noether_sea_response"],
  },
  packSoftA: {
    confinement_functional: [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
  },
  pnCorridorPairReward: {
    branch_interface: ["pn_orientation_count"],
    confinement_functional: ["sigma_eff_extraction", "delta_E_corr_NN"],
  },
  pnPairMismatchCost: {
    branch_interface: [
      "pn_orientation_count",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  },
  ppCorridorPairReward: {
    branch_interface: ["pp_orientation_count"],
    confinement_functional: ["sigma_eff_extraction", "delta_E_corr_NN"],
  },
  ppPairMismatchCost: {
    branch_interface: [
      "pp_orientation_count",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  },
  ppCoulombCost: {
    branch_interface: ["same_record_energy_momentum_angular_momentum_ledger"],
  },
});

const GRAPH_RULE_SOURCE_ROW_REQUIREMENTS = Object.freeze({
  bounded_degree_surface_depleted_corridor_estimator: {
    branch_interface: ["nucleon_branch_interface_ledgers"],
    confinement_functional: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
  },
  beta_stable_band_center: {
    weak_channel: ["weak_quotient", "weak_exposure_record", "reaction_event_ledger"],
  },
  noether_sea_polarization_reward: {
    noether_sea_response: [
      "rho_NS",
      "theta_sea",
      "stress_strain_row",
      "causality_row",
    ],
  },
  finite_tail_saturation_check: {
    confinement_functional: [
      "delta_E_corr_NN",
      "finite_range_residual",
      "no_open_color_far_field",
    ],
    branch_interface: ["nucleon_branch_interface_ledgers"],
  },
});

const FAMILY_DISTINCTION_LOCKS = Object.freeze([
  {
    id: "weak_channel_noether_sea_response_not_retained_window_provider",
    coefficient: "seaImbalancePenalty",
    providerFamily: "noether_sea_response",
    providerRows: ["rho_NS", "theta_sea"],
    weakFamily: "weak_channel",
    weakRows: ["weak_quotient", "noether_sea_response"],
    blockedRow: "noether_sea_response",
    rule:
      "The accepted retained-window Noether sea response family cannot satisfy the same-event weak-channel noether_sea_response row consumed by seaImbalancePenalty.",
  },
]);

const FAILURE_ORDER = Object.freeze([
  "deuteron_unbound",
  "diproton_overbound",
  "no_saturation",
  "wrong_cusp_region",
  "hidden_fit",
  "ledger_loss",
  "shielded_energy_leak",
]);

const RELEASE_LEDGER_ROUTES = Object.freeze([
  "daughter_binding_rows",
  "emitted_products_when_present",
  "recoil",
  "heat",
  "photon_rows_when_present",
  "medium_exchange",
  "Noether_sea_update",
]);

const DEFAULT_SWEEP = Object.freeze({
  aMin: 2,
  aMax: 240,
  betaBandHalfWidth: 3,
  saturationTailWindow: 5,
  saturationDropMinimum: 0.2,
});

export const DEFAULT_COEFFICIENTS = Object.freeze({
  alphaCorr: 15.2,
  alphaSea: 0.55,
  alphaSurf: 18.2,
  alphaCoul: 0.714,
  alphaAsym: 23.2,
  alphaPair: 11.2,
  alphaShell: 0.8,
  alphaPack: 0.08,
  boundaryDegreeLoss: 0.08,
  dSat: 6,
  maxDegree: 6,
  betaValleySlope: 0.015,
  seaImbalancePenalty: 0.5,
  packSoftA: 190,
  pnCorridorPairReward: 2.4,
  pnPairMismatchCost: 0.2,
  ppCorridorPairReward: 0.8,
  ppPairMismatchCost: 1.0,
  ppCoulombCost: 0.8,
});

const COEFFICIENT_ROWS = Object.freeze({
  alphaCorr: {
    symbol: "alpha_corr",
    role: "shared local residual-corridor reward per nucleon",
  },
  alphaSea: {
    symbol: "alpha_sea",
    role: "bounded Noether sea polarization reward from compatible local corridors",
  },
  alphaSurf: {
    symbol: "alpha_surf",
    role: "surface corridor loss for boundary nucleons",
  },
  alphaCoul: {
    symbol: "alpha_C",
    role: "assembly-scale proton-proton electrical stress",
  },
  alphaAsym: {
    symbol: "alpha_asym",
    role: "proton-neutron imbalance pressure used by the beta-stable band",
  },
  alphaPair: {
    symbol: "alpha_pair",
    role: "global even/odd closed-pattern readout",
  },
  alphaShell: {
    symbol: "alpha_shell",
    role: "global closed-pattern readout around shared magic counts",
  },
  alphaPack: {
    symbol: "alpha_pack",
    role: "large-assembly over-packing residual",
  },
  boundaryDegreeLoss: {
    symbol: "lambda_boundary",
    role: "degree loss in the surface-depleted graph estimator",
  },
  dSat: {
    symbol: "d_sat",
    role: "corridor-capacity saturation degree",
  },
  maxDegree: {
    symbol: "d_max",
    role: "bounded local graph degree",
  },
  betaValleySlope: {
    symbol: "k_beta",
    role: "global beta-stable band center slope",
  },
  seaImbalancePenalty: {
    symbol: "eta_sea",
    role: "Noether sea compatibility penalty for proton-neutron imbalance",
  },
  packSoftA: {
    symbol: "A_pack",
    role: "large-A onset scale for the over-packing residual",
  },
  pnCorridorPairReward: {
    symbol: "p_n_pair_reward",
    role: "same-row p+n pair corridor reward used by the deuteron control",
  },
  pnPairMismatchCost: {
    symbol: "p_n_pair_mismatch",
    role: "p+n pair branch-interface mismatch cost",
  },
  ppCorridorPairReward: {
    symbol: "p_p_pair_reward",
    role: "same-row p+p corridor reward before mismatch and Coulomb controls",
  },
  ppPairMismatchCost: {
    symbol: "p_p_pair_mismatch",
    role: "p+p branch-interface mismatch cost",
  },
  ppCoulombCost: {
    symbol: "p_p_coulomb",
    role: "two-proton Coulomb cost used by the diproton control",
  },
});

const MAGIC_COUNTS = Object.freeze([2, 8, 20, 28, 50, 82, 126]);
const HEAVY_SPLIT_PARENT = Object.freeze({ A: 236, Z: 92 });

if (process.argv[1] === SCRIPT_PATH) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const report = buildIronGroupBindingCuspToySweep(args);
  writeOutput(report, args);
  if (args.requirePass && report.summary.firstFailure !== null) {
    process.exitCode = 1;
  }
  if (
    args.requirePromotionReady &&
    report.sourceBinding?.summary?.allPromotionBindingsAccepted !== true
  ) {
    process.exitCode = 1;
  }
}

export function buildIronGroupBindingCuspToySweep(options = {}) {
  const sweepOptions = {
    ...DEFAULT_SWEEP,
    aMin: options.aMin ?? DEFAULT_SWEEP.aMin,
    aMax: options.aMax ?? DEFAULT_SWEEP.aMax,
  };
  validateSweepOptions(sweepOptions);
  const coefficients = {
    ...DEFAULT_COEFFICIENTS,
    ...(options.coefficientOverrides ?? {}),
  };
  validateCoefficients(coefficients);
  const coefficientRows = makeCoefficientRows(
    coefficients,
    options.coefficientScopeOverrides ?? {},
  );
  const sourceBinding = buildSourceBindingReport(
    loadSourceBindingManifest(options),
    {
      sourceRef: options.sourceBindingPath ?? DEFAULT_SOURCE_BINDING_PATH,
      coefficientRows,
    },
  );

  const sweepRows = [];
  for (let A = sweepOptions.aMin; A <= sweepOptions.aMax; A += 1) {
    sweepRows.push(bestRowForA(A, coefficients, sweepOptions));
  }

  const peak = sweepRows.reduce((best, row) =>
    row.bStar > best.bStar ? row : best,
  );
  const deuteron = evaluateAZ(2, 1, coefficients);
  const diproton = evaluateAZ(2, 2, coefficients);
  const heavySplit = representativeHeavySplit(coefficients);
  const saturation = saturationCheck(sweepRows, peak, sweepOptions);
  const negativeControls = makeNegativeControls({
    peak,
    deuteron,
    diproton,
    saturation,
    coefficientRows,
    heavySplit,
  });
  const firstFailure = firstFailureRow(negativeControls);

  return {
    schema: SCHEMA,
    generatedAt: new Date().toISOString(),
    artifactStatus: "priority_only_first_executable_toy_graph_sweep",
    claimLevel:
      "row-shape diagnostic only; not empirical nuclear-binding recovery and not reader-facing canon",
    sourcePacket:
      "reference/priorities/nuclear-atomic-molecular-closure/iron-group-binding-cusp-recovery.md",
    graphGenerationRule: {
      id: "bounded_degree_surface_depleted_corridor_estimator/v0",
      description:
        "A compressed graph estimator with bounded local degree, shared corridor saturation, a beta-stable Z band, and no element-specific coefficients.",
      aRange: { min: sweepOptions.aMin, max: sweepOptions.aMax },
      betaStableBand: {
        center:
          "Z_beta(A)=A/(2+k_beta A^(2/3)); sweep integer Z within +/- betaBandHalfWidth",
        betaBandHalfWidth: sweepOptions.betaBandHalfWidth,
      },
      magicCounts: [...MAGIC_COUNTS],
      feNiWindow: { ...FE_NI_WINDOW },
      sourceFamilyBindings: GRAPH_RULE_SOURCE_FAMILIES,
    },
    coefficientSet: {
      id: "iron_group_cusp_shared_global_toy_coefficients/v0",
      status: "toy_diagnostic_not_empirical_fit",
      coefficientStatus:
        "all coefficients are shared across the full A,Z sweep unless a caller explicitly marks a scope override",
      rows: coefficientRows,
      sourceFamilyBindings: coefficientSourceFamilyBindings(coefficientRows),
    },
    summary: {
      verdict:
        firstFailure === null
          ? "fe_ni_window_toy_sweep_passed_priority_controls"
          : `fail_closed_${firstFailure}`,
      firstFailure,
      feNiWindowPass: inFeNiWindow(peak.A, peak.selectedZ),
      peak: {
        A: peak.A,
        Z: peak.selectedZ,
        N: peak.neutronCount,
        bStar: peak.bStar,
        bindingTotal: peak.bindingTotal,
      },
      sweepRowCount: sweepRows.length,
      negativeControlPass: firstFailure === null,
      sourceBindingStatus: sourceBinding.summary.status,
      sourceBindingFirstMissingFamily: sourceBinding.summary.firstMissingFamily,
      sourceBindingFirstMissingObject: sourceBinding.summary.firstMissingObject,
      scoreDecision: "no_score_increase",
    },
    sourceBinding,
    sweepRows,
    comparisonRows: {
      deuteron: pairComparisonRow("deuteron", deuteron),
      diproton: pairComparisonRow("diproton", diproton),
      saturation,
      representativeHeavySplit: heavySplit,
    },
    negativeControls,
    releaseAccounting: {
      survivingNucleonShieldedEnergyUsed: false,
      ordinaryFissionFusionLedgerRoutes: [...RELEASE_LEDGER_ROUTES],
      ordinaryFissionFusionScope:
        "higher-level nuclear assembly energy, emitted products, recoil, heat, photon rows when present, medium exchange, and Noether sea update rows",
      shieldedEnergyPolicy:
        "the toy does not route ordinary fission or fusion through exposed shielded internal branch energy of surviving protons or neutrons",
      promotionInvariant:
        "no corpus promotion unless fission/fusion release accounting stays on nuclear assembly, emitted-product, recoil, heat, photon, medium-exchange, and Noether sea update rows with surviving-nucleon shielded energy excluded",
    },
    authorization: {
      acceptedNuclearBindingRecovery: false,
      acceptedIronGroupCuspRecovery: false,
      sourceBindingPreconditionsMet:
        sourceBinding.summary.allPromotionBindingsAccepted === true,
      contentPromotionAuthorized: false,
      equationMappingScoreMovement: "no_score_increase",
    },
  };
}

export function validationErrors(report) {
  const errors = [];
  if (report?.schema !== SCHEMA) {
    errors.push("schema_mismatch");
  }
  if (!Array.isArray(report?.sweepRows) || report.sweepRows.length === 0) {
    errors.push("sweep_rows_missing");
  }
  if (!report?.coefficientSet?.rows?.length) {
    errors.push("coefficient_rows_missing");
  }
  if (!report?.comparisonRows?.deuteron) {
    errors.push("deuteron_comparison_missing");
  }
  if (!report?.comparisonRows?.diproton) {
    errors.push("diproton_comparison_missing");
  }
  if (!report?.comparisonRows?.saturation) {
    errors.push("saturation_comparison_missing");
  }
  if (!report?.comparisonRows?.representativeHeavySplit) {
    errors.push("heavy_split_comparison_missing");
  }
  if (!report?.negativeControls) {
    errors.push("negative_controls_missing");
  } else {
    for (const row of FAILURE_ORDER) {
      if (!report.negativeControls[row]) {
        errors.push(`negative_control_missing_${row}`);
      }
    }
    const expectedFirstFailure = firstFailureRow(report.negativeControls);
    if (report.summary?.firstFailure !== expectedFirstFailure) {
      errors.push("first_failure_mismatch");
    }
  }
  appendReleaseAccountingErrors(errors, report);
  if (report?.sourceBinding?.schema !== SOURCE_BINDING_REPORT_SCHEMA) {
    errors.push("source_binding_report_missing");
  } else if (
    report.summary?.sourceBindingStatus !== report.sourceBinding.summary?.status
  ) {
    errors.push("source_binding_status_mismatch");
  } else {
    if (!report.sourceBinding?.graphRuleRowBindings) {
      errors.push("source_binding_graph_rule_row_bindings_missing");
    }
    if (!report.sourceBinding?.coefficientBindings?.alphaCorr?.requiredRowsByFamily) {
      errors.push("source_binding_coefficient_row_bindings_missing");
    }
    appendRowBindingCoverageErrors(errors, report);
    appendRowEvidenceTraceErrors(errors, report);
    appendSourceRowRequirementIndexErrors(errors, report);
    appendFamilyDistinctionLockErrors(errors, report);
    appendPartialSourceMarkerLockErrors(errors, report);
    appendSourceAcquisitionRouteErrors(errors, report);
    appendSourceBindingSummaryErrors(errors, report);
    if (
      report.authorization?.sourceBindingPreconditionsMet !==
      report.sourceBinding.summary?.allPromotionBindingsAccepted
    ) {
      errors.push("source_binding_precondition_authorization_mismatch");
    }
  }
  return errors;
}

function appendReleaseAccountingErrors(errors, report) {
  const releaseAccounting = report?.releaseAccounting;
  if (!releaseAccounting) {
    errors.push("release_accounting_missing");
    return;
  }
  if (releaseAccounting.survivingNucleonShieldedEnergyUsed !== false) {
    errors.push("release_accounting_shielded_energy_leak");
  }
  appendRequiredLedgerRouteErrors(
    errors,
    "release_accounting",
    releaseAccounting.ordinaryFissionFusionLedgerRoutes,
  );
  const heavySplit = report?.comparisonRows?.representativeHeavySplit;
  appendRequiredLedgerRouteErrors(
    errors,
    "heavy_split",
    heavySplit?.declaredLedgerRoutes,
  );
  if (
    report?.negativeControls?.shielded_energy_leak
      ?.survivingNucleonShieldedEnergyUsed !==
    releaseAccounting.survivingNucleonShieldedEnergyUsed
  ) {
    errors.push("release_accounting_negative_control_mismatch");
  }
  if (
    !sameStringSet(
      report?.negativeControls?.ledger_loss?.declaredLedgerRoutes,
      heavySplit?.declaredLedgerRoutes,
    )
  ) {
    errors.push("release_accounting_ledger_control_mismatch");
  }
}

function appendRequiredLedgerRouteErrors(errors, context, routes) {
  if (!Array.isArray(routes)) {
    errors.push(`${context}_ledger_routes_missing`);
    return;
  }
  for (const route of RELEASE_LEDGER_ROUTES) {
    if (!routes.includes(route)) {
      errors.push(`${context}_ledger_route_missing_${route}`);
    }
  }
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

function appendRowBindingCoverageErrors(errors, report) {
  const coverage = report?.sourceBinding?.rowBindingCoverage;
  if (!coverage) {
    errors.push("source_binding_row_binding_coverage_missing");
  } else {
    for (const name of coverage.coefficients?.uncovered ?? []) {
      errors.push(`coefficient_row_binding_coverage_uncovered_${name}`);
    }
    for (const ruleId of coverage.graphRules?.uncovered ?? []) {
      errors.push(`graph_rule_row_binding_coverage_uncovered_${ruleId}`);
    }
  }

  const coefficientRows = report?.coefficientSet?.rows ?? [];
  const coefficientBindings = report?.sourceBinding?.coefficientBindings ?? {};
  for (const row of coefficientRows) {
    const binding = coefficientBindings[row.name];
    if (!binding) {
      errors.push(`coefficient_binding_missing_${row.name}`);
      continue;
    }
    appendBindingCompletenessErrors(errors, "coefficient", row.name, binding);
  }

  const graphRuleBindings = report?.sourceBinding?.graphRuleBindings ?? {};
  const graphRuleRowBindings = report?.sourceBinding?.graphRuleRowBindings ?? {};
  for (const ruleId of Object.keys(graphRuleBindings)) {
    const binding = graphRuleRowBindings[ruleId];
    if (!binding) {
      errors.push(`graph_rule_binding_missing_${ruleId}`);
      continue;
    }
    appendBindingCompletenessErrors(errors, "graph_rule", ruleId, binding);
  }
}

function appendFamilyDistinctionLockErrors(errors, report) {
  const locks = report?.sourceBinding?.familyDistinctionLocks;
  if (!Array.isArray(locks) || locks.length === 0) {
    errors.push("source_binding_family_distinction_locks_missing");
    return;
  }
  for (const expected of FAMILY_DISTINCTION_LOCKS) {
    const lock = locks.find((row) => row.id === expected.id);
    if (!lock) {
      errors.push(`source_binding_family_distinction_lock_missing_${expected.id}`);
      continue;
    }
    if (lock.separationPass !== true) {
      errors.push(`source_binding_family_distinction_lock_failed_${expected.id}`);
    }
  }
  const expectedPass = sourceBindingFamilyDistinctionLocksPass(locks);
  if (report.sourceBinding.summary?.familyDistinctionLocksPass !== expectedPass) {
    errors.push("source_binding_family_distinction_lock_summary_mismatch");
  }
}

function appendSourceAcquisitionRouteErrors(errors, report) {
  const candidates = report?.sourceBinding?.candidateResults ?? [];
  for (const candidate of candidates) {
    const blockers =
      candidate.sourceTargetCheck?.sourceAcquisitionBlockerMap?.blockers ?? [];
    for (const blocker of blockers) {
      const token = `${candidate.family}_${blocker.sourceRowId}`;
      const route = blocker.sourceAcquisitionRoute;
      if (!route) {
        errors.push(`source_acquisition_route_missing_${token}`);
        continue;
      }
      if (
        typeof route.claimLevel !== "string" ||
        !Array.isArray(route.requiredRowsBeforeUse) ||
        !Array.isArray(route.requiredAcceptedRowsBeforeUse) ||
        !Array.isArray(route.feedsRowsAfterAcceptance) ||
        !Array.isArray(route.notRequiredBeforeAcceptance)
      ) {
        errors.push(`source_acquisition_route_malformed_${token}`);
      }
    }
  }
}

function appendPartialSourceMarkerLockErrors(errors, report) {
  const expectedLocks = sourceBindingPartialSourceMarkerLocks({
    coefficientBindings: report?.sourceBinding?.coefficientBindings ?? {},
    graphRuleRowBindings: report?.sourceBinding?.graphRuleRowBindings ?? {},
  });
  const locks = report?.sourceBinding?.partialSourceMarkerLocks;
  if (expectedLocks.length > 0 && (!Array.isArray(locks) || locks.length === 0)) {
    errors.push("source_binding_partial_source_marker_locks_missing");
    return;
  }
  for (const expected of expectedLocks) {
    const lock = locks.find((row) => row.id === expected.id);
    if (!lock) {
      errors.push(`source_binding_partial_source_marker_lock_missing_${expected.id}`);
      continue;
    }
    if (!sameStringSet(lock.requiredRows, expected.requiredRows)) {
      errors.push(
        `source_binding_partial_source_marker_lock_required_rows_mismatch_${expected.id}`,
      );
    }
    if (!sameStringSet(lock.acceptedMarkerRows, expected.acceptedMarkerRows)) {
      errors.push(
        `source_binding_partial_source_marker_lock_accepted_marker_rows_mismatch_${expected.id}`,
      );
    }
    if (!sameStringSet(lock.missingRows, expected.missingRows)) {
      errors.push(
        `source_binding_partial_source_marker_lock_missing_rows_mismatch_${expected.id}`,
      );
    }
    if (lock.firstMissingObject !== expected.firstMissingObject) {
      errors.push(
        `source_binding_partial_source_marker_lock_first_missing_object_mismatch_${expected.id}`,
      );
    }
    if (
      lock.sourceAcquisitionFirstMissingObject !==
      expected.sourceAcquisitionFirstMissingObject
    ) {
      errors.push(
        `source_binding_partial_source_marker_lock_source_acquisition_first_missing_object_mismatch_${expected.id}`,
      );
    }
    if (lock.lockPass !== true) {
      errors.push(`source_binding_partial_source_marker_lock_failed_${expected.id}`);
    }
  }
  const expectedPass = sourceBindingPartialSourceMarkerLocksPass(locks ?? []);
  if (report.sourceBinding.summary?.partialSourceMarkerLocksPass !== expectedPass) {
    errors.push("source_binding_partial_source_marker_lock_summary_mismatch");
  }
}

function appendBindingCompletenessErrors(errors, kind, id, binding) {
  const sourceFamilies = Array.isArray(binding.sourceFamilies)
    ? binding.sourceFamilies
    : [];
  if (sourceFamilies.length === 0) {
    errors.push(`${kind}_source_families_missing_${id}`);
    return;
  }
  for (const family of sourceFamilies) {
    const rowBinding = binding.requiredRowsByFamily?.[family];
    const requiredRows = rowBinding?.requiredRows ?? [];
    if (!Array.isArray(requiredRows) || requiredRows.length === 0) {
      errors.push(`${kind}_source_rows_missing_${id}_${family}`);
      continue;
    }
    appendBindingRowEvidenceErrors(errors, kind, id, family, rowBinding);
  }
}

function appendBindingRowEvidenceErrors(errors, kind, id, family, rowBinding) {
  const missingRows = Array.isArray(rowBinding.missingRows)
    ? rowBinding.missingRows
    : [];
  for (const row of rowBinding.requiredRows ?? []) {
    const evidence = rowBinding.rowEvidence?.[row] ?? null;
    if (!evidence) {
      errors.push(`${kind}_row_evidence_missing_${id}_${family}_${row}`);
      continue;
    }
    const localAccepted = !missingRows.includes(row);
    const promotionEligible =
      rowBinding.accepted === true && localAccepted === true;
    if (
      evidence.row !== row ||
      evidence.family !== family ||
      typeof evidence.evidenceMode !== "string" ||
      evidence.localAccepted !== localAccepted ||
      evidence.promotionEligible !== promotionEligible
    ) {
      errors.push(`${kind}_row_evidence_mismatch_${id}_${family}_${row}`);
    }
    if (
      evidence.evidenceMode === "accepted_source_row" &&
      !acceptedEvidenceTracePass(evidence.acceptedEvidenceTrace)
    ) {
      errors.push(`${kind}_accepted_evidence_trace_missing_${id}_${family}_${row}`);
    }
    if (
      localAccepted !== true &&
      rowBinding.sourceAcquisitionFirstMissingObject &&
      !sourceAcquisitionRouteEvidencePass(evidence.sourceAcquisitionRoute)
    ) {
      errors.push(`${kind}_source_acquisition_route_missing_${id}_${family}_${row}`);
    }
    if (
      rowRequiresAcceptedSourceRowProofTarget(family, row) &&
      !acceptedSourceRowProofTargetEvidencePass(
        evidence.acceptedSourceRowProofTarget,
        family,
        row,
      )
    ) {
      errors.push(`${kind}_accepted_source_row_proof_target_missing_${id}_${family}_${row}`);
    }
  }
}

function appendRowEvidenceTraceErrors(errors, report) {
  const expectedPass = sourceBindingRowEvidenceTracePass({
    coefficientBindings: report?.sourceBinding?.coefficientBindings ?? {},
    graphRuleRowBindings: report?.sourceBinding?.graphRuleRowBindings ?? {},
  });
  if (report.sourceBinding.summary?.rowEvidenceTracePass !== expectedPass) {
    errors.push("source_binding_row_evidence_trace_summary_mismatch");
  }
}

function appendSourceRowRequirementIndexErrors(errors, report) {
  const expectedIndex = sourceBindingSourceRowRequirementIndex({
    coefficientBindings: report?.sourceBinding?.coefficientBindings ?? {},
    graphRuleRowBindings: report?.sourceBinding?.graphRuleRowBindings ?? {},
  });
  const actualIndex = report?.sourceBinding?.sourceRowRequirementIndex;
  if (!actualIndex) {
    errors.push("source_binding_source_row_requirement_index_missing");
    return;
  }
  const expectedPass = sourceBindingSourceRowRequirementIndexPass(actualIndex);
  if (
    report.sourceBinding.summary?.sourceRowRequirementIndexPass !== expectedPass
  ) {
    errors.push("source_binding_source_row_requirement_index_summary_mismatch");
  }
  if (!sameJsonValue(actualIndex.summary, expectedIndex.summary)) {
    errors.push("source_binding_source_row_requirement_index_summary_drift");
  }
  const actualRows = new Map(
    (actualIndex.rows ?? []).map((row) => [row.id, row]),
  );
  for (const expectedRow of expectedIndex.rows) {
    const actualRow = actualRows.get(expectedRow.id);
    const rowToken = sourceRowRequirementErrorToken(expectedRow.id);
    if (!actualRow) {
      errors.push(`source_binding_source_row_requirement_missing_${rowToken}`);
      continue;
    }
    if (!sameJsonValue(actualRow, expectedRow)) {
      errors.push(`source_binding_source_row_requirement_mismatch_${rowToken}`);
    }
  }
}

function sameJsonValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function sourceRowRequirementErrorToken(id) {
  return String(id).replace(/[^A-Za-z0-9_]+/g, "_");
}

function parseArgs(argv) {
  const args = {
    aMin: DEFAULT_SWEEP.aMin,
    aMax: DEFAULT_SWEEP.aMax,
    coefficientOverrides: {},
    coefficientScopeOverrides: {},
    sourceBindingPath: DEFAULT_SOURCE_BINDING_PATH,
    out: null,
    pretty: false,
    summary: false,
    requirePass: false,
    requirePromotionReady: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--a-min") {
      args.aMin = integerArg(argv[++index], "--a-min");
    } else if (arg === "--a-max") {
      args.aMax = integerArg(argv[++index], "--a-max");
    } else if (arg === "--coefficient") {
      const { name, value } = parseNameValue(argv[++index], "--coefficient");
      args.coefficientOverrides[name] = value;
    } else if (arg === "--coefficient-scope") {
      const { name, value } = parseNameValue(argv[++index], "--coefficient-scope", {
        numeric: false,
      });
      args.coefficientScopeOverrides[name] = value;
    } else if (arg === "--source-binding") {
      args.sourceBindingPath = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--summary") {
      args.summary = true;
    } else if (arg === "--require-pass") {
      args.requirePass = true;
    } else if (arg === "--require-promotion-ready") {
      args.requirePromotionReady = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs [options]

Options:
  --a-min N                 Minimum A to sweep. Default: ${DEFAULT_SWEEP.aMin}
  --a-max N                 Maximum A to sweep. Default: ${DEFAULT_SWEEP.aMax}
  --coefficient NAME=VALUE  Override one shared global toy coefficient.
  --coefficient-scope NAME=VALUE
                            Override a coefficient scope for hidden-fit negative controls.
  --source-binding PATH     Source-binding manifest. Default: scripts/nuclear-atomic/iron-group-binding-cusp-source-binding-candidates.v1.json
  --out PATH                Write JSON output to PATH.
  --summary                 Emit compact summary JSON.
  --pretty                  Pretty-print JSON output.
  --require-pass            Exit nonzero when a row is not advanced.
  --require-promotion-ready Exit nonzero unless all required source families are accepted.
  --help                    Show this help.

This is a priority-only row-shape diagnostic for the Fe/Ni binding cusp packet.
It is not a nuclear simulator, empirical fit, canon promotion, or score move.`);
}

function writeOutput(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        artifactStatus: report.artifactStatus,
        claimLevel: report.claimLevel,
        summary: report.summary,
        sourceBinding: report.sourceBinding,
        comparisonRows: report.comparisonRows,
        releaseAccounting: report.releaseAccounting,
        authorization: report.authorization,
      }
    : report;
  const text = JSON.stringify(payload, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function validateSweepOptions(options) {
  if (!Number.isInteger(options.aMin) || options.aMin < 2) {
    throw new Error("aMin must be an integer >= 2.");
  }
  if (!Number.isInteger(options.aMax) || options.aMax <= options.aMin) {
    throw new Error("aMax must be an integer greater than aMin.");
  }
}

function validateCoefficients(coefficients) {
  for (const [name, value] of Object.entries(coefficients)) {
    if (!Number.isFinite(Number(value))) {
      throw new Error(`${name} must be a finite number.`);
    }
  }
  if (coefficients.dSat <= 0 || coefficients.maxDegree <= 0) {
    throw new Error("dSat and maxDegree must be positive.");
  }
}

function integerArg(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number)) {
    throw new Error(`${flag} requires an integer.`);
  }
  return number;
}

function parseNameValue(raw, flag, { numeric = true } = {}) {
  if (typeof raw !== "string" || !raw.includes("=")) {
    throw new Error(`${flag} requires NAME=VALUE.`);
  }
  const [name, ...rest] = raw.split("=");
  const valueText = rest.join("=");
  if (!Object.prototype.hasOwnProperty.call(DEFAULT_COEFFICIENTS, name)) {
    throw new Error(`Unknown coefficient: ${name}`);
  }
  if (!numeric) {
    return { name, value: valueText };
  }
  const value = Number(valueText);
  if (!Number.isFinite(value)) {
    throw new Error(`${flag} ${name} value must be finite.`);
  }
  return { name, value };
}

function loadSourceBindingManifest(options) {
  if (options.sourceBindingManifest) {
    return options.sourceBindingManifest;
  }
  const sourcePath = options.sourceBindingPath ?? DEFAULT_SOURCE_BINDING_PATH;
  return JSON.parse(fs.readFileSync(path.resolve(sourcePath), "utf8"));
}

export function buildSourceBindingReport(
  manifest,
  { sourceRef = DEFAULT_SOURCE_BINDING_PATH, coefficientRows = [] } = {},
) {
  const schemaOk = manifest?.schema === SOURCE_BINDING_SCHEMA;
  const candidates = Array.isArray(manifest?.candidates) ? manifest.candidates : [];
  const candidateResults = candidates.map((candidate, index) =>
    evaluateSourceBindingCandidate(candidate, index),
  );
  const familyResults = Object.fromEntries(
    REQUIRED_SOURCE_FAMILIES.map((family) => [
      family,
      summarizeSourceFamily(family, candidateResults),
    ]),
  );
  const missingRequiredFamilies = REQUIRED_SOURCE_FAMILIES.filter(
    (family) => familyResults[family].accepted !== true,
  );
  const firstMissingFamily = SOURCE_BINDING_ORDER.find((family) =>
    missingRequiredFamilies.includes(family),
  ) ?? null;
  const firstMissingObject = firstMissingFamily
    ? familyResults[firstMissingFamily].firstMissingObject
    : null;
  const allRequiredFamiliesAccepted = schemaOk && missingRequiredFamilies.length === 0;
  const coefficientBindings = coefficientSourceFamilyBindings(
    coefficientRows,
    candidateResults,
  );
  const graphRuleRowBindings = graphRuleSourceRowBindings(candidateResults);
  const familyDistinctionLocks =
    sourceBindingFamilyDistinctionLocks(coefficientBindings);
  const partialSourceMarkerLocks = sourceBindingPartialSourceMarkerLocks({
    coefficientBindings,
    graphRuleRowBindings,
  });
  const sourceRowRequirementIndex = sourceBindingSourceRowRequirementIndex({
    coefficientBindings,
    graphRuleRowBindings,
  });
  const rowBindingCoverage = sourceBindingCoverage(coefficientRows);
  const allCoefficientBindingsAccepted =
    sourceBindingEntriesAccepted(coefficientBindings);
  const allGraphRuleBindingsAccepted =
    sourceBindingEntriesAccepted(graphRuleRowBindings);
  const rowEvidenceTracePass = sourceBindingRowEvidenceTracePass({
    coefficientBindings,
    graphRuleRowBindings,
  });
  const sourceRowRequirementIndexPass =
    sourceBindingSourceRowRequirementIndexPass(sourceRowRequirementIndex);
  const familyDistinctionLocksPass =
    sourceBindingFamilyDistinctionLocksPass(familyDistinctionLocks);
  const partialSourceMarkerLocksPass =
    sourceBindingPartialSourceMarkerLocksPass(partialSourceMarkerLocks);
  const rowBindingCoveragePass = sourceBindingCoveragePass(rowBindingCoverage);
  const allPromotionBindingsAccepted =
    allRequiredFamiliesAccepted &&
    allCoefficientBindingsAccepted &&
    allGraphRuleBindingsAccepted &&
    rowEvidenceTracePass &&
    sourceRowRequirementIndexPass &&
    familyDistinctionLocksPass &&
    partialSourceMarkerLocksPass &&
    rowBindingCoveragePass;

  return {
    schema: SOURCE_BINDING_REPORT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: sourceRef,
      schema: manifest?.schema ?? null,
      schemaOk,
      claimLevel: manifest?.claimLevel ?? null,
    },
    summary: {
      status: allPromotionBindingsAccepted
        ? "all_required_promotion_bindings_accepted"
        : allRequiredFamiliesAccepted
          ? "blocked_missing_coefficient_graph_rule_or_distinction_locks"
          : "blocked_missing_accepted_source_rows",
      requiredFamilyCount: REQUIRED_SOURCE_FAMILIES.length,
      acceptedRequiredFamilyCount: REQUIRED_SOURCE_FAMILIES.filter(
        (family) => familyResults[family].accepted === true,
      ).length,
      allRequiredFamiliesAccepted,
      allCoefficientBindingsAccepted,
      allGraphRuleBindingsAccepted,
      rowEvidenceTracePass,
      sourceRowRequirementIndexPass,
      familyDistinctionLocksPass,
      partialSourceMarkerLocksPass,
      rowBindingCoveragePass,
      allPromotionBindingsAccepted,
      missingRequiredFamilies,
      firstMissingFamily,
      firstMissingObject,
      scoreDecision: "no_score_increase",
    },
    requiredFamilies: [...REQUIRED_SOURCE_FAMILIES],
    familyResults,
    candidateResults,
    coefficientBindings,
    graphRuleBindings: GRAPH_RULE_SOURCE_FAMILIES,
    graphRuleRowBindings,
    familyDistinctionLocks,
    partialSourceMarkerLocks,
    sourceRowRequirementIndex,
    rowBindingCoverage,
    promotionRule:
      "Corpus promotion remains blocked until every required source family, coefficient row binding, graph-rule row binding, and family-distinction lock is accepted or preserved from durable non-priority source evidence and the toy controls still pass.",
  };
}

function evaluateSourceBindingCandidate(candidate, index) {
  const family = candidate.family ?? candidate.sourceFamily ?? `candidate_${index}`;
  const base = {
    id: candidate.id ?? `${family}_${index}`,
    family,
    role: candidate.role ?? null,
    sourcePath: candidate.sourcePath ?? null,
    requiredRows: candidate.requiredRows ?? [],
    accepted: false,
    sourceStatus: null,
    firstMissingObject:
      candidate.firstMissingObject ?? `missing_accepted_${family}`,
    missingOrRejectedFields: [],
  };
  if (!concreteString(candidate.sourcePath)) {
    return {
      ...base,
      sourceStatus: "missing_source_path",
      missingOrRejectedFields: ["sourcePath"],
    };
  }
  const sourcePath = candidate.sourcePath.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath);
  const pathReason = providerSourcePathRejectionReason(resolvedPath, REPO_ROOT);
  if (pathReason) {
    return {
      ...base,
      resolvedPath,
      sourceStatus: pathReason,
      missingOrRejectedFields: [pathReason],
    };
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch (error) {
    return {
      ...base,
      resolvedPath,
      sourceStatus:
        error.code === "ENOENT" ? "source_not_found" : "source_not_parseable_json",
      missingOrRejectedFields: ["source_json"],
    };
  }
  const status = evaluateSourceCandidateRows(family, raw, candidate, resolvedPath);
  const sourceTargetCheck = sourceTargetCheckForFamily(family, raw, resolvedPath);
  return {
    ...base,
    resolvedPath,
    accepted: status.accepted,
    sourceStatus: status.accepted ? "accepted_non_fixture_source" : status.reason,
    firstMissingObject: status.accepted
      ? null
      : status.firstMissingObject ?? base.firstMissingObject,
    ...(status.sourceAcquisitionFirstMissingObject
      ? {
          sourceAcquisitionFirstMissingObject:
            status.sourceAcquisitionFirstMissingObject,
        }
      : {}),
    missingOrRejectedFields: status.missingOrRejectedFields,
    sourceSchema: raw.schema ?? null,
    rowStatuses: status.rowStatuses,
    ...(sourceTargetCheck ? { sourceTargetCheck } : {}),
  };
}

function evaluateSourceCandidateRows(family, raw, candidate, resolvedPath) {
  if (family === "branch_interface") {
    return evaluateBranchInterfaceSource(raw, candidate, resolvedPath);
  }
  if (family === "confinement_functional") {
    return evaluateConfinementFunctionalSource(raw, candidate, resolvedPath);
  }
  if (family === "weak_channel") {
    return evaluateWeakChannelSource(raw, candidate, resolvedPath);
  }
  if (family === "noether_sea_response") {
    return evaluateNoetherSeaResponseSource(raw, candidate, resolvedPath);
  }
  return evaluateGenericAcceptedSource(raw, candidate);
}

function evaluateBranchInterfaceSource(raw, candidate, resolvedPath) {
  const report = buildNucleonBranchInterfaceSourceTargetCheck(raw, {
    inputPath: resolvedPath,
  });
  const accepted = report.summary.status === "accepted_branch_interface_source_rows";
  return {
    accepted,
    reason: accepted ? "accepted" : report.summary.status,
    firstMissingObject:
      report.summary.firstMissingObject ??
      candidate.firstMissingObject ??
      "missing_accepted_branch_interface",
    sourceAcquisitionFirstMissingObject:
      report.summary.sourceAcquisitionFirstMissingObject ?? null,
    missingOrRejectedFields: [
      ...(report.input.schemaOk ? [] : ["source_schema"]),
      ...report.summary.missingRows.map((row) => `rows.${row}.accepted`),
      ...report.summary.algebraicFailures,
      ...(report.summary.sourceEvidencePass ? [] : ["accepted_source_evidence"]),
    ],
    rowStatuses: sourceRowStatusesFromSourceTargetCheck(
      report,
      candidate.requiredRows ?? [],
    ),
  };
}

function evaluateConfinementFunctionalSource(raw, candidate, resolvedPath) {
  const report = buildConfinementFunctionalSourceTargetCheck(raw, {
    inputPath: resolvedPath,
  });
  const accepted =
    report.summary.status === "accepted_confinement_functional_source_rows";
  return {
    accepted,
    reason: accepted ? "accepted" : report.summary.status,
    firstMissingObject:
      report.summary.firstMissingObject ??
      candidate.firstMissingObject ??
      "missing_accepted_confinement_functional",
    sourceAcquisitionFirstMissingObject:
      report.summary.sourceAcquisitionFirstMissingObject ?? null,
    missingOrRejectedFields: [
      ...(report.input.schemaOk ? [] : ["source_schema"]),
      ...report.summary.missingRows.map((row) => `rows.${row}.accepted`),
      ...report.summary.structuralFailures,
      ...(report.summary.sourceEvidencePass ? [] : ["accepted_source_evidence"]),
      ...(report.summary.sourceAcquisitionPass ? [] : ["source_acquisition"]),
    ],
    rowStatuses: sourceRowStatusesFromSourceTargetCheck(
      report,
      candidate.requiredRows ?? [],
    ),
  };
}

function evaluateNoetherSeaResponseSource(raw, candidate, resolvedPath) {
  const report = buildNoetherSeaResponseSourceTargetCheck(raw, {
    inputPath: resolvedPath,
  });
  const accepted = report.summary.status === "accepted_noether_sea_response_rows";
  return {
    accepted,
    reason: accepted ? "accepted" : report.summary.status,
    firstMissingObject:
      report.summary.firstMissingObject ??
      candidate.firstMissingObject ??
      "missing_accepted_noether_sea_response",
    missingOrRejectedFields: [
      ...report.summary.missingRows.map((row) => `rows.${row}.accepted`),
      ...report.summary.structuralFailures,
    ],
    providerStatus: report.input.providerStatus,
    agreementResidual: report.responseAgreementCheck.residual,
    rowStatuses: sourceRowStatusesFromSourceTargetCheck(
      report,
      candidate.requiredRows ?? [],
    ),
  };
}

function evaluateWeakChannelSource(raw, candidate, resolvedPath) {
  const report = buildWeakChannelSourceTargetCheck(raw, {
    inputPath: resolvedPath,
  });
  const accepted = report.summary.status === "accepted_weak_channel_source_rows";
  return {
    accepted,
    reason: accepted ? "accepted" : report.summary.status,
    firstMissingObject:
      report.summary.firstMissingObject ??
      candidate.firstMissingObject ??
      "missing_accepted_weak_channel",
    sourceAcquisitionFirstMissingObject:
      report.summary.sourceAcquisitionFirstMissingObject ?? null,
    missingOrRejectedFields: [
      ...(report.input.schemaOk ? [] : ["source_schema"]),
      ...report.summary.missingRows.map((row) => `rows.${row}.accepted`),
      ...report.summary.structuralFailures,
      ...(report.summary.sourceAcquisitionPass ? [] : ["source_acquisition"]),
    ],
    rowStatuses: sourceRowStatusesFromSourceTargetCheck(
      report,
      candidate.requiredRows ?? [],
    ),
  };
}

function evaluateGenericAcceptedSource(raw, candidate) {
  const requiredRows = candidate.requiredRows ?? [];
  const rows = raw.rows ?? raw.sourceRows ?? raw;
  const missing = [];
  if (
    candidate.acceptedObjectSchema &&
    raw.schema !== candidate.acceptedObjectSchema
  ) {
    missing.push("source_schema");
  }
  for (const row of requiredRows) {
    if (!acceptedGenericSourceRow(rows[row])) {
      missing.push(missingGenericSourceRowField(rows[row], row));
    }
  }
  const firstMissingRow = requiredRows.find(
    (row) => !acceptedGenericSourceRow(rows[row]),
  );
  return {
    accepted: missing.length === 0,
    reason: missing.length === 0 ? "accepted" : "required_rows_missing",
    firstMissingObject: firstMissingRow
      ? `missing_accepted_${firstMissingRow}`
      : candidate.firstMissingObject,
    missingOrRejectedFields: missing,
    rowStatuses: sourceRowStatuses(rows, requiredRows, acceptedGenericSourceRow),
  };
}

function summarizeSourceFamily(family, candidateResults) {
  const familyCandidates = candidateResults.filter(
    (candidate) => candidate.family === family,
  );
  const accepted = familyCandidates.find((candidate) => candidate.accepted);
  const nearest = accepted ?? familyCandidates[0] ?? null;
  return {
    family,
    accepted: accepted !== undefined,
    acceptedCandidateId: accepted?.id ?? null,
    candidateCount: familyCandidates.length,
    nearestCandidateId: nearest?.id ?? null,
    sourceStatus: nearest?.sourceStatus ?? "candidate_missing",
    firstMissingObject:
      accepted !== undefined
        ? null
        : nearest?.firstMissingObject ?? `missing_accepted_${family}`,
    sourceAcquisitionFirstMissingObject:
      accepted !== undefined ? null : nearest?.sourceAcquisitionFirstMissingObject ?? null,
    missingOrRejectedFields: nearest?.missingOrRejectedFields ?? [],
  };
}

function sourceTargetCheckForFamily(family, raw, resolvedPath) {
  if (family === "branch_interface") {
    return compactBranchInterfaceSourceTargetCheck(
      buildNucleonBranchInterfaceSourceTargetCheck(raw, {
        inputPath: resolvedPath,
      }),
    );
  }
  if (family === "confinement_functional") {
    return compactConfinementFunctionalSourceTargetCheck(
      buildConfinementFunctionalSourceTargetCheck(raw, {
        inputPath: resolvedPath,
      }),
    );
  }
  if (family === "weak_channel") {
    return compactWeakChannelSourceTargetCheck(
      buildWeakChannelSourceTargetCheck(raw, {
        inputPath: resolvedPath,
      }),
    );
  }
  if (family === "noether_sea_response") {
    return compactNoetherSeaResponseSourceTargetCheck(
      buildNoetherSeaResponseSourceTargetCheck(raw, {
        inputPath: resolvedPath,
      }),
    );
  }
  return null;
}

function compactBranchInterfaceSourceTargetCheck(report) {
  return {
    schema: report.schema,
    summary: report.summary,
    sourceEvidenceCheck: report.sourceEvidenceCheck,
    acceptedSourceRowProofTargets: report.acceptedSourceRowProofTargets,
    sourceAcquisitionCheck: report.sourceAcquisitionCheck,
    sourceAcquisitionBlockerMap: report.sourceAcquisitionBlockerMap,
    differential: report.differential,
  };
}

function compactConfinementFunctionalSourceTargetCheck(report) {
  return {
    schema: report.schema,
    summary: report.summary,
    sourceEvidenceCheck: report.sourceEvidenceCheck,
    acceptedSourceRowProofTargets: report.acceptedSourceRowProofTargets,
    sourceAcquisitionCheck: report.sourceAcquisitionCheck,
    sourceAcquisitionBlockerMap: report.sourceAcquisitionBlockerMap,
    equationChecks: report.equationChecks,
    toyBindingCheck: report.toyBindingCheck,
  };
}

function compactWeakChannelSourceTargetCheck(report) {
  return {
    schema: report.schema,
    summary: report.summary,
    domainCheck: report.domainCheck,
    sourceEvidenceCheck: report.sourceEvidenceCheck,
    acceptedSourceRowProofTargets: report.acceptedSourceRowProofTargets,
    sourceAcquisitionCheck: report.sourceAcquisitionCheck,
    sourceAcquisitionBlockerMap: report.sourceAcquisitionBlockerMap,
    toyBindingCheck: report.toyBindingCheck,
  };
}

function compactNoetherSeaResponseSourceTargetCheck(report) {
  return {
    schema: report.schema,
    summary: report.summary,
    sourceEvidenceCheck: report.sourceEvidenceCheck,
    providerObjectCheck: report.providerObjectCheck,
    responseAgreementCheck: report.responseAgreementCheck,
    toyBindingCheck: report.toyBindingCheck,
  };
}

function coefficientSourceFamilyBindings(coefficientRows, candidateResults = null) {
  return Object.fromEntries(
    coefficientRows.map((row) => [
      row.name,
      sourceBindingEntry({
        sourceFamilies: COEFFICIENT_SOURCE_FAMILIES[row.name] ?? [],
        sourceRowRequirements: COEFFICIENT_SOURCE_ROW_REQUIREMENTS[row.name] ?? {},
        candidateResults,
        status: row.status,
      }),
    ]),
  );
}

function graphRuleSourceRowBindings(candidateResults) {
  return Object.fromEntries(
    Object.entries(GRAPH_RULE_SOURCE_ROW_REQUIREMENTS).map(([ruleId, requirements]) => [
      ruleId,
      sourceBindingEntry({
        sourceFamilies: GRAPH_RULE_SOURCE_FAMILIES[ruleId] ?? [],
        sourceRowRequirements: requirements,
        candidateResults,
      }),
    ]),
  );
}

function sourceBindingFamilyDistinctionLocks(coefficientBindings) {
  return FAMILY_DISTINCTION_LOCKS.map((lock) => {
    const providerBinding =
      coefficientBindings?.[lock.coefficient]?.requiredRowsByFamily?.[
        lock.providerFamily
      ] ?? null;
    const weakBinding =
      coefficientBindings?.[lock.coefficient]?.requiredRowsByFamily?.[
        lock.weakFamily
      ] ?? null;
    const providerCandidateId = providerBinding?.candidateId ?? null;
    const weakCandidateId = weakBinding?.candidateId ?? null;
    const providerRowsPreserved = rowsIncludeAll(
      providerBinding?.requiredRows,
      lock.providerRows,
    );
    const weakRowsPreserved = rowsIncludeAll(
      weakBinding?.requiredRows,
      lock.weakRows,
    );
    const distinctCandidateIds =
      concreteString(providerCandidateId) &&
      concreteString(weakCandidateId) &&
      providerCandidateId !== weakCandidateId;
    const weakMissingRows = weakBinding?.missingRows ?? [];
    const weakChannelRowAccepted =
      Array.isArray(weakMissingRows) &&
      !weakMissingRows.includes(lock.blockedRow);
    const separationPass =
      providerBinding !== null &&
      weakBinding !== null &&
      providerRowsPreserved &&
      weakRowsPreserved &&
      distinctCandidateIds;

    return {
      id: lock.id,
      coefficient: lock.coefficient,
      providerFamily: lock.providerFamily,
      providerCandidateId,
      providerRows: [...lock.providerRows],
      providerAccepted: providerBinding?.accepted === true,
      weakFamily: lock.weakFamily,
      weakCandidateId,
      weakRows: [...lock.weakRows],
      weakChannelRow: lock.blockedRow,
      weakChannelRowAccepted,
      weakBindingAccepted: weakBinding?.accepted === true,
      weakFirstMissingObject: weakBinding?.firstMissingObject ?? null,
      weakSourceAcquisitionFirstMissingObject:
        weakBinding?.sourceAcquisitionFirstMissingObject ?? null,
      distinctCandidateIds,
      providerRowsPreserved,
      weakRowsPreserved,
      separationPass,
      rule: lock.rule,
    };
  });
}

function sourceBindingFamilyDistinctionLocksPass(locks) {
  return (
    Array.isArray(locks) &&
    locks.length > 0 &&
    locks.every((lock) => lock.separationPass === true)
  );
}

function sourceBindingPartialSourceMarkerLocks({
  coefficientBindings = {},
  graphRuleRowBindings = {},
} = {}) {
  return [
    ...partialSourceMarkerLocksForKind("coefficient", coefficientBindings),
    ...partialSourceMarkerLocksForKind("graphRule", graphRuleRowBindings),
  ];
}

function partialSourceMarkerLocksForKind(kind, entries) {
  return Object.entries(entries).flatMap(([objectId, binding]) =>
    Object.entries(binding.requiredRowsByFamily ?? {}).flatMap(
      ([family, rowBinding]) => {
        const missingRows = rowBinding.missingRows ?? [];
        const acceptedMarkerRows = (rowBinding.requiredRows ?? []).filter(
          (row) => {
            const evidence = rowBinding.rowEvidence?.[row];
            return (
              evidence?.localAccepted === true &&
              evidence?.promotionEligible !== true
            );
          },
        );
        if (
          rowBinding.accepted === true ||
          rowBinding.firstMissingObject === null ||
          acceptedMarkerRows.length === 0
        ) {
          return [];
        }
        const lockPass =
          rowBinding.accepted === false &&
          acceptedMarkerRows.every((row) => {
            const evidence = rowBinding.rowEvidence?.[row];
            return (
              evidence?.localAccepted === true &&
              evidence?.promotionEligible === false
            );
          });
        return [
          {
            id: `${kind}_${objectId}_${family}_partial_source_marker_not_promotion`,
            kind,
            objectId,
            family,
            requiredRows: [...(rowBinding.requiredRows ?? [])],
            acceptedMarkerRows,
            missingRows,
            promotionEligibleRows: [
              ...(rowBinding.promotionEligibleRows ?? []),
            ],
            sourceStatus: rowBinding.sourceStatus ?? null,
            firstMissingObject: rowBinding.firstMissingObject,
            sourceAcquisitionFirstMissingObject:
              rowBinding.sourceAcquisitionFirstMissingObject ?? null,
            accepted: false,
            markerStatus:
              missingRows.length > 0
                ? "accepted_source_rows_present_but_binding_still_missing_required_rows"
                : "accepted_upstream_rows_present_but_owning_family_not_accepted",
            lockPass,
          },
        ];
      },
    ),
  );
}

function sourceBindingPartialSourceMarkerLocksPass(locks) {
  return (
    Array.isArray(locks) &&
    locks.every((lock) => lock.lockPass === true)
  );
}

function sourceBindingSourceRowRequirementIndex({
  coefficientBindings = {},
  graphRuleRowBindings = {},
} = {}) {
  const rowsById = new Map();
  appendSourceRowRequirementIndexEntries(
    rowsById,
    "coefficient",
    coefficientBindings,
  );
  appendSourceRowRequirementIndexEntries(
    rowsById,
    "graphRule",
    graphRuleRowBindings,
  );
  const rows = [...rowsById.values()];
  const blockedRows = rows.filter((row) => row.promotionEligible !== true);
  const promotionEligibleRows = rows.filter(
    (row) => row.promotionEligible === true,
  );
  return {
    summary: {
      totalRows: rows.length,
      promotionEligibleRowCount: promotionEligibleRows.length,
      blockedRowCount: blockedRows.length,
      firstBlockedFamily: blockedRows[0]?.family ?? null,
      firstBlockedRow: blockedRows[0]?.row ?? null,
      firstBlockedObject: blockedRows[0]?.firstMissingObject ?? null,
    },
    rows,
  };
}

function appendSourceRowRequirementIndexEntries(rowsById, kind, entries) {
  for (const [objectId, binding] of Object.entries(entries)) {
    for (const [family, rowBinding] of Object.entries(
      binding.requiredRowsByFamily ?? {},
    )) {
      for (const row of rowBinding.requiredRows ?? []) {
        const id = `${family}.${row}`;
        if (!rowsById.has(id)) {
          rowsById.set(
            id,
            sourceRowRequirementIndexRow(id, family, row, rowBinding),
          );
        }
        rowsById.get(id).requiredBy.push({
          kind,
          objectId,
          bindingAccepted: rowBinding.accepted === true,
        });
      }
    }
  }
}

function sourceRowRequirementIndexRow(id, family, row, rowBinding) {
  const evidence = rowBinding.rowEvidence?.[row] ?? null;
  const localAccepted = evidence?.localAccepted === true;
  const promotionEligible = evidence?.promotionEligible === true;
  return {
    id,
    family,
    row,
    requiredBy: [],
    evidenceMode: evidence?.evidenceMode ?? "missing_row_evidence",
    localAccepted,
    promotionEligible,
    notPromotionEligibleReason: sourceRowNotPromotionEligibleReason(evidence),
    sourceRowId: evidence?.sourceRowId ?? null,
    targetId: evidence?.targetId ?? null,
    status: evidence?.status ?? null,
    currentEvidenceStatus: evidence?.currentEvidenceStatus ?? null,
    ...(evidence?.acceptedEvidenceTrace
      ? { acceptedEvidenceTrace: evidence.acceptedEvidenceTrace }
      : {}),
    ...(evidence?.acceptedSourceRowProofTarget
      ? { acceptedSourceRowProofTarget: evidence.acceptedSourceRowProofTarget }
      : {}),
    firstMissingObject: localAccepted
      ? rowBinding.firstMissingObject ?? null
      : `missing_accepted_${row}`,
    sourceAcquisitionFirstMissingObject:
      rowBinding.sourceAcquisitionFirstMissingObject ?? null,
    ...(evidence?.sourceAcquisitionRoute
      ? { sourceAcquisitionRoute: evidence.sourceAcquisitionRoute }
      : {}),
  };
}

function sourceRowNotPromotionEligibleReason(evidence) {
  if (!evidence) {
    return "missing_row_evidence";
  }
  if (evidence.promotionEligible === true) {
    return null;
  }
  if (evidence.evidenceMode === "source_acquisition_target") {
    return "source_acquisition_target_not_promotion_evidence";
  }
  if (evidence.localAccepted === true) {
    return "owning_family_not_accepted";
  }
  return "missing_accepted_source_row";
}

function sourceBindingSourceRowRequirementIndexPass(index) {
  if (!index || !Array.isArray(index.rows) || !index.summary) {
    return false;
  }
  const ids = index.rows.map((row) => row.id);
  const uniqueIds = new Set(ids);
  const promotionEligibleRowCount = index.rows.filter(
    (row) => row.promotionEligible === true,
  ).length;
  const blockedRows = index.rows.filter(
    (row) => row.promotionEligible !== true,
  );
  return (
    ids.length > 0 &&
    uniqueIds.size === ids.length &&
    index.summary.totalRows === ids.length &&
    index.summary.promotionEligibleRowCount === promotionEligibleRowCount &&
    index.summary.blockedRowCount === blockedRows.length &&
    index.summary.firstBlockedFamily === (blockedRows[0]?.family ?? null) &&
    index.summary.firstBlockedRow === (blockedRows[0]?.row ?? null) &&
    index.summary.firstBlockedObject ===
      (blockedRows[0]?.firstMissingObject ?? null)
  );
}

function appendSourceBindingSummaryErrors(errors, report) {
  const binding = report?.sourceBinding;
  const summary = binding?.summary;
  if (!summary) {
    errors.push("source_binding_summary_missing");
    return;
  }

  const familyResults = binding.familyResults ?? {};
  if (!sameStringSet(binding.requiredFamilies, REQUIRED_SOURCE_FAMILIES)) {
    errors.push("source_binding_required_families_mismatch");
  }

  const acceptedRequiredFamilies = REQUIRED_SOURCE_FAMILIES.filter(
    (family) => familyResults[family]?.accepted === true,
  );
  const missingRequiredFamilies = REQUIRED_SOURCE_FAMILIES.filter(
    (family) => familyResults[family]?.accepted !== true,
  );
  const firstMissingFamily = SOURCE_BINDING_ORDER.find((family) =>
    missingRequiredFamilies.includes(family),
  ) ?? null;
  const firstMissingObject = firstMissingFamily
    ? familyResults[firstMissingFamily]?.firstMissingObject ?? null
    : null;
  const allRequiredFamiliesAccepted =
    binding.input?.schemaOk === true && missingRequiredFamilies.length === 0;
  const allCoefficientBindingsAccepted =
    sourceBindingEntriesAccepted(binding.coefficientBindings ?? {});
  const allGraphRuleBindingsAccepted =
    sourceBindingEntriesAccepted(binding.graphRuleRowBindings ?? {});
  const rowEvidenceTracePass = sourceBindingRowEvidenceTracePass({
    coefficientBindings: binding.coefficientBindings ?? {},
    graphRuleRowBindings: binding.graphRuleRowBindings ?? {},
  });
  const sourceRowRequirementIndexPass =
    sourceBindingSourceRowRequirementIndexPass(binding.sourceRowRequirementIndex);
  const familyDistinctionLocksPass =
    sourceBindingFamilyDistinctionLocksPass(binding.familyDistinctionLocks);
  const partialSourceMarkerLocksPass =
    sourceBindingPartialSourceMarkerLocksPass(binding.partialSourceMarkerLocks);
  const rowBindingCoveragePass =
    sourceBindingCoveragePass(binding.rowBindingCoverage);
  const allPromotionBindingsAccepted =
    allRequiredFamiliesAccepted &&
    allCoefficientBindingsAccepted &&
    allGraphRuleBindingsAccepted &&
    rowEvidenceTracePass &&
    sourceRowRequirementIndexPass &&
    familyDistinctionLocksPass &&
    partialSourceMarkerLocksPass &&
    rowBindingCoveragePass;
  const status = allPromotionBindingsAccepted
    ? "all_required_promotion_bindings_accepted"
    : allRequiredFamiliesAccepted
      ? "blocked_missing_coefficient_graph_rule_or_distinction_locks"
      : "blocked_missing_accepted_source_rows";
  const expectedScalars = {
    status,
    requiredFamilyCount: REQUIRED_SOURCE_FAMILIES.length,
    acceptedRequiredFamilyCount: acceptedRequiredFamilies.length,
    allRequiredFamiliesAccepted,
    allCoefficientBindingsAccepted,
    allGraphRuleBindingsAccepted,
    rowEvidenceTracePass,
    sourceRowRequirementIndexPass,
    familyDistinctionLocksPass,
    partialSourceMarkerLocksPass,
    rowBindingCoveragePass,
    allPromotionBindingsAccepted,
    firstMissingFamily,
    firstMissingObject,
  };

  for (const [field, expected] of Object.entries(expectedScalars)) {
    if (summary[field] !== expected) {
      errors.push(`source_binding_summary_${field}_mismatch`);
    }
  }
  if (!sameStringSet(summary.missingRequiredFamilies, missingRequiredFamilies)) {
    errors.push("source_binding_summary_missing_required_families_mismatch");
  }
}

function rowsIncludeAll(rows, expectedRows) {
  return (
    Array.isArray(rows) &&
    expectedRows.every((row) => rows.includes(row))
  );
}

function sourceBindingCoverage(coefficientRows) {
  return {
    coefficients: sourceBindingCoverageSummary(
      coefficientRows.map((row) =>
        sourceBindingCoverageRow(
          row.name,
          COEFFICIENT_SOURCE_FAMILIES,
          COEFFICIENT_SOURCE_ROW_REQUIREMENTS,
        ),
      ),
    ),
    graphRules: sourceBindingCoverageSummary(
      Object.keys(GRAPH_RULE_SOURCE_FAMILIES).map((ruleId) =>
        sourceBindingCoverageRow(
          ruleId,
          GRAPH_RULE_SOURCE_FAMILIES,
          GRAPH_RULE_SOURCE_ROW_REQUIREMENTS,
        ),
      ),
    ),
  };
}

function sourceBindingCoverageRow(id, sourceFamilyMap, sourceRequirementMap) {
  const sourceFamilies = sourceFamilyMap[id] ?? [];
  const rowRequirements = sourceRequirementMap[id] ?? {};
  const missingRequirementFamilies = sourceFamilies.filter(
    (family) =>
      !Array.isArray(rowRequirements[family]) ||
      rowRequirements[family].length === 0,
  );
  const extraRequirementFamilies = Object.keys(rowRequirements).filter(
    (family) => !sourceFamilies.includes(family),
  );
  return {
    id,
    sourceFamilies,
    missingRequirementFamilies,
    extraRequirementFamilies,
    covered:
      sourceFamilies.length > 0 &&
      missingRequirementFamilies.length === 0 &&
      extraRequirementFamilies.length === 0,
  };
}

function sourceBindingCoverageSummary(rows) {
  const uncoveredRows = rows.filter((row) => row.covered !== true);
  return {
    total: rows.length,
    covered: rows.length - uncoveredRows.length,
    uncovered: uncoveredRows.map((row) => row.id),
    rows,
  };
}

function sourceBindingCoveragePass(coverage) {
  return (
    coverage?.coefficients?.total > 0 &&
    coverage?.graphRules?.total > 0 &&
    coverage.coefficients.uncovered.length === 0 &&
    coverage.graphRules.uncovered.length === 0
  );
}

function sourceBindingEntriesAccepted(entries) {
  const bindings = Object.values(entries);
  return (
    bindings.length > 0 &&
    bindings.every(
      (binding) =>
        binding.rowBindingStatus === "all_required_rows_accepted",
    )
  );
}

function sourceBindingEntry({
  sourceFamilies,
  sourceRowRequirements,
  candidateResults,
  status = undefined,
}) {
  const entry = {
    sourceFamilies,
    ...(status === undefined ? {} : { status }),
  };
  if (!Array.isArray(candidateResults)) {
    return entry;
  }
  const rowBindings = sourceRowBindingsByFamily(
    sourceRowRequirements,
    candidateResults,
  );
  return {
    ...entry,
    requiredRowsByFamily: rowBindings,
    rowBindingStatus: rowBindingsAccepted(rowBindings)
      ? "all_required_rows_accepted"
      : "blocked_missing_accepted_rows",
    firstMissingObject: firstMissingRowObject(rowBindings),
  };
}

function sourceRowBindingsByFamily(sourceRowRequirements, candidateResults) {
  return Object.fromEntries(
    Object.entries(sourceRowRequirements).map(([family, requiredRows]) => [
      family,
      sourceRowBindingForFamily(family, requiredRows, candidateResults),
    ]),
  );
}

function sourceRowBindingForFamily(family, requiredRows, candidateResults) {
  const candidates = candidateResults.filter((candidate) => candidate.family === family);
  const accepted = candidates.find((candidate) => candidate.accepted);
  const nearest = accepted ?? candidates[0] ?? null;
  const rowEvidence = sourceRowEvidenceByRow(nearest, family, requiredRows);
  const missingRows = requiredRows.filter(
    (row) => rowEvidence[row]?.localAccepted !== true,
  );
  const familyAccepted = nearest?.accepted === true;
  return {
    family,
    candidateId: nearest?.id ?? null,
    sourceStatus: nearest?.sourceStatus ?? "candidate_missing",
    requiredRows,
    accepted: familyAccepted && missingRows.length === 0,
    missingRows,
    localAcceptedRows: requiredRows.filter(
      (row) => rowEvidence[row]?.localAccepted === true,
    ),
    promotionEligibleRows: requiredRows.filter(
      (row) => rowEvidence[row]?.promotionEligible === true,
    ),
    rowEvidence,
    firstMissingObject: missingRows.length > 0
      ? `missing_accepted_${missingRows[0]}`
      : familyAccepted
        ? null
        : nearest?.firstMissingObject ?? `missing_accepted_${family}`,
    sourceAcquisitionFirstMissingObject:
      familyAccepted ? null : nearest?.sourceAcquisitionFirstMissingObject ?? null,
  };
}

function rowsBindingsList(rowBindings) {
  return Object.values(rowBindings);
}

function rowBindingsAccepted(rowBindings) {
  const bindings = rowsBindingsList(rowBindings);
  return bindings.length > 0 && bindings.every((binding) => binding.accepted === true);
}

function firstMissingRowObject(rowBindings) {
  return (
    rowsBindingsList(rowBindings).find((binding) => binding.firstMissingObject)
      ?.firstMissingObject ?? null
  );
}

function sourceRowEvidenceByRow(candidate, family, requiredRows) {
  return Object.fromEntries(
    requiredRows.map((row) => [row, sourceRowEvidence(candidate, family, row)]),
  );
}

function sourceRowEvidence(candidate, family, row) {
  const sourceRow = candidate?.rowStatuses?.[row] ?? null;
  const acquisitionTarget =
    candidate?.sourceTargetCheck?.sourceAcquisitionCheck?.targetChecks?.[row] ??
    null;
  const familyAccepted = candidate?.accepted === true;

  if (sourceRow?.accepted === true) {
    return {
      row,
      family,
      candidateId: candidate?.id ?? null,
      evidenceMode: "accepted_source_row",
      localAccepted: true,
      promotionEligible: familyAccepted,
      sourceRowId: sourceRow.id ?? null,
      status: sourceRow.status ?? null,
      currentEvidenceStatus: sourceRow.currentEvidenceStatus ?? null,
      acceptedEvidenceTrace: acceptedSourceRowEvidenceTrace(sourceRow),
      ...acceptedSourceRowProofTargetEvidenceFields(candidate, row),
    };
  }

  if (acquisitionTarget?.accepted === true) {
    return {
      row,
      family,
      candidateId: candidate?.id ?? null,
      evidenceMode: "source_acquisition_target",
      localAccepted: true,
      promotionEligible: false,
      sourceRowId: acquisitionTarget.sourceRowId ?? null,
      targetId: acquisitionTarget.targetId ?? null,
      status: acquisitionTarget.status ?? null,
      currentEvidenceStatus: acquisitionTarget.currentEvidenceStatus ?? null,
      sourceTargetPath: acquisitionTarget.sourceTargetPath ?? null,
      componentShapePass: acquisitionTarget.componentShapePass ?? null,
      ...sourceAcquisitionRouteEvidenceFields(candidate, row, acquisitionTarget),
      ...acceptedSourceRowProofTargetEvidenceFields(candidate, row),
    };
  }

  return {
    row,
    family,
    candidateId: candidate?.id ?? null,
    evidenceMode: sourceRow
      ? "missing_or_unaccepted_source_row"
      : acquisitionTarget
        ? "failed_source_acquisition_target"
        : "missing_source_row",
    localAccepted: false,
    promotionEligible: false,
    sourceRowId: sourceRow?.id ?? acquisitionTarget?.sourceRowId ?? null,
    targetId: acquisitionTarget?.targetId ?? null,
    status: sourceRow?.status ?? acquisitionTarget?.status ?? null,
    currentEvidenceStatus:
      sourceRow?.currentEvidenceStatus ??
      acquisitionTarget?.currentEvidenceStatus ??
      null,
    firstMissingAcceptedSourceRow:
      sourceAcquisitionRouteSourceRowId(candidate, row, acquisitionTarget),
    ...sourceAcquisitionRouteEvidenceFields(candidate, row, acquisitionTarget),
    ...acceptedSourceRowProofTargetEvidenceFields(candidate, row),
  };
}

function acceptedSourceRowProofTargetEvidenceFields(candidate, row) {
  const target =
    candidate?.sourceTargetCheck?.acceptedSourceRowProofTargets?.targets?.[row] ??
    null;
  if (!target?.passed) {
    return {};
  }
  return {
    acceptedSourceRowProofTarget: {
      rowId: target.rowId,
      targetId: target.targetId ?? null,
      currentEvidenceStatus: target.currentEvidenceStatus ?? null,
      claimLevel: target.claimLevel ?? null,
      requiredAcceptedSourceRowsBeforeUse:
        target.requiredAcceptedSourceRowsBeforeUse ?? [],
      requiredSameRecordRows: target.requiredSameRecordRows ?? [],
      requiredClosureRows: target.requiredClosureRows ?? [],
      ...(Array.isArray(target.requiredExtractionCertificateRows)
        ? { requiredExtractionCertificateRows: target.requiredExtractionCertificateRows }
        : {}),
      ...(Array.isArray(target.requiredEnvelopeBundleRows)
        ? { requiredEnvelopeBundleRows: target.requiredEnvelopeBundleRows }
        : {}),
      ...(Array.isArray(target.requiredResidualDerivationRows)
        ? { requiredResidualDerivationRows: target.requiredResidualDerivationRows }
        : {}),
      ...(Array.isArray(target.requiredInequalities)
        ? { requiredInequalities: target.requiredInequalities }
        : {}),
      ...(Array.isArray(target.requiredLimitStatements)
        ? { requiredLimitStatements: target.requiredLimitStatements }
        : {}),
      ...(Array.isArray(target.requiredTailLimitStatements)
        ? { requiredTailLimitStatements: target.requiredTailLimitStatements }
        : {}),
      ...(Array.isArray(target.requiredConservationRows)
        ? { requiredConservationRows: target.requiredConservationRows }
        : {}),
      ...(Array.isArray(target.requiredEventBalanceRows)
        ? { requiredEventBalanceRows: target.requiredEventBalanceRows }
        : {}),
      ...(Array.isArray(target.requiredChiralitySelectionRows)
        ? { requiredChiralitySelectionRows: target.requiredChiralitySelectionRows }
        : {}),
      ...(Array.isArray(target.requiredUpdateRows)
        ? { requiredUpdateRows: target.requiredUpdateRows }
        : {}),
      ...(Array.isArray(target.mustRemainDistinctFrom)
        ? { mustRemainDistinctFrom: target.mustRemainDistinctFrom }
        : {}),
      forbiddenPromotionSources: target.forbiddenPromotionSources ?? [],
      directToyConsumers: target.directToyConsumers ?? {
        coefficients: [],
        graphRules: [],
      },
    },
  };
}

function sourceAcquisitionRouteEvidenceFields(candidate, row, acquisitionTarget) {
  const blocker = sourceAcquisitionRouteBlocker(candidate, row, acquisitionTarget);
  if (!blocker?.sourceAcquisitionRoute) {
    return {};
  }
  const route = blocker.sourceAcquisitionRoute;
  return {
    sourceAcquisitionRoute: {
      sourceRowId: blocker.sourceRowId,
      targetId: blocker.targetId ?? null,
      currentEvidenceStatus: blocker.currentEvidenceStatus ?? null,
      claimLevel: route.claimLevel ?? null,
      requiredRowsBeforeUse: route.requiredRowsBeforeUse ?? [],
      requiredAcceptedRowsBeforeUse: route.requiredAcceptedRowsBeforeUse ?? [],
      feedsRowsAfterAcceptance: route.feedsRowsAfterAcceptance ?? [],
      notRequiredBeforeAcceptance: route.notRequiredBeforeAcceptance ?? [],
      ...(Array.isArray(route.mustRemainDistinctFrom)
        ? { mustRemainDistinctFrom: route.mustRemainDistinctFrom }
        : {}),
    },
  };
}

function sourceAcquisitionRouteBlocker(candidate, row, acquisitionTarget) {
  const blockers =
    candidate?.sourceTargetCheck?.sourceAcquisitionBlockerMap?.blockers ?? [];
  const rowCheck =
    candidate?.sourceTargetCheck?.sourceAcquisitionCheck?.rowChecks?.[row] ??
    null;
  const routeSourceRowIds = [
    acquisitionTarget?.accepted === true ? null : acquisitionTarget?.sourceRowId,
    row,
    `accepted_${row}`,
    rowCheck?.missingAcceptedSourceRows?.[0],
    candidate?.sourceTargetCheck?.sourceAcquisitionBlockerMap
      ?.firstMissingAcceptedSourceRow,
  ].filter(Boolean);
  return routeSourceRowIds
    .map((sourceRowId) =>
      blockers.find((blocker) => blocker.sourceRowId === sourceRowId),
    )
    .find(Boolean) ?? null;
}

function sourceAcquisitionRouteSourceRowId(candidate, row, acquisitionTarget) {
  return (
    sourceAcquisitionRouteBlocker(candidate, row, acquisitionTarget)?.sourceRowId ??
    null
  );
}

function sourceBindingRowEvidenceTracePass({
  coefficientBindings = {},
  graphRuleRowBindings = {},
} = {}) {
  const entries = [
    ...Object.values(coefficientBindings),
    ...Object.values(graphRuleRowBindings),
  ];
  return entries.length > 0 && entries.every(bindingRowEvidenceTracePass);
}

function bindingRowEvidenceTracePass(binding) {
  return Object.values(binding.requiredRowsByFamily ?? {}).every(
    (rowBinding) =>
      Array.isArray(rowBinding.requiredRows) &&
      Array.isArray(rowBinding.missingRows) &&
      rowBinding.requiredRows.length > 0 &&
      rowBinding.requiredRows.every((row) => {
        const evidence = rowBinding.rowEvidence?.[row];
        const localAccepted = !rowBinding.missingRows.includes(row);
        const promotionEligible =
          rowBinding.accepted === true && localAccepted === true;
        return (
          evidence?.row === row &&
          evidence.family === rowBinding.family &&
          typeof evidence.evidenceMode === "string" &&
          evidence.localAccepted === localAccepted &&
          evidence.promotionEligible === promotionEligible &&
          acceptedRowEvidenceTracePass(evidence) &&
          acceptedSourceRowProofTargetTracePass(evidence) &&
          bindingRowEvidenceRoutePass(evidence, localAccepted, rowBinding)
        );
      }),
  );
}

function acceptedSourceRowProofTargetTracePass(evidence) {
  if (!rowRequiresAcceptedSourceRowProofTarget(evidence.family, evidence.row)) {
    return true;
  }
  return acceptedSourceRowProofTargetEvidencePass(
    evidence.acceptedSourceRowProofTarget,
    evidence.family,
    evidence.row,
  );
}

function rowRequiresAcceptedSourceRowProofTarget(family, row) {
  return (
    (family === "branch_interface" && row === "nucleon_branch_interface_ledgers") ||
    (family === "confinement_functional" &&
      (row === "sigma_eff_extraction" ||
        row === "color_singlet_nucleon_envelope" ||
        row === "delta_E_corr_NN" ||
        row === "finite_range_residual" ||
        row === "no_open_color_far_field")) ||
    (family === "weak_channel" &&
      (row === "va_chirality_gate" ||
        row === "reaction_event_ledger" ||
        row === "noether_sea_response"))
  );
}

function acceptedSourceRowProofTargetEvidencePass(target, family, row) {
  const requiredSpecialtyFields =
    requiredAcceptedSourceRowProofTargetSpecialtyFields(family, row);
  return (
    target &&
    typeof target.rowId === "string" &&
    typeof target.claimLevel === "string" &&
    target.claimLevel.includes("not accepted source evidence") &&
    Array.isArray(target.requiredAcceptedSourceRowsBeforeUse) &&
    Array.isArray(target.requiredSameRecordRows) &&
    Array.isArray(target.requiredClosureRows) &&
    requiredSpecialtyFields.length > 0 &&
    requiredSpecialtyFields.every((field) => Array.isArray(target[field])) &&
    Array.isArray(target.forbiddenPromotionSources) &&
    Array.isArray(target.directToyConsumers?.coefficients) &&
    Array.isArray(target.directToyConsumers?.graphRules)
  );
}

function requiredAcceptedSourceRowProofTargetSpecialtyFields(family, row) {
  return (
    {
      "branch_interface.nucleon_branch_interface_ledgers": [
        "requiredInequalities",
        "requiredLimitStatements",
      ],
      "confinement_functional.sigma_eff_extraction": [
        "requiredExtractionCertificateRows",
      ],
      "confinement_functional.color_singlet_nucleon_envelope": [
        "requiredEnvelopeBundleRows",
      ],
      "confinement_functional.delta_E_corr_NN": [
        "requiredResidualDerivationRows",
      ],
      "confinement_functional.finite_range_residual": [
        "requiredTailLimitStatements",
      ],
      "confinement_functional.no_open_color_far_field": [
        "requiredLimitStatements",
      ],
      "weak_channel.reaction_event_ledger": [
        "requiredConservationRows",
        "requiredEventBalanceRows",
      ],
      "weak_channel.va_chirality_gate": ["requiredChiralitySelectionRows"],
      "weak_channel.noether_sea_response": [
        "requiredUpdateRows",
        "mustRemainDistinctFrom",
      ],
    }[`${family}.${row}`] ?? []
  );
}

function acceptedRowEvidenceTracePass(evidence) {
  if (evidence.evidenceMode !== "accepted_source_row") {
    return true;
  }
  return acceptedEvidenceTracePass(evidence.acceptedEvidenceTrace);
}

function acceptedEvidenceTracePass(trace) {
  return (
    trace &&
    typeof trace.claimLevel === "string" &&
    typeof trace.sourceRowId === "string" &&
    typeof trace.status === "string" &&
    typeof trace.durableEvidenceStatus === "string" &&
    trace.durableEvidenceStatus !== "accepted_status_only"
  );
}

function bindingRowEvidenceRoutePass(evidence, localAccepted, rowBinding) {
  if (localAccepted === true || !rowBinding.sourceAcquisitionFirstMissingObject) {
    return true;
  }
  return sourceAcquisitionRouteEvidencePass(evidence.sourceAcquisitionRoute);
}

function sourceAcquisitionRouteEvidencePass(route) {
  return (
    route &&
    typeof route.sourceRowId === "string" &&
    typeof route.claimLevel === "string" &&
    Array.isArray(route.requiredRowsBeforeUse) &&
    Array.isArray(route.requiredAcceptedRowsBeforeUse) &&
    Array.isArray(route.feedsRowsAfterAcceptance) &&
    Array.isArray(route.notRequiredBeforeAcceptance)
  );
}

function sourceRowStatuses(
  rows,
  requiredRows,
  acceptedPredicate = acceptedSourceRow,
) {
  return Object.fromEntries(
    requiredRows.map((row) => {
      const value = rows?.[row];
      return [
        row,
        {
          accepted: acceptedPredicate(value),
          status:
            value && typeof value === "object" && !Array.isArray(value)
              ? value.status ?? null
              : null,
          id:
            value && typeof value === "object" && !Array.isArray(value)
              ? value.id ?? value.rowId ?? value.eventId ?? null
              : null,
        },
      ];
    }),
  );
}

function sourceRowStatusesFromAcceptedFlag(requiredRows, accepted) {
  return Object.fromEntries(
    requiredRows.map((row) => [
      row,
      {
        accepted,
        status: accepted ? "accepted" : null,
        id: null,
      },
    ]),
  );
}

function sourceRowStatusesFromSourceTargetCheck(report, requiredRows) {
  return Object.fromEntries(
    requiredRows.map((row) => {
      const check = report.rowChecks?.[row];
      const acquisitionTarget =
        report.sourceAcquisitionCheck?.targetChecks?.[row] ?? null;
      return [
        row,
        compactObject({
          accepted: check?.accepted === true,
          status: check?.status ?? null,
          id: check?.sourceRowId ?? null,
          currentEvidenceStatus: check?.currentEvidenceStatus ?? null,
          acceptedStatus: check?.acceptedStatus,
          evidenceAccepted: check?.evidenceAccepted,
          reason: check?.reason,
          sourcePath: check?.sourcePath,
          sourceEvidence: compactSourceEvidence(check?.sourceEvidence),
          reportSourceEvidence: compactSourceEvidence(report.sourceEvidenceCheck),
          providerObjectCheck: compactProviderObjectCheck(
            report.providerObjectCheck,
          ),
          domainId: check?.domainId,
          branchRecordId: check?.branchRecordId,
          group: check?.group,
          eventLedgerRef: check?.eventLedgerRef,
          sourceTargetPath: acquisitionTarget?.sourceTargetPath,
          targetId: acquisitionTarget?.targetId,
          requiredScope: acquisitionTarget?.requiredScope,
          componentShapePass: acquisitionTarget?.componentShapePass,
        }),
      ];
    }),
  );
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  );
}

function compactSourceEvidence(evidence) {
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    return undefined;
  }
  return compactObject({
    accepted: evidence.accepted,
    passed: evidence.passed,
    reason: evidence.reason,
    resolvedPath: evidence.resolvedPath,
    requiredEvidenceStatus: evidence.requiredEvidenceStatus,
  });
}

function compactProviderObjectCheck(check) {
  if (!check || typeof check !== "object" || Array.isArray(check)) {
    return undefined;
  }
  return compactObject({
    passed: check.passed,
    reason: check.reason,
    providerStatus: check.providerStatus,
  });
}

function acceptedSourceRowEvidenceTrace(sourceRow) {
  return compactObject({
    claimLevel:
      "accepted source-row trace; not promotion evidence unless the owning source family is accepted",
    sourceRowId: sourceRow.id ?? null,
    status: sourceRow.status ?? null,
    durableEvidenceStatus: durableEvidenceStatusForSourceRow(sourceRow),
    currentEvidenceStatus: sourceRow.currentEvidenceStatus ?? null,
    sourcePath: sourceRow.sourcePath,
    sourceTargetPath: sourceRow.sourceTargetPath,
    targetId: sourceRow.targetId,
    requiredScope: sourceRow.requiredScope,
    componentShapePass: sourceRow.componentShapePass,
    sourceEvidence: sourceRow.sourceEvidence,
    reportSourceEvidence: sourceRow.reportSourceEvidence,
    providerObjectCheck: sourceRow.providerObjectCheck,
    domainId: sourceRow.domainId,
    branchRecordId: sourceRow.branchRecordId,
    group: sourceRow.group,
    eventLedgerRef: sourceRow.eventLedgerRef,
  });
}

function durableEvidenceStatusForSourceRow(sourceRow) {
  if (sourceRow.currentEvidenceStatus === "accepted_non_fixture_source") {
    return "accepted_non_fixture_source";
  }
  if (sourceRow.sourceEvidence?.accepted === true) {
    return "accepted_source_evidence_check";
  }
  if (
    sourceRow.reportSourceEvidence?.passed === true &&
    sourceRow.providerObjectCheck?.passed === true
  ) {
    return "accepted_provider_source_object";
  }
  if (sourceRow.reportSourceEvidence?.passed === true) {
    return "accepted_source_file";
  }
  return "accepted_status_only";
}

function acceptedSourceRow(row) {
  return (
    row &&
    typeof row === "object" &&
    !Array.isArray(row) &&
    ACCEPTED_STATUSES.has(row.status)
  );
}

function acceptedGenericSourceRow(row) {
  return (
    acceptedSourceRow(row) &&
    row.currentEvidenceStatus === "accepted_non_fixture_source"
  );
}

function missingGenericSourceRowField(row, rowId) {
  if (
    acceptedSourceRow(row) &&
    row.currentEvidenceStatus !== "accepted_non_fixture_source"
  ) {
    return `rows.${rowId}.currentEvidenceStatus`;
  }
  return `rows.${rowId}.accepted`;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return text !== "" && text !== "..." && !text.toLowerCase().includes("pending");
}

function makeCoefficientRows(coefficients, scopeOverrides) {
  return Object.entries(coefficients).map(([name, value]) => {
    const scope = scopeOverrides[name] ?? "shared_global_all_AZ";
    const row = COEFFICIENT_ROWS[name] ?? {
      symbol: name,
      role: "caller-provided toy coefficient",
    };
    return {
      name,
      symbol: row.symbol,
      value: cleanNumber(value),
      status:
        scope === "shared_global_all_AZ"
          ? "shared_global_toy_diagnostic"
          : "hidden_fit_scope_override",
      scope,
      role: row.role,
    };
  });
}

function bestRowForA(A, coefficients, sweepOptions) {
  const zCandidates = betaStableZCandidates(A, coefficients, sweepOptions);
  const candidateRows = zCandidates.map((Z) => evaluateAZ(A, Z, coefficients));
  const best = candidateRows.reduce((winner, row) =>
    row.bindingPerNucleon > winner.bindingPerNucleon ? row : winner,
  );
  return {
    A,
    zCandidates,
    selectedZ: best.Z,
    neutronCount: best.N,
    bStar: cleanNumber(best.bindingPerNucleon),
    bindingTotal: cleanNumber(best.bindingTotal),
    graph: best.graph,
    termsPerNucleon: best.termsPerNucleon,
  };
}

function betaStableZCandidates(A, coefficients, sweepOptions) {
  const center =
    A / (2 + coefficients.betaValleySlope * Math.pow(A, 2 / 3));
  const low = Math.max(0, Math.floor(center - sweepOptions.betaBandHalfWidth));
  const high = Math.min(A, Math.ceil(center + sweepOptions.betaBandHalfWidth));
  return Array.from({ length: high - low + 1 }, (_, index) => low + index);
}

function evaluateAZ(A, Z, coefficients) {
  if (!Number.isInteger(A) || !Number.isInteger(Z) || A < 2 || Z < 0 || Z > A) {
    throw new Error(`Invalid A,Z row: A=${A}, Z=${Z}`);
  }
  if (A === 2 && Z === 1) {
    return pairEvaluation({
      A,
      Z,
      kind: "deuteron",
      corridor: coefficients.pnCorridorPairReward,
      mismatch: coefficients.pnPairMismatchCost,
      coulomb: 0,
      coefficients,
    });
  }
  if (A === 2 && Z === 2) {
    return pairEvaluation({
      A,
      Z,
      kind: "diproton",
      corridor: coefficients.ppCorridorPairReward,
      mismatch: coefficients.ppPairMismatchCost,
      coulomb: coefficients.ppCoulombCost,
      coefficients,
    });
  }

  const graph = graphSummary(A, Z, coefficients);
  const imbalance = (A - 2 * Z) / A;
  const imbalanceSquared = imbalance * imbalance;
  const qCorr = graph.corridorSaturation;
  const qSea = qCorr * Math.max(0, 1 - coefficients.seaImbalancePenalty * imbalanceSquared);
  const corridor = coefficients.alphaCorr * qCorr;
  const sea = coefficients.alphaSea * qSea;
  const surface = coefficients.alphaSurf * Math.pow(A, -1 / 3);
  const coulomb =
    coefficients.alphaCoul * (Z * (Z - 1)) / Math.pow(A, 4 / 3);
  const asymmetry = coefficients.alphaAsym * imbalanceSquared;
  const shell = shellReadout(A, Z, coefficients) / A;
  const pairing = pairingReadout(A, Z, coefficients) / A;
  const packing = packingPenalty(A, graph, coefficients);
  const bindingPerNucleon =
    corridor + sea - surface - coulomb - asymmetry + shell + pairing - packing;

  return {
    A,
    Z,
    N: A - Z,
    kind: "beta_band_candidate",
    bindingPerNucleon: cleanNumber(bindingPerNucleon),
    bindingTotal: cleanNumber(bindingPerNucleon * A),
    graph,
    termsPerNucleon: cleanTerms({
      corridor,
      sea,
      surface: -surface,
      coulomb: -coulomb,
      asymmetry: -asymmetry,
      shell,
      pairing,
      packing: -packing,
    }),
  };
}

function pairEvaluation({ A, Z, kind, corridor, mismatch, coulomb, coefficients }) {
  const bindingTotal = corridor - mismatch - coulomb;
  const bindingPerNucleon = bindingTotal / A;
  return {
    A,
    Z,
    N: A - Z,
    kind,
    bindingPerNucleon: cleanNumber(bindingPerNucleon),
    bindingTotal: cleanNumber(bindingTotal),
    graph: {
      nodeCount: A,
      protonCount: Z,
      neutronCount: A - Z,
      edgeCount: 1,
      maxDegree: coefficients.maxDegree,
      dSat: coefficients.dSat,
      averageDegree: 1,
      corridorSaturation: cleanNumber(1 / coefficients.dSat),
      surfaceFraction: cleanNumber(Math.pow(A, -1 / 3)),
    },
    termsPerNucleon: cleanTerms({
      corridor: corridor / A,
      sea: 0,
      surface: 0,
      coulomb: -coulomb / A,
      asymmetry: 0,
      shell: 0,
      pairing: 0,
      packing: -mismatch / A,
    }),
  };
}

function graphSummary(A, Z, coefficients) {
  const surfaceFraction = Math.pow(A, -1 / 3);
  const corridorSaturation = clamp(
    1 - coefficients.boundaryDegreeLoss * surfaceFraction,
    0,
    1,
  );
  const averageDegree = Math.min(
    coefficients.maxDegree,
    coefficients.dSat * corridorSaturation,
  );
  const edgeCount = Math.round((A * averageDegree) / 2);
  return {
    nodeCount: A,
    protonCount: Z,
    neutronCount: A - Z,
    edgeCount,
    maxDegree: cleanNumber(coefficients.maxDegree),
    dSat: cleanNumber(coefficients.dSat),
    averageDegree: cleanNumber(averageDegree),
    corridorSaturation: cleanNumber(corridorSaturation),
    surfaceFraction: cleanNumber(surfaceFraction),
  };
}

function shellReadout(A, Z, coefficients) {
  const N = A - Z;
  return MAGIC_COUNTS.reduce((sum, magic) => {
    const zGap = Z - magic;
    const nGap = N - magic;
    return (
      sum +
      coefficients.alphaShell * Math.exp(-(zGap * zGap) / 18) +
      coefficients.alphaShell * Math.exp(-(nGap * nGap) / 18)
    );
  }, 0);
}

function pairingReadout(A, Z, coefficients) {
  if (A % 2 !== 0) {
    return 0;
  }
  const N = A - Z;
  if (Z % 2 === 0 && N % 2 === 0) {
    return coefficients.alphaPair / Math.sqrt(A);
  }
  if (Z % 2 === 1 && N % 2 === 1) {
    return -coefficients.alphaPair / Math.sqrt(A);
  }
  return 0;
}

function packingPenalty(A, graph, coefficients) {
  const overDegree = Math.max(0, graph.averageDegree - coefficients.dSat);
  const largeAssemblyPressure =
    A <= coefficients.packSoftA
      ? 0
      : Math.pow((A - coefficients.packSoftA) / coefficients.packSoftA, 2);
  return coefficients.alphaPack * (overDegree * overDegree + largeAssemblyPressure);
}

function saturationCheck(sweepRows, peak, sweepOptions) {
  const endpoint = sweepRows.at(-1);
  const tailStartA = Math.max(
    peak.A + 1,
    sweepOptions.aMax - sweepOptions.saturationTailWindow + 1,
  );
  const tailRows = sweepRows.filter((row) => row.A >= tailStartA);
  const tailBest = tailRows.reduce(
    (best, row) => (row.bStar > best.bStar ? row : best),
    tailRows[0] ?? endpoint,
  );
  const endpointDrop = peak.bStar - endpoint.bStar;
  const triggered =
    peak.A > sweepOptions.aMax - sweepOptions.saturationTailWindow ||
    endpointDrop < sweepOptions.saturationDropMinimum;
  return {
    check: "finite_binding_per_nucleon_maximum",
    triggered,
    status: triggered
      ? "fail_closed_no_saturation_or_tail_drop"
      : "finite_maximum_with_tail_drop",
    peakA: peak.A,
    peakZ: peak.selectedZ,
    peakBStar: peak.bStar,
    endpointA: endpoint.A,
    endpointZ: endpoint.selectedZ,
    endpointBStar: endpoint.bStar,
    endpointDrop: cleanNumber(endpointDrop),
    tailBestA: tailBest.A,
    tailBestZ: tailBest.selectedZ,
    tailBestBStar: tailBest.bStar,
    requiredEndpointDrop: sweepOptions.saturationDropMinimum,
  };
}

function representativeHeavySplit(coefficients) {
  const parent = evaluateAZ(
    HEAVY_SPLIT_PARENT.A,
    HEAVY_SPLIT_PARENT.Z,
    coefficients,
  );
  const daughterA = HEAVY_SPLIT_PARENT.A / 2;
  const daughterZ = HEAVY_SPLIT_PARENT.Z / 2;
  const daughter = evaluateAZ(daughterA, daughterZ, coefficients);
  const parentCoulombStress = coulombStress(
    HEAVY_SPLIT_PARENT.A,
    HEAVY_SPLIT_PARENT.Z,
    coefficients,
  );
  const daughterPairCoulombStress =
    2 * coulombStress(daughterA, daughterZ, coefficients);
  const bindingGain = 2 * daughter.bindingTotal - parent.bindingTotal;
  return {
    check: "representative_symmetric_heavy_split",
    parent: {
      A: parent.A,
      Z: parent.Z,
      bStar: parent.bindingPerNucleon,
      bindingTotal: parent.bindingTotal,
    },
    daughters: [
      {
        A: daughter.A,
        Z: daughter.Z,
        bStar: daughter.bindingPerNucleon,
        bindingTotal: daughter.bindingTotal,
      },
      {
        A: daughter.A,
        Z: daughter.Z,
        bStar: daughter.bindingPerNucleon,
        bindingTotal: daughter.bindingTotal,
      },
    ],
    bindingGainReduced: cleanNumber(bindingGain),
    fissionFavoredByBindingGain: bindingGain > 0,
    coulombStress: {
      parent: cleanNumber(parentCoulombStress),
      daughterPair: cleanNumber(daughterPairCoulombStress),
      daughterPairToParentRatio: cleanNumber(
        daughterPairCoulombStress / parentCoulombStress,
      ),
    },
    declaredLedgerRoutes: [...RELEASE_LEDGER_ROUTES],
    ledgerAuthorization: "routes_declared_not_reaction_ledger_proof",
  };
}

function coulombStress(A, Z, coefficients) {
  return coefficients.alphaCoul * (Z * (Z - 1)) / Math.pow(A, 1 / 3);
}

function makeNegativeControls({
  peak,
  deuteron,
  diproton,
  saturation,
  coefficientRows,
  heavySplit,
}) {
  const hiddenFitRows = coefficientRows.filter(
    (row) => row.scope !== "shared_global_all_AZ",
  );
  const feNiWindowPass = inFeNiWindow(peak.A, peak.selectedZ);
  return {
    deuteron_unbound: {
      triggered: deuteron.bindingPerNucleon <= 0,
      status:
        deuteron.bindingPerNucleon > 0
          ? "pass_deuteron_bound_by_pair_corridor"
          : "fail_deuteron_unbound",
      observedBindingPerNucleon: deuteron.bindingPerNucleon,
    },
    diproton_overbound: {
      triggered: diproton.bindingPerNucleon > 0,
      status:
        diproton.bindingPerNucleon <= 0
          ? "pass_diproton_not_bound"
          : "fail_diproton_overbound",
      observedBindingPerNucleon: diproton.bindingPerNucleon,
    },
    no_saturation: {
      triggered: saturation.triggered,
      status: saturation.status,
      endpointDrop: saturation.endpointDrop,
    },
    wrong_cusp_region: {
      triggered: !feNiWindowPass,
      status: feNiWindowPass ? "pass_peak_inside_fe_ni_window" : "fail_peak_outside_fe_ni_window",
      peakA: peak.A,
      peakZ: peak.selectedZ,
      feNiWindow: { ...FE_NI_WINDOW },
    },
    hidden_fit: {
      triggered: hiddenFitRows.length > 0,
      status:
        hiddenFitRows.length === 0
          ? "pass_all_coefficients_shared_global"
          : "fail_non_global_coefficient_scope_present",
      hiddenFitRows: hiddenFitRows.map((row) => row.name),
    },
    ledger_loss: {
      triggered:
        heavySplit.bindingGainReduced > 0 &&
        heavySplit.declaredLedgerRoutes.length === 0,
      status: "pass_energy_routes_declared_but_not_authorizing_ledger_proof",
      declaredLedgerRoutes: heavySplit.declaredLedgerRoutes,
    },
    shielded_energy_leak: {
      triggered: false,
      status: "pass_surviving_nucleon_shielded_energy_excluded",
      survivingNucleonShieldedEnergyUsed: false,
    },
  };
}

function firstFailureRow(negativeControls) {
  for (const failureRow of FAILURE_ORDER) {
    if (negativeControls?.[failureRow]?.triggered === true) {
      return failureRow;
    }
  }
  return null;
}

function pairComparisonRow(kind, row) {
  return {
    check: kind,
    A: row.A,
    Z: row.Z,
    N: row.N,
    bindingPerNucleon: row.bindingPerNucleon,
    bindingTotal: row.bindingTotal,
    bound: row.bindingPerNucleon > 0,
    overbound: kind === "diproton" ? row.bindingPerNucleon > 0 : false,
    termsPerNucleon: row.termsPerNucleon,
  };
}

function inFeNiWindow(A, Z) {
  return (
    A >= FE_NI_WINDOW.aMin &&
    A <= FE_NI_WINDOW.aMax &&
    Z >= FE_NI_WINDOW.zMin &&
    Z <= FE_NI_WINDOW.zMax
  );
}

function cleanTerms(terms) {
  return Object.fromEntries(
    Object.entries(terms).map(([key, value]) => [key, cleanNumber(value)]),
  );
}

function cleanNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Math.round((value + Number.EPSILON) * 1e12) / 1e12;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
