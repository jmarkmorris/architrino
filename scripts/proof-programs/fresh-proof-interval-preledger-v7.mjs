#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-same-packet-ownership-data-v7`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v7`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OUT_DIR = CERT_DIR;

const DEFAULT_V6_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_V6_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_V6_AUDIT = `${CERT_DIR}/preledger_interval_engine_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_V6_REPORT = `${CERT_DIR}/causal_preledger_interval_report.${PACKET_ID}.proof-interval-v6.md`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_BLOCKER_ANATOMY = `${CERT_DIR}/fresh_preledger_blocker_anatomy.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_SEED_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;

const POLICY_SOURCE_DEFAULTS = {
  parent_complement_contract: `${CERT_DIR}/fold_parent_boundary_complement_packet.md`,
  endpoint_contract: `${CERT_DIR}/fold_parent_endpoint_contract_extension.md`,
  fold_family_membership_attempt: `${CERT_DIR}/fold_parent_fold_family_membership_attempt.md`,
  regular_boundary_contract_probe: `${CERT_DIR}/fold_parent_regular_boundary_contract_probe.md`,
  regular_boundary_coverage_attempt: `${CERT_DIR}/fold_parent_regular_boundary_coverage_attempt.md`,
  w_positive_overlap_attempt: `${CERT_DIR}/fold_parent_w_positive_overlap_subdivision_attempt.md`,
  u_positive_overlap_attempt: `${CERT_DIR}/fold_parent_u_positive_overlap_subdivision_attempt.md`,
};

const ACCEPTED_ALTERNATIVES = [
  "strict_range_empty",
  "endpoint_topology_owned",
  "exact_fold_family_covered",
  "regular_boundary_covered",
];

const REGULAR_BOUNDARY_REQUIRED_FIELDS = [
  "finite_regular_boundary_family_definition",
  "residual_core_table",
  "separator_assignment",
  "same_packet_inclusion_proof",
  "domination_inequality_or_enlarged_same_packet_ceiling",
  "topology_and_no_double_counting",
  "non_core_complement_closure",
];

