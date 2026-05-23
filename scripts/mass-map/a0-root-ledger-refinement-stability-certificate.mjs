#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const ROW_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt-row/v1";
const CONTINUATION_SOURCE_SCHEMA = "a0-tier1-continuation-source-prototype/v1";
const CONTINUATION_SOURCE_ROW_SCHEMA = "a0-tier1-continuation-source-prototype-row/v1";
const CERTIFICATE_SCHEMA = "a0-root-ledger-refinement-stability-certificate/v1";
const FINGERPRINT_ALGORITHM = "sha256-canonical-a0-active-root-ledger-v1";
const RERUN_AUTHORITY = "certificate_only_not_corrected_rerun_authority";
const DEFAULT_TOLERANCE = 1e-9;
const MATCHING_RULE =
  "receiver|source|relation|status + cyclic order at fixed period; no transport_id or phase-origin reindexing";
const PHASE_ORIGIN_VARIANT_KINDS = new Set([
  "phase_origin_variant",
  "phase_origin_or_refinement_variant",
  "declared_phase_origin_bucket_shift",
  "reference_reemission_from_active_root_ledger",
]);
const NON_PHASE_REFINEMENT_VARIANT_KINDS = new Set([
  "delta_t_refinement",
  "history_window_refinement",
  "root_sample_count_refinement",
  "root_solver_tolerance_refinement",
  "carrier_root_replay_refinement",
]);

