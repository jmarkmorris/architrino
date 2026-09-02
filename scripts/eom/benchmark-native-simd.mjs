#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import process from "node:process";

function fail(message) {
  throw new Error(message);
}

function parseArguments(argv) {
  const options = {
    vectorBinary: "",
    scalarBinary: "",
    mode: "bounded-population-long-horizon",
    warmups: 1,
    repetitions: 3,
    timeoutMs: 600_000,
  };
  for (let index = 0; index < argv.length; ++index) {
    const token = argv[index];
    const take = () => {
      if (index + 1 >= argv.length) fail(`missing value after ${token}`);
      return argv[++index];
    };
    if (token === "--vector-binary") options.vectorBinary = take();
    else if (token === "--scalar-binary") options.scalarBinary = take();
    else if (token === "--mode") options.mode = take();
    else if (token === "--warmups") options.warmups = Number(take());
    else if (token === "--repetitions") options.repetitions = Number(take());
    else if (token === "--timeout-ms") options.timeoutMs = Number(take());
    else fail(`unknown argument ${token}`);
  }
  for (const [label, value] of [
    ["warmups", options.warmups],
    ["repetitions", options.repetitions],
    ["timeout-ms", options.timeoutMs],
  ]) {
    if (!Number.isSafeInteger(value) || value < (label === "warmups" ? 0 : 1)) {
      fail(`${label} must be a valid positive integer`);
    }
  }
  if (!options.vectorBinary || !options.scalarBinary) {
    fail("--vector-binary and --scalar-binary are required");
  }
  return options;
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function parseTime(stderr) {
  const fields = {};
  for (const line of stderr.trim().split(/\r?\n/u)) {
    const match = /^(real|user|sys)\s+([0-9]+(?:\.[0-9]+)?)$/u.exec(
      line.trim(),
    );
    if (match) fields[match[1]] = Number(match[2]);
  }
  if (!["real", "user", "sys"].every((field) => Number.isFinite(fields[field]))) {
    fail(`could not parse /usr/bin/time -p output: ${stderr}`);
  }
  return fields;
}

function runTimed(binary, mode, timeoutMs) {
  const completed = spawnSync("/usr/bin/time", ["-p", binary, mode], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
    timeout: timeoutMs,
  });
  if (completed.error) throw completed.error;
  if (completed.status !== 0) {
    fail(
      `${binary} ${mode} exited ${completed.status}: ${completed.stderr.trim()}`,
    );
  }
  JSON.parse(completed.stdout);
  return {
    ...parseTime(completed.stderr),
    outputSha256: sha256Bytes(completed.stdout),
    outputBytes: Buffer.byteLength(completed.stdout),
  };
}

function median(values) {
  const ordered = [...values].sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 === 0
    ? 0.5 * (ordered[middle - 1] + ordered[middle])
    : ordered[middle];
}

function summarize(samples) {
  const real = samples.map((sample) => sample.real);
  const user = samples.map((sample) => sample.user);
  const sys = samples.map((sample) => sample.sys);
  return {
    repetitions: samples.length,
    medianRealSeconds: median(real),
    minimumRealSeconds: Math.min(...real),
    maximumRealSeconds: Math.max(...real),
    medianUserSeconds: median(user),
    medianSystemSeconds: median(sys),
  };
}

function commandOutput(command, args) {
  const completed = spawnSync(command, args, { encoding: "utf8" });
  return completed.status === 0 ? completed.stdout.trim() : "unavailable";
}

const options = parseArguments(process.argv.slice(2));
const binaries = {
  vector: options.vectorBinary,
  scalar: options.scalarBinary,
};
const warmupSamples = [];
for (let repetition = 0; repetition < options.warmups; ++repetition) {
  for (const variant of repetition % 2 === 0
    ? ["vector", "scalar"]
    : ["scalar", "vector"]) {
    warmupSamples.push({
      variant,
      ...runTimed(binaries[variant], options.mode, options.timeoutMs),
    });
  }
}

const samples = [];
for (let repetition = 0; repetition < options.repetitions; ++repetition) {
  for (const variant of repetition % 2 === 0
    ? ["scalar", "vector"]
    : ["vector", "scalar"]) {
    samples.push({
      repetition,
      variant,
      ...runTimed(binaries[variant], options.mode, options.timeoutMs),
    });
  }
}
const outputHashes = new Set([
  ...warmupSamples.map((sample) => sample.outputSha256),
  ...samples.map((sample) => sample.outputSha256),
]);
if (outputHashes.size !== 1) {
  fail("vector-enabled and vector-disabled outputs are not byte-identical");
}
const vectorSamples = samples.filter((sample) => sample.variant === "vector");
const scalarSamples = samples.filter((sample) => sample.variant === "scalar");
const vector = summarize(vectorSamples);
const scalar = summarize(scalarSamples);
const report = {
  schema: "eom_native_simd_benchmark/v1",
  authority: "measured-local-performance-and-deterministic-parity",
  generatedAt: new Date().toISOString(),
  mode: options.mode,
  host: {
    architecture: commandOutput("uname", ["-m"]),
    operatingSystem: commandOutput("sw_vers", ["-productVersion"]),
  },
  toolchain: commandOutput("c++", ["--version"]).split(/\r?\n/u)[0],
  builds: {
    vector: {
      binary: options.vectorBinary,
      sha256: sha256Bytes(readFileSync(options.vectorBinary)),
      requiredFlags: ["-O3", "-DNDEBUG"],
      vectorizationPolicy: "compiler-default-auto-vectorization",
    },
    scalar: {
      binary: options.scalarBinary,
      sha256: sha256Bytes(readFileSync(options.scalarBinary)),
      requiredFlags: [
        "-O3",
        "-DNDEBUG",
        "-fno-vectorize",
        "-fno-slp-vectorize",
      ],
      vectorizationPolicy: "loop-and-slp-vectorization-disabled",
    },
  },
  warmups: options.warmups,
  repetitions: options.repetitions,
  deterministicOutput: {
    byteIdentical: true,
    sha256: [...outputHashes][0],
    bytes: samples[0].outputBytes,
  },
  vector,
  scalar,
  scalarToVectorMedianSpeedup:
    scalar.medianRealSeconds / vector.medianRealSeconds,
  samples,
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
