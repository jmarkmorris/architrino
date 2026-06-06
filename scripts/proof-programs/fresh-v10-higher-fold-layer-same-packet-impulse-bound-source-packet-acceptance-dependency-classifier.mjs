#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_FALLBACK_LEGALITY = `${CERT_DIR}/fold_full_interval_fallback_legality.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const PRIOR_BLOCKER = "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_absent";
const FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_acceptance_rule_absent";
const FIRST_SEPARATOR_LAYER_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const SEPARATOR_FIELDS = [
  "separator_aggregate_C_Sigma_present",
  "separator_aggregate_A_Sigma_eta_epsilon_c_present",
  "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
  "source_packet_acceptance_rule_present",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "higher_fold_separator_layer_certificate",
];

const ROW_FIELDS = [
  "separator_aggregate_C_Sigma_present",
  "separator_aggregate_A_Sigma_eta_epsilon_c_present",
  "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
  "source_packet_acceptance_rule_present",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_bound",
  "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];

function parseArgs(argv) {
  const args = {
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    contract: DEFAULT_CONTRACT,
    fallbackLegality: DEFAULT_FALLBACK_LEGALITY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--fallback-legality") {
      args.fallbackLegality = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-impulse-bound-source-packet-acceptance-dependency-classifier.mjs [options]

Options:
  --separator-aggregate PATH      Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --proof-field-dependency PATH   Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --contract PATH                 Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --fallback-legality PATH        Full-interval fallback legality note. Defaults to ${DEFAULT_FALLBACK_LEGALITY}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
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

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function requireIncludes(text, needles, name) {
  const missing = needles.filter((needle) => !text.includes(needle));
  if (missing.length > 0) {
    throw new Error(`${name} missing expected source text: ${missing.join(", ")}`);
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

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function validateInputs(inputs) {
  assertPacketId(inputs.separatorAggregate, "separatorAggregate");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.separatorAggregate, "separatorAggregate");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");

  if (inputs.separatorAggregate.summary?.first_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("Separator aggregate artifact no longer exposes the expected source-packet blocker.");
  }
  if (inputs.separatorAggregate.summary?.separators_with_separator_aggregate_C_Sigma !== 12) {
    throw new Error("Expected 12 separator C_Sigma aggregates.");
  }
  if (inputs.separatorAggregate.summary?.separators_with_separator_aggregate_A_Sigma_eta_epsilon_c !== 12) {
    throw new Error("Expected 12 separator A_Sigma aggregates.");
  }
  if (inputs.separatorAggregate.summary?.separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma !== 12) {
    throw new Error("Expected 12 separator I_fold aggregates.");
  }
  if (inputs.separatorAggregate.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Separator aggregate artifact unexpectedly accepts source packets.");
  }
  if (inputs.proofFieldDependency.summary?.first_same_packet_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("Proof-field dependency classifier no longer exposes the expected source-packet blocker.");
  }
  requireIncludes(
    inputs.contractText,
    [
      "### Separator aggregates",
      "same packet identity",
      "Row consumption boundary",
      "Minimal Fields For An Accepted Constants Artifact",
    ],
    "fold_interval_constants_contract.md",
  );
  requireIncludes(
    inputs.fallbackText,
    [
      "coarse fixed-parameter consumption",
      "not direct quadrature",
      "An explicit status that the artifact is accepted interval-certified data",
    ],
    "fold_full_interval_fallback_legality.md",
  );
}

function classifySeparator(separator) {
  return {
    separator_event: separator.separator_event,
    fold_interval: separator.fold_interval,
    row_count: separator.row_count,
    row_ids: separator.row_ids,
    aggregate_certificate_ref: `same_packet_separator_aggregate:${separator.separator_event}`,
    separator_aggregate_C_Sigma_present: separator.separator_aggregate_C_Sigma_present,
    separator_aggregate_A_Sigma_eta_epsilon_c_present:
      separator.separator_aggregate_A_Sigma_eta_epsilon_c_present,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present:
      separator.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present,
    row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma:
      separator.row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma,
    row_tube_eta_sqrt_scaling_certified: false,
    direct_quadrature_I_fold_B_present: false,
    fixed_parameter_full_input_screen_fallback: true,
    source_packet_acceptance_rule_present: false,
    source_packet_acceptance_rule_ref: null,
    source_packet_acceptance_rule_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
    source_packet_acceptance_rule_family_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    same_packet_fold_impulse_or_direct_quadrature_bound: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    higher_fold_separator_layer_certificate: false,
    first_source_packet_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
    first_separator_layer_blocker: FIRST_SEPARATOR_LAYER_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };
}

function classifyRow(row) {
  return {
    row_id: row.row_id,
    ledger: row.ledger,
    status: row.status,
    failure_code: row.failure_code,
    separator_event: row.separator_event,
    fold_interval: row.fold_interval,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    aggregate_certificate_ref: row.separator_aggregate_ref,
    separator_aggregate_C_Sigma_present: row.separator_aggregate_C_Sigma_present,
    separator_aggregate_A_Sigma_eta_epsilon_c_present: row.separator_aggregate_A_Sigma_eta_epsilon_c_present,
    separator_aggregate_I_fold_eta_epsilon_c_Sigma_present:
      row.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present,
    source_packet_acceptance_rule_present: false,
    source_packet_acceptance_rule_ref: null,
    source_packet_acceptance_rule_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
    source_packet_acceptance_rule_family_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    same_packet_fold_impulse_or_direct_quadrature_bound: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
    higher_fold_separator_layer_certificate: false,
    first_source_packet_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
    first_separator_layer_blocker: FIRST_SEPARATOR_LAYER_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separators = inputs.separatorAggregate.separator_aggregate_certificates
    .map(classifySeparator)
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
  const rows = inputs.separatorAggregate.row_aggregate_certificates
    .map(classifyRow)
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)));

  const summary = {
    separator_acceptance_dependency_profiles: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rows, (row) => row.separator_event)),
    prior_source_packet_blocker: PRIOR_BLOCKER,
    separators_with_separator_aggregate_C_Sigma: countTrue(
      separators,
      (separator) => separator.separator_aggregate_C_Sigma_present,
    ),
    separators_with_separator_aggregate_A_Sigma_eta_epsilon_c: countTrue(
      separators,
      (separator) => separator.separator_aggregate_A_Sigma_eta_epsilon_c_present,
    ),
    separators_with_separator_aggregate_I_fold_eta_epsilon_c_Sigma: countTrue(
      separators,
      (separator) => separator.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present,
    ),
    separators_with_source_packet_acceptance_rule: countTrue(
      separators,
      (separator) => separator.source_packet_acceptance_rule_present,
    ),
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: countTrue(
      separators,
      (separator) => separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet,
    ),
    rows_with_same_packet_fold_impulse_or_direct_quadrature_bound: countTrue(
      rows,
      (row) => row.same_packet_fold_impulse_or_direct_quadrature_bound,
    ),
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_bound: countTrue(
      rows,
      (row) => row.accepted_same_packet_fold_impulse_or_direct_quadrature_bound,
    ),
    first_source_packet_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
    first_separator_layer_blocker: FIRST_SEPARATOR_LAYER_BLOCKER,
    separator_field_presence_counts: presenceCounts(separators, SEPARATOR_FIELDS),
    row_field_presence_counts: presenceCounts(rows, ROW_FIELDS),
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-impulse-bound-source-packet-acceptance-dependency-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only acceptance-dependency classifier; confirms same-packet separator aggregate fields are present while proving no source-packet acceptance rule, no accepted same_packet_fold_impulse_or_direct_quadrature_bound, no higher_fold_separator_layer_certificate, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      fold_interval_constants_contract: artifactRecord(paths.contract),
      fold_full_interval_fallback_legality: artifactRecord(paths.fallbackLegality),
    },
    classifier_rule: {
      name: "source_packet_acceptance_dependency_after_separator_aggregates",
      aggregate_fields_required: [
        "separator_aggregate_C_Sigma_present",
        "separator_aggregate_A_Sigma_eta_epsilon_c_present",
        "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
      ],
      aggregate_fields_present: true,
      source_packet_acceptance_rule_required: true,
      source_packet_acceptance_rule_present: false,
      source_packet_acceptance_rule_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
      source_packet_acceptance_rule_family_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      fixed_parameter_full_input_screen_fallback: true,
      row_tube_eta_sqrt_scaling_certified: false,
      direct_quadrature_I_fold_B_present: false,
    },
    separator_acceptance_dependency_profiles: separators,
    row_acceptance_dependency_profiles: rows,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_ACCEPTANCE_DEPENDENCY_BLOCKER,
      source_packet_acceptance_rule_family_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
      first_separator_layer_blocker: FIRST_SEPARATOR_LAYER_BLOCKER,
      mechanical_continuation:
        "provide an explicit source-packet acceptance rule or accepted constants artifact that permits the fixed-parameter aggregate fields to instantiate same_packet_fold_impulse_or_direct_quadrature_bound; otherwise continue to an alternate accepted source-packet route",
      decision_boundary:
        "this classifier does not choose or accept a proof rule; it records that aggregate fields are ready and source-packet acceptance is the live blocker",
      fail_closed_stop_conditions: [
        "Do not treat separator aggregate fields as accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound without an explicit source-packet acceptance rule or accepted constants artifact.",
        "Do not set higher_fold_separator_layer_certificate, accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this classifier.",
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
      "Priority-only. This classifier reduces source-packet absent to source-packet acceptance-rule absent while preserving fail-closed row and ledger state.",
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

function fieldPresenceTable(counts) {
  return Object.entries(counts)
    .map(([field, count]) => `| \`${field}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.separator_aggregate_C_Sigma_present} | ${separator.separator_aggregate_A_Sigma_eta_epsilon_c_present} | ${separator.separator_aggregate_I_fold_eta_epsilon_c_Sigma_present} | ${separator.source_packet_acceptance_rule_present} | ${separator.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet} | \`${separator.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function reportMarkdown(classifier) {
  return `# Higher-Fold Layer Same-Packet Impulse-Bound Source-Packet Acceptance Dependency Classifier

Packet: \`${classifier.packet_id}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

The prior separator aggregate certificate stopped at
\`${classifier.summary.prior_source_packet_blocker}\`. This classifier confirms
that the separator aggregate fields are present for
${classifier.summary.separators_with_separator_aggregate_C_Sigma} /
${classifier.summary.separator_acceptance_dependency_profiles} separator layers,
but that no source-packet acceptance rule is present.

It records 0 accepted \`same_packet_fold_impulse_or_direct_quadrature_bound\`
source packets, 0 \`higher_fold_separator_layer_certificate\` fields, 0 accepted
fold-layer rows, 0 row consumptions, \`preledger_pass=false\`, no live-ledger
update, and no branch-chart authorization.

The first source-packet blocker is
\`${classifier.summary.first_source_packet_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Classifier Rule

| Field | Value |
| --- | --- |
| rule | \`${classifier.classifier_rule.name}\` |
| aggregate fields present | ${classifier.classifier_rule.aggregate_fields_present} |
| source-packet acceptance rule required | ${classifier.classifier_rule.source_packet_acceptance_rule_required} |
| source-packet acceptance rule present | ${classifier.classifier_rule.source_packet_acceptance_rule_present} |
| source-packet acceptance blocker | \`${classifier.classifier_rule.source_packet_acceptance_rule_blocker}\` |
| fixed-parameter full-input-screen fallback | ${classifier.classifier_rule.fixed_parameter_full_input_screen_fallback} |
| row-tube eta-sqrt scaling | ${classifier.classifier_rule.row_tube_eta_sqrt_scaling_certified} |
| direct quadrature | ${classifier.classifier_rule.direct_quadrature_I_fold_B_present} |

## Separator Acceptance Dependencies

| Separator | Fold interval | Rows | C_Sigma | A_Sigma_eta_epsilon_c | I_fold_eta_epsilon_c_Sigma | Acceptance rule | Accepted source packet | First source-packet blocker |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_acceptance_dependency_profiles)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.row_field_presence_counts)}

## Certificate-Side Handoff

First source-packet blocker:
\`${classifier.next_certificate_handoff.first_source_packet_blocker}\`.

First separator-layer blocker:
\`${classifier.next_certificate_handoff.first_separator_layer_blocker}\`.

Mechanical continuation: ${classifier.next_certificate_handoff.mechanical_continuation}.

Decision boundary: ${classifier.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((condition) => `- ${condition}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: ${classifier.preledger_pass}
- \`updates_live_ledger\`: ${classifier.updates_live_ledger}
- \`accepted_fold_layer_rows\`: ${classifier.authorization_lock.accepted_fold_layer_rows}
- \`row_consumption_count\`: ${classifier.authorization_lock.row_consumption_count}
- \`branch_chart_authorized\`: ${classifier.branch_chart_authorized}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    separatorAggregate: args.separatorAggregate,
    proofFieldDependency: args.proofFieldDependency,
    contract: args.contract,
    fallbackLegality: args.fallbackLegality,
  };
  const inputs = {
    separatorAggregate: readJson(paths.separatorAggregate),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    contractText: readText(paths.contract),
    fallbackText: readText(paths.fallbackLegality),
  };
  const classifier = buildClassifier(paths, inputs);
  const jsonPath = path.join(args.outDir, OUTPUT_JSON);
  const reportPath = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(jsonPath, classifier, args.pretty);
  writeText(reportPath, reportMarkdown(classifier));
  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${reportPath}`);
}

main();
