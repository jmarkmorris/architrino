#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq22b-recombination-acoustic-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq22b-recombination-acoustic-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq22b-recombination-acoustic-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "recombination_acoustic_carrier",
  "theta_src",
  "theta_therm_prov",
  "theta_read",
  "theta_bb",
  "photon_channel",
  "neutrino_channel",
  "noether_sea_state",
  "recombination_kinetics_row",
  "thomson_visibility_row",
  "sound_horizon_row",
  "silk_damping_row",
  "acoustic_transfer_row",
  "event_ledger",
  "source_provenance",
  "no_hidden_retune_witness",
];

const SOURCE_FAMILIES = {
  recombination_acoustic_carrier: "EQ-22B carrier shell",
  theta_src: "shared observation source window",
  theta_therm_prov: "thermal/provenance ledger",
  theta_read: "effective readout clock/projection",
  theta_bb: "EQ-22A Planck/blackbody packet",
  photon_channel: "photon Gate A/B/C and action packet",
  neutrino_channel: "BBN/CMB neutrino handoff",
  noether_sea_state: "CMB Noether sea state/readout",
  recombination_kinetics_row: "Saha/Peebles recombination kinetics",
  thomson_visibility_row: "Thomson visibility row",
  sound_horizon_row: "CMB acoustic sound-horizon row",
  silk_damping_row: "CMB damping row",
  acoustic_transfer_row: "acoustic transfer/phase row",
  event_ledger: "finite-window event ledger",
  source_provenance: "source/provenance residual",
  no_hidden_retune_witness: "shared-record retune witness",
};

const DISALLOWED_SOURCE_KINDS = new Set([
  "attempt_fixture",
  "priority_packet",
  "source_shell",
  "generic_corpus_anchor",
]);

const GENERIC_SOURCE_PATHS = new Set([
  "content/markdown/aaa/cosmology/CMB.md",
  "reference/priorities/equation-mapping/eq-22b-recombination-acoustic-transfer.md",
  "reference/priorities/equation-mapping/eq-21-23-32-shared-observation-residual-packet.md",
  "scripts/equation-mapping/eq22b-recombination-acoustic-attempt.v1.json",
]);

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  saha: 1e-12,
  peebles: 1e-12,
  thomsonVisibility: 1e-12,
  soundHorizon: 1e-12,
  silkDamping: 1e-12,
  acousticTransfer: 1e-12,
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
const output = evaluateEq22bRecombinationAcoustic(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs [options]

Options:
  --input PATH          EQ-22B recombination/acoustic residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-22B recombination, visibility,
sound-horizon, Silk-damping, and acoustic-transfer attempt. Passing diagnostics
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

function evaluateEq22bRecombinationAcoustic(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const carrier = evaluateAcceptedEvidence(input.carrier ?? packet.carrier, "recombination_acoustic_carrier", inputPath);
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedEvidence(rows[rowId], rowId, inputPath)]),
  );
  const rowSourceAudit = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, auditRowSource(rowId, rows[rowId], rowChecks[rowId], inputPath)]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, input.commonCarrierId ?? packet.id);
  const solver = evaluateRecombinationAcousticSolver(packet, tolerances);
  const negativeControls = evaluateNegativeControls(packet, packet.negativeControls ?? [], tolerances);
  const status = decideStatus({ carrier, rowChecks, missingRows, carrierBinding, solver, negativeControls });
  const carrierSource = sourceReferenceDetails(
    input.carrier?.sourcePath ?? packet.carrier?.sourcePath ?? input.carrier?.source ?? null,
    inputPath,
  );

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
      row: "EQ-22B",
      solverTarget: "recombination_visibility_acoustic_transfer",
      supportedRows: ["EQ-21", "EQ-22", "EQ-22A", "EQ-23", "EQ-24", "EQ-25"],
      claimLevel:
        "score-neutral solver-style recombination/acoustic residual; accepted shared thermal/provenance/readout evidence is required before score movement",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      nextBlocker: firstBlocker({ status, carrier, rowChecks, missingRows, carrierBinding, solver, negativeControls }),
      solverNextBlocker: firstSolverBlocker(solver, negativeControls),
      carrierAccepted: carrier.accepted,
      carrierReason: carrier.reason,
      missingRows,
      sourceEvidenceFailureCount: sourceEvidenceFailureCount(carrier, rowChecks),
      sourceAudit: summarizeSourceAudit(rowSourceAudit),
      commonCarrierPass: carrierBinding.passed,
      solverResidualPass: allSolverChecksPass(solver),
      sahaPass: solver.saha.passed,
      peeblesPass: solver.peebles.passed,
      thomsonVisibilityPass: solver.thomsonVisibility.passed,
      soundHorizonPass: solver.soundHorizon.passed,
      silkDampingPass: solver.silkDamping.passed,
      acousticTransferPass: solver.acousticTransfer.passed,
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
      sourceKind: input.carrier?.sourceKind ?? packet.carrier?.sourceKind ?? null,
      sourceFamily: input.carrier?.sourceFamily ?? packet.carrier?.sourceFamily ?? null,
      sourceConcrete: carrierSource.concrete,
      sourceReferenceExists: carrierSource.exists,
      sourceReason: carrierSource.reason,
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
          sourceKind: rowSourceAudit[rowId].sourceKind,
          sourceFamily: rowSourceAudit[rowId].sourceFamily,
          sourceConcrete: rowSourceAudit[rowId].sourceConcrete,
          sourceReferenceExists: rowSourceAudit[rowId].sourceReferenceExists,
          sourceReason: rowSourceAudit[rowId].sourceReason,
          intendedSourceFamily: rowSourceAudit[rowId].intendedSourceFamily,
        },
      ]),
    ),
    rowSourceAudit,
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
      Object.entries(output.rows).map(([rowId, row]) => [
        rowId,
        {
          status: row.status,
          reason: row.reason,
          sourcePath: row.sourcePath,
          sourceReferenceExists: row.sourceReferenceExists,
          sourceReason: row.sourceReason,
          intendedSourceFamily: row.intendedSourceFamily,
        },
      ]),
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

