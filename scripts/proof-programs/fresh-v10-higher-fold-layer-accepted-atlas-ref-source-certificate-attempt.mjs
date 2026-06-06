#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ATLAS_MATERIALIZATION = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ATLAS_OBLIGATION = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_EXIT_FLOOR_DERIVATION = `${CERT_DIR}/higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_accepted_atlas_ref_source_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_accepted_atlas_ref_source_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const ATLAS_MATERIALIZATION_STATUS =
  "higher_fold_layer_atlas_ref_source_candidate_classifier_fail_closed_candidate_refs_only_no_alpha_exit_parity_impulse_or_consumption_no_row_consumption";
const ATLAS_OBLIGATION_STATUS =
  "higher_fold_layer_accepted_atlas_ref_obligation_classifier_fail_closed_candidate_source_complete_separator_layer_certificate_absent_no_row_consumption";
const EXIT_FLOOR_DERIVATION_STATUS =
  "higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt_fail_closed_all_child_refs_constructed_separator_blocked_no_row_consumption";
const PROOF_FIELD_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_accepted_atlas_ref_source_certificate_attempt_fail_closed_atlas_source_certificates_constructed_accepted_refs_absent_no_row_consumption";

const SOURCE_CERTIFICATE_RULE = "candidate_atlas_interval_source_evidence_certificate";
const ACCEPTED_ATLAS_DERIVATION_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const CHILD_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];

