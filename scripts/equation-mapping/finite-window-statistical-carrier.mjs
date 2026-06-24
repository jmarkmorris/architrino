#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-equation-map-finite-window-statistical-carrier-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-finite-window-statistical-carrier-check/v1";
const DEFAULT_TOLERANCES = {
  massClosure: 1e-12,
  invariance: 1e-3,
  retune: 1e-12,
  nullSeparatrix: 1e-3,
  refinement: 1e-3,
  detectorRefinement: 1e-3,
  crossSection: 1e-3,
  formFactorCovariance: 1e-3,
  regimePurity: 1e-3,
};
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const DEFAULT_INPUT = {
  schema: INPUT_SCHEMA,
  claimLevel:
    "toy finite-window statistical carrier; structure-faithful, not retained evidence",
  constants: {
    hbar: 1,
  },
  tolerances: DEFAULT_TOLERANCES,
  carrier: {
    id: "eq31_two_corridor_toy",
    row: "EQ-31",
    retainedStatus: "toy",
    window: {
      id: "W_eq31_toy",
      kind: "toy_metastable_window",
      retainedStatus: "toy",
    },
    duration: 10,
    transitionMap: {
      id: "Phi_T_eq31_toy",
      retainedStatus: "toy",
    },
    finiteMeasure: {
      id: "mu_star_T_eq31_toy",
      totalMass: 1,
      invarianceResidual: 0.02,
      retainedStatus: "toy",
    },
    coarseGraining: {
      id: "Q_eq31_toy",
      retainedStatus: "toy",
    },
    detectorKernel: {
      id: "K_det_eq31_toy",
      retainedStatus: "toy",
    },
    outcomePartition: {
      id: "B_eq31_toy",
      retainedStatus: "toy",
      classes: ["stable_remnant", "corridor_alpha", "corridor_beta"],
    },
    corridorSemantics: {
      mode: "first_exit",
      basinId: "B_star_eq31_toy",
      boundaryId: "partial_B_star_eq31_toy",
      detectorKernelStage: "post_escape_pushforward",
    },
    exitCorridors: [
      {
        id: "C_alpha",
        boundaryComponentId: "partial_B_star_alpha",
        measureStage: "pre_detector_escape",
        measure: 0.03,
        retainedStatus: "toy",
        ledgerStatus: "toy",
      },
      {
        id: "C_beta",
        boundaryComponentId: "partial_B_star_beta",
        measureStage: "pre_detector_escape",
        measure: 0.01,
        retainedStatus: "toy",
        ledgerStatus: "toy",
      },
    ],
    nullSeparatrix: {
      epsilon: 0.01,
      neighborhoodMass: 0.002,
      tolerance: 0.001,
      retainedStatus: "toy",
    },
    refinementCompatibility: {
      parentWindowId: "W_eq31_parent_toy",
      childWindowId: "W_eq31_toy",
      cocycleDefect: 0.02,
      tolerance: 0.001,
      retainedStatus: "toy",
    },
    noHiddenRetuneWitness: {
      id: "S_retune_eq31_toy",
      residual: 0,
      retainedStatus: "toy",
    },
  },
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const input = args.input ? readJson(path.resolve(args.input)) : DEFAULT_INPUT;
const output = evaluateCarrier(input, args);
writeOutput(output, args);

if (args.requireAccepted && output.summary.status !== "accepted_retained_statistical_carrier") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
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
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
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
  console.log(`Usage: node scripts/equation-mapping/finite-window-statistical-carrier.mjs [options]

Options:
  --input PATH            Optional finite-window statistical carrier JSON.
  --out PATH              Write JSON output to PATH.
  --summary               Emit compact summary JSON.
  --pretty                Pretty-print JSON output.
  --require-accepted      Exit nonzero unless all retained carrier rows are accepted.
  --help                  Show this help.

This checker evaluates the score-neutral finite-window statistical carrier
used by EQ-14, EQ-25, EQ-30, and EQ-31. For EQ-31 it computes escape rates,
comparison width, lifetime, and branching fractions from one corridor measure.
Toy, scaffold, attempt, or missing retained rows never raise equation scores.`);
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

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    carrier: output.carrier,
    summary: output.summary,
    eq30: output.eq30,
    eq31: output.eq31,
    missingAcceptedRows: output.retainedAcceptance.missingAcceptedRows,
    rowStatuses: output.retainedAcceptance.rowStatuses,
    rowReasons: output.retainedAcceptance.rowReasons,
    eq30Acceptance: output.eq30Acceptance,
    corridorDiagnostics: output.corridorDiagnostics,
  };
}

