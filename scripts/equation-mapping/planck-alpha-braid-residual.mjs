#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "planck-alpha-braid-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-planck-alpha-braid-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-planck-alpha-braid-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const TWO_PI = 2 * Math.PI;

const REQUIRED_ROWS = [
  "theta_gamma_packet",
  "theta_star_common_action_photon_carrier",
  "planck_braid_carrier",
  "braid_action_one_form_row",
  "history_space_symplectic_row",
  "period_uniqueness_row",
  "photon_action_quantum_row",
  "phase_cycle_angular_momentum_row",
  "photon_packet_row",
  "thermal_mode_counting_row",
  "planck_occupancy_row",
  "temperature_clock_conversion_row",
  "alpha_coupling_row",
  "charge_exposure_row",
  "local_photon_speed_row",
  "vacuum_polarization_wake_dressing_row",
  "energy_scale_running_row",
  "fiber_product_cocycle_witness",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  planckQuantum: 1e-12,
  blackbody: 1e-12,
  alpha: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
  negativeControl: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluatePlanckAlphaBraid(input, inputPath);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-populated") {
      parsed.requirePopulated = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/planck-alpha-braid-residual.mjs [options]

Options:
  --input PATH          Planck/alpha braid input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates a score-neutral Planck/alpha braid residual bundle:
Planck-Einstein action closure through a retained action one-form, Planck
blackbody mode occupancy, and fine-structure coupling/running. Attempt rows,
per-bin thermal fits, scale-independent alpha, carrier splits, mu-dependent
action periods, and hidden retunes never raise scores.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(output, parsedArgs) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluatePlanckAlphaBraid(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const residual = evaluateResidualBundle(packet.planckAlpha ?? {}, tolerances);
  const negativeControls = evaluateNegativeControls(
    packet.planckAlpha ?? {},
    packet.negativeControls ?? [],
    tolerances,
  );
  const status = decideStatus({
    missingRows,
    carrierBinding,
    residual,
    negativeControls,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    residual: {
      id: input.residualId ?? packet.id ?? null,
      rows: ["EQ-12A", "EQ-22A", "EQ-26A"],
      supportedRows: ["EQ-12", "EQ-22", "EQ-25", "EQ-26", "EQ-27", "EQ-29"],
      claimLevel:
        "score-neutral Planck/alpha braid residual over a minimal common action/photon carrier; accepted retained rows are required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        carrierBinding,
        residual,
        negativeControls,
      }),
      commonCarrierPass: carrierBinding.passed,
      planckQuantumPass: residual.planckQuantum.passed,
      periodUniquenessPass: residual.planckQuantum.periodUniqueness.passed,
      blackbodyPass: residual.blackbody.passed,
      alphaRunningPass: residual.alphaRunning.passed,
      sourceProvenancePass: residual.sourceProvenance.passed,
      hiddenRetunePass: residual.noHiddenRetune.passed,
      aggregateResidual: residual.aggregateResidual,
      negativeControlPassCount: negativeControls.filter((control) => control.passed).length,
      negativeControlCount: negativeControls.length,
      failedNegativeControls: negativeControls.filter((control) => !control.passed).map((control) => control.id),
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    planckAlphaResidual: residual,
    negativeControls,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    rowStatuses: Object.fromEntries(
      Object.entries(output.rows).map(([rowId, row]) => [rowId, { status: row.status, reason: row.reason }]),
    ),
  };
}

function parseTolerances(tolerances) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, fallback]) => [
      key,
      finiteNumber(tolerances[key] ?? fallback, `tolerances.${key}`),
    ]),
  );
}

function evaluateResidualBundle(packet, tolerances) {
  const planckQuantum = evaluatePlanckQuantum(packet.planckQuantum ?? {}, tolerances.planckQuantum);
  const blackbody = evaluateBlackbody(packet.blackbody ?? {}, tolerances.blackbody);
  const alphaRunning = evaluateAlphaRunning(packet.alphaRunning ?? {}, tolerances.alpha);
  const sourceProvenance = evaluateScalarResidual(
    packet.sourceProvenance?.residual ?? packet.sourceProvenance?.maxResidual,
    tolerances.sourceProvenance,
  );
  const noHiddenRetune = evaluateScalarResidual(
    packet.noHiddenRetune?.maxResidual ?? packet.noHiddenRetune?.residual,
    tolerances.retune,
  );
  const aggregateResidual =
    planckQuantum.maxResidual +
    blackbody.maxResidual +
    alphaRunning.maxResidual +
    sourceProvenance.residual +
    noHiddenRetune.residual;
  const passed =
    planckQuantum.passed &&
    blackbody.passed &&
    alphaRunning.passed &&
    sourceProvenance.passed &&
    noHiddenRetune.passed;

  return {
    passed,
    aggregateResidual,
    planckQuantum,
    blackbody,
    alphaRunning,
    sourceProvenance,
    noHiddenRetune,
  };
}

