import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildRecord,
  buildLocalSourceDataCandidate,
  buildPlaceholderRejectionCandidate,
  buildProofObjectEnvelope,
  buildMissingProofGradeFieldsDerivationTarget,
  buildLocalProofProgramPoolNonReclassificationClassifier,
  buildExternalSchemaProvenanceContractReplay,
  scanLocalProofProgramPool,
  validationErrors,
} from "../scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs",
    import.meta.url,
  ),
);
const CURRENT_POOL_ABSENCE_CLASSIFIER_PATH = fileURLToPath(
  new URL(
    "../scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-accepted-interval-certified-status-rule-kernel-payload-proof-grade-derivation-schema-current-pool-absence-classifier.mjs",
    import.meta.url,
  ),
);

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const PROOF_INTERVAL = "proof-interval-v6";
const LAMBDA_BRANCH = "lambda0305";
const COMPATIBLE_SCHEMA_ROLE =
  "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema";
const COMPATIBLE_PROOF_OBJECT_ROLE = "source_packet_acceptance_rule_derivation_proof_object";
const DERIVATION_PROOF_TARGET =
  "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family";
const EXTERNAL_SCHEMA_ACCEPTANCE_CONTRACT_REF =
  `${CERT_DIR}/external_proof_grade_derivation_schema_acceptance_contract.md`;
const FORBIDDEN_SCHEMA_REINTERPRETATIONS = [
  "rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_as_proof_grade_derivation_schema",
  "rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_as_proof_grade_derivation_schema",
  "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
  "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
  "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_proof_grade_derivation_schema",
  "source_packet_acceptance_rule_kernel_binding_split_classifier_as_proof_grade_derivation_schema",
];
const PROOF_OBJECT_ENVELOPE_STATUS =
  "sigma_hf_01_external_schema_candidate_proof_object_envelope_open_5_of_8_local_locks_bound_3_proof_grade_fields_required_no_schema_validation_intake_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";
const MISSING_FIELDS_TARGET_STATUS =
  "priority-only-missing-proof-grade-fields-derivation-target-open_5_of_8_local_locks_bound_3_fields_targeted_no_external_schema_received_no_schema_validation_intake_no_row_consumption_no_live_ledger_update_no_branch_chart_authorization";

function readJson(pathname) {
  return JSON.parse(fs.readFileSync(pathname, "utf8"));
}

function buildCompleteSyntheticCandidate(overrides = {}) {
  return {
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: "Sigma_hf_01",
    fold_interval: "F01",
    candidate_external_schema_ref: "external-proof:sigma-hf-01-test",
    external_schema_provenance: {
      provenance_class: "external_proof_grade_derivation_schema_candidate",
      source_ref: "external-proof:sigma-hf-01-test",
      acceptance_contract_ref: EXTERNAL_SCHEMA_ACCEPTANCE_CONTRACT_REF,
      received_for_schema_validation: true,
      authored_inside_local_proof_program_pool: false,
      derived_from_local_certificate_json: false,
      self_authored_placeholder: false,
      local_path_treated_as_external_evidence: false,
    },
    compatible_schema_role_lock: COMPATIBLE_SCHEMA_ROLE,
    compatible_proof_object_role_lock: COMPATIBLE_PROOF_OBJECT_ROLE,
    derivation_proof_target_lock: DERIVATION_PROOF_TARGET,
    derivation_proof_source_data_record_lock: {
      separator_event: "Sigma_hf_01",
      fold_interval: "F01",
      derivation_proof_target: DERIVATION_PROOF_TARGET,
      derivation_proof_source_data_record_declared: true,
      derivation_proof_source_data_ready: true,
    },
    rule_kernel_obligation_binding: {
      derivation_proof_obligation: "discharged",
      soundness_proof_obligation: "discharged",
      endpoint_application_proof_obligation: "discharged",
    },
    rule_kernel_derivation_payload_target_binding: {
      slot: "Sigma_hf_01",
      payload_target_declared: true,
      proof_binds_to_payload_target: true,
      rule_kernel_derivation_payload_constructed: true,
    },
    proof_grade_derivation_schema_statement: {
      hypotheses: ["compatible source-data lock"],
      inference_steps: ["construct rule-kernel derivation payload"],
      conclusion: "source packet acceptance rule derivation proof object schema",
      source_data_correspondence: "Sigma_hf_01 source-data record",
    },
    non_reinterpretation_guard: {
      forbidden_reinterpretations: FORBIDDEN_SCHEMA_REINTERPRETATIONS,
    },
    ...overrides,
  };
}

