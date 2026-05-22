#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const CERTIFICATE_SCHEMA = "a0-root-transport-refinement-certificate/v1";
const DEFAULT_TOLERANCE = 1e-9;
const QUOTIENTS = new Set([
  "source_layer_shear",
  "source_layer_signed_polarity_shear",
  "m_jacobian_signed_polarity_shear",
]);

function parseArgs(argv) {
  const args = {
    baseline: null,
    variant: null,
    baselineRow: "first",
    variantRow: "first",
    quotient: "source_layer_shear",
    phaseShiftBuckets: "auto",
    tolerance: DEFAULT_TOLERANCE,
    variantKind: "phase_origin_or_refinement_variant",
    out: null,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--baseline") {
      args.baseline = argv[++i];
    } else if (arg === "--variant") {
      args.variant = argv[++i];
    } else if (arg === "--baseline-row") {
      args.baselineRow = argv[++i];
    } else if (arg === "--variant-row") {
      args.variantRow = argv[++i];
    } else if (arg === "--quotient") {
      args.quotient = parseQuotient(argv[++i]);
    } else if (arg === "--phase-shift-buckets") {
      args.phaseShiftBuckets = parsePhaseShift(argv[++i]);
    } else if (arg === "--tolerance") {
      args.tolerance = parseNonnegativeNumber(argv[++i], "--tolerance");
    } else if (arg === "--variant-kind") {
      args.variantKind = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-root-transport-refinement-certificate.mjs --baseline PATH --variant PATH [options]

Options:
  --baseline PATH          Baseline a0-tier1-fold-layer-locked-one-period-attempt artifact.
  --variant PATH           Variant artifact with an independently emitted root_transport_source_record.
  --baseline-row VALUE     Row number or "first". Defaults to first row with a root-transport record.
  --variant-row VALUE      Row number or "first". Defaults to first row with a root-transport record.
  --quotient VALUE         source_layer_shear, source_layer_signed_polarity_shear, or m_jacobian_signed_polarity_shear.
  --phase-shift-buckets N  Declared cyclic phase shift, or "auto". Defaults to auto.
                            Auto-detected shifts are diagnostic-only and cannot pass the certificate.
  --variant-kind VALUE     Label for the variant family. Defaults to phase_origin_or_refinement_variant.
  --tolerance N            Maximum feature relative delta. Defaults to ${DEFAULT_TOLERANCE}.
  --out PATH               Write JSON output to a file instead of stdout.
  --pretty                 Pretty-print JSON.
  --help                   Show this help.

This fail-closed certificate compares two root_transport_source_record packets.
It never uses transport_id as a matching identity. It matches by root_key and
cyclic order, then checks quotient-feature covariance after cyclic reindexing.`);
}

function parseQuotient(value) {
  if (QUOTIENTS.has(value)) {
    return value;
  }
  throw new Error(`Unsupported --quotient value: ${value}`);
}

function parsePhaseShift(value) {
  if (value === "auto") {
    return value;
  }
  const number = Number(value);
  if (!Number.isInteger(number)) {
    throw new Error(`Expected --phase-shift-buckets to be an integer or auto, got: ${value}`);
  }
  return number;
}

function parseNonnegativeNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`Expected ${name} to be a nonnegative number, got: ${value}`);
  }
  return number;
}

function requirePath(value, name) {
  if (!value) {
    throw new Error(`Missing required ${name} PATH argument.`);
  }
  return value;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(args, artifact) {
  const text = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${text}\n`);
  } else {
    console.log(text);
  }
}

function rowsOf(artifact) {
  return Array.isArray(artifact?.rows) ? artifact.rows : [];
}

function rootTransportRecord(row) {
  return row?.branch_chart_source_records?.root_transport_source_record ?? null;
}