function evaluateCarrier(input) {
  const carrier = input.carrier ?? {};
  const constants = parseConstants(input.constants ?? {});
  const tolerances = parseTolerances(input.tolerances ?? {});
  const duration = positiveNumber(carrier.duration, "carrier.duration");
  const measure = carrier.finiteMeasure ?? {};
  const totalMass = positiveNumber(measure.totalMass, "carrier.finiteMeasure.totalMass");
  const corridors = parseCorridors(carrier.exitCorridors ?? [], duration, constants);
  const retainedAcceptance = evaluateRetainedAcceptance(carrier, tolerances);
  const massRows = computeMassRows(corridors, totalMass, tolerances);
  const eq30 = computeEq30Rows(carrier, duration, tolerances);
  const eq30Acceptance = evaluateEq30Acceptance(carrier);
  const eq31 = computeEq31Rows(corridors, constants);
  const corridorDiagnostics = evaluateCorridorDiagnostics(carrier, tolerances);
  const status = decideStatus(
    retainedAcceptance,
    massRows,
    carrier,
    corridorDiagnostics,
    eq30,
    eq30Acceptance,
  );

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    carrier: {
      id: carrier.id ?? null,
      row: carrier.row ?? null,
      retainedStatus: carrier.retainedStatus ?? null,
      claimLevel:
        "score-neutral carrier evaluator; accepted row statuses are required before score movement",
    },
    constants,
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      acceptedCarrierRows: retainedAcceptance.accepted,
      massClosurePassed: massRows.massClosurePassed,
      hiddenRetunePassed: retainedAcceptance.hiddenRetunePassed,
      eq30RowsComputed: eq30.computed,
      eq30RowsAccepted: eq30Acceptance.accepted,
      eq30PreparedFluxPassed: eq30.preparedFluxPass,
      eq30DetectorRefinementPassed: eq30.detectorRefinementPass,
      eq30CrossSectionPassed: eq30.crossSectionPass,
      eq30FormFactorCovariancePassed: eq30.formFactorCovariancePass,
      eq30RegimePurityPassed: eq30.regimePurityPass,
      eq31RowsComputed: eq31.computed,
      corridorCount: corridors.length,
      firstExitCorridorsDeclared:
        corridorDiagnostics.firstExitCorridorsDeclared,
      nullSeparatrixPassed: corridorDiagnostics.nullSeparatrixPassed,
      refinementCompatibilityPassed:
        corridorDiagnostics.refinementCompatibilityPassed,
      nextBlocker: firstBlocker({
        retainedAcceptance,
        massRows,
        carrier,
        eq30,
        eq30Acceptance,
        eq31,
        corridorDiagnostics,
      }),
    },
    finiteWindowCarrier: {
      window: summarizeRow(carrier.window),
      duration,
      transitionMap: summarizeRow(carrier.transitionMap),
      finiteMeasure: summarizeRow(carrier.finiteMeasure, ["totalMass", "invarianceResidual"]),
      coarseGraining: summarizeRow(carrier.coarseGraining),
      detectorKernel: summarizeRow(carrier.detectorKernel),
      outcomePartition: summarizeRow(carrier.outcomePartition, ["classes"]),
      corridorSemantics: summarizeRow(carrier.corridorSemantics, [
        "mode",
        "basinId",
        "boundaryId",
        "detectorKernelStage",
      ]),
      nullSeparatrix: summarizeRow(carrier.nullSeparatrix, [
        "epsilon",
        "neighborhoodMass",
        "tolerance",
      ]),
      refinementCompatibility: summarizeRow(
        carrier.refinementCompatibility,
        ["cocycleDefect", "tolerance"],
      ),
      noHiddenRetuneWitness: summarizeRow(carrier.noHiddenRetuneWitness, ["residual"]),
      preparedEnsemble: summarizeRow(carrier.preparedEnsemble),
      fluxCalibration: summarizeRow(carrier.fluxCalibration, ["incomingFlux"]),
      exposureDistribution: summarizeRow(
        carrier.exposureDistribution,
        ["measurePreservingQuotient"],
      ),
      regime: summarizeRow(carrier.regime, ["elasticClassId", "inelasticLeakage"]),
    },
    retainedAcceptance,
    eq30Acceptance,
    massRows,
    corridorDiagnostics,
    eq30,
    eq31,
  };
}

