#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_SOURCE_READINESS = `${CERT_DIR}/higher_fold_layer_separator_source_field_readiness_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PROOF_FIELD_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_proof_field_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ACCEPTANCE_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CANDIDATE_ATLAS = `${CERT_DIR}/higher_fold_layer_atlas_ref_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ROOT_TUBE = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_FOLD_LAYER_BURDEN = `${CERT_DIR}/fold_layer_burden.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const STATUS =
  "higher_fold_layer_alpha_exit_parity_child_field_interval_diagnostic_fail_closed_candidate_child_sources_present_proof_grade_child_derivations_absent_no_row_consumption";
const ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const SOURCE_PACKET_ACCEPTANCE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const FIRST_CHILD_DERIVATION_BLOCKER = "proof_grade_alpha_floor_derivation_absent";
const EXIT_DERIVATION_BLOCKER = "proof_grade_exit_floor_derivation_absent";
const PARITY_RECORD_BLOCKER = "explicit_fold_layer_parity_record_delta_fields_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";
const FOLD_LAYER_FAILURE = "trig_range_overlap_touches_fold_layer_candidate";

const CHILD_PROOF_FIELDS = ["alpha_floor", "exit_floor", "fold_layer_parity_record"];
const ENDPOINT_SIGNS = new Set(["positive", "negative"]);
const ROW_LOCK_FIELDS = [
  "alpha_floor",
  "exit_floor",
  "fold_layer_parity_record",
  "higher_fold_separator_layer_certificate",
  "accepted_fold_layer_row",
  "row_consumed",
];

