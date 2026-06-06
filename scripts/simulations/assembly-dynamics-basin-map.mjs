#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { DEFAULTS, run, writeSvg as writePathSvg } from "./assembly-dynamics-toy.mjs";

const BASIN_DEFAULTS = {
  radii: "0.8:1.2:0.1",
  tangentialSpeeds: "0.02:0.12:0.02",
  radialSpeeds: "-0.04:0.04:0.02",
  steps: 5000,
  dt: 0.01,
  stride: 25,
  softening: DEFAULTS.softening,
  softeningRadius: 0.16,
  jacobianFloor: DEFAULTS.jacobianFloor,
  maxAcceleration: DEFAULTS.maxAcceleration,
  rootHaltPolicy: DEFAULTS.rootHaltPolicy,
  captureRatio: 0.75,
  inwardRatio: 0.9,
  escapeRatio: 1.5,
  turnaroundRatio: 1.2,
  out: "/tmp/assembly-dynamics-basin-map.json",
  csv: "/tmp/assembly-dynamics-basin-map.csv",
  svg: "/tmp/assembly-dynamics-basin-map.svg",
  pathSvg: "/tmp/assembly-dynamics-basin-map-path.svg",
  pretty: false,
};

const CLASS_COLORS = {
  softening_floor: "#7f1d1d",
  sustained_inward: "#0f766e",
  inward_turnaround: "#ca8a04",
  near_circular: "#64748b",
  spin_out: "#c2410c",
  weak_change: "#7c3aed",
  root_unresolved_halt: "#111827",
};

function parseArgs(argv) {
  const args = { ...BASIN_DEFAULTS, help: false };
  const numericKeys = new Set([
    "steps",
    "dt",
    "stride",
    "softening",
    "softeningRadius",
    "jacobianFloor",
    "maxAcceleration",
    "captureRatio",
    "inwardRatio",
    "escapeRatio",
    "turnaroundRatio",
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
    args[key] = numericKeys.has(key) ? finiteNumber(value, raw) : value;
  }

  args.steps = positiveInteger(args.steps, "--steps");
  args.stride = positiveInteger(args.stride, "--stride");
  if (args.dt <= 0) {
    throw new Error("--dt must be positive.");
  }
  for (const key of ["softeningRadius", "softening", "captureRatio", "inwardRatio", "escapeRatio", "turnaroundRatio"]) {
    if (args[key] < 0) {
      throw new Error(`--${kebabCase(key)} must be nonnegative.`);
    }
  }
  for (const key of ["jacobianFloor", "maxAcceleration"]) {
    if (args[key] <= 0) {
      throw new Error(`--${kebabCase(key)} must be positive.`);
    }
  }
  validateRootHaltPolicy(args.rootHaltPolicy);
  return args;
}

function optionKey(key) {
  const aliases = {
    csv: "csv",
    dt: "dt",
    out: "out",
    svg: "svg",
    pathsvg: "pathSvg",
    help: "help",
    steps: "steps",
    stride: "stride",
    radii: "radii",
    pretty: "pretty",
    radialspeeds: "radialSpeeds",
    tangentialspeeds: "tangentialSpeeds",
    softening: "softening",
    softeningradius: "softeningRadius",
    jacobianfloor: "jacobianFloor",
    maxacceleration: "maxAcceleration",
    roothaltpolicy: "rootHaltPolicy",
    captureratio: "captureRatio",
    inwardratio: "inwardRatio",
    escaperatio: "escapeRatio",
    turnaroundratio: "turnaroundRatio",
  };
  return aliases[key] ?? key;
}

function kebabCase(key) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function finiteNumber(value, label) {
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

function validateRootHaltPolicy(policy) {
  if (!["partner", "all", "none"].includes(policy)) {
    throw new Error("--root-halt-policy must be one of: partner, all, none.");
  }
}

function parseSweep(value, label) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value !== "string") {
    throw new Error(`${label} must be a sweep string.`);
  }
  if (value.includes(",")) {
    return value.split(",").map((entry) => finiteNumber(entry.trim(), label));
  }
  const parts = value.split(":").map((entry) => finiteNumber(entry.trim(), label));
  if (parts.length === 1) {
    return parts;
  }
  if (parts.length !== 3) {
    throw new Error(`${label} must be a single value, comma-separated values, or start:end:step.`);
  }
  const [start, end, step] = parts;
  if (step === 0) {
    throw new Error(`${label} step must be nonzero.`);
  }
  if ((end - start) * step < 0) {
    throw new Error(`${label} step direction does not reach end.`);
  }
  const values = [];
  const epsilon = Math.abs(step) * 1e-9;
  for (let valueAt = start; step > 0 ? valueAt <= end + epsilon : valueAt >= end - epsilon; valueAt += step) {
    values.push(roundSweepValue(valueAt));
  }
  return values;
}

