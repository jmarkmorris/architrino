#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCHEMA = "branch_provider_evidence_report/v0";
const CONTRACT_SCHEMA = "branch_provider_evidence_contract/v0";
const MANIFEST_SCHEMA = "branch_provider_evidence_candidates/v0";
const CONSTRUCTION_ATTEMPT_SCHEMA =
  "same_domain_branch_provider_object_construction_attempt/v0";
const SOURCE_CONTRACT_READOUT_SCHEMA =
  "branch_provider_candidate_source_contract_readout/v0";
const SOURCE_PROVENANCE_REFINEMENT_SCHEMA =
  "branch_provider_candidate_source_provenance_refinement/v0";
const SOURCE_PROVENANCE_EMITTER_TARGET_SCHEMA =
  "branch_provider_candidate_source_provenance_emitter_target/v0";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_READOUT_SCHEMA =
  "branch_provider_candidate_source_map_provider_object_branch_interval_readout/v0";
const SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_TARGET_SCHEMA =
  "branch_provider_candidate_source_map_provider_object_branch_interval_target/v0";

const ACCEPTED_SOURCE_STATUS = "accepted_non_fixture_source";

const COMMON_REQUIRED_FIELDS = [
  {
    path: "provider_source_status",
    requirement: "Provider row is a non-fixture accepted source record, not a toy, fixture, replay-only row, proxy diagnostic, or status shell.",
    failureCode: "accepted_non_fixture_source_missing",
    acceptedValues: [ACCEPTED_SOURCE_STATUS],
  },
  {
    path: "same_domain_record_ref",
    requirement: "Stable source record proving that the provider fields are carried on one same-domain record.",
    failureCode: "same_domain_record_ref_missing",
  },
  {
    path: "branch_certificate_ref",
    requirement: "Retained branch certificate reference for the provider row.",
    failureCode: "branch_certificate_ref_missing",
  },
  {
    path: "active_root_or_live_ledger_identity",
    requirement: "Active-root ledger or bounded-speed live-ledger identity for the same provider row.",
    failureCode: "active_root_or_live_ledger_identity_missing",
  },
  {
    path: "branch_local_projection_or_normalization_identity",
    requirement: "Branch-local projection, source-map, quotient, or normalization identity carried by the same provider row.",
    failureCode: "branch_local_projection_or_normalization_identity_missing",
  },
];

const CONSUMERS = [
  {
    id: "rank2_field_speed_action_self_hit_scan",
    rank: 2,
    workstream: "simulations",
    target: "accepted_transition_source",
    requiredFields: [
      ...COMMON_REQUIRED_FIELDS,
      {
        path: "conservation_pullback_hash",
        requirement: "Conservation-pullback hash on the same action-increment provider row.",
        failureCode: "conservation_pullback_hash_missing",
      },
    ],
    authorizationKey: "rank2_accepted_transition_source_ready",
  },
  {
    id: "rank4_pressure_row_branch_intake",
    rank: 4,
    workstream: "braid-mass-response-map",
    target: "retained_pressure_row_branch_intake",
    requiredFields: COMMON_REQUIRED_FIELDS,
    authorizationKey: "rank4_pressure_row_provider_ready",
  },
  {
    id: "rank5_bounded_speed_normal_reconstruction",
    rank: 5,
    workstream: "braid-retained-branch-closure",
    target: "bounded_speed_live_ledger",
    requiredFields: COMMON_REQUIRED_FIELDS,
    authorizationKey: "rank5_bounded_speed_live_ledger_ready",
  },
  {
    id: "rank6_moving_retained_branch_certificate",
    rank: 6,
    workstream: "braid-nested-shell-causal-closure",
    target: "moving_retained_branch_certificate",
    requiredFields: COMMON_REQUIRED_FIELDS,
    authorizationKey: "rank6_moving_branch_provider_ready",
  },
];

const CONSUMER_CONSTRUCTION_ATTEMPT_CANDIDATE_IDS = new Set([
  "h39-aggregate-p-provider-preaggregation-construction-attempt",
]);

