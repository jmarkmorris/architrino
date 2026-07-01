#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "collins-soper-angular-coefficient-retained-branch-instance.v1.json",
);
const INPUT_SCHEMA =
  "aaa-equation-map-collins-soper-angular-coefficient-projection-input/v1";
const SWEEP_INPUT_SCHEMA =
  "aaa-equation-map-collins-soper-angular-coefficient-projection-sweep/v1";
const OUTPUT_SCHEMA =
  "aaa-equation-map-collins-soper-angular-coefficient-projection-check/v1";
const SWEEP_OUTPUT_SCHEMA =
  "aaa-equation-map-collins-soper-angular-coefficient-projection-sweep-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const COEFFICIENT_ORDER = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7"];
const NATIVE_DERIVED_SOURCE_KINDS = new Set([
  "native_weak_corridor_dynamics",
  "retained_weak_corridor_branch_dynamics",
]);
const BRANCH_DYNAMICS_COMPONENTS = [
  {
    component: "T_even_L",
    coefficient: "A0",
    sourceTerm: "evenTensor.longitudinalTraceFree",
  },
  {
    component: "T_even_xz",
    coefficient: "A1",
    sourceTerm: "evenTensor.xz",
  },
  {
    component: "T_even_xx_minus_yy",
    coefficient: "A2",
    sourceTerm: "evenTensor.xxMinusYy",
  },
  {
    component: "P_weak_x",
    coefficient: "A3",
    sourceTerm: "parityVector.x",
  },
  {
    component: "P_weak_z",
    coefficient: "A4",
    sourceTerm: "parityVector.z",
  },
  {
    component: "W_odd_xy",
    coefficient: "A5",
    sourceTerm: "wakeOddTensor.xy",
  },
  {
    component: "W_odd_zy",
    coefficient: "A6",
    sourceTerm: "wakeOddTensor.zy",
  },
  {
    component: "P_weak_y",
    coefficient: "A7",
    sourceTerm: "parityVector.y",
  },
];
const BRANCH_DYNAMICS_CONTRIBUTION_KEYS = [
  "sourceDepletion",
  "recoilBalance",
  "noetherSeaResponse",
  "corridorOrientation",
  "wakeBalance",
];
const REQUIRED_ROWS = [
  "source_branch_chart",
  "neutral_corridor_branch_chart",
  "corridor_orientation_axis",
  "source_depletion",
  "recoil_balance",
  "noether_sea_response",
  "detector_provenance",
  "visible_lepton_momenta",
  "angular_basis_projection",
  "coefficient_covariance_comparison",
];
const DEFAULT_TOLERANCES = {
  weightNormalization: 1e-12,
  projectionAngle: 1e-10,
  coefficient: 1e-9,
  componentStability: 1e-12,
  componentUniqueness: 1e-12,
  aFB: 1e-12,
  chi2: 1e-8,
};
const FORBIDDEN_PRIMITIVE_MARKERS = [
  "intrinsicspin",
  "intrinsicspinprimitive",
  "intrinsic_spin",
  "assignedspin",
  "spinprimitive",
  "helicityprimitive",
  "helicitydensity",
  "helicityfractionprimitive",
  "spindensitymatrix",
  "densitymatrixprimitive",
  "polarizationprimitive",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const sidecars = readSidecars(args);
const output = args.sweep
  ? evaluateSweep(readJson(path.resolve(args.sweep)), path.resolve(args.sweep), args, sidecars)
  : evaluateInputPath(path.resolve(args.input), args, sidecars);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}
