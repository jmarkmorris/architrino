import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  BREATHER_FORCE_MARGIN_STATUSES,
  BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
  BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA,
  SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_SCHEMA,
  SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_STATUSES,
  buildBreatherReceiverNormalForceMarginAbsenceBoundary,
  buildBreatherReceiverNormalForceMarginFixtureSchema,
  buildSigmaHf01ExternalSchemaIntakeTarget,
  validateBreatherReceiverNormalForceMarginFixture,
  validateSigmaHf01ExternalSchemaIntakeCandidate,
} from "../scripts/proof-programs/check-breather-receiver-normal-force-margin-fixture.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/proof-programs/check-breather-receiver-normal-force-margin-fixture.mjs", import.meta.url),
);
const breatherCertificateRoot = fileURLToPath(
  new URL("../reference/priorities/proof-programs/breather-proof/certificate", import.meta.url),
);

function buildPassingFixture(overrides = {}) {
  const checksum = {
    retained_record_ids: ["R1"],
    aggregation_convention: "retained-row-sum-before-margin",
    derivative_variation_keys: ["v1"],
  };
  return {
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    packet_identity: {
      packet_id: "synthetic-breather-test-packet",
      cycle: "T0",
      regulator_state: "epsilon-test",
    },
    branch_chart_authorized: true,
    branch_family_checksum: checksum,
    receiver_normal_rows: [
      {
        retained_record_key: "R1",
        branch_family_checksum: checksum,
        D_s_interval: [2, 2],
        D_t_interval: [6, 6],
        W_rec_interval: [3, 3],
        sign_stratum: { zeta_s: 1, zeta_t: 1 },
        floors: { D_s_floor: 2, D_t_floor: 6 },
        source_hash: "receiver-row-hash",
      },
    ],
    receiver_normal_derivative_rows: [
      {
        retained_record_key: "R1",
        variation_key: "v1",
        branch_family_checksum: checksum,
        D_vD_s_interval: [0.5, 0.5],
        D_vD_t_interval: [2, 2],
        D_vW_rec_interval: [0.25, 0.25],
        geometry_derivatives: { D_vr_interval: [0, 0], D_vr_hat_interval: [0, 0] },
        force_kernel_derivatives: { D_vB_rec_interval: [0.25, 0.25] },
        source_hash: "derivative-row-hash",
      },
    ],
    margin_consumers: [
      {
        consumer_id: "recapture-margin",
        consumer_family: "recapture",
        branch_family_checksum: checksum,
        retained_record_keys: ["R1"],
        derivative_variation_keys: ["v1"],
        requires_derivatives: true,
      },
    ],
    margin_intervals: [
      {
        consumer_id: "recapture-margin",
        branch_family_checksum: checksum,
        gamma_rec_interval: [0.125, 0.25],
        D_vgamma_rec_interval: [0.01, 0.02],
      },
    ],
    negative_controls: {
      rejects_receiver_strength_substitution: true,
      rejects_aggregate_only_margin: true,
      rejects_legacy_shell_braid_residue: true,
    },
    source_hashes: {
      candidate: "candidate-hash",
      branch_chart: "branch-chart-hash",
      event_ledger: "event-ledger-hash",
      derivative_bundle: "derivative-bundle-hash",
      fixture_evaluator: "check-breather-receiver-normal-force-margin-fixture.mjs",
    },
    ...overrides,
  };
}

