#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const PROOF_INTERVAL = "proof-interval-v6";
const LAMBDA_BRANCH = "lambda0305";
const TARGET_SLOT = "Sigma_hf_01";
const FOLD_INTERVAL = "F01";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const OUTPUT_STEM =
  "sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const OUTPUT_JSON = `${OUTPUT_STEM}.json`;
const OUTPUT_REPORT = `${OUTPUT_STEM}_report.md`;
const LOCAL_CANDIDATE_STEM =
  "sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const LOCAL_CANDIDATE_JSON = `${LOCAL_CANDIDATE_STEM}.json`;
const LOCAL_CANDIDATE_REPORT = `${LOCAL_CANDIDATE_STEM}_report.md`;
const PLACEHOLDER_REJECTION_CANDIDATE_STEM =
  "sigma_hf_01_external_schema_candidate.local-missing-proof-grade-placeholders-rejected.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const PLACEHOLDER_REJECTION_CANDIDATE_JSON = `${PLACEHOLDER_REJECTION_CANDIDATE_STEM}.json`;
const PLACEHOLDER_REJECTION_CANDIDATE_REPORT = `${PLACEHOLDER_REJECTION_CANDIDATE_STEM}_report.md`;
const PLACEHOLDER_REJECTION_RECORD_STEM =
  "sigma_hf_01_external_schema_candidate.placeholder-rejection-intake-record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const PLACEHOLDER_REJECTION_RECORD_JSON = `${PLACEHOLDER_REJECTION_RECORD_STEM}.json`;
const PLACEHOLDER_REJECTION_RECORD_REPORT = `${PLACEHOLDER_REJECTION_RECORD_STEM}_report.md`;
const PROOF_OBJECT_ENVELOPE_STEM =
  "sigma_hf_01_external_schema_candidate.proof-object-envelope.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const PROOF_OBJECT_ENVELOPE_JSON = `${PROOF_OBJECT_ENVELOPE_STEM}.json`;
const PROOF_OBJECT_ENVELOPE_REPORT = `${PROOF_OBJECT_ENVELOPE_STEM}_report.md`;
const MISSING_FIELDS_TARGET_STEM =
  "sigma_hf_01_external_schema_candidate.missing-proof-grade-fields-derivation-target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305";
const MISSING_FIELDS_TARGET_JSON = `${MISSING_FIELDS_TARGET_STEM}.json`;
const MISSING_FIELDS_TARGET_REPORT = `${MISSING_FIELDS_TARGET_STEM}_report.md`;

const DEFAULT_SOURCE_DATA_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SCHEMA_TARGET = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT_SATISFACTION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;

const COMPATIBLE_SCHEMA_ROLE =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema";
const COMPATIBLE_PROOF_OBJECT_ROLE = "source_packet_acceptance_rule_derivation_proof_object";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";
const PAYLOAD_SCHEMA_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema_absent";
const DERIVATION_PROOF_BLOCKER = "source_packet_acceptance_rule_derivation_proof_absent";
const RULE_KERNEL_PAYLOAD_BLOCKER =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_absent";

const REQUIRED_FIELDS = [
  "compatible_schema_role_lock",
  "compatible_proof_object_role_lock",
  "derivation_proof_target_lock",
  "derivation_proof_source_data_record_lock",
  "rule_kernel_obligation_binding",
  "rule_kernel_derivation_payload_target_binding",
  "proof_grade_derivation_schema_statement",
  "non_reinterpretation_guard",
];

const EXPECTED_LOCKS = {
  packet_id: PACKET_ID,
  proof_interval: PROOF_INTERVAL,
  lambda_branch: LAMBDA_BRANCH,
  target_slot: TARGET_SLOT,
  fold_interval: FOLD_INTERVAL,
};

const REQUIRED_SCHEMA_FORBIDDEN_REINTERPRETATIONS = [
  "rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_as_proof_grade_derivation_schema",
  "rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_as_proof_grade_derivation_schema",
  "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
  "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
  "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_proof_grade_derivation_schema",
  "source_packet_acceptance_rule_kernel_binding_split_classifier_as_proof_grade_derivation_schema",
];

