#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROWS = "ready";
const ACCEPTED_HISTORY_STATUS = "accepted_history_segment";
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const POLARITIES = ["+", "-"];
const SOURCE_TIME_COVERAGE_EPSILON_FACTOR = 16;
const ACCEPTED_CONTINUATION_STATUSES = new Set([
  "accepted_tier1_continuation",
  "tier1_continuation_accepted",
  ACCEPTED_HISTORY_STATUS,
]);
const REQUIRED_DECLARED_VALIDATION_FLAGS = [
  "root_ledger_stable_under_refinement",
  "residuals_below_tolerance",
  "speed_ordering_retained",
  "no_secular_center_drift",
  "Delta_k_positive",
  "same_branch_persists_across_eta_ladder",
  "benchmark_inputs_excluded",
];
const REQUIRED_VALIDATION_BOOLEAN_FIELDS = [
  "status_is_accepted_history_segment",
  "source_row_identity_matches",
  "sample_count_at_least_two",
  "samples_ordered_by_t",
  "samples_cover_cycle",
  "samples_cover_all_delayed_source_times",
  "all_required_body_states_present",
  "body_state_vectors_finite",
  "active_root_labels_valid",
  "active_root_delays_finite_nonnegative",
  "active_root_J_finite",
  ...REQUIRED_DECLARED_VALIDATION_FLAGS,
];

