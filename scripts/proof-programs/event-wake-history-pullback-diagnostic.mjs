#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildDefaultNoetherSeaCompatibilityHandoffInput,
} from "./noether-sea-compatibility-handoff-diagnostic.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const EVENT_WAKE_HISTORY_PULLBACK_SCHEMA =
  "aaa-proof/event-wake-history-pullback-diagnostic/v1";

const PACKET_ID = "event_wake_history_pullback_diagnostic";
const PROMOTION_STATUS = "priority-only diagnostic";
const REQUIRED_EVENT_ROWS = ["energy_wake", "momentum_wake", "angular_momentum_wake", "medium_update"];
const REQUIRED_SOURCE_RECORD_ID = "theta_sea_branch_q0_v0";
const ACCEPTED_EVENT_PROOF_OBJECT_ROLE = "wake_history_derivation_proof_object";
const FIRST_BLOCKED_DOWNSTREAM_CONSUMER = "partial_L_EpJ";
const WAKE_HISTORY_DERIVATION_PROOF_OBJECT_PROVIDER_TARGET_SCHEMA =
  "wake-history-derivation-proof-object-provider-target/v0";
const RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID =
  "receiver-normal-retained-branch-family-first-derivative/v0";
const PROVIDER_SOURCE_CANDIDATE_FILE_FAMILY = [
  "scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs",
  "tests/event-wake-history-pullback-diagnostic.test.js",
  "reference/priorities/master-equation-closure/receiver-normal-wake-action-factor.md",
  "reference/priorities/master-equation-closure/topological-causal-root-ledger-proof-target.md",
];
const NEXT_ACCEPTED_PROVIDER_SOURCE_TARGET =
  "non-fixture accepted retained wake-history provider object carrying wake_history_derivation_proof_object for all four wake-history rows on the same retained record";
const RECEIVER_NORMAL_CONTROLS = [
  "receiver-normal-derivative-contract-row-logic",
  "receiver-normal-missing-proof-object-provider",
  "receiver-normal-proof-object-provenance-mismatch",
  "receiver-normal-missing-derivative-bundle",
  "receiver-normal-reconstruction-drift",
  "receiver-normal-record-mismatch",
  "receiver-normal-branch-family-checksum-mismatch",
];
const REQUIRED_RETAINED_RECORD_FIELDS = [
  "retained_record_key.record_id",
  "retained_record_key.branch_family_id",
  "retained_record_key.retained_root_id",
  "retained_record_key.branch_label",
  "retained_record_key.source_receiver_ids",
  "retained_record_key.direction_convention",
  "retained_record_key.receiver_time",
  "retained_record_key.source_time",
  "retained_record_key.retained_box",
  "retained_record_key.regulator_state",
  "retained_record_key.source_artifact_hash",
  "retained_record_key.source_record_id",
  "retained_record_key.variation_key",
];
const REQUIRED_RECEIVER_NORMAL_DERIVATIVE_FIELDS = [
  "receiver_normal_fields.D_s",
  "receiver_normal_fields.D_t",
  "receiver_normal_fields.zeta_s",
  "receiver_normal_fields.zeta_t",
  "receiver_normal_fields.W_rec",
  "receiver_normal_derivatives.D_vD_s",
  "receiver_normal_derivatives.D_vD_t",
  "receiver_normal_derivatives.D_vW_rec",
  "receiver_normal_derivatives.D_vW_rec_reconstruction",
];
const REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS = [
  "row_id",
  "accepted_evidence_id",
  "source_record_id",
  "event_ledger_id",
  "derivation_proof_object.role",
  "derivation_proof_object.accepted_evidence_id",
  "derivation_proof_object.row_id",
  "derivation_proof_object.source_record_id",
  "derivation_proof_object.status",
  "receiver_normal_derivative_bundle.artifact_id",
  "receiver_normal_derivative_bundle.source_record_id",
  "receiver_normal_derivative_bundle.event_ledger_id",
  "receiver_normal_derivative_bundle.consumer_row_id",
  "receiver_normal_derivative_bundle.branch_family_checksum.retained_record_ids",
  "receiver_normal_derivative_bundle.branch_family_checksum.consumer_row_ids",
  "receiver_normal_derivative_bundle.branch_family_checksum.source_artifact_hash",
];
const REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS = [
  "derivation_proof_object.role",
  "derivation_proof_object.accepted_evidence_id",
  "derivation_proof_object.row_id",
  "derivation_proof_object.source_record_id",
  "derivation_proof_object.status",
];
const DISALLOWED_ACCEPTED_EVIDENCE_SOURCES = [
  "H39/theta3minus quotient rows",
  "shell-braid residue rows",
  "old force-weight rows",
  "terminal aggregates",
  "source-normal denominators",
  "row-logic fixtures",
  "diagnostic rows",
  "sampled rows",
  "current-proxy rows",
  "cross-row bundles",
];
const REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS = {
  source_identity: [
    "source_record_id",
    "event_ledger_id",
    "retained_record_key.source_record_id",
    "retained_record_key.source_artifact_hash",
  ],
  retained_record: REQUIRED_RETAINED_RECORD_FIELDS,
  receiver_normal_branch_strength: [
    "receiver_normal_fields.D_s",
    "receiver_normal_fields.D_t",
    "receiver_normal_fields.W_rec",
  ],
  receiver_normal_derivatives: [
    "receiver_normal_derivatives.D_vD_s",
    "receiver_normal_derivatives.D_vD_t",
    "receiver_normal_derivatives.D_vW_rec",
    "receiver_normal_derivatives.D_vW_rec_reconstruction",
  ],
  proof_object_status: [
    "derivation_proof_object.role",
    "derivation_proof_object.status",
    "derivation_proof_object.accepted_evidence_id",
  ],
  proof_object_provenance: REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS,
  same_record_binding: [
    "row_id",
    "source_record_id",
    "event_ledger_id",
    "retained_record_key.record_id",
    "retained_record_key.source_record_id",
    "retained_record_key.source_artifact_hash",
    "receiver_normal_derivative_bundle.consumer_row_id",
    "receiver_normal_derivative_bundle.branch_family_checksum.retained_record_ids",
    "receiver_normal_derivative_bundle.branch_family_checksum.consumer_row_ids",
    "receiver_normal_derivative_bundle.branch_family_checksum.source_artifact_hash",
  ],
  wake_history_rows: REQUIRED_EVENT_ROWS,
};
const NUMERIC_TOLERANCE = 1e-12;

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sameArray(left, right) {
  const leftStable = Array.isArray(left) ? left.map(String).sort() : [];
  const rightStable = Array.isArray(right) ? right.map(String).sort() : [];
  return leftStable.length === rightStable.length && leftStable.every((value, index) => value === rightStable[index]);
}

function row(rowId, zeroCondition, passed, failureCode, details = {}) {
  return {
    row_id: rowId,
    zero_condition: zeroCondition,
    status: passed ? "pass" : "fail",
    failure_code: passed ? null : failureCode,
    ...details,
  };
}

export function buildDefaultEventWakeHistoryPullbackInput() {
  const sourceRecord = buildDefaultNoetherSeaCompatibilityHandoffInput().retained_branch_source_record;
  return {
    source_record_id: sourceRecord.record_id,
    event_ledger: deepClone(sourceRecord.event_ledger),
    event_evidence_rows: [],
    expected_rows: REQUIRED_EVENT_ROWS,
  };
}

function assertValidEventRowId(rowId) {
  if (rowId === "all") {
    return;
  }
  if (!REQUIRED_EVENT_ROWS.includes(rowId)) {
    throw new Error(`unknown event row: ${rowId}`);
  }
}

