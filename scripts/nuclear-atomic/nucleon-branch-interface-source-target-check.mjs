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
const ACCEPTED_EVIDENCE_STATUSES = new Set(["accepted_non_fixture_source"]);
const DEFAULT_INPUT =
  "scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json";
const TOLERANCE = 1e-12;

const REQUIRED_ACCEPTED_SOURCE_ROWS = Object.freeze({
  nucleon_branch_interface_ledgers: [
    "accepted_proton_branch_interface_ledger",
    "accepted_neutron_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ],
  pn_orientation_count: [
    "accepted_proton_branch_interface_ledger",
    "accepted_neutron_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ],
  pp_orientation_count: [
    "accepted_proton_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ],
  same_record_energy_momentum_angular_momentum_ledger: [],
});
const REQUIRED_SOURCE_TARGET_COMPONENTS = Object.freeze({
  accepted_proton_branch_interface_ledger: [
    "retained_orientation_rows",
    "closed_corridor_sharing_count",
    "branch_exposure_row",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ],
  accepted_neutron_branch_interface_ledger: [
    "retained_orientation_rows",
    "closed_corridor_sharing_count",
    "branch_exposure_row",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ],
  same_record_energy_momentum_angular_momentum_ledger: [
    "pn_orientation_count",
    "pp_orientation_count",
    "energy_conservation_row",
    "momentum_conservation_row",
    "angular_momentum_conservation_row",
    "coulomb_separation_row",
  ],
  no_open_color_far_field: [
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
  ],
});

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
  const sourceEvidenceCheck = evaluateSourceEvidence(rowChecks);
  const sourceAcquisitionCheck = evaluateSourceAcquisition(
    rows,
    input?.sourceAcquisitionTargets ?? {},
  );
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
  const status = decideStatus({
    schemaOk,
    missingRows,
    algebraicFailures,
    sourceEvidenceCheck,
    sourceAcquisitionCheck,
  });
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
      sourceEvidencePass: sourceEvidenceCheck.passed,
      sourceAcquisitionPass: sourceAcquisitionCheck.passed,
      sourceAcquisitionFirstMissingObject:
        sourceAcquisitionCheck.firstMissingAcceptedSourceRow
          ? `missing_${sourceAcquisitionCheck.firstMissingAcceptedSourceRow}`
          : null,
      scoreDecision: "no_score_increase",
    },
    requiredRows: [...REQUIRED_ROWS],
    rowChecks,
    sourceEvidenceCheck,
    sourceAcquisitionCheck,
    channelChecks,
    differential,
    acceptanceRule:
      "The branch-interface target is promotion-ready only when every required row is accepted from durable non-fixture source evidence, each row's upstream accepted source rows are satisfied, each source-acquisition target preserves its required ledger-component shape, and the p+n/p+p orientation extraction still passes the same-record algebraic checks.",
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
        sourceEvidenceCheck: report.sourceEvidenceCheck,
        sourceAcquisitionCheck: report.sourceAcquisitionCheck,
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
  const status = normalizeStatus(row);
  const currentEvidenceStatus = row?.currentEvidenceStatus ?? null;
  const acceptedStatus = ACCEPTED_STATUSES.has(status);
  const evidenceAccepted = ACCEPTED_EVIDENCE_STATUSES.has(currentEvidenceStatus);
  return {
    rowId,
    sourceRowId: row?.id ?? row?.rowId ?? null,
    status,
    acceptedStatus,
    evidenceAccepted,
    accepted: acceptedStatus && evidenceAccepted,
    currentEvidenceStatus,
  };
}

function evaluateSourceEvidence(rowChecks) {
  const failures = Object.values(rowChecks)
    .filter((check) => check.acceptedStatus === true && check.evidenceAccepted !== true)
    .map((check) => ({
      rowId: check.rowId,
      currentEvidenceStatus: check.currentEvidenceStatus,
      reason: "accepted_status_without_accepted_non_fixture_source",
    }));
  return {
    requiredEvidenceStatus: "accepted_non_fixture_source",
    failures,
    passed: failures.length === 0,
  };
}

function evaluateSourceAcquisition(rows, sourceAcquisitionTargets) {
  const targetChecks = evaluateSourceAcquisitionTargets(sourceAcquisitionTargets);
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      evaluateSourceAcquisitionRow(rowId, rows[rowId], targetChecks),
    ]),
  );
  const failures = [
    ...Object.values(rowChecks).flatMap((check) => {
      const rowFailures = [];
      if (
        check.missingDeclaredRequiredRows.length > 0 ||
        check.extraDeclaredRequiredRows.length > 0
      ) {
        rowFailures.push({
          rowId: check.rowId,
          reason: "required_accepted_source_rows_declaration_mismatch",
          missingDeclaredRequiredRows: check.missingDeclaredRequiredRows,
          extraDeclaredRequiredRows: check.extraDeclaredRequiredRows,
        });
      }
      if (check.missingAcceptedSourceRows.length > 0) {
        rowFailures.push({
          rowId: check.rowId,
          reason: "missing_accepted_source_rows",
          missingAcceptedSourceRows: check.missingAcceptedSourceRows,
        });
      }
      return rowFailures;
    }),
    ...Object.values(targetChecks)
      .filter((check) => check.accepted !== true)
      .map((check) => ({
        sourceRowId: check.sourceRowId,
        reason: sourceAcquisitionTargetFailureReason(check),
        status: check.status,
        currentEvidenceStatus: check.currentEvidenceStatus,
        missingRequiredComponents: check.missingRequiredComponents,
        extraRequiredComponents: check.extraRequiredComponents,
      })),
  ];
  return {
    requiredDeclarationField: "requiredAcceptedSourceRows",
    acceptedRowsField: "acceptedSourceRows",
    sourceAcquisitionTargetsField: "sourceAcquisitionTargets",
    targetChecks,
    rowChecks,
    failures,
    firstMissingAcceptedSourceRow:
      Object.values(rowChecks)
        .flatMap((check) => check.missingAcceptedSourceRows)
        .find(Boolean) ?? null,
    passed: failures.length === 0,
  };
}

