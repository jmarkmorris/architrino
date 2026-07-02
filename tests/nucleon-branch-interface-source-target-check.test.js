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
    row.acceptedSourceRows = row.requiredAcceptedSourceRows ?? [];
  }
  for (const sourceTarget of Object.values(target.sourceAcquisitionTargets ?? {})) {
    sourceTarget.status = "accepted";
    sourceTarget.currentEvidenceStatus = "accepted_non_fixture_source";
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
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(report.summary.firstMissingObject, "missing_accepted_nucleon_branch_interface_ledgers");
  assert.equal(
    report.summary.sourceAcquisitionFirstMissingObject,
    "missing_same_record_energy_momentum_angular_momentum_ledger",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .sourceTargetPath,
    "scripts/nuclear-atomic/proton-branch-interface-ledger-retained-evidence.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .componentShapePass,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_branch_interface_ledger
      .accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_branch_interface_ledger
      .currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_branch_interface_ledger
      .sourceTargetPath,
    "scripts/nuclear-atomic/neutron-branch-interface-ledger-retained-evidence.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_neutron_branch_interface_ledger
      .componentShapePass,
    true,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .requiredLedgerComponents,
    [
      "retained_orientation_rows",
      "closed_corridor_sharing_count",
      "branch_exposure_row",
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
  );
  assert.deepEqual(report.summary.missingRows, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
    "same_record_energy_momentum_angular_momentum_ledger",
  ]);
  assert.equal(report.channelChecks.pn_orientation_count.values.W_c, 1);
  assert.equal(report.channelChecks.pp_orientation_count.values.W_c, 0.25);
  assert.deepEqual(
    report.sourceAcquisitionCheck.rowChecks.nucleon_branch_interface_ledgers
      .missingAcceptedSourceRows,
    [
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
  );
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
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, true);
});

test("accepted branch-interface rows fail closed when a source-acquisition target loses its required component shape", () => {
  const target = acceptedTarget();
  target.sourceAcquisitionTargets.accepted_proton_branch_interface_ledger.requiredLedgerComponents =
    target.sourceAcquisitionTargets.accepted_proton_branch_interface_ledger
      .requiredLedgerComponents.filter(
        (component) => component !== "closed_corridor_sharing_count",
      );

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_source_acquisition_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .componentShapePass,
    false,
  );
  assert.deepEqual(
    report.sourceAcquisitionCheck.targetChecks.accepted_proton_branch_interface_ledger
      .missingRequiredComponents,
    ["closed_corridor_sharing_count"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.failures.some(
      (failure) =>
        failure.sourceRowId === "accepted_proton_branch_interface_ledger" &&
        failure.reason === "source_acquisition_target_shape_mismatch",
    ),
    true,
  );
});

test("accepted branch-interface rows fail closed when source rows are named but target-only", () => {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
    row.currentEvidenceStatus = "accepted_non_fixture_source";
    row.acceptedSourceRows = row.requiredAcceptedSourceRows ?? [];
  }

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_source_acquisition_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.deepEqual(
    report.sourceAcquisitionCheck.rowChecks.pn_orientation_count
      .unacceptedSourceTargets,
    [
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
  );
  assert.equal(
    report.sourceAcquisitionCheck.failures.some(
      (failure) =>
        failure.sourceRowId === "same_record_energy_momentum_angular_momentum_ledger" &&
        failure.reason === "source_acquisition_target_not_accepted",
    ),
    true,
  );
});

test("accepted branch-interface rows fail closed without upstream source acquisition", () => {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
    row.currentEvidenceStatus = "accepted_non_fixture_source";
  }

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_source_acquisition_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.sourceEvidencePass, true);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.sourceAcquisitionCheck.firstMissingAcceptedSourceRow,
    "same_record_energy_momentum_angular_momentum_ledger",
  );
  assert.deepEqual(report.sourceAcquisitionCheck.failures[0], {
    rowId: "nucleon_branch_interface_ledgers",
    reason: "missing_accepted_source_rows",
    missingAcceptedSourceRows: [
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
  });
});

test("branch-interface checker fails closed on accepted-looking priority-only rows", () => {
  const target = readTarget();
  for (const row of Object.values(target.rows)) {
    row.status = "accepted";
  }

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_source_evidence_mismatch");
  assert.equal(report.summary.sourceEvidencePass, false);
  assert.deepEqual(report.sourceEvidenceCheck.failures, [
    {
      rowId: "nucleon_branch_interface_ledgers",
      currentEvidenceStatus: "priority_packet_only",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "pn_orientation_count",
      currentEvidenceStatus: null,
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "pp_orientation_count",
      currentEvidenceStatus: null,
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
    {
      rowId: "same_record_energy_momentum_angular_momentum_ledger",
      currentEvidenceStatus: "declared in priority packet, not accepted source row",
      reason: "accepted_status_without_accepted_non_fixture_source",
    },
  ]);
  assert.deepEqual(report.summary.missingRows, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
    "same_record_energy_momentum_angular_momentum_ledger",
  ]);
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
