#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_PACKET_ATTEMPT = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_direct_quadrature_source_packet_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_FALLBACK_LEGALITY = `${CERT_DIR}/fold_full_interval_fallback_legality.md`;
const DEFAULT_MOLLIFIER_KERNEL = `${CERT_DIR}/fold_mollifier_kernel_candidate.md`;
const DEFAULT_COUPLING_AUDIT = `${CERT_DIR}/fold_mollifier_coupling_audit.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_impulse_route_declaration_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_impulse_route_declaration_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_same_packet_impulse_route_declaration_attempt_fail_closed_mollifier_norm_full_rectangle_fallback_declared_M_delta_Gamma_enclosures_absent_no_row_consumption";
const SELECTED_ROUTE = "mollifier_norm_full_input_screen_rectangle_fallback";
const REJECTED_ROUTE = "direct_quadrature_route_not_declared_without_interval_quadrature_enclosures";
const PRIOR_BLOCKER = "mollifier_or_direct_quadrature_route_declaration_absent";
const FIRST_SOURCE_PACKET_BLOCKER = "M_delta_interval_certified_absent";
const FIRST_COUPLING_BLOCKER = "Gamma_g_coupling_certified_absent";
const FIRST_COVERAGE_BLOCKER = "row_projection_source_slice_coverage_certificate_absent";
const FIRST_NUMERICAL_ENCLOSURE_BLOCKER = "dual_mollified_row_integrand_interval_enclosure_absent";

function parseArgs(argv) {
  const args = {
    sourcePacketAttempt: DEFAULT_SOURCE_PACKET_ATTEMPT,
    phi: DEFAULT_PHI,
    mesh: DEFAULT_MESH,
    contract: DEFAULT_CONTRACT,
    fallbackLegality: DEFAULT_FALLBACK_LEGALITY,
    mollifierKernel: DEFAULT_MOLLIFIER_KERNEL,
    couplingAudit: DEFAULT_COUPLING_AUDIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-packet-attempt") {
      args.sourcePacketAttempt = argv[++index];
    } else if (arg === "--phi") {
      args.phi = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--fallback-legality") {
      args.fallbackLegality = argv[++index];
    } else if (arg === "--mollifier-kernel") {
      args.mollifierKernel = argv[++index];
    } else if (arg === "--coupling-audit") {
      args.couplingAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-impulse-route-declaration-attempt.mjs [options]

Options:
  --source-packet-attempt PATH  Same-packet impulse/direct-quadrature source-packet attempt. Defaults to ${DEFAULT_SOURCE_PACKET_ATTEMPT}.
  --phi PATH                    Same-packet phi_cyc candidate. Defaults to ${DEFAULT_PHI}.
  --mesh PATH                   Same-packet mesh. Defaults to ${DEFAULT_MESH}.
  --contract PATH               Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --fallback-legality PATH      Full-interval fallback legality note. Defaults to ${DEFAULT_FALLBACK_LEGALITY}.
  --mollifier-kernel PATH       Mollifier kernel candidate note. Defaults to ${DEFAULT_MOLLIFIER_KERNEL}.
  --coupling-audit PATH         Coupling audit note. Defaults to ${DEFAULT_COUPLING_AUDIT}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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

function validateNoLedgerUpdateArtifact(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`Refusing ${name}: preledger/live-ledger lock drifted.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
    throw new Error(`Refusing ${name}: branch-chart lock drifted.`);
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
      return [
        field,
        {
          present,
          missing: rows.length - present,
        },
      ];
    }),
  );
}

