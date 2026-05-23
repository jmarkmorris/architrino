import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs", import.meta.url)
);

function body(position, velocity) {
  return { position, velocity };
}

function carrierSample(index, period) {
  const phi = (2 * Math.PI * index) / period;
  const er = [Math.cos(phi), Math.sin(phi), 0];
  const et = [-Math.sin(phi), Math.cos(phi), 0];
  return {
    t: index,
    bodies: {
      "I+": body(er, et),
      "I-": body(er.map((value) => -value), et.map((value) => -value)),
      "M+": body([0, 1, 0], [0, 0, 1]),
      "M-": body([0, -1, 0], [0, 0, -1]),
      "O+": body([0, 0, 1], [1, 0, 0]),
      "O-": body([0, 0, -1], [-1, 0, 0]),
    },
  };
}

function reciprocalScalarsFor(index, period, mode) {
  const phi = (2 * Math.PI * index) / period;
  return {
    meanD_J: Math.cos(mode * phi),
    shearProjection: Math.sin(3 * phi),
    meanJ: 1 + 0.2 * Math.cos(2 * phi),
  };
}

function residualFor(index, period, mode, { mismatch = false, projection = "velocity" } = {}) {
  const phi = (2 * Math.PI * index) / period;
  if (mismatch) {
    return [Math.cos(3 * phi), Math.sin(2 * phi), 0.5 * Math.cos(phi)];
  }
  const scalars = reciprocalScalarsFor(index, period, mode);
  const er = [Math.cos(phi), Math.sin(phi), 0];
  const et = [-Math.sin(phi), Math.cos(phi), 0];
  const source = 2 * scalars.meanD_J - 0.5 * scalars.shearProjection + 0.25 * scalars.meanJ;
  const radialSource = 1.5 * scalars.meanD_J + 0.25 * scalars.shearProjection - 0.1 * scalars.meanJ;
  const tangentialSource = -0.4 * scalars.meanD_J + 0.7 * scalars.shearProjection + 0.3 * scalars.meanJ;
  if (projection === "radial") {
    return er.map((component) => source * component);
  }
  if (projection === "radial_tangential") {
    return er.map((component, componentIndex) => radialSource * component + tangentialSource * et[componentIndex]);
  }
  return et.map((component) => source * component);
}

function fixture({ mode = 5, mismatch = false, projection = "velocity", residualTimeShift = 0 } = {}) {
  const period = 16;
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        status: "failed_direct_one_period_residuals",
        period,
        samples: Array.from({ length: period }, (_entry, index) => carrierSample(index, period)),
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            sampled_forcing: {
              period,
              samples: Array.from({ length: period }, (_entry, index) => ({
                t: index + residualTimeShift,
                layers: {
                  I: {
                    residual_forcing: residualFor(index, period, mode, { mismatch, projection }),
                  },
                },
              })),
            },
          },
        },
        active_causal_root_ledger: Array.from({ length: period }, (_entry, index) => ({
          receiver: "M+",
          source: "I+",
          relation: "inter_layer",
          status: "active",
          t: index,
          delay: 1,
          J: reciprocalScalarsFor(index, period, mode).meanJ,
        })),
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            roots: Array.from({ length: period }, (_entry, index) => ({
              receiver: "M+",
              source: "I+",
              relation: "inter_layer",
              status: "active",
              root_key: "M+|I+|inter_layer|active",
              t: index,
              theta: Math.PI / 2,
              D_J: reciprocalScalarsFor(index, period, mode).meanD_J,
              D_tau: reciprocalScalarsFor(index, period, mode).shearProjection,
              G_r: 1,
              transport_id: `slot-${index}`,
              locked_fold_layer_key: false,
            })),
          },
        },
      },
    ],
  };
}

function sourceEligibilityFixture() {
  return {
    artifact_schema: "a0-mode-band-source-eligibility/v1",
    status: "computed",
    rows: [
      {
        row: 1,
        status: "pre_fit_mode_band_source_direction_present",
        top_channel: {
          channel: "transport:M:inter_layer:I:mean_D_J",
          source_class: "root_transport_source_record",
          mode_band_energy_fraction: 1,
        },
      },
    ],
  };
}