function selectRow(artifact, selector) {
  const rows = rowsOf(artifact);
  if (selector === "first") {
    return rows.find((row) => rootTransportRecord(row)?.schema === SOURCE_SCHEMA) ?? rows[0] ?? null;
  }
  const rowNumber = Number(selector);
  if (!Number.isInteger(rowNumber)) {
    throw new Error(`Expected row selector to be "first" or an integer, got: ${selector}`);
  }
  return rows.find((row) => row.row === rowNumber) ?? null;
}

function finiteNumber(value) {
  return Number.isFinite(value);
}

function validateRecord(record, label) {
  const missing = [];
  if (record?.schema !== SOURCE_SCHEMA) {
    missing.push(`${label}.schema=${SOURCE_SCHEMA}`);
  }
  if (!Array.isArray(record?.roots) || record.roots.length < 2) {
    missing.push(`${label}.roots[2+]`);
    return missing;
  }
  if (!finiteNumber(record?.period) || record.period <= 0) {
    missing.push(`${label}.period`);
  }
  if (typeof record?.transport_identity_scope !== "string" || record.transport_identity_scope.length === 0) {
    missing.push(`${label}.transport_identity_scope`);
  }
  if (record?.transport_identity_refinement_stable === true) {
    missing.push(`${label}.transport_identity_refinement_stable=false before certificate`);
  }
  if (record?.phase_origin_covariance_certified === true) {
    missing.push(`${label}.phase_origin_covariance_certified=false before certificate`);
  }
  for (const [index, root] of record.roots.entries()) {
    const rootLabel = `${label}.roots[${index}]`;
    if (typeof root?.root_key !== "string" || root.root_key.length === 0) {
      missing.push(`${rootLabel}.root_key`);
    }
    for (const field of ["receiver", "source", "relation", "status"]) {
      if (typeof root?.[field] !== "string" || root[field].length === 0) {
        missing.push(`${rootLabel}.${field}`);
      }
    }
    for (const field of ["t", "theta", "D_tau", "D_J", "G_r"]) {
      if (!finiteNumber(root?.[field])) {
        missing.push(`${rootLabel}.${field}`);
      }
    }
    if (typeof root?.transport_id !== "string" || root.transport_id.length === 0) {
      missing.push(`${rootLabel}.transport_id`);
    }
    if (String(root?.transport_id ?? "").includes("|phase_bucket:")) {
      missing.push(`${rootLabel}.transport_id_not_raw_root_key_phase_bucket`);
    }
  }
  return missing;
}

function declaredQuotients(record) {
  return Array.isArray(record?.declared_root_transport_quotients) ? record.declared_root_transport_quotients : [];
}

function metadataMismatches(baselineRecord, variantRecord, quotient) {
  const mismatches = [];
  for (const field of ["period", "coordinate_family", "source", "gap_source"]) {
    if (baselineRecord?.[field] !== variantRecord?.[field]) {
      mismatches.push({
        field,
        baseline_value: baselineRecord?.[field] ?? null,
        variant_value: variantRecord?.[field] ?? null,
        failure_code: `root-transport-${field.replaceAll("_", "-")}-mismatch`,
      });
    }
  }
  for (const [label, record] of [
    ["baseline", baselineRecord],
    ["variant", variantRecord],
  ]) {
    if (record?.locked_fold_layer_keys_excluded !== true) {
      mismatches.push({
        field: `${label}.locked_fold_layer_keys_excluded`,
        value: record?.locked_fold_layer_keys_excluded ?? null,
        failure_code: "root-transport-locked-keys-not-excluded",
      });
    }
    if (record?.benchmark_inputs_excluded !== true) {
      mismatches.push({
        field: `${label}.benchmark_inputs_excluded`,
        value: record?.benchmark_inputs_excluded ?? null,
        failure_code: "root-transport-benchmark-inputs-not-excluded",
      });
    }
    if (!declaredQuotients(record).includes(quotient)) {
      mismatches.push({
        field: `${label}.declared_root_transport_quotients`,
        value: declaredQuotients(record),
        required_quotient: quotient,
        failure_code: "root-transport-quotient-not-source-declared",
      });
    }
  }
  return mismatches;
}

