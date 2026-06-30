#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCHEMA = "torque_wake_same_row_diagnostic_report/v0";
const CANDIDATE_SCHEMA = "torque_wake_same_row_diagnostic/v0";
const BRANCH_CERTIFICATE_PROVIDER_OBJECT_TARGET_SCHEMA =
  "torque_wake_branch_certificate_provider_object_target/v0";
const SAME_STEP_RETAINED_TORQUE_WAKE_BRANCH_CERTIFICATE_PROVIDER_SCHEMA =
  "same_step_retained_torque_wake_branch_certificate_provider/v0";
const BRANCH_CERTIFICATE_REF_SOURCE_AVAILABILITY_AUDIT_SCHEMA =
  "torque_wake_branch_certificate_ref_source_availability_audit/v0";
const NEXT_RETAINED_ACTIVE_ROW_EVIDENCE_OBJECT_SCHEMA =
  "torque_wake_retained_active_row_branch_certificate_evidence_object/v0";
const RETAINED_ACTIVE_ROW_BRANCH_CERTIFICATE_BRIDGE_TARGET_SCHEMA =
  "torque_wake_retained_active_row_branch_certificate_bridge_target/v0";
const ACCEPTED_BRANCH_CHART_SOURCE_SCOUT_REF =
  "scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-accepted-branch-chart-source-scout.json";
const NEAREST_PARTIAL_BRANCH_CHART_SOURCE_REF =
  "scripts/nested-shell-braid/fixtures/moving-retained-branch-certificate-partial-same-record-identity-scout.json";
const NEAREST_PARTIAL_BRANCH_CERTIFICATE_REF =
  "candidate:branch-chart-ref-with-partial-same-record-identity";
const NEAREST_PARTIAL_ACCEPTED_BRANCH_CHART_REF =
  "proxy:accepted-branch-chart-ref-not-issued";

const DISALLOWED_REFERENCE_PREFIXES = [
  "priority-only:",
  "fixture:",
  "proxy:",
  "candidate:",
  "synthetic:",
  "route-only:",
  "aggregate:",
  "cross-row:",
];

const REQUIRED_BINDING_FIELDS = [
  "source_report_ref",
  "selected_case_id",
  "route_root_key",
  "sampled_active_row_ids",
  "action_increment_row_ref",
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "torque_integrals_ref",
  "wake_energy_routing_ref",
  "event_ledger_convention_ref",
  "negative_control_ref",
];

const RETAINED_ACTIVE_ROW_REQUIRED_FIELDS = [
  "branch_certificate_ref",
  "same_retained_active_row_ids",
  "accepted_branch_chart_ref",
  "moving_retained_branch_certificate_ref",
];

const SAME_RECORD_IDENTITY_REQUIRED_FIELDS = [
  "same_record_identity.branch_label",
  "same_record_identity.extraction_window_id",
  "same_record_identity.active_root_ledger_hash",
  "same_record_identity.accepted_branch_chart_ref",
  "same_record_identity.separator_chart_ref",
  "same_record_identity.positive_gap_record_ref",
  "same_record_identity.memory_depth_record_ref",
  "same_record_identity.active_wave_vector_gap_ref",
];

const RETAINED_ACTIVE_ROW_CERTIFICATE_EVIDENCE_FIELDS = [
  "source_report_ref",
  "selected_case_id",
  "route_root_key",
  "sampled_active_row_ids",
  "branch_certificate_ref",
  "same_retained_active_row_ids",
  "retained_branch",
  "accepted_branch_chart_ref",
  "moving_retained_branch_certificate_ref",
  ...SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "negative_control_ref",
];

const BRANCH_CERTIFICATE_REF_SOURCE_AUDIT_FIELDS = [
  "source_report_ref",
  "selected_case_id",
  "route_root_key",
  "sampled_active_row_ids",
  "sampled_same_row_id_binding",
  "branch_certificate_ref",
  "same_retained_active_row_ids",
  "same_retained_active_row_id_binding",
  "retained_branch",
  "accepted_branch_chart_ref",
  "moving_retained_branch_certificate_ref",
  "same_record_identity.branch_label",
  "same_record_identity.extraction_window_id",
  "same_record_identity.active_root_ledger_hash",
  "same_record_identity.accepted_branch_chart_ref",
  "same_record_identity.separator_chart_ref",
  "same_record_identity.positive_gap_record_ref",
  "same_record_identity.memory_depth_record_ref",
  "same_record_identity.active_wave_vector_gap_ref",
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "negative_control_ref",
];

const BRANCH_CERTIFICATE_PROVIDER_OBJECT_FIELDS = [
  "source_report_ref",
  "selected_case_id",
  "route_root_key",
  "sampled_active_row_ids",
  "sampled_same_row_id_binding",
  "action_increment_row_ref",
  "accepted_transition_source_ref",
  "action_increment_row_id",
  "retained_branch",
  "branch_certificate_ref",
  "same_retained_active_row_ids",
  "same_record_identity.branch_label",
  "same_record_identity.extraction_window_id",
  "same_record_identity.active_root_ledger_hash",
  "same_record_identity.accepted_branch_chart_ref",
  "same_record_identity.separator_chart_ref",
  "same_record_identity.positive_gap_record_ref",
  "same_record_identity.memory_depth_record_ref",
  "same_record_identity.active_wave_vector_gap_ref",
  "accepted_branch_chart_ref",
  "moving_retained_branch_certificate_ref",
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "negative_control_ref",
];

const SAME_STEP_RETAINED_TORQUE_WAKE_PROVIDER_FIELDS = [
  "accepted_transition_source_ref",
  "action_increment_row_id",
  "retained_branch",
  "branch_certificate_ref",
  "same_retained_active_row_ids",
  "same_record_identity.accepted_branch_chart_ref",
  "accepted_branch_chart_ref",
  "moving_retained_branch_certificate_ref",
  "active_root_ledger_hash",
  "conservation_pullback_hash",
  "negative_control_ref",
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      args.input = argv[++index];
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
  console.log(`Usage: node scripts/nested-shell-braid/torque-wake-same-row-diagnostic-report.mjs [options]

Options:
  --input PATH       Candidate torque/wake same-row diagnostic JSON.
  --validate PATH    Validate an emitted report.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side bridge report. It records whether the
angular-momentum torque/wake diagnostic uses the same sampled active rows needed
by rank 2 and rank 6, but it never promotes candidate_h_recovery, a moving
retained branch certificate, a bounded-speed live ledger, or observer export.`);
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

function nonemptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function nestedValue(source, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => (isObject(value) ? value[key] : undefined), source);
}