function parseArgs(argv) {
  const args = {
    atlasMaterialization: DEFAULT_ATLAS_MATERIALIZATION,
    atlasObligation: DEFAULT_ATLAS_OBLIGATION,
    exitFloorDerivation: DEFAULT_EXIT_FLOOR_DERIVATION,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--atlas-materialization") {
      args.atlasMaterialization = argv[++index];
    } else if (arg === "--atlas-obligation") {
      args.atlasObligation = argv[++index];
    } else if (arg === "--exit-floor-derivation") {
      args.exitFloorDerivation = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-accepted-atlas-ref-source-certificate-attempt.mjs [options]

Options:
  --atlas-materialization PATH  Atlas-ref source candidate materialization. Defaults to ${DEFAULT_ATLAS_MATERIALIZATION}.
  --atlas-obligation PATH       Accepted atlas-ref obligation classifier. Defaults to ${DEFAULT_ATLAS_OBLIGATION}.
  --exit-floor-derivation PATH  Exit-floor proof-grade derivation attempt. Defaults to ${DEFAULT_EXIT_FLOOR_DERIVATION}.
  --proof-field-dependency PATH Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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

function assertStatus(source, name, expected) {
  if (source.status !== expected) {
    throw new Error(`Unexpected ${name} status: ${source.status}`);
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

function mapBy(array, getter, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    const key = getter(entry);
    if (key == null) {
      continue;
    }
    if (map.has(key)) {
      throw new Error(`Duplicate ${name} key: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireMapEntry(map, key, name) {
  if (!map.has(key)) {
    throw new Error(`Missing ${name}: ${key}`);
  }
  return map.get(key);
}

function allObjectValuesTrue(object) {
  return Object.values(object ?? {}).every((value) => value === true);
}

function childRefsComplete(entry) {
  return CHILD_FIELDS.every((field) => entry?.proof_grade_child_fields_present_after_exit_floor_derivation?.[field] === true);
}

function validateInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    if (source.preledger_pass !== false || source.updates_live_ledger !== false || source.branch_chart_authorized !== false) {
      throw new Error(`Refusing to use ${name} because it authorizes preledger/live-ledger/branch-chart state.`);
    }
  }
  assertStatus(inputs.atlasMaterialization, "atlasMaterialization", ATLAS_MATERIALIZATION_STATUS);
  assertStatus(inputs.atlasObligation, "atlasObligation", ATLAS_OBLIGATION_STATUS);
  assertStatus(inputs.exitFloorDerivation, "exitFloorDerivation", EXIT_FLOOR_DERIVATION_STATUS);
  assertStatus(inputs.proofFieldDependency, "proofFieldDependency", PROOF_FIELD_DEPENDENCY_STATUS);
  if (inputs.atlasObligation.summary?.separator_atlas_source_candidates_with_complete_source_evidence !== 12) {
    throw new Error("Accepted atlas-ref obligation classifier no longer has 12 complete separator source-evidence records.");
  }
  if (inputs.atlasObligation.summary?.fold_layer_rows !== 112 || inputs.exitFloorDerivation.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in atlas obligation and exit-floor derivation inputs.");
  }
  if (inputs.exitFloorDerivation.summary?.child_proof_grade_ref_obligations_remaining_after_exit_floor_derivation !== 0) {
    throw new Error("Exit-floor derivation input no longer has complete child proof-grade refs.");
  }
}

function sourceRef(separatorEvent) {
  return `source_ref:${PACKET_ID}:${separatorEvent}:higher_fold_layer_atlas_ref:candidate_atlas_interval_source`;
}

function proofSourceCertificateRef(separatorEvent) {
  return `proof_source_certificate_ref:${PACKET_ID}:${separatorEvent}:higher_fold_layer_atlas_ref:${SOURCE_CERTIFICATE_RULE}:v0`;
}

function buildSeparatorCertificates(inputs) {
  const materializedByCandidate = mapBy(
    inputs.atlasMaterialization.atlas_source_candidates,
    (entry) => entry.atlas_candidate_id,
    "atlas source candidate",
  );
  const dependencyBySeparator = mapBy(
    inputs.proofFieldDependency.separator_dependency_profiles,
    (entry) => entry.separator_event,
    "separator dependency profile",
  );
  const exitBySeparator = mapBy(
    inputs.exitFloorDerivation.separator_exit_floor_derivation_attempts,
    (entry) => entry.separator_event,
    "exit-floor derivation separator",
  );

  return [...inputs.atlasObligation.separator_atlas_ref_obligations]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((obligation) => {
      const materialized = requireMapEntry(materializedByCandidate, obligation.atlas_candidate_id, "atlas source candidate");
      const dependency = requireMapEntry(dependencyBySeparator, obligation.separator_event, "separator dependency profile");
      const exitDerivation = requireMapEntry(exitBySeparator, obligation.separator_event, "exit-floor derivation separator");
      const atlasDependency = dependency.proof_field_dependencies?.higher_fold_layer_atlas_ref;
      const certificateSource = sourceRef(obligation.separator_event);
      const certificateRef = proofSourceCertificateRef(obligation.separator_event);
      const sourceFacts = {
        candidate_source_evidence_complete: obligation.candidate_source_evidence_complete === true,
        all_candidate_source_evidence_fields_true: allObjectValuesTrue(obligation.candidate_source_evidence),
        candidate_ref_present: obligation.atlas_candidate_id === materialized.atlas_candidate_id,
        materialized_candidate_ref_present: materialized.candidate_higher_fold_layer_atlas_ref_present === true,
        proof_field_dependency_atlas_anchor_present: atlasDependency?.candidate_source_anchor_present === true,
        dependency_requests_accepted_atlas_derivation:
          atlasDependency?.first_missing_dependency === ACCEPTED_ATLAS_DERIVATION_BLOCKER,
        root_tube_one_root_dependency_present: dependency.root_tube_interval_certified_one_root === true,
        child_proof_grade_refs_complete: childRefsComplete(exitDerivation),
        prior_accepted_atlas_ref_absent: obligation.accepted_higher_fold_layer_atlas_ref_present === false,
        separator_certificate_absent: obligation.higher_fold_separator_layer_certificate_present === false,
      };
      const constructed = allObjectValuesTrue(sourceFacts);
      return {
        separator_event: obligation.separator_event,
        fold_interval: obligation.fold_interval,
        atlas_candidate_id: obligation.atlas_candidate_id,
        row_count: obligation.row_count,
        row_ids: obligation.row_ids,
        atlas_source_certificate_facts: sourceFacts,
        atlas_source_certificate_constructed: constructed,
        atlas_source_ref: constructed ? certificateSource : null,
        proof_grade_atlas_source_certificate_ref: constructed ? certificateRef : null,
        atlas_source_ref_reused_as_source_certificate_ref: constructed ? certificateSource === certificateRef : false,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_higher_fold_layer_atlas_ref: null,
        accepted_atlas_ref_derivation_present: false,
        accepted_atlas_ref_derivation_ref: null,
        first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_DERIVATION_BLOCKER,
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowCertificates(inputs, separatorCertificates) {
  const certificateBySeparator = mapBy(
    separatorCertificates,
    (entry) => entry.separator_event,
    "separator atlas source certificate",
  );
  const exitByRow = mapBy(
    inputs.exitFloorDerivation.row_exit_floor_derivation_attempts,
    (entry) => entry.row_id,
    "exit-floor derivation row",
  );

  return [...inputs.atlasObligation.row_obligation_classification]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const certificate = requireMapEntry(certificateBySeparator, row.separator_event, "separator atlas source certificate");
      const exitRow = requireMapEntry(exitByRow, row.row_id, "exit-floor derivation row");
      const rowFacts = {
        candidate_source_evidence_complete: row.candidate_source_evidence_complete === true,
        candidate_ref_present: row.candidate_higher_fold_layer_atlas_ref_present === true,
        separator_source_certificate_present: certificate.atlas_source_certificate_constructed === true,
        child_proof_grade_refs_complete:
          CHILD_FIELDS.every((field) => exitRow.child_proof_grade_refs_constructed_after_exit_floor_derivation?.[field] === true),
        prior_accepted_atlas_ref_absent: row.accepted_higher_fold_layer_atlas_ref_present === false,
        separator_certificate_absent: row.higher_fold_separator_layer_certificate_present === false,
      };
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
        atlas_source_certificate_facts: rowFacts,
        proof_grade_atlas_source_certificate_present: certificate.atlas_source_certificate_constructed,
        proof_grade_atlas_source_certificate_ref: certificate.proof_grade_atlas_source_certificate_ref,
        accepted_higher_fold_layer_atlas_ref_present: false,
        accepted_higher_fold_layer_atlas_ref: null,
        accepted_atlas_ref_derivation_present: false,
        first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_DERIVATION_BLOCKER,
        child_proof_grade_refs_constructed: {
          alpha_floor: true,
          exit_floor: true,
          fold_layer_parity_record: true,
        },
        row_lock_fields_present_after_atlas_source_certificate: {
          higher_fold_layer_atlas_ref: false,
          alpha_floor: true,
          exit_floor: true,
          fold_layer_parity_record: true,
          same_packet_fold_impulse_or_direct_quadrature_bound: false,
          parent_complement_consumption_ref: false,
          higher_fold_separator_layer_certificate: false,
          accepted_fold_layer_row: false,
          row_consumed: false,
        },
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function fieldPresenceCounts(rows, getter) {
  return Object.fromEntries(
    Object.keys(getter(rows[0] ?? {})).map((field) => {
      const present = countTrue(rows, (row) => getter(row)[field]);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const separatorCertificates = buildSeparatorCertificates(inputs);
  const rowCertificates = buildRowCertificates(inputs, separatorCertificates);
  const rowsBySeparatorCount = sortedObjectByKey(countBy(rowCertificates, (row) => row.separator_event), (left, right) => {
    return separatorSortKey(left) - separatorSortKey(right);
  });
  const childFieldPresence = fieldPresenceCounts(rowCertificates, (row) => row.child_proof_grade_refs_constructed);
  const rowLockPresence = fieldPresenceCounts(
    rowCertificates,
    (row) => row.row_lock_fields_present_after_atlas_source_certificate,
  );

  const summary = {
    separator_atlas_source_certificate_attempts: separatorCertificates.length,
    fold_layer_rows: rowCertificates.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separator_atlas_source_candidates_with_complete_source_evidence: countTrue(
      separatorCertificates,
      (entry) => entry.atlas_source_certificate_facts.candidate_source_evidence_complete,
    ),
    separator_atlas_source_certificates_constructed: countTrue(
      separatorCertificates,
      (entry) => entry.atlas_source_certificate_constructed,
    ),
    separator_atlas_source_refs_reused_as_source_certificate_refs: countTrue(
      separatorCertificates,
      (entry) => entry.atlas_source_ref_reused_as_source_certificate_ref,
    ),
    rows_with_candidate_higher_fold_layer_atlas_ref: countTrue(
      rowCertificates,
      (row) => row.atlas_source_certificate_facts.candidate_ref_present,
    ),
    rows_with_complete_candidate_source_evidence: countTrue(
      rowCertificates,
      (row) => row.atlas_source_certificate_facts.candidate_source_evidence_complete,
    ),
    rows_with_accepted_atlas_ref_source_certificate: countTrue(
      rowCertificates,
      (row) => row.proof_grade_atlas_source_certificate_present,
    ),
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    rows_with_accepted_atlas_ref_derivation: 0,
    rows_with_all_child_proof_grade_refs: countTrue(
      rowCertificates,
      (row) => CHILD_FIELDS.every((field) => row.child_proof_grade_refs_constructed[field] === true),
    ),
    child_proof_grade_ref_obligations_remaining: 0,
    child_proof_grade_ref_presence_counts_after_atlas_source_certificate: childFieldPresence,
    row_lock_field_presence_counts_after_atlas_source_certificate: rowLockPresence,
    rows_with_same_packet_fold_impulse_or_direct_quadrature_bound: 0,
    rows_with_parent_complement_consumption_ref: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_accepted_atlas_ref_blocker: ACCEPTED_ATLAS_DERIVATION_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };

  if (
    summary.separator_atlas_source_certificates_constructed !== 12 ||
    summary.rows_with_accepted_atlas_ref_source_certificate !== 112 ||
    summary.rows_with_accepted_higher_fold_layer_atlas_ref !== 0 ||
    summary.rows_with_higher_fold_separator_layer_certificate !== 0 ||
    summary.row_consumption_count !== 0
  ) {
    throw new Error("Fail-closed accepted atlas-ref source-certificate invariant failed.");
  }

  return {
    schema: "breather-higher-fold-layer-accepted-atlas-ref-source-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only accepted higher_fold_layer_atlas_ref source-certificate attempt that constructs proof-grade atlas source certificates from complete same-packet candidate atlas evidence; leaves accepted atlas refs, separator certificate, parent-complement consumption, row consumption, preledger pass, live-ledger update, and branch-chart authorization locked",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_atlas_ref_materialization_attempt: artifactRecord(paths.atlasMaterialization),
      higher_fold_layer_accepted_atlas_ref_obligation_classifier: artifactRecord(paths.atlasObligation),
      higher_fold_layer_exit_floor_interval_width_proof_grade_derivation_attempt: artifactRecord(paths.exitFloorDerivation),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
    },
    atlas_source_certificate_rule:
      "For each Sigma_hf_i candidate_higher_fold_layer_atlas_ref, construct a proof_source_certificate_ref only when the accepted-atlas obligation classifier records complete candidate source evidence, the source materialization provides the same candidate ref, the separator proof-field dependency classifier records the higher_fold_layer_atlas_ref candidate anchor, the root-tube one-root dependency is present, all child proof-grade refs are already complete, and no accepted higher_fold_layer_atlas_ref or higher_fold_separator_layer_certificate is already present. This source certificate is not an accepted higher_fold_layer_atlas_ref.",
    separator_atlas_source_certificate_attempts: separatorCertificates,
    row_atlas_source_certificate_attempts: rowCertificates,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted higher_fold_layer_atlas_ref derivation from the atlas source certificate, or aggregate higher_fold_separator_layer_certificate assembly after every required accepted child field exists",
      continuation_class:
        "mechanical certificate-side continuation for atlas-source certification; accepted atlas-ref promotion remains blocked until a derivation bridge proves that the proof_source_certificate_ref supplies an accepted higher_fold_layer_atlas_ref",
      fail_closed_stop_conditions: [
        "Do not treat proof_source_certificate_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not count complete child proof-grade refs as higher_fold_separator_layer_certificate.",
        "Do not construct parent_complement_consumption_ref before separator-certificate authorization.",
        "Do not consume fold-layer rows, set preledger_pass, update the live ledger, or authorize a branch chart from this source certificate.",
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
      "Priority-only. This artifact proves only the atlas source-certificate layer above complete same-packet candidate source evidence. It proves no accepted higher_fold_layer_atlas_ref, same_packet_fold_impulse_or_direct_quadrature_bound, parent_complement_consumption_ref, higher_fold_separator_layer_certificate, row consumption, live-ledger update, or branch-chart authorization.",
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
        `| \`${entry.separator_event}\` | \`${entry.fold_interval}\` | ${entry.row_count} | ${entry.atlas_source_certificate_constructed} | ${entry.accepted_higher_fold_layer_atlas_ref_present} | ${entry.atlas_source_ref_reused_as_source_certificate_ref} | \`${entry.first_accepted_atlas_ref_blocker}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.proof_grade_atlas_source_certificate_present} | ${row.accepted_higher_fold_layer_atlas_ref_present} | ${row.row_lock_fields_present_after_atlas_source_certificate.higher_fold_separator_layer_certificate} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Accepted Atlas-Ref Source-Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

This attempt certifies the source side of the accepted
\`higher_fold_layer_atlas_ref\` obligation. It does not turn a
\`candidate_higher_fold_layer_atlas_ref\` or \`proof_source_certificate_ref\`
into an accepted \`higher_fold_layer_atlas_ref\`.

The attempt covers ${attempt.summary.separator_atlas_source_certificate_attempts}
separator profiles and ${attempt.summary.fold_layer_rows} row associations:

- ${attempt.summary.separator_atlas_source_certificates_constructed}
  / ${attempt.summary.separator_atlas_source_certificate_attempts} separator
  profiles construct atlas source certificates;
- ${attempt.summary.rows_with_accepted_atlas_ref_source_certificate}
  / ${attempt.summary.fold_layer_rows} row associations carry an atlas source
  certificate;
- ${attempt.summary.rows_with_all_child_proof_grade_refs}
  / ${attempt.summary.fold_layer_rows} row associations still carry all three
  child-field \`proof_grade_ref\` fields;
- ${attempt.summary.rows_with_accepted_higher_fold_layer_atlas_ref}
  / ${attempt.summary.fold_layer_rows} row associations carry accepted
  \`higher_fold_layer_atlas_ref\` fields;
- ${attempt.summary.rows_with_higher_fold_separator_layer_certificate}
  / ${attempt.summary.fold_layer_rows} row associations construct
  \`higher_fold_separator_layer_certificate\` fields.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Separator Atlas Source Certificates

| Separator | Fold interval | Rows | Source certificate | Accepted atlas ref | Source ref reused | First accepted-atlas blocker |
| --- | --- | ---: | --- | --- | --- | --- |
${separatorTable(attempt.separator_atlas_source_certificate_attempts)}

## Child Proof-Grade Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(attempt.summary.child_proof_grade_ref_presence_counts_after_atlas_source_certificate)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(attempt.summary.row_lock_field_presence_counts_after_atlas_source_certificate)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Row Atlas Source-Certificate Attempts

| Row | Separator | Fold interval | Source certificate | Accepted atlas ref | Separator certificate | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(attempt.row_atlas_source_certificate_attempts)}

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

This artifact is a priority-only accepted-atlas-ref source-certificate
attempt. It proves no accepted \`higher_fold_layer_atlas_ref\`,
\`same_packet_fold_impulse_or_direct_quadrature_bound\`,
\`parent_complement_consumption_ref\`,
\`higher_fold_separator_layer_certificate\`, row consumption, live-ledger
update, or branch-chart authorization.
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
    atlasMaterialization: args.atlasMaterialization,
    atlasObligation: args.atlasObligation,
    exitFloorDerivation: args.exitFloorDerivation,
    proofFieldDependency: args.proofFieldDependency,
  };
  const inputs = {
    atlasMaterialization: readJson(paths.atlasMaterialization),
    atlasObligation: readJson(paths.atlasObligation),
    exitFloorDerivation: readJson(paths.exitFloorDerivation),
    proofFieldDependency: readJson(paths.proofFieldDependency),
  };
  const attempt = buildAttempt(paths, inputs);
  const outputJson = path.join(args.outDir, OUTPUT_JSON);
  const outputReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outputJson, attempt, args.pretty);
  writeReport(outputReport, attempt);
  console.log(`wrote ${outputJson}`);
  console.log(`wrote ${outputReport}`);
}

main();