function evaluateRecombinationAcousticSolver(packet, tolerances) {
  const constants = parseConstants(packet.constants ?? {});
  const recombinationSamples = parseRecombinationSamples(packet.recombinationSamples ?? []);
  const thomsonSamples = parseThomsonSamples(packet.thomsonSamples ?? []);
  const acousticSamples = parseAcousticSamples(packet.acousticSamples ?? []);
  return {
    constants,
    saha: evaluateSaha(recombinationSamples, constants, tolerances.saha),
    peebles: evaluatePeebles(recombinationSamples, tolerances.peebles),
    thomsonVisibility: evaluateThomsonVisibility(thomsonSamples, constants, tolerances.thomsonVisibility),
    soundHorizon: evaluateSoundHorizon(acousticSamples, constants, tolerances.soundHorizon),
    silkDamping: evaluateSilkDamping(acousticSamples, constants, thomsonSamples, tolerances.silkDamping),
    acousticTransfer: evaluateAcousticTransfer(acousticSamples, constants, tolerances.acousticTransfer),
    sourceProvenance: evaluateScalarResidual(
      packet.sourceProvenance?.maxResidual ?? packet.sourceProvenance?.residual,
      tolerances.sourceProvenance,
      "sourceProvenance",
    ),
    noHiddenRetune: evaluateNoHiddenRetune(packet.noHiddenRetune ?? {}, tolerances.retune),
  };
}

function parseConstants(constants) {
  const parsed = {
    hbar: positiveNumber(constants.hbar ?? 1, "constants.hbar"),
    m_e: positiveNumber(constants.m_e ?? 1, "constants.m_e"),
    k_B: positiveNumber(constants.k_B ?? 1, "constants.k_B"),
    chi_H: positiveNumber(constants.chi_H ?? 1, "constants.chi_H"),
    sigma_T: positiveNumber(constants.sigma_T ?? 1, "constants.sigma_T"),
    c_gamma: positiveNumber(constants.c_gamma ?? 1, "constants.c_gamma"),
  };
  return parsed;
}

function parseRecombinationSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("recombinationSamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `recombinationSamples[${index}]`;
    return {
      id: sample.id ?? `recombination_${index + 1}`,
      temperature: positiveNumber(sample.temperature, `${prefix}.temperature`),
      hydrogenDensity: positiveNumber(sample.hydrogenDensity, `${prefix}.hydrogenDensity`),
      x_e: finiteFraction(sample.x_e, `${prefix}.x_e`),
      C_rec: finiteNumber(sample.C_rec, `${prefix}.C_rec`),
      alpha_B: finiteNumber(sample.alpha_B, `${prefix}.alpha_B`),
      beta_B: finiteNumber(sample.beta_B, `${prefix}.beta_B`),
      dxedt: finiteNumber(sample.dxedt, `${prefix}.dxedt`),
    };
  });
}

function parseThomsonSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("thomsonSamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `thomsonSamples[${index}]`;
    return {
      id: sample.id ?? `thomson_${index + 1}`,
      x_e: finiteFraction(sample.x_e, `${prefix}.x_e`),
      hydrogenDensity: positiveNumber(sample.hydrogenDensity, `${prefix}.hydrogenDensity`),
      deltaTime: positiveNumber(sample.deltaTime, `${prefix}.deltaTime`),
      H_eff: positiveNumber(sample.H_eff, `${prefix}.H_eff`),
      opticalDepth: finiteNumber(sample.opticalDepth, `${prefix}.opticalDepth`),
      visibility: finiteNumber(sample.visibility, `${prefix}.visibility`),
    };
  });
}

function parseAcousticSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("acousticSamples must be a nonempty array.");
  }
  return samples.map((sample, index) => {
    const prefix = `acousticSamples[${index}]`;
    return {
      id: sample.id ?? `acoustic_${index + 1}`,
      baryonLoading: positiveNumber(sample.baryonLoading, `${prefix}.baryonLoading`),
      deltaTime: positiveNumber(sample.deltaTime, `${prefix}.deltaTime`),
      scaleFactor: positiveNumber(sample.scaleFactor, `${prefix}.scaleFactor`),
      soundHorizon: finiteNumber(sample.soundHorizon, `${prefix}.soundHorizon`),
      k_D: positiveNumber(sample.k_D, `${prefix}.k_D`),
      k: finiteNumber(sample.k, `${prefix}.k`),
      theta: finiteNumber(sample.theta, `${prefix}.theta`),
      drive: finiteNumber(sample.drive, `${prefix}.drive`),
      thetaSecondDerivative: finiteNumber(sample.thetaSecondDerivative, `${prefix}.thetaSecondDerivative`),
    };
  });
}

