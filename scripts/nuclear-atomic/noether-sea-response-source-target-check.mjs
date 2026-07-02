#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ACCEPTED_STATUSES,
  PROVIDER_SCHEMA,
  evaluateThetaSeaRhoNsProviderObject,
  providerSourcePathRejectionReason,
} from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";

export const INPUT_SCHEMA = PROVIDER_SCHEMA;
export const OUTPUT_SCHEMA =
  "aaa-nuclear-atomic-noether-sea-response-source-target-check/v1";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(SCRIPT_PATH), "../..");
const DEFAULT_INPUT =
  "scripts/spacetime/noether-sea-density-compression-provider.v1.json";

const REQUIRED_ROWS = Object.freeze([
  "rho_NS",
  "n",
  "u_sea",
  "e_sea",
  "theta_sea",
  "f_N",
  "channel_declaration_row",
  "speed_row",
  "stress_strain_row",
  "causality_row",
  "correlation_row",
]);

const ROW_GROUPS = Object.freeze({
  rho_NS: "thetaSeaRows",
  n: "thetaSeaRows",
  u_sea: "thetaSeaRows",
  e_sea: "thetaSeaRows",
  theta_sea: "thetaSeaRows",
  f_N: "thetaSeaRows",
  channel_declaration_row: "responseRows",
  speed_row: "responseRows",
  stress_strain_row: "responseRows",
  causality_row: "responseRows",
  correlation_row: "responseRows",
});

const REQUIRED_TOY_BINDING_ROWS = Object.freeze({
  coefficients: {
    alphaSea: ["rho_NS", "theta_sea", "stress_strain_row"],
    seaImbalancePenalty: ["rho_NS", "theta_sea"],
  },
  graphRules: {
    noether_sea_polarization_reward: [
      "rho_NS",
      "theta_sea",
      "stress_strain_row",
      "causality_row",
    ],
  },
});

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const inputPath = path.resolve(args.input);
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const report = buildNoetherSeaResponseSourceTargetCheck(input, {
    inputPath,
  });
  writeReport(report, args);
  if (
    args.requireAccepted &&
    report.summary.status !== "accepted_noether_sea_response_rows"
  ) {
    process.exitCode = 1;
  }
}

export function buildNoetherSeaResponseSourceTargetCheck(
  input,
  { inputPath = DEFAULT_INPUT } = {},
) {
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, buildRowCheck(rowId, input)]),
  );
  const sourceEvidenceCheck = evaluateSourceEvidence(inputPath);
  const providerObjectCheck = evaluateProviderObject(input);
  const windowCheck = evaluateWindow(input, rowChecks);
  const responseAgreementCheck = evaluateResponseAgreement(input);
  const toyBindingCheck = evaluateToyBindingRows(rowChecks);
  const missingRows = REQUIRED_ROWS.filter(
    (rowId) => rowChecks[rowId].accepted !== true,
  );
  const structuralFailures = [
    ...(sourceEvidenceCheck.passed ? [] : ["sourceEvidence"]),
    ...(providerObjectCheck.passed ? [] : ["providerObject"]),
    ...(windowCheck.passed ? [] : ["retainedWindow"]),
    ...(responseAgreementCheck.passed ? [] : ["acousticElasticAgreement"]),
    ...(toyBindingCheck.passed ? [] : ["toyBindingRows"]),
  ];
  const schemaOk = input?.schema === INPUT_SCHEMA;
  const status = decideStatus({ schemaOk, missingRows, structuralFailures });
  const firstMissingRow = missingRows[0] ?? null;

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input?.schema ?? null,
      schemaOk,
      claimLevel: input?.claimLevel ?? null,
      providerStatus: input?.providerStatus ?? input?.status ?? null,
    },
    summary: {
      status,
      allRequiredRowsAccepted: schemaOk && missingRows.length === 0,
      missingRows,
      firstMissingRow,
      firstMissingObject: firstMissingRow
        ? `missing_accepted_${firstMissingRow}`
        : null,
      structuralPass: structuralFailures.length === 0,
      structuralFailures,
      sourceEvidencePass: sourceEvidenceCheck.passed,
      providerObjectPass: providerObjectCheck.passed,
      retainedWindowPass: windowCheck.passed,
      responseAgreementPass: responseAgreementCheck.passed,
      toyBindingRowsPass: toyBindingCheck.passed,
      scoreDecision: "no_score_increase",
    },
    requiredRows: [...REQUIRED_ROWS],
    rowChecks,
    sourceEvidenceCheck,
    providerObjectCheck,
    windowCheck,
    responseAgreementCheck,
    toyBindingCheck,
    acceptanceRule:
      "The Noether sea response target is promotion-ready only when the retained-window provider is durable source evidence, every required density/response row is accepted, acoustic-elastic agreement remains within the refinement tolerance, and Fe/Ni toy bindings consume only accepted rows.",
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
  console.log(`Usage: node scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs [options]

Options:
  --input PATH          Noether sea provider JSON to inspect.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless all Noether sea response rows are accepted.
  --help                Show this help.

This checker keeps the Fe/Ni toy Noether sea binding explicit: it verifies
the retained-window provider rows consumed by alphaSea, seaImbalancePenalty,
and the noether_sea_polarization_reward graph rule.`);
}

