#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync, gzipSync } from "node:zlib";

import {
  evaluateB1StreamingSurfaceReductions,
} from "../../src/prescribed-path-analysis/index.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "./generate-prescribed-braid-record.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const SCRIPT_DIRECTORY = path.dirname(SCRIPT_PATH);
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "../..");

export const DEFAULT_B1_COMPLETE_CYCLE_SOURCE_SPEC_PATH = path.resolve(
  REPOSITORY_ROOT,
  "reference/priorities/braid-program/configurations/" +
    "illustrative-spindle-chart-hypothesis.v0.json",
);
export const DEFAULT_B1_COMPLETE_CYCLE_PROTOCOL_PATH = path.resolve(
  REPOSITORY_ROOT,
  "src/prescribed-path-analysis/protocols/b1-complete-cycle-probe-protocol.v1.json",
);
export const DEFAULT_B1_COMPLETE_CYCLE_RESULT_PATH = path.resolve(
  REPOSITORY_ROOT,
  "src/prescribed-path-analysis/fixtures/" +
    "b1-interior-complete-cycle-reduction.result-packet.v1.json",
);
export const DEFAULT_B1_COMPLETE_CYCLE_RAW_STORE_PATH = path.resolve(
  REPOSITORY_ROOT,
  ".tmp/prescribed-path-analysis/b1-interior-complete-cycle-raw",
);

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function relativeRepositoryPath(absolutePath) {
  const relative = path.relative(REPOSITORY_ROOT, absolutePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new RangeError("B1 complete-cycle artifacts must remain inside the repository.");
  }
  return relative.split(path.sep).join("/");
}

function parseArgs(args) {
  const parsed = {
    specPath: DEFAULT_B1_COMPLETE_CYCLE_SOURCE_SPEC_PATH,
    protocolPath: DEFAULT_B1_COMPLETE_CYCLE_PROTOCOL_PATH,
    rawStorePath: DEFAULT_B1_COMPLETE_CYCLE_RAW_STORE_PATH,
    checkPath: null,
    writePath: null,
    verifyRawStore: false,
    replayRawStore: false,
  };
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (key === "--verify-raw-store") {
      parsed.verifyRawStore = true;
      continue;
    }
    if (key === "--replay-raw-store") {
      parsed.replayRawStore = true;
      continue;
    }
    const value = args[index + 1];
    if (!value) throw new TypeError(`${key} requires a value.`);
    index += 1;
    if (key === "--spec") parsed.specPath = path.resolve(value);
    else if (key === "--protocol") parsed.protocolPath = path.resolve(value);
    else if (key === "--raw-store") parsed.rawStorePath = path.resolve(value);
    else if (key === "--check") parsed.checkPath = path.resolve(value);
    else if (key === "--write") parsed.writePath = path.resolve(value);
    else throw new TypeError(`unknown argument ${key}.`);
  }
  if (parsed.checkPath && parsed.writePath) {
    throw new TypeError("--check and --write are mutually exclusive.");
  }
  relativeRepositoryPath(parsed.specPath);
  relativeRepositoryPath(parsed.protocolPath);
  relativeRepositoryPath(parsed.rawStorePath);
  if (parsed.checkPath) relativeRepositoryPath(parsed.checkPath);
  if (parsed.writePath) relativeRepositoryPath(parsed.writePath);
  return parsed;
}

function batchFilename(context) {
  const radiusToken = String(context.radius).replace(".", "p");
  return `surface-r${radiusToken}-${context.resolution}-time-${
    String(context.timeIndex).padStart(3, "0")
  }.result-packet.v1.json.gz`;
}

function createPacketArtifactWriter({ rawStorePath, write, verify, reuseExisting }) {
  if (write) fs.mkdirSync(rawStorePath, { recursive: true });
  return (packet, context) => {
    const uncompressedBytes = Buffer.from(`${JSON.stringify(packet)}\n`);
    const filename = batchFilename(context);
    const absolutePath = path.join(rawStorePath, filename);
    if (reuseExisting && !fs.existsSync(absolutePath)) {
      throw new Error(`raw surface packet is missing: ${relativeRepositoryPath(absolutePath)}`);
    }
    const compressedBytes = reuseExisting
      ? fs.readFileSync(absolutePath)
      : gzipSync(uncompressedBytes, { level: 9, mtime: 0 });
    const descriptor = {
      mediaType: "application/gzip",
      contentSchema: packet.schema,
      codec: "gzip/level-9.v1",
      locator: relativeRepositoryPath(absolutePath),
      artifactSha256: sha256Bytes(compressedBytes),
      artifactBytes: compressedBytes.length,
      uncompressedSha256: sha256Bytes(uncompressedBytes),
      uncompressedBytes: uncompressedBytes.length,
    };
    if (write) fs.writeFileSync(absolutePath, compressedBytes);
    if (verify) {
      if (!fs.existsSync(absolutePath)) {
        throw new Error(`raw surface packet is missing: ${descriptor.locator}`);
      }
      const actual = fs.readFileSync(absolutePath);
      if (actual.length !== descriptor.artifactBytes ||
          sha256Bytes(actual) !== descriptor.artifactSha256) {
        throw new Error(`raw surface packet failed its artifact hash: ${descriptor.locator}`);
      }
    }
    return descriptor;
  };
}