function buildSameRecordReceiverNormalDerivativeBundle(input, rowId, overrides = {}) {
  const retainedRecord = {
    record_id: "linear-moving-receiver-root-0",
    branch_family_id: "linear-moving-receiver-smoke",
    retained_root_id: "rootId=0",
    branch_label: "alpha0",
    source_receiver_ids: { receiver: "receiver", source: "source" },
    direction_convention: "source-emission-point-to-receiver-now",
    receiver_time: 10,
    source_time: 5,
    retained_box: "linear-moving-receiver-singleton",
    regulator_state: "simple-root-analytic-no-regulator",
    source_artifact_hash: "sha256:receiver-normal-wake-history-row-logic-v0",
    source_record_id: input.source_record_id,
    variation_key: "v=t",
    ...(overrides.retained_record_key ?? {}),
  };
  const receiverNormalFields = {
    D_s: 1,
    D_t: 1.5,
    zeta_s: 1,
    zeta_t: 1,
    W_rec: 1.5,
    ...(overrides.receiver_normal_fields ?? {}),
  };
  const receiverNormalDerivatives = {
    D_vD_s: 0.1,
    D_vD_t: 0.4,
    D_vW_rec: 0.25,
    ...(overrides.receiver_normal_derivatives ?? {}),
  };
  const branchFamilyChecksum = {
    retained_record_ids: [retainedRecord.record_id],
    consumer_row_ids: [rowId],
    source_artifact_hash: retainedRecord.source_artifact_hash,
    ...(overrides.branch_family_checksum ?? {}),
  };

  return {
    artifact_id: RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    source_record_id: input.source_record_id,
    event_ledger_id: input.event_ledger?.ledger_id ?? null,
    consumer_row_id: rowId,
    retained_record_key: retainedRecord,
    receiver_normal_fields: receiverNormalFields,
    receiver_normal_derivatives: receiverNormalDerivatives,
    branch_family_checksum: branchFamilyChecksum,
    ...Object.fromEntries(
      Object.entries(overrides).filter(
        ([key]) =>
          ![
            "retained_record_key",
            "receiver_normal_fields",
            "receiver_normal_derivatives",
            "branch_family_checksum",
          ].includes(key)
      )
    ),
  };
}

function acceptedWakeHistoryEvidence(input, rowId, options = {}) {
  const acceptedEvidenceId = `accepted_${rowId}_same_record_receiver_normal_derivative_v0`;
  const evidence = {
    row_id: rowId,
    evidence_level: "accepted_for_wake_history_closure",
    accepted_for_wake_history_closure: true,
    accepted_evidence_id: acceptedEvidenceId,
    source_record_id: input.source_record_id,
    event_ledger_id: input.event_ledger?.ledger_id ?? null,
  };
  if (options.includeProofObject !== false) {
    evidence.derivation_proof_object =
      options.derivation_proof_object ?? {
        role: ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
        accepted_evidence_id: acceptedEvidenceId,
        row_id: rowId,
        source_record_id: input.source_record_id,
        status: "accepted",
      };
  }
  if (options.includeDerivativeBundle !== false) {
    evidence.receiver_normal_derivative_bundle =
      options.receiver_normal_derivative_bundle ??
      buildSameRecordReceiverNormalDerivativeBundle(
        input,
        rowId,
        options.receiver_normal_derivative_bundle_overrides ?? {}
      );
  }
  return evidence;
}

function rowIdsForControl(eventRow) {
  assertValidEventRowId(eventRow);
  return eventRow === "all" ? REQUIRED_EVENT_ROWS : [eventRow];
}

function applyReceiverNormalControl(packet, controlName, eventRow) {
  const rowIds = rowIdsForControl(eventRow);
  if (controlName === "receiver-normal-derivative-contract-row-logic") {
    packet.event_evidence_rows = rowIds.map((rowId) =>
      acceptedWakeHistoryEvidence(packet, rowId)
    );
    return packet;
  }
  const evidenceByRow = new Map(
    REQUIRED_EVENT_ROWS.map((rowId) => [
      rowId,
      acceptedWakeHistoryEvidence(packet, rowId),
    ])
  );
  if (controlName === "receiver-normal-missing-proof-object-provider") {
    for (const rowId of rowIds) {
      evidenceByRow.set(
        rowId,
        acceptedWakeHistoryEvidence(packet, rowId, {
          includeProofObject: false,
        })
      );
    }
    packet.event_evidence_rows = [...evidenceByRow.values()];
    return packet;
  }
  if (controlName === "receiver-normal-proof-object-provenance-mismatch") {
    for (const rowId of rowIds) {
      evidenceByRow.set(
        rowId,
        acceptedWakeHistoryEvidence(packet, rowId, {
          derivation_proof_object: {
            role: ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
            accepted_evidence_id: `accepted_${rowId}_same_record_receiver_normal_derivative_v0`,
            row_id: rowId,
            source_record_id: packet.source_record_id,
            status: "priority-only diagnostic",
          },
        })
      );
    }
    packet.event_evidence_rows = [...evidenceByRow.values()];
    return packet;
  }
  if (controlName === "receiver-normal-missing-derivative-bundle") {
    for (const rowId of rowIds) {
      evidenceByRow.set(
        rowId,
        acceptedWakeHistoryEvidence(packet, rowId, {
          includeDerivativeBundle: false,
        })
      );
    }
    packet.event_evidence_rows = [...evidenceByRow.values()];
    return packet;
  }
  if (controlName === "receiver-normal-reconstruction-drift") {
    for (const rowId of rowIds) {
      evidenceByRow.set(
        rowId,
        acceptedWakeHistoryEvidence(packet, rowId, {
          receiver_normal_derivative_bundle_overrides: {
            receiver_normal_derivatives: { D_vW_rec: 0.5 },
          },
        })
      );
    }
    packet.event_evidence_rows = [...evidenceByRow.values()];
    return packet;
  }
  if (controlName === "receiver-normal-record-mismatch") {
    for (const rowId of rowIds) {
      evidenceByRow.set(
        rowId,
        acceptedWakeHistoryEvidence(packet, rowId, {
          receiver_normal_derivative_bundle_overrides: {
            source_record_id: "theta_sea_branch_q1_v0",
          },
        })
      );
    }
    packet.event_evidence_rows = [...evidenceByRow.values()];
    return packet;
  }
  if (controlName === "receiver-normal-branch-family-checksum-mismatch") {
    for (const rowId of rowIds) {
      evidenceByRow.set(
        rowId,
        acceptedWakeHistoryEvidence(packet, rowId, {
          receiver_normal_derivative_bundle_overrides: {
            branch_family_checksum: { retained_record_ids: ["other-root"] },
          },
        })
      );
    }
    packet.event_evidence_rows = [...evidenceByRow.values()];
    return packet;
  }
  throw new Error(`unknown receiver-normal control: ${controlName}`);
}

export function applyEventWakeHistoryControl(input, controlName, options = {}) {
  const packet = deepClone(input);
  if (!controlName || controlName === "none") {
    return packet;
  }
  if (RECEIVER_NORMAL_CONTROLS.includes(controlName)) {
    return applyReceiverNormalControl(
      packet,
      controlName,
      options.eventRow ?? "energy_wake"
    );
  }
  if (controlName === "missing-angular-momentum-row") {
    packet.event_ledger.rows = packet.event_ledger.rows.filter((rowId) => rowId !== "angular_momentum_wake");
    return packet;
  }
  if (controlName === "source-record-mismatch") {
    packet.source_record_id = "theta_sea_branch_q1_v0";
    return packet;
  }
  throw new Error(`unknown control: ${controlName}`);
}

function eventEvidenceById(input, rowId) {
  return (input.event_evidence_rows ?? []).find((entry) => entry?.row_id === rowId) ?? null;
}

