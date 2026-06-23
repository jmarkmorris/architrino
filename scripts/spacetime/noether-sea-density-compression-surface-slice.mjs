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
  const retuneStatus = input.retune?.status ?? "not_evaluated";
  const retuneResidual = optionalFiniteNumber(input.retune?.residual, "retune.residual");
  const retuneFailed =
    retuneStatus === "failed" ||
    retuneStatus === "retuned" ||
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
  const status = retuneFailed
    ? "failed_retune"
    : missingRowsAll.length === 0 &&
        sameRecordGatePass &&
        speedStressMetricGatePass
      ? "populated"
      : "blocked_missing_rows";

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
        kk_or_delayed_support: isAcceptedRetainedRow(rowStatuses.causality_row)
          ? 0
          : null,
        retune: retuneFailed ? 1 : null,
      },
      gates: {
        same_theta_sea_record: sameRecordGatePass ? "pass" : "fail",
        speed_plus_stress_or_metric: speedStressMetricGatePass ? "pass" : "fail",
        missing_outputs_declared:
          undeclaredMissingOutputs.length === 0 ? "pass" : "fail",
      },
    },
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
  };
}

function missingRetainedRows(required, rows) {
  return required.filter((row) => !isAcceptedRetainedRow(rows[row]));
}

function missingStressOrMetricRows(rows) {
  const stressAccepted = isAcceptedRetainedRow(rows.stress_strain_row);
  const metricAccepted = isAcceptedRetainedRow(rows.metric_embedding_row);
  return stressAccepted || metricAccepted ? [] : ["stress_strain_row_or_metric_embedding_row"];
}

function isAcceptedRetainedRow(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  if (!["accepted", "populated", "passed"].includes(value.status)) {
    return false;
  }
  const sourceOk = concreteString(value.sourcePath) || concreteString(value.source);
  const idOk =
    concreteString(value.rowId) ||
    concreteString(value.eventId) ||
    concreteString(value.eventLedgerRef);
  return sourceOk && idOk;
}

function normalizeStatus(value) {
  if (value === undefined || value === null) {
    return "missing";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return value.status ?? "declared";
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

function concreteString(value) {
  return (
    typeof value === "string" &&
    value.trim() !== "" &&
    value.trim() !== "..." &&
    !value.includes("<") &&
    !value.toLowerCase().includes("todo")
  );
}
