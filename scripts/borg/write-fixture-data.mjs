#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { buildBorgAppSurfaceDesign } from "./build-app-surface-design.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(SCRIPT_DIR, "../..");
const OUTPUT_PATH = path.join(ROOT_DIR, "src", "apps", "borg", "BorgFixtureData.js");

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

export async function buildBorgFixtureDataModule() {
  const { surfaceDesign, manifest } = await buildBorgAppSurfaceDesign();
  return (
    deepGeneratedHeader() +
    serializeExport("BORG_DATASET_MANIFEST_V1", manifest) +
    serializeExport("BORG_APP_SURFACE_DESIGN_V1", surfaceDesign) +
    serializeExport("BORG_FAIL_CLOSED_ROWS", collectFailClosedRows(manifest)) +
    getHelperTail()
  );
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const next = await buildBorgFixtureDataModule();
  if (args.has("--check")) {
    const current = fs.readFileSync(OUTPUT_PATH, "utf8");
    if (current !== next) {
      throw new Error("Borg fixture data is stale. Run node scripts/borg/write-fixture-data.mjs --write.");
    }
    return;
  }
  if (args.has("--write")) {
    fs.writeFileSync(OUTPUT_PATH, next, "utf8");
    return;
  }
  process.stdout.write(next);
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