test("Sigma_hf_01 intake record emits fail-closed absent-input state", () => {
  const record = buildRecord();

  assert.deepEqual(validationErrors(record), []);
  assert.equal(record.schema, "sigma_hf_01_external_schema_candidate_intake_record/v0");
  assert.equal(record.target_slot, "Sigma_hf_01");
  assert.equal(record.candidate_external_schema_ref, null);
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.external_provenance_accepted, false);
  assert.equal(record.external_provenance_status, "external_schema_provenance_required");
  assert.equal(record.required_fields_present, 0);
  assert.equal(record.missing_fields.length, 8);
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.row_slots_parked, 11);
  assert.equal(record.row_consumption_count, 0);
  assert.equal(record.preledger_pass, false);
  assert.equal(record.updates_live_ledger, false);
  assert.equal(record.branch_chart_authorized, false);
});

test("Sigma_hf_01 intake record accepts complete synthetic candidate only for schema validation", () => {
  const record = buildRecord(buildCompleteSyntheticCandidate());

  assert.deepEqual(validationErrors(record), []);
  assert.equal(record.slot_result, "external_schema_input_received_for_schema_validation");
  assert.equal(record.external_provenance_accepted, true);
  assert.equal(record.required_fields_present, 8);
  assert.equal(record.authorization.schema_validation_intake, true);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.authorization.accepted_source_packet, false);
  assert.equal(record.authorization.branch_chart, false);
});

test("Sigma_hf_01 intake rejects eight fields without accepted external provenance", () => {
  const candidate = buildCompleteSyntheticCandidate({
    external_schema_provenance: undefined,
  });
  const record = buildRecord(candidate);

  assert.deepEqual(validationErrors(record), []);
  assert.equal(record.required_fields_present, 8);
  assert.equal(record.external_provenance_accepted, false);
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.authorization.schema_validation_intake, false);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.updates_live_ledger, false);
  assert.equal(record.branch_chart_authorized, false);
});

test("Sigma_hf_01 local source-data candidate records exact partial fields and stays fail-closed", () => {
  const sourceDataReadiness = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const schemaTarget = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const contractSatisfaction = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const candidate = buildLocalSourceDataCandidate(sourceDataReadiness, schemaTarget, contractSatisfaction);
  const record = buildRecord(candidate);

  assert.deepEqual(validationErrors(record), []);
  assert.equal(candidate.candidate_status, "partial_local_source_data_candidate_not_external_proof_grade");
  assert.equal(record.candidate_file_screened, true);
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.candidate_known_local_non_external_artifact, true);
  assert.equal(record.required_fields_present, 5);
  assert.deepEqual(record.missing_fields, [
    "rule_kernel_obligation_binding",
    "rule_kernel_derivation_payload_target_binding",
    "proof_grade_derivation_schema_statement",
  ]);
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.authorization.schema_validation_intake, false);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.authorization.branch_chart, false);
});

test("Sigma_hf_01 proof-object envelope records 5/8 local locks without proof-grade intake", () => {
  const sourceDataReadiness = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const schemaTarget = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const contractSatisfaction = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const envelope = buildProofObjectEnvelope(sourceDataReadiness, schemaTarget, contractSatisfaction);
  const envelopeRecord = buildRecord(envelope, {
    candidateRef: "sigma_hf_01_external_schema_candidate.proof-object-envelope.json",
  });

  assert.equal(envelope.schema, "sigma_hf_01_external_schema_candidate_proof_object_envelope/v0");
  assert.equal(envelope.status, PROOF_OBJECT_ENVELOPE_STATUS);
  assert.equal(envelope.candidate_external_schema_received, false);
  assert.equal(envelopeRecord.candidate_file_screened, true);
  assert.equal(envelopeRecord.candidate_external_schema_received, false);
  assert.equal(envelopeRecord.candidate_known_local_non_external_artifact, true);
  assert.equal(envelopeRecord.slot_result, "external_input_required");
  assert.equal(envelopeRecord.authorization.schema_validation_intake, false);
  assert.equal(envelopeRecord.authorization.row_consumption, false);
  assert.equal(envelopeRecord.updates_live_ledger, false);
  assert.equal(envelopeRecord.branch_chart_authorized, false);
  assert.equal(envelope.required_fields_total, 8);
  assert.equal(envelope.required_fields_present, 5);
  assert.deepEqual(envelope.local_locks_bound, [
    "compatible_schema_role_lock",
    "compatible_proof_object_role_lock",
    "derivation_proof_target_lock",
    "derivation_proof_source_data_record_lock",
    "non_reinterpretation_guard",
  ]);
  assert.deepEqual(envelope.missing_fields, [
    "rule_kernel_obligation_binding",
    "rule_kernel_derivation_payload_target_binding",
    "proof_grade_derivation_schema_statement",
  ]);
  assert.deepEqual(envelope.proof_grade_fields_required, envelope.missing_fields);
  assert.equal(envelope.slot_result, "external_input_required");
  assert.equal(envelope.row_slots_parked, 11);
  assert.equal(envelope.row_consumption_count, 0);
  assert.equal(envelope.authorization.schema_validation_intake, false);
  assert.equal(envelope.authorization.row_consumption, false);
  assert.equal(envelope.authorization.accepted_source_packet, false);
  assert.equal(envelope.authorization.branch_chart, false);
  assert.equal(envelope.used_as_external_schema, false);
  assert.equal(envelope.used_as_proof_grade_schema, false);
});

