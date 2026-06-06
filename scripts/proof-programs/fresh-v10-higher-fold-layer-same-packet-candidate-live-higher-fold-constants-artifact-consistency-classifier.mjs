#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_MATERIALIZATION = `${CERT_DIR}/higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_SEPARATOR_AGGREGATE = `${CERT_DIR}/higher_fold_layer_same_packet_separator_aggregate_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OBLIGATION_CLASSIFIER = `${CERT_DIR}/higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_IMPULSE_ACCEPTANCE = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_CONSTANTS_CONFORMANCE = `${CERT_DIR}/higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_ASSEMBLY_DEPENDENCY = `${CERT_DIR}/higher_fold_layer_separator_certificate_assembly_dependency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const MATERIALIZATION_STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_materialization_attempt_fail_closed_exact_interval_fields_materialized_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";
const SEPARATOR_AGGREGATE_STATUS =
  "higher_fold_layer_same_packet_separator_aggregate_certificate_attempt_fail_closed_row_enclosures_separator_aggregates_certified_source_packets_absent_no_row_consumption";
const OBLIGATION_STATUS =
  "higher_fold_layer_same_packet_higher_fold_constants_artifact_field_obligation_classifier_fail_closed_interval_fields_complete_accepted_constants_artifact_absent_no_source_packet_acceptance_no_row_consumption";
const IMPULSE_ACCEPTANCE_STATUS =
  "higher_fold_layer_same_packet_impulse_bound_source_packet_acceptance_dependency_classifier_fail_closed_separator_aggregates_present_acceptance_rule_absent_no_row_consumption";
const CONSTANTS_CONFORMANCE_STATUS =
  "higher_fold_layer_same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier_fail_closed_aggregate_present_existing_constants_contract_packet_mismatch_no_source_packet_acceptance_no_row_consumption";
const ASSEMBLY_DEPENDENCY_STATUS =
  "higher_fold_layer_separator_certificate_assembly_dependency_classifier_fail_closed_child_refs_complete_atlas_bridge_impulse_acceptance_parent_consumption_absent_no_row_consumption";
const STATUS =
  "higher_fold_layer_same_packet_candidate_live_higher_fold_constants_artifact_consistency_classifier_fail_closed_candidate_exact_interval_consistency_verified_accepted_interval_certified_status_absent_no_source_packet_acceptance_no_row_consumption";

const ACCEPTED_ARTIFACT_BLOCKER = "accepted_same_packet_higher_fold_constants_artifact_absent";
const ACCEPTED_STATUS_BLOCKER = "accepted_interval_certified_constants_status_absent";
const SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER =
  "fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent";
const ATLAS_REF_BLOCKER = "accepted_higher_fold_layer_atlas_ref_derivation_absent";
const PARENT_CONSUMPTION_BLOCKER = "parent_complement_consumption_ref_absent";
const SEPARATOR_CERTIFICATE_BLOCKER = "higher_fold_separator_layer_certificate_absent";

const SOURCE_HASH_KEYS = [
  ["same_packet_separator_aggregate_certificate_attempt", "separatorAggregate"],
  ["higher_fold_constants_artifact_field_obligation_classifier", "obligationClassifier"],
  ["same_packet_impulse_bound_source_packet_acceptance_dependency_classifier", "impulseAcceptance"],
  ["same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier", "constantsConformance"],
  ["higher_fold_layer_separator_certificate_assembly_dependency_classifier", "assemblyDependency"],
];

const SEPARATOR_EXACT_FIELD_MAP = [
  ["eta_exact", "eta_exact"],
  ["eta_sqrt_lower_exact", "eta_sqrt_lower_exact"],
  ["eta_inv_sqrt_upper_exact", "eta_inv_sqrt_upper_exact"],
  ["L_r_sum_interval_exact", "L_r_sum_interval_exact"],
  ["C_Sigma_interval_exact", "C_Sigma_interval_exact"],
  ["A_Sigma_eta_epsilon_c_interval_exact", "A_Sigma_eta_epsilon_c_interval_exact"],
  ["I_fold_eta_epsilon_c_Sigma_interval_exact", "I_fold_eta_epsilon_c_Sigma_interval_exact"],
  ["normal_form_ceiling_lower_witness_interval_exact", "normal_form_ceiling_lower_witness_interval_exact"],
  [
    "normal_form_ceiling_minus_row_impulse_sum_interval_exact",
    "normal_form_ceiling_minus_row_impulse_sum_interval_exact",
  ],
];

const SEPARATOR_DISPLAY_FIELD_MAP = [
  ["L_r_sum_decimal_display", "L_r_sum_decimal"],
  ["C_Sigma_decimal_display", "C_Sigma_decimal"],
  ["A_Sigma_eta_epsilon_c_decimal_display", "A_Sigma_eta_epsilon_c_decimal"],
  ["I_fold_eta_epsilon_c_Sigma_decimal_display", "I_fold_eta_epsilon_c_Sigma_decimal"],
  ["normal_form_ceiling_lower_witness_decimal_display", "normal_form_ceiling_lower_witness_decimal"],
  [
    "normal_form_ceiling_minus_row_impulse_sum_decimal_display",
    "normal_form_ceiling_minus_row_impulse_sum_decimal",
  ],
];

