#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const INPUT_SCHEMA =
  "aaa-nuclear-atomic-nucleon-branch-interface-source-target/v1";
export const OUTPUT_SCHEMA =
  "aaa-nuclear-atomic-nucleon-branch-interface-source-target-check/v1";

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const REQUIRED_ROWS = Object.freeze([
  "nucleon_branch_interface_ledgers",
  "pn_orientation_count",
  "pp_orientation_count",
  "same_record_energy_momentum_angular_momentum_ledger",
]);
const DEFAULT_INPUT =
  "scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json";
const TOLERANCE = 1e-12;

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const inputPath = path.resolve(args.input);
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const report = buildNucleonBranchInterfaceSourceTargetCheck(input, {
    inputPath,
  });
  writeReport(report, args);
  if (args.requireAccepted && report.summary.status !== "accepted_branch_interface_source_rows") {
    process.exitCode = 1;
  }
}

export function buildNucleonBranchInterfaceSourceTargetCheck(
  input,
  { inputPath = DEFAULT_INPUT } = {},
) {
  const rows = input?.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      buildRowCheck(rowId, rows[rowId]),
    ]),
  );
  const channelChecks = {
    pn_orientation_count: evaluateOrientationRow(rows.pn_orientation_count, {
      expectedChannel: "p+n",
    }),
    pp_orientation_count: evaluateOrientationRow(rows.pp_orientation_count, {
      expectedChannel: "p+p",
    }),
  };
  const differential = evaluateChannelDifferential(channelChecks);
  const missingRows = REQUIRED_ROWS.filter(
    (rowId) => rowChecks[rowId].accepted !== true,
  );
  const algebraicFailures = [
    ...Object.entries(channelChecks)
      .filter(([, check]) => check.passed !== true)
      .map(([rowId]) => rowId),
    ...(differential.passed ? [] : ["pn_pp_channel_differential"]),
  ];
  const schemaOk = input?.schema === INPUT_SCHEMA;
  const status = decideStatus({ schemaOk, missingRows, algebraicFailures });
  const firstMissingRow = missingRows[0] ?? null;

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input?.schema ?? null,
      schemaOk,
      claimLevel: input?.claimLevel ?? null,
      status: input?.status ?? null,
    },
    summary: {
      status,
      allRequiredRowsAccepted: schemaOk && missingRows.length === 0,
      missingRows,
      firstMissingRow,
      firstMissingObject: firstMissingRow ? `missing_accepted_${firstMissingRow}` : null,
      algebraicPass: algebraicFailures.length === 0,
      algebraicFailures,
      pnPpDifferentialPass: differential.passed,
      scoreDecision: "no_score_increase",
    },
    requiredRows: [...REQUIRED_ROWS],
    rowChecks,
    channelChecks,
    differential,
    acceptanceRule:
      "The branch-interface target is promotion-ready only when every required row is accepted and the p+n/p+p orientation extraction still passes the same-record algebraic checks.",
  };
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT,
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
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--pretty") {
      parsed.pretty = true;
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
  console.log(`Usage: node scripts/nuclear-atomic/nucleon-branch-interface-source-target-check.mjs [options]

Options:
  --input PATH          Source-target JSON to inspect.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless all branch-interface rows are accepted.
  --help                Show this help.

This checker keeps the Fe/Ni toy branch-interface source target fail-closed:
it can verify the p+n/p+p orientation extraction algebra without treating
target-only rows as accepted source evidence.`);
}

