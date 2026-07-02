import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  INPUT_SCHEMA,
  OUTPUT_SCHEMA,
  buildWeakChannelSourceTargetCheck,
} from "../scripts/nuclear-atomic/weak-channel-source-target-check.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/nuclear-atomic/weak-channel-source-target-check.mjs", import.meta.url),
);
const TARGET_PATH = fileURLToPath(
  new URL(
    "../scripts/equation-mapping/weak-gauge-exposure-domain-muon-projection-evidence.v1.json",
    import.meta.url,
  ),
);

function readTarget() {
  return JSON.parse(fs.readFileSync(TARGET_PATH, "utf8"));
}

test("current weak-channel target accepts ledger and projection but blocks downstream rows", () => {
  const report = buildWeakChannelSourceTargetCheck(readTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.input.schema, INPUT_SCHEMA);
  assert.equal(report.summary.status, "missing_accepted_weak_channel_rows");
  assert.deepEqual(report.summary.acceptedRows, [
    "weak_visible_branch_ledger",
    "weak_projection",
  ]);
  assert.equal(report.summary.firstMissingObject, "missing_accepted_weak_quotient");
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.domainPass, true);
  assert.equal(report.summary.gaugePass, true);
  assert.equal(report.summary.residualPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.toyBindingRowsPass, true);
  assert.deepEqual(report.summary.missingRows.slice(0, 3), [
    "weak_quotient",
    "weak_exposure_record",
    "va_chirality_gate",
  ]);
});

test("weak-channel checker fails closed on hidden domain split", () => {
  const target = readTarget();
  target.rows.weak_quotient.domainId = "D_weak_hidden_split";

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_structure_mismatch");
  assert.equal(report.summary.domainPass, false);
  assert.deepEqual(report.summary.structuralFailures, ["same_domain_rows"]);
});

test("weak-channel checker fails closed on accepted-looking row without source evidence", () => {
  const target = readTarget();
  target.rows.weak_quotient.status = "accepted";

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_structure_mismatch");
  assert.equal(report.summary.sourceEvidencePass, false);
  assert.deepEqual(report.sourceEvidenceCheck.failures, [
    {
      rowId: "weak_quotient",
      reason: "source_not_durable",
      sourcePath: "pending-retained-source",
    },
  ]);
});

test("CLI require-accepted fails while current weak rows remain attempt-level", () => {
  assert.throws(
    () => {
      execFileSync(process.execPath, [SCRIPT_PATH, "--summary", "--require-accepted"], {
        encoding: "utf8",
      });
    },
    (error) => error.status === 1,
  );
});
