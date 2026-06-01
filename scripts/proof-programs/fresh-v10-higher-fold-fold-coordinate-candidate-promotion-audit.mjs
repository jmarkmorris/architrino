#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_THEOREM_ATTEMPT = `${CERT_DIR}/one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_LAMBDA_REPLAY = `${CERT_DIR}/lambda0305_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_LAMBDA_ROOT_CERT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.lambda0305.v0.json`;
const DEFAULT_EXPECTED_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.fold-coordinate-candidate.nonlinear-v0.json`;
const DEFAULT_EXPECTED_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.fold-coordinate-candidate.nonlinear-v0.json`;
const DEFAULT_EXPECTED_ROOT_CERT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.fold-coordinate-candidate.nonlinear-v0.v0.json`;
const DEFAULT_EXPECTED_PRELEDGER_REPLAY = `${CERT_DIR}/fold_coordinate_candidate_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_candidate_promotion_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_candidate_promotion_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const SCREEN_OR_PROPOSED_FIELDS = [
  "fold_coordinate_theorem_attempt_input_present",
  "screen_positive_candidate_change_row",
  "proposed_shift_assignment_present",
  "proposed_shift_assignment_nonnegative",
  "proposed_combined_opening_gt_threshold",
  "direct_path_lambda_replay_checked_as_non_reusable_contrast",
];

const PROOF_GRADE_FIELDS = [
  "same_packet_candidate_history_materialized",
  "same_packet_candidate_change_data_present",
  "root_topology_recertified_for_candidate_change",
  "proof_interval_preledger_rerun_for_candidate_change",
  "source_monotonicity_preserved_under_candidate_change",
  "receiver_monotonicity_preserved_under_candidate_change",
  "memory_margins_all_owned_components",
  "endpoint_ownership_no_double_counting",
  "simple_root_branch_reuse_exclusion",
  "non_owned_complement_closed",
  "periodic_endpoint_complement_ownership_closed",
  "fold_layer_certification_closed",
  "proof_grade_row",
  "row_consumed",
  "branch_chart_authorized",
];

const ROW_FIELDS = [...SCREEN_OR_PROPOSED_FIELDS, ...PROOF_GRADE_FIELDS];

