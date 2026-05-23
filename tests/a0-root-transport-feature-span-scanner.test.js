import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-transport-feature-span-scanner.mjs", import.meta.url)
);

function sourceRoots(period = 16) {
  const roots = [];
  for (let index = 0; index < period; index += 1) {
    const phi = (2 * Math.PI * index) / period;
    roots.push({
      root_key: "I+|M+|inter_layer|active",
      receiver: "I+",
      source: "M+",
      relation: "inter_layer",
      status: "active",
      t: index,
      theta: phi,
      D_tau: 1,
      D_J: 1,
      G_r: 1,
      transport_id: `single_artifact_root_transport:${index}:M`,
      locked_fold_layer_key: false,
      transport_identity_components: {
        root_key: "I+|M+|inter_layer|active",
        cyclic_slot: index,
        same_key_root_count: period,
      },
      transport_identity_status: "single_artifact_not_refinement_stable",
    });
    roots.push({
      root_key: "I+|O+|inter_layer|active",
      receiver: "I+",
      source: "O+",
      relation: "inter_layer",
      status: "active",
      t: index,
      theta: 2 * phi,
      D_tau: 1,
      D_J: 1,
      G_r: 1,
      transport_id: `single_artifact_root_transport:${index}:O`,
      locked_fold_layer_key: false,
      transport_identity_components: {
        root_key: "I+|O+|inter_layer|active",
        cyclic_slot: index,
        same_key_root_count: period,
      },
      transport_identity_status: "single_artifact_not_refinement_stable",
    });
  }
  return roots;
}

function residualFor(index, period, mode) {
  const phi = (2 * Math.PI * index) / period;
  if (mode === "unrepresented-high-mode") {
    return [Math.cos(5 * phi), Math.sin(5 * phi), 0.5 * Math.cos(6 * phi)];
  }
  const mDJ = Math.cos(phi);
  const mDTau = Math.sin(phi);
  const oDJ = Math.cos(2 * phi);
  const oDTau = Math.sin(2 * phi);
  return [2 * mDJ - oDTau, 0.5 * mDTau, -0.3 * oDJ];
}

function fixture({ declared = ["source_layer_shear"], residualMode = "source-layer-linear" } = {}) {
  const period = 16;
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        status: "failed_direct_one_period_residuals",
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            relative_residual: 0.5,
            sampled_forcing: {
              period,
              samples: Array.from({ length: period }, (_entry, index) => ({
                t: index,
                layers: {
                  I: {
                    residual_forcing: residualFor(index, period, residualMode),
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
            period,
            declared_root_transport_quotients: declared,
            roots: sourceRoots(period),
          },
        },
      },
    ],
  };
}

function runScanner(artifact) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-feature-span-scan-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  execFileSync(process.execPath, [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty"], {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("root-transport feature-span scanner reports source-declared candidate without rerun authority", () => {
  const output = runScanner(fixture());
  const row = output.rows[0];

  assert.equal(output.artifact_schema, "a0-root-transport-feature-span-scanner/v1");
  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.status, "root_transport_feature_span_source_declared_candidate");
  assert.equal(row.best_source_declared_family.family_id, "source_layer_shear");
  assert.equal(row.best_source_declared_family.max_held_out_relative_residual <= 0.02, true);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
});

test("root-transport feature-span scanner keeps nondeclared passing family diagnostic-only", () => {
  const output = runScanner(fixture({ declared: [] }));
  const row = output.rows[0];

  assert.equal(row.status, "root_transport_feature_span_diagnostic_candidate_not_source_declared");
  assert.equal(row.best_overall_family.source_declared, false);
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
});

test("root-transport feature-span scanner reports no-go when fixed spans fail holdout", () => {
  const output = runScanner(fixture({ residualMode: "unrepresented-high-mode" }));
  const row = output.rows[0];

  assert.equal(output.status, "root_transport_feature_span_no_go");
  assert.equal(row.status, "root_transport_feature_span_no_go");
  assert.equal(row.failure_code, "all-feature-spans-fail-held-out-residual");
  assert.equal(row.best_source_declared_family.status, "source_declared_feature_span_no_go");
});
