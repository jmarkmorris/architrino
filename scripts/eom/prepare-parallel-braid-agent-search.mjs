#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildParallelBraidAgentLaunchPlan,
  validateParallelBraidAgentSearchManifest,
  writeLaunchPlanOnce,
} from "../../src/prescribed-path-analysis/ParallelBraidAgentSearch.mjs";

export const DEFAULT_MANIFEST_PATH =
  "reference/priorities/braid-program/campaigns/" +
  "parallel-agent-braid-search.v1.json";

function fail(message) {
  throw new Error(message);
}

function parseArguments(args) {
  const command = args[0];
  if (!["check", "prepare"].includes(command)) {
    fail("command must be check or prepare.");
  }
  const values = new Map();
  for (let index = 1; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || !value) fail(`invalid argument ${key}.`);
    values.set(key, value);
  }
  return { command, values };
}

export function readParallelBraidAgentSearchManifest(
  manifestPath = DEFAULT_MANIFEST_PATH,
) {
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

export function checkParallelBraidAgentSearch(
  manifestPath = DEFAULT_MANIFEST_PATH,
) {
  const manifest = readParallelBraidAgentSearchManifest(manifestPath);
  const validation = validateParallelBraidAgentSearchManifest(manifest);
  const launchPlan = buildParallelBraidAgentLaunchPlan(manifest);
  return {
    manifestPath,
    ...validation,
    waveCount: launchPlan.waves.length,
    waves: launchPlan.waves.map((wave) => ({
      wave: wave.wave,
      agentCount: wave.agentCount,
      aggregateWorkerThreads: wave.aggregateWorkerThreads,
      laneIds: wave.lanes.map((lane) => lane.laneId),
    })),
    dependencyGated: launchPlan.dependencyGated,
  };
}

async function runCli() {
  const { command, values } = parseArguments(process.argv.slice(2));
  const manifestPath = values.get("--manifest") ?? DEFAULT_MANIFEST_PATH;
  const manifest = readParallelBraidAgentSearchManifest(manifestPath);
  if (command === "check") {
    process.stdout.write(`${JSON.stringify(checkParallelBraidAgentSearch(manifestPath), null, 2)}\n`);
    return;
  }
  const launchPlan = buildParallelBraidAgentLaunchPlan(manifest);
  const output = values.get("--output") ??
    `${manifest.outputContract.root}/launch-plan.v1.json`;
  writeLaunchPlanOnce(output, launchPlan);
  process.stdout.write(`${JSON.stringify({
    status: "prepared",
    output,
    campaignId: manifest.campaignId,
    manifestCanonicalSha256: launchPlan.manifestCanonicalSha256,
    waveCount: launchPlan.waves.length,
  }, null, 2)}\n`);
}

const SCRIPT_PATH = fileURLToPath(import.meta.url);
if (path.resolve(process.argv[1] ?? "") === SCRIPT_PATH) {
  runCli().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  });
}
