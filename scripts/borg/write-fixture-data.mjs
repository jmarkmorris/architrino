#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { buildBorgAppSurfaceDesign } from "./build-app-surface-design.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SCRIPT_DIR, "../..");
const OUTPUT_PATH = path.join(ROOT_DIR, "src", "apps", "borg", "BorgFixtureData.js");
const TRAJECTORY_OUTPUT_PATH = path.join(
  ROOT_DIR,
  "src",
  "apps",
  "borg",
  "borg-fixture-trajectory.v1.json",
);
const TRAJECTORY_SCHEMA = "borg-fixture-trajectory.v1";
const TRAJECTORY_ASSET_PATH = "./borg-fixture-trajectory.v1.json";

function deepGeneratedHeader() {
  return `function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach((entry) => deepFreeze(entry));
  }
  return value;
}

`;
}

function collectFailClosedRows(manifest) {
  const rows = [];
  const seen = new Set();
  const appendGapRows = (gapRows = []) => {
    gapRows.forEach((row) => {
      if (!row?.firstFailureCode || seen.has(row.firstFailureCode)) {
        return;
      }
      seen.add(row.firstFailureCode);
      rows.push({
        firstFailureCode: row.firstFailureCode,
        affectedConsumers: row.affectedConsumers ?? [],
        valueAuthority: row.valueAuthority ?? "fail-closed-value",
      });
    });
  };
  appendGapRows(manifest.wakeHistory?.wakeHistoryGapRows);
  appendGapRows(manifest.faceBoundary?.faceBoundaryGapRows);
  appendGapRows(manifest.faceBoundary?.faceInfluenceModelGapRows);
  appendGapRows(manifest.faceBoundary?.sixFaceBoundaryNoisePolicyGapRows);
  appendGapRows(manifest.faceBoundary?.velocitySamplingGapRows);
  const residualFailureCode = manifest.boundaryToCentralResidual?.firstFailureCode;
  if (residualFailureCode && !seen.has(residualFailureCode)) {
    rows.push({
      firstFailureCode: residualFailureCode,
      affectedConsumers: manifest.boundaryToCentralResidual?.failClosedAffectedValueIds ?? [],
      valueAuthority: "fail-closed-value",
    });
  }
  return rows;
}

function serializeExport(name, value) {
  return `export const ${name} = deepFreeze(${JSON.stringify(value, null, 2)});\n\n`;
}

function getHelperTail() {
  const current = fs.readFileSync(OUTPUT_PATH, "utf8");
  const helperStart = current.indexOf("export function getBorgFrameSet");
  if (helperStart < 0) {
    throw new Error("Could not find Borg fixture helper tail.");
  }
  return current.slice(helperStart);
}

/**
 * Split the native run record into the part the browser needs before it can
 * paint and the part it does not.
 *
 * The full trajectory is 24k rows. Inlined into the module, the browser had to
 * parse all of it before the first frame, and it is needed by neither the
 * first frame nor a live run, which seeds from the frameIndex-0 rows alone.
 * The rows themselves are unchanged and stay authoritative solver output; only
 * where they live changes.
 */