if (args.requireNativeDerived && output.summary.requireNativeDerivedPass !== true) {
  process.exitCode = 1;
}
if (
  args.requireBranchDynamicsDerived &&
  output.summary.requireBranchDynamicsDerivedPass !== true
) {
  process.exitCode = 1;
}
if (
  args.requireComponentStability &&
  output.summary.requireComponentStabilityPass !== true
) {
  process.exitCode = 1;
}
if (
  args.requireComponentUniqueness &&
  output.summary.requireComponentUniquenessPass !== true
) {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
    sweep: null,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
    requireNativeDerived: false,
    requireBranchDynamicsDerived: false,
    requireComponentStability: false,
    requireComponentUniqueness: false,
    componentStabilityProbes: null,
    componentUniquenessCertificate: null,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--sweep") {
      parsed.sweep = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-populated") {
      parsed.requirePopulated = true;
    } else if (arg === "--require-native-derived") {
      parsed.requireNativeDerived = true;
    } else if (arg === "--require-branch-dynamics-derived") {
      parsed.requireBranchDynamicsDerived = true;
    } else if (arg === "--require-component-stability") {
      parsed.requireComponentStability = true;
    } else if (arg === "--component-stability-probes") {
      parsed.componentStabilityProbes = argv[++index];
    } else if (arg === "--require-component-uniqueness") {
      parsed.requireComponentUniqueness = true;
    } else if (arg === "--component-uniqueness-certificate") {
      parsed.componentUniquenessCertificate = argv[++index];
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs [options]

Options:
  --input PATH          Collins-Soper projection input JSON.
  --sweep PATH          Collins-Soper projection sweep JSON with multiple cases.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the projection instance is populated.
  --require-native-derived
                       Exit nonzero unless A0..A7 come from native weak-corridor dynamics.
  --require-branch-dynamics-derived
                       Exit nonzero unless A0..A7 come from retained weak-corridor branch dynamics.
  --require-component-stability
                       Exit nonzero unless retained branch-dynamics component probes preserve A0..A7.
  --component-stability-probes PATH
                       Read component-stability probes from a JSON sidecar.
  --require-component-uniqueness
                       Exit nonzero unless retained branch-dynamics component split is rank-certified.
  --component-uniqueness-certificate PATH
                       Read component-uniqueness certificate constraints from a JSON sidecar.
  --help                Show this help.

This checker is score-neutral. It tests whether a retained branch-chart event
family can be projected through detector-level lepton momenta into the
Collins-Soper angular basis, recover A0..A7 by moments, and compare the result
with a covariance matrix without importing intrinsic spin, helicity, or
density-matrix labels as primitives.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readSidecars(parsedArgs) {
  return {
    componentStabilityProbes: parsedArgs.componentStabilityProbes
      ? readJson(path.resolve(parsedArgs.componentStabilityProbes))
      : null,
    componentUniquenessCertificate: parsedArgs.componentUniquenessCertificate
      ? readJson(path.resolve(parsedArgs.componentUniquenessCertificate))
      : null,
  };
}

function evaluateInputPath(inputPath, parsedArgs, sidecars) {
  const input = readJson(inputPath);
  return evaluateProjection(prepareInputForEvaluation(input, parsedArgs, sidecars), inputPath);
}

function prepareInputForEvaluation(input, parsedArgs, sidecars) {
  const inputWithStabilityProbes = sidecars.componentStabilityProbes
    ? mergeComponentStabilityProbes(input, sidecars.componentStabilityProbes)
    : input;
  const inputWithUniquenessCertificate = sidecars.componentUniquenessCertificate
    ? mergeComponentUniquenessCertificate(
        inputWithStabilityProbes,
        sidecars.componentUniquenessCertificate,
      )
    : inputWithStabilityProbes;
  return applyCliControls(inputWithUniquenessCertificate, parsedArgs);
}

function evaluateSweep(sweepInput, sweepPath, parsedArgs, sidecars) {
  const sweepDirectory = path.dirname(sweepPath);
  const baseInputPath = path.resolve(
    sweepDirectory,
    sweepInput.baseInputPath ?? DEFAULT_INPUT_PATH,
  );
  const baseInput = readJson(baseInputPath);
  const cases = Array.isArray(sweepInput.cases) ? sweepInput.cases : [];
  const evaluatedCases = cases.map((sweepCase, index) => {
    const materializedInput = materializeSweepCase({
      baseInput,
      sweepInput,
      sweepCase,
      index,
    });
    const preparedInput = prepareInputForEvaluation(materializedInput, parsedArgs, sidecars);
    const output = evaluateProjection(
      preparedInput,
      `${sweepPath}#${sweepCase.caseId ?? index + 1}`,
    );
    return {
      caseId: sweepCase.caseId ?? `case_${index + 1}`,
      benchmarkBin: preparedInput.measurement?.benchmarkBin ?? null,
      pTZGeV: sweepCase.pTZGeV ?? null,
      output,
    };
  });
  const sweepSummary = summarizeSweep({
    sweepInput,
    cases: evaluatedCases,
    schemaOk: sweepInput.schema === SWEEP_INPUT_SCHEMA,
    baseInputPath,
  });
  return {
    schema: SWEEP_OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    sweep: {
      sweepId: sweepInput.sweepId ?? null,
      sourceId: sweepInput.sourceId ?? null,
      claimLevel: sweepInput.claimLevel ?? null,
      baseInputPath: path.relative(process.cwd(), baseInputPath),
      caseCount: cases.length,
      coefficientOrder: COEFFICIENT_ORDER,
      pTZGeV: cases.map((sweepCase) => sweepCase.pTZGeV ?? null),
    },
    summary: sweepSummary,
    cases: evaluatedCases.map(({ caseId, benchmarkBin, pTZGeV, output }) => ({
      caseId,
      benchmarkBin,
      pTZGeV,
      summary: output.summary,
      componentStability: output.componentStability,
      componentUniqueness: output.componentUniqueness,
      coefficientSource: output.coefficientSource,
      comparison: {
        chi2: output.comparison.chi2,
        ndof: output.comparison.ndof,
        pulls: output.comparison.pulls,
      },
      aFB: output.aFB,
    })),
  };
}

function materializeSweepCase({ baseInput, sweepInput, sweepCase, index }) {
  const caseId = sweepCase.caseId ?? `case_${index + 1}`;
  const domainId = sweepCase.domainId ?? `${baseInput.rows?.source_branch_chart?.domainId}_${caseId}`;
  const branchRecordId =
    sweepCase.branchRecordId ??
    `${baseInput.rows?.source_branch_chart?.branchRecordId}_${caseId}`;
  const detectorProvenanceId =
    sweepCase.detectorProvenanceId ??
    baseInput.detectorProvenance?.provenanceId ??
    "D_LHC_ATLAS_8TeV_Zll_CS_v1";
  const sourcePath =
    sweepCase.sourcePath ??
    sweepInput.sourcePath ??
    baseInput.retainedWeakCorridorBranchDynamics?.sourcePath;
  const measurement = materializeSweepMeasurement(sweepInput, sweepCase);
  const componentRows =
    sweepCase.retainedWeakCorridorBranchDynamics?.componentRows ??
    sweepCase.componentRows ??
    [];
  const sourceRows =
    sweepCase.retainedWeakCorridorBranchDynamics?.sourceRows ??
    sourceRowsForSweepCase(caseId);
  const rowOverrides = {
    sourcePath,
    domainId,
    branchRecordId,
    detectorProvenanceId,
  };
  return {
    ...baseInput,
    claimLevel: sweepCase.claimLevel ?? sweepInput.caseClaimLevel ?? baseInput.claimLevel,
    projectionId:
      sweepCase.projectionId ??
      `${sweepInput.sweepId ?? baseInput.projectionId ?? "Pi_CS_Zgamma_branch_dynamics_sweep"}_${caseId}`,
    rows: Object.fromEntries(
      Object.entries(baseInput.rows ?? {}).map(([rowId, row]) => [
        rowId,
        {
          ...row,
          ...rowOverrides,
        },
      ]),
    ),
    dileptonSystem: {
      ...(baseInput.dileptonSystem ?? {}),
      ...(sweepCase.dileptonSystem ?? {}),
      ...(sweepCase.pTZGeV && !sweepCase.dileptonSystem?.transverseMomentumGeV
        ? { transverseMomentumGeV: binMidpoint(sweepCase.pTZGeV) }
        : {}),
    },
    retainedWeakCorridorBranchDynamics: {
      ...(baseInput.retainedWeakCorridorBranchDynamics ?? {}),
      ...rowOverrides,
      sourceRows,
      componentRows,
    },
    measurement,
  };
}

function materializeSweepMeasurement(sweepInput, sweepCase) {
  const rawMeasurement = sweepCase.measurement ?? {};
  const coefficientsWithUncertainties = parseSweepCoefficientEntries(
    rawMeasurement.coefficients ?? {},
  );
  return {
    sourceId: rawMeasurement.sourceId ?? sweepInput.sourceId ?? "ATLAS_arXiv_1606_00689",
    benchmarkBin: rawMeasurement.benchmarkBin ?? sweepCase.benchmarkBin ?? caseBinLabel(sweepCase),
    covarianceModel:
      rawMeasurement.covarianceModel ??
      sweepInput.covarianceModel ??
      "diagonal_from_stat_syst_quadrature",
    coefficients: Object.fromEntries(
      COEFFICIENT_ORDER.map((coefficient) => [
        coefficient,
        coefficientsWithUncertainties[coefficient].value,
      ]),
    ),
    covariance:
      rawMeasurement.covariance ??
      diagonalCovarianceFromUncertainties(coefficientsWithUncertainties),
    uncertainties: coefficientsWithUncertainties,
  };
}

function parseSweepCoefficientEntries(rawCoefficients) {
  return Object.fromEntries(
    COEFFICIENT_ORDER.map((coefficient) => {
      const entry = rawCoefficients[coefficient];
      if (typeof entry === "number") {
        return [
          coefficient,
          {
            value: finiteNumber(entry, `measurement.coefficients.${coefficient}`),
            stat: 0,
            syst: 0,
          },
        ];
      }
      return [
        coefficient,
        {
          value: finiteNumber(entry?.value, `measurement.coefficients.${coefficient}.value`),
          stat: finiteNumber(entry?.stat ?? 0, `measurement.coefficients.${coefficient}.stat`),
          syst: finiteNumber(entry?.syst ?? 0, `measurement.coefficients.${coefficient}.syst`),
        },
      ];
    }),
  );
}

function diagonalCovarianceFromUncertainties(coefficientsWithUncertainties) {
  return COEFFICIENT_ORDER.map((rowCoefficient) =>
    COEFFICIENT_ORDER.map((columnCoefficient) => {
      if (rowCoefficient !== columnCoefficient) {
        return 0;
      }
      const entry = coefficientsWithUncertainties[rowCoefficient];
      return entry.stat * entry.stat + entry.syst * entry.syst;
    }),
  );
}

function sourceRowsForSweepCase(caseId) {
  return {
    source_depletion: `Q_src_Zgamma_branch_dynamics_${caseId}_v1`,
    recoil_balance: `Q_recoil_Zgamma_branch_dynamics_${caseId}_v1`,
    noether_sea_response: `Q_sea_Zgamma_branch_dynamics_${caseId}_v1`,
    corridor_orientation_axis: `e_corr_Zgamma_branch_dynamics_${caseId}_v1`,
  };
}

function binMidpoint(range) {
  return (finiteNumber(range[0], "pTZGeV[0]") + finiteNumber(range[1], "pTZGeV[1]")) / 2;
}

function caseBinLabel(sweepCase) {
  const range = sweepCase.pTZGeV;
  const pTLabel = Array.isArray(range) ? `pTZ ${range[0]}-${range[1]} GeV` : "pTZ unspecified";
  return `${sweepCase.yZ ?? "yZ-integrated"}, ${pTLabel}`;
}

function summarizeSweep({ sweepInput, cases, schemaOk, baseInputPath }) {
  const failedCase = cases.find(({ output }) => output.summary.status !== "populated");
  const summaries = cases.map(({ output }) => output.summary);
  const all = (key) => summaries.every((summary) => summary[key] === true);
  const allRequired = (key) =>
    summaries.every((summary) => summary[key] === null)
      ? null
      : summaries.every((summary) => summary[key] === true);
  const numericValues = (key) =>
    summaries
      .map((summary) => summary[key])
      .filter((value) => typeof value === "number" && Number.isFinite(value));
  const maxValue = (key) => {
    const values = numericValues(key);
    return values.length > 0 ? Math.max(...values) : null;
  };
  const minValue = (key) => {
    const values = numericValues(key);
    return values.length > 0 ? Math.min(...values) : null;
  };
  const status = !schemaOk
    ? "blocked_sweep_schema_mismatch"
    : cases.length === 0
      ? "blocked_sweep_cases_missing"
      : failedCase
        ? "blocked_sweep_case"
        : "populated";
  return {
    status,
    scoreDecision: SCORE_DECISION,
    nextBlocker:
      status === "blocked_sweep_schema_mismatch"
        ? "sweep_schema_mismatch"
        : status === "blocked_sweep_cases_missing"
          ? "sweep_cases_missing"
          : failedCase
            ? `${failedCase.caseId}:${failedCase.output.summary.nextBlocker ?? failedCase.output.summary.status}`
            : null,
    sweepId: sweepInput.sweepId ?? null,
    sourceId: sweepInput.sourceId ?? null,
    baseInputPath: path.relative(process.cwd(), baseInputPath),
    caseCount: cases.length,
    populatedCaseCount: cases.filter(({ output }) => output.summary.status === "populated").length,
    benchmarkBins: cases.map(({ caseId, benchmarkBin, pTZGeV }) => ({
      caseId,
      benchmarkBin,
      pTZGeV,
    })),
    rowPass: all("rowPass"),
    sourceEvidencePass: all("sourceEvidencePass"),
    intrinsicPrimitivePass: all("intrinsicPrimitivePass"),
    detectorProvenancePass: all("detectorProvenancePass"),
    coefficientSourceKinds: [...new Set(summaries.map((summary) => summary.coefficientSource))],
    nativeWeakCorridorDynamicsPass: all("nativeWeakCorridorDynamicsPass"),
    retainedWeakCorridorBranchDynamicsPass: all("retainedWeakCorridorBranchDynamicsPass"),
    requireNativeDerivedPass: allRequired("requireNativeDerivedPass"),
    requireBranchDynamicsDerivedPass: allRequired("requireBranchDynamicsDerivedPass"),
    componentStabilityPass: all("componentStabilityPass"),
    componentStabilityProbeCountTotal: summaries.reduce(
      (sum, summary) => sum + (summary.componentStabilityProbeCount ?? 0),
      0,
    ),
    requireComponentStabilityPass: allRequired("requireComponentStabilityPass"),
    componentUniquenessPass: all("componentUniquenessPass"),
    componentUniquenessComponentCountTotal: summaries.reduce(
      (sum, summary) => sum + (summary.componentUniquenessComponentCount ?? 0),
      0,
    ),
    componentUniquenessMinRank: minValue("componentUniquenessMinRank"),
    componentUniquenessMaxSolutionResidual: maxValue(
      "componentUniquenessMaxSolutionResidual",
    ),
    requireComponentUniquenessPass: allRequired("requireComponentUniquenessPass"),
    measurementPass: all("measurementPass"),
    generatedEventCountTotal: summaries.reduce(
      (sum, summary) => sum + (summary.generatedEventCount ?? 0),
      0,
    ),
    maxProjectionAngleResidual: maxValue("maxProjectionAngleResidual"),
    maxCoefficientResidual: maxValue("maxCoefficientResidual"),
    maxChi2: maxValue("chi2"),
    maxAFBResidual: maxValue("aFBResidual"),
    failedCases: cases
      .filter(({ output }) => output.summary.status !== "populated")
      .map(({ caseId, output }) => ({
        caseId,
        status: output.summary.status,
        nextBlocker: output.summary.nextBlocker,
      })),
  };
}

function mergeComponentStabilityProbes(input, probePayload) {
  const probes = probePayload.componentStabilityProbes ?? probePayload.probes ?? [];
  return {
    ...input,
    retainedWeakCorridorBranchDynamics: {
      ...(input.retainedWeakCorridorBranchDynamics ?? {}),
      componentStabilityProbes: probes,
      componentStabilityProbeSetId:
        probePayload.probeSetId ?? probePayload.sourceId ?? probePayload.schema ?? null,
    },
  };
}

function mergeComponentUniquenessCertificate(input, certificatePayload) {
  const certificate =
    certificatePayload.componentUniquenessCertificate ?? certificatePayload.certificate ?? {};
  return {
    ...input,
    retainedWeakCorridorBranchDynamics: {
      ...(input.retainedWeakCorridorBranchDynamics ?? {}),
      componentUniquenessCertificate: certificate,
      componentUniquenessCertificateId:
        certificatePayload.certificateId ??
        certificate.certificateId ??
        certificatePayload.sourceId ??
        certificatePayload.schema ??
        null,
    },
  };
}

function applyCliControls(input, parsedArgs) {
  const controlOverrides = {
    ...(parsedArgs.requireNativeDerived ? { requireNativeDerived: true } : {}),
    ...(parsedArgs.requireBranchDynamicsDerived
      ? { requireBranchDynamicsDerived: true }
      : {}),
    ...(parsedArgs.requireComponentStability ? { requireComponentStability: true } : {}),
    ...(parsedArgs.requireComponentUniqueness ? { requireComponentUniqueness: true } : {}),
  };
  if (Object.keys(controlOverrides).length === 0) {
    return input;
  }
  return {
    ...input,
    controls: {
      ...(input.controls ?? {}),
      ...controlOverrides,
    },
  };
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

function evaluateProjection(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const rowChecks = evaluateRows(input.rows ?? {});
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const sourceEvidence = evaluateSourceEvidence(rowChecks);
  const ontology = evaluateOntologyPrimitiveBoundary(input);
  const detector = evaluateDetectorProvenance(input.detectorProvenance ?? {});
  const coefficientSource = resolveCoefficientSource(input);
  const controls = evaluateControls(input.controls ?? {}, coefficientSource);
  const componentStability = evaluateComponentStability(
    input.retainedWeakCorridorBranchDynamics?.componentStabilityProbes ??
      input.componentStabilityProbes ??
      [],
    coefficientSource,
    tolerances,
    input.retainedWeakCorridorBranchDynamics?.componentStabilityProbeSetId ?? null,
  );
  const componentUniqueness = evaluateComponentUniqueness(
    input.retainedWeakCorridorBranchDynamics?.componentUniquenessCertificate ?? null,
    coefficientSource,
    tolerances,
    input.retainedWeakCorridorBranchDynamics?.componentUniquenessCertificateId ?? null,
  );
  const measurement = evaluateMeasurement(input.measurement ?? {});
  const simulation = buildProjectionSimulation({
    coefficients: coefficientSource.coefficients.values,
    dileptonSystem: input.dileptonSystem ?? {},
    quadrature: input.quadrature ?? {},
  });
  const coefficientResidual = computeCoefficientResidual(
    simulation.extractedCoefficients.values,
    coefficientSource.coefficients.values,
  );
  const comparison = compareWithMeasurement({
    extracted: simulation.extractedCoefficients.values,
    measurement,
  });
  const aFB = evaluateAFB(simulation.extractedCoefficients.values, measurement.coefficients.values);
  const status = decideStatus({
    schemaOk: input.schema === INPUT_SCHEMA,
    missingRows,
    sourceEvidence,
    ontology,
    detector,
    coefficientSource,
    controls,
    componentStability,
    componentUniqueness,
    measurement,
    simulation,
    coefficientResidual,
    comparison,
    aFB,
    tolerances,
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
    projection: {
      id: input.projectionId ?? null,
      row: "Collins-Soper Z/gamma* angular coefficients",
      scoreDecision: SCORE_DECISION,
      claimLevel:
        "score-neutral retained branch-chart projection instance; branch geometry generation remains a separate proof burden",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        sourceEvidence,
        ontology,
        detector,
        coefficientSource,
        controls,
        componentStability,
        componentUniqueness,
        measurement,
        simulation,
        coefficientResidual,
        comparison,
        aFB,
        tolerances,
      }),
      rowPass: missingRows.length === 0,
      missingRows,
      sourceEvidencePass: sourceEvidence.passed,
      intrinsicPrimitivePass: ontology.passed,
      detectorProvenancePass: detector.passed,
      coefficientSource: coefficientSource.kind,
      coefficientSourcePass: coefficientSource.passed,
      nativeWeakCorridorDynamicsPass:
        coefficientSource.nativeWeakCorridorDynamics?.passed ?? false,
      retainedWeakCorridorBranchDynamicsPass:
        coefficientSource.retainedWeakCorridorBranchDynamics?.passed ?? false,
      requireNativeDerivedPass: controls.requireNativeDerived
        ? controls.nativeDerivedPass
        : null,
      requireBranchDynamicsDerivedPass: controls.requireBranchDynamicsDerived
        ? controls.branchDynamicsDerivedPass
        : null,
      componentStabilityPass: componentStability.passed,
      componentStabilityProbeCount: componentStability.probeCount,
      requireComponentStabilityPass: controls.requireComponentStability
        ? componentStability.passed
        : null,
      componentUniquenessPass: componentUniqueness.passed,
      componentUniquenessComponentCount: componentUniqueness.componentCount,
      componentUniquenessMinRank: componentUniqueness.minRank,
      componentUniquenessMaxSolutionResidual: componentUniqueness.maxSolutionResidual,
      requireComponentUniquenessPass: controls.requireComponentUniqueness
        ? componentUniqueness.passed
        : null,
      measurementPass: measurement.passed,
      generatedEventCount: simulation.eventCount,
      weightNormalizationResidual: simulation.weightNormalizationResidual,
      weightNormalizationPass:
        simulation.weightNormalizationResidual <= tolerances.weightNormalization,
      maxProjectionAngleResidual: simulation.maxProjectionAngleResidual,
      projectionAnglePass: simulation.maxProjectionAngleResidual <= tolerances.projectionAngle,
      maxCoefficientResidual: coefficientResidual.maxAbsResidual,
      coefficientRecoveryPass: coefficientResidual.maxAbsResidual <= tolerances.coefficient,
      chi2: comparison.chi2,
      ndof: comparison.ndof,
      chi2Pass: comparison.chi2 <= tolerances.chi2,
      aFBResidual: aFB.residual,
      aFBPass: aFB.residual <= tolerances.aFB,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(input.rows?.[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          sourcePath: input.rows?.[rowId]?.sourcePath ?? null,
          domainId: input.rows?.[rowId]?.domainId ?? null,
          branchRecordId: input.rows?.[rowId]?.branchRecordId ?? null,
          detectorProvenanceId: input.rows?.[rowId]?.detectorProvenanceId ?? null,
        },
      ]),
    ),
    sourceEvidence,
    ontology,
    detector,
    controls,
    componentStability,
    componentUniqueness,
    coefficientSource: {
      kind: coefficientSource.kind,
      label: coefficientSource.label,
      passed: coefficientSource.passed,
      reason: coefficientSource.reason,
      coefficientOrder: COEFFICIENT_ORDER,
      coefficients: coefficientSource.coefficients.map,
      nativeWeakCorridorDynamics: coefficientSource.nativeWeakCorridorDynamics,
      retainedWeakCorridorBranchDynamics: coefficientSource.retainedWeakCorridorBranchDynamics,
    },
    measurement,
    simulation: {
      eventCount: simulation.eventCount,
      coefficientOrder: COEFFICIENT_ORDER,
      extractedCoefficients: simulation.extractedCoefficients.map,
      generatedCoefficients: coefficientSource.coefficients.map,
      coefficientResiduals: coefficientResidual.map,
      weightNormalizationResidual: simulation.weightNormalizationResidual,
      maxProjectionAngleResidual: simulation.maxProjectionAngleResidual,
      maxPositiveWeight: simulation.maxPositiveWeight,
      minPositiveWeight: simulation.minPositiveWeight,
      firstProjectedEvent: simulation.firstProjectedEvent,
    },
    comparison,
    aFB,
  };
}