test("Sigma_hf_01 missing proof-grade fields derivation target names the three open predicates", () => {
  const sourceDataReadiness = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const schemaTarget = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const contractSatisfaction = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const target = buildMissingProofGradeFieldsDerivationTarget(
    sourceDataReadiness,
    schemaTarget,
    contractSatisfaction,
  );
  const targetRecord = buildRecord(target, {
    candidateRef:
      "sigma_hf_01_external_schema_candidate.missing-proof-grade-fields-derivation-target.json",
  });

  assert.equal(
    target.schema,
    "sigma_hf_01_external_schema_candidate_missing_proof_grade_fields_derivation_target/v0",
  );
  assert.equal(target.status, MISSING_FIELDS_TARGET_STATUS);
  assert.equal(target.candidate_external_schema_received, false);
  assert.equal(targetRecord.candidate_file_screened, true);
  assert.equal(targetRecord.candidate_external_schema_received, false);
  assert.equal(targetRecord.candidate_known_local_non_external_artifact, true);
  assert.equal(targetRecord.slot_result, "external_input_required");
  assert.equal(targetRecord.authorization.schema_validation_intake, false);
  assert.equal(targetRecord.authorization.row_consumption, false);
  assert.equal(targetRecord.updates_live_ledger, false);
  assert.equal(targetRecord.branch_chart_authorized, false);
  assert.deepEqual(
    targetRecord.field_results
      .filter((field) => field.predicate_diagnostics)
      .map((field) => ({
        field: field.field,
        failedPredicates: field.predicate_diagnostics.failed_predicates,
      })),
    [
      {
        field: "rule_kernel_obligation_binding",
        failedPredicates: [
          "derivation_proof_obligation",
          "soundness_proof_obligation",
          "endpoint_application_proof_obligation",
        ],
      },
      {
        field: "rule_kernel_derivation_payload_target_binding",
        failedPredicates: [
          "slot=Sigma_hf_01",
          "payload_target_declared=true",
          "proof_binds_to_payload_target=true",
          "rule_kernel_derivation_payload_constructed=true",
        ],
      },
      {
        field: "proof_grade_derivation_schema_statement",
        failedPredicates: [
          "hypotheses_nonempty",
          "inference_steps_nonempty",
          "conclusion_nonempty",
          "source_data_correspondence_nonempty",
        ],
      },
    ],
  );
  assert.equal(target.required_fields_present, 5);
  assert.deepEqual(target.local_locks_bound, [
    "compatible_schema_role_lock",
    "compatible_proof_object_role_lock",
    "derivation_proof_target_lock",
    "derivation_proof_source_data_record_lock",
    "non_reinterpretation_guard",
  ]);
  assert.deepEqual(
    target.targeted_missing_fields.map((field) => field.field),
    [
      "rule_kernel_obligation_binding",
      "rule_kernel_derivation_payload_target_binding",
      "proof_grade_derivation_schema_statement",
    ],
  );
  assert.deepEqual(target.targeted_missing_fields[0].required_predicates, [
    "derivation_proof_obligation",
    "soundness_proof_obligation",
    "endpoint_application_proof_obligation",
  ]);
  assert.deepEqual(target.targeted_missing_fields[1].required_predicates, [
    "slot=Sigma_hf_01",
    "payload_target_declared=true",
    "proof_binds_to_payload_target=true",
    "rule_kernel_derivation_payload_constructed=true",
  ]);
  assert.deepEqual(target.targeted_missing_fields[2].required_predicates, [
    "hypotheses_nonempty",
    "inference_steps_nonempty",
    "conclusion_nonempty",
    "source_data_correspondence_nonempty",
  ]);
  assert.equal(
    target.targeted_missing_fields.every(
      (field) =>
        field.local_placeholder_satisfies_field === false &&
        field.current_pool_absence_satisfies_field === false,
    ),
    true,
  );
  assert.equal(
    target.shared_carrier_target,
    "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload",
  );
  assert.equal(target.authorization.schema_validation_intake, false);
  assert.equal(target.authorization.row_consumption, false);
  assert.equal(target.authorization.accepted_source_packet, false);
  assert.equal(target.authorization.branch_chart, false);
  assert.equal(target.local_placeholders_satisfy_target, false);
  assert.equal(target.current_pool_absence_satisfies_target, false);
  assert.equal(target.used_as_external_schema, false);
  assert.equal(target.used_as_proof_grade_schema, false);
});

