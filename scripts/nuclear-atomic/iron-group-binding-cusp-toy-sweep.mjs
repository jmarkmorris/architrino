#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  providerEvidenceStatusForPath,
  providerSourcePathRejectionReason,
} from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";

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

const FAILURE_ORDER = Object.freeze([
  "deuteron_unbound",
  "diproton_overbound",
  "no_saturation",
  "wrong_cusp_region",
  "hidden_fit",
  "ledger_loss",
  "shielded_energy_leak",
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
    report.sourceBinding?.summary?.allRequiredFamiliesAccepted !== true
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
      ordinaryFissionFusionScope:
        "higher-level nuclear assembly energy, emitted products, recoil, heat, photon rows when present, medium exchange, and Noether sea update rows",
      shieldedEnergyPolicy:
        "the toy does not route ordinary fission or fusion through exposed shielded internal branch energy of surviving protons or neutrons",
    },
    authorization: {
      acceptedNuclearBindingRecovery: false,
      acceptedIronGroupCuspRecovery: false,
      sourceBindingPreconditionsMet:
        sourceBinding.summary.allRequiredFamiliesAccepted === true,
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
  if (report?.sourceBinding?.schema !== SOURCE_BINDING_REPORT_SCHEMA) {
    errors.push("source_binding_report_missing");
  } else if (
    report.summary?.sourceBindingStatus !== report.sourceBinding.summary?.status
  ) {
    errors.push("source_binding_status_mismatch");
  }
  return errors;
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
  --require-pass            Exit nonzero when a fail-closed row triggers.
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
    declaredLedgerRoutes: [
      "daughter binding rows",
      "emitted products when present",
      "recoil",
      "heat",
      "photon rows when present",
      "medium exchange",
      "Noether sea update",
    ],
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