function summarizeOutput(output) {
  if (output.schema === SWEEP_OUTPUT_SCHEMA) {
    return summarizeSweepOutput(output);
  }
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    projection: output.projection,
    summary: output.summary,
    rows: output.rows,
    componentStability: output.componentStability,
    componentUniqueness: output.componentUniqueness,
    coefficientSource: output.coefficientSource,
    comparison: {
      chi2: output.comparison.chi2,
      ndof: output.comparison.ndof,
      pulls: output.comparison.pulls,
    },
    aFB: output.aFB,
  };
}

function summarizeSweepOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    sweep: output.sweep,
    summary: output.summary,
    cases: output.cases.map((entry) => ({
      caseId: entry.caseId,
      benchmarkBin: entry.benchmarkBin,
      pTZGeV: entry.pTZGeV,
      summary: entry.summary,
      componentStability: entry.componentStability,
      componentUniqueness: entry.componentUniqueness,
      comparison: entry.comparison,
      aFB: entry.aFB,
    })),
  };
}

function parseTolerances(raw) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, defaultValue]) => [
      key,
      positiveNumberOrDefault(raw[key], defaultValue),
    ]),
  );
}

function evaluateRows(rows) {
  return Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId], rowId)]),
  );
}

function evaluateAcceptedRow(row, rowId) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "row_missing" };
  }
  const status = normalizeStatus(row);
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  const sourceCheck = evaluateDurableSource(row.sourcePath, row, rowId);
  if (!sourceCheck.accepted) {
    return {
      accepted: false,
      reason: sourceCheck.reason,
      sourcePath: row.sourcePath ?? null,
    };
  }
  return { accepted: true, reason: "accepted", sourcePath: row.sourcePath };
}

function evaluateDurableSource(sourcePath, row, rowId) {
  if (typeof sourcePath !== "string" || sourcePath.trim() === "") {
    return { accepted: false, reason: "source_missing" };
  }
  if (
    sourcePath === "pending-retained-source" ||
    sourcePath.startsWith("/tmp/") ||
    sourcePath.startsWith("/private/tmp/") ||
    sourcePath.startsWith("content/generated/")
  ) {
    return { accepted: false, reason: "source_not_durable" };
  }
  if (/^https?:\/\//.test(sourcePath)) {
    return { accepted: false, reason: "raw_url_source_not_mirrored" };
  }
  const resolvedPath = path.resolve(sourcePath);
  if (!fs.existsSync(resolvedPath)) {
    return { accepted: false, reason: "source_not_found" };
  }
  if (fs.statSync(resolvedPath).isDirectory()) {
    return { accepted: false, reason: "source_is_directory" };
  }
  if (!isEvidenceSourcePath(resolvedPath)) {
    return { accepted: false, reason: "accepted_without_evidence_source" };
  }
  if (!sourceSupportsCollinsSoperRow(resolvedPath, row, rowId)) {
    return { accepted: false, reason: "collins_soper_source_contract_mismatch" };
  }
  return { accepted: true, reason: "source_file" };
}

function isEvidenceSourcePath(filePath) {
  const relative = path.relative(process.cwd(), path.normalize(filePath));
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
  const basename = path.basename(relative).toLowerCase();
  return (
    !basename.includes("attempt") &&
    !basename.includes("source-contract") &&
    !basename.includes("mock") &&
    !basename.includes("negative-control")
  );
}

