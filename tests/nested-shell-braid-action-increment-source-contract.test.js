import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const checkerPath = path.join(
  repoRoot,
  "scripts/nested-shell-braid/action-increment-source-contract.mjs"
);

function runContract(inputPath) {
  const output = execFileSync(
    process.execPath,
    [checkerPath, "--input", inputPath],
    {
      cwd: repoRoot,
      encoding: "utf8",
    }
  );
  return JSON.parse(output);
}

test("rank-2 action-increment source-contract attempt fails at accepted source boundary", () => {
  const report = runContract(
    "scripts/nested-shell-braid/fixtures/action-increment-source-contract-rank2-transition-source-attempt.json"
  );
  const failureCodes = new Set(
    Object.values(report.gates).flatMap((gate) =>
      gate.issues.map((issue) => issue.failure_code)
    )
  );

  assert.equal(report.status, "fail");
  assert.equal(report.gates.benchmark_policy.status, "pass");
  assert.equal(report.gates.accepted_branch_states.status, "fail");
  assert.equal(report.gates.transitions.status, "fail");
  assert.deepEqual(
    report.gates.transitions.issues.map((issue) => issue.failure_code),
    ["accepted-history-source-missing", "accepted-history-source-missing"]
  );
  assert.ok(failureCodes.has("accepted-history-source-missing"));
  assert.ok(failureCodes.has("convergence-fail"));
  assert.ok(failureCodes.has("negative-control-fail"));
  assert.equal(failureCodes.has("input-hbar-contamination"), false);
});
