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
const NO_OPEN_COLOR_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/nuclear-atomic/no-open-color-far-field-source-acquisition-blocker.v1.json",
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
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, true);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, []);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(report.summary.firstMissingObject, "missing_accepted_nucleon_branch_interface_ledgers");
  assert.equal(
    report.summary.sourceAcquisitionFirstMissingObject,
    "missing_no_open_color_far_field",
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
    report.sourceAcquisitionCheck.targetChecks.no_open_color_far_field
      .currentEvidenceStatus,
    "blocked_missing_same_record_no_open_color_audit",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.no_open_color_far_field
      .sourceTargetPath,
    "scripts/nuclear-atomic/no-open-color-far-field-source-acquisition-blocker.v1.json",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.status,
    "blocked_missing_accepted_source_rows",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingAcceptedSourceRow,
    "no_open_color_far_field",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingObject,
    "missing_no_open_color_far_field",
  );
  assert.equal(report.sourceAcquisitionBlockerMap.blockedSourceRowCount, 1);
  const noOpenColorBlocker = report.sourceAcquisitionBlockerMap.blockers[0];
  assert.equal(noOpenColorBlocker.sourceRowId, "no_open_color_far_field");
  assert.equal(noOpenColorBlocker.targetId, "no_open_color_far_field_target_0001");
  assert.equal(noOpenColorBlocker.accepted, false);
  assert.deepEqual(noOpenColorBlocker.requiredLedgerComponents, [
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
  ]);
  assert.deepEqual(noOpenColorBlocker.sourceAcquisitionRoute, {
    claimLevel:
      "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
    requiredRowsBeforeUse: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
    ],
    requiredAcceptedRowsBeforeUse: [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
    feedsRowsAfterAcceptance: [
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
    notRequiredBeforeAcceptance: [
      "accepted_branch_interface_rows",
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
  });
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .no_open_color_far_field.requiredSufficientConditionRows,
    [
      "Delta_E_corr_NN_tail_limit",
      "bounded_residual_overlap",
      "large_r_zero_limit",
      "K_open_finite",
    ],
  );
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .no_open_color_far_field.requiredAcceptedSourceRowsBeforeUse,
    [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "same_record_energy_momentum_angular_momentum_ledger",
    ],
  );
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .no_open_color_far_field.directToyConsumers,
    {
      coefficients: [],
      graphRules: [],
    },
  );
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .nucleon_branch_interface_ledgers.requiredSameRecordRows,
    [
      "accepted_proton_branch_interface_ledger",
      "accepted_neutron_branch_interface_ledger",
      "pn_orientation_count",
      "pp_orientation_count",
      "same_record_energy_momentum_angular_momentum_ledger",
      "no_open_color_far_field",
    ],
  );
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .nucleon_branch_interface_ledgers.requiredClosureRows,
    [
      "finite_range_residual",
      "color_singlet_closure",
      "same_record_no_open_color_audit",
    ],
  );
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .nucleon_branch_interface_ledgers.requiredLimitStatements,
    [
      "lim_R_to_infty_N_open_R_eq_0",
      "N_open_R_le_K_open_T_NN_R_squared",
      "lim_R_to_infty_T_NN_R_eq_0",
    ],
  );
  assert.deepEqual(
    noOpenColorBlocker.acceptedSourceRowProofTargets
      .nucleon_branch_interface_ledgers.directToyConsumers,
    {
      coefficients: ["alphaCorr", "alphaPair", "alphaPack", "dSat", "maxDegree"],
      graphRules: [
        "bounded_degree_surface_depleted_corridor_estimator",
        "finite_tail_saturation_check",
      ],
    },
  );
  assert.deepEqual(noOpenColorBlocker.blockedBranchRows, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
  ]);
  assert.deepEqual(noOpenColorBlocker.directToyConsumers, {
    coefficients: [
      "alphaCorr",
      "alphaPair",
      "alphaPack",
      "dSat",
      "maxDegree",
      "pnCorridorPairReward",
      "pnPairMismatchCost",
      "ppCorridorPairReward",
      "ppPairMismatchCost",
    ],
    graphRules: [
      "bounded_degree_surface_depleted_corridor_estimator",
      "finite_tail_saturation_check",
    ],
  });
  assert.match(noOpenColorBlocker.claimLevel ?? report.sourceAcquisitionBlockerMap.claimLevel, /not accepted source evidence/);
  const blocker = JSON.parse(fs.readFileSync(NO_OPEN_COLOR_BLOCKER_PATH, "utf8"));
  assert.equal(blocker.sourceKind, "no_open_color_far_field");
  assert.equal(blocker.currentStatus, "blocked_missing_same_record_no_open_color_audit");
  assert.deepEqual(blocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket, []);
  assert.equal(
    blocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "no_open_color_far_field",
    ),
    true,
  );
  assert.equal(
    blocker.candidateClosureScaffold.largeRClosure,
    "\\lim_{R\\to\\infty}\\mathcal N_{\\mathrm{open}}(R)=0",
  );
  assert.equal(
    blocker.candidateClosureScaffold.tailToFarFieldBound,
    "\\mathcal N_{\\mathrm{open}}(R)\\le K_{\\mathrm{open}}\\,\\mathcal T_{NN}(R)^2",
  );
  assert.equal(
    blocker.candidateClosureScaffold.largeRClosureRoute,
    "\\lim_{R\\to\\infty}\\mathcal T_{NN}(R)=0\\;\\wedge\\;K_{\\mathrm{open}}<\\infty\\;\\Rightarrow\\;\\lim_{R\\to\\infty}\\mathcal N_{\\mathrm{open}}(R)=0",
  );
  assert.equal(
    blocker.candidateClosureScaffold.sameRecordWitness.includes(
      "\\mathcal B_{\\mathrm{br}}",
    ),
    true,
  );
  assert.equal(
    blocker.candidateClosureScaffold.requiredAcceptedRowsBeforeUse.includes(
      "finite_range_residual",
    ),
    true,
  );
  assert.equal(
    blocker.candidateClosureScaffold.requiredAcceptedRowsBeforeUse.includes(
      "accepted_branch_interface_rows",
    ),
    false,
  );
  assert.equal(
    blocker.candidateClosureScaffold.requiredAcceptedRowsBeforeUse.includes(
      "accepted_proton_branch_interface_ledger",
    ),
    true,
  );
  assert.equal(
    blocker.candidateNoOpenColorFarFieldLemma.lemmaId,
    "finite_tail_same_record_audit_implies_no_open_color_far_field_0001",
  );
  assert.deepEqual(
    blocker.candidateNoOpenColorFarFieldLemma.derivedRowsIfAccepted,
    ["lim_R_to_infty_N_open_R_eq_0", "no_open_color_far_field"],
  );
  assert.equal(
    blocker.candidateNoOpenColorFarFieldLemma.proofSteps.some(
      (step) => step.stepId === "same_record_witness",
    ),
    true,
  );
  assert.equal(
    blocker.candidateNoOpenColorFarFieldLemma.proofSteps.some(
      (step) => step.stepId === "zero_limit_transfer",
    ),
    true,
  );
  assert.equal(
    blocker.candidateNoOpenColorFarFieldLemma.missingAcceptanceRows.includes(
      "K_open_finite",
    ),
    true,
  );
  assert.equal(
    blocker.candidateNoOpenColorFarFieldLemma.missingAcceptanceRows.includes(
      "same_record_no_open_color_audit",
    ),
    true,
  );
  assert.equal(
    blocker.candidateNoOpenColorFarFieldLemma.missingAcceptanceRows.includes(
      "same_record_branch_interface_confinement_functional_audit",
    ),
    false,
  );
  assert.deepEqual(
    blocker.candidateNoOpenColorFarFieldLemma.feedsRowsAfterAcceptance,
    [
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
      "accepted_branch_interface_rows",
    ],
  );
  assert.deepEqual(blocker.acceptedSourceRowProofTarget.requiredSufficientConditionRows, [
    "Delta_E_corr_NN_tail_limit",
    "bounded_residual_overlap",
    "large_r_zero_limit",
    "K_open_finite",
  ]);
  assert.deepEqual(blocker.acceptedSourceRowProofTarget.requiredSameRecordRows, [
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
    "accepted_proton_branch_interface_ledger",
    "accepted_neutron_branch_interface_ledger",
    "same_record_energy_momentum_angular_momentum_ledger",
    "no_open_color_far_field",
  ]);
  assert.deepEqual(
    blocker.requiredAcceptanceCondition.sameRecordNoOpenColorAudit.mustConsumeRows,
    [
      "Delta_E_corr_NN_tail_limit",
      "finite_range_residual",
      "color_singlet_closure",
      "same_event_ledger",
    ],
  );
  assert.deepEqual(
    blocker.candidateClosureScaffold.notRequiredBeforeAcceptance,
    [
      "accepted_branch_interface_rows",
      "nucleon_branch_interface_ledgers",
      "pn_orientation_count",
      "pp_orientation_count",
    ],
  );
  assert.equal(blocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
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
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .same_record_energy_momentum_angular_momentum_ledger.accepted,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .same_record_energy_momentum_angular_momentum_ledger.currentEvidenceStatus,
    "accepted_non_fixture_source",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks
      .same_record_energy_momentum_angular_momentum_ledger.sourceTargetPath,
    "scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json",
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
  ]);
  assert.equal(report.channelChecks.pn_orientation_count.values.W_c, 1);
  assert.equal(report.channelChecks.pp_orientation_count.values.W_c, 0.25);
  assert.deepEqual(
    report.sourceAcquisitionCheck.rowChecks.nucleon_branch_interface_ledgers
      .missingAcceptedSourceRows,
    ["no_open_color_far_field"],
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
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, true);
  assert.equal(report.summary.sourceAcquisitionPass, true);
  assert.equal(
    report.sourceAcquisitionBlockerMap.status,
    "all_required_source_rows_acquired",
  );
  assert.equal(report.sourceAcquisitionBlockerMap.blockedSourceRowCount, 0);
  assert.deepEqual(report.sourceAcquisitionBlockerMap.blockers, []);
});

