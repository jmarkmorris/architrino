import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-transport-residual-spectrum.mjs", import.meta.url)
);

function fixture({ mode = 3, amplitude = 2 } = {}) {
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
            sampled_forcing: {
              period,
              samples: Array.from({ length: period }, (_entry, index) => {
                const phi = (2 * Math.PI * index) / period;
                return {
                  t: index,
                  layers: {
                    I: {
                      residual_forcing: [
                        amplitude * Math.cos(mode * phi),
                        0.5 * Math.sin(mode * phi),
                        0.25 * Math.cos(2 * phi),
                      ],
                    },
                  },
                };
              }),
            },
          },
        },
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            source: "active_causal_root_ledger",
            coordinate_family: "I_receiver_inter_layer_J_delay_shear",
            declared_root_transport_quotients: ["source_layer_shear"],
            roots: [],
          },
        },
      },
    ],
  };
}

function scanFixture() {
  return {
    artifact_schema: "a0-root-transport-feature-span-scanner/v1",
    status: "root_transport_feature_span_source_declared_candidate",
    rows: [
      {
        row: 1,
        status: "root_transport_feature_span_source_declared_candidate",
        best_source_declared_family: {
          family_id: "source_layer_shear",
          status: "source_declared_feature_span_candidate",
          max_held_out_relative_residual: 0.01,
        },
        best_overall_family: {
          family_id: "source_layer_shear",
          source_declared: true,
          status: "source_declared_feature_span_candidate",
          max_held_out_relative_residual: 0.01,
        },
      },
    ],
  };
}

function runSpectrum(artifact, extraArgs = [], scanArtifact = null) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-residual-spectrum-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  const args = [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs];
  if (scanArtifact) {
    const scanPath = path.join(tempDir, "scan.json");
    fs.writeFileSync(scanPath, JSON.stringify(scanArtifact), "utf8");
    args.push("--scan", scanPath);
  }
  execFileSync(process.execPath, args, { encoding: "utf8" });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

function modeFraction(row, mode) {
  return row.spectrum.modes.find((entry) => entry.mode === mode).total_energy_fraction;
}

test("root-transport residual spectrum detects a harmonic residual mode", () => {
  const output = runSpectrum(fixture(), ["--max-mode", "5"]);
  const row = output.rows[0];

  assert.equal(output.artifact_schema, "a0-root-transport-residual-spectrum/v1");
  assert.equal(row.status, "residual_spectrum_computed");
  assert.equal(row.spectrum.dominant_mode_summary.total.mode, 3);
  assert.equal(row.spectrum.dominant_mode_summary.components.x.mode, 3);
  assert.equal(row.spectrum.dominant_mode_summary.components.y.mode, 3);
  assert.equal(modeFraction(row, 3) > modeFraction(row, 2), true);
});

test("root-transport residual spectrum remains diagnostic-only without accepted history", () => {
  const output = runSpectrum(fixture());
  const row = output.rows[0];

  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
});

test("root-transport residual spectrum copies scan context without changing residual computation", () => {
  const withoutScan = runSpectrum(fixture(), ["--max-mode", "5"]);
  const withScan = runSpectrum(fixture(), ["--max-mode", "5"], scanFixture());
  const scanContext = withScan.rows[0].scan_context;

  assert.equal(scanContext.scan_schema, "a0-root-transport-feature-span-scanner/v1");
  assert.equal(scanContext.scan_status, "root_transport_feature_span_source_declared_candidate");
  assert.equal(scanContext.best_source_declared_family.family_id, "source_layer_shear");
  assert.deepEqual(withScan.rows[0].component_norms, withoutScan.rows[0].component_norms);
  assert.deepEqual(withScan.rows[0].spectrum.modes, withoutScan.rows[0].spectrum.modes);
  assert.deepEqual(withScan.rows[0].spectrum.dominant_mode_summary, withoutScan.rows[0].spectrum.dominant_mode_summary);
});
