#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "eq25-thermodynamic-record-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-eq25-thermodynamic-record-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq25-thermodynamic-record-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const SOURCE_IDENTITY_FIELDS = [
  "thetaSrcId",
  "sourceFamilyId",
  "sourceWindowId",
  "thermalProvenanceId",
  "eventLedgerId",
  "transportPathId",
];
const SOURCE_IDENTITY_RECORD_FIELDS = [
  "thetaThermId",
  "coarseGrainingId",
  ...SOURCE_IDENTITY_FIELDS,
];

const REQUIRED_ROWS = [
  "theta_therm",
  "state_space_row",
  "coarse_graining_row",
  "measure_row",
  "deterministic_pushforward_row",
  "coarse_projection_row",
  "collision_operator_row",
  "entropy_balance_row",
  "thermalization_depth_row",
  "fluctuation_row",
  "event_ledger_row",
  "shared_noether_sea_row",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  measure: 1e-12,
  pushforward: 1e-12,
  collision: 1e-12,
  entropy: 1e-12,
  thermalization: 1e-12,
  fluctuation: 1e-12,
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
const output = evaluateEq25ThermodynamicRecord(input, inputPath);
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
  console.log(`Usage: node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs [options]

Options:
  --input PATH          EQ-25 finite-window thermodynamic record input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-25 deterministic pushforward,
entropy-balance, thermalization-depth, and fluctuation residual. Attempt rows,
imported Boltzmann postulates, missing boundary terms, shallow thermalization,
and hidden retunes never raise equation scores.`);
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

function evaluateEq25ThermodynamicRecord(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const sourceIdentity = evaluateSourceIdentity({
    packet,
    rows,
    commonCarrierId: packet.commonCarrierId ?? input.commonCarrierId,
  });
  const sourceEvidence = evaluateSourceEvidence(rows);
  const sharedKeys = evaluateSharedKeys(packet.sharedKeys ?? [], tolerances);
  const thermodynamicRecord = evaluateThermodynamicRecord(packet.thermodynamicRecord ?? {}, tolerances);
  const negativeControls = evaluateNegativeControls(
    packet.thermodynamicRecord ?? {},
    packet.negativeControls ?? [],
    tolerances,
  );
  const status = decideStatus({
    missingRows,
    carrierBinding,
    sourceIdentity,
    sourceEvidence,
    sharedKeys,
    thermodynamicRecord,
    negativeControls,
  });
  const nextBlocker = firstBlocker({
    status,
    missingRows,
    carrierBinding,
    sourceIdentity,
    sourceEvidence,
    sharedKeys,
    thermodynamicRecord,
    negativeControls,
  });
  const nextBlockerDetails = firstBlockerDetails({
    nextBlocker,
    missingRows,
    rowChecks,
    carrierBinding,
    sourceIdentity,
    sourceEvidence,
    sharedKeys,
    thermodynamicRecord,
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
      row: "EQ-25",
      supportedRows: ["EQ-05", "EQ-06", "EQ-22", "EQ-23", "EQ-25", "EQ-31"],
      claimLevel:
        "score-neutral finite-window thermodynamic record residual; accepted retained rows are required before score review",
    },
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      nextBlocker,
      nextBlockerDetails,
      commonCarrierPass: carrierBinding.passed,
      sourceIdentityAccepted: sourceIdentity.passed,
      sourceIdentityMissingFieldCount: sourceIdentity.missingFields.length,
      sourceIdentityMismatchCount: sourceIdentity.mismatches.length,
      sourceEvidenceAccepted: sourceEvidence.passed,
      sourceEvidenceFailureCount: sourceEvidence.failures.length,
      sharedKeysAccepted: sharedKeys.accepted,
      thermodynamicNumericPass: thermodynamicRecord.passed,
      stateSpacePass: thermodynamicRecord.stateSpace.passed,
      pushforwardPass: thermodynamicRecord.deterministicPushforward.passed,
      collisionOperatorPass: thermodynamicRecord.collisionOperator.passed,
      entropyBalancePass: thermodynamicRecord.entropyBalance.passed,
      thermalizationDepthPass: thermodynamicRecord.thermalizationDepth.passed,
      fluctuationPass: thermodynamicRecord.fluctuation.passed,
      sourceProvenancePass: thermodynamicRecord.sourceProvenance.passed,
      hiddenRetunePass: thermodynamicRecord.noHiddenRetune.passed,
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
          sourceEvidenceReferenceExists: sourceEvidence.rows[rowId]?.sourceEvidenceReferenceExists ?? null,
          sourceWindowId: rows[rowId]?.sourceWindowId ?? null,
          eventLedgerId: rows[rowId]?.eventLedgerId ?? null,
          thermalProvenanceId: rows[rowId]?.thermalProvenanceId ?? null,
        },
      ]),
    ),
    carrierBinding,
    sourceIdentity,
    sourceEvidence,
    sharedKeys,
    thermodynamicRecord,
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