test("Sigma_hf_01 missing proof-grade field placeholders are supplied but rejected", () => {
  const sourceDataReadiness = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_source_data_readiness_classifier.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const schemaTarget = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_target_packet.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const contractSatisfaction = readJson(
    `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_source_packet_rule_derivation_proof_object_contract_target_satisfaction_attempt.${PACKET_ID}.${PROOF_INTERVAL}.${LAMBDA_BRANCH}.json`,
  );
  const candidate = buildPlaceholderRejectionCandidate(sourceDataReadiness, schemaTarget, contractSatisfaction);
  const record = buildRecord(candidate);

  assert.deepEqual(validationErrors(record), []);
  assert.equal(
    candidate.candidate_status,
    "local_missing_proof_grade_field_placeholders_rejected_not_external_schema",
  );
  assert.equal(record.candidate_file_screened, true);
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.candidate_known_local_non_external_artifact, true);
  assert.equal(
    record.placeholder_rejection.status,
    "local_missing_proof_grade_field_placeholders_rejected_not_external_schema",
  );
  assert.equal(record.required_fields_present, 5);
  assert.deepEqual(record.missing_fields, [
    "rule_kernel_obligation_binding",
    "rule_kernel_derivation_payload_target_binding",
    "proof_grade_derivation_schema_statement",
  ]);
  assert.deepEqual(record.supplied_but_rejected_fields, [
    "rule_kernel_obligation_binding",
    "rule_kernel_derivation_payload_target_binding",
    "proof_grade_derivation_schema_statement",
  ]);
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.authorization.schema_validation_intake, false);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.updates_live_ledger, false);
  assert.equal(record.branch_chart_authorized, false);
});

test("Sigma_hf_01 intake CLI writes JSON and report", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-intake-"));
  execFileSync(process.execPath, [SCRIPT_PATH, "--out-dir", tempDir, "--pretty"], { encoding: "utf8" });

  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const record = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(record.slot_result, "external_input_required");

  const validation = JSON.parse(execFileSync(process.execPath, [SCRIPT_PATH, "--validate", jsonPath], { encoding: "utf8" }));
  assert.equal(validation.valid, true);
  assert.equal(validation.required_fields_present, 0);
});

test("Sigma_hf_01 intake CLI writes local source-data partial candidate", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-local-candidate-"));
  execFileSync(process.execPath, [SCRIPT_PATH, "--local-source-candidate", "--out-dir", tempDir, "--pretty"], {
    encoding: "utf8",
  });

  const candidatePath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate_intake_record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.local-source-data-partial.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(candidatePath), true);
  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const record = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.candidate_known_local_non_external_artifact, true);
  assert.equal(record.required_fields_present, 5);
  assert.equal(record.authorization.schema_validation_intake, false);
});

test("Sigma_hf_01 intake CLI writes placeholder-rejection candidate and record", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-placeholder-rejection-"));
  execFileSync(process.execPath, [SCRIPT_PATH, "--placeholder-rejection-candidate", "--out-dir", tempDir, "--pretty"], {
    encoding: "utf8",
  });

  const candidatePath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.local-missing-proof-grade-placeholders-rejected.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.placeholder-rejection-intake-record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.placeholder-rejection-intake-record.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(candidatePath), true);
  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const record = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.candidate_known_local_non_external_artifact, true);
  assert.equal(record.required_fields_present, 5);
  assert.equal(
    record.placeholder_rejection.status,
    "local_missing_proof_grade_field_placeholders_rejected_not_external_schema",
  );
  assert.equal(record.authorization.schema_validation_intake, false);
  assert.equal(record.authorization.row_consumption, false);

  const validation = JSON.parse(execFileSync(process.execPath, [SCRIPT_PATH, "--validate", jsonPath], { encoding: "utf8" }));
  assert.equal(validation.valid, true);
  assert.equal(validation.required_fields_present, 5);
});

