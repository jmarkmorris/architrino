#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ATTEMPT_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const ROW_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt-row/v1";
const SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const ROOT_TRANSPORT_IDENTITY_SCHEMA = "a0-root-transport-identity/v1";
const ROOT_TRANSPORT_PHASE_COVARIANCE_SCHEMA = "a0-root-transport-phase-origin-covariance/v1";
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const DEFAULT_TOLERANCE = 1e-9;

function parseArgs(argv) {
  const args = {
    source: null,
    rows: "first",
    phaseShiftBuckets: null,
    tolerance: DEFAULT_TOLERANCE,
    out: null,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--source") {
      args.source = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--phase-shift-buckets") {
      args.phaseShiftBuckets = parseNonnegativeInteger(argv[++i], "--phase-shift-buckets");
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
  console.log(`Usage: node scripts/mass-map/a0-root-transport-phase-origin-variant.mjs --source PATH --phase-shift-buckets N [options]

Options:
  --source PATH             Existing a0-tier1-fold-layer-locked-one-period-attempt artifact.
  --rows VALUE              "first", "all", or a comma-separated row list. Defaults to "first".
  --phase-shift-buckets N   Declared cyclic observation-bucket shift. Required; use 0 only for a reference emission.
  --tolerance N             Uniform bucket tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --out PATH                Write JSON output to a file instead of stdout.
  --pretty                  Pretty-print JSON.
  --help                    Show this help.

This fail-closed sidecar recomputes root_transport_source_record rows from the
raw active_causal_root_ledger under a declared cyclic phase-origin bucket shift.
It ignores any existing emitted root_transport_source_record in the source
artifact and never authorizes corrected rerun or accepted history.`);
}

function parseNonnegativeInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Expected ${name} to be a nonnegative integer, got: ${value}`);
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

function requireSourcePath(args) {
  if (!args.source) {
    throw new Error("Missing required --source PATH argument.");
  }
  return path.resolve(args.source);
}

function requirePhaseShift(args) {
  if (!Number.isInteger(args.phaseShiftBuckets)) {
    throw new Error("Missing required --phase-shift-buckets N argument.");
  }
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

function selectRows(artifact, selector) {
  const rows = rowsOf(artifact);
  if (selector === "first") {
    return rows.length > 0 ? [rows[0]] : [];
  }
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

function modulo(value, modulus) {
  if (!Number.isFinite(modulus) || modulus <= 0) {
    return value;
  }
  return ((value % modulus) + modulus) % modulus;
}

function finiteNumber(value) {
  return Number.isFinite(value);
}

function rootKey(root) {
  return `${root.receiver}|${root.source}|${root.relation}|${root.status}`;
}

function canonicalRoots(row) {
  const roots =
    row?.active_causal_root_ledger ??
    row?.active_roots ??
    row?.root_ledger?.active_roots ??
    row?.root_ledger?.roots ??
    [];
  return Array.isArray(roots)
    ? roots
        .map((root) => ({
          receiver: root.receiver ?? null,
          source: root.source ?? null,
          relation: root.relation ?? null,
          status: root.status ?? null,
          t: Number(root.t ?? root.time ?? 0),
          delay: Number(root.delay ?? root.tau ?? root.root_delay),
          J: Number(root.J),
        }))
        .filter(
          (root) =>
            BODY_IDS.includes(root.receiver) &&
            BODY_IDS.includes(root.source) &&
            ROOT_RELATIONS.includes(root.relation) &&
            root.status === "active" &&
            finiteNumber(root.t) &&
            finiteNumber(root.delay) &&
            root.delay >= 0 &&
            finiteNumber(root.J)
        )
    : [];
}

function byRootKey(roots) {
  const groups = new Map();
  for (const root of roots) {
    const key = rootKey(root);
    const group = groups.get(key) ?? [];
    group.push(root);
    groups.set(key, group);
  }
  return groups;
}

function sortedRootGroup(group, period) {
  return [...group].sort((left, right) => modulo(left.t, period) - modulo(right.t, period));
}

function uniqueBucketTimes(roots, period) {
  return [...new Set(roots.map((root) => modulo(root.t, period).toPrecision(12)))]
    .map(Number)
    .sort((left, right) => left - right);
}

function uniformBucketPacket(roots, period, tolerance) {
  const times = uniqueBucketTimes(roots, period);
  if (!finiteNumber(period) || period <= 0 || times.length < 2) {
    return {
      ok: false,
      status: "blocked_phase_origin_bucket_grid_missing",
      failure_code: "phase-origin-bucket-grid-missing",
      bucket_count: times.length,
    };
  }
  const spacing = period / times.length;
  let maxSpacingResidual = 0;
  for (let index = 0; index < times.length; index += 1) {
    const next = index + 1 < times.length ? times[index + 1] : times[0] + period;
    maxSpacingResidual = Math.max(maxSpacingResidual, Math.abs(next - times[index] - spacing));
  }
  const ok = maxSpacingResidual <= tolerance * Math.max(1, Math.abs(period));
  return {
    ok,
    status: ok ? "phase_origin_bucket_grid_ready" : "blocked_phase_origin_bucket_grid_nonuniform",
    failure_code: ok ? null : "phase-origin-bucket-grid-nonuniform",
    bucket_count: times.length,
    bucket_spacing: spacing,
    max_bucket_spacing_residual: maxSpacingResidual,
  };
}

function shiftedRoots(roots, period, shiftTime) {
  return roots.map((root) => ({
    ...root,
    source_phase_t: modulo(root.t, period),
    t: modulo(root.t + shiftTime, period),
  }));
}

function rootTransportTheta(root, period) {
  if (!finiteNumber(period) || period <= 0) {
    return null;
  }
  const sourcePhaseTime = finiteNumber(root.source_phase_t) ? root.source_phase_t : root.t;
  return modulo((2 * Math.PI * (sourcePhaseTime - root.delay)) / period, 2 * Math.PI);
}

function rootTransportPhase(root, period) {
  return (2 * Math.PI * modulo(root.t, period)) / period;
}

function finiteLog(value) {
  const magnitude = Math.abs(value);
  return finiteNumber(magnitude) && magnitude > 0 ? Math.log(magnitude) : null;
}

function cyclicNeighbor(group, index, offset) {
  return group[(index + offset + group.length) % group.length];
}

function cyclicNeighborPhase(group, index, offset, period) {
  const phase = rootTransportPhase(cyclicNeighbor(group, index, offset), period);
  const current = rootTransportPhase(group[index], period);
  if (offset > 0 && phase <= current) {
    return phase + 2 * Math.PI;
  }
  if (offset < 0 && phase >= current) {
    return phase - 2 * Math.PI;
  }
  return phase;
}

function cyclicLogDerivative(group, index, period, valueFor) {
  if (group.length < 3) {
    return null;
  }
  const previous = cyclicNeighbor(group, index, -1);
  const next = cyclicNeighbor(group, index, 1);
  const previousLog = finiteLog(valueFor(previous));
  const nextLog = finiteLog(valueFor(next));
  const previousPhase = cyclicNeighborPhase(group, index, -1, period);
  const nextPhase = cyclicNeighborPhase(group, index, 1, period);
  const denominator = nextPhase - previousPhase;
  if (
    !finiteNumber(previousLog) ||
    !finiteNumber(nextLog) ||
    !finiteNumber(denominator) ||
    denominator <= Number.EPSILON
  ) {
    return null;
  }
  return (nextLog - previousLog) / denominator;
}

function circularDistance(a, b, period) {
  const raw = Math.abs(a - b);
  return Math.min(raw, Math.abs(period - raw));
}

function rootBucketSpacing(roots, period) {
  const times = uniqueBucketTimes(roots, period);
  if (times.length < 2) {
    return null;
  }
  let minGap = Number.POSITIVE_INFINITY;
  for (let index = 0; index < times.length; index += 1) {
    const next = index + 1 < times.length ? times[index + 1] : times[0] + period;
    const gap = next - times[index];
    if (gap > Number.EPSILON) {
      minGap = Math.min(minGap, gap);
    }
  }
  return Number.isFinite(minGap) ? minGap : null;
}

function cyclicNeighborGap(group, index, period, denominator) {
  if (group.length < 2 || !finiteNumber(denominator) || denominator <= 0) {
    return null;
  }
  const current = group[index];
  const previous = cyclicNeighbor(group, index, -1);
  const next = cyclicNeighbor(group, index, 1);
  const gap = Math.min(
    circularDistance(modulo(current.t, period), modulo(previous.t, period), period),
    circularDistance(modulo(current.t, period), modulo(next.t, period), period)
  );
  return finiteNumber(gap) ? gap / denominator : null;
}

function lockedKeys(row) {
  return new Set(row?.residual_ledgers?.trajectory?.diagnostics?.locked_self_root_keys ?? []);
}

function rootTransportSourceRecord(row, roots, args, variantPacket) {
  const period = row.period;
  const groups = byRootKey(roots);
  const bucketSpacing = rootBucketSpacing(roots, period);
  const gapDenominator = Math.max(finiteNumber(bucketSpacing) ? bucketSpacing : 0, Number.EPSILON);
  const locked = lockedKeys(row);
  const transportRoots = [];
  for (const [key, group] of groups.entries()) {
    const sorted = sortedRootGroup(group, period);
    for (let index = 0; index < sorted.length; index += 1) {
      const root = sorted[index];
      const theta = rootTransportTheta(root, period);
      const dTau = cyclicLogDerivative(sorted, index, period, (entry) => entry.delay);
      const dJ = cyclicLogDerivative(sorted, index, period, (entry) => entry.J);
      const gap = cyclicNeighborGap(sorted, index, period, gapDenominator);
      if (!finiteNumber(theta) || !finiteNumber(dTau) || !finiteNumber(dJ) || !finiteNumber(gap)) {
        continue;
      }
      const transportSlot = transportRoots.length;
      transportRoots.push({
        root_key: key,
        receiver: root.receiver,
        source: root.source,
        relation: root.relation,
        status: root.status,
        t: modulo(root.t, period),
        source_phase_t: finiteNumber(root.source_phase_t) ? root.source_phase_t : modulo(root.t, period),
        theta,
        D_tau: dTau,
        D_J: dJ,
        G_r: gap,
        transport_id: `phase_origin_variant_root_transport:${args.phaseShiftBuckets}:${transportSlot}`,
        transport_identity_components: {
          root_key: key,
          cyclic_slot: index,
          same_key_root_count: sorted.length,
        },
        transport_identity_status: "single_artifact_not_refinement_stable",
        locked_fold_layer_key: locked.has(key),
      });
    }
  }
  return {
    schema: SOURCE_SCHEMA,
    source: "active_causal_root_ledger",
    coordinate_family: "I_receiver_inter_layer_J_delay_shear",
    period,
    root_count: transportRoots.length,
    active_root_count: roots.length,
    bucket_spacing: bucketSpacing,
    gap_normalizer: gapDenominator,
    gap_source: "nearest_same-key_active_root_time_gap",
    default_root_transport_quotient: "source_layer_shear",
    declared_root_transport_quotients: ["source_layer_shear"],
    transport_identity_schema: ROOT_TRANSPORT_IDENTITY_SCHEMA,
    transport_identity_scope: "single_artifact_cyclic_root_slot",
    transport_identity_rule:
      "transport_id is a non-semantic local slot scoped to this emitted artifact; transport_identity_components expose the root key and cyclic slot for audit only.",
    transport_identity_refinement_stable: false,
    phase_origin_covariance_schema: ROOT_TRANSPORT_PHASE_COVARIANCE_SCHEMA,
    phase_origin_covariance_status: "single-artifact-phase-origin-not-certified",
    phase_origin_covariance_certified: false,
    phase_origin_tested_offsets: [0, args.phaseShiftBuckets],
    phase_origin_covariance_rule:
      "This sidecar recomputes from active_causal_root_ledger under a declared cyclic observation-bucket shift; a separate certificate must compare quotient features after cyclic reindexing.",
    phase_origin_rule:
      "t is the declared shifted observation-bucket coordinate; source_phase_t preserves the raw active-root observation phase used to recompute theta=2*pi*(source_phase_t-delay)/T mod 2*pi.",
    equality_group_key:
      "receiver + source + relation + status + declared quotient + phase origin + single-artifact transport slot",
    locked_fold_layer_keys_excluded: true,
    locked_fold_layer_keys_exclusion_rule: "locked roots remain tagged in the source record but are excluded from checker feature rows.",
    benchmark_inputs_excluded: true,
    root_transport_certified: false,
    transport_certification_status: "single-artifact-source-record-only",
    phase_origin_variant: variantPacket,
    roots: transportRoots,
  };
}

function blockedRow(row, status, failureCode, missingFields = []) {
  return {
    row: row?.row ?? null,
    schema: ROW_SCHEMA,
    status,
    failure_code: failureCode,
    source_status: row?.status ?? null,
    source_failure_code: row?.failure_code ?? null,
    period: row?.period ?? null,
    branch_chart_source_records: {},
    active_causal_root_ledger: [],
    phase_origin_variant: {
      status,
      failure_code: failureCode,
      missing_fields: missingFields,
    },
    accepted_history_boundary: false,
  };
}

function emitVariantRow(row, args) {
  const missing = [];
  if (row?.schema !== ROW_SCHEMA) {
    missing.push(`rows[].schema=${ROW_SCHEMA}`);
  }
  if (!finiteNumber(row?.period) || row.period <= 0) {
    missing.push("rows[].period");
  }
  const roots = canonicalRoots(row);
  if (roots.length < 2) {
    missing.push("rows[].active_causal_root_ledger[2+]");
  }
  if (missing.length > 0) {
    return blockedRow(row, "blocked_phase_origin_variant_source_missing", "phase-origin-variant-source-missing", missing);
  }
  const bucketPacket = uniformBucketPacket(roots, row.period, args.tolerance);
  if (!bucketPacket.ok) {
    return blockedRow(row, bucketPacket.status, bucketPacket.failure_code, ["uniform active-root observation bucket grid"]);
  }
  const declaredShift = args.phaseShiftBuckets;
  const shiftTime = modulo(declaredShift * bucketPacket.bucket_spacing, row.period);
  const shifted = shiftedRoots(roots, row.period, shiftTime);
  const variantPacket = {
    schema: "a0-root-transport-phase-origin-variant/v1",
    status:
      declaredShift === 0
        ? "phase_origin_reference_source_record_emitted"
        : "phase_origin_variant_source_record_emitted",
    failure_code: null,
    variant_kind: declaredShift === 0 ? "reference_reemission_from_active_root_ledger" : "declared_phase_origin_bucket_shift",
    declared_phase_shift_buckets: declaredShift,
    source_bucket_count: bucketPacket.bucket_count,
    source_bucket_spacing: bucketPacket.bucket_spacing,
    shift_time: shiftTime,
    source_record_recomputed_from: "active_causal_root_ledger",
    existing_root_transport_source_record_used: false,
    accepted_history_boundary: false,
    rerun_authority: "phase_origin_variant_certificate_input_only_not_corrected_rerun_authority",
  };
  return {
    row: row.row,
    schema: ROW_SCHEMA,
    schema_status: "provisional",
    status: "phase_origin_variant_source_record_emitted",
    failure_code: null,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    period: row.period,
    source_row: row.source_row ?? null,
    selected_weak_tier_layers: row.selected_weak_tier_layers ?? ["I", "M", "O"],
    active_causal_root_ledger: shifted,
    branch_chart_source_records: {
      root_transport_source_record: rootTransportSourceRecord(row, shifted, args, variantPacket),
    },
    phase_origin_variant: variantPacket,
    validation: {
      ...(row.validation ?? {}),
      root_ledger_stable_under_refinement: false,
      phase_origin_covariance_certified: false,
    },
    accepted_history_boundary: false,
    nonfit_statement:
      "This phase-origin variant was recomputed from the active causal-root ledger only; no benchmark observable or fitted branch residual was used.",
  };
}

function statusCounts(rows) {
  const counts = {};
  for (const row of rows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }
  return counts;
}

function artifactStatus(rows) {
  if (rows.length === 0) {
    return "blocked_phase_origin_variant_no_rows";
  }
  if (rows.some((row) => row.failure_code)) {
    return "blocked_phase_origin_variant";
  }
  return "phase_origin_variant_source_record_emitted";
}

function run(sourceArtifact, sourcePath, args) {
  const rows = selectRows(sourceArtifact, args.rows).map((row) => emitVariantRow(row, args));
  return {
    artifact_schema: ATTEMPT_SCHEMA,
    metadata: {
      artifact: "a0-root-transport-phase-origin-variant",
      schema_status: "provisional",
      status: artifactStatus(rows),
      generatedAt: new Date().toISOString(),
      sourceArtifact: path.relative(process.cwd(), sourcePath),
      sourceArtifactSchema: sourceArtifact?.artifact_schema ?? null,
      rowSelector: args.rows,
      phaseShiftBuckets: args.phaseShiftBuckets,
      note:
        "Sidecar source-record variant for root-transport phase-origin covariance. This artifact is certificate input only and does not authorize corrected rerun or accepted history.",
    },
    source_attempt_metadata: sourceArtifact?.metadata ?? null,
    selected_row_count: rows.length,
    summary: {
      status_counts: statusCounts(rows),
      accepted_history_row_count: 0,
      corrected_rerun_authorized: false,
      accepted_history_boundary: false,
    },
    accepted_history_boundary: false,
    rerun_authority: "phase_origin_variant_certificate_input_only_not_corrected_rerun_authority",
    rows,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  requirePhaseShift(args);
  const sourcePath = requireSourcePath(args);
  const sourceArtifact = readJson(sourcePath);
  writeJson(args, run(sourceArtifact, sourcePath, args));
}

main();