function evaluateThermodynamicRecord(record, tolerances) {
  const stateSpace = evaluateStateSpace(record.stateSpace ?? {}, tolerances.measure);
  const deterministicPushforward = evaluatePushforward(
    record.deterministicPushforward ?? {},
    tolerances.pushforward,
  );
  const collisionOperator = evaluateCollisionOperator(record.collisionOperator ?? {}, tolerances.collision);
  const entropyBalance = evaluateEntropyBalance(record.entropyBalance ?? {}, tolerances.entropy);
  const thermalizationDepth = evaluateThermalizationDepth(
    record.thermalizationDepth ?? {},
    tolerances.thermalization,
  );
  const fluctuation = evaluateFluctuation(record.fluctuation ?? {}, tolerances.fluctuation);
  const sourceProvenance = evaluateScalarResidual(
    record.sourceProvenance?.residual ?? record.sourceProvenance?.maxResidual,
    tolerances.sourceProvenance,
  );
  const noHiddenRetune = evaluateScalarResidual(
    record.noHiddenRetune?.maxResidual ?? record.noHiddenRetune?.residual,
    tolerances.retune,
  );
  const passed =
    stateSpace.passed &&
    deterministicPushforward.passed &&
    collisionOperator.passed &&
    entropyBalance.passed &&
    thermalizationDepth.passed &&
    fluctuation.passed &&
    sourceProvenance.passed &&
    noHiddenRetune.passed;

  return {
    passed,
    stateSpace,
    deterministicPushforward,
    collisionOperator,
    entropyBalance,
    thermalizationDepth,
    fluctuation,
    sourceProvenance,
    noHiddenRetune,
  };
}

function evaluateStateSpace(stateSpace, tolerance) {
  const regionPresent = typeof stateSpace.regionId === "string" && stateSpace.regionId.length > 0;
  const coarseGrainingPresent =
    typeof stateSpace.coarseGrainingId === "string" && stateSpace.coarseGrainingId.length > 0;
  const measureMass = finiteNumber(stateSpace.measureMass, "stateSpace.measureMass");
  const measureResidual = measureMass - 1;
  return {
    regionId: stateSpace.regionId ?? null,
    coarseGrainingId: stateSpace.coarseGrainingId ?? null,
    measureMass,
    measureResidual,
    passed: regionPresent && coarseGrainingPresent && Math.abs(measureResidual) <= tolerance,
  };
}

function evaluatePushforward(pushforward, tolerance) {
  const projected = finiteArray(pushforward.projected_pushforward_mu, "deterministicPushforward.projected_pushforward_mu");
  const observed = finiteArray(pushforward.mu_t_delta, "deterministicPushforward.mu_t_delta");
  if (projected.length !== observed.length) {
    throw new Error("deterministicPushforward projected and observed measures must have the same length.");
  }
  const residuals = observed.map((value, index) => value - projected[index]);
  const maxAbsResidual = Math.max(...residuals.map((value) => Math.abs(value)));
  return {
    mu_t: Array.isArray(pushforward.mu_t) ? finiteArray(pushforward.mu_t, "deterministicPushforward.mu_t") : null,
    projected_pushforward_mu: projected,
    mu_t_delta: observed,
    residuals,
    maxAbsResidual,
    passed: maxAbsResidual <= tolerance,
  };
}

