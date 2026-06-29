#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildReport as buildPressureRowReport,
  validationErrors as pressureRowValidationErrors,
} from "./pressure-row-branch-intake-report.mjs";

const REJECTION_CODE_LEGEND = {
  target_only_source: "Target or required-target provenance cannot authorize a retained pressure row.",
  toy_source: "Toy pressure, packing, or Hessian rows cannot authorize branch-derived pressure response.",
  fixture_path: "Fixture files are negative controls or scaffolds, not accepted non-fixture sources.",
  diagnostic_source: "Diagnostic-only rows do not carry accepted branch-history status.",
  partial_source: "Partial rows leave required pressure-row intake fields unavailable.",
  negative_control_source: "Negative controls intentionally prove rejection behavior.",
  empirical_source: "Empirical or benchmark skeleton rows cannot substitute for branch-emitted pressure records.",
  nested_target_provenance:
    "Nested field provenance remains target-only or required-target instead of accepted source evidence.",
  same_row_binding_missing: "Required fields do not bind to one retained pressure row.",
  required_fields_missing: "The retained pressure-row contract still has missing or rejected fields.",
  accepted_history_missing: "No accepted history segment is available for the candidate row.",
  priority_packet_not_source_row: "Priority prose states a target or contract but does not emit a source row.",
  contract_target_not_source_row: "The file defines an intake contract or theorem target rather than source evidence.",
  provider_boundary_not_pressure_row:
    "Branch-provider boundary reports do not emit the retained pressure-row fields until provider readiness is accepted.",
};

const AUTO_DISCOVERED_CANDIDATES = [
  {
    path: "reference/priorities/solver/branch-provider-evidence-report.md",
    candidate_kind: "branch_provider_boundary_report",
    source_status: "same_domain_branch_provider_missing_not_retained_pressure_row",
    rejection_codes: [
      "provider_boundary_not_pressure_row",
      "contract_target_not_source_row",
      "required_fields_missing",
      "accepted_history_missing",
    ],
  },
];

const BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH =
  "scripts/solver-audits/fixtures/branch-provider-current-candidates.json";
const RANK4_PROVIDER_CANDIDATE_ID =
  "h39-aggregate-p-provider-preaggregation-construction-attempt";

const PRESSURE_PROVIDER_OBJECT_REQUIRED_FIELDS = [
  "provider_source_status",
  "same_domain_record_ref",
  "branch_certificate_ref",
  "active_root_or_live_ledger_identity",
  "branch_local_projection_or_normalization_identity",
];

const RETAINED_PRESSURE_ROW_SOURCE_FIELDS = [
  "branch_id",
  "accepted_history_segment_id",
  "source_path",
  "quotient_chart_id",
  "pressure_record.Pi",
  "pressure_record.A",
  "pressure_record.s_n",
  "pressure_record.Q_chi_ab",
  "pressure_record.S_dev_ab",
  "pressure_record.retained_replay_direction",
  "exposure_source_record.E_internal",
  "exposure_source_record.zeta",
  "exposure_source_record.M0_src",
  "exposure_source_record.N_tf_ab",
  "pressure_response_record.partial_P_M0_src",
  "pressure_response_record.C_chi_iso",
  "pressure_response_record.C_chi_aniso",
  "pressure_response_record.m_S",
  "receiver_normal_weight_record.D_s",
  "receiver_normal_weight_record.D_t",
  "receiver_normal_weight_record.W_rec",
  "receiver_normal_weight_record.retained_root_row_ids",
  "noether_sea_response_record.theta_sea",
  "noether_sea_response_record.M_plus_ab",
  "reversible_domain.R_tr",
  "reversible_domain.R_tr_star",
  "reversible_domain.loss_channels_closed",
  "null_sector_record.clock_signal",
  "null_sector_record.birefringence",
  "null_sector_record.photon_dispersion",
  "null_sector_record.preferred_frame",
  "null_sector_record.directional_tensor",
  "null_sector_record.transport",
];

const REJECTION_PATTERNS = [
  ["target_only_source", /target[_-]?only|target_required|provider_target/i],
  ["toy_source", /toy/i],
  ["diagnostic_source", /diagnostic/i],
  ["partial_source", /partial/i],
  ["negative_control_source", /negative[_-]?control/i],
  ["empirical_source", /empirical|benchmark/i],
  ["accepted_history_missing", /not_accepted_history|accepted[_-]?history.*missing|accepted-history-source-missing/i],
];

const ACCEPTED_SOURCE_STATUS_VALUES = new Set([
  "accepted",
  "accepted_source",
  "accepted_non_fixture_source",
  "branch_emitted",
  "branch_emitted_source",
]);

function defaultRepoRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
}