function parseConstants(raw) {
  return {
    hbar: positiveNumber(raw.hbar ?? 1, "constants.hbar"),
  };
}

function parseTolerances(raw) {
  return {
    massClosure: positiveNumber(
      raw.massClosure ?? DEFAULT_TOLERANCES.massClosure,
      "tolerances.massClosure",
    ),
    invariance: positiveNumber(
      raw.invariance ?? DEFAULT_TOLERANCES.invariance,
      "tolerances.invariance",
    ),
    retune: positiveNumber(raw.retune ?? DEFAULT_TOLERANCES.retune, "tolerances.retune"),
    nullSeparatrix: positiveNumber(
      raw.nullSeparatrix ?? DEFAULT_TOLERANCES.nullSeparatrix,
      "tolerances.nullSeparatrix",
    ),
    refinement: positiveNumber(
      raw.refinement ?? DEFAULT_TOLERANCES.refinement,
      "tolerances.refinement",
    ),
    detectorRefinement: positiveNumber(
      raw.detectorRefinement ?? DEFAULT_TOLERANCES.detectorRefinement,
      "tolerances.detectorRefinement",
    ),
    crossSection: positiveNumber(
      raw.crossSection ?? DEFAULT_TOLERANCES.crossSection,
      "tolerances.crossSection",
    ),
    formFactorCovariance: positiveNumber(
      raw.formFactorCovariance ?? DEFAULT_TOLERANCES.formFactorCovariance,
      "tolerances.formFactorCovariance",
    ),
    regimePurity: positiveNumber(
      raw.regimePurity ?? DEFAULT_TOLERANCES.regimePurity,
      "tolerances.regimePurity",
    ),
  };
}

function parseCorridors(rawCorridors, duration, constants) {
  if (!Array.isArray(rawCorridors) || rawCorridors.length === 0) {
    return [];
  }
  return rawCorridors.map((corridor, index) => {
    const measure = nonnegativeNumber(
      corridor.measure,
      `carrier.exitCorridors[${index}].measure`,
    );
    const gamma = measure / duration;
    return {
      id: corridor.id ?? `corridor_${index}`,
      boundaryComponentId: corridor.boundaryComponentId ?? null,
      measureStage: corridor.measureStage ?? null,
      measure,
      gamma,
      widthContribution: constants.hbar * gamma,
      retainedStatus: corridor.retainedStatus ?? null,
      ledgerStatus: corridor.ledgerStatus ?? null,
    };
  });
}

function computeMassRows(corridors, totalMass, tolerances) {
  const escapeMass = corridors.reduce((sum, corridor) => sum + corridor.measure, 0);
  const nonEscapeMass = totalMass - escapeMass;
  const massClosureResidual = Math.max(0, -nonEscapeMass);
  return {
    totalMass,
    escapeMass,
    nonEscapeMass,
    massClosureResidual,
    massClosurePassed: massClosureResidual <= tolerances.massClosure,
  };
}

function computeEq31Rows(corridors, constants) {
  const gammaTotal = corridors.reduce((sum, corridor) => sum + corridor.gamma, 0);
  const computed = corridors.length > 0 && gammaTotal > 0;
  const branchingFractions = computed
    ? corridors.map((corridor) => ({
        id: corridor.id,
        gamma: corridor.gamma,
        branchingFraction: corridor.gamma / gammaTotal,
      }))
    : [];
  return {
    computed,
    gammaRows: corridors.map((corridor) => ({
      id: corridor.id,
      gamma: corridor.gamma,
      widthContribution: corridor.widthContribution,
    })),
    gammaTotal,
    GammaCmp: constants.hbar * gammaTotal,
    tauCmp: computed ? 1 / gammaTotal : null,
    branchingFractions,
  };
}

