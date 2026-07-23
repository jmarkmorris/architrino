import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createHash } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

import {
  buildFixtureInventory,
  resolvedVariant,
  stratifiedRawSelection,
} from "../scripts/eom/benchmark-analytical-campaign-pipeline.mjs";

function hash(label) {
  return createHash("sha256").update(label).digest();
}

test("stratified raw selection is deterministic and retains every stage", () => {
  const rows = [
    ...Array.from({ length: 8 }, (_, index) => ({
      stage: "surface",
      compressedHash: `a${String(index).padStart(2, "0")}`,
    })),
    ...Array.from({ length: 4 }, (_, index) => ({
      stage: "internal",
      compressedHash: `b${String(index).padStart(2, "0")}`,
    })),
    { stage: "branch", compressedHash: "c00" },
  ];
  const first = stratifiedRawSelection(rows, 6);
  const second = stratifiedRawSelection(rows, 6);
  assert.deepEqual(first, second);
  assert.equal(first.length, 6);
  assert.deepEqual(
    [...new Set(first.map((row) => row.stage))].sort(),
    ["branch", "internal", "surface"],
  );
});

test("variant inheritance changes one declared primary variable", () => {
  const current = resolvedVariant("current");
  const direct = resolvedVariant("direct-compressed");
  assert.equal(current.compressionMode, "recompress");
  assert.equal(direct.compressionMode, "verify-existing");
  assert.equal(direct.prepareMode, current.prepareMode);
  assert.equal(direct.journalMode, current.journalMode);
  assert.equal(direct.synchronous, current.synchronous);
  const external = resolvedVariant("external-artifacts");
  assert.equal(external.prepareMode, direct.prepareMode);
  assert.equal(external.compressionMode, direct.compressionMode);
  assert.equal(external.externalArtifacts, true);
});

test("fixture inventory is repeatable and hash-bound to raw, measure, and gate rows", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "campaign-benchmark-test-"));
  const databasePath = path.join(directory, "fixture.sqlite3");
  const database = new DatabaseSync(databasePath);
  try {
    database.exec(`
      CREATE TABLE analytical_raw_artifact (
        compressed_hash BLOB PRIMARY KEY,
        raw_hash BLOB NOT NULL,
        artifact_hash BLOB NOT NULL,
        candidate_id TEXT NOT NULL,
        artifact_kind TEXT NOT NULL,
        raw_bytes INTEGER NOT NULL,
        stored_bytes INTEGER NOT NULL,
        context_json BLOB NOT NULL
      ) STRICT, WITHOUT ROWID;
      CREATE TABLE multidimensional_measure (
        row_hash BLOB PRIMARY KEY,
        result_hash BLOB NOT NULL,
        measure_id TEXT NOT NULL,
        disposition TEXT NOT NULL,
        details_json BLOB NOT NULL
      ) STRICT, WITHOUT ROWID;
      CREATE TABLE validity_gate_result (
        result_hash BLOB NOT NULL,
        gate_id TEXT NOT NULL,
        gate_instrument_version TEXT NOT NULL,
        measured_value REAL,
        comparator TEXT NOT NULL,
        threshold_value REAL,
        independent_pass INTEGER NOT NULL,
        evidence_hash BLOB NOT NULL,
        failure_code TEXT,
        evidence_json BLOB NOT NULL,
        PRIMARY KEY (result_hash, gate_id, gate_instrument_version)
      ) STRICT, WITHOUT ROWID;
    `);
    const rawInsert = database.prepare(`
      INSERT INTO analytical_raw_artifact(
        compressed_hash, raw_hash, artifact_hash, candidate_id, artifact_kind,
        raw_bytes, stored_bytes, context_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (let index = 0; index < 14; index += 1) {
      rawInsert.run(
        hash(`compressed-${index}`),
        hash(`raw-${index}`),
        hash(`artifact-${index}`),
        `candidate-${index % 3}`,
        "raw-packet",
        1_000 + index,
        100 + index,
        Buffer.from(JSON.stringify({ stage: `stage-${index % 7}` })),
      );
    }
    const measureInsert = database.prepare(`
      INSERT INTO multidimensional_measure(
        row_hash, result_hash, measure_id, disposition, details_json
      ) VALUES (?, ?, ?, ?, ?)
    `);
    for (let index = 0; index < 20; index += 1) {
      measureInsert.run(
        hash(`row-${index}`),
        hash(`result-${index % 4}`),
        `measure-${index % 2}`,
        "diagnostic-only",
        Buffer.from(JSON.stringify({ index })),
      );
    }
    const gateInsert = database.prepare(`
      INSERT INTO validity_gate_result(
        result_hash, gate_id, gate_instrument_version,
        measured_value, comparator, threshold_value, independent_pass,
        evidence_hash, failure_code, evidence_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (let index = 0; index < 4; index += 1) {
      gateInsert.run(
        hash(`result-${index}`),
        `gate-${index}`,
        "independent-test.v1",
        index / 4,
        "<=",
        1,
        1,
        hash(`gate-evidence-${index}`),
        null,
        Buffer.from(JSON.stringify({ index })),
      );
    }
  } finally {
    database.close();
  }
  try {
    const first = buildFixtureInventory(databasePath, "small");
    const second = buildFixtureInventory(databasePath, "small");
    assert.equal(first.fixtureHash, second.fixtureHash);
    assert.equal(first.rawArtifactCount, 14);
    assert.equal(first.measureCount, 20);
    assert.equal(first.validityGateCount, 4);
    assert.equal(first.byStage.length, 7);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("SQLite preload profiler distinguishes insert attempts from changed rows", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "sql-profile-test-"));
  const outputPath = path.join(directory, "profile.json");
  const profilerPath = path.resolve(
    "scripts/eom/profile-sqlite-statements-preload.mjs",
  );
  const program = `
    import { DatabaseSync } from "node:sqlite";
    const database = new DatabaseSync(":memory:");
    database.exec("CREATE TABLE t(x INTEGER PRIMARY KEY)");
    const insert = database.prepare("INSERT OR IGNORE INTO t VALUES (?)");
    database.exec("BEGIN IMMEDIATE");
    insert.run(1);
    insert.run(2);
    insert.run(2);
    database.exec("COMMIT");
    database.close();
  `;
  try {
    const child = spawnSync(
      process.execPath,
      ["--import", profilerPath, "--input-type=module", "-e", program],
      {
        encoding: "utf8",
        env: {
          ...process.env,
          ANALYTICAL_SQL_PROFILE_OUTPUT: outputPath,
        },
      },
    );
    assert.equal(child.status, 0, child.stderr || child.stdout);
    const profile = JSON.parse(readFileSync(outputPath, "utf8"));
    const inserts = profile.aggregate.find(
      (row) => row.statementClass === "insert" && row.object === "t",
    );
    assert.equal(inserts.executionCalls, 3);
    assert.equal(inserts.changedRows, 2);
    assert.equal(profile.transactions.completed.length, 1);
    assert.equal(profile.transactions.completed[0].executionCalls, 3);
    assert.equal(profile.transactions.completed[0].changedRows, 2);
    assert.equal(profile.transactions.completed[0].outcome, "commit");
    assert.deepEqual(profile.transactions.incomplete, []);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
