#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { DEFAULTS, run } from "./lib/assembly-dynamics-solver.mjs";

export { DEFAULTS, run };

const COLORS = ["#0b6bcb", "#c2410c", "#0f766e", "#7c3aed", "#be123c", "#ca8a04"];

function parseArgs(argv) {
  const args = { ...DEFAULTS, help: false };
  const numberKeys = new Set([
    "steps",
    "dt",
    "stride",
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
    "historyMargin",
    "historySafetyFactor",
    "historyMaxDepth",
  ]);

  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (raw === "--help" || raw === "-h") {
      args.help = true;
      continue;
    }
    if (!raw.startsWith("--")) {
      throw new Error(`Unknown positional argument: ${raw}`);
    }

    const key = raw.slice(2).replaceAll("-", "");
    const canonicalKey = optionKey(key);
    if (canonicalKey === "pretty") {
      args.pretty = true;
      continue;
    }
    if (!(canonicalKey in args)) {
      throw new Error(`Unknown option: ${raw}`);
    }
    if (i + 1 >= argv.length) {
      throw new Error(`Missing value for ${raw}`);
    }
    const value = argv[++i];
    args[canonicalKey] = numberKeys.has(canonicalKey) ? finiteNumber(value, raw) : value;
  }

  args.steps = positiveInteger(args.steps, "--steps");
  args.stride = positiveInteger(args.stride, "--stride");
  args.particles = positiveInteger(args.particles, "--particles");
  if (args.particles < 2) {
    throw new Error("--particles must be at least 2.");
  }
  for (const key of ["dt", "radius", "cf", "memoryDepth", "historySafetyFactor"]) {
    if (args[key] <= 0) {
      throw new Error(`--${kebabCase(key)} must be positive.`);
    }
  }
  for (const key of ["kappa", "selfHitGain", "jacobianFloor", "maxAcceleration", "shellK", "shellRadius", "minDelay", "singularityTolerance", "rootTolerance", "historyMargin", "historyMaxDepth"]) {
    if (args[key] < 0) {
      throw new Error(`--${kebabCase(key)} must be nonnegative.`);
    }
  }
  validateHistoryMode(args.historyMode);
  validateRootHaltPolicy(args.rootHaltPolicy);
  return args;
}