function buildAcceptedSigmaHf01Candidate(overrides = {}) {
  const candidateRef =
    "sigma_hf_01_external_schema_candidate.test-source.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json";
  return {
    schema: "sigma_hf_01_external_schema_candidate/v0",
    packet_id: "fresh-v10-higher-fold-12-root-rebuild-v0",
    proof_interval: "proof-interval-v6",
    lambda_branch: "lambda0305",
    target_slot: "Sigma_hf_01",
    fold_interval: "F01",
    candidate_external_schema_ref: candidateRef,
    external_schema_provenance: {
      provenance_class: "external_proof_grade_derivation_schema_candidate",
      source_ref: candidateRef,
      acceptance_contract_ref:
        "reference/priorities/proof-programs/breather-proof/certificate/external_proof_grade_derivation_schema_acceptance_contract.md",
      received_for_schema_validation: true,
      authored_inside_local_proof_program_pool: false,
      derived_from_local_certificate_json: false,
      self_authored_placeholder: false,
      local_path_treated_as_external_evidence: false,
    },
    compatible_schema_role_lock:
      "source_packet_acceptance_rule_derivation_proof_object_rule_kernel_derivation_payload_proof_grade_derivation_schema",
    compatible_proof_object_role_lock: "source_packet_acceptance_rule_derivation_proof_object",
    derivation_proof_target_lock:
      "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family",
    derivation_proof_source_data_record_lock: {
      separator_event: "Sigma_hf_01",
      fold_interval: "F01",
      derivation_proof_target:
        "source_packet_acceptance_rule_derivation_proof_for_live_same_packet_separator_aggregate_family",
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
      hypotheses: ["external proof-grade hypothesis"],
      inference_steps: ["external proof-grade inference"],
      conclusion: "external proof-grade conclusion",
      source_data_correspondence: "external proof-grade source-data correspondence",
    },
    non_reinterpretation_guard: {
      forbidden_reinterpretations: [
        "rule_kernel_payload_proof_grade_derivation_schema_external_input_obligation_packet_as_proof_grade_derivation_schema",
        "rule_kernel_payload_proof_grade_derivation_schema_current_pool_absence_classifier_as_proof_grade_derivation_schema",
        "rule_kernel_payload_proof_grade_derivation_schema_target_packet_as_proof_grade_derivation_schema",
        "rule_kernel_payload_construction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_derivation_proof_object_contract_target_satisfaction_attempt_as_proof_grade_derivation_schema",
        "source_packet_acceptance_rule_kernel_binding_split_classifier_as_proof_grade_derivation_schema",
      ],
    },
    ...overrides,
  };
}

test("breather force-margin fixture validator emits absent-fixture blocker", () => {
  const report = validateBreatherReceiverNormalForceMarginFixture(null);

  assert.equal(report.schema, BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA);
  assert.equal(report.pass, false);
  assert.equal(report.verdict, "fail_closed");
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.missing);
  assert.equal(report.diagnostics.includes("fixture object is absent"), true);
});

test("breather force-margin fixture validator exposes the fixture contract", () => {
  const schema = buildBreatherReceiverNormalForceMarginFixtureSchema();

  assert.equal(schema.artifact_schema, BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA);
  assert.equal(schema.artifact_id, BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID);
  assert.equal(schema.required_top_level_fields.includes("receiver_normal_rows"), true);
  assert.equal(schema.required_top_level_fields.includes("receiver_normal_derivative_rows"), true);
  assert.equal(schema.receiver_normal_row_contract.includes("W_rec_interval"), true);
  assert.equal(schema.receiver_normal_derivative_row_contract.includes("D_vW_rec_interval"), true);
  assert.equal(
    schema.absence_boundary_contract.expected_producer_files.branch_chart,
    "branch_chart.json",
  );
  assert.equal(
    schema.absence_boundary_contract.expected_producer_files.derivative_bundle,
    "breather_receiver_normal_derivative_bundle.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  );
  assert.equal(schema.fail_closed_statuses.includes(BREATHER_FORCE_MARGIN_STATUSES.missing), true);
  assert.equal(schema.fail_closed_statuses.includes(BREATHER_FORCE_MARGIN_STATUSES.passed), false);
});

test("breather force-margin fixture CLI emits the fixture contract", () => {
  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));

  assert.equal(schema.artifact_schema, BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA);
  assert.equal(schema.margin_consumer_contract.includes("retained_record_keys"), true);
  assert.equal(schema.margin_interval_contract.includes("gamma_rec_interval"), true);
});