function parseArgs(argv) {
  const args = {
    theoremAttempt: DEFAULT_THEOREM_ATTEMPT,
    lambdaReplay: DEFAULT_LAMBDA_REPLAY,
    lambdaRootCert: DEFAULT_LAMBDA_ROOT_CERT,
    expectedPhi: DEFAULT_EXPECTED_PHI,
    expectedMesh: DEFAULT_EXPECTED_MESH,
    expectedRootCert: DEFAULT_EXPECTED_ROOT_CERT,
    expectedPreledgerReplay: DEFAULT_EXPECTED_PRELEDGER_REPLAY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--theorem-attempt") {
      args.theoremAttempt = argv[++i];
    } else if (arg === "--lambda-replay") {
      args.lambdaReplay = argv[++i];
    } else if (arg === "--lambda-root-cert") {
      args.lambdaRootCert = argv[++i];
    } else if (arg === "--expected-phi") {
      args.expectedPhi = argv[++i];
    } else if (arg === "--expected-mesh") {
      args.expectedMesh = argv[++i];
    } else if (arg === "--expected-root-cert") {
      args.expectedRootCert = argv[++i];
    } else if (arg === "--expected-preledger-replay") {
      args.expectedPreledgerReplay = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-candidate-promotion-audit.mjs [options]

Options:
  --theorem-attempt PATH          Fold-coordinate theorem attempt JSON. Defaults to ${DEFAULT_THEOREM_ATTEMPT}.
  --lambda-replay PATH            Direct-path lambda replay audit used only as non-reusable contrast. Defaults to ${DEFAULT_LAMBDA_REPLAY}.
  --lambda-root-cert PATH         Direct-path lambda root certificate used only as non-reusable contrast. Defaults to ${DEFAULT_LAMBDA_ROOT_CERT}.
  --expected-phi PATH             Expected fold-coordinate candidate phi_cyc file. Defaults to ${DEFAULT_EXPECTED_PHI}.
  --expected-mesh PATH            Expected fold-coordinate candidate mesh file. Defaults to ${DEFAULT_EXPECTED_MESH}.
  --expected-root-cert PATH       Expected fold-coordinate root certificate. Defaults to ${DEFAULT_EXPECTED_ROOT_CERT}.
  --expected-preledger-replay PATH Expected fold-coordinate preledger replay audit. Defaults to ${DEFAULT_EXPECTED_PRELEDGER_REPLAY}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
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

function absBigInt(value) {
  return value < 0n ? -value : value;
}

function gcd(a, b) {
  let x = absBigInt(a);
  let y = absBigInt(b);
  while (y !== 0n) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1n;
}

function q(num, den = 1n) {
  if (den === 0n) {
    throw new Error("Rational denominator must be nonzero.");
  }
  let n = BigInt(num);
  let d = BigInt(den);
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const divisor = gcd(n, d);
  return { num: n / divisor, den: d / divisor };
}

function qFromJson(value) {
  if (!value || value.num === undefined || value.den === undefined) {
    throw new Error(`Invalid rational JSON: ${JSON.stringify(value)}`);
  }
  return q(BigInt(value.num), BigInt(value.den));
}

function qCmp(left, right) {
  const lhs = left.num * right.den;
  const rhs = right.num * left.den;
  if (lhs < rhs) return -1;
  if (lhs > rhs) return 1;
  return 0;
}

function qToDecimal(value, places = 15) {
  const normalized = q(value.num, value.den);
  const sign = normalized.num < 0n ? "-" : "";
  let numerator = absBigInt(normalized.num);
  const integer = numerator / normalized.den;
  let remainder = numerator % normalized.den;
  if (places === 0 || remainder === 0n) {
    return `${sign}${integer.toString()}`;
  }
  const digits = [];
  for (let i = 0; i < places; i += 1) {
    remainder *= 10n;
    digits.push((remainder / normalized.den).toString());
    remainder %= normalized.den;
    if (remainder === 0n) {
      break;
    }
  }
  while (digits.length > 0 && digits[digits.length - 1] === "0") {
    digits.pop();
  }
  return digits.length === 0 ? `${sign}${integer.toString()}` : `${sign}${integer.toString()}.${digits.join("")}`;
}

function qArtifact(value) {
  return {
    num: value.num.toString(),
    den: value.den.toString(),
    display: qToDecimal(value),
  };
}

function fieldCounts(rows, fields = ROW_FIELDS) {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row.required_fields_present[field] === true).length])
  );
}