function optionKey(key) {
  const aliases = {
    cf: "cf",
    csv: "csv",
    dt: "dt",
    out: "out",
    svg: "svg",
    help: "help",
    pretty: "pretty",
    steps: "steps",
    stride: "stride",
    particles: "particles",
    radius: "radius",
    radialspeed: "radialSpeed",
    tangentialspeed: "tangentialSpeed",
    driftx: "driftX",
    drifty: "driftY",
    kappa: "kappa",
    selfhitgain: "selfHitGain",
    jacobianfloor: "jacobianFloor",
    maxacceleration: "maxAcceleration",
    shellk: "shellK",
    shellradius: "shellRadius",
    mindelay: "minDelay",
    singularitytolerance: "singularityTolerance",
    roottolerance: "rootTolerance",
    memorydepth: "memoryDepth",
    historymode: "historyMode",
    historymargin: "historyMargin",
    historysafetyfactor: "historySafetyFactor",
    historymaxdepth: "historyMaxDepth",
    roothaltpolicy: "rootHaltPolicy",
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

function validateHistoryMode(mode) {
  if (!["deep", "adaptive", "fixed"].includes(mode)) {
    throw new Error("--history-mode must be one of: deep, adaptive, fixed.");
  }
}

function printHelp() {
  console.log(`Usage: node scripts/simulations/assembly-dynamics-toy.mjs [options]

Options:
  --steps N              Integration steps. Default: ${DEFAULTS.steps}
  --dt X                 Absolute-time step. Default: ${DEFAULTS.dt}
  --stride N             Store one frame every N steps. Default: ${DEFAULTS.stride}
  --particles N          Ring particles with alternating polarity. Default: ${DEFAULTS.particles}
  --radius X             Initial ring radius. Default: ${DEFAULTS.radius}
  --radial-speed X       Initial radial speed; negative means inward. Default: ${DEFAULTS.radialSpeed}
  --tangential-speed X   Initial internal tangential speed. Default: ${DEFAULTS.tangentialSpeed}
  --drift-x X            Initial assembly-center x velocity. Default: ${DEFAULTS.driftX}
  --drift-y X            Initial assembly-center y velocity. Default: ${DEFAULTS.driftY}
  --cf X                 Field speed c_f. Default: ${DEFAULTS.cf}
  --kappa X              Delayed-hit coupling. Default: ${DEFAULTS.kappa}
  --self-hit-gain X      Same-source contribution multiplier. Default: ${DEFAULTS.selfHitGain}
  --jacobian-floor X     Minimum accepted |J| for a simple-root branch; violation halts. Use 0 to disable. Default: ${DEFAULTS.jacobianFloor}
  --max-acceleration X   Optional acceleration magnitude halt threshold. Use 0 to disable. Default: ${DEFAULTS.maxAcceleration}
  --shell-k X            Non-EOM toy shell-radius restoring coefficient. Default: ${DEFAULTS.shellK}
  --shell-radius X       Target shell radius for the toy restoring term. Default: ${DEFAULTS.shellRadius}
  --min-delay X          Minimum accepted same-source causal delay. Partner roots may use zero delay. Default: ${DEFAULTS.minDelay}
  --singularity-tolerance X
                          Halt when a causal-root distance is at or below this arithmetic singularity tolerance. Default: ${DEFAULTS.singularityTolerance}
  --root-tolerance X     Residual tolerance for detecting discrete causal roots. Default: ${DEFAULTS.rootTolerance}
  --memory-depth X       Initial negative-time rotating-ring history depth; fixed-mode buffer depth. Default: ${DEFAULTS.memoryDepth}
  --history-mode X       Retained causal history: deep, adaptive, fixed. Default: ${DEFAULTS.historyMode}
  --history-margin X     Extra seconds retained beyond the adaptive causal-delay estimate. Default: ${DEFAULTS.historyMargin}
  --history-safety-factor X
                          Multiplier on current pairwise light-delay estimate in adaptive mode. Default: ${DEFAULTS.historySafetyFactor}
  --history-max-depth X  Optional cap on retained history depth; 0 means uncapped. Default: ${DEFAULTS.historyMaxDepth}
  --root-halt-policy X   Halt on required branch failures: partner, all, none. Default: ${DEFAULTS.rootHaltPolicy}
  --out PATH             Write JSON output instead of stdout.
  --csv PATH             Write sampled frames as CSV.
  --svg PATH             Write a trajectory SVG.
  --pretty               Pretty-print JSON.
  --help                 Show this help.

This is a visualization-first toy model. It assumes the Master EOM exists,
uses an adaptive/deep delayed causal-root branch sum, and reports diagnostics instead of
claiming proof closure or a certified branch chart.`);
}

function writeJson(result, config) {
  const json = JSON.stringify(result, null, config.pretty ? 2 : 0);
  if (config.out) {
    fs.writeFileSync(config.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

function writeCsv(result, csvPath) {
  if (!csvPath) {
    return;
  }
  const rows = [
    "t,id,q,x,y,vx,vy,phase,radial_velocity,angular_velocity,shell_radius,energy_proxy,momentum_x,momentum_y,angular_momentum_z,partner_hits,self_hits,partner_unresolved_roots,self_unresolved_roots,unresolved_roots,min_abs_jacobian,max_roots_per_pair,max_abs_acceleration",
  ];
  for (const frame of result.frames) {
    for (const particle of frame.particles) {
      rows.push(
        [
          frame.t,
          particle.id,
          particle.q,
          particle.x,
          particle.y,
          particle.vx,
          particle.vy,
          particle.phase,
          particle.radial_velocity,
          particle.angular_velocity,
          frame.shell_radius,
          frame.conserved_quantities.energy_proxy,
          frame.conserved_quantities.momentum[0],
          frame.conserved_quantities.momentum[1],
          frame.conserved_quantities.angular_momentum_z,
          frame.hit_stats?.partner_hits ?? "",
          frame.hit_stats?.self_hits ?? "",
          frame.hit_stats?.partner_unresolved_roots ?? "",
          frame.hit_stats?.self_unresolved_roots ?? "",
          frame.hit_stats?.unresolved_roots ?? "",
          frame.hit_stats?.min_abs_jacobian ?? "",
          frame.hit_stats?.max_roots_per_pair ?? "",
          frame.hit_stats?.max_abs_acceleration ?? "",
        ].join(",")
      );
    }
  }
  fs.writeFileSync(csvPath, `${rows.join("\n")}\n`);
}

export function writeSvg(result, svgPath) {
  if (!svgPath) {
    return;
  }
  const points = result.frames.flatMap((frame) => frame.particles.map((p) => [p.x, p.y]));
  const centers = result.frames.map((frame) => frame.center);
  const allPoints = points.concat(centers);
  const minX = Math.min(...allPoints.map((p) => p[0]));
  const maxX = Math.max(...allPoints.map((p) => p[0]));
  const minY = Math.min(...allPoints.map((p) => p[1]));
  const maxY = Math.max(...allPoints.map((p) => p[1]));
  const width = 900;
  const height = 700;
  const pad = 40;
  const scale = Math.min(
    (width - 2 * pad) / Math.max(maxX - minX, 1e-9),
    (height - 2 * pad) / Math.max(maxY - minY, 1e-9)
  );
  const project = ([x, y]) => [
    pad + (x - minX) * scale,
    height - pad - (y - minY) * scale,
  ];
  const pathForParticle = (id) =>
    result.frames
      .map((frame) => {
        const particle = frame.particles[id];
        const [x, y] = project([particle.x, particle.y]);
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");

  const centerPath = centers
    .map((center) => {
      const [x, y] = project(center);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const final = result.frames[result.frames.length - 1];
  const finalMarks = final.particles
    .map((particle, i) => {
      const [x, y] = project([particle.x, particle.y]);
      return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="5" fill="${COLORS[i % COLORS.length]}" stroke="#111827" stroke-width="1"><title>id=${particle.id}, q=${particle.q}</title></circle>`;
    })
    .join("\n  ");

  const paths = Array.from({ length: result.config.particles }, (_, i) => {
    const color = COLORS[i % COLORS.length];
    return `<polyline points="${pathForParticle(i)}" fill="none" stroke="${color}" stroke-width="1.8" stroke-opacity="0.82"><title>particle ${i}</title></polyline>`;
  }).join("\n  ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Architrino assembly dynamics toy trajectory">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="24" y="32" font-family="system-ui, sans-serif" font-size="18" fill="#111827">Assembly dynamics toy: exact delayed causal-root branch sum</text>
  <text x="24" y="56" font-family="system-ui, sans-serif" font-size="12" fill="#475569">status=${result.summary.status}, final t=${final.t.toFixed(3)}, shell radius=${final.shell_radius.toFixed(4)}, energy proxy=${final.conserved_quantities.energy_proxy.toFixed(6)}</text>
  ${paths}
  <polyline points="${centerPath}" fill="none" stroke="#111827" stroke-width="2.4" stroke-dasharray="6 5"><title>assembly center</title></polyline>
  ${finalMarks}
</svg>
`;
  fs.writeFileSync(svgPath, svg);
}

export function main() {
  const config = parseArgs(process.argv.slice(2));
  if (config.help) {
    printHelp();
    return;
  }
  for (const maybePath of [config.out, config.csv, config.svg]) {
    if (maybePath) {
      fs.mkdirSync(path.dirname(path.resolve(maybePath)), { recursive: true });
    }
  }
  const result = run(config);
  writeCsv(result, config.csv);
  writeSvg(result, config.svg);
  writeJson(result, config);
  if (result.error) {
    console.error(`${result.error.code}: ${result.error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