function acceptedEvidenceAttempted(evidence) {
  return (
    evidence?.accepted_for_wake_history_closure === true ||
    evidence?.evidence_level === "accepted_for_wake_history_closure"
  );
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function nearlyEqual(left, right, tolerance = NUMERIC_TOLERANCE) {
  return Math.abs(left - right) <= tolerance * Math.max(1, Math.abs(left), Math.abs(right));
}

function present(value) {
  return value !== null && value !== undefined && value !== "";
}

function receiverNormalDerivativeBundleMismatches(input, rowId, evidence) {
  const prefix = "event_evidence.receiver_normal_derivative_bundle";
  const bundle = evidence?.receiver_normal_derivative_bundle;
  if (!bundle || typeof bundle !== "object" || Array.isArray(bundle)) {
    return [prefix];
  }

  const retainedRecord = bundle.retained_record_key ?? {};
  const fields = bundle.receiver_normal_fields ?? {};
  const derivatives = bundle.receiver_normal_derivatives ?? {};
  const checksum = bundle.branch_family_checksum ?? {};
  const mismatches = [];
  const check = (field, ok) => {
    if (!ok) {
      mismatches.push(`${prefix}.${field}`);
    }
  };

  check("artifact_id", bundle.artifact_id === RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID);
  check("consumer_row_id", bundle.consumer_row_id === rowId);
  check("source_record_id", bundle.source_record_id === evidence?.source_record_id);
  check("event_ledger_id", bundle.event_ledger_id === input.event_ledger?.ledger_id);
  check("retained_record_key.record_id", present(retainedRecord.record_id));
  check("retained_record_key.branch_family_id", present(retainedRecord.branch_family_id));
  check("retained_record_key.retained_root_id", present(retainedRecord.retained_root_id));
  check("retained_record_key.branch_label", present(retainedRecord.branch_label));
  check("retained_record_key.source_receiver_ids", present(retainedRecord.source_receiver_ids));
  check("retained_record_key.direction_convention", present(retainedRecord.direction_convention));
  check("retained_record_key.receiver_time", present(retainedRecord.receiver_time));
  check("retained_record_key.source_time", present(retainedRecord.source_time));
  check("retained_record_key.retained_box", present(retainedRecord.retained_box));
  check("retained_record_key.regulator_state", present(retainedRecord.regulator_state));
  check("retained_record_key.source_artifact_hash", present(retainedRecord.source_artifact_hash));
  check("retained_record_key.variation_key", present(retainedRecord.variation_key));
  check("retained_record_key.source_record_id", retainedRecord.source_record_id === evidence?.source_record_id);

  const numericFields = [
    ["receiver_normal_fields.D_s", fields.D_s],
    ["receiver_normal_fields.D_t", fields.D_t],
    ["receiver_normal_fields.W_rec", fields.W_rec],
    ["receiver_normal_derivatives.D_vD_s", derivatives.D_vD_s],
    ["receiver_normal_derivatives.D_vD_t", derivatives.D_vD_t],
    ["receiver_normal_derivatives.D_vW_rec", derivatives.D_vW_rec],
  ];
  for (const [field, value] of numericFields) {
    check(field, isFiniteNumber(value));
  }

  const hasNumericBundle = numericFields.every(([, value]) => isFiniteNumber(value));
  if (hasNumericBundle) {
    check("receiver_normal_fields.D_s_nonzero", Math.abs(fields.D_s) > NUMERIC_TOLERANCE);
    check("receiver_normal_fields.D_t_nonzero", Math.abs(fields.D_t) > NUMERIC_TOLERANCE);
    check("receiver_normal_fields.zeta_s", fields.zeta_s === Math.sign(fields.D_s));
    check("receiver_normal_fields.zeta_t", fields.zeta_t === Math.sign(fields.D_t));
    check(
      "receiver_normal_fields.W_rec_reconstruction",
      Math.abs(fields.D_s) > NUMERIC_TOLERANCE &&
        nearlyEqual(fields.W_rec, Math.abs(fields.D_t / fields.D_s))
    );
    const reconstructed =
      (fields.zeta_t * fields.zeta_s * (fields.D_s * derivatives.D_vD_t - fields.D_t * derivatives.D_vD_s)) /
      (fields.D_s * fields.D_s);
    check(
      "receiver_normal_derivatives.D_vW_rec_reconstruction",
      nearlyEqual(derivatives.D_vW_rec, reconstructed)
    );
  }

  check(
    "branch_family_checksum.retained_record_ids",
    Array.isArray(checksum.retained_record_ids) &&
      checksum.retained_record_ids.includes(retainedRecord.record_id)
  );
  check(
    "branch_family_checksum.consumer_row_ids",
    Array.isArray(checksum.consumer_row_ids) && checksum.consumer_row_ids.includes(rowId)
  );
  check(
    "branch_family_checksum.source_artifact_hash",
    checksum.source_artifact_hash === retainedRecord.source_artifact_hash
  );

  return mismatches;
}

function acceptedEvidenceMismatches(input, rowId, rowPresent) {
  const evidence = eventEvidenceById(input, rowId);
  const proofObject = evidence?.derivation_proof_object ?? {};
  const checks = [
    { field: "row_present", ok: rowPresent },
    {
      field: "event_evidence.accepted_for_wake_history_closure",
      ok: evidence?.accepted_for_wake_history_closure === true,
    },
    {
      field: "event_evidence.evidence_level",
      ok: evidence?.evidence_level === "accepted_for_wake_history_closure",
    },
    {
      field: "event_evidence.accepted_evidence_id",
      ok:
        typeof evidence?.accepted_evidence_id === "string" &&
        evidence.accepted_evidence_id.length > 0,
    },
    {
      field: "event_evidence.derivation_proof_object.role",
      ok: proofObject.role === ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
    },
    {
      field: "event_evidence.derivation_proof_object.accepted_evidence_id",
      ok:
        typeof evidence?.accepted_evidence_id === "string" &&
        proofObject.accepted_evidence_id === evidence.accepted_evidence_id,
    },
    {
      field: "event_evidence.derivation_proof_object.row_id",
      ok: proofObject.row_id === rowId,
    },
    {
      field: "event_evidence.derivation_proof_object.source_record_id",
      ok: proofObject.source_record_id === evidence?.source_record_id,
    },
    {
      field: "event_evidence.derivation_proof_object.status",
      ok: proofObject.status === "accepted",
    },
    {
      field: "event_evidence.source_record_id",
      ok: evidence?.source_record_id === REQUIRED_SOURCE_RECORD_ID,
    },
    {
      field: "event_evidence.event_ledger_id",
      ok: evidence?.event_ledger_id === input.event_ledger?.ledger_id,
    },
  ];
  return [
    ...checks.filter((entry) => !entry.ok).map((entry) => entry.field),
    ...receiverNormalDerivativeBundleMismatches(input, rowId, evidence),
  ];
}

function eventEvidenceSummaryForRow(input, rowId, rowPresent) {
  const evidence = eventEvidenceById(input, rowId);
  const attempted = acceptedEvidenceAttempted(evidence);
  const mismatches = attempted ? acceptedEvidenceMismatches(input, rowId, rowPresent) : [];
  const accepted = attempted && mismatches.length === 0;
  return {
    evidence_level: accepted
      ? "accepted_for_wake_history_closure"
      : attempted
      ? "accepted_evidence_contract_mismatch"
      : rowPresent
      ? "source_record_event_ledger_declared"
      : "missing",
    accepted_evidence_contract_attempted: attempted,
    accepted_evidence_mismatches: mismatches,
    accepted_for_wake_history_closure: accepted,
  };
}

function evaluateRows(input) {
  const rows = input.event_ledger?.rows ?? [];
  return REQUIRED_EVENT_ROWS.map((rowId) => {
    const rowPresent = rows.includes(rowId);
    const evidenceSummary = eventEvidenceSummaryForRow(input, rowId, rowPresent);
    return row(
      rowId,
      `${rowId} is present in the retained event ledger`,
      rowPresent,
      "event.ledger_residual",
      {
        event_ledger_id: input.event_ledger?.ledger_id ?? null,
        ...evidenceSummary,
      }
    );
  });
}

function acceptedEvidenceSummary(eventRows) {
  const rowEvidence = REQUIRED_EVENT_ROWS.map((rowId) => {
    const eventRow = eventRows.find((entry) => entry.row_id === rowId);
    return {
      row_id: rowId,
      evidence_level: eventRow?.evidence_level ?? "missing",
      accepted_evidence_contract_attempted:
        eventRow?.accepted_evidence_contract_attempted === true,
      accepted_evidence_mismatches:
        eventRow?.accepted_evidence_mismatches ?? [],
      accepted_for_wake_history_closure:
        eventRow?.accepted_for_wake_history_closure === true,
    };
  });
  const countsByEvidenceLevel = {};
  for (const entry of rowEvidence) {
    countsByEvidenceLevel[entry.evidence_level] =
      (countsByEvidenceLevel[entry.evidence_level] ?? 0) + 1;
  }
  const acceptedRowCount = rowEvidence.filter(
    (entry) => entry.accepted_for_wake_history_closure
  ).length;
  return {
    required_row_count: REQUIRED_EVENT_ROWS.length,
    accepted_row_count: acceptedRowCount,
    accepted_for_wake_history_closure:
      acceptedRowCount === REQUIRED_EVENT_ROWS.length,
    counts_by_evidence_level: countsByEvidenceLevel,
    row_evidence: rowEvidence,
  };
}

function receiverNormalFailureCode(eventRow) {
  if (eventRow?.status === "fail") {
    return eventRow.failure_code ?? "event.ledger_residual";
  }
  if (eventRow?.accepted_for_wake_history_closure === true) {
    return null;
  }
  const mismatches = eventRow?.accepted_evidence_mismatches ?? [];
  if (
    eventRow?.accepted_evidence_contract_attempted !== true ||
    mismatches.includes("event_evidence.receiver_normal_derivative_bundle")
  ) {
    return "receiver-normal-first-derivative-row-missing";
  }
  if (
    mismatches.some((field) =>
      [
        "event_evidence.receiver_normal_derivative_bundle.receiver_normal_fields.W_rec_reconstruction",
        "event_evidence.receiver_normal_derivative_bundle.receiver_normal_derivatives.D_vW_rec_reconstruction",
      ].includes(field)
    )
  ) {
    return "receiver-normal-derivative-reconstruction-failed";
  }
  if (
    mismatches.some((field) =>
      field.startsWith("event_evidence.receiver_normal_derivative_bundle.branch_family_checksum.")
    )
  ) {
    return "branch-family-consumer-checksum-mismatch";
  }
  if (
    mismatches.some((field) =>
      field.startsWith("event_evidence.receiver_normal_derivative_bundle.")
    )
  ) {
    return "receiver-normal-derivative-record-mismatch";
  }
  if (
    mismatches.some((field) =>
      field.startsWith("event_evidence.derivation_proof_object.")
    )
  ) {
    const proofObjectMismatches = mismatches.filter((field) =>
      field.startsWith("event_evidence.derivation_proof_object.")
    );
    if (
      proofObjectMismatches.length === 1 &&
      proofObjectMismatches[0] === "event_evidence.derivation_proof_object.status"
    ) {
      return "wake-history-derivation-proof-object-status-not-accepted";
    }
    if (proofObjectMismatches.length < REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS.length) {
      return "wake-history-derivation-proof-object-provenance-mismatch";
    }
    return "wake-history-derivation-proof-object-missing";
  }
  return "accepted_evidence_contract_mismatch";
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0))];
}