function assertInputs(theoremAttempt, lambdaReplay, lambdaRootCert) {
  if (theoremAttempt.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected theorem-attempt packet id: ${theoremAttempt.packet_id}`);
  }
  if (!Array.isArray(theoremAttempt.rows) || theoremAttempt.rows.length !== 3) {
    throw new Error("Expected exactly 3 theorem-attempt rows.");
  }
  if (
    theoremAttempt.branch_chart_authorized !== false ||
    theoremAttempt.preledger_pass !== false ||
    theoremAttempt.updates_live_ledger !== false
  ) {
    throw new Error("Refusing to promote from an authorized or live-updating theorem attempt.");
  }
  if (lambdaReplay?.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected lambda replay packet id: ${lambdaReplay?.packet_id}`);
  }
  if (lambdaRootCert?.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected lambda root certificate packet id: ${lambdaRootCert?.packet_id}`);
  }
}

function proofGradeCandidateHistoryMaterialized(artifactPresence) {
  return artifactPresence.expected_phi_cyc.present === true && artifactPresence.expected_mesh.present === true;
}

function rootTopologyRecertified(artifactPresence) {
  return artifactPresence.expected_root_topology_certificate.present === true;
}

function preledgerReplayPresent(artifactPresence) {
  return artifactPresence.expected_preledger_replay.present === true;
}

function auditRow(row, artifactPresence, directPathContrastPresent) {
  const screenFields = row.screen_fields_present ?? {};
  const proofFields = row.proof_required_fields_present ?? {};
  const screen = row.fold_coordinate_screen_variables;
  const sourceShift = qFromJson(screen.source_shift_q);
  const receiverShift = qFromJson(screen.receiver_shift_q);
  const combinedOpening = qFromJson(screen.combined_boundary_opening_q);
  const requiredOpening = qFromJson(screen.required_combined_opening_q);
  const margin = qFromJson(screen.combined_boundary_opening_margin_q);
  const candidateHistoryMaterialized = proofGradeCandidateHistoryMaterialized(artifactPresence);
  const rootRecertified = rootTopologyRecertified(artifactPresence);
  const preledgerRerun = preledgerReplayPresent(artifactPresence);
  const proofGradeFields = {
    same_packet_candidate_history_materialized: candidateHistoryMaterialized,
    same_packet_candidate_change_data_present:
      candidateHistoryMaterialized && proofFields.same_packet_candidate_change_data_present === true,
    root_topology_recertified_for_candidate_change: rootRecertified,
    proof_interval_preledger_rerun_for_candidate_change: preledgerRerun,
    source_monotonicity_preserved_under_candidate_change:
      proofFields.source_monotonicity_preserved_under_candidate_change === true,
    receiver_monotonicity_preserved_under_candidate_change:
      proofFields.receiver_monotonicity_preserved_under_candidate_change === true,
    memory_margins_all_owned_components: proofFields.memory_margins_all_owned_components === true,
    endpoint_ownership_no_double_counting: proofFields.endpoint_ownership_no_double_counting === true,
    simple_root_branch_reuse_exclusion: proofFields.simple_root_branch_reuse_exclusion === true,
    non_owned_complement_closed: proofFields.non_owned_complement_closed === true,
    periodic_endpoint_complement_ownership_closed: false,
    fold_layer_certification_closed: false,
    proof_grade_row: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  proofGradeFields.proof_grade_row = [
    proofGradeFields.same_packet_candidate_history_materialized,
    proofGradeFields.same_packet_candidate_change_data_present,
    proofGradeFields.root_topology_recertified_for_candidate_change,
    proofGradeFields.proof_interval_preledger_rerun_for_candidate_change,
    proofGradeFields.source_monotonicity_preserved_under_candidate_change,
    proofGradeFields.receiver_monotonicity_preserved_under_candidate_change,
    proofGradeFields.memory_margins_all_owned_components,
    proofGradeFields.endpoint_ownership_no_double_counting,
    proofGradeFields.simple_root_branch_reuse_exclusion,
    proofGradeFields.non_owned_complement_closed,
    proofGradeFields.periodic_endpoint_complement_ownership_closed,
    proofGradeFields.fold_layer_certification_closed,
  ].every(Boolean);

  const proposedFields = {
    fold_coordinate_theorem_attempt_input_present: true,
    screen_positive_candidate_change_row: screenFields.fold_coordinate_screen_combined_opening_gt_threshold === true,
    proposed_shift_assignment_present: true,
    proposed_shift_assignment_nonnegative: qCmp(sourceShift, q(0n)) >= 0 && qCmp(receiverShift, q(0n)) >= 0,
    proposed_combined_opening_gt_threshold: qCmp(margin, q(0n)) > 0,
    direct_path_lambda_replay_checked_as_non_reusable_contrast: directPathContrastPresent,
  };
  const fields = {
    ...proposedFields,
    ...proofGradeFields,
  };

  return {
    row_id: row.row_id,
    cover_id: row.cover_id,
    ledger: row.ledger,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    failed_side: row.failed_side,
    boundary_side: row.boundary_side,
    proposed_fold_coordinate_assignment: {
      source_shift_variable: screen.source_shift_variable,
      receiver_shift_variable: screen.receiver_shift_variable,
      source_candidate_change_symbol: row.source_candidate_change_variable?.symbol,
      receiver_candidate_change_symbol: row.receiver_candidate_change_variable?.symbol,
      source_shift_q: qArtifact(sourceShift),
      receiver_shift_q: qArtifact(receiverShift),
      combined_boundary_opening_q: qArtifact(combinedOpening),
      required_combined_opening_q: qArtifact(requiredOpening),
      combined_boundary_opening_margin_q: qArtifact(margin),
      promotion_status: "proposed_screen_assignment_only",
    },
    required_fields_present: fields,
    proposed_fields_present: proposedFields,
    proof_grade_fields_present: proofGradeFields,
    promotion_pass_rule_satisfied: proofGradeFields.proof_grade_row === true,
    row_consumed: false,
    branch_chart_authorized: false,
    promotion_blocker:
      "The proposed fold-coordinate shifts strictly open the one-leaf boundary target, but no same-packet candidate history, fold-coordinate root-topology certificate, fold-coordinate preledger replay, preservation certificate, endpoint ownership/no-double-counting certificate, branch-reuse exclusion, non-owned-complement closure, periodic endpoint/complement closure, or fold-layer certification is present.",
  };
}

function buildAudit(theoremAttempt, lambdaReplay, lambdaRootCert, sources) {
  assertInputs(theoremAttempt, lambdaReplay, lambdaRootCert);
  const artifactPresence = {
    expected_phi_cyc: artifactRecord(sources.expectedPhi),
    expected_mesh: artifactRecord(sources.expectedMesh),
    expected_root_topology_certificate: artifactRecord(sources.expectedRootCert),
    expected_preledger_replay: artifactRecord(sources.expectedPreledgerReplay),
  };
  const directPathContrastPresent =
    lambdaReplay.status === "lambda0305_topology_certified_preledger_still_blocked" &&
    lambdaRootCert.status === "outward_rational_interval_12_root_certificate_passed";
  const rows = theoremAttempt.rows.map((row) => auditRow(row, artifactPresence, directPathContrastPresent));
  const counts = fieldCounts(rows);
  const proposedCounts = fieldCounts(rows, SCREEN_OR_PROPOSED_FIELDS);
  const proofCounts = fieldCounts(rows, PROOF_GRADE_FIELDS);
  return {
    schema: "breather-higher-fold-fold-coordinate-candidate-promotion-audit-v1",
    packet_id: PACKET_ID,
    source_theorem_attempt: path.basename(sources.theoremAttempt),
    source_theorem_attempt_sha256: sha256File(sources.theoremAttempt),
    source_lambda0305_replay_contrast: path.basename(sources.lambdaReplay),
    source_lambda0305_replay_contrast_sha256: sha256File(sources.lambdaReplay),
    source_lambda0305_root_certificate_contrast: path.basename(sources.lambdaRootCert),
    source_lambda0305_root_certificate_contrast_sha256: sha256File(sources.lambdaRootCert),
    status: "fold_coordinate_candidate_promotion_audit_fail_closed",
    theorem_target: "Fold-Coordinate Candidate-Change Proof-Grade Promotion Audit",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only promotion audit; positive fold-coordinate screen shifts are proposed, but proof-grade same-packet candidate realization and replay evidence are absent",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    promotion_rule:
      "A positive fold-coordinate screen row becomes proof-grade only after a same-packet candidate history is materialized, its root topology is recertified, proof-interval preledger is rerun, and all source/receiver monotonicity, memory, endpoint ownership/no-double-counting, branch-reuse exclusion, non-owned complement, periodic endpoint/complement, and fold-layer obligations are certified.",
    artifact_presence: artifactPresence,
    expected_candidate_artifacts: artifactPresence,
    direct_path_contrast: {
      lambda0305_replay_present: true,
      lambda0305_replay_status: lambdaReplay.status,
      lambda0305_preledger_replay_present: true,
      lambda0305_topology_recertified:
        lambdaRootCert.status === "outward_rational_interval_12_root_certificate_passed",
      lambda0305_root_certificate_status: lambdaRootCert.status,
      reusable_for_fold_coordinate_candidate: false,
      candidate_specific_replay_applies: false,
      reason:
        "The lambda=0.305 replay certifies the direct-path trial seed, not the fold-coordinate candidate-change assignment.",
    },
    summary: {
      promotion_rows: rows.length,
      screen_positive_rows: counts.screen_positive_candidate_change_row,
      proposed_shift_assignment_rows: counts.proposed_shift_assignment_present,
      proposed_combined_opening_rows: counts.proposed_combined_opening_gt_threshold,
      same_packet_candidate_history_materialized_rows: counts.same_packet_candidate_history_materialized,
      same_packet_candidate_change_data_present_rows: counts.same_packet_candidate_change_data_present,
      root_topology_recertified_rows: counts.root_topology_recertified_for_candidate_change,
      proof_interval_preledger_rerun_rows: counts.proof_interval_preledger_rerun_for_candidate_change,
      source_monotonicity_certified_rows: counts.source_monotonicity_preserved_under_candidate_change,
      receiver_monotonicity_certified_rows: counts.receiver_monotonicity_preserved_under_candidate_change,
      memory_margin_certified_rows: counts.memory_margins_all_owned_components,
      endpoint_ownership_no_double_counting_rows: counts.endpoint_ownership_no_double_counting,
      simple_root_branch_reuse_exclusion_rows: counts.simple_root_branch_reuse_exclusion,
      non_owned_complement_closed_rows: counts.non_owned_complement_closed,
      periodic_endpoint_complement_ownership_closed_rows: counts.periodic_endpoint_complement_ownership_closed,
      fold_layer_certification_closed_rows: counts.fold_layer_certification_closed,
      proof_grade_rows: counts.proof_grade_row,
      row_consumption_count: 0,
      proposed_field_certification_counts: proposedCounts,
      proof_grade_field_certification_counts: proofCounts,
      required_fields_certified_counts: counts,
      expected_candidate_artifacts_present: Object.values(artifactPresence).filter((entry) => entry.present).length,
      expected_candidate_artifact_count: Object.values(artifactPresence).length,
    },
    rows,
  };
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.failed_side}\` | ${row.proposed_fold_coordinate_assignment.combined_boundary_opening_q.display} | ${row.proposed_fold_coordinate_assignment.required_combined_opening_q.display} | ${row.proposed_fold_coordinate_assignment.combined_boundary_opening_margin_q.display} | ${row.required_fields_present.same_packet_candidate_history_materialized} | ${row.required_fields_present.root_topology_recertified_for_candidate_change} | ${row.required_fields_present.proof_interval_preledger_rerun_for_candidate_change} | ${row.promotion_pass_rule_satisfied} |`
    )
    .join("\n");
}

