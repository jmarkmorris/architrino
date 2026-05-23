#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-topology-no-double-counting-no-go-v10`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v10`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OUT_DIR = CERT_DIR;

const DEFAULT_V9_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v9.json`;
const DEFAULT_V9_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v9.json`;
const DEFAULT_V9_AUDIT = `${CERT_DIR}/preledger_interval_engine_audit.${PACKET_ID}.proof-interval-v9.json`;
const DEFAULT_V9_REPORT = `${CERT_DIR}/causal_preledger_interval_report.${PACKET_ID}.proof-interval-v9.md`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_SEED_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;

const POLICY_SOURCE_DEFAULTS = {
  parent_complement_contract: `${CERT_DIR}/fold_parent_boundary_complement_packet.md`,
  regular_boundary_contract_probe: `${CERT_DIR}/fold_parent_regular_boundary_contract_probe.md`,
  regular_boundary_coverage_attempt: `${CERT_DIR}/fold_parent_regular_boundary_coverage_attempt.md`,
  fresh_seed_contract: `${CERT_DIR}/fresh_same_packet_fold_shear_seed_contract.md`,
};

const REGULAR_BOUNDARY_REQUIRED_FIELDS = [
  "finite_regular_boundary_family_definition",
  "residual_core_table",
  "exact_single_separator_assignment",
  "same_packet_inclusion_proof",
  "domination_inequality_or_enlarged_same_packet_ceiling",
  "topology_and_no_double_counting",
  "non_core_complement_closure",
];

const TOPOLOGY_METHODS = [
  {
    method_id: "explicit_topology_no_double_counting_field",
    description:
      "Accept only an explicit topology_and_no_double_counting certificate on the imported residual regular-boundary core.",
  },
  {
    method_id: "complement_boundary_topology_convention",
    description:
      "Check whether an accepted complement-boundary ownership convention applies to the residual regular-boundary core.",
  },
  {
    method_id: "simple_root_branch_reuse_exclusion",
    description:
      "Check whether the core is proved outside the strict simple-root branch sum already accepted for the parent subrow.",
  },
  {
    method_id: "endpoint_excluded_complement_disjointness",
    description:
      "Check whether endpoint-excluded complement ownership with root-count bound $[0,0]$ applies to this core.",
  },
  {
    method_id: "fold_layer_row_nonexpansion",
    description:
      "Check whether regular-boundary coverage avoids silently expanding accepted fold-layer row rectangles.",
  },
];

