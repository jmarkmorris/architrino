#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const OUTPUT_SCHEMA = "a0-tier1-branch-chart-revision-checker/v1";
const OUTPUT_ROW_SCHEMA = "a0-tier1-branch-chart-revision-checker-row/v1";
const CONTRACT_SCHEMA = "a0-branch-chart-revision-contract/v1";
const BASELINE_LEDGER = "refined_i_receiver_phase_bin_residual_balance";
const REVISION_TYPE = "non_root_key_z_lambda_mode";
const REVISION_MODE = "i_layer_harmonic_deformation_coordinate";
const ROOT_TRANSPORT_SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const ROOT_TRANSPORT_IDENTITY_SCHEMA = "a0-root-transport-identity/v1";
const ROOT_TRANSPORT_PHASE_COVARIANCE_SCHEMA = "a0-root-transport-phase-origin-covariance/v1";
const ROOT_TRANSPORT_CERTIFICATE_SCHEMA = "a0-root-transport-refinement-certificate/v1";
const ROOT_LEDGER_STABILITY_CERTIFICATE_SCHEMA = "a0-root-ledger-refinement-stability-certificate/v1";
const ROOT_LEDGER_CONTINUATION_SOURCE_SCHEMA = "a0-tier1-continuation-source-prototype/v1";
const ROOT_TRANSPORT_CERTIFICATE_RERUN_AUTHORITY = "certificate_only_not_corrected_rerun_authority";
const SOURCE_RECORD_FINGERPRINT_ALGORITHM = "sha256-canonical-root-transport-source-record-v1";
const ACTIVE_ROOT_LEDGER_FINGERPRINT_ALGORITHM = "sha256-canonical-a0-active-root-ledger-v1";
const ROOT_LEDGER_STABILITY_MATCHING_RULE =
  "receiver|source|relation|status + cyclic order at fixed period; no transport_id or phase-origin reindexing";
const ROOT_LEDGER_CONTINUATION_SOURCE_VARIANT_KIND = "carrier_root_replay_refinement";
const ROOT_LEDGER_PHASE_ORIGIN_VARIANT_KINDS = new Set([
  "phase_origin_variant",
  "phase_origin_or_refinement_variant",
  "declared_phase_origin_bucket_shift",
  "reference_reemission_from_active_root_ledger",
]);
const ROOT_TRANSPORT_FIT_FAILURE = "root-transport-coordinate-fit-not-implemented";
const DEFAULT_ROOT_TRANSPORT_QUOTIENT = "source_layer_shear";
const ACCEPTED_BRANCH_PROMOTION_BLOCKER = "blocked_until_master_equation_branch_chart_basis";
const MASTER_EQUATION_BRANCH_BASIS_DEPENDENCY =
  "master-equation-closure matching dynamics/branch-chart basis";
const ROOT_TRANSPORT_QUOTIENTS = new Set([
  DEFAULT_ROOT_TRANSPORT_QUOTIENT,
  "source_layer_signed_polarity_shear",
  "m_jacobian_signed_polarity_shear",
]);
const PRIMARY_MODES = [4, 5, 7];
const GUARD_MODES = [6];
const NYQUIST_WARNING_MODE = 8;
const DEFAULT_TOLERANCE = 0.02;
const DEFAULT_RIDGE = 1e-12;
const SOURCE_DECLARATIONS = new Set([
  "residual_surface_audit",
  "prefit_branch_chart",
  "active_roots",
  "root_times",
  "corrected_carrier_state",
  "root_transport_source_record",
]);

function parseArgs(argv) {
  const args = {
    intake: null,
    rows: "all",
    tolerance: DEFAULT_TOLERANCE,
    ridge: DEFAULT_RIDGE,
    coordinateSource: "residual_surface_audit",
    rootTransportQuotient: "source_layer_shear",
    rootTransportCertificate: null,
    rootLedgerStabilityCertificate: null,
    primaryModes: PRIMARY_MODES,
    guardModes: GUARD_MODES,
    nyquistGuardMode: NYQUIST_WARNING_MODE,
    bucketCount: null,
    out: null,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--intake") {
      args.intake = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--tolerance") {
      args.tolerance = parsePositiveNumber(argv[++i], "--tolerance");
    } else if (arg === "--ridge") {
      args.ridge = parseNonnegativeNumber(argv[++i], "--ridge");
    } else if (arg === "--coordinate-source") {
      args.coordinateSource = parseSourceDeclaration(argv[++i]);
    } else if (arg === "--root-transport-quotient") {
      args.rootTransportQuotient = parseRootTransportQuotient(argv[++i]);
    } else if (arg === "--root-transport-certificate") {
      args.rootTransportCertificate = argv[++i];
    } else if (arg === "--root-ledger-stability-certificate") {
      args.rootLedgerStabilityCertificate = argv[++i];
    } else if (arg === "--primary-modes") {
      args.primaryModes = parseModeList(argv[++i], "--primary-modes");
    } else if (arg === "--guard-modes") {
      args.guardModes = parseModeList(argv[++i], "--guard-modes");
    } else if (arg === "--nyquist-guard-mode") {
      args.nyquistGuardMode = parsePositiveInteger(argv[++i], "--nyquist-guard-mode");
    } else if (arg === "--bucket-count") {
      args.bucketCount = parsePositiveInteger(argv[++i], "--bucket-count");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs --intake PATH [options]

Options:
  --intake PATH             JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --rows VALUE              "all" or a comma-separated row list. Defaults to "all".
  --coordinate-source VALUE residual_surface_audit, prefit_branch_chart, active_roots, root_times, corrected_carrier_state, or root_transport_source_record.
                            Defaults to residual_surface_audit, which fails closed as a hidden-fit source.
  --root-transport-quotient VALUE
                            source_layer_shear, source_layer_signed_polarity_shear, or m_jacobian_signed_polarity_shear.
                            Defaults to source_layer_shear and only applies with root_transport_source_record.
  --root-transport-certificate PATH
                            Optional a0-root-transport-refinement-certificate/v1 artifact for root_transport_source_record.
                            It must name this intake as its baseline, use a declared phase shift, and keep accepted history false.
  --root-ledger-stability-certificate PATH
                            Optional a0-root-ledger-refinement-stability-certificate/v1 artifact for root_transport_source_record.
                            It must name this intake as its baseline, reject phase-origin variants, and keep accepted history false.
  --primary-modes VALUE     Comma-separated harmonic modes. Defaults to ${PRIMARY_MODES.join(",")}.
  --guard-modes VALUE       Comma-separated guard harmonic modes. Defaults to ${GUARD_MODES.join(",")}.
  --nyquist-guard-mode N    Mode treated as a Nyquist warning. Defaults to ${NYQUIST_WARNING_MODE}.
  --bucket-count N          Expected observation bucket count. Defaults to sampled-forcing sample count.
  --tolerance N             Held-out relative residual tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --ridge N                 Ridge added to normal-equation diagonal. Defaults to ${DEFAULT_RIDGE}.
  --out PATH                Write JSON output to a file instead of stdout.
  --pretty                  Pretty-print JSON.
  --help                    Show this help.

This fail-closed checker consumes a corrected $A_0$ one-period attempt artifact
and emits the pre-rerun branch-chart revision contract ledger. It does not run a
corrected one-period map and never emits accepted history.`);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive number, got: ${value}`);
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

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
}

function parseModeList(value, name) {
  const modes = String(value)
    .split(",")
    .map((entry) => parsePositiveInteger(entry.trim(), name));
  if (modes.length === 0) {
    throw new Error(`Expected ${name} to contain at least one mode.`);
  }
  return [...new Set(modes)].sort((left, right) => left - right);
}

function parseSourceDeclaration(value) {
  if (SOURCE_DECLARATIONS.has(value)) {
    return value;
  }
  throw new Error(`Unsupported --coordinate-source value: ${value}`);
}

function parseRootTransportQuotient(value) {
  if (ROOT_TRANSPORT_QUOTIENTS.has(value)) {
    return value;
  }
  throw new Error(`Unsupported --root-transport-quotient value: ${value}`);
}