const ROW_EXACT_FIELD_MAP = [
  ["M_delta_interval_exact", "M_delta_interval_exact"],
  ["delta_eta_sup_norm_interval_exact", "delta_eta_sup_norm_exact"],
  ["Gamma_interval_exact", "Gamma_interval_exact"],
  ["row_bound_constant_exact", "row_bound_constant_exact"],
  ["A_B_eta_epsilon_c_interval_exact", "A_B_eta_epsilon_c_interval_exact"],
  ["I_fold_eta_epsilon_c_B_interval_exact", "I_fold_eta_epsilon_c_B_interval_exact"],
];

const ROW_SOURCE_FIELD_MAP = [
  ["candidate_E_B", "candidate_E_B"],
  ["candidate_S_B_t", "candidate_S_B_t"],
  ["candidate_L_r_B", "candidate_L_r_B"],
  ["candidate_L_s_B", "candidate_L_s_B"],
  ["packet_g_exact", "packet_g_exact"],
  ["acceleration_enclosure_formula", "acceleration_enclosure_formula"],
  ["impulse_enclosure_formula", "impulse_enclosure_formula"],
];

function parseArgs(argv) {
  const args = {
    materialization: DEFAULT_MATERIALIZATION,
    separatorAggregate: DEFAULT_SEPARATOR_AGGREGATE,
    obligationClassifier: DEFAULT_OBLIGATION_CLASSIFIER,
    impulseAcceptance: DEFAULT_IMPULSE_ACCEPTANCE,
    constantsConformance: DEFAULT_CONSTANTS_CONFORMANCE,
    assemblyDependency: DEFAULT_ASSEMBLY_DEPENDENCY,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--materialization") {
      args.materialization = argv[++index];
    } else if (arg === "--separator-aggregate") {
      args.separatorAggregate = argv[++index];
    } else if (arg === "--obligation-classifier") {
      args.obligationClassifier = argv[++index];
    } else if (arg === "--impulse-acceptance") {
      args.impulseAcceptance = argv[++index];
    } else if (arg === "--constants-conformance") {
      args.constantsConformance = argv[++index];
    } else if (arg === "--assembly-dependency") {
      args.assemblyDependency = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-artifact-consistency-classifier.mjs [options]

Options:
  --materialization PATH          Candidate-live constants artifact materialization attempt. Defaults to ${DEFAULT_MATERIALIZATION}.
  --separator-aggregate PATH      Same-packet separator aggregate certificate attempt. Defaults to ${DEFAULT_SEPARATOR_AGGREGATE}.
  --obligation-classifier PATH    Higher-fold constants artifact field obligation classifier. Defaults to ${DEFAULT_OBLIGATION_CLASSIFIER}.
  --impulse-acceptance PATH       Impulse-bound source-packet acceptance dependency classifier. Defaults to ${DEFAULT_IMPULSE_ACCEPTANCE}.
  --constants-conformance PATH    Accepted constants conformance classifier. Defaults to ${DEFAULT_CONSTANTS_CONFORMANCE}.
  --assembly-dependency PATH      Separator certificate assembly dependency classifier. Defaults to ${DEFAULT_ASSEMBLY_DEPENDENCY}.
  --out-dir PATH                  Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                        Pretty-print JSON artifact.
  --help                          Show this help.`);
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

function assertStatus(source, name, expected) {
  if (source.status !== expected) {
    throw new Error(`Unexpected ${name} status: ${source.status}`);
  }
}

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if (source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function absBigInt(value) {
  return value < 0n ? -value : value;
}

function gcdBigInt(left, right) {
  let a = absBigInt(left);
  let b = absBigInt(right);
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a || 1n;
}

function normalizeRational(value) {
  if (value.d === 0n) {
    throw new Error("Invalid rational with zero denominator.");
  }
  const sign = value.d < 0n ? -1n : 1n;
  const numerator = value.n * sign;
  const denominator = value.d * sign;
  const divisor = gcdBigInt(numerator, denominator);
  return { n: numerator / divisor, d: denominator / divisor };
}

function parseRationalToken(value) {
  const token = String(value);
  if (/^-?\d+\/-?\d+$/.test(token)) {
    const [numerator, denominator] = token.split("/");
    return normalizeRational({ n: BigInt(numerator), d: BigInt(denominator) });
  }
  if (/^-?\d+$/.test(token)) {
    return { n: BigInt(token), d: 1n };
  }
  if (/^-?\d+\.\d+$/.test(token)) {
    const sign = token.startsWith("-") ? -1n : 1n;
    const unsigned = token.startsWith("-") ? token.slice(1) : token;
    const [integerPart, fractionalPart] = unsigned.split(".");
    const scale = 10n ** BigInt(fractionalPart.length);
    return normalizeRational({
      n: sign * (BigInt(integerPart) * scale + BigInt(fractionalPart)),
      d: scale,
    });
  }
  throw new Error(`Cannot parse rational token: ${token}`);
}

function rationalFromDegenerateInterval(value, label) {
  if (!isDegenerateInterval(value)) {
    throw new Error(`${label} is not a degenerate exact interval.`);
  }
  return parseRationalToken(value[0]);
}

function addRational(left, right) {
  return normalizeRational({ n: left.n * right.d + right.n * left.d, d: left.d * right.d });
}

function subtractRational(left, right) {
  return normalizeRational({ n: left.n * right.d - right.n * left.d, d: left.d * right.d });
}

function multiplyRational(left, right) {
  return normalizeRational({ n: left.n * right.n, d: left.d * right.d });
}

function compareRational(left, right) {
  const delta = left.n * right.d - right.n * left.d;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function equalRational(left, right) {
  return compareRational(left, right) === 0;
}

function lessThanOrEqualRational(left, right) {
  return compareRational(left, right) <= 0;
}

function greaterThanOrEqualRational(left, right) {
  return compareRational(left, right) >= 0;
}

function positiveRational(value) {
  return value.n > 0n;
}

function isDegenerateInterval(value) {
  return Array.isArray(value) && value.length === 2 && value[0] === value[1];
}

function allTrue(value) {
  return Object.values(value).every(Boolean);
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function rowSortKey(row) {
  return `${String(separatorSortKey(row.separator_event)).padStart(3, "0")}:${row.row_id}`;
}

function mapBy(array, getter, name) {
  const map = new Map();
  for (const entry of array ?? []) {
    const key = getter(entry);
    if (key == null) {
      continue;
    }
    if (map.has(key)) {
      throw new Error(`Duplicate ${name} key: ${key}`);
    }
    map.set(key, entry);
  }
  return map;
}

function requireMapEntry(map, key, name) {
  if (!map.has(key)) {
    throw new Error(`Missing ${name}: ${key}`);
  }
  return map.get(key);
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

function compareFields(candidate, source, fieldMap) {
  return Object.fromEntries(
    fieldMap.map(([candidateField, sourceField]) => [candidateField, sameValue(candidate[candidateField], source[sourceField])]),
  );
}

function groupBy(array, getter) {
  return array.reduce((groups, entry) => {
    const key = getter(entry);
    const rows = groups.get(key) ?? [];
    rows.push(entry);
    groups.set(key, rows);
    return groups;
  }, new Map());
}

function sumRationals(values) {
  return values.reduce((sum, value) => addRational(sum, value), { n: 0n, d: 1n });
}

function maxRational(values, label) {
  if (values.length === 0) {
    throw new Error(`Cannot compute max rational for empty ${label}.`);
  }
  return values.reduce((max, value) => (compareRational(value, max) > 0 ? value : max), values[0]);
}

function assertSourceHashLock(paths, materialization) {
  return SOURCE_HASH_KEYS.map(([sourceArtifactKey, pathKey]) => {
    const materializedRecord = materialization.source_artifacts?.[sourceArtifactKey];
    const currentHash = sha256File(paths[pathKey]);
    const hashMatches = materializedRecord?.sha256 === currentHash;
    if (!hashMatches) {
      throw new Error(`Source hash mismatch for ${sourceArtifactKey}.`);
    }
    return {
      source_artifact: sourceArtifactKey,
      materialization_basename: materializedRecord.basename,
      current_basename: path.basename(paths[pathKey]),
      materialization_sha256: materializedRecord.sha256,
      current_sha256: currentHash,
      hash_matches: true,
    };
  });
}

function validateInputs(inputs) {
  for (const [name, source] of Object.entries(inputs)) {
    assertPacketId(source, name);
    assertFailClosed(source, name);
  }
  assertStatus(inputs.materialization, "materialization", MATERIALIZATION_STATUS);
  assertStatus(inputs.separatorAggregate, "separatorAggregate", SEPARATOR_AGGREGATE_STATUS);
  assertStatus(inputs.obligationClassifier, "obligationClassifier", OBLIGATION_STATUS);
  assertStatus(inputs.impulseAcceptance, "impulseAcceptance", IMPULSE_ACCEPTANCE_STATUS);
  assertStatus(inputs.constantsConformance, "constantsConformance", CONSTANTS_CONFORMANCE_STATUS);
  assertStatus(inputs.assemblyDependency, "assemblyDependency", ASSEMBLY_DEPENDENCY_STATUS);
  if (inputs.materialization.summary?.candidate_higher_fold_constants_artifacts !== 1) {
    throw new Error("Materialization no longer has exactly one candidate/live constants artifact.");
  }
  if (inputs.materialization.summary?.candidate_separator_constants !== 12) {
    throw new Error("Materialization no longer has 12 separator constants entries.");
  }
  if (inputs.materialization.summary?.candidate_row_constant_associations !== 112) {
    throw new Error("Materialization no longer has 112 row associations.");
  }
  if (inputs.materialization.summary?.separators_with_accepted_interval_certified_constants_status !== 0) {
    throw new Error("Materialization unexpectedly has accepted interval-certified constants statuses.");
  }
  if (inputs.materialization.summary?.row_consumption_count !== 0) {
    throw new Error("Materialization unexpectedly consumes rows.");
  }
}

function buildSeparatorConsistency(inputs) {
  const aggregateBySeparator = mapBy(
    inputs.separatorAggregate.separator_aggregate_certificates,
    (entry) => entry.separator_event,
    "aggregate separator",
  );
  const aggregateRowsBySeparator = groupBy(
    inputs.separatorAggregate.row_aggregate_certificates,
    (entry) => entry.separator_event,
  );
  const obligationBySeparator = mapBy(
    inputs.obligationClassifier.separator_constants_artifact_obligation_profiles,
    (entry) => entry.separator_event,
    "obligation separator",
  );

  return [...inputs.materialization.candidate_separator_constants]
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event))
    .map((candidate) => {
      const aggregate = requireMapEntry(aggregateBySeparator, candidate.separator_event, "aggregate separator");
      const obligation = requireMapEntry(obligationBySeparator, candidate.separator_event, "obligation separator");
      const exact_field_matches = compareFields(candidate, aggregate, SEPARATOR_EXACT_FIELD_MAP);
      const display_field_matches = compareFields(candidate, aggregate, SEPARATOR_DISPLAY_FIELD_MAP);
      const structural_matches = {
        fold_interval: sameValue(candidate.fold_interval, aggregate.fold_interval),
        row_count: sameValue(candidate.row_count, aggregate.row_count),
        row_ids: sameValue(candidate.row_ids, aggregate.row_ids),
        selected_route_candidate: sameValue(candidate.selected_route_candidate, aggregate.selected_route_candidate),
        aggregate_certificate_rule: sameValue(candidate.aggregate_certificate_rule, aggregate.aggregate_certificate_rule),
        row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma: sameValue(
          candidate.row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma,
          aggregate.row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma,
        ),
      };
      const exact_interval_shapes = Object.fromEntries(
        SEPARATOR_EXACT_FIELD_MAP.map(([candidateField]) => [candidateField, isDegenerateInterval(candidate[candidateField])]),
      );
      const separatorRows = aggregateRowsBySeparator.get(candidate.separator_event) ?? [];
      const rowLrSum = sumRationals(separatorRows.map((row) => parseRationalToken(row.candidate_L_r_B)));
      const rowImpulseSum = sumRationals(
        separatorRows.map((row) =>
          rationalFromDegenerateInterval(row.I_fold_eta_epsilon_c_B_interval_exact, `${row.row_id} I_fold_eta_epsilon_c_B`),
        ),
      );
      const rowMaxAcceleration = maxRational(
        separatorRows.map((row) =>
          rationalFromDegenerateInterval(row.A_B_eta_epsilon_c_interval_exact, `${row.row_id} A_B_eta_epsilon_c`),
        ),
        `${candidate.separator_event} row acceleration enclosures`,
      );
      const eta = rationalFromDegenerateInterval(candidate.eta_exact, `${candidate.separator_event} eta`);
      const etaSqrtLower = rationalFromDegenerateInterval(
        candidate.eta_sqrt_lower_exact,
        `${candidate.separator_event} eta_sqrt_lower`,
      );
      const etaInvSqrtUpper = rationalFromDegenerateInterval(
        candidate.eta_inv_sqrt_upper_exact,
        `${candidate.separator_event} eta_inv_sqrt_upper`,
      );
      const cSigma = rationalFromDegenerateInterval(
        candidate.C_Sigma_interval_exact,
        `${candidate.separator_event} C_Sigma`,
      );
      const lRSum = rationalFromDegenerateInterval(
        candidate.L_r_sum_interval_exact,
        `${candidate.separator_event} L_r_sum`,
      );
      const aSigma = rationalFromDegenerateInterval(
        candidate.A_Sigma_eta_epsilon_c_interval_exact,
        `${candidate.separator_event} A_Sigma_eta_epsilon_c`,
      );
      const iFoldSigma = rationalFromDegenerateInterval(
        candidate.I_fold_eta_epsilon_c_Sigma_interval_exact,
        `${candidate.separator_event} I_fold_eta_epsilon_c_Sigma`,
      );
      const witness = rationalFromDegenerateInterval(
        candidate.normal_form_ceiling_lower_witness_interval_exact,
        `${candidate.separator_event} normal_form_ceiling_lower_witness`,
      );
      const margin = rationalFromDegenerateInterval(
        candidate.normal_form_ceiling_minus_row_impulse_sum_interval_exact,
        `${candidate.separator_event} normal_form_ceiling_minus_row_impulse_sum`,
      );
      const computedWitness = multiplyRational(multiplyRational(cSigma, etaSqrtLower), aSigma);
      const arithmetic_checks = {
        rows_by_separator_count_matches: separatorRows.length === candidate.row_count,
        eta_is_one_over_fifty: equalRational(eta, parseRationalToken("1/50")),
        eta_sqrt_lower_is_one_over_eight: equalRational(etaSqrtLower, parseRationalToken("1/8")),
        eta_inv_sqrt_upper_is_eight: equalRational(etaInvSqrtUpper, parseRationalToken("8")),
        eta_sqrt_lower_square_le_eta:
          candidate.eta_sqrt_lower_square_le_eta === true &&
          lessThanOrEqualRational(multiplyRational(etaSqrtLower, etaSqrtLower), eta),
        eta_inv_sqrt_upper_square_ge_eta_inverse:
          candidate.eta_inv_sqrt_upper_square_ge_eta_inverse === true &&
          greaterThanOrEqualRational(multiplyRational(multiplyRational(etaInvSqrtUpper, etaInvSqrtUpper), eta), {
            n: 1n,
            d: 1n,
          }),
        L_r_sum_equals_sum_row_L_r_B: equalRational(lRSum, rowLrSum),
        C_Sigma_equals_8_times_L_r_sum: equalRational(cSigma, multiplyRational(parseRationalToken("8"), lRSum)),
        A_Sigma_equals_max_row_A_B: equalRational(aSigma, rowMaxAcceleration),
        I_fold_Sigma_equals_sum_row_I_B: equalRational(iFoldSigma, rowImpulseSum),
        normal_form_ceiling_lower_witness_formula: equalRational(witness, computedWitness),
        normal_form_ceiling_minus_row_impulse_sum_formula: equalRational(margin, subtractRational(witness, iFoldSigma)),
        normal_form_ceiling_minus_row_impulse_sum_positive: positiveRational(margin),
        row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma:
          candidate.row_impulse_sum_le_C_Sigma_eta_sqrt_A_Sigma === true && lessThanOrEqualRational(iFoldSigma, witness),
      };
      const obligation_matches = {
        separator_aggregate_fields_present: obligation.separator_aggregate_fields_present === true,
        accepted_constants_artifact_present: obligation.accepted_constants_artifact_present === false,
        accepted_constants_artifact_status_present: obligation.accepted_constants_artifact_status_present === false,
        source_packet_acceptance_rule_present: obligation.source_packet_acceptance_rule_present === false,
      };
      const consistency_pass =
        candidate.candidate_higher_fold_constants_artifact_present === true &&
        candidate.candidate_interval_fields_complete === true &&
        candidate.candidate_interval_field_shape_verified === true &&
        candidate.accepted_higher_fold_constants_artifact_present === false &&
        candidate.accepted_interval_certified_constants_status_present === false &&
        allTrue(exact_field_matches) &&
        allTrue(display_field_matches) &&
        allTrue(structural_matches) &&
        allTrue(exact_interval_shapes) &&
        allTrue(arithmetic_checks) &&
        allTrue(obligation_matches);
      return {
        separator_event: candidate.separator_event,
        fold_interval: candidate.fold_interval,
        row_count: candidate.row_count,
        candidate_artifact_ref: candidate.candidate_artifact_ref,
        exact_field_matches,
        display_field_matches,
        structural_matches,
        exact_interval_shapes,
        arithmetic_checks,
        obligation_matches,
        exact_arithmetic_consistency_pass: allTrue(arithmetic_checks),
        candidate_exact_consistency_pass: consistency_pass,
        candidate_interval_fields_complete: candidate.candidate_interval_fields_complete,
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
        first_constants_status_blocker: ACCEPTED_STATUS_BLOCKER,
        first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        classification: consistency_pass
          ? "candidate_exact_interval_consistent_status_absent"
          : "candidate_exact_interval_consistency_failed",
      };
    });
}

function buildRowConsistency(inputs) {
  const aggregateByRow = mapBy(inputs.separatorAggregate.row_aggregate_certificates, (entry) => entry.row_id, "aggregate row");
  const obligationByRow = mapBy(
    inputs.obligationClassifier.row_constants_artifact_obligation_profiles,
    (entry) => entry.row_id,
    "obligation row",
  );

  return [...inputs.materialization.candidate_row_constant_associations]
    .sort((left, right) => rowSortKey(left).localeCompare(rowSortKey(right)))
    .map((candidate) => {
      const aggregate = requireMapEntry(aggregateByRow, candidate.row_id, "aggregate row");
      const obligation = requireMapEntry(obligationByRow, candidate.row_id, "obligation row");
      const exact_field_matches = compareFields(candidate, aggregate, ROW_EXACT_FIELD_MAP);
      const source_field_matches = compareFields(candidate, aggregate, ROW_SOURCE_FIELD_MAP);
      const structural_matches = {
        ledger: sameValue(candidate.ledger, aggregate.ledger),
        status: sameValue(candidate.status, aggregate.status),
        failure_code: sameValue(candidate.failure_code, aggregate.failure_code),
        separator_event: sameValue(candidate.separator_event, aggregate.separator_event),
        fold_interval: sameValue(candidate.fold_interval, aggregate.fold_interval),
        receiver_interval: sameValue(candidate.receiver_interval, aggregate.receiver_interval),
        source_interval: sameValue(candidate.source_interval, aggregate.source_interval),
      };
      const exact_interval_shapes = Object.fromEntries(
        ROW_EXACT_FIELD_MAP.map(([candidateField]) => [candidateField, isDegenerateInterval(candidate[candidateField])]),
      );
      const rowBoundConstant = rationalFromDegenerateInterval(
        candidate.row_bound_constant_exact,
        `${candidate.row_id} row_bound_constant`,
      );
      const lRB = parseRationalToken(candidate.candidate_L_r_B);
      const lSB = parseRationalToken(candidate.candidate_L_s_B);
      const aB = rationalFromDegenerateInterval(
        candidate.A_B_eta_epsilon_c_interval_exact,
        `${candidate.row_id} A_B_eta_epsilon_c`,
      );
      const iB = rationalFromDegenerateInterval(
        candidate.I_fold_eta_epsilon_c_B_interval_exact,
        `${candidate.row_id} I_fold_eta_epsilon_c_B`,
      );
      const arithmetic_checks = {
        row_bound_constant_is_18750: equalRational(rowBoundConstant, parseRationalToken("18750")),
        A_B_equals_row_bound_constant_times_L_s_B: equalRational(aB, multiplyRational(rowBoundConstant, lSB)),
        I_B_equals_L_r_B_times_A_B: equalRational(iB, multiplyRational(lRB, aB)),
      };
      const obligation_matches = {
        separator_aggregate_fields_present: obligation.separator_aggregate_fields_present === true,
        row_impulse_enclosure_present: obligation.row_impulse_enclosure_present === true,
        accepted_constants_conformance: obligation.accepted_constants_conformance === false,
        source_packet_acceptance_rule_present: obligation.source_packet_acceptance_rule_present === false,
        row_consumed: obligation.row_consumed === false,
      };
      const consistency_pass =
        candidate.candidate_higher_fold_constants_artifact_ref_present === true &&
        candidate.candidate_interval_fields_complete === true &&
        candidate.candidate_row_exact_fields_materialized === true &&
        candidate.exact_fields_authoritative === true &&
        candidate.decimal_fields_display_only === true &&
        candidate.accepted_interval_certified_constants_status_present === false &&
        candidate.row_consumed === false &&
        allTrue(exact_field_matches) &&
        allTrue(source_field_matches) &&
        allTrue(structural_matches) &&
        allTrue(exact_interval_shapes) &&
        allTrue(arithmetic_checks) &&
        allTrue(obligation_matches);
      return {
        row_id: candidate.row_id,
        ledger: candidate.ledger,
        separator_event: candidate.separator_event,
        fold_interval: candidate.fold_interval,
        receiver_interval: candidate.receiver_interval,
        source_interval: candidate.source_interval,
        candidate_higher_fold_constants_artifact_ref: candidate.candidate_higher_fold_constants_artifact_ref,
        exact_field_matches,
        source_field_matches,
        structural_matches,
        exact_interval_shapes,
        arithmetic_checks,
        obligation_matches,
        exact_arithmetic_consistency_pass: allTrue(arithmetic_checks),
        candidate_exact_consistency_pass: consistency_pass,
        accepted_higher_fold_constants_artifact_present: false,
        accepted_interval_certified_constants_status_present: false,
        accepted_constants_conformance: false,
        source_packet_acceptance_rule_present: false,
        row_consumed: false,
        preledger_pass: false,
        updates_live_ledger: false,
        branch_chart_authorized: false,
        first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
        first_constants_status_blocker: ACCEPTED_STATUS_BLOCKER,
        first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
        classification: consistency_pass
          ? "candidate_row_exact_fields_consistent_status_absent"
          : "candidate_row_exact_field_consistency_failed",
      };
    });
}

function buildClassifier(paths, inputs) {
  validateInputs(inputs);
  const sourceHashChecks = assertSourceHashLock(paths, inputs.materialization);
  const separatorConsistency = buildSeparatorConsistency(inputs);
  const rowConsistency = buildRowConsistency(inputs);
  const rowsBySeparatorCount = sortedObjectBySeparator(countBy(rowConsistency, (row) => row.separator_event));
  const rowConsistencyBySeparator = sortedObjectBySeparator(
    countBy(
      rowConsistency.filter((row) => row.candidate_exact_consistency_pass),
      (row) => row.separator_event,
    ),
  );
  const rowArithmeticBySeparator = sortedObjectBySeparator(
    countBy(
      rowConsistency.filter((row) => row.exact_arithmetic_consistency_pass),
      (row) => row.separator_event,
    ),
  );
  const summary = {
    source_hash_checks: sourceHashChecks.length,
    source_hash_checks_passed: countTrue(sourceHashChecks, (entry) => entry.hash_matches),
    candidate_higher_fold_constants_artifacts: inputs.materialization.summary.candidate_higher_fold_constants_artifacts,
    candidate_separator_constants: separatorConsistency.length,
    candidate_row_constant_associations: rowConsistency.length,
    rows_by_separator_count: rowsBySeparatorCount,
    candidate_exact_consistent_separator_constants: countTrue(
      separatorConsistency,
      (entry) => entry.candidate_exact_consistency_pass,
    ),
    candidate_exact_arithmetic_consistent_separator_constants: countTrue(
      separatorConsistency,
      (entry) => entry.exact_arithmetic_consistency_pass,
    ),
    candidate_exact_consistent_rows: countTrue(rowConsistency, (entry) => entry.candidate_exact_consistency_pass),
    candidate_exact_arithmetic_consistent_rows: countTrue(
      rowConsistency,
      (entry) => entry.exact_arithmetic_consistency_pass,
    ),
    candidate_exact_consistent_rows_by_separator: rowConsistencyBySeparator,
    candidate_exact_arithmetic_consistent_rows_by_separator: rowArithmeticBySeparator,
    separators_with_accepted_higher_fold_constants_artifact: 0,
    separators_with_accepted_interval_certified_constants_status: 0,
    rows_with_accepted_interval_certified_constants_status: 0,
    separators_with_source_packet_acceptance_rule: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    rows_with_accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: 0,
    rows_with_accepted_higher_fold_layer_atlas_ref: 0,
    rows_with_parent_complement_consumption_ref: 0,
    rows_with_higher_fold_separator_layer_certificate: 0,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
    first_constants_artifact_blocker: ACCEPTED_ARTIFACT_BLOCKER,
    first_constants_status_blocker: ACCEPTED_STATUS_BLOCKER,
    first_source_packet_blocker: SOURCE_PACKET_ACCEPTANCE_RULE_BLOCKER,
    first_accepted_atlas_ref_blocker: ATLAS_REF_BLOCKER,
    parent_complement_consumption_ref_blocker: PARENT_CONSUMPTION_BLOCKER,
    first_separator_certificate_blocker: SEPARATOR_CERTIFICATE_BLOCKER,
  };
  const invariant =
    summary.source_hash_checks_passed === 5 &&
    summary.candidate_higher_fold_constants_artifacts === 1 &&
    summary.candidate_separator_constants === 12 &&
    summary.candidate_row_constant_associations === 112 &&
    summary.candidate_exact_consistent_separator_constants === 12 &&
    summary.candidate_exact_arithmetic_consistent_separator_constants === 12 &&
    summary.candidate_exact_consistent_rows === 112 &&
    summary.candidate_exact_arithmetic_consistent_rows === 112 &&
    summary.separators_with_accepted_interval_certified_constants_status === 0 &&
    summary.separators_with_source_packet_acceptance_rule === 0 &&
    summary.accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets === 0 &&
    summary.rows_with_parent_complement_consumption_ref === 0 &&
    summary.rows_with_higher_fold_separator_layer_certificate === 0 &&
    summary.row_consumption_count === 0;
  if (!invariant) {
    throw new Error("Candidate-live constants artifact consistency invariant failed.");
  }
  return {
    schema: "breather-higher-fold-layer-same-packet-candidate-live-higher-fold-constants-artifact-consistency-classifier-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only candidate/live higher-fold constants artifact consistency classifier; verifies source-hash locks plus exact separator/row field and arithmetic consistency while accepted interval-certified status, source-packet acceptance, row consumption, preledger pass, live-ledger update, and branch-chart authorization remain absent",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: false,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      candidate_live_higher_fold_constants_artifact_materialization_attempt: artifactRecord(paths.materialization),
      same_packet_separator_aggregate_certificate_attempt: artifactRecord(paths.separatorAggregate),
      higher_fold_constants_artifact_field_obligation_classifier: artifactRecord(paths.obligationClassifier),
      same_packet_impulse_bound_source_packet_acceptance_dependency_classifier: artifactRecord(paths.impulseAcceptance),
      same_packet_fixed_parameter_aggregate_accepted_constants_conformance_classifier: artifactRecord(
        paths.constantsConformance,
      ),
      higher_fold_layer_separator_certificate_assembly_dependency_classifier: artifactRecord(
        paths.assemblyDependency,
      ),
    },
    source_hash_consistency_checks: sourceHashChecks,
    separator_consistency_classification: separatorConsistency,
    row_consistency_classification: rowConsistency,
    summary,
    next_certificate_handoff: {
      artifact_target:
        "accepted interval-certified constants status for the already-consistent candidate/live same-packet higher-fold constants artifact, or an explicit source-packet acceptance rule",
      continuation_class:
        "mechanical only after a proof-grade accepted interval-certified constants status is supplied; source-packet acceptance remains decision-blocked without that status or an explicit rule",
      decision_boundary:
        "this classifier verifies exact consistency of the candidate/live constants artifact against same-packet sources, but does not accept it as an interval-certified constants artifact",
      fail_closed_stop_conditions: [
        "Do not promote candidate exact consistency into accepted interval-certified constants status.",
        "Do not treat candidate/live constants as accepted same_packet_fold_impulse_or_direct_quadrature_bound source packets.",
        "Do not construct accepted atlas refs, parent_complement_consumption_ref, or higher_fold_separator_layer_certificate from this consistency classifier.",
        "Do not consume rows, set preledger_pass, update the live ledger, or authorize a branch chart.",
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
      "Priority-only. This classifier proves the candidate/live constants artifact is source-hash locked and exact-field consistent with the same-packet separator aggregate and obligation sources, but accepted interval-certified status and all consuming fields remain absent.",
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

function hashTable(checks) {
  return checks
    .map(
      (check) =>
        `| \`${check.source_artifact}\` | \`${check.materialization_basename}\` | \`${check.current_basename}\` | ${check.hash_matches} |`,
    )
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function separatorTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.separator_event}\` | \`${row.fold_interval}\` | ${row.row_count} | ${row.candidate_exact_consistency_pass} | ${row.exact_arithmetic_consistency_pass} | ${row.accepted_interval_certified_constants_status_present} | \`${row.classification}\` |`,
    )
    .join("\n");
}

