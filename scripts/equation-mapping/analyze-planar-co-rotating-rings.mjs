#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { runPlanarRingCampaign } from "../../src/prescribed-path-analysis/PlanarCoRotatingRingSearch.mjs";

function parseArguments(argv) {
  const options = {
    minimumBeta: 0.05,
    maximumBeta: 20,
    betaStep: 0.025,
    minimumPhaseGap: 0.01,
    nonuniformEvaluationsPerSeed: 900,
    b13GlobalSamples: 2400,
    b13RetainedSeeds: 18,
    output: null,
  };
  for (const argument of argv) {
    if (argument === "--quick") {
      options.betaStep = 0.25;
      options.nonuniformEvaluationsPerSeed = 120;
      options.b13GlobalSamples = 120;
      options.b13RetainedSeeds = 3;
    } else if (argument.startsWith("--min-beta=")) {
      options.minimumBeta = Number(argument.slice("--min-beta=".length));
    } else if (argument.startsWith("--max-beta=")) {
      options.maximumBeta = Number(argument.slice("--max-beta=".length));
    } else if (argument.startsWith("--beta-step=")) {
      options.betaStep = Number(argument.slice("--beta-step=".length));
    } else if (argument.startsWith("--minimum-phase-gap=")) {
      options.minimumPhaseGap = Number(argument.slice("--minimum-phase-gap=".length));
    } else if (argument.startsWith("--nonuniform-evaluations=")) {
      options.nonuniformEvaluationsPerSeed = Number(argument.slice("--nonuniform-evaluations=".length));
    } else if (argument.startsWith("--b13-global-samples=")) {
      options.b13GlobalSamples = Number(argument.slice("--b13-global-samples=".length));
    } else if (argument.startsWith("--b13-retained-seeds=")) {
      options.b13RetainedSeeds = Number(argument.slice("--b13-retained-seeds=".length));
    } else if (argument.startsWith("--out=")) {
      options.output = argument.slice("--out=".length);
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }
  if (!(options.minimumBeta > 0 && options.maximumBeta > options.minimumBeta)) {
    throw new RangeError("the beta interval must be positive and ordered");
  }
  if (!(options.betaStep > 0 && options.minimumPhaseGap > 0)) {
    throw new RangeError("beta step and minimum phase gap must be positive");
  }
  return options;
}

export function runPlanarRingCli(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  let heartbeatIndex = 0;
  const startedAt = Date.now();
  const campaign = runPlanarRingCampaign({
    ...options,
    progress: (row) => {
      heartbeatIndex += 1;
      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
      process.stderr.write(`[planar-ring heartbeat ${heartbeatIndex}] stage=${row.stage} n=${row.n ?? "-"} classes=${row.classCount ?? "-"} elapsed_s=${elapsedSeconds}\n`);
    },
  });
  const packet = {
    ...campaign,
    execution: {
      commandOptions: options,
      elapsedSeconds: (Date.now() - startedAt) / 1000,
      heartbeatCount: heartbeatIndex,
      completed: true,
    },
  };
  const serialized = `${JSON.stringify(packet, null, 2)}\n`;
  if (options.output) {
    const outputPath = path.resolve(options.output);
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, serialized);
    process.stdout.write(`${JSON.stringify({ output: outputPath, summary: packet.summary, execution: packet.execution }, null, 2)}\n`);
  } else {
    process.stdout.write(serialized);
  }
  return packet;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runPlanarRingCli();
}
