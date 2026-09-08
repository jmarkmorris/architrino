import test, { after } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Run the exact implementation in a private fixture checkout. Retention tests
// must never inspect or prune the operator's real leases and logs.
const SOURCE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(), "owned-compute-controls-")));
const SUPERVISOR = path.join(ROOT, "scripts/dev/owned-compute-supervisor.mjs");
fs.mkdirSync(path.dirname(SUPERVISOR), { recursive: true });
fs.copyFileSync(path.join(SOURCE_ROOT, "scripts/dev/owned-compute-supervisor.mjs"), SUPERVISOR);
assert.deepEqual(fs.readFileSync(SUPERVISOR), fs.readFileSync(path.join(SOURCE_ROOT, "scripts/dev/owned-compute-supervisor.mjs")));
const STATE_ROOT = path.join(ROOT, ".local-data/owned-compute");
const LEASE_DIR = path.join(ROOT, ".local-data/owned-compute/leases");
const LOG_DIR = path.join(ROOT, ".local-data/owned-compute/logs");
after(async () => {
  if (fs.existsSync(LEASE_DIR)) {
    for (const name of fs.readdirSync(LEASE_DIR)) {
      const lease = JSON.parse(fs.readFileSync(path.join(LEASE_DIR, name)));
      assert.equal(lease.processGroupClosed, true, `Retain unresolved test ownership evidence at ${ROOT}`);
      for (const pid of [lease.targetIdentity?.pgid && -lease.targetIdentity.pgid, lease.sidecarIdentity?.pid].filter(Boolean)) {
        const until = Date.now() + 2500;
        let absent = false;
        while (Date.now() < until) {
          try { process.kill(pid, 0); } catch (error) {
            if (error.code !== "ESRCH") throw error;
            absent = true;
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
        assert.equal(absent, true, `OS probe found surviving identity/group ${pid}; retain evidence at ${ROOT}`);
      }
    }
  }
  fs.rmSync(ROOT, { recursive: true, force: true });
});

test("programmatic foreground ownership returns the same closed lease without changing caller exit status", async () => {
  const { runOwned } = await import(pathToFileURL(SUPERVISOR));
  const before = process.exitCode;
  const lease = await runOwned(["--owner-task", `owned-compute-api-test-${process.pid}`, "--deadline-seconds", "10", "--", process.execPath, "-e", "console.log('api-control');process.exitCode=3"]);
  assert.equal(lease.status, "failed");
  assert.equal(lease.exitCode, 3);
  assert.equal(lease.processGroupClosed, true);
  assert.equal(process.exitCode, before);
  assert.equal(fs.readFileSync(lease.stdoutPath, "utf8"), "api-control\n");
});

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

function createPruneFixture({
  status = "completed",
  terminalAtUtc = "1600-01-01T00:00:00.000Z",
  processGroupClosed = true,
  stdoutPath: suppliedStdoutPath,
  stderrPath: suppliedStderrPath,
  extra = {},
} = {}) {
  fs.mkdirSync(LEASE_DIR, { recursive: true });
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const runId = randomUUID();
  const filePath = path.join(LEASE_DIR, `${runId}.json`);
  const stdoutPath = suppliedStdoutPath ?? path.join(LOG_DIR, `${runId}.stdout.log`);
  const stderrPath = suppliedStderrPath ?? path.join(LOG_DIR, `${runId}.stderr.log`);
  const terminalField = status === "reconciled_stopped"
    ? "stoppedAtUtc"
    : status === "reconciled_closed"
      ? "reconciledAtUtc"
      : "finishedAtUtc";
  const lease = {
    schema: "architrino.owned-compute-lease.v1",
    runId,
    status,
    requestedAtUtc: terminalAtUtc,
    [terminalField]: terminalAtUtc,
    owner: { task: `owned-compute-prune-test-${runId}`, threadId: null },
    stdoutPath,
    stderrPath,
    processGroupClosed,
    ...extra,
  };
  fs.writeFileSync(filePath, `${JSON.stringify(lease, null, 2)}\n`, { mode: 0o600 });
  return { runId, filePath, stdoutPath, stderrPath };
}

function writeFixtureLogs(fixture) {
  fs.writeFileSync(fixture.stdoutPath, "stdout\n", { mode: 0o600 });
  fs.writeFileSync(fixture.stderrPath, "stderr\n", { mode: 0o600 });
}

function removeFixture(fixture, additionalPaths = []) {
  for (const filePath of new Set([fixture.filePath, fixture.stdoutPath, fixture.stderrPath, ...additionalPaths])) {
    fs.rmSync(filePath, { force: true });
  }
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

test("an invalid command produces an immediate closed failure lease", { skip: process.platform === "win32" }, async () => {
  const owner = `owned-compute-invalid-test-${process.pid}`;
  const result = await invoke([
    "run",
    "--owner-task", owner,
    "--deadline-seconds", "10",
    "--heartbeat-seconds", "0.1",
    "--termination-grace-seconds", "0.5",
    "--",
    "/definitely/not/an/executable",
  ], { expectFailure: true });
  assert.match(result.stderr, /ENOENT|ownership identity was recorded/u);
  const leases = JSON.parse(await new Promise((resolve, reject) => {
    execFile(process.execPath, [SUPERVISOR, "list"], { cwd: ROOT, encoding: "utf8" }, (error, stdout) => error ? reject(error) : resolve(stdout));
  }));
  const failed = leases.find((row) => row.lease.owner?.task === owner);
  assert.equal(failed.classification, "terminal");
  assert.equal(failed.lease.status, "failed");
  assert.equal(failed.lease.processGroupClosed, true);
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

test("a missing leader cannot clear a surviving group or sidecar", { skip: process.platform === "win32" }, async () => {
  const running = await invoke(["start", "--owner-task", "closure-evidence-control", "--deadline-seconds", "20", "--termination-grace-seconds", "0.5", "--", process.execPath, "-e", "setInterval(() => {}, 1000)"]);
  const fixture = createPruneFixture({ status: "running", processGroupClosed: false, extra: {
    targetIdentity: { ...running.targetIdentity, pid: 2147483647 },
    sidecarIdentity: { ...running.sidecarIdentity, pid: 2147483647 },
  } });
  try {
    const group = await invoke(["status", "--run-id", fixture.runId]);
    assert.equal(group.classification, "identity_mismatch_do_not_signal");
    assert.equal((await invoke(["reconcile", "--repair-closed"])).find((row) => row.lease.runId === fixture.runId).classification, "identity_mismatch_do_not_signal");
    const synthetic = JSON.parse(fs.readFileSync(fixture.filePath));
    fs.writeFileSync(fixture.filePath, JSON.stringify({ ...synthetic, targetIdentity: { ...synthetic.targetIdentity, pgid: 2147483647 }, sidecarIdentity: running.sidecarIdentity }));
    assert.equal((await invoke(["status", "--run-id", fixture.runId])).classification, "identity_mismatch_do_not_signal");
    const blocked = await invoke(["closeout", "--owner-task", synthetic.owner.task], { expectFailure: true });
    assert.match(blocked.stderr, /still owns 1 live or identity-uncertain compute run/u);
    fs.writeFileSync(fixture.filePath, JSON.stringify({ ...synthetic, targetIdentity: { ...synthetic.targetIdentity, pgid: 2147483647 } }));
    assert.equal((await invoke(["status", "--run-id", fixture.runId])).classification, "stale_closed");
    fs.writeFileSync(fixture.filePath, JSON.stringify({ ...synthetic, targetIdentity: null, sidecarIdentity: null }));
    assert.equal((await invoke(["status", "--run-id", fixture.runId])).classification, "identity_mismatch_do_not_signal");
  } finally {
    removeFixture(fixture);
    await invoke(["stop", "--run-id", running.runId]);
  }
});

test("foreground wait reports lost supervision before the target deadline", { skip: process.platform === "win32" }, async () => {
  const owner = `foreground-supervisor-loss-${process.pid}`;
  const resultPromise = invoke(["run", "--owner-task", owner, "--deadline-seconds", "30", "--termination-grace-seconds", "0.5", "--", process.execPath, "-e", "setInterval(() => {}, 1000)"], { expectFailure: true, timeout: 10000 });
  let running;
  try {
    const until = Date.now() + 5000;
    while (!running && Date.now() < until) {
      for (const name of fs.readdirSync(LEASE_DIR)) {
        const lease = JSON.parse(fs.readFileSync(path.join(LEASE_DIR, name)));
        if (lease.owner.task === owner && lease.status === "running") running = lease;
      }
      if (!running) await new Promise((resolve) => setTimeout(resolve, 50));
    }
    assert.ok(running, "foreground target did not record ownership");
    process.kill(running.sidecarIdentity.pid, "SIGKILL");
    const result = await resultPromise;
    assert.equal(result.error.killed, false, "test timeout must not be the mechanism that ends the waiter");
    assert.match(result.stderr, /lost its supervisor before recording completion/u);
    const stopped = await invoke(["stop", "--run-id", running.runId]);
    assert.equal(stopped.lease.status, "reconciled_stopped");
    assert.equal(stopped.lease.processGroupClosed, true);
  } finally {
    if (running) await invoke(["stop", "--run-id", running.runId]).catch(() => {});
    await resultPromise;
  }
});

test("stop reports observed closure when its supervisor dies after acknowledging stop", { skip: process.platform === "win32" }, async () => {
  const running = await invoke(["start", "--owner-task", "stop-supervisor-loss", "--deadline-seconds", "20", "--termination-grace-seconds", "2", "--", process.execPath, "-e", "process.on('SIGTERM', () => setTimeout(() => { process.kill(process.ppid, 'SIGKILL'); process.exit(0); }, 100)); setTimeout(() => process.exit(2), 8000)"]);
  try {
    const stopped = await invoke(["stop", "--run-id", running.runId], { timeout: 5000 });
    assert.equal(stopped.classification, "stale_closed");
    assert.equal(stopped.lease.status, "stopping", "observed closure must not invent a completion result");
    assert.notEqual(stopped.lease.processGroupClosed, true);
    const rows = await invoke(["reconcile", "--repair-closed"]);
    assert.equal(rows.find((row) => row.lease.runId === running.runId).lease.status, "reconciled_closed");
  } finally {
    await invoke(["stop", "--run-id", running.runId]).catch(() => {});
    await invoke(["reconcile", "--repair-closed"]);
  }
});

test("startup log failure records closed failure before any target can spawn", async () => {
  const fixture = createPruneFixture({ status: "launching", processGroupClosed: false });
  const marker = path.join(ROOT, "forbidden-startup-target");
  const planFile = path.join(STATE_ROOT, "plans", `${fixture.runId}.json`);
  fs.mkdirSync(path.dirname(planFile), { recursive: true });
  fs.writeFileSync(fixture.stdoutPath, "preserve-existing-log");
  fs.writeFileSync(planFile, JSON.stringify({
    schema: "architrino.owned-compute-lease.v1", runId: fixture.runId,
    stdoutPath: fixture.stdoutPath, stderrPath: fixture.stderrPath,
    command: process.execPath, args: ["-e", `require('node:fs').writeFileSync(${JSON.stringify(marker)}, 'started')`],
    cwd: ROOT, owner: { task: "startup-failure-control" }, ownerHistory: [],
  }));
  try {
    await invoke(["__sidecar", fixture.runId], { expectFailure: true, timeout: 5000 });
    const lease = JSON.parse(fs.readFileSync(fixture.filePath));
    assert.equal(lease.status, "failed");
    assert.equal(lease.processGroupClosed, true);
    assert.equal(lease.targetIdentity, null);
    assert.match(lease.error, /before target spawn:.*EEXIST/u);
    assert.equal(fs.existsSync(marker), false);
    assert.equal(fs.readFileSync(fixture.stdoutPath, "utf8"), "preserve-existing-log");
  } finally {
    removeFixture(fixture, [planFile, marker]);
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

test("prune applies only to old closed terminal records", { skip: process.platform === "win32" }, async () => {
  const fixture = createPruneFixture();
  const referencedArtifact = path.join(ROOT, ".local-data", `owned-compute-referenced-artifact-${fixture.runId}.json`);
  const lease = JSON.parse(fs.readFileSync(fixture.filePath, "utf8"));
  fs.writeFileSync(referencedArtifact, "scientific artifact placeholder\n", { mode: 0o600 });
  fs.writeFileSync(fixture.filePath, `${JSON.stringify({ ...lease, args: [referencedArtifact] }, null, 2)}\n`, { mode: 0o600 });
  writeFixtureLogs(fixture);
  try {
    const report = await invoke(["prune", "--older-than-seconds", "10000000000", "--apply"]);
    assert.equal(report.status, "passed");
    assert.equal(report.mode, "apply");
    assert.equal(report.selected.some((record) => record.runId === fixture.runId), true);
    assert.equal(report.deleted.some((record) => record.runId === fixture.runId), true);
    assert.equal(fs.existsSync(fixture.filePath), false);
    assert.equal(fs.existsSync(fixture.stdoutPath), false);
    assert.equal(fs.existsSync(fixture.stderrPath), false);
    assert.equal(fs.existsSync(referencedArtifact), true);
  } finally {
    removeFixture(fixture, [referencedArtifact]);
  }
});

test("prune is a dry-run unless apply is explicit", { skip: process.platform === "win32" }, async () => {
  const fixture = createPruneFixture();
  writeFixtureLogs(fixture);
  try {
    const report = await invoke(["prune", "--older-than-seconds", "10000000000"]);
    assert.equal(report.status, "passed");
    assert.equal(report.mode, "dry-run");
    assert.equal(report.selected.some((record) => record.runId === fixture.runId), true);
    assert.equal(report.deleted.length, 0);
    assert.equal(fs.existsSync(fixture.filePath), true);
    assert.equal(fs.existsSync(fixture.stdoutPath), true);
    assert.equal(fs.existsSync(fixture.stderrPath), true);
  } finally {
    removeFixture(fixture);
  }
});

test("prune requires an explicit age threshold", { skip: process.platform === "win32" }, async () => {
  const result = await invoke(["prune"], { expectFailure: true });
  assert.match(result.stderr, /--older-than-seconds is required/u);
});

test("prune retains terminal records newer than the explicit age", { skip: process.platform === "win32" }, async () => {
  const fixture = createPruneFixture({ terminalAtUtc: new Date().toISOString() });
  writeFixtureLogs(fixture);
  try {
    const report = await invoke(["prune", "--older-than-seconds", "10000000000", "--apply"]);
    const retained = report.retained.find((record) => record.runId === fixture.runId);
    assert.equal(retained.reason, "too_recent");
    assert.equal(report.deleted.some((record) => record.runId === fixture.runId), false);
    assert.equal(fs.existsSync(fixture.filePath), true);
  } finally {
    removeFixture(fixture);
  }
});

test("prune retains nonterminal records", { skip: process.platform === "win32" }, async () => {
  const fixture = createPruneFixture({
    status: "launching",
    extra: { deadlineAtUtc: "2999-01-01T00:00:00.000Z" },
  });
  writeFixtureLogs(fixture);
  try {
    const report = await invoke(["prune", "--older-than-seconds", "10000000000", "--apply"]);
    const retained = report.retained.find((record) => record.runId === fixture.runId);
    assert.equal(retained.classification, "launching");
    assert.equal(retained.reason, "nonterminal");
    assert.equal(fs.existsSync(fixture.filePath), true);
  } finally {
    removeFixture(fixture);
  }
});

test("prune refuses a declared log path outside owned-compute state", { skip: process.platform === "win32" }, async () => {
  const runId = randomUUID();
  const outsidePath = path.join(ROOT, ".local-data", `owned-compute-outside-${runId}.log`);
  const fixture = createPruneFixture({ stdoutPath: outsidePath });
  writeFixtureLogs(fixture);
  try {
    const result = await invoke(["prune", "--older-than-seconds", "10000000000", "--apply"], { expectFailure: true });
    const report = JSON.parse(result.stdout);
    const retained = report.retained.find((record) => record.runId === fixture.runId);
    assert.equal(report.status, "refused");
    assert.equal(retained.reason, "stdout_path_outside_state_root");
    assert.equal(report.deleted.length, 0);
    assert.equal(fs.existsSync(outsidePath), true);
    assert.equal(fs.existsSync(fixture.filePath), true);
  } finally {
    removeFixture(fixture, [outsidePath]);
  }
});

test("prune refuses a symlinked deletion target", { skip: process.platform === "win32" }, async () => {
  const fixture = createPruneFixture();
  const symlinkTarget = path.join(STATE_ROOT, `symlink-target-${fixture.runId}.log`);
  fs.writeFileSync(symlinkTarget, "outside declared log\n", { mode: 0o600 });
  fs.symlinkSync(symlinkTarget, fixture.stdoutPath);
  fs.writeFileSync(fixture.stderrPath, "stderr\n", { mode: 0o600 });
  try {
    const result = await invoke(["prune", "--older-than-seconds", "10000000000", "--apply"], { expectFailure: true });
    const report = JSON.parse(result.stdout);
    const retained = report.retained.find((record) => record.runId === fixture.runId);
    assert.equal(report.status, "refused");
    assert.equal(retained.reason, "stdout_path_is_symlink");
    assert.equal(report.deleted.length, 0);
    assert.equal(fs.lstatSync(fixture.stdoutPath).isSymbolicLink(), true);
    assert.equal(fs.existsSync(symlinkTarget), true);
  } finally {
    removeFixture(fixture, [symlinkTarget]);
  }
});

test("prune retains identity-uncertain compute without signaling it", { skip: process.platform === "win32" }, async () => {
  const fixture = createPruneFixture({
    extra: {
      targetIdentity: {
        pid: process.pid,
        pgid: process.pid,
        started: "Thu Jan 1 00:00:00 1970",
        command: "not-the-current-process",
      },
    },
  });
  writeFixtureLogs(fixture);
  try {
    const report = await invoke(["prune", "--older-than-seconds", "10000000000", "--apply"]);
    const retained = report.retained.find((record) => record.runId === fixture.runId);
    assert.equal(retained.classification, "uncertain");
    assert.equal(retained.reason, "identity_uncertain");
    assert.equal(report.deleted.some((record) => record.runId === fixture.runId), false);
    assert.equal(fs.existsSync(fixture.filePath), true);
  } finally {
    removeFixture(fixture);
  }
});
