#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULTS, run } from "./assembly-dynamics-toy.mjs";

const CONVERGENCE_DEFAULTS = {
  baseDt: DEFAULTS.dt,
  levels: 3,
  refinementFactor: 2,
  horizon: null,
  steps: DEFAULTS.steps,
  storedFrames: 240,
  radiusTolerance: 0.02,
  pathTolerance: 0.05,
  haltTimeTolerance: null,
  captureRatio: 0.75,
  inwardRatio: 0.9,
  escapeRatio: 1.5,
  turnaroundRatio: 1.2,
  out: "/tmp/assembly-dynamics-convergence.json",
  csv: "/tmp/assembly-dynamics-convergence.csv",
  svg: "/tmp/assembly-dynamics-convergence.svg",
  pretty: false,
};

const RUN_KEYS = new Set([
  "particles",
  "radius",
  "radialSpeed",
  "tangentialSpeed",
  "driftX",
  "driftY",
  "cf",
  "kappa",
  "selfHitGain",
  "jacobianFloor",
  "maxAcceleration",
  "shellK",
  "shellRadius",
  "minDelay",
  "singularityTolerance",
  "rootTolerance",
  "memoryDepth",
  "historyMode",
  "historyMargin",
  "historySafetyFactor",
  "historyMaxDepth",
  "rootHaltPolicy",
]);

const COLORS = ["#0b6bcb", "#c2410c", "#0f766e", "#7c3aed", "#be123c", "#ca8a04"];

function parseArgs(argv) {
  const args = { ...CONVERGENCE_DEFAULTS, ...pickRunDefaults(), help: false };
  const numberKeys = new Set([
    "baseDt",
    "levels",
    "refinementFactor",
    "horizon",
    "steps",
    "storedFrames",
    "radiusTolerance",
    "pathTolerance",
    "haltTimeTolerance",
    "captureRatio",
    "inwardRatio",
    "escapeRatio",
    "turnaroundRatio",
    ...[...RUN_KEYS].filter((key) => typeof DEFAULTS[key] === "number"),
  ]);

  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (raw === "--help" || raw === "-h") {
      args.help = true;
      continue;
    }
    if (raw === "--pretty") {
      args.pretty = true;
      continue;
    }
    if (!raw.startsWith("--")) {
      throw new Error(`Unknown positional argument: ${raw}`);
    }
    const key = optionKey(raw.slice(2).replaceAll("-", ""));
    if (!(key in args)) {
      throw new Error(`Unknown option: ${raw}`);
    }
    if (i + 1 >= argv.length) {
      throw new Error(`Missing value for ${raw}`);
    }
    const value = argv[++i];
    args[key] = numberKeys.has(key) ? finiteNumber(value, raw) : value;
  }

  args.levels = positiveInteger(args.levels, "--levels");
  args.steps = positiveInteger(args.steps, "--steps");
  args.storedFrames = positiveInteger(args.storedFrames, "--stored-frames");
  for (const key of ["baseDt", "refinementFactor", "radiusTolerance", "pathTolerance"]) {
    if (args[key] <= 0) {
      throw new Error(`--${kebabCase(key)} must be positive.`);
    }
  }
  if (args.horizon !== null && args.horizon <= 0) {
    throw new Error("--horizon must be positive.");
  }
  if (args.haltTimeTolerance !== null && args.haltTimeTolerance < 0) {
    throw new Error("--halt-time-tolerance must be nonnegative.");
  }
  validateRunConfig(args);
  return args;
}

function pickRunDefaults() {
  return Object.fromEntries([...RUN_KEYS].map((key) => [key, DEFAULTS[key]]));
}