function roundSweepValue(value) {
  return Number(value.toFixed(12));
}

function printHelp() {
  console.log(`Usage: node scripts/simulations/assembly-dynamics-basin-map.mjs [options]

Options:
  --radii SPEC               Radius sweep. Default: ${BASIN_DEFAULTS.radii}
  --tangential-speeds SPEC   Tangential-speed sweep. Default: ${BASIN_DEFAULTS.tangentialSpeeds}
  --radial-speeds SPEC       Radial-speed sweep. Negative means inward. Default: ${BASIN_DEFAULTS.radialSpeeds}
  --steps N                  Steps per run. Default: ${BASIN_DEFAULTS.steps}
  --dt X                     Absolute-time step. Default: ${BASIN_DEFAULTS.dt}
  --stride N                 Stored-frame stride. Default: ${BASIN_DEFAULTS.stride}
  --softening X              Distance softening eta passed to each run. Use 0 to disable. Default: ${BASIN_DEFAULTS.softening}
  --softening-radius X       Close-approach classifier threshold. Use 0 to disable. Default: ${BASIN_DEFAULTS.softeningRadius}
  --jacobian-floor X         Minimum |J| in hit weight; keep tiny positive unless handling caustics. Default: ${BASIN_DEFAULTS.jacobianFloor}
  --max-acceleration X       Per-particle acceleration cap. Default: ${BASIN_DEFAULTS.maxAcceleration}
  --root-halt-policy X       Halt each run on unresolved roots: partner, all, none. Default: ${BASIN_DEFAULTS.rootHaltPolicy}
  --capture-ratio X          Final/initial radius ratio for sustained_inward. Default: ${BASIN_DEFAULTS.captureRatio}
  --inward-ratio X           Minimum/initial radius ratio for inward leg. Default: ${BASIN_DEFAULTS.inwardRatio}
  --escape-ratio X           Final/initial radius ratio for spin_out. Default: ${BASIN_DEFAULTS.escapeRatio}
  --turnaround-ratio X       Final/min radius ratio for turnaround. Default: ${BASIN_DEFAULTS.turnaroundRatio}
  --out PATH                 Write JSON. Default: ${BASIN_DEFAULTS.out}
  --csv PATH                 Write CSV. Default: ${BASIN_DEFAULTS.csv}
  --svg PATH                 Write SVG heatmap. Default: ${BASIN_DEFAULTS.svg}
  --path-svg PATH            Write trajectory SVG for the deepest sustained_inward run. Default: ${BASIN_DEFAULTS.pathSvg}
  --pretty                   Pretty-print JSON.
  --help                     Show this help.

Sweep specs accept one value, comma lists like 0.8,1,1.2, or ranges like 0.8:1.2:0.1.`);
}

function unwrapParticlePhase(frames, particleId = 0) {
  const values = [];
  let theta = frames[0].particles[particleId].phase;
  values.push(theta);
  for (let i = 1; i < frames.length; i += 1) {
    let delta = frames[i].particles[particleId].phase - frames[i - 1].particles[particleId].phase;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    theta += delta;
    values.push(theta);
  }
  return values;
}

function fitLogSpiral(points) {
  if (points.length < 3) {
    return null;
  }
  const xs = points.map((point) => point.theta);
  const ys = points.map((point) => Math.log(point.radius));
  const n = points.length;
  const meanX = xs.reduce((sum, x) => sum + x, 0) / n;
  const meanY = ys.reduce((sum, y) => sum + y, 0) / n;
  const sxx = xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
  if (sxx === 0) {
    return null;
  }
  const sxy = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0);
  const b = sxy / sxx;
  const a = meanY - b * meanX;
  const predicted = xs.map((x) => a + b * x);
  const sse = ys.reduce((sum, y, i) => sum + (y - predicted[i]) ** 2, 0);
  const sst = ys.reduce((sum, y) => sum + (y - meanY) ** 2, 0);
  return {
    points: n,
    theta_start: xs[0],
    theta_end: xs[n - 1],
    A: Math.exp(a),
    b,
    radius_multiplier_per_turn: Math.exp(b * 2 * Math.PI),
    log_rmse: Math.sqrt(sse / n),
    r2: sst === 0 ? null : 1 - sse / sst,
  };
}