function parseArgs(argv) {
  const args = {
    v9Ledger: DEFAULT_V9_LEDGER,
    v9Backend: DEFAULT_V9_BACKEND,
    v9Audit: DEFAULT_V9_AUDIT,
    v9Report: DEFAULT_V9_REPORT,
    inputScreen: DEFAULT_INPUT_SCREEN,
    mesh: DEFAULT_MESH,
    seedContract: DEFAULT_SEED_CONTRACT,
    outDir: DEFAULT_OUT_DIR,
    policySources: { ...POLICY_SOURCE_DEFAULTS },
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--v9-ledger") {
      args.v9Ledger = argv[++i];
    } else if (arg === "--v9-backend") {
      args.v9Backend = argv[++i];
    } else if (arg === "--v9-audit") {
      args.v9Audit = argv[++i];
    } else if (arg === "--v9-report") {
      args.v9Report = argv[++i];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++i];
    } else if (arg === "--mesh") {
      args.mesh = argv[++i];
    } else if (arg === "--seed-contract") {
      args.seedContract = argv[++i];
    } else if (arg === "--parent-complement-contract") {
      args.policySources.parent_complement_contract = argv[++i];
    } else if (arg === "--regular-boundary-contract-probe") {
      args.policySources.regular_boundary_contract_probe = argv[++i];
    } else if (arg === "--regular-boundary-coverage-attempt") {
      args.policySources.regular_boundary_coverage_attempt = argv[++i];
    } else if (arg === "--fresh-seed-contract") {
      args.policySources.fresh_seed_contract = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v10.mjs [options]

Options:
  --v9-ledger PATH                         Proof-interval-v9 sidecar ledger JSON. Defaults to ${DEFAULT_V9_LEDGER}.
  --v9-backend PATH                        Proof-interval-v9 backend certificate JSON. Defaults to ${DEFAULT_V9_BACKEND}.
  --v9-audit PATH                          Proof-interval-v9 engine audit JSON. Defaults to ${DEFAULT_V9_AUDIT}.
  --v9-report PATH                         Proof-interval-v9 report markdown. Defaults to ${DEFAULT_V9_REPORT}.
  --input-screen PATH                      Fresh input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --mesh PATH                              Fresh mesh JSON. Defaults to ${DEFAULT_MESH}.
  --seed-contract PATH                     Fresh seed contract JSON. Defaults to ${DEFAULT_SEED_CONTRACT}.
  --parent-complement-contract PATH        Parent-complement policy source.
  --regular-boundary-contract-probe PATH   Regular-boundary contract source.
  --regular-boundary-coverage-attempt PATH Regular-boundary coverage source.
  --fresh-seed-contract PATH               Fresh seed contract markdown source.
  --out-dir PATH                           Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                 Pretty-print JSON artifacts.
  --help                                   Show this help.`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function readTextArtifact(filePath) {
  const resolved = path.resolve(filePath);
  const raw = fs.readFileSync(resolved, "utf8");
  return {
    path: resolved,
    basename: path.basename(resolved),
    sha256: sha256(raw),
    bytes: Buffer.byteLength(raw),
    text: raw,
  };
}

function readJsonArtifact(filePath) {
  const source = readTextArtifact(filePath);
  return {
    ...source,
    data: JSON.parse(source.text),
  };
}

function assertNoBigInt(value, label) {
  const stack = [value];
  while (stack.length) {
    const next = stack.pop();
    if (typeof next === "bigint") {
      throw new Error(`BigInt leaked into JSON artifact ${label}`);
    }
    if (next && typeof next === "object") {
      for (const child of Object.values(next)) {
        stack.push(child);
      }
    }
  }
}

function writeJson(filePath, value, pretty) {
  assertNoBigInt(value, filePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function artifactRecord(source) {
  return {
    path: source.basename,
    sha256: source.sha256,
    bytes: source.bytes,
  };
}

function sourceArtifacts(sources) {
  const policy = {};
  for (const [name, source] of Object.entries(sources.policySources)) {
    policy[name] = artifactRecord(source);
  }
  return {
    proof_interval_v9_ledger: artifactRecord(sources.v9Source),
    proof_interval_v9_backend_certificate: artifactRecord(sources.v9BackendSource),
    proof_interval_v9_engine_audit: artifactRecord(sources.v9AuditSource),
    proof_interval_v9_report: artifactRecord(sources.v9ReportSource),
    fresh_input_screen: artifactRecord(sources.inputScreenSource),
    fresh_mesh: artifactRecord(sources.meshSource),
    fresh_seed_contract: artifactRecord(sources.seedContractSource),
    policy,
  };
}

function countBy(rows, field) {
  const result = {};
  for (const row of rows) {
    const key = row[field] || "none";
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function countCodes(rows, field) {
  const result = {};
  for (const row of rows) {
    for (const code of row[field] ?? []) {
      result[code] = (result[code] ?? 0) + 1;
    }
  }
  return result;
}

function assertImportedV9(v9Ledger) {
  if (v9Ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v9") {
    throw new Error("Proof-interval-v9 ledger schema mismatch.");
  }
  if (v9Ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected v9 packet_id ${PACKET_ID}.`);
  }
  if (v9Ledger.preledger_pass || v9Ledger.updates_live_ledger || v9Ledger.branch_chart_authorized) {
    throw new Error("Imported v9 unexpectedly authorizes a live preledger or branch chart.");
  }
  if (v9Ledger.summary?.regular_boundary_candidate_cores_imported_from_v8 !== 10) {
    throw new Error("Proof-interval-v9 is missing the expected 10 imported v8 candidate cores.");
  }
  if (v9Ledger.summary?.ambiguous_two_separator_cores !== 10) {
    throw new Error("Proof-interval-v9 is missing the expected 10 ambiguous two-separator cores.");
  }
  if (v9Ledger.summary?.topology_no_double_counting_certified !== 0) {
    throw new Error("Proof-interval-v9 unexpectedly certifies topology/no-double-counting.");
  }
  if (v9Ledger.summary?.accepted_parent_complement_strips_by_v9 !== 0) {
    throw new Error("Proof-interval-v9 unexpectedly accepts parent-complement strips.");
  }
  if (!Array.isArray(v9Ledger.regular_boundary_candidate_core_table_v9)) {
    throw new Error("Proof-interval-v9 is missing regular_boundary_candidate_core_table_v9.");
  }
  if (v9Ledger.regular_boundary_candidate_core_table_v9.length !== 10) {
    throw new Error("Proof-interval-v9 core table length changed from 10.");
  }
  if (!Array.isArray(v9Ledger.parent_complement_strips_v9) || v9Ledger.parent_complement_strips_v9.length !== 10) {
    throw new Error("Proof-interval-v9 is missing the expected 10 parent-complement strips.");
  }
}

function assertFreshPacketSources(sources) {
  for (const [name, source] of [
    ["input screen", sources.inputScreenSource],
    ["mesh", sources.meshSource],
    ["seed contract", sources.seedContractSource],
  ]) {
    if (source.data.packet_id !== PACKET_ID) {
      throw new Error(`Expected ${name} packet_id ${PACKET_ID}.`);
    }
  }
}

function acceptedTopologyPaths(value, artifactName, limit = 80) {
  const rows = [];
  const visit = (node, parts) => {
    if (rows.length >= limit) {
      return;
    }
    if (!node || typeof node !== "object") {
      const pathText = parts.join(".");
      if (
        /(topology|ownership|owner|double_counting)/i.test(pathText) &&
        (node === true || node === "accepted" || node === "certified")
      ) {
        rows.push({ artifact: artifactName, path: pathText, value: node });
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, index) => visit(child, [...parts, String(index)]));
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      visit(child, [...parts, key]);
    }
  };
  visit(value, []);
  return rows;
}

