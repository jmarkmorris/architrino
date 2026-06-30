#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const REQUIRED_ROWS = [
  {
    path: "branch_certificate_ref",
    requirement:
      "One branch label, window, separator chart, active root ledger, positive gaps, memory depth, and active wave-vector gap, all bound through same_record_identity.",
    failureCode: "blocked_pending_accepted_branch_chart",
  },
  {
    path: "moving_continuation_ref",
    requirement: "Same branch, window, and active-root ledger with nonzero drift band and no branch transition.",
    failureCode: "structural.branch_split",
  },
  {
    path: "root_boundary_ref",
    requirement:
      "Same active-root record reports the gap, transversality, or signed root-index boundary for limiting speed.",
    failureCode: "structural.root_index_unreported",
  },
  {
    path: "deformation_generator_ref",
    requirement: "One generator produces both the envelope coefficient row and the clock-phase row.",
    failureCode: "structural.generator_split",
  },
  {
    path: "common_speed_record_ref",
    requirement:
      "Same homogeneous Noether sea and clock/ruler map extracts common material, photon, gravitational-wave, and calibrated speeds.",
    failureCode: "residual.speed_conflation",
  },
  {
    path: "signal_sector_refs",
    requirement:
      "Photon Gate A, gravitational-wave TT, two-way signal, and nondispersion rows replay on the same branch and dressing record.",
    failureCode: "tri_lorentz.photon_gate_split",
  },
  {
    path: "event_ledger_ref",
    requirement: "Same-window event ledger closes or names the first residual channel.",
    failureCode: "event.ledger_residual",
  },
];

const SOURCE_SCOUT_SCHEMA =
  "moving_retained_branch_certificate_accepted_branch_chart_source_scout/v0";
const SOURCE_SCOUT_MANIFEST_SCHEMA =
  "moving_retained_branch_certificate_accepted_branch_chart_source_scout_manifest/v0";
const NEAREST_BRANCH_CHART_SOURCE_READINESS_SCHEMA =
  "moving_retained_branch_certificate_nearest_branch_chart_source_readiness/v0";
const BRANCH_CHART_AND_MOVING_CERTIFICATE_REF_PATH_AUDIT_SCHEMA =
  "moving_retained_branch_certificate_branch_chart_and_moving_certificate_ref_path_audit/v0";
const SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA =
  "same_record_accepted_branch_chart_intake_for_q_index_ratio_f2/v0";
const SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_TARGET_Q_INDEX_RATIO_F2_SCHEMA =
  "same_record_accepted_branch_chart_producer_target_for_q_index_ratio_f2/v0";
const ACCEPTED_BRANCH_CHART_SOURCE_STATUS = "accepted_same_record_branch_chart";
const Q_INDEX_RATIO_F2_BRANCH_LABEL = "q:index-ratio:f2";
const Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID = "W:index-ratio:f2:sampled-active-row-window";
const Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH = "route-root-key:2856731379702547500";

const DISALLOWED_REFERENCE_PREFIXES = [
  "priority-only:",
  "fixture:",
  "proxy:",
  "candidate:",
  "synthetic:",
];

const DISALLOWED_REFERENCE_SUBSTRINGS = [
  "synthetic",
  ":fixture",
  "fixture-",
  "sampled-only",
  "sampled_only",
  "aggregate",
  "cross-row",
  "cross_row",
];

const REJECTED_BRANCH_CHART_EVIDENCE_SOURCES = [
  "proxy refs",
  "fixture refs",
  "candidate refs",
  "synthetic refs",
  "sampled-only rows",
  "aggregate rows",
  "cross-row bundles",
  "route-only rows",
  "H39/theta3minus quotient rows",
  "source-normal denominator machinery",
  "downstream candidate rows",
  "source scouts",
];

const SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_REQUIRED_FIELD_GROUPS = {
  branch_row_identity: [
    "branch_row_id",
    "branch_certificate_ref",
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
  ],
  accepted_branch_chart: [
    "source_status",
    "same_record_identity.accepted_branch_chart_ref",
    "same_record_identity.separator_chart_ref",
    "same_record_identity.positive_gap_record_ref",
    "same_record_identity.memory_depth_record_ref",
    "same_record_identity.active_wave_vector_gap_ref",
  ],
  retained_source_binding: [
    "retained_source_binding.retained_record_id",
    "retained_source_binding.source_record_id",
    "retained_source_binding.source_artifact_hash",
    "retained_source_binding.causal_root_replay_ref",
    "provider_object_provenance",
  ],
  same_record_binding: [
    "branch_row_id",
    "branch_certificate_ref",
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
    "same_record_identity.accepted_branch_chart_ref",
    "same_record_identity.separator_chart_ref",
    "same_record_identity.positive_gap_record_ref",
    "same_record_identity.memory_depth_record_ref",
    "same_record_identity.active_wave_vector_gap_ref",
    "retained_source_binding.retained_record_id",
    "retained_source_binding.source_artifact_hash",
  ],
};