function classifyRun(metrics, args) {
  if (metrics.error_code) {
    return "root_unresolved_halt";
  }
  const finalRatio = metrics.final_radius / metrics.initial_radius;
  const minRatio = metrics.min_radius / metrics.initial_radius;
  const turnedAround = metrics.min_index < metrics.frame_count - 1 &&
    metrics.final_radius / metrics.min_radius >= args.turnaroundRatio;

  if (args.softeningRadius > 0 && metrics.min_radius <= args.softeningRadius) {
    return "softening_floor";
  }
  if (finalRatio <= args.captureRatio && metrics.min_index >= metrics.frame_count - 3) {
    return "sustained_inward";
  }
  if (minRatio <= args.inwardRatio && turnedAround) {
    return "inward_turnaround";
  }
  if (finalRatio >= args.escapeRatio || (metrics.partner_root_unresolved_time !== null && finalRatio > 1)) {
    return "spin_out";
  }
  if (Math.abs(finalRatio - 1) <= 0.1 && minRatio > args.inwardRatio) {
    return "near_circular";
  }
  return "weak_change";
}

function analyzeRun(result, inputs, args) {
  const frames = result.frames;
  const theta = unwrapParticlePhase(frames);
  const radiusRecords = frames.map((frame, index) => ({
    index,
    t: frame.t,
    theta: theta[index],
    radius: frame.shell_radius,
    partner_unresolved_roots: frame.hit_stats?.partner_unresolved_roots ?? 0,
  }));
  const minRecord = radiusRecords.reduce((best, record) => record.radius < best.radius ? record : best, radiusRecords[0]);
  const maxRecord = radiusRecords.reduce((best, record) => record.radius > best.radius ? record : best, radiusRecords[0]);
  const firstUnresolvedPartnerRoot = radiusRecords.find((record) => record.partner_unresolved_roots > 0);
  const inwardPoints = radiusRecords.slice(0, minRecord.index + 1);
  const inwardFit = fitLogSpiral(inwardPoints);
  const fullFit = fitLogSpiral(radiusRecords);

  const metrics = {
    ...inputs,
    initial_radius: radiusRecords[0].radius,
    final_radius: radiusRecords[radiusRecords.length - 1].radius,
    min_radius: minRecord.radius,
    min_radius_time: minRecord.t,
    min_radius_theta: minRecord.theta,
    min_index: minRecord.index,
    max_radius: maxRecord.radius,
    final_theta: radiusRecords[radiusRecords.length - 1].theta,
    frame_count: frames.length,
    completed: result.completed,
    error_code: result.error?.code ?? null,
    error_message: result.error?.message ?? null,
    halt_time: result.error?.t ?? null,
    halt_attempted_step: result.error?.attempted_step ?? null,
    partner_root_unresolved_time: firstUnresolvedPartnerRoot?.t ?? null,
    total_partner_hits: result.summary.aggregate_hit_stats.total_partner_hits,
    total_self_hits: result.summary.aggregate_hit_stats.total_self_hits,
    total_unresolved_roots: result.summary.aggregate_hit_stats.total_unresolved_roots,
    total_partner_unresolved_roots: result.summary.aggregate_hit_stats.total_partner_unresolved_roots,
    total_self_unresolved_roots: result.summary.aggregate_hit_stats.total_self_unresolved_roots,
    delta_energy_proxy: result.summary.drift.delta_energy_proxy,
    delta_angular_momentum_z: result.summary.drift.delta_angular_momentum_z,
    inward_fit_A: inwardFit?.A ?? null,
    inward_fit_b: inwardFit?.b ?? null,
    inward_fit_r2: inwardFit?.r2 ?? null,
    inward_fit_multiplier_per_turn: inwardFit?.radius_multiplier_per_turn ?? null,
    full_fit_b: fullFit?.b ?? null,
    full_fit_r2: fullFit?.r2 ?? null,
  };
  return {
    ...metrics,
    outcome: classifyRun(metrics, args),
  };
}