function optionKey(key) {
  const aliases = {
    basedt: "baseDt",
    csv: "csv",
    escape: "escapeRatio",
    escaperatio: "escapeRatio",
    help: "help",
    haltimetolerance: "haltTimeTolerance",
    halttimetolerance: "haltTimeTolerance",
    historymargin: "historyMargin",
    historymaxdepth: "historyMaxDepth",
    historymode: "historyMode",
    historysafetyfactor: "historySafetyFactor",
    horizon: "horizon",
    inward: "inwardRatio",
    inwardratio: "inwardRatio",
    levels: "levels",
    out: "out",
    pathtolerance: "pathTolerance",
    pretty: "pretty",
    radiustolerance: "radiusTolerance",
    refinementfactor: "refinementFactor",
    rootfailurepolicy: "rootHaltPolicy",
    roothaltpolicy: "rootHaltPolicy",
    storedframes: "storedFrames",
    svg: "svg",
    turnaroundratio: "turnaroundRatio",
    ...Object.fromEntries([...RUN_KEYS].map((runKey) => [runKey.toLowerCase(), runKey])),
    cf: "cf",
    dt: "baseDt",
    driftx: "driftX",
    drifty: "driftY",
    jacobianfloor: "jacobianFloor",
    maxacceleration: "maxAcceleration",
    memorydepth: "memoryDepth",
    mindelay: "minDelay",
    radialspeed: "radialSpeed",
    selfhitgain: "selfHitGain",
    shellk: "shellK",
    shellradius: "shellRadius",
    tangentialspeed: "tangentialSpeed",
  };
  return aliases[key] ?? key;
}

function kebabCase(key) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function finiteNumber(value, label) {
  if (value === "null") {
    return null;
  }
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function positiveInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return number;
}

function validateRunConfig(args) {
  if (!["deep", "adaptive", "fixed"].includes(args.historyMode)) {
    throw new Error("--history-mode must be one of: deep, adaptive, fixed.");
  }
  if (!["partner", "all", "none"].includes(args.rootHaltPolicy)) {
    throw new Error("--root-halt-policy must be one of: partner, all, none.");
  }
  for (const key of ["particles", "steps"]) {
    if (!Number.isInteger(args[key]) || args[key] <= 0) {
      throw new Error(`--${kebabCase(key)} must be a positive integer.`);
    }
  }
  if (args.particles < 2) {
    throw new Error("--particles must be at least 2.");
  }
  for (const key of ["radius", "cf", "memoryDepth", "historySafetyFactor"]) {
    if (args[key] <= 0) {
      throw new Error(`--${kebabCase(key)} must be positive.`);
    }
  }
  for (const key of ["jacobianFloor", "maxAcceleration", "shellK", "shellRadius", "minDelay", "singularityTolerance", "rootTolerance", "historyMargin", "historyMaxDepth"]) {
    if (args[key] < 0) {
      throw new Error(`--${kebabCase(key)} must be nonnegative.`);
    }
  }
}

function printHelp() {
  console.log(`Usage: node scripts/simulations/assembly-dynamics-convergence.mjs [options]

Runs the same assembly-dynamics initial condition across a dt refinement ladder
and labels the result stable, sensitive, or not_converged.

Convergence options:
  --base-dt X              Coarsest dt. Default: ${CONVERGENCE_DEFAULTS.baseDt}
  --levels N               Number of dt levels. Default: ${CONVERGENCE_DEFAULTS.levels}
  --refinement-factor X    dt divisor between levels. Default: ${CONVERGENCE_DEFAULTS.refinementFactor}
  --steps N                Coarse-level step count if --horizon is omitted. Default: ${CONVERGENCE_DEFAULTS.steps}
  --horizon X              Shared physical time horizon. Default: base-dt * steps
  --stored-frames N        Approximate stored frames per run. Default: ${CONVERGENCE_DEFAULTS.storedFrames}
  --radius-tolerance X     Relative tolerance for min/final shell radius. Default: ${CONVERGENCE_DEFAULTS.radiusTolerance}
  --path-tolerance X       RMS particle-0 path tolerance normalized by initial shell radius. Default: ${CONVERGENCE_DEFAULTS.pathTolerance}
  --halt-time-tolerance X  Halt-time tolerance; default: 2 * base-dt
  --out PATH               Write JSON. Default: ${CONVERGENCE_DEFAULTS.out}
  --csv PATH               Write CSV. Default: ${CONVERGENCE_DEFAULTS.csv}
  --svg PATH               Write path/radius overlay SVG. Default: ${CONVERGENCE_DEFAULTS.svg}
  --pretty                 Pretty-print JSON.

Simulation options mirror assembly-dynamics-toy.mjs, including:
  --particles, --radius, --radial-speed, --tangential-speed, --drift-x,
  --drift-y, --cf, --kappa, --self-hit-gain,
  --jacobian-floor, --max-acceleration, --shell-k, --shell-radius,
  --min-delay, --singularity-tolerance, --root-tolerance, --memory-depth,
  --history-mode, --history-margin, --history-safety-factor,
  --history-max-depth, --root-halt-policy.`);
}