function evaluateCollisionOperator(collision, tolerance) {
  const source = String(collision.source ?? "");
  const sourcePass = source === "deterministic_unresolved";
  const dfDt = finiteArray(collision.df_dt, "collisionOperator.df_dt");
  const cEff = finiteArray(collision.C_eff, "collisionOperator.C_eff");
  const rBoltz = finiteArray(collision.R_boltz, "collisionOperator.R_boltz");
  if (dfDt.length !== cEff.length || dfDt.length !== rBoltz.length) {
    throw new Error("collisionOperator df_dt, C_eff, and R_boltz must have the same length.");
  }
  const residuals = dfDt.map((value, index) => value - cEff[index] - rBoltz[index]);
  const maxAbsResidual = Math.max(...residuals.map((value) => Math.abs(value)));
  return {
    source,
    sourcePass,
    residuals,
    maxAbsResidual,
    passed: sourcePass && maxAbsResidual <= tolerance,
  };
}

function evaluateEntropyBalance(entropy, tolerance) {
  const dSdt = finiteNumber(entropy.dS_dt, "entropyBalance.dS_dt");
  const sigma = finiteNumber(entropy.sigma_W, "entropyBalance.sigma_W");
  const boundaryFlux = finiteNumber(entropy.boundary_flux ?? 0, "entropyBalance.boundary_flux");
  const residualTerm = finiteNumber(entropy.R_Q ?? 0, "entropyBalance.R_Q");
  const balanceResidual = dSdt - sigma + boundaryFlux - residualTerm;
  const deltaSWindow = finiteNumber(entropy.deltaS_window ?? 0, "entropyBalance.deltaS_window");
  const deltaSBoundaryEnv = finiteNumber(entropy.deltaS_boundary_env ?? 0, "entropyBalance.deltaS_boundary_env");
  const epsilonFluc = finiteNumber(entropy.epsilon_fluc ?? 0, "entropyBalance.epsilon_fluc");
  const secondLawMargin = deltaSWindow + deltaSBoundaryEnv + residualTerm + epsilonFluc;
  return {
    dS_dt: dSdt,
    sigma_W: sigma,
    boundary_flux: boundaryFlux,
    R_Q: residualTerm,
    balanceResidual,
    deltaS_window: deltaSWindow,
    deltaS_boundary_env: deltaSBoundaryEnv,
    epsilon_fluc: epsilonFluc,
    secondLawMargin,
    passed: Math.abs(balanceResidual) <= tolerance && secondLawMargin >= -tolerance,
  };
}

function evaluateThermalizationDepth(thermalization, tolerance) {
  const dTh = finiteNumber(thermalization.D_th, "thermalizationDepth.D_th");
  const minimum = finiteNumber(thermalization.minimum, "thermalizationDepth.minimum");
  const photonChemicalPotential = finiteNumber(
    thermalization.photon_chemical_potential ?? 0,
    "thermalizationDepth.photon_chemical_potential",
  );
  return {
    D_th: dTh,
    minimum,
    photon_chemical_potential: photonChemicalPotential,
    depthMargin: dTh - minimum,
    passed: dTh >= minimum && Math.abs(photonChemicalPotential) <= tolerance,
  };
}

