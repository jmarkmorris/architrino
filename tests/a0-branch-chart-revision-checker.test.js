import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs", import.meta.url)
);

function rootRows({ rawTransportIds = false, includeLockedRows = false } = {}) {
  const roots = [];
  const period = 16;
  const pushRoot = ({ source, theta, index, locked = false }) => {
    const rootKey = `I+|${source}|inter_layer|active`;
    roots.push({
      root_key: rootKey,
      receiver: "I+",
      source,
      relation: "inter_layer",
      status: "active",
      t: index,
      theta,
      D_tau: 1,
      D_J: 1,
      G_r: 1,
      transport_id: rawTransportIds
        ? `${rootKey}|phase_bucket:${index}`
        : `single_artifact_root_transport:${roots.length}`,
      transport_identity_components: {
        root_key: rootKey,
        cyclic_slot: index,
        same_key_root_count: period,
      },
      transport_identity_status: "single_artifact_not_refinement_stable",
      locked_fold_layer_key: locked,
    });
  };
  for (let index = 0; index < period; index += 1) {
    const phase = (2 * Math.PI * index) / period;
    for (const [source, theta] of [
      ["M+", phase],
      ["O+", 2 * phase],
    ]) {
      pushRoot({ source, theta, index });
    }
    if (includeLockedRows) {
      pushRoot({ source: "M-", theta: phase, index, locked: true });
    }
  }
  return roots;
}

function fixture({ declaredQuotients = ["source_layer_shear"], rawTransportIds = false, includeLockedRows = false } = {}) {
  const roots = rootRows({ rawTransportIds, includeLockedRows });
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        schema: "a0-tier1-fold-layer-locked-one-period-attempt-row/v1",
        row: 1,
        status: "failed_direct_one_period_residuals",
        validation: {
          benchmark_inputs_excluded: true,
          root_ledger_stable_under_refinement: false,
          direct_residuals_passed: false,
        },
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            status: "refined_basis_no_go",
            relative_residual: 0.35,
            tolerance: 0.02,
            basis_group_count: 4,
            equation_count: 48,
            sample_count: 16,
            basis_resolution: {
              basis_mode: "i_receiver_root_key_phase_bin",
              equality_group_key:
                "for receiver_layer:I: relation + receiver_layer + source_layer + polarity_pair + root_key + phase_bin + projection",
            },
            equality_constraints: {
              root_key_resolved_mu_test: true,
              phase_bin_branch_coordinate_test: true,
              locked_fold_layer_keys_excluded: true,
              benchmark_inputs_excluded: true,
            },
            sampled_forcing: {
              period: 16,
              samples: Array.from({ length: 16 }, (_entry, index) => ({
                t: index,
                layers: {
                  I: {
                    residual_forcing: [0, 0, 0],
                  },
                },
              })),
            },
          },
        },
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            source: "active_causal_root_ledger",
            coordinate_family: "I_receiver_inter_layer_J_delay_shear",
            period: 16,
            root_count: roots.length,
            active_root_count: roots.length,
            bucket_spacing: 1,
            gap_normalizer: 1,
            gap_source: "nearest_same-key_active_root_time_gap",
            default_root_transport_quotient: "source_layer_shear",
            declared_root_transport_quotients: declaredQuotients,
            transport_identity_schema: "a0-root-transport-identity/v1",
            transport_identity_scope: "single_artifact_cyclic_root_slot",
            transport_identity_rule:
              "transport_id is scoped to this synthetic artifact and is not a refinement-stable transport identity.",
            transport_identity_refinement_stable: false,
            phase_origin_covariance_schema: "a0-root-transport-phase-origin-covariance/v1",
            phase_origin_covariance_status: "single-artifact-phase-origin-not-certified",
            phase_origin_covariance_certified: false,
            phase_origin_tested_offsets: [0],
            phase_origin_covariance_rule:
              "A future certificate must compare quotient features after cyclic reindexing.",
            phase_origin_rule:
              "theta=2*pi*(t-delay)/T mod 2*pi; D_tau and D_J use cyclic central differences by root_key over observation phase.",
            equality_group_key:
              "receiver + source + relation + status + declared quotient + phase origin + single-artifact transport slot",
            locked_fold_layer_keys_excluded: true,
            benchmark_inputs_excluded: true,
            root_transport_certified: false,
            transport_certification_status: "single-artifact-source-record-only",
            roots,
          },
        },
      },
    ],
  };
}

function runChecker(artifact, args = []) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-branch-checker-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  execFileSync(process.execPath, [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...args], {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("root-transport source-declared quotient fails closed on identity certification", () => {
  const output = runChecker(fixture(), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "root-transport-identity-not-refinement-stable");
  assert.equal(row.anti_overfit_residual.R_src.status, "passed");
  assert.equal(row.anti_overfit_residual.R_df.status, "passed");
  assert.equal(row.anti_overfit_residual.R_xval.status, "passed");
  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(row.anti_overfit_residual.R_transport.failure_code, "root-transport-identity-not-refinement-stable");
});

test("root-transport diagnostic quotient is rejected unless source-declared", () => {
  const output = runChecker(fixture(), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_signed_polarity_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "root-transport-quotient-not-source-declared");
  assert.equal(row.anti_overfit_residual.R_src.status, "failed");
  assert.equal(row.anti_overfit_residual.R_src.failure_code, "root-transport-quotient-not-source-declared");
});

test("root-transport checker flags raw root-key phase-bucket transport ids", () => {
  const output = runChecker(fixture({ rawTransportIds: true }), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "root-transport-identity-uses-raw-root-key-phase-bucket");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-transport-identity-uses-raw-root-key-phase-bucket"
  );
  assert.equal(row.anti_overfit_residual.R_transport.raw_root_key_phase_bucket_transport_id_count, 32);
});

test("root-transport checker reports locked roots as excluded from feature rows", () => {
  const output = runChecker(fixture({ includeLockedRows: true }), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_coord.selected_locked_root_count, 0);
  assert.equal(row.anti_overfit_residual.R_coord.excluded_locked_root_count, 16);
  assert.equal(row.harmonic_audit.root_transport_coordinate.source_record_root_count, 48);
  assert.equal(row.anti_overfit_residual.R_df.full_column_rank, true);
});
