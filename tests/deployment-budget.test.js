import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkDeploymentBudget } from "../scripts/check-deployment-budget.mjs";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const CONTRACT_PATH = "reference/priorities/aaa-operations/contracts/deployment-budget.v1.json";
const contract = JSON.parse(fs.readFileSync(path.join(ROOT, CONTRACT_PATH), "utf8"));

test("Borg consumes the measured deployment budget while EOM throughput stays separate", () => {
  const result = checkDeploymentBudget({ rootDir: ROOT });
  assert.equal(result.status, "warning");
  assert.equal(result.firstConsumer, "borg");
  assert.deepEqual(result.warningCodes, ["ACTIONS_ARTIFACT_AGGREGATE_ABOVE_CONSERVATIVE_THRESHOLD"]);

  const integrityRunner = fs.readFileSync(path.join(ROOT, "scripts/check-content-integrity.mjs"), "utf8");
  assert.match(integrityRunner, /Validate accepted deployment budget/u);
  assert.match(integrityRunner, /scripts\/check-deployment-budget\.mjs/u);
});

test("deployment budget rejects collapsed EOM and hosting status", () => {
  const collapsed = structuredClone(contract);
  collapsed.measurements.nativeSolverThroughput.measurement = { stepsPerSecond: 1 };
  collapsed.measurements.nativeSolverThroughput.deploymentStatusDependency = true;
  assert.throws(
    () => checkDeploymentBudget({ rootDir: ROOT, contract: collapsed }),
    /must not fabricate EOM throughput|merged into deployment status/u,
  );
});

test("deployment budget rejects an exceeded passing deployment class", () => {
  const exceeded = structuredClone(contract);
  exceeded.measurements.browserHeapBudget.measuredBytes = 300000000;
  assert.throws(
    () => checkDeploymentBudget({ rootDir: ROOT, contract: exceeded }),
    /browser heap: measured value exceeds maximum/u,
  );
});