function evaluateFluctuation(fluctuation, tolerance) {
  const covarianceSymmetryResidual = finiteNumber(
    fluctuation.covariance_symmetry_residual ?? 0,
    "fluctuation.covariance_symmetry_residual",
  );
  const minCovarianceEigenvalue = finiteNumber(
    fluctuation.min_covariance_eigenvalue ?? 0,
    "fluctuation.min_covariance_eigenvalue",
  );
  return {
    covariance_symmetry_residual: covarianceSymmetryResidual,
    min_covariance_eigenvalue: minCovarianceEigenvalue,
    passed: Math.abs(covarianceSymmetryResidual) <= tolerance && minCovarianceEigenvalue >= -tolerance,
  };
}

function evaluateNegativeControls(baseRecord, negativeControls, tolerances) {
  return negativeControls.map((control) => {
    const record = deepMerge(baseRecord, control.overrides ?? {});
    const result = evaluateThermodynamicRecord(record, tolerances);
    const expectedFailedCheck = String(control.expectedFailedCheck ?? "");
    const check = getByPath(result, expectedFailedCheck);
    const failedAsExpected = check && check.passed === false;
    return {
      id: control.id ?? null,
      expectedFailedCheck,
      passed: Boolean(failedAsExpected),
      wholePacketPassed: result.passed,
      expectedCheckPassed: check?.passed ?? null,
      expectedCheckResidual:
        check?.balanceResidual ??
        check?.maxAbsResidual ??
        check?.depthMargin ??
        check?.residual ??
        check?.measureResidual ??
        null,
    };
  });
}

function evaluateSharedKeys(sharedKeys, tolerances) {
  const rows = sharedKeys.map((entry) => {
    const values = Array.isArray(entry.values) ? entry.values : [];
    const missing = values.length === 0;
    const first = values[0];
    const mismatches = values
      .map((value, index) => ({ index, value, residual: comparableResidual(value, first) }))
      .filter((result) => Math.abs(result.residual) > tolerances.carrier);
    return {
      key: entry.key ?? null,
      values,
      missing,
      passed: !missing && mismatches.length === 0,
      mismatches,
    };
  });
  return {
    accepted: rows.every((row) => row.passed),
    missingSharedKeys: rows.filter((row) => row.missing).map((row) => row.key),
    mismatches: rows.flatMap((row) =>
      row.mismatches.map((mismatch) => ({ key: row.key, ...mismatch })),
    ),
    rows,
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

function evaluateSourceIdentity({ packet, rows, commonCarrierId }) {
  const sourceIdentity = packet.sourceIdentity ?? {};
  const missingFields = SOURCE_IDENTITY_RECORD_FIELDS.filter(
    (field) => !concreteIdentityValue(sourceIdentity[field]),
  );
  const mismatches = [];
  const stateSpace = packet.thermodynamicRecord?.stateSpace ?? {};
  if (
    concreteIdentityValue(sourceIdentity.thetaThermId) &&
    concreteIdentityValue(commonCarrierId) &&
    sourceIdentity.thetaThermId !== commonCarrierId
  ) {
    mismatches.push({
      rowId: "sourceIdentity",
      field: "thetaThermId",
      expected: commonCarrierId,
      actual: sourceIdentity.thetaThermId,
      reason: "theta_therm_carrier_split",
    });
  }
  if (
    concreteIdentityValue(sourceIdentity.sourceWindowId) &&
    concreteIdentityValue(stateSpace.regionId) &&
    sourceIdentity.sourceWindowId !== stateSpace.regionId
  ) {
    mismatches.push({
      rowId: "thermodynamicRecord.stateSpace",
      field: "sourceWindowId",
      expected: sourceIdentity.sourceWindowId,
      actual: stateSpace.regionId,
      reason: "source_window_split",
    });
  }
  if (
    concreteIdentityValue(sourceIdentity.coarseGrainingId) &&
    concreteIdentityValue(stateSpace.coarseGrainingId) &&
    sourceIdentity.coarseGrainingId !== stateSpace.coarseGrainingId
  ) {
    mismatches.push({
      rowId: "thermodynamicRecord.stateSpace",
      field: "coarseGrainingId",
      expected: sourceIdentity.coarseGrainingId,
      actual: stateSpace.coarseGrainingId,
      reason: "coarse_graining_split",
    });
  }
  for (const rowId of REQUIRED_ROWS) {
    const row = rows[rowId] ?? {};
    for (const field of SOURCE_IDENTITY_FIELDS) {
      if (!concreteIdentityValue(row[field])) {
        mismatches.push({
          rowId,
          field,
          expected: sourceIdentity[field] ?? null,
          actual: row[field] ?? null,
          reason: `${field}_missing`,
        });
      } else if (
        concreteIdentityValue(sourceIdentity[field]) &&
        row[field] !== sourceIdentity[field]
      ) {
        mismatches.push({
          rowId,
          field,
          expected: sourceIdentity[field],
          actual: row[field],
          reason: `${field}_split`,
        });
      }
    }
  }
  return {
    passed: missingFields.length === 0 && mismatches.length === 0,
    sourceIdentity,
    missingFields,
    mismatches,
    firstMismatch: mismatches[0] ?? null,
  };
}

function evaluateSourceEvidence(rows) {
  const rowEntries = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => {
      const row = rows[rowId];
      const status = normalizeStatus(row);
      const sourcePath = isPlainObject(row) ? row.sourcePath ?? row.source ?? null : null;
      const source = evaluateSourcePath(sourcePath);
      const requiresEvidence = ACCEPTED_STATUSES.has(status);
      const passed = !requiresEvidence || source.evidenceAccepted;
      return [
        rowId,
        {
          rowId,
          status,
          sourcePath,
          sourceReferenceExists: source.accepted,
          sourceEvidenceReferenceExists: source.evidenceAccepted,
          reason: passed ? "passed" : source.evidenceReason,
          passed,
        },
      ];
    }),
  );
  const failures = Object.values(rowEntries).filter((entry) => !entry.passed);
  return {
    passed: failures.length === 0,
    failures,
    firstFailure: failures[0] ?? null,
    rows: rowEntries,
  };
}