function computeEq30Rows(carrier, duration, tolerances) {
  const fluxCalibration = carrier.fluxCalibration ?? {};
  const incomingFlux = finiteNumberOrNull(fluxCalibration.incomingFlux);
  const preparedEnsemble = carrier.preparedEnsemble ?? {};
  const detectedClassMeasures = parseDetectedClassMeasures(
    carrier.detectedClassMeasures ?? [],
    tolerances,
  );
  const classMeasureById = new Map(
    detectedClassMeasures.map((row) => [row.classId, row.measure]),
  );
  const crossSectionComparisons = parseCrossSectionComparisons({
    rawComparisons: carrier.crossSectionComparisons ?? [],
    classMeasureById,
    incomingFlux,
    duration,
    tolerances,
  });
  const formFactorSamples = parseFormFactorSamples(
    carrier.formFactorSamples ?? [],
    tolerances,
  );
  const exposureDistribution = carrier.exposureDistribution ?? {};
  const regime = carrier.regime ?? {};
  const regimePurityResidual = finiteNumberOrNull(
    regime.inelasticLeakage ?? regime.regimePurityResidual ?? regime.residual,
  );
  const totalDetectedMass = detectedClassMeasures.reduce(
    (sum, row) => sum + row.measure,
    0,
  );
  const preparedFluxPass =
    concreteString(preparedEnsemble.id) &&
    incomingFlux !== null &&
    incomingFlux > 0;
  const detectorRefinementPass =
    detectedClassMeasures.length > 0 &&
    detectedClassMeasures.every((row) => row.detectorRefinementPass);
  const crossSectionPass =
    crossSectionComparisons.length > 0 &&
    crossSectionComparisons.every((row) => row.crossSectionPass);
  const formFactorCovariancePass =
    exposureDistribution.measurePreservingQuotient === true &&
    formFactorSamples.length > 0 &&
    formFactorSamples.every((row) => row.formFactorCovariancePass);
  const regimePurityPass =
    regimePurityResidual !== null &&
    regimePurityResidual <= tolerances.regimePurity;

  return {
    computed:
      preparedFluxPass &&
      detectedClassMeasures.length > 0 &&
      crossSectionComparisons.length > 0 &&
      formFactorSamples.length > 0,
    preparedEnsembleId: preparedEnsemble.id ?? null,
    incomingFlux,
    duration,
    preparedFluxPass,
    detectedClassMeasures,
    totalDetectedMass,
    detectorRefinementPass,
    crossSectionComparisons,
    crossSectionPass,
    exposureDistribution: {
      id: exposureDistribution.id ?? null,
      measurePreservingQuotient:
        exposureDistribution.measurePreservingQuotient ?? null,
    },
    formFactorSamples,
    formFactorCovariancePass,
    regime: {
      id: regime.id ?? null,
      elasticClassId: regime.elasticClassId ?? null,
      inelasticLeakage: regimePurityResidual,
      tolerance: tolerances.regimePurity,
      regimePurityPass,
    },
    regimePurityPass,
  };
}

function parseDetectedClassMeasures(rawRows, tolerances) {
  if (!Array.isArray(rawRows)) {
    return [];
  }
  return rawRows.map((row, index) => {
    const measure = nonnegativeNumber(
      row.measure,
      `carrier.detectedClassMeasures[${index}].measure`,
    );
    const detectorRefinementResidual = finiteNumberOrNull(
      row.detectorRefinementResidual ?? row.refinementResidual ?? row.residual,
    );
    return {
      classId: row.classId ?? row.id ?? `class_${index}`,
      measure,
      detectorRefinementResidual,
      tolerance: tolerances.detectorRefinement,
      detectorRefinementPass:
        detectorRefinementResidual !== null &&
        detectorRefinementResidual <= tolerances.detectorRefinement,
      retainedStatus: row.retainedStatus ?? row.status ?? null,
    };
  });
}