function parseArgs(argv) {
  const args = {
    tier0: null,
    continuation: null,
    rows: DEFAULT_ROWS,
    pretty: false,
    out: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--tier0") {
      args.tier0 = argv[++i];
    } else if (arg === "--continuation") {
      args.continuation = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier1-accepted-history-writer.mjs --tier0 PATH [options]

Options:
  --tier0 PATH          Tier 0 JSON output from a0-tier0-branch-search.mjs.
  --continuation PATH   Accepted Tier 1 continuation source with samples and active roots.
  --rows VALUE          "ready", "all", or a comma-separated row list. Defaults to "ready".
  --out PATH            Write JSON output to a file instead of stdout.
  --pretty              Pretty-print JSON.
  --help                Show this help.

This writer emits the a0-tier1-accepted-history-segments/v1 artifact consumed by
the weak-retained emitter prototype. It does not integrate Tier 1 dynamics. When
no accepted continuation source is supplied, it emits blocked rows with the exact
missing-source failure instead of manufacturing accepted history.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireTier0Path(args) {
  if (!args.tier0) {
    throw new Error("Missing required --tier0 PATH argument.");
  }
  return path.resolve(args.tier0);
}

function selectRows(tier0, selector) {
  const candidates = Array.isArray(tier0.candidates) ? tier0.candidates : [];
  if (selector === "all") {
    return candidates;
  }
  if (selector === "ready") {
    return candidates.filter((row) => row.status === "tier0_continuation_ready");
  }
  const selected = new Set(
    String(selector)
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isInteger(entry))
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return candidates.filter((row) => selected.has(row.row));
}

function continuationSegments(source) {
  if (!source) {
    return [];
  }
  if (Array.isArray(source.rows)) {
    return source.rows;
  }
  if (Array.isArray(source.segments)) {
    return source.segments;
  }
  if (Array.isArray(source.history_segments)) {
    return source.history_segments;
  }
  if (Array.isArray(source.continuation_segments)) {
    return source.continuation_segments;
  }
  if (Object.hasOwn(source, "row")) {
    return [source];
  }
  return [];
}

function continuationSegmentMap(source) {
  return new Map(
    continuationSegments(source)
      .filter((segment) => Number.isInteger(segment.row))
      .map((segment) => [segment.row, segment])
  );
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every((entry) => Number.isFinite(entry));
}

function stableJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableJson(entry)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function sourceRowDiagnostics(segment, row) {
  const sourceRow = segment?.source_row ?? segment?.sourceRow ?? {};
  const sourceBranchLabel = sourceRow.branch_label ?? segment?.branch_label ?? null;
  const sourceZLambda = sourceRow.z_lambda ?? segment?.z_lambda ?? null;
  return {
    row_matches: segment?.row === row.row,
    branch_label_present: sourceBranchLabel !== null,
    z_lambda_present: sourceZLambda !== null,
    branch_label_matches: stableJson(sourceBranchLabel) === stableJson(row.branch_label ?? null),
    z_lambda_matches: stableJson(sourceZLambda) === stableJson(row.z_lambda ?? null),
  };
}

function normalizeVector3(value) {
  return Array.isArray(value) ? value.map((entry) => Number(entry)) : value;
}

function sampleBodyState(sample, bodyId) {
  const bodies = sample.bodies ?? sample.state ?? sample.states ?? null;
  if (!bodies) {
    return null;
  }
  if (Array.isArray(bodies)) {
    return bodies.find((body) => body.id === bodyId) ?? null;
  }
  return bodies[bodyId] ?? null;
}

function rawSamples(segment) {
  return [...(segment?.samples ?? segment?.history ?? [])].map((sample) => ({
    ...sample,
    t: Number.isFinite(sample.t) ? sample.t : sample.time,
  }));
}

function canonicalSamples(segment) {
  return rawSamples(segment)
    .filter((sample) => Number.isFinite(sample.t))
    .map((sample) => ({
      t: sample.t,
      bodies: Object.fromEntries(
        BODY_IDS.map((bodyId) => {
          const state = sampleBodyState(sample, bodyId) ?? {};
          return [
            bodyId,
            {
              position: normalizeVector3(state.position),
              velocity: normalizeVector3(state.velocity),
            },
          ];
        })
      ),
    }))
    .sort((a, b) => a.t - b.t);
}

function sampleTimeDiagnostics(segment) {
  const samples = rawSamples(segment);
  let finiteSampleCount = 0;
  let invalidTimeCount = 0;
  let ordered = true;
  let priorTime = null;
  for (const sample of samples) {
    if (!Number.isFinite(sample.t)) {
      invalidTimeCount += 1;
      continue;
    }
    finiteSampleCount += 1;
    if (priorTime !== null && sample.t < priorTime) {
      ordered = false;
    }
    priorTime = sample.t;
  }
  return {
    raw_sample_count: samples.length,
    finite_sample_count: finiteSampleCount,
    invalid_time_count: invalidTimeCount,
    sample_count_at_least_two: finiteSampleCount >= 2,
    samples_ordered_by_t: ordered,
    sample_times_finite: invalidTimeCount === 0,
  };
}

function bodyStateDiagnostics(segment) {
  const samples = rawSamples(segment).filter((sample) => Number.isFinite(sample.t));
  let missingStateCount = 0;
  let invalidVectorCount = 0;
  const invalidExamples = [];
  for (const sample of samples) {
    for (const bodyId of BODY_IDS) {
      const state = sampleBodyState(sample, bodyId);
      if (!state) {
        missingStateCount += 1;
        invalidExamples.push({ t: sample.t, body: bodyId, reason: "missing" });
        continue;
      }
      if (!finiteVector3(state.position) || !finiteVector3(state.velocity)) {
        invalidVectorCount += 1;
        invalidExamples.push({ t: sample.t, body: bodyId, reason: "nonfinite-vector" });
      }
    }
  }
  return {
    missing_state_count: missingStateCount,
    invalid_vector_count: invalidVectorCount,
    invalid_examples: invalidExamples.slice(0, 20),
    all_required_body_states_present: missingStateCount === 0,
    body_state_vectors_finite: invalidVectorCount === 0,
  };
}

function rawRoots(segment) {
  const roots =
    segment?.active_causal_root_ledger ??
    segment?.active_roots ??
    segment?.root_ledger?.active_roots ??
    segment?.root_ledger?.roots ??
    [];
  return Array.isArray(roots) ? roots : [];
}

function canonicalRoots(segment) {
  return rawRoots(segment).map((root) => ({
    source: root.source ?? null,
    receiver: root.receiver ?? null,
    relation: root.relation ?? null,
    delay: Number(root.delay ?? root.tau ?? root.root_delay),
    J: Number(root.J),
    status: root.status ?? null,
  }));
}

function rootDiagnostics(segment) {
  const roots = canonicalRoots(segment);
  const invalidRoots = [];
  let maxDelay = 0;
  const relations = new Set();
  for (const root of roots) {
    const valid =
      BODY_IDS.includes(root.source) &&
      BODY_IDS.includes(root.receiver) &&
      ROOT_RELATIONS.includes(root.relation) &&
      root.status === "active" &&
      Number.isFinite(root.delay) &&
      root.delay >= 0 &&
      Number.isFinite(root.J);
    if (Number.isFinite(root.delay) && root.delay >= 0) {
      maxDelay = Math.max(maxDelay, root.delay);
    }
    if (root.status === "active" && ROOT_RELATIONS.includes(root.relation)) {
      relations.add(root.relation);
    }
    if (!valid) {
      invalidRoots.push(root);
    }
  }
  return {
    root_count: roots.length,
    invalid_root_count: invalidRoots.length,
    invalid_roots: invalidRoots.slice(0, 20),
    max_delay: maxDelay,
    active_root_relations_present: Object.fromEntries(
      ROOT_RELATIONS.map((relation) => [relation, relations.has(relation)])
    ),
    active_root_labels_valid: invalidRoots.every(
      (root) => BODY_IDS.includes(root.source) && BODY_IDS.includes(root.receiver)
    ),
    active_root_delays_finite_nonnegative: invalidRoots.every(
      (root) => Number.isFinite(root.delay) && root.delay >= 0
    ),
    active_root_J_finite: invalidRoots.every((root) => Number.isFinite(root.J)),
  };
}

function selectedWeakTierLayers(row) {
  return row.weak_retained_amplitude_handoff?.tier_selector?.active_layers ?? ["I", "M", "O"];
}

function sourceCoverageDiagnostics(segment, activeLayers) {
  const sourceLabels = new Set(canonicalRoots(segment).map((root) => root.source).filter(Boolean));
  const requiredSources = activeLayers.flatMap((layer) => POLARITIES.map((polarity) => `${layer}${polarity}`));
  const missingSources = requiredSources.filter((source) => !sourceLabels.has(source));
  return {
    required_sources: requiredSources,
    missing_sources: missingSources,
    active_root_sources_cover_selected_layers: missingSources.length === 0,
  };
}

function coverageDiagnostics(segment, row) {
  const samples = canonicalSamples(segment);
  const roots = rootDiagnostics(segment);
  const period = segment?.period ?? row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const minSampleTime = samples.length > 0 ? samples[0].t : null;
  const maxSampleTime = samples.length > 0 ? samples[samples.length - 1].t : null;
  const maxRequiredDelay = Math.max(roots.max_delay, row.root_ledger?.maxDelay ?? 0);
  const requiredStart = -maxRequiredDelay;
  const coverageTolerance = sourceTimeCoverageTolerance(period, maxRequiredDelay);
  return {
    min_sample_time: minSampleTime,
    max_sample_time: maxSampleTime,
    required_start: requiredStart,
    required_end: period,
    max_active_root_delay: maxRequiredDelay,
    coverage_tolerance: coverageTolerance,
    cycle_start_deficit: lowerEndpointDeficit(minSampleTime, 0),
    delayed_source_start_deficit: lowerEndpointDeficit(minSampleTime, requiredStart),
    end_deficit: upperEndpointDeficit(maxSampleTime, period),
    samples_cover_cycle:
      Number.isFinite(minSampleTime) &&
      Number.isFinite(maxSampleTime) &&
      Number.isFinite(period) &&
      minSampleTime <= coverageTolerance &&
      maxSampleTime + coverageTolerance >= period,
    samples_cover_all_delayed_source_times:
      Number.isFinite(minSampleTime) &&
      Number.isFinite(maxSampleTime) &&
      Number.isFinite(period) &&
      minSampleTime <= requiredStart + coverageTolerance &&
      maxSampleTime + coverageTolerance >= period,
  };
}

function sourceTimeCoverageTolerance(period, maxDelay) {
  const scale = Math.max(
    1,
    Number.isFinite(period) ? Math.abs(period) : 0,
    Number.isFinite(maxDelay) ? Math.abs(maxDelay) : 0
  );
  return SOURCE_TIME_COVERAGE_EPSILON_FACTOR * Number.EPSILON * scale;
}

function lowerEndpointDeficit(sampleTime, requiredTime) {
  if (!Number.isFinite(sampleTime) || !Number.isFinite(requiredTime)) {
    return null;
  }
  return Math.max(0, sampleTime - requiredTime);
}

function upperEndpointDeficit(sampleTime, requiredTime) {
  if (!Number.isFinite(sampleTime) || !Number.isFinite(requiredTime)) {
    return null;
  }
  return Math.max(0, requiredTime - sampleTime);
}

function declaredValidation(segment, field) {
  return segment?.validation?.[field] === true;
}

function validationFlags(segment, row) {
  const sampleTimes = sampleTimeDiagnostics(segment);
  const bodyStates = bodyStateDiagnostics(segment);
  const roots = rootDiagnostics(segment);
  const coverage = coverageDiagnostics(segment, row);
  const sourceCoverage = sourceCoverageDiagnostics(segment, selectedWeakTierLayers(row));
  const sourceRow = sourceRowDiagnostics(segment, row);
  const declaredFlags = Object.fromEntries(
    REQUIRED_DECLARED_VALIDATION_FLAGS.map((field) => [field, declaredValidation(segment, field)])
  );
  return {
    status_is_accepted_history_segment: ACCEPTED_CONTINUATION_STATUSES.has(segment?.status),
    source_row_identity_matches:
      sourceRow.row_matches &&
      sourceRow.branch_label_present &&
      sourceRow.z_lambda_present &&
      sourceRow.branch_label_matches &&
      sourceRow.z_lambda_matches,
    sample_count_at_least_two: sampleTimes.sample_count_at_least_two,
    samples_ordered_by_t: sampleTimes.samples_ordered_by_t,
    samples_cover_cycle: coverage.samples_cover_cycle,
    samples_cover_all_delayed_source_times: coverage.samples_cover_all_delayed_source_times,
    all_required_body_states_present: bodyStates.all_required_body_states_present,
    body_state_vectors_finite: bodyStates.body_state_vectors_finite,
    active_root_labels_valid: roots.invalid_root_count === 0,
    active_root_delays_finite_nonnegative: roots.invalid_root_count === 0,
    active_root_J_finite: roots.invalid_root_count === 0,
    ...declaredFlags,
    active_root_relations_present: roots.active_root_relations_present,
    active_root_sources_cover_selected_layers: sourceCoverage,
    diagnostics: {
      sample_times: sampleTimes,
      source_row: sourceRow,
      body_states: bodyStates,
      roots,
      coverage,
    },
  };
}

function validationPasses(validation) {
  const booleansPass = REQUIRED_VALIDATION_BOOLEAN_FIELDS.every((field) => validation[field] === true);
  const relationsPass = ROOT_RELATIONS.every((relation) => validation.active_root_relations_present?.[relation] === true);
  const sourceCoveragePass =
    validation.active_root_sources_cover_selected_layers?.active_root_sources_cover_selected_layers === true;
  return booleansPass && relationsPass && sourceCoveragePass;
}

function missingValidationFields(validation) {
  const missing = [];
  for (const field of REQUIRED_VALIDATION_BOOLEAN_FIELDS) {
    if (validation[field] !== true) {
      missing.push(field);
    }
  }
  for (const relation of ROOT_RELATIONS) {
    if (validation.active_root_relations_present?.[relation] !== true) {
      missing.push(`active_root_relations_present.${relation}`);
    }
  }
  if (validation.active_root_sources_cover_selected_layers?.active_root_sources_cover_selected_layers !== true) {
    missing.push("active_root_sources_cover_selected_layers");
  }
  return missing;
}

function blockedRow(row, reason, failureCode) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  return {
    row: row.row,
    schema: "a0-tier1-accepted-history-segment/v1",
    schema_status: "provisional",
    status: reason,
    failure_code: failureCode,
    period,
    history_window: null,
    source_row: {
      branch_label: row.branch_label ?? null,
      z_lambda: row.z_lambda ?? null,
    },
    selected_weak_tier_layers: selectedWeakTierLayers(row),
    samples: [],
    active_causal_root_ledger: [],
    validation: {
      status_is_accepted_history_segment: false,
      missing_validation_fields: ["accepted_tier1_continuation_source"],
    },
    acceptance: {
      status: "blocked",
      reason,
      failure_code: failureCode,
    },
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to emit this blocked accepted-history row.",
  };
}

function acceptedHistoryRow(row, segment) {
  if (!segment) {
    return blockedRow(
      row,
      "blocked_missing_tier1_continuation_source",
      "accepted-history-source-missing"
    );
  }
  const validation = validationFlags(segment, row);
  const accepted = validationPasses(validation);
  const samples = canonicalSamples(segment);
  const coverage = validation.diagnostics.coverage;
  const blockedFailureCode = segment.failure_code ?? "accepted-history-validation-incomplete";
  return {
    row: row.row,
    schema: "a0-tier1-accepted-history-segment/v1",
    schema_status: "provisional",
    status: accepted ? ACCEPTED_HISTORY_STATUS : "blocked_tier1_acceptance_incomplete",
    failure_code: accepted ? null : blockedFailureCode,
    period: segment.period ?? row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null,
    history_window: {
      start: coverage.min_sample_time,
      end: coverage.max_sample_time,
      required_start: coverage.required_start,
      required_end: coverage.required_end,
      max_active_root_delay: coverage.max_active_root_delay,
    },
    source_row: {
      branch_label: row.branch_label ?? null,
      z_lambda: row.z_lambda ?? null,
    },
    selected_weak_tier_layers: selectedWeakTierLayers(row),
    samples,
    active_causal_root_ledger: canonicalRoots(segment),
    validation: {
      ...validation,
      missing_validation_fields: missingValidationFields(validation),
      source_status: segment.status ?? null,
    },
    acceptance: {
      status: accepted ? "accepted" : "blocked",
      reason: accepted ? "accepted-history-segment-emitted" : "tier1-acceptance-incomplete",
      failure_code: accepted ? null : blockedFailureCode,
    },
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to emit this accepted-history row.",
  };
}

function artifactStatus(rows) {
  if (rows.length === 0) {
    return "blocked";
  }
  const acceptedCount = rows.filter((row) => row.status === ACCEPTED_HISTORY_STATUS).length;
  if (acceptedCount === rows.length) {
    return "accepted-history-segments-emitted";
  }
  if (acceptedCount === 0) {
    return "blocked";
  }
  return "partial";
}

function run(tier0, tier0Path, continuation, continuationPath, args) {
  const rows = selectRows(tier0, args.rows);
  const segmentsByRow = continuationSegmentMap(continuation);
  const emittedRows = rows.map((row) => acceptedHistoryRow(row, segmentsByRow.get(row.row) ?? null));
  return {
    artifact_schema: "a0-tier1-accepted-history-segments/v1",
    metadata: {
      artifact: "a0-tier1-accepted-history-writer",
      schema: "a0-tier1-accepted-history-segments/v1",
      schema_status: "provisional",
      status: artifactStatus(emittedRows),
      generatedAt: new Date().toISOString(),
      sourceTier0: path.relative(process.cwd(), tier0Path),
      sourceContinuation: continuationPath ? path.relative(process.cwd(), continuationPath) : null,
      rowSelector: args.rows,
      note:
        "This artifact canonicalizes accepted Tier 1 continuation history for weak-retained reconstruction; it blocks rows when accepted continuation data are absent or validation is incomplete.",
    },
    source_tier0_metadata: tier0.metadata ?? null,
    source_continuation_metadata: continuation?.metadata ?? null,
    selected_row_count: rows.length,
    accepted_row_count: emittedRows.filter((row) => row.status === ACCEPTED_HISTORY_STATUS).length,
    rows: emittedRows,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const tier0Path = requireTier0Path(args);
  const continuationPath = args.continuation ? path.resolve(args.continuation) : null;
  const tier0 = readJson(tier0Path);
  const continuation = continuationPath ? readJson(continuationPath) : null;
  const output = run(tier0, tier0Path, continuation, continuationPath, args);
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