function sourceSupportsCollinsSoperRow(filePath, row, rowId) {
  let source;
  try {
    source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return false;
  }
  const strings = new Set(
    collectSourceSupportValues(source)
      .filter((value) => typeof value === "string")
      .flatMap((value) => [value, value.toLowerCase()]),
  );
  const supportedRows = collectSourceSupportValues(source).filter(
    (value) => typeof value === "string",
  );
  const rowSupported =
    strings.has(rowId) ||
    strings.has(rowId.toLowerCase()) ||
    supportedRows.some((value) => value === rowId);
  const domainSupported = !row.domainId || strings.has(row.domainId);
  const branchSupported = !row.branchRecordId || strings.has(row.branchRecordId);
  const detectorSupported =
    !row.detectorProvenanceId || strings.has(row.detectorProvenanceId);
  const basisSupported =
    strings.has("collins-soper angular coefficient projection") ||
    strings.has("collins_soper_angular_coefficient_projection") ||
    strings.has("collins-soper");
  return rowSupported && domainSupported && branchSupported && detectorSupported && basisSupported;
}

function collectSourceSupportValues(value) {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectSourceSupportValues(entry));
  }
  if (value && typeof value === "object") {
    return [
      value.row,
      value.targetRow,
      value.sourceRole,
      value.sourceFamily,
      value.sourceKind,
      value.sourceSupport,
      value.sourceSupports,
      value.requiredSourceSupport,
      value.evidenceFamily,
      value.evidenceRole,
      value.evidenceSupports,
      value.claimLevel,
      value.purpose,
      value.supportedRows,
      value.domainId,
      value.retainedDomainId,
      value.eventId,
      value.carrierId,
      value.branchRecordId,
      value.detectorProvenanceId,
      ...Object.values(value).flatMap((entry) =>
        typeof entry === "object" ? collectSourceSupportValues(entry) : [],
      ),
    ].flatMap((entry) => (Array.isArray(entry) ? entry : [entry]));
  }
  return typeof value === "string" ? [value] : [];
}

function evaluateSourceEvidence(rowChecks) {
  const failures = Object.entries(rowChecks)
    .filter(([, check]) =>
      [
        "accepted_without_evidence_source",
        "raw_url_source_not_mirrored",
        "collins_soper_source_contract_mismatch",
      ].includes(check.reason),
    )
    .map(([rowId, check]) => ({
      rowId,
      reason: check.reason,
      sourcePath: check.sourcePath ?? null,
    }));
  return {
    passed: failures.length === 0,
    failures,
  };
}

function evaluateOntologyPrimitiveBoundary(input) {
  const inspected = {
    ontologyPrimitives: input.ontologyPrimitives ?? [],
    primitiveOntology: input.primitiveOntology ?? null,
    importedPrimitives: input.importedPrimitives ?? [],
    controls: input.controls?.ontologyPrimitives ?? [],
    rowPrimitiveFields: Object.fromEntries(
      Object.entries(input.rows ?? {}).map(([rowId, row]) => [
        rowId,
        {
          primitiveOntology: row?.primitiveOntology ?? null,
          importedPrimitives: row?.importedPrimitives ?? [],
          interpretationImports: row?.interpretationImports ?? [],
          spinPrimitive: row?.spinPrimitive ?? null,
          helicityPrimitive: row?.helicityPrimitive ?? null,
          densityMatrixPrimitive: row?.densityMatrixPrimitive ?? null,
          intrinsicSpin: row?.intrinsicSpin ?? null,
        },
      ]),
    ),
  };
  const values = collectPrimitiveValues(inspected);
  const hits = values
    .map((value) => String(value).toLowerCase().replace(/[^a-z0-9_]/g, ""))
    .filter((value) =>
      FORBIDDEN_PRIMITIVE_MARKERS.some((marker) => value.includes(marker)),
    );
  return {
    passed: hits.length === 0,
    forbiddenPrimitiveHits: [...new Set(hits)],
  };
}

function collectPrimitiveValues(value) {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectPrimitiveValues(entry));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, entry]) => [
      ...(entry === true ? [key] : []),
      ...collectPrimitiveValues(entry),
    ]);
  }
  if (value === true || typeof value === "string" || typeof value === "number") {
    return [value];
  }
  return [];
}

function evaluateDetectorProvenance(raw) {
  const statusAccepted = ACCEPTED_STATUSES.has(normalizeStatus(raw));
  const frame = raw.frameConventions ?? {};
  const visible = raw.visibleMomentumHandoff ?? {};
  const passed =
    statusAccepted &&
    concreteString(raw.provenanceId) &&
    frame.collinsSoper === true &&
    visible.finalVisibleLeptonMomenta === true &&
    concreteString(raw.experiment) &&
    concreteString(raw.collisionSystem);
  return {
    passed,
    status: normalizeStatus(raw),
    provenanceId: raw.provenanceId ?? null,
    experiment: raw.experiment ?? null,
    collisionSystem: raw.collisionSystem ?? null,
    frameConventions: frame,
    visibleMomentumHandoff: visible,
  };
}

function resolveCoefficientSource(input) {
  if (input.retainedWeakCorridorBranchDynamics) {
    const retainedWeakCorridorBranchDynamics = evaluateRetainedWeakCorridorBranchDynamics(
      input.retainedWeakCorridorBranchDynamics,
    );
    return {
      kind: "retained_weak_corridor_branch_dynamics",
      label: "retainedWeakCorridorBranchDynamics",
      passed: retainedWeakCorridorBranchDynamics.passed,
      reason: retainedWeakCorridorBranchDynamics.reason,
      coefficients: retainedWeakCorridorBranchDynamics.coefficients,
      nativeWeakCorridorDynamics:
        retainedWeakCorridorBranchDynamics.derivedNativeWeakCorridorDynamics,
      retainedWeakCorridorBranchDynamics,
    };
  }
  if (input.nativeWeakCorridorDynamics) {
    const nativeWeakCorridorDynamics = evaluateNativeWeakCorridorDynamics(
      input.nativeWeakCorridorDynamics,
    );
    return {
      kind: "native_weak_corridor_dynamics",
      label: "nativeWeakCorridorDynamics",
      passed: nativeWeakCorridorDynamics.passed,
      reason: nativeWeakCorridorDynamics.reason,
      coefficients: nativeWeakCorridorDynamics.coefficients,
      nativeWeakCorridorDynamics,
    };
  }
  const coefficients = parseCoefficientMap(
    input.branchAngularMeasure?.coefficients ?? {},
    "branchAngularMeasure.coefficients",
  );
  return {
    kind: "declared_projection_measure",
    label: input.branchAngularMeasure?.coefficientSource ?? "branchAngularMeasure.coefficients",
    passed: true,
    reason: "accepted",
    coefficients,
    nativeWeakCorridorDynamics: {
      passed: false,
      reason: "native_weak_corridor_dynamics_missing",
    },
    retainedWeakCorridorBranchDynamics: {
      passed: false,
      reason: "retained_weak_corridor_branch_dynamics_missing",
    },
  };
}

function evaluateRetainedWeakCorridorBranchDynamics(raw) {
  const componentRows = parseBranchDynamicsComponentRows(raw.componentRows ?? []);
  const coefficients = coefficientsFromBranchDynamicsComponents(componentRows);
  const statusAccepted = ACCEPTED_STATUSES.has(normalizeStatus(raw));
  const sourceCheck = evaluateDurableSource(
    raw.sourcePath,
    raw,
    "retained_weak_corridor_branch_dynamics",
  );
  const requiredSourceRows = [
    "source_depletion",
    "recoil_balance",
    "noether_sea_response",
    "corridor_orientation_axis",
  ];
  const missingSourceRows = requiredSourceRows.filter(
    (rowId) => !concreteString(raw.sourceRows?.[rowId]),
  );
  const basisAccepted = raw.basis === "collins_soper_retained_weak_corridor_branch_dynamics";
  const noDirectCoefficientRows = componentRows.forbiddenDirectCoefficientRows.length === 0;
  const passed =
    statusAccepted &&
    sourceCheck.accepted &&
    missingSourceRows.length === 0 &&
    basisAccepted &&
    componentRows.passed &&
    noDirectCoefficientRows &&
    coefficients.values.every(Number.isFinite);
  const derivedNativeWeakCorridorDynamics = derivedNativeWeakCorridorDynamicsFromBranchRows({
    raw,
    passed,
    reason: passed
      ? "accepted"
      : firstRetainedBranchDynamicsBlocker({
          statusAccepted,
          sourceCheck,
          missingSourceRows,
          basisAccepted,
          componentRows,
          noDirectCoefficientRows,
        }),
    coefficients,
    componentRows,
  });
  return {
    passed,
    reason: derivedNativeWeakCorridorDynamics.reason,
    status: normalizeStatus(raw),
    sourcePath: raw.sourcePath ?? null,
    sourceCheck,
    domainId: raw.domainId ?? null,
    branchRecordId: raw.branchRecordId ?? null,
    detectorProvenanceId: raw.detectorProvenanceId ?? null,
    basis: raw.basis ?? null,
    sourceRows: raw.sourceRows ?? {},
    componentEquation:
      "component = sourceDepletion + recoilBalance + noetherSeaResponse + corridorOrientation + wakeBalance",
    componentRows,
    coefficients,
    derivedNativeWeakCorridorDynamics,
    missingSourceRows,
  };
}

function parseBranchDynamicsComponentRows(rawRows) {
  const rows = Array.isArray(rawRows) ? rawRows : [];
  const rowByComponent = new Map(rows.map((row) => [row?.component, row]));
  const missingComponents = BRANCH_DYNAMICS_COMPONENTS.filter(
    ({ component }) => !rowByComponent.has(component),
  ).map(({ component }) => component);
  const duplicateComponents = rows
    .map((row) => row?.component)
    .filter((component, index, components) => component && components.indexOf(component) !== index);
  const forbiddenDirectCoefficientRows = rows
    .filter((row) =>
      ["value", "coefficient", ...COEFFICIENT_ORDER].some((key) =>
        Object.prototype.hasOwnProperty.call(row ?? {}, key),
      ),
    )
    .map((row) => row?.component ?? null);
  const parsedRows = BRANCH_DYNAMICS_COMPONENTS.map(({ component, coefficient, sourceTerm }) => {
    const row = rowByComponent.get(component) ?? {};
    const contributions = {
      sourceDepletion: finiteNumber(row.sourceDepletion ?? 0, `${component}.sourceDepletion`),
      recoilBalance: finiteNumber(row.recoilBalance ?? 0, `${component}.recoilBalance`),
      noetherSeaResponse: finiteNumber(
        row.noetherSeaResponse ?? 0,
        `${component}.noetherSeaResponse`,
      ),
      corridorOrientation: finiteNumber(
        row.corridorOrientation ?? 0,
        `${component}.corridorOrientation`,
      ),
      wakeBalance: finiteNumber(row.wakeBalance ?? 0, `${component}.wakeBalance`),
    };
    const value = Object.values(contributions).reduce((sum, entry) => sum + entry, 0);
    return {
      component,
      coefficient,
      sourceTerm,
      rowId: row.rowId ?? null,
      branchPairId: row.branchPairId ?? null,
      axis: row.axis ?? null,
      contributions,
      value,
    };
  });
  return {
    passed:
      rows.length > 0 &&
      missingComponents.length === 0 &&
      duplicateComponents.length === 0 &&
      forbiddenDirectCoefficientRows.length === 0,
    rows: parsedRows,
    missingComponents,
    duplicateComponents: [...new Set(duplicateComponents)],
    forbiddenDirectCoefficientRows,
  };
}

