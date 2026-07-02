import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  INPUT_SCHEMA,
  OUTPUT_SCHEMA,
  buildConfinementFunctionalSourceTargetCheck,
} from "../scripts/nuclear-atomic/confinement-functional-source-target-check.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/confinement-functional-source-target-check.mjs",
    import.meta.url,
  ),
);
const TARGET_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/confinement-functional-source-target.v1.json",
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

test("current confinement target passes structure but blocks accepted source rows", () => {
  const report = buildConfinementFunctionalSourceTargetCheck(readTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.input.schema, INPUT_SCHEMA);
  assert.equal(report.summary.status, "missing_accepted_confinement_functional_rows");
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.dependencyPass, true);
  assert.equal(report.summary.equationPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.toyBindingRowsPass, true);
  assert.equal(report.summary.firstMissingObject, "missing_accepted_sigma_eff_extraction");
  assert.deepEqual(report.summary.missingRows, [
    "sigma_eff_extraction",
    "color_singlet_nucleon_envelope",
    "delta_E_corr_NN",
    "no_open_color_far_field",
  ]);
  assert.equal(report.toyBindingCheck.unconsumedRequiredRows.length, 0);
});

test("accepted confinement rows pass when the same dependency structure is retained", () => {
  const report = buildConfinementFunctionalSourceTargetCheck(acceptedTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "accepted_confinement_functional_source_rows");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.deepEqual(report.summary.missingRows, []);
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
});

test("confinement checker fails closed on accepted-looking priority-only rows", () => {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
  }

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_source_evidence_mismatch");
  assert.equal(report.summary.sourceEvidencePass, false);
  assert.deepEqual(report.sourceEvidenceCheck.failures, [
    {
      rowId: "sigma_eff_extraction",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "color_singlet_nucleon_envelope",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "delta_E_corr_NN",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "no_open_color_far_field",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
  ]);
  assert.deepEqual(report.summary.missingRows, [
    "sigma_eff_extraction",
    "color_singlet_nucleon_envelope",
    "delta_E_corr_NN",
    "no_open_color_far_field",
  ]);
});

test("confinement checker fails closed on corrupted Delta E equation structure", () => {
  const target = acceptedTarget();
  target.rows.delta_E_corr_NN.targetEquation = "Delta E_corr_NN(r)=unstructured";

  const report = buildConfinementFunctionalSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "confinement_functional_structure_mismatch");
  assert.equal(report.summary.structuralPass, false);
  assert.deepEqual(report.summary.structuralFailures, [
    "delta_E_corr_NN.equation",
  ]);
});

test("CLI require-accepted fails while current confinement rows remain target-only", () => {
  assert.throws(
    () => {
      execFileSync(process.execPath, [SCRIPT_PATH, "--summary", "--require-accepted"], {
        encoding: "utf8",
      });
    },
    (error) => error.status === 1,
  );
});