function createRawPacketReplay(rawStorePath) {
  return ({ protocol }) => {
    const match = protocol.protocolId.match(/-surface-r(.+)-(primary|refined)-time-(\d+)$/);
    if (!match) throw new Error(`cannot route raw packet for protocol ${protocol.protocolId}.`);
    const [, radiusToken, resolution, timeToken] = match;
    const context = {
      radius: Number(radiusToken),
      resolution,
      timeIndex: Number(timeToken),
    };
    const absolutePath = path.join(rawStorePath, batchFilename(context));
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`raw surface packet is missing: ${relativeRepositoryPath(absolutePath)}`);
    }
    return JSON.parse(gunzipSync(fs.readFileSync(absolutePath)).toString("utf8"));
  };
}

export function serializeB1CompleteCycleStreamingReduction(packet) {
  return `${JSON.stringify(packet, null, 2)}\n`;
}

export function evaluateB1CompleteCycleStreamingReductionFromFiles(options = {}) {
  const specPath = options.specPath ?? DEFAULT_B1_COMPLETE_CYCLE_SOURCE_SPEC_PATH;
  const protocolPath = options.protocolPath ?? DEFAULT_B1_COMPLETE_CYCLE_PROTOCOL_PATH;
  const rawStorePath = options.rawStorePath ?? DEFAULT_B1_COMPLETE_CYCLE_RAW_STORE_PATH;
  const sourceBytes = fs.readFileSync(specPath);
  const upstreamSourceHash = sha256Bytes(sourceBytes);
  const spec = JSON.parse(sourceBytes.toString("utf8"));
  const protocol = JSON.parse(fs.readFileSync(protocolPath, "utf8"));
  const exactRecord = createPrescribedBraidExactSourceRecord(spec, {
    sourceHash: upstreamSourceHash,
    generatingSpec: relativeRepositoryPath(specPath),
  });
  const artifactWriter = createPacketArtifactWriter({
    rawStorePath,
    write: options.writeRawStore === true,
    verify: options.verifyRawStore === true,
    reuseExisting: options.replayRawStore === true,
  });
  let completedBatchCount = 0;
  const started = Date.now();
  return evaluateB1StreamingSurfaceReductions({
    sourceRecord: exactRecord,
    completeCycleProtocol: protocol,
    evaluate: options.replayRawStore === true
      ? createRawPacketReplay(rawStorePath)
      : undefined,
    onSurfacePacket(packet, context) {
      const artifact = artifactWriter(packet, context);
      completedBatchCount += 1;
      if (typeof options.onProgress === "function") {
        options.onProgress({
          ...context,
          completedBatchCount,
          elapsedSeconds: (Date.now() - started) / 1000,
        });
      }
      return artifact;
    },
  });
}

function runCli() {
  const options = parseArgs(process.argv.slice(2));
  const packet = evaluateB1CompleteCycleStreamingReductionFromFiles({
    ...options,
    writeRawStore: Boolean(options.writePath) && !options.replayRawStore,
    verifyRawStore: options.verifyRawStore || options.replayRawStore,
    onProgress(progress) {
      if (progress.completedBatchCount === 1 || progress.completedBatchCount % 16 === 0) {
        process.stderr.write(
          `B1 reduction heartbeat: batches=${progress.completedBatchCount} ` +
          `resolution=${progress.resolution} radius=${progress.radius} ` +
          `timeIndex=${progress.timeIndex} wallSeconds=${progress.elapsedSeconds.toFixed(1)}\n`,
        );
      }
    },
  });
  const serialized = serializeB1CompleteCycleStreamingReduction(packet);
  if (options.writePath) {
    fs.mkdirSync(path.dirname(options.writePath), { recursive: true });
    fs.writeFileSync(options.writePath, serialized);
    process.stdout.write(`B1 streaming reduction result written: ${options.writePath}\n`);
    process.stdout.write(
      options.replayRawStore
        ? `raw surface packets replayed and verified: ${options.rawStorePath}\n`
        : `raw surface packets written: ${options.rawStorePath}\n`,
    );
    return;
  }
  if (options.checkPath) {
    if (!fs.existsSync(options.checkPath)) {
      throw new Error(`B1 streaming reduction result is missing: ${options.checkPath}`);
    }
    if (fs.readFileSync(options.checkPath, "utf8") !== serialized) {
      throw new Error(
        "B1 streaming reduction result drift: run " +
        `node scripts/eom/run-b1-complete-cycle-streaming-reduction.mjs ` +
        `--write ${options.checkPath}`,
      );
    }
    process.stdout.write(`B1 streaming reduction result check passed: ${options.checkPath}\n`);
    return;
  }
  process.stdout.write(serialized);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) runCli();