function requiredObjectBlockers(eventRow) {
  if (eventRow?.status === "fail") {
    return ["retained_event_ledger_row"];
  }
  if (eventRow?.accepted_for_wake_history_closure === true) {
    return [];
  }
  const blockers = [];
  const mismatches = eventRow?.accepted_evidence_mismatches ?? [];
  if (eventRow?.accepted_evidence_contract_attempted !== true) {
    blockers.push("wake_history_derivation_proof_object");
    blockers.push("receiver_normal_derivative_bundle");
  }
  for (const field of mismatches) {
    if (field === "event_evidence.accepted_evidence_id") {
      blockers.push("accepted_evidence_id");
    } else if (field === "event_evidence.source_record_id") {
      blockers.push("retained_source_record_id");
    } else if (field === "event_evidence.event_ledger_id") {
      blockers.push("retained_event_ledger_id");
    } else if (field.startsWith("event_evidence.derivation_proof_object.")) {
      blockers.push("wake_history_derivation_proof_object");
    } else if (field.startsWith("event_evidence.receiver_normal_derivative_bundle")) {
      blockers.push("receiver_normal_derivative_bundle");
    }
  }
  return uniqueStrings(blockers);
}

function receiverNormalDerivativeContractSummary(eventRows) {
  const row_contracts = REQUIRED_EVENT_ROWS.map((rowId) => {
    const eventRow = eventRows.find((entry) => entry.row_id === rowId);
    const failureCode = receiverNormalFailureCode(eventRow);
    return {
      row_id: rowId,
      row_present: eventRow?.status === "pass",
      derivative_contract_attempted:
        eventRow?.accepted_evidence_contract_attempted === true,
      receiver_normal_derivative_bundle_accepted:
        eventRow?.accepted_for_wake_history_closure === true,
      failure_code: failureCode,
      required_object_blockers: requiredObjectBlockers(eventRow),
      accepted_evidence_mismatches:
        eventRow?.accepted_evidence_mismatches ?? [],
    };
  });
  const acceptedRowIds = row_contracts
    .filter((entry) => entry.receiver_normal_derivative_bundle_accepted)
    .map((entry) => entry.row_id);
  const blockedRows = row_contracts.filter(
    (entry) => !entry.receiver_normal_derivative_bundle_accepted
  );
  const failureCounts = {};
  for (const entry of blockedRows) {
    failureCounts[entry.failure_code] = (failureCounts[entry.failure_code] ?? 0) + 1;
  }
  return {
    artifact_id: RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    required_row_ids: REQUIRED_EVENT_ROWS,
    accepted_row_ids: acceptedRowIds,
    blocked_row_ids: blockedRows.map((entry) => entry.row_id),
    first_blocked_row_id: blockedRows[0]?.row_id ?? null,
    first_failure_code: blockedRows[0]?.failure_code ?? null,
    failure_counts: failureCounts,
    all_required_rows_bound:
      acceptedRowIds.length === REQUIRED_EVENT_ROWS.length,
    row_contracts,
  };
}

function firstMissingFieldFamily(derivativeContractSummary) {
  if (
    derivativeContractSummary.row_contracts.some((entry) =>
      entry.required_object_blockers.includes("receiver_normal_derivative_bundle")
    )
  ) {
    return "receiver_normal_derivative_bundle";
  }
  if (
    derivativeContractSummary.row_contracts.some((entry) =>
      entry.required_object_blockers.includes(ACCEPTED_EVENT_PROOF_OBJECT_ROLE)
    )
  ) {
    return ACCEPTED_EVENT_PROOF_OBJECT_ROLE;
  }
  if (!derivativeContractSummary.all_required_rows_bound) {
    return "accepted_wake_history_event_row";
  }
  return ACCEPTED_EVENT_PROOF_OBJECT_ROLE;
}