function runConfigFromArgs(args, dt, steps, stride) {
  const config = {};
  for (const key of RUN_KEYS) {
    config[key] = args[key];
  }
  return {
    ...config,
    dt,
    steps,
    stride,
    out: null,
    csv: null,
    svg: null,
    pretty: false,
  };
}

function runConvergence(args) {
  const horizon = args.horizon ?? args.baseDt * args.steps;
  const haltTimeTolerance = args.haltTimeTolerance ?? 2 * args.baseDt;
  const runs = [];
  const fullResults = [];

  for (let level = 0; level < args.levels; level += 1) {
    const dt = args.baseDt / args.refinementFactor ** level;
    const steps = Math.max(1, Math.round(horizon / dt));
    const stride = Math.max(1, Math.round(steps / args.storedFrames));
    const result = run(runConfigFromArgs(args, dt, steps, stride));
    const metrics = summarizeRun(result, level, dt, steps, stride, horizon, args);
    runs.push(metrics);
    fullResults.push(result);
  }

  const comparisons = [];
  for (let i = 0; i < fullResults.length - 1; i += 1) {
    comparisons.push(compareRuns(runs[i], runs[i + 1], fullResults[i], fullResults[i + 1], args, haltTimeTolerance));
  }

  const verdict = classifyConvergence(runs, comparisons);
  const report = {
    model: "assembly-dynamics-convergence",
    purpose: "Run a dt refinement ladder against the same assembly-dynamics initial condition and classify numerical convergence.",
    convention: "stable means the finest adjacent pair agrees within configured tolerances and all coarser levels agree; sensitive means the finest pair agrees but at least one coarser level does not; not_converged means the finest pair or required root status is not trustworthy.",
    simulation_config: Object.fromEntries([...RUN_KEYS].map((key) => [key, args[key]])),
    ladder: {
      base_dt: args.baseDt,
      levels: args.levels,
      refinement_factor: args.refinementFactor,
      horizon,
      stored_frames: args.storedFrames,
    },
    tolerances: {
      radius_relative: args.radiusTolerance,
      path_rms_relative: args.pathTolerance,
      halt_time: haltTimeTolerance,
    },
    verdict,
    runs,
    comparisons,
  };
  return { report, fullResults };
}

function summarizeRun(result, level, dt, steps, stride, horizon, args) {
  const frames = result.frames;
  const initial = result.summary.initial;
  const final = result.summary.final;
  const radiusRecords = frames.map((frame) => ({
    t: frame.t,
    radius: frame.shell_radius,
  }));
  const minRecord = radiusRecords.reduce((best, record) => record.radius < best.radius ? record : best, radiusRecords[0]);
  const maxRecord = radiusRecords.reduce((best, record) => record.radius > best.radius ? record : best, radiusRecords[0]);
  const outcome = classifyRunOutcome(result, minRecord, args);
  const aggregate = result.summary.aggregate_hit_stats;
  return {
    level,
    dt,
    steps,
    stride,
    requested_horizon: horizon,
    completed: result.completed,
    status: result.summary.status,
    outcome,
    final_time: final.t,
    final_radius: final.shell_radius,
    min_radius: minRecord.radius,
    min_radius_time: minRecord.t,
    max_radius: maxRecord.radius,
    final_energy_proxy: final.conserved_quantities.energy_proxy,
    delta_energy_proxy: result.summary.drift.delta_energy_proxy,
    delta_angular_momentum_z: result.summary.drift.delta_angular_momentum_z,
    error_code: result.error?.code ?? null,
    error_message: result.error?.message ?? null,
    halt_time: result.error?.t ?? null,
    halt_attempted_step: result.error?.attempted_step ?? null,
    total_partner_hits: aggregate.total_partner_hits,
    total_self_hits: aggregate.total_self_hits,
    total_unresolved_roots: aggregate.total_unresolved_roots,
    total_partner_unresolved_roots: aggregate.total_partner_unresolved_roots,
    total_self_unresolved_roots: aggregate.total_self_unresolved_roots,
    root_failure_reasons: aggregate.root_failure_reasons,
    partner_root_failure_reasons: aggregate.partner_root_failure_reasons,
    self_root_failure_reasons: aggregate.self_root_failure_reasons,
    max_roots_per_pair: aggregate.max_roots_per_pair,
    max_abs_acceleration: aggregate.max_abs_acceleration,
    history: result.summary.history,
    frame_count: frames.length,
    initial_radius: initial.shell_radius,
  };
}

