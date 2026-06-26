#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "noether-sea-density-compression-surface-slice-mock.json"
);
const INPUT_SCHEMA =
  "aaa-noether-sea-density-compression-surface-slice-input/v1";
const OUTPUT_SCHEMA =
  "aaa-noether-sea-density-compression-surface-slice-result/v1";
const ACCEPTED_ROW_STATUSES = new Set(["accepted", "populated", "passed"]);

const THETA_SEA_ROWS = [
  "rho_NS",
  "n",
  "u_sea",
  "e_sea",
  "theta_sea",
  "f_N",
  "event_ledger_ref",
];

const REQUIRED_ROWS = [
  "channel_declaration_row",
  "speed_row",
  "causality_row",
  "correlation_row",
];

const STRESS_OR_METRIC_ROWS = ["stress_strain_row", "metric_embedding_row"];

const SURFACE_KEYS = [
  "delta_c_X_squared",
  "delta_C_ij_kl",
  "delta_N",
  "delta_gamma_ij",
  "delta_G_eff",
  "delta_P_eff",
  "delta_a_star",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const input = readJson(path.resolve(args.input));
const output = evaluateSlice(input);
writeOutput(args, output);

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
  console.log(`Usage: node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs [options]

Options:
  --input PATH             Density-compression slice input. Defaults to the mock packet.
  --out PATH               Write JSON output to PATH.
  --summary                Emit compact status, missing-row, and surface-vector summary.
  --pretty                 Pretty-print JSON output.
  --require-populated      Exit nonzero unless the retained slice is populated.
  --help                   Show this help.

This runner evaluates the first density-compression surface slice for one
declared Noether sea window and one response channel. It is score-neutral until
the retained theta-sea rows and required response rows are populated.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(parsedArgs, output) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluateSlice(input) {
  const thetaSeaRows = input.window?.thetaSeaRows ?? {};
  const rowStatuses = input.rows ?? {};
  const surfaceVector = computeSurfaceVector(input.jacobian ?? {}, input.delta_ln_n);
  const acousticElasticAgreement = evaluateAcousticElasticAgreement({
    raw:
      input.coefficientChecks?.acousticElasticAgreement ??
      input.acousticElasticAgreement,
    input,
    thetaSeaRows,
    rowStatuses,
  });
  const missingThetaRows = missingRetainedRows(THETA_SEA_ROWS, thetaSeaRows);
  const missingRequiredRows = [
    ...missingRetainedRows(REQUIRED_ROWS, rowStatuses),
    ...missingStressOrMetricRows(rowStatuses),
  ];
  const undeclaredMissingOutputs = undeclaredNullOutputs(surfaceVector, input);
  const missingRowsAll = [
    ...missingThetaRows,
    ...missingRequiredRows,
    ...undeclaredMissingOutputs,
  ];
  const sameThetaSeaRecord = missingThetaRows.length === 0;
  const speedPresent = isAcceptedRetainedRow(rowStatuses.speed_row);
  const stressPresent = isAcceptedRetainedRow(rowStatuses.stress_strain_row);
  const metricPresent = isAcceptedRetainedRow(rowStatuses.metric_embedding_row);
  const speedCoefficientPresent = surfaceVector.delta_c_X_squared !== null;
  const stressCoefficientPresent = surfaceVector.delta_C_ij_kl !== null;
  const metricCoefficientPresent =
    surfaceVector.delta_N !== null || surfaceVector.delta_gamma_ij !== null;
  const rawRetuneStatus = input.retune?.status ?? "not_evaluated";
  const retuneStatus = normalizeRetuneStatus(input.retune);
  const retuneResidual = optionalFiniteNumber(input.retune?.residual, "retune.residual");
  const retuneFailed =
    rawRetuneStatus === "failed" ||
    rawRetuneStatus === "retuned" ||
    (retuneResidual !== null && retuneResidual !== 0);
  const retunePassed =
    (retuneStatus === "passed" || retuneStatus === "accepted") &&
    retuneResidual === 0 &&
    Array.isArray(input.retune?.changedRows) &&
    input.retune.changedRows.length === 0;
  const missingOutputs = declaredMissingOutputs(input);
  const coefficientGatePass =
    speedCoefficientPresent &&
    ((stressPresent && stressCoefficientPresent) ||
      (metricPresent && metricCoefficientPresent));
  const sameRecordGatePass = sameThetaSeaRecord && retunePassed;
  const speedStressMetricGatePass =
    speedPresent && (stressPresent || metricPresent) && coefficientGatePass;
  const acousticElasticAgreementGatePass =
    acousticElasticAgreement.accepted === true;
  const status = retuneFailed
    ? "failed_retune"
    : missingRowsAll.length === 0 &&
        sameRecordGatePass &&
        speedStressMetricGatePass &&
        acousticElasticAgreementGatePass
      ? "populated"
      : "blocked_missing_rows";
  const firstBlocker = nextBlockerForSlice({
    status,
    missingThetaRows,
    missingRequiredRows,
    undeclaredMissingOutputs,
    retuneFailed,
    retunePassed,
    speedStressMetricGatePass,
    acousticElasticAgreement,
  });
  const firstBlockerDetails = nextBlockerDetailsForSlice({
    nextBlocker: firstBlocker,
    thetaSeaRows,
    rowStatuses,
    input,
    retuneStatus,
    retuneResidual,
    acousticElasticAgreement,
    surfaceVector,
  });
  const consumerReadiness = evaluateConsumerReadiness({
    status,
    firstBlocker,
    surfaceVector,
    input,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    summary: {
      status,
      scoreDecision: "no_score_increase",
      supportedRows: [
        "EQ-06",
        "EQ-07",
        "EQ-08",
        "EQ-09",
        "EQ-10",
        "EQ-11",
        "EQ-20",
        "EQ-24",
        "EQ-32",
      ],
      windowId: input.window?.windowId ?? null,
      ell: input.window?.ell ?? null,
      channel: input.channel?.id ?? null,
      channelType: input.channel?.type ?? null,
      missingThetaRows,
      missingRequiredRows,
      missingOutputs,
      undeclaredMissingOutputs,
      nextBlocker: firstBlocker,
      nextBlockerDetails: firstBlockerDetails,
      thetaSeaRowStatuses: Object.fromEntries(
        THETA_SEA_ROWS.map((row) => [row, normalizeStatus(thetaSeaRows[row])])
      ),
      requiredRowStatuses: Object.fromEntries(
        REQUIRED_ROWS.map((row) => [row, normalizeStatus(rowStatuses[row])])
      ),
      stressOrMetricRowStatuses: Object.fromEntries(
        STRESS_OR_METRIC_ROWS.map((row) => [row, normalizeStatus(rowStatuses[row])])
      ),
      retuneStatus,
      retuneResidual,
      acousticElasticAgreementStatus: acousticElasticAgreement.status,
      numericAgreementStatus: acousticElasticAgreement.numericStatus,
      acousticElasticAgreementResidual:
        acousticElasticAgreement.absoluteResidual,
    },
    row: {
      windowId: input.window?.windowId ?? null,
      ell: input.window?.ell ?? null,
      channel: input.channel?.id ?? null,
      thetaSeaRows: THETA_SEA_ROWS.map((row) => ({
        row,
        status: normalizeStatus(thetaSeaRows[row]),
      })),
      requiredRows: REQUIRED_ROWS.map((row) => ({
        row,
        status: normalizeStatus(rowStatuses[row]),
      })),
      stressOrMetricRows: STRESS_OR_METRIC_ROWS.map((row) => ({
        row,
        status: normalizeStatus(rowStatuses[row]),
      })),
      deltaLnN: finiteNumber(input.delta_ln_n ?? 0, "delta_ln_n"),
      surfaceVector,
      residuals: {
        rho_to_surface: status === "populated" ? 0 : null,
        projection_refinement: null,
        acoustic_elastic_agreement:
          acousticElasticAgreement.status === "passed"
            ? acousticElasticAgreement.absoluteResidual
            : null,
        kk_or_delayed_support: isAcceptedRetainedRow(rowStatuses.causality_row)
          ? 0
          : null,
        retune: retuneFailed ? 1 : null,
      },
      gates: {
        same_theta_sea_record: sameRecordGatePass ? "pass" : "fail",
        speed_plus_stress_or_metric: speedStressMetricGatePass ? "pass" : "fail",
        acoustic_elastic_agreement: acousticElasticAgreement.status,
        missing_outputs_declared:
          undeclaredMissingOutputs.length === 0 ? "pass" : "fail",
      },
      acousticElasticAgreement,
      consumerReadiness,
    },
  };
}

function nextBlockerDetailsForSlice({
  nextBlocker,
  thetaSeaRows,
  rowStatuses,
  input,
  retuneStatus,
  retuneResidual,
  acousticElasticAgreement,
  surfaceVector,
}) {
  if (!nextBlocker) {
    return null;
  }
  const thetaPrefix = "missing_accepted_theta_sea_";
  if (nextBlocker.startsWith(thetaPrefix)) {
    const row = nextBlocker.slice(thetaPrefix.length);
    return retainedRowDetail(`theta_sea_${row}`, thetaSeaRows[row]);
  }
  const rowPrefix = "missing_accepted_";
  if (nextBlocker.startsWith(rowPrefix)) {
    const row = nextBlocker.slice(rowPrefix.length);
    if (row === "stress_strain_row_or_metric_embedding_row") {
      return {
        id: row,
        stressStrainRow: retainedRowDetail(
          "stress_strain_row",
          rowStatuses.stress_strain_row,
        ),
        metricEmbeddingRow: retainedRowDetail(
          "metric_embedding_row",
          rowStatuses.metric_embedding_row,
        ),
      };
    }
    if (row === "retune_witness_zero") {
      return {
        id: row,
        status: retuneStatus,
        residual: retuneResidual,
        sourcePath: input.retune?.sourcePath ?? input.retune?.source ?? null,
        witnessId: input.retune?.witnessId ?? input.retune?.rowId ?? null,
        changedRows: input.retune?.changedRows ?? null,
      };
    }
    if (row === "acoustic_elastic_agreement") {
      return {
        id: row,
        status: acousticElasticAgreement.status,
        numericStatus: acousticElasticAgreement.numericStatus,
        missingAcceptedInputs: acousticElasticAgreement.missingAcceptedInputs,
      };
    }
    return retainedRowDetail(row, rowStatuses[row]);
  }
  const outputPrefix = "undeclared_missing_output_";
  if (nextBlocker.startsWith(outputPrefix)) {
    const output = nextBlocker.slice(outputPrefix.length);
    return {
      id: output,
      status: "undeclared_missing_output",
      projectedValue: surfaceVector[output] ?? null,
      declaredMissingOutputs: declaredMissingOutputs(input),
    };
  }
  if (nextBlocker === "retune_failed") {
    return {
      id: "retune",
      status: retuneStatus,
      residual: retuneResidual,
      changedRows: input.retune?.changedRows ?? null,
    };
  }
  if (nextBlocker === "missing_speed_plus_stress_or_metric_coefficient") {
    return {
      id: nextBlocker,
      delta_c_X_squared: surfaceVector.delta_c_X_squared,
      delta_C_ij_kl: surfaceVector.delta_C_ij_kl,
      delta_N: surfaceVector.delta_N,
      delta_gamma_ij: surfaceVector.delta_gamma_ij,
      speedRow: retainedRowDetail("speed_row", rowStatuses.speed_row),
      stressStrainRow: retainedRowDetail(
        "stress_strain_row",
        rowStatuses.stress_strain_row,
      ),
      metricEmbeddingRow: retainedRowDetail(
        "metric_embedding_row",
        rowStatuses.metric_embedding_row,
      ),
    };
  }
  if (
    nextBlocker === "missing_acoustic_elastic_agreement" ||
    nextBlocker === "acoustic_elastic_agreement_residual" ||
    nextBlocker === "missing_accepted_acoustic_elastic_agreement"
  ) {
    return {
      id: "acousticElasticAgreement",
      status: acousticElasticAgreement.status,
      numericStatus: acousticElasticAgreement.numericStatus,
      missingAcceptedInputs: acousticElasticAgreement.missingAcceptedInputs,
      absoluteResidual: acousticElasticAgreement.absoluteResidual,
      refinementError: acousticElasticAgreement.refinementError,
    };
  }
  return {
    id: nextBlocker,
    reason: nextBlocker,
  };
}

function retainedRowDetail(id, row) {
  const status = normalizeStatus(row);
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return {
      id,
      status,
      rowType: row === undefined || row === null ? "missing" : typeof row,
      reason: status,
    };
  }
  const sourcePath = row.sourcePath ?? row.source ?? null;
  return {
    id,
    status,
    rowId: row.rowId ?? null,
    eventId: row.eventId ?? null,
    eventLedgerRef: row.eventLedgerRef ?? null,
    sourcePath,
    sourceConcrete: concreteString(sourcePath),
    sourceReferenceExists: sourceReferenceExists(sourcePath),
    retainedReferencePresent:
      concreteString(row.rowId) ||
      concreteString(row.eventId) ||
      concreteString(row.eventLedgerRef),
    reason:
      status === "accepted" || status === "populated" || status === "passed"
        ? "accepted"
        : status,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    summary: output.summary,
    surfaceVector: output.row.surfaceVector,
    gates: output.row.gates,
    consumerReadiness: output.row.consumerReadiness,
    acousticElasticAgreement: output.row.acousticElasticAgreement,
  };
}

function evaluateConsumerReadiness({ status, firstBlocker, surfaceVector, input }) {
  return {
    EQ24_density_compression: readinessForConsumer({
      row: "EQ-24",
      purpose: "score-4 density-compression coefficient bundle",
      status,
      firstBlocker,
      surfaceVector,
      input,
      requiredOutputs: ["delta_c_X_squared", "delta_C_ij_kl"],
    }),
    EQ11_weak_gravity: readinessForConsumer({
      row: "EQ-11",
      purpose: "weak-gravity metric/coupling projection",
      status,
      firstBlocker,
      surfaceVector,
      input,
      requiredOutputs: ["delta_N", "delta_gamma_ij", "delta_G_eff"],
    }),
    EQ20_pressure_lambda: readinessForConsumer({
      row: "EQ-20",
      purpose: "pressure/effective-Lambda projection",
      status,
      firstBlocker,
      surfaceVector,
      input,
      requiredOutputs: ["delta_P_eff"],
    }),
    EQ32_low_acceleration: readinessForConsumer({
      row: "EQ-32",
      purpose: "low-acceleration response projection",
      status,
      firstBlocker,
      surfaceVector,
      input,
      requiredOutputs: ["delta_a_star"],
    }),
  };
}

function readinessForConsumer({
  row,
  purpose,
  status,
  firstBlocker,
  surfaceVector,
  input,
  requiredOutputs,
}) {
  const outputStatuses = Object.fromEntries(
    requiredOutputs.map((key) => [key, outputStatus(key, surfaceVector, input)])
  );
  const blockedOutput = Object.entries(outputStatuses).find(
    ([, value]) => value !== "projected"
  );
  const projectionStatus = blockedOutput
    ? `blocked_${blockedOutput[1]}`
    : "projected";
  const readiness =
    status === "populated" && !blockedOutput
      ? "ready_for_consumer_review"
      : "blocked";
  return {
    row,
    purpose,
    readiness,
    sliceBlocker: firstBlocker,
    projectionBlocker: blockedOutput ? blockedOutput[0] : null,
    projectionStatus,
    requiredOutputs,
    outputStatuses,
  };
}

function outputStatus(key, surfaceVector, input) {
  if (hasProjectedOutput(surfaceVector[key])) {
    return "projected";
  }
  if (declaredMissingOutputs(input).includes(key)) {
    return "declared_missing_output";
  }
  return "undeclared_missing_output";
}

function hasProjectedOutput(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => hasProjectedOutput(entry));
  }
  if (typeof value === "object") {
    return Object.values(value).some((entry) => hasProjectedOutput(entry));
  }
  return false;
}

function missingRetainedRows(required, rows) {
  return required.filter((row) => !isAcceptedRetainedRow(rows[row]));
}

function missingStressOrMetricRows(rows) {
  const stressAccepted = isAcceptedRetainedRow(rows.stress_strain_row);
  const metricAccepted = isAcceptedRetainedRow(rows.metric_embedding_row);
  return stressAccepted || metricAccepted ? [] : ["stress_strain_row_or_metric_embedding_row"];
}

function nextBlockerForSlice({
  status,
  missingThetaRows,
  missingRequiredRows,
  undeclaredMissingOutputs,
  retuneFailed,
  retunePassed,
  speedStressMetricGatePass,
  acousticElasticAgreement,
}) {
  if (status === "populated") {
    return null;
  }
  if (retuneFailed) {
    return "retune_failed";
  }
  if (missingThetaRows.length > 0) {
    return `missing_accepted_theta_sea_${missingThetaRows[0]}`;
  }
  if (missingRequiredRows.length > 0) {
    return `missing_accepted_${missingRequiredRows[0]}`;
  }
  if (!retunePassed) {
    return "missing_accepted_retune_witness_zero";
  }
  if (!speedStressMetricGatePass) {
    return "missing_speed_plus_stress_or_metric_coefficient";
  }
  if (acousticElasticAgreement.status === "not_evaluated") {
    return "missing_acoustic_elastic_agreement";
  }
  if (acousticElasticAgreement.status === "failed") {
    return "acoustic_elastic_agreement_residual";
  }
  if (acousticElasticAgreement.accepted !== true) {
    return "missing_accepted_acoustic_elastic_agreement";
  }
  if (undeclaredMissingOutputs.length > 0) {
    return `undeclared_missing_output_${undeclaredMissingOutputs[0]}`;
  }
  return status;
}

function evaluateAcousticElasticAgreement({ raw, input, thetaSeaRows, rowStatuses }) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      status: "not_evaluated",
      numericStatus: "not_evaluated",
      accepted: false,
      missingAcceptedInputs: ["acousticElasticAgreement"],
      cDispSquared: null,
      C1111: null,
      rhoNS: null,
      cElasticSquared: null,
      absoluteResidual: null,
      normalizedResidual: null,
      refinementError: null,
    };
  }
  const cDispSquared = finiteNumber(
    raw.c_X_disp_squared ?? raw.cDispSquared ?? raw.c_disp_squared,
    "coefficientChecks.acousticElasticAgreement.c_X_disp_squared",
  );
  const C1111 = finiteNumber(
    raw.C1111_X ?? raw.C1111 ?? raw.c1111,
    "coefficientChecks.acousticElasticAgreement.C1111_X",
  );
  const rhoNS = positiveFiniteNumber(
    raw.rho_NS ?? raw.rhoNS,
    "coefficientChecks.acousticElasticAgreement.rho_NS",
  );
  const refinementError = nonnegativeFiniteNumber(
    raw.refinementError ?? raw.epsilon_ref ?? raw.tolerance,
    "coefficientChecks.acousticElasticAgreement.refinementError",
  );
  const cElasticSquared = C1111 / rhoNS;
  const absoluteResidual = Math.abs(cDispSquared - cElasticSquared);
  const normalizedResidual =
    absoluteResidual /
    (Math.abs(cDispSquared) + Math.abs(cElasticSquared) + Number.EPSILON);
  const numericPassed = absoluteResidual <= refinementError;
  const missingAcceptedInputs = acousticElasticAgreementMissingInputs({
    raw,
    input,
    thetaSeaRows,
    rowStatuses,
  });
  const accepted = numericPassed && missingAcceptedInputs.length === 0;
  return {
    status: !numericPassed
      ? "failed"
      : accepted
        ? "passed"
        : "attempt_numeric_passed",
    numericStatus: numericPassed ? "passed" : "failed",
    accepted,
    missingAcceptedInputs,
    cDispSquared,
    C1111,
    rhoNS,
    cElasticSquared,
    absoluteResidual,
    normalizedResidual,
    refinementError,
  };
}

function acousticElasticAgreementMissingInputs({
  raw,
  input,
  thetaSeaRows,
  rowStatuses,
}) {
  const missing = [];
  if (!isAcceptedRetainedRow(raw)) {
    missing.push("accepted_agreement_row");
  }
  if (raw.windowId !== input.window?.windowId) {
    missing.push("same_window_id");
  }
  if (raw.ell !== input.window?.ell) {
    missing.push("same_ell");
  }
  if (raw.channelId !== input.channel?.id) {
    missing.push("same_channel_id");
  }
  if (!concreteString(raw.responseKernelId)) {
    missing.push("response_kernel_id");
  }
  if (raw.speedRowId !== rowStatuses.speed_row?.rowId) {
    missing.push("speed_row_id");
  }
  if (raw.stressStrainRowId !== rowStatuses.stress_strain_row?.rowId) {
    missing.push("stress_strain_row_id");
  }
  if (raw.rhoRowId !== thetaSeaRows.rho_NS?.rowId) {
    missing.push("rho_row_id");
  }
  const retuneWitnessId =
    input.retune?.witnessId ??
    input.retune?.rowId ??
    input.retune?.eventLedgerRef ??
    null;
  if (!concreteString(retuneWitnessId) || raw.retuneWitnessId !== retuneWitnessId) {
    missing.push("retune_witness_id");
  }
  if (!concreteString(raw.refinementFamilyId)) {
    missing.push("refinement_family_id");
  }
  return missing;
}

function isAcceptedRetainedRow(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  if (!ACCEPTED_ROW_STATUSES.has(value.status)) {
    return false;
  }
  const sourceOk = concreteString(value.sourcePath) || concreteString(value.source);
  const sourceFound =
    sourceReferenceExists(value.sourcePath) || sourceReferenceExists(value.source);
  const idOk =
    concreteString(value.rowId) ||
    concreteString(value.eventId) ||
    concreteString(value.eventLedgerRef);
  return sourceOk && sourceFound && idOk;
}

function normalizeStatus(value) {
  if (value === undefined || value === null) {
    return "missing";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    const status = value.status ?? "declared";
    if (!ACCEPTED_ROW_STATUSES.has(status)) {
      return status;
    }
    const sourceOk = concreteString(value.sourcePath) || concreteString(value.source);
    const sourceFound =
      sourceReferenceExists(value.sourcePath) || sourceReferenceExists(value.source);
    const idOk =
      concreteString(value.rowId) ||
      concreteString(value.eventId) ||
      concreteString(value.eventLedgerRef);
    if (!sourceOk) {
      return "accepted_without_concrete_source";
    }
    if (!sourceFound) {
      return "accepted_without_existing_source";
    }
    if (!idOk) {
      return "accepted_without_row_reference";
    }
    return status;
  }
  return "invalid";
}

function normalizeRetuneStatus(value) {
  if (value === undefined || value === null) {
    return "not_evaluated";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    const status = value.status ?? "declared";
    if (!ACCEPTED_ROW_STATUSES.has(status)) {
      return status;
    }
    const sourceOk = concreteString(value.sourcePath) || concreteString(value.source);
    const sourceFound =
      sourceReferenceExists(value.sourcePath) || sourceReferenceExists(value.source);
    const idOk =
      concreteString(value.rowId) ||
      concreteString(value.witnessId) ||
      concreteString(value.eventId) ||
      concreteString(value.eventLedgerRef);
    if (!sourceOk) {
      return "accepted_without_concrete_retune_source";
    }
    if (!sourceFound) {
      return "accepted_without_existing_retune_source";
    }
    if (!idOk) {
      return "accepted_without_retune_witness_reference";
    }
    return status;
  }
  return "invalid";
}

function computeSurfaceVector(jacobian, deltaLnN) {
  const delta = finiteNumber(deltaLnN ?? 0, "delta_ln_n");
  return Object.fromEntries(
    SURFACE_KEYS.map((key) => [key, scaleValue(jacobian[key], delta)])
  );
}

function scaleValue(value, scalar) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number") {
    return value * scalar;
  }
  if (Array.isArray(value)) {
    return value.map((entry) => scaleValue(entry, scalar));
  }
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, scaleValue(entry, scalar)])
    );
  }
  throw new Error(`Unsupported jacobian entry type: ${typeof value}`);
}

function declaredMissingOutputs(input) {
  const declared = Array.isArray(input.missing_outputs) ? input.missing_outputs : [];
  return declared.filter((entry) => SURFACE_KEYS.includes(entry));
}

function undeclaredNullOutputs(surfaceVector, input) {
  const declared = new Set(declaredMissingOutputs(input));
  return SURFACE_KEYS.filter(
    (key) => surfaceVector[key] === null && !declared.has(key)
  );
}

function optionalFiniteNumber(value, label) {
  if (value === undefined || value === null) {
    return null;
  }
  return finiteNumber(value, label);
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function positiveFiniteNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function nonnegativeFiniteNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new Error(`${label} must be nonnegative.`);
  }
  return number;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !text.toLowerCase().includes("todo") &&
    !text.toLowerCase().includes("pending") &&
    !text.toLowerCase().includes("placeholder")
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
