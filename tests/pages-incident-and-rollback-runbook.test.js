import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(ROOT, relativePath), "utf8");
const receipt = JSON.parse(
  read("reference/priorities/aaa-operations/pages-rollback-rehearsal-2026-09-01.json")
);
const runbook = read("reference/priorities/aaa-operations/pages-incident-and-rollback-runbook.md");
const workflow = read(".github/workflows/pages.yml");

test("Pages rollback rehearsal preserves its incomplete live-verification boundary", () => {
  assert.equal(receipt.status, "source_rebuild_pass_live_redeploy_unverified");
  assert.equal(receipt.productionMutation, false);
  assert.equal(receipt.lastKnownGood.conclusion, "success");
  assert.equal(receipt.lastKnownGood.branch, "main");
  assert.equal(receipt.rehearsal.contentIntegrity.status, "passed");
  assert.equal(receipt.rehearsal.firstBuild.status, "passed");
  assert.equal(receipt.rehearsal.firstBuild.fileCount, 4011);
  assert.equal(receipt.rehearsal.secondBuild.fileCount, 4011);
  assert.equal(receipt.rehearsal.sameEnvironmentComparison.status, "byte_identical");
  assert.equal(receipt.rehearsal.historicalComparison.byteDelta, 91);
  assert.equal(receipt.rehearsal.historicalComparison.mismatchedPaths, 40);
  assert.equal(receipt.rehearsal.historicalComparison.mismatchFamily, "generated_borg_records_only");
  assert.equal(receipt.rehearsal.historicalComparison.unmatchedNonBorgPaths, 0);
  assert.equal(receipt.rehearsal.liveRerun.status, "not_run");
  assert.equal(receipt.rehearsal.communicationDrill.externalMessageSent, false);
});

test("runbook covers every queued incident class and communication stage", () => {
  for (const symptom of ["Broken", "Stale", "Slow", "Over budget"]) {
    assert.match(runbook, new RegExp(`\\| ${symptom} \\|`, "u"));
  }
  for (const heading of [
    "Initial notice",
    "Rollback notice",
    "Recovery notice",
    "Closeout",
  ]) {
    assert.match(runbook, new RegExp(`### ${heading}`, "u"));
  }
  for (const field of [
    "Detection time",
    "User-visible impact",
    "Selected run ID",
    "Explicit statement that recovery is not yet confirmed",
    "Successful rollback run attempt",
    "Root cause with evidence grade",
  ]) {
    assert.match(runbook, new RegExp(field, "u"));
  }
});

test("runbook uses the full source-bound rerun and forbids bypass paths", () => {
  assert.match(runbook, /gh run rerun RUN_ID/u);
  assert.match(runbook, /gh run watch RUN_ID --exit-status/u);
  assert.match(runbook, /Do not use `--failed` or a deploy-job-only re-run/u);
  assert.match(runbook, /Do not disable the workflow or switch Pages to branch publishing/u);
  assert.match(runbook, /OPS-009 remains awaiting verification/u);
});

test("current Pages workflow keeps build, deployment, and pause controls ordered", () => {
  const validateIndex = workflow.indexOf("node scripts/check-content-integrity.mjs");
  const buildIndex = workflow.indexOf("node scripts/build-static-site.mjs --out .tmp/site");
  const uploadIndex = workflow.indexOf("uses: actions/upload-pages-artifact@v4");
  const guardIndex = workflow.indexOf("ARCHITRINO_PAGES_DEPLOY_ENABLED");
  const deployIndex = workflow.indexOf("uses: actions/deploy-pages@v4");
  assert.ok(validateIndex >= 0 && validateIndex < buildIndex);
  assert.ok(buildIndex < uploadIndex);
  assert.ok(guardIndex >= 0 && guardIndex < deployIndex);
  assert.match(workflow, /github\.ref == 'refs\/heads\/main'/u);
  assert.match(workflow, /build_type/u);
});