function topologyMethodResultsForCore(core, strip) {
  const explicitTopology =
    core.topology_and_no_double_counting_certified === true &&
    core.required_fields_present?.topology_and_no_double_counting === true;
  const complementBoundaryOwned =
    strip?.endpoint_ownership_certified === true ||
    strip?.same_packet_endpoint_table?.required_fields_present?.complement_boundary_topology_ownership === true ||
    strip?.probes?.endpoint_topology_owned?.required_fields_present?.complement_boundary_topology_ownership === true;
  const endpointAlternativeAccepted =
    strip?.same_packet_endpoint_table?.accepted === true ||
    strip?.probes?.endpoint_topology_owned?.accepted === true;
  const foldFamilyAccepted =
    strip?.same_packet_fold_family_membership?.accepted === true ||
    strip?.probes?.exact_fold_family_covered?.accepted === true;

  return [
    {
      method_id: "explicit_topology_no_double_counting_field",
      certified: explicitTopology,
      status: explicitTopology ? "certified" : "rejected",
      failure_code: explicitTopology ? null : "topology_no_double_counting_no_explicit_field",
      evidence:
        "The imported v9 core has topology_and_no_double_counting_certified=false and required_fields_present.topology_and_no_double_counting=false.",
    },
    {
      method_id: "complement_boundary_topology_convention",
      certified: false,
      status: complementBoundaryOwned
        ? "rejected_endpoint_or_boundary_field_not_residual_core_certificate"
        : "rejected_no_residual_core_boundary_ownership",
      failure_code: "topology_no_double_counting_no_complement_boundary_ownership_for_residual_core",
      evidence:
        "Endpoint or complement-boundary ownership fields, when present, must apply to the residual regular-boundary core itself; current strips do not provide such ownership.",
    },
    {
      method_id: "simple_root_branch_reuse_exclusion",
      certified: false,
      status: "rejected_no_simple_root_reuse_exclusion",
      failure_code: "topology_no_double_counting_no_simple_root_branch_reuse_exclusion",
      evidence:
        "The accepted simple-root subrow is preserved, but no field proves that the residual regular-boundary core is excluded from the strict simple-root branch sum.",
    },
    {
      method_id: "endpoint_excluded_complement_disjointness",
      certified: false,
      status: endpointAlternativeAccepted
        ? "rejected_endpoint_exclusion_not_residual_core_certificate"
        : "rejected_endpoint_exclusion_absent_or_not_applicable",
      failure_code: "topology_no_double_counting_endpoint_exclusion_not_applicable",
      evidence:
        "Endpoint-excluded complement ownership with root-count bound $[0,0]$ is not an accepted certificate for these residual regular-boundary cores.",
    },
    {
      method_id: "fold_layer_row_nonexpansion",
      certified: false,
      status: foldFamilyAccepted
        ? "rejected_fold_membership_not_regular_boundary_no_double_counting_certificate"
        : "rejected_no_fold_layer_nonexpansion_certificate",
      failure_code: "topology_no_double_counting_no_fold_layer_nonexpansion_certificate",
      evidence:
        "No accepted same-packet fold-layer exact membership or finite regular-boundary theorem proves that adding the core avoids expanding fold-layer row rectangles.",
    },
  ];
}

function buildCoreRecord(core, strip, index) {
  const methodResults = topologyMethodResultsForCore(core, strip);
  const certifiedMethodResults = methodResults.filter((method) => method.certified);
  const failureCodes = [
    "topology_no_double_counting_no_explicit_field",
    "topology_no_double_counting_no_complement_boundary_ownership_for_residual_core",
    "topology_no_double_counting_no_simple_root_branch_reuse_exclusion",
    "topology_no_double_counting_endpoint_exclusion_not_applicable",
    "topology_no_double_counting_no_fold_layer_nonexpansion_certificate",
  ];

  return {
    core_id: core.core_id.replace("_v9_", "_v10_"),
    source_v9_core_id: core.core_id,
    source_v8_core_id: core.source_v8_core_id,
    source_v7_core_id: core.source_v7_core_id,
    source_v7_strip_id: core.source_v7_strip_id,
    source_v6_strip_id: core.source_v6_strip_id,
    parent_base_row_id: core.parent_base_row_id,
    simple_root_subrow_id: core.simple_root_subrow_id,
    ledger: core.ledger,
    side: core.side,
    receiver_interval: core.receiver_interval,
    source_interval: core.source_interval,
    receiver_theta_range: core.receiver_theta_range,
    source_theta_range: core.source_theta_range,
    candidate_separator_assignments: core.candidate_separator_assignments ?? [],
    candidate_separator_assignment_count: core.candidate_separator_assignment_count ?? 0,
    accepted_topology_no_double_counting_certificate: null,
    topology_and_no_double_counting_certified: false,
    topology_no_double_counting_certified_by_v10: false,
    topology_no_double_counting_no_go_v10: {
      status: "proved_for_current_packet_fields",
      theorem_target:
        "topology/no-double-counting ownership for this imported residual regular-boundary core",
      method_results: methodResults,
      certified_method_count: certifiedMethodResults.length,
      conclusion:
        "Current same-packet fields do not prove topology ownership or no-double-counting for this residual regular-boundary core; any acceptance would require a new ownership convention and branch-reuse exclusion certificate.",
    },
    finite_family_definition_status: core.finite_family_definition_status,
    same_packet_inclusion_status: core.same_packet_inclusion_status,
    accepted_regular_boundary_coverage_status: "not_accepted",
    exact_single_separator_assignment_certified: false,
    same_packet_inclusion_proof_certified: false,
    domination_inequality_certified: false,
    non_core_complement_closure_certified: false,
    regular_boundary_covered: false,
    required_fields: REGULAR_BOUNDARY_REQUIRED_FIELDS,
    required_fields_present: {
      finite_regular_boundary_family_definition: true,
      residual_core_table: true,
      exact_single_separator_assignment: false,
      same_packet_inclusion_proof: false,
      domination_inequality_or_enlarged_same_packet_ceiling: false,
      topology_and_no_double_counting: false,
      non_core_complement_closure: false,
    },
    imported_v9_failure_code: core.failure_code,
    imported_v9_failure_codes: core.failure_codes ?? [],
    failure_code: "regular_boundary_topology_no_double_counting_no_go_current_packet_fields",
    failure_codes: failureCodes,
    v10_index: index + 1,
  };
}