function classifyRunOutcome(result, minRecord, args) {
  if (!result.completed) {
    return classifyHaltOutcome(result.error?.code);
  }
  const initialRadius = result.summary.initial.shell_radius;
  const finalRadius = result.summary.final.shell_radius;
  const finalRatio = finalRadius / initialRadius;
  const minRatio = minRecord.radius / initialRadius;
  const turnedAround = minRecord.t < result.summary.final.t && finalRadius / Math.max(minRecord.radius, 1e-12) >= args.turnaroundRatio;

  if (finalRatio <= args.captureRatio && Math.abs(result.summary.final.t - minRecord.t) <= result.config.dt * result.config.stride) {
    return "sustained_inward";
  }
  if (finalRatio >= args.escapeRatio) {
    return "outward_escape";
  }
  if (minRatio <= args.inwardRatio && turnedAround) {
    return "inward_turnaround";
  }
  if (Math.abs(finalRatio - 1) <= 0.1 && minRatio > args.inwardRatio) {
    return "near_circular";
  }
  return "weak_change";
}

function classifyHaltOutcome(code) {
  if (code === "UNRESOLVED_CAUSAL_ROOT") {
    return "root_unresolved_halt";
  }
  if (code === "SINGULAR_CAUSAL_ROOT") {
    return "singular_causal_root_halt";
  }
  if (code === "JACOBIAN_FLOOR_VIOLATION") {
    return "jacobian_floor_halt";
  }
  if (code === "ACCELERATION_LIMIT_EXCEEDED") {
    return "acceleration_limit_halt";
  }
  if (code === "NONFINITE_ACCELERATION" || code === "NONFINITE_STATE") {
    return "nonfinite_halt";
  }
  return "halted";
}

function compareRuns(coarse, fine, coarseResult, fineResult, args, haltTimeTolerance) {
  const finalRadiusRelDelta = relativeDelta(coarse.final_radius, fine.final_radius);
  const minRadiusRelDelta = relativeDelta(coarse.min_radius, fine.min_radius);
  const path = pathDelta(coarseResult, fineResult);
  const sameOutcome = coarse.outcome === fine.outcome;
  const sameErrorCode = coarse.error_code === fine.error_code;
  const samePartnerFailureReasons =
    stableStringify(coarse.partner_root_failure_reasons) === stableStringify(fine.partner_root_failure_reasons);
  const haltTimeDelta = coarse.halt_time !== null || fine.halt_time !== null
    ? Math.abs((coarse.halt_time ?? coarse.final_time) - (fine.halt_time ?? fine.final_time))
    : 0;
  const finalRadiusStable = finalRadiusRelDelta <= args.radiusTolerance;
  const minRadiusStable = minRadiusRelDelta <= args.radiusTolerance;
  const radiusStable = finalRadiusStable && minRadiusStable;
  const pathStable = path.path_rms_normalized <= args.pathTolerance;
  const haltStable = haltTimeDelta <= haltTimeTolerance;
  const passes = sameOutcome && sameErrorCode && samePartnerFailureReasons && radiusStable && pathStable && haltStable;
  const reasons = [];
  if (!sameOutcome) reasons.push("outcome_changed");
  if (!sameErrorCode) reasons.push("error_code_changed");
  if (!samePartnerFailureReasons) reasons.push("partner_root_failure_reasons_changed");
  if (!finalRadiusStable) reasons.push("final_radius_delta_exceeds_tolerance");
  if (!minRadiusStable) reasons.push("min_radius_delta_exceeds_tolerance");
  if (!pathStable) reasons.push("path_delta_exceeds_tolerance");
  if (!haltStable) reasons.push("halt_time_delta_exceeds_tolerance");

  return {
    coarse_level: coarse.level,
    fine_level: fine.level,
    coarse_dt: coarse.dt,
    fine_dt: fine.dt,
    passes,
    reasons,
    same_outcome: sameOutcome,
    same_error_code: sameErrorCode,
    same_partner_root_failure_reasons: samePartnerFailureReasons,
    final_radius_relative_delta: finalRadiusRelDelta,
    min_radius_relative_delta: minRadiusRelDelta,
    halt_time_delta: haltTimeDelta,
    ...path,
  };
}