function wakeHistoryDerivationProofObjectProviderTarget() {
  return {
    schema: WAKE_HISTORY_DERIVATION_PROOF_OBJECT_PROVIDER_TARGET_SCHEMA,
    target_status: "fail_closed_provider_target",
    provider_object_required: true,
    accepted_non_fixture_provider_required: true,
    executable_replay_flag: "--provider-target",
    proof_object_role: ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
    derivative_artifact_id: RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    required_event_row_ids: REQUIRED_EVENT_ROWS,
    required_wake_history_row_ids: REQUIRED_EVENT_ROWS,
    required_retained_record_fields: REQUIRED_RETAINED_RECORD_FIELDS,
    required_receiver_normal_derivative_fields:
      REQUIRED_RECEIVER_NORMAL_DERIVATIVE_FIELDS,
    required_proof_object_fields: REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS,
    required_provenance_fields: REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS,
    required_provider_object_field_groups:
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS,
    disallowed_accepted_evidence_sources: DISALLOWED_ACCEPTED_EVIDENCE_SOURCES,
    retained_provider_status_required: "accepted",
    accepts_row_logic_fixture: false,
    first_downstream_consumer: FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
    downstream_release_condition:
      "accepted non-fixture retained wake_history_derivation_proof_object provider binds all four wake-history rows on the same retained record",
  };
}

function sameRecordIdentityBoundary(derivativeContractSummary) {
  const blockedRows = derivativeContractSummary.row_contracts.filter((entry) =>
    entry.required_object_blockers.includes("receiver_normal_derivative_bundle")
  );
  return {
    status:
      blockedRows.length === 0
        ? "same_record_identity_row_logic_bound"
        : "same_record_identity_unbound",
    required_event_row_ids: REQUIRED_EVENT_ROWS,
    blocked_row_ids: blockedRows.map((entry) => entry.row_id),
    required_retained_record_fields: REQUIRED_RETAINED_RECORD_FIELDS,
    required_receiver_normal_derivative_fields:
      REQUIRED_RECEIVER_NORMAL_DERIVATIVE_FIELDS,
    required_shared_record_identity_fields: [
      "source_record_id",
      "event_ledger_id",
      "retained_record_key.record_id",
      "retained_record_key.source_record_id",
      "receiver_normal_derivative_bundle.consumer_row_id",
    ],
    first_missing_field_family:
      blockedRows.length === 0
        ? null
        : "receiver_normal_derivative_bundle.same_retained_record_identity",
  };
}

function proofObjectProvenanceBoundary(derivativeContractSummary) {
  const proofRows = derivativeContractSummary.row_contracts.filter((entry) =>
    entry.required_object_blockers.includes(ACCEPTED_EVENT_PROOF_OBJECT_ROLE)
  );
  return {
    status:
      proofRows.length === 0
        ? "proof_object_provenance_row_logic_bound"
        : "wake_history_derivation_proof_object_provenance_unbound",
    blocked_row_ids: proofRows.map((entry) => entry.row_id),
    required_proof_object_fields: REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS,
    required_provenance_fields: REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS,
    required_provider_status: "accepted",
    first_missing_field_family:
      proofRows.length === 0
        ? null
        : ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
  };
}

function downstreamConsumerBoundary() {
  return {
    consumer_id: FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
    status: "blocked_by_missing_wake_history_derivation_proof_object_provider",
    release_condition:
      "accepted_retained_provider_ready true for wake_history_derivation_proof_object",
    required_provider_target_schema:
      WAKE_HISTORY_DERIVATION_PROOF_OBJECT_PROVIDER_TARGET_SCHEMA,
  };
}

function providerSourceAcquisitionBlocker(derivativeContractSummary) {
  return {
    status: "source_acquisition_required",
    provider_object_role: ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
    provider_status_required: "accepted",
    accepted_provider_source_status:
      "absent_non_fixture_accepted_retained_provider",
    searched_candidate_file_family: PROVIDER_SOURCE_CANDIDATE_FILE_FAMILY,
    candidate_file_family_result:
      "diagnostic-and-priority-only; no accepted retained provider object found",
    next_source_target: NEXT_ACCEPTED_PROVIDER_SOURCE_TARGET,
    first_missing_field_family: firstMissingFieldFamily(derivativeContractSummary),
    missing_provider_field_groups: {
      source_identity:
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.source_identity,
      retained_record: REQUIRED_RETAINED_RECORD_FIELDS,
      receiver_normal_branch_strength:
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.receiver_normal_branch_strength,
      receiver_normal_derivative:
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.receiver_normal_derivatives,
      proof_object: REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS,
      provenance: REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS,
      same_record_binding:
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.same_record_binding,
      wake_history_rows:
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.wake_history_rows,
    },
    excluded_as_accepted_provider_evidence:
      DISALLOWED_ACCEPTED_EVIDENCE_SOURCES,
    downstream_consumer_remaining_blocked: FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
  };
}

function wakeHistoryDerivationProofObjectBoundary(derivativeContractSummary) {
  const missingProofObjectRows = derivativeContractSummary.row_contracts
    .filter((entry) =>
      entry.required_object_blockers.includes(ACCEPTED_EVENT_PROOF_OBJECT_ROLE)
    )
    .map((entry) => entry.row_id);
  const missingDerivativeRows = derivativeContractSummary.row_contracts
    .filter((entry) =>
      entry.required_object_blockers.includes("receiver_normal_derivative_bundle")
    )
    .map((entry) => entry.row_id);
  const firstBlockedRowId =
    missingProofObjectRows[0] ??
    missingDerivativeRows[0] ??
    derivativeContractSummary.first_blocked_row_id;

  return {
    provider_target: wakeHistoryDerivationProofObjectProviderTarget(),
    expected_proof_object_role: ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
    expected_derivative_artifact_id: RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    accepted_retained_provider_ready: false,
    provider_status: "wake_history_derivation_proof_object_missing",
    first_blocked_event_row_id: firstBlockedRowId ?? null,
    first_blocked_downstream_consumer: FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
    first_missing_field_family: firstMissingFieldFamily(derivativeContractSummary),
    required_event_row_ids: REQUIRED_EVENT_ROWS,
    missing_proof_object_row_ids: missingProofObjectRows,
    missing_derivative_bundle_row_ids: missingDerivativeRows,
    required_retained_record_fields: REQUIRED_RETAINED_RECORD_FIELDS,
    required_receiver_normal_derivative_fields:
      REQUIRED_RECEIVER_NORMAL_DERIVATIVE_FIELDS,
    required_proof_object_fields: REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS,
    required_provenance_fields: REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS,
    required_provider_object_field_groups:
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS,
    same_record_identity_boundary:
      sameRecordIdentityBoundary(derivativeContractSummary),
    proof_object_provenance_boundary:
      proofObjectProvenanceBoundary(derivativeContractSummary),
    provider_source_acquisition_blocker:
      providerSourceAcquisitionBlocker(derivativeContractSummary),
    downstream_consumer_boundary: downstreamConsumerBoundary(),
    accepted_provider_source:
      "absent; local search found no non-fixture accepted retained wake-history provider object",
  };
}