function parseArgs(argv) {
  const args = {
    baseline: null,
    variant: null,
    baselineRow: "first",
    variantRow: "first",
    variantKind: null,
    tolerance: DEFAULT_TOLERANCE,
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
    } else if (arg === "--variant-kind") {
      args.variantKind = argv[++i];
    } else if (arg === "--tolerance") {
      args.tolerance = parseNonnegativeNumber(argv[++i], "--tolerance");
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
  console.log(`Usage: node scripts/mass-map/a0-root-ledger-refinement-stability-certificate.mjs --baseline PATH --variant PATH --variant-kind VALUE [options]

Options:
  --baseline PATH       Baseline a0-tier1-fold-layer-locked-one-period-attempt artifact.
  --variant PATH        Independent refinement-variant artifact with active_causal_root_ledger, or a carrier-replay continuation source diagnostic.
  --baseline-row VALUE  Row number or "first". Defaults to first row.
  --variant-row VALUE   Row number or "first". Defaults to first row.
  --variant-kind VALUE  Required declaration for the variant family. Phase-origin variants are rejected.
  --tolerance N         Maximum relative active-root field drift. Defaults to ${DEFAULT_TOLERANCE}.
  --out PATH            Write JSON output to a file instead of stdout.
  --pretty              Pretty-print JSON.
  --help                Show this help.

This fail-closed certificate compares active causal-root ledgers by root identity
and fixed cyclic order, or consumes the carrier-replay root-refinement diagnostic
when the variant schema is ${CONTINUATION_SOURCE_SCHEMA}. It does not compare
root_transport_source_record packets, does not apply a phase-origin reindexing,
and never authorizes corrected rerun or accepted history.`);
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

function selectRow(artifact, selector) {
  const rows = rowsOf(artifact);
  if (selector === "first") {
    return rows[0] ?? null;
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

function modulo(value, modulus) {
  if (!finiteNumber(modulus) || modulus <= 0) {
    return value;
  }
  return ((value % modulus) + modulus) % modulus;
}

function circularDistance(left, right, period) {
  const raw = Math.abs(modulo(left, period) - modulo(right, period));
  return Math.min(raw, Math.abs(period - raw));
}

function rootIdentity(root) {
  return `${root.receiver}|${root.source}|${root.relation}|${root.status}`;
}

function canonicalActiveRoots(row) {
  const roots =
    row?.active_causal_root_ledger ??
    row?.active_roots ??
    row?.root_ledger?.active_roots ??
    row?.root_ledger?.roots ??
    [];
  return Array.isArray(roots)
    ? roots
        .map((root) => ({
          receiver: root?.receiver ?? null,
          source: root?.source ?? null,
          relation: root?.relation ?? null,
          status: root?.status ?? null,
          t: Number(root?.t ?? root?.time),
          delay: Number(root?.delay ?? root?.tau ?? root?.root_delay),
          J: Number(root?.J),
        }))
        .filter(
          (root) =>
            typeof root.receiver === "string" &&
            typeof root.source === "string" &&
            typeof root.relation === "string" &&
            root.status === "active" &&
            finiteNumber(root.t) &&
            finiteNumber(root.delay) &&
            finiteNumber(root.J)
        )
    : [];
}

function activeLedgerFingerprint(row) {
  const period = row?.period ?? null;
  const roots = canonicalActiveRoots(row)
    .map((root) => ({
      root_key: rootIdentity(root),
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      status: root.status,
      t: root.t,
      delay: root.delay,
      J: root.J,
    }))
    .sort((left, right) => {
      const keyComparison = left.root_key.localeCompare(right.root_key);
      return keyComparison !== 0 ? keyComparison : Number(left.t) - Number(right.t);
    });
  return crypto.createHash("sha256").update(JSON.stringify({ period, roots })).digest("hex");
}

function missingRowFields(row, label) {
  const missing = [];
  if (row?.schema !== ROW_SCHEMA) {
    missing.push(`${label}.schema=${ROW_SCHEMA}`);
  }
  if (!Number.isInteger(row?.row)) {
    missing.push(`${label}.row`);
  }
  if (!finiteNumber(row?.period) || row.period <= 0) {
    missing.push(`${label}.period`);
  }
  const roots = canonicalActiveRoots(row);
  if (roots.length < 2) {
    missing.push(`${label}.active_causal_root_ledger[2+]`);
  }
  if (row?.validation?.benchmark_inputs_excluded !== true) {
    missing.push(`${label}.validation.benchmark_inputs_excluded=true`);
  }
  return missing;
}

function variantRowMissingFields(variantArtifact, row, label) {
  if (variantArtifact?.artifact_schema !== CONTINUATION_SOURCE_SCHEMA) {
    return missingRowFields(row, label);
  }
  const missing = [];
  if (row?.schema !== CONTINUATION_SOURCE_ROW_SCHEMA) {
    missing.push(`${label}.schema=${CONTINUATION_SOURCE_ROW_SCHEMA}`);
  }
  if (!Number.isInteger(row?.row)) {
    missing.push(`${label}.row`);
  }
  if (!finiteNumber(row?.period) || row.period <= 0) {
    missing.push(`${label}.period`);
  }
  const roots = canonicalActiveRoots(row);
  if (roots.length < 2) {
    missing.push(`${label}.active_causal_root_ledger[2+]`);
  }
  if (row?.validation?.benchmark_inputs_excluded !== true) {
    missing.push(`${label}.validation.benchmark_inputs_excluded=true`);
  }
  const diagnostic = row?.diagnostics?.root_ledger_refinement;
  if (diagnostic?.status !== "carrier-root-ledger-refinement-passed") {
    missing.push(`${label}.diagnostics.root_ledger_refinement.status=carrier-root-ledger-refinement-passed`);
  }
  if (diagnostic?.failure_code !== null) {
    missing.push(`${label}.diagnostics.root_ledger_refinement.failure_code=null`);
  }
  if (diagnostic?.root_ledger_stable_under_refinement !== true) {
    missing.push(`${label}.diagnostics.root_ledger_refinement.root_ledger_stable_under_refinement=true`);
  }
  return missing;
}

function byIdentity(roots, period) {
  const groups = new Map();
  for (const root of roots) {
    const key = rootIdentity(root);
    const group = groups.get(key) ?? [];
    group.push(root);
    groups.set(key, group);
  }
  for (const group of groups.values()) {
    group.sort((left, right) => modulo(left.t, period) - modulo(right.t, period));
  }
  return groups;
}

function groupKeys(leftGroups, rightGroups) {
  return [...new Set([...leftGroups.keys(), ...rightGroups.keys()])].sort();
}

function relativeDelta(left, right) {
  return Math.abs(left - right) / Math.max(Math.abs(left), Math.abs(right), Number.EPSILON);
}

function fieldDrift(field, baselineRoot, variantRoot, tolerance, period) {
  const baselineValue = baselineRoot[field];
  const variantValue = variantRoot[field];
  const absDelta =
    field === "t" ? circularDistance(baselineValue, variantValue, period) : Math.abs(baselineValue - variantValue);
  const relDelta =
    field === "t"
      ? absDelta / Math.max(Math.abs(period), 1)
      : relativeDelta(baselineValue, variantValue);
  if (relDelta > tolerance) {
    return {
      field,
      baseline_value: baselineValue,
      variant_value: variantValue,
      abs_delta: absDelta,
      relative_delta: relDelta,
    };
  }
  return null;
}

function compareLedgers(baselineRow, variantRow, tolerance) {
  const period = baselineRow.period;
  const baselineGroups = byIdentity(canonicalActiveRoots(baselineRow), period);
  const variantGroups = byIdentity(canonicalActiveRoots(variantRow), period);
  const mismatches = [];
  const fieldDrifts = [];
  let matchedRootCount = 0;
  let maxFieldAbsDelta = 0;
  let maxFieldRelativeDelta = 0;
  let maxTimeDelta = 0;

  for (const key of groupKeys(baselineGroups, variantGroups)) {
    const baselineGroup = baselineGroups.get(key) ?? [];
    const variantGroup = variantGroups.get(key) ?? [];
    if (baselineGroup.length !== variantGroup.length || baselineGroup.length === 0) {
      mismatches.push({
        root_key: key,
        baseline_count: baselineGroup.length,
        variant_count: variantGroup.length,
        failure_code: "active-root-key-count-mismatch",
      });
      continue;
    }
    for (let index = 0; index < baselineGroup.length; index += 1) {
      const baselineRoot = baselineGroup[index];
      const variantRoot = variantGroup[index];
      matchedRootCount += 1;
      if (rootIdentity(baselineRoot) !== rootIdentity(variantRoot)) {
        mismatches.push({
          root_key: key,
          index,
          baseline_identity: rootIdentity(baselineRoot),
          variant_identity: rootIdentity(variantRoot),
          failure_code: "active-root-identity-mismatch",
        });
        continue;
      }
      for (const field of ["t", "delay", "J"]) {
        const drift = fieldDrift(field, baselineRoot, variantRoot, tolerance, period);
        if (drift) {
          fieldDrifts.push({
            root_key: key,
            index,
            failure_code: "active-root-field-drift",
            ...drift,
          });
        }
        if (field === "t") {
          const timeDelta = circularDistance(baselineRoot.t, variantRoot.t, period);
          maxTimeDelta = Math.max(maxTimeDelta, timeDelta);
          maxFieldAbsDelta = Math.max(maxFieldAbsDelta, timeDelta);
          maxFieldRelativeDelta = Math.max(maxFieldRelativeDelta, timeDelta / Math.max(Math.abs(period), 1));
        } else {
          const absDelta = Math.abs(baselineRoot[field] - variantRoot[field]);
          const relDelta = relativeDelta(baselineRoot[field], variantRoot[field]);
          maxFieldAbsDelta = Math.max(maxFieldAbsDelta, absDelta);
          maxFieldRelativeDelta = Math.max(maxFieldRelativeDelta, relDelta);
        }
      }
    }
  }

  return {
    matched_root_count: matchedRootCount,
    mismatch_count: mismatches.length,
    mismatches: mismatches.slice(0, 20),
    field_drift_count: fieldDrifts.length,
    first_field_drift: fieldDrifts[0] ?? null,
    max_time_delta: maxTimeDelta,
    max_field_abs_delta: maxFieldAbsDelta,
    max_field_relative_delta: maxFieldRelativeDelta,
  };
}

function metadataMismatches(baselineRow, variantRow) {
  const mismatches = [];
  if (baselineRow?.period !== variantRow?.period) {
    mismatches.push({
      field: "period",
      baseline_value: baselineRow?.period ?? null,
      variant_value: variantRow?.period ?? null,
      failure_code: "root-ledger-period-mismatch",
    });
  }
  return mismatches;
}

function variantSchemaAllowed(variantArtifact) {
  return variantArtifact?.artifact_schema === INTAKE_SCHEMA || variantArtifact?.artifact_schema === CONTINUATION_SOURCE_SCHEMA;
}

function variantKindAllowed(args) {
  return NON_PHASE_REFINEMENT_VARIANT_KINDS.has(args.variantKind);
}

function diagnosticComparison(baselineRow, diagnostic) {
  const source = diagnostic?.comparison ?? {};
  const maxDelayDrift = Number(source.max_delay_drift ?? 0);
  const periodScale = Math.max(Math.abs(Number(baselineRow?.period ?? 0)), 1);
  const delayDriftCount = Number(source.delay_drift_count ?? 0);
  const missingCount = Number(source.missing_in_refined_count ?? 0);
  const extraCount = Number(source.extra_in_refined_at_shared_times_count ?? 0);
  const ambiguousCount = Number(source.ambiguous_match_count ?? 0);
  const mismatchCount = missingCount + extraCount + ambiguousCount;
  const mismatches = [];
  if (missingCount > 0) {
    mismatches.push({ failure_code: "carrier-root-refinement-missing-root", count: missingCount });
  }
  if (extraCount > 0) {
    mismatches.push({ failure_code: "carrier-root-refinement-extra-root-at-shared-time", count: extraCount });
  }
  if (ambiguousCount > 0) {
    mismatches.push({ failure_code: "carrier-root-refinement-ambiguous-match", count: ambiguousCount });
  }
  return {
    matched_root_count: source.matched_root_count ?? null,
    mismatch_count: mismatchCount,
    mismatches,
    field_drift_count: delayDriftCount,
    first_field_drift:
      delayDriftCount > 0
        ? {
            field: "delay",
            failure_code: "carrier-root-refinement-delay-drift",
            max_delay_drift: source.max_delay_drift ?? null,
            delay_match_tolerance: source.delay_match_tolerance ?? null,
          }
        : null,
    max_time_delta: 0,
    max_field_abs_delta: Number.isFinite(maxDelayDrift) ? maxDelayDrift : null,
    max_field_relative_delta: Number.isFinite(maxDelayDrift) ? maxDelayDrift / periodScale : null,
    carrier_root_replay: {
      shared_observation_time_count: source.shared_observation_time_count ?? null,
      shared_time_base_active_root_count: source.shared_time_base_active_root_count ?? null,
      shared_time_refined_active_root_count: source.shared_time_refined_active_root_count ?? null,
      intermediate_refined_active_root_count: source.intermediate_refined_active_root_count ?? null,
      delay_match_tolerance: source.delay_match_tolerance ?? null,
      max_delay_drift: source.max_delay_drift ?? null,
      J_match_tolerance: source.J_match_tolerance ?? null,
      max_J_drift: source.max_J_drift ?? null,
      J_drift_count: source.J_drift_count ?? null,
      J_drift_attribution_status: source.J_drift_attribution?.status ?? null,
      J_drift_attribution_code: source.J_drift_attribution?.attribution_code ?? null,
    },
  };
}

function diagnosticFailures(args, baselineRow, variantRow) {
  const failures = [];
  const diagnostic = variantRow?.diagnostics?.root_ledger_refinement ?? null;
  const comparison = diagnosticComparison(baselineRow, diagnostic);
  if (args.variantKind !== "carrier_root_replay_refinement") {
    failures.push("root-ledger-refinement-variant-kind-mismatch");
  }
  if (diagnostic?.status !== "carrier-root-ledger-refinement-passed") {
    failures.push("carrier-root-refinement-diagnostic-not-passed");
  }
  if (diagnostic?.scope !== "carrier_root_replay_only") {
    failures.push("carrier-root-refinement-diagnostic-scope-mismatch");
  }
  if (diagnostic?.root_ledger_stable_under_refinement !== true) {
    failures.push("carrier-root-refinement-diagnostic-not-stable");
  }
  if (diagnostic?.relation_coverage_stable !== true) {
    failures.push("carrier-root-refinement-relation-coverage-drift");
  }
  if (diagnostic?.source_coverage_stable !== true) {
    failures.push("carrier-root-refinement-source-coverage-drift");
  }
  if (!Number.isFinite(comparison.carrier_root_replay.shared_observation_time_count) || comparison.carrier_root_replay.shared_observation_time_count <= 0) {
    failures.push("carrier-root-refinement-shared-times-missing");
  }
  if (comparison.mismatch_count !== 0) {
    failures.push(comparison.mismatches[0]?.failure_code ?? "carrier-root-refinement-ledger-mismatch");
  }
  if (comparison.field_drift_count !== 0) {
    failures.push("carrier-root-refinement-delay-drift");
  }
  if (!Number.isFinite(comparison.max_field_relative_delta)) {
    failures.push("carrier-root-refinement-delta-missing");
  } else if (comparison.max_field_relative_delta > args.tolerance) {
    failures.push("carrier-root-refinement-delta-over-tolerance");
  }
  if (activeLedgerFingerprint(baselineRow) !== activeLedgerFingerprint(variantRow)) {
    failures.push("carrier-root-refinement-baseline-ledger-fingerprint-mismatch");
  }
  return { failures, comparison, diagnostic };
}

function phaseOriginEvidence(args, variantArtifact, variantRow) {
  const evidence = [];
  if (PHASE_ORIGIN_VARIANT_KINDS.has(args.variantKind)) {
    evidence.push({
      source: "parameters.variant_kind",
      value: args.variantKind,
    });
  }
  if (variantArtifact?.metadata?.artifact === "a0-root-transport-phase-origin-variant") {
    evidence.push({
      source: "variant.metadata.artifact",
      value: variantArtifact.metadata.artifact,
    });
  }
  if (String(variantArtifact?.rerun_authority ?? "").includes("phase_origin_variant")) {
    evidence.push({
      source: "variant.rerun_authority",
      value: variantArtifact.rerun_authority,
    });
  }
  const rowVariant = variantRow?.phase_origin_variant;
  if (rowVariant?.schema === "a0-root-transport-phase-origin-variant/v1") {
    evidence.push({
      source: "variant.row.phase_origin_variant.schema",
      value: rowVariant.schema,
    });
  }
  const recordVariant = variantRow?.branch_chart_source_records?.root_transport_source_record?.phase_origin_variant;
  if (recordVariant?.schema === "a0-root-transport-phase-origin-variant/v1") {
    evidence.push({
      source: "variant.root_transport_source_record.phase_origin_variant.schema",
      value: recordVariant.schema,
    });
  }
  return evidence;
}

function buildCertificate(args, baselineArtifact, variantArtifact) {
  const baselineRow = selectRow(baselineArtifact, args.baselineRow);
  const variantRow = selectRow(variantArtifact, args.variantRow);
  const missingFields = [
    ...missingRowFields(baselineRow, "baseline.row"),
    ...variantRowMissingFields(variantArtifact, variantRow, "variant.row"),
  ];
  if (baselineArtifact?.artifact_schema !== INTAKE_SCHEMA) {
    missingFields.push(`baseline.artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!variantSchemaAllowed(variantArtifact)) {
    missingFields.push(`variant.artifact_schema=${INTAKE_SCHEMA}|${CONTINUATION_SOURCE_SCHEMA}`);
  }
  if (typeof args.variantKind !== "string" || args.variantKind.length === 0) {
    missingFields.push("parameters.variant_kind");
  } else if (!variantKindAllowed(args) && !PHASE_ORIGIN_VARIANT_KINDS.has(args.variantKind)) {
    missingFields.push("parameters.variant_kind=declared_non_phase_refinement_kind");
  }

  const phaseEvidence = phaseOriginEvidence(args, variantArtifact, variantRow);
  const sourceMismatches =
    missingFields.length === 0 && baselineRow && variantRow ? metadataMismatches(baselineRow, variantRow) : [];
  let comparison = null;
  let status = "root_ledger_refinement_stability_certificate_passed";
  let failureCode = null;

  if (path.resolve(args.baseline) === path.resolve(args.variant)) {
    status = "blocked_same_artifact_not_refinement_variant";
    failureCode = "same-artifact-not-a-root-ledger-refinement-variant";
  } else if (phaseEvidence.length > 0) {
    status = "blocked_phase_origin_variant_not_refinement";
    failureCode = "phase-origin-variant-not-root-ledger-refinement";
  } else if (missingFields.length > 0) {
    status = "blocked_missing_active_root_ledgers";
    failureCode = "missing-active-root-ledger-fields";
  } else if (sourceMismatches.length > 0) {
    status = "root_ledger_source_metadata_mismatch";
    failureCode = sourceMismatches[0].failure_code ?? "root-ledger-source-metadata-mismatch";
  } else if (variantArtifact?.artifact_schema === CONTINUATION_SOURCE_SCHEMA) {
    const diagnosticPacket = diagnosticFailures(args, baselineRow, variantRow);
    comparison = diagnosticPacket.comparison;
    if (diagnosticPacket.failures.length > 0) {
      status = "root_ledger_carrier_replay_refinement_fail";
      failureCode = diagnosticPacket.failures[0];
    }
  } else {
    comparison = compareLedgers(baselineRow, variantRow, args.tolerance);
    if (!comparison || comparison.mismatch_count > 0) {
      status = "root_ledger_identity_refinement_fail";
      failureCode = comparison?.mismatches?.[0]?.failure_code ?? "active-root-identity-mismatch";
    } else if (comparison.field_drift_count > 0 || comparison.max_field_relative_delta > args.tolerance) {
      status = "root_ledger_field_refinement_fail";
      failureCode = comparison?.first_field_drift?.failure_code ?? "active-root-field-drift";
    }
  }

  const passed = status === "root_ledger_refinement_stability_certificate_passed";
  return {
    artifact_schema: CERTIFICATE_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    failure_code: failureCode,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
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
      tolerance: args.tolerance,
      matching_rule: MATCHING_RULE,
      phase_origin_reindexing_allowed: false,
      variant_kind_required_for_pass: true,
    },
    source_contract: {
      baseline_period: baselineRow?.period ?? null,
      variant_period: variantRow?.period ?? null,
      baseline_root_count: canonicalActiveRoots(baselineRow).length,
      variant_root_count: canonicalActiveRoots(variantRow).length,
      active_root_ledger_fingerprint_algorithm: FINGERPRINT_ALGORITHM,
      baseline_active_root_ledger_fingerprint: baselineRow ? activeLedgerFingerprint(baselineRow) : null,
      variant_active_root_ledger_fingerprint: variantRow ? activeLedgerFingerprint(variantRow) : null,
      metadata_mismatches: sourceMismatches,
      phase_origin_variant_evidence: phaseEvidence,
      refinement_evidence_source:
        variantArtifact?.artifact_schema === CONTINUATION_SOURCE_SCHEMA
          ? "carrier_replay_root_refinement_diagnostic"
          : "active_ledger_pair_comparison",
      refinement_diagnostic_status: variantRow?.diagnostics?.root_ledger_refinement?.status ?? null,
      refinement_diagnostic_scope: variantRow?.diagnostics?.root_ledger_refinement?.scope ?? null,
      refinement_diagnostic_warning_code: variantRow?.diagnostics?.root_ledger_refinement?.warning_code ?? null,
      refinement_diagnostic_acceptance_scope:
        variantRow?.diagnostics?.root_ledger_refinement?.acceptance_scope ?? null,
    },
    certificate: {
      root_ledger_stable_under_refinement: passed,
      matched_without_transport_id: passed,
      phase_origin_shift_used_for_matching: false,
      phase_origin_variant_detected: phaseEvidence.length > 0,
      comparison,
    },
    missing_fields: missingFields,
    note:
      "This certificate only tests active causal-root ledger stability under a declared non-phase-origin refinement variant. It does not certify root-transport source-record covariance, one-period residual closure, eta-ladder persistence, corrected rerun, or accepted history.",
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