function normalizedString(value) {
  return present(value) ? String(value).trim() : null;
}

function rejectedRefCode(field, value) {
  const normalized = normalizedString(value);
  if (normalized === null) {
    return `${field.replaceAll(".", "_")}_missing`;
  }
  for (const prefix of DISALLOWED_REFERENCE_PREFIXES) {
    if (normalized.startsWith(prefix)) {
      return `${field.replaceAll(".", "_")}_${prefix.slice(0, -1).replace("-", "_")}_not_accepted`;
    }
  }
  if (normalized.includes("synthetic")) {
    return `${field.replaceAll(".", "_")}_synthetic_not_accepted`;
  }
  if (normalized.includes(":fixture") || normalized.includes("fixture-")) {
    return `${field.replaceAll(".", "_")}_fixture_not_accepted`;
  }
  return null;
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((entry) => nonemptyString(entry)) : [];
}

function sameOrderedStrings(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => value === right[index]);
}

function missingFields(candidate) {
  return REQUIRED_BINDING_FIELDS.filter((field) => !present(candidate[field]));
}

function rowBinding(candidate) {
  const activeRows = stringArray(candidate.sampled_active_row_ids);
  const forceRows = stringArray(candidate.force_row_ids);
  const partitionRows = stringArray(candidate.partition_row_ids);
  const torqueRows = stringArray(candidate.torque_row_ids);
  const wakeRows = stringArray(candidate.wake_row_ids);
  const arrays = [forceRows, partitionRows, torqueRows, wakeRows];
  const sameRows =
    activeRows.length > 0 && arrays.every((rows) => rows.length > 0 && sameOrderedStrings(activeRows, rows));

  return {
    same_row_id_binding: sameRows,
    activeRows,
    forceRows,
    partitionRows,
    torqueRows,
    wakeRows,
  };
}

function currentTorqueWakeFamily(candidate) {
  return `torque_wake_same_row_diagnostic:${candidate.selected_case_id ?? "index-ratio:f2"}`;
}

function referenceRejectionPolicy() {
  return {
    schema: "accepted_reference_rejection_policy/v0",
    disallowed_prefixes: DISALLOWED_REFERENCE_PREFIXES,
    disallowed_substrings: ["synthetic", ":fixture", "fixture-"],
    applies_to_fields: [
      "branch_certificate_ref",
      "accepted_transition_source_ref",
      "action_increment_row_id",
      "accepted_branch_chart_ref",
      "moving_retained_branch_certificate_ref",
      ...SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
      "active_root_ledger_hash",
      "conservation_pullback_hash",
      "negative_control_ref",
    ],
    rule:
      "A nonempty reference is not accepted evidence if it is priority-only, fixture, proxy, candidate, or synthetic.",
  };
}

function sampledActiveRowCertificateContract(binding, sameRetainedRows) {
  const sameRetainedRowBinding =
    binding.same_row_id_binding &&
    sameRetainedRows.length > 0 &&
    sameOrderedStrings(binding.activeRows, sameRetainedRows);

  return {
    schema: "sampled_active_row_certificate_contract/v0",
    sampled_active_row_ids: binding.activeRows,
    force_row_ids: binding.forceRows,
    partition_row_ids: binding.partitionRows,
    torque_row_ids: binding.torqueRows,
    wake_row_ids: binding.wakeRows,
    sampled_same_row_id_binding: binding.same_row_id_binding,
    equality_required_between: [
      "sampled_active_row_ids",
      "force_row_ids",
      "partition_row_ids",
      "torque_row_ids",
      "wake_row_ids",
      "same_retained_active_row_ids",
    ],
    required_same_retained_active_row_ids: binding.activeRows,
    observed_same_retained_active_row_ids: sameRetainedRows,
    same_retained_active_row_id_binding: sameRetainedRowBinding,
  };
}

function retainedActiveRowNegativeControlContract(candidate) {
  return {
    schema: "retained_active_row_branch_certificate_negative_control_contract/v0",
    required_field: "negative_control_ref",
    current_negative_control_ref: candidate.negative_control_ref ?? null,
    must_reject: [
      "any sampled active row id mismatch across force, partition, torque, wake, and same_retained_active_row_ids",
      "any branch_certificate_ref, accepted_branch_chart_ref, moving_retained_branch_certificate_ref, or same_record_identity reference with priority-only, fixture, proxy, candidate, or synthetic status",
      "any active_root_ledger_hash or conservation_pullback_hash not bound to the same source report and selected case",
    ],
  };
}