function parseArgs(argv) {
  const args = {
    candidate: null,
    outDir: CERT_DIR,
    validate: null,
    localSourceCandidate: false,
    placeholderRejectionCandidate: false,
    proofObjectEnvelope: false,
    missingProofGradeFieldsTarget: false,
    sourceDataReadiness: DEFAULT_SOURCE_DATA_READINESS,
    schemaTarget: DEFAULT_SCHEMA_TARGET,
    contractSatisfaction: DEFAULT_CONTRACT_SATISFACTION,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--candidate") {
      args.candidate = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--validate") {
      args.validate = argv[++i];
    } else if (arg === "--local-source-candidate") {
      args.localSourceCandidate = true;
    } else if (arg === "--placeholder-rejection-candidate") {
      args.placeholderRejectionCandidate = true;
    } else if (arg === "--proof-object-envelope") {
      args.proofObjectEnvelope = true;
    } else if (arg === "--missing-proof-grade-fields-target") {
      args.missingProofGradeFieldsTarget = true;
    } else if (arg === "--source-data-readiness") {
      args.sourceDataReadiness = argv[++i];
    } else if (arg === "--schema-target") {
      args.schemaTarget = argv[++i];
    } else if (arg === "--contract-satisfaction") {
      args.contractSatisfaction = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs [options]

Options:
  --candidate PATH  Optional candidate external schema JSON to test against the Sigma_hf_01 intake predicate.
  --local-source-candidate
                    Emit the local source-data partial candidate plus its intake record.
  --placeholder-rejection-candidate
                    Emit a local missing-proof-grade-field placeholder rejection candidate plus its intake record.
  --proof-object-envelope
                    Emit a fail-closed Sigma_hf_01 proof-object envelope target.
  --missing-proof-grade-fields-target
                    Emit a target-only derivation packet for the three missing proof-grade fields.
  --source-data-readiness PATH
                    Source-data readiness JSON for --local-source-candidate.
  --schema-target PATH
                    Schema target JSON for --local-source-candidate.
  --contract-satisfaction PATH
                    Contract-satisfaction JSON for --local-source-candidate.
  --out-dir PATH    Output directory. Defaults to ${CERT_DIR}.
  --validate PATH   Validate an emitted Sigma_hf_01 intake record.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

Default mode emits the current fail-closed absent-input record plus a Markdown
report. A complete candidate can only move the separator slot to schema
validation intake; it does not consume rows or authorize a branch chart.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function sourceRef(role, filePath) {
  return {
    role,
    path: filePath,
    basename: path.basename(filePath),
    sha256: sha256File(filePath),
  };
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

function lockMismatch(candidate) {
  return Object.entries(EXPECTED_LOCKS)
    .filter(([key, expected]) => candidate[key] !== undefined && candidate[key] !== expected)
    .map(([key, expected]) => ({ key, expected, actual: candidate[key] }));
}

function fieldString(value) {
  if (typeof value === "string") {
    return value;
  }
  if (isObject(value) && typeof value.value === "string") {
    return value.value;
  }
  return null;
}

function hasExpectedString(candidate, field, expected) {
  return fieldString(candidate[field]) === expected;
}

function hasSourceDataRecordLock(value) {
  return (
    isObject(value) &&
    value.separator_event === TARGET_SLOT &&
    value.fold_interval === FOLD_INTERVAL &&
    value.derivation_proof_target === DERIVATION_PROOF_TARGET &&
    value.derivation_proof_source_data_record_declared === true &&
    value.derivation_proof_source_data_ready === true
  );
}

function hasRuleKernelObligationBinding(value) {
  return (
    isObject(value) &&
    value.derivation_proof_obligation === "discharged" &&
    value.soundness_proof_obligation === "discharged" &&
    value.endpoint_application_proof_obligation === "discharged"
  );
}

function hasPayloadTargetBinding(value) {
  return (
    isObject(value) &&
    value.slot === TARGET_SLOT &&
    value.payload_target_declared === true &&
    value.proof_binds_to_payload_target === true &&
    value.rule_kernel_derivation_payload_constructed === true
  );
}

function hasSchemaStatement(value) {
  return (
    isObject(value) &&
    Array.isArray(value.hypotheses) &&
    value.hypotheses.length > 0 &&
    Array.isArray(value.inference_steps) &&
    value.inference_steps.length > 0 &&
    present(value.conclusion) &&
    present(value.source_data_correspondence)
  );
}

function hasNonReinterpretationGuard(value) {
  if (!isObject(value) || !Array.isArray(value.forbidden_reinterpretations)) {
    return false;
  }
  const forbidden = new Set(value.forbidden_reinterpretations);
  return REQUIRED_SCHEMA_FORBIDDEN_REINTERPRETATIONS.every((entry) => forbidden.has(entry));
}

function fieldVerdict(candidate, field) {
  const candidateFieldSupplied = present(candidate[field]);
  const checks = {
    compatible_schema_role_lock: () => hasExpectedString(candidate, field, COMPATIBLE_SCHEMA_ROLE),
    compatible_proof_object_role_lock: () => hasExpectedString(candidate, field, COMPATIBLE_PROOF_OBJECT_ROLE),
    derivation_proof_target_lock: () => hasExpectedString(candidate, field, DERIVATION_PROOF_TARGET),
    derivation_proof_source_data_record_lock: () => hasSourceDataRecordLock(candidate[field]),
    rule_kernel_obligation_binding: () => hasRuleKernelObligationBinding(candidate[field]),
    rule_kernel_derivation_payload_target_binding: () => hasPayloadTargetBinding(candidate[field]),
    proof_grade_derivation_schema_statement: () => hasSchemaStatement(candidate[field]),
    non_reinterpretation_guard: () => hasNonReinterpretationGuard(candidate[field]),
  };
  const isPresent = checks[field]();
  return {
    field,
    present: isPresent,
    candidate_field_supplied: candidateFieldSupplied,
    verdict: isPresent ? "present_on_candidate_for_intake_screen" : "external_input_required",
  };
}

function candidateTextMarkers(candidate, candidateRef) {
  return [
    candidate.schema,
    candidate.status,
    candidate.candidate_status,
    candidate.candidate_origin,
    candidate.artifact_id,
    candidateRef,
  ]
    .filter((value) => typeof value === "string")
    .map((value) => value.toLowerCase());
}

function isKnownLocalNonExternalArtifact(candidate, candidateRef) {
  if (!isObject(candidate)) {
    return false;
  }
  if (
    candidate.used_as_external_schema === false ||
    candidate.used_as_proof_grade_schema === false
  ) {
    return true;
  }
  const markers = candidateTextMarkers(candidate, candidateRef).join(" ");
  return [
    "not_external",
    "local-source-data-partial",
    "local-placeholder",
    "placeholder-rejection",
    "proof-object-envelope",
    "missing-proof-grade-fields-derivation-target",
    "current_pool_absence_classifier",
  ].some((marker) => markers.includes(marker));
}

export function buildRecord(candidate = null, options = {}) {
  const candidateInput = candidate && isObject(candidate) ? candidate : {};
  const mismatches = lockMismatch(candidateInput);
  const candidateRef =
    candidateInput.candidate_external_schema_ref ?? candidateInput.source_ref ?? options.candidateRef ?? null;
  const knownLocalNonExternalArtifact = isKnownLocalNonExternalArtifact(
    candidateInput,
    candidateRef,
  );
  const candidateReceived =
    candidateRef !== null && mismatches.length === 0 && !knownLocalNonExternalArtifact;
  const fieldResults = REQUIRED_FIELDS.map((field) => fieldVerdict(candidateInput, field));
  const presentCount = fieldResults.filter((field) => field.present).length;
  const missingFields = fieldResults.filter((field) => !field.present).map((field) => field.field);
  const suppliedButRejectedFields = fieldResults
    .filter((field) => field.candidate_field_supplied && !field.present)
    .map((field) => field.field);
  const allFieldsPresent = presentCount === REQUIRED_FIELDS.length;
  const slotResult =
    candidateReceived && allFieldsPresent
      ? "external_schema_input_received_for_schema_validation"
      : "external_input_required";

  return {
    schema: "sigma_hf_01_external_schema_candidate_intake_record/v0",
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: TARGET_SLOT,
    fold_interval: FOLD_INTERVAL,
    candidate_external_schema_ref: candidateRef,
    candidate_external_schema_received: candidateReceived,
    candidate_file_screened: candidateRef !== null,
    candidate_known_local_non_external_artifact: knownLocalNonExternalArtifact,
    required_fields_total: REQUIRED_FIELDS.length,
    required_fields_present: presentCount,
    missing_fields: missingFields,
    supplied_but_rejected_fields: suppliedButRejectedFields,
    first_missing_field: missingFields[0] ?? null,
    lock_mismatches: mismatches,
    field_results: fieldResults,
    slot_result: slotResult,
    row_slots_parked: 11,
    row_consumption_count: 0,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    authorization: {
      schema_validation_intake: slotResult === "external_schema_input_received_for_schema_validation",
      row_consumption: false,
      accepted_source_packet: false,
      branch_chart: false,
    },
    candidate_status: candidateInput.candidate_status ?? null,
    placeholder_rejection: candidateInput.placeholder_rejection ?? null,
    candidate_file_ref: options.candidateRef ?? null,
  };
}

export function buildLocalSourceDataCandidate(sourceDataReadiness, schemaTarget, contractSatisfaction, sourceRefs = []) {
  const sourceProfile =
    sourceDataReadiness.separator_source_packet_acceptance_rule_derivation_proof_source_data_readiness_profiles?.find(
      (profile) => profile.separator_event === TARGET_SLOT && profile.fold_interval === FOLD_INTERVAL,
    );
  const schemaProfile =
    schemaTarget.separator_rule_kernel_payload_proof_grade_derivation_schema_target_profiles?.find(
      (profile) => profile.separator_event === TARGET_SLOT && profile.fold_interval === FOLD_INTERVAL,
    );
  const contractProfile =
    contractSatisfaction.separator_source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_profiles?.find(
      (profile) => profile.separator_event === TARGET_SLOT && profile.fold_interval === FOLD_INTERVAL,
    );

  if (!sourceProfile || !schemaProfile || !contractProfile) {
    throw new Error("Missing Sigma_hf_01 source-data, schema-target, or contract-satisfaction profile.");
  }

  return {
    schema: "sigma_hf_01_external_schema_candidate/v0",
    candidate_status: "partial_local_source_data_candidate_not_external_proof_grade",
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: TARGET_SLOT,
    fold_interval: FOLD_INTERVAL,
    candidate_external_schema_ref: `local-source-data-partial:${TARGET_SLOT}:${PACKET_ID}:${PROOF_INTERVAL}:${LAMBDA_BRANCH}`,
    candidate_origin: "local_source_data_records_and_fail_closed_target_packets",
    source_refs: sourceRefs,
    compatible_schema_role_lock: COMPATIBLE_SCHEMA_ROLE,
    compatible_proof_object_role_lock: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target_lock: DERIVATION_PROOF_TARGET,
    derivation_proof_source_data_record_lock: {
      separator_event: TARGET_SLOT,
      fold_interval: FOLD_INTERVAL,
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      derivation_proof_source_data_record_declared:
        sourceProfile.derivation_proof_source_data_record?.derivation_proof_source_data_record_declared === true,
      derivation_proof_source_data_ready:
        sourceProfile.derivation_proof_source_data_record?.derivation_proof_source_data_ready === true,
      source_material_premises_complete: sourceProfile.source_material_premises_complete === true,
      candidate_exact_consistency_premises_complete:
        sourceProfile.candidate_exact_consistency_premises_complete === true,
    },
    non_reinterpretation_guard: {
      guard_status: "source_available_fail_closed_non_reinterpretation_guard",
      forbidden_reinterpretations: REQUIRED_SCHEMA_FORBIDDEN_REINTERPRETATIONS,
      row_consumption_count: 0,
      preledger_pass: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
    },
    absent_required_fields: [
      {
        field: "rule_kernel_obligation_binding",
        blocker: DERIVATION_PROOF_BLOCKER,
        source_status: "retained_rule_kernel_obligation_slots_satisfied=0",
      },
      {
        field: "rule_kernel_derivation_payload_target_binding",
        blocker: RULE_KERNEL_PAYLOAD_BLOCKER,
        source_status: "rule_kernel_derivation_payload_present=false",
      },
      {
        field: "proof_grade_derivation_schema_statement",
        blocker: PAYLOAD_SCHEMA_BLOCKER,
        source_status: "proof_grade_derivation_schema_present=false",
      },
    ],
    source_readout: {
      source_data_ready: sourceProfile.derivation_proof_source_data_records_ready === 1,
      schema_target_declared: schemaProfile.schema_target_record?.schema_target_declared === true,
      schema_target_satisfied: schemaProfile.schema_target_record?.schema_target_satisfied === true,
      proof_grade_derivation_schema_present:
        schemaProfile.schema_target_record?.proof_grade_derivation_schema_present === true,
      contract_field_source_availability_slots_ready:
        contractProfile.contract_field_availability_record?.contract_field_source_availability_slots_ready,
      contract_field_slots_satisfied:
        contractProfile.contract_field_availability_record?.contract_field_slots_satisfied,
      first_missing_contract_field:
        contractProfile.contract_field_availability_record?.first_missing_contract_field,
      first_missing_contract_field_blocker:
        contractProfile.contract_field_availability_record?.first_missing_contract_field_blocker,
    },
    authorization: {
      schema_validation_intake: false,
      row_consumption: false,
      accepted_source_packet: false,
      branch_chart: false,
    },
  };
}

export function buildPlaceholderRejectionCandidate(sourceDataReadiness, schemaTarget, contractSatisfaction, sourceRefs = []) {
  const candidate = buildLocalSourceDataCandidate(sourceDataReadiness, schemaTarget, contractSatisfaction, sourceRefs);
  const placeholderFields = [
    "rule_kernel_obligation_binding",
    "rule_kernel_derivation_payload_target_binding",
    "proof_grade_derivation_schema_statement",
  ];

  return {
    ...candidate,
    candidate_status: "local_missing_proof_grade_field_placeholders_rejected_not_external_schema",
    candidate_external_schema_ref: `local-placeholder-rejection:${TARGET_SLOT}:${PACKET_ID}:${PROOF_INTERVAL}:${LAMBDA_BRANCH}`,
    candidate_origin: "local_source_data_records_with_rejected_missing_proof_grade_field_placeholders",
    placeholder_rejection: {
      status: "local_missing_proof_grade_field_placeholders_rejected_not_external_schema",
      placeholder_fields: placeholderFields,
      required_fields_expected_after_rejection: 5,
      slot_result_expected_after_rejection: "external_input_required",
      schema_validation_intake: false,
      row_consumption: false,
      updates_live_ledger: false,
      branch_chart_authorized: false,
    },
    rule_kernel_obligation_binding: {
      placeholder_status: "placeholder_rejected_not_rule_kernel_obligation_binding",
      derivation_proof_obligation: "placeholder_not_discharged",
      soundness_proof_obligation: "placeholder_not_discharged",
      endpoint_application_proof_obligation: "placeholder_not_discharged",
    },
    rule_kernel_derivation_payload_target_binding: {
      placeholder_status: "placeholder_rejected_not_rule_kernel_derivation_payload_target_binding",
      slot: TARGET_SLOT,
      payload_target_declared: false,
      proof_binds_to_payload_target: false,
      rule_kernel_derivation_payload_constructed: false,
    },
    proof_grade_derivation_schema_statement: {
      placeholder_status: "placeholder_rejected_not_proof_grade_derivation_schema_statement",
      hypotheses: [],
      inference_steps: [],
      conclusion: "",
      source_data_correspondence: "",
    },
  };
}

export function buildProofObjectEnvelope(sourceDataReadiness, schemaTarget, contractSatisfaction, sourceRefs = []) {
  const candidate = buildLocalSourceDataCandidate(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
    sourceRefs,
  );
  const record = buildRecord(candidate);
  const presentFields = record.field_results
    .filter((field) => field.present)
    .map((field) => field.field);
  return {
    schema: "sigma_hf_01_external_schema_candidate_proof_object_envelope/v0",
    status:
      "sigma_hf_01_external_schema_candidate_proof_object_envelope_open_5_of_8_local_locks_bound_3_proof_grade_fields_required_no_schema_validation_intake_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization",
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: TARGET_SLOT,
    fold_interval: FOLD_INTERVAL,
    candidate_external_schema_received: false,
    local_source_candidate_status: candidate.candidate_status,
    required_fields_total: record.required_fields_total,
    required_fields_present: record.required_fields_present,
    local_locks_bound: presentFields,
    missing_fields: record.missing_fields,
    proof_grade_fields_required: record.missing_fields,
    slot_result: record.slot_result,
    row_slots_parked: record.row_slots_parked,
    row_consumption_count: record.row_consumption_count,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    authorization: {
      schema_validation_intake: false,
      row_consumption: false,
      accepted_source_packet: false,
      branch_chart: false,
    },
    intake_record_summary: {
      schema: record.schema,
      candidate_external_schema_received: record.candidate_external_schema_received,
      required_fields_present: record.required_fields_present,
      missing_fields: record.missing_fields,
      supplied_but_rejected_fields: record.supplied_but_rejected_fields,
      slot_result: record.slot_result,
    },
    source_readout: candidate.source_readout,
    source_refs: sourceRefs,
    used_as_external_schema: false,
    used_as_proof_grade_schema: false,
  };
}

export function buildMissingProofGradeFieldsDerivationTarget(
  sourceDataReadiness,
  schemaTarget,
  contractSatisfaction,
  sourceRefs = [],
) {
  const envelope = buildProofObjectEnvelope(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
    sourceRefs,
  );
  const targetedMissingFields = [
    {
      field: "rule_kernel_obligation_binding",
      status: "proof_grade_external_input_required",
      required_predicates: [
        "derivation_proof_obligation",
        "soundness_proof_obligation",
        "endpoint_application_proof_obligation",
      ],
      local_placeholder_satisfies_field: false,
      current_pool_absence_satisfies_field: false,
    },
    {
      field: "rule_kernel_derivation_payload_target_binding",
      status: "proof_grade_external_input_required",
      required_predicates: [
        "slot=Sigma_hf_01",
        "payload_target_declared=true",
        "proof_binds_to_payload_target=true",
        "rule_kernel_derivation_payload_constructed=true",
      ],
      local_placeholder_satisfies_field: false,
      current_pool_absence_satisfies_field: false,
    },
    {
      field: "proof_grade_derivation_schema_statement",
      status: "proof_grade_external_input_required",
      required_predicates: [
        "hypotheses_nonempty",
        "inference_steps_nonempty",
        "conclusion_nonempty",
        "source_data_correspondence_nonempty",
      ],
      local_placeholder_satisfies_field: false,
      current_pool_absence_satisfies_field: false,
    },
  ];

  return {
    schema:
      "sigma_hf_01_external_schema_candidate_missing_proof_grade_fields_derivation_target/v0",
    status:
      "priority-only-missing-proof-grade-fields-derivation-target-open_5_of_8_local_locks_bound_3_fields_targeted_no_external_schema_received_no_schema_validation_intake_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization",
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: TARGET_SLOT,
    fold_interval: FOLD_INTERVAL,
    basis_envelope_ref: `${CERT_DIR}/${PROOF_OBJECT_ENVELOPE_JSON}`,
    basis_intake_record_ref: `${CERT_DIR}/${OUTPUT_JSON}`,
    candidate_external_schema_received: false,
    required_fields_total: envelope.required_fields_total,
    required_fields_present: envelope.required_fields_present,
    local_locks_bound: envelope.local_locks_bound,
    targeted_missing_fields: targetedMissingFields,
    missing_field_count: targetedMissingFields.length,
    shared_carrier_target:
      "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload",
    slot_result: envelope.slot_result,
    row_slots_parked: envelope.row_slots_parked,
    row_consumption_count: envelope.row_consumption_count,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    authorization: {
      schema_validation_intake: false,
      row_consumption: false,
      accepted_source_packet: false,
      branch_chart: false,
    },
    local_placeholders_satisfy_target: false,
    current_pool_absence_satisfies_target: false,
    used_as_external_schema: false,
    used_as_proof_grade_schema: false,
    source_refs: sourceRefs,
  };
}

export function validationErrors(record) {
  const errors = [];
  if (!isObject(record)) {
    return ["record must be an object"];
  }
  if (record.schema !== "sigma_hf_01_external_schema_candidate_intake_record/v0") {
    errors.push("schema must be sigma_hf_01_external_schema_candidate_intake_record/v0");
  }
  for (const [key, expected] of Object.entries(EXPECTED_LOCKS)) {
    if (record[key] !== expected) {
      errors.push(`${key} must be ${expected}`);
    }
  }
  if (record.required_fields_total !== REQUIRED_FIELDS.length) {
    errors.push(`required_fields_total must be ${REQUIRED_FIELDS.length}`);
  }
  if (!Number.isInteger(record.required_fields_present) || record.required_fields_present < 0) {
    errors.push("required_fields_present must be a nonnegative integer");
  }
  if (!["external_input_required", "external_schema_input_received_for_schema_validation"].includes(record.slot_result)) {
    errors.push("slot_result is not recognized");
  }
  if (record.slot_result === "external_schema_input_received_for_schema_validation") {
    if (record.candidate_external_schema_received !== true || record.required_fields_present !== REQUIRED_FIELDS.length) {
      errors.push("schema-validation intake requires a received candidate with all eight fields present");
    }
  }
  if (record.row_slots_parked !== 11) {
    errors.push("row_slots_parked must remain 11");
  }
  if (record.row_consumption_count !== 0) {
    errors.push("row_consumption_count must remain 0");
  }
  if (record.preledger_pass !== false || record.updates_live_ledger !== false) {
    errors.push("preledger/live-ledger locks must remain false");
  }
  if (record.branch_chart_authorized !== false) {
    errors.push("branch_chart_authorized must remain false");
  }
  if (record.authorization?.row_consumption !== false) {
    errors.push("authorization.row_consumption must remain false");
  }
  if (record.authorization?.accepted_source_packet !== false) {
    errors.push("authorization.accepted_source_packet must remain false");
  }
  if (record.authorization?.branch_chart !== false) {
    errors.push("authorization.branch_chart must remain false");
  }
  if (record.placeholder_rejection?.status === "local_missing_proof_grade_field_placeholders_rejected_not_external_schema") {
    const expectedRejectedFields = [
      "rule_kernel_obligation_binding",
      "rule_kernel_derivation_payload_target_binding",
      "proof_grade_derivation_schema_statement",
    ];
    for (const field of expectedRejectedFields) {
      if (!record.supplied_but_rejected_fields?.includes(field)) {
        errors.push(`placeholder rejection must reject ${field}`);
      }
    }
    if (record.required_fields_present !== 5) {
      errors.push("placeholder rejection must leave required_fields_present at 5");
    }
    if (record.slot_result !== "external_input_required") {
      errors.push("placeholder rejection must leave slot_result external_input_required");
    }
    if (record.authorization?.schema_validation_intake !== false) {
      errors.push("placeholder rejection must not authorize schema_validation_intake");
    }
  }
  return errors;
}

function renderReport(record) {
  const rows = record.field_results
    .map((field) => {
      const reading = field.present
        ? "present"
        : field.candidate_field_supplied
          ? "supplied but rejected"
          : "absent";
      return `| \`${field.field}\` | ${reading} | \`${field.verdict}\` |`;
    })
    .join("\n");
  const placeholderSection = record.placeholder_rejection
    ? `
## Placeholder Rejection

- Status: \`${record.placeholder_rejection.status}\`
- Supplied but rejected fields: ${record.supplied_but_rejected_fields.map((field) => `\`${field}\``).join(", ")}
- Expected slot result after rejection: \`${record.placeholder_rejection.slot_result_expected_after_rejection}\`

These placeholders are local negative controls. They do not construct a proof-grade derivation schema, satisfy rule-kernel obligations, bind the payload target, consume rows, update the live ledger, or authorize a branch chart.
`
    : "";

  return `# Sigma_hf_01 External Schema Candidate Intake Record

Status: \`${record.slot_result}\`

## Scope

- Packet identity: \`${record.packet_id}\`
- Proof interval: \`${record.proof_interval}\`
- Lambda branch: \`${record.lambda_branch}\`
- Target slot: \`${record.target_slot}\`
- Fold interval: \`${record.fold_interval}\`
- Candidate external schema ref: ${record.candidate_external_schema_ref ? `\`${record.candidate_external_schema_ref}\`` : "absent"}
- Candidate external schema received: \`${record.candidate_external_schema_received}\`
- Candidate known local non-external artifact: \`${record.candidate_known_local_non_external_artifact}\`
- Candidate status: ${record.candidate_status ? `\`${record.candidate_status}\`` : "absent"}

