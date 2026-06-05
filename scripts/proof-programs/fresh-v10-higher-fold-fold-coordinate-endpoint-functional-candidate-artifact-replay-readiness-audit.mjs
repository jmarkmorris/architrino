#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const FOLD_COORDINATE_PACKET_ID = "fresh-v10-fold-coordinate-collocation-nonlinear-tangent-matrix-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_GLOBAL_DOMAIN_EVALUATION_ATTEMPT = `${CERT_DIR}/fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_MATERIALIZATION_AUDIT = `${CERT_DIR}/fold_coordinate_candidate_materialization_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_CONTRACT = `${CERT_DIR}/fold_coordinate_history_realization_contract.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_HISTORY_THEOREM_ATTEMPT = `${CERT_DIR}/fold_coordinate_history_realization_theorem_attempt.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const DEFAULT_LAMBDA0305_REPLAY_AUDIT = `${CERT_DIR}/lambda0305_preledger_replay_audit.${PACKET_ID}.proof-interval-v6.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit.${PACKET_ID}.proof-interval-v6.nonlinear-v0.json`;
const OUTPUT_REPORT = `fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit_report.${PACKET_ID}.proof-interval-v6.nonlinear-v0.md`;

const ENDPOINT_READINESS_FIELDS = [
  "global_domain_evaluation_attempt_imported",
  "local_formula_candidate_available",
  "component_endpoint_identities_exact",
  "global_domain_evaluation_map_constructed",
  "non_target_endpoint_zero_certified",
  "same_packet_history_update_formula_present",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifact_namespace_defined",
  "candidate_phi_cyc_present",
  "candidate_mesh_present",
  "candidate_preledger_input_screen_present",
  "candidate_root_topology_certificate_present",
  "candidate_preledger_replay_present",
  "candidate_artifacts_same_packet_validated",
  "candidate_replay_same_packet_validated",
  "candidate_artifact_replay_ready",
];

const ROW_READINESS_FIELDS = [
  "row_locator_resolved",
  "local_formula_candidate_pair_available",
  "local_target_action_pair_exact",
  "global_domain_evaluation_pair_constructed",
  "screen_positive_candidate_change_row",
  "signed_boundary_delta_contract_defined",
  "same_packet_history_update_formula_present",
  "exact_screen_zero_certified",
  "rank_certified",
  "candidate_artifact_namespace_defined",
  "candidate_artifacts_same_packet_validated",
  "candidate_replay_same_packet_validated",
  "candidate_artifact_replay_ready",
  "row_replay_ready",
  "row_consumed",
  "branch_chart_authorized",
];

const PACKET_READINESS_FIELDS = [
  "global_domain_evaluation_attempt_imported",
  "global_domain_evaluation_maps_constructed",
  "row_global_domain_evaluation_pairs_constructed",
  "candidate_artifact_namespace_defined",
  "candidate_phi_cyc_present",
  "candidate_mesh_present",
  "candidate_preledger_input_screen_present",
  "candidate_root_topology_certificate_present",
  "candidate_preledger_replay_present",
  "candidate_artifacts_same_packet_validated",
  "candidate_replay_same_packet_validated",
  "candidate_artifact_replay_ready",
  "row_consumed",
  "branch_chart_authorized",
];