function writeReport(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        input: report.input,
        summary: report.summary,
        rowChecks: report.rowChecks,
        differential: report.differential,
      }
    : report;
  const text = JSON.stringify(payload, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function buildRowCheck(rowId, row) {
  return {
    rowId,
    sourceRowId: row?.id ?? row?.rowId ?? null,
    status: normalizeStatus(row),
    accepted: acceptedSourceRow(row),
    currentEvidenceStatus: row?.currentEvidenceStatus ?? null,
  };
}

function evaluateOrientationRow(row, { expectedChannel }) {
  const failures = [];
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return {
      expectedChannel,
      passed: false,
      failures: ["row_missing"],
    };
  }
  const nShare = finiteNumber(row.N_share);
  const nRet = finiteNumber(row.N_ret);
  const sigmaOrient = finiteNumber(row.sigma_orient);
  const pC = finiteNumber(row.P_c);
  const wC = finiteNumber(row.W_c);
  const mC = finiteNumber(row.M_c);
  if (row.channel !== expectedChannel) {
    failures.push("channel_mismatch");
  }
  if (!(nRet > 0)) {
    failures.push("N_ret_not_positive");
  }
  if (!(nShare >= 0 && nShare <= nRet)) {
    failures.push("N_share_out_of_range");
  }
  if (!(pC >= 0 && pC <= 1)) {
    failures.push("P_c_out_of_range");
  }
  if (!(wC >= 0 && wC <= 1)) {
    failures.push("W_c_out_of_range");
  }
  if (!(mC >= 0 && mC <= 1)) {
    failures.push("M_c_out_of_range");
  }
  const expectedSigma = nRet > 0 ? nShare / nRet : null;
  if (!nearlyEqual(sigmaOrient, expectedSigma)) {
    failures.push("sigma_orient_mismatch");
  }
  if (!nearlyEqual(wC, sigmaOrient * pC)) {
    failures.push("W_c_mismatch");
  }
  if (!nearlyEqual(mC, 1 - wC)) {
    failures.push("M_c_mismatch");
  }
  return {
    expectedChannel,
    sourceRowId: row.id ?? row.rowId ?? null,
    status: normalizeStatus(row),
    accepted: acceptedSourceRow(row),
    values: {
      N_share: nShare,
      N_ret: nRet,
      sigma_orient: sigmaOrient,
      P_c: pC,
      W_c: wC,
      M_c: mC,
    },
    expected: {
      sigma_orient: expectedSigma,
      W_c: sigmaOrient * pC,
      M_c: 1 - wC,
    },
    passed: failures.length === 0,
    failures,
  };
}

function evaluateChannelDifferential(channelChecks) {
  const pn = channelChecks.pn_orientation_count;
  const pp = channelChecks.pp_orientation_count;
  const failures = [];
  if (pn?.passed !== true) {
    failures.push("pn_orientation_check_failed");
  }
  if (pp?.passed !== true) {
    failures.push("pp_orientation_check_failed");
  }
  if (!(pn?.values?.W_c > pp?.values?.W_c)) {
    failures.push("pn_weight_not_greater_than_pp_weight");
  }
  if (!(pn?.values?.M_c < pp?.values?.M_c)) {
    failures.push("pn_mismatch_not_less_than_pp_mismatch");
  }
  return {
    comparison:
      "p+n must expose a stronger compatible corridor weight and lower mismatch cost than p+p under the same extraction rule.",
    passed: failures.length === 0,
    failures,
    pn: {
      W_c: pn?.values?.W_c ?? null,
      M_c: pn?.values?.M_c ?? null,
    },
    pp: {
      W_c: pp?.values?.W_c ?? null,
      M_c: pp?.values?.M_c ?? null,
    },
  };
}

function decideStatus({ schemaOk, missingRows, algebraicFailures }) {
  if (!schemaOk) {
    return "schema_mismatch";
  }
  if (algebraicFailures.length > 0) {
    return "branch_interface_algebra_mismatch";
  }
  if (missingRows.length > 0) {
    return "missing_accepted_branch_interface_rows";
  }
  return "accepted_branch_interface_source_rows";
}

function acceptedSourceRow(row) {
  return (
    row &&
    typeof row === "object" &&
    !Array.isArray(row) &&
    ACCEPTED_STATUSES.has(row.status)
  );
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return typeof row.status === "string" ? row.status : "missing";
}

function finiteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function nearlyEqual(left, right) {
  if (left === null || right === null) {
    return false;
  }
  return Math.abs(left - right) <= TOLERANCE;
}
