import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  INPUT_SCHEMA,
  OUTPUT_SCHEMA,
  buildNucleonBranchInterfaceSourceTargetCheck,
} from "../scripts/nuclear-atomic/nucleon-branch-interface-source-target-check.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/nucleon-branch-interface-source-target-check.mjs",
    import.meta.url,
  ),
);
const TARGET_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json",
    import.meta.url,
  ),
);

function readTarget() {
  return JSON.parse(fs.readFileSync(TARGET_PATH, "utf8"));
}

function acceptedTarget() {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
    row.currentEvidenceStatus = "accepted_non_fixture_source";
  }
  return target;
}

test("current branch-interface target passes algebra but blocks accepted source rows", () => {
  const report = buildNucleonBranchInterfaceSourceTargetCheck(readTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.input.schema, INPUT_SCHEMA);
  assert.equal(report.summary.status, "missing_accepted_branch_interface_rows");
  assert.equal(report.summary.algebraicPass, true);
  assert.equal(report.summary.pnPpDifferentialPass, true);
  assert.equal(report.summary.firstMissingObject, "missing_accepted_nucleon_branch_interface_ledgers");
  assert.deepEqual(report.summary.missingRows, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
    "same_record_energy_momentum_angular_momentum_ledger",
  ]);
  assert.equal(report.channelChecks.pn_orientation_count.values.W_c, 1);
  assert.equal(report.channelChecks.pp_orientation_count.values.W_c, 0.25);
  assert.equal(report.differential.passed, true);
});

test("accepted branch-interface rows pass when the same algebra is retained", () => {
  const report = buildNucleonBranchInterfaceSourceTargetCheck(acceptedTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "accepted_branch_interface_source_rows");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.deepEqual(report.summary.missingRows, []);
  assert.equal(report.summary.algebraicPass, true);
});

test("branch-interface checker fails closed on corrupted orientation algebra", () => {
  const target = acceptedTarget();
  target.rows.pp_orientation_count.W_c = 0.9;

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_algebra_mismatch");
  assert.equal(report.summary.algebraicPass, false);
  assert.deepEqual(report.summary.algebraicFailures, [
    "pp_orientation_count",
    "pn_pp_channel_differential",
  ]);
});

test("CLI require-accepted fails while current rows remain target-only", () => {
  assert.throws(
    () => {
      execFileSync(process.execPath, [SCRIPT_PATH, "--summary", "--require-accepted"], {
        encoding: "utf8",
      });
    },
    (error) => error.status === 1,
  );
});