function parseArgs(argv) {
  const args = {
    globalDomainEvaluationAttempt: DEFAULT_GLOBAL_DOMAIN_EVALUATION_ATTEMPT,
    materializationAudit: DEFAULT_MATERIALIZATION_AUDIT,
    historyContract: DEFAULT_HISTORY_CONTRACT,
    historyTheoremAttempt: DEFAULT_HISTORY_THEOREM_ATTEMPT,
    lambda0305ReplayAudit: DEFAULT_LAMBDA0305_REPLAY_AUDIT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--global-domain-evaluation-attempt") {
      args.globalDomainEvaluationAttempt = argv[++index];
    } else if (arg === "--materialization-audit") {
      args.materializationAudit = argv[++index];
    } else if (arg === "--history-contract") {
      args.historyContract = argv[++index];
    } else if (arg === "--history-theorem-attempt") {
      args.historyTheoremAttempt = argv[++index];
    } else if (arg === "--lambda0305-replay-audit") {
      args.lambda0305ReplayAudit = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-fold-coordinate-endpoint-functional-candidate-artifact-replay-readiness-audit.mjs [options]

Options:
  --global-domain-evaluation-attempt PATH  Global domain/evaluation-map attempt JSON. Defaults to ${DEFAULT_GLOBAL_DOMAIN_EVALUATION_ATTEMPT}.
  --materialization-audit PATH             Candidate materialization audit JSON. Defaults to ${DEFAULT_MATERIALIZATION_AUDIT}.
  --history-contract PATH                  History-realization contract JSON. Defaults to ${DEFAULT_HISTORY_CONTRACT}.
  --history-theorem-attempt PATH           History-realization theorem-attempt JSON. Defaults to ${DEFAULT_HISTORY_THEOREM_ATTEMPT}.
  --lambda0305-replay-audit PATH           Direct-path lambda=0.305 replay contrast JSON. Defaults to ${DEFAULT_LAMBDA0305_REPLAY_AUDIT}.
  --out-dir PATH                           Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                 Pretty-print JSON artifact.
  --help                                   Show this help.`);
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
  const present = Boolean(filePath) && fs.existsSync(filePath);
  return {
    path: filePath ?? null,
    basename: filePath ? path.basename(filePath) : null,
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function recordFromSource(sourceArtifact) {
  return artifactRecord(sourceArtifact?.path ?? null);
}

function assertSamePacketSource(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
  if (source.fold_coordinate_packet_id !== FOLD_COORDINATE_PACKET_ID) {
    throw new Error(`Unexpected ${name} fold-coordinate packet id: ${source.fold_coordinate_packet_id}`);
  }
  if (source.branch_chart_authorized || source.preledger_pass || source.updates_live_ledger) {
    throw new Error(`Refusing to build readiness audit from authorized or live-updating ${name}.`);
  }
}

function assertInputs(inputs) {
  assertSamePacketSource(inputs.globalAttempt, "global domain/evaluation attempt");
  assertSamePacketSource(inputs.materializationAudit, "materialization audit");
  assertSamePacketSource(inputs.historyContract, "history contract");
  assertSamePacketSource(inputs.historyTheoremAttempt, "history theorem attempt");
  if (
    inputs.globalAttempt.status !==
    "fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt_fail_closed"
  ) {
    throw new Error(`Unexpected global domain/evaluation attempt status: ${inputs.globalAttempt.status}`);
  }
  if (inputs.materializationAudit.status !== "fold_coordinate_candidate_materialization_audit_fail_closed") {
    throw new Error(`Unexpected materialization audit status: ${inputs.materializationAudit.status}`);
  }
  if (inputs.historyContract.status !== "fold_coordinate_history_realization_contract_defined_realization_absent") {
    throw new Error(`Unexpected history contract status: ${inputs.historyContract.status}`);
  }
  if (inputs.historyTheoremAttempt.status !== "fold_coordinate_history_realization_theorem_attempt_fail_closed") {
    throw new Error(`Unexpected history theorem attempt status: ${inputs.historyTheoremAttempt.status}`);
  }
  if (!Array.isArray(inputs.globalAttempt.endpoint_global_domain_evaluation_attempts)) {
    throw new Error("Global attempt is missing endpoint attempts.");
  }
  if (!Array.isArray(inputs.globalAttempt.row_global_domain_evaluation_attempts)) {
    throw new Error("Global attempt is missing row attempts.");
  }
  if (!inputs.historyContract.generator_contract) {
    throw new Error("History contract is missing generator_contract.");
  }
}

function countFields(rows, fields, key = "required_fields_present") {
  return Object.fromEntries(
    fields.map((field) => [field, rows.filter((row) => row[key]?.[field] === true).length])
  );
}

function byId(rows, key = "row_id") {
  return new Map((rows ?? []).map((row) => [row[key], row]));
}

function allStagesFalse() {
  return Object.fromEntries(
    ["v1", "v2", "v3", "v4", "v5", "v6"].map((stage) => [
      stage,
      {
        present: false,
        ledger_sha256: null,
        certified_counts: null,
        split_required_base_rows: null,
        branch_chart_authorized: false,
      },
    ])
  );
}

function buildCandidateArtifacts(historyContract, materializationAudit) {
  const materialized = historyContract.generator_contract.materialized_candidate_artifacts ?? {};
  const expected = materializationAudit.expected_candidate_artifacts ?? {};
  return {
    same_packet_phi_cyc: recordFromSource(materialized.same_packet_phi_cyc ?? expected.expected_phi_cyc),
    same_packet_mesh: recordFromSource(materialized.same_packet_mesh ?? expected.expected_mesh),
    same_packet_preledger_input_screen: recordFromSource(
      materialized.same_packet_preledger_input_screen ?? expected.expected_preledger_input_screen
    ),
    root_topology_interval_certificate: recordFromSource(
      materialized.root_topology_interval_certificate ?? expected.expected_root_topology_certificate
    ),
    proof_interval_replay_audit: recordFromSource(materialized.proof_interval_replay_audit ?? expected.expected_preledger_replay),
  };
}

function artifactBasenameHasCandidateIdentity(artifact, candidateRunId, artifactStem) {
  return (
    typeof artifact.basename === "string" &&
    (artifact.basename.includes(candidateRunId) || artifact.basename.includes(artifactStem))
  );
}

function buildReadinessContext(inputs) {
  const generatorContract = inputs.historyContract.generator_contract;
  const candidateRunId = generatorContract.candidate_run_id;
  const artifactStem = generatorContract.artifact_stem;
  const candidateArtifactNamespace = generatorContract.candidate_artifact_namespace;
  const candidateArtifacts = buildCandidateArtifacts(inputs.historyContract, inputs.materializationAudit);
  const artifactValues = Object.values(candidateArtifacts);
  const candidateArtifactsPresent = artifactValues.filter((artifact) => artifact.present).length;
  const candidateArtifactsExpected = artifactValues.length;
  const candidateFilesPresent = candidateArtifactsPresent === candidateArtifactsExpected;
  const candidateBasenamesInNamespace = artifactValues.every((artifact) =>
    artifactBasenameHasCandidateIdentity(artifact, candidateRunId, artifactStem)
  );
  const globalSummary = inputs.globalAttempt.summary;
  const theoremSummary = inputs.historyTheoremAttempt.summary;
  const globalMapsConstructed =
    globalSummary.global_domain_evaluation_maps_constructed === globalSummary.endpoint_functionals &&
    globalSummary.endpoint_functionals > 0;
  const rowGlobalPairsConstructed =
    globalSummary.rows_with_global_domain_evaluation_pairs === globalSummary.rows && globalSummary.rows > 0;
  const exactScreenZeroCertified =
    globalSummary.exact_screen_zero_certificates === globalSummary.endpoint_functionals &&
    theoremSummary.exact_screen_zero_certified === true;
  const rankCertified =
    globalSummary.rank_certificates === globalSummary.endpoint_functionals && theoremSummary.rank_certified === true;
  const topologyRecertified =
    candidateArtifacts.root_topology_interval_certificate.present === true &&
    globalSummary.topology_recertifications === globalSummary.endpoint_functionals &&
    globalSummary.topology_recertifications > 0;
  const proofIntervalReplay =
    candidateArtifacts.proof_interval_replay_audit.present === true &&
    globalSummary.proof_interval_v1_v6_replays === globalSummary.endpoint_functionals &&
    globalSummary.proof_interval_v1_v6_replays > 0;
  const candidateArtifactsSamePacketValidated =
    candidateFilesPresent &&
    candidateBasenamesInNamespace &&
    globalMapsConstructed &&
    rowGlobalPairsConstructed &&
    exactScreenZeroCertified &&
    rankCertified;
  const candidateReplaySamePacketValidated =
    candidateArtifactsSamePacketValidated && topologyRecertified && proofIntervalReplay;
  const candidateArtifactReplayReady = candidateReplaySamePacketValidated;
  return {
    candidateRunId,
    artifactStem,
    candidateArtifactNamespace,
    candidateArtifactNamespaceDefined:
      typeof candidateArtifactNamespace === "string" &&
      candidateArtifactNamespace.length > 0 &&
      candidateArtifactNamespace === artifactStem,
    candidateArtifacts,
    candidateFilesPresent,
    candidateBasenamesInNamespace,
    candidateArtifactsPresent,
    candidateArtifactsExpected,
    globalMapsConstructed,
    rowGlobalPairsConstructed,
    exactScreenZeroCertified,
    rankCertified,
    topologyRecertified,
    proofIntervalReplay,
    candidateArtifactsSamePacketValidated,
    candidateReplaySamePacketValidated,
    candidateArtifactReplayReady,
  };
}

function endpointBlockingCodes(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value !== true)
    .map(([field]) => `missing_${field}`);
}

function buildEndpointReadiness(endpointAttempt, context) {
  const previousFields = endpointAttempt.required_fields_present ?? {};
  const fields = {
    global_domain_evaluation_attempt_imported: true,
    local_formula_candidate_available: previousFields.local_formula_candidate_available === true,
    component_endpoint_identities_exact: previousFields.component_endpoint_identities_exact === true,
    global_domain_evaluation_map_constructed: previousFields.global_domain_evaluation_map_constructed === true,
    non_target_endpoint_zero_certified: previousFields.non_target_endpoint_zero_certified === true,
    same_packet_history_update_formula_present: previousFields.same_packet_history_update_formula_present === true,
    exact_screen_zero_certified: previousFields.exact_screen_zero_certified === true && context.exactScreenZeroCertified,
    rank_certified: previousFields.rank_certified === true && context.rankCertified,
    candidate_artifact_namespace_defined: context.candidateArtifactNamespaceDefined,
    candidate_phi_cyc_present: context.candidateArtifacts.same_packet_phi_cyc.present,
    candidate_mesh_present: context.candidateArtifacts.same_packet_mesh.present,
    candidate_preledger_input_screen_present: context.candidateArtifacts.same_packet_preledger_input_screen.present,
    candidate_root_topology_certificate_present: context.candidateArtifacts.root_topology_interval_certificate.present,
    candidate_preledger_replay_present: context.candidateArtifacts.proof_interval_replay_audit.present,
    candidate_artifacts_same_packet_validated: context.candidateArtifactsSamePacketValidated,
    candidate_replay_same_packet_validated: context.candidateReplaySamePacketValidated,
    candidate_artifact_replay_ready: false,
  };
  fields.candidate_artifact_replay_ready = ENDPOINT_READINESS_FIELDS.every((field) => field === "candidate_artifact_replay_ready" || fields[field] === true);
  return {
    id: endpointAttempt.id,
    endpoint_functional_id: endpointAttempt.endpoint_functional_id,
    role: endpointAttempt.role,
    basis_symbol: endpointAttempt.basis_symbol,
    row_uses: endpointAttempt.row_uses,
    support_topology: endpointAttempt.support_topology,
    required_fields_present: fields,
    candidate_artifact_replay_ready: fields.candidate_artifact_replay_ready,
    blocking_codes: endpointBlockingCodes(fields),
    obstruction:
      "The endpoint has a local formula candidate and exact component endpoint identity, but the same-packet global domain/evaluation map, non-target zero certificate, exact $B\\xi=0$, rank, candidate artifacts, topology recertification, and v1-v6 replay are not jointly certified.",
  };
}

function buildRowReadiness(rowAttempt, materializationRow, context) {
  const previousFields = rowAttempt.required_fields_present ?? {};
  const materializationFields = materializationRow?.required_fields_present ?? {};
  const fields = {
    row_locator_resolved: previousFields.row_locator_resolved === true,
    local_formula_candidate_pair_available: rowAttempt.local_formula_candidate_pair_available === true,
    local_target_action_pair_exact: rowAttempt.local_target_action_pair_exact === true,
    global_domain_evaluation_pair_constructed: rowAttempt.global_domain_evaluation_pair_constructed === true,
    screen_positive_candidate_change_row:
      previousFields.screen_positive_candidate_change_row === true ||
      materializationFields.screen_positive_candidate_change_row === true,
    signed_boundary_delta_contract_defined: previousFields.signed_boundary_delta_contract_defined === true,
    same_packet_history_update_formula_present: previousFields.same_packet_history_update_formula_present === true,
    exact_screen_zero_certified: context.exactScreenZeroCertified,
    rank_certified: context.rankCertified,
    candidate_artifact_namespace_defined: context.candidateArtifactNamespaceDefined,
    candidate_artifacts_same_packet_validated: context.candidateArtifactsSamePacketValidated,
    candidate_replay_same_packet_validated: context.candidateReplaySamePacketValidated,
    candidate_artifact_replay_ready: context.candidateArtifactReplayReady,
    row_replay_ready: false,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  fields.row_replay_ready = ROW_READINESS_FIELDS.every(
    (field) => ["row_replay_ready", "row_consumed", "branch_chart_authorized"].includes(field) || fields[field] === true
  );
  return {
    row_id: rowAttempt.row_id,
    source_interval: rowAttempt.source_interval,
    receiver_interval: rowAttempt.receiver_interval,
    failed_side: rowAttempt.failed_side,
    boundary_side: rowAttempt.boundary_side,
    source_endpoint_contract_id: rowAttempt.source_endpoint_contract_id,
    receiver_endpoint_contract_id: rowAttempt.receiver_endpoint_contract_id,
    proposed_fold_coordinate_assignment: materializationRow?.proposed_fold_coordinate_assignment ?? null,
    required_fields_present: fields,
    row_replay_ready: fields.row_replay_ready,
    row_consumed: false,
    branch_chart_authorized: false,
    blocking_codes: endpointBlockingCodes(fields),
    obstruction:
      "The row keeps its local formula pair and positive screen witness, but it has no global source/receiver domain/evaluation pair, no same-packet candidate artifact validation, no candidate replay, and no row-consumption authority.",
  };
}

function buildRootTopologyGate(context, lambda0305ReplayAudit) {
  const lambdaTopology = lambda0305ReplayAudit?.topology_recertification ?? null;
  return {
    binary64_status: "absent_for_fold_coordinate_candidate",
    interval_status: context.candidateArtifacts.root_topology_interval_certificate.present
      ? "present_not_validated_for_same_packet_candidate"
      : "absent_for_fold_coordinate_candidate",
    root_count_interval_certified: false,
    root_count_bound: null,
    min_derivative_floor: null,
    min_complement_margin: null,
    same_packet_artifact_refs: {
      phi_cyc: context.candidateArtifacts.same_packet_phi_cyc.basename,
      mesh: context.candidateArtifacts.same_packet_mesh.basename,
      preledger_input_screen: context.candidateArtifacts.same_packet_preledger_input_screen.basename,
      interval_certificate: context.candidateArtifacts.root_topology_interval_certificate.basename,
    },
    direct_path_lambda0305_contrast: lambdaTopology
      ? {
          binary64_status: lambdaTopology.binary64_status ?? null,
          interval_status: lambdaTopology.interval_status ?? null,
          root_count_interval_certified: lambdaTopology.root_count_interval_certified === true,
          min_derivative_floor: lambdaTopology.binary64_min_derivative_floor ?? null,
          min_complement_margin:
            lambdaTopology.interval_min_complement_margin ?? lambdaTopology.binary64_min_complement_margin ?? null,
          reusable_for_fold_coordinate_candidate: false,
        }
      : null,
  };
}

function buildReplayGate(context, lambda0305ReplayAudit) {
  const lambdaReplay = lambda0305ReplayAudit?.ephemeral_preledger_replay ?? {};
  return {
    candidate_namespace: context.candidateArtifactNamespace,
    replay_audit_artifact: context.candidateArtifacts.proof_interval_replay_audit,
    candidate_replay_stages: allStagesFalse(),
    candidate_replay_same_packet_validated: context.candidateReplaySamePacketValidated,
    direct_path_lambda0305_contrast: Object.fromEntries(
      ["v1", "v2", "v3", "v4", "v5", "v6"].map((stage) => [
        stage,
        lambdaReplay[stage]
          ? {
              ledger_sha256: lambdaReplay[stage].ledger_sha256 ?? null,
              split_required_base_rows: lambdaReplay[stage].split_required_base_rows ?? null,
              accepted_fold_layer_rows: lambdaReplay[stage].accepted_fold_layer_rows ?? null,
              receiver_cover_complete_parent_rows: lambdaReplay[stage].receiver_cover_complete_parent_rows ?? null,
              branch_chart_authorized: lambdaReplay[stage].branch_chart_authorized === true,
              reusable_for_fold_coordinate_candidate: false,
            }
          : null,
      ])
    ),
  };
}

function buildPacketFields(context) {
  const fields = {
    global_domain_evaluation_attempt_imported: true,
    global_domain_evaluation_maps_constructed: context.globalMapsConstructed,
    row_global_domain_evaluation_pairs_constructed: context.rowGlobalPairsConstructed,
    candidate_artifact_namespace_defined: context.candidateArtifactNamespaceDefined,
    candidate_phi_cyc_present: context.candidateArtifacts.same_packet_phi_cyc.present,
    candidate_mesh_present: context.candidateArtifacts.same_packet_mesh.present,
    candidate_preledger_input_screen_present: context.candidateArtifacts.same_packet_preledger_input_screen.present,
    candidate_root_topology_certificate_present: context.candidateArtifacts.root_topology_interval_certificate.present,
    candidate_preledger_replay_present: context.candidateArtifacts.proof_interval_replay_audit.present,
    candidate_artifacts_same_packet_validated: context.candidateArtifactsSamePacketValidated,
    candidate_replay_same_packet_validated: context.candidateReplaySamePacketValidated,
    candidate_artifact_replay_ready: context.candidateArtifactReplayReady,
    row_consumed: false,
    branch_chart_authorized: false,
  };
  return fields;
}

function buildAudit(inputs, sources) {
  assertInputs(inputs);
  const context = buildReadinessContext(inputs);
  const materializationByRow = byId(inputs.materializationAudit.rows);
  const endpointReadiness = inputs.globalAttempt.endpoint_global_domain_evaluation_attempts.map((endpointAttempt) =>
    buildEndpointReadiness(endpointAttempt, context)
  );
  const rowReadiness = inputs.globalAttempt.row_global_domain_evaluation_attempts.map((rowAttempt) =>
    buildRowReadiness(rowAttempt, materializationByRow.get(rowAttempt.row_id), context)
  );
  const packetFields = buildPacketFields(context);
  const endpointCounts = countFields(endpointReadiness, ENDPOINT_READINESS_FIELDS);
  const rowCounts = countFields(rowReadiness, ROW_READINESS_FIELDS);
  const lambda0305ReplayAudit = inputs.lambda0305ReplayAudit;
  return {
    schema: "breather-higher-fold-fold-coordinate-endpoint-functional-candidate-artifact-replay-readiness-audit-v1",
    packet_id: PACKET_ID,
    fold_coordinate_packet_id: FOLD_COORDINATE_PACKET_ID,
    status: "fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit_fail_closed",
    theorem_target: "Fold-Coordinate Endpoint-Functional Candidate Artifact Replay Readiness Audit",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    claim_level:
      "priority-only readiness audit; same-packet endpoint-functional candidate artifacts and replay are not ready",
    authorization_lock: {
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      row_consumption_count: 0,
    },
    source_artifacts: {
      globalDomainEvaluationAttempt: artifactRecord(sources.globalDomainEvaluationAttempt),
      materializationAudit: artifactRecord(sources.materializationAudit),
      historyContract: artifactRecord(sources.historyContract),
      historyTheoremAttempt: artifactRecord(sources.historyTheoremAttempt),
      lambda0305ReplayAudit: artifactRecord(sources.lambda0305ReplayAudit),
    },
    candidate_run_id: context.candidateRunId,
    artifact_stem: context.artifactStem,
    candidate_artifact_namespace: context.candidateArtifactNamespace,
    readiness_rule:
      "Candidate artifact replay is ready only when the same packet supplies global endpoint-functional domain/evaluation maps, same-packet fold-coordinate candidate artifacts, exact $B\\xi=0$, rank, candidate root topology recertification, proof-interval v1-v6 replay, row consumption, and branch-chart authorization in the fold-coordinate candidate namespace.",
    no_reuse_rule:
      "Direct-path `lambda=0.305` artifacts are contrast artifacts only; their topology certificate and replay do not validate the fold-coordinate candidate namespace.",
    candidate_artifacts: context.candidateArtifacts,
    root_topology_recertification: buildRootTopologyGate(context, lambda0305ReplayAudit),
    proof_interval_v1_v6_replay: buildReplayGate(context, lambda0305ReplayAudit),
    exact_linear_certificate: {
      B_xi_residual_verified_zero_with_tolerance: false,
      B_xi_residual_certified_zero: false,
      rank_B_certified: false,
      nullity: null,
      exact_screen_zero_certified: context.exactScreenZeroCertified,
      rank_certified: context.rankCertified,
    },
    row_consumption_gate: {
      preledger_pass: false,
      row_consumption_count: 0,
      accepted_fold_layer_rows: 0,
      split_required_base_rows: null,
      row_consumed: false,
      branch_chart_authorized: false,
      direct_path_lambda0305_split_required_base_rows:
        lambda0305ReplayAudit?.ephemeral_preledger_replay?.v6?.split_required_base_rows ?? null,
      direct_path_lambda0305_accepted_fold_layer_rows:
        lambda0305ReplayAudit?.ephemeral_preledger_replay?.v6?.accepted_fold_layer_rows ?? null,
    },
    direct_path_contrast: {
      materialization_contrast: inputs.materializationAudit.direct_path_contrast,
      lambda0305_replay_status: lambda0305ReplayAudit?.status ?? null,
      lambda0305_topology_recertified:
        lambda0305ReplayAudit?.topology_recertification?.root_count_interval_certified === true,
      lambda0305_preledger_pass: lambda0305ReplayAudit?.preledger_pass === true,
      lambda0305_branch_chart_authorized: lambda0305ReplayAudit?.branch_chart_authorized === true,
      reusable_for_fold_coordinate_candidate: false,
      reason:
        "The lambda=0.305 files materialize the shifted-separator direct-path seed and replay that seed. They do not contain fold-coordinate endpoint-functional history update formulas or same-packet candidate replay.",
    },
    packet_required_fields_present: packetFields,
    endpoint_readiness_attempts: endpointReadiness,
    row_readiness_attempts: rowReadiness,
    summary: {
      endpoint_functionals: endpointReadiness.length,
      rows: rowReadiness.length,
      local_formula_candidates_available: inputs.globalAttempt.summary.local_formula_candidates_available,
      component_endpoint_identities_exact: inputs.globalAttempt.summary.component_endpoint_identities_exact,
      global_domain_evaluation_maps_constructed: inputs.globalAttempt.summary.global_domain_evaluation_maps_constructed,
      row_global_domain_evaluation_pairs_constructed: inputs.globalAttempt.summary.rows_with_global_domain_evaluation_pairs,
      candidate_artifacts_present: context.candidateArtifactsPresent,
      candidate_artifact_count: context.candidateArtifactsExpected,
      candidate_artifacts_same_packet_validated: context.candidateArtifactsSamePacketValidated,
      root_topology_recertifications: inputs.globalAttempt.summary.topology_recertifications,
      proof_interval_v1_v6_replays: inputs.globalAttempt.summary.proof_interval_v1_v6_replays,
      exact_screen_zero_certified: context.exactScreenZeroCertified,
      rank_certified: context.rankCertified,
      endpoint_replay_ready_count: endpointReadiness.filter((attempt) => attempt.candidate_artifact_replay_ready).length,
      row_replay_ready_count: rowReadiness.filter((row) => row.row_replay_ready).length,
      row_consumption_count: 0,
      branch_chart_authorized: false,
      packet_required_fields_certified_counts: Object.fromEntries(
        PACKET_READINESS_FIELDS.map((field) => [field, packetFields[field] === true ? 1 : 0])
      ),
      endpoint_required_fields_certified_counts: endpointCounts,
      row_required_fields_certified_counts: rowCounts,
    },
  };
}

function artifactTable(artifacts) {
  return Object.entries(artifacts)
    .map(([name, artifact]) => `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present} |`)
    .join("\n");
}

function packetFieldTable(audit) {
  return PACKET_READINESS_FIELDS.map(
    (field) => `| \`${field}\` | ${audit.packet_required_fields_present[field] === true} |`
  ).join("\n");
}

