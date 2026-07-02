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
const SOURCE_ACQUISITION_ROUTES = Object.freeze({
  no_open_color_far_field: {
    requiredAcceptedRowsBeforeUse: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
    feedsRowsAfterAcceptance: [
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
    notRequiredBeforeAcceptance: [
      "accepted_branch_interface_rows",
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
  },
});
const REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS = Object.freeze({
  no_open_color_far_field: {
    requiredAcceptedSourceRowsBeforeUse: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
    requiredSameRecordRows: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
    requiredClosureRows: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
    ],
    requiredLimitStatements: [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
    requiredSufficientConditionRows: [
      "Delta_E_corr_NN_tail_limit",
      "bounded_residual_overlap",
      "large_r_zero_limit",
      "K_open_finite",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "candidate_extracted",
      "sample_level_finite_tail",
      "target_only_no_open_color",
    ],
  },
  nucleon_branch_interface_ledgers: {
    requiredAcceptedSourceRowsBeforeUse: [
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
    requiredSameRecordRows: [
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "pn_orientation_count",
      "pp_orientation_count",
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
    requiredClosureRows: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
    ],
    requiredLimitStatements: [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
    requiredInequalities: ["W_pn > W_pp", "M_pn < M_pp"],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "candidate_extracted",
      "target_only_no_open_color",
    ],
  },
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
  const acceptedSourceRowProofTargets = evaluateAcceptedSourceRowProofTargets(
    input?.acceptedSourceRowProofTargets ?? {},
    input?.toyBindingRows ?? {},
  );
  const sourceAcquisitionBlockerMap = buildSourceAcquisitionBlockerMap({
    sourceAcquisitionCheck,
    toyBindingRows: input?.toyBindingRows ?? {},
    acceptedSourceRowProofTargets,
  });
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
    acceptedSourceRowProofTargets,
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
      acceptedSourceRowProofTargetPass:
        acceptedSourceRowProofTargets.summary.passed,
      acceptedSourceRowProofTargetFailures:
        acceptedSourceRowProofTargets.summary.failures,
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
    acceptedSourceRowProofTargets,
    sourceAcquisitionCheck,
    sourceAcquisitionBlockerMap,
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
it can verify the p+n/p+p orientation extraction algebra and the accepted
proton/neutron source-acquisition rows without treating top-level target-only rows as
accepted source evidence.`);
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
        acceptedSourceRowProofTargets: report.acceptedSourceRowProofTargets,
        sourceAcquisitionCheck: report.sourceAcquisitionCheck,
        sourceAcquisitionBlockerMap: report.sourceAcquisitionBlockerMap,
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

function evaluateAcceptedSourceRowProofTargets(proofTargets, toyBindingRows) {
  const targets = Object.fromEntries(
    Object.entries(REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS).map(
      ([rowId, expected]) => [
        rowId,
        evaluateAcceptedSourceRowProofTarget(
          rowId,
          proofTargets[rowId],
          expected,
          toyBindingRows,
        ),
      ],
    ),
  );
  const failures = Object.values(targets).flatMap((target) =>
    target.passed
      ? []
      : [
          {
            rowId: target.rowId,
            reason: acceptedSourceRowProofTargetFailureReason(target),
            missingFields: target.missingFields,
            mismatchedFields: target.mismatchedFields,
          },
        ],
  );
  return {
    summary: {
      requiredField: "acceptedSourceRowProofTargets",
      requiredRows: Object.keys(REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS),
      passed: failures.length === 0,
      failures,
    },
    targets,
  };
}

function evaluateAcceptedSourceRowProofTarget(
  rowId,
  target,
  expected,
  toyBindingRows,
) {
  const present = target && typeof target === "object" && !Array.isArray(target);
  const status = present ? normalizeStatus(target) : "missing";
  const claimLevel = present ? target.claimLevel ?? null : null;
  const expectedArrayFields = Object.keys(expected);
  const missingFields = [
    ...requiredStringFields(target, ["id", "claimLevel", "currentEvidenceStatus"]),
    ...requiredArrayFields(target, expectedArrayFields),
  ];
  const mismatchedFields = [];
  if (status !== "target_required") {
    mismatchedFields.push("status");
  }
  if (typeof claimLevel !== "string" || !claimLevel.includes("not accepted source evidence")) {
    mismatchedFields.push("claimLevel");
  }
  for (const [field, expectedRows] of Object.entries(expected)) {
    if (!sameStringSet(target?.[field], expectedRows)) {
      mismatchedFields.push(field);
    }
  }
  return {
    rowId,
    targetId: present ? target.id ?? null : null,
    present,
    status,
    currentEvidenceStatus: present ? target.currentEvidenceStatus ?? null : null,
    claimLevel,
    requiredAcceptedSourceRowsBeforeUse:
      target?.requiredAcceptedSourceRowsBeforeUse ?? [],
    requiredSameRecordRows: target?.requiredSameRecordRows ?? [],
    requiredClosureRows: target?.requiredClosureRows ?? [],
    requiredLimitStatements: target?.requiredLimitStatements ?? [],
    requiredInequalities: target?.requiredInequalities ?? [],
    requiredSufficientConditionRows:
      target?.requiredSufficientConditionRows ?? [],
    forbiddenPromotionSources: target?.forbiddenPromotionSources ?? [],
    currentPriorityPacket: present ? target.currentPriorityPacket ?? null : null,
    directToyConsumers: directToyConsumersForBranchRows(toyBindingRows, [rowId]),
    missingFields,
    mismatchedFields,
    passed:
      present &&
      missingFields.length === 0 &&
      mismatchedFields.length === 0,
  };
}

function requiredStringFields(target, fields) {
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return fields;
  }
  return fields.filter((field) => typeof target[field] !== "string" || target[field] === "");
}

function requiredArrayFields(target, fields) {
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return fields;
  }
  return fields.filter((field) => !Array.isArray(target[field]));
}

function acceptedSourceRowProofTargetFailureReason(target) {
  if (target.present !== true) {
    return "accepted_source_row_proof_target_missing";
  }
  if (target.missingFields.length > 0) {
    return "accepted_source_row_proof_target_field_missing";
  }
  return "accepted_source_row_proof_target_shape_mismatch";
}

function sameStringSet(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) {
    return false;
  }
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value) => right.includes(value));
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

function buildSourceAcquisitionBlockerMap({
  sourceAcquisitionCheck,
  toyBindingRows,
  acceptedSourceRowProofTargets,
}) {
  const missingSourceRows = [
    ...new Set(
      Object.values(sourceAcquisitionCheck.rowChecks)
        .flatMap((check) => check.missingAcceptedSourceRows),
    ),
  ];
  const blockers = missingSourceRows.map((sourceRowId) =>
    sourceAcquisitionBlocker(
      sourceAcquisitionCheck,
      toyBindingRows,
      sourceRowId,
      acceptedSourceRowProofTargets,
    ),
  );
  const firstBlocker = blockers[0] ?? null;
  return {
    status:
      blockers.length === 0
        ? "all_required_source_rows_acquired"
        : "blocked_missing_accepted_source_rows",
    claimLevel:
      "source-acquisition blocker map; not accepted source evidence and not promotion evidence",
    firstMissingAcceptedSourceRow: firstBlocker?.sourceRowId ?? null,
    firstMissingObject: firstBlocker ? `missing_${firstBlocker.sourceRowId}` : null,
    blockedSourceRowCount: blockers.length,
    blockers,
  };
}

function sourceAcquisitionBlocker(
  sourceAcquisitionCheck,
  toyBindingRows,
  sourceRowId,
  acceptedSourceRowProofTargets,
) {
  const targetCheck = sourceAcquisitionCheck.targetChecks[sourceRowId] ?? {};
  const blockedBranchRows = Object.values(sourceAcquisitionCheck.rowChecks)
    .filter((check) => check.missingAcceptedSourceRows.includes(sourceRowId))
    .map((check) => check.rowId);
  const proofTargetRows = [...new Set([sourceRowId, ...blockedBranchRows])];
  return {
    sourceRowId,
    targetId: targetCheck.targetId ?? null,
    status: targetCheck.status ?? null,
    currentEvidenceStatus: targetCheck.currentEvidenceStatus ?? null,
    accepted: targetCheck.accepted === true,
    sourceTargetPath: targetCheck.sourceTargetPath ?? null,
    requiredScope: targetCheck.requiredScope ?? null,
    requiredLedgerComponents: targetCheck.requiredLedgerComponents ?? [],
    missingRequiredComponents: targetCheck.missingRequiredComponents ?? [],
    blockedBranchRows,
    acceptedSourceRowProofTargets: Object.fromEntries(
      proofTargetRows
        .map((rowId) => [
          rowId,
          acceptedSourceRowProofTargets?.targets?.[rowId] ?? null,
        ])
        .filter(([, target]) => target),
    ),
    sourceAcquisitionRoute: sourceAcquisitionRouteForSourceRow(
      sourceRowId,
      targetCheck,
      blockedBranchRows,
    ),
    directToyConsumers: directToyConsumersForBranchRows(
      toyBindingRows,
      blockedBranchRows,
    ),
    nextProofTarget:
      targetCheck.requiredScope ??
      `accepted ${sourceRowId} source row in the same branch-interface record`,
  };
}

function sourceAcquisitionRouteForSourceRow(sourceRowId, targetCheck, blockedBranchRows) {
  const route = SOURCE_ACQUISITION_ROUTES[sourceRowId] ?? {};
  return {
    claimLevel:
      "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
    requiredRowsBeforeUse: targetCheck.requiredLedgerComponents ?? [],
    requiredAcceptedRowsBeforeUse: route.requiredAcceptedRowsBeforeUse ?? [],
    feedsRowsAfterAcceptance: route.feedsRowsAfterAcceptance ?? blockedBranchRows,
    notRequiredBeforeAcceptance: route.notRequiredBeforeAcceptance ?? [],
  };
}

function directToyConsumersForBranchRows(toyBindingRows, branchRows) {
  return {
    coefficients: toyConsumersForBranchRows(
      toyBindingRows.coefficients ?? {},
      branchRows,
    ),
    graphRules: toyConsumersForBranchRows(
      toyBindingRows.graphRules ?? {},
      branchRows,
    ),
  };
}

function toyConsumersForBranchRows(bindings, branchRows) {
  return Object.entries(bindings)
    .filter(([, rows]) =>
      Array.isArray(rows) && rows.some((row) => branchRows.includes(row)),
    )
    .map(([consumer]) => consumer);
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
  acceptedSourceRowProofTargets,
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
  if (acceptedSourceRowProofTargets.summary.passed !== true) {
    return "branch_interface_proof_target_incomplete";
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