const SAME_RECORD_IDENTITY_ROWS = [
  {
    path: "same_record_identity.branch_label",
    requirement: "Moving branch label q consumed by every structural-integrity row.",
    missingCode: "same_record_identity_branch_label_missing",
    proxyCode: "same_record_identity_branch_label_proxy_not_accepted",
  },
  {
    path: "same_record_identity.extraction_window_id",
    requirement: "Extraction window W shared by branch, signal, common-speed, and event-ledger rows.",
    missingCode: "same_record_identity_extraction_window_id_missing",
    proxyCode: "same_record_identity_extraction_window_id_proxy_not_accepted",
  },
  {
    path: "same_record_identity.active_root_ledger_hash",
    requirement: "Accepted active-root ledger identity for the retained moving branch.",
    missingCode: "same_record_identity_active_root_ledger_hash_missing",
    proxyCode: "same_record_identity_active_root_ledger_hash_proxy_not_accepted",
  },
  {
    path: "same_record_identity.accepted_branch_chart_ref",
    requirement: "Accepted branch-chart record, not a fixture-only or proxy branch reference.",
    missingCode: "same_record_identity_accepted_branch_chart_ref_missing",
    proxyCode: "same_record_identity_accepted_branch_chart_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.separator_chart_ref",
    requirement: "Separator chart used by the accepted branch chart.",
    missingCode: "same_record_identity_separator_chart_ref_missing",
    proxyCode: "same_record_identity_separator_chart_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.positive_gap_record_ref",
    requirement: "Positive stability or gap record for the same retained branch.",
    missingCode: "same_record_identity_positive_gap_record_ref_missing",
    proxyCode: "same_record_identity_positive_gap_record_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.memory_depth_record_ref",
    requirement: "Memory-depth bound h_mem for the same retained branch.",
    missingCode: "same_record_identity_memory_depth_record_ref_missing",
    proxyCode: "same_record_identity_memory_depth_record_ref_proxy_not_accepted",
  },
  {
    path: "same_record_identity.active_wave_vector_gap_ref",
    requirement: "Active wave-vector gap Delta_k for the same retained branch.",
    missingCode: "same_record_identity_active_wave_vector_gap_ref_missing",
    proxyCode: "same_record_identity_active_wave_vector_gap_ref_proxy_not_accepted",
  },
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    sourceScout: null,
    validateSourceScout: null,
    pretty: false,
    printContract: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--source-scout") {
      args.sourceScout = argv[++i];
    } else if (arg === "--validate-source-scout") {
      args.validateSourceScout = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-braid/moving-retained-branch-certificate-report.mjs [options]

Options:
  --input PATH       Candidate moving retained branch certificate JSON.
  --validate PATH    Validate an emitted moving retained branch certificate report.
  --source-scout PATH
                     Evaluate current accepted-branch-chart source candidates.
  --validate-source-scout PATH
                     Validate an emitted accepted-branch-chart source scout.
  --print-contract   Print the required moving retained branch certificate rows.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side checker. It can populate the structural
integrity residual vector only after the same-record moving branch certificate
is present; it does not accept rest-only or independently fitted speed rows.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
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

function proxyValue(value) {
  return typeof value === "string" && value.trim().startsWith("proxy:");
}

function normalizedString(value) {
  return present(value) ? String(value).trim() : null;
}

function referenceRejectionPolicy() {
  return {
    schema: "accepted_reference_rejection_policy/v0",
    disallowed_prefixes: DISALLOWED_REFERENCE_PREFIXES,
    disallowed_substrings: DISALLOWED_REFERENCE_SUBSTRINGS,
    applies_to_fields: [
      "branch_certificate_ref",
      "same_record_identity.accepted_branch_chart_ref",
      "moving_retained_branch_certificate_ref",
    ],
    rule:
      "A nonempty reference is not accepted evidence if it is priority-only, fixture, proxy, candidate, synthetic, sampled-only, aggregate, or cross-row.",
  };
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
  if (normalized.includes("sampled-only") || normalized.includes("sampled_only")) {
    return `${field.replaceAll(".", "_")}_sampled_only_not_accepted`;
  }
  if (normalized.includes("aggregate")) {
    return `${field.replaceAll(".", "_")}_aggregate_not_accepted`;
  }
  if (normalized.includes("cross-row") || normalized.includes("cross_row")) {
    return `${field.replaceAll(".", "_")}_cross_row_not_accepted`;
  }
  return null;
}

function rejectionCodeForPath(rowPath, kind) {
  const suffix = kind === "proxy" ? "proxy_not_accepted" : "missing";
  return `${rowPath.replaceAll(".", "_")}_${suffix}`;
}

function sourceStatusRejectionCode(sourceStatus) {
  if (sourceStatus === ACCEPTED_BRANCH_CHART_SOURCE_STATUS) {
    return null;
  }
  if (!present(sourceStatus)) {
    return "accepted_same_record_branch_chart_source_status_missing";
  }
  return `${String(sourceStatus).replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "")}_not_accepted_branch_chart_source`;
}

function contract() {
  return {
    schema: "moving_retained_branch_certificate_contract/v0",
    purpose:
      "Minimum same-record moving branch object before structural-integrity common-limit rows may be populated.",
    minimum_same_record_identity_fields: SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement, missingCode, proxyCode }) => ({
      path: rowPath,
      requirement,
      failure_code: "blocked_pending_accepted_branch_chart",
      missing_field_code: missingCode,
      proxy_field_code: proxyCode,
    })),
    required_rows: REQUIRED_ROWS.map(({ path: rowPath, requirement, failureCode }) => ({
      path: rowPath,
      requirement,
      failure_code: failureCode,
    })),
    required_certificate_status: "accepted_same_branch",
    authorization_boundary: {
      populates_structural_integrity_residual_vector_requires_all_rows: true,
      photon_gate_a_accepted_by_this_contract: false,
      observer_export_authorized_by_this_contract: false,
    },
  };
}