function writeReport(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        input: report.input,
        summary: report.summary,
        rowChecks: report.rowChecks,
        sourceEvidenceCheck: report.sourceEvidenceCheck,
        providerObjectCheck: report.providerObjectCheck,
        responseAgreementCheck: report.responseAgreementCheck,
        toyBindingCheck: report.toyBindingCheck,
      }
    : report;
  const text = JSON.stringify(payload, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function buildRowCheck(rowId, input) {
  const group = ROW_GROUPS[rowId];
  const row = input?.[group]?.[rowId];
  return {
    rowId,
    group,
    sourceRowId: row?.rowId ?? row?.eventId ?? row?.eventLedgerRef ?? null,
    status: normalizeStatus(row),
    accepted: acceptedSourceRow(row),
    eventLedgerRef: row?.eventLedgerRef ?? row?.eventId ?? null,
  };
}

function evaluateSourceEvidence(inputPath) {
  const resolvedPath = path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(REPO_ROOT, inputPath);
  const rejectionReason = providerSourcePathRejectionReason(resolvedPath, REPO_ROOT);
  return {
    resolvedPath,
    passed: rejectionReason === null,
    reason: rejectionReason ?? "source_file",
  };
}

function evaluateProviderObject(input) {
  const status = evaluateThetaSeaRhoNsProviderObject(input);
  return {
    passed: status.accepted === true,
    reason: status.reason,
    providerStatus: status.providerStatus ?? null,
    missingOrRejectedFields: status.missingOrRejectedFields ?? [],
    agreementResidual: status.agreementResidual ?? null,
  };
}

function evaluateWindow(input, rowChecks) {
  const window = input?.window ?? {};
  const eventLedgerId = window.eventLedgerId ?? input?.eventLedgerId ?? null;
  const missing = [];
  for (const field of [
    "windowId",
    "ell",
    "retainedInventoryId",
    "smoothingKernelId",
    "eventLedgerId",
    "refinementFamilyId",
  ]) {
    if (!concreteString(window[field] ?? input?.[field])) {
      missing.push(`window.${field}`);
    }
  }
  const eventMismatches = Object.values(rowChecks)
    .filter((check) => check.rowId !== "event_ledger_ref")
    .filter(
      (check) =>
        concreteString(eventLedgerId) &&
        concreteString(check.eventLedgerRef) &&
        check.eventLedgerRef !== eventLedgerId,
    )
    .map((check) => check.rowId);
  return {
    windowId: window.windowId ?? input?.windowId ?? null,
    eventLedgerId,
    missing,
    eventMismatches,
    passed: missing.length === 0 && eventMismatches.length === 0,
  };
}

function evaluateResponseAgreement(input) {
  const window = input?.window ?? {};
  const thetaRows = input?.thetaSeaRows ?? {};
  const responseRows = input?.responseRows ?? {};
  const retune = input?.retuneWitness ?? {};
  const agreement = input?.acousticElasticAgreement ?? {};
  const failures = [];
  if (!acceptedSourceRow(agreement)) {
    failures.push("agreement_not_accepted");
  }
  if (agreement.windowId !== window.windowId) {
    failures.push("window_id_mismatch");
  }
  if (agreement.ell !== window.ell) {
    failures.push("ell_mismatch");
  }
  if (agreement.speedRowId !== responseRows.speed_row?.rowId) {
    failures.push("speed_row_id_mismatch");
  }
  if (agreement.stressStrainRowId !== responseRows.stress_strain_row?.rowId) {
    failures.push("stress_strain_row_id_mismatch");
  }
  if (agreement.rhoRowId !== thetaRows.rho_NS?.rowId) {
    failures.push("rho_row_id_mismatch");
  }
  const retuneWitnessId = retune.witnessId ?? retune.rowId ?? null;
  if (!concreteString(retuneWitnessId) || agreement.retuneWitnessId !== retuneWitnessId) {
    failures.push("retune_witness_id_mismatch");
  }
  const cDispSquared = finiteNumberOrNull(agreement.c_X_disp_squared);
  const C1111 = finiteNumberOrNull(agreement.C1111_X);
  const rhoNS = finiteNumberOrNull(agreement.rho_NS);
  const tolerance = finiteNumberOrNull(agreement.epsilon_ref);
  const residual =
    cDispSquared !== null && C1111 !== null && rhoNS !== null && rhoNS > 0
      ? Math.abs(cDispSquared - C1111 / rhoNS)
      : null;
  if (
    residual === null ||
    tolerance === null ||
    tolerance < 0 ||
    residual > tolerance
  ) {
    failures.push("numeric_residual_outside_refinement");
  }
  return {
    speedRowId: agreement.speedRowId ?? null,
    stressStrainRowId: agreement.stressStrainRowId ?? null,
    rhoRowId: agreement.rhoRowId ?? null,
    retuneWitnessId: agreement.retuneWitnessId ?? null,
    residual,
    tolerance,
    passed: failures.length === 0,
    failures,
  };
}

function evaluateToyBindingRows(rowChecks) {
  const failures = [];
  const unconsumedRequiredRows = [];
  for (const [scope, rowsByObject] of Object.entries(REQUIRED_TOY_BINDING_ROWS)) {
    for (const [objectId, requiredRows] of Object.entries(rowsByObject)) {
      for (const rowId of requiredRows) {
        const rowCheck = rowChecks[rowId];
        if (!rowCheck) {
          unconsumedRequiredRows.push({ scope, objectId, rowId });
          continue;
        }
        if (rowCheck.accepted !== true) {
          failures.push({ scope, objectId, rowId, reason: "row_not_accepted" });
        }
      }
    }
  }
  return {
    requiredRows: REQUIRED_TOY_BINDING_ROWS,
    passed: failures.length === 0 && unconsumedRequiredRows.length === 0,
    failures,
    unconsumedRequiredRows,
  };
}

function decideStatus({ schemaOk, missingRows, structuralFailures }) {
  if (!schemaOk) {
    return "source_schema_mismatch";
  }
  if (structuralFailures.length > 0) {
    return "noether_sea_response_structure_mismatch";
  }
  if (missingRows.length > 0) {
    return "missing_accepted_noether_sea_response_rows";
  }
  return "accepted_noether_sea_response_rows";
}

function acceptedSourceRow(row) {
  return (
    row &&
    typeof row === "object" &&
    !Array.isArray(row) &&
    ACCEPTED_STATUSES.has(normalizeStatus(row))
  );
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }
  return typeof row.status === "string" ? row.status : null;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return text !== "" && text !== "..." && !text.toLowerCase().includes("pending");
}
