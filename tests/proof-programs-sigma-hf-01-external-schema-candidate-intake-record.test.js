import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildRecord,
  validationErrors,
} from "../scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/proof-programs/fresh-v10-higher-fold-sigma-hf-01-external-schema-candidate-intake-record.mjs",
    import.meta.url,
  ),
);

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
    packet_id: "fresh-v10-higher-fold-12-root-rebuild-v0",
    proof_interval: "proof-interval-v6",
    lambda_branch: "lambda0305",
    target_slot: "Sigma_hf_01",
    fold_interval: "F01",
    candidate_external_schema_ref: "external-proof:sigma-hf-01-test",
    compatible_schema_role_lock: "role-lock",
    compatible_proof_object_role_lock: "proof-object-lock",
    derivation_proof_target_lock: "target-lock",
    derivation_proof_source_data_record_lock: "source-data-lock",
    rule_kernel_obligation_binding: "obligation-binding",
    rule_kernel_derivation_payload_target_binding: "payload-binding",
    proof_grade_derivation_schema_statement: "schema-statement",
    non_reinterpretation_guard: "guard",
  });

  assert.deepEqual(validationErrors(record), []);
  assert.equal(record.slot_result, "external_schema_input_received_for_schema_validation");
  assert.equal(record.required_fields_present, 8);
  assert.equal(record.authorization.schema_validation_intake, true);
  assert.equal(record.authorization.row_consumption, false);
  assert.equal(record.authorization.accepted_source_packet, false);
  assert.equal(record.authorization.branch_chart, false);
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