function evaluateSaha(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const lhs = Math.pow(sample.x_e, 2) / (1 - sample.x_e);
    const prefactor =
      Math.pow((constants.m_e * constants.k_B * sample.temperature) / (2 * Math.PI * Math.pow(constants.hbar, 2)), 1.5) *
      Math.exp(-constants.chi_H / (constants.k_B * sample.temperature));
    const rhs = prefactor / sample.hydrogenDensity;
    return {
      id: sample.id,
      lhs,
      rhs,
      ...passResidual(lhs - rhs, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluatePeebles(samples, tolerance) {
  const rows = samples.map((sample) => {
    const expected =
      -sample.C_rec * sample.alpha_B * sample.hydrogenDensity * Math.pow(sample.x_e, 2) +
      sample.C_rec * sample.beta_B * (1 - sample.x_e);
    return {
      id: sample.id,
      expected,
      observed: sample.dxedt,
      ...passResidual(sample.dxedt - expected, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluateThomsonVisibility(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const electronDensity = sample.x_e * sample.hydrogenDensity;
    const gammaT = electronDensity * constants.sigma_T * constants.c_gamma;
    const expectedOpticalDepth = gammaT * sample.deltaTime;
    const expectedVisibility = gammaT * Math.exp(-expectedOpticalDepth);
    const residuals = [
      sample.opticalDepth - expectedOpticalDepth,
      sample.visibility - expectedVisibility,
      gammaT - sample.H_eff,
    ];
    return {
      id: sample.id,
      electronDensity,
      Gamma_T: gammaT,
      H_eff: sample.H_eff,
      expectedOpticalDepth,
      observedOpticalDepth: sample.opticalDepth,
      expectedVisibility,
      observedVisibility: sample.visibility,
      residuals,
      maxAbsResidual: maxAbs(residuals),
      passed: maxAbs(residuals) <= tolerance,
    };
  });
  return summarizeRows(rows);
}

function evaluateSoundHorizon(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const soundSpeed = constants.c_gamma / Math.sqrt(3 * (1 + sample.baryonLoading));
    const expected = (soundSpeed * sample.deltaTime) / sample.scaleFactor;
    return {
      id: sample.id,
      soundSpeed,
      expected,
      observed: sample.soundHorizon,
      ...passResidual(sample.soundHorizon - expected, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluateSilkDamping(samples, constants, thomsonSamples, tolerance) {
  const rows = samples.map((sample, index) => {
    const thomson = thomsonSamples[Math.min(index, thomsonSamples.length - 1)];
    const electronDensity = thomson.x_e * thomson.hydrogenDensity;
    const gammaT = electronDensity * constants.sigma_T * constants.c_gamma;
    const numerator = Math.pow(sample.baryonLoading, 2) + (16 / 15) * (1 + sample.baryonLoading);
    const denominator = Math.pow(1 + sample.baryonLoading, 2);
    const inverseDampingScaleSquared =
      (Math.pow(constants.c_gamma, 2) / (6 * Math.pow(sample.scaleFactor, 2) * gammaT)) *
      (numerator / denominator) *
      sample.deltaTime;
    const expected = 1 / Math.sqrt(inverseDampingScaleSquared);
    return {
      id: sample.id,
      inverseDampingScaleSquared,
      expected,
      observed: sample.k_D,
      ...passResidual(sample.k_D - expected, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluateAcousticTransfer(samples, constants, tolerance) {
  const rows = samples.map((sample) => {
    const soundSpeed = constants.c_gamma / Math.sqrt(3 * (1 + sample.baryonLoading));
    const expected = -Math.pow(soundSpeed, 2) * Math.pow(sample.k, 2) * sample.theta + sample.drive;
    return {
      id: sample.id,
      expected,
      observed: sample.thetaSecondDerivative,
      ...passResidual(sample.thetaSecondDerivative - expected, tolerance),
    };
  });
  return summarizeRows(rows);
}

function evaluateNoHiddenRetune(noHiddenRetune, tolerance) {
  const maxResidual = finiteNumber(
    noHiddenRetune.maxResidual ?? noHiddenRetune.residual,
    "noHiddenRetune.maxResidual",
  );
  const counts = {
    perObservableCarrierCount: finiteNumber(
      noHiddenRetune.perObservableCarrierCount ?? 1,
      "noHiddenRetune.perObservableCarrierCount",
    ),
    perThermalReadoutRecordCount: finiteNumber(
      noHiddenRetune.perThermalReadoutRecordCount ?? 1,
      "noHiddenRetune.perThermalReadoutRecordCount",
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

function evaluateScalarResidual(value, tolerance, label) {
  const residual = finiteNumber(value, `${label}.residual`);
  return {
    residual,
    passed: Math.abs(residual) <= tolerance,
  };
}

function evaluateNegativeControls(basePacket, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const packet = deepClone(basePacket);
    for (const mutation of control.mutations ?? []) {
      setByPath(packet, mutation.path, mutation.value);
    }
    const mutatedPacket = deepMerge(packet, control.overrides ?? {});
    const solver = evaluateRecombinationAcousticSolver(mutatedPacket, tolerances);
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
    solver.saha.passed &&
    solver.peebles.passed &&
    solver.thomsonVisibility.passed &&
    solver.soundHorizon.passed &&
    solver.silkDamping.passed &&
    solver.acousticTransfer.passed &&
    solver.sourceProvenance.passed &&
    solver.noHiddenRetune.passed
  );
}

function firstSolverBlocker(solver, negativeControls) {
  if (!solver.saha.passed) {
    return "saha_recombination_residual";
  }
  if (!solver.peebles.passed) {
    return "peebles_recombination_residual";
  }
  if (!solver.thomsonVisibility.passed) {
    return "thomson_visibility_residual";
  }
  if (!solver.soundHorizon.passed) {
    return "sound_horizon_residual";
  }
  if (!solver.silkDamping.passed) {
    return "silk_damping_residual";
  }
  if (!solver.acousticTransfer.passed) {
    return "acoustic_transfer_residual";
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

function summarizeRows(rows) {
  const maxAbsResidual = Math.max(...rows.map((row) => row.maxAbsResidual ?? Math.abs(row.residual ?? 0)));
  return {
    rows,
    maxAbsResidual,
    passed: rows.every((row) => row.passed),
  };
}

function passResidual(residual, tolerance) {
  const finiteResidual = finiteNumber(residual, "residual");
  return {
    residual: finiteResidual,
    maxAbsResidual: Math.abs(finiteResidual),
    passed: Math.abs(finiteResidual) <= tolerance,
  };
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

function evaluateAcceptedEvidence(row, rowId, inputPath) {
  const status = normalizeStatus(row);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!hasConcreteIdentity(row)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourceContract = evaluateSourceContract(row, rowId);
  if (!sourceContract.accepted) {
    return { accepted: false, reason: sourceContract.reason };
  }
  const sourcePath = row?.sourcePath ?? row?.source;
  const source = evaluateSourcePath(sourcePath, inputPath);
  if (!source.accepted) {
    return { accepted: false, reason: source.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function evaluateSourcePath(sourcePath, inputPath) {
  const source = sourceReferenceDetails(sourcePath, inputPath);
  return { accepted: source.accepted, reason: source.reason };
}

function evaluateSourceContract(row, rowId) {
  const sourceKind = stringOrNull(row?.sourceKind);
  if (sourceKind && DISALLOWED_SOURCE_KINDS.has(sourceKind)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  const expectedFamily = SOURCE_FAMILIES[rowId] ?? null;
  if (expectedFamily) {
    const sourceFamily = stringOrNull(row?.sourceFamily);
    if (!sourceFamily) {
      return { accepted: false, reason: "source_family_missing" };
    }
    if (sourceFamily !== expectedFamily) {
      return { accepted: false, reason: "source_family_mismatch" };
    }
  }
  return { accepted: true, reason: "accepted" };
}

function sourceReferenceDetails(sourcePath, inputPath = null) {
  if (typeof sourcePath !== "string" || sourcePath.trim() === "") {
    return { accepted: false, reason: "missing_source_path", concrete: false, exists: false, resolvedPath: null };
  }
  if (sourcePath.includes("placeholder") || sourcePath.includes("pending")) {
    return { accepted: false, reason: "placeholder_source_path", concrete: false, exists: false, resolvedPath: null };
  }
  if (sourcePath.startsWith("/tmp/") || sourcePath.startsWith("/private/tmp/")) {
    return { accepted: false, reason: "temp_source_path", concrete: false, exists: false, resolvedPath: null };
  }
  if (sourcePath.includes("content/generated/")) {
    return { accepted: false, reason: "generated_source_path", concrete: false, exists: false, resolvedPath: null };
  }
  const resolved = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  const relative = path.relative(REPO_ROOT, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return { accepted: false, reason: "source_outside_repo", concrete: false, exists: false, resolvedPath: resolved };
  }
  const relativeSourcePath = normalizeRepoRelativePath(resolved);
  const relativeInputPath = inputPath ? normalizeRepoRelativePath(inputPath) : null;
  if (relativeInputPath && relativeSourcePath === relativeInputPath) {
    return { accepted: false, reason: "self_referential_source", concrete: true, exists: true, resolvedPath: resolved };
  }
  if (GENERIC_SOURCE_PATHS.has(relativeSourcePath)) {
    return { accepted: false, reason: "accepted_without_evidence_source", concrete: true, exists: true, resolvedPath: resolved };
  }
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_missing", concrete: true, exists: false, resolvedPath: resolved };
  }
  if (!fs.statSync(resolved).isFile()) {
    return { accepted: false, reason: "source_not_file", concrete: true, exists: true, resolvedPath: resolved };
  }
  if (!isEvidenceSourcePath(resolved)) {
    return { accepted: false, reason: "accepted_without_evidence_source", concrete: true, exists: true, resolvedPath: resolved };
  }
  return { accepted: true, reason: "accepted", concrete: true, exists: true, resolvedPath: resolved };
}

function isEvidenceSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const relative = path.relative(REPO_ROOT, normalized);
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return false;
  }
  const basename = path.basename(normalized).toLowerCase();
  return (
    !basename.includes("attempt") &&
    !basename.includes("toy") &&
    !basename.includes("source-evidence-probe") &&
    !basename.includes("probe") &&
    !basename.includes("mock") &&
    !basename.includes("negative-control") &&
    !basename.includes(".tmp")
  );
}

function auditRowSource(rowId, row, evidence, inputPath) {
  const sourcePath = row?.sourcePath ?? row?.source ?? null;
  const source = sourceReferenceDetails(sourcePath, inputPath);
  return {
    rowId,
    status: normalizeStatus(row),
    accepted: evidence.accepted,
    reason: evidence.reason,
    carrierId: row?.carrierId ?? null,
    sourcePath,
    sourceKind: row?.sourceKind ?? null,
    sourceFamily: row?.sourceFamily ?? null,
    sourceConcrete: source.concrete,
    sourceReferenceExists: source.exists,
    sourceReason: source.reason,
    intendedSourceFamily: SOURCE_FAMILIES[rowId] ?? null,
  };
}

function summarizeSourceAudit(rowSourceAudit) {
  const rows = Object.values(rowSourceAudit);
  return {
    nonConcreteSourceRows: rows.filter((row) => !row.sourceConcrete).map((row) => row.rowId),
    missingSourceRows: rows.filter((row) => row.sourceConcrete && !row.sourceReferenceExists).map((row) => row.rowId),
    rejectedSourceContractRows: rows
      .filter((row) =>
        [
          "row_identity_not_concrete",
          "source_family_missing",
          "source_family_mismatch",
          "self_referential_source",
          "accepted_without_evidence_source",
        ].includes(row.reason),
      )
      .map((row) => row.rowId),
    selfReferentialSourceRows: rows.filter((row) => row.sourceReason === "self_referential_source").map((row) => row.rowId),
    nonEvidenceSourceRows: rows
      .filter((row) => row.sourceReason === "accepted_without_evidence_source")
      .map((row) => row.rowId),
    firstMissingSourceRow: rows.find((row) => row.sourceConcrete && !row.sourceReferenceExists)?.rowId ?? null,
    sourceBackedRowCount: rows.filter((row) => row.sourceReferenceExists).length,
    requiredRowCount: rows.length,
  };
}

function sourceEvidenceFailureCount(carrier, rowChecks) {
  const carrierFailure = isSourceEvidenceFailureReason(carrier.reason) ? 1 : 0;
  const rowFailures = Object.values(rowChecks).filter(
    (check) => isSourceEvidenceFailureReason(check.reason),
  ).length;
  return carrierFailure + rowFailures;
}

function isSourceEvidenceFailureReason(reason) {
  return reason === "accepted_without_evidence_source" || reason === "self_referential_source";
}

function hasNonSourceEvidenceMissingRows(missingRows, rowChecks) {
  return missingRows.some(
    (rowId) => !isSourceEvidenceFailureReason(rowChecks[rowId]?.reason),
  );
}

function decideStatus({ carrier, rowChecks, missingRows, carrierBinding, solver, negativeControls }) {
  if (!carrier.accepted) {
    if (isSourceEvidenceFailureReason(carrier.reason)) {
      return "blocked_source_evidence";
    }
    return "blocked_missing_accepted_recombination_acoustic_carrier";
  }
  if (missingRows.length > 0 && hasNonSourceEvidenceMissingRows(missingRows, rowChecks)) {
    return "blocked_missing_rows";
  }
  if (missingRows.length > 0) {
    return "blocked_source_evidence";
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

function firstBlocker({ status, carrier, rowChecks, missingRows, carrierBinding, solver, negativeControls }) {
  if (status === "populated") {
    return null;
  }
  if (status === "blocked_source_evidence") {
    return "accepted_without_evidence_source";
  }
  if (!carrier.accepted) {
    return "missing_accepted_recombination_acoustic_carrier";
  }
  if (missingRows.length > 0) {
    if (rowChecks[missingRows[0]]?.reason === "accepted_without_evidence_source") {
      return "accepted_without_evidence_source";
    }
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

function hasConcreteIdentity(row) {
  const id = stringOrNull(row?.rowId) ?? stringOrNull(row?.id);
  if (!id) {
    return false;
  }
  const lowerId = id.toLowerCase();
  return (
    !lowerId.includes("attempt") &&
    !lowerId.includes("pending") &&
    !lowerId.includes("placeholder")
  );
}

function stringOrNull(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

function normalizeRepoRelativePath(filePath) {
  return path.relative(REPO_ROOT, path.resolve(filePath)).split(path.sep).join("/");
}

function finiteFraction(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0 || number >= 1) {
    throw new Error(`${label} must be between 0 and 1.`);
  }
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
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
    const key = arrayIndex(parts[index]);
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