function retainedActiveRowBranchCertificateBridgeTarget(candidate, sampledRows) {
  const currentSameRecordIdentity = isObject(candidate.same_record_identity)
    ? candidate.same_record_identity
    : {};
  const branchLabel = currentSameRecordIdentity.branch_label ?? "q:index-ratio:f2";
  const extractionWindowId =
    currentSameRecordIdentity.extraction_window_id ?? "W:index-ratio:f2:sampled-active-row-window";
  const activeRootLedgerHash =
    currentSameRecordIdentity.active_root_ledger_hash ?? candidate.active_root_ledger_hash ?? null;

  return {
    schema: RETAINED_ACTIVE_ROW_BRANCH_CERTIFICATE_BRIDGE_TARGET_SCHEMA,
    current_family: currentTorqueWakeFamily(candidate),
    claim_boundary:
      "Fail-closed bridge target only: it names the missing same-record accepted references and does not authorize retained active-row consumption.",
    retained_active_row_ids: sampledRows,
    same_record_identity_target: {
      branch_label: branchLabel,
      extraction_window_id: extractionWindowId,
      active_root_ledger_hash: activeRootLedgerHash,
      accepted_branch_chart_ref: null,
      separator_chart_ref: null,
      positive_gap_record_ref: null,
      memory_depth_record_ref: null,
      active_wave_vector_gap_ref: null,
    },
    current_hash_bindings: {
      active_root_ledger_hash: candidate.active_root_ledger_hash ?? null,
      conservation_pullback_hash: candidate.conservation_pullback_hash ?? null,
      negative_control_ref: candidate.negative_control_ref ?? null,
    },
    source_search_result: {
      accepted_source_found: false,
      searched_for: [
        "non-fixture retained active-row branch_certificate_ref on the sampled torque/wake rows",
        "accepted_same_record_branch_chart source for the same branch label, extraction window, and active-root ledger",
        "moving_retained_branch_certificate/v0 consuming that same accepted branch chart",
      ],
      source_refs_checked: [
        ACCEPTED_BRANCH_CHART_SOURCE_SCOUT_REF,
        NEAREST_PARTIAL_BRANCH_CHART_SOURCE_REF,
        "scripts/nested-shell-braid/fixtures/torque-wake-same-row-diagnostic-priority-target.json",
        "scripts/solver-audits/fixtures/branch-provider-current-candidates.json",
        "reference/priorities/braid-nested-shell-causal-closure/structural-integrity-common-limit-theorem.md",
      ],
      nearest_partial_source_ref: NEAREST_PARTIAL_BRANCH_CHART_SOURCE_REF,
      nearest_partial_source_status: "routing_evidence_only",
    },
    missing_accepted_refs: [
      {
        field: "branch_certificate_ref",
        required_ref_target:
          "accepted retained active-row branch_certificate_ref for torque_wake_same_row_diagnostic:index-ratio:f2",
        current_ref: candidate.branch_certificate_ref ?? null,
        nearest_partial_ref: NEAREST_PARTIAL_BRANCH_CERTIFICATE_REF,
        first_failure_code: rejectedRefCode("branch_certificate_ref", candidate.branch_certificate_ref),
      },
      {
        field: "same_record_identity.accepted_branch_chart_ref",
        required_ref_target:
          "accepted_same_record_branch_chart for q:index-ratio:f2 over W:index-ratio:f2:sampled-active-row-window",
        current_ref: currentSameRecordIdentity.accepted_branch_chart_ref ?? null,
        nearest_partial_ref: NEAREST_PARTIAL_ACCEPTED_BRANCH_CHART_REF,
        first_failure_code: "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted",
      },
      {
        field: "moving_retained_branch_certificate_ref",
        required_ref_target:
          "moving_retained_branch_certificate/v0 consuming the same retained active-row branch_certificate_ref and accepted branch chart",
        current_ref: candidate.moving_retained_branch_certificate_ref ?? null,
        nearest_partial_ref: null,
        first_failure_code: rejectedRefCode(
          "moving_retained_branch_certificate_ref",
          candidate.moving_retained_branch_certificate_ref
        ),
      },
    ],
    negative_control_contract: retainedActiveRowNegativeControlContract(candidate),
    acceptance_boundary:
      "This bridge target becomes evidence only when all missing refs are replaced by accepted non-fixture same-record sources and same_retained_active_row_ids exactly match the sampled rows.",
    authorization: {
      accepted_transition_source: false,
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      retained_branch: false,
      bounded_speed_live_ledger: false,
      observer_export: false,
    },
  };
}

function nextRetainedActiveRowEvidenceObject(candidate, sampledRows) {
  return {
    schema: NEXT_RETAINED_ACTIVE_ROW_EVIDENCE_OBJECT_SCHEMA,
    current_family: currentTorqueWakeFamily(candidate),
    selected_case_id: candidate.selected_case_id ?? null,
    required_fields: RETAINED_ACTIVE_ROW_CERTIFICATE_EVIDENCE_FIELDS,
    required_same_retained_active_row_ids: sampledRows,
    same_record_identity_required_fields: SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
    reference_rejection_policy: referenceRejectionPolicy(),
    negative_control_contract: retainedActiveRowNegativeControlContract(candidate),
    fail_closed_bridge_target: retainedActiveRowBranchCertificateBridgeTarget(candidate, sampledRows),
    rank2_follow_on_fields_after_certificate: [
      "accepted_transition_source_ref",
      "action_increment_row_id",
    ],
    acceptance_boundary:
      "The object must be a non-fixture retained active-row branch certificate for the sampled torque/wake rows; labels, proxies, candidates, synthetic rows, or fixture-only rows remain fail-closed.",
  };
}

function computeFirstFailure(candidate, binding, missing) {
  if (candidate.schema && candidate.schema !== CANDIDATE_SCHEMA) {
    return "candidate_schema_mismatch";
  }
  if (candidate.retained_branch !== false) {
    return "retained_branch_not_false";
  }
  if (!present(candidate.branch_certificate_ref)) {
    return "branch_certificate_ref_missing";
  }
  if (!binding.same_row_id_binding) {
    return "same_row_id_mismatch";
  }
  if (missing.length > 0) {
    return `${missing[0]}_missing`;
  }
  return "diagnostic_only_not_authorization_source";
}

function buildRetainedActiveRowCertificateContract(candidate, binding) {
  const sameRetainedRows = stringArray(candidate.same_retained_active_row_ids);
  const missingRetainedFields = RETAINED_ACTIVE_ROW_REQUIRED_FIELDS.filter((field) => !present(candidate[field]));
  const sameRetainedRowBinding =
    binding.same_row_id_binding &&
    sameRetainedRows.length > 0 &&
    sameOrderedStrings(binding.activeRows, sameRetainedRows);

  let firstFailure = "retained_rows_still_priority_only_not_authorization";
  if (!binding.same_row_id_binding) {
    firstFailure = "sampled_same_row_id_mismatch";
  } else if (!present(candidate.branch_certificate_ref)) {
    firstFailure = "branch_certificate_ref_missing_before_same_retained_active_row_ids";
  } else if (sameRetainedRows.length === 0) {
    firstFailure = "same_retained_active_row_ids_missing";
  } else if (!sameRetainedRowBinding) {
    firstFailure = "same_retained_active_row_id_mismatch";
  } else if (!present(candidate.accepted_branch_chart_ref)) {
    firstFailure = "accepted_branch_chart_ref_missing";
  } else if (!present(candidate.moving_retained_branch_certificate_ref)) {
    firstFailure = "moving_retained_branch_certificate_ref_missing";
  }

  return {
    schema: "same_retained_active_row_certificate_contract/v0",
    promotion_status: "priority-only",
    feeds: ["rank2.accepted_transition_source", "rank6.moving_retained_branch_certificate/v0"],
    required_fields: RETAINED_ACTIVE_ROW_REQUIRED_FIELDS,
    sampled_active_row_ids: binding.activeRows,
    same_retained_active_row_ids: sameRetainedRows,
    sampled_active_row_certificate_contract: sampledActiveRowCertificateContract(binding, sameRetainedRows),
    required_same_retained_active_row_ids: binding.activeRows,
    same_record_identity_required_fields: SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
    reference_rejection_policy: referenceRejectionPolicy(),
    next_retained_active_row_evidence_object: nextRetainedActiveRowEvidenceObject(candidate, binding.activeRows),
    sampled_same_row_id_binding: binding.same_row_id_binding,
    same_retained_active_row_id_binding: sameRetainedRowBinding,
    branch_certificate_ref_present: present(candidate.branch_certificate_ref),
    accepted_branch_chart_ref_present: present(candidate.accepted_branch_chart_ref),
    moving_retained_branch_certificate_ref_present: present(candidate.moving_retained_branch_certificate_ref),
    missing_or_rejected_fields: [
      ...missingRetainedFields,
      ...(binding.same_row_id_binding ? [] : ["sampled_same_row_id_binding"]),
      ...(sameRetainedRowBinding ? [] : ["same_retained_active_row_id_binding"]),
    ],
    same_retained_active_row_ids_status: present(candidate.branch_certificate_ref)
      ? sameRetainedRows.length > 0
        ? sameRetainedRowBinding
          ? "sampled_rows_bound_to_same_retained_active_rows"
          : "sampled_rows_do_not_match_same_retained_active_rows"
        : "missing"
      : "blocked_pending_branch_certificate_ref",
    first_failure: firstFailure,
    retained_authorization: false,
    negative_control_contract: retainedActiveRowNegativeControlContract(candidate),
    note:
      "Sampled force/partition/torque/wake row ids are useful routing evidence only; top-six consumers need the same ids certified as retained active rows by one branch certificate and accepted branch chart.",
  };
}

