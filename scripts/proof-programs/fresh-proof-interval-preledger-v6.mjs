#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-complement-ownership-v6`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v6`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_V5_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v5.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const DEFAULT_V5_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v5.json`;
const DEFAULT_V5_AUDIT = `${CERT_DIR}/preledger_interval_engine_audit.${PACKET_ID}.proof-interval-v5.json`;
const DEFAULT_V5_REPORT = `${CERT_DIR}/causal_preledger_interval_report.${PACKET_ID}.proof-interval-v5.md`;

const POLICY_SOURCE_DEFAULTS = {
  parent_complement_contract: `${CERT_DIR}/fold_parent_boundary_complement_packet.md`,
  endpoint_contract: `${CERT_DIR}/fold_parent_endpoint_contract_extension.md`,
  fold_family_membership_attempt: `${CERT_DIR}/fold_parent_fold_family_membership_attempt.md`,
  regular_boundary_contract_probe: `${CERT_DIR}/fold_parent_regular_boundary_contract_probe.md`,
  regular_boundary_coverage_attempt: `${CERT_DIR}/fold_parent_regular_boundary_coverage_attempt.md`,
};

const ACCEPTED_ALTERNATIVES = [
  "strict_range_empty",
  "endpoint_topology_owned",
  "exact_fold_family_covered",
  "regular_boundary_covered",
];