function defaultManifestPath(repoRoot = defaultRepoRoot()) {
  return path.join(
    repoRoot,
    "scripts/mass-map/fixtures/pressure-row-branch-intake-source-scout-manifest.json"
  );
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readJsonIfExists(repoRoot, relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }
  return readJson(absolutePath);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isFixturePath(value) {
  return typeof value === "string" && /(^|\/)fixtures\//.test(value);
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function sortedEntriesByCount(object) {
  return Object.entries(object)
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => {
      if (rightValue !== leftValue) {
        return rightValue - leftValue;
      }
      return leftKey.localeCompare(rightKey);
    })
    .map(([key, count]) => ({ key, count }));
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

function getPath(value, pathExpression) {
  return pathExpression.split(".").reduce((cursor, key) => cursor?.[key], value);
}

function fieldStringValue(value, key) {
  if (!isObject(value)) {
    return null;
  }
  const fieldValue = value[key];
  return typeof fieldValue === "string" && fieldValue.trim() !== "" ? fieldValue : null;
}

function sourceStatusForField(value) {
  return fieldStringValue(value, "source_status") ?? fieldStringValue(value, "sourceStatus");
}

function sourceRefForField(value) {
  return (
    fieldStringValue(value, "source_ref") ??
    fieldStringValue(value, "source_path") ??
    fieldStringValue(value, "record_ref")
  );
}

function rowBindingForField(value) {
  if (!isObject(value)) {
    return null;
  }
  for (const key of [
    "row_id",
    "pressure_row_id",
    "retained_pressure_row_id",
    "record_row_id",
    "same_row_id",
    "row_ref",
    "pressure_row_ref",
    "retained_pressure_row_ref",
    "same_row_ref",
  ]) {
    const binding = fieldStringValue(value, key);
    if (binding !== null) {
      return { binding_key: key, value: binding };
    }
  }
  return null;
}

function provenanceReading(fieldValue, sourceStatus, sourceRef) {
  if (!present(fieldValue)) {
    return "missing_required_field";
  }
  if (sourceStatus === null) {
    return "literal_or_row_value_without_source_provenance";
  }
  if (/(target|probe|required|not[_-]?accepted)/i.test(sourceStatus)) {
    return "target_or_probe_only_not_accepted_source";
  }
  if (classifyRejectedValue(sourceStatus).length > 0) {
    return "rejected_non_source_provenance";
  }
  if (
    ACCEPTED_SOURCE_STATUS_VALUES.has(sourceStatus) &&
    sourceRef !== null &&
    !isFixturePath(sourceRef)
  ) {
    return "accepted_non_fixture_source_provenance";
  }
  return "unverified_source_provenance";
}

function buildFieldProvenanceReadout(candidate, fieldPath) {
  const fieldValue = getPath(candidate, fieldPath);
  const sourceStatus = sourceStatusForField(fieldValue);
  const sourceRef = sourceRefForField(fieldValue);
  const reading = provenanceReading(fieldValue, sourceStatus, sourceRef);
  return {
    field_path: fieldPath,
    present: present(fieldValue),
    source_status_path: isObject(fieldValue) && sourceStatus !== null ? `${fieldPath}.source_status` : null,
    source_status: sourceStatus,
    source_ref: sourceRef,
    row_binding: rowBindingForField(fieldValue),
    provenance_reading: reading,
    accepted_non_fixture_source_provenance: reading === "accepted_non_fixture_source_provenance",
  };
}

function buildProvenanceDepthReadout(nearestCandidate, repoRoot) {
  if (!nearestCandidate?.path) {
    return null;
  }
  const absolutePath = path.join(repoRoot, nearestCandidate.path);
  if (!fs.existsSync(absolutePath) || path.extname(nearestCandidate.path) !== ".json") {
    return null;
  }
  const candidate = readJson(absolutePath);
  const fieldReadouts = RETAINED_PRESSURE_ROW_SOURCE_FIELDS.map((fieldPath) =>
    buildFieldProvenanceReadout(candidate, fieldPath)
  );
  const unacceptedFields = fieldReadouts.filter(
    (field) => !field.accepted_non_fixture_source_provenance
  );
  const targetOrProbeOnlyFields = fieldReadouts.filter(
    (field) => field.provenance_reading === "target_or_probe_only_not_accepted_source"
  );
  const nonTargetUnacceptedFields = unacceptedFields.filter(
    (field) => field.provenance_reading !== "target_or_probe_only_not_accepted_source"
  );
  const provenanceReadingCounts = fieldReadouts.reduce((counts, field) => {
    counts[field.provenance_reading] = (counts[field.provenance_reading] ?? 0) + 1;
    return counts;
  }, {});

  return {
    schema: "pressure_row_nearest_candidate_provenance_depth_readout/v0",
    candidate_path: nearestCandidate.path,
    candidate_kind: nearestCandidate.candidate_kind,
    row_id: nearestCandidate.pressure_row_report?.row_id ?? candidate.row_id ?? candidate.id ?? null,
    purpose:
      "Narrow accepted_non_fixture_source_missing to the first required field whose provenance is still target/probe-only or otherwise not accepted source provenance.",
    accepted_non_fixture_source_provenance_pass: unacceptedFields.length === 0,
    field_count: fieldReadouts.length,
    target_or_probe_only_required_field_count: targetOrProbeOnlyFields.length,
    unaccepted_required_field_count: unacceptedFields.length,
    first_unaccepted_required_field: unacceptedFields[0] ?? null,
    first_target_or_probe_only_required_field: targetOrProbeOnlyFields[0] ?? null,
    first_non_target_unaccepted_required_field: nonTargetUnacceptedFields[0] ?? null,
    provenance_reading_counts: sortedEntriesByCount(provenanceReadingCounts),
    target_or_probe_only_required_field_paths: targetOrProbeOnlyFields.map(
      (field) => field.field_path
    ),
    missing_required_field_paths: fieldReadouts
      .filter((field) => field.provenance_reading === "missing_required_field")
      .map((field) => field.field_path),
    literal_or_row_value_without_source_provenance_field_paths: fieldReadouts
      .filter((field) => field.provenance_reading === "literal_or_row_value_without_source_provenance")
      .map((field) => field.field_path),
    rejected_non_source_provenance_field_paths: fieldReadouts
      .filter((field) => field.provenance_reading === "rejected_non_source_provenance")
      .map((field) => field.field_path),
    unverified_source_provenance_field_paths: fieldReadouts
      .filter((field) => field.provenance_reading === "unverified_source_provenance")
      .map((field) => field.field_path),
    field_readouts: fieldReadouts,
  };
}

function buildBranchIdCandidateReadout(candidate, repoRoot) {
  const readout = {
    path: candidate.path,
    candidate_kind: candidate.candidate_kind,
    source_status: candidate.source_status ?? null,
    accepted_non_fixture_source: candidate.accepted_non_fixture_source === true,
    candidate_path_is_fixture: isFixturePath(candidate.path),
    provider_report_reading: candidate.provider_report_reading ?? null,
    branch_id: null,
    branch_id_accepted_non_fixture_source: false,
  };

  const absolutePath = path.join(repoRoot, candidate.path);
  if (fs.existsSync(absolutePath) && path.extname(candidate.path) === ".json") {
    const sourceCandidate = readJson(absolutePath);
    const branchId = buildFieldProvenanceReadout(sourceCandidate, "branch_id");
    return {
      ...readout,
      branch_id: branchId,
      branch_id_accepted_non_fixture_source:
        branchId.accepted_non_fixture_source_provenance && !isFixturePath(candidate.path),
    };
  }

  return {
    ...readout,
    branch_id: {
      field_path: "branch_id",
      present: false,
      source_status_path: null,
      source_status: null,
      source_ref: null,
      row_binding: null,
      provenance_reading:
        candidate.candidate_kind === "branch_provider_boundary_report"
          ? "provider_boundary_not_retained_pressure_row"
          : "not_json_retained_pressure_row_source",
      accepted_non_fixture_source_provenance: false,
    },
  };
}

function summarizeBranchIdCandidate(readout) {
  return {
    path: readout.path,
    candidate_kind: readout.candidate_kind,
    source_status: readout.source_status,
    accepted_non_fixture_source: readout.accepted_non_fixture_source,
    candidate_path_is_fixture: readout.candidate_path_is_fixture,
    branch_id: readout.branch_id,
  };
}

function buildRank4ProviderReadinessAudit(repoRoot) {
  const manifest = readJsonIfExists(repoRoot, BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH);
  const providerCandidate = manifest?.candidates?.find(
    (candidate) => candidate.id === RANK4_PROVIDER_CANDIDATE_ID
  );
  const sourceContractReadout = providerCandidate?.source_contract_readout ?? null;
  const refinement = sourceContractReadout?.source_provenance_refinement ?? null;
  const branchIntervalReadout =
    refinement?.source_map_provider_object_branch_interval_readout ?? null;
  const positiveTarget = branchIntervalReadout?.positive_evidence_target ?? null;

  return {
    schema: "pressure_row_branch_id_provider_readiness_audit/v0",
    provider_current_candidate_path: BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH,
    provider_current_candidate_available: isObject(providerCandidate),
    provider_candidate_id: providerCandidate?.id ?? RANK4_PROVIDER_CANDIDATE_ID,
    provider_source_status: providerCandidate?.provider_source_status ?? null,
    feeds_rank4_pressure_row_branch_intake:
      providerCandidate?.feeds?.includes("rank4_pressure_row_branch_intake") ?? false,
    current_primary_missing_object_kind:
      refinement?.current_primary_missing_object_kind ?? null,
    next_evidence_object: refinement?.next_evidence_object ?? null,
    source_map_provider_branch_intervals_available:
      refinement?.source_map_provider_branch_intervals_available ?? null,
    provider_object_branch_intervals_present:
      refinement?.provider_object_branch_intervals_present ?? null,
    accepted_provider_object_branch_interval_count:
      branchIntervalReadout?.accepted_provider_object_branch_interval_count ?? null,
    required_terminal_row_count: positiveTarget?.required_terminal_row_count ?? null,
    required_branch_row_count: positiveTarget?.required_branch_row_count ?? null,
    required_identity_kinds: positiveTarget?.required_identity_kinds ?? [],
    provider_ready_authorized:
      sourceContractReadout?.provider_ready_authorized_by_this_readout === true ||
      refinement?.provider_ready_authorized_by_this_refinement === true ||
      branchIntervalReadout?.provider_ready_authorized_by_this_readout === true ||
      positiveTarget?.provider_ready_authorized_by_this_target === true,
    downstream_consumer_authorization:
      branchIntervalReadout?.downstream_consumer_authorization === true ||
      positiveTarget?.downstream_consumer_authorization === true,
  };
}

function acceptedNonFixtureProviderSource(candidate) {
  return (
    ACCEPTED_SOURCE_STATUS_VALUES.has(candidate.provider_source_status) &&
    present(candidate.source_ref) &&
    !isFixturePath(candidate.source_ref)
  );
}

function branchCertificateRefReading(candidate) {
  if (!present(candidate.branch_certificate_ref)) {
    return "branch_certificate_ref_missing";
  }
  if (!acceptedNonFixtureProviderSource(candidate)) {
    return "branch_certificate_ref_present_without_accepted_non_fixture_provider_source";
  }
  return "accepted_non_fixture_branch_certificate_ref";
}

function pressureProviderObjectFieldReadout(candidate, field) {
  const value = candidate[field] ?? null;
  if (field === "provider_source_status") {
    const statusAccepted = value === "accepted_non_fixture_source";
    const sourceRefMissing = !present(candidate.source_ref);
    const sourceRefIsFixture = isFixturePath(candidate.source_ref);
    return {
      field,
      value,
      present: present(value),
      pass: statusAccepted && !sourceRefMissing && !sourceRefIsFixture,
      failure:
        statusAccepted && sourceRefMissing
          ? "provider_source_status.source_ref_missing"
          : statusAccepted && sourceRefIsFixture
            ? "provider_source_status.fixture_source_ref"
            : statusAccepted
            ? null
            : "provider_source_status.accepted_non_fixture_source_missing",
    };
  }

  return {
    field,
    value,
    present: present(value),
    pass: present(value),
    failure: present(value) ? null : `${field}.missing`,
  };
}

function buildPressureProviderObjectCandidateReadout(candidate) {
  const fieldReadouts = PRESSURE_PROVIDER_OBJECT_REQUIRED_FIELDS.map((field) =>
    pressureProviderObjectFieldReadout(candidate, field)
  );
  const missingOrRejectedFields = fieldReadouts
    .filter((field) => !field.pass)
    .map((field) => field.field);

  return {
    id: candidate.id ?? null,
    claim_scope: candidate.claim_scope ?? null,
    source_ref: candidate.source_ref ?? null,
    source_ref_is_fixture: isFixturePath(candidate.source_ref),
    feeds: Array.isArray(candidate.feeds) ? candidate.feeds : [],
    required_field_pass_count: fieldReadouts.filter((field) => field.pass).length,
    required_field_count: fieldReadouts.length,
    pressure_provider_object_ready: missingOrRejectedFields.length === 0,
    missing_or_rejected_provider_fields: missingOrRejectedFields,
    first_failure: fieldReadouts.find((field) => !field.pass)?.failure ?? null,
    cross_candidate_join_authorized: false,
    field_readouts: fieldReadouts,
  };
}

function providerCandidatePath(candidate, field) {
  return `${BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH}#/candidates[id=${candidate.id}].${field}`;
}

function providerSourceRefStatus(candidate) {
  if (!present(candidate.source_ref)) {
    return "source_ref_missing";
  }
  if (isFixturePath(candidate.source_ref)) {
    return "fixture_source_ref_not_accepted_provenance";
  }
  if (candidate.provider_source_status !== "accepted_non_fixture_source") {
    return "source_ref_present_but_provider_source_status_not_accepted";
  }
  return "accepted_non_fixture_source_ref";
}

function buildProviderSourceStatusAndCertificatePathProbe(
  rank4ProviderCandidates,
  nearestPartial
) {
  if (!nearestPartial?.id) {
    return null;
  }
  const candidate = rank4ProviderCandidates.find((entry) => entry.id === nearestPartial.id);
  if (!candidate) {
    return null;
  }

  const providerSourceStatusAccepted =
    candidate.provider_source_status === "accepted_non_fixture_source";
  const sourceRefStatus = providerSourceRefStatus(candidate);
  const providerSourceAccepted =
    providerSourceStatusAccepted && sourceRefStatus === "accepted_non_fixture_source_ref";
  const branchCertificateRefPresent = present(candidate.branch_certificate_ref);

  return {
    schema: "pressure_row_provider_source_status_and_certificate_path_probe/v0",
    claim_scope: "rank4 pressure-row same-domain provider-source provenance",
    provider_candidate_path: BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH,
    nearest_partial_id: candidate.id,
    nearest_partial_source_ref: candidate.source_ref ?? null,
    nearest_partial_source_ref_path: providerCandidatePath(candidate, "source_ref"),
    nearest_partial_source_ref_status: sourceRefStatus,
    preserved_failure_boundary: "accepted_non_fixture_source_missing",
    accepted_promotion_authorized: false,
    same_candidate_populated_field_paths: [
      providerCandidatePath(candidate, "same_domain_record_ref"),
      providerCandidatePath(candidate, "active_root_or_live_ledger_identity"),
      providerCandidatePath(
        candidate,
        "branch_local_projection_or_normalization_identity"
      ),
    ],
    same_candidate_populated_fields_are_not_source_acceptance: true,
    provider_source_status_path: providerCandidatePath(candidate, "provider_source_status"),
    provider_source_status_required_value: "accepted_non_fixture_source",
    provider_source_status_observed_value: candidate.provider_source_status ?? null,
    provider_source_status_pass: providerSourceAccepted,
    provider_source_status_first_failure: providerSourceAccepted
      ? null
      : "provider_source_status.accepted_non_fixture_source_missing",
    branch_certificate_ref_path: providerCandidatePath(candidate, "branch_certificate_ref"),
    branch_certificate_ref_required_value:
      "nonempty branch_certificate_ref on the same accepted non-fixture provider record",
    branch_certificate_ref_observed_value: candidate.branch_certificate_ref ?? null,
    branch_certificate_ref_pass: branchCertificateRefPresent && providerSourceAccepted,
    branch_certificate_ref_first_failure: branchCertificateRefPresent
      ? providerSourceAccepted
        ? null
        : "branch_certificate_ref.present_without_accepted_non_fixture_provider_source"
      : "branch_certificate_ref.missing",
    exact_missing_provider_source_paths: [
      ...(providerSourceAccepted ? [] : [providerCandidatePath(candidate, "provider_source_status")]),
      ...(branchCertificateRefPresent ? [] : [providerCandidatePath(candidate, "branch_certificate_ref")]),
    ],
    required_next_provider_paths: [
      providerCandidatePath(candidate, "provider_source_status"),
      providerCandidatePath(candidate, "source_ref"),
      providerCandidatePath(candidate, "branch_certificate_ref"),
    ],
  };
}

function buildProviderCertificateRefCandidateReadout(candidate) {
  const reading = branchCertificateRefReading(candidate);
  return {
    id: candidate.id ?? null,
    claim_scope: candidate.claim_scope ?? null,
    source_ref: candidate.source_ref ?? null,
    provider_source_status: candidate.provider_source_status ?? null,
    feeds: Array.isArray(candidate.feeds) ? candidate.feeds : [],
    same_domain_record_ref: candidate.same_domain_record_ref ?? null,
    branch_certificate_ref: candidate.branch_certificate_ref ?? null,
    active_root_or_live_ledger_identity: candidate.active_root_or_live_ledger_identity ?? null,
    branch_local_projection_or_normalization_identity:
      candidate.branch_local_projection_or_normalization_identity ?? null,
    branch_certificate_ref_present: present(candidate.branch_certificate_ref),
    accepted_non_fixture_provider_source: acceptedNonFixtureProviderSource(candidate),
    branch_certificate_ref_accepted_non_fixture_source:
      reading === "accepted_non_fixture_branch_certificate_ref",
    branch_certificate_ref_reading: reading,
  };
}

function bestPressureProviderPartial(candidateReadouts) {
  return [...candidateReadouts].sort((left, right) => {
    if (right.required_field_pass_count !== left.required_field_pass_count) {
      return right.required_field_pass_count - left.required_field_pass_count;
    }
    return String(left.id).localeCompare(String(right.id));
  })[0] ?? null;
}

function buildSameDomainProviderObjectConstructionAttempt(
  rank4ProviderCandidates,
  providerBoundaryCandidate
) {
  const candidateReadouts = rank4ProviderCandidates.map(
    buildPressureProviderObjectCandidateReadout
  );
  const readyCandidates = candidateReadouts.filter(
    (candidate) => candidate.pressure_provider_object_ready
  );
  const missingFieldUnion = uniqueSorted(
    candidateReadouts.flatMap((candidate) => candidate.missing_or_rejected_provider_fields)
  );
  const nearestPartial = bestPressureProviderPartial(candidateReadouts);

  return {
    schema: "pressure_row_same_domain_provider_object_construction_attempt/v0",
    claim_scope: "rank4 pressure-row branch-intake provider object",
    provider_candidate_path: BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH,
    required_provider_source_status: "accepted_non_fixture_source",
    required_provider_fields: PRESSURE_PROVIDER_OBJECT_REQUIRED_FIELDS,
    pressure_specific_required_binding:
      "all provider fields must live on one same-domain non-fixture provider row before a retained pressure row can bind branch_id to branch_certificate_ref and accepted history",
    accepted_same_domain_provider_object_found: readyCandidates.length > 0,
    first_failure:
      readyCandidates.length > 0
        ? null
        : "same_domain_provider_object.accepted_non_fixture_source_missing",
    preserved_failure_boundary:
      readyCandidates.length > 0 ? null : "accepted_non_fixture_source_missing",
    rank4_provider_candidate_count: rank4ProviderCandidates.length,
    provider_object_ready_candidate_count: readyCandidates.length,
    missing_or_rejected_provider_field_union: missingFieldUnion,
    nearest_pressure_specific_partial: nearestPartial
      ? {
          id: nearestPartial.id,
          required_field_pass_count: nearestPartial.required_field_pass_count,
          missing_or_rejected_provider_fields:
            nearestPartial.missing_or_rejected_provider_fields,
          first_failure: nearestPartial.first_failure,
        }
      : null,
    forbidden_shortcut:
      "Do not combine fixture, toy, diagnostic, target-only, or cross-candidate fields into an accepted pressure provider object.",
    branch_certificate_ref_null_candidate_ids: candidateReadouts
      .filter((candidate) =>
        candidate.field_readouts.some(
          (field) => field.field === "branch_certificate_ref" && field.present === false
        )
      )
      .map((candidate) => candidate.id),
    provider_boundary_candidate: providerBoundaryCandidate
      ? {
          path: providerBoundaryCandidate.path,
          candidate_kind: providerBoundaryCandidate.candidate_kind,
          source_status: providerBoundaryCandidate.source_status,
          provider_report_reading: providerBoundaryCandidate.provider_report_reading ?? null,
        }
      : null,
    provider_source_status_and_certificate_path_probe:
      buildProviderSourceStatusAndCertificatePathProbe(
        rank4ProviderCandidates,
        nearestPartial
      ),
    accepted_same_domain_provider_object_candidates: readyCandidates,
    candidate_readouts: candidateReadouts,
  };
}

function buildBranchCertificateRefSourceAvailabilityAudit(
  candidates,
  providerBoundaryCandidate,
  repoRoot
) {
  const providerManifest = readJsonIfExists(repoRoot, BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH);
  const providerCandidates = Array.isArray(providerManifest?.candidates)
    ? providerManifest.candidates
    : [];
  const rank4ProviderCandidates = providerCandidates.filter((candidate) =>
    candidate.feeds?.includes("rank4_pressure_row_branch_intake")
  );
  const providerCandidateReadouts = rank4ProviderCandidates.map(
    buildProviderCertificateRefCandidateReadout
  );
  const acceptedCertificateCandidates = providerCandidateReadouts.filter(
    (candidate) => candidate.branch_certificate_ref_accepted_non_fixture_source
  );
  const branchCertificateRefPresentCandidates = providerCandidateReadouts.filter(
    (candidate) => candidate.branch_certificate_ref_present
  );
  const providerTargetRows = candidates.filter((candidate) =>
    candidate.pressure_row_report?.missing_or_rejected_fields?.includes(
      "accepted_non_fixture_source"
    )
  );

  return {
    schema: "pressure_row_branch_certificate_ref_source_availability_audit/v0",
    field_path: "branch_certificate_ref",
    purpose:
      "Check whether any current rank-4 provider candidate supplies an accepted non-fixture branch_certificate_ref before a pressure-row branch_id can be bound to a retained branch certificate.",
    accepted_branch_certificate_ref_found: acceptedCertificateCandidates.length > 0,
    first_failure:
      acceptedCertificateCandidates.length > 0
        ? null
        : "branch_certificate_ref.accepted_non_fixture_source_missing",
    preserved_failure_boundary:
      acceptedCertificateCandidates.length > 0 ? null : "accepted_non_fixture_source_missing",
    provider_candidate_path: BRANCH_PROVIDER_CURRENT_CANDIDATES_PATH,
    provider_candidate_count: providerCandidates.length,
    rank4_provider_candidate_count: rank4ProviderCandidates.length,
    pressure_source_candidate_count: candidates.length,
    pressure_target_or_fixture_candidate_count: providerTargetRows.length,
    branch_certificate_ref_present_candidate_count: branchCertificateRefPresentCandidates.length,
    accepted_branch_certificate_ref_candidate_count: acceptedCertificateCandidates.length,
    provider_boundary_candidate: providerBoundaryCandidate
      ? {
          path: providerBoundaryCandidate.path,
          candidate_kind: providerBoundaryCandidate.candidate_kind,
          source_status: providerBoundaryCandidate.source_status,
          provider_report_reading: providerBoundaryCandidate.provider_report_reading ?? null,
        }
      : null,
    required_next_provider_object:
      "one same-domain provider object with provider_source_status=accepted_non_fixture_source, same_domain_record_ref, branch_certificate_ref, active_root_or_live_ledger_identity, and branch_local_projection_or_normalization_identity",
    required_next_pressure_row_binding:
      "one accepted non-fixture retained pressure row whose branch_id and branch_certificate_ref-backed provider object bind to the same row as accepted history, quotient chart, pressure, exposure, pressure-response, reversible-domain, and null-sector records",
    accepted_branch_certificate_ref_candidates: acceptedCertificateCandidates,
    candidate_readouts: providerCandidateReadouts,
    same_domain_provider_object_construction_attempt:
      buildSameDomainProviderObjectConstructionAttempt(
        rank4ProviderCandidates,
        providerBoundaryCandidate
      ),
  };
}

function buildBranchIdSourceAvailabilityAudit(
  candidates,
  nearestCandidate,
  providerBoundaryCandidate,
  repoRoot
) {
  const candidateReadouts = candidates.map((candidate) =>
    buildBranchIdCandidateReadout(candidate, repoRoot)
  );
  const branchIdPresentCandidates = candidateReadouts.filter(
    (readout) => readout.branch_id?.present === true
  );
  const targetOrProbeOnlyCandidates = candidateReadouts.filter(
    (readout) => readout.branch_id?.provenance_reading === "target_or_probe_only_not_accepted_source"
  );
  const acceptedBranchIdCandidates = candidateReadouts.filter(
    (readout) => readout.branch_id_accepted_non_fixture_source === true
  );
  const nearestCandidateReadout =
    candidateReadouts.find((readout) => readout.path === nearestCandidate?.path) ?? null;

  return {
    schema: "pressure_row_branch_id_source_availability_audit/v0",
    field_path: "branch_id",
    purpose:
      "Check whether current pressure-row candidate material contains accepted non-fixture branch_id provenance before branch-derived pressure response can be consumed.",
    accepted_branch_id_source_found: acceptedBranchIdCandidates.length > 0,
    first_failure:
      acceptedBranchIdCandidates.length > 0 ? null : "branch_id.accepted_non_fixture_source_missing",
    preserved_failure_boundary:
      acceptedBranchIdCandidates.length > 0 ? null : "accepted_non_fixture_source_missing",
    required_source_family:
      "same-domain source-map provider-object branch intervals feeding retained pressure-row branch identity",
    required_next_pressure_row:
      "one accepted non-fixture retained pressure row whose branch_id field carries accepted non-fixture source provenance from the same-domain branch-provider object and binds to the same retained pressure row as the remaining pressure-row fields",
    candidate_count: candidates.length,
    branch_id_present_candidate_count: branchIdPresentCandidates.length,
    target_or_probe_only_branch_id_candidate_count: targetOrProbeOnlyCandidates.length,
    accepted_branch_id_candidate_count: acceptedBranchIdCandidates.length,
    nearest_candidate_branch_id_readout: nearestCandidateReadout
      ? summarizeBranchIdCandidate(nearestCandidateReadout)
      : null,
    provider_boundary_candidate: providerBoundaryCandidate
      ? {
          path: providerBoundaryCandidate.path,
          candidate_kind: providerBoundaryCandidate.candidate_kind,
          source_status: providerBoundaryCandidate.source_status,
          provider_report_reading: providerBoundaryCandidate.provider_report_reading ?? null,
        }
      : null,
    provider_readiness: buildRank4ProviderReadinessAudit(repoRoot),
    accepted_branch_id_candidates: acceptedBranchIdCandidates.map(summarizeBranchIdCandidate),
    candidate_readouts: candidateReadouts,
  };
}

function withoutDuplicatePaths(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    if (seen.has(candidate.path)) {
      return false;
    }
    seen.add(candidate.path);
    return true;
  });
}