## Intake Predicate

| Required field | Current reading | Verdict |
| --- | --- | --- |
${rows}

Current count: ${record.required_fields_present} / ${record.required_fields_total} required fields present.
First missing field: ${record.first_missing_field ? `\`${record.first_missing_field}\`` : "none"}.
${placeholderSection}

## Authorization Locks

- Slot result: \`${record.slot_result}\`
- Row slots parked: ${record.row_slots_parked}
- Row consumption count: ${record.row_consumption_count}
- \`preledger_pass\`: \`${record.preledger_pass}\`
- \`updates_live_ledger\`: \`${record.updates_live_ledger}\`
- Branch chart authorized: \`${record.branch_chart_authorized}\`

This record is priority-only. It does not construct or accept a proof-grade external schema, accept a source packet, consume rows, update the live ledger, or authorize a branch chart.
`;
}

function renderCandidateReport(candidate, record) {
  const fieldRows = record.field_results
    .map((field) => {
      const reading = field.present
        ? "present"
        : field.candidate_field_supplied
          ? "supplied but rejected"
          : "absent";
      return `| \`${field.field}\` | ${reading} | \`${field.verdict}\` |`;
    })
    .join("\n");
  const absentRows = candidate.absent_required_fields
    .map((field) => `| \`${field.field}\` | \`${field.blocker}\` | ${field.source_status} |`)
    .join("\n");
  const placeholderSection = candidate.placeholder_rejection
    ? `
## Placeholder Rejection

- Status: \`${candidate.placeholder_rejection.status}\`
- Placeholder fields: ${candidate.placeholder_rejection.placeholder_fields.map((field) => `\`${field}\``).join(", ")}
- Required fields after rejection: ${record.required_fields_present} / ${record.required_fields_total}
- Slot result after rejection: \`${record.slot_result}\`

The placeholder fields are intentionally supplied in forms that do not satisfy
the intake predicates. This proves local placeholders cannot replace the missing
external proof-grade derivation schema object.
`
    : "";

  return `# Sigma_hf_01 Local Source-Data Partial External Schema Candidate

Status: \`${candidate.candidate_status}\`

## Scope

- Packet identity: \`${candidate.packet_id}\`
- Proof interval: \`${candidate.proof_interval}\`
- Lambda branch: \`${candidate.lambda_branch}\`
- Target slot: \`${candidate.target_slot}\`
- Fold interval: \`${candidate.fold_interval}\`
- Candidate ref: \`${candidate.candidate_external_schema_ref}\`

## Candidate Field Screen

| Required field | Candidate reading | Verdict |
| --- | --- | --- |
${fieldRows}

Current count: ${record.required_fields_present} / ${record.required_fields_total} required fields present.
${placeholderSection}

## Missing Proof-Grade Fields

| Field | Blocker | Source status |
| --- | --- | --- |
${absentRows}

## Authorization Locks

- Slot result after intake: \`${record.slot_result}\`
- Row consumption count: ${record.row_consumption_count}
- \`preledger_pass\`: \`${record.preledger_pass}\`
- \`updates_live_ledger\`: \`${record.updates_live_ledger}\`
- Branch chart authorized: \`${record.branch_chart_authorized}\`

This candidate is an internally generated source-data partial, not a received
proof-grade external schema. It records the exact local fields available for
the \`Sigma_hf_01\` screen and keeps schema validation, row consumption,
live-ledger update, accepted-source-packet status, and branch-chart
authorization locked false.
`;
}

