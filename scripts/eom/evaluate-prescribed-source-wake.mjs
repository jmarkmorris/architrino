#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePrescribedRecordAnalysis } from "../../src/prescribed-path-analysis/index.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "./generate-prescribed-braid-record.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const SCRIPT_DIRECTORY = path.dirname(SCRIPT_PATH);
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "../..");
export const DEFAULT_B1_SOURCE_SPEC_PATH = path.resolve(
  REPOSITORY_ROOT,
  "reference/priorities/braid-program/configurations/" +
    "illustrative-spindle-chart-hypothesis.v2.json",
);
export const DEFAULT_B1_ANALYSIS_PROTOCOL_PATH = path.resolve(
  SCRIPT_DIRECTORY,
  "../../src/prescribed-path-analysis/fixtures/b1-interior-small-fixture.analysis-protocol.v1.json",
);
export const DEFAULT_B1_ANALYSIS_RESULT_PATH = path.resolve(
  REPOSITORY_ROOT,
  ".tmp/prescribed-path-analysis/b1-interior-small-fixture.result-packet.v1.json",
);

function parseArgs(args) {
  const parsed = {
    specPath: DEFAULT_B1_SOURCE_SPEC_PATH,
    protocolPath: DEFAULT_B1_ANALYSIS_PROTOCOL_PATH,
    checkPath: null,
    writePath: null,
  };
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    const value = args[index + 1];
    if (!value) throw new TypeError(`${key} requires a value.`);
    index += 1;
    if (key === "--spec") parsed.specPath = path.resolve(value);
    else if (key === "--protocol") parsed.protocolPath = path.resolve(value);
    else if (key === "--check") parsed.checkPath = path.resolve(value);
    else if (key === "--write") parsed.writePath = path.resolve(value);
    else throw new TypeError(`unknown argument ${key}.`);
  }
  if (parsed.checkPath && parsed.writePath) {
    throw new TypeError("--check and --write are mutually exclusive.");
  }
  return parsed;
}

export function evaluateSpindleAnalysisFromFiles(options = {}) {
  const specPath = options.specPath ?? DEFAULT_B1_SOURCE_SPEC_PATH;
  const protocolPath = options.protocolPath ?? DEFAULT_B1_ANALYSIS_PROTOCOL_PATH;
  const sourceBytes = fs.readFileSync(specPath);
  const upstreamSourceHash = createHash("sha256").update(sourceBytes).digest("hex");
  const spec = JSON.parse(sourceBytes.toString("utf8"));
  const protocol = JSON.parse(fs.readFileSync(protocolPath, "utf8"));
  const exactRecord = createPrescribedBraidExactSourceRecord(spec, {
    sourceHash: upstreamSourceHash,
    generatingSpec: path.relative(REPOSITORY_ROOT, specPath),
  });
  return evaluatePrescribedRecordAnalysis({ sourceRecord: exactRecord, protocol });
}

export function serializePrescribedRecordAnalysis(packet) {
  return `${JSON.stringify(packet, null, 2)}\n`;
}

function runCli() {
  const options = parseArgs(process.argv.slice(2));
  const serialized = serializePrescribedRecordAnalysis(
    evaluateSpindleAnalysisFromFiles(options),
  );
  if (options.writePath) {
    fs.mkdirSync(path.dirname(options.writePath), { recursive: true });
    fs.writeFileSync(options.writePath, serialized);
    process.stdout.write(`prescribed-record analysis result written: ${options.writePath}\n`);
    return;
  }
  if (options.checkPath) {
    if (!fs.existsSync(options.checkPath)) {
      throw new Error(`prescribed-record analysis result is missing: ${options.checkPath}`);
    }
    if (fs.readFileSync(options.checkPath, "utf8") !== serialized) {
      throw new Error(
        "prescribed-record analysis result drift: run " +
        `node scripts/eom/evaluate-prescribed-source-wake.mjs --write ${options.checkPath}`,
      );
    }
    process.stdout.write(`prescribed-record analysis result check passed: ${options.checkPath}\n`);
    return;
  }
  process.stdout.write(serialized);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) runCli();