test("Sigma_hf_01 schema-intake target exposes external-only contract", () => {
  const target = buildSigmaHf01ExternalSchemaIntakeTarget();

  assert.equal(target.schema, SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_SCHEMA);
  assert.equal(
    target.expected_candidate_file,
    "sigma_hf_01_external_schema_candidate.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  assert.equal(target.required_proof_grade_fields.includes("rule_kernel_obligation_binding"), true);
  assert.equal(
    target.expected_candidate_file_regex,
    "^sigma_hf_01_external_schema_candidate\\.[^/]+\\.fresh-v10-higher-fold-12-root-rebuild-v0\\.proof-interval-v6\\.lambda0305\\.json$",
  );
  assert.equal(
    target.required_proof_grade_fields.includes("rule_kernel_derivation_payload_target_binding"),
    true,
  );
  assert.equal(
    target.required_proof_grade_fields.includes("proof_grade_derivation_schema_statement"),
    true,
  );
  assert.equal(target.authorization_after_schema_intake.row_consumption, false);
  assert.equal(target.authorization_after_schema_intake.branch_chart, false);
});

test("Sigma_hf_01 schema-intake validator accepts only priority-only external intake", () => {
  const report = validateSigmaHf01ExternalSchemaIntakeCandidate(buildAcceptedSigmaHf01Candidate());

  assert.equal(report.schema, SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_SCHEMA);
  assert.equal(report.pass, true);
  assert.equal(report.status, SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_STATUSES.passed);
  assert.equal(report.authorization.schema_validation_intake, true);
  assert.equal(report.authorization.row_consumption, false);
  assert.equal(report.authorization.branch_chart, false);
  assert.equal(report.required_fields_accepted, 8);
});

test("Sigma_hf_01 schema-intake validator rejects local, provisional, and fixture-shaped candidates", () => {
  const local = buildAcceptedSigmaHf01Candidate({
    external_schema_provenance: {
      ...buildAcceptedSigmaHf01Candidate().external_schema_provenance,
      authored_inside_local_proof_program_pool: true,
      derived_from_local_certificate_json: true,
    },
  });
  const localReport = validateSigmaHf01ExternalSchemaIntakeCandidate(local);
  assert.equal(localReport.pass, false);
  assert.equal(
    localReport.status,
    SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_STATUSES.localOrProvisionalRejected,
  );

  const missingProofGrade = buildAcceptedSigmaHf01Candidate({
    rule_kernel_obligation_binding: {
      derivation_proof_obligation: "open",
      soundness_proof_obligation: "open",
      endpoint_application_proof_obligation: "open",
    },
  });
  const missingProofGradeReport =
    validateSigmaHf01ExternalSchemaIntakeCandidate(missingProofGrade);
  assert.equal(missingProofGradeReport.pass, false);
  assert.equal(
    missingProofGradeReport.status,
    SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_STATUSES.requiredFieldRejected,
  );
  assert.deepEqual(missingProofGradeReport.proof_grade_fields_failed, [
    "rule_kernel_obligation_binding",
  ]);

  const fixtureReport = validateSigmaHf01ExternalSchemaIntakeCandidate({
    ...buildAcceptedSigmaHf01Candidate(),
    artifact_id: BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_ARTIFACT_ID,
    receiver_normal_rows: [],
  });
  assert.equal(fixtureReport.pass, false);
  assert.equal(
    fixtureReport.status,
    SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_STATUSES.fixtureShapeRejected,
  );
});

test("Sigma_hf_01 schema-intake CLI emits target and screens candidate JSON", () => {
  const target = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--sigma-hf-01-schema-intake-target"], {
      encoding: "utf8",
    }),
  );
  assert.equal(target.schema, SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_SCHEMA);
  assert.equal(target.accepted_provenance_required, true);

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sigma-hf-01-schema-intake-"));
  const candidatePath = path.join(tempDir, "sigma_hf_01_external_candidate.json");
  fs.writeFileSync(candidatePath, JSON.stringify(buildAcceptedSigmaHf01Candidate()), "utf8");

  const report = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--sigma-hf-01-schema-intake", candidatePath], {
      encoding: "utf8",
    }),
  );
  assert.equal(report.pass, true);
  assert.equal(report.authorization.row_consumption, false);
});

