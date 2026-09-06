import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function bashBlocks(markdown) {
  return [...markdown.matchAll(/```bash\n([\s\S]*?)```/g)].map(
    (match) => match[1]
  );
}

test("PR procedure executable blocks preserve commands required for advancement verification", () => {
  const procedure = read("reference/op/git/codex-pr-branch.md");
  const executable = bashBlocks(procedure).join("\n");

  assert.equal(executable.includes("gh pr create --fill"), false);
  assert.equal(executable.includes("|| git branch -D"), false);
  assert.equal(executable.includes("$("), false);
  assert.match(executable, /git merge-tree --write-tree HEAD origin\/main/);
  assert.match(executable, /git merge-base --is-ancestor <headRefOid> HEAD/);
  assert.match(executable, /git log --oneline --decorate <headRefOid>\.\.HEAD/);
});

test("PR procedure, pre-push hook, and CI share the aggregate gate", () => {
  const procedure = read("reference/op/git/codex-pr-branch.md");
  const hook = read(".githooks/pre-push");
  const workflow = read(".github/workflows/content-integrity.yml");
  const aggregate = read("scripts/check-content-integrity.mjs");
  const receipt = read("scripts/pr-validation-receipt.mjs");

  assert.match(procedure, /node scripts\/pr-validation-receipt\.mjs run/);
  assert.match(hook, /node scripts\/pre-push-gate-policy\.mjs/);
  assert.match(hook, /node scripts\/pr-validation-receipt\.mjs verify/);
  assert.match(hook, /node scripts\/pr-validation-receipt\.mjs run/);
  assert.match(receipt, /scripts\/check-content-integrity\.mjs/);
  assert.match(receipt, /scripts\/check-animator-runtime-wiring\.mjs/);
  assert.match(workflow, /run: node scripts\/check-content-integrity\.mjs/);
  assert.match(aggregate, /tests\/pre-push-gate-policy\.test\.js/);
  assert.match(aggregate, /tests\/pr-branch-process-conformance\.test\.js/);
  assert.match(aggregate, /tests\/pr-validation-receipt\.test\.js/);
  assert.match(aggregate, /scripts\/check-reader-facing-publication-boundary\.mjs/);
  assert.match(aggregate, /tests\/reader-facing-publication-boundary\.test\.js/);
});

test("routine PR validation excludes on-demand iOS package freshness without dropping web checks", () => {
  const aggregate = read("scripts/check-content-integrity.mjs");
  const procedure = read("reference/op/git/codex-pr-branch.md");
  const iosReadme = read("apps/ios/ArchitrinoReader/README.md");

  assert.doesNotMatch(aggregate, /scripts\/export-ios-textbook-package\.mjs/);
  assert.match(aggregate, /scripts\/build-scene-graph\.mjs/);
  assert.match(aggregate, /scripts\/build-textbook-md-pdf\.mjs/);
  assert.match(aggregate, /scripts\/build-equation-mapping-corpus\.mjs/);
  assert.match(procedure, /iOS textbook package is on-demand and excluded from routine PR freshness requirements/);
  assert.match(iosReadme, /node scripts\/export-ios-textbook-package\.mjs --write --strict/);
  assert.match(iosReadme, /node scripts\/export-ios-textbook-package\.mjs --check --strict/);
  assert.match(iosReadme, /App Store release work is deferred until theory closure/);
});

test("routine notation validation ignores a saved iOS snapshot but rejects authored notation drift", (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "architrino-ios-snapshot-policy-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const authoredPath = path.join(fixtureRoot, "content/markdown/aaa/example.md");
  const snapshotPath = path.join(fixtureRoot, "apps/ios/ArchitrinoReader/GeneratedTextbookPackage/example.md");
  for (const filePath of [authoredPath, snapshotPath]) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  fs.writeFileSync(authoredPath, "# Current authored content\n");
  fs.writeFileSync(snapshotPath, "# Older device-test snapshot\nO:M:I\n");
  const run = () => spawnSync(process.execPath, [path.join(ROOT, "scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs")], {
    cwd: fixtureRoot,
    encoding: "utf8",
  });

  const snapshotOnlyDrift = run();
  assert.equal(snapshotOnlyDrift.status, 0, snapshotOnlyDrift.stderr);
  assert.match(snapshotOnlyDrift.stdout, /scanned 1 files/);

  fs.writeFileSync(authoredPath, "# Invalid current authored notation\nO:M:I\n");
  const authoredDrift = run();
  assert.equal(authoredDrift.status, 1);
  assert.match(authoredDrift.stderr, /content\/markdown\/aaa\/example\.md:2/);
  assert.doesNotMatch(authoredDrift.stderr, /GeneratedTextbookPackage/);
});

