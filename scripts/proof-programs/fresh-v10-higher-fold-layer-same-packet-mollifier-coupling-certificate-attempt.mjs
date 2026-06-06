#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_M_DELTA_CERTIFICATE = `${CERT_DIR}/higher_fold_layer_same_packet_mollifier_m_delta_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_COUPLING_AUDIT = `${CERT_DIR}/fold_mollifier_coupling_audit.md`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_mollifier_coupling_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_mollifier_coupling_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SELECTED_ROUTE = "mollifier_norm_full_input_screen_rectangle_fallback";
const STATUS =
  "higher_fold_layer_same_packet_mollifier_coupling_certificate_attempt_fail_closed_M_delta_Gamma_certified_coverage_enclosures_absent_no_row_consumption";
const PRIOR_BLOCKER = "Gamma_g_coupling_certified_absent";
const FIRST_COVERAGE_BLOCKER = "row_projection_source_slice_coverage_certificate_absent";
const FIRST_NUMERICAL_ENCLOSURE_BLOCKER = "dual_mollified_row_integrand_interval_enclosure_absent";

function parseArgs(argv) {
  const args = {
    mDeltaCertificate: DEFAULT_M_DELTA_CERTIFICATE,
    phi: DEFAULT_PHI,
    mesh: DEFAULT_MESH,
    couplingAudit: DEFAULT_COUPLING_AUDIT,
    contract: DEFAULT_CONTRACT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--m-delta-certificate") {
      args.mDeltaCertificate = argv[++index];
    } else if (arg === "--phi") {
      args.phi = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--coupling-audit") {
      args.couplingAudit = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-mollifier-coupling-certificate-attempt.mjs [options]

Options:
  --m-delta-certificate PATH  Same-packet M_delta certificate attempt. Defaults to ${DEFAULT_M_DELTA_CERTIFICATE}.
  --phi PATH                  Same-packet phi_cyc candidate. Defaults to ${DEFAULT_PHI}.
  --mesh PATH                 Same-packet mesh. Defaults to ${DEFAULT_MESH}.
  --coupling-audit PATH       Coupling audit note. Defaults to ${DEFAULT_COUPLING_AUDIT}.
  --contract PATH             Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --out-dir PATH              Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                    Pretty-print JSON artifact.
  --help                      Show this help.`);
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

function validateInputs(inputs) {
  assertPacketId(inputs.mDeltaCertificate, "mDeltaCertificate");
  assertPacketId(inputs.phi, "phi");
  assertPacketId(inputs.mesh, "mesh");
  assertFailClosed(inputs.mDeltaCertificate, "mDeltaCertificate");
  assertFailClosed(inputs.phi, "phi");
  assertFailClosed(inputs.mesh, "mesh");

  if (inputs.mDeltaCertificate.summary?.selected_route_candidate !== SELECTED_ROUTE) {
    throw new Error("M_delta certificate no longer selects the mollifier full-rectangle fallback.");
  }
  if (inputs.mDeltaCertificate.summary?.first_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("M_delta certificate no longer exposes Gamma/g as the first source-packet blocker.");
  }
  if (inputs.mDeltaCertificate.summary?.separators_with_M_delta_interval_certified !== 12) {
    throw new Error("Expected M_delta certification for 12 separator layers.");
  }
  if (inputs.mDeltaCertificate.summary?.rows_with_M_delta_interval_certified !== 112) {
    throw new Error("Expected M_delta certification for 112 fold-layer rows.");
  }
  const p = inputs.phi.common_identity?.P;
  const meshP = inputs.mesh.common_identity?.P;
  if (p?.g !== 1 || meshP?.g !== 1) {
    throw new Error("Same-packet g parameter is not exactly 1 in phi_cyc and mesh.");
  }
  if (p?.epsilon_c !== 0.05 || meshP?.epsilon_c !== 0.05) {
    throw new Error("Same-packet epsilon_c parameter drifted.");
  }
  if (inputs.phi.common_identity?.K !== inputs.mesh.common_identity?.K) {
    throw new Error("phi_cyc and mesh common identities disagree.");
  }
  requireIncludes(
    inputs.couplingText,
    ["g=1.0=\\Gamma=\\kappa\\epsilon^2", "not by itself an accepted interval constant"],
    "fold_mollifier_coupling_audit.md",
  );
  requireIncludes(
    inputs.contractText,
    ["Gamma=\\kappa\\epsilon^2", "The accepted artifact must state whether packet `g=1.0` is exactly the coupling product"],
    "fold_interval_constants_contract.md",
  );
}

function rowCouplingCertificate(row) {
  return {
    row_id: row.row_id,
    ledger: row.ledger,
    status: row.status,
    failure_code: row.failure_code,
    separator_event: row.separator_event,
    fold_interval: row.fold_interval,
    selected_route_candidate: row.selected_route_candidate,
    mollifier_route_declared: row.mollifier_route_declared,
    M_delta_interval_certified: row.M_delta_interval_certified,
    M_delta_interval_exact: row.M_delta_interval_exact,
    delta_eta_sup_norm_interval_certified: row.delta_eta_sup_norm_interval_certified,
    delta_eta_sup_norm_exact: row.delta_eta_sup_norm_exact,
    Gamma_g_coupling_certified: true,
    Gamma_interval_exact: ["1", "1"],
    packet_g_exact: "1",
    accepted_row_projection_source_slice_coverage_certificate: false,
    dual_mollified_row_integrand_interval_enclosure: false,
    direct_quadrature_I_fold_B_present: false,
    row_acceleration_enclosure_A_B_present: false,
    row_impulse_enclosure: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    first_source_packet_blocker: FIRST_COVERAGE_BLOCKER,
    first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
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

function separatorCouplingCertificates(sourceSeparators, rowCertificates) {
  const rowsBySeparator = new Map();
  for (const row of rowCertificates) {
    if (!rowsBySeparator.has(row.separator_event)) {
      rowsBySeparator.set(row.separator_event, []);
    }
    rowsBySeparator.get(row.separator_event).push(row);
  }
  return sourceSeparators
    .map((separator) => {
      const rows = rowsBySeparator.get(separator.separator_event) ?? [];
      return {
        separator_event: separator.separator_event,
        fold_interval: separator.fold_interval,
        row_count: rows.length,
        row_ids: rows.map((row) => row.row_id),
        selected_route_candidate: separator.selected_route_candidate,
        mollifier_route_declared: separator.mollifier_route_declared,
        M_delta_interval_certified: separator.M_delta_interval_certified,
        delta_eta_sup_norm_interval_certified: separator.delta_eta_sup_norm_interval_certified,
        Gamma_g_coupling_certified: rows.length === separator.row_count && rows.every((row) => row.Gamma_g_coupling_certified),
        Gamma_interval_exact: ["1", "1"],
        accepted_row_projection_source_slice_coverage_certificates: 0,
        dual_mollified_row_integrand_interval_enclosures: 0,
        direct_quadrature_I_fold_B_rows: 0,
        row_impulse_enclosures: 0,
        separator_aggregate_C_Sigma_present: false,
        separator_aggregate_A_Sigma_eta_epsilon_c_present: false,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        first_source_packet_blocker: FIRST_COVERAGE_BLOCKER,
        first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
        first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const rows = inputs.mDeltaCertificate.row_mollifier_m_delta_certificates.map(rowCouplingCertificate);
  const separators = separatorCouplingCertificates(
    inputs.mDeltaCertificate.separator_mollifier_m_delta_certificates,
    rows,
  );
  const rowFields = [
    "mollifier_route_declared",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "accepted_row_projection_source_slice_coverage_certificate",
    "dual_mollified_row_integrand_interval_enclosure",
    "direct_quadrature_I_fold_B_present",
    "row_acceleration_enclosure_A_B_present",
    "row_impulse_enclosure",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_bound",
  ];
  const separatorFields = [
    "mollifier_route_declared",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  ];

  const summary = {
    separator_mollifier_coupling_certificates: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rows, (row) => row.separator_event)),
    selected_route_candidate: SELECTED_ROUTE,
    prior_source_packet_blocker: PRIOR_BLOCKER,
    M_delta_interval_certified: true,
    M_delta_interval_exact: inputs.mDeltaCertificate.summary.M_delta_interval_exact,
    delta_eta_sup_norm_interval_certified: true,
    delta_eta_sup_norm_exact: inputs.mDeltaCertificate.summary.delta_eta_sup_norm_exact,
    Gamma_g_coupling_certified: true,
    Gamma_interval_exact: ["1", "1"],
    packet_g_exact: "1",
    separators_with_M_delta_interval_certified: countTrue(separators, (separator) => separator.M_delta_interval_certified),
    rows_with_M_delta_interval_certified: countTrue(rows, (row) => row.M_delta_interval_certified),
    separators_with_Gamma_g_coupling_certified: countTrue(separators, (separator) => separator.Gamma_g_coupling_certified),
    rows_with_Gamma_g_coupling_certified: countTrue(rows, (row) => row.Gamma_g_coupling_certified),
    rows_with_accepted_row_projection_source_slice_coverage_certificate: 0,
    rows_with_dual_mollified_row_integrand_interval_enclosure: 0,
    rows_with_direct_quadrature_I_fold_B: 0,
    rows_with_row_impulse_enclosure: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    first_source_packet_blocker: FIRST_COVERAGE_BLOCKER,
    first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    separator_field_presence_counts: presenceCounts(separators, separatorFields),
    row_field_presence_counts: presenceCounts(rows, rowFields),
    packet_parameters: inputs.phi.common_identity.P,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-mollifier-coupling-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet mollifier coupling certificate attempt; carries the M_delta certificate and certifies the fresh-v10 packet convention Gamma=g=1 while proving no accepted row coverage certificate, no row enclosure, no accepted source packet, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_mollifier_m_delta_certificate_attempt: artifactRecord(paths.mDeltaCertificate),
      same_packet_phi_cyc: artifactRecord(paths.phi),
      same_packet_mesh: artifactRecord(paths.mesh),
      fold_mollifier_coupling_audit: artifactRecord(paths.couplingAudit),
      fold_interval_constants_contract: artifactRecord(paths.contract),
    },
    packet_identity_check: {
      packet_id: PACKET_ID,
      phi_common_identity: inputs.phi.common_identity,
      mesh_common_identity: inputs.mesh.common_identity,
      same_packet_identity_match: inputs.phi.common_identity?.K === inputs.mesh.common_identity?.K,
      lambda_source_note:
        "The route consumes the non-lambda0305 same-packet phi_cyc and mesh artifacts referenced by the route-declaration attempt; lambda0305 is only the proof-interval replay suffix for this handoff.",
    },
    coupling_certificate: {
      Gamma_g_coupling_certified: true,
      Gamma_interval_exact: ["1", "1"],
      packet_g_exact: "1",
      convention: "Gamma is identified with the fresh packet's reduced coupling parameter g, and the same-packet phi_cyc and mesh artifacts both set g=1.",
      accepted_as_full_constants_artifact: false,
    },
    separator_mollifier_coupling_certificates: separators,
    row_mollifier_coupling_certificates: rows,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_COVERAGE_BLOCKER,
      first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
      first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
      mechanical_continuation:
        "prove accepted row projection/source-slice coverage for the candidate full input-screen rectangles, then produce row acceleration/impulse or direct-quadrature enclosures before separator aggregation",
      final_certificate_target:
        "accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet feeding the higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "if row projection/source-slice coverage cannot be certified from same-packet interval evidence, the lane reaches a proof-rule or primitive-acceptance decision before source-packet acceptance or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat the coupling certificate as an accepted row coverage certificate.",
        "Do not treat candidate E_B and S_B(t) definitions as accepted support coverage.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this constants certificate.",
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
      "Priority-only. This artifact reduces the source-packet checklist from Gamma/g coupling absent to row projection/source-slice coverage absent while preserving fail-closed row and ledger state.",
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

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.M_delta_interval_certified} | ${separator.Gamma_g_coupling_certified} | ${separator.accepted_row_projection_source_slice_coverage_certificates} | ${separator.row_impulse_enclosures} | \`${separator.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Same-Packet Mollifier Coupling Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The prior \`M_delta\` certificate attempt stopped at
\`${attempt.summary.prior_source_packet_blocker}\`. This artifact carries the
certified \`M_delta=15/16\` and \`delta_eta_sup_norm=375/8\` values forward and
certifies \`Gamma=g=1\` for the fresh-v10 packet convention.

The certificate is present for ${attempt.summary.separators_with_Gamma_g_coupling_certified} /
${attempt.summary.separator_mollifier_coupling_certificates} separator layers and
${attempt.summary.rows_with_Gamma_g_coupling_certified} /
${attempt.summary.fold_layer_rows} fold-layer rows.

This is not a row coverage or row enclosure artifact. It records 0 accepted row
projection/source-slice coverage certificates, 0 row enclosures, 0 accepted
source packets, 0 row consumptions, \`preledger_pass=false\`, no live-ledger
update, and no branch-chart authorization.

The first source-packet blocker after this artifact is
\`${attempt.summary.first_source_packet_blocker}\`. The first numerical
enclosure blocker remains
\`${attempt.summary.first_numerical_enclosure_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Coupling Certificate

| Field | Value |
| --- | --- |
| Gamma/g certified | ${attempt.coupling_certificate.Gamma_g_coupling_certified} |
| Gamma interval exact | \`${attempt.coupling_certificate.Gamma_interval_exact.join("..")}\` |
| packet g exact | \`${attempt.coupling_certificate.packet_g_exact}\` |
| full constants artifact | ${attempt.coupling_certificate.accepted_as_full_constants_artifact} |

## Separator Certificates

| Separator | Fold interval | Rows | M_delta certified | Gamma/g certified | Accepted coverage certs | Row impulse enclosures | First source-packet blocker |
| --- | --- | ---: | --- | --- | ---: | ---: | --- |
${separatorTable(attempt.separator_mollifier_coupling_certificates)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.row_field_presence_counts)}

## Certificate-Side Handoff

First source-packet blocker:
\`${attempt.next_certificate_handoff.first_source_packet_blocker}\`.

First numerical enclosure blocker:
\`${attempt.next_certificate_handoff.first_numerical_enclosure_blocker}\`.

Mechanical continuation: ${attempt.next_certificate_handoff.mechanical_continuation}.

Decision boundary: ${attempt.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false
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
    mDeltaCertificate: args.mDeltaCertificate,
    phi: args.phi,
    mesh: args.mesh,
    couplingAudit: args.couplingAudit,
    contract: args.contract,
  };
  const inputs = {
    mDeltaCertificate: readJson(paths.mDeltaCertificate),
    phi: readJson(paths.phi),
    mesh: readJson(paths.mesh),
    couplingText: readText(paths.couplingAudit),
    contractText: readText(paths.contract),
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