const PROVIDER_OBJECT_CONSTRUCTION_FIELDS = [
  {
    path: "provider_source_status",
    requirement:
      "Provider source status remains non-accepted until one non-fixture same-domain source record is accepted.",
    failureCode: "accepted_non_fixture_source_missing",
    acceptedValues: [ACCEPTED_SOURCE_STATUS],
  },
  {
    path: "same_domain_record_ref",
    requirement:
      "Stable same-domain record that carries all provider-object fields before aggregate P is formed.",
    failureCode: "same_domain_record_ref_missing",
  },
  {
    path: "branch_certificate_ref",
    requirement: "Retained branch certificate reference for the same provider row.",
    failureCode: "branch_certificate_ref_missing",
  },
  {
    path: "active_root_or_live_ledger_identity",
    requirement:
      "Active-root ledger or bounded-speed live-ledger identity bound to the same provider row.",
    failureCode: "active_root_or_live_ledger_identity_missing",
  },
  {
    path: "branch_local_projection_or_normalization_identity",
    requirement:
      "Branch-local projection, source-map, quotient, or normalization identity on the same provider row.",
    failureCode: "branch_local_projection_or_normalization_identity_missing",
  },
  {
    path: "branch_rows_ref",
    requirement:
      "Explicit branch rows such as P_- / P_+ or P_b before any aggregate P erases branch identity.",
    failureCode: "branch_rows_ref_missing",
  },
  {
    path: "branch_labels",
    requirement: "Branch labels for the explicit branch rows.",
    failureCode: "branch_labels_missing",
  },
  {
    path: "branch_weights_or_intervals",
    requirement: "Branch weights or intervals for the explicit branch rows.",
    failureCode: "branch_weights_or_intervals_missing",
  },
  {
    path: "projection_map_ref",
    requirement: "Projection-map reference for the same-domain branch-bearing row.",
    failureCode: "projection_map_ref_missing",
  },
  {
    path: "pushforward_operator_ref",
    requirement: "Pushforward operator reference for the same-domain row.",
    failureCode: "pushforward_operator_ref_missing",
  },
  {
    path: "normalization_identity_ref",
    requirement: "Normalization identity reference before aggregate P is consumed.",
    failureCode: "normalization_identity_ref_missing",
  },
  {
    path: "source_term_refs_upstream_of_aggregate_p",
    requirement: "Source-term references upstream of aggregate P.",
    failureCode: "source_term_refs_upstream_of_aggregate_p_missing",
  },
  {
    path: "aggregate_erasure_negative_control_ref",
    requirement:
      "Negative control showing aggregate-only P is rejected when branch identity is erased.",
    failureCode: "aggregate_erasure_negative_control_ref_missing",
  },
  {
    path: "conservation_pullback_hash",
    requirement:
      "Conservation-pullback hash when the provider is consumed as rank 2 accepted_transition_source evidence.",
    failureCode: "conservation_pullback_hash_missing",
    rank2Only: true,
  },
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    validate: null,
    pretty: false,
    printContract: false,
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
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/solver-audits/branch-provider-evidence-report.mjs [options]

Options:
  --input PATH       Candidate provider manifest JSON.
  --validate PATH    Validate an emitted branch-provider evidence report.
  --print-contract   Print required provider fields by top-six consumer.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This is a fail-closed priority-side provider audit. It records whether current
solver, geometry-export, branch, pressure, or normal-candidate rows already
carry the same-domain branch-bearing provider object needed by top-six ranks.
It does not run downstream scans, populate structural-integrity residuals, or
authorize retained-branch closure by itself.`);
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

function acceptedValue(value, acceptedValues) {
  if (!acceptedValues) {
    return present(value);
  }
  return acceptedValues.includes(value);
}

function unique(values) {
  return [...new Set(values)];
}

function fieldContractEntry({ path: fieldPath, requirement, failureCode, acceptedValues, rank2Only }) {
  return {
    path: fieldPath,
    requirement,
    failure_code: failureCode,
    accepted_values: acceptedValues ?? null,
    rank2_only: rank2Only === true,
  };
}

function sameStringSet(left, right) {
  return (
    Array.isArray(left)
    && left.length === right.length
    && right.every((value) => left.includes(value))
  );
}

function sourceContractReadoutValidationErrors(readout, label) {
  if (readout === null || readout === undefined) {
    return [];
  }
  const errors = [];
  const expectedSharedSourceCellIds = [
    "speed.0.first-y",
    "speed.1.first-y",
    "speed.2.first-y",
    "speed.3.first-y",
    "speed.4.first-y",
  ];
  const expectedBlockerKinds = [
    "source_term_provider_directed_source_certification_open",
    "source_term_provider_term_width_realization_open",
  ];
  const expectedLatestBoundary =
    "terminal-source-covariance-lambda-provider-object-replay-audit-provider-branch-intervals-open";
  const expectedCurrentBlocker =
    "same-domain-source-map-provider-object-branch-intervals-needed";
  const expectedCurrentMissingObject =
    "source-map-provider-object-branch-intervals";
  const expectedNextEvidenceObject =
    "same-domain source-map provider-object branch intervals on every terminal row";
  const expectedRejectedCandidateSourceKinds = [
    "lambda-terminal-witness-branch-interval",
    "aggregate-P-only-provider-row",
    "variable-owned-alpha-candidate",
    "row-local-expression-branch-feed",
  ];
  const expectedMissingIdentityKinds = [
    "same-domain-branch-bearing-P_b-map",
    "branch_projection_or_alpha_map",
    "pushforward_operator_ref",
    "normalization_identity_ref",
  ];
  const expectedRequiredIntervalPayloads = [
    "source_map_provider_branch_intervals",
    "provider_object_branch_intervals",
  ];
  if (!isObject(readout)) {
    return [`${label} must be an object when present`];
  }
  if (readout.schema !== SOURCE_CONTRACT_READOUT_SCHEMA) {
    errors.push(`${label} schema must be ${SOURCE_CONTRACT_READOUT_SCHEMA}`);
  }
  if (
    readout.status !==
    "candidate-boundary-replay-verified-source-term-provider-certification-open"
  ) {
    errors.push(`${label} status must keep source-term provider certification open`);
  }
  if (
    readout.source_contract_boundary_verified !== true ||
    readout.source_contract_boundary_row_count !== 5 ||
    readout.source_contract_boundary_check_count !== 17 ||
    !sameStringSet(readout.shared_source_cell_ids, expectedSharedSourceCellIds) ||
    readout.provider_row_source_kind !==
      "directed-rounded-same-domain-h38-source-map-residual-provider" ||
    readout.source_term_provider_probe_same_domain_contract_ready !== true ||
    readout.source_term_provider_probe_same_radius_contract_ready !== true ||
    readout.terminal_row_enclosure_boundary_replay_verified !== true
  ) {
    errors.push(`${label} must verify the H39 source-contract boundary replay`);
  }
  if (
    readout.directed_rounded_shared_domain_provider_certified !== false ||
    readout.source_term_provider_probe_rows_certify_directed_rounded_source !==
      false ||
    readout.source_term_provider_probe_term_width_realization_closed !== false ||
    !sameStringSet(
      readout.open_provider_certification_blocker_kinds,
      expectedBlockerKinds
    ) ||
    readout.provider_ready_authorized_by_this_readout !== false
  ) {
    errors.push(`${label} must keep provider certification and readiness false`);
  }
  const refinement = readout.source_provenance_refinement;
  if (!isObject(refinement)) {
    errors.push(`${label} must include source_provenance_refinement`);
  } else {
    const emitterTarget = refinement.source_provenance_emitter_target;
    const sourceMapProviderObjectReadout =
      refinement.source_map_provider_object_branch_interval_readout;
    if (
      refinement.schema !== SOURCE_PROVENANCE_REFINEMENT_SCHEMA ||
      refinement.status !==
        "candidate-source-covariance-lambda-provider-object-replay-branch-intervals-open" ||
      refinement.term_width_reduced_to_signed_radius_source_provenance !== true ||
      refinement.term_width_is_primary_blocker !== false ||
      refinement.directed_rounded_source_provenance_still_open !== true ||
      refinement.source_provenance_certificate_fields_present !== false ||
      refinement.source_provenance_emitter_materialized !== false ||
      refinement.signed_radius_subinterval_emitter_primitive_materialized !==
        true ||
      refinement.source_term_producer_image_fields_projected !== true ||
      refinement.lambda_terminal_witness_branch_intervals_available !== true ||
      refinement.source_map_provider_branch_intervals_available !== false ||
      refinement.provider_object_branch_intervals_present !== false ||
      refinement.source_term_provider_probe_rows_certify_directed_rounded_source !==
        false ||
      refinement.source_term_provider_probe_term_width_realization_closed !==
        false ||
      refinement.latest_candidate_boundary !== expectedLatestBoundary ||
      refinement.current_blocker_classification !== expectedCurrentBlocker ||
      refinement.current_primary_missing_object_kind !==
        expectedCurrentMissingObject ||
      refinement.next_evidence_object !== expectedNextEvidenceObject ||
      refinement.provider_ready_authorized_by_this_refinement !== false
    ) {
      errors.push(`${label} source_provenance_refinement must stay fail-closed`);
    }
    if (
      !isObject(emitterTarget) ||
      emitterTarget.schema !== SOURCE_PROVENANCE_EMITTER_TARGET_SCHEMA ||
      emitterTarget.status !==
        "candidate-signed-radius-subinterval-emitter-primitive-materialized-source-provenance-open" ||
      emitterTarget.signed_radius_subinterval_emitter_primitive_verified !==
        true ||
      emitterTarget.signed_radius_subinterval_emitter_primitive_materialized !==
        true ||
      emitterTarget.source_provenance_emitter_materialized !== false ||
      emitterTarget.source_provenance_emitter_certified_directed_rounded !==
        false ||
      emitterTarget.source_term_producer_image_provenance_fields_present !==
        false ||
      emitterTarget.source_term_producer_image_provenance_fields_still_missing !==
        true ||
      !sameStringSet(emitterTarget.source_cell_ids, expectedSharedSourceCellIds) ||
      emitterTarget.provider_ready_authorized_by_this_target !== false ||
      emitterTarget.downstream_consumer_authorization !== false
    ) {
      errors.push(`${label} source_provenance_emitter_target must stay fail-closed`);
    }
    if (
      !isObject(sourceMapProviderObjectReadout) ||
      sourceMapProviderObjectReadout.schema !==
        SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_READOUT_SCHEMA ||
      sourceMapProviderObjectReadout.status !==
        "candidate-source-map-provider-object-branch-intervals-open" ||
      sourceMapProviderObjectReadout.terminal_row_count !== 15 ||
      sourceMapProviderObjectReadout.branch_row_count !== 30 ||
      sourceMapProviderObjectReadout
        .lambda_terminal_witness_branch_intervals_available !== true ||
      sourceMapProviderObjectReadout
        .source_map_provider_branch_intervals_available !== false ||
      sourceMapProviderObjectReadout
        .provider_object_branch_intervals_present !== false ||
      sourceMapProviderObjectReadout
        .accepted_provider_object_branch_interval_count !== 0 ||
      !sameStringSet(
        sourceMapProviderObjectReadout.rejected_candidate_source_kinds,
        expectedRejectedCandidateSourceKinds
      ) ||
      !sameStringSet(
        sourceMapProviderObjectReadout.missing_identity_kinds,
        expectedMissingIdentityKinds
      ) ||
      sourceMapProviderObjectReadout.provider_ready_authorized_by_this_readout !==
        false ||
      sourceMapProviderObjectReadout.downstream_consumer_authorization !== false
    ) {
      errors.push(
        `${label} source_map_provider_object_branch_interval_readout must stay fail-closed`
      );
    } else {
      const positiveEvidenceTarget =
        sourceMapProviderObjectReadout.positive_evidence_target;
      if (
        !isObject(positiveEvidenceTarget) ||
        positiveEvidenceTarget.schema !==
          SOURCE_MAP_PROVIDER_OBJECT_BRANCH_INTERVAL_TARGET_SCHEMA ||
        positiveEvidenceTarget.claim_level !==
          "priority-only target, not provider acceptance" ||
        positiveEvidenceTarget.required_terminal_row_count !== 15 ||
        positiveEvidenceTarget.required_branch_row_count !== 30 ||
        !sameStringSet(
          positiveEvidenceTarget.required_identity_kinds,
          expectedMissingIdentityKinds
        ) ||
        !sameStringSet(
          positiveEvidenceTarget.required_interval_payloads,
          expectedRequiredIntervalPayloads
        ) ||
        positiveEvidenceTarget
          .accepted_provider_object_branch_interval_count_required !== 30 ||
        positiveEvidenceTarget.same_record_binding_required !== true ||
        positiveEvidenceTarget.provider_ready_authorized_by_this_target !==
          false ||
        positiveEvidenceTarget.downstream_consumer_authorization !== false
      ) {
        errors.push(
          `${label} source_map_provider_object_branch_interval_readout positive_evidence_target must stay target-only`
        );
      }
    }
  }
  return errors;
}

function contract() {
  return {
    schema: CONTRACT_SCHEMA,
    purpose:
      "Minimum same-domain branch-bearing provider fields before top-six consumers may treat a candidate row as provider-ready.",
    accepted_source_status: ACCEPTED_SOURCE_STATUS,
    common_required_fields: COMMON_REQUIRED_FIELDS.map(fieldContractEntry),
    consumers: CONSUMERS.map((consumer) => ({
      id: consumer.id,
      rank: consumer.rank,
      workstream: consumer.workstream,
      target: consumer.target,
      required_fields: consumer.requiredFields.map(fieldContractEntry),
    })),
    provider_object_construction_attempt: {
      schema: CONSTRUCTION_ATTEMPT_SCHEMA,
      claim_level: "priority-only construction attempt, not provider acceptance",
      target:
        "same-domain branch-bearing provider object before aggregate P is consumed",
      required_fields: PROVIDER_OBJECT_CONSTRUCTION_FIELDS.map(fieldContractEntry),
    },
    authorization_boundary: {
      provider_ready_is_not_downstream_closure: true,
      construction_attempt_authorizes_provider_ready: false,
      candidate_h_recovery_authorized_by_this_report: false,
      pressure_coefficient_authorized_by_this_report: false,
      structural_integrity_residual_vector_authorized_by_this_report: false,
      retained_branch_claim_authorized_by_this_report: false,
    },
  };
}

function evaluateField(candidate, field) {
  const value = getPath(candidate, field.path);
  const pass = acceptedValue(value, field.acceptedValues);
  return {
    path: field.path,
    requirement: field.requirement,
    present: present(value),
    pass,
    value: present(value) && typeof value !== "object" ? value : null,
    failure_code: pass ? null : field.failureCode,
  };
}

function candidateAppliesToConsumer(candidate, consumer) {
  return Array.isArray(candidate.feeds) && candidate.feeds.includes(consumer.id);
}

function evaluateCandidateForConsumer(candidate, consumer) {
  const fieldResults = consumer.requiredFields.map((field) => evaluateField(candidate, field));
  const failedFields = fieldResults.filter((field) => !field.pass);
  const providerReady = failedFields.length === 0;
  return {
    consumer_id: consumer.id,
    rank: consumer.rank,
    workstream: consumer.workstream,
    target: consumer.target,
    provider_ready: providerReady,
    first_failure: providerReady ? null : failedFields[0].failure_code,
    missing_or_rejected_fields: failedFields.map((field) => field.path),
    field_results: fieldResults,
  };
}

function evaluateCandidate(candidate) {
  const consumerResults = CONSUMERS.filter((consumer) => candidateAppliesToConsumer(candidate, consumer)).map((consumer) =>
    evaluateCandidateForConsumer(candidate, consumer)
  );
  const providerReadyConsumers = consumerResults.filter((consumer) => consumer.provider_ready);
  const firstFailure = consumerResults.find((consumer) => !consumer.provider_ready)?.first_failure ?? null;
  return {
    id: candidate.id ?? null,
    source_ref: candidate.source_ref ?? null,
    provider_source_status: candidate.provider_source_status ?? null,
    claim_scope: candidate.claim_scope ?? "priority-only-provider-candidate",
    feeds: Array.isArray(candidate.feeds) ? candidate.feeds : [],
    provider_ready_for_consumers: providerReadyConsumers.map((consumer) => consumer.consumer_id),
    first_failure: providerReadyConsumers.length > 0 ? null : firstFailure ?? "no_consumer_declared",
    consumer_results: consumerResults,
  };
}

function constructionFieldsForCandidate(candidate) {
  const feedsRank2 = Array.isArray(candidate.feeds)
    && candidate.feeds.includes("rank2_field_speed_action_self_hit_scan");
  return PROVIDER_OBJECT_CONSTRUCTION_FIELDS.filter(
    (field) => field.rank2Only !== true || feedsRank2
  );
}

function evaluateConstructionAttemptCandidate(candidate) {
  const fieldResults = constructionFieldsForCandidate(candidate).map((field) =>
    evaluateField(candidate, field)
  );
  const failedFields = fieldResults.filter((field) => !field.pass);
  const providerObjectFieldsReady = failedFields.length === 0;
  const branchMaterializationFields = [
    "branch_rows_ref",
    "branch_labels",
    "branch_weights_or_intervals",
    "projection_map_ref",
    "pushforward_operator_ref",
    "normalization_identity_ref",
    "source_term_refs_upstream_of_aggregate_p",
    "aggregate_erasure_negative_control_ref",
  ];
  const branchMaterializationReady = branchMaterializationFields.every((fieldPath) =>
    fieldResults.find((field) => field.path === fieldPath)?.pass === true
  );

  return {
    candidate_id: candidate.id ?? null,
    feeds: Array.isArray(candidate.feeds) ? candidate.feeds : [],
    provider_source_status: candidate.provider_source_status ?? null,
    provider_object_fields_ready: providerObjectFieldsReady,
    branch_materialization_ready: branchMaterializationReady,
    first_failure: providerObjectFieldsReady ? null : failedFields[0]?.failure_code ?? "provider_candidate_absent",
    missing_or_rejected_fields: failedFields.map((field) => field.path),
    source_contract_readout: isObject(candidate.source_contract_readout)
      ? candidate.source_contract_readout
      : null,
    field_results: fieldResults,
  };
}

function consumerSpecificMissingFields(candidate, consumer) {
  const commonFieldPaths = new Set(COMMON_REQUIRED_FIELDS.map((field) => field.path));
  return consumer.requiredFields
    .filter((field) => !commonFieldPaths.has(field.path))
    .filter((field) => !evaluateField(candidate, field).pass)
    .map((field) => field.path);
}

function constructionMissingFields(candidateAttempt) {
  const rank2OnlyFieldPaths = new Set(
    PROVIDER_OBJECT_CONSTRUCTION_FIELDS
      .filter((field) => field.rank2Only === true)
      .map((field) => field.path)
  );
  return candidateAttempt.missing_or_rejected_fields.filter(
    (fieldPath) => !rank2OnlyFieldPaths.has(fieldPath)
  );
}

function buildConsumerConstructionAttemptReadouts(
  manifestCandidatesById,
  candidateAttemptsById
) {
  return [...CONSUMER_CONSTRUCTION_ATTEMPT_CANDIDATE_IDS]
    .flatMap((candidateId) => {
      const candidate = manifestCandidatesById.get(candidateId);
      const attempt = candidateAttemptsById.get(candidateId);
      if (!candidate || !attempt) {
        return [];
      }
      return CONSUMERS.filter((consumer) => candidateAppliesToConsumer(candidate, consumer))
        .map((consumer) => ({
          candidate_id: candidateId,
          consumer_id: consumer.id,
          rank: consumer.rank,
          target: consumer.target,
          provider_source_status: candidate.provider_source_status ?? null,
          same_domain_record_ref: candidate.same_domain_record_ref ?? null,
          source_term_refs_upstream_of_aggregate_p:
            candidate.source_term_refs_upstream_of_aggregate_p ?? null,
          aggregate_erasure_negative_control_ref:
            candidate.aggregate_erasure_negative_control_ref ?? null,
          source_contract_readout: isObject(candidate.source_contract_readout)
            ? candidate.source_contract_readout
            : null,
          construction_attempt_ready: attempt.provider_object_fields_ready,
          provider_ready_authorized_by_this_attempt: false,
          downstream_consumer_authorization: false,
          first_failure:
            evaluateCandidateForConsumer(candidate, consumer).first_failure,
          missing_construction_fields: constructionMissingFields(attempt),
          consumer_specific_missing_fields: consumerSpecificMissingFields(
            candidate,
            consumer
          ),
        }));
    });
}

function buildConstructionAttempt(manifest) {
  const candidateAttempts = manifest.candidates.map(evaluateConstructionAttemptCandidate);
  const candidateAttemptsById = new Map(
    candidateAttempts.map((candidate) => [candidate.candidate_id, candidate])
  );
  const manifestCandidatesById = new Map(
    manifest.candidates.map((candidate) => [candidate.id ?? null, candidate])
  );
  const readyCandidateIds = candidateAttempts
    .filter((candidate) => candidate.provider_object_fields_ready)
    .map((candidate) => candidate.candidate_id)
    .filter(Boolean);
  const missingFieldUnion = unique(
    candidateAttempts.flatMap((candidate) => candidate.missing_or_rejected_fields)
  );
  const firstFailure =
    readyCandidateIds.length > 0
      ? null
      : candidateAttempts.find((candidate) => candidate.first_failure)?.first_failure
        ?? "provider_candidate_absent";

  return {
    schema: CONSTRUCTION_ATTEMPT_SCHEMA,
    claim_level: "priority-only construction attempt, not provider acceptance",
    source_ref: manifest.source_ref ?? null,
    target:
      "same-domain branch-bearing provider object before aggregate P is consumed",
    status:
      readyCandidateIds.length > 0
        ? "same_domain_branch_provider_object_fields_populated_review_required"
        : "same_domain_branch_provider_object_construction_blocked",
    first_failure: firstFailure,
    accepted_source_status_required: ACCEPTED_SOURCE_STATUS,
    required_fields: PROVIDER_OBJECT_CONSTRUCTION_FIELDS.map(fieldContractEntry),
    summary: {
      candidate_count: candidateAttempts.length,
      ready_candidate_count: readyCandidateIds.length,
      ready_candidate_ids: readyCandidateIds,
      missing_or_rejected_field_union: missingFieldUnion,
    },
    candidate_attempts: candidateAttempts,
    consumer_construction_attempt_readouts: buildConsumerConstructionAttemptReadouts(
      manifestCandidatesById,
      candidateAttemptsById
    ),
    authorization: {
      provider_ready_authorized_by_this_attempt: false,
      downstream_consumer_authorization: false,
      candidate_h_recovery: false,
      pressure_coefficient: false,
      structural_integrity_residual_vector: false,
      retained_branch_claim: false,
    },
  };
}

export function buildReport(manifest, options = {}) {
  if (!isObject(manifest)) {
    throw new Error("Branch-provider evidence manifest must be a JSON object.");
  }
  if (!Array.isArray(manifest.candidates)) {
    throw new Error("Branch-provider evidence manifest must include candidates array.");
  }

  const candidateResults = manifest.candidates.map(evaluateCandidate);
  const consumerResults = CONSUMERS.map((consumer) => {
    const applicable = candidateResults
      .flatMap((candidate) =>
        candidate.consumer_results.map((result) => ({
          ...result,
          candidate_id: candidate.id,
        }))
      )
      .filter((result) => result.consumer_id === consumer.id);
    const accepted = applicable.filter((result) => result.provider_ready);
    const firstFailure =
      accepted.length > 0
        ? null
        : applicable.find((result) => result.first_failure)?.first_failure ?? "provider_candidate_absent";
    return {
      consumer_id: consumer.id,
      rank: consumer.rank,
      workstream: consumer.workstream,
      target: consumer.target,
      provider_ready: accepted.length > 0,
      accepted_candidate_ids: accepted.map((result) => result.candidate_id),
      candidate_count: applicable.length,
      first_failure: firstFailure,
      missing_or_rejected_fields: unique(
        applicable.flatMap((result) => result.missing_or_rejected_fields)
      ),
    };
  });
  const providerReadyConsumerCount = consumerResults.filter((consumer) => consumer.provider_ready).length;
  const acceptedCandidateIds = unique(
    consumerResults.flatMap((consumer) => consumer.accepted_candidate_ids)
  );

  const authorization = Object.fromEntries(
    CONSUMERS.map((consumer) => [
      consumer.authorizationKey,
      consumerResults.find((result) => result.consumer_id === consumer.id)?.provider_ready === true,
    ])
  );

  return {
    schema: SCHEMA,
    source_ref: options.sourceRef ?? manifest.source_ref ?? null,
    manifest_schema: manifest.schema ?? null,
    report_id: manifest.report_id ?? "branch-provider-evidence-current-candidates",
    promotion_status: "priority-only",
    provider_object_construction_attempt: buildConstructionAttempt(manifest),
    provider_verdict:
      providerReadyConsumerCount > 0
        ? "provider_ready_for_one_or_more_consumers"
        : "same_domain_branch_provider_missing",
    first_failure:
      providerReadyConsumerCount > 0
        ? null
        : consumerResults.find((consumer) => consumer.first_failure)?.first_failure ?? "provider_candidate_absent",
    summary: {
      candidate_count: candidateResults.length,
      consumer_count: consumerResults.length,
      provider_ready_consumer_count: providerReadyConsumerCount,
      accepted_candidate_ids: acceptedCandidateIds,
    },
    consumer_results: consumerResults,
    candidate_results: candidateResults,
    authorization: {
      ...authorization,
      candidate_h_recovery: false,
      pressure_coefficient: false,
      structural_integrity_residual_vector: false,
      retained_branch_claim: false,
    },
    not_authorized: [
      "does not run field_speed_action_self_hit_scan/v0",
      "does not populate pressure-response coefficients",
      "does not populate moving_retained_branch_certificate/v0",
      "does not certify bounded-speed branch retention",
      "does not authorize a retained branch claim",
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
  if (!["same_domain_branch_provider_missing", "provider_ready_for_one_or_more_consumers"].includes(report.provider_verdict)) {
    errors.push("provider_verdict is invalid");
  }
  if (report.provider_verdict === "same_domain_branch_provider_missing" && typeof report.first_failure !== "string") {
    errors.push("missing-provider reports must carry first_failure");
  }
  if (report.provider_verdict === "provider_ready_for_one_or_more_consumers" && report.first_failure !== null) {
    errors.push("provider-ready reports must not carry first_failure");
  }
  if (!Array.isArray(report.consumer_results)) {
    errors.push("consumer_results must be an array");
  }
  if (!Array.isArray(report.candidate_results)) {
    errors.push("candidate_results must be an array");
  }
  if (!isObject(report.authorization)) {
    errors.push("authorization must be an object");
  }
  if (!isObject(report.provider_object_construction_attempt)) {
    errors.push("provider_object_construction_attempt must be an object");
  } else {
    const attempt = report.provider_object_construction_attempt;
    if (attempt.schema !== CONSTRUCTION_ATTEMPT_SCHEMA) {
      errors.push(`provider_object_construction_attempt schema must be ${CONSTRUCTION_ATTEMPT_SCHEMA}`);
    }
    if (attempt.claim_level !== "priority-only construction attempt, not provider acceptance") {
      errors.push("provider_object_construction_attempt claim_level must remain priority-only");
    }
    if (![
      "same_domain_branch_provider_object_construction_blocked",
      "same_domain_branch_provider_object_fields_populated_review_required",
    ].includes(attempt.status)) {
      errors.push("provider_object_construction_attempt status is invalid");
    }
    if (attempt.authorization?.provider_ready_authorized_by_this_attempt !== false) {
      errors.push("provider_object_construction_attempt must not authorize provider readiness");
    }
    if (attempt.authorization?.downstream_consumer_authorization !== false) {
      errors.push("provider_object_construction_attempt must not authorize downstream consumers");
    }
    if (!Array.isArray(attempt.consumer_construction_attempt_readouts)) {
      errors.push("provider_object_construction_attempt consumer readouts must be an array");
    } else {
      for (const readout of attempt.consumer_construction_attempt_readouts) {
        if (readout?.provider_ready_authorized_by_this_attempt !== false) {
          errors.push("consumer construction-attempt readouts must not authorize provider readiness");
          break;
        }
        if (readout?.downstream_consumer_authorization !== false) {
          errors.push("consumer construction-attempt readouts must not authorize downstream consumers");
          break;
        }
        const readoutErrors = sourceContractReadoutValidationErrors(
          readout?.source_contract_readout,
          "consumer construction-attempt source-contract readout"
        );
        if (readoutErrors.length > 0) {
          errors.push(...readoutErrors);
          break;
        }
      }
    }
    if (Array.isArray(attempt.candidate_attempts)) {
      for (const candidateAttempt of attempt.candidate_attempts) {
        const readoutErrors = sourceContractReadoutValidationErrors(
          candidateAttempt?.source_contract_readout,
          "construction-attempt candidate source-contract readout"
        );
        if (readoutErrors.length > 0) {
          errors.push(...readoutErrors);
          break;
        }
      }
    }
  }
  for (const key of [
    "candidate_h_recovery",
    "pressure_coefficient",
    "structural_integrity_residual_vector",
    "retained_branch_claim",
  ]) {
    if (report.authorization?.[key] !== false) {
      errors.push(`${key} must remain false`);
    }
  }
  if (isObject(report.summary)) {
    const readyCount = report.consumer_results?.filter?.((consumer) => consumer.provider_ready === true).length;
    if (Number.isFinite(readyCount) && report.summary.provider_ready_consumer_count !== readyCount) {
      errors.push("summary provider_ready_consumer_count must match consumer_results");
    }
  }
  return errors;
}

function validateReport(filePath) {
  const report = readJson(filePath);
  const errors = validationErrors(report);
  return {
    valid: errors.length === 0,
    errors,
    schema: report.schema ?? null,
    provider_verdict: report.provider_verdict ?? null,
    first_failure: report.first_failure ?? null,
  };
}

function emitJson(value, args) {
  const json = JSON.stringify(value, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.printContract) {
    emitJson(contract(), args);
    return;
  }
  if (args.validate) {
    emitJson(validateReport(args.validate), args);
    return;
  }
  if (!args.input) {
    throw new Error("--input is required unless --validate or --print-contract is used.");
  }
  const manifest = readJson(args.input);
  if (manifest.schema && manifest.schema !== MANIFEST_SCHEMA) {
    throw new Error(`manifest schema must be ${MANIFEST_SCHEMA}`);
  }
  const report = buildReport(manifest, { sourceRef: args.input });
  const errors = validationErrors(report);
  if (errors.length > 0) {
    report.validation_errors = errors;
  }
  emitJson(report, args);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { ACCEPTED_SOURCE_STATUS, COMMON_REQUIRED_FIELDS, CONSUMERS, contract, validateReport };