function parseArgs(argv) {
  const args = {
    sourceReadiness: DEFAULT_SOURCE_READINESS,
    proofFieldDependency: DEFAULT_PROOF_FIELD_DEPENDENCY,
    acceptanceDependency: DEFAULT_ACCEPTANCE_DEPENDENCY,
    candidateAtlas: DEFAULT_CANDIDATE_ATLAS,
    rootTube: DEFAULT_ROOT_TUBE,
    foldLayerBurden: DEFAULT_FOLD_LAYER_BURDEN,
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
    } else if (arg === "--proof-field-dependency") {
      args.proofFieldDependency = argv[++index];
    } else if (arg === "--acceptance-dependency") {
      args.acceptanceDependency = argv[++index];
    } else if (arg === "--candidate-atlas") {
      args.candidateAtlas = argv[++index];
    } else if (arg === "--root-tube") {
      args.rootTube = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-alpha-exit-parity-child-field-interval-diagnostic.mjs [options]

Options:
  --source-readiness PATH       Separator source-field readiness classifier. Defaults to ${DEFAULT_SOURCE_READINESS}.
  --proof-field-dependency PATH Separator proof-field dependency classifier. Defaults to ${DEFAULT_PROOF_FIELD_DEPENDENCY}.
  --acceptance-dependency PATH  Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_ACCEPTANCE_DEPENDENCY}.
  --candidate-atlas PATH        Candidate atlas-ref materialization attempt. Defaults to ${DEFAULT_CANDIDATE_ATLAS}.
  --root-tube PATH              Higher-fold root-tube interval certificate. Defaults to ${DEFAULT_ROOT_TUBE}.
  --fold-layer-burden PATH      Fold-layer burden atlas. Defaults to ${DEFAULT_FOLD_LAYER_BURDEN}.
  --out-dir PATH                Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                      Pretty-print JSON artifact.
  --help                        Show this help.`);
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

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
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
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function falseFieldMap(fields) {
  return Object.fromEntries(fields.map((field) => [field, false]));
}

function qFromDecimalToken(value) {
  const text = String(value);
  if (!/^-?\d+(?:\.\d+)?$/.test(text)) {
    throw new Error(`Cannot parse decimal token as rational: ${text}`);
  }
  const negative = text.startsWith("-");
  const unsigned = negative ? text.slice(1) : text;
  const [integer, fraction = ""] = unsigned.split(".");
  const denominator = 10n ** BigInt(fraction.length);
  const numerator = BigInt(`${integer}${fraction}`) * (negative ? -1n : 1n);
  return reduceQ({ numerator, denominator });
}

function qFromJson(value) {
  if (Array.isArray(value) && value.length === 2) {
    return [qFromJson(value[0]), qFromJson(value[1])];
  }
  if (typeof value === "string" || typeof value === "number") {
    return qFromDecimalToken(value);
  }
  if (value?.numerator != null && value?.denominator != null) {
    return reduceQ({ numerator: BigInt(value.numerator), denominator: BigInt(value.denominator) });
  }
  throw new Error(`Cannot parse rational value: ${JSON.stringify(value)}`);
}

function gcd(a, b) {
  let left = a < 0n ? -a : a;
  let right = b < 0n ? -b : b;
  while (right !== 0n) {
    const next = left % right;
    left = right;
    right = next;
  }
  return left === 0n ? 1n : left;
}

function reduceQ(q) {
  if (q.denominator === 0n) {
    throw new Error("Zero denominator.");
  }
  const sign = q.denominator < 0n ? -1n : 1n;
  const numerator = q.numerator * sign;
  const denominator = q.denominator * sign;
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

function qCmp(left, right) {
  const delta = left.numerator * right.denominator - right.numerator * left.denominator;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function qSub(left, right) {
  return reduceQ({
    numerator: left.numerator * right.denominator - right.numerator * left.denominator,
    denominator: left.denominator * right.denominator,
  });
}

function qMin(values) {
  return values.reduce((current, value) => (qCmp(value, current) < 0 ? value : current));
}

function qJson(q) {
  return {
    numerator: q.numerator.toString(),
    denominator: q.denominator.toString(),
  };
}

function qDisplay(q, digits = 18) {
  const sign = q.numerator < 0n ? "-" : "";
  const numerator = q.numerator < 0n ? -q.numerator : q.numerator;
  const integer = numerator / q.denominator;
  let remainder = numerator % q.denominator;
  const decimals = [];
  for (let index = 0; index < digits && remainder !== 0n; index += 1) {
    remainder *= 10n;
    decimals.push((remainder / q.denominator).toString());
    remainder %= q.denominator;
  }
  return decimals.length === 0 ? `${sign}${integer.toString()}` : `${sign}${integer.toString()}.${decimals.join("")}`;
}

function qArtifact(q) {
  return {
    ...qJson(q),
    display: qDisplay(q),
  };
}

function intervalWidth(range) {
  if (!Array.isArray(range) || range.length !== 2) {
    throw new Error(`Expected two-entry range, got ${JSON.stringify(range)}`);
  }
  const [lo, hi] = qFromJson(range);
  return qSub(hi, lo);
}

function validateInputs(inputs) {
  assertPacketId(inputs.sourceReadiness, "sourceReadiness");
  assertPacketId(inputs.proofFieldDependency, "proofFieldDependency");
  assertPacketId(inputs.acceptanceDependency, "acceptanceDependency");
  assertPacketId(inputs.candidateAtlas, "candidateAtlas");
  assertPacketId(inputs.rootTube, "rootTube");
  assertPacketId(inputs.foldLayerBurden, "foldLayerBurden");
  assertFailClosed(inputs.sourceReadiness, "sourceReadiness");
  assertFailClosed(inputs.proofFieldDependency, "proofFieldDependency");
  assertFailClosed(inputs.acceptanceDependency, "acceptanceDependency");
  assertFailClosed(inputs.candidateAtlas, "candidateAtlas");
  assertFailClosed(inputs.foldLayerBurden, "foldLayerBurden");

  if (inputs.acceptanceDependency.status !== ACCEPTANCE_STATUS) {
    throw new Error("Acceptance dependency classifier is not at the expected fail-closed status.");
  }
  if (
    inputs.acceptanceDependency.summary?.first_source_packet_blocker !== SOURCE_PACKET_ACCEPTANCE_BLOCKER
  ) {
    throw new Error("Acceptance dependency classifier no longer exposes the expected acceptance-rule blocker.");
  }
  if (inputs.sourceReadiness.summary?.separator_profiles_with_candidate_interval_source_complete !== 12) {
    throw new Error("Expected 12 complete separator source-field profiles.");
  }
  if (inputs.proofFieldDependency.summary?.proof_field_dependency_counts?.alpha_floor?.candidate_source_anchor_present !== 12) {
    throw new Error("Expected alpha_floor candidate source anchors for all 12 separators.");
  }
  if (inputs.proofFieldDependency.summary?.proof_field_dependency_counts?.exit_floor?.candidate_source_anchor_present !== 12) {
    throw new Error("Expected exit_floor candidate source anchors for all 12 separators.");
  }
  if (
    inputs.proofFieldDependency.summary?.proof_field_dependency_counts?.fold_layer_parity_record
      ?.candidate_source_anchor_present !== 12
  ) {
    throw new Error("Expected fold_layer_parity_record candidate source anchors for all 12 separators.");
  }
  if (inputs.candidateAtlas.summary?.separator_atlas_source_candidates !== 12) {
    throw new Error("Expected 12 separator atlas source candidates.");
  }
  if (inputs.candidateAtlas.summary?.rows_with_candidate_higher_fold_layer_atlas_ref !== 112) {
    throw new Error("Expected candidate atlas refs on all 112 fold-layer rows.");
  }
  if (inputs.rootTube.summary?.all_root_tubes_certified_one_root !== true) {
    throw new Error("Root-tube artifact no longer certifies one root in every tube.");
  }
  if (inputs.rootTube.summary?.all_complements_certified_no_extra_root !== true) {
    throw new Error("Root-tube artifact no longer certifies no extra root on complements.");
  }
  if (inputs.foldLayerBurden.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 fold-layer rows in the fold-layer burden atlas.");
  }
}

function buildSeparatorWitnesses(inputs) {
  const sourceProfileBySeparator = new Map(
    inputs.sourceReadiness.separator_source_field_profiles.map((profile) => [profile.separator_event, profile]),
  );
  const candidateBySeparator = new Map(
    inputs.candidateAtlas.atlas_source_candidates.map((candidate) => [candidate.separator_event, candidate]),
  );
  const rootTubeBySeparator = new Map(inputs.rootTube.root_tubes.map((tube) => [tube.contact_id, tube]));

  return [...inputs.sourceReadiness.separator_source_field_profiles]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((profile) => {
      const candidate = candidateBySeparator.get(profile.separator_event);
      const rootTube = rootTubeBySeparator.get(profile.separator_event);
      if (!candidate) {
        throw new Error(`Missing candidate atlas source for ${profile.separator_event}`);
      }
      if (!rootTube) {
        throw new Error(`Missing root-tube interval source for ${profile.separator_event}`);
      }
      const sourceProfile = sourceProfileBySeparator.get(profile.separator_event);
      const thetaWidth = intervalWidth(candidate.theta_range);
      const tWidth = intervalWidth(candidate.t_range);
      const inputThetaWidth = intervalWidth(candidate.input_screen_theta_range);
      const inputTWidth = intervalWidth(candidate.input_screen_t_range);
      const meshThetaWidth = intervalWidth(candidate.mesh_preledger_theta_range);
      const meshTWidth = intervalWidth(candidate.mesh_preledger_t_range);
      const minSourceRectangleWidth = qMin([thetaWidth, tWidth, inputThetaWidth, inputTWidth, meshThetaWidth, meshTWidth]);
      const alphaFloorSource = qFromJson(rootTube.derivative_floor_q);
      const alphaSourcePositive = qCmp(alphaFloorSource, { numerator: 0n, denominator: 1n }) > 0;
      const exitSourcePositive = qCmp(minSourceRectangleWidth, { numerator: 0n, denominator: 1n }) > 0;
      const paritySourceComplete =
        rootTube.endpoint_sign_change_interval === true &&
        ENDPOINT_SIGNS.has(rootTube.left_sign) &&
        ENDPOINT_SIGNS.has(rootTube.right_sign) &&
        rootTube.left_sign !== rootTube.right_sign &&
        rootTube.derivative_sign != null &&
        Array.isArray(rootTube.root_count_bound_q) &&
        rootTube.root_count_bound_q[0] === 1 &&
        rootTube.root_count_bound_q[1] === 1 &&
        inputs.rootTube.summary?.all_complements_certified_no_extra_root === true;

      return {
        separator_event: profile.separator_event,
        fold_interval: profile.fold_interval,
        atlas_candidate_id: profile.atlas_candidate_id,
        row_count: profile.row_count,
        row_ids: profile.row_ids,
        candidate_interval_source_complete: profile.candidate_interval_source_complete === true,
        candidate_alpha_floor_source: {
          source_field: "root_tube_derivative_floor_source",
          derivative_floor_q: qArtifact(alphaFloorSource),
          positive: alphaSourcePositive,
          proof_grade_alpha_floor_present: false,
          first_missing_dependency: FIRST_CHILD_DERIVATION_BLOCKER,
        },
        candidate_exit_floor_source: {
          source_fields: [
            "layer_geometry_interval_source",
            "input_screen_fold_interval_source",
            "mesh_fold_interval_source",
          ],
          layer_theta_width_q: qArtifact(thetaWidth),
          layer_t_width_q: qArtifact(tWidth),
          input_screen_theta_width_q: qArtifact(inputThetaWidth),
          input_screen_t_width_q: qArtifact(inputTWidth),
          mesh_preledger_theta_width_q: qArtifact(meshThetaWidth),
          mesh_preledger_t_width_q: qArtifact(meshTWidth),
          min_source_rectangle_width_q: qArtifact(minSourceRectangleWidth),
          positive_source_width: exitSourcePositive,
          proof_grade_exit_floor_present: false,
          first_missing_dependency: EXIT_DERIVATION_BLOCKER,
        },
        candidate_parity_source: {
          source_fields: ["root_tube_one_root_interval_source", "root_tube_derivative_floor_source"],
          endpoint_sign_change_interval: rootTube.endpoint_sign_change_interval === true,
          left_sign: rootTube.left_sign,
          right_sign: rootTube.right_sign,
          derivative_sign: rootTube.derivative_sign,
          root_count_bound_q: rootTube.root_count_bound_q,
          complements_certified_no_extra_root: inputs.rootTube.summary?.all_complements_certified_no_extra_root === true,
          source_complete: paritySourceComplete,
          explicit_delta_root_count_even_present: false,
          explicit_delta_signed_degree_zero_present: false,
          local_even_jump_present: false,
          parity_status_present: false,
          proof_grade_fold_layer_parity_record_present: false,
          first_missing_dependency: PARITY_RECORD_BLOCKER,
        },
        candidate_child_witness_sources_complete:
          alphaSourcePositive &&
          exitSourcePositive &&
          paritySourceComplete &&
          sourceProfile?.candidate_source_fields_present?.root_tube_derivative_floor_source === true,
        proof_grade_child_fields_present_after_classifier: falseFieldMap(CHILD_PROOF_FIELDS),
        higher_fold_separator_layer_certificate_present: false,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    });
}

function buildRowWitnesses(inputs, separatorWitnesses) {
  const witnessBySeparator = new Map(separatorWitnesses.map((witness) => [witness.separator_event, witness]));
  return [...inputs.foldLayerBurden.rows]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((row) => {
      if (row.failure_code !== FOLD_LAYER_FAILURE) {
        throw new Error(`Unexpected fold-layer failure code for ${row.row_id}: ${row.failure_code}`);
      }
      const witness = witnessBySeparator.get(row.separator_event);
      if (!witness) {
        throw new Error(`Missing separator child witness profile for ${row.row_id}: ${row.separator_event}`);
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
        interval_type_pair: `${row.receiver_type} -> ${row.source_type}`,
        candidate_child_witness_sources_complete: witness.candidate_child_witness_sources_complete,
        candidate_alpha_floor_source_positive: witness.candidate_alpha_floor_source.positive,
        candidate_exit_floor_source_positive: witness.candidate_exit_floor_source.positive_source_width,
        candidate_parity_source_complete: witness.candidate_parity_source.source_complete,
        proof_grade_fields_present_after_classifier: falseFieldMap(ROW_LOCK_FIELDS),
        first_child_derivation_blocker: FIRST_CHILD_DERIVATION_BLOCKER,
        parity_record_blocker: PARITY_RECORD_BLOCKER,
        source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
        separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
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
  const separatorWitnesses = buildSeparatorWitnesses(inputs);
  const rowWitnesses = buildRowWitnesses(inputs, separatorWitnesses);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowWitnesses, (row) => row.separator_event));
  const minAlpha = qMin(separatorWitnesses.map((witness) => qFromJson(witness.candidate_alpha_floor_source.derivative_floor_q)));
  const minExitWidth = qMin(
    separatorWitnesses.map((witness) => qFromJson(witness.candidate_exit_floor_source.min_source_rectangle_width_q)),
  );

  const summary = {
    separator_child_witness_profiles: separatorWitnesses.length,
    fold_layer_rows: rowWitnesses.length,
    rows_by_separator_count: rowsBySeparatorCount,
    separators_with_candidate_child_witness_sources_complete: countTrue(
      separatorWitnesses,
      (witness) => witness.candidate_child_witness_sources_complete,
    ),
    rows_with_candidate_child_witness_sources_complete: countTrue(
      rowWitnesses,
      (row) => row.candidate_child_witness_sources_complete,
    ),
    separators_with_candidate_alpha_floor_positive_source: countTrue(
      separatorWitnesses,
      (witness) => witness.candidate_alpha_floor_source.positive,
    ),
    rows_with_candidate_alpha_floor_positive_source: countTrue(
      rowWitnesses,
      (row) => row.candidate_alpha_floor_source_positive,
    ),
    min_candidate_alpha_floor_source_q: qArtifact(minAlpha),
    separators_with_candidate_exit_floor_positive_source_width: countTrue(
      separatorWitnesses,
      (witness) => witness.candidate_exit_floor_source.positive_source_width,
    ),
    rows_with_candidate_exit_floor_positive_source_width: countTrue(
      rowWitnesses,
      (row) => row.candidate_exit_floor_source_positive,
    ),
    min_candidate_exit_source_rectangle_width_q: qArtifact(minExitWidth),
    separators_with_candidate_parity_source_complete: countTrue(
      separatorWitnesses,
      (witness) => witness.candidate_parity_source.source_complete,
    ),
    rows_with_candidate_parity_source_complete: countTrue(rowWitnesses, (row) => row.candidate_parity_source_complete),
    separators_with_explicit_fold_layer_parity_record: 0,
    rows_with_explicit_fold_layer_parity_record: 0,
    proof_grade_child_field_presence_counts_after_classifier: {
      alpha_floor: { present: 0, missing: rowWitnesses.length },
      exit_floor: { present: 0, missing: rowWitnesses.length },
      fold_layer_parity_record: { present: 0, missing: rowWitnesses.length },
    },
    row_lock_field_presence_counts: presenceCounts(rowWitnesses, ROW_LOCK_FIELDS),
    first_child_derivation_blocker: FIRST_CHILD_DERIVATION_BLOCKER,
    exit_derivation_blocker: EXIT_DERIVATION_BLOCKER,
    parity_record_blocker: PARITY_RECORD_BLOCKER,
    source_packet_acceptance_blocker: SOURCE_PACKET_ACCEPTANCE_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-alpha-exit-parity-child-field-interval-diagnostic-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only child-field interval diagnostic for the 12 higher-fold separator-layer profiles; materializes positive candidate alpha-floor sources, positive exit-source rectangle widths, and root-tube parity sources while proving no proof-grade alpha_floor, exit_floor, fold_layer_parity_record, row consumption, preledger pass, live-ledger update, or branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      higher_fold_layer_separator_source_field_readiness_classifier: artifactRecord(paths.sourceReadiness),
      higher_fold_layer_separator_proof_field_dependency_classifier: artifactRecord(paths.proofFieldDependency),
      higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(
        paths.acceptanceDependency,
      ),
      higher_fold_layer_atlas_ref_source_candidate_classifier: artifactRecord(paths.candidateAtlas),
      fresh_v10_higher_fold_root_tube_interval_certificate: artifactRecord(paths.rootTube),
      fold_layer_burden_atlas: artifactRecord(paths.foldLayerBurden),
    },
    classifier_rule:
      "A candidate child witness records same-packet interval source data only. Positive root-tube derivative floors and positive source rectangle widths are not proof-grade alpha_floor or exit_floor fields until a derivation rule accepts them. Root-tube one-root and endpoint-sign evidence is not a fold_layer_parity_record until explicit delta_root_count, delta_signed_degree, local_even_jump, and parity_status fields are constructed.",
    separator_child_witness_profiles: separatorWitnesses,
    row_child_witness_profiles: rowWitnesses,
    summary,
    next_certificate_handoff: {
      mechanical_child_field_targets: [
        "derive proof-grade alpha_floor from the exact root_tube_derivative_floor_source",
        "derive proof-grade exit_floor from same-packet layer/input-screen/mesh interval geometry",
        "construct explicit fold_layer_parity_record fields delta_root_count, delta_signed_degree, local_even_jump, and parity_status from the root-tube one-root/complement packet",
      ],
      parallel_blocker:
        "the impulse/direct-quadrature source-packet route remains blocked by the absent fixed-parameter separator-aggregate acceptance rule",
      final_certificate_target:
        "same-packet interval-certified higher_fold_separator_layer_certificate carrying accepted higher_fold_layer_atlas_ref, alpha_floor, exit_floor, same_packet_fold_impulse_or_direct_quadrature_bound, fold_layer_parity_record, and parent_complement_consumption_ref for Sigma_hf_01 through Sigma_hf_12",
      continuation_class:
        "mechanical on the alpha/exit/parity child-field derivation targets; not mechanical through source-packet acceptance without a proof-rule or accepted constants artifact",
      fail_closed_stop_conditions: [
        "Do not count candidate derivative floors as proof-grade alpha_floor.",
        "Do not count positive source rectangle widths as proof-grade exit_floor.",
        "Do not count root-tube one-root evidence as fold_layer_parity_record without explicit delta fields.",
        "Do not set higher_fold_separator_layer_certificate, accepted_fold_layer_row, row_consumed, preledger_pass, updates_live_ledger, or branch_chart_authorized from this classifier.",
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
      "Priority-only. This artifact sharpens the child-field side of the fold-layer blocker by materializing the available alpha/exit/parity candidate witnesses and separating them from the absent proof-grade derivations.",
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

function fieldPresenceTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(profiles) {
  return profiles
    .map(
      (profile) =>
        `| \`${profile.separator_event}\` | \`${profile.fold_interval}\` | ${profile.row_count} | ${profile.candidate_alpha_floor_source.positive} | \`${profile.candidate_alpha_floor_source.derivative_floor_q.display}\` | ${profile.candidate_exit_floor_source.positive_source_width} | \`${profile.candidate_exit_floor_source.min_source_rectangle_width_q.display}\` | ${profile.candidate_parity_source.source_complete} | ${profile.candidate_parity_source.proof_grade_fold_layer_parity_record_present} |`,
    )
    .join("\n");
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.candidate_child_witness_sources_complete} | ${row.proof_grade_fields_present_after_classifier.alpha_floor} | ${row.proof_grade_fields_present_after_classifier.exit_floor} | ${row.proof_grade_fields_present_after_classifier.fold_layer_parity_record} | ${row.row_consumed} |`,
    )
    .join("\n");
}

function writeReport(filePath, classifier) {
  const report = `# Higher-Fold Layer Alpha/Exit/Parity Child-Field Interval Diagnostic

