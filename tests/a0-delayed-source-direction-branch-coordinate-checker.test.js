import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-delayed-source-direction-branch-coordinate-checker.mjs", import.meta.url)
);

function body(position, velocity = [0, 0, 0]) {
  return { position, velocity };
}

function directionFor(index, period) {
  const phi = (2 * Math.PI * index) / period;
  return [Math.cos(phi), Math.sin(phi), 0];
}

function carrierBodies() {
  return {
    "I+": body([1, 0, 0], [0, 1, 0]),
    "I-": body([-1, 0, 0], [0, -1, 0]),
  };
}

function sampleAt(t, period, { omitSourceBody = false } = {}) {
  const rootIndex = t + 1;
  const direction = directionFor(rootIndex, period);
  const sourcePosition = [1 + direction[0], direction[1], direction[2]];
  return {
    t,
    bodies: {
      ...carrierBodies(),
      ...(omitSourceBody ? {} : { "M+": body(sourcePosition) }),
    },
  };
}

function residualFor(index, period, { mismatch = false } = {}) {
  if (mismatch) {
    const phi = (2 * Math.PI * index) / period;
    return [Math.sin(3 * phi), Math.cos(5 * phi), 0.2 * Math.sin(7 * phi)];
  }
  return directionFor(index, period).map((value) => 2.5 * value);
}

function rootsFor(index) {
  return [
    {
      receiver: "I+",
      source: "M+",
      relation: "inter_layer",
      status: "active",
      t: index,
      delay: 1,
      J: 1,
    },
  ];
}

function fixture({ mismatch = false, omitSourceBody = false } = {}) {
  const period = 16;
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        row: 1,
        period,
        status: "failed_direct_one_period_residuals",
        samples: Array.from({ length: period + 1 }, (_entry, offset) =>
          sampleAt(offset - 1, period, { omitSourceBody })
        ),
        active_causal_root_ledger: Array.from({ length: period }, (_entry, index) => rootsFor(index)).flat(),
        validation: {
          root_ledger_stable_under_refinement: false,
        },
        branch_chart_source_records: {
          root_transport_source_record: {
            should_not_be_consumed: true,
          },
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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-delayed-source-direction-checker-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  execFileSync(process.execPath, [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...extraArgs], {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("delayed-source-direction checker detects a source-declared coordinate candidate", () => {
  const output = runChecker(fixture(), ["--family", "im_delayed_direction"]);
  const row = output.rows[0];
  const family = row.families[0];

  assert.equal(output.artifact_schema, "a0-delayed-source-direction-branch-coordinate-checker/v1");
  assert.equal(family.status, "delayed_source_direction_branch_coordinate_diagnostic_candidate");
  assert.equal(family.branch_coordinate.coordinate_name, "delayed_source_direction");
  assert.equal(family.source_contract.root_transport_source_record_used, false);
  assert.equal(family.source_contract.residual_used_as_feature, false);
  assert.equal(family.held_out_residual.status, "passed");
});

test("delayed-source-direction checker remains diagnostic-only without accepted history", () => {
  const output = runChecker(fixture(), ["--family", "im_delayed_direction"]);
  const family = output.rows[0].families[0];

  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.rerun_authority, "diagnostic_only_not_corrected_rerun_authority");
  assert.equal(output.corrected_rerun_authorized, false);
  assert.equal(family.corrected_rerun_authorized, false);
});

test("delayed-source-direction checker fails closed when held-out residual does not transfer", () => {
  const output = runChecker(fixture({ mismatch: true }), ["--family", "im_delayed_direction"]);
  const family = output.rows[0].families[0];

  assert.equal(output.status, "no_go");
  assert.equal(family.status, "delayed_source_direction_branch_coordinate_no_go");
  assert.equal(family.held_out_residual.status, "failed");
});

test("delayed-source-direction checker blocks missing source-position fields", () => {
  const output = runChecker(fixture({ omitSourceBody: true }), ["--family", "im_delayed_direction"]);
  const family = output.rows[0].families[0];

  assert.equal(output.status, "blocked_missing_delayed_source_direction_fields");
  assert.equal(family.status, "blocked_missing_delayed_source_direction_fields");
  assert.equal(family.failure_code, "missing-delayed-source-direction-fields");
});