test("breather force-margin fixture validator emits breather source absence boundary", () => {
  const boundary = buildBreatherReceiverNormalForceMarginAbsenceBoundary({
    sourceRoot: "reference/priorities/proof-programs/breather-proof/certificate",
  });

  assert.equal(boundary.pass, false);
  assert.equal(boundary.status, BREATHER_FORCE_MARGIN_STATUSES.sourceMissing);
  assert.equal(boundary.blocks_fixture_candidate, true);
  assert.equal(
    boundary.required_source_boundary.expected_producer_object,
    "breather_receiver_normal_force_margin_fixture.<packet-id>.json",
  );
  assert.equal(boundary.required_source_boundary.retained_record_fields.includes("D_s_interval"), true);
  assert.equal(boundary.required_source_boundary.retained_record_fields.includes("W_rec_interval"), true);
  assert.equal(boundary.required_source_boundary.derivative_fields.includes("D_vD_s_interval"), true);
  assert.equal(boundary.required_source_boundary.derivative_fields.includes("D_vD_t_interval"), true);
  assert.equal(boundary.required_source_boundary.derivative_fields.includes("D_vW_rec_interval"), true);
  assert.deepEqual(boundary.source_evidence.fixture_artifact_files, []);
  assert.deepEqual(boundary.source_evidence.branch_chart_authorized_true_files, []);
  assert.equal(
    boundary.producer_route_boundary.schema,
    `${BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA}.producer-route-boundary/v0`,
  );
  assert.equal(boundary.producer_route_boundary.packet_id, "fresh-v10-higher-fold-12-root-rebuild-v0");
  assert.equal(
    boundary.producer_route_boundary.expected_producer_files.retained_rows,
    "breather_receiver_normal_retained_rows.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  );
  assert.equal(
    boundary.producer_route_boundary.expected_producer_files.fixture,
    "breather_receiver_normal_force_margin_fixture.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  );
  assert.equal(
    boundary.producer_route_boundary.first_required_proof_object,
    "source_packet_acceptance_rule_derivation_proof for fixed-parameter separator aggregate to same-packet fold impulse/direct-quadrature bound acceptance",
  );
  assert.equal(
    boundary.producer_route_boundary.branch_chart_route.evidence.fold_coordinate_history_realization_contract.summary
      .candidate_artifacts_present,
    0,
  );
  assert.equal(
    boundary.producer_route_boundary.branch_chart_route.evidence.fold_coordinate_history_realization_contract.summary
      .branch_chart_authorized,
    false,
  );
  assert.equal(
    boundary.producer_route_boundary.branch_chart_route.evidence.accepted_status_route_evidence_object_contract_disjunction
      .summary.first_separator_certificate_blocker,
    "higher_fold_separator_layer_certificate_absent",
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary
      .source_packet_rule_derivation_proof_contract_attempt.summary.first_missing_contract_field,
    "rule_kernel_derivation_payload",
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.expected_rule_kernel_schema_candidate,
    "sigma_hf_01_external_schema_candidate.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json",
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.schema,
    `${BREATHER_RECEIVER_NORMAL_FORCE_MARGIN_SCHEMA}.rule-kernel-payload-boundary/v0`,
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary
      .schema_validation_intake_target.schema,
    SIGMA_HF_01_EXTERNAL_SCHEMA_INTAKE_SCHEMA,
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.required_schema_fields.includes(
      "proof_grade_derivation_schema_statement",
    ),
    true,
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.evidence
      .proof_grade_derivation_schema_external_input_obligation.summary
      .proof_grade_derivation_schema_external_input_received_slots,
    0,
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.evidence
      .sigma_hf_01_missing_proof_grade_fields_target.missing_field_count,
    3,
  );
  assert.deepEqual(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.evidence
      .sigma_hf_01_missing_proof_grade_fields_target.targeted_missing_fields.map((field) => field.field),
    [
      "rule_kernel_obligation_binding",
      "rule_kernel_derivation_payload_target_binding",
      "proof_grade_derivation_schema_statement",
    ],
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.evidence
      .sigma_hf_01_external_provenance_contract_replay.summary.first_failure,
    "external_schema_provenance_required_before_schema_validation_intake",
  );
  assert.equal(
    boundary.producer_route_boundary.receiver_normal_route.derivative_bundle_expected_file,
    "breather_receiver_normal_derivative_bundle.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  );
  assert.equal(
    boundary.missing_producer_objects.includes("breather_receiver_normal_force_margin_fixture.<packet-id>.json"),
    true,
  );
  assert.equal(boundary.missing_producer_objects.includes("branch_chart.json"), true);
});

test("breather force-margin fixture CLI emits source absence boundary", () => {
  const boundary = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--absence-boundary", breatherCertificateRoot], {
      encoding: "utf8",
    }),
  );

  assert.equal(boundary.pass, false);
  assert.equal(boundary.status, BREATHER_FORCE_MARGIN_STATUSES.sourceMissing);
  assert.equal(boundary.blocks_fixture_candidate, true);
  assert.equal(boundary.source_evidence.branch_chart_authorized_true_files.length, 0);
  assert.equal(boundary.required_source_boundary.consumer_fields.includes("gamma_rec_interval"), true);
  assert.equal(
    boundary.producer_route_boundary.receiver_normal_route.margin_interval_expected_file,
    "breather_receiver_normal_margin_intervals.fresh-v10-higher-fold-12-root-rebuild-v0.json",
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary
      .same_packet_impulse_direct_quadrature_source_packet_attempt.summary.first_acceptance_blocker,
    "row_projection_source_slice_coverage_certificate_absent",
  );
  assert.equal(
    boundary.producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary.evidence
      .sigma_hf_01_local_pool_nonreclassification.summary.external_schema_input_received_records,
    0,
  );
});

