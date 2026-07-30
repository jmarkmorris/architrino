import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

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
});

test("PR procedure makes unattended execution measurable and requires verification for advancement", () => {
  const procedure = read("reference/op/git/codex-pr-branch.md");
  const verification = read(
    "reference/op/git/codex-pr-unattended-verification.md"
  );
  const operatorFeedback = read("reference/op/README-op.md");

  for (const counter of [
    "operatorDecisionPromptCount",
    "hostPermissionPromptCount",
    "escalationInvocationCount",
    "reusedApprovalCount",
  ]) {
    assert.match(procedure, new RegExp(`\\b${counter}\\b`));
    assert.match(verification, new RegExp(`\\b${counter}\\b`));
  }

  assert.match(procedure, /operatorDecisionPromptCount = 0/);
  assert.match(procedure, /hostPermissionPromptCount = 0/);
  assert.match(procedure, /Run read-only Git inspection, `gh pr` inspection/);
  assert.match(procedure, /without preemptive escalation/);
  assert.match(procedure, /three consecutive/);
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
  assert.match(procedure, /resets the qualifying count to zero/);

  assert.match(verification, /Corrective-action status: `open`/);
  assert.match(verification, /Required consecutive qualifying runs: `3`/);
  assert.match(verification, /Current consecutive qualifying runs: `0`/);
  assert.equal(
    [...verification.matchAll(/^\| [123] \| pending \|/gm)].length,
    3
  );
  assert.match(verification, /2026-07-23 \| 225 \| `codex\/diamond`/);
  assert.match(
    operatorFeedback,
    /Verify three consecutive `codex-pr-branch\.md` lifecycles/
  );
});
