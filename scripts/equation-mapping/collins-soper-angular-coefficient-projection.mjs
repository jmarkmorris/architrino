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
const OUTPUT_SCHEMA =
  "aaa-equation-map-collins-soper-angular-coefficient-projection-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const COEFFICIENT_ORDER = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7"];
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

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateProjection(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs [options]

Options:
  --input PATH          Collins-Soper projection input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the projection instance is populated.
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
  const branchMeasure = parseCoefficientMap(
    input.branchAngularMeasure?.coefficients ?? {},
    "branchAngularMeasure.coefficients",
  );
  const measurement = evaluateMeasurement(input.measurement ?? {});
  const simulation = buildProjectionSimulation({
    coefficients: branchMeasure.values,
    dileptonSystem: input.dileptonSystem ?? {},
    quadrature: input.quadrature ?? {},
  });
  const coefficientResidual = computeCoefficientResidual(
    simulation.extractedCoefficients.values,
    branchMeasure.values,
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
    measurement,
    simulation: {
      eventCount: simulation.eventCount,
      coefficientOrder: COEFFICIENT_ORDER,
      extractedCoefficients: simulation.extractedCoefficients.map,
      generatedCoefficients: branchMeasure.map,
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
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    projection: output.projection,
    summary: output.summary,
    rows: output.rows,
    comparison: {
      chi2: output.comparison.chi2,
      ndof: output.comparison.ndof,
      pulls: output.comparison.pulls,
    },
    aFB: output.aFB,
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