function rowSummaryTable(classifier) {
  return Object.entries(classifier.summary.rows_by_separator_count)
    .map(([separator, count]) => {
      const passCount = classifier.summary.candidate_exact_consistent_rows_by_separator[separator] ?? 0;
      const arithmeticCount = classifier.summary.candidate_exact_arithmetic_consistent_rows_by_separator[separator] ?? 0;
      return `| \`${separator}\` | ${count} | ${passCount} | ${arithmeticCount} |`;
    })
    .join("\n");
}

function reportMarkdown(classifier) {
  return `# Higher-Fold Layer Same-Packet Candidate-Live Higher-Fold Constants Artifact Consistency Classifier

Packet: \`${classifier.packet_id}\`

Status: \`${classifier.status}\`

Claim level: ${classifier.claim_level}

## Blocker Sharpened

This classifier verifies that the candidate/live higher-fold constants artifact
is source-hash locked to the materialization attempt and that its separator and
row exact interval fields match the same-packet separator aggregate sources.

Verified candidate side:

- ${classifier.summary.source_hash_checks_passed}
  / ${classifier.summary.source_hash_checks} materialization source-hash locks;
- ${classifier.summary.candidate_exact_consistent_separator_constants}
  / ${classifier.summary.candidate_separator_constants} separator constants
  exact-field consistency classifications;
- ${classifier.summary.candidate_exact_arithmetic_consistent_separator_constants}
  / ${classifier.summary.candidate_separator_constants} separator constants
  exact-arithmetic consistency classifications;
- ${classifier.summary.candidate_exact_consistent_rows}
  / ${classifier.summary.candidate_row_constant_associations} row exact-field
  consistency classifications;
- ${classifier.summary.candidate_exact_arithmetic_consistent_rows}
  / ${classifier.summary.candidate_row_constant_associations} row
  exact-arithmetic consistency classifications.

Still absent:

- ${classifier.summary.separators_with_accepted_higher_fold_constants_artifact}
  / ${classifier.summary.candidate_separator_constants} accepted higher-fold
  constants artifacts;
- ${classifier.summary.separators_with_accepted_interval_certified_constants_status}
  / ${classifier.summary.candidate_separator_constants} accepted
  interval-certified constants statuses;
- ${classifier.summary.separators_with_source_packet_acceptance_rule}
  / ${classifier.summary.candidate_separator_constants} source-packet acceptance
  rules;
- ${classifier.summary.rows_with_parent_complement_consumption_ref}
  / ${classifier.summary.candidate_row_constant_associations}
  parent complement consumption refs;
- ${classifier.summary.rows_with_higher_fold_separator_layer_certificate}
  / ${classifier.summary.candidate_row_constant_associations}
  separator certificates.

The first remaining constants-status blocker is
\`${classifier.summary.first_constants_status_blocker}\`.

It consumes 0 rows and authorizes no branch chart.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(classifier.source_artifacts)}

## Materialization Source-Hash Locks

| Source artifact | Materialization file | Current file | Hash matches |
| --- | --- | --- | --- |
${hashTable(classifier.source_hash_consistency_checks)}

## Separator Consistency

| Separator | Fold interval | Rows | Exact consistency | Exact arithmetic | Accepted status | Classification |
| --- | --- | ---: | --- | --- | --- | --- |
${separatorTable(classifier.separator_consistency_classification)}

## Row Consistency By Separator

| Separator | Rows | Exact-consistent rows | Exact-arithmetic rows |
| --- | ---: | ---: | ---: |
${rowSummaryTable(classifier)}

## Certificate-Side Handoff

Next artifact target: \`${classifier.next_certificate_handoff.artifact_target}\`.

Continuation class: ${classifier.next_certificate_handoff.continuation_class}.

Decision boundary: ${classifier.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${classifier.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    materialization: args.materialization,
    separatorAggregate: args.separatorAggregate,
    obligationClassifier: args.obligationClassifier,
    impulseAcceptance: args.impulseAcceptance,
    constantsConformance: args.constantsConformance,
    assemblyDependency: args.assemblyDependency,
  };
  const inputs = {
    materialization: readJson(paths.materialization),
    separatorAggregate: readJson(paths.separatorAggregate),
    obligationClassifier: readJson(paths.obligationClassifier),
    impulseAcceptance: readJson(paths.impulseAcceptance),
    constantsConformance: readJson(paths.constantsConformance),
    assemblyDependency: readJson(paths.assemblyDependency),
  };
  const classifier = buildClassifier(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, classifier, args.pretty);
  writeText(outReport, reportMarkdown(classifier));
  console.log(JSON.stringify({ status: classifier.status, outJson, outReport }, null, 2));
}

main();