function sourceScoutContract() {
  return {
    schema: `${SOURCE_SCOUT_SCHEMA}_contract`,
    purpose:
      "Enumerate current rank-6 branch-chart source candidates before accepting moving_retained_branch_certificate/v0.",
    accepted_source_status: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    required_candidate_fields: [
      {
        path: "branch_certificate_ref",
        requirement: "Non-proxy retained branch certificate reference on the candidate source.",
      },
      ...SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement }) => ({
        path: rowPath,
        requirement,
      })),
    ],
    authorization_boundary: {
      source_scout_accepts_moving_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function sameRecordAcceptedBranchChartIntakeContract() {
  return {
    schema: `${SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA}_contract`,
    purpose:
      "Name the first executable same-record accepted branch-chart intake target for q:index-ratio:f2 before moving_retained_branch_certificate/v0 may be consumed.",
    required_branch_window: {
      branch_label: Q_INDEX_RATIO_F2_BRANCH_LABEL,
      extraction_window_id: Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID,
      active_root_ledger_hash: Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH,
    },
    accepted_source_status: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    required_same_record_fields: sourceScoutContract().required_candidate_fields,
    rejected_reference_policy: referenceRejectionPolicy(),
    authorization_boundary: {
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function evaluateSameRecordIdentity(candidate) {
  const rows = SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement, missingCode, proxyCode }) => {
    const value = getPath(candidate, rowPath);
    const fieldPresent = present(value);
    const proxy = proxyValue(value);
    const pass = fieldPresent && !proxy;
    return {
      path: rowPath,
      requirement,
      present: fieldPresent,
      proxy,
      pass,
      failure_code: pass ? null : proxy ? proxyCode : missingCode,
    };
  });
  const failedRows = rows.filter((row) => !row.pass);
  return {
    pass: failedRows.length === 0,
    rows,
    missing_or_rejected_fields: failedRows.map((row) => row.path),
    missing_or_rejected_field_codes: failedRows.map((row) => row.failure_code),
  };
}

function evaluateSourceScoutField(candidate, rowPath, requirement) {
  const value = rowPath.startsWith("same_record_identity.")
    ? getPath(candidate, rowPath) ?? getPath(candidate, rowPath.replace("same_record_identity.", ""))
    : getPath(candidate, rowPath);
  const fieldPresent = present(value);
  const proxy = proxyValue(value);
  const pass = fieldPresent && !proxy;
  return {
    path: rowPath,
    requirement,
    value: value ?? null,
    present: fieldPresent,
    proxy,
    pass,
    failure_code: pass ? null : rejectionCodeForPath(rowPath, proxy ? "proxy" : "missing"),
  };
}

function evaluateRow(candidate, row) {
  const value = getPath(candidate, row.path);
  if (row.path === "branch_certificate_ref") {
    const sameRecordIdentity = evaluateSameRecordIdentity(candidate);
    const branchReferencePresent = present(value);
    const branchReferenceProxy = proxyValue(value);
    const pass = branchReferencePresent && !branchReferenceProxy && sameRecordIdentity.pass;
    return {
      path: row.path,
      requirement: row.requirement,
      present: branchReferencePresent,
      pass,
      failure_code: pass ? null : row.failureCode,
      accepted_branch_chart_intake: {
        schema: "moving_retained_branch_certificate_accepted_branch_chart_intake/v0",
        claim_boundary:
          "Rejects proxy branch references before structural-integrity residual population; it does not authorize Photon Gate A, Lorentz rows, or observer export.",
        branch_certificate_ref_present: branchReferencePresent,
        branch_certificate_ref_proxy: branchReferenceProxy,
        minimum_same_record_identity_fields: sameRecordIdentity.rows,
        missing_or_rejected_fields: sameRecordIdentity.missing_or_rejected_fields,
        missing_or_rejected_field_codes: sameRecordIdentity.missing_or_rejected_field_codes,
        rejects_proxy_branch_certificate_refs: true,
        first_missing_or_rejected_field_code:
          (branchReferenceProxy ? "branch_certificate_ref_proxy_not_accepted" : null) ??
          sameRecordIdentity.missing_or_rejected_field_codes[0] ??
          null,
        first_failure: pass ? null : row.failureCode,
      },
    };
  }
  return {
    path: row.path,
    requirement: row.requirement,
    present: present(value),
    pass: present(value),
    failure_code: present(value) ? null : row.failureCode,
  };
}

function evaluateSourceScoutCandidate(candidate) {
  const fieldRows = [
    {
      path: "branch_certificate_ref",
      requirement: "Non-proxy retained branch certificate reference on the candidate source.",
    },
    ...SAME_RECORD_IDENTITY_ROWS.map(({ path: rowPath, requirement }) => ({
      path: rowPath,
      requirement,
    })),
  ].map((row) => evaluateSourceScoutField(candidate, row.path, row.requirement));
  const failedFields = fieldRows.filter((row) => !row.pass);
  const sourceStatusAccepted = candidate.source_status === ACCEPTED_BRANCH_CHART_SOURCE_STATUS;
  const sourceStatusCode = sourceStatusRejectionCode(candidate.source_status);
  const firstRejectionCode =
    failedFields[0]?.failure_code ?? sourceStatusCode ?? null;
  const accepted = failedFields.length === 0 && sourceStatusAccepted;

  return {
    id: candidate.id ?? null,
    family: candidate.family ?? null,
    source_ref: candidate.source_ref ?? null,
    source_status: candidate.source_status ?? null,
    source_status_accepted: sourceStatusAccepted,
    source_status_rejection_code: sourceStatusCode,
    accepted,
    first_rejection_code: accepted ? null : firstRejectionCode,
    branch_certificate_ref: candidate.branch_certificate_ref ?? null,
    accepted_branch_chart_ref:
      getPath(candidate, "same_record_identity.accepted_branch_chart_ref") ??
      candidate.accepted_branch_chart_ref ??
      null,
    moving_retained_branch_certificate_ref: candidate.moving_retained_branch_certificate_ref ?? null,
    same_record_identity: isObject(candidate.same_record_identity) ? candidate.same_record_identity : {},
    missing_or_rejected_fields: failedFields.map((row) => row.path),
    missing_or_rejected_field_codes: failedFields.map((row) => row.failure_code),
    field_results: fieldRows,
    producer_target: isObject(candidate.producer_target) ? candidate.producer_target : null,
    evidence_note: candidate.evidence_note ?? null,
  };
}

function rankSourceScoutCandidate(candidate) {
  const requiredFieldPassCount = candidate.field_results.filter((row) => row.pass).length;
  const branchReference = candidate.field_results.find((row) => row.path === "branch_certificate_ref");
  const acceptedChartRef = candidate.field_results.find(
    (row) => row.path === "same_record_identity.accepted_branch_chart_ref",
  );
  return {
    candidate,
    requiredFieldPassCount,
    branchReferencePass: branchReference?.pass === true ? 1 : 0,
    acceptedChartRefPresent: acceptedChartRef?.present === true ? 1 : 0,
    sourceStatusAccepted: candidate.source_status_accepted ? 1 : 0,
  };
}

function selectNearestSourceScoutCandidate(candidateResults) {
  const rankedCandidates = candidateResults
    .filter((candidate) => !candidate.accepted)
    .map(rankSourceScoutCandidate)
    .sort((left, right) => {
      if (right.requiredFieldPassCount !== left.requiredFieldPassCount) {
        return right.requiredFieldPassCount - left.requiredFieldPassCount;
      }
      if (right.branchReferencePass !== left.branchReferencePass) {
        return right.branchReferencePass - left.branchReferencePass;
      }
      if (right.acceptedChartRefPresent !== left.acceptedChartRefPresent) {
        return right.acceptedChartRefPresent - left.acceptedChartRefPresent;
      }
      if (right.sourceStatusAccepted !== left.sourceStatusAccepted) {
        return right.sourceStatusAccepted - left.sourceStatusAccepted;
      }
      return String(left.candidate.id ?? "").localeCompare(String(right.candidate.id ?? ""));
    });
  return rankedCandidates[0]?.candidate ?? null;
}

function qIndexRatioF2WindowMatches(candidate) {
  const identity = candidate?.same_record_identity ?? {};
  return (
    identity.branch_label === Q_INDEX_RATIO_F2_BRANCH_LABEL &&
    identity.extraction_window_id === Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID &&
    identity.active_root_ledger_hash === Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH
  );
}

function selectQIndexRatioF2BranchWindowCandidate(candidateResults) {
  const matchingCandidates = candidateResults.filter(qIndexRatioF2WindowMatches);
  const acceptedMatch = matchingCandidates.find((candidate) => candidate.accepted);
  if (acceptedMatch) {
    return acceptedMatch;
  }

  return matchingCandidates
    .map(rankSourceScoutCandidate)
    .sort((left, right) => {
      if (right.requiredFieldPassCount !== left.requiredFieldPassCount) {
        return right.requiredFieldPassCount - left.requiredFieldPassCount;
      }
      if (right.branchReferencePass !== left.branchReferencePass) {
        return right.branchReferencePass - left.branchReferencePass;
      }
      if (right.acceptedChartRefPresent !== left.acceptedChartRefPresent) {
        return right.acceptedChartRefPresent - left.acceptedChartRefPresent;
      }
      if (right.sourceStatusAccepted !== left.sourceStatusAccepted) {
        return right.sourceStatusAccepted - left.sourceStatusAccepted;
      }
      return String(left.candidate.id ?? "").localeCompare(String(right.candidate.id ?? ""));
    })[0]?.candidate ?? null;
}

function buildQIndexRatioF2SourceTarget(selected, missingOrRejectedFields, firstFailure, accepted) {
  const fieldReadouts = selected?.field_results ?? sourceScoutContract().required_candidate_fields.map(
    ({ path: rowPath, requirement }) => ({
      path: rowPath,
      requirement,
      value: null,
      present: false,
      proxy: false,
      pass: false,
      failure_code: rejectionCodeForPath(rowPath, "missing"),
    })
  );
  const rejectedFieldReadouts = fieldReadouts.filter((field) => field.pass !== true);

  return {
    schema: SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA,
    target_status: accepted ? "accepted_same_record_branch_chart_available" : "source_target_blocked",
    accepted_same_record_branch_chart: accepted,
    selected_candidate_id: selected?.id ?? null,
    selected_candidate_source_ref: selected?.source_ref ?? null,
    selected_source_status: selected?.source_status ?? null,
    selected_source_status_accepted: selected?.source_status_accepted ?? false,
    required_source_status: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    same_record_binding_required: {
      branch_label: Q_INDEX_RATIO_F2_BRANCH_LABEL,
      extraction_window_id: Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID,
      active_root_ledger_hash: Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH,
      required_fields_must_live_on_one_branch_row: true,
      cross_row_join_authorized: false,
    },
    required_same_record_fields: sourceScoutContract().required_candidate_fields.map((field) => field.path),
    rejected_branch_chart_evidence_sources: REJECTED_BRANCH_CHART_EVIDENCE_SOURCES,
    reference_rejection_policy: referenceRejectionPolicy(),
    field_readouts: fieldReadouts,
    missing_or_rejected_fields: missingOrRejectedFields,
    missing_or_rejected_field_codes: rejectedFieldReadouts.map((field) => field.failure_code),
    first_missing_or_rejected_field: missingOrRejectedFields[0] ?? null,
    first_missing_or_rejected_field_code: firstFailure,
    exact_blocking_refs: {
      branch_certificate_ref: selected?.branch_certificate_ref ?? null,
      same_record_identity_accepted_branch_chart_ref: selected?.accepted_branch_chart_ref ?? null,
      moving_retained_branch_certificate_ref: selected?.moving_retained_branch_certificate_ref ?? null,
    },
    authorization: {
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function buildQIndexRatioF2ProducerTarget(selected, missingOrRejectedFields, firstFailure, accepted) {
  const requiredProducerFields = [
    ...SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_REQUIRED_FIELD_GROUPS.branch_row_identity,
    ...SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_REQUIRED_FIELD_GROUPS.accepted_branch_chart,
    ...SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_REQUIRED_FIELD_GROUPS.retained_source_binding,
  ];

  return {
    schema: SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_TARGET_Q_INDEX_RATIO_F2_SCHEMA,
    target_status: accepted ? "accepted_same_record_branch_chart_available" : "producer_target_blocked",
    required_source_object: "accepted_same_record_branch_chart",
    required_source_status: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    selected_candidate_id: selected?.id ?? null,
    selected_candidate_source_ref: selected?.source_ref ?? null,
    selected_source_status: selected?.source_status ?? null,
    first_missing_or_rejected_field: missingOrRejectedFields[0] ?? null,
    first_missing_or_rejected_field_code: firstFailure,
    same_record_binding_required: {
      branch_label: Q_INDEX_RATIO_F2_BRANCH_LABEL,
      extraction_window_id: Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID,
      active_root_ledger_hash: Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH,
      required_fields_must_live_on_one_branch_row: true,
      retained_source_binding_must_match_branch_row: true,
      cross_row_join_authorized: false,
    },
    required_producer_field_groups: SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_REQUIRED_FIELD_GROUPS,
    required_producer_fields: requiredProducerFields,
    downstream_consumers_blocked_until_producer_exists: [
      "moving_retained_branch_certificate/v0",
      "structural-integrity residual rows",
      "Photon Gate A",
      "Lorentz rows",
      "observer export rows",
    ],
    rejected_branch_chart_evidence_sources: REJECTED_BRANCH_CHART_EVIDENCE_SOURCES,
    exact_blocking_refs: {
      branch_certificate_ref: selected?.branch_certificate_ref ?? null,
      same_record_identity_accepted_branch_chart_ref: selected?.accepted_branch_chart_ref ?? null,
      moving_retained_branch_certificate_ref: selected?.moving_retained_branch_certificate_ref ?? null,
      retained_source_binding_ref: selected?.retained_source_binding_ref ?? null,
      provider_object_provenance_ref: selected?.provider_object_provenance_ref ?? null,
    },
    authorization: {
      accepted_same_record_branch_chart: accepted,
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function buildSameRecordAcceptedBranchChartIntakeForQIndexRatioF2(candidateResults) {
  const selected = selectQIndexRatioF2BranchWindowCandidate(candidateResults);
  const accepted = selected?.accepted === true;
  const presentNonProxyFields =
    selected?.field_results.filter((row) => row.pass).map((row) => row.path) ?? [];
  const missingOrRejectedFields = selected?.missing_or_rejected_fields ?? [
    "branch_certificate_ref",
    "same_record_identity.branch_label",
    "same_record_identity.extraction_window_id",
    "same_record_identity.active_root_ledger_hash",
    "same_record_identity.accepted_branch_chart_ref",
    "same_record_identity.separator_chart_ref",
    "same_record_identity.positive_gap_record_ref",
    "same_record_identity.memory_depth_record_ref",
    "same_record_identity.active_wave_vector_gap_ref",
  ];
  const missingOrRejectedFieldCodes = selected?.missing_or_rejected_field_codes ?? [
    "q_index_ratio_f2_branch_window_candidate_missing",
  ];
  const firstFailure =
    accepted
      ? null
      : missingOrRejectedFieldCodes[0] ??
        selected?.source_status_rejection_code ??
        "accepted_same_record_branch_chart_absent";

  return {
    schema: SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA,
    claim_boundary:
      "Executable source-target only: it preserves the q:index-ratio:f2 same-record branch-window intake and does not accept moving_retained_branch_certificate/v0 without non-proxy accepted branch-chart evidence.",
    contract: sameRecordAcceptedBranchChartIntakeContract(),
    selected_candidate_id: selected?.id ?? null,
    selected_candidate_family: selected?.family ?? null,
    selected_candidate_source_ref: selected?.source_ref ?? null,
    selected_source_status: selected?.source_status ?? null,
    selected_source_status_accepted: selected?.source_status_accepted ?? false,
    selected_source_status_rejection_code: selected?.source_status_rejection_code ?? null,
    same_record_binding: {
      branch_label: Q_INDEX_RATIO_F2_BRANCH_LABEL,
      extraction_window_id: Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID,
      active_root_ledger_hash: Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH,
    },
    candidate_same_record_identity: selected?.same_record_identity ?? null,
    present_non_proxy_required_field_count: presentNonProxyFields.length,
    present_non_proxy_required_fields: presentNonProxyFields,
    missing_or_rejected_fields: missingOrRejectedFields,
    missing_or_rejected_field_codes: missingOrRejectedFieldCodes,
    first_failure: firstFailure,
    accepted_same_record_branch_chart: accepted,
    accepted_branch_chart_source_target: buildQIndexRatioF2SourceTarget(
      selected,
      missingOrRejectedFields,
      firstFailure,
      accepted,
    ),
    accepted_same_record_branch_chart_producer_target: buildQIndexRatioF2ProducerTarget(
      selected,
      missingOrRejectedFields,
      firstFailure,
      accepted,
    ),
    exact_blocking_refs: {
      branch_certificate_ref: selected?.branch_certificate_ref ?? null,
      same_record_identity_accepted_branch_chart_ref: selected?.accepted_branch_chart_ref ?? null,
      moving_retained_branch_certificate_ref: selected?.moving_retained_branch_certificate_ref ?? null,
    },
    selected_candidate_producer_target: selected?.producer_target ?? null,
    required_next_object: {
      object: "accepted_same_record_branch_chart",
      branch_label: Q_INDEX_RATIO_F2_BRANCH_LABEL,
      extraction_window_id: Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID,
      active_root_ledger_hash: Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH,
      first_required_field: missingOrRejectedFields[0] ?? null,
      first_required_field_code: firstFailure,
      must_replace_proxy_fixture_candidate_synthetic_refs: true,
      must_upgrade_source_status_to: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
      required_same_record_fields: sourceScoutContract().required_candidate_fields.map((field) => field.path),
    },
    authorization: {
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function buildNearestBranchChartSourceReadiness(candidateResults) {
  const nearest = selectNearestSourceScoutCandidate(candidateResults);
  const requiredFieldCount = sourceScoutContract().required_candidate_fields.length;
  const passedFields = nearest?.field_results.filter((row) => row.pass).map((row) => row.path) ?? [];

  return {
    schema: NEAREST_BRANCH_CHART_SOURCE_READINESS_SCHEMA,
    claim_boundary:
      "Readiness readout only: it selects the closest current branch-chart source candidate and does not accept moving_retained_branch_certificate/v0.",
    selected_candidate_id: nearest?.id ?? null,
    selected_candidate_family: nearest?.family ?? null,
    selected_candidate_source_ref: nearest?.source_ref ?? null,
    selection_basis:
      "highest non-proxy required-field pass count, then non-proxy branch reference, then present accepted-branch-chart reference, then accepted source status",
    required_field_count: requiredFieldCount,
    present_non_proxy_required_field_count: passedFields.length,
    present_non_proxy_required_fields: passedFields,
    missing_or_rejected_fields: nearest?.missing_or_rejected_fields ?? [],
    missing_or_rejected_field_codes: nearest?.missing_or_rejected_field_codes ?? [],
    first_missing_or_rejected_field: nearest?.missing_or_rejected_fields?.[0] ?? null,
    first_missing_or_rejected_field_code: nearest?.missing_or_rejected_field_codes?.[0] ?? null,
    source_status: nearest?.source_status ?? null,
    source_status_accepted: nearest?.source_status_accepted ?? false,
    source_status_rejection_code: nearest?.source_status_rejection_code ?? null,
    accepted_same_record_branch_chart_available: false,
    required_next_object: {
      object: "same-record accepted branch chart source for the selected moving branch window",
      first_required_field: nearest?.missing_or_rejected_fields?.[0] ?? null,
      first_required_field_code: nearest?.missing_or_rejected_field_codes?.[0] ?? null,
      must_replace_proxy_values: true,
      must_upgrade_source_status_to: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    },
    authorization: {
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

function buildBranchChartAndMovingCertificateRefPathAudit(candidateResults) {
  const nearest = selectNearestSourceScoutCandidate(candidateResults);
  const sameRecordIdentity = nearest?.same_record_identity ?? {};
  const branchLabel = sameRecordIdentity.branch_label ?? null;
  const extractionWindowId = sameRecordIdentity.extraction_window_id ?? null;
  const activeRootLedgerHash = sameRecordIdentity.active_root_ledger_hash ?? null;
  const requiredRefs = [
    {
      field: "same_record_identity.accepted_branch_chart_ref",
      required_ref_target:
        "accepted_same_record_branch_chart for the selected branch label, extraction window, and active-root ledger",
      current_ref: nearest?.accepted_branch_chart_ref ?? null,
      first_failure_code: rejectedRefCode(
        "same_record_identity.accepted_branch_chart_ref",
        nearest?.accepted_branch_chart_ref
      ),
    },
    {
      field: "moving_retained_branch_certificate_ref",
      required_ref_target:
        "moving_retained_branch_certificate/v0 consuming the same branch_certificate_ref and accepted branch chart",
      current_ref: nearest?.moving_retained_branch_certificate_ref ?? null,
      first_failure_code: rejectedRefCode(
        "moving_retained_branch_certificate_ref",
        nearest?.moving_retained_branch_certificate_ref
      ),
    },
    {
      field: "branch_certificate_ref",
      required_ref_target:
        "non-fixture retained branch certificate for the selected moving branch window",
      current_ref: nearest?.branch_certificate_ref ?? null,
      first_failure_code: rejectedRefCode("branch_certificate_ref", nearest?.branch_certificate_ref),
    },
  ];
  const missingOrRejectedRefs = requiredRefs.filter((ref) => ref.first_failure_code !== null);

  return {
    schema: BRANCH_CHART_AND_MOVING_CERTIFICATE_REF_PATH_AUDIT_SCHEMA,
    claim_boundary:
      "Fail-closed ref-path audit only: it preserves the nearest accepted-branch-chart and moving-certificate blockers and does not accept moving_retained_branch_certificate/v0.",
    selected_candidate_id: nearest?.id ?? null,
    selected_candidate_family: nearest?.family ?? null,
    selected_candidate_source_ref: nearest?.source_ref ?? null,
    selected_same_record_identity: {
      branch_label: branchLabel,
      extraction_window_id: extractionWindowId,
      active_root_ledger_hash: activeRootLedgerHash,
    },
    source_status: nearest?.source_status ?? null,
    source_status_rejection_code: nearest?.source_status_rejection_code ?? null,
    source_refs_checked: candidateResults.map((candidate) => candidate.source_ref).filter(Boolean),
    reference_rejection_policy: referenceRejectionPolicy(),
    required_ref_path: requiredRefs,
    missing_or_rejected_ref_fields: missingOrRejectedRefs.map((ref) => ref.field),
    missing_or_rejected_ref_codes: missingOrRejectedRefs.map((ref) => ref.first_failure_code),
    first_failure: missingOrRejectedRefs[0]?.first_failure_code ?? "accepted_same_record_branch_chart_absent",
    exact_blocking_refs: {
      branch_certificate_ref: nearest?.branch_certificate_ref ?? null,
      same_record_identity_accepted_branch_chart_ref: nearest?.accepted_branch_chart_ref ?? null,
      moving_retained_branch_certificate_ref: nearest?.moving_retained_branch_certificate_ref ?? null,
    },
    required_next_object: {
      object:
        "same-record accepted branch chart plus moving_retained_branch_certificate/v0 ref on one retained moving branch window",
      branch_label: branchLabel,
      extraction_window_id: extractionWindowId,
      active_root_ledger_hash: activeRootLedgerHash,
      must_replace_proxy_fixture_candidate_synthetic_refs: true,
      must_upgrade_source_status_to: ACCEPTED_BRANCH_CHART_SOURCE_STATUS,
    },
    accepted_ref_path_available: false,
    authorization: {
      accepted_branch_chart_source_ready: false,
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
  };
}

export function buildReport(candidate, options = {}) {
  if (!isObject(candidate)) {
    throw new Error("Candidate moving retained branch certificate must be a JSON object.");
  }

  const rowResults = REQUIRED_ROWS.map((row) => evaluateRow(candidate, row));
  const failedRows = rowResults.filter((row) => !row.pass);
  const rowsComplete = failedRows.length === 0;
  const statusAccepted = candidate.certificate_status === "accepted_same_branch";
  const accepted = rowsComplete && statusAccepted;
  const firstFailure = failedRows[0]?.failure_code ?? (statusAccepted ? null : "blocked_pending_accepted_branch_chart");
  const acceptedBranchChartIntake =
    rowResults.find((row) => row.path === "branch_certificate_ref")?.accepted_branch_chart_intake ?? null;

  return {
    schema: "moving_retained_branch_certificate_report/v0",
    source_ref: options.sourceRef ?? candidate.source_ref ?? null,
    certificate_id: candidate.certificate_id ?? candidate.id ?? "moving-retained-branch-candidate",
    promotion_status: candidate.promotion_status ?? "priority-only",
    certificate_verdict: accepted ? "accepted_same_branch" : firstFailure,
    first_failure: accepted ? null : firstFailure,
    row_results: rowResults,
    accepted_branch_chart_intake: {
      ...acceptedBranchChartIntake,
      accepted_branch_chart: acceptedBranchChartIntake?.first_failure === null && statusAccepted,
      certificate_status: candidate.certificate_status ?? null,
    },
    missing_or_rejected_rows: failedRows.map((row) => row.path),
    certificate_status: candidate.certificate_status ?? null,
    authorization: {
      populates_structural_integrity_residual_vector: accepted,
      photon_gate_a_accepted: false,
      observer_export: false,
    },
  };
}

export function buildAcceptedBranchChartSourceScout(manifest, options = {}) {
  if (!isObject(manifest)) {
    throw new Error("Accepted branch chart source scout manifest must be a JSON object.");
  }
  if (!Array.isArray(manifest.candidates)) {
    throw new Error("Accepted branch chart source scout manifest must include candidates array.");
  }

  const candidateResults = manifest.candidates.map(evaluateSourceScoutCandidate);
  const acceptedCandidates = candidateResults.filter((candidate) => candidate.accepted);
  const nearestCandidateReadiness = buildNearestBranchChartSourceReadiness(candidateResults);
  const branchChartAndMovingCertificateRefPathAudit =
    buildBranchChartAndMovingCertificateRefPathAudit(candidateResults);
  const sameRecordAcceptedBranchChartIntakeForQIndexRatioF2 =
    buildSameRecordAcceptedBranchChartIntakeForQIndexRatioF2(candidateResults);

  return {
    schema: SOURCE_SCOUT_SCHEMA,
    manifest_schema: manifest.schema ?? null,
    scout_id: manifest.scout_id ?? "moving-retained-branch-accepted-branch-chart-source-scout",
    source_ref: options.sourceRef ?? manifest.source_ref ?? null,
    promotion_status: "priority-only",
    contract: sourceScoutContract(),
    candidate_count: candidateResults.length,
    accepted_count: acceptedCandidates.length,
    accepted_candidate_ids: acceptedCandidates.map((candidate) => candidate.id).filter(Boolean),
    first_failure:
      acceptedCandidates.length > 0
        ? null
        : "accepted_same_record_branch_chart_absent",
    first_rejection_code:
      acceptedCandidates.length > 0
        ? null
        : candidateResults.find((candidate) => candidate.first_rejection_code)?.first_rejection_code ??
          "accepted_same_record_branch_chart_candidate_absent",
    candidate_results: candidateResults,
    nearest_candidate_readiness: nearestCandidateReadiness,
    branch_chart_and_moving_certificate_ref_path_audit: branchChartAndMovingCertificateRefPathAudit,
    same_record_accepted_branch_chart_intake_for_q_index_ratio_f2:
      sameRecordAcceptedBranchChartIntakeForQIndexRatioF2,
    required_next_object: {
      object:
        "accepted_same_record_branch_chart on one moving branch window",
      required_fields: sourceScoutContract().required_candidate_fields.map((field) => field.path),
      must_be_non_fixture: true,
      must_bind_same_record_identity: true,
    },
    authorization: {
      accepted_branch_chart_source_ready: acceptedCandidates.length > 0,
      moving_retained_branch_certificate: false,
      structural_integrity_residual_vector: false,
      photon_gate_a: false,
      lorentz_rows: false,
      observer_export: false,
    },
    not_authorized: [
      "does not populate moving_retained_branch_certificate/v0",
      "does not populate structural-integrity residual rows",
      "does not accept Photon Gate A",
      "does not authorize Lorentz, gravitational-wave, or observer export rows",
    ],
  };
}

export function validationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== "moving_retained_branch_certificate_report/v0") {
    errors.push("schema must be moving_retained_branch_certificate_report/v0");
  }
  if (typeof report.certificate_id !== "string" || report.certificate_id.trim() === "") {
    errors.push("certificate_id must be a nonempty string");
  }
  if (typeof report.certificate_verdict !== "string") {
    errors.push("certificate_verdict must be a string");
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (report.certificate_verdict === "accepted_same_branch" && report.first_failure !== null) {
    errors.push("accepted reports must not carry first_failure");
  }
  if (report.certificate_verdict !== "accepted_same_branch" && typeof report.first_failure !== "string") {
    errors.push("blocked reports must carry first_failure");
  }
  if (!Array.isArray(report.row_results)) {
    errors.push("row_results must be an array");
  }
  if (!isObject(report.accepted_branch_chart_intake)) {
    errors.push("accepted_branch_chart_intake must be an object");
  }
  if (report.accepted_branch_chart_intake?.schema !== "moving_retained_branch_certificate_accepted_branch_chart_intake/v0") {
    errors.push("accepted_branch_chart_intake schema must be moving_retained_branch_certificate_accepted_branch_chart_intake/v0");
  }
  if (report.accepted_branch_chart_intake?.rejects_proxy_branch_certificate_refs !== true) {
    errors.push("accepted_branch_chart_intake must reject proxy branch certificate refs");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (report.authorization?.photon_gate_a_accepted !== false) {
    errors.push("photon_gate_a_accepted must remain false");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("observer_export must remain false");
  }
  return errors;
}

export function sourceScoutValidationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["source scout report must be an object"];
  }
  if (report.schema !== SOURCE_SCOUT_SCHEMA) {
    errors.push(`schema must be ${SOURCE_SCOUT_SCHEMA}`);
  }
  if (report.manifest_schema !== SOURCE_SCOUT_MANIFEST_SCHEMA) {
    errors.push(`manifest_schema must be ${SOURCE_SCOUT_MANIFEST_SCHEMA}`);
  }
  if (report.promotion_status !== "priority-only") {
    errors.push("promotion_status must remain priority-only");
  }
  if (!Number.isInteger(report.candidate_count) || report.candidate_count < 0) {
    errors.push("candidate_count must be a nonnegative integer");
  }
  if (!Number.isInteger(report.accepted_count) || report.accepted_count < 0) {
    errors.push("accepted_count must be a nonnegative integer");
  }
  if (!Array.isArray(report.candidate_results)) {
    errors.push("candidate_results must be an array");
  } else if (report.candidate_results.length !== report.candidate_count) {
    errors.push("candidate_results length must equal candidate_count");
  }
  if (!isObject(report.nearest_candidate_readiness)) {
    errors.push("nearest_candidate_readiness must be an object");
  } else {
    if (report.nearest_candidate_readiness.schema !== NEAREST_BRANCH_CHART_SOURCE_READINESS_SCHEMA) {
      errors.push(`nearest_candidate_readiness schema must be ${NEAREST_BRANCH_CHART_SOURCE_READINESS_SCHEMA}`);
    }
    if (report.nearest_candidate_readiness.accepted_same_record_branch_chart_available !== false) {
      errors.push("nearest_candidate_readiness must remain non-authorizing");
    }
    if (report.nearest_candidate_readiness.authorization?.moving_retained_branch_certificate !== false) {
      errors.push("nearest_candidate_readiness must not authorize moving_retained_branch_certificate");
    }
  }
  if (!isObject(report.branch_chart_and_moving_certificate_ref_path_audit)) {
    errors.push("branch_chart_and_moving_certificate_ref_path_audit must be an object");
  } else {
    if (
      report.branch_chart_and_moving_certificate_ref_path_audit.schema !==
      BRANCH_CHART_AND_MOVING_CERTIFICATE_REF_PATH_AUDIT_SCHEMA
    ) {
      errors.push(
        `branch_chart_and_moving_certificate_ref_path_audit schema must be ${BRANCH_CHART_AND_MOVING_CERTIFICATE_REF_PATH_AUDIT_SCHEMA}`
      );
    }
    if (report.branch_chart_and_moving_certificate_ref_path_audit.accepted_ref_path_available !== false) {
      errors.push("branch_chart_and_moving_certificate_ref_path_audit must remain non-authorizing");
    }
    if (
      report.branch_chart_and_moving_certificate_ref_path_audit.authorization
        ?.moving_retained_branch_certificate !== false
    ) {
      errors.push("branch_chart_and_moving_certificate_ref_path_audit must not authorize moving_retained_branch_certificate");
    }
  }
  if (!isObject(report.same_record_accepted_branch_chart_intake_for_q_index_ratio_f2)) {
    errors.push("same_record_accepted_branch_chart_intake_for_q_index_ratio_f2 must be an object");
  } else {
    const intake = report.same_record_accepted_branch_chart_intake_for_q_index_ratio_f2;
    if (intake.schema !== SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA) {
      errors.push(
        `same_record_accepted_branch_chart_intake_for_q_index_ratio_f2 schema must be ${SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA}`
      );
    }
    if (intake.same_record_binding?.branch_label !== Q_INDEX_RATIO_F2_BRANCH_LABEL) {
      errors.push("q:index-ratio:f2 intake must preserve the branch label");
    }
    if (intake.same_record_binding?.extraction_window_id !== Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID) {
      errors.push("q:index-ratio:f2 intake must preserve the extraction window");
    }
    if (intake.same_record_binding?.active_root_ledger_hash !== Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH) {
      errors.push("q:index-ratio:f2 intake must preserve the active-root ledger hash");
    }
    if (!isObject(intake.accepted_branch_chart_source_target)) {
      errors.push("q:index-ratio:f2 intake must emit accepted_branch_chart_source_target");
    } else {
      const sourceTarget = intake.accepted_branch_chart_source_target;
      if (sourceTarget.schema !== SAME_RECORD_ACCEPTED_BRANCH_CHART_INTAKE_Q_INDEX_RATIO_F2_SCHEMA) {
        errors.push("q:index-ratio:f2 source target schema must match intake schema");
      }
      if (sourceTarget.same_record_binding_required?.branch_label !== Q_INDEX_RATIO_F2_BRANCH_LABEL) {
        errors.push("q:index-ratio:f2 source target must preserve the branch label");
      }
      if (
        sourceTarget.same_record_binding_required?.extraction_window_id !==
        Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID
      ) {
        errors.push("q:index-ratio:f2 source target must preserve the extraction window");
      }
      if (
        sourceTarget.same_record_binding_required?.active_root_ledger_hash !==
        Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH
      ) {
        errors.push("q:index-ratio:f2 source target must preserve the active-root ledger hash");
      }
      if (sourceTarget.same_record_binding_required?.cross_row_join_authorized !== false) {
        errors.push("q:index-ratio:f2 source target must reject cross-row joins");
      }
      if (!Array.isArray(sourceTarget.field_readouts)) {
        errors.push("q:index-ratio:f2 source target must emit field readouts");
      }
      if (
        report.accepted_count === 0 &&
        sourceTarget.first_missing_or_rejected_field !==
          "same_record_identity.accepted_branch_chart_ref"
      ) {
        errors.push("blocked q:index-ratio:f2 source target must fail first at accepted_branch_chart_ref");
      }
      if (
        report.accepted_count === 0 &&
        sourceTarget.authorization?.moving_retained_branch_certificate !== false
      ) {
        errors.push("blocked q:index-ratio:f2 source target must not authorize moving_retained_branch_certificate");
      }
      if (
        report.accepted_count === 0 &&
        !sourceTarget.rejected_branch_chart_evidence_sources?.includes("cross-row bundles")
      ) {
        errors.push("q:index-ratio:f2 source target must reject cross-row bundles");
      }
    }
    if (!isObject(intake.accepted_same_record_branch_chart_producer_target)) {
      errors.push("q:index-ratio:f2 intake must emit accepted_same_record_branch_chart_producer_target");
    } else {
      const producerTarget = intake.accepted_same_record_branch_chart_producer_target;
      if (
        producerTarget.schema !==
        SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_TARGET_Q_INDEX_RATIO_F2_SCHEMA
      ) {
        errors.push(
          `q:index-ratio:f2 producer target schema must be ${SAME_RECORD_ACCEPTED_BRANCH_CHART_PRODUCER_TARGET_Q_INDEX_RATIO_F2_SCHEMA}`
        );
      }
      if (producerTarget.required_source_object !== "accepted_same_record_branch_chart") {
        errors.push("q:index-ratio:f2 producer target must require accepted_same_record_branch_chart");
      }
      if (producerTarget.required_source_status !== ACCEPTED_BRANCH_CHART_SOURCE_STATUS) {
        errors.push("q:index-ratio:f2 producer target must require accepted_same_record_branch_chart status");
      }
      if (producerTarget.same_record_binding_required?.branch_label !== Q_INDEX_RATIO_F2_BRANCH_LABEL) {
        errors.push("q:index-ratio:f2 producer target must preserve the branch label");
      }
      if (
        producerTarget.same_record_binding_required?.extraction_window_id !==
        Q_INDEX_RATIO_F2_EXTRACTION_WINDOW_ID
      ) {
        errors.push("q:index-ratio:f2 producer target must preserve the extraction window");
      }
      if (
        producerTarget.same_record_binding_required?.active_root_ledger_hash !==
        Q_INDEX_RATIO_F2_ACTIVE_ROOT_LEDGER_HASH
      ) {
        errors.push("q:index-ratio:f2 producer target must preserve the active-root ledger hash");
      }
      if (producerTarget.same_record_binding_required?.required_fields_must_live_on_one_branch_row !== true) {
        errors.push("q:index-ratio:f2 producer target must require one branch row");
      }
      if (producerTarget.same_record_binding_required?.retained_source_binding_must_match_branch_row !== true) {
        errors.push("q:index-ratio:f2 producer target must bind retained source to the branch row");
      }
      if (producerTarget.same_record_binding_required?.cross_row_join_authorized !== false) {
        errors.push("q:index-ratio:f2 producer target must reject cross-row joins");
      }
      if (!producerTarget.required_producer_field_groups?.retained_source_binding?.includes(
        "retained_source_binding.source_artifact_hash"
      )) {
        errors.push("q:index-ratio:f2 producer target must require retained source binding fields");
      }
      for (const rejectedSource of [
        "proxy refs",
        "fixture refs",
        "sampled-only rows",
        "aggregate rows",
        "cross-row bundles",
        "route-only rows",
        "H39/theta3minus quotient rows",
        "source-normal denominator machinery",
        "downstream candidate rows",
      ]) {
        if (!producerTarget.rejected_branch_chart_evidence_sources?.includes(rejectedSource)) {
          errors.push(`q:index-ratio:f2 producer target must reject ${rejectedSource}`);
        }
      }
      if (
        report.accepted_count === 0 &&
        producerTarget.target_status !== "producer_target_blocked"
      ) {
        errors.push("blocked q:index-ratio:f2 producer target must remain producer_target_blocked");
      }
      if (
        report.accepted_count === 0 &&
        producerTarget.first_missing_or_rejected_field !==
          "same_record_identity.accepted_branch_chart_ref"
      ) {
        errors.push("blocked q:index-ratio:f2 producer target must fail first at accepted_branch_chart_ref");
      }
      if (
        report.accepted_count === 0 &&
        producerTarget.authorization?.moving_retained_branch_certificate !== false
      ) {
        errors.push("blocked q:index-ratio:f2 producer target must not authorize moving_retained_branch_certificate");
      }
    }
    if (intake.authorization?.moving_retained_branch_certificate !== false) {
      errors.push("q:index-ratio:f2 intake must not authorize moving_retained_branch_certificate");
    }
    if (intake.authorization?.structural_integrity_residual_vector !== false) {
      errors.push("q:index-ratio:f2 intake must not authorize structural-integrity residual rows");
    }
    if (intake.authorization?.photon_gate_a !== false) {
      errors.push("q:index-ratio:f2 intake must not authorize Photon Gate A");
    }
    if (intake.authorization?.lorentz_rows !== false) {
      errors.push("q:index-ratio:f2 intake must not authorize Lorentz rows");
    }
    if (intake.authorization?.observer_export !== false) {
      errors.push("q:index-ratio:f2 intake must not authorize observer export");
    }
    if (
      isObject(intake.selected_candidate_producer_target) &&
      intake.selected_candidate_producer_target.authorization?.moving_retained_branch_certificate !== false
    ) {
      errors.push("q:index-ratio:f2 producer target must not authorize moving_retained_branch_certificate");
    }
    if (
      isObject(intake.selected_candidate_producer_target) &&
      intake.selected_candidate_producer_target.authorization?.structural_integrity_residual_vector !== false
    ) {
      errors.push("q:index-ratio:f2 producer target must not authorize structural-integrity residual rows");
    }
  }
  if (report.accepted_count === 0 && report.first_failure !== "accepted_same_record_branch_chart_absent") {
    errors.push("zero-accepted source scouts must carry accepted_same_record_branch_chart_absent");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (report.authorization?.moving_retained_branch_certificate !== false) {
    errors.push("source scout must not authorize moving_retained_branch_certificate");
  }
  if (report.authorization?.structural_integrity_residual_vector !== false) {
    errors.push("source scout must not authorize structural-integrity residual rows");
  }
  if (report.authorization?.photon_gate_a !== false) {
    errors.push("source scout must not authorize Photon Gate A");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("source scout must not authorize observer export");
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
  if (args.printContract) {
    writeOutput(contract(), args);
    return;
  }
  if (args.sourceScout) {
    const manifest = readJson(args.sourceScout);
    writeOutput(buildAcceptedBranchChartSourceScout(manifest, { sourceRef: args.sourceScout }), args);
    return;
  }
  if (args.validateSourceScout) {
    const report = readJson(args.validateSourceScout);
    const errors = sourceScoutValidationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        scout_id: report.scout_id ?? null,
        candidate_count: report.candidate_count ?? null,
        accepted_count: report.accepted_count ?? null,
        first_failure: report.first_failure ?? null,
        first_rejection_code: report.first_rejection_code ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (args.validate) {
    const report = readJson(args.validate);
    const errors = validationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        certificate_id: report.certificate_id ?? null,
        certificate_verdict: report.certificate_verdict ?? null,
        first_failure: report.first_failure ?? null,
      },
      args,
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate or --print-contract is used.");
  }
  const candidate = readJson(args.input);
  writeOutput(buildReport(candidate, { sourceRef: args.input }), args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
