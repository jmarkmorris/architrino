#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_READINESS = `${CERT_DIR}/higher_fold_layer_separator_source_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_ATTEMPT = `${CERT_DIR}/higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CANDIDATE_ATLAS = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS = `${CERT_DIR}/fold_impulse_constants.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_separator_proof_field_dependency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_separator_proof_field_dependency_classifier_fail_closed_impulse_direct_quadrature_source_packet_absent_no_row_consumption";
const FIRST_ACCEPTANCE_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const FIRST_SOURCE_PACKET_BLOCKER = "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_absent";
const PROOF_GRADE_FIELDS = [
  "higher_fold_separator_layer_certificate",
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];
const CHILD_PROOF_FIELDS = PROOF_GRADE_FIELDS.filter((field) => field !== "higher_fold_separator_layer_certificate");

const FIELD_RULES = {
  higher_fold_separator_layer_certificate: {
    candidate_sources: CHILD_PROOF_FIELDS,
    source_kind: "aggregate_certificate",
    first_missing_dependency: FIRST_ACCEPTANCE_BLOCKER,
    next_action: "construct the aggregate separator-layer certificate only after all child proof-grade fields exist",
  },
  higher_fold_layer_atlas_ref: {
    candidate_sources: [
      "candidate_higher_fold_layer_atlas_ref_source",
      "layer_geometry_interval_source",
      "root_tube_one_root_interval_source",
    ],
    source_kind: "candidate_interval_anchor_present",
    first_missing_dependency: "accepted_higher_fold_layer_atlas_ref_derivation_absent",
    next_action: "derive an accepted higher_fold_layer_atlas_ref from same-packet interval data",
  },
  alpha_floor: {
    candidate_sources: ["root_tube_derivative_floor_source"],
    source_kind: "candidate_interval_anchor_present",
    first_missing_dependency: "proof_grade_alpha_floor_derivation_absent",
    next_action: "derive a proof-grade alpha_floor from the same-packet separator-layer interval data",
  },
  exit_floor: {
    candidate_sources: [
      "layer_geometry_interval_source",
      "input_screen_fold_interval_source",
      "mesh_fold_interval_source",
    ],
    source_kind: "candidate_interval_anchor_present",
    first_missing_dependency: "proof_grade_exit_floor_derivation_absent",
    next_action: "derive a proof-grade exit_floor from the same-packet layer and mesh intervals",
  },
  same_packet_fold_impulse_or_direct_quadrature_bound: {
    candidate_sources: [],
    source_kind: "same_packet_source_packet_absent",
    first_missing_dependency: FIRST_SOURCE_PACKET_BLOCKER,
    next_action: "construct a same-packet fold impulse or direct quadrature bound source packet keyed to Sigma_hf_01 through Sigma_hf_12",
  },
  fold_layer_parity_record: {
    candidate_sources: ["root_tube_one_root_interval_source", "root_tube_derivative_floor_source"],
    source_kind: "candidate_interval_anchor_present",
    first_missing_dependency: "proof_grade_fold_layer_parity_record_absent",
    next_action: "derive a proof-grade fold_layer_parity_record from the same-packet root-tube orientation data",
  },
  parent_complement_consumption_ref: {
    candidate_sources: ["row_association_source_present"],
    source_kind: "candidate_row_anchor_present",
    first_missing_dependency: "parent_complement_consumption_ref_absent",
    next_action: "construct parent_complement_consumption_ref only after the separator certificate authorizes row-level fold-layer consumption",
  },
};