function classifyRejectedValue(value) {
  if (value === true) {
    return ["diagnostic_source"];
  }
  if (typeof value !== "string") {
    return [];
  }
  return REJECTION_PATTERNS.flatMap(([code, pattern]) => (pattern.test(value) ? [code] : []));
}

function classifyPressureRowReport(candidatePath, report) {
  const codes = [];
  if (isFixturePath(candidatePath)) {
    codes.push("fixture_path");
  }
  if (!report.same_row_binding) {
    codes.push("same_row_binding_missing");
  }
  if (report.field_results.some((field) => !field.pass)) {
    codes.push("required_fields_missing");
  }
  if (report.missing_or_rejected_fields.includes("accepted_history_segment_id")) {
    codes.push("accepted_history_missing");
  }

  for (const field of report.accepted_source_evidence.rejected_status_fields) {
    codes.push(...classifyRejectedValue(field.value));
    if (field.path.includes(".") && /target_required|target[_-]?only/i.test(String(field.value))) {
      codes.push("nested_target_provenance");
    }
  }

  return uniqueSorted(codes);
}

function pressureRowCandidate(entry, repoRoot) {
  const absolutePath = path.join(repoRoot, entry.path);
  const candidate = readJson(absolutePath);
  const pressureRowReport = buildPressureRowReport(candidate, { sourceRef: entry.path });
  const reportErrors = pressureRowValidationErrors(pressureRowReport);
  const rejectionCodes = uniqueSorted([
    ...(entry.rejection_codes ?? []),
    ...classifyPressureRowReport(entry.path, pressureRowReport),
  ]);
  const accepted =
    pressureRowReport.branch_intake_verdict === "accepted_retained_pressure_row" &&
    rejectionCodes.length === 0;

  return {
    path: entry.path,
    candidate_kind: entry.candidate_kind ?? "pressure_row_json",
    source_status:
      entry.source_status ??
      candidate.provider_source_status ??
      candidate.candidate_status ??
      candidate.target_status ??
      pressureRowReport.first_failure,
    accepted_non_fixture_source: accepted,
    rejection_codes: rejectionCodes,
    pressure_row_report: {
      row_id: pressureRowReport.row_id,
      branch_intake_verdict: pressureRowReport.branch_intake_verdict,
      first_failure: pressureRowReport.first_failure,
      same_row_binding: pressureRowReport.same_row_binding,
      failed_field_count: pressureRowReport.field_results.filter((field) => !field.pass).length,
      accepted_source_pass: pressureRowReport.accepted_source_evidence.pass,
      rejected_status_field_count:
        pressureRowReport.accepted_source_evidence.rejected_status_fields.length,
      missing_or_rejected_fields: pressureRowReport.missing_or_rejected_fields,
      validation_errors: reportErrors,
    },
  };
}

