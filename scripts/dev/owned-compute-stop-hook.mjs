#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SUPERVISOR = path.join(ROOT, "scripts/dev/owned-compute-supervisor.mjs");

function blockingResponse(reason) {
  return {
    decision: "block",
    reason,
  };
}

function conciseFailure(stderr, fallback) {
  const lines = String(stderr ?? "").split(/\r?\n/u).map((line) => line.trim()).filter(Boolean);
  const ownedComputeLine = lines.find((line) => /still owns \d+ live or identity-uncertain compute run/u.test(line));
  return ownedComputeLine ?? lines.at(-1) ?? fallback;
}

function isVerifiedClear(result, ownerTask) {
  if (result.error || result.status !== 0) return false;
  try {
    const report = JSON.parse(result.stdout);
    return report.status === "clear" && report.ownerTask === ownerTask && Number.isSafeInteger(report.checkedLeases);
  } catch {
    return false;
  }
}

export function evaluateStopHook(input, { runCloseout = runSupervisorCloseout } = {}) {
  if (!input || input.hook_event_name !== "Stop") {
    return blockingResponse("Owned-compute closeout hook received an invalid event. Inspect the project hook configuration before closing this task.");
  }
  const ownerTask = typeof input.session_id === "string" ? input.session_id.trim() : "";
  if (!ownerTask) {
    return blockingResponse("Owned-compute closeout hook did not receive a stable Codex session_id, so task ownership cannot be checked safely.");
  }
  const result = runCloseout(ownerTask);
  if (isVerifiedClear(result, ownerTask)) return { continue: true };
  const fallback = result.status === 0
    ? "closeout returned an invalid or mismatched clear report"
    : result.error?.message ?? `closeout exited ${result.status ?? "without a status"}`;
  const detail = conciseFailure(result.stderr, fallback);
  return blockingResponse(
    `Owned-compute closeout is blocked for this Codex task: ${detail}. ` +
    "Inspect only this task's registered leases, then wait, use authenticated handoff, or use the supervisor's controlled stop. Never signal a process from PID, name, CPU use, or silence alone.",
  );
}

function runSupervisorCloseout(ownerTask) {
  return spawnSync(process.execPath, [SUPERVISOR, "closeout", "--owner-task", ownerTask], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 110_000,
    env: process.env,
  });
}

async function readStdin() {
  let source = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) source += chunk;
  return source;
}

export async function main() {
  let input;
  try {
    input = JSON.parse(await readStdin());
  } catch (error) {
    console.log(JSON.stringify(blockingResponse(`Owned-compute closeout hook could not parse its event: ${error.message}`)));
    return;
  }
  console.log(JSON.stringify(evaluateStopHook(input)));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.log(JSON.stringify(blockingResponse(`Owned-compute closeout hook failed closed: ${error.message}`)));
  });
}