function evaluateSourceAcquisitionTargets(sourceAcquisitionTargets) {
  const expectedSourceRows = [
    ...new Set(Object.values(REQUIRED_ACCEPTED_SOURCE_ROWS).flat()),
  ];
  return Object.fromEntries(
    expectedSourceRows.map((sourceRowId) => {
      const target = sourceAcquisitionTargets[sourceRowId];
      const present =
        target && typeof target === "object" && !Array.isArray(target);
      const status = present ? normalizeStatus(target) : "missing";
      const currentEvidenceStatus = present
        ? target.currentEvidenceStatus ?? null
        : null;
      const acceptedStatus = ACCEPTED_STATUSES.has(status);
      const evidenceAccepted =
        ACCEPTED_EVIDENCE_STATUSES.has(currentEvidenceStatus);
      const expectedRequiredComponents =
        REQUIRED_SOURCE_TARGET_COMPONENTS[sourceRowId] ?? [];
      const requiredLedgerComponents = Array.isArray(
        target?.requiredLedgerComponents,
      )
        ? target.requiredLedgerComponents
        : [];
      const missingRequiredComponents = expectedRequiredComponents.filter(
        (component) => !requiredLedgerComponents.includes(component),
      );
      const extraRequiredComponents = requiredLedgerComponents.filter(
        (component) => !expectedRequiredComponents.includes(component),
      );
      const componentShapePass =
        missingRequiredComponents.length === 0 &&
        extraRequiredComponents.length === 0;
      return [
        sourceRowId,
        {
          sourceRowId,
          targetId: present ? target.id ?? target.rowId ?? null : null,
          present,
          status,
          currentEvidenceStatus,
          acceptedStatus,
          evidenceAccepted,
          expectedRequiredComponents,
          requiredLedgerComponents,
          missingRequiredComponents,
          extraRequiredComponents,
          componentShapePass,
          accepted: acceptedStatus && evidenceAccepted && componentShapePass,
          sourceTargetPath: present ? target.sourceTargetPath ?? null : null,
          requiredScope: present ? target.requiredScope ?? null : null,
        },
      ];
    }),
  );
}

function sourceAcquisitionTargetFailureReason(check) {
  if (check.present !== true) {
    return "source_acquisition_target_missing";
  }
  if (check.componentShapePass !== true) {
    return "source_acquisition_target_shape_mismatch";
  }
  return "source_acquisition_target_not_accepted";
}

function evaluateSourceAcquisitionRow(rowId, row, targetChecks) {
  const expectedRequiredRows = REQUIRED_ACCEPTED_SOURCE_ROWS[rowId] ?? [];
  const declaredRequiredRows = Array.isArray(row?.requiredAcceptedSourceRows)
    ? row.requiredAcceptedSourceRows
    : [];
  const acceptedSourceRows = Array.isArray(row?.acceptedSourceRows)
    ? row.acceptedSourceRows
    : Array.isArray(row?.satisfiedAcceptedSourceRows)
      ? row.satisfiedAcceptedSourceRows
      : [];
  const acceptedTargetRows = new Set(
    Object.values(targetChecks)
      .filter((check) => check.accepted === true)
      .map((check) => check.sourceRowId),
  );
  const missingDeclaredRequiredRows = expectedRequiredRows.filter(
    (sourceRow) => !declaredRequiredRows.includes(sourceRow),
  );
  const extraDeclaredRequiredRows = declaredRequiredRows.filter(
    (sourceRow) => !expectedRequiredRows.includes(sourceRow),
  );
  const missingAcceptedSourceRows = declaredRequiredRows.filter(
    (sourceRow) =>
      !acceptedSourceRows.includes(sourceRow) ||
      !acceptedTargetRows.has(sourceRow),
  );
  const unacceptedSourceTargets = declaredRequiredRows.filter(
    (sourceRow) => !acceptedTargetRows.has(sourceRow),
  );
  return {
    rowId,
    expectedRequiredRows,
    declaredRequiredRows,
    acceptedSourceRows,
    missingDeclaredRequiredRows,
    extraDeclaredRequiredRows,
    missingAcceptedSourceRows,
    unacceptedSourceTargets,
    passed:
      missingDeclaredRequiredRows.length === 0 &&
      extraDeclaredRequiredRows.length === 0 &&
      missingAcceptedSourceRows.length === 0,
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
    accepted:
      ACCEPTED_STATUSES.has(normalizeStatus(row)) &&
      ACCEPTED_EVIDENCE_STATUSES.has(row.currentEvidenceStatus),
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

function decideStatus({
  schemaOk,
  missingRows,
  algebraicFailures,
  sourceEvidenceCheck,
  sourceAcquisitionCheck,
}) {
  if (!schemaOk) {
    return "schema_mismatch";
  }
  if (algebraicFailures.length > 0) {
    return "branch_interface_algebra_mismatch";
  }
  if (sourceEvidenceCheck.passed !== true) {
    return "branch_interface_source_evidence_mismatch";
  }
  if (missingRows.length > 0) {
    return "missing_accepted_branch_interface_rows";
  }
  if (sourceAcquisitionCheck.passed !== true) {
    return "branch_interface_source_acquisition_incomplete";
  }
  return "accepted_branch_interface_source_rows";
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