export function splitBorgFixtureManifest(manifest) {
  const frames = manifest.currentStateFrames;
  const trajectoryFrameIds = manifest.currentStateAndFrameSources.trajectoryFrameIds ?? [];
  const seedFrames = frames.filter((row) => Number(row.frameIndex) === 0);
  const times = frames.map((row) => Number(row.time));

  const trajectory = {
    schema: TRAJECTORY_SCHEMA,
    manifestId: manifest.manifestId,
    runId: manifest.runId,
    nativeRunId: manifest.sourceBridgeRun.nativeRunId,
    recordAuthority: "authoritative-solver-output",
    claimLevel: manifest.claimLevel,
    canonicalEomEvidence: manifest.sourceBridgeRun.canonicalEomEvidence,
    eomEvidenceStatus: manifest.sourceBridgeRun.eomEvidenceStatus,
    eomEvidenceReason: manifest.sourceBridgeRun.eomEvidenceReason,
    frameCount: frames.length,
    pathRowCount: manifest.sourceBridgeRun.pathRowCount,
    nativeKeyframeCount: manifest.sourceBridgeRun.nativeKeyframeCount,
    sampleInterval: manifest.sourceBridgeRun.sampleInterval,
    historyStartTime: Math.min(...times),
    historyEndTime: Math.max(...times),
    currentStateFrames: frames,
    trajectoryFrameIds,
  };

  const browserManifest = { ...manifest };
  browserManifest.currentStateFrames = seedFrames;
  browserManifest.trajectoryRecord = {
    schema: TRAJECTORY_SCHEMA,
    assetPath: TRAJECTORY_ASSET_PATH,
    recordAuthority: trajectory.recordAuthority,
    loadPolicy: "load-on-demand-not-on-first-paint",
    seedFrameCount: seedFrames.length,
    frameCount: trajectory.frameCount,
    pathRowCount: trajectory.pathRowCount,
    nativeKeyframeCount: trajectory.nativeKeyframeCount,
    trajectoryFrameIdCount: trajectoryFrameIds.length,
    sampleInterval: trajectory.sampleInterval,
    historyStartTime: trajectory.historyStartTime,
    historyEndTime: trajectory.historyEndTime,
    canonicalEomEvidence: trajectory.canonicalEomEvidence,
    eomEvidenceStatus: trajectory.eomEvidenceStatus,
  };
  browserManifest.currentStateAndFrameSources = {
    ...manifest.currentStateAndFrameSources,
    trajectoryFrameIdCount: trajectoryFrameIds.length,
    trajectoryFrameIdSource: "borg-fixture-trajectory.v1.json",
  };
  delete browserManifest.currentStateAndFrameSources.trajectoryFrameIds;

  return { browserManifest, trajectory };
}

export async function buildBorgFixtureDataModule() {
  const { surfaceDesign, manifest } = await buildBorgAppSurfaceDesign();
  const { browserManifest, trajectory } = splitBorgFixtureManifest(manifest);
  const module =
    deepGeneratedHeader() +
    serializeExport("BORG_DATASET_MANIFEST_V1", browserManifest) +
    serializeExport("BORG_APP_SURFACE_DESIGN_V1", surfaceDesign) +
    serializeExport("BORG_FAIL_CLOSED_ROWS", collectFailClosedRows(manifest)) +
    getHelperTail();
  return { module, trajectoryAsset: `${JSON.stringify(trajectory, null, 2)}\n` };
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const { module, trajectoryAsset } = await buildBorgFixtureDataModule();
  if (args.has("--check")) {
    const stale = [];
    if (fs.readFileSync(OUTPUT_PATH, "utf8") !== module) {
      stale.push(path.relative(ROOT_DIR, OUTPUT_PATH));
    }
    if (
      !fs.existsSync(TRAJECTORY_OUTPUT_PATH) ||
      fs.readFileSync(TRAJECTORY_OUTPUT_PATH, "utf8") !== trajectoryAsset
    ) {
      stale.push(path.relative(ROOT_DIR, TRAJECTORY_OUTPUT_PATH));
    }
    if (stale.length > 0) {
      throw new Error(
        `Borg fixture data is stale (${stale.join(", ")}). Run node scripts/borg/write-fixture-data.mjs --write.`,
      );
    }
    return;
  }
  if (args.has("--write")) {
    fs.writeFileSync(OUTPUT_PATH, module, "utf8");
    fs.writeFileSync(TRAJECTORY_OUTPUT_PATH, trajectoryAsset, "utf8");
    return;
  }
  process.stdout.write(module);
}

if (isDirectCliInvocation()) {
  main().catch((error) => {
    console.error(error?.stack || error?.message || String(error));
    process.exitCode = 1;
  });
}

function isDirectCliInvocation() {
  return typeof process.argv[1] === "string" && import.meta.url === pathToFileURL(process.argv[1]).href;
}
