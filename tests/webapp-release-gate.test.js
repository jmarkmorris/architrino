import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkWebappReleaseGate } from "../scripts/check-webapp-release-gate.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACT_PATH = "reference/priorities/aaa-operations/contracts/webapp-release-gate.v1.json";
const EVIDENCE_PATH = "reference/priorities/aaa-operations/evidence/feedback-webapp-release-gate-2026-09-06.json";
const contract = JSON.parse(fs.readFileSync(path.join(ROOT, CONTRACT_PATH), "utf8"));
const evidence = JSON.parse(fs.readFileSync(path.join(ROOT, EVIDENCE_PATH), "utf8"));
const copy = (value) => structuredClone(value);

test("accepted webapp release profile passes its source-bound gate", () => {
  const result = checkWebappReleaseGate({ rootDir: ROOT, contractPath: CONTRACT_PATH });
  assert.equal(result.status, "passed");
  assert.deepEqual(result.profiles, [
    {
      id: "public-feedback",
      status: "passed_pre_release",
      route: "/feedback.html",
      // Fifteen files: the four feedback sources plus the shared control strip
      // accepted on 2026-09-05. Re-capture the receipt before changing these.
      resourceFiles: 15,
      uncompressedBytes: 69882,
      evidencePath: EVIDENCE_PATH,
    },
  ]);

  const integrityRunner = fs.readFileSync(path.join(ROOT, "scripts/check-content-integrity.mjs"), "utf8");
  assert.match(integrityRunner, /Validate accepted webapp release profiles/u);
  assert.match(integrityRunner, /scripts\/check-webapp-release-gate\.mjs/u);
});

test("release gate rejects undeclared load-time resources and source growth", () => {
  const missingResource = copy(contract);
  missingResource.profiles[0].resourceClosure.pop();
  assert.throws(
    () => checkWebappReleaseGate({ rootDir: ROOT, contract: missingResource }),
    /local resource closure mismatch/u
  );

  const overBudget = copy(contract);
  overBudget.profiles[0].size.maxUncompressedBytes = 1;
  assert.throws(
    () => checkWebappReleaseGate({ rootDir: ROOT, contract: overBudget }),
    /bytes exceed 1/u
  );
});

test("release gate rejects stale source hashes", () => {
  const stale = copy(evidence);
  stale.sourceFiles[0].sha256 = "0".repeat(64);
  assert.throws(
    () => checkWebappReleaseGate({
      rootDir: ROOT,
      contract,
      evidenceByPath: new Map([[EVIDENCE_PATH, stale]]),
    }),
    /SHA-256 changed for feedback\.html/u
  );
});

test("release gate rejects failed browser, accessibility, or preview evidence", () => {
  for (const [field, mutate, pattern] of [
    ["browser", (item) => { item.checks.browser.consoleMessageCount = 1; }, /browser console is not clean/u],
    ["accessibility", (item) => { item.checks.accessibility.unnamedControlCount = 1; }, /unnamed control budget exceeded/u],
    ["preview", (item) => { item.checks.preview.entrypointIncluded = false; }, /preview route did not pass/u],
  ]) {
    const failed = copy(evidence);
    mutate(failed);
    assert.throws(
      () => checkWebappReleaseGate({
        rootDir: ROOT,
        contract,
        evidenceByPath: new Map([[EVIDENCE_PATH, failed]]),
      }),
      pattern,
      field
    );
  }
});