function renderProofObjectEnvelopeReport(envelope) {
  const localRows = envelope.local_locks_bound
    .map((field) => `| \`${field}\` | local lock bound |`)
    .join("\n");
  const missingRows = envelope.missing_fields
    .map((field) => `| \`${field}\` | proof-grade external input required |`)
    .join("\n");

  return `# Sigma_hf_01 Proof-Object Envelope

Status: \`${envelope.status}\`

## Scope

- Packet identity: \`${envelope.packet_id}\`
- Proof interval: \`${envelope.proof_interval}\`
- Lambda branch: \`${envelope.lambda_branch}\`
- Target slot: \`${envelope.target_slot}\`
- Fold interval: \`${envelope.fold_interval}\`
- Candidate external schema received: \`${envelope.candidate_external_schema_received}\`

## Local Locks Bound

| Field | Reading |
| --- | --- |
${localRows}

Current count: ${envelope.required_fields_present} / ${envelope.required_fields_total} required fields present.

## Proof-Grade Fields Still Required

| Field | Reading |
| --- | --- |
${missingRows}

## Authorization Locks

- Slot result: \`${envelope.slot_result}\`
- Row slots parked: ${envelope.row_slots_parked}
- Row consumption count: ${envelope.row_consumption_count}
- \`preledger_pass\`: \`${envelope.preledger_pass}\`
- \`updates_live_ledger\`: \`${envelope.updates_live_ledger}\`
- Branch chart authorized: \`${envelope.branch_chart_authorized}\`

This envelope is a fail-closed proof-object target. It records the local 5 / 8
intake locks for \`Sigma_hf_01\`, but it is not a received proof-grade external
schema, does not authorize schema-validation intake, consumes no rows, updates
no live ledger, and authorizes no branch chart.
`;
}