function parseCrossSectionComparisons({
  rawComparisons,
  classMeasureById,
  incomingFlux,
  duration,
  tolerances,
}) {
  if (!Array.isArray(rawComparisons)) {
    return [];
  }
  return rawComparisons.map((row, index) => {
    const classId = row.classId ?? row.id ?? `comparison_${index}`;
    const measure = classMeasureById.get(classId) ?? null;
    const targetSigma = finiteNumberOrNull(row.targetSigma ?? row.observedSigma);
    const computedSigma =
      measure !== null && incomingFlux !== null && incomingFlux > 0
        ? measure / (incomingFlux * duration)
        : null;
    const absoluteResidual =
      computedSigma === null || targetSigma === null
        ? null
        : Math.abs(computedSigma - targetSigma);
    const normalizedResidual =
      absoluteResidual === null || targetSigma === null
        ? null
        : absoluteResidual / Math.max(Math.abs(targetSigma), 1);
    return {
      classId,
      measure,
      computedSigma,
      targetSigma,
      absoluteResidual,
      normalizedResidual,
      tolerance: finiteNumberOrNull(row.tolerance) ?? tolerances.crossSection,
      crossSectionPass:
        normalizedResidual !== null &&
        normalizedResidual <=
          (finiteNumberOrNull(row.tolerance) ?? tolerances.crossSection),
      retainedStatus: row.retainedStatus ?? row.status ?? null,
    };
  });
}

function parseFormFactorSamples(rawRows, tolerances) {
  if (!Array.isArray(rawRows)) {
    return [];
  }
  return rawRows.map((row, index) => {
    const value = finiteNumberOrNull(row.F_Q ?? row.value);
    const rotatedValue = finiteNumberOrNull(row.F_rotated ?? row.rotatedValue);
    const covarianceResidual =
      finiteNumberOrNull(row.covarianceResidual ?? row.residual) ??
      (value !== null && rotatedValue !== null
        ? Math.abs(value - rotatedValue)
        : null);
    const tolerance =
      finiteNumberOrNull(row.tolerance) ?? tolerances.formFactorCovariance;
    return {
      qId: row.qId ?? row.id ?? `q_${index}`,
      value,
      rotatedValue,
      covarianceResidual,
      tolerance,
      formFactorCovariancePass:
        covarianceResidual !== null && covarianceResidual <= tolerance,
      retainedStatus: row.retainedStatus ?? row.status ?? null,
    };
  });
}

function evaluateCorridorDiagnostics(carrier, tolerances) {
  const corridorSemantics = carrier.corridorSemantics ?? {};
  const detectorKernelStage = corridorSemantics.detectorKernelStage ?? null;
  const corridorRows = (carrier.exitCorridors ?? []).map((corridor, index) => {
    const boundaryComponentId = corridor.boundaryComponentId ?? null;
    const measureStage = corridor.measureStage ?? null;
    const passed =
      concreteString(corridor.id) &&
      concreteString(boundaryComponentId) &&
      measureStage === "pre_detector_escape";
    return {
      id: corridor.id ?? `corridor_${index}`,
      boundaryComponentId,
      measureStage,
      passed,
      reason: passed ? "passed" : "corridor_not_first_exit_pre_detector",
    };
  });
  const firstExitHeaderPassed =
    corridorSemantics.mode === "first_exit" &&
    concreteString(corridorSemantics.basinId) &&
    concreteString(corridorSemantics.boundaryId) &&
    (detectorKernelStage === null ||
      detectorKernelStage === "post_escape_pushforward");
  const firstExitCorridorsDeclared =
    firstExitHeaderPassed &&
    corridorRows.length > 0 &&
    corridorRows.every((row) => row.passed);

  const nullSeparatrix = carrier.nullSeparatrix ?? {};
  const nullSeparatrixMass = finiteNumberOrNull(
    nullSeparatrix.neighborhoodMass ?? nullSeparatrix.mass,
  );
  const nullSeparatrixTolerance =
    finiteNumberOrNull(nullSeparatrix.tolerance) ?? tolerances.nullSeparatrix;
  const nullSeparatrixPassed =
    nullSeparatrixMass !== null &&
    nullSeparatrixMass <= nullSeparatrixTolerance;

  const refinementCompatibility = carrier.refinementCompatibility ?? {};
  const refinementCocycleDefect = finiteNumberOrNull(
    refinementCompatibility.cocycleDefect ??
      refinementCompatibility.residual,
  );
  const refinementTolerance =
    finiteNumberOrNull(refinementCompatibility.tolerance) ??
    tolerances.refinement;
  const refinementCompatibilityPassed =
    refinementCocycleDefect !== null &&
    refinementCocycleDefect <= refinementTolerance;

  return {
    firstExit: {
      mode: corridorSemantics.mode ?? null,
      basinId: corridorSemantics.basinId ?? null,
      boundaryId: corridorSemantics.boundaryId ?? null,
      detectorKernelStage,
      headerPassed: firstExitHeaderPassed,
      corridorRows,
      passed: firstExitCorridorsDeclared,
      reason: firstExitCorridorsDeclared
        ? "passed"
        : "first_exit_corridors_not_declared_before_detector",
    },
    nullSeparatrix: {
      epsilon: nullSeparatrix.epsilon ?? null,
      neighborhoodMass: nullSeparatrixMass,
      tolerance: nullSeparatrixTolerance,
      passed: nullSeparatrixPassed,
      reason: nullSeparatrixPassed
        ? "passed"
        : "null_separatrix_mass_above_tolerance_or_missing",
    },
    refinementCompatibility: {
      parentWindowId: refinementCompatibility.parentWindowId ?? null,
      childWindowId: refinementCompatibility.childWindowId ?? null,
      cocycleDefect: refinementCocycleDefect,
      tolerance: refinementTolerance,
      passed: refinementCompatibilityPassed,
      reason: refinementCompatibilityPassed
        ? "passed"
        : "refinement_cocycle_defect_above_tolerance_or_missing",
    },
    firstExitCorridorsDeclared,
    detectorKernelStage,
    nullSeparatrixMass,
    nullSeparatrixTolerance,
    nullSeparatrixPassed,
    refinementCocycleDefect,
    refinementTolerance,
    refinementCompatibilityPassed,
  };
}