test("Sigma_hf_01 intake CLI writes fail-closed proof-object envelope", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-proof-envelope-"));
  execFileSync(process.execPath, [SCRIPT_PATH, "--proof-object-envelope", "--out-dir", tempDir, "--pretty"], {
    encoding: "utf8",
  });

  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.proof-object-envelope.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.proof-object-envelope.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const envelope = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(envelope.status, PROOF_OBJECT_ENVELOPE_STATUS);
  assert.equal(envelope.required_fields_present, 5);
  assert.equal(envelope.slot_result, "external_input_required");
  assert.equal(envelope.authorization.schema_validation_intake, false);
  assert.equal(envelope.authorization.row_consumption, false);
  assert.equal(envelope.used_as_external_schema, false);
  assert.equal(envelope.used_as_proof_grade_schema, false);
});

test("Sigma_hf_01 intake CLI writes missing proof-grade fields derivation target", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-missing-fields-target-"));
  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--missing-proof-grade-fields-target", "--out-dir", tempDir, "--pretty"],
    { encoding: "utf8" },
  );

  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.missing-proof-grade-fields-derivation-target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.missing-proof-grade-fields-derivation-target.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const target = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(target.status, MISSING_FIELDS_TARGET_STATUS);
  assert.equal(target.required_fields_present, 5);
  assert.equal(target.targeted_missing_fields.length, 3);
  assert.equal(target.authorization.schema_validation_intake, false);
  assert.equal(target.authorization.row_consumption, false);
  assert.equal(target.local_placeholders_satisfy_target, false);
  assert.equal(target.current_pool_absence_satisfies_target, false);
});

test("Sigma current-pool schema absence classifier tolerates pool growth without admitting schema evidence", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-current-pool-absence-"));
  execFileSync(process.execPath, [CURRENT_POOL_ABSENCE_CLASSIFIER_PATH, "--out-dir", tempDir, "--pretty"], {
    encoding: "utf8",
  });

  const jsonPath = path.join(
    tempDir,
    "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_accepted_status_rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const packet = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const summary = packet.summary;
  const record = buildRecord(packet, { candidateRef: jsonPath });

  assert.equal(packet.preledger_pass, false);
  assert.equal(packet.updates_live_ledger, false);
  assert.equal(packet.branch_chart_authorized, false);
  assert.ok(summary.current_pool_json_files_scanned > 0);
  assert.ok(summary.accepted_status_lane_json_files_scanned > 0);
  assert.equal(
    summary.accepted_status_lane_fail_closed_json_files,
    summary.accepted_status_lane_json_files_scanned,
  );
  assert.equal(summary.accepted_status_lane_non_fail_closed_json_files, 0);
  assert.equal(summary.current_pool_proof_grade_derivation_schema_files_found, 0);
  assert.equal(summary.current_pool_compatible_proof_grade_derivation_schema_refs, 0);
  assert.equal(summary.proof_grade_derivation_schema_positive_files, 0);
  assert.equal(summary.rule_kernel_derivation_payload_positive_files, 0);
  assert.equal(summary.row_consumption_count, 0);
  assert.equal(record.candidate_file_screened, true);
  assert.equal(record.candidate_external_schema_received, false);
  assert.equal(record.candidate_known_local_non_external_artifact, true);
  assert.equal(record.slot_result, "external_input_required");
  assert.equal(record.authorization.schema_validation_intake, false);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.updates_live_ledger, false);
  assert.equal(record.branch_chart_authorized, false);
});

