#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import {
  buildReport as buildMovingCertificateReport,
  validationErrors as movingCertificateValidationErrors,
} from "./moving-retained-branch-certificate-report.mjs";
import {
  buildReport as buildTorqueWakeReport,
  validationErrors as torqueWakeValidationErrors,
} from "./torque-wake-same-row-diagnostic-report.mjs";
import { validationErrors as rank2SourceValidationErrors } from "./field-speed-action-self-hit-scan-source-binding-report.mjs";

const SCHEMA = "rank2_rank6_branch_source_join_report/v0";

function parseArgs(argv) {
  const args = {
    rank2Report: null,
    rank6Certificate: null,
    torqueWakeDiagnostic: null,
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--rank2-report") {
      args.rank2Report = argv[++index];
    } else if (arg === "--rank6-certificate") {
      args.rank6Certificate = argv[++index];
    } else if (arg === "--torque-wake-diagnostic") {
      args.torqueWakeDiagnostic = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-braid/rank2-rank6-branch-source-join-report.mjs [options]

Options:
  --rank2-report PATH             Emitted field-speed source-binding report JSON.
  --rank6-certificate PATH        Candidate moving retained branch certificate JSON.
  --torque-wake-diagnostic PATH   Candidate torque/wake same-row diagnostic JSON.
  --validate PATH                 Validate an emitted branch-source join report.
  --out PATH                      Write JSON output to a file instead of stdout.
  --pretty                        Pretty-print JSON output.
  --help                          Show this help.

This fail-closed priority-side checker compares the rank 2 accepted-transition
source boundary, the rank 6 moving retained branch certificate boundary, and the
torque/wake same-row diagnostic. It never authorizes candidate_h_recovery,
moving_retained_branch_certificate, Photon Gate A, Lorentz rows, or observer export.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function present(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length > 0;
  }
  return true;
}

function normalized(value) {
  return present(value) ? String(value).trim() : null;
}

function row(name, pass, failureCode, detail = {}) {
  return {
    row: name,
    status: pass ? "passed" : "failed",
    failure_code: pass ? null : failureCode,
    ...detail,
  };
}

function compareField(name, entries) {
  const values = entries.map((entry) => ({
    participant: entry.participant,
    value: normalized(entry.value),
  }));
  const missing = values.filter((entry) => entry.value === null).map((entry) => entry.participant);
  const uniqueValues = [...new Set(values.filter((entry) => entry.value !== null).map((entry) => entry.value))];
  const pass = missing.length === 0 && uniqueValues.length === 1;
  const failureCode =
    missing.length > 0 ? `${name}_missing` : uniqueValues.length > 1 ? `${name}_mismatch` : null;
  return row(name, pass, failureCode, { values, missing_participants: missing });
}

function inputValidationRows(rank2Report, rank6Report, torqueWakeReport) {
  const errors = [
    ...rank2SourceValidationErrors(rank2Report).map((message) => ({
      source: "rank2_source_binding_report",
      message,
    })),
    ...movingCertificateValidationErrors(rank6Report).map((message) => ({
      source: "rank6_moving_retained_branch_certificate_report",
      message,
    })),
    ...torqueWakeValidationErrors(torqueWakeReport).map((message) => ({
      source: "torque_wake_same_row_diagnostic_report",
      message,
    })),
  ];
  return {
    errors,
    row: row("input_report_validation", errors.length === 0, "input_report_invalid", {
      validation_errors: errors,
    }),
  };
}

function buildSubjects(rank2Report, rank6Certificate, rank6Report, torqueWakeDiagnostic, torqueWakeReport) {
  return {
    rank2_field_speed_action_self_hit_scan: {
      source_verdict: rank2Report.source_verdict ?? null,
      first_failure: rank2Report.first_failure ?? null,
      accepted_transition_source: rank2Report.source_verdict === "accepted_transition_source",
      same_record_binding: rank2Report.same_record_binding === true,
      branch_certificate_ref: rank2Report.branch_certificate_ref ?? null,
      active_root_ledger_identity:
        rank2Report.root_ledger_hash ?? rank2Report.action_row_root_ledger_hash ?? null,
      conservation_pullback_hash:
        rank2Report.conservation_pullback_hash ??
        rank2Report.action_row_conservation_pullback_hash ??
        null,
      negative_control_ref: rank2Report.negative_control_ref ?? null,
      candidate_h_recovery_vote: rank2Report.candidate_h_recovery_vote ?? null,
    },
    rank6_moving_retained_branch_certificate: {
      certificate_verdict: rank6Report.certificate_verdict ?? null,
      first_failure: rank6Report.first_failure ?? null,
      moving_retained_branch_certificate:
        rank6Report.certificate_verdict === "accepted_same_branch" &&
        rank6Report.authorization?.populates_structural_integrity_residual_vector === true,
      branch_certificate_ref: rank6Certificate.branch_certificate_ref ?? null,
      active_root_ledger_identity:
        rank6Certificate.active_root_ledger_hash ?? rank6Certificate.source_root_ledger_ref ?? null,
      event_ledger_ref: rank6Certificate.event_ledger_ref ?? null,
      certificate_status: rank6Certificate.certificate_status ?? null,
    },
    torque_wake_same_row_diagnostic: {
      diagnostic_verdict: torqueWakeReport.diagnostic_verdict ?? null,
      first_failure: torqueWakeReport.first_failure ?? null,
      same_row_id_binding: torqueWakeReport.same_row_id_binding === true,
      same_record_source_binding: torqueWakeReport.same_record_source_binding === true,
      branch_certificate_ref: torqueWakeDiagnostic.branch_certificate_ref ?? null,
      active_root_ledger_identity: torqueWakeDiagnostic.active_root_ledger_hash ?? null,
      conservation_pullback_hash: torqueWakeDiagnostic.conservation_pullback_hash ?? null,
      negative_control_ref: torqueWakeDiagnostic.negative_control_ref ?? null,
    },
  };
}

function firstFailure(rows) {
  return rows.find((entry) => entry.status !== "passed")?.failure_code ?? null;
}

function rowByName(rows, name) {
  return rows.find((entry) => entry.row === name) ?? null;
}

function intakeField(field, pass, failureCode, detail = {}) {
  return {
    field,
    status: pass ? "passed" : "failed",
    failure_code: pass ? null : failureCode,
    ...detail,
  };
}

function prefixedFields(prefix, fields) {
  return (Array.isArray(fields) ? fields : []).map((field) => `${prefix}.${field}`);
}

function buildSameRecordProviderIntake({
  rank2Report,
  rank6Certificate,
  rank6Report,
  torqueWakeReport,
  subjects,
  rows,
  failure,
  sameBranchSourceJoin,
}) {
  const rank6BranchChartRow =
    rank6Report.row_results?.find((entry) => entry.path === "branch_certificate_ref") ?? null;
  const commonBranchRow = rowByName(rows, "common_branch_certificate_ref");
  const commonRootRow = rowByName(rows, "common_active_root_ledger_identity");
  const commonConservationRow = rowByName(rows, "common_conservation_pullback_hash");
  const commonNegativeControlRow = rowByName(rows, "common_negative_control_ref");
  const mismatchRows = rows.filter((entry) => String(entry.failure_code ?? "").endsWith("_mismatch"));
  const acceptedBranchChart =
    rank6BranchChartRow?.pass === true && rank6Certificate.certificate_status === "accepted_same_branch";
  const acceptedBranchChartFailure =
    rank6BranchChartRow?.failure_code ??
    (rank6Certificate.certificate_status === "accepted_same_branch"
      ? "blocked_pending_accepted_branch_chart"
      : "certificate_status_not_accepted_same_branch");
  const rank2Missing = prefixedFields("rank2", rank2Report.missing_or_rejected_fields);
  const rank6Missing = prefixedFields("rank6", rank6Report.missing_or_rejected_rows).flatMap((field) =>
    field === "rank6.branch_certificate_ref" ? ["rank6.accepted_branch_chart", field] : [field]
  );
  const torqueWakeMissing = prefixedFields("torque_wake", torqueWakeReport.missing_or_rejected_fields);
  const failedJoinRows = rows
    .filter((entry) => entry.status !== "passed")
    .map((entry) => `join.${entry.row}:${entry.failure_code}`);
  const movingCertificateMissing =
    subjects.rank6_moving_retained_branch_certificate.moving_retained_branch_certificate === true
      ? []
      : ["rank6.moving_retained_branch_certificate/v0"];

  return {
    schema: "rank2_rank6_same_record_provider_intake/v0",
    provider_status: sameBranchSourceJoin
      ? "same_record_provider_candidate"
      : "same_record_provider_blocked",
    first_failure: failure,
    claim_boundary:
      "States the same-record source fields needed before rank 2 and rank 6 may consume one provider object; it does not authorize branch state.",
    blocking_missing_or_rejected_fields: [
      ...rank2Missing,
      ...rank6Missing,
      ...movingCertificateMissing,
      ...torqueWakeMissing,
      ...failedJoinRows,
    ],
    required_same_record_fields: [
      intakeField(
        "accepted_transition_source",
        subjects.rank2_field_speed_action_self_hit_scan.accepted_transition_source === true &&
          subjects.rank2_field_speed_action_self_hit_scan.same_record_binding === true,
        subjects.rank2_field_speed_action_self_hit_scan.first_failure ?? "accepted_transition_source_missing",
        {
          required_by: ["rank2_field_speed_action_self_hit_scan"],
          source: "field_speed_action_self_hit_scan_source_binding_report/v0",
          missing_or_rejected_fields: rank2Report.missing_or_rejected_fields ?? [],
          current_source_verdict: subjects.rank2_field_speed_action_self_hit_scan.source_verdict,
        }
      ),
      intakeField(
        "accepted_branch_chart",
        acceptedBranchChart,
        acceptedBranchChartFailure,
        {
          required_by: ["rank6_structural_integrity_common_limit"],
          source: "moving_retained_branch_certificate/v0.branch_certificate_ref",
          certificate_status: rank6Certificate.certificate_status ?? null,
        }
      ),
      intakeField(
        "moving_retained_branch_certificate/v0",
        subjects.rank6_moving_retained_branch_certificate.moving_retained_branch_certificate === true,
        subjects.rank6_moving_retained_branch_certificate.first_failure ??
          "moving_retained_branch_certificate_missing",
        {
          required_by: ["rank6_structural_integrity_common_limit"],
          source: "moving_retained_branch_certificate_report/v0",
          missing_or_rejected_rows: rank6Report.missing_or_rejected_rows ?? [],
        }
      ),
      intakeField(
        "torque_wake_same_record_source_binding",
        subjects.torque_wake_same_row_diagnostic.same_row_id_binding === true &&
          subjects.torque_wake_same_row_diagnostic.same_record_source_binding === true,
        subjects.torque_wake_same_row_diagnostic.first_failure ??
          "torque_wake_same_record_source_binding_missing",
        {
          required_by: ["rank2_field_speed_action_self_hit_scan", "rank6_structural_integrity_common_limit"],
          source: "torque_wake_same_row_diagnostic_report/v0",
          same_row_id_binding: subjects.torque_wake_same_row_diagnostic.same_row_id_binding,
          missing_or_rejected_fields: torqueWakeReport.missing_or_rejected_fields ?? [],
        }
      ),
      intakeField(
        "common_branch_certificate_ref",
        commonBranchRow?.status === "passed",
        commonBranchRow?.failure_code ?? "common_branch_certificate_ref_missing",
        { source: "rank2/rank6/torque_wake", values: commonBranchRow?.values ?? [] }
      ),
      intakeField(
        "common_active_root_ledger_identity",
        commonRootRow?.status === "passed",
        commonRootRow?.failure_code ?? "common_active_root_ledger_identity_missing",
        { source: "rank2/rank6/torque_wake", values: commonRootRow?.values ?? [] }
      ),
      intakeField(
        "common_conservation_pullback_hash",
        commonConservationRow?.status === "passed",
        commonConservationRow?.failure_code ?? "common_conservation_pullback_hash_missing",
        { source: "rank2/torque_wake", values: commonConservationRow?.values ?? [] }
      ),
      intakeField(
        "common_negative_control_ref",
        commonNegativeControlRow?.status === "passed",
        commonNegativeControlRow?.failure_code ?? "common_negative_control_ref_missing",
        { source: "rank2/torque_wake", values: commonNegativeControlRow?.values ?? [] }
      ),
    ],
    same_step_retained_torque_wake_branch_certificate_provider_target:
      torqueWakeReport.same_step_retained_torque_wake_branch_certificate_provider_target ?? null,
    downstream_missing_or_not_authorized_fields: [
      {
        field: "bounded_speed_live_ledger",
        status: "missing",
        blocks_same_branch_source_join: false,
        authorization: false,
        local_relevance:
          "Rank 5 and observer-export consumers still need a bounded-speed live ledger outside this join.",
      },
      {
        field: "Photon Gate A",
        status: "not_authorized",
        blocks_same_branch_source_join: false,
        authorization: false,
        local_relevance:
          "Signal-sector references do not populate or accept Photon Gate A from this report.",
      },
      {
        field: "Lorentz rows",
        status: "not_authorized",
        blocks_same_branch_source_join: false,
        authorization: false,
        local_relevance:
          "Lorentz residual rows require their own accepted moving-branch export.",
      },
      {
        field: "observer_export",
        status: "not_authorized",
        blocks_same_branch_source_join: false,
        authorization: false,
        local_relevance: "Observer export is outside the rank 2 / rank 6 join boundary.",
      },
    ],
    negative_controls: {
      status: mismatchRows.length > 0 ? "passed_rejected_mismatch" : "armed_no_mismatch_seen",
      rejects_cross_report_or_synthetic_mismatch: true,
      guarded_rows: [
        "common_branch_certificate_ref",
        "common_active_root_ledger_identity",
        "common_conservation_pullback_hash",
        "common_negative_control_ref",
      ],
      rejected_mismatch_rows: mismatchRows.map((entry) => ({
        row: entry.row,
        failure_code: entry.failure_code,
        values: entry.values ?? [],
      })),
    },
    authorization: {
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      bounded_speed_live_ledger: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

export function buildReport(inputs, options = {}) {
  if (!isObject(inputs?.rank2SourceBindingReport)) {
    throw new Error("rank2SourceBindingReport must be a JSON object.");
  }
  if (!isObject(inputs?.rank6CertificateCandidate)) {
    throw new Error("rank6CertificateCandidate must be a JSON object.");
  }
  if (!isObject(inputs?.torqueWakeDiagnosticCandidate)) {
    throw new Error("torqueWakeDiagnosticCandidate must be a JSON object.");
  }

  const rank2Report = inputs.rank2SourceBindingReport;
  const rank6Certificate = inputs.rank6CertificateCandidate;
  const torqueWakeDiagnostic = inputs.torqueWakeDiagnosticCandidate;
  const rank6Report = buildMovingCertificateReport(rank6Certificate, {
    sourceRef: options.rank6CertificateRef,
  });
  const torqueWakeReport = buildTorqueWakeReport(torqueWakeDiagnostic, {
    sourceRef: options.torqueWakeDiagnosticRef,
  });
  const subjects = buildSubjects(
    rank2Report,
    rank6Certificate,
    rank6Report,
    torqueWakeDiagnostic,
    torqueWakeReport
  );
  const validation = inputValidationRows(rank2Report, rank6Report, torqueWakeReport);

  const rows = [
    validation.row,
    row(
      "rank2_accepted_transition_source",
      subjects.rank2_field_speed_action_self_hit_scan.accepted_transition_source === true &&
        subjects.rank2_field_speed_action_self_hit_scan.same_record_binding === true,
      subjects.rank2_field_speed_action_self_hit_scan.first_failure ?? "rank2_accepted_transition_source_missing",
      {
        source_verdict: subjects.rank2_field_speed_action_self_hit_scan.source_verdict,
        same_record_binding: subjects.rank2_field_speed_action_self_hit_scan.same_record_binding,
      }
    ),
    row(
      "rank6_moving_retained_branch_certificate",
      subjects.rank6_moving_retained_branch_certificate.moving_retained_branch_certificate === true,
      subjects.rank6_moving_retained_branch_certificate.first_failure ??
        "rank6_moving_retained_branch_certificate_missing",
      {
        certificate_verdict: subjects.rank6_moving_retained_branch_certificate.certificate_verdict,
        certificate_status: subjects.rank6_moving_retained_branch_certificate.certificate_status,
      }
    ),
    row(
      "torque_wake_same_row_id_binding",
      subjects.torque_wake_same_row_diagnostic.same_row_id_binding === true,
      "torque_wake_same_row_id_mismatch",
      {
        diagnostic_verdict: subjects.torque_wake_same_row_diagnostic.diagnostic_verdict,
      }
    ),
    row(
      "torque_wake_same_record_source_binding",
      subjects.torque_wake_same_row_diagnostic.same_record_source_binding === true,
      subjects.torque_wake_same_row_diagnostic.first_failure ??
        "torque_wake_same_record_source_binding_missing",
      {
        diagnostic_verdict: subjects.torque_wake_same_row_diagnostic.diagnostic_verdict,
      }
    ),
    compareField("common_branch_certificate_ref", [
      {
        participant: "rank2_field_speed_action_self_hit_scan",
        value: subjects.rank2_field_speed_action_self_hit_scan.branch_certificate_ref,
      },
      {
        participant: "rank6_moving_retained_branch_certificate",
        value: subjects.rank6_moving_retained_branch_certificate.branch_certificate_ref,
      },
      {
        participant: "torque_wake_same_row_diagnostic",
        value: subjects.torque_wake_same_row_diagnostic.branch_certificate_ref,
      },
    ]),
    compareField("common_active_root_ledger_identity", [
      {
        participant: "rank2_field_speed_action_self_hit_scan",
        value: subjects.rank2_field_speed_action_self_hit_scan.active_root_ledger_identity,
      },
      {
        participant: "rank6_moving_retained_branch_certificate",
        value: subjects.rank6_moving_retained_branch_certificate.active_root_ledger_identity,
      },
      {
        participant: "torque_wake_same_row_diagnostic",
        value: subjects.torque_wake_same_row_diagnostic.active_root_ledger_identity,
      },
    ]),
    compareField("common_conservation_pullback_hash", [
      {
        participant: "rank2_field_speed_action_self_hit_scan",
        value: subjects.rank2_field_speed_action_self_hit_scan.conservation_pullback_hash,
      },
      {
        participant: "torque_wake_same_row_diagnostic",
        value: subjects.torque_wake_same_row_diagnostic.conservation_pullback_hash,
      },
    ]),
    compareField("common_negative_control_ref", [
      {
        participant: "rank2_field_speed_action_self_hit_scan",
        value: subjects.rank2_field_speed_action_self_hit_scan.negative_control_ref,
      },
      {
        participant: "torque_wake_same_row_diagnostic",
        value: subjects.torque_wake_same_row_diagnostic.negative_control_ref,
      },
    ]),
  ];

  const failure = firstFailure(rows);
  const sameBranchSourceJoin = failure === null;
  const sameRecordProviderIntake = buildSameRecordProviderIntake({
    rank2Report,
    rank6Certificate,
    rank6Report,
    torqueWakeReport,
    subjects,
    rows,
    failure,
    sameBranchSourceJoin,
  });

  return {
    schema: SCHEMA,
    source_refs: {
      rank2_source_binding_report: options.rank2ReportRef ?? rank2Report.source_ref ?? null,
      rank6_moving_retained_branch_certificate: options.rank6CertificateRef ?? null,
      torque_wake_same_row_diagnostic: options.torqueWakeDiagnosticRef ?? null,
    },
    promotion_status: "priority-only",
    join_scope: "rank2-rank6-branch-source-closure",
    join_verdict: sameBranchSourceJoin ? "branch_source_join_candidate" : failure,
    first_failure: failure,
    same_branch_source_join: sameBranchSourceJoin,
    input_validation_errors: validation.errors,
    subjects,
    join_rows: rows,
    same_record_provider_intake: sameRecordProviderIntake,
    authorization: {
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      bounded_speed_live_ledger: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
    not_authorized: [
      "does not run field_speed_action_self_hit_scan/v0",
      "does not create or accept moving_retained_branch_certificate/v0",
      "does not certify a bounded-speed live ledger",
      "does not populate Photon Gate A",
      "does not populate Lorentz rows",
      "does not authorize observer export",
    ],
  };
}

export function validationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== SCHEMA) {
    errors.push(`schema must be ${SCHEMA}`);
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (!Array.isArray(report.join_rows)) {
    errors.push("join_rows must be an array");
  }
  if (report.same_branch_source_join === true) {
    if (report.join_verdict !== "branch_source_join_candidate") {
      errors.push("same_branch_source_join reports must use branch_source_join_candidate verdict");
    }
    if (report.first_failure !== null) {
      errors.push("same_branch_source_join reports must not carry first_failure");
    }
  } else if (typeof report.first_failure !== "string" || report.first_failure.trim() === "") {
    errors.push("blocked reports must carry first_failure");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  for (const field of [
    "candidate_h_recovery",
    "moving_retained_branch_certificate",
    "bounded_speed_live_ledger",
    "photon_gate_a",
    "lorentz_rows",
    "observer_export",
  ]) {
    if (report.authorization?.[field] !== false) {
      errors.push(`${field} authorization must remain false`);
    }
  }
  if (!isObject(report.same_record_provider_intake)) {
    errors.push("same_record_provider_intake must be an object");
  } else {
    if (report.same_record_provider_intake.schema !== "rank2_rank6_same_record_provider_intake/v0") {
      errors.push("same_record_provider_intake schema is invalid");
    }
    if (!Array.isArray(report.same_record_provider_intake.required_same_record_fields)) {
      errors.push("same_record_provider_intake required_same_record_fields must be an array");
    }
    if (!isObject(report.same_record_provider_intake.negative_controls)) {
      errors.push("same_record_provider_intake negative_controls must be an object");
    }
    const sameStepProviderTarget =
      report.same_record_provider_intake.same_step_retained_torque_wake_branch_certificate_provider_target;
    if (!isObject(sameStepProviderTarget)) {
      errors.push("same_record_provider_intake same-step torque/wake provider target must be an object");
    } else {
      if (
        sameStepProviderTarget.schema !==
        "same_step_retained_torque_wake_branch_certificate_provider/v0"
      ) {
        errors.push("same_record_provider_intake same-step torque/wake provider target schema mismatch");
      }
      if (sameStepProviderTarget.target_status !== "fail_closed_provider_target") {
        errors.push("same_record_provider_intake same-step torque/wake provider target must fail closed");
      }
      if (sameStepProviderTarget.downstream_authorization?.rank2_field_speed_action_self_hit_scan !== false) {
        errors.push("same_record_provider_intake same-step torque/wake rank2 authorization must remain false");
      }
      if (sameStepProviderTarget.downstream_authorization?.rank6_moving_retained_branch_certificate !== false) {
        errors.push("same_record_provider_intake same-step torque/wake rank6 authorization must remain false");
      }
    }
    for (const field of [
      "candidate_h_recovery",
      "moving_retained_branch_certificate",
      "bounded_speed_live_ledger",
      "photon_gate_a",
      "lorentz_rows",
      "observer_export",
    ]) {
      if (report.same_record_provider_intake.authorization?.[field] !== false) {
        errors.push(`same_record_provider_intake ${field} authorization must remain false`);
      }
    }
  }
  return errors;
}

function writeOutput(value, args) {
  const body = `${JSON.stringify(value, null, args.pretty ? 2 : 0)}\n`;
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, body);
  } else {
    process.stdout.write(body);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.validate) {
    const report = readJson(args.validate);
    const errors = validationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        join_verdict: report.join_verdict ?? null,
        first_failure: report.first_failure ?? null,
      },
      args
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (!args.rank2Report || !args.rank6Certificate || !args.torqueWakeDiagnostic) {
    throw new Error(
      "--rank2-report, --rank6-certificate, and --torque-wake-diagnostic are required unless --validate is used."
    );
  }

  writeOutput(
    buildReport(
      {
        rank2SourceBindingReport: readJson(args.rank2Report),
        rank6CertificateCandidate: readJson(args.rank6Certificate),
        torqueWakeDiagnosticCandidate: readJson(args.torqueWakeDiagnostic),
      },
      {
        rank2ReportRef: args.rank2Report,
        rank6CertificateRef: args.rank6Certificate,
        torqueWakeDiagnosticRef: args.torqueWakeDiagnostic,
      }
    ),
    args
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
