#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import {
  createCollisionDetector,
  createSoftSphereRepulsionInteraction,
  createT3UniverseSimulator,
  writeT3ExperimentOutput,
} from "../../src/t3/index.mjs";

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printUsage(0);
}

const config = loadConfig(options);
const interactions = createInteractions(options, config);
const eventDetectors = createEventDetectors(options);
const simulator = createT3UniverseSimulator({ config, interactions, eventDetectors });
const runResult = await simulator.run({
  steps: options.steps ?? config.steps ?? 100,
  sampleEvery: options.sampleEvery ?? config.output?.sampleEvery ?? 1,
  collectFrames: options.trajectory !== false,
});
const metadata = createExperimentMetadata({ options, config: simulator.config, runResult, interactions });
const output = writeT3ExperimentOutput({
  outputDir: options.outputDir ?? path.join(".tmp", "t3-universe-run"),
  config: simulator.config,
  metadata,
  statistics: runResult.statistics,
  checkpoint: runResult.checkpoint,
  trajectoryFrames: options.trajectory === false ? undefined : runResult.trajectoryFrames,
});

console.log(JSON.stringify({ schema: "t3-cli-result.v1", output, statistics: runResult.statistics }, null, 2));

function parseArgs(rawArgs) {
  const parsed = {
    help: false,
    configPath: null,
    outputDir: null,
    steps: null,
    particles: null,
    seed: null,
    sideLength: null,
    baseUnitLength: null,
    scaleFactor: null,
    timestep: null,
    interactionRadius: null,
    electrineFraction: null,
    distribution: null,
    velocityDistribution: null,
    interactionPreset: "none",
    collisionRadius: null,
    sampleEvery: null,
    trajectory: true,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--config") {
      parsed.configPath = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--out") {
      parsed.outputDir = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--steps") {
      parsed.steps = positiveInteger(requireNext(rawArgs, index, arg), "steps");
      index += 1;
    } else if (arg === "--particles") {
      parsed.particles = positiveInteger(requireNext(rawArgs, index, arg), "particles");
      index += 1;
    } else if (arg === "--seed") {
      parsed.seed = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--side-length") {
      parsed.sideLength = positiveFiniteNumber(requireNext(rawArgs, index, arg), "sideLength");
      index += 1;
    } else if (arg === "--base-unit") {
      parsed.baseUnitLength = positiveFiniteNumber(requireNext(rawArgs, index, arg), "baseUnitLength");
      index += 1;
    } else if (arg === "--scale") {
      parsed.scaleFactor = positiveFiniteNumber(requireNext(rawArgs, index, arg), "scaleFactor");
      index += 1;
    } else if (arg === "--dt") {
      parsed.timestep = positiveFiniteNumber(requireNext(rawArgs, index, arg), "timestep");
      index += 1;
    } else if (arg === "--radius") {
      parsed.interactionRadius = positiveFiniteNumber(requireNext(rawArgs, index, arg), "interactionRadius");
      index += 1;
    } else if (arg === "--electrine") {
      parsed.electrineFraction = positiveFiniteNumber(requireNext(rawArgs, index, arg), "electrineFraction");
      index += 1;
    } else if (arg === "--distribution") {
      parsed.distribution = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--velocity") {
      parsed.velocityDistribution = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--interaction") {
      parsed.interactionPreset = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--collision-radius") {
      parsed.collisionRadius = positiveFiniteNumber(requireNext(rawArgs, index, arg), "collisionRadius");
      index += 1;
    } else if (arg === "--sample-every") {
      parsed.sampleEvery = positiveInteger(requireNext(rawArgs, index, arg), "sampleEvery");
      index += 1;
    } else if (arg === "--no-trajectory") {
      parsed.trajectory = false;
    } else {
      console.error(`Unknown argument: ${arg}`);
      printUsage(2);
    }
  }
  return parsed;
}

