#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq11a-gravitational-wave-source-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq11a-gravitational-wave-source-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq11a-gravitational-wave-source-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "gw_source_carrier",
  "theta_sea",
  "effective_metric_tensor_channel",
  "source_event_ledger",
  "quadrupole_source_row",
  "chirp_mass_row",
  "peters_decay_row",
  "strain_flux_row",
  "ringdown_label_row",
  "detector_strain_record",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  chirpMass: 1e-12,
  chirpRate: 1e-12,
  petersDecay: 1e-12,
  quadrupoleFlux: 1e-12,
  strainFlux: 1e-12,
  ringdown: 1e-12,
  energyAngularMomentumLedger: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq11aGravitationalWaveSource(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs [options]

Options:
  --input PATH          EQ-11A gravitational-wave source residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-11A gravitational-wave source
attempt. It computes chirp-mass, chirp-rate, Peters circular-decay,
quadrupole-power, strain-flux, ringdown, source-ledger, source-provenance, and
hidden-retune diagnostics on one declared source carrier. Passing diagnostics
do not raise scores unless the carrier and row bindings are accepted.`);
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

function evaluateEq11aGravitationalWaveSource(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const carrier = evaluateAcceptedEvidence(input.carrier ?? packet.carrier);
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, input.commonCarrierId ?? packet.id);
  const solver = evaluateGravitationalWaveSourceSolver(packet, tolerances);
  const negativeControls = evaluateNegativeControls(packet, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({
    carrier,
    missingRows,
    carrierBinding,
    solver,
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
      row: "EQ-11A",
      solverTarget: "gravitational_wave_source_recovery",
      supportedRows: ["EQ-07", "EQ-09", "EQ-10", "EQ-11", "EQ-20", "EQ-29"],
      claimLevel:
        "score-neutral solver-style gravitational-wave source residual; accepted source-carrier retained evidence is required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      nextBlocker: firstBlocker({ status, carrier, missingRows, carrierBinding, solver, negativeControls }),
      solverNextBlocker: firstSolverBlocker(solver, negativeControls),
      carrierAccepted: carrier.accepted,
      carrierReason: carrier.reason,
      missingRows,
      commonCarrierPass: carrierBinding.passed,
      solverResidualPass: allSolverChecksPass(solver),
      chirpMassPass: solver.chirpMass.passed,
      chirpRatePass: solver.chirpRate.passed,
      petersDecayPass: solver.petersDecay.passed,
      quadrupoleFluxPass: solver.quadrupoleFlux.passed,
      strainFluxPass: solver.strainFlux.passed,
      ringdownPass: solver.ringdown.passed,
      energyAngularMomentumLedgerPass: solver.energyAngularMomentumLedger.passed,
      sourceProvenancePass: solver.sourceProvenance.passed,
      hiddenRetunePass: solver.noHiddenRetune.passed,
      negativeControlPassCount: negativeControls.filter((control) => control.passed).length,
      negativeControlCount: negativeControls.length,
      failedNegativeControls: negativeControls.filter((control) => !control.passed).map((control) => control.id),
    },
    carrier: {
      status: normalizeStatus(input.carrier ?? packet.carrier),
      accepted: carrier.accepted,
      reason: carrier.reason,
      id: input.carrier?.id ?? packet.carrier?.id ?? null,
      sourcePath: input.carrier?.sourcePath ?? packet.carrier?.sourcePath ?? input.carrier?.source ?? null,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    solver,
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
    carrier: output.carrier,
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

function evaluateGravitationalWaveSourceSolver(packet, tolerances) {
  const constants = parseConstants(packet.constants ?? {});
  const binarySamples = parseBinarySamples(packet.binarySamples ?? []);
  const strainSamples = parseStrainSamples(packet.strainSamples ?? []);
  const ringdownSamples = parseRingdownSamples(packet.ringdownSamples ?? []);
  return {
    constants,
    chirpMass: evaluateChirpMass(binarySamples, tolerances.chirpMass),
    chirpRate: evaluateChirpRate(binarySamples, constants, tolerances.chirpRate),
    petersDecay: evaluatePetersDecay(binarySamples, constants, tolerances.petersDecay),
    quadrupoleFlux: evaluateQuadrupoleFlux(binarySamples, constants, tolerances.quadrupoleFlux),
    strainFlux: evaluateStrainFlux(strainSamples, constants, tolerances.strainFlux),
    ringdown: evaluateRingdown(ringdownSamples, constants, tolerances.ringdown),
    energyAngularMomentumLedger: evaluateEnergyAngularMomentumLedger(
      packet.energyAngularMomentumLedger ?? {},
      tolerances.energyAngularMomentumLedger,
    ),
    sourceProvenance: evaluateScalarResidual(
      packet.sourceProvenance?.maxResidual ?? packet.sourceProvenance?.residual,
      tolerances.sourceProvenance,
    ),
    noHiddenRetune: evaluateNoHiddenRetune(packet.noHiddenRetune ?? {}, tolerances.retune),
  };
}

function parseConstants(constants) {
  const gEff = finiteNumber(constants.G_eff ?? 1, "constants.G_eff");
  const cGW = finiteNumber(constants.c_GW ?? 1, "constants.c_GW");
  if (gEff <= 0) {
    throw new Error("constants.G_eff must be positive.");
  }
  if (cGW <= 0) {
    throw new Error("constants.c_GW must be positive.");
  }
  return { G_eff: gEff, c_GW: cGW };
}

function parseBinarySamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("binarySamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `binarySamples[${index}]`;
    const m1 = finiteNumber(sample.m1, `${prefix}.m1`);
    const m2 = finiteNumber(sample.m2, `${prefix}.m2`);
    const separation = finiteNumber(sample.separation, `${prefix}.separation`);
    if (m1 <= 0 || m2 <= 0) {
      throw new Error(`${prefix}.m1 and ${prefix}.m2 must be positive.`);
    }
    if (separation <= 0) {
      throw new Error(`${prefix}.separation must be positive.`);
    }
    return {
      id: sample.id ?? `binary_${index + 1}`,
      m1,
      m2,
      separation,
      eccentricity: finiteNumber(sample.eccentricity ?? 0, `${prefix}.eccentricity`),
      chirpMass: finiteNumber(sample.chirpMass, `${prefix}.chirpMass`),
      f_GW: finiteNumber(sample.f_GW, `${prefix}.f_GW`),
      frequencyDerivative: finiteNumber(sample.frequencyDerivative, `${prefix}.frequencyDerivative`),
      semiMajorAxisDerivative: finiteNumber(sample.semiMajorAxisDerivative, `${prefix}.semiMajorAxisDerivative`),
      orbitalPeriod: finiteNumber(sample.orbitalPeriod, `${prefix}.orbitalPeriod`),
      orbitalPeriodDerivative: finiteNumber(sample.orbitalPeriodDerivative, `${prefix}.orbitalPeriodDerivative`),
      radiatedPower: finiteNumber(sample.radiatedPower, `${prefix}.radiatedPower`),
      quadrupoleThirdDerivativeNorm: finiteNumber(
        sample.quadrupoleThirdDerivativeNorm,
        `${prefix}.quadrupoleThirdDerivativeNorm`,
      ),
    };
  });
}

function parseStrainSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("strainSamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `strainSamples[${index}]`;
    return {
      id: sample.id ?? `strain_${index + 1}`,
      hDotPlus: finiteNumber(sample.hDotPlus, `${prefix}.hDotPlus`),
      hDotCross: finiteNumber(sample.hDotCross, `${prefix}.hDotCross`),
      flux: finiteNumber(sample.flux, `${prefix}.flux`),
      distance: finiteNumber(sample.distance ?? 0, `${prefix}.distance`),
      sourcePower: sample.sourcePower === undefined ? null : finiteNumber(sample.sourcePower, `${prefix}.sourcePower`),
    };
  });
}

function parseRingdownSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("ringdownSamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `ringdownSamples[${index}]`;
    const finalMass = finiteNumber(sample.finalMass, `${prefix}.finalMass`);
    if (finalMass <= 0) {
      throw new Error(`${prefix}.finalMass must be positive.`);
    }
    return {
      id: sample.id ?? `ringdown_${index + 1}`,
      finalMass,
      frequencyCoefficient: finiteNumber(sample.frequencyCoefficient, `${prefix}.frequencyCoefficient`),
      dampingCoefficient: finiteNumber(sample.dampingCoefficient, `${prefix}.dampingCoefficient`),
      frequency: finiteNumber(sample.frequency, `${prefix}.frequency`),
      dampingTime: finiteNumber(sample.dampingTime, `${prefix}.dampingTime`),
    };
  });
}

function evaluateChirpMass(samples, tolerance) {
  const rows = samples.map((sample) => {
    const expected = Math.pow(sample.m1 * sample.m2, 3 / 5) / Math.pow(sample.m1 + sample.m2, 1 / 5);
    return {
      id: sample.id,
      observed: sample.chirpMass,
      expected,
      ...evaluatePassResidual(sample.chirpMass - expected, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluateChirpRate(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const chirpMass = Math.pow(sample.m1 * sample.m2, 3 / 5) / Math.pow(sample.m1 + sample.m2, 1 / 5);
    const expected =
      (96 / 5) *
      Math.pow(Math.PI, 8 / 3) *
      Math.pow((constants.G_eff * chirpMass) / Math.pow(constants.c_GW, 3), 5 / 3) *
      Math.pow(sample.f_GW, 11 / 3);
    return {
      id: sample.id,
      f_GW: sample.f_GW,
      observed: sample.frequencyDerivative,
      expected,
      ...evaluatePassResidual(sample.frequencyDerivative - expected, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluatePetersDecay(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    if (Math.abs(sample.eccentricity) > tolerance) {
      return {
        id: sample.id,
        eccentricity: sample.eccentricity,
        circularOnly: true,
        residual: sample.eccentricity,
        maxAbsResidual: Math.abs(sample.eccentricity),
        passed: false,
      };
    }
    const totalMass = sample.m1 + sample.m2;
    const expectedSemiMajorAxisDerivative =
      -((64 / 5) *
        Math.pow(constants.G_eff, 3) *
        sample.m1 *
        sample.m2 *
        totalMass) /
      (Math.pow(constants.c_GW, 5) * Math.pow(sample.separation, 3));
    const expectedOrbitalPeriodDerivative =
      (3 / 2) * (sample.orbitalPeriod / sample.separation) * expectedSemiMajorAxisDerivative;
    const residuals = [
      sample.semiMajorAxisDerivative - expectedSemiMajorAxisDerivative,
      sample.orbitalPeriodDerivative - expectedOrbitalPeriodDerivative,
    ];
    return {
      id: sample.id,
      expectedSemiMajorAxisDerivative,
      observedSemiMajorAxisDerivative: sample.semiMajorAxisDerivative,
      expectedOrbitalPeriodDerivative,
      observedOrbitalPeriodDerivative: sample.orbitalPeriodDerivative,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateQuadrupoleFlux(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const totalMass = sample.m1 + sample.m2;
    const reducedMass = (sample.m1 * sample.m2) / totalMass;
    const expectedCircularPower =
      ((32 / 5) *
        Math.pow(constants.G_eff, 4) *
        Math.pow(reducedMass, 2) *
        Math.pow(totalMass, 3)) /
      (Math.pow(constants.c_GW, 5) * Math.pow(sample.separation, 5));
    const expectedQuadrupolePower =
      (constants.G_eff / (5 * Math.pow(constants.c_GW, 5))) * sample.quadrupoleThirdDerivativeNorm;
    const residuals = [
      sample.radiatedPower - expectedCircularPower,
      sample.radiatedPower - expectedQuadrupolePower,
    ];
    return {
      id: sample.id,
      expectedCircularPower,
      expectedQuadrupolePower,
      observedRadiatedPower: sample.radiatedPower,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateStrainFlux(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const expectedFlux =
      (Math.pow(constants.c_GW, 3) / (32 * Math.PI * constants.G_eff)) *
      (Math.pow(sample.hDotPlus, 2) + Math.pow(sample.hDotCross, 2));
    const residuals = [sample.flux - expectedFlux];
    const luminosity =
      sample.sourcePower === null || sample.distance <= 0
        ? null
        : 4 * Math.PI * Math.pow(sample.distance, 2) * sample.flux;
    if (luminosity !== null) {
      residuals.push(luminosity - sample.sourcePower);
    }
    return {
      id: sample.id,
      expectedFlux,
      observedFlux: sample.flux,
      distance: sample.distance,
      sourcePower: sample.sourcePower,
      luminosity,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateRingdown(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const expectedFrequency =
      (sample.frequencyCoefficient * Math.pow(constants.c_GW, 3)) / (constants.G_eff * sample.finalMass);
    const expectedDampingTime =
      (sample.dampingCoefficient * constants.G_eff * sample.finalMass) / Math.pow(constants.c_GW, 3);
    const residuals = [sample.frequency - expectedFrequency, sample.dampingTime - expectedDampingTime];
    return {
      id: sample.id,
      expectedFrequency,
      observedFrequency: sample.frequency,
      expectedDampingTime,
      observedDampingTime: sample.dampingTime,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateEnergyAngularMomentumLedger(ledger, tolerance) {
  const initialEnergy = finiteNumber(ledger.initialEnergy, "energyAngularMomentumLedger.initialEnergy");
  const finalCompactEnergy = finiteNumber(
    ledger.finalCompactEnergy,
    "energyAngularMomentumLedger.finalCompactEnergy",
  );
  const radiatedEnergy = finiteNumber(ledger.radiatedEnergy, "energyAngularMomentumLedger.radiatedEnergy");
  const initialAngularMomentum = finiteNumber(
    ledger.initialAngularMomentum,
    "energyAngularMomentumLedger.initialAngularMomentum",
  );
  const finalAngularMomentum = finiteNumber(
    ledger.finalAngularMomentum,
    "energyAngularMomentumLedger.finalAngularMomentum",
  );
  const radiatedAngularMomentum = finiteNumber(
    ledger.radiatedAngularMomentum,
    "energyAngularMomentumLedger.radiatedAngularMomentum",
  );
  const residuals = [
    initialEnergy - finalCompactEnergy - radiatedEnergy,
    initialAngularMomentum - finalAngularMomentum - radiatedAngularMomentum,
  ];
  return {
    initialEnergy,
    finalCompactEnergy,
    radiatedEnergy,
    initialAngularMomentum,
    finalAngularMomentum,
    radiatedAngularMomentum,
    residuals,
    maxAbsResidual: maxAbs(residuals),
    passed: maxAbs(residuals) <= tolerance,
  };
}

function evaluateNoHiddenRetune(noHiddenRetune, tolerance) {
  const maxResidual = finiteNumber(
    noHiddenRetune.maxResidual ?? noHiddenRetune.residual,
    "noHiddenRetune.maxResidual",
  );
  const counts = {
    perSampleCarrierCount: finiteNumber(noHiddenRetune.perSampleCarrierCount ?? 1, "noHiddenRetune.perSampleCarrierCount"),
    perSampleMetricRecordCount: finiteNumber(
      noHiddenRetune.perSampleMetricRecordCount ?? 1,
      "noHiddenRetune.perSampleMetricRecordCount",
    ),
    perSampleRingdownLabelCount: finiteNumber(
      noHiddenRetune.perSampleRingdownLabelCount ?? 1,
      "noHiddenRetune.perSampleRingdownLabelCount",
    ),
    perFormulaFitHandleCount: finiteNumber(
      noHiddenRetune.perFormulaFitHandleCount ?? 0,
      "noHiddenRetune.perFormulaFitHandleCount",
    ),
  };
  const countViolations = Object.entries(counts)
    .filter(([key, value]) => (key === "perFormulaFitHandleCount" ? value !== 0 : value !== 1))
    .map(([key, value]) => ({ key, value }));
  return {
    sharedRecordId: noHiddenRetune.sharedRecordId ?? null,
    maxResidual,
    counts,
    countViolations,
    passed: Math.abs(maxResidual) <= tolerance && countViolations.length === 0,
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = finiteNumber(value, "scalarResidual");
  return {
    residual,
    passed: Math.abs(residual) <= tolerance,
  };
}

function summarizeRows(rows) {
  const maxAbsResidual = Math.max(...rows.map((row) => row.maxAbsResidual ?? Math.abs(row.residual ?? 0)));
  return {
    rows,
    maxAbsResidual,
    passed: rows.every((row) => row.passed),
  };
}

function evaluateNegativeControls(basePacket, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const packet = deepClone(basePacket);
    for (const mutation of control.mutations ?? []) {
      setByPath(packet, mutation.path, mutation.value);
    }
    const mutatedPacket = deepMerge(packet, control.overrides ?? {});
    const solver = evaluateGravitationalWaveSourceSolver(mutatedPacket, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(solver, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholePacketPassed: allSolverChecksPass(solver),
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual: check?.maxAbsResidual ?? check?.residual ?? check?.maxResidual ?? null,
    };
  });
}

function allSolverChecksPass(solver) {
  return (
    solver.chirpMass.passed &&
    solver.chirpRate.passed &&
    solver.petersDecay.passed &&
    solver.quadrupoleFlux.passed &&
    solver.strainFlux.passed &&
    solver.ringdown.passed &&
    solver.energyAngularMomentumLedger.passed &&
    solver.sourceProvenance.passed &&
    solver.noHiddenRetune.passed
  );
}

function firstSolverBlocker(solver, negativeControls) {
  if (!solver.chirpMass.passed) {
    return "chirp_mass_residual";
  }
  if (!solver.chirpRate.passed) {
    return "chirp_rate_residual";
  }
  if (!solver.petersDecay.passed) {
    return "peters_decay_residual";
  }
  if (!solver.quadrupoleFlux.passed) {
    return "quadrupole_flux_residual";
  }
  if (!solver.strainFlux.passed) {
    return "strain_flux_residual";
  }
  if (!solver.ringdown.passed) {
    return "ringdown_residual";
  }
  if (!solver.energyAngularMomentumLedger.passed) {
    return "energy_angular_momentum_ledger_residual";
  }
  if (!solver.sourceProvenance.passed) {
    return "source_provenance_residual";
  }
  if (!solver.noHiddenRetune.passed) {
    return "hidden_retune_witness";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  return failedControl ? `negative_control_${failedControl.id ?? "unknown"}` : null;
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowBindings = REQUIRED_ROWS.map((rowId) => ({
    rowId,
    carrierId: rows[rowId]?.carrierId ?? null,
    matches: rows[rowId]?.carrierId === commonCarrierId,
  }));
  const mismatches = rowBindings.filter((binding) => !binding.matches).map((binding) => binding.rowId);
  return {
    commonCarrierId: commonCarrierId ?? null,
    passed: Boolean(commonCarrierId) && mismatches.length === 0,
    mismatches,
    rowBindings,
  };
}

function evaluateAcceptedEvidence(row) {
  const status = normalizeStatus(row);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  const sourcePath = row?.sourcePath ?? row?.source;
  const source = evaluateSourcePath(sourcePath);
  if (!source.accepted) {
    return { accepted: false, reason: source.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function evaluateSourcePath(sourcePath) {
  if (typeof sourcePath !== "string" || sourcePath.trim() === "") {
    return { accepted: false, reason: "missing_source_path" };
  }
  if (sourcePath.includes("placeholder") || sourcePath.includes("pending")) {
    return { accepted: false, reason: "placeholder_source_path" };
  }
  if (sourcePath.startsWith("/tmp/") || sourcePath.startsWith("/private/tmp/")) {
    return { accepted: false, reason: "temp_source_path" };
  }
  if (sourcePath.includes("content/generated/")) {
    return { accepted: false, reason: "generated_source_path" };
  }
  const resolved = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  if (!resolved.startsWith(REPO_ROOT)) {
    return { accepted: false, reason: "source_outside_repo" };
  }
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_missing" };
  }
  if (!fs.statSync(resolved).isFile()) {
    return { accepted: false, reason: "source_not_file" };
  }
  return { accepted: true, reason: "accepted" };
}

function decideStatus({ carrier, missingRows, carrierBinding, solver, negativeControls }) {
  if (!carrier.accepted) {
    return "blocked_missing_accepted_gw_source_carrier";
  }
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!allSolverChecksPass(solver)) {
    return "blocked_residuals";
  }
  if (!negativeControls.every((control) => control.passed)) {
    return "blocked_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, carrier, missingRows, carrierBinding, solver, negativeControls }) {
  if (status === "populated") {
    return null;
  }
  if (!carrier.accepted) {
    return "missing_accepted_gw_source_carrier";
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return carrierBinding.commonCarrierId ? "carrier_split" : "missing_common_carrier";
  }
  return firstSolverBlocker(solver, negativeControls);
}

function normalizeStatus(row) {
  return String(row?.status ?? "missing").trim().toLowerCase();
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function evaluatePassResidual(residual, tolerance) {
  const finiteResidual = finiteNumber(residual, "residual");
  return {
    residual: finiteResidual,
    maxAbsResidual: Math.abs(finiteResidual),
    passed: Math.abs(finiteResidual) <= tolerance,
  };
}

function maxAbs(values) {
  return Math.max(...values.map((value) => Math.abs(finiteNumber(value, "residual"))));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override === undefined ? base : override;
  }
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in result ? deepMerge(result[key], value) : value;
  }
  return result;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function setByPath(object, dottedPath, value) {
  if (typeof dottedPath !== "string" || dottedPath.trim() === "") {
    throw new Error("Negative-control mutation path must be a nonempty string.");
  }
  const parts = dottedPath.split(".");
  let cursor = object;
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index];
    const key = arrayIndex(part);
    cursor = cursor[key];
    if (cursor === undefined) {
      throw new Error(`Negative-control mutation path does not exist: ${dottedPath}`);
    }
  }
  cursor[arrayIndex(parts[parts.length - 1])] = value;
}

function getByPath(object, dottedPath) {
  return dottedPath.split(".").reduce((cursor, key) => {
    if (cursor === undefined || cursor === null) {
      return undefined;
    }
    return cursor[arrayIndex(key)];
  }, object);
}

function arrayIndex(key) {
  return /^\d+$/.test(key) ? Number(key) : key;
}
