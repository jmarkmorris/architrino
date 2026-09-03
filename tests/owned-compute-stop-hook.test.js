import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateStopHook } from "../scripts/dev/owned-compute-stop-hook.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOOK = path.join(ROOT, "scripts/dev/owned-compute-stop-hook.mjs");
const SUPERVISOR = path.join(ROOT, "scripts/dev/owned-compute-supervisor.mjs");

function invoke(file, args, { input, expectFailure = false, timeout = 15_000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = execFile(process.execPath, [file, ...args], { cwd: ROOT, encoding: "utf8", timeout }, (error, stdout, stderr) => {
      if (expectFailure) {
        if (!error) reject(new Error(`command unexpectedly passed: ${stdout}`));
        else resolve({ error, stdout, stderr });
      } else if (error) {
        reject(new Error(`command failed: ${error.message}\n${stdout}\n${stderr}`));
      } else {
        resolve({ stdout, stderr });
      }
    });
    if (input !== undefined) child.stdin.end(input);
  });
}

function hookEvent(sessionId) {
  return {
    session_id: sessionId,
    transcript_path: null,
    cwd: ROOT,
    hook_event_name: "Stop",
    turn_id: "owned-compute-stop-hook-test-turn",
    stop_hook_active: false,
    last_assistant_message: "test",
    permission_mode: "default",
  };
}

test("project Stop hook invokes the canonical owner-aware closeout adapter", () => {
  const configuration = JSON.parse(fs.readFileSync(path.join(ROOT, ".codex/hooks.json"), "utf8"));
  const stop = configuration.hooks.Stop;
  assert.equal(stop.length, 1);
  assert.equal(stop[0].hooks.length, 1);
  assert.equal(stop[0].hooks[0].type, "command");
  assert.match(stop[0].hooks[0].command, /scripts\/dev\/owned-compute-stop-hook\.mjs/u);
  assert.equal(stop[0].hooks[0].async, undefined);
});

test("Stop hook uses the stable session id as the owner-task label", () => {
  let checkedOwner = null;
  const response = evaluateStopHook(hookEvent("session-owner"), {
    runCloseout(ownerTask) {
      checkedOwner = ownerTask;
      return { status: 0, stdout: '{"ownerTask":"session-owner","status":"clear","checkedLeases":0}\n', stderr: "" };
    },
  });
  assert.equal(checkedOwner, "session-owner");
  assert.deepEqual(response, { continue: true });
});

test("Stop hook fails closed when the task identity is absent", () => {
  const response = evaluateStopHook({ ...hookEvent("session-owner"), session_id: "" });
  assert.equal(response.decision, "block");
  assert.match(response.reason, /stable Codex session_id/u);
});

test("Stop hook fails closed on a malformed successful closeout report", () => {
  const response = evaluateStopHook(hookEvent("session-owner"), {
    runCloseout() {
      return { status: 0, stdout: '{"status":"clear"}\n', stderr: "" };
    },
  });
  assert.equal(response.decision, "block");
  assert.match(response.reason, /invalid or mismatched clear report/u);
});

test("Stop hook continues the turn while its owner has live compute", { skip: process.platform === "win32" }, async () => {
  const owner = `owned-compute-stop-hook-test-${process.pid}`;
  let runId;
  try {
    const started = await invoke(SUPERVISOR, [
      "start",
      "--owner-task", owner,
      "--deadline-seconds", "20",
      "--heartbeat-seconds", "0.1",
      "--termination-grace-seconds", "0.5",
      "--",
      process.execPath,
      "-e",
      "setInterval(() => {}, 1000)",
    ]);
    runId = JSON.parse(started.stdout).runId;

    const blocked = await invoke(HOOK, [], { input: JSON.stringify(hookEvent(owner)) });
    const response = JSON.parse(blocked.stdout);
    assert.equal(response.decision, "block");
    assert.match(response.reason, /still owns 1 live or identity-uncertain compute run/u);

    await invoke(SUPERVISOR, ["stop", "--run-id", runId, "--reason", "stop_hook_test_complete"]);
    const clear = await invoke(HOOK, [], { input: JSON.stringify(hookEvent(owner)) });
    assert.deepEqual(JSON.parse(clear.stdout), { continue: true });
  } finally {
    if (runId) {
      await invoke(SUPERVISOR, ["stop", "--run-id", runId, "--reason", "test_finalizer"], { expectFailure: true }).catch(() => {});
    }
  }
});