function buildParentSummaries(v9Ledger, strips) {
  return v9Ledger.parent_complement_summaries_v9.map((summary) => {
    const ownedStrips = strips.filter((strip) => strip.simple_root_subrow_id === summary.simple_root_subrow_id);
    return {
      parent_base_row_id: summary.parent_base_row_id,
      simple_root_subrow_id: summary.simple_root_subrow_id,
      source_v9_summary_status: summary.status,
      complement_strips: ownedStrips.map((strip) => strip.strip_id),
      complement_strip_count: ownedStrips.length,
      accepted_complement_strips: 0,
      split_required_complement_strips: ownedStrips.length,
      parent_consumed_by_v10: false,
      status: "parent_complements_split_required",
      blocker: "regular_boundary_topology_no_double_counting_no_go_current_packet_fields",
    };
  });
}

function enrichStrip(strip, coreRecord) {
  return {
    ...strip,
    strip_id: strip.strip_id.replace("_v9_", "_v10_"),
    source_v9_strip_id: strip.strip_id,
    refinement_id: REFINEMENT_ID,
    imported_v9_status: strip.status,
    imported_v9_failure_code: strip.failure_code,
    accepted_alternative: null,
    status: "split_required",
    v10_status: "split_required",
    v10_certificate_status: "regular_boundary_topology_no_double_counting_no_go_split_required",
    regular_boundary_topology_no_double_counting_no_go_v10: {
      status: "rejected",
      accepted: false,
      failure_code: coreRecord.failure_code,
      failure_codes: coreRecord.failure_codes,
      core_id: coreRecord.core_id,
      source_v9_core_id: coreRecord.source_v9_core_id,
      method_results: coreRecord.topology_no_double_counting_no_go_v10.method_results,
      conclusion: coreRecord.topology_no_double_counting_no_go_v10.conclusion,
    },
    probes: {
      ...strip.probes,
      regular_boundary_topology_no_double_counting_no_go_v10: {
        status: "rejected",
        accepted: false,
        failure_code: coreRecord.failure_code,
        failure_codes: coreRecord.failure_codes,
      },
    },
    coverage_certificate_ref: null,
    coverage_certificate_status: "absent",
    failure_code: "no_parent_complement_acceptance_alternative_satisfied",
    v10_failure_code: "regular_boundary_topology_no_double_counting_no_go_current_packet_fields",
    failure_reasons: [
      "v10_current_packet_fields_do_not_certify_topology_no_double_counting",
      "v10_no_simple_root_branch_reuse_exclusion_for_regular_boundary_core",
      "v10_no_fold_layer_nonexpansion_certificate_for_regular_boundary_core",
      "v9_separator_assignment_and_v8_inclusion_domination_non_core_closure_fields_remain_absent",
    ],
    v10_failure_reasons: [
      "topology_no_double_counting_no_go_current_packet_fields",
      ...coreRecord.failure_codes,
    ],
    notes:
      "v10 proves that current same-packet data cannot certify topology/no-double-counting for the residual regular-boundary core; the strip remains split-required.",
  };
}

function buildBackendCertificate(sources) {
  return {
    schema: "breather-proof-interval-topology-no-double-counting-no-go-certificate-v10",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_v10_topology_no_double_counting_no_go_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: sourceArtifacts(sources),
    pass_rule:
      "A residual regular-boundary core can receive topology/no-double-counting acceptance only from an explicit ownership convention that assigns shared simple-root and fold boundaries and proves no reuse in strict simple-root branch sums, endpoint-excluded complements, or fold-layer rectangles.",
    no_go_rule:
      "If no such ownership and branch-reuse exclusion certificate is present, endpoint ownership, simple-root acceptance, fold-family inventory, side labels, and separator adjacency must fail closed.",
    construction_scope:
      "v10 imports proof-interval-v9 selector no-go data and audits topology/no-double-counting fields only; it accepts no parent-complement strips.",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
    },
  };
}