function classifyConvergence(runs, comparisons) {
  if (runs.length < 2 || comparisons.length < 1) {
    return { label: "not_converged", reasons: ["need_at_least_two_dt_levels"] };
  }
  const finestRun = runs[runs.length - 1];
  const finestPair = comparisons[comparisons.length - 1];
  const reasons = [];
  if (!finestRun.completed) {
    reasons.push("finest_run_did_not_complete_requested_horizon");
  }
  if (finestRun.total_partner_unresolved_roots > 0) {
    reasons.push("finest_run_has_partner_unresolved_roots");
  }
  if (!finestPair.passes) {
    reasons.push("finest_adjacent_pair_failed_tolerances");
  }
  if (reasons.length > 0) {
    return { label: "not_converged", reasons, finest_pair: finestPair };
  }
  if (comparisons.every((comparison) => comparison.passes) && runs.every((run) => run.completed)) {
    return { label: "stable", reasons: ["all_adjacent_dt_pairs_passed"], finest_pair: finestPair };
  }
  return {
    label: "sensitive",
    reasons: ["finest_adjacent_pair_passed_but_coarser_levels_changed"],
    finest_pair: finestPair,
  };
}

function relativeDelta(a, b) {
  return Math.abs(a - b) / Math.max(Math.abs(b), 1e-12);
}

function pathDelta(aResult, bResult) {
  const aEnd = aResult.summary.final.t;
  const bEnd = bResult.summary.final.t;
  const end = Math.min(aEnd, bEnd);
  const samples = 101;
  let particleSum = 0;
  let radiusSum = 0;
  for (let i = 0; i < samples; i += 1) {
    const t = samples === 1 ? 0 : (end * i) / (samples - 1);
    const a = interpolateDiagnostics(aResult.frames, t);
    const b = interpolateDiagnostics(bResult.frames, t);
    particleSum += distanceSquared(a.particle0, b.particle0);
    radiusSum += (a.shell_radius - b.shell_radius) ** 2;
  }
  const scale = Math.max(aResult.summary.initial.shell_radius, bResult.summary.initial.shell_radius, 1e-12);
  return {
    compared_time_end: end,
    path_rms_delta: Math.sqrt(particleSum / samples),
    path_rms_normalized: Math.sqrt(particleSum / samples) / scale,
    shell_radius_rms_delta: Math.sqrt(radiusSum / samples),
    shell_radius_rms_normalized: Math.sqrt(radiusSum / samples) / scale,
  };
}

function interpolateDiagnostics(frames, t) {
  if (t <= frames[0].t) {
    return diagnosticsAtFrame(frames[0]);
  }
  for (let i = 1; i < frames.length; i += 1) {
    if (frames[i].t >= t) {
      const newer = frames[i];
      const older = frames[i - 1];
      const span = newer.t - older.t;
      const u = span === 0 ? 0 : (t - older.t) / span;
      return {
        particle0: lerpPoint(
          [older.particles[0].x, older.particles[0].y],
          [newer.particles[0].x, newer.particles[0].y],
          u
        ),
        shell_radius: older.shell_radius + (newer.shell_radius - older.shell_radius) * u,
      };
    }
  }
  return diagnosticsAtFrame(frames[frames.length - 1]);
}