function markdownContainsAll(text, needles, name) {
  const missing = needles.filter((needle) => !text.includes(needle));
  if (missing.length > 0) {
    throw new Error(`${name} is missing expected route evidence: ${missing.join(", ")}`);
  }
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourcePacketAttempt, "sourcePacketAttempt");
  assertPacketId(inputs.phi, "phi");
  assertPacketId(inputs.mesh, "mesh");
  validateNoLedgerUpdateArtifact(inputs.sourcePacketAttempt, "sourcePacketAttempt");
  validateNoLedgerUpdateArtifact(inputs.mesh, "mesh");

  if (inputs.sourcePacketAttempt.summary?.first_missing_source_packet_field !== PRIOR_BLOCKER) {
    throw new Error("Source-packet attempt no longer stops at the route-declaration blocker.");
  }
  if (inputs.sourcePacketAttempt.summary?.rows_with_full_rectangle_interval_sources !== 112) {
    throw new Error("Expected 112 rows with full rectangle interval sources.");
  }
  if (inputs.sourcePacketAttempt.summary?.rows_with_row_projection_source_slice_candidates !== 112) {
    throw new Error("Expected 112 row projection/source-slice candidates.");
  }
  if (inputs.sourcePacketAttempt.summary?.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets !== 0) {
    throw new Error("Source-packet attempt unexpectedly accepts a source packet.");
  }

  const p = inputs.phi.common_identity?.P;
  if (p?.c_f !== 1 || p?.eta !== 0.02 || p?.epsilon_c !== 0.05 || p?.g !== 1) {
    throw new Error("Fresh higher-fold packet parameters no longer match the fold route constants.");
  }
  if (inputs.mesh.common_identity?.P?.g !== 1 || inputs.mesh.common_identity?.P?.eta !== 0.02) {
    throw new Error("Mesh packet parameters no longer match the fold route constants.");
  }

  markdownContainsAll(
    inputs.contractText,
    ["Mollifier-norm route", "Direct quadrature route", "Row-tube projections and source slices"],
    "fold_interval_constants_contract.md",
  );
  markdownContainsAll(
    inputs.fallbackText,
    ["full-interval fallback", "mollifier-norm sup-bound route", "not direct quadrature"],
    "fold_full_interval_fallback_legality.md",
  );
  markdownContainsAll(
    inputs.mollifierText,
    ["M_\\delta=\\frac{15}{16}", "\\|\\delta_\\eta\\|_\\infty", "46.875"],
    "fold_mollifier_kernel_candidate.md",
  );
  markdownContainsAll(
    inputs.couplingText,
    ["g=1.0=\\Gamma=\\kappa\\epsilon^2", "not by itself an accepted interval constant"],
    "fold_mollifier_coupling_audit.md",
  );
}