function providerTargetField(field, pass, failureCode, detail = {}) {
  return {
    field,
    status: pass ? "passed" : "failed",
    failure_code: pass ? null : failureCode,
    ...detail,
  };
}

function refTargetField(candidate, field, detail = {}) {
  const value = nestedValue(candidate, field);
  const failureCode = rejectedRefCode(field, value);
  return providerTargetField(field, failureCode === null, failureCode, {
    value: value ?? null,
    ...detail,
  });
}

function presentTargetField(candidate, field, failureCode = `${field.replaceAll(".", "_")}_missing`) {
  const value = nestedValue(candidate, field);
  return providerTargetField(field, present(value), failureCode, { value: value ?? null });
}

function buildBranchCertificateProviderObjectTarget(candidate, binding, retainedActiveRowCertificateContract) {
  const sameRecordIdentity = isObject(candidate.same_record_identity) ? candidate.same_record_identity : {};
  const sameRecordIdentityPresent = Object.values(sameRecordIdentity).some((value) => present(value));
  const sampledRows = binding.activeRows;
  const sameRetainedRows = stringArray(candidate.same_retained_active_row_ids);
  const actionIncrementRowId = candidate.action_increment_row_id ?? null;
  const actionIncrementFailure =
    rejectedRefCode("action_increment_row_id", actionIncrementRowId) ??
    (actionIncrementRowId === candidate.action_increment_row_ref
      ? "action_increment_row_id_reuses_priority_only_ref_not_accepted"
      : null);
  const retainedBranchPass = candidate.retained_branch === true;
  const rows = [
    refTargetField(candidate, "source_report_ref"),
    refTargetField(candidate, "selected_case_id"),
    refTargetField(candidate, "route_root_key"),
    providerTargetField(
      "sampled_active_row_ids",
      sampledRows.length > 0,
      "sampled_active_row_ids_missing",
      { value: sampledRows }
    ),
    providerTargetField(
      "sampled_same_row_id_binding",
      binding.same_row_id_binding,
      "sampled_same_row_id_binding_missing",
      {
        sampled_active_row_ids: sampledRows,
        force_row_ids: binding.forceRows,
        partition_row_ids: binding.partitionRows,
        torque_row_ids: binding.torqueRows,
        wake_row_ids: binding.wakeRows,
      }
    ),
    presentTargetField(candidate, "action_increment_row_ref"),
    refTargetField(candidate, "accepted_transition_source_ref"),
    providerTargetField("action_increment_row_id", actionIncrementFailure === null, actionIncrementFailure, {
      value: actionIncrementRowId,
      action_increment_row_ref: candidate.action_increment_row_ref ?? null,
    }),
    providerTargetField(
      "retained_branch",
      retainedBranchPass,
      "retained_branch_false_not_retained_provider",
      { value: candidate.retained_branch ?? null }
    ),
    refTargetField(candidate, "branch_certificate_ref"),
    providerTargetField(
      "same_retained_active_row_ids",
      retainedActiveRowCertificateContract.same_retained_active_row_id_binding === true,
      sameRetainedRows.length > 0
        ? "same_retained_active_row_id_mismatch"
        : "same_retained_active_row_ids_missing",
      {
        value: sameRetainedRows,
        sampled_active_row_ids: sampledRows,
      }
    ),
    ...[
      "same_record_identity.branch_label",
      "same_record_identity.extraction_window_id",
      "same_record_identity.active_root_ledger_hash",
      "same_record_identity.accepted_branch_chart_ref",
      "same_record_identity.separator_chart_ref",
      "same_record_identity.positive_gap_record_ref",
      "same_record_identity.memory_depth_record_ref",
      "same_record_identity.active_wave_vector_gap_ref",
      "accepted_branch_chart_ref",
      "moving_retained_branch_certificate_ref",
      "active_root_ledger_hash",
      "conservation_pullback_hash",
      "negative_control_ref",
    ].map((field) => refTargetField(candidate, field)),
  ];
  const missingOrRejectedFields = rows
    .filter((row) => row.status !== "passed")
    .map((row) => row.field);
  const firstFailure = rows.find((row) => row.status !== "passed")?.failure_code ?? null;
  const targetReady = firstFailure === null;

  return {
    schema: BRANCH_CERTIFICATE_PROVIDER_OBJECT_TARGET_SCHEMA,
    promotion_status: "priority-only",
    feeds: ["rank2.accepted_transition_source", "rank6.moving_retained_branch_certificate/v0"],
    current_family: "torque_wake_same_row_diagnostic:index-ratio:f2",
    claim_boundary:
      "Names the same-record provider object needed to turn sampled torque/wake rows into a retained active-row branch certificate; it does not authorize branch state.",
    required_fields: BRANCH_CERTIFICATE_PROVIDER_OBJECT_FIELDS,
    sampled_active_row_certificate_contract: sampledActiveRowCertificateContract(binding, sameRetainedRows),
    same_record_identity_required_fields: SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
    reference_rejection_policy: referenceRejectionPolicy(),
    negative_control_contract: retainedActiveRowNegativeControlContract(candidate),
    field_results: rows,
    present_useful_fields: rows.filter((row) => row.status === "passed").map((row) => row.field),
    missing_or_rejected_fields: missingOrRejectedFields,
    first_failure: firstFailure,
    provider_object_ready: targetReady,
    same_record_identity_present: sameRecordIdentityPresent,
    fail_closed_bridge_target: retainedActiveRowBranchCertificateBridgeTarget(candidate, sampledRows),
    authorization: {
      accepted_transition_source: false,
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      retained_branch: false,
      bounded_speed_live_ledger: false,
      observer_export: false,
    },
    next_retained_active_row_evidence_object: nextRetainedActiveRowEvidenceObject(candidate, sampledRows),
    next_source_object:
      "one non-fixture retained active-row provider object for selected_case_id=index-ratio:f2 with accepted_transition_source_ref, action_increment_row_id, retained_branch=true, branch_certificate_ref, same_retained_active_row_ids equal to the sampled active rows, same_record_identity branch-chart fields, accepted_branch_chart_ref, moving_retained_branch_certificate_ref, active_root_ledger_hash, conservation_pullback_hash, and negative_control_ref",
  };
}

