import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePlanarCoRotatingRing } from "../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const python = process.env.AAA_VENV
  ? path.join(process.env.AAA_VENV, "bin", "python")
  : path.resolve(root, "..", ".venv", "bin", "python");

function runCertificate() {
  const output = execFileSync(
    python,
    [path.join(root, "scripts/equation-mapping/certify_bp013_local_d4_cell.py")],
    { cwd: root, encoding: "utf8", maxBuffer: 4 * 1024 * 1024 },
  );
  return JSON.parse(output);
}

function runManifest() {
  const output = execFileSync(
    python,
    [path.join(root, "scripts/equation-mapping/derive_bp013_affine_fold_atlas.py")],
    { cwd: root, encoding: "utf8", maxBuffer: 2 * 1024 * 1024 },
  );
  return JSON.parse(output);
}

function sheetKey(sheet) {
  return JSON.stringify({
    gapCoefficients: sheet.gapCoefficients,
    owners: sheet.owners,
    lobeIndex: sheet.lobeIndex,
  });
}

test("BP-013 local D4 cell certifies fold separation, complete roots, and one full-vector zero", () => {
  const packet = runCertificate();
  assert.equal(packet.schema, "braid-program/bp013-local-d4-cell-certificate.v1");
  assert.equal(packet.declaredDomain.fieldSpeed, "1");
  assert.equal(packet.foldAtlas.signFeasibleSheetCount, 78);
  assert.equal(packet.foldAtlas.allSheetsStrictlySeparatedFromHull, true);
  assert.equal(packet.foldAtlas.completeDirectedOwnersPreserved, true);
  assert.equal(packet.foldAtlas.directedOwnerCount, 16);
  assert.equal(packet.foldAtlas.sameTransmitterOwnerCount, 4);
  assert.equal(packet.foldAtlas.ownerSheetIncidenceCount, 96);
  assert.deepEqual(packet.rootCensus.rootCountMatrix, [
    [1, 3, 1, 1],
    [1, 1, 3, 1],
    [1, 1, 1, 3],
    [3, 1, 1, 1],
  ]);
  assert.equal(packet.rootCensus.directedRootCount, 24);
  assert.equal(packet.rootCensus.pairReceipts.length, 16);
  assert.equal(packet.sevenResidualRows.intervalsOnCertifiedHull.length, 7);
  assert.equal(packet.krawczyk.strictlyInsideCertifiedHull, true);
  assert.equal(packet.regularSquareExistenceAndIdentification.meanRadialStrictlyNegative, true);
  assert.equal(packet.summary.fullVectorBalanceZeroCount, 1);
  assert.equal(packet.summary.additionalZeroCountInLocalCell, 0);
  assert.equal(packet.summary.allPassed, true);

  const manifest = runManifest();
  assert.equal(manifest.signFeasibleSheetCount, 78);
  assert.deepEqual(
    packet.foldAtlas.sheets.map(sheetKey).sort(),
    manifest.sheets.map(sheetKey).sort(),
  );

  const beta = Number(packet.declaredDomain.betaCenter);
  const evaluation = evaluatePlanarCoRotatingRing({
    phases: [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2],
    polarities: [1, -1, 1, -1],
    beta,
  });
  assert.equal(evaluation.rootCompleteness.complete, true);
  assert.equal(evaluation.rootCount, 24);
  assert.ok(evaluation.compatibleScale > 0);
  assert.ok(evaluation.residuals.maximumFullVector < 1e-10);
});
