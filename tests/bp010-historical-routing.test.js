import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { createHash } from "node:crypto";

import { auditHistoricalRouting } from "../scripts/prescribed-path-analysis/audit-bp010-historical-routing.mjs";

const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

test("parents 3-5 require complete explicit historical routes", () => {
  const root = mkdtempSync(join(tmpdir(), "bp010-routing-"));
  const batch = join(root, "batch");
  const archives = join(root, "archives");
  mkdirSync(batch); mkdirSync(archives);
  const roles = ["producer", "producerControls", "verifier", "verifierControls", "operationalEntry", "operationalControls", "acceptanceOwner"];
  const bindings = Object.fromEntries(roles.map((role) => {
    const bytes = Buffer.from(`historical-${role}`);
    const sha256 = digest(bytes);
    const logical = join(root, "current", `${role}.txt`);
    mkdirSync(join(archives, sha256), { recursive: true });
    writeFileSync(join(archives, sha256, basename(logical)), bytes);
    mkdirSync(join(root, "current"), { recursive: true });
    writeFileSync(logical, Buffer.from(`current-${role}`));
    return [role, { path: logical, bytes: bytes.length, sha256 }];
  }));
  for (const parentIndex of [3, 4, 5]) {
    writeFileSync(join(batch, `parent-${parentIndex}.plan.json`), JSON.stringify({
      parentIndex,
      scope: `original-parent-${parentIndex}-emission-refinement`,
      producer: bindings.producer,
      producerControls: bindings.producerControls,
      verifier: bindings.verifier,
      verifierControls: bindings.verifierControls,
      operationalBindings: [bindings.operationalEntry, bindings.operationalControls],
      acceptanceOwner: bindings.acceptanceOwner,
      historicalDocumentRoutes: [],
    }));
  }
  const result = auditHistoricalRouting({ batchDirectory: batch, archiveDirectory: archives });
  assert.equal(result.decision.historicalSourceBytesLocated, true);
  assert.equal(result.decision.preparedPlansExecutableAsHistoricalRoutes, false);
  assert.equal(result.decision.currentTreeReplayIsHistoricalValidation, false);
  assert.ok(result.parents.every((parent) => parent.rows.every((row) => !row.currentMatchesHistoricalBinding)));
});
