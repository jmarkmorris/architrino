import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-carrier-frame-residual-spectrum.mjs", import.meta.url)
);

function body(position, velocity) {
  return { position, velocity };
}

function frameVectors(index, period) {
  const phi = (2 * Math.PI * index) / period;
  return {
    radial: [Math.cos(phi), Math.sin(phi), 0],
    tangential: [-Math.sin(phi), Math.cos(phi), 0],
    normal: [0, 0, 1],
  };
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function carrierSample(index, period) {
  const frame = frameVectors(index, period);
  return {
    t: index,
    bodies: {
      "I+": body(frame.radial, frame.tangential),
      "I-": body(scale(frame.radial, -1), scale(frame.tangential, -1)),
    },
  };
}

function residualFor(index, period, { dominant = "radial" } = {}) {
  const phi = (2 * Math.PI * index) / period;
  const frame = frameVectors(index, period);
  if (dominant === "normal") {
    return add(scale(frame.normal, 4 * Math.cos(5 * phi)), scale(frame.radial, 0.25 * Math.sin(phi)));
  }
  return add(
    add(scale(frame.radial, 4 * Math.cos(5 * phi)), scale(frame.tangential, 0.5 * Math.sin(2 * phi))),
    scale(frame.normal, 0.25 * Math.cos(phi))
  );
}

function fixture(options = {}) {
  const period = 16;
  const sampleCount = options.shiftedForcing ? period + 1 : period;
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        status: "failed_direct_one_period_residuals",
        period,
        samples: Array.from({ length: sampleCount }, (_entry, index) => carrierSample(index, period)),
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            sampled_forcing: {
              period,
              samples: Array.from({ length: period }, (_entry, index) => ({
                t: options.shiftedForcing ? index + 0.5 : index,
                layers: {
                  I: {
                    residual_forcing: residualFor(options.shiftedForcing ? index + 0.5 : index, period, options),
                  },
                },
              })),
            },
          },
        },
      },
    ],
  };
}

function reciprocalFixture() {
  return {
    artifact_schema: "a0-reciprocal-interlayer-branch-equation-checker/v1",
    status: "no_go",
    rows: [
      {
        row: 1,
        status: "reciprocal_interlayer_branch_equation_no_go",
        failure_code: "overfit_holdout_fail",
        full_fit: { relative_residual: 0.8 },
        held_out_residual: { max_held_out_relative_residual: 1.4 },
      },
    ],
  };
}

function runSpectrum(artifact, extraArgs = [], reciprocalArtifact = null) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-carrier-frame-spectrum-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  const args = [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs];
  if (reciprocalArtifact) {
    const reciprocalPath = path.join(tempDir, "reciprocal.json");
    fs.writeFileSync(reciprocalPath, JSON.stringify(reciprocalArtifact), "utf8");
    args.push("--reciprocal-check", reciprocalPath);
  }
  execFileSync(process.execPath, args, { encoding: "utf8" });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("carrier-frame residual spectrum localizes radial high-mode residual", () => {
  const output = runSpectrum(fixture(), ["--max-mode", "6"]);
  const row = output.rows[0];

  assert.equal(output.artifact_schema, "a0-carrier-frame-residual-spectrum/v1");
  assert.equal(row.status, "carrier_frame_residual_geometry_computed");
  assert.equal(row.diagnostic_classification, "radial_deformation_dominated");
  assert.equal(row.spectrum.dominant_mode_summary.components.radial.mode, 5);
  assert.equal(row.mode_band_summary.component_energy_fractions.radial > 0.99, true);
  assert.equal(row.nearest_sample_audit.max_tie_count, 1);
});

test("carrier-frame residual spectrum reports normal-plane dominance", () => {
  const output = runSpectrum(fixture({ dominant: "normal" }), ["--max-mode", "6"]);
  const row = output.rows[0];

  assert.equal(row.diagnostic_classification, "normal_plane_wobble_dominated");
  assert.equal(row.spectrum.dominant_mode_summary.components.normal.mode, 5);
  assert.equal(row.component_energy_fractions.normal > 0.99, true);
});

test("carrier-frame residual spectrum can use declared linear time alignment", () => {
  const nearest = runSpectrum(fixture({ shiftedForcing: true }), ["--max-mode", "6"]);
  const linear = runSpectrum(fixture({ shiftedForcing: true }), [
    "--max-mode",
    "6",
    "--frame-time-rule",
    "linear",
  ]);

  assert.equal(nearest.rows[0].diagnostic_classification, "insufficient_frame_regularization");
  assert.equal(linear.rows[0].frame_time_rule, "linear");
  assert.equal(linear.rows[0].diagnostic_classification, "radial_deformation_dominated");
  assert.equal(linear.rows[0].nearest_sample_audit.interpolation_status_counts.interpolated, 16);
});

test("carrier-frame residual spectrum remains diagnostic-only and copies reciprocal context", () => {
  const withoutContext = runSpectrum(fixture(), ["--max-mode", "6"]);
  const withContext = runSpectrum(fixture(), ["--max-mode", "6"], reciprocalFixture());
  const row = withContext.rows[0];

  assert.equal(withContext.accepted_history_boundary, false);
  assert.equal(withContext.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.reciprocal_context.row_status, "reciprocal_interlayer_branch_equation_no_go");
  assert.deepEqual(row.component_norms, withoutContext.rows[0].component_norms);
  assert.deepEqual(row.spectrum.modes, withoutContext.rows[0].spectrum.modes);
});
