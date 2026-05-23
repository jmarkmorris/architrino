import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-root-loop-branch-coordinate-checker.mjs", import.meta.url)
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
    },
  };
}

function loopState(index, period) {
  const phi = (2 * Math.PI * index) / period;
  return {
    logJBase: 0.2 * Math.sin(phi),
    logJCurl: Math.cos(3 * phi),
    delayCurl: 0.3 * Math.sin(2 * phi),
  };
}

function rootsFor(index, period, { omitReturn = false } = {}) {
  const state = loopState(index, period);
  const roots = [];
  for (const iPolarity of ["+", "-"]) {
    for (const mPolarity of ["+", "-"]) {
      roots.push({
        receiver: `I${iPolarity}`,
        source: `M${mPolarity}`,
        relation: "inter_layer",
        status: "active",
        t: index,
        delay: 1,
        J: Math.exp(state.logJBase),
      });
      if (!omitReturn) {
        roots.push({
          receiver: `M${mPolarity}`,
          source: `I${iPolarity}`,
          relation: "inter_layer",
          status: "active",
          t: index,
          delay: 1 + state.delayCurl,
          J: Math.exp(state.logJBase + state.logJCurl),
        });
      }
    }
  }
  return roots;
}

function residualFor(index, period, { mismatch = false } = {}) {
  const phi = (2 * Math.PI * index) / period;
  if (mismatch) {
    return [Math.cos(phi), Math.sin(5 * phi), 0.2 * Math.cos(4 * phi)];
  }
  const er = [Math.cos(phi), Math.sin(phi), 0];
  const et = [-Math.sin(phi), Math.cos(phi), 0];
  const state = loopState(index, period);
  return er.map((component, componentIndex) => 1.2 * state.logJCurl * component - 0.7 * state.delayCurl * et[componentIndex]);
}

function fixture({ mismatch = false, omitReturn = false } = {}) {
  const period = 16;
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        period,
        status: "failed_direct_one_period_residuals",
        samples: Array.from({ length: period }, (_entry, index) => carrierSample(index, period)),
        active_causal_root_ledger: Array.from({ length: period }, (_entry, index) =>
          rootsFor(index, period, { omitReturn })
        ).flat(),
        validation: {
          root_ledger_stable_under_refinement: false,
        },
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            sampled_forcing: {
              period,
              samples: Array.from({ length: period }, (_entry, index) => ({
                t: index,
                layers: {
                  I: {
                    residual_forcing: residualFor(index, period, { mismatch }),
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

function runChecker(artifact, extraArgs = []) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-root-loop-checker-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  execFileSync(process.execPath, [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs], {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("root-loop checker detects a pre-fit I-M loop coordinate candidate", () => {
  const output = runChecker(fixture(), ["--family", "im_loop_curl"]);
  const row = output.rows[0];
  const family = row.families[0];

  assert.equal(output.artifact_schema, "a0-root-loop-branch-coordinate-checker/v1");
  assert.equal(family.status, "root_loop_branch_coordinate_diagnostic_candidate");
  assert.equal(family.branch_coordinate.coordinate_name, "mu_root_loop_holonomy");
  assert.equal(family.source_contract.root_transport_source_record_used, false);
  assert.equal(family.held_out_residual.status, "passed");
});

test("root-loop checker remains diagnostic-only without accepted history", () => {
  const output = runChecker(fixture(), ["--family", "im_loop_curl"]);
  const family = output.rows[0].families[0];

  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(output.corrected_rerun_authorized, false);
  assert.equal(family.corrected_rerun_authorized, false);
});

test("root-loop checker fails closed when held-out residual does not transfer", () => {
  const output = runChecker(fixture({ mismatch: true }), ["--family", "im_loop_curl"]);
  const family = output.rows[0].families[0];

  assert.equal(output.status, "no_go");
  assert.equal(family.status, "root_loop_branch_coordinate_no_go");
  assert.equal(family.held_out_residual.status, "failed");
});

test("root-loop checker blocks missing reciprocal active-root loop pairs", () => {
  const output = runChecker(fixture({ omitReturn: true }), ["--family", "im_loop_curl"]);
  const family = output.rows[0].families[0];

  assert.equal(output.status, "blocked_missing_root_loop_coordinate_fields");
  assert.equal(family.status, "blocked_missing_root_loop_coordinate_fields");
  assert.equal(family.failure_code, "missing-root-loop-pairs");
});