function renderMissingProofGradeFieldsTargetReport(target) {
  const localRows = target.local_locks_bound
    .map((field) => `| \`${field}\` | local lock bound |`)
    .join("\n");
  const missingRows = target.targeted_missing_fields
    .map((field) => {
      const predicates = field.required_predicates.map((predicate) => `\`${predicate}\``).join(", ");
      return `| \`${field.field}\` | ${predicates} |`;
    })
    .join("\n");

  return `# Sigma_hf_01 Missing Proof-Grade Fields Derivation Target

Status: \`${target.status}\`

## Scope

- Packet identity: \`${target.packet_id}\`
- Proof interval: \`${target.proof_interval}\`
- Lambda branch: \`${target.lambda_branch}\`
- Target slot: \`${target.target_slot}\`
- Fold interval: \`${target.fold_interval}\`
- Candidate external schema received: \`${target.candidate_external_schema_received}\`
- Basis envelope: \`${target.basis_envelope_ref}\`
- Basis intake record: \`${target.basis_intake_record_ref}\`

## Local Locks Bound

| Field | Reading |
| --- | --- |
${localRows}

Current count: ${target.required_fields_present} / ${target.required_fields_total} required fields present.

## Targeted Proof-Grade Fields

| Field | Required predicates |
| --- | --- |
${missingRows}

Shared carrier target: \`${target.shared_carrier_target}\`

## Authorization Locks

- Slot result: \`${target.slot_result}\`
- Row slots parked: ${target.row_slots_parked}
- Row consumption count: ${target.row_consumption_count}
- \`preledger_pass\`: \`${target.preledger_pass}\`
- \`updates_live_ledger\`: \`${target.updates_live_ledger}\`
- Branch chart authorized: \`${target.branch_chart_authorized}\`

This packet is target-only. It narrows the three proof-grade fields that an
external \`Sigma_hf_01\` derivation schema or derivation proof must supply, but
it is not a received external schema, does not authorize schema-validation
intake, consumes no rows, updates no live ledger, and authorizes no branch
chart.
`;
}