function endpointTable(endpointReadiness) {
  return endpointReadiness
    .map(
      (attempt) =>
        `| \`${attempt.id}\` | ${attempt.required_fields_present.local_formula_candidate_available} | ${attempt.required_fields_present.component_endpoint_identities_exact} | ${attempt.required_fields_present.global_domain_evaluation_map_constructed} | ${attempt.required_fields_present.candidate_artifacts_same_packet_validated} | ${attempt.required_fields_present.candidate_replay_same_packet_validated} | ${attempt.candidate_artifact_replay_ready} |`
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | ${row.required_fields_present.local_formula_candidate_pair_available} | ${row.required_fields_present.local_target_action_pair_exact} | ${row.required_fields_present.global_domain_evaluation_pair_constructed} | ${row.required_fields_present.screen_positive_candidate_change_row} | ${row.required_fields_present.candidate_artifacts_same_packet_validated} | ${row.required_fields_present.candidate_replay_same_packet_validated} | ${row.row_replay_ready} |`
    )
    .join("\n");
}

function fieldTable(counts, fields, total) {
  return fields.map((field) => `| \`${field}\` | ${counts[field]} / ${total} |`).join("\n");
}

function lambdaReplayTable(audit) {
  const contrast = audit.proof_interval_v1_v6_replay.direct_path_lambda0305_contrast;
  return Object.entries(contrast)
    .map(
      ([stage, record]) =>
        `| \`${stage}\` | \`${record?.ledger_sha256 ?? null}\` | ${record?.split_required_base_rows ?? null} | ${record?.accepted_fold_layer_rows ?? null} | ${record?.branch_chart_authorized === true} | ${record?.reusable_for_fold_coordinate_candidate === true} |`
    )
    .join("\n");
}