function evaluateRetainedAcceptance(carrier, tolerances) {
  const rowStatuses = [
    rowStatus("W", carrier.window),
    rowStatus("Phi_T", carrier.transitionMap),
    rowStatus("mu_star_T", carrier.finiteMeasure),
    rowStatus("Q", carrier.coarseGraining),
    rowStatus("K_det", carrier.detectorKernel),
    rowStatus("B", carrier.outcomePartition),
    rowStatus("S_retune", carrier.noHiddenRetuneWitness),
  ];
  if (requiresCorridorFamily(carrier)) {
    rowStatuses.push(corridorFamilyRowStatus("C", carrier.exitCorridors ?? []));
  }
  const missingAcceptedRows = rowStatuses
    .filter((row) => !row.accepted)
    .map((row) => row.id);
  const rowReasons = Object.fromEntries(
    rowStatuses.map((row) => [row.id, row.reason]),
  );
  const invarianceResidual = finiteNumberOrNull(carrier.finiteMeasure?.invarianceResidual);
  const invariancePassed =
    invarianceResidual !== null && invarianceResidual <= tolerances.invariance;
  const retuneResidual = finiteNumberOrNull(carrier.noHiddenRetuneWitness?.residual);
  const hiddenRetunePassed =
    rowStatuses.find((row) => row.id === "S_retune")?.accepted === true &&
    retuneResidual !== null &&
    retuneResidual <= tolerances.retune;
  return {
    accepted: missingAcceptedRows.length === 0 && invariancePassed && hiddenRetunePassed,
    missingAcceptedRows,
    invarianceResidual,
    invariancePassed,
    hiddenRetuneResidual: retuneResidual,
    hiddenRetunePassed,
    rowStatuses,
    rowReasons,
  };
}

function evaluateEq30Acceptance(carrier) {
  if (carrier.row !== "EQ-30") {
    return {
      applicable: false,
      accepted: true,
      missingAcceptedRows: [],
      rowStatuses: [],
      rowReasons: {},
    };
  }
  const rowStatuses = [
    rowStatus("Gamma_a", carrier.preparedEnsemble),
    rowStatus("Phi_in", carrier.fluxCalibration),
    rowFamilyStatus("detected_class_measures", carrier.detectedClassMeasures ?? []),
    rowFamilyStatus("cross_section_comparisons", carrier.crossSectionComparisons ?? []),
    rowStatus("rho_exp", carrier.exposureDistribution),
    rowFamilyStatus("form_factor_samples", carrier.formFactorSamples ?? []),
    rowStatus("elastic_regime", carrier.regime),
  ];
  const missingAcceptedRows = rowStatuses
    .filter((row) => !row.accepted)
    .map((row) => row.id);
  return {
    applicable: true,
    accepted: missingAcceptedRows.length === 0,
    missingAcceptedRows,
    rowStatuses,
    rowReasons: Object.fromEntries(rowStatuses.map((row) => [row.id, row.reason])),
  };
}