function parseArgs(argv) {
  const args = {
    v5Ledger: DEFAULT_V5_LEDGER,
    v5Backend: DEFAULT_V5_BACKEND,
    v5Audit: DEFAULT_V5_AUDIT,
    v5Report: DEFAULT_V5_REPORT,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    outDir: DEFAULT_OUT_DIR,
    policySources: { ...POLICY_SOURCE_DEFAULTS },
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--v5-ledger") {
      args.v5Ledger = argv[++i];
    } else if (arg === "--v5-backend") {
      args.v5Backend = argv[++i];
    } else if (arg === "--v5-audit") {
      args.v5Audit = argv[++i];
    } else if (arg === "--v5-report") {
      args.v5Report = argv[++i];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--parent-complement-contract") {
      args.policySources.parent_complement_contract = argv[++i];
    } else if (arg === "--endpoint-contract") {
      args.policySources.endpoint_contract = argv[++i];
    } else if (arg === "--fold-family-membership-attempt") {
      args.policySources.fold_family_membership_attempt = argv[++i];
    } else if (arg === "--regular-boundary-contract-probe") {
      args.policySources.regular_boundary_contract_probe = argv[++i];
    } else if (arg === "--regular-boundary-coverage-attempt") {
      args.policySources.regular_boundary_coverage_attempt = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v6.mjs [options]

Options:
  --v5-ledger PATH                         Proof-interval-v5 sidecar ledger JSON. Defaults to ${DEFAULT_V5_LEDGER}.
  --v5-backend PATH                        Proof-interval-v5 backend certificate JSON. Defaults to ${DEFAULT_V5_BACKEND}.
  --v5-audit PATH                          Proof-interval-v5 engine audit JSON. Defaults to ${DEFAULT_V5_AUDIT}.
  --v5-report PATH                         Proof-interval-v5 report markdown. Defaults to ${DEFAULT_V5_REPORT}.
  --fold-layer-burden PATH                 Fresh fold-layer burden JSON. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --parent-complement-contract PATH        Parent-complement policy source.
  --endpoint-contract PATH                 Endpoint/topology policy source.
  --fold-family-membership-attempt PATH    Fold-family membership policy source.
  --regular-boundary-contract-probe PATH   Regular-boundary contract source.
  --regular-boundary-coverage-attempt PATH Regular-boundary coverage source.
  --out-dir PATH                           Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                 Pretty-print JSON artifact.
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

function countBy(rows, field) {
  const result = {};
  for (const row of rows) {
    const key = row[field] || "none";
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function policyArtifactRecord(source) {
  return {
    path: source.basename,
    sha256: source.sha256,
    bytes: source.bytes,
  };
}

function sourceArtifacts(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources) {
  const policy = {};
  for (const [name, source] of Object.entries(policySources)) {
    policy[name] = policyArtifactRecord(source);
  }
  return {
    proof_interval_v5_ledger: policyArtifactRecord(v5Source),
    proof_interval_v5_backend_certificate: policyArtifactRecord(v5BackendSource),
    proof_interval_v5_engine_audit: policyArtifactRecord(v5AuditSource),
    proof_interval_v5_report: policyArtifactRecord(v5ReportSource),
    fresh_fold_layer_burden: policyArtifactRecord(foldLayerBurdenSource),
    policy,
  };
}

function relevantFoldFamilies(strip) {
  if (strip.ledger === "w") {
    return ["Sigma_1", "Sigma_2"];
  }
  if (strip.ledger === "u") {
    return ["Sigma_3", "Sigma_4"];
  }
  return [];
}

function hasAcceptedFoldLayerRows(foldLayerBurden) {
  return Number.isFinite(foldLayerBurden.accepted_fold_layer_rows) && foldLayerBurden.accepted_fold_layer_rows > 0;
}

function strictRangeEmptyProbe(strip) {
  if (strip.status === "empty") {
    return {
      status: "accepted",
      method: "proof_interval_v5_parent_complement_trig_range_empty",
      failure_code: "",
      root_count_bound: [0, 0],
      evidence: {
        range_gap: strip.range_gap,
        range_gap_q: strip.range_gap_q,
        range_relation: strip.range_relation,
      },
    };
  }
  return {
    status: "rejected",
    method: null,
    failure_code: strip.failure_code || "parent_complement_strict_range_empty_absent",
    root_count_bound: null,
    evidence: {
      range_gap: strip.range_gap,
      range_gap_q: strip.range_gap_q,
      range_relation: strip.range_relation,
    },
  };
}

function endpointTopologyProbe(strip) {
  const positiveWidthOverlap = strip.range_relation === "overlap";
  return {
    status: "rejected",
    method: null,
    failure_code: positiveWidthOverlap
      ? "endpoint_topology_positive_width_overlap_not_endpoint_contact"
      : "endpoint_topology_contact_table_and_ownership_absent",
    root_count_bound: null,
    required_fields: [
      "finite_endpoint_contact_set",
      "no_off_endpoint_crossing_proof",
      "per_contact_memory_depth_or_zero_depth_exclusion",
      "positive_separation_after_deleting_contacts",
      "root_count_bound_[0,0]",
      "complement_boundary_topology_ownership",
    ],
    evidence: {
      range_relation: strip.range_relation,
      endpoint_contact_only: !positiveWidthOverlap,
      topology_ownership_certified: false,
    },
  };
}

function foldFamilyProbe(strip, foldLayerBurden) {
  return {
    status: "rejected",
    method: null,
    failure_code: hasAcceptedFoldLayerRows(foldLayerBurden)
      ? "fold_family_exact_membership_not_recorded_for_complement_strip"
      : "fold_family_coverage_no_accepted_same_packet_fold_layer_membership",
    root_count_bound: null,
    required_fields: [
      "same_packet_accepted_fold_layer_row",
      "exact_complement_membership_in_separator_family",
      "finite_I_fold_eta_epsilon_c_Sigma",
      "alpha_Sigma_positive",
      "nu_exit_Sigma_positive",
      "Delta_N_even",
      "Delta_D_zero",
    ],
    evidence: {
      relevant_separator_families: relevantFoldFamilies(strip),
      receiver_interval: strip.receiver_interval,
      source_interval: strip.source_interval,
      same_packet_fold_layer_burden_status: foldLayerBurden.status,
      same_packet_accepted_fold_layer_rows: foldLayerBurden.accepted_fold_layer_rows ?? 0,
      exact_fold_family_membership_recorded: false,
    },
  };
}

function regularBoundaryProbe(strip) {
  return {
    status: "rejected",
    method: null,
    failure_code: "regular_boundary_coverage_same_packet_fields_absent",
    root_count_bound: null,
    required_fields: [
      "finite_regular_boundary_family_definition",
      "residual_core_table",
      "separator_assignment",
      "same_packet_inclusion_proof",
      "domination_inequality_or_enlarged_same_packet_ceiling",
      "topology_and_no_double_counting",
      "non_core_complement_closure",
    ],
    evidence: {
      finite_family_defined: false,
      exact_inclusion_proven: false,
      domination_proven: false,
      topology_ownership_certified: false,
      no_double_counting_certified: false,
      non_core_strict_gap_closure_certified: false,
    },
  };
}

function chooseAcceptedAlternative(probes) {
  for (const alternative of ACCEPTED_ALTERNATIVES) {
    if (probes[alternative]?.status === "accepted") {
      return alternative;
    }
  }
  return null;
}

function enrichStrip(strip, foldLayerBurden, index) {
  const probes = {
    strict_range_empty: strictRangeEmptyProbe(strip),
    endpoint_topology_owned: endpointTopologyProbe(strip),
    exact_fold_family_covered: foldFamilyProbe(strip, foldLayerBurden),
    regular_boundary_covered: regularBoundaryProbe(strip),
  };
  const acceptedAlternative = chooseAcceptedAlternative(probes);
  const status = acceptedAlternative ? "accepted_parent_complement" : "split_required";
  const failureCodes = Object.values(probes)
    .filter((probe) => probe.status !== "accepted")
    .map((probe) => probe.failure_code);

  return {
    strip_id: strip.strip_id.replace("_v5_", "_v6_"),
    source_v5_strip_id: strip.strip_id,
    imported_v5_strip_id: strip.strip_id,
    imported_v5_range_relation: strip.range_relation,
    imported_v5_failure_code: strip.failure_code,
    strip_index: index + 1,
    parent_base_row_id: strip.parent_base_row_id,
    simple_root_subrow_id: strip.simple_root_subrow_id,
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    receiver_interval: strip.receiver_interval,
    source_interval: strip.source_interval,
    ledger: strip.ledger,
    side: strip.side,
    receiver_theta_range: strip.receiver_theta_range,
    source_theta_range: strip.source_theta_range,
    receiver_theta_range_q: strip.receiver_theta_range_q,
    source_theta_range_q: strip.source_theta_range_q,
    receiver_range: strip.receiver_range,
    source_range: strip.source_range,
    receiver_range_q: strip.receiver_range_q,
    source_range_q: strip.source_range_q,
    range_relation: strip.range_relation,
    range_gap: strip.range_gap,
    range_gap_q: strip.range_gap_q,
    accepted_alternative: acceptedAlternative,
    status,
    v6_status: status,
    v6_certificate_status: acceptedAlternative
      ? "parent_complement_accepted_by_v6_alternative"
      : "parent_complement_ownership_coverage_split_required",
    ownership_policy_tested: ACCEPTED_ALTERNATIVES,
    ownership_policy_result: acceptedAlternative ?? "none_satisfied",
    endpoint_ownership_certified: false,
    endpoint_owner: null,
    coverage_certificate_ref: null,
    coverage_certificate_status: "absent",
    root_count_bound: acceptedAlternative ? [0, 0] : null,
    probes,
    failure_code: acceptedAlternative ? "" : "no_parent_complement_acceptance_alternative_satisfied",
    v6_failure_code: acceptedAlternative ? "" : "no_parent_complement_acceptance_alternative_satisfied",
    failure_reasons: acceptedAlternative
      ? []
      : [
          "strict_range_empty_failed_in_v5",
          "endpoint_topology_ownership_absent_or_positive_width_overlap",
          "exact_fold_family_coverage_absent",
          "regular_boundary_inclusion_domination_and_ownership_fields_absent",
        ],
    v6_failure_reasons: acceptedAlternative
      ? []
      : [
          "strict_range_empty_failed_in_v5",
          "endpoint_topology_ownership_absent_or_positive_width_overlap",
          "exact_fold_family_coverage_absent",
          "regular_boundary_inclusion_domination_and_ownership_fields_absent",
        ],
    failure_codes_by_alternative: failureCodes,
    notes: acceptedAlternative
      ? `Parent complement accepted by ${acceptedAlternative}.`
      : "Parent complement remains unresolved because none of the accepted alternatives is satisfied on the fresh same-packet data.",
  };
}

function buildParentSummaries(v5Ledger, strips) {
  return v5Ledger.parent_complement_summaries.map((summary) => {
    const ownedStrips = strips.filter((strip) => strip.simple_root_subrow_id === summary.simple_root_subrow_id);
    const accepted = ownedStrips.filter((strip) => strip.status === "accepted_parent_complement");
    const split = ownedStrips.filter((strip) => strip.status === "split_required");
    const parentConsumed = ownedStrips.length > 0 && split.length === 0;
    return {
      parent_base_row_id: summary.parent_base_row_id,
      simple_root_subrow_id: summary.simple_root_subrow_id,
      source_v5_summary_status: summary.status,
      complement_strips: ownedStrips.map((strip) => strip.strip_id),
      complement_strip_count: ownedStrips.length,
      accepted_complement_strips: accepted.length,
      split_required_complement_strips: split.length,
      parent_consumed_by_v6: parentConsumed,
      status: parentConsumed ? "parent_consumed_by_v6" : "parent_complements_split_required",
      blocker: parentConsumed ? "" : "one_or_more_parent_complement_strips_lack_accepted_ownership_or_coverage",
    };
  });
}

function buildBackendCertificate(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources) {
  return {
    schema: "breather-proof-interval-complement-ownership-certificate-v6",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_v6_complement_ownership_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: sourceArtifacts(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources),
    accepted_alternatives_tested: ACCEPTED_ALTERNATIVES,
    pass_rule:
      "A simple-root parent row is consumed only if the imported simple-root subrow remains accepted and every receiver-side complement strip satisfies one accepted alternative: strict range-empty, endpoint/topology ownership, exact same-packet fold-family coverage, or accepted same-packet regular-boundary coverage.",
    same_packet_fold_layer_policy:
      "Historical fold constants and fold-family attempts are policy references only for this fresh packet. v6 accepts fold-family coverage only from same-packet accepted fold-layer rows and exact strip membership, neither of which is present.",
    regular_boundary_policy:
      "Regular-boundary coverage is accepted only with finite same-packet family definition, exact inclusion, domination, topology/no-double-counting, and non-core complement closure fields.",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
    },
  };
}

function assertImportedV5(v5Ledger) {
  if (v5Ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v5") {
    throw new Error("Proof-interval-v5 ledger schema mismatch.");
  }
  if (v5Ledger.preledger_pass || v5Ledger.updates_live_ledger || v5Ledger.branch_chart_authorized) {
    throw new Error("Imported v5 ledger unexpectedly authorizes a live preledger or branch chart.");
  }
  if (v5Ledger.summary?.certified_simple_root_subrows !== 6) {
    throw new Error("Proof-interval-v5 ledger is missing the expected six simple-root subrows.");
  }
  if (!Array.isArray(v5Ledger.parent_complement_strips)) {
    throw new Error("Proof-interval-v5 ledger is missing parent_complement_strips.");
  }
  if (v5Ledger.summary?.parent_complement_strips !== v5Ledger.parent_complement_strips.length) {
    throw new Error("Proof-interval-v5 parent-complement strip count mismatch.");
  }
}

function assertV6Guards(ledger) {
  if (ledger.preledger_pass || ledger.updates_live_ledger || ledger.branch_chart_authorized) {
    throw new Error("v6 authorization guard failed.");
  }
  for (const strip of ledger.parent_complement_strips) {
    if (strip.imported_v5_range_relation === "overlap" && strip.accepted_alternative === "endpoint_topology_owned") {
      throw new Error(`v6 endpoint ownership accepted an overlap strip: ${strip.strip_id}`);
    }
  }
  for (const parent of ledger.parent_complement_summaries) {
    const strips = ledger.parent_complement_strips.filter((strip) => strip.simple_root_subrow_id === parent.simple_root_subrow_id);
    if (parent.parent_consumed_by_v6 && strips.some((strip) => strip.status === "split_required")) {
      throw new Error(`v6 consumed parent with split-required complement: ${parent.parent_base_row_id}`);
    }
  }
}

function buildLedger(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources) {
  const v5Ledger = v5Source.data;
  const foldLayerBurden = foldLayerBurdenSource.data;

  assertImportedV5(v5Ledger);
  if (v5Ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected v5 packet_id ${PACKET_ID}`);
  }
  if (v5Ledger.summary?.parent_complement_strips !== 10 || !Array.isArray(v5Ledger.parent_complement_strips)) {
    throw new Error("Proof-interval-v5 ledger is missing the expected 10 parent-complement strips.");
  }
  if (foldLayerBurden.packet_id !== PACKET_ID) {
    throw new Error(`Expected fresh fold-layer burden packet_id ${PACKET_ID}`);
  }

  const strips = v5Ledger.parent_complement_strips.map((strip, index) => enrichStrip(strip, foldLayerBurden, index));
  const acceptedStrips = strips.filter((strip) => strip.status === "accepted_parent_complement");
  const splitStrips = strips.filter((strip) => strip.status === "split_required");
  const parentSummaries = buildParentSummaries(v5Ledger, strips);
  const consumedParents = parentSummaries.filter((summary) => summary.parent_consumed_by_v6);
  const endpointRejected = strips.filter((strip) => strip.probes.endpoint_topology_owned.status === "rejected");
  const foldFamilyRejected = strips.filter((strip) => strip.probes.exact_fold_family_covered.status === "rejected");
  const regularBoundaryRejected = strips.filter((strip) => strip.probes.regular_boundary_covered.status === "rejected");
  const strictRangeEmptyAccepted = strips.filter((strip) => strip.probes.strict_range_empty.status === "accepted");

  const result = {
    backendCertificate: buildBackendCertificate(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources),
    ledger: {
      schema: "breather-causal-ledger-fresh-proof-interval-v6",
      packet_id: PACKET_ID,
      refinement_id: REFINEMENT_ID,
      source_v5_refinement_id: v5Ledger.refinement_id,
      source_input_screen: v5Ledger.source_input_screen,
      source_numeric_artifacts: {
        proof_interval_v5_ledger: path.basename(v5Source.path),
        proof_interval_v5_backend_certificate: path.basename(v5BackendSource.path),
        proof_interval_v5_engine_audit: path.basename(v5AuditSource.path),
      },
      source_artifacts: sourceArtifacts(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources),
      import_policy:
        "v6 imports v5 certified rows, subrows, ranges, and complement strips and tests parent-complement ownership alternatives without recomputing v4/v5 trigonometric classification.",
      status: "proof_interval_v6_complement_ownership_probe_branch_chart_blocked",
      acceptance_level:
        "exact-rational v5 parent-complement strips plus fail-closed endpoint/topology, fold-family, and regular-boundary ownership probe",
      claim_level:
        "priority-only sidecar preserving the v5 range-empty, monotone-diagonal, and simple-root evidence while testing accepted parent-complement ownership alternatives; no complement strip is accepted by v6",
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
      imported_v5_summary: v5Ledger.summary,
      v5_import_summary: v5Ledger.summary,
      common_identity: v5Ledger.common_identity,
      evaluation_policy: {
        ...v5Ledger.evaluation_policy,
        v6_pass_rule:
          "A parent complement is accepted only by one accepted alternative. Since no v6 strip satisfies strict range-empty, endpoint/topology ownership, exact fold-family coverage, or regular-boundary coverage, every parent remains split_required.",
      },
      interval_method: {
        type: "v5_parent_complement_import_plus_policy_probe",
        source_range_backend: v5Ledger.interval_method,
        v6_probe_backend:
          "No new trigonometric range enclosure is computed. v6 imports v5 exact-rational complement ranges and tests accepted ownership and coverage fields against the current same-packet artifact set.",
      },
      summary: {
        base_rows: v5Ledger.summary.base_rows,
        certified_empty_base_rows: v5Ledger.summary.certified_empty_base_rows,
        certified_range_empty_base_rows: v5Ledger.summary.certified_range_empty_base_rows,
        certified_diagonal_exclusion_empty_rows: v5Ledger.summary.certified_diagonal_exclusion_empty_rows,
        certified_simple_root_rows: v5Ledger.summary.certified_simple_root_rows,
        certified_simple_root_subrows: v5Ledger.summary.certified_simple_root_subrows,
        parent_complement_strips: strips.length,
        strict_range_empty_parent_complement_strips: strictRangeEmptyAccepted.length,
        endpoint_topology_owned_strips: 0,
        fold_family_covered_strips: 0,
        regular_boundary_covered_strips: 0,
        accepted_parent_complement_strips_by_v6: acceptedStrips.length,
        split_required_parent_complement_strips: splitStrips.length,
        simple_root_parent_rows_consumed_by_v6: consumedParents.length,
        accepted_fold_layer_rows: 0,
        split_required_base_rows: v5Ledger.summary.split_required_base_rows,
        branch_chart_authorized: false,
      },
      global_margins: {
        ...v5Ledger.global_margins,
        gamma_parent_complement_ownership_display: null,
        pass: false,
      },
      ownership_probe_summary: {
        strict_range_empty_accepted: strictRangeEmptyAccepted.length,
        endpoint_topology_rejected: endpointRejected.length,
        fold_family_rejected: foldFamilyRejected.length,
        regular_boundary_rejected: regularBoundaryRejected.length,
        no_accepted_alternative: splitStrips.length,
      },
      parent_complement_blocking_summary: countBy(splitStrips, "failure_code"),
      parent_complement_ownership_blocking_summary: countBy(splitStrips, "v6_failure_code"),
      alternative_failure_summary: {
        strict_range_empty: countBy(strips.map((strip) => strip.probes.strict_range_empty), "failure_code"),
        endpoint_topology_owned: countBy(strips.map((strip) => strip.probes.endpoint_topology_owned), "failure_code"),
        exact_fold_family_covered: countBy(strips.map((strip) => strip.probes.exact_fold_family_covered), "failure_code"),
        regular_boundary_covered: countBy(strips.map((strip) => strip.probes.regular_boundary_covered), "failure_code"),
      },
      rows: v5Ledger.rows,
      simple_root_subrows: v5Ledger.simple_root_subrows,
      parent_complement_ownership_tests: ACCEPTED_ALTERNATIVES,
      parent_complement_summaries: parentSummaries,
      parent_complement_summaries_v6: parentSummaries,
      parent_complement_strips: strips,
      parent_complement_strips_v6: strips,
      fold_layer_rows: [],
      limitations: [
        "v6 imports v5 exact-rational complement ranges and does not recompute trigonometric row enclosures.",
        "All 10 receiver-side complement strips remain split_required because no accepted ownership or coverage alternative is present.",
        "Same-packet fold-layer rows are still absent for the fresh packet.",
        "Regular-boundary inclusion, domination, topology ownership, and non-core complement closure fields are absent.",
        "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
      ],
    },
  };
  assertV6Guards(result.ledger);
  return result;
}

function parentSummaryTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.parent_base_row_id}\` | \`${row.simple_root_subrow_id}\` | ${row.complement_strip_count} | ${row.accepted_complement_strips} | ${row.split_required_complement_strips} | \`${row.status}\` |`
    )
    .join("\n");
}

function stripTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.strip_id}\` | \`${row.parent_base_row_id}\` | \`${row.side}\` | \`${row.range_relation}\` | \`${row.probes.strict_range_empty.status}\` | \`${row.probes.endpoint_topology_owned.status}\` | \`${row.probes.exact_fold_family_covered.status}\` | \`${row.probes.regular_boundary_covered.status}\` | \`${row.status}\` |`
    )
    .join("\n");
}

