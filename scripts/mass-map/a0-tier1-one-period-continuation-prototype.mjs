#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_MAX_ESTIMATED_STEPS = 1_000_000;
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const POLARITIES = ["+", "-"];
const SOURCE_TIME_COVERAGE_EPSILON_FACTOR = 16;
const ACCEPTED_HISTORY_BLOCKERS = [
  "status_is_accepted_history_segment",
  "residuals_below_tolerance",
  "no_secular_center_drift",
  "Delta_k_positive",
  "same_branch_persists_across_eta_ladder",
];
const ACCEPTED_HISTORY_SOURCE_COVERAGE_FIELDS = [
  "source_row_present",
  "sample_count_at_least_two",
  "samples_ordered_by_t",
  "samples_cover_cycle",
  "samples_cover_all_delayed_source_times",
  "all_required_body_states_present",
  "body_state_vectors_finite",
  "active_root_labels_valid",
  "active_root_delays_finite_nonnegative",
  "active_root_J_finite",
  "root_ledger_stable_under_refinement",
  "speed_ordering_retained",
  "benchmark_inputs_excluded",
  "active_root_sources_cover_selected_layers",
];

function parseArgs(argv) {
  const args = {
    source: null,
    rows: "all",
    maxEstimatedSteps: DEFAULT_MAX_ESTIMATED_STEPS,
    pretty: false,
    out: null,
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
    } else if (arg === "--max-estimated-steps") {
      args.maxEstimatedSteps = parsePositiveInteger(argv[++i], "--max-estimated-steps");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-one-period-continuation-prototype.mjs --source PATH [options]

Options:
  --source PATH              Continuation-source prototype JSON with direct-root horizon diagnostics.
  --rows VALUE               "all" or a comma-separated row list. Defaults to "all".
  --max-estimated-steps N    Step-count cap for a one-period attempt. Defaults to ${DEFAULT_MAX_ESTIMATED_STEPS}.
  --out PATH                 Write JSON output to a file instead of stdout.
  --pretty                   Pretty-print JSON.
  --help                     Show this help.

This is a fail-closed one-period continuation intake prototype. It does not run
the full one-period delayed dynamics and does not compute Delta_k. It consumes
short-horizon direct-root diagnostics, carries fold-layer routing forward, and
reports whether a direct or fold-layer-locked one-period attempt is
computationally and structurally ready.`);
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireSourcePath(args) {
  if (!args.source) {
    throw new Error("Missing required --source PATH argument.");
  }
  return path.resolve(args.source);
}

function selectRows(artifact, selector) {
  const rows = Array.isArray(artifact.rows) ? artifact.rows : [];
  if (selector === "all") {
    return rows;
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
  return rows.filter((row) => selected.has(row.row));
}

function directRootHorizonLadder(row) {
  return row.diagnostics?.direct_root_horizon_ladder ?? null;
}

function directRootStepFractionController(row) {
  return row.diagnostics?.direct_root_step_fraction_controller ?? null;
}

function directRootFoldLayerLock(row) {
  return row.diagnostics?.direct_root_fold_layer_lock ?? null;
}

function directRootFoldLayerLockedIntegratorSeed(row) {
  return row.diagnostics?.direct_root_fold_layer_locked_integrator_seed ?? null;
}

function bestBoundedEntry(ladder) {
  const entries = Array.isArray(ladder?.entries) ? ladder.entries : [];
  const bounded = entries.filter(
    (entry) => entry.dynamically_bounded === true && Number.isFinite(entry.horizon_period_fraction)
  );
  return bounded.reduce(
    (best, entry) =>
      !best || entry.horizon_period_fraction > best.horizon_period_fraction ? entry : best,
    null
  );
}

function firstSurplusEntry(ladder) {
  const entries = Array.isArray(ladder?.entries) ? ladder.entries : [];
  return (
    entries.find((entry) => {
      const step = entry.branch_retention?.first_branch_surplus_step;
      return step !== null && step !== undefined;
    }) ?? null
  );
}

function estimateOnePeriodSteps(entry) {
  if (!entry || !Number.isFinite(entry.horizon_period_fraction) || entry.horizon_period_fraction <= 0) {
    return null;
  }
  const requestedSteps = entry.requested_steps ?? entry.completed_steps;
  if (!Number.isFinite(requestedSteps) || requestedSteps <= 0) {
    return null;
  }
  return Math.ceil(requestedSteps / entry.horizon_period_fraction);
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every((entry) => Number.isFinite(entry));
}

function normalizeVector3(value) {
  return Array.isArray(value) ? value.map((entry) => Number(entry)) : null;
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

function rawSamples(row) {
  const samples = row?.samples ?? row?.history ?? [];
  if (!Array.isArray(samples)) {
    return [];
  }
  return samples.map((sample) => ({
    ...sample,
    t: Number.isFinite(sample.t) ? sample.t : sample.time,
  }));
}

function canonicalSamples(row) {
  return rawSamples(row)
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

function sampleTimeDiagnostics(row) {
  const samples = rawSamples(row);
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

function bodyStateDiagnostics(row) {
  const samples = rawSamples(row).filter((sample) => Number.isFinite(sample.t));
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

function rawRoots(row) {
  const roots =
    row?.active_causal_root_ledger ??
    row?.active_roots ??
    row?.root_ledger?.active_roots ??
    row?.root_ledger?.roots ??
    [];
  return Array.isArray(roots) ? roots : [];
}

function canonicalRoots(row) {
  return rawRoots(row).map((root) => ({
    source: root.source ?? null,
    receiver: root.receiver ?? null,
    relation: root.relation ?? null,
    delay: Number(root.delay ?? root.tau ?? root.root_delay),
    J: Number(root.J),
    status: root.status ?? null,
  }));
}

function rootDiagnostics(row) {
  const roots = canonicalRoots(row);
  const invalidRoots = [];
  let maxDelay = 0;
  const relations = new Set();
  let invalidLabelCount = 0;
  let invalidDelayCount = 0;
  let invalidJCount = 0;
  for (const root of roots) {
    const labelsValid = BODY_IDS.includes(root.source) && BODY_IDS.includes(root.receiver);
    const relationValid = ROOT_RELATIONS.includes(root.relation);
    const delayValid = Number.isFinite(root.delay) && root.delay >= 0;
    const jValid = Number.isFinite(root.J);
    const statusValid = root.status === "active";
    if (delayValid) {
      maxDelay = Math.max(maxDelay, root.delay);
    }
    if (statusValid && relationValid) {
      relations.add(root.relation);
    }
    if (!labelsValid) {
      invalidLabelCount += 1;
    }
    if (!delayValid) {
      invalidDelayCount += 1;
    }
    if (!jValid) {
      invalidJCount += 1;
    }
    if (!(labelsValid && relationValid && delayValid && jValid && statusValid)) {
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
    active_root_labels_valid: invalidLabelCount === 0,
    active_root_delays_finite_nonnegative: invalidDelayCount === 0,
    active_root_J_finite: invalidJCount === 0,
  };
}

function selectedWeakTierLayers(row) {
  return (
    row?.selected_weak_tier_layers ??
    row?.weak_retained_amplitude_handoff?.tier_selector?.active_layers ??
    ["I", "M", "O"]
  );
}

function sourceCoverageDiagnostics(row, activeLayers) {
  const sourceLabels = new Set(canonicalRoots(row).map((root) => root.source).filter(Boolean));
  const requiredSources = activeLayers.flatMap((layer) => POLARITIES.map((polarity) => `${layer}${polarity}`));
  const missingSources = requiredSources.filter((source) => !sourceLabels.has(source));
  return {
    required_sources: requiredSources,
    missing_sources: missingSources,
    active_root_sources_cover_selected_layers: missingSources.length === 0,
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

function coverageDiagnostics(row) {
  const samples = canonicalSamples(row);
  const roots = rootDiagnostics(row);
  const period = row?.period ?? null;
  const minSampleTime = samples.length > 0 ? samples[0].t : null;
  const maxSampleTime = samples.length > 0 ? samples[samples.length - 1].t : null;
  const maxRequiredDelay = roots.max_delay;
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

function declaredValidation(row, field) {
  return row?.validation?.[field] === true;
}

function foldLayerLockedValidationPacket(row) {
  const sampleTimes = sampleTimeDiagnostics(row);
  const bodyStates = bodyStateDiagnostics(row);
  const roots = rootDiagnostics(row);
  const coverage = coverageDiagnostics(row);
  const sourceCoverage = sourceCoverageDiagnostics(row, selectedWeakTierLayers(row));
  const validationEffect = {
    status_is_accepted_history_segment: false,
    source_row_present: row?.source_row !== null && row?.source_row !== undefined,
    sample_count_at_least_two: sampleTimes.sample_count_at_least_two,
    samples_ordered_by_t: sampleTimes.samples_ordered_by_t,
    samples_cover_cycle: coverage.samples_cover_cycle,
    samples_cover_all_delayed_source_times: coverage.samples_cover_all_delayed_source_times,
    all_required_body_states_present: bodyStates.all_required_body_states_present,
    body_state_vectors_finite: bodyStates.body_state_vectors_finite,
    active_root_labels_valid: roots.active_root_labels_valid && roots.invalid_root_count === 0,
    active_root_delays_finite_nonnegative:
      roots.active_root_delays_finite_nonnegative && roots.invalid_root_count === 0,
    active_root_J_finite: roots.active_root_J_finite && roots.invalid_root_count === 0,
    root_ledger_stable_under_refinement: declaredValidation(row, "root_ledger_stable_under_refinement"),
    residuals_below_tolerance: false,
    speed_ordering_retained: declaredValidation(row, "speed_ordering_retained"),
    no_secular_center_drift: false,
    Delta_k_positive: false,
    same_branch_persists_across_eta_ladder: false,
    benchmark_inputs_excluded: declaredValidation(row, "benchmark_inputs_excluded"),
    active_root_relations_present: roots.active_root_relations_present,
    active_root_sources_cover_selected_layers: sourceCoverage,
  };
  const missingSourceCoverageFields = ACCEPTED_HISTORY_SOURCE_COVERAGE_FIELDS.filter((field) => {
    if (field === "active_root_sources_cover_selected_layers") {
      return validationEffect.active_root_sources_cover_selected_layers
        ?.active_root_sources_cover_selected_layers !== true;
    }
    return validationEffect[field] !== true;
  });
  const missingRootRelations = ROOT_RELATIONS.filter(
    (relation) => validationEffect.active_root_relations_present?.[relation] !== true
  ).map((relation) => `active_root_relations_present.${relation}`);
  const sourceCoveragePassed =
    missingSourceCoverageFields.length === 0 && missingRootRelations.length === 0;
  return {
    schema: "a0-tier1-fold-layer-locked-validation-packet/v1",
    status: sourceCoveragePassed
      ? "accepted-history-source-coverage-computed"
      : "accepted-history-source-coverage-incomplete",
    source_row_identity_check: {
      status: "deferred_to_accepted_history_writer",
      source_row_present: validationEffect.source_row_present,
      reason:
        "source-row branch-label and z-lambda equality requires the Tier 0 row supplied to the accepted-history writer",
    },
    selected_weak_tier_layers: selectedWeakTierLayers(row),
    accepted_history_source_coverage: {
      status: sourceCoveragePassed ? "passed" : "blocked",
      passed: sourceCoveragePassed,
      missing_fields: [...missingSourceCoverageFields, ...missingRootRelations],
      diagnostics: {
        sample_times: sampleTimes,
        body_states: bodyStates,
        roots,
        coverage,
      },
    },
    residual_closure: {
      status: "not_computed",
      residuals_below_tolerance: false,
      reason: "the fold-layer-locked macro-stride attempt has not integrated a one-period return map",
    },
    center_drift: {
      status: "not_computed",
      no_secular_center_drift: false,
      reason: "center-gauge drift has not been evaluated on a one-period continuation trajectory",
    },
    monodromy: {
      status: "not_computed",
      Delta_k_positive: false,
      reason: "the quotient monodromy operator has not been constructed",
    },
    eta_ladder: {
      status: "not_computed",
      same_branch_persists_across_eta_ladder: false,
      reason: "no eta-ladder continuation has been run from the fold-layer-locked attempt",
    },
    accepted_history_blockers: ACCEPTED_HISTORY_BLOCKERS,
    minimum_uncomputed_predicates: [
      "residuals_below_tolerance",
      "no_secular_center_drift",
      "Delta_k_positive",
      "same_branch_persists_across_eta_ladder",
    ],
    validation_effect: validationEffect,
    next_required_computation:
      "run the fold-layer-locked one-period continuation and compute residual closure, center-gauge drift, quotient monodromy, and eta-ladder branch persistence before accepted-history emission",
  };
}

function foldSplittingProbeEvidence(ladder, fold) {
  const entries = Array.isArray(ladder?.entries) ? ladder.entries : [];
  const requestedStepCounts = entries.map((entry) => entry.requested_steps).filter(Number.isFinite);
  const bestEntry = bestBoundedEntry(ladder);
  const blockedEntries = entries.filter(
    (entry) => entry.status === "direct-root-recomputing-probe-blocked"
  );
  const rootUnavailableEntries = entries.filter(
    (entry) => entry.failure_code === "direct-roots-missing" || entry.warning_code === "direct-roots-missing"
  );
  if (fold) {
    return {
      schema: "self-root-fold-splitting-probe-evidence/v1",
      status: "self-root-fold-splitting-classified",
      requested_step_counts: requestedStepCounts,
      best_bounded_horizon_period_fraction: bestEntry?.horizon_period_fraction ?? null,
      first_branch_loss: ladder?.first_branch_loss ?? null,
      first_branch_surplus: ladder?.first_branch_surplus ?? null,
      next_required_computation:
        "use the classified fold-layer row only as a branch-chart input; one-period residual closure and monodromy are still required",
    };
  }
  if (!ladder || entries.length === 0) {
    return {
      schema: "self-root-fold-splitting-probe-evidence/v1",
      status: "direct-root-horizon-ladder-missing",
      requested_step_counts: requestedStepCounts,
      best_bounded_horizon_period_fraction: null,
      first_branch_loss: null,
      first_branch_surplus: null,
      next_required_computation:
        "emit a direct-root horizon ladder before classifying self-root fold/splitting",
    };
  }
  if (blockedEntries.length === entries.length || rootUnavailableEntries.length === entries.length) {
    return {
      schema: "self-root-fold-splitting-probe-evidence/v1",
      status: "direct-root-probe-unavailable",
      requested_step_counts: requestedStepCounts,
      best_bounded_horizon_period_fraction: bestEntry?.horizon_period_fraction ?? null,
      first_branch_loss: ladder?.first_branch_loss ?? null,
      first_branch_surplus: ladder?.first_branch_surplus ?? null,
      next_required_computation:
        "restore finite carrier-chart state vectors and active direct roots before classifying self-root fold/splitting",
    };
  }
  if (ladder.first_branch_surplus) {
    return {
      schema: "self-root-fold-splitting-probe-evidence/v1",
      status: "self-root-surplus-unclassified",
      requested_step_counts: requestedStepCounts,
      best_bounded_horizon_period_fraction: bestEntry?.horizon_period_fraction ?? null,
      first_branch_loss: ladder.first_branch_loss ?? null,
      first_branch_surplus: ladder.first_branch_surplus,
      next_required_computation:
        "compute the self-root fold/splitting diagnostic from the first_branch_surplus_bracket",
    };
  }
  if (bestEntry) {
    return {
      schema: "self-root-fold-splitting-probe-evidence/v1",
      status: "no-self-root-surplus-observed-in-current-ladder",
      requested_step_counts: requestedStepCounts,
      best_bounded_horizon_period_fraction: bestEntry.horizon_period_fraction,
      first_branch_loss: ladder.first_branch_loss ?? null,
      first_branch_surplus: null,
      next_required_computation:
        "extend the direct-root horizon ladder until the first self-root branch surplus/loss or one period is reached; for the minimal fixture, the known diagnostic rung is --direct-probe-steps 256",
    };
  }
  return {
    schema: "self-root-fold-splitting-probe-evidence/v1",
    status: "bounded-direct-root-horizon-missing",
    requested_step_counts: requestedStepCounts,
    best_bounded_horizon_period_fraction: null,
    first_branch_loss: ladder.first_branch_loss ?? null,
    first_branch_surplus: ladder.first_branch_surplus ?? null,
    next_required_computation:
      "produce at least one dynamically bounded direct-root horizon entry before classifying self-root fold/splitting",
  };
}

function controllerCandidateEntry(candidate) {
  if (!candidate || !Number.isFinite(candidate.estimated_steps_for_one_period)) {
    return null;
  }
  const bestEntry = candidate.best_bounded_entry ?? null;
  if (!bestEntry) {
    return null;
  }
  return {
    requested_steps: bestEntry.requested_steps,
    completed_steps: bestEntry.completed_steps,
    horizon_period_fraction: bestEntry.horizon_period_fraction,
    status: bestEntry.status,
    dynamically_bounded: bestEntry.dynamically_bounded,
    dynamics_step_fraction: candidate.dynamics_step_fraction,
    estimated_steps_for_one_period: candidate.estimated_steps_for_one_period,
  };
}

function foldLayerLockCandidateEntry(foldLayerLock) {
  const candidate = foldLayerLock?.best_candidate ?? null;
  if (
    foldLayerLock?.status !== "direct-root-fold-layer-lock-ready" ||
    !candidate ||
    !Number.isFinite(candidate.estimated_steps_for_one_period)
  ) {
    return null;
  }
  return {
    requested_steps: candidate.first_branch_surplus_step,
    completed_steps: candidate.first_branch_surplus_step,
    horizon_period_fraction: candidate.event_horizon_period_fraction,
    status: foldLayerLock.status,
    dynamically_bounded: false,
    fold_layer_lock_ready: true,
    dynamics_step_fraction: candidate.dynamics_step_fraction,
    estimated_steps_for_one_period: candidate.estimated_steps_for_one_period,
  };
}

function foldLayerLockedIntegratorCandidateEntry(integratorSeed, maxEstimatedSteps) {
  if (
    integratorSeed?.status !== "direct-root-fold-layer-locked-integrator-seed-ready" ||
    !Number.isFinite(integratorSeed.locked_direct_root_step_count) ||
    integratorSeed.locked_direct_root_step_count <= 0 ||
    !Number.isFinite(maxEstimatedSteps) ||
    maxEstimatedSteps <= 0
  ) {
    return null;
  }
  const macroStride = Math.max(1, Math.ceil(integratorSeed.locked_direct_root_step_count / maxEstimatedSteps));
  const estimatedSteps = Math.ceil(integratorSeed.locked_direct_root_step_count / macroStride);
  const capReductionFactor = integratorSeed.locked_direct_root_step_count / estimatedSteps;
  return {
    requested_steps: estimatedSteps,
    completed_steps: 0,
    horizon_period_fraction: 1,
    status: "direct-root-fold-layer-locked-integrator-attempt-planned",
    dynamically_bounded: false,
    fold_layer_locked_integrator_ready: true,
    macro_stride: macroStride,
    cap_reduction_factor: capReductionFactor,
    locked_event_count: integratorSeed.locked_event_count,
    retained_direct_root_steps_per_event: integratorSeed.retained_direct_root_steps_per_event,
    locked_direct_root_step_count: integratorSeed.locked_direct_root_step_count,
    retained_direct_root_step_count: estimatedSteps,
    dynamics_step_fraction: integratorSeed.dynamics_step_fraction,
    estimated_steps_for_one_period: estimatedSteps,
    attempt_formula:
      "N_attempt=ceil(locked_direct_root_step_count/macro_stride); the resulting row is an attempt budget, not an accepted history segment.",
  };
}

function selectedStepBudget(ladder, stepController, foldLayerLock, integratorSeed, maxEstimatedSteps) {
  const baseEntry = bestBoundedEntry(ladder);
  const baseEstimate = estimateOnePeriodSteps(baseEntry);
  const controllerEntry = controllerCandidateEntry(stepController?.best_candidate ?? null);
  const controllerEstimate = controllerEntry?.estimated_steps_for_one_period ?? null;
  const foldLockEntry = foldLayerLockCandidateEntry(foldLayerLock);
  const foldLockEstimate = foldLockEntry?.estimated_steps_for_one_period ?? null;
  const integratorEntry = foldLayerLockedIntegratorCandidateEntry(integratorSeed, maxEstimatedSteps);
  const integratorEstimate = integratorEntry?.estimated_steps_for_one_period ?? null;
  const candidates = [
    {
      source: "direct_root_horizon_ladder",
      entry: baseEntry,
      estimate: baseEstimate,
    },
    {
      source: "direct_root_step_fraction_controller",
      entry: controllerEntry,
      estimate: controllerEstimate,
    },
    {
      source: "direct_root_fold_layer_lock",
      entry: foldLockEntry,
      estimate: foldLockEstimate,
    },
    {
      source: "direct_root_fold_layer_locked_integrator",
      entry: integratorEntry,
      estimate: integratorEstimate,
    },
  ].filter((candidate) => candidate.entry && Number.isFinite(candidate.estimate));
  const best = candidates.reduce(
    (currentBest, candidate) =>
      !currentBest || candidate.estimate < currentBest.estimate ? candidate : currentBest,
    null
  );
  if (best) {
    return {
      source: best.source,
      entry: best.entry,
      estimated_steps_for_one_period: best.estimate,
      base_estimated_steps_for_one_period: baseEstimate,
      controller_estimated_steps_for_one_period: controllerEstimate,
      fold_layer_lock_estimated_steps_for_one_period: foldLockEstimate,
      fold_layer_locked_integrator_estimated_steps_for_one_period: integratorEstimate,
    };
  }
  return {
    source: "direct_root_horizon_ladder",
    entry: baseEntry,
    estimated_steps_for_one_period: baseEstimate,
    base_estimated_steps_for_one_period: baseEstimate,
    controller_estimated_steps_for_one_period: controllerEstimate,
    fold_layer_lock_estimated_steps_for_one_period: foldLockEstimate,
    fold_layer_locked_integrator_estimated_steps_for_one_period: integratorEstimate,
  };
}

function foldLayerRouting(fold, probeEvidence) {
  if (!fold) {
    if (probeEvidence?.status === "direct-root-probe-unavailable") {
      return {
        status: "missing",
        classification: null,
        route: "direct-root-probe-required",
        can_route_to_lock_ledger: false,
        failure_code: "direct-root-probe-unavailable",
      };
    }
    if (probeEvidence?.status === "no-self-root-surplus-observed-in-current-ladder") {
      return {
        status: "missing",
        classification: null,
        route: "extend-direct-root-horizon-ladder",
        can_route_to_lock_ledger: false,
        failure_code: "self-root-fold-splitting-probe-horizon-too-short",
      };
    }
    if (probeEvidence?.status === "self-root-surplus-unclassified") {
      return {
        status: "missing",
        classification: null,
        route: "compute-self-root-fold-splitting-diagnostic",
        can_route_to_lock_ledger: false,
        failure_code: "self-root-fold-splitting-diagnostic-missing",
      };
    }
    return {
      status: "missing",
      classification: null,
      route: "fold-splitting-classification-required",
      can_route_to_lock_ledger: false,
      failure_code: "self-root-fold-splitting-missing",
    };
  }
  if (fold.classification === "fold-layer") {
    return {
      status: "classified",
      classification: fold.classification,
      route: "fold-layer-routed-to-lock-ledger",
      can_route_to_lock_ledger: true,
      failure_code: null,
    };
  }
  if (fold.classification === "branch-proliferation") {
    return {
      status: "classified",
      classification: fold.classification,
      route: "root-ledger-instability",
      can_route_to_lock_ledger: false,
      failure_code: "self-root-branch-proliferation",
    };
  }
  return {
    status: "classified",
    classification: fold.classification ?? "resolution-artifact",
    route: "resolution-refinement-required",
    can_route_to_lock_ledger: false,
    failure_code: "self-root-resolution-artifact",
  };
}

function foldFromStepController(stepController) {
  const candidate = stepController?.best_candidate ?? null;
  if (!candidate) {
    return null;
  }
  if (candidate.first_self_root_fold_splitting) {
    return candidate.first_self_root_fold_splitting;
  }
  if (!candidate.fold_layer_classification) {
    return null;
  }
  return {
    schema: "self-root-fold-splitting-diagnostic-summary/v1",
    status: `self-root-${candidate.fold_layer_classification}`,
    classification: candidate.fold_layer_classification,
    reason:
      "summary classification carried from direct-root step-fraction controller; full local bracket packet was not present in this source artifact",
    selected_dynamics_step_fraction: candidate.dynamics_step_fraction,
    best_bounded_horizon_period_fraction: candidate.best_bounded_horizon_period_fraction ?? null,
    validation_effect: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      reason:
        "step-fraction fold classification is a branch-chart diagnostic only and does not establish one-period Tier 1 continuation",
    },
  };
}

function foldFromFoldLayerLock(foldLayerLock) {
  const candidate = foldLayerLock?.best_candidate ?? null;
  if (!candidate?.classification) {
    return null;
  }
  return {
    schema: "self-root-fold-splitting-diagnostic-summary/v1",
    status: `self-root-${candidate.classification}`,
    classification: candidate.classification,
    reason:
      "summary classification carried from event-local fold-layer lock; full local bracket packet remains in the source diagnostic candidate when available",
    selected_dynamics_step_fraction: candidate.dynamics_step_fraction,
    event_horizon_period_fraction: candidate.event_horizon_period_fraction,
    fold_splitting_summary: candidate.fold_splitting_summary ?? null,
    validation_effect: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      reason:
        "fold-layer lock is a branch-chart diagnostic only and does not establish one-period Tier 1 continuation",
    },
  };
}

function residualTargets() {
  return {
    schema: "a0-tier1-one-period-residual-targets/v1",
    state_return:
      "R_state = max_b max(||x_b(T)-x_b(0)||/R_scale, ||v_b(T)-v_b(0)||/V_scale)",
    root_residual:
      "R_root = max_{t,i,j,l} |g_ij(t0_l;t)| / max(c_F Delta t, eta, epsilon_0)",
    speed_ordering:
      "R_speed = max_t max(0, v_I(t)-c_F, v_M(t)-v_I(t), v_O(t)-v_M(t))",
    center_drift:
      "R_drift = max(||X_c(T)-X_c(0)||/R_scale, ||V_c(T)-V_c(0)||/V_scale) after symmetry removal",
    energy_like_speed_ledger:
      "R_E = |mean_b ||v_b(T)||^2 - mean_b ||v_b(0)||^2| / max(mean_b ||v_b(0)||^2, eps)",
    fold_layer_lock:
      "R_lock records bounded self-root fold-layer events separately from root-ledger instability",
  };
}

function monodromySetup(row) {
  return {
    schema: "a0-tier1-one-period-monodromy-setup/v1",
    status: "not_computed",
    period: row.period ?? null,
    operator: "P_eta_Lambda",
    quotient_rule:
      "Remove time-shift, Euclidean translation, Euclidean rotation, and branch-chart gauge modes before measuring non-symmetry multipliers.",
    Delta_k_formula: "Delta_k = 1 - rho(Pi_perp D P_{eta,Lambda} Pi_perp)",
    validation_effect: {
      Delta_k_positive: false,
      reason: "finite-difference monodromy has not been constructed by this prototype",
    },
  };
}

function foldLayerLockedTrajectoryTarget(row, fold, routing, stepBudget, validationPacket, args) {
  const entry = stepBudget?.entry ?? null;
  const lockedKeys = Array.isArray(fold?.surplus_branch_keys) ? fold.surplus_branch_keys : [];
  const lockedIntegratorReady =
    stepBudget?.source === "direct_root_fold_layer_locked_integrator" &&
    entry?.fold_layer_locked_integrator_ready === true &&
    routing?.can_route_to_lock_ledger === true;
  return {
    schema: "a0-tier1-fold-layer-locked-trajectory-target/v1",
    status: lockedIntegratorReady ? "ready_to_implement_fail_closed" : "blocked_until_locked_integrator_seed",
    source_row: row.row,
    period: row.period ?? null,
    branch_chart_assumptions: {
      locked_self_root_keys: lockedKeys,
      fold_layer_route: routing?.route ?? null,
      locked_roots_are_not_promoted_to_active_branch_count: true,
      retained_initial_branch_count: fold?.initial_branch_count ?? null,
      retained_branch_count_at_lock_event: fold?.retained_branch_count ?? null,
      surplus_branch_count_at_lock_event: fold?.surplus_branch_count ?? null,
    },
    macro_stride_plan: {
      selected_step_budget_source: stepBudget?.source ?? null,
      selected_macro_stride: entry?.macro_stride ?? null,
      locked_event_count: entry?.locked_event_count ?? null,
      retained_direct_root_steps_per_event: entry?.retained_direct_root_steps_per_event ?? null,
      locked_direct_root_step_count: entry?.locked_direct_root_step_count ?? null,
      retained_direct_root_step_count: entry?.retained_direct_root_step_count ?? null,
      estimated_steps_for_one_period: stepBudget?.estimated_steps_for_one_period ?? null,
      cap_reduction_factor: entry?.cap_reduction_factor ?? null,
      under_current_cap:
        Number.isFinite(stepBudget?.estimated_steps_for_one_period) &&
        Number.isFinite(args?.maxEstimatedSteps)
          ? stepBudget.estimated_steps_for_one_period <= args.maxEstimatedSteps
          : null,
    },
    trajectory_equation: {
      runner_script: "scripts/mass-map/a0-tier1-fold-layer-locked-one-period-attempt.mjs",
      update_map:
        "X_{n+1}=Phi_{eta,Lambda,L}(X_n;dt): solve active causal roots at X_n, route locked self roots K_L to R_lock, update the state/history, and recompute the root ledger before the next step.",
      diagnostic_acceleration:
        "a_a(t)=sum_r w_relation q_receiver q_source (x_source(t-tau_r)-x_receiver(t))/(((|x_source(t-tau_r)-x_receiver(t)|^2+eta^2)^(3/2))*max(|J_r|,J_min)).",
      scope:
        "Executable diagnostic target for the fold-layer-locked attempt. It is not an accepted master-equation proof and must stay fail-closed until the one-period ledgers pass.",
    },
    phase_ledger: {
      required: true,
      residual: "R_phase=max_layer |theta_layer(T)-theta_layer(0)-2*pi*k_layer|/(2*pi)",
      blocker: "phase-coordinate series and winding-error ledger missing",
    },
    energy_like_speed_ledger: {
      required: true,
      residual: "R_E=|mean_b |v_b(T)|^2 - mean_b |v_b(0)|^2|/max(mean_b |v_b(0)|^2,eps)",
      blocker: "direct energy-like speed ledger and Noether energy ledger missing",
    },
    monodromy_condition: {
      required: true,
      operator: "P_eta_Lambda_L",
      quotient_rule:
        "Remove time-shift, Euclidean translation, Euclidean rotation, and branch-chart gauge modes before measuring non-symmetry multipliers.",
      Delta_k_formula: "Delta_k=1-rho(Pi_perp D P_eta_Lambda_L Pi_perp)",
      pass_only_if: "Delta_k>0 after residual convergence and root-ledger matching",
    },
    eta_ladder_continuation_target: {
      required: true,
      schedule: "eta_j=eta_0/2^j for the declared Tier 1 ladder",
      branch_persistence_rule:
        "The same locked self-root keys, relation classes, source coverage, and branch-chart routing must persist at each eta step.",
      blocker: "eta-ladder continuation missing",
    },
    validation_boundary: {
      accepted_history_source_coverage:
        validationPacket.accepted_history_source_coverage?.status ?? null,
      accepted_history_source_coverage_missing_fields:
        validationPacket.accepted_history_source_coverage?.missing_fields ?? null,
      remains_accepted_history: false,
      fail_closed_until: [
        "direct_regularized_one_period_trajectory",
        "phase_closure_residual",
        "energy_like_speed_ledger",
        "quotient_monodromy_operator",
        "eta_ladder_continuation",
      ],
    },
    falsification_targets: [
      "Reject the row if the direct one-period trajectory loses the retained branch ledger or promotes locked fold-layer roots as ordinary active self branches.",
      "Reject or demote the macro stride if R_state, R_root, R_phase, R_E, R_drift, R_speed, or R_lock fails the declared tolerance under refinement.",
      "Reject the row if Delta_k<=0 on the symmetry quotient.",
      "Reject the row if the locked branch-chart routing changes across the eta ladder.",
    ],
  };
}

function rowStatus({ routing, estimatedSteps, maxEstimatedSteps, bestEntry, stepBudget, foldLayerLock }) {
  if (routing.status === "missing") {
    if (routing.failure_code === "direct-root-probe-unavailable") {
      return {
        status: "blocked_direct_root_probe_unavailable",
        failure_code: routing.failure_code,
      };
    }
    if (routing.failure_code === "self-root-fold-splitting-probe-horizon-too-short") {
      return {
        status: "blocked_fold_splitting_probe_horizon_short",
        failure_code: routing.failure_code,
      };
    }
    if (routing.failure_code === "self-root-fold-splitting-diagnostic-missing") {
      return {
        status: "blocked_fold_splitting_diagnostic_missing",
        failure_code: routing.failure_code,
      };
    }
    return {
      status: "blocked_fold_splitting_unclassified",
      failure_code: routing.failure_code,
    };
  }
  if (routing.classification === "branch-proliferation") {
    return {
      status: "blocked_root_ledger_instability",
      failure_code: routing.failure_code,
    };
  }
  if (routing.classification !== "fold-layer") {
    return {
      status: "blocked_resolution_refinement_required",
      failure_code: routing.failure_code,
    };
  }
  if (!bestEntry || estimatedSteps === null) {
    return {
      status: "blocked_one_period_step_budget_unavailable",
      failure_code: "bounded-short-horizon-entry-missing",
    };
  }
  if (estimatedSteps > maxEstimatedSteps) {
    if (foldLayerLock?.status === "direct-root-fold-layer-lock-ready") {
      return {
        status: "blocked_fold_layer_lock_step_budget_exceeds_cap",
        failure_code: "fold-layer-lock-step-budget-exceeds-cap",
      };
    }
    if (stepBudget?.source === "direct_root_step_fraction_controller") {
      return {
        status: "blocked_step_fraction_controller_budget_exceeds_cap",
        failure_code: "step-fraction-controller-budget-exceeds-cap",
      };
    }
    return {
      status: "blocked_one_period_step_budget_exceeds_cap",
      failure_code: "estimated-step-count-exceeds-cap",
    };
  }
  if (stepBudget?.source === "direct_root_fold_layer_locked_integrator") {
    return {
      status: "ready_for_fold_layer_locked_one_period_attempt",
      failure_code: "fold-layer-locked-integrator-validation-not-run",
    };
  }
  return {
    status: "ready_for_one_period_continuation_attempt",
    failure_code: "one-period-integrator-not-run",
  };
}

function onePeriodRow(row, args) {
  const ladder = directRootHorizonLadder(row);
  const stepController = directRootStepFractionController(row);
  const foldLayerLock = directRootFoldLayerLock(row);
  const integratorSeed = directRootFoldLayerLockedIntegratorSeed(row);
  const stepBudget = selectedStepBudget(
    ladder,
    stepController,
    foldLayerLock,
    integratorSeed,
    args.maxEstimatedSteps
  );
  const bestEntry = stepBudget.entry;
  const surplusEntry = firstSurplusEntry(ladder);
  const ladderFold = ladder?.first_self_root_fold_splitting ?? surplusEntry?.self_root_fold_splitting ?? null;
  const controllerFold = foldFromStepController(stepController);
  const lockFold = foldFromFoldLayerLock(foldLayerLock);
  const fold = ladderFold ?? controllerFold ?? lockFold;
  const foldProbeEvidence = foldSplittingProbeEvidence(ladder, fold);
  const routing = foldLayerRouting(fold, foldProbeEvidence);
  const estimatedSteps = stepBudget.estimated_steps_for_one_period;
  const status = rowStatus({
    routing,
    estimatedSteps,
    maxEstimatedSteps: args.maxEstimatedSteps,
    bestEntry,
    stepBudget,
    foldLayerLock,
  });
  const stepBudgetBlocker =
    estimatedSteps !== null && estimatedSteps > args.maxEstimatedSteps
      ? {
          schema: "a0-tier1-one-period-step-budget-blocker/v1",
          status: status.status,
          failure_code: status.failure_code,
          selected_step_budget_source: stepBudget.source,
          max_estimated_steps: args.maxEstimatedSteps,
          estimated_steps_for_one_period: estimatedSteps,
          base_estimated_steps_for_one_period: stepBudget.base_estimated_steps_for_one_period,
          controller_estimated_steps_for_one_period:
            stepBudget.controller_estimated_steps_for_one_period,
          fold_layer_lock_estimated_steps_for_one_period:
            stepBudget.fold_layer_lock_estimated_steps_for_one_period,
          fold_layer_locked_integrator_estimated_steps_for_one_period:
            stepBudget.fold_layer_locked_integrator_estimated_steps_for_one_period,
          fold_layer_lock_ready:
            foldLayerLock?.status === "direct-root-fold-layer-lock-ready",
          required_reduction_factor:
            Number.isFinite(estimatedSteps) && args.maxEstimatedSteps > 0
              ? estimatedSteps / args.maxEstimatedSteps
              : null,
          next_required_computation:
            "derive or run an adaptive fold-layer-locked one-period integrator that reduces the retained direct-root step count below the attempt cap while still reporting residual closure, no secular center drift, Delta_k, and eta-ladder persistence",
        }
      : null;
  const validationPacket = foldLayerLockedValidationPacket(row);
  return {
    row: row.row,
    schema: "a0-tier1-one-period-continuation-prototype-row/v1",
    schema_status: "provisional",
    status: status.status,
    failure_code: status.failure_code,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    period: row.period ?? null,
    source_row: row.source_row ?? null,
    selected_weak_tier_layers: selectedWeakTierLayers(row),
    samples: canonicalSamples(row),
    active_causal_root_ledger: canonicalRoots(row),
    branch_chart: {
      self_root_fold_splitting: fold,
      fold_splitting_source: ladderFold
        ? "direct_root_horizon_ladder"
        : controllerFold
          ? "direct_root_step_fraction_controller"
          : lockFold
            ? "direct_root_fold_layer_lock"
            : null,
      fold_splitting_probe: foldProbeEvidence,
      fold_layer_routing: routing,
      fold_layer_lock:
        foldLayerLock === null
          ? null
          : {
              status: foldLayerLock.status,
              event_horizon_stable: foldLayerLock.event_horizon_stable ?? false,
              best_candidate: foldLayerLock.best_candidate
                ? {
                    source: foldLayerLock.best_candidate.source,
                    dynamics_step_fraction: foldLayerLock.best_candidate.dynamics_step_fraction,
                    estimated_steps_for_one_period:
                      foldLayerLock.best_candidate.estimated_steps_for_one_period,
                    event_horizon_period_fraction:
                      foldLayerLock.best_candidate.event_horizon_period_fraction,
                    first_branch_surplus_step:
                      foldLayerLock.best_candidate.first_branch_surplus_step,
                    validation: foldLayerLock.best_candidate.validation,
                  }
                : null,
            },
      branch_surplus_source: ladder?.first_branch_surplus ?? null,
    },
    one_period_step_budget: {
      max_estimated_steps: args.maxEstimatedSteps,
      selected_step_budget_source: stepBudget.source,
      base_estimated_steps_for_one_period: stepBudget.base_estimated_steps_for_one_period,
      controller_estimated_steps_for_one_period: stepBudget.controller_estimated_steps_for_one_period,
      fold_layer_lock_estimated_steps_for_one_period:
        stepBudget.fold_layer_lock_estimated_steps_for_one_period,
      fold_layer_locked_integrator_estimated_steps_for_one_period:
        stepBudget.fold_layer_locked_integrator_estimated_steps_for_one_period,
      best_bounded_entry:
        bestEntry === null
          ? null
          : {
              requested_steps: bestEntry.requested_steps,
              completed_steps: bestEntry.completed_steps,
              horizon_period_fraction: bestEntry.horizon_period_fraction,
              status: bestEntry.status,
              dynamically_bounded: bestEntry.dynamically_bounded,
              dynamics_step_fraction: bestEntry.dynamics_step_fraction ?? null,
              fold_layer_lock_ready: bestEntry.fold_layer_lock_ready ?? false,
              fold_layer_locked_integrator_ready:
                bestEntry.fold_layer_locked_integrator_ready ?? false,
              macro_stride: bestEntry.macro_stride ?? null,
              cap_reduction_factor: bestEntry.cap_reduction_factor ?? null,
              locked_event_count: bestEntry.locked_event_count ?? null,
              retained_direct_root_steps_per_event:
                bestEntry.retained_direct_root_steps_per_event ?? null,
              locked_direct_root_step_count: bestEntry.locked_direct_root_step_count ?? null,
              retained_direct_root_step_count:
                bestEntry.retained_direct_root_step_count ?? null,
              attempt_formula: bestEntry.attempt_formula ?? null,
            },
      first_surplus_entry:
        surplusEntry === null
          ? null
          : {
              requested_steps: surplusEntry.requested_steps,
              horizon_period_fraction: surplusEntry.horizon_period_fraction,
              status: surplusEntry.status,
              dynamically_bounded: surplusEntry.dynamically_bounded,
              first_branch_surplus_step: surplusEntry.branch_retention?.first_branch_surplus_step ?? null,
            },
      estimated_steps_for_one_period: estimatedSteps,
      can_attempt_with_current_cap:
        estimatedSteps !== null && estimatedSteps <= args.maxEstimatedSteps && routing.can_route_to_lock_ledger,
      step_budget_blocker: stepBudgetBlocker,
      fold_layer_locked_integrator:
        integratorSeed === null
          ? null
          : {
              status: integratorSeed.status,
              locked_event_count: integratorSeed.locked_event_count ?? null,
              retained_direct_root_steps_per_event:
                integratorSeed.retained_direct_root_steps_per_event ?? null,
              locked_direct_root_step_count:
                integratorSeed.locked_direct_root_step_count ?? null,
              selected_macro_stride:
                stepBudget.source === "direct_root_fold_layer_locked_integrator"
                  ? stepBudget.entry?.macro_stride ?? null
                  : null,
              cap_reduction_factor:
                stepBudget.source === "direct_root_fold_layer_locked_integrator"
                  ? stepBudget.entry?.cap_reduction_factor ?? null
                  : null,
              planned_estimated_steps_for_one_period:
                stepBudget.source === "direct_root_fold_layer_locked_integrator"
                  ? stepBudget.estimated_steps_for_one_period
                  : null,
              planned_attempt_formula:
                stepBudget.source === "direct_root_fold_layer_locked_integrator"
                  ? stepBudget.entry?.attempt_formula ?? null
                  : null,
              validation_effect: integratorSeed.validation_effect ?? null,
            },
      step_fraction_controller:
        stepController === null
          ? null
          : {
              status: stepController.status,
              simple_step_relaxation_reduces_burden:
                stepController.simple_step_relaxation_reduces_burden ?? false,
              best_candidate: stepController.best_candidate
                ? {
                    dynamics_step_fraction: stepController.best_candidate.dynamics_step_fraction,
                    estimated_steps_for_one_period:
                      stepController.best_candidate.estimated_steps_for_one_period,
                    best_bounded_horizon_period_fraction:
                      stepController.best_candidate.best_bounded_horizon_period_fraction,
                    fold_layer_classification: stepController.best_candidate.fold_layer_classification,
                  }
                : null,
              controller_decision: stepController.controller_decision ?? null,
              recommended_next_rule: stepController.recommended_next_rule ?? null,
            },
    },
    residual_targets: residualTargets(),
    trajectory_target: foldLayerLockedTrajectoryTarget(row, fold, routing, stepBudget, validationPacket, args),
    monodromy_setup: monodromySetup(row),
    fold_layer_locked_validation_packet: validationPacket,
    validation: validationPacket.validation_effect,
    accepted_history_boundary: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      accepted_history_source_coverage:
        validationPacket.accepted_history_source_coverage.status,
      accepted_history_source_coverage_missing_fields:
        validationPacket.accepted_history_source_coverage.missing_fields,
      blocked_fields: ACCEPTED_HISTORY_BLOCKERS,
      reason:
        "this prototype records feasibility and residual targets only; it does not emit accepted-history rows",
    },
  };
}

function summarize(rows) {
  const status_counts = {};
  const failure_codes = {};
  for (const row of rows) {
    status_counts[row.status] = (status_counts[row.status] ?? 0) + 1;
    if (row.failure_code) {
      failure_codes[row.failure_code] = (failure_codes[row.failure_code] ?? 0) + 1;
    }
  }
  return {
    row_count: rows.length,
    ready_for_one_period_attempt_count: rows.filter(isReadyForOnePeriodAttempt).length,
    ready_for_direct_one_period_attempt_count: rows.filter(
      (row) => row.status === "ready_for_one_period_continuation_attempt"
    ).length,
    ready_for_fold_layer_locked_one_period_attempt_count: rows.filter(
      (row) => row.status === "ready_for_fold_layer_locked_one_period_attempt"
    ).length,
    accepted_history_row_count: 0,
    status_counts,
    failure_codes,
  };
}

function isReadyForOnePeriodAttempt(row) {
  return (
    row.status === "ready_for_one_period_continuation_attempt" ||
    row.status === "ready_for_fold_layer_locked_one_period_attempt"
  );
}

function run(sourceArtifact, sourcePath, args) {
  const rows = selectRows(sourceArtifact, args.rows).map((row) => onePeriodRow(row, args));
  const allDirectReady =
    rows.length > 0 && rows.every((row) => row.status === "ready_for_one_period_continuation_attempt");
  const allFoldLayerLockedReady =
    rows.length > 0 && rows.every((row) => row.status === "ready_for_fold_layer_locked_one_period_attempt");
  return {
    metadata: {
      artifact: "a0-tier1-one-period-continuation-prototype",
      schema: "a0-tier1-one-period-continuation-prototype/v1",
      status: allDirectReady
        ? "ready_for_one_period_attempt"
        : allFoldLayerLockedReady
          ? "ready_for_fold_layer_locked_one_period_attempt"
          : "blocked_one_period_continuation",
      generatedAt: new Date().toISOString(),
      source: path.relative(process.cwd(), sourcePath),
      max_estimated_steps: args.maxEstimatedSteps,
      note:
        "Fail-closed intake from short-horizon direct-root diagnostics; this artifact may report a fold-layer-locked one-period attempt budget, but it does not integrate a full period and does not compute Delta_k.",
    },
    source_metadata: sourceArtifact.metadata ?? null,
    summary: summarize(rows),
    rows,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const sourcePath = requireSourcePath(args);
  const sourceArtifact = readJson(sourcePath);
  const artifact = run(sourceArtifact, sourcePath, args);
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