function buildLedger(sources) {
  const v9Ledger = sources.v9Source.data;
  assertImportedV9(v9Ledger);
  assertFreshPacketSources(sources);

  const coreRecords = v9Ledger.regular_boundary_candidate_core_table_v9.map((core, index) =>
    buildCoreRecord(core, v9Ledger.parent_complement_strips_v9[index], index)
  );
  const strips = v9Ledger.parent_complement_strips_v9.map((strip, index) => enrichStrip(strip, coreRecords[index]));
  const parentSummaries = buildParentSummaries(v9Ledger, strips);
  const methodResults = coreRecords.flatMap((core) => core.topology_no_double_counting_no_go_v10.method_results);
  const certifiedMethodResults = methodResults.filter((method) => method.certified);
  const acceptedTopologyPaths = acceptedTopologyPathsForSources(sources, v9Ledger);

  const ledger = {
    schema: "breather-causal-ledger-fresh-proof-interval-v10",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    source_v9_refinement_id: v9Ledger.refinement_id,
    source_input_screen: v9Ledger.source_input_screen,
    source_numeric_artifacts: {
      proof_interval_v9_ledger: path.basename(sources.v9Source.path),
      proof_interval_v9_backend_certificate: path.basename(sources.v9BackendSource.path),
      proof_interval_v9_engine_audit: path.basename(sources.v9AuditSource.path),
    },
    source_artifacts: sourceArtifacts(sources),
    import_policy:
      "v10 imports v9 separator-assignment no-go data and audits only whether current same-packet fields certify topology/no-double-counting for residual regular-boundary cores.",
    status: "proof_interval_v10_topology_no_double_counting_no_go_branch_chart_blocked",
    acceptance_level:
      "proof-interval-v9 selector no-go plus fail-closed topology/no-double-counting no-go audit",
    claim_level:
      "priority-only sidecar proving a narrow no-go for the current topology/no-double-counting field; no complement strip is accepted by v10",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
    },
    imported_v9_summary: v9Ledger.summary,
    common_identity: v9Ledger.common_identity,
    evaluation_policy: {
      ...v9Ledger.evaluation_policy,
      v10_pass_rule:
        "Current same-packet data can certify topology/no-double-counting only if it supplies explicit residual-core ownership plus branch-reuse exclusion for simple-root, endpoint-excluded, and fold-layer alternatives.",
    },
    interval_method: {
      type: "v9_selector_no_go_import_plus_v10_topology_no_double_counting_no_go_audit",
      source_range_backend: v9Ledger.interval_method,
      v10_probe_backend:
        "No new trigonometric range enclosure is computed. v10 audits topology/no-double-counting fields for the imported v9 regular-boundary candidate cores.",
    },
    summary: {
      base_rows: v9Ledger.summary.base_rows,
      certified_empty_base_rows: v9Ledger.summary.certified_empty_base_rows,
      certified_range_empty_base_rows: v9Ledger.summary.certified_range_empty_base_rows,
      certified_diagonal_exclusion_empty_rows: v9Ledger.summary.certified_diagonal_exclusion_empty_rows,
      certified_simple_root_rows: v9Ledger.summary.certified_simple_root_rows,
      certified_simple_root_subrows: v9Ledger.summary.certified_simple_root_subrows,
      parent_complement_strips: strips.length,
      regular_boundary_candidate_cores_imported_from_v9: coreRecords.length,
      finite_regular_boundary_candidate_families_imported_from_v9:
        v9Ledger.summary.finite_regular_boundary_candidate_families_imported_from_v8,
      finite_regular_boundary_candidate_membership_edges_imported_from_v9:
        v9Ledger.summary.finite_regular_boundary_candidate_membership_edges_imported_from_v8,
      topology_no_double_counting_methods_tested: TOPOLOGY_METHODS.length,
      topology_no_double_counting_method_evaluations: methodResults.length,
      topology_no_double_counting_certificates_certified: certifiedMethodResults.length,
      accepted_topology_no_double_counting_certificates_by_v10: 0,
      explicit_topology_fields_certified: 0,
      complement_boundary_ownership_for_residual_core_certified: 0,
      simple_root_branch_reuse_exclusions_certified: 0,
      endpoint_excluded_complement_disjointness_certified: 0,
      fold_layer_nonexpansion_certificates_certified: 0,
      exact_single_separator_assignments_certified: 0,
      accepted_separator_assignments_by_v10: 0,
      same_packet_inclusion_proofs_certified: 0,
      same_packet_fold_ceiling_available_for_fresh_packet:
        v9Ledger.summary.same_packet_fold_ceiling_available_for_fresh_packet,
      domination_inequalities_certified: 0,
      non_core_complement_closures_certified: 0,
      regular_boundary_covered_strips: 0,
      accepted_parent_complement_strips_by_v10: 0,
      split_required_parent_complement_strips: strips.length,
      simple_root_parent_rows_consumed_by_v10: 0,
      accepted_fold_layer_rows: 0,
      split_required_base_rows: v9Ledger.summary.split_required_base_rows,
      branch_chart_authorized: false,
    },
    topology_no_double_counting_no_go_summary: {
      status: "proved_for_current_packet_fields",
      theorem_target:
        "For every imported v9 residual regular-boundary core C, no accepted current field supplies topology ownership plus no-double-counting.",
      mathematical_form:
        "Acceptance requires an ownership certificate T(C) that assigns shared simple-root/fold boundaries and excludes C from strict simple-root branch sums, endpoint-excluded complements, and fold-layer rectangles. Current data supply no such T(C).",
      methods_tested: TOPOLOGY_METHODS,
      certified_method_results: certifiedMethodResults.length,
      accepted_topology_or_ownership_field_paths: acceptedTopologyPaths,
      conclusion:
        "The current v9/v10 packet proves a no-go for topology/no-double-counting from existing fields only. It does not prove that a future ownership convention cannot close this field.",
    },
    topology_field_audit: {
      accepted_topology_or_ownership_field_paths: acceptedTopologyPaths,
      conclusion:
        "Current artifacts contain rejected or diagnostic topology/ownership fields, but no accepted residual-core topology/no-double-counting certificate.",
    },
    topology_no_double_counting_failure_summary: countCodes(coreRecords, "failure_codes"),
    regular_boundary_failure_summary: countBy(coreRecords, "failure_code"),
    regular_boundary_field_failure_summary: countCodes(coreRecords, "failure_codes"),
    parent_complement_blocking_summary: countBy(strips, "failure_code"),
    parent_complement_ownership_blocking_summary: countBy(strips, "v10_failure_code"),
    finite_regular_boundary_candidate_families: v9Ledger.finite_regular_boundary_candidate_families,
    regular_boundary_candidate_core_table_v10: coreRecords,
    regular_boundary_candidate_core_table_v9: v9Ledger.regular_boundary_candidate_core_table_v9,
    rows: v9Ledger.rows,
    simple_root_subrows: v9Ledger.simple_root_subrows,
    parent_complement_summaries: parentSummaries,
    parent_complement_summaries_v10: parentSummaries,
    parent_complement_strips: strips,
    parent_complement_strips_v10: strips,
    fold_layer_rows: [],
    limitations: [
      "v10 imports v9 candidate regular-boundary cores and does not recompute trigonometric row enclosures.",
      "The no-go is current-packet only: it rejects acceptance from existing topology, ownership, endpoint, simple-root, and fold-family fields.",
      "A later sidecar may still close this field by adding an accepted residual-core ownership convention and no-double-counting certificate.",
      "Separator assignment, same-packet inclusion, fresh domination, and non-core complement closure remain uncertified.",
      "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
    ],
  };

  assertV10Guards(ledger);
  return {
    backendCertificate: buildBackendCertificate(sources),
    ledger,
  };
}

