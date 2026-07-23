import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  buildTestCompactMonteCarloCampaign,
} from "./support/compact-monte-carlo-fixture.mjs";

test("compact storage benchmark preserves one logical inventory", () => {
  const directory = mkdtempSync(
    resolve(tmpdir(), "architrino-compact-storage-test-"),
  );
  const inputPath = resolve(directory, "input.json");
  const outputPath = resolve(directory, "report.json");
  const campaign = buildTestCompactMonteCarloCampaign();
  writeFileSync(inputPath, `${JSON.stringify(campaign, null, 2)}\n`);

  try {
    const run = spawnSync(
      process.execPath,
      [
        "scripts/eom/benchmark-compact-monte-carlo-storage.mjs",
        "--input",
        inputPath,
        "--output",
        outputPath,
        "--warmups",
        "0",
        "--repetitions",
        "1",
      ],
      {
        cwd: resolve(import.meta.dirname, ".."),
        encoding: "utf8",
      },
    );
    assert.equal(run.status, 0, run.stderr);
    const report = JSON.parse(readFileSync(outputPath, "utf8"));
    assert.equal(
      report.equivalence.identicalAcrossVariantsAndRepetitions,
      true,
    );
    assert.deepEqual(
      report.variants.map((variant) => variant.id),
      ["sqlite-control-plane", "gzip-ndjson", "gzip-csv-with-json"],
    );
    for (const variant of report.variants) {
      assert.equal(variant.runs[0].inventoryHash, report.sourceBoundary.logicalInventoryHash);
    }
    const sqlite = report.variants.find(
      (variant) => variant.id === "sqlite-control-plane",
    );
    assert.equal(sqlite.runs[0].verification.integrity, "ok");
    assert.equal(sqlite.runs[0].verification.foreignKeyViolationCount, 0);
    assert.equal(sqlite.runs[0].verification.prohibitedBlobColumnCount, 0);
    assert.equal(sqlite.runs[0].verification.journalMode, "DELETE");
    assert.equal(sqlite.runs[0].verification.transactionCount, 1);
    assert.equal(sqlite.runs[0].verification.insertStatementCount, 4);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