function evaluatePlanckQuantum(row, tolerance) {
  const energyFrequency = evaluateEnergyFrequency(row.energyFrequency ?? {}, tolerance);
  const angularEnergy = evaluateAngularEnergy(row.angularEnergy ?? {}, tolerance);
  const actionCycle = evaluateActionCycle(row.actionCycle ?? {}, tolerance);
  const periodUniqueness = evaluatePeriodUniqueness(row.periodUniqueness ?? {}, tolerance);
  const angularMomentumUnit = evaluateScalarResidual(
    row.angularMomentumUnit?.residual ?? row.angularMomentumUnit?.maxResidual,
    tolerance,
  );
  const maxResidual = Math.max(
    energyFrequency.residual,
    angularEnergy.residual,
    actionCycle.residual,
    periodUniqueness.residual,
    angularMomentumUnit.residual,
  );

  return {
    passed:
      energyFrequency.passed &&
      angularEnergy.passed &&
      actionCycle.passed &&
      periodUniqueness.passed &&
      angularMomentumUnit.passed,
    maxResidual,
    tolerance,
    energyFrequency,
    angularEnergy,
    actionCycle,
    periodUniqueness,
    angularMomentumUnit,
  };
}

function evaluateEnergyFrequency(row, tolerance) {
  const energy = finiteNumber(row.energy, "planckQuantum.energyFrequency.energy");
  const h = finiteNumber(row.planckConstant, "planckQuantum.energyFrequency.planckConstant");
  const frequency = finiteNumber(row.frequency, "planckQuantum.energyFrequency.frequency");
  const expectedEnergy = h * frequency;
  const residual = relativeResidual(energy, expectedEnergy, row.epsilonEnergy ?? 0);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    energy,
    expectedEnergy,
  };
}

function evaluateAngularEnergy(row, tolerance) {
  const energy = finiteNumber(row.energy, "planckQuantum.angularEnergy.energy");
  const hbar = finiteNumber(row.reducedPlanckConstant, "planckQuantum.angularEnergy.reducedPlanckConstant");
  const angularFrequency = finiteNumber(row.angularFrequency, "planckQuantum.angularEnergy.angularFrequency");
  const expectedEnergy = hbar * angularFrequency;
  const residual = relativeResidual(energy, expectedEnergy, row.epsilonEnergy ?? 0);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    energy,
    expectedEnergy,
  };
}

function evaluateActionCycle(row, tolerance) {
  const action = finiteNumber(row.action, "planckQuantum.actionCycle.action");
  const h = finiteNumber(row.planckConstant, "planckQuantum.actionCycle.planckConstant");
  const hbar = finiteNumber(row.reducedPlanckConstant, "planckQuantum.actionCycle.reducedPlanckConstant");
  const cycleAngle = finiteNumber(row.cycleAngle ?? TWO_PI, "planckQuantum.actionCycle.cycleAngle");
  const hFromHbar = hbar * cycleAngle;
  const actionResidual = relativeResidual(action, h, row.epsilonAction ?? 0);
  const hbarResidual = relativeResidual(h, hFromHbar, row.epsilonAction ?? 0);
  const residual = Math.max(actionResidual, hbarResidual);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    action,
    expectedAction: h,
    hFromHbar,
  };
}

function evaluatePeriodUniqueness(row, tolerance) {
  if (row.maxResidual !== undefined || row.residual !== undefined) {
    return evaluateScalarResidual(row.maxResidual ?? row.residual, tolerance);
  }
  const extractedPeriods = (row.extractedActionPeriods ?? []).map((value, index) =>
    finiteNumber(value, `planckQuantum.periodUniqueness.extractedActionPeriods.${index}`),
  );
  if (extractedPeriods.length === 0) {
    return evaluateScalarResidual(Number.POSITIVE_INFINITY, tolerance);
  }
  const mean = extractedPeriods.reduce((sum, value) => sum + value, 0) / extractedPeriods.length;
  const maxDeviation = Math.max(...extractedPeriods.map((value) => Math.abs(value - mean)));
  const residual = maxDeviation / Math.max(Math.abs(mean), 1);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    extractedActionPeriods: extractedPeriods,
    mean,
  };
}