function buildSameStepRetainedTorqueWakeBranchCertificateProviderTarget(
  candidate,
  binding,
  branchCertificateProviderObjectTarget
) {
  const requiredFieldResults = SAME_STEP_RETAINED_TORQUE_WAKE_PROVIDER_FIELDS.map((field) =>
    branchCertificateProviderObjectTarget.field_results.find((entry) => entry.field === field) ??
    refTargetField(candidate, field)
  );
  const missingOrRejectedFields = requiredFieldResults
    .filter((row) => row.status !== "passed")
    .map((row) => row.field);
  const firstFailure = requiredFieldResults.find((row) => row.status !== "passed")?.failure_code ?? null;

  return {
    schema: SAME_STEP_RETAINED_TORQUE_WAKE_BRANCH_CERTIFICATE_PROVIDER_SCHEMA,
    target_status: "fail_closed_provider_target",
    promotion_status: "priority-only",
    current_family: currentTorqueWakeFamily(candidate),
    selected_case_id: candidate.selected_case_id ?? null,
    provider_object_required: true,
    accepted_non_fixture_provider_required: true,
    required_same_step_selected_case_id: "index-ratio:f2",
    required_same_step_fields: SAME_STEP_RETAINED_TORQUE_WAKE_PROVIDER_FIELDS,
    sampled_active_row_ids: binding.activeRows,
    sampled_same_row_id_binding: binding.same_row_id_binding,
    field_results: requiredFieldResults,
    missing_or_rejected_fields: missingOrRejectedFields,
    first_failure: firstFailure,
    provider_ready: firstFailure === null,
    reference_rejection_policy: referenceRejectionPolicy(),
    disallowed_provider_sources: [
      "fixture",
      "proxy",
      "synthetic",
      "route-only",
      "aggregate",
      "cross-row",
      "priority-only diagnostic",
    ],
    feeds: ["rank2.accepted_transition_source", "rank6.moving_retained_branch_certificate/v0"],
    downstream_authorization: {
      rank2_field_speed_action_self_hit_scan: false,
      rank6_moving_retained_branch_certificate: false,
      retained_branch: false,
      candidate_h_recovery: false,
    },
    smallest_next_source_object:
      "non-fixture same-step retained torque/wake branch certificate provider for index-ratio:f2 with accepted_transition_source_ref, action_increment_row_id, retained_branch=true, branch_certificate_ref, same_retained_active_row_ids, accepted branch-chart refs, moving_retained_branch_certificate_ref, active_root_ledger_hash, conservation_pullback_hash, and negative_control_ref on one retained record",
  };
}