function failureTable(summary) {
  const rows = Object.entries(summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`);
  return rows.length ? rows.join("\n") : "| none | 0 |";
}

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-preledger-proof-interval-engine-audit-v6",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_v6_complement_ownership_probe_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      range_backend: "imported from proof-interval-v5",
      policy_backend: "deterministic field-presence and same-packet acceptance checks",
      binary64_endpoint_use: "none_added_by_v6",
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_subrows: ledger.summary.certified_simple_root_subrows,
      parent_complement_strips_accepted_by_v6: ledger.summary.accepted_parent_complement_strips_by_v6,
      fold_layer_rows: 0,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      split_required_parent_complement_strips: ledger.summary.split_required_parent_complement_strips,
      parent_complement_failure_code_counts: ledger.parent_complement_blocking_summary,
      alternative_failure_code_counts: ledger.alternative_failure_summary,
    },
    limitations: [
      "This is a policy/ownership probe on v5 complement strips, not a full null-coordinate preledger.",
      "The probe accepts no endpoint/topology, fold-family, or regular-boundary coverage because the required same-packet fields are absent.",
      "Rows left as split_required block branch-chart authorization.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  return `# Fresh Proof-Interval Preledger v6 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v6 sidecar imports the proof-interval-v5 complement strips
and tests whether any of the accepted parent-complement alternatives can
consume them without changing the live pre-ledger.

The result is negative: no receiver-side complement strip is accepted by strict
range-empty, endpoint/topology ownership, exact same-packet fold-family
coverage, or same-packet regular-boundary coverage. Therefore zero simple-root
parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v5 | ${ledger.summary.base_rows} |
| Empty rows inherited from v5 | ${ledger.summary.certified_empty_base_rows} |
| Range-empty rows inherited from v5 | ${ledger.summary.certified_range_empty_base_rows} |
| Monotone diagonal exclusions inherited from v5 | ${ledger.summary.certified_diagonal_exclusion_empty_rows} |
| Simple-root subrows inherited from v5 | ${ledger.summary.certified_simple_root_subrows} |
| Parent-complement strips probed | ${ledger.summary.parent_complement_strips} |
| Strict range-empty complement strips | ${ledger.summary.strict_range_empty_parent_complement_strips} |
| Endpoint/topology-owned strips | ${ledger.summary.endpoint_topology_owned_strips} |
| Exact fold-family-covered strips | ${ledger.summary.fold_family_covered_strips} |
| Regular-boundary-covered strips | ${ledger.summary.regular_boundary_covered_strips} |
| Parent-complement strips accepted by v6 | ${ledger.summary.accepted_parent_complement_strips_by_v6} |
| Parent-complement strips still split-required | ${ledger.summary.split_required_parent_complement_strips} |
| Simple-root parent rows consumed by v6 | ${ledger.summary.simple_root_parent_rows_consumed_by_v6} |
| Accepted fold-layer rows | ${ledger.summary.accepted_fold_layer_rows} |
| Split-required base rows | ${ledger.summary.split_required_base_rows} |

Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The exact backend certificate is
\`${path.basename(backendPath)}\`; the engine audit is
\`${path.basename(auditPath)}\`.

## Backend Meaning

v6 does not recompute trigonometric enclosures. It imports the v5 exact-rational
parent-complement strips and applies the current accepted complement
alternatives as a deterministic same-packet field check:

1. strict range-empty uses the v5 complement gap result;
2. endpoint/topology ownership requires finite endpoint-contact and ownership
   fields with no positive-width overlap;
3. exact fold-family coverage requires accepted same-packet fold-layer rows and
   exact strip membership;
4. regular-boundary coverage requires finite same-packet family definition,
   exact inclusion, domination, topology/no-double-counting, and non-core
   complement closure fields.

The fresh packet currently supplies none of the latter three ownership or
coverage packets, and v5 already rejected strict range-empty closure for all
10 strips.

## Parent-Complement Failure Summary

| Failure code | Strips |
| --- | ---: |
${failureTable(ledger.parent_complement_blocking_summary)}

## Alternative Failure Summary

### Strict Range-Empty

| Failure code | Strips |
| --- | ---: |
${failureTable(ledger.alternative_failure_summary.strict_range_empty)}

### Endpoint/Topology Ownership

| Failure code | Strips |
| --- | ---: |
${failureTable(ledger.alternative_failure_summary.endpoint_topology_owned)}

### Exact Fold-Family Coverage

| Failure code | Strips |
| --- | ---: |
${failureTable(ledger.alternative_failure_summary.exact_fold_family_covered)}

### Regular-Boundary Coverage

| Failure code | Strips |
| --- | ---: |
${failureTable(ledger.alternative_failure_summary.regular_boundary_covered)}

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Accepted strips | Split-required strips | Status |
| --- | --- | ---: | ---: | ---: | --- |
${parentSummaryTable(ledger.parent_complement_summaries)}

## Parent-Complement Strips

| Strip | Parent | Side | Range relation | Strict range-empty | Endpoint/topology | Fold family | Regular boundary | Final status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${stripTable(ledger.parent_complement_strips)}

## Next Certificate Action

The next proof advance is not another strict range-empty probe on the same
v5 collars. It must supply one of the missing same-packet ownership or coverage
objects: endpoint/topology ownership with finite contact tables and positive
post-deletion gaps, exact fold-family coverage with accepted fresh fold-layer
rows, finite regular-boundary inclusion and domination fields, or a repaired
successor candidate whose complement collars become strict range-empty.

## Capture Decision

Priority-only. This sidecar is a fail-closed ownership/coverage probe on top of
the v5 exact-rational parent-complement packet. It is not a passed pre-ledger
and not reader-facing AAA prose.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const v5Source = readJsonArtifact(args.v5Ledger);
  const v5BackendSource = readJsonArtifact(args.v5Backend);
  const v5AuditSource = readJsonArtifact(args.v5Audit);
  const v5ReportSource = readTextArtifact(args.v5Report);
  const foldLayerBurdenSource = readJsonArtifact(args.foldLayerBurden);
  const policySources = Object.fromEntries(
    Object.entries(args.policySources).map(([name, sourcePath]) => [name, readTextArtifact(sourcePath)])
  );
  const { backendCertificate, ledger } = buildLedger(v5Source, v5BackendSource, v5AuditSource, v5ReportSource, foldLayerBurdenSource, policySources);
  const outDir = path.resolve(args.outDir);
  const backendPath = path.join(outDir, `preledger_interval_backend_certificate.${OUTPUT_TAG}.json`);
  const ledgerPath = path.join(outDir, `causal_ledger.${OUTPUT_TAG}.json`);
  const reportPath = path.join(outDir, `causal_preledger_interval_report.${OUTPUT_TAG}.md`);
  const auditPath = path.join(outDir, `preledger_interval_engine_audit.${OUTPUT_TAG}.json`);

  writeJson(backendPath, backendCertificate, args.pretty);
  writeJson(ledgerPath, ledger, args.pretty);
  writeJson(auditPath, buildEngineAudit(ledger, backendPath), args.pretty);
  writeText(reportPath, buildReport(ledger, ledgerPath, backendPath, auditPath));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