function acceptedTopologyPathsForSources(sources, v9Ledger) {
  return [
    ...acceptedTopologyPaths(v9Ledger, "proof_interval_v9_ledger"),
    ...acceptedTopologyPaths(sources.inputScreenSource.data, "fresh_input_screen"),
    ...acceptedTopologyPaths(sources.meshSource.data, "fresh_mesh"),
    ...acceptedTopologyPaths(sources.seedContractSource.data, "fresh_seed_contract"),
  ];
}

function assertV10Guards(ledger) {
  if (ledger.preledger_pass || ledger.updates_live_ledger || ledger.branch_chart_authorized) {
    throw new Error("v10 authorization guard failed.");
  }
  if (ledger.summary.regular_boundary_candidate_cores_imported_from_v9 !== 10) {
    throw new Error("v10 expected exactly 10 imported v9 candidate cores.");
  }
  if (ledger.summary.topology_no_double_counting_methods_tested !== 5) {
    throw new Error("v10 expected exactly 5 topology/no-double-counting methods.");
  }
  if (
    ledger.summary.topology_no_double_counting_certificates_certified !== 0 ||
    ledger.summary.accepted_topology_no_double_counting_certificates_by_v10 !== 0 ||
    ledger.summary.accepted_parent_complement_strips_by_v10 !== 0 ||
    ledger.summary.simple_root_parent_rows_consumed_by_v10 !== 0
  ) {
    throw new Error("v10 unexpectedly accepted topology/no-double-counting or parent complements.");
  }
  if (ledger.topology_field_audit.accepted_topology_or_ownership_field_paths.length !== 0) {
    throw new Error("v10 found an accepted topology/ownership field; no-go script must be revised.");
  }
  for (const core of ledger.regular_boundary_candidate_core_table_v10) {
    const certifiedMethods = core.topology_no_double_counting_no_go_v10.method_results.filter((method) => method.certified);
    if (certifiedMethods.length > 0) {
      throw new Error(`v10 certified a topology/no-double-counting method for ${core.core_id}.`);
    }
    if (core.topology_and_no_double_counting_certified || core.topology_no_double_counting_certified_by_v10) {
      throw new Error(`v10 accepted topology/no-double-counting for ${core.core_id}.`);
    }
    if (
      core.regular_boundary_covered ||
      core.required_fields_present.exact_single_separator_assignment ||
      core.required_fields_present.same_packet_inclusion_proof ||
      core.required_fields_present.domination_inequality_or_enlarged_same_packet_ceiling ||
      core.required_fields_present.topology_and_no_double_counting ||
      core.required_fields_present.non_core_complement_closure
    ) {
      throw new Error(`v10 accepted regular-boundary fields for ${core.core_id}.`);
    }
  }
}