export function buildEventWakeHistoryPullbackDiagnostic(input = buildDefaultEventWakeHistoryPullbackInput()) {
  const eventRows = evaluateRows(input);
  const sourceRecordOk = input.source_record_id === REQUIRED_SOURCE_RECORD_ID;
  const expectedRowsOk = sameArray(input.expected_rows, REQUIRED_EVENT_ROWS);
  const eventRowsOk = eventRows.every((entry) => entry.status === "pass");
  const failedRows = eventRows.filter((entry) => entry.status === "fail");
  if (!sourceRecordOk) {
    failedRows.unshift({ row_id: "source_record_id", failure_code: "residual.provenance_gap" });
  }
  if (!expectedRowsOk) {
    failedRows.unshift({ row_id: "expected_rows", failure_code: "event.ledger_residual" });
  }
  const boundaryClosed = sourceRecordOk && expectedRowsOk && eventRowsOk;
  const acceptedSummary = acceptedEvidenceSummary(eventRows);
  const derivativeContractSummary = receiverNormalDerivativeContractSummary(eventRows);

  return {
    schema: EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
    artifact_schema: EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    claim_level:
      "diagnostic-only priority artifact; does not close the action boundary, retain a branch, or update a validation gate",
    source_record_id: input.source_record_id,
    event_ledger_id: input.event_ledger?.ledger_id ?? null,
    boundary_status: boundaryClosed ? "closed" : "failed",
    residual_norm: boundaryClosed ? 0 : null,
    row_refs: input.event_ledger?.rows ?? [],
    accepted_evidence_summary: acceptedSummary,
    receiver_normal_derivative_contract_summary: derivativeContractSummary,
    wake_history_derivation_proof_object_boundary:
      wakeHistoryDerivationProofObjectBoundary(derivativeContractSummary),
    event_rows: [
      row(
        "source_record_id",
        "event wake-history rows use the retained Noether sea source record",
        sourceRecordOk,
        "residual.provenance_gap",
        { required_source_record_id: REQUIRED_SOURCE_RECORD_ID }
      ),
      row(
        "expected_rows",
        "expected wake-history rows are declared before closure is claimed",
        expectedRowsOk,
        "event.ledger_residual",
        { expected_rows: REQUIRED_EVENT_ROWS, declared_rows: input.expected_rows ?? [] }
      ),
      ...eventRows,
    ],
    result: {
      diagnostic_status: boundaryClosed ? "diagnostic_passed_priority_only" : "diagnostic_failed",
      retained_branch: false,
      updates_live_validation_gate: false,
      accepted_event_evidence_for_closure:
        acceptedSummary.accepted_for_wake_history_closure,
      receiver_normal_derivative_contract_ready:
        derivativeContractSummary.all_required_rows_bound,
      failure_code: failedRows[0]?.failure_code ?? null,
      first_failed_row: failedRows[0]?.row_id ?? null,
      first_failure_status:
        failedRows[0]?.failure_code ?? "event_wake_history_pullback_compatible_priority_only",
      strongest_artifact:
        "same-source event wake-history pullback diagnostic for energy, momentum, angular-momentum, and medium-update rows",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function sameStringArray(left, right) {
  const leftStable = Array.isArray(left) ? left : [];
  const rightStable = Array.isArray(right) ? right : [];
  return (
    leftStable.length === rightStable.length &&
    leftStable.every((value, index) => value === rightStable[index])
  );
}

function validateAcceptedEvidenceSummary(artifact, errors) {
  const summary = artifact.accepted_evidence_summary;
  assertField(summary && typeof summary === "object" && !Array.isArray(summary), "accepted_evidence_summary must be an object", errors);
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    return;
  }
  assertField(summary.required_row_count === REQUIRED_EVENT_ROWS.length, "accepted_evidence_summary.required_row_count must match required event rows", errors);
  assertField(Array.isArray(summary.row_evidence), "accepted_evidence_summary.row_evidence must be an array", errors);
  if (!Array.isArray(summary.row_evidence) || !Array.isArray(artifact.event_rows)) {
    return;
  }

  let acceptedRowCount = 0;
  for (const rowId of REQUIRED_EVENT_ROWS) {
    const eventRow = artifact.event_rows.find((entry) => entry.row_id === rowId);
    const evidence = summary.row_evidence.find((entry) => entry.row_id === rowId);
    assertField(Boolean(evidence), `accepted_evidence_summary.row_evidence must include ${rowId}`, errors);
    if (!evidence) {
      continue;
    }
    const rowEvidenceLevel = eventRow?.evidence_level ?? "missing";
    const rowAccepted = eventRow?.accepted_for_wake_history_closure === true;
    const rowAttempted = eventRow?.accepted_evidence_contract_attempted === true;
    const rowMismatches = eventRow?.accepted_evidence_mismatches ?? [];
    if (evidence.accepted_for_wake_history_closure === true) {
      acceptedRowCount += 1;
    }
    assertField(evidence.evidence_level === rowEvidenceLevel, `${rowId} accepted evidence level must match event row`, errors);
    assertField(evidence.accepted_for_wake_history_closure === rowAccepted, `${rowId} accepted flag must match event row`, errors);
    assertField(evidence.accepted_evidence_contract_attempted === rowAttempted, `${rowId} accepted attempt flag must match event row`, errors);
    assertField(sameStringArray(evidence.accepted_evidence_mismatches, rowMismatches), `${rowId} accepted mismatches must match event row`, errors);
  }

  assertField(summary.accepted_row_count === acceptedRowCount, "accepted_evidence_summary.accepted_row_count must match row evidence", errors);
  assertField(
    summary.accepted_for_wake_history_closure === (acceptedRowCount === REQUIRED_EVENT_ROWS.length),
    "accepted_evidence_summary.accepted_for_wake_history_closure must match accepted row count",
    errors
  );
  assertField(
    artifact.result?.accepted_event_evidence_for_closure === summary.accepted_for_wake_history_closure,
    "result.accepted_event_evidence_for_closure must match accepted_evidence_summary",
    errors
  );
}

function validateReceiverNormalDerivativeContractSummary(artifact, errors) {
  const summary = artifact.receiver_normal_derivative_contract_summary;
  assertField(
    summary && typeof summary === "object" && !Array.isArray(summary),
    "receiver_normal_derivative_contract_summary must be an object",
    errors
  );
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    return;
  }
  assertField(
    summary.artifact_id === RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    "receiver_normal_derivative_contract_summary.artifact_id must match receiver-normal derivative artifact id",
    errors
  );
  assertField(
    sameStringArray(summary.required_row_ids, REQUIRED_EVENT_ROWS),
    "receiver_normal_derivative_contract_summary.required_row_ids must match required event rows",
    errors
  );
  assertField(
    Array.isArray(summary.row_contracts),
    "receiver_normal_derivative_contract_summary.row_contracts must be an array",
    errors
  );
  if (!Array.isArray(summary.row_contracts) || !Array.isArray(artifact.event_rows)) {
    return;
  }

  const acceptedRowIds = [];
  const blockedRowIds = [];
  const failureCounts = {};
  for (const rowId of REQUIRED_EVENT_ROWS) {
    const eventRow = artifact.event_rows.find((entry) => entry.row_id === rowId);
    const rowContract = summary.row_contracts.find((entry) => entry.row_id === rowId);
    assertField(Boolean(rowContract), `receiver_normal_derivative_contract_summary.row_contracts must include ${rowId}`, errors);
    if (!rowContract) {
      continue;
    }
    const rowAccepted = eventRow?.accepted_for_wake_history_closure === true;
    const failureCode = receiverNormalFailureCode(eventRow);
    if (rowAccepted) {
      acceptedRowIds.push(rowId);
    } else {
      blockedRowIds.push(rowId);
      failureCounts[failureCode] = (failureCounts[failureCode] ?? 0) + 1;
    }
    assertField(rowContract.row_present === (eventRow?.status === "pass"), `${rowId} derivative row_present must match event row`, errors);
    assertField(
      rowContract.derivative_contract_attempted ===
        (eventRow?.accepted_evidence_contract_attempted === true),
      `${rowId} derivative attempt flag must match event row`,
      errors
    );
    assertField(rowContract.receiver_normal_derivative_bundle_accepted === rowAccepted, `${rowId} derivative accepted flag must match event row`, errors);
    assertField(rowContract.failure_code === failureCode, `${rowId} derivative failure code must match event row`, errors);
    assertField(
      sameStringArray(rowContract.required_object_blockers ?? [], requiredObjectBlockers(eventRow)),
      `${rowId} derivative required object blockers must match event row`,
      errors
    );
    assertField(
      sameStringArray(rowContract.accepted_evidence_mismatches ?? [], eventRow?.accepted_evidence_mismatches ?? []),
      `${rowId} derivative mismatches must match event row`,
      errors
    );
  }

  assertField(
    sameStringArray(summary.accepted_row_ids, acceptedRowIds),
    "receiver_normal_derivative_contract_summary.accepted_row_ids must match row contracts",
    errors
  );
  assertField(
    sameStringArray(summary.blocked_row_ids, blockedRowIds),
    "receiver_normal_derivative_contract_summary.blocked_row_ids must match row contracts",
    errors
  );
  assertField(
    summary.first_blocked_row_id === (blockedRowIds[0] ?? null),
    "receiver_normal_derivative_contract_summary.first_blocked_row_id must match blocked rows",
    errors
  );
  assertField(
    summary.first_failure_code ===
      (blockedRowIds.length > 0
        ? summary.row_contracts.find((entry) => entry.row_id === blockedRowIds[0])?.failure_code
        : null),
    "receiver_normal_derivative_contract_summary.first_failure_code must match first blocked row",
    errors
  );
  assertField(
    JSON.stringify(summary.failure_counts ?? {}) === JSON.stringify(failureCounts),
    "receiver_normal_derivative_contract_summary.failure_counts must match row contracts",
    errors
  );
  assertField(
    summary.all_required_rows_bound === (acceptedRowIds.length === REQUIRED_EVENT_ROWS.length),
    "receiver_normal_derivative_contract_summary.all_required_rows_bound must match accepted rows",
    errors
  );
  assertField(
    artifact.result?.receiver_normal_derivative_contract_ready === summary.all_required_rows_bound,
    "result.receiver_normal_derivative_contract_ready must match receiver_normal_derivative_contract_summary",
    errors
  );
}

function validateWakeHistoryDerivationProofObjectBoundary(artifact, errors) {
  const boundary = artifact.wake_history_derivation_proof_object_boundary;
  assertField(
    boundary && typeof boundary === "object" && !Array.isArray(boundary),
    "wake_history_derivation_proof_object_boundary must be an object",
    errors
  );
  if (!boundary || typeof boundary !== "object" || Array.isArray(boundary)) {
    return;
  }
  assertField(
    boundary.expected_proof_object_role === ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
    "wake_history_derivation_proof_object_boundary.expected_proof_object_role must match accepted wake-history proof object role",
    errors
  );
  assertField(
    boundary.expected_derivative_artifact_id === RECEIVER_NORMAL_DERIVATIVE_ARTIFACT_ID,
    "wake_history_derivation_proof_object_boundary.expected_derivative_artifact_id must match receiver-normal derivative artifact id",
    errors
  );
  assertField(
    boundary.accepted_retained_provider_ready === false,
    "wake_history_derivation_proof_object_boundary.accepted_retained_provider_ready must remain false in this diagnostic",
    errors
  );
  assertField(
    boundary.provider_status === "wake_history_derivation_proof_object_missing",
    "wake_history_derivation_proof_object_boundary.provider_status must fail closed on missing proof object provider",
    errors
  );
  assertField(
    boundary.first_blocked_downstream_consumer === FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
    "wake_history_derivation_proof_object_boundary.first_blocked_downstream_consumer must identify the wake-history compositor row",
    errors
  );
  assertField(
    sameStringArray(boundary.required_event_row_ids, REQUIRED_EVENT_ROWS),
    "wake_history_derivation_proof_object_boundary.required_event_row_ids must match required event rows",
    errors
  );
  assertField(
    boundary.provider_target?.schema ===
      WAKE_HISTORY_DERIVATION_PROOF_OBJECT_PROVIDER_TARGET_SCHEMA,
    "wake_history_derivation_proof_object_boundary.provider_target.schema must match provider target schema",
    errors
  );
  assertField(
    boundary.provider_target?.target_status === "fail_closed_provider_target",
    "wake_history_derivation_proof_object_boundary.provider_target must be fail closed",
    errors
  );
  assertField(
    boundary.provider_target?.provider_object_required === true,
    "wake_history_derivation_proof_object_boundary.provider_target must require a provider object",
    errors
  );
  assertField(
    boundary.provider_target?.accepted_non_fixture_provider_required === true,
    "wake_history_derivation_proof_object_boundary.provider_target must require a non-fixture accepted provider",
    errors
  );
  assertField(
    boundary.provider_target?.accepts_row_logic_fixture === false,
    "wake_history_derivation_proof_object_boundary.provider_target must reject row-logic fixtures",
    errors
  );
  assertField(
    sameStringArray(boundary.provider_target?.required_wake_history_row_ids, REQUIRED_EVENT_ROWS),
    "wake_history_derivation_proof_object_boundary.provider_target.required_wake_history_row_ids must match required event rows",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.required_provider_object_field_groups?.source_identity,
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.source_identity
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.required_provider_object_field_groups.source_identity must match provider source identity requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.required_provider_object_field_groups?.retained_record,
      REQUIRED_RETAINED_RECORD_FIELDS
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.required_provider_object_field_groups.retained_record must match retained-record requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.required_provider_object_field_groups?.receiver_normal_branch_strength,
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.receiver_normal_branch_strength
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.required_provider_object_field_groups.receiver_normal_branch_strength must match branch-strength requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.required_provider_object_field_groups?.receiver_normal_derivatives,
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.receiver_normal_derivatives
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.required_provider_object_field_groups.receiver_normal_derivatives must match derivative requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.required_provider_object_field_groups?.same_record_binding,
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.same_record_binding
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.required_provider_object_field_groups.same_record_binding must match same-record binding requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.required_provider_object_field_groups?.wake_history_rows,
      REQUIRED_EVENT_ROWS
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.required_provider_object_field_groups.wake_history_rows must match required event rows",
    errors
  );
  assertField(
    sameStringArray(
      boundary.provider_target?.disallowed_accepted_evidence_sources,
      DISALLOWED_ACCEPTED_EVIDENCE_SOURCES
    ),
    "wake_history_derivation_proof_object_boundary.provider_target.disallowed_accepted_evidence_sources must match excluded source classes",
    errors
  );
  assertField(
    sameStringArray(boundary.required_retained_record_fields, REQUIRED_RETAINED_RECORD_FIELDS),
    "wake_history_derivation_proof_object_boundary.required_retained_record_fields must match retained-record requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.required_receiver_normal_derivative_fields,
      REQUIRED_RECEIVER_NORMAL_DERIVATIVE_FIELDS
    ),
    "wake_history_derivation_proof_object_boundary.required_receiver_normal_derivative_fields must match derivative requirements",
    errors
  );
  assertField(
    sameStringArray(boundary.required_provenance_fields, REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS),
    "wake_history_derivation_proof_object_boundary.required_provenance_fields must match provenance requirements",
    errors
  );
  assertField(
    sameStringArray(boundary.required_proof_object_fields, REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS),
    "wake_history_derivation_proof_object_boundary.required_proof_object_fields must match proof-object requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.required_provider_object_field_groups?.same_record_binding,
      REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.same_record_binding
    ),
    "wake_history_derivation_proof_object_boundary.required_provider_object_field_groups.same_record_binding must match same-record binding requirements",
    errors
  );
  assertField(
    sameStringArray(
      boundary.required_provider_object_field_groups?.wake_history_rows,
      REQUIRED_EVENT_ROWS
    ),
    "wake_history_derivation_proof_object_boundary.required_provider_object_field_groups.wake_history_rows must match required event rows",
    errors
  );
  assertField(
    boundary.downstream_consumer_boundary?.consumer_id === FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
    "wake_history_derivation_proof_object_boundary.downstream_consumer_boundary must identify the wake-history consumer",
    errors
  );
  assertField(
    boundary.downstream_consumer_boundary?.status ===
      "blocked_by_missing_wake_history_derivation_proof_object_provider",
    "wake_history_derivation_proof_object_boundary.downstream_consumer_boundary must fail closed",
    errors
  );
  const blocker = boundary.provider_source_acquisition_blocker;
  assertField(
    blocker && typeof blocker === "object" && !Array.isArray(blocker),
    "wake_history_derivation_proof_object_boundary.provider_source_acquisition_blocker must be an object",
    errors
  );
  if (blocker && typeof blocker === "object" && !Array.isArray(blocker)) {
    assertField(
      blocker.status === "source_acquisition_required",
      "provider_source_acquisition_blocker.status must require source acquisition",
      errors
    );
    assertField(
      blocker.provider_object_role === ACCEPTED_EVENT_PROOF_OBJECT_ROLE,
      "provider_source_acquisition_blocker.provider_object_role must match wake-history proof object role",
      errors
    );
    assertField(
      blocker.accepted_provider_source_status ===
        "absent_non_fixture_accepted_retained_provider",
      "provider_source_acquisition_blocker.accepted_provider_source_status must fail closed on absent provider source",
      errors
    );
    assertField(
      sameStringArray(
        blocker.searched_candidate_file_family,
        PROVIDER_SOURCE_CANDIDATE_FILE_FAMILY
      ),
      "provider_source_acquisition_blocker.searched_candidate_file_family must name the scoped wake-history candidate file family",
      errors
    );
    assertField(
      blocker.next_source_target === NEXT_ACCEPTED_PROVIDER_SOURCE_TARGET,
      "provider_source_acquisition_blocker.next_source_target must name the accepted retained provider object target",
      errors
    );
    assertField(
      blocker.downstream_consumer_remaining_blocked === FIRST_BLOCKED_DOWNSTREAM_CONSUMER,
      "provider_source_acquisition_blocker.downstream_consumer_remaining_blocked must keep the compositor blocked",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.source_identity,
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.source_identity
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.source_identity must match provider source identity requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.retained_record,
        REQUIRED_RETAINED_RECORD_FIELDS
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.retained_record must match retained-record requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.receiver_normal_branch_strength,
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.receiver_normal_branch_strength
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.receiver_normal_branch_strength must match branch-strength requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.receiver_normal_derivative,
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.receiver_normal_derivatives
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.receiver_normal_derivative must match derivative requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.proof_object,
        REQUIRED_WAKE_HISTORY_PROOF_OBJECT_FIELDS
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.proof_object must match proof-object requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.provenance,
        REQUIRED_WAKE_HISTORY_PROVENANCE_FIELDS
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.provenance must match provenance requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.same_record_binding,
        REQUIRED_WAKE_HISTORY_PROVIDER_FIELD_GROUPS.same_record_binding
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.same_record_binding must match same-record binding requirements",
      errors
    );
    assertField(
      sameStringArray(
        blocker.missing_provider_field_groups?.wake_history_rows,
        REQUIRED_EVENT_ROWS
      ),
      "provider_source_acquisition_blocker.missing_provider_field_groups.wake_history_rows must match required event rows",
      errors
    );
  }
}

