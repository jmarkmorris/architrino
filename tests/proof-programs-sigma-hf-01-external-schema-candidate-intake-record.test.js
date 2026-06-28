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
const FORBIDDEN_SCHEMA_REINTERPRETATIONS = [
  "rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_as_proof_grade_derivation_schema",
  "rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_as_proof_grade_derivation_schema",
  "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
  "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
  "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_proof_grade_derivation_schema",
  "source_packet_acceptance_rule_kernel_binding_split_classifier_as_proof_grade_derivation_schema",
];

function readJson(pathname) {
  return JSON.parse(fs.readFileSync(pathname, "utf8"));
}

test("Sigma_hf_01 intake record emits fail-closed absent-input state", () => {
  const record = buildRecord();

  assert.deepEqual(validationErrors(record), []);
  assert.equal(record.schema, "sigma_hf_01_external_schema_candidate_intake_record/v0");
  assert.equal(record.target_slot, "Sigma_hf_01");
  assert.equal(record.candidate_external_schema_ref, null);
  assert.equal(record.candidate_external_schema_received, false);
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
  const record = buildRecord({
    packet_id: PACKET_ID,
    proof_interval: PROOF_INTERVAL,
    lambda_branch: LAMBDA_BRANCH,
    target_slot: "Sigma_hf_01",
    fold_interval: "F01",
    candidate_external_schema_ref: "external-proof:sigma-hf-01-test",
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
  });

  assert.deepEqual(validationErrors(record), []);
  assert.equal(record.slot_result, "external_schema_input_received_for_schema_validation");
  assert.equal(record.required_fields_present, 8);
  assert.equal(record.authorization.schema_validation_intake, true);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.authorization.accepted_source_packet, false);
  assert.equal(record.authorization.branch_chart, false);
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
});