function diagnosticsAtFrame(frame) {
  return {
    particle0: [frame.particles[0].x, frame.particles[0].y],
    shell_radius: frame.shell_radius,
  };
}

function lerpPoint(a, b, u) {
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
}

function distanceSquared(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  const entries = Object.entries(value).sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(Object.fromEntries(entries));
}

function writeJson(result, args) {
  if (!args.out) {
    return;
  }
  fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
  fs.writeFileSync(args.out, `${JSON.stringify(result, null, args.pretty ? 2 : 0)}\n`);
}

function writeCsv(result, args) {
  if (!args.csv) {
    return;
  }
  fs.mkdirSync(path.dirname(path.resolve(args.csv)), { recursive: true });
  const headers = [
    "level",
    "dt",
    "steps",
    "completed",
    "outcome",
    "final_time",
    "final_radius",
    "min_radius",
    "min_radius_time",
    "error_code",
    "halt_time",
    "total_partner_unresolved_roots",
    "max_roots_per_pair",
    "max_abs_acceleration",
    "partner_root_failure_reasons",
    "history_mode",
    "history_frame_count",
    "history_retained_depth",
  ];
  const rows = [headers.join(",")];
  for (const row of result.runs) {
    rows.push(headers.map((header) => csvCell(headerValue(row, header))).join(","));
  }
  fs.writeFileSync(args.csv, `${rows.join("\n")}\n`);
}

function headerValue(row, header) {
  if (header === "history_mode") return row.history.mode;
  if (header === "history_frame_count") return row.history.frame_count;
  if (header === "history_retained_depth") return row.history.retained_depth;
  if (header === "partner_root_failure_reasons") return stableStringify(row.partner_root_failure_reasons);
  return row[header] ?? "";
}

