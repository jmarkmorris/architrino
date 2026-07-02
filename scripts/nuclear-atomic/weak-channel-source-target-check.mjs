#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const INPUT_SCHEMA = "aaa-equation-map-weak-gauge-exposure-domain-input/v1";
export const OUTPUT_SCHEMA =
  "aaa-nuclear-atomic-weak-channel-source-target-check/v1";

const REPO_ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const ACCEPTED_EVIDENCE_STATUSES = new Set(["accepted_non_fixture_source"]);
const DEFAULT_INPUT =
  "scripts/equation-mapping/weak-gauge-exposure-domain-muon-projection-evidence.v1.json";
const TOLERANCE = 1e-12;

const REQUIRED_ROWS = Object.freeze([
  "weak_visible_branch_ledger",
  "weak_projection",
  "weak_quotient",
  "weak_exposure_record",
  "va_chirality_gate",
  "ckm_overlap_readout",
  "pmns_overlap_readout",
  "weak_corridor_provenance",
  "effective_gauge_covariance_witness",
  "reaction_event_ledger",
  "noether_sea_response",
]);

const DOMAIN_ROWS = Object.freeze([
  "weak_visible_branch_ledger",
  "weak_projection",
  "weak_quotient",
  "weak_exposure_record",
  "va_chirality_gate",
  "ckm_overlap_readout",
  "pmns_overlap_readout",
  "weak_corridor_provenance",
  "effective_gauge_covariance_witness",
]);

const REQUIRED_TOY_BINDING_ROWS = Object.freeze({
  coefficients: {
    alphaAsym: ["weak_quotient", "weak_exposure_record", "reaction_event_ledger"],
    betaValleySlope: ["weak_quotient", "weak_projection", "reaction_event_ledger"],
    seaImbalancePenalty: ["weak_quotient", "noether_sea_response"],
  },
  graphRules: {
    beta_stable_band_center: [
      "weak_quotient",
      "weak_exposure_record",
      "reaction_event_ledger",
    ],
  },
});

