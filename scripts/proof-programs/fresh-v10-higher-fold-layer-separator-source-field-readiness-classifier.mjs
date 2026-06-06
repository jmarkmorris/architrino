#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SEPARATOR_ATTEMPT = `${CERT_DIR}/higher_fold_layer_separator_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OBLIGATION = `${CERT_DIR}/higher_fold_layer_accepted_atlas_ref_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CANDIDATE_ATLAS = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_READINESS = `${CERT_DIR}/higher_fold_layer_same_packet_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_separator_source_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_separator_source_field_readiness_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_separator_source_field_readiness_classifier_fail_closed_candidate_interval_sources_present_proof_grade_fields_absent_no_row_consumption";
const FIRST_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";
const PROOF_GRADE_FIELDS = [
  "higher_fold_separator_layer_certificate",
  "higher_fold_layer_atlas_ref",
  "alpha_floor",
  "exit_floor",
  "same_packet_fold_impulse_or_direct_quadrature_bound",
  "fold_layer_parity_record",
  "parent_complement_consumption_ref",
];

function parseArgs(argv) {
  const args = {
    separatorAttempt: DEFAULT_SEPARATOR_ATTEMPT,
    obligation: DEFAULT_OBLIGATION,
    candidateAtlas: DEFAULT_CANDIDATE_ATLAS,
    rootTube: DEFAULT_ROOT_TUBE,
    readiness: DEFAULT_READINESS,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--separator-attempt") {
      args.separatorAttempt = argv[++index];
    } else if (arg === "--obligation") {
      args.obligation = argv[++index];
    } else if (arg === "--candidate-atlas") {
      args.candidateAtlas = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
    } else if (arg === "--readiness") {
      args.readiness = argv[++index];
    } else if (arg === "--fold-layer-burden") {
      args.foldLayerBurden = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-separator-source-field-readiness-classifier.mjs [options]

Options:
  --separator-attempt PATH  Separator certificate attempt. Defaults to ${DEFAULT_SEPARATOR_ATTEMPT}.
  --obligation PATH         Accepted atlas-ref obligation classifier. Defaults to ${DEFAULT_OBLIGATION}.
  --candidate-atlas PATH    Candidate atlas-ref materialization attempt. Defaults to ${DEFAULT_CANDIDATE_ATLAS}.
  --root-tube PATH          Higher-fold root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
  --readiness PATH          Same-packet field readiness classifier. Defaults to ${DEFAULT_READINESS}.
  --fold-layer-burden PATH  Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --out-dir PATH            Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                  Pretty-print JSON artifact.
  --help                    Show this help.`);
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

function allPresent(object, fields) {
  return fields.every((field) => object[field] === true);
}

function fieldPresenceCounts(rows, fieldAccessor) {
  return Object.fromEntries(
    PROOF_GRADE_FIELDS.map((field) => {
      const present = countTrue(rows, (row) => fieldAccessor(row)[field]);
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

function validateFailClosedArtifact(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false || source.branch_chart_authorized !== false) {
    throw new Error(`Refusing ${name}: fail-closed authorization lock drifted.`);
  }
}

function validateInputs(inputs) {
  assertPacketId(inputs.separatorAttempt, "separatorAttempt");
  assertPacketId(inputs.obligation, "obligation");
  assertPacketId(inputs.candidateAtlas, "candidateAtlas");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.readiness, "readiness");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");

  validateFailClosedArtifact(inputs.separatorAttempt, "separatorAttempt");
  validateFailClosedArtifact(inputs.obligation, "obligation");
  validateFailClosedArtifact(inputs.candidateAtlas, "candidateAtlas");
  validateFailClosedArtifact(inputs.readiness, "readiness");
  validateFailClosedArtifact(inputs.foldLayerBurden, "foldLayerBurden");

  if (inputs.separatorAttempt.summary?.separator_certificate_attempts !== 12) {
    throw new Error("Expected 12 separator certificate attempts.");
  }
  if (inputs.separatorAttempt.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in separator attempt.");
  }
  if (inputs.separatorAttempt.summary?.rows_with_higher_fold_separator_layer_certificate !== 0) {
    throw new Error("Separator attempt already reports separator-layer certificates.");
  }
  if (inputs.obligation.summary?.separator_atlas_source_candidates_with_complete_source_evidence !== 12) {
    throw new Error("Obligation classifier no longer has 12 complete separator source candidates.");
  }
  if (inputs.candidateAtlas.summary?.rows_with_candidate_higher_fold_layer_atlas_ref !== 112) {
    throw new Error("Candidate atlas artifact no longer assigns candidate refs to 112 rows.");
  }
  if (inputs.readiness.summary?.fold_layer_rows !== 112 || inputs.foldLayerBurden.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in readiness and burden artifacts.");
  }
  if (inputs.rootTube.summary?.root_tube_count !== 12) {
    throw new Error("Expected 12 root tubes.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube artifact no longer certifies one root in every tube.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube artifact no longer certifies no extra root on complements.");
  }
}

function requiredCandidateSourceFields(candidate, rootTube) {
  return {
    candidate_higher_fold_layer_atlas_ref_source: candidate?.candidate_higher_fold_layer_atlas_ref_present === true,
    layer_geometry_interval_source:
      Array.isArray(candidate?.theta_range) &&
      Array.isArray(candidate?.t_range) &&
      Array.isArray(candidate?.ledger_theta_range) &&
      Array.isArray(candidate?.ledger_t_range),
    input_screen_fold_interval_source:
      Array.isArray(candidate?.input_screen_theta_range) && Array.isArray(candidate?.input_screen_t_range),
    mesh_fold_interval_source:
      candidate?.mesh_subblock_ref != null &&
      Array.isArray(candidate?.mesh_preledger_theta_range) &&
      Array.isArray(candidate?.mesh_subblock_theta_range),
    root_tube_one_root_interval_source: rootTube?.interval_certified_one_root === true,
    root_tube_derivative_floor_source: rootTube?.derivative_floor_display != null,
    root_complement_no_extra_root_packet_source: true,
  };
}

function buildSeparatorProfiles(inputs) {
  const candidateById = new Map(inputs.candidateAtlas.atlas_source_candidates.map((candidate) => [candidate.atlas_candidate_id, candidate]));
  const rootTubeByContact = new Map(inputs.rootTube.root_tubes.map((tube) => [tube.contact_id, tube]));
  const attemptByCandidate = new Map(
    inputs.separatorAttempt.separator_certificate_attempts.map((attempt) => [attempt.atlas_candidate_id, attempt]),
  );

  return [...inputs.obligation.separator_atlas_ref_obligations]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((obligation) => {
      const candidate = candidateById.get(obligation.atlas_candidate_id);
      if (!candidate) {
        throw new Error(`Missing candidate atlas source for ${obligation.atlas_candidate_id}`);
      }
      const rootTube = rootTubeByContact.get(obligation.separator_event);
      if (!rootTube) {
        throw new Error(`Missing root-tube source for ${obligation.separator_event}`);
      }
      const attempt = attemptByCandidate.get(obligation.atlas_candidate_id);
      if (!attempt) {
        throw new Error(`Missing separator certificate attempt for ${obligation.atlas_candidate_id}`);
      }
      const candidateSourceFields = requiredCandidateSourceFields(candidate, rootTube);
      const candidateIntervalSourceComplete = allPresent(candidateSourceFields, Object.keys(candidateSourceFields));
      const proofGradeFields = falseFieldMap(PROOF_GRADE_FIELDS);

      return {
        separator_event: obligation.separator_event,
        fold_interval: obligation.fold_interval,
        atlas_candidate_id: obligation.atlas_candidate_id,
        row_count: obligation.row_count,
        row_ids: obligation.row_ids,
        root_tube_ref: candidate.root_tube_ref,
        root_tube_equation: candidate.root_tube_equation,
        theta_range: candidate.theta_range,
        t_range: candidate.t_range,
        root_tube_theta_interval_display: candidate.root_tube_theta_interval_display,
        root_tube_t_interval_display: candidate.root_tube_t_interval_display,
        root_tube_derivative_floor_display: candidate.root_tube_derivative_floor_display,
        root_tube_root_count_bound_q: rootTube.root_count_bound_q,
        root_tube_interval_certified_one_root: rootTube.interval_certified_one_root === true,
        candidate_source_fields_present: candidateSourceFields,
        candidate_interval_source_complete: candidateIntervalSourceComplete,
        candidate_interval_source_is_proof_grade_separator_certificate: false,
        diagnostic_fold_impulse_constants_rejected: attempt.diagnostic_fold_impulse_constants_rejected === true,
        diagnostic_fold_impulse_constants_rejection_reasons: attempt.diagnostic_fold_impulse_constants_rejection_reasons,
        proof_grade_fields_present_after_classifier: proofGradeFields,
        remaining_missing_proof_grade_fields: PROOF_GRADE_FIELDS,
        first_certificate_blocker: FIRST_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowProfiles(inputs, separatorProfiles) {
  const separatorByCandidate = new Map(separatorProfiles.map((profile) => [profile.atlas_candidate_id, profile]));

  return [...inputs.obligation.row_obligation_classification]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      if (row.failure_code !== FOLD_LAYER_FAILURE) {
        throw new Error(`Unexpected fold-layer failure code for ${row.row_id}: ${row.failure_code}`);
      }
      const separatorProfile = separatorByCandidate.get(row.candidate_higher_fold_layer_atlas_ref);
      if (!separatorProfile) {
        throw new Error(`Missing separator profile for ${row.row_id}: ${row.candidate_higher_fold_layer_atlas_ref}`);
      }
      return {
        row_id: row.row_id,
        ledger: row.ledger,
        status: row.status,
        failure_code: row.failure_code,
        separator_event: row.separator_event,
        fold_interval: row.fold_interval,
        receiver_interval: row.receiver_interval,
        source_interval: row.source_interval,
        candidate_higher_fold_layer_atlas_ref: row.candidate_higher_fold_layer_atlas_ref,
        candidate_interval_source_complete: separatorProfile.candidate_interval_source_complete,
        proof_grade_fields_present_after_classifier: falseFieldMap(PROOF_GRADE_FIELDS),
        remaining_missing_proof_grade_fields: PROOF_GRADE_FIELDS,
        first_certificate_blocker: FIRST_BLOCKER,
        row_acceptance_ready: false,
        accepted_fold_layer_row: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
      };
    });
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const separatorProfiles = buildSeparatorProfiles(inputs);
  const rowProfiles = buildRowProfiles(inputs, separatorProfiles);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowProfiles, (row) => row.separator_event));
  const candidateSourceFieldCounts = Object.fromEntries(
    Object.keys(separatorProfiles[0].candidate_source_fields_present).map((field) => {
      const present = countTrue(separatorProfiles, (profile) => profile.candidate_source_fields_present[field]);
      return [
        field,
        {
          present,
          missing: separatorProfiles.length - present,
        },
      ];
    }),
  );
  const summary = {
    separator_source_field_profiles: separatorProfiles.length,
    separator_profiles_with_candidate_interval_source_complete: countTrue(
      separatorProfiles,
      (profile) => profile.candidate_interval_source_complete,
    ),
    separator_profiles_with_diagnostic_fold_impulse_constants_rejected: countTrue(
      separatorProfiles,
      (profile) => profile.diagnostic_fold_impulse_constants_rejected,
    ),
    root_tube_one_root_interval_sources: countTrue(
      separatorProfiles,
      (profile) => profile.root_tube_interval_certified_one_root,
    ),
    root_complement_no_extra_root_packet_present: inputs.rootTube.summary?.all_complements_certified_no_extra_root === true,
    root_tube_count_bound_q: inputs.rootTube.summary?.total_root_count_bound_q,
    min_root_derivative_floor_display: inputs.rootTube.summary?.min_root_derivative_floor_display,
    min_complement_abs_residual_display: inputs.rootTube.summary?.min_complement_abs_residual_display,
    fold_layer_rows: rowProfiles.length,
    rows_by_separator_count: rowsBySeparatorCount,
    rows_with_candidate_interval_source_complete: countTrue(rowProfiles, (row) => row.candidate_interval_source_complete),
    accepted_higher_fold_separator_layer_certificates: 0,
    accepted_higher_fold_layer_atlas_refs: 0,
    proof_grade_field_presence_counts_after_classifier: fieldPresenceCounts(
      rowProfiles,
      (row) => row.proof_grade_fields_present_after_classifier,
    ),
    candidate_source_field_presence_counts: candidateSourceFieldCounts,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-separator-source-field-readiness-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only source-field readiness classifier for the 12 higher-fold separator-layer certificate profiles; separates candidate interval source data from absent proof-grade separator-layer certificate fields and proves no row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_separator_certificate_attempt: artifactRecord(paths.separatorAttempt),
      higher_fold_layer_accepted_atlas_ref_obligation_classifier: artifactRecord(paths.obligation),
      higher_fold_layer_atlas_ref_source_candidate_classifier: artifactRecord(paths.candidateAtlas),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      higher_fold_layer_same_packet_field_readiness_classifier: artifactRecord(paths.readiness),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
    },
    classifier_rule:
      "A candidate separator profile is source-field-ready only as candidate interval data when same-packet layer geometry, input-screen interval, mesh interval, root-tube one-root certificate, derivative-floor source, and complement no-extra-root packet source are all present. It is not a proof-grade separator certificate unless it also supplies an accepted higher_fold_separator_layer_certificate, accepted higher_fold_layer_atlas_ref derivation, alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, and parent_complement_consumption_ref.",
    separator_source_field_profiles: separatorProfiles,
    row_source_field_profiles: rowProfiles,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "same-packet interval-certified higher_fold_separator_layer_certificate source packet for Sigma_hf_01 through Sigma_hf_12",
      mechanical_continuation:
        "mechanical only after constructing proof-grade alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound or direct quadrature bound, fold_layer_parity_record, parent_complement_consumption_ref, and accepted higher_fold_layer_atlas_ref derivation from the already-classified candidate interval sources",
      decision_boundary:
        "if those proof-grade fields cannot be derived from existing same-packet interval sources, the lane needs an explicit proof-rule or primitive-acceptance decision before any promotion or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat candidate interval source completeness as higher_fold_separator_layer_certificate.",
        "Do not treat candidate_higher_fold_layer_atlas_ref as accepted higher_fold_layer_atlas_ref.",
        "Do not reuse wrong-packet diagnostic fold impulse constants as proof-grade higher-fold data.",
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
      "Priority-only. This artifact sharpens the fold-layer certificate blocker by distinguishing complete candidate interval source profiles from the still-missing proof-grade separator certificate fields.",
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

function fieldTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(profiles) {
  return profiles
    .map(
      (profile) =>
        `| \`${profile.separator_event}\` | \`${profile.fold_interval}\` | ${profile.row_count} | ${profile.candidate_interval_source_complete} | ${profile.root_tube_interval_certified_one_root} | ${profile.diagnostic_fold_impulse_constants_rejected} | ${profile.proof_grade_fields_present_after_classifier.higher_fold_separator_layer_certificate} | ${profile.proof_grade_fields_present_after_classifier.higher_fold_layer_atlas_ref} | \`${profile.first_certificate_blocker}\` |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.candidate_interval_source_complete} | ${row.proof_grade_fields_present_after_classifier.higher_fold_separator_layer_certificate} | ${row.proof_grade_fields_present_after_classifier.higher_fold_layer_atlas_ref} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Separator Source-Field Readiness Classifier

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier separates the interval source material that exists from the
proof-grade separator fields that are still absent. The same-packet candidate
side is complete for
${classifier.summary.separator_profiles_with_candidate_interval_source_complete} / ${classifier.summary.separator_source_field_profiles}
separator profiles and
${classifier.summary.rows_with_candidate_interval_source_complete} / ${classifier.summary.fold_layer_rows}
fold-layer rows. The root-tube interval certificate supplies
${classifier.summary.root_tube_one_root_interval_sources} one-root tube sources,
certifies the complement packet as no-extra-root, and records total root count
\`${classifier.summary.root_tube_count_bound_q.join("..")}\`.

That still does not construct \`higher_fold_separator_layer_certificate\`.
After this classifier, 0 / ${classifier.summary.fold_layer_rows} rows have an
accepted separator-layer certificate, 0 / ${classifier.summary.fold_layer_rows}
rows have accepted \`higher_fold_layer_atlas_ref\`, and every required
proof-grade separator-side field remains absent.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Source Profiles

| Separator | Fold interval | Rows | Candidate interval source complete | Root-tube one-root source | Diagnostic constants rejected | Separator certificate | Accepted atlas ref | First blocker |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
${separatorTable(classifier.separator_source_field_profiles)}

## Candidate Source Field Presence

| Candidate source field | Present profiles | Missing profiles |
| --- | ---: | ---: |
${fieldTable(classifier.summary.candidate_source_field_presence_counts)}

## Proof-Grade Field Presence After Classifier

| Proof-grade field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldTable(classifier.summary.proof_grade_field_presence_counts_after_classifier)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Row Source-Field Profiles

| Row | Separator | Fold interval | Candidate interval source complete | Separator certificate | Accepted atlas ref | Row consumed |
| --- | --- | --- | --- | --- | --- | --- |
${rowTable(classifier.row_source_field_profiles)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Mechanical continuation: ${classifier.next_certificate_handoff.mechanical_continuation}.

Decision boundary: ${classifier.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is a priority-only classifier. It proves no
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
    separatorAttempt: args.separatorAttempt,
    obligation: args.obligation,
    candidateAtlas: args.candidateAtlas,
    rootTube: args.rootTube,
    readiness: args.readiness,
    foldLayerBurden: args.foldLayerBurden,
  };
  const inputs = {
    separatorAttempt: readJson(paths.separatorAttempt),
    obligation: readJson(paths.obligation),
    candidateAtlas: readJson(paths.candidateAtlas),
    rootTube: readJson(paths.rootTube),
    readiness: readJson(paths.readiness),
    foldLayerBurden: readJson(paths.foldLayerBurden),
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
