#!/usr/bin/env node

// Operational containment only. This supervisor does not replace or weaken a
// scientific launcher's own process census, admission, resource, or acceptance
// controls. Scientific launchers may run as the bounded target of this wrapper.
import { execFile, spawn } from "node:child_process";
import { randomBytes, randomUUID } from "node:crypto";
import {
  createWriteStream,
  existsSync,
  readFileSync,
} from "node:fs";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SELF = fileURLToPath(import.meta.url);
const STATE_ROOT = path.join(ROOT, ".local-data/owned-compute");
const LEASE_DIR = path.join(STATE_ROOT, "leases");
const LOG_DIR = path.join(STATE_ROOT, "logs");
const PLAN_DIR = path.join(STATE_ROOT, "plans");
const SCHEMA = "architrino.owned-compute-lease.v1";
const TERMINAL_STATUSES = new Set([
  "completed",
  "failed",
  "stopped",
  "timed_out",
  "reconciled_stopped",
  "reconciled_closed",
]);

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function leasePath(runId) {
  requireCondition(/^[0-9a-f-]{36}$/u.test(runId), `invalid run id: ${runId}`);
  return path.join(LEASE_DIR, `${runId}.json`);
}

function planPath(runId) {
  return path.join(PLAN_DIR, `${runId}.json`);
}

async function ensureStateDirectories() {
  await Promise.all([
    mkdir(LEASE_DIR, { recursive: true }),
    mkdir(LOG_DIR, { recursive: true }),
    mkdir(PLAN_DIR, { recursive: true }),
  ]);
}

