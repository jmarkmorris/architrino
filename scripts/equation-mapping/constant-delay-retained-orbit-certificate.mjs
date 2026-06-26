#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "constant-delay-retained-orbit-certificate-attempt.v1.json",
);
const INPUT_SCHEMA = "aaa-equation-map-constant-delay-retained-orbit-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-constant-delay-retained-orbit-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const TWO_PI = 2 * Math.PI;

const REQUIRED_ROWS = [
  "retained_orbit_reduction_row",
  "constant_delay_self_hit_model_row",
  "hopf_retained_orbit_birth_row",
  "first_lyapunov_coefficient_row",
  "monodromy_floquet_certificate",
  "poincare_section_reduction_row",
  "poincare_cartan_orbit_integral_row",
  "energy_clock_readout_row",
  "phase_loop_area_readout_row",
  "readout_refinement_independence_row",
  "parameter_sweep_action_invariance_row",
  "history_energy_throughput_row",
  "non_resonance_certificate",
  "geometry_derived_action_period_row",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  hopfResidual: 1e-10,
  transversality: 1e-6,
  stableRootMargin: 1e-6,
  firstLyapunov: 1e-6,
  monodromy: 1e-8,
  floquetGap: 1e-6,
  section: 1e-8,
  actionReadout: 1e-10,
  refinement: 1e-8,
  sweep: 1e-8,
  sweepMovingRange: 1e-3,
  historyThroughput: 1e-8,
  nonResonance: 1e-6,
  negativeControl: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateConstantDelayRetainedOrbit(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs [options]

Options:
  --input PATH          Constant-delay retained-orbit input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the certificate is populated.
  --help                Show this help.

This checker evaluates a score-neutral retained-orbit certificate for the
Planck-action row: constant-delay model discipline, Hopf crossing residuals,
first Lyapunov nondegeneracy, monodromy/Floquet gap, Poincare-Cartan action
readouts, refinement stability, parameter-sweep action invariance,
history-energy throughput, and small-divisor separation. Attempt rows and
negative-control failures never raise equation scores.`);
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

function evaluateConstantDelayRetainedOrbit(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const certificate = packet.certificate ?? packet.retainedOrbitCertificate ?? {};
  const retainedOrbit = evaluateCertificate(certificate, tolerances);
  const negativeControls = evaluateNegativeControls(
    certificate,
    packet.negativeControls ?? [],
    tolerances,
    packet.commonCarrierId ?? input.commonCarrierId,
  );
  const status = decideStatus({
    missingRows,
    carrierBinding,
    retainedOrbit,
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
    certificate: {
      id: input.certificateId ?? packet.id ?? certificate.id ?? null,
      rows: ["EQ-12A"],
      supportedRows: ["EQ-12", "EQ-22A", "EQ-26A", "EQ-28"],
      claimLevel:
        "score-neutral constant-delay retained-orbit scaffold and scalar falsifier; locked tri-binary evidence is required before score movement",
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
        retainedOrbit,
        negativeControls,
      }),
      commonCarrierPass: carrierBinding.passed,
      constantDelayModelPass: retainedOrbit.constantDelayModel.passed,
      hopfRetainedOrbitBirthPass: retainedOrbit.hopfBirth.passed,
      firstLyapunovCoefficientPass: retainedOrbit.firstLyapunovCoefficient.passed,
      monodromyFloquetPass: retainedOrbit.monodromyFloquet.passed,
      poincareSectionPass: retainedOrbit.poincareSection.passed,
      poincareCartanOrbitIntegralPass: retainedOrbit.poincareCartanOrbitIntegral.passed,
      actionReadoutPass: retainedOrbit.actionReadouts.passed,
      readoutRefinementIndependencePass: retainedOrbit.readoutRefinementIndependence.passed,
      parameterSweepActionInvariancePass: retainedOrbit.parameterSweepActionInvariance.passed,
      historyEnergyThroughputPass: retainedOrbit.historyEnergyThroughput.passed,
      nonResonancePass: retainedOrbit.nonResonance.passed,
      aggregateResidual: retainedOrbit.aggregateResidual,
      hMean: retainedOrbit.actionReadouts.meanH,
      hbarMean: retainedOrbit.actionReadouts.meanHbar,
      hopfResidual: retainedOrbit.hopfBirth.maxResidual,
      transversality: retainedOrbit.hopfBirth.transversality,
      floquetGap: retainedOrbit.monodromyFloquet.floquetGap,
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
    retainedOrbit,
    negativeControls,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    certificate: output.certificate,
    summary: output.summary,
    rowStatuses: Object.fromEntries(
      Object.entries(output.rows).map(([rowId, row]) => [rowId, { status: row.status, reason: row.reason }]),
    ),
  };
}

function parseTolerances(raw) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, defaultValue]) => [
      key,
      finiteNumber(raw[key], defaultValue),
    ]),
  );
}

function evaluateAcceptedRow(row) {
  if (!row) {
    return { accepted: false, reason: "missing_row" };
  }
  const status = normalizeStatus(row);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: `status_${status || "missing"}` };
  }
  const sourcePath = row.sourcePath ?? row.source;
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
  const resolved = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  if (!resolved.startsWith(REPO_ROOT)) {
    return { accepted: false, reason: "source_outside_repo" };
  }
  if (isNonDurableSourcePath(resolved)) {
    return { accepted: false, reason: "non_durable_source_path" };
  }
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_missing" };
  }
  if (!fs.statSync(resolved).isFile()) {
    return { accepted: false, reason: "source_not_file" };
  }
  if (!isEvidenceSourcePath(resolved)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  return { accepted: true, reason: "accepted" };
}

function isNonDurableSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  return (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    normalized.includes(`${path.sep}content${path.sep}generated${path.sep}`) ||
    path.basename(normalized).includes(".tmp")
  );
}

function isEvidenceSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const relative = path.relative(REPO_ROOT, normalized);
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  const lowerBasename = path.basename(normalized).toLowerCase();
  return !(
    lowerBasename.includes("attempt") ||
    lowerBasename.includes("mock") ||
    lowerBasename.includes("negative-control")
  );
}

function normalizeStatus(row) {
  return String(row?.status ?? "").trim().toLowerCase();
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowEntries = REQUIRED_ROWS.map((rowId) => ({
    rowId,
    carrierId: rows[rowId]?.carrierId ?? null,
  }));
  const missingCarrierRows = rowEntries
    .filter((entry) => !entry.carrierId)
    .map((entry) => entry.rowId);
  const mismatchedCarrierRows = rowEntries
    .filter((entry) => entry.carrierId && commonCarrierId && entry.carrierId !== commonCarrierId)
    .map((entry) => entry.rowId);

  return {
    passed: Boolean(commonCarrierId) && missingCarrierRows.length === 0 && mismatchedCarrierRows.length === 0,
    commonCarrierId: commonCarrierId ?? null,
    missingCarrierRows,
    mismatchedCarrierRows,
  };
}

function evaluateCertificate(certificate, tolerances) {
  const constantDelayModel = evaluateConstantDelayModel(certificate);
  const hopfBirth = evaluateHopfBirth(certificate, tolerances);
  const firstLyapunovCoefficient = evaluateFirstLyapunovCoefficient(certificate, tolerances);
  const monodromyFloquet = evaluateMonodromyFloquet(certificate, tolerances);
  const poincareSection = evaluatePoincareSection(certificate, tolerances);
  const poincareCartanOrbitIntegral = evaluatePoincareCartanOrbitIntegral(certificate);
  const actionReadouts = evaluateActionReadouts(certificate, tolerances);
  const readoutRefinementIndependence = evaluateReadoutRefinement(certificate, tolerances);
  const parameterSweepActionInvariance = evaluateParameterSweep(certificate, tolerances);
  const historyEnergyThroughput = evaluateHistoryEnergyThroughput(certificate, tolerances);
  const nonResonance = evaluateNonResonance(certificate, tolerances);
  const checks = [
    constantDelayModel,
    hopfBirth,
    firstLyapunovCoefficient,
    monodromyFloquet,
    poincareSection,
    poincareCartanOrbitIntegral,
    actionReadouts,
    readoutRefinementIndependence,
    parameterSweepActionInvariance,
    historyEnergyThroughput,
    nonResonance,
  ];

  return {
    passed: checks.every((check) => check.passed),
    aggregateResidual: maxFinite(checks.map((check) => check.residual ?? 0)),
    constantDelayModel,
    hopfBirth,
    firstLyapunovCoefficient,
    monodromyFloquet,
    poincareSection,
    poincareCartanOrbitIntegral,
    actionReadouts,
    readoutRefinementIndependence,
    parameterSweepActionInvariance,
    historyEnergyThroughput,
    nonResonance,
  };
}

function evaluateConstantDelayModel(certificate) {
  const model = certificate.model ?? {};
  const parameters = model.parameters ?? {};
  const requiredNumbers = ["omega", "gamma", "g", "tau", "mu", "hopfFrequency"];
  const missingNumbers = requiredNumbers.filter((key) => !Number.isFinite(parameters[key]));
  const passed =
    model.delayKind === "constant" &&
    model.stateDependentDelayDeferred === true &&
    missingNumbers.length === 0 &&
    parameters.tau > 0 &&
    parameters.hopfFrequency > 0;

  return {
    passed,
    residual: passed ? 0 : 1,
    delayKind: model.delayKind ?? null,
    stateDependentDelayDeferred: model.stateDependentDelayDeferred === true,
    missingNumbers,
    equationId: model.equationId ?? null,
  };
}

function evaluateHopfBirth(certificate, tolerances) {
  const parameters = certificate.model?.parameters ?? {};
  const hopf = certificate.hopfBirth ?? certificate.hopf ?? {};
  const omega = parameters.omega;
  const gamma = parameters.gamma;
  const g = parameters.g;
  const tau = parameters.tau;
  const frequency = parameters.hopfFrequency;
  const realResidual =
    Number.isFinite(omega) && Number.isFinite(g) && Number.isFinite(tau) && Number.isFinite(frequency)
      ? -frequency * frequency + omega * omega - g * Math.cos(frequency * tau)
      : Number.POSITIVE_INFINITY;
  const imaginaryResidual =
    Number.isFinite(gamma) && Number.isFinite(g) && Number.isFinite(tau) && Number.isFinite(frequency)
      ? gamma * frequency + g * Math.sin(frequency * tau)
      : Number.POSITIVE_INFINITY;
  const maxResidual = maxAbs([realResidual, imaginaryResidual]);
  const derivative = computeDelayEigenvalueTauDerivative({ omega, gamma, g, tau, frequency });
  const transversality = Math.abs(derivative.re);
  const stableRootMargin = finiteNumber(hopf.stableRootMargin, Number.NEGATIVE_INFINITY);
  const passed =
    maxResidual <= tolerances.hopfResidual &&
    hopf.simpleImaginaryCrossing === true &&
    transversality >= tolerances.transversality &&
    stableRootMargin >= tolerances.stableRootMargin &&
    hopf.otherRootsStable === true;

  return {
    passed,
    residual: maxResidual,
    realResidual,
    imaginaryResidual,
    maxResidual,
    derivative,
    transversality,
    stableRootMargin,
    simpleImaginaryCrossing: hopf.simpleImaginaryCrossing === true,
    otherRootsStable: hopf.otherRootsStable === true,
  };
}

function computeDelayEigenvalueTauDerivative({ gamma, g, tau, frequency }) {
  if (![gamma, g, tau, frequency].every(Number.isFinite)) {
    return { re: Number.NaN, im: Number.NaN };
  }

  const expNegLambdaTau = {
    re: Math.cos(frequency * tau),
    im: -Math.sin(frequency * tau),
  };
  const fLambda = addComplex(
    { re: gamma, im: 2 * frequency },
    scaleComplex(expNegLambdaTau, g * tau),
  );
  const fTau = mulComplex({ re: 0, im: frequency }, scaleComplex(expNegLambdaTau, g));
  return scaleComplex(divComplex(fTau, fLambda), -1);
}

function evaluateFirstLyapunovCoefficient(certificate, tolerances) {
  const normalForm = certificate.normalForm ?? {};
  const coefficient = normalForm.firstLyapunovCoefficient;
  const magnitude = Math.abs(finiteNumber(coefficient, Number.NaN));
  const passed =
    Number.isFinite(coefficient) &&
    magnitude >= tolerances.firstLyapunov &&
    normalForm.rejectsBautinDegeneracy === true;
  return {
    passed,
    residual: Number.isFinite(magnitude) ? Math.max(0, tolerances.firstLyapunov - magnitude) : 1,
    firstLyapunovCoefficient: Number.isFinite(coefficient) ? coefficient : null,
    magnitude,
    rejectsBautinDegeneracy: normalForm.rejectsBautinDegeneracy === true,
  };
}

function evaluateMonodromyFloquet(certificate, tolerances) {
  const monodromy = certificate.monodromyFloquet ?? {};
  const unitMultiplierResidual = finiteNumber(monodromy.unitMultiplierResidual, Number.POSITIVE_INFINITY);
  const maxNontrivialFloquetModulus = finiteNumber(
    monodromy.maxNontrivialFloquetModulus,
    Number.POSITIVE_INFINITY,
  );
  const maxAllowedNontrivialFloquetModulus = finiteNumber(
    monodromy.maxAllowedNontrivialFloquetModulus,
    1 - tolerances.floquetGap,
  );
  const floquetGap = finiteNumber(monodromy.floquetGap, 1 - maxNontrivialFloquetModulus);
  const extraNearUnitMultiplierCount = finiteNumber(monodromy.extraNearUnitMultiplierCount, Number.POSITIVE_INFINITY);
  const passed =
    unitMultiplierResidual <= tolerances.monodromy &&
    extraNearUnitMultiplierCount === 0 &&
    maxNontrivialFloquetModulus <= maxAllowedNontrivialFloquetModulus &&
    floquetGap >= tolerances.floquetGap;
  return {
    passed,
    residual: maxFinite([
      unitMultiplierResidual,
      Math.max(0, maxNontrivialFloquetModulus - maxAllowedNontrivialFloquetModulus),
      Math.max(0, tolerances.floquetGap - floquetGap),
      extraNearUnitMultiplierCount === 0 ? 0 : 1,
    ]),
    unitMultiplierResidual,
    extraNearUnitMultiplierCount,
    maxNontrivialFloquetModulus,
    maxAllowedNontrivialFloquetModulus,
    floquetGap,
  };
}

function evaluatePoincareSection(certificate, tolerances) {
  const section = certificate.poincareSection ?? {};
  const sectionTransversality = finiteNumber(section.sectionTransversality, Number.NEGATIVE_INFINITY);
  const minSectionTransversality = finiteNumber(section.minSectionTransversality, tolerances.section);
  const returnTimeResidual = finiteNumber(section.returnTimeResidual, Number.POSITIVE_INFINITY);
  const sectionRelocationDrift = finiteNumber(section.sectionRelocationDrift, Number.POSITIVE_INFINITY);
  const passed =
    sectionTransversality >= minSectionTransversality &&
    returnTimeResidual <= tolerances.section &&
    sectionRelocationDrift <= tolerances.section;
  return {
    passed,
    residual: maxFinite([
      Math.max(0, minSectionTransversality - sectionTransversality),
      returnTimeResidual,
      sectionRelocationDrift,
    ]),
    sectionTransversality,
    minSectionTransversality,
    returnTimeResidual,
    sectionRelocationDrift,
  };
}

function evaluatePoincareCartanOrbitIntegral(certificate) {
  const integral = certificate.poincareCartanOrbitIntegral ?? {};
  const actionIntegral = finiteNumber(integral.actionIntegral, Number.NaN);
  const cycleCount = finiteNumber(integral.cycleCount, Number.NaN);
  const passed = Number.isFinite(actionIntegral) && actionIntegral > 0 && Number.isFinite(cycleCount) && cycleCount > 0;
  return {
    passed,
    residual: passed ? 0 : 1,
    actionIntegral: Number.isFinite(actionIntegral) ? actionIntegral : null,
    cycleCount: Number.isFinite(cycleCount) ? cycleCount : null,
    oneForm: integral.oneForm ?? null,
  };
}

function evaluateActionReadouts(certificate, tolerances) {
  const readouts = certificate.actionReadouts ?? {};
  const hValues = [];

  if (Number.isFinite(readouts.energyClock?.energy) && Number.isFinite(readouts.energyClock?.frequency)) {
    hValues.push({
      id: "energy_clock",
      h: readouts.energyClock.energy / readouts.energyClock.frequency,
    });
  }

  if (Number.isFinite(readouts.phaseLoop?.actionIntegral)) {
    hValues.push({
      id: "phase_loop",
      h: readouts.phaseLoop.actionIntegral / finiteNumber(readouts.phaseLoop.cycleCount, 1),
    });
  }

  if (Number.isFinite(readouts.momentumWave?.momentum) && Number.isFinite(readouts.momentumWave?.waveNumber)) {
    hValues.push({
      id: "momentum_wave",
      h: (TWO_PI * readouts.momentumWave.momentum) / readouts.momentumWave.waveNumber,
    });
  }

  if (
    Number.isFinite(readouts.angularMomentum?.angularMomentum) &&
    Number.isFinite(readouts.angularMomentum?.quantumNumber)
  ) {
    hValues.push({
      id: "angular_momentum",
      h: (TWO_PI * readouts.angularMomentum.angularMomentum) / readouts.angularMomentum.quantumNumber,
    });
  }

  const meanH = mean(hValues.map((entry) => entry.h));
  const maxRelativeSpread = maxRelativeDeviation(
    hValues.map((entry) => entry.h),
    Math.abs(meanH) + tolerances.actionReadout,
  );
  const passed = hValues.length >= 4 && maxRelativeSpread <= tolerances.actionReadout;
  return {
    passed,
    residual: Number.isFinite(maxRelativeSpread) ? maxRelativeSpread : 1,
    values: hValues,
    meanH: Number.isFinite(meanH) ? meanH : null,
    meanHbar: Number.isFinite(meanH) ? meanH / TWO_PI : null,
    maxRelativeSpread,
  };
}

function evaluateReadoutRefinement(certificate, tolerances) {
  const refinement = certificate.readoutRefinement ?? {};
  const maxCollocationDrift = finiteNumber(refinement.maxCollocationDrift, Number.POSITIVE_INFINITY);
  const maxSectionRelocationDrift = finiteNumber(refinement.maxSectionRelocationDrift, Number.POSITIVE_INFINITY);
  const maxRetainedModeDrift = finiteNumber(refinement.maxRetainedModeDrift, Number.POSITIVE_INFINITY);
  const passed =
    maxCollocationDrift <= tolerances.refinement &&
    maxSectionRelocationDrift <= tolerances.refinement &&
    maxRetainedModeDrift <= tolerances.refinement;
  return {
    passed,
    residual: maxFinite([maxCollocationDrift, maxSectionRelocationDrift, maxRetainedModeDrift]),
    maxCollocationDrift,
    maxSectionRelocationDrift,
    maxRetainedModeDrift,
  };
}

function evaluateParameterSweep(certificate, tolerances) {
  const sweep = certificate.parameterSweep ?? {};
  const points = Array.isArray(sweep.points) ? sweep.points : [];
  const hValues = points.flatMap((point) => {
    const values = [];
    if (Number.isFinite(point.energy) && Number.isFinite(point.frequency)) {
      values.push(point.energy / point.frequency);
    }
    if (Number.isFinite(point.phaseAction)) {
      values.push(point.phaseAction);
    }
    return values;
  });
  const energyRange = relativeRange(points.map((point) => point.energy));
  const frequencyRange = relativeRange(points.map((point) => point.frequency));
  const phaseActionRange = relativeRange(points.map((point) => point.phaseAction));
  const meanH = mean(hValues);
  const maxActionVariation = maxRelativeDeviation(hValues, Math.abs(meanH) + tolerances.sweep);
  const passed =
    points.length >= 3 &&
    energyRange >= tolerances.sweepMovingRange &&
    frequencyRange >= tolerances.sweepMovingRange &&
    maxActionVariation <= tolerances.sweep &&
    finiteNumber(sweep.hiddenRetuneCount, Number.POSITIVE_INFINITY) === 0;

  return {
    passed,
    residual: Number.isFinite(maxActionVariation) ? maxActionVariation : 1,
    pointCount: points.length,
    energyRange,
    frequencyRange,
    phaseActionRange,
    maxActionVariation,
    hiddenRetuneCount: finiteNumber(sweep.hiddenRetuneCount, Number.POSITIVE_INFINITY),
  };
}

function evaluateHistoryEnergyThroughput(certificate, tolerances) {
  const history = certificate.historyEnergyThroughput ?? {};
  const historyEnergyReturnResidual = finiteNumber(history.historyEnergyReturnResidual, Number.POSITIVE_INFINITY);
  const fluxBalanceResidual = finiteNumber(history.fluxBalanceResidual, Number.POSITIVE_INFINITY);
  const passed =
    historyEnergyReturnResidual <= tolerances.historyThroughput &&
    fluxBalanceResidual <= tolerances.historyThroughput;
  return {
    passed,
    residual: maxFinite([historyEnergyReturnResidual, fluxBalanceResidual]),
    historyEnergyReturnResidual,
    fluxBalanceResidual,
  };
}

function evaluateNonResonance(certificate, tolerances) {
  const nonResonance = certificate.nonResonance ?? {};
  const minimumSmallDivisor = finiteNumber(nonResonance.minimumSmallDivisor, Number.NEGATIVE_INFINITY);
  const minimumAllowedSmallDivisor = finiteNumber(nonResonance.minimumAllowedSmallDivisor, tolerances.nonResonance);
  const passed = minimumSmallDivisor >= minimumAllowedSmallDivisor;
  return {
    passed,
    residual: Math.max(0, minimumAllowedSmallDivisor - minimumSmallDivisor),
    minimumSmallDivisor,
    minimumAllowedSmallDivisor,
    checkedDivisorCount: finiteNumber(nonResonance.checkedDivisorCount, 0),
  };
}

function evaluateNegativeControls(baseCertificate, controls, tolerances, commonCarrierId) {
  return controls.map((control) => {
    const certificate = mergeDeep(baseCertificate, control.certificateOverride ?? {});
    let rejected = false;
    let reason = "unknown_control_kind";

    if (control.kind === "state_dependent_delay_first_model") {
      const check = evaluateConstantDelayModel(certificate);
      rejected = !check.passed;
      reason = check.passed ? "state_dependent_delay_not_rejected" : "state_dependent_delay_rejected";
    } else if (control.kind === "hopf_detuned_crossing") {
      const check = evaluateHopfBirth(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "detuned_hopf_not_rejected" : "detuned_hopf_rejected";
    } else if (control.kind === "hopf_degeneracy_bautin") {
      const check = evaluateFirstLyapunovCoefficient(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "bautin_degeneracy_not_rejected" : "bautin_degeneracy_rejected";
    } else if (control.kind === "floquet_extra_neutral_multiplier") {
      const check = evaluateMonodromyFloquet(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "extra_neutral_multiplier_not_rejected" : "extra_neutral_multiplier_rejected";
    } else if (control.kind === "action_readout_projection_artifact") {
      const check = evaluateActionReadouts(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "readout_split_not_rejected" : "readout_split_rejected";
    } else if (control.kind === "parameter_sweep_fitted_action") {
      const check = evaluateParameterSweep(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "sweep_fit_not_rejected" : "sweep_fit_rejected";
    } else if (control.kind === "history_throughput_leak") {
      const check = evaluateHistoryEnergyThroughput(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "history_leak_not_rejected" : "history_leak_rejected";
    } else if (control.kind === "small_divisor_resonance") {
      const check = evaluateNonResonance(certificate, tolerances);
      rejected = !check.passed;
      reason = check.passed ? "resonance_not_rejected" : "resonance_rejected";
    } else if (control.kind === "carrier_split") {
      const rows = Object.fromEntries(
        REQUIRED_ROWS.map((rowId) => [
          rowId,
          {
            carrierId: rowId === control.splitRow ? `${commonCarrierId}_split` : commonCarrierId,
          },
        ]),
      );
      const check = evaluateCarrierBinding(rows, commonCarrierId);
      rejected = !check.passed;
      reason = check.passed ? "carrier_split_not_rejected" : "carrier_split_rejected";
    }

    return {
      id: control.id ?? control.kind ?? "unnamed_negative_control",
      kind: control.kind ?? null,
      passed: rejected,
      expected: "rejected",
      reason,
    };
  });
}

function decideStatus({ missingRows, carrierBinding, retainedOrbit, negativeControls }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_binding";
  }
  if (!retainedOrbit.passed) {
    return "blocked_retained_orbit_certificate";
  }
  if (negativeControls.some((control) => !control.passed)) {
    return "blocked_negative_control_failed";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, carrierBinding, retainedOrbit, negativeControls }) {
  if (status === "blocked_missing_rows") {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (status === "blocked_carrier_binding") {
    return carrierBinding.mismatchedCarrierRows.length > 0
      ? `carrier_split_${carrierBinding.mismatchedCarrierRows[0]}`
      : `missing_carrier_${carrierBinding.missingCarrierRows[0]}`;
  }
  if (status === "blocked_retained_orbit_certificate") {
    const failed = Object.entries(retainedOrbit)
      .filter(([, value]) => value && typeof value === "object" && value.passed === false)
      .map(([key]) => key);
    return failed[0] ?? "retained_orbit_certificate_failed";
  }
  if (status === "blocked_negative_control_failed") {
    return `negative_control_${negativeControls.find((control) => !control.passed)?.id ?? "failed"}`;
  }
  return null;
}

function finiteNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

function maxAbs(values) {
  const finiteValues = values.filter(Number.isFinite).map(Math.abs);
  return finiteValues.length > 0 ? Math.max(...finiteValues) : Number.POSITIVE_INFINITY;
}

function maxFinite(values) {
  const finiteValues = values.filter(Number.isFinite);
  return finiteValues.length > 0 ? Math.max(...finiteValues) : Number.POSITIVE_INFINITY;
}

function mean(values) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length === 0) {
    return Number.NaN;
  }
  return finiteValues.reduce((sum, value) => sum + value, 0) / finiteValues.length;
}

function maxRelativeDeviation(values, scale) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length === 0 || !Number.isFinite(scale) || scale <= 0) {
    return Number.POSITIVE_INFINITY;
  }
  const center = mean(finiteValues);
  return Math.max(...finiteValues.map((value) => Math.abs(value - center) / scale));
}

function relativeRange(values) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length < 2) {
    return 0;
  }
  const low = Math.min(...finiteValues);
  const high = Math.max(...finiteValues);
  const center = Math.abs(mean(finiteValues));
  return center > 0 ? (high - low) / center : 0;
}

function addComplex(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

function scaleComplex(a, scale) {
  return { re: a.re * scale, im: a.im * scale };
}

function mulComplex(a, b) {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

function divComplex(a, b) {
  const denominator = b.re * b.re + b.im * b.im;
  return {
    re: (a.re * b.re + a.im * b.im) / denominator,
    im: (a.im * b.re - a.re * b.im) / denominator,
  };
}

function mergeDeep(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }

  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = isPlainObject(value) ? mergeDeep(base[key] ?? {}, value) : value;
  }
  return merged;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
