#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-regular-boundary-finite-family-v8`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v8`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_OUT_DIR = CERT_DIR;

const DEFAULT_V7_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v7.json`;
const DEFAULT_V7_BACKEND = `${CERT_DIR}/preledger_interval_backend_certificate.${PACKET_ID}.proof-interval-v7.json`;
const DEFAULT_V7_AUDIT = `${CERT_DIR}/preledger_interval_engine_audit.${PACKET_ID}.proof-interval-v7.json`;
const DEFAULT_V7_REPORT = `${CERT_DIR}/causal_preledger_interval_report.${PACKET_ID}.proof-interval-v7.md`;
const DEFAULT_FOLD_CONSTANTS = `${CERT_DIR}/fold_full_interval_constants_certificate.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_BLOCKER_ANATOMY = `${CERT_DIR}/fresh_preledger_blocker_anatomy.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_SEED_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;

const POLICY_SOURCE_DEFAULTS = {
  parent_complement_contract: `${CERT_DIR}/fold_parent_boundary_complement_packet.md`,
  regular_boundary_contract_probe: `${CERT_DIR}/fold_parent_regular_boundary_contract_probe.md`,
  regular_boundary_coverage_attempt: `${CERT_DIR}/fold_parent_regular_boundary_coverage_attempt.md`,
  fold_impulse_ceiling_handoff: `${CERT_DIR}/fold_impulse_ceiling_handoff.md`,
  w_positive_overlap_attempt: `${CERT_DIR}/fold_parent_w_positive_overlap_subdivision_attempt.md`,
  u_positive_overlap_attempt: `${CERT_DIR}/fold_parent_u_positive_overlap_subdivision_attempt.md`,
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

function parseArgs(argv) {
  const args = {
    v7Ledger: DEFAULT_V7_LEDGER,
    v7Backend: DEFAULT_V7_BACKEND,
    v7Audit: DEFAULT_V7_AUDIT,
    v7Report: DEFAULT_V7_REPORT,
    foldConstants: DEFAULT_FOLD_CONSTANTS,
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
    } else if (arg === "--v7-ledger") {
      args.v7Ledger = argv[++i];
    } else if (arg === "--v7-backend") {
      args.v7Backend = argv[++i];
    } else if (arg === "--v7-audit") {
      args.v7Audit = argv[++i];
    } else if (arg === "--v7-report") {
      args.v7Report = argv[++i];
    } else if (arg === "--fold-constants") {
      args.foldConstants = argv[++i];
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
    } else if (arg === "--regular-boundary-contract-probe") {
      args.policySources.regular_boundary_contract_probe = argv[++i];
    } else if (arg === "--regular-boundary-coverage-attempt") {
      args.policySources.regular_boundary_coverage_attempt = argv[++i];
    } else if (arg === "--fold-impulse-ceiling-handoff") {
      args.policySources.fold_impulse_ceiling_handoff = argv[++i];
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
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v8.mjs [options]

Options:
  --v7-ledger PATH                         Proof-interval-v7 sidecar ledger JSON. Defaults to ${DEFAULT_V7_LEDGER}.
  --v7-backend PATH                        Proof-interval-v7 backend certificate JSON. Defaults to ${DEFAULT_V7_BACKEND}.
  --v7-audit PATH                          Proof-interval-v7 engine audit JSON. Defaults to ${DEFAULT_V7_AUDIT}.
  --v7-report PATH                         Proof-interval-v7 report markdown. Defaults to ${DEFAULT_V7_REPORT}.
  --fold-constants PATH                    Fold constants certificate. Defaults to ${DEFAULT_FOLD_CONSTANTS}.
  --fold-layer-burden PATH                 Fresh fold-layer burden JSON. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --blocker-anatomy PATH                   Fresh blocker anatomy JSON. Defaults to ${DEFAULT_BLOCKER_ANATOMY}.
  --input-screen PATH                      Fresh input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --mesh PATH                              Fresh mesh JSON. Defaults to ${DEFAULT_MESH}.
  --seed-contract PATH                     Fresh seed contract JSON. Defaults to ${DEFAULT_SEED_CONTRACT}.
  --parent-complement-contract PATH        Parent-complement policy source.
  --regular-boundary-contract-probe PATH   Regular-boundary contract source.
  --regular-boundary-coverage-attempt PATH Regular-boundary coverage source.
  --fold-impulse-ceiling-handoff PATH      Fold impulse ceiling handoff source.
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

function sourceArtifacts(sources) {
  const policy = {};
  for (const [name, source] of Object.entries(sources.policySources)) {
    policy[name] = artifactRecord(source);
  }
  return {
    proof_interval_v7_ledger: artifactRecord(sources.v7Source),
    proof_interval_v7_backend_certificate: artifactRecord(sources.v7BackendSource),
    proof_interval_v7_engine_audit: artifactRecord(sources.v7AuditSource),
    proof_interval_v7_report: artifactRecord(sources.v7ReportSource),
    fold_constants_certificate: artifactRecord(sources.foldConstantsSource),
    fresh_fold_layer_burden: artifactRecord(sources.foldLayerBurdenSource),
    fresh_preledger_blocker_anatomy: artifactRecord(sources.blockerAnatomySource),
    fresh_input_screen: artifactRecord(sources.inputScreenSource),
    fresh_mesh: artifactRecord(sources.meshSource),
    fresh_seed_contract: artifactRecord(sources.seedContractSource),
    policy,
  };
}

function assertImportedV7(v7Ledger) {
  if (v7Ledger.schema !== "breather-causal-ledger-fresh-proof-interval-v7") {
    throw new Error("Proof-interval-v7 ledger schema mismatch.");
  }
  if (v7Ledger.packet_id !== PACKET_ID) {
    throw new Error(`Expected v7 packet_id ${PACKET_ID}.`);
  }
  if (v7Ledger.preledger_pass || v7Ledger.updates_live_ledger || v7Ledger.branch_chart_authorized) {
    throw new Error("Imported v7 unexpectedly authorizes a live preledger or branch chart.");
  }
  if (v7Ledger.summary?.regular_boundary_candidate_cores_constructed !== 10) {
    throw new Error("Proof-interval-v7 is missing the expected 10 regular-boundary candidate cores.");
  }
  if (!Array.isArray(v7Ledger.parent_complement_strips) || v7Ledger.parent_complement_strips.length !== 10) {
    throw new Error("Proof-interval-v7 is missing the expected 10 parent-complement strips.");
  }
}

function exactPacketMatch(source) {
  return source?.packet_id === PACKET_ID;
}

function exactSingleSeparatorCertified(core) {
  return Array.isArray(core?.candidate_separator_assignments) && core.candidate_separator_assignments.length === 1;
}

function coreFailureCodes(core, foldConstantsSamePacket) {
  const failures = [];
  if (!exactSingleSeparatorCertified(core)) {
    failures.push("regular_boundary_separator_assignment_nonunique");
  }
  failures.push("regular_boundary_same_packet_inclusion_proof_absent");
  failures.push(
    foldConstantsSamePacket
      ? "regular_boundary_domination_missing_I_reg_bdry_bound_or_enlarged_ceiling"
      : "regular_boundary_domination_not_same_packet_ceiling"
  );
  failures.push("regular_boundary_topology_no_double_counting_absent");
  failures.push("regular_boundary_non_core_complement_closure_absent");
  return failures;
}

function buildCoreRecord(strip, index, foldConstantsSamePacket) {
  const candidate = strip.same_packet_regular_boundary_core?.candidate_core;
  if (!candidate?.core_id) {
    throw new Error(`Missing v7 regular-boundary candidate core for ${strip.strip_id}`);
  }
  const separatorAssignments = candidate.candidate_separator_assignments ?? [];
  const membershipEdges = separatorAssignments.map((separator) => ({
    separator_event: separator,
    family_id: `overline_F_${separator}_bdry_v8`,
    same_packet_inclusion_status: "candidate_membership_only_not_formal_inclusion_proof",
    inclusion_certified: false,
    reason: "v8 lists the core in a finite candidate family, but this is not an accepted same-packet inclusion proof.",
  }));

  return {
    core_id: candidate.core_id.replace("_v7_", "_v8_"),
    source_v7_core_id: candidate.core_id,
    source_v7_strip_id: strip.strip_id,
    source_v6_strip_id: candidate.source_v6_strip_id,
    parent_base_row_id: strip.parent_base_row_id,
    simple_root_subrow_id: strip.simple_root_subrow_id,
    ledger: candidate.ledger,
    side: candidate.side,
    receiver_interval: candidate.receiver_interval,
    source_interval: candidate.source_interval,
    receiver_theta_range: candidate.receiver_theta_range,
    source_theta_range: candidate.source_theta_range,
    candidate_separator_assignments: separatorAssignments,
    candidate_membership_edges: membershipEdges,
    finite_family_definition_status: "formal_finite_inventory_only_not_coverage",
    same_packet_inclusion_status: "candidate_membership_only_not_formal_inclusion_proof",
    accepted_regular_boundary_coverage_status: "not_accepted",
    exact_single_separator_assignment_certified: false,
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
    failure_code: "regular_boundary_finite_family_candidate_missing_acceptance_fields",
    failure_codes: coreFailureCodes(candidate, foldConstantsSamePacket),
    v8_index: index + 1,
  };
}

function buildFamilies(coreRecords) {
  const familyMap = new Map();
  for (const core of coreRecords) {
    for (const edge of core.candidate_membership_edges) {
      if (!familyMap.has(edge.separator_event)) {
        familyMap.set(edge.separator_event, {
          family_id: edge.family_id,
          separator_event: edge.separator_event,
          status: "finite_candidate_family_constructed_not_accepted",
          finite_family_definition_status: "formal_finite_inventory_only_not_coverage",
          same_packet_inclusion_status: "candidate_membership_edges_only",
          accepted_regular_boundary_family: false,
          definition:
            "Finite candidate regular-boundary family consisting only of the named v8 residual core records listed here.",
          candidate_core_ids: [],
          candidate_membership_count: 0,
        });
      }
      const family = familyMap.get(edge.separator_event);
      family.candidate_core_ids.push(core.core_id);
      family.candidate_membership_count += 1;
    }
  }
  return [...familyMap.values()].sort((left, right) => left.separator_event.localeCompare(right.separator_event));
}

function buildDominationAudit(foldConstants, families) {
  const aggregates = foldConstants.separator_aggregates ?? {};
  const samePacket = exactPacketMatch(foldConstants);
  const bySeparator = new Map(families.map((family) => [family.separator_event, family]));
  return Object.entries(aggregates)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([separator, aggregate]) => {
      const family = bySeparator.get(separator) ?? null;
      return {
        separator_event: separator,
        fold_constants_packet_id: foldConstants.packet_id ?? null,
        fold_constants_same_packet_as_fresh: samePacket,
        accepted_fold_ceiling_present: Boolean(
          aggregate.accepted && aggregate.I_fold_eta_epsilon_c_Sigma && Number.isFinite(aggregate.I_fold_eta_epsilon_c_Sigma.upper)
        ),
        I_fold_eta_epsilon_c_Sigma: aggregate.I_fold_eta_epsilon_c_Sigma ?? null,
        fold_row_ids: aggregate.row_ids ?? [],
        regular_boundary_candidate_core_ids: family?.candidate_core_ids ?? [],
        regular_boundary_candidate_count: family?.candidate_membership_count ?? 0,
        I_reg_bdry_eta_epsilon_c_bound_present: false,
        enlarged_same_packet_ceiling_present: false,
        domination_inequality_certified: false,
        failure_code: samePacket
          ? "regular_boundary_domination_missing_I_reg_bdry_bound_or_enlarged_ceiling"
          : "regular_boundary_domination_not_same_packet_ceiling",
      };
    });
}

function buildNonCoreClosureAudit(strips) {
  return strips.map((strip) => ({
    strip_id: strip.strip_id.replace("_v7_", "_v8_"),
    source_v7_strip_id: strip.strip_id,
    parent_base_row_id: strip.parent_base_row_id,
    inherited_v7_status: strip.status,
    inherited_v7_failure_code: strip.failure_code,
    accepted_strict_gap_present: strip.probes?.strict_range_empty?.status === "accepted",
    accepted_endpoint_or_fold_alternative_present: Boolean(strip.accepted_alternative),
    non_core_complement_closure_certified: false,
    failure_code: "regular_boundary_non_core_complement_closure_absent",
  }));
}

function buildParentSummaries(v7Ledger, strips) {
  return v7Ledger.parent_complement_summaries.map((summary) => {
    const ownedStrips = strips.filter((strip) => strip.simple_root_subrow_id === summary.simple_root_subrow_id);
    const accepted = ownedStrips.filter((strip) => strip.status === "accepted_parent_complement");
    const split = ownedStrips.filter((strip) => strip.status === "split_required");
    const parentConsumed = ownedStrips.length > 0 && split.length === 0;
    return {
      parent_base_row_id: summary.parent_base_row_id,
      simple_root_subrow_id: summary.simple_root_subrow_id,
      source_v7_summary_status: summary.status,
      complement_strips: ownedStrips.map((strip) => strip.strip_id),
      complement_strip_count: ownedStrips.length,
      accepted_complement_strips: accepted.length,
      split_required_complement_strips: split.length,
      parent_consumed_by_v8: parentConsumed,
      status: parentConsumed ? "parent_consumed_by_v8" : "parent_complements_split_required",
      blocker: parentConsumed ? "" : "regular_boundary_finite_family_certificate_lacks_acceptance_fields",
    };
  });
}

function enrichStrip(strip, coreRecord) {
  return {
    ...strip,
    strip_id: strip.strip_id.replace("_v7_", "_v8_"),
    source_v7_strip_id: strip.strip_id,
    source_v6_strip_id: strip.source_v6_strip_id,
    refinement_id: REFINEMENT_ID,
    imported_v7_status: strip.status,
    imported_v7_failure_code: strip.failure_code,
    accepted_alternative: null,
    status: "split_required",
    v8_status: "split_required",
    v8_certificate_status: "regular_boundary_finite_family_candidate_split_required",
    same_packet_regular_boundary_finite_family_v8: {
      status: "rejected",
      construction_status: "finite_candidate_family_constructed_missing_acceptance_fields",
      accepted: false,
      failure_code: coreRecord.failure_code,
      failure_codes: coreRecord.failure_codes,
      core_id: coreRecord.core_id,
      source_v7_core_id: coreRecord.source_v7_core_id,
      candidate_separator_assignments: coreRecord.candidate_separator_assignments,
      candidate_membership_edges: coreRecord.candidate_membership_edges,
      finite_family_definition_status: coreRecord.finite_family_definition_status,
      same_packet_inclusion_status: coreRecord.same_packet_inclusion_status,
      accepted_regular_boundary_coverage_status: coreRecord.accepted_regular_boundary_coverage_status,
      required_fields: coreRecord.required_fields,
      required_fields_present: coreRecord.required_fields_present,
    },
    probes: {
      ...strip.probes,
      regular_boundary_covered_v8: {
        status: "rejected",
        construction_status: "finite_candidate_family_constructed_missing_acceptance_fields",
        accepted: false,
        failure_code: coreRecord.failure_code,
        failure_codes: coreRecord.failure_codes,
      },
    },
    coverage_certificate_ref: null,
    coverage_certificate_status: "absent",
    failure_code: "no_parent_complement_acceptance_alternative_satisfied",
    v8_failure_code: "regular_boundary_finite_family_candidate_missing_acceptance_fields",
    failure_reasons: [
      "v8_finite_candidate_family_does_not_certify_single_separator_assignment",
      "v8_finite_candidate_family_does_not_certify_same_packet_inclusion",
      "v8_no_same_packet_domination_inequality_or_enlarged_ceiling",
      "v8_no_topology_no_double_counting_certificate",
      "v8_no_non_core_complement_closure_certificate",
    ],
    v8_failure_reasons: [
      "finite_candidate_family_only",
      ...coreRecord.failure_codes,
    ],
    notes:
      "v8 constructs finite regular-boundary family candidates from the v7 cores, but no strip is accepted without separator uniqueness, inclusion, domination, topology, and non-core closure certificates.",
  };
}

function buildBackendCertificate(sources) {
  return {
    schema: "breather-proof-interval-regular-boundary-finite-family-certificate-v8",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_v8_regular_boundary_finite_family_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: sourceArtifacts(sources),
    pass_rule:
      "A regular-boundary candidate core can cover a parent-complement strip only when the finite family definition, residual core table, exact single separator assignment, same-packet inclusion proof, domination inequality or enlarged same-packet ceiling, topology/no-double-counting certificate, and non-core complement closure are all certified.",
    construction_scope:
      "v8 imports proof-interval-v7 candidate regular-boundary cores, builds finite candidate families by separator, audits same-packet domination and closure fields, and fails closed when required proof fields are absent.",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
    },
  };
}

function buildLedger(sources) {
  const v7Ledger = sources.v7Source.data;
  const foldConstants = sources.foldConstantsSource.data;
  const foldLayerBurden = sources.foldLayerBurdenSource.data;
  const blockerAnatomy = sources.blockerAnatomySource.data;
  const inputScreen = sources.inputScreenSource.data;
  const mesh = sources.meshSource.data;
  const seedContract = sources.seedContractSource.data;

  assertImportedV7(v7Ledger);
  if (foldLayerBurden.packet_id !== PACKET_ID || blockerAnatomy.packet_id !== PACKET_ID) {
    throw new Error(`Expected fresh same-packet burden/anatomy packet_id ${PACKET_ID}.`);
  }
  if (inputScreen.packet_id !== PACKET_ID || mesh.packet_id !== PACKET_ID || seedContract.packet_id !== PACKET_ID) {
    throw new Error(`Expected fresh same-packet input artifacts for ${PACKET_ID}.`);
  }

  const foldConstantsSamePacket = exactPacketMatch(foldConstants);
  const coreRecords = v7Ledger.parent_complement_strips.map((strip, index) =>
    buildCoreRecord(strip, index, foldConstantsSamePacket)
  );
  const families = buildFamilies(coreRecords);
  const dominationAudit = buildDominationAudit(foldConstants, families);
  const nonCoreClosureAudit = buildNonCoreClosureAudit(v7Ledger.parent_complement_strips);
  const strips = v7Ledger.parent_complement_strips.map((strip, index) => enrichStrip(strip, coreRecords[index]));
  const parentSummaries = buildParentSummaries(v7Ledger, strips);

  const splitStrips = strips.filter((strip) => strip.status === "split_required");
  const singleAssignments = coreRecords.filter((core) => core.exact_single_separator_assignment_certified);
  const inclusionCertified = coreRecords.filter((core) => core.same_packet_inclusion_proof_certified);
  const dominationCertified = coreRecords.filter((core) => core.domination_inequality_certified);
  const topologyCertified = coreRecords.filter((core) => core.topology_and_no_double_counting_certified);
  const nonCoreCertified = coreRecords.filter((core) => core.non_core_complement_closure_certified);
  const regularBoundaryCovered = coreRecords.filter((core) => core.regular_boundary_covered);
  const membershipEdges = coreRecords.flatMap((core) => core.candidate_membership_edges);

  const ledger = {
    schema: "breather-causal-ledger-fresh-proof-interval-v8",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    source_v7_refinement_id: v7Ledger.refinement_id,
    source_input_screen: v7Ledger.source_input_screen,
    source_numeric_artifacts: {
      proof_interval_v7_ledger: path.basename(sources.v7Source.path),
      proof_interval_v7_backend_certificate: path.basename(sources.v7BackendSource.path),
      proof_interval_v7_engine_audit: path.basename(sources.v7AuditSource.path),
    },
    source_artifacts: sourceArtifacts(sources),
    import_policy:
      "v8 imports v7 candidate regular-boundary cores and constructs finite same-packet family candidates without accepting them as coverage certificates.",
    status: "proof_interval_v8_regular_boundary_finite_family_probe_branch_chart_blocked",
    acceptance_level:
      "proof-interval-v7 candidate core table plus fail-closed finite regular-boundary family, inclusion, domination, topology, and non-core closure audit",
    claim_level:
      "priority-only sidecar sharpening the regular-boundary theorem target; no complement strip is accepted by v8",
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
    imported_v7_summary: v7Ledger.summary,
    common_identity: v7Ledger.common_identity,
    evaluation_policy: {
      ...v7Ledger.evaluation_policy,
      v8_pass_rule:
        "Finite candidate family listing is not acceptance. Regular-boundary coverage requires exact single separator assignment, certified same-packet inclusion, certified domination or enlarged same-packet ceiling, topology/no-double-counting, and non-core complement closure.",
    },
    interval_method: {
      type: "v7_candidate_core_import_plus_v8_regular_boundary_finite_family_audit",
      source_range_backend: v7Ledger.interval_method,
      v8_probe_backend:
        "No new trigonometric range enclosure is computed. v8 builds finite regular-boundary candidate families from the v7 cores and audits missing proof fields.",
    },
    summary: {
      base_rows: v7Ledger.summary.base_rows,
      certified_empty_base_rows: v7Ledger.summary.certified_empty_base_rows,
      certified_range_empty_base_rows: v7Ledger.summary.certified_range_empty_base_rows,
      certified_diagonal_exclusion_empty_rows: v7Ledger.summary.certified_diagonal_exclusion_empty_rows,
      certified_simple_root_rows: v7Ledger.summary.certified_simple_root_rows,
      certified_simple_root_subrows: v7Ledger.summary.certified_simple_root_subrows,
      parent_complement_strips: strips.length,
      regular_boundary_candidate_cores_imported_from_v7: coreRecords.length,
      finite_regular_boundary_candidate_families_constructed: families.length,
      finite_regular_boundary_candidate_membership_edges: membershipEdges.length,
      exact_single_separator_assignments_certified: singleAssignments.length,
      candidate_list_inclusion_edges_recorded: membershipEdges.length,
      same_packet_inclusion_proofs_certified: inclusionCertified.length,
      same_packet_fold_ceiling_available_for_fresh_packet: foldConstantsSamePacket,
      domination_inequalities_certified: dominationCertified.length,
      topology_no_double_counting_certified: topologyCertified.length,
      non_core_complement_closures_certified: nonCoreCertified.length,
      regular_boundary_covered_strips: regularBoundaryCovered.length,
      accepted_parent_complement_strips_by_v8: 0,
      split_required_parent_complement_strips: splitStrips.length,
      simple_root_parent_rows_consumed_by_v8: 0,
      accepted_fold_layer_rows: 0,
      split_required_base_rows: v7Ledger.summary.split_required_base_rows,
      branch_chart_authorized: false,
    },
    regular_boundary_finite_family_summary: {
      candidate_families_constructed: families.length,
      candidate_cores: coreRecords.length,
      candidate_membership_edges: membershipEdges.length,
      accepted_regular_boundary_families: 0,
      regular_boundary_covered_strips: 0,
      fold_constants_certificate_packet_id: foldConstants.packet_id ?? null,
      fold_constants_same_packet_as_fresh: foldConstantsSamePacket,
    },
    regular_boundary_failure_summary: countBy(coreRecords, "failure_code"),
    regular_boundary_field_failure_summary: coreRecords.reduce((counts, core) => {
      for (const code of core.failure_codes) {
        counts[code] = (counts[code] ?? 0) + 1;
      }
      return counts;
    }, {}),
    parent_complement_blocking_summary: countBy(splitStrips, "failure_code"),
    parent_complement_ownership_blocking_summary: countBy(splitStrips, "v8_failure_code"),
    finite_regular_boundary_candidate_families: families,
    regular_boundary_candidate_core_table_v8: coreRecords,
    regular_boundary_domination_audit: dominationAudit,
    non_core_complement_closure_audit: nonCoreClosureAudit,
    rows: v7Ledger.rows,
    simple_root_subrows: v7Ledger.simple_root_subrows,
    parent_complement_summaries: parentSummaries,
    parent_complement_summaries_v8: parentSummaries,
    parent_complement_strips: strips,
    parent_complement_strips_v8: strips,
    fold_layer_rows: [],
    limitations: [
      "v8 imports v7 candidate regular-boundary cores and does not recompute trigonometric row enclosures.",
      "Finite candidate family listing records where the cores would belong if later certified; it is not an accepted same-packet inclusion proof.",
      "No exact single separator assignment is certified for any imported v7 core.",
      "The available fold constants certificate is not a same-packet fresh domination ceiling for this packet.",
      "No topology/no-double-counting certificate or non-core complement closure certificate is present.",
      "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
    ],
  };

  assertV8Guards(ledger);
  return {
    backendCertificate: buildBackendCertificate(sources),
    ledger,
  };
}

function assertV8Guards(ledger) {
  if (ledger.preledger_pass || ledger.updates_live_ledger || ledger.branch_chart_authorized) {
    throw new Error("v8 authorization guard failed.");
  }
  for (const core of ledger.regular_boundary_candidate_core_table_v8) {
    if (
      core.regular_boundary_covered &&
      (!core.required_fields_present.exact_single_separator_assignment ||
        !core.required_fields_present.same_packet_inclusion_proof ||
        !core.required_fields_present.domination_inequality_or_enlarged_same_packet_ceiling ||
        !core.required_fields_present.topology_and_no_double_counting ||
        !core.required_fields_present.non_core_complement_closure)
    ) {
      throw new Error(`v8 accepted regular-boundary coverage without every required field: ${core.core_id}`);
    }
  }
  for (const parent of ledger.parent_complement_summaries) {
    const strips = ledger.parent_complement_strips.filter((strip) => strip.simple_root_subrow_id === parent.simple_root_subrow_id);
    if (parent.parent_consumed_by_v8 && strips.some((strip) => strip.status === "split_required")) {
      throw new Error(`v8 consumed parent with split-required complement: ${parent.parent_base_row_id}`);
    }
  }
  if (ledger.summary.accepted_parent_complement_strips_by_v8 !== 0 || ledger.summary.simple_root_parent_rows_consumed_by_v8 !== 0) {
    throw new Error("v8 unexpectedly accepted parent complements.");
  }
}

function failureTable(summary) {
  const rows = Object.entries(summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`);
  return rows.length ? rows.join("\n") : "| none | 0 |";
}

function familyTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.family_id}\` | \`${row.separator_event}\` | ${row.candidate_membership_count} | ${row.candidate_core_ids.map((item) => `\`${item}\``).join(", ")} |`
    )
    .join("\n");
}

function coreTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.core_id}\` | \`${row.parent_base_row_id}\` | \`${row.side}\` | ${row.candidate_separator_assignments.map((item) => `\`${item}\``).join(", ") || "`none`"} | ${row.candidate_membership_edges.length} | \`${row.failure_code}\` |`
    )
    .join("\n");
}

function dominationTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.separator_event}\` | \`${row.fold_constants_packet_id ?? "none"}\` | \`${row.fold_constants_same_packet_as_fresh}\` | ${row.regular_boundary_candidate_count} | \`${row.failure_code}\` |`
    )
    .join("\n");
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

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-preledger-proof-interval-engine-audit-v8",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_v8_regular_boundary_finite_family_probe_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      range_backend: "imported from proof-interval-v7",
      policy_backend: "deterministic finite regular-boundary family construction and fail-closed required-field audit",
      binary64_endpoint_use: "none_added_by_v8",
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_subrows: ledger.summary.certified_simple_root_subrows,
      parent_complement_strips_accepted_by_v8: ledger.summary.accepted_parent_complement_strips_by_v8,
      fold_layer_rows: 0,
    },
    constructed_scope: {
      regular_boundary_candidate_families: ledger.summary.finite_regular_boundary_candidate_families_constructed,
      regular_boundary_candidate_cores: ledger.summary.regular_boundary_candidate_cores_imported_from_v7,
      regular_boundary_candidate_membership_edges: ledger.summary.finite_regular_boundary_candidate_membership_edges,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      split_required_parent_complement_strips: ledger.summary.split_required_parent_complement_strips,
      parent_complement_failure_code_counts: ledger.parent_complement_blocking_summary,
      regular_boundary_failure_code_counts: ledger.regular_boundary_field_failure_summary,
    },
    limitations: [
      "This is a regular-boundary finite-family constructor and auditor, not a full null-coordinate preledger.",
      "Candidate finite-family membership does not imply accepted same-packet inclusion.",
      "Rows left as split_required block branch-chart authorization.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  return `# Fresh Proof-Interval Preledger v8 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v8 sidecar imports the v7 regular-boundary candidate cores
and constructs the finite candidate family that a regular-boundary theorem
would have to certify.

v8 records 4 finite candidate families and 20 candidate membership edges from
the 10 v7 cores. This is a sharper theorem target, not an acceptance
certificate. No core has an exact single separator assignment, no same-packet
inclusion proof is certified, no same-packet domination inequality or enlarged
ceiling is present, and no topology/no-double-counting or non-core complement
closure certificate is present. Therefore zero parent-complement strips are
accepted and zero simple-root parent rows are consumed.

| Quantity | Value |
| --- | ---: |
| Base rows inherited from v7 | ${ledger.summary.base_rows} |
| Empty rows inherited from v7 | ${ledger.summary.certified_empty_base_rows} |
| Simple-root subrows inherited from v7 | ${ledger.summary.certified_simple_root_subrows} |
| Parent-complement strips probed | ${ledger.summary.parent_complement_strips} |
| Regular-boundary candidate cores imported from v7 | ${ledger.summary.regular_boundary_candidate_cores_imported_from_v7} |
| Finite candidate families constructed | ${ledger.summary.finite_regular_boundary_candidate_families_constructed} |
| Candidate membership edges recorded | ${ledger.summary.finite_regular_boundary_candidate_membership_edges} |
| Exact single separator assignments certified | ${ledger.summary.exact_single_separator_assignments_certified} |
| Same-packet inclusion proofs certified | ${ledger.summary.same_packet_inclusion_proofs_certified} |
| Same-packet fresh fold ceiling available | \`${ledger.summary.same_packet_fold_ceiling_available_for_fresh_packet}\` |
| Domination inequalities certified | ${ledger.summary.domination_inequalities_certified} |
| Topology/no-double-counting certificates | ${ledger.summary.topology_no_double_counting_certified} |
| Non-core complement closures certified | ${ledger.summary.non_core_complement_closures_certified} |
| Regular-boundary-covered strips | ${ledger.summary.regular_boundary_covered_strips} |
| Parent-complement strips accepted by v8 | ${ledger.summary.accepted_parent_complement_strips_by_v8} |
| Parent-complement strips still split-required | ${ledger.summary.split_required_parent_complement_strips} |
| Simple-root parent rows consumed by v8 | ${ledger.summary.simple_root_parent_rows_consumed_by_v8} |
| Split-required base rows | ${ledger.summary.split_required_base_rows} |

Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The exact backend certificate is
\`${path.basename(backendPath)}\`; the engine audit is
\`${path.basename(auditPath)}\`.

## Backend Meaning

v8 does not recompute trigonometric enclosures. It converts the v7 candidate
core table into finite regular-boundary candidate families by separator:

$$
\\overline{\\mathcal{F}}_{\\Sigma}^{\\mathrm{bdry},v8}
=
\\{C : C\\text{ is one of the named v8 candidate core records assigned to }\\Sigma\\}.
$$

This definition is candidate-only. It lists the finite objects that a later
same-packet regular-boundary theorem must certify. The finite inventory is a
formal list of named candidates, but the candidate membership edges are not
formal inclusion proofs and do not prove domination, topology ownership, or
non-core complement closure.

## Finite Candidate Families

| Family | Separator | Candidate memberships | Candidate cores |
| --- | --- | ---: | --- |
${familyTable(ledger.finite_regular_boundary_candidate_families)}

## Candidate Core Table

| Candidate core | Parent | Side | Candidate separator assignments | Membership edges | Failure code |
| --- | --- | --- | --- | ---: | --- |
${coreTable(ledger.regular_boundary_candidate_core_table_v8)}

## Domination Audit

| Separator | Fold constants packet | Same fresh packet? | Candidate memberships | Failure code |
| --- | --- | --- | ---: | --- |
${dominationTable(ledger.regular_boundary_domination_audit)}

## Regular-Boundary Field Failure Summary

| Failure code | Cores |
| --- | ---: |
${failureTable(ledger.regular_boundary_field_failure_summary)}

## Parent-Complement Summary

| Parent | Simple-root subrow | Complement strips | Accepted strips | Split-required strips | Status |
| --- | --- | ---: | ---: | ---: | --- |
${parentSummaryTable(ledger.parent_complement_summaries)}

## Next Certificate Action

The next proof advance must move from candidate family listing to proof fields:
choose a single separator assignment for each core, prove same-packet inclusion
in the finite family, supply a fresh same-packet domination inequality or
accepted enlarged ceiling, and close topology/no-double-counting plus non-core
complements. Without those fields, regular-boundary coverage remains a theorem
target rather than a row-consumption certificate.

## Capture Decision

Priority-only. This sidecar sharpens the regular-boundary theorem target, but
it is not a passed pre-ledger and not reader-facing AAA prose.
`;
}

function readSources(args) {
  return {
    v7Source: readJsonArtifact(args.v7Ledger),
    v7BackendSource: readJsonArtifact(args.v7Backend),
    v7AuditSource: readJsonArtifact(args.v7Audit),
    v7ReportSource: readTextArtifact(args.v7Report),
    foldConstantsSource: readJsonArtifact(args.foldConstants),
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
        regular_boundary_field_failure_summary: ledger.regular_boundary_field_failure_summary,
      },
      null,
      2
    )
  );
}

main();
