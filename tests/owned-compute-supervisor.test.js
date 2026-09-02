import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SUPERVISOR = path.join(ROOT, "scripts/dev/owned-compute-supervisor.mjs");
const LEASE_DIR = path.join(ROOT, ".local-data/owned-compute/leases");

function invoke(args, { expectFailure = false, timeout = 15000 } = {}) {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, [SUPERVISOR, ...args], { cwd: ROOT, encoding: "utf8", timeout }, (error, stdout, stderr) => {
      if (expectFailure) {
        if (!error) reject(new Error(`command unexpectedly passed: ${stdout}`));
        else resolve({ error, stdout, stderr });
      } else if (error) {
        reject(new Error(`command failed: ${error.message}\n${stdout}\n${stderr}`));
      } else {
        resolve(JSON.parse(stdout));
      }
    });
  });
}

test("foreground compute records exact ownership and closes its process group", { skip: process.platform === "win32" }, async () => {
  const owner = `owned-compute-foreground-test-${process.pid}`;
  const lease = await invoke([
    "run",
    "--owner-task", owner,
    "--deadline-seconds", "10",
    "--heartbeat-seconds", "0.1",
    "--termination-grace-seconds", "0.5",
    "--",
    process.execPath,
    "-e",
    "process.stdout.write('foreground-ok')",
  ]);
  assert.equal(lease.status, "completed");
  assert.equal(lease.owner.task, owner);
  assert.equal(lease.targetIdentity.pid, lease.targetIdentity.pgid);
  assert.equal(lease.processGroupClosed, true);
  assert.equal(fs.readFileSync(lease.stdoutPath, "utf8"), "foreground-ok");
  const closeout = await invoke(["closeout", "--owner-task", owner]);
  assert.equal(closeout.ownerTask, owner);
  assert.equal(closeout.status, "clear");
  assert.equal(Number.isSafeInteger(closeout.checkedLeases), true);
});

test("detached compute supports authenticated handoff and controlled stop", { skip: process.platform === "win32" }, async () => {
  const owner = `owned-compute-detached-test-${process.pid}`;
  const recipient = `${owner}-recipient`;
  let runId;
  try {
    const running = await invoke([
      "start",
      "--owner-task", owner,
      "--owner-thread", "test-thread-a",
      "--deadline-seconds", "20",
      "--heartbeat-seconds", "0.1",
      "--termination-grace-seconds", "0.5",
      "--",
      process.execPath,
      "-e",
      "setInterval(() => process.stdout.write('tick\\n'), 50)",
    ]);
    runId = running.runId;
    assert.equal(running.status, "running");
    const status = await invoke(["status", "--run-id", runId]);
    assert.equal(status.classification, "authenticated_running");

    const handedOff = await invoke([
      "handoff",
      "--run-id", runId,
      "--to-task", recipient,
      "--to-thread", "test-thread-b",
    ]);
    assert.equal(handedOff.owner.task, recipient);
    assert.equal(handedOff.ownerHistory.at(-1).owner.task, owner);
    assert.equal((await invoke(["closeout", "--owner-task", owner])).status, "clear");
    const blocked = await invoke(["closeout", "--owner-task", recipient], { expectFailure: true });
    assert.match(blocked.stderr, /still owns 1 live or identity-uncertain compute run/u);

    const stopped = await invoke(["stop", "--run-id", runId, "--reason", "test_complete"]);
    assert.equal(stopped.lease.status, "stopped");
    assert.equal(stopped.lease.stopReason, "test_complete");
    assert.equal(stopped.lease.processGroupClosed, true);
    assert.equal((await invoke(["closeout", "--owner-task", recipient])).status, "clear");
  } finally {
    if (runId) await invoke(["stop", "--run-id", runId, "--reason", "test_finalizer"]).catch(() => {});
  }
});

test("a detached run cannot outlive its declared deadline", { skip: process.platform === "win32" }, async () => {
  const owner = `owned-compute-deadline-test-${process.pid}`;
  const running = await invoke([
    "start",
    "--owner-task", owner,
    "--deadline-seconds", "1",
    "--heartbeat-seconds", "0.1",
    "--termination-grace-seconds", "0.2",
    "--",
    process.execPath,
    "-e",
    "setInterval(() => {}, 1000)",
  ]);
  let terminal;
  const limit = Date.now() + 6000;
  while (Date.now() < limit) {
    const status = await invoke(["status", "--run-id", running.runId]);
    if (status.classification === "terminal") {
      terminal = status.lease;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(terminal, "deadline did not produce a terminal lease");
  assert.equal(terminal.status, "timed_out");
  assert.equal(terminal.stopReason, "deadline_exceeded");
  assert.equal(terminal.processGroupClosed, true);
});

test("a lost supervisor leaves an exactly identifiable group that can be reconciled", { skip: process.platform === "win32" }, async () => {
  const owner = `owned-compute-reconcile-test-${process.pid}`;
  let runId;
  try {
    const running = await invoke([
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
    runId = running.runId;
    process.kill(running.sidecarIdentity.pid, "SIGKILL");
    let unmonitored;
    const limit = Date.now() + 5000;
    while (Date.now() < limit) {
      const status = await invoke(["status", "--run-id", runId]);
      if (status.classification === "unmonitored_owned_group") {
        unmonitored = status;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    assert.ok(unmonitored, "lost supervisor did not expose its still-owned target group");
    const stopped = await invoke(["stop", "--run-id", runId, "--reason", "reconcile_test"]);
    assert.equal(stopped.lease.status, "reconciled_stopped");
    assert.equal(stopped.lease.processGroupClosed, true);
  } finally {
    if (runId) await invoke(["stop", "--run-id", runId, "--reason", "test_finalizer"]).catch(() => {});
  }
});

test("identity mismatch refuses a historical or reused PID", { skip: process.platform === "win32" }, async () => {
  fs.mkdirSync(LEASE_DIR, { recursive: true });
  const runId = "00000000-0000-4000-8000-000000000001";
  const filePath = path.join(LEASE_DIR, `${runId}.json`);
  fs.writeFileSync(filePath, `${JSON.stringify({
    schema: "architrino.owned-compute-lease.v1",
    runId,
    status: "running",
    owner: { task: "identity-negative", threadId: null },
    control: { host: "127.0.0.1", port: 1, token: "not-live" },
    targetIdentity: {
      pid: process.pid,
      pgid: process.pid,
      started: "Thu Jan 1 00:00:00 1970",
      command: "not-the-current-process",
    },
  }, null, 2)}\n`, { mode: 0o600 });
  try {
    const result = await invoke(["stop", "--run-id", runId, "--reason", "negative_control"], { expectFailure: true });
    assert.match(result.stderr, /refusing to signal .* process identity does not match its lease/u);
  } finally {
    fs.rmSync(filePath, { force: true });
  }
});