test("Sigma_hf_01 local proof-program pool classifier rejects local reclassification", () => {
  const packet = buildLocalProofProgramPoolNonReclassificationClassifier(
    scanLocalProofProgramPool(CERT_DIR),
  );
  const summary = packet.summary;
  const localSourceDataPartial = packet.local_partial_or_known_non_external_records.find((record) =>
    record.basename.includes("local-source-data-partial"),
  );

  assert.equal(packet.target_slot, "Sigma_hf_01");
  assert.ok(summary.local_proof_program_json_files_screened > 0);
  assert.equal(summary.schema_validation_intake_candidates_found, 0);
  assert.equal(summary.local_proof_program_json_files_reclassified_as_external_schema, 0);
  assert.equal(summary.external_schema_input_received_records, 0);
  assert.equal(summary.records_with_required_fields_present_8_of_8, 0);
  assert.equal(summary.schema_validation_intake_authorized_records, 0);
  assert.equal(
    summary.external_input_required_records,
    summary.local_proof_program_json_files_screened,
  );
  assert.equal(localSourceDataPartial.required_fields_present, 5);
  assert.equal(localSourceDataPartial.slot_result, "external_input_required");
  assert.equal(localSourceDataPartial.candidate_known_local_non_external_artifact, true);
  assert.equal(packet.authorization_lock.schema_validation_intake, false);
  assert.equal(packet.authorization_lock.row_consumption, false);
  assert.equal(packet.authorization_lock.preledger_pass, false);
  assert.equal(packet.authorization_lock.updates_live_ledger, false);
  assert.equal(packet.authorization_lock.branch_chart_authorized, false);
});

test("Sigma_hf_01 external provenance contract replay rejects local candidate refs", () => {
  const packet = buildExternalSchemaProvenanceContractReplay(
    scanLocalProofProgramPool(CERT_DIR),
  );
  const summary = packet.summary;

  assert.equal(packet.target_slot, "Sigma_hf_01");
  assert.deepEqual(packet.required_schema_predicate_fields, [
    "compatible_schema_role_lock",
    "compatible_proof_object_role_lock",
    "derivation_proof_target_lock",
    "derivation_proof_source_data_record_lock",
    "rule_kernel_obligation_binding",
    "rule_kernel_derivation_payload_target_binding",
    "proof_grade_derivation_schema_statement",
    "non_reinterpretation_guard",
  ]);
  assert.equal(summary.external_provenance_accepted_records, 0);
  assert.equal(summary.schema_validation_intake_candidates_found, 0);
  assert.equal(summary.external_schema_inputs_received, 0);
  assert.equal(summary.local_path_candidate_refs_rejected, summary.local_proof_program_json_files_screened_as_candidate_refs);
  assert.equal(summary.first_failure, "external_schema_provenance_required_before_schema_validation_intake");
  assert.equal(packet.authorization_lock.schema_validation_intake, false);
  assert.equal(packet.authorization_lock.row_consumption, false);
  assert.equal(packet.authorization_lock.updates_live_ledger, false);
  assert.equal(packet.authorization_lock.branch_chart_authorized, false);
  assert.equal(
    packet.actual_external_object_must_bind.includes(
      "post_intake_schema_validation_before_any_row_slot_consumption",
    ),
    true,
  );
});

test("Sigma_hf_01 intake CLI writes local proof-program pool classifier", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-local-pool-classifier-"));
  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--local-proof-program-pool-classifier", "--out-dir", tempDir, "--pretty"],
    { encoding: "utf8" },
  );

  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.local-proof-program-pool-nonreclassification-classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.local-proof-program-pool-nonreclassification-classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const packet = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(packet.summary.schema_validation_intake_candidates_found, 0);
  assert.equal(packet.summary.records_with_required_fields_present_8_of_8, 0);
  assert.equal(packet.authorization_lock.schema_validation_intake, false);
  assert.equal(packet.authorization_lock.row_consumption, false);
  assert.equal(packet.authorization_lock.branch_chart_authorized, false);
});

test("Sigma_hf_01 intake CLI writes external provenance contract replay", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-provenance-replay-"));
  execFileSync(
    process.execPath,
    [SCRIPT_PATH, "--external-provenance-contract-replay", "--out-dir", tempDir, "--pretty"],
    { encoding: "utf8" },
  );

  const jsonPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.external-provenance-contract-replay.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  const reportPath = path.join(
    tempDir,
    "sigma_hf_01_external_schema_candidate.external-provenance-contract-replay.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305_report.md",
  );

  assert.equal(fs.existsSync(jsonPath), true);
  assert.equal(fs.existsSync(reportPath), true);
  const packet = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  assert.equal(packet.summary.external_provenance_accepted_records, 0);
  assert.equal(packet.summary.schema_validation_intake_candidates_found, 0);
  assert.equal(packet.authorization_lock.schema_validation_intake, false);
  assert.equal(packet.authorization_lock.row_consumption, false);
  assert.equal(packet.authorization_lock.branch_chart_authorized, false);
});
