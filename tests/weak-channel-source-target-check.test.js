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
const REACTION_EVENT_LEDGER_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/equation-mapping/weak-reaction-event-ledger-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);
const WEAK_NOETHER_SEA_RESPONSE_BLOCKER_PATH = fileURLToPath(
  new URL(
    "../scripts/equation-mapping/weak-noether-sea-response-source-acquisition-blocker.v1.json",
    import.meta.url,
  ),
);

function readTarget() {
  return JSON.parse(fs.readFileSync(TARGET_PATH, "utf8"));
}

function sourceAcquisitionAcceptedTarget() {
  const target = readTarget();
  for (const sourceTarget of Object.values(target.sourceAcquisitionTargets ?? {})) {
    sourceTarget.status = "accepted";
    sourceTarget.currentEvidenceStatus = "accepted_non_fixture_source";
  }
  return target;
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
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, true);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, []);
  assert.equal(report.summary.sourceAcquisitionPass, false);
  assert.equal(
    report.summary.sourceAcquisitionFirstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.status,
    "blocked_missing_accepted_source_rows",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingAcceptedSourceRow,
    "va_chirality_gate",
  );
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingObject,
    "missing_accepted_va_chirality_gate",
  );
  assert.equal(report.sourceAcquisitionBlockerMap.blockedSourceRowCount, 7);
  const vaBlocker = report.sourceAcquisitionBlockerMap.blockers[0];
  assert.deepEqual(vaBlocker.blockedWeakRows, ["va_chirality_gate"]);
  assert.deepEqual(vaBlocker.directToyConsumers, {
    coefficients: [],
    graphRules: [],
  });
  assert.deepEqual(vaBlocker.sourceAcquisitionRoute, {
    claimLevel:
      "priority-only source-acquisition route; not accepted source evidence and not promotion evidence",
    requiredRowsBeforeUse: [
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_row",
      "same_domain_rows",
    ],
    requiredAcceptedRowsBeforeUse: [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_row",
      "same_domain_rows",
    ],
    feedsRowsAfterAcceptance: [
      "ckm_overlap_readout",
      "pmns_overlap_readout",
      "weak_corridor_provenance",
      "effective_gauge_covariance_witness",
      "reaction_event_ledger",
    ],
    notRequiredBeforeAcceptance: [
      "ckm_overlap_readout",
      "pmns_overlap_readout",
      "weak_corridor_provenance",
      "effective_gauge_covariance_witness",
      "reaction_event_ledger",
      "noether_sea_response",
    ],
    mustRemainDistinctFrom: [],
  });
  assert.deepEqual(
    vaBlocker.acceptedSourceRowProofTargets.va_chirality_gate
      .requiredChiralitySelectionRows,
    [
      "charged_current_left_channel_selection",
      "right_channel_charged_current_suppression",
      "va_chirality_row",
      "muon_decay_michel_parameter_binding",
    ],
  );
  assert.deepEqual(
    vaBlocker.acceptedSourceRowProofTargets.va_chirality_gate.directToyConsumers,
    {
      coefficients: [],
      graphRules: [],
    },
  );
  assert.equal(
    vaBlocker.nextProofTarget,
    "accepted V-A chirality gate in the retained weak-exposure domain",
  );
  const reactionEventBlocker = report.sourceAcquisitionBlockerMap.blockers.find(
    (blockerEntry) => blockerEntry.sourceRowId === "reaction_event_ledger",
  );
  assert.deepEqual(reactionEventBlocker.directToyConsumers, {
    coefficients: ["alphaAsym", "betaValleySlope"],
    graphRules: ["beta_stable_band_center"],
  });
  assert.deepEqual(
    reactionEventBlocker.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "weak_visible_branch_ledger",
      "weak_projection",
      "weak_quotient",
      "weak_exposure_record",
      "va_chirality_gate",
      "energy_momentum_angular_momentum_accounting",
    ],
  );
  assert.deepEqual(
    reactionEventBlocker.sourceAcquisitionRoute.feedsRowsAfterAcceptance,
    ["noether_sea_response"],
  );
  assert.deepEqual(
    reactionEventBlocker.acceptedSourceRowProofTargets.reaction_event_ledger
      .requiredConservationRows,
    [
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
    ],
  );
  assert.deepEqual(
    reactionEventBlocker.acceptedSourceRowProofTargets.reaction_event_ledger
      .requiredEventBalanceRows,
    [
      "incoming_weak_domain_rows",
      "energy_conservation_row",
      "momentum_conservation_row",
      "angular_momentum_conservation_row",
      "emitted_product_ledger",
      "recoil_accounting",
      "weak_event_noether_sea_update_route",
    ],
  );
  assert.deepEqual(
    reactionEventBlocker.acceptedSourceRowProofTargets.reaction_event_ledger
      .directToyConsumers,
    {
      coefficients: ["alphaAsym", "betaValleySlope"],
      graphRules: ["beta_stable_band_center"],
    },
  );
  const weakNoetherBlocker = report.sourceAcquisitionBlockerMap.blockers.find(
    (blockerEntry) => blockerEntry.sourceRowId === "noether_sea_response",
  );
  assert.deepEqual(weakNoetherBlocker.directToyConsumers, {
    coefficients: ["seaImbalancePenalty"],
    graphRules: [],
  });
  assert.deepEqual(
    weakNoetherBlocker.sourceAcquisitionRoute.requiredAcceptedRowsBeforeUse,
    [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
  );
  assert.deepEqual(weakNoetherBlocker.sourceAcquisitionRoute.mustRemainDistinctFrom, [
    "retained_window_noether_sea_response_provider",
  ]);
  assert.deepEqual(
    weakNoetherBlocker.acceptedSourceRowProofTargets.noether_sea_response
      .requiredUpdateRows,
    [
      "weak_quotient",
      "reaction_event_ledger",
      "noether_sea_update_row",
      "same_domain_rows",
    ],
  );
  assert.deepEqual(
    weakNoetherBlocker.acceptedSourceRowProofTargets.noether_sea_response
      .mustRemainDistinctFrom,
    ["retained_window_noether_sea_response_provider"],
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
  assert.deepEqual(
    blocker.acceptedSourceRowProofTarget.requiredChiralitySelectionRows,
    [
      "charged_current_left_channel_selection",
      "right_channel_charged_current_suppression",
      "va_chirality_row",
      "muon_decay_michel_parameter_binding",
    ],
  );
  assert.equal(blocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.weak_quotient.componentShapePass,
    true,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.reaction_event_ledger.accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.reaction_event_ledger
      .currentEvidenceStatus,
    "blocked_missing_reaction_event_ledger",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.reaction_event_ledger
      .sourceTargetPath,
    "scripts/equation-mapping/weak-reaction-event-ledger-source-acquisition-blocker.v1.json",
  );
  const reactionBlocker = JSON.parse(
    fs.readFileSync(REACTION_EVENT_LEDGER_BLOCKER_PATH, "utf8"),
  );
  assert.equal(reactionBlocker.sourceKind, "reaction_event_ledger");
  assert.equal(reactionBlocker.currentStatus, "blocked_missing_reaction_event_ledger");
  assert.equal(
    reactionBlocker.requiredAcceptanceCondition.sameRecordEventBalance.balanceEquation,
    "L_{weak}^{in}+L_{sea}^{in}=L_{emitted}+L_{recoil}+L_{heat/radiation}+Delta L_{sea}^{weak}",
  );
  assert.equal(
    reactionBlocker.requiredAcceptanceCondition.sameRecordEventBalance.mustBindTo.includes(
      "weak_event_noether_sea_update_route",
    ),
    true,
  );
  assert.deepEqual(reactionBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket, []);
  assert.equal(
    reactionBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "reaction_event_ledger",
    ),
    true,
  );
  assert.equal(reactionBlocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.noether_sea_response.accepted,
    false,
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.noether_sea_response
      .currentEvidenceStatus,
    "blocked_missing_weak_noether_sea_response",
  );
  assert.equal(
    report.sourceAcquisitionCheck.targetChecks.noether_sea_response
      .sourceTargetPath,
    "scripts/equation-mapping/weak-noether-sea-response-source-acquisition-blocker.v1.json",
  );
  const noetherBlocker = JSON.parse(
    fs.readFileSync(WEAK_NOETHER_SEA_RESPONSE_BLOCKER_PATH, "utf8"),
  );
  assert.equal(noetherBlocker.sourceKind, "noether_sea_response");
  assert.equal(noetherBlocker.currentStatus, "blocked_missing_weak_noether_sea_response");
  assert.deepEqual(noetherBlocker.localEvidenceBoundary.acceptedSourceRowsByThisPacket, []);
  assert.equal(
    noetherBlocker.localEvidenceBoundary.notAcceptedByThisPacket.includes(
      "noether_sea_response",
    ),
    true,
  );
  assert.equal(noetherBlocker.localEvidenceBoundary.scoreDecision, "no_score_increase");
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

test("weak-channel source-acquisition map clears when target rows are accepted", () => {
  const report = buildWeakChannelSourceTargetCheck(sourceAcquisitionAcceptedTarget(), {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.sourceAcquisitionPass, true);
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, true);
  assert.deepEqual(report.sourceAcquisitionBlockerMap, {
    status: "all_required_source_rows_acquired",
    claimLevel:
      "source-acquisition blocker map; not accepted source evidence and not promotion evidence",
    firstMissingAcceptedSourceRow: null,
    firstMissingObject: null,
    blockedSourceRowCount: 0,
    blockers: [],
  });
});

test("weak-channel checker fails closed when a weak proof target loses conservation rows", () => {
  const target = sourceAcquisitionAcceptedTarget();
  target.acceptedSourceRowProofTargets.reaction_event_ledger.requiredConservationRows =
    target.acceptedSourceRowProofTargets.reaction_event_ledger.requiredConservationRows.filter(
      (row) => row !== "recoil_accounting",
    );

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_proof_target_incomplete");
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "reaction_event_ledger",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredConservationRows"],
    },
  ]);
});