function rowRouteDeclaration(row) {
  return {
    row_id: row.row_id,
    ledger: row.ledger,
    status: row.status,
    failure_code: row.failure_code,
    separator_event: row.separator_event,
    fold_interval: row.fold_interval,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    selected_route_candidate: SELECTED_ROUTE,
    direct_quadrature_route_declared: false,
    direct_quadrature_route_rejection: REJECTED_ROUTE,
    mollifier_route_declared: true,
    route_declaration_is_accepted: false,
    candidate_E_B: row.candidate_row_projection,
    candidate_S_B_t: row.candidate_source_slice,
    candidate_L_r_B: row.receiver_t_width_decimal,
    candidate_L_s_B: row.source_t_width_decimal,
    candidate_full_rectangle_coverage_source_present: row.full_rectangle_interval_sources_present === true,
    M_delta_interval_certified: false,
    Gamma_g_coupling_certified: false,
    accepted_row_projection_source_slice_coverage_certificate: false,
    dual_mollified_row_integrand_interval_enclosure: false,
    direct_quadrature_I_fold_B_present: false,
    row_acceleration_enclosure_A_B_present: false,
    row_impulse_enclosure: false,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    first_coupling_blocker: FIRST_COUPLING_BLOCKER,
    first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function separatorRouteDeclarations(sourceSeparators, rowDeclarations) {
  const rowsBySeparator = new Map();
  for (const row of rowDeclarations) {
    if (!rowsBySeparator.has(row.separator_event)) {
      rowsBySeparator.set(row.separator_event, []);
    }
    rowsBySeparator.get(row.separator_event).push(row);
  }

  return [...sourceSeparators]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((separator) => {
      const rows = rowsBySeparator.get(separator.separator_event) ?? [];
      return {
        separator_event: separator.separator_event,
        fold_interval: separator.fold_interval,
        row_count: rows.length,
        row_ids: rows.map((row) => row.row_id),
        selected_route_candidate: SELECTED_ROUTE,
        mollifier_route_declared: rows.length === separator.row_count && rows.every((row) => row.mollifier_route_declared),
        direct_quadrature_route_declared: false,
        direct_quadrature_route_rejection: REJECTED_ROUTE,
        route_declaration_is_accepted: false,
        candidate_full_rectangle_coverage_rows: countTrue(
          rows,
          (row) => row.candidate_full_rectangle_coverage_source_present,
        ),
        candidate_E_B_rows: countTrue(rows, (row) => row.candidate_E_B != null),
        candidate_S_B_t_rows: countTrue(rows, (row) => row.candidate_S_B_t != null),
        candidate_L_r_B_rows: countTrue(rows, (row) => row.candidate_L_r_B != null),
        candidate_L_s_B_rows: countTrue(rows, (row) => row.candidate_L_s_B != null),
        M_delta_interval_certified: false,
        Gamma_g_coupling_certified: false,
        accepted_row_projection_source_slice_coverage_certificates: 0,
        dual_mollified_row_integrand_interval_enclosures: 0,
        direct_quadrature_I_fold_B_rows: 0,
        row_impulse_enclosures: 0,
        separator_aggregate_C_Sigma_present: false,
        separator_aggregate_A_Sigma_eta_epsilon_c_present: false,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
        first_coupling_blocker: FIRST_COUPLING_BLOCKER,
        first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
        first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const rowDeclarations = [...inputs.sourcePacketAttempt.row_source_packet_attempts]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map(rowRouteDeclaration);
  const separatorDeclarations = separatorRouteDeclarations(
    inputs.sourcePacketAttempt.separator_source_packet_attempts,
    rowDeclarations,
  );
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowDeclarations, (row) => row.separator_event));
  const rowFields = [
    "mollifier_route_declared",
    "direct_quadrature_route_declared",
    "route_declaration_is_accepted",
    "candidate_full_rectangle_coverage_source_present",
    "M_delta_interval_certified",
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
    "direct_quadrature_route_declared",
    "route_declaration_is_accepted",
    "M_delta_interval_certified",
    "Gamma_g_coupling_certified",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  ];

  const summary = {
    separator_route_declarations: separatorDeclarations.length,
    fold_layer_rows: rowDeclarations.length,
    rows_by_separator_count: rowsBySeparatorCount,
    selected_route_candidate: SELECTED_ROUTE,
    direct_quadrature_route_rejection: REJECTED_ROUTE,
    separators_with_mollifier_route_declared: countTrue(
      separatorDeclarations,
      (separator) => separator.mollifier_route_declared,
    ),
    rows_with_mollifier_route_declared: countTrue(rowDeclarations, (row) => row.mollifier_route_declared),
    rows_with_candidate_E_B: countTrue(rowDeclarations, (row) => row.candidate_E_B != null),
    rows_with_candidate_S_B_t: countTrue(rowDeclarations, (row) => row.candidate_S_B_t != null),
    rows_with_candidate_L_r_B: countTrue(rowDeclarations, (row) => row.candidate_L_r_B != null),
    rows_with_candidate_L_s_B: countTrue(rowDeclarations, (row) => row.candidate_L_s_B != null),
    accepted_route_declarations: 0,
    separators_with_M_delta_interval_certified: 0,
    separators_with_Gamma_g_coupling_certified: 0,
    rows_with_accepted_row_projection_source_slice_coverage_certificate: 0,
    rows_with_dual_mollified_row_integrand_interval_enclosure: 0,
    rows_with_direct_quadrature_I_fold_B: 0,
    rows_with_row_impulse_enclosure: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    first_prior_blocker: PRIOR_BLOCKER,
    first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    first_coupling_blocker: FIRST_COUPLING_BLOCKER,
    first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    separator_route_field_presence_counts: presenceCounts(separatorDeclarations, separatorFields),
    row_route_field_presence_counts: presenceCounts(rowDeclarations, rowFields),
    packet_parameters: inputs.phi.common_identity.P,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-impulse-route-declaration-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only route-declaration attempt for the same-packet fold impulse source packet; declares the mollifier-norm full input-screen rectangle fallback as the candidate route for 12 higher-fold separator layers and 112 fold-layer rows while proving no accepted route declaration, no same-packet M_delta certificate, no Gamma/g coupling certificate, no coverage certificate, no row enclosure, no accepted source packet, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_impulse_direct_quadrature_source_packet_attempt: artifactRecord(paths.sourcePacketAttempt),
      same_packet_phi_cyc: artifactRecord(paths.phi),
      same_packet_mesh: artifactRecord(paths.mesh),
      fold_interval_constants_contract: artifactRecord(paths.contract),
      fold_full_interval_fallback_legality: artifactRecord(paths.fallbackLegality),
      fold_mollifier_kernel_candidate: artifactRecord(paths.mollifierKernel),
      fold_mollifier_coupling_audit: artifactRecord(paths.couplingAudit),
    },
    route_declaration_rule:
      "The fold interval constants contract permits either a mollifier-norm route or a direct quadrature route. Because the current source-packet attempt has same-packet full input-screen row rectangles for all 112 rows but no interval quadrature enclosures, this artifact declares only the mollifier-norm full input-screen rectangle fallback as a candidate route. The declaration is not an accepted constants artifact.",
    selected_route_candidate: {
      route_id: SELECTED_ROUTE,
      status: "candidate_route_declared_not_accepted",
      packet_parameters: inputs.phi.common_identity.P,
      row_projection_rule: "candidate E_B is the full input-screen receiver interval for the row",
      source_slice_rule: "candidate S_B(t) is the full input-screen source interval for every receiver t in the row",
      accepted_as_constants_artifact: false,
      accepted_as_source_packet: false,
    },
    rejected_route_candidate: {
      route_id: "direct_quadrature",
      status: REJECTED_ROUTE,
      accepted_as_constants_artifact: false,
      accepted_as_source_packet: false,
    },
    separator_route_declarations: separatorDeclarations,
    row_route_declarations: rowDeclarations,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
      first_coupling_blocker: FIRST_COUPLING_BLOCKER,
      first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
      first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
      mechanical_continuation:
        "bind an interval-certified M_delta and Gamma/g coupling certificate to the fresh-v10 higher-fold packet identity, then prove accepted row projection/source-slice coverage for the candidate full input-screen rectangles and produce row acceleration or impulse enclosures before separator aggregation",
      final_certificate_target:
        "accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet feeding the higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "if the mollifier kernel norm or Gamma/g coupling cannot be certified under the fresh-v10 higher-fold packet identity, the route reaches a proof-rule or primitive-acceptance decision before source-packet acceptance or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat the candidate route declaration as an accepted constants artifact.",
        "Do not import old-packet M_delta or Gamma/g evidence as same-packet accepted higher-fold data.",
        "Do not treat candidate E_B and S_B(t) definitions as accepted coverage certificates.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this route declaration.",
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
      "Priority-only. This artifact reduces the first source-packet checklist blocker from absent route declaration to absent same-packet M_delta and Gamma/g certification while preserving fail-closed row and ledger state.",
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

function separatorTable(profiles) {
  return profiles
    .map(
      (profile) =>
        `| \`${profile.separator_event}\` | \`${profile.fold_interval}\` | ${profile.row_count} | ${profile.mollifier_route_declared} | ${profile.candidate_E_B_rows} | ${profile.candidate_S_B_t_rows} | ${profile.candidate_L_r_B_rows} | ${profile.candidate_L_s_B_rows} | ${profile.M_delta_interval_certified} | ${profile.Gamma_g_coupling_certified} | ${profile.accepted_row_projection_source_slice_coverage_certificates} | \`${profile.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Same-Packet Impulse Route Declaration Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The prior source-packet attempt stopped at
\`${attempt.summary.first_prior_blocker}\`. This route-declaration attempt
declares \`${attempt.summary.selected_route_candidate}\` as the candidate route
for ${attempt.summary.separators_with_mollifier_route_declared} / ${attempt.summary.separator_route_declarations}
separator layers and ${attempt.summary.rows_with_mollifier_route_declared} /
${attempt.summary.fold_layer_rows} fold-layer rows.

For every row, the candidate route binds:

- \`E_B\`: full input-screen receiver interval;
- \`S_B(t)\`: full input-screen source interval for every receiver \`t\`;
- \`L_r_B\`: candidate receiver time width;
- \`L_s_B\`: candidate source time width.

This is a route declaration only. It records 0 accepted route declarations,
0 same-packet \`M_delta\` certificates, 0 same-packet \`Gamma/g\` coupling
certificates, 0 accepted row projection/source-slice coverage certificates, 0
row enclosures, 0 accepted source packets, 0 row consumptions,
\`preledger_pass=false\`, no live-ledger update, and no branch-chart
authorization.

The first source-packet blocker after route declaration is
\`${attempt.summary.first_source_packet_blocker}\`. The first coupling blocker
is \`${attempt.summary.first_coupling_blocker}\`, the first coverage blocker is
\`${attempt.summary.first_coverage_blocker}\`, and the first numerical
enclosure blocker is
\`${attempt.summary.first_numerical_enclosure_blocker}\`.

The direct quadrature route remains undeclared because no direct interval
quadrature row enclosures are present.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Separator Route Declarations

| Separator | Fold interval | Rows | Mollifier route declared | Candidate E_B rows | Candidate S_B(t) rows | Candidate L_r_B rows | Candidate L_s_B rows | M_delta certified | Gamma/g certified | Accepted coverage certs | First source-packet blocker |
| --- | --- | ---: | --- | ---: | ---: | ---: | ---: | --- | --- | ---: | --- |
${separatorTable(attempt.separator_route_declarations)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.separator_route_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.row_route_field_presence_counts)}

## Certificate-Side Handoff

First source-packet blocker:
\`${attempt.next_certificate_handoff.first_source_packet_blocker}\`.

First coupling blocker:
\`${attempt.next_certificate_handoff.first_coupling_blocker}\`.

First coverage blocker:
\`${attempt.next_certificate_handoff.first_coverage_blocker}\`.

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

This artifact is priority-only route scaffolding. It proves no accepted
\`same_packet_fold_impulse_or_direct_quadrature_bound\`, no
\`higher_fold_separator_layer_certificate\`, no row consumption, no live-ledger
update, and no branch-chart authorization.
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
    sourcePacketAttempt: args.sourcePacketAttempt,
    phi: args.phi,
    mesh: args.mesh,
    contract: args.contract,
    fallbackLegality: args.fallbackLegality,
    mollifierKernel: args.mollifierKernel,
    couplingAudit: args.couplingAudit,
  };
  const inputs = {
    sourcePacketAttempt: readJson(paths.sourcePacketAttempt),
    phi: readJson(paths.phi),
    mesh: readJson(paths.mesh),
    contractText: readText(paths.contract),
    fallbackText: readText(paths.fallbackLegality),
    mollifierText: readText(paths.mollifierKernel),
    couplingText: readText(paths.couplingAudit),
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