function buildBranchCertificateRefSourceAvailabilityAudit(candidate, binding, retainedActiveRowCertificateContract) {
  const sampledRows = binding.activeRows;
  const sameRetainedRows = stringArray(candidate.same_retained_active_row_ids);
  const sourceIdentityRows = [
    refTargetField(candidate, "source_report_ref"),
    refTargetField(candidate, "selected_case_id"),
    refTargetField(candidate, "route_root_key"),
  ];
  const rows = [
    ...sourceIdentityRows,
    providerTargetField(
      "sampled_active_row_ids",
      sampledRows.length > 0,
      "sampled_active_row_ids_missing",
      { value: sampledRows }
    ),
    providerTargetField(
      "sampled_same_row_id_binding",
      binding.same_row_id_binding,
      "sampled_same_row_id_binding_missing",
      {
        sampled_active_row_ids: sampledRows,
        force_row_ids: binding.forceRows,
        partition_row_ids: binding.partitionRows,
        torque_row_ids: binding.torqueRows,
        wake_row_ids: binding.wakeRows,
      }
    ),
    refTargetField(candidate, "branch_certificate_ref"),
    providerTargetField(
      "same_retained_active_row_ids",
      sameRetainedRows.length > 0,
      "same_retained_active_row_ids_missing",
      {
        value: sameRetainedRows,
        sampled_active_row_ids: sampledRows,
      }
    ),
    providerTargetField(
      "same_retained_active_row_id_binding",
      retainedActiveRowCertificateContract.same_retained_active_row_id_binding === true,
      sameRetainedRows.length > 0
        ? "same_retained_active_row_id_mismatch"
        : "same_retained_active_row_ids_missing",
      {
        sampled_active_row_ids: sampledRows,
        same_retained_active_row_ids: sameRetainedRows,
      }
    ),
    providerTargetField(
      "retained_branch",
      candidate.retained_branch === true,
      "retained_branch_false_not_retained_source",
      { value: candidate.retained_branch ?? null }
    ),
    refTargetField(candidate, "accepted_branch_chart_ref"),
    refTargetField(candidate, "moving_retained_branch_certificate_ref"),
    ...[
      "same_record_identity.branch_label",
      "same_record_identity.extraction_window_id",
      "same_record_identity.active_root_ledger_hash",
      "same_record_identity.accepted_branch_chart_ref",
      "same_record_identity.separator_chart_ref",
      "same_record_identity.positive_gap_record_ref",
      "same_record_identity.memory_depth_record_ref",
      "same_record_identity.active_wave_vector_gap_ref",
      "active_root_ledger_hash",
      "conservation_pullback_hash",
      "negative_control_ref",
    ].map((field) => refTargetField(candidate, field)),
  ];
  const missingOrRejectedFields = rows
    .filter((row) => row.status !== "passed")
    .map((row) => row.field);
  const firstFailure = rows.find((row) => row.status !== "passed")?.failure_code ?? null;
  const retainedActiveRowBranchCertificateRefFound = firstFailure === null;

  return {
    schema: BRANCH_CERTIFICATE_REF_SOURCE_AVAILABILITY_AUDIT_SCHEMA,
    promotion_status: "priority-only",
    current_family: "torque_wake_same_row_diagnostic:index-ratio:f2",
    searched_status: retainedActiveRowBranchCertificateRefFound
      ? "retained_active_row_branch_certificate_ref_available"
      : "retained_active_row_branch_certificate_ref_absent",
    claim_boundary:
      "Fail-closed availability readout for the retained active-row branch certificate needed by rank 2 and rank 6; it does not authorize candidate_h_recovery or moving retained branch closure.",
    required_retained_active_row_certificate_fields: BRANCH_CERTIFICATE_REF_SOURCE_AUDIT_FIELDS,
    source_report_identity_fields: ["source_report_ref", "selected_case_id", "route_root_key"],
    source_report_identity_binding: sourceIdentityRows.every((row) => row.status === "passed"),
    sampled_same_row_id_binding: binding.same_row_id_binding,
    sampled_active_row_certificate_contract: sampledActiveRowCertificateContract(binding, sameRetainedRows),
    same_record_identity_required_fields: SAME_RECORD_IDENTITY_REQUIRED_FIELDS,
    reference_rejection_policy: referenceRejectionPolicy(),
    negative_control_contract: retainedActiveRowNegativeControlContract(candidate),
    retained_active_row_branch_certificate_ref_found: retainedActiveRowBranchCertificateRefFound,
    branch_certificate_ref_present: present(candidate.branch_certificate_ref),
    branch_certificate_ref_value: candidate.branch_certificate_ref ?? null,
    sampled_active_row_ids: sampledRows,
    same_retained_active_row_ids: sameRetainedRows,
    same_retained_active_row_id_binding:
      retainedActiveRowCertificateContract.same_retained_active_row_id_binding,
    field_results: rows,
    present_useful_fields: rows.filter((row) => row.status === "passed").map((row) => row.field),
    missing_or_rejected_fields: missingOrRejectedFields,
    first_failure: firstFailure,
    next_retained_active_row_evidence_object: nextRetainedActiveRowEvidenceObject(candidate, sampledRows),
    fail_closed_bridge_target: retainedActiveRowBranchCertificateBridgeTarget(candidate, sampledRows),
    smallest_next_evidence_object:
      "one retained active-row branch_certificate_ref for torque_wake_same_row_diagnostic:index-ratio:f2 with source_report_ref, selected_case_id, route_root_key, sampled_active_row_ids, same_retained_active_row_ids equal to those sampled rows, accepted_branch_chart_ref, moving_retained_branch_certificate_ref, same_record_identity branch-label/window/active-root/accepted-chart/separator/positive-gap/memory-depth/active-wave-vector-gap fields, active_root_ledger_hash, conservation_pullback_hash, and negative_control_ref",
    authorization: {
      accepted_transition_source: false,
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      retained_branch: false,
      bounded_speed_live_ledger: false,
      observer_export: false,
    },
  };
}

function consumerStatus(firstFailure, retainedBranch) {
  return {
    rank2_field_speed_action_self_hit_scan: {
      required_source: "accepted_transition_source",
      status: "source_row_binding_open",
      first_failure: "source_row_binding_open",
      candidate_h_recovery_authorized: false,
      note:
        firstFailure === "diagnostic_only_not_authorization_source"
          ? "Same-row diagnostic fields are populated, but the object is not an accepted transition source."
          : "Diagnostic payload does not satisfy the accepted transition-source boundary.",
    },
    rank6_moving_retained_branch_certificate: {
      required_source: "moving_retained_branch_certificate/v0",
      status: "blocked_pending_accepted_branch_chart",
      first_failure: "blocked_pending_accepted_branch_chart",
      moving_retained_branch_certificate_authorized: false,
      note: "No accepted branch chart is supplied by the torque/wake diagnostic.",
    },
    rank5_bounded_speed_normal_reconstruction: {
      required_source: "bounded_speed_live_ledger",
      status: "bounded-speed-live-ledger-open",
      retained_branch: retainedBranch,
      bounded_speed_live_ledger_authorized: false,
      observer_export_authorized: false,
      note: "The diagnostic is explicitly below retained-branch and bounded-speed live-ledger closure.",
    },
  };
}