Packet: \`${PACKET_ID}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier takes the already-complete separator source-field profiles and
materializes the child-field witness side that does not require the current
source-packet acceptance decision. It records
${classifier.summary.separators_with_candidate_alpha_floor_positive_source} / ${classifier.summary.separator_child_witness_profiles}
separator profiles with positive candidate alpha-floor sources,
${classifier.summary.separators_with_candidate_exit_floor_positive_source_width} / ${classifier.summary.separator_child_witness_profiles}
separator profiles with positive exit-source rectangle widths, and
${classifier.summary.separators_with_candidate_parity_source_complete} / ${classifier.summary.separator_child_witness_profiles}
separator profiles with root-tube parity source evidence.

The minimum candidate alpha source is
\`${classifier.summary.min_candidate_alpha_floor_source_q.display}\`. The
minimum positive source-rectangle width feeding the exit-floor target is
\`${classifier.summary.min_candidate_exit_source_rectangle_width_q.display}\`.

The blocker is now split cleanly:

- alpha child field: \`${classifier.summary.first_child_derivation_blocker}\`;
- exit child field: \`${classifier.summary.exit_derivation_blocker}\`;
- parity child field: \`${classifier.summary.parity_record_blocker}\`;
- impulse/direct-quadrature source packet:
  \`${classifier.summary.source_packet_acceptance_blocker}\`;
- separator certificate:
  \`${classifier.summary.first_separator_certificate_blocker}\`.

This artifact does not accept any of those fields. It records 0 / ${classifier.summary.fold_layer_rows}
rows with proof-grade \`alpha_floor\`, proof-grade \`exit_floor\`, proof-grade
\`fold_layer_parity_record\`, \`higher_fold_separator_layer_certificate\`, row
consumption, \`preledger_pass\`, live-ledger update, or branch-chart
authorization.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Separator Child Witness Profiles

| Separator | Fold interval | Rows | Candidate alpha positive | Candidate alpha source | Candidate exit positive | Candidate exit source width | Parity source complete | Proof-grade parity record |
| --- | --- | ---: | --- | ---: | --- | ---: | --- | --- |
${separatorTable(classifier.separator_child_witness_profiles)}

## Proof-Grade Child Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.proof_grade_child_field_presence_counts_after_classifier)}

## Row Lock Field Presence

| Field | Present rows | Missing rows |
| --- | ---: | ---: |
${fieldPresenceTable(classifier.summary.row_lock_field_presence_counts)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(classifier.summary.rows_by_separator_count)}

## Row Child Witness Profiles

| Row | Separator | Fold interval | Candidate witnesses complete | Alpha floor | Exit floor | Parity record | Row consumed |
| --- | --- | --- | --- | --- | --- | --- | --- |
${rowTable(classifier.row_child_witness_profiles)}

## Certificate-Side Handoff

Mechanical child-field targets:

${classifier.next_certificate_handoff.mechanical_child_field_targets.map((item) => `- ${item}.`).join("\n")}

Parallel blocker: ${classifier.next_certificate_handoff.parallel_blocker}.

Final certificate target:
\`${classifier.next_certificate_handoff.final_certificate_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false

This artifact is priority-only. It proves no \`alpha_floor\`, \`exit_floor\`,
\`fold_layer_parity_record\`, \`higher_fold_separator_layer_certificate\`,
accepted fold-layer row, row consumption, live-ledger update, or branch-chart
authorization.
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
    proofFieldDependency: args.proofFieldDependency,
    acceptanceDependency: args.acceptanceDependency,
    candidateAtlas: args.candidateAtlas,
    rootTube: args.rootTube,
    foldLayerBurden: args.foldLayerBurden,
  };
  const inputs = {
    sourceReadiness: readJson(paths.sourceReadiness),
    proofFieldDependency: readJson(paths.proofFieldDependency),
    acceptanceDependency: readJson(paths.acceptanceDependency),
    candidateAtlas: readJson(paths.candidateAtlas),
    rootTube: readJson(paths.rootTube),
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
