#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function readJsonLines(filePath) {
  return readFileSync(filePath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function deterministicCensusRow(row) {
  const copy = structuredClone(row);
  delete copy.engine.chunkWallSeconds;
  delete copy.engine.cumulativeWallSeconds;
  return copy;
}

function checkpointProjection(record) {
  return record.worldlines.map((worldline) => ({
    id: worldline.id,
    fingerprint: worldline.historyFingerprint,
    segments: worldline.segments,
  }));
}

const [uninterruptedDirectory, resumedDirectory, dumpTool] =
  process.argv.slice(2);
if (!uninterruptedDirectory || !resumedDirectory || !dumpTool) {
  throw new Error(
    "usage: validate-attractor-resume-gate.mjs " +
      "<uninterrupted-dir> <resumed-dir> <checkpoint-dump-tool>",
  );
}

const artifact = (directory, name) => path.join(directory, name);
const uninterruptedCheckpoint = readFileSync(
  artifact(uninterruptedDirectory, "checkpoint.bin"),
);
const resumedCheckpoint = readFileSync(
  artifact(resumedDirectory, "checkpoint.bin"),
);
assert.deepEqual(
  resumedCheckpoint,
  uninterruptedCheckpoint,
  "final resumed checkpoint is not byte-identical to uninterrupted execution",
);

for (const name of [
  "frames.jsonl",
  "assembly-view-record.json",
  "replay.borg-trajectory.json",
]) {
  assert.deepEqual(
    readFileSync(artifact(resumedDirectory, name)),
    readFileSync(artifact(uninterruptedDirectory, name)),
    `${name} differs across uninterrupted and resumed execution`,
  );
}

const uninterruptedManifest = readJson(
  artifact(uninterruptedDirectory, "run-manifest.json"),
);
const resumedManifest = readJson(
  artifact(resumedDirectory, "run-manifest.json"),
);
for (const manifest of [uninterruptedManifest, resumedManifest]) {
  assert.equal(
    manifest.schema,
    "eom_attractor_ensemble_run_manifest/v1",
  );
  assert.equal(
    manifest.resumeAccountingSchema,
    "eom_attractor_resume_accounting/v1",
  );
  assert.equal(manifest.releaseRootClearance, "certified_complete");
  assert.equal(manifest.crossChunkComparisonPolicy,
    "integer-grid-decimal-endpoints/v1");
  assert.equal(manifest.status, "completed");
  assert.equal(manifest.chunksCompleted, 2);
  assert.equal(manifest.acceptedSteps, 10);
  assert.equal(manifest.rejectedSteps, 0);
  assert.equal(manifest.framesEmitted, 22);
  assert.equal(manifest.acceptedEndTime, "0.10000000000000001");
  assert.notEqual(manifest.engineBuildId, "unspecified");
  assert.notEqual(manifest.generatingSpec, "unspecified");
  assert.notEqual(manifest.recordDate, "unspecified");
}
assert.equal(uninterruptedManifest.resumeCount, 0);
assert.equal(resumedManifest.resumeCount, 1);
assert.equal(resumedManifest.runId, uninterruptedManifest.runId);
assert.equal(resumedManifest.modelFingerprint,
  uninterruptedManifest.modelFingerprint);
assert.equal(
  resumedManifest.resumeConfigurationFingerprint,
  uninterruptedManifest.resumeConfigurationFingerprint,
);
assert.match(
  resumedManifest.resumeConfigurationFingerprint,
  /^fnv1a64-resume-v1:[0-9a-f]{16}$/,
);

const uninterruptedCensus = readJsonLines(
  artifact(uninterruptedDirectory, "census.jsonl"),
);
const resumedCensus = readJsonLines(
  artifact(resumedDirectory, "census.jsonl"),
);
assert.equal(uninterruptedCensus.length, 2);
assert.equal(resumedCensus.length, 2);
assert.deepEqual(
  resumedCensus.map(deterministicCensusRow),
  uninterruptedCensus.map(deterministicCensusRow),
  "cross-chunk deterministic census projection differs after resume",
);
assert.ok(
  resumedCensus[1].engine.cumulativeWallSeconds >
    resumedCensus[0].engine.cumulativeWallSeconds,
  "resumed census cumulative wall time did not advance",
);
assert.equal(
  resumedManifest.cumulativeWallSeconds,
  resumedCensus[1].engine.cumulativeWallSeconds,
);

const record = readJson(
  artifact(resumedDirectory, "assembly-view-record.json"),
);
assert.equal(record.provenance.engineId, "eom-solver");
assert.equal(record.provenance.claimGrade, "evolved-record");
assert.equal(record.provenance.runStatus, "completed");
const checkpointDump = JSON.parse(
  execFileSync(
    dumpTool,
    [artifact(resumedDirectory, "checkpoint.bin")],
    { encoding: "utf8" },
  ),
);
assert.deepEqual(
  checkpointProjection(record),
  checkpointDump.paths,
  "assembly-view record tokens differ from the public checkpoint dump",
);

process.stdout.write(`${JSON.stringify({
  schema: "eom_attractor_resume_gate_validation/v1",
  status: "passed",
  claimBoundary:
    "deterministic resume, cumulative accounting, release clearance, " +
    "and checkpoint-record serialization parity only",
  checkpointByteIdentical: true,
  streamedFramesByteIdentical: true,
  assemblyRecordByteIdentical: true,
  deterministicCensusProjectionEqual: true,
  checkpointRecordTokenParity: true,
  checkpointSha256: sha256(resumedCheckpoint),
  framesSha256: sha256(
    readFileSync(artifact(resumedDirectory, "frames.jsonl")),
  ),
  recordSha256: sha256(
    readFileSync(artifact(resumedDirectory, "assembly-view-record.json")),
  ),
  uninterruptedManifest: {
    chunksCompleted: uninterruptedManifest.chunksCompleted,
    acceptedSteps: uninterruptedManifest.acceptedSteps,
    rejectedSteps: uninterruptedManifest.rejectedSteps,
    framesEmitted: uninterruptedManifest.framesEmitted,
    resumeCount: uninterruptedManifest.resumeCount,
    releaseRootClearance: uninterruptedManifest.releaseRootClearance,
  },
  resumedManifest: {
    chunksCompleted: resumedManifest.chunksCompleted,
    acceptedSteps: resumedManifest.acceptedSteps,
    rejectedSteps: resumedManifest.rejectedSteps,
    framesEmitted: resumedManifest.framesEmitted,
    resumeCount: resumedManifest.resumeCount,
    releaseRootClearance: resumedManifest.releaseRootClearance,
  },
}, null, 2)}\n`);