function evaluateBlackbody(row, tolerance) {
  const h = finiteNumber(row.planckConstant, "blackbody.planckConstant");
  const frequency = finiteNumber(row.frequency, "blackbody.frequency");
  const kB = finiteNumber(row.boltzmannConstant, "blackbody.boltzmannConstant");
  const temperature = finiteNumber(row.temperature, "blackbody.temperature");
  const c = finiteNumber(row.photonSpeed, "blackbody.photonSpeed");
  const occupancy = finiteNumber(row.meanOccupancy, "blackbody.meanOccupancy");
  const modeDensity = finiteNumber(row.modeDensity, "blackbody.modeDensity");
  const energyDensity = finiteNumber(row.energyDensity, "blackbody.energyDensity");
  const photonChemicalPotential = finiteNumber(row.photonChemicalPotential ?? 0, "blackbody.photonChemicalPotential");
  const thermalizationDepth = finiteNumber(row.thermalizationDepth ?? 1, "blackbody.thermalizationDepth");
  const minThermalizationDepth = finiteNumber(row.minThermalizationDepth ?? 1, "blackbody.minThermalizationDepth");
  const x = (h * frequency - photonChemicalPotential) / (kB * temperature);
  const expectedOccupancy = 1 / Math.expm1(x);
  const expectedModeDensity = 8 * Math.PI * frequency ** 2 / c ** 3;
  const expectedEnergyDensity = expectedModeDensity * h * frequency * expectedOccupancy;
  const occupancyResidual = relativeResidual(occupancy, expectedOccupancy, row.epsilonOccupancy ?? 0);
  const modeDensityResidual = relativeResidual(modeDensity, expectedModeDensity, row.epsilonModeDensity ?? 0);
  const energyDensityResidual = relativeResidual(energyDensity, expectedEnergyDensity, row.epsilonEnergyDensity ?? 0);
  const chemicalPotentialResidual = Math.abs(photonChemicalPotential) / Math.max(Math.abs(kB * temperature), 1);
  const thermalizationResidual =
    minThermalizationDepth <= 0
      ? 0
      : Math.max(0, minThermalizationDepth - thermalizationDepth) / minThermalizationDepth;
  const maxResidual = Math.max(
    occupancyResidual,
    modeDensityResidual,
    energyDensityResidual,
    chemicalPotentialResidual,
    thermalizationResidual,
  );

  return {
    passed: maxResidual <= tolerance,
    maxResidual,
    tolerance,
    x,
    occupancy: {
      residual: occupancyResidual,
      observed: occupancy,
      expected: expectedOccupancy,
    },
    modeDensity: {
      residual: modeDensityResidual,
      observed: modeDensity,
      expected: expectedModeDensity,
    },
    energyDensity: {
      residual: energyDensityResidual,
      observed: energyDensity,
      expected: expectedEnergyDensity,
    },
    photonChemicalPotential: {
      residual: chemicalPotentialResidual,
      value: photonChemicalPotential,
    },
    thermalizationDepth: {
      residual: thermalizationResidual,
      value: thermalizationDepth,
      minimum: minThermalizationDepth,
    },
  };
}

function evaluateAlphaRunning(row, tolerance) {
  const alphaReference = finiteNumber(row.alphaReference, "alphaRunning.alphaReference");
  const alphaAtScale = finiteNumber(row.alphaAtScale, "alphaRunning.alphaAtScale");
  const chargeExposureSquared = finiteNumber(
    row.chargeExposureSquared,
    "alphaRunning.chargeExposureSquared",
  );
  const epsilon0 = finiteNumber(row.epsilon0, "alphaRunning.epsilon0");
  const hbar = finiteNumber(row.reducedPlanckConstant, "alphaRunning.reducedPlanckConstant");
  const c = finiteNumber(row.photonSpeed, "alphaRunning.photonSpeed");
  const referenceScale = finiteNumber(row.referenceScale, "alphaRunning.referenceScale");
  const scale = finiteNumber(row.scale, "alphaRunning.scale");
  const betaLogCoefficient = finiteNumber(row.betaLogCoefficient, "alphaRunning.betaLogCoefficient");
  const expectedAlphaReference = chargeExposureSquared / (4 * Math.PI * epsilon0 * hbar * c);
  const expectedAlphaAtScale =
    1 / (1 / alphaReference - betaLogCoefficient * Math.log(scale / referenceScale));
  const alphaFormulaResidual = relativeResidual(alphaReference, expectedAlphaReference, row.epsilonAlpha ?? 0);
  const runningResidual = relativeResidual(alphaAtScale, expectedAlphaAtScale, row.epsilonAlpha ?? 0);
  const maxResidual = Math.max(alphaFormulaResidual, runningResidual);

  return {
    passed: maxResidual <= tolerance,
    maxResidual,
    tolerance,
    alphaFormula: {
      residual: alphaFormulaResidual,
      observed: alphaReference,
      expected: expectedAlphaReference,
    },
    running: {
      residual: runningResidual,
      observed: alphaAtScale,
      expected: expectedAlphaAtScale,
      referenceScale,
      scale,
      betaLogCoefficient,
    },
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = Math.abs(finiteNumber(value ?? Number.POSITIVE_INFINITY, "scalarResidual"));
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
  };
}