async function writeJsonAtomic(filePath, value) {
  const temporary = `${filePath}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, filePath);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function parseOptionList(tokens) {
  const options = new Map();
  for (let index = 0; index < tokens.length; index += 2) {
    const name = tokens[index];
    const value = tokens[index + 1];
    requireCondition(name?.startsWith("--") && value && !options.has(name), `invalid option list near ${name ?? "end"}`);
    options.set(name, value);
  }
  return options;
}

function positiveNumber(value, label, { minimum = 0.1 } = {}) {
  const parsed = Number(value);
  requireCondition(Number.isFinite(parsed) && parsed >= minimum, `${label} must be at least ${minimum}`);
  return parsed;
}

function resolveOwnedCwd(value = ".") {
  const resolved = path.resolve(ROOT, value);
  requireCondition(resolved === ROOT || resolved.startsWith(`${ROOT}${path.sep}`), "working directory must remain inside the repository");
  requireCondition(existsSync(resolved), `working directory does not exist: ${value}`);
  return resolved;
}

function parseLaunchArguments(argv) {
  const separator = argv.indexOf("--");
  requireCondition(separator >= 0 && separator < argv.length - 1, "launch requires -- followed by a command");
  const options = parseOptionList(argv.slice(0, separator));
  const allowed = new Set([
    "--owner-task",
    "--owner-thread",
    "--deadline-seconds",
    "--heartbeat-seconds",
    "--termination-grace-seconds",
    "--cwd",
  ]);
  for (const name of options.keys()) requireCondition(allowed.has(name), `unsupported launch option: ${name}`);
  const ownerTask = options.get("--owner-task")?.trim();
  requireCondition(ownerTask, "--owner-task is required");
  const ownerThread = options.get("--owner-thread")?.trim() || null;
  const deadlineSeconds = positiveNumber(options.get("--deadline-seconds"), "--deadline-seconds", { minimum: 1 });
  const heartbeatSeconds = positiveNumber(options.get("--heartbeat-seconds") ?? "15", "--heartbeat-seconds");
  const terminationGraceSeconds = positiveNumber(options.get("--termination-grace-seconds") ?? "5", "--termination-grace-seconds");
  const [command, ...args] = argv.slice(separator + 1);
  return {
    ownerTask,
    ownerThread,
    deadlineSeconds,
    heartbeatSeconds,
    terminationGraceSeconds,
    cwd: resolveOwnedCwd(options.get("--cwd")),
    command,
    args,
  };
}

function parseNamedArguments(argv, allowedNames) {
  const options = parseOptionList(argv);
  for (const name of options.keys()) requireCondition(allowedNames.has(name), `unsupported option: ${name}`);
  return options;
}

async function processIdentity(pid) {
  return new Promise((resolve, reject) => {
    execFile(
      "/bin/ps",
      ["-p", String(pid), "-o", "pid=,ppid=,pgid=,lstart=,command="],
      { encoding: "utf8", timeout: 2000, maxBuffer: 1024 * 1024, env: { ...process.env, LC_ALL: "C" } },
      (error, stdout) => {
        if (error) {
          if (error.code === 1) resolve(null);
          else reject(error);
          return;
        }
        const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(.+)$/u.exec(stdout.trim());
        requireCondition(match, `could not parse process identity for PID ${pid}`);
        resolve({
          pid: Number(match[1]),
          ppid: Number(match[2]),
          pgid: Number(match[3]),
          started: match[4].replace(/\s+/gu, " "),
          command: match[5],
        });
      },
    );
  });
}

async function waitForProcessIdentity(pid, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const identity = await processIdentity(pid);
    if (identity) return identity;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`process identity unavailable for PID ${pid}`);
}

function sameIdentity(actual, expected) {
  return Boolean(actual) &&
    actual.pid === expected.pid &&
    actual.pgid === expected.pgid &&
    actual.started === expected.started &&
    actual.command === expected.command;
}

function groupExists(pgid) {
  try {
    process.kill(-pgid, 0);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") return false;
    throw error;
  }
}

async function waitUntil(check, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = await check();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`timed out waiting for ${label}`);
}

async function sendControl(lease, request, timeoutMs = 3000) {
  requireCondition(Number.isSafeInteger(lease.control?.port) && lease.control.port > 0, "lease has no control endpoint");
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host: "127.0.0.1", port: lease.control.port });
    let pending = "";
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error("owned-compute control timed out"));
    }, timeoutMs);
    socket.setEncoding("utf8");
    socket.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    socket.on("data", (chunk) => {
      pending += chunk;
      if (!pending.includes("\n")) return;
      clearTimeout(timer);
      socket.end();
      const response = JSON.parse(pending.slice(0, pending.indexOf("\n")));
      requireCondition(response.ok === true, response.error ?? "owned-compute control rejected the request");
      resolve(response);
    });
    socket.once("connect", () => {
      socket.write(`${JSON.stringify({
        ...request,
        runId: lease.runId,
        token: lease.control.token,
      })}\n`);
    });
  });
}

async function classifyLease(lease) {
  if (TERMINAL_STATUSES.has(lease.status)) return { classification: "terminal", lease };
  if (lease.status === "launching" && Date.parse(lease.deadlineAtUtc) >= Date.now()) {
    return { classification: "launching", lease };
  }
  try {
    const response = await sendControl(lease, { action: "status" }, 1000);
    return { classification: "authenticated_running", lease: response.lease };
  } catch (controlError) {
    const actual = lease.targetIdentity ? await processIdentity(lease.targetIdentity.pid) : null;
    if (!actual) return { classification: "stale_closed", lease, detail: controlError.message };
    if (sameIdentity(actual, lease.targetIdentity)) {
      return { classification: "unmonitored_owned_group", lease, detail: controlError.message };
    }
    return { classification: "identity_mismatch_do_not_signal", lease, actual, detail: controlError.message };
  }
}

async function loadLeases() {
  await ensureStateDirectories();
  const names = (await readdir(LEASE_DIR)).filter((name) => /^[0-9a-f-]{36}\.json$/u.test(name)).sort();
  return Promise.all(names.map((name) => readJson(path.join(LEASE_DIR, name))));
}

async function launch(argv, waitForCompletion) {
  const specification = parseLaunchArguments(argv);
  await ensureStateDirectories();
  const runId = randomUUID();
  const requestedAtUtc = new Date().toISOString();
  const deadlineAtUtc = new Date(Date.now() + specification.deadlineSeconds * 1000).toISOString();
  const plan = {
    schema: SCHEMA,
    runId,
    requestedAtUtc,
    deadlineAtUtc,
    controlToken: randomBytes(32).toString("hex"),
    owner: { task: specification.ownerTask, threadId: specification.ownerThread },
    ownerHistory: [],
    command: specification.command,
    args: specification.args,
    cwd: specification.cwd,
    heartbeatMs: specification.heartbeatSeconds * 1000,
    terminationGraceMs: specification.terminationGraceSeconds * 1000,
    stdoutPath: path.join(LOG_DIR, `${runId}.stdout.log`),
    stderrPath: path.join(LOG_DIR, `${runId}.stderr.log`),
  };
  await writeJsonAtomic(planPath(runId), plan);
  await writeJsonAtomic(leasePath(runId), {
    schema: SCHEMA,
    runId,
    status: "launching",
    requestedAtUtc,
    deadlineAtUtc,
    owner: plan.owner,
    ownerHistory: [],
    command: plan.command,
    args: plan.args,
    cwd: plan.cwd,
    stdoutPath: plan.stdoutPath,
    stderrPath: plan.stderrPath,
  });
  const sidecar = spawn(process.execPath, [SELF, "__sidecar", runId], {
    cwd: ROOT,
    detached: true,
    stdio: "ignore",
  });
  sidecar.unref();
  const running = await waitUntil(async () => {
    const lease = await readJson(leasePath(runId));
    if (lease.status === "failed") throw new Error(lease.error ?? "owned compute failed during launch");
    return lease.status === "running" ? lease : null;
  }, 10000, `owned compute ${runId} to start`);
  if (!waitForCompletion) return running;

  let interrupting = false;
  const interrupt = async () => {
    if (interrupting) return;
    interrupting = true;
    try {
      const current = await readJson(leasePath(runId));
      await sendControl(current, { action: "stop", reason: "foreground_owner_interrupted" });
    } catch {
      // The final poll below still reports the durable lease state.
    }
  };
  process.once("SIGINT", interrupt);
  process.once("SIGTERM", interrupt);
  try {
    return await waitUntil(async () => {
      const lease = await readJson(leasePath(runId));
      return TERMINAL_STATUSES.has(lease.status) ? lease : null;
    }, specification.deadlineSeconds * 1000 + specification.terminationGraceSeconds * 1000 + 15000, `owned compute ${runId} to finish`);
  } finally {
    process.off("SIGINT", interrupt);
    process.off("SIGTERM", interrupt);
  }
}

async function stopRun(runId, reason = "operator_requested") {
  const filePath = leasePath(runId);
  const lease = await readJson(filePath);
  const classified = await classifyLease(lease);
  if (classified.classification === "terminal" || classified.classification === "stale_closed") return classified;
  if (classified.classification === "authenticated_running") {
    await sendControl(classified.lease, { action: "stop", reason });
  } else if (classified.classification === "unmonitored_owned_group") {
    process.kill(-lease.targetIdentity.pgid, "SIGTERM");
    const graceMs = lease.terminationGraceMs ?? 5000;
    try {
      await waitUntil(() => !groupExists(lease.targetIdentity.pgid), graceMs + 2000, `unmonitored process group ${lease.targetIdentity.pgid} to close`);
    } catch {
      const actual = await processIdentity(lease.targetIdentity.pid);
      if (actual) {
        requireCondition(sameIdentity(actual, lease.targetIdentity), "process identity changed during graceful stop; refusing forced signal");
        process.kill(-lease.targetIdentity.pgid, "SIGKILL");
      } else {
        await waitUntil(() => !groupExists(lease.targetIdentity.pgid), 3000, `leaderless process group ${lease.targetIdentity.pgid} to disappear without a historical signal`);
      }
    }
    await waitUntil(() => !groupExists(lease.targetIdentity.pgid), 3000, `forced process group ${lease.targetIdentity.pgid} to close`);
    const updated = {
      ...lease,
      status: "reconciled_stopped",
      stoppedAtUtc: new Date().toISOString(),
      stopReason: reason,
      processGroupClosed: true,
    };
    await writeJsonAtomic(filePath, updated);
    return { classification: "terminal", lease: updated };
  } else {
    throw new Error(`refusing to signal ${runId}: process identity does not match its lease`);
  }
  const terminal = await waitUntil(async () => {
    const current = await readJson(filePath);
    return TERMINAL_STATUSES.has(current.status) ? current : null;
  }, (lease.terminationGraceMs ?? 5000) + 10000, `${runId} to stop`);
  return { classification: "terminal", lease: terminal };
}

async function handoffRun(runId, toTask, toThread) {
  requireCondition(toTask?.trim(), "--to-task is required");
  const lease = await readJson(leasePath(runId));
  const classified = await classifyLease(lease);
  requireCondition(classified.classification === "authenticated_running", "handoff requires an authenticated running supervisor");
  const response = await sendControl(classified.lease, {
    action: "handoff",
    owner: { task: toTask.trim(), threadId: toThread?.trim() || null },
  });
  return response.lease;
}

async function reconcile({ repairClosed = false } = {}) {
  const rows = [];
  for (const lease of await loadLeases()) {
    const classified = await classifyLease(lease);
    if (repairClosed && classified.classification === "stale_closed") {
      const updated = {
        ...lease,
        status: "reconciled_closed",
        reconciledAtUtc: new Date().toISOString(),
        processGroupClosed: true,
      };
      await writeJsonAtomic(leasePath(lease.runId), updated);
      rows.push({ classification: "terminal", lease: updated });
    } else {
      rows.push(classified);
    }
  }
  return rows;
}

async function closeoutOwner(ownerTask) {
  requireCondition(ownerTask?.trim(), "--owner-task is required");
  const rows = await reconcile();
  const active = rows.filter(({ classification, lease }) =>
    lease.owner?.task === ownerTask && classification !== "terminal" && classification !== "stale_closed");
  requireCondition(active.length === 0, `${ownerTask} still owns ${active.length} live or identity-uncertain compute run(s)`);
  return { ownerTask, status: "clear", checkedLeases: rows.length };
}

async function runSidecar(runId) {
  await ensureStateDirectories();
  const filePath = leasePath(runId);
  let plan;
  try {
    plan = await readJson(planPath(runId));
    requireCondition(plan.schema === SCHEMA && plan.runId === runId, "sidecar plan identity changed");
    await rm(planPath(runId), { force: true });
  } catch (error) {
    const current = existsSync(filePath) ? JSON.parse(readFileSync(filePath, "utf8")) : { schema: SCHEMA, runId };
    await writeJsonAtomic(filePath, { ...current, status: "failed", error: error.message, finishedAtUtc: new Date().toISOString() });
    process.exitCode = 1;
    return;
  }

  const startedAtMs = Date.now();
  const stdout = createWriteStream(plan.stdoutPath, { flags: "wx", mode: 0o600 });
  const stderr = createWriteStream(plan.stderrPath, { flags: "wx", mode: 0o600 });
  let stdoutBytes = 0;
  let stderrBytes = 0;
  let lastOutputAtUtc = null;
  let stopping = false;
  let stopReason = null;
  let owner = plan.owner;
  let ownerHistory = plan.ownerHistory;
  let lease;
  let writeChain = Promise.resolve();
  let forceTimer;
  let heartbeat;
  let deadline;

  const persist = (changes = {}) => {
    lease = { ...lease, ...changes };
    writeChain = writeChain.then(() => writeJsonAtomic(filePath, lease));
    return writeChain;
  };

  const server = net.createServer((socket) => {
    socket.setEncoding("utf8");
    let pending = "";
    socket.on("data", async (chunk) => {
      pending += chunk;
      if (!pending.includes("\n")) return;
      try {
        const request = JSON.parse(pending.slice(0, pending.indexOf("\n")));
        requireCondition(request.runId === runId && request.token === plan.controlToken, "control identity rejected");
        if (request.action === "status") {
          socket.end(`${JSON.stringify({ ok: true, lease })}\n`);
          return;
        }
        if (request.action === "handoff") {
          requireCondition(request.owner?.task, "handoff owner is missing");
          ownerHistory = [...ownerHistory, { owner, handedOffAtUtc: new Date().toISOString() }];
          owner = request.owner;
          await persist({ owner, ownerHistory });
          socket.end(`${JSON.stringify({ ok: true, lease })}\n`);
          return;
        }
        if (request.action === "stop") {
          requestStop(request.reason ?? "control_requested");
          socket.end(`${JSON.stringify({ ok: true, lease })}\n`);
          return;
        }
        throw new Error("unsupported control action");
      } catch (error) {
        socket.end(`${JSON.stringify({ ok: false, error: error.message })}\n`);
      }
    });
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  const sidecarIdentity = await waitForProcessIdentity(process.pid);

  const target = spawn(plan.command, plan.args, {
    cwd: plan.cwd,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ARCHITRINO_OWNED_COMPUTE_RUN_ID: runId },
  });
  const targetResult = new Promise((resolve) => {
    target.once("error", (error) => resolve({ code: null, signal: null, error: error.message }));
    target.once("close", (code, signal) => resolve({ code, signal, error: null }));
  });
  target.stdout.on("data", (chunk) => {
    stdoutBytes += chunk.length;
    lastOutputAtUtc = new Date().toISOString();
    stdout.write(chunk);
  });
  target.stderr.on("data", (chunk) => {
    stderrBytes += chunk.length;
    lastOutputAtUtc = new Date().toISOString();
    stderr.write(chunk);
  });
  const launchOutcome = await Promise.race([
    waitForProcessIdentity(target.pid).then((identity) => ({ identity })).catch((identityError) => ({ identityError })),
    targetResult.then((earlyResult) => ({ earlyResult })),
  ]);
  let targetIdentity = launchOutcome.identity;
  if (!targetIdentity) {
    const launchError = launchOutcome.identityError ?? new Error("target exited before its ownership identity was recorded");
    if (target.pid && groupExists(target.pid)) {
      process.kill(-target.pid, "SIGTERM");
      await waitUntil(() => !groupExists(target.pid), plan.terminationGraceMs + 2000, `failed launch group ${target.pid} to close`)
        .catch(() => process.kill(-target.pid, "SIGKILL"));
    }
    const result = launchOutcome.earlyResult ?? await targetResult;
    const failed = {
      ...JSON.parse(readFileSync(filePath, "utf8")),
      status: "failed",
      startedAtUtc: new Date().toISOString(),
      finishedAtUtc: new Date().toISOString(),
      sidecarIdentity,
      targetIdentity: null,
      exitCode: result.code,
      exitSignal: result.signal,
      error: result.error ?? launchError.message,
      processGroupClosed: true,
      control: { host: "127.0.0.1", port, token: plan.controlToken },
      claimBoundary: "Operational process ownership only; scientific validity and acceptance remain with the target's declared instruments and owners.",
    };
    await writeJsonAtomic(filePath, failed);
    await Promise.all([
      new Promise((resolve) => stdout.end(resolve)),
      new Promise((resolve) => stderr.end(resolve)),
      new Promise((resolve) => server.close(resolve)),
    ]);
    return;
  }
  requireCondition(targetIdentity.pgid === target.pid, "target did not become its own process-group leader");
  lease = {
    schema: SCHEMA,
    runId,
    status: "running",
    requestedAtUtc: plan.requestedAtUtc,
    startedAtUtc: new Date().toISOString(),
    deadlineAtUtc: plan.deadlineAtUtc,
    heartbeatAtUtc: new Date().toISOString(),
    heartbeatMs: plan.heartbeatMs,
    terminationGraceMs: plan.terminationGraceMs,
    owner,
    ownerHistory,
    command: plan.command,
    args: plan.args,
    cwd: plan.cwd,
    stdoutPath: plan.stdoutPath,
    stderrPath: plan.stderrPath,
    stdoutBytes,
    stderrBytes,
    lastOutputAtUtc,
    sidecarIdentity,
    targetIdentity,
    control: { host: "127.0.0.1", port, token: plan.controlToken },
    claimBoundary: "Operational process ownership only; scientific validity and acceptance remain with the target's declared instruments and owners.",
  };
  await writeJsonAtomic(filePath, lease);

  function signalGroup(signal) {
    try {
      process.kill(-targetIdentity.pgid, signal);
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }

  function requestStop(reason) {
    if (stopping) return;
    stopping = true;
    stopReason = reason;
    void persist({ status: "stopping", stopReason, stopRequestedAtUtc: new Date().toISOString() });
    signalGroup("SIGTERM");
    forceTimer = setTimeout(() => signalGroup("SIGKILL"), plan.terminationGraceMs);
  }

  const signalStop = () => requestStop("supervisor_interrupted");
  process.on("SIGINT", signalStop);
  process.on("SIGTERM", signalStop);
  heartbeat = setInterval(() => {
    void persist({
      heartbeatAtUtc: new Date().toISOString(),
      elapsedWallSeconds: (Date.now() - startedAtMs) / 1000,
      stdoutBytes,
      stderrBytes,
      lastOutputAtUtc,
    });
  }, plan.heartbeatMs);
  deadline = setTimeout(() => requestStop("deadline_exceeded"), Math.max(1, Date.parse(plan.deadlineAtUtc) - Date.now()));

  let result;
  try {
    result = await targetResult;
    if (groupExists(targetIdentity.pgid)) {
      if (!stopping) requestStop("descendants_remained_after_leader_exit");
      await waitUntil(() => !groupExists(targetIdentity.pgid), plan.terminationGraceMs + 2000, `owned group ${targetIdentity.pgid} to close`)
        .catch(() => signalGroup("SIGKILL"));
      await waitUntil(() => !groupExists(targetIdentity.pgid), 3000, `forced owned group ${targetIdentity.pgid} to close`);
    }
    const status = stopReason === "deadline_exceeded"
      ? "timed_out"
      : stopReason
        ? "stopped"
        : result.code === 0 && !result.signal
          ? "completed"
          : "failed";
    await persist({
      status,
      finishedAtUtc: new Date().toISOString(),
      elapsedWallSeconds: (Date.now() - startedAtMs) / 1000,
      stdoutBytes,
      stderrBytes,
      lastOutputAtUtc,
      exitCode: result.code,
      exitSignal: result.signal,
      error: result.error,
      stopReason,
      processGroupClosed: true,
    });
  } finally {
    clearInterval(heartbeat);
    clearTimeout(deadline);
    clearTimeout(forceTimer);
    process.off("SIGINT", signalStop);
    process.off("SIGTERM", signalStop);
    await writeChain;
    await Promise.all([
      new Promise((resolve) => stdout.end(resolve)),
      new Promise((resolve) => stderr.end(resolve)),
      new Promise((resolve) => server.close(resolve)),
    ]);
  }
}

function publicLease(lease) {
  const { control, ...safe } = lease;
  return { ...safe, control: control ? { host: control.host, port: control.port, authentication: "token-redacted" } : null };
}

function print(value) {
  console.log(JSON.stringify(value, null, 2));
}

export async function main(argv = process.argv.slice(2)) {
  const [action, ...rest] = argv;
  if (action === "__sidecar") {
    requireCondition(rest.length === 1, "sidecar requires one run id");
    await runSidecar(rest[0]);
    return;
  }
  if (action === "run" || action === "start") {
    const lease = await launch(rest, action === "run");
    print(publicLease(lease));
    if (action === "run" && lease.status !== "completed") process.exitCode = 1;
    return;
  }
  if (action === "status") {
    const options = parseNamedArguments(rest, new Set(["--run-id"]));
    const lease = await readJson(leasePath(options.get("--run-id")));
    const classified = await classifyLease(lease);
    print({ ...classified, lease: publicLease(classified.lease) });
    return;
  }
  if (action === "list" || action === "reconcile") {
    requireCondition(
      rest.length === 0 ||
        (action === "list" && rest.length === 1 && rest[0] === "--active") ||
        (action === "reconcile" && rest.length === 1 && rest[0] === "--repair-closed"),
      `invalid ${action} arguments`,
    );
    const rows = action === "reconcile" ? await reconcile({ repairClosed: rest[0] === "--repair-closed" }) : await reconcile();
    const selected = rest[0] === "--active"
      ? rows.filter((row) => !["terminal", "stale_closed"].includes(row.classification))
      : rows;
    print(selected.map((row) => ({ ...row, lease: publicLease(row.lease) })));
    return;
  }
  if (action === "stop") {
    const options = parseNamedArguments(rest, new Set(["--run-id", "--reason"]));
    const result = await stopRun(options.get("--run-id"), options.get("--reason"));
    print({ ...result, lease: publicLease(result.lease) });
    return;
  }
  if (action === "handoff") {
    const options = parseNamedArguments(rest, new Set(["--run-id", "--to-task", "--to-thread"]));
    print(publicLease(await handoffRun(options.get("--run-id"), options.get("--to-task"), options.get("--to-thread"))));
    return;
  }
  if (action === "closeout") {
    const options = parseNamedArguments(rest, new Set(["--owner-task"]));
    print(await closeoutOwner(options.get("--owner-task")));
    return;
  }
  throw new Error("Usage: owned-compute-supervisor.mjs <run|start|status|list|handoff|stop|reconcile|closeout> ...");
}

if (process.argv[1] && path.resolve(process.argv[1]) === SELF) {
  main().catch((error) => {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  });
}