function runBasinMap(args) {
  const radii = parseSweep(args.radii, "--radii");
  const tangentialSpeeds = parseSweep(args.tangentialSpeeds, "--tangential-speeds");
  const radialSpeeds = parseSweep(args.radialSpeeds, "--radial-speeds");
  const rows = [];
  let pathGraphRun = null;

  for (const radialSpeed of radialSpeeds) {
    for (const radius of radii) {
      for (const tangentialSpeed of tangentialSpeeds) {
        const result = run({
          ...DEFAULTS,
          particles: 2,
          radius,
          radialSpeed,
          tangentialSpeed,
          driftX: 0,
          driftY: 0,
          shellK: 0,
          softening: args.softening,
          jacobianFloor: args.jacobianFloor,
          maxAcceleration: args.maxAcceleration,
          rootHaltPolicy: args.rootHaltPolicy,
          steps: args.steps,
          dt: args.dt,
          stride: args.stride,
          out: null,
          csv: null,
          svg: null,
          pretty: false,
        });
        const row = analyzeRun(result, { radius, tangential_speed: tangentialSpeed, radial_speed: radialSpeed }, args);
        rows.push(row);
        if (row.outcome === "sustained_inward" && (!pathGraphRun || row.min_radius < pathGraphRun.row.min_radius)) {
          pathGraphRun = { row, result };
        }
      }
    }
  }

  const counts = rows.reduce((acc, row) => {
    acc[row.outcome] = (acc[row.outcome] ?? 0) + 1;
    return acc;
  }, {});
  const deepest = [...rows].sort((a, b) => a.min_radius - b.min_radius).slice(0, 10);
  const strongestInwardFits = [...rows]
    .filter((row) => row.inward_fit_b !== null && row.inward_fit_r2 !== null)
    .sort((a, b) => a.inward_fit_b - b.inward_fit_b)
    .slice(0, 10);

  const basinMap = {
    model: "assembly-dynamics-basin-map",
    purpose: "Classify the two-architrino basin over starting radius, tangential speed, and radial speed.",
    convention: "radial_speed < 0 means initially entering inward toward the assembly center.",
    simulation_config: {
      particles: 2,
      driftX: 0,
      driftY: 0,
      shellK: 0,
      steps: args.steps,
      dt: args.dt,
      stride: args.stride,
      softeningRadius: args.softeningRadius,
      softening: args.softening,
      jacobianFloor: args.jacobianFloor,
      maxAcceleration: args.maxAcceleration,
      rootHaltPolicy: args.rootHaltPolicy,
      captureRatio: args.captureRatio,
      inwardRatio: args.inwardRatio,
      escapeRatio: args.escapeRatio,
      turnaroundRatio: args.turnaroundRatio,
    },
    sweeps: {
      radii,
      tangential_speeds: tangentialSpeeds,
      radial_speeds: radialSpeeds,
    },
    counts,
    deepest,
    strongest_inward_fits: strongestInwardFits,
    path_graph: {
      selected_outcome: "sustained_inward",
      selection_rule: "lowest min_radius among rows classified as sustained_inward",
      svg: pathGraphRun && args.pathSvg ? args.pathSvg : null,
      configured_svg: args.pathSvg,
      status: pathGraphRun ? "selected" : "not_written_no_sustained_inward",
      selected: pathGraphRun?.row ?? null,
    },
    rows,
  };

  return { basinMap, pathGraphRun };
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
    "outcome",
    "radius",
    "tangential_speed",
    "radial_speed",
    "initial_radius",
    "final_radius",
    "min_radius",
    "min_radius_time",
    "min_radius_theta",
    "max_radius",
    "completed",
    "error_code",
    "error_message",
    "halt_time",
    "halt_attempted_step",
    "partner_root_unresolved_time",
    "total_partner_hits",
    "total_unresolved_roots",
    "total_partner_unresolved_roots",
    "total_self_unresolved_roots",
    "delta_energy_proxy",
    "delta_angular_momentum_z",
    "inward_fit_A",
    "inward_fit_b",
    "inward_fit_r2",
    "inward_fit_multiplier_per_turn",
    "full_fit_b",
    "full_fit_r2",
  ];
  const rows = [headers.join(",")];
  for (const row of result.rows) {
    rows.push(headers.map((header) => row[header] ?? "").join(","));
  }
  fs.writeFileSync(args.csv, `${rows.join("\n")}\n`);
}