function evaluateNegativeControls(packet, controls, tolerances) {
  return controls.map((control) => {
    const result = evaluateNegativeControl(packet, control, tolerances);
    return {
      id: control.id ?? "unnamed_negative_control",
      expectedFailure: true,
      passed: result.failedAsExpected,
      reason: result.reason,
      residual: result.residual,
      tolerance: result.tolerance,
    };
  });
}

function evaluateNegativeControl(packet, control, tolerances) {
  if (control.kind === "planck_quantum_detuned") {
    const row = {
      ...(packet.planckQuantum ?? {}),
      energyFrequency: {
        ...(packet.planckQuantum?.energyFrequency ?? {}),
        ...(control.energyFrequency ?? {}),
      },
    };
    const result = evaluatePlanckQuantum(row, tolerances.planckQuantum);
    return {
      failedAsExpected: !result.passed,
      reason: result.passed ? "detuned_planck_quantum_passed" : "detuned_planck_quantum_failed",
      residual: result.maxResidual,
      tolerance: result.tolerance,
    };
  }
  if (control.kind === "mu_dependent_action_period") {
    const row = {
      ...(packet.planckQuantum ?? {}),
      periodUniqueness: {
        ...(packet.planckQuantum?.periodUniqueness ?? {}),
        ...(control.periodUniqueness ?? {}),
      },
    };
    const result = evaluatePlanckQuantum(row, tolerances.planckQuantum);
    return {
      failedAsExpected: !result.passed,
      reason: result.passed ? "mu_dependent_action_period_passed" : "mu_dependent_action_period_failed",
      residual: result.maxResidual,
      tolerance: result.tolerance,
    };
  }
  if (control.kind === "wrong_mode_count") {
    const row = {
      ...(packet.blackbody ?? {}),
      ...(control.blackbody ?? {}),
    };
    const result = evaluateBlackbody(row, tolerances.blackbody);
    return {
      failedAsExpected: !result.passed,
      reason: result.passed ? "wrong_mode_count_passed" : "wrong_mode_count_failed",
      residual: result.maxResidual,
      tolerance: result.tolerance,
    };
  }
  if (control.kind === "per_bin_temperature_fit") {
    const residual = Math.abs(
      finiteNumber(control.temperatureSpread ?? control.retuneResidual, "negativeControl.temperatureSpread"),
    );
    return {
      failedAsExpected: residual > tolerances.blackbody,
      reason:
        residual > tolerances.blackbody
          ? "per_bin_temperature_fit_detected"
          : "per_bin_temperature_fit_not_detected",
      residual,
      tolerance: tolerances.blackbody,
    };
  }
  if (control.kind === "blackbody_without_thermalization") {
    const row = {
      ...(packet.blackbody ?? {}),
      ...(control.blackbody ?? {}),
    };
    const result = evaluateBlackbody(row, tolerances.blackbody);
    return {
      failedAsExpected: !result.passed,
      reason: result.passed ? "blackbody_without_thermalization_passed" : "blackbody_without_thermalization_failed",
      residual: result.maxResidual,
      tolerance: result.tolerance,
    };
  }
  if (control.kind === "longitudinal_mode_leakage") {
    const residual = Math.abs(finiteNumber(control.longitudinalLeakage, "negativeControl.longitudinalLeakage"));
    return {
      failedAsExpected: residual > tolerances.blackbody,
      reason:
        residual > tolerances.blackbody ? "longitudinal_mode_leakage_detected" : "longitudinal_mode_leakage_not_detected",
      residual,
      tolerance: tolerances.blackbody,
    };
  }
  if (control.kind === "alpha_constant_across_scales") {
    const row = {
      ...(packet.alphaRunning ?? {}),
      ...(control.alphaRunning ?? {}),
    };
    const result = evaluateAlphaRunning(row, tolerances.alpha);
    return {
      failedAsExpected: !result.passed,
      reason: result.passed ? "scale_independent_alpha_passed" : "scale_independent_alpha_failed",
      residual: result.maxResidual,
      tolerance: result.tolerance,
    };
  }
  if (control.kind === "hidden_retune") {
    const residual = Math.abs(finiteNumber(control.retuneResidual, "negativeControl.retuneResidual"));
    return {
      failedAsExpected: residual > tolerances.retune,
      reason: residual > tolerances.retune ? "hidden_retune_detected" : "hidden_retune_not_detected",
      residual,
      tolerance: tolerances.retune,
    };
  }
  return {
    failedAsExpected: false,
    reason: `unknown_negative_control_${control.kind ?? "missing_kind"}`,
    residual: Number.NaN,
    tolerance: tolerances.negativeControl,
  };
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowCarrierIds = Object.fromEntries(
    Object.entries(rows).map(([rowId, row]) => [rowId, row?.carrierId ?? null]),
  );
  const mismatches = Object.entries(rowCarrierIds)
    .filter(([, carrierId]) => carrierId !== null && commonCarrierId !== null && carrierId !== commonCarrierId)
    .map(([rowId, carrierId]) => ({ rowId, carrierId, expectedCarrierId: commonCarrierId }));
  return {
    passed: Boolean(commonCarrierId) && mismatches.length === 0,
    commonCarrierId: commonCarrierId ?? null,
    mismatches,
    rowCarrierIds,
  };
}