function evaluateAcceptedRow(row) {
  const status = normalizeStatus(row);
  const sourcePath = isPlainObject(row) ? row.sourcePath ?? row.source ?? null : null;
  const source = evaluateSourcePath(sourcePath);
  const base = {
    accepted: false,
    status,
    reason: null,
    rowId: isPlainObject(row) ? row.rowId ?? row.id ?? null : null,
    carrierId: isPlainObject(row) ? row.carrierId ?? null : null,
    sourcePath,
    sourceReferenceExists: source.accepted,
  };
  if (!ACCEPTED_STATUSES.has(status)) {
    return { ...base, reason: "row_not_accepted" };
  }
  if (!source.accepted) {
    return { ...base, reason: source.reason };
  }
  if (!source.evidenceAccepted) {
    return { ...base, reason: source.evidenceReason };
  }
  return { ...base, accepted: true, reason: "accepted" };
}

function evaluateSourcePath(sourcePath) {
  if (typeof sourcePath !== "string" || sourcePath.trim() === "") {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "missing_source_path",
      evidenceReason: "missing_source_path",
    };
  }
  if (sourcePath.includes("placeholder") || sourcePath.includes("pending")) {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "placeholder_source_path",
      evidenceReason: "placeholder_source_path",
    };
  }
  if (sourcePath.startsWith("/tmp/") || sourcePath.startsWith("/private/tmp/")) {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "temp_source_path",
      evidenceReason: "temp_source_path",
    };
  }
  if (sourcePath.includes("content/generated/")) {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "generated_source_path",
      evidenceReason: "generated_source_path",
    };
  }
  const resolved = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath.replace(/#.*/, ""));
  if (!resolved.startsWith(REPO_ROOT)) {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "source_outside_repo",
      evidenceReason: "source_outside_repo",
    };
  }
  if (!fs.existsSync(resolved)) {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "source_missing",
      evidenceReason: "source_missing",
    };
  }
  if (!fs.statSync(resolved).isFile()) {
    return {
      accepted: false,
      evidenceAccepted: false,
      reason: "source_not_file",
      evidenceReason: "source_not_file",
    };
  }
  const evidenceReason = sourceEvidenceReason(resolved);
  return {
    accepted: true,
    evidenceAccepted: evidenceReason === "accepted",
    reason: "accepted",
    evidenceReason,
  };
}

