import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkBrowserPerformanceBudget } from "../scripts/check-browser-performance-budget.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACT_PATH = "reference/priorities/aaa-operations/contracts/browser-performance-budget.v1.json";
const EVIDENCE_PATH = "reference/priorities/aaa-operations/evidence/browser-performance-baseline-2026-09-06.json";
const contract = JSON.parse(fs.readFileSync(path.join(ROOT, CONTRACT_PATH), "utf8"));
const evidence = JSON.parse(fs.readFileSync(path.join(ROOT, EVIDENCE_PATH), "utf8"));
const copy = (value) => structuredClone(value);

test("accepted representative browser profiles pass their source-bound budgets", () => {
  const result = checkBrowserPerformanceBudget({ rootDir: ROOT, contractPath: CONTRACT_PATH });
  assert.equal(result.status, "passed");
  assert.deepEqual(result.profiles.map(({ id, route }) => ({ id, route })), [
    { id: "public-feedback-interaction", route: "/feedback.html" },
    { id: "photon-4k-visual", route: "/photon.html" },
  ]);

  const integrityRunner = fs.readFileSync(path.join(ROOT, "scripts/check-content-integrity.mjs"), "utf8");
  assert.match(integrityRunner, /Validate accepted browser performance budgets/u);
  assert.match(integrityRunner, /scripts\/check-browser-performance-budget\.mjs/u);
});

test("browser budget rejects launch, interaction, frame, heap, and storage regressions", () => {
  for (const [label, mutate, pattern] of [
    ["cold transfer", (item) => { item.profiles["public-feedback-interaction"].launch.cold.transferBytes = 2_000_000; }, /cold transfer/u],
    ["interaction", (item) => { item.profiles["public-feedback-interaction"].interaction.nextPaintMs = 200; }, /interaction next paint/u],
    ["frame", (item) => { item.profiles["photon-4k-visual"].frameTiming.p95Ms = 25; }, /frame p95/u],
    ["heap", (item) => { item.profiles["photon-4k-visual"].heap.warmAfterFramesUsedBytes = 300_000_000; }, /used heap/u],
    ["storage", (item) => { item.profiles["public-feedback-interaction"].storage.originUsageBytes = 2_000_000; }, /origin storage/u],
  ]) {
    const failed = copy(evidence);
    mutate(failed);
    assert.throws(
      () => checkBrowserPerformanceBudget({ rootDir: ROOT, contract, evidence: failed }),
      pattern,
      label,
    );
  }
});

test("browser budget rejects stale app or instrument identity", () => {
  const staleApp = copy(evidence);
  staleApp.sourceClosures["public-feedback-interaction"].sha256 = "0".repeat(64);
  assert.throws(
    () => checkBrowserPerformanceBudget({ rootDir: ROOT, contract, evidence: staleApp }),
    /source fingerprint changed/u,
  );

  const staleInstrument = copy(evidence);
  staleInstrument.instrumentSources[0].sha256 = "0".repeat(64);
  assert.throws(
    () => checkBrowserPerformanceBudget({ rootDir: ROOT, contract, evidence: staleInstrument }),
    /instrument SHA-256 changed/u,
  );
});

test("browser budget rejects GPU surface or shared-process envelope regressions", () => {
  const surface = copy(evidence);
  surface.profiles["photon-4k-visual"].gpuSurfaceProxy.minimumSurfaceBytes = 80_000_000;
  assert.throws(
    () => checkBrowserPerformanceBudget({ rootDir: ROOT, contract, evidence: surface }),
    /GPU surface lower bound/u,
  );

  const process = copy(evidence);
  process.gpuProcess.peakResidentBytes = 300_000_000;
  assert.throws(
    () => checkBrowserPerformanceBudget({ rootDir: ROOT, contract, evidence: process }),
    /GPU process peak RSS/u,
  );
});
