#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OBLIGATION = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CANDIDATE_ATLAS = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS = `${CERT_DIR}/fold_impulse_constants.json`;
const DEFAULT_HIGHER_FOLD_PRELEDGER_SCRIPT = "scripts/proof-programs/fresh-v10-higher-fold-proof-interval-preledger-v6.mjs";
const DEFAULT_SAME_PACKET_COMPARATOR_SCRIPT = "scripts/proof-programs/fresh-proof-interval-preledger-v7.mjs";
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_separator_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const FIRST_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";
const PROOF_GRADE_FIELDS = [
  "higher_fold_separator_layer_certificate",
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];

function parseArgs(argv) {
  const args = {
    obligation: DEFAULT_OBLIGATION,
    candidateAtlas: DEFAULT_CANDIDATE_ATLAS,
    readiness: DEFAULT_READINESS,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    diagnosticFoldImpulseConstants: DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS,
    higherFoldPreledgerScript: DEFAULT_HIGHER_FOLD_PRELEDGER_SCRIPT,
    samePacketComparatorScript: DEFAULT_SAME_PACKET_COMPARATOR_SCRIPT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--obligation") {
      args.obligation = argv[++index];
    } else if (arg === "--candidate-atlas") {
      args.candidateAtlas = argv[++index];
    } else if (arg === "--readiness") {
      args.readiness = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
    } else if (arg === "--diagnostic-fold-impulse-constants") {
      args.diagnosticFoldImpulseConstants = argv[++index];
    } else if (arg === "--higher-fold-preledger-script") {
      args.higherFoldPreledgerScript = argv[++index];
    } else if (arg === "--same-packet-comparator-script") {
      args.samePacketComparatorScript = argv[++index];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-separator-certificate-attempt.mjs [options]

Options:
  --obligation PATH                         Accepted atlas-ref obligation classifier. Defaults to ${DEFAULT_OBLIGATION}.
  --candidate-atlas PATH                    Candidate atlas-ref classifier. Defaults to ${DEFAULT_CANDIDATE_ATLAS}.
  --readiness PATH                          Same-packet field readiness classifier. Defaults to ${DEFAULT_READINESS}.
  --fold-layer-burden PATH                  Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --diagnostic-fold-impulse-constants PATH  Diagnostic fold impulse constants. Defaults to ${DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS}.
  --higher-fold-preledger-script PATH       Higher-fold proof-interval v6 script. Defaults to ${DEFAULT_HIGHER_FOLD_PRELEDGER_SCRIPT}.
  --same-packet-comparator-script PATH      Same-packet v7 comparator script. Defaults to ${DEFAULT_SAME_PACKET_COMPARATOR_SCRIPT}.
  --out-dir PATH                            Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                  Pretty-print JSON artifact.
  --help                                    Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function diagnosticSeparatorMap(diagnosticFoldImpulseConstants) {
  return diagnosticFoldImpulseConstants?.separators ?? {};
}

function diagnosticRejectionReasons(diagnosticFoldImpulseConstants, separatorEvent) {
  const reasons = [];
  if (diagnosticFoldImpulseConstants.packet_id !== PACKET_ID) {
    reasons.push("diagnostic_fold_impulse_constants_packet_mismatch");
  }
  if (diagnosticFoldImpulseConstants.status !== "interval_certified") {
    reasons.push("diagnostic_fold_impulse_constants_not_interval_certified");
  }
  if (diagnosticFoldImpulseConstants.pass_fail?.fold_constants_all_accepted !== true) {
    reasons.push("diagnostic_fold_impulse_constants_not_accepted");
  }
  if (!Object.hasOwn(diagnosticSeparatorMap(diagnosticFoldImpulseConstants), separatorEvent)) {
    reasons.push("no_matching_higher_fold_separator_in_diagnostic_constants");
  }
  return reasons;
}

function validateInputs(inputs) {
  assertPacketId(inputs.obligation, "obligation");
  assertPacketId(inputs.candidateAtlas, "candidateAtlas");
  assertPacketId(inputs.readiness, "readiness");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");
  if (inputs.obligation.branch_chart_authorized !== false || inputs.obligation.preledger_pass !== false) {
    throw new Error("Refusing to build from an obligation artifact that authorizes a branch chart or preledger pass.");
  }
  if (inputs.obligation.summary?.separator_atlas_source_candidates_with_complete_source_evidence !== 12) {
    throw new Error("Obligation classifier no longer has 12 complete separator source candidates.");
  }
  if (inputs.obligation.summary?.rows_with_complete_candidate_source_evidence !== 112) {
    throw new Error("Obligation classifier no longer has 112 complete row source candidates.");
  }
  if (inputs.obligation.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Obligation classifier already reports separator-layer certificates.");
  }
  if (inputs.candidateAtlas.summary?.rows_with_candidate_higher_fold_layer_atlas_ref !== 112) {
    throw new Error("Candidate atlas artifact no longer assigns candidate refs to 112 rows.");
  }
  if (inputs.foldLayerBurden.summary?.fold_layer_rows !== 112 || inputs.readiness.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in readiness and burden artifacts.");
  }
}

function buildSeparatorAttempts(inputs) {
  return [...inputs.obligation.separator_atlas_ref_obligations]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((obligation) => {
      const diagnosticReasons = diagnosticRejectionReasons(inputs.diagnosticFoldImpulseConstants, obligation.separator_event);
      return {
        separator_event: obligation.separator_event,
        fold_interval: obligation.fold_interval,
        atlas_candidate_id: obligation.atlas_candidate_id,
        row_count: obligation.row_count,
        row_ids: obligation.row_ids,
        candidate_source_evidence_complete: obligation.candidate_source_evidence_complete === true,
        diagnostic_fold_impulse_constants_considered: true,
        diagnostic_fold_impulse_constants_rejected: diagnosticReasons.length > 0,
        diagnostic_fold_impulse_constants_rejection_reasons: diagnosticReasons,
        proof_grade_fields_present_after_attempt: falseFieldMap(PROOF_GRADE_FIELDS),
        higher_fold_separator_layer_certificate_present: false,
        higher_fold_separator_layer_certificate_ref: null,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_higher_fold_layer_atlas_ref: null,
        accepted_atlas_ref_derivation_present: false,
        alpha_floor_proof_grade: false,
        exit_floor_proof_grade: false,
        fold_impulse_or_direct_quadrature_bound_proof_grade: false,
        fold_layer_parity_record_proof_grade: false,
        parent_complement_consumption_ref_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        branch_chart_authorized_rows: 0,
        attempt_status: "rejected",
        first_certificate_blocker: FIRST_BLOCKER,
      };
    });
}

function buildRowAttempts(inputs, separatorAttempts) {
  const attemptByCandidate = new Map(separatorAttempts.map((attempt) => [attempt.atlas_candidate_id, attempt]));
  return [...inputs.obligation.row_obligation_classification]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      if (row.failure_code !== FOLD_LAYER_FAILURE) {
        throw new Error(`Unexpected fold-layer failure code for ${row.row_id}: ${row.failure_code}`);
      }
      const separatorAttempt = attemptByCandidate.get(row.candidate_higher_fold_layer_atlas_ref);
      if (!separatorAttempt) {
        throw new Error(`Missing separator attempt for ${row.row_id}: ${row.candidate_higher_fold_layer_atlas_ref}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        receiver_interval: row.receiver_interval,
        source_interval: row.source_interval,
        candidate_higher_fold_layer_atlas_ref: row.candidate_higher_fold_layer_atlas_ref,
        candidate_source_evidence_complete: row.candidate_source_evidence_complete === true,
        diagnostic_fold_impulse_constants_rejected: separatorAttempt.diagnostic_fold_impulse_constants_rejected,
        proof_grade_fields_present_after_attempt: falseFieldMap(PROOF_GRADE_FIELDS),
        higher_fold_separator_layer_certificate_present: false,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_atlas_ref_derivation_present: false,
        row_acceptance_ready: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_certificate_blocker: FIRST_BLOCKER,
      };
    });
}

function fieldPresenceCounts(rows) {
  return Object.fromEntries(
    PROOF_GRADE_FIELDS.map((field) => [
      field,
      {
        present: countTrue(rows, (row) => row.proof_grade_fields_present_after_attempt[field]),
        missing:
          rows.length -
          countTrue(rows, (row) => row.proof_grade_fields_present_after_attempt[field]),
      },
    ]),
  );
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorAttempts = buildSeparatorAttempts(inputs);
  const rowAttempts = buildRowAttempts(inputs, separatorAttempts);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowAttempts, (row) => row.separator_event));
  const diagnosticSeparatorKeys = Object.keys(diagnosticSeparatorMap(inputs.diagnosticFoldImpulseConstants));

  const summary = {
    separator_certificate_attempts: separatorAttempts.length,
    separator_attempts_with_complete_candidate_source_evidence: countTrue(
      separatorAttempts,
      (attempt) => attempt.candidate_source_evidence_complete,
    ),
    separator_attempts_with_diagnostic_fold_impulse_constants_rejected: countTrue(
      separatorAttempts,
      (attempt) => attempt.diagnostic_fold_impulse_constants_rejected,
    ),
    diagnostic_fold_impulse_constants_packet_id: inputs.diagnosticFoldImpulseConstants.packet_id ?? null,
    diagnostic_fold_impulse_constants_packet_matches_higher_fold: inputs.diagnosticFoldImpulseConstants.packet_id === PACKET_ID,
    diagnostic_fold_impulse_constants_status: inputs.diagnosticFoldImpulseConstants.status ?? null,
    diagnostic_fold_impulse_constants_interval_certified:
      inputs.diagnosticFoldImpulseConstants.status === "interval_certified",
    diagnostic_fold_impulse_constants_fold_constants_all_accepted:
      inputs.diagnosticFoldImpulseConstants.pass_fail?.fold_constants_all_accepted === true,
    diagnostic_fold_impulse_constants_separator_keys: diagnosticSeparatorKeys,
    diagnostic_fold_impulse_constants_matching_higher_fold_separators: 0,
    accepted_higher_fold_separator_layer_certificates: 0,
    accepted_higher_fold_layer_atlas_refs: 0,
    fold_layer_rows: rowAttempts.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_complete_candidate_source_evidence: countTrue(
      rowAttempts,
      (row) => row.candidate_source_evidence_complete,
    ),
    rows_with_higher_fold_separator_layer_certificate: 0,
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    rows_with_proof_grade_alpha_floor: 0,
    rows_with_proof_grade_exit_floor: 0,
    rows_with_proof_grade_fold_impulse_or_direct_quadrature_bound: 0,
    rows_with_proof_grade_fold_layer_parity_record: 0,
    rows_with_parent_complement_consumption_ref: 0,
    proof_grade_field_presence_counts_after_attempt: fieldPresenceCounts(rowAttempts),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-separator-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status:
      "higher_fold_layer_separator_certificate_attempt_fail_closed_candidate_source_complete_diagnostic_impulse_constants_rejected_no_accepted_atlas_ref_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only separator-layer certificate attempt above the 12 higher-fold candidate atlas refs; rejects non-same-packet diagnostic fold impulse constants and proves no higher_fold_separator_layer_certificate, accepted higher_fold_layer_atlas_ref, alpha floor, exit floor, parity record, fold impulse/direct quadrature bound, parent-complement consumption ref, row consumption, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_accepted_atlas_ref_obligation_classifier: artifactRecord(paths.obligation),
      higher_fold_layer_atlas_ref_source_candidate_classifier: artifactRecord(paths.candidateAtlas),
      higher_fold_layer_same_packet_field_readiness_classifier: artifactRecord(paths.readiness),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
      diagnostic_fold_impulse_constants: artifactRecord(paths.diagnosticFoldImpulseConstants),
      higher_fold_proof_interval_v6_preledger_script: artifactRecord(paths.higherFoldPreledgerScript),
      same_packet_v7_accepted_fold_row_comparator_script: artifactRecord(paths.samePacketComparatorScript),
    },
    attempted_certificate_rule:
      "A higher-fold separator-layer certificate may be constructed only from same-packet proof-grade interval data that supplies an accepted higher_fold_layer_atlas_ref derivation plus proof-grade alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, and parent_complement_consumption_ref. Diagnostic constants from a different packet or with non-interval-certified status are explicitly rejected.",
    separator_certificate_attempts: separatorAttempts,
    row_certificate_attempts: rowAttempts,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "same-packet interval-certified higher_fold_separator_layer_certificate data for Sigma_hf_01 through Sigma_hf_12",
      continuation_class:
        "mechanical only if a same-packet interval-certified alpha/exit/fold-impulse-or-direct-quadrature/parity packet can be constructed; proof-rule decision required for promotion if no accepted higher_fold_layer_atlas_ref derivation can be stated from those fields",
      fail_closed_stop_conditions: [
        "Do not reuse diagnostic fold impulse constants as proof-grade higher-fold separator-layer certificates.",
        "Do not treat candidate_higher_fold_layer_atlas_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not count alpha_floor, exit_floor, fold impulse/direct quadrature, parity, or parent-complement consumption unless they are same-packet and proof-grade.",
        "Do not set preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this rejected attempt.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      accepted_fold_layer_rows_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This artifact turns the accepted-atlas-ref obligation into a certificate attempt and records that the available diagnostic fold impulse constants cannot serve as same-packet proof-grade higher-fold separator-layer certificates.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function fieldTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(attempts) {
  return attempts
    .map(
      (attempt) =>
        `| \`${attempt.separator_event}\` | \`${attempt.fold_interval}\` | ${attempt.row_count} | ${attempt.candidate_source_evidence_complete} | ${attempt.diagnostic_fold_impulse_constants_rejected} | \`${attempt.diagnostic_fold_impulse_constants_rejection_reasons.join("; ")}\` | ${attempt.higher_fold_separator_layer_certificate_present} | ${attempt.accepted_higher_fold_layer_atlas_ref_present} | \`${attempt.first_certificate_blocker}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.candidate_source_evidence_complete} | ${row.diagnostic_fold_impulse_constants_rejected} | ${row.higher_fold_separator_layer_certificate_present} | ${row.accepted_higher_fold_layer_atlas_ref_present} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Separator Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt starts from the accepted atlas-ref obligation classifier and tests
whether the available fold-impulse data can serve as a proof-grade
\`higher_fold_separator_layer_certificate\`.

It cannot. The candidate source side remains complete for
${attempt.summary.separator_attempts_with_complete_candidate_source_evidence} / ${attempt.summary.separator_certificate_attempts}
separator refs and ${attempt.summary.rows_with_complete_candidate_source_evidence} / ${attempt.summary.fold_layer_rows}
fold-layer rows, but the only inspected fold-impulse constants are from
\`${attempt.summary.diagnostic_fold_impulse_constants_packet_id}\`, not
\`${PACKET_ID}\`, have status
\`${attempt.summary.diagnostic_fold_impulse_constants_status}\`, and are not
accepted interval certificates.

The result remains fail-closed: 0 / ${attempt.summary.fold_layer_rows} rows
carry \`higher_fold_separator_layer_certificate\`, 0 / ${attempt.summary.fold_layer_rows}
rows carry accepted \`higher_fold_layer_atlas_ref\`, 0 rows are consumed, and no
branch chart is authorized.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Separator Certificate Attempts

| Separator | Fold interval | Rows | Candidate source complete | Diagnostic constants rejected | Rejection reasons | Separator certificate | Accepted atlas ref | First blocker |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(attempt.separator_certificate_attempts)}

## Proof-Grade Field Presence After Attempt

| Proof-grade field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(attempt.summary.proof_grade_field_presence_counts_after_attempt)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Certificate Attempts

| Row | Separator | Fold interval | Candidate source complete | Diagnostic constants rejected | Separator certificate | Accepted atlas ref | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_certificate_attempts)}

## Certificate-Side Handoff

Next artifact target: \`${attempt.next_certificate_handoff.artifact_target}\`.

Continuation class: ${attempt.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only separator-layer certificate attempt. It proves
no \`higher_fold_separator_layer_certificate\`, accepted
\`higher_fold_layer_atlas_ref\`, alpha floor, exit floor, parity record, fold
impulse/direct quadrature bound, parent-complement consumption ref, row
consumption, live-ledger update, or branch-chart authorization.
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    obligation: args.obligation,
    candidateAtlas: args.candidateAtlas,
    readiness: args.readiness,
    foldLayerBurden: args.foldLayerBurden,
    diagnosticFoldImpulseConstants: args.diagnosticFoldImpulseConstants,
    higherFoldPreledgerScript: args.higherFoldPreledgerScript,
    samePacketComparatorScript: args.samePacketComparatorScript,
  };
  const inputs = {
    obligation: readJson(paths.obligation),
    candidateAtlas: readJson(paths.candidateAtlas),
    readiness: readJson(paths.readiness),
    foldLayerBurden: readJson(paths.foldLayerBurden),
    diagnosticFoldImpulseConstants: readJson(paths.diagnosticFoldImpulseConstants),
  };
  const attempt = buildAttempt(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeReport(outReport, attempt);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
