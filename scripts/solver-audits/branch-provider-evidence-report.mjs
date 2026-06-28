#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCHEMA = "branch_provider_evidence_report/v0";
const CONTRACT_SCHEMA = "branch_provider_evidence_contract/v0";
const MANIFEST_SCHEMA = "branch_provider_evidence_candidates/v0";

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

function contract() {
  return {
    schema: CONTRACT_SCHEMA,
    purpose:
      "Minimum same-domain branch-bearing provider fields before top-six consumers may treat a candidate row as provider-ready.",
    accepted_source_status: ACCEPTED_SOURCE_STATUS,
    common_required_fields: COMMON_REQUIRED_FIELDS.map(({ path: fieldPath, requirement, failureCode, acceptedValues }) => ({
      path: fieldPath,
      requirement,
      failure_code: failureCode,
      accepted_values: acceptedValues ?? null,
    })),
    consumers: CONSUMERS.map((consumer) => ({
      id: consumer.id,
      rank: consumer.rank,
      workstream: consumer.workstream,
      target: consumer.target,
      required_fields: consumer.requiredFields.map(({ path: fieldPath, requirement, failureCode, acceptedValues }) => ({
        path: fieldPath,
        requirement,
        failure_code: failureCode,
        accepted_values: acceptedValues ?? null,
      })),
    })),
    authorization_boundary: {
      provider_ready_is_not_downstream_closure: true,
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
