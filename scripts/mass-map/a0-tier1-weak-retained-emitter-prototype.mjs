#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROWS = "ready";
const DEFAULT_SAMPLE_COUNTS = [32, 64, 128];
const DEFAULT_ETA_STEPS = 3;
const DEFAULT_DRIFT_TOLERANCE = 0.05;
const DEFAULT_APERTURE_WIDTH = 0.35;
const ACCEPTED_HISTORY_STATUS = "accepted_history_segment";
const ROOT_J_FLOOR = 1e-6;
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const TIER_LAYERS = {
  IMO: ["I", "M", "O"],
  "IM-": ["I", "M"],
  "I--": ["I"],
};
const POLARITIES = ["+", "-"];
const POLARITY_CHARGE = { "+": 1, "-": -1 };

function parseArgs(argv) {
  const args = {
    tier0: null,
    history: null,
    rows: DEFAULT_ROWS,
    tierSelector: null,
    sampleCounts: DEFAULT_SAMPLE_COUNTS,
    etaLadder: null,
    RRel: null,
    c: null,
    sigmaAx: null,
    driftTolerance: DEFAULT_DRIFT_TOLERANCE,
    apertureWidth: DEFAULT_APERTURE_WIDTH,
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
    } else if (arg === "--history") {
      args.history = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--tier-selector") {
      args.tierSelector = argv[++i];
    } else if (arg === "--sample-counts") {
      args.sampleCounts = parseIntegerList(argv[++i]);
    } else if (arg === "--eta-ladder") {
      args.etaLadder = parseNumberList(argv[++i]);
    } else if (arg === "--R-rel") {
      args.RRel = parsePositiveNumber(argv[++i], "--R-rel");
    } else if (arg === "--c") {
      args.c = parsePositiveNumber(argv[++i], "--c");
    } else if (arg === "--sigma-ax") {
      args.sigmaAx = parseSigmaAx(argv[++i]);
    } else if (arg === "--drift-tolerance") {
      args.driftTolerance = parsePositiveNumber(argv[++i], "--drift-tolerance");
    } else if (arg === "--aperture-width") {
      args.apertureWidth = parsePositiveNumber(argv[++i], "--aperture-width");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-weak-retained-emitter-prototype.mjs --tier0 PATH [options]

Options:
  --tier0 PATH            Tier 0 JSON output from a0-tier0-branch-search.mjs.
  --history PATH          Accepted Tier 1 state/history segment and active causal-root ledger JSON.
  --rows VALUE            "ready", "all", or a comma-separated row list. Defaults to "ready".
  --tier-selector VALUE   IMO, IM-, or I--. Defaults to the row handoff selector or IMO.
  --sample-counts LIST    Comma-separated positive integer refinement counts. Defaults to 32,64,128.
  --eta-ladder LIST       Comma-separated positive eta values. Defaults to the Tier 0 fold layer and halvings.
  --R-rel VALUE           Diagnostic extraction radius. Defaults to 4 * R_O for each row.
  --c VALUE               Weak-sector propagation scale. Defaults to the source sea_cell.c_f.
  --sigma-ax VALUE        Axial sign, +1 or -1. Defaults to the row orientation sign.
  --drift-tolerance VALUE Relative drift tolerance. Defaults to ${DEFAULT_DRIFT_TOLERANCE}.
  --aperture-width VALUE  Provisional polar-site aperture width. Defaults to ${DEFAULT_APERTURE_WIDTH}.
  --out PATH              Write JSON output to a file instead of stdout.
  --pretty                Pretty-print JSON.
  --help                  Show this help.

This is a Tier 1 weak-retained emitter prototype. It reconstructs a provisional
weak-retained causal-wake amplitude from an explicit accepted state/history
segment and active causal-root ledger, then reports active-tier norm and
refinement drift. It does not emit weak-emitter-ready and it must not be used as
a Standard Model shielding-envelope input.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function optionalResolvedPath(filePath) {
  return filePath ? path.resolve(filePath) : null;
}

function requireTier0Path(args) {
  if (!args.tier0) {
    throw new Error("Missing required --tier0 PATH argument.");
  }
  return path.resolve(args.tier0);
}

function historySegments(history) {
  if (!history) {
    return [];
  }
  if (Array.isArray(history.rows)) {
    return history.rows;
  }
  if (Array.isArray(history.segments)) {
    return history.segments;
  }
  if (Array.isArray(history.history_segments)) {
    return history.history_segments;
  }
  if (Object.hasOwn(history, "row")) {
    return [history];
  }
  return [];
}

function historySegmentMap(history) {
  return new Map(
    historySegments(history)
      .filter((segment) => Number.isInteger(segment.row))
      .map((segment) => [segment.row, segment])
  );
}

function parseNumberList(value) {
  const numbers = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isFinite(entry) && entry > 0);
  if (numbers.length === 0) {
    throw new Error(`Expected a comma-separated list of positive numbers, got: ${value}`);
  }
  return uniquePositive(numbers);
}

function parseIntegerList(value) {
  const numbers = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isInteger(entry) && entry > 0);
  if (numbers.length === 0) {
    throw new Error(`Expected a comma-separated list of positive integers, got: ${value}`);
  }
  return [...new Set(numbers)].sort((a, b) => a - b);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be positive, got: ${value}`);
  }
  return number;
}

function parseSigmaAx(value) {
  if (value === "+" || value === "+1" || value === "1") {
    return 1;
  }
  if (value === "-" || value === "-1") {
    return -1;
  }
  throw new Error(`Expected --sigma-ax to be +1 or -1, got: ${value}`);
}

function uniquePositive(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    if (!Number.isFinite(value) || value <= 0) {
      continue;
    }
    const key = value.toPrecision(16);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }
  return result;
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

function defaultEtaLadder(tier0, row) {
  const seed =
    row.self_root_delay_window?.window?.foldLayerDelay ??
    tier0.tolerances?.selfRootFoldLayerDelay ??
    tier0.tolerances?.instantaneousSelfDelay ??
    tier0.tolerances?.root ??
    1e-6;
  const ladder = [];
  for (let i = 0; i < DEFAULT_ETA_STEPS; i += 1) {
    ladder.push(seed / 2 ** i);
  }
  return uniquePositive(ladder);
}

function refinementStages(sampleCounts, etaLadder) {
  const count = Math.max(sampleCounts.length, etaLadder.length);
  return Array.from({ length: count }, (_, index) => ({
    nu: index + 1,
    sample_count: sampleCounts[Math.min(index, sampleCounts.length - 1)],
    eta: etaLadder[Math.min(index, etaLadder.length - 1)],
  }));
}

function tierSelectorFor(row, override) {
  const rowLabel = row.weak_retained_amplitude_handoff?.tier_selector?.label ?? "IMO";
  const label = override ?? rowLabel;
  if (!Object.hasOwn(TIER_LAYERS, label)) {
    throw new Error(`Unsupported tier selector: ${label}`);
  }
  if (override && override !== rowLabel) {
    throw new Error(
      `Row ${row.row} carries weak tier selector ${rowLabel}; this prototype will not derive ${override} by dropping layers from the same row.`
    );
  }
  return {
    label,
    active_layers: TIER_LAYERS[label],
    schema_status: "provisional",
  };
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, value) {
  return [a[0] * value, a[1] * value, a[2] * value];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function unit(a) {
  const value = norm(a);
  return value === 0 ? [0, 0, 0] : scale(a, 1 / value);
}

function interpolateVector(a, b, alpha) {
  return [
    a[0] + (b[0] - a[0]) * alpha,
    a[1] + (b[1] - a[1]) * alpha,
    a[2] + (b[2] - a[2]) * alpha,
  ];
}

function cAdd(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

function cSub(a, b) {
  return { re: a.re - b.re, im: a.im - b.im };
}

function cScale(a, value) {
  return { re: a.re * value, im: a.im * value };
}

function cMul(a, b) {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

function cAbs(a) {
  return Math.hypot(a.re, a.im);
}

function cPhase(a) {
  return Math.atan2(a.im, a.re);
}

function cExp(theta) {
  return { re: Math.cos(theta), im: Math.sin(theta) };
}

function complexRecord(value) {
  return {
    re: value.re,
    im: value.im,
    abs: cAbs(value),
    phase: cPhase(value),
  };
}

function fibonacciDirections(count) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (2 * (index + 0.5)) / count;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = index * goldenAngle;
    return [Math.cos(theta) * radius, y, Math.sin(theta) * radius];
  });
}

function stateEntries(row) {
  const entries = row.state_vector?.initial ?? [];
  return Object.fromEntries(entries.map((entry) => [entry.id, entry]));
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

function sortedHistorySamples(segment) {
  return [...(segment.samples ?? segment.history ?? [])]
    .filter((sample) => Number.isFinite(sample.t) || Number.isFinite(sample.time))
    .map((sample) => ({
      ...sample,
      t: Number.isFinite(sample.t) ? sample.t : sample.time,
    }))
    .sort((a, b) => a.t - b.t);
}

function rawHistorySamples(segment) {
  return [...(segment.samples ?? segment.history ?? [])].map((sample) => ({
    ...sample,
    t: Number.isFinite(sample.t) ? sample.t : sample.time,
  }));
}

function historySampleTimeDiagnostics(segment) {
  const samples = rawHistorySamples(segment);
  let finiteSampleCount = 0;
  let invalidTimeCount = 0;
  let ordered = true;
  let priorTime = null;
  const invalidExamples = [];
  for (const sample of samples) {
    if (!Number.isFinite(sample.t)) {
      invalidTimeCount += 1;
      invalidExamples.push({
        t: sample.t ?? null,
        time: sample.time ?? null,
        reason: "nonfinite-time",
      });
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
    invalid_examples: invalidExamples.slice(0, 20),
    sample_count_at_least_two: finiteSampleCount >= 2,
    samples_ordered_by_t: ordered,
    sample_times_finite: invalidTimeCount === 0,
  };
}

function interpolateBodyState(samples, bodyId, queryTime) {
  if (samples.length === 0) {
    return null;
  }
  if (queryTime < samples[0].t || queryTime > samples[samples.length - 1].t) {
    return null;
  }
  for (let i = 0; i < samples.length; i += 1) {
    if (Math.abs(samples[i].t - queryTime) <= 1e-12) {
      return sampleBodyState(samples[i], bodyId);
    }
  }
  for (let i = 1; i < samples.length; i += 1) {
    const prior = samples[i - 1];
    const next = samples[i];
    if (prior.t <= queryTime && queryTime <= next.t) {
      const priorState = sampleBodyState(prior, bodyId);
      const nextState = sampleBodyState(next, bodyId);
      if (!priorState || !nextState) {
        return null;
      }
      const alpha = (queryTime - prior.t) / Math.max(next.t - prior.t, Number.EPSILON);
      return {
        position: interpolateVector(priorState.position, nextState.position, alpha),
        velocity: interpolateVector(priorState.velocity, nextState.velocity, alpha),
      };
    }
  }
  return null;
}

function segmentRootLedger(segment) {
  const roots =
    segment.active_causal_root_ledger ??
    segment.active_roots ??
    segment.root_ledger?.active_roots ??
    segment.root_ledger?.roots ??
    [];
  return Array.isArray(roots)
    ? roots.filter((root) => root && root.status !== "excluded" && root.status !== "inactive")
    : [];
}

function rootRelationsPresent(roots) {
  const relations = new Set(roots.map((root) => root.relation).filter(Boolean));
  return {
    partner: relations.has("partner"),
    self: relations.has("self"),
    inter_layer: relations.has("inter_layer"),
  };
}

function rootLedgerDiagnostics(segment) {
  const roots = segmentRootLedger(segment);
  const relations = rootRelationsPresent(roots);
  return {
    count: roots.length,
    relations,
    complete_relation_classes: relations.partner && relations.self && relations.inter_layer,
  };
}

function activeRootSourceCoverageDiagnostics(segment, activeLayers) {
  const roots = segmentRootLedger(segment);
  const sourceLabels = new Set(roots.map((root) => root.source).filter(Boolean));
  const requiredSources = activeLayers.flatMap((layer) => POLARITIES.map((polarity) => `${layer}${polarity}`));
  const missingSources = requiredSources.filter((source) => !sourceLabels.has(source));
  const byLayer = Object.fromEntries(
    activeLayers.map((layer) => [
      layer,
      Object.fromEntries(POLARITIES.map((polarity) => [polarity, sourceLabels.has(`${layer}${polarity}`)])),
    ])
  );
  return {
    required_sources: requiredSources,
    missing_sources: missingSources,
    by_layer: byLayer,
    active_root_sources_cover_selected_layers: missingSources.length === 0,
  };
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every((entry) => Number.isFinite(entry));
}

function bodyStateVectorDiagnostics(segment) {
  const samples = sortedHistorySamples(segment);
  let missing_state_count = 0;
  let invalid_vector_count = 0;
  const invalid_examples = [];
  for (const sample of samples) {
    for (const bodyId of BODY_IDS) {
      const state = sampleBodyState(sample, bodyId);
      if (!state) {
        missing_state_count += 1;
        invalid_examples.push({ t: sample.t, body: bodyId, reason: "missing" });
        continue;
      }
      if (!finiteVector3(state.position) || !finiteVector3(state.velocity)) {
        invalid_vector_count += 1;
        invalid_examples.push({ t: sample.t, body: bodyId, reason: "nonfinite-vector" });
      }
    }
  }
  return {
    missing_state_count,
    invalid_vector_count,
    invalid_examples: invalid_examples.slice(0, 20),
    all_required_body_states_present: missing_state_count === 0,
    body_state_vectors_finite: invalid_vector_count === 0,
  };
}

function activeRootFieldDiagnostics(segment) {
  const roots = segmentRootLedger(segment);
  const invalidRoots = [];
  let maxDelay = 0;
  for (const root of roots) {
    const delay = Number(root.delay ?? root.tau ?? root.root_delay);
    const valid =
      BODY_IDS.includes(root.source) &&
      BODY_IDS.includes(root.receiver) &&
      ["partner", "self", "inter_layer"].includes(root.relation) &&
      root.status === "active" &&
      Number.isFinite(delay) &&
      delay >= 0 &&
      Number.isFinite(root.J);
    if (Number.isFinite(delay) && delay >= 0) {
      maxDelay = Math.max(maxDelay, delay);
    }
    if (!valid) {
      invalidRoots.push({
        source: root.source ?? null,
        receiver: root.receiver ?? null,
        relation: root.relation ?? null,
        status: root.status ?? null,
        delay: root.delay ?? root.tau ?? root.root_delay ?? null,
        J: root.J ?? null,
      });
    }
  }
  return {
    root_count: roots.length,
    invalid_root_count: invalidRoots.length,
    invalid_roots: invalidRoots.slice(0, 20),
    max_delay: maxDelay,
  };
}

function historyCoverageDiagnostics(segment, row) {
  const samples = sortedHistorySamples(segment);
  const fieldDiagnostics = activeRootFieldDiagnostics(segment);
  const period = segment.period ?? row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const minSampleTime = samples.length > 0 ? samples[0].t : null;
  const maxSampleTime = samples.length > 0 ? samples[samples.length - 1].t : null;
  const maxRequiredDelay = Math.max(fieldDiagnostics.max_delay, row.root_ledger?.maxDelay ?? 0);
  const requiredStart = -maxRequiredDelay;
  const requiredEnd = period;
  return {
    min_sample_time: minSampleTime,
    max_sample_time: maxSampleTime,
    required_start: requiredStart,
    required_end: requiredEnd,
    max_active_root_delay: maxRequiredDelay,
    covers_cycle:
      Number.isFinite(minSampleTime) &&
      Number.isFinite(maxSampleTime) &&
      Number.isFinite(period) &&
      minSampleTime <= 0 &&
      maxSampleTime >= period,
    covers_delayed_source_interval:
      Number.isFinite(minSampleTime) &&
      Number.isFinite(maxSampleTime) &&
      Number.isFinite(requiredEnd) &&
      minSampleTime <= requiredStart &&
      maxSampleTime >= requiredEnd,
  };
}

function rootsBySourceForLayer(segment, layer) {
  const roots = segmentRootLedger(segment).filter(
    (root) => typeof root.source === "string" && root.source.startsWith(layer)
  );
  return Object.fromEntries(
    POLARITIES.map((polarity) => [
      `${layer}${polarity}`,
      roots.filter((root) => root.source === `${layer}${polarity}`),
    ])
  );
}

function historySegmentReadiness(segment, row, activeLayers) {
  if (!segment) {
    return {
      ready: false,
      reason: "accepted-history-segment-missing",
      failure_code: "weak-emitter-not-computed",
    };
  }
  if (segment.status !== ACCEPTED_HISTORY_STATUS) {
    return {
      ready: false,
      reason: "history-segment-not-accepted",
      failure_code: "weak-emitter-not-computed",
    };
  }
  const sampleTimeDiagnostics = historySampleTimeDiagnostics(segment);
  if (!sampleTimeDiagnostics.sample_count_at_least_two) {
    return {
      ready: false,
      reason: "history-samples-insufficient",
      failure_code: "weak-emitter-not-computed",
    };
  }
  if (!sampleTimeDiagnostics.sample_times_finite) {
    return {
      ready: false,
      reason: "history-sample-time-invalid",
      failure_code: "weak-emitter-not-computed",
    };
  }
  if (!sampleTimeDiagnostics.samples_ordered_by_t) {
    return {
      ready: false,
      reason: "history-samples-not-ordered",
      failure_code: "weak-emitter-not-computed",
    };
  }
  const bodyDiagnostics = bodyStateVectorDiagnostics(segment);
  if (!bodyDiagnostics.all_required_body_states_present || !bodyDiagnostics.body_state_vectors_finite) {
    return {
      ready: false,
      reason: "history-body-state-invalid",
      failure_code: "weak-emitter-not-computed",
    };
  }
  const fieldDiagnostics = activeRootFieldDiagnostics(segment);
  if (fieldDiagnostics.invalid_root_count > 0) {
    return {
      ready: false,
      reason: "active-root-ledger-field-invalid",
      failure_code: "weak-emitter-not-computed",
    };
  }
  const rootDiagnostics = rootLedgerDiagnostics(segment);
  if (!rootDiagnostics.complete_relation_classes) {
    return {
      ready: false,
      reason: "active-root-ledger-incomplete",
      failure_code: "weak-emitter-not-computed",
    };
  }
  const sourceCoverageDiagnostics = activeRootSourceCoverageDiagnostics(segment, activeLayers);
  if (!sourceCoverageDiagnostics.active_root_sources_cover_selected_layers) {
    return {
      ready: false,
      reason: "active-root-sources-incomplete",
      failure_code: "weak-emitter-not-computed",
    };
  }
  const coverageDiagnostics = historyCoverageDiagnostics(segment, row);
  if (!coverageDiagnostics.covers_delayed_source_interval) {
    return {
      ready: false,
      reason: "history-source-time-coverage-insufficient",
      failure_code: "weak-emitter-not-computed",
    };
  }
  return {
    ready: true,
    reason: "accepted-history-and-root-ledger-present",
    failure_code: null,
  };
}

function reconstructLayers(row) {
  const entries = stateEntries(row);
  const layers = {};
  for (const layer of ["I", "M", "O"]) {
    const plus = entries[`${layer}+`];
    const minus = entries[`${layer}-`];
    if (!plus || !minus) {
      throw new Error(`Row ${row.row} is missing initial state entries for layer ${layer}.`);
    }
    const relative = sub(plus.position, minus.position);
    const relativeVelocity = sub(plus.velocity, minus.velocity);
    const radius = row.geometry?.radii?.[layer] ?? norm(relative);
    const omega = row.geometry?.omega?.[layer] ?? norm(relativeVelocity) / Math.max(radius, Number.EPSILON);
    const ellipticity =
      row.z_lambda?.ellipticity?.[layer] ??
      (typeof row.branch_label?.ellipticity === "number" ? row.branch_label.ellipticity : 1);
    const e1 = unit(relative);
    const e2 = unit(relativeVelocity);
    layers[layer] = {
      layer,
      radius,
      omega,
      ellipticity,
      e1,
      e2,
      normal: unit(cross(e1, e2)),
    };
  }
  return layers;
}

function exposureWeight(layerData, direction, sigmaAx, apertureWidth) {
  const plusAperture = Math.exp((dot(direction, layerData.normal) - 1) / apertureWidth);
  const minusAperture = Math.exp((dot(direction, scale(layerData.normal, -1)) - 1) / apertureWidth);
  const chirality = Math.max(0, 0.5 * (1 + sigmaAx * dot(layerData.normal, direction)));
  return chirality * (plusAperture + minusAperture);
}

function rootWeight(root) {
  const relationWeight = {
    self: 1,
    partner: 0.75,
    inter_layer: 0.5,
  }[root.relation] ?? 0.5;
  const absJ = Math.abs(Number.isFinite(root.J) ? root.J : 1);
  return relationWeight / Math.max(absJ, ROOT_J_FLOOR);
}

function wakeKernelFromHistory(layerData, sourceState, direction, historyTime, params) {
  const observation = scale(direction, params.RRel);
  const sourceToObservation = sub(observation, sourceState.position);
  const distance = Math.sqrt(dot(sourceToObservation, sourceToObservation) + params.eta * params.eta);
  const directionToObservation = unit(sourceToObservation);
  const radialVelocity = scale(directionToObservation, dot(sourceState.velocity, directionToObservation));
  const transverseVelocity = sub(sourceState.velocity, radialVelocity);
  const realComponent = dot(transverseVelocity, layerData.e1);
  const imaginaryComponent = params.sigmaAx * dot(transverseVelocity, layerData.e2);
  const historyPhase = layerData.omega * (historyTime - distance / params.c);
  const carrier = { re: realComponent / distance, im: imaginaryComponent / distance };
  return cMul(carrier, cExp(historyPhase));
}

function computeRootedPolarityWake(samples, layerData, polarity, direction, t, roots, params) {
  let weightedWake = { re: 0, im: 0 };
  let totalWeight = 0;
  let missingHistoryLookups = 0;
  for (const root of roots) {
    const delay = Number(root.delay ?? root.tau ?? root.root_delay);
    if (!Number.isFinite(delay) || delay < 0) {
      missingHistoryLookups += 1;
      continue;
    }
    const historyTime = t - delay;
    const sourceState = interpolateBodyState(samples, `${layerData.layer}${polarity}`, historyTime);
    if (!sourceState) {
      missingHistoryLookups += 1;
      continue;
    }
    const weight = rootWeight(root);
    const wake = wakeKernelFromHistory(layerData, sourceState, direction, historyTime, params);
    weightedWake = cAdd(weightedWake, cScale(wake, weight));
    totalWeight += weight;
  }
  return {
    wake: totalWeight > 0 ? cScale(weightedWake, 1 / totalWeight) : null,
    root_weight_total: totalWeight,
    missing_history_lookups: missingHistoryLookups,
  };
}

function computeLayerStage(row, layerData, segment, stage, params) {
  const period = segment.period ?? row.closure_labels?.T_k ?? row.geometry?.commonPeriod;
  if (!Number.isFinite(period) || period <= 0) {
    throw new Error(`Row ${row.row} does not expose a positive cycle period.`);
  }
  const samples = sortedHistorySamples(segment);
  const rootsBySource = rootsBySourceForLayer(segment, layerData.layer);
  const directions = fibonacciDirections(stage.sample_count);
  const directionWeight = 1 / directions.length;
  let weightedAmplitude = { re: 0, im: 0 };
  let weightedNormSquared = 0;
  let measureNormalizer = 0;
  let missingHistoryLookups = 0;
  const missingRootChannels = new Set();
  const rootChannelCounts = {};

  for (const direction of directions) {
    const exposure = exposureWeight(layerData, direction, params.sigmaAx, params.apertureWidth);
    measureNormalizer += exposure * directionWeight;
    let cycleAverage = { re: 0, im: 0 };
    for (let timeIndex = 0; timeIndex < stage.sample_count; timeIndex += 1) {
      const t = (period * timeIndex) / stage.sample_count;
      let polaritySum = { re: 0, im: 0 };
      for (const polarity of POLARITIES) {
        const bodyId = `${layerData.layer}${polarity}`;
        const roots = rootsBySource[bodyId] ?? [];
        rootChannelCounts[bodyId] = roots.length;
        if (roots.length === 0) {
          missingRootChannels.add(bodyId);
          continue;
        }
        const rootedWake = computeRootedPolarityWake(samples, layerData, polarity, direction, t, roots, {
          ...params,
          eta: stage.eta,
        });
        missingHistoryLookups += rootedWake.missing_history_lookups;
        if (!rootedWake.wake) {
          continue;
        }
        polaritySum = cAdd(polaritySum, cScale(rootedWake.wake, POLARITY_CHARGE[polarity]));
      }
      cycleAverage = cAdd(cycleAverage, cScale(polaritySum, 1 / stage.sample_count));
    }
    const projected = cScale(cycleAverage, exposure);
    weightedAmplitude = cAdd(weightedAmplitude, cScale(projected, directionWeight));
    weightedNormSquared += directionWeight * exposure * cAbs(cycleAverage) ** 2;
  }

  const safeNormalizer = Math.max(measureNormalizer, Number.EPSILON);
  const amplitude = cScale(weightedAmplitude, 1 / safeNormalizer);
  const normValue = Math.sqrt(weightedNormSquared / safeNormalizer);
  return {
    nu: stage.nu,
    sample_count: stage.sample_count,
    eta: stage.eta,
    measure_normalizer: measureNormalizer,
    amplitude: complexRecord(amplitude),
    norm_mu_W_L: normValue,
    active_root_channels: rootChannelCounts,
    missing_root_channels: [...missingRootChannels],
    missing_history_lookups: missingHistoryLookups,
    kernel_status:
      missingRootChannels.size === 0 && missingHistoryLookups === 0
        ? "history-kernel-computed"
        : "history-kernel-incomplete",
  };
}

function layerDrift(stages) {
  if (stages.length < 2) {
    return {
      amplitude_relative_drift: null,
      norm_relative_drift: null,
    };
  }
  const prior = stages[stages.length - 2];
  const last = stages[stages.length - 1];
  const priorAmplitude = { re: prior.amplitude.re, im: prior.amplitude.im };
  const lastAmplitude = { re: last.amplitude.re, im: last.amplitude.im };
  const amplitudeScale = Math.max(cAbs(lastAmplitude), cAbs(priorAmplitude), Number.EPSILON);
  const normScale = Math.max(last.norm_mu_W_L, prior.norm_mu_W_L, Number.EPSILON);
  return {
    amplitude_relative_drift: cAbs(cSub(lastAmplitude, priorAmplitude)) / amplitudeScale,
    norm_relative_drift: Math.abs(last.norm_mu_W_L - prior.norm_mu_W_L) / normScale,
  };
}

function rowDefaults(tier0, row, args) {
  const outerRadius = row.geometry?.radii?.O ?? Math.max(...Object.values(row.geometry?.radii ?? { O: 1 }));
  const orientationSign = row.z_lambda?.orientation_class?.chi_N;
  return {
    RRel: args.RRel ?? 4 * outerRadius,
    c: args.c ?? tier0.sea_cell?.c_f ?? 1,
    sigmaAx: args.sigmaAx ?? (orientationSign === -1 ? -1 : 1),
    apertureWidth: args.apertureWidth,
  };
}

function prototypeFailureCode(row, sourceReady, historyReadiness, incompleteKernel, nonzeroNorm, driftPass) {
  if (!sourceReady) {
    return row.failure_code;
  }
  if (!historyReadiness.ready) {
    return historyReadiness.failure_code;
  }
  if (incompleteKernel) {
    return "weak-emitter-not-computed";
  }
  if (!nonzeroNorm) {
    return "weak-emitter-zero-norm";
  }
  if (!driftPass) {
    return "weak-emitter-refinement-drift";
  }
  return "weak-emitter-not-computed";
}

function prototypeStatus(sourceReady, historyReadiness, incompleteKernel, nonzeroNorm, driftPass) {
  if (!sourceReady) {
    return "source-row-not-ready";
  }
  if (!historyReadiness.ready) {
    return historyReadiness.reason;
  }
  if (incompleteKernel) {
    return "history-kernel-incomplete";
  }
  if (!nonzeroNorm) {
    return "prototype-zero-norm";
  }
  if (!driftPass) {
    return "prototype-refinement-drift";
  }
  return "prototype-converged-not-ready";
}

function rowPacket(tier0, row, args) {
  const sourceReady = row.status === "tier0_continuation_ready";
  const tierSelector = tierSelectorFor(row, args.tierSelector);
  const etaLadder = args.etaLadder ?? defaultEtaLadder(tier0, row);
  const stages = refinementStages(args.sampleCounts, etaLadder);
  const params = rowDefaults(tier0, row, args);
  const layers = reconstructLayers(row);
  const layerChannels = {};
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const historySegment = args.historySegmentsByRow?.get(row.row) ?? null;
  const historyReadiness = historySegmentReadiness(historySegment, row, tierSelector.active_layers);
  const rootDiagnostics = historySegment ? rootLedgerDiagnostics(historySegment) : null;
  const rootFieldDiagnostics = historySegment ? activeRootFieldDiagnostics(historySegment) : null;
  const rootSourceCoverageDiagnostics = historySegment
    ? activeRootSourceCoverageDiagnostics(historySegment, tierSelector.active_layers)
    : null;
  const coverageDiagnostics = historySegment ? historyCoverageDiagnostics(historySegment, row) : null;
  const bodyStateDiagnostics = historySegment ? bodyStateVectorDiagnostics(historySegment) : null;
  const sampleTimeDiagnostics = historySegment ? historySampleTimeDiagnostics(historySegment) : null;
  const canCompute = sourceReady && historyReadiness.ready;

  for (const layer of tierSelector.active_layers) {
    if (!canCompute) {
      layerChannels[layer] = {
        status: "not-computed",
        schema_status: "provisional",
        formula:
          "L_layer^(W,Lambda_tier,nu) = Pi_weak <sum_sigma q_layer,sigma W_layer,sigma^(nu)> over T_k, using an accepted state/history segment and active causal-root ledger.",
        reason: sourceReady ? historyReadiness.reason : "source-row-not-ready",
        final_stage: null,
        refinement_stages: [],
        refinement_drift: {
          amplitude_relative_drift: null,
          norm_relative_drift: null,
        },
      };
      continue;
    }
    const stageValues = stages.map((stage) => computeLayerStage(row, layers[layer], historySegment, stage, params));
    const last = stageValues[stageValues.length - 1];
    const incompleteStage = stageValues.find((stage) => stage.kernel_status !== "history-kernel-computed");
    layerChannels[layer] = {
      status: incompleteStage ? "history-kernel-incomplete" : "prototype-computed",
      schema_status: "provisional",
      formula:
        "L_layer^(W,Lambda_tier,nu) = Pi_weak <sum_sigma q_layer,sigma W_layer,sigma^(nu)> over T_k, using an accepted state/history segment and active causal-root ledger.",
      per_polarity_wake_diagnostics: {
        status: "root-weighted-charge-cycle-sum",
        polarities: POLARITIES,
        root_weight_rule: `relation_weight / max(abs(J), ${ROOT_J_FLOOR})`,
        note:
          "Per-polarity W_layer,sigma^(nu) contributions are reconstructed at delayed source states selected by active causal-root records, then emitted after the charge-weighted layer sum.",
      },
      final_stage: last,
      refinement_stages: stageValues,
      refinement_drift: layerDrift(stageValues),
    };
  }

  const computedChannels = Object.values(layerChannels).filter((channel) => channel.final_stage);
  const incompleteKernel = computedChannels.some((channel) => channel.status === "history-kernel-incomplete");
  const finalNorms = computedChannels.map((channel) => channel.final_stage.norm_mu_W_L);
  const activeTierNorm =
    computedChannels.length === tierSelector.active_layers.length
      ? finalNorms.reduce((sum, value) => sum + value, 0)
      : null;
  const maxNormDrift =
    computedChannels.length > 0
      ? Math.max(...computedChannels.map((channel) => channel.refinement_drift.norm_relative_drift ?? 0))
      : null;
  const maxAmplitudeDrift =
    computedChannels.length > 0
      ? Math.max(...computedChannels.map((channel) => channel.refinement_drift.amplitude_relative_drift ?? 0))
      : null;
  const driftPass =
    maxNormDrift !== null &&
    maxAmplitudeDrift !== null &&
    maxNormDrift <= args.driftTolerance &&
    maxAmplitudeDrift <= args.driftTolerance;
  const nonzeroNorm = typeof activeTierNorm === "number" && activeTierNorm > Number.EPSILON;
  const failureCode = prototypeFailureCode(
    row,
    sourceReady,
    historyReadiness,
    incompleteKernel,
    nonzeroNorm,
    driftPass
  );
  const rowPrototypeStatus = prototypeStatus(
    sourceReady,
    historyReadiness,
    incompleteKernel,
    nonzeroNorm,
    driftPass
  );
  const status = sourceReady && historyReadiness.ready && !incompleteKernel && nonzeroNorm && driftPass ? "candidate" : "failed";

  return {
    row: row.row,
    schema: "provisional-a0-tier1-weak-retained-emitter-prototype/v1",
    schema_status: "provisional",
    status,
    prototype_status: rowPrototypeStatus,
    failure_code: failureCode,
    source_row_status: row.status,
    source_row_failure_code: row.failure_code,
    source_weak_handoff_status: row.weak_retained_amplitude_handoff?.status ?? null,
    history_segment: {
      status: historySegment?.status ?? "missing",
      readiness: historyReadiness,
      sample_count: historySegment ? sortedHistorySamples(historySegment).length : 0,
      period: historySegment?.period ?? null,
      history_window: historySegment?.history_window ?? historySegment?.historyWindow ?? null,
      sample_times: sampleTimeDiagnostics,
      active_root_ledger: rootDiagnostics,
      active_root_fields: rootFieldDiagnostics,
      active_root_source_coverage: rootSourceCoverageDiagnostics,
      coverage: coverageDiagnostics,
      body_state_vectors: bodyStateDiagnostics,
    },
    source_row: {
      branch_label: row.branch_label ?? null,
      z_lambda: row.z_lambda ?? null,
      root_ledger: row.root_ledger ?? null,
      residual_values: row.residual_values ?? null,
      Delta_k: row.Delta_k ?? null,
      certificate_gates: row.certificate_gates ?? null,
      promotion_boundary: row.promotion_boundary ?? null,
    },
    tier_selector: tierSelector,
    weak_inputs: {
      R_rel: {
        value: params.RRel,
        status: args.RRel ? "cli_supplied_prototype_input" : "prototype_default_outer_radius_multiple",
      },
      c: {
        value: params.c,
        status: args.c ? "cli_supplied_prototype_input" : "source_sea_cell_c_f",
      },
      sigma_ax: {
        value: params.sigmaAx,
        status: args.sigmaAx ? "cli_supplied_prototype_input" : "source_orientation_sign",
      },
      eta_a_h: {
        value: "left axial exposure weight from carrier normal and sample direction",
        status: "provisional_diagnostic_model",
      },
      polar_site_aperture: {
        value: `exponential aperture with width ${params.apertureWidth}`,
        status: args.apertureWidth ? "cli_supplied_prototype_input" : "prototype_default",
      },
      rho_core: {
        value: null,
        status: "not_reconstructed",
      },
      chi_sea: {
        value: tier0.sea_cell?.chi_sea ?? null,
        status: Object.hasOwn(tier0.sea_cell ?? {}, "chi_sea")
          ? "source_homogeneous_rest_cell_input"
          : "not_reconstructed",
      },
      local_noether_sea_state: {
        value: tier0.sea_cell ?? null,
        status: "source_tier0_rest_cell",
      },
    },
    weak_measure_model: {
      schema_status: "provisional",
      handedness: "L",
      measure: "discrete direction average with exposure weight eta_a^(L) A_a(x;R_rel)",
      rho_core: null,
      chi_sea: tier0.sea_cell?.chi_sea ?? null,
      normalizer: "computed per layer and refinement stage",
    },
    weak_exposure_map: {
      schema_status: "provisional",
      Pi_weak:
        "left axial diagnostic projection retaining the carrier transverse wake weighted by polar-site aperture",
      Q_weak: null,
      retained_labels: [
        "weak-coupling-triad exposure",
        "axial-frame branch data",
        "chirality channel",
        "flavor-overlap data",
        "weak-corridor provenance",
      ],
      discarded_labels: [],
      readiness_blocker:
        "This prototype does not prove that the retained labels form one accepted weak-visible domain.",
      failure_code_if_domain_splits: "weak-emitter-split-domain",
    },
    phase_handoff: {
      status: row.z_lambda?.phase_offset_quotient?.status ? "source_quotient_data_only" : "missing",
      phase_offset_quotient: row.z_lambda?.phase_offset_quotient ?? null,
      handedness: row.z_lambda?.handedness ?? row.branch_label?.handedness ?? null,
      orientation_class: row.z_lambda?.orientation_class ?? null,
      branch_class: row.z_lambda?.branch_class ?? row.branch_label ?? null,
      failure_code_if_ambiguous: "weak-emitter-phase-underdetermined",
    },
    reconstruction_kernel: {
      schema_status: "provisional",
      W_layer_sigma_nu:
        "history-interpolated transverse causal wake with phase omega_layer * (t_root - |x-s_layer,sigma(t_root)|/c) and eta-mollified distance",
      source_state_rule:
        "For each active causal-root record, interpolate source state at t_root = t - delay from the accepted history segment.",
      root_weight_rule: `relation_weight / max(abs(J), ${ROOT_J_FLOOR})`,
      cycle_average: "uniform average over the row's T_k using sample_count points",
      direction_rule: "Fibonacci-sphere angular samples at radius R_rel",
      benchmark_inputs_excluded: [
        "CKM magnitude",
        "CKM angle",
        "charged-lepton mass ratio",
        "particle mass",
        "CKM-derived transport action",
      ],
    },
    layer_channels: layerChannels,
    active_tier_norm: {
      formula:
        "N_active = sum_{layer in I_Lambda_tier} ||L_layer^(W,Lambda_tier)||_{mu_W^(L)}",
      value: activeTierNorm,
      status: activeTierNorm === null ? "not-computed" : nonzeroNorm ? "nonzero" : "zero",
      failure_code_if_zero: "weak-emitter-zero-norm",
    },
    refinement: {
      status: computedChannels.length === 0 ? "not-computed" : driftPass ? "pass" : "fail",
      extraction_radius: params.RRel,
      angular_resolution: stages.map((stage) => stage.sample_count),
      cycle_window: period,
      Delta_t: stages.map((stage) => ({
        nu: stage.nu,
        value: period === null ? null : period / stage.sample_count,
      })),
      history_depth: row.state_vector?.historyWindow ?? null,
      eta: etaLadder,
      norm_deltas: Object.fromEntries(
        Object.entries(layerChannels).map(([layer, channel]) => [
          layer,
          channel.refinement_drift?.norm_relative_drift ?? null,
        ])
      ),
      amplitude_deltas: Object.fromEntries(
        Object.entries(layerChannels).map(([layer, channel]) => [
          layer,
          channel.refinement_drift?.amplitude_relative_drift ?? null,
        ])
      ),
      convergence_status:
        computedChannels.length === 0
          ? "not-computed"
          : driftPass
            ? "prototype_drift_within_tolerance"
            : "prototype_drift_above_tolerance",
      failure_code_if_drift: "weak-emitter-refinement-drift",
    },
    refinement_drift: {
      max_norm_relative_drift: maxNormDrift,
      max_amplitude_relative_drift: maxAmplitudeDrift,
      tolerance: args.driftTolerance,
      status: computedChannels.length === 0 ? "not-computed" : driftPass ? "pass" : "fail",
      failure_code_if_fail: "weak-emitter-refinement-drift",
    },
    standard_model_handoff: {
      status: "blocked",
      failure_code: prototypeFailureCode === "weak-emitter-not-computed" ? "weak-emitter-not-computed" : prototypeFailureCode,
      reason:
        "The packet is a provisional direct-history reconstruction. It is not weak-emitter-ready until accepted Pi_weak/Q_weak, phase quotient closure, and convergence under declared refinement all pass.",
    },
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to construct this prototype.",
  };
}

function run(tier0, tier0Path, history, historyPath, args) {
  args.historySegmentsByRow = historySegmentMap(history);
  const rows = selectRows(tier0, args.rows);
  return {
    metadata: {
      artifact: "a0-tier1-weak-retained-emitter-prototype",
      schema_status: "provisional",
      status: "direct-history-kernel-prototype",
      generatedAt: new Date().toISOString(),
      sourceTier0: path.relative(process.cwd(), tier0Path),
      sourceHistory: historyPath ? path.relative(process.cwd(), historyPath) : null,
      rowSelector: args.rows,
      note:
        "This packet computes a provisional weak-retained causal-wake reconstruction only when an accepted state/history segment and active causal-root ledger are supplied. It does not emit weak-emitter-ready.",
    },
    source_tier0_metadata: tier0.metadata ?? null,
    selected_row_count: rows.length,
    global_readiness_boundary: {
      pass_statement:
        "A row can feed a Standard Model shielding envelope only after weak-emitter-ready, finite nonzero active-tier norm, accepted Pi_weak/Q_weak, phase quotient closure, and refinement convergence.",
      current_packet_boundary:
        "This prototype can report nonzero norm and refinement drift from accepted history input, but keeps Standard Model handoff blocked.",
      failure_modes: [
        "weak-emitter-zero-norm",
        "weak-emitter-phase-underdetermined",
        "weak-emitter-refinement-drift",
        "weak-emitter-split-domain",
        "weak-emitter-benchmark-fit",
        "weak-emitter-not-computed",
      ],
    },
    rows: rows.map((row) => rowPacket(tier0, row, args)),
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const tier0Path = requireTier0Path(args);
  const tier0 = readJson(tier0Path);
  const historyPath = optionalResolvedPath(args.history);
  const history = historyPath ? readJson(historyPath) : null;
  const output = run(tier0, tier0Path, history, historyPath, args);
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