function stripMarkdownCell(cell) {
  return cell.trim().replace(/^`+|`+$/g, "").trim();
}

function markdownTableValue(body, fieldName) {
  for (const line of body.split(/\r?\n/)) {
    const cells = line.split("|").map(stripMarkdownCell);
    if (cells.length >= 4 && cells[1] === fieldName) {
      return cells[2] === "" ? null : cells[2];
    }
  }
  return null;
}

function documentCandidate(entry, repoRoot) {
  const absolutePath = path.join(repoRoot, entry.path);
  const body = fs.readFileSync(absolutePath, "utf8");
  const termCounts = Object.fromEntries(
    ["accepted", "pressure", "exposure", "Noether sea", "target", "toy", "diagnostic"].map(
      (term) => [term, (body.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length]
    )
  );
  const providerReportReading =
    entry.candidate_kind === "branch_provider_boundary_report"
      ? {
          provider_verdict: markdownTableValue(body, "provider_verdict"),
          first_failure: markdownTableValue(body, "first_failure"),
          candidate_count: markdownTableValue(body, "candidate_count"),
          provider_ready_consumer_count: markdownTableValue(body, "provider_ready_consumer_count"),
        }
      : null;

  return {
    path: entry.path,
    candidate_kind: entry.candidate_kind ?? "priority_packet",
    source_status: entry.source_status,
    accepted_non_fixture_source: false,
    rejection_codes: uniqueSorted(entry.rejection_codes ?? ["priority_packet_not_source_row"]),
    term_counts: termCounts,
    ...(providerReportReading ? { provider_report_reading: providerReportReading } : {}),
  };
}

function buildCandidateSourceClassInspections(candidates) {
  const byKind = new Map();
  for (const candidate of candidates) {
    const candidateKind = candidate.candidate_kind ?? "unknown";
    if (!byKind.has(candidateKind)) {
      byKind.set(candidateKind, {
        candidate_kind: candidateKind,
        candidate_count: 0,
        accepted_non_fixture_candidate_count: 0,
        pressure_row_json_count: 0,
        document_or_provider_boundary_count: 0,
        paths: [],
        source_statuses: [],
        rejection_codes: [],
        first_failures: [],
        nearest_missing_field_sets: [],
      });
    }

    const summary = byKind.get(candidateKind);
    summary.candidate_count += 1;
    if (candidate.accepted_non_fixture_source === true) {
      summary.accepted_non_fixture_candidate_count += 1;
    }
    if (candidate.pressure_row_report) {
      summary.pressure_row_json_count += 1;
      summary.first_failures.push(candidate.pressure_row_report.first_failure);
      summary.nearest_missing_field_sets.push(...minimalMissingRows(candidate));
    } else {
      summary.document_or_provider_boundary_count += 1;
    }
    summary.paths.push(candidate.path);
    summary.source_statuses.push(candidate.source_status);
    summary.rejection_codes.push(...(candidate.rejection_codes ?? []));
  }

  return [...byKind.values()]
    .map((summary) => ({
      ...summary,
      paths: uniqueSorted(summary.paths),
      source_statuses: uniqueSorted(summary.source_statuses),
      rejection_codes: uniqueSorted(summary.rejection_codes),
      first_failures: uniqueSorted(summary.first_failures),
      nearest_missing_field_sets: uniqueSorted(summary.nearest_missing_field_sets),
    }))
    .sort((left, right) => left.candidate_kind.localeCompare(right.candidate_kind));
}

function candidateDistance(candidate) {
  const pressureReport = candidate.pressure_row_report;
  if (!pressureReport) {
    return [1, 1, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, candidate.path];
  }
  return [
    0,
    pressureReport.same_row_binding ? 0 : 1,
    pressureReport.failed_field_count,
    pressureReport.rejected_status_field_count,
    candidate.path,
  ];
}

function compareDistance(left, right) {
  const leftDistance = candidateDistance(left);
  const rightDistance = candidateDistance(right);
  for (let i = 0; i < leftDistance.length; i += 1) {
    const leftValue = leftDistance[i];
    const rightValue = rightDistance[i];
    if (leftValue < rightValue) {
      return -1;
    }
    if (leftValue > rightValue) {
      return 1;
    }
  }
  return 0;
}

function minimalMissingRows(candidate) {
  const missing = candidate.pressure_row_report?.missing_or_rejected_fields ?? [];
  if (missing.length === 1 && missing[0] === "accepted_non_fixture_source") {
    return RETAINED_PRESSURE_ROW_SOURCE_FIELDS;
  }
  return missing;
}

function sourceFieldPointer(candidatePath, fieldPath) {
  return candidatePath ? `${candidatePath}#${fieldPath}` : fieldPath;
}

function retainedPressureSourceFieldFamily(fieldPath) {
  if (["branch_id", "accepted_history_segment_id", "source_path"].includes(fieldPath)) {
    return "retained_branch_identity";
  }
  if (fieldPath === "quotient_chart_id") {
    return "exposure_quotient";
  }
  if (fieldPath.startsWith("pressure_record.")) {
    return "pressure_record";
  }
  if (fieldPath.startsWith("exposure_source_record.")) {
    return "exposure_source_record";
  }
  if (fieldPath.startsWith("pressure_response_record.")) {
    return "pressure_response_record";
  }
  if (fieldPath.startsWith("receiver_normal_weight_record.")) {
    return "receiver_normal_weight_record";
  }
  if (fieldPath.startsWith("noether_sea_response_record.")) {
    return "noether_sea_response_record";
  }
  if (fieldPath.startsWith("reversible_domain.")) {
    return "reversible_domain";
  }
  if (fieldPath.startsWith("null_sector_record.")) {
    return "null_sector_record";
  }
  return "unclassified";
}

function retainedPressureSourceFieldFamilies(fieldReadouts) {
  const families = new Map();
  for (const fieldPath of RETAINED_PRESSURE_ROW_SOURCE_FIELDS) {
    const field_family = retainedPressureSourceFieldFamily(fieldPath);
    const summary = families.get(field_family) ?? {
      field_family,
      required_count: 0,
      unaccepted_count: 0,
      required_fields: [],
      unaccepted_fields: [],
    };
    const readout = fieldReadouts.find((field) => field.field_path === fieldPath);
    summary.required_count += 1;
    summary.required_fields.push(fieldPath);
    if (readout?.accepted_non_fixture_source_provenance !== true) {
      summary.unaccepted_count += 1;
      summary.unaccepted_fields.push(fieldPath);
    }
    families.set(field_family, summary);
  }
  return [...families.values()].sort((left, right) =>
    left.field_family.localeCompare(right.field_family)
  );
}

function missingProviderSourceFields(providerSourcePathProbe) {
  if (!providerSourcePathProbe) {
    return [];
  }
  return [
    {
      field: "provider_source_status",
      path: providerSourcePathProbe.provider_source_status_path,
      required_value: "accepted_non_fixture_source",
      observed_value: providerSourcePathProbe.provider_source_status_observed_value ?? null,
      pass: providerSourcePathProbe.provider_source_status_pass === true,
      first_failure: providerSourcePathProbe.provider_source_status_first_failure ?? null,
    },
    {
      field: "branch_certificate_ref",
      path: providerSourcePathProbe.branch_certificate_ref_path,
      required_value:
        "nonempty branch_certificate_ref on the same accepted non-fixture provider record",
      observed_value: providerSourcePathProbe.branch_certificate_ref_observed_value ?? null,
      pass: providerSourcePathProbe.branch_certificate_ref_pass === true,
      first_failure: providerSourcePathProbe.branch_certificate_ref_first_failure ?? null,
    },
  ].filter((field) => field.pass !== true);
}

function buildAcceptedSourceObjectBoundary(
  nearestCandidate,
  provenanceDepthReadout,
  branchCertificateRefAudit,
  providerBoundaryCandidate
) {
  const providerObjectAttempt =
    branchCertificateRefAudit?.same_domain_provider_object_construction_attempt ?? null;
  const providerSourcePathProbe =
    providerObjectAttempt?.provider_source_status_and_certificate_path_probe ?? null;
  const nearestProviderPartial = providerObjectAttempt?.nearest_pressure_specific_partial ?? null;
  const unacceptedPressureFields =
    provenanceDepthReadout?.field_readouts?.filter(
      (field) => field.accepted_non_fixture_source_provenance !== true
    ) ?? [];
  const fieldReadouts = provenanceDepthReadout?.field_readouts ?? [];

  return {
    schema: "pressure_row_accepted_source_object_boundary/v0",
    claim_scope: "rank4 retained pressure-row accepted-source object",
    status: "accepted_source_absent_fail_closed",
    purpose:
      "Compose the upstream same-domain provider-source requirement with the 33-field retained pressure-row source requirement, without promoting target-only, fixture, toy, empirical, diagnostic, H39/theta3minus, source-normal, shell-braid, or cross-row evidence.",
    accepted_source_object_found: false,
    accepted_promotion_authorized: false,
    first_failure: "accepted_non_fixture_source_missing",
    provider_boundary: {
      provider_candidate_path: branchCertificateRefAudit?.provider_candidate_path ?? null,
      required_provider_source_status: "accepted_non_fixture_source",
      required_provider_fields: PRESSURE_PROVIDER_OBJECT_REQUIRED_FIELDS,
      expected_provider_source_producer:
        "accepted non-fixture same-domain branch-provider report carrying provider_source_status, source_ref, branch_certificate_ref, same_domain_record_ref, active_root_or_live_ledger_identity, and branch_local_projection_or_normalization_identity on one provider row",
      nearest_provider_candidate_id: nearestProviderPartial?.id ?? null,
      nearest_provider_candidate_missing_or_rejected_fields:
        nearestProviderPartial?.missing_or_rejected_provider_fields ?? [],
      nearest_provider_candidate_source_ref:
        providerSourcePathProbe?.nearest_partial_source_ref ?? null,
      nearest_provider_candidate_source_ref_status:
        providerSourcePathProbe?.nearest_partial_source_ref_status ?? null,
      exact_missing_provider_source_fields:
        missingProviderSourceFields(providerSourcePathProbe),
      exact_missing_provider_source_paths:
        providerSourcePathProbe?.exact_missing_provider_source_paths ?? [],
      provider_source_status_path: providerSourcePathProbe?.provider_source_status_path ?? null,
      provider_source_status_observed_value:
        providerSourcePathProbe?.provider_source_status_observed_value ?? null,
      branch_certificate_ref_path: providerSourcePathProbe?.branch_certificate_ref_path ?? null,
      branch_certificate_ref_observed_value:
        providerSourcePathProbe?.branch_certificate_ref_observed_value ?? null,
      accepted_same_domain_provider_object_found:
        providerObjectAttempt?.accepted_same_domain_provider_object_found === true,
      accepted_branch_certificate_ref_found:
        branchCertificateRefAudit?.accepted_branch_certificate_ref_found === true,
    },
    pressure_row_boundary: {
      expected_pressure_row_source_producer:
        "accepted retained pressure-row report emitted by the same provider source, carrying all 33 retained pressure, exposure, receiver-normal, Noether sea, reversible-domain, and null-sector source fields on one row",
      nearest_pressure_row_candidate_path: nearestCandidate?.path ?? null,
      nearest_pressure_row_same_row_binding:
        nearestCandidate?.pressure_row_report?.same_row_binding ?? null,
      nearest_pressure_row_failed_field_count:
        nearestCandidate?.pressure_row_report?.failed_field_count ?? null,
      required_source_field_count: RETAINED_PRESSURE_ROW_SOURCE_FIELDS.length,
      unaccepted_source_field_count: unacceptedPressureFields.length,
      source_field_families: retainedPressureSourceFieldFamilies(fieldReadouts),
      exact_unaccepted_pressure_row_source_paths: unacceptedPressureFields.map((field) =>
        sourceFieldPointer(nearestCandidate?.path ?? null, field.field_path)
      ),
      required_source_fields: RETAINED_PRESSURE_ROW_SOURCE_FIELDS,
    },
    required_same_record_binding: {
      provider_branch_certificate_ref_must_bind_to_pressure_row_branch_id: true,
      pressure_row_fields_must_share_one_retained_row_identity: true,
      pressure_row_fields_must_carry_accepted_non_fixture_source_provenance: true,
      cross_candidate_join_authorized: false,
    },
    forbidden_evidence_sources: [
      "H39/theta3minus diagnostics",
      "source-normal force residues",
      "shell-braid rows",
      "fixtures",
      "toy rows",
      "empirical rows without branch source",
      "cross-row bundles",
    ],
    provider_boundary_candidate: providerBoundaryCandidate
      ? {
          path: providerBoundaryCandidate.path,
          source_status: providerBoundaryCandidate.source_status,
          provider_report_reading: providerBoundaryCandidate.provider_report_reading ?? null,
        }
      : null,
    next_exact_source_target: {
      provider_paths: providerSourcePathProbe?.required_next_provider_paths ?? [],
      pressure_row_candidate_path: nearestCandidate?.path ?? null,
      pressure_row_source_fields: RETAINED_PRESSURE_ROW_SOURCE_FIELDS,
    },
  };
}

function buildFailureFamilyDelta(candidates, acceptedCandidates, repoRoot) {
  if (acceptedCandidates.length > 0) {
    return {
      nearest_candidate: null,
      minimal_missing_rows: [],
      provider_boundary_candidate: null,
      provenance_depth_readout: null,
      branch_id_source_availability_audit: null,
      accepted_source_object_boundary: null,
    };
  }

  const nearestCandidate = candidates
    .filter((candidate) => candidate.pressure_row_report)
    .sort(compareDistance)[0];
  const providerBoundaryCandidate = candidates.find(
    (candidate) => candidate.candidate_kind === "branch_provider_boundary_report"
  );

  const provenanceDepthReadout = buildProvenanceDepthReadout(nearestCandidate, repoRoot);
  const branchIdSourceAvailabilityAudit = buildBranchIdSourceAvailabilityAudit(
    candidates,
    nearestCandidate,
    providerBoundaryCandidate,
    repoRoot
  );
  const branchCertificateRefSourceAvailabilityAudit =
    buildBranchCertificateRefSourceAvailabilityAudit(
      candidates,
      providerBoundaryCandidate,
      repoRoot
    );

  return {
    nearest_candidate: nearestCandidate
      ? {
          path: nearestCandidate.path,
          candidate_kind: nearestCandidate.candidate_kind,
          source_status: nearestCandidate.source_status,
          first_failure: nearestCandidate.pressure_row_report.first_failure,
          same_row_binding: nearestCandidate.pressure_row_report.same_row_binding,
          failed_field_count: nearestCandidate.pressure_row_report.failed_field_count,
          rejected_status_field_count:
            nearestCandidate.pressure_row_report.rejected_status_field_count,
          reason:
            nearestCandidate.pressure_row_report.failed_field_count === 0 &&
            nearestCandidate.pressure_row_report.same_row_binding
              ? "All retained pressure-row contract fields bind to one row, but accepted non-fixture source provenance is still absent."
              : "This candidate has the shortest current missing-field list under the pressure-row intake contract.",
        }
      : null,
    minimal_missing_rows: nearestCandidate ? minimalMissingRows(nearestCandidate) : [],
    provider_boundary_candidate: providerBoundaryCandidate
      ? {
          path: providerBoundaryCandidate.path,
          source_status: providerBoundaryCandidate.source_status,
          rejection_codes: providerBoundaryCandidate.rejection_codes,
          provider_report_reading: providerBoundaryCandidate.provider_report_reading ?? null,
        }
      : null,
    provenance_depth_readout: provenanceDepthReadout,
    branch_id_source_availability_audit: branchIdSourceAvailabilityAudit,
    branch_certificate_ref_source_availability_audit:
      branchCertificateRefSourceAvailabilityAudit,
    accepted_source_object_boundary: buildAcceptedSourceObjectBoundary(
      nearestCandidate,
      provenanceDepthReadout,
      branchCertificateRefSourceAvailabilityAudit,
      providerBoundaryCandidate
    ),
  };
}

export function buildSourceScoutReport(manifest, options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot();
  if (!isObject(manifest) || !Array.isArray(manifest.candidates)) {
    throw new Error("Scout manifest must be an object with a candidates array.");
  }

  const manifestCandidates = manifest.candidates;
  const autoDiscoveredCandidates = AUTO_DISCOVERED_CANDIDATES;
  const entries = withoutDuplicatePaths([...manifestCandidates, ...autoDiscoveredCandidates]);
  const candidates = entries.map((entry) => {
    const absolutePath = path.join(repoRoot, entry.path);
    if (!fs.existsSync(absolutePath)) {
      return {
        path: entry.path,
        candidate_kind: entry.candidate_kind ?? "missing",
        source_status: "missing_candidate_path",
        accepted_non_fixture_source: false,
        rejection_codes: ["required_fields_missing"],
        missing_path: true,
      };
    }
    return path.extname(entry.path) === ".json"
      ? pressureRowCandidate(entry, repoRoot)
      : documentCandidate(entry, repoRoot);
  });
  const acceptedCandidates = candidates.filter((candidate) => candidate.accepted_non_fixture_source);

  return {
    schema: "pressure_row_branch_intake_source_scout_report/v0",
    scout_ref: manifest.scout_ref ?? "pressure_row_branch_intake_accepted_source_scout/v0",
    source_manifest_ref: manifest.source_manifest_ref ?? null,
    purpose:
      "Enumerate current repo candidates for an accepted non-fixture retained pressure-row source before branch-derived pressure response can be consumed.",
    candidate_count: candidates.length,
    source_scope: {
      manifest_candidate_count: manifestCandidates.length,
      auto_discovered_candidate_count: autoDiscoveredCandidates.filter(
        (candidate) => !manifestCandidates.some((entry) => entry.path === candidate.path)
      ).length,
      auto_discovered_families: ["branch_provider_boundary_report"],
    },
    candidate_source_class_inspections: buildCandidateSourceClassInspections(candidates),
    accepted_non_fixture_candidate_count: acceptedCandidates.length,
    first_failure:
      acceptedCandidates.length === 0 ? "accepted_non_fixture_source_missing" : null,
    rejection_code_legend: REJECTION_CODE_LEGEND,
    candidates,
    failure_family_delta: buildFailureFamilyDelta(candidates, acceptedCandidates, repoRoot),
    authorization: {
      branch_derived_pressure_response: false,
      empirical_mass_response: false,
      retained_branch_claim: false,
      observer_export: false,
      export_readiness: false,
    },
  };
}

export function scoutValidationErrors(report) {
  const errors = [];
  if (!isObject(report)) {
    return ["report must be an object"];
  }
  if (report.schema !== "pressure_row_branch_intake_source_scout_report/v0") {
    errors.push("schema must be pressure_row_branch_intake_source_scout_report/v0");
  }
  if (!Array.isArray(report.candidates)) {
    errors.push("candidates must be an array");
  }
  if (Array.isArray(report.candidates) && report.candidate_count !== report.candidates.length) {
    errors.push("candidate_count must equal candidates.length");
  }
  if (report.accepted_non_fixture_candidate_count === 0 && report.first_failure !== "accepted_non_fixture_source_missing") {
    errors.push("empty accepted-source scout must fail at accepted_non_fixture_source_missing");
  }
  if (
    report.first_failure === "accepted_non_fixture_source_missing" &&
    !isObject(report.failure_family_delta?.provenance_depth_readout)
  ) {
    errors.push("accepted-source scout must emit provenance_depth_readout for nearest candidate");
  }
  if (
    isObject(report.failure_family_delta?.provenance_depth_readout) &&
    typeof report.failure_family_delta.provenance_depth_readout.accepted_non_fixture_source_provenance_pass !== "boolean"
  ) {
    errors.push("provenance_depth_readout must report a boolean provenance pass value");
  }
  const branchIdAudit = report.failure_family_delta?.branch_id_source_availability_audit;
  const branchCertificateRefAudit =
    report.failure_family_delta?.branch_certificate_ref_source_availability_audit;
  const acceptedSourceObjectBoundary =
    report.failure_family_delta?.accepted_source_object_boundary;
  const providerObjectAttempt =
    branchCertificateRefAudit?.same_domain_provider_object_construction_attempt;
  const providerSourcePathProbe =
    providerObjectAttempt?.provider_source_status_and_certificate_path_probe;
  if (
    report.first_failure === "accepted_non_fixture_source_missing" &&
    !Array.isArray(report.candidate_source_class_inspections)
  ) {
    errors.push("accepted-source scout must emit candidate_source_class_inspections");
  }
  if (report.first_failure === "accepted_non_fixture_source_missing" && !isObject(branchIdAudit)) {
    errors.push("accepted-source scout must emit branch_id_source_availability_audit");
  }
  if (isObject(branchIdAudit)) {
    if (branchIdAudit.schema !== "pressure_row_branch_id_source_availability_audit/v0") {
      errors.push("branch_id_source_availability_audit schema is not recognized");
    }
    if (branchIdAudit.field_path !== "branch_id") {
      errors.push("branch_id_source_availability_audit must audit branch_id");
    }
    if (typeof branchIdAudit.accepted_branch_id_source_found !== "boolean") {
      errors.push("branch_id_source_availability_audit must report accepted_branch_id_source_found");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      branchIdAudit.accepted_branch_id_source_found !== false
    ) {
      errors.push("blocked scout must not report accepted branch_id source provenance");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      branchIdAudit.preserved_failure_boundary !== "accepted_non_fixture_source_missing"
    ) {
      errors.push("branch_id audit must preserve accepted_non_fixture_source_missing");
    }
  }
  if (
    report.first_failure === "accepted_non_fixture_source_missing" &&
    !isObject(branchCertificateRefAudit)
  ) {
    errors.push("accepted-source scout must emit branch_certificate_ref_source_availability_audit");
  }
  if (isObject(branchCertificateRefAudit)) {
    if (
      branchCertificateRefAudit.schema !==
      "pressure_row_branch_certificate_ref_source_availability_audit/v0"
    ) {
      errors.push("branch_certificate_ref_source_availability_audit schema is not recognized");
    }
    if (branchCertificateRefAudit.field_path !== "branch_certificate_ref") {
      errors.push("branch_certificate_ref_source_availability_audit must audit branch_certificate_ref");
    }
    if (typeof branchCertificateRefAudit.accepted_branch_certificate_ref_found !== "boolean") {
      errors.push(
        "branch_certificate_ref_source_availability_audit must report accepted_branch_certificate_ref_found"
      );
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      branchCertificateRefAudit.accepted_branch_certificate_ref_found !== false
    ) {
      errors.push("blocked scout must not report accepted branch_certificate_ref source provenance");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      branchCertificateRefAudit.preserved_failure_boundary !== "accepted_non_fixture_source_missing"
    ) {
      errors.push("branch_certificate_ref audit must preserve accepted_non_fixture_source_missing");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      !isObject(providerObjectAttempt)
    ) {
      errors.push("branch_certificate_ref audit must emit same_domain_provider_object_construction_attempt");
    }
  }
  if (isObject(providerObjectAttempt)) {
    if (
      providerObjectAttempt.schema !==
      "pressure_row_same_domain_provider_object_construction_attempt/v0"
    ) {
      errors.push("same_domain_provider_object_construction_attempt schema is not recognized");
    }
    if (!Array.isArray(providerObjectAttempt.required_provider_fields)) {
      errors.push("same_domain_provider_object_construction_attempt must list required provider fields");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      providerObjectAttempt.accepted_same_domain_provider_object_found !== false
    ) {
      errors.push("blocked scout must not report an accepted same-domain provider object");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      providerObjectAttempt.provider_object_ready_candidate_count !== 0
    ) {
      errors.push("blocked scout must not report provider-object ready candidates");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      providerObjectAttempt.preserved_failure_boundary !== "accepted_non_fixture_source_missing"
    ) {
      errors.push("same-domain provider object attempt must preserve accepted_non_fixture_source_missing");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      !isObject(providerSourcePathProbe)
    ) {
      errors.push("same-domain provider object attempt must emit provider source path probe");
    }
  }
  if (isObject(providerSourcePathProbe)) {
    if (
      providerSourcePathProbe.schema !==
      "pressure_row_provider_source_status_and_certificate_path_probe/v0"
    ) {
      errors.push("provider source path probe schema is not recognized");
    }
    if (providerSourcePathProbe.accepted_promotion_authorized !== false) {
      errors.push("provider source path probe must not authorize pressure provider promotion");
    }
    if (
      providerSourcePathProbe.same_candidate_populated_fields_are_not_source_acceptance !== true
    ) {
      errors.push(
        "provider source path probe must preserve same-row field population/source acceptance boundary"
      );
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      providerSourcePathProbe.provider_source_status_pass !== false
    ) {
      errors.push("blocked provider source path probe must fail provider_source_status");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      providerSourcePathProbe.branch_certificate_ref_pass !== false
    ) {
      errors.push("blocked provider source path probe must fail branch_certificate_ref");
    }
    if (!Array.isArray(providerSourcePathProbe.exact_missing_provider_source_paths)) {
      errors.push("provider source path probe must list exact missing provider source paths");
    }
  }
  if (
    report.first_failure === "accepted_non_fixture_source_missing" &&
    !isObject(acceptedSourceObjectBoundary)
  ) {
    errors.push("accepted-source scout must emit accepted_source_object_boundary");
  }
  if (isObject(acceptedSourceObjectBoundary)) {
    if (
      acceptedSourceObjectBoundary.schema !==
      "pressure_row_accepted_source_object_boundary/v0"
    ) {
      errors.push("accepted_source_object_boundary schema is not recognized");
    }
    if (acceptedSourceObjectBoundary.accepted_source_object_found !== false) {
      errors.push("accepted_source_object_boundary must remain fail-closed");
    }
    if (acceptedSourceObjectBoundary.accepted_promotion_authorized !== false) {
      errors.push("accepted_source_object_boundary must not authorize promotion");
    }
    if (
      acceptedSourceObjectBoundary.first_failure !== "accepted_non_fixture_source_missing"
    ) {
      errors.push("accepted_source_object_boundary must preserve accepted_non_fixture_source_missing");
    }
    if (!Array.isArray(acceptedSourceObjectBoundary.provider_boundary?.required_provider_fields)) {
      errors.push("accepted_source_object_boundary must list provider fields");
    }
    if (
      typeof acceptedSourceObjectBoundary.provider_boundary?.expected_provider_source_producer !==
      "string"
    ) {
      errors.push("accepted_source_object_boundary must name expected provider source producer");
    }
    if (
      !Array.isArray(
        acceptedSourceObjectBoundary.provider_boundary?.exact_missing_provider_source_fields
      )
    ) {
      errors.push("accepted_source_object_boundary must list exact missing provider fields");
    }
    if (
      !Array.isArray(
        acceptedSourceObjectBoundary.provider_boundary?.exact_missing_provider_source_paths
      )
    ) {
      errors.push("accepted_source_object_boundary must list exact missing provider paths");
    }
    if (
      report.first_failure === "accepted_non_fixture_source_missing" &&
      acceptedSourceObjectBoundary.provider_boundary.exact_missing_provider_source_fields.length === 0
    ) {
      errors.push("blocked accepted_source_object_boundary must name missing provider fields");
    }
    if (
      typeof acceptedSourceObjectBoundary.pressure_row_boundary
        ?.expected_pressure_row_source_producer !== "string"
    ) {
      errors.push("accepted_source_object_boundary must name expected pressure-row source producer");
    }
    if (!Array.isArray(acceptedSourceObjectBoundary.pressure_row_boundary?.required_source_fields)) {
      errors.push("accepted_source_object_boundary must list pressure-row source fields");
    }
    if (!Array.isArray(acceptedSourceObjectBoundary.pressure_row_boundary?.source_field_families)) {
      errors.push("accepted_source_object_boundary must group pressure-row source field families");
    }
    if (
      acceptedSourceObjectBoundary.required_same_record_binding
        ?.cross_candidate_join_authorized !== false
    ) {
      errors.push("accepted_source_object_boundary must reject cross-candidate joins");
    }
  }
  const knownCodes = new Set(Object.keys(REJECTION_CODE_LEGEND));
  for (const candidate of report.candidates ?? []) {
    for (const code of candidate.rejection_codes ?? []) {
      if (!knownCodes.has(code)) {
        errors.push(`unknown rejection code: ${code}`);
      }
    }
    if (candidate.accepted_non_fixture_source === true && (candidate.rejection_codes ?? []).length > 0) {
      errors.push(`accepted candidate has rejection codes: ${candidate.path}`);
    }
  }
  if (report.authorization?.empirical_mass_response !== false) {
    errors.push("empirical_mass_response must remain false");
  }
  if (report.authorization?.retained_branch_claim !== false) {
    errors.push("retained_branch_claim must remain false");
  }
  if (report.authorization?.observer_export !== false) {
    errors.push("observer_export must remain false");
  }
  if (report.authorization?.export_readiness !== false) {
    errors.push("export_readiness must remain false");
  }
  return errors;
}

function parseArgs(argv) {
  const args = {
    manifest: defaultManifestPath(),
    out: null,
    validate: null,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--manifest") {
      args.manifest = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/pressure-row-branch-intake-source-scout.mjs [options]

Options:
  --manifest PATH    Scout manifest JSON. Defaults to the rank-4 source-scout manifest fixture.
  --validate PATH    Validate an emitted source-scout report.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a priority-only scout for accepted non-fixture retained pressure-row
sources. It does not authorize branch-derived pressure response, retained-branch
claims, observer export, export readiness, or empirical mass response.`);
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
    const errors = scoutValidationErrors(report);
    writeOutput(
      {
        valid: errors.length === 0,
        errors,
        accepted_non_fixture_candidate_count:
          report.accepted_non_fixture_candidate_count ?? null,
        first_failure: report.first_failure ?? null,
      },
      args
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const manifestPath = path.resolve(args.manifest);
  const manifest = readJson(manifestPath);
  const report = buildSourceScoutReport(manifest, {
    repoRoot: path.resolve(path.dirname(manifestPath), "../../.."),
  });
  writeOutput(report, args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
