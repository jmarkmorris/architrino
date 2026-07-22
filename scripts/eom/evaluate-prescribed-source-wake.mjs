#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePrescribedSourceWake } from "../../src/prescribed-path-analysis/index.mjs";
import {
  createSpindleExactSourceRecord,
  DEFAULT_SPINDLE_SPEC_PATH,
} from "./generate-spindle-chart-record.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function parsePosition(value) {
  const entries = String(value).split(",").map((entry) => Number(entry.trim()));
  if (entries.length !== 3 || entries.some((entry) => !Number.isFinite(entry))) {
    throw new TypeError("--position must contain three comma-separated finite numbers.");
  }
  return { x: entries[0], y: entries[1], z: entries[2] };
}

function parseArgs(args) {
  const parsed = {
    specPath: DEFAULT_SPINDLE_SPEC_PATH,
    observationTime: null,
    probePosition: null,
    probeCharge: 1,
    fieldSpeed: 1,
    coupling: 1,
  };
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    const value = args[index + 1];
    if (!value) throw new TypeError(`${key} requires a value.`);
    index += 1;
    if (key === "--spec") parsed.specPath = path.resolve(value);
    else if (key === "--time") parsed.observationTime = finiteNumber(value, "--time");
    else if (key === "--position") parsed.probePosition = parsePosition(value);
    else if (key === "--probe-charge") parsed.probeCharge = finiteNumber(value, "--probe-charge");
    else if (key === "--field-speed") parsed.fieldSpeed = finiteNumber(value, "--field-speed");
    else if (key === "--coupling") parsed.coupling = finiteNumber(value, "--coupling");
    else throw new TypeError(`unknown argument ${key}.`);
  }
  if (parsed.observationTime === null || parsed.probePosition === null) {
    throw new TypeError("--time and --position are required.");
  }
  return parsed;
}

export function evaluateSpindleWakeFromFile(options) {
  const sourceBytes = fs.readFileSync(options.specPath);
  const sourceHash = createHash("sha256").update(sourceBytes).digest("hex");
  const spec = JSON.parse(sourceBytes.toString("utf8"));
  const exactRecord = createSpindleExactSourceRecord(spec, {
    sourceHash,
    generatingSpec: path.relative(process.cwd(), options.specPath),
  });
  const result = evaluatePrescribedSourceWake({
    sourceRecord: exactRecord,
    observationTime: options.observationTime,
    probePosition: options.probePosition,
    probeCharge: options.probeCharge,
    fieldSpeed: options.fieldSpeed,
    coupling: options.coupling,
  });
  const resultPayloadSha256 = createHash("sha256")
    .update(JSON.stringify(result))
    .digest("hex");
  return { ...result, resultPayloadSha256 };
}

function runCli() {
  const result = evaluateSpindleWakeFromFile(parseArgs(process.argv.slice(2)));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  runCli();
}