function parseArgs(argv) {
  const args = {
    v6Ledger: DEFAULT_V6_LEDGER,
    v6Backend: DEFAULT_V6_BACKEND,
    v6Audit: DEFAULT_V6_AUDIT,
    v6Report: DEFAULT_V6_REPORT,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    blockerAnatomy: DEFAULT_BLOCKER_ANATOMY,
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
    } else if (arg === "--v6-ledger") {
      args.v6Ledger = argv[++i];
    } else if (arg === "--v6-backend") {
      args.v6Backend = argv[++i];
    } else if (arg === "--v6-audit") {
      args.v6Audit = argv[++i];
    } else if (arg === "--v6-report") {
      args.v6Report = argv[++i];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++i];
    } else if (arg === "--blocker-anatomy") {
      args.blockerAnatomy = argv[++i];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++i];
    } else if (arg === "--mesh") {
      args.mesh = argv[++i];
    } else if (arg === "--seed-contract") {
      args.seedContract = argv[++i];
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
    } else if (arg === "--w-positive-overlap-attempt") {
      args.policySources.w_positive_overlap_attempt = argv[++i];
    } else if (arg === "--u-positive-overlap-attempt") {
      args.policySources.u_positive_overlap_attempt = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v7.mjs [options]

Options:
  --v6-ledger PATH                         Proof-interval-v6 sidecar ledger JSON. Defaults to ${DEFAULT_V6_LEDGER}.
  --v6-backend PATH                        Proof-interval-v6 backend certificate JSON. Defaults to ${DEFAULT_V6_BACKEND}.
  --v6-audit PATH                          Proof-interval-v6 engine audit JSON. Defaults to ${DEFAULT_V6_AUDIT}.
  --v6-report PATH                         Proof-interval-v6 report markdown. Defaults to ${DEFAULT_V6_REPORT}.
  --fold-layer-burden PATH                 Fresh fold-layer burden JSON. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --blocker-anatomy PATH                   Fresh blocker anatomy JSON. Defaults to ${DEFAULT_BLOCKER_ANATOMY}.
  --input-screen PATH                      Fresh input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --mesh PATH                              Fresh mesh JSON. Defaults to ${DEFAULT_MESH}.
  --seed-contract PATH                     Fresh seed contract JSON. Defaults to ${DEFAULT_SEED_CONTRACT}.
  --parent-complement-contract PATH        Parent-complement policy source.
  --endpoint-contract PATH                 Endpoint/topology policy source.
  --fold-family-membership-attempt PATH    Fold-family membership policy source.
  --regular-boundary-contract-probe PATH   Regular-boundary contract source.
  --regular-boundary-coverage-attempt PATH Regular-boundary coverage source.
  --w-positive-overlap-attempt PATH        Historical w positive-overlap source.
  --u-positive-overlap-attempt PATH        Historical u positive-overlap source.
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

function countBy(rows, field) {
  const result = {};
  for (const row of rows) {
    const key = row[field] || "none";
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function sourceArtifacts(sources) {
  const policy = {};
  for (const [name, source] of Object.entries(sources.policySources)) {
    policy[name] = artifactRecord(source);
  }
  return {
    proof_interval_v6_ledger: artifactRecord(sources.v6Source),
    proof_interval_v6_backend_certificate: artifactRecord(sources.v6BackendSource),
    proof_interval_v6_engine_audit: artifactRecord(sources.v6AuditSource),
    proof_interval_v6_report: artifactRecord(sources.v6ReportSource),
    fresh_fold_layer_burden: artifactRecord(sources.foldLayerBurdenSource),
    fresh_preledger_blocker_anatomy: artifactRecord(sources.blockerAnatomySource),
    fresh_input_screen: artifactRecord(sources.inputScreenSource),
    fresh_mesh: artifactRecord(sources.meshSource),
    fresh_seed_contract: artifactRecord(sources.seedContractSource),
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

function intervalMap(inputScreen) {
  const intervals = inputScreen.intervals;
  if (!Array.isArray(intervals)) {
    throw new Error("Fresh input screen is missing intervals.");
  }
  return new Map(intervals.map((interval) => [interval.interval_id, interval]));
}

function foldRowsBySeparator(foldLayerBurden) {
  const rows = Array.isArray(foldLayerBurden.rows) ? foldLayerBurden.rows : [];
  const bySeparator = new Map();
  for (const row of rows) {
    const key = row.separator_event;
    if (!bySeparator.has(key)) {
      bySeparator.set(key, []);
    }
    bySeparator.get(key).push(row);
  }
  return bySeparator;
}

function isAcceptedSamePacketFoldRow(row) {
  return (
    row &&
    row.packet_id === PACKET_ID &&
    row.row_may_become === "fold_layer" &&
    Array.isArray(row.missing_fields) &&
    row.missing_fields.length === 0 &&
    row.branch_chart_authorized === false &&
    Number.isFinite(row.alpha_floor) &&
    row.alpha_floor > 0 &&
    Number.isFinite(row.exit_floor) &&
    row.exit_floor > 0 &&
    Number.isFinite(row.I_fold_eta_epsilon_c_Sigma)
  );
}

function adjacentSeparators(intervalId, intervals) {
  const interval = intervals.get(intervalId);
  if (!interval) {
    return [];
  }
  if (interval.separator_event) {
    return [interval.separator_event];
  }
  const entries = [...intervals.values()].sort((left, right) => left.order - right.order);
  const index = entries.findIndex((entry) => entry.interval_id === intervalId);
  const neighbors = [entries[index - 1], entries[index + 1]];
  return unique(
    neighbors
      .filter((neighbor) => neighbor?.type === "fold_layer_candidate")
      .map((neighbor) => neighbor.separator_event)
  );
}

function candidateSeparatorAssignments(strip, intervals) {
  const allowed = new Set(relevantFoldFamilies(strip));
  const adjacent = unique([
    ...adjacentSeparators(strip.receiver_interval, intervals),
    ...adjacentSeparators(strip.source_interval, intervals),
  ]);
  return adjacent.filter((separator) => allowed.has(separator));
}

function endpointDataProbe(strip) {
  if (strip.imported_v5_range_relation === "overlap" || strip.range_relation === "overlap") {
    return {
      status: "rejected",
      construction_status: "not_endpoint_contact",
      failure_code: "endpoint_topology_positive_width_overlap_not_endpoint_contact",
      accepted: false,
      finite_endpoint_contact_set: [],
      required_fields_present: {
        finite_endpoint_contact_set: false,
        no_off_endpoint_crossing_proof: false,
        per_contact_memory_depth_or_zero_depth_exclusion: false,
        positive_separation_after_deleting_contacts: false,
        root_count_bound_zero: false,
        complement_boundary_topology_ownership: false,
      },
      evidence: {
        range_relation: strip.range_relation,
        imported_v5_range_relation: strip.imported_v5_range_relation,
        receiver_range_q: strip.receiver_range_q,
        source_range_q: strip.source_range_q,
      },
    };
  }

  return {
    status: "rejected",
    construction_status: "endpoint_contact_certificate_fields_absent",
    failure_code: "endpoint_topology_contact_table_and_ownership_absent",
    accepted: false,
    finite_endpoint_contact_set: [],
    required_fields_present: {
      finite_endpoint_contact_set: false,
      no_off_endpoint_crossing_proof: false,
      per_contact_memory_depth_or_zero_depth_exclusion: false,
      positive_separation_after_deleting_contacts: false,
      root_count_bound_zero: false,
      complement_boundary_topology_ownership: false,
    },
    evidence: {
      range_relation: strip.range_relation,
      imported_v5_range_relation: strip.imported_v5_range_relation,
    },
  };
}

function foldFamilyDataProbe(strip, foldRows) {
  const relevantSeparators = relevantFoldFamilies(strip);
  const candidateRows = relevantSeparators.flatMap((separator) => foldRows.get(separator) ?? []);
  const exactMatches = candidateRows.filter(
    (row) =>
      row.ledger === strip.ledger &&
      row.receiver_interval === strip.receiver_interval &&
      row.source_interval === strip.source_interval
  );
  const acceptedCandidateRows = candidateRows.filter(isAcceptedSamePacketFoldRow);
  const acceptedExactMatches = exactMatches.filter(isAcceptedSamePacketFoldRow);
  const accepted = acceptedExactMatches.length > 0;

  return {
    status: accepted ? "accepted" : "rejected",
    construction_status: accepted ? "accepted_exact_same_packet_fold_row" : "candidate_rows_present_no_accepted_exact_membership",
    failure_code: accepted
      ? ""
      : acceptedCandidateRows.length === 0
        ? "fold_family_coverage_no_accepted_same_packet_fold_layer_membership"
        : "fold_family_exact_membership_not_recorded_for_complement_strip",
    accepted,
    relevant_separator_families: relevantSeparators,
    same_packet_fold_rows_considered: candidateRows.map((row) => row.row_id),
    exact_membership_rows: exactMatches.map((row) => row.row_id),
    accepted_exact_membership_rows: acceptedExactMatches.map((row) => row.row_id),
    required_fields_present: {
      same_packet_accepted_fold_layer_row: acceptedExactMatches.length > 0,
      exact_complement_membership_in_separator_family: exactMatches.length > 0,
      finite_I_fold_eta_epsilon_c_Sigma: acceptedExactMatches.some((row) => Number.isFinite(row.I_fold_eta_epsilon_c_Sigma)),
      alpha_Sigma_positive: acceptedExactMatches.some((row) => row.alpha_floor > 0),
      nu_exit_Sigma_positive: acceptedExactMatches.some((row) => row.exit_floor > 0),
      Delta_N_even: acceptedExactMatches.some((row) => Number.isInteger(row.delta_root_count) && row.delta_root_count % 2 === 0),
      Delta_D_zero: acceptedExactMatches.some((row) => row.delta_signed_degree === 0),
    },
  };
}

function regularBoundaryDataProbe(strip, intervals) {
  const assignments = candidateSeparatorAssignments(strip, intervals);
  const candidateCore = {
    core_id: strip.strip_id.replace("_v6_", "_v7_reg_boundary_core_"),
    source_v6_strip_id: strip.strip_id,
    parent_base_row_id: strip.parent_base_row_id,
    ledger: strip.ledger,
    side: strip.side,
    receiver_interval: strip.receiver_interval,
    source_interval: strip.source_interval,
    receiver_theta_range: strip.receiver_theta_range,
    source_theta_range: strip.source_theta_range,
    candidate_separator_assignments: assignments,
    assignment_status: assignments.length === 1 ? "single_candidate_not_certified" : "nonunique_or_absent_candidate_not_certified",
  };
  const requiredFields = {
    finite_regular_boundary_family_definition: false,
    residual_core_table: true,
    separator_assignment: assignments.length === 1 ? "candidate_only" : false,
    same_packet_inclusion_proof: false,
    domination_inequality_or_enlarged_same_packet_ceiling: false,
    topology_and_no_double_counting: false,
    non_core_complement_closure: false,
  };

  return {
    status: "rejected",
    construction_status: "candidate_core_table_constructed_but_not_accepted",
    failure_code: "regular_boundary_coverage_same_packet_fields_absent",
    accepted: false,
    candidate_core: candidateCore,
    required_fields: REGULAR_BOUNDARY_REQUIRED_FIELDS,
    required_fields_present: requiredFields,
    finite_family_candidate_name: `overline_F_${strip.ledger}_${candidateCore.core_id}`,
    evidence: {
      residual_core_table_constructed_by_v7: true,
      exact_single_separator_assignment_certified: false,
      same_packet_inclusion_proof_certified: false,
      domination_inequality_certified: false,
      topology_and_no_double_counting_certified: false,
      non_core_complement_closure_certified: false,
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

function enrichStrip(strip, foldRows, intervals, index) {
  const probes = {
    strict_range_empty: strip.probes?.strict_range_empty ?? {
      status: "rejected",
      failure_code: "strict_range_empty_not_accepted_by_imported_v6",
    },
    endpoint_topology_owned: endpointDataProbe(strip),
    exact_fold_family_covered: foldFamilyDataProbe(strip, foldRows),
    regular_boundary_covered: regularBoundaryDataProbe(strip, intervals),
  };
  const acceptedAlternative = chooseAcceptedAlternative(probes);
  const status = acceptedAlternative ? "accepted_parent_complement" : "split_required";
  const failureCodes = Object.values(probes)
    .filter((probe) => probe.status !== "accepted")
    .map((probe) => probe.failure_code);

  return {
    strip_id: strip.strip_id.replace("_v6_", "_v7_"),
    source_v6_strip_id: strip.strip_id,
    source_v5_strip_id: strip.source_v5_strip_id,
    imported_v6_status: strip.status,
    imported_v6_failure_code: strip.failure_code,
    imported_v6_range_relation: strip.range_relation,
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
    v7_status: status,
    v7_certificate_status: acceptedAlternative
      ? "parent_complement_accepted_by_v7_same_packet_data"
      : "parent_complement_same_packet_ownership_data_split_required",
    ownership_policy_tested: ACCEPTED_ALTERNATIVES,
    ownership_policy_result: acceptedAlternative ?? "none_satisfied",
    same_packet_endpoint_table: probes.endpoint_topology_owned,
    same_packet_fold_family_membership: probes.exact_fold_family_covered,
    same_packet_regular_boundary_core: probes.regular_boundary_covered,
    endpoint_ownership_certified: probes.endpoint_topology_owned.accepted,
    endpoint_owner: null,
    coverage_certificate_ref: acceptedAlternative ? `${REFINEMENT_ID}:${acceptedAlternative}` : null,
    coverage_certificate_status: acceptedAlternative ? "accepted" : "absent",
    root_count_bound: acceptedAlternative ? [0, 0] : null,
    probes,
    failure_code: acceptedAlternative ? "" : "no_parent_complement_acceptance_alternative_satisfied",
    v7_failure_code: acceptedAlternative ? "" : "no_parent_complement_acceptance_alternative_satisfied",
    failure_reasons: acceptedAlternative
      ? []
      : [
          "strict_range_empty_failed_in_imported_v6",
          "endpoint_contact_table_not_constructed_for_positive_width_overlap",
          "exact_same_packet_fold_family_membership_not_accepted",
          "regular_boundary_candidate_core_lacks_inclusion_domination_and_ownership_fields",
        ],
    v7_failure_reasons: acceptedAlternative
      ? []
      : [
          "strict_range_empty_failed_in_imported_v6",
          "endpoint_contact_table_not_constructed_for_positive_width_overlap",
          "exact_same_packet_fold_family_membership_not_accepted",
          "regular_boundary_candidate_core_lacks_inclusion_domination_and_ownership_fields",
        ],
    failure_codes_by_alternative: failureCodes,
    notes: acceptedAlternative
      ? `Parent complement accepted by ${acceptedAlternative}.`
      : "v7 constructed same-packet candidate ownership records where possible, but no accepted endpoint/topology, fold-family, or regular-boundary certificate exists for this strip.",
  };
}

function buildParentSummaries(v6Ledger, strips) {
  return v6Ledger.parent_complement_summaries.map((summary) => {
    const ownedStrips = strips.filter((strip) => strip.simple_root_subrow_id === summary.simple_root_subrow_id);
    const accepted = ownedStrips.filter((strip) => strip.status === "accepted_parent_complement");
    const split = ownedStrips.filter((strip) => strip.status === "split_required");
    const parentConsumed = ownedStrips.length > 0 && split.length === 0;
    return {
      parent_base_row_id: summary.parent_base_row_id,
      simple_root_subrow_id: summary.simple_root_subrow_id,
      source_v6_summary_status: summary.status,
      complement_strips: ownedStrips.map((strip) => strip.strip_id),
      complement_strip_count: ownedStrips.length,
      accepted_complement_strips: accepted.length,
      split_required_complement_strips: split.length,
      parent_consumed_by_v7: parentConsumed,
      status: parentConsumed ? "parent_consumed_by_v7" : "parent_complements_split_required",
      blocker: parentConsumed ? "" : "one_or_more_parent_complement_strips_lack_accepted_same_packet_ownership_data",
    };
  });
}

function samePacketInventory(foldLayerBurden, blockerAnatomy, inputScreen, mesh, seedContract, strips) {
  return {
    packet_identity: {
      packet_id: PACKET_ID,
      seed_contract_status: seedContract.status,
      mesh_status: mesh.status,
      input_screen_status: inputScreen.status,
      packet_identity_refs_present: Boolean(inputScreen.packet_identity_refs && mesh.common_identity),
    },
    interval_topology: {
      intervals: Array.isArray(inputScreen.intervals) ? inputScreen.intervals.length : 0,
      mesh_intervals: Array.isArray(mesh.preledger_intervals) ? mesh.preledger_intervals.length : 0,
      endpoint_policy_present: Boolean(mesh.endpoint_policy),
    },
    fold_layer_burden: {
      status: foldLayerBurden.status,
      rows: Array.isArray(foldLayerBurden.rows) ? foldLayerBurden.rows.length : 0,
      accepted_same_packet_fold_layer_rows: Array.isArray(foldLayerBurden.rows)
        ? foldLayerBurden.rows.filter(isAcceptedSamePacketFoldRow).length
        : 0,
      required_same_packet_fields: foldLayerBurden.required_same_packet_fields ?? [],
    },
    blocker_anatomy: {
      status: blockerAnatomy.status,
      split_required_rows: blockerAnatomy.summary?.split_required_rows ?? null,
      family_counts: blockerAnatomy.summary?.family_counts ?? {},
    },
    v7_constructed_candidate_records: {
      parent_complement_strips: strips.length,
      endpoint_contact_tables: strips.filter((strip) => strip.same_packet_endpoint_table.construction_status !== "not_endpoint_contact").length,
      regular_boundary_candidate_cores: strips.filter(
        (strip) => strip.same_packet_regular_boundary_core.construction_status === "candidate_core_table_constructed_but_not_accepted"
      ).length,
    },
  };
}

function buildBackendCertificate(sources) {
  return {
    schema: "breather-proof-interval-same-packet-ownership-data-certificate-v7",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_v7_same_packet_ownership_data_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: sourceArtifacts(sources),
    accepted_alternatives_tested: ACCEPTED_ALTERNATIVES,
    pass_rule:
      "A parent-complement strip is accepted only if same-packet data proves one accepted alternative. Candidate ownership records are not accepted unless endpoint/topology fields, exact fold-family membership, or regular-boundary inclusion/domination fields are certified.",
    construction_scope:
      "v7 imports proof-interval-v6 strips, builds same-packet candidate endpoint/fold-family/regular-boundary records from fresh packet artifacts, and fails closed when the required proof fields are absent.",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
    },
  };
}

function assertImportedV6(v6Ledger) {
  if (v6Ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v6") {
    throw new Error("Proof-interval-v6 ledger schema mismatch.");
  }
  if (v6Ledger.preledger_pass || v6Ledger.updates_live_ledger || v6Ledger.branch_chart_authorized) {
    throw new Error("Imported v6 ledger unexpectedly authorizes a live preledger or branch chart.");
  }
  if (v6Ledger.summary?.certified_simple_root_subrows !== 6) {
    throw new Error("Proof-interval-v6 ledger is missing the expected six simple-root subrows.");
  }
  if (!Array.isArray(v6Ledger.parent_complement_strips)) {
    throw new Error("Proof-interval-v6 ledger is missing parent_complement_strips.");
  }
  if (v6Ledger.summary?.parent_complement_strips !== v6Ledger.parent_complement_strips.length) {
    throw new Error("Proof-interval-v6 parent-complement strip count mismatch.");
  }
}

function assertV7Guards(ledger) {
  if (ledger.preledger_pass || ledger.updates_live_ledger || ledger.branch_chart_authorized) {
    throw new Error("v7 authorization guard failed.");
  }
  for (const strip of ledger.parent_complement_strips) {
    if (strip.imported_v6_range_relation === "overlap" && strip.accepted_alternative === "endpoint_topology_owned") {
      throw new Error(`v7 endpoint ownership accepted an overlap strip: ${strip.strip_id}`);
    }
    if (
      strip.accepted_alternative === "exact_fold_family_covered" &&
      (!strip.probes.exact_fold_family_covered.required_fields_present.same_packet_accepted_fold_layer_row ||
        !strip.probes.exact_fold_family_covered.required_fields_present.exact_complement_membership_in_separator_family)
    ) {
      throw new Error(`v7 accepted fold-family coverage without accepted exact membership: ${strip.strip_id}`);
    }
    if (
      strip.accepted_alternative === "regular_boundary_covered" &&
      (!strip.probes.regular_boundary_covered.required_fields_present.same_packet_inclusion_proof ||
        !strip.probes.regular_boundary_covered.required_fields_present.domination_inequality_or_enlarged_same_packet_ceiling)
    ) {
      throw new Error(`v7 accepted regular-boundary coverage without inclusion/domination: ${strip.strip_id}`);
    }
  }
  for (const parent of ledger.parent_complement_summaries) {
    const strips = ledger.parent_complement_strips.filter((strip) => strip.simple_root_subrow_id === parent.simple_root_subrow_id);
    if (parent.parent_consumed_by_v7 && strips.some((strip) => strip.status === "split_required")) {
      throw new Error(`v7 consumed parent with split-required complement: ${parent.parent_base_row_id}`);
    }
  }
}

function buildLedger(sources) {
  const v6Ledger = sources.v6Source.data;
  const foldLayerBurden = sources.foldLayerBurdenSource.data;
  const blockerAnatomy = sources.blockerAnatomySource.data;
  const inputScreen = sources.inputScreenSource.data;
  const mesh = sources.meshSource.data;
  const seedContract = sources.seedContractSource.data;

  assertImportedV6(v6Ledger);
  if (v6Ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected v6 packet_id ${PACKET_ID}`);
  }
  if (foldLayerBurden.packet_id !== PACKET_ID || blockerAnatomy.packet_id !== PACKET_ID) {
    throw new Error(`Expected fresh same-packet burden/anatomy packet_id ${PACKET_ID}`);
  }
  if (inputScreen.packet_id !== PACKET_ID || mesh.packet_id !== PACKET_ID || seedContract.packet_id !== PACKET_ID) {
    throw new Error(`Expected fresh same-packet input artifacts for ${PACKET_ID}`);
  }
  if (v6Ledger.summary?.parent_complement_strips !== 10 || !Array.isArray(v6Ledger.parent_complement_strips)) {
    throw new Error("Proof-interval-v6 ledger is missing the expected 10 parent-complement strips.");
  }

  const intervals = intervalMap(inputScreen);
  const foldRows = foldRowsBySeparator(foldLayerBurden);
  const strips = v6Ledger.parent_complement_strips.map((strip, index) => enrichStrip(strip, foldRows, intervals, index));
  const acceptedStrips = strips.filter((strip) => strip.status === "accepted_parent_complement");
  const splitStrips = strips.filter((strip) => strip.status === "split_required");
  const parentSummaries = buildParentSummaries(v6Ledger, strips);
  const consumedParents = parentSummaries.filter((summary) => summary.parent_consumed_by_v7);
  const strictRangeEmptyAccepted = strips.filter((strip) => strip.probes.strict_range_empty.status === "accepted");
  const endpointAccepted = strips.filter((strip) => strip.probes.endpoint_topology_owned.status === "accepted");
  const foldFamilyAccepted = strips.filter((strip) => strip.probes.exact_fold_family_covered.status === "accepted");
  const regularBoundaryAccepted = strips.filter((strip) => strip.probes.regular_boundary_covered.status === "accepted");
  const regularBoundaryCandidates = strips.map((strip) => strip.same_packet_regular_boundary_core.candidate_core);

  const result = {
    backendCertificate: buildBackendCertificate(sources),
    ledger: {
      schema: "breather-causal-ledger-fresh-proof-interval-v7",
      packet_id: PACKET_ID,
      refinement_id: REFINEMENT_ID,
      source_v6_refinement_id: v6Ledger.refinement_id,
      source_input_screen: v6Ledger.source_input_screen,
      source_numeric_artifacts: {
        proof_interval_v6_ledger: path.basename(sources.v6Source.path),
        proof_interval_v6_backend_certificate: path.basename(sources.v6BackendSource.path),
        proof_interval_v6_engine_audit: path.basename(sources.v6AuditSource.path),
      },
      source_artifacts: sourceArtifacts(sources),
      import_policy:
        "v7 imports v6 certified rows, subrows, ranges, and complement ownership probes, then constructs same-packet ownership-data candidate records without recomputing v4-v6 trigonometric classification.",
      status: "proof_interval_v7_same_packet_ownership_data_probe_branch_chart_blocked",
      acceptance_level:
        "proof-interval-v6 complement strips plus fail-closed same-packet ownership-data construction for endpoint/topology, fold-family, and regular-boundary routes",
      claim_level:
        "priority-only sidecar preserving v6 evidence while constructing candidate ownership records; no complement strip is accepted by v7",
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
      imported_v6_summary: v6Ledger.summary,
      v6_import_summary: v6Ledger.summary,
      common_identity: v6Ledger.common_identity,
      same_packet_ownership_data_inventory: samePacketInventory(foldLayerBurden, blockerAnatomy, inputScreen, mesh, seedContract, strips),
      evaluation_policy: {
        ...v6Ledger.evaluation_policy,
        v7_pass_rule:
          "A parent complement is accepted only by a certified same-packet ownership-data record. Candidate regular-boundary core tables are diagnostic until inclusion, domination, topology/no-double-counting, and non-core complement closure fields are supplied.",
      },
      interval_method: {
        type: "v6_parent_complement_import_plus_v7_same_packet_data_constructor",
        source_range_backend: v6Ledger.interval_method,
        v7_probe_backend:
          "No new trigonometric range enclosure is computed. v7 imports v6 complement records and constructs same-packet endpoint, fold-family, and regular-boundary candidate data from fresh packet artifacts.",
      },
      summary: {
        base_rows: v6Ledger.summary.base_rows,
        certified_empty_base_rows: v6Ledger.summary.certified_empty_base_rows,
        certified_range_empty_base_rows: v6Ledger.summary.certified_range_empty_base_rows,
        certified_diagonal_exclusion_empty_rows: v6Ledger.summary.certified_diagonal_exclusion_empty_rows,
        certified_simple_root_rows: v6Ledger.summary.certified_simple_root_rows,
        certified_simple_root_subrows: v6Ledger.summary.certified_simple_root_subrows,
        parent_complement_strips: strips.length,
        strict_range_empty_parent_complement_strips: strictRangeEmptyAccepted.length,
        endpoint_contact_tables_constructed: strips.filter(
          (strip) => strip.same_packet_endpoint_table.construction_status !== "not_endpoint_contact"
        ).length,
        endpoint_topology_owned_strips: endpointAccepted.length,
        fold_family_candidate_rows_considered: Array.isArray(foldLayerBurden.rows) ? foldLayerBurden.rows.length : 0,
        accepted_same_packet_fold_layer_rows: Array.isArray(foldLayerBurden.rows)
          ? foldLayerBurden.rows.filter(isAcceptedSamePacketFoldRow).length
          : 0,
        fold_family_covered_strips: foldFamilyAccepted.length,
        regular_boundary_candidate_cores_constructed: regularBoundaryCandidates.length,
        regular_boundary_covered_strips: regularBoundaryAccepted.length,
        accepted_parent_complement_strips_by_v7: acceptedStrips.length,
        split_required_parent_complement_strips: splitStrips.length,
        simple_root_parent_rows_consumed_by_v7: consumedParents.length,
        accepted_fold_layer_rows: 0,
        split_required_base_rows: v6Ledger.summary.split_required_base_rows,
        branch_chart_authorized: false,
      },
      global_margins: {
        ...v6Ledger.global_margins,
        gamma_parent_complement_ownership_display: null,
        pass: false,
      },
      ownership_data_construction_summary: {
        strict_range_empty_accepted: strictRangeEmptyAccepted.length,
        endpoint_contact_tables_rejected: strips.length - endpointAccepted.length,
        exact_fold_family_membership_rejected: strips.length - foldFamilyAccepted.length,
        regular_boundary_candidate_cores_constructed: regularBoundaryCandidates.length,
        regular_boundary_candidate_cores_accepted: regularBoundaryAccepted.length,
        no_accepted_alternative: splitStrips.length,
      },
      parent_complement_blocking_summary: countBy(splitStrips, "failure_code"),
      parent_complement_ownership_blocking_summary: countBy(splitStrips, "v7_failure_code"),
      alternative_failure_summary: {
        strict_range_empty: countBy(strips.map((strip) => strip.probes.strict_range_empty), "failure_code"),
        endpoint_topology_owned: countBy(strips.map((strip) => strip.probes.endpoint_topology_owned), "failure_code"),
        exact_fold_family_covered: countBy(strips.map((strip) => strip.probes.exact_fold_family_covered), "failure_code"),
        regular_boundary_covered: countBy(strips.map((strip) => strip.probes.regular_boundary_covered), "failure_code"),
      },
      rows: v6Ledger.rows,
      simple_root_subrows: v6Ledger.simple_root_subrows,
      parent_complement_ownership_tests: ACCEPTED_ALTERNATIVES,
      regular_boundary_candidate_core_table: regularBoundaryCandidates,
      parent_complement_summaries: parentSummaries,
      parent_complement_summaries_v7: parentSummaries,
      parent_complement_strips: strips,
      parent_complement_strips_v7: strips,
      fold_layer_rows: [],
      limitations: [
        "v7 imports v6 exact-rational complement ranges and does not recompute trigonometric row enclosures.",
        "Endpoint/topology ownership is not constructed for positive-width overlap strips.",
        "Same-packet fold-layer burden rows exist, but no accepted same-packet fold-layer row with exact complement membership exists.",
        "v7 constructs a finite candidate regular-boundary core table for the 10 complement strips, but inclusion, domination, topology/no-double-counting, and non-core complement closure fields are absent.",
        "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
      ],
    },
  };
  assertV7Guards(result.ledger);
  return result;
}

function failureTable(summary) {
  const rows = Object.entries(summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`);
  return rows.length ? rows.join("\n") : "| none | 0 |";
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

function regularBoundaryTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.core_id}\` | \`${row.parent_base_row_id}\` | \`${row.side}\` | ${row.candidate_separator_assignments.map((item) => `\`${item}\``).join(", ") || "`none`"} | \`${row.assignment_status}\` |`
    )
    .join("\n");
}

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-preledger-proof-interval-engine-audit-v7",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_v7_same_packet_ownership_data_probe_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      range_backend: "imported from proof-interval-v6",
      policy_backend: "deterministic same-packet field construction and acceptance checks",
      binary64_endpoint_use: "none_added_by_v7",
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_subrows: ledger.summary.certified_simple_root_subrows,
      parent_complement_strips_accepted_by_v7: ledger.summary.accepted_parent_complement_strips_by_v7,
      fold_layer_rows: 0,
    },
    constructed_scope: {
      regular_boundary_candidate_cores: ledger.summary.regular_boundary_candidate_cores_constructed,
      endpoint_contact_tables: ledger.summary.endpoint_contact_tables_constructed,
      fold_family_candidate_rows_considered: ledger.summary.fold_family_candidate_rows_considered,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      split_required_parent_complement_strips: ledger.summary.split_required_parent_complement_strips,
      parent_complement_failure_code_counts: ledger.parent_complement_blocking_summary,
      alternative_failure_code_counts: ledger.alternative_failure_summary,
    },
    limitations: [
      "This is a same-packet ownership-data constructor and auditor, not a full null-coordinate preledger.",
      "Candidate regular-boundary core records do not imply acceptance without inclusion, domination, topology, and non-core complement closure fields.",
      "Rows left as split_required block branch-chart authorization.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  return `# Fresh Proof-Interval Preledger v7 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v7 sidecar imports the proof-interval-v6 complement strips
and tries to construct the same-packet ownership data needed by the accepted
parent-complement alternatives.

v7 constructs a finite candidate regular-boundary core table for the 10
receiver-side complement strips. That is useful proof data, but it is not an
acceptance certificate: the current same-packet artifacts still do not supply
endpoint contact tables for positive-width overlap strips, accepted exact
fold-family membership rows, or regular-boundary inclusion/domination and
topology fields. Therefore zero simple-root parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v6 | ${ledger.summary.base_rows} |
| Empty rows inherited from v6 | ${ledger.summary.certified_empty_base_rows} |
| Range-empty rows inherited from v6 | ${ledger.summary.certified_range_empty_base_rows} |
| Monotone diagonal exclusions inherited from v6 | ${ledger.summary.certified_diagonal_exclusion_empty_rows} |
| Simple-root subrows inherited from v6 | ${ledger.summary.certified_simple_root_subrows} |
| Parent-complement strips probed | ${ledger.summary.parent_complement_strips} |
| Strict range-empty complement strips | ${ledger.summary.strict_range_empty_parent_complement_strips} |
| Endpoint contact tables constructed | ${ledger.summary.endpoint_contact_tables_constructed} |
| Endpoint/topology-owned strips | ${ledger.summary.endpoint_topology_owned_strips} |
| Fold-family candidate rows considered | ${ledger.summary.fold_family_candidate_rows_considered} |
| Accepted same-packet fold-layer rows | ${ledger.summary.accepted_same_packet_fold_layer_rows} |
| Exact fold-family-covered strips | ${ledger.summary.fold_family_covered_strips} |
| Regular-boundary candidate cores constructed | ${ledger.summary.regular_boundary_candidate_cores_constructed} |
| Regular-boundary-covered strips | ${ledger.summary.regular_boundary_covered_strips} |
| Parent-complement strips accepted by v7 | ${ledger.summary.accepted_parent_complement_strips_by_v7} |
| Parent-complement strips still split-required | ${ledger.summary.split_required_parent_complement_strips} |
| Simple-root parent rows consumed by v7 | ${ledger.summary.simple_root_parent_rows_consumed_by_v7} |
| Split-required base rows | ${ledger.summary.split_required_base_rows} |

Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The exact backend certificate is
\`${path.basename(backendPath)}\`; the engine audit is
\`${path.basename(auditPath)}\`.

## Backend Meaning

v7 does not recompute trigonometric enclosures. It imports the v6
exact-rational parent-complement strips and constructs/checks same-packet data
objects:

1. endpoint/topology ownership is rejected for positive-width overlap strips;
2. exact fold-family coverage checks the fresh fold-layer burden rows, but no
   row is an accepted same-packet fold-layer row with exact complement
   membership;
3. regular-boundary coverage receives a finite candidate core table from v7,
   but remains rejected because exact inclusion, domination, topology and
   no-double-counting, and non-core complement closure fields are absent.

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

## Candidate Regular-Boundary Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Assignment status |
| --- | --- | --- | --- | --- |
${regularBoundaryTable(ledger.regular_boundary_candidate_core_table)}

These entries are finite candidate records only. They do not certify membership
in $\\overline{\\mathcal{F}}_{\\Sigma}^{\\mathrm{bdry}}$ and do not prove a
domination inequality against the fold-layer ceiling.

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Accepted strips | Split-required strips | Status |
| --- | --- | ---: | ---: | ---: | --- |
${parentSummaryTable(ledger.parent_complement_summaries)}

## Parent-Complement Strips

| Strip | Parent | Side | Range relation | Strict range-empty | Endpoint/topology | Fold family | Regular boundary | Final status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${stripTable(ledger.parent_complement_strips)}

## Next Certificate Action

The next proof advance is no longer an ownership-data inventory pass. It must
supply proof-grade fields for one of the candidate records: accepted
same-packet fold-layer rows with exact membership, or a regular-boundary
inclusion/domination certificate for the finite candidate core table, or a
repaired successor candidate whose complement collars become strict
range-empty.

## Capture Decision

Priority-only. This sidecar constructs candidate ownership data on top of v6,
but it is not a passed pre-ledger and not reader-facing AAA prose.
`;
}

function readSources(args) {
  return {
    v6Source: readJsonArtifact(args.v6Ledger),
    v6BackendSource: readJsonArtifact(args.v6Backend),
    v6AuditSource: readJsonArtifact(args.v6Audit),
    v6ReportSource: readTextArtifact(args.v6Report),
    foldLayerBurdenSource: readJsonArtifact(args.foldLayerBurden),
    blockerAnatomySource: readJsonArtifact(args.blockerAnatomy),
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