function fieldTable(audit, fields) {
  return fields
    .map(
      (field) =>
        `| \`${field}\` | ${audit.summary.required_fields_certified_counts[field]} / ${audit.summary.promotion_rows} |`
    )
    .join("\n");
}

function artifactTable(artifactPresence) {
  return Object.entries(artifactPresence)
    .map(([name, artifact]) => `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} |`)
    .join("\n");
}

function buildReport(audit) {
  return `# Higher-Fold Fold-Coordinate Candidate Promotion Audit

## Verdict

The fold-coordinate candidate-change route still fail-closes at the proof-grade
promotion gate. The inherited screen witness gives proposed nonnegative
fold-coordinate shifts for all ${audit.summary.promotion_rows} one-leaf rows,
and all ${audit.summary.screen_positive_rows} rows remain strictly
screen-positive. No row is consumed because the expected same-packet
fold-coordinate candidate history, root-topology recertification, and
proof-interval preledger replay artifacts are absent.

| Quantity | Value |
| --- | ---: |
| Promotion rows | ${audit.summary.promotion_rows} |
| Screen-positive rows | ${audit.summary.screen_positive_rows} |
| Proposed shift-assignment rows | ${audit.summary.proposed_shift_assignment_rows} |
| Proposed combined-opening rows | ${audit.summary.proposed_combined_opening_rows} |
| Same-packet candidate history materialized rows | ${audit.summary.same_packet_candidate_history_materialized_rows} |
| Root topology recertified rows | ${audit.summary.root_topology_recertified_rows} |
| Proof-interval preledger rerun rows | ${audit.summary.proof_interval_preledger_rerun_rows} |
| Source monotonicity certified rows | ${audit.summary.source_monotonicity_certified_rows} |
| Receiver monotonicity certified rows | ${audit.summary.receiver_monotonicity_certified_rows} |
| Memory-margin certified rows | ${audit.summary.memory_margin_certified_rows} |
| Endpoint ownership/no-double-counting rows | ${audit.summary.endpoint_ownership_no_double_counting_rows} |
| Simple-root branch-reuse exclusion rows | ${audit.summary.simple_root_branch_reuse_exclusion_rows} |
| Non-owned complement closed rows | ${audit.summary.non_owned_complement_closed_rows} |
| Periodic endpoint/complement ownership closed rows | ${audit.summary.periodic_endpoint_complement_ownership_closed_rows} |
| Fold-layer certification closed rows | ${audit.summary.fold_layer_certification_closed_rows} |
| Proof-grade rows | ${audit.summary.proof_grade_rows} |
| Row consumption count | ${audit.summary.row_consumption_count} |
| Expected candidate artifacts present | ${audit.summary.expected_candidate_artifacts_present} / ${audit.summary.expected_candidate_artifact_count} |

## Expected Promotion Artifacts

| Artifact | Expected file | Present |
| --- | --- | --- |
${artifactTable(audit.artifact_presence)}

The existing \`lambda=0.305\` replay is recorded only as a non-reusable
contrast. It certifies root topology for the direct-path trial seed, not for a
fold-coordinate candidate-change assignment.

## Row Audit

| Row | Failed side | Proposed opening | Required opening | Proposed margin | Candidate history | Root recertified | Preledger rerun | Promotion pass |
| --- | --- | ---: | ---: | ---: | --- | --- | --- | --- |
${rowTable(audit.rows)}

## Proposed Fields

| Field | Rows certified |
| --- | ---: |
${fieldTable(audit, SCREEN_OR_PROPOSED_FIELDS)}

## Proof-Grade Fields

| Field | Rows certified |
| --- | ---: |
${fieldTable(audit, PROOF_GRADE_FIELDS)}

## Closure Burden

The next mathematical object cannot be another screen over the same witness. It
must choose a realization route and then prove it:

1. materialize a same-packet fold-coordinate candidate history, including
   \`phi_cyc\` and \`mesh\` data;
2. rerun outward-rational root-topology certification for that candidate;
3. rerun proof-interval preledger classification for that candidate;
4. prove source and receiver monotonicity, all-owned memory margins, endpoint
   ownership/no-double-counting, simple-root branch-reuse exclusion, and
   non-owned complement closure for the one-leaf rows;
5. close the 8 periodic endpoint/complement rows and the 112 fold-layer rows
   before branch-chart authorization.

## Capture Decision

Priority-only promotion audit. This packet is not ready for authored AAA
promotion because it remains diagnostic and row-blocked. It usefully separates
the already-positive screen assignment from the absent same-packet realization
and replay evidence needed for row consumption.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const theoremAttempt = readJson(args.theoremAttempt);
  const lambdaReplay = readJson(args.lambdaReplay);
  const lambdaRootCert = readJson(args.lambdaRootCert);
  const audit = buildAudit(theoremAttempt, lambdaReplay, lambdaRootCert, {
    theoremAttempt: args.theoremAttempt,
    lambdaReplay: args.lambdaReplay,
    lambdaRootCert: args.lambdaRootCert,
    expectedPhi: args.expectedPhi,
    expectedMesh: args.expectedMesh,
    expectedRootCert: args.expectedRootCert,
    expectedPreledgerReplay: args.expectedPreledgerReplay,
  });
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
