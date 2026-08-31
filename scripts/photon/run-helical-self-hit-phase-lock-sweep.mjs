#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { runPhotonSelfHitPhaseLockSweep } from "../../src/apps/photon/PhotonSelfHitSweepRuntime.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const argument = process.argv.slice(2).find((value) => value.startsWith("--write="));
if (!argument || process.argv.length !== 3) {
  throw new TypeError("usage: node scripts/photon/run-helical-self-hit-phase-lock-sweep.mjs --write=PATH");
}
const outputPath = path.resolve(ROOT, argument.slice("--write=".length));
let completed = 0;
let total = 0;
const startedAt = Date.now();
const heartbeat = setInterval(() => {
  const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  process.stderr.write(`[photon-self-hit-sweep] completed=${completed}/${total || "?"} elapsed_s=${elapsedSeconds}\n`);
}, 30_000);

try {
  const result = await runPhotonSelfHitPhaseLockSweep({
    generatedAt: null,
    onProgress: (progress) => {
      completed = progress.completed;
      total = progress.total;
    },
  });
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ output: path.relative(ROOT, outputPath), summary: result.summary }, null, 2)}\n`);
} finally {
  clearInterval(heartbeat);
}
