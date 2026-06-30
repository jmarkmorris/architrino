#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-finite-window-statistical-carrier-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-finite-window-statistical-carrier-check/v1";
const DEFAULT_TOLERANCES = {
  massClosure: 1e-12,
  invariance: 1e-3,
  retune: 1e-12,
  recordContinuity: 1e-3,
  densityReference: 1e-3,
  currentReference: 1e-3,
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
used by EQ-14, EQ-25, EQ-30, and EQ-31. For EQ-14 it computes same-measure
record-current and continuity diagnostics. For EQ-31 it computes escape rates,
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
    eq14: output.eq14,
    eq30: output.eq30,
    eq31: output.eq31,
    missingAcceptedRows: output.retainedAcceptance.missingAcceptedRows,
    rowStatuses: output.retainedAcceptance.rowStatuses,
    rowReasons: output.retainedAcceptance.rowReasons,
    eq14Acceptance: output.eq14Acceptance,
    eq30Acceptance: output.eq30Acceptance,
    eq30SameRecordBinding: output.eq30SameRecordBinding,
    eq31SameRecordBinding: output.eq31SameRecordBinding,
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
  const carrierAcceptance = evaluateCarrierAcceptance(carrier);
  const carrierSourceContract = evaluateCarrierSourceContract(carrier);
  const retainedAcceptance = evaluateRetainedAcceptance(carrier, tolerances);
  const massRows = computeMassRows(corridors, totalMass, tolerances);
  const eq14 = computeEq14Rows(carrier, tolerances);
  const eq14Acceptance = evaluateEq14Acceptance(carrier);
  const eq30 = computeEq30Rows(carrier, duration, tolerances);
  const eq30Acceptance = evaluateEq30Acceptance(carrier);
  const eq30SameRecordBinding = evaluateEq30SameRecordBinding(carrier);
  const eq31 = computeEq31Rows(corridors, constants);
  const eq31SameRecordBinding = evaluateEq31SameRecordBinding(carrier);
  const carrierSameRecordBinding =
    carrier.row === "EQ-31" ? eq31SameRecordBinding : eq30SameRecordBinding;
  const corridorDiagnostics = evaluateCorridorDiagnostics(carrier, tolerances);
  const blockerContext = {
    carrierAcceptance,
    retainedAcceptance,
    massRows,
    carrier,
    eq14,
    eq14Acceptance,
    eq30,
    eq30Acceptance,
    eq30SameRecordBinding,
    eq31SameRecordBinding,
    eq31,
    corridorDiagnostics,
  };
  const status = decideStatus(
    carrierAcceptance,
    retainedAcceptance,
    massRows,
    carrier,
    eq14,
    eq14Acceptance,
    corridorDiagnostics,
    eq30,
    eq30Acceptance,
    eq30SameRecordBinding,
    eq31SameRecordBinding,
  );
  const nextBlocker = firstBlocker(blockerContext);

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
        "score-neutral carrier evaluator; accepted row statuses are required before score review",
    },
    constants,
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      carrierSourceAccepted: carrierAcceptance.accepted,
      carrierSourceReason: carrierAcceptance.reason,
      carrierSourceContractReady: carrierSourceContract.ready,
      carrierSourceContractReason: carrierSourceContract.reason,
      carrierSourceContractRequired: carrierAcceptance.required,
      acceptedCarrierRows: retainedAcceptance.accepted,
      massClosurePassed: massRows.massClosurePassed,
      hiddenRetunePassed: retainedAcceptance.hiddenRetunePassed,
      eq14RowsComputed: eq14.computed,
      eq14RowsAccepted: eq14Acceptance.accepted,
      eq14SameMeasureFlowPassed: eq14.sameMeasureFlowPass,
      eq14ContinuityPassed: eq14.continuityPass,
      eq14DensityReferencePassed: eq14.densityReferencePass,
      eq14CurrentReferencePassed: eq14.currentReferencePass,
      eq30RowsComputed: eq30.computed,
      eq30RowsAccepted: eq30Acceptance.accepted,
      eq30PreparedFluxPassed: eq30.preparedFluxPass,
      eq30DetectorRefinementPassed: eq30.detectorRefinementPass,
      eq30CrossSectionPassed: eq30.crossSectionPass,
      eq30FormFactorCovariancePassed: eq30.formFactorCovariancePass,
      eq30RegimePurityPassed: eq30.regimePurityPass,
      carrierSameRecordBindingReady: carrierSameRecordBinding.passed,
      carrierSameRecordBindingReason: carrierSameRecordBinding.reason,
      carrierSameRecordBindingRequired: carrierSameRecordBinding.required,
      eq31RowsComputed: eq31.computed,
      corridorCount: corridors.length,
      firstExitCorridorsDeclared:
        corridorDiagnostics.firstExitCorridorsDeclared,
      nullSeparatrixPassed: corridorDiagnostics.nullSeparatrixPassed,
      refinementCompatibilityPassed:
        corridorDiagnostics.refinementCompatibilityPassed,
      nextBlocker,
      nextBlockerDetails: firstBlockerDetails(nextBlocker, blockerContext),
    },
    eq30SameRecordBinding,
    eq31SameRecordBinding,
    finiteWindowCarrier: {
      carrier: {
        id: carrier.id ?? null,
        retainedStatus: carrier.retainedStatus ?? null,
        sourcePath: carrier.sourcePath ?? carrier.source ?? null,
        sourceReferenceExists: carrierAcceptance.sourceReferenceExists,
        sourceEvidenceReferenceExists: carrierAcceptance.sourceEvidenceReferenceExists,
        reason: carrierAcceptance.reason,
        sourceContractReady: carrierSourceContract.ready,
        sourceContractReason: carrierSourceContract.reason,
        sourceContractRequired: carrierAcceptance.required,
      },
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
      recordCurrentProjection: summarizeRow(carrier.recordCurrentProjection, [
        "positionProjectionId",
        "densityMeasureId",
        "currentMeasureId",
        "densityFlowId",
        "currentFlowId",
      ]),
      preparedEnsemble: summarizeRow(carrier.preparedEnsemble),
      fluxCalibration: summarizeRow(carrier.fluxCalibration, ["incomingFlux"]),
      exposureDistribution: summarizeRow(
        carrier.exposureDistribution,
        ["measurePreservingQuotient"],
      ),
      regime: summarizeRow(carrier.regime, ["elasticClassId", "inelasticLeakage"]),
    },
    retainedAcceptance,
    eq14Acceptance,
    eq30Acceptance,
    massRows,
    corridorDiagnostics,
    eq14,
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
    recordContinuity: positiveNumber(
      raw.recordContinuity ?? DEFAULT_TOLERANCES.recordContinuity,
      "tolerances.recordContinuity",
    ),
    densityReference: positiveNumber(
      raw.densityReference ?? DEFAULT_TOLERANCES.densityReference,
      "tolerances.densityReference",
    ),
    currentReference: positiveNumber(
      raw.currentReference ?? DEFAULT_TOLERANCES.currentReference,
      "tolerances.currentReference",
    ),
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