function sourceEvidenceReason(resolvedPath) {
  const relative = path.relative(REPO_ROOT, path.normalize(resolvedPath));
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  const basename = path.basename(resolvedPath).toLowerCase();
  if (basename.includes("source-contract")) {
    return "source_contract_path";
  }
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes(".tmp")
  ) {
    return "control_or_attempt_source_path";
  }
  return "accepted";
}

function decideStatus({ missingRows, carrierBinding, sourceIdentity, sourceEvidence, sharedKeys, thermodynamicRecord, negativeControls }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!sourceIdentity.passed) {
    return sourceIdentity.missingFields.length > 0
      ? "blocked_source_identity_missing"
      : "blocked_source_window_split";
  }
  if (!sourceEvidence.passed) {
    return "blocked_source_evidence";
  }
  if (!sharedKeys.accepted) {
    return "blocked_shared_key_retune";
  }
  if (!thermodynamicRecord.passed) {
    return "blocked_residuals";
  }
  if (!negativeControls.every((control) => control.passed)) {
    return "blocked_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, carrierBinding, sourceIdentity, sourceEvidence, sharedKeys, thermodynamicRecord, negativeControls }) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return carrierBinding.commonCarrierId ? "carrier_split" : "missing_common_carrier";
  }
  if (!sourceIdentity.passed) {
    if (sourceIdentity.missingFields.length > 0) {
      return `missing_source_identity_${sourceIdentity.missingFields[0]}`;
    }
    const mismatch = sourceIdentity.firstMismatch;
    return mismatch?.field === "sourceWindowId"
      ? "source_window_split"
      : "source_identity_split";
  }
  if (!sourceEvidence.passed) {
    return "accepted_without_evidence_source";
  }
  if (!sharedKeys.accepted) {
    return sharedKeys.missingSharedKeys[0]
      ? `missing_shared_key_${sharedKeys.missingSharedKeys[0]}`
      : `shared_key_mismatch_${sharedKeys.mismatches[0]?.key ?? "unknown"}`;
  }
  if (!thermodynamicRecord.stateSpace.passed) {
    return "state_space_measure_residual";
  }
  if (!thermodynamicRecord.deterministicPushforward.passed) {
    return "deterministic_pushforward_residual";
  }
  if (!thermodynamicRecord.collisionOperator.passed) {
    return "collision_operator_residual";
  }
  if (!thermodynamicRecord.entropyBalance.passed) {
    return "entropy_balance_residual";
  }
  if (!thermodynamicRecord.thermalizationDepth.passed) {
    return "thermalization_depth_residual";
  }
  if (!thermodynamicRecord.fluctuation.passed) {
    return "fluctuation_residual";
  }
  if (!thermodynamicRecord.sourceProvenance.passed) {
    return "source_provenance_residual";
  }
  if (!thermodynamicRecord.noHiddenRetune.passed) {
    return "hidden_retune_residual";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_failed_${failedControl.id}`;
  }
  return status;
}

function firstBlockerDetails({
  nextBlocker,
  missingRows,
  rowChecks,
  carrierBinding,
  sourceIdentity,
  sourceEvidence,
  sharedKeys,
  thermodynamicRecord,
  negativeControls,
}) {
  if (!nextBlocker) {
    return null;
  }
  if (missingRows.length > 0) {
    const rowId = missingRows[0];
    return {
      id: rowId,
      ...rowChecks[rowId],
    };
  }
  if (!carrierBinding.passed) {
    return {
      id: "common_carrier",
      status: "failed",
      reason: carrierBinding.commonCarrierId ? "carrier_split" : "missing_common_carrier",
      commonCarrierId: carrierBinding.commonCarrierId,
      mismatches: carrierBinding.mismatches,
    };
  }
  if (!sourceIdentity.passed) {
    return {
      id: "source_identity",
      status: "failed",
      reason: sourceIdentity.missingFields.length > 0
        ? "source_identity_missing"
        : sourceIdentity.firstMismatch?.reason ?? "source_identity_split",
      missingFields: sourceIdentity.missingFields,
      firstMismatch: sourceIdentity.firstMismatch,
      mismatchCount: sourceIdentity.mismatches.length,
    };
  }
  if (!sourceEvidence.passed) {
    return {
      id: sourceEvidence.firstFailure?.rowId ?? "source_evidence",
      status: sourceEvidence.firstFailure?.status ?? "failed",
      reason: sourceEvidence.firstFailure?.reason ?? "accepted_without_evidence_source",
      sourcePath: sourceEvidence.firstFailure?.sourcePath ?? null,
      sourceReferenceExists:
        sourceEvidence.firstFailure?.sourceReferenceExists ?? null,
      sourceEvidenceReferenceExists:
        sourceEvidence.firstFailure?.sourceEvidenceReferenceExists ?? null,
      failureCount: sourceEvidence.failures.length,
    };
  }
  if (!sharedKeys.accepted) {
    return {
      id: sharedKeys.missingSharedKeys[0] ?? sharedKeys.mismatches[0]?.key ?? "shared_keys",
      status: "failed",
      reason: sharedKeys.missingSharedKeys[0] ? "missing_shared_key" : "shared_key_mismatch",
      missingSharedKeys: sharedKeys.missingSharedKeys,
      firstMismatch: sharedKeys.mismatches[0] ?? null,
    };
  }
  const failedResidual = [
    ["state_space", thermodynamicRecord.stateSpace],
    ["deterministic_pushforward", thermodynamicRecord.deterministicPushforward],
    ["collision_operator", thermodynamicRecord.collisionOperator],
    ["entropy_balance", thermodynamicRecord.entropyBalance],
    ["thermalization_depth", thermodynamicRecord.thermalizationDepth],
    ["fluctuation", thermodynamicRecord.fluctuation],
    ["source_provenance", thermodynamicRecord.sourceProvenance],
    ["no_hidden_retune", thermodynamicRecord.noHiddenRetune],
  ].find(([, row]) => !row.passed);
  if (failedResidual) {
    return {
      id: failedResidual[0],
      status: "failed",
      reason: `${failedResidual[0]}_residual`,
      details: failedResidual[1],
    };
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return {
      id: failedControl.id,
      status: "failed",
      reason: "negative_control_failed",
      details: failedControl,
    };
  }
  return {
    id: nextBlocker,
    status: "unknown",
    reason: nextBlocker,
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = finiteNumber(value ?? 0, "residual");
  return {
    residual,
    tolerance,
    passed: Math.abs(residual) <= tolerance,
  };
}

function normalizeStatus(row) {
  if (row === undefined || row === null) {
    return "missing";
  }
  if (typeof row === "string") {
    return row;
  }
  return String(row.status ?? row.evidenceStatus ?? "missing");
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function finiteArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a nonempty array.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function comparableResidual(value, expected) {
  if (typeof value === "number" && typeof expected === "number") {
    return value - expected;
  }
  return JSON.stringify(value) === JSON.stringify(expected) ? 0 : Infinity;
}

function concreteIdentityValue(value) {
  return typeof value === "string" && value.trim() !== "";
}

function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override;
  }
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = key in result ? deepMerge(result[key], value) : value;
  }
  return result;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getByPath(object, pathExpression) {
  return pathExpression
    .split(".")
    .filter(Boolean)
    .reduce((current, key) => (current === undefined || current === null ? undefined : current[key]), object);
}
