import assert from "node:assert/strict";
import test from "node:test";

import {
  buildFrozenCompleteCycleProtocol,
  buildScoreLandscapeManifest,
  verifyFrozenFiles,
} from "../scripts/eom/build-b1-1-score-landscape-manifest.mjs";
import {
  describeDenseRootAuditContract,
} from "../scripts/eom/audit-b1-1-score-landscape-dense-roots.mjs";
import {
  buildDryRunReceipt,
} from "../scripts/eom/run-b1-1-score-landscape.mjs";

test("BP-009 pure builder freezes exactly 377 unique score-free rows", () => {
  const manifest = buildScoreLandscapeManifest();
  assert.equal(manifest.rows.length, 377);
  assert.equal(new Set(manifest.rows.map((row) => row.rowId)).size, 377);
  assert.equal(
    new Set(manifest.rows.map((row) => row.sampledSpecSha256)).size,
    377,
  );
  assert.deepEqual(
    manifest.rows.map((row) => row.rowType).reduce((counts, kind) => {
      counts[kind] = (counts[kind] ?? 0) + 1;
      return counts;
    }, {}),
    {
      center: 1,
      axial: 48,
      "pairwise-interaction": 264,
      "held-out-latin-hypercube": 64,
    },
  );
  assert.equal(
    manifest.rows.every((row) =>
      row.analyticalState.evaluated === false &&
      row.analyticalState.disposition === null &&
      row.analyticalState.primaryScore === null &&
      row.analyticalState.refinedScore === null &&
      row.analyticalState.denseScore === null),
    true,
  );
});

test("BP-009 center reproduces the sealed sampled and exact-source identities", () => {
  const manifest = buildScoreLandscapeManifest();
  const center = manifest.rows[0];
  assert.equal(center.rowType, "center");
  assert.equal(
    center.sampledSpecSha256,
    "c62c3e8ba3a393c7c090e79e7bd4b3869a8cbc1fcd007c3530cdafc0f45abe67",
  );
  assert.equal(
    center.exactSourceSha256,
    "2fe5abc99c837a627c1817c4c27e39b71ecdae2264ea572d276e3d8e1b42f52a",
  );
});

test("BP-009 held-out rows retain every pre-conversion SHA-256 counter token", () => {
  const heldOut = buildScoreLandscapeManifest().rows.filter(
    (row) => row.rowType === "held-out-latin-hypercube",
  );
  assert.equal(heldOut.length, 64);
  assert.equal(heldOut.every((row) => row.counterTokens.length === 12), true);
  for (const row of heldOut) {
    for (const token of row.counterTokens) {
      assert.match(token.permutationTokenSha256, /^[0-9a-f]{64}$/);
      assert.match(token.jitterTokenSha256, /^[0-9a-f]{64}$/);
      assert.match(token.jitterFirstUnsigned64Hex, /^[0-9a-f]{16}$/);
    }
  }
});

test("BP-009 freezes the complete-cycle protocol at c_f=1 and 24/48 time samples", () => {
  const protocol = buildFrozenCompleteCycleProtocol();
  assert.equal(protocol.eventEvaluator.fieldSpeed, 1);
  assert.deepEqual(protocol.completeCycle.primary, {
    timeSamples: 24,
    polarOrder: 12,
    azimuthCount: 24,
  });
  assert.deepEqual(protocol.completeCycle.refined, {
    timeSamples: 48,
    polarOrder: 16,
    azimuthCount: 32,
  });
});

test("BP-009 dry-run receipt binds files, write-once paths, and null-score rules", () => {
  const files = verifyFrozenFiles();
  const receipt = buildDryRunReceipt();
  assert.equal(files.rowCount, 377);
  assert.equal(receipt.manifest.rowCount, 377);
  assert.equal(receipt.runnerContract.output.rowPathCount, 377);
  assert.equal(receipt.runnerContract.analyticalExecutionImplemented, false);
  assert.equal(receipt.execution.causalRootsEvaluated, false);
  assert.equal(receipt.execution.scoresComputed, false);
  assert.deepEqual(receipt.failClosedRules.nullScoreDispositions, [
    "inapplicable-member-score",
    "unknown-numerical",
    "invalid-manifest-row",
  ]);
});

test("BP-009 dense-root audit validation exposes only the frozen contract", () => {
  const contract = describeDenseRootAuditContract();
  assert.equal(contract.fieldSpeed, 1);
  assert.equal(contract.maximumRootResidual, 1e-12);
  assert.equal(
    contract.failClosedDispositions.missingOrUncertifiedRoot,
    "unknown-numerical",
  );
  assert.match(contract.nullScoreRule, /always carry null scores/);
});