function failureTable(summary) {
  const rows = Object.entries(summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`);
  return rows.length ? rows.join("\n") : "| none | 0 |";
}

function coreTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.core_id}\` | \`${row.parent_base_row_id}\` | \`${row.side}\` | ${row.candidate_separator_assignments.map((item) => `\`${item}\``).join(", ")} | \`${row.failure_code}\` |`
    )
    .join("\n");
}

function methodTable(methods) {
  return methods
    .map((method) => `| \`${method.method_id}\` | ${method.description} |`)
    .join("\n");
}

function parentSummaryTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.parent_base_row_id}\` | \`${row.simple_root_subrow_id}\` | ${row.complement_strip_count} | ${row.split_required_complement_strips} | \`${row.status}\` |`
    )
    .join("\n");
}

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-preledger-proof-interval-engine-audit-v10",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_v10_topology_no_double_counting_no_go_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      range_backend: "imported from proof-interval-v9",
      policy_backend: "deterministic topology/no-double-counting no-go audit over imported v9 candidate core table",
      binary64_endpoint_use: "none_added_by_v10",
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_subrows: ledger.summary.certified_simple_root_subrows,
      topology_no_double_counting_certificates_accepted_by_v10:
        ledger.summary.accepted_topology_no_double_counting_certificates_by_v10,
      parent_complement_strips_accepted_by_v10: ledger.summary.accepted_parent_complement_strips_by_v10,
      fold_layer_rows: 0,
    },
    constructed_scope: {
      regular_boundary_candidate_families_imported_from_v9:
        ledger.summary.finite_regular_boundary_candidate_families_imported_from_v9,
      regular_boundary_candidate_cores_imported_from_v9:
        ledger.summary.regular_boundary_candidate_cores_imported_from_v9,
      topology_no_double_counting_methods_tested: ledger.summary.topology_no_double_counting_methods_tested,
      topology_no_double_counting_method_evaluations: ledger.summary.topology_no_double_counting_method_evaluations,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      split_required_parent_complement_strips: ledger.summary.split_required_parent_complement_strips,
      parent_complement_failure_code_counts: ledger.parent_complement_blocking_summary,
      regular_boundary_failure_code_counts: ledger.regular_boundary_field_failure_summary,
    },
    limitations: [
      "This is a topology/no-double-counting no-go audit, not a full null-coordinate preledger.",
      "The no-go is limited to current packet fields imported from v9 and same-packet inputs.",
      "Rows left as split_required block branch-chart authorization.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  return `# Fresh Proof-Interval Preledger v10 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v10 sidecar imports the v9 separator-assignment no-go data
and tests whether the current same-packet data certify topology/no-double-counting
for any residual regular-boundary core.

v10 proves a narrow no-go for the current fields. For each imported core $C$,
regular-boundary coverage would require a topology certificate $T(C)$ that
assigns shared simple-root and fold boundaries and proves that $C$ is not reused
in strict simple-root branch sums, endpoint-excluded complements, or accepted
fold-layer row rectangles. The current packet supplies no such $T(C)$.

This is a sharper blocker, not a passed pre-ledger. Zero topology/no-double-counting
certificates are accepted, zero parent-complement strips are accepted,
and zero simple-root parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v9 | ${ledger.summary.base_rows} |
| Empty rows inherited from v9 | ${ledger.summary.certified_empty_base_rows} |
| Simple-root subrows inherited from v9 | ${ledger.summary.certified_simple_root_subrows} |
| Parent-complement strips probed | ${ledger.summary.parent_complement_strips} |
| Regular-boundary candidate cores imported from v9 | ${ledger.summary.regular_boundary_candidate_cores_imported_from_v9} |
| Finite candidate families imported from v9 | ${ledger.summary.finite_regular_boundary_candidate_families_imported_from_v9} |
| Candidate membership edges imported from v9 | ${ledger.summary.finite_regular_boundary_candidate_membership_edges_imported_from_v9} |
| Topology/no-double-counting methods tested | ${ledger.summary.topology_no_double_counting_methods_tested} |
| Topology/no-double-counting method evaluations | ${ledger.summary.topology_no_double_counting_method_evaluations} |
| Topology/no-double-counting certificates certified | ${ledger.summary.topology_no_double_counting_certificates_certified} |
| Topology/no-double-counting certificates accepted by v10 | ${ledger.summary.accepted_topology_no_double_counting_certificates_by_v10} |
| Simple-root branch reuse exclusions certified | ${ledger.summary.simple_root_branch_reuse_exclusions_certified} |
| Endpoint-excluded complement disjointness certified | ${ledger.summary.endpoint_excluded_complement_disjointness_certified} |
| Fold-layer nonexpansion certificates certified | ${ledger.summary.fold_layer_nonexpansion_certificates_certified} |
| Exact single separator assignments certified | ${ledger.summary.exact_single_separator_assignments_certified} |
| Same-packet inclusion proofs certified | ${ledger.summary.same_packet_inclusion_proofs_certified} |
| Domination inequalities certified | ${ledger.summary.domination_inequalities_certified} |
| Non-core complement closures certified | ${ledger.summary.non_core_complement_closures_certified} |
| Parent-complement strips accepted by v10 | ${ledger.summary.accepted_parent_complement_strips_by_v10} |
| Parent-complement strips still split-required | ${ledger.summary.split_required_parent_complement_strips} |
| Simple-root parent rows consumed by v10 | ${ledger.summary.simple_root_parent_rows_consumed_by_v10} |
| Split-required base rows | ${ledger.summary.split_required_base_rows} |

Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The exact backend certificate is
\`${path.basename(backendPath)}\`; the engine audit is
\`${path.basename(auditPath)}\`.

## Backend Meaning

Let $T(C)$ denote a topology/no-double-counting certificate for a residual
regular-boundary core $C$. v10 uses the acceptance rule

$$
\\text{accepted\\_topology}(C)
\\Rightarrow
T(C)
\\land
C\\notin B_{\\mathrm{simple}}
\\land
C\\notin B_{\\mathrm{endpoint}}
\\land
C\\notin B_{\\mathrm{fold}},
$$

where $B_{\\mathrm{simple}}$ is the already accepted strict simple-root branch
sum, $B_{\\mathrm{endpoint}}$ is the endpoint-excluded complement ledger, and
$B_{\\mathrm{fold}}$ is the accepted fold-layer row rectangle ledger. Current
data contain rejected or diagnostic topology/ownership fields, but no accepted
residual-core certificate $T(C)$.

## Methods Tested

| Method | Meaning |
| --- | --- |
${methodTable(ledger.topology_no_double_counting_no_go_summary.methods_tested)}

## Candidate Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Failure code |
| --- | --- | --- | --- | --- |
${coreTable(ledger.regular_boundary_candidate_core_table_v10)}

## Topology/No-Double-Counting Failure Summary

| Failure code | Cores |
| --- | ---: |
${failureTable(ledger.topology_no_double_counting_failure_summary)}

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Split-required strips | Status |
| --- | --- | ---: | ---: | --- |
${parentSummaryTable(ledger.parent_complement_summaries)}

## Next Certificate Action

The next proof advance must supply an explicit residual-core ownership
convention with branch-reuse exclusions, or pivot to same-packet fold-layer
exact membership / candidate repair. Without topology/no-double-counting,
regular-boundary coverage remains blocked before inclusion, domination, and
non-core complement closure can consume rows.

## Capture Decision

Priority-only. This sidecar proves a current-packet topology/no-double-counting
no-go inside the breather proof program, but it is not a passed pre-ledger and
not reader-facing AAA prose.
`;
}

