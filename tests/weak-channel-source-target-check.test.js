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
const VA_CHIRALITY_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/equation-mapping/va-chirality-gate-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);

function readTarget() {
  return JSON.parse(fs.readFileSync(TARGET_PATH, "utf8"));
}

test("current weak-channel target accepts ledger, projection, quotient, and exposure but blocks downstream rows", () => {
  const report = buildWeakChannelSourceTargetCheck(readTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.schema, OUTPUT_SCHEMA);
  assert.equal(report.input.schema, INPUT_SCHEMA);
  assert.equal(report.summary.status, "missing_accepted_weak_channel_rows");
  assert.deepEqual(report.summary.acceptedRows, [
    "weak_visible_branch_ledger",
    "weak_projection",
    "weak_quotient",
    "weak_exposure_record",
  ]);
  assert.equal(report.summary.firstMissingObject, "missing_accepted_va_chirality_gate");
  assert.equal(report.summary.structuralPass, true);
  assert.equal(report.summary.domainPass, true);
  assert.equal(report.summary.gaugePass, true);
  assert.equal(report.summary.residualPass, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.summary.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(report.summary.toyBindingRowsPass, true);
  assert.deepEqual(report.summary.missingRows.slice(0, 3), [
    "va_chirality_gate",
    "ckm_overlap_readout",
    "pmns_overlap_readout",
  ]);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.weak_visible_branch_ledger.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.weak_projection.accepted,
    true,
  );
  assert.equal(report.sourceAcquisitionCheck.targetChecks.weak_quotient.accepted, true);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.weak_exposure_record.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.va_chirality_gate.accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.va_chirality_gate.currentEvidenceStatus,
    "blocked_missing_same_domain_va_chirality_gate",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.va_chirality_gate.sourceTargetPath,
    "scripts/equation-mapping/va-chirality-gate-source-acquisition-blocker.v1.json",
  );
  const blocker = JSON.parse(fs.readFileSync(VA_CHIRALITY_BLOCKER_PATH, "utf8"));
  assert.equal(blocker.sourceKind, "va_chirality_gate");
  assert.equal(blocker.currentStatus, "blocked_missing_same_domain_va_chirality_gate");
  assert.deepEqual(blocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket, []);
  assert.equal(
    blocker.localEvidenceBoundary.notAcceptedByThisPacket.includes("va_chirality_gate"),
    true,
  );
  assert.equal(blocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.weak_quotient.componentShapePass,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.weak_quotient.requiredLedgerComponents,
    [
      "weak_visible_branch_ledger",
      "weak_projection",
      "quotient_equivalence_class",
      "same_domain_rows",
      "gauge_branch_record_stability",
    ],
  );
});

test("weak-channel checker fails closed on hidden domain split", () => {
  const target = readTarget();
  target.rows.weak_quotient.domainId = "D_weak_hidden_split";

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_structure_mismatch");
  assert.equal(report.summary.domainPass, false);
  assert.deepEqual(report.summary.structuralFailures, [
    "same_domain_rows",
    "accepted_source_evidence",
  ]);
});

test("weak-channel checker fails closed on downstream accepted-looking row without source evidence", () => {
  const target = readTarget();
  target.rows.va_chirality_gate.status = "accepted";

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_structure_mismatch");
  assert.equal(report.summary.sourceEvidencePass, false);
  assert.deepEqual(report.sourceEvidenceCheck.failures, [
    {
      rowId: "va_chirality_gate",
      reason: "source_not_durable",
      sourcePath: "pending-retained-source",
    },
  ]);
});

test("weak-channel checker records malformed source-acquisition target shape", () => {
  const target = readTarget();
  target.sourceAcquisitionTargets.weak_quotient.requiredLedgerComponents =
    target.sourceAcquisitionTargets.weak_quotient.requiredLedgerComponents.filter(
      (component) => component !== "quotient_equivalence_class",
    );

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "missing_accepted_weak_channel_rows");
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.weak_quotient.componentShapePass,
    false,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.weak_quotient.missingRequiredComponents,
    ["quotient_equivalence_class"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.failures.some(
      (failure) =>
        failure.sourceRowId === "weak_quotient" &&
        failure.reason === "source_acquisition_target_shape_mismatch",
    ),
    true,
  );
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