function coefficientsFromBranchDynamicsComponents(componentRows) {
  const map = Object.fromEntries(
    componentRows.rows.map((row) => [row.coefficient, row.value]),
  );
  return parseCoefficientMap(map, "retainedWeakCorridorBranchDynamics.componentRows");
}

function derivedNativeWeakCorridorDynamicsFromBranchRows({
  raw,
  passed,
  reason,
  coefficients,
  componentRows,
}) {
  const map = coefficients.map;
  return {
    passed,
    reason,
    status: normalizeStatus(raw),
    sourcePath: raw.sourcePath ?? null,
    domainId: raw.domainId ?? null,
    branchRecordId: raw.branchRecordId ?? null,
    detectorProvenanceId: raw.detectorProvenanceId ?? null,
    basis: "collins_soper_native_harmonic_source_terms",
    derivedFrom: "retained_weak_corridor_branch_dynamics",
    sourceRows: raw.sourceRows ?? {},
    componentToCoefficientMap: Object.fromEntries(
      BRANCH_DYNAMICS_COMPONENTS.map(({ coefficient, sourceTerm }) => [coefficient, sourceTerm]),
    ),
    sourceTermComponents: componentRows.rows,
    coefficients: {
      values: coefficients.values,
      map,
    },
  };
}

function firstRetainedBranchDynamicsBlocker({
  statusAccepted,
  sourceCheck,
  missingSourceRows,
  basisAccepted,
  componentRows,
  noDirectCoefficientRows,
}) {
  if (!statusAccepted) {
    return "retained_weak_corridor_branch_dynamics_not_accepted";
  }
  if (!sourceCheck.accepted) {
    return sourceCheck.reason;
  }
  if (missingSourceRows.length > 0) {
    return `missing_branch_dynamics_source_row_${missingSourceRows[0]}`;
  }
  if (!basisAccepted) {
    return "retained_weak_corridor_branch_dynamics_basis_mismatch";
  }
  if (componentRows.missingComponents.length > 0) {
    return `missing_branch_dynamics_component_${componentRows.missingComponents[0]}`;
  }
  if (componentRows.duplicateComponents.length > 0) {
    return `duplicate_branch_dynamics_component_${componentRows.duplicateComponents[0]}`;
  }
  if (!noDirectCoefficientRows) {
    return `branch_dynamics_direct_coefficient_row_${componentRows.forbiddenDirectCoefficientRows[0]}`;
  }
  return "retained_weak_corridor_branch_dynamics_invalid";
}

function evaluateNativeWeakCorridorDynamics(raw) {
  const coefficients = coefficientsFromNativeWeakCorridorDynamics(raw);
  const statusAccepted = ACCEPTED_STATUSES.has(normalizeStatus(raw));
  const sourceCheck = evaluateDurableSource(
    raw.sourcePath,
    raw,
    "native_weak_corridor_dynamics",
  );
  const requiredSourceRows = [
    "source_depletion",
    "recoil_balance",
    "noether_sea_response",
    "corridor_orientation_axis",
  ];
  const missingSourceRows = requiredSourceRows.filter(
    (rowId) => !concreteString(raw.sourceRows?.[rowId]),
  );
  const basisAccepted = raw.basis === "collins_soper_native_harmonic_source_terms";
  const passed =
    statusAccepted &&
    sourceCheck.accepted &&
    missingSourceRows.length === 0 &&
    basisAccepted &&
    coefficients.values.every(Number.isFinite);
  return {
    passed,
    reason: passed
      ? "accepted"
      : firstNativeWeakCorridorBlocker({
          statusAccepted,
          sourceCheck,
          missingSourceRows,
          basisAccepted,
        }),
    status: normalizeStatus(raw),
    sourcePath: raw.sourcePath ?? null,
    sourceCheck,
    domainId: raw.domainId ?? null,
    branchRecordId: raw.branchRecordId ?? null,
    detectorProvenanceId: raw.detectorProvenanceId ?? null,
    basis: raw.basis ?? null,
    sourceRows: raw.sourceRows ?? {},
    componentToCoefficientMap: {
      A0: "evenTensor.longitudinalTraceFree",
      A1: "evenTensor.xz",
      A2: "evenTensor.xxMinusYy",
      A3: "parityVector.x",
      A4: "parityVector.z",
      A5: "wakeOddTensor.xy",
      A6: "wakeOddTensor.zy",
      A7: "parityVector.y",
    },
    coefficients,
    missingSourceRows,
  };
}

function coefficientsFromNativeWeakCorridorDynamics(raw) {
  return parseCoefficientMap(
    {
      A0: raw.evenTensor?.longitudinalTraceFree,
      A1: raw.evenTensor?.xz,
      A2: raw.evenTensor?.xxMinusYy,
      A3: raw.parityVector?.x,
      A4: raw.parityVector?.z,
      A5: raw.wakeOddTensor?.xy,
      A6: raw.wakeOddTensor?.zy,
      A7: raw.parityVector?.y,
    },
    "nativeWeakCorridorDynamics",
  );
}

function firstNativeWeakCorridorBlocker({
  statusAccepted,
  sourceCheck,
  missingSourceRows,
  basisAccepted,
}) {
  if (!statusAccepted) {
    return "native_weak_corridor_dynamics_not_accepted";
  }
  if (!sourceCheck.accepted) {
    return sourceCheck.reason;
  }
  if (missingSourceRows.length > 0) {
    return `missing_native_source_row_${missingSourceRows[0]}`;
  }
  if (!basisAccepted) {
    return "native_weak_corridor_basis_mismatch";
  }
  return "native_weak_corridor_dynamics_invalid";
}

function evaluateControls(raw, coefficientSource) {
  const requireNativeDerived = raw.requireNativeDerived === true;
  const requireBranchDynamicsDerived = raw.requireBranchDynamicsDerived === true;
  const requireComponentStability = raw.requireComponentStability === true;
  const requireComponentUniqueness = raw.requireComponentUniqueness === true;
  const nativeDerivedPass =
    !requireNativeDerived || NATIVE_DERIVED_SOURCE_KINDS.has(coefficientSource.kind);
  const branchDynamicsDerivedPass =
    !requireBranchDynamicsDerived ||
    coefficientSource.kind === "retained_weak_corridor_branch_dynamics";
  const declaredMeasureBlocked =
    requireNativeDerived && !NATIVE_DERIVED_SOURCE_KINDS.has(coefficientSource.kind);
  const branchDynamicsBlocked = requireBranchDynamicsDerived && !branchDynamicsDerivedPass;
  const status = declaredMeasureBlocked
    ? "blocked_declared_projection_measure"
    : branchDynamicsBlocked
      ? "blocked_branch_dynamics_shortcut"
      : "accepted";
  return {
    passed: status === "accepted",
    requireNativeDerived,
    requireBranchDynamicsDerived,
    requireComponentStability,
    requireComponentUniqueness,
    nativeDerivedPass,
    branchDynamicsDerivedPass,
    status,
    reason:
      status === "blocked_declared_projection_measure"
        ? "native_weak_corridor_dynamics_required"
        : status === "blocked_branch_dynamics_shortcut"
          ? "retained_weak_corridor_branch_dynamics_required"
          : "accepted",
  };
}

function evaluateComponentStability(rawProbes, coefficientSource, tolerances, probeSetId = null) {
  const probes = Array.isArray(rawProbes) ? rawProbes : [];
  if (coefficientSource.kind !== "retained_weak_corridor_branch_dynamics") {
    return {
      passed: false,
      reason: "retained_weak_corridor_branch_dynamics_required",
      probeSetId,
      probeCount: probes.length,
      maxComponentDelta: null,
      maxCoefficientDelta: null,
      probes: [],
    };
  }
  if (probes.length === 0) {
    return {
      passed: false,
      reason: "component_stability_probes_missing",
      probeSetId,
      probeCount: 0,
      maxComponentDelta: null,
      maxCoefficientDelta: null,
      probes: [],
    };
  }

  const baseRows =
    coefficientSource.retainedWeakCorridorBranchDynamics?.componentRows?.rows ?? [];
  const rowByComponent = new Map(baseRows.map((row) => [row.component, row]));
  const evaluatedProbes = probes.map((probe, index) =>
    evaluateComponentStabilityProbe(probe, index, rowByComponent, tolerances),
  );
  const maxComponentDelta = Math.max(
    ...evaluatedProbes.map((probe) => Math.abs(probe.componentDelta ?? 0)),
  );
  const maxCoefficientDelta = Math.max(
    ...evaluatedProbes.map((probe) => Math.abs(probe.coefficientDelta ?? 0)),
  );
  const firstFailure = evaluatedProbes.find((probe) => !probe.passed);
  return {
    passed: firstFailure === undefined,
    reason: firstFailure?.reason ?? "accepted",
    probeSetId,
    probeCount: probes.length,
    tolerance: tolerances.componentStability,
    maxComponentDelta,
    maxCoefficientDelta,
    probes: evaluatedProbes,
  };
}