function modulo(value, modulus) {
  if (!Number.isFinite(modulus) || modulus <= 0) {
    return value;
  }
  return ((value % modulus) + modulus) % modulus;
}

function rootIdentity(root) {
  return `${root.receiver}|${root.source}|${root.relation}|${root.status}`;
}

function byRootKey(roots, period) {
  const groups = new Map();
  for (const root of roots) {
    const key = root.root_key ?? rootIdentity(root);
    const group = groups.get(key) ?? [];
    group.push(root);
    groups.set(key, group);
  }
  for (const group of groups.values()) {
    group.sort((left, right) => modulo(left.t, period) - modulo(right.t, period));
  }
  return groups;
}

function groupLengthSet(groups) {
  return new Set([...groups.values()].map((group) => group.length));
}

function featureBucketCount(groups) {
  const lengths = groupLengthSet(groups);
  return lengths.size === 1 ? [...lengths][0] : null;
}

function bodyLayer(bodyId) {
  return typeof bodyId === "string" ? bodyId.slice(0, 1) : null;
}

function bodyPolarity(bodyId) {
  return typeof bodyId === "string" ? bodyId.slice(1, 2) : null;
}

function polaritySign(receiver, source) {
  return bodyPolarity(receiver) === bodyPolarity(source) ? 1 : -1;
}

function featureNames(quotient) {
  if (quotient === "source_layer_signed_polarity_shear") {
    return ["M:signed:D_J", "M:signed:D_tau", "O:signed:D_J", "O:signed:D_tau"];
  }
  if (quotient === "m_jacobian_signed_polarity_shear") {
    return ["M:D_J", "M:signed:D_J", "M:D_tau", "O:D_J", "O:D_tau"];
  }
  return ["M:D_J", "M:D_tau", "O:D_J", "O:D_tau"];
}

function rootFeatureVector(root, quotient) {
  const names = featureNames(quotient);
  const features = new Array(names.length).fill(0);
  const add = (name, value) => {
    const index = names.indexOf(name);
    if (index >= 0 && Number.isFinite(value)) {
      features[index] += value;
    }
  };
  if (bodyLayer(root.receiver) !== "I" || root.relation !== "inter_layer" || root.locked_fold_layer_key === true) {
    return features;
  }
  const sourceLayer = bodyLayer(root.source);
  if (sourceLayer !== "M" && sourceLayer !== "O") {
    return features;
  }
  const jShear = root.G_r * root.D_J * Math.cos(root.theta);
  const tauShear = root.G_r * root.D_tau * Math.sin(root.theta);
  if (quotient === "source_layer_signed_polarity_shear") {
    const sign = polaritySign(root.receiver, root.source);
    add(`${sourceLayer}:signed:D_J`, sign * jShear);
    add(`${sourceLayer}:signed:D_tau`, sign * tauShear);
  } else if (quotient === "m_jacobian_signed_polarity_shear") {
    add(`${sourceLayer}:D_J`, jShear);
    add(`${sourceLayer}:D_tau`, tauShear);
    if (sourceLayer === "M") {
      add("M:signed:D_J", polaritySign(root.receiver, root.source) * jShear);
    }
  } else {
    add(`${sourceLayer}:D_J`, jShear);
    add(`${sourceLayer}:D_tau`, tauShear);
  }
  return features;
}

function vectorNorm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function vectorDelta(left, right) {
  let squared = 0;
  for (let index = 0; index < left.length; index += 1) {
    const delta = left[index] - right[index];
    squared += delta * delta;
  }
  return Math.sqrt(squared);
}

function addVector(target, source) {
  for (let index = 0; index < target.length; index += 1) {
    target[index] += source[index];
  }
}