test("breather force-margin fixture validator accepts complete synthetic same-record fixture", () => {
  const report = validateBreatherReceiverNormalForceMarginFixture(buildPassingFixture());

  assert.equal(report.pass, true);
  assert.equal(report.verdict, "pass_priority_only");
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.passed);
  assert.equal(report.row_consumption_authorized, false);
  assert.equal(report.retained_record_count, 1);
  assert.equal(report.derivative_row_count, 1);
  assert.equal(report.margin_consumer_count, 1);
  assert.equal(report.margin_interval_count, 1);
});

test("breather force-margin fixture validator blocks before margin arithmetic without branch chart", () => {
  const report = validateBreatherReceiverNormalForceMarginFixture(
    buildPassingFixture({ branch_chart_authorized: false }),
  );

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.branchChartUnauthorized);
});

test("breather force-margin fixture validator rejects checksum drift", () => {
  const fixture = buildPassingFixture();
  fixture.receiver_normal_derivative_rows[0].branch_family_checksum = {
    retained_record_ids: ["R1", "R2"],
    aggregation_convention: "different-list",
  };
  const report = validateBreatherReceiverNormalForceMarginFixture(fixture);

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.checksumMismatch);
});

test("breather force-margin fixture validator rejects derivative-row absence", () => {
  const report = validateBreatherReceiverNormalForceMarginFixture(
    buildPassingFixture({ receiver_normal_derivative_rows: [] }),
  );

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.derivativeMissing);
});

test("breather force-margin fixture validator rejects derivative reconstruction mismatch", () => {
  const fixture = buildPassingFixture();
  fixture.receiver_normal_derivative_rows[0].D_vW_rec_interval = [0.5, 0.5];
  const report = validateBreatherReceiverNormalForceMarginFixture(fixture);

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.derivativeReconstructionFailed);
});

test("breather force-margin fixture validator rejects receiver-strength substitution marker", () => {
  const report = validateBreatherReceiverNormalForceMarginFixture(
    buildPassingFixture({ uses_source_normal_substitution: true }),
  );

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.receiverStrengthSubstitution);
});

test("breather force-margin fixture validator rejects aggregate-only consumers", () => {
  const fixture = buildPassingFixture();
  fixture.margin_consumers[0].retained_record_keys = [];
  fixture.margin_consumers[0].aggregate_only = true;
  const report = validateBreatherReceiverNormalForceMarginFixture(fixture);

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.aggregateOnly);
});

test("breather force-margin fixture validator rejects nonpositive margins", () => {
  const fixture = buildPassingFixture();
  fixture.margin_intervals[0].gamma_rec_interval = [0, 0.2];
  const report = validateBreatherReceiverNormalForceMarginFixture(fixture);

  assert.equal(report.pass, false);
  assert.equal(report.status, BREATHER_FORCE_MARGIN_STATUSES.nonpositive);
});

test("breather force-margin fixture CLI validates JSON and can emit fail-closed state", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "breather-force-margin-"));
  const fixturePath = path.join(tempDir, "fixture.json");
  fs.writeFileSync(fixturePath, JSON.stringify(buildPassingFixture()), "utf8");

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--fixture", fixturePath], { encoding: "utf8" }),
  );
  assert.equal(validation.pass, true);
  assert.equal(validation.status, BREATHER_FORCE_MARGIN_STATUSES.passed);

  const missing = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--allow-fail-closed"], { encoding: "utf8" }),
  );
  assert.equal(missing.pass, false);
  assert.equal(missing.status, BREATHER_FORCE_MARGIN_STATUSES.missing);
});