function computeEq14Rows(carrier, tolerances) {
  const projection = carrier.recordCurrentProjection ?? {};
  const finiteMeasureId = carrier.finiteMeasure?.id ?? null;
  const transitionMapId = carrier.transitionMap?.id ?? null;
  const densityMeasureId = projection.densityMeasureId ?? null;
  const currentMeasureId = projection.currentMeasureId ?? null;
  const densityFlowId = projection.densityFlowId ?? null;
  const currentFlowId = projection.currentFlowId ?? null;
  const sameMeasureFlowPass =
    concreteString(projection.id) &&
    concreteString(projection.positionProjectionId) &&
    concreteString(finiteMeasureId) &&
    concreteString(transitionMapId) &&
    densityMeasureId === finiteMeasureId &&
    currentMeasureId === finiteMeasureId &&
    densityFlowId === transitionMapId &&
    currentFlowId === transitionMapId;
  const recordCurrentSamples = parseRecordCurrentSamples(
    carrier.recordCurrentSamples ?? carrier.densityCurrentSamples ?? [],
    tolerances,
  );
  const continuityPass =
    recordCurrentSamples.length > 0 &&
    recordCurrentSamples.every((row) => row.continuityPass);
  const densityReferencePass =
    recordCurrentSamples.length > 0 &&
    recordCurrentSamples.every((row) => row.densityReferencePass);
  const currentReferencePass =
    recordCurrentSamples.length > 0 &&
    recordCurrentSamples.every((row) => row.currentReferencePass);
  return {
    computed:
      sameMeasureFlowPass &&
      recordCurrentSamples.length > 0 &&
      continuityPass,
    projection: {
      id: projection.id ?? null,
      positionProjectionId: projection.positionProjectionId ?? null,
      finiteMeasureId,
      transitionMapId,
      densityMeasureId,
      currentMeasureId,
      densityFlowId,
      currentFlowId,
      sameMeasureFlowPass,
      reason: sameMeasureFlowPass
        ? "passed"
        : "density_and_current_not_bound_to_same_measure_and_flow",
    },
    sameMeasureFlowPass,
    recordCurrentSamples,
    continuityPass,
    densityReferencePass,
    currentReferencePass,
    maxContinuityResidual: maxFinite(
      recordCurrentSamples.map((row) => row.continuityResidual),
    ),
    maxDensityReferenceResidual: maxFinite(
      recordCurrentSamples.map((row) => row.densityReferenceResidual),
    ),
    maxCurrentReferenceResidual: maxFinite(
      recordCurrentSamples.map((row) => row.currentReferenceResidual),
    ),
  };
}

function parseRecordCurrentSamples(rawRows, tolerances) {
  if (!Array.isArray(rawRows)) {
    return [];
  }
  return rawRows.map((row, index) => {
    const densityBefore = finiteNumberOrNull(
      row.densityBefore ?? row.rhoBefore ?? row.rho_t,
    );
    const densityAfter = finiteNumberOrNull(
      row.densityAfter ?? row.rhoAfter ?? row.rho_t_dt,
    );
    const deltaT = finiteNumberOrNull(row.deltaT ?? row.dt);
    const currentDivergence = finiteNumberOrNull(
      row.currentDivergence ?? row.divJ,
    );
    const densityDerivative =
      densityBefore !== null &&
      densityAfter !== null &&
      deltaT !== null &&
      deltaT > 0
        ? (densityAfter - densityBefore) / deltaT
        : null;
    const continuityResidual =
      finiteNumberOrNull(row.continuityResidual ?? row.residual) ??
      (densityDerivative !== null && currentDivergence !== null
        ? Math.abs(densityDerivative + currentDivergence)
        : null);
    const densityRecord = finiteNumberOrNull(
      row.densityRecord ?? row.rhoRecord ?? row.rho_rec,
    );
    const densityReference = finiteNumberOrNull(
      row.densityReference ?? row.rhoReference ?? row.rho_psi,
    );
    const currentRecord = finiteNumberOrNull(
      row.currentRecord ?? row.jRecord ?? row.J_rec,
    );
    const currentReference = finiteNumberOrNull(
      row.currentReference ?? row.jReference ?? row.J_psi,
    );
    const densityReferenceResidual =
      finiteNumberOrNull(row.densityReferenceResidual) ??
      (densityRecord !== null && densityReference !== null
        ? Math.abs(densityRecord - densityReference)
        : null);
    const currentReferenceResidual =
      finiteNumberOrNull(row.currentReferenceResidual) ??
      (currentRecord !== null && currentReference !== null
        ? Math.abs(currentRecord - currentReference)
        : null);
    const continuityTolerance =
      finiteNumberOrNull(row.continuityTolerance ?? row.tolerance) ??
      tolerances.recordContinuity;
    const densityReferenceTolerance =
      finiteNumberOrNull(row.densityReferenceTolerance) ??
      tolerances.densityReference;
    const currentReferenceTolerance =
      finiteNumberOrNull(row.currentReferenceTolerance) ??
      tolerances.currentReference;
    return {
      id: row.id ?? `record_current_sample_${index}`,
      densityBefore,
      densityAfter,
      deltaT,
      densityDerivative,
      currentDivergence,
      continuityResidual,
      continuityTolerance,
      continuityPass:
        continuityResidual !== null &&
        continuityResidual <= continuityTolerance,
      densityRecord,
      densityReference,
      densityReferenceResidual,
      densityReferenceTolerance,
      densityReferencePass:
        densityReferenceResidual !== null &&
        densityReferenceResidual <= densityReferenceTolerance,
      currentRecord,
      currentReference,
      currentReferenceResidual,
      currentReferenceTolerance,
      currentReferencePass:
        currentReferenceResidual !== null &&
        currentReferenceResidual <= currentReferenceTolerance,
      retainedStatus: row.retainedStatus ?? row.status ?? null,
    };
  });
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
  const corridorMeasureById = new Map(
    (carrier.exitCorridors ?? []).map((corridor, index) => [
      corridor.id ?? `corridor_${index}`,
      finiteNumberOrNull(corridor.measure),
    ]),
  );
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
  const firstExitAdditivity = evaluateFirstExitAdditivity({
    rows: corridorSemantics.firstExitPreimageRows ?? [],
    corridorMeasureById,
    tolerance:
      finiteNumberOrNull(corridorSemantics.additivityTolerance) ??
      tolerances.massClosure,
  });

  const nullSeparatrix = carrier.nullSeparatrix ?? {};
  const nullSeparatrixEstimate = evaluateNullSeparatrixEstimate(
    nullSeparatrix,
    tolerances,
  );

  const refinementCompatibility = carrier.refinementCompatibility ?? {};
  const refinementEstimate = evaluateRefinementCompatibility(
    refinementCompatibility,
    tolerances,
  );

  return {
    firstExit: {
      mode: corridorSemantics.mode ?? null,
      basinId: corridorSemantics.basinId ?? null,
      boundaryId: corridorSemantics.boundaryId ?? null,
      firstExitMapId: corridorSemantics.firstExitMapId ?? null,
      detectorKernelStage,
      headerPassed: firstExitHeaderPassed,
      corridorRows,
      additivity: firstExitAdditivity,
      passed: firstExitCorridorsDeclared,
      reason: firstExitCorridorsDeclared
        ? "passed"
        : "first_exit_corridors_not_declared_before_detector",
    },
    nullSeparatrix: {
      epsilon: nullSeparatrixEstimate.epsilon,
      neighborhoodMass: nullSeparatrixEstimate.neighborhoodMass,
      tolerance: nullSeparatrixEstimate.tolerance,
      estimateSource: nullSeparatrixEstimate.estimateSource,
      measureRows: nullSeparatrixEstimate.measureRows,
      epsilonSequence: nullSeparatrixEstimate.epsilonSequence,
      sequenceMonotonePassed: nullSeparatrixEstimate.sequenceMonotonePassed,
      passed: nullSeparatrixEstimate.passed,
      reason: nullSeparatrixEstimate.passed
        ? "passed"
        : "null_separatrix_mass_above_tolerance_or_missing",
    },
    refinementCompatibility: {
      parentWindowId: refinementCompatibility.parentWindowId ?? null,
      childWindowId: refinementCompatibility.childWindowId ?? null,
      cocycleDefect: refinementEstimate.cocycleDefect,
      tolerance: refinementEstimate.tolerance,
      estimateSource: refinementEstimate.estimateSource,
      restrictionRows: refinementEstimate.restrictionRows,
      defectSequence: refinementEstimate.defectSequence,
      sequenceMonotonePassed: refinementEstimate.sequenceMonotonePassed,
      passed: refinementEstimate.passed,
      reason: refinementEstimate.passed
        ? "passed"
        : "refinement_cocycle_defect_above_tolerance_or_missing",
    },
    firstExitCorridorsDeclared,
    detectorKernelStage,
    firstExitAdditivityPassed: firstExitAdditivity.passed,
    nullSeparatrixMass: nullSeparatrixEstimate.neighborhoodMass,
    nullSeparatrixTolerance: nullSeparatrixEstimate.tolerance,
    nullSeparatrixPassed: nullSeparatrixEstimate.passed,
    refinementCocycleDefect: refinementEstimate.cocycleDefect,
    refinementTolerance: refinementEstimate.tolerance,
    refinementCompatibilityPassed: refinementEstimate.passed,
  };
}