const REQUIRED_SOURCE_TARGET_COMPONENTS = Object.freeze({
  weak_visible_branch_ledger: [
    "retained_muon_decay_event",
    "same_domain_rows",
    "branch_record_stability",
    "durable_source_path",
  ],
  weak_projection: [
    "weak_visible_branch_ledger",
    "projection_operator",
    "same_domain_rows",
    "durable_source_path",
  ],
  weak_quotient: [
    "weak_visible_branch_ledger",
    "weak_projection",
    "quotient_equivalence_class",
    "same_domain_rows",
    "gauge_branch_record_stability",
  ],
  weak_exposure_record: [
    "weak_quotient",
    "weak_projection",
    "weak_visible_branch_ledger",
    "exposure_readout_row",
    "same_domain_rows",
  ],
  va_chirality_gate: [
    "weak_quotient",
    "weak_exposure_record",
    "va_chirality_row",
    "same_domain_rows",
  ],
  ckm_overlap_readout: [
    "weak_quotient",
    "weak_exposure_record",
    "ckm_overlap_matrix",
    "same_domain_rows",
  ],
  pmns_overlap_readout: [
    "weak_quotient",
    "weak_exposure_record",
    "pmns_overlap_matrix",
    "same_domain_rows",
  ],
  weak_corridor_provenance: [
    "weak_quotient",
    "weak_exposure_record",
    "corridor_source_field_map",
    "same_domain_rows",
  ],
  effective_gauge_covariance_witness: [
    "weak_quotient",
    "weak_projection",
    "gauge_branch_record_stability",
    "covariance_residual_row",
  ],
  reaction_event_ledger: [
    "weak_visible_branch_ledger",
    "weak_projection",
    "weak_quotient",
    "weak_exposure_record",
    "va_chirality_gate",
    "energy_momentum_angular_momentum_accounting",
  ],
  noether_sea_response: [
    "weak_quotient",
    "reaction_event_ledger",
    "noether_sea_update_row",
    "same_domain_rows",
  ],
});
const SOURCE_ACQUISITION_ROUTES = Object.freeze({
  va_chirality_gate: {
    requiredAcceptedRowsBeforeUse: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_row",
      "same_domain_rows",
    ],
    feedsRowsAfterAcceptance: [
      "ckm_overlap_readout",
      "pmns_overlap_readout",
      "weak_corridor_provenance",
      "effective_gauge_covariance_witness",
      "reaction_event_ledger",
    ],
    notRequiredBeforeAcceptance: [
      "ckm_overlap_readout",
      "pmns_overlap_readout",
      "weak_corridor_provenance",
      "effective_gauge_covariance_witness",
      "reaction_event_ledger",
      "noether_sea_response",
    ],
  },
  reaction_event_ledger: {
    requiredAcceptedRowsBeforeUse: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_gate",
      "energy_momentum_angular_momentum_accounting",
    ],
    feedsRowsAfterAcceptance: ["noether_sea_response"],
  },
  noether_sea_response: {
    requiredAcceptedRowsBeforeUse: [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
    mustRemainDistinctFrom: ["retained_window_noether_sea_response_provider"],
  },
});
const REQUIRED_ACCEPTED_SOURCE_ROW_PROOF_TARGETS = Object.freeze({
  va_chirality_gate: {
    requiredAcceptedSourceRowsBeforeUse: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_row",
      "same_domain_rows",
    ],
    requiredSameRecordRows: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_gate",
      "va_chirality_row",
      "same_domain_rows",
      "same_branch_record",
    ],
    requiredClosureRows: [
      "charged_current_left_channel_selection",
      "right_channel_charged_current_suppression",
      "muon_decay_michel_parameter_binding",
    ],
    requiredChiralitySelectionRows: [
      "charged_current_left_channel_selection",
      "right_channel_charged_current_suppression",
      "va_chirality_row",
      "muon_decay_michel_parameter_binding",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "retained_weak_exposure_only",
      "standard_model_benchmark_table_only",
    ],
  },
  reaction_event_ledger: {
    requiredAcceptedSourceRowsBeforeUse: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_gate",
      "energy_momentum_angular_momentum_accounting",
    ],
    requiredSameRecordRows: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_gate",
      "reaction_event_ledger",
      "same_domain_rows",
      "same_branch_record",
    ],
    requiredClosureRows: [
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
    ],
    requiredConservationRows: [
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
    ],
    requiredEventBalanceRows: [
      "incoming_weak_domain_rows",
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
      "weak_event_noether_sea_update_route",
    ],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "attempt_level_weak_rows",
      "retained_weak_exposure_only",
    ],
  },
  noether_sea_response: {
    requiredAcceptedSourceRowsBeforeUse: [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
    requiredSameRecordRows: [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_response",
      "noether_sea_update_row",
      "same_domain_rows",
      "same_branch_record",
    ],
    requiredClosureRows: [
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
    requiredUpdateRows: [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
    mustRemainDistinctFrom: ["retained_window_noether_sea_response_provider"],
    forbiddenPromotionSources: [
      "priority_packet_only",
      "target_required",
      "retained_window_noether_sea_response_provider",
      "generic_Noether_sea_provider_as_event_update",
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
  const report = buildWeakChannelSourceTargetCheck(input, { inputPath });
  writeReport(report, args);
  if (args.requireAccepted && report.summary.status !== "accepted_weak_channel_source_rows") {
    process.exitCode = 1;
  }
}

export function buildWeakChannelSourceTargetCheck(input, { inputPath = DEFAULT_INPUT } = {}) {
  const rows = input?.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, buildRowCheck(rowId, rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter(
    (rowId) => rowChecks[rowId].accepted !== true,
  );
  const domainCheck = evaluateDomain(rows);
  const gaugeCheck = evaluateGauge(input?.gauge ?? {}, rows);
  const residualCheck = evaluateResiduals(input?.residuals ?? {}, input?.tolerances ?? {});
  const sourceEvidenceCheck = evaluateAcceptedSourceEvidence(rowChecks);
  const sourceAcquisitionCheck = evaluateSourceAcquisition(
    input?.sourceAcquisitionTargets ?? {},
  );
  const toyBindingRows = input?.toyBindingRows ?? defaultToyBindingRows();
  const toyBindingCheck = evaluateToyBindingRows(toyBindingRows);
  const acceptedSourceRowProofTargets = evaluateAcceptedSourceRowProofTargets(
    input?.acceptedSourceRowProofTargets ?? {},
    toyBindingRows,
  );
  const sourceAcquisitionBlockerMap = buildSourceAcquisitionBlockerMap({
    sourceAcquisitionCheck,
    toyBindingRows,
    acceptedSourceRowProofTargets,
  });
  const structuralFailures = [
    ...(domainCheck.passed ? [] : ["same_domain_rows"]),
    ...(gaugeCheck.passed ? [] : ["gauge_branch_record_stability"]),
    ...(residualCheck.passed ? [] : ["weak_residuals"]),
    ...(sourceEvidenceCheck.passed ? [] : ["accepted_source_evidence"]),
    ...(toyBindingCheck.passed ? [] : ["toyBindingRows"]),
  ];
  const schemaOk = input?.schema === INPUT_SCHEMA;
  const status = decideStatus({
    schemaOk,
    structuralFailures,
    acceptedSourceRowProofTargets,
    sourceAcquisitionCheck,
    missingRows,
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
      residualId: input?.residualId ?? null,
    },
    summary: {
      status,
      acceptedRows: REQUIRED_ROWS.filter((rowId) => rowChecks[rowId].accepted === true),
      missingRows,
      firstMissingRow,
      firstMissingObject: firstMissingRow ? `missing_accepted_${firstMissingRow}` : null,
      structuralPass: structuralFailures.length === 0,
      structuralFailures,
      domainPass: domainCheck.passed,
      gaugePass: gaugeCheck.passed,
      residualPass: residualCheck.passed,
      sourceEvidencePass: sourceEvidenceCheck.passed,
      acceptedSourceRowProofTargetPass:
        acceptedSourceRowProofTargets.summary.passed,
      acceptedSourceRowProofTargetFailures:
        acceptedSourceRowProofTargets.summary.failures,
      sourceAcquisitionPass: sourceAcquisitionCheck.passed,
      sourceAcquisitionFirstMissingObject:
        sourceAcquisitionCheck.firstMissingSourceRow
          ? `missing_accepted_${sourceAcquisitionCheck.firstMissingSourceRow}`
          : null,
      toyBindingRowsPass: toyBindingCheck.passed,
      allRequiredRowsAccepted: schemaOk && missingRows.length === 0,
      scoreDecision: "no_score_increase",
    },
    requiredRows: [...REQUIRED_ROWS],
    rowChecks,
    domainCheck,
    gaugeCheck,
    residualCheck,
    sourceEvidenceCheck,
    acceptedSourceRowProofTargets,
    sourceAcquisitionCheck,
    sourceAcquisitionBlockerMap,
    toyBindingCheck,
    acceptanceRule:
      "The weak-channel target is promotion-ready only when every required weak row is accepted from durable source evidence, each required row's source-acquisition target preserves its component shape, and the same-domain, gauge-stability, weak-residual, source-evidence, and toy-binding checks still pass.",
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
  console.log(`Usage: node scripts/nuclear-atomic/weak-channel-source-target-check.mjs [options]

Options:
  --input PATH          Weak-channel evidence JSON to inspect.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless all weak-channel rows are accepted.
  --help                Show this help.

This checker keeps the Fe/Ni weak-channel source target fail-closed: it can
verify accepted weak_visible_branch_ledger, weak_projection, weak_quotient, and
weak_exposure_record rows plus
same-domain weak structure without treating downstream attempt rows as accepted.`);
}

function writeReport(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        input: report.input,
        summary: report.summary,
        rowChecks: report.rowChecks,
        domainCheck: report.domainCheck,
        gaugeCheck: report.gaugeCheck,
        sourceEvidenceCheck: report.sourceEvidenceCheck,
        acceptedSourceRowProofTargets: report.acceptedSourceRowProofTargets,
        sourceAcquisitionCheck: report.sourceAcquisitionCheck,
        sourceAcquisitionBlockerMap: report.sourceAcquisitionBlockerMap,
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

function buildRowCheck(rowId, row) {
  const status = normalizeStatus(row);
  const sourceEvidence = ACCEPTED_STATUSES.has(status)
    ? evaluateDurableSource(row?.sourcePath ?? row?.source, row, rowId)
    : { accepted: false, reason: "row_not_accepted" };
  return {
    rowId,
    sourceRowId: row?.id ?? row?.rowId ?? null,
    status,
    accepted: ACCEPTED_STATUSES.has(status) && sourceEvidence.accepted === true,
    reason: ACCEPTED_STATUSES.has(status) ? sourceEvidence.reason : "row_not_accepted",
    sourcePath: row?.sourcePath ?? row?.source ?? null,
    domainId: domainIdForRow(row),
    branchRecordId: row?.branchRecordId ?? null,
    sourceEvidence,
  };
}

function evaluateDomain(rows) {
  const rowDomainIds = Object.fromEntries(
    DOMAIN_ROWS.map((rowId) => [rowId, domainIdForRow(rows[rowId])]),
  );
  const missingDomainRows = Object.entries(rowDomainIds)
    .filter(([, domainId]) => !domainId)
    .map(([rowId]) => rowId);
  const uniqueDomainIds = [...new Set(Object.values(rowDomainIds).filter(Boolean))];
  return {
    requiredRows: [...DOMAIN_ROWS],
    rowDomainIds,
    missingDomainRows,
    uniqueDomainIds,
    sharedDomainId:
      missingDomainRows.length === 0 && uniqueDomainIds.length === 1
        ? uniqueDomainIds[0]
        : null,
    passed: missingDomainRows.length === 0 && uniqueDomainIds.length === 1,
  };
}

function evaluateGauge(gauge, rows) {
  const changed =
    gauge.physicalBranchRecordChanged === true ||
    gauge.branchRecordChanged === true ||
    gauge.gaugeRelabelChangesBranchRecord === true;
  const branchRecordIds = [
    gauge.branchRecordId,
    ...REQUIRED_ROWS.map((rowId) => rows[rowId]?.branchRecordId),
  ].filter((value) => typeof value === "string" && value.trim() !== "");
  const uniqueBranchRecordIds = [...new Set(branchRecordIds)];
  return {
    gaugeChartId: gauge.gaugeChartId ?? null,
    branchRecordId: gauge.branchRecordId ?? null,
    physicalBranchRecordChanged: changed,
    uniqueBranchRecordIds,
    passed: !changed && uniqueBranchRecordIds.length === 1,
  };
}

function evaluateResiduals(raw, tolerances) {
  const rows = {
    covariance: evaluateScalarResidual(
      raw.covarianceResidual ?? raw.R_cov,
      tolerances.covariance ?? TOLERANCE,
    ),
    va: evaluateScalarResidual(raw.vaResidual ?? raw.R_VA ?? raw.R_va, tolerances.va ?? TOLERANCE),
    ckm: evaluateScalarResidual(
      raw.ckmResidual ?? raw.R_CKM ?? raw.R_ckm,
      tolerances.ckm ?? TOLERANCE,
    ),
    pmns: evaluateScalarResidual(
      raw.pmnsResidual ?? raw.R_PMNS ?? raw.R_pmns,
      tolerances.pmns ?? TOLERANCE,
    ),
    provenance: evaluateScalarResidual(
      raw.provenanceResidual ?? raw.R_prov,
      tolerances.provenance ?? TOLERANCE,
    ),
    retune: evaluateScalarResidual(
      raw.retuneResidual ?? raw.S_retune,
      tolerances.retune ?? TOLERANCE,
    ),
  };
  return {
    rows,
    passed: Object.values(rows).every((row) => row.passed),
  };
}

function evaluateAcceptedSourceEvidence(rowChecks) {
  const checkedRows = Object.values(rowChecks).filter((row) =>
    ACCEPTED_STATUSES.has(row.status),
  );
  const failures = checkedRows
    .filter((row) => row.sourceEvidence.accepted !== true)
    .map((row) => ({
      rowId: row.rowId,
      reason: row.sourceEvidence.reason,
      sourcePath: row.sourcePath,
    }));
  return {
    checkedRows: checkedRows.map((row) => row.rowId),
    failures,
    passed: failures.length === 0,
  };
}

function evaluateSourceAcquisition(sourceAcquisitionTargets) {
  const targetChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      evaluateSourceAcquisitionTarget(rowId, sourceAcquisitionTargets[rowId]),
    ]),
  );
  const failures = Object.values(targetChecks)
    .filter((check) => check.accepted !== true)
    .map((check) => ({
      sourceRowId: check.sourceRowId,
      reason: sourceAcquisitionTargetFailureReason(check),
      status: check.status,
      currentEvidenceStatus: check.currentEvidenceStatus,
      missingRequiredComponents: check.missingRequiredComponents,
      extraRequiredComponents: check.extraRequiredComponents,
    }));
  return {
    sourceAcquisitionTargetsField: "sourceAcquisitionTargets",
    targetChecks,
    failures,
    firstMissingSourceRow:
      Object.values(targetChecks).find((check) => check.accepted !== true)
        ?.sourceRowId ?? null,
    passed: failures.length === 0,
  };
}

function evaluateSourceAcquisitionTarget(sourceRowId, target) {
  const present = target && typeof target === "object" && !Array.isArray(target);
  const status = present ? normalizeStatus(target) : "missing";
  const currentEvidenceStatus = present
    ? target.currentEvidenceStatus ?? null
    : null;
  const acceptedStatus = ACCEPTED_STATUSES.has(status);
  const evidenceAccepted = ACCEPTED_EVIDENCE_STATUSES.has(currentEvidenceStatus);
  const expectedRequiredComponents =
    REQUIRED_SOURCE_TARGET_COMPONENTS[sourceRowId] ?? [];
  const requiredLedgerComponents = Array.isArray(target?.requiredLedgerComponents)
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
  return {
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
  };
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
    requiredConservationRows: target?.requiredConservationRows ?? [],
    requiredEventBalanceRows: target?.requiredEventBalanceRows ?? [],
    requiredChiralitySelectionRows: target?.requiredChiralitySelectionRows ?? [],
    requiredUpdateRows: target?.requiredUpdateRows ?? [],
    mustRemainDistinctFrom: target?.mustRemainDistinctFrom ?? [],
    forbiddenPromotionSources: target?.forbiddenPromotionSources ?? [],
    currentPriorityPacket: present ? target.currentPriorityPacket ?? null : null,
    directToyConsumers: directToyConsumersForWeakRows(toyBindingRows, [rowId]),
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

function buildSourceAcquisitionBlockerMap({
  sourceAcquisitionCheck,
  toyBindingRows,
  acceptedSourceRowProofTargets,
}) {
  const missingSourceRows = Object.values(sourceAcquisitionCheck.targetChecks)
    .filter((check) => check.accepted !== true)
    .map((check) => check.sourceRowId);
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
    firstMissingObject: firstBlocker
      ? `missing_accepted_${firstBlocker.sourceRowId}`
      : null,
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
  const blockedWeakRows = [sourceRowId];
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
    blockedWeakRows,
    acceptedSourceRowProofTargets: Object.fromEntries(
      blockedWeakRows
        .map((rowId) => [
          rowId,
          acceptedSourceRowProofTargets?.targets?.[rowId] ?? null,
        ])
        .filter(([, target]) => target),
    ),
    sourceAcquisitionRoute: sourceAcquisitionRouteForSourceRow(
      sourceRowId,
      targetCheck,
    ),
    directToyConsumers: directToyConsumersForWeakRows(toyBindingRows, [sourceRowId]),
    nextProofTarget:
      targetCheck.requiredScope ??
      `accepted ${sourceRowId} source row in the same weak-channel record`,
  };
}

function sourceAcquisitionRouteForSourceRow(sourceRowId, targetCheck) {
  const route = SOURCE_ACQUISITION_ROUTES[sourceRowId] ?? {};
  return {
    claimLevel:
      "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
    requiredRowsBeforeUse: targetCheck.requiredLedgerComponents ?? [],
    requiredAcceptedRowsBeforeUse: route.requiredAcceptedRowsBeforeUse ?? [],
    feedsRowsAfterAcceptance: route.feedsRowsAfterAcceptance ?? [sourceRowId],
    notRequiredBeforeAcceptance: route.notRequiredBeforeAcceptance ?? [],
    mustRemainDistinctFrom: route.mustRemainDistinctFrom ?? [],
  };
}

function directToyConsumersForWeakRows(toyBindingRows, weakRows) {
  return {
    coefficients: toyConsumersForWeakRows(
      toyBindingRows.coefficients ?? {},
      weakRows,
    ),
    graphRules: toyConsumersForWeakRows(
      toyBindingRows.graphRules ?? {},
      weakRows,
    ),
  };
}

function toyConsumersForWeakRows(bindings, weakRows) {
  return Object.entries(bindings)
    .filter(([, rows]) =>
      Array.isArray(rows) && rows.some((row) => weakRows.includes(row)),
    )
    .map(([consumer]) => consumer);
}

function evaluateToyBindingRows(raw) {
  const failures = [
    ...evaluateToyBindingGroup("coefficients", raw.coefficients ?? {}),
    ...evaluateToyBindingGroup("graphRules", raw.graphRules ?? {}),
  ];
  const consumedRows = new Set(
    [
      ...Object.values(raw.coefficients ?? {}).flat(),
      ...Object.values(raw.graphRules ?? {}).flat(),
    ].filter((value) => typeof value === "string"),
  );
  const expectedConsumedRows = new Set(
    [
      ...Object.values(REQUIRED_TOY_BINDING_ROWS.coefficients).flat(),
      ...Object.values(REQUIRED_TOY_BINDING_ROWS.graphRules).flat(),
    ],
  );
  const unconsumedRequiredRows = [...expectedConsumedRows].filter(
    (rowId) => !consumedRows.has(rowId),
  );
  return {
    passed: failures.length === 0 && unconsumedRequiredRows.length === 0,
    failures,
    unconsumedRequiredRows,
  };
}

function defaultToyBindingRows() {
  return JSON.parse(JSON.stringify(REQUIRED_TOY_BINDING_ROWS));
}

function evaluateToyBindingGroup(groupName, observedGroup) {
  const expectedGroup = REQUIRED_TOY_BINDING_ROWS[groupName] ?? {};
  const failures = [];
  for (const [id, expectedRows] of Object.entries(expectedGroup)) {
    const observedRows = observedGroup[id] ?? [];
    const missing = expectedRows.filter((row) => !observedRows.includes(row));
    const extra = observedRows.filter((row) => !expectedRows.includes(row));
    if (missing.length > 0 || extra.length > 0) {
      failures.push({ group: groupName, id, missing, extra });
    }
  }
  for (const id of Object.keys(observedGroup)) {
    if (!Object.hasOwn(expectedGroup, id)) {
      failures.push({
        group: groupName,
        id,
        missing: [],
        extra: observedGroup[id],
      });
    }
  }
  return failures;
}

function evaluateDurableSource(sourcePath, row = {}, requestedRowKind = null) {
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
  const resolvedPath = path.resolve(REPO_ROOT, sourcePath);
  if (!fs.existsSync(resolvedPath)) {
    return { accepted: false, reason: "source_not_found" };
  }
  if (fs.statSync(resolvedPath).isDirectory()) {
    return { accepted: false, reason: "source_is_directory" };
  }
  const pathReason = evidenceSourcePathRejectionReason(resolvedPath);
  if (pathReason) {
    return { accepted: false, reason: pathReason };
  }
  const source = readJsonOrNull(resolvedPath);
  if (!source) {
    return { accepted: false, reason: "source_not_parseable_json" };
  }
  if (sourceExplicitlyRejectsRequestedRow(source, requestedRowKind)) {
    return { accepted: false, reason: "source_explicitly_rejects_requested_row" };
  }
  if (!sourceSupportsWeakRow(source, row, requestedRowKind)) {
    return { accepted: false, reason: "weak_row_source_contract_mismatch" };
  }
  return { accepted: true, reason: "source_file", resolvedPath };
}

function evidenceSourcePathRejectionReason(filePath) {
  const relative = path.relative(REPO_ROOT, path.normalize(filePath));
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return "generated_source_path";
  }
  if (relative.startsWith(`tests${path.sep}`)) {
    return "test_fixture_source_path";
  }
  const basename = path.basename(relative).toLowerCase();
  if (
    basename.includes("attempt") ||
    basename.includes("source-contract") ||
    basename.includes("mock") ||
    basename.includes("negative-control")
  ) {
    return "control_or_attempt_source_path";
  }
  return null;
}

function sourceExplicitlyRejectsRequestedRow(source, requestedRowKind) {
  if (typeof requestedRowKind !== "string" || requestedRowKind.trim() === "") {
    return false;
  }
  const notAcceptedRows = source?.acceptedBoundary?.notAcceptedRows;
  return Array.isArray(notAcceptedRows) && notAcceptedRows.includes(requestedRowKind);
}

function sourceSupportsWeakRow(source, row, requestedRowKind) {
  const values = collectSourceSupportValues(source).filter((value) => typeof value === "string");
  const lowerValues = values.map((value) => value.toLowerCase());
  const sourceStrings = new Set(values);
  const rowSupported = lowerValues.some(
    (value) =>
      value.includes("eq-16") ||
      value.includes("eq16") ||
      value.includes("weak_visible_branch_ledger"),
  );
  const requestedSupported =
    !requestedRowKind || lowerValues.some((value) => value.includes(requestedRowKind));
  const domainSupported =
    !domainIdForRow(row) || sourceStrings.has(domainIdForRow(row));
  const branchSupported =
    !row?.branchRecordId || sourceStrings.has(row.branchRecordId);
  return rowSupported && requestedSupported && domainSupported && branchSupported;
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
      ...Object.values(value).flatMap((entry) =>
        typeof entry === "object" ? collectSourceSupportValues(entry) : [],
      ),
    ].flatMap((entry) => (Array.isArray(entry) ? entry : [entry]));
  }
  return typeof value === "string" ? [value] : [];
}

function decideStatus({
  schemaOk,
  structuralFailures,
  acceptedSourceRowProofTargets,
  sourceAcquisitionCheck,
  missingRows,
}) {
  if (!schemaOk) {
    return "schema_mismatch";
  }
  if (structuralFailures.length > 0) {
    return "weak_channel_structure_mismatch";
  }
  if (acceptedSourceRowProofTargets.summary.passed !== true) {
    return "weak_channel_proof_target_incomplete";
  }
  if (missingRows.length > 0) {
    return "missing_accepted_weak_channel_rows";
  }
  if (sourceAcquisitionCheck.passed !== true) {
    return "weak_channel_source_acquisition_incomplete";
  }
  return "accepted_weak_channel_source_rows";
}

function readJsonOrNull(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function domainIdForRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }
  return (
    stringOrNull(row.domainId) ??
    stringOrNull(row.retainedDomainId) ??
    stringOrNull(row.eventId) ??
    stringOrNull(row.carrierId) ??
    null
  );
}

function evaluateScalarResidual(raw, tolerance) {
  const value = finiteNumber(raw);
  return {
    raw: value,
    tolerance,
    passed: value !== null && Math.abs(value) <= tolerance,
  };
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

function stringOrNull(value) {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}