function rowFamilyStatus(id, rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      id,
      status: null,
      accepted: false,
      reason: "missing_row_family",
    };
  }
  const firstMissingRetained = rows.find(
    (row) => !isAcceptedStatus(row.retainedStatus ?? row.status),
  );
  if (firstMissingRetained) {
    return {
      id,
      status: firstMissingRetained.retainedStatus ?? firstMissingRetained.status ?? null,
      accepted: false,
      reason: "row_family_not_accepted",
    };
  }
  const firstMissingIdentity = rows.find(
    (row) => !concreteString(row.id ?? row.classId ?? row.qId),
  );
  if (firstMissingIdentity) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "row_family_identity_not_concrete",
    };
  }
  const firstMissingSource = rows.find(
    (row) =>
      !sourceReferenceExists(row.sourcePath) &&
      !sourceReferenceExists(row.source),
  );
  if (firstMissingSource) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "row_family_source_not_found",
    };
  }
  return {
    id,
    status: "accepted",
    accepted: true,
    reason: "accepted",
  };
}

function requiresCorridorFamily(carrier) {
  return (
    carrier.row === "EQ-31" ||
    (Array.isArray(carrier.exitCorridors) && carrier.exitCorridors.length > 0)
  );
}

function corridorFamilyRowStatus(id, corridors) {
  if (!Array.isArray(corridors) || corridors.length === 0) {
    return {
      id,
      status: null,
      accepted: false,
      reason: "missing_corridor_family",
    };
  }
  const firstMissingRetained = corridors.find(
    (corridor) => !isAcceptedStatus(corridor.retainedStatus),
  );
  if (firstMissingRetained) {
    return {
      id,
      status: firstMissingRetained.retainedStatus ?? null,
      accepted: false,
      reason: "corridor_not_accepted",
    };
  }
  const firstMissingLedger = corridors.find(
    (corridor) => !isAcceptedStatus(corridor.ledgerStatus),
  );
  if (firstMissingLedger) {
    return {
      id,
      status: firstMissingLedger.ledgerStatus ?? null,
      accepted: false,
      reason: "corridor_ledger_not_accepted",
    };
  }
  const firstMissingIdentity = corridors.find((corridor) => !concreteString(corridor.id));
  if (firstMissingIdentity) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "corridor_identity_not_concrete",
    };
  }
  const firstMissingSource = corridors.find(
    (corridor) =>
      !sourceReferenceExists(corridor.sourcePath) &&
      !sourceReferenceExists(corridor.source),
  );
  if (firstMissingSource) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "corridor_source_not_found",
    };
  }
  return {
    id,
    status: "accepted",
    accepted: true,
    reason: "accepted",
  };
}

function rowStatus(id, row) {
  const status = row?.retainedStatus ?? row?.status ?? null;
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return {
      id,
      status,
      accepted: false,
      reason: "missing_row",
    };
  }
  if (!isAcceptedStatus(status)) {
    return {
      id,
      status,
      accepted: false,
      reason: "row_not_accepted",
    };
  }
  if (!concreteString(row.id)) {
    return {
      id,
      status,
      accepted: false,
      reason: "row_identity_not_concrete",
    };
  }
  if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
    return {
      id,
      status,
      accepted: false,
      reason: "row_source_not_found",
    };
  }
  return {
    id,
    status,
    accepted: true,
    reason: "accepted",
  };
}

function summarizeRow(row, extraKeys = []) {
  if (!row || typeof row !== "object") {
    return null;
  }
  const summary = {
    id: row.id ?? null,
    status: row.status ?? null,
    retainedStatus: row.retainedStatus ?? null,
  };
  for (const key of extraKeys) {
    summary[key] = row[key] ?? null;
  }
  return summary;
}