export function validateEventWakeHistoryPullbackArtifact(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(artifact.schema === EVENT_WAKE_HISTORY_PULLBACK_SCHEMA, `schema must be ${EVENT_WAKE_HISTORY_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.artifact_schema === EVENT_WAKE_HISTORY_PULLBACK_SCHEMA, `artifact_schema must be ${EVENT_WAKE_HISTORY_PULLBACK_SCHEMA}`, errors);
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.result?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.result?.updates_live_validation_gate === false, "artifact must not update a live validation gate", errors);
  assertField(Array.isArray(artifact.event_rows), "event_rows must be an array", errors);

  if (Array.isArray(artifact.event_rows)) {
    const rowIds = artifact.event_rows.map((entry) => entry.row_id);
    for (const rowId of ["source_record_id", "expected_rows", ...REQUIRED_EVENT_ROWS]) {
      assertField(rowIds.includes(rowId), `event_rows must include ${rowId}`, errors);
    }
    const failedRows = artifact.event_rows.filter((entry) => entry.status === "fail");
    assertField(
      artifact.result?.diagnostic_status ===
        (failedRows.length === 0 ? "diagnostic_passed_priority_only" : "diagnostic_failed"),
      "result.diagnostic_status must match event row failures",
      errors
    );
    assertField(
      artifact.result?.failure_code === (failedRows[0]?.failure_code ?? null),
      "result.failure_code must match first failed row",
      errors
    );
  }
  validateAcceptedEvidenceSummary(artifact, errors);
  validateReceiverNormalDerivativeContractSummary(artifact, errors);
  validateWakeHistoryDerivationProofObjectBoundary(artifact, errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --input <path>       Read event pullback input JSON instead of the default fixture",
    "  --control <name>     Apply a negative control or receiver-normal replay control",
    "  --event-row <row>    Select receiver-normal control row: energy_wake, momentum_wake, angular_momentum_wake, medium_update, all",
    "  --provider-target    Print the fail-closed wake_history_derivation_proof_object provider target",
    "  --out <path>         Write artifact JSON to path instead of stdout",
    "  --validate <path>    Validate an existing diagnostic artifact JSON file",
    "  --schema             Print the artifact schema identifier",
    "  --pretty             Pretty-print JSON output",
    "  --help               Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    input: null,
    control: null,
    out: null,
    validate: null,
    eventRow: "energy_wake",
    providerTarget: false,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--control") {
      args.control = argv[++index];
    } else if (arg === "--event-row") {
      args.eventRow = argv[++index];
    } else if (arg === "--provider-target") {
      args.providerTarget = true;
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "aaa-proof/event-wake-history-pullback-diagnostic-schema/v1",
          artifact_schema: EVENT_WAKE_HISTORY_PULLBACK_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          accepted_evidence_summary: [
            "row_evidence",
            "counts_by_evidence_level",
            "accepted_evidence_contract_attempted",
            "accepted_evidence_mismatches",
            "derivation_proof_object",
            "receiver_normal_derivative_bundle",
            "accepted_for_wake_history_closure",
          ],
          wake_history_derivation_proof_object_boundary: [
            "provider_target",
            "expected_proof_object_role",
            "expected_derivative_artifact_id",
            "accepted_retained_provider_ready",
            "provider_status",
            "first_blocked_event_row_id",
            "first_blocked_downstream_consumer",
            "first_missing_field_family",
            "required_retained_record_fields",
            "required_receiver_normal_derivative_fields",
            "required_proof_object_fields",
            "required_provenance_fields",
            "required_provider_object_field_groups",
            "same_record_identity_boundary",
            "proof_object_provenance_boundary",
            "provider_source_acquisition_blocker",
            "downstream_consumer_boundary",
          ],
          provider_target_cli: "--provider-target",
          receiver_normal_derivative_contract_summary: [
            "required_row_ids",
            "accepted_row_ids",
            "blocked_row_ids",
            "first_failure_code",
            "required_object_blockers",
            "row_contracts",
          ],
          controls: ["missing-angular-momentum-row", "source-record-mismatch"],
          receiver_normal_controls: RECEIVER_NORMAL_CONTROLS,
          receiver_normal_event_rows: [...REQUIRED_EVENT_ROWS, "all"],
        },
        args.pretty
      )
    );
    return;
  }
  if (args.providerTarget) {
    process.stdout.write(
      printJson(wakeHistoryDerivationProofObjectProviderTarget(), args.pretty)
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateEventWakeHistoryPullbackArtifact(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const baseInput = args.input
    ? JSON.parse(fs.readFileSync(args.input, "utf8"))
    : buildDefaultEventWakeHistoryPullbackInput();
  const input = args.control
    ? applyEventWakeHistoryControl(baseInput, args.control, { eventRow: args.eventRow })
    : baseInput;
  const artifact = buildEventWakeHistoryPullbackDiagnostic(input);
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