function parseArgs(argv) {
  const args = {
    sourceReadiness: DEFAULT_SOURCE_READINESS,
    separatorAttempt: DEFAULT_SEPARATOR_ATTEMPT,
    candidateAtlas: DEFAULT_CANDIDATE_ATLAS,
    rootTube: DEFAULT_ROOT_TUBE,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    diagnosticFoldImpulseConstants: DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source-readiness") {
      args.sourceReadiness = argv[++index];
    } else if (arg === "--separator-attempt") {
      args.separatorAttempt = argv[++index];
    } else if (arg === "--candidate-atlas") {
      args.candidateAtlas = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
    } else if (arg === "--diagnostic-fold-impulse-constants") {
      args.diagnosticFoldImpulseConstants = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-separator-proof-field-dependency-classifier.mjs [options]

Options:
  --source-readiness PATH                 Separator source-field readiness classifier. Defaults to ${DEFAULT_SOURCE_READINESS}.
  --separator-attempt PATH                Separator certificate attempt. Defaults to ${DEFAULT_SEPARATOR_ATTEMPT}.
  --candidate-atlas PATH                  Candidate atlas-ref materialization attempt. Defaults to ${DEFAULT_CANDIDATE_ATLAS}.
  --root-tube PATH                        Higher-fold root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
  --fold-layer-burden PATH                Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --diagnostic-fold-impulse-constants PATH Diagnostic fold impulse constants. Defaults to ${DEFAULT_DIAGNOSTIC_FOLD_IMPULSE_CONSTANTS}.
  --out-dir PATH                          Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                                Pretty-print JSON artifact.
  --help                                  Show this help.`);
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

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function validateFailClosedArtifact(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false || source.branch_chart_authorized !== false) {
    throw new Error(`Refusing ${name}: fail-closed authorization lock drifted.`);
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

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function diagnosticSeparatorKeys(diagnosticFoldImpulseConstants) {
  return Object.keys(diagnosticFoldImpulseConstants?.separators ?? {}).sort();
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourceReadiness, "sourceReadiness");
  assertPacketId(inputs.separatorAttempt, "separatorAttempt");
  assertPacketId(inputs.candidateAtlas, "candidateAtlas");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");

  validateFailClosedArtifact(inputs.sourceReadiness, "sourceReadiness");
  validateFailClosedArtifact(inputs.separatorAttempt, "separatorAttempt");
  validateFailClosedArtifact(inputs.candidateAtlas, "candidateAtlas");
  validateFailClosedArtifact(inputs.foldLayerBurden, "foldLayerBurden");

  if (inputs.sourceReadiness.summary?.separator_source_field_profiles !== 12) {
    throw new Error("Expected 12 separator source-field profiles.");
  }
  if (inputs.sourceReadiness.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in source-field readiness.");
  }
  if (inputs.sourceReadiness.summary?.separator_profiles_with_candidate_interval_source_complete !== 12) {
    throw new Error("Expected complete candidate interval sources for all 12 separator profiles.");
  }
  if (inputs.separatorAttempt.summary?.separator_attempts_with_diagnostic_fold_impulse_constants_rejected !== 12) {
    throw new Error("Expected diagnostic fold impulse constants to be rejected for all 12 separators.");
  }
  if (inputs.separatorAttempt.summary?.diagnostic_fold_impulse_constants_packet_matches_higher_fold !== false) {
    throw new Error("Diagnostic fold impulse constants unexpectedly match the higher-fold packet.");
  }
  if (inputs.separatorAttempt.summary?.diagnostic_fold_impulse_constants_matching_higher_fold_separators !== 0) {
    throw new Error("Diagnostic fold impulse constants unexpectedly match higher-fold separators.");
  }
  if (inputs.separatorAttempt.summary?.fold_layer_rows !== 112 || inputs.foldLayerBurden.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in separator attempt and burden artifacts.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube artifact no longer certifies one root in every tube.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube artifact no longer certifies no extra root on complements.");
  }
}

function fieldAnchorPresent(profile, field) {
  const rule = FIELD_RULES[field];
  if (field === "higher_fold_separator_layer_certificate") {
    return false;
  }
  if (field === "parent_complement_consumption_ref") {
    return Array.isArray(profile.row_ids) && profile.row_ids.length === profile.row_count && profile.row_count > 0;
  }
  if (field === "same_packet_fold_impulse_or_direct_quadrature_bound") {
    return false;
  }
  return rule.candidate_sources.every((source) => profile.candidate_source_fields_present?.[source] === true);
}

function buildFieldDependency(profile, field) {
  const rule = FIELD_RULES[field];
  const candidateSourceAnchorPresent = fieldAnchorPresent(profile, field);
  const diagnosticSourceRejected =
    ["alpha_floor", "exit_floor", "same_packet_fold_impulse_or_direct_quadrature_bound"].includes(field) &&
    profile.diagnostic_fold_impulse_constants_rejected === true;
  const firstMissingDependency =
    field === "higher_fold_separator_layer_certificate" && !candidateSourceAnchorPresent
      ? FIRST_ACCEPTANCE_BLOCKER
      : rule.first_missing_dependency;

  return {
    field,
    candidate_source_anchor_present: candidateSourceAnchorPresent,
    candidate_source_anchors: rule.candidate_sources,
    source_kind: rule.source_kind,
    diagnostic_source_rejected: diagnosticSourceRejected,
    diagnostic_source_reusable: false,
    proof_grade_present: false,
    proof_grade_ref: null,
    first_missing_dependency: firstMissingDependency,
    next_action: rule.next_action,
  };
}

function buildSeparatorProfiles(inputs) {
  return [...inputs.sourceReadiness.separator_source_field_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((profile) => ({
      separator_event: profile.separator_event,
      fold_interval: profile.fold_interval,
      atlas_candidate_id: profile.atlas_candidate_id,
      row_count: profile.row_count,
      row_ids: profile.row_ids,
      candidate_interval_source_complete: profile.candidate_interval_source_complete === true,
      root_tube_interval_certified_one_root: profile.root_tube_interval_certified_one_root === true,
      diagnostic_fold_impulse_constants_rejected: profile.diagnostic_fold_impulse_constants_rejected === true,
      diagnostic_fold_impulse_constants_rejection_reasons: profile.diagnostic_fold_impulse_constants_rejection_reasons,
      proof_field_dependencies: Object.fromEntries(
        PROOF_GRADE_FIELDS.map((field) => [field, buildFieldDependency(profile, field)]),
      ),
      first_same_packet_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
      first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      preledger_pass_rows: 0,
      branch_chart_authorized_rows: 0,
    }));
}

function buildRowProfiles(inputs, separatorProfiles) {
  const separatorByCandidate = new Map(separatorProfiles.map((profile) => [profile.atlas_candidate_id, profile]));
  return [...inputs.sourceReadiness.row_source_field_profiles]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      const separatorProfile = separatorByCandidate.get(row.candidate_higher_fold_layer_atlas_ref);
      if (!separatorProfile) {
        throw new Error(`Missing separator dependency profile for ${row.row_id}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        candidate_higher_fold_layer_atlas_ref: row.candidate_higher_fold_layer_atlas_ref,
        candidate_interval_source_complete: row.candidate_interval_source_complete === true,
        proof_grade_fields_present_after_dependency_classification: falseFieldMap(PROOF_GRADE_FIELDS),
        first_same_packet_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
        first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function fieldSummary(separatorProfiles) {
  return Object.fromEntries(
    PROOF_GRADE_FIELDS.map((field) => {
      const sourceAnchors = countTrue(separatorProfiles, (profile) => profile.proof_field_dependencies[field].candidate_source_anchor_present);
      const diagnosticRejected = countTrue(separatorProfiles, (profile) => profile.proof_field_dependencies[field].diagnostic_source_rejected);
      return [
        field,
        {
          candidate_source_anchor_present: sourceAnchors,
          candidate_source_anchor_missing: separatorProfiles.length - sourceAnchors,
          same_packet_source_packet_present: 0,
          proof_grade_present: 0,
          proof_grade_missing: separatorProfiles.length,
          diagnostic_source_rejected: diagnosticRejected,
          first_missing_dependency: FIELD_RULES[field].first_missing_dependency,
        },
      ];
    }),
  );
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separatorProfiles = buildSeparatorProfiles(inputs);
  const rowProfiles = buildRowProfiles(inputs, separatorProfiles);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const proofFieldSummary = fieldSummary(separatorProfiles);
  const diagnosticKeys = diagnosticSeparatorKeys(inputs.diagnosticFoldImpulseConstants);

  const summary = {
    separator_dependency_profiles: separatorProfiles.length,
    fold_layer_rows: rowProfiles.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separator_profiles_with_candidate_interval_source_complete: countTrue(
      separatorProfiles,
      (profile) => profile.candidate_interval_source_complete,
    ),
    separator_profiles_with_root_tube_one_root_source: countTrue(
      separatorProfiles,
      (profile) => profile.root_tube_interval_certified_one_root,
    ),
    separator_profiles_with_rejected_diagnostic_fold_impulse_constants: countTrue(
      separatorProfiles,
      (profile) => profile.diagnostic_fold_impulse_constants_rejected,
    ),
    diagnostic_fold_impulse_constants_packet_id: inputs.diagnosticFoldImpulseConstants.packet_id ?? null,
    diagnostic_fold_impulse_constants_status: inputs.diagnosticFoldImpulseConstants.status ?? null,
    diagnostic_fold_impulse_constants_separator_keys: diagnosticKeys,
    diagnostic_fold_impulse_constants_matching_higher_fold_separators:
      inputs.separatorAttempt.summary?.diagnostic_fold_impulse_constants_matching_higher_fold_separators ?? 0,
    proof_field_dependency_counts: proofFieldSummary,
    first_same_packet_source_packet_blocker: FIRST_SOURCE_PACKET_BLOCKER,
    first_acceptance_blocker: FIRST_ACCEPTANCE_BLOCKER,
    accepted_higher_fold_separator_layer_certificates: 0,
    accepted_higher_fold_layer_atlas_refs: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-separator-proof-field-dependency-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only proof-field dependency classifier for the 12 higher-fold separator-layer certificate profiles; identifies candidate source anchors and the first missing same-packet source packet while proving no proof-grade separator fields, row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_separator_source_field_readiness_classifier: artifactRecord(paths.sourceReadiness),
      higher_fold_layer_separator_certificate_attempt: artifactRecord(paths.separatorAttempt),
      higher_fold_layer_atlas_ref_source_candidate_classifier: artifactRecord(paths.candidateAtlas),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
      diagnostic_fold_impulse_constants: artifactRecord(paths.diagnosticFoldImpulseConstants),
    },
    classifier_rule:
      "Candidate interval source anchors are not proof-grade fields. This classifier marks a proof-grade field present only if the field itself has an accepted same-packet source packet or derivation. The present packet has candidate anchors for atlas-ref, alpha-floor, exit-floor, parity, and parent row association, but no same-packet fold impulse/direct-quadrature source packet and no accepted separator-layer certificate.",
    separator_dependency_profiles: separatorProfiles,
    row_dependency_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      first_mechanical_source_packet_target: "same_packet_fold_impulse_or_direct_quadrature_bound_source_packet",
      final_certificate_target:
        "same-packet interval-certified higher_fold_separator_layer_certificate carrying accepted higher_fold_layer_atlas_ref, alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, and parent_complement_consumption_ref for Sigma_hf_01 through Sigma_hf_12",
      continuation_class:
        "mechanical only if a same-packet fold impulse or direct-quadrature source packet can be constructed from the fresh-v10 higher-fold interval sources; promotion still requires proof-grade derivations for every child field and the aggregate separator-layer certificate",
      decision_boundary:
        "if no same-packet impulse/direct-quadrature construction can be stated from existing interval sources, the lane needs a proof-rule or primitive-acceptance decision before row consumption",
      fail_closed_stop_conditions: [
        "Do not treat candidate source anchors as proof-grade fields.",
        "Do not reuse wrong-packet diagnostic fold impulse constants.",
        "Do not treat row associations as parent_complement_consumption_ref.",
        "Do not set preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this classifier.",
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
      "Priority-only. This artifact reduces the live fold-layer blocker to the first missing same-packet source packet and keeps all proof-grade acceptance fields fail-closed.",
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

function fieldSummaryTable(counts) {
  return Object.entries(counts)
    .map(
      ([field, count]) =>
        `| \`${field}\` | ${count.candidate_source_anchor_present} | ${count.same_packet_source_packet_present} | ${count.proof_grade_present} | ${count.diagnostic_source_rejected} | \`${count.first_missing_dependency}\` |`,
    )
    .join("\n");
}

function separatorTable(profiles) {
  return profiles
    .map((profile) => {
      const deps = profile.proof_field_dependencies;
      return `| \`${profile.separator_event}\` | \`${profile.fold_interval}\` | ${profile.row_count} | ${profile.candidate_interval_source_complete} | ${deps.higher_fold_layer_atlas_ref.candidate_source_anchor_present} | ${deps.alpha_floor.candidate_source_anchor_present} | ${deps.exit_floor.candidate_source_anchor_present} | ${deps.same_packet_fold_impulse_or_direct_quadrature_bound.candidate_source_anchor_present} | ${deps.fold_layer_parity_record.candidate_source_anchor_present} | ${deps.parent_complement_consumption_ref.candidate_source_anchor_present} | \`${profile.first_same_packet_source_packet_blocker}\` |`;
    })
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Separator Proof-Field Dependency Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier starts from the separator source-field readiness artifact and
asks which required proof-grade separator fields have a usable source packet.
The positive source fact is unchanged: ${classifier.summary.separator_profiles_with_candidate_interval_source_complete} / ${classifier.summary.separator_dependency_profiles}
separator profiles and ${classifier.summary.fold_layer_rows} / ${classifier.summary.fold_layer_rows}
fold-layer rows have complete candidate interval source anchors.

The first missing same-packet source packet is
\`${classifier.summary.first_same_packet_source_packet_blocker}\`. The old
diagnostic fold impulse constants remain rejected: they are keyed by
\`${classifier.summary.diagnostic_fold_impulse_constants_separator_keys.join(", ")}\`,
not by \`Sigma_hf_*\`, and the separator attempt records
${classifier.summary.diagnostic_fold_impulse_constants_matching_higher_fold_separators}
matching higher-fold separators.

The first acceptance blocker remains
\`${classifier.summary.first_acceptance_blocker}\`: 0 / ${classifier.summary.fold_layer_rows}
rows have a separator-layer certificate, accepted atlas ref, proof-grade child
field, row consumption, \`preledger_pass\`, live-ledger update, or branch-chart
authorization.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Proof-Field Dependency Counts

| Proof-grade field | Candidate source anchors | Same-packet source packets | Proof-grade present | Diagnostic rejected | First missing dependency |
| --- | ---: | ---: | ---: | ---: | --- |
${fieldSummaryTable(classifier.summary.proof_field_dependency_counts)}

## Separator Dependency Profiles

| Separator | Fold interval | Rows | Candidate interval source complete | Atlas anchor | Alpha anchor | Exit anchor | Impulse/direct-quadrature anchor | Parity anchor | Parent-row anchor | First source-packet blocker |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_dependency_profiles)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Certificate-Side Handoff

First mechanical source-packet target:
\`${classifier.next_certificate_handoff.first_mechanical_source_packet_target}\`.

Final certificate target:
\`${classifier.next_certificate_handoff.final_certificate_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Decision boundary: ${classifier.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only dependency classifier. It proves no
\`higher_fold_separator_layer_certificate\`, accepted
\`higher_fold_layer_atlas_ref\`, alpha floor, exit floor, parity record, fold
impulse/direct quadrature bound, parent-complement consumption ref, row
consumption, live-ledger update, or branch-chart authorization.
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
    sourceReadiness: args.sourceReadiness,
    separatorAttempt: args.separatorAttempt,
    candidateAtlas: args.candidateAtlas,
    rootTube: args.rootTube,
    foldLayerBurden: args.foldLayerBurden,
    diagnosticFoldImpulseConstants: args.diagnosticFoldImpulseConstants,
  };
  const inputs = {
    sourceReadiness: readJson(paths.sourceReadiness),
    separatorAttempt: readJson(paths.separatorAttempt),
    candidateAtlas: readJson(paths.candidateAtlas),
    rootTube: readJson(paths.rootTube),
    foldLayerBurden: readJson(paths.foldLayerBurden),
    diagnosticFoldImpulseConstants: readJson(paths.diagnosticFoldImpulseConstants),
  };
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeReport(outReport, classifier);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();