function evaluateAcceptedRow(row) {
  if (!row) {
    return { accepted: false, reason: "missing_row" };
  }
  if (!ACCEPTED_STATUSES.has(normalizeStatus(row))) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!hasConcreteIdentity(row)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourceCheck = evaluateSourceReference(row);
  if (!sourceCheck.accepted) {
    return { accepted: false, reason: sourceCheck.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  return String(row?.status ?? row ?? "missing").toLowerCase();
}

function hasConcreteIdentity(row) {
  const id = row?.rowId ?? row?.id;
  return typeof id === "string" && id.trim().length > 0 && !id.includes("attempt");
}

function evaluateSourceReference(row) {
  const source = row?.sourcePath ?? row?.source;
  if (typeof source !== "string" || source.trim().length === 0) {
    return { accepted: false, reason: "source_missing" };
  }
  if (/^https?:\/\//.test(source)) {
    return { accepted: true, reason: "source_url" };
  }
  if (source.includes("/tmp/") || source.includes("content/generated/")) {
    return { accepted: false, reason: "source_not_durable" };
  }
  const resolved = path.resolve(REPO_ROOT, source);
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_not_found" };
  }
  if (fs.statSync(resolved).isDirectory()) {
    return { accepted: false, reason: "source_is_directory" };
  }
  return { accepted: true, reason: "source_file" };
}

function decideStatus({ missingRows, carrierBinding, residual, negativeControls }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!residual.passed) {
    return "failed_residual";
  }
  if (negativeControls.some((control) => !control.passed)) {
    return "failed_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, carrierBinding, residual, negativeControls }) {
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return "carrier_split_or_missing_common_carrier";
  }
  if (!residual.planckQuantum.passed) {
    if (!residual.planckQuantum.periodUniqueness.passed) {
      return "period_uniqueness_residual_failed";
    }
    return "planck_quantum_residual_failed";
  }
  if (!residual.blackbody.passed) {
    return "blackbody_residual_failed";
  }
  if (!residual.alphaRunning.passed) {
    return "alpha_running_residual_failed";
  }
  if (!residual.sourceProvenance.passed) {
    return "source_provenance_residual_failed";
  }
  if (!residual.noHiddenRetune.passed) {
    return "hidden_retune_residual_failed";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_${failedControl.id}_did_not_fail`;
  }
  return status === "populated" ? "none" : status;
}

function relativeResidual(observedValue, expectedValue, epsilonValue = 0) {
  const observed = finiteNumber(observedValue, "relativeResidual.observed");
  const expected = finiteNumber(expectedValue, "relativeResidual.expected");
  const epsilon = finiteNumber(epsilonValue, "relativeResidual.epsilon");
  const scale = Math.max(Math.abs(observed), Math.abs(expected), epsilon, 1);
  return Math.abs(observed - expected) / scale;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected finite number for ${label}`);
  }
  return number;
}