function runChecker(artifact, extraArgs = [], sourceEligibility = null) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-reciprocal-checker-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  const args = [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs];
  if (sourceEligibility) {
    const sourceEligibilityPath = path.join(tempDir, "source-eligibility.json");
    fs.writeFileSync(sourceEligibilityPath, JSON.stringify(sourceEligibility), "utf8");
    args.push("--source-eligibility", sourceEligibilityPath);
  }
  execFileSync(process.execPath, args, { encoding: "utf8" });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("reciprocal inter-layer checker detects diagnostic candidate on declared source fields", () => {
  const output = runChecker(fixture(), [], sourceEligibilityFixture());
  const row = output.rows[0];

  assert.equal(output.artifact_schema, "a0-reciprocal-interlayer-branch-equation-checker/v1");
  assert.equal(row.status, "reciprocal_interlayer_branch_equation_diagnostic_candidate");
  assert.equal(row.held_out_residual.status, "passed");
  assert.equal(row.held_out_residual.max_held_out_relative_residual <= 0.02, true);
  assert.equal(row.source_eligibility_context.top_channel.channel, "transport:M:inter_layer:I:mean_D_J");
});

test("reciprocal inter-layer checker detects radial carrier-frame projection candidate", () => {
  const output = runChecker(fixture({ projection: "radial" }), ["--projection", "radial"], sourceEligibilityFixture());
  const row = output.rows[0];

  assert.equal(row.status, "reciprocal_interlayer_branch_equation_diagnostic_candidate");
  assert.equal(row.branch_equation.projection_mode, "radial");
  assert.equal(row.branch_equation.projection, "corrected-carrier I radial direction e_I,r");
  assert.equal(row.feature_names[0], "transport:M:inter_layer:I:mean_D_J:e_I,r");
  assert.equal(row.held_out_residual.status, "passed");
});

test("reciprocal inter-layer checker detects tangential carrier-frame projection candidate under linear time rule", () => {
  const output = runChecker(fixture({ projection: "tangential" }), [
    "--projection",
    "tangential",
    "--frame-time-rule",
    "linear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "reciprocal_interlayer_branch_equation_diagnostic_candidate");
  assert.equal(row.branch_equation.projection_mode, "tangential");
  assert.equal(row.branch_equation.frame_time_rule, "linear");
  assert.equal(row.branch_equation.projection, "corrected-carrier I tangential direction e_I,theta");
  assert.equal(row.feature_names[0], "transport:M:inter_layer:I:mean_D_J:e_I,theta");
  assert.equal(row.held_out_residual.status, "passed");
});

test("reciprocal inter-layer checker detects radial plus tangential carrier-frame projection candidate", () => {
  const output = runChecker(fixture({ projection: "radial_tangential" }), [
    "--projection",
    "radial_tangential",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "reciprocal_interlayer_branch_equation_diagnostic_candidate");
  assert.equal(row.branch_equation.projection_mode, "radial_tangential");
  assert.equal(row.degrees_of_freedom_guard.coefficient_count, 6);
  assert.equal(row.feature_names.includes("transport:M:inter_layer:I:mean_D_J:e_I,theta"), true);
  assert.equal(row.held_out_residual.status, "passed");
});

test("reciprocal inter-layer checker blocks nearest carrier-frame ties for carrier projections", () => {
  const output = runChecker(fixture({ projection: "radial", residualTimeShift: 0.5 }), [
    "--projection",
    "radial",
  ]);
  const row = output.rows[0];

  assert.equal(output.status, "blocked_missing_reciprocal_branch_equation_fields");
  assert.equal(row.status, "blocked_missing_reciprocal_branch_equation_fields");
  assert.equal(row.failure_code, "nearest-carrier-frame-ties");
  assert.equal(row.time_alignment_audit.tied_sample_count > 0, true);
});

test("reciprocal inter-layer checker reports no-go when held-out residual fails", () => {
  const output = runChecker(fixture({ mismatch: true }));
  const row = output.rows[0];

  assert.equal(output.status, "no_go");
  assert.equal(row.status, "reciprocal_interlayer_branch_equation_no_go");
  assert.equal(row.failure_code, "overfit_holdout_fail");
});

test("reciprocal inter-layer checker remains diagnostic-only without accepted history", () => {
  const output = runChecker(fixture());
  const row = output.rows[0];

  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.branch_equation.corrected_rerun_authorized, false);
});