function evaluateComponentStabilityProbe(probe, index, rowByComponent, tolerances) {
  const probeId = concreteString(probe?.probeId) ? probe.probeId : `probe_${index}`;
  const component = probe?.component ?? null;
  const baseRow = rowByComponent.get(component);
  if (!baseRow) {
    return componentStabilityProbeFailure({
      probeId,
      component,
      reason: `component_stability_unknown_component_${component ?? "missing"}`,
    });
  }
  const deltas = probe?.deltas ?? {};
  if (!deltas || typeof deltas !== "object" || Array.isArray(deltas)) {
    return componentStabilityProbeFailure({
      probeId,
      component,
      coefficient: baseRow.coefficient,
      reason: `component_stability_invalid_deltas_${probeId}`,
    });
  }
  const unknownDeltaKey = Object.keys(deltas).find(
    (key) => !BRANCH_DYNAMICS_CONTRIBUTION_KEYS.includes(key),
  );
  if (unknownDeltaKey) {
    return componentStabilityProbeFailure({
      probeId,
      component,
      coefficient: baseRow.coefficient,
      reason: `component_stability_unknown_delta_${unknownDeltaKey}`,
    });
  }

  const baseValue = baseRow.value;
  const perturbedContributions = Object.fromEntries(
    BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map((key) => [
      key,
      baseRow.contributions[key] + finiteNumber(deltas[key] ?? 0, `${probeId}.${key}`),
    ]),
  );
  const perturbedValue = Object.values(perturbedContributions).reduce(
    (sum, value) => sum + value,
    0,
  );
  const componentDelta = perturbedValue - baseValue;
  const coefficientDelta = componentDelta;
  const passed = Math.abs(componentDelta) <= tolerances.componentStability;
  return {
    probeId,
    component,
    coefficient: baseRow.coefficient,
    passed,
    reason: passed ? "accepted" : `component_stability_delta_${probeId}`,
    baseValue,
    perturbedValue,
    componentDelta,
    coefficientDelta,
    deltas: Object.fromEntries(
      BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map((key) => [key, deltas[key] ?? 0]),
    ),
  };
}

function componentStabilityProbeFailure({
  probeId,
  component,
  coefficient = null,
  reason,
}) {
  return {
    probeId,
    component,
    coefficient,
    passed: false,
    reason,
    baseValue: null,
    perturbedValue: null,
    componentDelta: null,
    coefficientDelta: null,
    deltas: {},
  };
}

function evaluateComponentUniqueness(rawCertificate, coefficientSource, tolerances, certificateId) {
  if (coefficientSource.kind !== "retained_weak_corridor_branch_dynamics") {
    return {
      passed: false,
      reason: "retained_weak_corridor_branch_dynamics_required",
      certificateId,
      componentCount: 0,
      minRank: null,
      requiredRank: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length,
      coefficientOnlyRank: 1,
      coefficientOnlyNullity: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length - 1,
      maxSolutionResidual: null,
      maxConstraintResidual: null,
      components: [],
    };
  }
  if (!rawCertificate || typeof rawCertificate !== "object" || Array.isArray(rawCertificate)) {
    return {
      passed: false,
      reason: "component_uniqueness_certificate_missing",
      certificateId,
      componentCount: 0,
      minRank: null,
      requiredRank: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length,
      coefficientOnlyRank: 1,
      coefficientOnlyNullity: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length - 1,
      maxSolutionResidual: null,
      maxConstraintResidual: null,
      components: [],
    };
  }

  const baseRows =
    coefficientSource.retainedWeakCorridorBranchDynamics?.componentRows?.rows ?? [];
  const evaluatedComponents = baseRows.map((row) =>
    evaluateComponentUniquenessRow(row, rawCertificate, tolerances),
  );
  const firstFailure = evaluatedComponents.find((component) => !component.passed);
  const ranks = evaluatedComponents.map((component) => component.rank ?? 0);
  const solutionResiduals = evaluatedComponents.map(
    (component) => component.maxSolutionResidual ?? 0,
  );
  const constraintResiduals = evaluatedComponents.map(
    (component) => component.maxConstraintResidual ?? 0,
  );
  return {
    passed: firstFailure === undefined && evaluatedComponents.length === BRANCH_DYNAMICS_COMPONENTS.length,
    reason:
      firstFailure?.reason ??
      (evaluatedComponents.length === BRANCH_DYNAMICS_COMPONENTS.length
        ? "accepted"
        : "component_uniqueness_component_rows_missing"),
    certificateId,
    componentCount: evaluatedComponents.length,
    minRank: ranks.length > 0 ? Math.min(...ranks) : null,
    requiredRank: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length,
    coefficientOnlyRank: 1,
    coefficientOnlyNullity: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length - 1,
    maxSolutionResidual: solutionResiduals.length > 0 ? Math.max(...solutionResiduals) : null,
    maxConstraintResidual:
      constraintResiduals.length > 0 ? Math.max(...constraintResiduals) : null,
    components: evaluatedComponents,
  };
}

function evaluateComponentUniquenessRow(componentRow, certificate, tolerances) {
  const requiredRank = integerAtLeast(
    certificate.requiredRank ?? BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length,
    BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length,
  );
  const constraints = expandComponentUniquenessConstraints(componentRow, certificate);
  if (!constraints.passed) {
    return {
      component: componentRow.component,
      coefficient: componentRow.coefficient,
      passed: false,
      reason: constraints.reason,
      requiredRank,
      rank: 0,
      coefficientOnlyRank: 1,
      coefficientOnlyNullity: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length - 1,
      maxSolutionResidual: null,
      maxConstraintResidual: null,
      independentConstraintIds: [],
      constraints: constraints.rows,
    };
  }

  const matrix = constraints.rows.map((row) =>
    BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map((key) => row.coefficients[key]),
  );
  const values = constraints.rows.map((row) => row.value);
  const rank = matrixRank(matrix, tolerances.componentUniqueness);
  if (rank < requiredRank) {
    return {
      component: componentRow.component,
      coefficient: componentRow.coefficient,
      passed: false,
      reason: `component_uniqueness_rank_deficient_${componentRow.component}`,
      requiredRank,
      rank,
      coefficientOnlyRank: 1,
      coefficientOnlyNullity: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length - 1,
      maxSolutionResidual: null,
      maxConstraintResidual: null,
      independentConstraintIds: [],
      constraints: constraints.rows,
    };
  }

  const independentRows = selectIndependentRows(
    matrix,
    requiredRank,
    tolerances.componentUniqueness,
  );
  const squareMatrix = independentRows.map((index) => matrix[index]);
  const squareValues = independentRows.map((index) => values[index]);
  const solution = solveLinearSystem(squareMatrix, squareValues);
  const baseVector = BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map(
    (key) => componentRow.contributions[key],
  );
  const solutionResiduals = solution.map((value, index) => value - baseVector[index]);
  const constraintResiduals = matrix.map((row, index) => dot(row, solution) - values[index]);
  const maxSolutionResidual = Math.max(...solutionResiduals.map((value) => Math.abs(value)));
  const maxConstraintResidual = Math.max(
    ...constraintResiduals.map((value) => Math.abs(value)),
  );
  const passed =
    maxSolutionResidual <= tolerances.componentUniqueness &&
    maxConstraintResidual <= tolerances.componentUniqueness;
  return {
    component: componentRow.component,
    coefficient: componentRow.coefficient,
    passed,
    reason: passed
      ? "accepted"
      : maxConstraintResidual > tolerances.componentUniqueness
        ? `component_uniqueness_constraint_residual_${componentRow.component}`
        : `component_uniqueness_solution_residual_${componentRow.component}`,
    requiredRank,
    rank,
    coefficientOnlyRank: 1,
    coefficientOnlyNullity: BRANCH_DYNAMICS_CONTRIBUTION_KEYS.length - 1,
    variables: BRANCH_DYNAMICS_CONTRIBUTION_KEYS,
    solution: Object.fromEntries(
      BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map((key, index) => [key, solution[index]]),
    ),
    baseContributions: componentRow.contributions,
    solutionResiduals: Object.fromEntries(
      BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map((key, index) => [
        key,
        solutionResiduals[index],
      ]),
    ),
    maxSolutionResidual,
    maxConstraintResidual,
    independentConstraintIds: independentRows.map((index) => constraints.rows[index].constraintId),
    constraints: constraints.rows.map((row, index) => ({
      ...row,
      residual: constraintResiduals[index],
    })),
  };
}

function expandComponentUniquenessConstraints(componentRow, certificate) {
  const directRows = certificate.constraintsByComponent?.[componentRow.component];
  const templates = Array.isArray(directRows) ? directRows : certificate.constraintTemplates;
  if (!Array.isArray(templates) || templates.length === 0) {
    return {
      passed: false,
      reason: `component_uniqueness_constraints_missing_${componentRow.component}`,
      rows: [],
    };
  }
  const rows = [];
  for (const [index, template] of templates.entries()) {
    if (!template || typeof template !== "object" || Array.isArray(template)) {
      return {
        passed: false,
        reason: `component_uniqueness_constraint_invalid_${componentRow.component}_${index}`,
        rows,
      };
    }
    const coefficientMap = template.coefficients ?? {};
    const unknownKey = Object.keys(coefficientMap).find(
      (key) => !BRANCH_DYNAMICS_CONTRIBUTION_KEYS.includes(key),
    );
    if (unknownKey) {
      return {
        passed: false,
        reason: `component_uniqueness_unknown_coefficient_${unknownKey}`,
        rows,
      };
    }
    const coefficients = Object.fromEntries(
      BRANCH_DYNAMICS_CONTRIBUTION_KEYS.map((key) => [
        key,
        finiteNumber(coefficientMap[key] ?? 0, `${componentRow.component}.${key}`),
      ]),
    );
    const value = resolveComponentUniquenessConstraintValue(template, componentRow, index);
    if (!Number.isFinite(value)) {
      return {
        passed: false,
        reason: `component_uniqueness_value_invalid_${componentRow.component}_${index}`,
        rows,
      };
    }
    rows.push({
      constraintId:
        template.constraintId ?? `${componentRow.component}_constraint_${index + 1}`,
      component: componentRow.component,
      valueSource: template.valueSource ?? "literal",
      coefficients,
      value,
    });
  }
  return { passed: true, reason: "accepted", rows };
}

function resolveComponentUniquenessConstraintValue(template, componentRow, index) {
  if (Object.prototype.hasOwnProperty.call(template, "value")) {
    return finiteNumber(template.value, `${componentRow.component}.constraint[${index}].value`);
  }
  if (template.valueSource === "component_value") {
    return componentRow.value;
  }
  const contributionPrefix = "contribution.";
  if (
    typeof template.valueSource === "string" &&
    template.valueSource.startsWith(contributionPrefix)
  ) {
    const key = template.valueSource.slice(contributionPrefix.length);
    if (!BRANCH_DYNAMICS_CONTRIBUTION_KEYS.includes(key)) {
      return Number.NaN;
    }
    return componentRow.contributions[key];
  }
  return Number.NaN;
}