function emitLocalSourceCandidate(args) {
  const sourceDataReadiness = readJson(args.sourceDataReadiness);
  const schemaTarget = readJson(args.schemaTarget);
  const contractSatisfaction = readJson(args.contractSatisfaction);
  const sourceRefs = [
    sourceRef("source_data_readiness", args.sourceDataReadiness),
    sourceRef("schema_target", args.schemaTarget),
    sourceRef("contract_satisfaction", args.contractSatisfaction),
  ];
  const candidate = buildLocalSourceDataCandidate(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
    sourceRefs,
  );
  const candidatePath = path.join(args.outDir, LOCAL_CANDIDATE_JSON);
  const candidateReportPath = path.join(args.outDir, LOCAL_CANDIDATE_REPORT);
  const record = buildRecord(candidate, { candidateRef: candidatePath });
  const errors = validationErrors(record);
  if (errors.length > 0) {
    throw new Error(`Generated invalid record: ${errors.join("; ")}`);
  }
  writeJson(candidatePath, candidate, args.pretty);
  writeText(candidateReportPath, renderCandidateReport(candidate, record));
  writeJson(path.join(args.outDir, OUTPUT_JSON), record, args.pretty);
  writeText(path.join(args.outDir, OUTPUT_REPORT), renderReport(record));
}