function readSources(args) {
  return {
    v9Source: readJsonArtifact(args.v9Ledger),
    v9BackendSource: readJsonArtifact(args.v9Backend),
    v9AuditSource: readJsonArtifact(args.v9Audit),
    v9ReportSource: readTextArtifact(args.v9Report),
    inputScreenSource: readJsonArtifact(args.inputScreen),
    meshSource: readJsonArtifact(args.mesh),
    seedContractSource: readJsonArtifact(args.seedContract),
    policySources: Object.fromEntries(
      Object.entries(args.policySources).map(([name, sourcePath]) => [name, readTextArtifact(sourcePath)])
    ),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const sources = readSources(args);
  const { backendCertificate, ledger } = buildLedger(sources);

  const backendPath = path.join(
    args.outDir,
    `preledger_interval_backend_certificate.${OUTPUT_TAG}.json`
  );
  const ledgerPath = path.join(args.outDir, `causal_ledger.${OUTPUT_TAG}.json`);
  const reportPath = path.join(args.outDir, `causal_preledger_interval_report.${OUTPUT_TAG}.md`);
  const auditPath = path.join(args.outDir, `preledger_interval_engine_audit.${OUTPUT_TAG}.json`);
  const audit = buildEngineAudit(ledger, backendPath);
  const report = buildReport(ledger, ledgerPath, backendPath, auditPath);

  writeJson(backendPath, backendCertificate, args.pretty);
  writeJson(ledgerPath, ledger, args.pretty);
  writeText(reportPath, report);
  writeJson(auditPath, audit, args.pretty);

  console.log(`Wrote ${backendPath}`);
  console.log(`Wrote ${ledgerPath}`);
  console.log(`Wrote ${reportPath}`);
  console.log(`Wrote ${auditPath}`);
  console.log(
    JSON.stringify(
      {
        schema: ledger.schema,
        status: ledger.status,
        preledger_pass: ledger.preledger_pass,
        updates_live_ledger: ledger.updates_live_ledger,
        branch_chart_authorized: ledger.branch_chart_authorized,
        summary: ledger.summary,
        topology_no_double_counting_failure_summary: ledger.topology_no_double_counting_failure_summary,
      },
      null,
      2
    )
  );
}

main();