test("children's-book pilot exports stay local and optional during routine PRs", () => {
  const procedure = read("reference/op/git/codex-pr-branch.md");
  const aggregate = read("scripts/check-content-integrity.mjs");
  const ignore = read(".gitignore");
  const manifest = JSON.parse(read("reference/learning-office/childrens-books/production/generation-manifest.json"));
  assert.match(procedure, /children's-book pilot exports are also on-demand and excluded from routine PR output/);
  assert.match(ignore, /^\/\.local-data\/childrens-books\/$/m);
  assert.doesNotMatch(aggregate, /render_book_pages|build_review_bundle|pilot_appearance/);
  for (const entry of manifest.entries) {
    for (const key of ["page_landscape_png", "derivative_4x5_png", "derivative_9x16_png"]) {
      assert.ok(entry.paths[key].startsWith(".local-data/childrens-books/exports/"));
    }
    for (const key of ["page_layout", "derivative_4x5", "derivative_9x16"]) {
      assert.equal(entry.status[key], "on_demand");
    }
  }
});

test("PR procedure makes unattended execution measurable and requires verification for advancement", () => {
  const procedure = read("reference/op/git/codex-pr-branch.md");
  const verification = read(
    "reference/op/git/codex-pr-unattended-verification.md"
  );
  const operatorFeedback = read("reference/op/README-op.md");

  // The four counters are defined once, in the procedure's Permission measurement
  // section. The ledger references that definition rather than restating the list,
  // so assert the definition here and the reference below.
  for (const counter of [
    "operatorDecisionPromptCount",
    "hostPermissionPromptCount",
    "escalationInvocationCount",
    "reusedApprovalCount",
  ]) {
    assert.match(procedure, new RegExp(`\\b${counter}\\b`));
  }

  assert.match(procedure, /operatorDecisionPromptCount = 0/);
  assert.match(procedure, /hostPermissionPromptCount = 0/);
  assert.match(procedure, /Run read-only Git inspection, `gh pr` inspection/);
  assert.match(procedure, /without preemptive escalation/);
  assert.match(procedure, /Record the publish handoff receipt/);
  assert.match(procedure, /Record the post-merge handoff receipt/);
  assert.match(
    procedure,
    /whether the first handoff qualifies under the zero\/zero prompt budget/
  );
  assert.match(
    procedure,
    /whether the second handoff and the full lifecycle qualify/
  );
  assert.match(
    procedure,
    /\[codex-pr-unattended-verification\.md\]\(codex-pr-unattended-verification\.md\)/
  );
  // The unattended-execution correction closed on 2026-09-05 by operator
  // disposition. The counters survive as diagnostics, so the procedure must still
  // measure and report them, but no consecutive-run acceptance count is maintained
  // and an unknown host prompt count no longer disqualifies a handoff.
  assert.match(procedure, /correction closed on 2026-09-05 by operator disposition/);
  assert.match(procedure, /live diagnostics rather than an acceptance gate/);
  assert.doesNotMatch(procedure, /resets the qualifying count to zero/);

  assert.match(verification, /Corrective-action status: `closed`/);
  assert.match(verification, /Closure route actually used: operator acceptance/);
  // The closure must not be describable as measured: the three-run rule was never
  // satisfied, and the ledger has to keep saying so.
  assert.match(verification, /That rule was never satisfied/);
  assert.match(verification, /Do not describe this correction as verified by measurement/);
  assert.match(
    verification,
    /\[Permission measurement\]\(codex-pr-branch\.md#permission-measurement\)/
  );
  // The single measured observation is retained as history.
  assert.match(verification, /2026-07-23 \| 225 \| `codex\/diamond`/);
  assert.match(
    operatorFeedback,
    /The three-run verification requirement closed on 2026-09-05 by operator disposition rather than by measurement/
  );
});