test("weak-channel checker fails closed when the V-A proof target loses chirality selection rows", () => {
  const target = sourceAcquisitionAcceptedTarget();
  target.acceptedSourceRowProofTargets.va_chirality_gate.requiredChiralitySelectionRows =
    target.acceptedSourceRowProofTargets.va_chirality_gate.requiredChiralitySelectionRows.filter(
      (row) => row !== "right_channel_charged_current_suppression",
    );

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_proof_target_incomplete");
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "va_chirality_gate",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredChiralitySelectionRows"],
    },
  ]);
});

test("weak-channel checker fails closed when a weak proof target loses event-balance rows", () => {
  const target = sourceAcquisitionAcceptedTarget();
  target.acceptedSourceRowProofTargets.reaction_event_ledger.requiredEventBalanceRows =
    target.acceptedSourceRowProofTargets.reaction_event_ledger.requiredEventBalanceRows.filter(
      (row) => row !== "weak_event_noether_sea_update_route",
    );

  const report = buildWeakChannelSourceTargetCheck(target, {
    inputPath: TARGET_PATH,
  });

  assert.equal(report.summary.status, "weak_channel_proof_target_incomplete");
  assert.equal(report.summary.acceptedSourceRowProofTargetPass, false);
  assert.deepEqual(report.summary.acceptedSourceRowProofTargetFailures, [
    {
      rowId: "reaction_event_ledger",
      reason: "accepted_source_row_proof_target_shape_mismatch",
      missingFields: [],
      mismatchedFields: ["requiredEventBalanceRows"],
    },
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
  assert.equal(
    report.sourceAcquisitionBlockerMap.firstMissingAcceptedSourceRow,
    "weak_quotient",
  );
  assert.deepEqual(
    report.sourceAcquisitionBlockerMap.blockers[0].blockedWeakRows,
    ["weak_quotient"],
  );
  assert.deepEqual(report.sourceAcquisitionBlockerMap.blockers[0].directToyConsumers, {
    coefficients: [
      "alphaAsym",
      "betaValleySlope",
      "seaImbalancePenalty",
    ],
    graphRules: ["beta_stable_band_center"],
  });
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