function emitPlaceholderRejectionCandidate(args) {
  const sourceDataReadiness = readJson(args.sourceDataReadiness);
  const schemaTarget = readJson(args.schemaTarget);
  const contractSatisfaction = readJson(args.contractSatisfaction);
  const sourceRefs = [
    sourceRef("source_data_readiness", args.sourceDataReadiness),
    sourceRef("schema_target", args.schemaTarget),
    sourceRef("contract_satisfaction", args.contractSatisfaction),
  ];
  const candidate = buildPlaceholderRejectionCandidate(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
    sourceRefs,
  );
  const candidatePath = path.join(args.outDir, PLACEHOLDER_REJECTION_CANDIDATE_JSON);
  const candidateReportPath = path.join(args.outDir, PLACEHOLDER_REJECTION_CANDIDATE_REPORT);
  const recordPath = path.join(args.outDir, PLACEHOLDER_REJECTION_RECORD_JSON);
  const recordReportPath = path.join(args.outDir, PLACEHOLDER_REJECTION_RECORD_REPORT);
  const record = buildRecord(candidate, { candidateRef: candidatePath });
  const errors = validationErrors(record);
  if (errors.length > 0) {
    throw new Error(`Generated invalid placeholder rejection record: ${errors.join("; ")}`);
  }
  writeJson(candidatePath, candidate, args.pretty);
  writeText(candidateReportPath, renderCandidateReport(candidate, record));
  writeJson(recordPath, record, args.pretty);
  writeText(recordReportPath, renderReport(record));
}