function evaluateFirstExitAdditivity({ rows, corridorMeasureById, tolerance }) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      evaluated: false,
      rows: [],
      residual: null,
      tolerance,
      passed: null,
      reason: "first_exit_preimage_rows_missing",
    };
  }
  const parsedRows = rows.map((row, index) => {
    const measureStage = row.measureStage ?? row.stage ?? null;
    const measure = finiteNumberOrNull(row.measure);
    const corridorId = row.corridorId ?? row.id ?? `corridor_${index}`;
    const corridorMeasure = corridorMeasureById.get(corridorId) ?? null;
    const validPreimage =
      row.kind === "corridor_preimage" &&
      measureStage === "pre_detector_escape";
    const residual =
      measure !== null && corridorMeasure !== null
        ? Math.abs(measure - corridorMeasure)
        : null;
    return {
      id: row.id ?? `first_exit_preimage_${index}`,
      corridorId,
      kind: row.kind ?? null,
      measureStage,
      measure,
      corridorMeasure,
      residual,
      passed: validPreimage && residual !== null && residual <= tolerance,
      reason: validPreimage
        ? "passed_or_residual_reported"
        : "not_pre_detector_first_exit_preimage",
    };
  });
  const residual = parsedRows.reduce(
    (sum, row) => sum + (Number.isFinite(row.residual) ? row.residual : 0),
    0,
  );
  const allRowsValid = parsedRows.every((row) => row.passed);
  return {
    evaluated: true,
    rows: parsedRows,
    residual,
    tolerance,
    passed: allRowsValid && residual <= tolerance,
    reason:
      allRowsValid && residual <= tolerance
        ? "passed"
        : "first_exit_preimage_additivity_failed",
  };
}

function evaluateNullSeparatrixEstimate(nullSeparatrix, tolerances) {
  const tolerance =
    finiteNumberOrNull(nullSeparatrix.tolerance) ?? tolerances.nullSeparatrix;
  const measureRows = parseNullSeparatrixMeasureRows(
    nullSeparatrix.measureRows ?? [],
  );
  const epsilonSequence = parseNullSeparatrixEpsilonSequence(
    nullSeparatrix.epsilonSequence ?? nullSeparatrix.sequence ?? [],
  );
  const measureRowsMass =
    measureRows.length > 0
      ? measureRows.reduce((sum, row) => sum + row.measure, 0)
      : null;
  const sequenceCurrent = chooseSmallestEpsilonRow(epsilonSequence);
  const scalarMass = finiteNumberOrNull(
    nullSeparatrix.neighborhoodMass ?? nullSeparatrix.mass,
  );
  const neighborhoodMass =
    measureRowsMass ??
    sequenceCurrent?.neighborhoodMass ??
    scalarMass;
  const epsilon =
    sequenceCurrent?.epsilon ??
    finiteNumberOrNull(nullSeparatrix.epsilon);
  const sequenceMonotonePassed =
    epsilonSequence.length > 0
      ? epsilonSequence.every((row) => row.valid) &&
        monotonicallyDecreasesByEpsilon(epsilonSequence, "neighborhoodMass")
      : null;
  const passed =
    neighborhoodMass !== null &&
    neighborhoodMass <= tolerance &&
    (sequenceMonotonePassed !== false);
  return {
    epsilon,
    neighborhoodMass,
    tolerance,
    estimateSource:
      measureRowsMass !== null
        ? "measure_rows"
        : sequenceCurrent
          ? "epsilon_sequence"
          : "scalar",
    measureRows,
    epsilonSequence,
    sequenceMonotonePassed,
    passed,
  };
}

function parseNullSeparatrixMeasureRows(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows
    .map((row, index) => {
      const measure = finiteNumberOrNull(row.measure);
      const valid =
        row.kind === "null_separatrix_neighborhood" && measure !== null;
      return {
        id: row.id ?? `null_separatrix_measure_${index}`,
        kind: row.kind ?? null,
        epsilon: finiteNumberOrNull(row.epsilon),
        measure: valid ? measure : 0,
        valid,
        reason: valid
          ? "passed"
          : "not_null_separatrix_neighborhood_measure",
      };
    })
    .filter((row) => row.valid);
}

function parseNullSeparatrixEpsilonSequence(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows.map((row, index) => {
    const epsilon = finiteNumberOrNull(row.epsilon);
    const neighborhoodMass = finiteNumberOrNull(
      row.neighborhoodMass ?? row.mass,
    );
    return {
      id: row.id ?? `epsilon_row_${index}`,
      epsilon,
      neighborhoodMass,
      valid: epsilon !== null && neighborhoodMass !== null,
    };
  });
}

function evaluateRefinementCompatibility(refinementCompatibility, tolerances) {
  const tolerance =
    finiteNumberOrNull(refinementCompatibility.tolerance) ??
    tolerances.refinement;
  const restrictionRows = parseRestrictionRows(
    refinementCompatibility.restrictionRows ?? [],
  );
  const defectSequence = parseDefectSequence(
    refinementCompatibility.defectSequence ??
      refinementCompatibility.refinementSequence ??
      [],
  );
  const restrictionDefect =
    restrictionRows.length > 0
      ? restrictionRows.reduce((sum, row) => sum + row.absoluteResidual, 0)
      : null;
  const sequenceCurrent = chooseFinestDefectRow(defectSequence);
  const scalarDefect = finiteNumberOrNull(
    refinementCompatibility.cocycleDefect ??
      refinementCompatibility.residual,
  );
  const cocycleDefect =
    restrictionDefect ??
    sequenceCurrent?.cocycleDefect ??
    scalarDefect;
  const sequenceMonotonePassed =
    defectSequence.length > 0
      ? defectSequence.every((row) => row.valid) &&
        monotonicallyDecreasesInInputOrder(defectSequence, "cocycleDefect")
      : null;
  const passed =
    cocycleDefect !== null &&
    cocycleDefect <= tolerance &&
    (sequenceMonotonePassed !== false);
  return {
    cocycleDefect,
    tolerance,
    estimateSource:
      restrictionDefect !== null
        ? "restriction_rows"
        : sequenceCurrent
          ? "defect_sequence"
          : "scalar",
    restrictionRows,
    defectSequence,
    sequenceMonotonePassed,
    passed,
  };
}