function loadConfig(options) {
  const loaded = options.configPath ? JSON.parse(fs.readFileSync(options.configPath, "utf8")) : {};
  return mergeConfig(loaded, {
    topology: {
      sideLength: options.sideLength,
      baseUnitLength: options.baseUnitLength,
      scaleFactor: options.scaleFactor,
    },
    particles: {
      count: options.particles,
      electrineFraction: options.electrineFraction,
    },
    initialConditions: {
      seed: options.seed,
      distribution: options.distribution,
      velocityDistribution: options.velocityDistribution,
    },
    interactions: {
      interactionRadius: options.interactionRadius,
    },
    solver: {
      engine: "reference",
      timestep: options.timestep,
    },
    output: {
      sampleEvery: options.sampleEvery,
    },
  });
}

function mergeConfig(base, override) {
  const merged = JSON.parse(JSON.stringify(base ?? {}));
  for (const [section, values] of Object.entries(override)) {
    for (const [key, value] of Object.entries(values)) {
      if (value == null) {
        continue;
      }
      merged[section] = merged[section] ?? {};
      merged[section][key] = value;
    }
  }
  return merged;
}

function createInteractions(options, config) {
  const preset = options.interactionPreset ?? config.interactionPreset ?? "none";
  if (preset === "none" || preset === "noop") {
    return [];
  }
  if (preset === "soft-repulsion") {
    return [
      createSoftSphereRepulsionInteraction({
        radius: config.interactions?.interactionRadius ?? options.interactionRadius ?? 1,
        strength: config.interactions?.strength ?? 1,
        softening: config.interactions?.softening,
      }),
    ];
  }
  throw new TypeError(`unsupported interaction preset: ${preset}`);
}

function createEventDetectors(options) {
  if (options.collisionRadius == null) {
    return [];
  }
  return [createCollisionDetector({ radius: options.collisionRadius })];
}

function createExperimentMetadata({ options, config, runResult, interactions }) {
  return {
    schema: "t3-experiment-metadata.v1",
    createdAt: new Date().toISOString(),
    command: process.argv.slice(2),
    solverEngine: config.solver.engine,
    deterministic: config.solver.deterministic,
    model: config.model,
    topology: config.topology,
    particleCount: runResult.statistics.particleCount,
    steps: runResult.completedSteps,
    startTime: runResult.startTime,
    endTime: runResult.endTime,
    interactionIds: interactions.map((interaction) => interaction.id),
    trajectoryWritten: options.trajectory !== false,
  };
}

function requireNext(rawArgs, index, arg) {
  const value = rawArgs[index + 1];
  if (value == null || value.startsWith("--")) {
    console.error(`${arg} requires a value`);
    printUsage(2);
  }
  return value;
}

function positiveInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be a positive integer`);
  }
  return numericValue;
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive and finite`);
  }
  return numericValue;
}

function printUsage(exitCode) {
  console.log(`Usage: node scripts/solver/run-t3-universe-simulator.mjs [options]

Options:
  --config <path>             Read a JSON simulator config.
  --out <dir>                 Write output files to this directory.
  --steps <count>             Number of solver steps to run.
  --particles <count>         Total Architrino count.
  --seed <value>              Deterministic initial-condition seed.
  --base-unit <U>             Base unit length.
  --scale <N>                 Scale factor; side length is N * U.
  --side-length <L>           Direct side length override.
  --dt <value>                Solver timestep.
  --radius <value>            Neighbor and interaction radius.
  --electrine <value>         Electrine fraction, e.g. 0.45 or 45.
  --distribution <kind>       random, lattice, or clustered.
  --velocity <kind>           stationary, random, or gaussian.
  --interaction <preset>      none or soft-repulsion.
  --collision-radius <value>  Emit collision-radius events.
  --sample-every <count>      Trajectory sampling interval.
  --no-trajectory             Skip trajectory JSONL output.
  --help                      Show this message.
`);
  process.exit(exitCode);
}
