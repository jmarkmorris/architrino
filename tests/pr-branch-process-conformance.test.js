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

test("PR procedure executable blocks preserve fail-closed command forms", () => {
  const procedure = read("reference/op/codex-pr-branch.md");
  const executable = bashBlocks(procedure).join("\n");

  assert.equal(executable.includes("gh pr create --fill"), false);
  assert.equal(executable.includes("|| git branch -D"), false);
  assert.equal(executable.includes("$("), false);
  assert.match(executable, /git merge-tree --write-tree HEAD origin\/main/);
  assert.match(executable, /git merge-base --is-ancestor <headRefOid> HEAD/);
  assert.match(executable, /git log --oneline --decorate <headRefOid>\.\.HEAD/);
});

test("PR procedure, pre-push hook, and CI share the aggregate gate", () => {
  const procedure = read("reference/op/codex-pr-branch.md");
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
