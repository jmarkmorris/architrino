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
  buildBreatherReceiverNormalForceMarginAbsenceBoundary,
  buildBreatherReceiverNormalForceMarginFixtureSchema,
  validateBreatherReceiverNormalForceMarginFixture,
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