test("branch-interface rows fail closed when the accepted-row proof target loses closure rows", () => {
  const target = acceptedTarget();
  target.acceptedSourceRowProofTargets.nucleon_branch_interface_ledgers.requiredClosureRows =
    target.acceptedSourceRowProofTargets.nucleon_branch_interface_ledgers
      .requiredClosureRows.filter(
        (row) => row !== "same_record_no_open_color_audit",
      );

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_proof_target_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "nucleon_branch_interface_ledgers",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredClosureRows"],
    },
  ]);
});

test("branch-interface rows fail closed when the accepted-row proof target loses no-open limit statements", () => {
  const target = acceptedTarget();
  target.acceptedSourceRowProofTargets.nucleon_branch_interface_ledgers.requiredLimitStatements =
    target.acceptedSourceRowProofTargets.nucleon_branch_interface_ledgers
      .requiredLimitStatements.filter(
        (statement) => statement !== "N_open_R_le_K_open_T_NN_R_squared",
      );

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_proof_target_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "nucleon_branch_interface_ledgers",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredLimitStatements"],
    },
  ]);
});

test("branch-interface rows fail closed when the no-open proof target loses finite-tail sufficient conditions", () => {
  const target = acceptedTarget();
  target.acceptedSourceRowProofTargets.no_open_color_far_field.requiredSufficientConditionRows =
    target.acceptedSourceRowProofTargets.no_open_color_far_field
      .requiredSufficientConditionRows.filter(
        (row) => row !== "K_open_finite",
      );

  const report = buildNucleonBranchInterfaceSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "branch_interface_proof_target_incomplete");
  assert.equal(report.summary.allRequiredRowsAccepted, true);
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "no_open_color_far_field",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredSufficientConditionRows"],
    },
  ]);
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
    ["no_open_color_far_field"],
  );
  assert.equal(
    report.sourceAcquisitionCheck.failures.some(
      (failure) =>
        failure.sourceRowId === "no_open_color_far_field" &&
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
    "no_open_color_far_field",
  );
  assert.deepEqual(report.sourceAcquisitionCheck.failures[0], {
    rowId: "nucleon_branch_interface_ledgers",
    reason: "missing_accepted_source_rows",
    missingAcceptedSourceRows: ["no_open_color_far_field"],
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
  ]);
  assert.deepEqual(report.summary.missingRows, [
    "nucleon_branch_interface_ledgers",
    "pn_orientation_count",
    "pp_orientation_count",
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