function matrixRank(matrix, tolerance) {
  const rows = matrix.map((row) => [...row]);
  let rank = 0;
  const columnCount = rows[0]?.length ?? 0;
  for (let column = 0; column < columnCount; column += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < rows.length; row += 1) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot]?.[column] ?? 0)) {
        pivot = row;
      }
    }
    if (!rows[pivot] || Math.abs(rows[pivot][column]) <= tolerance) {
      continue;
    }
    [rows[rank], rows[pivot]] = [rows[pivot], rows[rank]];
    const pivotValue = rows[rank][column];
    for (let c = column; c < columnCount; c += 1) {
      rows[rank][c] /= pivotValue;
    }
    for (let row = 0; row < rows.length; row += 1) {
      if (row === rank) {
        continue;
      }
      const factor = rows[row][column];
      for (let c = column; c < columnCount; c += 1) {
        rows[row][c] -= factor * rows[rank][c];
      }
    }
    rank += 1;
    if (rank === rows.length) {
      break;
    }
  }
  return rank;
}

function selectIndependentRows(matrix, requiredRank, tolerance) {
  const selected = [];
  let currentRank = 0;
  for (let index = 0; index < matrix.length && selected.length < requiredRank; index += 1) {
    const candidate = [...selected, index];
    const rank = matrixRank(
      candidate.map((rowIndex) => matrix[rowIndex]),
      tolerance,
    );
    if (rank > currentRank) {
      selected.push(index);
      currentRank = rank;
    }
  }
  if (selected.length !== requiredRank) {
    throw new Error("Unable to select a rank-complete component uniqueness row set.");
  }
  return selected;
}

function parseCoefficientMap(raw, label) {
  const values = COEFFICIENT_ORDER.map((key) => finiteNumber(raw[key], `${label}.${key}`));
  return {
    values,
    map: Object.fromEntries(COEFFICIENT_ORDER.map((key, index) => [key, values[index]])),
  };
}

function evaluateMeasurement(raw) {
  const coefficients = parseCoefficientMap(raw.coefficients ?? {}, "measurement.coefficients");
  const covariance = parseCovariance(raw.covariance ?? raw.covarianceMatrix);
  const passed =
    coefficients.values.every(Number.isFinite) &&
    covariance.passed &&
    concreteString(raw.sourceId) &&
    concreteString(raw.covarianceModel);
  return {
    passed,
    sourceId: raw.sourceId ?? null,
    benchmarkBin: raw.benchmarkBin ?? null,
    covarianceModel: raw.covarianceModel ?? null,
    coefficientOrder: COEFFICIENT_ORDER,
    coefficients,
    covariance,
  };
}

function parseCovariance(raw) {
  if (!Array.isArray(raw) || raw.length !== COEFFICIENT_ORDER.length) {
    return { passed: false, reason: "covariance_shape_invalid", matrix: null };
  }
  const matrix = raw.map((row, rowIndex) => {
    if (!Array.isArray(row) || row.length !== COEFFICIENT_ORDER.length) {
      throw new Error(`measurement.covariance[${rowIndex}] must have 8 entries.`);
    }
    return row.map((entry, columnIndex) =>
      finiteNumber(entry, `measurement.covariance[${rowIndex}][${columnIndex}]`),
    );
  });
  const symmetric = matrix.every((row, rowIndex) =>
    row.every((entry, columnIndex) => Math.abs(entry - matrix[columnIndex][rowIndex]) <= 1e-15),
  );
  const positiveDiagonal = matrix.every((row, index) => row[index] > 0);
  return {
    passed: symmetric && positiveDiagonal,
    reason: symmetric
      ? positiveDiagonal
        ? "accepted"
        : "covariance_nonpositive_diagonal"
      : "covariance_not_symmetric",
    matrix,
  };
}

function buildProjectionSimulation({ coefficients, dileptonSystem, quadrature }) {
  const mass = positiveNumber(dileptonSystem.massGeV, "dileptonSystem.massGeV");
  const transverseMomentum = finiteNumber(
    dileptonSystem.transverseMomentumGeV,
    "dileptonSystem.transverseMomentumGeV",
  );
  const rapidity = finiteNumber(dileptonSystem.rapidity, "dileptonSystem.rapidity");
  const azimuth = finiteNumber(dileptonSystem.azimuth ?? 0, "dileptonSystem.azimuth");
  const cosThetaNodes = integerAtLeast(quadrature.cosThetaNodes ?? 12, 4);
  const phiBins = integerAtLeast(quadrature.phiBins ?? 32, 8);
  const q = dileptonFourVector({ mass, transverseMomentum, rapidity, azimuth });
  const axes = collinsSoperAxesForQ(q);
  const nodes = gaussLegendre(cosThetaNodes);
  const phiStep = (2 * Math.PI) / phiBins;
  const events = [];
  let weightSum = 0;
  let maxProjectionAngleResidual = 0;
  let minPositiveWeight = Number.POSITIVE_INFINITY;
  let maxPositiveWeight = 0;

  for (const node of nodes) {
    for (let phiIndex = 0; phiIndex < phiBins; phiIndex += 1) {
      const cosTheta = node.x;
      const phi = (phiIndex + 0.5) * phiStep;
      const density = angularDensity(cosTheta, phi, coefficients);
      if (density <= 0) {
        throw new Error("Angular density became nonpositive for the populated branch measure.");
      }
      const weight = node.w * phiStep * density;
      const lab = leptonLabPairFromCollinsSoper({ q, axes, cosTheta, phi, mass });
      const projected = collinsSoperAnglesFromLeptons(lab.minus, lab.plus);
      const angleResidual = Math.max(
        Math.abs(projected.cosTheta - cosTheta),
        angularDifference(projected.phi, phi),
      );
      maxProjectionAngleResidual = Math.max(maxProjectionAngleResidual, angleResidual);
      weightSum += weight;
      minPositiveWeight = Math.min(minPositiveWeight, weight);
      maxPositiveWeight = Math.max(maxPositiveWeight, weight);
      events.push({
        weight,
        generated: { cosTheta, phi },
        projected,
        minus: lab.minus,
        plus: lab.plus,
      });
    }
  }

  const moments = computeMoments(events, weightSum);
  const extractedCoefficients = coefficientsFromMoments(moments);
  return {
    eventCount: events.length,
    weightSum,
    weightNormalizationResidual: Math.abs(weightSum - 1),
    maxProjectionAngleResidual,
    minPositiveWeight,
    maxPositiveWeight,
    moments,
    extractedCoefficients,
    firstProjectedEvent: {
      weight: events[0].weight,
      generated: events[0].generated,
      projected: events[0].projected,
      leptonMinusLab: events[0].minus,
      leptonPlusLab: events[0].plus,
    },
  };
}

function dileptonFourVector({ mass, transverseMomentum, rapidity, azimuth }) {
  const transverseMass = Math.sqrt(mass * mass + transverseMomentum * transverseMomentum);
  const px = transverseMomentum * Math.cos(azimuth);
  const py = transverseMomentum * Math.sin(azimuth);
  const pz = transverseMass * Math.sinh(rapidity);
  const energy = transverseMass * Math.cosh(rapidity);
  return { energy, px, py, pz };
}

function angularDensity(cosTheta, phi, coefficients) {
  const [A0, A1, A2, A3, A4, A5, A6, A7] = coefficients;
  const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta));
  const sin2Theta = 2 * sinTheta * cosTheta;
  const sin2 = sinTheta * sinTheta;
  const value =
    1 +
    cosTheta * cosTheta +
    0.5 * A0 * (1 - 3 * cosTheta * cosTheta) +
    A1 * sin2Theta * Math.cos(phi) +
    0.5 * A2 * sin2 * Math.cos(2 * phi) +
    A3 * sinTheta * Math.cos(phi) +
    A4 * cosTheta +
    A5 * sin2 * Math.sin(2 * phi) +
    A6 * sin2Theta * Math.sin(phi) +
    A7 * sinTheta * Math.sin(phi);
  return (3 / (16 * Math.PI)) * value;
}

function leptonLabPairFromCollinsSoper({ q, axes, cosTheta, phi, mass }) {
  const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta));
  const direction = add3(
    add3(scale3(axes.x, sinTheta * Math.cos(phi)), scale3(axes.y, sinTheta * Math.sin(phi))),
    scale3(axes.z, cosTheta),
  );
  const energy = mass / 2;
  const restMinus = {
    energy,
    px: energy * direction[0],
    py: energy * direction[1],
    pz: energy * direction[2],
  };
  const restPlus = {
    energy,
    px: -restMinus.px,
    py: -restMinus.py,
    pz: -restMinus.pz,
  };
  const beta = [-q.px / q.energy, -q.py / q.energy, -q.pz / q.energy];
  return {
    minus: boost(restMinus, beta),
    plus: boost(restPlus, beta),
  };
}

function collinsSoperAnglesFromLeptons(minus, plus) {
  const q = add4(minus, plus);
  const axes = collinsSoperAxesForQ(q);
  const beta = [q.px / q.energy, q.py / q.energy, q.pz / q.energy];
  const minusRest = boost(minus, beta);
  const k = unit3([minusRest.px, minusRest.py, minusRest.pz]);
  const cosTheta = clamp(dot3(k, axes.z), -1, 1);
  const phi = normalizePhi(Math.atan2(dot3(k, axes.y), dot3(k, axes.x)));
  return { cosTheta, phi };
}

function collinsSoperAxesForQ(q) {
  const beta = [q.px / q.energy, q.py / q.energy, q.pz / q.energy];
  const beam1Rest = boost({ energy: 1, px: 0, py: 0, pz: 1 }, beta);
  const beam2Rest = boost({ energy: 1, px: 0, py: 0, pz: -1 }, beta);
  const h1 = unit3([beam1Rest.px, beam1Rest.py, beam1Rest.pz]);
  const h2 = unit3([beam2Rest.px, beam2Rest.py, beam2Rest.pz]);
  const z = unit3(sub3(h1, h2));
  const x = unit3(add3(h1, h2));
  const y = unit3(cross3(z, x));
  return { x, y, z };
}