function requireIntakePath(args) {
  if (!args.intake) {
    throw new Error("Missing required --intake PATH argument.");
  }
  return path.resolve(args.intake);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(args, output) {
  const json = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${json}\n`);
  } else {
    console.log(json);
  }
}

function rowsOf(artifact) {
  return Array.isArray(artifact?.rows) ? artifact.rows : [];
}

function selectRows(artifact, selector) {
  const rows = rowsOf(artifact);
  if (selector === "all") {
    return rows;
  }
  const selected = new Set(
    String(selector)
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter(Number.isInteger)
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return rows.filter((row) => selected.has(row.row));
}

function topLevelMissingFields(artifact) {
  const missing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    missing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    missing.push("rows[]");
  }
  return missing;
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
}

function rowMissingFields(row) {
  const missing = [];
  const ledger = row?.residual_ledgers?.[BASELINE_LEDGER];
  const forcing = ledger?.sampled_forcing;
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (ledger?.schema !== "a0-tier1-refined-residual-basis-ledger/v1") {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.schema=a0-tier1-refined-residual-basis-ledger/v1`);
  }
  if (!Number.isFinite(ledger?.relative_residual)) {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.relative_residual`);
  }
  if (!Number.isFinite(forcing?.period) || forcing.period <= 0) {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.sampled_forcing.period`);
  }
  if (!Array.isArray(forcing?.samples) || forcing.samples.length < 2) {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.sampled_forcing.samples[2+]`);
    return missing;
  }
  for (const [index, sample] of forcing.samples.entries()) {
    if (!Number.isFinite(sample?.t)) {
      missing.push(`sampled_forcing.samples[${index}].t`);
    }
    if (!finiteVector3(sample?.layers?.I?.residual_forcing)) {
      missing.push(`sampled_forcing.samples[${index}].layers.I.residual_forcing`);
    }
  }
  return missing;
}

function baselineLedger(row) {
  return row?.residual_ledgers?.[BASELINE_LEDGER] ?? null;
}

function finiteNumber(value) {
  return Number.isFinite(value);
}

function rootTransportRecord(row) {
  return row?.branch_chart_source_records?.root_transport_source_record ?? null;
}

function rootTransportDeclaredQuotients(record) {
  if (Array.isArray(record?.declared_root_transport_quotients)) {
    return record.declared_root_transport_quotients.filter((quotient) => ROOT_TRANSPORT_QUOTIENTS.has(quotient));
  }
  if (record?.schema === ROOT_TRANSPORT_SOURCE_SCHEMA) {
    return [DEFAULT_ROOT_TRANSPORT_QUOTIENT];
  }
  return [];
}

function rootTransportIdentityStatus(record) {
  const roots = Array.isArray(record?.roots) ? record.roots : [];
  const rawRootKeyTransportIdCount = roots.filter((root) => String(root?.transport_id ?? "").includes("|phase_bucket:")).length;
  return {
    identity_schema: record?.transport_identity_schema ?? null,
    identity_schema_expected: ROOT_TRANSPORT_IDENTITY_SCHEMA,
    identity_scope: record?.transport_identity_scope ?? null,
    identity_rule: record?.transport_identity_rule ?? null,
    identity_refinement_stable: record?.transport_identity_refinement_stable === true,
    raw_root_key_phase_bucket_transport_id_count: rawRootKeyTransportIdCount,
    local_slot_transport_id_count: roots.filter((root) =>
      String(root?.transport_id ?? "").startsWith("single_artifact_root_transport:")
    ).length,
  };
}

function rootTransportPhaseOriginStatus(record) {
  return {
    phase_origin_covariance_schema: record?.phase_origin_covariance_schema ?? null,
    phase_origin_covariance_schema_expected: ROOT_TRANSPORT_PHASE_COVARIANCE_SCHEMA,
    phase_origin_covariance_status: record?.phase_origin_covariance_status ?? null,
    phase_origin_covariance_certified: record?.phase_origin_covariance_certified === true,
    phase_origin_tested_offsets: Array.isArray(record?.phase_origin_tested_offsets)
      ? record.phase_origin_tested_offsets
      : [],
    phase_origin_covariance_rule: record?.phase_origin_covariance_rule ?? null,
  };
}

function canonicalSourceRecordPayload(record) {
  return {
    period: record?.period ?? null,
    coordinate_family: record?.coordinate_family ?? null,
    source: record?.source ?? null,
    gap_source: record?.gap_source ?? null,
    locked_fold_layer_keys_excluded: record?.locked_fold_layer_keys_excluded === true,
    benchmark_inputs_excluded: record?.benchmark_inputs_excluded === true,
    declared_root_transport_quotients: rootTransportDeclaredQuotients(record).slice().sort(),
    roots: (Array.isArray(record?.roots) ? record.roots : [])
      .map((root) => ({
        root_key: root?.root_key ?? null,
        receiver: root?.receiver ?? null,
        source: root?.source ?? null,
        relation: root?.relation ?? null,
        status: root?.status ?? null,
        t: root?.t ?? null,
        theta: root?.theta ?? null,
        D_tau: root?.D_tau ?? null,
        D_J: root?.D_J ?? null,
        G_r: root?.G_r ?? null,
        locked_fold_layer_key: root?.locked_fold_layer_key === true,
      }))
      .sort((left, right) => {
        const keyComparison = String(left.root_key).localeCompare(String(right.root_key));
        return keyComparison !== 0 ? keyComparison : Number(left.t) - Number(right.t);
      }),
  };
}

function sourceRecordFingerprint(record) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(canonicalSourceRecordPayload(record)))
    .digest("hex");
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

function activeRootIdentity(root) {
  return `${root.receiver}|${root.source}|${root.relation}|${root.status}`;
}

function canonicalActiveRootLedgerPayload(row) {
  return {
    period: row?.period ?? null,
    roots: canonicalActiveRoots(row)
      .map((root) => ({
        root_key: activeRootIdentity(root),
        receiver: root.receiver,
        source: root.source,
        relation: root.relation,
        status: root.status,
        t: root.t,
        delay: root.delay,
        J: root.J,
      }))
      .sort((left, right) => {
        const keyComparison = String(left.root_key).localeCompare(String(right.root_key));
        return keyComparison !== 0 ? keyComparison : Number(left.t) - Number(right.t);
      }),
  };
}

function activeRootLedgerFingerprint(row) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(canonicalActiveRootLedgerPayload(row)))
    .digest("hex");
}

function sameResolvedPath(left, right) {
  if (typeof left !== "string" || typeof right !== "string") {
    return false;
  }
  return path.resolve(left) === path.resolve(right);
}

function rootTransportCertificateStatus(row, record, args, intakePath, context) {
  const certificate = context?.rootTransportCertificate ?? null;
  const certificatePath = context?.rootTransportCertificatePath ?? null;
  if (!certificate) {
    return {
      requested: false,
      status: "not_provided",
      failure_code: null,
      path: null,
      passed: false,
    };
  }
  const failures = [];
  if (certificate.artifact_schema !== ROOT_TRANSPORT_CERTIFICATE_SCHEMA) {
    failures.push("root-transport-certificate-schema-mismatch");
  }
  if (certificate.status !== "root_transport_refinement_certificate_passed") {
    failures.push("root-transport-certificate-not-passed");
  }
  if (certificate.failure_code !== null) {
    failures.push("root-transport-certificate-failure-code-not-null");
  }
  if (certificate.accepted_history_boundary !== false) {
    failures.push("root-transport-certificate-accepted-history-boundary-not-false");
  }
  if (certificate.rerun_authority !== ROOT_TRANSPORT_CERTIFICATE_RERUN_AUTHORITY) {
    failures.push("root-transport-certificate-rerun-authority-mismatch");
  }
  if (!sameResolvedPath(certificate.inputs?.baseline, intakePath)) {
    failures.push("root-transport-certificate-baseline-path-mismatch");
  }
  if (sameResolvedPath(certificate.inputs?.baseline, certificate.inputs?.variant)) {
    failures.push("root-transport-certificate-same-artifact");
  }
  if (certificate.inputs?.baseline_schema !== INTAKE_SCHEMA) {
    failures.push("root-transport-certificate-baseline-schema-mismatch");
  }
  if (certificate.inputs?.variant_schema !== INTAKE_SCHEMA) {
    failures.push("root-transport-certificate-variant-schema-mismatch");
  }
  if (certificate.inputs?.baseline_row !== row.row) {
    failures.push("root-transport-certificate-baseline-row-mismatch");
  }
  if (certificate.parameters?.quotient !== args.rootTransportQuotient) {
    failures.push("root-transport-certificate-quotient-mismatch");
  }
  if (
    certificate.parameters?.phase_shift_buckets === "auto" ||
    !Number.isInteger(certificate.parameters?.phase_shift_buckets)
  ) {
    failures.push("root-transport-certificate-phase-shift-not-declared");
  }
  if (certificate.parameters?.declared_phase_shift_required_for_pass !== true) {
    failures.push("root-transport-certificate-declared-shift-contract-missing");
  }
  if (certificate.parameters?.matching_rule !== "root_key + cyclic order; transport_id is not used as identity") {
    failures.push("root-transport-certificate-matching-rule-mismatch");
  }
  if (!Number.isFinite(certificate.parameters?.tolerance) || certificate.parameters.tolerance < 0) {
    failures.push("root-transport-certificate-tolerance-missing");
  }
  if (certificate.source_contract?.transport_id_used_for_matching !== false) {
    failures.push("root-transport-certificate-used-transport-id");
  }
  if (
    !Array.isArray(certificate.source_contract?.metadata_mismatches) ||
    certificate.source_contract.metadata_mismatches.length !== 0
  ) {
    failures.push("root-transport-certificate-metadata-mismatch");
  }
  if (certificate.source_contract?.baseline_root_count !== record?.roots?.length) {
    failures.push("root-transport-certificate-baseline-root-count-mismatch");
  }
  if (certificate.source_contract?.baseline_transport_identity_scope !== record?.transport_identity_scope) {
    failures.push("root-transport-certificate-identity-scope-mismatch");
  }
  if (certificate.source_contract?.baseline_phase_origin_covariance_status !== record?.phase_origin_covariance_status) {
    failures.push("root-transport-certificate-phase-origin-status-mismatch");
  }
  if (certificate.source_contract?.source_record_fingerprint_algorithm !== SOURCE_RECORD_FINGERPRINT_ALGORITHM) {
    failures.push("root-transport-certificate-fingerprint-algorithm-mismatch");
  }
  if (certificate.source_contract?.baseline_source_record_fingerprint !== sourceRecordFingerprint(record)) {
    failures.push("root-transport-certificate-baseline-fingerprint-mismatch");
  }
  if (!rootTransportQuotientSourceDeclared(record, args.rootTransportQuotient)) {
    failures.push("root-transport-certificate-quotient-not-source-declared");
  }
  if (certificate.certificate?.transport_identity_refinement_stable !== true) {
    failures.push("root-transport-certificate-identity-not-stable");
  }
  if (certificate.certificate?.phase_origin_covariance_certified !== true) {
    failures.push("root-transport-certificate-phase-origin-not-certified");
  }
  if (certificate.certificate?.matched_without_transport_id !== true) {
    failures.push("root-transport-certificate-not-matched-without-transport-id");
  }
  if (certificate.certificate?.diagnostic_phase_shift_detected !== false) {
    failures.push("root-transport-certificate-diagnostic-only");
  }
  const comparison = certificate.certificate?.comparison;
  if (comparison?.mismatch_count !== 0) {
    failures.push("root-transport-certificate-comparison-mismatch");
  }
  if (comparison?.root_field_drift_count !== 0) {
    failures.push("root-transport-certificate-root-field-drift");
  }
  if (!Number.isFinite(comparison?.feature_sample_count) || comparison.feature_sample_count <= 0) {
    failures.push("root-transport-certificate-feature-sample-empty");
  }
  if (!Number.isFinite(comparison?.matched_root_count) || comparison.matched_root_count < 2) {
    failures.push("root-transport-certificate-matched-root-count-too-small");
  }
  if (!Number.isFinite(comparison?.feature_bucket_count) || comparison.feature_bucket_count < 2) {
    failures.push("root-transport-certificate-feature-bucket-count-too-small");
  }
  if (!Number.isFinite(comparison?.max_feature_relative_delta)) {
    failures.push("root-transport-certificate-feature-delta-missing");
  } else if (
    Number.isFinite(certificate.parameters?.tolerance) &&
    comparison.max_feature_relative_delta > certificate.parameters.tolerance
  ) {
    failures.push("root-transport-certificate-feature-delta-over-tolerance");
  }
  return {
    requested: true,
    status: failures.length === 0 ? "passed" : "failed",
    failure_code: failures[0] ?? null,
    path: certificatePath,
    passed: failures.length === 0,
    artifact_schema: certificate.artifact_schema ?? null,
    certificate_status: certificate.status ?? null,
    baseline: certificate.inputs?.baseline ?? null,
    variant: certificate.inputs?.variant ?? null,
    baseline_row: certificate.inputs?.baseline_row ?? null,
    variant_row: certificate.inputs?.variant_row ?? null,
    phase_shift_buckets: certificate.parameters?.phase_shift_buckets ?? null,
    matched_root_count: comparison?.matched_root_count ?? null,
    feature_bucket_count: comparison?.feature_bucket_count ?? null,
    max_feature_relative_delta: comparison?.max_feature_relative_delta ?? null,
    baseline_source_record_fingerprint: certificate.source_contract?.baseline_source_record_fingerprint ?? null,
    failures,
  };
}

function rootLedgerStabilityCertificateStatus(row, intakePath, context) {
  const certificate = context?.rootLedgerStabilityCertificate ?? null;
  const certificatePath = context?.rootLedgerStabilityCertificatePath ?? null;
  if (!certificate) {
    return {
      requested: false,
      status: "not_provided",
      failure_code: null,
      path: null,
      passed: false,
    };
  }
  const failures = [];
  const activeRoots = canonicalActiveRoots(row);
  if (certificate.artifact_schema !== ROOT_LEDGER_STABILITY_CERTIFICATE_SCHEMA) {
    failures.push("root-ledger-stability-certificate-schema-mismatch");
  }
  if (certificate.status !== "root_ledger_refinement_stability_certificate_passed") {
    failures.push("root-ledger-stability-certificate-not-passed");
  }
  if (certificate.failure_code !== null) {
    failures.push("root-ledger-stability-certificate-failure-code-not-null");
  }
  if (certificate.accepted_history_boundary !== false) {
    failures.push("root-ledger-stability-certificate-accepted-history-boundary-not-false");
  }
  if (certificate.rerun_authority !== ROOT_TRANSPORT_CERTIFICATE_RERUN_AUTHORITY) {
    failures.push("root-ledger-stability-certificate-rerun-authority-mismatch");
  }
  if (!sameResolvedPath(certificate.inputs?.baseline, intakePath)) {
    failures.push("root-ledger-stability-certificate-baseline-path-mismatch");
  }
  if (sameResolvedPath(certificate.inputs?.baseline, certificate.inputs?.variant)) {
    failures.push("root-ledger-stability-certificate-same-artifact");
  }
  if (certificate.inputs?.baseline_schema !== INTAKE_SCHEMA) {
    failures.push("root-ledger-stability-certificate-baseline-schema-mismatch");
  }
  const variantSchema = certificate.inputs?.variant_schema ?? null;
  const variantKind = certificate.inputs?.variant_kind ?? null;
  if (variantSchema !== INTAKE_SCHEMA) {
    if (variantSchema !== ROOT_LEDGER_CONTINUATION_SOURCE_SCHEMA) {
      failures.push("root-ledger-stability-certificate-variant-schema-mismatch");
    }
  }
  if (certificate.inputs?.baseline_row !== row.row) {
    failures.push("root-ledger-stability-certificate-baseline-row-mismatch");
  }
  if (typeof variantKind !== "string" || variantKind.length === 0) {
    failures.push("root-ledger-stability-certificate-variant-kind-missing");
  } else if (ROOT_LEDGER_PHASE_ORIGIN_VARIANT_KINDS.has(variantKind)) {
    failures.push("root-ledger-stability-certificate-phase-origin-variant-kind");
  } else if (
    variantSchema === ROOT_LEDGER_CONTINUATION_SOURCE_SCHEMA &&
    variantKind !== ROOT_LEDGER_CONTINUATION_SOURCE_VARIANT_KIND
  ) {
    failures.push("root-ledger-stability-certificate-carrier-replay-kind-mismatch");
  }
  if (variantSchema === ROOT_LEDGER_CONTINUATION_SOURCE_SCHEMA) {
    if (certificate.source_contract?.refinement_evidence_source !== "carrier_replay_root_refinement_diagnostic") {
      failures.push("root-ledger-stability-certificate-carrier-replay-evidence-source-mismatch");
    }
    if (certificate.source_contract?.refinement_diagnostic_status !== "carrier-root-ledger-refinement-passed") {
      failures.push("root-ledger-stability-certificate-carrier-replay-diagnostic-not-passed");
    }
    if (certificate.source_contract?.refinement_diagnostic_scope !== "carrier_root_replay_only") {
      failures.push("root-ledger-stability-certificate-carrier-replay-scope-mismatch");
    }
    if (
      certificate.source_contract?.variant_active_root_ledger_fingerprint !==
      certificate.source_contract?.baseline_active_root_ledger_fingerprint
    ) {
      failures.push("root-ledger-stability-certificate-carrier-replay-fingerprint-mismatch");
    }
  }
  if (!Number.isFinite(certificate.parameters?.tolerance) || certificate.parameters.tolerance < 0) {
    failures.push("root-ledger-stability-certificate-tolerance-missing");
  }
  if (certificate.parameters?.matching_rule !== ROOT_LEDGER_STABILITY_MATCHING_RULE) {
    failures.push("root-ledger-stability-certificate-matching-rule-mismatch");
  }
  if (certificate.parameters?.phase_origin_reindexing_allowed !== false) {
    failures.push("root-ledger-stability-certificate-phase-origin-reindexing-allowed");
  }
  if (certificate.parameters?.variant_kind_required_for_pass !== true) {
    failures.push("root-ledger-stability-certificate-variant-kind-contract-missing");
  }
  if (certificate.source_contract?.baseline_root_count !== activeRoots.length) {
    failures.push("root-ledger-stability-certificate-baseline-root-count-mismatch");
  }
  if (certificate.source_contract?.baseline_period !== row?.period) {
    failures.push("root-ledger-stability-certificate-baseline-period-mismatch");
  }
  if (
    certificate.source_contract?.active_root_ledger_fingerprint_algorithm !== ACTIVE_ROOT_LEDGER_FINGERPRINT_ALGORITHM
  ) {
    failures.push("root-ledger-stability-certificate-fingerprint-algorithm-mismatch");
  }
  if (certificate.source_contract?.baseline_active_root_ledger_fingerprint !== activeRootLedgerFingerprint(row)) {
    failures.push("root-ledger-stability-certificate-baseline-fingerprint-mismatch");
  }
  if (
    !Array.isArray(certificate.source_contract?.metadata_mismatches) ||
    certificate.source_contract.metadata_mismatches.length !== 0
  ) {
    failures.push("root-ledger-stability-certificate-metadata-mismatch");
  }
  if (
    Array.isArray(certificate.source_contract?.phase_origin_variant_evidence) &&
    certificate.source_contract.phase_origin_variant_evidence.length > 0
  ) {
    failures.push("root-ledger-stability-certificate-phase-origin-variant");
  }
  if (certificate.certificate?.root_ledger_stable_under_refinement !== true) {
    failures.push("root-ledger-stability-certificate-root-ledger-not-stable");
  }
  if (certificate.certificate?.matched_without_transport_id !== true) {
    failures.push("root-ledger-stability-certificate-not-matched-without-transport-id");
  }
  if (certificate.certificate?.phase_origin_shift_used_for_matching !== false) {
    failures.push("root-ledger-stability-certificate-used-phase-origin-shift");
  }
  if (certificate.certificate?.phase_origin_variant_detected !== false) {
    failures.push("root-ledger-stability-certificate-phase-origin-detected");
  }
  const comparison = certificate.certificate?.comparison;
  if (comparison?.mismatch_count !== 0) {
    failures.push("root-ledger-stability-certificate-comparison-mismatch");
  }
  if (comparison?.field_drift_count !== 0) {
    failures.push("root-ledger-stability-certificate-field-drift");
  }
  if (!Number.isFinite(comparison?.matched_root_count) || comparison.matched_root_count < 2) {
    failures.push("root-ledger-stability-certificate-matched-root-count-too-small");
  }
  if (!Number.isFinite(comparison?.max_field_relative_delta)) {
    failures.push("root-ledger-stability-certificate-field-delta-missing");
  } else if (
    Number.isFinite(certificate.parameters?.tolerance) &&
    comparison.max_field_relative_delta > certificate.parameters.tolerance
  ) {
    failures.push("root-ledger-stability-certificate-field-delta-over-tolerance");
  }
  return {
    requested: true,
    status: failures.length === 0 ? "passed" : "failed",
    failure_code: failures[0] ?? null,
    path: certificatePath,
    passed: failures.length === 0,
    artifact_schema: certificate.artifact_schema ?? null,
    certificate_status: certificate.status ?? null,
    baseline: certificate.inputs?.baseline ?? null,
    variant: certificate.inputs?.variant ?? null,
    baseline_row: certificate.inputs?.baseline_row ?? null,
    variant_row: certificate.inputs?.variant_row ?? null,
    variant_kind: certificate.inputs?.variant_kind ?? null,
    matched_root_count: comparison?.matched_root_count ?? null,
    max_time_delta: comparison?.max_time_delta ?? null,
    max_field_relative_delta: comparison?.max_field_relative_delta ?? null,
    baseline_active_root_ledger_fingerprint:
      certificate.source_contract?.baseline_active_root_ledger_fingerprint ?? null,
    failures,
  };
}

function rootTransportQuotientSourceDeclared(record, quotient) {
  return rootTransportDeclaredQuotients(record).includes(quotient);
}

function rootTransportSourceMissingFields(row, args) {
  const missing = [];
  const record = rootTransportRecord(row);
  if (record?.schema !== ROOT_TRANSPORT_SOURCE_SCHEMA) {
    missing.push(`rows[].branch_chart_source_records.root_transport_source_record.schema=${ROOT_TRANSPORT_SOURCE_SCHEMA}`);
  }
  if (!Array.isArray(record?.roots) || record.roots.length < 2) {
    missing.push("rows[].branch_chart_source_records.root_transport_source_record.roots[2+]");
    return missing;
  }
  for (const [index, root] of record.roots.entries()) {
    if (typeof root?.root_key !== "string" || root.root_key.length === 0) {
      missing.push(`root_transport_source_record.roots[${index}].root_key`);
    }
    if (!finiteNumber(root?.t)) {
      missing.push(`root_transport_source_record.roots[${index}].t`);
    }
    if (!finiteNumber(root?.theta)) {
      missing.push(`root_transport_source_record.roots[${index}].theta`);
    }
    if (!finiteNumber(root?.D_tau)) {
      missing.push(`root_transport_source_record.roots[${index}].D_tau`);
    }
    if (!finiteNumber(root?.D_J)) {
      missing.push(`root_transport_source_record.roots[${index}].D_J`);
    }
    if (!finiteNumber(root?.G_r)) {
      missing.push(`root_transport_source_record.roots[${index}].G_r`);
    }
    if (typeof root?.transport_id !== "string" || root.transport_id.length === 0) {
      missing.push(`root_transport_source_record.roots[${index}].transport_id`);
    }
    if (typeof root?.transport_identity_status !== "string" || root.transport_identity_status.length === 0) {
      missing.push(`root_transport_source_record.roots[${index}].transport_identity_status`);
    }
    if (typeof root?.transport_identity_components?.root_key !== "string") {
      missing.push(`root_transport_source_record.roots[${index}].transport_identity_components.root_key`);
    }
    if (!Number.isInteger(root?.transport_identity_components?.cyclic_slot)) {
      missing.push(`root_transport_source_record.roots[${index}].transport_identity_components.cyclic_slot`);
    }
    if (!Number.isInteger(root?.transport_identity_components?.same_key_root_count)) {
      missing.push(`root_transport_source_record.roots[${index}].transport_identity_components.same_key_root_count`);
    }
  }
  if (record?.transport_identity_schema !== ROOT_TRANSPORT_IDENTITY_SCHEMA) {
    missing.push(`root_transport_source_record.transport_identity_schema=${ROOT_TRANSPORT_IDENTITY_SCHEMA}`);
  }
  if (typeof record?.transport_identity_scope !== "string" || record.transport_identity_scope.length === 0) {
    missing.push("root_transport_source_record.transport_identity_scope");
  }
  if (typeof record?.transport_identity_rule !== "string" || record.transport_identity_rule.length === 0) {
    missing.push("root_transport_source_record.transport_identity_rule");
  }
  if (typeof record?.transport_identity_refinement_stable !== "boolean") {
    missing.push("root_transport_source_record.transport_identity_refinement_stable");
  }
  if (record?.phase_origin_covariance_schema !== ROOT_TRANSPORT_PHASE_COVARIANCE_SCHEMA) {
    missing.push(`root_transport_source_record.phase_origin_covariance_schema=${ROOT_TRANSPORT_PHASE_COVARIANCE_SCHEMA}`);
  }
  if (
    typeof record?.phase_origin_covariance_status !== "string" ||
    record.phase_origin_covariance_status.length === 0
  ) {
    missing.push("root_transport_source_record.phase_origin_covariance_status");
  }
  if (typeof record?.phase_origin_covariance_certified !== "boolean") {
    missing.push("root_transport_source_record.phase_origin_covariance_certified");
  }
  if (!Array.isArray(record?.phase_origin_tested_offsets)) {
    missing.push("root_transport_source_record.phase_origin_tested_offsets[]");
  }
  if (record?.locked_fold_layer_keys_excluded !== true) {
    missing.push("root_transport_source_record.locked_fold_layer_keys_excluded=true");
  }
  if (record?.benchmark_inputs_excluded !== true) {
    missing.push("root_transport_source_record.benchmark_inputs_excluded=true");
  }
  if (typeof record?.phase_origin_rule !== "string" || record.phase_origin_rule.length === 0) {
    missing.push("root_transport_source_record.phase_origin_rule");
  }
  if (typeof record?.equality_group_key !== "string" || record.equality_group_key.length === 0) {
    missing.push("root_transport_source_record.equality_group_key");
  }
  if (!rootTransportQuotientSourceDeclared(record, args.rootTransportQuotient)) {
    missing.push(`root_transport_source_record.declared_root_transport_quotients includes ${args.rootTransportQuotient}`);
  }
  return missing;
}

function sourceCheck(args, row) {
  if (args.coordinateSource === "root_transport_source_record") {
    const record = rootTransportRecord(row);
    const missingFields = rootTransportSourceMissingFields(row, args);
    const quotientSourceDeclared = rootTransportQuotientSourceDeclared(record, args.rootTransportQuotient);
    const rootTransportRecordPresent =
      record?.schema === ROOT_TRANSPORT_SOURCE_SCHEMA && Array.isArray(record?.roots) && record.roots.length >= 2;
    const passed = missingFields.length === 0;
    return {
      residual: "R_src",
      status: passed ? "passed" : "failed",
      failure_code: passed
        ? null
        : rootTransportRecordPresent && !quotientSourceDeclared
          ? "root-transport-quotient-not-source-declared"
          : rootTransportRecordPresent
            ? "root-transport-source-record-missing-identity-metadata"
          : "missing-root-transport-source-record",
      coordinate_source: args.coordinateSource,
      root_transport_quotient: args.rootTransportQuotient,
      declared_root_transport_quotients: rootTransportDeclaredQuotients(record),
      quotient_source_declared: quotientSourceDeclared,
      allowed_sources: [
        "prefit_branch_chart",
        "active_roots",
        "root_times",
        "corrected_carrier_state",
        "root_transport_source_record",
      ],
      missing_fields: missingFields,
      note: passed
        ? "The coordinate source declaration supplies a root-transport source record with root phase, root-time transport, Jacobian transport, gap, and single-artifact identity metadata."
        : rootTransportRecordPresent && !quotientSourceDeclared
          ? "The requested root-transport quotient was evaluated diagnostically, but it was not declared by the source record and cannot authorize a rerun."
        : rootTransportRecordPresent
          ? "The requested root-transport source record is present, but it is missing the identity or phase-origin covariance metadata required by the current source contract."
        : "The requested root-transport coordinate cannot be checked until the artifact emits the required source record.",
    };
  }
  const passed = args.coordinateSource !== "residual_surface_audit";
  return {
    residual: "R_src",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "rejected_hidden_fit_split",
    coordinate_source: args.coordinateSource,
    allowed_sources: [
      "prefit_branch_chart",
      "active_roots",
      "root_times",
      "corrected_carrier_state",
      "root_transport_source_record",
    ],
    note: passed
      ? "The coordinate source declaration is pre-fit or branch-state facing; this checker still requires held-out residual evidence."
      : "The available coordinate signal is only a residual-surface audit. It may diagnose a candidate mode, but it cannot authorize a branch coordinate.",
  };
}

function coordinateFitCheck(args, coordinatePacket) {
  if (args.coordinateSource !== "root_transport_source_record") {
    return {
      residual: "R_coord",
      status: "passed",
      coordinate_fit: "i_layer_harmonic_deformation_audit",
      note: "The checker can evaluate the declared harmonic audit with the sampled I-layer residual forcing ledger.",
    };
  }
  if (coordinatePacket?.status === "computed") {
    return {
      residual: "R_coord",
      status: "passed",
      coordinate_fit: "i_receiver_inter_layer_j_delay_shear",
      feature_names: coordinatePacket.feature_names,
      sample_count: coordinatePacket.sample_count,
      selected_root_count: coordinatePacket.selected_root_count,
      selected_locked_root_count: coordinatePacket.selected_locked_root_count,
      excluded_locked_root_count: coordinatePacket.excluded_locked_root_count,
      selected_transport_slot_count: coordinatePacket.selected_transport_slot_count,
      note:
        "The checker evaluated the predeclared root-ledger shear coordinate from root_transport_source_record rather than from harmonic residual-feature search.",
    };
  }
  return {
    residual: "R_coord",
    status: "failed",
    failure_code: coordinatePacket?.failure_code ?? ROOT_TRANSPORT_FIT_FAILURE,
    coordinate_fit: "i_receiver_inter_layer_j_delay_shear",
    feature_names: rootTransportFeatureNames(args.rootTransportQuotient),
    missing_fields: coordinatePacket?.missing_fields ?? [],
    note:
      coordinatePacket?.note ??
      "The root-transport source guard is implemented, but certification still needs a root-ledger design matrix and held-out residual check derived from D_tau, D_J, G_r, and transport_id rather than from the harmonic residual audit.",
  };
}

function noveltyCheck(ledger, args) {
  const passed = ledger?.basis_resolution?.basis_mode === "i_receiver_root_key_phase_bin";
  const rootTransport = args.coordinateSource === "root_transport_source_record";
  const check = {
    residual: "D_new",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "missing_failed_phase_bin_baseline",
    baseline_basis_mode: ledger?.basis_resolution?.basis_mode ?? null,
    declared_revision_type: revisionTypeFor(args),
    declared_non_root_key_mode: !rootTransport,
    declared_finer_root_branch_coordinate: rootTransport,
  };
  if (rootTransport) {
    check.note =
      "The root-transport quotient is tested as a finer root-branch coordinate beyond receiver|source|relation|status and the two-bin I observation-phase baseline.";
  }
  return check;
}

function symmetryCheck(args) {
  if (args.coordinateSource === "root_transport_source_record") {
    return {
      residual: "R_sym",
      status: "passed",
      basis: "root-transport S^1_k phase gauge with fixed cos(theta)/sin(theta) shear features",
      root_transport_quotient: args.rootTransportQuotient,
      feature_names: rootTransportFeatureNames(args.rootTransportQuotient),
    };
  }
  return {
    residual: "R_sym",
    status: "passed",
    basis: "cos/sin harmonic pair under common S^1_k phase gauge",
    primary_modes: args.primaryModes,
    guard_modes: args.guardModes,
  };
}

function equalityCheck(ledger, args) {
  const constraints = ledger?.equality_constraints ?? {};
  const passed =
    constraints.root_key_resolved_mu_test === true &&
    constraints.phase_bin_branch_coordinate_test === true &&
    typeof ledger?.basis_resolution?.equality_group_key === "string";
  return {
    residual: "R_eq",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "baseline_equality_map_missing",
    baseline_equality_group_key: ledger?.basis_resolution?.equality_group_key ?? null,
    revision_equality_group_key: equalityGroupKeyFor(args),
  };
}

function lockCheck(ledger) {
  const passed = ledger?.equality_constraints?.locked_fold_layer_keys_excluded === true;
  return {
    residual: "R_lock",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "locked_fold_layer_keys_not_excluded",
    locked_fold_layer_keys_excluded: passed,
  };
}

function benchmarkCheck(row, ledger) {
  const passed =
    ledger?.equality_constraints?.benchmark_inputs_excluded === true &&
    row?.validation?.benchmark_inputs_excluded === true;
  return {
    residual: "R_bench",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "benchmark_inputs_not_excluded",
    ledger_benchmark_inputs_excluded: ledger?.equality_constraints?.benchmark_inputs_excluded === true,
    row_benchmark_inputs_excluded: row?.validation?.benchmark_inputs_excluded === true,
  };
}

function transportCheck(row, args, intakePath, context) {
  const validationStable = row?.validation?.root_ledger_stable_under_refinement === true;
  if (args.coordinateSource === "root_transport_source_record") {
    const record = rootTransportRecord(row);
    const identity = rootTransportIdentityStatus(record);
    const phaseOrigin = rootTransportPhaseOriginStatus(record);
    const certificate = rootTransportCertificateStatus(row, record, args, intakePath, context);
    const rootLedgerCertificate = rootLedgerStabilityCertificateStatus(row, intakePath, context);
    const certificatePassed = certificate.passed === true;
    const rootLedgerCertificatePassed = rootLedgerCertificate.passed === true;
    const rootLedgerCertificateOnly = rootLedgerCertificatePassed && validationStable !== true;
    const recordPresent =
      record?.schema === ROOT_TRANSPORT_SOURCE_SCHEMA && Array.isArray(record?.roots) && record.roots.length >= 2;
    const rootTransportCertified = record?.root_transport_certified === true || certificatePassed;
    const identityRefinementStable = identity.identity_refinement_stable === true || certificatePassed;
    const phaseOriginCertified = phaseOrigin.phase_origin_covariance_certified === true || certificatePassed;
    const passed =
      validationStable &&
      rootTransportCertified &&
      identityRefinementStable &&
      identity.raw_root_key_phase_bucket_transport_id_count === 0 &&
      phaseOriginCertified;
    let failureCode = null;
    if (!passed) {
      if (!recordPresent) {
        failureCode = "missing-root-transport-source-record";
      } else if (identity.raw_root_key_phase_bucket_transport_id_count > 0) {
        failureCode = "root-transport-identity-uses-raw-root-key-phase-bucket";
      } else if (rootLedgerCertificate.requested && rootLedgerCertificate.status !== "passed") {
        failureCode = rootLedgerCertificate.failure_code ?? "root-ledger-stability-certificate-not-passed";
      } else if (certificate.requested && certificate.status !== "passed") {
        failureCode = certificate.failure_code ?? "root-transport-certificate-not-passed";
      } else if (identityRefinementStable !== true) {
        failureCode = "root-transport-identity-not-refinement-stable";
      } else if (phaseOriginCertified !== true) {
        failureCode = "root-transport-phase-origin-covariance-not-certified";
      } else if (rootLedgerCertificateOnly) {
        failureCode = "root-ledger-refinement-stability-certificate-only-not-rerun-authority";
      } else {
        failureCode = "branch_transport_not_yet_certified";
      }
    }
    return {
      residual: "R_transport",
      status: passed ? "passed" : "pending",
      failure_code: failureCode,
      root_ledger_stable_under_refinement: row?.validation?.root_ledger_stable_under_refinement ?? null,
      root_ledger_stable_under_refinement_by_certificate: rootLedgerCertificatePassed,
      root_ledger_stable_under_refinement_effective: validationStable || rootLedgerCertificatePassed,
      root_ledger_refinement_stability_certificate_only: rootLedgerCertificateOnly,
      root_ledger_stable_under_refinement_rerun_authorizing: validationStable,
      root_transport_certified: rootTransportCertified,
      root_transport_certified_by_source_record: record?.root_transport_certified === true,
      root_transport_certified_by_certificate: certificatePassed,
      transport_certification_status: record?.transport_certification_status ?? null,
      ...identity,
      identity_refinement_stable_effective: identityRefinementStable,
      ...phaseOrigin,
      phase_origin_covariance_certified_effective: phaseOriginCertified,
      external_certificate: certificate,
      external_root_ledger_stability_certificate: rootLedgerCertificate,
      note:
        "Root-transport coordinates require raw-row root-ledger stability plus refinement-stable transport identity and phase-origin covariance before they can authorize a corrected rerun input.",
    };
  }
  const passed = validationStable;
  return {
    residual: "R_transport",
    status: passed ? "passed" : "pending",
    failure_code: passed ? null : "branch_transport_not_yet_certified",
    root_ledger_stable_under_refinement: row?.validation?.root_ledger_stable_under_refinement ?? null,
    note: "This pre-rerun checker records the transport blocker; a corrected rerun still must prove persistence under refinement and eta-ladder transport.",
  };
}

function onePeriodCheck(row) {
  const passed = row?.validation?.direct_residuals_passed === true;
  return {
    residual: "R_1p",
    status: passed ? "passed" : "pending",
    failure_code: passed ? null : "corrected_one_period_residuals_not_passed",
    direct_residuals_passed: row?.validation?.direct_residuals_passed ?? null,
    accepted_history_boundary: false,
  };
}

function nyquistCheck(sampleCount, primaryModes, guardModes, nyquistGuardMode, expectedBucketCount) {
  const bucketCount = expectedBucketCount ?? sampleCount;
  const nyquist = bucketCount / 2;
  const allModes = [...primaryModes, ...guardModes];
  const maxMode = Math.max(...allModes);
  const passed = Number.isFinite(nyquist) && maxMode < nyquist && !allModes.includes(nyquistGuardMode);
  return {
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "nyquist_mode_requires_higher_sample_count",
    sample_count: sampleCount,
    expected_bucket_count: bucketCount,
    nyquist_mode: nyquist,
    primary_modes: primaryModes,
    guard_modes: guardModes,
    nyquist_guard_mode: nyquistGuardMode,
    nyquist_guard_mode_admitted: false,
  };
}

function designRow(t, period, modes) {
  const phi = (2 * Math.PI * t) / period;
  return modes.flatMap((mode) => [Math.cos(mode * phi), Math.sin(mode * phi)]);
}

function modulo(value, modulus) {
  if (!Number.isFinite(modulus) || modulus <= 0) {
    return value;
  }
  return ((value % modulus) + modulus) % modulus;
}

function circularDistance(left, right, period) {
  const raw = Math.abs(modulo(left, period) - modulo(right, period));
  return Math.min(raw, Math.abs(period - raw));
}

function normalFor(matrix, ridge) {
  const columnCount = matrix[0]?.length ?? 0;
  const normal = Array.from({ length: columnCount }, () => new Array(columnCount).fill(0));
  for (const row of matrix) {
    for (let i = 0; i < columnCount; i += 1) {
      for (let j = 0; j < columnCount; j += 1) {
        normal[i][j] += row[i] * row[j];
      }
    }
  }
  for (let i = 0; i < columnCount; i += 1) {
    normal[i][i] += ridge;
  }
  return normal;
}

function solveLinearSystem(matrix, rhs, epsilon = 1e-14) {
  const n = rhs.length;
  const augmented = matrix.map((row, index) => [...row, rhs[index]]);
  for (let pivot = 0; pivot < n; pivot += 1) {
    let pivotRow = pivot;
    for (let row = pivot + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[pivotRow][pivot])) {
        pivotRow = row;
      }
    }
    if (Math.abs(augmented[pivotRow][pivot]) < epsilon) {
      return null;
    }
    if (pivotRow !== pivot) {
      [augmented[pivot], augmented[pivotRow]] = [augmented[pivotRow], augmented[pivot]];
    }
    const pivotValue = augmented[pivot][pivot];
    for (let column = pivot; column <= n; column += 1) {
      augmented[pivot][column] /= pivotValue;
    }
    for (let row = 0; row < n; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = augmented[row][pivot];
      for (let column = pivot; column <= n; column += 1) {
        augmented[row][column] -= factor * augmented[pivot][column];
      }
    }
  }
  return augmented.map((row) => row[n]);
}

function matrixRank(matrix, epsilon = 1e-10) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return 0;
  }
  const rows = matrix.map((row) => [...row]);
  const rowCount = rows.length;
  const columnCount = rows[0]?.length ?? 0;
  let rank = 0;
  for (let column = 0; column < columnCount && rank < rowCount; column += 1) {
    let pivotRow = rank;
    for (let row = rank + 1; row < rowCount; row += 1) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivotRow][column])) {
        pivotRow = row;
      }
    }
    if (Math.abs(rows[pivotRow][column]) <= epsilon) {
      continue;
    }
    [rows[rank], rows[pivotRow]] = [rows[pivotRow], rows[rank]];
    const pivot = rows[rank][column];
    for (let col = column; col < columnCount; col += 1) {
      rows[rank][col] /= pivot;
    }
    for (let row = 0; row < rowCount; row += 1) {
      if (row === rank) {
        continue;
      }
      const factor = rows[row][column];
      for (let col = column; col < columnCount; col += 1) {
        rows[row][col] -= factor * rows[rank][col];
      }
    }
    rank += 1;
  }
  return rank;
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function componentFit(fitRows, fitTargets, ridge) {
  const normal = normalFor(fitRows, ridge);
  const rhs = new Array(fitRows[0]?.length ?? 0).fill(0);
  for (let row = 0; row < fitRows.length; row += 1) {
    for (let col = 0; col < rhs.length; col += 1) {
      rhs[col] += fitRows[row][col] * fitTargets[row];
    }
  }
  return solveLinearSystem(normal, rhs);
}

function splitFit(samples, modes, period, ridge, fitSelector, testSelector) {
  const fitSamples = samples.filter(fitSelector);
  const testSamples = samples.filter(testSelector);
  if (fitSamples.length === 0 || testSamples.length === 0) {
    return {
      status: "blocked",
      failure_code: "empty_fit_or_holdout_split",
      fit_sample_count: fitSamples.length,
      holdout_sample_count: testSamples.length,
    };
  }
  const fitRows = fitSamples.map((sample) => designRow(sample.t, period, modes));
  const testRows = testSamples.map((sample) => designRow(sample.t, period, modes));
  let residualNormSquared = 0;
  let targetNormSquared = 0;
  for (let component = 0; component < 3; component += 1) {
    const fitTargets = fitSamples.map((sample) => sample.residual[component]);
    const coefficients = componentFit(fitRows, fitTargets, ridge);
    if (!coefficients) {
      return {
        status: "blocked",
        failure_code: "holdout_normal_equation_singular",
        fit_sample_count: fitSamples.length,
        holdout_sample_count: testSamples.length,
      };
    }
    for (let index = 0; index < testSamples.length; index += 1) {
      const target = testSamples[index].residual[component];
      const residual = target - dot(testRows[index], coefficients);
      residualNormSquared += residual * residual;
      targetNormSquared += target * target;
    }
  }
  return {
    status: "computed",
    fit_sample_count: fitSamples.length,
    holdout_sample_count: testSamples.length,
    residual_norm: Math.sqrt(residualNormSquared),
    target_norm: Math.sqrt(targetNormSquared),
    relative_residual: Math.sqrt(residualNormSquared / Math.max(targetNormSquared, Number.EPSILON)),
  };
}

function splitFitWithFeatures(samples, ridge, fitSelector, testSelector) {
  const fitSamples = samples.filter(fitSelector);
  const testSamples = samples.filter(testSelector);
  if (fitSamples.length === 0 || testSamples.length === 0) {
    return {
      status: "blocked",
      failure_code: "empty_fit_or_holdout_split",
      fit_sample_count: fitSamples.length,
      holdout_sample_count: testSamples.length,
    };
  }
  const fitRows = fitSamples.map((sample) => sample.features);
  const testRows = testSamples.map((sample) => sample.features);
  let residualNormSquared = 0;
  let targetNormSquared = 0;
  for (let component = 0; component < 3; component += 1) {
    const fitTargets = fitSamples.map((sample) => sample.residual[component]);
    const coefficients = componentFit(fitRows, fitTargets, ridge);
    if (!coefficients) {
      return {
        status: "blocked",
        failure_code: "holdout_normal_equation_singular",
        fit_sample_count: fitSamples.length,
        holdout_sample_count: testSamples.length,
      };
    }
    for (let index = 0; index < testSamples.length; index += 1) {
      const target = testSamples[index].residual[component];
      const residual = target - dot(testRows[index], coefficients);
      residualNormSquared += residual * residual;
      targetNormSquared += target * target;
    }
  }
  return {
    status: "computed",
    fit_sample_count: fitSamples.length,
    holdout_sample_count: testSamples.length,
    residual_norm: Math.sqrt(residualNormSquared),
    target_norm: Math.sqrt(targetNormSquared),
    relative_residual: Math.sqrt(residualNormSquared / Math.max(targetNormSquared, Number.EPSILON)),
  };
}

function leverageDiagnostics(samples, modes, period, ridge) {
  const matrix = samples.map((sample) => designRow(sample.t, period, modes));
  const normal = normalFor(matrix, ridge);
  const leverages = matrix.map((row) => {
    const solved = solveLinearSystem(normal, row);
    return solved ? dot(row, solved) : Number.POSITIVE_INFINITY;
  });
  const coefficientCount = modes.length * 2 * 2;
  const equationCount = samples.length * 2;
  return {
    equation_count: equationCount,
    coefficient_count: coefficientCount,
    overdetermined: equationCount > coefficientCount,
    trace_h_over_equations: coefficientCount / Math.max(equationCount, 1),
    max_leverage: Math.max(...leverages),
    minimum_observation_buckets_per_basis_group: samples.length,
    diagnostic_cartesian_equation_count: samples.length * 3,
    diagnostic_cartesian_coefficient_count: modes.length * 2 * 3,
  };
}

function leverageDiagnosticsWithFeatures(samples, ridge) {
  const matrix = samples.map((sample) => sample.features);
  const normal = normalFor(matrix, ridge);
  const leverages = matrix.map((row) => {
    const solved = solveLinearSystem(normal, row);
    return solved ? dot(row, solved) : Number.POSITIVE_INFINITY;
  });
  const featureCount = matrix[0]?.length ?? 0;
  const equationCount = samples.length * 3;
  const coefficientCount = featureCount * 3;
  const perFeatureActiveBucketCounts = new Array(featureCount).fill(0);
  for (const row of matrix) {
    for (let column = 0; column < featureCount; column += 1) {
      if (Number.isFinite(row[column]) && Math.abs(row[column]) > 1e-14) {
        perFeatureActiveBucketCounts[column] += 1;
      }
    }
  }
  const featureRank = matrixRank(matrix);
  return {
    equation_count: equationCount,
    coefficient_count: coefficientCount,
    overdetermined: equationCount > coefficientCount,
    trace_h_over_equations: coefficientCount / Math.max(equationCount, 1),
    max_leverage: Math.max(...leverages),
    minimum_observation_buckets_per_basis_group:
      featureCount > 0 ? Math.min(...perFeatureActiveBucketCounts) : 0,
    per_feature_active_bucket_counts: perFeatureActiveBucketCounts,
    feature_rank: featureRank,
    full_column_rank: featureRank === featureCount,
    feature_count: featureCount,
  };
}

function fullFitResidual(samples, modes, period, ridge) {
  const computed = splitFit(samples, modes, period, ridge, () => true, () => true);
  return {
    status: computed.status,
    failure_code: computed.failure_code ?? null,
    residual_norm: computed.residual_norm ?? null,
    target_norm: computed.target_norm ?? null,
    relative_residual: computed.relative_residual ?? null,
  };
}

function fullFitResidualWithFeatures(samples, ridge) {
  const computed = splitFitWithFeatures(samples, ridge, () => true, () => true);
  return {
    status: computed.status,
    failure_code: computed.failure_code ?? null,
    residual_norm: computed.residual_norm ?? null,
    target_norm: computed.target_norm ?? null,
    relative_residual: computed.relative_residual ?? null,
  };
}

function heldOutResidual(samples, modes, period, ridge, tolerance) {
  const evenToOdd = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index % 2 === 0,
    (_sample, index) => index % 2 === 1
  );
  const oddToEven = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index % 2 === 1,
    (_sample, index) => index % 2 === 0
  );
  const blockHalf = Math.floor(samples.length / 2);
  const firstToSecond = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index < blockHalf,
    (_sample, index) => index >= blockHalf
  );
  const secondToFirst = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index >= blockHalf,
    (_sample, index) => index < blockHalf
  );
  const splits = { even_to_odd: evenToOdd, odd_to_even: oddToEven, first_half_to_second_half: firstToSecond, second_half_to_first_half: secondToFirst };
  const computed = Object.values(splits).filter((split) => split.status === "computed");
  const maxRelativeResidual = computed.length
    ? Math.max(...computed.map((split) => split.relative_residual))
    : Number.POSITIVE_INFINITY;
  const passed =
    computed.length === Object.values(splits).length &&
    Number.isFinite(maxRelativeResidual) &&
    maxRelativeResidual <= tolerance;
  return {
    residual: "R_xval",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "overfit_holdout_fail",
    tolerance,
    held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
    max_held_out_relative_residual: Number.isFinite(maxRelativeResidual) ? maxRelativeResidual : null,
    splits,
  };
}

function heldOutResidualWithFeatures(samples, ridge, tolerance) {
  const evenToOdd = splitFitWithFeatures(
    samples,
    ridge,
    (_sample, index) => index % 2 === 0,
    (_sample, index) => index % 2 === 1
  );
  const oddToEven = splitFitWithFeatures(
    samples,
    ridge,
    (_sample, index) => index % 2 === 1,
    (_sample, index) => index % 2 === 0
  );
  const blockHalf = Math.floor(samples.length / 2);
  const firstToSecond = splitFitWithFeatures(
    samples,
    ridge,
    (_sample, index) => index < blockHalf,
    (_sample, index) => index >= blockHalf
  );
  const secondToFirst = splitFitWithFeatures(
    samples,
    ridge,
    (_sample, index) => index >= blockHalf,
    (_sample, index) => index < blockHalf
  );
  const splits = { even_to_odd: evenToOdd, odd_to_even: oddToEven, first_half_to_second_half: firstToSecond, second_half_to_first_half: secondToFirst };
  const computed = Object.values(splits).filter((split) => split.status === "computed");
  const maxRelativeResidual = computed.length
    ? Math.max(...computed.map((split) => split.relative_residual))
    : Number.POSITIVE_INFINITY;
  const passed =
    computed.length === Object.values(splits).length &&
    Number.isFinite(maxRelativeResidual) &&
    maxRelativeResidual <= tolerance;
  return {
    residual: "R_xval",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "overfit_holdout_fail",
    tolerance,
    held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
    max_held_out_relative_residual: Number.isFinite(maxRelativeResidual) ? maxRelativeResidual : null,
    splits,
  };
}

function dfGuard(samples, modes, period, ridge) {
  const diagnostics = leverageDiagnostics(samples, modes, period, ridge);
  const passed =
    diagnostics.trace_h_over_equations <= 0.5 &&
    diagnostics.max_leverage <= 0.5 &&
    diagnostics.minimum_observation_buckets_per_basis_group >= 2 &&
    diagnostics.overdetermined;
  return {
    residual: "R_df",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "df_guard_fail",
    ...diagnostics,
  };
}

function dfGuardWithFeatures(samples, ridge) {
  const diagnostics = leverageDiagnosticsWithFeatures(samples, ridge);
  const passed =
    diagnostics.trace_h_over_equations <= 0.5 &&
    diagnostics.max_leverage <= 0.5 &&
    diagnostics.minimum_observation_buckets_per_basis_group >= 2 &&
    diagnostics.overdetermined;
  return {
    residual: "R_df",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "df_guard_fail",
    ...diagnostics,
  };
}

function samplesFromLedger(ledger) {
  return ledger.sampled_forcing.samples.map((sample) => ({
    t: sample.t,
    residual: sample.layers.I.residual_forcing,
  }));
}

function parseRootKey(root) {
  const parts = String(root.root_key ?? "").split("|");
  return {
    receiver: root.receiver ?? parts[0] ?? null,
    source: root.source ?? parts[1] ?? null,
    relation: root.relation ?? parts[2] ?? null,
    status: root.status ?? parts[3] ?? null,
  };
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

function rootTransportFeatureNames(quotient) {
  if (quotient === "m_jacobian_signed_polarity_shear") {
    return ["M:D_J", "M:signed:D_J", "M:D_tau", "O:D_J", "O:D_tau"];
  }
  if (quotient === "source_layer_signed_polarity_shear") {
    return ["M:signed:D_J", "M:signed:D_tau", "O:signed:D_J", "O:signed:D_tau"];
  }
  return ["M:D_J", "M:D_tau", "O:D_J", "O:D_tau"];
}

function rootTransportRootsAtSample(roots, sample, period) {
  if (!Array.isArray(roots) || roots.length === 0) {
    return [];
  }
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const root of roots) {
    const distance = circularDistance(root.t, sample.t, period);
    if (distance < bestDistance) {
      bestDistance = distance;
    }
  }
  const tolerance = Math.max(Math.abs(period) * 1e-10, 1e-12);
  return roots.filter((root) => circularDistance(root.t, sample.t, period) <= bestDistance + tolerance);
}

function rootTransportFeaturesForSample(roots, sample, period, quotient) {
  const featureNames = rootTransportFeatureNames(quotient);
  const features = new Array(featureNames.length).fill(0);
  let selectedRootCount = 0;
  let excludedLockedRootCount = 0;
  const addFeature = (name, value) => {
    const index = featureNames.indexOf(name);
    if (index >= 0 && Number.isFinite(value)) {
      features[index] += value;
    }
  };
  for (const root of rootTransportRootsAtSample(roots, sample, period)) {
    const key = parseRootKey(root);
    if (bodyLayer(key.receiver) !== "I" || key.relation !== "inter_layer") {
      continue;
    }
    const sourceLayer = bodyLayer(key.source);
    if (sourceLayer !== "M" && sourceLayer !== "O") {
      continue;
    }
    if (root.locked_fold_layer_key === true) {
      excludedLockedRootCount += 1;
      continue;
    }
    const jShear =
      Number.isFinite(root.D_J) && Number.isFinite(root.theta) && Number.isFinite(root.G_r)
        ? root.G_r * root.D_J * Math.cos(root.theta)
        : null;
    const tauShear =
      Number.isFinite(root.D_tau) && Number.isFinite(root.theta) && Number.isFinite(root.G_r)
        ? root.G_r * root.D_tau * Math.sin(root.theta)
        : null;
    const sign = quotient === "source_layer_signed_polarity_shear" ? polaritySign(key.receiver, key.source) : 1;
    if (quotient === "source_layer_signed_polarity_shear") {
      addFeature(`${sourceLayer}:signed:D_J`, sign * jShear);
      addFeature(`${sourceLayer}:signed:D_tau`, sign * tauShear);
    } else if (quotient === "m_jacobian_signed_polarity_shear") {
      addFeature(`${sourceLayer}:D_J`, jShear);
      addFeature(`${sourceLayer}:D_tau`, tauShear);
      if (sourceLayer === "M") {
        addFeature("M:signed:D_J", polaritySign(key.receiver, key.source) * jShear);
      }
    } else {
      addFeature(`${sourceLayer}:D_J`, jShear);
      addFeature(`${sourceLayer}:D_tau`, tauShear);
    }
    selectedRootCount += 1;
  }
  return { features, selectedRootCount, excludedLockedRootCount };
}

function rootTransportCoordinateSamples(row, samples, period, quotient) {
  const record = row?.branch_chart_source_records?.root_transport_source_record;
  if (record?.schema !== ROOT_TRANSPORT_SOURCE_SCHEMA) {
    return {
      status: "blocked",
      failure_code: "missing-root-transport-source-record",
      missing_fields: [`rows[].branch_chart_source_records.root_transport_source_record.schema=${ROOT_TRANSPORT_SOURCE_SCHEMA}`],
      note: "The root-transport coordinate fit requires a source record emitted before checker fitting.",
    };
  }
  if (!Array.isArray(record.roots) || record.roots.length < 2) {
    return {
      status: "blocked",
      failure_code: "missing-root-transport-source-record",
      missing_fields: ["rows[].branch_chart_source_records.root_transport_source_record.roots[2+]"],
      note: "The root-transport coordinate fit requires root source rows.",
    };
  }
  const coordinateSamples = [];
  let selectedRootCount = 0;
  let excludedLockedRootCount = 0;
  const selectedTransportSlots = new Set();
  const featureNames = rootTransportFeatureNames(quotient);
  for (const sample of samples) {
    const featurePacket = rootTransportFeaturesForSample(record.roots, sample, period, quotient);
    selectedRootCount += featurePacket.selectedRootCount;
    excludedLockedRootCount += featurePacket.excludedLockedRootCount;
    if (!featurePacket.features.some((value) => Number.isFinite(value) && Math.abs(value) > 0)) {
      return {
        status: "blocked",
        failure_code: "root-transport-coordinate-empty-bucket",
        missing_fields: [`root_transport_source_record.roots at t=${sample.t}`],
        note: "At least one sampled forcing bucket has no nonzero I-receiver inter-layer root-transport features.",
      };
    }
    coordinateSamples.push({
      t: sample.t,
      residual: sample.residual,
      features: featurePacket.features,
    });
  }
  for (const root of record.roots) {
    const key = parseRootKey(root);
    if (bodyLayer(key.receiver) === "I" && key.relation === "inter_layer" && root.locked_fold_layer_key !== true) {
      selectedTransportSlots.add(root.transport_id);
    }
  }
  return {
    status: "computed",
    root_transport_quotient: quotient,
    feature_names: featureNames,
    sample_count: coordinateSamples.length,
    selected_root_count: selectedRootCount,
    selected_locked_root_count: 0,
    excluded_locked_root_count: excludedLockedRootCount,
    selected_transport_slot_count: selectedTransportSlots.size,
    source_record_root_count: record.roots.length,
    samples: coordinateSamples,
  };
}

function finalStatus(checks, args) {
  if (checks.R_src?.status === "failed") {
    return checks.R_src.failure_code ?? "rejected_hidden_fit_split";
  }
  const failureOrder = [
    ["R_coord", ROOT_TRANSPORT_FIT_FAILURE],
    ["R_sym", "symmetry_guard_fail"],
    ["R_eq", "equality_guard_fail"],
    ["D_new", "rejected_already_covered_coordinate"],
    ["nyquist", "nyquist_mode_requires_higher_sample_count"],
    ["R_lock", "locked_fold_layer_keys_not_excluded"],
    ["R_bench", "benchmark_inputs_not_excluded"],
    ["R_df", "df_guard_fail"],
    ["R_xval", "overfit_holdout_fail"],
  ];
  for (const [key, status] of failureOrder) {
    const check = checks[key];
    if (check?.status === "failed") {
      return check.failure_code ?? status;
    }
  }
  if (checks.R_transport?.status !== "passed") {
    return args.coordinateSource === "root_transport_source_record"
      ? (checks.R_transport?.failure_code ?? "root-transport-not-certified")
      : "revision_candidate_only";
  }
  if (checks.R_1p?.status !== "passed") {
    return "revision_candidate_only";
  }
  return "revision_candidate_only";
}

function revisionTypeFor(args) {
  return args.coordinateSource === "root_transport_source_record" ? "finer_root_branch_coordinate" : REVISION_TYPE;
}

function revisionModeFor(args) {
  return args.coordinateSource === "root_transport_source_record"
    ? "root_transport_source_coordinate"
    : REVISION_MODE;
}

function coordinateNameFor(args) {
  return args.coordinateSource === "root_transport_source_record" ? "mu_root_transport" : "H_I";
}

function promotionBoundary(status) {
  return {
    corrected_rerun_candidate: status === "revision_candidate_only",
    accepted_history_boundary: false,
    accepted_branch_promotion: false,
    accepted_physics_claim: false,
    accepted_branch_promotion_authority: ACCEPTED_BRANCH_PROMOTION_BLOCKER,
    required_dependency: MASTER_EQUATION_BRANCH_BASIS_DEPENDENCY,
    note:
      "This checker can emit a pre-rerun coordinate ledger only. It cannot promote a corrected A0 branch as accepted physics until the matching master-equation dynamics and branch-chart basis are supplied.",
  };
}

function zLambdaExtensionFor(args) {
  if (args.coordinateSource === "root_transport_source_record") {
    return {
      root_transport_source_schema: ROOT_TRANSPORT_SOURCE_SCHEMA,
      coordinate_family: "I_receiver_inter_layer_J_delay_shear",
      root_transport_quotient: args.rootTransportQuotient,
      required_root_fields: ["root_key", "t", "theta", "D_tau", "D_J", "G_r", "transport_id"],
      required_certification_fields: [
        "transport_identity_refinement_stable",
        "phase_origin_covariance_certified",
      ],
      locked_self_roots_excluded: true,
    };
  }
  return {
    primary_inner_harmonic_modes: args.primaryModes,
    guard_inner_harmonic_modes: args.guardModes,
  };
}

function equalityGroupKeyFor(args) {
  if (args.coordinateSource === "root_transport_source_record") {
    if (args.rootTransportQuotient === "m_jacobian_signed_polarity_shear") {
      return "receiver + source + relation + status + source_layer + transport_channel + M:D_J relative_receiver_source_polarity + phase_origin + single_artifact_transport_slot";
    }
    return "receiver + source + relation + status + shear_signs + phase_origin + single_artifact_transport_slot";
  }
  return "relation + receiver_layer + source_layer + polarity_pair + root_key + harmonic_mode + harmonic_quadrature + projection";
}

function solveRow(row, args, intakePath, context) {
  const missing = rowMissingFields(row);
  if (missing.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_branch_chart_revision_fields",
      failure_code: "missing-branch-chart-revision-fields",
      missing_fields: missing,
      accepted_history_boundary: false,
    };
  }
  const ledger = baselineLedger(row);
  const samples = samplesFromLedger(ledger);
  const period = ledger.sampled_forcing.period;
  const rootTransportCoordinate =
    args.coordinateSource === "root_transport_source_record"
      ? rootTransportCoordinateSamples(row, samples, period, args.rootTransportQuotient)
      : null;
  const fitSamples =
    args.coordinateSource === "root_transport_source_record" && rootTransportCoordinate?.status === "computed"
      ? rootTransportCoordinate.samples
      : samples;
  const nyquist = nyquistCheck(
    samples.length,
    args.primaryModes,
    args.guardModes,
    args.nyquistGuardMode,
    args.bucketCount
  );
  const fullFit =
    args.coordinateSource === "root_transport_source_record" && rootTransportCoordinate?.status === "computed"
      ? fullFitResidualWithFeatures(fitSamples, args.ridge)
      : fullFitResidual(samples, args.primaryModes, period, args.ridge);
  const guardFit =
    args.coordinateSource === "root_transport_source_record"
      ? {
          status: "not_applicable",
          failure_code: null,
          relative_residual: null,
          note: "The root-transport coordinate uses fixed source-layer J/delay shear features rather than harmonic guard modes.",
        }
      : fullFitResidual(samples, [...args.primaryModes, ...args.guardModes], period, args.ridge);
  const checks = {
    R_src: sourceCheck(args, row),
    R_coord: coordinateFitCheck(args, rootTransportCoordinate),
    D_new: noveltyCheck(ledger, args),
    R_sym: symmetryCheck(args),
    R_eq: equalityCheck(ledger, args),
    R_lock: lockCheck(ledger),
    R_transport: transportCheck(row, args, intakePath, context),
    R_df:
      args.coordinateSource === "root_transport_source_record" && rootTransportCoordinate?.status === "computed"
        ? dfGuardWithFeatures(fitSamples, args.ridge)
        : dfGuard(samples, args.primaryModes, period, args.ridge),
    R_xval:
      args.coordinateSource === "root_transport_source_record" && rootTransportCoordinate?.status === "computed"
        ? heldOutResidualWithFeatures(fitSamples, args.ridge, args.tolerance)
        : heldOutResidual(samples, args.primaryModes, period, args.ridge, args.tolerance),
    R_1p: onePeriodCheck(row),
    R_bench: benchmarkCheck(row, ledger),
    nyquist,
  };
  const status = finalStatus(checks, args);
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status,
    failure_code: status === "revision_candidate_only" ? null : status,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    branch_chart_revision: {
      schema: CONTRACT_SCHEMA,
      source_artifact: intakePath,
      revision_type: revisionTypeFor(args),
      mode: revisionModeFor(args),
      coordinate_name: coordinateNameFor(args),
      receiver_layer: "I",
      z_lambda_extension: zLambdaExtensionFor(args),
      nyquist_guard: {
        mode_8_requires_higher_sample_count: args.nyquistGuardMode === 8,
        nyquist_guard_mode: args.nyquistGuardMode,
        max_mode_must_be_below_sample_count_over_2: true,
      },
      coordinate_source_fields: args.coordinateSource,
      equality_group_key: equalityGroupKeyFor(args),
      held_out_residual_rule: "even_odd_and_blocked_bucket_holdout",
      locked_fold_layer_keys_excluded: checks.R_lock.status === "passed",
      benchmark_inputs_excluded: checks.R_bench.status === "passed",
      accepted_history_boundary: false,
    },
    baseline_no_go: {
      ledger: BASELINE_LEDGER,
      status: ledger.status,
      relative_residual: ledger.relative_residual,
      tolerance: ledger.tolerance ?? args.tolerance,
      basis_group_count: ledger.basis_group_count,
      equation_count: ledger.equation_count,
      sample_count: ledger.sample_count,
    },
    harmonic_audit: {
      primary_modes: args.primaryModes,
      guard_modes: args.guardModes,
      full_fit_primary: fullFit,
      full_fit_primary_plus_guard: guardFit,
      diagnostic_fit_basis:
        args.coordinateSource === "root_transport_source_record"
          ? "root_transport_source_record fixed I-receiver inter-layer source-layer J/delay shear features"
          : "cartesian residual-forcing surrogate; declared coordinate count remains radial/tangential",
      root_transport_coordinate:
        rootTransportCoordinate && rootTransportCoordinate.status === "computed"
          ? {
              feature_names: rootTransportCoordinate.feature_names,
              root_transport_quotient: rootTransportCoordinate.root_transport_quotient,
              sample_count: rootTransportCoordinate.sample_count,
              selected_root_count: rootTransportCoordinate.selected_root_count,
              selected_locked_root_count: rootTransportCoordinate.selected_locked_root_count,
              excluded_locked_root_count: rootTransportCoordinate.excluded_locked_root_count,
              selected_transport_slot_count: rootTransportCoordinate.selected_transport_slot_count,
              source_record_root_count: rootTransportCoordinate.source_record_root_count,
            }
          : rootTransportCoordinate,
      note:
        args.coordinateSource === "root_transport_source_record"
          ? "The root-transport coordinate audit is fixed before fitting by the source-record schema. It still cannot authorize a rerun unless held-out residual, transport, one-period, lock, and benchmark checks pass."
          : "The harmonic audit is diagnostic only. A low in-sample residual is not a branch-chart coordinate unless the source and held-out residual checks pass.",
    },
    anti_overfit_residual: checks,
    accepted_history_boundary: false,
    promotion_boundary: promotionBoundary(status),
    rerun_authority:
      status === "revision_candidate_only"
        ? "corrected_rerun_input_check_only_not_accepted_history"
        : "blocked_before_corrected_rerun",
  };
}

function buildOutput(artifact, args, intakePath, context = {}) {
  const topMissing = topLevelMissingFields(artifact);
  const rows =
    topMissing.length > 0 ? [] : selectRows(artifact, args.rows).map((row) => solveRow(row, args, intakePath, context));
  const statusCounts = rows.reduce((counts, row) => {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
    return counts;
  }, {});
  const status = topMissing.length
    ? "blocked_invalid_intake"
    : rows.some((row) => row.status !== "revision_candidate_only")
      ? "blocked_before_corrected_rerun"
      : "revision_candidate_only";
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    intake: intakePath,
    intake_schema: artifact?.artifact_schema ?? null,
    status,
    accepted_history_boundary: false,
    promotion_boundary: promotionBoundary(status),
    parameters: {
      rows: args.rows,
      tolerance: args.tolerance,
      ridge: args.ridge,
      coordinate_source: args.coordinateSource,
      root_transport_quotient: args.rootTransportQuotient,
      root_transport_certificate: context.rootTransportCertificatePath ?? null,
      root_ledger_stability_certificate: context.rootLedgerStabilityCertificatePath ?? null,
      primary_modes: args.primaryModes,
      guard_modes: args.guardModes,
      nyquist_guard_mode: args.nyquistGuardMode,
      bucket_count: args.bucketCount,
    },
    missing_fields: topMissing,
    summary: {
      selected_row_count: rows.length,
      status_counts: statusCounts,
      accepted_history_row_count: 0,
      accepted_branch_promotion_row_count: 0,
      rerun_candidate_row_count: rows.filter((row) => row.status === "revision_candidate_only").length,
    },
    nonfit_statement:
      "This checker may audit harmonic residual structure, but it does not use observed particle masses, measured alpha, CKM values, accepted-history output, or a master-equation closure result. A residual-surface-only coordinate source fails closed as hidden fitting; a passing row is still only a pre-rerun coordinate ledger until the matching master-equation branch-chart basis is supplied.",
    rows,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (args.rootTransportCertificate && args.coordinateSource !== "root_transport_source_record") {
    throw new Error("--root-transport-certificate is only valid with --coordinate-source root_transport_source_record.");
  }
  if (args.rootLedgerStabilityCertificate && args.coordinateSource !== "root_transport_source_record") {
    throw new Error(
      "--root-ledger-stability-certificate is only valid with --coordinate-source root_transport_source_record."
    );
  }
  const intakePath = requireIntakePath(args);
  const rootTransportCertificatePath = args.rootTransportCertificate
    ? path.resolve(args.rootTransportCertificate)
    : null;
  const rootLedgerStabilityCertificatePath = args.rootLedgerStabilityCertificate
    ? path.resolve(args.rootLedgerStabilityCertificate)
    : null;
  const artifact = readJson(intakePath);
  const rootTransportCertificate = rootTransportCertificatePath ? readJson(rootTransportCertificatePath) : null;
  const rootLedgerStabilityCertificate = rootLedgerStabilityCertificatePath
    ? readJson(rootLedgerStabilityCertificatePath)
    : null;
  writeJson(
    args,
    buildOutput(artifact, args, intakePath, {
      rootTransportCertificate,
      rootTransportCertificatePath,
      rootLedgerStabilityCertificate,
      rootLedgerStabilityCertificatePath,
    })
  );
}

main();