function fieldDrift(baselineRoot, variantRoot, tolerance) {
  for (const field of ["theta", "D_tau", "D_J", "G_r"]) {
    if (Math.abs(baselineRoot[field] - variantRoot[field]) > tolerance) {
      return {
        field,
        baseline_value: baselineRoot[field],
        variant_value: variantRoot[field],
        abs_delta: Math.abs(baselineRoot[field] - variantRoot[field]),
      };
    }
  }
  if ((baselineRoot.locked_fold_layer_key === true) !== (variantRoot.locked_fold_layer_key === true)) {
    return {
      field: "locked_fold_layer_key",
      baseline_value: baselineRoot.locked_fold_layer_key === true,
      variant_value: variantRoot.locked_fold_layer_key === true,
      abs_delta: null,
    };
  }
  return null;
}

function groupKeys(leftGroups, rightGroups) {
  return [...new Set([...leftGroups.keys(), ...rightGroups.keys()])].sort();
}

function candidateShifts(args, groups) {
  if (args.phaseShiftBuckets !== "auto") {
    return [args.phaseShiftBuckets];
  }
  const maxGroupLength = Math.max(...[...groups.values()].map((group) => group.length), 1);
  return Array.from({ length: maxGroupLength }, (_entry, index) => index);
}

function compareForShift(baselineRecord, variantRecord, quotient, shift) {
  const baselineGroups = byRootKey(baselineRecord.roots, baselineRecord.period);
  const variantGroups = byRootKey(variantRecord.roots, variantRecord.period);
  const mismatches = [];
  const rootFieldDrifts = [];
  let matchedRootCount = 0;
  let featureSampleCount = 0;
  let maxFeatureAbsDelta = 0;
  let maxFeatureRelativeDelta = 0;
  const bucketCount = featureBucketCount(baselineGroups);
  const variantBucketCount = featureBucketCount(variantGroups);
  const names = featureNames(quotient);
  const baselineBuckets =
    bucketCount === null ? [] : Array.from({ length: bucketCount }, () => new Array(names.length).fill(0));
  const variantBuckets =
    bucketCount === null ? [] : Array.from({ length: bucketCount }, () => new Array(names.length).fill(0));

  const bucketCountMismatch = bucketCount === null || variantBucketCount === null || bucketCount !== variantBucketCount;

  for (const key of groupKeys(baselineGroups, variantGroups)) {
    const baselineGroup = baselineGroups.get(key) ?? [];
    const variantGroup = variantGroups.get(key) ?? [];
    if (baselineGroup.length !== variantGroup.length || baselineGroup.length === 0) {
      mismatches.push({
        root_key: key,
        baseline_count: baselineGroup.length,
        variant_count: variantGroup.length,
        failure_code: "root-key-count-mismatch",
      });
      continue;
    }
    const localShift = modulo(shift, baselineGroup.length);
    for (let index = 0; index < baselineGroup.length; index += 1) {
      const baselineRoot = baselineGroup[index];
      const variantIndex = (index + localShift) % variantGroup.length;
      const variantRoot = variantGroup[variantIndex];
      matchedRootCount += 1;
      if (baselineRoot.root_key !== rootIdentity(baselineRoot) || variantRoot.root_key !== rootIdentity(variantRoot)) {
        mismatches.push({
          root_key: key,
          index,
          failure_code: "root-transport-root-key-components-mismatch",
          baseline_root_key: baselineRoot.root_key,
          baseline_identity: rootIdentity(baselineRoot),
          variant_root_key: variantRoot.root_key,
          variant_identity: rootIdentity(variantRoot),
        });
        continue;
      }
      if (rootIdentity(baselineRoot) !== rootIdentity(variantRoot)) {
        mismatches.push({
          root_key: key,
          index,
          failure_code: "root-identity-field-mismatch",
          baseline_identity: rootIdentity(baselineRoot),
          variant_identity: rootIdentity(variantRoot),
        });
        continue;
      }
      const drift = fieldDrift(baselineRoot, variantRoot, 1e-9);
      if (drift) {
        rootFieldDrifts.push({
          root_key: key,
          baseline_index: index,
          variant_index: variantIndex,
          failure_code: "root-transport-root-field-drift",
          ...drift,
        });
      }
      if (bucketCount !== null && bucketCount === variantBucketCount) {
        addVector(baselineBuckets[index], rootFeatureVector(baselineRoot, quotient));
        addVector(variantBuckets[index], rootFeatureVector(variantRoot, quotient));
      }
    }
  }

  if (mismatches.length === 0 && bucketCountMismatch) {
    mismatches.push({
      baseline_bucket_count: bucketCount,
      variant_bucket_count: variantBucketCount,
      failure_code: "root-transport-feature-bucket-count-mismatch",
    });
  }

  if (mismatches.length === 0 && bucketCount !== null) {
    for (let index = 0; index < bucketCount; index += 1) {
      const baselineFeatures = baselineBuckets[index];
      const variantFeatures = variantBuckets[index];
      const baselineNonzero = baselineFeatures.some((value) => value !== 0);
      const variantNonzero = variantFeatures.some((value) => value !== 0);
      if (baselineNonzero || variantNonzero) {
        featureSampleCount += 1;
      }
      const absDelta = vectorDelta(baselineFeatures, variantFeatures);
      const relativeDelta = absDelta / Math.max(vectorNorm(baselineFeatures), vectorNorm(variantFeatures), Number.EPSILON);
      maxFeatureAbsDelta = Math.max(maxFeatureAbsDelta, absDelta);
      maxFeatureRelativeDelta = Math.max(maxFeatureRelativeDelta, relativeDelta);
    }
  }

  return {
    phase_shift_buckets: shift,
    matched_root_count: matchedRootCount,
    feature_bucket_count: bucketCount,
    feature_sample_count: featureSampleCount,
    mismatch_count: mismatches.length,
    mismatches: mismatches.slice(0, 20),
    root_field_drift_count: rootFieldDrifts.length,
    first_root_field_drift: rootFieldDrifts[0] ?? null,
    max_feature_abs_delta: maxFeatureAbsDelta,
    max_feature_relative_delta: maxFeatureRelativeDelta,
  };
}