function parseRestrictionRows(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows.map((row, index) => {
    const parentMeasure = finiteNumberOrNull(row.parentMeasure);
    const childPushforwardMeasure = finiteNumberOrNull(
      row.childPushforwardMeasure ?? row.childMeasure,
    );
    const absoluteResidual =
      parentMeasure !== null && childPushforwardMeasure !== null
        ? Math.abs(parentMeasure - childPushforwardMeasure)
        : null;
    return {
      id: row.id ?? `restriction_row_${index}`,
      corridorId: row.corridorId ?? null,
      regionId: row.regionId ?? null,
      parentMeasure,
      childPushforwardMeasure,
      absoluteResidual: absoluteResidual ?? 0,
      valid: absoluteResidual !== null,
    };
  });
}

function parseDefectSequence(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows.map((row, index) => {
    const cocycleDefect = finiteNumberOrNull(
      row.cocycleDefect ?? row.defect ?? row.residual,
    );
    return {
      id: row.id ?? `defect_row_${index}`,
      ell: finiteNumberOrNull(row.ell),
      level: finiteNumberOrNull(row.level),
      cocycleDefect,
      valid: cocycleDefect !== null,
    };
  });
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

function evaluateCarrierAcceptance(carrier) {
  const status = carrier?.retainedStatus ?? carrier?.status ?? null;
  const sourcePath = carrier?.sourcePath ?? carrier?.source ?? null;
  if (!isAcceptedStatus(status)) {
    return {
      accepted: true,
      required: false,
      status,
      sourcePath,
      sourceReferenceExists: sourceReferenceExists(sourcePath),
      sourceEvidenceReferenceExists: sourceEvidenceReferenceExists(sourcePath),
      reason: "carrier_not_accepted",
    };
  }
  if (!concreteString(carrier?.id)) {
    return {
      accepted: false,
      required: true,
      status,
      sourcePath,
      sourceReferenceExists: sourceReferenceExists(sourcePath),
      sourceEvidenceReferenceExists: sourceEvidenceReferenceExists(sourcePath),
      reason: "carrier_identity_not_concrete",
    };
  }
  if (!sourceReferenceExists(sourcePath)) {
    return {
      accepted: false,
      required: true,
      status,
      sourcePath,
      sourceReferenceExists: false,
      sourceEvidenceReferenceExists: false,
      reason: "carrier_source_not_found",
    };
  }
  if (!sourceEvidenceReferenceExists(sourcePath)) {
    return {
      accepted: false,
      required: true,
      status,
      sourcePath,
      sourceReferenceExists: true,
      sourceEvidenceReferenceExists: false,
      reason: "accepted_without_evidence_source",
    };
  }
  if (!carrierSourceSupportsRow(carrier)) {
    return {
      accepted: false,
      required: true,
      status,
      sourcePath,
      sourceReferenceExists: true,
      sourceEvidenceReferenceExists: true,
      reason: "carrier_source_contract_mismatch",
    };
  }
  return {
    accepted: true,
    required: true,
    status,
    sourcePath,
    sourceReferenceExists: true,
    sourceEvidenceReferenceExists: true,
    reason: "accepted",
  };
}

function evaluateCarrierSourceContract(carrier) {
  const sourcePath = carrier?.sourcePath ?? carrier?.source ?? null;
  if (!concreteString(carrier?.id)) {
    return {
      ready: false,
      sourcePath,
      sourceReferenceExists: sourceReferenceExists(sourcePath),
      sourceEvidenceReferenceExists: sourceEvidenceReferenceExists(sourcePath),
      reason: "carrier_identity_not_concrete",
    };
  }
  if (!sourceReferenceExists(sourcePath)) {
    return {
      ready: false,
      sourcePath,
      sourceReferenceExists: false,
      sourceEvidenceReferenceExists: false,
      reason: "carrier_source_not_found",
    };
  }
  if (!sourceEvidenceReferenceExists(sourcePath)) {
    return {
      ready: false,
      sourcePath,
      sourceReferenceExists: true,
      sourceEvidenceReferenceExists: false,
      reason: "accepted_without_evidence_source",
    };
  }
  if (!carrierSourceSupportsRow(carrier)) {
    return {
      ready: false,
      sourcePath,
      sourceReferenceExists: true,
      sourceEvidenceReferenceExists: true,
      reason: "carrier_source_contract_mismatch",
    };
  }
  return {
    ready: true,
    sourcePath,
    sourceReferenceExists: true,
    sourceEvidenceReferenceExists: true,
    reason: "accepted",
  };
}

function carrierSourceSupportsRow(carrier) {
  const row = String(carrier?.row ?? "").toLowerCase();
  const rowWithoutDash = row.replace("-", "");
  const supportValues = [
    carrier?.sourceFamily,
    carrier?.sourceKind,
    carrier?.sourceRole,
    carrier?.sourceSupport,
    carrier?.sourceSupports,
    carrier?.evidenceFamily,
    carrier?.evidenceRole,
    carrier?.evidenceSupports,
    carrier?.claimLevel,
  ].flatMap((value) => (Array.isArray(value) ? value : [value]));
  const normalized = supportValues
    .filter((value) => typeof value === "string")
    .map((value) => value.toLowerCase());
  const rowSupported =
    row.length > 0 &&
    normalized.some(
      (value) => value.includes(row) || value.includes(rowWithoutDash),
    );
  const carrierRoleSupported = normalized.some(
    (value) =>
      value.includes("retained finite-window carrier") ||
      value.includes("retained statistical carrier") ||
      value.includes("top finite-window carrier"),
  );
  return rowSupported && carrierRoleSupported;
}

function evaluateEq14Acceptance(carrier) {
  if (carrier.row !== "EQ-14") {
    return {
      applicable: false,
      accepted: true,
      missingAcceptedRows: [],
      rowStatuses: [],
      rowReasons: {},
    };
  }
  const rowStatuses = [
    rowStatus("Theta_rhoJ", carrier.recordCurrentProjection),
    rowFamilyStatus("record_current_samples", carrier.recordCurrentSamples ?? []),
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

function evaluateEq30SameRecordBinding(carrier) {
  if (carrier.row !== "EQ-30") {
    return {
      applicable: false,
      required: false,
      passed: true,
      reason: "not_applicable",
      carrierId: carrier?.id ?? null,
      bindings: [],
      mismatches: [],
    };
  }
  const required = isAcceptedStatus(carrier?.retainedStatus ?? carrier?.status);
  const carrierId = carrier?.id ?? null;
  const bindings = [];
  const mismatches = [];
  if (!concreteString(carrierId)) {
    return {
      applicable: true,
      required,
      passed: false,
      reason: "carrier_identity_not_concrete",
      carrierId,
      bindings,
      mismatches: [
        {
          scope: "carrier",
          id: null,
          expectedCarrierId: "concrete_carrier_id",
          actualCarrierId: carrierId,
          reason: "carrier_identity_not_concrete",
        },
      ],
    };
  }
  const addBinding = (scope, row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      mismatches.push({
        scope,
        id: null,
        expectedCarrierId: carrierId,
        actualCarrierId: null,
        reason: "same_record_row_missing",
      });
      return;
    }
    const rowId = row.id ?? row.classId ?? row.qId ?? null;
    const actualCarrierId = row.carrierId ?? null;
    const binding = {
      scope,
      id: rowId,
      expectedCarrierId: carrierId,
      actualCarrierId,
    };
    bindings.push(binding);
    if (!concreteString(actualCarrierId)) {
      mismatches.push({
        ...binding,
        reason: "same_record_carrier_id_missing",
      });
      return;
    }
    if (actualCarrierId !== carrierId) {
      mismatches.push({
        ...binding,
        reason: "same_record_carrier_id_mismatch",
      });
    }
  };
  const addFamilyBindings = (scope, rows) => {
    if (!Array.isArray(rows) || rows.length === 0) {
      mismatches.push({
        scope,
        id: null,
        expectedCarrierId: carrierId,
        actualCarrierId: null,
        reason: "same_record_row_family_missing",
      });
      return;
    }
    rows.forEach((row, index) => addBinding(`${scope}[${index}]`, row));
  };

  addBinding("W", carrier.window);
  addBinding("Phi_T", carrier.transitionMap);
  addBinding("mu_star_T", carrier.finiteMeasure);
  addBinding("Q", carrier.coarseGraining);
  addBinding("K_det", carrier.detectorKernel);
  addBinding("B", carrier.outcomePartition);
  addBinding("S_retune", carrier.noHiddenRetuneWitness);
  addBinding("Gamma_a", carrier.preparedEnsemble);
  addBinding("Phi_in", carrier.fluxCalibration);
  addFamilyBindings("detected_class_measures", carrier.detectedClassMeasures);
  addFamilyBindings("cross_section_comparisons", carrier.crossSectionComparisons);
  addBinding("rho_exp", carrier.exposureDistribution);
  addFamilyBindings("form_factor_samples", carrier.formFactorSamples);
  addBinding("elastic_regime", carrier.regime);

  const outcomeClasses = new Set(
    Array.isArray(carrier.outcomePartition?.classes)
      ? carrier.outcomePartition.classes.filter(concreteString)
      : [],
  );
  const detectedClassIds = new Set(
    Array.isArray(carrier.detectedClassMeasures)
      ? carrier.detectedClassMeasures
          .map((row) => row?.classId)
          .filter(concreteString)
      : [],
  );
  for (const classId of detectedClassIds) {
    if (outcomeClasses.size > 0 && !outcomeClasses.has(classId)) {
      mismatches.push({
        scope: "detected_class_measures",
        id: classId,
        expectedCarrierId: carrierId,
        actualCarrierId: carrierId,
        reason: "detected_class_not_in_outcome_partition",
      });
    }
  }
  if (Array.isArray(carrier.crossSectionComparisons)) {
    for (const row of carrier.crossSectionComparisons) {
      const classId = row?.classId ?? null;
      if (!concreteString(classId) || !detectedClassIds.has(classId)) {
        mismatches.push({
          scope: "cross_section_comparisons",
          id: row?.id ?? null,
          expectedCarrierId: carrierId,
          actualCarrierId: row?.carrierId ?? null,
          classId,
          reason: "cross_section_class_not_detected",
        });
      }
    }
  }
  const exposureDistributionId = carrier.exposureDistribution?.id ?? null;
  if (Array.isArray(carrier.formFactorSamples)) {
    for (const row of carrier.formFactorSamples) {
      const sampleExposureId =
        row?.exposureDistributionId ?? row?.exposureId ?? null;
      if (!concreteString(sampleExposureId)) {
        mismatches.push({
          scope: "form_factor_samples",
          id: row?.id ?? row?.qId ?? null,
          expectedCarrierId: carrierId,
          actualCarrierId: row?.carrierId ?? null,
          expectedExposureDistributionId: exposureDistributionId,
          actualExposureDistributionId: sampleExposureId,
          reason: "form_factor_exposure_binding_missing",
        });
      } else if (sampleExposureId !== exposureDistributionId) {
        mismatches.push({
          scope: "form_factor_samples",
          id: row?.id ?? row?.qId ?? null,
          expectedCarrierId: carrierId,
          actualCarrierId: row?.carrierId ?? null,
          expectedExposureDistributionId: exposureDistributionId,
          actualExposureDistributionId: sampleExposureId,
          reason: "form_factor_exposure_binding_mismatch",
        });
      }
    }
  }
  const elasticClassId = carrier.regime?.elasticClassId ?? null;
  if (!concreteString(elasticClassId) || !detectedClassIds.has(elasticClassId)) {
    mismatches.push({
      scope: "elastic_regime",
      id: carrier.regime?.id ?? null,
      expectedCarrierId: carrierId,
      actualCarrierId: carrier.regime?.carrierId ?? null,
      classId: elasticClassId,
      reason: "elastic_regime_class_not_detected",
    });
  }

  return {
    applicable: true,
    required,
    passed: mismatches.length === 0,
    reason: eq30SameRecordBindingReason(mismatches),
    carrierId,
    bindings,
    mismatches,
  };
}

function eq30SameRecordBindingReason(mismatches) {
  if (mismatches.length === 0) {
    return "accepted";
  }
  const firstReason = mismatches[0]?.reason ?? "eq30_same_record_binding_mismatch";
  if (
    firstReason === "same_record_row_missing" ||
    firstReason === "same_record_row_family_missing" ||
    firstReason === "same_record_carrier_id_missing" ||
    firstReason === "form_factor_exposure_binding_missing"
  ) {
    return "same_record_binding_missing";
  }
  return "eq30_same_record_binding_mismatch";
}

function evaluateEq31SameRecordBinding(carrier) {
  if (carrier.row !== "EQ-31") {
    return {
      applicable: false,
      required: false,
      passed: true,
      reason: "not_applicable",
      carrierId: carrier?.id ?? null,
      bindings: [],
      mismatches: [],
    };
  }
  const required = isAcceptedStatus(carrier?.retainedStatus ?? carrier?.status);
  const carrierId = carrier?.id ?? null;
  const bindings = [];
  const mismatches = [];
  if (!required) {
    return {
      applicable: true,
      required: false,
      passed: true,
      reason: "not_required_until_carrier_accepted",
      carrierId,
      bindings,
      mismatches,
    };
  }
  if (!concreteString(carrierId)) {
    return {
      applicable: true,
      required,
      passed: false,
      reason: "carrier_identity_not_concrete",
      carrierId,
      bindings,
      mismatches: [
        {
          scope: "carrier",
          id: null,
          expectedCarrierId: "concrete_carrier_id",
          actualCarrierId: carrierId,
          reason: "carrier_identity_not_concrete",
        },
      ],
    };
  }
  const addBinding = (scope, row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      mismatches.push({
        scope,
        id: null,
        expectedCarrierId: carrierId,
        actualCarrierId: null,
        reason: "same_record_row_missing",
      });
      return;
    }
    const rowId = row.id ?? row.corridorId ?? row.regionId ?? null;
    const actualCarrierId = row.carrierId ?? null;
    const binding = {
      scope,
      id: rowId,
      expectedCarrierId: carrierId,
      actualCarrierId,
    };
    bindings.push(binding);
    if (!concreteString(actualCarrierId)) {
      mismatches.push({
        ...binding,
        reason: "same_record_carrier_id_missing",
      });
      return;
    }
    if (actualCarrierId !== carrierId) {
      mismatches.push({
        ...binding,
        reason: "same_record_carrier_id_mismatch",
      });
    }
  };
  const addFamilyBindings = (scope, rows) => {
    if (!Array.isArray(rows) || rows.length === 0) {
      mismatches.push({
        scope,
        id: null,
        expectedCarrierId: carrierId,
        actualCarrierId: null,
        reason: "same_record_row_family_missing",
      });
      return;
    }
    rows.forEach((row, index) => addBinding(`${scope}[${index}]`, row));
  };

  addBinding("W", carrier.window);
  addBinding("Phi_T", carrier.transitionMap);
  addBinding("mu_star_T", carrier.finiteMeasure);
  addBinding("Q", carrier.coarseGraining);
  addBinding("K_det", carrier.detectorKernel);
  addBinding("B", carrier.outcomePartition);
  addBinding("S_retune", carrier.noHiddenRetuneWitness);
  addBinding("C_semantics", carrier.corridorSemantics);
  addFamilyBindings("C", carrier.exitCorridors);
  addFamilyBindings(
    "first_exit_preimages",
    carrier.corridorSemantics?.firstExitPreimageRows,
  );
  addBinding("null_separatrix", carrier.nullSeparatrix);
  addFamilyBindings("null_separatrix.measure_rows", carrier.nullSeparatrix?.measureRows);
  addBinding("refinement_compatibility", carrier.refinementCompatibility);
  addFamilyBindings(
    "refinement_compatibility.restriction_rows",
    carrier.refinementCompatibility?.restrictionRows,
  );

  const corridorIds = new Set(
    Array.isArray(carrier.exitCorridors)
      ? carrier.exitCorridors.map((row) => row?.id).filter(concreteString)
      : [],
  );
  for (const row of carrier.corridorSemantics?.firstExitPreimageRows ?? []) {
    const corridorId = row?.corridorId ?? null;
    if (!concreteString(corridorId) || !corridorIds.has(corridorId)) {
      mismatches.push({
        scope: "first_exit_preimages",
        id: row?.id ?? null,
        expectedCarrierId: carrierId,
        actualCarrierId: row?.carrierId ?? null,
        corridorId,
        reason: "first_exit_preimage_corridor_not_bound",
      });
    }
  }
  for (const row of carrier.refinementCompatibility?.restrictionRows ?? []) {
    const corridorId = row?.corridorId ?? null;
    const regionId = row?.regionId ?? null;
    if (
      concreteString(corridorId) &&
      corridorIds.size > 0 &&
      !corridorIds.has(corridorId)
    ) {
      mismatches.push({
        scope: "refinement_compatibility.restriction_rows",
        id: row?.id ?? null,
        expectedCarrierId: carrierId,
        actualCarrierId: row?.carrierId ?? null,
        corridorId,
        reason: "refinement_corridor_not_bound",
      });
    }
    if (!concreteString(corridorId) && !concreteString(regionId)) {
      mismatches.push({
        scope: "refinement_compatibility.restriction_rows",
        id: row?.id ?? null,
        expectedCarrierId: carrierId,
        actualCarrierId: row?.carrierId ?? null,
        reason: "refinement_restriction_target_missing",
      });
    }
  }

  return {
    applicable: true,
    required,
    passed: mismatches.length === 0,
    reason: eq31SameRecordBindingReason(mismatches),
    carrierId,
    bindings,
    mismatches,
  };
}

function eq31SameRecordBindingReason(mismatches) {
  if (mismatches.length === 0) {
    return "accepted";
  }
  const firstReason = mismatches[0]?.reason ?? "eq31_same_record_binding_mismatch";
  if (
    firstReason === "same_record_row_missing" ||
    firstReason === "same_record_row_family_missing" ||
    firstReason === "same_record_carrier_id_missing"
  ) {
    return "same_record_binding_missing";
  }
  return "eq31_same_record_binding_mismatch";
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
  const firstMissingEvidenceSource = rows.find(
    (row) =>
      !sourceEvidenceReferenceExists(row.sourcePath) &&
      !sourceEvidenceReferenceExists(row.source),
  );
  if (firstMissingEvidenceSource) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "accepted_without_evidence_source",
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
  const firstMissingEvidenceSource = corridors.find(
    (corridor) =>
      !sourceEvidenceReferenceExists(corridor.sourcePath) &&
      !sourceEvidenceReferenceExists(corridor.source),
  );
  if (firstMissingEvidenceSource) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "accepted_without_evidence_source",
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
  if (
    !sourceEvidenceReferenceExists(row.sourcePath) &&
    !sourceEvidenceReferenceExists(row.source)
  ) {
    return {
      id,
      status,
      accepted: false,
      reason: "accepted_without_evidence_source",
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
  carrierAcceptance,
  retainedAcceptance,
  massRows,
  carrier,
  eq14,
  eq14Acceptance,
  corridorDiagnostics,
  eq30,
  eq30Acceptance,
  eq30SameRecordBinding,
  eq31SameRecordBinding,
) {
  if (!massRows.massClosurePassed) {
    return "blocked_corridor_measure_exceeds_window_measure";
  }
  if (carrier.retainedStatus && !isAcceptedStatus(carrier.retainedStatus)) {
    return carrier.retainedStatus === "toy"
      ? "toy_structure_only"
      : "blocked_carrier_not_retained";
  }
  if (!carrierAcceptance.accepted) {
    return "blocked_carrier_source_evidence";
  }
  if (!retainedAcceptance.accepted) {
    return "blocked_missing_accepted_retained_rows";
  }
  if (carrier.row === "EQ-14") {
    if (!eq14Acceptance.accepted) {
      return "blocked_missing_accepted_eq14_rows";
    }
    if (!eq14.computed) {
      return "blocked_missing_eq14_projection_rows";
    }
    if (!eq14.sameMeasureFlowPass) {
      return "blocked_eq14_measure_flow_split";
    }
    if (!eq14.continuityPass) {
      return "blocked_eq14_continuity_residual";
    }
    if (!eq14.densityReferencePass) {
      return "blocked_eq14_density_reference_residual";
    }
    if (!eq14.currentReferencePass) {
      return "blocked_eq14_current_reference_residual";
    }
    return "accepted_retained_statistical_carrier";
  }
  if (carrier.row === "EQ-30") {
    if (!eq30Acceptance.accepted) {
      return "blocked_missing_accepted_eq30_rows";
    }
    if (!eq30SameRecordBinding.passed) {
      return "blocked_eq30_same_record_binding";
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
  if (carrier.row === "EQ-31" && !eq31SameRecordBinding.passed) {
    return "blocked_eq31_same_record_binding";
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
  carrierAcceptance,
  retainedAcceptance,
  massRows,
  carrier,
  eq14,
  eq14Acceptance,
  eq30,
  eq30Acceptance,
  eq30SameRecordBinding,
  eq31SameRecordBinding,
  eq31,
  corridorDiagnostics,
}) {
  if (!massRows.massClosurePassed) {
    return "corridor_measure_exceeds_window_measure";
  }
  if (requiresCorridorFamily(carrier) && !eq31.computed) {
    return "missing_positive_escape_measure";
  }
  if (!carrierAcceptance.accepted) {
    return carrierAcceptance.reason;
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
  if (carrier.row === "EQ-14") {
    if (eq14Acceptance.missingAcceptedRows.length > 0) {
      return `missing_accepted_${eq14Acceptance.missingAcceptedRows[0]}`;
    }
    if (!eq14.computed) {
      return "missing_eq14_projection_rows";
    }
    if (!eq14.sameMeasureFlowPass) {
      return "eq14_measure_flow_split";
    }
    if (!eq14.continuityPass) {
      return "eq14_continuity_residual";
    }
    if (!eq14.densityReferencePass) {
      return "eq14_density_reference_residual";
    }
    if (!eq14.currentReferencePass) {
      return "eq14_current_reference_residual";
    }
    return topCarrierNotRetainedBlocker(carrier);
  }
  if (carrier.row === "EQ-30") {
    if (eq30Acceptance.missingAcceptedRows.length > 0) {
      return `missing_accepted_${eq30Acceptance.missingAcceptedRows[0]}`;
    }
    if (!eq30SameRecordBinding.passed) {
      return eq30SameRecordBinding.reason;
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
    return topCarrierNotRetainedBlocker(carrier);
  }
  if (carrier.row === "EQ-31" && !eq31SameRecordBinding.passed) {
    return eq31SameRecordBinding.reason;
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
  return topCarrierNotRetainedBlocker(carrier);
}

function firstBlockerDetails(nextBlocker, context) {
  if (!nextBlocker) {
    return null;
  }
  const {
    retainedAcceptance,
    carrierAcceptance,
    massRows,
    carrier,
    eq14Acceptance,
    eq30Acceptance,
    eq30SameRecordBinding,
    eq31SameRecordBinding,
    eq31,
    corridorDiagnostics,
  } = context;
  if (nextBlocker === "corridor_measure_exceeds_window_measure") {
    return {
      reason: "corridor_measure_exceeds_window_measure",
      corridorMass: massRows.corridorMass,
      totalMass: massRows.totalMass,
      residual: massRows.massResidual,
      tolerance: massRows.tolerance,
    };
  }
  if (nextBlocker === "missing_positive_escape_measure") {
    return {
      reason: "eq31_escape_measure_not_computed",
      row: carrier.row ?? null,
      corridorCount: Array.isArray(carrier.exitCorridors)
        ? carrier.exitCorridors.length
        : 0,
      eq31Computed: eq31.computed,
    };
  }
  if (nextBlocker === "top_carrier_not_retained") {
    return {
      reason: nextBlocker,
      row: carrier.row ?? null,
      carrierId: carrier.id ?? null,
      retainedStatus: carrier.retainedStatus ?? carrier.status ?? null,
      sourcePath: carrierAcceptance.sourcePath,
      sourceReferenceExists: carrierAcceptance.sourceReferenceExists,
      sourceEvidenceReferenceExists: carrierAcceptance.sourceEvidenceReferenceExists,
    };
  }
  if (
    nextBlocker === "accepted_without_evidence_source" ||
    nextBlocker === "carrier_source_not_found" ||
    nextBlocker === "carrier_identity_not_concrete" ||
    nextBlocker === "carrier_source_contract_mismatch"
  ) {
    return {
      reason: nextBlocker,
      row: carrier.row ?? null,
      carrierId: carrier.id ?? null,
      retainedStatus: carrier.retainedStatus ?? null,
      sourcePath: carrierAcceptance.sourcePath,
      sourceReferenceExists: carrierAcceptance.sourceReferenceExists,
      sourceEvidenceReferenceExists: carrierAcceptance.sourceEvidenceReferenceExists,
    };
  }
  const retainedId = missingIdFor(nextBlocker, retainedAcceptance.missingAcceptedRows);
  if (retainedId) {
    return rowBlockerDetails(
      retainedId,
      retainedAcceptance.rowStatuses,
      retainedCarrierRow(retainedId, carrier),
    );
  }
  if (nextBlocker === "finite_measure_invariance_residual") {
    return {
      ...rowBlockerDetails(
        "mu_star_T",
        retainedAcceptance.rowStatuses,
        carrier.finiteMeasure,
      ),
      invarianceResidual: retainedAcceptance.invarianceResidual,
    };
  }
  if (nextBlocker === "no_hidden_retune_witness") {
    return {
      ...rowBlockerDetails(
        "S_retune",
        retainedAcceptance.rowStatuses,
        carrier.noHiddenRetuneWitness,
      ),
      hiddenRetuneResidual: retainedAcceptance.hiddenRetuneResidual,
    };
  }
  const eq14Id = missingIdFor(nextBlocker, eq14Acceptance.missingAcceptedRows);
  if (eq14Id) {
    return rowBlockerDetails(
      eq14Id,
      eq14Acceptance.rowStatuses,
      eq14CarrierRow(eq14Id, carrier),
    );
  }
  const eq30Id = missingIdFor(nextBlocker, eq30Acceptance.missingAcceptedRows);
  if (eq30Id) {
    return rowBlockerDetails(
      eq30Id,
      eq30Acceptance.rowStatuses,
      eq30CarrierRow(eq30Id, carrier),
    );
  }
  if (
    carrier.row === "EQ-30" &&
    eq30SameRecordBinding?.passed === false &&
    nextBlocker === eq30SameRecordBinding.reason
  ) {
    return {
      reason: nextBlocker,
      carrierId: eq30SameRecordBinding.carrierId ?? null,
      mismatchCount: eq30SameRecordBinding.mismatches?.length ?? 0,
      firstMismatch: eq30SameRecordBinding.mismatches?.[0] ?? null,
    };
  }
  if (
    carrier.row === "EQ-31" &&
    eq31SameRecordBinding?.passed === false &&
    nextBlocker === eq31SameRecordBinding.reason
  ) {
    return {
      reason: nextBlocker,
      carrierId: eq31SameRecordBinding.carrierId ?? null,
      mismatchCount: eq31SameRecordBinding.mismatches?.length ?? 0,
      firstMismatch: eq31SameRecordBinding.mismatches?.[0] ?? null,
    };
  }
  if (nextBlocker === "missing_first_exit_corridor_semantics") {
    return {
      reason: corridorDiagnostics.firstExit.reason,
      corridorSemantics: summarizeRow(carrier.corridorSemantics, [
        "mode",
        "basinId",
        "boundaryId",
        "detectorKernelStage",
      ]),
    };
  }
  if (nextBlocker === "null_separatrix_positive_mass") {
    return {
      reason: corridorDiagnostics.nullSeparatrix.reason,
      nullSeparatrix: summarizeRow(carrier.nullSeparatrix, [
        "epsilon",
        "neighborhoodMass",
        "tolerance",
      ]),
    };
  }
  if (nextBlocker === "refinement_cocycle_defect") {
    return {
      reason: corridorDiagnostics.refinementCompatibility.reason,
      refinementCompatibility: summarizeRow(
        carrier.refinementCompatibility,
        ["cocycleDefect", "tolerance"],
      ),
    };
  }
  return {
    blocker: nextBlocker,
    reason: "first_blocker_without_row_detail",
  };
}

function topCarrierNotRetainedBlocker(carrier) {
  const status = carrier?.retainedStatus ?? carrier?.status ?? null;
  if (status && status !== "toy" && !isAcceptedStatus(status)) {
    return "top_carrier_not_retained";
  }
  return null;
}

function missingIdFor(nextBlocker, missingAcceptedRows) {
  return missingAcceptedRows.find(
    (id) => nextBlocker === `missing_accepted_${id}`,
  );
}

function retainedCarrierRow(id, carrier) {
  if (id === "W") return carrier.window;
  if (id === "Phi_T") return carrier.transitionMap;
  if (id === "mu_star_T") return carrier.finiteMeasure;
  if (id === "Q") return carrier.coarseGraining;
  if (id === "K_det") return carrier.detectorKernel;
  if (id === "B") return carrier.outcomePartition;
  if (id === "S_retune") return carrier.noHiddenRetuneWitness;
  if (id === "C") return carrier.exitCorridors ?? [];
  return null;
}

function eq14CarrierRow(id, carrier) {
  if (id === "Theta_rhoJ") return carrier.recordCurrentProjection;
  if (id === "record_current_samples") return carrier.recordCurrentSamples ?? [];
  return null;
}

function eq30CarrierRow(id, carrier) {
  if (id === "Gamma_a") return carrier.preparedEnsemble;
  if (id === "Phi_in") return carrier.fluxCalibration;
  if (id === "detected_class_measures") return carrier.detectedClassMeasures ?? [];
  if (id === "cross_section_comparisons") {
    return carrier.crossSectionComparisons ?? [];
  }
  if (id === "rho_exp") return carrier.exposureDistribution;
  if (id === "form_factor_samples") return carrier.formFactorSamples ?? [];
  if (id === "elastic_regime") return carrier.regime;
  return null;
}

function rowBlockerDetails(id, rowStatuses, rowOrRows) {
  const rowStatus = rowStatuses.find((row) => row.id === id) ?? {};
  if (Array.isArray(rowOrRows)) {
    return rowFamilyBlockerDetails(id, rowStatus, rowOrRows);
  }
  const sourcePath = rowOrRows?.sourcePath ?? rowOrRows?.source ?? null;
  return {
    id,
    status: rowStatus.status ?? rowOrRows?.retainedStatus ?? rowOrRows?.status ?? null,
    retainedStatus: rowOrRows?.retainedStatus ?? null,
    accepted: rowStatus.accepted ?? false,
    reason: rowStatus.reason ?? "missing_row",
    rowId: rowOrRows?.id ?? null,
    sourcePath,
    sourceReferenceExists: sourceReferenceExists(sourcePath),
    sourceEvidenceReferenceExists: sourceEvidenceReferenceExists(sourcePath),
  };
}

function rowFamilyBlockerDetails(id, rowStatus, rows) {
  const firstRelevantRow =
    rows.find(
      (row) =>
        row &&
        typeof row === "object" &&
        !isAcceptedStatus(row.retainedStatus ?? row.status),
    ) ??
    rows.find(
      (row) =>
        row &&
        typeof row === "object" &&
        "ledgerStatus" in row &&
        !isAcceptedStatus(row.ledgerStatus),
    ) ??
    rows.find(
      (row) =>
        row &&
        typeof row === "object" &&
        !concreteString(row.id ?? row.classId ?? row.qId),
    ) ??
    rows.find(
      (row) =>
        row &&
        typeof row === "object" &&
        !sourceReferenceExists(row.sourcePath) &&
        !sourceReferenceExists(row.source),
    ) ??
    rows[0] ??
    null;
  const sourcePath = firstRelevantRow?.sourcePath ?? firstRelevantRow?.source ?? null;
  return {
    id,
    status: rowStatus.status ?? firstRelevantRow?.retainedStatus ?? null,
    accepted: rowStatus.accepted ?? false,
    reason: rowStatus.reason ?? "missing_row_family",
    rowFamilyCount: rows.length,
    firstRowId:
      firstRelevantRow?.id ??
      firstRelevantRow?.classId ??
      firstRelevantRow?.qId ??
      null,
    firstRowStatus:
      firstRelevantRow?.retainedStatus ?? firstRelevantRow?.status ?? null,
    firstRowLedgerStatus: firstRelevantRow?.ledgerStatus ?? null,
    firstRowSourcePath: sourcePath,
    firstRowSourceReferenceExists: sourceReferenceExists(sourcePath),
    firstRowSourceEvidenceReferenceExists: sourceEvidenceReferenceExists(sourcePath),
  };
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
  const resolvedPath = resolveSourcePath(value);
  if (isNonDurableSourcePath(resolvedPath)) {
    return false;
  }
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
}

function sourceEvidenceReferenceExists(value) {
  if (!sourceReferenceExists(value)) {
    return false;
  }
  return isEvidenceSourcePath(resolveSourcePath(value));
}

function resolveSourcePath(value) {
  const source = value.trim();
  return path.isAbsolute(source) ? path.normalize(source) : path.resolve(REPO_ROOT, source);
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
  if (isRuntimeOrCheckerSourcePath(relative)) {
    return false;
  }
  const lowerBasename = path.basename(normalized).toLowerCase();
  return !(
    lowerBasename.includes("attempt") ||
    lowerBasename.includes("toy") ||
    lowerBasename.includes("source-contract") ||
    lowerBasename.includes("source-evidence-probe") ||
    lowerBasename.includes("probe") ||
    lowerBasename.includes("mock") ||
    lowerBasename.includes("negative-control")
  );
}

function isRuntimeOrCheckerSourcePath(relativePath) {
  const lowerRelative = relativePath.toLowerCase();
  const lowerBasename = path.basename(relativePath).toLowerCase();
  return (
    lowerRelative.startsWith(`scripts${path.sep}`) &&
    (lowerBasename.endsWith(".mjs") ||
      lowerBasename.endsWith(".js") ||
      lowerBasename.includes("residual") ||
      lowerBasename.includes("checker") ||
      lowerBasename.includes("check"))
  );
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

function maxFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.max(...finiteValues) : null;
}

function chooseSmallestEpsilonRow(rows) {
  const validRows = rows.filter((row) => row.valid);
  if (validRows.length === 0) {
    return null;
  }
  return validRows.reduce((best, row) =>
    row.epsilon < best.epsilon ? row : best,
  );
}

function chooseFinestDefectRow(rows) {
  const validRows = rows.filter((row) => row.valid);
  if (validRows.length === 0) {
    return null;
  }
  const rowsWithEll = validRows.filter((row) => row.ell !== null);
  if (rowsWithEll.length > 0) {
    return rowsWithEll.reduce((best, row) =>
      row.ell < best.ell ? row : best,
    );
  }
  return validRows[validRows.length - 1];
}

function monotonicallyDecreasesByEpsilon(rows, key) {
  const validRows = rows
    .filter((row) => row.valid)
    .sort((left, right) => right.epsilon - left.epsilon);
  return monotonicallyDecreasesInInputOrder(validRows, key);
}

function monotonicallyDecreasesInInputOrder(rows, key) {
  const validRows = rows.filter(
    (row) => row.valid && Number.isFinite(row[key]),
  );
  if (validRows.length <= 1) {
    return true;
  }
  return validRows.every(
    (row, index) => index === 0 || row[key] <= validRows[index - 1][key],
  );
}