function csvCell(value) {
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

function writeSvg(result, args) {
  if (!args.svg) {
    return;
  }
  fs.mkdirSync(path.dirname(path.resolve(args.svg)), { recursive: true });
  const width = 960;
  const height = 620;
  const pad = 42;
  const gap = 36;
  const panelWidth = (width - 2 * pad - gap) / 2;
  const panelHeight = 430;
  const pathPanel = { x: pad, y: 70, width: panelWidth, height: panelHeight };
  const radiusPanel = { x: pad + panelWidth + gap, y: 70, width: panelWidth, height: panelHeight };
  const paths = result.runs.map((run) => run.svg_path_points ?? "");
  const allPathPoints = result.runs.flatMap((run) => run.svg_path_raw ?? []);
  const pathBounds = boundsForPoints(allPathPoints);
  const radiusBounds = boundsForRadius(result.runs);

  const pathLines = result.runs.map((run, index) => {
    const color = COLORS[index % COLORS.length];
    const points = run.svg_path_raw.map((point) => projectPoint(point, pathBounds, pathPanel)).map(formatPoint).join(" ");
    return `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.8" stroke-opacity="0.82"><title>level=${run.level}, dt=${run.dt}</title></polyline>`;
  }).join("\n  ");

  const radiusLines = result.runs.map((run, index) => {
    const color = COLORS[index % COLORS.length];
    const points = run.svg_radius_raw.map((point) => projectTimeRadius(point, radiusBounds, radiusPanel)).map(formatPoint).join(" ");
    return `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.8" stroke-opacity="0.82"><title>level=${run.level}, dt=${run.dt}</title></polyline>`;
  }).join("\n  ");

  const legend = result.runs.map((run, index) => {
    const y = height - 84 + index * 18;
    const color = COLORS[index % COLORS.length];
    return `<rect x="${pad}" y="${y - 10}" width="12" height="12" fill="${color}"/><text x="${pad + 18}" y="${y}" font-family="system-ui, sans-serif" font-size="11" fill="#334155">level ${run.level}, dt=${run.dt}, ${run.outcome}</text>`;
  }).join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Assembly dynamics convergence dt ladder">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="24" y="32" font-family="system-ui, sans-serif" font-size="18" fill="#111827">Assembly dynamics convergence: ${result.verdict.label}</text>
  <text x="24" y="54" font-family="system-ui, sans-serif" font-size="12" fill="#475569">dt ladder ${result.ladder.base_dt} / ${result.ladder.refinement_factor}, levels=${result.ladder.levels}, horizon=${result.ladder.horizon}</text>
  ${panelRect(pathPanel)}
  ${panelRect(radiusPanel)}
  <text x="${pathPanel.x}" y="${pathPanel.y - 12}" font-family="system-ui, sans-serif" font-size="12" fill="#111827">particle 0 path</text>
  <text x="${radiusPanel.x}" y="${radiusPanel.y - 12}" font-family="system-ui, sans-serif" font-size="12" fill="#111827">shell radius over time</text>
  ${pathLines}
  ${radiusLines}
  ${legend}
</svg>
`;
  fs.writeFileSync(args.svg, svg);

  for (const run of result.runs) {
    delete run.svg_path_raw;
    delete run.svg_radius_raw;
    delete run.svg_path_points;
  }
}

function addSvgSamples(result, fullResults) {
  for (let i = 0; i < result.runs.length; i += 1) {
    result.runs[i].svg_path_raw = fullResults[i].frames.map((frame) => [frame.particles[0].x, frame.particles[0].y]);
    result.runs[i].svg_radius_raw = fullResults[i].frames.map((frame) => [frame.t, frame.shell_radius]);
  }
}

function boundsForPoints(points) {
  if (points.length === 0) {
    return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
  }
  return {
    minX: Math.min(...points.map((point) => point[0])),
    maxX: Math.max(...points.map((point) => point[0])),
    minY: Math.min(...points.map((point) => point[1])),
    maxY: Math.max(...points.map((point) => point[1])),
  };
}

function boundsForRadius(runs) {
  const points = runs.flatMap((run) => run.svg_radius_raw ?? []);
  if (points.length === 0) {
    return { minT: 0, maxT: 1, minR: 0, maxR: 1 };
  }
  return {
    minT: Math.min(...points.map((point) => point[0])),
    maxT: Math.max(...points.map((point) => point[0])),
    minR: Math.min(...points.map((point) => point[1])),
    maxR: Math.max(...points.map((point) => point[1])),
  };
}

function panelRect(panel) {
  return `<rect x="${panel.x}" y="${panel.y}" width="${panel.width}" height="${panel.height}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>`;
}

function projectPoint(point, bounds, panel) {
  const spanX = Math.max(bounds.maxX - bounds.minX, 1e-12);
  const spanY = Math.max(bounds.maxY - bounds.minY, 1e-12);
  return [
    panel.x + ((point[0] - bounds.minX) / spanX) * panel.width,
    panel.y + panel.height - ((point[1] - bounds.minY) / spanY) * panel.height,
  ];
}

function projectTimeRadius(point, bounds, panel) {
  const spanT = Math.max(bounds.maxT - bounds.minT, 1e-12);
  const spanR = Math.max(bounds.maxR - bounds.minR, 1e-12);
  return [
    panel.x + ((point[0] - bounds.minT) / spanT) * panel.width,
    panel.y + panel.height - ((point[1] - bounds.minR) / spanR) * panel.height,
  ];
}

function formatPoint(point) {
  return `${point[0].toFixed(2)},${point[1].toFixed(2)}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const { report: result, fullResults } = runConvergence(args);
  if (args.svg) {
    addSvgSamples(result, fullResults);
  }
  writeSvg(result, args);
  writeJson(result, args);
  writeCsv(result, args);
  console.log(JSON.stringify({
    out: args.out,
    csv: args.csv,
    svg: args.svg,
    verdict: result.verdict,
    runs: result.runs.map((run) => ({
      level: run.level,
      dt: run.dt,
      completed: run.completed,
      outcome: run.outcome,
      min_radius: run.min_radius,
      final_radius: run.final_radius,
      total_partner_unresolved_roots: run.total_partner_unresolved_roots,
    })),
  }, null, 2));
  if (result.verdict.label === "not_converged") {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
