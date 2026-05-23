#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-separator-assignment-no-go-v9`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v9`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OUT_DIR = CERT_DIR;

const DEFAULT_V8_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v8.json`;
const DEFAULT_V8_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v8.json`;
const DEFAULT_V8_AUDIT = `${CERT_DIR}/preledger_interval_engine_audit.${PACKET_ID}.proof-interval-v8.json`;
const DEFAULT_V8_REPORT = `${CERT_DIR}/causal_preledger_interval_report.${PACKET_ID}.proof-interval-v8.md`;
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

const SEPARATOR_ASSIGNMENT_METHODS = [
  {
    method_id: "exact_single_separator_field",
    description:
      "Accept only an explicit exact_single_separator_assignment field certified by the imported regular-boundary record.",
  },
  {
    method_id: "unique_candidate_membership",
    description:
      "Audit candidate-list cardinality while treating a singleton candidate list as inventory only unless a certified uniqueness field is present.",
  },
  {
    method_id: "interval_endpoint_adjacency",
    description:
      "Check whether same-packet interval adjacency selects one separator together with an accepted topology ownership convention.",
  },
  {
    method_id: "side_heuristic",
    description:
      "Reject a choice based only on left/right side labels or ledger orientation.",
  },
  {
    method_id: "family_order_tiebreaker",
    description:
      "Reject a choice based only on array order, separator order, or family ordering.",
  },
];