function emitProofObjectEnvelope(args) {
  const sourceDataReadiness = readJson(args.sourceDataReadiness);
  const schemaTarget = readJson(args.schemaTarget);
  const contractSatisfaction = readJson(args.contractSatisfaction);
  const sourceRefs = [
    sourceRef("source_data_readiness", args.sourceDataReadiness),
    sourceRef("schema_target", args.schemaTarget),
    sourceRef("contract_satisfaction", args.contractSatisfaction),
  ];
  const envelope = buildProofObjectEnvelope(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
    sourceRefs,
  );
  writeJson(path.join(args.outDir, PROOF_OBJECT_ENVELOPE_JSON), envelope, args.pretty);
  writeText(
    path.join(args.outDir, PROOF_OBJECT_ENVELOPE_REPORT),
    renderProofObjectEnvelopeReport(envelope),
  );
}

function emitMissingProofGradeFieldsTarget(args) {
  const sourceDataReadiness = readJson(args.sourceDataReadiness);
  const schemaTarget = readJson(args.schemaTarget);
  const contractSatisfaction = readJson(args.contractSatisfaction);
  const sourceRefs = [
    sourceRef("source_data_readiness", args.sourceDataReadiness),
    sourceRef("schema_target", args.schemaTarget),
    sourceRef("contract_satisfaction", args.contractSatisfaction),
  ];
  const target = buildMissingProofGradeFieldsDerivationTarget(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
    sourceRefs,
  );
  writeJson(path.join(args.outDir, MISSING_FIELDS_TARGET_JSON), target, args.pretty);
  writeText(
    path.join(args.outDir, MISSING_FIELDS_TARGET_REPORT),
    renderMissingProofGradeFieldsTargetReport(target),
  );
}

function validateAndPrint(filePath) {
  const record = readJson(filePath);
  const errors = validationErrors(record);
  process.stdout.write(
    `${JSON.stringify(
      {
        valid: errors.length === 0,
        errors,
        slot_result: record.slot_result ?? null,
        required_fields_present: record.required_fields_present ?? null,
      },
      null,
      2,
    )}\n`,
  );
  process.exitCode = errors.length === 0 ? 0 : 1;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.validate) {
    validateAndPrint(args.validate);
    return;
  }
  if (args.localSourceCandidate) {
    emitLocalSourceCandidate(args);
    return;
  }
  if (args.placeholderRejectionCandidate) {
    emitPlaceholderRejectionCandidate(args);
    return;
  }
  if (args.proofObjectEnvelope) {
    emitProofObjectEnvelope(args);
    return;
  }
  if (args.missingProofGradeFieldsTarget) {
    emitMissingProofGradeFieldsTarget(args);
    return;
  }

  const candidate = args.candidate ? readJson(args.candidate) : null;
  const record = buildRecord(candidate, { candidateRef: args.candidate ?? null });
  const errors = validationErrors(record);
  if (errors.length > 0) {
    throw new Error(`Generated invalid record: ${errors.join("; ")}`);
  }
  writeJson(path.join(args.outDir, OUTPUT_JSON), record, args.pretty);
  writeText(path.join(args.outDir, OUTPUT_REPORT), renderReport(record));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