export function buildReport(candidate, options = {}) {
  if (!isObject(candidate)) {
    throw new Error("Candidate torque/wake same-row diagnostic must be a JSON object.");
  }

  const missing = missingFields(candidate);
  const binding = rowBinding(candidate);
  const retainedBranch = candidate.retained_branch === true;
  const firstFailure = computeFirstFailure(candidate, binding, missing);
  const retainedActiveRowCertificateContract = buildRetainedActiveRowCertificateContract(candidate, binding);
  const branchCertificateProviderObjectTarget = buildBranchCertificateProviderObjectTarget(
    candidate,
    binding,
    retainedActiveRowCertificateContract
  );
  const sameStepRetainedTorqueWakeBranchCertificateProviderTarget =
    buildSameStepRetainedTorqueWakeBranchCertificateProviderTarget(
      candidate,
      binding,
      branchCertificateProviderObjectTarget
    );
  const branchCertificateRefSourceAvailabilityAudit = buildBranchCertificateRefSourceAvailabilityAudit(
    candidate,
    binding,
    retainedActiveRowCertificateContract
  );
  const sameRecordSourceBinding =
    binding.same_row_id_binding &&
    present(candidate.branch_certificate_ref) &&
    present(candidate.action_increment_row_ref) &&
    present(candidate.active_root_ledger_hash) &&
    present(candidate.conservation_pullback_hash) &&
    present(candidate.negative_control_ref);

  return {
    schema: SCHEMA,
    source_ref: options.sourceRef ?? candidate.source_ref ?? null,
    candidate_schema: candidate.schema ?? null,
    diagnostic_id: candidate.id ?? "tri-binary-torque-wake-same-row-diagnostic",
    promotion_status: "priority-only",
    source_report_ref: candidate.source_report_ref ?? null,
    selected_case_id: candidate.selected_case_id ?? null,
    route_root_key: candidate.route_root_key ?? null,
    retained_branch: retainedBranch,
    branch_certificate_ref: candidate.branch_certificate_ref ?? null,
    sampled_active_row_ids: binding.activeRows,
    force_row_ids: binding.forceRows,
    partition_row_ids: binding.partitionRows,
    torque_row_ids: binding.torqueRows,
    wake_row_ids: binding.wakeRows,
    same_row_id_binding: binding.same_row_id_binding,
    same_record_source_binding: sameRecordSourceBinding,
    action_increment_row_ref: candidate.action_increment_row_ref ?? null,
    active_root_ledger_hash: candidate.active_root_ledger_hash ?? null,
    conservation_pullback_hash: candidate.conservation_pullback_hash ?? null,
    torque_integrals_ref: candidate.torque_integrals_ref ?? null,
    wake_energy_routing_ref: candidate.wake_energy_routing_ref ?? null,
    event_ledger_convention_ref: candidate.event_ledger_convention_ref ?? null,
    negative_control_ref: candidate.negative_control_ref ?? null,
    missing_or_rejected_fields: [
      ...missing,
      ...(candidate.branch_certificate_ref ? [] : ["branch_certificate_ref"]),
      ...(binding.same_row_id_binding ? [] : ["same_row_id_binding"]),
    ],
    diagnostic_verdict: firstFailure,
    first_failure: firstFailure,
    retained_upgrade_required: {
      same_retained_active_row_ids:
        retainedActiveRowCertificateContract.same_retained_active_row_ids_status,
      accepted_branch_chart: "missing",
      moving_branch_certificate: "missing",
    },
    retained_active_row_certificate_contract: retainedActiveRowCertificateContract,
    branch_certificate_ref_source_availability_audit: branchCertificateRefSourceAvailabilityAudit,
    branch_certificate_provider_object_target: branchCertificateProviderObjectTarget,
    same_step_retained_torque_wake_branch_certificate_provider_target:
      sameStepRetainedTorqueWakeBranchCertificateProviderTarget,
    consumer_status: consumerStatus(firstFailure, retainedBranch),
    authorization: {
      candidate_h_recovery: false,
      moving_retained_branch_certificate: false,
      bounded_speed_live_ledger: false,
      observer_export: false,
    },
    not_authorized: [
      "does not supply a non-fixture accepted_transition_source for field_speed_action_self_hit_scan/v0",
      "does not supply moving_retained_branch_certificate/v0",
      "does not certify a bounded-speed live ledger",
      "does not authorize observer export",
    ],
  };
}

function validateBridgeTarget(errors, pathLabel, target) {
  if (!isObject(target)) {
    errors.push(`${pathLabel} must be an object`);
    return;
  }
  if (target.schema !== RETAINED_ACTIVE_ROW_BRANCH_CERTIFICATE_BRIDGE_TARGET_SCHEMA) {
    errors.push(`${pathLabel} schema must be ${RETAINED_ACTIVE_ROW_BRANCH_CERTIFICATE_BRIDGE_TARGET_SCHEMA}`);
  }
  if (target.source_search_result?.accepted_source_found !== false) {
    errors.push(`${pathLabel} must remain fail-closed when no accepted source is found`);
  }
  if (!Array.isArray(target.missing_accepted_refs) || target.missing_accepted_refs.length !== 3) {
    errors.push(`${pathLabel} must identify exactly three missing accepted refs`);
  }
  for (const field of [
    "accepted_transition_source",
    "candidate_h_recovery",
    "moving_retained_branch_certificate",
    "retained_branch",
    "bounded_speed_live_ledger",
    "observer_export",
  ]) {
    if (target.authorization?.[field] !== false) {
      errors.push(`${pathLabel} ${field} authorization must remain false`);
    }
  }
}