function computeMoments(events, weightSum) {
  const moments = {
    cos2: 0,
    sin2ThetaCosPhi: 0,
    sinSqThetaCos2Phi: 0,
    sinThetaCosPhi: 0,
    cosTheta: 0,
    sinSqThetaSin2Phi: 0,
    sin2ThetaSinPhi: 0,
    sinThetaSinPhi: 0,
  };
  for (const event of events) {
    const c = event.projected.cosTheta;
    const phi = event.projected.phi;
    const s = Math.sqrt(Math.max(0, 1 - c * c));
    const sin2Theta = 2 * s * c;
    const sinSqTheta = s * s;
    const normalizedWeight = event.weight / weightSum;
    moments.cos2 += normalizedWeight * c * c;
    moments.sin2ThetaCosPhi += normalizedWeight * sin2Theta * Math.cos(phi);
    moments.sinSqThetaCos2Phi += normalizedWeight * sinSqTheta * Math.cos(2 * phi);
    moments.sinThetaCosPhi += normalizedWeight * s * Math.cos(phi);
    moments.cosTheta += normalizedWeight * c;
    moments.sinSqThetaSin2Phi += normalizedWeight * sinSqTheta * Math.sin(2 * phi);
    moments.sin2ThetaSinPhi += normalizedWeight * sin2Theta * Math.sin(phi);
    moments.sinThetaSinPhi += normalizedWeight * s * Math.sin(phi);
  }
  return moments;
}

function coefficientsFromMoments(moments) {
  const values = [
    4 - 10 * moments.cos2,
    5 * moments.sin2ThetaCosPhi,
    10 * moments.sinSqThetaCos2Phi,
    4 * moments.sinThetaCosPhi,
    4 * moments.cosTheta,
    5 * moments.sinSqThetaSin2Phi,
    5 * moments.sin2ThetaSinPhi,
    4 * moments.sinThetaSinPhi,
  ];
  return {
    values,
    map: Object.fromEntries(COEFFICIENT_ORDER.map((key, index) => [key, values[index]])),
  };
}

function computeCoefficientResidual(extracted, generated) {
  const residuals = extracted.map((value, index) => value - generated[index]);
  return {
    values: residuals,
    maxAbsResidual: Math.max(...residuals.map((value) => Math.abs(value))),
    map: Object.fromEntries(COEFFICIENT_ORDER.map((key, index) => [key, residuals[index]])),
  };
}

function compareWithMeasurement({ extracted, measurement }) {
  const diff = extracted.map((value, index) => value - measurement.coefficients.values[index]);
  const solved = solveLinearSystem(measurement.covariance.matrix, diff);
  const chi2 = dot(diff, solved);
  const pulls = Object.fromEntries(
    COEFFICIENT_ORDER.map((key, index) => [
      key,
      diff[index] / Math.sqrt(measurement.covariance.matrix[index][index]),
    ]),
  );
  return {
    coefficientOrder: COEFFICIENT_ORDER,
    residuals: Object.fromEntries(COEFFICIENT_ORDER.map((key, index) => [key, diff[index]])),
    pulls,
    chi2,
    ndof: COEFFICIENT_ORDER.length,
    covarianceModel: measurement.covarianceModel,
  };
}

function evaluateAFB(extracted, measured) {
  const projected = (3 / 8) * extracted[4];
  const measuredValue = (3 / 8) * measured[4];
  return {
    relation: "A_FB = 3 A4 / 8",
    projected,
    measured: measuredValue,
    residual: Math.abs(projected - measuredValue),
  };
}

function decideStatus({
  schemaOk,
  missingRows,
  sourceEvidence,
  ontology,
  detector,
  coefficientSource,
  controls,
  componentStability,
  componentUniqueness,
  measurement,
  simulation,
  coefficientResidual,
  comparison,
  aFB,
  tolerances,
}) {
  if (!schemaOk) {
    return "blocked_schema_mismatch";
  }
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!ontology.passed) {
    return "blocked_intrinsic_spin_primitive";
  }
  if (!detector.passed) {
    return "blocked_detector_provenance";
  }
  if (!coefficientSource.passed) {
    return "blocked_coefficient_source";
  }
  if (!controls.passed) {
    return controls.status;
  }
  if (controls.requireComponentStability && !componentStability.passed) {
    return "blocked_component_stability";
  }
  if (controls.requireComponentUniqueness && !componentUniqueness.passed) {
    return "blocked_component_uniqueness";
  }
  if (!measurement.passed) {
    return "blocked_measurement_covariance";
  }
  if (simulation.weightNormalizationResidual > tolerances.weightNormalization) {
    return "blocked_weight_normalization";
  }
  if (simulation.maxProjectionAngleResidual > tolerances.projectionAngle) {
    return "blocked_collins_soper_projection";
  }
  if (coefficientResidual.maxAbsResidual > tolerances.coefficient) {
    return "blocked_angular_coefficient_recovery";
  }
  if (comparison.chi2 > tolerances.chi2) {
    return "blocked_covariance_comparison";
  }
  if (aFB.residual > tolerances.aFB) {
    return "blocked_afb_relation";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  sourceEvidence,
  ontology,
  detector,
  coefficientSource,
  controls,
  componentStability,
  componentUniqueness,
  measurement,
  simulation,
  coefficientResidual,
  comparison,
  aFB,
}) {
  if (status === "blocked_missing_rows") {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (status === "blocked_source_evidence") {
    return sourceEvidence.failures[0]?.reason ?? "source_evidence_failed";
  }
  if (status === "blocked_intrinsic_spin_primitive") {
    return ontology.forbiddenPrimitiveHits[0] ?? "intrinsic_spin_primitive_imported";
  }
  if (status === "blocked_detector_provenance") {
    return "detector_provenance_incomplete";
  }
  if (status === "blocked_coefficient_source") {
    return coefficientSource.reason ?? "coefficient_source_invalid";
  }
  if (status === "blocked_declared_projection_measure") {
    return controls.reason ?? "native_weak_corridor_dynamics_required";
  }
  if (status === "blocked_branch_dynamics_shortcut") {
    return controls.reason ?? "retained_weak_corridor_branch_dynamics_required";
  }
  if (status === "blocked_component_stability") {
    return componentStability.reason ?? "component_stability_failed";
  }
  if (status === "blocked_component_uniqueness") {
    return componentUniqueness.reason ?? "component_uniqueness_failed";
  }
  if (status === "blocked_measurement_covariance") {
    return measurement.covariance.reason ?? "measurement_covariance_invalid";
  }
  if (status === "blocked_weight_normalization") {
    return `weight_normalization_residual_${simulation.weightNormalizationResidual}`;
  }
  if (status === "blocked_collins_soper_projection") {
    return `projection_angle_residual_${simulation.maxProjectionAngleResidual}`;
  }
  if (status === "blocked_angular_coefficient_recovery") {
    return `coefficient_residual_${coefficientResidual.maxAbsResidual}`;
  }
  if (status === "blocked_covariance_comparison") {
    return `chi2_${comparison.chi2}`;
  }
  if (status === "blocked_afb_relation") {
    return `afb_residual_${aFB.residual}`;
  }
  return null;
}

function gaussLegendre(n) {
  const eps = 1e-15;
  const nodes = new Array(n);
  const m = Math.floor((n + 1) / 2);
  for (let i = 0; i < m; i += 1) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5));
    let z1;
    let p1;
    let p2;
    let pp;
    do {
      p1 = 1;
      p2 = 0;
      for (let j = 1; j <= n; j += 1) {
        const p3 = p2;
        p2 = p1;
        p1 = ((2 * j - 1) * z * p2 - (j - 1) * p3) / j;
      }
      pp = (n * (z * p1 - p2)) / (z * z - 1);
      z1 = z;
      z = z1 - p1 / pp;
    } while (Math.abs(z - z1) > eps);
    const weight = 2 / ((1 - z * z) * pp * pp);
    nodes[i] = { x: -z, w: weight };
    nodes[n - 1 - i] = { x: z, w: weight };
  }
  return nodes;
}

function boost(four, beta) {
  const b2 = dot3(beta, beta);
  if (b2 >= 1) {
    throw new Error("Lorentz boost beta must be subluminal.");
  }
  if (b2 === 0) {
    return { ...four };
  }
  const gamma = 1 / Math.sqrt(1 - b2);
  const spatial = [four.px, four.py, four.pz];
  const betaDotP = dot3(beta, spatial);
  const factor = ((gamma - 1) * betaDotP) / b2 - gamma * four.energy;
  const boostedSpatial = add3(spatial, scale3(beta, factor));
  return {
    energy: gamma * (four.energy - betaDotP),
    px: boostedSpatial[0],
    py: boostedSpatial[1],
    pz: boostedSpatial[2],
  };
}

function add4(a, b) {
  return {
    energy: a.energy + b.energy,
    px: a.px + b.px,
    py: a.py + b.py,
    pz: a.pz + b.pz,
  };
}

function add3(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub3(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale3(a, scale) {
  return [a[0] * scale, a[1] * scale, a[2] * scale];
}

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross3(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function unit3(a) {
  const norm = Math.hypot(a[0], a[1], a[2]);
  if (norm <= 1e-15) {
    throw new Error("Cannot normalize a near-zero vector in Collins-Soper frame construction.");
  }
  return [a[0] / norm, a[1] / norm, a[2] / norm];
}

function angularDifference(a, b) {
  const diff = Math.abs(normalizePhi(a) - normalizePhi(b));
  return Math.min(diff, 2 * Math.PI - diff);
}

function normalizePhi(phi) {
  const twoPi = 2 * Math.PI;
  return ((phi % twoPi) + twoPi) % twoPi;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function solveLinearSystem(matrix, vector) {
  const n = vector.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);
  for (let pivot = 0; pivot < n; pivot += 1) {
    let pivotRow = pivot;
    for (let row = pivot + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[pivotRow][pivot])) {
        pivotRow = row;
      }
    }
    if (Math.abs(augmented[pivotRow][pivot]) <= 1e-30) {
      throw new Error("Covariance matrix is singular for the comparison residual.");
    }
    if (pivotRow !== pivot) {
      [augmented[pivot], augmented[pivotRow]] = [augmented[pivotRow], augmented[pivot]];
    }
    const pivotValue = augmented[pivot][pivot];
    for (let column = pivot; column <= n; column += 1) {
      augmented[pivot][column] /= pivotValue;
    }
    for (let row = 0; row < n; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = augmented[row][pivot];
      for (let column = pivot; column <= n; column += 1) {
        augmented[row][column] -= factor * augmented[pivot][column];
      }
    }
  }
  return augmented.map((row) => row[n]);
}

function dot(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object") {
    return "missing";
  }
  return typeof row.status === "string" ? row.status : "missing";
}

function positiveNumberOrDefault(value, defaultValue) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
}

function positiveNumber(value, label) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return parsed;
}

function finiteNumber(value, label) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return parsed;
}

function integerAtLeast(value, min) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min) {
    throw new Error(`Expected integer >= ${min}.`);
  }
  return parsed;
}

function concreteString(value) {
  return typeof value === "string" && value.trim() !== "";
}