function parseArgs(argv) {
  const args = {
    v8Ledger: DEFAULT_V8_LEDGER,
    v8Backend: DEFAULT_V8_BACKEND,
    v8Audit: DEFAULT_V8_AUDIT,
    v8Report: DEFAULT_V8_REPORT,
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
    } else if (arg === "--v8-ledger") {
      args.v8Ledger = argv[++i];
    } else if (arg === "--v8-backend") {
      args.v8Backend = argv[++i];
    } else if (arg === "--v8-audit") {
      args.v8Audit = argv[++i];
    } else if (arg === "--v8-report") {
      args.v8Report = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v9.mjs [options]

Options:
  --v8-ledger PATH                         Proof-interval-v8 sidecar ledger JSON. Defaults to ${DEFAULT_V8_LEDGER}.
  --v8-backend PATH                        Proof-interval-v8 backend certificate JSON. Defaults to ${DEFAULT_V8_BACKEND}.
  --v8-audit PATH                          Proof-interval-v8 engine audit JSON. Defaults to ${DEFAULT_V8_AUDIT}.
  --v8-report PATH                         Proof-interval-v8 report markdown. Defaults to ${DEFAULT_V8_REPORT}.
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
    proof_interval_v8_ledger: artifactRecord(sources.v8Source),
    proof_interval_v8_backend_certificate: artifactRecord(sources.v8BackendSource),
    proof_interval_v8_engine_audit: artifactRecord(sources.v8AuditSource),
    proof_interval_v8_report: artifactRecord(sources.v8ReportSource),
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

function scalarPathRows(value, artifactName, regex, limit = 80) {
  const rows = [];
  const visit = (node, pathParts) => {
    if (rows.length >= limit) {
      return;
    }
    if (!node || typeof node !== "object") {
      const joined = pathParts.join(".");
      if (regex.test(joined)) {
        rows.push({ artifact: artifactName, path: joined, value: node });
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, index) => visit(child, [...pathParts, String(index)]));
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      visit(child, [...pathParts, key]);
    }
  };
  visit(value, []);
  return rows;
}

function assertImportedV8(v8Ledger) {
  if (v8Ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v8") {
    throw new Error("Proof-interval-v8 ledger schema mismatch.");
  }
  if (v8Ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected v8 packet_id ${PACKET_ID}.`);
  }
  if (v8Ledger.preledger_pass || v8Ledger.updates_live_ledger || v8Ledger.branch_chart_authorized) {
    throw new Error("Imported v8 unexpectedly authorizes a live preledger or branch chart.");
  }
  if (v8Ledger.summary?.regular_boundary_candidate_cores_imported_from_v7 !== 10) {
    throw new Error("Proof-interval-v8 is missing the expected 10 regular-boundary candidate cores.");
  }
  if (v8Ledger.summary?.finite_regular_boundary_candidate_families_constructed !== 4) {
    throw new Error("Proof-interval-v8 is missing the expected 4 finite candidate families.");
  }
  if (v8Ledger.summary?.finite_regular_boundary_candidate_membership_edges !== 20) {
    throw new Error("Proof-interval-v8 is missing the expected 20 candidate membership edges.");
  }
  if (v8Ledger.summary?.exact_single_separator_assignments_certified !== 0) {
    throw new Error("Proof-interval-v8 unexpectedly certifies separator assignments.");
  }
  if (v8Ledger.summary?.accepted_parent_complement_strips_by_v8 !== 0) {
    throw new Error("Proof-interval-v8 unexpectedly accepts parent-complement strips.");
  }
  if (!Array.isArray(v8Ledger.regular_boundary_candidate_core_table_v8)) {
    throw new Error("Proof-interval-v8 is missing regular_boundary_candidate_core_table_v8.");
  }
  if (v8Ledger.regular_boundary_candidate_core_table_v8.length !== 10) {
    throw new Error("Proof-interval-v8 core table length changed from 10.");
  }
  if (!Array.isArray(v8Ledger.parent_complement_strips_v8) || v8Ledger.parent_complement_strips_v8.length !== 10) {
    throw new Error("Proof-interval-v8 is missing the expected 10 parent-complement strips.");
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

function methodResultsForCore(core) {
  const assignments = core.candidate_separator_assignments ?? [];
  const exactFieldCertified =
    core.exact_single_separator_assignment_certified === true &&
    core.required_fields_present?.exact_single_separator_assignment === true &&
    assignments.length === 1;
  const candidateMembershipIsSingleton = assignments.length === 1;
  const topologyOwnershipCertified = core.topology_and_no_double_counting_certified === true;

  return [
    {
      method_id: "exact_single_separator_field",
      certified: exactFieldCertified,
      selected_separator: exactFieldCertified ? assignments[0] : null,
      status: exactFieldCertified ? "certified" : "rejected",
      failure_code: exactFieldCertified ? null : "separator_assignment_no_exact_single_separator_field",
      evidence:
        "The imported v8 core has exact_single_separator_assignment_certified=false and required_fields_present.exact_single_separator_assignment=false.",
    },
    {
      method_id: "unique_candidate_membership",
      certified: false,
      selected_separator: null,
      status: candidateMembershipIsSingleton
        ? "rejected_candidate_singleton_not_proof_field"
        : "rejected_nonunique_candidate_membership",
      failure_code: candidateMembershipIsSingleton
        ? "separator_assignment_candidate_membership_not_proof_field"
        : "separator_assignment_candidate_membership_nonunique",
      evidence:
        `The imported v8 candidate_separator_assignments list has length ${assignments.length}; a candidate-list singleton is not proof-grade without a certified uniqueness field.`,
    },
    {
      method_id: "interval_endpoint_adjacency",
      certified: false,
      selected_separator: null,
      status: topologyOwnershipCertified
        ? "rejected_topology_field_without_explicit_selector"
        : "rejected_no_topology_ownership",
      failure_code:
        "separator_assignment_topology_ownership_convention_absent",
      evidence:
        "Same-packet adjacency supplies candidate separators, but no accepted topology/no-double-counting convention selects ownership for residual regular-boundary cores.",
    },
    {
      method_id: "side_heuristic",
      certified: false,
      selected_separator: null,
      status: "rejected_heuristic_not_a_certificate",
      failure_code: "separator_assignment_heuristic_tiebreaker_rejected",
      evidence: "A left/right side label is not an accepted regular-boundary topology ownership rule.",
    },
    {
      method_id: "family_order_tiebreaker",
      certified: false,
      selected_separator: null,
      status: "rejected_heuristic_not_a_certificate",
      failure_code: "separator_assignment_heuristic_tiebreaker_rejected",
      evidence: "Array order, separator order, and family order are not accepted mathematical selector fields.",
    },
  ];
}

function buildCoreRecord(core, index) {
  const assignments = core.candidate_separator_assignments ?? [];
  const methodResults = methodResultsForCore(core);
  const certifiedMethodResults = methodResults.filter((method) => method.certified);
  const heuristicRejected = methodResults.filter((method) => method.failure_code === "separator_assignment_heuristic_tiebreaker_rejected");
  const failureCodes = [
    "separator_assignment_no_exact_single_separator_field",
    "separator_assignment_candidate_membership_nonunique",
    "separator_assignment_topology_ownership_convention_absent",
    "separator_assignment_heuristic_tiebreaker_rejected",
  ];

  return {
    core_id: core.core_id.replace("_v8_", "_v9_"),
    source_v8_core_id: core.core_id,
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
    candidate_separator_assignments: assignments,
    candidate_separator_assignment_count: assignments.length,
    candidate_membership_edges: core.candidate_membership_edges ?? [],
    accepted_separator_assignment: null,
    exact_single_separator_assignment_certified: false,
    accepted_separator_assignment_certified_by_v9: false,
    separator_assignment_no_go_v9: {
      status: "proved_for_current_packet_fields",
      theorem_target: "exact single separator assignment for this imported v8 residual regular-boundary core",
      adjacency_set: assignments,
      adjacency_set_cardinality: assignments.length,
      method_results: methodResults,
      certified_method_count: certifiedMethodResults.length,
      heuristic_rejections: heuristicRejected.length,
      conclusion:
        "Current same-packet fields do not select exactly one separator for this core; any acceptance would require a new exact assignment or topology ownership certificate.",
    },
    finite_family_definition_status: core.finite_family_definition_status,
    same_packet_inclusion_status: core.same_packet_inclusion_status,
    accepted_regular_boundary_coverage_status: "not_accepted",
    same_packet_inclusion_proof_certified: false,
    domination_inequality_certified: false,
    topology_and_no_double_counting_certified: false,
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
    imported_v8_failure_code: core.failure_code,
    imported_v8_failure_codes: core.failure_codes ?? [],
    failure_code: "regular_boundary_separator_assignment_no_go_current_packet_fields",
    failure_codes: failureCodes,
    v9_index: index + 1,
  };
}

function buildSamePacketSelectorAudit(sources) {
  const exactSelectorRegex =
    /(^|\.)(accepted_separator_assignment|exact_single_separator_assignment|regular_boundary_separator_owner|regular_boundary_core_selector|topology_ownership_convention)(\.|$)/i;
  const genericSeparatorRegex = /separator_event|shifted_separator_coordinates|separator_radius_theta|separator_layer_width_theta/i;
  const artifacts = [
    ["fresh_input_screen", sources.inputScreenSource.data],
    ["fresh_mesh", sources.meshSource.data],
    ["fresh_seed_contract", sources.seedContractSource.data],
  ];
  return {
    artifacts_audited: artifacts.map(([name]) => name),
    accepted_core_selector_field_paths: artifacts.flatMap(([name, data]) => scalarPathRows(data, name, exactSelectorRegex)),
    generic_separator_coordinate_or_event_paths_sample: artifacts.flatMap(([name, data]) => scalarPathRows(data, name, genericSeparatorRegex, 32)),
    conclusion:
      "The same-packet input artifacts name separator events and coordinates, but they do not contain an accepted core-to-separator ownership selector for v8 regular-boundary residual cores.",
  };
}

function buildParentSummaries(v8Ledger, strips) {
  return v8Ledger.parent_complement_summaries_v8.map((summary) => {
    const ownedStrips = strips.filter((strip) => strip.simple_root_subrow_id === summary.simple_root_subrow_id);
    return {
      parent_base_row_id: summary.parent_base_row_id,
      simple_root_subrow_id: summary.simple_root_subrow_id,
      source_v8_summary_status: summary.status,
      complement_strips: ownedStrips.map((strip) => strip.strip_id),
      complement_strip_count: ownedStrips.length,
      accepted_complement_strips: 0,
      split_required_complement_strips: ownedStrips.length,
      parent_consumed_by_v9: false,
      status: "parent_complements_split_required",
      blocker: "regular_boundary_separator_assignment_no_go_current_packet_fields",
    };
  });
}

function enrichStrip(strip, coreRecord) {
  return {
    ...strip,
    strip_id: strip.strip_id.replace("_v8_", "_v9_"),
    source_v8_strip_id: strip.strip_id,
    refinement_id: REFINEMENT_ID,
    imported_v8_status: strip.status,
    imported_v8_failure_code: strip.failure_code,
    accepted_alternative: null,
    status: "split_required",
    v9_status: "split_required",
    v9_certificate_status: "regular_boundary_separator_assignment_no_go_split_required",
    regular_boundary_separator_assignment_no_go_v9: {
      status: "rejected",
      accepted: false,
      failure_code: coreRecord.failure_code,
      failure_codes: coreRecord.failure_codes,
      core_id: coreRecord.core_id,
      source_v8_core_id: coreRecord.source_v8_core_id,
      candidate_separator_assignments: coreRecord.candidate_separator_assignments,
      method_results: coreRecord.separator_assignment_no_go_v9.method_results,
      conclusion: coreRecord.separator_assignment_no_go_v9.conclusion,
    },
    probes: {
      ...strip.probes,
      regular_boundary_separator_assignment_no_go_v9: {
        status: "rejected",
        accepted: false,
        failure_code: coreRecord.failure_code,
        failure_codes: coreRecord.failure_codes,
      },
    },
    coverage_certificate_ref: null,
    coverage_certificate_status: "absent",
    failure_code: "no_parent_complement_acceptance_alternative_satisfied",
    v9_failure_code: "regular_boundary_separator_assignment_no_go_current_packet_fields",
    failure_reasons: [
      "v9_current_packet_fields_do_not_certify_single_separator_assignment",
      "v9_rejects_side_family_order_and_adjacency_heuristics_as_certificates",
      "v8_same_packet_inclusion_domination_topology_and_non_core_closure_fields_remain_absent",
    ],
    v9_failure_reasons: [
      "separator_assignment_no_go_current_packet_fields",
      ...coreRecord.failure_codes,
    ],
    notes:
      "v9 proves that current v8 same-packet regular-boundary core data cannot certify an exact single separator assignment; the strip remains split-required.",
  };
}

function buildBackendCertificate(sources) {
  return {
    schema: "breather-proof-interval-separator-assignment-no-go-certificate-v9",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_v9_separator_assignment_no_go_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: sourceArtifacts(sources),
    pass_rule:
      "A residual regular-boundary core can receive an accepted separator assignment only from an explicit exact single separator assignment field or an accepted topology ownership convention that selects one separator from the candidate adjacency set; candidate-list singleton length is not proof-grade by itself.",
    no_go_rule:
      "If a core has two candidate separators and no accepted topology ownership selector, adjacency, side labels, array order, and family order must fail closed.",
    construction_scope:
      "v9 imports proof-interval-v8 finite regular-boundary candidate families and audits separator-assignment selectors only; it accepts no parent-complement strips.",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
    },
  };
}

function buildLedger(sources) {
  const v8Ledger = sources.v8Source.data;
  assertImportedV8(v8Ledger);
  assertFreshPacketSources(sources);

  const coreRecords = v8Ledger.regular_boundary_candidate_core_table_v8.map((core, index) => buildCoreRecord(core, index));
  const strips = v8Ledger.parent_complement_strips_v8.map((strip, index) => enrichStrip(strip, coreRecords[index]));
  const parentSummaries = buildParentSummaries(v8Ledger, strips);
  const methodResults = coreRecords.flatMap((core) => core.separator_assignment_no_go_v9.method_results);
  const certifiedMethodResults = methodResults.filter((method) => method.certified);
  const ambiguousTwoSeparatorCores = coreRecords.filter((core) => core.candidate_separator_assignment_count === 2);
  const uniqueCandidateMembershipAssignments = coreRecords.filter((core) => core.candidate_separator_assignment_count === 1);
  const heuristicRejections = methodResults.filter((method) => method.failure_code === "separator_assignment_heuristic_tiebreaker_rejected");
  const selectorAudit = buildSamePacketSelectorAudit(sources);

  const ledger = {
    schema: "breather-causal-ledger-fresh-proof-interval-v9",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    source_v8_refinement_id: v8Ledger.refinement_id,
    source_input_screen: v8Ledger.source_input_screen,
    source_numeric_artifacts: {
      proof_interval_v8_ledger: path.basename(sources.v8Source.path),
      proof_interval_v8_backend_certificate: path.basename(sources.v8BackendSource.path),
      proof_interval_v8_engine_audit: path.basename(sources.v8AuditSource.path),
    },
    source_artifacts: sourceArtifacts(sources),
    import_policy:
      "v9 imports v8 finite regular-boundary candidate families and audits only whether current same-packet fields certify exact single separator assignments.",
    status: "proof_interval_v9_separator_assignment_no_go_branch_chart_blocked",
    acceptance_level:
      "proof-interval-v8 finite regular-boundary candidate family plus fail-closed separator-assignment no-go audit",
    claim_level:
      "priority-only sidecar proving a narrow no-go for the current separator-assignment field; no complement strip is accepted by v9",
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
    imported_v8_summary: v8Ledger.summary,
    common_identity: v8Ledger.common_identity,
    evaluation_policy: {
      ...v8Ledger.evaluation_policy,
      v9_pass_rule:
        "Current same-packet data can certify a separator assignment only if it supplies a single exact separator field or an accepted topology ownership rule. Heuristic side, endpoint-adjacency, and ordering choices are rejected.",
    },
    interval_method: {
      type: "v8_regular_boundary_family_import_plus_v9_separator_assignment_no_go_audit",
      source_range_backend: v8Ledger.interval_method,
      v9_probe_backend:
        "No new trigonometric range enclosure is computed. v9 audits selector fields for the imported v8 regular-boundary candidate cores.",
    },
    summary: {
      base_rows: v8Ledger.summary.base_rows,
      certified_empty_base_rows: v8Ledger.summary.certified_empty_base_rows,
      certified_range_empty_base_rows: v8Ledger.summary.certified_range_empty_base_rows,
      certified_diagonal_exclusion_empty_rows: v8Ledger.summary.certified_diagonal_exclusion_empty_rows,
      certified_simple_root_rows: v8Ledger.summary.certified_simple_root_rows,
      certified_simple_root_subrows: v8Ledger.summary.certified_simple_root_subrows,
      parent_complement_strips: strips.length,
      regular_boundary_candidate_cores_imported_from_v8: coreRecords.length,
      finite_regular_boundary_candidate_families_imported_from_v8:
        v8Ledger.summary.finite_regular_boundary_candidate_families_constructed,
      finite_regular_boundary_candidate_membership_edges_imported_from_v8:
        v8Ledger.summary.finite_regular_boundary_candidate_membership_edges,
      separator_assignment_methods_tested: SEPARATOR_ASSIGNMENT_METHODS.length,
      separator_assignment_method_evaluations: methodResults.length,
      unique_candidate_membership_assignments: uniqueCandidateMembershipAssignments.length,
      ambiguous_two_separator_cores: ambiguousTwoSeparatorCores.length,
      exact_single_separator_assignments_certified: 0,
      accepted_separator_assignments_by_v9: 0,
      heuristic_assignments_rejected: heuristicRejections.length,
      side_heuristics_rejected: coreRecords.length,
      family_order_tiebreakers_rejected: coreRecords.length,
      same_packet_inclusion_proofs_certified: 0,
      same_packet_fold_ceiling_available_for_fresh_packet:
        v8Ledger.summary.same_packet_fold_ceiling_available_for_fresh_packet,
      domination_inequalities_certified: 0,
      topology_no_double_counting_certified: 0,
      non_core_complement_closures_certified: 0,
      regular_boundary_covered_strips: 0,
      accepted_parent_complement_strips_by_v9: 0,
      split_required_parent_complement_strips: strips.length,
      simple_root_parent_rows_consumed_by_v9: 0,
      accepted_fold_layer_rows: 0,
      split_required_base_rows: v8Ledger.summary.split_required_base_rows,
      branch_chart_authorized: false,
    },
    separator_assignment_no_go_summary: {
      status: "proved_for_current_packet_fields",
      theorem_target:
        "For every imported v8 residual regular-boundary core C, no accepted current field supplies a selector s(C) in Adj(C) with a singleton certificate.",
      mathematical_form:
        "Each current core has |Adj(C)| = 2. The packet has no accepted ownership selector o(C) and no exact single separator assignment field. Therefore no current core has a certified singleton {s(C)}.",
      methods_tested: SEPARATOR_ASSIGNMENT_METHODS,
      certified_method_results: certifiedMethodResults.length,
      accepted_core_selector_field_paths: selectorAudit.accepted_core_selector_field_paths,
      generic_separator_coordinate_or_event_paths_sample: selectorAudit.generic_separator_coordinate_or_event_paths_sample,
      conclusion:
        "The current v8/v9 packet proves a no-go for separator assignment from existing fields only. It does not prove that a future topology convention or exact assignment certificate cannot close this field.",
    },
    same_packet_selector_field_audit: selectorAudit,
    separator_assignment_failure_summary: countCodes(coreRecords, "failure_codes"),
    regular_boundary_failure_summary: countBy(coreRecords, "failure_code"),
    regular_boundary_field_failure_summary: countCodes(coreRecords, "failure_codes"),
    parent_complement_blocking_summary: countBy(strips, "failure_code"),
    parent_complement_ownership_blocking_summary: countBy(strips, "v9_failure_code"),
    finite_regular_boundary_candidate_families: v8Ledger.finite_regular_boundary_candidate_families,
    finite_regular_boundary_candidate_families_v8: v8Ledger.finite_regular_boundary_candidate_families,
    regular_boundary_candidate_core_table_v9: coreRecords,
    regular_boundary_candidate_core_table_v8: v8Ledger.regular_boundary_candidate_core_table_v8,
    regular_boundary_domination_audit: v8Ledger.regular_boundary_domination_audit,
    non_core_complement_closure_audit: v8Ledger.non_core_complement_closure_audit,
    rows: v8Ledger.rows,
    simple_root_subrows: v8Ledger.simple_root_subrows,
    parent_complement_summaries: parentSummaries,
    parent_complement_summaries_v9: parentSummaries,
    parent_complement_strips: strips,
    parent_complement_strips_v9: strips,
    fold_layer_rows: [],
    limitations: [
      "v9 imports v8 candidate regular-boundary cores and does not recompute trigonometric row enclosures.",
      "The no-go is current-packet only: it rejects acceptance from existing selector fields, side labels, adjacency, and ordering heuristics.",
      "A later sidecar may still close this field by adding an exact assignment certificate or accepted topology ownership convention.",
      "Same-packet inclusion, fresh domination, topology/no-double-counting, and non-core complement closure remain uncertified.",
      "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
    ],
  };

  assertV9Guards(ledger);
  return {
    backendCertificate: buildBackendCertificate(sources),
    ledger,
  };
}

function assertV9Guards(ledger) {
  if (ledger.preledger_pass || ledger.updates_live_ledger || ledger.branch_chart_authorized) {
    throw new Error("v9 authorization guard failed.");
  }
  if (ledger.summary.regular_boundary_candidate_cores_imported_from_v8 !== 10) {
    throw new Error("v9 expected exactly 10 imported v8 candidate cores.");
  }
  if (ledger.summary.finite_regular_boundary_candidate_families_imported_from_v8 !== 4) {
    throw new Error("v9 expected exactly 4 imported v8 candidate families.");
  }
  if (ledger.summary.finite_regular_boundary_candidate_membership_edges_imported_from_v8 !== 20) {
    throw new Error("v9 expected exactly 20 imported v8 candidate membership edges.");
  }
  if (ledger.summary.ambiguous_two_separator_cores !== 10) {
    throw new Error("v9 current-packet no-go expects all imported cores to have exactly two candidate separators.");
  }
  if (
    ledger.summary.exact_single_separator_assignments_certified !== 0 ||
    ledger.summary.accepted_separator_assignments_by_v9 !== 0 ||
    ledger.summary.accepted_parent_complement_strips_by_v9 !== 0 ||
    ledger.summary.simple_root_parent_rows_consumed_by_v9 !== 0
  ) {
    throw new Error("v9 unexpectedly accepted separator assignments or parent complements.");
  }
  if (ledger.same_packet_selector_field_audit.accepted_core_selector_field_paths.length !== 0) {
    throw new Error("v9 found an accepted core selector field in same-packet inputs; no-go script must be revised.");
  }
  for (const core of ledger.regular_boundary_candidate_core_table_v9) {
    const certifiedMethods = core.separator_assignment_no_go_v9.method_results.filter((method) => method.certified);
    if (core.candidate_separator_assignment_count !== 2) {
      throw new Error(`v9 current-packet no-go expected two candidate separators for ${core.core_id}.`);
    }
    if (certifiedMethods.length > 0) {
      throw new Error(`v9 certified a separator method for ambiguous core ${core.core_id}.`);
    }
    if (core.accepted_separator_assignment !== null || core.accepted_separator_assignment_certified_by_v9) {
      throw new Error(`v9 accepted a separator assignment for ${core.core_id}.`);
    }
    if (
      core.regular_boundary_covered ||
      core.required_fields_present.exact_single_separator_assignment ||
      core.required_fields_present.same_packet_inclusion_proof ||
      core.required_fields_present.domination_inequality_or_enlarged_same_packet_ceiling ||
      core.required_fields_present.topology_and_no_double_counting ||
      core.required_fields_present.non_core_complement_closure
    ) {
      throw new Error(`v9 accepted regular-boundary fields for ${core.core_id}.`);
    }
  }
  for (const parent of ledger.parent_complement_summaries) {
    if (parent.parent_consumed_by_v9 || parent.accepted_complement_strips !== 0) {
      throw new Error(`v9 consumed parent complement summary ${parent.parent_base_row_id}.`);
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
    return "| none | none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.core_id}\` | \`${row.parent_base_row_id}\` | \`${row.side}\` | ${row.candidate_separator_assignments.map((item) => `\`${item}\``).join(", ")} | ${row.candidate_separator_assignment_count} | \`${row.failure_code}\` |`
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
    schema: "breather-preledger-proof-interval-engine-audit-v9",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_v9_separator_assignment_no_go_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      range_backend: "imported from proof-interval-v8",
      policy_backend: "deterministic separator-assignment no-go audit over imported v8 candidate core table",
      binary64_endpoint_use: "none_added_by_v9",
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_subrows: ledger.summary.certified_simple_root_subrows,
      separator_assignments_accepted_by_v9: ledger.summary.accepted_separator_assignments_by_v9,
      parent_complement_strips_accepted_by_v9: ledger.summary.accepted_parent_complement_strips_by_v9,
      fold_layer_rows: 0,
    },
    constructed_scope: {
      regular_boundary_candidate_families_imported_from_v8:
        ledger.summary.finite_regular_boundary_candidate_families_imported_from_v8,
      regular_boundary_candidate_cores_imported_from_v8:
        ledger.summary.regular_boundary_candidate_cores_imported_from_v8,
      separator_assignment_methods_tested: ledger.summary.separator_assignment_methods_tested,
      separator_assignment_method_evaluations: ledger.summary.separator_assignment_method_evaluations,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      split_required_parent_complement_strips: ledger.summary.split_required_parent_complement_strips,
      parent_complement_failure_code_counts: ledger.parent_complement_blocking_summary,
      regular_boundary_failure_code_counts: ledger.regular_boundary_field_failure_summary,
    },
    limitations: [
      "This is a separator-assignment no-go audit, not a full null-coordinate preledger.",
      "The no-go is limited to current packet fields imported from v8 and same-packet inputs.",
      "Rows left as split_required block branch-chart authorization.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  return `# Fresh Proof-Interval Preledger v9 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v9 sidecar imports the v8 finite regular-boundary
candidate families and tests whether the current same-packet data certify a
single separator assignment for any residual regular-boundary core.

v9 proves a narrow no-go for the current fields. For each imported core
$C$, the v8 adjacency set $\\operatorname{Adj}(C)$ has cardinality 2, while
the packet has no accepted ownership selector $o(C)$ and no exact singleton
separator field. Therefore no current core has a certified singleton
$\\{s(C)\\}$. Side labels, endpoint adjacency without ownership, array order,
separator order, and family order are explicitly rejected as certificates.

This is a sharper blocker, not a passed pre-ledger. Zero separator assignments
are accepted, zero parent-complement strips are accepted, and zero simple-root
parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v8 | ${ledger.summary.base_rows} |
| Empty rows inherited from v8 | ${ledger.summary.certified_empty_base_rows} |
| Simple-root subrows inherited from v8 | ${ledger.summary.certified_simple_root_subrows} |
| Parent-complement strips probed | ${ledger.summary.parent_complement_strips} |
| Regular-boundary candidate cores imported from v8 | ${ledger.summary.regular_boundary_candidate_cores_imported_from_v8} |
| Finite candidate families imported from v8 | ${ledger.summary.finite_regular_boundary_candidate_families_imported_from_v8} |
| Candidate membership edges imported from v8 | ${ledger.summary.finite_regular_boundary_candidate_membership_edges_imported_from_v8} |
| Separator-assignment methods tested | ${ledger.summary.separator_assignment_methods_tested} |
| Separator-assignment method evaluations | ${ledger.summary.separator_assignment_method_evaluations} |
| Ambiguous two-separator cores | ${ledger.summary.ambiguous_two_separator_cores} |
| Unique candidate-membership assignments | ${ledger.summary.unique_candidate_membership_assignments} |
| Exact single separator assignments certified | ${ledger.summary.exact_single_separator_assignments_certified} |
| Separator assignments accepted by v9 | ${ledger.summary.accepted_separator_assignments_by_v9} |
| Heuristic assignments rejected | ${ledger.summary.heuristic_assignments_rejected} |
| Same-packet inclusion proofs certified | ${ledger.summary.same_packet_inclusion_proofs_certified} |
| Domination inequalities certified | ${ledger.summary.domination_inequalities_certified} |
| Topology/no-double-counting certificates | ${ledger.summary.topology_no_double_counting_certified} |
| Non-core complement closures certified | ${ledger.summary.non_core_complement_closures_certified} |
| Parent-complement strips accepted by v9 | ${ledger.summary.accepted_parent_complement_strips_by_v9} |
| Parent-complement strips still split-required | ${ledger.summary.split_required_parent_complement_strips} |
| Simple-root parent rows consumed by v9 | ${ledger.summary.simple_root_parent_rows_consumed_by_v9} |
| Split-required base rows | ${ledger.summary.split_required_base_rows} |

Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The exact backend certificate is
\`${path.basename(backendPath)}\`; the engine audit is
\`${path.basename(auditPath)}\`.

## Backend Meaning

Let $\\operatorname{Adj}(C)$ denote the candidate separator set recorded by
v8 for a residual regular-boundary core $C$. v9 uses the acceptance rule

$$
\\text{accepted\\_separator}(C)
\\Rightarrow
\\left|\\{s(C)\\}\\right|=1
\\quad\\text{and}\\quad
s(C)\\in\\operatorname{Adj}(C),
$$

where the singleton must be supplied by an exact field or by an accepted
topology ownership convention. The current packet satisfies
$|\\operatorname{Adj}(C)|=2$ for all 10 imported cores and supplies no
accepted selector. Therefore the selector field is currently underdetermined.

## Methods Tested

| Method | Meaning |
| --- | --- |
${methodTable(ledger.separator_assignment_no_go_summary.methods_tested)}

## Candidate Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Candidate count | Failure code |
| --- | --- | --- | --- | ---: | --- |
${coreTable(ledger.regular_boundary_candidate_core_table_v9)}

## Separator-Assignment Failure Summary

| Failure code | Cores |
| --- | ---: |
${failureTable(ledger.separator_assignment_failure_summary)}

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Split-required strips | Status |
| --- | --- | ---: | ---: | --- |
${parentSummaryTable(ledger.parent_complement_summaries)}

## Next Certificate Action

The next proof advance must supply one of two missing mathematical objects:
an exact core-to-separator assignment certificate for each imported residual
core, or a topology/no-double-counting ownership convention that selects one
separator from each two-element adjacency set. Without one of those objects,
regular-boundary coverage remains blocked before inclusion, domination, and
non-core complement closure can consume rows.

## Capture Decision

Priority-only. This sidecar proves a current-packet separator-assignment no-go
inside the breather proof program, but it is not a passed pre-ledger and not
reader-facing AAA prose.
`;
}

function readSources(args) {
  return {
    v8Source: readJsonArtifact(args.v8Ledger),
    v8BackendSource: readJsonArtifact(args.v8Backend),
    v8AuditSource: readJsonArtifact(args.v8Audit),
    v8ReportSource: readTextArtifact(args.v8Report),
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
        separator_assignment_failure_summary: ledger.separator_assignment_failure_summary,
      },
      null,
      2
    )
  );
}

main();