function validateSameStepRetainedTorqueWakeProviderTarget(errors, target) {
  if (!isObject(target)) {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target must be an object");
    return;
  }
  if (target.schema !== SAME_STEP_RETAINED_TORQUE_WAKE_BRANCH_CERTIFICATE_PROVIDER_SCHEMA) {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target schema mismatch");
  }
  if (target.target_status !== "fail_closed_provider_target") {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target must fail closed");
  }
  if (target.promotion_status !== "priority-only") {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target promotion_status must remain priority-only");
  }
  if (target.provider_object_required !== true || target.accepted_non_fixture_provider_required !== true) {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target must require a non-fixture provider object");
  }
  if (target.required_same_step_selected_case_id !== "index-ratio:f2") {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target must target index-ratio:f2");
  }
  if (!sameOrderedStrings(target.required_same_step_fields ?? [], SAME_STEP_RETAINED_TORQUE_WAKE_PROVIDER_FIELDS)) {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target required fields mismatch");
  }
  if (!Array.isArray(target.field_results)) {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target field_results must be an array");
  }
  if (typeof target.provider_ready !== "boolean") {
    errors.push("same_step_retained_torque_wake_branch_certificate_provider_target provider_ready must be boolean");
  }
  for (const field of [
    "rank2_field_speed_action_self_hit_scan",
    "rank6_moving_retained_branch_certificate",
    "retained_branch",
    "candidate_h_recovery",
  ]) {
    if (target.downstream_authorization?.[field] !== false) {
      errors.push(`same_step_retained_torque_wake_branch_certificate_provider_target ${field} authorization must remain false`);
    }
  }
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
  if (!nonemptyString(report.diagnostic_id)) {
    errors.push("diagnostic_id must be a nonempty string");
  }
  if (!nonemptyString(report.first_failure)) {
    errors.push("first_failure must be a nonempty string");
  }
  if (report.retained_branch !== false) {
    errors.push("retained_branch must remain false");
  }
  if (typeof report.same_row_id_binding !== "boolean") {
    errors.push("same_row_id_binding must be boolean");
  }
  if (typeof report.same_record_source_binding !== "boolean") {
    errors.push("same_record_source_binding must be boolean");
  }
  if (!isObject(report.consumer_status)) {
    errors.push("consumer_status must be an object");
  }
  if (!isObject(report.retained_active_row_certificate_contract)) {
    errors.push("retained_active_row_certificate_contract must be an object");
  }
  if (
    report.retained_active_row_certificate_contract?.schema !==
    "same_retained_active_row_certificate_contract/v0"
  ) {
    errors.push("retained_active_row_certificate_contract schema mismatch");
  }
  if (report.retained_active_row_certificate_contract?.promotion_status !== "priority-only") {
    errors.push("retained_active_row_certificate_contract promotion_status must remain priority-only");
  }
  if (!nonemptyString(report.retained_active_row_certificate_contract?.first_failure)) {
    errors.push("retained_active_row_certificate_contract first_failure must be a nonempty string");
  }
  if (report.retained_active_row_certificate_contract?.retained_authorization !== false) {
    errors.push("retained_active_row_certificate_contract retained_authorization must remain false");
  }
  if (!isObject(report.branch_certificate_ref_source_availability_audit)) {
    errors.push("branch_certificate_ref_source_availability_audit must be an object");
  } else {
    if (
      report.branch_certificate_ref_source_availability_audit.schema !==
      BRANCH_CERTIFICATE_REF_SOURCE_AVAILABILITY_AUDIT_SCHEMA
    ) {
      errors.push("branch_certificate_ref_source_availability_audit schema mismatch");
    }
    if (report.branch_certificate_ref_source_availability_audit.promotion_status !== "priority-only") {
      errors.push("branch_certificate_ref_source_availability_audit promotion_status must remain priority-only");
    }
    if (!Array.isArray(report.branch_certificate_ref_source_availability_audit.field_results)) {
      errors.push("branch_certificate_ref_source_availability_audit field_results must be an array");
    }
    if (
      typeof report.branch_certificate_ref_source_availability_audit
        .retained_active_row_branch_certificate_ref_found !== "boolean"
    ) {
      errors.push(
        "branch_certificate_ref_source_availability_audit retained_active_row_branch_certificate_ref_found must be boolean"
      );
    }
    for (const field of [
      "accepted_transition_source",
      "candidate_h_recovery",
      "moving_retained_branch_certificate",
      "retained_branch",
      "bounded_speed_live_ledger",
      "observer_export",
    ]) {
      if (report.branch_certificate_ref_source_availability_audit.authorization?.[field] !== false) {
        errors.push(`branch_certificate_ref_source_availability_audit ${field} authorization must remain false`);
      }
    }
    validateBridgeTarget(
      errors,
      "branch_certificate_ref_source_availability_audit fail_closed_bridge_target",
      report.branch_certificate_ref_source_availability_audit.fail_closed_bridge_target
    );
  }
  if (!isObject(report.branch_certificate_provider_object_target)) {
    errors.push("branch_certificate_provider_object_target must be an object");
  } else {
    if (report.branch_certificate_provider_object_target.schema !== BRANCH_CERTIFICATE_PROVIDER_OBJECT_TARGET_SCHEMA) {
      errors.push("branch_certificate_provider_object_target schema mismatch");
    }
    if (report.branch_certificate_provider_object_target.promotion_status !== "priority-only") {
      errors.push("branch_certificate_provider_object_target promotion_status must remain priority-only");
    }
    if (!Array.isArray(report.branch_certificate_provider_object_target.field_results)) {
      errors.push("branch_certificate_provider_object_target field_results must be an array");
    }
    if (typeof report.branch_certificate_provider_object_target.provider_object_ready !== "boolean") {
      errors.push("branch_certificate_provider_object_target provider_object_ready must be boolean");
    }
    for (const field of [
      "accepted_transition_source",
      "candidate_h_recovery",
      "moving_retained_branch_certificate",
      "retained_branch",
      "bounded_speed_live_ledger",
      "observer_export",
    ]) {
      if (report.branch_certificate_provider_object_target.authorization?.[field] !== false) {
        errors.push(`branch_certificate_provider_object_target ${field} authorization must remain false`);
      }
    }
    validateBridgeTarget(
      errors,
      "branch_certificate_provider_object_target fail_closed_bridge_target",
      report.branch_certificate_provider_object_target.fail_closed_bridge_target
    );
  }
  validateBridgeTarget(
    errors,
    "retained_active_row_certificate_contract next_retained_active_row_evidence_object fail_closed_bridge_target",
    report.retained_active_row_certificate_contract?.next_retained_active_row_evidence_object
      ?.fail_closed_bridge_target
  );
  validateBridgeTarget(
    errors,
    "branch_certificate_ref_source_availability_audit next_retained_active_row_evidence_object fail_closed_bridge_target",
    report.branch_certificate_ref_source_availability_audit?.next_retained_active_row_evidence_object
      ?.fail_closed_bridge_target
  );
  validateBridgeTarget(
    errors,
    "branch_certificate_provider_object_target next_retained_active_row_evidence_object fail_closed_bridge_target",
    report.branch_certificate_provider_object_target?.next_retained_active_row_evidence_object
      ?.fail_closed_bridge_target
  );
  validateSameStepRetainedTorqueWakeProviderTarget(
    errors,
    report.same_step_retained_torque_wake_branch_certificate_provider_target
  );
  if (report.consumer_status?.rank2_field_speed_action_self_hit_scan?.candidate_h_recovery_authorized !== false) {
    errors.push("rank2 candidate_h_recovery_authorized must remain false");
  }
  if (
    report.consumer_status?.rank6_moving_retained_branch_certificate
      ?.moving_retained_branch_certificate_authorized !== false
  ) {
    errors.push("rank6 moving_retained_branch_certificate_authorized must remain false");
  }
  if (
    report.consumer_status?.rank5_bounded_speed_normal_reconstruction
      ?.bounded_speed_live_ledger_authorized !== false
  ) {
    errors.push("rank5 bounded_speed_live_ledger_authorized must remain false");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  for (const field of [
    "candidate_h_recovery",
    "moving_retained_branch_certificate",
    "bounded_speed_live_ledger",
    "observer_export",
  ]) {
    if (report.authorization?.[field] !== false) {
      errors.push(`${field} authorization must remain false`);
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
        diagnostic_id: report.diagnostic_id ?? null,
        diagnostic_verdict: report.diagnostic_verdict ?? null,
        first_failure: report.first_failure ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate is used.");
  }
  const candidate = readJson(args.input);
  writeOutput(buildReport(candidate, { sourceRef: args.input }), args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
