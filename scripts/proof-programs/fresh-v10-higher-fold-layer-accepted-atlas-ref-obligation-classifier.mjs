#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CANDIDATE_ATLAS = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_HIGHER_FOLD_PRELEDGER_SCRIPT = "scripts/proof-programs/fresh-v10-higher-fold-proof-interval-preledger-v6.mjs";
const DEFAULT_SAME_PACKET_COMPARATOR_SCRIPT = "scripts/proof-programs/fresh-proof-interval-preledger-v7.mjs";
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_accepted_atlas_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_accepted_atlas_ref_obligation_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const CANDIDATE_ATLAS_FIELD = "candidate_higher_fold_layer_atlas_ref";
const ACCEPTED_ATLAS_FIELD = "higher_fold_layer_atlas_ref";
const FIRST_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";
const DOWNSTREAM_ACCEPTANCE_FIELDS = [
  "alpha_floor",
  "exit_floor",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];
const SAME_PACKET_FIELDS = [ACCEPTED_ATLAS_FIELD, ...DOWNSTREAM_ACCEPTANCE_FIELDS];

function parseArgs(argv) {
  const args = {
    candidateAtlas: DEFAULT_CANDIDATE_ATLAS,
    readiness: DEFAULT_READINESS,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
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
    } else if (arg === "--candidate-atlas") {
      args.candidateAtlas = argv[++index];
    } else if (arg === "--readiness") {
      args.readiness = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-accepted-atlas-ref-obligation-classifier.mjs [options]

Options:
  --candidate-atlas PATH              Candidate atlas-ref classifier. Defaults to ${DEFAULT_CANDIDATE_ATLAS}.
  --readiness PATH                    Same-packet field readiness classifier. Defaults to ${DEFAULT_READINESS}.
  --fold-layer-burden PATH            Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --higher-fold-preledger-script PATH Higher-fold proof-interval v6 script. Defaults to ${DEFAULT_HIGHER_FOLD_PRELEDGER_SCRIPT}.
  --same-packet-comparator-script PATH Same-packet v7 comparator script. Defaults to ${DEFAULT_SAME_PACKET_COMPARATOR_SCRIPT}.
  --out-dir PATH                      Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                            Pretty-print JSON artifact.
  --help                              Show this help.`);
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

function sortedObjectByKey(object, compareFn = undefined) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => compareFn?.(left, right) ?? left.localeCompare(right)));
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function finiteNumber(value) {
  return Number.isFinite(Number(value));
}

function twoEntryRange(value) {
  return Array.isArray(value) && value.length === 2 && finiteNumber(value[0]) && finiteNumber(value[1]);
}

function validateInputs(candidateAtlas, readiness, foldLayerBurden) {
  assertPacketId(candidateAtlas, "candidateAtlas");
  assertPacketId(readiness, "readiness");
  assertPacketId(foldLayerBurden, "foldLayerBurden");
  if (candidateAtlas.branch_chart_authorized !== false || candidateAtlas.preledger_pass !== false) {
    throw new Error("Refusing to classify an atlas artifact that authorizes a branch chart or preledger pass.");
  }
  if (readiness.branch_chart_authorized !== false || readiness.preledger_pass !== false) {
    throw new Error("Refusing to classify a readiness artifact that authorizes a branch chart or preledger pass.");
  }
  if (candidateAtlas.summary?.separator_atlas_source_candidates !== 12) {
    throw new Error("Candidate atlas artifact no longer has 12 separator source candidates.");
  }
  if (candidateAtlas.summary?.fold_layer_rows !== 112 || readiness.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 higher-fold fold-layer rows in candidate atlas and readiness artifacts.");
  }
  if (candidateAtlas.summary?.rows_with_candidate_higher_fold_layer_atlas_ref !== 112) {
    throw new Error("Candidate atlas artifact no longer assigns candidate refs to all 112 rows.");
  }
  if (candidateAtlas.summary?.rows_with_accepted_higher_fold_layer_atlas_ref !== 0) {
    throw new Error("Candidate atlas artifact already reports accepted higher_fold_layer_atlas_ref rows.");
  }
  if (foldLayerBurden.summary?.fold_layer_rows !== 112) {
    throw new Error("Fold-layer burden atlas no longer has 112 fold-layer rows.");
  }
}

function sourceEvidence(entry) {
  const evidence = {
    candidate_atlas_ref_present: typeof entry.atlas_candidate_id === "string" && entry.atlas_candidate_id.length > 0,
    separator_event_present: typeof entry.separator_event === "string" && entry.separator_event.length > 0,
    fold_interval_present: typeof entry.fold_interval === "string" && entry.fold_interval.length > 0,
    phi_cyc_contact_present:
      finiteNumber(entry.theta_center) &&
      finiteNumber(entry.t_center) &&
      typeof entry.velocity_contact === "string" &&
      finiteNumber(entry.contact_x) &&
      finiteNumber(entry.contact_xdot),
    proof_interval_v6_fold_interval_present:
      twoEntryRange(entry.ledger_theta_range) &&
      twoEntryRange(entry.ledger_t_range) &&
      finiteNumber(entry.layer_radius_theta) &&
      finiteNumber(entry.layer_radius_t),
    input_screen_fold_interval_present:
      twoEntryRange(entry.input_screen_theta_range) && twoEntryRange(entry.input_screen_t_range),
    mesh_fold_interval_present:
      typeof entry.mesh_subblock_ref === "string" &&
      entry.mesh_subblock_ref === entry.fold_interval &&
      entry.mesh_subblock_type === "fold_layer_candidate" &&
      twoEntryRange(entry.mesh_preledger_theta_range),
    root_tube_interval_certificate_one_root:
      entry.root_tube_ref === entry.separator_event &&
      typeof entry.root_tube_equation === "string" &&
      entry.root_tube_interval_certified_one_root === true,
    fold_layer_rows_attached: Number.isInteger(entry.row_count) && entry.row_count > 0 && Array.isArray(entry.row_ids),
  };
  return {
    evidence,
    complete: Object.values(evidence).every(Boolean),
  };
}

function buildSeparatorObligations(candidateAtlas) {
  return [...candidateAtlas.atlas_source_candidates]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((entry) => {
      const candidateSource = sourceEvidence(entry);
      return {
        atlas_candidate_id: entry.atlas_candidate_id,
        separator_event: entry.separator_event,
        fold_interval: entry.fold_interval,
        row_count: entry.row_count,
        row_ids: entry.row_ids,
        candidate_source_evidence: candidateSource.evidence,
        candidate_source_evidence_complete: candidateSource.complete,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_higher_fold_layer_atlas_ref: null,
        higher_fold_separator_layer_certificate_present: false,
        higher_fold_separator_layer_certificate_ref: null,
        accepted_atlas_ref_derivation_present: false,
        first_certificate_blocker: FIRST_BLOCKER,
        accepted_same_packet_fields_present_after_obligation_classification: falseFieldMap(SAME_PACKET_FIELDS),
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowObligations(candidateAtlas, separatorObligations) {
  const obligationByCandidate = new Map(separatorObligations.map((obligation) => [obligation.atlas_candidate_id, obligation]));
  return [...candidateAtlas.row_candidate_classification]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      if (row.failure_code !== FOLD_LAYER_FAILURE) {
        throw new Error(`Unexpected fold-layer failure code for ${row.row_id}: ${row.failure_code}`);
      }
      const candidateId = row[CANDIDATE_ATLAS_FIELD];
      const separatorObligation = obligationByCandidate.get(candidateId);
      if (!separatorObligation) {
        throw new Error(`Missing separator obligation for ${row.row_id}: ${candidateId}`);
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
        candidate_higher_fold_layer_atlas_ref: candidateId,
        candidate_higher_fold_layer_atlas_ref_present: row.candidate_higher_fold_layer_atlas_ref_present === true,
        candidate_source_evidence_complete: separatorObligation.candidate_source_evidence_complete,
        accepted_higher_fold_layer_atlas_ref_present: false,
        higher_fold_separator_layer_certificate_present: false,
        accepted_atlas_ref_derivation_present: false,
        first_certificate_blocker: FIRST_BLOCKER,
        accepted_same_packet_fields_present_after_obligation_classification: falseFieldMap(SAME_PACKET_FIELDS),
        remaining_missing_same_packet_fields: SAME_PACKET_FIELDS,
        first_missing_same_packet_field_after_obligation_classification: ACCEPTED_ATLAS_FIELD,
        row_acceptance_ready: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function fieldPresenceCounts(rows) {
  return Object.fromEntries(
    SAME_PACKET_FIELDS.map((field) => [
      field,
      {
        present: countTrue(rows, (row) => row.accepted_same_packet_fields_present_after_obligation_classification[field]),
        missing:
          rows.length -
          countTrue(rows, (row) => row.accepted_same_packet_fields_present_after_obligation_classification[field]),
      },
    ]),
  );
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs.candidateAtlas, inputs.readiness, inputs.foldLayerBurden);

  const separatorObligations = buildSeparatorObligations(inputs.candidateAtlas);
  const rowObligations = buildRowObligations(inputs.candidateAtlas, separatorObligations);
  const rowsBySeparatorCount = sortedObjectByKey(countBy(rowObligations, (row) => row.separator_event), (left, right) => {
    return separatorSortKey(left) - separatorSortKey(right);
  });
  const acceptedFieldPresence = fieldPresenceCounts(rowObligations);

  const summary = {
    separator_atlas_source_candidates: separatorObligations.length,
    separator_atlas_source_candidates_with_complete_source_evidence: countTrue(
      separatorObligations,
      (entry) => entry.candidate_source_evidence_complete,
    ),
    separator_atlas_source_candidates_with_accepted_higher_fold_layer_atlas_ref: 0,
    separator_atlas_source_candidates_blocked_by_higher_fold_separator_layer_certificate_absent:
      separatorObligations.length,
    fold_layer_rows: rowObligations.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_candidate_higher_fold_layer_atlas_ref: countTrue(
      rowObligations,
      (row) => row.candidate_higher_fold_layer_atlas_ref_present,
    ),
    rows_with_complete_candidate_source_evidence: countTrue(
      rowObligations,
      (row) => row.candidate_source_evidence_complete,
    ),
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    rows_with_accepted_atlas_ref_derivation: 0,
    rows_blocked_by_higher_fold_separator_layer_certificate_absent: rowObligations.length,
    accepted_same_packet_field_presence_counts_after_obligation_classification: acceptedFieldPresence,
    accepted_same_packet_fields_complete_rows_after_obligation_classification: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    branch_chart_authorized_rows: 0,
    preledger_pass_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-accepted-atlas-ref-obligation-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status:
      "higher_fold_layer_accepted_atlas_ref_obligation_classifier_fail_closed_candidate_source_complete_separator_layer_certificate_absent_no_row_consumption",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted-atlas-ref obligation classifier above the 12 candidate separator atlas refs; no accepted higher_fold_layer_atlas_ref, alpha floor, exit floor, parity record, fold impulse/direct quadrature bound, parent-complement consumption ref, row consumption, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_atlas_ref_source_candidate_classifier: artifactRecord(paths.candidateAtlas),
      higher_fold_layer_same_packet_field_readiness_classifier: artifactRecord(paths.readiness),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
      higher_fold_proof_interval_v6_preledger_script: artifactRecord(paths.higherFoldPreledgerScript),
      same_packet_v7_accepted_fold_row_comparator_script: artifactRecord(paths.samePacketComparatorScript),
    },
    obligation_rule:
      "A candidate_higher_fold_layer_atlas_ref is eligible only as source evidence. This classifier records that acceptance still requires an accepted higher_fold_layer_atlas_ref derivation carried by a higher_fold_separator_layer_certificate, before alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, or parent_complement_consumption_ref can be counted.",
    separator_atlas_ref_obligations: separatorObligations,
    row_obligation_classification: rowObligations,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "higher_fold_separator_layer_certificate / accepted higher_fold_layer_atlas_ref derivation for Sigma_hf_01 through Sigma_hf_12",
      continuation_class:
        "mechanical certificate-side continuation if the accepted higher_fold_layer_atlas_ref derivation can be supplied from same-packet interval data; proof-rule decision required only if no accepted separator-layer certificate can be constructed from the existing candidate refs",
      fail_closed_stop_conditions: [
        "Do not consume fold-layer rows from complete candidate source evidence alone.",
        "Do not treat candidate_higher_fold_layer_atlas_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not count positive alpha_floor, exit_floor, fold impulse/direct quadrature, parity, or parent-complement consumption before accepted higher_fold_layer_atlas_ref is present.",
        "Do not set preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this obligation classifier.",
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
      "Priority-only. This artifact proves that the current candidate atlas source refs are complete enough to state the accepted-atlas-ref obligation, but it proves no higher_fold_separator_layer_certificate, accepted higher_fold_layer_atlas_ref, row-acceptance floors, parity, impulse/direct quadrature bounds, parent-complement consumption, row consumption, live-ledger update, or branch-chart authorization.",
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

function separatorTable(entries) {
  return entries
    .map(
      (entry) =>
        `| \`${entry.atlas_candidate_id}\` | \`${entry.separator_event}\` | \`${entry.fold_interval}\` | ${entry.row_count} | ${entry.candidate_source_evidence_complete} | ${entry.accepted_higher_fold_layer_atlas_ref_present} | ${entry.higher_fold_separator_layer_certificate_present} | \`${entry.first_certificate_blocker}\` |`,
    )
    .join("\n");
}

function rowBlockerTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.candidate_source_evidence_complete} | ${row.accepted_higher_fold_layer_atlas_ref_present} | \`${row.first_certificate_blocker}\` | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Accepted Atlas-Ref Obligation Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier starts from the candidate atlas-ref source materialization and
checks whether the source candidates have become accepted
\`higher_fold_layer_atlas_ref\` evidence. The source side is complete for
${classifier.summary.separator_atlas_source_candidates_with_complete_source_evidence} / ${classifier.summary.separator_atlas_source_candidates}
separator refs and ${classifier.summary.rows_with_complete_candidate_source_evidence} / ${classifier.summary.fold_layer_rows}
fold-layer rows, but the accepted side is still empty.

The first certificate blocker is \`${FIRST_BLOCKER}\`: 0 / ${classifier.summary.fold_layer_rows}
rows carry an accepted \`higher_fold_layer_atlas_ref\`, 0 / ${classifier.summary.fold_layer_rows}
rows carry a \`higher_fold_separator_layer_certificate\`, and 0 rows are
consumed.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Atlas-Ref Obligations

| Candidate atlas ref | Separator | Fold interval | Rows | Candidate source complete | Accepted atlas ref | Separator-layer certificate | First blocker |
| --- | --- | --- | ---: | --- | --- | --- | --- |
${separatorTable(classifier.separator_atlas_ref_obligations)}

## Accepted Field Presence After Obligation Classification

| Same-packet field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(classifier.summary.accepted_same_packet_field_presence_counts_after_obligation_classification)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Row Obligation Classification

| Row | Separator | Fold interval | Candidate source complete | Accepted atlas ref | First blocker | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowBlockerTable(classifier.row_obligation_classification)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only accepted-atlas-ref obligation classifier. It
proves no \`higher_fold_separator_layer_certificate\`, accepted
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
    candidateAtlas: args.candidateAtlas,
    readiness: args.readiness,
    foldLayerBurden: args.foldLayerBurden,
    higherFoldPreledgerScript: args.higherFoldPreledgerScript,
    samePacketComparatorScript: args.samePacketComparatorScript,
  };
  const inputs = {
    candidateAtlas: readJson(paths.candidateAtlas),
    readiness: readJson(paths.readiness),
    foldLayerBurden: readJson(paths.foldLayerBurden),
  };
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
