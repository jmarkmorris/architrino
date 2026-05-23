import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-mode-band-source-eligibility.mjs", import.meta.url)
);

function body(position, velocity) {
  return { position, velocity };
}

function sample(index, period, mode = 5) {
  const phi = (2 * Math.PI * index) / period;
  const vx = Math.cos(mode * phi);
  const vy = Math.sin(mode * phi);
  return {
    t: index,
    bodies: {
      "I+": body([1, 0, 0], [vx, vy, 0]),
      "I-": body([-1, 0, 0], [-vx, -vy, 0]),
      "M+": body([0, 1, 0], [0, Math.cos(2 * phi), 0]),
      "M-": body([0, -1, 0], [0, -Math.cos(2 * phi), 0]),
      "O+": body([0, 0, 1], [0, 0, Math.sin(phi)]),
      "O-": body([0, 0, -1], [0, 0, -Math.sin(phi)]),
    },
  };
}

function fixture({ mode = 5 } = {}) {
  const period = 16;
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        status: "failed_direct_one_period_residuals",
        period,
        samples: Array.from({ length: period }, (_entry, index) => sample(index, period, mode)),
        active_causal_root_ledger: Array.from({ length: period }, (_entry, index) => ({
          receiver: "I+",
          source: "M+",
          relation: "inter_layer",
          status: "active",
          t: index,
          delay: 1 + 0.1 * Math.cos((2 * Math.PI * index) / period),
          J: 1 + 0.01 * Math.sin((2 * Math.PI * index) / period),
        })),
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            roots: [],
          },
        },
      },
    ],
  };
}

function residualSpectrumFixture() {
  return {
    artifact_schema: "a0-root-transport-residual-spectrum/v1",
    status: "computed",
    rows: [
      {
        row: 1,
        status: "residual_spectrum_computed",
        spectrum: {
          dominant_mode_summary: {
            total: { mode: 6, energy_fraction: 0.2 },
          },
          modes: [
            { mode: 4, total_energy_fraction: 0.1 },
            { mode: 5, total_energy_fraction: 0.2 },
            { mode: 6, total_energy_fraction: 0.3 },
            { mode: 7, total_energy_fraction: 0.1 },
          ],
        },
      },
    ],
  };
}

function runScanner(artifact, extraArgs = [], residualSpectrum = null) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-mode-band-source-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  const args = [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs];
  if (residualSpectrum) {
    const spectrumPath = path.join(tempDir, "residual-spectrum.json");
    fs.writeFileSync(spectrumPath, JSON.stringify(residualSpectrum), "utf8");
    args.push("--residual-spectrum", spectrumPath);
  }
  execFileSync(process.execPath, args, { encoding: "utf8" });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("mode-band source eligibility detects pre-fit inner velocity mode", () => {
  const output = runScanner(fixture(), ["--modes", "4,5,6,7"]);
  const row = output.rows[0];

  assert.equal(output.artifact_schema, "a0-mode-band-source-eligibility/v1");
  assert.equal(row.status, "pre_fit_mode_band_source_direction_present");
  assert.equal(row.top_channel.source_class, "corrected_carrier_state");
  assert.equal(row.top_channel.dominant_mode.mode, 5);
  assert.equal(row.top_channel.mode_band_energy_fraction > 0.99, true);
});

test("mode-band source eligibility remains diagnostic-only without rerun authority", () => {
  const output = runScanner(fixture());
  const row = output.rows[0];

  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
});

test("mode-band source eligibility copies residual spectrum context without changing source ranking", () => {
  const withoutContext = runScanner(fixture());
  const withContext = runScanner(fixture(), [], residualSpectrumFixture());

  assert.equal(
    withContext.rows[0].residual_spectrum_context.residual_spectrum_schema,
    "a0-root-transport-residual-spectrum/v1"
  );
  assert.equal(withContext.rows[0].residual_spectrum_context.target_dominant_mode.mode, 6);
  assert.equal(
    Math.abs(withContext.rows[0].residual_spectrum_context.target_mode_band_energy_fraction - 0.7) < 1e-12,
    true
  );
  assert.deepEqual(withContext.rows[0].top_channel, withoutContext.rows[0].top_channel);
  assert.deepEqual(withContext.rows[0].top_channels, withoutContext.rows[0].top_channels);
});