function writeSvg(result, args) {
  if (!args.svg) {
    return;
  }
  fs.mkdirSync(path.dirname(path.resolve(args.svg)), { recursive: true });
  const radii = result.sweeps.radii;
  const tangentialSpeeds = result.sweeps.tangential_speeds;
  const radialSpeeds = result.sweeps.radial_speeds;
  const cell = 28;
  const gap = 34;
  const marginLeft = 76;
  const marginTop = 72;
  const panelWidth = tangentialSpeeds.length * cell;
  const panelHeight = radii.length * cell;
  const width = marginLeft + radialSpeeds.length * panelWidth + (radialSpeeds.length - 1) * gap + 36;
  const legendItemWidth = 148;
  const legendColumns = Math.max(1, Math.floor((width - marginLeft - 24) / legendItemWidth));
  const legendRows = Math.ceil(Object.keys(CLASS_COLORS).length / legendColumns);
  const legendTop = marginTop + panelHeight + 58;
  const height = legendTop + legendRows * 24 + 24;
  const byKey = new Map(result.rows.map((row) =>
    [`${row.radius}|${row.tangential_speed}|${row.radial_speed}`, row]
  ));

  const panels = radialSpeeds.map((radialSpeed, panelIndex) => {
    const x0 = marginLeft + panelIndex * (panelWidth + gap);
    const label = `<text x="${x0}" y="52" font-family="system-ui, sans-serif" font-size="12" fill="#111827">vr=${radialSpeed}</text>`;
    const cells = [];
    for (let rIndex = 0; rIndex < radii.length; rIndex += 1) {
      for (let tIndex = 0; tIndex < tangentialSpeeds.length; tIndex += 1) {
        const row = byKey.get(`${radii[rIndex]}|${tangentialSpeeds[tIndex]}|${radialSpeed}`);
        const x = x0 + tIndex * cell;
        const y = marginTop + (radii.length - 1 - rIndex) * cell;
        const color = CLASS_COLORS[row?.outcome] ?? "#f1f5f9";
        cells.push(`<rect x="${x}" y="${y}" width="${cell - 1}" height="${cell - 1}" fill="${color}"><title>R=${radii[rIndex]}, vt=${tangentialSpeeds[tIndex]}, vr=${radialSpeed}, ${row?.outcome}, min=${row?.min_radius?.toFixed(4)}, final=${row?.final_radius?.toFixed(4)}</title></rect>`);
      }
    }
    return `${label}\n${cells.join("\n")}`;
  }).join("\n");

  const legend = Object.entries(CLASS_COLORS).map(([label, color], index) => {
    const x = marginLeft + (index % legendColumns) * legendItemWidth;
    const y = legendTop + Math.floor(index / legendColumns) * 24;
    return `<rect x="${x}" y="${y}" width="14" height="14" fill="${color}"/><text x="${x + 20}" y="${y + 12}" font-family="system-ui, sans-serif" font-size="11" fill="#334155">${label}</text>`;
  }).join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Two-body architrino basin map">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="24" y="30" font-family="system-ui, sans-serif" font-size="18" fill="#111827">Two-body basin map: R0 vs vt, panels by vr</text>
  <text x="24" y="${marginTop + panelHeight + 28}" font-family="system-ui, sans-serif" font-size="12" fill="#475569">x: tangential speed ${tangentialSpeeds[0]}..${tangentialSpeeds[tangentialSpeeds.length - 1]}, y: radius ${radii[0]}..${radii[radii.length - 1]}, vr negative means inward</text>
  ${panels}
  ${legend}
</svg>
`;
  fs.writeFileSync(args.svg, svg);
}

function writeSelectedPathGraph(result, pathGraphRun, args) {
  if (!args.pathSvg || !pathGraphRun) {
    return;
  }
  fs.mkdirSync(path.dirname(path.resolve(args.pathSvg)), { recursive: true });
  writePathSvg(pathGraphRun.result, args.pathSvg);
  result.path_graph.status = "written";
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const { basinMap: result, pathGraphRun } = runBasinMap(args);
  writeSelectedPathGraph(result, pathGraphRun, args);
  writeJson(result, args);
  writeCsv(result, args);
  writeSvg(result, args);
  if (!args.out) {
    console.log(JSON.stringify(result, null, args.pretty ? 2 : 0));
  } else {
    console.log(JSON.stringify({
      out: args.out,
      csv: args.csv,
      svg: args.svg,
      path_svg: result.path_graph.status === "written" ? args.pathSvg : null,
      path_graph_status: result.path_graph.status,
      path_graph_selected: result.path_graph.selected,
      counts: result.counts,
      rows: result.rows.length,
      deepest: result.deepest.slice(0, 3),
    }, null, 2));
  }
  if ((result.counts.root_unresolved_halt ?? 0) > 0) {
    console.error(`UNRESOLVED_CAUSAL_ROOT: ${result.counts.root_unresolved_halt} run(s) halted before completing the requested horizon.`);
    process.exitCode = 1;
  }
}

main();