function buildReport(audit) {
  return `# Higher-Fold Fold-Coordinate Endpoint-Functional Candidate Artifact Replay Readiness Audit

## Verdict

The readiness audit fail-closes. The endpoint-functional route has 4 / 4 local
$\\Psi_j$ formula candidates and 4 / 4 exact component endpoint identities, but
it has 0 / 4 global domain/evaluation maps, 0 / 5 same-packet candidate
artifacts, 0 / 4 topology recertifications, 0 / 4 proof-interval v1-v6 replays,
and 0 / 3 replay-ready rows. It consumes 0 rows and authorizes no branch chart.

| Quantity | Value |
| --- | ---: |
| Endpoint functionals | ${audit.summary.endpoint_functionals} |
| Rows | ${audit.summary.rows} |
| Local $\\Psi_j$ formula candidates available | ${audit.summary.local_formula_candidates_available} |
| Component endpoint identities exact | ${audit.summary.component_endpoint_identities_exact} |
| Global domain/evaluation maps constructed | ${audit.summary.global_domain_evaluation_maps_constructed} |
| Row global domain/evaluation pairs constructed | ${audit.summary.row_global_domain_evaluation_pairs_constructed} |
| Candidate artifacts present | ${audit.summary.candidate_artifacts_present} / ${audit.summary.candidate_artifact_count} |
| Candidate artifacts same-packet validated | ${audit.summary.candidate_artifacts_same_packet_validated} |
| Topology recertifications | ${audit.summary.root_topology_recertifications} |
| Proof-interval v1-v6 replays | ${audit.summary.proof_interval_v1_v6_replays} |
| Exact $B\\xi=0$ certified | ${audit.summary.exact_screen_zero_certified} |
| Rank certified | ${audit.summary.rank_certified} |
| Endpoint replay-ready count | ${audit.summary.endpoint_replay_ready_count} |
| Row replay-ready count | ${audit.summary.row_replay_ready_count} |
| Row consumption count | ${audit.summary.row_consumption_count} |
| Branch chart authorized | ${audit.summary.branch_chart_authorized} |

## Readiness Rule

${audit.readiness_rule}

${audit.no_reuse_rule}

## Candidate Namespace

| Field | Value |
| --- | --- |
| Candidate run id | \`${audit.candidate_run_id}\` |
| Artifact stem | \`${audit.artifact_stem}\` |
| Candidate artifact namespace | \`${audit.candidate_artifact_namespace}\` |

## Packet Readiness Fields

| Field | Present |
| --- | --- |
${packetFieldTable(audit)}

## Candidate Artifacts

| Artifact | File | Present |
| --- | --- | --- |
${artifactTable(audit.candidate_artifacts)}

## Endpoint Readiness

| Endpoint variable | Local formula | Local identity exact | Global map | Same-packet artifacts validated | Same-packet replay validated | Replay ready |
| --- | --- | --- | --- | --- | --- | --- |
${endpointTable(audit.endpoint_readiness_attempts)}

## Endpoint Field Audit

| Field | Endpoint count |
| --- | ---: |
${fieldTable(audit.summary.endpoint_required_fields_certified_counts, ENDPOINT_READINESS_FIELDS, audit.summary.endpoint_functionals)}

## Row Readiness

| Row | Local formula pair | Local target pair exact | Global pair | Screen positive | Same-packet artifacts validated | Same-packet replay validated | Replay ready |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(audit.row_readiness_attempts)}

## Row Field Audit

| Field | Row count |
| --- | ---: |
${fieldTable(audit.summary.row_required_fields_certified_counts, ROW_READINESS_FIELDS, audit.summary.rows)}

## Gate Audit

Root topology for the fold-coordinate candidate is absent: binary64 status is
\`${audit.root_topology_recertification.binary64_status}\`, interval status is
\`${audit.root_topology_recertification.interval_status}\`, and
root-count interval certification is
${audit.root_topology_recertification.root_count_interval_certified}.

The exact-linear certificate remains absent: exact $B\\xi=0$ is
${audit.exact_linear_certificate.B_xi_residual_certified_zero} and rank is
${audit.exact_linear_certificate.rank_certified}.

Row consumption is closed: \`preledger_pass=false\`,
\`row_consumption_count=0\`, and \`branch_chart_authorized=false\`.

## Direct-Path Contrast

The \`lambda=0.305\` replay remains non-reusable for this audit. It certifies a
direct-path trial seed, not the fold-coordinate candidate namespace.

| Stage | Ledger SHA-256 | Split-required rows | Accepted fold-layer rows | Branch chart authorized | Reusable |
| --- | --- | ---: | ---: | --- | --- |
${lambdaReplayTable(audit)}

## Closure Burden

The next mathematical object is not another replay invocation. The route first
needs actual same-packet endpoint-functional domain/evaluation maps for the
\`fc_*\` variables, including global coordinate rules, gluing/periodicity,
endpoint motion, non-target zero certificates, exact $B\\xi=0$, and rank. Only
then can candidate \`phi_cyc\`, \`mesh\`, preledger-input, topology, and v1-v6
replay artifacts be emitted in the fold-coordinate candidate namespace.

## Capture Decision

Priority-only readiness audit. This packet should not be promoted into authored
AAA prose because it is diagnostic and fail-closed. It is useful as a routing
closure: the endpoint-functional route cannot advance to same-packet candidate
artifact emission or proof-interval replay from the current data.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputs = {
    globalAttempt: readJson(args.globalDomainEvaluationAttempt),
    materializationAudit: readJson(args.materializationAudit),
    historyContract: readJson(args.historyContract),
    historyTheoremAttempt: readJson(args.historyTheoremAttempt),
    lambda0305ReplayAudit: readJson(args.lambda0305ReplayAudit),
  };
  const sources = {
    globalDomainEvaluationAttempt: args.globalDomainEvaluationAttempt,
    materializationAudit: args.materializationAudit,
    historyContract: args.historyContract,
    historyTheoremAttempt: args.historyTheoremAttempt,
    lambda0305ReplayAudit: args.lambda0305ReplayAudit,
  };
  const audit = buildAudit(inputs, sources);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, audit, args.pretty);
  writeText(outReport, buildReport(audit));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
