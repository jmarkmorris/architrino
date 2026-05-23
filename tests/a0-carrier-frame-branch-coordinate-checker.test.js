import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-carrier-frame-branch-coordinate-checker.mjs", import.meta.url)
);

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function sub(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function normalize(vector, fallback = [1, 0, 0]) {
  const length = norm(vector);
  return length > 1e-14 ? scale(vector, 1 / length) : fallback;
}

function frameVectors(t, period, constantFrame = false) {
  if (constantFrame) {
    return {
      radial: [1, 0, 0],
      tangential: [0, 1, 0],
      normal: [0, 0, 1],
    };
  }
  const phi = (2 * Math.PI * t) / period;
  return {
    radial: [Math.cos(phi), Math.sin(phi), 0],
    tangential: [-Math.sin(phi), Math.cos(phi), 0],
    normal: [0, 0, 1],
  };
}

function carrierKinematics(t, period, constantFrame = false) {
  const phi = (2 * Math.PI * t) / period;
  return {
    radius: constantFrame ? 2 + 0.04 * t : 2 + 0.2 * Math.cos(2 * phi),
    radialVelocity: constantFrame ? 0.04 : 0.3 * Math.sin(2 * phi),
    tangentialSpeed: 1,
  };
}

function carrierSample(t, period, constantFrame = false) {
  const frame = frameVectors(t, period, constantFrame);
  const kinematics = carrierKinematics(t, period, constantFrame);
  const relPosition = scale(frame.radial, kinematics.radius);
  const relVelocity = add(
    scale(frame.radial, kinematics.radialVelocity),
    scale(frame.tangential, kinematics.tangentialSpeed)
  );
  return {
    t,
    bodies: {
      "I+": {
        position: scale(relPosition, 0.5),
        velocity: scale(relVelocity, 0.5),
      },
      "I-": {
        position: scale(relPosition, -0.5),
        velocity: scale(relVelocity, -0.5),
      },
    },
  };
}

function interpolateVector(left, right, alpha) {
  return left.map((value, index) => value + alpha * (right[index] - value));
}

function carrierAt(samples, t) {
  for (const sample of samples) {
    if (sample.t === t) {
      return sample;
    }
  }
  for (let index = 0; index < samples.length - 1; index += 1) {
    const left = samples[index];
    const right = samples[index + 1];
    if (left.t <= t && t <= right.t) {
      const alpha = (t - left.t) / (right.t - left.t);
      return {
        t,
        bodies: {
          "I+": {
            position: interpolateVector(left.bodies["I+"].position, right.bodies["I+"].position, alpha),
            velocity: interpolateVector(left.bodies["I+"].velocity, right.bodies["I+"].velocity, alpha),
          },
          "I-": {
            position: interpolateVector(left.bodies["I-"].position, right.bodies["I-"].position, alpha),
            velocity: interpolateVector(left.bodies["I-"].velocity, right.bodies["I-"].velocity, alpha),
          },
        },
      };
    }
  }
  throw new Error(`No sample for ${t}`);
}

function frameFromSample(sample) {
  const relPosition = sub(sample.bodies["I+"].position, sample.bodies["I-"].position);
  const relVelocity = sub(sample.bodies["I+"].velocity, sample.bodies["I-"].velocity);
  const radial = normalize(relPosition);
  const radialVelocity = dot(relVelocity, radial);
  const tangentialPart = sub(relVelocity, scale(radial, radialVelocity));
  const tangential = normalize(tangentialPart, [0, 1, 0]);
  return {
    radial,
    tangential,
    normal: [0, 0, 1],
    radius: norm(relPosition),
    radialVelocity,
  };
}

function fixture({ residualMode = "radial_deformation", shifted = false } = {}) {
  const period = 16;
  const constantFrame = shifted;
  const carrierTimes = shifted
    ? Array.from({ length: period + 1 }, (_entry, index) => index)
    : Array.from({ length: period }, (_entry, index) => index);
  const samples = carrierTimes.map((t) => carrierSample(t, period, constantFrame));
  const forcingTimes = Array.from({ length: period }, (_entry, index) => (shifted ? index + 0.5 : index));
  const frames = forcingTimes.map((t) => frameFromSample(carrierAt(samples, t)));
  const meanRadius = frames.reduce((sum, frame) => sum + frame.radius, 0) / frames.length;
  const meanRadialVelocity = frames.reduce((sum, frame) => sum + frame.radialVelocity, 0) / frames.length;
  const residuals = frames.map((frame, index) => {
    const radiusDelta = frame.radius - meanRadius;
    const radialVelocityDelta = frame.radialVelocity - meanRadialVelocity;
    if (residualMode === "radial_phase_state") {
      return scale(frame.radial, 2 * radiusDelta - 0.5 * radialVelocityDelta);
    }
    if (residualMode === "unrepresented") {
      const phi = (2 * Math.PI * index) / period;
      return add(scale(frame.normal, Math.cos(5 * phi)), scale(frame.tangential, 0.7 * Math.sin(3 * phi)));
    }
    return scale(frame.radial, 3 * radiusDelta);
  });
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        status: "failed_direct_one_period_residuals",
        period,
        samples,
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            sampled_forcing: {
              period,
              samples: forcingTimes.map((t, index) => ({
                t,
                layers: {
                  I: {
                    residual_forcing: residuals[index],
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

function carrierSpectrumFixture() {
  return {
    artifact_schema: "a0-carrier-frame-residual-spectrum/v1",
    status: "computed",
    rows: [
      {
        row: 1,
        status: "carrier_frame_residual_geometry_computed",
        frame_time_rule: "linear",
        diagnostic_classification: "radial_deformation_dominated",
        component_energy_fractions: { radial: 0.8 },
        mode_band_summary: {
          component_energy_fractions: { radial: 0.9 },
        },
      },
    ],
  };
}

function runChecker(artifact, extraArgs = [], carrierSpectrum = null) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-carrier-frame-coordinate-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  const args = [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs];
  if (carrierSpectrum) {
    const spectrumPath = path.join(tempDir, "spectrum.json");
    fs.writeFileSync(spectrumPath, JSON.stringify(carrierSpectrum), "utf8");
    args.push("--carrier-spectrum", spectrumPath);
  }
  execFileSync(process.execPath, args, { encoding: "utf8" });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("carrier-frame branch-coordinate checker detects one-scalar radial deformation candidate", () => {
  const output = runChecker(fixture(), ["--coordinate-family", "radial_deformation"], carrierSpectrumFixture());
  const row = output.rows[0];

  assert.equal(output.artifact_schema, "a0-carrier-frame-branch-coordinate-checker/v1");
  assert.equal(output.status, "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority");
  assert.equal(row.status, "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority");
  assert.equal(row.best_family.family_id, "radial_deformation");
  assert.equal(row.families[0].held_out_residual.status, "passed");
  assert.equal(row.carrier_spectrum_context.diagnostic_classification, "radial_deformation_dominated");
});

test("carrier-frame branch-coordinate checker uses radial rate only as companion family", () => {
  const output = runChecker(fixture({ residualMode: "radial_phase_state" }));
  const row = output.rows[0];

  assert.equal(row.status, "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority");
  assert.equal(row.best_family.family_id, "radial_phase_state");
  assert.equal(
    row.families.find((family) => family.family_id === "radial_deformation").status,
    "carrier_frame_branch_coordinate_no_go"
  );
});

test("carrier-frame branch-coordinate checker reports no-go for unrepresented source features", () => {
  const output = runChecker(fixture({ residualMode: "unrepresented" }));
  const row = output.rows[0];

  assert.equal(output.status, "carrier_frame_branch_coordinate_no_go");
  assert.equal(row.status, "carrier_frame_branch_coordinate_no_go");
  assert.equal(row.failure_code, "all-carrier-frame-branch-coordinate-families-fail");
});

test("carrier-frame branch-coordinate checker blocks ambiguous nearest alignment", () => {
  const nearest = runChecker(fixture({ shifted: true }), [
    "--coordinate-family",
    "radial_deformation",
    "--frame-time-rule",
    "nearest",
  ]);
  const linear = runChecker(fixture({ shifted: true }), [
    "--coordinate-family",
    "radial_deformation",
    "--frame-time-rule",
    "linear",
  ]);

  assert.equal(nearest.rows[0].status, "blocked_insufficient_carrier_frame_regularization");
  assert.equal(nearest.rows[0].time_alignment_audit.tied_sample_count, 16);
  assert.equal(linear.rows[0].status, "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority");
  assert.equal(linear.rows[0].time_alignment_audit.interpolation_status_counts.interpolated, 16);
});

test("carrier-frame branch-coordinate checker remains diagnostic-only without accepted history", () => {
  const output = runChecker(fixture(), ["--coordinate-family", "radial_deformation"]);
  const row = output.rows[0];

  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(row.branch_coordinate.corrected_rerun_authorized, false);
});