function decideStatus(
  retainedAcceptance,
  massRows,
  carrier,
  corridorDiagnostics,
  eq30,
  eq30Acceptance,
) {
  if (!massRows.massClosurePassed) {
    return "blocked_corridor_measure_exceeds_window_measure";
  }
  if (carrier.retainedStatus && !isAcceptedStatus(carrier.retainedStatus)) {
    return carrier.retainedStatus === "toy"
      ? "toy_structure_only"
      : "blocked_carrier_not_retained";
  }
  if (!retainedAcceptance.accepted) {
    return "blocked_missing_accepted_retained_rows";
  }
  if (carrier.row === "EQ-30") {
    if (!eq30Acceptance.accepted) {
      return "blocked_missing_accepted_eq30_rows";
    }
    if (!eq30.computed) {
      return "blocked_missing_eq30_projection_rows";
    }
    if (!eq30.preparedFluxPass) {
      return "blocked_prepared_flux_mapping";
    }
    if (!eq30.detectorRefinementPass) {
      return "blocked_detector_refinement";
    }
    if (!eq30.crossSectionPass) {
      return "blocked_cross_section_residual";
    }
    if (!eq30.formFactorCovariancePass) {
      return "blocked_form_factor_covariance";
    }
    if (!eq30.regimePurityPass) {
      return "blocked_regime_purity";
    }
    return "accepted_retained_statistical_carrier";
  }
  if (requiresCorridorFamily(carrier)) {
    if (!corridorDiagnostics.firstExitCorridorsDeclared) {
      return "blocked_missing_first_exit_corridor_semantics";
    }
    if (!corridorDiagnostics.nullSeparatrixPassed) {
      return "blocked_null_separatrix_positive_mass";
    }
    if (!corridorDiagnostics.refinementCompatibilityPassed) {
      return "blocked_refinement_cocycle_defect";
    }
  }
  return "accepted_retained_statistical_carrier";
}

function firstBlocker({
  retainedAcceptance,
  massRows,
  carrier,
  eq30,
  eq30Acceptance,
  eq31,
  corridorDiagnostics,
}) {
  if (!massRows.massClosurePassed) {
    return "corridor_measure_exceeds_window_measure";
  }
  if (requiresCorridorFamily(carrier) && !eq31.computed) {
    return "missing_positive_escape_measure";
  }
  if (retainedAcceptance.missingAcceptedRows.length > 0) {
    return `missing_accepted_${retainedAcceptance.missingAcceptedRows[0]}`;
  }
  if (!retainedAcceptance.invariancePassed) {
    return "finite_measure_invariance_residual";
  }
  if (!retainedAcceptance.hiddenRetunePassed) {
    return "no_hidden_retune_witness";
  }
  if (carrier.row === "EQ-30") {
    if (eq30Acceptance.missingAcceptedRows.length > 0) {
      return `missing_accepted_${eq30Acceptance.missingAcceptedRows[0]}`;
    }
    if (!eq30.computed) {
      return "missing_eq30_projection_rows";
    }
    if (!eq30.preparedFluxPass) {
      return "prepared_flux_mapping";
    }
    if (!eq30.detectorRefinementPass) {
      return "detector_refinement_residual";
    }
    if (!eq30.crossSectionPass) {
      return "cross_section_residual";
    }
    if (!eq30.formFactorCovariancePass) {
      return "form_factor_covariance";
    }
    if (!eq30.regimePurityPass) {
      return "regime_purity";
    }
    return null;
  }
  if (requiresCorridorFamily(carrier)) {
    if (!corridorDiagnostics.firstExitCorridorsDeclared) {
      return "missing_first_exit_corridor_semantics";
    }
    if (!corridorDiagnostics.nullSeparatrixPassed) {
      return "null_separatrix_positive_mass";
    }
    if (!corridorDiagnostics.refinementCompatibilityPassed) {
      return "refinement_cocycle_defect";
    }
  }
  return null;
}

function isAcceptedStatus(status) {
  return typeof status === "string" && ACCEPTED_STATUSES.has(status);
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  const lowerText = text.toLowerCase();
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !lowerText.includes("todo") &&
    !lowerText.includes("pending") &&
    !lowerText.includes("placeholder")
  );
}

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  const resolvedPath = path.resolve(value.trim());
  if (isNonDurableSourcePath(resolvedPath)) {
    return false;
  }
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
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

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return number;
}

function nonnegativeNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${label} must be a nonnegative finite number.`);
  }
  return number;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