function bestComparison(args, baselineRecord, variantRecord) {
  const groups = byRootKey(baselineRecord.roots, baselineRecord.period);
  const comparisons = candidateShifts(args, groups).map((shift) =>
    compareForShift(baselineRecord, variantRecord, args.quotient, shift)
  );
  comparisons.sort((left, right) => {
    if (left.mismatch_count !== right.mismatch_count) {
      return left.mismatch_count - right.mismatch_count;
    }
    return left.max_feature_relative_delta - right.max_feature_relative_delta;
  });
  return comparisons[0] ?? null;
}

function buildCertificate(args, baselineArtifact, variantArtifact) {
  const baselineRow = selectRow(baselineArtifact, args.baselineRow);
  const variantRow = selectRow(variantArtifact, args.variantRow);
  const baselineRecord = rootTransportRecord(baselineRow);
  const variantRecord = rootTransportRecord(variantRow);
  const missingFields = [
    ...validateRecord(baselineRecord, "baseline.root_transport_source_record"),
    ...validateRecord(variantRecord, "variant.root_transport_source_record"),
  ];
  const sourceMetadataMismatches =
    baselineRecord && variantRecord ? metadataMismatches(baselineRecord, variantRecord, args.quotient) : [];
  let comparison = null;
  let status = "root_transport_refinement_certificate_passed";
  let failureCode = null;

  if (baselineArtifact?.artifact_schema !== INTAKE_SCHEMA) {
    missingFields.push(`baseline.artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (variantArtifact?.artifact_schema !== INTAKE_SCHEMA) {
    missingFields.push(`variant.artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (path.resolve(args.baseline) === path.resolve(args.variant)) {
    status = "blocked_same_artifact_not_variant";
    failureCode = "same-artifact-not-a-refinement-or-phase-origin-variant";
  } else if (missingFields.length > 0) {
    status = "blocked_missing_root_transport_records";
    failureCode = "missing-root-transport-source-record-fields";
  } else if (sourceMetadataMismatches.length > 0) {
    status = "root_transport_source_metadata_mismatch";
    failureCode = sourceMetadataMismatches[0].failure_code ?? "root-transport-source-metadata-mismatch";
  } else {
    comparison = bestComparison(args, baselineRecord, variantRecord);
    if (!comparison || comparison.mismatch_count > 0) {
      status = "root_transport_identity_refinement_fail";
      failureCode = comparison?.mismatches?.[0]?.failure_code ?? "root-transport-root-key-cyclic-order-mismatch";
    } else if (comparison.feature_sample_count === 0) {
      status = "root_transport_phase_origin_covariance_fail";
      failureCode = "root-transport-quotient-feature-empty";
    } else if (comparison.max_feature_relative_delta > args.tolerance) {
      status = "root_transport_phase_origin_covariance_fail";
      failureCode = "root-transport-quotient-features-not-covariant";
    } else if (comparison.root_field_drift_count > 0) {
      status = "root_transport_identity_refinement_fail";
      failureCode = "root-transport-root-field-drift";
    } else if (args.phaseShiftBuckets === "auto") {
      status = "root_transport_phase_shift_diagnostic_only";
      failureCode = "root-transport-phase-shift-not-declared";
    }
  }

  const passed = status === "root_transport_refinement_certificate_passed";
  const diagnosticOnly = status === "root_transport_phase_shift_diagnostic_only";
  return {
    artifact_schema: CERTIFICATE_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    failure_code: failureCode,
    accepted_history_boundary: false,
    rerun_authority: "certificate_only_not_corrected_rerun_authority",
    inputs: {
      baseline: args.baseline,
      variant: args.variant,
      baseline_row: baselineRow?.row ?? null,
      variant_row: variantRow?.row ?? null,
      baseline_schema: baselineArtifact?.artifact_schema ?? null,
      variant_schema: variantArtifact?.artifact_schema ?? null,
      variant_kind: args.variantKind,
    },
    parameters: {
      quotient: args.quotient,
      feature_names: featureNames(args.quotient),
      phase_shift_buckets: args.phaseShiftBuckets,
      declared_phase_shift_required_for_pass: true,
      tolerance: args.tolerance,
      matching_rule: "root_key + cyclic order; transport_id is not used as identity",
    },
    source_contract: {
      baseline_root_count: baselineRecord?.roots?.length ?? null,
      variant_root_count: variantRecord?.roots?.length ?? null,
      baseline_transport_identity_scope: baselineRecord?.transport_identity_scope ?? null,
      variant_transport_identity_scope: variantRecord?.transport_identity_scope ?? null,
      baseline_phase_origin_covariance_status: baselineRecord?.phase_origin_covariance_status ?? null,
      variant_phase_origin_covariance_status: variantRecord?.phase_origin_covariance_status ?? null,
      transport_id_used_for_matching: false,
      metadata_mismatches: sourceMetadataMismatches,
    },
    certificate: {
      transport_identity_refinement_stable: passed,
      phase_origin_covariance_certified: passed,
      diagnostic_phase_shift_detected: diagnosticOnly,
      matched_without_transport_id: passed || diagnosticOnly,
      comparison,
    },
    missing_fields: missingFields,
    note:
      "This certificate can mark root-transport identity and phase-origin covariance as passed only for the compared source records. It does not certify one-period residual closure, monodromy, eta-ladder persistence, or accepted history.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  args.baseline = requirePath(args.baseline, "--baseline");
  args.variant = requirePath(args.variant, "--variant");
  const baselineArtifact = readJson(args.baseline);
  const variantArtifact = readJson(args.variant);
  writeJson(args, buildCertificate(args, baselineArtifact, variantArtifact));
}

main();
